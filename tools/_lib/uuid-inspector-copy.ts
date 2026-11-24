import { type Locale } from "@/lib/site";
import type { ToolCopy } from "./types";
import type { UuidVariant } from "./uuid-inspector";
import { uuidDeepDive } from "./deepdive-dev";

type Format = "canonical" | "uppercase" | "raw" | "urn" | "braced" | "binary" | "base64" | "bytes";
type Seed = {
  name: string; tagline: string; local: string; rules: string; semantics: string; limit: string; formatError: string;
  labels: [string, string, string, string, string, string, string, string, string, string, string, string];
  variants: [string, string, string, string]; specials: [string, string]; formats: [string, string, string, string, string, string, string, string];
  steps: [string, string, string]; questions: [string, string];
};
const SEEDS: Record<Locale, Seed> = {
  en: {
    name: "UUID Validator & Converter", tagline: "Inspect UUID version and variant bits, recognize NIL and MAX, and convert text, HEX, 128-bit binary and strict Base64 locally without changing the 16 bytes.",
    local: "All conversion runs in this tab. The UUID is never uploaded or stored by this tool.",
    rules: "Accepts canonical 36-character UUID text, raw 32-digit HEX, exactly 128 binary digits or standard 24-character Base64 ending in ==. A single urn:uuid: prefix or pair of braces may wrap canonical text only. Surrounding whitespace and letter case are normalized; nested wrappers, Base64URL and missing padding are rejected.",
    semantics: "RFC recognition checks the assigned version bits (1–8) and RFC variant, with NIL and MAX as special cases. Legacy variants and unknown versions remain convertible but are not recognized as RFC layouts. This cannot prove the generating algorithm, randomness, uniqueness or security, and does not extract timestamps.",
    limit: "Input limit: 128 UTF-16 code units before trimming. Byte order is network order; Microsoft GUID field-byte swapping is not performed.",
    formatError: "Use one complete supported representation. Check hexadecimal digits, hyphen positions, wrappers, binary length and canonical Base64 padding.",
    labels: ["UUID input", "Use RFC example", "Clear", "Paste one UUID to inspect its bytes, version and variant.", "Copy", "Recognized RFC 9562 layout or special value", "Parsed 128-bit value; RFC layout not recognized", "Interpreted version", "Version bits", "Variant family", "Special value", "Not applicable / unknown"],
    variants: ["NCS legacy (0xxx)", "RFC / IETF (10xx)", "Microsoft legacy (110x)", "Reserved for future use (111x)"], specials: ["NIL · all zero bits", "MAX · all one bits"],
    formats: ["Canonical lowercase", "Canonical uppercase", "HEX · 32 digits", "UUID URN", "Braced text", "Binary · 128 bits", "Standard Base64", "Bytes · decimal, network order"],
    steps: ["Paste a supported UUID representation, or load the RFC example.", "Review the variant, version and RFC layout recognition separately.", "Copy a normalized format or the exact 16-byte array."], questions: ["Which inputs and byte order are supported?", "Does a recognized layout prove a UUID is genuine or unique?"],
  },
  zh: {
    name: "UUID 校验与格式转换", tagline: "在本地检查 UUID 版本位与变体，识别 NIL/MAX 特例，并在标准文本、HEX、128 位二进制和严格 Base64 之间保持 16 字节不变转换。",
    local: "全部转换在当前标签页完成；本工具不会上传或存储 UUID。",
    rules: "接受 36 字符标准 UUID、32 位 HEX、恰好 128 位二进制或以 == 结尾的 24 字符标准 Base64。标准 UUID 可加单层 urn:uuid: 前缀或一对花括号。会规范首尾空白与字母大小写；拒绝嵌套包装、Base64URL 和缺失填充。",
    semantics: "RFC 识别检查已分配版本位 1–8 与 RFC 变体，NIL/MAX 单独按特例处理。旧变体或未知版本仍可转换，但不标为已识别的 RFC 布局。不能据此证明生成算法、随机性、唯一性或安全性；不提取时间戳。",
    limit: "输入上限为去除首尾空白前的 128 个 UTF-16 代码单元。按网络字节序处理，不执行 Microsoft GUID 字段字节交换。",
    formatError: "请输入一份完整支持格式，检查 HEX 字符、连字符位置、包装、二进制长度及标准 Base64 填充位。",
    labels: ["UUID 输入", "使用 RFC 示例", "清空", "粘贴一个 UUID，检查字节、版本与变体。", "复制", "已识别 RFC 9562 布局或特例", "已解析 128 位值；未识别为 RFC 布局", "已解释版本", "版本位", "变体类型", "特殊值", "不适用／未知"],
    variants: ["旧 NCS（0xxx）", "RFC / IETF（10xx）", "旧 Microsoft（110x）", "预留未来使用（111x）"], specials: ["NIL · 全零位", "MAX · 全一位"],
    formats: ["标准小写", "标准大写", "HEX · 32 位", "UUID URN", "花括号文本", "二进制 · 128 位", "标准 Base64", "字节 · 十进制网络序"],
    steps: ["粘贴支持的 UUID 格式，或载入 RFC 示例。", "分别检查变体、版本与 RFC 布局识别结果。", "复制规范格式或精确的 16 字节数组。"], questions: ["支持哪些输入与字节序？", "识别布局能证明 UUID 真实或唯一吗？"],
  },
  ja: {
    name: "UUID 検証・形式変換", tagline: "UUID のバージョンとバリアントを調べ、NIL/MAX を識別。文字列、HEX、128 ビット二進数、厳密な Base64 を同じ 16 バイトのまま端末内で変換します。",
    local: "このタブ内で変換します。UUID はアップロードも保存もしません。",
    rules: "36 文字の標準 UUID、32 桁 HEX、128 桁の二進数、末尾 == の標準 Base64 24 文字に対応。標準 UUID のみ単一の urn:uuid: または波括弧で囲めます。前後空白と大文字小文字を正規化し、入れ子、Base64URL、パディング欠落は拒否します。",
    semantics: "RFC のバリアントと割り当て済みバージョン 1–8 を確認し、NIL/MAX は特例として識別します。旧バリアントや未知バージョンは変換のみ可能です。生成アルゴリズム、乱数性、一意性、安全性は証明せず、時刻も抽出しません。",
    limit: "入力は前後空白除去前で UTF-16 128 コード単位まで。ネットワーク順で処理し、Microsoft GUID のフィールド内バイト反転はしません。",
    formatError: "対応形式を 1 件入力し、HEX、ハイフン、囲み、二進数の長さ、Base64 のパディングを確認してください。",
    labels: ["UUID 入力", "RFC の例を使用", "クリア", "UUID を貼り付けてバイト、バージョン、バリアントを調べます。", "コピー", "RFC 9562 の構造または特例を識別", "128 ビット値を解析・RFC 構造は未識別", "解釈したバージョン", "バージョンビット", "バリアント", "特殊値", "該当なし／不明"],
    variants: ["旧 NCS (0xxx)", "RFC / IETF (10xx)", "旧 Microsoft (110x)", "将来用の予約 (111x)"], specials: ["NIL・全ビット 0", "MAX・全ビット 1"],
    formats: ["標準小文字", "標準大文字", "HEX・32 桁", "UUID URN", "波括弧形式", "二進数・128 ビット", "標準 Base64", "バイト・10 進ネットワーク順"],
    steps: ["対応する UUID を貼り付けるか RFC の例を選びます。", "バリアント、バージョン、RFC 構造を個別に確認します。", "正規化した形式や 16 バイト配列をコピーします。"], questions: ["入力形式とバイト順は？", "構造の識別は UUID の一意性を証明しますか？"],
  },
  es: {
    name: "Validador y conversor UUID", tagline: "Inspecciona versión y variante de UUID, reconoce NIL y MAX y convierte texto, HEX, binario de 128 bits y Base64 estricto localmente, conservando sus 16 bytes.",
    local: "Todo se convierte en esta pestaña. La herramienta no sube ni guarda el UUID.",
    rules: "Admite UUID canónico de 36 caracteres, HEX de 32 dígitos, 128 dígitos binarios o Base64 estándar de 24 caracteres terminado en ==. Solo el texto canónico admite un prefijo urn:uuid: o llaves simples. Normaliza espacios externos y mayúsculas; rechaza envoltorios anidados, Base64URL y relleno ausente.",
    semantics: "Reconoce la variante RFC y versiones asignadas 1–8, con NIL/MAX como excepciones. Otras variantes o versiones se convierten sin reconocerse como estructura RFC. No demuestra algoritmo, aleatoriedad, unicidad ni seguridad; no extrae fechas.",
    limit: "Máximo: 128 unidades UTF-16 antes de recortar espacios. Orden de red; no invierte bytes de campos Microsoft GUID.",
    formatError: "Introduce una representación completa. Revisa HEX, guiones, envoltorios, longitud binaria y relleno canónico Base64.",
    labels: ["Entrada UUID", "Usar ejemplo RFC", "Borrar", "Pega un UUID para ver bytes, versión y variante.", "Copiar", "Estructura RFC 9562 o valor especial reconocido", "Valor de 128 bits leído; estructura RFC no reconocida", "Versión interpretada", "Bits de versión", "Familia de variante", "Valor especial", "No aplicable / desconocido"],
    variants: ["NCS heredado (0xxx)", "RFC / IETF (10xx)", "Microsoft heredado (110x)", "Reservado para uso futuro (111x)"], specials: ["NIL · todos los bits a cero", "MAX · todos los bits a uno"],
    formats: ["Canónico en minúsculas", "Canónico en mayúsculas", "HEX · 32 dígitos", "URN UUID", "Texto entre llaves", "Binario · 128 bits", "Base64 estándar", "Bytes decimales en orden de red"],
    steps: ["Pega una representación admitida o usa el ejemplo RFC.", "Revisa por separado variante, versión y estructura RFC.", "Copia un formato normalizado o la matriz de 16 bytes."], questions: ["¿Qué formatos y orden de bytes admite?", "¿La estructura prueba autenticidad o unicidad?"],
  },
  pt: {
    name: "Validador e conversor UUID", tagline: "Inspecione versão e variante do UUID, reconheça NIL e MAX e converta texto, HEX, binário de 128 bits e Base64 estrito localmente, mantendo os mesmos 16 bytes.",
    local: "A conversão ocorre nesta aba. A ferramenta não envia nem armazena o UUID.",
    rules: "Aceita UUID canônico de 36 caracteres, HEX de 32 dígitos, 128 dígitos binários ou Base64 padrão de 24 caracteres com ==. Apenas o texto canônico admite um prefixo urn:uuid: ou chaves simples. Normaliza espaços externos e letras; rejeita invólucros aninhados, Base64URL e falta de preenchimento.",
    semantics: "Reconhece variante RFC e versões atribuídas 1–8, com NIL/MAX como exceções. Variantes antigas ou versões desconhecidas continuam conversíveis sem reconhecimento RFC. Não comprova algoritmo, aleatoriedade, unicidade ou segurança; não extrai datas.",
    limit: "Limite: 128 unidades UTF-16 antes de aparar espaços. Ordem de rede; não troca bytes de campos Microsoft GUID.",
    formatError: "Informe uma representação completa. Confira HEX, hífens, invólucros, comprimento binário e preenchimento Base64 canônico.",
    labels: ["Entrada UUID", "Usar exemplo RFC", "Limpar", "Cole um UUID para inspecionar bytes, versão e variante.", "Copiar", "Estrutura RFC 9562 ou valor especial reconhecido", "Valor de 128 bits lido; estrutura RFC não reconhecida", "Versão interpretada", "Bits de versão", "Família da variante", "Valor especial", "Não aplicável / desconhecido"],
    variants: ["NCS legado (0xxx)", "RFC / IETF (10xx)", "Microsoft legado (110x)", "Reservado para uso futuro (111x)"], specials: ["NIL · todos os bits zero", "MAX · todos os bits um"],
    formats: ["Canônico em minúsculas", "Canônico em maiúsculas", "HEX · 32 dígitos", "URN UUID", "Texto entre chaves", "Binário · 128 bits", "Base64 padrão", "Bytes decimais em ordem de rede"],
    steps: ["Cole um formato aceito ou use o exemplo RFC.", "Revise variante, versão e estrutura RFC separadamente.", "Copie um formato normalizado ou o vetor de 16 bytes."], questions: ["Quais formatos e ordem de bytes são aceitos?", "A estrutura comprova autenticidade ou unicidade?"],
  },
  fr: {
    name: "Validation et conversion UUID", tagline: "Examinez version et variante UUID, identifiez NIL et MAX et convertissez texte, HEX, binaire sur 128 bits et Base64 strict localement sans modifier les 16 octets.",
    local: "Tout est converti dans cet onglet. L’outil ne transmet ni ne conserve l’UUID.",
    rules: "Accepte UUID canonique de 36 caractères, HEX de 32 chiffres, 128 chiffres binaires ou Base64 standard de 24 caractères terminé par ==. Seul le texte canonique accepte un préfixe urn:uuid: ou des accolades simples. Espaces externes et casse sont normalisés ; imbrications, Base64URL et remplissage absent sont refusés.",
    semantics: "Reconnaît la variante RFC et les versions attribuées 1–8, avec NIL/MAX comme cas particuliers. Les autres variantes ou versions restent convertibles sans reconnaissance RFC. Ne prouve ni algorithme, hasard, unicité ou sécurité ; aucune date n’est extraite.",
    limit: "Limite : 128 unités UTF-16 avant retrait des espaces. Ordre réseau ; aucun échange des octets des champs Microsoft GUID.",
    formatError: "Entrez une représentation complète. Vérifiez HEX, tirets, enveloppes, longueur binaire et remplissage Base64 canonique.",
    labels: ["UUID à examiner", "Utiliser l’exemple RFC", "Effacer", "Collez un UUID pour examiner octets, version et variante.", "Copier", "Structure RFC 9562 ou valeur spéciale reconnue", "Valeur de 128 bits lue ; structure RFC non reconnue", "Version interprétée", "Bits de version", "Famille de variante", "Valeur spéciale", "Sans objet / inconnu"],
    variants: ["Ancien NCS (0xxx)", "RFC / IETF (10xx)", "Ancien Microsoft (110x)", "Réservé à un usage futur (111x)"], specials: ["NIL · tous les bits à zéro", "MAX · tous les bits à un"],
    formats: ["Canonique en minuscules", "Canonique en majuscules", "HEX · 32 chiffres", "URN UUID", "Texte entre accolades", "Binaire · 128 bits", "Base64 standard", "Octets décimaux, ordre réseau"],
    steps: ["Collez un format accepté ou utilisez l’exemple RFC.", "Examinez séparément variante, version et structure RFC.", "Copiez un format normalisé ou le tableau de 16 octets."], questions: ["Quels formats et ordre des octets sont acceptés ?", "La structure prouve-t-elle authenticité ou unicité ?"],
  },
  de: {
    name: "UUID prüfen und umwandeln", tagline: "UUID-Version und Variante prüfen, NIL und MAX erkennen und Text, HEX, 128-Bit-Binärdaten sowie striktes Base64 lokal umwandeln, ohne die 16 Bytes zu verändern.",
    local: "Die Umwandlung läuft in diesem Tab. Das Werkzeug lädt die UUID weder hoch noch speichert es sie.",
    rules: "Akzeptiert kanonische UUID mit 36 Zeichen, 32 HEX-Ziffern, genau 128 Binärziffern oder Standard-Base64 mit 24 Zeichen und ==. Nur kanonischer Text darf ein einzelnes urn:uuid: oder geschweifte Klammern tragen. Äußere Leerzeichen und Großschreibung werden normalisiert; verschachtelte Hüllen, Base64URL und fehlendes Padding werden abgelehnt.",
    semantics: "Erkennt RFC-Variante und zugewiesene Versionen 1–8 sowie NIL/MAX als Sonderfälle. Andere Varianten und Versionen bleiben umwandelbar, gelten aber nicht als erkanntes RFC-Layout. Beweist weder Algorithmus, Zufälligkeit, Eindeutigkeit noch Sicherheit; keine Zeitstempelanalyse.",
    limit: "Grenze: 128 UTF-16-Codeeinheiten vor dem Trimmen. Netzwerk-Bytefolge; keine Bytevertauschung der Microsoft-GUID-Felder.",
    formatError: "Eine vollständige Darstellung eingeben. HEX, Bindestriche, Hüllen, Binärlänge und kanonisches Base64-Padding prüfen.",
    labels: ["UUID-Eingabe", "RFC-Beispiel verwenden", "Leeren", "Eine UUID einfügen, um Bytes, Version und Variante zu prüfen.", "Kopieren", "RFC-9562-Layout oder Sonderwert erkannt", "128-Bit-Wert gelesen; RFC-Layout nicht erkannt", "Interpretierte Version", "Versionsbits", "Variantenfamilie", "Sonderwert", "Nicht anwendbar / unbekannt"],
    variants: ["Altes NCS (0xxx)", "RFC / IETF (10xx)", "Altes Microsoft (110x)", "Für künftige Nutzung reserviert (111x)"], specials: ["NIL · alle Bits null", "MAX · alle Bits eins"],
    formats: ["Kanonisch, Kleinbuchstaben", "Kanonisch, Großbuchstaben", "HEX · 32 Ziffern", "UUID-URN", "Text in geschweiften Klammern", "Binär · 128 Bit", "Standard-Base64", "Dezimale Bytes in Netzwerkfolge"],
    steps: ["Unterstützte Darstellung einfügen oder RFC-Beispiel laden.", "Variante, Version und RFC-Layout getrennt prüfen.", "Normalisierte Darstellung oder 16-Byte-Array kopieren."], questions: ["Welche Formate und Bytefolge werden unterstützt?", "Beweist ein erkanntes Layout Echtheit oder Eindeutigkeit?"],
  },
  ru: {
    name: "Проверка и конвертация UUID", tagline: "Проверьте версию и вариант UUID, распознайте NIL и MAX и преобразуйте текст, HEX, 128-битную запись и строгий Base64 локально, сохраняя исходные 16 байтов.",
    local: "Преобразование выполняется в этой вкладке. UUID не загружается и не сохраняется инструментом.",
    rules: "Принимаются UUID из 36 символов, HEX из 32 цифр, ровно 128 двоичных цифр или стандартный Base64 из 24 символов с ==. Только канонический текст допускает один префикс urn:uuid: или фигурные скобки. Внешние пробелы и регистр нормализуются; вложенные оболочки, Base64URL и неполное дополнение отклоняются.",
    semantics: "Распознаются вариант RFC и назначенные версии 1–8, а NIL/MAX — отдельно. Другие варианты и версии можно преобразовать, но они не считаются распознанной структурой RFC. Это не доказывает алгоритм, случайность, уникальность или безопасность; время не извлекается.",
    limit: "До 128 единиц UTF-16 до обрезки пробелов. Сетевой порядок байтов; перестановка байтов полей Microsoft GUID не выполняется.",
    formatError: "Введите одно полное представление. Проверьте HEX, дефисы, оболочки, длину двоичной записи и дополнение Base64.",
    labels: ["Ввод UUID", "Пример из RFC", "Очистить", "Вставьте UUID для проверки байтов, версии и варианта.", "Копировать", "Распознана структура RFC 9562 или особое значение", "128-битное значение прочитано; структура RFC не распознана", "Распознанная версия", "Биты версии", "Семейство варианта", "Особое значение", "Не применимо / неизвестно"],
    variants: ["Старый NCS (0xxx)", "RFC / IETF (10xx)", "Старый Microsoft (110x)", "Для будущего использования (111x)"], specials: ["NIL · все биты нулевые", "MAX · все биты единичные"],
    formats: ["Каноническая, нижний регистр", "Каноническая, верхний регистр", "HEX · 32 цифры", "UUID URN", "В фигурных скобках", "Двоичная · 128 бит", "Стандартный Base64", "Байты десятичные, сетевой порядок"],
    steps: ["Вставьте поддерживаемую запись или загрузите пример RFC.", "Проверьте вариант, версию и структуру RFC отдельно.", "Скопируйте нормализованную запись или массив 16 байтов."], questions: ["Какие форматы и порядок байтов поддерживаются?", "Доказывает ли структура подлинность или уникальность?"],
  },
  it: {
    name: "Verifica e conversione UUID", tagline: "Esamina versione e variante UUID, riconosci NIL e MAX e converti testo, HEX, binario a 128 bit e Base64 rigoroso localmente, mantenendo invariati i 16 byte.",
    local: "La conversione avviene in questa scheda. Lo strumento non carica né salva l’UUID.",
    rules: "Accetta UUID canonico di 36 caratteri, HEX di 32 cifre, 128 cifre binarie o Base64 standard di 24 caratteri con ==. Solo il testo canonico ammette un prefisso urn:uuid: o parentesi graffe singole. Normalizza spazi esterni e maiuscole; rifiuta involucri annidati, Base64URL e riempimento mancante.",
    semantics: "Riconosce variante RFC e versioni assegnate 1–8, con NIL/MAX come casi speciali. Altre varianti o versioni restano convertibili senza essere riconosciute come struttura RFC. Non prova algoritmo, casualità, unicità o sicurezza; non estrae date.",
    limit: "Limite: 128 unità UTF-16 prima di rimuovere gli spazi. Ordine di rete; nessuno scambio dei byte nei campi Microsoft GUID.",
    formatError: "Inserisci una rappresentazione completa. Verifica HEX, trattini, involucri, lunghezza binaria e riempimento Base64 canonico.",
    labels: ["UUID in ingresso", "Usa esempio RFC", "Cancella", "Incolla un UUID per esaminare byte, versione e variante.", "Copia", "Struttura RFC 9562 o valore speciale riconosciuto", "Valore a 128 bit letto; struttura RFC non riconosciuta", "Versione interpretata", "Bit di versione", "Famiglia della variante", "Valore speciale", "Non applicabile / sconosciuto"],
    variants: ["NCS precedente (0xxx)", "RFC / IETF (10xx)", "Microsoft precedente (110x)", "Riservato per il futuro (111x)"], specials: ["NIL · tutti i bit zero", "MAX · tutti i bit uno"],
    formats: ["Canonico minuscolo", "Canonico maiuscolo", "HEX · 32 cifre", "URN UUID", "Testo tra parentesi graffe", "Binario · 128 bit", "Base64 standard", "Byte decimali, ordine di rete"],
    steps: ["Incolla un formato accettato o usa l’esempio RFC.", "Controlla variante, versione e struttura RFC separatamente.", "Copia un formato normalizzato o l’array di 16 byte."], questions: ["Quali formati e ordine dei byte sono supportati?", "La struttura prova autenticità o unicità?"],
  },
  tr: {
    name: "UUID doğrulama ve dönüştürme", tagline: "UUID sürüm ve varyant bitlerini inceleyin, NIL ve MAX değerlerini tanıyın; metin, HEX, 128 bit ikili ve sıkı Base64 arasında aynı 16 baytı yerel olarak dönüştürün.",
    local: "Dönüşüm bu sekmede yapılır. Araç UUID’yi yüklemez veya saklamaz.",
    rules: "36 karakterli standart UUID, 32 haneli HEX, tam 128 ikili rakam veya == ile biten 24 karakterli standart Base64 kabul edilir. Yalnızca standart metin tek urn:uuid: öneki veya süslü parantez alabilir. Dış boşluk ve harf boyutu düzeltilir; iç içe sarmalayıcılar, Base64URL ve eksik dolgu reddedilir.",
    semantics: "RFC varyantı ve atanmış 1–8 sürümleri tanınır; NIL/MAX özel durumdur. Eski varyantlar veya bilinmeyen sürümler dönüştürülebilir ama RFC yapısı olarak tanınmaz. Algoritma, rastgelelik, benzersizlik veya güvenlik kanıtlanmaz; zaman damgası çıkarılmaz.",
    limit: "Kırpmadan önce 128 UTF-16 birimi sınırı vardır. Ağ bayt sırası kullanılır; Microsoft GUID alan baytları çevrilmez.",
    formatError: "Tek bir tam gösterim girin. HEX, tireler, sarmalayıcılar, ikili uzunluğu ve standart Base64 dolgusunu denetleyin.",
    labels: ["UUID girdisi", "RFC örneğini kullan", "Temizle", "Bayt, sürüm ve varyantı incelemek için UUID yapıştırın.", "Kopyala", "RFC 9562 yapısı veya özel değer tanındı", "128 bit değer okundu; RFC yapısı tanınmadı", "Yorumlanan sürüm", "Sürüm bitleri", "Varyant ailesi", "Özel değer", "Uygulanamaz / bilinmiyor"],
    variants: ["Eski NCS (0xxx)", "RFC / IETF (10xx)", "Eski Microsoft (110x)", "Geleceğe ayrılmış (111x)"], specials: ["NIL · tüm bitler sıfır", "MAX · tüm bitler bir"],
    formats: ["Standart küçük harf", "Standart büyük harf", "HEX · 32 hane", "UUID URN", "Süslü parantezli metin", "İkili · 128 bit", "Standart Base64", "Ondalık baytlar, ağ sırası"],
    steps: ["Desteklenen bir gösterimi yapıştırın veya RFC örneğini açın.", "Varyant, sürüm ve RFC yapısını ayrı ayrı inceleyin.", "Standart biçimi veya 16 bayt dizisini kopyalayın."], questions: ["Hangi biçimler ve bayt sırası desteklenir?", "Yapı özgünlük veya benzersizliği kanıtlar mı?"],
  },
  ko: {
    name: "UUID 검증 및 형식 변환", tagline: "UUID 버전과 변형 비트를 확인하고 NIL/MAX를 구분합니다. 텍스트, HEX, 128비트 이진수와 엄격한 Base64를 동일한 16바이트로 로컬에서 변환하세요.",
    local: "변환은 이 탭에서 처리됩니다. 이 도구는 UUID를 업로드하거나 저장하지 않습니다.",
    rules: "표준 36자 UUID, 32자리 HEX, 정확히 128자리 이진수 또는 ==로 끝나는 24자 표준 Base64를 받습니다. 표준 UUID에만 urn:uuid: 하나나 중괄호 한 쌍을 붙일 수 있습니다. 양끝 공백과 대소문자는 정규화하고 중첩 포장, Base64URL, 누락된 패딩은 거부합니다.",
    semantics: "RFC 변형과 할당된 버전 1–8을 확인하며 NIL/MAX는 예외로 구분합니다. 이전 변형이나 알 수 없는 버전도 변환되지만 RFC 구조로 인정하지 않습니다. 생성 알고리즘, 무작위성, 고유성이나 안전성을 증명하지 않으며 시각을 추출하지 않습니다.",
    limit: "공백 제거 전 UTF-16 코드 단위 128개까지 받습니다. 네트워크 바이트 순서를 사용하며 Microsoft GUID 필드의 바이트를 뒤집지 않습니다.",
    formatError: "지원되는 완전한 형식 하나를 입력하세요. HEX, 하이픈, 포장, 이진수 길이와 Base64 패딩을 확인하세요.",
    labels: ["UUID 입력", "RFC 예시 사용", "지우기", "UUID를 붙여 넣어 바이트, 버전과 변형을 확인하세요.", "복사", "RFC 9562 구조 또는 특수 값 확인", "128비트 값 해석됨 · RFC 구조는 미확인", "해석된 버전", "버전 비트", "변형 종류", "특수 값", "해당 없음 / 알 수 없음"],
    variants: ["이전 NCS (0xxx)", "RFC / IETF (10xx)", "이전 Microsoft (110x)", "미래 사용 예약 (111x)"], specials: ["NIL · 모든 비트 0", "MAX · 모든 비트 1"],
    formats: ["표준 소문자", "표준 대문자", "HEX · 32자리", "UUID URN", "중괄호 텍스트", "이진수 · 128비트", "표준 Base64", "십진 바이트 · 네트워크 순서"],
    steps: ["지원 형식 UUID를 붙여 넣거나 RFC 예시를 사용하세요.", "변형, 버전과 RFC 구조를 각각 확인하세요.", "정규화한 형식 또는 16바이트 배열을 복사하세요."], questions: ["어떤 형식과 바이트 순서를 지원하나요?", "구조 확인으로 진위나 고유성을 증명하나요?"],
  },
  ar: {
    name: "فحص UUID وتحويل صيغته", tagline: "افحص بتات إصدار UUID ونوعه، وتعرّف على NIL وMAX، وحوّل النص وHEX والثنائي 128 بت وBase64 القياسي محلياً مع الحفاظ على البايتات الستة عشر كما هي.",
    local: "يجري التحويل داخل هذا التبويب. لا ترفع الأداة UUID ولا تحفظه.",
    rules: "تقبل UUID القياسي من 36 محرفاً أو HEX من 32 خانة أو 128 رقماً ثنائياً بالضبط أو Base64 القياسي من 24 محرفاً ينتهي بـ ==. النص القياسي فقط يقبل بادئة urn:uuid: واحدة أو زوج أقواس معقوفة. تُطبّع المسافات الطرفية وحالة الأحرف؛ تُرفض الأغلفة المتداخلة وBase64URL والحشو الناقص.",
    semantics: "يتحقق التعرف من نوع RFC والإصدارات المخصصة 1–8، ويعالج NIL/MAX كحالات خاصة. تبقى الأنواع القديمة والإصدارات المجهولة قابلة للتحويل دون اعتبارها بنية RFC معروفة. لا يثبت ذلك الخوارزمية أو العشوائية أو التفرد أو الأمان، ولا يستخرج الوقت.",
    limit: "الحد 128 وحدة UTF-16 قبل حذف المسافات الطرفية. ترتيب البايتات شبكي؛ لا تُعكس بايتات حقول Microsoft GUID.",
    formatError: "أدخل تمثيلاً واحداً كاملاً. تحقق من HEX والشرطات والأغلفة وطول الثنائي وحشو Base64 القياسي.",
    labels: ["إدخال UUID", "استخدام مثال RFC", "مسح", "الصق UUID لفحص البايتات والإصدار والنوع.", "نسخ", "بنية RFC 9562 أو قيمة خاصة معروفة", "قُرئت قيمة 128 بت؛ بنية RFC غير معروفة", "الإصدار المفسر", "بتات الإصدار", "عائلة النوع", "القيمة الخاصة", "غير منطبق / مجهول"],
    variants: ["NCS قديم (0xxx)", "RFC / IETF (10xx)", "Microsoft قديم (110x)", "محجوز للمستقبل (111x)"], specials: ["NIL · جميع البتات صفر", "MAX · جميع البتات واحد"],
    formats: ["قياسي بأحرف صغيرة", "قياسي بأحرف كبيرة", "HEX · 32 خانة", "UUID URN", "نص بين أقواس معقوفة", "ثنائي · 128 بت", "Base64 قياسي", "بايتات عشرية بترتيب الشبكة"],
    steps: ["الصق صيغة UUID مدعومة أو استخدم مثال RFC.", "افحص النوع والإصدار وبنية RFC كلّاً على حدة.", "انسخ صيغة مطبّعة أو مصفوفة البايتات الستة عشر."], questions: ["ما صيغ الإدخال وترتيب البايتات المدعومة؟", "هل البنية المعروفة تثبت الأصالة أو التفرد؟"],
  },
  hi: {
    name: "UUID जाँच और रूपांतरण", tagline: "UUID के संस्करण व वेरिएंट बिट जाँचें, NIL और MAX पहचानें तथा टेक्स्ट, HEX, 128-बिट बाइनरी और मानक Base64 को उन्हीं 16 बाइट के साथ स्थानीय रूप से बदलें।",
    local: "रूपांतरण इसी टैब में होता है। यह टूल UUID को अपलोड या सहेजता नहीं है।",
    rules: "36-अक्षर मानक UUID, 32-अंक HEX, ठीक 128 बाइनरी अंक या == पर खत्म होने वाला 24-अक्षर मानक Base64 स्वीकार है। केवल मानक UUID पर एक urn:uuid: उपसर्ग या घुँघराले कोष्ठक लगा सकते हैं। बाहरी खाली जगह और अक्षर आकार सामान्य होते हैं; नेस्टेड आवरण, Base64URL और अधूरी पैडिंग अस्वीकृत हैं।",
    semantics: "RFC वेरिएंट और आवंटित संस्करण 1–8 पहचाने जाते हैं; NIL/MAX विशेष मान हैं। पुराने वेरिएंट और अज्ञात संस्करण बदले जा सकते हैं पर RFC संरचना के रूप में नहीं पहचाने जाते। इससे एल्गोरिदम, यादृच्छिकता, अद्वितीयता या सुरक्षा प्रमाणित नहीं होती; समय नहीं निकाला जाता।",
    limit: "ट्रिम करने से पहले अधिकतम 128 UTF-16 इकाइयाँ। नेटवर्क बाइट क्रम उपयोग होता है; Microsoft GUID फ़ील्ड बाइट उलटे नहीं जाते।",
    formatError: "एक पूरा समर्थित रूप दर्ज करें। HEX, हाइफ़न, आवरण, बाइनरी लंबाई और मानक Base64 पैडिंग जाँचें।",
    labels: ["UUID इनपुट", "RFC उदाहरण लें", "साफ़ करें", "बाइट, संस्करण और वेरिएंट जाँचने के लिए UUID चिपकाएँ।", "कॉपी करें", "RFC 9562 संरचना या विशेष मान पहचाना गया", "128-बिट मान पढ़ा गया; RFC संरचना नहीं पहचानी गई", "समझा गया संस्करण", "संस्करण बिट", "वेरिएंट परिवार", "विशेष मान", "लागू नहीं / अज्ञात"],
    variants: ["पुराना NCS (0xxx)", "RFC / IETF (10xx)", "पुराना Microsoft (110x)", "भविष्य के लिए आरक्षित (111x)"], specials: ["NIL · सभी बिट शून्य", "MAX · सभी बिट एक"],
    formats: ["मानक छोटे अक्षर", "मानक बड़े अक्षर", "HEX · 32 अंक", "UUID URN", "कोष्ठकों वाला टेक्स्ट", "बाइनरी · 128 बिट", "मानक Base64", "दशमलव बाइट, नेटवर्क क्रम"],
    steps: ["समर्थित UUID रूप चिपकाएँ या RFC उदाहरण लें।", "वेरिएंट, संस्करण और RFC संरचना अलग-अलग जाँचें।", "सामान्यीकृत रूप या 16-बाइट ऐरे कॉपी करें।"], questions: ["कौन से रूप और बाइट क्रम समर्थित हैं?", "क्या संरचना असलियत या अद्वितीयता साबित करती है?"],
  },
  id: {
    name: "Validasi dan konversi UUID", tagline: "Periksa bit versi dan varian UUID, kenali NIL serta MAX, dan ubah teks, HEX, biner 128 bit serta Base64 ketat secara lokal tanpa mengubah 16 byte aslinya.",
    local: "Konversi berlangsung di tab ini. Alat tidak mengunggah atau menyimpan UUID.",
    rules: "Menerima UUID standar 36 karakter, HEX 32 digit, tepat 128 digit biner, atau Base64 standar 24 karakter berakhiran ==. Hanya teks standar boleh memakai satu awalan urn:uuid: atau kurung kurawal. Spasi luar dan huruf dinormalkan; pembungkus bertumpuk, Base64URL dan padding hilang ditolak.",
    semantics: "Pengenalan memeriksa varian RFC dan versi terdaftar 1–8, dengan NIL/MAX sebagai nilai khusus. Varian lama atau versi tidak dikenal tetap dapat dikonversi tetapi tidak diakui sebagai struktur RFC. Tidak membuktikan algoritme, keacakan, keunikan atau keamanan; tidak mengekstrak waktu.",
    limit: "Batas 128 unit UTF-16 sebelum pemangkasan spasi. Urutan byte jaringan; tidak menukar byte bidang Microsoft GUID.",
    formatError: "Masukkan satu representasi lengkap. Periksa HEX, tanda hubung, pembungkus, panjang biner dan padding Base64 baku.",
    labels: ["Masukan UUID", "Gunakan contoh RFC", "Bersihkan", "Tempel UUID untuk memeriksa byte, versi dan varian.", "Salin", "Struktur RFC 9562 atau nilai khusus dikenali", "Nilai 128 bit dibaca; struktur RFC tidak dikenali", "Versi yang ditafsirkan", "Bit versi", "Keluarga varian", "Nilai khusus", "Tidak berlaku / tidak diketahui"],
    variants: ["NCS lama (0xxx)", "RFC / IETF (10xx)", "Microsoft lama (110x)", "Dicadangkan untuk masa depan (111x)"], specials: ["NIL · semua bit nol", "MAX · semua bit satu"],
    formats: ["Standar huruf kecil", "Standar huruf besar", "HEX · 32 digit", "URN UUID", "Teks berkurung kurawal", "Biner · 128 bit", "Base64 standar", "Byte desimal, urutan jaringan"],
    steps: ["Tempel format UUID yang didukung atau gunakan contoh RFC.", "Periksa varian, versi dan struktur RFC secara terpisah.", "Salin format normal atau larik 16 byte."], questions: ["Format dan urutan byte apa yang didukung?", "Apakah struktur membuktikan keaslian atau keunikan?"],
  },
  vi: {
    name: "Kiểm tra và đổi định dạng UUID", tagline: "Kiểm tra bit phiên bản và biến thể UUID, nhận diện NIL/MAX và đổi văn bản, HEX, nhị phân 128 bit cùng Base64 chuẩn ngay trên máy, giữ nguyên 16 byte dữ liệu.",
    local: "Chuyển đổi trong thẻ này. Công cụ không tải lên hay lưu UUID.",
    rules: "Nhận UUID chuẩn 36 ký tự, HEX 32 chữ số, đúng 128 chữ số nhị phân hoặc Base64 chuẩn 24 ký tự kết thúc bằng ==. Chỉ UUID chuẩn được bọc một tiền tố urn:uuid: hoặc một cặp ngoặc nhọn. Chuẩn hóa khoảng trắng ngoài và hoa thường; từ chối bọc lồng, Base64URL và thiếu phần đệm.",
    semantics: "Nhận diện biến thể RFC và phiên bản được cấp 1–8; NIL/MAX là trường hợp đặc biệt. Biến thể cũ hoặc phiên bản lạ vẫn đổi được nhưng không được nhận là cấu trúc RFC. Không chứng minh thuật toán, tính ngẫu nhiên, duy nhất hay an toàn; không trích thời gian.",
    limit: "Giới hạn 128 đơn vị UTF-16 trước khi bỏ khoảng trắng ngoài. Dùng thứ tự byte mạng; không đảo byte trường Microsoft GUID.",
    formatError: "Nhập một dạng đầy đủ. Kiểm tra HEX, dấu gạch, lớp bọc, độ dài nhị phân và phần đệm Base64 chuẩn.",
    labels: ["Đầu vào UUID", "Dùng ví dụ RFC", "Xóa", "Dán UUID để kiểm tra byte, phiên bản và biến thể.", "Sao chép", "Đã nhận cấu trúc RFC 9562 hoặc giá trị đặc biệt", "Đã đọc giá trị 128 bit; chưa nhận cấu trúc RFC", "Phiên bản được hiểu", "Bit phiên bản", "Nhóm biến thể", "Giá trị đặc biệt", "Không áp dụng / chưa biết"],
    variants: ["NCS cũ (0xxx)", "RFC / IETF (10xx)", "Microsoft cũ (110x)", "Dành cho tương lai (111x)"], specials: ["NIL · mọi bit bằng 0", "MAX · mọi bit bằng 1"],
    formats: ["Chuẩn chữ thường", "Chuẩn chữ hoa", "HEX · 32 chữ số", "URN UUID", "Văn bản trong ngoặc nhọn", "Nhị phân · 128 bit", "Base64 chuẩn", "Byte thập phân, thứ tự mạng"],
    steps: ["Dán dạng UUID được hỗ trợ hoặc dùng ví dụ RFC.", "Kiểm tra riêng biến thể, phiên bản và cấu trúc RFC.", "Sao chép dạng chuẩn hoặc mảng 16 byte."], questions: ["Hỗ trợ định dạng và thứ tự byte nào?", "Cấu trúc có chứng minh tính thật hay duy nhất không?"],
  },
};

