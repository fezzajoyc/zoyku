import { LOCALES, type Locale } from "@/lib/site";
import type { ToolCopy } from "./types";
import type { LineNumbersError } from "./line-numbers";
import { lineNumberDeepDive } from "./deepdive-text";

type Messages = {
  name: string; tagline: string; rules: string; limits: string; privacy: string;
  input: string; output: string; position: string; prefix: string; suffix: string;
  start: string; step: string; padding: string; auto: string; none: string; width: string;
  separator: string; literal: string; sample: string; clear: string; copy: string;
  copied: string; copyFailed: string; empty: string; lines: string;
  step1: string; step2: string; step3: string; emptyQ: string; limitQ: string;
  invalid: string; inputType: string; inputLimit: string; outputLimit: string; lineLimit: string;
  numberLimit: string; separatorLimit: string;
};

/** All runtime strings and ToolDef page copy are authored in all 15 locales. */
export const LINE_NUMBER_MESSAGES: Record<Locale, Messages> = {
  en: {
    name: "Line Number Generator",
    tagline: "Add line numbers before or after each text line, choose the start and step, align with spaces, and copy the result locally without changing your text.",
    rules: "Blank lines are numbered, including the final empty line after a trailing newline. Empty input produces no result. CRLF and CR become LF. Padding adds spaces without shortening numbers; auto width follows the last number. Separators are used literally; escapes and templates are not expanded.",
    limits: "Up to 100,000 input UTF-16 units, 300,000 output units and 10,000 lines. Separators allow 64 units. Start: 0–1,000,000,000; step: 1–1,000,000; padding: 0–12 spaces of minimum width, or auto.",
    privacy: "Numbering runs in your browser. Text is not uploaded or saved by this tool.",
    input: "Text to number", output: "Numbered text", position: "Number position", prefix: "Before each line", suffix: "After each line",
    start: "Start number", step: "Step", padding: "Number alignment", auto: "Auto width", none: "No padding", width: "Minimum width",
    separator: "Separator", literal: "Literal text; no escape or template processing.", sample: "Use sample", clear: "Clear", copy: "Copy result",
    copied: "Copied.", copyFailed: "Could not copy. Select and copy the result manually.", empty: "Paste text or try the sample to see numbered lines.", lines: "Numbered lines",
    step1: "Paste text, preserving any blank lines you want numbered.", step2: "Choose placement, start, step, space alignment and a literal separator.", step3: "Check the live result and copy it when ready.",
    emptyQ: "How are blank lines and line endings handled?", limitQ: "What are the limits?",
    invalid: "Choose a supported setting.", inputType: "Enter text to number.", inputLimit: "Input exceeds 100,000 UTF-16 units. Shorten it and retry.",
    outputLimit: "Result exceeds 300,000 UTF-16 units. Use fewer lines or a shorter separator or padding width.", lineLimit: "Input exceeds 10,000 lines, counting a final empty line.",
    numberLimit: "The final line number would exceed the safe integer range.", separatorLimit: "Use a text separator of at most 64 UTF-16 units.",
  },
  zh: {
    name: "文本增加行号",
    tagline: "为多行文本在行首或行尾添加行号，自定义起始数字、步长、空格对齐和字面分隔符，保留中文、空白和末尾空行，在浏览器本地预览并复制。",
    rules: "空白行也编号，末尾换行会产生一个需要编号的空行；完全空的输入不输出结果。CRLF 和 CR 统一为 LF。对齐只在数字前补空格，不截短数字；自动宽度按最后一个行号计算。分隔符按字面使用，不展开转义或模板。",
    limits: "输入最多 100,000 个 UTF-16 单位，输出最多 300,000 个，最多 10,000 行。分隔符最多 64 个单位。起始号 0–1,000,000,000，步长 1–1,000,000；最小数字宽度 0–12，或选自动。",
    privacy: "编号在浏览器本地完成，本工具不上传或保存文本。",
    input: "待编号文本", output: "编号结果", position: "行号位置", prefix: "每行之前", suffix: "每行之后",
    start: "起始行号", step: "步长", padding: "数字对齐", auto: "自动宽度", none: "不补空格", width: "最小宽度",
    separator: "分隔符", literal: "按字面使用，不处理转义或模板。", sample: "使用示例", clear: "清空", copy: "复制结果",
    copied: "已复制。", copyFailed: "复制失败，请选中结果手动复制。", empty: "粘贴文本或使用示例，即可预览编号结果。", lines: "已编号行数",
    step1: "粘贴文本，保留需要编号的空白行。", step2: "设置行首或行尾、起始号、步长、空格对齐和分隔符。", step3: "检查实时结果，确认后复制。",
    emptyQ: "空白行和换行如何处理？", limitQ: "有哪些使用限制？",
    invalid: "请选择支持的设置。", inputType: "请输入文本。", inputLimit: "输入超过 100,000 个 UTF-16 单位，请缩短文本。",
    outputLimit: "结果超过 300,000 个 UTF-16 单位，请减少行数、对齐宽度或分隔符长度。", lineLimit: "输入超过 10,000 行，末尾空行也计入行数。",
    numberLimit: "最终行号超出安全整数范围。", separatorLimit: "分隔符必须是文本，且不超过 64 个 UTF-16 单位。",
  },
  ja: {
    name: "行番号ジェネレーター",
    tagline: "テキストの各行の前後に行番号を追加。開始番号、増分、空白による桁揃え、区切り文字を指定し、空行を保ったままブラウザー内で確認してコピーできます。",
    rules: "空行にも番号を付け、末尾の改行後の空行も数えます。空入力では結果を作りません。CRLF と CR は LF に統一します。桁揃えには空白を使い、数字は切り詰めません。自動幅は最後の番号に合わせます。区切り文字はそのまま使い、エスケープやテンプレートは展開しません。",
    limits: "入力は UTF-16 単位で 100,000、出力は 300,000、行数は 10,000 まで。区切りは 64 単位まで。開始番号は 0–1,000,000,000、増分は 1–1,000,000、最小桁幅は 0–12 または自動です。",
    privacy: "処理はブラウザー内で行います。このツールはテキストを送信・保存しません。",
    input: "番号を付けるテキスト", output: "番号付きテキスト", position: "番号の位置", prefix: "各行の前", suffix: "各行の後",
    start: "開始番号", step: "増分", padding: "桁揃え", auto: "自動幅", none: "空白なし", width: "最小桁幅",
    separator: "区切り文字", literal: "文字をそのまま使用。エスケープやテンプレートは展開しません。", sample: "例を使う", clear: "クリア", copy: "結果をコピー",
    copied: "コピーしました。", copyFailed: "コピーできません。結果を選択して手動でコピーしてください。", empty: "テキストを貼り付けるか、例を使って結果を確認してください。", lines: "番号を付けた行数",
    step1: "番号を付けたい空行を保ってテキストを貼り付けます。", step2: "位置、開始番号、増分、桁揃え、区切り文字を選びます。", step3: "リアルタイムの結果を確認してコピーします。",
    emptyQ: "空行と改行はどう扱われますか？", limitQ: "制限はありますか？",
    invalid: "対応する設定を選んでください。", inputType: "テキストを入力してください。", inputLimit: "入力が UTF-16 単位で 100,000 を超えています。短くしてください。",
    outputLimit: "結果が UTF-16 単位で 300,000 を超えています。行数、区切り、桁幅を減らしてください。", lineLimit: "末尾の空行を含めて 10,000 行を超えています。",
    numberLimit: "最後の行番号が安全な整数の範囲を超えます。", separatorLimit: "区切り文字は UTF-16 単位で 64 以内のテキストにしてください。",
  },
  es: {
    name: "Generador de números de línea",
    tagline: "Añade números antes o después de cada línea, elige el inicio y el incremento, alinea con espacios y copia el resultado localmente conservando el texto.",
    rules: "Se numeran las líneas vacías, incluida la última tras un salto final. Una entrada vacía no genera resultado. CRLF y CR pasan a LF. La alineación añade espacios sin recortar números; el ancho automático usa el último número. El separador se usa literalmente, sin expandir escapes ni plantillas.",
    limits: "Máximo: 100,000 unidades UTF-16 de entrada, 300,000 de salida y 10,000 líneas. Separador: 64 unidades. Inicio: 0–1,000,000,000; incremento: 1–1,000,000; ancho mínimo: 0–12 o automático.",
    privacy: "La numeración se realiza en el navegador. Esta herramienta no sube ni guarda tu texto.",
    input: "Texto que numerar", output: "Texto numerado", position: "Posición del número", prefix: "Antes de cada línea", suffix: "Después de cada línea",
    start: "Número inicial", step: "Incremento", padding: "Alineación", auto: "Ancho automático", none: "Sin relleno", width: "Ancho mínimo",
    separator: "Separador", literal: "Texto literal; no se procesan escapes ni plantillas.", sample: "Usar ejemplo", clear: "Borrar", copy: "Copiar resultado",
    copied: "Copiado.", copyFailed: "No se pudo copiar. Selecciona el resultado y cópialo manualmente.", empty: "Pega texto o prueba el ejemplo para ver líneas numeradas.", lines: "Líneas numeradas",
    step1: "Pega el texto conservando las líneas vacías que quieras numerar.", step2: "Elige posición, inicio, incremento, alineación y separador literal.", step3: "Revisa el resultado en directo y cópialo.",
    emptyQ: "¿Cómo se tratan las líneas vacías y los saltos?", limitQ: "¿Cuáles son los límites?",
    invalid: "Elige una opción admitida.", inputType: "Introduce texto para numerar.", inputLimit: "La entrada supera 100,000 unidades UTF-16. Acórtala.",
    outputLimit: "El resultado supera 300,000 unidades UTF-16. Reduce las líneas, el separador o el ancho.", lineLimit: "La entrada supera 10,000 líneas, incluida la última vacía.",
    numberLimit: "El último número supera el rango de enteros seguros.", separatorLimit: "Usa un separador de texto de hasta 64 unidades UTF-16.",
  },
  pt: {
    name: "Gerador de números de linha",
    tagline: "Adicione números antes ou depois de cada linha, escolha o início e o incremento, alinhe com espaços e copie o resultado localmente preservando o texto.",
    rules: "Linhas vazias recebem números, inclusive a última após uma quebra final. Uma entrada vazia não gera resultado. CRLF e CR viram LF. O alinhamento adiciona espaços sem cortar números; a largura automática segue o último número. O separador é literal, sem expandir escapes ou modelos.",
    limits: "Máximo: 100,000 unidades UTF-16 na entrada, 300,000 na saída e 10,000 linhas. Separador: 64 unidades. Início: 0–1,000,000,000; incremento: 1–1,000,000; largura mínima: 0–12 ou automática.",
    privacy: "A numeração acontece no navegador. Esta ferramenta não envia nem salva seu texto.",
    input: "Texto a numerar", output: "Texto numerado", position: "Posição do número", prefix: "Antes de cada linha", suffix: "Depois de cada linha",
    start: "Número inicial", step: "Incremento", padding: "Alinhamento", auto: "Largura automática", none: "Sem preenchimento", width: "Largura mínima",
    separator: "Separador", literal: "Texto literal; sem processamento de escapes ou modelos.", sample: "Usar exemplo", clear: "Limpar", copy: "Copiar resultado",
    copied: "Copiado.", copyFailed: "Não foi possível copiar. Selecione e copie o resultado manualmente.", empty: "Cole texto ou use o exemplo para ver linhas numeradas.", lines: "Linhas numeradas",
    step1: "Cole o texto mantendo as linhas vazias que deseja numerar.", step2: "Escolha posição, início, incremento, alinhamento e separador literal.", step3: "Confira o resultado em tempo real e copie.",
    emptyQ: "Como são tratadas linhas vazias e quebras?", limitQ: "Quais são os limites?",
    invalid: "Escolha uma configuração aceita.", inputType: "Digite o texto a numerar.", inputLimit: "A entrada excede 100,000 unidades UTF-16. Reduza o texto.",
    outputLimit: "O resultado excede 300,000 unidades UTF-16. Reduza linhas, separador ou largura.", lineLimit: "A entrada excede 10,000 linhas, incluindo a última vazia.",
    numberLimit: "O último número ultrapassa a faixa de inteiros seguros.", separatorLimit: "Use um separador de texto com até 64 unidades UTF-16.",
  },
  fr: {
    name: "Générateur de numéros de ligne",
    tagline: "Ajoutez des numéros avant ou après chaque ligne, choisissez le départ et le pas, alignez avec des espaces et copiez le résultat localement en préservant le texte.",
    rules: "Les lignes vides sont numérotées, y compris celle après un saut final. Une entrée vide ne produit rien. CRLF et CR deviennent LF. L’alignement ajoute des espaces sans raccourcir les nombres ; la largeur automatique suit le dernier numéro. Le séparateur reste littéral, sans interpréter les échappements ni les modèles.",
    limits: "Maximum : 100,000 unités UTF-16 en entrée, 300,000 en sortie et 10,000 lignes. Séparateur : 64 unités. Départ : 0–1,000,000,000 ; pas : 1–1,000,000 ; largeur minimale : 0–12 ou automatique.",
    privacy: "La numérotation se fait dans le navigateur. Cet outil ne transmet ni n’enregistre votre texte.",
    input: "Texte à numéroter", output: "Texte numéroté", position: "Position du numéro", prefix: "Avant chaque ligne", suffix: "Après chaque ligne",
    start: "Numéro de départ", step: "Pas", padding: "Alignement", auto: "Largeur automatique", none: "Sans espaces ajoutés", width: "Largeur minimale",
    separator: "Séparateur", literal: "Texte littéral, sans interpréter les échappements ni les modèles.", sample: "Utiliser l’exemple", clear: "Effacer", copy: "Copier le résultat",
    copied: "Copié.", copyFailed: "Copie impossible. Sélectionnez et copiez le résultat manuellement.", empty: "Collez du texte ou essayez l’exemple pour voir les lignes numérotées.", lines: "Lignes numérotées",
    step1: "Collez le texte en conservant les lignes vides à numéroter.", step2: "Choisissez la position, le départ, le pas, l’alignement et le séparateur littéral.", step3: "Vérifiez le résultat en direct puis copiez-le.",
    emptyQ: "Comment les lignes vides et les fins de ligne sont-elles traitées ?", limitQ: "Quelles sont les limites ?",
    invalid: "Choisissez un réglage pris en charge.", inputType: "Saisissez le texte à numéroter.", inputLimit: "L’entrée dépasse 100,000 unités UTF-16. Raccourcissez-la.",
    outputLimit: "Le résultat dépasse 300,000 unités UTF-16. Réduisez les lignes, le séparateur ou la largeur.", lineLimit: "L’entrée dépasse 10,000 lignes, y compris la dernière ligne vide.",
    numberLimit: "Le dernier numéro dépasse la plage des entiers sûrs.", separatorLimit: "Utilisez un séparateur texte de 64 unités UTF-16 maximum.",
  },
  de: {
    name: "Zeilennummern-Generator",
    tagline: "Füge Nummern vor oder nach jeder Textzeile ein, wähle Start und Schritt, richte sie mit Leerzeichen aus und kopiere das Ergebnis lokal ohne Textverlust.",
    rules: "Auch leere Zeilen werden nummeriert, einschließlich der letzten Leerzeile nach einem Zeilenumbruch. Leere Eingabe erzeugt kein Ergebnis. CRLF und CR werden zu LF. Die Ausrichtung ergänzt Leerzeichen, kürzt aber keine Zahlen; automatisch gilt die Breite der letzten Nummer. Trennzeichen bleiben wörtlich, ohne Escape- oder Vorlagenauswertung.",
    limits: "Höchstens 100,000 UTF-16-Einheiten Eingabe, 300,000 Ausgabe und 10,000 Zeilen. Trennzeichen: 64 Einheiten. Start: 0–1,000,000,000; Schritt: 1–1,000,000; Mindestbreite: 0–12 oder automatisch.",
    privacy: "Die Nummerierung läuft im Browser. Dieses Werkzeug lädt deinen Text weder hoch noch speichert es ihn.",
    input: "Zu nummerierender Text", output: "Nummerierter Text", position: "Position der Nummer", prefix: "Vor jeder Zeile", suffix: "Nach jeder Zeile",
    start: "Startnummer", step: "Schritt", padding: "Zahlenausrichtung", auto: "Automatische Breite", none: "Ohne Auffüllung", width: "Mindestbreite",
    separator: "Trennzeichen", literal: "Wörtlicher Text; keine Escape- oder Vorlagenauswertung.", sample: "Beispiel einsetzen", clear: "Leeren", copy: "Ergebnis kopieren",
    copied: "Kopiert.", copyFailed: "Kopieren fehlgeschlagen. Bitte das Ergebnis markieren und manuell kopieren.", empty: "Füge Text ein oder nutze das Beispiel, um nummerierte Zeilen zu sehen.", lines: "Nummerierte Zeilen",
    step1: "Füge den Text mit allen zu nummerierenden Leerzeilen ein.", step2: "Wähle Position, Start, Schritt, Ausrichtung und wörtliches Trennzeichen.", step3: "Prüfe die Live-Ausgabe und kopiere sie.",
    emptyQ: "Wie werden Leerzeilen und Zeilenenden behandelt?", limitQ: "Welche Grenzen gelten?",
    invalid: "Wähle eine unterstützte Einstellung.", inputType: "Gib Text zum Nummerieren ein.", inputLimit: "Die Eingabe überschreitet 100,000 UTF-16-Einheiten. Kürze den Text.",
    outputLimit: "Das Ergebnis überschreitet 300,000 UTF-16-Einheiten. Verringere Zeilen, Trennzeichen oder Breite.", lineLimit: "Die Eingabe überschreitet 10,000 Zeilen einschließlich der letzten Leerzeile.",
    numberLimit: "Die letzte Nummer überschreitet den sicheren Ganzzahlbereich.", separatorLimit: "Nutze ein Texttrennzeichen mit höchstens 64 UTF-16-Einheiten.",
  },
  ru: {
    name: "Нумерация строк",
    tagline: "Добавляйте номера перед строками или после них, задавайте начало и шаг, выравнивайте пробелами и копируйте результат в браузере с сохранением текста.",
    rules: "Пустые строки тоже нумеруются, включая последнюю после завершающего переноса. Пустой ввод не даёт результата. CRLF и CR заменяются на LF. Для выравнивания добавляются пробелы, числа не обрезаются; автоматическая ширина определяется последним номером. Разделитель используется буквально, без обработки шаблонов и escape-последовательностей.",
    limits: "До 100,000 единиц UTF-16 на входе, 300,000 на выходе и 10,000 строк. Разделитель: до 64 единиц. Начало: 0–1,000,000,000; шаг: 1–1,000,000; минимальная ширина: 0–12 или авто.",
    privacy: "Нумерация выполняется в браузере. Инструмент не отправляет и не сохраняет текст.",
    input: "Текст для нумерации", output: "Текст с номерами", position: "Положение номера", prefix: "Перед каждой строкой", suffix: "После каждой строки",
    start: "Начальный номер", step: "Шаг", padding: "Выравнивание чисел", auto: "Автоматическая ширина", none: "Без заполнения", width: "Минимальная ширина",
    separator: "Разделитель", literal: "Буквальный текст, без обработки шаблонов и escape-последовательностей.", sample: "Вставить пример", clear: "Очистить", copy: "Копировать результат",
    copied: "Скопировано.", copyFailed: "Не удалось скопировать. Выделите результат и скопируйте вручную.", empty: "Вставьте текст или пример, чтобы увидеть нумерацию.", lines: "Пронумеровано строк",
    step1: "Вставьте текст, сохранив нужные пустые строки.", step2: "Выберите положение, начало, шаг, выравнивание и разделитель.", step3: "Проверьте результат и скопируйте его.",
    emptyQ: "Как обрабатываются пустые строки и переносы?", limitQ: "Какие есть ограничения?",
    invalid: "Выберите допустимую настройку.", inputType: "Введите текст для нумерации.", inputLimit: "Ввод превышает 100,000 единиц UTF-16. Сократите текст.",
    outputLimit: "Результат превышает 300,000 единиц UTF-16. Уменьшите число строк, разделитель или ширину.", lineLimit: "Более 10,000 строк, включая последнюю пустую.",
    numberLimit: "Последний номер выходит за безопасный диапазон целых чисел.", separatorLimit: "Разделитель должен быть текстом длиной до 64 единиц UTF-16.",
  },
  it: {
    name: "Generatore di numeri di riga",
    tagline: "Aggiungi numeri prima o dopo ogni riga, scegli il numero iniziale e il passo, allinea con spazi e copia il risultato nel browser preservando il testo.",
    rules: "Si numerano anche le righe vuote, inclusa quella dopo un ritorno a capo finale. Un input vuoto non produce risultati. CRLF e CR diventano LF. L’allineamento aggiunge spazi senza troncare i numeri; la larghezza automatica segue l’ultimo numero. Il separatore è letterale, senza espandere escape o modelli.",
    limits: "Fino a 100,000 unità UTF-16 in ingresso, 300,000 in uscita e 10,000 righe. Separatore: 64 unità. Inizio: 0–1,000,000,000; passo: 1–1,000,000; larghezza minima: 0–12 o automatica.",
    privacy: "La numerazione avviene nel browser. Questo strumento non carica né salva il testo.",
    input: "Testo da numerare", output: "Testo numerato", position: "Posizione del numero", prefix: "Prima di ogni riga", suffix: "Dopo ogni riga",
    start: "Numero iniziale", step: "Passo", padding: "Allineamento", auto: "Larghezza automatica", none: "Senza spazi aggiunti", width: "Larghezza minima",
    separator: "Separatore", literal: "Testo letterale; escape e modelli non vengono elaborati.", sample: "Usa esempio", clear: "Cancella", copy: "Copia risultato",
    copied: "Copiato.", copyFailed: "Impossibile copiare. Seleziona e copia manualmente il risultato.", empty: "Incolla testo o usa l’esempio per vedere le righe numerate.", lines: "Righe numerate",
    step1: "Incolla il testo mantenendo le righe vuote da numerare.", step2: "Scegli posizione, inizio, passo, allineamento e separatore letterale.", step3: "Controlla il risultato in tempo reale e copialo.",
    emptyQ: "Come vengono gestite le righe vuote e le interruzioni?", limitQ: "Quali sono i limiti?",
    invalid: "Scegli un’impostazione supportata.", inputType: "Inserisci il testo da numerare.", inputLimit: "L’input supera 100,000 unità UTF-16. Accorcialo.",
    outputLimit: "Il risultato supera 300,000 unità UTF-16. Riduci righe, separatore o larghezza.", lineLimit: "L’input supera 10,000 righe, inclusa quella vuota finale.",
    numberLimit: "L’ultimo numero supera l’intervallo degli interi sicuri.", separatorLimit: "Usa un separatore di testo di massimo 64 unità UTF-16.",
  },
  tr: {
    name: "Satır numarası oluşturucu",
    tagline: "Her satırın önüne veya sonuna numara ekleyin, başlangıç ve artışı seçin, boşluklarla hizalayın ve metni koruyan sonucu tarayıcıda yerel olarak kopyalayın.",
    rules: "Sondaki satır sonundan sonraki boş satır dahil tüm boş satırlar numaralanır. Boş giriş sonuç üretmez. CRLF ve CR, LF olur. Hizalama boşluk ekler, sayıları kesmez; otomatik genişlik son numaraya göre belirlenir. Ayırıcı aynen kullanılır; kaçışlar ve şablonlar açılmaz.",
    limits: "En çok 100,000 UTF-16 giriş birimi, 300,000 çıkış birimi ve 10,000 satır. Ayırıcı: 64 birim. Başlangıç: 0–1,000,000,000; artış: 1–1,000,000; asgari genişlik: 0–12 veya otomatik.",
    privacy: "Numaralama tarayıcıda çalışır. Bu araç metninizi yüklemez veya kaydetmez.",
    input: "Numaralanacak metin", output: "Numaralı metin", position: "Numara konumu", prefix: "Her satırın önünde", suffix: "Her satırın sonunda",
    start: "Başlangıç numarası", step: "Artış", padding: "Sayı hizalama", auto: "Otomatik genişlik", none: "Dolgu yok", width: "Asgari genişlik",
    separator: "Ayırıcı", literal: "Düz metin; kaçışlar veya şablonlar işlenmez.", sample: "Örneği kullan", clear: "Temizle", copy: "Sonucu kopyala",
    copied: "Kopyalandı.", copyFailed: "Kopyalanamadı. Sonucu seçip elle kopyalayın.", empty: "Numaralı satırları görmek için metin yapıştırın veya örneği kullanın.", lines: "Numaralanan satırlar",
    step1: "Numaralanacak boş satırları koruyarak metni yapıştırın.", step2: "Konum, başlangıç, artış, hizalama ve düz metin ayırıcı seçin.", step3: "Canlı sonucu kontrol edip kopyalayın.",
    emptyQ: "Boş satırlar ve satır sonları nasıl işlenir?", limitQ: "Sınırlar nelerdir?",
    invalid: "Desteklenen bir ayar seçin.", inputType: "Numaralanacak metni girin.", inputLimit: "Giriş 100,000 UTF-16 birimini aşıyor. Metni kısaltın.",
    outputLimit: "Sonuç 300,000 UTF-16 birimini aşıyor. Satırları, ayırıcıyı veya genişliği azaltın.", lineLimit: "Son boş satır dahil 10,000 satır sınırı aşıldı.",
    numberLimit: "Son satır numarası güvenli tam sayı aralığını aşıyor.", separatorLimit: "En fazla 64 UTF-16 birimlik metin ayırıcı kullanın.",
  },
  ko: {
    name: "줄 번호 생성기",
    tagline: "텍스트 각 줄의 앞이나 뒤에 번호를 붙이고, 시작 번호와 증가값 및 공백 정렬을 설정하세요. 원문과 빈 줄을 보존하며 브라우저에서 바로 확인하고 복사할 수 있습니다.",
    rules: "마지막 줄바꿈 뒤의 빈 줄을 포함해 빈 줄에도 번호를 붙입니다. 입력이 비어 있으면 결과를 만들지 않습니다. CRLF와 CR은 LF로 통일합니다. 정렬은 공백을 추가하며 숫자를 자르지 않습니다. 자동 너비는 마지막 번호를 따릅니다. 구분자는 그대로 사용하며 이스케이프나 템플릿을 해석하지 않습니다.",
    limits: "입력은 UTF-16 단위 100,000개, 출력 300,000개, 줄 수 10,000개까지입니다. 구분자는 64단위까지입니다. 시작 번호 0–1,000,000,000, 증가값 1–1,000,000, 최소 너비 0–12 또는 자동을 선택합니다.",
    privacy: "번호 생성은 브라우저에서 실행됩니다. 이 도구는 텍스트를 업로드하거나 저장하지 않습니다.",
    input: "번호를 붙일 텍스트", output: "번호가 붙은 텍스트", position: "번호 위치", prefix: "각 줄 앞", suffix: "각 줄 뒤",
    start: "시작 번호", step: "증가값", padding: "숫자 정렬", auto: "자동 너비", none: "공백 추가 없음", width: "최소 너비",
    separator: "구분자", literal: "입력한 문자를 그대로 사용하며 이스케이프나 템플릿을 해석하지 않습니다.", sample: "예제 사용", clear: "지우기", copy: "결과 복사",
    copied: "복사했습니다.", copyFailed: "복사하지 못했습니다. 결과를 선택해 직접 복사하세요.", empty: "텍스트를 붙여넣거나 예제를 사용해 번호를 확인하세요.", lines: "번호를 붙인 줄 수",
    step1: "번호를 붙일 빈 줄을 유지하여 텍스트를 붙여넣습니다.", step2: "위치, 시작 번호, 증가값, 공백 정렬과 구분자를 선택합니다.", step3: "실시간 결과를 확인한 뒤 복사합니다.",
    emptyQ: "빈 줄과 줄바꿈은 어떻게 처리하나요?", limitQ: "어떤 제한이 있나요?",
    invalid: "지원하는 설정을 선택하세요.", inputType: "번호를 붙일 텍스트를 입력하세요.", inputLimit: "입력이 UTF-16 단위 100,000개를 초과합니다. 텍스트를 줄이세요.",
    outputLimit: "결과가 UTF-16 단위 300,000개를 초과합니다. 줄 수, 구분자 또는 너비를 줄이세요.", lineLimit: "마지막 빈 줄을 포함해 10,000줄을 초과합니다.",
    numberLimit: "마지막 줄 번호가 안전한 정수 범위를 벗어납니다.", separatorLimit: "구분자는 UTF-16 단위 64개 이하인 텍스트여야 합니다.",
  },
  ar: {
    name: "مولّد أرقام الأسطر",
    tagline: "أضف أرقامًا قبل كل سطر أو بعده، وحدد البداية والزيادة والمحاذاة بالمسافات، ثم انسخ النتيجة محليًا في المتصفح مع الحفاظ على النص والأسطر الفارغة.",
    rules: "تُرقّم الأسطر الفارغة، بما فيها السطر الفارغ بعد فاصل السطر الأخير. لا ينتج الإدخال الفارغ نتيجة. تتحول CRLF وCR إلى LF. تضيف المحاذاة مسافات دون اقتطاع الأرقام، ويتبع العرض التلقائي الرقم الأخير. يُستخدم الفاصل حرفيًا دون تفسير تسلسلات الهروب أو القوالب.",
    limits: "الحدود: 100,000 وحدة UTF-16 للإدخال و300,000 للإخراج و10,000 سطر. الفاصل حتى 64 وحدة. البداية 0–1,000,000,000، والزيادة 1–1,000,000، والعرض الأدنى 0–12 أو تلقائي.",
    privacy: "تجري إضافة الأرقام في المتصفح. لا ترفع هذه الأداة النص ولا تحفظه.",
    input: "النص المراد ترقيمه", output: "النص المرقّم", position: "موضع الرقم", prefix: "قبل كل سطر", suffix: "بعد كل سطر",
    start: "رقم البداية", step: "الزيادة", padding: "محاذاة الأرقام", auto: "عرض تلقائي", none: "دون حشو", width: "العرض الأدنى",
    separator: "الفاصل", literal: "نص حرفي دون معالجة تسلسلات الهروب أو القوالب.", sample: "استخدام مثال", clear: "مسح", copy: "نسخ النتيجة",
    copied: "تم النسخ.", copyFailed: "تعذر النسخ. حدد النتيجة وانسخها يدويًا.", empty: "ألصق نصًا أو استخدم المثال لعرض الأسطر المرقّمة.", lines: "الأسطر المرقّمة",
    step1: "ألصق النص مع إبقاء الأسطر الفارغة التي تريد ترقيمها.", step2: "اختر الموضع والبداية والزيادة والمحاذاة والفاصل الحرفي.", step3: "راجع النتيجة المباشرة ثم انسخها.",
    emptyQ: "كيف تُعالج الأسطر الفارغة وفواصل الأسطر؟", limitQ: "ما الحدود المتاحة؟",
    invalid: "اختر إعدادًا مدعومًا.", inputType: "أدخل نصًا لترقيمه.", inputLimit: "يتجاوز الإدخال 100,000 وحدة UTF-16. اختصر النص.",
    outputLimit: "تتجاوز النتيجة 300,000 وحدة UTF-16. قلل الأسطر أو طول الفاصل أو العرض.", lineLimit: "يتجاوز الإدخال 10,000 سطر، بما فيه السطر الفارغ الأخير.",
    numberLimit: "يتجاوز رقم السطر الأخير نطاق الأعداد الصحيحة الآمنة.", separatorLimit: "استخدم فاصلًا نصيًا لا يتجاوز 64 وحدة UTF-16.",
  },
  hi: {
    name: "पंक्ति संख्या जनरेटर",
    tagline: "हर पंक्ति के पहले या बाद में संख्या जोड़ें, शुरुआत और अंतर चुनें, खाली जगह से संरेखित करें और मूल पाठ व खाली पंक्तियाँ बचाते हुए ब्राउज़र में परिणाम कॉपी करें।",
    rules: "अंतिम लाइन ब्रेक के बाद की खाली पंक्ति सहित सभी खाली पंक्तियों को संख्या मिलती है। खाली इनपुट से परिणाम नहीं बनता। CRLF और CR को LF किया जाता है। संरेखण केवल स्पेस जोड़ता है, संख्या काटता नहीं; स्वतः चौड़ाई अंतिम संख्या के अनुसार होती है। विभाजक ज्यों का त्यों लगता है; एस्केप या टेम्पलेट नहीं खोले जाते।",
    limits: "इनपुट अधिकतम 100,000 UTF-16 इकाइयाँ, आउटपुट 300,000 और 10,000 पंक्तियाँ। विभाजक 64 इकाइयों तक। शुरुआत 0–1,000,000,000; अंतर 1–1,000,000; न्यूनतम चौड़ाई 0–12 या स्वतः।",
    privacy: "क्रमांकन ब्राउज़र में होता है। यह टूल आपका पाठ अपलोड या सहेजता नहीं है।",
    input: "क्रमांक देने वाला पाठ", output: "क्रमांकित पाठ", position: "संख्या का स्थान", prefix: "हर पंक्ति के पहले", suffix: "हर पंक्ति के बाद",
    start: "शुरुआती संख्या", step: "अंतर", padding: "संख्या संरेखण", auto: "स्वतः चौड़ाई", none: "बिना अतिरिक्त स्पेस", width: "न्यूनतम चौड़ाई",
    separator: "विभाजक", literal: "शाब्दिक पाठ; एस्केप या टेम्पलेट संसाधित नहीं होते।", sample: "उदाहरण लगाएँ", clear: "साफ़ करें", copy: "परिणाम कॉपी करें",
    copied: "कॉपी हो गया।", copyFailed: "कॉपी नहीं हो सका। परिणाम चुनकर स्वयं कॉपी करें।", empty: "क्रमांकित पंक्तियाँ देखने के लिए पाठ चिपकाएँ या उदाहरण लगाएँ।", lines: "क्रमांकित पंक्तियाँ",
    step1: "जिन खाली पंक्तियों को क्रमांक देना है उन्हें रखते हुए पाठ चिपकाएँ।", step2: "स्थान, शुरुआत, अंतर, स्पेस संरेखण और शाब्दिक विभाजक चुनें।", step3: "तुरंत दिखता परिणाम जाँचें और कॉपी करें।",
    emptyQ: "खाली पंक्तियाँ और लाइन ब्रेक कैसे सँभाले जाते हैं?", limitQ: "क्या सीमाएँ हैं?",
    invalid: "समर्थित सेटिंग चुनें।", inputType: "क्रमांक देने के लिए पाठ दर्ज करें।", inputLimit: "इनपुट 100,000 UTF-16 इकाइयों से अधिक है। इसे छोटा करें।",
    outputLimit: "परिणाम 300,000 UTF-16 इकाइयों से अधिक है। पंक्तियाँ, विभाजक या चौड़ाई घटाएँ।", lineLimit: "अंतिम खाली पंक्ति सहित इनपुट 10,000 पंक्तियों से अधिक है।",
    numberLimit: "अंतिम पंक्ति संख्या सुरक्षित पूर्णांक सीमा से बाहर होगी।", separatorLimit: "अधिकतम 64 UTF-16 इकाइयों का पाठ विभाजक लगाएँ।",
  },
  id: {
    name: "Pembuat nomor baris",
    tagline: "Tambahkan nomor sebelum atau sesudah tiap baris, atur awal dan langkah, ratakan dengan spasi, lalu salin hasil secara lokal tanpa mengubah isi teks Anda.",
    rules: "Baris kosong ikut diberi nomor, termasuk baris kosong setelah akhir baris terakhir. Masukan kosong tidak menghasilkan keluaran. CRLF dan CR diubah menjadi LF. Perataan menambah spasi tanpa memotong angka; lebar otomatis mengikuti nomor terakhir. Pemisah dipakai secara harfiah, tanpa mengembangkan escape atau templat.",
    limits: "Maksimal 100,000 unit UTF-16 masukan, 300,000 keluaran dan 10,000 baris. Pemisah: 64 unit. Awal: 0–1,000,000,000; langkah: 1–1,000,000; lebar minimum: 0–12 atau otomatis.",
    privacy: "Penomoran berjalan di browser. Alat ini tidak mengunggah atau menyimpan teks Anda.",
    input: "Teks yang diberi nomor", output: "Teks bernomor", position: "Posisi nomor", prefix: "Sebelum tiap baris", suffix: "Sesudah tiap baris",
    start: "Nomor awal", step: "Langkah", padding: "Perataan angka", auto: "Lebar otomatis", none: "Tanpa tambahan spasi", width: "Lebar minimum",
    separator: "Pemisah", literal: "Teks harfiah; escape dan templat tidak diproses.", sample: "Gunakan contoh", clear: "Bersihkan", copy: "Salin hasil",
    copied: "Disalin.", copyFailed: "Tidak dapat menyalin. Pilih hasil dan salin secara manual.", empty: "Tempel teks atau gunakan contoh untuk melihat baris bernomor.", lines: "Baris bernomor",
    step1: "Tempel teks dan pertahankan baris kosong yang ingin diberi nomor.", step2: "Pilih posisi, awal, langkah, perataan dan pemisah harfiah.", step3: "Periksa hasil langsung lalu salin.",
    emptyQ: "Bagaimana baris kosong dan akhir baris ditangani?", limitQ: "Apa batasnya?",
    invalid: "Pilih pengaturan yang didukung.", inputType: "Masukkan teks yang ingin diberi nomor.", inputLimit: "Masukan melebihi 100,000 unit UTF-16. Persingkat teks.",
    outputLimit: "Hasil melebihi 300,000 unit UTF-16. Kurangi baris, pemisah atau lebar.", lineLimit: "Masukan melebihi 10,000 baris, termasuk baris kosong terakhir.",
    numberLimit: "Nomor baris terakhir melampaui rentang bilangan bulat aman.", separatorLimit: "Gunakan pemisah teks hingga 64 unit UTF-16.",
  },
  vi: {
    name: "Tạo số dòng",
    tagline: "Thêm số trước hoặc sau mỗi dòng, chọn số bắt đầu và bước tăng, căn bằng dấu cách rồi sao chép kết quả ngay trong trình duyệt, giữ nguyên nội dung văn bản.",
    rules: "Dòng trống cũng được đánh số, kể cả dòng trống sau dấu xuống dòng cuối. Đầu vào rỗng không tạo kết quả. CRLF và CR được đổi thành LF. Căn chỉnh chỉ thêm dấu cách, không cắt số; độ rộng tự động theo số cuối cùng. Dấu phân cách được dùng nguyên văn, không diễn giải ký tự thoát hay mẫu.",
    limits: "Tối đa 100,000 đơn vị UTF-16 đầu vào, 300,000 đầu ra và 10,000 dòng. Dấu phân cách: 64 đơn vị. Bắt đầu: 0–1,000,000,000; bước tăng: 1–1,000,000; độ rộng tối thiểu: 0–12 hoặc tự động.",
    privacy: "Việc đánh số diễn ra trong trình duyệt. Công cụ không tải lên hoặc lưu văn bản của bạn.",
    input: "Văn bản cần đánh số", output: "Văn bản đã đánh số", position: "Vị trí số", prefix: "Trước mỗi dòng", suffix: "Sau mỗi dòng",
    start: "Số bắt đầu", step: "Bước tăng", padding: "Căn chỉnh số", auto: "Độ rộng tự động", none: "Không thêm dấu cách", width: "Độ rộng tối thiểu",
    separator: "Dấu phân cách", literal: "Văn bản nguyên nghĩa; không xử lý ký tự thoát hoặc mẫu.", sample: "Dùng ví dụ", clear: "Xóa", copy: "Sao chép kết quả",
    copied: "Đã sao chép.", copyFailed: "Không thể sao chép. Hãy chọn và sao chép kết quả thủ công.", empty: "Dán văn bản hoặc dùng ví dụ để xem các dòng được đánh số.", lines: "Số dòng đã đánh số",
    step1: "Dán văn bản và giữ các dòng trống cần đánh số.", step2: "Chọn vị trí, số bắt đầu, bước tăng, căn chỉnh và dấu phân cách nguyên văn.", step3: "Kiểm tra kết quả trực tiếp rồi sao chép.",
    emptyQ: "Dòng trống và dấu xuống dòng được xử lý thế nào?", limitQ: "Có những giới hạn nào?",
    invalid: "Chọn một thiết lập được hỗ trợ.", inputType: "Nhập văn bản cần đánh số.", inputLimit: "Đầu vào vượt quá 100,000 đơn vị UTF-16. Hãy rút ngắn văn bản.",
    outputLimit: "Kết quả vượt quá 300,000 đơn vị UTF-16. Giảm số dòng, dấu phân cách hoặc độ rộng.", lineLimit: "Đầu vào vượt quá 10,000 dòng, kể cả dòng trống cuối.",
    numberLimit: "Số dòng cuối vượt quá phạm vi số nguyên an toàn.", separatorLimit: "Dùng dấu phân cách văn bản tối đa 64 đơn vị UTF-16.",
  },
};

