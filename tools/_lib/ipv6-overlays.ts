/**
 * CN-031 ipv6-expand-compress 扩展语言 overlay(10 语)。
 */

import type { ToolCopy } from "./types";

function common(
  intro: [string, string, string],
  steps: [string, string, string],
  faqs: Array<{ q: string; a: string }>,
) {
  return { intro, steps, faqs };
}

export const IPV6_OVERLAYS: Record<string, ToolCopy> = {
  fr: {
    name: "Expansion et compression IPv6",
    tagline: "Développez IPv6 vers sa forme complète à 8 groupes et compressez vers la forme canonique RFC 5952 simultanément — crochets et identifiants de zone supprimés automatiquement, adresses mappées IPv4 préservées. Gratuit, instantané, hors ligne.",
    ...common(
      [
        "Les adresses IPv6 peuvent s'écrire de nombreuses façons : forme complète, forme compressée, casse mixte, avec ou sans crochets. Cet outil prend toute représentation valide et produit simultanément la forme canonique compressée RFC 5952 et la forme développée complète — vous savez toujours exactement ce que représente une adresse.",
        "La compression suit RFC 5952 avec précision : la plus longue séquence de zéros (2 groupes ou plus) devient ::, les zéros de tête dans les groupes sont supprimés, la sortie est en minuscules, et en cas d'égalité la première séquence est compressée. Les adresses mappées IPv4 (::ffff:0:0/96) conservent le suffixe décimal selon le standard.",
        "Les crochets (du contexte URL) et les identifiants de zone (%eth0) sont supprimés automatiquement. Les adresses invalides — multiples ::, nombre de groupes incorrect, caractères hors hex — sont rejetées avec le problème spécifique indiqué. Tout s'exécute localement ; aucun appel réseau.",
      ],
      [
        "Collez une adresse IPv6 valide — crochets, casse mixte et abréviations sont traités automatiquement.",
        "Cliquez sur Convertir — les formes compressée et développée apparaissent, chacune avec un bouton de copie.",
        "Utilisez la forme compressée pour l'affichage et les URLs ; la forme développée pour les opérations binaires et les comparaisons.",
      ],
      [
        { q: "Qu'est-ce que la forme canonique RFC 5952 ?", a: "C'est la manière standard d'écrire une adresse IPv6 pour que chaque adresse ait exactement une représentation : hex minuscules, sans zéros de tête, et la plus longue séquence de zéros (2 groupes ou plus) compressée en ::, en choisissant la première en cas d'égalité. Sans ce standard, 2001:db8:0:0:1::1 et 2001:db8::1:0:0:0 pourraient désigner la même adresse sans jamais correspondre en comparaison de chaînes." },
        { q: "Pourquoi ::ffff:192.168.1.1 garde-t-il la notation pointée ?", a: "C'est une adresse mappée IPv4 (::ffff:0:0/96). La section 5 de RFC 5952 stipule que les 32 derniers bits de ces adresses doivent être représentés en notation décimale pointée car ils représentent sémantiquement une adresse IPv4, pas quatre groupes hex. Toutes les autres adresses utilisent du hex pur." },
      ],
    ),
  },
  de: {
    name: "IPv6-Erweiterung & -Komprimierung",
    tagline: "IPv6 auf die vollständige 8-Gruppen-Form erweitern und gleichzeitig auf die RFC 5952-kanonische Form komprimieren — Klammern und Zonen-Indizes automatisch entfernt, IPv4-zugeordnete Adressen erhalten. Kostenlos, sofort, offline.",
    ...common(
      [
        "IPv6-Adressen können auf viele Arten geschrieben werden: vollständige Form, Null-komprimierte Form, gemischte Groß-/Kleinschreibung, mit oder ohne Klammern. Dieses Tool nimmt jede gültige Darstellung und erzeugt gleichzeitig die RFC 5952-kanonische komprimierte Form und die vollständige erweiterte Form — Sie wissen immer genau, was eine Adresse darstellt.",
        "Die Komprimierung folgt RFC 5952 exakt: Die längste Null-Sequenz (2+ Gruppen) wird zu ::, führende Nullen in Gruppen entfernt, die Ausgabe ist kleingeschrieben, und bei gleich langen Null-Sequenzen wird die erste komprimiert. IPv4-zugeordnete Adressen (::ffff:0:0/96) behalten den Dezimalpunkt-Suffix gemäß dem Standard.",
        "Klammern (aus dem URL-Kontext) und Zonen-Indizes (%eth0) werden automatisch entfernt. Ungültige Adressen — mehrere ::, falsche Grupppenzahl, Zeichen außerhalb von hex — werden mit dem spezifischen Problem abgelehnt. Alles läuft lokal; keine Netzwerkaufrufe.",
      ],
      [
        "Fügen Sie eine gültige IPv6-Adresse ein — Klammern, gemischte Groß-/Kleinschreibung und Abkürzungen werden automatisch verarbeitet.",
        "Auf Konvertieren klicken — komprimierte und erweiterte Formen erscheinen unten, jeweils mit Kopierbutton.",
        "Verwenden Sie die komprimierte Form für Anzeige und URLs; die erweiterte Form für Binäroperationen und Vergleiche.",
      ],
      [
        { q: "Was ist die RFC 5952-kanonische Form?", a: "Sie ist die Standardweise, eine IPv6-Adresse zu schreiben, sodass jede Adresse genau eine Darstellung hat: Kleinbuchstaben-hex, keine führenden Nullen, und die längste Null-Sequenz (2+ Gruppen) zu :: komprimiert, bei Gleichstand die erste. Ohne diesen Standard könnten 2001:db8:0:0:1::1 und 2001:db8::1:0:0:0 dieselbe Adresse bezeichnen, würden aber in einem Stringvergleich nie übereinstimmen." },
        { q: "Warum behält ::ffff:192.168.1.1 die Punktnotation?", a: "Dies ist eine IPv4-zugeordnete Adresse (::ffff:0:0/96). RFC 5952 Abschnitt 5 schreibt vor, dass die letzten 32 Bits solcher Adressen in IPv4-Punktnotation dargestellt werden, da sie semantisch eine IPv4-Adresse repräsentieren, nicht vier Hex-Gruppen. Alle anderen Adressen verwenden reines Hex." },
      ],
    ),
  },
  ru: {
    name: "Расширение и сжатие IPv6",
    tagline: "Разверните IPv6 в полную 8-групповую форму и сожмите в каноническую форму RFC 5952 одновременно — скобки и идентификаторы зон удаляются автоматически, IPv4-отображённые адреса сохраняются. Бесплатно, мгновенно, офлайн.",
    ...common(
      [
        "Адреса IPv6 можно записать множеством способов: полная форма, сжатая форма нулей, смешанный регистр, со скобками или без. Этот инструмент принимает любое допустимое представление и одновременно выдаёт каноническую сжатую форму RFC 5952 и полную развёрнутую — вы всегда точно знаете, что представляет собой адрес.",
        "Сжатие точно следует RFC 5952: самая длинная последовательность нулей (2+ групп) становится ::, начальные нули в группах убираются, вывод в нижнем регистре, и при равных последовательностях сжимается первая. IPv4-отображённые адреса (::ffff:0:0/96) сохраняют точечно-десятичный суффикс по стандарту.",
        "Квадратные скобки (из URL-контекста) и идентификаторы зон (%eth0) удаляются автоматически. Недопустимые адреса — несколько ::, неверное количество групп, символы вне hex — отвергаются с указанием конкретной проблемы. Всё выполняется локально; без сетевых вызовов.",
      ],
      [
        "Вставьте любой действительный IPv6-адрес — скобки, смешанный регистр и сокращения обрабатываются автоматически.",
        "Нажмите Преобразовать — сжатая и развёрнутая формы появятся ниже, каждая с кнопкой копирования.",
        "Используйте сжатую форму для отображения и URL; развёрнутую для бинарных операций и сравнений.",
      ],
      [
        { q: "Что такое каноническая форма RFC 5952?", a: "Это стандартный способ записи IPv6-адреса, при котором каждый адрес имеет ровно одно представление: строчные hex, без ведущих нулей, и самая длинная последовательность нулей (2+ групп) сжимается в ::, при равенстве выбирается первая. Без этого стандарта 2001:db8:0:0:1::1 и 2001:db8::1:0:0:0 могут означать один адрес, но никогда не совпадут в строковом сравнении." },
        { q: "Почему ::ffff:192.168.1.1 сохраняет точечную нотацию?", a: "Это IPv4-отображённый адрес (::ffff:0:0/96). Раздел 5 RFC 5952 предписывает, что последние 32 бита таких адресов должны представляться в точечно-десятичной нотации, поскольку они семантически представляют IPv4-адрес, а не четыре hex-группы. Все остальные адреса используют чистый hex." },
      ],
    ),
  },
  it: {
    name: "Espansione e compressione IPv6",
    tagline: "Espandi IPv6 alla forma completa a 8 gruppi e comprimi alla forma canonica RFC 5952 simultaneamente — parentesi e indici di zona rimossi automaticamente, indirizzi mappati IPv4 preservati. Gratuito, istantaneo, offline.",
    ...common(
      [
        "Gli indirizzi IPv6 possono essere scritti in molti modi: forma completa, forma compressa a zero, maiuscole e minuscole miste, con o senza parentesi quadre. Questo strumento prende qualsiasi rappresentazione valida e produce sia la forma canonica compressa RFC 5952 sia la forma espansa completa simultaneamente — sai sempre esattamente cosa rappresenta un indirizzo.",
        "La compressione segue RFC 5952 con precisione: la sequenza di zeri più lunga (2+ gruppi) diventa ::, gli zeri iniziali nei gruppi vengono rimossi, l'output è in minuscolo, e quando due sequenze di zeri sono di pari lunghezza viene compressa la prima. Gli indirizzi mappati IPv4 (::ffff:0:0/96) mantengono il suffisso decimale puntato secondo lo standard.",
        "Le parentesi quadre (dal contesto URL) e gli indici di zona (%eth0) vengono rimossi automaticamente. Indirizzi non validi — multipli ::, conteggio di gruppi errato, caratteri fuori da hex — vengono rifiutati con il problema specifico indicato. Tutto gira localmente; nessuna chiamata di rete.",
      ],
      [
        "Incolla qualsiasi indirizzo IPv6 valido — parentesi, maiuscole/minuscole e abbreviazioni sono gestite automaticamente.",
        "Clicca Converti — le forme compressa ed espansa appaiono sotto, ognuna con pulsante di copia.",
        "Usa la forma compressa per visualizzazione e URL; la forma espansa per operazioni binarie e confronti.",
      ],
      [
        { q: "Cos'è la forma canonica RFC 5952?", a: "È il modo standard di scrivere un indirizzo IPv6 per cui ogni indirizzo ha esattamente una rappresentazione: hex minuscolo, niente zeri iniziali, e la sequenza di zeri più lunga (2+ gruppi) compressa in ::, scegliendo la prima in caso di pari lunghezza. Senza questo standard, 2001:db8:0:0:1::1 e 2001:db8::1:0:0:0 potrebbero riferirsi allo stesso indirizzo ma non corrispondere mai in un confronto di stringhe." },
        { q: "Perché ::ffff:192.168.1.1 mantiene la notazione puntata?", a: "È un indirizzo mappato IPv4 (::ffff:0:0/96). La sezione 5 di RFC 5952 dice che gli ultimi 32 bit di tali indirizzi devono essere rappresentati in notazione decimale puntata perché semanticamente rappresentano un indirizzo IPv4, non quattro gruppi hex. Tutti gli altri indirizzi usano hex puro." },
      ],
    ),
  },
  tr: {
    name: "IPv6 genişletme ve sıkıştırma",
    tagline: "IPv6'yi tam 8 gruplu biçimine genişletin ve aynı anda RFC 5952 kanonik biçimine sıkıştırın — köşeli parantezler ve bölge indeksleri otomatik kaldırılır, IPv4 eşlenmiş adresler korunur. Ücretsiz, anında, çevrimdışı.",
    ...common(
      [
        "IPv6 adresleri birçok şekilde yazılabilir: tam biçim, sıfır-sıkıştırılmış biçim, büyük/küçük harf karışık, köşeli parantezli veya parantezsiz. Bu araç, geçerli herhangi bir temsili alır ve hem RFC 5952 kanonik sıkıştırılmış biçimini hem de tam genişletilmiş biçimini aynı anda üretir — bir adresin gerçekte neyi temsil ettiğini her zaman bilirsiniz.",
        "Sıkıştırma RFC 5952'yi tam olarak izler: en uzun sıfır dizisi (2+ grup) :: olur, gruplardaki baştaki sıfırlar kaldırılır, çıktı küçük harflidir ve eşit uzunlukta iki sıfır dizisi olduğunda birincisi sıkıştırılır. IPv4 eşlenmiş adresler (::ffff:0:0/96) standart gereği noktalı ondalık soneki korur.",
        "Köşeli parantezler (URL bağlamından) ve bölge indeksleri (%eth0) otomatik kaldırılır. Geçersiz adresler — çoklu ::, yanlış grup sayısı, hex dışı karakterler — belirli sorun belirtilerek reddedilir. Her şey yerelde çalışır; ağ çağrısı yok.",
      ],
      [
        "Geçerli herhangi bir IPv6 adresini yapıştırın — köşeli parantezler, büyük/küçük harf karışımı ve kısaltmalar otomatik işlenir.",
        "Dönüştür'e tıklayın — sıkıştırılmış ve genişletilmiş biçimler aşağıda görünür, her birinde kopyalama düğmesi vardır.",
        "Görüntüleme ve URL'ler için sıkıştırılmış biçimi; ikili işlemler ve karşılaştırmalar için genişletilmiş biçimi kullanın.",
      ],
      [
        { q: "RFC 5952 kanonik biçimi nedir?", a: "Her IPv6 adresinin tam olarak bir temsili olması için standart yazım şeklidir: küçük harf hex, baştaki sıfırlar yok, ve en uzun sıfır dizisi (2+ grup) ::'ye sıkıştırılır, eşitlikte birincisi seçilir. Bu standart olmadan 2001:db8:0:0:1::1 ve 2001:db8::1:0:0:0 aynı adresi ifade edebilir ama string karşılaştırmada asla eşleşmez." },
        { q: "::ffff:192.168.1.1 neden noktalı gösterimi koruyor?", a: "Bu bir IPv4 eşlenmiş adrestir (::ffff:0:0/96). RFC 5952 bölüm 5, bu tür adreslerin son 32 bitinin IPv4 noktalı-onlu gösterimle temsil edilmesi gerektiğini söyler, çünkü semantik olarak bir IPv4 adresi temsil ederler, dört hex grup değil. Diğer tüm adresler saf hex kullanır." },
      ],
    ),
  },
  ko: {
    name: "IPv6 확장·압축",
    tagline: "IPv6를 8 그룹 완전 형식으로 확장하고 동시에 RFC 5952 정규 형식으로 압축합니다 — 대괄호와 존 인덱스 자동 제거, IPv4 매핑 주소의 점 표기법 유지. 무료 · 즉시 · 오프라인 작동.",
    ...common(
      [
        "IPv6 주소는 여러 방식으로 쓸 수 있습니다: 전체 형식, 0 압축 형식, 대소문자 혼합, 대괄호 유무 등입니다. 이 도구는 유효한 어떤 표현도 받아서 RFC 5952 정규 압축 형식과 완전 확장 형식을 동시에 출력합니다 — 주소가 실제로 무엇을 나타내는지 항상 정확히 알 수 있습니다.",
        "압축은 RFC 5952를 정확히 따릅니다: 가장 긴 0 시퀀스(2+ 그룹)가 ::이 되고, 그룹 내 선행 0이 제거되며, 출력은 소문자입니다. 길이가 같은 두 0 시퀀스가 있으면 첫 번째가 압축됩니다. IPv4 매핑 주소(::ffff:0:0/96)는 표준에 따라 점 표기법을 유지합니다.",
        "대괄호(URL 컨텍스트)와 존 인덱스(%eth0)는 자동으로 제거됩니다. 잘못된 주소 — 다중 ::, 잘못된 그룹 수, hex 이외의 문자 — 는 구체적 문제와 함께 거부됩니다. 모든 것이 로컬로 실행되며 네트워크 호출이 없습니다.",
      ],
      [
        "유효한 IPv6 주소를 붙여넣으세요 — 대괄호, 대소문자 혼합, 약어는 모두 자동 처리됩니다.",
        "변환을 클릭하세요 — 압축 형식과 확장 형식이 아래에 표시되고 각각 복사 버튼이 있습니다.",
        "표시와 URL에는 압축 형식을, 이진 연산과 비교에는 확장 형식을 사용하세요.",
      ],
      [
        { q: "RFC 5952 정규 형식이란?", a: "모든 IPv6 주소가 정확히 하나의 표현을 갖도록 하는 표준 쓰기 방식입니다: 소문자 hex, 선행 0 없음, 가장 긴 0 시퀀스(2+ 그룹)를 ::로 압축하며, 길이가 같으면 첫 번째를 선택합니다. 이 표준이 없으면 2001:db8:0:0:1::1과 2001:db8::1:0:0:0이 같은 주소를 의미할 수 있지만 문자열 비교에서는 절대 일치하지 않습니다." },
        { q: "::ffff:192.168.1.1이 점 표기법을 유지하는 이유는?", a: "이것은 IPv4 매핑 주소(::ffff:0:0/96)입니다. RFC 5952 §5는 이런 주소의 마지막 32비트가 IPv4 점 표기법으로 표현되어야 한다고 규정합니다. 의미상 IPv4 주소를 나타내기 때문이며, 네 개의 hex 그룹이 아닙니다. 다른 모든 주소는 순수 hex를 사용합니다." },
      ],
    ),
  },
  ar: {
    name: "توسيع وضغط IPv6",
    tagline: "وسّع IPv6 إلى شكله الكامل ثماني المجموعات واضغطه إلى الشكل القياسي RFC 5952 في الوقت نفسه — الأقواس ورموز النطاق تُزال تلقائيًا، عناوين IPv4 المُحالّة تُحفظ بالنقطة. مجاني وفوري ويعمل دون اتصال.",
    ...common(
      [
        "يمكن كتابة عناوين IPv6 بعدة طرق: الشكل الكامل، الشكل المضغوط بالصفر، حالة الأحرف المختلطة، مع أو بدون أقواس. تأخذ هذه الأداة أي تمثيل صالح وتنتج الشكل القياسي المضغوط RFC 5952 والشكل الموسع الكامل في الوقت نفسه — تعرف دائمًا ما يمثله العنوان فعليًا.",
        "يتبع الضغط RFC 5952 بدقة: أطول سلسلة أصفار (2+ مجموعة) تصبح ::، والأصفار البادئة داخل المجموعات تُزال، والمخرجات بحروف صغيرة، وعند تساوي سلسلتين تُضغط الأولى. عناوين IPv4 المُحالّة (::ffff:0:0/96) تحتفظ باللاحقة العشرية المنقوطة وفق المعيار.",
        "الأقواس (من سياق URL) ورموز النطاق (%eth0) تُزال تلقائيًا. العناوين غير الصالحة — عدة ::، عدد مجموعات خاطئ، أحرف خارج hex — تُرفض مع بيان المشكلة تحديدًا. كل شيء يعمل محليًا؛ بلا استدعاءات شبكة.",
      ],
      [
        "الصق أي عنوان IPv6 صالح — الأقواس وحالة الأحرف والاختصارات تُعالج تلقائيًا.",
        "انقر على حوّل — يظهر الشكلان المضغوط والموسع أدناه، كل منهما مع زر نسخ.",
        "استخدم الشكل المضغوط للعرض والروابط؛ الشكل الموسع للعمليات الثنائية والمقارنات.",
      ],
      [
        { q: "ما هو الشكل القياسي RFC 5952؟", a: "إنه الطريقة القياسية لكتابة عنوان IPv6 بحيث يكون لكل عنوان تمثيل واحد بالضبط: أحرف صغيرة hex، بلا أصفار بادئة، وأطول سلسلة أصفار (2+ مجموعة) تضغط إلى ::، مع اختيار الأولى عند التساوي. بدون هذا المعيار، قد يشير 2001:db8:0:0:1::1 و2001:db8::1:0:0:0 إلى العنوان نفسه لكنهما لا يتطابقان أبدًا في مقارنة نصية." },
        { q: "لماذا يحافظ ::ffff:192.168.1.1 على النقطة العشرية؟", a: "هذا عنوان IPv4 مُحالّ (::ffff:0:0/96). تقول المادة 5 من RFC 5952 إن آخر 32 بت من هذه العناوين يجب أن تُمثل بترميز عشري منقوط لأنها semantically تمثل عنوان IPv4، وليس أربع مجموعات hex. جميع العناوين الأخرى تستخدم hex نقيًا." },
      ],
    ),
  },
  hi: {
    name: "IPv6 विस्तार और संपीड़न",
    tagline: "IPv6 को अपने पूर्ण 8-समूह रूप में विस्तारित करें और एक साथ RFC 5952 मानक संपीड़ित रूप में संपीडित करें — कोष्ठक और ज़ोन इंडेक्स स्वतः हटाए जाते हैं, IPv4-मैप्ड पतों की डॉटेड तरकीब सुरक्षित। मुफ़्त, तत्काल, ऑफ़लाइन।",
    ...common(
      [
        "IPv6 पतों को कई तरीकों से लिखा जा सकता है: पूर्ण रूप, शून्य-संपीड़ित रूप, मिश्रित केस, कोष्ठक के साथ या बिना। यह टूल कोई भी मान्य प्रतिनिधित्व लेकर RFC 5952 मानक संपीड़ित और पूर्ण विस्तारित रूप एक साथ देता है — आप हमेशा जानते हैं कि पता वास्तव में क्या दर्शाता है।",
        "संपीड़न RFC 5952 का सटीक पालन करता है: सबसे लंबी शून्य-शृंखला (2+ समूह) :: बन जाती है, समूहों के भीतर आगे के शून्य हटाए जाते हैं, आउटपुट लोअरकेस है, और दो बराबर शून्य-शृंखलाओं में पहली संपीड़ित होती है। IPv4-मैप्ड पते (::ffff:0:0/96) मानक के अनुसार डॉटेड-डेसिमल सफ़िक्स रखते हैं।",
        "वर्ग कोष्ठक (URL संदर्भ से) और ज़ोन इंडेक्स (%eth0) स्वतः हटाए जाते हैं। अवैध पते — कई ::, गलत समूह गणना, hex के बाहर के कैरेक्टर — विशिष्ट समस्या बताकर अस्वीकार किए जाते हैं। सब कुछ लोकल चलता है; कोई नेटवर्क कॉल नहीं।",
      ],
      [
        "कोई भी मान्य IPv6 पता पेस्ट करें — कोष्ठक, मिश्रित केस और संक्षेप रूप स्वतः संभाले जाते हैं।",
        "Convert पर क्लिक करें — संपीड़ित और विस्तारित रूप दोनों नीचे दिखते हैं, हर एक कॉपी बटन के साथ।",
        "प्रदर्शन और URL के लिए संपीड़ित रूप; बाइनरी ऑपरेशन और तुलना के लिए विस्तारित रूप उपयोग करें।",
      ],
      [
        { q: "RFC 5952 मानक रूप क्या है?", a: "यह IPv6 पते लिखने का मानक तरीका है ताकि हर पते की ठीक एक प्रतिनिधित्व हो: लोअरकेस hex, कोई आगे का शून्य नहीं, और सबसे लंबी शून्य-शृंखला (2+ समूह) :: में संपीड़ित, बराबरी में पहली चुनी जाती है। इस मानक के बिना 2001:db8:0:0:1::1 और 2001:db8::1:0:0:0 एक ही पता हो सकते हैं पर string comparison में कभी मेल नहीं खाते।" },
        { q: "::ffff:192.168.1.1 डॉटेड नोटेशन क्यों रखता है?", a: "यह IPv4-मैप्ड पता है (::ffff:0:0/96)। RFC 5952 धारा 5 कहती है कि ऐसे पतों के अंतिम 32 बिट IPv4 डॉटेड-डेसिमल नोटेशन में होने चाहिए क्योंकि वे semantic रूप से IPv4 पता दर्शाते हैं, चार hex समूह नहीं। बाकी सभी पते शुद्ध hex उपयोग करते हैं।" },
      ],
    ),
  },
  id: {
    name: "Ekspansi dan kompresi IPv6",
    tagline: "Perluas IPv6 ke bentuk lengkap 8 grup dan kompres ke bentuk kanonik RFC 5952 secara bersamaan — tanda kurung dan indeks zona dihapus otomatis, alamat mapped IPv4 dipertahankan. Gratis, instan, offline.",
    ...common(
      [
        "Alamat IPv6 dapat ditulis dengan banyak cara: bentuk lengkap, bentuk terkompresi nol, huruf besar/kecil campuran, dengan atau tanpa tanda kurung. Alat ini menerima representasi valid apa pun dan menghasilkan bentuk kanonik terkompresi RFC 5952 dan bentuk lengkap secara bersamaan — Anda selalu tahu tepat apa yang diwakili sebuah alamat.",
        "Kompresi mengikuti RFC 5952 secara presisi: run nol terpanjang (2+ grup) menjadi ::, angka nol di awal grup dihapus, output huruf kecil, dan saat dua run nol sama panjang yang pertama dikompresi. Alamat mapped IPv4 (::ffff:0:0/96) mempertahankan sufiks desimal titik sesuai standar.",
        "Tanda kurung (dari konteks URL) dan indeks zona (%eth0) dihapus otomatis. Alamat tidak valid — beberapa ::, jumlah grup salah, karakter di luar hex — ditolak dengan masalah spesifik yang dinyatakan. Semuanya berjalan lokal; tanpa panggilan jaringan.",
      ],
      [
        "Tempel alamat IPv6 valid apa pun — tanda kurung, huruf besar/kecil campuran, dan singkatan ditangani otomatis.",
        "Klik Konversi — bentuk terkompresi dan lengkap muncul di bawah, masing-masing dengan tombol salin.",
        "Gunakan bentuk terkompresi untuk tampilan dan URL; bentuk lengkap untuk operasi biner dan perbandingan.",
      ],
      [
        { q: "Apa itu bentuk kanonik RFC 5952?", a: "Ini cara standar menulis alamat IPv6 agar setiap alamat memiliki tepat satu representasi: hex huruf kecil, tanpa nol di awal, dan run nol terpanjang (2+ grup) dikompresi menjadi ::, memilih run pertama saat seri. Tanpa standar ini, 2001:db8:0:0:1::1 dan 2001:db8::1:0:0:0 bisa merujuk alamat yang sama tetapi tidak pernah cocok dalam perbandingan string." },
        { q: "Mengapa ::ffff:192.168.1.1 mempertahankan notasi titik?", a: "Ini adalah alamat mapped IPv4 (::ffff:0:0/96). Bagian 5 RFC 5952 menyatakan bahwa 32 bit terakhir dari alamat semacam ini harus direpresentasikan dalam notasi desimal bertitik karena secara semantik mewakili alamat IPv4, bukan empat grup hex. Semua alamat lain menggunakan hex murni." },
      ],
    ),
  },
  vi: {
    name: "Mở rộng và nén IPv6",
    tagline: "Mở rộng IPv6 ra dạng đầy đủ 8 nhóm và nén về dạng chuẩn RFC 5952 đồng thời — ngoặc đơn và chỉ số vùng được loại tự động, địa chỉ mapped IPv4 được giữ nguyên. Miễn phí, tức thì, ngoại tuyến.",
    ...common(
      [
        "Địa chỉ IPv6 có thể viết theo nhiều cách: dạng đầy đủ, dạng nén số không, chữ hoa/chữ thường hỗn hợp, có hoặc không có ngoặc. Công cụ này nhận bất kỳ biểu diễn hợp lệ nào và xuất ra cả dạng chuẩn nén RFC 5952 lẫn dạng mở rộng đầy đủ đồng thời — luôn biết chính xác một địa chỉ đại diện cho điều gì.",
        "Việc nén tuân thủ chính xác RFC 5952: chuỗi số không dài nhất (2+ nhóm) trở thành ::, số không đầu trong nhóm được loại, đầu ra chữ thường, và khi hai chuỗi số không bằng nhau thì nén chuỗi đầu tiên. Địa chỉ mapped IPv4 (::ffff:0:0/96) giữ hậu số thập phân theo tiêu chuẩn.",
        "Ngoặc đơn (từ ngữ cảnh URL) và chỉ số vùng (%eth0) được loại tự động. Địa chỉ không hợp lệ — nhiều ::, sai số nhóm, ký tự ngoài hex — bị từ chối kèm vấn đề cụ thể. Mọi thứ chạy cục bộ; không gọi mạng.",
      ],
      [
        "Dán bất kỳ địa chỉ IPv6 hợp lệ nào — ngoặc đơn, chữ hoa/thường hỗn hợp và viết tắt đều được xử lý tự động.",
        "Nhấp Chuyển đổi — cả dạng nén và mở rộng đều xuất hiện bên dưới, mỗi dạng có nút sao chép.",
        "Dùng dạng nén để hiển thị và URL; dạng mở rộng cho phép toán nhị phân và so sánh.",
      ],
      [
        { q: "Dạng chuẩn RFC 5952 là gì?", a: "Đây là cách viết chuẩn để mỗi địa chỉ IPv6 có chính xác một biểu diễn: hex chữ thường, không số không đầu, chuỗi số không dài nhất (2+ nhóm) nén thành ::, khi bằng nhau chọn chuỗi đầu tiên. Không có tiêu chuẩn này, 2001:db8:0:0:1::1 và 2001:db8::1:0:0:0 có thể chỉ cùng một địa chỉ nhưng không bao giờ khớp khi so sánh chuỗi." },
        { q: "Tại sao ::ffff:192.168.1.1 giữ ký hiệu chấm?", a: "Đây là địa chỉ mapped IPv4 (::ffff:0:0/96). Mục 5 của RFC 5952 quy định 32 bit cuối của các địa chỉ này phải biểu diễn bằng ký hiệu chấm thập phân vì về mặt ngữ nghĩa chúng là địa chỉ IPv4, không phải bốn nhóm hex. Mọi địa chỉ khác dùng hex thuần túy." },
      ],
    ),
  },
};
