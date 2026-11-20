import type { Locale } from "@/lib/site";
import type { ToolCopy } from "./types";

type Text = {
  error: string; limits: string; range: string; type: string;
  expired: string; active: string; note: string; missing: string;
  steps: [string, string, string]; questions: [string, string];
};

const COPY: Record<Locale, Text> = {
  en: {
    error: "Cannot decode. Use two or three dot-separated Base64URL parts. Header and payload must be UTF-8 JSON objects with unique top-level keys. Check the limits below.",
    limits: "Limits: 1,000,000 UTF-16 input units; per JSON block: depth 200, 100,000 values, 4,000,000 UTF-16 output units. Encrypted five-part JWE is not supported.",
    range: "Cannot display this timestamp accurately: outside supported numeric precision or date limits.", type: "NumericDate must be a JSON number in seconds.",
    expired: "expired (at decoding)", active: "not expired (at decoding)",
    note: "Decoded locally. Signature, issuer, audience and token validity are not verified. Time labels use the device clock at decoding and do not update live. JSON number spelling is preserved.",
    missing: "Signature not supplied; no verification performed.",
    steps: ["Paste a test token with two or three parts.", "Inspect the JSON and any timestamp notices.", "Copy the payload if needed; verify trust separately in your application."],
    questions: ["Does decoding verify a token?", "What input and limits apply?"],
  },
  zh: {
    error: "无法解码。请使用两到三个以点分隔的 Base64URL 部分。头部与负载须为 UTF-8 JSON 对象，顶层键不得重复；也请检查下方限额。",
    limits: "限额：输入 1,000,000 个 UTF-16 代码单元；每块 JSON 深度 200、值数量 100,000、输出 4,000,000 个 UTF-16 代码单元。不支持五段式加密 JWE。",
    range: "无法精确显示此时间戳：超出数值精度或日期支持范围。", type: "NumericDate 必须是以秒为单位的 JSON 数字。",
    expired: "已过期（解码时）", active: "未过期（解码时）",
    note: "在本地解码，不验证签名、签发方、受众或令牌有效性。时间标签使用解码时的设备时钟，不实时更新；JSON 数字保留原始写法。",
    missing: "未提供签名；未进行验证。",
    steps: ["粘贴两到三段的测试令牌。", "查看 JSON 和时间戳提示。", "按需复制负载；在应用中另行验证可信性。"],
    questions: ["解码会验证令牌吗？", "支持什么输入，有哪些限额？"],
  },
  ja: {
    error: "デコードできません。ドット区切りの Base64URL を2〜3部分使用してください。ヘッダーとペイロードは UTF-8 JSON オブジェクトで、最上位キーは一意である必要があります。下記の制限も確認してください。",
    limits: "制限：入力 1,000,000 UTF-16 コード単位。JSON ごとに深さ 200、値 100,000、出力 4,000,000 UTF-16 コード単位。5部分の暗号化 JWE は非対応です。",
    range: "数値精度または日付の対応範囲外のため、この時刻は正確に表示できません。", type: "NumericDate は秒単位の JSON 数値である必要があります。",
    expired: "期限切れ（デコード時）", active: "未失効（デコード時）",
    note: "ローカルでデコードします。署名、発行者、対象者、トークンの有効性は検証しません。時刻ラベルはデコード時の端末時計を使い、リアルタイム更新しません。JSON 数値の表記は保持します。",
    missing: "署名がありません。検証は行っていません。",
    steps: ["2〜3部分のテストトークンを貼り付けます。", "JSON と時刻の注意書きを確認します。", "必要ならペイロードをコピーし、信頼性はアプリ側で別途検証します。"],
    questions: ["デコードでトークンは検証されますか？", "入力形式と制限は？"],
  },
  es: {
    error: "No se puede decodificar. Usa dos o tres partes Base64URL separadas por puntos. Header y payload deben ser objetos JSON UTF-8 con claves superiores únicas. Revisa los límites.",
    limits: "Límites: 1,000,000 unidades UTF-16 de entrada; por bloque JSON: profundidad 200, 100,000 valores y 4,000,000 unidades UTF-16 de salida. No admite JWE cifrado de cinco partes.",
    range: "No se puede mostrar con precisión: fuera de la precisión numérica o del rango de fechas admitido.", type: "NumericDate debe ser un número JSON en segundos.",
    expired: "caducado (al decodificar)", active: "sin caducar (al decodificar)",
    note: "Decodifica localmente. No verifica firma, emisor, audiencia ni validez del token. Las fechas usan el reloj del dispositivo al decodificar, sin actualización en vivo. Conserva la escritura de los números JSON.",
    missing: "No se proporcionó firma; no se ha verificado.",
    steps: ["Pega un token de prueba con dos o tres partes.", "Revisa el JSON y los avisos de fecha.", "Copia el payload si lo necesitas; verifica la confianza por separado en tu aplicación."],
    questions: ["¿Decodificar verifica el token?", "¿Qué entradas y límites se aplican?"],
  },
  pt: {
    error: "Não foi possível decodificar. Use duas ou três partes Base64URL separadas por pontos. Header e payload devem ser objetos JSON UTF-8 com chaves únicas no nível superior. Confira os limites.",
    limits: "Limites: 1,000,000 unidades UTF-16 de entrada; por bloco JSON: profundidade 200, 100,000 valores e 4,000,000 unidades UTF-16 de saída. JWE cifrado de cinco partes não é aceito.",
    range: "Não é possível mostrar com precisão: fora da precisão numérica ou do intervalo de datas aceito.", type: "NumericDate deve ser um número JSON em segundos.",
    expired: "expirado (ao decodificar)", active: "não expirado (ao decodificar)",
    note: "Decodifica localmente. Não verifica assinatura, emissor, público nem validade do token. As datas usam o relógio do dispositivo ao decodificar, sem atualização contínua. A escrita dos números JSON é preservada.",
    missing: "Assinatura não fornecida; nenhuma verificação realizada.",
    steps: ["Cole um token de teste com duas ou três partes.", "Confira o JSON e os avisos de data.", "Copie o payload se precisar; verifique a confiança separadamente na aplicação."],
    questions: ["Decodificar verifica o token?", "Quais entradas e limites se aplicam?"],
  },
  fr: {
    error: "Décodage impossible. Utilisez deux ou trois parties Base64URL séparées par des points. Header et payload doivent être des objets JSON UTF-8 aux clés de premier niveau uniques. Vérifiez les limites.",
    limits: "Limites : 1,000,000 unités UTF-16 en entrée ; par bloc JSON : profondeur 200, 100,000 valeurs, 4,000,000 unités UTF-16 en sortie. JWE chiffré à cinq parties non pris en charge.",
    range: "Affichage précis impossible : hors de la précision numérique ou des dates prises en charge.", type: "NumericDate doit être un nombre JSON en secondes.",
    expired: "expiré (au décodage)", active: "non expiré (au décodage)",
    note: "Décodage local. La signature, l’émetteur, le public et la validité ne sont pas vérifiés. Les dates utilisent l’horloge de l’appareil au décodage, sans mise à jour en direct. L’écriture des nombres JSON est conservée.",
    missing: "Signature absente ; aucune vérification effectuée.",
    steps: ["Collez un jeton de test en deux ou trois parties.", "Examinez le JSON et les avertissements de date.", "Copiez le payload si nécessaire ; vérifiez la confiance séparément dans votre application."],
    questions: ["Le décodage vérifie-t-il le jeton ?", "Quels formats et limites s’appliquent ?"],
  },
  de: {
    error: "Dekodierung nicht möglich. Verwenden Sie zwei oder drei punktgetrennte Base64URL-Teile. Header und Payload müssen UTF-8-JSON-Objekte mit eindeutigen Schlüsseln auf oberster Ebene sein. Beachten Sie die Grenzen.",
    limits: "Grenzen: 1,000,000 UTF-16-Einheiten Eingabe; je JSON-Block: Tiefe 200, 100,000 Werte, 4,000,000 UTF-16-Einheiten Ausgabe. Fünfteiliges verschlüsseltes JWE wird nicht unterstützt.",
    range: "Zeitstempel nicht genau darstellbar: außerhalb der Zahlengenauigkeit oder Datumsgrenzen.", type: "NumericDate muss eine JSON-Zahl in Sekunden sein.",
    expired: "abgelaufen (beim Dekodieren)", active: "nicht abgelaufen (beim Dekodieren)",
    note: "Lokale Dekodierung. Signatur, Aussteller, Zielgruppe und Token-Gültigkeit werden nicht geprüft. Zeitangaben nutzen die Geräteuhr beim Dekodieren und werden nicht laufend aktualisiert. Die JSON-Zahlenschreibweise bleibt erhalten.",
    missing: "Keine Signatur angegeben; keine Prüfung durchgeführt.",
    steps: ["Fügen Sie ein Test-Token mit zwei oder drei Teilen ein.", "Prüfen Sie JSON und Zeitstempelhinweise.", "Kopieren Sie bei Bedarf die Payload; prüfen Sie das Vertrauen separat in Ihrer Anwendung."],
    questions: ["Prüft die Dekodierung das Token?", "Welche Eingaben und Grenzen gelten?"],
  },
  ru: {
    error: "Не удалось декодировать. Нужны две или три части Base64URL, разделённые точками. Header и payload должны быть объектами JSON UTF-8 с уникальными ключами верхнего уровня. Проверьте ограничения.",
    limits: "Ограничения: ввод 1,000,000 единиц UTF-16; на блок JSON: глубина 200, 100,000 значений, вывод 4,000,000 единиц UTF-16. Зашифрованный JWE из пяти частей не поддерживается.",
    range: "Нельзя точно показать время: превышена точность чисел или диапазон дат.", type: "NumericDate должен быть числом JSON в секундах.",
    expired: "истёк (при декодировании)", active: "не истёк (при декодировании)",
    note: "Локальное декодирование. Подпись, издатель, аудитория и действительность токена не проверяются. Время берётся с часов устройства при декодировании и не обновляется постоянно. Запись чисел JSON сохраняется.",
    missing: "Подпись не указана; проверка не выполнялась.",
    steps: ["Вставьте тестовый токен из двух или трёх частей.", "Изучите JSON и пояснения ко времени.", "При необходимости скопируйте payload; доверие проверяйте отдельно в приложении."],
    questions: ["Проверяет ли декодирование токен?", "Какие форматы и ограничения действуют?"],
  },
  it: {
    error: "Impossibile decodificare. Usa due o tre parti Base64URL separate da punti. Header e payload devono essere oggetti JSON UTF-8 con chiavi uniche al primo livello. Controlla i limiti.",
    limits: "Limiti: 1,000,000 unità UTF-16 in ingresso; per blocco JSON: profondità 200, 100,000 valori, 4,000,000 unità UTF-16 in uscita. JWE cifrato a cinque parti non supportato.",
    range: "Impossibile mostrare con precisione: oltre la precisione numerica o i limiti delle date.", type: "NumericDate deve essere un numero JSON in secondi.",
    expired: "scaduto (alla decodifica)", active: "non scaduto (alla decodifica)",
    note: "Decodifica locale. Firma, emittente, destinatari e validità del token non sono verificati. Le date usano l’orologio del dispositivo alla decodifica e non si aggiornano in tempo reale. La scrittura dei numeri JSON è conservata.",
    missing: "Firma non fornita; nessuna verifica eseguita.",
    steps: ["Incolla un token di prova di due o tre parti.", "Esamina JSON e avvisi sulle date.", "Copia il payload se necessario; verifica separatamente l’attendibilità nell’applicazione."],
    questions: ["La decodifica verifica il token?", "Quali formati e limiti si applicano?"],
  },
  tr: {
    error: "Çözümlenemedi. Noktayla ayrılmış iki veya üç Base64URL bölümü kullanın. Header ve payload, üst düzey anahtarları benzersiz UTF-8 JSON nesneleri olmalıdır. Sınırları kontrol edin.",
    limits: "Sınırlar: giriş 1,000,000 UTF-16 birimi; JSON bloğu başına derinlik 200, 100,000 değer, çıkış 4,000,000 UTF-16 birimi. Beş bölümlü şifreli JWE desteklenmez.",
    range: "Zaman doğru gösterilemiyor: sayı hassasiyeti veya desteklenen tarih sınırları dışında.", type: "NumericDate saniye cinsinden bir JSON sayısı olmalıdır.",
    expired: "süresi dolmuş (çözümleme anında)", active: "süresi dolmamış (çözümleme anında)",
    note: "Yerel olarak çözümlenir. İmza, düzenleyen, hedef kitle ve belirteç geçerliliği doğrulanmaz. Tarihler çözümleme anındaki cihaz saatini kullanır, canlı güncellenmez. JSON sayı yazımı korunur.",
    missing: "İmza verilmedi; doğrulama yapılmadı.",
    steps: ["İki veya üç bölümlü bir test belirteci yapıştırın.", "JSON ve zaman bildirimlerini inceleyin.", "Gerekirse payload verisini kopyalayın; güveni uygulamanızda ayrıca doğrulayın."],
    questions: ["Çözümleme belirteci doğrular mı?", "Hangi girişler ve sınırlar geçerli?"],
  },
  ko: {
    error: "디코딩할 수 없습니다. 점으로 구분한 Base64URL 2~3개 부분을 사용하세요. 헤더와 페이로드는 최상위 키가 중복되지 않는 UTF-8 JSON 객체여야 합니다. 아래 한도도 확인하세요.",
    limits: "한도: 입력 1,000,000 UTF-16 코드 단위. JSON 블록마다 깊이 200, 값 100,000개, 출력 4,000,000 UTF-16 코드 단위. 5부분 암호화 JWE는 지원하지 않습니다.",
    range: "숫자 정밀도 또는 지원 날짜 범위를 벗어나 시간을 정확히 표시할 수 없습니다.", type: "NumericDate는 초 단위 JSON 숫자여야 합니다.",
    expired: "만료됨(디코딩 시점)", active: "만료되지 않음(디코딩 시점)",
    note: "로컬에서 디코딩합니다. 서명, 발급자, 대상 및 토큰 유효성은 검증하지 않습니다. 시간은 디코딩 시점의 기기 시계를 사용하며 실시간으로 갱신되지 않습니다. JSON 숫자 표기를 보존합니다.",
    missing: "서명이 제공되지 않았으며 검증하지 않았습니다.",
    steps: ["2~3부분으로 된 테스트 토큰을 붙여 넣으세요.", "JSON과 시간 안내를 확인하세요.", "필요하면 페이로드를 복사하고, 신뢰성은 앱에서 별도로 검증하세요."],
    questions: ["디코딩하면 토큰이 검증되나요?", "지원하는 입력과 한도는 무엇인가요?"],
  },
  ar: {
    error: "تعذر فك الترميز. استخدم جزأين أو ثلاثة من Base64URL مفصولة بنقاط. يجب أن تكون الترويسة والحمولة كائني JSON بترميز UTF-8 مع مفاتيح فريدة في المستوى الأعلى. راجع الحدود أدناه.",
    limits: "الحدود: إدخال 1,000,000 وحدة UTF-16؛ لكل كتلة JSON: عمق 200 و100,000 قيمة وإخراج 4,000,000 وحدة UTF-16. لا يدعم JWE المشفر ذي الأجزاء الخمسة.",
    range: "تعذر عرض الوقت بدقة: خارج دقة الأرقام أو حدود التاريخ المدعومة.", type: "يجب أن يكون NumericDate رقم JSON بالثواني.",
    expired: "منتهي الصلاحية (عند فك الترميز)", active: "غير منتهي الصلاحية (عند فك الترميز)",
    note: "يفك الترميز محليًا. لا يتحقق من التوقيع أو جهة الإصدار أو الجمهور أو صلاحية الرمز. تستخدم الأوقات ساعة الجهاز عند فك الترميز ولا تتحدث مباشرة. يحافظ على كتابة أرقام JSON.",
    missing: "لم يقدم توقيع؛ لم يجر أي تحقق.",
    steps: ["ألصق رمز اختبار من جزأين أو ثلاثة.", "افحص JSON وملاحظات الوقت.", "انسخ الحمولة عند الحاجة وتحقق من الثقة بشكل منفصل في تطبيقك."],
    questions: ["هل فك الترميز يتحقق من الرمز؟", "ما المدخلات والحدود المدعومة؟"],
  },
  hi: {
    error: "डिकोड नहीं हो सका। बिंदुओं से अलग दो या तीन Base64URL भाग दें। Header और payload UTF-8 JSON ऑब्जेक्ट हों और ऊपरी स्तर की कुंजियाँ अद्वितीय हों। नीचे की सीमाएँ भी देखें।",
    limits: "सीमाएँ: इनपुट 1,000,000 UTF-16 इकाइयाँ; हर JSON ब्लॉक: गहराई 200, मान 100,000, आउटपुट 4,000,000 UTF-16 इकाइयाँ। पाँच भाग वाला एन्क्रिप्टेड JWE समर्थित नहीं है।",
    range: "समय सटीक नहीं दिखा सकते: संख्या की सटीकता या समर्थित दिनांक सीमा से बाहर है।", type: "NumericDate सेकंड में JSON संख्या होनी चाहिए।",
    expired: "समाप्त (डिकोड के समय)", active: "समाप्त नहीं (डिकोड के समय)",
    note: "स्थानीय रूप से डिकोड करता है। हस्ताक्षर, जारीकर्ता, दर्शक या टोकन की वैधता की जाँच नहीं होती। समय डिकोड के समय की डिवाइस घड़ी पर आधारित है, लगातार अपडेट नहीं होता। JSON संख्याओं की मूल लिखावट बनी रहती है।",
    missing: "हस्ताक्षर नहीं दिया गया; कोई सत्यापन नहीं हुआ।",
    steps: ["दो या तीन भाग वाला परीक्षण टोकन पेस्ट करें।", "JSON और समय की सूचनाएँ देखें।", "ज़रूरत पर payload कॉपी करें; ऐप में भरोसे की अलग जाँच करें।"],
    questions: ["क्या डिकोडिंग टोकन को सत्यापित करती है?", "कौन से इनपुट और सीमाएँ लागू हैं?"],
  },
  id: {
    error: "Tidak dapat mendekode. Gunakan dua atau tiga bagian Base64URL yang dipisahkan titik. Header dan payload harus berupa objek JSON UTF-8 dengan kunci tingkat atas yang unik. Periksa batas di bawah.",
    limits: "Batas: masukan 1,000,000 unit UTF-16; per blok JSON: kedalaman 200, 100,000 nilai, keluaran 4,000,000 unit UTF-16. JWE terenkripsi lima bagian tidak didukung.",
    range: "Waktu tidak dapat ditampilkan akurat: di luar presisi angka atau batas tanggal yang didukung.", type: "NumericDate harus berupa angka JSON dalam detik.",
    expired: "kedaluwarsa (saat didekode)", active: "belum kedaluwarsa (saat didekode)",
    note: "Didekode secara lokal. Tanda tangan, penerbit, audiens, dan keabsahan token tidak diverifikasi. Waktu memakai jam perangkat saat didekode dan tidak diperbarui langsung. Penulisan angka JSON dipertahankan.",
    missing: "Tanda tangan tidak disertakan; tidak ada verifikasi.",
    steps: ["Tempel token uji dengan dua atau tiga bagian.", "Periksa JSON dan pemberitahuan waktu.", "Salin payload bila perlu; verifikasi kepercayaan secara terpisah di aplikasi Anda."],
    questions: ["Apakah dekode memverifikasi token?", "Apa masukan dan batas yang berlaku?"],
  },
  vi: {
    error: "Không thể giải mã. Dùng hai hoặc ba phần Base64URL cách nhau bằng dấu chấm. Header và payload phải là đối tượng JSON UTF-8 có khóa cấp cao nhất không trùng. Kiểm tra giới hạn bên dưới.",
    limits: "Giới hạn: đầu vào 1,000,000 đơn vị UTF-16; mỗi khối JSON: độ sâu 200, 100,000 giá trị, đầu ra 4,000,000 đơn vị UTF-16. Không hỗ trợ JWE mã hóa năm phần.",
    range: "Không thể hiển thị chính xác: vượt độ chính xác số hoặc giới hạn ngày được hỗ trợ.", type: "NumericDate phải là số JSON tính bằng giây.",
    expired: "đã hết hạn (lúc giải mã)", active: "chưa hết hạn (lúc giải mã)",
    note: "Giải mã cục bộ. Không xác minh chữ ký, bên phát hành, đối tượng hay tính hợp lệ của token. Thời gian dùng đồng hồ thiết bị lúc giải mã, không cập nhật trực tiếp. Giữ nguyên cách viết số JSON.",
    missing: "Không có chữ ký; chưa thực hiện xác minh.",
    steps: ["Dán token thử nghiệm gồm hai hoặc ba phần.", "Kiểm tra JSON và thông báo thời gian.", "Sao chép payload nếu cần; xác minh độ tin cậy riêng trong ứng dụng."],
    questions: ["Giải mã có xác minh token không?", "Hỗ trợ đầu vào và giới hạn nào?"],
  },
};

export const jwtCopy = (locale: Locale): Text => COPY[locale];

export function jwtCapabilityCopy(locale: Locale, base: ToolCopy): ToolCopy {
  const copy = jwtCopy(locale);
  return { ...base, intro: [copy.note, copy.limits], steps: copy.steps,
    faqs: [{ q: copy.questions[0], a: copy.note }, { q: copy.questions[1], a: `${copy.error} ${copy.limits}` }], deepDive: undefined };
}
