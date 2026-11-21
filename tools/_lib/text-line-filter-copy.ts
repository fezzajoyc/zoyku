import { LOCALES, type Locale } from "@/lib/site";
import type { ToolCopy } from "./types";
import type { TextLineFilterError } from "./text-line-filter";

type Labels = {
  mode: string; contains: string; range: string; length: string; column: string;
  query: string; include: string; exclude: string; caseSensitive: string; from: string; to: string;
  min: string; max: string; delimiter: string; columnNumber: string; missing: string; reject: string; emptyColumn: string;
  input: string; output: string; sample: string; clear: string; inputLines: string; outputLines: string;
  emptyInput: string; noMatch: string; emptyResult: string; invalid: string; missingError: string;
  inputLimit: string; lineLimit: string; outputLimit: string;
};
type Authored = { name: string; tagline: string; rules: string; limits: string; steps: [string, string, string]; faqs: [string, string]; labels: Labels };

const EN: Authored = {
  name: "Text Line Filter",
  tagline: "Keep or exclude lines containing literal text, select a line range, filter by Unicode length, or extract a delimiter column locally while preserving whitespace.",
  rules: "Literal matching only; ignoring case uses locale-independent lowercase. Length counts Unicode code points, not visible characters: combining marks count separately. Line ranges are one-based and inclusive. Column extraction uses a literal delimiter with no CSV quote handling; choose whether a missing column is an error or empty output. CRLF/CR become LF; blank lines and a final empty line count. Empty input has zero lines. Nothing is uploaded or saved.",
  limits: "Input: 100,000 UTF-16 units and 10,000 lines; output: 200,000 units. Query and delimiter: 1–128 units. Range endpoints must exist. Length: whole numbers 0–100,000, minimum ≤ maximum. Column: 1–10,000. Escapes and regular expressions are not interpreted.",
  steps: ["Paste text, keeping the blank lines you want to process.", "Choose a mode and its literal text, inclusive range, length bounds or column settings.", "Check the line counts and result, then copy any nonempty output."],
  faqs: ["How are length and empty lines counted?", "Can I use regular expressions or CSV quoting?"],
  labels: { mode: "Mode", contains: "Contains text", range: "Line range", length: "Line length", column: "Extract column", query: "Literal search text", include: "Keep matching lines", exclude: "Exclude matching lines", caseSensitive: "Case sensitive", from: "From line", to: "To line (inclusive)", min: "Minimum code points", max: "Maximum code points", delimiter: "Literal delimiter", columnNumber: "Column number", missing: "Missing column", reject: "Show error", emptyColumn: "Use empty text", input: "Input text", output: "Filtered text", sample: "Use sample", clear: "Clear", inputLines: "Input lines", outputLines: "Output lines", emptyInput: "Paste text or use the sample.", noMatch: "No lines match these settings.", emptyResult: "The selected result is one empty line; there are no characters to copy.", invalid: "Check this setting and the supported bounds below.", missingError: "At least one line lacks the selected column. Choose empty text or change the column.", inputLimit: "Input exceeds 100,000 UTF-16 units.", lineLimit: "Input exceeds 10,000 lines, counting a final empty line.", outputLimit: "Output exceeds 200,000 UTF-16 units." },
};

