/**
 * CN-027 sm4-encrypt 扩展语言 overlay(10 语)。
 */

import type { ToolCopy } from "./types";

function common(
  intro: [string, string, string],
  steps: [string, string, string],
  faqs: Array<{ q: string; a: string }>,
) {
  return { intro, steps, faqs };
}

export const SM4_OVERLAYS: Record<string, ToolCopy> = {
  fr: {
    name: "Chiffrement et déchiffrement SM4",
    tagline: "Chiffrez et déchiffrez du texte avec SM4 (GB/T 32907-2016), la chiffreuse par blocs de 128 bits du standard national chinois — modes ECB et CBC, clés hex, implémentation validée par le vecteur du standard. Gratuit, privé, hors ligne.",
    ...common(
      [
        "SM4 est la chiffreuse par blocs symétrique du suite de cryptographie commerciale chinoise : clés et blocs de 128 bits, la contrepartie du hachage SM3 et des signatures SM2. Elle est obligatoire dans les systèmes chinois de gouvernement, finance et scellement électronique lorsqu'une chiffreuse symétrique est requise aux côtés des primitives asymétriques de la série SM.",
        "Cet outil prend en charge les modes ECB et CBC avec des clés hexadécimales de 128 bits (CBC ajoute un IV de 32 hex). L'implémentation suit GB/T 32907-2016 exactement — le vecteur de test de l'annexe A du standard la valide — et traite du texte UTF-8 directement, renvoyant le chiffrement en hexadécimal.",
        "ECB et CBC n'embarquent pas de balise d'authentification, donc un chiffrement corrompu ou falsifié n'est pas détectable par le seul déchiffrement ; associez le résultat à HMAC-SM3 quand l'intégrité compte. Tout tourne localement avec la bibliothèque sm-crypto — clés et texte en clair ne quittent jamais cet onglet.",
      ],
      [
        "Choisissez Chiffrer ou Déchiffrer, et le mode (ECB sans IV, CBC avec un IV de 32 hex).",
        "Saisissez la clé 128 bits en 32 caractères hexadécimaux, et le texte — pour déchiffrer, collez le chiffrement hexadécimal.",
        "Cliquez sur Exécuter — le résultat apparaît avec un bouton de copie ; clés, IV et longueurs invalides sont explicitement rejetés.",
      ],
      [
        { q: "SM4 ou AES — lequel utiliser ?", a: "Suivez votre exigence de conformité : les schémas chinois de cryptographie commerciale (évaluation, gouvernment, scellement électronique) imposent SM4, tandis que les systèmes internationaux utilisent AES par défaut. Aucun n'est plus faible à taille de clé égale ; ce sont simplement des écosystèmes différents. L'interopérabilité décide — une contrepartie attendant SM4 ne peut pas lire votre charge AES." },
        { q: "Pourquoi pas de balise d'authentification comme AES-GCM ?", a: "Les modes ECB et CBC que cette page propose sont de la seule confidentialité ; la construction authentifiée du standard chinois est construite au-dessus avec HMAC-SM3. Si la détection de falsification compte, calculez HMAC-SM3 sur le chiffrement avec une clé séparée et vérifiez avant de déchiffrer." },
      ],
    ),
  },
  de: {
    name: "SM4 Verschlüsselung & Entschlüsselung",
    tagline: "Verschlüsseln und entschlüsseln Sie Text mit SM4 (GB/T 32907-2016), der chinesischen nationalen 128-Bit-Blockchiffre — ECB- und CBC-Modi, Hex-Schlüssel, mit dem Standardvektor validierte Implementierung. Kostenlos, privat, offline.",
    ...common(
      [
        "SM4 ist die symmetrische Blockchiffre der chinesischen Handelskryptographie-Suite: 128-Bit-Schlüssel und Blöcke, das Gegenstück zu SM3-Hashing und SM2-Signaturen. Sie ist in chinesischen Regierungs-, Finanz- und E-Siegel-Systemen vorgeschrieben, wo eine symmetrische Chiffre neben den asymmetrischen SM-Primitiven benötigt wird.",
        "Dieses Tool unterstützt ECB- und CBC-Modi mit 128-Bit-Hex-Schlüsseln (CBC fügt einen 32-Hex-IV hinzu). Die Implementierung folgt GB/T 32907-2016 exakt — der Standard-Testvektor aus Anhang A validiert sie — und verarbeitet UTF-8-Text direkt, mit Hex-Chiffretext als Ausgabe.",
        "ECB und CBC tragen keinen Authentifizierungs-Tag, daher ist Manipulation allein durch Entschlüsseln nicht erkennbar; kombinieren Sie mit HMAC-SM3, wenn Integrität zählt. Alles läuft lokal mit der sm-crypto-Bibliothek — Schlüssel und Klartext verlassen diesen Tab nie.",
      ],
      [
        "Wählen Sie Verschlüsseln oder Entschlüsseln und den Modus (ECB ohne IV, CBC mit 32-Hex-IV).",
        "Geben Sie den 128-Bit-Schlüssel als 32 Hex-Zeichen und den Text ein — zum Entschlüsseln den Hex-Chiffretext einfügen.",
        "Auf Ausführen klicken — das Ergebnis erscheint mit Kopierbutton; ungültige Schlüssel, IVs und Längen werden explizit abgelehnt.",
      ],
      [
        { q: "SM4 oder AES — was soll ich verwenden?", a: "Folgen Sie Ihrer Compliance-Anforderung: Chinesische Handelskryptographie-Schemata (Bewertung, Regierung, E-Siegel-Workflows) schreiben SM4 vor, internationale Systeme nutzen AES als Standard. Keines ist bei gleicher Schlüssellänge schwächer; es sind einfach verschiedene Ökosysteme. Interoperabilität entscheidet — eine Gegenstelle, die SM4 erwartet, kann Ihre AES-Nutzlast nicht lesen." },
        { q: "Warum keinen Authentifizierungs-Tag wie AES-GCM?", a: "Die ECB- und CBC-Modi dieser Seite sind reine Vertraulichkeit; die authentifizierte Konstruktion des chinesischen Standards wird mit HMAC-SM3 darüber aufgebaut. Wenn Manipulationserkennung zählt, berechnen Sie HMAC-SM3 über den Chiffretext mit einem separaten Schlüssel und prüfen vor der Entschlüsselung." },
      ],
    ),
  },
  ru: {
    name: "Шифрование и дешифрование SM4",
    tagline: "Шифруйте и дешифруйте текст с SM4 (GB/T 32907-2016) — 128-битный блочный шифр китайского национального стандарта, режимы ECB и CBC, hex-ключи, реализация проверена стандартным вектором. Бесплатно, приватно, офлайн.",
    ...common(
      [
        "SM4 — симметричный блочный шифр китайского набора коммерческой криптографии: 128-битные ключи и блоки, пара к хешированию SM3 и подписям SM2. Он обязателен в китайских государственных, финансовых системах и электронных печатях, где требуется симметричный шифр рядом с асимметричными примитивами серии SM.",
        "Этот инструмент поддерживает режимы ECB и CBC с 128-битными hex-ключами (CBC добавляет IV из 32 hex). Реализация точно следует GB/T 32907-2016 — стандартный тестовый вектор из приложения A подтверждает её — и обрабатывает UTF-8 текст напрямую, возвращая hex-шифртекст.",
        "ECB и CBC не несут тега аутентификации, поэтому повреждение или подделка шифртекста не обнаруживаются одним лишь дешифрованием; сочетайте с HMAC-SM3, когда важна целостность. Всё работает локально через библиотеку sm-crypto — ключи и открытый текст никогда не покидают эту вкладку.",
      ],
      [
        "Выберите Шифрование или Дешифрование и режим (ECB без IV, CBC с IV из 32 hex).",
        "Введите 128-битный ключ как 32 hex-символа и текст — для дешифрования вставьте hex-шифртекст.",
        "Нажмите Выполнить — результат появится ниже с кнопкой копирования; неверные ключи, IV и длины явно отвергаются.",
      ],
      [
        { q: "SM4 или AES — что использовать?", a: "Следуйте вашему требованию соответствия: китайские схемы коммерческой криптографии (оценка, госсектор, электронные печати) предписывают SM4, международные системы по умолчанию используют AES. При одинаковой длине ключа ни один не слабее; это просто разные экосистемы. Решает совместимость — контрагент, ожидающий SM4, не прочитает вашу AES-нагрузку." },
        { q: "Почему нет тега аутентификации как в AES-GCM?", a: "Режимы ECB и CBC, которые предлагает эта страница, обеспечивают только конфиденциальность; аутентифицированная конструкция китайского стандарта строится поверх с помощью HMAC-SM3. Если важно обнаружение подделки, вычислите HMAC-SM3 над шифртекстом отдельным ключом и проверьте перед дешифрованием." },
      ],
    ),
  },
  it: {
    name: "Cifratura e decifratura SM4",
    tagline: "Cifra e decifra testo con SM4 (GB/T 32907-2016), la cifra a blocchi di 128 bit dello standard nazionale cinese — modalità ECB e CBC, chiavi hex, implementazione validata con il vettore dello standard. Gratuito, privato, offline.",
    ...common(
      [
        "SM4 è la cifra a blocchi simmetrica del suite di crittografia commerciale cinese: chiavi e blocchi a 128 bit, la controparte dell'hashing SM3 e delle firme SM2. È obbligatoria nei sistemi cinesi di governo, finanza e sigilli elettronici dove serve una cifra simmetrica accanto alle primitive asimmetriche della serie SM.",
        "Questo strumento supporta le modalità ECB e CBC con chiavi esadecimali a 128 bit (CBC aggiunge un IV di 32 hex). L'implementazione segue GB/T 32907-2016 esattamente — il vettore di test dell'Allegato A dello standard la valida — e elabora testo UTF-8 direttamente, restituendo cifrato esadecimale.",
        "ECB e CBC non hanno tag di autenticazione, quindi un cifrato corrotto o manomesso non è rilevabile solo decifrando; abbinalo a HMAC-SM3 quando l'integrità conta. Tutto gira localmente con la libreria sm-crypto — chiavi e testo in chiaro non lasciano mai questa scheda.",
      ],
      [
        "Scegli Cifra o Decifra, e la modalità (ECB senza IV, CBC con un IV di 32 hex).",
        "Inserisci la chiave a 128 bit come 32 caratteri esadecimali, e il testo — per decifrare, incolla il cifrato esadecimale.",
        "Clicca Esegui — il risultato appare sotto con pulsante di copia; chiavi, IV e lunghezze non validi vengono rifiutati esplicitamente.",
      ],
      [
        { q: "SM4 o AES — quale usare?", a: "Segui il tuo requisito di conformità: gli schemi cinesi di crittografia commerciale (valutazione, governo, flussi di sigilli elettronici) impongono SM4, mentre i sistemi internazionali usano AES di default. Nessuno è più debole alla stessa dimensione di chiave; sono semplicemente ecosistemi diversi. L'interoperabilità decide — una controparte che si aspetta SM4 non può leggere il tuo payload AES." },
        { q: "Perché nessun tag di autenticazione come AES-GCM?", a: "Le modalità ECB e CBC che questa pagina offre sono solo di confidenzialità; la costruzione autenticata dello standard cinese è costruita sopra con HMAC-SM3. Se il rilevamento di manomissioni conta, calcola HMAC-SM3 sul cifrato con una chiave separata e verifica prima di decifrare." },
      ],
    ),
  },
  tr: {
    name: "SM4 şifreleme ve çözme",
    tagline: "Metni SM4 (GB/T 32907-2016) ile şifreleyin ve çözün — Çin ulusal standardının 128 bit blok şifresi, ECB ve CBC modları, hex anahtarlar, standart vektörle doğrulanmış uygulama. Ücretsiz, özel, çevrimdışı.",
    ...common(
      [
        "SM4, Çin ticari kriptografi setinin simetrik blok şifresidir: 128 bit anahtar ve blok, SM3 hash'i ve SM2 imzalarının karşılığıdır. Simetrik bir şifrenin SM serisi asimetrik primitiflerin yanında gerektiği Çin devlet, finans ve e-mühür sistemlerinde zorunludur.",
        "Bu araç, 128 bit hex anahtarlarla ECB ve CBC modlarını destekler (CBC 32 hex IV ekler). Uygulama GB/T 32907-2016'ı tam olarak izler — standardın Ek A test vektörü onu doğrular — ve UTF-8 metni doğrudan işleyip onaltılık şifreli metin döndürür.",
        "ECB ve CBC kimlik doğrulama etiketi taşımaz, bu yüzden bozuk veya kurcalanmış şifreli metin yalnızca çözülerek algılanamaz; bütünlük önemliyse HMAC-SM3 ile eşleştirin. Her şey sm-crypto kütüphanesiyle yerelde çalışır — anahtarlar ve düz metin bu sekmeden asla çıkmaz.",
      ],
      [
        "Şifrele veya Çöz'ü ve modu seçin (ECB IV'süz, CBC 32 hex IV ile).",
        "128 bit anahtarı 32 onaltılık karakter olarak girin ve metni girin — çözmek için onaltılık şifreli metni yapıştırın.",
        "Çalıştır'a tıklayın — sonuç aşağıda kopyalama düğmesiyle görünür; geçersiz anahtar, IV ve uzunluklar açıkça reddedilir.",
      ],
      [
        { q: "SM4 mü AES mi — hangisini kullanmalıyım?", a: "Uyumluluk gereksiniminizi izleyin: Çin ticari kriptografi şemaları (değerlendirme, devlet, e-mühür akışları) SM4'ü zorunlu kılar, uluslararası sistemler varsayılan olarak AES kullanır. Aynı anahtar boyutunda hiçbiri daha zayıf değildir; sadece farklı ekosistemlerdir. Birlikte çalışabilirlik karar verir — SM4 bekleyen karşı taraf AES yükünüzü okuyamaz." },
        { q: "Neden AES-GCM gibi kimlik doğrulama etiketi yok?", a: "Bu sayfanın sunduğu ECB ve CBC modları yalnızca gizlilik içindir; Çin standardının kimlik doğrulamalı yapısı üzerine HMAC-SM3 ile inşa edilir. Kurcalama algılaması önemliyse ayrı bir anahtarla şifreli metnin HMAC-SM3'ünü hesaplayın ve çözmekten önce doğrulayın." },
      ],
    ),
  },
  ko: {
    name: "SM4 암호화·복호화",
    tagline: "SM4(GB/T 32907-2016), 중국 국가표준 128비트 블록 암호로 텍스트를 암호화·복호화합니다 — ECB/CBC 모드, hex 키, 표준 벡터 검증 구현. 무료 · 프라이빗 · 오프라인 작동.",
    ...common(
      [
        "SM4는 중국 상용 암호 스위트의 대칭 블록 암호입니다: 128비트 키와 블록으로, SM3 해시·SM2 서명의 짝이며, 대칭 암호가 SM 시리즈 비대칭 프리미티브와 함께 요구되는 중국 정부·금융·전자도장 시스템에서 필수입니다.",
        "이 도구는 128비트 16진 키를 사용하는 ECB와 CBC 모드를 지원합니다(CBC는 32자리 16진 IV 추가). 구현은 GB/T 32907-2016을 정확히 따르며 — 표준 부속서 A 테스트 벡터가 검증 — UTF-8 텍스트를 직접 처리해 16진 암호문을 반환합니다.",
        "ECB와 CBC는 인증 태그가 없어 복호화만으로 변조를 감지할 수 없습니다. 무결성이 중요하면 HMAC-SM3과 결합하세요. 모든 것이 sm-crypto 라이브러리로 로컬 실행됩니다 — 키와 평문은 이 탭을 떠나지 않습니다.",
      ],
      [
        "암호화 또는 복호화와 모드를 선택하세요(ECB는 IV 없음, CBC는 32자리 16진 IV).",
        "128비트 키를 32자리 16진수로 입력하고 텍스트를 입력하세요 — 복호화 시 16진 암호문을 붙여넣습니다.",
        "실행을 클릭하세요 — 결과가 아래에 표시되고 복사 버튼이 있습니다. 잘못된 키·IV·암호문 길이는 명시적으로 거부됩니다.",
      ],
      [
        { q: "SM4 vs AES — 어느 것을 써야 하나요?", a: "컴플라이언스 요건을 따르세요: 중국 상용 암호 체계(평가·정부·전자도장 워크플로)는 SM4를 강제하고, 국제 시스템은 기본값으로 AES를 씁니다. 같은 키 길이에서 어느 쪽이 더 약하지 않습니다; 생태계가 다를 뿐입니다. 상호 운용이 결정합니다 — SM4를 기대하는 상대는 당신의 AES 페이로드를 읽을 수 없습니다." },
        { q: "AES-GCM 같은 인증 태그가 없는 이유는?", a: "이 페이지가 제공하는 ECB와 CBC는 기밀성만 담당합니다. 중국 표준 체계의 인증 구조는 그 위에 HMAC-SM3로 구축됩니다. 변조 감지가 중요하면 별도 키로 암호문의 HMAC-SM3을 계산하고 복호화 전에 검증하세요." },
      ],
    ),
  },
  ar: {
    name: "تشفير وفك تشفير SM4",
    tagline: "شفّر وفك تشفير النص بـ SM4 (GB/T 32907-2016)، تشفير الكتل بـ 128 بت من المعيار الوطني الصيني — وضعا ECB وCBC، مفاتيح hex، تنفيذ موثق بمتجه المعيار. مجاني وخاص ويعمل دون اتصال.",
    ...common(
      [
        "SM4 هو تشفير الكتل المتماثل في مجموعة التشفير التجاري الصيني: مفاتيح وكتل بـ 128 بت، ونظير لتجزئة SM3 وتوقيعات SM2. وهو إلزامي في أنظمة الحكومة والمالية والأختام الإلكترونية الصينية حيث يُطلب تشفير متماثل بجانب مبدّئات السلسلة SM غير المتماثلة.",
        "تدعم هذه الأداة وضعي ECB وCBC بمفاتيح hex بطول 128 بت (يضيف CBC ع IV بطول 32 hex). يتبع التنفيذ GB/T 32907-2016 بدقة — متجه الاختبار من الملحق A للمعيار يؤكده — ويعالج نص UTF-8 مباشرة ويعيد النص المشفر hex.",
        "لا يحمل ECB وCBC وسم مصادقة، فالنص المشفر التالف أو المعبث لا يُكتشف بالفك وحده؛ اربطه مع HMAC-SM3 عندما تهم السلامة. كل شيء يعمل محليًا عبر مكتبة sm-crypto — المفاتيح والنص الصريح لا يتركان هذه التبويبة أبدًا.",
      ],
      [
        "اختر تشفير أو فك تشفير، والوضع (ECB بلا IV، CBC مع IV بطول 32 hex).",
        "أدخل مفتاح 128 بت كـ 32 حرفًا سداسيًا عشريًا والنص — لفك التشفير الصق النص المشفر hex.",
        "انقر على نفّذ — تظهر النتيجة أدناه مع زر نسخ؛ المفاتيح وIV والأطوال غير الصالحة تُرفض صراحة.",
      ],
      [
        { q: "SM4 أم AES — أيهما أستخدم؟", a: "اتبع متطلب الامتثال: مخططات التشفير التجاري الصيني (التقييم والحكومة والأختام الإلكترونية) تفرض SM4، بينما الأنظمة الدولية تستخدم AES افتراضيًا. لا أحد أضعف بنفس طول المفتاح؛ هما مجرد منظومتان مختلفتان. التوافقية تحسم — الطرف المنتظر SM4 لا يقرأ حمولة AES." },
        { q: "لماذا لا يوجد وسم مصادقة مثل AES-GCM؟", a: "وضعا ECB وCBC اللذان تقدمهما هذه الصفحة للسرية فقط؛ البنية المصادقة للمعيار الصيني تُبنى فوقها بـ HMAC-SM3. إذا كان كشف العبث مهمًا، احسب HMAC-SM3 للنص المشفر بمفتاح منفصل وتحقق قبل فك التشفير." },
      ],
    ),
  },
  hi: {
    name: "SM4 कूटलेखन और विकूटलेखन",
    tagline: "SM4 (GB/T 32907-2016), चीनी राष्ट्रीय मानक 128-बिट ब्लॉक सिफर से टेक्स्ट कूटलेखित और विकूटलेखित करें — ECB/CBC मोड, hex कुंजियाँ, मानक-वेक्टर-सत्यापित इम्प्लीमेंटेशन। मुफ़्त, निजी, ऑफ़लाइन।",
    ...common(
      [
        "SM4 चीनी वाणिज्यिक क्रिप्टोग्राफ़ी सुइट का सममित ब्लॉक सिफर है: 128-बिट कुंजियाँ और ब्लॉक, SM3 हैशिंग और SM2 हस्ताक्षरों की जोड़ी। चीनी सरकारी, वित्त और ई-सील सिस्टमों में यह अनिवार्य है जहाँ SM-सीरीज़ असममित प्रिमिटिव के साथ सममित सिफर चाहिए।",
        "यह टूल 128-बिट हेक्स कुंजियों के साथ ECB और CBC मोड समर्थन करता है (CBC में 32-hex IV जुड़ता है)। इम्प्लीमेंटेशन GB/T 32907-2016 का सटीक पालन करता है — मानक के परिशिष्ट A का टेस्ट वेक्टर इसे सत्यापित करता है — और UTF-8 टेक्स्ट सीधे प्रोसेस कर hex साइफरटेक्स्ट देता है।",
        "ECB और CBC में प्रमाणीकरण टैग नहीं है, इसलिए केवल विकूटलेखन से छेड़छाड़ का पता नहीं चलता; अखंडता मायने रखती हो तो HMAC-SM3 के साथ जोड़ें। सब कुछ sm-crypto लाइब्रेरी से स्थानीय रूप से चलता है — कुंजियाँ और प्लेनटेक्स्ट इस टैब से कभी नहीं निकलते।",
      ],
      [
        "Encrypt या Decrypt चुनें, और मोड (ECB बिना IV, CBC 32-hex IV के साथ)।",
        "128-बिट कुंजी 32 हेक्स कैरेक्टर के रूप में दर्ज करें, और टेक्स्ट — विकूटलेखन के लिए hex साइफरटेक्स्ट पेस्ट करें।",
        "Run पर क्लिक करें — परिणाम कॉपी बटन के साथ नीचे दिखता है; अवैध कुंजी, IV और लंबाई स्पष्ट रूप से अस्वीकार होती हैं।",
      ],
      [
        { q: "SM4 या AES — कौन सा इस्तेमाल करूँ?", a: "अपनी कम्प्लायंस आवश्यकता का पालन करें: चीनी वाणिज्यिक क्रिप्टोग्राफ़ी योजनाएँ (मूल्यांकन, सरकारी, ई-सील वर्कफ़्लो) SM4 अनिवार्य करती हैं, जबकि अंतरराष्ट्रीय सिस्टम डिफ़ॉल्ट रूप से AES करते हैं। समान कुंजी आकार पर कोई कमज़ोर नहीं; बस अलग इकोसिस्टम हैं। इंटरऑपरेबिलिटी तय करती है — SM4 की अपेक्षा करने वाला पक्ष आपका AES पेलोड नहीं पढ़ सकता।" },
        { q: "AES-GCM जैसा प्रमाणीकरण टैग क्यों नहीं?", a: "इस पेज के ECB और CBC मोड केवल गोपनीयता के हैं; चीनी मानक का प्रमाणित ढाँचा उसके ऊपर HMAC-SM3 से बनता है। छेड़छाड़ पकड़ना मायने रखे तो अलग कुंजी से साइफरटेक्स्ट का HMAC-SM3 गणना करें और विकूटलेखन से पहले सत्यापित करें।" },
      ],
    ),
  },
  id: {
    name: "Enkripsi dan dekripsi SM4",
    tagline: "Enkripsi dan dekripsi teks dengan SM4 (GB/T 32907-2016), cifran blok 128-bit standar nasional Tiongkok — mode ECB dan CBC, kunci hex, implementasi tervalidasi vektor standar. Gratis, privat, offline.",
    ...common(
      [
        "SM4 adalah cifran blok simetris dari suite kriptografi komersial Tiongkok: kunci dan blok 128-bit, pasangan dari hashing SM3 dan tanda tangan SM2. Wajib dalam sistem pemerintah, keuangan, dan stempel elektronik Tiongkok di mana cifran simetris dibutuhkan bersama primitif asimetris seri SM.",
        "Alat ini mendukung mode ECB dan CBC dengan kunci hex 128-bit (CBC menambahkan IV 32 hex). Implementasi mengikuti GB/T 32907-2016 secara tepat — vektor uji Lampiran A standar memvalidasinya — dan memproses teks UTF-8 langsung, mengembalikan cifrado heksadesimal.",
        "ECB dan CBC tidak memiliki tag autentikasi, sehingga ciphertext yang rusak atau dirusak tidak terdeteksi hanya dengan mendekripsi; pasangkan dengan HMAC-SM3 saat integritas penting. Semuanya berjalan lokal dengan pustaka sm-crypto — kunci dan plaintext tidak pernah keluar dari tab ini.",
      ],
      [
        "Pilih Enkripsi atau Dekripsi, dan mode (ECB tanpa IV, CBC dengan IV 32 hex).",
        "Masukkan kunci 128-bit sebagai 32 karakter heksadesimal, dan teks — untuk dekripsi, tempel ciphertext hex.",
        "Klik Jalankan — hasil muncul di bawah dengan tombol salin; kunci, IV, dan panjang yang tidak valid ditolak secara eksplisit.",
      ],
      [
        { q: "SM4 atau AES — mana yang harus dipakai?", a: "Ikuti kebutuhan kepatuhan Anda: skema kriptografi komersial Tiongkok (evaluasi, pemerintah, alur stempel elektronik) mewajibkan SM4, sementara sistem internasional menggunakan AES secara default. Tidak ada yang lebih lemah pada ukuran kunci yang sama; keduanya hanya ekosistem berbeda. Interoperabilitas yang menentukan — mitra yang mengharapkan SM4 tidak dapat membaca payload AES Anda." },
        { q: "Mengapa tidak ada tag autentikasi seperti AES-GCM?", a: "Mode ECB dan CBC yang halaman ini tawarkan hanya untuk kerahasiaan; konstruksi terautentikasi dari standar Tiongkok dibangun di atasnya dengan HMAC-SM3. Jika deteksi perusakan penting, hitung HMAC-SM3 atas ciphertext dengan kunci terpisah dan verifikasi sebelum dekripsi." },
      ],
    ),
  },
  vi: {
    name: "Mã hóa và giải mã SM4",
    tagline: "Mã hóa và giải mã văn bản bằng SM4 (GB/T 32907-2016), cifran khối 128-bit của tiêu chuẩn quốc gia Trung Quốc — chế độ ECB/CBC, khóa hex, bản triển khai được kiểm chứng bằng vectơ của tiêu chuẩn. Miễn phí, riêng tư, ngoại tuyến.",
    ...common(
      [
        "SM4 là cifra khối đối xứng của bộ mật mã thương mại Trung Quốc: khóa và khối 128 bit, đối ứng của hashing SM3 và chữ ký SM2. Bắt buộc trong các hệ thống chính phủ, tài chính và dấu điện tử của Trung Quốc khi cần cifra đối xứng cùng các nguyên thủy bất đối xứng họ SM.",
        "Công cụ này hỗ trợ chế độ ECB và CBC với khóa hex 128-bit (CBC thêm IV 32 hex). Bản triển khai tuân thủ chính xác GB/T 32907-2016 — vectơ kiểm tra của Phụ lục A tiêu chuẩn xác nhận nó — và xử lý trực tiếp văn bản UTF-8, trả về bản mã hex.",
        "ECB và CBC không có thẻ xác thực, nên bản mã bị hỏng hoặc can thiệp không thể phát hiện chỉ bằng giải mã; kết hợp với HMAC-SM3 khi tính toàn vẹn quan trọng. Mọi thứ chạy cục bộ bằng thư viện sm-crypto — khóa và bản rõ không bao giờ rời tab này.",
      ],
      [
        "Chọn Mã hóa hoặc Giải mã, và chế độ (ECB không IV, CBC với IV 32 hex).",
        "Nhập khóa 128 bit dạng 32 ký tự hex, và văn bản — để giải mã, dán bản mã hex.",
        "Nhấp Chạy — kết quả xuất hiện bên dưới với nút sao chép; khóa, IV và độ dài không hợp lệ bị từ chối rõ ràng.",
      ],
      [
        { q: "SM4 hay AES — nên dùng cái nào?", a: "Theo yêu cầu tuân thủ của bạn: các lược đồ mật mã thương mại Trung Quốc (đánh giá, chính phủ, quy trình dấu điện tử) bắt buộc SM4, trong khi hệ thống quốc tế mặc định dùng AES. Không bên nào yếu hơn ở cùng cỡ khóa; chỉ là hai hệ sinh thái khác nhau. Khả năng tương tác quyết định — đối tác mong SM4 không đọc được tải trọng AES của bạn." },
        { q: "Tại sao không có thẻ xác thực như AES-GCM?", a: "Các chế độ ECB và CBC mà trang này cung cấp chỉ có tính bảo mật; cấu trúc xác thực của tiêu chuẩn Trung Quốc được xây trên đó bằng HMAC-SM3. Nếu phát hiện can thiệp quan trọng, hãy tính HMAC-SM3 trên bản mã bằng khóa riêng và xác minh trước khi giải mã." },
      ],
    ),
  },
};
