import type { Locale } from "@/lib/site";
import type { ToolCopy } from "./types";

type CompressionCopy = { scope: string; limits: string; steps: [string, string, string]; formatsQuestion: string; limitsQuestion: string };
const COPY: Record<Locale, CompressionCopy> = {
  en: {
    scope: "Process browser-decodable images locally and choose JPG, PNG or WebP output where the browser encoder supports it. Output choices do not guarantee input support: HEIC and camera RAW decoding are not guaranteed, and animation is not preserved. Files are not uploaded.",
    limits: "Format and quality are shared across the batch, not individual settings per file. PNG ignores the quality slider. Re-encoding can produce a larger file: compare the byte counts before downloading. Capacity depends on device memory and browser canvas limits; large files can fail. Unsupported output encoding falls back to JPG with a notice.",
    steps: ["Choose a small batch of images that your browser can decode.", "Set the shared output format and, for JPG or WebP, quality.", "Review each size and error, then download the results you want to keep."],
    formatsQuestion: "Which input and output formats are actually supported?", limitsQuestion: "Does every file get smaller, and is the batch unlimited?",
  },
  zh: {
    scope: "在本地处理浏览器能解码的图片，并按编码器支持情况选择 JPG、PNG 或 WebP 输出。输出选项不等于输入支持承诺：不保证解码 HEIC 或相机 RAW，也不保留动画。文件不会上传。",
    limits: "同一批图片共用格式和画质，不能逐张单独设置；PNG 不使用画质滑块。重新编码可能让文件更大，下载前请比较字节数。容量取决于设备内存和浏览器画布限制，大文件可能失败；不支持的输出编码会提示并回退为 JPG。",
    steps: ["选择浏览器能够解码的一小批图片。", "设置共用输出格式，并为 JPG 或 WebP 调整画质。", "逐项检查体积和错误，再下载需要保留的结果。"],
    formatsQuestion: "实际支持哪些输入和输出格式？", limitsQuestion: "每张图片一定变小吗？批量是否无限制？",
  },
  ja: {
    scope: "ブラウザが読み込める画像を端末内で処理し、エンコーダーが対応する JPG、PNG、WebP を出力します。出力形式が入力対応を保証するわけではなく、HEIC やカメラ RAW の読み込みは保証されません。アニメーションは保持せず、ファイルは送信しません。",
    limits: "形式と品質はバッチ全体で共通です。個別設定はなく、PNG には品質スライダーが適用されません。再エンコード後に大きくなる場合もあるため、保存前にバイト数を確認してください。上限は端末のメモリとキャンバス制限に依存し、大きな画像は失敗することがあります。非対応の出力は通知して JPG に切り替えます。",
    steps: ["ブラウザが読み込める少量の画像を選びます。", "共通の出力形式と JPG・WebP の品質を設定します。", "各サイズとエラーを確認し、必要な結果を保存します。"],
    formatsQuestion: "実際に対応する入力・出力形式は？", limitsQuestion: "必ず小さくなりますか？枚数は無制限ですか？",
  },
  es: {
    scope: "Procesa localmente imágenes que el navegador pueda decodificar y elige salida JPG, PNG o WebP si el codificador la admite. La salida no garantiza compatibilidad de entrada: HEIC y RAW de cámara no están garantizados. No se conserva la animación ni se suben los archivos.",
    limits: "El formato y la calidad se comparten en todo el lote, sin ajustes por archivo. PNG ignora la calidad. La salida puede ser mayor: compara los bytes antes de descargar. La capacidad depende de la memoria y del lienzo del navegador; los archivos grandes pueden fallar. Una salida no compatible vuelve a JPG con aviso.",
    steps: ["Elige un lote pequeño que tu navegador pueda decodificar.", "Configura el formato común y la calidad para JPG o WebP.", "Revisa tamaños y errores antes de descargar los resultados."],
    formatsQuestion: "¿Qué formatos de entrada y salida se admiten?", limitsQuestion: "¿Todos los archivos se reducen y el lote es ilimitado?",
  },
  pt: {
    scope: "Processe localmente imagens que o navegador decodifica e escolha JPG, PNG ou WebP quando o codificador permitir. As opções de saída não garantem a entrada: HEIC e RAW de câmera não são garantidos. A animação não é preservada e os arquivos não são enviados.",
    limits: "Formato e qualidade são compartilhados pelo lote, sem ajuste individual. PNG ignora a qualidade. A saída pode ficar maior: compare os bytes antes de baixar. A capacidade depende da memória e dos limites de canvas; arquivos grandes podem falhar. Saída não suportada retorna a JPG com aviso.",
    steps: ["Escolha um pequeno lote que o navegador consiga decodificar.", "Ajuste o formato comum e a qualidade de JPG ou WebP.", "Confira tamanhos e erros e baixe os resultados desejados."],
    formatsQuestion: "Quais formatos de entrada e saída são aceitos?", limitsQuestion: "Todo arquivo diminui e o lote é ilimitado?",
  },
  fr: {
    scope: "Traitez localement les images décodables par le navigateur et choisissez JPG, PNG ou WebP si l’encodeur le permet. Les formats de sortie ne garantissent pas l’entrée : HEIC et RAW ne sont pas garantis. L’animation n’est pas conservée et les fichiers ne sont pas téléversés.",
    limits: "Format et qualité sont communs au lot, sans réglage individuel. PNG ignore la qualité. Le résultat peut être plus gros : comparez les octets avant de télécharger. La capacité dépend de la mémoire et des limites du canevas ; les gros fichiers peuvent échouer. Une sortie non prise en charge revient à JPG avec un avertissement.",
    steps: ["Choisissez un petit lot décodable par le navigateur.", "Réglez le format commun et la qualité JPG ou WebP.", "Vérifiez tailles et erreurs avant de télécharger."],
    formatsQuestion: "Quels formats d’entrée et de sortie sont pris en charge ?", limitsQuestion: "Tous les fichiers rétrécissent-ils sans limite de lot ?",
  },
  de: {
    scope: "Verarbeiten Sie lokal Bilder, die der Browser dekodieren kann. Als Ausgabe stehen je nach Encoder JPG, PNG und WebP zur Verfügung. Ausgabeformate garantieren keine Eingabeunterstützung: HEIC und Kamera-RAW sind nicht garantiert. Animationen bleiben nicht erhalten; Dateien werden nicht hochgeladen.",
    limits: "Format und Qualität gelten gemeinsam für den Stapel, ohne Einzelregler. PNG ignoriert die Qualität. Die Ausgabe kann größer werden: Vergleichen Sie die Bytes vor dem Download. Kapazität hängt von Arbeitsspeicher und Canvas-Grenzen ab; große Dateien können fehlschlagen. Nicht unterstützte Ausgabe fällt mit Hinweis auf JPG zurück.",
    steps: ["Wählen Sie einen kleinen, vom Browser lesbaren Stapel.", "Stellen Sie gemeinsames Format und JPG-/WebP-Qualität ein.", "Prüfen Sie Größen und Fehler vor dem Herunterladen."],
    formatsQuestion: "Welche Ein- und Ausgabeformate werden unterstützt?", limitsQuestion: "Werden alle Dateien kleiner und sind Stapel unbegrenzt?",
  },
  ru: {
    scope: "Обрабатывайте локально изображения, которые декодирует браузер, и выбирайте JPG, PNG или WebP при поддержке кодировщика. Форматы вывода не гарантируют поддержку ввода: HEIC и RAW камер не гарантированы. Анимация не сохраняется, файлы не отправляются.",
    limits: "Формат и качество общие для всей группы, без отдельных настроек. PNG не использует качество. Результат может стать больше: сравните байты перед скачиванием. Объём зависит от памяти и ограничений canvas; большие файлы могут вызвать ошибку. Неподдерживаемый вывод заменяется JPG с уведомлением.",
    steps: ["Выберите небольшую группу изображений, читаемых браузером.", "Задайте общий формат и качество JPG или WebP.", "Проверьте размеры и ошибки, затем скачайте нужные результаты."],
    formatsQuestion: "Какие входные и выходные форматы поддерживаются?", limitsQuestion: "Все ли файлы уменьшаются и есть ли предел группы?",
  },
  it: {
    scope: "Elabora localmente le immagini decodificabili dal browser e scegli JPG, PNG o WebP se supportati dal codificatore. I formati di uscita non garantiscono quelli di ingresso: HEIC e RAW non sono garantiti. Le animazioni non sono conservate e i file non vengono caricati.",
    limits: "Formato e qualità sono comuni al gruppo, senza regolazioni individuali. PNG ignora la qualità. Il risultato può essere più grande: confronta i byte prima di scaricarlo. La capacità dipende dalla memoria e dai limiti canvas; file grandi possono fallire. Un’uscita non supportata torna a JPG con avviso.",
    steps: ["Scegli un piccolo gruppo di immagini leggibili dal browser.", "Imposta formato comune e qualità JPG o WebP.", "Controlla dimensioni ed errori, poi scarica i risultati utili."],
    formatsQuestion: "Quali formati di ingresso e uscita sono supportati?", limitsQuestion: "Tutti i file diventano più piccoli e il gruppo è illimitato?",
  },
  tr: {
    scope: "Tarayıcının çözebildiği görselleri yerelde işleyin; kodlayıcı destekliyorsa JPG, PNG veya WebP çıktısı seçin. Çıktı seçenekleri girdi desteği garantisi değildir: HEIC ve kamera RAW desteği garanti edilmez. Animasyon korunmaz, dosyalar yüklenmez.",
    limits: "Biçim ve kalite tüm grupta ortaktır; dosyaya özel ayar yoktur. PNG kaliteyi kullanmaz. Çıktı daha büyük olabilir; indirmeden önce baytları karşılaştırın. Kapasite bellek ve canvas sınırlarına bağlıdır; büyük dosyalar başarısız olabilir. Desteklenmeyen çıktı uyarıyla JPG olur.",
    steps: ["Tarayıcının çözebildiği küçük bir görsel grubu seçin.", "Ortak biçimi ve JPG veya WebP kalitesini ayarlayın.", "Boyutları ve hataları inceleyip istediğiniz sonuçları indirin."],
    formatsQuestion: "Hangi girdi ve çıktı biçimleri desteklenir?", limitsQuestion: "Her dosya küçülür mü, grup sınırsız mı?",
  },
  ko: {
    scope: "브라우저가 디코딩할 수 있는 이미지를 로컬에서 처리하고 인코더가 지원하는 JPG, PNG, WebP로 출력합니다. 출력 형식은 입력 지원 보장이 아닙니다. HEIC와 카메라 RAW는 보장하지 않으며 애니메이션을 보존하지 않습니다. 파일을 업로드하지 않습니다.",
    limits: "형식과 화질은 전체 묶음에 공통 적용되며 파일별 설정은 없습니다. PNG는 화질 설정을 사용하지 않습니다. 결과가 더 커질 수 있으므로 다운로드 전 바이트 크기를 확인하세요. 처리량은 메모리와 캔버스 한도에 따라 달라지며 큰 파일은 실패할 수 있습니다. 미지원 출력은 안내 후 JPG로 바뀝니다.",
    steps: ["브라우저가 읽을 수 있는 소량의 이미지를 선택하세요.", "공통 출력 형식과 JPG 또는 WebP 화질을 설정하세요.", "크기와 오류를 확인하고 필요한 결과를 다운로드하세요."],
    formatsQuestion: "실제 지원하는 입력·출력 형식은 무엇인가요?", limitsQuestion: "항상 작아지나요? 개수는 무제한인가요?",
  },
  ar: {
    scope: "عالج محليًا الصور التي يستطيع المتصفح فكها، واختر JPG أو PNG أو WebP عند دعم المرمّز. خيارات الإخراج لا تضمن دعم الإدخال؛ لا نضمن HEIC أو RAW للكاميرات، ولا تُحفظ الحركة. لا تُرفع الملفات.",
    limits: "الصيغة والجودة مشتركتان لكل الدفعة دون إعداد فردي. يتجاهل PNG الجودة. قد يكبر الناتج؛ قارن البايتات قبل التنزيل. تعتمد السعة على ذاكرة الجهاز وحدود canvas وقد تفشل الملفات الكبيرة. يعود الإخراج غير المدعوم إلى JPG مع تنبيه.",
    steps: ["اختر دفعة صغيرة يستطيع المتصفح قراءتها.", "اضبط الصيغة المشتركة وجودة JPG أو WebP.", "راجع الأحجام والأخطاء ثم نزّل النتائج المطلوبة."],
    formatsQuestion: "ما صيغ الإدخال والإخراج المدعومة فعليًا؟", limitsQuestion: "هل يصغر كل ملف وهل الدفعة غير محدودة؟",
  },
  hi: {
    scope: "ब्राउज़र द्वारा डिकोड होने वाली तस्वीरों को स्थानीय रूप से संसाधित करें और समर्थित होने पर JPG, PNG या WebP आउटपुट चुनें। आउटपुट विकल्प इनपुट समर्थन की गारंटी नहीं हैं: HEIC और कैमरा RAW की गारंटी नहीं है। एनिमेशन सुरक्षित नहीं रहता और फ़ाइलें अपलोड नहीं होतीं।",
    limits: "फ़ॉर्मैट और गुणवत्ता पूरे बैच के लिए समान हैं, अलग फ़ाइल की सेटिंग नहीं है। PNG गुणवत्ता को अनदेखा करता है। परिणाम बड़ा भी हो सकता है; डाउनलोड से पहले बाइट आकार देखें। क्षमता मेमोरी और canvas सीमाओं पर निर्भर है; बड़ी फ़ाइलें विफल हो सकती हैं। असमर्थित आउटपुट सूचना देकर JPG बनता है।",
    steps: ["ब्राउज़र द्वारा पढ़ी जा सकने वाली तस्वीरों का छोटा बैच चुनें।", "साझा फ़ॉर्मैट और JPG या WebP गुणवत्ता चुनें।", "आकार व त्रुटियाँ देखकर आवश्यक परिणाम डाउनलोड करें।"],
    formatsQuestion: "वास्तव में कौन से इनपुट और आउटपुट फ़ॉर्मैट समर्थित हैं?", limitsQuestion: "क्या हर फ़ाइल छोटी होती है और बैच असीमित है?",
  },
  id: {
    scope: "Proses gambar yang dapat didekode browser secara lokal dan pilih JPG, PNG atau WebP jika enkoder mendukungnya. Opsi keluaran bukan jaminan masukan: HEIC dan RAW kamera tidak dijamin. Animasi tidak dipertahankan dan berkas tidak diunggah.",
    limits: "Format dan kualitas berlaku bersama untuk seluruh kumpulan, tanpa pengaturan per berkas. PNG mengabaikan kualitas. Hasil dapat lebih besar; bandingkan byte sebelum mengunduh. Kapasitas bergantung pada memori dan batas canvas; berkas besar dapat gagal. Keluaran yang tidak didukung beralih ke JPG dengan pemberitahuan.",
    steps: ["Pilih sedikit gambar yang dapat dibaca browser.", "Atur format bersama dan kualitas JPG atau WebP.", "Periksa ukuran dan kesalahan, lalu unduh hasil yang diperlukan."],
    formatsQuestion: "Format masukan dan keluaran apa yang didukung?", limitsQuestion: "Apakah semua berkas mengecil dan jumlahnya tanpa batas?",
  },
  vi: {
    scope: "Xử lý cục bộ ảnh mà trình duyệt giải mã được và chọn JPG, PNG hoặc WebP khi bộ mã hóa hỗ trợ. Định dạng đầu ra không bảo đảm hỗ trợ đầu vào: không bảo đảm HEIC hay RAW máy ảnh. Không giữ ảnh động và không tải tệp lên máy chủ.",
    limits: "Cả lô dùng chung định dạng và chất lượng, không chỉnh riêng từng tệp. PNG bỏ qua chất lượng. Kết quả có thể lớn hơn; hãy so số byte trước khi tải. Dung lượng phụ thuộc bộ nhớ và giới hạn canvas; tệp lớn có thể lỗi. Đầu ra không được hỗ trợ sẽ chuyển sang JPG kèm thông báo.",
    steps: ["Chọn một lô nhỏ ảnh mà trình duyệt đọc được.", "Đặt định dạng chung và chất lượng JPG hoặc WebP.", "Kiểm tra kích thước và lỗi rồi tải kết quả cần giữ."],
    formatsQuestion: "Thực tế hỗ trợ những định dạng đầu vào và đầu ra nào?", limitsQuestion: "Mọi tệp đều nhỏ hơn và số lượng không giới hạn sao?",
  },
};

/** Resolve after locale overlays so stale capability promises cannot reappear. */
export function imageCompressionCopy(locale: Locale, base: ToolCopy): ToolCopy {
  const copy = COPY[locale];
  return { ...base, intro: [copy.scope, copy.limits], steps: copy.steps,
    faqs: [{ q: copy.formatsQuestion, a: copy.scope }, { q: copy.limitsQuestion, a: copy.limits }], deepDive: undefined };
}
