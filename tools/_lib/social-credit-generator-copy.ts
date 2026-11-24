import { LOCALES, type Locale } from "@/lib/site";
import { CHINESE_ID_MESSAGES } from "./chinese-id-copy";
import { SOCIAL_CREDIT_MESSAGES } from "./social-credit-copy";
import type { SocialCreditGeneratorError, SocialCreditGeneratorField } from "./social-credit-generator";
import type { ToolCopy } from "./types";
import { socialCreditDeepDive } from "./deepdive-cn";

type Copy = [
  name: string, tagline: string, scope: string, inputPolicy: string, startBody: string,
  fieldsStep: string, generateStep: string, exportStep: string, scopeQuestion: string, privacyQuestion: string,
];

const copy: Record<Locale, Copy> = {
  en: [
    "Unified Social Credit Code Generator",
    "Generate up to 100 Chinese Unified Social Credit Code test samples locally with both check characters, default masking and TXT export.",
    "For software testing. Each sample has the inner GB 11714 check character and outer GB 32100 check character. The tool does not check department, category or address code tables, or look up registrations. Samples can coincide with assigned codes and are distinct only within a batch.",
    "The same inputs give the same batch. Bodies advance in the 31-character order below without wrapping. The tool rejects all PDY prefixes to exclude the PDY00001–PDY99999 custom range. Each raw field allows 64 UTF-16 code units. Full-width ASCII, lowercase ASCII and outer whitespace are normalized.",
    "Starting organization body (8 characters)",
    "Enter the department, organization category, six-digit address code and eight-character starting body.",
    "Choose 1–100 samples, then generate the batch. The tool computes both check characters.",
    "Reveal the full samples if needed. Copy or download only the displayed values.",
    "Do the samples prove registration?",
    "Do my inputs or samples leave this browser?",
  ],
  zh: [
    "统一社会信用代码生成器",
    "在浏览器本地按顺序生成最多 100 个统一社会信用代码测试样本，计算 GB 11714 内层校验字符和 GB 32100 外层校验字符。结果默认遮盖，可按需显示完整代码，并复制或下载当前显示的 TXT。",
    "仅供软件测试。每条计算 GB 11714 内层和 GB 32100 外层校验字符。不核验部门、类别或行政区划代码表，不查询登记记录。样本可能与已分配代码重合，仅在同一批次内互异。",
    "相同输入得到同一批结果。本体按下方 31 字符顺序递增，到末尾不回绕。为避开 PDY00001–PDY99999 自定义区，本工具拒绝所有 PDY 开头的本体。规范化全角 ASCII 和小写 ASCII，并去除首尾空白。每个原始字段最多 64 个 UTF-16 代码单元。",
    "起始组织机构本体码（8 位）",
    "填写登记管理部门、机构类别、六位地址码和八位起始组织机构本体码。",
    "填写 1–100 的样本数量并生成。工具会计算两层校验字符。",
    "按需显示完整样本，复制或下载当前显示的值。",
    "生成的样本能证明主体已经登记吗？",
    "输入或样本会离开这个浏览器吗？",
  ],
  ja: [
    "統一社会信用コード生成ツール",
    "中国の統一社会信用コードのテストサンプルを、ブラウザ内で最大 100 件生成します。GB 11714 と GB 32100 の両方の検査文字を計算し、初期状態では結果を隠します。必要に応じて完全なコードを表示し、表示中の値を TXT でコピーまたは保存できます。",
    "ソフトウェアのテスト専用です。GB 11714 の内側と GB 32100 の外側の検査文字を計算します。登録部門、組織区分、住所のコード表や登録記録は照合しません。実際に割り当てられたコードと一致する場合があり、重複しないのはバッチ内だけです。",
    "同じ入力から同じ結果を生成します。本体は下記の 31 文字順で進み、末尾で先頭に戻りません。内部用の PDY00001〜PDY99999 を避けるため、PDY で始まるすべての本体を拒否します。全角 ASCII と小文字 ASCII を変換し、前後の空白を除きます。各元入力は 64 UTF-16 コード単位までです。",
    "開始組織本体コード（8 文字）",
    "登録部門、組織区分、6 桁の住所コードと 8 文字の開始本体を指定します。",
    "1〜100 件を指定して生成すると、両方の検査文字が計算されます。",
    "必要に応じて完全なコードを表示し、現在の値をコピーまたは保存します。",
    "生成したサンプルは登録済みであることを証明しますか？",
    "入力や結果がブラウザの外に送られますか？",
  ],
  es: [
    "Generador de códigos de crédito social unificado",
    "Genera localmente hasta 100 muestras chinas de crédito social unificado, con dos caracteres de control, resultados ocultos y exportación TXT.",
    "Solo para pruebas de software. Se calculan el control interno GB 11714 y el externo GB 32100. No se consultan las tablas de organismo, categoría o dirección ni el registro. Las muestras pueden coincidir con códigos asignados y solo son distintas dentro del lote.",
    "La misma entrada da el mismo lote. El cuerpo avanza en el orden de 31 caracteres que aparece abajo, sin reiniciarse. Se rechaza todo prefijo PDY para excluir el rango interno PDY00001–PDY99999. Se normalizan ASCII de ancho completo, minúsculas ASCII y espacios en los extremos. Cada campo original admite 64 unidades UTF-16.",
    "Cuerpo inicial de la organización (8 caracteres)",
    "Introduce el organismo, la categoría, el código de dirección de seis dígitos y el cuerpo inicial de ocho caracteres.",
    "Elige de 1 a 100 muestras y genera el lote para calcular ambos caracteres de control.",
    "Revela las muestras completas si hace falta y copia o descarga los valores visibles.",
    "¿Las muestras acreditan un registro?",
    "¿Salen del navegador mis datos o muestras?",
  ],
  pt: [
    "Gerador de códigos de crédito social unificado",
    "Gere localmente até 100 amostras chinesas de crédito social unificado com dois caracteres verificadores, resultados ocultos e exportação TXT.",
    "Somente para testes de software. São calculados o dígito interno GB 11714 e o externo GB 32100. As tabelas de departamento, categoria e endereço e os registros não são consultados. As amostras podem coincidir com códigos atribuídos e são distintas apenas dentro do lote.",
    "Entradas iguais geram o mesmo lote. O corpo segue a ordem de 31 caracteres abaixo, sem retornar ao início. Todo prefixo PDY é rejeitado para excluir a faixa interna PDY00001–PDY99999. ASCII de largura completa, minúsculas ASCII e espaços nas extremidades são normalizados. Cada campo original aceita 64 unidades UTF-16.",
    "Corpo inicial da organização (8 caracteres)",
    "Informe o departamento, a categoria, o código de endereço de seis dígitos e o corpo inicial de oito caracteres.",
    "Escolha de 1 a 100 amostras e gere o lote para calcular os verificadores.",
    "Revele as amostras completas se necessário e copie ou baixe os valores exibidos.",
    "As amostras comprovam o registro?",
    "Minhas entradas ou amostras saem do navegador?",
  ],
  fr: [
    "Générateur de codes de crédit social unifié",
    "Générez localement jusqu’à 100 codes chinois de crédit social unifié pour vos tests, avec deux caractères de contrôle, masquage et export TXT.",
    "Pour les tests logiciels. Le caractère interne GB 11714 et le caractère externe GB 32100 sont calculés. Les tables de services, de catégories et d’adresses ainsi que les registres ne sont pas consultés. Une valeur peut correspondre à un code attribué. Les codes sont distincts au sein d’un même lot.",
    "Les mêmes entrées produisent le même lot. Le corps avance dans l’ordre des 31 caractères ci-dessous, sans retour au début. Tout préfixe PDY est refusé pour écarter la plage interne PDY00001–PDY99999. L’ASCII pleine chasse et les minuscules ASCII sont convertis, et les espaces aux extrémités supprimés. Chaque champ brut accepte 64 unités UTF-16.",
    "Corps initial de l’organisme (8 caractères)",
    "Saisissez le service, la catégorie, le code d’adresse à six chiffres et le corps initial à huit caractères.",
    "Choisissez de 1 à 100 échantillons et générez le lot pour calculer les contrôles.",
    "Affichez les codes complets au besoin, puis copiez ou téléchargez les valeurs affichées.",
    "Ces échantillons prouvent-ils une inscription ?",
    "Les entrées ou résultats quittent-ils le navigateur ?",
  ],
  de: [
    "Generator für einheitliche Sozialkreditcodes",
    "Erstellen Sie lokal bis zu 100 chinesische Sozialkreditcodes für Softwaretests, mit zwei Prüfzeichen, verdeckten Ergebnissen und TXT-Export.",
    "Für Softwaretests. Das innere Prüfzeichen nach GB 11714 und das äußere nach GB 32100 werden berechnet. Behörden-, Kategorie- und Adresscodetabellen sowie Register werden nicht abgefragt. Treffer mit vergebenen Codes sind möglich. Die Codes unterscheiden sich nur innerhalb eines Stapels.",
    "Gleiche Eingaben erzeugen denselben Stapel. Der Rumpf folgt der unten gezeigten Reihenfolge aus 31 Zeichen und beginnt am Ende nicht erneut. Alle PDY-Präfixe sind ausgeschlossen, damit der interne Bereich PDY00001–PDY99999 frei bleibt. Vollbreiten-ASCII und ASCII-Kleinbuchstaben werden umgewandelt, Leerraum am Rand wird entfernt. Jedes Rohfeld erlaubt 64 UTF-16-Codeeinheiten.",
    "Erster Organisationsrumpf (8 Zeichen)",
    "Geben Sie Stelle, Organisationsart, sechsstelligen Adresscode und achtstelligen Startrumpf ein.",
    "Wählen Sie 1 bis 100 Muster und erzeugen Sie den Stapel mit beiden Prüfzeichen.",
    "Zeigen Sie bei Bedarf die vollständigen Codes an und exportieren Sie die sichtbaren Werte.",
    "Belegen die Muster eine Registrierung?",
    "Verlassen Eingaben oder Muster meinen Browser?",
  ],
  ru: [
    "Генератор единого кода социального кредита",
    "Создайте локально до 100 китайских кодов социального кредита для тестов. Два контрольных знака, скрытие значений и экспорт в TXT.",
    "Для тестирования ПО. Вычисляются внутренний знак GB 11714 и внешний знак GB 32100. Таблицы органов, категорий и адресов, а также реестры не проверяются. Коды могут совпасть с выданными. Они различаются только в пределах пакета.",
    "Одинаковые данные дают один и тот же пакет. Основа перебирается в порядке 31 символа ниже без возврата к началу. Любой префикс PDY запрещён для исключения внутреннего диапазона PDY00001–PDY99999. Полноширинный ASCII и строчные буквы ASCII преобразуются, пробелы по краям удаляются. Максимум 64 единицы UTF-16 на исходное поле.",
    "Начальная основа кода организации (8 знаков)",
    "Укажите орган, категорию, шестизначный код адреса и восьмизначную начальную основу.",
    "Выберите от 1 до 100 образцов и создайте пакет с контрольными знаками.",
    "При необходимости откройте полные коды, затем скопируйте или скачайте видимые значения.",
    "Подтверждают ли образцы регистрацию?",
    "Мои данные или образцы покидают браузер?",
  ],
  it: [
    "Generatore di codici di credito sociale unificato",
    "Genera in locale fino a 100 codici di credito sociale unificato cinesi per i test, con due caratteri di controllo, mascheramento ed export TXT.",
    "Per i test software. Calcola i caratteri di controllo interno GB 11714 ed esterno GB 32100. Non consulta le tabelle di enti, categorie e indirizzi né i registri. I campioni possono coincidere con codici assegnati e sono distinti solo all’interno del lotto.",
    "Gli stessi input danno lo stesso lotto. Il corpo avanza nell’ordine dei 31 caratteri qui sotto, senza ripartire. Ogni prefisso PDY viene rifiutato per escludere l’intervallo interno PDY00001–PDY99999. Sono normalizzati ASCII a larghezza piena, minuscole ASCII e spazi ai margini. Limite di 64 unità UTF-16 per campo originale.",
    "Corpo iniziale dell’organizzazione (8 caratteri)",
    "Inserisci l’ente, la categoria, il codice d’indirizzo di sei cifre e il corpo iniziale di otto caratteri.",
    "Scegli da 1 a 100 campioni e genera il lotto per calcolare i caratteri di controllo.",
    "Se serve, mostra i campioni completi e copia o scarica i valori visualizzati.",
    "I campioni provano una registrazione?",
    "I miei input o campioni escono dal browser?",
  ],
  tr: [
    "Birleşik Sosyal Kredi Kodu Oluşturucu",
    "Test için 100’e kadar Çin Birleşik Sosyal Kredi Kodu örneğini yerel üretin. İki kontrol karakteri, maskeli sonuç ve TXT aktarımı desteklenir.",
    "Yazılım testleri içindir. İç GB 11714 ve dış GB 32100 kontrol karakteri hesaplanır. Kurum, kategori ve adres kodu tabloları veya sicil sorgulanmaz. Örnekler atanmış kodlarla çakışabilir ve yalnızca grup içinde farklıdır.",
    "Aynı girdi aynı grubu üretir. Gövde, aşağıdaki 31 karakter sırasıyla ilerler ve sona gelince başa dönmez. PDY00001–PDY99999 özel aralığı için tüm PDY önekleri reddedilir. Tam genişlikli ASCII ve ASCII küçük harfleri dönüştürülür, baştaki ve sondaki boşluklar kırpılır. Ham alan sınırı 64 UTF-16 kod birimidir.",
    "Başlangıç kuruluş gövdesi (8 karakter)",
    "Kayıt birimini, kuruluş kategorisini, altı haneli adres kodunu ve sekiz karakterli başlangıç gövdesini girin.",
    "1–100 örnek seçip grubu oluşturun. İki kontrol karakteri de hesaplanır.",
    "Gerekirse tam kodları gösterin ve görünen değerleri kopyalayın veya indirin.",
    "Örnekler kayıtlı olmayı kanıtlar mı?",
    "Girdi veya örneklerim tarayıcıdan çıkar mı?",
  ],
  ko: [
    "통합사회신용코드 생성기",
    "중국 통합사회신용코드 테스트 샘플을 브라우저에서 최대 100개 생성합니다. GB 11714와 GB 32100의 검사 문자를 모두 계산하고 결과를 기본으로 가립니다. 필요한 경우 전체 값을 표시하고 보이는 결과를 TXT로 복사하거나 저장할 수 있습니다.",
    "소프트웨어 테스트용입니다. 내부 GB 11714 검사 문자와 외부 GB 32100 검사 문자를 계산합니다. 등록 기관, 조직 분류, 주소 코드표나 실제 등록 기록은 조회하지 않습니다. 실제 코드와 같을 수 있으며 한 묶음 안에서만 서로 다릅니다.",
    "같은 입력으로 같은 묶음을 생성합니다. 본체는 아래 31자 순서로 증가하며 끝에서 되돌아가지 않습니다. 내부용 구간 PDY00001–PDY99999를 제외하기 위해 PDY로 시작하는 모든 본체를 거부합니다. 전각 ASCII와 ASCII 소문자를 바꾸고 앞뒤 공백을 제거합니다. 원본 필드당 UTF-16 코드 단위 64개까지 허용합니다.",
    "시작 조직 본체 코드(8자)",
    "등록 기관, 조직 분류, 6자리 주소 코드 및 8자리 시작 본체를 입력하세요.",
    "1–100개를 정해 생성하면 두 검사 문자가 계산됩니다.",
    "필요하다면 전체 코드를 표시한 뒤 보이는 값을 복사하거나 다운로드하세요.",
    "샘플로 실제 등록 여부를 증명할 수 있나요?",
    "입력이나 결과가 브라우저 밖으로 전송되나요?",
  ],
  ar: [
    "مولّد رموز الائتمان الاجتماعي الموحّد",
    "أنشئ محلياً حتى 100 عينة صينية من رموز الائتمان الاجتماعي الموحّد للاختبار، مع احتساب حرفي التحقق وإخفاء النتائج وإمكانية تصديرها بصيغة TXT.",
    "لاختبار البرمجيات. يُحسب حرف التحقق الداخلي GB 11714 والخارجي GB 32100. لا تُراجع جداول رموز الجهات أو الفئات أو العناوين ولا سجلات التسجيل. قد تتطابق العينات مع رموز مخصصة فعلاً، وتكون مختلفة فقط داخل الدفعة.",
    "المدخلات نفسها تعطي الدفعة نفسها. يتقدم الجزء الأساسي وفق ترتيب الأحرف الـ31 أدناه دون عودة إلى البداية. تُستبعد كل بادئة PDY لحجب النطاق الداخلي PDY00001–PDY99999. يُحوّل ASCII كامل العرض والأحرف الصغيرة وتُزال المسافات عند الطرفين. الحد لكل حقل أصلي 64 وحدة UTF-16.",
    "الجزء الأساسي الأول للمؤسسة (8 أحرف)",
    "أدخل جهة التسجيل وفئة المؤسسة ورمز العنوان من ستة أرقام والجزء الأساسي الأول من ثمانية أحرف.",
    "اختر من 1 إلى 100 عينة ثم أنشئ الدفعة لحساب حرفي التحقق.",
    "أظهر الرموز الكاملة عند الحاجة وانسخ القيم المعروضة أو نزّلها.",
    "هل تثبت العينات أن المؤسسة مسجّلة؟",
    "هل تغادر مدخلاتي أو العينات المتصفح؟",
  ],
  hi: [
    "एकीकृत सामाजिक क्रेडिट कोड जनरेटर",
    "परीक्षण के लिए 100 तक चीनी एकीकृत सामाजिक क्रेडिट कोड स्थानीय रूप से बनाएँ। दो जाँच वर्ण, छिपे हुए परिणाम और TXT निर्यात उपलब्ध हैं।",
    "सॉफ़्टवेयर परीक्षण के लिए। अंदरूनी GB 11714 और बाहरी GB 32100 जाँच वर्ण निकाले जाते हैं। विभाग, श्रेणी, पता कोड तालिकाएँ या पंजीकरण रिकॉर्ड नहीं जाँचे जाते। नमूने पहले से आवंटित कोड से मिल सकते हैं और केवल एक बैच में अलग होते हैं।",
    "एक जैसे इनपुट से वही बैच बनता है। मूल भाग नीचे दिए 31 वर्णों के क्रम में बिना दोबारा शुरू हुए बढ़ता है। आंतरिक PDY00001–PDY99999 दायरे के लिए हर PDY उपसर्ग अस्वीकार होता है। पूरी चौड़ाई और छोटे ASCII वर्ण बदले जाते हैं, और किनारों के खाली स्थान हटते हैं। हर मूल फ़ील्ड की सीमा 64 UTF-16 इकाइयाँ है।",
    "संगठन का शुरुआती मूल भाग (8 वर्ण)",
    "विभाग, संगठन श्रेणी, छह अंकों का पता कोड और आठ वर्णों का शुरुआती मूल भाग दें।",
    "1–100 नमूने चुनें और दोनों जाँच वर्णों के साथ बैच बनाएँ।",
    "ज़रूरत पर पूरे नमूने दिखाएँ और दिखाई दे रहे मान कॉपी या डाउनलोड करें।",
    "क्या नमूने पंजीकरण की पुष्टि करते हैं?",
    "क्या मेरे इनपुट या नमूने ब्राउज़र से बाहर जाते हैं?",
  ],
  id: [
    "Pembuat Kode Kredit Sosial Terpadu",
    "Buat secara lokal hingga 100 kode kredit sosial terpadu Tiongkok untuk pengujian, dengan dua karakter pemeriksa, penyamaran, dan ekspor TXT.",
    "Untuk pengujian perangkat lunak. Karakter pemeriksa dalam GB 11714 dan luar GB 32100 dihitung. Tabel kode instansi, kategori, alamat, atau catatan pendaftaran tidak diperiksa. Contoh dapat sama dengan kode yang telah ditetapkan dan hanya berbeda di dalam kelompok.",
    "Masukan yang sama menghasilkan kelompok yang sama. Badan kode bertambah sesuai urutan 31 karakter di bawah tanpa kembali ke awal. Semua awalan PDY ditolak untuk mengecualikan rentang internal PDY00001–PDY99999. ASCII lebar penuh dan huruf kecil ASCII diubah, serta spasi tepi dihapus. Batas setiap kolom mentah adalah 64 unit UTF-16.",
    "Badan kode awal organisasi (8 karakter)",
    "Masukkan instansi, kategori, enam digit kode alamat, dan delapan karakter badan kode awal.",
    "Pilih 1–100 contoh lalu buat kelompok dengan kedua karakter pemeriksa.",
    "Tampilkan kode lengkap bila perlu, lalu salin atau unduh nilai yang terlihat.",
    "Apakah contoh membuktikan pendaftaran?",
    "Apakah masukan atau contoh keluar dari peramban?",
  ],
  vi: [
    "Tạo mã tín dụng xã hội thống nhất",
    "Tạo cục bộ tối đa 100 mã tín dụng xã hội thống nhất Trung Quốc để thử nghiệm, có hai ký tự kiểm tra, che kết quả mặc định và xuất TXT.",
    "Dùng để kiểm thử phần mềm. Công cụ tính ký tự kiểm tra bên trong theo GB 11714 và bên ngoài theo GB 32100. Không tra bảng mã cơ quan, loại tổ chức, địa chỉ hoặc hồ sơ đăng ký. Mẫu có thể trùng mã đã cấp và chỉ khác nhau trong cùng một lô.",
    "Cùng đầu vào cho cùng một lô. Phần thân tăng theo thứ tự 31 ký tự bên dưới, không quay lại đầu. Mọi tiền tố PDY đều bị từ chối để loại khoảng nội bộ PDY00001–PDY99999. ASCII toàn chiều rộng và chữ thường ASCII được đổi, khoảng trắng ở hai đầu bị cắt. Mỗi trường gốc giới hạn 64 đơn vị UTF-16.",
    "Thân mã tổ chức bắt đầu (8 ký tự)",
    "Nhập cơ quan, loại tổ chức, mã địa chỉ sáu chữ số và phần thân bắt đầu tám ký tự.",
    "Chọn 1–100 mẫu rồi tạo lô để tính cả hai ký tự kiểm tra.",
    "Hiện mẫu đầy đủ nếu cần rồi sao chép hoặc tải các giá trị đang hiển thị.",
    "Mẫu có chứng minh tổ chức đã đăng ký không?",
    "Dữ liệu hoặc mẫu có rời trình duyệt không?",
  ],
};

