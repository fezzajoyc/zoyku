/**
 * CN-030 geohash-converter 扩展语言 overlay(10 语)。
 */

import type { ToolCopy } from "./types";

function common(
  intro: [string, string, string],
  steps: [string, string, string],
  faqs: Array<{ q: string; a: string }>,
) {
  return { intro, steps, faqs };
}

export const GEOHASH_OVERLAYS: Record<string, ToolCopy> = {
  fr: {
    name: "Encodeur et décodeur Geohash",
    tagline: "Convertissez latitude/longitude en Geohash et inversement — codage par préfixes de proximité pour bases de données et recherche de localisation, centre et limites d'erreur à chaque précision de 1 à 12 caractères. Gratuit, privé, hors ligne.",
    ...common(
      [
        "Geohash transforme une paire latitude/longitude en courte chaîne Base32 en entrelaçant les bits des deux coordonnées et en effectuant une recherche dichotomique sur le globe. Les positions proches partagent des préfixes, donc un préfixe Geohash sert de seau de proximité : indexez vos lignes par préfixe dans n'importe quelle base de données et « trouver les points proches de X » devient une requête de préfixe bon marche au lieu d'un calcul spatial.",
        "Cet outil encode aux précisions de 1 à 12 caractères et décode les hachages vers le centre de leur cellule avec des limites d'erreur exactes — vous savez toujours ce qu'un hash affirme réellement : à 6 caractères la cellule fait environ 1,2 km × 0,6 km ; à 12 caractères environ 3,7 cm. L'alphabet exclut délibérément a, i, l et o pour éviter les confusions.",
        "L'implémentation suit l'algorithme standard de recherche binaire entrelacée et est vérifiée de manière croisée contre une implémentation Python indépendante (pygeohash) sur tous les vecteurs de test, y compris les exemples classiques ezs42 et u4pruydqqvj. Tout s'exécute localement ; les coordonnées ne quittent jamais cet onglet.",
      ],
      [
        "Choisissez Encoder : saisissez latitude, longitude et la précision (nombre de caractères).",
        "Choisissez Décoder : collez un Geohash pour obtenir le centre de sa cellule et les limites d'erreur.",
        "Copiez le hash ou les coordonnées — caractères invalides et coordonnées hors plage sont explicitement rejetés.",
      ],
      [
        { q: "Pourquoi les lieux proches partagent-ils des préfixes Geohash — et quand ne le font-ils pas ?", a: "Les cellules Geohash sont une subdivision récursive du globe, donc deux points dans la même petite cellule partagent son hash comme préfixe. Le piège : les bordures de cellules traversent les villes — deux magasins de part et d'autre d'une rue peuvent être dans des cellules différentes près d'un bord. La recherche de proximité en production interroge la cellule cible plus ses 8 voisines, pas seulement le préfixe." },
        { q: "Quelle précision dois-je stocker ?", a: "Cela dépend de ce que « proche » signifie : 4 caractères ≈ 39 km × 20 km (niveau ville), 6 ≈ 1,2 km × 0,6 km (quartier), 8 ≈ 38 m × 19 m (rue). Stocker 7–8 caractères couvre la plupart des déduplications à l'échelle d'adresse ; gardez les 12 uniquement si un regroupement centimétrique est réellement nécessaire." },
      ],
    ),
  },
  de: {
    name: "Geohash-Encoder & -Decoder",
    tagline: "Konvertieren Sie Breite/Länge in Geohash und zurück — Näherungs-Präfixcodierung für Datenbanken und Ortungssuche, Mittelpunkt und Fehlergrenzen bei jeder Präzision von 1 bis 12 Zeichen. Kostenlos, privat, offline.",
    ...common(
      [
        "Geohash verwandelt ein Breite/Länge-Paar in eine kurze Base32-Zeichenkette, indem die Bits beider Koordinaten verschränkt und binäre Suchen über den Globus ausgeführt werden. Nahe Positionen teilen Präfixe, daher funktioniert ein Geohash-Präfix als Näherungseimer: Zeilen nach Präfix in einer beliebigen Datenbank indizieren und „Punkte nahe X finden“ wird zu einer billigen Präfixabfrage statt einer räumlichen Berechnung.",
        "Dieses Tool kodiert Koordinaten in jeder Präzision von 1 bis 12 Zeichen und dekodiert Hashes zurück zum Zellzentrum mit exakten Fehlergrenzen — Sie wissen immer, was ein Hash tatsächlich behauptet: bei 6 Zeichen umfasst die Zelle etwa 1,2 km × 0,6 km; bei 12 Zeichen etwa 3,7 cm. Das Alphabet schließt a, i, l und o bewusst aus, um Verwechslungen zu vermeiden.",
        "Die Implementierung folgt dem Standard der verschränkten binären Suche und ist gegen eine unabhängige Python-Implementierung (pygeohash) über alle Testvektoren kreuzverifiziert, einschließlich der klassischen Beispiele ezs42 und u4pruydqqvj. Alles läuft lokal ; Koordinaten verlassen diesen Tab nie.",
      ],
      [
        "Wählen Sie Kodieren: Breite, Länge und die Präzision (Anzahl der Zeichen) eingeben.",
        "Wählen Sie Dekodieren: Geohash einfügen, um Zellzentrum und Fehlergrenzen zu erhalten.",
        "Hash oder Koordinaten kopieren — ungültige Zeichen und außerhalb des Bereichs liegende Koordinaten werden explizit abgelehnt.",
      ],
      [
        { q: "Warum teilen nahe Orte Geohash-Präfixe — und wann nicht?", a: "Geohash-Zellen sind eine rekursive Unterteilung des Globus, daher teilen zwei Punkte in derselben kleinen Zelle ihren Hash als Präfix. Der Haken: Zellgrenzen schneiden durch Städte — zwei Geschäfte gegenüber können nahe einer Grenze in verschiedenen Zellen liegen. Produktions-Nähe suche fragt die Zielzelle plus ihre 8 Nachbarn ab, nicht nur den Präfix." },
        { q: "Welche Präzision sollte ich speichern?", a: "Es hängt davon ab, was „nah“ bedeutet: 4 Zeichen ≈ 39 km × 20 km (Städteebene), 6 ≈ 1,2 km × 0,6 km (Viertel), 8 ≈ 38 m × 19 m (Straße). 7–8 Zeichen decken die meisten Deduplizierungen auf Adressebene ab ; die vollen 12 nur, wenn Zentimeter-Bucketing wirklich nötig ist." },
      ],
    ),
  },
  ru: {
    name: "Кодировщик и декодировщик Geohash",
    tagline: "Преобразуйте широту/долготу в Geohash и обратно — префиксное кодирование близости для баз данных и поиска локаций, центр и границы погрешности при каждой точности от 1 до 12 символов. Бесплатно, приватно, офлайн.",
    ...common(
      [
        "Geohash превращает пару широта/долгота в короткую строку Base32, чередуя биты обеих координат и выполняя бинарный поиск по глобусу. Близкие локации разделяют префиксы, поэтому префикс Geohash работает как бакет близости: индексируйте строки по префиксу в любой базе данных, и «найти точки рядом с X» становится дешёвым префиксным запросом вместо пространственного вычисления.",
        "Этот инструмент кодирует координаты с любой точностью от 1 до 12 символов и декодирует хеши обратно в центр ячейки с точными границами погрешности — вы всегда знаете, что хеш реально утверждает: при 6 символах ячейка примерно 1,2 км × 0,6 км; при 12 — около 3,7 см. Алфавит намеренно исключает a, i, l и o для предотвращения путаницы.",
        "Реализация следует стандартному алгоритму чередующейся бинарной поиска и перекрёстно проверена против независимой Python-реализации (pygeohash) на всех тестовых векторах, включая классические примеры ezs42 и u4pruydqqvj. Всё выполняется локально ; координаты никогда не покидают эту вкладку.",
      ],
      [
        "Выберите Кодирование: введите широту, долготу и точность (число символов).",
        "Выберите Декодирование: вставьте Geohash, чтобы получить центр ячейки и границы погрешности.",
        "Скопируйте хеш или координаты — недопустимые символы и координаты вне диапазона явно отвергаются.",
      ],
      [
        { q: "Почему близкие места делят префиксы Geohash — и когда нет?", a: "Ячейки Geohash — рекурсивное подразделение глобуса, поэтому две точки в одной маленькой ячейке разделяют её хеш как префикс. Подвох: границы ячеек режут города — два магазина через дорогу могут оказаться в разных ячейках у границы. Производственный поиск близости запрашивает целевую ячейку плюс её 8 соседей, а не только префикс." },
        { q: "Какую точность хранить?", a: "Зависит от того, что значит «рядом»: 4 символа ≈ 39 км × 20 км (уровень города), 6 ≈ 1,2 км × 0,6 км (район), 8 ≈ 38 м × 19 м (улица). Хранение 7–8 символов покрывает большинство дедупликаций уровня адреса ; полные 12 — только когда действительно нужен сантиметровый бакетинг." },
      ],
    ),
  },
  it: {
    name: "Encoder e decoder Geohash",
    tagline: "Converti latitudine/longitudine in Geohash e viceversa — codifica a prefissi di prossimità per database e ricerca di posizione, centro e limiti di errore a ogni precisione da 1 a 12 caratteri. Gratuito, privato, offline.",
    ...common(
      [
        "Geohash trasforma una coppia latitudine/longitudine in una corta stringa Base32 intrecciando i bit di entrambe le coordinate ed effettuando una ricerca binaria sul globo. Le posizioni vicine condividono prefissi, quindi un prefisso Geohash funziona come bucket di prossimità: indicizza le righe per prefisso in qualsiasi database e «trovare punti vicino a X» diventa una query di prefisso economica invece di un calcolo spaziale.",
        "Questo strumento codifica coordinate a qualsiasi precisione da 1 a 12 caratteri e decodifica hash verso il centro della loro cella con limiti di errore esatti — sai sempre ciò che un hash afferma davvero: a 6 caratteri la cella copre circa 1,2 km × 0,6 km; a 12 circa 3,7 cm. L'alfabeto esclude deliberatamente a, i, l e o per prevenire letture errate.",
        "L'implementazione segue l'algoritmo standard di ricerca binaria intrecciata ed è verificata in modo incrociato contro un'implementazione Python indipendente (pygeohash) su tutti i vettori di test, inclusi gli esempi classici ezs42 e u4pruydqqvj. Tutto gira localmente ; le coordinate non lasciano mai questa scheda.",
      ],
      [
        "Scegli Codifica: inserisci latitudine, longitudine e la precisione (numero di caratteri).",
        "Scegli Decodifica: incolla un Geohash per ottenere il centro della cella e i limiti di errore.",
        "Copia l'hash o le coordinate — caratteri non validi e coordinate fuori intervallo vengono rifiutati esplicitamente.",
      ],
      [
        { q: "Perché i luoghi vicini condividono prefissi Geohash — e quando no?", a: "Le celle Geohash sono una suddivisione ricorsiva del globo, quindi due punti nella stessa piccola cella condividono il suo hash come prefisso. La trappola: i confini delle celle tagliano le città — due negozi uno di fronte all'altro possono trovarsi in celle diverse vicino a un bordo. La ricerca di prossimità in produzione interroga la cella target più le sue 8 vicine, non solo il prefisso." },
        { q: "Quale precisione devo memorizzare?", a: "Dipende da cosa significa «vicino»: 4 caratteri ≈ 39 km × 20 km (livello città), 6 ≈ 1,2 km × 0,6 km (quartiere), 8 ≈ 38 m × 19 m (strada). Memorizzare 7–8 caratteri copre la maggior parte delle dedupliche a livello di indirizzo ; tieni tutti i 12 solo quando serve davvero un bucketing centimetrico." },
      ],
    ),
  },
  tr: {
    name: "Geohash kodlayıcı ve çözücü",
    tagline: "Enlem/boylamı Geohash'e ve geriye dönüştürün — veritabanları ve konum araması için yakınlık-önek kodlaması, 1 ile 12 karakter arası her hassasiyette merkez noktası ve hata sınırları. Ücretsiz, özel, çevrimdışı.",
    ...common(
      [
        "Geohash, enlem/boylam çiftini iki koordinatın bitlerini iç içe geçirerek ve küre üzerinde ikili arama yaparak kısa bir Base32 dizisine dönüştürür. Yakın konumlar önekleri paylaşır, bu yüzden Geohash öneki bir yakınlık kovası işlevi görür: satırları herhangi bir veritabanında öneke göre indeksleyin ve \"X yakınındaki noktaları bul\" mekânsal hesaplama yerine ucuz bir önek sorgusu olur.",
        "Bu araç 1 ile 12 karakter arası her hassasiyette koordinatları kodlar ve hashleri hata sınırlarıyla birlikte hücre merkezine geri çözer — bir hash'in gerçekte ne iddia ettiğini her zaman bilirsiniz: 6 karakterde hücre yaklaşık 1,2 km × 0,6 km; 12 karakterde yaklaşık 3,7 cm. Alfabe, yanlış okumayı önlemek için bilinçli olarak a, i, l ve o'yu dışlar.",
        "Uygulama, standart iç içe ikili arama algoritmasını izler ve tüm test vektörlerinde bağımsız bir Python uygulamasıyla (pygeohash) çapraz doğrulanmıştır — klasik ezs42 ve u4pruydqqvj örnekleri dahil. Her şey yerelde çalışır ; koordinatlar bu sekmeden asla çıkmaz.",
      ],
      [
        "Kodla'yı seçin: enlem, boylam ve hassasiyeti (karakter sayısı) girin.",
        "Çöz'ü seçin: hücre merkezi ve hata sınırlarını almak için bir Geohash yapıştırın.",
        "Hash'i veya koordinatları kopyalayın — geçersiz karakterler ve aralık dışı koordinatlar açıkça reddedilir.",
      ],
      [
        { q: "Yakın konumlar neden Geohash önekleri paylaşır — ve ne zaman paylaşmaz?", a: "Geohash hücreleri kürenin özyinelemeli bir alt bölümüdür, bu yüzden aynı küçük hücredeki iki nokta hash'ini önek olarak paylaşır. Tuzak: hücre sınırları şehirleri keser — cadde karşısındaki iki dükkan kenara yakınken farklı hücrelerde olabilir. Üretim yakınlık araması hedef hücreyi artı 8 komşusunu sorgular, yalnızca öneki değil." },
        { q: "Hangi hassasiyeti depolamalıyım?", a: "\"Yakın\" ne demekse ona bağlıdır: 4 karakter ≈ 39 km × 20 km (şehir), 6 ≈ 1,2 km × 0,6 km (mahalle), 8 ≈ 38 m × 19 m (sokak). Adres düzeyi tekilleştirme için 7–8 karakter yeter; yalnızca santimetre düzeyi gruplama gerçekten gerekiyorsa 12 karakteri saklayın." },
      ],
    ),
  },
  ko: {
    name: "Geohash 인코더·디코더",
    tagline: "위도/경도를 Geohash로 변환하거나 그 반대로 변환합니다 — 데이터베이스와 위치 검색을 위한 근접-접두사 인코딩, 1~12 문자 모든 정밀도에서 중심점과 오차 경계. 무료 · 즉시 · 오프라인 작동.",
    ...common(
      [
        "Geohash는 위도/경도 쌍을 두 좌표의 비트를 교차 배치하고 지구 위에서 이진 검색을 수행하여 짧은 Base32 문자열로 바꿉니다. 가까운 위치는 접두사를 공유하므로 Geohash 접두사는 근접 버킷 역할을 합니다: 어떤 데이터베이스에서든 접두사로 행을 인덱싱하면 \"X 근처의 점 찾기\"가 공간 계산이 아닌 저렴한 접두사 쿼리가 됩니다.",
        "이 도구는 1~12 문자의 모든 정밀도로 좌표를 인코딩하고 해시를 정확한 오차 경계와 함께 셀 중심으로 디코딩합니다 — 해시가 실제로 무엇을 주장하는지 항상 알 수 있습니다: 6 문자에서 셀은 약 1.2 km × 0.6 km; 12 문자에서 약 3.7 cm. 알파벳은 오독을 방지하기 위해 a, i, l, o를 의도적으로 제외합니다.",
        "구현은 표준 교차 이진 탐색 알고리즘을 따르며 독립적인 Python 구현(pygeohash)과 모든 테스트 벡터에서 교차 검증되었습니다 — 고전적 예인 ezs42와 u4pruydqqvj 포함. 모든 것이 로컬로 실행되며 좌표는 이 탭을 떠나지 않습니다.",
      ],
      [
        "인코딩 선택: 위도, 경도, 정밀도(문자 수)를 입력하세요.",
        "디코딩 선택: Geohash를 붙여넣으면 셀 중심과 오차 경계를 얻습니다.",
        "해시나 좌표를 복사하세요 — 잘못된 문자와 범위를 벗어난 좌표는 명시적으로 거부됩니다.",
      ],
      [
        { q: "가까운 위치가 Geohash 접두사를 공유하는 이유 — 그리고 공유하지 않을 때는?", a: "Geohash 셀은 지구의 재귀적 분할이므로 같은 작은 셀의 두 점은 그 해시를 접두사로 공유합니다. 함정: 셀 경계는 도시를 가로지릅니다 — 길 건너편 두 가게가 경계 근처에서 다른 셀에 있을 수 있습니다. 프로덕션 근접 검색은 대상 셀과 8개 이웃 셀을 함께 쿼리하는 것이 정답이지 접두사만查询하지 않습니다." },
        { q: "어느 정밀도를 저장해야 하나요?", a: "\"가깝다\"의 정의에 따릅니다: 4 문자 ≈ 39 km × 20 km(도시), 6 ≈ 1.2 km × 0.6 km(동네), 8 ≈ 38 m × 19 m(거리). 주소 수준 중복 제거에는 7~8 문자면 충분합니다; 센티미터 수준 버킷팅이 정말 필요할 때만 12 문자를 저장하세요." },
      ],
    ),
  },
  ar: {
    name: "مُرمّز ومفكك Geohash",
    tagline: "حوّل خط العرض/الطول إلى Geohash والعكس — ترميز بادئات القرب لقواعد البيانات والبحث عن المواقع، مع مركز وحدود خطأ في كل دقة من 1 إلى 12 حرفًا. مجاني وخاص ويعمل دون اتصال.",
    ...common(
      [
        "يحوّل Geohash زوج خط العرض/الطول إلى سلسلة Base32 قصيرة عبر تناول بتات الإحداثيين وإجراء بحث ثنائي على الكرة الأرضية. المواقع القريبة تتشارك البادئات، فبادئة Geohash تعمل كدلاء قرب: افهرس صفوفك بالبادئة في أي قاعدة بيانات ويتحول \"إيجاد النقاط قرب X\" إلى استعلام بادئة رخيص بدلًا من حساب مكاني.",
        "تشفّر هذه الأداة الإحداثيات بأي دقة من 1 إلى 12 حرفًا وتفكّك الهاشات إلى مركز خليتها مع حدود خطأ دقيقة — تعرف دائمًا ما يدّعيه الهاش فعليًا: عند 6 أحرف تغطي الخلية ~1.2 كم × 0.6 كم؛ وعند 12 حرفًا ~3.7 سم. الأبجدية تستبعد عمدًا a وi وl وo لتفادي سوء القراءة.",
        "التنفيذ يتبع خوارزمية البحث الثنائي المتناوب القياسية وموثق تبادليًا ضد تنفيذ Python مستقل (pygeohash) على كل متجهات الاختبار، بما فيها الأمثلة الكلاسيكية ezs42 وu4pruydqqvj. كل شيء يعمل محليًا؛ الإحداثيات لا تترك هذه التبويبة أبدًا.",
      ],
      [
        "اختر ترميز: أدخل خط العرض والطول والدقة (عدد الأحرف).",
        "اختر فك الترميز: الصق Geohash لتحصل على مركز الخلية وحدود الخطأ.",
        "انسخ الهاش أو الإحداثيات — الأحرف غير الصالحة والإحداثيات خارج النطاق تُرفض صراحة.",
      ],
      [
        { q: "لماذا تتشارك المواقع القريبة بادئات Geohash — ومتى لا؟", a: "خلايا Geohash تقسيم متكرر للأرض، فموقعان في الخلية الصغيرة نفسها يتشاركان هاشه كبادئة. الفخ: حدود الخلايا تقطع المدن — متجران مقابل شارع قد يكونان في خليتين مختلفتين قرب حد. البحث عن القرب في الإنتاج يستعلم الخلية الهدف زائد جيرانها الثمانية، لا البادئة وحدها." },
        { q: "أي دقة أخزن؟", a: "يعتمد على تعريف «قرب»: 4 أحرف ≈ 39 كم × 20 كم (مستوى مدينة)، 6 ≈ 1.2 كم × 0.6 كم (حي)، 8 ≈ 38 م × 19 م (شارع). تخزين 7–8 أحرف يغطي معظم إلغاء التكرار على مستوى العنوان؛ احتفظ بالـ 12 فقط عند الحاجة الفعلية لتجزيء بالسنتيمتر." },
      ],
    ),
  },
  hi: {
    name: "Geohash एनकोडर और डिकोडर",
    tagline: "अक्षांश/देशांतर को Geohash में और वापस बदलें — डेटाबेस और स्थान खोज के लिए निकटता-प्रीफिक्स एनकोडिंग, 1 से 12 कैरेक्टर की हर परिशुद्धता पर केंद्र बिंदु और त्रुटि सीमाएँ। मुफ़्त, निजी, ऑफ़लाइन।",
    ...common(
      [
        "Geohash अक्षांश/देशांतर जोड़ी को दोनों निर्देशांकों के बिट्स बुनकर और ग्लोब पर बाइनरी सर्च करके एक छोटी Base32 स्ट्रिंग में बदलता है। नज़दीकी स्थान प्रीफिक्स साझा करते हैं, इसलिए Geohash प्रीफिक्स निकटता बकेट के रूप में काम करता है: किसी भी डेटाबेस में प्रीफिक्स से रो इंडेक्स करें और \"X के पास के पॉइंट खोजें\" स्पेशल कंप्यूटेशन के बजाय सस्ता प्रीफिक्स क्वेरी बन जाता है।",
        "यह टूल 1 से 12 कैरेक्टर की किसी भी परिशुद्धता पर कोऑर्डिनेट एनकोड करता है और हैश को उसकी सेल के केंद्र में सटीक त्रुटि सीमाओं के साथ डिकोड करता है — आप हमेशा जानते हैं कि हैश वास्तव में क्या दावा करता है: 6 कैरेक्टर पर सेल लगभग 1.2 km × 0.6 km; 12 पर लगभग 3.7 cm। अक्षरक्रम जानबूझकर a, i, l, o को बाहर रखता है ताकि गलत पढ़ाई न हो।",
        "इम्प्लीमेंटेशन मानक इंटरलीव्ड बाइनरी-सर्च एल्गोरिद्म का पालन करती है और स्वतंत्र Python इम्प्लीमेंटेशन (pygeohash) से सभी टेस्ट वेक्टर पर क्रॉस-वेरिफाइड है — क्लासिक उदाहरण ezs42 और u4pruydqqvj सहित। सब कुछ लोकल चलता है ; कोऑर्डिनेट इस टैब से कभी नहीं निकलते।",
      ],
      [
        "Encode चुनें: अक्षांश, देशांतर और परिशुद्धता (कैरेक्टर संख्या) दर्ज करें।",
        "Decode चुनें: Geohash पेस्ट करें और उसकी सेल केंद्र व त्रुटि सीमाएँ पाएँ।",
        "हैश या कोऑर्डिनेट कॉपी करें — अवैध कैरेक्टर और सीमा से बाहर के कोऑर्डिनेट स्पष्ट रूप से अस्वीकार होते हैं।",
      ],
      [
        { q: "नज़दीकी स्थान Geohash प्रीफिक्स क्यों साझा करते हैं — और कब नहीं?", a: "Geohash सेल ग्लोब का पुनरावर्ती विभाजन हैं, इसलिए एक ही छोटी सेल के दो पॉइंट उसका हैश प्रीफिक्स साझा करते हैं। पहेली: सेल सीमाएँ शहरों को काटती हैं — सड़क के दोनों ओर की दुकानें किनारे के पास अलग सेल में हो सकती हैं। प्रोडक्शन निकटता सर्च लक्षित सेल प्लस उसके 8 पड़ोसियों को क्वेरी करता है, केवल प्रीफिक्स नहीं।" },
        { q: "कौन सी परिशुद्धता स्टोर करूँ?", a: "यह इस बात पर निर्भर करता है कि \"पास\" का मतलब क्या है: 4 कैरेक्टर ≈ 39 km × 20 km (शहर), 6 ≈ 1.2 km × 0.6 km (मोहल्ला), 8 ≈ 38 m × 19 m (गली)। पता-स्तर की डीडुप्लिकेशन के लिए 7–8 कैरेक्टर काफ़ी हैं; 12 केवल तब जब सेंटीमीटर-स्तर का बकेटिंग वास्तव में चाहिए।" },
      ],
    ),
  },
  id: {
    name: "Encoder dan decoder Geohash",
    tagline: "Konversi lintang/bujur ke Geohash dan sebaliknya — pengodean prefiks kedekatan untuk basis data dan pencarian lokasi, pusat dan batas kesalahan pada setiap presisi 1 hingga 12 karakter. Gratis, privat, offline.",
    ...common(
      [
        "Geohash mengubah pasangan lintang/bujur menjadi string Base32 pendek dengan menyisipkan bit kedua koordinat dan melakukan pencarian biner pada glob. Lokasi dekat berbagi prefiks, sehingga prefiks Geohash berfungsi sebagai bucket kedekatan: indeks baris berdasarkan prefiks di basis data mana pun dan \"temukan titik dekat X\" menjadi kueri prefiks yang murah alih-alih perhitungan spasial.",
        "Alat ini mengkodekan koordinat pada presisi apa pun dari 1 hingga 12 karakter dan mendekode hash ke pusat selnya dengan batas kesalahan yang eksak — Anda selalu tahu apa yang benar-benar diklaim hash: pada 6 karakter sel mencakup ~1,2 km × 0,6 km; pada 12 sekitar 3,7 cm. Alfabet sengaja mengecualikan a, i, l, dan o untuk mencegah salah baca.",
        "Implementasi mengikuti algoritme pencarian biner saling-sisip standar dan terverifikasi silang terhadap implementasi Python independen (pygeohash) pada semua vektor uji, termasuk contoh klasik ezs42 dan u4pruydqqvj. Semuanya berjalan lokal ; koordinat tidak pernah keluar dari tab ini.",
      ],
      [
        "Pilih Enkode: masukkan lintang, bujur, dan presisi (jumlah karakter).",
        "Pilih Dekode: tempel Geohash untuk mendapatkan pusat selnya dan batas kesalahan.",
        "Salin hash atau koordinat — karakter tidak valid dan koordinat di luar jangkauan ditolak secara eksplisit.",
      ],
      [
        { q: "Mengapa lokasi dekat berbagi prefiks Geohash — dan kapan tidak?", a: "Sel Geohash adalah subdivisi rekursif dari glob, jadi dua titik dalam sel kecil yang sama berbagi hash-nya sebagai prefiks. Jebakannya: batas sel memotong kota — dua toko di seberang jalan bisa berada di sel berbeda dekat tepi. Pencarian kedekatan produksi meng-query sel target plus 8 tetangganya, bukan hanya prefiks." },
        { q: "Presisi apa yang harus saya simpan?", a: "Tergantung arti \"dekat\": 4 karakter ≈ 39 km × 20 km (tingkat kota), 6 ≈ 1,2 km × 0,6 km (lingkungan), 8 ≈ 38 m × 19 m (jalan). Menyimpan 7–8 karakter mencakup sebagian besar deduplikasi tingkat alamat; simpan 12 hanya ketika bucketing sentimeter benar-benar diperlukan." },
      ],
    ),
  },
  vi: {
    name: "Bộ mã hóa và giải mã Geohash",
    tagline: "Chuyển vĩ độ/kinh độ thành Geohash và ngược lại — mã hóa tiền tố lân cận cho cơ sở dữ liệu và tìm kiếm vị trí, tâm và giới hạn sai số ở mọi độ chính xác từ 1 đến 12 ký tự. Miễn phí, riêng tư, ngoại tuyến.",
    ...common(
      [
        "Geohash biến cặp vĩ độ/kinh độ thành chuỗi Base32 ngắn bằng cách xen kẽ bit của cả hai tọa độ và tìm kiếm nhị phân trên toàn cầu. Các vị trí gần nhau dùng chung tiền tố, nên tiền tố Geohash hoạt động như một bucket lân cận: đánh chỉ mục các hàng theo tiền tố trong bất kỳ cơ sở dữ liệu nào và \"tìm điểm gần X\" trở thành truy vấn tiền tố rẻ thay vì tính toán không gian.",
        "Công cụ này mã hóa tọa độ ở mọi độ chính xác từ 1 đến 12 ký tự và giải mã hash về tâm ô với giới hạn sai số chính xác — bạn luôn biết hash thực sự khẳng định phạm vi nào: ở 6 ký tự ô rộng ~1,2 km × 0,6 km; ở 12 ~3,7 cm. Bảng chữ cái cố ý loại a, i, l, o để tránh đọc nhầm.",
        "Bản triển khai theo thuật toán tìm kiếm nhị phân xen kẽ tiêu chuẩn và được kiểm chứng chéo với bản triển khai Python độc lập (pygeohash) trên mọi vectơ kiểm thử, bao gồm các ví dụ kinh điển ezs42 và u4pruydqqvj. Mọi thứ chạy cục bộ ; tọa độ không bao giờ rời tab này.",
      ],
      [
        "Chọn Mã hóa: nhập vĩ độ, kinh độ và độ chính xác (số ký tự).",
        "Chọn Giải mã: dán Geohash để nhận tâm ô và giới hạn sai số.",
        "Sao chép hash hoặc tọa độ — ký tự không hợp lệ và tọa độ ngoài phạm vi bị từ chối rõ ràng.",
      ],
      [
        { q: "Tại sao các địa điểm gần nhau dùng chung tiền tố Geohash — và khi nào thì không?", a: "Các ô Geohash là phân chia đệ quy của địa cầu, nên hai điểm trong cùng một ô nhỏ dùng chung hash của nó làm tiền tố. Cái bẫy: biên ô cắt ngang thành phố — hai cửa hàng đối diện đường có thể ở hai ô khác nhau gần biên. Tìm kiếm lân cận trong production phải truy vấn ô đích cộng 8 ô kề, không chỉ tiền tố." },
        { q: "Nên lưu độ chính xác bao nhiêu?", a: "Tùy \"gần\" nghĩa là gì: 4 ký tự ≈ 39 km × 20 km (cấp thành phố), 6 ≈ 1,2 km × 0,6 km (phường), 8 ≈ 38 m × 19 m (đường). Lưu 7–8 ký tự đủ cho hầu hết khử trùng lặp cấp địa chỉ; chỉ giữ 12 khi thực sự cần phân nhóm cm." },
      ],
    ),
  },
};