export function lineNumbersError(locale: Locale, error: LineNumbersError): string {
  const c = LINE_NUMBER_MESSAGES[locale];
  switch (error) {
    case "input-type": return c.inputType;
    case "input-limit": return c.inputLimit;
    case "output-limit": return c.outputLimit;
    case "line-limit": return c.lineLimit;
    case "number-limit": return c.numberLimit;
    case "separator": return c.separatorLimit;
    case "start": return `${c.start}: ${c.invalid} (0–1,000,000,000)`;
    case "step": return `${c.step}: ${c.invalid} (1–1,000,000)`;
    case "padding": return `${c.padding}: ${c.invalid} (0–12)`;
    case "position": return `${c.position}: ${c.invalid}`;
    case "options": return c.invalid;
  }
}

export function lineNumbersToolCopy(): Record<Locale, ToolCopy> {
  return Object.fromEntries(LOCALES.map((locale) => {
    const c = LINE_NUMBER_MESSAGES[locale];
    return [locale, {
      name: c.name, tagline: c.tagline,
      intro: [c.tagline, c.rules, c.privacy],
      steps: [c.step1, c.step2, c.step3],
      faqs: [{ q: c.emptyQ, a: c.rules }, { q: c.limitQ, a: c.limits }],
      deepDive: lineNumberDeepDive(locale),
    }];
  })) as Record<Locale, ToolCopy>;
}
