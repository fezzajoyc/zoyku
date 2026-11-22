/**
 * CN-029 matrix-calculator 扩展语言 overlay(10 语)。
 */

import type { ToolCopy } from "./types";

function common(
  intro: [string, string, string],
  steps: [string, string, string],
  faqs: Array<{ q: string; a: string }>,
) {
  return { intro, steps, faqs };
}

export const MATRIX_OVERLAYS: Record<string, ToolCopy> = {
  fr: {
    name: "Calculatrice de matrices",
    tagline: "Déterminants, inverses, transposées, multiplication et addition pour matrices 2×2, 3×3 et 4×4 — élimination Gauss–Jordan avec pivotage partiel, implémentation vérifiée contre NumPy. Gratuit, instantané, hors ligne.",
    ...common(
      [
        "Les matrices apparaissent partout : devoirs d'algèbre linéaire, transformations en infographie, coefficients de régression. Cette calculatrice traite les matrices carrées 2×2, 3×3 et 4×4 : déterminants par expansion de cofacteurs, inverses par élimination Gauss–Jordan avec pivotage partiel, plus transposées, produits et sommes.",
        "Saisissez des entiers ou décimaux — l'inverse utilise le pivotage partiel, donc même les matrices qui casseraient des implémentations naïves se résolvent correctement, et les matrices singulières (déterminant 0) sont rejetées avec un message explicite au lieu de produire des divisions par zéro. Les résultats s'affichent à 12 chiffres significatifs, exacts pour les matrices entières jusqu'à cet arrondi.",
        "Tout le calcul s'exécute localement en arithmétique typée pure — aucun appel réseau. Vérifié contre NumPy comme implémentation indépendante sur tout l'ensemble d'opérations.",
      ],
      [
        "Choisissez la taille de la matrice (2×2, 3×3 ou 4×4).",
        "Remplissez la matrice A (et B pour multiplication/addition) avec des entiers ou décimaux.",
        "Cliquez sur une opération — déterminant, inverse, transposée, A×B ou A+B — et la matrice résultat apparaît avec un bouton de copie.",
      ],
      [
        { q: "Pourquoi ne puis-je pas inverser une matrice de déterminant 0 ?", a: "Un déterminant de 0 signifie que la matrice projette l'espace vers une dimension inférieure — le système linéaire qu'elle représente n'a pas de solution unique, donc aucune matrice ne peut l'annuler. Ces matrices sont dites singulières ; cet outil les rejette explicitement plutôt que de produire des infinis ou du charabia." },
        { q: "Pourquoi l'inverse s'affiche-t-il avec un arrondi décimal ?", a: "La plupart des inverses contiennent des fractions irrationnelles ou périodiques impossibles à afficher exactement. Le calcul utilise la double précision complète ; seul l'affichage arrondit à 12 chiffres significatifs, et le résultat copié porte la même précision — suffisant pour reproduire l'identité à 1e-9 près en multipliant par l'original." },
      ],
    ),
  },
  de: {
    name: "Matrixrechner",
    tagline: "Determinanten, Inverse, Transponierte, Multiplikation und Addition für 2×2-, 3×3- und 4×4-Matrizen — Gauss-Jordan-Elimination mit Teilpivotierung, gegen NumPy verifizierte Implementierung. Kostenlos, sofort, offline.",
    ...common(
      [
        "Matrizen sind überall: von Linear-Algebra-Hausaufgaben über Transformationsmatrizen der Computergrafik bis zu Regressionskoeffizienten. Dieser Rechner verarbeitet quadratische 2×2-, 3×3- und 4×4-Matrizen: Determinanten durch Kofaktorentwicklung, Inverse durch Gauss-Jordan-Elimination mit Teilpivotierung, zusätzlich Transponierte, Produkte und Summen.",
        "Zellen als ganze Zahlen oder Dezimalzahlen eingeben — die Inverse verwendet Teilpivotierung, sodass selbst Matrizen, die naive Implementierungen brechen würden, korrekt gelöst werden, und singuläre Matrizen (Determinante 0) mit klarer Meldung abgelehnt werden statt Nullteilungs-Müll. Ergebnisse mit 12 signifikanten Stellen, für ganzzahlige Matrizen bis zu dieser Rundung exakt.",
        "Die gesamte Berechnung läuft lokal in reiner typisierter Arithmetik — keine Netzwerkaufrufe. Gegen NumPy als unabhängige Implementierung über den gesamten Operationssatz kreuzverifiziert.",
      ],
      [
        "Wählen Sie die Matrixgröße (2×2, 3×3 oder 4×4).",
        "Füllen Sie Matrix A (und B für Multiplikation/Addition) mit ganzen Zahlen oder Dezimalzahlen.",
        "Klicken Sie auf eine Operation — Determinante, Inverse, Transponierte, A×B oder A+B — und die Ergebnismatrix erscheint mit Kopierbutton.",
      ],
      [
        { q: "Warum kann ich eine Matrix mit Determinante 0 nicht invertieren?", a: "Eine Determinante von 0 bedeutet, dass die Matrix den Raum auf eine niedrigere Dimension abbildet — das dargestellte lineare Gleichungssystem hat keine eindeutige Lösung, also kann keine Matrix es rückgängig machen. Solche Matrizen heißen singulär; dieses Tool lehnt sie explizit ab, statt unendliche Werte oder Müll zu produzieren." },
        { q: "Warum wird die Inverse mit Dezimalrundung angezeigt?", a: "Die meisten Inversen enthalten irrationale oder periodische Brüche, die nicht exakt darstellbar sind. Die Berechnung nutzt volle doppelte Genauigkeit; nur die Anzeige rundet auf 12 signifikante Stellen, und das kopierte Ergebnis trägt dieselbe Präzision — ausreichend, dass die Multiplikation mit dem Original die Einheitsmatrix innerhalb von 1e-9 reproduziert." },
      ],
    ),
  },
  ru: {
    name: "Матричный калькулятор",
    tagline: "Определители, обратные, транспонированные, умножение и сложение для матриц 2×2, 3×3 и 4×4 — исключение Гаусса–Жордана с частичным выбором ведущего элемента, реализация проверена против NumPy. Бесплатно, мгновенно, офлайн.",
    ...common(
      [
        "Матрицы везде: от домашних заданий по линейной алгебре до матриц трансформаций компьютерной графики и коэффициентов регрессии. Этот калькулятор обрабатывает квадратные матрицы 2×2, 3×3 и 4×4: определители разложением по кофакторам, обратные методом Гаусса–Жордана с частичным выбором ведущего элемента, плюс транспонирование, произведения и суммы.",
        "Вводите ячейки как целые или десятичные числа — обратная использует частичный выбор ведущего элемента, так что даже матрицы, ломающие наивные реализации, решаются корректно, а сингулярные (определитель 0) отклоняются с явным сообщением вместо мусора от деления на ноль. Результаты показываются с 12 значащими цифрами, точные для целочисленных матриц до этого округления.",
        "Весь расчёт выполняется локально чистой типизированной арифметикой — без сетевых вызовов. Перекрёстно проверено против NumPy как независимой реализации на всём наборе операций.",
      ],
      [
        "Выберите размер матрицы (2×2, 3×3 или 4×4).",
        "Заполните матрицу A (и B для умножения/сложения) целыми или десятичными числами.",
        "Нажмите операцию — определитель, обратная, транспонирование, A×B или A+B — и матрица результата появится с кнопкой копирования.",
      ],
      [
        { q: "Почему нельзя обратить матрицу с определителем 0?", a: "Определитель 0 означает, что матрица отображает пространство в меньшую размерность — представляемая система линейных уравнений не имеет единственного решения, поэтому никакая матрица не может её отменить. Такие матрицы называются сингулярными; этот инструмент явно их отклоняет, вместо производства бесконечностей или мусора." },
        { q: "Почему обратная показывается с десятичным округлением?", a: "Большинство обратных содержат иррациональные или периодические дроби, которые невозможно показать точно. Сам расчёт использует полную двойную точность; только отображение округляется до 12 значащих цифр, и скопированный результат несёт ту же точность — достаточно, чтобы умножение на исходную воспроизводило единичную матрицу в пределах 1e-9." },
      ],
    ),
  },
  it: {
    name: "Calcolatrice di matrici",
    tagline: "Determinanti, inverse, trasposte, moltiplicazione e addizione per matrici 2×2, 3×3 e 4×4 — eliminazione Gauss–Jordan con pivoting parziale, implementazione verificata contro NumPy. Gratuito, istantaneo, offline.",
    ...common(
      [
        "Le matrici sono ovunque: dai compiti di algebra lineare alle trasformazioni della computer grafica ai coefficienti di regressione. Questa calcolatrice gestisce matrici quadrate 2×2, 3×3 e 4×4: determinanti per espansione dei cofattori, inverse per eliminazione Gauss–Jordan con pivoting parziale, oltre a trasposte, prodotti e somme.",
        "Inserisci le celle come interi o decimali — l'inversa usa il pivoting parziale, così anche le matrici che romperebbero implementazioni naive si risolvono correttamente, e le matrici singolari (determinante 0) vengono rifiutate con un messaggio esplicito invece di produrre spazzatura di divisione per zero. I risultati sono mostrati a 12 cifre significative, esatti per matrici di interi fino a quell'arrotondamento.",
        "Tutto il calcolo gira localmente con aritmetica tipizzata pura — nessuna chiamata di rete. Verificato contro NumPy come implementazione indipendente su tutto il set di operazioni.",
      ],
      [
        "Scegli la dimensione della matrice (2×2, 3×3 o 4×4).",
        "Compila la matrice A (e B per moltiplicazione/addizione) con interi o decimali.",
        "Clicca un'operazione — determinante, inversa, trasposta, A×B o A+B — e la matrice risultato appare sotto con pulsante di copia.",
      ],
      [
        { q: "Perché non posso invertire una matrice con determinante 0?", a: "Un determinante 0 significa che la matrice mappa lo spazio su una dimensione inferiore — il sistema lineare che rappresenta non ha soluzione unica, quindi nessuna matrice può annullarla. Tali matrici si chiamano singolari; questo strumento le rifiuta esplicitamente invece di produrre infiniti o spazzatura." },
        { q: "Perché l'inversa viene mostrata con arrotondamento decimale?", a: "La maggior parte delle inverse contiene frazioni irrazionali o periodiche che non si possono mostrare esattamente. Il calcolo usa la doppia precisione completa; solo la visualizzazione arrotonda a 12 cifre significative, e il risultato copiato porta la stessa precisione — sufficiente perché moltiplicato per l'originale riproduca l'identità entro 1e-9." },
      ],
    ),
  },
  tr: {
    name: "Matris hesap makinesi",
    tagline: "2×2, 3×3 ve 4×4 matrisler için determinant, ters, transpoze, çarpma ve toplama — kısmi pivotlu Gauss–Jordan elemesi, NumPy'ye karşı doğrulanmış uygulama. Ücretsiz, anında, çevrimdışı.",
    ...common(
      [
        "Matrisler her yerde: lineer cebir ödevlerinden bilgisayar grafik dönüşümlerine ve regresyon katsayılarına. Bu hesap makinesi 2×2, 3×3 ve 4×4 kare matrisleri işler: kofaktör genişlemesiyle determinantlar, kısmi pivotlu Gauss–Jordan elemesiyle tersler, ayrıca transpozlar, çarpımlar ve toplamlar.",
        "Hücrelere tam sayı veya ondalık girin — ters, kısmi pivotlama kullanır, böylece naif uygulamaları kıran matrisler bile doğru çözülür ve tekil matrisler (determinant 0) sıfıra bölme çöpü üretmek yerine açık bir mesajla reddedilir. Sonuçlar 12 anlamlı basamakla gösterilir; tam sayı matris işlemleri bu yuvarlamaya kadar eksiksizdir.",
        "Tüm hesaplama saf tipli aritmetikle yerelde çalışır — ağ çağrısı yok. Tüm işlem seti boyunca NumPy'ye karşı çapraz doğrulanmıştır.",
      ],
      [
        "Matris boyutunu seçin (2×2, 3×3 veya 4×4).",
        "A matrisini (ve çarpma/toplama için B'yi) tam sayı veya ondalıkla doldurun.",
        "Bir işleme tıklayın — determinant, ters, transpoze, A×B veya A+B — ve sonuç matrisi kopyalama düğmesiyle aşağıda görünür.",
      ],
      [
        { q: "Determinantı 0 olan bir matrisi neden tersine çeviremiyorum?", a: "Determinantın 0 olması, matrisin uzayı daha düşük bir boyuta eşlediği anlamına gelir — temsil ettiği lineer denklem sisteminin tek çözümü yoktur, bu yüzden hiçbir matris onu geri alamaz. Bu tür matrislere tekil denir; bu araç sonsuz değerler veya çöp üretmek yerine onları açıkça reddeder." },
        { q: "Ters matris neden ondalık yuvarlamayla gösteriliyor?", a: "Çoğu ters, tam olarak gösterilemeyen irrasyonel veya periyodik kesirler içerir. Hesaplama tam çift duyarlık kullanır; yalnızca gösterim 12 anlamlı basamağa yuvarlar ve kopyalanan sonuç aynı hassasiyeti taşır — orijinaliyle çarpıldığında 1e-9 içinde birim matrisi yeniden üretmek için yeterlidir." },
      ],
    ),
  },
  ko: {
    name: "행렬 계산기",
    tagline: "2×2, 3×3, 4×4 행렬의 행렬식·역행렬·전치·곱셈·덧셈 — 부분 피벗팅을 갖춘 가우스-조던 소거, NumPy 독립 구현 교차 검증. 무료 · 즉시 · 오프라인 작동.",
    ...common(
      [
        "행렬은 어디에나 있습니다: 선형대수 숙제부터 컴퓨터 그래픽 변환, 회귀 계수까지. 이 계산기는 2×2, 3×3, 4×4 정사각 행렬을 처리합니다: 여인수 전개로 행렬식, 부분 피벗팅을 갖춘 가우스-조던 소거로 역행렬, 그리고 전치·곱·합.",
        "셀에 정수나 소수를 입력하세요 — 역행렬은 부분 피벗팅을 사용하므로 단순한 구현이 실패할 행렬도 올바르게 풀리고, 특이 행렬(행렬식 0)은 0 나눗셈 쓰레기 대신 명확한 메시지로 거부됩니다. 결과는 12 유효 숫자로 표시되며, 정수 행렬 연산은 그 반올림 범위까지 정확합니다.",
        "모든 계산은 순수 타입 산술로 로컬 실행됩니다 — 네트워크 호출이 없습니다. 전체 연산 세트를 NumPy 독립 구현과 교차 검증했습니다.",
      ],
      [
        "행렬 크기를 선택하세요(2×2, 3×3, 4×4).",
        "행렬 A(곱셈/덧셈에는 B도)에 정수나 소수를 채우세요.",
        "연산을 클릭하세요 — 행렬식, 역행렬, 전치, A×B, A+B — 결과 행렬이 복사 버튼과 함께 아래에 표시됩니다.",
      ],
      [
        { q: "행렬식이 0인 행렬을 역행렬로 만들 수 없는 이유는?", a: "행렬식 0은 그 행렬이 공간을 더 낮은 차원으로 사상한다는 뜻입니다 — 나타내는 선형방정식계에 유일해가 없어 어떤 행렬도 되돌릴 수 없습니다. 이런 행렬을 특이행렬이라 부르며, 이 도구는 무한대나 쓰레기를 만드는 대신 명확히 거부합니다." },
        { q: "역행렬이 소수 반올림으로 표시되는 이유는?", a: "대부분의 역행렬은 정확히 표시할 수 없는 무리수나 순환 소수를 포함합니다. 계산 자체는 완전한 배정밀도로 수행되고, 표시만 12 유효 숫자로 반올림하며 복사된 결과도 같은 정밀도를 가집니다 — 원 행렬과 곱하면 1e-9 이내로 단위행렬을 재현하기에 충분합니다." },
      ],
    ),
  },
  ar: {
    name: "حاسبة المصفوفات",
    tagline: "المحددات، المعكوسات، المنقولة، الضرب والجمع لمصفوفات 2×2 و3×3 و4×4 — حذف غاوس-جوردان مع الاختيار الجزئي، تنفيذ موثق ضد NumPy. مجاني وفوري ويعمل دون اتصال.",
    ...common(
      [
        "المصفوفات في كل مكان: من واجبات الجبر الخطي إلى تحويلات رسوم الحاسوب ومعاملات الانحدار. تتعامل هذه الحاسبة مع المصفوفات المربعة 2×2 و3×3 و4×4: المحددات بفك التوسيع بالمرافقين، المعكوسات بحذف غاوس-جوردان مع الاختيار الجزئي، إضافة إلى المنقولة والضرب والجمع.",
        "أدخل الخلايا كأعداد صحيحة أو عشرية — المعكوس يستخدم الاختيار الجزئي، فحتى المصفوفات التي تكسر التطبيقات الساذجة تُحل بشكل صحيح، والمصفوفات المفردة (المحدد 0) تُرفض برسالة صريحة بدلًا من إنتاج قسمة على صفر. تُعرض النتائج بـ 12 رقمًا معنويًا، دقيقة للمصفوفات الصحيحة حتى ذلك التقريب.",
        "كل الحسابات تعمل محليًا بحساب مكتوب الأنواع — بلا استدعاءات شبكة. موثق ضد NumPy كتطبيق مستقل على كامل مجموعة العمليات.",
      ],
      [
        "اختر حجم المصفوفة (2×2 أو 3×3 أو 4×4).",
        "املأ المصفوفة A (وB للضرب/الجمع) بأعداد صحيحة أو عشرية.",
        "انقر على عملية — المحدد، المعكوس، المنقولة، A×B أو A+B — وتظهر مصفوفة النتيجة مع زر نسخ.",
      ],
      [
        { q: "لماذا لا يمكنني معكوسة مصفوفة محددها 0؟", a: "المحدد 0 يعني أن المصفوفة تحول الفضاء إلى بعد أدنى — نظام المعادلات الخطية الذي تمثله لا حل وحيد له، فلا توجد مصفوفة تلغيه. تسمى هذه المصفوفات مفردة؛ وترفضها هذه الأداة صراحة بدلًا من إنتاج قيم لا نهائية أو فوضى." },
        { q: "لماذا يُعرض المعكوس بتقريب عشري؟", a: "أغلب المعكوسات تحتوي كسورًا غير نهاية أو دورية لا تُعرض بدقة؛ الحساب نفسه يستخدم دقة مزدوجة كاملة، والعرض فقط يقرب إلى 12 رقمًا معنويًا، والنتيجة المنسوخة تحمل الدقة نفسها — كافية لضربها بالأصل يعيد المصفوفة الوحدة ضمن 1e-9." },
      ],
    ),
  },
  hi: {
    name: "मैट्रिक्स कैलकुलेटर",
    tagline: "2×2, 3×3 और 4×4 मैट्रिक्स के लिए सारणिक, व्युत्क्रम, ट्रांसपोज़, गुणा और जोड़ — आंशिक पिवटिंग के साथ गाउस-जॉर्डन निर्मूलन, NumPy-सत्यापित इम्प्लीमेंटेशन। मुफ़्त, तत्काल, ऑफ़लाइन।",
    ...common(
      [
        "मैट्रिक्स हर जगह हैं: रैखिक बीजगणित के होमवर्क से कंप्यूटर ग्राफ़िक्स ट्रांसफ़ॉर्म और रिग्रेशन गुणांक तक। यह कैलकुलेटर 2×2, 3×3 और 4×4 वर्ग मैट्रिक्स संभालता है: सहखंड विस्तार से सारणिक, आंशिक पिवटिंग के साथ गाउस-जॉर्डन निर्मूलन से व्युत्क्रम, साथ में ट्रांसपोज़, गुणनफल और योग।",
        "सेल में पूर्णांक या दशमलव दर्ज करें — व्युत्क्रम आंशिक पिवटिंग उपयोग करता है, इसलिए नाइव इम्प्लीमेंटेशन तोड़ने वाले मैट्रिक्स भी सही हल होते हैं, और अव्युत्क्रम (सारणिक 0) मैट्रिक्स शून्य-से-भाग कचरा बनाने के बजाय स्पष्ट संदेश के साथ अस्वीकार होते हैं। परिणाम 12 सार्थक अंकों तक दिखे जाते हैं, पूर्णांक-मैट्रिक्स ऑपरेशन उस राउंडिंग तक सटीक।",
        "पूरी गणना शुद्ध टाइप्ड अंकगणित से लोकल चलती है — कोई नेटवर्क कॉल नहीं। पूरे ऑपरेशन सेट पर NumPy से स्वतंत्र इम्प्लीमेंटेशन के रूप में क्रॉस-सत्यापित।",
      ],
      [
        "मैट्रिक्स आकार चुनें (2×2, 3×3 या 4×4)।",
        "मैट्रिक्स A (गुणा/जोड़ के लिए B भी) में पूर्णांक या दशमलव भरें।",
        "कोई ऑपरेशन क्लिक करें — सारणिक, व्युत्क्रम, ट्रांसपोज़, A×B या A+B — परिणाम मैट्रिक्स कॉपी बटन के साथ नीचे दिखता है।",
      ],
      [
        { q: "सारणिक 0 वाले मैट्रिक्स का व्युत्क्रम क्यों नहीं बन सकता?", a: "सारणिक 0 का अर्थ है कि मैट्रिक्स स्पेस को निम्न विमा में मैप करता है — उसका रैखिक समीकरण सिस्टम अद्वितीय हल नहीं रखता, इसलिए कोई मैट्रिक्स उसे पूर्ववत नहीं कर सकता। ऐसे मैट्रिक्स सिंगुलर कहलाते हैं; यह टूल अनंत या कचरा बनाने के बजाय उन्हें स्पष्ट रूप से अस्वीकार करता है।" },
        { q: "व्युत्क्रम दशमलव राउंडिंग में क्यों दिखता है?", a: "अधिकांश व्युत्क्रमों में अपरिमेय या आवर्ती भिन्न होती हैं जो सटीक दिखाई नहीं जा सकतीं। गणना स्वयं पूर्ण डबल परिशुद्धता करती है; केवल प्रदर्शन 12 सार्थक अंकों तक राउंड करता है, और कॉपी किया गया परिणाम वही परिशुद्धता रखता है — पर्याप्त कि मूल से गुणा पर 1e-9 के भीतर आइडेंटिटी पुनरुत्पादित हो।" },
      ],
    ),
  },
  id: {
    name: "Kalkulator matriks",
    tagline: "Determinan, invers, transpos, perkalian dan penjumlahan untuk matriks 2×2, 3×3, dan 4×4 — eliminasi Gauss–Jordan dengan pivoting parsial, implementasi terverifikasi terhadap NumPy. Gratis, instan, offline.",
    ...common(
      [
        "Matriks ada di mana-mana: dari PR aljabar linear hingga transformasi grafika komputer dan koefisien regresi. Kalkulator ini menangani matriks persegi 2×2, 3×3, dan 4×4: determinan dengan ekspansi kofaktor, invers dengan eliminasi Gauss–Jordan pivoting parsial, plus transpos, produk, dan jumlah.",
        "Masukkan sel sebagai bilangan bulat atau desimal — invers menggunakan pivoting parsial, jadi bahkan matriks yang membuat implementasi naive gagal selesai dengan benar, dan matriks singular (determinan 0) ditolak dengan pesan eksplisit alih-alih menghasilkan sampah pembagian nol. Hasil ditampilkan 12 digit signifikan, eksak untuk operasi matriks bilangan bulat hingga pembulatan itu.",
        "Semua perhitungan berjalan lokal dengan aritmetika bertipe murni — tanpa panggilan jaringan. Terverifikasi silang terhadap NumPy sebagai implementasi independen pada seluruh set operasi.",
      ],
      [
        "Pilih ukuran matriks (2×2, 3×3, atau 4×4).",
        "Isi matriks A (dan B untuk perkalian/penjumlahan) dengan bilangan bulat atau desimal.",
        "Klik satu operasi — determinan, invers, transpos, A×B atau A+B — dan matriks hasil muncul di bawah dengan tombol salin.",
      ],
      [
        { q: "Mengapa saya tidak bisa membalik matriks dengan determinan 0?", a: "Determinan 0 berarti matriks memetakan ruang ke dimensi yang lebih rendah — sistem persamaan linear yang diwakilinya tidak punya solusi unik, jadi tidak ada matriks yang bisa membatalkannya. Matriks semacam itu disebut singular; alat ini menolaknya secara eksplisit alih-alih menghasilkan nilai tak hingga atau sampah." },
        { q: "Mengapa invers ditampilkan dengan pembulatan desimal?", a: "Sebagian besar invers memuat pecahan irasional atau periodik yang tidak dapat ditampilkan eksak. Perhitungan menggunakan presisi ganda penuh; hanya tampilan yang membulatkan ke 12 digit signifikan, dan hasil yang disalin membawa presisi yang sama — cukup agar dikalikan dengan aslinya mereproduksi matriks identitas dalam 1e-9." },
      ],
    ),
  },
  vi: {
    name: "Máy tính ma trận",
    tagline: "Định thức, ma trận nghịch đảo, chuyển vị, nhân và cộng cho ma trận 2×2, 3×3, 4×4 — phép khử Gauss–Jordan với chọn trụ phần, bản triển khai kiểm chứng chéo với NumPy. Miễn phí, tức thì, ngoại tuyến.",
    ...common(
      [
        "Ma trận xuất hiện ở mọi nơi: từ bài tập đại số tuyến tính đến phép biến đổi đồ họa máy tính và hệ số hồi quy. Máy tính này xử lý ma trận vuông 2×2, 3×3, 4×4: định thức bằng khai triển hệ số kèm theo, ma trận nghịch đảo bằng phép khử Gauss–Jordan chọn trụ phần, cộng với chuyển vị, tích và tổng.",
        "Nhập ô dưới dạng số nguyên hoặc thập phân — ma trận nghịch đảo dùng chọn trụ phần, nên ngay cả những ma trận làm phương pháp ngây thơ thất bại cũng giải đúng, và ma trận singular (định thức 0) bị từ chối với thông báo rõ ràng thay vì tạo ra rác chia cho không. Kết quả hiển thị 12 chữ số có nghĩa, chính xác cho các phép toán ma trận nguyên trong mức làm tròn đó.",
        "Toàn bộ tính toán chạy cục bộ bằng số học kiểu thuần — không gọi mạng. Đã kiểm chứng chéo với NumPy như một bản triển khai độc lập trên toàn bộ tập phép toán.",
      ],
      [
        "Chọn cỡ ma trận (2×2, 3×3 hoặc 4×4).",
        "Điền ma trận A (và B cho nhân/cộng) bằng số nguyên hoặc thập phân.",
        "Nhấp một phép toán — định thức, nghịch đảo, chuyển vị, A×B hoặc A+B — và ma trận kết quả xuất hiện bên dưới với nút sao chép.",
      ],
      [
        { q: "Tại sao không thể nghịch đảo ma trận có định thức 0?", a: "Định thức 0 nghĩa là ma trận ánh xạ không gian xuống một chiều thấp hơn — hệ phương trình tuyến tính nó biểu diễn không có nghiệm duy nhất, nên không có ma trận nào hoàn tác được. Các ma trận như vậy gọi là singular; công cụ này từ chối rõ ràng thay vì tạo ra vô cùng hay rác." },
        { q: "Tại sao ma trận nghịch đảo hiển thị với làm tròn thập phân?", a: "Phần lớn nghịch đảo chứa phân số vô tỉ hoặc tuần hoàn không thể hiển thị chính xác. Phép tính dùng độ chính xác kép đầy đủ; chỉ hiển thị làm tròn đến 12 chữ số có nghĩa, và kết quả sao chép mang cùng độ chính xác — đủ để nhân với bản gốc tái tạo ma trận đơn vị trong 1e-9." },
      ],
    ),
  },
};
