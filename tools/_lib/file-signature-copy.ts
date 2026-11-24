import type { Locale } from "@/lib/site";
import type { ToolCopy } from "./types";
import { fileTypeDeepDive } from "./deepdive-dev";

type Messages = {
  drop: string; local: string; rule: string; container: string; empty: string;
  loading: string; invalid: string; readError: string; clear: string; matched: string; unknown: string;
  metadata: string; fileName: string; fileSize: string; browserMime: string; extension: string;
  signatureMime: string; extensions: string; read: string; hex: string; none: string; copy: string;
};

export const FILE_SIGNATURE_MESSAGES: Record<Locale, Messages> = {
  en: {
    drop: "Choose or drop any local file", local: "Only the first 65,536 bytes are read on this device. The file is not uploaded or saved.",
    rule: "A header signature suggests a format; it does not validate the file, prove its contents or scan for malware. Unknown means no supported signature matched.",
    container: "Container match only: ZIP does not establish DOCX, XLSX or any other enclosed format. OLE does not establish a specific Office document type. Container contents are not inspected.",
    empty: "Choose a file to inspect its header and compare the result with unverified filename and browser metadata.",
    loading: "Reading the file header…", invalid: "Choose a readable local file.", readError: "The file header could not be read. Choose the file again.", clear: "Clear file", matched: "Header signature match", unknown: "Unknown or unsupported header — no signature matched",
    metadata: "Unverified file metadata", fileName: "Filename", fileSize: "File size (bytes)", browserMime: "Browser-reported MIME", extension: "Filename extension", signatureMime: "MIME suggested by signature", extensions: "Typical extensions", read: "Bytes read", hex: "Header preview (up to 64 bytes, hexadecimal)", none: "Not available", copy: "Copy JSON report",
  },
  zh: {
    drop: "选择或拖入任意本地文件", local: "仅在当前设备读取文件开头的 65,536 字节，不上传文件，也不保存记录。",
    rule: "文件头特征只能提示格式，不能验证完整文件、证明内容或查杀恶意软件。“未知”表示没有匹配已支持的特征。",
    container: "只识别容器：ZIP 不能证明文件是 DOCX、XLSX 或其他内部格式；OLE 不能证明具体的 Office 文档类型。工具不检查容器内容。",
    empty: "选择文件后查看文件头，并与尚未验证的文件名和浏览器元数据对照。", loading: "正在读取文件头…", invalid: "请选择可读取的本地文件。", readError: "无法读取文件头，请重新选择文件。", clear: "清除文件", matched: "文件头特征匹配", unknown: "未知或暂不支持的文件头：没有匹配特征",
    metadata: "未验证的文件元数据", fileName: "文件名", fileSize: "文件大小（字节）", browserMime: "浏览器提供的 MIME", extension: "文件名扩展名", signatureMime: "特征提示的 MIME", extensions: "常见扩展名", read: "已读取字节", hex: "文件头预览（最多 64 字节，十六进制）", none: "无可用信息", copy: "复制 JSON 报告",
  },
  ja: {
    drop: "ローカルファイルを選択またはドロップ", local: "端末上で先頭 65,536 バイトだけを読みます。ファイルの送信や履歴保存はしません。",
    rule: "ヘッダーのシグネチャは形式の候補です。ファイル全体の検証、内容の証明、マルウェア検査は行いません。不明は対応する特徴に一致しない状態です。",
    container: "コンテナのみの一致です。ZIP から DOCX・XLSX などの内部形式、OLE から特定の Office 文書形式は確定できません。内部は調べません。",
    empty: "ファイルを選ぶと、ヘッダーと未検証のファイル名・ブラウザー情報を比較できます。", loading: "ヘッダーを読み込み中…", invalid: "読み取れるローカルファイルを選んでください。", readError: "ヘッダーを読み取れません。ファイルを選び直してください。", clear: "ファイルをクリア", matched: "ヘッダーのシグネチャが一致", unknown: "不明または未対応のヘッダー：一致なし",
    metadata: "未検証のファイル情報", fileName: "ファイル名", fileSize: "ファイルサイズ（バイト）", browserMime: "ブラウザーが報告した MIME", extension: "ファイル名の拡張子", signatureMime: "シグネチャによる MIME 候補", extensions: "一般的な拡張子", read: "読み取ったバイト数", hex: "先頭の表示（最大 64 バイト、16 進数）", none: "情報なし", copy: "JSON レポートをコピー",
  },
  es: {
    drop: "Elige o suelta cualquier archivo local", local: "Solo se leen los primeros 65.536 bytes en este dispositivo. El archivo no se sube ni se guarda.",
    rule: "La firma sugiere un formato; no valida el archivo, demuestra su contenido ni busca malware. Desconocido significa que ninguna firma admitida coincide.",
    container: "Solo se reconoce el contenedor: ZIP no confirma DOCX, XLSX ni otro formato interno. OLE no confirma un documento Office concreto. No se inspecciona el contenido.",
    empty: "Elige un archivo para comparar su cabecera con el nombre y los metadatos del navegador, sin verificar.", loading: "Leyendo la cabecera…", invalid: "Elige un archivo local que se pueda leer.", readError: "No se pudo leer la cabecera. Vuelve a elegir el archivo.", clear: "Quitar archivo", matched: "Firma de cabecera coincidente", unknown: "Cabecera desconocida o no admitida: sin coincidencia",
    metadata: "Metadatos del archivo sin verificar", fileName: "Nombre", fileSize: "Tamaño (bytes)", browserMime: "MIME indicado por el navegador", extension: "Extensión del nombre", signatureMime: "MIME sugerido por la firma", extensions: "Extensiones habituales", read: "Bytes leídos", hex: "Vista de cabecera (hasta 64 bytes, hexadecimal)", none: "No disponible", copy: "Copiar informe JSON",
  },
  pt: {
    drop: "Escolha ou solte qualquer arquivo local", local: "Apenas os primeiros 65.536 bytes são lidos neste dispositivo. O arquivo não é enviado nem salvo.",
    rule: "A assinatura sugere um formato; não valida o arquivo, comprova o conteúdo nem verifica malware. Desconhecido significa que nenhuma assinatura compatível foi encontrada.",
    container: "Somente o contêiner é reconhecido: ZIP não confirma DOCX, XLSX ou outro formato interno. OLE não confirma um documento Office específico. O conteúdo não é inspecionado.",
    empty: "Escolha um arquivo para comparar o cabeçalho com o nome e os metadados não verificados do navegador.", loading: "Lendo o cabeçalho…", invalid: "Escolha um arquivo local legível.", readError: "Não foi possível ler o cabeçalho. Escolha o arquivo novamente.", clear: "Limpar arquivo", matched: "Assinatura de cabeçalho encontrada", unknown: "Cabeçalho desconhecido ou sem suporte: nenhuma assinatura",
    metadata: "Metadados do arquivo não verificados", fileName: "Nome do arquivo", fileSize: "Tamanho (bytes)", browserMime: "MIME informado pelo navegador", extension: "Extensão do nome", signatureMime: "MIME sugerido pela assinatura", extensions: "Extensões usuais", read: "Bytes lidos", hex: "Prévia do cabeçalho (até 64 bytes, hexadecimal)", none: "Indisponível", copy: "Copiar relatório JSON",
  },
  fr: {
    drop: "Choisissez ou déposez un fichier local", local: "Seuls les 65 536 premiers octets sont lus sur cet appareil. Le fichier n’est ni envoyé ni enregistré.",
    rule: "La signature suggère un format sans valider le fichier, prouver son contenu ni rechercher de logiciel malveillant. Inconnu signifie qu’aucune signature prise en charge ne correspond.",
    container: "Seul le conteneur est reconnu : ZIP ne confirme ni DOCX, ni XLSX, ni un autre format interne. OLE ne confirme aucun type Office précis. Le contenu n’est pas inspecté.",
    empty: "Choisissez un fichier pour comparer son en-tête au nom et aux métadonnées non vérifiées du navigateur.", loading: "Lecture de l’en-tête…", invalid: "Choisissez un fichier local lisible.", readError: "Impossible de lire l’en-tête. Sélectionnez à nouveau le fichier.", clear: "Effacer le fichier", matched: "Signature d’en-tête reconnue", unknown: "En-tête inconnu ou non pris en charge : aucune correspondance",
    metadata: "Métadonnées non vérifiées", fileName: "Nom du fichier", fileSize: "Taille (octets)", browserMime: "MIME signalé par le navigateur", extension: "Extension du nom", signatureMime: "MIME suggéré par la signature", extensions: "Extensions habituelles", read: "Octets lus", hex: "Aperçu de l’en-tête (64 octets maximum, hexadécimal)", none: "Indisponible", copy: "Copier le rapport JSON",
  },
  de: {
    drop: "Lokale Datei auswählen oder ablegen", local: "Nur die ersten 65.536 Bytes werden auf diesem Gerät gelesen. Die Datei wird weder hochgeladen noch gespeichert.",
    rule: "Eine Signatur deutet auf ein Format hin. Sie prüft weder die gesamte Datei noch deren Inhalt oder Schadsoftware. Unbekannt bedeutet, dass keine unterstützte Signatur passt.",
    container: "Nur der Container wird erkannt: ZIP belegt weder DOCX noch XLSX oder andere innere Formate. OLE belegt keinen bestimmten Office-Dateityp. Inhalte werden nicht geprüft.",
    empty: "Wähle eine Datei, um den Header mit ungeprüftem Namen und Browser-Metadaten zu vergleichen.", loading: "Dateiheader wird gelesen…", invalid: "Wähle eine lesbare lokale Datei.", readError: "Der Header konnte nicht gelesen werden. Wähle die Datei erneut.", clear: "Datei entfernen", matched: "Passende Header-Signatur", unknown: "Unbekannter oder nicht unterstützter Header: keine Übereinstimmung",
    metadata: "Ungeprüfte Dateimetadaten", fileName: "Dateiname", fileSize: "Dateigröße (Bytes)", browserMime: "Vom Browser gemeldeter MIME-Typ", extension: "Dateinamenerweiterung", signatureMime: "Von der Signatur vorgeschlagener MIME-Typ", extensions: "Übliche Erweiterungen", read: "Gelesene Bytes", hex: "Header-Vorschau (bis zu 64 Bytes, hexadezimal)", none: "Nicht verfügbar", copy: "JSON-Bericht kopieren",
  },
  ru: {
    drop: "Выберите или перетащите локальный файл", local: "На устройстве читаются только первые 65 536 байт. Файл не отправляется и не сохраняется.",
    rule: "Сигнатура предполагает формат, но не проверяет весь файл, не подтверждает содержимое и не ищет вредоносный код. Неизвестно означает отсутствие поддерживаемой сигнатуры.",
    container: "Распознаётся только контейнер: ZIP не подтверждает DOCX, XLSX или другой внутренний формат. OLE не подтверждает конкретный тип Office. Содержимое не исследуется.",
    empty: "Выберите файл для сравнения заголовка с непроверенными именем и метаданными браузера.", loading: "Чтение заголовка…", invalid: "Выберите доступный для чтения локальный файл.", readError: "Не удалось прочитать заголовок. Выберите файл ещё раз.", clear: "Очистить файл", matched: "Найдена сигнатура заголовка", unknown: "Неизвестный или неподдерживаемый заголовок: совпадений нет",
    metadata: "Непроверенные метаданные файла", fileName: "Имя файла", fileSize: "Размер (байт)", browserMime: "MIME по данным браузера", extension: "Расширение имени", signatureMime: "MIME по сигнатуре", extensions: "Типичные расширения", read: "Прочитано байт", hex: "Начало файла (до 64 байт, шестнадцатерично)", none: "Нет данных", copy: "Копировать отчёт JSON",
  },
  it: {
    drop: "Scegli o trascina un file locale", local: "Vengono letti solo i primi 65.536 byte sul dispositivo. Il file non viene caricato né salvato.",
    rule: "La firma suggerisce un formato: non convalida l’intero file, prova il contenuto o cerca malware. Sconosciuto indica che nessuna firma supportata corrisponde.",
    container: "Si riconosce solo il contenitore: ZIP non conferma DOCX, XLSX o altri formati interni. OLE non conferma un documento Office specifico. Il contenuto non viene esaminato.",
    empty: "Scegli un file per confrontarne l’intestazione con nome e metadati del browser non verificati.", loading: "Lettura dell’intestazione…", invalid: "Scegli un file locale leggibile.", readError: "Impossibile leggere l’intestazione. Seleziona di nuovo il file.", clear: "Rimuovi file", matched: "Firma dell’intestazione riconosciuta", unknown: "Intestazione sconosciuta o non supportata: nessuna corrispondenza",
    metadata: "Metadati del file non verificati", fileName: "Nome del file", fileSize: "Dimensione (byte)", browserMime: "MIME indicato dal browser", extension: "Estensione del nome", signatureMime: "MIME suggerito dalla firma", extensions: "Estensioni comuni", read: "Byte letti", hex: "Anteprima intestazione (fino a 64 byte, esadecimale)", none: "Non disponibile", copy: "Copia rapporto JSON",
  },
  tr: {
    drop: "Yerel bir dosya seçin veya bırakın", local: "Bu cihazda yalnızca ilk 65.536 bayt okunur. Dosya yüklenmez veya kaydedilmez.",
    rule: "Başlık imzası bir biçim önerir; dosyanın tümünü doğrulamaz, içeriği kanıtlamaz ve kötü amaçlı yazılım taraması yapmaz. Bilinmiyor, desteklenen imza eşleşmedi demektir.",
    container: "Yalnızca kapsayıcı tanınır: ZIP, DOCX veya XLSX gibi iç biçimleri doğrulamaz. OLE belirli bir Office belgesi türünü doğrulamaz. Kapsayıcı içeriği incelenmez.",
    empty: "Başlığı doğrulanmamış dosya adı ve tarayıcı bilgileriyle karşılaştırmak için dosya seçin.", loading: "Dosya başlığı okunuyor…", invalid: "Okunabilir bir yerel dosya seçin.", readError: "Başlık okunamadı. Dosyayı tekrar seçin.", clear: "Dosyayı temizle", matched: "Başlık imzası eşleşti", unknown: "Bilinmeyen veya desteklenmeyen başlık: imza eşleşmedi",
    metadata: "Doğrulanmamış dosya bilgileri", fileName: "Dosya adı", fileSize: "Dosya boyutu (bayt)", browserMime: "Tarayıcının bildirdiği MIME", extension: "Dosya adı uzantısı", signatureMime: "İmzanın önerdiği MIME", extensions: "Yaygın uzantılar", read: "Okunan bayt", hex: "Başlık önizlemesi (en fazla 64 bayt, onaltılık)", none: "Bilgi yok", copy: "JSON raporunu kopyala",
  },
  ko: {
    drop: "로컬 파일을 선택하거나 놓으세요", local: "이 기기에서 파일 앞부분 65,536바이트만 읽습니다. 파일을 업로드하거나 저장하지 않습니다.",
    rule: "헤더 서명은 형식 후보를 알려줄 뿐 파일 전체를 검증하거나 내용을 증명하거나 악성코드를 검사하지 않습니다. 알 수 없음은 지원되는 서명과 일치하지 않는다는 뜻입니다.",
    container: "컨테이너만 식별합니다. ZIP만으로 DOCX, XLSX 같은 내부 형식을 확정할 수 없으며 OLE도 특정 Office 문서 형식을 증명하지 않습니다. 내부 내용은 검사하지 않습니다.",
    empty: "파일을 선택해 헤더를 확인하고 검증되지 않은 파일명 및 브라우저 정보와 비교하세요.", loading: "파일 헤더를 읽는 중…", invalid: "읽을 수 있는 로컬 파일을 선택하세요.", readError: "헤더를 읽지 못했습니다. 파일을 다시 선택하세요.", clear: "파일 지우기", matched: "헤더 서명 일치", unknown: "알 수 없거나 지원하지 않는 헤더: 일치하는 서명 없음",
    metadata: "검증되지 않은 파일 정보", fileName: "파일명", fileSize: "파일 크기(바이트)", browserMime: "브라우저가 제공한 MIME", extension: "파일명 확장자", signatureMime: "서명으로 추정한 MIME", extensions: "일반적인 확장자", read: "읽은 바이트", hex: "헤더 미리보기(최대 64바이트, 16진수)", none: "정보 없음", copy: "JSON 보고서 복사",
  },
  ar: {
    drop: "اختر أي ملف محلي أو أفلته", local: "تُقرأ أول 65,536 بايت فقط على هذا الجهاز. لا يُرفع الملف ولا يُحفظ.",
    rule: "يقترح توقيع الترويسة تنسيقاً فقط؛ ولا يتحقق من الملف كاملاً أو يثبت محتواه أو يفحص البرمجيات الضارة. غير معروف يعني عدم تطابق أي توقيع مدعوم.",
    container: "يُعرف نوع الحاوية فقط: لا يثبت ZIP أن المحتوى DOCX أو XLSX أو أي تنسيق داخلي آخر، ولا يثبت OLE نوع مستند Office محدداً. لا يُفحص محتوى الحاوية.",
    empty: "اختر ملفاً لمقارنة ترويسته مع الاسم وبيانات المتصفح غير المتحقق منها.", loading: "جارٍ قراءة ترويسة الملف…", invalid: "اختر ملفاً محلياً يمكن قراءته.", readError: "تعذرت قراءة الترويسة. اختر الملف من جديد.", clear: "مسح الملف", matched: "تطابق توقيع الترويسة", unknown: "ترويسة غير معروفة أو غير مدعومة: لا يوجد توقيع مطابق",
    metadata: "بيانات ملف غير متحقق منها", fileName: "اسم الملف", fileSize: "حجم الملف بالبايت", browserMime: "MIME الذي أبلغ عنه المتصفح", extension: "امتداد اسم الملف", signatureMime: "MIME المقترح بالتوقيع", extensions: "الامتدادات المعتادة", read: "البايتات المقروءة", hex: "معاينة الترويسة: حتى 64 بايت بالنظام السداسي عشر", none: "غير متاح", copy: "نسخ تقرير JSON",
  },
  hi: {
    drop: "कोई स्थानीय फ़ाइल चुनें या छोड़ें", local: "इस डिवाइस पर केवल पहले 65,536 बाइट पढ़े जाते हैं। फ़ाइल अपलोड या सहेजी नहीं जाती।",
    rule: "हेडर हस्ताक्षर केवल प्रारूप का संकेत देता है; यह पूरी फ़ाइल की पुष्टि, सामग्री का प्रमाण या मैलवेयर जाँच नहीं है। अज्ञात का अर्थ किसी समर्थित हस्ताक्षर से मेल न मिलना है।",
    container: "केवल कंटेनर पहचाना जाता है: ZIP से DOCX, XLSX या किसी अंदरूनी प्रारूप की पुष्टि नहीं होती। OLE किसी विशेष Office दस्तावेज़ को प्रमाणित नहीं करता। अंदर की सामग्री नहीं जाँची जाती।",
    empty: "हेडर को अप्रमाणित फ़ाइल नाम और ब्राउज़र जानकारी से तुलना करने के लिए फ़ाइल चुनें।", loading: "फ़ाइल हेडर पढ़ा जा रहा है…", invalid: "पढ़ने योग्य स्थानीय फ़ाइल चुनें।", readError: "हेडर पढ़ा नहीं जा सका। फ़ाइल दोबारा चुनें।", clear: "फ़ाइल हटाएँ", matched: "हेडर हस्ताक्षर मिला", unknown: "अज्ञात या असमर्थित हेडर: कोई हस्ताक्षर नहीं मिला",
    metadata: "अप्रमाणित फ़ाइल जानकारी", fileName: "फ़ाइल नाम", fileSize: "फ़ाइल आकार (बाइट)", browserMime: "ब्राउज़र द्वारा बताया MIME", extension: "फ़ाइल नाम का एक्सटेंशन", signatureMime: "हस्ताक्षर से सुझाया MIME", extensions: "सामान्य एक्सटेंशन", read: "पढ़े गए बाइट", hex: "हेडर पूर्वावलोकन (अधिकतम 64 बाइट, हेक्साडेसिमल)", none: "उपलब्ध नहीं", copy: "JSON रिपोर्ट कॉपी करें",
  },
  id: {
    drop: "Pilih atau letakkan file lokal apa pun", local: "Hanya 65.536 byte pertama yang dibaca pada perangkat ini. File tidak diunggah atau disimpan.",
    rule: "Tanda tangan header menunjukkan dugaan format; bukan validasi file, bukti isi, atau pemindaian malware. Tidak dikenal berarti tidak ada tanda tangan yang didukung cocok.",
    container: "Hanya kontainer yang dikenali: ZIP tidak memastikan DOCX, XLSX, atau format di dalamnya. OLE tidak memastikan jenis dokumen Office tertentu. Isi kontainer tidak diperiksa.",
    empty: "Pilih file untuk membandingkan header dengan nama dan metadata browser yang belum diverifikasi.", loading: "Membaca header file…", invalid: "Pilih file lokal yang dapat dibaca.", readError: "Header tidak dapat dibaca. Pilih kembali file tersebut.", clear: "Hapus file", matched: "Tanda tangan header cocok", unknown: "Header tidak dikenal atau tidak didukung: tidak ada yang cocok",
    metadata: "Metadata file belum diverifikasi", fileName: "Nama file", fileSize: "Ukuran file (byte)", browserMime: "MIME dari browser", extension: "Ekstensi nama file", signatureMime: "MIME yang disarankan tanda tangan", extensions: "Ekstensi umum", read: "Byte dibaca", hex: "Pratinjau header (hingga 64 byte, heksadesimal)", none: "Tidak tersedia", copy: "Salin laporan JSON",
  },
  vi: {
    drop: "Chọn hoặc thả tệp cục bộ bất kỳ", local: "Chỉ đọc 65.536 byte đầu tiên trên thiết bị này. Tệp không được tải lên hay lưu lại.",
    rule: "Chữ ký đầu tệp chỉ gợi ý định dạng; không xác thực toàn bộ tệp, chứng minh nội dung hay quét mã độc. Không rõ nghĩa là không khớp chữ ký được hỗ trợ.",
    container: "Chỉ nhận diện bộ chứa: ZIP không xác nhận DOCX, XLSX hay định dạng bên trong. OLE không xác nhận loại tài liệu Office cụ thể. Không kiểm tra nội dung bộ chứa.",
    empty: "Chọn tệp để so sánh phần đầu với tên và thông tin trình duyệt chưa được xác minh.", loading: "Đang đọc phần đầu tệp…", invalid: "Hãy chọn tệp cục bộ có thể đọc được.", readError: "Không đọc được phần đầu tệp. Hãy chọn lại tệp.", clear: "Xóa tệp", matched: "Chữ ký đầu tệp phù hợp", unknown: "Phần đầu không rõ hoặc chưa hỗ trợ: không có chữ ký phù hợp",
    metadata: "Thông tin tệp chưa xác minh", fileName: "Tên tệp", fileSize: "Kích thước tệp (byte)", browserMime: "MIME do trình duyệt báo", extension: "Phần mở rộng tên tệp", signatureMime: "MIME gợi ý từ chữ ký", extensions: "Phần mở rộng thường gặp", read: "Số byte đã đọc", hex: "Xem phần đầu (tối đa 64 byte, hệ thập lục phân)", none: "Không có thông tin", copy: "Sao chép báo cáo JSON",
  },
};

