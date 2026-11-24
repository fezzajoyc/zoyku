import type { Locale } from "@/lib/site";
import { fill, type ToolCopy } from "./types";
import { CSV_TABLE_LIMITS, type CsvTableError } from "./csv-table";
import { csvTableDeepDive } from "./deepdive-media";

type CsvTableMessages = {
  name: string; tagline: string; intro: string; rules: string; limits: string;
  steps: [string, string, string]; rulesQuestion: string; limitsQuestion: string;
  operation: string; transpose: string; swap: string; firstColumn: string; secondColumn: string;
  delimiter: string; comma: string; semicolon: string; tab: string; count: string; empty: string;
  inputError: string; delimiterError: string; operationError: string; csvError: string;
  raggedError: string; selectionError: string; limitError: string;
};

export const CSV_TABLE_MESSAGES: Record<Locale, CsvTableMessages> = {
  en: {
    name: "CSV Table Editor", tagline: "Transpose CSV rows and columns or swap two columns while preserving cell text, spaces and leading zeros. Choose comma, semicolon or Tab; work locally in your browser.",
    intro: "Turn rows into columns, or exchange two columns by their positions starting at 1. The first row is ordinary data, so headings move with the rest of the table. Selecting the same column twice leaves its position unchanged. Processing stays in your browser.",
    rules: "Every cell stays text: spaces, Unicode, leading zeros, -0 and large integers are preserved. Quoted delimiters, quotes and embedded line breaks are supported. Empty physical lines are ignored; quoted empty cells and space-only records remain. Rows must have equal widths. Output uses the selected input delimiter and LF record endings; quote layout may normalize.",
    limits: "Input: {input} UTF-16 units; output: {output}. Both tables must fit {rows} rows, {columns} columns and {cells} cells, including the transposed shape. Excess data is rejected with no partial output.",
    steps: ["Paste a rectangular CSV or tab-separated table.", "Choose the matching delimiter and transpose, or swap two column numbers starting at 1.", "Check the output dimensions and copy the result."],
    rulesQuestion: "What happens to headings, empty cells and numeric text?", limitsQuestion: "What size limits apply?",
    operation: "Operation", transpose: "Transpose rows and columns", swap: "Swap two columns", firstColumn: "First column (starts at 1)", secondColumn: "Second column (starts at 1)", delimiter: "Input and output delimiter", comma: "Comma", semicolon: "Semicolon", tab: "Tab", count: "{rows} rows × {columns} columns · {cells} cells", empty: "Paste a table or load the sample to see a result.",
    inputError: "Enter table text.", delimiterError: "Choose comma, semicolon or Tab.", operationError: "Choose transpose or swap.", csvError: "Invalid CSV: check unclosed quotes, quotes inside unquoted cells, or text after a closing quote.", raggedError: "Every row must have the same number of cells. Fix missing or extra fields; no output was returned.", selectionError: "Choose two existing column positions using whole numbers starting at 1.", limitError: "A displayed size or dimension limit was exceeded. Reduce the table; no partial output was returned.",
  },
  zh: {
    name: "CSV 表格编辑器", tagline: "把 CSV 的行列转置，或按列号交换两列，保留空格、前导零和原始单元格文本。支持逗号、分号与制表符，全程在浏览器内完成。",
    intro: "将表格的行变成列，或按从 1 开始的列号交换两列。首行也是普通数据，表头会与其他内容一起移动。两次选择同一列时，位置保持不变。所有处理都在本地浏览器完成。",
    rules: "所有单元格都按文本保留，包括空格、Unicode、前导零、-0 和超大整数。支持引号内的分隔符、双引号与换行。忽略空白物理行；保留引号包裹的空单元格及只有空格的记录。每行列数必须相同。输出沿用所选输入分隔符，以 LF 分隔记录，引号形式可能规范化。",
    limits: "输入上限 {input} 个 UTF-16 单元，输出 {output} 个。输入和输出均最多 {rows} 行、{columns} 列、{cells} 个单元格，转置后的形状也须满足。超限会拒绝处理，不返回部分结果。",
    steps: ["粘贴列数一致的 CSV 或制表符分隔表格。", "选择匹配的分隔符，再选择转置，或填写从 1 开始的两个列号。", "核对输出行列数，然后复制结果。"],
    rulesQuestion: "表头、空单元格和数字文本如何处理？", limitsQuestion: "有哪些大小限制？",
    operation: "操作", transpose: "行列转置", swap: "交换两列", firstColumn: "第一列号（从 1 开始）", secondColumn: "第二列号（从 1 开始）", delimiter: "输入和输出分隔符", comma: "逗号", semicolon: "分号", tab: "制表符", count: "{rows} 行 × {columns} 列 · {cells} 个单元格", empty: "粘贴表格或载入示例，即可查看结果。",
    inputError: "请输入表格文本。", delimiterError: "请选择逗号、分号或制表符。", operationError: "请选择转置或交换列。", csvError: "CSV 格式有误：请检查未闭合的引号、非引号字段中的双引号，或闭合引号后的文字。", raggedError: "每行单元格数必须相同。请修正缺失或多余的字段；未返回结果。", selectionError: "请用从 1 开始的整数选择两个现有列号。", limitError: "超出所示大小或行列限制。请缩小表格；未返回部分结果。",
  },
  ja: {
    name: "CSV 表エディター", tagline: "CSV の行と列を転置、または 2 列を交換。空白や先頭のゼロを含むセルの文字列を保ち、カンマ・セミコロン・タブに対応。ブラウザー内で処理します。",
    intro: "行を列に変えるか、1 から数える列番号で 2 列を交換します。先頭行も通常のデータとして扱うため、見出しも一緒に移動します。同じ列を 2 回指定した場合は位置を変えません。処理はブラウザー内で完結します。",
    rules: "空白、Unicode、先頭のゼロ、-0、大きな整数を文字列のまま保持します。引用符内の区切り文字、引用符、改行に対応します。空の物理行は無視し、引用された空セルや空白だけのレコードは残します。各行の列数は同じである必要があります。出力は選択した区切り文字と LF 改行を使い、引用の形式は正規化される場合があります。",
    limits: "入力は {input} UTF-16 単位、出力は {output} 単位まで。入力と出力はともに最大 {rows} 行、{columns} 列、{cells} セルです。転置後にも適用します。上限を超えると部分的な結果を返さずに拒否します。",
    steps: ["列数がそろった CSV またはタブ区切りの表を貼り付けます。", "区切り文字を合わせ、転置を選ぶか 1 から始まる 2 つの列番号を指定します。", "出力の行数と列数を確認し、結果をコピーします。"],
    rulesQuestion: "見出し、空セル、数値の文字列はどう扱いますか？", limitsQuestion: "サイズの上限はありますか？",
    operation: "操作", transpose: "行と列を転置", swap: "2 列を交換", firstColumn: "1 つ目の列番号（1 から）", secondColumn: "2 つ目の列番号（1 から）", delimiter: "入力と出力の区切り文字", comma: "カンマ", semicolon: "セミコロン", tab: "タブ", count: "{rows} 行 × {columns} 列 · {cells} セル", empty: "表を貼り付けるかサンプルを読み込むと結果が表示されます。",
    inputError: "表のテキストを入力してください。", delimiterError: "カンマ、セミコロン、タブから選んでください。", operationError: "転置または列の交換を選んでください。", csvError: "CSV が不正です。閉じていない引用符、非引用セル内の引用符、閉じた引用符の後の文字を確認してください。", raggedError: "各行のセル数をそろえてください。欠落や余分なフィールドがあるため結果は返していません。", selectionError: "存在する 2 列を、1 から始まる整数の列番号で指定してください。", limitError: "表示されたサイズまたは行列数の上限を超えました。表を小さくしてください。部分的な結果は返しません。",
  },
  es: {
    name: "Editor de tablas CSV", tagline: "Transpón filas y columnas CSV o intercambia dos columnas conservando texto, espacios y ceros iniciales. Usa coma, punto y coma o tabulación en tu navegador.",
    intro: "Convierte filas en columnas o intercambia dos columnas por su posición, contando desde 1. La primera fila es un dato más: los encabezados también se mueven. Elegir la misma columna dos veces mantiene su posición. Todo se procesa en tu navegador.",
    rules: "Cada celda conserva su texto: espacios, Unicode, ceros iniciales, -0 y enteros grandes. Se admiten separadores, comillas y saltos dentro de campos entrecomillados. Se ignoran las líneas físicas vacías; se conservan las celdas vacías entrecomilladas y los registros con espacios. Todas las filas deben tener igual ancho. La salida usa el separador elegido y finales LF; las comillas pueden normalizarse.",
    limits: "Entrada: {input} unidades UTF-16; salida: {output}. Ambas tablas admiten hasta {rows} filas, {columns} columnas y {cells} celdas, también tras transponer. Los excesos se rechazan sin salida parcial.",
    steps: ["Pega un CSV rectangular o una tabla separada por tabulaciones.", "Elige el separador correcto y transpón, o indica dos columnas contando desde 1.", "Comprueba las dimensiones de salida y copia el resultado."],
    rulesQuestion: "¿Qué ocurre con encabezados, celdas vacías y números?", limitsQuestion: "¿Qué límites de tamaño se aplican?",
    operation: "Operación", transpose: "Transponer filas y columnas", swap: "Intercambiar dos columnas", firstColumn: "Primera columna (desde 1)", secondColumn: "Segunda columna (desde 1)", delimiter: "Separador de entrada y salida", comma: "Coma", semicolon: "Punto y coma", tab: "Tabulación", count: "{rows} filas × {columns} columnas · {cells} celdas", empty: "Pega una tabla o carga el ejemplo para ver el resultado.",
    inputError: "Introduce el texto de la tabla.", delimiterError: "Elige coma, punto y coma o tabulación.", operationError: "Elige transponer o intercambiar.", csvError: "CSV no válido: revisa comillas sin cerrar, comillas en celdas sin entrecomillar o texto tras una comilla de cierre.", raggedError: "Todas las filas deben tener igual número de celdas. Corrige campos de más o de menos; no se devolvió salida.", selectionError: "Elige dos columnas existentes con posiciones enteras desde 1.", limitError: "Se superó un límite de tamaño o dimensiones indicado. Reduce la tabla; no hay salida parcial.",
  },
  pt: {
    name: "Editor de tabelas CSV", tagline: "Transponha linhas e colunas CSV ou troque duas colunas preservando texto, espaços e zeros iniciais. Escolha vírgula, ponto e vírgula ou tabulação no navegador.",
    intro: "Transforme linhas em colunas ou troque duas colunas pela posição, começando em 1. A primeira linha é tratada como dado comum; cabeçalhos também se movem. Selecionar a mesma coluna duas vezes mantém sua posição. O processamento ocorre no navegador.",
    rules: "Cada célula permanece texto: espaços, Unicode, zeros iniciais, -0 e inteiros grandes são preservados. Há suporte a separadores, aspas e quebras dentro de campos entre aspas. Linhas físicas vazias são ignoradas; células vazias entre aspas e registros só com espaços permanecem. Todas as linhas precisam ter a mesma largura. A saída usa o separador escolhido e finais LF; as aspas podem ser normalizadas.",
    limits: "Entrada: {input} unidades UTF-16; saída: {output}. Cada tabela aceita até {rows} linhas, {columns} colunas e {cells} células, inclusive após transpor. Excessos são rejeitados sem saída parcial.",
    steps: ["Cole um CSV retangular ou uma tabela separada por tabulações.", "Escolha o separador correto e transponha, ou indique duas colunas a partir de 1.", "Confira as dimensões de saída e copie o resultado."],
    rulesQuestion: "Como ficam cabeçalhos, células vazias e números?", limitsQuestion: "Quais são os limites de tamanho?",
    operation: "Operação", transpose: "Transpor linhas e colunas", swap: "Trocar duas colunas", firstColumn: "Primeira coluna (a partir de 1)", secondColumn: "Segunda coluna (a partir de 1)", delimiter: "Separador de entrada e saída", comma: "Vírgula", semicolon: "Ponto e vírgula", tab: "Tabulação", count: "{rows} linhas × {columns} colunas · {cells} células", empty: "Cole uma tabela ou carregue o exemplo para ver o resultado.",
    inputError: "Insira o texto da tabela.", delimiterError: "Escolha vírgula, ponto e vírgula ou tabulação.", operationError: "Escolha transpor ou trocar.", csvError: "CSV inválido: confira aspas não fechadas, aspas em células sem aspas ou texto após as aspas finais.", raggedError: "Todas as linhas devem ter o mesmo número de células. Corrija campos ausentes ou extras; nenhuma saída foi retornada.", selectionError: "Escolha duas posições de coluna existentes com números inteiros a partir de 1.", limitError: "Um limite de tamanho ou dimensões indicado foi excedido. Reduza a tabela; não há saída parcial.",
  },
  de: {
    name: "CSV-Tabelleneditor", tagline: "CSV-Zeilen und Spalten transponieren oder zwei Spalten tauschen. Zelltext, Leerzeichen und führende Nullen bleiben erhalten; Komma, Semikolon und Tab werden unterstützt.",
    intro: "Mache Zeilen zu Spalten oder tausche zwei Spalten anhand ihrer Position ab 1. Die erste Zeile zählt als normale Daten, Überschriften werden also mitbewegt. Dieselbe Spalte zweimal zu wählen ändert ihre Position nicht. Alles läuft im Browser.",
    rules: "Jede Zelle bleibt Text: Leerzeichen, Unicode, führende Nullen, -0 und große Ganzzahlen bleiben erhalten. Trennzeichen, Anführungszeichen und Umbrüche in zitierten Feldern werden unterstützt. Leere physische Zeilen werden übersprungen; zitierte leere Zellen und Datensätze aus Leerzeichen bleiben erhalten. Alle Zeilen müssen gleich breit sein. Die Ausgabe nutzt das gewählte Trennzeichen und LF-Zeilenenden; die Zitierung kann vereinheitlicht werden.",
    limits: "Eingabe: {input} UTF-16-Einheiten; Ausgabe: {output}. Beide Tabellen dürfen höchstens {rows} Zeilen, {columns} Spalten und {cells} Zellen haben, auch nach dem Transponieren. Überschreitungen werden ohne Teilausgabe abgelehnt.",
    steps: ["Eine rechteckige CSV- oder tabulatorgetrennte Tabelle einfügen.", "Passendes Trennzeichen wählen und transponieren oder zwei Spaltennummern ab 1 eingeben.", "Ausgabemaße prüfen und das Ergebnis kopieren."],
    rulesQuestion: "Was passiert mit Überschriften, leeren Zellen und Zahlen?", limitsQuestion: "Welche Größenlimits gelten?",
    operation: "Vorgang", transpose: "Zeilen und Spalten transponieren", swap: "Zwei Spalten tauschen", firstColumn: "Erste Spalte (ab 1)", secondColumn: "Zweite Spalte (ab 1)", delimiter: "Trennzeichen für Ein- und Ausgabe", comma: "Komma", semicolon: "Semikolon", tab: "Tabulator", count: "{rows} Zeilen × {columns} Spalten · {cells} Zellen", empty: "Eine Tabelle einfügen oder das Beispiel laden, um ein Ergebnis zu sehen.",
    inputError: "Tabellentext eingeben.", delimiterError: "Komma, Semikolon oder Tabulator wählen.", operationError: "Transponieren oder Tauschen wählen.", csvError: "Ungültige CSV: offene Anführungszeichen, Anführungszeichen in unzitierten Zellen oder Text nach dem schließenden Zeichen prüfen.", raggedError: "Alle Zeilen müssen gleich viele Zellen haben. Fehlende oder zusätzliche Felder korrigieren; keine Ausgabe erstellt.", selectionError: "Zwei vorhandene Spalten mit ganzzahligen Positionen ab 1 wählen.", limitError: "Ein angegebenes Größen- oder Dimensionslimit wurde überschritten. Tabelle verkleinern; keine Teilausgabe erstellt.",
  },
  fr: {
    name: "Éditeur de tableaux CSV", tagline: "Transposez lignes et colonnes CSV ou échangez deux colonnes en gardant texte, espaces et zéros initiaux. Virgule, point-virgule ou tabulation, dans votre navigateur.",
    intro: "Transformez les lignes en colonnes ou échangez deux colonnes par leur position, à partir de 1. La première ligne est une donnée ordinaire : les en-têtes se déplacent aussi. Choisir deux fois la même colonne garde sa position. Le traitement reste dans le navigateur.",
    rules: "Chaque cellule reste du texte : espaces, Unicode, zéros initiaux, -0 et grands entiers sont conservés. Les séparateurs, guillemets et sauts de ligne dans les champs cités sont pris en charge. Les lignes physiques vides sont ignorées ; les cellules vides entre guillemets et les enregistrements composés d'espaces restent présents. Toutes les lignes doivent avoir la même largeur. La sortie utilise le séparateur choisi et des fins LF ; la citation peut être normalisée.",
    limits: "Entrée : {input} unités UTF-16 ; sortie : {output}. Chaque tableau est limité à {rows} lignes, {columns} colonnes et {cells} cellules, y compris après transposition. Tout dépassement est refusé sans sortie partielle.",
    steps: ["Collez un CSV rectangulaire ou un tableau séparé par des tabulations.", "Choisissez le bon séparateur puis transposez, ou indiquez deux colonnes à partir de 1.", "Vérifiez les dimensions de sortie et copiez le résultat."],
    rulesQuestion: "Que deviennent les en-têtes, cellules vides et nombres ?", limitsQuestion: "Quelles limites de taille s'appliquent ?",
    operation: "Opération", transpose: "Transposer lignes et colonnes", swap: "Échanger deux colonnes", firstColumn: "Première colonne (à partir de 1)", secondColumn: "Deuxième colonne (à partir de 1)", delimiter: "Séparateur d'entrée et de sortie", comma: "Virgule", semicolon: "Point-virgule", tab: "Tabulation", count: "{rows} lignes × {columns} colonnes · {cells} cellules", empty: "Collez un tableau ou chargez l'exemple pour afficher un résultat.",
    inputError: "Saisissez le texte du tableau.", delimiterError: "Choisissez virgule, point-virgule ou tabulation.", operationError: "Choisissez transposer ou échanger.", csvError: "CSV invalide : vérifiez les guillemets non fermés, ceux dans une cellule non citée ou le texte après un guillemet fermant.", raggedError: "Toutes les lignes doivent avoir autant de cellules. Corrigez les champs manquants ou en trop ; aucune sortie n'est produite.", selectionError: "Choisissez deux positions de colonne existantes, en nombres entiers à partir de 1.", limitError: "Une limite de taille ou de dimensions indiquée est dépassée. Réduisez le tableau ; aucune sortie partielle n'est produite.",
  },
  it: {
    name: "Editor di tabelle CSV", tagline: "Trasponi righe e colonne CSV o scambia due colonne mantenendo testo, spazi e zeri iniziali. Scegli virgola, punto e virgola o tabulazione; tutto avviene nel browser.",
    intro: "Trasforma le righe in colonne oppure scambia due colonne in base alla posizione, contando da 1. La prima riga è un dato normale: anche le intestazioni si spostano. Scegliere due volte la stessa colonna ne mantiene la posizione. L'elaborazione avviene nel browser.",
    rules: "Ogni cella resta testo: spazi, Unicode, zeri iniziali, -0 e interi grandi rimangono intatti. Sono supportati separatori, virgolette e a capo nei campi tra virgolette. Le righe fisiche vuote sono ignorate; le celle vuote tra virgolette e i record di soli spazi restano. Tutte le righe devono avere la stessa larghezza. L'uscita usa il separatore scelto e terminatori LF; le virgolette possono essere normalizzate.",
    limits: "Ingresso: {input} unità UTF-16; uscita: {output}. Entrambe le tabelle ammettono al massimo {rows} righe, {columns} colonne e {cells} celle, anche dopo la trasposizione. I superamenti sono rifiutati senza risultati parziali.",
    steps: ["Incolla un CSV rettangolare o una tabella separata da tabulazioni.", "Scegli il separatore corretto e trasponi, oppure indica due colonne contando da 1.", "Verifica le dimensioni in uscita e copia il risultato."],
    rulesQuestion: "Come vengono trattati intestazioni, celle vuote e numeri?", limitsQuestion: "Quali limiti di dimensione si applicano?",
    operation: "Operazione", transpose: "Trasponi righe e colonne", swap: "Scambia due colonne", firstColumn: "Prima colonna (da 1)", secondColumn: "Seconda colonna (da 1)", delimiter: "Separatore di ingresso e uscita", comma: "Virgola", semicolon: "Punto e virgola", tab: "Tabulazione", count: "{rows} righe × {columns} colonne · {cells} celle", empty: "Incolla una tabella o carica l'esempio per vedere un risultato.",
    inputError: "Inserisci il testo della tabella.", delimiterError: "Scegli virgola, punto e virgola o tabulazione.", operationError: "Scegli trasponi o scambia.", csvError: "CSV non valido: controlla virgolette non chiuse, virgolette in celle non delimitate o testo dopo la chiusura.", raggedError: "Tutte le righe devono avere lo stesso numero di celle. Correggi i campi mancanti o in eccesso; nessun risultato restituito.", selectionError: "Scegli due posizioni di colonna esistenti con numeri interi a partire da 1.", limitError: "È stato superato un limite di dimensione indicato. Riduci la tabella; non viene restituito un risultato parziale.",
  },
  ko: {
    name: "CSV 표 편집기", tagline: "CSV의 행과 열을 바꾸거나 두 열의 위치를 교환하면서 셀의 텍스트, 공백, 앞자리 0을 보존하세요. 쉼표, 세미콜론, 탭 구분자를 지원하며 모든 처리는 브라우저에서 이루어집니다.",
    intro: "행을 열로 전치하거나 1부터 시작하는 열 번호로 두 열을 교환합니다. 첫 행도 일반 데이터이므로 머리글도 함께 이동합니다. 같은 열을 두 번 선택하면 위치가 바뀌지 않습니다. 처리는 브라우저 안에서 이루어집니다.",
    rules: "모든 셀을 텍스트로 유지하여 공백, Unicode, 앞자리 0, -0, 큰 정수를 보존합니다. 따옴표 안의 구분자, 따옴표, 줄바꿈을 지원합니다. 비어 있는 물리적 줄은 무시하고 따옴표로 감싼 빈 셀과 공백만 있는 레코드는 남깁니다. 각 행의 열 수는 같아야 합니다. 출력에는 선택한 구분자와 LF 줄 끝을 사용하며 따옴표 형식은 정규화될 수 있습니다.",
    limits: "입력은 UTF-16 {input}단위, 출력은 {output}단위까지입니다. 입력과 출력은 각각 최대 {rows}행, {columns}열, {cells}셀로 제한되며 전치 후에도 적용됩니다. 초과 시 부분 결과 없이 거부합니다.",
    steps: ["열 수가 일정한 CSV 또는 탭으로 구분한 표를 붙여넣으세요.", "구분자를 맞춘 뒤 전치를 선택하거나 1부터 시작하는 두 열 번호를 입력하세요.", "출력의 행과 열 수를 확인하고 결과를 복사하세요."],
    rulesQuestion: "머리글, 빈 셀, 숫자 텍스트는 어떻게 처리하나요?", limitsQuestion: "크기 제한은 무엇인가요?",
    operation: "작업", transpose: "행과 열 전치", swap: "두 열 교환", firstColumn: "첫 번째 열 번호(1부터)", secondColumn: "두 번째 열 번호(1부터)", delimiter: "입력 및 출력 구분자", comma: "쉼표", semicolon: "세미콜론", tab: "탭", count: "{rows}행 × {columns}열 · {cells}셀", empty: "표를 붙여넣거나 예제를 불러오면 결과가 표시됩니다.",
    inputError: "표 텍스트를 입력하세요.", delimiterError: "쉼표, 세미콜론 또는 탭을 선택하세요.", operationError: "전치 또는 열 교환을 선택하세요.", csvError: "잘못된 CSV입니다. 닫히지 않은 따옴표, 일반 셀 안의 따옴표, 닫는 따옴표 뒤의 텍스트를 확인하세요.", raggedError: "모든 행의 셀 수가 같아야 합니다. 누락되거나 추가된 필드를 수정하세요. 결과를 반환하지 않았습니다.", selectionError: "1부터 시작하는 정수로 존재하는 두 열 번호를 선택하세요.", limitError: "표시된 크기 또는 행·열 제한을 초과했습니다. 표를 줄이세요. 부분 결과는 반환하지 않습니다.",
  },
  ru: {
    name: "Редактор таблиц CSV", tagline: "Транспонируйте строки и столбцы CSV или меняйте два столбца местами, сохраняя текст, пробелы и начальные нули. Запятая, точка с запятой и табуляция — прямо в браузере.",
    intro: "Превратите строки в столбцы или поменяйте два столбца по номерам, начиная с 1. Первая строка — обычные данные, поэтому заголовки тоже перемещаются. Если дважды выбрать один столбец, его место не изменится. Обработка выполняется в браузере.",
    rules: "Все ячейки остаются текстом: сохраняются пробелы, Unicode, начальные нули, -0 и большие целые. Поддерживаются разделители, кавычки и переводы строк внутри кавычек. Пустые физические строки пропускаются; пустые ячейки в кавычках и записи из пробелов сохраняются. Ширина всех строк должна совпадать. Вывод использует выбранный разделитель и окончания LF; оформление кавычек может нормализоваться.",
    limits: "Ввод: {input} единиц UTF-16; вывод: {output}. В каждой таблице допускается до {rows} строк, {columns} столбцов и {cells} ячеек, включая форму после транспонирования. При превышении частичный результат не возвращается.",
    steps: ["Вставьте прямоугольную CSV-таблицу или текст с табуляцией.", "Выберите разделитель и транспонирование либо укажите два номера столбцов от 1.", "Проверьте размеры выходной таблицы и скопируйте результат."],
    rulesQuestion: "Что происходит с заголовками, пустыми ячейками и числами?", limitsQuestion: "Какие ограничения размера действуют?",
    operation: "Операция", transpose: "Транспонировать строки и столбцы", swap: "Поменять два столбца", firstColumn: "Первый столбец (от 1)", secondColumn: "Второй столбец (от 1)", delimiter: "Разделитель ввода и вывода", comma: "Запятая", semicolon: "Точка с запятой", tab: "Табуляция", count: "Строк: {rows} × столбцов: {columns} · ячеек: {cells}", empty: "Вставьте таблицу или загрузите пример, чтобы увидеть результат.",
    inputError: "Введите текст таблицы.", delimiterError: "Выберите запятую, точку с запятой или табуляцию.", operationError: "Выберите транспонирование или обмен столбцов.", csvError: "Неверный CSV: проверьте незакрытые кавычки, кавычки в обычных ячейках и текст после закрывающей кавычки.", raggedError: "Во всех строках должно быть одинаковое число ячеек. Исправьте пропущенные или лишние поля; результат не возвращён.", selectionError: "Выберите два существующих столбца целыми номерами от 1.", limitError: "Превышено указанное ограничение объёма или размеров. Уменьшите таблицу; частичный результат не возвращается.",
  },
  tr: {
    name: "CSV Tablo Düzenleyici", tagline: "CSV satır ve sütunlarını devrik çevirin veya iki sütunun yerini değiştirin. Metin, boşluk ve baştaki sıfırlar korunur; virgül, noktalı virgül ve sekme desteklenir.",
    intro: "Satırları sütunlara dönüştürün veya 1'den başlayan konumlarıyla iki sütunu değiştirin. İlk satır da normal veridir; başlıklar diğer hücrelerle birlikte taşınır. Aynı sütunu iki kez seçmek yerini değiştirmez. İşlem tarayıcınızda yapılır.",
    rules: "Her hücre metin kalır: boşluklar, Unicode, baştaki sıfırlar, -0 ve büyük tam sayılar korunur. Tırnak içindeki ayırıcı, tırnak ve satır sonları desteklenir. Boş fiziksel satırlar atlanır; tırnaklı boş hücreler ve yalnız boşluk içeren kayıtlar kalır. Tüm satırların genişliği eşit olmalıdır. Çıktı seçilen ayırıcıyı ve LF satır sonlarını kullanır; tırnak biçimi normalleşebilir.",
    limits: "Girdi: {input} UTF-16 birimi; çıktı: {output}. Her iki tablo da en fazla {rows} satır, {columns} sütun ve {cells} hücre içerebilir; devrik biçim de buna dahildir. Aşımda kısmi çıktı verilmez.",
    steps: ["Dikdörtgen bir CSV veya sekmeyle ayrılmış tablo yapıştırın.", "Uygun ayırıcıyı seçip devrik çevirin ya da 1'den başlayan iki sütun numarası girin.", "Çıktı boyutlarını kontrol edip sonucu kopyalayın."],
    rulesQuestion: "Başlıklar, boş hücreler ve sayı metni nasıl işlenir?", limitsQuestion: "Hangi boyut sınırları uygulanır?",
    operation: "İşlem", transpose: "Satır ve sütunları devrik çevir", swap: "İki sütunu değiştir", firstColumn: "İlk sütun (1'den başlar)", secondColumn: "İkinci sütun (1'den başlar)", delimiter: "Girdi ve çıktı ayırıcısı", comma: "Virgül", semicolon: "Noktalı virgül", tab: "Sekme", count: "{rows} satır × {columns} sütun · {cells} hücre", empty: "Sonucu görmek için tablo yapıştırın veya örneği yükleyin.",
    inputError: "Tablo metnini girin.", delimiterError: "Virgül, noktalı virgül veya sekme seçin.", operationError: "Devrik çevirme veya sütun değiştirme seçin.", csvError: "Geçersiz CSV: kapanmamış tırnakları, tırnaksız hücrelerdeki tırnakları veya kapanış tırnağından sonraki metni kontrol edin.", raggedError: "Tüm satırlarda aynı sayıda hücre olmalıdır. Eksik veya fazla alanları düzeltin; çıktı döndürülmedi.", selectionError: "1'den başlayan tam sayılarla var olan iki sütun konumunu seçin.", limitError: "Gösterilen boyut veya satır-sütun sınırı aşıldı. Tabloyu küçültün; kısmi çıktı döndürülmedi.",
  },
  ar: {
    name: "محرر جداول CSV", tagline: "حوّل صفوف CSV إلى أعمدة أو بدّل موضعي عمودين مع حفظ النص والمسافات والأصفار الأولى. يدعم الفاصلة والفاصلة المنقوطة والتبويب ويعمل داخل المتصفح.",
    intro: "حوّل الصفوف إلى أعمدة أو بدّل عمودين حسب موضعيهما بدءاً من 1. يعامل الصف الأول كبيانات عادية، فتتحرك العناوين مع بقية الجدول. اختيار العمود نفسه مرتين يبقي موضعه. تتم المعالجة في المتصفح.",
    rules: "تبقى الخلايا نصاً مع حفظ المسافات وUnicode والأصفار الأولى و-0 والأعداد الصحيحة الكبيرة. يدعم الفواصل وعلامات الاقتباس والأسطر داخل الحقول المقتبسة. يهمل الأسطر الفعلية الفارغة ويحفظ الخلايا الفارغة المقتبسة والسجلات ذات المسافات فقط. يجب تساوي عدد الخلايا في الصفوف. يستخدم الإخراج الفاصل المختار ونهايات LF، وقد يوحّد أسلوب الاقتباس.",
    limits: "الإدخال: {input} وحدة UTF-16؛ الإخراج: {output}. الحد لكل جدول {rows} صف و{columns} عمود و{cells} خلية، بما في ذلك الشكل بعد التحويل. يرفض التجاوز دون إخراج جزئي.",
    steps: ["الصق CSV مستطيل الشكل أو جدولاً مفصولاً بالتبويب.", "اختر الفاصل المطابق ثم تحويل الصفوف والأعمدة، أو أدخل رقمي عمودين بدءاً من 1.", "راجع أبعاد الإخراج وانسخ النتيجة."],
    rulesQuestion: "كيف تعالج العناوين والخلايا الفارغة والنصوص الرقمية؟", limitsQuestion: "ما حدود الحجم؟",
    operation: "العملية", transpose: "تحويل الصفوف والأعمدة", swap: "تبديل عمودين", firstColumn: "العمود الأول (يبدأ من 1)", secondColumn: "العمود الثاني (يبدأ من 1)", delimiter: "فاصل الإدخال والإخراج", comma: "فاصلة", semicolon: "فاصلة منقوطة", tab: "تبويب", count: "{rows} صف × {columns} عمود · {cells} خلية", empty: "الصق جدولاً أو حمّل المثال لرؤية النتيجة.",
    inputError: "أدخل نص الجدول.", delimiterError: "اختر الفاصلة أو الفاصلة المنقوطة أو التبويب.", operationError: "اختر تحويل الصفوف والأعمدة أو تبديل عمودين.", csvError: "CSV غير صالح: راجع الاقتباسات غير المغلقة أو داخل خلايا غير مقتبسة أو النص بعد اقتباس الإغلاق.", raggedError: "يجب أن يكون عدد الخلايا متساوياً في كل الصفوف. أصلح الحقول الناقصة أو الزائدة؛ لم تعد نتيجة.", selectionError: "اختر موضعَي عمودين موجودين بأعداد صحيحة تبدأ من 1.", limitError: "تجاوز الجدول حد الحجم أو الأبعاد المعروض. قلّل الجدول؛ لم يعد إخراج جزئي.",
  },
  hi: {
    name: "CSV तालिका संपादक", tagline: "CSV की पंक्तियों और कॉलम को ट्रांसपोज़ करें या दो कॉलम बदलें। टेक्स्ट, स्पेस और शुरुआती शून्य सुरक्षित रहते हैं; कॉमा, सेमीकोलन या टैब चुनकर ब्राउज़र में काम करें।",
    intro: "पंक्तियों को कॉलम में बदलें या 1 से शुरू होने वाले स्थान से दो कॉलम की अदला-बदली करें। पहली पंक्ति भी सामान्य डेटा है, इसलिए शीर्षक भी साथ चलते हैं। एक ही कॉलम दो बार चुनने से स्थान नहीं बदलता। प्रक्रिया ब्राउज़र में होती है।",
    rules: "हर सेल टेक्स्ट रहता है: स्पेस, Unicode, शुरुआती शून्य, -0 और बड़े पूर्णांक सुरक्षित हैं। उद्धृत फ़ील्ड में विभाजक, उद्धरण और नई पंक्तियाँ समर्थित हैं। खाली भौतिक पंक्तियाँ छूटती हैं; उद्धृत खाली सेल और केवल स्पेस वाले रिकॉर्ड रहते हैं। सभी पंक्तियों की चौड़ाई समान होनी चाहिए। आउटपुट चुने विभाजक और LF पंक्ति अंत का उपयोग करता है; उद्धरण का रूप सामान्य हो सकता है।",
    limits: "इनपुट: {input} UTF-16 इकाइयाँ; आउटपुट: {output}। दोनों तालिकाओं में अधिकतम {rows} पंक्तियाँ, {columns} कॉलम और {cells} सेल हो सकते हैं, ट्रांसपोज़ के बाद भी। सीमा पार होने पर आंशिक आउटपुट नहीं मिलता।",
    steps: ["समान कॉलम वाली CSV या टैब से विभाजित तालिका चिपकाएँ।", "सही विभाजक चुनकर ट्रांसपोज़ करें या 1 से शुरू होने वाले दो कॉलम नंबर दें।", "आउटपुट के आयाम जाँचें और परिणाम कॉपी करें।"],
    rulesQuestion: "शीर्षक, खाली सेल और संख्या टेक्स्ट का क्या होता है?", limitsQuestion: "आकार की क्या सीमाएँ हैं?",
    operation: "क्रिया", transpose: "पंक्ति और कॉलम ट्रांसपोज़ करें", swap: "दो कॉलम बदलें", firstColumn: "पहला कॉलम (1 से)", secondColumn: "दूसरा कॉलम (1 से)", delimiter: "इनपुट और आउटपुट विभाजक", comma: "कॉमा", semicolon: "सेमीकोलन", tab: "टैब", count: "{rows} पंक्तियाँ × {columns} कॉलम · {cells} सेल", empty: "परिणाम देखने के लिए तालिका चिपकाएँ या उदाहरण लोड करें।",
    inputError: "तालिका का टेक्स्ट दें।", delimiterError: "कॉमा, सेमीकोलन या टैब चुनें।", operationError: "ट्रांसपोज़ या कॉलम बदलना चुनें।", csvError: "अमान्य CSV: खुले उद्धरण, बिना उद्धरण वाले सेल में उद्धरण या बंद उद्धरण के बाद का टेक्स्ट जाँचें।", raggedError: "हर पंक्ति में समान सेल होने चाहिए। कम या अतिरिक्त फ़ील्ड सुधारें; आउटपुट नहीं दिया गया।", selectionError: "1 से शुरू होने वाले पूर्णांक से मौजूद दो कॉलम स्थान चुनें।", limitError: "दिखाई गई आकार या आयाम सीमा पार हुई। तालिका घटाएँ; आंशिक आउटपुट नहीं दिया गया।",
  },
  id: {
    name: "Editor Tabel CSV", tagline: "Transposisikan baris dan kolom CSV atau tukar dua kolom sambil menjaga teks, spasi, dan nol awal. Pilih koma, titik koma, atau Tab; proses berlangsung di browser.",
    intro: "Ubah baris menjadi kolom atau tukar dua kolom berdasarkan posisi mulai dari 1. Baris pertama adalah data biasa, sehingga tajuk ikut berpindah. Memilih kolom yang sama dua kali tidak mengubah posisinya. Pemrosesan dilakukan di browser.",
    rules: "Setiap sel tetap teks: spasi, Unicode, nol awal, -0, dan bilangan bulat besar dipertahankan. Mendukung pemisah, tanda kutip, dan baris baru dalam bidang berkutip. Baris fisik kosong diabaikan; sel kosong berkutip dan rekaman berisi spasi tetap ada. Lebar semua baris harus sama. Keluaran memakai pemisah terpilih dan akhir baris LF; bentuk kutipan dapat dinormalisasi.",
    limits: "Masukan: {input} unit UTF-16; keluaran: {output}. Kedua tabel dibatasi {rows} baris, {columns} kolom, dan {cells} sel, termasuk bentuk setelah transposisi. Kelebihan ditolak tanpa keluaran sebagian.",
    steps: ["Tempel CSV persegi panjang atau tabel yang dipisahkan Tab.", "Pilih pemisah yang sesuai lalu transposisikan, atau masukkan dua nomor kolom mulai dari 1.", "Periksa dimensi keluaran dan salin hasilnya."],
    rulesQuestion: "Bagaimana tajuk, sel kosong, dan teks angka ditangani?", limitsQuestion: "Apa batas ukurannya?",
    operation: "Operasi", transpose: "Transposisikan baris dan kolom", swap: "Tukar dua kolom", firstColumn: "Kolom pertama (mulai 1)", secondColumn: "Kolom kedua (mulai 1)", delimiter: "Pemisah masukan dan keluaran", comma: "Koma", semicolon: "Titik koma", tab: "Tab", count: "{rows} baris × {columns} kolom · {cells} sel", empty: "Tempel tabel atau muat contoh untuk melihat hasilnya.",
    inputError: "Masukkan teks tabel.", delimiterError: "Pilih koma, titik koma, atau Tab.", operationError: "Pilih transposisi atau tukar kolom.", csvError: "CSV tidak valid: periksa kutip yang belum ditutup, kutip dalam sel tanpa kutip, atau teks setelah kutip penutup.", raggedError: "Semua baris harus memiliki jumlah sel yang sama. Perbaiki bidang yang kurang atau berlebih; tidak ada keluaran.", selectionError: "Pilih dua posisi kolom yang ada dengan bilangan bulat mulai dari 1.", limitError: "Batas ukuran atau dimensi yang ditampilkan terlampaui. Kurangi tabel; tidak ada keluaran sebagian.",
  },
  vi: {
    name: "Trình chỉnh sửa bảng CSV", tagline: "Chuyển vị hàng và cột CSV hoặc đổi chỗ hai cột, giữ nguyên văn bản, khoảng trắng và số 0 đầu. Chọn dấu phẩy, chấm phẩy hoặc Tab và xử lý ngay trong trình duyệt.",
    intro: "Đổi hàng thành cột hoặc hoán đổi hai cột theo vị trí bắt đầu từ 1. Hàng đầu cũng là dữ liệu thường nên tiêu đề di chuyển cùng bảng. Chọn cùng một cột hai lần sẽ giữ nguyên vị trí. Mọi xử lý diễn ra trong trình duyệt.",
    rules: "Mỗi ô vẫn là văn bản: giữ khoảng trắng, Unicode, số 0 đầu, -0 và số nguyên lớn. Hỗ trợ dấu phân cách, dấu ngoặc kép và xuống dòng trong trường có trích dẫn. Bỏ qua dòng vật lý rỗng; giữ ô rỗng có ngoặc kép và bản ghi chỉ gồm khoảng trắng. Mọi hàng phải có cùng số cột. Đầu ra dùng dấu phân cách đã chọn và kết thúc dòng LF; cách đặt ngoặc kép có thể được chuẩn hóa.",
    limits: "Đầu vào: {input} đơn vị UTF-16; đầu ra: {output}. Mỗi bảng tối đa {rows} hàng, {columns} cột và {cells} ô, kể cả sau chuyển vị. Vượt giới hạn sẽ bị từ chối và không trả kết quả một phần.",
    steps: ["Dán CSV hình chữ nhật hoặc bảng phân cách bằng Tab.", "Chọn đúng dấu phân cách rồi chuyển vị, hoặc nhập hai số cột bắt đầu từ 1.", "Kiểm tra kích thước đầu ra rồi sao chép kết quả."],
    rulesQuestion: "Tiêu đề, ô rỗng và văn bản số được xử lý thế nào?", limitsQuestion: "Có những giới hạn kích thước nào?",
    operation: "Thao tác", transpose: "Chuyển vị hàng và cột", swap: "Đổi chỗ hai cột", firstColumn: "Cột thứ nhất (từ 1)", secondColumn: "Cột thứ hai (từ 1)", delimiter: "Dấu phân cách đầu vào và đầu ra", comma: "Dấu phẩy", semicolon: "Dấu chấm phẩy", tab: "Tab", count: "{rows} hàng × {columns} cột · {cells} ô", empty: "Dán bảng hoặc tải ví dụ để xem kết quả.",
    inputError: "Nhập văn bản bảng.", delimiterError: "Chọn dấu phẩy, dấu chấm phẩy hoặc Tab.", operationError: "Chọn chuyển vị hoặc đổi cột.", csvError: "CSV không hợp lệ: kiểm tra ngoặc kép chưa đóng, ngoặc kép trong ô không trích dẫn hoặc văn bản sau ngoặc kép đóng.", raggedError: "Mọi hàng phải có cùng số ô. Sửa trường thiếu hoặc thừa; không trả đầu ra.", selectionError: "Chọn hai vị trí cột có sẵn bằng số nguyên bắt đầu từ 1.", limitError: "Vượt giới hạn kích thước hoặc số hàng cột đã nêu. Thu nhỏ bảng; không trả đầu ra một phần.",
  },
};

