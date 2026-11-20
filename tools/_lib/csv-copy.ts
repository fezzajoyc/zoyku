import type { Locale } from "@/lib/site";
import { CSV_LIMITS, type CsvError } from "./csv";
import { fill, type ToolCopy } from "./types";

type Messages = {
  delimiter: string; comma: string; semicolon: string; tab: string;
  json: string; inference: string; shape: string; limits: string; choose: string;
  rulesQuestion: string; limitsQuestion: string;
  jsonError: string; duplicateError: string; csvError: string; emptyError: string; limitError: string;
};

/** All supported locales are authored; data-loss rules never use a fallback. */
export const CSV_MESSAGES: Record<Locale, Messages> = {
  en: {
    delimiter: "Delimiter", comma: "Comma", semicolon: "Semicolon", tab: "Tab",
    json: "JSON object arrays: columns follow first-seen keys; missing values and null become empty cells. Number literals are preserved without Number conversion. Nested objects/arrays become compact JSON text. Duplicate decoded keys at any depth are rejected.",
    inference: "CSV: exact true/false/null get their JSON types. Only finite numbers whose decimal value survives JSON serialization are inferred; integers must be within ±9007199254740991. Unsafe integers, overflow, underflow, precision loss and -0 stay text. Leading-zero IDs and surrounding spaces stay text too.",
    shape: "Headers are trimmed; empty names become column1, column2, etc. Duplicate resulting names, unequal field counts and malformed quotes are rejected. Blank physical lines are ignored; quoted empty or whitespace-only records are kept. The selected delimiter is escaped in headers and cells.",
    limits: "Limits: {input} input and {output} output UTF-16 code units; JSON depth {depth}, {values} values including containers, excluding keys. Excess is rejected without truncation. CSV has no types; spreadsheet importers may reinterpret values. JSON/CSV round trips do not preserve every type.",
    choose: "Choose comma, semicolon or Tab to match the data.", rulesQuestion: "How are values and columns handled?", limitsQuestion: "What limits and import caveats apply?",
    jsonError: "Enter valid JSON containing an array of objects.", duplicateError: "Duplicate decoded JSON keys or CSV header names would lose data. Rename or remove the duplicate.", csvError: "Invalid CSV: check quote boundaries and ensure every row has the header's field count.", emptyError: "Provide a table with at least one column.", limitError: "A displayed resource limit was exceeded. Reduce the input; no partial result was returned.",
  },
  zh: {
    delimiter: "分隔符", comma: "逗号", semicolon: "分号", tab: "制表符 Tab",
    json: "JSON 对象数组：列按键首次出现的顺序排列，缺失值和 null 变为空单元格。数字字面量按原文保留，不先转成 Number；嵌套对象与数组转成紧凑 JSON 文本。任意深度解码后同名的键均拒绝处理。",
    inference: "CSV 中精确的 true/false/null 转成对应 JSON 类型。仅推断有限数，整数须在 ±9007199254740991 内，且经 JSON 序列化后十进制值不变。超安全范围整数、溢出、下溢、精度损失和 -0 保持文本；前导零编号及首尾空白也保持文本。",
    shape: "表头移除首尾空白，空名称生成 column1、column2 等。最终表头重名、字段数不一致或引号不完整时明确拒绝。忽略空物理行，但保留带引号的空记录和纯空白记录；表头及单元格均按所选分隔符转义。",
    limits: "资源限额：输入 {input}、输出 {output} 个 UTF-16 代码单元；JSON 深度 {depth}、值数量 {values}（含容器，不含键）。超限拒绝处理，不截断。CSV 不携带类型，电子表格导入器仍可能重新解释值，不能保证 JSON/CSV 往返保留全部类型。",
    choose: "按数据选择逗号、分号或 Tab。", rulesQuestion: "数值和列如何处理？", limitsQuestion: "资源限额与导入注意事项是什么？",
    jsonError: "请输入合法 JSON 对象数组。", duplicateError: "JSON 解码后同名键或 CSV 重名表头会丢失数据；请先重命名或移除重复项。", csvError: "CSV 格式不正确：请检查引号边界，并确保各行字段数与表头一致。", emptyError: "请提供至少含一列的数据表。", limitError: "超出显示的资源限额，请减少输入；没有返回部分结果。",
  },
  ja: {
    delimiter: "区切り文字", comma: "カンマ", semicolon: "セミコロン", tab: "タブ",
    json: "JSON オブジェクト配列では列はキーの初出順で、欠損値と null は空セルになります。数値リテラルは Number に変換せず保持し、入れ子はコンパクトな JSON にします。各階層の復号後の重複キーは拒否します。",
    inference: "CSV の true/false/null は対応する型にします。有限で JSON 化後も十進値が同じ数値だけ推論し、整数は ±9007199254740991 以内に限ります。範囲外整数、桁あふれ・桁落ち、精度損失、-0 は文字列のままです。先頭ゼロの ID と前後空白も保持します。",
    shape: "見出しをトリムし、空名は column1、column2 などにします。結果の重複名、列数不一致、不正な引用符は拒否します。空の物理行は無視し、引用された空・空白レコードは残します。見出しと値は選択した区切りでエスケープします。",
    limits: "上限：入力 {input}、出力 {output} UTF-16 コード単位。JSON は深さ {depth}、キーを除き容器を含む値 {values} 個。超過時は切り詰めず拒否します。CSV に型はなく、表計算ソフトが再解釈するため全型の往復保持は保証しません。",
    choose: "データに合うカンマ・セミコロン・タブを選びます。", rulesQuestion: "値と列はどう扱われますか？", limitsQuestion: "上限とインポート時の注意点は？",
    jsonError: "有効な JSON オブジェクト配列を入力してください。", duplicateError: "復号後の JSON キーまたは CSV 見出しが重複しています。名前を修正してください。", csvError: "CSV の引用符の境界と、各行が見出しと同じ列数かを確認してください。", emptyError: "少なくとも 1 列ある表を入力してください。", limitError: "表示された上限を超えました。入力を減らしてください。部分結果は返しません。",
  },
  es: {
    delimiter: "Delimitador", comma: "Coma", semicolon: "Punto y coma", tab: "Tabulador",
    json: "Arrays JSON de objetos: columnas por primera aparición de claves; faltantes y null producen celdas vacías. Se conservan literales numéricos sin Number; los anidados pasan a JSON compacto. Se rechazan claves decodificadas duplicadas a cualquier profundidad.",
    inference: "true/false/null exactos reciben su tipo JSON. Solo se infieren números finitos cuyo valor decimal sobrevive a la serialización JSON; enteros en ±9007199254740991. Enteros inseguros, desbordamiento, subdesbordamiento, pérdida de precisión y -0 quedan como texto, igual que ceros iniciales y espacios exteriores.",
    shape: "Se recortan encabezados; los vacíos reciben column1, column2… Se rechazan nombres resultantes duplicados, filas desiguales y comillas incorrectas. Se ignoran líneas físicas vacías y se conservan registros citados vacíos o de espacios. Se escapa el delimitador elegido en encabezados y celdas.",
    limits: "Límites: entrada {input}, salida {output} unidades UTF-16; JSON: profundidad {depth}, {values} valores con contenedores, sin claves. Se rechaza el exceso sin truncar. CSV no tiene tipos y las hojas pueden reinterpretar valores; no se conservan todos los tipos en un recorrido JSON/CSV.",
    choose: "Elige coma, punto y coma o tabulador según los datos.", rulesQuestion: "¿Cómo se tratan valores y columnas?", limitsQuestion: "¿Qué límites y precauciones de importación hay?",
    jsonError: "Introduce JSON válido con un array de objetos.", duplicateError: "Hay claves JSON decodificadas o encabezados CSV duplicados. Renómbralos para evitar pérdida de datos.", csvError: "CSV no válido: comprueba comillas y que cada fila tenga los mismos campos que el encabezado.", emptyError: "Introduce una tabla con al menos una columna.", limitError: "Se superó un límite indicado. Reduce la entrada; no se devolvió un resultado parcial.",
  },
  pt: {
    delimiter: "Delimitador", comma: "Vírgula", semicolon: "Ponto e vírgula", tab: "Tabulação",
    json: "Arrays JSON de objetos: colunas pela primeira ocorrência das chaves; ausentes e null viram células vazias. Literais numéricos são mantidos sem Number; aninhados viram JSON compacto. Chaves decodificadas duplicadas são rejeitadas em qualquer nível.",
    inference: "true/false/null exatos recebem tipos JSON. Só se inferem números finitos cujo valor decimal sobrevive à serialização JSON; inteiros em ±9007199254740991. Inteiros inseguros, overflow, underflow, perda de precisão e -0 ficam como texto, assim como zeros iniciais e espaços externos.",
    shape: "Cabeçalhos são aparados; vazios recebem column1, column2… Nomes finais repetidos, larguras diferentes e aspas incorretas são rejeitados. Linhas físicas vazias são ignoradas e registros citados vazios ou de espaços são mantidos. O delimitador escolhido é escapado em cabeçalhos e células.",
    limits: "Limites: entrada {input}, saída {output} unidades UTF-16; JSON: profundidade {depth}, {values} valores com recipientes, sem chaves. O excesso é rejeitado sem truncar. CSV não tem tipos e planilhas podem reinterpretar valores; nem todos os tipos são mantidos na ida e volta JSON/CSV.",
    choose: "Escolha vírgula, ponto e vírgula ou tabulação conforme os dados.", rulesQuestion: "Como valores e colunas são tratados?", limitsQuestion: "Quais os limites e cuidados na importação?",
    jsonError: "Insira JSON válido contendo um array de objetos.", duplicateError: "Há chaves JSON decodificadas ou cabeçalhos CSV duplicados. Renomeie-os para evitar perda de dados.", csvError: "CSV inválido: confira aspas e se cada linha tem tantos campos quanto o cabeçalho.", emptyError: "Forneça uma tabela com pelo menos uma coluna.", limitError: "Um limite indicado foi excedido. Reduza a entrada; nenhum resultado parcial foi retornado.",
  },
  fr: {
    delimiter: "Séparateur", comma: "Virgule", semicolon: "Point-virgule", tab: "Tabulation",
    json: "Tableaux JSON d’objets : colonnes par première apparition des clés ; absents et null donnent des cellules vides. Les nombres littéraux restent sans Number et les données imbriquées deviennent du JSON compact. Les clés décodées en double sont refusées à toute profondeur.",
    inference: "true/false/null exacts prennent leur type JSON. Un nombre doit être fini et conserver sa valeur décimale après JSON ; les entiers restent dans ±9007199254740991. Entiers non sûrs, dépassement, sous-dépassement, perte de précision et -0 restent du texte, comme zéros initiaux et espaces externes.",
    shape: "En-têtes élagués ; les vides deviennent column1, column2… Doublons résultants, largeurs inégales et guillemets incorrects sont refusés. Les lignes physiques vides sont ignorées ; les enregistrements cités vides ou d’espaces sont gardés. Le séparateur choisi est échappé dans titres et cellules.",
    limits: "Limites : entrée {input}, sortie {output} unités UTF-16 ; JSON : profondeur {depth}, {values} valeurs avec conteneurs, sans clés. Dépassement refusé sans troncature. CSV n’a pas de types ; les tableurs peuvent réinterpréter les valeurs et l’aller-retour JSON/CSV ne garde pas tous les types.",
    choose: "Choisissez virgule, point-virgule ou tabulation selon les données.", rulesQuestion: "Comment valeurs et colonnes sont-elles traitées ?", limitsQuestion: "Quelles limites et précautions d’importation ?",
    jsonError: "Entrez un JSON valide contenant un tableau d’objets.", duplicateError: "Clés JSON décodées ou en-têtes CSV en double. Renommez-les pour éviter une perte de données.", csvError: "CSV incorrect : vérifiez les guillemets et le nombre de champs par rapport à l’en-tête.", emptyError: "Fournissez un tableau d’au moins une colonne.", limitError: "Une limite affichée est dépassée. Réduisez l’entrée ; aucun résultat partiel n’est renvoyé.",
  },
  de: {
    delimiter: "Trennzeichen", comma: "Komma", semicolon: "Semikolon", tab: "Tabulator",
    json: "JSON-Objektarrays: Spalten nach erstem Auftreten der Schlüssel; fehlende Werte und null ergeben leere Zellen. Zahlenliterale bleiben ohne Number erhalten, verschachtelte Werte werden kompaktes JSON. Doppelte dekodierte Schlüssel werden auf jeder Ebene abgewiesen.",
    inference: "Exakte true/false/null erhalten JSON-Typen. Zahlen müssen endlich sein und ihren Dezimalwert nach JSON behalten; Ganzzahlen liegen in ±9007199254740991. Unsichere Ganzzahlen, Über-/Unterlauf, Präzisionsverlust und -0 bleiben Text, ebenso führende Nullen und äußere Leerzeichen.",
    shape: "Kopfzellen werden getrimmt; leere heißen column1, column2… Doppelte Ergebnisnamen, ungleiche Feldzahlen und fehlerhafte Anführungszeichen werden abgewiesen. Leere physische Zeilen werden ignoriert, zitierte leere oder Leerzeichen-Datensätze bleiben. Das gewählte Trennzeichen wird überall maskiert.",
    limits: "Grenzen: Eingabe {input}, Ausgabe {output} UTF-16-Einheiten; JSON-Tiefe {depth}, {values} Werte mit Containern, ohne Schlüssel. Überschreitungen werden ohne Abschneiden abgewiesen. CSV hat keine Typen; Tabellenprogramme können Werte neu deuten, ein JSON/CSV-Rundweg erhält nicht alle Typen.",
    choose: "Komma, Semikolon oder Tabulator passend zu den Daten wählen.", rulesQuestion: "Wie werden Werte und Spalten behandelt?", limitsQuestion: "Welche Grenzen und Importhinweise gelten?",
    jsonError: "Gültiges JSON mit einem Array aus Objekten eingeben.", duplicateError: "Doppelte dekodierte JSON-Schlüssel oder CSV-Kopfnamen würden Daten verlieren. Bitte umbenennen.", csvError: "Ungültiges CSV: Anführungszeichen und gleiche Feldzahlen wie in der Kopfzeile prüfen.", emptyError: "Eine Tabelle mit mindestens einer Spalte eingeben.", limitError: "Eine angezeigte Grenze wurde überschritten. Eingabe reduzieren; kein Teilergebnis wurde ausgegeben.",
  },
  ru: {
    delimiter: "Разделитель", comma: "Запятая", semicolon: "Точка с запятой", tab: "Табуляция",
    json: "JSON-массив объектов: столбцы по первому появлению ключей; пропуски и null дают пустые ячейки. Числовые литералы сохраняются без Number, вложенные данные становятся компактным JSON. Повторные декодированные ключи запрещены на любой глубине.",
    inference: "Точные true/false/null получают тип JSON. Число должно быть конечным и сохранять десятичное значение после JSON; целое — входить в ±9007199254740991. Небезопасные целые, переполнение, исчезновение малых чисел, потеря точности и -0 остаются текстом, как начальные нули и внешние пробелы.",
    shape: "Пробелы заголовков удаляются; пустые имена становятся column1, column2… Повторы итоговых имён, разная ширина строк и неверные кавычки отклоняются. Пустые физические строки пропускаются, цитированные пустые и пробельные записи сохраняются. Выбранный разделитель экранируется в заголовках и ячейках.",
    limits: "Пределы: вход {input}, выход {output} единиц UTF-16; JSON: глубина {depth}, {values} значений с контейнерами, без ключей. Превышение отклоняется без обрезки. CSV не содержит типов; таблицы могут переинтерпретировать значения, обмен JSON/CSV не сохраняет все типы.",
    choose: "Выберите запятую, точку с запятой или табуляцию по данным.", rulesQuestion: "Как обрабатываются значения и столбцы?", limitsQuestion: "Какие ограничения и особенности импорта?",
    jsonError: "Введите корректный JSON с массивом объектов.", duplicateError: "Повторяются декодированные JSON-ключи или CSV-заголовки. Переименуйте их, чтобы избежать потери данных.", csvError: "Некорректный CSV: проверьте кавычки и число полей относительно заголовка.", emptyError: "Введите таблицу хотя бы с одним столбцом.", limitError: "Превышен указанный предел. Уменьшите вход; частичный результат не выдан.",
  },
  it: {
    delimiter: "Delimitatore", comma: "Virgola", semicolon: "Punto e virgola", tab: "Tabulazione",
    json: "Array JSON di oggetti: colonne dalla prima comparsa delle chiavi; assenti e null danno celle vuote. I numeri letterali restano senza Number, i valori annidati diventano JSON compatto. Chiavi decodificate duplicate rifiutate a ogni livello.",
    inference: "true/false/null esatti ricevono il tipo JSON. I numeri devono essere finiti e conservare il valore decimale dopo JSON; interi entro ±9007199254740991. Interi non sicuri, overflow, underflow, perdita di precisione e -0 restano testo, come zeri iniziali e spazi esterni.",
    shape: "Intestazioni senza spazi esterni; quelle vuote diventano column1, column2… Nomi finali duplicati, righe di larghezza diversa e virgolette errate sono rifiutati. Le righe fisiche vuote sono ignorate, i record citati vuoti o di spazi restano. Il delimitatore scelto viene protetto in intestazioni e celle.",
    limits: "Limiti: ingresso {input}, uscita {output} unità UTF-16; JSON: profondità {depth}, {values} valori con contenitori, senza chiavi. Eccesso rifiutato senza tagli. CSV non ha tipi; i fogli possono reinterpretare i valori e il giro JSON/CSV non mantiene tutti i tipi.",
    choose: "Scegli virgola, punto e virgola o tabulazione secondo i dati.", rulesQuestion: "Come vengono trattati valori e colonne?", limitsQuestion: "Quali limiti e precauzioni per l’importazione?",
    jsonError: "Inserisci JSON valido contenente un array di oggetti.", duplicateError: "Chiavi JSON decodificate o intestazioni CSV duplicate. Rinominale per evitare perdita di dati.", csvError: "CSV non valido: controlla le virgolette e il numero di campi rispetto all’intestazione.", emptyError: "Fornisci una tabella con almeno una colonna.", limitError: "Superato un limite indicato. Riduci l’ingresso; nessun risultato parziale è stato restituito.",
  },
  tr: {
    delimiter: "Ayırıcı", comma: "Virgül", semicolon: "Noktalı virgül", tab: "Sekme",
    json: "JSON nesne dizisi: sütunlar anahtarların ilk görülme sırasındadır; eksikler ve null boş hücre olur. Sayı sabitleri Number olmadan korunur, iç içe veriler kısa JSON olur. Her düzeyde çözümlenmiş yinelenen anahtarlar reddedilir.",
    inference: "Tam true/false/null JSON türüne dönüşür. Yalnızca sonlu ve JSON serileştirmesinde ondalık değeri değişmeyen sayılar çıkarılır; tam sayılar ±9007199254740991 aralığında olmalıdır. Güvensiz tam sayılar, taşma, alt taşma, hassasiyet kaybı ve -0 metin kalır; baştaki sıfırlar ve dış boşluklar korunur.",
    shape: "Başlık dış boşlukları kırpılır; boş adlar column1, column2… olur. Yinelenen sonuç adları, farklı alan sayısı ve bozuk tırnaklar reddedilir. Boş fiziksel satırlar atlanır; tırnaklı boş/boşluk kayıtları kalır. Seçilen ayırıcı başlık ve hücrelerde kaçırılır.",
    limits: "Sınırlar: giriş {input}, çıkış {output} UTF-16 birimi; JSON: derinlik {depth}, kaplar dahil anahtarlar hariç {values} değer. Aşım kesmeden reddedilir. CSV tür taşımaz, tablolar değerleri yeniden yorumlayabilir; JSON/CSV bütün türleri korumaz.",
    choose: "Veriye uygun virgül, noktalı virgül veya sekme seçin.", rulesQuestion: "Değer ve sütunlar nasıl işlenir?", limitsQuestion: "Sınırlar ve sonraki içe aktarma notları nedir?",
    jsonError: "Nesne dizisi içeren geçerli JSON girin.", duplicateError: "Çözümlenmiş JSON anahtarları veya CSV başlıkları yineleniyor. Veri kaybını önlemek için yeniden adlandırın.", csvError: "Geçersiz CSV: tırnakları ve alan sayısının başlıkla eşleşmesini kontrol edin.", emptyError: "En az bir sütunu olan tablo girin.", limitError: "Gösterilen bir sınır aşıldı. Girişi azaltın; kısmi sonuç döndürülmedi.",
  },
  ko: {
    delimiter: "구분자", comma: "쉼표", semicolon: "세미콜론", tab: "탭",
    json: "JSON 객체 배열의 열은 키의 첫 등장 순서이며 누락 값과 null은 빈 셀이 됩니다. 숫자 리터럴은 Number 변환 없이 보존하고 중첩 값은 압축 JSON으로 넣습니다. 모든 깊이에서 디코딩 후 중복 키는 거부합니다.",
    inference: "정확한 true/false/null은 JSON 유형으로 바뀝니다. 유한하고 JSON 직렬화 후 십진 값이 같을 때만 숫자로 추론하며 정수는 ±9007199254740991 이내여야 합니다. 안전하지 않은 정수, 오버플로, 언더플로, 정밀도 손실, -0은 텍스트로 둡니다. 앞자리 0과 바깥 공백도 보존합니다.",
    shape: "헤더를 트림하고 빈 이름에 column1, column2 등을 씁니다. 결과 이름 중복, 열 수 불일치, 잘못된 따옴표는 거부합니다. 빈 물리적 줄은 무시하지만 따옴표로 감싼 빈 값과 공백 레코드는 보존합니다. 선택한 구분자는 헤더와 셀 모두에서 이스케이프합니다.",
    limits: "한도: 입력 {input}, 출력 {output} UTF-16 코드 단위. JSON 깊이 {depth}, 키 제외 컨테이너 포함 값 {values}개. 초과 시 자르지 않고 거부합니다. CSV에는 유형이 없고 스프레드시트가 값을 재해석할 수 있어 JSON/CSV 왕복의 모든 유형 보존은 보장하지 않습니다.",
    choose: "데이터에 맞는 쉼표, 세미콜론 또는 탭을 고르세요.", rulesQuestion: "값과 열은 어떻게 처리하나요?", limitsQuestion: "한도와 가져오기 주의점은 무엇인가요?",
    jsonError: "객체 배열을 포함한 유효한 JSON을 입력하세요.", duplicateError: "디코딩된 JSON 키 또는 CSV 헤더가 중복됩니다. 데이터 손실을 막으려면 이름을 바꾸세요.", csvError: "잘못된 CSV입니다. 따옴표 경계와 필드 수가 헤더와 같은지 확인하세요.", emptyError: "열이 하나 이상 있는 표를 입력하세요.", limitError: "표시된 한도를 넘었습니다. 입력을 줄이세요. 부분 결과는 반환하지 않습니다.",
  },
  ar: {
    delimiter: "الفاصل", comma: "فاصلة", semicolon: "فاصلة منقوطة", tab: "جدولة",
    json: "مصفوفات JSON من كائنات: الأعمدة بأول ظهور للمفاتيح؛ المفقود وnull خلايا فارغة. تحفظ الأعداد الحرفية دون Number، والمتداخل يصبح JSON مضغوطاً. ترفض المفاتيح المكررة بعد فكها في كل عمق.",
    inference: "تأخذ true/false/null المطابقة أنواع JSON. يستنتج العدد المحدود فقط إن حفظ قيمته العشرية بعد تسلسل JSON؛ والصحيح ضمن ±9007199254740991. تبقى الأعداد الصحيحة غير الآمنة والفيض والنقص وفقد الدقة و-0 نصاً، وكذلك الأصفار الأولى والمسافات الخارجية.",
    shape: "تحذف المسافات الخارجية للعناوين وتسمى الفارغة column1 وcolumn2… ترفض الأسماء النهائية المكررة وعدد الحقول غير المتساوي والاقتباسات المشوهة. تهمل السطور الفعلية الفارغة وتحفظ السجلات المقتبسة الفارغة أو ذات المسافات. يهرب الفاصل المختار في العناوين والخلايا.",
    limits: "الحدود: إدخال {input} وإخراج {output} وحدة UTF-16؛ عمق JSON {depth} وعدد القيم {values} مع الحاويات دون المفاتيح. ترفض الزيادة دون اقتطاع. CSV لا يحمل أنواعاً وقد تعيد الجداول تفسير القيم؛ لا تضمن جميع الأنواع في دورة JSON/CSV.",
    choose: "اختر الفاصلة أو الفاصلة المنقوطة أو الجدولة حسب البيانات.", rulesQuestion: "كيف تعالج القيم والأعمدة؟", limitsQuestion: "ما الحدود والتنبيهات عند الاستيراد؟",
    jsonError: "أدخل JSON صحيحاً يحتوي مصفوفة من كائنات.", duplicateError: "مفاتيح JSON بعد فكها أو عناوين CSV مكررة. أعد تسميتها لتجنب فقد البيانات.", csvError: "CSV غير صحيح: راجع حدود الاقتباس وتساوي الحقول مع العناوين.", emptyError: "أدخل جدولاً بعمود واحد على الأقل.", limitError: "تم تجاوز حد معروض. قلل الإدخال؛ لم ترجع نتيجة جزئية.",
  },
  hi: {
    delimiter: "विभाजक", comma: "अल्पविराम", semicolon: "अर्धविराम", tab: "टैब",
    json: "JSON ऑब्जेक्ट ऐरे: कॉलम कुंजी के पहले दिखने के क्रम में; अनुपस्थित मान और null खाली सेल बनते हैं। संख्या लिटरल Number बदले बिना बचते हैं, नेस्टेड मान संक्षिप्त JSON बनते हैं। हर गहराई पर डिकोड की गई दोहराई कुंजियाँ अस्वीकार होती हैं।",
    inference: "सटीक true/false/null को JSON प्रकार मिलता है। केवल परिमित संख्या जिसका दशमलव मान JSON सीरियलाइज़ेशन के बाद समान रहे, अनुमानित होती है; पूर्णांक ±9007199254740991 के भीतर हों। असुरक्षित पूर्णांक, ओवरफ्लो, अंडरफ्लो, शुद्धता हानि और -0 पाठ रहते हैं; शुरुआती शून्य और बाहरी स्पेस भी बचते हैं।",
    shape: "हेडर ट्रिम होते हैं; खाली नाम column1, column2… बनते हैं। अंतिम दोहराए नाम, असमान फ़ील्ड संख्या और गलत उद्धरण अस्वीकार हैं। खाली भौतिक पंक्तियाँ छूटती हैं, उद्धृत खाली या स्पेस रिकॉर्ड बचते हैं। चुना विभाजक हेडर और सेल में एस्केप होता है।",
    limits: "सीमा: इनपुट {input}, आउटपुट {output} UTF-16 इकाइयाँ; JSON गहराई {depth}, कंटेनर सहित कुंजी छोड़कर {values} मान। अतिरिक्त डेटा बिना काटे अस्वीकार है। CSV में प्रकार नहीं होते, स्प्रेडशीट फिर व्याख्या कर सकती है; JSON/CSV में सभी प्रकार बचने की गारंटी नहीं है।",
    choose: "डेटा अनुसार अल्पविराम, अर्धविराम या टैब चुनें।", rulesQuestion: "मान और कॉलम कैसे सँभलते हैं?", limitsQuestion: "सीमाएँ और आयात की सावधानियाँ क्या हैं?",
    jsonError: "ऑब्जेक्ट ऐरे वाला वैध JSON दें।", duplicateError: "डिकोड JSON कुंजियाँ या CSV हेडर दोहराए हैं। डेटा बचाने के लिए नाम बदलें।", csvError: "अमान्य CSV: उद्धरण सीमा और फ़ील्ड संख्या हेडर से मिलाएँ।", emptyError: "कम से कम एक कॉलम वाली तालिका दें।", limitError: "दिखाई सीमा पार हुई। इनपुट घटाएँ; आंशिक परिणाम नहीं दिया गया।",
  },
  id: {
    delimiter: "Pemisah", comma: "Koma", semicolon: "Titik koma", tab: "Tab",
    json: "Larik JSON objek: kolom mengikuti kemunculan pertama kunci; nilai hilang dan null menjadi sel kosong. Literal angka dipertahankan tanpa Number, nilai bersarang menjadi JSON ringkas. Kunci terdekode duplikat ditolak di semua kedalaman.",
    inference: "true/false/null persis menjadi tipe JSON. Angka harus berhingga dan nilai desimalnya tetap setelah serialisasi JSON; bilangan bulat dalam ±9007199254740991. Bilangan bulat tidak aman, overflow, underflow, hilangnya presisi dan -0 tetap teks, juga nol awal dan spasi luar.",
    shape: "Tajuk dipangkas; nama kosong menjadi column1, column2… Nama akhir duplikat, jumlah bidang berbeda dan kutip rusak ditolak. Baris fisik kosong diabaikan, rekaman kosong atau spasi yang dikutip tetap ada. Pemisah terpilih di-escape pada tajuk dan sel.",
    limits: "Batas: masukan {input}, keluaran {output} unit UTF-16; JSON kedalaman {depth}, {values} nilai termasuk wadah tanpa kunci. Kelebihan ditolak tanpa pemotongan. CSV tidak memiliki tipe; spreadsheet dapat menafsirkan ulang nilai, sehingga perjalanan JSON/CSV tidak menjamin semua tipe.",
    choose: "Pilih koma, titik koma atau Tab sesuai data.", rulesQuestion: "Bagaimana nilai dan kolom ditangani?", limitsQuestion: "Apa batas dan catatan saat impor?",
    jsonError: "Masukkan JSON valid berupa larik objek.", duplicateError: "Kunci JSON terdekode atau tajuk CSV duplikat. Ubah nama agar data tidak hilang.", csvError: "CSV tidak valid: periksa kutip dan jumlah bidang terhadap tajuk.", emptyError: "Berikan tabel dengan setidaknya satu kolom.", limitError: "Batas yang ditampilkan terlampaui. Kurangi masukan; tidak ada hasil sebagian.",
  },
  vi: {
    delimiter: "Dấu phân cách", comma: "Dấu phẩy", semicolon: "Dấu chấm phẩy", tab: "Tab",
    json: "Mảng JSON đối tượng: cột theo lần đầu xuất hiện khóa; giá trị thiếu và null thành ô trống. Giữ nguyên số literal không qua Number; dữ liệu lồng thành JSON gọn. Từ chối khóa trùng sau giải mã ở mọi độ sâu.",
    inference: "true/false/null chính xác nhận kiểu JSON. Chỉ suy luận số hữu hạn giữ nguyên giá trị thập phân sau tuần tự hóa JSON; số nguyên trong ±9007199254740991. Số nguyên không an toàn, tràn, hụt, mất độ chính xác và -0 giữ dạng văn bản, cũng như số 0 đầu và khoảng trắng ngoài.",
    shape: "Cắt khoảng trắng ngoài tiêu đề; tên trống thành column1, column2… Từ chối tên cuối trùng, số trường không đều và ngoặc kép sai. Bỏ dòng vật lý trống, giữ bản ghi được trích dẫn rỗng hoặc chỉ có khoảng trắng. Escape dấu phân cách đã chọn trong tiêu đề và ô.",
    limits: "Giới hạn: vào {input}, ra {output} đơn vị UTF-16; JSON sâu {depth}, {values} giá trị gồm vùng chứa không gồm khóa. Vượt giới hạn bị từ chối, không cắt. CSV không mang kiểu; bảng tính có thể diễn giải lại, nên vòng JSON/CSV không bảo đảm mọi kiểu.",
    choose: "Chọn dấu phẩy, chấm phẩy hoặc Tab phù hợp dữ liệu.", rulesQuestion: "Giá trị và cột được xử lý thế nào?", limitsQuestion: "Giới hạn và lưu ý khi nhập là gì?",
    jsonError: "Nhập JSON hợp lệ chứa mảng đối tượng.", duplicateError: "Khóa JSON giải mã hoặc tiêu đề CSV bị trùng. Đổi tên để tránh mất dữ liệu.", csvError: "CSV không hợp lệ: kiểm tra ngoặc kép và số trường so với tiêu đề.", emptyError: "Cung cấp bảng có ít nhất một cột.", limitError: "Vượt giới hạn được hiển thị. Giảm đầu vào; không trả kết quả một phần.",
  },
};

