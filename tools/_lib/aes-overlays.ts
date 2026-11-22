/**
 * CN-026 aes-encrypt 扩展语言 overlay(10 语)。
 */

import type { ToolCopy } from "./types";

function common(
  intro: [string, string, string],
  steps: [string, string, string],
  faqs: Array<{ q: string; a: string }>,
) {
  return { intro, steps, faqs };
}

export const AES_OVERLAYS: Record<string, ToolCopy> = {
  fr: {
    name: "Chiffrement et déchiffrement AES-256",
    tagline: "Chiffrez et déchiffrez du texte avec AES-256-GCM dans votre navigateur — phrase renforcée par PBKDF2, chiffrement authentifié qui rejette la falsification, charge Base64 autodescriptive. Gratuit, privé, hors ligne.",
    ...common(
      [
        "AES-GCM est le chiffrement authentifié vers lequel toute l'industrie a convergé : il protège confidentialité et intégrité à la fois, donc une phrase erronée ou une charge falsifiée est rejetée au lieu de produire du charabia. Cet outil dérive une clé de 256 bits de votre phrase avec PBKDF2-SHA256 à 210 000 itérations et chiffre avec un salt et un IV aléatoires neufs à chaque fois.",
        "La sortie est une charge Base64 autodescriptive unique : salt ‖ IV ‖ chiffrement. Collez-la avec la même phrase et elle se déchiffre — pas de champs salt/IV séparés, aucun réglage à reproduire. Le mode CBC n'est inclus que pour compatibilité avec les systèmes hérités, clairement marqué comme non authentifié.",
        "Tout s'exécute localement avec le WebCrypto natif de votre navigateur — la phrase et le texte en clair ne quittent jamais cet onglet, aucune conservation de clé côté serveur par conception.",
      ],
      [
        "Choisissez Chiffrer ou Déchiffrer, et le mode (GCM recommandé ; CBC uniquement pour l'interopérabilité héritée).",
        "Saisissez la phrase et le texte — pour déchiffrer, collez la charge Base64 complète.",
        "Cliquez sur Exécuter — le résultat apparaît avec un bouton de copie ; phrases erronées et falsifications sont explicitement rejetées.",
      ],
      [
        { q: "Pourquoi GCM échoue bruyamment au lieu de déchiffrer en charabia ?", a: "GCM est un mode authentifié : avec le chiffrement il calcule une balise d'authentification, et le déchiffrement la vérifie avant de renvoyer quoi que ce soit. Une phrase erronée, un bit inversé ou une charge tronquée échouent à la vérification et sont rejetés — c'est la propriété qui fait de GCM le standard de l'industrie. CBC n'a pas cette balise, d'où son marquage hérité ici." },
        { q: "Une phrase vaut-elle une clé aléatoire ?", a: "Avec PBKDF2 à 210 000 itérations, une phrase vraiment aléatoire de plusieurs mots est forte en pratique ; un mot de passe humain court non — le nombre d'itérations ne fait que ralentir la force brute, il ne sauve pas un secret devinable. Pour les flux machine à machine, générez une clé à haute entropie et distribuez-la via un gestionnaire de secrets plutôt qu'une phrase." },
      ],
    ),
  },
  de: {
    name: "AES-256 Verschlüsselung & Entschlüsselung",
    tagline: "Verschlüsseln und entschlüsseln Sie Text mit AES-256-GCM im Browser — PBKDF2-gehärtete Passphrase, authentifizierte Verschlüsselung, die Manipulation ablehnt, selbstbeschreibende Base64-Nutzlast. Kostenlos, privat, offline.",
    ...common(
      [
        "AES-GCM ist die authentifizierte Verschlüsselung, auf die sich die ganze Industrie geeinigt hat: Sie schützt Vertraulichkeit und Integrität zugleich, sodass eine falsche Passphrase oder eine manipulierte Nutzlast abgelehnt wird, statt stillschweigend Müll zu erzeugen. Dieses Tool leitet aus Ihrer Passphrase mit PBKDF2-SHA256 bei 210.000 Iterationen einen 256-Bit-Schlüssel ab und verschlüsselt mit jedes Mal neuem zufälligem Salt und IV.",
        "Die Ausgabe ist eine einzelne selbstbeschreibende Base64-Nutzlast: salt ‖ IV ‖ Chiffretext. Mit derselben Passphrase eingefügt entschlüsselt sie sich — keine separaten Salt/IV-Felder, keine zu reproduzierenden Einstellungen. CBC ist nur für die Kompatibilität mit Legacy-Systemen enthalten, klar als unauthentifiziert markiert.",
        "Alles läuft lokal mit dem nativen WebCrypto Ihres Browsers — Passphrase und Klartext verlassen diesen Tab nie, eine serverseitige Schlüsselverwahrung gibt es konstruktionsbedingt nicht.",
      ],
      [
        "Wählen Sie Verschlüsseln oder Entschlüsseln und den Modus (GCM empfohlen; CBC nur für Legacy-Interop).",
        "Geben Sie Passphrase und Text ein — zum Entschlüsseln die vollständige Base64-Nutzlast einfügen.",
        "Auf Ausführen klicken — das Ergebnis erscheint mit Kopierbutton; falsche Passphrasen und Manipulationen werden explizit abgelehnt.",
      ],
      [
        { q: "Warum scheitert GCM laut, statt Müll zu entschlüsseln?", a: "GCM ist ein authentifizierter Modus: Zusammen mit dem Chiffretext wird ein Authentifizierungs-Tag berechnet, und die Entschlüsselung prüft diesen, bevor etwas zurückgegeben wird. Eine falsche Passphrase, ein gedrehtes Bit oder eine gekürzte Nutzlast scheitern an der Prüfung und werden abgelehnt — die Eigenschaft, die GCM zum Industriestandard macht. CBC hat keinen solchen Tag, daher die Legacy-Kennzeichnung." },
        { q: "Ist eine Passphrase so gut wie ein Zufallsschlüssel?", a: "Mit PBKDF2 bei 210.000 Iterationen ist eine wirklich zufällige Multi-Wort-Passphrase praktisch stark; ein kurzes menschliches Passwort nicht — die Iterationszahl verlangsamt nur Brute Force, ein erratbares Geheimnis wird nicht gerettet. Für Maschine-zu-Maschine-Abläufe einen Hochentropie-Schlüssel generieren und über einen Secret-Manager statt einer Passphrase verteilen." },
      ],
    ),
  },
  ru: {
    name: "Шифрование и дешифрование AES-256",
    tagline: "Шифруйте и дешифруйте текст с AES-256-GCM в браузере — фраза, укреплённая PBKDF2, аутентифицированное шифрование, отвергающее подделку, самодескриптивная Base64-нагрузка. Бесплатно, приватно, офлайн.",
    ...common(
      [
        "AES-GCM — аутентифицированное шифрование, на котором сошлась вся индустрия: оно защищает конфиденциальность и целостность одновременно, поэтому неверная фраза или подделанная нагрузка отвергается вместо тихого производства мусора. Этот инструмент выводит 256-битный ключ из вашей фразы через PBKDF2-SHA256 (210 000 итераций) и шифрует с новым случайным salt и IV каждый раз.",
        "Выход — единая самодескриптивная Base64-нагрузка: salt ‖ IV ‖ шифртекст. Вставьте её с той же фразой — и она расшифруется; никаких отдельных полей salt/IV и настроек для воспроизведения. Режим CBC включён только для совместимости с унаследованными системами и явно помечен как неаутентифицированный.",
        "Всё выполняется локально через нативный WebCrypto вашего браузера — фраза и открытый текст никогда не покидают эту вкладку, серверное хранение ключей отсутствует по конструкции.",
      ],
      [
        "Выберите Шифрование или Дешифрование и режим (GCM рекомендуется; CBC только для legacy-совместимости).",
        "Введите фразу и текст — для дешифрования вставьте полную Base64-нагрузку.",
        "Нажмите Выполнить — результат появится ниже с кнопкой копирования; неверные фразы и подделки явно отвергаются.",
      ],
      [
        { q: "Почему GCM отказывает громко, а не расшифровывает в мусор?", a: "GCM — аутентифицированный режим: вместе с шифртекстом вычисляется тег аутентификации, и дешифрование проверяет его, прежде чем что-либо вернуть. Неверная фраза, перевёрнутый бит или усечённая нагрузка проваливают проверку и отвергаются — это свойство делает GCM отраслевым стандартом. У CBC такого тега нет, потому он здесь помечен как legacy." },
        { q: "Фраза заменяет случайный ключ?", a: "С PBKDF2 на 210 000 итераций по-настоящему случайная многословная фраза практично сильна; короткий человеческий пароль — нет — число итераций лишь замедляет перебор, угадываемый секрет оно не спасает. Для потоков машина-машина генерируйте высокоэнтропийный ключ и распространяйте через менеджер секретов, а не фразу." },
      ],
    ),
  },
  it: {
    name: "Cifratura e decifratura AES-256",
    tagline: "Cifra e decifra testo con AES-256-GCM nel browser — frase rafforzata con PBKDF2, cifratura autenticata che rifiuta le manomissioni, payload Base64 autodescrittivo. Gratuito, privato, offline.",
    ...common(
      [
        "AES-GCM è la cifratura autenticata su cui tutta l'industria è convergita: protegge confidenzialità e integrità insieme, così una frase errata o un payload manomesso viene rifiutato invece di produrre spazzatura. Questo strumento deriva una chiave a 256 bit dalla tua frase con PBKDF2-SHA256 a 210.000 iterazioni e cifra con salt e IV casuali nuovi a ogni volta.",
        "L'output è un singolo payload Base64 autodescrittivo: salt ‖ IV ‖ cifrato. Incollalo con la stessa frase e si decifra — nessun campo salt/IV separato, nessuna impostazione da riprodurre. La modalità CBC è inclusa solo per compatibilità con sistemi legacy, chiaramente marcata come non autenticata.",
        "Tutto gira localmente con il WebCrypto nativo del tuo browser — la frase e il testo in chiaro non lasciano mai questa scheda, nessuna custodia di chiavi lato server per progetto.",
      ],
      [
        "Scegli Cifra o Decifra, e la modalità (GCM consigliato; CBC solo per interop legacy).",
        "Inserisci la frase e il testo — per decifrare, incolla il payload Base64 completo.",
        "Clicca Esegui — il risultato appare sotto con pulsante di copia; frasi errate e manomissioni vengono rifiutate esplicitamente.",
      ],
      [
        { q: "Perché GCM fallisce rumorosamente invece di decifrare in spazzatura?", a: "GCM è una modalità autenticata: insieme al cifrato calcola un tag di autenticazione, e la decifratura lo verifica prima di restituire qualsiasi cosa. Una frase errata, un bit invertito o un payload troncato falliscono la verifica e vengono rifiutati — è la proprietà che fa di GCM lo standard del settore. CBC non ha questo tag, per cui qui è marcato legacy." },
        { q: "Una frase vale come chiave casuale?", a: "Con PBKDF2 a 210.000 iterazioni, una frase davvero casuale di più parole è forte ai fini pratici; una password umana breve no — il conteggio di iterazioni rallenta solo la forza bruta, non salva un segreto indovinabile. Per flussi macchina-macchina genera una chiave ad alta entropia e distribuiscila tramite un gestore di segreti invece di una frase." },
      ],
    ),
  },
  tr: {
    name: "AES-256 şifreleme ve çözme",
    tagline: "Tarayıcınızda AES-256-GCM ile metni şifreleyin ve çözün — PBKDF2 ile güçlendirilmiş parola, kurcalamayı reddeden kimlik doğrulamalı şifreleme, kendi kendini tanımlayan Base64 yükü. Ücretsiz, özel, çevrimdışı.",
    ...common(
      [
        "AES-GCM, tüm sektörün üzerinde anlaştığı kimlik doğrulamalı şifrelemedir: gizliliği ve bütünlüğü aynı anda korur, böylece yanlış parola veya kurcalanmış yük çöp üretmek yerine reddedilir. Bu araç, parolanızı PBKDF2-SHA256 (210.000 iterasyon) ile 256 bitlik anahtara çevirir ve her seferinde yeni rastgele salt ve IV ile şifreler.",
        "Çıktı tek bir kendi kendini tanımlayan Base64 yüküdür: salt ‖ IV ‖ şifreli metin. Aynı parolayla geri yapıştırın — çözülür; ayrı salt/IV alanı yok, tekrarlanacak ayar yok. CBC modu yalnızca zorunlu kılan eski sistemlerle uyumluluk için vardır ve kimlik doğrulamasız olduğu açıkça işaretlidir.",
        "Her şey tarayıcınızın yerleşik WebCrypto'su ile yerelde çalışır — parola ve düz metin bu sekmeden asla çıkmaz, sunucu tarafı anahtar saklama tasarım gereği yoktur.",
      ],
      [
        "Şifrele veya Çöz'ü ve modu seçin (GCM önerilir; CBC yalnızca eski sistemlerle uyum için).",
        "Parolayı ve metni girin — çözmek için tam Base64 yükünü yapıştırın.",
        "Çalıştır'a tıklayın — sonuç aşağıda kopyalama düğmesiyle görünür; yanlış parolalar ve kurcalamalar açıkça reddedilir.",
      ],
      [
        { q: "GCM neden çöp üretmek yerine yüksek sesle başarısız olur?", a: "GCM kimlik doğrulamalı bir moddur: şifreli metinle birlikte bir kimlik doğrulama etiketi hesaplar ve çözme işlemi hiçbir şey döndürmeden önce bu etiketi doğrular. Yanlış parola, çevrilmiş bir bit veya kırpılmış yük etiket kontrolünde başarısız olur ve reddedilir — GCM'u sektör standardı yapan özellik budur. CBC'nin böyle bir etiketi yoktur, bu yüzden burada eski olarak işaretlidir." },
        { q: "Parola rastgele anahtar yerine geçer mi?", a: "210.000 iterasyonlu PBKDF2 ile gerçekten rastgele çok kelimelik bir parola pratikte güçlüdür; kısa bir insan parolası değildir — iterasyon sayısı yalnızca kaba kuvveti yavaşlatır, tahmin edilebilir bir sırrı kurtarmaz. Makine-makine akışları için yüksek entropili anahtar üretin ve parola yerine bir sır yöneticisiyle dağıtın." },
      ],
    ),
  },
  ko: {
    name: "AES-256 암호화·복호화",
    tagline: "브라우저에서 AES-256-GCM으로 텍스트를 암호화·복호화합니다 — PBKDF2 강화 패스프레이즈, 변조를 거부하는 인증 암호화, 자기 기술형 Base64 페이로드. 무료 · 프라이빗 · 오프라인 작동.",
    ...common(
      [
        "AES-GCM은 업계 전체가 수렴한 인증 암호화입니다: 기밀성과 무결성을 동시에 보호하므로 잘못된 패스프레이즈나 변조된 페이로드는 조용히 쓰레기를 만드는 대신 거부됩니다. 이 도구는 PBKDF2-SHA256(210,000회)으로 패스프레이즈에서 256비트 키를 도출하고 매번 새로운 무작위 salt와 IV로 암호화합니다.",
        "출력은 단일 자기 기술형 Base64 페이로드입니다: salt ‖ IV ‖ 암호문. 같은 패스프레이즈로 붙여넣으면 복호화됩니다 — 별도의 salt/IV 필드도, 재현할 설정도 없습니다. CBC는 강제하는 레거시 시스템과의 호환성을 위해서만 제공되며 인증 없음이 명시되어 있습니다.",
        "모든 것이 브라우저의 네이티브 WebCrypto로 로컬 실행됩니다 — 패스프레이즈와 평문은 이 탭을 떠나지 않으며 서버 측 키 보관은 설계상 없습니다.",
      ],
      [
        "암호화 또는 복호화와 모드를 선택하세요(GCM 권장; CBC는 레거시 호환 전용).",
        "패스프레이즈와 텍스트를 입력하세요 — 복호화 시 전체 Base64 페이로드를 붙여넣습니다.",
        "실행을 클릭하세요 — 결과가 아래에 표시되고 복사 버튼이 있습니다. 잘못된 패스프레이즈와 변조는 명시적으로 거부됩니다.",
      ],
      [
        { q: "GCM이 쓰레기를 복호화하는 대신 크게 실패하는 이유는?", a: "GCM은 인증 모드입니다: 암호문과 함께 인증 태그를 계산하고 복호화는 무엇을 반환하기 전에 태그를 검증합니다. 잘못된 패스프레이즈, 뒤집힌 비트, 잘린 페이로드는 모두 태그 검증에 실패하고 거부됩니다 — GCM을 업계 표준으로 만드는 속성입니다. CBC에는 이런 태그가 없어 여기서는 레거시로 표시합니다." },
        { q: "패스프레이즈가 무작위 키를 대신할 수 있나요?", a: "210,000회 PBKDF2에서 진짜 무작위 다단어 패스프레이즈는 실용적으로 강합니다. 짧은 인간 암호는 아닙니다 — 반복 횟수는 무차별 대입만 늦출 뿐 추측 가능한 비밀은 구원하지 못합니다. 기계-기계 흐름에서는 고엔트로피 키를 생성해 패스프레이즈 대신 시크릿 매니저로 배포하세요." },
      ],
    ),
  },
  ar: {
    name: "تشفير وفك تشفير AES-256",
    tagline: "شفّر وفك تشفير النص بـ AES-256-GCM في متصفحك — عبارة مرور مقواة بـ PBKDF2، تشفير مصادق يرفض العبث، حمولة Base64 ذاتية الوصف. مجاني وخاص ويعمل دون اتصال.",
    ...common(
      [
        "AES-GCM هو التشفير المصادق الذي اجتمعت عليه الصناعة كلها: يحمي السرية والسلامة معًا، فالعبرة الخاطئة أو الحمولة العبثية تُرفض بدلًا من إنتاج فوضى بصمت. يشتق هذا الأداة مفتاحًا بطول 256 بت من عبورك عبر PBKDF2-SHA256 بـ 210,000 تكرار ويشفّر بـ salt وIV عشوائيين جديدين كل مرة.",
        "الناتج حمولة Base64 ذاتية الوصف واحدة: salt ‖ IV ‖ النص المشفر. الصقها بنفس العبرة وستُفك — لا حقول salt/IV منفصلة، ولا إعدادات لإعادة إنتاجها. وضع CBC مضمّن فقط للتوافق مع الأنظمة القديمة، ومعلَّم بوضوح أنه بلا مصادقة.",
        "كل شيء يعمل محليًا عبر WebCrypto المدمج في متصفحك — العبرة والنص الصريح لا يتركان هذه التبويبة أبدًا، ولا حفظ للمفاتيح على الخادم بالتصميم.",
      ],
      [
        "اختر تشفير أو فك تشفير، والوضع (GCM موصى به؛ CBC للتوافق مع القديم فقط).",
        "أدخل العبرة والنص — لفك التشفير الصق حمولة Base64 كاملة.",
        "انقر على نفّذ — تظهر النتيجة أدناه مع زر نسخ؛ العبرات الخاطئة والعبث تُرفض صراحة.",
      ],
      [
        { q: "لماذا يفشل GCM بصوت عال بدلًا من فك التشفير إلى فوضى؟", a: "GCM وضع مصادق: مع النص المشفر يحسب وسم مصادقة، وفك التشفير يتحقق من الوسم قبل إرجاع أي شيء. عبارة خاطئة أو بت مقلوب أو حمولة مقصوصة تفشل في التحقق وتُرفض — هذه الخاصية تجعل GCM معيار الصناعة. CBC لا يملك هذا الوسم، لذا عُلّم هنا كقديم." },
        { q: "هل العبرة تعادل مفتاحًا عشوائيًا؟", a: "مع PBKDF2 بـ 210,000 تكرار، العبارة العشوائية فعلاً متعددة الكلمات قوية عمليًا؛ كلمة المرور البشرية القصيرة ليست — عدد التكرارات يبطئ الهجوم بالقوة الغاشمة فقط ولا ينقذ سرًا قابلًا للتخمين. لتدفقات آلة-آلة ولّد مفتاحًا عالي الإنتروبيا ووزّعه عبر مدير أسرار بدل عبارة." },
      ],
    ),
  },
  hi: {
    name: "AES-256 कूटलेखन और विकूटलेखन",
    tagline: "अपने ब्राउज़र में AES-256-GCM से टेक्स्ट कूटलेखित और विकूटलेखित करें — PBKDF2-सुदृढ़ पासफ्रेज़, छेड़छाड़ अस्वीकार करने वाला प्रमाणित कूटलेखन, स्वयं-वर्णनशील Base64 पेलोड। मुफ़्त, निजी, ऑफ़लाइन।",
    ...common(
      [
        "AES-GCM वह प्रमाणित कूटलेखन है जिस पर पूरा उद्योग सहमत हुआ है: यह गोपनीयता और अखंडता एक साथ सुरक्षित करता है, इसलिए गलत पासफ्रेज़ या छेड़ा हुआ पेलोड चुपचाप कचरा बनाने के बजाय अस्वीकार किया जाता है। यह टूल आपके पासफ्रेज़ से PBKDF2-SHA256 (210,000 पुनरावृत्तियों) से 256-बिट कुंजी व्युत्पन्न करता है और हर बार नए यादृच्छिक salt और IV से कूटलेखित करता है।",
        "आउटपुट एक एकल स्वयं-वर्णनशील Base64 पेलोड है: salt ‖ IV ‖ साइफरटेक्स्ट। वही पासफ्रेज़ लगाकर वापस पेस्ट करें और वह विकूटलेखित हो जाता है — अलग salt/IV फ़ील्ड नहीं, दोहराने की कोई सेटिंग नहीं। CBC केवल उन पुराने सिस्टमों के साथ संगतता के लिए है जो इसे मजबूर करते हैं, स्पष्ट रूप से बिना प्रमाणीकरण चिह्नित।",
        "सब कुछ आपके ब्राउज़र के नेटिव WebCrypto से स्थानीय रूप से चलता है — पासफ्रेज़ और प्लेनटेक्स्ट इस टैब से कभी बाहर नहीं जाते, और सर्वर-साइड कुंजी कस्टडी डिज़ाइन से नहीं है।",
      ],
      [
        "Encrypt या Decrypt चुनें, और मोड (GCM अनुशंसित; CBC केवल लेगेसी इंटरऑप के लिए)।",
        "पासफ्रेज़ और टेक्स्ट दर्ज करें — विकूटलेखन के लिए पूरा Base64 पेलोड पेस्ट करें।",
        "Run पर क्लिक करें — परिणाम कॉपी बटन के साथ नीचे दिखता है; गलत पासफ्रेज़ और छेड़छाड़ स्पष्ट रूप से अस्वीकार की जाती हैं।",
      ],
      [
        { q: "GCM कचरे में विकूटलेखित करने के बजाय जोर से क्यों विफल होता है?", a: "GCM एक प्रमाणित मोड है: साइफरटेक्स्ट के साथ एक प्रमाणीकरण टैग गणना होती है, और विकूटलेखन कुछ भी लौटाने से पहले उस टैग को सत्यापित करता है। गलत पासफ्रेज़, पलटा हुआ बिट या कटा हुआ पेलोड सभी टैग जाँच में विफल होकर अस्वीकार होते हैं — यही गुण GCM को उद्योग मानक बनाता है। CBC में ऐसा टैग नहीं है, इसलिए यहाँ इसे लेगेसी चिह्नित किया गया है।" },
        { q: "पासफ्रेज़ यादृच्छिक कुंजी के बराबर है?", a: "210,000 पुनरावृत्तियों के PBKDF2 पर, वास्तव में यादृच्छिक बहु-शब्द पासफ्रेज़ व्यावहारिक उद्देश्यों के लिए मजबूत है; छोटा मानवीय पासवर्ड नहीं — पुनरावृत्ति संख्या केवल ब्रूट फ़ोर्स को धीमा करती है, अनुमान लगाने योग्य रहस्य को नहीं बचाती। मशीन-टू-मशीन प्रवाहों के लिए उच्च-एन्ट्रॉपी कुंजी बनाएँ और पासफ्रेज़ के बजाय सीक्रेट मैनेजर से वितरित करें।" },
      ],
    ),
  },
  id: {
    name: "Enkripsi dan dekripsi AES-256",
    tagline: "Enkripsi dan dekripsi teks dengan AES-256-GCM di browser Anda — frasa sandi yang diperkuat PBKDF2, enkripsi terautentikasi yang menolak perusakan, payload Base64 yang menjelaskan dirinya. Gratis, privat, offline.",
    ...common(
      [
        "AES-GCM adalah enkripsi terautentikasi yang dipilih seluruh industri: melindungi kerahasiaan dan integritas sekaligus, jadi frasa sandi yang salah atau payload yang dirusak ditolak alih-alih menghasilkan sampah. Alat ini menurunkan kunci 256-bit dari frasa sandi Anda dengan PBKDF2-SHA256 pada 210.000 iterasi dan mengenkripsi dengan salt dan IV acak baru setiap kali.",
        "Outputnya adalah satu payload Base64 yang menjelaskan dirinya sendiri: salt ‖ IV ‖ ciphertext. Tempel kembali dengan frasa sandi yang sama dan ia terdekripsi — tanpa field salt/IV terpisah, tanpa pengaturan untuk direproduksi. Mode CBC hanya disertakan untuk kompatibilitas dengan sistem warisan yang mewajibkannya, ditandai jelas sebagai tanpa autentikasi.",
        "Semuanya berjalan lokal dengan WebCrypto bawaan browser Anda — frasa sandi dan plaintext tidak pernah keluar dari tab ini, dan tidak ada penitipan kunci di sisi server secara desain.",
      ],
      [
        "Pilih Enkripsi atau Dekripsi, dan mode (GCM direkomendasikan; CBC hanya untuk interop warisan).",
        "Masukkan frasa sandi dan teks — untuk dekripsi, tempel seluruh payload Base64.",
        "Klik Jalankan — hasil muncul di bawah dengan tombol salin; frasa sandi salah dan perusakan ditolak secara eksplisit.",
      ],
      [
        { q: "Mengapa GCM gagal dengan keras alih-alih mendekripsi menjadi sampah?", a: "GCM adalah mode terautentikasi: bersama ciphertext ia menghitung tag autentikasi, dan dekripsi memverifikasi tag itu sebelum mengembalikan apa pun. Frasa sandi yang salah, bit yang dibalik, atau payload yang dipotong semuanya gagal verifikasi tag dan ditolak — properti yang menjadikan GCM standar industri. CBC tidak memiliki tag itu, sehingga ditandai warisan di sini." },
        { q: "Apakah frasa sandi setara kunci acak?", a: "Dengan PBKDF2 pada 210.000 iterasi, frasa multi-kata yang benar-benar acak praktis kuat; kata sandi manusia yang pendek tidak — jumlah iterasi hanya memperlambat brute force, tidak menyelamatkan rahasia yang dapat ditebak. Untuk alur mesin-ke-mesin, buat kunci entropi tinggi dan distribusikan lewat manajer rahasia alih-alih frasa sandi." },
      ],
    ),
  },
  vi: {
    name: "Mã hóa và giải mã AES-256",
    tagline: "Mã hóa và giải mã văn bản bằng AES-256-GCM ngay trong trình duyệt — cụm mật khẩu được củng cố bằng PBKDF2, mã hóa xác thực từ chối mọi can thiệp, tải trọng Base64 tự mô tả. Miễn phí, riêng tư, ngoại tuyến.",
    ...common(
      [
        "AES-GCM là phương thức mã hóa xác thực mà toàn ngành đã hội tụ: bảo vệ cả tính bảo mật lẫn toàn vẹn cùng lúc, nên cụm mật khẩu sai hoặc tải trọng bị can thiệp bị từ chối thay vì âm thầm tạo ra rác. Công cụ này suy diễn khóa 256-bit từ cụm mật khẩu của bạn bằng PBKDF2-SHA256 với 210.000 vòng lặp và mã hóa bằng salt và IV ngẫu nhiên mới mỗi lần.",
        "Đầu ra là một tải trọng Base64 tự mô tả duy nhất: salt ‖ IV ‖ bản mã. Dán lại với cùng cụm mật khẩu và nó được giải mã — không có trường salt/IV riêng, không có thiết lập cần tái lập. Chế độ CBC chỉ có để tương thích với hệ thống cũ bắt buộc dùng, được đánh dấu rõ là không xác thực.",
        "Mọi thứ chạy cục bộ bằng WebCrypto gốc của trình duyệt — cụm mật khẩu và bản rõ không bao giờ rời tab này, và không có nơi lưu trữ khóa phía máy chủ theo thiết kế.",
      ],
      [
        "Chọn Mã hóa hoặc Giải mã, và chế độ (khuyên dùng GCM; CBC chỉ để tương thích hệ thống cũ).",
        "Nhập cụm mật khẩu và văn bản — để giải mã, dán toàn bộ tải trọng Base64.",
        "Nhấp Chạy — kết quả xuất hiện bên dưới với nút sao chép; cụm mật khẩu sai và hành vi can thiệp bị từ chối rõ ràng.",
      ],
      [
        { q: "Tại sao GCM thất bại ồn ào thay vì giải mã thành rác?", a: "GCM là chế độ xác thực: cùng bản mã, nó tính một thẻ xác thực, và việc giải mã kiểm tra thẻ đó trước khi trả về bất kỳ điều gì. Cụm mật khẩu sai, một bit bị đảo hay tải trọng bị cắt đều fail kiểm tra thẻ và bị từ chối — đó là thuộc tính làm GCM thành tiêu chuẩn ngành. CBC không có thẻ đó, nên được đánh dấu là legacy tại đây." },
        { q: "Cụm mật khẩu có thay thế được khóa ngẫu nhiên?", a: "Với PBKDF2 ở 210.000 vòng lặp, một cụm mật khẩu nhiều từ thực sự ngẫu nhiên là đủ mạnh cho mục đích thực tế; mật khẩu con người ngắn thì không — số vòng lặp chỉ làm chậm brute force, không cứu được bí mật đoán được. Với luồng máy-máy, hãy tạo khóa entropy cao và phân phối qua trình quản lý bí mật thay vì cụm mật khẩu." },
      ],
    ),
  },
};
