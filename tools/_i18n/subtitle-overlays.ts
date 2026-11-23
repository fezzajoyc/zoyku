/**
 * CN-034 subtitle-converter 扩展语言 overlay(10 语)。
 * 行文规范:fr=vouvoiement、de=Sie、ru=«»、ko=합니다체、ar=MSA;
 * 字符串内一律不出现直引号(fr/it 用撇号、ru 用 «»、de 用 Sie 句式)。
 */

import type { ToolCopy } from "../_lib/types";

function common(
  intro: [string, string, string],
  steps: [string, string, string],
  faqs: Array<{ q: string; a: string }>,
) {
  return { intro, steps, faqs };
}

export const SUBTITLE_OVERLAYS: Record<string, ToolCopy> = {
  fr: {
    name: "Convertisseur de sous-titres",
    tagline:
      "Convertissez vos sous-titres entre SRT et WebVTT dans les deux sens, ou transformez l'ASS/SSA en SRT propre — minutages préservés, balises retirées, tout est traité localement dans votre navigateur.",
    ...common(
      [
        "Collez un sous-titre SRT, WebVTT ou ASS/SSA, choisissez le format de destination et convertissez : SRT et WebVTT s'échangent dans les deux sens avec un minutage identique à la milliseconde, tandis que l'ASS/SSA n'exporte que vers le SRT brut. L'usage classique est le pont vers le navigateur : un SRT que VLC lit sans problème est refusé par l'élément track du HTML5, et voici le chemin le plus court vers un VTT valide.",
        "La conversion est honnête sur ce que chaque format peut exprimer. SRT et WebVTT partagent le même modèle de temps : un aller-retour ne change que la syntaxe — la virgule avant les millisecondes devient un point, l'en-tête WEBVTT et les identifiants de cue apparaissent ou disparaissent, et le texte survit ligne par ligne. L'ASS/SSA est différent : ses balises de position, de karaoké et de style n'ont pas d'équivalent SRT et sont retirées.",
        "Une entrée cassée est refusée au lieu d'être réparée en silence : horodatages manquants, cues inversés (qui finissent avant de commencer) ou fichiers qui se décodent en charabia renvoient une erreur claire. Tout s'exécute dans votre navigateur — rien ne quitte l'appareil.",
      ],
      [
        "Choisissez le format source — SRT, WebVTT ou ASS/SSA — et collez le contenu du sous-titre.",
        "Choisissez le format de destination : WebVTT pour les lecteurs web, SRT pour les lecteurs matériels (l'ASS/SSA produit toujours du SRT).",
        "Cliquez sur Convertir, vérifiez le résultat et copiez-le — fins de ligne et horodatages sont normalisés.",
      ],
      [
        { q: "Les minutages sont-ils préservés exactement ?", a: "Oui. SRT et WebVTT mesurent le temps en heures, minutes, secondes et millisecondes : la conversion ne perd rien — seuls les séparateurs et les en-têtes changent. Les centisecondes de l'ASS/SSA deviennent exactement des millisecondes SRT." },
        { q: "Que deviennent les styles et le karaoké de l'ASS ?", a: "Ils sont retirés. Le SRT n'a pas de modèle de style — police, couleur, positionnement et balises de karaoké ne survivent pas au voyage ; le texte et son minutage, si. Pour garder les effets, multiplexez l'ASS dans le conteneur vidéo." },
      ],
    ),
  },
  de: {
    name: "Untertitel-Konverter",
    tagline:
      "Konvertieren Sie Untertitel in beide Richtungen zwischen SRT und WebVTT, oder verwandeln Sie ASS/SSA in sauberes SRT — Zeitachsen bleiben erhalten, Tags werden entfernt, alles läuft lokal in Ihrem Browser.",
    ...common(
      [
        "Fügen Sie einen SRT-, WebVTT- oder ASS/SSA-Untertitel ein, wählen Sie das Zielformat und konvertieren Sie: SRT und WebVTT wechseln in beide Richtungen mit identischer Millisekunden-Zeitachse, während ASS/SSA nur in eine Richtung zu schlichtem SRT exportiert. Der klassische Anwendungsfall ist die Brücke zum Browser: eine SRT-Datei, die VLC problemlos abspielt, wird vom HTML5-track-Element abgelehnt — hier erhalten Sie am schnellsten ein gültiges VTT.",
        "Die Konvertierung ist ehrlich darüber, was jedes Format ausdrücken kann. SRT und WebVTT teilen dasselbe Zeitmodell: Eine Hin- und Rückreise ändert nur die Syntax — das Komma vor den Millisekunden wird zum Punkt, der WEBVTT-Kopf und Cue-Bezeichner erscheinen oder verschwinden, und der Cue-Text bleibt zeilenweise erhalten. ASS/SSA ist anders: seine Positions-, Karaoke- und Stil-Tags haben kein SRT-Äquivalent und werden entfernt.",
        "Kaputte Eingabe wird abgelehnt, statt stillschweigend repariert zu werden: fehlende Zeitstempel, vertauschte Cue-Zeiten (ein Cue endet, bevor er beginnt) oder Dateien, die als Zeichensalat dekodieren, liefern eine klare Fehlermeldung. Alles läuft in Ihrem Browser — nichts verlässt das Gerät.",
      ],
      [
        "Wählen Sie das Quellformat — SRT, WebVTT oder ASS/SSA — und fügen Sie den Untertitelinhalt ein.",
        "Wählen Sie das Zielformat: WebVTT für Web-Player, SRT für Hardware-Player (ASS/SSA erzeugt immer SRT).",
        "Klicken Sie auf Konvertieren, prüfen Sie das Ergebnis und kopieren Sie es — Zeilenenden und Zeitstempel werden normalisiert.",
      ],
      [
        { q: "Werden die Zeitachsen exakt erhalten?", a: "Ja. SRT und WebVTT messen Zeit in Stunden, Minuten, Sekunden und Millisekunden — die Konvertierung ist für die Zeitachse verlustfrei, nur Trennzeichen und Kopfzeilen ändern sich. ASS/SSA-Zentisekunden werden exakt in SRT-Millisekunden umgerechnet." },
        { q: "Was geschieht mit ASS-Stilen und Karaoke-Effekten?", a: "Sie werden entfernt. SRT hat kein Stilmodell — Schrift, Farbe, Positionierung und Karaoke-Tags überleben die Reise nicht; Text und Zeitachse schon. Für Effekte behalten Sie die ASS-Datei im Videobehälter (muxed)." },
      ],
    ),
  },
  ru: {
    name: "Конвертер субтитров",
    tagline:
      "Преобразуйте субтитры между SRT и WebVTT в обоих направлениях или превратите ASS/SSA в чистый SRT — тайминги сохраняются, теги убираются, всё обрабатывается локально в вашем браузере.",
    ...common(
      [
        "Вставьте субтитры SRT, WebVTT или ASS/SSA, выберите целевой формат и преобразуйте: SRT и WebVTT обмениваются в обоих направлениях с идентичной миллисекундной синхронизацией, а ASS/SSA экспортируется только в одну сторону — в простой SRT. Классический случай — мост в браузер: SRT-файл, который VLC играет без проблем, отклоняется элементом track HTML5, и здесь вы быстрее всего получите корректный VTT.",
        "Преобразование честно относится к тому, что умеет выражать каждый формат. SRT и WebVTT используют одну и ту же модель времени: туда-обратно меняется только синтаксис — запятая перед миллисекундами становится точкой, заголовок WEBVTT и идентификаторы реплик появляются или исчезают, а текст сохраняется построчно. ASS/SSA другой — его теги позиционирования, караоке и стилей не имеют аналогов в SRT и удаляются.",
        "Сломанный ввод отклоняется, а не чинится молча: отсутствующие метки времени, перевёрнутые реплики (конец раньше начала) или файлы, декодирующиеся в абракадабру, возвращают понятную ошибку. Всё выполняется в вашем браузере — ничего не покидает устройство.",
      ],
      [
        "Выберите исходный формат — SRT, WebVTT или ASS/SSA — и вставьте содержимое субтитров.",
        "Выберите целевой формат: WebVTT для веб-плееров, SRT для аппаратных (ASS/SSA всегда даёт SRT).",
        "Нажмите «Преобразовать», проверьте результат и скопируйте его — переводы строк и метки времени нормализуются.",
      ],
      [
        { q: "Сохраняются ли тайминги точно?", a: "Да. SRT и WebVTT измеряют время в часах, минутах, секундах и миллисекундах — преобразование не теряет точность, меняются лишь разделители и заголовки. Сантисекунды ASS/SSA точно превращаются в миллисекунды SRT." },
        { q: "Что происходит со стилями и караоке ASS?", a: "Они удаляются. У SRT нет модели стилей — шрифт, цвет, позиционирование и теги караоке не переживают путь; текст и тайминг переживают. Чтобы сохранить эффекты, держите ASS внутри видеоконтейнера." },
      ],
    ),
  },
  it: {
    name: "Convertitore di sottotitoli",
    tagline:
      "Converti i sottotitoli tra SRT e WebVTT in entrambe le direzioni, o trasforma ASS/SSA in SRT pulito — i tempi restano intatti, i tag vengono rimossi, tutto avviene in locale nel tuo browser.",
    ...common(
      [
        "Incolla un sottotitolo SRT, WebVTT o ASS/SSA, scegli il formato di destinazione e converti: SRT e WebVTT si scambiano in entrambe le direzioni con timing identico al millisecondo, mentre ASS/SSA esporta solo in un verso verso SRT semplice. L'uso classico è il ponte verso il browser: un SRT che VLC riproduce senza problemi viene rifiutato dall'elemento track di HTML5, e qui ottieni al volo un VTT valido.",
        "La conversione è onesta su ciò che ogni formato può esprimere. SRT e WebVTT condividono lo stesso modello di tempi: un viaggio di andata e ritorno cambia solo la sintassi — la virgola prima dei millisecondi diventa un punto, l'intestazione WEBVTT e gli identificatori di cue compaiono o scompaiono, e il testo sopravvive riga per riga. ASS/SSA è diverso — le sue etichette di posizione, karaoke e stile non hanno equivalenti in SRT e vengono rimosse.",
        "L'input rotto viene rifiutato invece che riparato in silenzio: timestamp mancanti, cue invertiti (che finiscono prima di iniziare) o file che decodificano in caratteri senza senso restituiscono un errore chiaro. Tutto gira nel tuo browser — nulla lascia il dispositivo.",
      ],
      [
        "Scegli il formato di origine — SRT, WebVTT o ASS/SSA — e incolla il contenuto del sottotitolo.",
        "Scegli il formato di destinazione: WebVTT per i player web, SRT per i player hardware (ASS/SSA produce sempre SRT).",
        "Premi Converti, controlla il risultato e copialo — fine riga e timestamp vengono normalizzati.",
      ],
      [
        { q: "I tempi vengono preservati esattamente?", a: "Sì. SRT e WebVTT misurano il tempo in ore, minuti, secondi e millisecondi, quindi la conversione è senza perdite per i tempi — cambiano solo separatori e intestazioni. I centesimi di secondo di ASS/SSA diventano esattamente millisecondi SRT." },
        { q: "Cosa succede a stili ed effetti karaoke di ASS?", a: "Vengono rimossi. SRT non ha un modello di stile — font, colore, posizionamento e tag karaoke non sopravvivono al viaggio; il testo e i tempi sì. Per conservare gli effetti, mantieni l'ASS muxato nel contenitore video." },
      ],
    ),
  },
  tr: {
    name: "Altyazı dönüştürücü",
    tagline:
      "Altyazıları SRT ve WebVTT arasında iki yönlü dönüştürün ya da ASS/SSA'yı temiz SRT'ye çevirin — zamanlamalar korunur, etiketler kaldırılır, her şey tarayıcınızda yerel olarak işlenir.",
    ...common(
      [
        "Herhangi bir SRT, WebVTT veya ASS/SSA altyazısını yapıştırın, hedef biçimi seçin ve dönüştürün: SRT ile WebVTT milisaniye bazında aynı zamanlamayla iki yönde takas edilir, ASS/SSA ise tek yönde düz SRT'ye aktarılır. Klasik kullanım tarayıcı köprüsüdür — VLC'nin sorunsuz oynattığı bir SRT dosyasını HTML5 track öğesi reddeder, geçerli bir VTT elde etmenin en hızlı yolu burasıdır.",
        "Dönüşüm, her biçimin ifade edebileceklerine karşı dürüsttür. SRT ile WebVTT aynı zamanlama modelini taşır: gidiş-dönüş yalnızca sözdizimini değiştirir — milisaniyeden önceki virgül noktaya döner, WEBVTT başlığı ve cue tanımlayıcıları eklenir ya da kalkar, metin satır satır korunur. ASS/SSA farklıdır — konumlandırma, karaoke ve stil etiketlerinin SRT karşılığı yoktur ve bunlar kaldırılır.",
        "Bozuk girdi sessizce onarılmak yerine reddedilir: eksik zaman damgaları, ters çevrilmiş cue süreleri (başlamadan biten) veya bozuk karakterlere dönüşen dosyalar net bir hata döndürür. Her şey tarayıcınızda çalışır — hiçbir şey cihazdan çıkmaz.",
      ],
      [
        "Kaynak biçimi seçin — SRT, WebVTT veya ASS/SSA — ve altyazı içeriğini yapıştırın.",
        "Hedef biçimi seçin: web oynatıcılar için WebVTT, donanım oynatıcılar için SRT (ASS/SSA her zaman SRT üretir).",
        "Dönüştür düğmesine basın, sonucu kontrol edin ve kopyalayın — satır sonları ve zaman damgaları normalleştirilir.",
      ],
      [
        { q: "Zamanlamalar tam olarak korunuyor mu?", a: "Evet. SRT ve WebVTT ikisi de zamanı saat, dakika, saniye ve milisaniye cinsinden ifade eder; dönüşüm zamanlama için kayıpsızdır — yalnızca ayraçlar ve başlıklar değişir. ASS/SSA'nın santisaniyeleri tam olarak SRT milisaniyesine döner." },
        { q: "ASS stillerine ve karaoke efektlerine ne olur?", a: "Kaldırılırlar. SRT'nin stil modeli yoktur; yazı tipi, renk, konumlandırma ve karaoke etiketleri yolculuğu atlatamaz — metin ve zamanlama atlatır. Efektleri korumak için ASS dosyasını video kabına gömülü tutun." },
      ],
    ),
  },
  ko: {
    name: "자막 형식 변환기",
    tagline:
      "SRT와 WebVTT를 양방향으로 변환하고 ASS/SSA는 깨끗한 SRT로 내보냅니다 — 타이밍은 정확히 유지되고 태그는 규칙에 따라 제거되며, 모든 처리는 브라우저에서 로컬로 이루어집니다.",
    ...common(
      [
        "SRT, WebVTT 또는 ASS/SSA 자막을 붙여넣고 대상 형식을 선택한 뒤 변환하세요. SRT와 WebVTT는 밀리초 단위로 동일한 타이밍을 유지하며 양방향으로 변환되고, ASS/SSA는 한 방향으로만 일반 SRT로 내보내집니다. 가장 흔한 용도는 브라우저 연결입니다. VLC에서 잘 재생되는 SRT 파일은 HTML5 track 요소가 거부하므로, 여기서 유효한 VTT로 바꾸는 것이 가장 빠릅니다.",
        "변환은 각 형식이 표현할 수 있는 것에 대해 정직합니다. SRT와 WebVTT는 같은 타이밍 모델을 공유하므로 왕복 변환은 구문만 바꿉니다. 밀리초 앞의 쉼표가 점으로 바뀌고, WEBVTT 헤더와 큐 식별자가 붙거나 사라지며, 텍스트는 줄 단위로 그대로 유지됩니다. ASS/SSA는 다릅니다. 위치·가라오케·스타일 태그는 SRT에 대응물이 없어 제거됩니다.",
        "손상된 입력은 조용히 고쳐지는 대신 명확히 거부됩니다. 타임스탬프 누락, 역전된 큐 시간(시작 전에 끝나는 큐), 디코딩 시 깨진 글자가 되는 파일은 명확한 오류를 반환합니다. 모든 처리는 브라우저 안에서 이루어지며 아무것도 기기를 떠나지 않습니다.",
      ],
      [
        "원본 형식(SRT / WebVTT / ASS/SSA)을 선택하고 자막 내용을 붙여넣습니다.",
        "대상 형식을 선택합니다. 웹 플레이어에는 WebVTT, 하드웨어 플레이어에는 SRT(ASS/SSA는 항상 SRT 출력).",
        "변환을 누르고 결과를 확인한 뒤 복사합니다. 줄바꿈과 타임스탬프는 출력 시 정규화됩니다.",
      ],
      [
        { q: "타이밍이 정확히 보존됩니까?", a: "예. SRT와 WebVTT는 둘 다 시·분·초·밀리초로 시간을 표현하므로 변환은 타이밍에 손실이 없습니다. 바뀌는 것은 구분자와 헤더뿐입니다. ASS/SSA의 센티초는 SRT 밀리초로 오차 없이 변환됩니다." },
        { q: "ASS 스타일과 가라오케 효과는 어떻게 됩니까?", a: "제거됩니다. SRT에는 스타일 모델이 없어 글꼴·색·위치·가라오케 태그는 변환을 살아남지 못합니다. 살아남는 것은 텍스트와 타이밍입니다. 효과를 유지하려면 ASS 파일을 비디오 컨테이너에 함께 담아 두세요." },
      ],
    ),
  },
  ar: {
    name: "محوّل صيغ الترجمة",
    tagline:
      "حوّل ملفات الترجمة بين SRT وWebVTT في الاتجاهين، أو حوّل ASS/SSA إلى SRT نظيف — التوقيتات محفوظة والوسوم تُزال وفق القواعد، وكل المعالجة تجري محليًا في متصفحك.",
    ...common(
      [
        "الصق أي ملف ترجمة بصيغة SRT أو WebVTT أو ASS/SSA، واختر صيغة الوجهة ثم حوّل: SRT وWebVTT يتبادلان في الاتجاهين مع توقيت بالملي ثانية متطابق، بينما يُصدَّر ASS/SSA في اتجاه واحد إلى SRT نصي. الاستخدام الكلاسيكي هو الجسر إلى المتصفح: ملف SRT يعمل في VLC بلا مشاكل يرفضه عنصر track في HTML5، وهذه أسرع طريقة للحصول على VTT صالح.",
        "التحويل صادق بشأن ما تستطيع كل صيغة التعبير عنه. SRT وWebVTT يتشاركان نموذج التوقيت نفسه، فالذهاب والعودة يغيّران الصياغة فقط: الفاصلة قبل الملي ثانية تصبح نقطة، وترويسة WEBVTT ومعرّفات النصوص تظهر أو تختفي، وينجو النص سطرًا بسطر. أما ASS/SSA فمختلفة — وسوم التموضع والكاريوكي والأنماط لا مقابل لها في SRT فتُزال.",
        "الإدخال المعطوب يُرفض بدل إصلاحه بصمت: الطوابع الزمنية المفقودة، والنصوص المعكوسة (تنتهي قبل أن تبدأ)، والملفات التي تتحلل إلى رموز غريبة تعيد رسالة خطأ واضحة. كل شيء يعمل في متصفحك — لا شيء يترك جهازك.",
      ],
      [
        "اختر صيغة المصدر — SRT أو WebVTT أو ASS/SSA — والصق محتوى الترجمة.",
        "اختر صيغة الوجهة: WebVTT للمشغّلات الويب، وSRT للمشغّلات المادية (ASS/SSA تنتج SRT دائمًا).",
        "اضغط تحويل، وافحص النتيجة وانسخها — تُوحَّد نهايات الأسطر والطوابع الزمنية عند الإخراج.",
      ],
      [
        { q: "هل تُحفظ التوقيتات بدقة؟", a: "نعم. كل من SRT وWebVTT يعبران الزمن بالساعات والدقائق والثواني والملي ثانية، فالتحويل بلا خسارة للتوقيت — ما يتغير هو الفواصل والترويسات فقط. وتتحول أجزاء الثانية المئوية في ASS/SSA بدقة إلى ملي ثانية SRT." },
        { q: "ماذا يحدث لأنماط وتأثيرات الكاريوكي في ASS؟", a: "تُزال. لا يملك SRT نموذج أنماط، فالخط واللون والتموضع ووسوم الكاريوكي لا تنجو من الرحلة — النص والتوقيت هما ما ينجو. لحفظ التأثيرات أبقِ ملف ASS داخل حاوية الفيديو." },
      ],
    ),
  },
  hi: {
    name: "सबटाइटल कनवर्टर",
    tagline:
      "SRT और WebVTT के बीच दोनों दिशाओं में सबटाइटल बदलें, या ASS/SSA को साफ़ SRT में बदलें — टाइमिंग सटीक बचता है, टैग नियम से हटते हैं, सब कुछ आपके ब्राउज़र में लोकल होता है।",
    ...common(
      [
        "कोई भी SRT, WebVTT या ASS/SSA सबटाइटल पेस्ट करें, टारगेट फॉर्मैट चुनें और बदलें: SRT और WebVTT मिलीसेकंड-स्तर की समान टाइमिंग के साथ दोनों दिशाओं में अदल-बदल होते हैं, जबकि ASS/SSA केवल एक दिशा में सादे SRT में निकलता है। क्लासिक उपयोग ब्राउज़र-पुल है — VLC में आराम से चलने वाली SRT फ़ाइल को HTML5 track एलिमेंट अस्वीकार कर देता है, और यहाँ से वैध VTT सबसे जल्दी मिलता है।",
        "बदलाव हर फॉर्मैट की अभिव्यक्ति-क्षमता के प्रति ईमानदार है। SRT और WebVTT एक ही टाइमिंग मॉडल रखते हैं, इसलिए गोल-मोल यात्रा में सिर्फ़ वाक्य-रचना बदलती है: मिलीसेकंड से पहले का कॉमा बिंदु बन जाता है, WEBVTT हेडर और क्यू पहचानकर्ता जुड़ते या गिरते हैं, और पाठ लाइन-दर-लाइन बचा रहता है। ASS/SSA अलग है — उसके पोज़िशनिंग, कराओके और स्टाइल टैग का SRT में कोई समकक्ष नहीं, वे हटा दिए जाते हैं।",
        "खराब इनपुट चुपचाप ठीक करने की बजाय साफ़ अस्वीकार होता है: गायब टाइमस्टैम्प, उल्टे क्यू समय (शुरू होने से पहले खत्म), या कचरा अक्षरों में बदलने वाली फ़ाइलें स्पष्ट त्रुटि लौटाती हैं। सब कुछ आपके ब्राउज़र में चलता है — कुछ भी डिवाइस नहीं छोड़ता।",
      ],
      [
        "सोर्स फॉर्मैट चुनें — SRT, WebVTT या ASS/SSA — और सबटाइटल सामग्री पेस्ट करें।",
        "टारगेट फॉर्मैट चुनें: वेब प्लेयर के लिए WebVTT, हार्डवेयर प्लेयर के लिए SRT (ASS/SSA हमेशा SRT देता है)।",
        "कनवर्ट दबाएँ, नतीजा जाँचें और कॉपी करें — लाइन एंडिंग और टाइमस्टैम्प निकासी पर सामान्य किए जाते हैं।",
      ],
      [
        { q: "क्या टाइमिंग बिल्कुल सटीक बचता है?", a: "हाँ। SRT और WebVTT दोनों समय को घंटे, मिनट, सेकंड और मिलीसेकंड में मापते हैं, इसलिए बदलाव टाइमिंग के लिए निरंतर है — सिर्फ़ विभाजक और हेडर बदलते हैं। ASS/SSA के सेंटीसेकंड SRT मिलीसेकंड में ठीक-ठीक बदलते हैं।" },
        { q: "ASS स्टाइल और कराओके इफ़ेक्ट का क्या होता है?", a: "वे हटा दिए जाते हैं। SRT में स्टाइल मॉडल नहीं है, इसलिए फ़ॉन्ट, रंग, पोज़िशनिंग और कराओके टैग यात्रा नहीं पार करते — पाठ और टाइमिंग पार करते हैं। इफ़ेक्ट रखने के लिए ASS फ़ाइल को वीडियो कंटेनर में मक्स करके रखें।" },
      ],
    ),
  },
  id: {
    name: "Konverter subtitle",
    tagline:
      "Konversi subtitle antara SRT dan WebVTT ke dua arah, atau ubah ASS/SSA menjadi SRT bersih — waktu dipertahankan, tag dihapus sesuai aturan, semuanya diproses lokal di peramban Anda.",
    ...common(
      [
        "Tempel subtitle SRT, WebVTT, atau ASS/SSA apa pun, pilih format tujuan, dan konversi: SRT dan WebVTT bertukar ke dua arah dengan timing identik tingkat milidetik, sementara ASS/SSA hanya mengekspor satu arah ke SRT polos. Penggunaan klasiknya adalah jembatan ke peramban — berkas SRT yang diputar VLC tanpa masalah ditolak elemen track HTML5, dan inilah jalan tercepat mendapat VTT yang sah.",
        "Konversi ini jujur tentang apa yang mampu diungkapkan tiap format. SRT dan WebVTT memakai model waktu yang sama, jadi perjalanan pulang-pergi hanya mengubah sintaks: koma sebelum milidetik menjadi titik, header WEBVTT dan pengenal cue muncul atau hilang, dan teks bertahan baris demi baris. ASS/SSA berbeda — tag penempatan, karaoke, dan gayanya tidak punya padanan di SRT dan dihapus.",
        "Masukan rusak ditolak alih-alih diperbaiki diam-diam: stempel waktu yang hilang, cue terbalik (berakhir sebelum mulai), atau berkas yang mendekode menjadi karakter kacau mengembalikan pesan galat yang jelas. Semuanya berjalan di peramban Anda — tidak ada yang meninggalkan perangkat.",
      ],
      [
        "Pilih format sumber — SRT, WebVTT, atau ASS/SSA — dan tempel isi subtitle.",
        "Pilih format tujuan: WebVTT untuk pemutar web, SRT untuk pemutar perangkat keras (ASS/SSA selalu menghasilkan SRT).",
        "Tekan Konversi, periksa hasilnya, dan salin — akhir baris dan stempel waktu dinormalkan saat keluar.",
      ],
      [
        { q: "Apakah waktu tetap terjaga persis?", a: "Ya. SRT dan WebVTT keduanya mengukur waktu dalam jam, menit, detik, dan milidetik, jadi konversi tidak kehilangan akurasi waktu — yang berubah hanya pemisah dan header. Sentidetik ASS/SSA berubah tepat menjadi milidetik SRT." },
        { q: "Apa yang terjadi pada gaya dan efek karaoke ASS?", a: "Dihapus. SRT tidak punya model gaya, sehingga font, warna, penempatan, dan tag karaoke tidak bertahan — teks dan waktunya yang bertahan. Untuk menyimpan efek, tetap mux berkas ASS ke dalam kontainer video." },
      ],
    ),
  },
  vi: {
    name: "Công cụ chuyển đổi phụ đề",
    tagline:
      "Chuyển đổi phụ đề giữa SRT và WebVTT theo cả hai chiều, hoặc biến ASS/SSA thành SRT sạch — mốc thời gian giữ nguyên, thẻ được gỡ theo quy tắc, mọi xử lý diễn ra cục bộ trong trình duyệt của bạn.",
    ...common(
      [
        "Dán phụ đề SRT, WebVTT hoặc ASS/SSA, chọn định dạng đích và chuyển đổi: SRT và WebVTT hoán đổi theo cả hai chiều với mốc thời gian trùng khớp từng mili giây, còn ASS/SSA chỉ xuất một chiều sang SRT thuần. Công dụng kinh điển là cây cầu sang trình duyệt — tệp SRT chạy tốt trong VLC bị phần tử track của HTML5 từ chối, và đây là đường nhanh nhất để có VTT hợp lệ.",
        "Việc chuyển đổi trung thực về những gì mỗi định dạng diễn đạt được. SRT và WebVTT dùng chung một mô hình thời gian nên một chuyến khứ hồi chỉ thay đổi cú pháp: dấu phẩy trước mili giây thành dấu chấm, phần đầu WEBVTT và định danh cue xuất hiện hay biến mất, còn chữ giữ nguyên từng dòng. ASS/SSA thì khác — các thẻ định vị, karaoke và phong cách không có tương đương trong SRT và bị gỡ bỏ.",
        "Đầu vào hỏng bị từ chối thay vì vá lặng lẽ: mốc thời gian thiếu, cue đảo ngược (kết thúc trước khi bắt đầu) hoặc tệp giải mã thành ký tự rác đều trả về lỗi rõ ràng. Mọi thứ chạy trong trình duyệt của bạn — không gì rời khỏi thiết bị.",
      ],
      [
        "Chọn định dạng nguồn — SRT, WebVTT hoặc ASS/SSA — rồi dán nội dung phụ đề.",
        "Chọn định dạng đích: WebVTT cho trình phát web, SRT cho trình phát phần cứng (ASS/SSA luôn cho ra SRT).",
        "Bấm Chuyển đổi, kiểm tra kết quả rồi sao chép — xuống dòng và mốc thời gian được chuẩn hóa khi xuất.",
      ],
      [
        { q: "Mốc thời gian có được giữ chính xác không?", a: "Có. SRT và WebVTT đều đo thời gian bằng giờ, phút, giây và mili giây nên việc chuyển đổi không mất mốc thời gian — chỉ dấu phân cách và phần đầu thay đổi. Phần trăm giây của ASS/SSA đổi chính xác thành mili giây của SRT." },
        { q: "Phong cách và hiệu ứng karaoke của ASS thì sao?", a: "Bị gỡ bỏ. SRT không có mô hình phong cách nên phông, màu, định vị và thẻ karaoke không sống sót qua chuyến đi — chữ và mốc thời gian sống sót. Để giữ hiệu ứng, hãy giữ tệp ASS mux trong hộp video." },
      ],
    ),
  },
};