export const TEXT_LINE_FILTER_COPY: Record<Locale, Authored> = { en: EN,
  zh: {
  "name": "文本行筛选器",
  "tagline": "按字面文本保留或排除行，选择指定行号范围，按 Unicode 码点长度筛选，或用分隔符提取指定列；保留空白和空行，在浏览器本地查看并复制。",
  "rules": "仅作字面匹配；忽略大小写使用不依赖地区的小写转换。长度按 Unicode 码点计算，组合标记单独计数，不等于可见字符数。行号从 1 开始且包含两端。列按字面分隔符拆分，不处理 CSV 引号；缺列可选报错或输出空文本。CRLF/CR 统一为 LF，空行和末尾空行均计数；空输入为零行。文本不上传、不保存。",
  "limits": "输入最多 100,000 个 UTF-16 单位、10,000 行，输出最多 200,000 个单位。查询和分隔符须为 1–128 个单位。行范围必须实际存在。长度为 0–100,000 的整数且最小值不大于最大值。列号为 1–10,000。不解释转义或正则表达式。",
  "steps": [
    "粘贴文本，保留需要处理的空行。",
    "选择模式并设置字面文本、行范围、长度或列参数。",
    "检查输入和输出行数，确认后复制非空结果。"
  ],
  "faqs": [
    "长度和空行如何计数？",
    "可以使用正则表达式或 CSV 引号吗？"
  ],
  "labels": {
    "mode": "模式",
    "contains": "包含文本",
    "range": "行号范围",
    "length": "行长度",
    "column": "提取列",
    "query": "字面查询文本",
    "include": "保留匹配行",
    "exclude": "排除匹配行",
    "caseSensitive": "区分大小写",
    "from": "起始行",
    "to": "结束行（含）",
    "min": "最少码点数",
    "max": "最多码点数",
    "delimiter": "字面分隔符",
    "columnNumber": "列号",
    "missing": "缺少指定列时",
    "reject": "显示错误",
    "emptyColumn": "输出空文本",
    "input": "输入文本",
    "output": "筛选结果",
    "sample": "使用示例",
    "clear": "清空",
    "inputLines": "输入行数",
    "outputLines": "输出行数",
    "emptyInput": "粘贴文本或使用示例。",
    "noMatch": "没有符合设置的行。",
    "emptyResult": "结果为一个空行，没有可复制的字符。",
    "invalid": "请检查设置及下方允许范围。",
    "missingError": "至少一行缺少指定列，请改列号或选择输出空文本。",
    "inputLimit": "输入超过 100,000 个 UTF-16 单位。",
    "lineLimit": "输入超过 10,000 行，末尾空行也计入。",
    "outputLimit": "输出超过 200,000 个 UTF-16 单位。"
  }
},
  ja: {
  "name": "テキスト行フィルター",
  "tagline": "指定文字を含む行の抽出や除外、行番号の範囲選択、Unicode の長さによる絞り込み、区切り文字での列抽出を行い、空白を保ってブラウザー内でコピーできます。",
  "rules": "文字をそのまま照合し、大文字小文字を無視する場合はロケール非依存の小文字変換を使います。長さは Unicode コードポイント数で、結合記号は別に数えます。行番号は 1 始まりで両端を含みます。列抽出は区切り文字で分割し、CSV の引用符は解釈しません。欠けた列はエラーか空文字を選べます。CRLF/CR は LF に統一。空行と末尾の空行も数え、空入力は 0 行です。送信・保存しません。",
  "limits": "入力は UTF-16 で 100,000 単位、10,000 行、出力は 200,000 単位まで。検索語と区切りは 1–128 単位。行範囲は存在する行に限定。長さは 0–100,000 の整数で最小≤最大、列番号は 1–10,000。エスケープと正規表現は解釈しません。",
  "steps": [
    "処理する空行を保ってテキストを貼り付けます。",
    "モードと検索語、行範囲、長さ、列の設定を選びます。",
    "行数と結果を確認して、空でない結果をコピーします。"
  ],
  "faqs": [
    "長さと空行はどう数えますか？",
    "正規表現や CSV の引用符を使えますか？"
  ],
  "labels": {
    "mode": "モード",
    "contains": "文字を含む行",
    "range": "行番号の範囲",
    "length": "行の長さ",
    "column": "列を抽出",
    "query": "検索文字列",
    "include": "一致する行を残す",
    "exclude": "一致する行を除外",
    "caseSensitive": "大文字と小文字を区別",
    "from": "開始行",
    "to": "終了行（含む）",
    "min": "最小コードポイント数",
    "max": "最大コードポイント数",
    "delimiter": "区切り文字",
    "columnNumber": "列番号",
    "missing": "列がない場合",
    "reject": "エラーを表示",
    "emptyColumn": "空文字を出力",
    "input": "入力テキスト",
    "output": "抽出結果",
    "sample": "例を使う",
    "clear": "クリア",
    "inputLines": "入力行数",
    "outputLines": "出力行数",
    "emptyInput": "テキストを貼り付けるか例を使ってください。",
    "noMatch": "条件に一致する行はありません。",
    "emptyResult": "結果は空行 1 行です。コピーする文字はありません。",
    "invalid": "設定と下記の範囲を確認してください。",
    "missingError": "指定列がない行があります。列番号を変えるか空文字を選んでください。",
    "inputLimit": "入力が UTF-16 で 100,000 単位を超えます。",
    "lineLimit": "末尾の空行を含め 10,000 行を超えます。",
    "outputLimit": "出力が UTF-16 で 200,000 単位を超えます。"
  }
},
  es: {
  "name": "Filtro de líneas de texto",
  "tagline": "Conserva o excluye líneas con texto literal, selecciona un intervalo, filtra por longitud Unicode o extrae una columna delimitada localmente sin quitar espacios.",
  "rules": "Solo coincidencias literales; ignorar mayúsculas usa minúsculas independientes de la región. La longitud cuenta puntos de código Unicode, con marcas combinantes separadas. Las líneas empiezan en 1 y el intervalo incluye ambos extremos. Las columnas usan un delimitador literal sin comillas CSV; una columna ausente da error o texto vacío. CRLF/CR pasan a LF; se cuentan líneas vacías y la última vacía. Entrada vacía: cero líneas. No se sube ni guarda texto.",
  "limits": "Entrada: 100,000 unidades UTF-16 y 10,000 líneas; salida: 200,000 unidades. Consulta y delimitador: 1–128 unidades. El intervalo debe existir. Longitud: enteros 0–100,000, mínimo≤máximo. Columna: 1–10,000. No se interpretan escapes ni expresiones regulares.",
  "steps": [
    "Pega el texto conservando las líneas vacías.",
    "Elige el modo y el texto, intervalo, longitud o columna.",
    "Revisa los recuentos y copia la salida no vacía."
  ],
  "faqs": [
    "¿Cómo se cuentan la longitud y las líneas vacías?",
    "¿Se permiten expresiones regulares o comillas CSV?"
  ],
  "labels": {
    "mode": "Modo",
    "contains": "Contiene texto",
    "range": "Intervalo de líneas",
    "length": "Longitud de línea",
    "column": "Extraer columna",
    "query": "Texto literal a buscar",
    "include": "Conservar coincidencias",
    "exclude": "Excluir coincidencias",
    "caseSensitive": "Distinguir mayúsculas",
    "from": "Desde la línea",
    "to": "Hasta la línea (incluida)",
    "min": "Mínimo de puntos de código",
    "max": "Máximo de puntos de código",
    "delimiter": "Delimitador literal",
    "columnNumber": "Número de columna",
    "missing": "Columna ausente",
    "reject": "Mostrar error",
    "emptyColumn": "Usar texto vacío",
    "input": "Texto de entrada",
    "output": "Texto filtrado",
    "sample": "Usar ejemplo",
    "clear": "Borrar",
    "inputLines": "Líneas de entrada",
    "outputLines": "Líneas de salida",
    "emptyInput": "Pega texto o usa el ejemplo.",
    "noMatch": "Ninguna línea coincide.",
    "emptyResult": "El resultado es una línea vacía; no hay caracteres que copiar.",
    "invalid": "Revisa el ajuste y los límites indicados abajo.",
    "missingError": "Falta la columna en alguna línea. Cambia la columna o usa texto vacío.",
    "inputLimit": "La entrada supera 100,000 unidades UTF-16.",
    "lineLimit": "La entrada supera 10,000 líneas, incluida la última vacía.",
    "outputLimit": "La salida supera 200,000 unidades UTF-16."
  }
},
  pt: {
  "name": "Filtro de linhas de texto",
  "tagline": "Mantenha ou exclua linhas com texto literal, selecione um intervalo, filtre por comprimento Unicode ou extraia uma coluna delimitada localmente sem remover espaços.",
  "rules": "Apenas correspondência literal; ignorar maiúsculas usa conversão para minúsculas independente da região. O comprimento conta pontos de código Unicode, com marcas combinantes separadas. Linhas começam em 1 e o intervalo inclui as duas pontas. Colunas usam delimitador literal, sem aspas CSV; uma coluna ausente gera erro ou texto vazio. CRLF/CR viram LF; linhas vazias e a última vazia contam. Entrada vazia: zero linhas. Nada é enviado ou salvo.",
  "limits": "Entrada: 100,000 unidades UTF-16 e 10,000 linhas; saída: 200,000 unidades. Busca e delimitador: 1–128 unidades. O intervalo deve existir. Comprimento: inteiros 0–100,000, mínimo≤máximo. Coluna: 1–10,000. Escapes e expressões regulares não são interpretados.",
  "steps": [
    "Cole o texto preservando as linhas vazias.",
    "Escolha o modo e o texto, intervalo, comprimento ou coluna.",
    "Confira as contagens e copie a saída não vazia."
  ],
  "faqs": [
    "Como o comprimento e as linhas vazias são contados?",
    "Posso usar expressões regulares ou aspas CSV?"
  ],
  "labels": {
    "mode": "Modo",
    "contains": "Contém texto",
    "range": "Intervalo de linhas",
    "length": "Comprimento da linha",
    "column": "Extrair coluna",
    "query": "Texto literal de busca",
    "include": "Manter correspondências",
    "exclude": "Excluir correspondências",
    "caseSensitive": "Diferenciar maiúsculas",
    "from": "Da linha",
    "to": "Até a linha (inclusive)",
    "min": "Mínimo de pontos de código",
    "max": "Máximo de pontos de código",
    "delimiter": "Delimitador literal",
    "columnNumber": "Número da coluna",
    "missing": "Coluna ausente",
    "reject": "Mostrar erro",
    "emptyColumn": "Usar texto vazio",
    "input": "Texto de entrada",
    "output": "Texto filtrado",
    "sample": "Usar exemplo",
    "clear": "Limpar",
    "inputLines": "Linhas de entrada",
    "outputLines": "Linhas de saída",
    "emptyInput": "Cole texto ou use o exemplo.",
    "noMatch": "Nenhuma linha corresponde.",
    "emptyResult": "O resultado é uma linha vazia; não há caracteres para copiar.",
    "invalid": "Confira a configuração e os limites abaixo.",
    "missingError": "Uma linha não tem a coluna escolhida. Mude a coluna ou use texto vazio.",
    "inputLimit": "A entrada excede 100,000 unidades UTF-16.",
    "lineLimit": "A entrada excede 10,000 linhas, incluindo a última vazia.",
    "outputLimit": "A saída excede 200,000 unidades UTF-16."
  }
},
  fr: {
  "name": "Filtre de lignes de texte",
  "tagline": "Gardez ou excluez les lignes contenant un texte littéral, choisissez une plage, filtrez par longueur Unicode ou extrayez une colonne localement sans supprimer les espaces.",
  "rules": "Correspondance littérale uniquement ; ignorer la casse utilise les minuscules indépendantes de la langue. La longueur compte les points de code Unicode, marques combinées séparées. Les lignes commencent à 1 et la plage inclut les bornes. Les colonnes utilisent un séparateur littéral sans guillemets CSV ; une colonne absente donne une erreur ou un texte vide. CRLF/CR deviennent LF. Lignes vides et dernière ligne vide comptées ; entrée vide : zéro ligne. Aucun envoi ni sauvegarde.",
  "limits": "Entrée : 100,000 unités UTF-16 et 10,000 lignes ; sortie : 200,000 unités. Recherche et séparateur : 1–128 unités. La plage doit exister. Longueur : entiers 0–100,000, minimum≤maximum. Colonne : 1–10,000. Échappements et expressions régulières non interprétés.",
  "steps": [
    "Collez le texte en gardant les lignes vides.",
    "Choisissez le mode et le texte, la plage, la longueur ou la colonne.",
    "Vérifiez les comptes puis copiez la sortie non vide."
  ],
  "faqs": [
    "Comment compte-t-on la longueur et les lignes vides ?",
    "Puis-je utiliser des expressions régulières ou des guillemets CSV ?"
  ],
  "labels": {
    "mode": "Mode",
    "contains": "Contient un texte",
    "range": "Plage de lignes",
    "length": "Longueur de ligne",
    "column": "Extraire une colonne",
    "query": "Texte littéral recherché",
    "include": "Garder les correspondances",
    "exclude": "Exclure les correspondances",
    "caseSensitive": "Respecter la casse",
    "from": "De la ligne",
    "to": "À la ligne (incluse)",
    "min": "Minimum de points de code",
    "max": "Maximum de points de code",
    "delimiter": "Séparateur littéral",
    "columnNumber": "Numéro de colonne",
    "missing": "Colonne absente",
    "reject": "Afficher une erreur",
    "emptyColumn": "Utiliser un texte vide",
    "input": "Texte source",
    "output": "Texte filtré",
    "sample": "Utiliser l’exemple",
    "clear": "Effacer",
    "inputLines": "Lignes source",
    "outputLines": "Lignes produites",
    "emptyInput": "Collez du texte ou utilisez l’exemple.",
    "noMatch": "Aucune ligne ne correspond.",
    "emptyResult": "Le résultat est une ligne vide ; aucun caractère à copier.",
    "invalid": "Vérifiez ce réglage et les limites ci-dessous.",
    "missingError": "Une ligne ne contient pas la colonne choisie. Changez de colonne ou utilisez un texte vide.",
    "inputLimit": "L’entrée dépasse 100,000 unités UTF-16.",
    "lineLimit": "L’entrée dépasse 10,000 lignes, dernière ligne vide comprise.",
    "outputLimit": "La sortie dépasse 200,000 unités UTF-16."
  }
},
  de: {
  "name": "Textzeilen filtern",
  "tagline": "Behalte oder entferne Zeilen mit wörtlichem Text, wähle einen Zeilenbereich, filtere nach Unicode-Länge oder extrahiere lokal eine Spalte, ohne Leerzeichen zu entfernen.",
  "rules": "Nur wörtliche Suche; ohne Groß-/Kleinschreibung wird gebietsunabhängig in Kleinbuchstaben umgewandelt. Die Länge zählt Unicode-Codepunkte, kombinierende Zeichen separat. Zeilen beginnen bei 1, beide Bereichsgrenzen sind enthalten. Spalten nutzen ein wörtliches Trennzeichen ohne CSV-Anführungszeichen; fehlende Spalten erzeugen Fehler oder Leertext. CRLF/CR werden LF. Leerzeilen und letzte Leerzeile zählen; leere Eingabe hat null Zeilen. Kein Upload oder Speichern.",
  "limits": "Eingabe: 100,000 UTF-16-Einheiten und 10,000 Zeilen; Ausgabe: 200,000 Einheiten. Suche und Trenner: 1–128 Einheiten. Der Bereich muss existieren. Länge: ganze Zahlen 0–100,000, Minimum≤Maximum. Spalte: 1–10,000. Keine Escape- oder Regex-Auswertung.",
  "steps": [
    "Füge den Text mit den gewünschten Leerzeilen ein.",
    "Wähle Modus sowie Suchtext, Bereich, Länge oder Spalte.",
    "Prüfe die Zeilenzahlen und kopiere die nicht leere Ausgabe."
  ],
  "faqs": [
    "Wie werden Länge und Leerzeilen gezählt?",
    "Sind reguläre Ausdrücke oder CSV-Anführungszeichen möglich?"
  ],
  "labels": {
    "mode": "Modus",
    "contains": "Enthält Text",
    "range": "Zeilenbereich",
    "length": "Zeilenlänge",
    "column": "Spalte extrahieren",
    "query": "Wörtlicher Suchtext",
    "include": "Treffer behalten",
    "exclude": "Treffer ausschließen",
    "caseSensitive": "Groß-/Kleinschreibung beachten",
    "from": "Ab Zeile",
    "to": "Bis Zeile (einschließlich)",
    "min": "Minimale Codepunktzahl",
    "max": "Maximale Codepunktzahl",
    "delimiter": "Wörtliches Trennzeichen",
    "columnNumber": "Spaltennummer",
    "missing": "Fehlende Spalte",
    "reject": "Fehler anzeigen",
    "emptyColumn": "Leeren Text verwenden",
    "input": "Eingabetext",
    "output": "Gefilterter Text",
    "sample": "Beispiel einsetzen",
    "clear": "Leeren",
    "inputLines": "Eingabezeilen",
    "outputLines": "Ausgabezeilen",
    "emptyInput": "Text einfügen oder Beispiel verwenden.",
    "noMatch": "Keine Zeilen passen.",
    "emptyResult": "Das Ergebnis ist eine leere Zeile; es gibt nichts zu kopieren.",
    "invalid": "Prüfe die Einstellung und die Grenzen unten.",
    "missingError": "Mindestens einer Zeile fehlt die Spalte. Spalte ändern oder Leertext verwenden.",
    "inputLimit": "Eingabe überschreitet 100,000 UTF-16-Einheiten.",
    "lineLimit": "Eingabe überschreitet 10,000 Zeilen einschließlich letzter Leerzeile.",
    "outputLimit": "Ausgabe überschreitet 200,000 UTF-16-Einheiten."
  }
},
  ru: {
  "name": "Фильтр строк текста",
  "tagline": "Сохраняйте или исключайте строки с буквальным текстом, выбирайте диапазон, фильтруйте по длине Unicode или извлекайте столбец локально, сохраняя пробелы.",
  "rules": "Только буквальный поиск; без учёта регистра используется независимое от языка приведение к нижнему регистру. Длина считается в кодовых точках Unicode, комбинируемые знаки отдельно. Нумерация с 1, обе границы включены. Столбцы разделяются буквальным разделителем без обработки кавычек CSV; отсутствующий столбец даёт ошибку или пустой текст. CRLF/CR становятся LF. Пустые и последняя пустая строки учитываются; пустой ввод — ноль строк. Текст не отправляется и не сохраняется.",
  "limits": "Ввод: 100,000 единиц UTF-16 и 10,000 строк; вывод: 200,000 единиц. Запрос и разделитель: 1–128 единиц. Диапазон должен существовать. Длина: целые 0–100,000, минимум≤максимум. Столбец: 1–10,000. Экранирование и регулярные выражения не обрабатываются.",
  "steps": [
    "Вставьте текст, сохранив нужные пустые строки.",
    "Выберите режим и текст, диапазон, длину или столбец.",
    "Проверьте число строк и скопируйте непустой результат."
  ],
  "faqs": [
    "Как считаются длина и пустые строки?",
    "Можно использовать регулярные выражения или кавычки CSV?"
  ],
  "labels": {
    "mode": "Режим",
    "contains": "Содержит текст",
    "range": "Диапазон строк",
    "length": "Длина строки",
    "column": "Извлечь столбец",
    "query": "Буквальный текст поиска",
    "include": "Оставить совпадения",
    "exclude": "Исключить совпадения",
    "caseSensitive": "Учитывать регистр",
    "from": "С первой строки",
    "to": "До строки (включительно)",
    "min": "Минимум кодовых точек",
    "max": "Максимум кодовых точек",
    "delimiter": "Буквальный разделитель",
    "columnNumber": "Номер столбца",
    "missing": "Нет столбца",
    "reject": "Показать ошибку",
    "emptyColumn": "Вывести пустой текст",
    "input": "Исходный текст",
    "output": "Отфильтрованный текст",
    "sample": "Вставить пример",
    "clear": "Очистить",
    "inputLines": "Входных строк",
    "outputLines": "Выходных строк",
    "emptyInput": "Вставьте текст или пример.",
    "noMatch": "Совпадающих строк нет.",
    "emptyResult": "Результат — одна пустая строка; символов для копирования нет.",
    "invalid": "Проверьте настройку и ограничения ниже.",
    "missingError": "В одной из строк нет столбца. Измените номер или выберите пустой текст.",
    "inputLimit": "Ввод превышает 100,000 единиц UTF-16.",
    "lineLimit": "Ввод превышает 10,000 строк с учётом последней пустой.",
    "outputLimit": "Вывод превышает 200,000 единиц UTF-16."
  }
},
  it: {
  "name": "Filtro righe di testo",
  "tagline": "Mantieni o escludi righe con testo letterale, scegli un intervallo, filtra per lunghezza Unicode o estrai una colonna localmente conservando spazi e righe vuote.",
  "rules": "Solo ricerca letterale; ignorare maiuscole usa minuscole indipendenti dalla lingua. La lunghezza conta punti di codice Unicode, con segni combinanti separati. Le righe iniziano da 1 e gli estremi sono inclusi. Le colonne usano un delimitatore letterale senza virgolette CSV; una colonna mancante produce errore o testo vuoto. CRLF/CR diventano LF. Contano righe vuote e ultima riga vuota; input vuoto: zero righe. Nessun invio o salvataggio.",
  "limits": "Input: 100,000 unità UTF-16 e 10,000 righe; output: 200,000 unità. Ricerca e delimitatore: 1–128 unità. L’intervallo deve esistere. Lunghezza: interi 0–100,000, minimo≤massimo. Colonna: 1–10,000. Escape ed espressioni regolari non interpretati.",
  "steps": [
    "Incolla il testo mantenendo le righe vuote.",
    "Scegli modalità e testo, intervallo, lunghezza o colonna.",
    "Verifica i conteggi e copia l’output non vuoto."
  ],
  "faqs": [
    "Come si contano lunghezza e righe vuote?",
    "Posso usare espressioni regolari o virgolette CSV?"
  ],
  "labels": {
    "mode": "Modalità",
    "contains": "Contiene testo",
    "range": "Intervallo righe",
    "length": "Lunghezza riga",
    "column": "Estrai colonna",
    "query": "Testo letterale da cercare",
    "include": "Mantieni corrispondenze",
    "exclude": "Escludi corrispondenze",
    "caseSensitive": "Distingui maiuscole",
    "from": "Dalla riga",
    "to": "Alla riga (inclusa)",
    "min": "Minimo punti di codice",
    "max": "Massimo punti di codice",
    "delimiter": "Delimitatore letterale",
    "columnNumber": "Numero colonna",
    "missing": "Colonna mancante",
    "reject": "Mostra errore",
    "emptyColumn": "Usa testo vuoto",
    "input": "Testo in ingresso",
    "output": "Testo filtrato",
    "sample": "Usa esempio",
    "clear": "Cancella",
    "inputLines": "Righe in ingresso",
    "outputLines": "Righe in uscita",
    "emptyInput": "Incolla testo o usa l’esempio.",
    "noMatch": "Nessuna riga corrisponde.",
    "emptyResult": "Il risultato è una riga vuota; non ci sono caratteri da copiare.",
    "invalid": "Controlla l’impostazione e i limiti sotto.",
    "missingError": "Una riga non ha la colonna scelta. Cambia colonna o usa testo vuoto.",
    "inputLimit": "L’input supera 100,000 unità UTF-16.",
    "lineLimit": "L’input supera 10,000 righe, inclusa l’ultima vuota.",
    "outputLimit": "L’output supera 200,000 unità UTF-16."
  }
},
  tr: {
  "name": "Metin satırı filtresi",
  "tagline": "Düz metin içeren satırları tutun veya çıkarın, satır aralığı seçin, Unicode uzunluğuna göre süzün ya da boşlukları koruyarak yerel olarak bir sütun çıkarın.",
  "rules": "Yalnız düz metin eşleşir; büyük/küçük harf yok sayılırken yerelden bağımsız küçük harfe dönüşüm kullanılır. Uzunluk Unicode kod noktalarını, birleşen işaretleri ayrı sayar. Satırlar 1’den başlar, iki sınır da dahildir. Sütunlar düz ayırıcıyla bölünür, CSV tırnakları işlenmez; eksik sütun hata veya boş metin verir. CRLF/CR, LF olur. Boş satırlar ve sondaki boş satır sayılır; boş giriş sıfır satırdır. Metin yüklenmez veya kaydedilmez.",
  "limits": "Giriş: 100,000 UTF-16 birimi ve 10,000 satır; çıkış: 200,000 birim. Sorgu ve ayırıcı: 1–128 birim. Aralık mevcut olmalı. Uzunluk: tam sayı 0–100,000, en az≤en çok. Sütun: 1–10,000. Kaçışlar ve düzenli ifadeler işlenmez.",
  "steps": [
    "Boş satırları koruyarak metni yapıştırın.",
    "Modu ve metin, aralık, uzunluk ya da sütunu seçin.",
    "Satır sayılarını kontrol edip boş olmayan sonucu kopyalayın."
  ],
  "faqs": [
    "Uzunluk ve boş satırlar nasıl sayılır?",
    "Düzenli ifade veya CSV tırnakları kullanabilir miyim?"
  ],
  "labels": {
    "mode": "Mod",
    "contains": "Metin içerir",
    "range": "Satır aralığı",
    "length": "Satır uzunluğu",
    "column": "Sütun çıkar",
    "query": "Düz arama metni",
    "include": "Eşleşenleri tut",
    "exclude": "Eşleşenleri çıkar",
    "caseSensitive": "Büyük/küçük harfe duyarlı",
    "from": "İlk satır",
    "to": "Son satır (dahil)",
    "min": "En az kod noktası",
    "max": "En çok kod noktası",
    "delimiter": "Düz ayırıcı",
    "columnNumber": "Sütun numarası",
    "missing": "Eksik sütun",
    "reject": "Hata göster",
    "emptyColumn": "Boş metin kullan",
    "input": "Giriş metni",
    "output": "Süzülen metin",
    "sample": "Örneği kullan",
    "clear": "Temizle",
    "inputLines": "Giriş satırları",
    "outputLines": "Çıkış satırları",
    "emptyInput": "Metin yapıştırın veya örneği kullanın.",
    "noMatch": "Eşleşen satır yok.",
    "emptyResult": "Sonuç tek bir boş satır; kopyalanacak karakter yok.",
    "invalid": "Ayarı ve aşağıdaki sınırları kontrol edin.",
    "missingError": "Bir satırda seçilen sütun yok. Sütunu değiştirin veya boş metin seçin.",
    "inputLimit": "Giriş 100,000 UTF-16 birimini aşıyor.",
    "lineLimit": "Son boş satır dahil 10,000 satır aşılıyor.",
    "outputLimit": "Çıkış 200,000 UTF-16 birimini aşıyor."
  }
},
  ko: {
  "name": "텍스트 줄 필터",
  "tagline": "특정 텍스트를 포함하는 줄을 유지하거나 제외하고, 줄 범위를 선택하거나 Unicode 길이로 필터링하세요. 공백을 보존하며 구분자로 열을 추출하고 브라우저에서 복사할 수 있습니다.",
  "rules": "입력 문자를 그대로 검색하며 대소문자를 무시하면 로캘과 무관한 소문자 변환을 사용합니다. 길이는 Unicode 코드 포인트 수이며 결합 부호는 따로 셉니다. 줄 번호는 1부터 시작하고 양 끝을 포함합니다. 열은 문자 그대로의 구분자로 나누며 CSV 따옴표는 해석하지 않습니다. 없는 열은 오류 또는 빈 텍스트를 선택합니다. CRLF/CR은 LF로 통일하며 빈 줄과 마지막 빈 줄도 셉니다. 빈 입력은 0줄입니다. 업로드하거나 저장하지 않습니다.",
  "limits": "입력은 UTF-16 단위 100,000개와 10,000줄, 출력은 200,000개까지입니다. 검색어와 구분자는 1–128단위입니다. 줄 범위는 실제로 존재해야 합니다. 길이는 0–100,000 정수이며 최소≤최대, 열 번호는 1–10,000입니다. 이스케이프나 정규식은 해석하지 않습니다.",
  "steps": [
    "빈 줄을 유지하며 텍스트를 붙여넣습니다.",
    "모드와 텍스트, 줄 범위, 길이 또는 열을 설정합니다.",
    "줄 수를 확인하고 비어 있지 않은 결과를 복사합니다."
  ],
  "faqs": [
    "길이와 빈 줄은 어떻게 세나요?",
    "정규식이나 CSV 따옴표를 쓸 수 있나요?"
  ],
  "labels": {
    "mode": "모드",
    "contains": "텍스트 포함",
    "range": "줄 범위",
    "length": "줄 길이",
    "column": "열 추출",
    "query": "그대로 검색할 텍스트",
    "include": "일치하는 줄 유지",
    "exclude": "일치하는 줄 제외",
    "caseSensitive": "대소문자 구분",
    "from": "시작 줄",
    "to": "끝 줄(포함)",
    "min": "최소 코드 포인트",
    "max": "최대 코드 포인트",
    "delimiter": "구분자 문자",
    "columnNumber": "열 번호",
    "missing": "없는 열 처리",
    "reject": "오류 표시",
    "emptyColumn": "빈 텍스트 사용",
    "input": "입력 텍스트",
    "output": "필터 결과",
    "sample": "예제 사용",
    "clear": "지우기",
    "inputLines": "입력 줄 수",
    "outputLines": "출력 줄 수",
    "emptyInput": "텍스트를 붙여넣거나 예제를 사용하세요.",
    "noMatch": "일치하는 줄이 없습니다.",
    "emptyResult": "결과는 빈 줄 하나이며 복사할 문자가 없습니다.",
    "invalid": "설정과 아래 허용 범위를 확인하세요.",
    "missingError": "일부 줄에 선택한 열이 없습니다. 열을 바꾸거나 빈 텍스트를 선택하세요.",
    "inputLimit": "입력이 UTF-16 단위 100,000개를 넘습니다.",
    "lineLimit": "마지막 빈 줄을 포함하여 10,000줄을 넘습니다.",
    "outputLimit": "출력이 UTF-16 단위 200,000개를 넘습니다."
  }
},
  ar: {
  "name": "مرشح أسطر النص",
  "tagline": "احتفظ بالأسطر التي تحتوي نصًا حرفيًا أو استبعدها، وحدد نطاق أسطر أو طول Unicode، أو استخرج عمودًا بفاصل محليًا مع الحفاظ على المسافات والأسطر الفارغة.",
  "rules": "مطابقة حرفية فقط؛ تجاهل حالة الأحرف يستخدم التحويل إلى أحرف صغيرة دون اعتماد على اللغة. الطول بعدد نقاط Unicode وتحسب علامات الدمج منفصلة. تبدأ أرقام الأسطر من 1 وتشمل طرفي النطاق. الأعمدة بفاصل حرفي دون معالجة اقتباسات CSV؛ العمود المفقود خطأ أو نص فارغ حسب الاختيار. تتحول CRLF/CR إلى LF، وتحسب الأسطر الفارغة والسطر الفارغ الأخير. الإدخال الفارغ صفر أسطر. لا يُرفع النص ولا يُحفظ.",
  "limits": "الإدخال: 100,000 وحدة UTF-16 و10,000 سطر؛ الإخراج: 200,000 وحدة. البحث والفاصل: 1–128 وحدة. يجب أن يكون النطاق موجودًا. الطول أعداد صحيحة 0–100,000 والأدنى≤الأقصى. العمود: 1–10,000. لا تُفسر تسلسلات الهروب أو التعبيرات النمطية.",
  "steps": [
    "ألصق النص مع إبقاء الأسطر الفارغة.",
    "اختر الوضع والنص أو النطاق أو الطول أو العمود.",
    "راجع عدد الأسطر وانسخ النتيجة غير الفارغة."
  ],
  "faqs": [
    "كيف يحسب الطول والأسطر الفارغة؟",
    "هل يمكن استخدام التعبيرات النمطية أو اقتباسات CSV؟"
  ],
  "labels": {
    "mode": "الوضع",
    "contains": "يحتوي نصًا",
    "range": "نطاق أسطر",
    "length": "طول السطر",
    "column": "استخراج عمود",
    "query": "نص البحث الحرفي",
    "include": "الاحتفاظ بالأسطر المطابقة",
    "exclude": "استبعاد الأسطر المطابقة",
    "caseSensitive": "مراعاة حالة الأحرف",
    "from": "من السطر",
    "to": "إلى السطر شاملًا",
    "min": "أدنى عدد نقاط ترميز",
    "max": "أقصى عدد نقاط ترميز",
    "delimiter": "الفاصل الحرفي",
    "columnNumber": "رقم العمود",
    "missing": "العمود المفقود",
    "reject": "عرض خطأ",
    "emptyColumn": "استخدام نص فارغ",
    "input": "النص المدخل",
    "output": "النص المرشح",
    "sample": "استخدام مثال",
    "clear": "مسح",
    "inputLines": "أسطر الإدخال",
    "outputLines": "أسطر الإخراج",
    "emptyInput": "ألصق نصًا أو استخدم المثال.",
    "noMatch": "لا توجد أسطر مطابقة.",
    "emptyResult": "النتيجة سطر فارغ واحد؛ لا توجد أحرف لنسخها.",
    "invalid": "راجع الإعداد والحدود أدناه.",
    "missingError": "يفتقد سطر العمود المختار. غيّر العمود أو اختر النص الفارغ.",
    "inputLimit": "يتجاوز الإدخال 100,000 وحدة UTF-16.",
    "lineLimit": "يتجاوز الإدخال 10,000 سطر مع السطر الفارغ الأخير.",
    "outputLimit": "يتجاوز الإخراج 200,000 وحدة UTF-16."
  }
},
  hi: {
  "name": "टेक्स्ट पंक्ति फ़िल्टर",
  "tagline": "शाब्दिक पाठ वाली पंक्तियाँ रखें या हटाएँ, पंक्ति सीमा चुनें, Unicode लंबाई से छाँटें या विभाजक से कॉलम निकालें और रिक्त स्थान बचाते हुए ब्राउज़र में परिणाम कॉपी करें।",
  "rules": "केवल शाब्दिक मिलान; अक्षरों का केस अनदेखा करने पर भाषा-स्वतंत्र लोअरकेस रूपांतरण होता है। लंबाई Unicode कोड पॉइंट गिनती है, संयुक्त चिह्न अलग गिने जाते हैं। पंक्ति क्रमांक 1 से और दोनों छोर शामिल हैं। कॉलम शाब्दिक विभाजक से बँटते हैं, CSV उद्धरण नहीं समझे जाते; गायब कॉलम पर त्रुटि या खाली पाठ चुनें। CRLF/CR को LF किया जाता है। खाली और अंतिम खाली पंक्ति गिनी जाती हैं; खाली इनपुट शून्य पंक्ति है। पाठ अपलोड या सहेजा नहीं जाता।",
  "limits": "इनपुट: 100,000 UTF-16 इकाइयाँ और 10,000 पंक्तियाँ; आउटपुट: 200,000 इकाइयाँ। खोज और विभाजक: 1–128 इकाइयाँ। पंक्ति सीमा मौजूद होनी चाहिए। लंबाई पूर्णांक 0–100,000, न्यूनतम≤अधिकतम। कॉलम 1–10,000। एस्केप या नियमित अभिव्यक्ति नहीं समझी जाती।",
  "steps": [
    "खाली पंक्तियाँ बचाते हुए पाठ चिपकाएँ।",
    "मोड और पाठ, पंक्ति सीमा, लंबाई या कॉलम चुनें।",
    "पंक्ति गिनती जाँचें और गैर-खाली परिणाम कॉपी करें।"
  ],
  "faqs": [
    "लंबाई और खाली पंक्तियाँ कैसे गिनी जाती हैं?",
    "क्या नियमित अभिव्यक्ति या CSV उद्धरण लगा सकते हैं?"
  ],
  "labels": {
    "mode": "मोड",
    "contains": "पाठ शामिल है",
    "range": "पंक्ति सीमा",
    "length": "पंक्ति लंबाई",
    "column": "कॉलम निकालें",
    "query": "शाब्दिक खोज पाठ",
    "include": "मिलती पंक्तियाँ रखें",
    "exclude": "मिलती पंक्तियाँ हटाएँ",
    "caseSensitive": "अक्षरों का केस मिलाएँ",
    "from": "शुरुआती पंक्ति",
    "to": "अंतिम पंक्ति (शामिल)",
    "min": "न्यूनतम कोड पॉइंट",
    "max": "अधिकतम कोड पॉइंट",
    "delimiter": "शाब्दिक विभाजक",
    "columnNumber": "कॉलम संख्या",
    "missing": "गायब कॉलम",
    "reject": "त्रुटि दिखाएँ",
    "emptyColumn": "खाली पाठ लगाएँ",
    "input": "इनपुट पाठ",
    "output": "छँटा हुआ पाठ",
    "sample": "उदाहरण लगाएँ",
    "clear": "साफ़ करें",
    "inputLines": "इनपुट पंक्तियाँ",
    "outputLines": "आउटपुट पंक्तियाँ",
    "emptyInput": "पाठ चिपकाएँ या उदाहरण लगाएँ।",
    "noMatch": "कोई पंक्ति मेल नहीं खाती।",
    "emptyResult": "परिणाम एक खाली पंक्ति है; कॉपी करने को अक्षर नहीं हैं।",
    "invalid": "सेटिंग और नीचे की सीमाएँ जाँचें।",
    "missingError": "किसी पंक्ति में चुना कॉलम नहीं है। कॉलम बदलें या खाली पाठ चुनें।",
    "inputLimit": "इनपुट 100,000 UTF-16 इकाइयों से अधिक है।",
    "lineLimit": "अंतिम खाली पंक्ति सहित इनपुट 10,000 पंक्तियों से अधिक है।",
    "outputLimit": "आउटपुट 200,000 UTF-16 इकाइयों से अधिक है।"
  }
},
  id: {
  "name": "Filter baris teks",
  "tagline": "Pertahankan atau buang baris berisi teks harfiah, pilih rentang, filter panjang Unicode, atau ambil kolom berpemisah secara lokal dengan spasi tetap terjaga.",
  "rules": "Hanya pencocokan harfiah; abaikan kapital memakai huruf kecil yang tidak bergantung bahasa. Panjang menghitung titik kode Unicode, tanda gabungan terpisah. Baris dimulai dari 1 dan kedua batas termasuk. Kolom memakai pemisah harfiah tanpa kutipan CSV; kolom hilang menjadi galat atau teks kosong. CRLF/CR menjadi LF. Baris kosong dan baris kosong terakhir dihitung; masukan kosong nol baris. Teks tidak diunggah atau disimpan.",
  "limits": "Masukan: 100,000 unit UTF-16 dan 10,000 baris; keluaran: 200,000 unit. Pencarian dan pemisah: 1–128 unit. Rentang harus ada. Panjang: bilangan bulat 0–100,000, minimum≤maksimum. Kolom: 1–10,000. Escape dan ekspresi reguler tidak ditafsirkan.",
  "steps": [
    "Tempel teks dengan mempertahankan baris kosong.",
    "Pilih mode dan teks, rentang, panjang atau kolom.",
    "Periksa jumlah baris lalu salin keluaran yang tidak kosong."
  ],
  "faqs": [
    "Bagaimana panjang dan baris kosong dihitung?",
    "Bisakah memakai ekspresi reguler atau kutipan CSV?"
  ],
  "labels": {
    "mode": "Mode",
    "contains": "Berisi teks",
    "range": "Rentang baris",
    "length": "Panjang baris",
    "column": "Ambil kolom",
    "query": "Teks pencarian harfiah",
    "include": "Pertahankan yang cocok",
    "exclude": "Buang yang cocok",
    "caseSensitive": "Peka huruf besar kecil",
    "from": "Dari baris",
    "to": "Sampai baris (termasuk)",
    "min": "Minimum titik kode",
    "max": "Maksimum titik kode",
    "delimiter": "Pemisah harfiah",
    "columnNumber": "Nomor kolom",
    "missing": "Kolom hilang",
    "reject": "Tampilkan galat",
    "emptyColumn": "Gunakan teks kosong",
    "input": "Teks masukan",
    "output": "Teks terfilter",
    "sample": "Gunakan contoh",
    "clear": "Bersihkan",
    "inputLines": "Baris masukan",
    "outputLines": "Baris keluaran",
    "emptyInput": "Tempel teks atau gunakan contoh.",
    "noMatch": "Tidak ada baris cocok.",
    "emptyResult": "Hasilnya satu baris kosong; tidak ada karakter untuk disalin.",
    "invalid": "Periksa pengaturan dan batas di bawah.",
    "missingError": "Satu baris tidak memiliki kolom tersebut. Ubah kolom atau pilih teks kosong.",
    "inputLimit": "Masukan melebihi 100,000 unit UTF-16.",
    "lineLimit": "Masukan melebihi 10,000 baris termasuk baris kosong terakhir.",
    "outputLimit": "Keluaran melebihi 200,000 unit UTF-16."
  }
},
  vi: {
  "name": "Bộ lọc dòng văn bản",
  "tagline": "Giữ hoặc loại dòng chứa văn bản nguyên nghĩa, chọn khoảng dòng, lọc theo độ dài Unicode hoặc trích cột bằng dấu phân cách ngay trong trình duyệt, giữ nguyên khoảng trắng.",
  "rules": "Chỉ khớp nguyên nghĩa; bỏ qua hoa thường dùng chuyển chữ thường không phụ thuộc ngôn ngữ. Độ dài đếm điểm mã Unicode, dấu kết hợp tính riêng. Dòng bắt đầu từ 1 và gồm cả hai đầu khoảng. Cột tách bằng dấu phân cách nguyên nghĩa, không xử lý dấu ngoặc CSV; cột thiếu báo lỗi hoặc cho văn bản rỗng. CRLF/CR đổi thành LF. Tính cả dòng trống và dòng trống cuối; đầu vào rỗng có không dòng. Không tải lên hoặc lưu văn bản.",
  "limits": "Đầu vào: 100,000 đơn vị UTF-16 và 10,000 dòng; đầu ra: 200,000 đơn vị. Tìm kiếm và dấu phân cách: 1–128 đơn vị. Khoảng dòng phải tồn tại. Độ dài: số nguyên 0–100,000, tối thiểu≤tối đa. Cột: 1–10,000. Không diễn giải ký tự thoát hay biểu thức chính quy.",
  "steps": [
    "Dán văn bản và giữ các dòng trống cần xử lý.",
    "Chọn chế độ cùng văn bản, khoảng, độ dài hoặc cột.",
    "Kiểm tra số dòng và sao chép kết quả không rỗng."
  ],
  "faqs": [
    "Độ dài và dòng trống được đếm thế nào?",
    "Có thể dùng biểu thức chính quy hoặc dấu ngoặc CSV không?"
  ],
  "labels": {
    "mode": "Chế độ",
    "contains": "Chứa văn bản",
    "range": "Khoảng dòng",
    "length": "Độ dài dòng",
    "column": "Trích cột",
    "query": "Văn bản tìm nguyên nghĩa",
    "include": "Giữ dòng khớp",
    "exclude": "Loại dòng khớp",
    "caseSensitive": "Phân biệt hoa thường",
    "from": "Từ dòng",
    "to": "Đến dòng (bao gồm)",
    "min": "Điểm mã tối thiểu",
    "max": "Điểm mã tối đa",
    "delimiter": "Dấu phân cách nguyên nghĩa",
    "columnNumber": "Số cột",
    "missing": "Cột thiếu",
    "reject": "Hiện lỗi",
    "emptyColumn": "Dùng văn bản rỗng",
    "input": "Văn bản đầu vào",
    "output": "Văn bản đã lọc",
    "sample": "Dùng ví dụ",
    "clear": "Xóa",
    "inputLines": "Dòng đầu vào",
    "outputLines": "Dòng đầu ra",
    "emptyInput": "Dán văn bản hoặc dùng ví dụ.",
    "noMatch": "Không có dòng nào khớp.",
    "emptyResult": "Kết quả là một dòng trống; không có ký tự để sao chép.",
    "invalid": "Kiểm tra thiết lập và giới hạn bên dưới.",
    "missingError": "Có dòng thiếu cột đã chọn. Đổi cột hoặc dùng văn bản rỗng.",
    "inputLimit": "Đầu vào vượt quá 100,000 đơn vị UTF-16.",
    "lineLimit": "Đầu vào vượt quá 10,000 dòng, kể cả dòng trống cuối.",
    "outputLimit": "Đầu ra vượt quá 200,000 đơn vị UTF-16."
  }
}
};
export const TEXT_LINE_FILTER_MESSAGES = Object.fromEntries(LOCALES.map((locale) => [locale, TEXT_LINE_FILTER_COPY[locale].labels])) as Record<Locale, Labels>;

export function textLineFilterError(locale: Locale, error: TextLineFilterError): string {
  const c = TEXT_LINE_FILTER_MESSAGES[locale];
  switch (error) {
    case "input-limit": return c.inputLimit;
    case "line-limit": return c.lineLimit;
    case "output-limit": return c.outputLimit;
    case "missing-column": return c.missingError;
    case "range": return `${c.range}: ${c.invalid}`;
    case "length": return `${c.length}: ${c.invalid}`;
    case "query": return `${c.query}: ${c.invalid}`;
    case "delimiter": return `${c.delimiter}: ${c.invalid}`;
    case "column": return `${c.columnNumber}: ${c.invalid}`;
    case "input-type": return c.emptyInput;
    default: return c.invalid;
  }
}
export function textLineFilterToolCopy(): Record<Locale, ToolCopy> {
  const result = {} as Record<Locale, ToolCopy>;
  for (const locale of LOCALES) {
    const c = TEXT_LINE_FILTER_COPY[locale];
    result[locale] = { name: c.name, tagline: c.tagline, intro: [c.tagline, c.rules], steps: c.steps,
      faqs: [{ q: c.faqs[0], a: c.rules }, { q: c.faqs[1], a: c.limits }] };
  }
  return result;
}
