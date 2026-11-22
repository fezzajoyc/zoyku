/**
 * CN-024 iban-validator 扩展语言 overlay(10 语)。
 */

import type { ToolCopy } from "./types";

function common(
  intro: [string, string, string],
  steps: [string, string, string],
  faqs: Array<{ q: string; a: string }>,
) {
  return { intro, steps, faqs };
}

export const IBAN_OVERLAYS: Record<string, ToolCopy> = {
  fr: {
    name: "Validateur et parser d'IBAN",
    tagline: "Validez et analysez des IBAN de 100 pays — longueurs par pays ISO 13616, contrôle MOD-97 ISO/IEC 7064, mode par lot avec détail pays/clé/BBAN. Gratuit, privé, hors ligne.",
    ...common(
      [
        "Un caractère erroné dans un virement international signifie un paiement retardé ou perdu. Ce validateur vérifie les IBAN exactement comme le prévoit la norme : le jeu de caractères, la longueur totale par pays du registre ISO 13616 (100 pays) et le contrôle de reste MOD-97-10 d'ISO/IEC 7064:2003 qui détecte toute substitution d'un seul caractère.",
        "Le mode par lot accepte un IBAN par ligne et renvoie, pour chaque entrée valide, le code pays, les deux chiffres de contrôle, le BBAN (partie banque et compte) et le format groupé par quatre attendu par les formulaires de paiement. Les entrées invalides reçoivent une raison précise au lieu d'un refus générique.",
        "Tout s'exécute localement dans votre navigateur : aucune interrogation des banques, aucune transmission de données de compte. Un IBAN structurellement valide ne prouve pas que le compte existe — seulement que le numéro est cohérent et correctement formé pour son pays.",
      ],
      [
        "Collez un IBAN par ligne — les espaces et tirets sont normalisés automatiquement.",
        "Cliquez sur Valider — chaque ligne reçoit un verdict avec le détail analysé.",
        "Pour les valides, copiez le format groupé canonique ; pour les invalides, lisez la raison précise et corrigez.",
      ],
      [
        { q: "Que prouve réellement un IBAN qui passe la validation ?", a: "Seulement que le numéro est bien formé : jeu de caractères correct, longueur correcte pour son pays, clé de contrôle correspondante. Cela ne prouve pas que le code banque existe, que le compte est ouvert ni que le bénéficiaire correspond. Pour les virements importants, confirmez l'IBAN avec le bénéficiaire par un autre canal." },
        { q: "Quels pays sont pris en charge ?", a: "Les 100 pays du registre ISO 13616, d'AD (Andorre) à XK (Kosovo), avec toute la couverture SEPA. Les États-Unis et la Chine ne participent pas au système IBAN et ne figurent donc pas au registre ; un IBAN commençant par US ou CN est invalide par définition." },
      ],
    ),
  },
  de: {
    name: "IBAN-Prüfer und Parser",
    tagline: "Prüfen und analysieren Sie IBANs aus 100 Ländern — ISO-13616-Länderlängen, MOD-97-Prüfung nach ISO/IEC 7064, Batch-Modus mit Aufschlüsselung von Land/Prüfziffern/BBAN. Kostenlos, privat, offline.",
    ...common(
      [
        "Ein falsches Zeichen in einer internationalen Überweisung bedeutet eine verzögerte oder verlorene Zahlung. Dieser Prüfer kontrolliert IBANs genau so, wie der Standard es vorsieht: den Zeichensatz, die länderspezifische Gesamtlänge aus dem ISO-13616-Register (100 Länder) und die MOD-97-10-Restprüfung nach ISO/IEC 7064:2003, die jede Ein-Zeichen-Vertauschung erkennt.",
        "Der Batch-Modus nimmt einen IBAN pro Zeile und liefert für jede gültige Eingabe den Ländercode, die zwei Prüfziffern, den BBAN (Bank- und Kontoteil) und das kanonische Vierer-Gruppenformat, das Zahlungsformulare erwarten. Ungültige Eingaben erhalten einen konkreten Grund statt einer pauschalen Ablehnung.",
        "Alles läuft lokal in Ihrem Browser: keine Bankabfragen, keine Übertragung von Kontodaten. Eine strukturell gültige IBAN beweist nicht, dass das Konto existiert — nur dass die Nummer in sich stimmig und für ihr Land korrekt gebildet ist.",
      ],
      [
        "Einen IBAN pro Zeile einfügen — Leerzeichen und Bindestriche werden automatisch normalisiert.",
        "Auf Prüfen klicken — jede Zeile erhält ein Urteil mit der analysierten Aufschlüsselung.",
        "Bei gültigen das kanonische Gruppenformat kopieren; bei ungültigen den konkreten Grund lesen und die Eingabe korrigieren.",
      ],
      [
        { q: "Was beweist eine bestandene IBAN-Prüfung wirklich?", a: "Nur, dass die Nummer wohlgeformt ist: korrekter Zeichensatz, korrekte Länge für ihr Land, passende Prüfsumme. Sie beweist nicht, dass die Bankleitzahl existiert, das Konto aktiv ist oder der Empfänger stimmt. Bei hohen Beträgen die IBAN über einen anderen Kanal mit dem Empfänger abgleichen." },
        { q: "Welche Länder werden unterstützt?", a: "Alle 100 Länder des ISO-13616-Registers, von AD (Andorra) bis XK (Kosovo), inklusive voller SEPA-Abdeckung. Die USA und China nehmen nicht am IBAN-System teil und sind daher nicht im Register; eine IBAN mit US oder CN ist per Definition ungültig." },
      ],
    ),
  },
  ru: {
    name: "Валидатор и парсер IBAN",
    tagline: "Проверяйте и разбирайте IBAN 100 стран — длины по странам ISO 13616, контроль MOD-97 по ISO/IEC 7064, пакетный режим с разбором страны/контрольных цифр/BBAN. Бесплатно, приватно, офлайн.",
    ...common(
      [
        "Ошибочный символ в международном переводе означает задержанный или потерянный платёж. Этот валидатор проверяет IBAN именно так, как задумано стандартом: набор символов, длину по стране из реестра ISO 13616 (100 стран) и проверку остатка MOD-97-10 по ISO/IEC 7064:2003, выявляющую любую односимвольную подстановку.",
        "Пакетный режим принимает один IBAN на строку и возвращает для каждой корректной записи код страны, две контрольные цифры, BBAN (часть банка и счёта) и канонический группированный формат по четыре символа, который ожидают платёжные формы. Некорректные записи получают конкретную причину вместо общего отказа.",
        "Всё выполняется локально в вашем браузере: никаких запросов к банкам, никакой передачи данных счёта. Структурно корректный IBAN не доказывает существование счёта — только что номер внутренне согласован и правильно сформирован для своей страны.",
      ],
      [
        "Вставьте один IBAN на строку — пробелы и дефисы нормализуются автоматически.",
        "Нажмите Проверить — каждая строка получает вердикт с разбором.",
        "Для корректных скопируйте канонический группированный формат; для некорректных прочитайте конкретную причину и исправьте ввод.",
      ],
      [
        { q: "Что на самом деле доказывает пройденный IBAN?", a: "Только что номер правильно сформирован: корректный набор символов, длина по стране, совпадающая контрольная сумма. Он не доказывает существование банковского кода, открытость счёта или совпадение получателя. Для крупных переводов сверьте IBAN с получателем по другому каналу." },
        { q: "Какие страны поддерживаются?", a: "Все 100 стран реестра ISO 13616, от AD (Андорра) до XK (Косово), включая весь охват SEPA. США и Китай не участвуют в системе IBAN и потому отсутствуют в реестре; IBAN на US или CN по определению недействителен." },
      ],
    ),
  },
  it: {
    name: "Validatore e parser IBAN",
    tagline: "Valida e analizza IBAN di 100 paesi — lunghezze per paese ISO 13616, controllo MOD-97 ISO/IEC 7064, modalità batch con dettaglio paese/cifre/BBAN. Gratuito, privato, offline.",
    ...common(
      [
        "Un carattere sbagliato in un bonifico internazionale significa un pagamento ritardato o perso. Questo validatore controlla gli IBAN esattamente come intende lo standard: il set di caratteri, la lunghezza totale per paese del registro ISO 13616 (100 paesi) e il controllo di resto MOD-97-10 di ISO/IEC 7064:2003 che rileva ogni sostituzione di un singolo carattere.",
        "La modalità batch accetta un IBAN per riga e restituisce, per ogni voce valida, il codice paese, le due cifre di controllo, il BBAN (parte banca e conto) e il formato raggruppato a quattro caratteri che i moduli di pagamento si aspettano. Le voci non valide ricevono un motivo specifico invece di un rifiuto generico.",
        "Tutto funziona localmente nel tuo browser: nessuna interrogazione delle banche, nessuna trasmissione di dati del conto. Un IBAN strutturalmente valido non prova che il conto esista — solo che il numero è internamente coerente e formato correttamente per il suo paese.",
      ],
      [
        "Incolla un IBAN per riga — spazi e trattini vengono normalizzati automaticamente.",
        "Clicca Valida — ogni riga riceve un verdetto con il dettaglio analizzato.",
        "Per le valide copia il formato raggruppato canonico; per le non valide leggi il motivo specifico e correggi.",
      ],
      [
        { q: "Cosa prova realmente un IBAN che supera la validazione?", a: "Solo che il numero è ben formato: set di caratteri corretto, lunghezza corretta per il suo paese e checksum corrispondente. Non prova che il codice banca esista, che il conto sia attivo o che il beneficiario corrisponda. Per bonifici di valore elevato, conferma l'IBAN con il beneficiario tramite un altro canale." },
        { q: "Quali paesi sono supportati?", a: "Tutti i 100 paesi del registro ISO 13616, da AD (Andorra) a XK (Kosovo), inclusa la copertura SEPA completa. USA e Cina non partecipano al sistema IBAN e quindi non sono nel registro; un IBAN che inizia con US o CN è invalido per definizione." },
      ],
    ),
  },
  tr: {
    name: "IBAN doğrulayıcı ve ayrıştırıcı",
    tagline: "100 ülkenin IBAN'larını doğrulayın ve ayrıştırın — ISO 13616 ülke uzunlukları, ISO/IEC 7064 MOD-97 kontrolü, ülke/kontrol hanesi/BBAN dökümlü toplu mod. Ücretsiz, özel, çevrimdışı.",
    ...common(
      [
        "Uluslararası havalede yanlış bir karakter, gecikmiş veya kayıp bir ödeme demektir. Bu doğrulayıcı, IBAN'ları standardın öngördüğü şekilde kontrol eder: karakter kümesi, ISO 13616 kayıt defterinden ülkeye özgü toplam uzunluk (100 ülke) ve her tek karakter ikamesini yakalayan ISO/IEC 7064:2003 MOD-97-10 kalan kontrolü.",
        "Toplu mod satır başına bir IBAN kabul eder ve her geçerli giriş için ülke kodunu, iki kontrol hanesini, BBAN'ı (banka ve hesap kısmı) ve ödeme formlarının beklediği dört karakterlik gruplanmış biçimi döndürür. Geçersiz girişler genel bir red yerine somut bir neden alır.",
        "Her şey tarayıcınızda yerel olarak çalışır: bankalara sorgu yok, hesap verisi iletimi yok. Yapısal olarak geçerli bir IBAN hesabın var olduğunu kanıtlamaz — yalnızca numaranın kendi içinde tutarlı ve ülkesi için doğru biçimli olduğunu gösterir.",
      ],
      [
        "Satır başına bir IBAN yapıştırın — boşluklar ve tireler otomatik normalleştirilir.",
        "Doğrula'ya tıklayın — her satır ayrıştırılmış dökümüyle birlikte bir karar alır.",
        "Geçerliler için kanonik gruplanmış biçimi kopyalayın; geçersizler için somut nedeni okuyup girişi düzeltin.",
      ],
      [
        { q: "Geçen bir IBAN gerçekte neyi kanıtlar?", a: "Yalnızca numaranın iyi biçimli olduğunu: doğru karakter kümesi, ülkesi için doğru uzunluk ve eşleşen sağlama. Banka kodunun var olduğunu, hesabın açık olduğunu veya alıcının eşleştiğini kanıtlamaz. Yüksek tutarlı havalelerde IBAN'ı alıcıyla ayrı bir kanaldan teyit edin." },
        { q: "Hangi ülkeler destekleniyor?", a: "ISO 13616 kayıt defterindeki 100 ülkenin tamamı, AD (Andorra) ile XK (Kosova) arası, SEPA kapsamı dahil. ABD ve Çin IBAN sistemine katılmaz ve bu yüzden kayıtta yoktur; US veya CN ile başlayan bir IBAN tanım gereği geçersizdir." },
      ],
    ),
  },
  ko: {
    name: "IBAN 검증·파서",
    tagline: "100개국 IBAN을 검증하고 해석합니다 — ISO 13616 국가별 길이, ISO/IEC 7064 MOD-97 검사, 국가/검증숫자/BBAN 분해가 포함된 일괄 모드. 무료 · 프라이빗 · 오프라인 작동.",
    ...common(
      [
        "국제 송금에서 한 글자만 틀려도 결제가 지연되거나 사라질 수 있습니다. 이 검증기는 표준이 의도한 방식 그대로 IBAN을 검사합니다: 문자 집합, ISO 13616 레지스트리의 국가별 전체 길이(100개국), 모든 단일 문자 치환을 잡아내는 ISO/IEC 7064:2003의 MOD-97-10 나머지 검사.",
        "일괄 모드는 한 줄에 하나의 IBAN을 받아 유효한 항목에 대해 국가 코드, 두 자리 검증숫자, BBAN(은행+계좌 부분), 결제 양식이 기대하는 네 자리 묶음 표준 형식을 반환합니다. 무효 항목에는 일반적인 거절 대신 구체적인 이유가 표시됩니다.",
        "모든 것이 브라우저에서 로컬로 수행됩니다: 은행 조회도 계좌 데이터 전송도 없습니다. 구조적으로 유효한 IBAN이 계좌의 실존을 증명하지는 않습니다 — 번호가 내부적으로 일관되고 해당 국가 형식에 맞다는 것만 보여줍니다.",
      ],
      [
        "한 줄에 하나의 IBAN을 붙여넣으세요 — 공백과 하이픈은 자동으로 정규화됩니다.",
        "검증을 클릭하세요 — 각 줄에 판정과 해석 내역이 표시됩니다.",
        "유효 항목은 표준 묶음 형식을 복사하고, 무효 항목은 구체적 이유를 읽고 입력을 수정하세요.",
      ],
      [
        { q: "통과한 IBAN이 실제로 증명하는 것은?", a: "번호가 올바르게 구성되었다는 것뿐입니다: 문자 집합이 맞고, 국가 길이에 맞으며, 체크섬이 일치합니다. 은행 코드의 존재, 계좌 개설 여부, 수취인 일치는 증명하지 않습니다. 고액 송금 시에는 다른 경로로 수취인과 IBAN을 확인하세요." },
        { q: "어떤 국가가 지원되나요?", a: "ISO 13616 레지스트리의 전체 100개국, AD(안도라)부터 XK(코소보)까지 SEPA 전체 포함. 미국과 중국은 IBAN 시스템에 참여하지 않아 레지스트리에 없습니다. US 또는 CN으로 시작하는 IBAN은 정의상 무효입니다." },
      ],
    ),
  },
  ar: {
    name: "مدقق ومحلل IBAN",
    tagline: "دقّق وحلّل أرقام IBAN من 100 دولة — أطوال ISO 13616 لكل دولة، فحص MOD-97 وفق ISO/IEC 7064، وضع دفعات مع تفصيل الدولة/أرقام التحقق/BBAN. مجاني وخاص ويعمل دون اتصال.",
    ...common(
      [
        "حرف خاطئ واحد في حوالة دولية يعني دفعة متأخرة أو مفقودة. يفحص هذا المدقق أرقام IBAN تمامًا كما يقصد المعيار: مجموعة الأحرف، الطول الكلي لكل دولة من سجل ISO 13616 (100 دولة)، وفحص الباقي MOD-97-10 وفق ISO/IEC 7064:2003 الذي يكشف كل استبدال لحرف واحد.",
        "وضع الدفعات يقبل IBAN واحدًا لكل سطر ويعيد لكل إدخال صالح رمز الدولة، ورقمي التحقق، وBBAN (جزء البنك والحساب)، والتنسيق المجمّع رباعي الأحرف الذي تتوقعه نماذج الدفع. الإدخالات غير الصالحة تحصل على سبب محدد بدلًا من رفض عام.",
        "كل شيء يعمل محليًا في متصفحك: لا استعلامات للبنوك، ولا إرسال لبيانات الحساب. ملاحظة: IBAN صالح بنويًا لا يثبت وجود الحساب — فقط أن الرقم متسق داخليًا ومكوّن بشكل صحيح لبلده.",
      ],
      [
        "الصق IBAN واحدًا لكل سطر — تُعالَج المسافات والشرطات تلقائيًا.",
        "انقر على دقّق — يحصل كل سطر على حكم مع تفصيل التحليل.",
        "للصالحة انسخ التنسيق المجمّع القياسي؛ ولغير الصالحة اقرأ السبب المحدد وصحّح الإدخال.",
      ],
      [
        { q: "ما الذي يثبته IBAN ناجح فعلًا؟", a: "فقط أن الرقم مكتوب بشكل سليم: مجموعة أحرف صحيحة، وطول مطابق لبلده، ومجموع تحقق متطابق. لا يثبت وجود رمز البنك، أو أن الحساب مفتوح، أو أن المستفيد مطابق. للتحويلات عالية القيمة أكّد IBAN مع المستفيد عبر قناة أخرى." },
        { q: "ما الدول المدعومة؟", a: "جميع دول سجل ISO 13616 البالغ عددها 100، من AD (أندورا) إلى XK (كوسوفو)، مع تغطية SEPA كاملة. الولايات المتحدة والصين لا تشاركان في نظام IBAN ولهما ليستا في السجل؛ وIBAN يبدأ بـ US أو CN باطل بالتعريف." },
      ],
    ),
  },
  hi: {
    name: "IBAN वैलिडेटर और पार्सर",
    tagline: "100 देशों के IBAN सत्यापित और पार्स करें — ISO 13616 देश-वार लंबाई, ISO/IEC 7064 MOD-97 जाँच, देश/चेक-अंक/BBAN विवरण सहित बैच मोड। मुफ़्त, निजी, ऑफ़लाइन।",
    ...common(
      [
        "अंतरराष्ट्रीय ट्रांसफ़र में एक गलत अक्षर का मतलब है देरी या खोया हुआ भुगतान। यह वैलिडेटर IBAN को बिल्कुल मानक के इरादे के मुताबिक जाँचता है: कैरेक्टर सेट, ISO 13616 रजिस्टर की देश-वार लंबाई (100 देश), और ISO/IEC 7064:2003 का MOD-97-10 शेषफल जाँच जो हर एक-अक्षर बदलाव पकड़ लेती है।",
        "बैच मोड हर लाइन में एक IBAN लेता है और हर मान्य प्रविष्टि के लिए देश कोड, दो चेक अंक, BBAN (बैंक+खाता भाग) और पेमेंट फ़ॉर्म की अपेक्षित चार-अक्षर समूहित मानक फ़ॉर्मैट देता है। अमान्य प्रविष्टियों को सामान्य अस्वीकृति की जगह ठोस कारण मिलता है।",
        "सब कुछ आपके ब्राउज़र में स्थानीय रूप से चलता है: बैंकों से कोई पूछताछ नहीं, खाता डेटा का कोई ट्रांसमिशन नहीं। संरचनात्मक रूप से मान्य IBAN खाते के अस्तित्व को साबित नहीं करता — केवल कि नंबर आंतरिक रूप से सुसंगत और उसके देश के लिए सही बना है।",
      ],
      [
        "हर लाइन में एक IBAN पेस्ट करें — स्पेस और डैश अपने-आप नॉर्मलाइज़ होते हैं।",
        "Validate पर क्लिक करें — हर लाइन को पार्स किए गए विवरण के साथ निर्णय मिलता है।",
        "मान्य के लिए मानक समूहित फ़ॉर्मैट कॉपी करें; अमान्य के लिए ठोस कारण पढ़कर इनपुट सुधारें।",
      ],
      [
        { q: "पास हुआ IBAN वास्तव में क्या साबित करता है?", a: "केवल यह कि नंबर सही बना है: कैरेक्टर सेट सही, देश की लंबाई सही, चेकसम मेल खाता। यह साबित नहीं करता कि बैंक कोड मौजूद है, खाता खुला है, या प्राप्तकर्ता मेल खाता है। बड़ी रकम के ट्रांसफ़र में IBAN प्राप्तकर्ता से दूसरे माध्यम से पुष्टि करें।" },
        { q: "कौन से देश समर्थित हैं?", a: "ISO 13616 रजिस्टर के पूरे 100 देश, AD (एंडोरा) से XK (कोसोवो) तक, पूरी SEPA कवरेज सहित। अमेरिका और चीन IBAN सिस्टम में भाग नहीं लेते, इसलिए रजिस्टर में नहीं हैं; US या CN से शुरू होने वाला IBAN परिभाषा से अमान्य है।" },
      ],
    ),
  },
  id: {
    name: "Validator dan parser IBAN",
    tagline: "Validasi dan analisis IBAN dari 100 negara — panjang per negara ISO 13616, pemeriksaan MOD-97 ISO/IEC 7064, mode batch dengan rincian negara/digit-check/BBAN. Gratis, privat, offline.",
    ...common(
      [
        "Satu karakter salah dalam transfer internasional berarti pembayaran tertunda atau hilang. Validator ini memeriksa IBAN persis seperti maksud standarnya: set karakter, panjang total per negara dari registri ISO 13616 (100 negara), dan pemeriksaan sisa MOD-97-10 dari ISO/IEC 7064:2003 yang menangkap setiap substitusi satu karakter.",
        "Mode batch menerima satu IBAN per baris dan mengembalikan, untuk setiap entri valid, kode negara, dua digit check, BBAN (bagian bank dan akun), dan format terkelompok empat karakter yang diharapkan formulir pembayaran. Entri tidak valid mendapat alasan spesifik alih-alih penolakan umum.",
        "Semuanya berjalan lokal di browser Anda: tanpa kueri ke bank, tanpa transmisi data akun. IBAN yang valid secara struktural tidak membuktikan akunnya ada — hanya bahwa nomornya konsisten secara internal dan terbentuk benar untuk negaranya.",
      ],
      [
        "Tempel satu IBAN per baris — spasi dan tanda hubung dinormalisasi otomatis.",
        "Klik Validasi — setiap baris mendapat vonis dengan rincian yang dianalisis.",
        "Untuk yang valid, salin format terkelompok kanonik; untuk yang tidak valid, baca alasan spesifiknya dan perbaiki input.",
      ],
      [
        { q: "Apa yang sebenarnya dibuktikan IBAN yang lolos?", a: "Hanya bahwa nomornya terbentuk dengan benar: set karakter benar, panjang benar untuk negaranya, checksum cocok. Tidak membuktikan kode bank ada, akun aktif, atau penerima cocok. Untuk transfer bernilai besar, konfirmasi IBAN dengan penerima melalui kanal lain." },
        { q: "Negara mana yang didukung?", a: "Semua 100 negara dalam registri ISO 13616, dari AD (Andorra) hingga XK (Kosovo), termasuk cakupan SEPA penuh. AS dan Tiongkok tidak ikut sistem IBAN sehingga tidak ada dalam registri; IBAN yang diawali US atau CN tidak valid berdasarkan definisi." },
      ],
    ),
  },
  vi: {
    name: "Trình xác thực và phân tích IBAN",
    tagline: "Xác thực và phân tích IBAN của 100 quốc gia — độ dài theo quốc gia ISO 13616, kiểm tra MOD-97 ISO/IEC 7064, chế độ hàng loạt kèm chi tiết quốc gia/số kiểm tra/BBAN. Miễn phí, riêng tư, ngoại tuyến.",
    ...common(
      [
        "Một ký tự sai trong chuyển khoản quốc tế đồng nghĩa với thanh toán chậm trễ hoặc mất mát. Trình xác thực này kiểm tra IBAN đúng như tiêu chuẩn hướng đến: tập ký tự, độ dài tổng theo quốc gia từ sổ đăng ký ISO 13616 (100 quốc gia), và phép kiểm tra phần dư MOD-97-10 của ISO/IEC 7064:2003 phát hiện mọi sự thay thế một ký tự.",
        "Chế độ hàng loạt nhận một IBAN mỗi dòng và trả về, cho mỗi mục hợp lệ, mã quốc gia, hai chữ số kiểm tra, BBAN (phần ngân hàng và tài khoản) và định dạng nhóm bốn ký tự chuẩn mà các biểu mẫu thanh toán mong đợi. Mục không hợp lệ nhận lý do cụ thể thay vì từ chối chung chung.",
        "Mọi thứ chạy cục bộ trong trình duyệt của bạn: không tra cứu ngân hàng, không truyền dữ liệu tài khoản. Lưu ý IBAN hợp lệ về cấu trúc không chứng minh tài khoản tồn tại — chỉ chứng minh số đó nhất quán nội bộ và đúng định dạng của quốc gia.",
      ],
      [
        "Dán một IBAN mỗi dòng — khoảng trắng và gạch nối được chuẩn hóa tự động.",
        "Nhấp Xác thực — mỗi dòng nhận phán quyết kèm chi tiết đã phân tích.",
        "Với mục hợp lệ, sao chép định dạng nhóm chuẩn; với mục không hợp lệ, đọc lý do cụ thể và sửa dữ liệu.",
      ],
      [
        { q: "Một IBAN đạt xác thực thực sự chứng minh điều gì?", a: "Chỉ chứng minh số được tạo đúng: tập ký tự đúng, độ dài đúng theo quốc gia, checksum khớp. Không chứng minh mã ngân hàng tồn tại, tài khoản còn hoạt động hay người nhận khớp. Với chuyển khoản giá trị cao, xác nhận IBAN với người thụ hưởng qua kênh khác." },
        { q: "Những quốc gia nào được hỗ trợ?", a: "Tất cả 100 quốc gia trong sổ đăng ký ISO 13616, từ AD (Andorra) đến XK (Kosovo), bao gồm toàn bộ SEPA. Mỹ và Trung Quốc không tham gia hệ thống IBAN nên không có trong sổ; IBAN bắt đầu bằng US hoặc CN vô hiệu theo định nghĩa." },
      ],
    ),
  },
};
