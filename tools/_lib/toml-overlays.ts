/**
 * CN-022 toml-converter 扩展语言 overlay(10 语)。
 * 模式与 gbk-overlays.ts 相同。
 */

import type { ToolCopy } from "./types";

function common(
  intro: [string, string, string],
  steps: [string, string, string],
  faqs: Array<{ q: string; a: string }>,
) {
  return { intro, steps, faqs };
}

export const TOML_OVERLAYS: Record<string, ToolCopy> = {
  fr: {
    name: "Convertisseur TOML ↔ JSON",
    tagline: "Convertissez TOML en JSON et JSON en TOML instantanément — analyse conforme à TOML 1.0, tables imbriquées et arrays de tables pris en charge. Gratuit, privé, hors ligne.",
    ...common(
      [
        "TOML est le format de configuration de Cargo, pyproject.toml et bien d'autres outils modernes, mais la plupart des convertisseurs en ligne ne couvrent que JSON et YAML. Ce convertisseur gère les deux sens : TOML → JSON pour lire la config dans des outils JSON, et JSON → TOML pour écrire des fichiers de config depuis des réponses d'API ou des scripts.",
        "La conversion utilise @iarna/toml, un analyseur conforme à TOML 1.0. Tables imbriquées, arrays de tables, tables inline et dates de première classe sont gérés ; la racine TOML doit être une table, les arrays ou scalaires JSON sont refusés avec une explication claire.",
        "Tout s'exécute localement dans votre navigateur — sans envoi, sans suivi. Jusqu'à 512 000 caractères par conversion.",
      ],
      [
        "Choisissez le sens : TOML → JSON ou JSON → TOML.",
        "Collez votre configuration TOML ou votre document JSON.",
        "Cliquez sur Convertir — le résultat apparaît ci-dessous avec bouton de copie ; les erreurs d'analyse affichent la cause exacte.",
      ],
      [
        { q: "Pourquoi ne puis-je pas convertir un array JSON en TOML directement ?", a: "La spécification TOML exige que la racine du document soit une table. Enveloppez d'abord l'array sous une clé, p. ex. { \"items\": [...] }, et la conversion fonctionnera — comme dans les vrais fichiers TOML." },
        { q: "Que deviennent les dates TOML dans la sortie JSON ?", a: "TOML a des dates de première classe ; JSON non. Les dates sont sérialisées en chaînes ISO 8601 (p. ex. 1979-05-27T15:32:00.000Z). Dans le sens JSON → TOML, les chaînes ressemblant à des dates restent des chaînes — modifiez-les manuellement si besoin de dates natives." },
      ],
    ),
  },
  de: {
    name: "TOML ↔ JSON-Konverter",
    tagline: "Konvertieren Sie TOML zu JSON und JSON zu TOML sofort — TOML-1.0-konformes Parsen, verschachtelte Tabellen und Arrays von Tabellen unterstützt. Kostenlos, privat, offline.",
    ...common(
      [
        "TOML ist das Konfigurationsformat von Cargo, pyproject.toml und vielen modernen Tools, doch die meisten Online-Konverter decken nur JSON und YAML ab. Dieser Konverter verarbeitet beide Richtungen: TOML → JSON, um Konfiguration in JSON-Werkzeugen zu lesen, und JSON → TOML, um Konfigurationsdateien aus API-Antworten oder Skripten zu schreiben.",
        "Die Konvertierung verwendet @iarna/toml, einen TOML-1.0-konformen Parser. Verschachtelte Tabellen, Arrays von Tabellen, Inline-Tabellen und echte Datumsangaben werden unterstützt; die TOML-Wurzel muss eine Tabelle sein, JSON-Arrays oder Skalare werden mit klarer Erklärung abgelehnt.",
        "Alles läuft lokal in Ihrem Browser — kein Upload, kein Tracking. Bis zu 512.000 Zeichen pro Konvertierung.",
      ],
      [
        "Wählen Sie die Richtung: TOML → JSON oder JSON → TOML.",
        "Fügen Sie Ihre TOML-Konfiguration oder Ihr JSON-Dokument ein.",
        "Klicken Sie auf Konvertieren — das Ergebnis erscheint unten mit Kopierbutton; Parse-Fehler zeigen die genaue Ursache.",
      ],
      [
        { q: "Warum kann ich ein JSON-Array nicht direkt zu TOML konvertieren?", a: "Die TOML-Spezifikation verlangt, dass die Dokumentwurzel eine Tabelle ist. Umschließen Sie das Array zuerst mit einem Schlüssel, z. B. { \"items\": [...] }, dann funktioniert die Konvertierung — wie in echten TOML-Dateien." },
        { q: "Was passiert mit TOML-Datumsangaben in der JSON-Ausgabe?", a: "TOML hat echte Datumstypen, JSON nicht. Datumsangaben werden als ISO-8601-Zeichenfolgen serialisiert (z. B. 1979-05-27T15:32:00.000Z). In Richtung JSON → TOML bleiben datumsähnliche Zeichenfolgen Zeichenfolgen — bearbeiten Sie sie manuell, wenn Sie echte Datumsangaben benötigen." },
      ],
    ),
  },
  ru: {
    name: "Конвертер TOML ↔ JSON",
    tagline: "Мгновенно преобразуйте TOML в JSON и JSON в TOML — парсинг по стандарту TOML 1.0, вложенные таблицы и массивы таблиц. Бесплатно, приватно, офлайн.",
    ...common(
      [
        "TOML — формат конфигурации Cargo, pyproject.toml и многих современных инструментов, но большинство онлайн-конвертеров покрывают только JSON и YAML. Этот конвертер работает в обоих направлениях: TOML → JSON для чтения конфигурации из JSON-инструментов и JSON → TOML для записи конфигурационных файлов из ответов API или скриптов.",
        "Преобразование использует @iarna/toml — парсер, соответствующий TOML 1.0. Поддерживаются вложенные таблицы, массивы таблиц, инлайн-таблицы и полноценные даты; корень TOML должен быть таблицей — JSON-массивы и скаляры отклоняются с понятным объяснением.",
        "Всё выполняется локально в вашем браузере — без загрузок, без отслеживания. До 512 000 символов за раз.",
      ],
      [
        "Выберите направление: TOML → JSON или JSON → TOML.",
        "Вставьте конфигурацию TOML или документ JSON.",
        "Нажмите Преобразовать — результат появится ниже с кнопкой копирования; ошибки парсинга показывают точную причину.",
      ],
      [
        { q: "Почему нельзя преобразовать JSON-массив в TOML напрямую?", a: "Спецификация TOML требует, чтобы корень документа был таблицей. Сначала оберните массив под ключом, например { \"items\": [...] }, и преобразование сработает — как в настоящих TOML-файлах." },
        { q: "Что происходит с датами TOML в выводе JSON?", a: "В TOML есть полноценные типы дат, в JSON — нет. Даты сериализуются как строки ISO 8601 (например, 1979-05-27T15:32:00.000Z). В направлении JSON → TOML строки, похожие на даты, остаются строками — отредактируйте вручную, если нужны нативные даты." },
      ],
    ),
  },
  it: {
    name: "Convertitore TOML ↔ JSON",
    tagline: "Converti TOML in JSON e JSON in TOML istantaneamente — parsing conforme a TOML 1.0, tabelle annidate e array di tabelle supportati. Gratuito, privato, offline.",
    ...common(
      [
        "TOML è il formato di configurazione di Cargo, pyproject.toml e molti strumenti moderni, ma la maggior parte dei convertitori online copre solo JSON e YAML. Questo convertitore gestisce entrambe le direzioni: TOML → JSON per leggere la configurazione con strumenti JSON, e JSON → TOML per scrivere file di configurazione da risposte API o script.",
        "La conversione usa @iarna/toml, un parser conforme a TOML 1.0. Tabelle annidate, array di tabelle, tabelle inline e date di prima classe sono gestiti; la radice TOML deve essere una tabella, array o scalari JSON vengono rifiutati con una spiegazione chiara.",
        "Tutto funziona localmente nel tuo browser — senza invii, senza tracciamento. Fino a 512.000 caratteri per conversione.",
      ],
      [
        "Scegli la direzione: TOML → JSON o JSON → TOML.",
        "Incolla la tua configurazione TOML o il documento JSON.",
        "Clicca Converti — il risultato appare sotto con pulsante di copia; gli errori di analisi mostrano la causa esatta.",
      ],
      [
        { q: "Perché non posso convertire un array JSON in TOML direttamente?", a: "La specifica TOML richiede che la radice del documento sia una tabella. Avvolgi prima l'array sotto una chiave, p. es. { \"items\": [...] }, e la conversione funzionerà — come nei veri file TOML." },
        { q: "Cosa succede alle date TOML nell'output JSON?", a: "TOML ha tipi data di prima classe; JSON no. Le date vengono serializzate come stringhe ISO 8601 (p. es. 1979-05-27T15:32:00.000Z). Nella direzione JSON → TOML le stringhe che sembrano date restano stringhe — modifcale manualmente se ti servono date native." },
      ],
    ),
  },
  tr: {
    name: "TOML ↔ JSON dönüştürücü",
    tagline: "TOML'i JSON'a ve JSON'u TOML'e anında dönüştürün — TOML 1.0 uyumlu ayrıştırma, iç içe tablolar ve tablo dizileri desteklenir. Ücretsiz, özel, çevrimdışı.",
    ...common(
      [
        "TOML, Cargo, pyproject.toml ve birçok modern aracın yapılandırma biçimidir; ancak çevrimiçi dönüştürücülerin çoğu yalnızca JSON ve YAML'i kapsar. Bu dönüştürücü iki yönü de işler: JSON araçlarıyla yapılandırma okumak için TOML → JSON, API yanıtlarından veya betiklerden yapılandırma dosyası yazmak için JSON → TOML.",
        "Dönüşüm, TOML 1.0 uyumlu @iarna/toml ayrıştırıcısını kullanır. İç içe tablolar, tablo dizileri, satır içi tablolar ve birinci sınıf tarihler desteklenir; TOML kökü bir tablo olmalıdır, JSON dizileri veya skalerler net bir açıklamayla reddedilir.",
        "Her şey tarayıcınızda yerel olarak çalışır — yükleme yok, izleme yok. Dönüşüm başına 512.000 karaktere kadar.",
      ],
      [
        "Yönü seçin: TOML → JSON veya JSON → TOML.",
        "TOML yapılandırmanızı veya JSON belgenizi yapıştırın.",
        "Dönüştür'e tıklayın — sonuç aşağıda kopyalama düğmesiyle görünür; ayrıştırma hataları kesin nedeni gösterir.",
      ],
      [
        { q: "JSON dizisini doğrudan TOML'e neden dönüştüremiyorum?", a: "TOML belirtimi, belge kökünün bir tablo olmasını gerektirir. Önce diziyi bir anahtar altına sarın, örn. { \"items\": [...] }, dönüştürme çalışır — gerçek TOML dosyalarındaki yapı gibi." },
        { q: "TOML tarihleri JSON çıktısında ne olur?", a: "TOML'de birinci sınıf tarih türleri vardır; JSON'da yoktur. Tarihler ISO 8601 dizeleri olarak serileştirilir (örn. 1979-05-27T15:32:00.000Z). JSON → TOML yönünde tarih benzeri dizeler dize olarak kalır — yerel tarih gerekirse elle düzenleyin." },
      ],
    ),
  },
  ko: {
    name: "TOML ↔ JSON 변환기",
    tagline: "TOML을 JSON으로, JSON을 TOML로 즉시 변환합니다 — TOML 1.0 규격 파싱, 중첩 테이블과 테이블 배열 지원. 무료 · 프라이빗 · 오프라인 작동.",
    ...common(
      [
        "TOML은 Cargo, pyproject.toml 등 현대 도구의 설정 형식이지만 대부분의 온라인 변환기는 JSON과 YAML만 지원합니다. 이 변환기는 양방향을 처리합니다: JSON 도구 체인에서 설정을 읽으려면 TOML → JSON, API 응답이나 스크립트에서 설정 파일을 만들려면 JSON → TOML.",
        "변환 엔진은 TOML 1.0 규격의 @iarna/toml 파서입니다. 중첩 테이블, 테이블 배열, 인라인 테이블, 일급 날짜를 모두 지원하며, TOML 루트는 테이블이어야 하고 JSON 배열이나 스칼라는 명확한 설명과 함께 거부됩니다.",
        "모든 변환은 브라우저에서 수행됩니다 — 업로드도 추적도 없습니다. 1회 최대 512,000자.",
      ],
      [
        "방향을 선택하세요: TOML → JSON 또는 JSON → TOML.",
        "TOML 설정이나 JSON 문서를 붙여넣으세요.",
        "변환 버튼을 클릭하세요 — 결과가 아래에 표시되고 복사 버튼이 있습니다. 파싱 오류는 정확한 원인을 표시합니다.",
      ],
      [
        { q: "JSON 배열을 직접 TOML로 변환할 수 없는 이유는?", a: "TOML 사양은 문서 루트가 테이블이어야 함을 요구합니다. 먼저 { \"items\": [...] }처럼 키로 감싸면 변환됩니다 — 실제 TOML 파일 구조와 같습니다." },
        { q: "TOML 날짜는 JSON 출력에서 어떻게 되나요?", a: "TOML에는 일급 날짜 타입이 있지만 JSON에는 없습니다. 날짜는 ISO 8601 문자열(예: 1979-05-27T15:32:00.000Z)로 직렬화됩니다. JSON→TOML 방향에서 날짜 형태의 문자열은 문자열로 유지됩니다 — 네이티브 날짜가 필요하면 수동으로 편집하세요." },
      ],
    ),
  },
  ar: {
    name: "محول TOML ↔ JSON",
    tagline: "حوّل TOML إلى JSON وJSON إلى TOML فورًا — تحليل متوافق مع TOML 1.0، جداول متداخلة ومصفوفات جداول مدعومة. مجاني وخاص ويعمل دون اتصال.",
    ...common(
      [
        "TOML هو تنسيق إعداد Cargo وpyproject.toml والعديد من الأدوات الحديثة، لكن معظم المحولات عبر الإنترنت تغطي JSON وYAML فقط. يتعامل هذا المحول مع الاتجاهين: TOML → JSON لقراءة الإعدادات من أدوات JSON، وJSON → TOML لكتابة ملفات الإعدادات من ردود API أو السكربتات.",
        "يستخدم التحويل @iarna/toml، محللًا متوافقًا مع TOML 1.0. الجداول المتداخلة ومصفوفات الجداول والجداول المضمّنة والتواريخ من الدرجة الأولى كلها مدعومة؛ يجب أن يكون جذر TOML جدولًا، وتُرفض مصفوفات أو قيم JSON العددية برسالة واضحة.",
        "كل شيء يعمل محليًا في متصفحك — بلا رفع، بلا تتبع. حتى 512,000 حرف لكل تحويل.",
      ],
      [
        "اختر الاتجاه: TOML → JSON أو JSON → TOML.",
        "الصق إعدادات TOML أو مستند JSON.",
        "انقر على تحويل — تظهر النتيجة أدناه مع زر نسخ؛ وأخطاء التحليل تُظهر السبب بدقة.",
      ],
      [
        { q: "لماذا لا يمكنني تحويل مصفوفة JSON إلى TOML مباشرة؟", a: "تتطلب مواصفات TOML أن يكون جذر المستند جدولًا. لف المصفوفة تحت مفتاح أولًا، مثل { \"items\": [...] }، وسيعمل التحويل — كما في ملفات TOML الحقيقية." },
        { q: "ماذا يحدث لتواريخ TOML في مخرجات JSON؟", a: "TOML لديها أنواع تواريخ من الدرجة الأولى؛ وJSON لا. تُسلسل التواريخ كسلاسل ISO 8601 (مثل 1979-05-27T15:32:00.000Z). في اتجاه JSON → TOML تبقى السلاسل الشبيهة بالتواريخ سلاسل — عدّلها يدويًا إذا احتجت تواريخ أصلية." },
      ],
    ),
  },
  hi: {
    name: "TOML ↔ JSON कनवर्टर",
    tagline: "TOML को JSON और JSON को TOML में तुरंत बदलें — TOML 1.0 अनुरूप पार्सिंग, नेस्टेड टेबल और टेबल ऐरे समर्थित। मुफ़्त, निजी, ऑफ़लाइन।",
    ...common(
      [
        "TOML, Cargo, pyproject.toml और कई आधुनिक टूल्स का कॉन्फ़िगरेशन फ़ॉर्मैट है, पर ज़्यादातर ऑनलाइन कनवर्टर केवल JSON और YAML कवर करते हैं। यह कनवर्टर दोनों दिशाएँ संभालता है: JSON टूल्स में कॉन्फ़िग पढ़ने के लिए TOML → JSON, और API रिस्पॉन्स या स्क्रिप्ट से कॉन्फ़िग फ़ाइल लिखने के लिए JSON → TOML।",
        "रूपांतरण @iarna/toml, एक TOML 1.0 अनुरूप पार्सर, का उपयोग करता है। नेस्टेड टेबल, टेबल ऐरे, इनलाइन टेबल और फर्स्ट-क्लास तारीखें समर्थित हैं; TOML रूट टेबल होना चाहिए — JSON ऐरे या स्केलर स्पष्ट स्पष्टीकरण के साथ अस्वीकार किए जाते हैं।",
        "सब कुछ आपके ब्राउज़र में स्थानीय रूप से चलता है — कोई अपलोड नहीं, कोई ट्रैकिंग नहीं। प्रति रूपांतरण 512,000 वर्ण तक।",
      ],
      [
        "दिशा चुनें: TOML → JSON या JSON → TOML।",
        "अपनी TOML कॉन्फ़िग या JSON डॉक्युमेंट पेस्ट करें।",
        "कन्वर्ट पर क्लिक करें — परिणाम नीचे कॉपी बटन के साथ दिखेगा; पार्स त्रुटियाँ सटीक कारण दिखाती हैं।",
      ],
      [
        { q: "JSON ऐरे को सीधे TOML में क्यों नहीं बदल सकते?", a: "TOML स्पेसिफ़िकेशन चाहती है कि दस्तावेज़ रूट टेबल हो। पहले ऐरे को किसी की में लपेटें, जैसे { \"items\": [...] }, और रूपांतरण काम करेगा — असली TOML फ़ाइलों की संरचना जैसा।" },
        { q: "JSON आउटपुट में TOML तारीखों का क्या होता है?", a: "TOML में फर्स्ट-क्लास तारीख प्रकार हैं; JSON में नहीं। तारीखें ISO 8601 स्ट्रिंग के रूप में सीरियलाइज़ होती हैं (जैसे 1979-05-27T15:32:00.000Z)। JSON → TOML दिशा में तारीख जैसी स्ट्रिंग स्ट्रिंग ही रहती है — नेटिव तारीख चाहिए तो मैन्युअल संपादित करें।" },
      ],
    ),
  },
  id: {
    name: "Konverter TOML ↔ JSON",
    tagline: "Konversi TOML ke JSON dan JSON ke TOML secara instan — parsing sesuai TOML 1.0, tabel bersarang dan array tabel didukung. Gratis, privat, offline.",
    ...common(
      [
        "TOML adalah format konfigurasi Cargo, pyproject.toml, dan banyak alat modern, tetapi kebanyakan konverter online hanya mencakup JSON dan YAML. Konverter ini menangani kedua arah: TOML → JSON untuk membaca konfigurasi dengan alat JSON, dan JSON → TOML untuk menulis file konfigurasi dari respons API atau skrip.",
        "Konversi menggunakan @iarna/toml, parser yang sesuai TOML 1.0. Tabel bersarang, array tabel, tabel inline, dan tanggal kelas satu semuanya didukung; akar TOML harus berupa tabel, array atau skalar JSON ditolak dengan penjelasan yang jelas.",
        "Semuanya berjalan lokal di browser Anda — tanpa unggahan, tanpa pelacakan. Hingga 512.000 karakter per konversi.",
      ],
      [
        "Pilih arah: TOML → JSON atau JSON → TOML.",
        "Tempel konfigurasi TOML atau dokumen JSON Anda.",
        "Klik Konversi — hasilnya muncul di bawah dengan tombol salin; galat parsing menunjukkan penyebab pastinya.",
      ],
      [
        { q: "Mengapa array JSON tidak bisa dikonversi langsung ke TOML?", a: "Spesifikasi TOML mengharuskan akar dokumen berupa tabel. Bungkus array di bawah sebuah kunci terlebih dahulu, mis. { \"items\": [...] }, dan konversi akan berhasil — seperti struktur file TOML sungguhan." },
        { q: "Apa yang terjadi pada tanggal TOML dalam keluaran JSON?", a: "TOML memiliki tipe tanggal kelas satu; JSON tidak. Tanggal diserialisasi sebagai string ISO 8601 (mis. 1979-05-27T15:32:00.000Z). Pada arah JSON → TOML, string yang mirip tanggal tetap sebagai string — sunting manual jika butuh tanggal asli." },
      ],
    ),
  },
  vi: {
    name: "Công cụ chuyển TOML ↔ JSON",
    tagline: "Chuyển TOML sang JSON và JSON sang TOML tức thì — phân tích chuẩn TOML 1.0, hỗ trợ bảng lồng nhau và mảng bảng. Miễn phí, riêng tư, ngoại tuyến.",
    ...common(
      [
        "TOML là định dạng cấu hình của Cargo, pyproject.toml và nhiều công cụ hiện đại, nhưng hầu hết bộ chuyển trực tuyến chỉ hỗ trợ JSON và YAML. Công cụ này xử lý cả hai hướng: TOML → JSON để đọc cấu hình bằng công cụ JSON, và JSON → TOML để ghi tệp cấu hình từ phản hồi API hoặc script.",
        "Việc chuyển đổi dùng @iarna/toml, một parser tuân thủ TOML 1.0. Bảng lồng nhau, mảng bảng, bảng inline và ngày kiểu first-class đều được hỗ trợ; gốc TOML phải là bảng — mảng hoặc vô hướng JSON bị từ chối kèm giải thích rõ ràng.",
        "Mọi thứ chạy cục bộ trong trình duyệt của bạn — không tải lên, không theo dõi. Tối đa 512.000 ký tự mỗi lần chuyển.",
      ],
      [
        "Chọn hướng: TOML → JSON hoặc JSON → TOML.",
        "Dán cấu hình TOML hoặc tài liệu JSON của bạn.",
        "Nhấp Chuyển đổi — kết quả xuất hiện bên dưới với nút sao chép; lỗi phân tích hiển thị nguyên nhân chính xác.",
      ],
      [
        { q: "Tại sao không thể chuyển mảng JSON sang TOML trực tiếp?", a: "Đặc tả TOML yêu cầu gốc tài liệu phải là bảng. Bọc mảng dưới một khóa trước, ví dụ { \"items\": [...] }, và việc chuyển sẽ hoạt động — giống cấu trúc tệp TOML thực tế." },
        { q: "Ngày tháng TOML trở thành gì trong đầu ra JSON?", a: "TOML có kiểu ngày first-class; JSON thì không. Ngày được tuần tự hóa thành chuỗi ISO 8601 (ví dụ 1979-05-27T15:32:00.000Z). Ở hướng JSON → TOML, chuỗi giống ngày vẫn giữ nguyên là chuỗi — sửa thủ công nếu cần ngày gốc." },
      ],
    ),
  },
};
