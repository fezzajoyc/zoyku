/**
 * CN-023 rsa-key-generator 扩展语言 overlay(10 语)。
 */

import type { ToolCopy } from "./types";

function common(
  intro: [string, string, string],
  steps: [string, string, string],
  faqs: Array<{ q: string; a: string }>,
) {
  return { intro, steps, faqs };
}

export const RSA_OVERLAYS: Record<string, ToolCopy> = {
  fr: {
    name: "Générateur de paire de clés RSA",
    tagline: "Générez des paires de clés RSA (2048/3072/4096 bits) dans votre navigateur avec WebCrypto natif — export PEM et JWK, implémentation vérifiée par signature. Gratuit, privé, hors ligne.",
    ...common(
      [
        "RSA reste l'algorithme de référence pour la signature JWT, l'échange de clés et la signature de documents. Ce générateur crée de vraies paires avec le WebCrypto natif de votre navigateur — RSASSA-PKCS1-v1_5 avec SHA-256 et l'exposant public standard 65537 — en 2048, 3072 ou 4096 bits.",
        "Les clés sont exportées dans les deux formats acceptés partout : PEM (SPKI pour la clé publique, PKCS#8 pour la clé privée) prêt pour openssl, les bibliothèques JWT et les configs serveur, plus JSON Web Key (JWK) pour les plateformes web JOSE.",
        "Tout est généré localement avec crypto.subtle — la clé privée ne quitte jamais cet onglet, aucune conservation côté serveur. La génération en 4096 bits peut prendre quelques secondes.",
      ],
      [
        "Choisissez la taille : 2048 (défaut), 3072 ou 4096 bits.",
        "Cliquez sur Générer une paire de clés — une nouvelle paire est créée en mémoire.",
        "Copiez les clés PEM publique et privée, ou le JWK combiné, dans votre application ou configuration.",
      ],
      [
        { q: "Quelle taille de clé choisir ?", a: "2048 bits est la base actuelle, acceptée par presque toutes les bibliothèques JWT et autorités de certification. 3072 bits correspond au niveau ~128 bits d'AES-128 ; 4096 bits ajoute de la marge au prix de signatures plus lentes. Pour les nouveaux designs, envisagez Ed25519, plus rapide — RSA reste le choix quand l'interopérabilité l'exige." },
        { q: "Est-il sûr de générer une clé privée dans le navigateur ?", a: "La clé est créée par l'API cryptographique native du navigateur et affichée uniquement dans cet onglet — rien n'est transmis ni stocké. Le risque équivaut à celui d'un appareil compromis. Pour l'infrastructure de production, préférez la génération hors ligne ou HSM ; pour le développement et les projets personnels, ce flux est tout à fait adapté." },
      ],
    ),
  },
  de: {
    name: "RSA-Schlüsselpaar-Generator",
    tagline: "Erzeugen Sie RSA-Schlüsselpaare (2048/3072/4096 Bit) im Browser mit nativem WebCrypto — PEM- und JWK-Export, signaturverifizierte Implementierung. Kostenlos, privat, offline.",
    ...common(
      [
        "RSA ist weiterhin das Arbeitstier für JWT-Signaturen, Schlüsselaustausch und Dokumentensignaturen. Dieser Generator erzeugt echte Paare mit dem nativen WebCrypto Ihres Browsers — RSASSA-PKCS1-v1_5 mit SHA-256 und dem Standard-Exponenten 65537 — in 2048, 3072 oder 4096 Bit.",
        "Die Schlüssel werden in den beiden überall akzeptierten Formaten exportiert: PEM (SPKI für den öffentlichen, PKCS#8 für den privaten Schlüssel), bereit für openssl, JWT-Bibliotheken und Serverkonfigurationen, plus JSON Web Key (JWK) für JOSE-Webplattformen.",
        "Alles wird lokal mit crypto.subtle erzeugt — der private Schlüssel verlässt diesen Tab nie, keine serverseitige Verwahrung. Die 4096-Bit-Generierung kann einige Sekunden dauern.",
      ],
      [
        "Wählen Sie die Schlüsselgröße: 2048 (Standard), 3072 oder 4096 Bit.",
        "Klicken Sie auf Schlüsselpaar generieren — ein neues Paar wird im Speicher erstellt.",
        "Kopieren Sie die PEM-Schlüssel oder das kombinierte JWK in Ihre Anwendung oder Konfiguration.",
      ],
      [
        { q: "Welche Schlüsselgröße sollte ich wählen?", a: "2048 Bit ist die aktuelle Basis und wird von praktisch allen JWT-Bibliotheken und Zertifizierungsstellen akzeptiert. 3072 Bit entspricht dem ~128-Bit-Sicherheitsniveau von AES-128; 4096 Bit fügt Marge auf Kosten langsamerer Signaturen hinzu. Für Neuentwürfe ist auch das schnellere Ed25519 eine Überlegung wert — RSA bleibt die Wahl, wenn Interoperabilität es verlangt." },
        { q: "Ist es sicher, einen privaten Schlüssel im Browser zu erzeugen?", a: "Der Schlüssel wird von der integrierten Krypto-API des Browsers erzeugt und nur in diesem Tab angezeigt — nichts wird übertragen oder gespeichert. Das Risiko entspricht dem eines kompromittierten Geräts. Für Produktionsinfrastruktur Offline- oder HSM-Generierung bevorzugen; für Entwicklung und private Projekte ist dieser Ablauf völlig ausreichend." },
      ],
    ),
  },
  ru: {
    name: "Генератор пар ключей RSA",
    tagline: "Генерируйте пары ключей RSA (2048/3072/4096 бит) в браузере на нативном WebCrypto — экспорт PEM и JWK, реализация проверена подписью. Бесплатно, приватно, офлайн.",
    ...common(
      [
        "RSA по-прежнему основной алгоритм подписи JWT, обмена ключами и подписи документов. Этот генератор создаёт настоящие пары на нативном WebCrypto вашего браузера — RSASSA-PKCS1-v1_5 с SHA-256 и стандартной экспонентой 65537 — в 2048, 3072 или 4096 бит.",
        "Ключи экспортируются в двух форматах, которые принимает любой инструмент: PEM (SPKI для открытого, PKCS#8 для закрытого) для openssl, JWT-библиотек и конфигураций серверов, плюс JSON Web Key (JWK) для веб-платформ JOSE.",
        "Всё генерируется локально через crypto.subtle — закрытый ключ никогда не покидает эту вкладку, никакой серверной эскроу. Генерация 4096 бит может занять несколько секунд.",
      ],
      [
        "Выберите размер: 2048 (по умолчанию), 3072 или 4096 бит.",
        "Нажмите Сгенерировать пару ключей — новая пара создаётся в памяти.",
        "Скопируйте PEM-ключи или объединённый JWK в своё приложение или конфигурацию.",
      ],
      [
        { q: "Какой размер ключа выбрать?", a: "2048 бит — текущая база, принимается практически всеми JWT-библиотеками и удостоверяющими центрами. 3072 бита соответствует ~128-битному уровню AES-128; 4096 бит добавляет запас ценой более медленных подписей. В новых дизайнах стоит рассмотреть более быстрый Ed25519 — RSA остаётся выбором, когда требует совместимость." },
        { q: "Безопасно ли генерировать закрытый ключ в браузере?", a: "Ключ создаётся встроенным крипто-API браузера и показывается только в этой вкладке — ничего не передаётся и не сохраняется. Риск равен риску компрометации самого устройства. Для продакшн-инфраструктуры предпочитайте офлайн- или HSM-генерацию; для разработки и личных проектов этот поток вполне достаточен." },
      ],
    ),
  },
  it: {
    name: "Generatore di coppie di chiavi RSA",
    tagline: "Genera coppie di chiavi RSA (2048/3072/4096 bit) nel browser con WebCrypto nativo — esportazione PEM e JWK, implementazione verificata per firma. Gratuito, privato, offline.",
    ...common(
      [
        "RSA resta il cavallo di battaglia per firma JWT, scambio di chiavi e firme di documenti. Questo generatore crea coppie reali con il WebCrypto nativo del tuo browser — RSASSA-PKCS1-v1_5 con SHA-256 e l'esponente pubblico standard 65537 — in 2048, 3072 o 4096 bit.",
        "Le chiavi vengono esportate nei due formati accettati da ogni strumento: PEM (SPKI per la chiave pubblica, PKCS#8 per la privata) pronto per openssl, librerie JWT e configurazioni server, più JSON Web Key (JWK) per le piattaforme web JOSE.",
        "Tutto è generato localmente con crypto.subtle — la chiave privata non lascia mai questa scheda, nessuna custodia server-side. La generazione a 4096 bit può richiedere alcuni secondi.",
      ],
      [
        "Scegli la dimensione: 2048 (predefinito), 3072 o 4096 bit.",
        "Clicca Genera coppia di chiavi — una nuova coppia viene creata in memoria.",
        "Copia le chiavi PEM o il JWK combinato nella tua applicazione o configurazione.",
      ],
      [
        { q: "Quale dimensione di chiave scegliere?", a: "2048 bit è la base attuale, accettata da praticamente tutte le librerie JWT e authority di certificazione. 3072 bit corrisponde al livello ~128 bit di AES-128; 4096 bit aggiunge margine al costo di firme più lente. Per i nuovi design considera Ed25519, più veloce — RSA resta la scelta quando serve interoperabilità." },
        { q: "È sicuro generare una chiave privata nel browser?", a: "La chiave è creata dall'API crittografica nativa del browser e mostrata solo in questa scheda — nulla viene trasmesso o salvato. Il rischio equivale al compromissione del dispositivo. Per infrastruttura di produzione preferisci generazione offline o HSM; per sviluppo e progetti personali questo flusso è adeguato." },
      ],
    ),
  },
  tr: {
    name: "RSA anahtar çifti üreteci",
    tagline: "Tarayıcınızda yerleşik WebCrypto ile RSA anahtar çiftleri (2048/3072/4096 bit) üretin — PEM ve JWK dışa aktarma, imzayla doğrulanmış uygulama. Ücretsiz, özel, çevrimdışı.",
    ...common(
      [
        "RSA, JWT imzası, anahtar değişimi ve belge imzalarının ana gücü olmaya devam ediyor. Bu üreteci, tarayıcınızın yerleşik WebCrypto'suyla gerçek anahtar çiftleri oluşturur — RSASSA-PKCS1-v1_5, SHA-256 ve standart genel üs 65537 ile — 2048, 3072 veya 4096 bit.",
        "Anahtarlar her aracın kabul ettiği iki biçimde dışa aktarılır: PEM (genel anahtar SPKI, özel anahtar PKCS#8) openssl, JWT kütüphaneleri ve sunucu yapılandırmalarına hazır; ayrıca JOSE web platformları için JSON Web Key (JWK).",
        "Her şey crypto.subtle ile yerel olarak üretilir — özel anahtar bu sekmeyi asla terk etmez, sunucu tarafı saklama yoktur. 4096 bit üretimi birkaç saniye sürebilir.",
      ],
      [
        "Anahtar boyutunu seçin: 2048 (varsayılan), 3072 veya 4096 bit.",
        "Anahtar çifti üret'e tıklayın — bellekte yeni bir çift oluşturulur.",
        "PEM anahtarlarını veya birleşik JWK'yi uygulamanıza veya yapılandırmanıza kopyalayın.",
      ],
      [
        { q: "Hangi anahtar boyutunu seçmeliyim?", a: "2048 bit güncel temel nostur ve neredeyse tüm JWT kütüphaneleri ile sertifika otoriteleri tarafından kabul edilir. 3072 bit AES-128'in ~128 bit güvenlik düzeyine karşılık gelir; 4096 bit daha yavaş imzalar pahasına pay ekler. Yeni tasarımlarda daha hızlı Ed25519 da düşünebilir — birlikte çalışabilirlik gerektiğinde RSA tercih edilir." },
        { q: "Tarayıcıda özel anahtar üretmek güvenli mi?", a: "Anahtar, tarayıcının yerleşik kripto API'si tarafından oluşturulur ve yalnızca bu sekmede gösterilir — hiçbir şey iletilmez veya saklanmaz. Risk, cihazın kendisinin ele geçirilme riskine eşittir. Üretim altyapısı için çevrimdışı veya HSM üretimini tercih edin; geliştirme ve kişisel projeler için bu akış tamamen yeterlidir." },
      ],
    ),
  },
  ko: {
    name: "RSA 키 쌍 생성기",
    tagline: "브라우저 네이티브 WebCrypto로 RSA 키 쌍(2048/3072/4096비트)을 생성합니다 — PEM·JWK 내보내기, 서명 교차 검증된 구현. 무료 · 프라이빗 · 오프라인 작동.",
    ...common(
      [
        "RSA는 여전히 JWT 서명, 키 교환, 문서 서명의 주력입니다. 이 생성기는 브라우저의 WebCrypto로 실제 키 쌍을 만듭니다 — RSASSA-PKCS1-v1_5, SHA-256, 표준 공개 지수 65537 — 2048/3072/4096비트.",
        "키는 모든 도구가 받아들이는 두 형식으로 내보내집니다: PEM(공개 키 SPKI, 개인 키 PKCS#8)은 openssl·JWT 라이브러리·서버 설정에 바로 쓸 수 있고, JSON Web Key(JWK)는 JOSE 계열 웹 플랫폼용입니다.",
        "모두 crypto.subtle로 로컬 생성 — 개인 키는 이 탭을 떠나지 않으며 서버 보관도 없습니다. 4096비트 생성은 몇 초 걸릴 수 있습니다.",
      ],
      [
        "키 길이를 선택하세요: 2048(기본), 3072 또는 4096비트.",
        "키 쌍 생성을 클릭하세요 — 메모리에 새 쌍이 만들어집니다.",
        "PEM 공개·개인 키 또는 합친 JWK를 애플리케이션이나 설정에 복사하세요.",
      ],
      [
        { q: "어떤 키 길이를 선택해야 하나요?", a: "2048비트가 현재 기준이며 거의 모든 JWT 라이브러리와 인증 기관이 받아들입니다. 3072비트는 AES-128의 ~128비트 보안 수준, 4096비트는 더 느린 서명을 감수하고 여유를 더합니다. 새 설계라면 더 빠른 Ed25519도 고려할 만합니다 — 상호 운용이 필요하면 RSA가 선택입니다." },
        { q: "브라우저에서 개인 키를 생성해도 안전한가요?", a: "키는 브라우저 내장 암호 API가 생성하며 이 탭에만 표시됩니다 — 전송·저장이 없습니다. 위험은 기기 자체가 침해될 위험과 같습니다. 프로덕션 인프라는 오프라인이나 HSM 생성을 권장하며, 개발·개인 프로젝트에는 이 방식으로 충분합니다." },
      ],
    ),
  },
  ar: {
    name: "مولد أزواج مفاتيح RSA",
    tagline: "أنشئ أزواج مفاتيح RSA (2048/3072/4096 بت) في متصفحك عبر WebCrypto الأصلي — تصدير PEM وJWK، تطبيق موثق بالتوقيع. مجاني وخاص ويعمل دون اتصال.",
    ...common(
      [
        "RSA لا تزال العمل الأساسي لتوقيع JWT وتبادل المفاتيح وتوقيع المستندات. ينشئ هذا المولد أزواجًا حقيقية عبر WebCrypto الأصلي في متصفحك — RSASSA-PKCS1-v1_5 مع SHA-256 والأُس العام القياسي 65537 — بـ 2048 أو 3072 أو 4096 بت.",
        "تُصدَّر المفاتيح بالصيغتين اللتين تقبلهما كل الأدوات: PEM (SPKI للمفتاح العام وPKCS#8 للخاص) جاهز لـ openssl ومكتبات JWT وإعدادات الخوادم، إضافة إلى JSON Web Key (JWK) لمنصات الويب JOSE.",
        "كل شيء يُنشأ محليًا عبر crypto.subtle — المفتاح الخاص لا يترك هذه التبويبة أبدًا، ولا حفظ من جانب الخادم. قد يستغرق توليد 4096 بت بضع ثوانٍ.",
      ],
      [
        "اختر حجم المفتاح: 2048 (افتراضي) أو 3072 أو 4096 بت.",
        "انقر على أنشئ زوج المفاتيح — يُنشأ زوج جديد في الذاكرة.",
        "انسخ مفتاحي PEM العام والخاص، أو JWK المجمّع، إلى تطبيقك أو إعداداتك.",
      ],
      [
        { q: "أي حجم مفتاح أختار؟", a: "2048 بت هو الخط الأساسي الحالي وتقبله كل مكتبات JWT وجهات الاعتماد تقريبًا. 3072 بت يقابل مستوى أمان AES-128 (~128 بت)؛ و4096 بت يضيف هامشًا على حساب توقيعات أبطأ. في التصاميم الجديدة فكّر في Ed25519 الأسرع — تبقى RSA الخيار عندما تتطلب التوافقية." },
        { q: "هل من الآمن توليد مفتاح خاص في المتصفح؟", a: "يُنشأ المفتاح عبر واجهة التشفير المدمجة في المتصفح ويُعرض فقط في هذه التبويبة — لا شيء يُرسل أو يُخزَّن. الخطر يعادل خطر اختراق جهازك نفسه. للبنية الإنتاجية فضّل التوليد دون اتصال أو عبر HSM؛ وللتطوير والمشاريع الشخصية هذا المسار كافٍ تمامًا." },
      ],
    ),
  },
  hi: {
    name: "RSA की-पेयर जेनरेटर",
    tagline: "अपने ब्राउज़र के नेटिव WebCrypto से RSA की-पेयर (2048/3072/4096-बिट) बनाएं — PEM और JWK एक्सपोर्ट, सिग्नेचर-सत्यापित इम्प्लीमेंटेशन। मुफ़्त, निजी, ऑफ़लाइन।",
    ...common(
      [
        "RSA आज भी JWT साइनिंग, की एक्सचेंज और दस्तावेज़ हस्ताक्षर की मुख्य पसंद है। यह जेनरेटर आपके ब्राउज़र के नेटिव WebCrypto से असली की-पेयर बनाता है — RSASSA-PKCS1-v1_5, SHA-256 और मानक पब्लिक एक्सपोनेंट 65537 के साथ — 2048, 3072 या 4096 बिट में।",
        "कियाँ उन दो फ़ॉर्मैट में एक्सपोर्ट होती हैं जो हर टूल स्वीकारता है: PEM (पब्लिक के लिए SPKI, प्राइवेट के लिए PKCS#8) openssl, JWT लाइब्रेरी और सर्वर कॉन्फ़िग के लिए तैयार; और JOSE वेब प्लेटफ़ॉर्म के लिए JSON Web Key (JWK)।",
        "सब कुछ crypto.subtle से लोकल बनता है — प्राइवेट की इस टैब से बाहर नहीं जाती, कोई सर्वर-साइड कस्टडी नहीं। 4096-बिट जनरेशन में कुछ सेकंड लग सकते हैं।",
      ],
      [
        "की साइज़ चुनें: 2048 (डिफ़ॉल्ट), 3072 या 4096 बिट।",
        "Generate key pair पर क्लिक करें — मेमोरी में नया पेयर बनता है।",
        "PEM पब्लिक/प्राइवेट की या संयुक्त JWK को अपने ऐप या कॉन्फ़िग में कॉपी करें।",
      ],
      [
        { q: "कौन सा की साइज़ चुनूँ?", a: "2048 बिट वर्तमान बेसलाइन है और लगभग हर JWT लाइब्रेरी व CA स्वीकारती है। 3072 बिट AES-128 के ~128-बिट सुरक्षा स्तर जैसा है; 4096 बिट धीमी साइनिंग के बदले मार्जिन देता है। नए डिज़ाइन में तेज़ Ed25519 भी देखें — इंटरऑप ज़रूरी होने पर RSA चुनाव है।" },
        { q: "ब्राउज़र में प्राइवेट की बनाना सुरक्षित है?", a: "की ब्राउज़र के अंतर्निहित क्रिप्टो API से बनती है और केवल इसी टैब में दिखती है — कुछ भी ट्रांसमिट या स्टोर नहीं होता। जोखिम आपके डिवाइस के खुद के कम्प्रोमाइज़ जितना है। प्रोडक्शन इंफ्रा के लिए ऑफ़लाइन या HSM जनरेशन पसंद करें; डेवलपमेंट और पर्सनल प्रोजेक्ट के लिए यह फ़्लो पूरी तरह ठीक है।" },
      ],
    ),
  },
  id: {
    name: "Generator pasangan kunci RSA",
    tagline: "Buat pasangan kunci RSA (2048/3072/4096 bit) di browser Anda dengan WebCrypto bawaan — ekspor PEM dan JWK, implementasi terverifikasi tanda tangan. Gratis, privat, offline.",
    ...common(
      [
        "RSA masih andalan untuk penandatanganan JWT, pertukaran kunci, dan tanda tangan dokumen. Generator ini membuat pasangan nyata dengan WebCrypto bawaan browser Anda — RSASSA-PKCS1-v1_5 dengan SHA-256 dan eksponen publik standar 65537 — dalam 2048, 3072, atau 4096 bit.",
        "Kunci diekspor dalam dua format yang diterima semua alat: PEM (SPKI untuk kunci publik, PKCS#8 untuk privat) siap untuk openssl, pustaka JWT, dan konfigurasi server, plus JSON Web Key (JWK) untuk platform web JOSE.",
        "Semuanya dibuat lokal dengan crypto.subtle — kunci privat tidak pernah keluar dari tab ini, tanpa penyimpanan sisi server. Pembuatan 4096 bit bisa memakan waktu beberapa detik.",
      ],
      [
        "Pilih ukuran kunci: 2048 (bawaan), 3072, atau 4096 bit.",
        "Klik Generate key pair — pasangan baru dibuat di memori.",
        "Salin kunci PEM publik/privat, atau JWK gabungan, ke aplikasi atau konfigurasi Anda.",
      ],
      [
        { q: "Ukuran kunci mana yang harus dipilih?", a: "2048 bit adalah baseline saat ini dan diterima hampir semua pustaka JWT dan otoritas sertifikasi. 3072 bit setara level keamanan ~128 bit AES-128; 4096 bit menambah margin dengan biaya penandatanganan lebih lambat. Untuk desain baru pertimbangkan Ed25519 yang lebih cepat — RSA tetap pilihan saat interoperabilitas menuntut." },
        { q: "Apakah aman membuat kunci privat di browser?", a: "Kunci dibuat oleh API kripto bawaan browser dan hanya ditampilkan di tab ini — tidak ada yang dikirim atau disimpan. Riskenya setara dengan risiko perangkat Anda dikompromikan. Untuk infrastruktur produksi, utamakan pembuatan offline atau HSM; untuk pengembangan dan proyek pribadi alur ini sepenuhnya memadai." },
      ],
    ),
  },
  vi: {
    name: "Trình tạo cặp khóa RSA",
    tagline: "Tạo cặp khóa RSA (2048/3072/4096 bit) ngay trong trình duyệt bằng WebCrypto gốc — xuất PEM và JWK, bản triển khai đã kiểm chứng bằng chữ ký. Miễn phí, riêng tư, ngoại tuyến.",
    ...common(
      [
        "RSA vẫn là trụ cột cho ký JWT, trao đổi khóa và ký tài liệu. Trình tạo này tạo cặp khóa thật bằng WebCrypto gốc của trình duyệt — RSASSA-PKCS1-v1_5 với SHA-256 và số mũ công khai chuẩn 65537 — ở 2048, 3072 hoặc 4096 bit.",
        "Khóa được xuất ở hai định dạng mà mọi công cụ đều chấp nhận: PEM (SPKI cho khóa công khai, PKCS#8 cho khóa riêng) sẵn sàng cho openssl, thư viện JWT và cấu hình máy chủ; cộng thêm JSON Web Key (JWK) cho các nền tảng web JOSE.",
        "Mọi thứ được tạo cục bộ bằng crypto.subtle — khóa riêng không bao giờ rời tab này, không lưu trữ phía máy chủ. Việc tạo 4096 bit có thể mất vài giây.",
      ],
      [
        "Chọn kích thước khóa: 2048 (mặc định), 3072 hoặc 4096 bit.",
        "Nhấp Generate key pair — một cặp mới được tạo trong bộ nhớ.",
        "Sao chép khóa PEM công khai/riêng, hoặc JWK gộp chung, vào ứng dụng hoặc cấu hình của bạn.",
      ],
      [
        { q: "Nên chọn kích thước khóa nào?", a: "2048 bit là chuẩn hiện hành, được hầu hết thư viện JWT và CA chấp nhận. 3072 bit tương ứng mức an toàn ~128 bit của AES-128; 4096 bit thêm biên độ với chi phí ký chậm hơn. Thiết kế mới nên cân nhắc Ed25519 nhanh hơn — RSA vẫn là lựa chọn khi cần tương thích." },
        { q: "Tạo khóa riêng trong trình duyệt có an toàn không?", a: "Khóa được tạo bởi API mật mã tích hợp của trình duyệt và chỉ hiển thị trong tab này — không truyền cũng không lưu. Rủi ro tương đương rủi ro thiết bị của bạn bị xâm phạm. Hạ tầng sản xuất nên tạo offline hoặc qua HSM; với phát triển và dự án cá nhân, quy trình này hoàn toàn phù hợp." },
      ],
    ),
  },
};
