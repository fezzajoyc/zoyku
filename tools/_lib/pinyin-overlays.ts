/**
 * CN-014 pinyin-converter 扩展语言 overlay(10 语)。
 * 模式与 chinese-text-overlays.ts 相同。
 */

import type { ToolCopy } from "./types";

function common(
  intro: [string, string, string],
  steps: [string, string, string],
  faqs: Array<{ q: string; a: string }>,
) {
  return { intro, steps, faqs };
}

export const PINYIN_OVERLAYS: Record<string, ToolCopy> = {
  fr: {
    name: "Convertisseur de Pinyin chinois",
    tagline: "Convertissez les caractères chinois en Pinyin instantanément — tons, chiffres de ton, sans ton ou initiales. Caractères polyphoniques résolus par contexte. Gratuit, privé, hors ligne.",
    ...common(
      [
        "Convertissez les caractères chinois (汉字) en Pinyin avec quatre modes de sortie : tons marqués (zhōng wén), chiffres de ton (zhong1), lettres sans tons (zhong) ou initiales seules (z w).",
        "Le convertisseur utilise le dictionnaire pinyin-pro, qui résout les caractères polyphoniques (多音字) selon leur contexte : 重庆 se lit chóng qìng et non zhòng qìng, et 行 dans 银行 se lit háng. Essentiel pour les noms, adresses et paroles de chansons.",
        "Tout fonctionne localement dans votre navigateur avec pinyin-pro — sans envoi, sans suivi. Jusqu'à 50 000 caractères par conversion.",
      ],
      [
        "Choisissez le mode de sortie dans les boutons de mode.",
        "Collez ou tapez le texte chinois à convertir.",
        "Cliquez sur Convertir — le Pinyin apparaît ci-dessous, prêt à copier.",
      ],
      [
        { q: "Comment les caractères polyphoniques (多音字) sont-ils gérés ?", a: "Le convertisseur utilise pinyin-pro, qui détermine la lecture selon le contexte : 重庆 devient chóng qìng (pas zhòng qìng), et 行 dans 银行 se lit háng. Les caractères isolés suivent la lecture la plus courante." },
        { q: "Quelle est la différence entre les quatre modes ?", a: "Les tons ajoutent des diacritiques (zhōng wén), les chiffres de ton utilisent des chiffres (zhong1 wen2), sans ton supprime les marques (zhong wen), et les initiales n'affichent que l'initiale de chaque syllabe (z w) — pratique pour les abréviations et les noms d'utilisateur." },
      ],
    ),
  },
  de: {
    name: "Chinesischer Pinyin-Konverter",
    tagline: "Konvertieren Sie chinesische Zeichen sofort in Pinyin — Tonzeichen, Tonnummern, ohne Töne oder Anfangsbuchstaben. Mehrzeichen-Lesungen werden kontextabhängig aufgelöst. Kostenlos, privat, offline.",
    ...common(
      [
        "Konvertieren Sie chinesische Zeichen (汉字) mit vier Ausgabemodi in Pinyin: Tonzeichen (zhōng wén), Tonnummern (zhong1), Buchstaben ohne Töne (zhong) oder nur Anfangsbuchstaben (z w).",
        "Der Konverter verwendet das pinyin-pro-Wörterbuch, das Mehrzeichen-Lesungen (多音字) aus dem Kontext auflöst: 重庆 wird chóng qìng gelesen (nicht zhòng qìng), und 行 in 银行 wird háng gelesen. Wichtig für Namen, Adressen und Songtexte.",
        "Alles läuft lokal in Ihrem Browser mit pinyin-pro — kein Upload, kein Tracking. Bis zu 50.000 Zeichen pro Konvertierung.",
      ],
      [
        "Wählen Sie den Ausgabemodus über die Modus-Buttons.",
        "Fügen Sie den chinesischen Text ein, der konvertiert werden soll.",
        "Klicken Sie auf Konvertieren — der Pinyin erscheint unten, bereit zum Kopieren.",
      ],
      [
        { q: "Wie werden mehrdeutige Zeichen (多音字) behandelt?", a: "Der Konverter verwendet pinyin-pro, das Lesungen aus dem Kontext auflöst: 重庆 wird chóng qìng (nicht zhòng qìng), und 行 in 银行 wird háng gelesen. Einzelne Zeichen folgen der häufigsten Lesung." },
        { q: "Was ist der Unterschied zwischen den vier Modi?", a: "Tonzeichen fügen Diakritika hinzu (zhōng wén), Tonnummern verwenden Ziffern (zhong1 wen2), ohne Töne entfernt alle Marken (zhong wen), und Anfangsbuchstaben geben nur den Anfang jeder Silbe aus (z w) — praktisch für Abkürzungen und Benutzernamen." },
      ],
    ),
  },
  ru: {
    name: "Конвертер иероглифов в пиньинь",
    tagline: "Мгновенно преобразуйте китайские иероглифы в пиньинь — тоны, цифровые тоны, без тонов или инициали. Полифонические иероглифы разрешаются по контексту. Бесплатно, приватно, офлайн.",
    ...common(
      [
        "Преобразуйте китайские иероглифы (汉字) в пиньинь с четырьмя режимами вывода: тоны (zhōng wén), цифровые тоны (zhong1), буквы без тонов (zhong) или только инициали (z w).",
        "Конвертер использует словарь pinyin-pro, который определяет чтения полифонических иероглифов (多音字) по контексту: 重庆 читается chóng qìng (не zhòng qìng), а 行 в 银行 читается háng. Это важно для имён, адресов и текстов песен.",
        "Всё выполняется локально в вашем браузере через pinyin-pro — без загрузок, без отслеживания. До 50 000 символов за раз.",
      ],
      [
        "Выберите режим вывода кнопками режима.",
        "Вставьте или введите китайский текст для преобразования.",
        "Нажмите Преобразовать — пиньинь появится ниже, готовый для копирования.",
      ],
      [
        { q: "Как обрабатываются полифонические иероглифы (多音字)?", a: "Конвертер использует pinyin-pro, который определяет чтение по контексту: 重庆 — chóng qìng (не zhòng qìng), а 行 в 银行 — háng. Одиночные иероглифы получают самое распространённое чтение." },
        { q: "В чём разница между четырьмя режимами?", a: "Тоны добавляют диакритику (zhōng wén), цифровые тоны используют цифры (zhong1 wen2), режим без тонов убирает обозначения (zhong wen), а инициали выводят только начальный звук каждого слога (z w) — удобно для аббревиатур и имён пользователей." },
      ],
    ),
  },
  it: {
    name: "Convertitore Pinyin cinese",
    tagline: "Converti istantaneamente i caratteri cinesi in Pinyin — toni, numeri di tono, senza toni o iniziali. Caratteri polifonici risolti dal contesto. Gratuito, privato, offline.",
    ...common(
      [
        "Converti i caratteri cinesi (汉字) in Pinyin con quattro modalità di output: toni marcati (zhōng wén), numeri di tono (zhong1), lettere senza toni (zhong) o solo iniziali (z w).",
        "Il convertitore usa il dizionario pinyin-pro, che risolve i caratteri polifonici (多音字) dal contesto: 重庆 si legge chóng qìng e non zhòng qìng, e 行 in 银行 si legge háng. Fondamentale per nomi, indirizzi e testi di canzoni.",
        "Tutto funziona localmente nel tuo browser con pinyin-pro — senza invii, senza tracciamento. Fino a 50.000 caratteri per conversione.",
      ],
      [
        "Scegli la modalità di output dai pulsanti di modalità.",
        "Incolla o digita il testo cinese da convertire.",
        "Clicca Converti — il Pinyin appare sotto, pronto da copiare.",
      ],
      [
        { q: "Come vengono gestiti i caratteri polifonici (多音字)?", a: "Il convertitore usa pinyin-pro, che determina le letture dal contesto: 重庆 diventa chóng qìng (non zhòng qìng), e 行 in 银行 si legge háng. I caratteri isolati usano la lettura più comune." },
        { q: "Qual è la differenza tra le quattro modalità?", a: "I toni aggiungono diacritici (zhōng wén), i numeri di tono usano cifre (zhong1 wen2), senza toni rimuove i contrassegni (zhong wen), e le iniziali mostrano solo l'iniziale di ogni sillaba (z w) — utile per abbreviazioni e nomi utente." },
      ],
    ),
  },
  tr: {
    name: "Çince Pinyin dönüştürücü",
    tagline: "Çince karakterleri anında Pinyin'ye dönüştürün — ton işaretleri, ton sayıları, tonsuz veya baş harfler. Çok okumalı karakterler bağlama göre çözülür. Ücretsiz, özel, çevrimdışı.",
    ...common(
      [
        "Çince karakterleri (汉字) dört çıkış moduyla Pinyin'ye dönüştürün: ton işaretleri (zhōng wén), ton sayıları (zhong1), tonsuz harfler (zhong) veya yalnızca baş harfler (z w).",
        "Dönüştürücü, çok okumalı karakterleri (多音字) bağlama göre çözen pinyin-pro sözlüğünü kullanır: 重庆, chóng qìng olarak okunur (zhòng qìng değil), 银行 içindeki 行 ise háng okunur. İsimler, adresler ve şarkı sözleri için önemlidir.",
        "Her şey tarayıcınızda pinyin-pro ile yerel olarak çalışır — yükleme yok, izleme yok. Dönüşüm başına 50.000 karaktere kadar.",
      ],
      [
        "Mod düğmelerinden çıkış modunu seçin.",
        "Dönüştürmek istediğiniz Çince metni yapıştırın veya yazın.",
        "Dönüştür'e tıklayın — Pinyin aşağıda görünür, kopyalamaya hazır.",
      ],
      [
        { q: "Çok okumalı karakterler (多音字) nasıl işlenir?", a: "Dönüştürücü, okumaları bağlamdan çözen pinyin-pro kullanır: 重庆, chóng qìng olur (zhòng qìng değil), 银行 içindeki 行 ise háng okunur. Tek başına karakterler en yaygın okumayı alır." },
        { q: "Dört mod arasındaki fark nedir?", a: "Ton işaretleri diakritik ekler (zhōng wén), ton sayıları rakam kullanır (zhong1 wen2), tonsuz mod işaretleri kaldırır (zhong wen), baş harfler her hecenin yalnızca baş harfini verir (z w) — kısaltmalar ve kullanıcı adları için kullanışlıdır." },
      ],
    ),
  },
  ko: {
    name: "중국어 병음 변환기",
    tagline: "한자를 병음으로 즉시 변환합니다 — 성조 기호·성조 숫자·무성조·첫 글자 네 가지 모드, 다음자(多音字)는 문맥으로 자동 판별합니다. 무료 · 프라이빗 · 오프라인 작동, 데이터 전송 없음.",
    ...common(
      [
        "한자를 병음으로 변환하는 도구로, 네 가지 출력 모드를 제공합니다: 성조 기호(zhōng wén), 성조 숫자(zhong1), 무성조(zhong), 첫 글자(z w).",
        "pinyin-pro 사전을 사용하여 다음자(多音字)를 문맥에서 판별합니다: 重慶은 chóng qìng(zhòng qìng가 아님)로, 銀行의 行은 háng으로 읽습니다. 이름·주소·가사 처리에 중요합니다.",
        "모든 변환은 브라우저의 pinyin-pro 라이브러리로 수행됩니다 — 계정도 업로드도 없습니다. 1회 최대 50,000자.",
      ],
      [
        "모드 버튼에서 출력 형식을 선택하세요.",
        "변환할 중국어 텍스트를 붙여넣거나 입력하세요.",
        "변환 버튼을 클릭하세요 — 병음 결과가 아래에 표시되고 복사할 수 있습니다.",
      ],
      [
        { q: "다음자(多音字)는 어떻게 처리되나요?", a: "pinyin-pro 사전이 문맥으로 읽기를 판별합니다: 重慶은 chóng qìng(zhòng qìng가 아님), 銀行의 行은 háng으로 읽힙니다. 단독 글자는 가장 흔한 읽기를 사용합니다." },
        { q: "네 가지 모드의 차이점은 무엇인가요?", a: "성조 기호는 다이어크리틱을 붙이고(zhōng wén), 성조 숫자는 숫자로 표기하며(zhong1 wen2), 무성조는 기호를 제거하고(zhong wen), 첫 글자는 각 음절의 첫 자만 출력합니다(z w) — 약어와 사용자 이름 생성에 유용합니다." },
      ],
    ),
  },
  ar: {
    name: "محول البينيين الصيني",
    tagline: "حوّل الأحرف الصينية إلى بينيين فورًا — علامات النبرة، أرقام النبرة، بدون نبرة، أو الأحرف الأولى. الأحرف متعددة القراءات تُحل من السياق. مجاني وخاص ويعمل دون اتصال.",
    ...common(
      [
        "حوّل الأحرف الصينية (汉字) إلى بينيين بأربعة أنماط إخراج: علامات النبرة (zhōng wén)، أرقام النبرة (zhong1)، حروف بدون نبرة (zhong)، أو الأحرف الأولى فقط (z w).",
        "يستخدم المحول قاموس pinyin-pro الذي يحل الأحرف متعددة القراءات (多音字) من سياقها: 重庆 تُقرأ chóng qìng وليس zhòng qìng، و 行 في 银行 تُقرأ háng. هذا مهم للأسماء والعناوين وكلمات الأغاني.",
        "كل شيء يعمل محليًا في متصفحك عبر pinyin-pro — بلا رفع، بلا تتبع. يدعم حتى 50,000 حرف لكل تحويل.",
      ],
      [
        "اختر نمط الإخراج من أزرار النمط.",
        "الصق أو اكتب النص الصيني الذي تريد تحويله.",
        "انقر على تحويل — يظهر البينيين أدناه، جاهزًا للنسخ.",
      ],
      [
        { q: "كيف تُعالج الأحرف متعددة القراءات (多音字)؟", a: "يستخدم المحول pinyin-pro الذي يحدد القراءة من السياق: 重庆 تصبح chóng qìng (وليس zhòng qìng)، و 行 في 银行 تُقرأ háng. الأحرف المنفردة تأخذ القراءة الأكثر شيوعًا." },
        { q: "ما الفرق بين الأنماط الأربعة؟", a: "علامات النبرة تضيف رموزًا تشكيلية (zhōng wén)، أرقام النبرة تستخدم أرقامًا (zhong1 wen2)، النمط بدون نبرة يزيل العلامات (zhong wen)، والأحرف الأولى تُخرج فقط الحرف الأول من كل مقطع (z w) — مفيد للاختصارات وأسماء المستخدمين." },
      ],
    ),
  },
  hi: {
    name: "चीनी पिनयिन कनवर्टर",
    tagline: "चीनी वर्णों को तुरंत पिनयिन में बदलें — टोन मार्क, टोन नंबर, बिना टोन या पहले अक्षर के चार मोड। बहु-ध्वनि वर्ण संदर्भ से हल होते हैं। मुफ़्त, निजी, ऑफ़लाइन।",
    ...common(
      [
        "चीनी वर्णों (汉字) को चार आउटपुट मोड के साथ पिनयिन में बदलें: टोन मार्क (zhōng wén), टोन नंबर (zhong1), बिना टोन अक्षर (zhong), या केवल पहले अक्षर (z w)।",
        "कनवर्टर pinyin-pro शब्दकोश का उपयोग करता है, जो बहु-ध्वनि वर्णों (多音字) को संदर्भ से हल करता है: 重庆 को chóng qìng (zhòng qìng नहीं) पढ़ा जाता है, और 银行 में 行 को háng। नाम, पते और गीतों के लिए यह महत्वपूर्ण है।",
        "सब कुछ आपके ब्राउज़र में pinyin-pro से स्थानीय रूप से चलता है — कोई अपलोड नहीं, कोई ट्रैकिंग नहीं। प्रति रूपांतरण 50,000 वर्ण तक।",
      ],
      [
        "मोड बटनों से आउटपुट मोड चुनें।",
        "जिस चीनी टेक्स्ट को बदलना है उसे पेस्ट या टाइप करें।",
        "कन्वर्ट पर क्लिक करें — पिनयिन नीचे दिखेगा, कॉपी के लिए तैयार।",
      ],
      [
        { q: "बहु-ध्वनि वर्ण (多音字) कैसे संभाले जाते हैं?", a: "कनवर्टर pinyin-pro का उपयोग करता है, जो संदर्भ से उच्चारण तय करता है: 重庆 → chóng qìng (zhòng qìng नहीं), और 银行 में 行 → háng। अकेले वर्ण सबसे आम उच्चारण लेते हैं।" },
        { q: "चार मोड में क्या अंतर है?", a: "टोन मार्क डायक्रिटिक्स जोड़ते हैं (zhōng wén), टोन नंबर अंक उपयोग करते हैं (zhong1 wen2), बिना टोन सभी चिह्न हटाता है (zhong wen), और पहले अक्षर केवल हर शब्दांश का पहला अक्षर देते हैं (z w) — संक्षिप्ताक्षर और यूज़रनेम के लिए उपयोगी।" },
      ],
    ),
  },
  id: {
    name: "Konverter Pinyin Tionghoa",
    tagline: "Konversi karakter Tionghoa ke Pinyin secara instan — tanda nada, angka nada, tanpa nada, atau huruf awal. Karakter polifonik dipecahkan dari konteks. Gratis, privat, offline.",
    ...common(
      [
        "Konversi karakter Tionghoa (汉字) ke Pinyin dengan empat mode output: tanda nada (zhōng wén), angka nada (zhong1), huruf tanpa nada (zhong), atau hanya huruf awal (z w).",
        "Konverter menggunakan kamus pinyin-pro, yang menyelesaikan karakter polifonik (多音字) dari konteksnya: 重庆 dibaca chóng qìng bukan zhòng qìng, dan 行 dalam 银行 dibaca háng. Penting untuk nama, alamat, dan lirik lagu.",
        "Semuanya berjalan lokal di browser Anda dengan pinyin-pro — tanpa unggahan, tanpa pelacakan. Mendukung hingga 50.000 karakter per konversi.",
      ],
      [
        "Pilih mode output dari tombol mode.",
        "Tempel atau ketik teks Tionghoa yang ingin dikonversi.",
        "Klik Konversi — Pinyin muncul di bawah, siap disalin.",
      ],
      [
        { q: "Bagaimana karakter polifonik (多音字) ditangani?", a: "Konverter menggunakan pinyin-pro yang menentukan pembacaan dari konteks: 重庆 menjadi chóng qìng (bukan zhòng qìng), dan 行 dalam 银行 dibaca háng. Karakter tunggal menggunakan pembacaan paling umum." },
        { q: "Apa perbedaan antara empat mode?", a: "Tanda nada menambahkan diakritik (zhōng wén), angka nada menggunakan digit (zhong1 wen2), tanpa nada menghapus semua tanda (zhong wen), dan huruf awal hanya menampilkan huruf awal setiap suku kata (z w) — berguna untuk singkatan dan nama pengguna." },
      ],
    ),
  },
  vi: {
    name: "Công cụ chuyển Pinyin Trung Quốc",
    tagline: "Chuyển ký tự Trung Quốc sang Pinyin tức thì — dấu thanh, số thanh điệu, không thanh hoặc chữ cái đầu. Ký tự đa âm được giải quyết theo ngữ cảnh. Miễn phí, riêng tư, ngoại tuyến.",
    ...common(
      [
        "Chuyển ký tự Trung Quốc (汉字) sang Pinyin với bốn chế độ xuất: dấu thanh (zhōng wén), số thanh điệu (zhong1), chữ không dấu (zhong) hoặc chỉ chữ cái đầu (z w).",
        "Công cụ sử dụng từ điển pinyin-pro, giải quyết ký tự đa âm (多音字) theo ngữ cảnh: 重庆 đọc là chóng qìng chứ không phải zhòng qìng, và 行 trong 银行 đọc là háng. Điều này quan trọng với tên, địa chỉ và lời bài hát.",
        "Mọi thứ chạy cục bộ trong trình duyệt bằng pinyin-pro — không tải lên, không theo dõi. Hỗ trợ tối đa 50.000 ký tự mỗi lần chuyển đổi.",
      ],
      [
        "Chọn chế độ xuất từ các nút chế độ.",
        "Dán hoặc nhập văn bản Trung Quốc cần chuyển đổi.",
        "Nhấp Chuyển đổi — Pinyin xuất hiện bên dưới, sẵn sàng sao chép.",
      ],
      [
        { q: "Ký tự đa âm (多音字) được xử lý thế nào?", a: "Công cụ dùng pinyin-pro để xác định cách đọc theo ngữ cảnh: 重庆 thành chóng qìng (không phải zhòng qìng), và 行 trong 银行 đọc là háng. Ký tự đơn lẻ dùng cách đọc phổ biến nhất." },
        { q: "Khác biệt giữa bốn chế độ là gì?", a: "Dấu thanh thêm ký hiệu (zhōng wén), số thanh điệu dùng chữ số (zhong1 wen2), không thanh loại bỏ dấu (zhong wen), và chữ cái đầu chỉ xuất chữ đầu mỗi âm tiết (z w) — hữu ích cho viết tắt và tên người dùng." },
      ],
    ),
  },
};
