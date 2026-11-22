/**
 * CN-032 json-code-generator 扩展语言 overlay(10 语)。
 */

import type { ToolCopy } from "./types";

function common(
  intro: [string, string, string],
  steps: [string, string, string],
  faqs: Array<{ q: string; a: string }>,
) {
  return { intro, steps, faqs };
}

export const JSON_CODE_OVERLAYS: Record<string, ToolCopy> = {
  fr: {
    name: "JSON vers classes Java / C# / Go",
    tagline: "Générez des définitions de classe Java, C# et Go à partir de JSON — inférence de types avec fusion de tableaux, noms PascalCase par convention de langage, objets imbriqués et support List<T>. Gratuit, instantané, hors ligne.",
    ...common(
      [
        "Écrire des POJOs, DTOs ou structs à la main à partir d'un échantillon JSON est fastidieux et sujet aux erreurs. Ce générateur parcourt le document JSON et émet des définitions de classe pour Java (classes PascalCase, champs camelCase privés, List<T>), C# (propriétés PascalCase avec get/set, List<T>) et Go (structs PascalCase avec json tags), respectant les conventions de chaque langage.",
        "Les objets imbriqués deviennent des définitions de classe séparées, et les tableaux d'objets sont fusionnés — toutes les clés des éléments sont unies en une seule classe — pour obtenir une définition propre par type. La racine JSON doit être un objet ; enveloppez les tableaux sous une clé comme { \"items\": [...] }.",
        "Tout s'exécute localement avec de la construction de chaînes pure — aucun appel réseau. Les résultats sont déterministes pour la même entrée.",
      ],
      [
        "Choisissez le langage cible : Java, C# ou Go.",
        "Saisissez le nom de la classe racine et collez votre document JSON.",
        "Cliquez sur Générer — les définitions apparaissent avec un bouton de copie ; les erreurs JSON indiquent le problème exact.",
      ],
      [
        { q: "Pourquoi les tableaux d'objets produisent-ils une seule classe ?", a: "Le générateur fusionne toutes les clés des éléments du tableau en une seule définition, car en pratique les tableaux contiennent des enregistrements homogènes. Si les éléments ont des clés optionnelles différentes, la classe fusionnée les inclut toutes — assignez null ou une valeur par défaut dans votre code." },
        { q: "Comment les types JSON sont-ils mappés ?", a: "JSON string → String/string, entier → int, décimal → double/float64, boolean → boolean/bool, null → Object/object/interface{}, objets → classe/struct imbriquée, tableaux → List<T>/[]T. L'inférence est déterministe pour la même entrée." },
      ],
    ),
  },
  de: {
    name: "JSON zu Java / C# / Go Klassen",
    tagline: "Erzeugen Sie Java-, C#- und Go-Klassendefinitionen aus JSON — Typinferenz mit Array-Fusion, PascalCase-Benennung nach Sprachkonvention, verschachtelte Objekte und List<T>-Unterstützung. Kostenlos, sofort, offline.",
    ...common(
      [
        "POJOs, DTOs oder Strukturen von Hand aus einer JSON-Stichprobe zu schreiben ist mühsam und fehleranfällig. Dieser Generator durchläuft das JSON-Dokument und erzeugt Klassendefinitionen für Java (PascalCase-Klassen, camelCase-Felder, List<T>), C# (PascalCase-Properties mit get/set, List<T>) und Go (PascalCase-Structs mit json-Tags), entsprechend der Namenskonventionen jedes Sprachraums.",
        "Verschachtelte Objekte werden zu separaten Klassendefinitionen, und Objekt-Arrays werden fusioniert — alle Schlüssel der Elemente werden in einer einzigen Klasse zusammengeführt — für eine saubere Definition pro Typ. Die JSON-Wurzel muss ein Objekt sein; Arrays unter einem Schlüssel wie { \"items\": [...] } einschließen.",
        "Alles läuft lokal mit reiner String-Verkettung — keine Netzwerkaufrufe. Die Ergebnisse sind für dieselbe Eingabe deterministisch.",
      ],
      [
        "Wählen Sie die Zielsprache: Java, C# oder Go.",
        "Geben Sie den Namen der Wurzelklasse ein und fügen Sie Ihr JSON-Dokument ein.",
        "Auf Generieren klicken — die Definitionen erscheinen mit Kopierbutton; JSON-Fehler zeigen das genaue Problem.",
      ],
      [
        { q: "Warum erzeugen Objekt-Arrays nur eine Klasse statt mehrerer?", a: "Der Generator führt alle Schlüssel aus den Array-Elementen in einer einzigen Klassendefinition zusammen, da Arrays in der Praxis homogene Datensätze enthalten. Wenn Elemente unterschiedliche optionale Schlüssel haben, enthält die zusammengeführte Klasse alle — weisen Sie in Ihrem Code null oder Standardwerte zu." },
        { q: "Wie werden JSON-Typen auf Sprache-Typen abgebildet?", a: "JSON string → String/string, Ganzzahl → int, Dezimalzahl → double/float64, boolean → boolean/bool, null → Object/object/interface{}, Objekte → verschachtelte Klasse/Struct, Arrays → List<T>/[]T. Die Inferenz ist für dieselbe Eingabe deterministisch." },
      ],
    ),
  },
  ru: {
    name: "JSON в классы Java / C# / Go",
    tagline: "Генерируйте определения классов Java, C# и Go из JSON — вывод типов с объединением элементов массива, именование PascalCase по конвенции языка, вложенные объекты и поддержка List<T>. Бесплатно, мгновенно, офлайн.",
    ...common(
      [
        "Писать POJO, DTO или структуры вручную из JSON-образца утомительно и чревато ошибками. Этот генератор обходит JSON-документ и выдаёт определения классов для Java (классы PascalCase, поля camelCase, List<T>), C# (свойства PascalCase с get/set, List<T>) и Go (структуры PascalCase с json-тегами), следуя конвенциям каждого языка.",
        "Вложенные объекты становятся отдельными определениями классов, а массивы объектов объединяются — все ключи элементов объединяются в один класс — для получения чистого определения на тип. Корень JSON должен быть объектом; оберните массивы под ключом вроде { \"items\": [...] }.",
        "Всё выполняется локально чистой конкатенацией строк — без сетевых вызовов. Результаты детерминированы для той же входной строки.",
      ],
      [
        "Выберите язык назначения: Java, C# или Go.",
        "Введите имя корневого класса и вставьте свой JSON-документ.",
        "Нажмите Генерировать — определения появятся с кнопкой копирования; ошибки JSON укажут точную проблему.",
      ],
      [
        { q: "Почему массивы объектов производят один класс вместо нескольких?", a: "Генератор объединяет все ключи из элементов массива в одно определение класса, поскольку на практике массивы содержат однородные записи. Если элементы имеют разные необязательные ключи, объединённый класс включает все — присвойте null или значение по умолчанию в вашем коде." },
        { q: "Как типы JSON отображаются на типы языка?", a: "JSON string → String/string, целое число → int, дробное → double/float64, boolean → boolean/bool, null → Object/object/interface{}, объекты → вложенный класс/структура, массивы → List<T>/[]T. Вывод типов детерминирован для той же входной строки." },
      ],
    ),
  },
  it: {
    name: "JSON a classi Java / C# / Go",
    tagline: "Genera definizioni di classe Java, C# e Go da JSON — inferenza di tipi con fusione di elementi di array, nomi PascalCase per convenzione di linguaggio, oggetti annidati e supporto List<T>. Gratuito, istantaneo, offline.",
    ...common(
      [
        "Scrivere POJO, DTO o struct a mano da un campione JSON è tedioso e soggetto a errori. Questo generatore attraversa il documento JSON ed emette definizioni di classe per Java (classi PascalCase, campi camelCase privati, List<T>), C# (proprietà PascalCase con get/set, List<T>) e Go (struct PascalCase con json tag), seguendo le convenzioni di ogni linguaggio.",
        "Gli oggetti annidati diventano definizioni di classe separate, e gli array di oggetti vengono uniti — tutte le chiavi degli elementi sono unificate in una singola classe — per ottenere una definizione pulita per tipo. La radice JSON deve essere un oggetto; avvolgi gli array sotto una chiave come { \"items\": [...] }.",
        "Tutto gira localmente con costruzione di stringhe pura — nessuna chiamata di rete. I risultati sono deterministici per lo stesso input.",
      ],
      [
        "Scegli il linguaggio target: Java, C# o Go.",
        "Inserisci il nome della classe radice e incolla il tuo documento JSON.",
        "Clicca Genera — le definizioni appaiono sotto con pulsante di copia; gli errori JSON indicano il problema esatto.",
      ],
      [
        { q: "Perché gli array di oggetti producono una classe invece di più?", a: "Il generatore unisce tutte le chiavi trovate negli elementi dell'array in una singola definizione di classe, perché in pratica gli array contengono record omogenei. Se gli elementi hanno chiavi opzionali diverse, la classe unita le include tutte — assegna null o un default nel tuo codice." },
        { q: "Come si mappano i tipi JSON ai tipi di linguaggio?", a: "JSON string → String/string, intero → int, decimale → double/float64, boolean → boolean/bool, null → Object/object/interface{}, oggetti → classe/struct annidata, array → List<T>/[]T. L'inferenza è deterministica per lo stesso input." },
      ],
    ),
  },
  tr: {
    name: "JSON'dan Java / C# / Go sınıfları",
    tagline: "JSON'dan Java, C# ve Go sınıf tanımları üretin — dizi eleman birleştirmeli tip çıkarımı, dil konvansiyonuna göre PascalCase adlandırma, iç içe nesneler ve List<T> desteği. Ücretsiz, anında, çevrimdışı.",
    ...common(
      [
        "JSON örneğinden POJO, DTO veya struct yazmak zahmetli ve hataya açıktır. Bu üreteç JSON belgesini dolaşır ve her dilin adlandırma konvansiyonuna uyarak sınıf tanımları üretir: Java (PascalCase sınıflar, camelCase özel alanlar, List<T>), C# (get/set ile PascalCase özellikler, List<T>) ve Go (json tag'li PascalCase struct'lar).",
        "İç içe nesneler ayrı sınıf tanımlarına dönüşür ve nesne dizileri birleştirilir — dizi elemanlarının tüm anahtarları tek sınıfta birleştirilir — her tip için tek temiz tanım elde edilir. JSON kökü bir nesne olmalıdır; dizileri { \"items\": [...] } gibi bir anahtar altına sarın.",
        "Her şey saf string birleştirmeyle yerelde çalışır — ağ çağrısı yok. Aynı giriş için sonuçlar deterministiktir.",
      ],
      [
        "Hedef dili seçin: Java, C# veya Go.",
        "Kök sınıf adını girin ve JSON belgenizi yapıştırın.",
        "Üret'e tıklayın — tanımlar kopyalama düğmesiyle aşağıda görünür; JSON hataları kesin sorunu belirtir.",
      ],
      [
        { q: "Neden nesne dizileri birden fazla yerine tek sınıf üretir?", a: "Üreteç, dizi elemanlarının tüm anahtarlarını tek sınıf tanımında birleştirir, çünkü pratikte diziler homojen kayıtlar içerir. Elemanların farklı opsiyonel anahtarları varsa, birleştirilmiş sınıf hepsini içerir — kodunuzda null veya varsayılan değer atayın." },
        { q: "JSON tipleri dil tiplerine nasıl eşlenir?", a: "JSON string → String/string, tam sayı → int, ondalık → double/float64, boolean → boolean/bool, null → Object/object/interface{}, nesneler → iç içe sınıf/struct, diziler → List<T>/[]T. Aynı giriş için tip çıkarımı deterministiktir." },
      ],
    ),
  },
  ko: {
    name: "JSON → Java / C# / Go 클래스",
    tagline: "JSON 문서에서 Java, C#, Go 클래스 정의를 생성합니다 — 타입 추론과 배열 요소 병합, 언어별 PascalCase 네이밍, 중첩 객체와 List<T> 지원. 무료 · 즉시 · 오프라인 작동.",
    ...common(
      [
        "JSON 샘플에서 POJO, DTO, struct를 손으로 쓰는 것은 지루하고 실수하기 쉽습니다. 이 생성기는 JSON 문서를 탐색하며 각 언어의 네이밍 관례에 맞춰 클래스 정의를 출력합니다: Java(PascalCase 클래스, camelCase 필드, List<T>), C#(get/set이 있는 PascalCase 속성, List<T>), Go(json tag이 있는 PascalCase struct).",
        "중첩 객체는 별도의 클래스 정의가 되고, 객체 배열은 병합됩니다 — 배열 요소의 모든 키가 단일 클래스로 통합되어 — 타입별로 깔끔한 정의를 얻습니다. JSON 루트는 객체여야 합니다; 배열은 { \"items\": [...] }처럼 키로 감싸주세요.",
        "모든 것이 순수 문자열 결합으로 로컬 실행됩니다 — 네트워크 호출이 없습니다. 같은 입력의 결과는 결정론적입니다.",
      ],
      [
        "대상 언어를 선택하세요: Java, C# 또는 Go.",
        "루트 클래스 이름을 입력하고 JSON 문서를 붙여넣으세요.",
        "생성을 클릭하세요 — 클래스 정의가 복사 버튼과 함께 아래에 표시됩니다. JSON 오류는 정확한 원인을 표시합니다.",
      ],
      [
        { q: "객체 배열이 여러 개 대신 하나의 클래스만 생성되는 이유는?", a: "생성기는 배열 요소의 모든 키를 단일 클래스 정의로 통합합니다. 실무에서 배열은 동형 레코드를 포함하기 때문입니다. 요소에 다른 옵션 키가 있다면 병합된 클래스에 모두 포함됩니다 — 코드에서 null이나 기본값을 할당하세요." },
        { q: "JSON 타입은 언어 타입에 어떻게 매핑되나요?", a: "JSON string → String/string, 정수 → int, 소수 → double/float64, boolean → boolean/bool, null → Object/object/interface{}, 객체 → 중첩 클래스/struct, 배열 → List<T>/[]T. 같은 입력의 타입 추론은 결정론적입니다." },
      ],
    ),
  },
  ar: {
    name: "JSON إلى فئات Java / C# / Go",
    tagline: "أنشئ تعريفات فئات Java وC# وGo من JSON — استنتاج الأنواع مع دمج عناصر المصفوفات، تسمية PascalCase حسب لغة البرمجة، كائنات متداخلة ودعم List<T>. مجاني وفوري ويعمل دون اتصال.",
    ...common(
      [
        "كتابة POJO أو DTO أو struct يدويًا من عينة JSON مرهق وعرضة للأخطاء. يمر هذا المولد عبر مستند JSON ويصدر تعريفات فئات لـ Java (فئات PascalCase، حقول camelCase خاصة، List<T>)، C# (خصائص PascalCase مع get/set، List<T>)، وGo (structs PascalCase مع وسوم json)، وفقًا لاصطلاحات كل لغة.",
        "الكائنات المتداخلة تصبح تعريفات فئات منفصلة، ومصفوفات الكائنات تُدمج — تُوحَّد جميع المفاتيح في فئة واحدة — للحصول على تعريف نظيف لكل نوع. يجب أن يكون جذر JSON كائنًا؛ غلّف المصفوفات تحت مفتاح مثل { \"items\": [...] }.",
        "كل شيء يعمل محليًا ببناء سلاسل نصية خالصة — بلا استدعاءات شبكة. النتائج حتمية لنفس المدخلات.",
      ],
      [
        "اختر اللغة الهدف: Java أو C# أو Go.",
        "أدخل اسم الفئة الجذر والصق مستند JSON الخاص بك.",
        "انقر على أنشئ — تظهر التعريفات أدناه مع زر نسخ؛ وأخطاء JSON تُظهر المشكلة بدقة.",
      ],
      [
        { q: "لماذا تنتج مصفوفات الكائنات فئة واحدة بدلًا من عدة؟", a: "يدمج المولد جميع المفاتيح الموجودة في عناصر المصفوفة في تعريف فئة واحد، لأن المصفوفات عمليًا تحتوي سجلات متجانسة. إذا كانت العناصر لها مفاتيح اختيارية مختلفة، تتضمن الفئة المدمجة جميعها — عيّن null أو قيمة افتراضية في كودك." },
        { q: "كيف تُحال أنواع JSON إلى أنواع اللغة؟", a: "JSON string → String/string، عدد صحيح → int، عدد عشري → double/float64، boolean → boolean/bool، null → Object/object/interface{}، الكائنات → فئة/هيكل متداخل، والمصفوفات → List<T>/[]T. الاستنتاج حتمي لنفس المدخلات." },
      ],
    ),
  },
  hi: {
    name: "JSON से Java / C# / Go क्लासेस",
    tagline: "JSON दस्तावेज़ से Java, C# और Go क्लास परिभाषाएँ बनाएँ — ऐरे तत्व मर्जिंग के साथ टाइप इन्फेरेंस, भाषा-अनुसार PascalCase नामकरण, नेस्टेड ऑब्जेक्ट और List<T> समर्थन। मुफ़्त, तत्काल, ऑफ़लाइन।",
    ...common(
      [
        "JSON सैंपल से हाथ से POJO, DTO या struct लिखना थकाऊ और गलती-प्रवण है। यह जेनरेटर JSON दस्तावेज़ को ट्रैवर्स करके Java (PascalCase क्लासेस, camelCase प्राइवेट फ़ील्ड, List<T>), C# (get/set के साथ PascalCase प्रॉपर्टीज़, List<T>) और Go (json टैग वाले PascalCase स्ट्रक्ट्स) के लिए क्लास परिभाषाएँ उत्पन्न करता है, हर भाषा के नामकरण कन्वेंशन का सम्मान करते हुए।",
        "नेस्टेड ऑब्जेक्ट अलग क्लास परिभाषाएँ बनते हैं, और ऑब्जेक्ट ऐरे मर्ज किए जाते हैं — ऐरे तत्वों की सभी कुंजियाँ एक क्लास में एकीकृत होती हैं — प्रति टाइप एक साफ़ परिभाषा के लिए। JSON रूट ऑब्जेक्ट होना चाहिए; ऐरे को { \"items\": [...] } की तरह कुंजी में लपेटें।",
        "सब कुछ शुद्ध स्ट्रिंग बिल्डिंग से लोकल चलता है — कोई नेटवर्क कॉल नहीं। समान इनपुट के परिणाम निर्धारणात्मक हैं।",
      ],
      [
        "लक्ष्य भाषा चुनें: Java, C# या Go।",
        "रूट क्लास नाम दर्ज करें और अपना JSON दस्तावेज़ पेस्ट करें।",
        "Generate पर क्लिक करें — परिभाषाएँ कॉपी बटन के साथ नीचे दिखती हैं; JSON त्रुटियाँ सटीक समस्या बताती हैं।",
      ],
      [
        { q: "ऑब्जेक्ट ऐरे एक के बजाय केवल एक क्लास क्यों बनाते हैं?", a: "जेनरेटर ऐरे तत्वों की सभी कुंजियों को एक क्लास परिभाषा में मर्ज करता है, क्योंकि व्यवहार में ऐरे में समरूप रिकॉर्ड होते हैं। यदि तत्वों की अलग वैकल्पिक कुंजियाँ हैं, तो मर्ज की गई क्लास में सभी शामिल हैं — अपने कोड में null या डिफ़ॉल्ट असाइन करें।" },
        { q: "JSON प्रकार भाषा प्रकारों में कैसे मैप होते हैं?", a: "JSON string → String/string, पूर्णांक → int, दशमलव → double/float64, boolean → boolean/bool, null → Object/object/interface{}, ऑब्जेक्ट → नेस्टेड क्लास/struct, ऐरे → List<T>/[]T। समान इनपुट के लिए टाइप इन्फेरेंस निर्धारणात्मक है।" },
      ],
    ),
  },
  id: {
    name: "JSON ke kelas Java / C# / Go",
    tagline: "Buat definisi kelas Java, C#, dan Go dari dokumen JSON — inferensi tipe dengan penggabungan elemen array, penamaan PascalCase per konvensi bahasa, objek bersarang dan dukungan List<T>. Gratis, instan, offline.",
    ...common(
      [
        "Menulis POJO, DTO, atau struct secara manual dari sampel JSON itu melelahkan dan rawan kesalahan. Generator ini menelusuri dokumen JSON dan menghasilkan definisi kelas untuk Java (kelas PascalCase, field camelCase privat, List<T>), C# (properti PascalCase dengan get/set, List<T>), dan Go (struct PascalCase dengan json tag), mengikuti konvensi penamaan setiap bahasa.",
        "Objek bersarang menjadi definisi kelas terpisah, dan array objek digabungkan — semua kunci dari elemen digabungkan dalam satu kelas — untuk mendapatkan satu definisi bersih per tipe. Root JSON harus berupa objek; bungkus array di bawah kunci seperti { \"items\": [...] }.",
        "Semuanya berjalan lokal dengan pembangunan string murni — tanpa panggilan jaringan. Hasil deterministik untuk input yang sama.",
      ],
      [
        "Pilih bahasa target: Java, C#, atau Go.",
        "Masukkan nama kelas root dan tempel dokumen JSON Anda.",
        "Klik Hasilkan — definisi muncul di bawah dengan tombol salin; kesalahan JSON menunjukkan masalah yang tepat.",
      ],
      [
        { q: "Mengapa array objek menghasilkan satu kelas alih-alih beberapa?", a: "Generator menggabungkan semua kunci dari elemen array dalam satu definisi kelas, karena dalam praktik array berisi record homogen. Jika elemen memiliki kunci opsional berbeda, kelas gabungan mencakup semuanya — tetapkan null atau default dalam kode Anda." },
        { q: "Bagaimana tipe JSON dipetakan ke tipe bahasa?", a: "JSON string → String/string, bilangan bulat → int, desimal → double/float64, boolean → boolean/bool, null → Object/object/interface{}, objek → kelas/struct bersarang, array → List<T>/[]T. Inferensi deterministik untuk input yang sama." },
      ],
    ),
  },
  vi: {
    name: "JSON sang lớp Java / C# / Go",
    tagline: "Tạo định nghĩa lớp Java, C# và Go từ tài liệu JSON — suy luận kiểu với hợp nhất phần tử mảng, đặt tên PascalCase theo quy ước ngôn ngữ, đối tượng lồng nhau và hỗ trợ List<T>. Miễn phí, tức thì, ngoại tuyến.",
    ...common(
      [
        "Viết POJO, DTO hoặc struct thủ công từ mẫu JSON là việc nhàm chán và dễ sai. Bộ tạo này duyệt tài liệu JSON và xuất định nghĩa lớp cho Java (lớp PascalCase, trường camelCase riêng tư, List<T>), C# (thuộc tính PascalCase với get/set, List<T>) và Go (struct PascalCase với json tag), theo quy ước đặt tên của từng ngôn ngữ.",
        "Đối tượng lồng nhau trở thành định nghĩa lớp riêng biệt, và mảng đối tượng được hợp nhất — tất cả khóa của các phần tử được hợp nhất vào một lớp — để có một định nghĩa sạch cho mỗi kiểu. Gốc JSON phải là đối tượng; bọc mảng dưới một khóa như { \"items\": [...] }.",
        "Mọi thứ chạy cục bộ bằng xây dựng chuỗi thuần — không gọi mạng. Kết quả là tất định cho cùng một đầu vào.",
      ],
      [
        "Chọn ngôn ngữ đích: Java, C# hoặc Go.",
        "Nhập tên lớp gốc và dán tài liệu JSON của bạn.",
        "Nhấp Tạo — các định nghĩa xuất hiện bên dưới với nút sao chép; lỗi JSON hiển thị vấn đề chính xác.",
      ],
      [
        { q: "Tại sao mảng đối tượng chỉ tạo một lớp thay vì nhiều?", a: "Bộ tạo hợp nhất tất cả khóa từ các phần tử mảng vào một định nghĩa lớp duy nhất, vì trong thực tế mảng chứa các bản ghi đồng nhất. Nếu phần tử có khóa tùy chọn khác nhau, lớp hợp nhất bao gồm tất cả — gán null hoặc mặc định trong mã của bạn." },
        { q: "Kiểu JSON ánh xạ sang kiểu ngôn ngữ như thế nào?", a: "JSON string → String/string, số nguyên → int, số thập phân → double/float64, boolean → boolean/bool, null → Object/object/interface{}, đối tượng → lớp/struct lồng nhau, mảng → List<T>/[]T. Suy luận kiểu là tất định cho cùng đầu vào." },
      ],
    ),
  },
};
