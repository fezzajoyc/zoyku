/**
 * CN-017 sm3-hash 扩展语言 overlay(10 语)。
 * 模式与 pinyin-overlays.ts 相同。
 */

import type { ToolCopy } from "./types";

function common(
  intro: [string, string, string],
  steps: [string, string, string],
  faqs: Array<{ q: string; a: string }>,
) {
  return { intro, steps, faqs };
}

export const SM3_OVERLAYS: Record<string, ToolCopy> = {
  fr: {
    name: "Calculateur de hachage SM3",
    tagline: "Calculez des digests SM3 (GB/T 32905-2016) à partir de texte, hexadécimal ou Base64 — le standard national chinois de hachage 256 bits. Gratuit, privé, hors ligne.",
    ...common(
      [
        "SM3 est la fonction de hachage cryptographique du standard chinois de cryptographie commerciale (国密), définie dans GB/T 32905-2016. Elle produit un digest de 256 bits — même longueur que SHA-256 — et est exigée dans les flux chinois de signature électronique, facturation et gouvernement.",
        "Collez vos données en texte UTF-8, octets hexadécimaux bruts ou Base64. Le digest est renvoyé en hexadécimal minuscule et Base64, prêt à coller dans un formulaire de vérification.",
        "Tout le hachage s'exécute localement dans votre navigateur via la bibliothèque sm-crypto — sans envoi, sans suivi.",
      ],
      [
        "Choisissez le format d'entrée : texte, hexadécimal ou Base64.",
        "Collez les données dont vous voulez le digest SM3.",
        "Cliquez sur Calculer — les digests hex et Base64 apparaissent ci-dessous, chacun avec un bouton de copie.",
      ],
      [
        { q: "Quelle est la différence entre SM3 et SHA-256 ?", a: "Les deux produisent un digest de 256 bits, mais leurs fonctions de compression et constantes diffèrent, donc les digests ne sont pas interchangeables. SM3 est exigé par les standards nationaux chinois (GB/T 32905-2016) ; SHA-256 est le standard international. Utilisez celui qu'exige votre contrepartie." },
        { q: "Puis-je hacher un fichier ici ?", a: "Cette page traite du texte, de l'hexadécimal et du Base64 directement. Pour un fichier, convertissez d'abord son contenu en Base64, ou utilisez l'outil de hachage général pour un calcul de fichier avec la famille SHA." },
      ],
    ),
  },
  de: {
    name: "SM3-Hash-Rechner",
    tagline: "Berechnen Sie SM3-Digests (GB/T 32905-2016) aus Text, Hex oder Base64 — der chinesische nationale Standard-256-Bit-kryptografische Hash. Kostenlos, privat, offline.",
    ...common(
      [
        "SM3 ist die kryptografische Hashfunktion des chinesischen Handelskryptografiestandards (国密), definiert in GB/T 32905-2016. Sie erzeugt einen 256-Bit-Digest — gleiche Länge wie SHA-256 — und ist in chinesischen E-Signatur-, E-Rechnungs- und Behörden-Workflows vorgeschrieben.",
        "Fügen Sie Ihre Daten als UTF-8-Text, rohe hexadezimale Bytes oder Base64 ein. Der Digest wird als Kleinschreibungs-Hex und Base64 zurückgegeben, bereit für Verifizierungsformulare.",
        "Das gesamte Hashing läuft lokal in Ihrem Browser über die sm-crypto-Bibliothek — kein Upload, kein Tracking.",
      ],
      [
        "Wählen Sie das Eingabeformat: Text, Hex oder Base64.",
        "Fügen Sie die Daten ein, deren SM3-Digest Sie benötigen.",
        "Klicken Sie auf Berechnen — die Hex- und Base64-Digests erscheinen unten, jeweils mit Kopierbutton.",
      ],
      [
        { q: "Was ist der Unterschied zwischen SM3 und SHA-256?", a: "Beide erzeugen einen 256-Bit-Digest, verwenden aber unterschiedliche Kompressionsfunktionen und Konstanten, daher sind die Digests nicht austauschbar. SM3 ist durch chinesische nationale Standards (GB/T 32905-2016) vorgeschrieben; SHA-256 ist der internationale Standard. Verwenden Sie das vom Gegenüber geforderte Verfahren." },
        { q: "Kann ich hier eine Datei hashen?", a: "Diese Seite verarbeitet Text, Hex und Base64 direkt. Für Dateien konvertieren Sie den Inhalt zuerst zu Base64 oder nutzen das allgemeine Hash-Tool für Dateiberechnungen mit der SHA-Familie." },
      ],
    ),
  },
  ru: {
    name: "Калькулятор хеша SM3",
    tagline: "Вычисляйте дайджесты SM3 (GB/T 32905-2016) из текста, hex или Base64 — китайский национальный стандарт криптографического хеша 256 бит. Бесплатно, приватно, офлайн.",
    ...common(
      [
        "SM3 — криптографическая хеш-функция китайского стандарта коммерческой криптографии (国密), определённая в GB/T 32905-2016. Она выдаёт 256-битный дайджест — той же длины, что и SHA-256 — и обязательна в китайских процессах электронной подписи, электронных счетов и госсистем.",
        "Вставьте данные как текст UTF-8, «сырые» шестнадцатеричные байты или Base64. Дайджест возвращается в нижнем регистре hex и Base64, готовый для форм проверки.",
        "Всё хеширование выполняется локально в вашем браузере через библиотеку sm-crypto — без загрузок, без отслеживания.",
      ],
      [
        "Выберите формат входа: текст, hex или Base64.",
        "Вставьте данные, для которых нужен дайджест SM3.",
        "Нажмите Вычислить — дайджесты в hex и Base64 появятся ниже, каждый с кнопкой копирования.",
      ],
      [
        { q: "В чём разница между SM3 и SHA-256?", a: "Оба дают 256-битный дайджест, но используют разные функции сжатия и константы, поэтому дайджесты невзаимозаменяемы. SM3 предписан китайскими национальными стандартами (GB/T 32905-2016); SHA-256 — международный стандарт. Используйте тот, который требует проверяющая сторона." },
        { q: "Можно ли хешировать файл здесь?", a: "Эта страница работает с текстом, hex и Base64 напрямую. Для файлов сначала преобразуйте содержимое в Base64 или используйте общий хеш-инструмент для файлового расчёта семейством SHA." },
      ],
    ),
  },
  it: {
    name: "Calcolatore di hash SM3",
    tagline: "Calcola digest SM3 (GB/T 32905-2016) da testo, esadecimale o Base64 — lo standard nazionale cinese di hash crittografico a 256 bit. Gratuito, privato, offline.",
    ...common(
      [
        "SM3 è la funzione hash crittografica dello standard cinese di crittografia commerciale (国密), definita in GB/T 32905-2016. Produce un digest a 256 bit — la stessa lunghezza di SHA-256 — ed è richiesta nei flussi cinesi di firma elettronica, fatturazione e governo.",
        "Incolla i dati come testo UTF-8, byte esadecimali grezzi o Base64. Il digest viene restituito in esadecimale minuscolo e Base64, pronto per i moduli di verifica.",
        "Tutto l'hashing gira localmente nel tuo browser tramite la libreria sm-crypto — senza invii, senza tracciamento.",
      ],
      [
        "Scegli il formato di input: testo, esadecimale o Base64.",
        "Incolla i dati di cui ti serve il digest SM3.",
        "Clicca Calcola — i digest hex e Base64 appaiono sotto, ognuno con pulsante di copia.",
      ],
      [
        { q: "Qual è la differenza tra SM3 e SHA-256?", a: "Entrambi producono un digest a 256 bit, ma usano funzioni di compressione e costanti diverse, quindi i digest non sono intercambiabili. SM3 è richiesto dagli standard nazionali cinesi (GB/T 32905-2016); SHA-256 è lo standard internazionale. Usa quello richiesto dalla controparte di verifica." },
        { q: "Posso calcolare l'hash di un file qui?", a: "Questa pagina elabora testo, esadecimale e Base64 direttamente. Per i file, converti prima il contenuto in Base64, oppure usa lo strumento hash generale per il calcolo su file con la famiglia SHA." },
      ],
    ),
  },
  tr: {
    name: "SM3 hash hesaplayıcı",
    tagline: "Metin, hex veya Base64 girişinden SM3 (GB/T 32905-2016) özetleri hesaplayın — Çin ulusal standardı 256 bit kriptografik hash. Ücretsiz, özel, çevrimdışı.",
    ...common(
      [
        "SM3, Çin ticari kriptografi standardının (国密) kriptografik hash fonksiyonudur; GB/T 32905-2016'da tanımlanır. SHA-256 ile aynı uzunlukta olan 256 bitlik bir özet üretir ve Çin e-imza, e-fatura ve devlet iş akışlarında zorunludur.",
        "Verilerinizi UTF-8 metin, ham onaltılık bayt veya Base64 olarak yapıştırın. Özet, küçük harf hex ve Base64 olarak döner; doğrulama formlarına yapıştırmaya hazırdır.",
        "Tüm hash hesaplama, tarayıcınızda sm-crypto kütüphanesiyle yerel olarak çalışır — yükleme yok, izleme yok.",
      ],
      [
        "Giriş biçimini seçin: metin, hex veya Base64.",
        "SM3 özetine ihtiyaç duyduğunuz verileri yapıştırın.",
        "Hesapla'ya tıklayın — hex ve Base64 özetleri aşağıda görünür, her birinde kopyalama düğmesi vardır.",
      ],
      [
        { q: "SM3 ile SHA-256 arasındaki fark nedir?", a: "İkisi de 256 bitlik özet üretir, ancak farklı sıkıştırma fonksiyonları ve sabitler kullanır; bu yüzden özetler değiştirilemez. SM3, Çin ulusal standartları (GB/T 32905-2016) tarafından zorunlu kılınmıştır; SHA-256 uluslararası standarttır. Doğrulama karşı tarafın istediğini kullanın." },
        { q: "Burada dosya hash'leyebilir miyim?", a: "Bu sayfa metin, hex ve Base64 girişlerini doğrudan işler. Dosyalar için içeriği önce Base64'e çevirin veya SHA ailesiyle dosya hesaplaması için genel hash aracını kullanın." },
      ],
    ),
  },
  ko: {
    name: "SM3 해시 계산기",
    tagline: "텍스트·16진수·Base64 입력으로 SM3(GB/T 32905-2016) 다이제스트를 계산합니다 — 중국 국가표준 256비트 암호 해시. 무료 · 프라이빗 · 오프라인 작동, 데이터 전송 없음.",
    ...common(
      [
        "SM3는 중국 상용 암호 표준(国密)의 암호 해시 함수로, GB/T 32905-2016에 정의되어 있습니다. SHA-256과 같은 256비트 다이제스트를 생성하며, 중국 전자서명·전자송장·정부 업무에서 필수입니다.",
        "UTF-8 텍스트, 원시 16진 바이트, Base64 중 하나로 데이터를 붙여넣으세요. 다이제스트는 소문자 16진과 Base64로 반환되어 검증 양식에 바로 붙여넣을 수 있습니다.",
        "모든 해시 계산은 브라우저의 sm-crypto 라이브러리로 수행됩니다 — 업로드도 추적도 없습니다.",
      ],
      [
        "입력 형식(텍스트, 16진, Base64)을 선택하세요.",
        "SM3 다이제스트가 필요한 데이터를 붙여넣으세요.",
        "계산 버튼을 클릭하세요 — 16진과 Base64 다이제스트가 아래에 표시되고 각각 복사 버튼이 있습니다.",
      ],
      [
        { q: "SM3와 SHA-256의 차이점은?", a: "둘 다 256비트 다이제스트를 생성하지만 압축 함수와 상수가 달라 다이제스트가 호환되지 않습니다. SM3는 중국 국가표준(GB/T 32905-2016)이, SHA-256은 국제 표준입니다. 검증 상대의 요구에 맞게 사용하세요." },
        { q: "파일을 해시할 수 있나요?", a: "이 페이지는 텍스트·16진·Base64 입력을 대상으로 합니다. 파일은 내용을 먼저 Base64로 변환해 붙여넣거나, 범용 해시 도구에서 SHA 계열 파일 계산을 이용하세요." },
      ],
    ),
  },
  ar: {
    name: "حاسبة هاش SM3",
    tagline: "احسب ملخصات SM3 (GB/T 32905-2016) من نص أو hex أو Base64 — المعيار الوطني الصيني للهاش التشفيري 256 بت. مجاني وخاص ويعمل دون اتصال.",
    ...common(
      [
        "SM3 هي دالة الهاش التشفيرية في معيار التشفير التجاري الصيني (国密)، المعرّفة في GB/T 32905-2016. تنتج ملخصًا بطول 256 بت — نفس طول SHA-256 — وهي إلزامية في تدفقات التوقيع الإلكتروني والفوترة والحكومية الصينية.",
        "الصق بياناتك كنص UTF-8 أو بايتات سداسية عشرية خام أو Base64. يُعاد الملخص بصيغة hex بأحرف صغيرة وBase64، جاهزًا للصق في نماذج التحقق.",
        "كل عمليات الهاش تعمل محليًا في متصفحك عبر مكتبة sm-crypto — بلا رفع، بلا تتبع.",
      ],
      [
        "اختر تنسيق الإدخال: نص أو hex أو Base64.",
        "الصق البيانات التي تحتاج ملخص SM3 لها.",
        "انقر على احسب — تظهر الملخصات بصيغة hex وBase64 أدناه، لكل منها زر نسخ.",
      ],
      [
        { q: "ما الفرق بين SM3 و SHA-256؟", a: "كلاهما ينتج ملخصًا بطول 256 بت، لكنهما يستخدمان دوال ضغط وثوابت مختلفة، لذا الملخصات غير قابلة للتبديل. SM3 فرضته المعايير الوطنية الصينية (GB/T 32905-2016)؛ وSHA-256 هو المعيار الدولي. استخدم ما يطلبه الطرف المتحقق." },
        { q: "هل يمكنني حساب هاش ملف هنا؟", a: "تعالج هذه الصفحة النص وhex وBase64 مباشرة. للملفات، حوّل المحتوى إلى Base64 أولًا، أو استخدم أداة الهاش العامة للحساب على الملفات بعائلة SHA." },
      ],
    ),
  },
  hi: {
    name: "SM3 हैश कैलकुलेटर",
    tagline: "टेक्स्ट, हेक्स या Base64 इनपुट से SM3 (GB/T 32905-2016) डाइजेस्ट की गणना करें — चीनी राष्ट्रीय मानक 256-बिट क्रिप्टोग्राफिक हैश। मुफ़्त, निजी, ऑफ़लाइन।",
    ...common(
      [
        "SM3 चीनी वाणिज्यिक क्रिप्टोग्राफी मानक (国密) का क्रिप्टोग्राफिक हैश फ़ंक्शन है, जो GB/T 32905-2016 में परिभाषित है। यह 256-बिट डाइजेस्ट देता है — SHA-256 जितनी ही लंबाई — और चीनी ई-हस्ताक्षर, ई-इनवॉइस और सरकारी वर्कफ़्लो में अनिवार्य है।",
        "अपना डेटा UTF-8 टेक्स्ट, रॉ हेक्साडेसिमल बाइट्स या Base64 के रूप में पेस्ट करें। डाइजेस्ट लोअरकेस hex और Base64 में लौटता है, सत्यापन फ़ॉर्म में पेस्ट करने के लिए तैयार।",
        "सारी हैशिंग आपके ब्राउज़र में sm-crypto लाइब्रेरी से स्थानीय रूप से चलती है — कोई अपलोड नहीं, कोई ट्रैकिंग नहीं।",
      ],
      [
        "इनपुट फ़ॉर्मैट चुनें: टेक्स्ट, हेक्स या Base64।",
        "जिस डेटा का SM3 डाइजेस्ट चाहिए उसे पेस्ट करें।",
        "कंप्यूट पर क्लिक करें — hex और Base64 डाइजेस्ट नीचे दिखेंगे, हर एक कॉपी बटन के साथ।",
      ],
      [
        { q: "SM3 और SHA-256 में क्या अंतर है?", a: "दोनों 256-बिट डाइजेस्ट देते हैं, लेकिन कंप्रेशन फ़ंक्शन और कॉन्स्टेंट अलग होने से डाइजेस्ट आपस में बदले नहीं जा सकते। SM3 चीनी राष्ट्रीय मानकों (GB/T 32905-2016) में अनिवार्य है; SHA-256 अंतरराष्ट्रीय मानक है। जो सत्यापन पक्ष मांगे वही उपयोग करें।" },
        { q: "क्या मैं यहाँ फ़ाइल का हैश कर सकता हूँ?", a: "यह पेज टेक्स्ट, हेक्स और Base64 इनपुट सीधे लेता है। फ़ाइलों के लिए पहले सामग्री को Base64 में बदलें, या सामान्य हैश टूल से SHA परिवार की फ़ाइल गणना करें।" },
      ],
    ),
  },
  id: {
    name: "Kalkulator hash SM3",
    tagline: "Hitung digest SM3 (GB/T 32905-2016) dari teks, hex, atau Base64 — standar nasional Tiongkok untuk hash kriptografi 256-bit. Gratis, privat, offline.",
    ...common(
      [
        "SM3 adalah fungsi hash kriptografi dari standar kriptografi komersial Tiongkok (国密), didefinisikan dalam GB/T 32905-2016. Ia menghasilkan digest 256-bit — panjang yang sama dengan SHA-256 — dan diwajibkan dalam alur kerja tanda tangan elektronik, faktur elektronik, dan pemerintahan Tiongkok.",
        "Tempel data Anda sebagai teks UTF-8, byte heksadesimal mentah, atau Base64. Digest dikembalikan dalam hex huruf kecil dan Base64, siap ditempel ke formulir verifikasi.",
        "Semua hashing berjalan lokal di browser Anda melalui pustaka sm-crypto — tanpa unggahan, tanpa pelacakan.",
      ],
      [
        "Pilih format input: teks, hex, atau Base64.",
        "Tempel data yang digest SM3-nya Anda butuhkan.",
        "Klik Hitung — digest hex dan Base64 muncul di bawah, masing-masing dengan tombol salin.",
      ],
      [
        { q: "Apa perbedaan SM3 dan SHA-256?", a: "Keduanya menghasilkan digest 256-bit, tetapi fungsi kompresi dan konstantanya berbeda sehingga digest tidak dapat dipertukarkan. SM3 diwajibkan oleh standar nasional Tiongkok (GB/T 32905-2016); SHA-256 adalah standar internasional. Gunakan yang diminta pihak verifikasi Anda." },
        { q: "Bisakah saya meng-hash file di sini?", a: "Halaman ini memproses teks, hex, dan Base64 secara langsung. Untuk file, konversi dulu isinya ke Base64, atau gunakan alat hash umum untuk perhitungan file dengan keluarga SHA." },
      ],
    ),
  },
  vi: {
    name: "Máy tính hash SM3",
    tagline: "Tính digest SM3 (GB/T 32905-2016) từ văn bản, hex hoặc Base64 — tiêu chuẩn quốc gia Trung Quốc cho hash mật mã 256 bit. Miễn phí, riêng tư, ngoại tuyến.",
    ...common(
      [
        "SM3 là hàm hash mật mã của tiêu chuẩn mật mã thương mại Trung Quốc (国密), được định nghĩa trong GB/T 32905-2016. Nó tạo ra digest 256 bit — cùng độ dài với SHA-256 — và là yêu cầu bắt buộc trong các quy trình chữ ký điện tử, hóa đơn điện tử và chính phủ của Trung Quốc.",
        "Dán dữ liệu của bạn dưới dạng văn bản UTF-8, byte thập lục phân thô hoặc Base64. Digest được trả về dạng hex chữ thường và Base64, sẵn sàng dán vào biểu mẫu xác minh.",
        "Mọi thao tác hash chạy cục bộ trong trình duyệt của bạn thông qua thư viện sm-crypto — không tải lên, không theo dõi.",
      ],
      [
        "Chọn định dạng đầu vào: văn bản, hex hoặc Base64.",
        "Dán dữ liệu cần tính digest SM3.",
        "Nhấp Tính toán — digest hex và Base64 xuất hiện bên dưới, mỗi cái có nút sao chép.",
      ],
      [
        { q: "SM3 khác SHA-256 thế nào?", a: "Cả hai đều tạo digest 256 bit, nhưng dùng hàm nén và hằng số khác nhau nên digest không thể thay thế cho nhau. SM3 được tiêu chuẩn quốc gia Trung Quốc (GB/T 32905-2016) bắt buộc; SHA-256 là tiêu chuẩn quốc tế. Dùng loại mà đối tác xác minh yêu cầu." },
        { q: "Có thể hash file ở đây không?", a: "Trang này xử lý trực tiếp văn bản, hex và Base64. Với file, hãy chuyển nội dung sang Base64 trước, hoặc dùng công cụ hash tổng quát để tính trên file bằng họ SHA." },
      ],
    ),
  },
};
