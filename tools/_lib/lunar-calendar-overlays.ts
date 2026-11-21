/**
 * CN-007 lunar-calendar-converter 扩展语言 overlay(fr/de/ru/it/tr/ko/ar/hi/id/vi)。
 * 模式与 crc16-copy.ts 相同:common() 辅助展开 intro/steps/faqs。
 * 翻译口径:干支年按农历正月初一换年;闰月 ~19 年 7 次;本地处理不上传。
 */

import type { ToolCopy } from "./types";

function common(
  intro: [string, string, string],
  steps: [string, string, string],
  faqs: Array<{ q: string; a: string }>,
) {
  return { intro, steps, faqs };
}

export const LUNAR_CALENDAR_OVERLAYS: Record<string, ToolCopy> = {
  fr: {
    name: "Convertisseur de calendrier lunaire",
    tagline: "Convertissez entre dates solaires et calendrier lunaire chinois dans votre navigateur — avec année GanZhi, zodiaque et termes solaires. Gratuit, instantané, hors ligne.",
    ...common(
      [
        "Conversion bidirectionnelle entre le calendrier grégorien et le calendrier lunaire chinois traditionnel. Saisissez une date solaire pour obtenir son équivalent lunaire avec l'année GanZhi et l'animal du zodiaque, ou une date lunaire — mois intercalaire compris — pour retrouver le jour solaire.",
        "Le calendrier lunaire assigne les mois aux phases de la lune : une année lunaire compte 12 ou 13 mois, le supplémentaire étant un mois intercalaire qui apparaît ~7 fois sur 19 ans. Les 24 termes solaires (jieqi) sont aussi indiqués.",
        "Tout se calcule localement avec la bibliothèque lunar-javascript — sans compte, sans envoi, et les dates consultées ne quittent jamais le navigateur. Années ≈1900–2100.",
      ],
      [
        "Choisissez la direction : Solaire → Lunaire ou Lunaire → Solaire.",
        "Saisissez la date (et cochez Mois intercalaire pour un mois intercalaire côté lunaire).",
        "Lisez le résultat — année GanZhi, zodiaque et terme solaire du jour affichés ensemble.",
      ],
      [
        { q: "Quand l'année GanZhi change-t-elle ?", a: "Cette outils suit le Nouvel An lunaire : l'année change le 1er jour du 1er mois lunaire (convention de l'almanach populaire). La tradition du Lichun diffère pour les dates entre Lichun et le Nouvel An lunaire." },
        { q: "Qu'est-ce qu'un mois intercalaire ?", a: "Une année lunaire de 12 mois est ~11 jours plus courte qu'une année solaire ; ~7 années sur 19 reçoivent un 13e mois. Cochez Mois intercalaire pour ces dates." },
        { q: "Les dates sont-elles envoyées ?", a: "Non. Tout reste local dans ce navigateur." },
      ],
    ),
  },
  de: {
    name: "Mondkalender-Konverter",
    tagline: "Rechnen Sie im Browser zwischen Sonnen- und chinesischem Mondkalender um — mit GanZhi-Jahr, Tierkreiszeichen und Solarterminen. Kostenlos, sofort, offline.",
    ...common(
      [
        "Zweiwege-Umrechnung zwischen gregorianischem und traditionellem chinesischem Mondkalender. Geben Sie ein Solardatum ein und erhalten Sie das Mondäquivalent mit GanZhi-Jahr und Tierkreiszeichen — oder ein Mondatum (Schaltmonate inklusive) für den entsprechenden Sonnentag.",
        "Der Mondkalender ordnet die Monate den Mondphasen zu: ein Mondjahr hat 12 oder 13 Monate, der zusätzliche ist ein Schaltmonat (~7 von 19 Jahren). Auch die 24 Solartermine (jieqi) werden angezeigt.",
        "Alles läuft lokal mit der Bibliothek lunar-javascript — kein Konto, kein Upload, die Daten verlassen den Browser nie. Jahre ≈1900–2100.",
      ],
      [
        "Richtung wählen: Sonnen- → Mondkalender oder umgekehrt.",
        "Datum eingeben (Schaltmonat ankreuzen, wenn ein Schaltmonat umgerechnet wird).",
        "Ergebnis lesen — GanZhi-Jahr, Tierkreiszeichen und Solartermin des Tages werden mitangezeigt.",
      ],
      [
        { q: "Wann wechselt das GanZhi-Jahr?", a: "Dieses Werkzeug folgt dem Mondneujahr: Der Wechsel erfolgt am 1. Tag des ersten Mondmonats (Volksalmanach-Konvention). Die Lichun-Tradition weicht für Daten zwischen Lichun und Mondneujahr ab." },
        { q: "Was ist ein Schaltmonat?", a: "Ein Mondjahr mit 12 Monaten ist ~11 Tage kürzer als ein Sonnenjahr; ~7 von 19 Jahren erhalten einen 13. Monat. Für diese Daten den Schaltmonat ankreuzen." },
        { q: "Werden Daten gesendet?", a: "Nein. Alles bleibt lokal in diesem Browser." },
      ],
    ),
  },
  ru: {
    name: "Конвертер лунного календаря",
    tagline: "Преобразуйте даты между солнечным и традиционным китайским лунным календарём в браузере — с годом Гань-чжи, зодиаком и солнечными терминами. Бесплатно, мгновенно, офлайн.",
    ...common(
      [
        "Двустороннее преобразование между григорианским и традиционным китайским лунно-солнечным календарём. Введите солнечную дату — получите лунный эквивалент с годом Гань-чжи и животным зодиака; или введите лунную дату (включая вставные месяцы), чтобы найти солнечный день.",
        "Лунный календарь привязывает месяцы к фазам Луны: в лунном году 12 или 13 месяцев, дополнительный — вставной месяц, встречается ~7 раз за 19 лет. Также отмечаются 24 солнечных термина (цзеци).",
        "Всё выполняется локально через библиотеку lunar-javascript — без аккаунта, без отправки; даты не покидают браузер. Годы ≈1900–2100.",
      ],
      [
        "Выберите направление: Солнечный → Лунный или Лунный → Солнечный.",
        "Введите дату (отметьте Вставной месяц для дат лунного вставного месяца).",
        "Прочитайте результат — год Гань-чжи, зодиак и солнечный термин дня показаны вместе.",
      ],
      [
        { q: "Когда меняется год Гань-чжи?", a: "Этот инструмент следует Лунному Новому году: год меняется 1-го дня первого лунного месяца (народный альманах). Традиция Личунь отличается для дат между Личунь и Лунным Новым годом." },
        { q: "Что такое вставной месяц?", a: "Лунный год из 12 месяцев ~на 11 дней короче солнечного; ~7 из 19 лет получают 13-й месяц. Для этих дат отметьте Вставной месяц." },
        { q: "Отправляются ли даты?", a: "Нет. Всё остаётся локально в этом браузере." },
      ],
    ),
  },
  it: {
    name: "Convertitore di calendario lunare",
    tagline: "Converti tra date solari e calendario lunare cinese nel browser — con anno GanZhi, zodiaco e termini solari. Gratis, istantaneo, offline.",
    ...common(
      [
        "Conversione bidirezionale tra il calendario gregoriano e il tradizionale calendario lunare cinese. Inserisci una data solare per ottenere l'equivalente lunare con l'anno GanZhi e l'animale dello zodiaco, oppure una data lunare — mesi intercalari inclusi — per trovare il giorno solare.",
        "Il calendario lunare assegna i mesi alle fasi lunari: un anno lunare ha 12 o 13 mesi, quello extra è un mese intercalare che compare ~7 volte su 19. Vengono indicati anche i 24 termini solari (jieqi).",
        "Tutto avviene localmente con la libreria lunar-javascript — senza account, senza invii, e le date consultate non lasciano mai il browser. Anni ≈1900–2100.",
      ],
      [
        "Scegli la direzione: Solare → Lunare o Lunare → Solare.",
        "Inserisci la data (spunta Mese intercalare per convertire un mese intercalare lato lunare).",
        "Leggi il risultato — anno GanZhi, zodiaco e termine solare del giorno mostrati insieme.",
      ],
      [
        { q: "Quando cambia l'anno GanZhi?", a: "Questo strumento segue il Capodanno lunare: l'anno cambia il 1° giorno del 1° mese lunare (convenzione dell'almanacco popolare). La tradizione del Lichun differisce per le date tra Lichun e Capodanno lunare." },
        { q: "Cos'è un mese intercalare?", a: "Un anno lunare di 12 mesi è ~11 giorni più corto di un anno solare; ~7 anni su 19 ricevono un 13° mese. Spunta Mese intercalare per quelle date." },
        { q: "Le date vengono inviate?", a: "No. Tutto resta locale in questo browser." },
      ],
    ),
  },
  tr: {
    name: "Ay takvimi dönüştürücü",
    tagline: "Tarayıcınızda güneş ve Çin ay takvimi tarihleri arasında dönüştürün — GanZhi yılı, burçlar ve güneş terimleriyle. Ücretsiz, anında, çevrimdışı.",
    ...common(
      [
        "Gregoryen takvim ile geleneksel Çin ay-güneş takvimi arasında iki yönlü dönüşüm. Herhangi bir güneş tarihi girin; GanZhi yılı ve burçla birlikte ay karşılığını alın — veya artık aylar dahil bir ay tarihi girerek karşılık gelen güneş gününü bulun.",
        "Ay takvimi ayları ay evrelerine atar: bir ay yılında 12 veya 13 ay vardır, fazlası artık aydır ve ~19 yılda 7 kez görülür. 24 güneş terimi (jieqi) de gösterilir.",
        "Her şey tarayıcınızda lunar-javascript kitaplığıyla çalışır — hesap yok, yükleme yok, tarihler asla gönderilmez. Yıllar ≈1900–2100.",
      ],
      [
        "Yönü seçin: Güneş → Ay veya Ay → Güneş.",
        "Tarihi girin (ay tarafından artık ay dönüştürüyorsanız Artık ay'ı işaretleyin).",
        "Sonucu okuyun — GanZhi yılı, burç ve günün güneş terimi birlikte gösterilir.",
      ],
      [
        { q: "GanZhi yılı ne zaman değişir?", a: "Bu araç Ay Yılı'nı izler: yıl, birinci ayın 1. gününde değişir (halk almanağı geleneği). Lichun geleneği, Lichun ile Ay Yılı arasındaki tarihlerde farklı sonuç verir." },
        { q: "Artık ay nedir, ne zaman görünür?", a: "12 aylık bir ay yılı, güneş yılından ~11 gün kısadır; 19 yılda ~7 tanesi 13. ayı alır. Ay tarafından dönüştürürken Artık ay'ı işaretleyin." },
        { q: "Tarihler gönderilir mi?", a: "Hayır. Her şey bu tarayıcıda yerel kalır." },
      ],
    ),
  },
  ko: {
    name: "음력 달력 변환기",
    tagline: "브라우저에서 양력과 중국 음력(태음태양력) 날짜를 상호 변환합니다 — 간지 연도, 띠, 24절기 포함. 윤달 지원. 무료 · 즉시 · 오프라인 작동, 데이터 전송 없음.",
    ...common(
      [
        "그레고리력과 전통 중국 태음태양력(태음태양력)의 양방향 변환입니다. 양력 날짜를 입력하면 간지 연도와 띠가 포함된 음력 날짜를, 음력 날짜(윤달 포함)를 입력하면 해당 양력 일자를 얻습니다.",
        "음력은 달의 위상으로 달을 정하므로 한 해가 12 또는 13개월입니다 — 13번째가 윤달이며 약 19년에 7번 나타납니다. 농경과 전통 명절의 계절 기준인 24절기도 표시합니다.",
        "모든 변환은 브라우저의 lunar-javascript 라이브러리로 이 기기에서 수행됩니다 — 계정도 업로드도 없으며 조회한 날짜는 전송되지 않습니다. 연도는 약 1900~2100.",
      ],
      [
        "방향을 선택하세요: 양력 → 음력 또는 음력 → 양력.",
        "날짜를 입력합니다(음력 윤달을 변환할 때는 윤달에 체크).",
        "결과를 확인하세요 — 간지 연도, 띠, 당일 절기가 함께 표시됩니다.",
      ],
      [
        { q: "간지 연도는 언제 바뀌나요?", a: "이 도구는 음력 설 기준입니다: 간지 연도는 음력 1월 1일에 바뀝니다(민속 역법 관례). 입춘 기준 전통과는 입춘~설 사이 날짜에서 결과가 다릅니다." },
        { q: "윤달이란 무엇이며 얼마나 자주 오나요?", a: "12개월 음력 해는 양력보다 약 11일 짧아 19년 주기 중 약 7번 13번째 달(윤달)이 삽입됩니다. 음력 측 변환 시 윤달에 체크하세요." },
        { q: "날짜가 전송되나요?", a: "아니요. 모든 것은 이 브라우저에 남습니다." },
      ],
    ),
  },
  ar: {
    name: "محوّل التقويم القمري",
    tagline: "حوّل بين التواريخ الشمسية والتقويم القمري الصيني في متصفحك — مع سنة القوانين والأبراج والمصطلحات الشمسية. مجاني وفوري ويعمل دون اتصال.",
    ...common(
      [
        "تحويل ثنائي الاتجاه بين التقويم الميلادي والتقويم القمري الصيني التقليدي. أدخل أي تاريخ ميلادي لتحصل على مكافئه القمري مع سنة القوانين وحيوان الأبراج، أو أدخل تاريخًا قمريًا — بما يشمل الشهور الكبيسة — لتجد اليوم الميلادي المقابل.",
        "يربط التقويم القمري الشهور بمراحل القمر: السنة القمرية فيها 12 أو 13 شهرًا، والزائد هو شهر كبيس يظهر ~7 مرات كل 19 سنة. كما تُعرض المصطلحات الشمسية الـ24 (jieqi).",
        "كل شيء يعمل محليًا في متصفحك عبر مكتبة lunar-javascript — بلا حساب، بلا رفع، والتواريخ لا تُرسل أبدًا. السنوات ≈1900–2100.",
      ],
      [
        "اختر الاتجاه: شمسي → قمري أو قمري → شمسي.",
        "أدخل التاريخ (وضع علامة على الشهر الكبيس عند تحويل شهر كبيس من الجهة القمرية).",
        "اقرأ النتيجة — تُعرض سنة القوانين والأبراج ومصطلح اليوم الشمسي معًا.",
      ],
      [
        { q: "متى تتغير سنة القوانين؟", a: "يتبع هذا الأداة رأس السنة القمرية: تتغير السنة في اليوم الأول من الشهر القمري الأول (اتفاقية التقويم الشعبي). تقليد Lichun يختلف للتواريخ بينهما." },
        { q: "ما هو الشهر الكبيس ومتى يظهر؟", a: "السنة القمرية ذات 12 شهرًا أقصر من السنة الشمسية بـ~11 يومًا؛ لذا ~7 من كل 19 سنة تحصل على شهر ثالث عشر. ضع علامة الشهر الكبيس لتلك التواريخ." },
        { q: "هل تُرسل التواريخ؟", a: "لا. كل شيء يبقى محليًا في هذا المتصفح." },
      ],
    ),
  },
  hi: {
    name: "चंद्र कैलेंडर कनवर्टर",
    tagline: "अपने ब्राउज़र में सौर और चीनी चंद्र कैलेंडर तिथियों के बीच बदलें — गणजी वर्ष, राशि चक्र और सौर पदों के साथ। मुफ़्त, तुरंत, ऑफ़लाइन।",
    ...common(
      [
        "ग्रेगोरियन कैलेंडर और पारंपरिक चीनी चंद्र कैलेंडर के बीच द्विदिश रूपांतरण। कोई भी सौर तिथि दर्ज करें और गणजी वर्ष व राशि के साथ चंद्र समतुल्य पाएं — या चंद्र तिथि (अधिक माह सहित) दर्ज करके संगत सौर दिन पाएं।",
        "चंद्र कैलेंडर महीनों को चंद्र कलाओं से जोड़ता है: चंद्र वर्ष में 12 या 13 माह होते हैं — अतिरिक्त माह अधिक माह है जो ~19 वर्षों में 7 बार आता है। 24 सौर पद (jieqi) भी दिखाए जाते हैं।",
        "सब कुछ आपके ब्राउज़र में lunar-javascript लाइब्रेरी से स्थानीय रूप से चलता है — खाता नहीं, अपलोड नहीं, जाँची गई तिथियाँ कहीं नहीं जातीं। वर्ष ≈1900–2100।",
      ],
      [
        "दिशा चुनें: सौर → चंद्र या चंद्र → सौर।",
        "तिथि दर्ज करें (चंद्र पक्ष से अधिक माह बदलते समय अधिक माह पर टिक करें)।",
        "परिणाम पढ़ें — गणजी वर्ष, राशि चक्र और उस दिन का सौर पद साथ दिखता है।",
      ],
      [
        { q: "गणजी वर्ष कब बदलता है?", a: "यह उपकरण चंद्र नववर्ष परंपरा का पालन करता है: गणजी वर्ष पहले चंद्र माह के पहले दिन बदलता है। लिचुन परंपरा लिचुन और चंद्र नववर्ष के बीच की तिथियों पर भिन्न है।" },
        { q: "अधिक माह क्या है और कब आता है?", a: "12 चंद्र माह का वर्ष सौर वर्ष से ~11 दिन छोटा है; इसलिए ~19 में से 7 वर्षों में 13वाँ माह जुड़ता है। चंद्र पक्ष से बदलते समय अधिक माह पर टिक करें।" },
        { q: "क्या तिथियाँ भेजी जाती हैं?", a: "नहीं। सब कुछ इसी ब्राउज़र में स्थानीय रहता है।" },
      ],
    ),
  },
  id: {
    name: "Konverter kalender Imlek",
    tagline: "Konversi antara tanggal Masehi dan kalender Imlek Tiongkok di browser Anda — dengan tahun GanZhi, zodiak, dan solar term. Gratis, instan, offline.",
    ...common(
      [
        "Konversi dua arah antara kalender Gregorian dan kalender Imlek Tiongkok tradisional. Masukkan tanggal Masehi apa pun untuk mendapatkan padanan Imleknya dengan tahun GanZhi dan hewan zodiak, atau masukkan tanggal Imlek — termasuk bulan kabisat — untuk menemukan hari Masehinya.",
        "Kalender Imlek mengaitkan bulan dengan fase bulan: satu tahun Imlek punya 12 atau 13 bulan, tambahannya adalah bulan kabisat yang muncul ~7 kali per 19 tahun. 24 solar term (jieqi) juga ditandai.",
        "Semuanya berjalan lokal di browser Anda dengan pustaka lunar-javascript — tanpa akun, tanpa unggahan, dan tanggal yang Anda periksa tidak pernah dikirim. Tahun ≈1900–2100.",
      ],
      [
        "Pilih arah: Masehi → Imlek atau Imlek → Masehi.",
        "Masukkan tanggal (centang Bulan kabisat bila mengonversi bulan kabisat dari sisi Imlek).",
        "Baca hasilnya — tahun GanZhi, zodiak, dan solar term hari itu ditampilkan bersama.",
      ],
      [
        { q: "Kapan tahun GanZhi berganti?", a: "Alat ini mengikuti Tahun Baru Imlek: tahun berganti pada hari ke-1 bulan pertama Imlek (konvensi almanak rakyat). Tradisi Lichun berbeda untuk tanggal antara Lichun dan Tahun Baru Imlek." },
        { q: "Apa itu bulan kabisat dan kapan muncul?", a: "Tahun Imlek 12 bulan ~11 hari lebih pendek dari tahun Masehi; ~7 dari 19 tahun mendapat bulan ke-13. Centang Bulan kabisat untuk tanggal-tanggal itu." },
        { q: "Apakah tanggal dikirim?", a: "Tidak. Semuanya tetap lokal di browser ini." },
      ],
    ),
  },
  vi: {
    name: "Chuyển đổi lịch âm dương",
    tagline: "Chuyển đổi giữa ngày dương và lịch âm Trung Quốc ngay trong trình duyệt — kèm năm Can Chi, con giáp và tiết khí. Miễn phí, tức thì, ngoại tuyến.",
    ...common(
      [
        "Chuyển đổi hai chiều giữa dương lịch và âm lịch Trung Quốc truyền thống. Nhập ngày dương bất kỳ để lấy ngày âm tương ứng kèm năm Can Chi và con giáp, hoặc nhập ngày âm — kể cả tháng nhuận — để tìm ngày dương tương ứng.",
        "Âm lịch gắn tháng với pha Mặt Trăng: một năm âm có 12 hoặc 13 tháng, tháng thêm là tháng nhuận, xuất hiện ~7 lần trong 19 năm. Công cụ cũng đánh dấu 24 tiết khí — thước đo mùa vụ của nông nghiệp và lễ hội truyền thống.",
        "Mọi thứ chạy cục bộ trong trình duyệt bằng thư viện lunar-javascript — không tài khoản, không tải lên, ngày bạn tra không rời khỏi máy. Năm ≈1900–2100.",
      ],
      [
        "Chọn chiều: Dương → Âm hoặc Âm → Dương.",
        "Nhập ngày (văn dấu Tháng nhuận khi đổi tháng nhuận từ phía âm lịch).",
        "Xem kết quả — năm Can Chi, con giáp và tiết khí của ngày được hiển thị cùng lúc.",
      ],
      [
        { q: "Năm Can Chi đổi khi nào?", a: "Công cụ này theo Tết Âm lịch: năm Can Chi đổi vào mùng 1 tháng chính (theo almanac dân gian). Truyền thống Lịch xuân khác cho các ngày giữa Lịch xuân và Tết." },
        { q: "Tháng nhuận là gì và xuất hiện bao lâu một lần?", a: "Năm âm 12 tháng ngắn hơn năm dương ~11 ngày; ~7 năm trong chu kỳ 19 năm có tháng thứ 13. Đánh dấu Tháng nhuận cho các ngày đó." },
        { q: "Ngày có bị gửi đi không?", a: "Không. Mọi thứ giữ nguyên trong trình duyệt này." },
      ],
    ),
  },
};