export function csvLimitsText(locale: Locale): string {
  return fill(CSV_MESSAGES[locale].limits, { input: CSV_LIMITS.inputCharacters, output: CSV_LIMITS.outputCharacters, depth: CSV_LIMITS.jsonDepth, values: CSV_LIMITS.jsonValues });
}

export function csvErrorText(locale: Locale, error: CsvError): string {
  const l = CSV_MESSAGES[locale];
  if (error === "json" || error === "array") return l.jsonError;
  if (error === "duplicate" || error === "headers") return l.duplicateError;
  if (error === "csv") return l.csvError;
  if (error === "limit") return l.limitError;
  if (error === "delimiter") return l.choose;
  return l.emptyError;
}

/** Replaces obsolete unlimited-size, duplicate-overwrite and universal-round-trip copy. */
export function csvCapabilityCopy(locale: Locale, base: ToolCopy, direction: "json2csv" | "csv2json"): ToolCopy {
  const l = CSV_MESSAGES[locale];
  const rule = direction === "json2csv" ? l.json : l.inference;
  return { ...base, intro: [rule, l.shape, csvLimitsText(locale)], steps: [base.steps[0], l.choose, base.steps[2]],
    faqs: [{ q: l.rulesQuestion, a: rule + " " + l.shape }, { q: l.limitsQuestion, a: csvLimitsText(locale) }], deepDive: undefined };
}