export function csvTableLimitsText(locale: Locale): string {
  return fill(CSV_TABLE_MESSAGES[locale].limits, {
    input: CSV_TABLE_LIMITS.inputCharacters, output: CSV_TABLE_LIMITS.outputCharacters,
    rows: CSV_TABLE_LIMITS.maxRows, columns: CSV_TABLE_LIMITS.maxColumns, cells: CSV_TABLE_LIMITS.maxCells,
  });
}

export function csvTableErrorText(locale: Locale, error: CsvTableError): string {
  const l = CSV_TABLE_MESSAGES[locale];
  const messages: Record<CsvTableError, string> = {
    input: l.inputError, delimiter: l.delimiterError, operation: l.operationError, csv: l.csvError,
    ragged: l.raggedError, selection: l.selectionError, limit: l.limitError,
  };
  return messages[error];
}

export function csvTableCopy(locale: Locale): ToolCopy {
  const l = CSV_TABLE_MESSAGES[locale];
  return {
    name: l.name, tagline: l.tagline, intro: [l.intro, l.rules, csvTableLimitsText(locale)], steps: l.steps,
    faqs: [{ q: l.rulesQuestion, a: l.rules }, { q: l.limitsQuestion, a: csvTableLimitsText(locale) }],
    deepDive: csvTableDeepDive(locale),
  };
}
