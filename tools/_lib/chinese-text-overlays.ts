/**
 * CN-016 chinese-text-converter 扩展语言 overlay(10 语)。
 * 模式与 lunar-calendar-overlays.ts 相同。
 */

import type { ToolCopy } from "./types";

function common(
  intro: [string, string, string],
  steps: [string, string, string],
  faqs: Array<{ q: string; a: string }>,
) {
  return { intro, steps, faqs };
}

export const CHINESE_TEXT_OVERLAYS: Record<string, ToolCopy> = {
  fr: {
    name: "Convertisseur de texte chinois",
    tagline: "Convertissez entre chinois simplifié et traditionnel instantanément — variantes standard, Taïwan et Hong Kong. Gratuit, privé, hors ligne.",
    ...common(
      [
        "Conversion bidirectionnelle entre chinois simplifié et traditionnel avec des mappages de qualité OpenCC. Quatre directions : Simplifié → Traditionnel (standard), Simplifié → Traditionnel Taïwan, Simplifié → Traditionnel Hong Kong, ou Traditionnel → Simplifié.",
        "Utilise les dictionnaires OpenCC, qui gèrent non seulement le mappage de caractères mais aussi les différences de vocabulaire (软件 → 軟體 à Taïwan vs 軟件 à Hong Kong). Le même moteur que les flux de localisation chinois professionnels.",
        "Tout fonctionne localement avec opencc-js — sans compte, sans envoi. Jusqu'à 100 000 caractères par conversion.",
      ],
      [
        "Choisissez la direction de conversion dans les boutons de variante.",
        "Collez ou tapez le texte chinois à convertir.",
        "Cliquez sur Convertir — le résultat apparaît ci-dessous, prêt à copier.",
      ],
      [
        { q: "Quelle est la différence entre les variantes standard, Taïwan et Hong Kong ?", a: "Les trois convertissent les caractères simplifiés en traditionnels, mais Taïwan et Hong Kong adaptent aussi le vocabulaire : 软件 devient 軟體 à Taïwan et 軟件 à Hong Kong." },
        { q: "Y a-t-il une limite de caractères ?", a: "Oui, jusqu'à 100 000 caractères par conversion. Pour les textes plus longs, divisez-les en parties." },
      ],
    ),
  },
  de: {
    name: "Chinesischer Textkonverter",
    tagline: "Konvertieren Sie sofort zwischen vereinfachtem und traditionellem Chinesisch — Varianten Standard, Taiwan und Hong Kong. Kostenlos, privat, offline.",
    ...common(
      [
        "Zweiwege-Konvertierung zwischen vereinfachtem und traditionellem Chinesisch mit OpenCC-Qualität. Vier Richtungen: Vereinfacht → Traditionell (Standard), Vereinfacht → Traditionell Taiwan, Vereinfacht → Traditionell Hong Kong, oder Traditionell → Vereinfacht.",
        "Verwendet die OpenCC-Wörterbücher, die nicht nur Zeichenmappings sondern auch Vokabularunterschiede behandeln (软件 → 軟體 in Taiwan vs 軟件 in Hong Kong). Dieselbe Engine wie professionelle chinesische Lokalisierungs-Workflows.",
        "Alles läuft lokal mit opencc-js — kein Konto, kein Upload. Bis zu 100.000 Zeichen pro Konvertierung.",
      ],
      [
        "Wählen Sie die Konvertierungsrichtung über die Varianten-Buttons.",
        "Fügen Sie den chinesischen Text ein, der konvertiert werden soll.",
        "Klicken Sie auf Konvertieren — das Ergebnis erscheint unten, bereit zum Kopieren.",
      ],
      [
        { q: "Was ist der Unterschied zwischen Standard, Taiwan und Hong Kong?", a: "Alle drei konvertieren vereinfachte in traditionelle Zeichen, aber Taiwan und Hong Kong passen auch den Wortschatz an: 软件 wird in Taiwan zu 軟體 und in Hong Kong zu 軟件." },
        { q: "Gibt es ein Zeichenlimit?", a: "Ja, bis zu 100.000 Zeichen pro Konvertierung. Längere Texte können in Teilen verarbeitet werden." },
      ],
    ),
  },
  ru: {
    name: "Конвертер китайского текста",
    tagline: "Мгновенно преобразуйте между упрощённым и традиционным китайским — варианты: стандартный, тайваньский и гонконгский. Бесплатно, приватно, офлайн.",
    ...common(
      [
        "Двустороннее преобразование между упрощённым и традиционным китайским с качеством OpenCC. Четыре направления: Упрощённый → Традиционный (стандарт), Упрощённый → Традиционный Тайвань, Упрощённый → Традиционный Гонконг, или Традиционный → Упрощённый.",
        "Использует словари OpenCC, которые обрабатывают не только посимвольное сопоставление, но и различия лексики (软件 → 軟體 на Тайване vs 軟件 в Гонконге). Тот же движок, что и в профессиональной китайской локализации.",
        "Всё выполняется локально через opencc-js — без аккаунта, без загрузки. До 100 000 символов за раз.",
      ],
      [
        "Выберите направление преобразования с помощью кнопок вариантов.",
        "Вставьте или введите китайский текст для преобразования.",
        "Нажмите Преобразовать — результат появится ниже, готовый для копирования.",
      ],
      [
        { q: "В чём разница между стандартным, тайваньским и гонконгским вариантами?", a: "Все три преобразуют упрощённые иероглифы в традиционные, но Тайвань и Гонконг также адаптируют лексику: 软件 становится 軟體 на Тайване и 軟件 в Гонконге." },
        { q: "Есть ли лимит символов?", a: "Да, до 100 000 символов за преобразование. Более длинные тексты можно обрабатывать по частям." },
      ],
    ),
  },
  it: {
    name: "Convertitore di testo cinese",
    tagline: "Converti istantaneamente tra cinese semplificato e tradizionale — varianti standard, Taiwan e Hong Kong. Gratuito, privato, offline.",
    ...common(
      [
        "Conversione bidirezionale tra cinese semplificato e tradizionale con mappature di qualità OpenCC. Quattro direzioni: Semplificato → Tradizionale (standard), Semplificato → Tradizionale Taiwan, Semplificato → Tradizionale Hong Kong, o Tradizionale → Semplificato.",
        "Usa i dizionari OpenCC, che gestiscono non solo il mapping dei caratteri ma anche le differenze di vocabolario (软件 → 軟體 a Taiwan vs 軟件 a Hong Kong). È lo stesso motore dei flussi di localizzazione cinesi professionali.",
        "Tutto funziona localmente con opencc-js — senza account, senza invii. Fino a 100.000 caratteri per conversione.",
      ],
      [
        "Scegli la direzione di conversione dai pulsanti delle varianti.",
        "Incolla o digita il testo cinese da convertire.",
        "Clicca Converti — il risultato appare sotto, pronto da copiare.",
      ],
      [
        { q: "Qual è la differenza tra le varianti standard, Taiwan e Hong Kong?", a: "Tutti e tre convertono i caratteri semplificati in tradizionali, ma Taiwan e Hong Kong adattano anche il vocabolario: 软件 diventa 軟體 a Taiwan e 軟件 a Hong Kong." },
        { q: "C'è un limite di caratteri?", a: "Sì, fino a 100.000 caratteri per conversione. Per testi più lunghi, dividi in parti." },
      ],
    ),
  },
  tr: {
    name: "Çince metin dönüştürücü",
    tagline: "Basitleştirilmiş ve geleneksel Çince arasında anında dönüştürün — Standart, Tayvan ve Hong Kong varyantları. Ücretsiz, özel, çevrimdışı.",
    ...common(
      [
        "Basitleştirilmiş ve geleneksel Çince arasında OpenCC kalitesinde iki yönlü dönüşüm. Dört yön: Basitleştirilmiş → Geleneksel (Standart), Basitleştirilmiş → Geleneksel Tayvan, Basitleştirilmiş → Geleneksel Hong Kong, veya Geleneksel → Basitleştirilmiş.",
        "OpenCC sözlüklerini kullanır; sadece karakter eşleştirmeyi değil kelime farklarını da işler (软件 → Tayvan'da 軟體, Hong Kong'da 軟件). Profesyonel Çince yerelleştirme iş akışlarında kullanılan motorla aynıdır.",
        "Her şey tarayıcınızda opencc-js ile çalışır — hesap yok, yükleme yok. Dönüşüm başına 100.000 karaktere kadar.",
      ],
      [
        "Varyant düğmelerinden dönüşüm yönünü seçin.",
        "Dönüştürmek istediğiniz Çince metni yapıştırın veya yazın.",
        "Dönüştür'e tıklayın — sonuç aşağıda görünür, kopyalamaya hazır.",
      ],
      [
        { q: "Standart, Tayvan ve Hong Kong varyantları arasındaki fark nedir?", a: "Üçü de basitleştirilmiş karakterleri geleneksel olanlara dönüştürür, ancak Tayvan ve Hong Kong kelime da uyarlar: 软件 Tayvan'da 軟體, Hong Kong'da 軟件 olur." },
        { q: "Karakter limiti var mı?", a: "Evet, dönüşüm başına 100.000 karaktere kadar. Daha uzun metinler parçalara bölünebilir." },
      ],
    ),
  },
  ko: {
    name: "중국어 텍스트 변환기",
    tagline: "브라우저에서 간체와 번체 중국어를 즉시 변환합니다 — 표준, 대만, 홍콩 변형 지원. 무료 · 프라이빗 · 오프라인 작동.",
    ...common(
      [
        "간체와 번체 중국어 간의 양방향 변환으로 OpenCC 품질의 매핑을 제공합니다. 네 가지 방향: 간체 → 번체(표준), 간체 → 번체(대만), 간체 → 번체(홍콩), 번체 → 간체.",
        "OpenCC 사전을 사용하여 문자 수준 매핑뿐만 아니라 어휘 차이도 처리합니다(软件 → 대만에서 軟體, 홍콩에서 軟件). 전문 중국어 현지화 워크플로에서 사용하는 것과 동일한 엔진입니다.",
        "모든 변환은 브라우저의 opencc-js 라이브러리로 수행됩니다 — 계정도 업로드도 없습니다. 1회 최대 100,000자.",
      ],
      [
        "변형 버튼에서 변환 방향을 선택하세요.",
        "변환할 중국어 텍스트를 붙여넣거나 입력하세요.",
        "변환 버튼을 클릭하세요 — 결과가 아래에 표시되고 복사할 수 있습니다.",
      ],
      [
        { q: "표준 번체, 대만, 홍콩 변형의 차이점은 무엇인가요?", a: "세 가지 모두 간체를 번체로 변환하지만, 대만과 홍콩 변형은 어휘도 조정합니다: 软件는 대만에서 軟體로, 홍콩에서 軟件으로 표기됩니다." },
        { q: "글자 수 제한이 있나요?", a: "네, 1회 최대 100,000자입니다. 더 긴 텍스트는 나누어 처리하세요." },
      ],
    ),
  },
  ar: {
    name: "محول النص الصيني",
    tagline: "حوّل فورًا بين الصينية المبسطة والتقليدية — خيارات: قياسي وتايوان وهونغ كونغ. مجاني وخاص ويعمل دون اتصال.",
    ...common(
      [
        "تحويل ثنائي الاتجاه بين الصينية المبسطة والتقليدية مع خرائط بجودة OpenCC. أربعة اتجاهات: مبسط → تقليدي (قياسي)، مبسط → تقليدي تايوان، مبسط → تقليدي هونغ كونغ، أو تقليدي → مبسط.",
        "يستخدم قواميس OpenCC التي تعالج ليس فقط مطابقة الأحرف ولكن أيضًا اختلافات المفردات (软件 → 軟體 في تايوان vs 軟件 في هونغ كونغ). نفس المحرك المستخدم في تدفقات التعريب الصينية الاحترافية.",
        "كل شيء يعمل محليًا في متصفحك عبر opencc-js — بلا حسابات، بلا رفع. يدعم حتى 100,000 حرف لكل تحويل.",
      ],
      [
        "اختر اتجاه التحويل من أزرار الخيارات.",
        "الصق أو اكتب النص الصيني الذي تريد تحويله.",
        "انقر على تحويل — تظهر النتيجة أدناه، جاهزة للنسخ.",
      ],
      [
        { q: "ما الفرق بين الخيارات القياسية وتايوان وهونغ كونغ؟", a: "الثلاثة تحول الأحرف المبسطة إلى تقليدية، لكن تايوان وهونغ كونغ تضيفان أيضًا تعديل المفردات: 软件 تصبح 軟體 في تايوان و 軟件 في هونغ كونغ." },
        { q: "هل يوجد حد لعدد الأحرف؟", a: "نعم، حتى 100,000 حرف لكل تحويل. للنصوص الأطول قسّمها إلى أجزاء." },
      ],
    ),
  },
  hi: {
    name: "चीनी टेक्स्ट कनवर्टर",
    tagline: "सरलीकृत और पारंपरिक चीनी के बीच तुरंत बदलें — मानक, ताइवान और हांगकांग संस्करण। मुफ़्त, निजी, ऑफ़लाइन।",
    ...common(
      [
        "OpenCC गुणवत्ता मैपिंग के साथ सरलीकृत और पारंपरिक चीनी के बीच द्विदिश रूपांतरण। चार दिशाएँ: सरलीकृत → पारंपरिक (मानक), सरलीकृत → पारंपरिक ताइवान, सरलीकृत → पारंपरिक हांगकांग, या पारंपरिक → सरलीकृत।",
        "OpenCC शब्दकोशों का उपयोग करता है जो केवल वर्ण मैपिंग ही नहीं बल्कि शब्दावली अंतर भी संभालते हैं (软件 → ताइवान में 軟體 vs हांगकांग में 軟件)। वही इंजन जो पेशेवर चीनी स्थानीयकरण वर्कफ़्लो में उपयोग होता है।",
        "सब कुछ आपके ब्राउज़र में opencc-js से स्थानीय रूप से चलता है — खाता नहीं, अपलोड नहीं। प्रति रूपांतरण 100,000 वर्ण तक।",
      ],
      [
        "वेरिएंट बटनों से रूपांतरण दिशा चुनें।",
        "जिस चीनी टेक्स्ट को बदलना है उसे पेस्ट या टाइप करें।",
        "कन्वर्ट पर क्लिक करें — परिणाम नीचे दिखेगा, कॉपी के लिए तैयार।",
      ],
      [
        { q: "मानक, ताइवान और हांगकांग संस्करणों में क्या अंतर है?", a: "तीनों सरलीकृत वर्णों को पारंपरिक में बदलते हैं, लेकिन ताइवान और हांगकांग शब्दावली भी अनुकूलित करते हैं: 软件 ताइवान में 軟體 और हांगकांग में 軟件 बनता है।" },
        { q: "क्या वर्ण सीमा है?", a: "हाँ, प्रति रूपांतरण 100,000 वर्ण तक। लंबे टेक्स्ट के लिए उन्हें भागों में बाँटें।" },
      ],
    ),
  },
  id: {
    name: "Konverter teks Tionghoa",
    tagline: "Konversi antara Tionghoa Sederhana dan Tradisional secara instan — varian Standar, Taiwan, dan Hong Kong. Gratis, privat, offline.",
    ...common(
      [
        "Konversi dua arah antara Tionghoa Sederhana dan Tradisional dengan kualitas pemetaan OpenCC. Empat arah: Sederhana → Tradisional (standar), Sederhana → Tradisional Taiwan, Sederhana → Tradisional Hong Kong, atau Tradisional → Sederhana.",
        "Menggunakan kamus OpenCC, yang menangani tidak hanya pemetaan karakter tetapi juga perbedaan kosakata (软件 → 軟體 di Taiwan vs 軟件 di Hong Kong). Mesin yang sama dengan alur kerja lokalisasi Tionghoa profesional.",
        "Semuanya berjalan lokal di browser Anda dengan opencc-js — tanpa akun, tanpa unggahan. Mendukung hingga 100.000 karakter per konversi.",
      ],
      [
        "Pilih arah konversi dari tombol varian.",
        "Tempel atau ketik teks Tionghoa yang ingin dikonversi.",
        "Klik Konversi — hasilnya muncul di bawah, siap disalin.",
      ],
      [
        { q: "Apa perbedaan antara varian Standar, Taiwan, dan Hong Kong?", a: "Ketiganya mengonversi karakter Sederhana ke Tradisional, tetapi Taiwan dan Hong Kong juga menyesuaikan kosakata: 软件 menjadi 軟體 di Taiwan dan 軟件 di Hong Kong." },
        { q: "Apakah ada batas karakter?", a: "Ya, hingga 100.000 karakter per konversi. Untuk teks yang lebih panjang, bagi menjadi beberapa bagian." },
      ],
    ),
  },
  vi: {
    name: "Công cụ chuyển đổi văn bản Trung Quốc",
    tagline: "Chuyển đổi tức thì giữa tiếng Trung giản thể và phồn thể — các biến thể: chuẩn, Đài Loan và Hồng Kông. Miễn phí, riêng tư, ngoại tuyến.",
    ...common(
      [
        "Chuyển đổi hai chiều giữa tiếng Trung giản thể và phồn thể với chất lượng ánh xạ OpenCC. Bốn hướng: Giản thể → Phồn thể (chuẩn), Giản thể → Phồn thể Đài Loan, Giản thể → Phồn thể Hồng Kông, hoặc Phồn thể → Giản thể.",
        "Sử dụng từ điển OpenCC, xử lý không chỉ ánh xạ ký tự mà còn khác biệt từ vựng (软件 → 軟體 ở Đài Loan vs 軟件 ở Hồng Kông). Cùng động cơ với quy trình bản địa hóa tiếng Trung chuyên nghiệp.",
        "Mọi thứ chạy cục bộ trong trình duyệt bằng opencc-js — không tài khoản, không tải lên. Hỗ trợ tối đa 100,000 ký tự mỗi lần chuyển đổi.",
      ],
      [
        "Chọn hướng chuyển đổi từ các nút biến thể.",
        "Dán hoặc nhập văn bản Trung Quốc cần chuyển đổi.",
        "Nhấp Chuyển đổi — kết quả xuất hiện bên dưới, sẵn sàng sao chép.",
      ],
      [
        { q: "Khác biệt giữa biến thể chuẩn, Đài Loan và Hồng Kông là gì?", a: "Cả ba chuyển ký tự giản thể sang phồn thể, nhưng Đài Loan và Hồng Kông cũng điều chỉnh từ vựng: 软件 thành 軟體 ở Đài Loan và 軟件 ở Hồng Kông." },
        { q: "Có giới hạn ký tự không?", a: "Có, tối đa 100,000 ký tự mỗi lần chuyển đổi. Văn bản dài hơn có thể chia nhỏ." },
      ],
    ),
  },
};