type Errors = [
  tooLong: string, oneCharacter: string, address: string, body: string,
  count: string, capacity: string, reserved: string,
];
const errors: Record<Locale, Errors> = {
  en: ["Each raw field allows at most 64 UTF-16 code units.", "Enter exactly one character from the alphabet below.", "Enter exactly six decimal digits.", "Enter exactly eight characters from the alphabet below.", "Enter a whole number from 1 to 100.", "This batch would go past the last body. Lower the count or start earlier.", "This batch uses the excluded PDY prefix. Choose a different start or lower the count."],
  zh: ["每个原始字段最多 64 个 UTF-16 代码单元。", "请填写下方字符表中的一个字符。", "请填写六位十进制数字。", "请填写下方字符表中的八个字符。", "请填写 1 至 100 的整数。", "本批次超出本体码范围。请减少数量或提前起点。", "本批次包含排除的 PDY 前缀。请更改起点或减少数量。"],
  ja: ["各元入力は 64 UTF-16 コード単位までです。", "下の文字一覧から 1 文字を入力してください。", "十進数字を 6 桁入力してください。", "下の文字一覧から 8 文字を入力してください。", "1〜100 の整数を入力してください。", "この件数では最後の本体を超えます。件数を減らすか開始位置を前にしてください。", "このバッチには除外対象の PDY が含まれます。開始位置を変えるか件数を減らしてください。"],
  es: ["Cada campo original admite hasta 64 unidades UTF-16.", "Introduce un carácter del alfabeto de abajo.", "Introduce exactamente seis dígitos decimales.", "Introduce ocho caracteres del alfabeto de abajo.", "Introduce un entero entre 1 y 100.", "El lote sobrepasaría el último cuerpo. Reduce la cantidad o empieza antes.", "El lote incluye el prefijo excluido PDY. Cambia el inicio o reduce la cantidad."],
  pt: ["Cada campo original aceita até 64 unidades UTF-16.", "Informe um caractere do alfabeto abaixo.", "Informe exatamente seis dígitos decimais.", "Informe oito caracteres do alfabeto abaixo.", "Informe um inteiro de 1 a 100.", "O lote excederia o último corpo. Reduza a quantidade ou comece antes.", "O lote inclui o prefixo excluído PDY. Altere o início ou reduza a quantidade."],
  fr: ["Chaque champ brut accepte au plus 64 unités UTF-16.", "Saisissez un caractère de l’alphabet ci-dessous.", "Saisissez exactement six chiffres décimaux.", "Saisissez huit caractères de l’alphabet ci-dessous.", "Saisissez un entier de 1 à 100.", "Le lot dépasserait le dernier corps. Réduisez le nombre ou commencez plus tôt.", "Le lot inclut le préfixe exclu PDY. Changez le début ou réduisez le nombre."],
  de: ["Je Rohfeld sind höchstens 64 UTF-16-Codeeinheiten erlaubt.", "Genau ein Zeichen aus dem Alphabet unten eingeben.", "Genau sechs Dezimalziffern eingeben.", "Genau acht Zeichen aus dem Alphabet unten eingeben.", "Eine ganze Zahl von 1 bis 100 eingeben.", "Der Stapel würde über den letzten Rumpf hinausgehen. Anzahl verringern oder früher beginnen.", "Der Stapel enthält das ausgeschlossene Präfix PDY. Start ändern oder Anzahl verringern."],
  ru: ["Исходное поле вмещает до 64 единиц UTF-16.", "Введите ровно один знак из алфавита ниже.", "Введите ровно шесть десятичных цифр.", "Введите ровно восемь знаков из алфавита ниже.", "Введите целое число от 1 до 100.", "Пакет вышел бы за пределы последней основы. Уменьшите число или начните раньше.", "Пакет содержит исключённый префикс PDY. Измените начало или уменьшите число."],
  it: ["Ogni campo originale accetta al massimo 64 unità UTF-16.", "Inserisci un carattere dell’alfabeto qui sotto.", "Inserisci esattamente sei cifre decimali.", "Inserisci otto caratteri dell’alfabeto qui sotto.", "Inserisci un intero da 1 a 100.", "Il lotto supererebbe l’ultimo corpo. Riduci la quantità o inizia prima.", "Il lotto include il prefisso escluso PDY. Cambia l’inizio o riduci la quantità."],
  tr: ["Her ham alan en çok 64 UTF-16 kod birimi alır.", "Aşağıdaki alfabeden tam bir karakter girin.", "Tam altı ondalık rakam girin.", "Aşağıdaki alfabeden tam sekiz karakter girin.", "1 ile 100 arasında bir tam sayı girin.", "Grup son gövdeyi aşar. Sayıyı azaltın veya daha önce başlayın.", "Grup, dışlanan PDY önekini içeriyor. Başlangıcı değiştirin veya sayıyı azaltın."],
  ko: ["원본 필드에는 UTF-16 코드 단위 64개까지 입력할 수 있습니다.", "아래 문자표에서 한 글자만 입력하세요.", "십진 숫자 여섯 자리를 입력하세요.", "아래 문자표에서 정확히 여덟 글자를 입력하세요.", "1~100의 정수를 입력하세요.", "마지막 본체를 넘습니다. 수량을 줄이거나 더 앞에서 시작하세요.", "제외된 PDY 접두사가 포함됩니다. 시작을 바꾸거나 수량을 줄이세요."],
  ar: ["يسمح كل حقل أصلي بما يصل إلى 64 وحدة UTF-16.", "أدخل حرفاً واحداً من القائمة أدناه.", "أدخل ستة أرقام عشرية بالضبط.", "أدخل ثمانية أحرف من القائمة أدناه.", "أدخل عدداً صحيحاً بين 1 و100.", "ستتجاوز الدفعة آخر جزء أساسي. قلّل العدد أو ابدأ من موضع أسبق.", "تتضمن الدفعة بادئة PDY المستبعدة. غيّر البداية أو قلّل العدد."],
  hi: ["हर मूल फ़ील्ड में अधिकतम 64 UTF-16 इकाइयाँ हो सकती हैं।", "नीचे दिए वर्णों में से ठीक एक वर्ण दें।", "ठीक छह दशमलव अंक दें।", "नीचे दिए वर्णों में से ठीक आठ वर्ण दें।", "1 से 100 तक की पूर्ण संख्या दें।", "बैच अंतिम मूल भाग से आगे जाएगा। संख्या घटाएँ या पहले से शुरू करें।", "बैच में वर्जित PDY उपसर्ग है। शुरुआत बदलें या संख्या घटाएँ।"],
  id: ["Setiap kolom mentah menerima hingga 64 unit UTF-16.", "Masukkan tepat satu karakter dari alfabet di bawah.", "Masukkan tepat enam angka desimal.", "Masukkan tepat delapan karakter dari alfabet di bawah.", "Masukkan bilangan bulat dari 1 hingga 100.", "Kelompok melewati badan kode terakhir. Kurangi jumlah atau mulai lebih awal.", "Kelompok berisi awalan PDY yang dikecualikan. Ubah awal atau kurangi jumlah."],
  vi: ["Mỗi trường gốc nhận tối đa 64 đơn vị UTF-16.", "Nhập đúng một ký tự trong bảng bên dưới.", "Nhập đúng sáu chữ số thập phân.", "Nhập đúng tám ký tự trong bảng bên dưới.", "Nhập số nguyên từ 1 đến 100.", "Lô sẽ vượt quá thân mã cuối cùng. Giảm số lượng hoặc bắt đầu sớm hơn.", "Lô có tiền tố PDY bị loại. Đổi điểm bắt đầu hoặc giảm số lượng."],
};

