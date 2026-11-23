/**
 * CN-036 chart-generator 扩展语言 overlay(10 语)。
 * 行文规范:fr=vouvoiement、de=Sie、ru=«»、ko=합니다체、ar=MSA。
 */

import type { ToolCopy } from "./types";

function common(
  intro: [string, string, string],
  steps: [string, string, string],
  faqs: Array<{ q: string; a: string }>,
) {
  return { intro, steps, faqs };
}

export const CHART_OVERLAYS: Record<string, ToolCopy> = {
  fr: {
    name: "Générateur de graphiques SVG",
    tagline:
      "Transformez des données CSV, tabulées ou séparées par des points-virgules en barres, lignes, aires, camembert, anneau, radar ou entonnoir — dessinés en SVG pur, téléchargeables et collables dans vos diapositives, documents ou une page web. Sans bibliothèque de graphiques, sans envoi de données.",
    ...common(
      [
        "Collez vos données comme dans un tableur : la première colonne est l'étiquette, les suivantes sont une ou plusieurs séries. L'outil détecte le séparateur (tabulation, point-virgule ou virgule), lit une ligne d'en-tête facultative et dessine en direct pendant la saisie.",
        "Les sept types sont construits à partir des primitives SVG plutôt qu'à partir d'une bibliothèque de graphiques, ce qui garde la page légère et la sortie portable : chaque pixel est un chemin ou un rectangle que vous pouvez inspecter, recolorer ou animer après export. Les barres et les aires ancrent toujours l'axe Y à zéro : une série qui paraît plate reflète alors les données, et non un axe tronqué pour paraître spectaculaire.",
        "L'export est un véritable fichier .svg. Il porte son propre fond blanc pour s'afficher à l'identique dans PowerPoint, Google Slides, Notion ou un navigateur, et tout le texte est échappé avant d'entrer dans le SVG, si bien qu'une étiquette contenant < ou & ne peut pas casser le fichier.",
      ],
      [
        "Collez les données : étiquette puis valeurs, séparées par des virgules, tabulations ou points-virgules.",
        "Choisissez un type de graphique et, si besoin, précisez si la première ligne est un en-tête (des noms de série numériques comme 2025 exigent Oui).",
        "Téléchargez le .svg ou copiez son code — l'aperçu est exactement ce qui est exporté.",
      ],
      [
        { q: "Pourquoi l'axe commence-t-il à zéro plutôt que d'épouser les données ?", a: "Parce qu'un axe tronqué exagère de petites différences. Une série qui passe de 98 à 102 semble bondir avec un axe à 97, et ressemble à ce qu'elle est — une variation de 4 % — avec un axe à zéro. Les barres et les aires encodent la magnitude par la longueur, la ligne de base doit donc être significative. Si vous avez besoin d'une vue zoomée, c'est une demande légitime mais qui relève d'un graphique à cassure d'axe explicite et étiquetée, que cet outil refuse délibérément de simuler." },
        { q: "Que se passe-t-il quand il y a plus de colonnes que le graphique n'en affiche ?", a: "Barres, lignes, aires et radar dessinent toutes les séries fournies. Camembert, anneau et entonnoir sont par définition des graphiques à valeur unique : ils utilisent la première colonne de valeurs et énumèrent les colonnes écartées dans une ligne Notes visible, plutôt que de les supprimer en silence." },
        { q: "Le SVG exporté est-il modifiable dans Illustrator ou Figma ?", a: "Oui — c'est précisément pourquoi nous produisons du SVG et non du PNG. Chemins, rectangles, cercles et éléments de texte sont adressables un par un, le texte est du vrai texte (pas des contours) avec une pile de polices standard, sans filtres ni foreignObject. Les couleurs sont des littéraux hexadécimaux : un rechercher-remplacer global sur #2563eb recolore la première série partout." },
      ],
    ),
  },
  de: {
    name: "SVG-Diagramm-Generator",
    tagline:
      "Verwandeln Sie eingefügte CSV-, Tab- oder Semikolon-Daten in Balken-, Linien-, Flächen-, Torten-, Ring-, Radar- oder Trichterdiagramme — gezeichnet als reines SVG, das Sie herunterladen und in Folien, Dokumente oder eine Webseite einfügen können. Keine Diagrammbibliothek, kein Upload.",
    ...common(
      [
        "Fügen Sie Ihre Daten so ein, wie in eine Tabellenkalkulation: die erste Spalte ist die Beschriftung, die folgenden sind eine oder mehrere Reihen. Das Werkzeug erkennt das Trennzeichen (Tab, Semikolon oder Komma), liest eine optionale Kopfzeile und zeichnet live während der Eingabe.",
        "Die sieben Typen entstehen aus SVG-Grundformen statt aus einer Diagrammbibliothek; das hält die Seite leicht und die Ausgabe portabel: jedes Pixel ist ein Pfad oder Rechteck, das Sie nach dem Export prüfen, umfärben oder animieren können. Balken- und Flächendiagramme setzen die Y-Achse immer auf null — eine flach wirkende Reihe spiegelt dann die Daten, nicht eine für Dramatik abgeschnittene Achse.",
        "Der Export ist eine echte .svg-Datei. Sie trägt einen eigenen weißen Hintergrund, damit sie in PowerPoint, Google Slides, Notion oder im Browser gleich aussieht, und jeder Text wird vor dem Eintritt ins SVG maskiert, sodass Beschriftungen mit < oder & die Datei nicht zerstören.",
      ],
      [
        "Daten einfügen: Beschriftung, dann Werte, getrennt durch Kommas, Tabs oder Semikolons.",
        "Diagrammtyp wählen und bei Bedarf angeben, ob die erste Zeile eine Kopfzeile ist (numerische Reihennamen wie 2025 verlangen Ja).",
        "Die .svg-Datei herunterladen oder den Quelltext kopieren — die Vorschau ist genau das, was exportiert wird.",
      ],
      [
        { q: "Warum beginnt die Achse bei null statt sich den Daten anzupassen?", a: "Weil eine abgeschnittene Achse kleine Unterschiede übertreibt. Eine Reihe von 98 auf 102 wirkt mit einer Achse ab 97 wie ein Sprung, und sieht mit einer Achse ab null aus wie das, was sie ist — eine Änderung von 4 %. Balken und Flächen kodieren Größe über die Länge, also muss die Grundlinie aussagekräftig sein. Wenn Sie eine gezoomte Ansicht brauchen, ist das ein legitimes Anliegen, gehört aber zu einem Diagramm mit ausdrücklich beschriftetem Achsenbruch, den dieses Werkzeug bewusst nicht vortäuscht." },
        { q: "Was passiert bei mehr Spalten, als das Diagramm zeigt?", a: "Balken, Linien, Flächen und Radar zeichnen jede übergebene Reihe. Torten-, Ring- und Trichterdiagramme sind definitionsgemäß Einzelwert-Diagramme; sie nutzen die erste Wertspalte und listen die verworfenen Spalten in einer sichtbaren Notizzeile auf, statt sie stillschweigend zu verwerfen." },
        { q: "Lässt sich das exportierte SVG in Illustrator oder Figma bearbeiten?", a: "Ja — genau deshalb geben wir SVG statt PNG aus. Pfade, Rechtecke, Kreise und Textelemente sind einzeln adressierbar, Text ist echter Text (keine Konturen) mit einem Standardschriftstapel, und es werden keine Filter oder foreignObjects verwendet. Farben sind einfache Hex-Literale, ein globales Suchen-Ersetzen von #2563eb färbt die erste Reihe überall um." },
      ],
    ),
  },
  ru: {
    name: "Генератор SVG-графиков",
    tagline:
      "Превратите вставленные данные CSV, через табуляцию или точку с запятой в столбчатую, линейную, площадную, круговую, кольцевую, радарную или воронкообразную диаграмму — в виде чистого SVG, который можно скачать и вставить в слайды, документы или веб-страницу. Без библиотеки графиков, без выгрузки данных.",
    ...common(
      [
        "Вставьте данные так, как вводили бы в таблицу: первый столбец — подпись, следующие — одна или несколько серий. Инструмент определяет разделитель (табуляция, точка с запятой или запятая), читает необязательную строку заголовка и рисует в реальном времени по мере ввода.",
        "Семь типов строятся из примитивов SVG, а не из библиотеки графиков: страница остаётся лёгкой, а результат — переносимым: каждый пиксель это путь или прямоугольник, который вы можете проверить, перекрасить или анимировать после экспорта. Столбчатые и площадные диаграммы всегда ставят ось Y в ноль — визуально «плоская» серия тогда отражает данные, а не обрезанную ради драматизма ось.",
        "Экспорт — настоящий файл .svg. У него собственный белый фон, поэтому он одинаково отображается в PowerPoint, Google Slides, Notion и браузере, а весь текст экранируется до попадания в SVG, так что подписи с < или & не могут повредить файл.",
      ],
      [
        "Вставьте данные: подпись, затем значения, через запятую, табуляцию или точку с запятой.",
        "Выберите тип диаграммы и при необходимости укажите, является ли первая строка заголовком (цифровые имена серий вроде 2025 требуют «Да»).",
        "Скачайте .svg или скопируйте исходник — предпросмотр в точности равен экспорту.",
      ],
      [
        { q: "Почему ось начинается с нуля, а не подстраивается под данные?", a: "Потому что обрезанная ось преувеличивает малые различия. Серия от 98 до 102 кажется взлётом при оси от 97 и выглядит тем, чем является — изменением на 4 % — при оси от нуля. Столбцы и площади кодируют величину длиной, поэтому базовая линия должна быть содержательной. Если нужен увеличенный вид, это законный запрос, но он относится к диаграмме с явно подписанным разрывом оси, который этот инструмент намеренно не имитирует." },
        { q: "Что происходит, если столбцов больше, чем диаграмма может показать?", a: "Столбчатая, линейная, площадная и радарная диаграммы рисуют все переданные серии. Круговая, кольцевая и воронка по определению одно-значные: они используют первый числовой столбец и перечисляют отброшенные столбцы в видимой строке «Примечания», а не отбрасывают их молча." },
        { q: "Можно ли редактировать экспортированный SVG в Illustrator или Figma?", a: "Да — именно поэтому мы выдаём SVG, а не PNG. Пути, прямоугольники, окружности и текстовые элементы доступны по отдельности, текст остаётся настоящим текстом (не контурами) со стандартным набором шрифтов, фильтры и foreignObject не используются. Цвета — обычные hex-литералы, поэтому глобальная замена #2563eb перекрашивает первую серию везде." },
      ],
    ),
  },
  it: {
    name: "Generatore di grafici SVG",
    tagline:
      "Trasforma dati CSV, tabulati o separati da punto e virgola in barre, linee, aree, torta, ciambella, radar o imbuto — disegnati come SVG puro che puoi scaricare e incollare in slide, documenti o una pagina web. Nessuna libreria di grafici, nessun upload.",
    ...common(
      [
        "Incolla i dati come faresti in un foglio di calcolo: la prima colonna è l'etichetta, le successive sono una o più serie. Lo strumento rileva il separatore (tabulazione, punto e virgola o virgola), legge una riga di intestazione opzionale e disegna in tempo reale mentre scrivi.",
        "I sette tipi sono costruiti con primitive SVG invece che con una libreria di grafici: la pagina resta leggera e l'output portabile, perché ogni pixel è un percorso o un rettangolo che puoi ispezionare, ricolorare o animare dopo l'esportazione. Barre e aree ancorano sempre l'asse Y a zero: una serie che sembra piatta riflette allora i dati, non un asse troncato per sembrare spettacolare.",
        "L'esportazione è un vero file .svg. Porta con sé lo sfondo bianco per apparire identico in PowerPoint, Google Slides, Notion o in un browser, e tutto il testo viene sfuggito prima di entrare nell'SVG, quindi etichette con < o & non possono rompere il file.",
      ],
      [
        "Incolla i dati: etichetta, poi valori, separati da virgole, tabulazioni o punto e virgola.",
        "Scegli un tipo di grafico e, se serve, indica se la prima riga è un'intestazione (nomi di serie numerici come 2025 richiedono Sì).",
        "Scarica il .svg o copia il codice: l'anteprima è esattamente ciò che viene esportato.",
      ],
      [
        { q: "Perché l'asse parte da zero invece di adattarsi ai dati?", a: "Perché un asse troncato esagera differenze piccole. Una serie da 98 a 102 sembra un balzo con l'asse a 97, e appare per ciò che è — una variazione del 4% — con l'asse a zero. Barre e aree codificano la grandezza con la lunghezza, quindi la linea di base deve essere significativa. Se ti serve una vista ingrandita, è una richiesta legittima ma appartiene a un grafico con un'interruzione d'asse esplicita ed etichettata, che questo strumento deliberatamente non simula." },
        { q: "Cosa succede quando ci sono più colonne di quante il grafico ne mostri?", a: "Barre, linee, aree e radar disegnano tutte le serie fornite. Torta, ciambella e imbuto sono per definizione grafici a valore singolo: usano la prima colonna di valori ed elencano le colonne scartate in una riga Note visibile, invece di scartarle in silenzio." },
        { q: "Il SVG esportato è modificabile in Illustrator o Figma?", a: "Sì — è proprio il motivo per cui produciamo SVG e non PNG. Percorsi, rettangoli, cerchi ed elementi di testo sono indirizzabili singolarmente, il testo è vero testo (non contorni) con uno stack di font standard, e non ci sono filtri né foreignObject. I colori sono semplici letterali esadecimali: un trova-e-sostituisci globale di #2563eb ricolora la prima serie ovunque." },
      ],
    ),
  },
  tr: {
    name: "SVG Grafik Üretici",
    tagline:
      "Yapıştırdığınız CSV, sekme veya noktalı virgül verisini çubuk, çizgi, alan, pasta, halka, radar ya da huni grafiğine dönüştürün — slaytlara, belgelere veya bir web sayfasına indirip yapıştırabileceğiniz düz SVG olarak çizilir. Grafik kütüphanesi yok, yükleme yok.",
    ...common(
      [
        "Veriyi tabloya girer gibi yapıştırın: ilk sütun etiket, sonrakiler bir veya daha fazla seri. Araç ayırıcıyı (sekme, noktalı virgül veya virgül) algılar, isteğe bağlı başlık satırını okur ve siz yazarken canlı çizer.",
        "Yedi tür, grafik kütüphanesi yerine SVG temel öğeleriyle kurulur; bu hem sayfayı hafif tutar hem de çıktıyı taşınabilir kılar: her piksel, dışa aktardıktan sonra inceleyebileceğiniz, renklendirebileceğiniz veya canlandırabileceğiniz bir yol ya da dikdörtgendir. Çubuk ve alan grafikleri Y eksenini her zaman sıfıra sabitler: düz görünen seri o hâlde veriyi yansıtır, dramatik görünmesi için kesilmiş bir ekseni değil.",
        "Dışa aktarma gerçek bir .svg dosyasıdır. PowerPoint, Google Slides, Notion veya tarayıcıda aynı görünmesi için kendi beyaz arka planını taşır ve tüm metin SVG'ye girmeden önce kaçırılır; böylece < veya & içeren etiketler dosyayı bozamaz.",
      ],
      [
        "Veriyi yapıştırın: etiket, ardından değerler; virgül, sekme veya noktalı virgülle ayrılmış.",
        "Grafik türünü seçin ve gerekirse ilk satırın başlık olup olmadığını belirtin (2025 gibi sayısal seri adları Evet gerektirir).",
        ".svg dosyasını indirin veya kaynağını kopyalayın — önizleme, dışa aktarılanın tam kendisidir.",
      ],
      [
        { q: "Eksen neden veriye uymak yerine sıfırdan başlıyor?", a: "Çünkü kesilmiş bir eksen küçük farkları abartır. 98'den 102'ye giden bir seri, eksen 97'den başlarsa sıçrama gibi görünür; eksen sıfırdan başlarsa neyse o görünür — %4'lük bir değişim. Çubuk ve alan grafikleri büyüklüğü uzunlukla kodlar, dolayısıyla taban çizgisi anlamlı olmalıdır. Yakınlaştırılmış görünüm gerekiyorsa bu meşru bir taleptir ama açıkça etiketlenmiş eksen kırılması olan bir grafiğe aittir; bu araç onu bilerek taklit etmez." },
        { q: "Grafiğin gösterebileceğinden fazla sütun olursa ne olur?", a: "Çubuk, çizgi, alan ve radar verilen tüm serileri çizer. Pasta, halka ve huni tanım gereği tek değerli grafiklerdir; ilk değer sütununu kullanır ve atılan sütunları görünür bir Not satırında listeler, sessizce atmaz." },
        { q: "Dışa aktarılan SVG Illustrator veya Figma'da düzenlenebilir mi?", a: "Evet — PNG yerine SVG vermemizin nedeni tam olarak bu. Yollar, dikdörtgenler, daireler ve metin öğeleri tek tek adreslenebilir, metin gerçek metindir (dış çizgi değil) ve standart bir font yığını kullanır; filtre veya foreignObject yoktur. Renkler düz hex literalleridir, #2563eb için genel bul-değiştir ilk seriyi her yerde yeniden renklendirir." },
      ],
    ),
  },
  ko: {
    name: "SVG 차트 생성기",
    tagline:
      "붙여넣은 CSV·탭·세미콜론 데이터를 막대, 선, 영역, 원형, 도넛, 레이더, 깔때기 차트로 변환합니다 — 슬라이드·문서·웹 페이지에 그대로 붙일 수 있는 순수 SVG로 그립니다. 차트 라이브러리 없이, 업로드 없이.",
    ...common(
      [
        "스프레드시트에 입력하듯 데이터를 붙여넣습니다: 첫 열은 레이블, 이후 열은 하나 이상의 계열입니다. 도구가 구분자(탭·세미콜론·쉼표)를 감지하고 선택적 머리글 행을 읽으며 입력하는 동안 실시간으로 그립니다.",
        "일곱 종류는 차트 라이브러리가 아니라 SVG 기본 요소로 그립니다. 페이지는 가볍고 출력은 이식 가능합니다: 모든 픽셀이 내보낸 뒤 직접 검사하고 색을 바꾸거나 애니메이션할 수 있는 경로 또는 사각형입니다. 막대와 영역 차트는 Y축을 항상 0에 고정합니다 — 평평해 보이는 계열은 그때 데이터를 반영하며, 극적으로 보이게 자른 축이 아닙니다.",
        "내보내기는 진짜 .svg 파일입니다. 자체 흰 배경을 가져 PowerPoint·Google Slides·Notion·브라우저에서 동일하게 표시되며, 모든 텍스트가 SVG에 들어가기 전에 이스케이프되므로 < 또는 & 가 든 레이블이 파일을 깨뜨릴 수 없습니다.",
      ],
      [
        "데이터를 붙여넣습니다: 레이블, 이어서 값, 쉼표·탭·세미콜론으로 구분.",
        "차트 종류를 고르고 필요하면 첫 행이 머리글인지 지정합니다(2025처럼 숫자 계열 이름은 '예' 필요).",
        ".svg를 내려받거나 소스를 복사합니다 — 미리보기가 곧 내보낼 내용입니다.",
      ],
      [
        { q: "축이 데이터에 맞춰지지 않고 0에서 시작하는 이유는?", a: "잘린 축은 작은 차이를 과장하기 때문입니다. 98에서 102로 가는 계열은 축이 97에서 시작하면 급등처럼 보이고, 0에서 시작하면 실제 모습 — 4% 변화 — 으로 보입니다. 막대와 영역 차트는 길이로 크기를 부호화하므로 기준선이 의미 있어야 합니다. 확대 보기가 필요하다면 정당한 요구이지만, 명시적으로 표시된 축 절단이 있는 차트의 몫이며 이 도구는 그것을 의도적으로 흉내내지 않습니다." },
        { q: "차트가 표시할 수 있는 것보다 열이 많으면 어떻게 되나요?", a: "막대·선·영역·레이더는 주어진 모든 계열을 그립니다. 원형·도넛·깔때기는 정의상 단일 값 차트이므로 첫 값 열을 사용하고 버린 열을 눈에 보이는 '참고' 줄에 나열합니다. 조용히 버리지 않습니다." },
        { q: "내보낸 SVG를 Illustrator나 Figma에서 편집할 수 있나요?", a: "예 — PNG 대신 SVG를 내보내는 이유가 바로 그것입니다. 경로·사각형·원·텍스트 요소가 개별적으로 다룰 수 있고, 텍스트는 윤곽선이 아닌 진짜 텍스트로 표준 글꼴 스택을 사용하며, 필터나 foreignObject를 쓰지 않습니다. 색은 일반 16진수 리터럴이라 #2563eb를 전역 찾기-바꾸기하면 첫 계열이 어디서나 다시 칠해집니다." },
      ],
    ),
  },
  ar: {
    name: "مولد رسوم SVG البيانية",
    tagline:
      "حوّل بيانات CSV أو المفصولة بالجدولة أو الفاصلة المنقوطة إلى مخطط أعمدة أو خطي أو مساحي أو دائري أو حلقي أو راداري أو قمعي — مرسومة كـ SVG خالص يمكنك تنزيله ولصقه في الشرائح أو المستندات أو صفحة ويب. بلا مكتبة رسوم وبلا رفع بيانات.",
    ...common(
      [
        "الصق بياناتك كما تفعل في جدول: العمود الأول هو التسمية والأعمدة التالية سلسلة أو أكثر. تكتشف الأداة الفاصل (جدولة أو فاصلة منقوطة أو فاصلة) وتقرأ صف رأس اختياريًا وترسم مباشرة أثناء الكتابة.",
        "تُبنى الأنواع السبعة من عناصر SVG الأساسية بدلًا من مكتبة رسوم، ما يبقي الصفحة خفيفة والمخرجات قابلة للنقل: كل بكسل هو مسار أو مستطيل يمكنك فحصه أو إعادة تلوينه أو تحريكه بعد التصدير. تثبّت مخططات الأعمدة والمساحات محور Y عند الصفر دائمًا: السلسلة التي تبدو مسطحة تعكس عندئذ البيانات، لا محورًا مقطوعًا ليبدو دراماتيكيًا.",
        "التصدير ملف .svg حقيقي. يحمل خلفيته البيضاء الخاصة ليظهر بنفس الشكل في PowerPoint وGoogle Slides وNotion والمتصفح، ويُهرَّب كل نص قبل دخوله إلى SVG، فلا يمكن لتسمية تحوي < أو & أن تفسد الملف.",
      ],
      [
        "الصق البيانات: التسمية ثم القيم، مفصولة بفواصل أو جدولة أو فاصلة منقوطة.",
        "اختر نوع المخطط، وعند الحاجة حدد هل الصف الأول رأس (أسماء سلاسل رقمية مثل 2025 تتطلب «نعم»).",
        "نزّل ملف .svg أو انسخ مصدره — المعاينة هي بالضبط ما يُصدَّر.",
      ],
      [
        { q: "لماذا يبدأ المحور من الصفر بدلًا من مطابقة البيانات؟", a: "لأن المحور المقطوع يبالغ في الفروق الصغيرة. سلسلة من 98 إلى 102 تبدو قفزة عندما يبدأ المحور عند 97، وتبدو على حقيقتها — تغيّر بنسبة 4% — عندما يبدأ عند الصفر. الأعمدة والمساحات ترمز للمقدار بالطول، لذا يجب أن تكون خط الأساس ذا معنى. إن احتجت عرضًا مكبّرًا فهو طلب مشروع لكنه يخص مخططًا ذا قطع محور معلن وموسوم، وأداتنا هذه لا تزوّر ذلك عمدًا." },
        { q: "ماذا يحدث عندما تكون الأعمدة أكثر مما يستطيع المخطط عرضه؟", a: "ترسم مخططات الأعمدة والخط والمساحة والرادار كل السلسلات المعطاة. الدائري والحلقي والقمعي بحسب التعريف مخططات قيمة واحدة، لذا تستخدم عمود القيم الأول وتسرد الأعمدة المهملة في سطر «ملاحظات» مرئي بدلًا من إهمالها بصمت." },
        { q: "هل يمكن تحرير SVG المصدَّر في Illustrator أو Figma؟", a: "نعم — لهذا بالضبط نُصدِّر SVG لا PNG. المسارات والمستطيلات والدوائر وعناصر النص قابلة للعنونة منفردة، والنص نص حقيقي (لا خطوط محيطة) باستخدام مجموعة خطوط قياسية، ولا مرشحات ولا foreignObject. الألوان حرفية سداسية عشرية بسيطة، فاستبدال #2563eb عالميًا يعيد تلوين السلسلة الأولى في كل مكان." },
      ],
    ),
  },
  hi: {
    name: "SVG चार्ट जनरेटर",
    tagline:
      "चिपकाए गए CSV, टैब या सेमीकोलन डेटा को बार, लाइन, एरिया, पाई, डोनट, रडार या फ़नल चार्ट में बदलें — सादे SVG के रूप में, जिसे आप डाउनलोड कर स्लाइड, दस्तावेज़ या वेब पेज में चिपका सकते हैं। कोई चार्ट लाइब्रेरी नहीं, कोई अपलोड नहीं।",
    ...common(
      [
        "डेटा ऐसे चिपकाएँ जैसे स्प्रेडशीट में डालते हैं: पहला कॉलम लेबल, आगे के कॉलम एक या अधिक श्रेणियाँ। उपकरण विभाजक (टैब, सेमीकोलन या कॉमा) पहचानता है, वैकल्पिक हेडर पंक्ति पढ़ता है और टाइप करते ही लाइव बनाता है।",
        "सात प्रकार चार्ट लाइब्रेरी की जगह SVG मूल तत्वों से बनते हैं — पेज हल्का रहता है और आउटपुट पोर्टेबल: हर पिक्सेल एक पथ या आयत है जिसे एक्सपोर्ट के बाद आप जाँच सकते, रंग बदल सकते या एनिमेट कर सकते हैं। बार और एरिया चार्ट Y अक्ष को हमेशा शून्य पर रखते हैं — सपाट दिखने वाली श्रेणी तब डेटा दर्शाती है, नाटकीय दिखने के लिए काटा गया अक्ष नहीं।",
        "एक्सपोर्ट असली .svg फ़ाइल है। यह अपना सफ़ेद पृष्ठभूमि लिए होती है ताकि PowerPoint, Google Slides, Notion या ब्राउज़र में एक जैसी दिखे, और सारा टेक्स्ट SVG में प्रवेश से पहले एस्केप होता है, इसलिए < या & वाले लेबल फ़ाइल को नहीं तोड़ सकते।",
      ],
      [
        "डेटा चिपकाएँ: लेबल, फिर मान, कॉमा, टैब या सेमीकोलन से अलग।",
        "चार्ट प्रकार चुनें और ज़रूरत हो तो बताएँ कि पहली पंक्ति हेडर है (2025 जैसे संख्यात्मक श्रेणी नाम के लिए हाँ)।",
        ".svg डाउनलोड करें या स्रोत कॉपी करें — प्रीव्यू ठीक वही है जो एक्सपोर्ट होता है।",
      ],
      [
        { q: "अक्ष डेटा के अनुसार न होकर शून्य से क्यों शुरू होता है?", a: "क्योंकि कटा अक्ष छोटे अंतरों को बढ़ा-चढ़ाकर दिखाता है। 98 से 102 तक जाने वाली श्रेणी अक्ष 97 से शुरू होने पर उछाल लगती है, और शून्य से शुरू होने पर वही दिखती है जो है — 4% का बदलाव। बार और एरिया चार्ट लंबाई से परिमाण दर्शाते हैं, इसलिए आधार रेखा अर्थपूर्ण होनी चाहिए। ज़ूम किया दृश्य चाहिए तो वह वैध माँग है, पर वह स्पष्ट रूप से लेबल किए अक्ष-विच्छेद वाले चार्ट की बात है, जिसे यह उपकरण जानबूझकर नकली नहीं बनाता।" },
        { q: "चार्ट जितने दिखा सकता है उससे ज़्यादा कॉलम हों तो क्या होता है?", a: "बार, लाइन, एरिया और रडार हर दी गई श्रेणी बनाते हैं। पाई, डोनट और फ़नल परिभाषा से एकल-मान चार्ट हैं, इसलिए वे पहला मान कॉलम लेते हैं और छोड़े गए कॉलम दिखने वाली «नोट्स» पंक्ति में सूचीबद्ध करते हैं, चुपचाप नहीं गिराते।" },
        { q: "क्या एक्सपोर्ट किया SVG Illustrator या Figma में संपादित हो सकता है?", a: "हाँ — PNG की जगह SVG देने का कारण यही है। पथ, आयत, वृत्त और टेक्स्ट तत्व अलग-अलग पता किए जा सकते हैं, टेक्स्ट वास्तविक टेक्स्ट है (आउटलाइन नहीं) मानक फ़ॉन्ट स्टैक के साथ, और कोई फ़िल्टर या foreignObject नहीं। रंग सादे हेक्स लिटरल हैं, #2563eb का वैश्विक खोज-बदल पहली श्रेणी को हर जगह रंग देता है।" },
      ],
    ),
  },
  id: {
    name: "Generator Grafik SVG",
    tagline:
      "Ubah data CSV, tab, atau titik koma yang ditempel menjadi grafik batang, garis, area, pai, donat, radar, atau corong — digambar sebagai SVG murni yang bisa Anda unduh dan tempel ke slide, dokumen, atau halaman web. Tanpa pustaka grafik, tanpa unggah data.",
    ...common(
      [
        "Tempel data seperti Anda mengisi spreadsheet: kolom pertama adalah label, kolom berikutnya satu atau lebih seri. Alat mendeteksi pemisah (tab, titik koma, atau koma), membaca baris kepala opsional, dan menggambar langsung saat Anda mengetik.",
        "Tujuh jenis dibangun dari primitif SVG bukan pustaka grafik, sehingga halaman tetap ringan dan hasilnya portabel: setiap piksel adalah path atau rect yang bisa Anda periksa, warnai ulang, atau animasikan sendiri setelah ekspor. Grafik batang dan area selalu menambatkan sumbu Y di nol — seri yang tampak datar lalu mencerminkan data, bukan sumbu terpotong agar terlihat dramatis.",
        "Ekspor adalah berkas .svg sungguhan. Ia membawa latar putihnya sendiri agar tampil sama di PowerPoint, Google Slides, Notion, atau peramban, dan semua teks di-escape sebelum masuk ke SVG, sehingga label berisi < atau & tidak dapat merusak berkas.",
      ],
      [
        "Tempel data: label lalu nilai, dipisah koma, tab, atau titik koma.",
        "Pilih jenis grafik dan bila perlu tentukan apakah baris pertama adalah kepala (nama seri numerik seperti 2025 memerlukan Ya).",
        "Unduh .svg atau salin sumbernya — pratinjau persis sama dengan yang diekspor.",
      ],
      [
        { q: "Mengapa sumbu dimulai dari nol alih-alih menyesuaikan data?", a: "Karena sumbu terpotong melebih-lebihkan perbedaan kecil. Seri dari 98 ke 102 tampak melonjak dengan sumbu mulai 97, dan tampak sebagaimana adanya — perubahan 4% — dengan sumbu mulai nol. Batang dan area menyandikan besaran lewat panjang, jadi garis dasar harus bermakna. Jika Anda butuh tampilan diperbesar, itu permintaan sah tetapi milik grafik dengan pemutusan sumbu yang jelas dan berlabel, yang sengaja tidak dipalsukan alat ini." },
        { q: "Apa yang terjadi bila kolom lebih banyak daripada yang bisa ditampilkan grafik?", a: "Batang, garis, area, dan radar menggambar semua seri yang diberikan. Pai, donat, dan corong menurut definisi adalah grafik nilai tunggal, jadi mereka memakai kolom nilai pertama dan mendaftar kolom yang dibuang di baris Catatan yang terlihat, bukan membuangnya diam-diam." },
        { q: "Bisakah SVG hasil ekspor diedit di Illustrator atau Figma?", a: "Bisa — itulah alasan kami mengeluarkan SVG bukan PNG. Path, rect, circle, dan elemen teks dapat dialamati satu per satu, teks adalah teks sungguhan (bukan outline) dengan tumpukan font standar, dan tidak ada filter maupun foreignObject. Warna adalah literal hex biasa, jadi cari-ganti global #2563eb mewarnai ulang seri pertama di mana pun." },
      ],
    ),
  },
  vi: {
    name: "Trình tạo biểu đồ SVG",
    tagline:
      "Biến dữ liệu CSV, tab hoặc chấm phẩy dán vào thành biểu đồ cột, đường, vùng, tròn, vành khuyên, radar hoặc phễu — vẽ dưới dạng SVG thuần mà bạn tải về và dán vào slide, tài liệu hoặc trang web. Không thư viện biểu đồ, không tải dữ liệu lên.",
    ...common(
      [
        "Dán dữ liệu như bạn nhập vào bảng tính: cột đầu là nhãn, các cột sau là một hay nhiều chuỗi. Công cụ tự nhận dấu phân cách (tab, chấm phẩy hoặc phẩy), đọc hàng tiêu đề tùy chọn và vẽ trực tiếp khi bạn gõ.",
        "Bảy loại được dựng từ phần tử SVG cơ bản thay vì thư viện biểu đồ, giữ trang nhẹ và kết quả dễ mang đi: mỗi điểm ảnh là một path hoặc rect mà bạn có thể kiểm tra, đổi màu hay tự làm hiệu ứng sau khi xuất. Biểu đồ cột và vùng luôn neo trục Y tại 0 — chuỗi trông phẳng khi đó phản ánh dữ liệu, chứ không phải trục bị cắt để trông ấn tượng.",
        "Xuất ra là tệp .svg thật. Nó mang nền trắng riêng để hiển thị giống nhau trong PowerPoint, Google Slides, Notion hay trình duyệt, và mọi văn bản được escape trước khi vào SVG, nên nhãn chứa < hay & không thể làm hỏng tệp.",
      ],
      [
        "Dán dữ liệu: nhãn rồi giá trị, cách nhau bằng phẩy, tab hoặc chấm phẩy.",
        "Chọn loại biểu đồ và nếu cần hãy cho biết hàng đầu có phải tiêu đề (tên chuỗi dạng số như 2025 cần chọn Có).",
        "Tải .svg hoặc sao chép mã nguồn — bản xem trước chính là thứ được xuất.",
      ],
      [
        { q: "Vì sao trục bắt đầu từ 0 thay vì bám theo dữ liệu?", a: "Vì trục bị cắt phóng đại chênh lệch nhỏ. Chuỗi từ 98 lên 102 trông như vọt với trục từ 97, và trông đúng như nó là — thay đổi 4% — với trục từ 0. Cột và vùng mã hóa độ lớn bằng độ dài, nên đường cơ sở phải có ý nghĩa. Nếu cần góc nhìn phóng to, đó là yêu cầu hợp lý nhưng thuộc về biểu đồ có ngắt trục được ghi rõ và dán nhãn, thứ công cụ này cố ý không giả lập." },
        { q: "Điều gì xảy ra khi có nhiều cột hơn mức biểu đồ hiển thị?", a: "Cột, đường, vùng và radar vẽ mọi chuỗi được đưa. Tròn, vành khuyên và phễu theo định nghĩa là biểu đồ một giá trị, nên chúng dùng cột giá trị đầu và liệt kê các cột bị bỏ trong dòng Ghi chú hiển thị, chứ không lặng lẽ vứt đi." },
        { q: "SVG xuất ra có sửa được trong Illustrator hay Figma không?", a: "Được — đó chính là lý do chúng tôi xuất SVG chứ không phải PNG. Path, rect, circle và phần tử văn bản đều định địa chỉ riêng, văn bản là chữ thật (không phải đường viền) với bộ font chuẩn, và không dùng filter hay foreignObject. Màu là literal hex thường, nên tìm-thay thế toàn cục #2563eb sẽ đổi màu chuỗi đầu ở mọi nơi." },
      ],
    ),
  },
};
