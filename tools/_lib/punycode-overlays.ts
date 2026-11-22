/**
 * CN-033 punycode-converter 扩展语言 overlay(10 语)。
 */

import type { ToolCopy } from "./types";

function common(
  intro: [string, string, string],
  steps: [string, string, string],
  faqs: Array<{ q: string; a: string }>,
) {
  return { intro, steps, faqs };
}

export const PUNYCODE_OVERLAYS: Record<string, ToolCopy> = {
  fr: {
    name: "Convertisseur Punycode et IDN",
    tagline: "Convertissez les noms de domaine internationalisés entre Unicode et Punycode (format xn--) — codage bootstring RFC 3492 pour IDNA, utilisé par DNS, navigateurs et systèmes de messagerie. Gratuit, instantané, hors ligne.",
    ...common(
      [
        "Les noms de domaine internationalisés (IDN) permettent d'enregistrer des domaines dans les écritures natives — 中文.com, bücher.de, ログイン.jp. Mais le protocole DNS ne comprend que l'ASCII, donc ces domaines sont encodés en Punycode avec le préfixe xn-- (selon RFC 3492 et IDNA RFC 5890). Ce convertisseur gère les deux sens.",
        "L'encodage utilise l'algorithme bootstring Punycode standard de RFC 3492, qui convertit toute chaîne Unicode en forme ASCII réversible. L'encodage IDNA traite le domaine étiquette par étiquette (division par points) et ajoute le préfixe xn-- à chaque étiquette non ASCII.",
        "Tout s'exécute localement — aucune requête DNS, aucun appel réseau. L'implémentation utilise la bibliothèque punycode éprouvée (Mathias Bynens, le code qui alimente Node.js), vérifiée contre le codec punycode intégré de Python.",
      ],
      [
        "Choisissez Encoder (Unicode → xn--) ou Décoder (xn-- → Unicode).",
        "Saisissez le nom de domaine ou la chaîne Punycode.",
        "Le résultat apparaît avec un bouton de copie — les domaines multi-étiquettes sont traités étiquette par étiquette.",
      ],
      [
        { q: "Quelle est la différence entre Punycode et IDNA ?", a: "Punycode (RFC 3492) est l'algorithme qui convertit l'Unicode en ASCII. IDNA (RFC 5890) est le cadre qui applique Punycode aux noms de domaine, ajoutant le préfixe xn-- pour signaler que l'étiquette est encodée. Cet outil prend en charge le Punycode brut et les domaines IDNA." },
        { q: "Pourquoi le domaine commence-t-il par xn-- ?", a: "Le préfixe xn-- indique aux résolveurs DNS et navigateurs que l'étiquette est de l'Unicode encodé en Punycode. Sans lui, le système DNS interpréterait l'étiquette comme un nom d'hôte ASCII normal. Toutes les étiquettes de domaine non ASCII doivent commencer par xn-- selon IDNA." },
      ],
    ),
  },
  de: {
    name: "Punycode- & IDN-Konverter",
    tagline: "Konvertieren Sie internationalisierte Domainnamen zwischen Unicode und Punycode (xn---Format) — Bootstring-Codierung nach RFC 3492 für IDNA, verwendet von DNS, Browsern und E-Mail-Systemen weltweit. Kostenlos, sofort, offline.",
    ...common(
      [
        "Internationalisierte Domainnamen (IDN) ermöglichen es Nutzern, Domains in ihren Muttersprachen zu registrieren — 中文.com, bücher.de, ログイン.jp. Aber das DNS-Protokoll versteht nur ASCII, daher werden diese Domains als Punycode mit dem xn---Präfix kodiert (nach RFC 3492 und IDNA RFC 5890). Dieser Konverter verarbeitet beide Richtungen.",
        "Die Kodierung verwendet den Standard-Bootstring-Algorithmus von RFC 3492, der jede Unicode-Zeichenkette in eine reversible reine ASCII-Form umwandelt. Die IDNA-Kodierung verarbeitet die Domain zusätzlich Etikett für Etikett (durch Punkte getrennt) und fügt das xn---Präfix zu jeder nicht-ASCII-Etikette hinzu.",
        "Alles läuft lokal — keine DNS-Abfragen, keine Netzwerkaufrufe. Die Implementierung verwendet die erprobte punycode-Bibliothek (Mathias Bynens, derselbe Code der Node.js antreibt), gegen den integrierten Punycode-Codec von Python kreuzverifiziert.",
      ],
      [
        "Wählen Sie Kodieren (Unicode → xn--) oder Dekodieren (xn-- → Unicode).",
        "Geben Sie den Domainnamen oder die Punycode-Zeichenkette ein.",
        "Das Ergebnis erscheint mit Kopierbutton — Multi-Label-Domains werden Etikett für Etikett verarbeitet.",
      ],
      [
        { q: "Was ist der Unterschied zwischen Punycode und IDNA?", a: "Punycode (RFC 3492) ist der Algorithmus, der Unicode in ASCII umwandelt. IDNA (RFC 5890) ist das Framework, das Punycode auf Domainnamen anwendet, indem das xn---Präfix hinzugefügt wird, um anzuzeigen, dass die Etikette kodiert ist. Dieses Tool unterstützt sowohl rohes Punycode als auch IDNA-Domains." },
        { q: "Warum beginnt die Domain mit xn--?", a: "Das xn---Präfix teilt DNS-Resolvern und Browsern mit, dass die Etikette Punycode-kodiertes Unicode ist. Ohne es würde das DNS-System die Etikette als normalen ASCII-Hostnamen interpretieren. Alle nicht-ASCII-Domain-Etiketten müssen gemäß IDNA mit xn-- beginnen." },
      ],
    ),
  },
  ru: {
    name: "Конвертер Punycode и IDN",
    tagline: "Преобразуйте интернационализированные доменные имена между Unicode и Punycode (формат xn--) — бутстринг-кодирование RFC 3492 для IDNA, используется DNS, браузерами и почтовыми системами по всему миру. Бесплатно, мгновенно, офлайн.",
    ...common(
      [
        "Интернационализированные доменные имена (IDN) позволяют регистрировать домены в родных письменностях — 中文.com, bücher.de, ログイン.jp. Но протокол DNS понимает только ASCII, поэтому эти домены кодируются как Punycode с префиксом xn-- (по RFC 3492 и IDNA RFC 5890). Этот конвертер обрабатывает оба направления.",
        "Кодирование использует стандартный бутстринг-алгоритм Punycode из RFC 3492, который преобразует любую строку Unicode в обратимую чисто ASCII-форму. Кодирование IDNA дополнительно обрабатывает домен метка за меткой (разделяя по точкам) и добавляет префикс xn-- к каждой не-ASCII метке.",
        "Всё выполняется локально — без DNS-запросов, без сетевых вызовов. Реализация использует проверенную временем библиотеку punycode (Mathias Bynens, тот же код, что питает Node.js), перекрёстно проверенную против встроенного Punycode-кодека Python.",
      ],
      [
        "Выберите Кодирование (Unicode → xn--) или Декодирование (xn-- → Unicode).",
        "Введите доменное имя или строку Punycode.",
        "Результат появится с кнопкой копирования — многоэтикеточные домены обрабатываются этикетка за этикеткой.",
      ],
      [
        { q: "В чём разница между Punycode и IDNA?", a: "Punycode (RFC 3492) — алгоритм, преобразующий Unicode в ASCII. IDNA (RFC 5890) — рамка, применяющая Punycode к доменным именам, добавляя префикс xn-- для обозначения того, что метка закодирована. Этот инструмент поддерживает и сырой Punycode, и IDNA-домены." },
        { q: "Почему домен начинается с xn--?", a: "Префикс xn-- сообщает DNS-резолверам и браузерам, что метка является Unicode, закодированным в Punycode. Без него DNS-система интерпретировала бы метку как обычное ASCII-имя хоста. Все не-ASCII доменные метки должны начинаться с xn-- согласно IDNA." },
      ],
    ),
  },
  it: {
    name: "Convertitore Punycode e IDN",
    tagline: "Converti nomi di dominio internationalized tra Unicode e Punycode (formato xn--) — codifica bootstring RFC 3492 per IDNA, usata da DNS, browser e sistemi di posta in tutto il mondo. Gratuito, istantaneo, offline.",
    ...common(
      [
        "I nomi di dominio internationalized (IDN) consentono di registrare domini nelle scritture native — 中文.com, bücher.de, ログイン.jp. Ma il protocollo DNS comprende solo ASCII, quindi questi domini vengono codificati come Punycode con il prefisso xn-- (secondo RFC 3492 e IDNA RFC 5890). Questo convertitore gestisce entrambe le direzioni.",
        "La codifica usa l'algoritmo bootstring Punycode standard di RFC 3492, che converte qualsiasi stringa Unicode in una forma ASCII reversibile. La codifica IDNA elabora ulteriormente il dominio etichetta per etichetta (dividendo per punti) e aggiunge il prefisso xn-- a ogni etichetta non ASCII.",
        "Tutto gira localmente — nessuna query DNS, nessuna chiamata di rete. L'implementazione usa la libreria punycode battle-tested (Mathias Bynens, lo stesso codice che alimenta Node.js), verificata in modo incrociato contro il codec punycode integrato di Python.",
      ],
      [
        "Scegli Codifica (Unicode → xn--) o Decodifica (xn-- → Unicode).",
        "Inserisci il nome di dominio o la stringa Punycode.",
        "Il risultato appare con pulsante di copia — i domini multi-etichetta vengono elaborati etichetta per etichetta.",
      ],
      [
        { q: "Qual è la differenza tra Punycode e IDNA?", a: "Punycode (RFC 3492) è l'algoritmo che converte Unicode in ASCII. IDNA (RFC 5890) è il framework che applica Punycode ai nomi di dominio, aggiungendo il prefisso xn-- per segnalare che l'etichetta è codificata. Questo strumento supporta sia Punycode grezzo che domini IDNA." },
        { q: "Perché il dominio inizia con xn--?", a: "Il prefisso xn-- indica ai resolver DNS e ai browser che l'etichetta è Unicode codificata in Punycode. Senza di esso, il sistema DNS interpreterebbe l'etichetta come un normale nome host ASCII. Tutte le etichette di dominio non ASCII devono iniziare con xn-- secondo IDNA." },
      ],
    ),
  },
  tr: {
    name: "Punycode ve IDN dönüştürücü",
    tagline: "Uluslararasılaştırılmış alan adlarını Unicode ve Punycode (xn-- formatı) arasında dönüştürün — IDNA için RFC 3492 bootstring kodlama, DNS, tarayıcılar ve e-posta sistemleri tarafından kullanılır. Ücretsiz, anında, çevrimdışı.",
    ...common(
      [
        "Uluslararasılaştırılmış alan adları (IDN), kullanıcıların ana dillerinde alan adı kaydetmesine olanak tanır — 中文.com, bücher.de, ログイン.jp. Ancak DNS protokolü yalnızca ASCII'yi anlar, bu yüzden bu alan adları xn-- önekli Punycode olarak kodlanır (RFC 3492 ve IDNA RFC 5890'e göre). Bu dönüştürücü her iki yönü de işler.",
        "Kodlama, RFC 3492'nin standart Bootstring algoritmasını kullanır ve herhangi bir Unicode dizesini geri döndürülebilir saf ASCII biçimine dönüştürür. IDNA kodlaması ek olarak alan adını etiket etiket işler (noktalara bölerek) ve her ASCII olmayan etikete xn-- önekini ekler.",
        "Her şey yerelde çalışır — DNS sorgusu yok, ağ çağrısı yok. Uygulama, savaşta test edilmiş punycode kütüphanesini kullanır (Mathias Bynens, Node.js'yi besleyen kodun aynısı), Python'un yerleşik punycode codec'iyle çapraz doğrulanmıştır.",
      ],
      [
        "Kodla (Unicode → xn--) veya Çöz (xn-- → Unicode) seçin.",
        "Alan adını veya Punycode dizesini girin.",
        "Sonuç kopyalama düğmesiyle görünür — çok etiketli alan adları etiket etiket işlenir.",
      ],
      [
        { q: "Punycode ve IDNA arasındaki fark nedir?", a: "Punycode (RFC 3492), Unicode'yu ASCII'ye dönüştüren algoritmadır. IDNA (RFC 5890), Punycode'u alan adlarına uygulayan ve xn-- önekini ekleyerek etiketin kodlandığını gösteren çerçevedir. Bu araç hem ham Punycode'u hem de IDNA alan adlarını destekler." },
        { q: "Alan adı neden xn-- ile başlıyor?", a: "xn-- öneki, DNS çözümleyicilere ve tarayıcılara etiketin Punycode-kodlanmış Unicode olduğunu bildirir. Onsuz, DNS sistemi etiketi normal bir ASCII ana bilgisayar adı olarak yorumlardı. Tüm ASCII olmayan alan adı etiketleri IDNA'ya göre xn-- ile başlamalıdır." },
      ],
    ),
  },
  ko: {
    name: "Punycode·IDN 변환기",
    tagline: "국제화 도메인명을 Unicode와 Punycode(xn-- 형식) 간에 변환합니다 — IDNA를 위한 RFC 3492 부트스트링 인코딩, 전 세계 DNS·브라우저·이메일 시스템에서 사용. 무료 · 즉시 · 오프라인 작동.",
    ...common(
      [
        "국제화 도메인명(IDN)은 사용자가 모국어로 도메인을 등록할 수 있게 합니다 — 中文.com, bücher.de, ログイン.jp. 하지만 DNS 프로토콜은 ASCII만 이해하므로, 이런 도메인은 xn-- 접두사가 붙은 Punycode(RFC 3492 및 IDNA RFC 5890에 따라)로 인코딩됩니다. 이 변환기는 양방향을 지원합니다.",
        "인코딩은 RFC 3492의 표준 부트스트링 알고리즘을 사용하여 임의의 Unicode 문자열을 가역적 순수 ASCII 형식으로 변환합니다. IDNA 인코딩은 추가로 도메인을 라벨별로 처리(점으로 분리)하고 비 ASCII 라벨에 xn-- 접두사를 추가합니다.",
        "모든 것이 로컬로 실행됩니다 — DNS 쿼리도 네트워크 호출도 없습니다. 구현은 전투에서 검증된 punycode 라이브러리(Mathias Bynens, Node.js를 구동하는 동일 코드)를 사용하며, Python 내장 punycode 코덱과 교차 검증되었습니다.",
      ],
      [
        "인코딩(Unicode → xn--)또는 디코딩(xn-- → Unicode)을 선택하세요.",
        "도메인 이름이나 Punycode 문자열을 입력하세요.",
        "결과가 복사 버튼과 함께 아래에 표시됩니다 — 다중 라벨 도메인은 라벨별로 처리됩니다.",
      ],
      [
        { q: "Punycode와 IDNA의 차이점은?", a: "Punycode(RFC 3492)는 Unicode를 ASCII로 변환하는 알고리즘입니다. IDNA(RFC 5890)는 Punycode를 도메인 이름에 적용하는 프레임워크로, xn-- 접두사를 추가하여 라벨이 인코딩되었음을 표시합니다. 이 도구는 원시 Punycode와 IDNA 도메인 모두를 지원합니다." },
        { q: "도메인이 xn--으로 시작하는 이유는?", a: "xn-- 접두사는 DNS 리졸버와 브라우저에게 해당 라벨이 Punycode 인코딩된 Unicode임을 알립니다. 이것이 없으면 DNS 시스템은 라벨을 일반 ASCII 호스트명으로 해석합니다. 모든 비 ASCII 도메인 라벨은 IDNA에 따라 xn--으로 시작해야 합니다." },
      ],
    ),
  },
  ar: {
    name: "محوّل Punycode وIDN",
    tagline: "حوّل أسماء النطاقات الدولية بين Unicode وPunycode (تنسيق xn--) — ترميز bootstring RFC 3492 لـ IDNA، مستخدم من DNS والمتصفحات وأنظمة البريد عالميًا. مجاني وفوري ويعمل دون اتصال.",
    ...common(
      [
        "أسماء النطاقات الدولية (IDN) تتيح للمستخدمين تسجيل النطاقات بلغاتهم الأم — 中文.com، bücher.de، ログイン.jp. لكن بروتوكول DNS يفهم ASCII فقط، فتُرمَّز هذه النطاقات كـ Punycode مع بادئة xn-- (وفق RFC 3492 وIDNA RFC 5890). يدعم هذا المحوّل الاتجاهين.",
        "يستخدم الترميز خوارزمية bootstring Punycode القياسية من RFC 3492، التي تحول أي سلسلة Unicode إلى شكل ASCII عكوس. يضيف ترميز IDNA معالجة النطاق ملصقًا بملصق (بالقسمة على النقاط) ويضيف بادئة xn-- لكل ملصق غير ASCII.",
        "كل شيء يعمل محليًا — بلا استعلامات DNS، بلا استدعاءات شبكة. يستخدم التنفيذ مكتبة punycode المجربة (Mathias Bynens، نفس الكود الذي يشغّل Node.js)، موثقة تبادليًا ضد ترميز punycode المدمج في Python.",
      ],
      [
        "اختر ترميز (Unicode → xn--) أو فك (xn-- → Unicode).",
        "أدخل اسم النطاق أو سلسلة Punycode.",
        "تظهر النتيجة مع زر نسخ — النطاقات متعددة الملصقات تُعالج ملصقًا بملصق.",
      ],
      [
        { q: "ما الفرق بين Punycode وIDNA؟", a: "Punycode (RFC 3492) هو الخوارزمية التي تحول Unicode إلى ASCII. IDNA (RFC 5890) هو الإطار الذي يطبق Punycode على أسماء النطاقات، مضيفًا بادئة xn-- للإشارة إلى أن الملصق مُرمَّز. يدعم هذا الأداة كل من Punycode الخام والنطاقات المرمّزة IDNA." },
        { q: "لماذا يبدأ النطاق بـ xn--؟", a: "بادئة xn-- تخبر محولات DNS والمتصفحات أن الملصق هو Unicode مُرمَّز بـ Punycode. بدونها، سيفسر نظام DNS الملصق كاسم مضيف ASCII عادي. جميع ملصقات النطاقات غير ASCII يجب أن تبدأ بـ xn-- وفق IDNA." },
      ],
    ),
  },
  hi: {
    name: "Punycode और IDN कनवर्टर",
    tagline: "अंतर्राष्ट्रीयकृत डोमेन नामों को Unicode और Punycode (xn-- प्रारूप) के बीच बदलें — IDNA के लिए RFC 3492 बूटस्ट्रिंग एनकोडिंग, DNS, ब्राउज़र और ईमेल सिस्टम द्वारा उपयोग किया जाता है। मुफ़्त, तत्काल, ऑफ़लाइन।",
    ...common(
      [
        "अंतर्राष्ट्रीयकृत डोमेन नाम (IDN) उपयोगकर्ताओं को अपनी मूल लिपियों में डोमेन पंजीकृत करने देते हैं — 中文.com, bücher.de, ログイン.jp। लेकिन DNS प्रोटोकॉल केवल ASCII समझता है, इसलिए इन डोमेन को Punycode के रूप में xn-- प्रीफिक्स के साथ एनकोड किया जाता है (RFC 3492 और IDNA RFC 5890 के अनुसार)। यह कनवर्टर दोनों दिशाओं को संभालता है।",
        "एनकोडिंग RFC 3492 के मानक बूटस्ट्रिंग एल्गोरिद्म का उपयोग करती है, जो किसी भी Unicode स्ट्रिंग को एक उलटने योग्य शुद्ध ASCII रूप में बदलती है। IDNA एनकोडिंग अतिरिक्त रूप से डोमेन को लेबल-दर-लेबल प्रोसेस करती है (डॉट्स पर विभाजित करके) और प्रत्येक गैर-ASCII लेबल में xn-- प्रीफिक्स जोड़ती है।",
        "सब कुछ लोकल चलता है — कोई DNS क्वेरी नहीं, कोई नेटवर्क कॉल नहीं। इम्प्लीमेंटेशन battle-tested punycode लाइब्रेरी का उपयोग करता है (Mathias Bynens, वही कोड जो Node.js को चलाता है), Python के अंतर्निहित punycode कोडेक के साथ क्रॉस-वेरिफाइड।",
      ],
      [
        "एनकोड (Unicode → xn--) या डिकोड (xn-- → Unicode) चुनें।",
        "डोमेन नाम या Punycode स्ट्रिंग दर्ज करें।",
        "परिणाम कॉपी बटन के साथ नीचे दिखता है — मल्टी-लेबल डोमेन लेबल-दर-लेबल प्रोसेस किए जाते हैं।",
      ],
      [
        { q: "Punycode और IDNA में क्या अंतर है?", a: "Punycode (RFC 3492) वह एल्गोरिद्म है जो Unicode को ASCII में बदलता है। IDNA (RFC 5890) वह फ्रेमवर्क है जो Punycode को डोमेन नामों पर लागू करता है, xn-- प्रीफिक्स जोड़कर यह दर्शाते हुए कि लेबल एनकोडेड है। यह टूल दोनों का समर्थन करता है — raw Punycode और IDNA डोमेन।" },
        { q: "डोमेन xn-- से क्यों शुरू होता है?", a: "xn-- प्रीफिक्स DNS रिज़ॉल्वर और ब्राउज़रों को बताता है कि लेबल Punycode-एनकोडेड Unicode है। इसके बिना, DNS सिस्टम लेबल को सामान्य ASCII होस्टनाम समझेगा। सभी गैर-ASCII डोमेन लेबल IDNA के अनुसार xn-- से शुरू होने चाहिए।" },
      ],
    ),
  },
  id: {
    name: "Konverter Punycode dan IDN",
    tagline: "Konversi nama domain internasional antara Unicode dan Punycode (format xn--) — pengodean bootstring RFC 3492 untuk IDNA, digunakan oleh DNS, browser, dan sistem email di seluruh dunia. Gratis, instan, offline.",
    ...common(
      [
        "Nama domain internasional (IDN) memungkinkan pengguna mendaftarkan domain dalam aksara asli mereka — 中文.com, bücher.de, ログイン.jp. Tetapi protokol DNS hanya memahami ASCII, sehingga domain-domain ini dikodekan sebagai Punycode dengan prefiks xn-- (sesuai RFC 3492 dan IDNA RFC 5890). Konverter ini menangani kedua arah.",
        "Pengodean menggunakan algoritme bootstring Punycode standar dari RFC 3492, yang mengonversi string Unicode apa pun menjadi bentuk ASCII reversibel. Pengodean IDNA secara tambahan memproses domain label demi label (memisahkan dengan titik) dan menambahkan prefiks xn-- ke setiap label non-ASCII.",
        "Semuanya berjalan lokal — tanpa kueri DNS, tanpa panggilan jaringan. Implementasi menggunakan pustaka punycode battle-tested (Mathias Bynens, kode yang sama yang menggerakkan Node.js), terverifikasi silang terhadap codec punycode bawaan Python.",
      ],
      [
        "Pilih Enkode (Unicode → xn--) atau Dekode (xn-- → Unicode).",
        "Masukkan nama domain atau string Punycode.",
        "Hasil muncul dengan tombol salin — domain multi-label diproses label demi label.",
      ],
      [
        { q: "Apa perbedaan antara Punycode dan IDNA?", a: "Punycode (RFC 3492) adalah algoritme yang mengonversi Unicode ke ASCII. IDNA (RFC 5890) adalah framework yang menerapkan Punycode ke nama domain, menambahkan prefiks xn-- untuk menandai bahwa label dikodekan. Alat ini mendukung Punycode mentah dan domain IDNA." },
        { q: "Mengapa domain dimulai dengan xn--?", a: "Prefiks xn-- memberi tahu resolver DNS dan browser bahwa label adalah Unicode yang dikodekan Punycode. Tanpanya, sistem DNS akan menginterpretasi label sebagai hostname ASCII biasa. Semua label domain non-ASCII harus dimulai dengan xn-- sesuai IDNA." },
      ],
    ),
  },
  vi: {
    name: "Bộ chuyển đổi Punycode và IDN",
    tagline: "Chuyển đổi tên miền quốc tế hóa giữa Unicode và Punycode (định dạng xn--) — mã hóa bootstring RFC 3492 cho IDNA, được DNS, trình duyệt và hệ thống email sử dụng trên toàn thế giới. Miễn phí, tức thì, ngoại tuyến.",
    ...common(
      [
        "Tên miền quốc tế hóa (IDN) cho phép người dùng đăng ký tên miền bằng chữ viết gốc của họ — 中文.com, bücher.de, ログイン.jp. Nhưng giao thức DNS chỉ hiểu ASCII, nên các tên miền này được mã hóa thành Punycode với tiền tố xn-- (theo RFC 3492 và IDNA RFC 5890). Bộ chuyển đổi này xử lý cả hai hướng.",
        "Việc mã hóa sử dụng thuật toán bootstring Punycode tiêu chuẩn từ RFC 3492, chuyển đổi bất kỳ chuỗi Unicode nào thành dạng ASCII có thể đảo ngược. Việc mã hóa IDNA thêm xử lý tên miền nhãn theo nhãn (tách bằng dấu chấm) và thêm tiền tố xn-- vào mỗi nhãn không phải ASCII.",
        "Mọi thứ chạy cục bộ — không truy vấn DNS, không gọi mạng. Bản triển khai sử dụng thư viện punycode battle-tested (Mathias Bynens, cùng mã nguồn cung cấp cho Node.js), kiểm chứng chéo với codec punycode tích hợp của Python.",
      ],
      [
        "Chọn Mã hóa (Unicode → xn--) hoặc Giải mã (xn-- → Unicode).",
        "Nhập tên miền hoặc chuỗi Punycode.",
        "Kết quả xuất hiện với nút sao chép — tên miền nhiều nhãn được xử lý nhãn theo nhãn.",
      ],
      [
        { q: "Sự khác biệt giữa Punycode và IDNA là gì?", a: "Punycode (RFC 3492) là thuật toán chuyển đổi Unicode thành ASCII. IDNA (RFC 5890) là khung áp dụng Punycode vào tên miền, thêm tiền tố xn-- để báo hiệu rằng nhãn được mã hóa. Công cụ này hỗ trợ cả Punycode thô và tên miền IDNA." },
        { q: "Tại sao tên miền bắt đầu bằng xn--?", a: "Tiền tố xn-- cho bộ phân giải DNS và trình duyệt biết rằng nhãn là Unicode được mã hóa bằng Punycode. Không có nó, hệ thống DNS sẽ diễn giải nhãn như một tên máy chủ ASCII thông thường. Tất cả nhãn tên miền không phải ASCII phải bắt đầu bằng xn-- theo IDNA." },
      ],
    ),
  },
};