export type UuidInspectorMessages = Omit<Seed, "labels" | "variants" | "specials" | "formats"> & {
  input: string; example: string; clear: string; empty: string; copy: string; recognized: string; unrecognized: string;
  version: string; versionBits: string; variant: string; special: string; unknown: string;
  variants: Record<UuidVariant, string>; specials: Record<"nil" | "max", string>; formats: Record<Format, string>;
};
function localized<T>(create: (locale: Locale) => T): Record<Locale, T> {
  return { en: create("en"), zh: create("zh"), ja: create("ja"), es: create("es"), pt: create("pt"),
    fr: create("fr"), de: create("de"), ru: create("ru"), it: create("it"), tr: create("tr"),
    ko: create("ko"), ar: create("ar"), hi: create("hi"), id: create("id"), vi: create("vi") };
}
export const UUID_INSPECTOR_MESSAGES = localized<UuidInspectorMessages>(locale => {
  const seed = SEEDS[locale];
  const [input, example, clear, empty, copy, recognized, unrecognized, version, versionBits, variant, special, unknown] = seed.labels;
  return { ...seed, input, example, clear, empty, copy, recognized, unrecognized, version, versionBits, variant, special, unknown,
    variants: { ncs: seed.variants[0], rfc: seed.variants[1], microsoft: seed.variants[2], future: seed.variants[3] },
    specials: { nil: seed.specials[0], max: seed.specials[1] },
    formats: { canonical: seed.formats[0], uppercase: seed.formats[1], raw: seed.formats[2], urn: seed.formats[3],
      braced: seed.formats[4], binary: seed.formats[5], base64: seed.formats[6], bytes: seed.formats[7] },
  };
});
export const UUID_INSPECTOR_COPY = localized<ToolCopy>(locale => {
  const L = UUID_INSPECTOR_MESSAGES[locale];
  return { name: L.name, tagline: L.tagline, intro: [L.local, L.rules, L.semantics, L.limit], steps: L.steps,
    faqs: [{ q: L.questions[0], a: `${L.rules} ${L.limit}` }, { q: L.questions[1], a: L.semantics }],
    deepDive: uuidDeepDive(locale),
  };
});