const PAGE: Record<Locale, { name: string; tagline: string; steps: string[]; questions: [string, string] }> = {
  en: { name: "File Type Detector", tagline: "Inspect a local file header to suggest its format, view its bytes and compare unverified metadata — no upload or full-file validation.", steps: ["Choose a local file of any type.", "Read the suggested format, metadata and header bytes together.", "Copy the JSON report or clear the file."], questions: ["Does the file leave my device?", "Does a match prove the file is valid or safe?"] },
  zh: { name: "文件类型识别", tagline: "在浏览器本地读取文件头，提示可能格式、查看十六进制字节并对照未验证的文件元数据；无需上传，不代表完整文件验证。", steps: ["选择任意类型的本地文件。", "对照特征格式、文件元数据和文件头字节。", "复制 JSON 报告或清除文件。"], questions: ["文件会离开我的设备吗？", "匹配成功能证明文件有效安全吗？"] },
  ja: { name: "ファイル形式判別", tagline: "ローカルファイルの先頭をブラウザーで読み、形式候補と 16 進バイトを未検証の情報と比較します。送信やファイル全体の検証はしません。", steps: ["任意のローカルファイルを選びます。", "形式候補、ファイル情報、先頭バイトを比較します。", "JSON レポートをコピーするかファイルをクリアします。"], questions: ["ファイルは端末から送信されますか？", "一致すれば安全で有効なファイルですか？"] },
  es: { name: "Detector de tipo de archivo", tagline: "Inspecciona la cabecera de un archivo local para sugerir su formato y comparar bytes y metadatos sin verificar, sin subirlo ni validar todo el archivo.", steps: ["Elige cualquier archivo local.", "Compara formato sugerido, metadatos y bytes iniciales.", "Copia el informe JSON o quita el archivo."], questions: ["¿Sale el archivo de mi dispositivo?", "¿Una coincidencia prueba que el archivo es válido o seguro?"] },
  pt: { name: "Detector de tipo de arquivo", tagline: "Inspecione o cabeçalho de um arquivo local para sugerir o formato e comparar bytes e metadados não verificados, sem enviar ou validar o arquivo inteiro.", steps: ["Escolha qualquer arquivo local.", "Compare formato sugerido, metadados e bytes iniciais.", "Copie o relatório JSON ou limpe o arquivo."], questions: ["O arquivo sai do meu dispositivo?", "Uma assinatura confirma que o arquivo é válido ou seguro?"] },
  fr: { name: "Détecteur de type de fichier", tagline: "Examinez l’en-tête d’un fichier local pour suggérer son format et comparer octets et métadonnées non vérifiées, sans envoi ni validation complète.", steps: ["Choisissez un fichier local quelconque.", "Comparez format suggéré, métadonnées et premiers octets.", "Copiez le rapport JSON ou effacez le fichier."], questions: ["Le fichier quitte-t-il mon appareil ?", "Une correspondance prouve-t-elle la validité ou la sécurité ?"] },
  de: { name: "Dateityp erkennen", tagline: "Untersuche einen lokalen Dateiheader, um Formatvorschläge und Bytes mit ungeprüften Metadaten zu vergleichen — ohne Upload oder vollständige Dateiprüfung.", steps: ["Wähle eine beliebige lokale Datei.", "Vergleiche Formatvorschlag, Metadaten und Header-Bytes.", "Kopiere den JSON-Bericht oder entferne die Datei."], questions: ["Verlässt die Datei mein Gerät?", "Beweist eine Übereinstimmung die Gültigkeit oder Sicherheit?"] },
  ru: { name: "Определение типа файла", tagline: "Проверьте заголовок локального файла, чтобы предположить формат и сравнить байты с непроверенными метаданными, без отправки или полной проверки файла.", steps: ["Выберите любой локальный файл.", "Сравните предполагаемый формат, метаданные и первые байты.", "Скопируйте отчёт JSON или очистите файл."], questions: ["Файл покидает моё устройство?", "Подтверждает ли совпадение целостность и безопасность?"] },
  it: { name: "Rilevatore del tipo di file", tagline: "Esamina l’intestazione di un file locale per suggerire il formato e confrontare byte e metadati non verificati, senza caricarlo o convalidarlo interamente.", steps: ["Scegli un file locale qualsiasi.", "Confronta formato suggerito, metadati e byte iniziali.", "Copia il rapporto JSON o rimuovi il file."], questions: ["Il file lascia il dispositivo?", "Una corrispondenza prova che il file è valido o sicuro?"] },
  tr: { name: "Dosya Türü Algılama", tagline: "Yerel dosya başlığından olası biçimi bulun, baytları doğrulanmamış bilgilerle karşılaştırın; dosya yüklenmez veya bütünüyle doğrulanmaz.", steps: ["Herhangi bir yerel dosya seçin.", "Önerilen biçimi, bilgileri ve başlık baytlarını karşılaştırın.", "JSON raporunu kopyalayın veya dosyayı temizleyin."], questions: ["Dosya cihazımdan gönderilir mi?", "Eşleşme dosyanın geçerli veya güvenli olduğunu kanıtlar mı?"] },
  ko: { name: "파일 형식 식별", tagline: "로컬 파일의 헤더를 읽어 형식 후보와 16진수 바이트를 확인하고 검증되지 않은 메타데이터와 비교합니다. 업로드하거나 전체 파일을 검증하지 않습니다.", steps: ["로컬 파일을 선택하세요.", "형식 후보, 파일 정보와 헤더 바이트를 비교하세요.", "JSON 보고서를 복사하거나 파일을 지우세요."], questions: ["파일이 기기 밖으로 전송되나요?", "일치하면 파일이 유효하고 안전한가요?"] },
  ar: { name: "كاشف نوع الملف", tagline: "افحص ترويسة ملف محلي لاقتراح تنسيقه وعرض البايتات ومقارنتها ببيانات غير متحقق منها، دون رفع الملف أو التحقق من محتواه كاملاً.", steps: ["اختر أي ملف محلي.", "قارن التنسيق المقترح والبيانات وبايتات الترويسة.", "انسخ تقرير JSON أو امسح الملف."], questions: ["هل يغادر الملف جهازي؟", "هل يثبت التطابق أن الملف صالح أو آمن؟"] },
  hi: { name: "फ़ाइल प्रकार पहचान", tagline: "स्थानीय फ़ाइल के हेडर से संभावित प्रारूप जानें और बाइट की तुलना अप्रमाणित जानकारी से करें। अपलोड या पूरी फ़ाइल का सत्यापन नहीं होता।", steps: ["कोई स्थानीय फ़ाइल चुनें।", "सुझाए प्रारूप, जानकारी और हेडर बाइट की तुलना करें।", "JSON रिपोर्ट कॉपी करें या फ़ाइल हटाएँ।"], questions: ["क्या फ़ाइल मेरे डिवाइस से बाहर जाती है?", "क्या मेल मिलना फ़ाइल के सही या सुरक्षित होने का प्रमाण है?"] },
  id: { name: "Pendeteksi Jenis File", tagline: "Periksa header file lokal untuk menduga format dan membandingkan byte dengan metadata yang belum diverifikasi, tanpa unggahan atau validasi seluruh file.", steps: ["Pilih file lokal apa pun.", "Bandingkan dugaan format, metadata, dan byte header.", "Salin laporan JSON atau hapus file."], questions: ["Apakah file meninggalkan perangkat saya?", "Apakah kecocokan membuktikan file valid atau aman?"] },
  vi: { name: "Nhận diện loại tệp", tagline: "Đọc phần đầu tệp cục bộ để gợi ý định dạng, xem byte và so sánh thông tin chưa xác minh, không tải lên hay xác thực toàn bộ tệp.", steps: ["Chọn tệp cục bộ bất kỳ.", "So sánh định dạng gợi ý, thông tin và byte đầu tệp.", "Sao chép báo cáo JSON hoặc xóa tệp."], questions: ["Tệp có rời khỏi thiết bị không?", "Khớp chữ ký có chứng minh tệp hợp lệ hay an toàn không?"] },
};

export const FILE_SIGNATURE_COPY = Object.fromEntries(Object.entries(PAGE).map(([locale, page]) => {
  const text = FILE_SIGNATURE_MESSAGES[locale as Locale];
  return [locale, { name: page.name, tagline: page.tagline, intro: [text.local, text.rule, text.container], steps: page.steps,
    faqs: [{ q: page.questions[0], a: text.local }, { q: page.questions[1], a: `${text.rule} ${text.container}` }],
    deepDive: fileTypeDeepDive(locale as Locale),
  } satisfies ToolCopy];
})) as Record<Locale, ToolCopy>;