const actionKeys = ["generate", "clear", "reveal", "hide", "copy", "download", "copied", "copyFailed", "downloaded", "downloadFailed", "empty", "generated", "localNote", "maskedNote"] as const;
type Messages = Pick<(typeof CHINESE_ID_MESSAGES)["en"], (typeof actionKeys)[number]> & {
  scope: string;
  inputPolicy: string;
  fields: Record<SocialCreditGeneratorField, string>;
  errors: Record<SocialCreditGeneratorError, string>;
};

export const SOCIAL_CREDIT_GENERATOR_MESSAGES = {} as Record<Locale, Messages>;
for (const locale of LOCALES) {
  const [, , scope, inputPolicy, startBody] = copy[locale];
  const shared = CHINESE_ID_MESSAGES[locale];
  const credit = SOCIAL_CREDIT_MESSAGES[locale];
  const [too_long, oneCharacter, address, body, count, capacity, reserved] = errors[locale];
  SOCIAL_CREDIT_GENERATOR_MESSAGES[locale] = {
    ...Object.fromEntries(actionKeys.map(key => [key, shared[key]])) as Pick<Messages, (typeof actionKeys)[number]>,
    scope,
    inputPolicy,
    fields: { department: credit.department, category: credit.category, addressCode: credit.address, startBody, count: shared.count },
    errors: { input_type: credit.errors.input_type, too_long, department: oneCharacter, category: oneCharacter, address, body, count, capacity, reserved },
  };
}

export function socialCreditGeneratorToolCopy(): Record<Locale, ToolCopy> {
  const translated = {} as Record<Locale, ToolCopy>;
  for (const locale of LOCALES) {
    const [name, tagline, scope, , , fieldsStep, generateStep, exportStep, scopeQuestion, privacyQuestion] = copy[locale];
    const messages = SOCIAL_CREDIT_GENERATOR_MESSAGES[locale];
    translated[locale] = {
      name, tagline, intro: [scope, messages.inputPolicy, messages.localNote],
      steps: [fieldsStep, generateStep, exportStep],
      faqs: [{ q: scopeQuestion, a: scope }, { q: privacyQuestion, a: messages.localNote + " " + messages.maskedNote }],
      deepDive: socialCreditDeepDive("generator", locale),
    };
  }
  return translated;
}
