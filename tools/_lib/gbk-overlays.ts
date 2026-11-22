/**
 * CN-018 gbk-decoder 扩展语言 overlay(10 语)。
 * 模式与 sm3-overlays.ts 相同。
 */

import type { ToolCopy } from "./types";

function common(
  intro: [string, string, string],
  steps: [string, string, string],
  faqs: Array<{ q: string; a: string }>,
) {
  return { intro, steps, faqs };
}

export const GBK_OVERLAYS: Record<string, ToolCopy> = {
  fr: {
    name: "Décodeur GBK / GB18030",
    tagline: "Décodez les octets GBK, GB2312 et GB18030 en texte lisible — collez en hexadécimal ou Base64, ou téléversez un fichier jusqu'à 2 Mo. Répare le mojibake des anciens fichiers chinois. Gratuit, privé, hors ligne.",
    ...common(
      [
        "Les fichiers enregistrés en GBK (page de codes chinoise historique, couvrant GB2312) deviennent illisibles dans un environnement UTF-8. Ce décodeur restaure le texte via le support WHATWG Encoding intégré de votre navigateur — GBK et GB18030 sont natifs dans tous les navigateurs modernes.",
        "Collez des octets en hexadécimal ou Base64, ou téléversez un fichier jusqu'à 2 Mo — exports CSV, dumps de base de données, journaux .txt et fichiers de données anciens se décodent localement. GB18030 couvre en plus les séquences de quatre octets des sinogrammes rares hors gamme GBK.",
        "Les séquences d'octets invalides sont remplacées par � et comptées, pour savoir si le fichier était vraiment en GBK. Aucun téléversement — tout se passe dans cet onglet.",
      ],
      [
        "Choisissez l'encodage : GBK (couvre GB2312) ou GB18030.",
        "Collez des octets en hex ou Base64, ou téléversez un fichier jusqu'à 2 Mo.",
        "Cliquez sur Décoder — le texte lisible apparaît ci-dessous avec bouton de copie et note d'intégrité.",
      ],
      [
        { q: "Pourquoi mon fichier chinois affiche-t-il des caractères illisibles ?", a: "Le fichier a été écrit en octets GBK (ou GB2312) mais lu comme UTF-8. En GBK chaque caractère chinois fait 2 octets ; un lecteur UTF-8 interprète ces paires comme des caractères latins ou symboles aléatoires. Décoder les mêmes octets avec cet outil restaure le texte." },
        { q: "Peut-on aussi encoder du texte vers GBK ici ?", a: "Non — les navigateurs n'embarquent que le décodage des encodages historiques (norme WHATWG Encoding) ; encoder vers GBK exigerait une énorme table de caractères. Cet outil se concentre sur le sens de sauvetage courant : octets → texte lisible." },
      ],
    ),
  },
  de: {
    name: "GBK / GB18030-Dekodierer",
    tagline: "Dekodieren Sie GBK-, GB2312- und GB18030-Bytes in lesbaren Text — Hex oder Base64 einfügen oder Datei bis 2 MB hochladen. Behebt Mojibake aus alten chinesischen Dateien. Kostenlos, privat, offline.",
    ...common(
      [
        "Im GBK-Format gespeicherte Dateien (die legacy-chinesische Codepage, deckt GB2312 ab) werden in einer UTF-8-Umgebung zu Mojibake. Dieser Dekodierer stellt den Text über die eingebaute WHATWG-Encoding-Unterstützung Ihres Browsers wieder her — GBK und GB18030 sind in jedem modernen Browser nativ vorhanden.",
        "Bytes als Hexadezimal oder Base64 einfügen oder eine Datei bis 2 MB hochladen — CSV-Exporte, Datenbank-Dumps, .txt-Protokolle und Altdaten werden lokal dekodiert. GB18030 deckt zusätzlich Vier-Byte-Sequenzen seltener CJK-Zeichen außerhalb des GBK-Bereichs ab.",
        "Ungültige oder beschädigte Byte-Sequenzen werden durch � ersetzt und gezählt, damit Sie erkennen können, ob die Datei wirklich GBK war. Nichts wird hochgeladen — alles passiert in diesem Tab.",
      ],
      [
        "Wählen Sie die Kodierung: GBK (deckt GB2312 ab) oder GB18030.",
        "Bytes als Hex oder Base64 einfügen oder Datei bis 2 MB hochladen.",
        "Klicken Sie auf Dekodieren — der lesbare Text erscheint unten mit Kopierbutton und Integritätshinweis.",
      ],
      [
        { q: "Warum zeigt meine chinesische Datei Zeichensalat?", a: "Die Datei wurde als GBK-Bytes (oder GB2312) geschrieben, aber als UTF-8 gelesen. In GBK belegt jedes chinesische Zeichen 2 Bytes; ein UTF-8-Leser interpretiert diese Paare als zufällige lateinische Zeichen oder Symbole. Dekodieren Sie dieselben Bytes mit diesem Tool, erscheint der Originaltext." },
        { q: "Kann ich hier auch Text zu GBK kodieren?", a: "Nein — Browser bieten eingebaut nur die Dekodier-Richtung für Legacy-Kodierungen (WHATWG-Encoding-Standard); das Kodieren zurück zu GBK bräuchte eine riesige Zeichentabelle. Dieses Tool konzentriert sich auf die übliche Rettungsrichtung: Bytes → lesbarer Text." },
      ],
    ),
  },
  ru: {
    name: "Декодер GBK / GB18030",
    tagline: "Декодируйте байты GBK, GB2312 и GB18030 в читаемый текст — вставьте hex или Base64 либо загрузите файл до 2 МБ. Исправляет кракозябры старых китайских файлов. Бесплатно, приватно, офлайн.",
    ...common(
      [
        "Файлы, сохранённые в GBK (устаревшая китайская кодовая страница, включает GB2312), превращаются в кракозябры в UTF-8-среде. Этот декодер восстанавливает текст через встроенную поддержку WHATWG Encoding вашего браузера — GBK и GB18030 реализованы нативно во всех современных браузерах.",
        "Вставьте байты в hex или Base64 либо загрузите файл до 2 МБ — выгрузки CSV, дампы БД, логи .txt и старые файлы данных декодируются локально. GB18030 дополнительно покрывает четырёхбайтовые последовательности редких иероглифов вне диапазона GBK.",
        "Недопустимые или повреждённые последовательности байтов заменяются на � и подсчитываются, чтобы понять, был ли файл действительно в GBK. Ничего не загружается — всё происходит в этой вкладке.",
      ],
      [
        "Выберите кодировку: GBK (включает GB2312) или GB18030.",
        "Вставьте байты в hex или Base64 либо загрузите файл до 2 МБ.",
        "Нажмите Декодировать — читаемый текст появится ниже с кнопкой копирования и пометкой о целостности.",
      ],
      [
        { q: "Почему мой китайский файл показывает нечитаемые символы?", a: "Файл был записан в байтах GBK (или GB2312), но читается как UTF-8. В GBK каждый иероглиф занимает 2 байта; UTF-8-читалка трактует эти пары как случайные латинские символы. Декодирование тех же байтов этим инструментом восстанавливает текст." },
        { q: "Можно ли здесь закодировать текст в GBK?", a: "Нет — браузеры встраивают только декодирование устаревших кодировок (стандарт WHATWG Encoding); кодирование обратно в GBK потребовало бы огромной таблицы символов. Инструмент фокусируется на обычном направлении спасения: байты → читаемый текст." },
      ],
    ),
  },
  it: {
    name: "Decodificatore GBK / GB18030",
    tagline: "Decodifica byte GBK, GB2312 e GB18030 in testo leggibile — incolla in hex o Base64, o carica un file fino a 2 MB. Corregge il mojibake dei vecchi file cinesi. Gratuito, privato, offline.",
    ...common(
      [
        "I file salvati in GBK (la codepage cinese storica, che copre GB2312) diventano mojibake in un ambiente UTF-8. Questo decodificatore ripristina il testo usando il supporto WHATWG Encoding integrato del tuo browser — GBK e GB18030 sono nativi in tutti i browser moderni.",
        "Incolla byte in esadecimale o Base64, o carica un file fino a 2 MB — esportazioni CSV, dump di database, log .txt e file di dati storici si decodificano localmente. GB18030 copre inoltre sequenze a quattro byte per ideogrammi CJK rari fuori dall'intervallo GBK.",
        "Le sequenze di byte non valide vengono sostituite con � e contate, per capire se il file era davvero in GBK. Nessun invio — tutto avviene in questa scheda.",
      ],
      [
        "Scegli la codifica: GBK (copre GB2312) o GB18030.",
        "Incolla byte in hex o Base64, o carica un file fino a 2 MB.",
        "Clicca Decodifica — il testo leggibile appare sotto con pulsante di copia e nota di integrità.",
      ],
      [
        { q: "Perché il mio file cinese mostra caratteri illeggibili?", a: "Il file è stato scritto in byte GBK (o GB2312) ma viene letto come UTF-8. In GBK ogni carattere cinese occupa 2 byte; un lettore UTF-8 interpreta quelle coppie come caratteri latini o simboli casuali. Decodificare gli stessi byte con questo strumento ripristina il testo." },
        { q: "Posso anche codificare testo in GBK qui?", a: "No — i browser incorporano solo la decodifica delle codifiche storiche (standard WHATWG Encoding); codificare verso GBK richiederebbe un' enorme tabella di caratteri. Questo strumento si concentra sulla comune direzione di recupero: byte → testo leggibile." },
      ],
    ),
  },
  tr: {
    name: "GBK / GB18030 kod çözücü",
    tagline: "GBK, GB2312 ve GB18030 baytlarını okunabilir metne çözün — hex veya Base64 yapıştırın ya da 2 MB'a kadar dosya yükleyin. Eski Çince dosyaların bozuk karakterlerini onarır. Ücretsiz, özel, çevrimdışı.",
    ...common(
      [
        "GBK ile kaydedilen dosyalar (eski Çince kod sayfası, GB2312'yi kapsar) UTF-8 ortamında bozuk karakterlere dönüşür. Bu çözücü, tarayıcınızın yerleşik WHATWG Encoding desteğiyle ham baytları okunabilir metne döndürür — GBK ve GB18030 her modern tarayıcıda yerleşiktir.",
        "Baytları onaltılık veya Base64 olarak yapıştırın ya da 2 MB'a kadar dosya yükleyin — CSV dışa aktarımları, veritabanı dökümleri, .txt kayıtları ve eski veri dosyaları yerel olarak çözülür. GB18030, GBK aralığı dışındaki nadir CJK karakterlerinin dört baytlık dizilerini de kapsar.",
        "Geçersiz bayt dizileri � ile değiştirilir ve sayılır; böylece dosyanın gerçekten GBK olup olmadığını anlarsınız. Hiçbir şey yüklenmez — her şey bu sekmede olur.",
      ],
      [
        "Kodlamayı seçin: GBK (GB2312'yi kapsar) veya GB18030.",
        "Baytları hex veya Base64 olarak yapıştırın ya da 2 MB'a kadar dosya yükleyin.",
        "Çöz'e tıklayın — okunabilir metin aşağıda görünür; kopyalama düğmesi ve bütünlük notu eklenir.",
      ],
      [
        { q: "Çince dosyam neden bozuk karakter gösteriyor?", a: "Dosya GBK (veya GB2312) baytlarıyla yazıldı ama UTF-8 olarak okunuyor. GBK'de her Çince karakter 2 bayttır; UTF-8 okuyucu bu çiftleri rastgele latin karakterler olarak yorumlar. Aynı baytları bu araçla çözmek orijinal metni geri getirir." },
        { q: "Metni GBK'ye kodlayabilir miyim?", a: "Hayır — tarayıcılar yalnızca eski kodlamaların çözüm yönünü yerleşik olarak sağlar (WHATWG Encoding standardı); GBK'ye kodlama devasa bir karakter tablosu gerektirir. Bu araç yaygın kurtarma yönüne odaklanır: bayt → okunabilir metin." },
      ],
    ),
  },
  ko: {
    name: "GBK / GB18030 디코더",
    tagline: "GBK·GB2312·GB18030 바이트를 읽을 수 있는 텍스트로 디코딩합니다 — hex·Base64 붙여넣기 또는 최대 2 MB 파일 업로드. 레거시 중국어 파일의 글자 깨짐 복구. 무료 · 프라이빗 · 오프라인 작동.",
    ...common(
      [
        "GBK로 저장된 파일(레거시 중국어 코드 페이지, GB2312 포함)은 UTF-8 환경에서 열면 글자가 깨집니다. 이 디코더는 브라우저 내장 WHATWG Encoding 지원으로 원시 바이트를 읽을 수 있는 텍스트로 되돌립니다 — GBK와 GB18030은 모든 최신 브라우저에 네이티브로 구현되어 있습니다.",
        "hex 또는 Base64로 바이트를 붙여넣거나 최대 2 MB 파일을 업로드하세요 — CSV 내보내기, 데이터베이스 덤프, .txt 로그, 레거시 데이터 파일을 모두 로컬에서 디코딩합니다. GB18030은 GBK 범위 밖의 희귀 한자 4바이트 시퀀스도 추가로 지원합니다.",
        "손상된 바이트 시퀀스는 �로 대체되어 개수가 표시되므로 파일이 실제로 GBK인지 판단할 수 있습니다. 업로드는 전혀 없으며 디코딩은 이 탭 안에서만 이루어집니다.",
      ],
      [
        "인코딩을 선택하세요: GBK(GB2312 포함) 또는 GB18030.",
        "hex 또는 Base64로 바이트를 붙여넣거나 최대 2 MB 파일을 업로드하세요.",
        "디코딩 버튼을 클릭하세요 — 읽을 수 있는 텍스트가 아래에 표시되고 복사 버튼과 무결성 메모가 함께 나타납니다.",
      ],
      [
        { q: "중국어 파일이 글자 깨짐으로 보이는 이유는?", a: "파일은 GBK(또는 GB2312) 바이트로 작성되었는데 UTF-8로 읽히고 있습니다. GBK에서 각 한자는 2바이트이며, UTF-8 리더는 이 쌍을 무작위 라틴 문자나 기호로 해석합니다. 같은 바이트를 이 도구로 디코딩하면 원문이 복원됩니다." },
        { q: "텍스트를 GBK로 인코딩도 할 수 있나요?", a: "아니요 — 브라우저는 WHATWG Encoding 표준에 따라 레거시 인코딩의 디코딩 방향만 내장합니다. GBK로의 인코딩은 방대한 문자 테이블이 필요합니다. 이 도구는 가장 흔한 복구 방향(바이트 → 읽을 수 있는 텍스트)에 집중합니다." },
      ],
    ),
  },
  ar: {
    name: "فك ترميز GBK / GB18030",
    tagline: "فك ترميز بايتات GBK وGB2312 وGB18030 إلى نص مقروء — الصق بصيغة hex أو Base64، أو ارفع ملفًا حتى 2 ميجابايت. يصلح الرموز المشوهة للملفات الصينية القديمة. مجاني وخاص ويعمل دون اتصال.",
    ...common(
      [
        "الملفات المحفوظة بترميز GBK (صفحة الترميز الصينية القديمة، وتشمل GB2312) تتحول إلى رموز مشوهة عند فتحها في بيئة UTF-8. يقوم هذا الرمّاز باستعادة النص عبر دعم WHATWG Encoding المدمج في متصفحك — GBK وGB18030 مدمجان في كل المتصفحات الحديثة.",
        "الصق البايتات بصيغة hex أو Base64، أو ارفع ملفًا حتى 2 ميجابايت — تصديرات CSV ومقاطع قواعد البيانات وسجلات .txt وملفات البيانات القديمة تُفك محليًا. يغطي GB18030 أيضًا تسلسلات الأربعة بايتات للأحرف الصينية النادرة خارج نطاق GBK.",
        "التسلسلات البايتية غير الصالحة تُستبدل بـ � وتُحتسب، لتعرف ما إذا كان الملف GBK فعلًا. لا شيء يُرفع — الفك كله يحدث في هذه التبويبة.",
      ],
      [
        "اختر الترميز: GBK (يشمل GB2312) أو GB18030.",
        "الصق البايتات بصيغة hex أو Base64، أو ارفع ملفًا حتى 2 ميجابايت.",
        "انقر على فك الترميز — يظهر النص المقروء أدناه مع زر نسخ وملاحظة سلامة البيانات.",
      ],
      [
        { q: "لماذا يُظهر ملفي الصيني رموزًا مشوهة؟", a: "كُتب الملف ببايتات GBK (أو GB2312) لكنه يُقرأ كـ UTF-8. في GBK كل حرف صيني يشغل بايتين؛ ويُفسّر قارئ UTF-8 هذا الزوج كأحرف لاتينية أو رموز عشوائية. فك ترميز البايتات نفسها بهذه الأداة يستعيد النص الأصلي." },
        { q: "هل يمكن أيضًا ترميز النص إلى GBK هنا؟", a: "لا — المتصفحات تدمج فقط اتجاه فك الترميز للترميزات القديمة (معيار WHATWG Encoding)؛ الترميز العكسي إلى GBK يتطلب جدول أحرف ضخمًا. تركّز هذه الأداة على اتجاه الإنقاذ الشائع: بايتات → نص مقروء." },
      ],
    ),
  },
  hi: {
    name: "GBK / GB18030 डिकोडर",
    tagline: "GBK, GB2312 और GB18030 बाइट्स को पठनीय टेक्स्ट में डिकोड करें — hex या Base64 पेस्ट करें, या 2 MB तक की फ़ाइल अपलोड करें। पुरानी चीनी फ़ाइलों का मोजीबेक ठीक करता है। मुफ़्त, निजी, ऑफ़लाइन।",
    ...common(
      [
        "GBK एनकोडिंग में सहेजी गई फ़ाइलें (लेगेसी चीनी कोड पेज, GB2312 सहित) UTF-8 वातावरण में खोलने पर मोजीबेक बन जाती हैं। यह डिकोडर आपके ब्राउज़र के अंतर्निहित WHATWG Encoding सपोर्ट से रॉ बाइट्स को पठनीय टेक्स्ट में लौटाता है — GBK और GB18030 हर आधुनिक ब्राउज़र में नेटिव हैं।",
        "बाइट्स hex या Base64 के रूप में पेस्ट करें, या 2 MB तक की फ़ाइल अपलोड करें — CSV निर्यात, डेटाबेस डंप, .txt लॉग और पुरानी डेटा फ़ाइलें सब लोकल डिकोड होती हैं। GB18030 GBK रेंज से बाहर के दुर्लभ CJK आइडियोग्राफ़ के चार-बाइट अनुक्रम भी कवर करता है।",
        "अमान्य या क्षतिग्रस्त बाइट अनुक्रम � से बदले जाते हैं और गिने जाते हैं, जिससे पता चलता है कि फ़ाइल वाकई GBK थी या नहीं। कुछ भी अपलोड नहीं होता — डिकोडिंग पूरी तरह इसी टैब में होती है।",
      ],
      [
        "एनकोडिंग चुनें: GBK (GB2312 सहित) या GB18030।",
        "बाइट्स hex या Base64 के रूप में पेस्ट करें, या 2 MB तक की फ़ाइल अपलोड करें।",
        "डिकोड पर क्लिक करें — पठनीय टेक्स्ट नीचे दिखेगा, कॉपी बटन और अखंडता नोट के साथ।",
      ],
      [
        { q: "मेरी चीनी फ़ाइल बिगड़े अक्षर क्यों दिखाती है?", a: "फ़ाइल GBK (या GB2312) बाइट्स में लिखी गई थी पर UTF-8 के रूप में पढ़ी जा रही है। GBK में हर चीनी अक्षर 2 बाइट है; UTF-8 रीडर उन जोड़ों को यादृच्छिक लैटिन वर्ण समझता है। वही बाइट्स इस टूल से डिकोड करने पर मूल टेक्स्ट लौटता है।" },
        { q: "क्या यहाँ टेक्स्ट को GBK में एनकोड भी कर सकते हैं?", a: "नहीं — ब्राउज़र WHATWG Encoding मानक के अनुसार केवल लेगेसी एनकोडिंग का डिकोड दिशा अंतर्निहित रखते हैं; GBK में एनकोड के लिए विशाल कैरेक्टर टेबल चाहिए। यह टूल सामान्य रेस्क्यू दिशा पर केंद्रित है: बाइट्स → पठनीय टेक्स्ट।" },
      ],
    ),
  },
  id: {
    name: "Dekoder GBK / GB18030",
    tagline: "Dekode byte GBK, GB2312, dan GB18030 menjadi teks yang dapat dibaca — tempel hex atau Base64, atau unggah file hingga 2 MB. Memperbaiki mojibake dari file Tionghoa lama. Gratis, privat, offline.",
    ...common(
      [
        "File yang disimpan dengan encoding GBK (code page Tionghoa lama, mencakup GB2312) berubah menjadi mojibake saat dibuka di lingkungan UTF-8. Dekoder ini mengembalikan byte mentah menjadi teks yang dapat dibaca menggunakan dukungan WHATWG Encoding bawaan peramban Anda — GBK dan GB18030 diimplementasikan secara native di semua peramban modern.",
        "Tempel byte sebagai heksadesimal atau Base64, atau unggah file hingga 2 MB — ekspor CSV, dump basis data, log .txt, dan file data lama semuanya didekode secara lokal. GB18030 juga mencakup urutan empat byte untuk ideograf CJK langka di luar rentang GBK.",
        "Urutan byte yang tidak valid atau rusak diganti dengan karakter � dan dihitung, sehingga Anda dapat menentukan apakah file benar-benar GBK. Tidak ada yang diunggah — dekode sepenuhnya terjadi di tab ini.",
      ],
      [
        "Pilih encoding: GBK (mencakup GB2312) atau GB18030.",
        "Tempel byte sebagai hex atau Base64, atau unggah file hingga 2 MB.",
        "Klik Dekode — teks yang dapat dibaca muncul di bawah dengan tombol salin dan catatan integritas.",
      ],
      [
        { q: "Mengapa file Tionghoa saya menampilkan karakter kacau?", a: "File ditulis dalam byte GBK (atau GB2312) tetapi dibaca sebagai UTF-8. Dalam GBK setiap karakter Tionghoa menempati 2 byte; pembaca UTF-8 menafsirkan pasangan itu sebagai karakter latin atau simbol acak. Mendekode byte yang sama dengan alat ini mengembalikan teks asli." },
        { q: "Apakah saya juga bisa mengodekan teks ke GBK di sini?", a: "Tidak — peramban hanya membawa dekode bawaan untuk encoding lama (sesuai standar WHATWG Encoding); mengodekan kembali ke GBK membutuhkan tabel karakter yang sangat besar. Alat ini fokus pada arah penyelamatan yang umum: byte → teks yang dapat dibaca." },
      ],
    ),
  },
  vi: {
    name: "Bộ giải mã GBK / GB18030",
    tagline: "Giải mã byte GBK, GB2312 và GB18030 thành văn bản đọc được — dán hex hoặc Base64, hoặc tải file lên tối đa 2 MB. Khắc phục mojibake của file Trung Quốc cũ. Miễn phí, riêng tư, ngoại tuyến.",
    ...common(
      [
        "File được lưu với mã hóa GBK (bảng mã Trung Quốc cũ, bao gồm GB2312) sẽ thành mojibake khi mở trong môi trường UTF-8. Bộ giải mã này chuyển byte thô trở lại thành văn bản đọc được bằng hỗ trợ WHATWG Encoding tích hợp sẵn của trình duyệt — GBK và GB18030 được triển khai native trong mọi trình duyệt hiện đại.",
        "Dán byte dưới dạng hex hoặc Base64, hoặc tải file lên tối đa 2 MB — xuất CSV, dump cơ sở dữ liệu, log .txt và file dữ liệu cũ đều được giải mã cục bộ. GB18030 còn bao gồm chuỗi bốn byte cho chữ Hán hiếm ngoài phạm vi GBK.",
        "Chuỗi byte không hợp lệ hoặc hỏng được thay bằng ký tự � và được đếm, để bạn biết file có thực sự là GBK hay không. Không tải lên gì — giải mã hoàn toàn diễn ra trong tab này.",
      ],
      [
        "Chọn mã hóa: GBK (bao gồm GB2312) hoặc GB18030.",
        "Dán byte dưới dạng hex hoặc Base64, hoặc tải file lên tối đa 2 MB.",
        "Nhấp Giải mã — văn bản đọc được xuất hiện bên dưới với nút sao chép và ghi chú tính toàn vẹn.",
      ],
      [
        { q: "Tại sao file tiếng Trung của tôi hiển thị ký tự lỗi?", a: "File được ghi bằng byte GBK (hoặc GB2312) nhưng đang bị đọc như UTF-8. Trong GBK mỗi chữ Hán chiếm 2 byte; trình đọc UTF-8 diễn giải cặp byte đó thành ký tự Latin hoặc ký hiệu ngẫu nhiên. Giải mã cùng byte đó bằng công cụ này sẽ khôi phục văn bản gốc." },
        { q: "Có thể mã hóa văn bản sang GBK ở đây không?", a: "Không — trình duyệt chỉ tích hợp hướng giải mã cho các mã hóa cũ (theo tiêu chuẩn WHATWG Encoding); mã hóa ngược sang GBK cần bảng ký tự khổng lồ. Công cụ này tập trung vào hướng cứu phổ biến: byte → văn bản đọc được." },
      ],
    ),
  },
};
