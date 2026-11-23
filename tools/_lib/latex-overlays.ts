/**
 * CN-037 latex-to-image 扩展语言 overlay(10 语)。
 */

import type { ToolCopy } from "./types";

function common(
  intro: [string, string, string],
  steps: [string, string, string],
  faqs: Array<{ q: string; a: string }>,
) {
  return { intro, steps, faqs };
}

export const LATEX_OVERLAYS: Record<string, ToolCopy> = {
  fr: {
    name: "LaTeX vers SVG et PNG",
    tagline:
      "Saisissez une formule LaTeX et obtenez un SVG vectoriel net ou un PNG haute résolution — rendu par MathJax dans votre navigateur, sans installation TeX, sans envoi. Parfait pour insérer des équations dans vos documents, diapositives et articles.",
    ...common(
      [
        "Collez une formule — avec ou sans les délimiteurs habituels $$ / $ / \\( \\), ils sont retirés automatiquement — et l'outil la rend en direct via la sortie SVG de MathJax 4. Vous obtenez un dessin vectoriel réel de l'équation, plus un PNG rastérisé jusqu'à 4× pour les documents qui n'acceptent pas le SVG.",
        "Le SVG contient les contours de glyphes réels sous forme d'éléments <path> dans un cache <defs>, référencés par des <use> : il se met donc à l'échelle sans flou et s'ouvre directement dans Illustrator, Inkscape ou Figma. La marge et un fond blanc ou transparent s'appliquent en élargissant le viewBox, jamais en touchant aux coordonnées des glyphes.",
        "MathJax tolère volontairement les entrées malformées : un \\frac{1}{ non fermé ne lève pas d'erreur, il affiche un petit cadre d'erreur, et une commande inconnue comme \\notacommand s'imprime silencieusement comme du texte littéral. Cette tolérance est pratique en édition en direct et dangereuse pour un outil d'export : cette page vérifie donc l'équilibre des accolades et crochets et refuse les expressions visiblement cassées au lieu d'exporter une formule silencieusement fausse.",
      ],
      [
        "Saisissez ou collez l'expression LaTeX (les délimiteurs comme $$ sont facultatifs).",
        "Choisissez la marge, le fond et l'échelle PNG ; l'aperçu se met à jour au changement.",
        "Téléchargez le .svg pour un usage vectoriel ou le .png pour les documents et le chat, ou copiez le code SVG.",
      ],
      [
        { q: "Faut-il installer une distribution TeX ?", a: "Non. Le rendu utilise MathJax 4, qui implémente l'analyse mathématique TeX et la génération SVG entièrement en JavaScript. Le premier rendu télécharge une fois un paquet moteur de 1,8 Mo ; ensuite chaque formule est rendue localement et instantanément. Rien n'est envoyé à un serveur et aucun compilateur LaTeX n'intervient." },
        { q: "Pourquoi l'outil refuse-t-il des formules que MathJax rendrait sans problème ?", a: "Parce que la tolérance de MathJax produit une sortie silencieusement erronée pour certaines entrées cassées : une accolade non fermée donne une expression partielle avec un cadre d'erreur au lieu d'un échec, et une commande inconnue est imprimée comme du texte. Pour un aperçu en direct c'est commode ; pour une figure exportée c'est un piège. Cet outil vérifie l'équilibre des accolades et crochets et affiche une erreur précise avec la position, pour que vous corrigiez la formule plutôt que de publier une équation cassée." },
        { q: "Le SVG conserve-t-il les polices, ou faut-il installer des polices mathématiques ?", a: "Les glyphes sont de vrais contours vectoriels intégrés en données <path> dans <defs>, pas des références à des polices. Le fichier exporté se rend donc à l'identique sur n'importe quelle machine, sans installation de police, et reste net à tout zoom. C'est aussi pourquoi il pèse quelques kilo-octets plutôt que des dizaines." },
      ],
    ),
  },
  de: {
    name: "LaTeX zu SVG und PNG",
    tagline:
      "Geben Sie eine LaTeX-Formel ein und erhalten Sie ein gestochen scharfes Vektor-SVG oder ein hochauflösendes PNG — gerendert von MathJax in Ihrem Browser, ohne TeX-Installation, ohne Upload. Ideal für Formeln in Dokumenten, Folien und Aufsätzen.",
    ...common(
      [
        "Fügen Sie eine Formel ein — mit oder ohne die üblichen $$ / $ / \\( \\) Begrenzer, sie werden automatisch entfernt — und das Werkzeug rendert sie live über MathJax 4s SVG-Ausgabe. Sie erhalten eine echte Vektorzeichnung der Gleichung sowie ein PNG, bis 4× rastrisiert, für Dokumente ohne SVG-Unterstützung.",
        "Das SVG enthält die tatsächlichen Glyphenumrisse als <path>-Elemente in einem <defs>-Cache plus <use>-Verweise: Es skaliert also ohne Unschärfe und öffnet direkt in Illustrator, Inkscape oder Figma. Rand und ein weißer oder transparenter Hintergrund werden durch Erweitern der viewBox angewendet, niemals durch Verschieben der Glyphenkoordinaten.",
        "MathJax toleriert absichtlich fehlerhafte Eingaben: ein nicht geschlossenes \\frac{1}{ wirft keinen Fehler, sondern zeichnet eine kleine Fehlerbox, und ein unbekannter Befehl wie \\notacommand wird stillschweigend als wörtlicher Text ausgegeben. Diese Toleranz ist beim Live-Editieren praktisch und für ein Exportwerkzeug gefährlich; deshalb prüft diese Seite Klammergleichgewicht vorab und weist offensichtlich kaputte Ausdrücke zurück, statt eine stillschweigend falsche Formel zu exportieren.",
      ],
      [
        "LaTeX-Ausdruck eingeben oder einfügen (Begrenzer wie $$ sind optional).",
        "Rand, Hintergrund und PNG-Skalierung wählen; die Vorschau aktualisiert sich sofort.",
        "Die .svg für Vektorzwecke oder die .png für Dokumente und Chats herunterladen oder den SVG-Quelltext kopieren.",
      ],
      [
        { q: "Brauche ich eine installierte TeX-Distribution?", a: "Nein. Das Rendern nutzt MathJax 4, das TeX-Mathematik-Parsing und SVG-Erzeugung vollständig in JavaScript implementiert. Das erste Rendern lädt einmalig ein 1,8 MB großes Motor-Bündel; danach wird jede Formel lokal und sofort gerendert. Nichts wird an einen Server gesendet, und es ist kein LaTeX-Compiler beteiligt." },
        { q: "Warum weist das Werkzeug Formeln zurück, die MathJax problemlos rendern würde?", a: "Weil MathJax' Toleranz bei manchen kaputten Eingaben stillschweigend falsche Ausgabe erzeugt: eine nicht geschlossene Klammer lässt es einen Teilausdruck mit Fehlerbox statt eines Fehlers rendern, und ein unbekannter Befehl wird als Text gedruckt. Für eine Live-Vorschau ist das bequem; für eine exportierte Abbildung eine Falle. Dieses Werkzeug prüft Klammergleichgewicht vorab und zeigt einen konkreten Fehler mit Position, damit Sie die Formel korrigieren, statt eine kaputte Gleichung zu veröffentlichen." },
        { q: "Behält das SVG seine Schriften, oder muss ich Mathematikschriften installieren?", a: "Die Glyphen sind echte Vektorumrisse, eingebettet als <path>-Daten in <defs>, keine Schriftverweise. Die exportierte Datei rendert daher auf jedem Rechner identisch, ohne Schriftinstallation, und bleibt bei jedem Zoom scharf. Das ist auch der Grund, warum sie wenige Kilobyte statt Dutzende groß ist." },
      ],
    ),
  },
  ru: {
    name: "LaTeX в SVG и PNG",
    tagline:
      "Введите формулу LaTeX и получите чёткий векторный SVG или PNG высокого разрешения — MathJax рендерит её в вашем браузере, без установки TeX и без выгрузки данных. Идеально для вставки формул в документы, презентации и статьи.",
    ...common(
      [
        "Вставьте формулу — с обычными $$ / $ / \\( \\) разделителями или без них, они снимаются автоматически — и инструмент отрендерит её сразу через вывод SVG в MathJax 4. Вы получите настоящий векторный рисунок уравнения, а также PNG с растеризацией до 4× для документов, не принимающих SVG.",
        "В SVG хранятся реальные контуры глифов в виде элементов <path> в кэше <defs> и ссылок <use>: поэтому он масштабируется без размытия и открывается прямо в Illustrator, Inkscape или Figma. Отступ и белый или прозрачный фон задаются расширением viewBox, никогда не сдвигая координаты глифов.",
        "MathJax намеренно терпим к неправильному вводу: незакрытая \\frac{1}{ не вызывает ошибку, а рисует маленькую плашку ошибки, а неизвестная команда вроде \\notacommand тихо печатается как буквальный текст. Такая терпимость удобна при живой правке и опасна для экспорта; поэтому страница заранее проверяет баланс скобок и отвергает явно сломанные выражения, а не экспортирует молча неверную формулу.",
      ],
      [
        "Введите или вставьте выражение LaTeX(разделители вроде $$ необязательны).",
        "Выберите отступ, фон и масштаб PNG; предпросмотр обновляется при изменении.",
        "Скачайте .svg для векторных нужд или .png для документов и чатов, либо скопируйте исходный код SVG.",
      ],
      [
        { q: "Нужна ли установленная дистрибуция TeX?", a: "Нет. Рендеринг использует MathJax 4, который реализует разбор TeX-математики и генерацию SVG полностью на JavaScript. При первом рендере один раз скачивается пакет движка размером 1,8 МБ; затем каждая формула рендерится локально и мгновенно. Ничего не отправляется на сервер, и компилятор LaTeX не участвует." },
        { q: "Почему инструмент отвергает формулы, которые MathJax рендерил бы без проблем?", a: "Потому что терпимость MathJax для некоторых сломанных входов даёт молча неверный вывод: незакрытая скобка заставляет его рисовать частичное выражение с плашкой ошибки вместо отказа, а неизвестная команда печатается как текст. Для живого предпросмотра это удобно; для экспортируемой фигуры — ловушка. Инструмент заранее проверяет баланс скобок и показывает конкретную ошибку с позицией, чтобы вы исправили формулу, а не опубликовали сломанное уравнение." },
        { q: "SVG сохраняет шрифты, или нужно установить математические шрифты?", a: "Глифы — это настоящие векторные контуры, внедрённые как данные <path> внутри <defs>, а не ссылки на шрифты. Поэтому экспортированный файл рендерится одинаково на любой машине без установки шрифтов и остаётся чётким при любом зуме. Отсюда и размер в несколько килобайт вместо десятков." },
      ],
    ),
  },
  it: {
    name: "LaTeX in SVG e PNG",
    tagline:
      "Scrivi una formula LaTeX e ottieni un SVG vettoriale nitido o un PNG in alta risoluzione — renderizzati da MathJax nel tuo browser, senza installare TeX e senza upload. Ideale per inserire equazioni in documenti, slide e articoli.",
    ...common(
      [
        "Incolla una formula — con o senza i delimitatori abituali $$ / $ / \\( \\), vengono rimossi automaticamente — e lo strumento la renderizza subito tramite l'output SVG di MathJax 4. Ottieni un vero disegno vettoriale dell'equazione e un PNG rasterizzato fino a 4× per i documenti che non accettano SVG.",
        "L'SVG contiene i contorni dei glifi reali come elementi <path> in una cache <defs> più riferimenti <use>: scala quindi a qualsiasi dimensione senza sfocatura e si apre direttamente in Illustrator, Inkscape o Figma. Il margine e uno sfondo bianco o trasparente si applicano espandendo il viewBox, mai toccando le coordinate dei glifi.",
        "MathJax tollera volutamente gli input malformati: un \\frac{1}{ non chiuso non lancia errori, disegna un piccolo riquadro di errore, e un comando sconosciuto come \\notacommand viene stampato silenziosamente come testo letterale. Questa tolleranza è comoda in editing dal vivo e pericolosa in uno strumento di esportazione: per questo la pagina controlla in anticipo l'equilibrio di graffe e parentesi quadre e rifiuta le espressioni palesemente rotte, invece di esportare una formula silenziosamente sbagliata.",
      ],
      [
        "Digita o incolla l'espressione LaTeX (i delimitatori come $$ sono opzionali).",
        "Scegli margine, sfondo e scala PNG; l'anteprima si aggiorna al cambiare.",
        "Scarica il .svg per uso vettoriale o il .png per documenti e chat, oppure copia il codice SVG.",
      ],
      [
        { q: "Serve una distribuzione TeX installata?", a: "No. Il rendering usa MathJax 4, che implementa l'analisi matematica TeX e la generazione SVG interamente in JavaScript. Il primo rendering scarica una volta un pacchetto motore da 1,8 MB; poi ogni formula è renderizzata in locale e istantaneamente. Nulla viene inviato a un server e nessun compilatore LaTeX è coinvolto." },
        { q: "Perché lo strumento rifiuta formule che MathJax renderebbe senza problemi?", a: "Perché la tolleranza di MathJax produce output silenziosamente errato per alcuni input rotti: una graffa non chiusa fa renderizzare un'espressione parziale con un riquadro d'errore invece di fallire, e un comando sconosciuto viene stampato come testo. Per un'anteprima dal vivo è comodo; per una figura esportata è una trappola. Questo strumento controlla in anticipo l'equilibrio di graffe e quadre e mostra un errore preciso con la posizione, così correggi la formula invece di pubblicare un'equazione rotta." },
        { q: "L'SVG conserva i font, o devo installare font matematici?", a: "I glifi sono veri contorni vettoriali incorporati come dati <path> dentro <defs>, non riferimenti a font. Il file esportato quindi rende identico su qualsiasi macchina, senza installare font, e resta nitido a qualsiasi zoom. È anche il motivo per cui pesa pochi kilobyte invece di decine." },
      ],
    ),
  },
  tr: {
    name: "LaTeX'ten SVG ve PNG",
    tagline:
      "Bir LaTeX formülü yazın, keskin bir vektör SVG veya yüksek çözünürlüklü PNG alın — MathJax tarayıcınızda işler, TeX kurulumu yok, yükleme yok. Denklemleri belgelere, slaytlara ve makalelere eklemek için ideal.",
    ...common(
      [
        "Bir formül yapıştırın — alışılmış $$ / $ / \\( \\) sınırlayıcılarıyla veya onlarsız, otomatik olarak kaldırılır — araç onu MathJax 4'ün SVG çıktısıyla anında işler. Denklemin gerçek vektör çizimini ve SVG kabul etmeyen belgeler için 4×'e kadar rasterleştirilmiş PNG elde edersiniz.",
        "SVG, gerçek glif dış hatlarını bir <defs> önbelleğinde <path> öğeleri olarak ve <use> referanslarıyla taşır: bu yüzden bulanıklaşmadan her boyuta ölçeklenir ve Illustrator, Inkscape veya Figma'da doğrudan açılır. Dolgu ve beyaz ya da saydam arka plan viewBox'ı genişleterek uygulanır, glif koordinatlarına asla dokunulmaz.",
        "MathJax bozuk girdiyi bilerek tolere eder: kapatılmamış bir \\frac{1}{ hata fırlatmaz, küçük bir hata kutusu çizer ve \\notacommand gibi bilinmeyen bir komut sessizce harf metni olarak yazdırılır. Bu tolerans canlı düzenlemede kullanışlı, dışa aktarma aracında tehlikelidir; bu yüzden bu sayfa parantez dengesini önceden denetler ve sessizce yanlış bir formül dışa aktarmak yerine açıkça bozuk ifadeleri reddeder.",
      ],
      [
        "LaTeX ifadesini yazın veya yapıştırın ($$ gibi sınırlayıcılar isteğe bağlı).",
        "Dolgu, arka plan ve PNG ölçeğini seçin; değiştikçe önizleme güncellenir.",
        "Vektör kullanım için .svg, belgeler ve sohbet için .png indirin ya da SVG kaynağını kopyalayın.",
      ],
      [
        { q: "TeX dağıtımı kurmam gerekiyor mu?", a: "Hayır. İşleme MathJax 4'ü kullanır; TeX matematik ayrıştırmasını ve SVG üretimini tamamen JavaScript'te gerçekleştirir. İlk işlemede 1,8 MB'lık motor paketi bir kez indirilir; sonrasında her formül yerelde ve anında işlenir. Hiçbir şey sunucuya gönderilmez ve LaTeX derleyicisi devreye girmez." },
        { q: "Araç neden MathJax'ın sorunsuz işleyeceği formülleri reddediyor?", a: "Çünkü MathJax'ın toleransı bazı bozuk girdilerde sessizce yanlış çıktı üretir: kapatılmamış bir parantez, başarısız olmak yerine hata kutusuyla kısmi bir ifade çizer ve bilinmeyen bir komut metin olarak yazdırılır. Canlı önizlemede bu rahat; dışa aktarılan bir şekilde tuzak. Bu araç parantez dengesini önceden denetler ve konumuyla birlikte net bir hata gösterir; böylece bozuk bir denklem yayınlamak yerine formülü düzeltirsiniz." },
        { q: "SVG fontları koruyor mu, yoksa matematik fontu kurmam mı gerekiyor?", a: "Glifler <defs> içinde <path> verisi olarak gömülü gerçek vektör dış hatlardır, font referansları değil. Bu yüzden dışa aktarılan dosya her makinede aynı görünür, font kurulumu gerekmez ve her yakınlaştırmada keskin kalır. Onlarca kilobayt yerine birkaç kilobayt olmasının nedeni de budur." },
      ],
    ),
  },
  ko: {
    name: "LaTeX → SVG·PNG 변환",
    tagline:
      "LaTeX 수식을 입력하면 선명한 벡터 SVG 또는 고해상도 PNG를 얻습니다 — 브라우저의 MathJax가 렌더링하며 TeX 설치가 필요 없고 업로드도 없습니다. 문서·슬라이드·논문에 수식을 넣기에 좋습니다.",
    ...common(
      [
        "수식을 붙여넣습니다(보통의 $$ / $ / \\( \\) 구분자는 자동으로 제거됩니다). MathJax 4의 SVG 출력으로 즉시 렌더링되어 수식의 실제 벡터 그림과, SVG를 지원하지 않는 문서용으로 최대 4× 래스터화한 PNG를 얻습니다.",
        "SVG에는 실제 글리프 외곽선이 <defs> 캐시 안의 <path> 요소로 담기고 <use>로 참조됩니다. 따라서 흐려지지 않고 어떤 크기로도 확대되며 Illustrator·Inkscape·Figma에서 바로 열립니다. 여백과 흰색/투명 배경은 viewBox를 확장해 적용하며 글리프 좌표는 절대 건드리지 않습니다.",
        "MathJax는 잘못된 입력을 의도적으로 허용합니다. 닫히지 않은 \\frac{1}{ 는 예외를 던지지 않고 작은 오류 상자를 그리며, \\notacommand 같은 알 수 없는 명령은 조용히 문자 텍스트로 인쇄됩니다. 이런 관용은 실시간 편집에는 편리하지만 내보내기 도구에는 위험합니다. 그래서 이 페이지는 중괄호·대괄호 균형을 미리 검사하고, 조용히 틀린 수식을 내보내는 대신 명백히 깨진 식을 거부합니다.",
      ],
      [
        "LaTeX 식을 입력하거나 붙여넣습니다($$ 같은 구분자는 선택).",
        "여백·배경·PNG 배율을 선택합니다. 바꾸면 미리보기가 갱신됩니다.",
        "벡터용은 .svg, 문서·채팅용은 .png를 내려받거나 SVG 소스를 복사합니다.",
      ],
      [
        { q: "TeX 배포판을 설치해야 하나요?", a: "아니요. 렌더링은 MathJax 4를 사용하며 TeX 수학 파싱과 SVG 생성을 전적으로 JavaScript로 구현합니다. 첫 렌더링에서 1.8 MB 엔진 번들을 한 번 내려받고, 이후 모든 수식은 로컬에서 즉시 렌더링됩니다. 서버로 전송되는 것은 없고 LaTeX 컴파일러도 관여하지 않습니다." },
        { q: "MathJax가 잘 렌더링할 수식을 도구가 거부하는 이유는?", a: "MathJax의 관용이 일부 깨진 입력에서 조용히 틀린 출력을 만들기 때문입니다. 닫히지 않은 중괄호는 실패 대신 오류 상자가 붙은 부분 식으로 렌더링하고, 알 수 없는 명령은 텍스트로 인쇄됩니다. 실시간 미리보기에는 편리하지만 내보낸 그림에는 함정입니다. 이 도구는 중괄호·대괄호 균형을 미리 검사하고 위치와 함께 구체적 오류를 보여 주어, 깨진 수식을 배포하는 대신 식을 고치게 합니다." },
        { q: "SVG가 폰트를 유지하나요, 수학 폰트를 설치해야 하나요?", a: "글리프는 <defs> 안에 <path> 데이터로 내장된 실제 벡터 외곽선이며 폰트 참조가 아닙니다. 그래서 내보낸 파일은 어떤 기기에서도 동일하게 렌더링되고 폰트 설치가 필요 없으며 어떤 배율에서도 선명합니다. 수십 KB가 아니라 몇 KB인 이유도 이것입니다." },
      ],
    ),
  },
  ar: {
    name: "LaTeX إلى SVG و PNG",
    tagline:
      "اكتب صيغة LaTeX واحصل على SVG متجهي واضح أو PNG عالي الدقة — يرسمها MathJax داخل متصفحك، بلا تثبيت TeX وبلا رفع. مثالي لإدراج المعادلات في المستندات والشرائح والأوراق البحثية.",
    ...common(
      [
        "الصق صيغة — مع فواصل $$ / $ / \\( \\) المعتادة أو بدونها، تُزال تلقائيًا — وتقوم الأداة برسمها فورًا عبر مخرجات SVG من MathJax 4. تحصل على رسم متجهي حقيقي للمعادلة، إضافة إلى PNG مُحوَّل إلى نقاط حتى 4× للمستندات التي لا تقبل SVG.",
        "يحمل SVG ملامح المحارف الحقيقية كعناصر <path> داخل ذاكرة <defs> مع مراجع <use>، لذا يتمدد إلى أي حجم دون تشويش ويفتح مباشرة في Illustrator أو Inkscape أو Figma. تُطبَّق الحشوة والخلفية البيضاء أو الشفافة بتوسيع viewBox، دون المساس بإحداثيات المحارف أبدًا.",
        "يتسامح MathJax عمدًا مع المدخلات المشوهة: \\frac{1}{ غير المغلقة لا ترمي خطأ بل ترسم مربع خطأ صغيرًا، والأمر المجهول مثل \\notacommand يُطبع بصمت كنص حرفي. هذا التسامح مفيد في التحرير الحي وخطير في أداة تصدير، لذلك تتحقق هذه الصفحة مسبقًا من توازن الأقواس وترفض التعبيرات المكسورة بوضوح بدلًا من تصدير صيغة خاطئة بصمت.",
      ],
      [
        "اكتب أو الصق تعبير LaTeX (الفاصلات مثل $$ اختيارية).",
        "اختر الحشوة والخلفية ومقياس PNG؛ تتحدث المعاينة عند تغييرها.",
        "نزّل .svg للاستخدام المتجهي أو .png للمستندات والدردشة، أو انسخ مصدر SVG.",
      ],
      [
        { q: "هل أحتاج إلى تثبيت توزيعة TeX؟", a: "لا. يستخدم الرسم MathJax 4 الذي ينفّذ تحليل رياضيات TeX وتوليد SVG بالكامل في JavaScript. عند أول رسم يُنزَّل حزمة محرك بحجم 1.8 ميجابايت مرة واحدة، وبعدها تُرسم كل صيغة محليًا وفورًا. لا يُرسَل شيء إلى خادم ولا يتدخل مترجم LaTeX." },
        { q: "لماذا ترفض الأداة صيغًا كان MathJax سيرسمها بلا مشكلة؟", a: "لأن تسامح MathJax ينتج مخرجات خاطئة بصمت لبعض المدخلات المكسورة: القوس غير المغلق يجعله يرسم تعبيرًا جزئيًا مع مربع خطأ بدلًا من الفشل، والأمر المجهول يُطبع كنص. في المعاينة الحية هذا مريح؛ وفي الشكل المصدَّر فخ. تتحقق هذه الأداة مسبقًا من توازن الأقواس وتعرض خطأ محددًا مع موضعه، لتصحح الصيغة بدلًا من نشر معادلة مكسورة." },
        { q: "هل يحتفظ SVG بالخطوط أم أحتاج إلى تثبيت خطوط رياضية؟", a: "المحارف ملامح متجهية حقيقية مضمَّنة كبيانات <path> داخل <defs> وليست مراجع خطوط. لذلك يُرسم الملف المصدَّر بالشكل نفسه على أي جهاز دون تثبيت خطوط ويبقى واضحًا عند أي تكبير. وهذا أيضًا سبب حجمه بالكيلوبايتات القليلة بدلًا من العشرات." },
      ],
    ),
  },
  hi: {
    name: "LaTeX से SVG और PNG",
    tagline:
      "LaTeX सूत्र टाइप करें और स्पष्ट वेक्टर SVG या उच्च-रिज़ॉल्यूशन PNG पाएँ — MathJax आपके ब्राउज़र में रेंडर करता है, TeX इंस्टॉल नहीं चाहिए, कोई अपलोड नहीं। दस्तावेज़ों, स्लाइड्स और पत्रिकाओं में समीकरण डालने के लिए उपयुक्त।",
    ...common(
      [
        "सूत्र पेस्ट करें — सामान्य $$ / $ / \\( \\) सीमांककों के साथ या बिना, वे अपने आप हट जाते हैं — और उपकरण उसे MathJax 4 के SVG आउटपुट से तुरंत रेंडर करता है। आपको समीकरण का असली वेक्टर चित्र मिलता है, साथ में 4× तक रैस्टराइज़्ड PNG उन दस्तावेज़ों के लिए जो SVG नहीं लेते।",
        "SVG में असली ग्लिफ़ आउटलाइन <defs> कैश में <path> तत्वों के रूप में और <use> संदर्भों के साथ होते हैं: इसलिए यह धुँधला हुए बिना किसी भी आकार में फैलता है और Illustrator, Inkscape या Figma में सीधे खुलता है। पैडिंग और सफ़ेद या पारदर्शी पृष्ठभूमि viewBox बढ़ाकर लागू होती है, ग्लिफ़ निर्देशांक कभी नहीं छेड़े जाते।",
        "MathJax जानबूझकर खराब इनपुट सहता है: बिना बंद किया \\frac{1}{ त्रुटि नहीं फेंकता बल्कि छोटा त्रुटि-बॉक्स बनाता है, और \\notacommand जैसा अज्ञात कमांड चुपचाप शाब्दिक पाठ के रूप में छपता है। यह सहनशीलता लाइव संपादन में सुविधाजनक और निर्यात उपकरण में खतरनाक है, इसलिए यह पृष्ठ ब्रेस/ब्रैकेट संतुलन की पूर्व-जाँच करता है और चुपचाप गलत सूत्र निर्यात करने के बजाय स्पष्ट रूप से टूटे भावों को अस्वीकार करता है।",
      ],
      [
        "LaTeX भाव टाइप या पेस्ट करें($$ जैसे सीमांकक वैकल्पिक)।",
        "पैडिंग, पृष्ठभूमि और PNG स्केल चुनें; बदलने पर प्रीव्यू अपडेट होता है।",
        "वेक्टर उपयोग के लिए .svg या दस्तावेज़/चैट के लिए .png डाउनलोड करें, या SVG स्रोत कॉपी करें।",
      ],
      [
        { q: "क्या मुझे TeX डिस्ट्रिब्यूशन इंस्टॉल करना होगा?", a: "नहीं। रेंडरिंग MathJax 4 का उपयोग करती है जो TeX गणित पार्सिंग और SVG निर्माण पूरी तरह JavaScript में लागू करता है। पहली रेंडरिंग पर 1.8 MB का इंजन बंडल एक बार डाउनलोड होता है; उसके बाद हर सूत्र स्थानीय और तत्काल रेंडर होता है। सर्वर पर कुछ नहीं भेजा जाता और कोई LaTeX कंपाइलर शामिल नहीं है।" },
        { q: "उपकरण उन सूत्रों को क्यों अस्वीकार करता है जिन्हें MathJax सहजता से रेंडर करता?", a: "क्योंकि MathJax की सहनशीलता कुछ टूटे इनपुट पर चुपचाप गलत आउटपुट देती है: बिना बंद ब्रेस विफल होने के बजाय त्रुटि-बॉक्स सहित आंशिक भाव रेंडर कर देता है, और अज्ञात कमांड पाठ के रूप में छप जाता है। लाइव प्रीव्यू में यह सुविधाजनक; निर्यात किए चित्र में जाल। यह उपकरण ब्रेस संतुलन पहले जाँचता है और स्थिति सहित ठोस त्रुटि दिखाता है, ताकि आप टूटा समीकरण प्रकाशित करने के बजाय सूत्र सुधारें।" },
        { q: "क्या SVG फ़ॉन्ट रखता है, या मुझे गणित फ़ॉन्ट इंस्टॉल करने होंगे?", a: "ग्लिफ़ <defs> के भीतर <path> डेटा के रूप में एम्बेडेड असली वेक्टर आउटलाइन हैं, फ़ॉन्ट संदर्भ नहीं। इसलिए निर्यातित फ़ाइल किसी भी मशीन पर समान रेंडर होती है, फ़ॉन्ट इंस्टॉल की ज़रूरत नहीं, और किसी भी ज़ूम पर स्पष्ट रहती है। यही कारण है कि यह दर्जनों के बजाय कुछ किलोबाइट की होती है।" },
      ],
    ),
  },
  id: {
    name: "LaTeX ke SVG & PNG",
    tagline:
      "Ketik formula LaTeX dan dapatkan SVG vektor tajam atau PNG resolusi tinggi — dirender oleh MathJax di peramban Anda, tanpa memasang TeX, tanpa unggah. Ideal untuk menyisipkan persamaan ke dokumen, slide dan makalah.",
    ...common(
      [
        "Tempel formula — dengan atau tanpa pembatas $$ / $ / \\( \\) yang biasa, keduanya dihapus otomatis — dan alat merendernya langsung lewat keluaran SVG MathJax 4. Anda mendapat gambar vektor sungguhan dari persamaan, plus PNG yang dirasterisasi hingga 4× untuk dokumen yang tidak menerima SVG.",
        "SVG membawa kontur glif sungguhan sebagai elemen <path> dalam cache <defs> plus referensi <use>, jadi ia diskalakan ke ukuran apa pun tanpa kabur dan terbuka langsung di Illustrator, Inkscape atau Figma. Padding dan latar putih atau transparan diterapkan dengan memperluas viewBox, tidak pernah dengan menggeser koordinat glif.",
        "MathJax sengaja menoleransi masukan cacat: \\frac{1}{ yang tidak ditutup tidak melempar galat, ia menggambar kotak galat kecil, dan perintah tak dikenal seperti \\notacommand dicetak diam-diam sebagai teks harfiah. Toleransi itu berguna di editor langsung dan berbahaya di alat ekspor, jadi halaman ini memeriksa keseimbangan kurawal dan kurung siku lebih dulu dan menolak ekspresi yang jelas rusak alih-alih mengekspor formula yang diam-diam salah.",
      ],
      [
        "Ketik atau tempel ekspresi LaTeX (pembatas seperti $$ opsional).",
        "Pilih padding, latar dan skala PNG; pratinjau diperbarui saat diubah.",
        "Unduh .svg untuk penggunaan vektor atau .png untuk dokumen dan obrolan, atau salin kode SVG.",
      ],
      [
        { q: "Apakah saya perlu memasang distribusi TeX?", a: "Tidak. Renderisasi memakai MathJax 4 yang mengimplementasikan parsing matematika TeX dan pembuatan SVG sepenuhnya dalam JavaScript. Render pertama mengunduh bundel mesin 1,8 MB sekali; setelah itu setiap formula dirender lokal dan seketika. Tidak ada yang dikirim ke server dan tidak ada kompilator LaTeX yang terlibat." },
        { q: "Mengapa alat menolak formula yang MathJax dengan senang hati akan merender?", a: "Karena toleransi MathJax menghasilkan keluaran yang diam-diam salah untuk sebagian masukan rusak: kurawal tak tertutup membuatnya merender ekspresi parsial dengan kotak galat alih-alih gagal, dan perintah tak dikenal dicetak sebagai teks. Untuk pratinjau langsung itu nyaman; untuk gambar yang diekspor itu jebakan. Alat ini memeriksa keseimbangan kurawal lebih dulu dan menampilkan galat spesifik dengan posisinya, supaya Anda memperbaiki formula alih-alih menerbitkan persamaan rusak." },
        { q: "Apakah SVG menyimpan fontnya, atau saya perlu memasang font matematika?", a: "Glif adalah kontur vektor sungguhan yang tertanam sebagai data <path> di dalam <defs>, bukan referensi font. Karena itu berkas yang diekspor dirender identik di mesin apa pun, tanpa memasang font, dan tetap tajam pada zoom apa pun. Itu juga sebabnya berkasnya beberapa kilobita bukan puluhan." },
      ],
    ),
  },
  vi: {
    name: "LaTeX sang SVG & PNG",
    tagline:
      "Gõ công thức LaTeX và nhận SVG vector sắc nét hoặc PNG độ phân giải cao — MathJax kết xuất trong trình duyệt của bạn, không cần cài TeX, không tải lên. Lý tưởng để chèn phương trình vào tài liệu, slide và bài báo.",
    ...common(
      [
        "Dán công thức — có hay không có dấu phân cách $$ / $ / \\( \\) thông thường, chúng được tự động bỏ — công cụ kết xuất ngay qua đầu ra SVG của MathJax 4. Bạn nhận hình vector thực của phương trình, cùng PNG được raster hóa tới 4× cho tài liệu không nhận SVG.",
        "SVG chứa đường bao glyph thực dưới dạng phần tử <path> trong bộ nhớ đệm <defs> kèm tham chiếu <use>, nên nó co giãn tới mọi kích thước mà không mờ và mở trực tiếp trong Illustrator, Inkscape hay Figma. Đệm và nền trắng hoặc trong suốt được áp bằng cách mở rộng viewBox, không bao giờ chạm vào tọa độ glyph.",
        "MathJax cố ý chấp nhận đầu vào sai dạng: \\frac{1}{ không đóng không ném lỗi mà vẽ một hộp lỗi nhỏ, và lệnh lạ như \\notacommand được in lặng lẽ như chữ thật. Sự chấp nhận đó tiện khi biên tập trực tiếp và nguy hiểm ở công cụ xuất, nên trang này kiểm tra trước cân bằng ngoặc nhọn và ngoặc vuông và từ chối biểu thức hỏng rõ ràng thay vì xuất một công thức sai một cách âm thầm.",
      ],
      [
        "Gõ hoặc dán biểu thức LaTeX (dấu phân cách như $$ là tùy chọn).",
        "Chọn đệm, nền và tỷ lệ PNG; bản xem trước cập nhật khi bạn đổi.",
        "Tải .svg cho mục đích vector hoặc .png cho tài liệu và trò chuyện, hoặc sao chép mã SVG.",
      ],
      [
        { q: "Tôi có cần cài bản phân phối TeX không?", a: "Không. Kết xuất dùng MathJax 4 với phân tích toán TeX và sinh SVG hoàn toàn bằng JavaScript. Lần kết xuất đầu tải một lần gói engine 1,8 MB; sau đó mọi công thức kết xuất cục bộ và tức thì. Không có gì được gửi đến máy chủ và không có trình biên dịch LaTeX tham gia." },
        { q: "Vì sao công cụ từ chối vài công thức mà MathJax vẫn kết xuất dễ dàng?", a: "Vì sự chấp nhận của MathJax tạo đầu ra sai một cách âm thầm với vài đầu vào hỏng: ngoặc nhọn không đóng khiến nó kết xuất biểu thức dở dang kèm hộp lỗi thay vì thất bại, và lệnh lạ được in như chữ. Với xem trước trực tiếp điều đó tiện; với hình đã xuất đó là bẫy. Công cụ này kiểm tra trước cân bằng ngoặc và hiện lỗi cụ thể kèm vị trí, để bạn sửa công thức thay vì phát hành phương trình hỏng." },
        { q: "SVG có giữ phông không, hay tôi phải cài phông toán học?", a: "Glyph là đường bao vector thực được nhúng dưới dạng dữ liệu <path> trong <defs>, không phải tham chiếu phông. Vì thế tệp xuất ra kết xuất giống nhau trên mọi máy, không cần cài phông, và vẫn sắc ở mọi mức thu phóng. Đây cũng là lý do tệp chỉ vài kilobyte thay vì vài chục." },
      ],
    ),
  },
};
