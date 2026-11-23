/**
 * CN-038 encoding-detector 扩展语言 overlay(10 语)。
 */

import type { ToolCopy } from "./types";

function common(
  intro: [string, string, string],
  steps: [string, string, string],
  faqs: Array<{ q: string; a: string }>,
) {
  return { intro, steps, faqs };
}

export const ENCODING_OVERLAYS: Record<string, ToolCopy> = {
  fr: {
    name: "Détecteur d'encodage de fichier",
    tagline:
      "Découvrez quel encodage de caractères utilise un fichier — UTF-8, UTF-16, GBK, Big5, Shift_JIS, EUC-KR, Windows-125x ou ISO-8859-x — et lisez ce qu'il dit vraiment. Décodage strict et analyse d'écriture, tout en local.",
    ...common(
      [
        "Déposez un fichier texte ou collez les octets bruts en hexadécimal. L'outil essaie en mode strict tous les encodages connus de votre navigateur, ne garde que ceux qui décodent sans séquence illégale, puis classe les survivants par indice d'écriture : kana pour le japonais, syllabes Hangul pour le coréen, idéogrammes fréquents pour le chinois, profils de fréquence de lettres pour le cyrillique et le grec. Vous obtenez l'encodage retenu, un niveau de confiance et la liste complète des candidats pour changer d'avis.",
        "C'est l'outil de secours contre le mojibake : un CSV exporté par un vieil outil Windows, un fichier de sous-titres avec la mauvaise page de code, un journal d'un serveur chinois ouvert dans un éditeur qui supposait UTF-8. Au lieu de deviner, vous voyez quels encodages sont plausibles et ce que chacun produit, puis vous copiez le texte décodé tel qu'il devait être lu.",
        "La détection est heuristique, pas une preuve, et l'outil le dit. Les échantillons courts et les textes purement ASCII sont réellement ambigus — tous les encodages compatibles ASCII les décodent — ils sont donc signalés à faible confiance plutôt que devinés. GBK et GB18030 sont identiques octet pour octet pour les caractères chinois courants : les deux apparaissent avec le même texte, et choisir l'un ou l'autre est correct.",
      ],
      [
        "Déposez un fichier (2 Mo maximum) ou collez les octets en hexadécimal comme d6 d0 ce c4.",
        "Lisez l'encodage détecté, le niveau de confiance et la ligne d'indice qui explique la décision.",
        "Cliquez sur un autre candidat pour redécoder instantanément, puis copiez le texte.",
      ],
      [
        { q: "Pourquoi l'outil refuse-t-il de nommer un seul encodage pour mon fichier court ?", a: "Parce que ce serait une conjecture présentée comme un fait. Un fichier purement ASCII se décode correctement en UTF-8, GBK, Big5, Shift_JIS et tout encodage compatible ASCII : les octets ne contiennent simplement pas l'indice nécessaire pour choisir. Plutôt que d'en choisir un avec assurance, l'outil signale une confiance faible avec la raison. Des échantillons plus longs contenant du texte non ASCII donnent à l'analyse de quoi travailler." },
        { q: "GBK et GB18030 apparaissent ensemble avec le même score : lequel utiliser ?", a: "L'un ou l'autre. Pour les caractères du chinois simplifié courant, GB18030 et GBK sont identiques octet pour octet ; GB18030 est un sur-ensemble qui ajoute des caractères rares et d'autres écritures. Si votre fichier ne contient que du texte ordinaire, les deux décodent identiquement et le choix est sans effet ; s'il contenait des extensions CJK rares, seul GB18030 les décoderait correctement." },
        { q: "Comment l'outil choisit-il entre Big5 et GBK, qui peuvent décoder les mêmes octets ?", a: "Par fréquence des caractères. Un échantillon encodé en GBK décodé avec le mauvais codec (Big5, EUC-JP) produit des caractères chinois valides mais rares — 笢恅聆彸潠极 au lieu de 中文测试简体 — parce que le mauvais mappage tombe sur des points de code peu fréquents. Le scoreur vérifie si les idéogrammes obtenus tombent dans un ensemble de caractères simplifiés et traditionnels fréquents : un décodage correct les touche presque toujours, un décodage erroné presque jamais." },
        { q: "Mon fichier est-il envoyé quelque part ?", a: "Non. Tout se passe dans l'onglet : le navigateur lit le fichier, exécute les décodeurs WHATWG, note les candidats et affiche le texte. Aucun appel réseau, aucun traitement côté serveur, aucune écriture sur disque ou en base. Fermez l'onglet et les octets disparaissent." },
      ],
    ),
  },
  de: {
    name: "Datei-Kodierung erkennen",
    tagline:
      "Finden Sie heraus, welche Zeichenkodierung eine Datei verwendet — UTF-8, UTF-16, GBK, Big5, Shift_JIS, EUC-KR, Windows-125x oder ISO-8859-x — und lesen Sie, was wirklich drinsteht. Strikte Dekodierung plus Schriftanalyse, alles lokal.",
    ...common(
      [
        "Legen Sie eine Textdatei ab oder fügen Sie Rohbytes als Hex ein. Das Werkzeug versucht im strikten Modus alle Kodierungen, die Ihr Browser kennt, behält nur jene, die ohne illegale Sequenzen dekodieren, und ordnet die Überlebenden nach Schriftbelegen: Kana für Japanisch, Hangul-Silben für Koreanisch, häufige Ideogramme für Chinesisch, Buchstabenhäufigkeitsprofile für Kyrillisch und Griechisch. Sie erhalten die gewählte Kodierung, ein Konfidenzniveau und die vollständige Kandidatenliste, um bei Bedarf zu wechseln.",
        "Dies ist das Rettungswerkzeug für Mojibake: eine CSV aus einem alten Windows-Werkzeug, eine Untertiteldatei mit falscher Codepage, ein Protokoll eines chinesischen Servers, geöffnet in einem Editor, der UTF-8 annahm. Statt zu raten, sehen Sie genau, welche Kodierungen plausibel sind und was jede erzeugt, und kopieren dann den korrekt dekodierten Text.",
        "Erkennung ist Heuristik, kein Beweis, und das Werkzeug sagt es. Kurze Proben und reiner ASCII-Text sind echte Mehrdeutigkeiten — jede ASCII-kompatible Kodierung dekodiert sie — daher werden sie als unsicher gemeldet statt geraten. GBK und GB18030 sind bei gängigen chinesischen Zeichen byteidentisch, also erscheinen beide mit demselben Text; welches Sie wählen, ist gleichgültig.",
      ],
      [
        "Legen Sie eine Datei ab (bis 2 MB) oder fügen Sie die Bytes als Hex ein, etwa d6 d0 ce c4.",
        "Lesen Sie die erkannte Kodierung, das Konfidenzniveau und die Belegzeile, die die Entscheidung erklärt.",
        "Klicken Sie auf einen anderen Kandidaten, um sofort neu zu dekodieren, und kopieren Sie den Text.",
      ],
      [
        { q: "Warum nennt das Werkzeug bei meiner kurzen Datei keine einzelne Kodierung?", a: "Weil es eine Vermutung als Tatsache ausgeben würde. Eine reine ASCII-Datei dekodiert korrekt unter UTF-8, GBK, Big5, Shift_JIS und jeder ASCII-kompatiblen Kodierung — die Bytes enthalten schlicht den nötigen Beleg nicht. Statt eine zu wählen und sicher zu klingen, meldet das Werkzeug geringe Konfidenz mit Begründung. Längere Proben mit Nicht-ASCII-Text geben der Analyse etwas an die Hand." },
        { q: "GBK und GB18030 erscheinen mit gleicher Punktzahl — welche soll ich nehmen?", a: "Beide. Für Zeichen des alltäglichen vereinfachten Chinesisch sind GB18030 und GBK byteidentisch; GB18030 ist eine Obermenge, die seltene Zeichen und weitere Schriften hinzufügt. Enthält Ihre Datei nur gewöhnlichen Text, dekodieren beide gleich und die Wahl ist ohne Belang; enthielte sie seltene CJK-Erweiterungen, dekodierte nur GB18030 sie korrekt." },
        { q: "Wie entscheidet das Werkzeug zwischen Big5 und GBK, die dieselben Bytes dekodieren können?", a: "Über Zeichenhäufigkeit. Eine GBK-kodierte Probe mit dem falschen Codec (Big5, EUC-JP) dekodiert zu gültigen, aber seltenen chinesischen Zeichen — 笢恅聆彸潠极 statt 中文测试简体 — weil die falsche Zuordnung auf seltene Codepunkte fällt. Der Score prüft, ob die resultierenden Ideogramme in einer Menge häufiger vereinfachter und traditioneller Zeichen liegen; eine korrekte Dekodierung trifft sie fast immer, eine falsche fast nie." },
        { q: "Wird meine Datei irgendwohin hochgeladen?", a: "Nein. Alles geschieht im Tab: der Browser liest die Datei, führt die WHATWG-Dekoder aus, bewertet die Kandidaten und zeigt den Text. Kein Netzwerkaufruf, keine serverseitige Verarbeitung, kein Schreiben auf Datenträger oder in eine Datenbank. Schließen Sie den Tab, sind die Bytes weg." },
      ],
    ),
  },
  ru: {
    name: "Определение кодировки файла",
    tagline:
      "Узнайте, какая кодировка у файла — UTF-8, UTF-16, GBK, Big5, Shift_JIS, EUC-KR, Windows-125x или ISO-8859-x — и прочитайте, что в нём действительно написано. Строгое декодирование плюс анализ письменности, всё локально.",
    ...common(
      [
        "Перетащите текстовый файл или вставьте сырые байты в hex. Инструмент перебирает в строгом режиме все кодировки, известные браузеру, оставляет только те, что декодируют без недопустимых последовательностей, и затем ранжирует выживших по признакам письменности: кана для японского, слоги хангыля для корейского, частотные идеограммы для китайского, профили частот букв для кириллицы и греческого. Вы получаете выбранную кодировку, уровень уверенности и полный список кандидатов, чтобы переключиться при несогласии.",
        "Это инструмент спасения от «кракозябр»: CSV из старой программы Windows, файл субтитров с неверной кодовой страницей, лог китайского сервера, открытый в редакторе, который предполагал UTF-8. Вместо догадок вы видите, какие кодировки правдоподобны и что даёт каждая, а затем копируете текст, декодированный так, как его следует читать.",
        "Определение эвристическое, а не доказательство, и инструмент это говорит. Короткие образцы и чисто ASCII-текст действительно неоднозначны — любая ASCII-совместимая кодировка их декодирует — поэтому они помечаются как малоуверенные, а не угадываются. GBK и GB18030 побайтно совпадают для обычных китайских символов, так что оба появляются с одинаковым текстом; выбор любого корректен.",
      ],
      [
        "Перетащите файл (до 2 МБ) или вставьте байты в hex, например d6 d0 ce c4.",
        "Прочитайте определённую кодировку, уровень уверенности и строку с обоснованием решения.",
        "Нажмите на другого кандидата — текст перекодируется мгновенно, затем копируйте его.",
      ],
      [
        { q: "Почему инструмент не называет одну кодировку для моего короткого файла?", a: "Потому что это была бы догадка, выданная за факт. Чисто ASCII-файл корректно декодируется под UTF-8, GBK, Big5, Shift_JIS и любой ASCII-совместимой кодировкой — байты просто не содержат нужных признаков для выбора. Вместо того чтобы выбрать одну и звучать уверенно, инструмент сообщает низкую уверенность с причиной. Более длинные образцы с не-ASCII текстом дают анализу материал." },
        { q: "GBK и GB18030 идут с одинаковым баллом — какую использовать?", a: "Любую. Для символов повседневного упрощённого китайского GB18030 и GBK побайтно идентичны; GB18030 — надмножество, добавляющее редкие символы и другие письменности. Если в файле только обычный текст, обе декодируют одинаково и выбор не важен; если бы там были редкие расширения CJK, корректно декодировала бы только GB18030." },
        { q: "Как инструмент выбирает между Big5 и GBK, которые могут декодировать одни и те же байты?", a: "По частоте символов. Образец в GBK, декодированный неверным кодеком (Big5, EUC-JP), даёт допустимые, но редкие китайские символы — 笢恅聆彸潠极 вместо 中文测试简体 — потому что неверное отображение попадает на низкочастотные кодовые позиции. Оценщик проверяет, попадают ли полученные идеограммы в набор частотных упрощённых и традиционных символов; корректное декодирование попадает почти всегда, ошибочное — почти никогда." },
        { q: "Мой файл куда-нибудь загружается?", a: "Нет. Всё происходит во вкладке: браузер читает файл, запускает декодеры WHATWG, оценивает кандидатов и отображает текст. Никаких сетевых запросов, серверной обработки, записи на диск или в базу данных. Закройте вкладку — байты исчезнут." },
      ],
    ),
  },
  it: {
    name: "Rileva la codifica del file",
    tagline:
      "Scopri quale codifica di caratteri usa un file — UTF-8, UTF-16, GBK, Big5, Shift_JIS, EUC-KR, Windows-125x o ISO-8859-x — e leggi ciò che dice davvero. Decodifica rigorosa più analisi della scrittura, tutto in locale.",
    ...common(
      [
        "Trascina un file di testo o incolla i byte grezzi in esadecimale. Lo strumento prova in modalità rigorosa tutte le codifiche note al tuo browser, tiene solo quelle che decodificano senza sequenze illegali, poi ordina i sopravvissuti per indizi di scrittura: kana per il giapponese, sillabe Hangul per il coreano, ideogrammi frequenti per il cinese, profili di frequenza delle lettere per cirillico e greco. Ottieni la codifica vincente, un livello di fiducia e l'elenco completo dei candidati per cambiare se non sei d'accordo.",
        "È lo strumento di soccorso contro il mojibake: un CSV esportato da un vecchio strumento Windows, un file di sottotitoli con la code page sbagliata, un log di un server cinese aperto in un editor che presumeva UTF-8. Invece di indovinare, vedi esattamente quali codifiche sono plausibili e cosa produce ciascuna, poi copi il testo decodificato come doveva essere letto.",
        "Il rilevamento è euristico, non una prova, e lo strumento lo dice. Campioni brevi e testo puramente ASCII sono davvero ambigui — ogni codifica compatibile ASCII li decodifica — quindi sono segnalati a bassa fiducia invece di essere indovinati. GBK e GB18030 sono identici byte per byte per i caratteri cinesi comuni, quindi entrambi compaiono con lo stesso testo; sceglierne uno qualsiasi è corretto.",
      ],
      [
        "Trascina un file (fino a 2 MB) o incolla i byte in esadecimale come d6 d0 ce c4.",
        "Leggi la codifica rilevata, il livello di fiducia e la riga di evidenza che spiega la decisione.",
        "Clicca su un altro candidato per ridecodificare subito, poi copia il testo.",
      ],
      [
        { q: "Perché lo strumento si rifiuta di indicare un'unica codifica per il mio file breve?", a: "Perché sarebbe una congettura presentata come fatto. Un file puramente ASCII decodifica correttamente in UTF-8, GBK, Big5, Shift_JIS e ogni codifica compatibile ASCII: i byte semplicemente non contengono l'indizio necessario per scegliere. Invece di sceglierne una e suonare sicuro, segnala fiducia bassa con il motivo. Campioni più lunghi con testo non ASCII danno all'analisi qualcosa su cui lavorare." },
        { q: "GBK e GB18030 compaiono insieme con lo stesso punteggio: quale uso?", a: "L'uno o l'altro. Per i caratteri del cinese semplificato quotidiano, GB18030 e GBK sono identici byte per byte; GB18030 è un sovrainsieme che aggiunge caratteri rari e altre scritture. Se il file contiene solo testo ordinario, entrambi decodificano uguale e la scelta è indifferente; se contenesse estensioni CJK rare, solo GB18030 le decodificherebbe correttamente." },
        { q: "Come decide tra Big5 e GBK, che possono decodificare gli stessi byte?", a: "Per frequenza dei caratteri. Un campione codificato GBK decodificato con il codec sbagliato (Big5, EUC-JP) produce caratteri cinesi validi ma rari — 笢恅聆彸潠极 invece di 中文测试简体 — perché la mappatura errata cade su punti di codice poco frequenti. Il punteggio verifica se gli ideogrammi risultanti cadono in un insieme di caratteri semplificati e tradizionali frequenti: una decodifica corretta li colpisce quasi sempre, una errata quasi mai." },
        { q: "Il mio file viene caricato da qualche parte?", a: "No. Tutto avviene nella scheda: il browser legge il file, esegue i decodificatori WHATWG, valuta i candidati e mostra il testo. Nessuna chiamata di rete, nessuna elaborazione lato server, nessuna scrittura su disco o database. Chiudi la scheda e i byte sono spariti." },
      ],
    ),
  },
  tr: {
    name: "Dosya Kodlaması Algılayıcı",
    tagline:
      "Bir dosyanın hangi karakter kodlamasını kullandığını bulun — UTF-8, UTF-16, GBK, Big5, Shift_JIS, EUC-KR, Windows-125x veya ISO-8859-x — ve gerçekte ne yazdığını okuyun. Katı çözme artı yazı sistemi analizi, tamamı yerel.",
    ...common(
      [
        "Bir metin dosyası bırakın veya ham baytları hex olarak yapıştırın. Araç, tarayıcınızın bildiği tüm kodlamaları katı modda dener, geçersiz bayt dizisi olmadan çözebilenleri tutar, sonra kalanları yazı sistemi kanıtına göre sıralar: Japonca için kana, Korece için Hangul heceleri, Çince için yüksek frekanslı ideogramlar, Kiril ve Yunan için harf frekansı profilleri. Kazanan kodlamayı, güven düzeyini ve katılmadığınızda değiştirmek için tüm aday listesini alırsınız.",
        "Bu, mojibake için kurtarma aracıdır: eski bir Windows aracının dışa aktardığı CSV, yanlış kod sayfasına sahip bir altyazı dosyası, UTF-8 varsayan bir düzenleyicide açılmış Çin sunucusu günlüğü. Tahmin etmek yerine hangi kodlamaların makul olduğunu ve her birinin ne ürettiğini görürsünüz, sonra metni okunması gerektiği gibi çözülmüş halde kopyalarsınız.",
        "Algılama bir sezgiseldir, kanıt değildir ve araç bunu söyler. Kısa örnekler ve saf ASCII metin gerçekten belirsizdir — her ASCII uyumlu kodlama onları çözer — bu yüzden tahmin etmek yerine düşük güven olarak bildirilir. GBK ve GB18030 yaygın Çince karakterlerde bayt bayt aynıdır, bu yüzden ikisi de aynı metinle aday olarak görünür; hangisini seçerseniz seçin doğrudur.",
      ],
      [
        "Bir dosya bırakın (2 MB'a kadar) veya baytları d6 d0 ce c4 gibi hex olarak yapıştırın.",
        "Algılanan kodlamayı, güven düzeyini ve kararı açıklayan kanıt satırını okuyun.",
        "Başka bir adaya tıklayın — anında yeniden çözülür, sonra metni kopyalayın.",
      ],
      [
        { q: "Araç neden kısa dosyam için tek bir kodlama belirtmiyor?", a: "Çünkü bu, tahmini gerçek gibi sunmak olurdu. Saf ASCII bir dosya UTF-8, GBK, Big5, Shift_JIS ve her ASCII uyumlu kodlama altında doğru çözülür — baytlar seçim için gereken kanıtı içermiyor. Birini seçip kendinden emin görünmek yerine, nedeniyle birlikte düşük güven bildirir. ASCII dışı metin içeren daha uzun örnekler analize malzeme verir." },
        { q: "GBK ve GB18030 aynı puanla birlikte görünüyor — hangisini kullanmalıyım?", a: "İkisi de olur. Günlük basitleştirilmiş Çincede görünen karakterler için GB18030 ve GBK bayt bayt aynıdır; GB18030 nadir karakterleri ve başka yazıları ekleyen bir üst kümedir. Dosyanızda yalnızca sıradan metin varsa ikisi de aynı çözer ve seçim etkisizdir; nadir CJK uzantıları içerseydi yalnızca GB18030 onları doğru çzerdi." },
        { q: "Araç aynı baytları çözebilen Big5 ile GBK arasında nasıl karar veriyor?", a: "Karakter frekansıyla. GBK ile kodlanmış bir örnek yanlış kodekle (Big5, EUC-JP) çözüldüğünde geçerli ama nadir Çince karakterler üretir — 中文测试简体 yerine 笢恅聆彸潠极 — çünkü yanlış eşleme düşük frekanslı kod noktalarına düşer. Puanlayıcı, elde edilen ideogramların yüksek frekanslı basitleştirilmiş ve geleneksel karakter kümesine düşüp düşmediğini kontrol eder: doğru çözme neredeyse her zaman isabet eder, yanlış çözme neredeyse hiç." },
        { q: "Dosyam bir yere yükleniyor mu?", a: "Hayır. Her şey sekmede olur: tarayıcı dosyayı okur, WHATWG çözücülerini çalıştırır, adayları puanlar ve metni gösterir. Ağ çağrısı, sunucu tarafı işleme, diske veya veritabanına yazma yoktur. Sekmeyi kapatın, baytlar gider." },
      ],
    ),
  },
  ko: {
    name: "파일 인코딩 감지",
    tagline:
      "파일이 어떤 문자 인코딩을 쓰는지 확인하고 — UTF-8, UTF-16, GBK, Big5, Shift_JIS, EUC-KR, Windows-125x 또는 ISO-8859-x — 실제로 무엇을 담고 있는지 읽어 보세요. 엄격 디코딩과 문자 체계 분석, 모두 로컬에서.",
    ...common(
      [
        "텍스트 파일을 끌어다 놓거나 원시 바이트를 16진수로 붙여넣습니다. 도구는 브라우저가 아는 모든 인코딩을 엄격 모드로 시도하고, 불법 바이트 시퀀스 없이 디코딩되는 후보만 남긴 뒤 문자 체계 근거로 순위를 매깁니다 — 일본어는 가나, 한국어는 한글 음절, 중국어는 고빈도 표의문자, 키릴어와 그리스어는 문자 빈도 프로파일입니다. 선택된 인코딩, 신뢰도, 그리고 다른 판단을 원할 때 바꿀 수 있는 전체 후보 목록을 얻습니다.",
        "이것은 깨진 글자(mojibake) 구조 도구입니다. 오래된 Windows 도구가 내보낸 CSV, 코드페이지가 틀린 자막 파일, UTF-8을 가정한 편집기에서 연 중국 서버 로그 등에 씁니다. 추측하는 대신 어떤 인코딩이 그럴듯한지, 각각이 무엇을 만드는지 보고, 원래 읽혀야 할 방식으로 디코딩된 텍스트를 복사합니다.",
        "감지는 휴리스틱이며 증명이 아니고, 도구가 그렇게 밝힙니다. 짧은 표본과 순수 ASCII 텍스트는 본질적으로 모호합니다 — 모든 ASCII 호환 인코딩이 이를 디코딩합니다 — 그래서 추측 대신 낮은 신뢰도로 보고합니다. GBK와 GB18030은 흔한 중국어 문자에서 바이트 단위로 동일하므로 둘 다 같은 텍스트로 후보에 나오며, 어느 것을 골라도 정답입니다.",
      ],
      [
        "파일(최대 2 MB)을 끌어다 놓거나 d6 d0 ce c4처럼 바이트를 16진수로 붙여넣습니다.",
        "감지된 인코딩, 신뢰도, 판단 근거를 설명하는 줄을 읽습니다.",
        "다른 후보를 클릭하면 즉시 다시 디코딩되고, 텍스트를 복사합니다.",
      ],
      [
        { q: "왜 짧은 파일에는 단일 인코딩을 지정하지 않나요?", a: "추측을 사실로 제시하는 셈이기 때문입니다. 순수 ASCII 파일은 UTF-8, GBK, Big5, Shift_JIS 및 모든 ASCII 호환 인코딩에서 올바르게 디코딩됩니다 — 바이트에 선택에 필요한 근거가 없습니다. 하나를 골라 자신 있게 말하는 대신 이유와 함께 낮은 신뢰도를 보고합니다. 비ASCII 문자가 담긴 더 긴 표본은 분석에 재료를 제공합니다." },
        { q: "GBK와 GB18030이 같은 점수로 함께 나오는데 무엇을 쓰나요?", a: "어느 쪽이든 됩니다. 일상적인 간체 중국어에 나타나는 문자에서 GB18030과 GBK는 바이트 단위로 동일하며, GB18030은 희귀 문자와 다른 문자 체계를 추가한 상위 집합입니다. 파일에 평범한 텍스트만 있으면 둘 다 동일하게 디코딩되어 선택이 무의미하며, 희귀 CJK 확장 문자가 있었다면 GB18030만 올바르게 디코딩합니다." },
        { q: "같은 바이트를 디코딩할 수 있는 Big5와 GBK 중 어떻게 고르나요?", a: "문자 빈도로 고릅니다. GBK로 인코딩된 표본을 잘못된 코덱(Big5, EUC-JP)으로 디코딩하면 유효하지만 희귀한 중국어 문자가 나옵니다 — 中文测试简体 대신 笢恅聆彸潠极 — 잘못된 매핑이 저빈도 코드 위치에 떨어지기 때문입니다. 점수 계산기는 결과 표의문자가 고빈도 간체·번체 문자 집합에 드는지 검사하며, 올바른 디코딩은 거의 항상 맞고 잘못된 디코딩은 거의 맞지 않습니다." },
        { q: "제 파일이 어딘가로 업로드되나요?", a: "아니요. 모든 일이 탭 안에서 일어납니다: 브라우저가 파일을 읽고, WHATWG 디코더를 실행하고, 후보를 점수 매기고, 텍스트를 보여 줍니다. 네트워크 호출, 서버 측 처리, 디스크나 데이터베이스 쓰기가 없습니다. 탭을 닫으면 바이트가 사라집니다." },
      ],
    ),
  },
  ar: {
    name: "كاشف ترميز الملفات",
    tagline:
      "اكتشف أي ترميز محارف يستخدم ملفك — UTF-8 أو UTF-16 أو GBK أو Big5 أو Shift_JIS أو EUC-KR أو Windows-125x أو ISO-8859-x — واقرأ ما يقوله فعلاً. فك ترميز صارم مع تحليل نظام الكتابة، كله محليًا.",
    ...common(
      [
        "ألقِ ملفًا نصيًا أو الصق البايتات الخام بصيغة ست عشرية. تجرّب الأداة كل ترميزات يعرفها متصفحك في الوضع الصارم، وتحتفظ فقط بما يفكّ الترميز دون تسلسلات غير صالحة، ثم ترتب الناجية بحسب دليل نظام الكتابة: الكانا لليابانية، ومقاطع الهانغول للكورية، والخطوط الصينية عالية التكرار للصينية، وملامح تكرار الحروف للkirilية واليونانية. تحصل على الترميز الفائز ومستوى الثقة والقائمة الكاملة للمرشحات لتغييرها إن لم توافق.",
        "هذه أداة الإنقاذ من النص المشوّه (mojibake): ملف CSV صدّره أداة ويندوز قديمة، أو ملف ترجمة بصفحة ترميز خاطئة، أو سجل خادم صيني فُتح في محرر افترض UTF-8. بدلًا من التخمين ترى بالضبط أي الترميزات معقولة وما ينتجه كل منها، ثم تنسخ النص مفكوك الترميز كما كان يجب أن يُقرأ.",
        "الكشف استدلالي لا برهاني، والأداة تقول ذلك. العينات القصيرة والنص ASCII الصرف غامضة بحق — كل ترميز متوافق مع ASCII يفكّها — لذلك تُبلَّغ بثقة منخفضة بدلًا من التخمين. GBK و GB18030 متطابقان بايتًا ببايت للمحارف الصينية الشائعة، فيظهر كلاهما بالنص نفسه؛ واختيار أي منهما صحيح.",
      ],
      [
        "ألقِ ملفًا (حتى 2 ميجابايت) أو الصق البايتات ست عشرية مثل d6 d0 ce c4.",
        "اقرأ الترميز المكتشف ومستوى الثقة وسطر الدليل الذي يشرح القرار.",
        "انقر أي مرشح آخر ليُعاد فك الترميز فورًا، ثم انسخ النص.",
      ],
      [
        { q: "لماذا ترفض الأداة تسمية ترميز واحد لملفي القصير؟", a: "لأن ذلك سيكون تخمينًا مقدَّمًا كحقيقة. ملف ASCII الصرف يُفكّ بشكل صحيح تحت UTF-8 و GBK و Big5 و Shift_JIS وكل ترميز متوافق مع ASCII — البايتات ببساطة لا تحوي الدليل اللازم للاختيار. بدلًا من اختيار واحد والتحدث بثقة، تبلّغ بثقة منخفضة مع السبب. العينات الأطول التي تحوي نصًا غير ASCII تمنح التحليل ما يعمل عليه." },
        { q: "يظهر GBK و GB18030 معًا بنفس النتيجة — أيهما أستخدم؟", a: "أي منهما. للمحارف التي تظهر في الصينية المبسطة اليومية، GB18030 و GBK متطابقان بايتًا ببايت؛ GB18030 مجموعة أشمل تضيف محارف نادرة ونصوصًا أخرى. إن احتوى ملفك نصًا عاديًا فقط فكلاهما يفكّه بالتساوي والاختيار بلا أثر؛ وإن احتوى امتدادات CJK نادرة لفكّها GB18030 فقط بشكل صحيح." },
        { q: "كيف تختار الأداة بين Big5 و GBK وهما يستطيعان فك البايتات نفسها؟", a: "بتكرار المحارف. عينة مُرمَّزة بـ GBK تُفكّ بشيفرة خاطئة (Big5 أو EUC-JP) فتنتج محارف صينية صالحة لكنها نادرة — 笢恅聆彸潠极 بدل 中文测试简体 — لأن التعيين الخاطئ يقع على مواضع شيفرة منخفضة التكرار. يفحص المُقيِّم إن كانت الخطوط الناتجة تقع في مجموعة المحارف المبسطة والتقليدية عالية التكرار؛ فالفك الصحيح يصيبها غالبًا والفك الخاطئ لا يصيبها إلا نادرًا." },
        { q: "هل يُرفع ملفي إلى أي مكان؟", a: "لا. كل شيء يحدث في التبويب: المتصفح يقرأ الملف ويشغّل مفكّكات WHATWG ويقيّم المرشحات ويعرض النص. لا اتصال شبكي ولا معالجة على خادم ولا كتابة على قرص أو قاعدة بيانات. أغلق التبويب فتزول البايتات." },
      ],
    ),
  },
  hi: {
    name: "फ़ाइल एनकोडिंग डिटेक्टर",
    tagline:
      "पता लगाएँ कि कोई फ़ाइल कौन-सी वर्ण एनकोडिंग इस्तेमाल करती है — UTF-8, UTF-16, GBK, Big5, Shift_JIS, EUC-KR, Windows-125x या ISO-8859-x — और पढ़ें कि उसमें असल में क्या है। सख्त डिकोडिंग और लिपि विश्लेषण, सब कुछ स्थानीय।",
    ...common(
      [
        "कोई टेक्स्ट फ़ाइल छोड़ें या कच्चे बाइट हेक्स में चिपकाएँ। उपकरण आपके ब्राउज़र की जानी हुई हर एनकोडिंग को सख्त मोड में आज़माता है, केवल वे रखता है जो अवैध बाइट क्रम के बिना डिकोड हों, फिर बचे हुओं को लिपि-प्रमाण से क्रमबद्ध करता है: जापानी के लिए काना, कोरियाई के लिए हांगुल अक्षर, चीनी के लिए उच्च-आवृत्ति अर्थचिह्न, सिरिलिक और ग्रीक के लिए अक्षर-आवृत्ति प्रोफ़ाइल। आपको विजेता एनकोडिंग, विश्वास स्तर, और असहमति पर बदलने योग्य पूरी उम्मीदवार सूची मिलती है।",
        "यह मोजीबेक के लिए बचाव उपकरण है: पुराने Windows उपकरण से निर्यात CSV, गलत कोड पेज वाली सबटाइटल फ़ाइल, UTF-8 मानकर खोला गया चीनी सर्वर लॉग। अनुमान लगाने के बजाय आप देखते हैं कौन-सी एनकोडिंग संभावित है और हर एक क्या पैदा करती है, फिर वैसे डिकोड किया टेक्स्ट कॉपी करते हैं जैसे उसे पढ़ा जाना चाहिए था।",
        "पहचान अनुमानी है, प्रमाण नहीं, और उपकरण यह कहता है। छोटे नमूने और शुद्ध ASCII टेक्स्ट वास्तव में अस्पष्ट हैं — हर ASCII-संगत एनकोडिंग उन्हें डिकोड करती है — इसलिए उन्हें अनुमान लगाने के बजाय कम विश्वास के रूप में सूचित किया जाता है। आम चीनी अक्षरों के लिए GBK और GB18030 बाइट-दर-बाइट समान हैं, इसलिए दोनों एक ही टेक्स्ट के साथ आते हैं; कोई भी चुनना सही है।",
      ],
      [
        "फ़ाइल (2 MB तक) छोड़ें या बाइट को d6 d0 ce c4 जैसे हेक्स में चिपकाएँ।",
        "पहचानी एनकोडिंग, विश्वास स्तर, और निर्णय समझाने वाली प्रमाण पंक्ति पढ़ें।",
        "किसी अन्य उम्मीदवार पर क्लिक करें — तुरंत पुनः डिकोड होगा, फिर टेक्स्ट कॉपी करें।",
      ],
      [
        { q: "मेरी छोटी फ़ाइल के लिए उपकरण एक ही एनकोडिंग क्यों नहीं बताता?", a: "क्योंकि यह अनुमान को तथ्य के रूप में प्रस्तुत करना होगा। शुद्ध ASCII फ़ाइल UTF-8, GBK, Big5, Shift_JIS और हर ASCII-संगत एनकोडिंग के अंतर्गत सही डिकोड होती है — बाइट में चुनाव के लिए ज़रूरी प्रमाण ही नहीं है। एक चुनकर आत्मविश्वास से बोलने के बजाय यह कारण सहित कम विश्वास बताता है। गैर-ASCII टेक्स्ट वाले लम्बे नमूने विश्लेषण को सामग्री देते हैं।" },
        { q: "GBK और GB18030 एक ही स्कोर के साथ दिखते हैं — कौन इस्तेमाल करूँ?", a: "कोई भी। रोज़मर्रा की सरलीकृत चीनी में आने वाले अक्षरों के लिए GB18030 और GBK बाइट-दर-बाइट समान हैं; GB18030 एक सुपरसेट है जो दुर्लभ अक्षर और अन्य लिपियाँ जोड़ता है। यदि फ़ाइल में केवल साधारण टेक्स्ट है तो दोनों समान डिकोड करते हैं और चुनाव का असर नहीं; यदि दुर्लभ CJK विस्तार हों तो केवल GB18030 उन्हें सही डिकोड करेगा।" },
        { q: "एक ही बाइट डिकोड कर सकने वाली Big5 और GBK में उपकरण कैसे चुनता है?", a: "अक्षर आवृत्ति से। GBK-एनकोडेड नमूना गलत कोडेक (Big5, EUC-JP) से डिकोड होने पर वैध पर दुर्लभ चीनी अक्षर देता है — 中文测试简体 के बजाय 笢恅聆彸潠极 — क्योंकि गलत मैपिंग निम्न-आवृत्ति कोड बिंदुओं पर गिरती है। स्कोरर जाँचता है कि परिणामी अर्थचिह्न उच्च-आवृत्ति सरलीकृत और पारंपरिक अक्षर समुच्चय में गिरते हैं या नहीं; सही डिकोडिंग लगभग हमेशा मारती है, गलत लगभग कभी नहीं।" },
        { q: "क्या मेरी फ़ाइल कहीं अपलोड होती है?", a: "नहीं। सब कुछ टैब में होता है: ब्राउज़र फ़ाइल पढ़ता है, WHATWG डिकोडर चलाता है, उम्मीदवारों को स्कोर करता है और टेक्स्ट दिखाता है। कोई नेटवर्क कॉल नहीं, सर्वर-साइड प्रोसेसिंग नहीं, डिस्क या डेटाबेस पर लिखना नहीं। टैब बंद करें और बाइट चले जाते हैं।" },
      ],
    ),
  },
  id: {
    name: "Detektor Encoding Berkas",
    tagline:
      "Cari tahu encoding karakter apa yang dipakai sebuah berkas — UTF-8, UTF-16, GBK, Big5, Shift_JIS, EUC-KR, Windows-125x, atau ISO-8859-x — dan baca apa yang sebenarnya tertulis. Dekode ketat plus analisis aksara, semuanya lokal.",
    ...common(
      [
        "Jatuhkan berkas teks atau tempel byte mentah dalam hex. Alat mencoba semua encoding yang dikenal peramban Anda dalam mode ketat, menyimpan hanya yang terdekode tanpa urutan byte ilegal, lalu mengurutkan yang bertahan berdasarkan bukti sistem aksara: kana untuk Jepang, suku kata Hangul untuk Korea, ideograf frekuensi tinggi untuk Mandarin, profil frekuensi huruf untuk Kiril dan Yunani. Anda mendapat encoding pemenang, tingkat keyakinan, dan daftar kandidat lengkap untuk berganti bila tidak setuju.",
        "Ini alat penyelamat untuk mojibake: CSV hasil ekspor alat Windows lama, berkas subtitle dengan code page salah, log server Mandarin yang dibuka di editor yang mengasumsikan UTF-8. Alih-alih menebak, Anda melihat persis encoding mana yang masuk akal dan apa yang dihasilkan masing-masing, lalu menyalin teks yang terdekode sebagaimana mestinya dibaca.",
        "Deteksi bersifat heuristik, bukan bukti, dan alat menyatakannya. Sampel pendek dan teks ASCII murni memang ambigu — semua encoding kompatibel ASCII mendekodenya — jadi dilaporkan dengan keyakinan rendah alih-alih ditebak. GBK dan GB18030 identik byte demi byte untuk karakter Mandarin umum, jadi keduanya muncul sebagai kandidat dengan teks yang sama; memilih salah satu tetap benar.",
      ],
      [
        "Jatuhkan berkas (hingga 2 MB) atau tempel byte dalam hex seperti d6 d0 ce c4.",
        "Baca encoding terdeteksi, tingkat keyakinan, dan baris bukti yang menjelaskan keputusan.",
        "Klik kandidat lain untuk mendekode ulang seketika, lalu salin teksnya.",
      ],
      [
        { q: "Mengapa alat menolak menyebut satu encoding untuk berkas pendek saya?", a: "Karena itu akan menyajikan dugaan sebagai fakta. Berkas ASCII murni terdekode benar di bawah UTF-8, GBK, Big5, Shift_JIS dan semua encoding kompatibel ASCII — byte-nya memang tidak memuat bukti yang diperlukan untuk memilih. Alih-alih memilih satu dan terdengar yakin, alat melaporkan keyakinan rendah beserta alasannya. Sampel lebih panjang dengan teks non-ASCII memberi analisis bahan untuk bekerja." },
        { q: "GBK dan GB18030 muncul bersamaan dengan skor sama — mana yang saya pakai?", a: "Salah satu saja. Untuk karakter yang muncul dalam Mandarin Sederhana sehari-hari, GB18030 dan GBK identik byte demi byte; GB18030 adalah superset yang menambah karakter langka dan aksara lain. Jika berkas Anda hanya berisi teks biasa, keduanya mendekode sama dan pilihan tidak berpengaruh; jika berisi ekstensi CJK langka, hanya GB18030 yang mendekodenya dengan benar." },
        { q: "Bagaimana alat memilih antara Big5 dan GBK, yang keduanya bisa mendekode byte yang sama?", a: "Lewat frekuensi karakter. Sampel berenkode GBK yang didekode dengan codec salah (Big5, EUC-JP) menghasilkan karakter Mandarin sah tapi langka — 笢恅聆彸潠极 alih-alih 中文测试简体 — karena pemetaan yang salah mendarat di titik kode frekuensi rendah. Penilai memeriksa apakah ideograf hasilnya jatuh dalam himpunan karakter Sederhana dan Tradisional frekuensi tinggi; dekode yang benar hampir selalu mengenainya, yang salah hampir tidak pernah." },
        { q: "Apakah berkas saya diunggah ke suatu tempat?", a: "Tidak. Semua terjadi di tab: peramban membaca berkas, menjalankan dekoder WHATWG, menilai kandidat, dan menampilkan teks. Tidak ada panggilan jaringan, pemrosesan sisi server, atau penulisan ke disk maupun basis data. Tutup tab dan byte-nya hilang." },
      ],
    ),
  },
  vi: {
    name: "Trình phát hiện mã hóa tệp",
    tagline:
      "Tìm ra tệp dùng bảng mã ký tự nào — UTF-8, UTF-16, GBK, Big5, Shift_JIS, EUC-KR, Windows-125x hay ISO-8859-x — và đọc điều nó thực sự chứa. Giải mã nghiêm ngặt cùng phân tích hệ chữ, tất cả cục bộ.",
    ...common(
      [
        "Thả một tệp văn bản hoặc dán byte thô dạng hex. Công cụ thử mọi bảng mã mà trình duyệt bạn biết ở chế độ nghiêm ngặt, chỉ giữ những bảng giải mã được mà không có chuỗi byte bất hợp lệ, rồi xếp hạng những bảng còn sống theo bằng chứng hệ chữ: kana cho tiếng Nhật, âm tiết Hangul cho tiếng Hàn, chữ tượng hình tần suất cao cho tiếng Trung, hồ sơ tần suất chữ cho Kirin và Hy Lạp. Bạn nhận bảng mã thắng, mức tin cậy, và danh sách ứng viên đầy đủ để đổi nếu không đồng ý.",
        "Đây là công cụ cứu hộ mojibake: CSV do công cụ Windows cũ xuất ra, tệp phụ đề sai bảng mã, log máy chủ Trung Quốc mở trong trình soạn thảo giả định UTF-8. Thay vì đoán, bạn thấy chính xác bảng mã nào hợp lý và mỗi bảng tạo ra gì, rồi sao chép văn bản đã giải mã đúng như cách nó phải được đọc.",
        "Phát hiện là suy đoán, không phải chứng minh, và công cụ nói rõ. Mẫu ngắn và văn bản ASCII thuần thực sự mơ hồ — mọi bảng mã tương thích ASCII đều giải mã được chúng — nên được báo cáo với độ tin cậy thấp thay vì đoán. GBK và GB18030 giống nhau từng byte với ký tự Trung Quốc thông dụng, nên cả hai xuất hiện với cùng văn bản; chọn bảng nào cũng đúng.",
      ],
      [
        "Thả tệp (tối đa 2 MB) hoặc dán byte dạng hex như d6 d0 ce c4.",
        "Đọc bảng mã được phát hiện, mức tin cậy, và dòng bằng chứng giải thích quyết định.",
        "Bấm một ứng viên khác để giải mã lại tức thì, rồi sao chép văn bản.",
      ],
      [
        { q: "Vì sao công cụ không chịu nêu một bảng mã duy nhất cho tệp ngắn của tôi?", a: "Vì đó sẽ là phỏng đoán được trình bày như sự thật. Tệp ASCII thuần giải mã đúng dưới UTF-8, GBK, Big5, Shift_JIS và mọi bảng mã tương thích ASCII — byte đơn giản không chứa bằng chứng cần để chọn. Thay vì chọn một và tỏ ra chắc chắn, công cụ báo độ tin cậy thấp kèm lý do. Mẫu dài hơn có văn bản không ASCII cho phân tích thứ để làm việc." },
        { q: "GBK và GB18030 xuất hiện cùng điểm — tôi nên dùng bảng nào?", a: "Cả hai đều được. Với ký tự xuất hiện trong tiếng Trung giản thể thường ngày, GB18030 và GBK giống nhau từng byte; GB18030 là siêu tập thêm ký tự hiếm và hệ chữ khác. Nếu tệp chỉ có văn bản thường, cả hai giải mã như nhau và lựa chọn không ảnh hưởng; nếu chứa phần mở rộng CJK hiếm, chỉ GB18030 giải mã đúng chúng." },
        { q: "Làm sao công cụ chọn giữa Big5 và GBK khi cả hai đều giải mã được cùng byte?", a: "Bằng tần suất ký tự. Mẫu mã hóa GBK giải mã bằng codec sai (Big5, EUC-JP) cho ra ký tự Trung Quốc hợp lệ nhưng hiếm — 笢恅聆彸潠极 thay vì 中文测试简体 — vì ánh xạ sai rơi vào vị trí mã tần suất thấp. Bộ chấm điểm kiểm tra xem chữ tượng hình kết quả có rơi vào tập ký tự Giản thể và Phồn thể tần suất cao không; giải mã đúng gần như luôn trúng, giải mã sai gần như không bao giờ." },
        { q: "Tệp của tôi có bị tải lên đâu không?", a: "Không. Mọi thứ diễn ra trong tab: trình duyệt đọc tệp, chạy bộ giải mã WHATWG, chấm điểm ứng viên và hiển thị văn bản. Không gọi mạng, không xử lý phía máy chủ, không ghi đĩa hay cơ sở dữ liệu. Đóng tab là byte biến mất." },
      ],
    ),
  },
};
