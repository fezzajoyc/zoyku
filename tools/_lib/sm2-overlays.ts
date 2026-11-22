/**
 * CN-028 sm2-sign 加密家族扩展语言 overlay(10 语)。
 */

import type { ToolCopy } from "./types";

function common(
  intro: [string, string, string],
  steps: [string, string, string],
  faqs: Array<{ q: string; a: string }>,
) {
  return { intro, steps, faqs };
}

export const SM2_OVERLAYS: Record<string, ToolCopy> = {
  fr: {
    name: "SM2 Signature, chiffrement & paires de clés",
    tagline: "Générez des paires de clés SM2, signez/vérifiez et chiffrez/déchiffrez — l'algorithme à courbe elliptique du standard national chinois (GB/T 32918-2016), avec SM3 pour les signatures. Gratuit, privé, hors ligne.",
    ...common(
      [
        "SM2 est l'algorithme de courbe elliptique de la suite de cryptographie commerciale chinoise — la contrepartie asymétrique de SM3 et SM4, obligatoire dans les systèmes chinois de gouvernement, finance et scellement électronique. Cet outil génère des paires de clés, signe/vérifie des messages (avec hachage SM3) et chiffre/déchiffre avec l'ordre de chiffrement C1C3C2 du standard.",
        "Collez votre propre paire de clés (privée 64 hex, publique 130 hex avec préfixe 04) ou générez-en une neuve en un clic. Chaque signature et chaque chiffrement introduit un k aléatoire frais, donc les sorties diffèrent à chaque opération tout en restant vérifiables et déchiffrables par la même paire.",
        "Les clés SM2 appartiennent à la courbe SM2 — elles ne sont pas des clés ECDSA/RSA et réciproquement. Tout s'exécute localement avec la bibliothèque sm-crypto ; la clé privée ne quitte jamais cet onglet.",
      ],
      [
        "Générez une paire de clés ou collez vos propres clés hexadécimales.",
        "Pour signer : saisissez le message et cliquez Signer ; pour vérifier : le message, la signature et la clé publique.",
        "Pour chiffrer : le message et la clé publique ; pour déchiffrer : le chiffrement hexadécimal et la clé privée.",
      ],
      [
        { q: "Les clés SM2 fonctionnent-elles avec ECDSA ou RSA ?", a: "Non — SM2 utilise sa propre courbe et son propre schéma de signature, entièrement séparés d'ECDSA (P-256) et de RSA. Les bibliothèques et partenaires qui vérifient avec les algorithmes standards ne peuvent pas lire les signatures SM2 ; utilisez SM2 uniquement dans les flux qui l'exigent (norme chinoise, partenaires GM)." },
        { q: "Pourquoi ma signature change-t-elle à chaque fois pour le même message ?", a: "SM2 introduit un nombre aléatoire k à chaque signature — c'est une exigence de sécurité du standard, et la signature résultante est différente à chaque fois tout en restant valide. Certaines normes de vérification refusent les signatures déterministes pour cette raison précise." },
      ],
    ),
  },
  de: {
    name: "SM2 Signatur, Verschlüsselung & Schlüsselpaare",
    tagline: "SM2-Schlüsselpaare generieren, Nachrichten signieren/verifizieren und verschlüsseln/entschlüsseln — der Ellipsenkurven-Algorithmus des chinesischen Nationalstandards (GB/T 32918-2016), mit SM3 für Signaturen. Kostenlos, privat, offline.",
    ...common(
      [
        "SM2 ist der Ellipsenkurven-Algorithmus der chinesischen Handelskryptographie-Suite — das asymmetrische Gegenstück zu SM3 und SM4, vorgeschrieben in chinesischen Regierungs-, Finanz- und E-Siegel-Systemen. Dieses Tool erzeugt Schlüsselpaare, signiert/verifiziert Nachrichten (mit SM3-Hashing) und verschlüsselt/entschlüsselt in der C1C3C2-Chiffretext-Reihenfolge des Standards.",
        "Fügen Sie Ihr eigenes Schlüsselpaar ein (privat 64 Hex, öffentlich 130 Hex mit 04-Präfix) oder erzeugen Sie mit einem Klick ein neues. Jede Signatur und Verschlüsselung führt ein frisches zufälliges k ein, daher unterscheiden sich die Ausgaben bei jeder Operation und bleiben dennoch mit demselben Paar verifizierbar und entschlüsselbar.",
        "SM2-Schlüssel gehören zur SM2-Kurve — sie sind keine ECDSA/RSA-Schlüssel und umgekehrt. Alles läuft lokal mit der sm-crypto-Bibliothek ; der private Schlüssel verlässt diesen Tab nie.",
      ],
      [
        "Erzeugen Sie ein Schlüsselpaar oder fügen Sie Ihre eigenen Hex-Schlüssel ein.",
        "Zum Signieren: Nachricht eingeben und Signieren klicken ; zum Verifizieren: Nachricht, Signatur und öffentlicher Schlüssel.",
        "Zum Verschlüsseln: Nachricht und öffentlicher Schlüssel ; zum Entschlüsseln: Hex-Chiffretext und privater Schlüssel.",
      ],
      [
        { q: "Funktionieren SM2-Schlüssel mit ECDSA oder RSA?", a: "Nein — SM2 verwendet eine eigene Kurve und ein eigenes Signaturschema, vollständig getrennt von ECDSA (P-256) und RSA. Partner, die mit Standardalgorithmen verifizieren, können SM2-Signaturen nicht lesen ; verwenden Sie SM2 nur in Abläufen, die es verlangen (chinesischer Standard, GM-Partner)." },
        { q: "Warum ändert sich meine Signatur bei derselben Nachricht jedes Mal?", a: "SM2 führt bei jeder Signatur eine Zufallszahl k ein — eine Sicherheitsanforderung des Standards, und die resultierende Signatur ist jedes Mal unterschiedlich, während sie gültig bleibt. Manche Verifikationsnormen lehnen deterministische Signaturen genau aus diesem Grund ab." },
      ],
    ),
  },
  ru: {
    name: "SM2 Подпись, шифрование и пары ключей",
    tagline: "Генерируйте пары ключей SM2, подписывайте/проверяйте и шифруйте/дешифруйте — алгоритм эллиптических кривых китайского национального стандарта (GB/T 32918-2016), с SM3 для подписей. Бесплатно, приватно, офлайн.",
    ...common(
      [
        "SM2 — алгоритм эллиптических кривых китайского набора коммерческой криптографии — асимметричная пара к SM3 и SM4, обязательный в китайских системах госсектора, финансов и электронных печатей. Этот инструмент генерирует пары ключей, подписывает/проверяет сообщения (с хешированием SM3) и шифрует/дешифрует в порядке шифртекста C1C3C2 по стандарту.",
        "Вставьте свою пару ключей (закрытый 64 hex, открытый 130 hex с префиксом 04) или создайте новую одним щелчком. Каждая подпись и каждое шифрование вводят свежее случайное k, поэтому выходные данные различаются при каждой операции, оставаясь проверяемыми и расшифровываемыми той же парой.",
        "Ключи SM2 относятся к кривой SM2 — это не ключи ECDSA/RSA и наоборот. Всё работает локально через библиотеку sm-crypto ; закрытый ключ никогда не покидает эту вкладку.",
      ],
      [
        "Создайте пару ключей или вставьте свои hex-ключи.",
        "Для подписи: введите сообщение и нажмите Подписать ; для проверки: сообщение, подпись и открытый ключ.",
        "Для шифрования: сообщение и открытый ключ ; для дешифрования: hex-шифртекст и закрытый ключ.",
      ],
      [
        { q: "Работают ли ключи SM2 с ECDSA или RSA?", a: "Нет — SM2 использует свою кривую и свою схему подписи, полностью отделённые от ECDSA (P-256) и RSA. Партнёры, проверяющие стандартными алгоритмами, не смогут прочитать подписи SM2 ; используйте SM2 только в процессах, которые его требуют (китайский стандарт, GM-партнёры)." },
        { q: "Почему подпись меняется каждый раз для одного сообщения?", a: "SM2 вводит случайное число k при каждой подписи — требование безопасности стандарта, и полученная подпись каждый раз разная, оставаясь действительной. Некоторые нормы проверки отвергают детерминированные подписи именно по этой причине." },
      ],
    ),
  },
  it: {
    name: "SM2 Firma, cifraggio e coppie di chiavi",
    tagline: "Genera coppie di chiavi SM2, firma/verifica e cifra/decifra — l'algoritmo a curva ellittica dello standard nazionale cinese (GB/T 32918-2016), con SM3 per le firme. Gratuito, privato, offline.",
    ...common(
      [
        "SM2 è l'algoritmo a curva ellittica del suite di crittografia commerciale cinese — la controparte asimmetrica di SM3 e SM4, obbligatorio nei sistemi cinesi di governo, finanza e sigilli elettronici. Questo strumento genera coppie di chiavi, firma/verifica messaggi (con hashing SM3) e cifra/decifra con l'ordine del cifrato C1C3C2 dello standard.",
        "Incolla la tua coppia di chiavi (privata 64 hex, pubblica 130 hex con prefisso 04) o generane una nuova con un clic. Ogni firma e cifraggio introduce un k casuale fresco, quindi gli output differiscono a ogni operazione restando verificabili e decifrabili con la stessa coppia.",
        "Le chiavi SM2 appartengono alla curva SM2 — non sono chiavi ECDSA/RSA e viceversa. Tutto gira localmente con la libreria sm-crypto ; la chiave privata non lascia mai questa scheda.",
      ],
      [
        "Genera una coppia di chiavi o incolla le tue chiavi esadecimali.",
        "Per firmare: inserisci il messaggio e clicca Firma ; per verificare: messaggio, firma e chiave pubblica.",
        "Per cifrare: messaggio e chiave pubblica ; per decifrare: cifrato esadecimale e chiave privata.",
      ],
      [
        { q: "Le chiavi SM2 funzionano con ECDSA o RSA?", a: "No — SM2 usa la sua curva e il suo schema di firma, completamente separati da ECDSA (P-256) e RSA. Le controparti che verificano con gli algoritmi standard non possono leggere le firme SM2 ; usa SM2 solo nei flussi che lo richiedono (standard cinese, partner GM)." },
        { q: "Perché la mia firma cambia ogni volta per lo stesso messaggio?", a: "SM2 introduce un numero casuale k a ogni firma — è un requisito di sicurezza dello standard, e la firma risultante è diversa ogni volta pur restando valida. Alcune norme di verifica rifiutano le firme deterministiche proprio per questo motivo." },
      ],
    ),
  },
  tr: {
    name: "SM2 İmza, şifreleme ve anahtar çiftleri",
    tagline: "SM2 anahtar çiftleri üretin, imzalayın/doğrulayın ve şifreleyin/çözün — Çin ulusal standardının eliptik eğri algoritması (GB/T 32918-2016), imzalar için SM3. Ücretsiz, özel, çevrimdışı.",
    ...common(
      [
        "SM2, Çin ticari kriptografi setinin eliptik eğri algoritmasıdır — SM3 ve SM4'ün asimetrik karşılığı, Çin devlet, finans ve e-mühür sistemlerinde zorunludur. Bu araç anahtar çiftleri üretir, mesajları imzalar/doğrular (SM3 hash ile) ve standardın C1C3C2 şifreli metin sırasıyla şifreler/çözer.",
        "Kendi anahtar çiftinizi yapıştırın (özel 64 hex, genel 130 hex 04 önekiyle) veya tek tıkla yeni bir çift üretin. Her imza ve şifreleme taze rastgele bir k getirir, bu yüzden çıktılar her işlemde farklıdır ama aynı çiftle doğrulanabilir ve çözülebilir kalır.",
        "SM2 anahtarları SM2 eğrisine aittir — ECDSA/RSA anahtarları değildir ve tersi de geçerlidir. Her şey sm-crypto kütüphanesiyle yerelde çalışır ; özel anahtar bu sekmeden asla çıkmaz.",
      ],
      [
        "Bir anahtar çifti üretin veya kendi hex anahtarlarınızı yapıştırın.",
        "İmzalamak için: mesajı girin ve İmzala'ya tıklayın ; doğrulamak için: mesaj, imza ve genel anahtar.",
        "Şifrelemek için: mesaj ve genel anahtar ; çözmek için: onaltılık şifreli metin ve özel anahtar.",
      ],
      [
        { q: "SM2 anahtarları ECDSA veya RSA ile çalışır mı?", a: "Hayır — SM2 kendi eğrisini ve kendi imza şemasını kullanır, ECDSA'dan (P-256) ve RSA'dan tamamen ayrıdır. Standart algoritmalarla doğrulayan ortaklar SM2 imzalarını okuyamaz ; SM2'yi yalnızca onu zorlayan akışlarda kullanın (Çin standardı, GM ortakları)." },
        { q: "Aynı mesaj için imzam neden her seferinde değişiyor?", a: "SM2 her imzada rastgele bir k sayısı getirir — standardın güvenlik gereksinimidir ve oluşan imza her seferinde farklıdır ama geçerli kalır. Bazı doğrulama normları deterministik imzaları tam bu nedenle reddeder." },
      ],
    ),
  },
  ko: {
    name: "SM2 서명·암호화·키 쌍",
    tagline: "SM2 키 쌍을 생성하고 서명/검증·암호화/복호화하세요 — 중국 국가표준의 타원곡선 알고리즘(GB/T 32918-2016), 서명에 SM3 사용. 무료 · 프라이빗 · 오프라인 작동.",
    ...common(
      [
        "SM2는 중국 상용 암호 스위트의 타원곡선 알고리즘 — SM3과 SM4의 비대칭 파트로, 중국 정부·금융·전자도장 시스템에서 필수입니다. 이 도구는 키 쌍을 생성하고 메시지를 서명/검증(SM3 해시 포함)하며 표준의 C1C3C2 암호문 순서로 암호화/복호화합니다.",
        "자신의 키 쌍(개인 64 hex, 공개 04 접두사 130 hex)을 붙여넣거나 한 번의 클릭으로 새로 생성하세요. 매 서명과 암호화에 새로운 무작위 k가 도입되므로 출력은 매번 다르지만 같은 쌍으로 검증·복호화 가능합니다.",
        "SM2 키는 SM2 곡선의 키입니다 — ECDSA/RSA 키가 아니며 그 반대도 마찬가지입니다. 모든 것이 sm-crypto 라이브러리로 로컬 실행되며 개인 키는 이 탭을 떠나지 않습니다.",
      ],
      [
        "키 쌍을 생성하거나 자신의 hex 키를 붙여넣으세요.",
        "서명: 메시지를 입력하고 서명 클릭 ; 검증: 메시지·서명·공개 키.",
        "암호화: 메시지와 공개 키 ; 복호화: 16진 암호문과 개인 키.",
      ],
      [
        { q: "SM2 키가 ECDSA나 RSA와 호환되나요?", a: "아니요 — SM2는 자체 곡선과 서명 체계를 사용하며 ECDSA(P-256)와 RSA와 완전히 분리되어 있습니다. 표준 알고리즘으로 검증하는 파트너는 SM2 서명을 읽을 수 없습니다 ; SM2를 요구하는 흐름(중국 표준, GM 파트너)에서만 사용하세요." },
        { q: "같은 메시지인데 서명이 매번 달라지는 이유는?", a: "SM2는 매 서명에 무작위 수 k를 도입합니다 — 표준의 보안 요구사항이며 결과 서명은 항상 유효하면서 매번 다릅니다. 일부 검증 규범은 정확히 이 이유로 결정론적 서명을 거부합니다." },
      ],
    ),
  },
  ar: {
    name: "SM2 توقيع، تشفير وأزواج مفاتيح",
    tagline: "أنشئ أزواج مفاتيح SM2، وقّع/تحقق وشفّر/فك التشفير — خوارزمية المنحنى الإهليلجي للمعيار الوطني الصيني (GB/T 32918-2016)، مع SM3 للتوقيعات. مجاني وخاص ويعمل دون اتصال.",
    ...common(
      [
        "SM2 هو خوارزمية المنحنى الإهليلجي في مجموعة التشفير التجاري الصيني — النظير غير المتماثل لـ SM3 وSM4، إلزامي في أنظمة الحكومة والمالية والأختام الإلكترونية الصينية. تنشئ هذه الأداة أزواج المفاتيح، وتوقّع/تحقق من الرسائل (مع تجزئة SM3) وتشفّر/فك التشفير بترتيب النص المشفر C1C3C2 للمعيار.",
        "الصق زوج مفاتيحك (خاص 64 hex، عام 130 hex ببادئة 04) أو أنشئ زوجًا جديدًا بنقرة واحدة. كل توقيع وكل تشفير يُدخل k عشوائيًا جديدًا، فتختلف المخرجات كل عملية مع بقائها قابلة للتحقق والفك بنفس الزوج.",
        "مفاتيح SM2 منحنى SM2 — ليست مفاتيح ECDSA/RSA والعكس صحيح. كل شيء يعمل محليًا عبر مكتبة sm-crypto ؛ المفتاح الخاص لا يترك هذه التبويبة أبدًا.",
      ],
      [
        "أنشئ زوج مفاتيح أو الصق مفاتيحك السداسية.",
        "للتوقيع: أدخل الرسالة وانقر وقّع ; للتحقق: الرسالة والتوقيع والمفتاح العام.",
        "للتشفير: الرسالة والمفتاح العام ; لفك التشفير: النص المشفر hex والمفتاح الخاص.",
      ],
      [
        { q: "هل تعمل مفاتيح SM2 مع ECDSA أو RSA؟", a: "لا — SM2 تستخدم منحناها ومخطط توقيعها الخاصين، منفصلين تمامًا عن ECDSA (P-256) وRSA. الأطراف التي تتحقق بالخوارزميات القياسية لا تقرأ توقيعات SM2 ؛ استخدم SM2 فقط في التدفقات التي تتطلبه (المعيار الصيني، شركاء GM)." },
        { q: "لماذا يتغير توقيعي كل مرة للرسالة نفسها؟", a: "يُدخل SM2 رقمًا عشوائيًا k في كل توقيع — متطلب أمني للمعيار، والتوقيع الناتج مختلف كل مرة مع بقائه صالحًا. بعض معايير التحقق ترفض التوقيعات الحتمية لهذا السبب تحديدًا." },
      ],
    ),
  },
  hi: {
    name: "SM2 हस्ताक्षर, कूटलेखन और कुंजी जोड़े",
    tagline: "SM2 कुंजी जोड़े बनाएं, संदेश हस्ताक्षरित/सत्यापित और कूटलेखित/विकूटलेखित करें — चीनी राष्ट्रीय मानक का दीर्घवृत्त-वक्र एल्गोरिद्म (GB/T 32918-2016), हस्ताक्षरों के लिए SM3। मुफ़्त, निजी, ऑफ़लाइन।",
    ...common(
      [
        "SM2 चीनी वाणिज्यिक क्रिप्टोग्राफ़ी सुइट का दीर्घवृत्त-वक्र एल्गोरिद्म है — SM3 और SM4 का असममित समकक्ष, चीनी सरकारी, वित्त और ई-सील सिस्टमों में अनिवार्य। यह टूल कुंजी जोड़े बनाता है, संदेश हस्ताक्षरित/सत्यापित करता है (SM3 हैशिंग सहित) और मानक के C1C3C2 साइफरटेक्स्ट क्रम से कूटलेखित/विकूटलेखित करता है।",
        "अपना कुंजी जोड़ा पेस्ट करें (निजी 64 hex, सार्वजनिक 04-उपसर्ग 130 hex) या एक क्लिक में नया बनाएं। प्रत्येक हस्ताक्षर और कूटलेखन ताज़ा यादृच्छिक k लाता है, इसलिए आउटपुट हर बार भिन्न होता है पर उसी जोड़े से सत्यापनीय/विकूटलेखनीय रहता है।",
        "SM2 कुंजियाँ SM2 वक्र की हैं — वे ECDSA/RSA कुंजियाँ नहीं हैं और इसके विपरीत भी। सब कुछ sm-crypto लाइब्रेरी से स्थानीय रूप से चलता है ; निजी कुंजी कभी इस टैब से नहीं निकलती।",
      ],
      [
        "कुंजी जोड़ा बनाएं या अपनी hex कुंजियाँ पेस्ट करें।",
        "हस्ताक्षर के लिए: संदेश दर्ज करें और Sign क्लिक करें ; सत्यापन के लिए: संदेश, हस्ताक्षर और सार्वजनिक कुंजी।",
        "कूटलेखन के लिए: संदेश और सार्वजनिक कुंजी ; विकूटलेखन के लिए: hex साइफरटेक्स्ट और निजी कुंजी।",
      ],
      [
        { q: "क्या SM2 कुंजियाँ ECDSA या RSA के साथ चलती हैं?", a: "नहीं — SM2 अपना वक्र और अपनी हस्ताक्षर योजना उपयोग करता है, ECDSA (P-256) और RSA से पूरी तरह अलग। मानक एल्गोरिद्म से सत्यापन करने वाले पार्टनर SM2 हस्ताक्षर नहीं पढ़ सकते ; SM2 केवल उन प्रवाहों में उपयोग करें जो इसे माँगते हैं (चीनी मानक, GM पार्टनर)।" },
        { q: "एक ही संदेश के लिए मेरा हस्ताक्षर हर बार क्यों बदलता है?", a: "SM2 प्रत्येक हस्ताक्षर में यादृच्छिक संख्या k लाता है — मानक की सुरक्षा आवश्यकता, और बना हस्ताक्षर हर बार भिन्न होते हुए भी मान्य रहता है। कुछ सत्यापन मानक निर्धारणात्मक हस्ताक्षरों को ठीक इसी कारण अस्वीकार करते हैं।" },
      ],
    ),
  },
  id: {
    name: "Tanda tangan, enkripsi & pasangan kunci SM2",
    tagline: "Buat pasangan kunci SM2, tanda tangani/verifikasi dan enkripsi/dekripsi — algoritma kurva eliptik dari standar nasional Tiongkok (GB/T 32918-2016), dengan SM3 untuk tanda tangan. Gratis, privat, offline.",
    ...common(
      [
        "SM2 adalah algoritma kurva eliptik dari suite kriptografi komersial Tiongkok — pasangan asimetris dari SM3 dan SM4, wajib dalam sistem pemerintah, keuangan, dan stempel elektronik Tiongkok. Alat ini membuat pasangan kunci, menandatangani/memverifikasi pesan (dengan hashing SM3) dan mengenkripsi/mendekripsi dengan urutan ciphertext C1C3C2 dari standar.",
        "Tempel pasangan kunci Anda sendiri (privat 64 hex, publik 130 hex dengan prefiks 04) atau buat yang baru dengan satu klik. Setiap tanda tangan dan enkripsi memperkenalkan k acak baru, sehingga output berbeda setiap operasi namun tetap dapat diverifikasi dan didekripsi dengan pasangan yang sama.",
        "Kunci SM2 milik kurva SM2 — bukan kunci ECDSA/RSA dan sebaliknya. Semuanya berjalan lokal dengan pustaka sm-crypto ; kunci privat tidak pernah keluar dari tab ini.",
      ],
      [
        "Buat pasangan kunci atau tempel kunci hex Anda sendiri.",
        "Untuk menandatangani: masukkan pesan dan klik Tanda tangani ; untuk memverifikasi: pesan, tanda tangan, dan kunci publik.",
        "Untuk mengenkripsi: pesan dan kunci publik ; untuk mendekripsi: ciphertext hex dan kunci privat.",
      ],
      [
        { q: "Apakah kunci SM2 bekerja dengan ECDSA atau RSA?", a: "Tidak — SM2 menggunakan kurva dan skema tanda tangan sendiri, sepenuhnya terpisah dari ECDSA (P-256) dan RSA. Mitra yang memverifikasi dengan algoritma standar tidak dapat membaca tanda tangan SM2 ; gunakan SM2 hanya dalam alur yang mengharuskannya (standar Tiongkok, mitra GM)." },
        { q: "Mengapa tanda tangan saya berubah setiap kali untuk pesan yang sama?", a: "SM2 memperkenalkan bilangan acak k pada setiap tanda tangan — itu persyaratan keamanan dari standar, dan tanda tangan yang dihasilkan berbeda setiap kali namun tetap valid. Beberapa norma verifikasi menolak tanda tangan deterministik justru karena alasan ini." },
      ],
    ),
  },
  vi: {
    name: "SM2 Ký số, mã hóa và cặp khóa",
    tagline: "Tạo cặp khóa SM2, ký/xác minh và mã hóa/giải mã — thuật toán đường cong eliptic của tiêu chuẩn quốc gia Trung Quốc (GB/T 32918-2016), dùng SM3 cho chữ ký. Miễn phí, riêng tư, ngoại tuyến.",
    ...common(
      [
        "SM2 là thuật toán đường cong eliptic của bộ mật mã thương mại Trung Quốc — phần bất đối xứng của SM3 và SM4, bắt buộc trong các hệ thống chính phủ, tài chính và dấu điện tử của Trung Quốc. Công cụ này tạo cặp khóa, ký/xác minh tin nhắn (với hashing SM3) và mã hóa/giải mã theo thứ tự bản mã C1C3C2 của tiêu chuẩn.",
        "Dán cặp khóa của bạn (riêng 64 hex, công khai 130 hex với tiền tố 04) hoặc tạo mới bằng một cú nhấp. Mỗi chữ ký và mỗi lần mã hóa đưa vào một k ngẫu nhiên mới, nên đầu ra khác nhau mỗi lần thao tác nhưng vẫn xác minh/giải mã được bằng cùng cặp khóa.",
        "Khóa SM2 thuộc đường cong SM2 — không phải khóa ECDSA/RSA và ngược lại cũng vậy. Mọi thứ chạy cục bộ bằng thư viện sm-crypto ; khóa riêng không bao giờ rời tab này.",
      ],
      [
        "Tạo cặp khóa hoặc dán khóa hex của bạn.",
        "Để ký: nhập tin nhắn và nhấp Ký ; để xác minh: tin nhắn, chữ ký và khóa công khai.",
        "Để mã hóa: tin nhắn và khóa công khai ; để giải mã: bản mã hex và khóa riêng.",
      ],
      [
        { q: "Khóa SM2 có hoạt động với ECDSA hay RSA không?", a: "Không — SM2 dùng đường cong và sơ đồ chữ ký riêng, hoàn toàn tách biệt khỏi ECDSA (P-256) và RSA. Các đối tác xác minh bằng thuật toán tiêu chuẩn không đọc được chữ ký SM2 ; chỉ dùng SM2 trong các quy trình yêu cầu nó (tiêu chuẩn Trung Quốc, đối tác GM)." },
        { q: "Tại sao chữ ký của tôi thay đổi mỗi lần cho cùng một tin nhắn?", a: "SM2 đưa vào một số ngẫu nhiên k trong mỗi chữ ký — yêu cầu bảo mật của tiêu chuẩn, và chữ ký kết quả khác nhau mỗi lần nhưng vẫn hợp lệ. Một số chuẩn xác minh từ chối chữ ký quyết định đúng vì lý do này." },
      ],
    ),
  },
};
