import type { Locale } from "@/lib/site";
import type { ToolCopy } from "./types";

type Seed = {
  name: string; tagline: string; scope: string; syntax: string; limits: string;
  labels: [string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string];
  errors: [string, string, string, string, string, string, string];
  steps: [string, string, string]; questions: [string, string];
};
const SEEDS: Record<Locale, Seed> = {
 en: {
  name: "Byte Encoding Converter", tagline: "Convert UTF-8 text or raw files to HEX, RFC 4648 Base32, Bitcoin Base58 and standard Base64 locally, preserving leading zero bytes and rejecting invalid padding.",
  scope: "Convert actual bytes in this tab without uploading or storing data. Text uses UTF-8 only; invalid UTF-8 and unpaired text surrogates are rejected. UTF-8 byte order marks are preserved. Base58 uses the Bitcoin alphabet and preserves every leading zero byte; no Base58Check or other character sets.",
  syntax: "HEX accepts letter case and outputs lowercase, with two digits per byte and no 0x. Base32 requires uppercase RFC 4648 letters and canonical = padding; Base64 uses the standard +/ alphabet with canonical padding. Base58 is case sensitive. Whitespace is rejected by default. The optional switch removes only ASCII tab, LF, VT, FF, CR and space from encoded input; it never changes UTF-8 source text. Files are raw bytes, not guessed from names or MIME types.",
  limits: "Limits: 65,536 decoded/file bytes; Base58 input and output represent at most 1,024 bytes. Raw text input is capped at 262,144 UTF-16 units before whitespace removal. Oversize data is rejected without truncation. Empty input represents zero bytes.",
  labels: ["Source", "Text", "Raw file", "Input encoding", "Output encoding", "Input", "Output", "Choose a file", "Convert", "Clear", "Use sample", "Copy", "Download output text", "Download original bytes", "Choose a source and convert to see a result.", "The result is empty and represents zero bytes; empty downloads are available.", "Reading file…", "Bytes", "Ignore ASCII whitespace in encoded input", "Downloaded"],
  errors: ["Invalid encoding syntax, length, alphabet or padding bits. Use the selected canonical format.", "The bytes are not valid UTF-8. Choose an encoded output or download the original bytes.", "Text contains an unpaired UTF-16 surrogate; refusing to replace it silently.", "The input exceeds the byte or raw text limit. Reduce it; nothing was truncated.", "Base58 is limited to 1,024 bytes. Use a smaller source or another encoding.", "The local file could not be read. Choose it again.", "Choose a valid source, encoding and options."],
  steps: ["Paste text in a selected encoding, or choose a raw local file.", "Choose the output format and convert; review byte count or any error.", "Copy the output or download its text and the original decoded bytes."], questions: ["How strict are padding and whitespace?", "What data, file and encoding limits apply?"],
 },
 zh: {
  name: "字节编码转换器", tagline: "在本地将 UTF-8 文本或原始文件与 HEX、RFC 4648 Base32、Bitcoin Base58 和标准 Base64 相互转换；保留前导零字节并严格校验填充位。",
  scope: "在当前标签页转换真实字节，不上传或存储数据。文本仅用 UTF-8；拒绝无效 UTF-8 和不成对代理字符，保留 UTF-8 BOM。Base58 使用 Bitcoin 字母表，保留每个前导零字节；不支持 Base58Check 或其他字符集。",
  syntax: "HEX 接受大小写、输出小写，每字节两位，不带 0x。Base32 必须使用 RFC 4648 大写字母与规范 = 填充；Base64 使用标准 +/ 字母表及规范填充；Base58 区分大小写。默认拒绝空白；可选开关仅移除编码输入中的 ASCII 制表、LF、VT、FF、CR 和空格，不改变 UTF-8 源文本。文件按原始字节读取，不根据文件名或 MIME 猜测编码。",
  limits: "上限：解码或文件数据 65,536 字节；Base58 输入输出最多表示 1,024 字节。原始文本输入在移除空白前最多 262,144 个 UTF-16 单位。超限拒绝、不截断；空输入表示零字节。",
  labels: ["来源", "文本", "原始文件", "输入编码", "输出编码", "输入", "输出", "选择文件", "转换", "清空", "使用示例", "复制", "下载输出文本", "下载原始字节", "选择来源并转换后查看结果。", "结果为空，表示零字节；仍可下载空文件。", "正在读取文件…", "字节", "忽略编码输入中的 ASCII 空白", "已下载"],
  errors: ["编码语法、长度、字母表或填充位无效，请按所选规范格式输入。", "字节不是有效 UTF-8，请选择编码输出或下载原始字节。", "文本含不成对 UTF-16 代理字符，已拒绝静默替换。", "输入超过字节或原始文本上限，请减少数据；未截断。", "Base58 上限为 1,024 字节，请减少来源数据或选择其他编码。", "无法读取本地文件，请重新选择。", "请选择有效来源、编码与选项。"],
  steps: ["粘贴所选编码的文本，或选择本地原始文件。", "选择输出格式并转换，检查字节数或错误提示。", "复制结果，或下载输出文本及原始解码字节。"], questions: ["填充与空白规则有多严格？", "数据、文件与编码有哪些上限？"],
 },
 ja: {
  name: "バイトエンコーディング変換", tagline: "UTF-8 テキストや元ファイルを HEX、RFC 4648 Base32、Bitcoin Base58、標準 Base64 に端末内で変換。先頭ゼロバイトを保ち、パディングを厳密に検証します。",
  scope: "実バイトをこのタブ内で変換し、送信・保存しません。文字は UTF-8 のみで、不正 UTF-8 と単独サロゲートを拒否し BOM を保持します。Base58 は Bitcoin 字母表で先頭ゼロをすべて保持。Base58Check と他の文字コードは対象外です。",
  syntax: "HEX は大小文字を受け付け、小文字 2 桁/バイトを出力し 0x は付けません。Base32 は RFC 4648 の大文字と正規の =、Base64 は標準 +/ と正規パディング、Base58 は大小文字を区別します。空白は既定で拒否。任意設定で符号化入力の ASCII タブ、LF、VT、FF、CR、空白だけ除去し、UTF-8 原文は変更しません。ファイルは名前や MIME で推測せず元バイトを読みます。",
  limits: "上限：復号/ファイル 65,536 バイト、Base58 入出力 1,024 バイト相当。空白除去前の入力は UTF-16 262,144 単位。超過は切り詰めず拒否。空入力は 0 バイトです。",
  labels: ["入力元", "テキスト", "元ファイル", "入力形式", "出力形式", "入力", "出力", "ファイルを選択", "変換", "クリア", "例を使う", "コピー", "出力テキストを保存", "元バイトを保存", "入力元を選んで変換すると結果を表示します。", "空の結果は 0 バイトです。空ファイルも保存できます。", "ファイルを読込中…", "バイト", "符号化入力の ASCII 空白を無視", "保存しました"],
  errors: ["構文、長さ、文字、パディングビットが不正です。選択形式の正規形式を入力してください。", "有効な UTF-8 ではありません。別の出力形式か元バイト保存を選んでください。", "単独の UTF-16 サロゲートがあります。自動置換せず拒否しました。", "バイト数または入力文字数の上限を超えました。切り詰めていません。", "Base58 は 1,024 バイトまでです。入力を減らすか他の形式を選んでください。", "ローカルファイルを読めません。再選択してください。", "有効な入力元、形式、設定を選んでください。"],
  steps: ["選択形式のテキストを貼るか元ファイルを選びます。", "出力形式を選び変換し、バイト数やエラーを確認します。", "結果をコピーするか出力テキストと元バイトを保存します。"], questions: ["パディングと空白の規則は？", "データやファイルの上限は？"],
 },
 es: {
  name: "Conversor de codificación de bytes", tagline: "Convierte texto UTF-8 o archivos a HEX, Base32 RFC 4648, Base58 Bitcoin y Base64 estándar localmente, conservando ceros iniciales y validando el relleno.",
  scope: "Convierte bytes en esta pestaña sin subir ni guardar datos. Solo texto UTF-8; rechaza bytes inválidos y sustitutos aislados, conservando BOM. Base58 usa el alfabeto Bitcoin y conserva cada byte cero inicial; no admite Base58Check ni otros juegos de caracteres.",
  syntax: "HEX acepta mayúsculas y produce minúsculas, dos dígitos por byte y sin 0x. Base32 exige mayúsculas RFC 4648 y = canónico; Base64 usa +/ estándar y relleno canónico; Base58 distingue mayúsculas. Rechaza espacios por defecto. La opción elimina solo tabulación ASCII, LF, VT, FF, CR y espacio de la entrada codificada; nunca cambia texto UTF-8. Los archivos se leen como bytes, sin inferir por nombre o MIME.",
  limits: "Límites: 65,536 bytes de datos o archivo; Base58 representa hasta 1,024 bytes. Texto bruto: 262,144 unidades UTF-16 antes de quitar espacios. Rechaza excesos sin truncar. Entrada vacía: cero bytes.",
  labels: ["Origen", "Texto", "Archivo binario", "Codificación de entrada", "Codificación de salida", "Entrada", "Salida", "Elegir archivo", "Convertir", "Borrar", "Usar ejemplo", "Copiar", "Descargar texto de salida", "Descargar bytes originales", "Elige un origen y convierte para ver el resultado.", "El resultado vacío representa cero bytes; puedes descargar archivos vacíos.", "Leyendo archivo…", "Bytes", "Ignorar espacios ASCII en entrada codificada", "Descargado"],
  errors: ["Sintaxis, longitud, alfabeto o bits de relleno inválidos. Usa el formato canónico elegido.", "Los bytes no son UTF-8 válido. Elige otra salida o descarga los bytes originales.", "Hay un sustituto UTF-16 aislado; se rechaza sin reemplazarlo.", "La entrada supera el límite de bytes o texto. Redúcela; no se truncó.", "Base58 admite hasta 1,024 bytes. Reduce los datos o elige otra codificación.", "No se pudo leer el archivo local. Vuelve a elegirlo.", "Elige origen, codificación y opciones válidos."],
  steps: ["Pega texto en el formato elegido o abre un archivo local.", "Elige la salida, convierte y revisa bytes o errores.", "Copia el resultado o descarga el texto y los bytes originales."], questions: ["¿Qué reglas de relleno y espacios se aplican?", "¿Qué límites tienen datos y archivos?"],
 },
 pt: {
  name: "Conversor de codificação de bytes", tagline: "Converta texto UTF-8 ou arquivos para HEX, Base32 RFC 4648, Base58 Bitcoin e Base64 padrão localmente, preservando zeros iniciais e validando o preenchimento.",
  scope: "Converte bytes nesta aba sem enviar nem salvar dados. Texto apenas UTF-8; rejeita bytes inválidos e substitutos isolados, preservando BOM. Base58 usa o alfabeto Bitcoin e mantém cada byte zero inicial; sem Base58Check ou outros conjuntos de caracteres.",
  syntax: "HEX aceita maiúsculas e gera minúsculas, dois dígitos por byte sem 0x. Base32 exige letras maiúsculas RFC 4648 e = canônico; Base64 usa +/ padrão e preenchimento canônico; Base58 diferencia maiúsculas. Espaços são rejeitados por padrão. A opção remove só tabulação ASCII, LF, VT, FF, CR e espaço da entrada codificada; nunca altera texto UTF-8. Arquivos são bytes, sem inferir por nome ou MIME.",
  limits: "Limites: 65,536 bytes decodificados ou de arquivo; Base58 representa até 1,024 bytes. Texto bruto: 262,144 unidades UTF-16 antes de retirar espaços. Excesso é rejeitado sem cortes. Entrada vazia: zero bytes.",
  labels: ["Origem", "Texto", "Arquivo bruto", "Codificação de entrada", "Codificação de saída", "Entrada", "Saída", "Escolher arquivo", "Converter", "Limpar", "Usar exemplo", "Copiar", "Baixar texto de saída", "Baixar bytes originais", "Escolha a origem e converta para ver o resultado.", "O resultado vazio representa zero bytes; downloads vazios estão disponíveis.", "Lendo arquivo…", "Bytes", "Ignorar espaços ASCII na entrada codificada", "Baixado"],
  errors: ["Sintaxe, tamanho, alfabeto ou bits de preenchimento inválidos. Use o formato canônico escolhido.", "Os bytes não são UTF-8 válido. Escolha outra saída ou baixe os bytes originais.", "Há um substituto UTF-16 isolado; o texto foi rejeitado sem troca silenciosa.", "A entrada excede o limite de bytes ou texto. Reduza-a; nada foi cortado.", "Base58 aceita até 1,024 bytes. Reduza a origem ou escolha outra codificação.", "Não foi possível ler o arquivo local. Escolha novamente.", "Escolha origem, codificação e opções válidas."],
  steps: ["Cole texto na codificação escolhida ou abra um arquivo local.", "Escolha a saída, converta e confira bytes ou erros.", "Copie a saída ou baixe o texto e os bytes originais."], questions: ["Quais são as regras de espaços e preenchimento?", "Quais limites de dados e arquivos se aplicam?"],
 },
 fr: {
  name: "Conversion d’encodage des octets", tagline: "Convertissez texte UTF-8 ou fichiers en HEX, Base32 RFC 4648, Base58 Bitcoin et Base64 standard localement, en préservant les zéros initiaux et le remplissage exact.",
  scope: "Convertit les octets dans cet onglet sans transmettre ni conserver les données. Texte UTF-8 uniquement ; rejette octets invalides et substituts isolés, conserve le BOM. Base58 emploie l’alphabet Bitcoin et préserve chaque octet zéro initial ; sans Base58Check ni autres jeux de caractères.",
  syntax: "HEX accepte les deux casses et produit deux chiffres minuscules par octet, sans 0x. Base32 exige majuscules RFC 4648 et = canonique ; Base64 utilise +/ standard et remplissage canonique ; Base58 distingue la casse. Espaces refusés par défaut. L’option retire seulement tabulation ASCII, LF, VT, FF, CR et espace des données encodées ; jamais du texte UTF-8. Les fichiers sont lus comme octets, sans déduction par nom ou MIME.",
  limits: "Limites : 65,536 octets décodés ou de fichier ; Base58 représente au plus 1,024 octets. Texte brut : 262,144 unités UTF-16 avant retrait des espaces. Dépassement refusé sans tronquer. Entrée vide : zéro octet.",
  labels: ["Source", "Texte", "Fichier brut", "Encodage d’entrée", "Encodage de sortie", "Entrée", "Sortie", "Choisir un fichier", "Convertir", "Effacer", "Utiliser l’exemple", "Copier", "Télécharger le texte produit", "Télécharger les octets d’origine", "Choisissez une source puis convertissez pour voir le résultat.", "Le résultat vide représente zéro octet ; les fichiers vides restent téléchargeables.", "Lecture du fichier…", "Octets", "Ignorer les espaces ASCII de l’entrée encodée", "Téléchargé"],
  errors: ["Syntaxe, longueur, alphabet ou bits de remplissage invalides. Utilisez le format canonique choisi.", "Ces octets ne sont pas un UTF-8 valide. Choisissez une autre sortie ou téléchargez les octets.", "Le texte contient un substitut UTF-16 isolé ; aucun remplacement silencieux.", "L’entrée dépasse la limite de texte ou d’octets. Réduisez-la ; aucun tronquage.", "Base58 est limité à 1,024 octets. Réduisez la source ou changez d’encodage.", "Lecture du fichier local impossible. Sélectionnez-le à nouveau.", "Choisissez une source, un encodage et des options valides."],
  steps: ["Collez le texte dans l’encodage choisi ou ouvrez un fichier local.", "Choisissez la sortie, convertissez et contrôlez octets ou erreurs.", "Copiez le résultat ou téléchargez le texte et les octets d’origine."], questions: ["Quelles règles pour espaces et remplissage ?", "Quelles limites pour données et fichiers ?"],
 },
 de: {
  name: "Byte-Kodierung umwandeln", tagline: "UTF-8-Text oder Dateien lokal in HEX, RFC-4648-Base32, Bitcoin-Base58 und Standard-Base64 umwandeln, führende Nullbytes erhalten und Padding streng prüfen.",
  scope: "Verarbeitet echte Bytes in diesem Tab ohne Upload oder Speicherung. Nur UTF-8-Text; ungültige Bytes und einzelne Surrogate werden abgelehnt, BOM bleibt erhalten. Base58 nutzt das Bitcoin-Alphabet und erhält jedes führende Nullbyte; kein Base58Check und keine anderen Zeichensätze.",
  syntax: "HEX akzeptiert beide Schreibweisen und liefert zwei kleine Hexziffern je Byte, ohne 0x. Base32 verlangt RFC-4648-Großbuchstaben und kanonisches =; Base64 das Standardalphabet +/ und kanonisches Padding; Base58 unterscheidet Groß/Klein. Leerraum wird standardmäßig abgelehnt. Optional werden nur ASCII-Tab, LF, VT, FF, CR und Leerzeichen aus kodierten Eingaben entfernt; UTF-8-Text bleibt unverändert. Dateiname und MIME bestimmen keine Kodierung.",
  limits: "Grenzen: 65,536 dekodierte Datei-/Datenbytes; Base58 für höchstens 1,024 Bytes. Rohtext vor Leerraumentfernung: 262,144 UTF-16-Einheiten. Keine Kürzung; Übergröße wird abgelehnt. Leere Eingabe entspricht null Bytes.",
  labels: ["Quelle", "Text", "Rohdatei", "Eingabekodierung", "Ausgabekodierung", "Eingabe", "Ausgabe", "Datei wählen", "Umwandeln", "Leeren", "Beispiel verwenden", "Kopieren", "Ausgabetext herunterladen", "Originalbytes herunterladen", "Quelle wählen und umwandeln, um ein Ergebnis zu sehen.", "Das leere Ergebnis enthält null Bytes; leere Dateien können heruntergeladen werden.", "Datei wird gelesen…", "Bytes", "ASCII-Leerraum in kodierter Eingabe ignorieren", "Heruntergeladen"],
  errors: ["Ungültige Syntax, Länge, Alphabet- oder Paddingbits. Das gewählte kanonische Format verwenden.", "Die Bytes sind kein gültiges UTF-8. Andere Ausgabe wählen oder Originalbytes laden.", "Der Text enthält ein einzelnes UTF-16-Surrogat; keine stille Ersetzung.", "Byte- oder Textgrenze überschritten. Eingabe verkleinern; nichts wurde gekürzt.", "Base58 ist auf 1,024 Bytes begrenzt. Kleinere Quelle oder andere Kodierung wählen.", "Lokale Datei konnte nicht gelesen werden. Erneut auswählen.", "Gültige Quelle, Kodierung und Optionen wählen."],
  steps: ["Text im gewählten Format einfügen oder lokale Rohdatei öffnen.", "Ausgabe wählen, umwandeln und Bytezahl oder Fehler prüfen.", "Ergebnis kopieren oder Text und Originalbytes herunterladen."], questions: ["Welche Regeln gelten für Padding und Leerraum?", "Welche Daten- und Dateigrenzen gelten?"],
 },
 ru: {
  name: "Конвертер кодирования байтов", tagline: "Преобразуйте текст UTF-8 и файлы в HEX, Base32 RFC 4648, Bitcoin Base58 и стандартный Base64 локально с сохранением начальных нулей и строгой проверкой дополнения.",
  scope: "Работает с байтами в этой вкладке без отправки и сохранения. Только текст UTF-8; ошибочные байты и одиночные суррогаты отклоняются, BOM сохраняется. Base58 использует алфавит Bitcoin, сохраняя каждый начальный нулевой байт; без Base58Check и других кодировок текста.",
  syntax: "HEX принимает оба регистра и выводит по две строчные цифры на байт без 0x. Base32 требует заглавный алфавит RFC 4648 и канонические =; Base64 использует стандартные +/ и дополнение; Base58 чувствителен к регистру. Пробелы по умолчанию запрещены. Опция убирает только ASCII-табуляцию, LF, VT, FF, CR и пробел из кодированных данных, не меняя текст UTF-8. Файлы читаются как байты без догадок по имени или MIME.",
  limits: "Пределы: 65,536 байтов данных/файла; Base58 — до 1,024 байтов. Исходный текст: 262,144 единицы UTF-16 до удаления пробелов. Превышение отклоняется без обрезки. Пустой ввод означает ноль байтов.",
  labels: ["Источник", "Текст", "Исходный файл", "Кодировка ввода", "Кодировка вывода", "Ввод", "Вывод", "Выбрать файл", "Преобразовать", "Очистить", "Пример", "Копировать", "Скачать текст результата", "Скачать исходные байты", "Выберите источник и преобразуйте для просмотра результата.", "Пустой результат означает ноль байтов; можно скачать пустые файлы.", "Чтение файла…", "Байты", "Игнорировать ASCII-пробелы в кодированном вводе", "Скачано"],
  errors: ["Неверные синтаксис, длина, алфавит или биты дополнения. Используйте канонический формат.", "Байты не являются допустимым UTF-8. Выберите другую форму или скачайте байты.", "Текст содержит одиночный суррогат UTF-16; скрытая замена запрещена.", "Превышен предел байтов или текста. Уменьшите ввод; данные не обрезаны.", "Base58 ограничен 1,024 байтами. Уменьшите источник или смените кодирование.", "Не удалось прочитать локальный файл. Выберите его снова.", "Выберите допустимые источник, кодирование и параметры."],
  steps: ["Вставьте текст выбранного формата или откройте локальный файл.", "Выберите вывод, преобразуйте и проверьте байты или ошибки.", "Скопируйте результат либо скачайте текст и исходные байты."], questions: ["Каковы правила дополнения и пробелов?", "Каковы ограничения данных и файлов?"],
 },
 it: {
  name: "Convertitore di codifica byte", tagline: "Converti testo UTF-8 o file in HEX, Base32 RFC 4648, Base58 Bitcoin e Base64 standard localmente, preservando gli zeri iniziali e verificando il padding.",
  scope: "Converte byte in questa scheda senza inviare o salvare dati. Solo testo UTF-8; rifiuta byte non validi e surrogati isolati, preservando BOM. Base58 usa l’alfabeto Bitcoin e conserva ogni byte zero iniziale; niente Base58Check o altri set di caratteri.",
  syntax: "HEX accetta entrambi i casi e produce due cifre minuscole per byte, senza 0x. Base32 richiede maiuscole RFC 4648 e = canonico; Base64 usa +/ standard e padding canonico; Base58 distingue maiuscole. Spazi rifiutati per impostazione iniziale. L’opzione rimuove solo tab ASCII, LF, VT, FF, CR e spazio dai dati codificati, mai dal testo UTF-8. I file sono byte, senza deduzioni da nome o MIME.",
  limits: "Limiti: 65,536 byte decodificati o di file; Base58 rappresenta al massimo 1,024 byte. Testo grezzo: 262,144 unità UTF-16 prima di togliere spazi. Eccessi rifiutati senza tagli. Input vuoto: zero byte.",
  labels: ["Sorgente", "Testo", "File grezzo", "Codifica di ingresso", "Codifica di uscita", "Ingresso", "Uscita", "Scegli file", "Converti", "Cancella", "Usa esempio", "Copia", "Scarica testo di uscita", "Scarica byte originali", "Scegli una sorgente e converti per vedere il risultato.", "Il risultato vuoto rappresenta zero byte; puoi scaricare file vuoti.", "Lettura del file…", "Byte", "Ignora spazi ASCII nell’ingresso codificato", "Scaricato"],
  errors: ["Sintassi, lunghezza, alfabeto o bit di padding non validi. Usa il formato canonico scelto.", "I byte non sono UTF-8 valido. Scegli un’altra uscita o scarica i byte.", "Il testo contiene un surrogato UTF-16 isolato; nessuna sostituzione silenziosa.", "Superato il limite di byte o testo. Riduci l’ingresso; nulla è stato tagliato.", "Base58 è limitato a 1,024 byte. Riduci la sorgente o cambia codifica.", "Impossibile leggere il file locale. Sceglilo di nuovo.", "Scegli sorgente, codifica e opzioni valide."],
  steps: ["Incolla testo nella codifica scelta o apri un file locale.", "Scegli l’uscita, converti e controlla byte o errori.", "Copia il risultato o scarica testo e byte originali."], questions: ["Quali regole valgono per spazi e padding?", "Quali limiti hanno dati e file?"],
 },
 tr: {
  name: "Bayt kodlama dönüştürücü", tagline: "UTF-8 metni veya dosyaları HEX, RFC 4648 Base32, Bitcoin Base58 ve standart Base64 biçimlerine yerelde dönüştürün; baştaki sıfırları koruyup dolguyu denetleyin.",
  scope: "Bu sekmede gerçek baytları dönüştürür; veri yüklenmez veya saklanmaz. Metin yalnızca UTF-8’dir; geçersiz baytlar ve tek vekil karakterler reddedilir, BOM korunur. Base58 Bitcoin alfabesini kullanır ve her baştaki sıfır baytı korur; Base58Check veya başka karakter kümesi yoktur.",
  syntax: "HEX harf boyutunu kabul eder, bayt başına iki küçük harfli rakam üretir; 0x yoktur. Base32 RFC 4648 büyük harf ve standart = dolgusu ister; Base64 standart +/ alfabesini ve dolguyu kullanır; Base58 büyük/küçük harfe duyarlıdır. Boşluk varsayılan olarak reddedilir. Seçenek yalnızca kodlanmış girdiden ASCII sekme, LF, VT, FF, CR ve boşluğu siler; UTF-8 metni değiştirmez. Dosyalar ad veya MIME ile tahmin edilmez, bayt olarak okunur.",
  limits: "Sınırlar: çözülen/dosya verisi 65,536 bayt; Base58 en çok 1,024 bayt temsil eder. Boşluk silinmeden önce ham metin 262,144 UTF-16 birimiyle sınırlıdır. Fazlalık kesilmeden reddedilir. Boş girdi sıfır bayttır.",
  labels: ["Kaynak", "Metin", "Ham dosya", "Girdi kodlaması", "Çıktı kodlaması", "Girdi", "Çıktı", "Dosya seç", "Dönüştür", "Temizle", "Örneği kullan", "Kopyala", "Çıktı metnini indir", "Özgün baytları indir", "Sonucu görmek için kaynak seçip dönüştürün.", "Boş sonuç sıfır bayttır; boş dosyalar indirilebilir.", "Dosya okunuyor…", "Bayt", "Kodlanmış girdide ASCII boşluğu yok say", "İndirildi"],
  errors: ["Geçersiz sözdizimi, uzunluk, alfabe veya dolgu bitleri. Seçilen standart biçimi kullanın.", "Baytlar geçerli UTF-8 değil. Başka çıktı seçin veya özgün baytları indirin.", "Metin tek UTF-16 vekili içeriyor; sessiz değiştirme reddedildi.", "Bayt veya ham metin sınırı aşıldı. Girdiyi azaltın; kesilmedi.", "Base58 sınırı 1,024 bayttır. Kaynağı küçültün veya başka kodlama seçin.", "Yerel dosya okunamadı. Yeniden seçin.", "Geçerli kaynak, kodlama ve seçenekleri seçin."],
  steps: ["Seçilen kodlamada metin yapıştırın veya yerel dosya açın.", "Çıktıyı seçip dönüştürün; bayt sayısı veya hatayı denetleyin.", "Sonucu kopyalayın ya da metin ve özgün baytları indirin."], questions: ["Dolgu ve boşluk kuralları nelerdir?", "Veri ve dosya sınırları nelerdir?"],
 },
 ko: {
  name: "바이트 인코딩 변환기", tagline: "UTF-8 텍스트나 원본 파일을 HEX, RFC 4648 Base32, Bitcoin Base58 및 표준 Base64로 로컬 변환합니다. 앞쪽 0바이트를 보존하고 패딩 비트를 엄격하게 검사합니다.",
  scope: "이 탭에서 실제 바이트를 변환하며 업로드하거나 저장하지 않습니다. 텍스트는 UTF-8만 지원하고 잘못된 바이트와 단독 서로게이트는 거부하며 BOM은 보존합니다. Base58은 Bitcoin 문자표를 사용하고 모든 선행 0바이트를 보존합니다. Base58Check나 다른 문자 집합은 지원하지 않습니다.",
  syntax: "HEX는 대소문자를 받으며 0x 없이 바이트당 두 자리 소문자를 출력합니다. Base32는 RFC 4648 대문자와 표준 = 패딩을 요구하고 Base64는 표준 +/ 문자표와 패딩을 사용하며 Base58은 대소문자를 구분합니다. 기본으로 공백을 거부합니다. 선택 옵션은 인코딩 입력의 ASCII 탭, LF, VT, FF, CR, 공백만 제거하고 UTF-8 원문은 바꾸지 않습니다. 파일명이나 MIME으로 추측하지 않고 원시 바이트를 읽습니다.",
  limits: "제한: 디코딩 또는 파일 65,536바이트, Base58 입력·출력은 최대 1,024바이트를 표현합니다. 공백 제거 전 원시 텍스트는 UTF-16 262,144단위까지입니다. 초과하면 자르지 않고 거부합니다. 빈 입력은 0바이트입니다.",
  labels: ["원본", "텍스트", "원시 파일", "입력 인코딩", "출력 인코딩", "입력", "출력", "파일 선택", "변환", "지우기", "예시 사용", "복사", "출력 텍스트 다운로드", "원본 바이트 다운로드", "원본을 선택하고 변환하면 결과가 표시됩니다.", "빈 결과는 0바이트이며 빈 파일도 다운로드할 수 있습니다.", "파일 읽는 중…", "바이트", "인코딩 입력의 ASCII 공백 무시", "다운로드됨"],
  errors: ["구문, 길이, 문자표 또는 패딩 비트가 잘못됐습니다. 선택한 표준 형식을 사용하세요.", "바이트가 유효한 UTF-8이 아닙니다. 다른 출력을 선택하거나 원본 바이트를 받으세요.", "텍스트에 단독 UTF-16 서로게이트가 있어 자동 대체를 거부했습니다.", "바이트 또는 원시 텍스트 제한을 초과했습니다. 잘라내지 않았으니 입력을 줄이세요.", "Base58 제한은 1,024바이트입니다. 원본을 줄이거나 다른 인코딩을 선택하세요.", "로컬 파일을 읽지 못했습니다. 다시 선택하세요.", "유효한 원본, 인코딩 및 옵션을 선택하세요."],
  steps: ["선택한 인코딩 텍스트를 붙여 넣거나 로컬 파일을 고르세요.", "출력 형식을 고르고 변환하여 바이트 수나 오류를 확인하세요.", "출력을 복사하거나 텍스트와 원본 바이트를 다운로드하세요."], questions: ["패딩과 공백 규칙은 무엇인가요?", "데이터와 파일의 제한은 무엇인가요?"],
 },
 ar: {
  name: "محول ترميز البايتات", tagline: "حوّل نص UTF-8 أو الملفات إلى HEX وBase32 وفق RFC 4648 وBitcoin Base58 وBase64 القياسي محلياً مع حفظ البايتات الصفرية الأولى وفحص الحشو بدقة.",
  scope: "يحوّل البايتات في هذا التبويب دون رفع البيانات أو حفظها. النص UTF-8 فقط؛ تُرفض البايتات غير الصالحة والبدائل المنفردة ويُحفظ BOM. يستخدم Base58 أبجدية Bitcoin ويحفظ كل بايت صفري أولي؛ دون Base58Check أو مجموعات محارف أخرى.",
  syntax: "يقبل HEX حالتي الأحرف ويخرج رقمين صغيرين لكل بايت دون 0x. يتطلب Base32 أحرف RFC 4648 الكبيرة وحشو = القياسي؛ يستخدم Base64 أبجدية +/ وحشواً قياسياً؛ Base58 حساس لحالة الأحرف. تُرفض الفراغات افتراضياً. يحذف الخيار فقط tab وLF وVT وFF وCR والمسافة من ASCII في المدخل المرمّز، ولا يغير نص UTF-8. الملفات بايتات خام دون تخمين من الاسم أو MIME.",
  limits: "الحدود: 65,536 بايت للبيانات المفكوكة أو الملف؛ Base58 يمثل حتى 1,024 بايت. المدخل النصي الخام 262,144 وحدة UTF-16 قبل حذف الفراغات. تُرفض الزيادة دون اقتطاع. المدخل الفارغ صفر بايت.",
  labels: ["المصدر", "نص", "ملف خام", "ترميز المدخل", "ترميز المخرج", "المدخل", "المخرج", "اختر ملفاً", "تحويل", "مسح", "استخدام المثال", "نسخ", "تنزيل نص المخرج", "تنزيل البايتات الأصلية", "اختر مصدراً وحوّل لعرض النتيجة.", "النتيجة الفارغة تمثل صفراً من البايتات ويمكن تنزيل ملف فارغ.", "جارٍ قراءة الملف…", "بايتات", "تجاهل فراغات ASCII في المدخل المرمّز", "تم التنزيل"],
  errors: ["صياغة أو طول أو أبجدية أو بتات حشو غير صالحة. استخدم الصيغة القياسية المختارة.", "البايتات ليست UTF-8 صالحاً. اختر مخرجاً آخر أو نزّل البايتات الأصلية.", "النص يحوي بديلاً UTF-16 منفرداً؛ رُفض الاستبدال الصامت.", "تجاوز المدخل حد البايتات أو النص. قلله؛ لم يُقتطع شيء.", "Base58 محدود بـ 1,024 بايت. قلل المصدر أو غيّر الترميز.", "تعذرت قراءة الملف المحلي. اختره مجدداً.", "اختر مصدراً وترميزاً وخيارات صالحة."],
  steps: ["الصق نصاً بالترميز المختار أو اختر ملفاً محلياً خاماً.", "اختر المخرج وحوّل وافحص عدد البايتات أو الخطأ.", "انسخ الناتج أو نزّل النص والبايتات الأصلية."], questions: ["ما قواعد الحشو والفراغات؟", "ما حدود البيانات والملفات والترميز؟"],
 },
 hi: {
  name: "बाइट एन्कोडिंग कन्वर्टर", tagline: "UTF-8 टेक्स्ट या फ़ाइल को HEX, RFC 4648 Base32, Bitcoin Base58 और मानक Base64 में स्थानीय रूप से बदलें; शुरुआत के शून्य बाइट बचाएँ और पैडिंग जाँचें।",
  scope: "इसी टैब में वास्तविक बाइट बदलता है; डेटा अपलोड या सहेजा नहीं जाता। टेक्स्ट केवल UTF-8 है; गलत बाइट और अकेले सरोगेट अस्वीकृत हैं, BOM बचता है। Base58 Bitcoin वर्णमाला और हर शुरुआती शून्य बाइट बचाता है; Base58Check या अन्य अक्षर-समूह नहीं हैं।",
  syntax: "HEX दोनों अक्षर आकार स्वीकार कर 0x के बिना दो छोटे अंक प्रति बाइट देता है। Base32 में RFC 4648 बड़े अक्षर और सही = पैडिंग चाहिए; Base64 मानक +/ और सही पैडिंग उपयोग करता है; Base58 अक्षर आकार अलग मानता है। डिफ़ॉल्ट में खाली जगह अस्वीकृत है। विकल्प केवल एन्कोडेड इनपुट के ASCII टैब, LF, VT, FF, CR और स्पेस हटाता है; UTF-8 टेक्स्ट नहीं बदलता। फ़ाइलें नाम या MIME से अनुमान बिना मूल बाइट पढ़ती हैं।",
  limits: "सीमा: डिकोड या फ़ाइल डेटा 65,536 बाइट; Base58 अधिकतम 1,024 बाइट दर्शाता है। खाली जगह हटाने से पहले टेक्स्ट 262,144 UTF-16 इकाइयाँ। अतिरिक्त डेटा बिना काटे अस्वीकृत है। खाली इनपुट शून्य बाइट है।",
  labels: ["स्रोत", "टेक्स्ट", "मूल फ़ाइल", "इनपुट एन्कोडिंग", "आउटपुट एन्कोडिंग", "इनपुट", "आउटपुट", "फ़ाइल चुनें", "बदलें", "साफ़ करें", "उदाहरण लें", "कॉपी", "आउटपुट टेक्स्ट डाउनलोड", "मूल बाइट डाउनलोड", "परिणाम देखने के लिए स्रोत चुनें और बदलें।", "खाली परिणाम शून्य बाइट है; खाली फ़ाइल डाउनलोड कर सकते हैं।", "फ़ाइल पढ़ी जा रही है…", "बाइट", "एन्कोडेड इनपुट में ASCII खाली जगह अनदेखी करें", "डाउनलोड हुआ"],
  errors: ["गलत सिंटैक्स, लंबाई, वर्णमाला या पैडिंग बिट। चुना हुआ मानक रूप उपयोग करें।", "बाइट मान्य UTF-8 नहीं हैं। अन्य आउटपुट चुनें या मूल बाइट डाउनलोड करें।", "टेक्स्ट में अकेला UTF-16 सरोगेट है; चुपचाप बदलना अस्वीकृत है।", "इनपुट बाइट या टेक्स्ट सीमा से अधिक है। कम करें; कुछ काटा नहीं गया।", "Base58 सीमा 1,024 बाइट है। स्रोत छोटा करें या अन्य एन्कोडिंग चुनें।", "स्थानीय फ़ाइल पढ़ी नहीं जा सकी। दोबारा चुनें।", "मान्य स्रोत, एन्कोडिंग और विकल्प चुनें।"],
  steps: ["चुनी एन्कोडिंग में टेक्स्ट चिपकाएँ या स्थानीय फ़ाइल चुनें।", "आउटपुट चुनकर बदलें और बाइट संख्या या त्रुटि देखें।", "परिणाम कॉपी करें या टेक्स्ट तथा मूल बाइट डाउनलोड करें।"], questions: ["पैडिंग और खाली जगह के नियम क्या हैं?", "डेटा, फ़ाइल और एन्कोडिंग की सीमाएँ क्या हैं?"],
 },
 id: {
  name: "Konverter pengodean byte", tagline: "Ubah teks UTF-8 atau file menjadi HEX, Base32 RFC 4648, Base58 Bitcoin dan Base64 standar secara lokal, pertahankan nol awal dan periksa padding dengan ketat.",
  scope: "Mengubah byte di tab ini tanpa mengunggah atau menyimpan data. Teks hanya UTF-8; byte tidak valid dan surrogate tunggal ditolak, BOM dipertahankan. Base58 memakai alfabet Bitcoin dan menjaga setiap byte nol awal; tanpa Base58Check atau set karakter lain.",
  syntax: "HEX menerima besar/kecil dan menghasilkan dua digit kecil per byte tanpa 0x. Base32 memerlukan huruf besar RFC 4648 serta padding = baku; Base64 memakai alfabet +/ standar dan padding baku; Base58 peka huruf besar/kecil. Spasi ditolak secara baku. Opsi hanya menghapus tab ASCII, LF, VT, FF, CR dan spasi dari masukan berkode; teks UTF-8 tidak berubah. File dibaca sebagai byte mentah, bukan ditebak dari nama atau MIME.",
  limits: "Batas: 65,536 byte hasil dekode/file; Base58 mewakili hingga 1,024 byte. Teks mentah 262,144 unit UTF-16 sebelum spasi dihapus. Kelebihan ditolak tanpa dipotong. Masukan kosong berarti nol byte.",
  labels: ["Sumber", "Teks", "File mentah", "Kode masukan", "Kode keluaran", "Masukan", "Keluaran", "Pilih file", "Konversi", "Bersihkan", "Gunakan contoh", "Salin", "Unduh teks keluaran", "Unduh byte asli", "Pilih sumber dan konversi untuk melihat hasil.", "Hasil kosong berarti nol byte; file kosong tetap dapat diunduh.", "Membaca file…", "Byte", "Abaikan spasi ASCII dalam masukan berkode", "Diunduh"],
  errors: ["Sintaks, panjang, alfabet atau bit padding tidak valid. Gunakan format baku yang dipilih.", "Byte bukan UTF-8 valid. Pilih keluaran lain atau unduh byte asli.", "Teks mengandung surrogate UTF-16 tunggal; penggantian diam-diam ditolak.", "Masukan melebihi batas byte atau teks. Kurangi; tidak ada pemotongan.", "Base58 dibatasi 1,024 byte. Kurangi sumber atau ganti pengodean.", "File lokal tidak dapat dibaca. Pilih ulang.", "Pilih sumber, pengodean dan opsi yang valid."],
  steps: ["Tempel teks dengan kode terpilih atau pilih file lokal mentah.", "Pilih keluaran dan konversi; periksa byte atau kesalahan.", "Salin hasil atau unduh teks dan byte asli."], questions: ["Apa aturan padding dan spasi?", "Apa batas data, file dan pengodean?"],
 },
 vi: {
  name: "Chuyển đổi mã hóa byte", tagline: "Đổi văn bản UTF-8 hoặc tệp sang HEX, Base32 RFC 4648, Bitcoin Base58 và Base64 chuẩn ngay trên máy, giữ byte 0 đầu và kiểm tra phần đệm nghiêm ngặt.",
  scope: "Đổi byte thực trong thẻ này, không tải lên hay lưu dữ liệu. Văn bản chỉ UTF-8; từ chối byte lỗi và surrogate đơn, giữ BOM. Base58 dùng bảng chữ Bitcoin và giữ từng byte 0 đầu; không có Base58Check hay bộ ký tự khác.",
  syntax: "HEX nhận hoa thường và xuất hai chữ số thường mỗi byte, không có 0x. Base32 yêu cầu chữ hoa RFC 4648 và đệm = chuẩn; Base64 dùng bảng +/ chuẩn cùng đệm chuẩn; Base58 phân biệt hoa thường. Mặc định từ chối khoảng trắng. Tùy chọn chỉ bỏ tab ASCII, LF, VT, FF, CR và dấu cách khỏi đầu vào đã mã hóa; không đổi văn bản UTF-8. Tệp được đọc dạng byte, không đoán qua tên hay MIME.",
  limits: "Giới hạn: 65,536 byte giải mã/tệp; Base58 biểu diễn tối đa 1,024 byte. Văn bản thô 262,144 đơn vị UTF-16 trước khi bỏ khoảng trắng. Quá giới hạn bị từ chối, không cắt. Đầu vào rỗng là 0 byte.",
  labels: ["Nguồn", "Văn bản", "Tệp thô", "Mã đầu vào", "Mã đầu ra", "Đầu vào", "Đầu ra", "Chọn tệp", "Chuyển đổi", "Xóa", "Dùng ví dụ", "Sao chép", "Tải văn bản đầu ra", "Tải byte gốc", "Chọn nguồn và chuyển đổi để xem kết quả.", "Kết quả rỗng là 0 byte; vẫn tải được tệp rỗng.", "Đang đọc tệp…", "Byte", "Bỏ khoảng trắng ASCII trong đầu vào mã hóa", "Đã tải"],
  errors: ["Sai cú pháp, độ dài, bảng chữ hoặc bit đệm. Dùng dạng chuẩn đã chọn.", "Byte không phải UTF-8 hợp lệ. Chọn đầu ra khác hoặc tải byte gốc.", "Văn bản có surrogate UTF-16 đơn; từ chối tự thay thế.", "Đầu vào vượt giới hạn byte hoặc văn bản. Hãy giảm; chưa cắt dữ liệu.", "Base58 giới hạn 1,024 byte. Giảm nguồn hoặc chọn mã khác.", "Không đọc được tệp cục bộ. Hãy chọn lại.", "Chọn nguồn, mã và tùy chọn hợp lệ."],
  steps: ["Dán văn bản theo mã đã chọn hoặc mở tệp thô cục bộ.", "Chọn đầu ra, chuyển đổi và kiểm tra byte hoặc lỗi.", "Sao chép kết quả hoặc tải văn bản và byte gốc."], questions: ["Quy tắc khoảng trắng và phần đệm là gì?", "Giới hạn dữ liệu, tệp và mã hóa là gì?"],
 },
};
function localized<T>(create: (locale: Locale) => T): Record<Locale, T> {
 return { en: create("en"), zh: create("zh"), ja: create("ja"), es: create("es"), pt: create("pt"), fr: create("fr"), de: create("de"), ru: create("ru"), it: create("it"), tr: create("tr"), ko: create("ko"), ar: create("ar"), hi: create("hi"), id: create("id"), vi: create("vi") };
}
const DOWNLOAD_ERRORS: Record<Locale, string> = {
 en: "The download could not start. Try again; no download success is reported.",
 zh: "无法开始下载，请重试；未报告下载成功。",
 ja: "ダウンロードを開始できませんでした。再試行してください。成功として扱いません。",
 es: "No se pudo iniciar la descarga. Reinténtalo; no se indica éxito.",
 pt: "Não foi possível iniciar o download. Tente novamente; não foi indicado sucesso.",
 fr: "Le téléchargement n’a pas pu démarrer. Réessayez ; aucun succès n’est annoncé.",
 de: "Der Download konnte nicht starten. Erneut versuchen; kein Erfolg wird gemeldet.",
 ru: "Не удалось начать скачивание. Повторите попытку; успех не подтверждён.",
 it: "Impossibile avviare il download. Riprova; non è stato indicato successo.",
 tr: "İndirme başlatılamadı. Yeniden deneyin; başarı bildirilmedi.",
 ko: "다운로드를 시작하지 못했습니다. 다시 시도하세요. 성공으로 표시하지 않습니다.",
 ar: "تعذر بدء التنزيل. حاول مجدداً؛ لم تُعلن الأداة نجاحاً.",
 hi: "डाउनलोड शुरू नहीं हो सका। फिर कोशिश करें; सफलता नहीं बताई गई है।",
 id: "Unduhan tidak dapat dimulai. Coba lagi; keberhasilan tidak dilaporkan.",
 vi: "Không thể bắt đầu tải xuống. Hãy thử lại; chưa báo thành công.",
};
export const BYTE_ENCODING_MESSAGES = localized(locale => {
 const s = SEEDS[locale];
 const [source, text, file, from, to, input, output, pickFile, convert, clear, sample, copy, downloadText, downloadBytes, empty, emptyOutput, working, bytes, ignoreWhitespace, saved] = s.labels;
 const [formatError, invalidUtf8, invalidText, limitError, base58Limit, readError, invalidInput] = s.errors;
 return { ...s, downloadError: DOWNLOAD_ERRORS[locale], source, text, file, from, to, input, output, pickFile, convert, clear, sample, copy, downloadText, downloadBytes, empty, emptyOutput, working, bytes, ignoreWhitespace, saved, formatError, invalidUtf8, invalidText, limitError, base58Limit, readError, invalidInput };
});
export const BYTE_ENCODING_COPY = localized<ToolCopy>(locale => {
 const s = BYTE_ENCODING_MESSAGES[locale];
 return { name: s.name, tagline: s.tagline, intro: [s.scope, s.syntax, s.limits], steps: s.steps, faqs: [{ q: s.questions[0], a: s.syntax }, { q: s.questions[1], a: `${s.scope} ${s.limits}` }] };
});
