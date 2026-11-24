import { LOCALES, type Locale } from "@/lib/site";
import type { ToolCopy } from "./types";
import { rmbDeepDive } from "./deepdive-cn";
import { RMB_UPPERCASE_MESSAGES } from "./rmb-uppercase-copy";
import type { RmbUppercaseParseError } from "./rmb-uppercase-to-number";

type Messages = { name: string; tagline: string; input: string; scope: string; grammar: string; normalize: string; minor: string; canonical: string; applied: string; invalid: string };

export const RMB_REVERSE_READY: Record<Locale, string> = {
  en: "Amount converted.", zh: "金额已转换。", ja: "金額を変換しました。",
  es: "Importe convertido.", pt: "Valor convertido.", fr: "Montant converti.",
  de: "Betrag umgerechnet.", ru: "Сумма преобразована.", it: "Importo convertito.",
  tr: "Tutar dönüştürüldü.", ko: "금액을 변환했습니다.", ar: "تم تحويل المبلغ.",
  hi: "राशि बदल दी गई।", id: "Nominal dikonversi.", vi: "Đã chuyển đổi số tiền.",
};

export const RMB_UPPERCASE_TO_NUMBER_MESSAGES: Record<Locale, Messages> = {
  en: {
    name: "RMB Uppercase to Number", tagline: "Read supported Chinese financial uppercase amounts as exact yuan decimals locally, with strict syntax, explicit limits and no guessing or rounding.",
    input: "Chinese financial uppercase amount", scope: "Single non-negative RMB amount only, 0–999999999999.99 yuan; at most 128 raw UTF-16 code units. General Chinese numbers, shorthand, negatives, 毫/厘 and batches are outside this strict subset. Unsupported does not mean a voucher is legally invalid.",
    grammar: "元 is required. Optional 人民币 may occur once at the start. Use explicit financial digits and descending units with gap zeros. Whole yuan ends in 整/正; after 角 they are optional; after 分 they are forbidden. Missing 角 with 分 requires 元零…分. The official 1680.32 and 107000.53 zero variants are supported.",
    normalize: "Only outer spaces and these listed variants are normalized: 貳→贰, 陸→陆, 億→亿, 萬→万, 圓→元. Internal spaces, letters and symbols are never silently removed. The displayed canonical wording is one fixed style, not the only accepted spelling.",
    minor: "Integer fen", canonical: "Canonical financial wording", applied: "The disclosed normalization was applied.", invalid: "This spelling is outside the supported strict financial grammar. Check units, zeros and 整/正 placement; the parser does not guess missing values. This is not a legal validity decision.",
  },
  zh: {
    name: "人民币大写转数字", tagline: "在浏览器本地将明确支持的人民币财务大写解析成精确的两位小数金额与整数分。严格检查单位、零、元角分及整正位置，不猜测、不舍入，也不将范围外写法判为票据违法。",
    input: "人民币财务大写金额", scope: "仅解析单笔非负人民币金额，范围 0–999999999999.99 元；原始输入最多 128 个 UTF-16 代码单元。不支持普通中文数字、口语简写、负数、毫厘或批量输入；超出本工具范围不代表票据在法律上无效。",
    grammar: "必须包含元；人民币前缀可省略，存在时只能在开头出现一次。使用财务数字和降序单位，按缺位写零。金额写到元为止时须写整或正；写到角为止时可省略；分后不得写整或正。缺角有分须写元零…分；支持官方 1680.32 与 107000.53 的两种零写法。",
    normalize: "仅整理首尾空白及列明字形：貳→贰、陸→陆、億→亿、萬→万、圓→元。不会默默删除内部空白、字母或符号。输出的规范大写采用固定样式，不代表只有这一种可接受写法。",
    minor: "整数分", canonical: "固定样式财务大写", applied: "已按公开规则整理输入。", invalid: "该写法超出本工具支持的严格财务语法。请检查单位、零和整正位置；未猜测或删除字符，也不据此判定票据法律效力。",
  },
  ja: {
    name: "人民元大字を数字に変換", tagline: "対応する中国語の財務用大字を、端末内で正確な人民元の小数金額に変換します。厳密な構文と上限を明示し、推測・丸めは行いません。",
    input: "中国語の財務用大字金額", scope: "単一の非負金額、0～999999999999.99元、元の入力128 UTF-16コード単位まで。一般漢数字、省略、負数、毫・厘、複数件は対象外です。非対応は証憑の法的無効を意味しません。",
    grammar: "元は必須。人民币は先頭に1回だけ任意です。大字と降順の位、欠位の零を使います。元で終われば整/正、角の後は任意、分の後は禁止。角がなく分があれば元零…分。公式1680.32と107000.53の零の異表記に対応します。",
    normalize: "前後空白と次の字形だけ正規化：貳→贰、陸→陆、億→亿、萬→万、圓→元。内部空白・英字・記号は削除しません。表示する標準形は固定の1形式で、唯一の許容表記ではありません。",
    minor: "整数の分", canonical: "固定形式の財務大字", applied: "明示した正規化を適用しました。", invalid: "対応する厳密な財務構文の範囲外です。位・零・整/正の位置を確認してください。推測や文字削除はせず、法的有効性も判定しません。",
  },
  es: {
    name: "Mayúsculas RMB a número", tagline: "Interpreta importes financieros chinos admitidos como decimales exactos en yuanes localmente, con sintaxis estricta, límites claros y sin adivinar ni redondear.",
    input: "Importe en numerales financieros chinos", scope: "Un importe RMB no negativo, 0–999999999999.99 yuanes; máximo 128 unidades UTF-16 originales. Se excluyen números chinos generales, abreviaturas, negativos, 毫/厘 y lotes. No admitido no significa invalidez legal del documento.",
    grammar: "元 obligatorio; 人民币 opcional una vez al principio. Cifras financieras, unidades descendentes y 零 en los huecos. Si acaba en 元, exige 整/正; si acaba en 角, es opcional; tras 分 está prohibido. Sin 角 pero con 分 exige 元零…分. Admite las variantes oficiales de 1680.32 y 107000.53.",
    normalize: "Solo espacios exteriores y 貳→贰, 陸→陆, 億→亿, 萬→万, 圓→元. No se eliminan espacios internos, letras ni símbolos. El texto canónico mostrado es un estilo fijo, no la única grafía aceptable.",
    minor: "Fen enteros", canonical: "Texto financiero canónico", applied: "Se aplicó la normalización indicada.", invalid: "Grafía fuera de la gramática financiera estricta admitida. Revisa unidades, ceros y 整/正. No se adivinaron ni eliminaron caracteres; no es una decisión de validez legal.",
  },
  pt: {
    name: "Maiúsculas RMB para número", tagline: "Leia valores financeiros chineses aceitos como decimais exatos em yuans localmente, com sintaxe estrita, limites claros e sem adivinhação ou arredondamento.",
    input: "Valor em numerais financeiros chineses", scope: "Um valor RMB não negativo, 0–999999999999.99 yuans; até 128 unidades UTF-16 originais. Números chineses gerais, abreviações, negativos, 毫/厘 e lotes não são aceitos. Fora do escopo não significa documento legalmente inválido.",
    grammar: "元 obrigatório; 人民币 opcional uma vez no início. Dígitos financeiros, unidades decrescentes e 零 nas lacunas. Se terminar em 元, exige 整/正; em 角, é opcional; após 分, é proibido. Sem 角 mas com 分 exige 元零…分. Aceita variantes oficiais de 1680.32 e 107000.53.",
    normalize: "Somente espaços externos e 貳→贰, 陸→陆, 億→亿, 萬→万, 圓→元. Espaços internos, letras e símbolos não são removidos. A forma canônica exibida é um estilo fixo, não a única grafia aceitável.",
    minor: "Fen inteiros", canonical: "Texto financeiro canônico", applied: "A normalização indicada foi aplicada.", invalid: "Grafia fora da gramática financeira estrita aceita. Confira unidades, zeros e 整/正. Nenhum caractere foi adivinhado ou removido; não é decisão de validade jurídica.",
  },
  fr: {
    name: "Majuscules RMB en nombres", tagline: "Lisez localement les montants financiers chinois pris en charge en décimales exactes de yuans, avec syntaxe stricte, limites explicites et sans arrondi.",
    input: "Montant en chiffres financiers chinois", scope: "Un seul montant RMB positif ou nul, 0–999999999999.99 yuans ; 128 unités UTF-16 brutes maximum. Nombres chinois généraux, raccourcis, négatifs, 毫/厘 et lots exclus. Non pris en charge ne signifie pas document juridiquement invalide.",
    grammar: "元 obligatoire ; 人民币 facultatif une fois au début. Chiffres financiers, unités décroissantes et 零 aux places manquantes. Si le montant s’arrête à 元, 整/正 est obligatoire ; s’il s’arrête à 角, c’est facultatif ; après 分, c’est interdit. Sans 角 avec 分 : 元零…分. Variantes officielles de 1680.32 et 107000.53 prises en charge.",
    normalize: "Seulement les espaces externes et 貳→贰, 陸→陆, 億→亿, 萬→万, 圓→元. Aucun espace interne, lettre ou symbole supprimé. Le texte canonique affiché est un style fixe, pas la seule écriture acceptable.",
    minor: "Fen entiers", canonical: "Écriture financière canonique", applied: "La normalisation annoncée a été appliquée.", invalid: "Écriture hors de la grammaire financière stricte prise en charge. Vérifiez unités, zéros et 整/正. Rien n’a été deviné ou supprimé ; aucun jugement de validité juridique.",
  },
  de: {
    name: "RMB-Finanzzeichen in Zahlen", tagline: "Lies unterstützte chinesische Finanzbeträge lokal als exakte Yuan-Dezimalzahlen, mit strenger Syntax, klaren Grenzen und ohne Raten oder Runden.",
    input: "Betrag in chinesischen Finanzzeichen", scope: "Ein nicht negativer RMB-Betrag, 0–999999999999.99 Yuan; maximal128 rohe UTF-16-Einheiten. Allgemeine chinesische Zahlen, Kurzformen, negative Werte, 毫/厘 und Stapel sind ausgeschlossen. Nicht unterstützt heißt nicht rechtlich ungültig.",
    grammar: "元 ist Pflicht; 人民币 optional einmal am Anfang. Finanzziffern, absteigende Einheiten und Lücken-零. Endet der Betrag auf 元, ist 整/正 nötig. Endet er auf 角, ist es optional. Nach 分 ist es verboten. Ohne 角 mit 分: 元零…分. Amtliche Nullvarianten für1680.32 und107000.53 werden unterstützt.",
    normalize: "Nur äußere Leerzeichen und 貳→贰, 陸→陆, 億→亿, 萬→万, 圓→元. Innere Leerzeichen, Buchstaben und Zeichen werden nicht entfernt. Die angezeigte Normalform ist ein fester Stil, nicht die einzig akzeptable Schreibweise.",
    minor: "Ganze Fen", canonical: "Feste Finanzschreibweise", applied: "Die angegebene Normalisierung wurde angewendet.", invalid: "Außerhalb der unterstützten strengen Finanzsyntax. Einheiten, Nullen und 整/正 prüfen. Nichts wurde erraten oder entfernt; keine rechtliche Gültigkeitsentscheidung.",
  },
  ru: {
    name: "Финансовая запись RMB в число", tagline: "Читайте поддерживаемые китайские финансовые суммы локально как точные десятичные юани со строгим синтаксисом, явными пределами, без догадок и округления.",
    input: "Сумма китайскими финансовыми цифрами", scope: "Одна неотрицательная сумма RMB, 0–999999999999.99 юаня; до128 исходных единиц UTF-16. Общие китайские числа, сокращения, отрицательные значения, 毫/厘 и списки исключены. Неподдерживаемое не означает юридическую недействительность документа.",
    grammar: "元 обязателен; 人民币 необязателен один раз в начале. Финансовые цифры, убывающие разряды и 零 в пропусках. Если сумма оканчивается на 元, нужен 整/正. После 角 в конце он необязателен, после 分 запрещён. Без 角 с 分 нужен 元零…分. Поддержаны официальные варианты1680.32 и107000.53.",
    normalize: "Только внешние пробелы и 貳→贰, 陸→陆, 億→亿, 萬→万, 圓→元. Внутренние пробелы, буквы и символы не удаляются. Показанная каноническая форма — фиксированный стиль, не единственная допустимая запись.",
    minor: "Целые фэни", canonical: "Каноническая финансовая запись", applied: "Применена объявленная нормализация.", invalid: "Запись вне поддерживаемой строгой финансовой грамматики. Проверьте разряды, нули и 整/正. Ничего не угадано и не удалено; это не правовая оценка документа.",
  },
  it: {
    name: "Maiuscole RMB in numero", tagline: "Leggi gli importi finanziari cinesi supportati come decimali esatti in yuan nel browser, con sintassi rigorosa, limiti espliciti e senza arrotondare.",
    input: "Importo in numerali finanziari cinesi", scope: "Un importo RMB non negativo, 0–999999999999.99 yuan; massimo128 unità UTF-16 originali. Esclusi numeri cinesi generici, abbreviazioni, negativi, 毫/厘 e lotti. Non supportato non significa documento legalmente invalido.",
    grammar: "元 obbligatorio; 人民币 facoltativo una volta all’inizio. Cifre finanziarie, unità decrescenti e 零 nei posti mancanti. Se l’importo termina in 元, serve 整/正; se termina in 角, è facoltativo; dopo 分 è vietato. Senza 角 con 分: 元零…分. Supportate le varianti ufficiali1680.32 e107000.53.",
    normalize: "Solo spazi esterni e 貳→贰, 陸→陆, 億→亿, 萬→万, 圓→元. Spazi interni, lettere e simboli non vengono rimossi. La forma canonica mostrata è uno stile fisso, non l’unica grafia accettabile.",
    minor: "Fen interi", canonical: "Forma finanziaria canonica", applied: "Applicata la normalizzazione dichiarata.", invalid: "Grafia fuori dalla grammatica finanziaria rigorosa supportata. Controlla unità, zeri e 整/正. Nessun carattere è stato indovinato o rimosso; non è un giudizio di validità legale.",
  },
  tr: {
    name: "RMB mali yazımından sayıya", tagline: "Desteklenen Çince mali tutarları kesin yuan ondalıklarına yerel olarak çevirin; katı sözdizimi, açık sınırlar, tahmin veya yuvarlama yoktur.",
    input: "Çince mali rakamlarla tutar", scope: "Tek bir negatif olmayan RMB tutarı, 0–999999999999.99 yuan; en fazla128 ham UTF-16 birimi. Genel Çince sayılar, kısaltmalar, negatifler, 毫/厘 ve toplu giriş kapsam dışıdır. Desteklenmiyor, belgenin hukuken geçersiz olduğu anlamına gelmez.",
    grammar: "元 zorunlu; 人民币 yalnız başta bir kez isteğe bağlıdır. Mali rakamlar, azalan birimler ve boş basamaklarda 零. Tutar 元 ile bitiyorsa 整/正 gerekir, 角 ile bitiyorsa isteğe bağlıdır. 分 sonrasında kullanılmaz. 角 yokken 分 varsa 元零…分. Resmî1680.32 ve107000.53 sıfır çeşitleri desteklenir.",
    normalize: "Yalnız dış boşluklar ve 貳→贰, 陸→陆, 億→亿, 萬→万, 圓→元. İç boşluk, harf ve simgeler silinmez. Gösterilen standart yazım sabit bir stildir, tek kabul edilen biçim değildir.",
    minor: "Tam sayı fen", canonical: "Standart mali yazım", applied: "Bildirilen normalleştirme uygulandı.", invalid: "Yazım desteklenen katı mali dilbilgisinin dışında. Birim, sıfır ve 整/正 konumlarını kontrol edin. Hiçbir karakter tahmin edilmedi veya silinmedi; hukuki geçerlilik kararı değildir.",
  },
  ko: {
    name: "위안 재무 대문자를 숫자로", tagline: "지원되는 중국어 재무 대문자 금액을 브라우저에서 정확한 위안 소수로 변환합니다. 엄격한 문법과 입력 범위를 표시하며 추측하거나 반올림하지 않습니다.",
    input: "중국어 재무 대문자 금액", scope: "음수가 아닌 단일 RMB 금액 0–999999999999.99위안, 원시 입력128 UTF-16 단위까지입니다. 일반 중국어 수, 축약, 음수, 毫/厘, 일괄 입력은 제외합니다. 미지원이 증빙의 법적 무효를 뜻하지 않습니다.",
    grammar: "元이 필수이고 人民币는 맨 앞에 한 번만 선택적으로 씁니다. 재무 숫자, 내림차순 단위와 빠진 자리의 零을 사용합니다. 금액이 元으로 끝나면 整/正이 필수이고 角으로 끝나면 선택입니다. 分 뒤에는 붙일 수 없습니다. 角 없이 分이 있으면 元零…分. 공식1680.32와107000.53의 零 변형을 지원합니다.",
    normalize: "바깥 공백과 貳→贰, 陸→陆, 億→亿, 萬→万, 圓→元만 정규화합니다. 내부 공백, 영문자, 기호를 지우지 않습니다. 표시된 표준 문구는 한 가지 고정 양식으로 유일한 허용 표기는 아닙니다.",
    minor: "정수 단위 펀", canonical: "고정 재무 대문자", applied: "명시한 정규화를 적용했습니다.", invalid: "지원하는 엄격한 재무 문법의 범위 밖입니다. 단위, 零과 整/正 위치를 확인하세요. 문자를 추측하거나 지우지 않았으며 법적 유효성 판단이 아닙니다.",
  },
  ar: {
    name: "حروف RMB المالية إلى أرقام", tagline: "اقرأ المبالغ المالية الصينية المدعومة كقيم يوان عشرية دقيقة محلياً، بقواعد صارمة وحدود واضحة ودون تخمين أو تقريب.",
    input: "مبلغ بالحروف المالية الصينية", scope: "مبلغ RMB واحد غير سالب، 0–999999999999.99 يوان؛ حتى128 وحدة UTF-16 أصلية. الأعداد الصينية العامة والاختصارات والسالب و毫/厘 والدفعات خارج النطاق. عدم الدعم لا يعني بطلان المستند قانونياً.",
    grammar: "元 مطلوب، و人民币 اختياري مرة في البداية. أرقام مالية ووحدات تنازلية و零 للفجوات. إذا انتهى المبلغ بـ 元 يلزم 整/正، وإذا انتهى بـ 角 فهو اختياري، وبعد 分 ممنوع. دون 角 ومع 分 يلزم 元零…分. تدعم صيغتا الصفر الرسميتان1680.32 و107000.53.",
    normalize: "فقط المسافات الخارجية و貳→贰 و陸→陆 و億→亿 و萬→万 و圓→元. لا تحذف المسافات الداخلية أو الحروف أو الرموز. النص المعياري المعروض أسلوب ثابت وليس الصيغة المقبولة الوحيدة.",
    minor: "فن صحيح", canonical: "الصياغة المالية المعيارية", applied: "طُبق التطبيع المعلن.", invalid: "الصيغة خارج القواعد المالية الصارمة المدعومة. راجع الوحدات والأصفار وموقع 整/正. لم نخمن أو نحذف حروفاً؛ ليس حكماً على الصلاحية القانونية.",
  },
  hi: {
    name: "RMB वित्तीय अक्षर से संख्या", tagline: "समर्थित चीनी वित्तीय बड़े अक्षर राशि को स्थानीय रूप से सटीक युआन दशमलव में पढ़ें। स्पष्ट सीमाएँ और कड़ा व्याकरण, बिना अनुमान या राउंडिंग।",
    input: "चीनी वित्तीय अक्षरों में राशि", scope: "एक गैर-ऋणात्मक RMB राशि, 0–999999999999.99 युआन; अधिकतम128 मूल UTF-16 इकाइयाँ। सामान्य चीनी संख्या, संक्षेप, ऋणात्मक, 毫/厘 और बैच दायरे से बाहर हैं। असमर्थित का अर्थ कानूनी रूप से अमान्य दस्तावेज नहीं है।",
    grammar: "元 आवश्यक है; 人民币 शुरू में एक बार वैकल्पिक है। वित्तीय अंक, घटती इकाइयाँ और खाली स्थान पर 零। राशि 元 पर खत्म हो तो 整/正 आवश्यक है, 角 पर खत्म हो तो वैकल्पिक है और 分 के बाद निषिद्ध है। 角 बिना 分 हो तो 元零…分 चाहिए। आधिकारिक1680.32 और107000.53 के शून्य रूप समर्थित हैं।",
    normalize: "केवल बाहरी स्पेस और 貳→贰, 陸→陆, 億→亿, 萬→万, 圓→元। अंदर के स्पेस, अक्षर या चिह्न नहीं हटते। दिखाया मानक लेखन एक निश्चित शैली है, एकमात्र स्वीकार्य रूप नहीं।",
    minor: "पूर्णांक फेन", canonical: "मानक वित्तीय लेखन", applied: "बताया सामान्यीकरण लागू किया गया।", invalid: "यह लेखन समर्थित कड़े वित्तीय व्याकरण से बाहर है। इकाइयाँ, शून्य और 整/正 की जगह जाँचें। अक्षर का अनुमान या विलोपन नहीं हुआ; यह कानूनी वैधता का निर्णय नहीं है।",
  },
  id: {
    name: "Huruf besar RMB ke angka", tagline: "Baca nominal keuangan Tionghoa yang didukung menjadi desimal yuan tepat secara lokal, dengan sintaks ketat, batas jelas, tanpa tebakan atau pembulatan.",
    input: "Nominal dalam angka keuangan Tionghoa", scope: "Satu nominal RMB nonnegatif, 0–999999999999.99 yuan; maksimal128 unit UTF-16 mentah. Angka Tionghoa umum, singkatan, negatif, 毫/厘 dan kelompok tidak didukung. Di luar cakupan bukan berarti dokumen tidak sah secara hukum.",
    grammar: "元 wajib; 人民币 opsional sekali di awal. Angka keuangan, unit menurun dan 零 untuk celah. Jika nominal berakhir di 元, 整/正 wajib. Jika berakhir di 角, opsional. Setelah 分, dilarang. Tanpa 角 dengan 分 perlu 元零…分. Mendukung variasi nol resmi1680.32 dan107000.53.",
    normalize: "Hanya spasi luar dan 貳→贰, 陸→陆, 億→亿, 萬→万, 圓→元. Spasi dalam, huruf dan simbol tidak dihapus. Tulisan kanonis yang ditampilkan adalah satu gaya tetap, bukan satu-satunya bentuk yang diterima.",
    minor: "Fen bulat", canonical: "Tulisan keuangan kanonis", applied: "Normalisasi yang diumumkan diterapkan.", invalid: "Tulisan di luar tata bahasa keuangan ketat yang didukung. Periksa unit, nol dan posisi 整/正. Tidak ada tebakan atau penghapusan karakter; bukan keputusan keabsahan hukum.",
  },
  vi: {
    name: "Chữ số tài chính RMB sang số", tagline: "Đọc số tiền tài chính Trung Quốc được hỗ trợ thành số thập phân nhân dân tệ chính xác ngay trên máy, có ngữ pháp chặt và giới hạn rõ, không đoán hay làm tròn.",
    input: "Số tiền bằng chữ số tài chính Trung Quốc", scope: "Một số tiền RMB không âm, 0–999999999999.99 nhân dân tệ; tối đa128 đơn vị UTF-16 gốc. Không hỗ trợ số Trung Quốc thông thường, viết tắt, số âm, 毫/厘 hay nhiều dòng. Ngoài phạm vi không có nghĩa chứng từ vô hiệu pháp lý.",
    grammar: "Bắt buộc có 元; 人民币 tùy chọn một lần ở đầu. Dùng chữ số tài chính, đơn vị giảm dần và 零 ở chỗ khuyết. Nếu số tiền kết thúc ở 元 thì cần 整/正, ở 角 thì tùy chọn và sau 分 thì không được ghi. Không 角 nhưng có 分 cần 元零…分. Hỗ trợ biến thể 零 chính thức1680.32 và107000.53.",
    normalize: "Chỉ khoảng trắng ngoài và 貳→贰, 陸→陆, 億→亿, 萬→万, 圓→元. Không xóa khoảng trắng trong, chữ cái hoặc ký hiệu. Cách viết chuẩn hiển thị là một kiểu cố định, không phải kiểu chấp nhận duy nhất.",
    minor: "Phân nguyên", canonical: "Cách viết tài chính chuẩn", applied: "Đã áp dụng chuẩn hóa đã công bố.", invalid: "Cách viết ngoài ngữ pháp tài chính chặt được hỗ trợ. Kiểm tra đơn vị, 零 và vị trí 整/正. Không đoán hoặc xóa ký tự; không kết luận hiệu lực pháp lý.",
  },
};

export function rmbUppercaseParseError(locale: Locale, error: RmbUppercaseParseError): string {
  if (error === "unsupported_form") return RMB_UPPERCASE_TO_NUMBER_MESSAGES[locale].invalid;
  return RMB_UPPERCASE_MESSAGES[locale].errors[error];
}

export function rmbUppercaseToNumberCopy(): Record<Locale, ToolCopy> {
  return Object.fromEntries(LOCALES.map(locale => {
    const l = RMB_UPPERCASE_TO_NUMBER_MESSAGES[locale], common = RMB_UPPERCASE_MESSAGES[locale];
    return [locale, { name: l.name, tagline: l.tagline, intro: [l.scope, l.grammar, l.normalize, common.sourceDetail, common.localNote],
      steps: [l.input, l.grammar, common.useStep], faqs: [
        { q: common.questionScope, a: l.scope }, { q: common.questionStyle, a: l.grammar + " " + l.normalize }, { q: common.questionPrivacy, a: common.localNote },
      ], deepDive: rmbDeepDive("toNumber", locale) }];
  })) as Record<Locale, ToolCopy>;
}
