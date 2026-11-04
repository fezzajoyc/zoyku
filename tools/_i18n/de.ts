import type { ToolCopy } from "../_lib/types";

/**
 * Deutsche Überdeckung (de) der Registry-Tools: ein vollständiger ToolCopy-Block pro Slug.
 * Vertrag: jeder Registry-Slug ist abgedeckt (tests/overlays.test.ts + tests/registry.test.ts).
 * Durchgängig Sie-Form; „Zoyku“ und technische Tokens (PDF, JPG, JSON…) bleiben unverändert.
 */
export const de: Record<string, ToolCopy> = {
  /* ------------------------------------------------------------------ */
  /* PDF                                                                 */
  /* ------------------------------------------------------------------ */
  "compress-pdf": {
    name: "PDF komprimieren",
    tagline:
      "Schwere PDFs verkleinern durch Neu-Rastern der Seiten in gewählter DPI- und JPEG-Qualität — Stapelverarbeitung, exakte Größen vorher/nachher, komplett offline.",
    intro: [
      "Scans und bildlastige Berichte sind oft zehnmal größer als nötig. Dieses Tool rendert jede Seite in einer Auflösung Ihrer Wahl neu (72–150 DPI decken Bildschirmlesen und die meisten Drucke ab) und kodiert sie als optimiertes JPEG neu — das reduziert die Dateigröße typischerweise um 50–90 %.",
      "Verarbeiten Sie mehrere Dateien gleichzeitig und sehen Sie die genaue Ersparnis pro Datei, bevor Sie herunterladen. Der Graustufen-Modus staucht Schwarz-Weiß-Scans zusätzlich. Alles läuft auf Ihrem Gerät — komprimiert oder nicht, Ihre Dokumente bleiben bei Ihnen.",
    ],
    steps: [
      "Ziehen Sie eine oder mehrere PDF-Dateien hierher (Stapelverarbeitung ist ausdrücklich willkommen).",
      "Wählen Sie DPI und JPEG-Qualität oder aktivieren Sie Graustufen.",
      "Klicken Sie auf Komprimieren, vergleichen Sie die Größen vorher/nachher und laden Sie herunter.",
    ],
    faqs: [
      {
        q: "Hat mein PDF nach der Komprimierung noch auswählbaren Text?",
        a: "Nein — dieses Verfahren rastert die Seiten als Bilder neu, der Text wird also zu Pixeln. Das ist der Preis für die starke Größenreduktion. Wenn Sie durchsuchbaren Text brauchen, behalten Sie das Original und teilen Sie die komprimierte Kopie nur dort, wo die Dateigröße zählt.",
      },
      {
        q: "Welche Einstellungen soll ich wählen?",
        a: "96 DPI bei rund 60 % Qualität sind ein guter Standard für E-Mail und Web. Für den Druck empfehlen sich 150 DPI; 72 DPI in Graustufen sind radikal, reichen für reine Textarchive aber aus.",
      },
      {
        q: "Was, wenn die Datei kaum schrumpft?",
        a: "Sehr schlanke, rein textuelle PDFs sind bereits effizient und lassen sich womöglich nicht weiter komprimieren — die Tabelle sagt Ihnen das ehrlich. Senken Sie DPI oder Qualität und versuchen Sie es erneut, oder akzeptieren Sie, dass das Original schon schlank war.",
      },
    ],
  },
  "delete-pdf-pages": {
    name: "PDF-Seiten löschen",
    tagline:
      "Unerwünschte Seiten in Sekunden aus einem PDF entfernen — Seiten zum Löschen eintippen, gestutzte Datei herunterladen, alles verarbeitet in Ihrem Browser.",
    intro: [
      "Leerseiten, ein altes Deckblatt, eine Seite mit den Daten anderer — geben Sie sie als „1, 3-5“ ein und erhalten ein sauberes PDF mit allem anderen intakt. Das Tool zeigt die Seitenzahl Ihres Dokuments, damit Sie die Nummern prüfen können, bevor Sie schneiden.",
      "Die verbleibenden Seiten werden bytegenau kopiert: Text bleibt auswählbar, Bilder behalten ihre Qualität. Alles geschieht lokal mit pdf-lib; die Datei wird nie hochgeladen.",
    ],
    steps: [
      "Ziehen Sie das PDF hierher, das Sie stutzen möchten.",
      "Tippen Sie die zu löschenden Seiten ein, zum Beispiel „2, 6-8“.",
      "Klicken Sie auf Seiten löschen und laden Sie das Restdokument herunter.",
    ],
    faqs: [
      {
        q: "Kann ich alle Seiten eines Dokuments löschen?",
        a: "Nein — ein PDF braucht mindestens eine Seite. Wenn Sie jede Seite eingeben, lehnt das Tool ab; löschen Sie stattdessen alles außer einer, wenn genau das Ihr Ziel ist.",
      },
      {
        q: "Wie behalte ich nur wenige Seiten?",
        a: "Einfacher umgekehrt denken: löschen Sie alles, was Sie nicht brauchen. „2-10, 12“ bei einem 12-seitigen Dokument lässt die Seiten 1 und 11 übrig.",
      },
      {
        q: "Was passiert mit der Seitennummerierung?",
        a: "Die Seiten rücken automatisch nach: Nach dem Löschen der Seiten 2–4 wird die ehemalige Seite 5 zur Seite 2. Interne Links, die auf gelöschte Seiten zeigten, können dadurch brechen.",
      },
    ],
  },
  "image-to-pdf": {
    name: "Bilder zu PDF",
    tagline:
      "Bilder in jedem Format — JPG, PNG, WebP, GIF und mehr — in einem einzigen PDF vereinen, mit automatischer Konvertierung und null Uploads.",
    intro: [
      "Ein Tool für jedes Bild: Werfen Sie einen gemischten Stapel aus JPG-, PNG-, WebP-, GIF- oder BMP-Dateien ab, und alle landen in einem PDF. Was noch nicht PDF-tauglich ist, wird lokal über eine Canvas konvertiert — gemischte Stapel funktionieren einfach.",
      "Sortieren Sie die Seiten, wählen Sie Bildgröße anpassen oder A4/Letter mit Rändern, und exportieren Sie. Das ist das Schweizer Taschenmesser unserer JPG- und PNG-Konverter, mit demselben Versprechen: Dateien verlassen Ihr Gerät nie.",
    ],
    steps: [
      "Ziehen Sie Bilder in beliebiger Mischung der unterstützten Formate hierher.",
      "Ordnen Sie die Liste neu und wählen Sie das Seitenformat.",
      "Klicken Sie auf PDF erstellen und laden Sie Ihr Dokument herunter.",
    ],
    faqs: [
      {
        q: "Welche Formate werden unterstützt?",
        a: "Alles, was Ihr Browser anzeigen kann: JPG, PNG, WebP, GIF, BMP und auf den meisten Systemen AVIF. Dateien, die bereits als JPG oder PNG vorliegen, werden ohne Neukodierung eingebettet; alle anderen werden zuerst verlustfrei in PNG umgewandelt.",
      },
      {
        q: "Was passiert mit HEIC-Fotos vom iPhone?",
        a: "Moderne Browser können HEIC oft nicht direkt dekodieren. Wandeln Sie sie zuerst mit unserem HEIC zu JPG-Tool um und fügen Sie die JPGs dann hier zusammen.",
      },
      {
        q: "Sind animierte GIFs im PDF animiert?",
        a: "Nein — eine PDF-Seite ist statisch, Sie erhalten das erste Einzelbild. Verwandeln Sie Animationen in Videos oder teilen Sie das GIF direkt.",
      },
    ],
  },
  "jpg-to-pdf": {
    name: "JPG zu PDF",
    tagline:
      "JPG-Fotos in Ihrem Browser in ein sauberes PDF verwandeln — Stapelimport, Neusortierung per Klick und Seitenformate A4, Letter oder bildfüllend.",
    intro: [
      "Wandeln Sie beliebig viele JPG-Fotos in ein ordentliches PDF um: Passfotos, Belege, gescannte Hausaufgaben oder einen Kameraroll, den Sie als einzelnen Anhang verschicken wollen. Fügen Sie alle Bilder auf einmal hinzu, sortieren Sie sie mit den Pfeiltasten und entscheiden Sie, ob jede Seite das Foto eng umschließt oder A4/Letter mit Rand nutzt.",
      "Die Fotos werden in voller Originalqualität eingebettet — keine Skalierung, keine Neukomprimierung, kein Wasserzeichen. Die Konvertierung passiert auf Ihrem Gerät, selbst private Bilder berühren also nie einen Server.",
    ],
    steps: [
      "Ziehen Sie alle JPG-Bilder hierher, die Sie einbinden möchten.",
      "Bringen Sie die Reihenfolge in Ordnung und wählen Sie ein Seitenformat (anpassen, A4 oder Letter).",
      "Klicken Sie auf PDF erstellen und laden Sie das Ergebnis herunter.",
    ],
    faqs: [
      {
        q: "Verlieren die Fotos im PDF an Qualität?",
        a: "Nein. Ihre JPG-Dateien werden bytegenau eingebettet, die Bilddaten im PDF sind also identisch mit den Originalen. Qualität verliert das PDF erst, wenn Sie es danach komprimieren.",
      },
      {
        q: "Wie viele Bilder kann ich auf einmal umwandeln?",
        a: "So viele, wie der Speicher Ihres Browsers erlaubt — Dutzende sind Routine; hunderte mehr-Megabyte-Fotos können langsam werden, funktionieren aber weiterhin lokal.",
      },
      {
        q: "Kann ich JPG mit PNG oder anderen Formaten mischen?",
        a: "Ja — nutzen Sie für gemischte Stapel das allgemeine Bilder-zu-PDF-Tool; es konvertiert andere Formate automatisch, bevor es sie einbettet.",
      },
    ],
  },
  "merge-pdf": {
    name: "PDF zusammenfügen",
    tagline:
      "Mehrere PDFs direkt im Browser zu einem Dokument vereinen — Dateien frei anordnen, ohne Uploads, ohne Wasserzeichen, ohne Anmeldung.",
    intro: [
      "Werfen Sie so viele PDFs hinein, wie Sie brauchen, ordnen Sie sie exakt in der gewünschten Reihenfolge und fügen Sie sie zu einer einzigen Datei zusammen. Buchungen, Rechnungen, gescannte Kapitel, Bewerbungsmappen — alles, was als zehn einzelne Anhänge ankommt, wird zu einem ordentlichen Dokument.",
      "Anders als Online-Dienste, die Ihre Dateien auf einen Server laden, liest und schreibt dieses Tool PDFs vollständig auf Ihrem Gerät mit pdf-lib. Ihre Verträge, Ausweise und Finanzdokumente verlassen Ihren Browser nie.",
    ],
    steps: [
      "Ziehen Sie zwei oder mehr PDF-Dateien in das Feld (oder klicken Sie, um sie auszuwählen).",
      "Ordnen Sie die Liste mit den ↑/↓-Tasten so lange um, bis die Reihenfolge stimmt.",
      "Klicken Sie auf PDFs zusammenfügen und laden Sie die kombinierte Datei herunter.",
    ],
    faqs: [
      {
        q: "Wie viele PDFs kann ich zusammenfügen, und wie groß dürfen sie sein?",
        a: "Es gibt kein künstliches Limit — die praktische Grenze ist der Speicher Ihres Geräts. Ein moderner Laptop fügt problemlos 20+ Dateien oder rund 100–200 MB zusammen; sehr große Scans können langsamer sein, funktionieren aber weiterhin.",
      },
      {
        q: "Überleben Lesezeichen, Formularfelder oder Anmerkungen das Zusammenfügen?",
        a: "Seiteninhalte, Bilder und die meisten Anmerkungen bleiben erhalten. Dokumentweite Extras wie Lesezeichen und Formularwerte werden nicht übernommen — die zusammengeführte Datei enthält die sichtbaren Seiten jeder Quelle.",
      },
      {
        q: "Werden meine Dateien irgendwo hochgeladen?",
        a: "Nein. Das Zusammenfügen geschieht lokal in Ihrem Browser mit JavaScript. Nichts wird an einen Server gesendet, und das zusammengeführte PDF entsteht auf Ihrem eigenen Gerät.",
      },
    ],
  },
  "ocr-pdf": {
    name: "PDF OCR",
    tagline:
      "OCR für gescannte PDFs vollständig im Browser ausführen — Englisch, Chinesisch, Japanisch und mehr erkennen, dann Text kopieren oder speichern.",
    intro: [
      "Gescannte Verträge, Belege und Bücher haben keinen auswählbaren Text — OCR verschafft ihnen einen. Jede Seite wird in Ihrem Browser gerendert und von der Tesseract-Engine gelesen, mit Sprachunterstützung für Englisch, vereinfachtes Chinesisch, Japanisch, Spanisch, Portugiesisch, Französisch und Deutsch.",
      "Beim ersten Einsatz lädt Ihr Browser die OCR-Engine und das Sprachmodell (10–20 MB) von einem öffentlichen CDN — das ist der einzige Netzverkehr, und er enthält nie Ihr Dokument. Die Erkennung selbst läuft auf Ihrem Gerät.",
    ],
    steps: [
      "Ziehen Sie ein gescanntes PDF hierher und wählen Sie die Sprache des Dokuments.",
      "Begrenzen Sie die OCR optional auf bestimmte Seiten, und klicken Sie dann auf OCR starten.",
      "Kopieren Sie den erkannten Text oder laden Sie ihn als .txt-Datei herunter.",
    ],
    faqs: [
      {
        q: "Warum braucht der erste Durchlauf eine Internetverbindung?",
        a: "Die Tesseract-OCR-Engine und ihr Sprachmodell werden beim ersten Einsatz aus einem CDN geladen (10–20 MB, danach im Cache). Das PDF selbst wird nie hochgeladen — die Erkennung läuft lokal, sobald das Modell bereit ist.",
      },
      {
        q: "Wie verbessere ich die Erkennungsgenauigkeit?",
        a: "Scannen Sie mit 300 DPI, halten Sie die Seite gerade und wählen Sie die richtige Sprache. Saubere Schwarz-Weiß-Seiten erreichen deutlich über 90 % Genauigkeit; schiefe Fotos mit Schatten liegen weit darunter.",
      },
      {
        q: "Kann das Tool Handschrift lesen?",
        a: "Nicht zuverlässig. Tesseract ist auf gedruckten Text trainiert — ordentliche Typografie funktioniert, geschriebene Handschrift ergibt meist nur wirres Zeug.",
      },
    ],
  },
  "page-numbers-pdf": {
    name: "PDF-Seitenzahlen hinzufügen",
    tagline:
      "Seitenzahlen in sechs Formaten auf jede PDF-Seite stempeln — Format, Ecke und Startnummer frei wählen, alles lokal im Browser.",
    intro: [
      "Geben Sie einem PDF vor dem Drucken oder Teilen richtige Seitenzahlen: Wählen Sie ein Format (1, 1/N oder Seite 1 von N), eine von sechs Ecken und die Startnummer — die Datei wird auf Ihrem Gerät neu aufgebaut und steht zum Herunterladen bereit.",
      "Nützlich für Berichte, Verträge, gescannte Sammelwerke und alles, was in Besprechungen seitenweise zitiert wird.",
    ],
    steps: [
      "Ziehen Sie das PDF hierher, das nummeriert werden soll.",
      "Wählen Sie Format, Ecke und Startnummer.",
      "Klicken Sie auf Seitenzahlen hinzufügen und laden Sie die gestempelte Datei herunter.",
    ],
    faqs: [
      {
        q: "Kann ich das Deckblatt ausnehmen?",
        a: "Setzen Sie „Nummerierung starten bei“ auf 0, dann bekommt das Deckblatt die Nummer 0 — oder schneiden Sie das Deckblatt zuerst ab, nummerieren Sie den Rest und fügen Sie beides wieder zusammen.",
      },
      {
        q: "Wirken die Zahlen bei gemischten Seitenformaten einheitlich?",
        a: "Jede Seite wird relativ zu ihrer eigenen Breite und Höhe gestempelt, deshalb landet die Zahl bei gemischten Ausrichtungen und Formaten immer in derselben visuellen Ecke.",
      },
    ],
  },
  "pdf-to-excel": {
    name: "PDF zu Excel",
    tagline:
      "Zeilen und Spalten eines PDFs in eine editierbare Excel-Tabelle (.xlsx) überführen — zeilenweise Konvertierung im Browser, kostenlos.",
    intro: [
      "Kontoauszüge, Preislisten und Berichte, die im PDF festgenagelt sind, werden wieder nutzbare Daten: Jede sichtbare Zeile wird zur Tabellenzeile, und durch weite Abstände getrennter Text wird automatisch in Spalten aufgeteilt. Seitenzahlen landen in der ersten Spalte, damit alles nachvollziehbar bleibt.",
      "Das ist eine praktische, textbasierte Extraktion — keine KI-Tabellenrekonstruktion. Sie glänzt bei Schreibmaschinenauszügen und ausgerichteten Listen; chaotische mehrzeilige Tabellen brauchen eventuell eine kurze Nachbearbeitung in Excel. Der Vorteil: Ihre Daten verlassen das Gerät nie.",
    ],
    steps: [
      "Ziehen Sie ein textbasiertes PDF hierher (auswählbarer Text, kein Fotoscan).",
      "Klicken Sie auf Zu Excel konvertieren.",
      "Laden Sie die .xlsx herunter und richten Sie zusammengeklebte Zeilen in Excel zurecht.",
    ],
    faqs: [
      {
        q: "Wie werden Spalten erkannt?",
        a: "Zeilen werden überall in Zellen geteilt, wo zwei oder mehr Leerzeichen auftreten — das übliche Ausrichtungsmerkmal in PDF-Text. Sauber ausgerichtete Tabellen konvertieren glatt; Fließtext ergibt eine Zelle pro Zeile.",
      },
      {
        q: "Mein gescannter Auszug ergibt ein leeres Blatt.",
        a: "Scans haben keine Textebene. Schicken Sie die Datei zuerst durch unser OCR-Tool, fügen Sie den erkannten Text in Excel ein oder konvertieren Sie die OCR-Ausgabe hier.",
      },
      {
        q: "Behalten Zahlen ihre Formatierung?",
        a: "Werte landen exakt wie gedruckt als Text — führende Nullen und regionale Dezimalkommas bleiben erhalten. Excel behandelt sie als Zeichenketten, bis Sie die Spalte umwandeln.",
      },
    ],
  },
  "pdf-to-jpg": {
    name: "PDF zu JPG",
    tagline:
      "Jede PDF-Seite als JPG mit bis zu 300 DPI exportieren — Einzelseiten oder ein ZIP für viele, konvertiert direkt auf Ihrem Gerät.",
    intro: [
      "Verwandeln Sie ein PDF in teilbare Bilder: Jede Seite wird ein JPG in der von Ihnen gewählten Auflösung, gerendert genau so, wie die Seite aussieht — Schriften, Farben und Bilder inklusive. Zehn Seiten ergeben zehn nummerierte Dateien; ab zwei erhalten Sie zusätzlich ein ZIP.",
      "JPG ist das Format, das Chats, Präsentationen und soziale Plattformen überall akzeptieren. Das Rendern läuft lokal mit pdf.js — das PDF wird nie hochgeladen, was bei Verträgen und persönlichen Dokumenten zählt.",
    ],
    steps: [
      "Ziehen Sie das PDF hierher, das Sie konvertieren möchten.",
      "Wählen Sie die Ausgabeauflösung (150 DPI passen für die meisten Bildschirme).",
      "Klicken Sie auf Konvertieren und laden Sie jede Seite oder das ZIP herunter.",
    ],
    faqs: [
      {
        q: "Welche Auflösung soll ich wählen?",
        a: "96 DPI genügen für die Bildschirmansicht, 150 DPI sind der ausgewogene Standard, und 200–300 DPI passen zum Drucken. Höhere DPI bedeuten größere Dateien und langsames Rendern bei langen Dokumenten.",
      },
      {
        q: "Warum sieht der Text weicher aus als im PDF?",
        a: "JPG ist ein verlustbehaftetes Fotoformat — bei niedriger Qualität bekommen scharfe Buchstabenkanten leichte Artefakte. Erhöhen Sie die DPI oder nutzen Sie das PDF zu PNG-Tool für pixelperfekten Text.",
      },
      {
        q: "Kann ich nur einige Seiten konvertieren?",
        a: "Dieses Tool konvertiert das ganze Dokument und benennt die Dateien nach Seitenzahl, sodass Sie nur die benötigten behalten. Nutzen Sie zuerst PDF teilen, wenn Sie vorab einen bestimmten Bereich wollen.",
      },
    ],
  },
  "pdf-to-png": {
    name: "PDF zu PNG",
    tagline:
      "PDF-Seiten in verlustfreie PNG-Bilder in Ihrer Wunschauflösung umwandeln — gestochen scharfe Folien und Scans, mit ZIP bei vielen Seiten.",
    intro: [
      "Wo JPG-Artefakte unerwünscht sind — Folien-Screenshots, Diagramme, Formulare mit kleingedrucktem — exportieren Sie Seiten als PNG. Das verlustfreie Format hält Buchstabenkanten und feine Linien pixelscharf, von 96 bis 300 DPI.",
      "Jede Seite wird lokal mit pdf.js genau in dem Aussehen gerendert, das das PDF definiert. Dateien werden nach Seitenzahl benannt, mehrseitige Ergebnisse kommen mit einem Ein-Klick-ZIP.",
    ],
    steps: [
      "Ziehen Sie Ihr PDF in das Feld.",
      "Wählen Sie die Auflösung — 150 DPI sind ein solider Standard.",
      "Klicken Sie auf Zu PNG konvertieren und laden Sie Seiten oder das ZIP herunter.",
    ],
    faqs: [
      {
        q: "Wann nehme ich PNG statt JPG?",
        a: "Immer wenn die Seiten Text, Flächenfarben oder Strichzeichnungen enthalten: PNG hält diese perfekt scharf. JPG passt zu fotografischen Seiten, wo kleine Dateigröße wichtiger ist.",
      },
      {
        q: "Warum sind die PNG-Dateien groß?",
        a: "Verlustfreie Komprimierung bewahrt jedes Pixel, die Größe wächst also mit der DPI. 300-DPI-Scans einer dichten Seite können mehrere Megabyte erreichen; für die Bildschirmansicht genügen 96–150 DPI.",
      },
      {
        q: "Bleibt Transparenz erhalten?",
        a: "Seiten werden auf einen weißen Hintergrund gerendert, die Ausgabe ist also ein deckendes PNG. Das entspricht dem Druckverhalten von PDFs und vermeidet Überraschungen mit schwarzem Hintergrund in Viewern.",
      },
    ],
  },
  "pdf-to-ppt": {
    name: "PDF zu PowerPoint",
    tagline:
      "Jede PDF-Seite als hochauflösendes Bild in eine PowerPoint-Folie umwandeln — layoutgetreue Folien, erzeugt auf Ihrem eigenen Gerät.",
    intro: [
      "Brauchen Sie Ihr PDF in einer Foliengruppe? Jede Seite wird in hoher Auflösung gerendert und auf eine eigene 16:9-Folie gesetzt, sodass das visuelle Ergebnis exakt dem Original entspricht — Schriften, Farben und Grafiken bleiben, selbst wenn der Betrachter die Schriften nicht installiert hat.",
      "Die Folien sind Bilder statt editierbarer Textfelder: Das ist Absicht, denn Bildfolien brechen auf keiner Maschine. Kombinieren Sie es mit unserem PDF zu Word-Tool, wenn Sie zusätzlich den Text brauchen.",
    ],
    steps: [
      "Ziehen Sie das PDF hierher, das in Ihre Präsentation soll.",
      "Klicken Sie auf Zu PowerPoint konvertieren und lassen Sie jede Seite rendern.",
      "Laden Sie die .pptx herunter und öffnen Sie sie in PowerPoint, Keynote oder Google Slides.",
    ],
    faqs: [
      {
        q: "Kann ich den Text auf den Folien bearbeiten?",
        a: "Nein — jede Folie enthält ein treues Bild der Seite, keine Textfelder. Das garantiert identisches Aussehen überall. Extrahieren Sie den Text separat mit PDF zu Word, wenn Sie ihn editierbar brauchen.",
      },
      {
        q: "Welches Folienformat wird verwendet?",
        a: "Breitbild 16:9 (13,33 × 7,5 Zoll), der PowerPoint-Standard. Seiten mit anderen Seitenverhältnissen werden mittig und verzerrungsfrei eingepasst.",
      },
      {
        q: "Wie groß wird die .pptx-Datei?",
        a: "Etwa so groß wie alle Seitenbilder zusammen — ein 20-seitiges PDF in hoher Auflösung kann Zehnerpotenzen an Megabyte erreichen. Komprimieren Sie das Quell-PDF zuerst, wenn Sie eine leichtere Präsentation brauchen.",
      },
    ],
  },
  "pdf-to-text": {
    name: "PDF zu Text",
    tagline:
      "Reinen Text aus jedem PDF sofort ziehen — Vorschau ansehen, in die Zwischenablage kopieren oder als .txt speichern, seitenweise im Browser extrahiert.",
    intro: [
      "Holen Sie die rohen Worte aus einem PDF, ohne seitenweise kopieren zu müssen. Der Extraktor läuft durch das Dokument, baut die Leserichtung wieder auf und liefert sauberen Klartext zum Vorschauen, auf einen Schlag Kopieren oder als .txt-Datei Herunterladen.",
      "Nutzen Sie es, um Zitate in Notizen zu bringen, Text durch ein anderes Tool zu schicken oder ein reines Textarchiv eines Dokuments anzulegen. Die Wortzahl wird laufend angezeigt, und die Extraktion ist sofort, weil alles lokal passiert.",
    ],
    steps: [
      "Ziehen Sie ein PDF mit auswählbarem Text hierher.",
      "Klicken Sie auf Text extrahieren und lesen Sie die Vorschau.",
      "Kopieren Sie das Ergebnis oder laden Sie es als .txt-Datei herunter.",
    ],
    faqs: [
      {
        q: "Das Ergebnis ist leer — warum?",
        a: "Das PDF ist wahrscheinlich ein Scan: Seine Seiten sind Fotos von Text ohne Textebene. Nutzen Sie stattdessen das OCR-Tool; es liest die Buchstaben aus den Bildern.",
      },
      {
        q: "Wie wird die Leserichtung bestimmt?",
        a: "Textelemente werden anhand ihrer Koordinaten zu Zeilen gruppiert, und Zeilen werden von oben nach unten, links nach rechts geordnet. Mehrspaltige Layouts können Spalten vermischen; das vorherige Aufteilen des PDFs nach Spaltenbereich hilft.",
      },
      {
        q: "Gibt es ein Seiten- oder Größenlimit?",
        a: "Kein künstliches. Hunderte Seiten funktionieren; die praktische Grenze ist der Browser-Speicher, typischerweise deutlich jenseits von 100-MB-Dokumenten.",
      },
    ],
  },
  "pdf-to-word": {
    name: "PDF zu Word",
    tagline:
      "PDF-Text in Ihrem Browser in ein editierbares Word-Dokument (.docx) umwandeln — eine textfokussierte Konvertierung, kostenlos, ohne Upload.",
    intro: [
      "Holen Sie die Worte aus einem PDF in eine .docx, die Sie in Word, Google Docs oder LibreOffice bearbeiten können. Überschriften werden anhand der Schriftgrößen erkannt, Absätze aus Zeilenpositionen rekonstruiert — heraus kommt ein sauberes, schlankes Dokument zum Weiterschreiben.",
      "Das ist eine ehrliche, textfokussierte Konvertierung: Komplexe Seitenlayouts, Spalten oder Bildplatzierung werden nicht nachgebaut. Der Vorteil ist volle Privatsphäre — Analyse und .docx-Erzeugung geschehen vollständig auf Ihrem Gerät.",
    ],
    steps: [
      "Ziehen Sie ein textbasiertes PDF hierher (eines, dessen Text sich auswählen lässt).",
      "Klicken Sie auf Zu Word konvertieren und warten Sie einen Moment.",
      "Laden Sie die .docx herunter und bearbeiten Sie sie überall.",
    ],
    faqs: [
      {
        q: "Warum weicht das Layout vom Original-PDF ab?",
        a: "Das ist eine textfokussierte Konvertierung: Sie baut Absätze und Überschriftenebenen neu auf, statt die Seite pixelgenau zu reproduzieren. Erwarten Sie dieselben Worte in einem saubereren, editierbaren Fluss — keinen visuellen Klon.",
      },
      {
        q: "Mein PDF ist ein Scan und erzeugt ein leeres Dokument.",
        a: "Gescannte PDFs enthalten Bilder von Text, keinen Text. Schicken Sie es zuerst durch unser OCR-Tool, und fügen Sie den erkannten Text dann in Word ein oder konvertieren Sie ihn.",
      },
      {
        q: "Überleben Tabellen und Bilder die Konvertierung?",
        a: "Bilder wandern nicht in die .docx. Tabellen kommen als einfache Textzeilen an — brauchbar, aber für alles Komplexe bauen Sie echte Tabellen in Word neu.",
      },
    ],
  },
  "png-to-pdf": {
    name: "PNG zu PDF",
    tagline:
      "PNG-Screenshots und -Bilder ohne Neukomprimierung in ein PDF verwandeln — Stapelimport, eigene Reihenfolge, verarbeitet auf Ihrem Gerät.",
    intro: [
      "Screenshots, Diagramme, Schaubilder und Designexporte sind meist PNG — und meist sollen sie als PDF weitergehen. Werfen Sie einen ganzen Stapel ab, sortieren Sie ihn mit den Pfeiltasten, und erhalten ein verlustfreies PDF: PNG-Daten werden unverändert eingebettet, Text in Screenshots bleibt messerscharf.",
      "Wählen Sie bildfüllende Seiten für pixelperfekte Größen oder A4/Letter mit Rand für den Druck. Alles entsteht mit pdf-lib auf Ihrem Gerät; kein Upload, kein Qualitätsroulette.",
    ],
    steps: [
      "Ziehen Sie die PNG-Dateien hierher, die Sie kombinieren möchten.",
      "Sortieren Sie sie und wählen Sie bildfüllende oder A4/Letter-Seiten.",
      "Klicken Sie auf PDF erstellen und laden Sie es herunter.",
    ],
    faqs: [
      {
        q: "Bleibt die PNG-Qualität exakt erhalten?",
        a: "Ja. Der PNG-Datenstrom wird unverändert eingebettet — scharfe Kanten, kleiner Text und Transparenzbereiche sehen genauso aus wie in den Quelldateien.",
      },
      {
        q: "Welches Seitenformat passt zu Screenshots?",
        a: "„An Bild anpassen“ hält jeden Screenshot in seiner nativen Pixelgröße — am besten fürs Lesen am Bildschirm. A4 oder Letter mit Rand wählen Sie, wenn das PDF gedruckt wird.",
      },
      {
        q: "Warum ist mein PNG-PDF trotzdem groß?",
        a: "Verlustfreie PNG-Daten sind von Natur aus umfangreich. Wenn Sie eine kleinere Datei brauchen, schicken Sie das Ergebnis durch PDF komprimieren — das tauscht etwas Detailtreue gegen Größe.",
      },
    ],
  },
  "rearrange-pdf-pages": {
    name: "PDF-Seiten umsortieren",
    tagline:
      "PDF-Seiten visuell mit Live-Vorschaubildern neu anordnen — Seiten auf und ab schieben, alles umkehren und lokal ein frisches PDF exportieren.",
    intro: [
      "Ein Dokument in falscher Reihenfolge gescannt? Jede Seite erscheint als echtes Vorschaubild, Sie sehen also genau, was Sie bewegen. Verschieben Sie mit den Pfeiltasten, drehen Sie das ganze Dokument mit Umkehren, und setzen Sie jederzeit auf die ursprüngliche Reihenfolge zurück.",
      "Die neue Sequenz wird in ein brandneues PDF auf Ihrem Gerät geschrieben — Seiten werden bytegenau kopiert, Qualität, Schriften und auswählbarer Text überstehen das Umsortieren also unbeschadet.",
    ],
    steps: [
      "Ziehen Sie das PDF hierher und warten Sie, bis die Seitenvorschauen erscheinen.",
      "Verschieben Sie Seiten mit ↑/↓, oder nutzen Sie Umkehren für die entgegengesetzte Reihenfolge.",
      "Klicken Sie auf Reihenfolge anwenden & herunterladen, um das umsortierte PDF zu erhalten.",
    ],
    faqs: [
      {
        q: "Warum zeigen sehr lange PDFs für spätere Seiten Zahlen statt Vorschaubildern?",
        a: "Vorschaubilder werden für die ersten 60 Seiten vorberechnet, damit der Browser reaktionsschnell bleibt. Darüber hinaus sehen Sie weiterhin Seitenzahlen und können sie genauso exakt umordnen.",
      },
      {
        q: "Kann ich eine Seite von Position 40 auf Position 2 schieben?",
        a: "Ja, aber mit den Pfeiltasten kostet es viele Klicks. Bei großen Sprüngen ist es oft schneller, das Dokument zuerst umzukehren oder es zu teilen und die Teile in neuer Ordnung zusammenzufügen.",
      },
      {
        q: "Beeinflusst das Umsortieren die Qualität?",
        a: "Überhaupt nicht. Seiten werden unverändert in das neue Dokument kopiert — nur ihre Sequenz unterscheidet sich.",
      },
    ],
  },
  "rotate-pdf": {
    name: "PDF drehen",
    tagline:
      "PDF-Seiten um 90, 180 oder 270 Grad drehen und die Änderung dauerhaft speichern — seitliche Scans im Browser richten, ohne Upload.",
    intro: [
      "Seitwärts oder kopfüber gescannt? Drehen Sie alle Seiten auf einmal, oder zielen Sie mit einer Liste wie „1, 3-5“ nur auf die Seiten, die es brauchen. Die Drehung wird direkt ins PDF geschrieben und öffnet sich deshalb in jedem Reader aufrecht.",
      "Viele Viewer drehen Seiten nur temporär — dieses Tool ändert das /Rotate-Attribut der Seite mit pdf-lib auf Ihrem Gerät, weshalb die Korrektur Drucken, Teilen und erneutes Hochladen übersteht.",
    ],
    steps: [
      "Ziehen Sie das PDF hierher, dessen Seiten gedreht werden müssen.",
      "Wählen Sie 90°, 180° oder 270° und beschränken Sie die Drehung optional auf bestimmte Seiten.",
      "Klicken Sie auf Seiten drehen und laden Sie das korrigierte PDF herunter.",
    ],
    faqs: [
      {
        q: "Ist die Drehung dauerhaft?",
        a: "Ja. Das Rotationsattribut der Seite wird in der Datei aktualisiert, deshalb zeigt jeder PDF-Reader, Drucker und jede Vorschau die korrigierte Ausrichtung — nicht nur dieser Browser-Tab.",
      },
      {
        q: "Wie drehe ich nur bestimmte Seiten?",
        a: "Füllen Sie das Seitenfeld mit einer Liste wie „2, 5-7“. Lassen Sie es leer, um das ganze Dokument zu drehen. Bereiche folgen derselben Syntax wie bei den anderen Seiten-Tools.",
      },
      {
        q: "Wird beim Drehen meine Seite neu kodiert oder komprimiert?",
        a: "Nein. Nur das Rotations-Flag ändert sich; der Seiteninhalt bleibt unangetastet, die Qualität ist identisch, und der Text bleibt auswählbar.",
      },
    ],
  },
  "sign-pdf": {
    name: "PDF unterschreiben",
    tagline:
      "Unterschrift mit Maus oder Finger zeichnen und auf jede PDF-Seite setzen — ein naturgetreuer Tinten-Stempel, komplett offline erzeugt und gespeichert.",
    intro: [
      "Unterschreiben Sie Verträge, Einverständniserklärungen und Formulare, ohne sie zu drucken. Zeichnen Sie Ihre Unterschrift auf dem Pad, positionieren Sie sie im 3×3-Raster (unten rechts ist der übliche Platz), stellen Sie die Breite ein und fügen Sie optional das heutige Datum darunter hinzu. Das transparente PNG wird direkt ins PDF eingebettet.",
      "Das ist eine sichtbare, bildbasierte Unterschrift — ideal für Alltagsdokumente. Sie ist keine kryptografische Zertifikatssignatur, und ob sie einen bestimmten Rechtsprozess erfüllt, hängt von Ihrer Rechtsordnung ab.",
    ],
    steps: [
      "Ziehen Sie das PDF hierher und zeichnen Sie Ihre Unterschrift auf dem Pad.",
      "Wählen Sie Position, Breite und Zielseite (Standard ist 1).",
      "Klicken Sie auf Unterschreiben & herunterladen und speichern Sie das unterschriebene PDF.",
    ],
    faqs: [
      {
        q: "Ist diese Unterschrift rechtlich bindend?",
        a: "Eine gezeichnete Unterschriftsbild wird für alltägliche Absprachen weithin akzeptiert, aber die rechtliche Tragweite variiert je nach Land und Dokumenttyp. Für Vorgänge, die eine verlangen, nutzen Sie stattdessen ein qualifiziertes digitales Zertifikat.",
      },
      {
        q: "Ist die Unterschrift hier sicher?",
        a: "Ja. Sie zeichnen im Browser, das Bild wird auf Ihrem eigenen Gerät ins PDF eingebettet, und nichts wird übertragen — nicht einmal die Unterschrift selbst.",
      },
      {
        q: "Kann ich jede Seite des Dokuments unterschreiben?",
        a: "Ja. Füllen Sie das Seitenfeld mit einer Liste wie „1-5“ oder lassen Sie eine einzelne Seite; die Unterschrift wird auf jeder gewählten Seite an derselben Position gestempelt.",
      },
    ],
  },
  "split-pdf": {
    name: "PDF teilen",
    tagline:
      "Ein PDF nach fester Seitenzahl oder eigenen Bereichen in Einzeldateien aufteilen — jede Ausgabe entsteht lokal, nichts wird hochgeladen.",
    intro: [
      "Zerlegen Sie ein langes PDF auf zwei Arten: schneiden Sie alle N Seiten (praktisch für eine Datei pro Seite oder kapitelgroße Blöcke), oder definieren Sie eigene Bereiche wie „1-3, 4-6, 8“ und erhalten eine Datei pro Bereich. Mehrere Ausgaben werden automatisch als ZIP gebündelt.",
      "Die Aufteilung läuft auf Ihrem Gerät mit pdf-lib — Originaldateien bleiben unangetastet, und die Stücke passieren nie einen Server. Ideal für vertrauliche Dokumente, die Sie lieber nirgendwo hochladen.",
    ],
    steps: [
      "Ziehen Sie das PDF hierher, das Sie teilen möchten.",
      "Wählen Sie „alle N Seiten“ oder eigene Bereiche und geben Sie die Werte ein.",
      "Klicken Sie auf PDF teilen und laden Sie jeden Teil oder das ganze ZIP herunter.",
    ],
    faqs: [
      {
        q: "Wie teile ich ein PDF in Einzelseiten?",
        a: "Wählen Sie „Alle N Seiten“, stellen Sie 1 ein, und jede Seite wird zum eigenen PDF. Bei mehr als einer Ausgabedatei erhalten Sie zusätzlich ein ZIP mit allen.",
      },
      {
        q: "Welche Bereichs-Syntax wird unterstützt?",
        a: "Kommagetrennte Werte und Bindestrich-Spannen, zum Beispiel „1-3, 5, 8-10“. Bereiche dürfen sich überlappen und werden in der Reihenfolge verarbeitet, in der Sie sie eintippen.",
      },
      {
        q: "Ändert das Teilen die Qualität meiner Seiten?",
        a: "Nein. Seiten werden bytegenau in neue Dokumente kopiert — der Text bleibt auswählbar und Bilder behalten ihre Originalqualität.",
      },
    ],
  },
  "watermark-pdf": {
    name: "PDF-Wasserzeichen",
    tagline:
      "Text-Wasserzeichen auf jede PDF-Seite stempeln — mittig oder gekachelt, mit voller Kontrolle über Größe, Deckkraft, Drehung und Farbe, komplett offline.",
    intro: [
      "Kennzeichnen Sie Entwürfe als VERTRAULICH, ENTWURF oder ZUR PRÜFUNG, bevor sie Ihre Hand verlassen. Wählen Sie einen einzelnen mittigen Stempel oder ein gekacheltes Muster über die ganze Seite, stellen Sie die Deckkraft so ein, dass der Text darunter lesbar bleibt, und wählen Sie eine passende Farbe.",
      "Das Wasserzeichen wird echter PDF-Text auf jeder Seite — keine Bilder, kein Serverumweg. Weil alles mit pdf-lib auf Ihrem Gerät verarbeitet wird, können Sie sogar sensible Verträge markieren, ohne sie hochzuladen.",
    ],
    steps: [
      "Ziehen Sie das PDF hierher, das Sie kennzeichnen möchten.",
      "Tippen Sie den Wasserzeichen-Text ein und stellen Sie Layout, Größe, Deckkraft und Farbe ein.",
      "Klicken Sie auf Wasserzeichen hinzufügen und laden Sie das gestempelte PDF herunter.",
    ],
    faqs: [
      {
        q: "Welche Deckkraft funktioniert am besten?",
        a: "Zwischen 10 % und 25 % für die meisten Dokumente: auf einen Blick sichtbar, aber leicht genug, dass der Fließtext lesbar bleibt. Entwürfe, die schwer lesbar sein sollen, dürfen auf 40–50 % gehen.",
      },
      {
        q: "Kann ich mit diesem Tool ein vorhandenes Wasserzeichen entfernen?",
        a: "Nein. Dieses Tool fügt nur Wasserzeichen hinzu. Das Entfernen erfordert das Bearbeiten der Seiteninhaltsströme — eine andere (und oft rechtlich fragwürdige) Operation.",
      },
      {
        q: "Welche Zeichen darf das Wasserzeichen verwenden?",
        a: "Die Standard-PDF-Schriften decken lateinischen Text, Interpunktion und häufige Symbole wie © ab. Andere Schriften (Chinesisch, Japanisch, Arabisch…) werden durch ? ersetzt — halten Sie das Wasserzeichen in lateinischen Buchstaben.",
      },
    ],
  },
  "word-to-pdf": {
    name: "Word zu PDF",
    tagline:
      "Word-.docx-Dokumente im Browser zu PDF konvertieren — textfokussierter Satz mit Überschriften und Fettung, nichts wird je hochgeladen.",
    intro: [
      "Verwandeln Sie eine .docx in ein sauberes, teilbares PDF: Absätze, Überschriften und Fettungen werden auf A4-Seiten mit vernünftigen Rändern neu gesetzt, sodass die Ausgabe ordentlich aussieht, auch ohne installiertes Word. Lesen, Drucken und Versenden werden reibungsfrei.",
      "Das ist eine ehrliche, textfokussierte Konvertierung, kein Pixelklon von Words Layout: Bilder, Tabellen und Seitendekorationen des Originals werden nicht übernommen. Sie erhalten den Text Ihres Dokuments in einem verlässlichen, überall lesbaren PDF — vollständig auf Ihrem Gerät erzeugt.",
    ],
    steps: [
      "Ziehen Sie eine .docx-Datei hierher (Word 2007 oder neuer).",
      "Klicken Sie auf Zu PDF konvertieren.",
      "Laden Sie das gesetzte PDF herunter.",
    ],
    faqs: [
      {
        q: "Warum sieht mein PDF anders aus als in Word?",
        a: "Dieses Tool setzt den Text mit seinem eigenen sauberen Layout, statt Words Engine nachzuahmen. Schriften, Abstände und Bilder des Originals werden nicht reproduziert — Worte, Überschriften und Betonungen schon.",
      },
      {
        q: "Sind Bilder und Tabellen enthalten?",
        a: "Nein, nur Text — inklusive Überschriften und Fettungen. Bei Dokumenten, in denen visuelle Elemente zählen, exportieren Sie das PDF aus Word selbst und nutzen dieses Tool für textbasierte Entwürfe und Notizen.",
      },
      {
        q: "Werden alte .doc-Dateien oder nicht-lateinischer Text unterstützt?",
        a: "Nur .docx wird unterstützt. Der Text nutzt die PDF-Standardschriften, lateinischbasierte Sprachen rendern also korrekt, während andere Schriften (Chinesisch, Arabisch…) vorerst durch ? ersetzt werden.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* Bilder                                                              */
  /* ------------------------------------------------------------------ */
  "convert-image": {
    name: "Bildkonverter",
    tagline:
      "Bilder zwischen PNG, JPG und WebP konvertieren, mit einstellbarer Qualität — ganzen Ordner abwerfen und alle Ergebnisse mit einem Klick herunterladen.",
    intro: [
      "Ein Konverter für die drei Formate, die zählen: PNG für verlustfreie Grafiken und Transparenz, JPG für universelle Fotokompatibilität, WebP für die kleinsten Dateien bei hoher Qualität. Wählen Sie das Zielformat, justieren Sie den Qualitätsregler, wo das Format es erlaubt, und jede abgeworfene Datei wird sofort konvertiert.",
      "Die Konvertierung läuft auf Ihrem Gerät mit dem Canvas-Encoder des Browsers — einen Upload-Schritt gibt es gar nicht. Jede Ergebniszeile zeigt die Größe vorher und nachher, Sie sehen also sofort, ob der Formatwechsel wirklich geholfen hat.",
    ],
    steps: [
      "Ziehen Sie beliebige Bilder hierher — gemischte Formate sind kein Problem.",
      "Wählen Sie PNG, JPG oder WebP als Ausgabe; stellen Sie die Qualität für JPG oder WebP ein.",
      "Laden Sie die konvertierten Dateien einzeln oder alle zusammen herunter.",
    ],
    faqs: [
      {
        q: "Welches Ausgabeformat soll ich wählen?",
        a: "JPG für Fotos, die überall aufgehen müssen; WebP fürs Web, wenn kleine Dateien zählen; PNG für Screenshots, Logos und alles, was Transparenz oder pixelperfektes Speichern braucht. Im Zweifel für Fotos: WebP mit Qualität ~85 ist ein starker Standard.",
      },
      {
        q: "Wird eine JPG-zu-PNG-Konvertierung die Qualität besser?",
        a: "Nein. Die JPEG-Komprimierungsartefakte stecken bereits in den Pixeln, und Konvertieren kann sie nicht entfernen — das PNG speichert denselben Blick nur verlustfrei, meist sogar größer. Konvertieren wechselt nur Container und Kodierung, nicht das festgehaltene Detail.",
      },
      {
        q: "Unterstützen alle Browser die WebP-Konvertierung?",
        a: "Chrome, Edge, Firefox und Safari 17+ können WebP speichern. Wenn Ihr Browser kein WebP kodieren kann, sagt Ihnen das Tool und fällt auf JPG zurück, damit Sie immer eine brauchbare Datei erhalten.",
      },
    ],
  },
  "crop-image": {
    name: "Bild zuschneiden",
    tagline:
      "Fotos auf 1:1, 4:3, 16:9 oder einen freien Bereich zuschneiden — mit ziehbaren Anfassern und pixelgenauen Werten, schnell, privat und stapelfähig.",
    intro: [
      "Ziehen Sie die Eck-Anfasser, um genau das festzulegen, was bleiben soll, oder tippen Sie X, Y, Breite und Höhe direkt ein für pixelgenaue Zuschnitte. Formatvorlagen — 1:1 für Avatare, 4:3 und 3:2 für Abzüge, 16:9 und 9:16 für Video und Stories — richten die Auswahl sofort in die richtige Form.",
      "Arbeiten Sie mit einem Fotosatz? Dieselbe Auswahl wird proportional auf jede Datei des Stapels skaliert, ein ganzer Ordner wird also konsistent zugeschnitten. Zuschneiden schneidet nur Pixel weg — es skaliert nie —, der behaltene Bereich bleibt also in voller Originalqualität.",
    ],
    steps: [
      "Ziehen Sie ein oder mehrere Bilder hierher; klicken Sie einen Dateinamen an, um jedes einzeln vorzuschauen und zuzuschneiden.",
      "Wählen Sie eine Formatvorlage oder ziehen Sie die Auswahl-Anfasser; feinjustieren mit den X-/Y-/B-/H-Feldern.",
      "Wenden Sie den Zuschnitt an und laden Sie die Ergebnisse herunter.",
    ],
    faqs: [
      {
        q: "Verringert Zuschnitt die Bildqualität?",
        a: "Nein. Zuschnitt entfernt einfach die äußeren Pixel — der behaltene Bereich wird in voller Originalauflösung kopiert. Qualität ändert sich erst, wenn Sie das Ergebnis später skalieren oder komprimieren.",
      },
      {
        q: "Wie funktioniert Stapelzuschnitt bei unterschiedlichen Bildgrößen?",
        a: "Die Auswahl wird relativ zum vorgeschauten Bild gespeichert. Auf andere Dateien angewendet wird sie proportional an die jeweiligen Bildmaße skaliert, der Bildausschnitt bleibt also über den ganzen Stapel konsistent.",
      },
      {
        q: "Welches Format nehme ich für ein Profilbild?",
        a: "1:1 (quadratisch). Die meisten sozialen Plattformen schneiden Avatare auf einen Kreis innerhalb eines Quadrats, das Motiv also mittig in einer 1:1-Auswahl zu platzieren ist am sichersten.",
      },
    ],
  },
  "exif-remover": {
    name: "EXIF entfernen",
    tagline:
      "EXIF, GPS und andere versteckte Metadaten aus Fotos entfernen — durch lokales Neukodieren teilen Sie Bilder ohne Standort- oder Geräteangaben.",
    intro: [
      "Jedes Handyfoto kann verstecktes Gepäck tragen: GPS-Koordinaten des Aufnahmeorts, Ihr Kameramodell, Zeitstempel, manchmal sogar Seriennummern. Dieses Tool entfernt all das, indem es das Bild aus den rohen Pixeln neu kodiert — in einer frisch gezeichneten Canvas hat Metadaten keinen Ort zum Verstecken, EXIF, GPS, Vorschaubilder und Kommentare sind also allesamt weg.",
      "Das Ergebnis behält das Originalformat und ein visuell identisches Bild (92 % Qualität für JPG und WebP), und jede Zeile zeigt die Größe vorher und nachher. Der Stapelmodus schrubbt einen ganzen Fotoordner in einem Durchgang — alles offline auf Ihrem Gerät.",
    ],
    steps: [
      "Ziehen Sie die Fotos hierher, die Sie teilen möchten — eines oder ein ganzer Stapel.",
      "Warten Sie einen Moment, während jedes Bild lokal ohne seine Metadaten neu kodiert wird.",
      "Laden Sie die bereinigten Bilder einzeln oder alle auf einmal herunter.",
    ],
    faqs: [
      {
        q: "Wie entfernt Neukodieren die Metadaten?",
        a: "Das Bild wird zu rohen Pixeln dekodiert und auf eine leere Canvas neu gezeichnet, dann erneut kodiert. Metadaten leben in speziellen Dateiabschnitten außerhalb der Pixel, und eine frische Kodierung schließt sie schlicht nicht ein — EXIF, GPS, Vorschaubilder und Bearbeitungshistorie fallen also komplett weg.",
      },
      {
        q: "Verändert das Entfernen von EXIF das Aussehen des Fotos?",
        a: "Keine sichtbare Änderung. Pixel bleiben bei 92 % JPEG-/WebP-Qualität erhalten (PNG ist verlustfrei), das Bild sieht fürs Auge identisch aus. Ein Nebeneffekt: Eine nur als EXIF-Orientierungs-Flag gespeicherte Drehung wird in die Pixel eingebrannt — das lässt die Datei sogar konsistenter über Apps hinweg anzeigen.",
      },
      {
        q: "Kann ich Metadaten ohne Neukomprimierung entfernen?",
        a: "Nicht auf eine browserbasierte, sichere Weise. Verlustfreies Metadaten-Stripping erfordert das Umschreiben des Datei-Containers — PNGs lassen sich mit Spezialtools verlustfrei säubern, bei JPEG ist genau diese Neukodierung der verlässliche, einfache Weg. PNG-Eingaben bleiben hier pixelgenau.",
      },
    ],
  },
  "favicon-generator": {
    name: "Favicon-Generator",
    tagline:
      "Aus einem Logo oder Bild einen kompletten Favicon-Satz erzeugen — 16 bis 512 px PNGs mit optional abgerundeten Ecken, plus HTML zum Einfügen.",
    intro: [
      "Werfen Sie ein ungefähr quadratisches Bild ab und erhalten die sechs PNG-Größen, die echte Projekte brauchen: 16, 32 und 48 px Favicons, einen 180-px-apple-touch-icon sowie 192- und 512-px-Icons für Android- und PWA-Manifeste. Nicht-quadratische Bilder werden mittig auf eine quadratische Canvas gesetzt, gepolstert mit der von Ihnen gewählten Hintergrundfarbe; die Ecken bleiben quadratisch, werden abgerundet oder zum vollen Kreis.",
      "Jede Größe wird in ihren echten Pixelmaßen gerendert und lässt sich einzeln oder als einziges .zip herunterladen — zusammen mit einem Copy-Paste-<head>-Schnipsel, der dieselben Dateinamen referenziert. Die Dateien fallen also direkt in den public-Ordner Ihres Projekts.",
    ],
    steps: [
      "Ziehen Sie ein Bild hierher — ein quadratisches Logo funktioniert am besten.",
      "Wählen Sie eine Hintergrundfarbe und einen Ecken-Stil (quadratisch, abgerundet oder Kreis).",
      "Erzeugen Sie den Satz und laden Sie einzelne Größen oder das ganze .zip herunter.",
      "Fügen Sie den HTML-Schnipsel in den <head> Ihrer Seite ein und laden Sie die PNGs hoch.",
    ],
    faqs: [
      {
        q: "Welche Favicon-Größen brauche ich wirklich?",
        a: "16 und 32 px decken Browser-Tabs ab, 48 px hilft bei Verknüpfungen und Lesezeichen, 180 px verlangt der iOS-Homescreen, und 192/512 px suchen Android- und Web-App-Manifeste. Alle sechs einmal erzeugen bedeutet: nie wieder darüber nachdenken.",
      },
      {
        q: "Warum sieht mein Logo bei 16 px unscharf aus?",
        a: "Ein 16-px-Tab-Icon hat insgesamt 256 Pixel, feine Details und dünne Striche verschwinden schlicht. Favicon-Sätze wirken am besten, wenn sie aus einem kräftigen, kontrastreichen Zeichen erzeugt werden — bei einem detailreichen Logo sollten Sie eine vereinfachte kleine Variante als Quellbild zeichnen.",
      },
      {
        q: "Brauche ich noch eine .ico-Datei?",
        a: "Moderne Browser nutzen PNG-Favicons gerne über <link>-Tags, und der Schnipsel dieses Tools ist alles, was sie brauchen. Ein Legacy-.ico zählt nur für sehr alte Browser, die für die meisten Websites selten genug sind, um sie zu ignorieren.",
      },
    ],
  },
  "grayscale-image": {
    name: "Bild in Graustufen",
    tagline:
      "Bilder stapelweise in Schwarz-Weiß umwandeln — Farben aus Scans, Drucken und Fotosätzen halten, alles lokal auf Ihrem Gerät.",
    intro: [
      "Verwandeln Sie jeden Fotosatz in einem Durchgang in saubere Schwarz-Weiß-Versionen: Stapel abwerfen, JPG- oder PNG-Ausgabe wählen, und jede abgeworfene Datei wird auf Ihrem Gerät mit der Farb-Engine des Browsers entsättigt.",
      "Praktisch für druckfertige Scans, das Vereinheitlichen eines Fotosatzes oder das Entfernen von Farbe aus Dokumenten vor der OCR.",
    ],
    steps: [
      "Ziehen Sie ein Bild oder einen ganzen Stapel hierher.",
      "Wählen Sie JPG (kleiner) oder PNG (verlustfrei) als Ausgabe.",
      "Starten Sie die Konvertierung und laden Sie jede Graustufen-Kopie herunter.",
    ],
    faqs: [
      {
        q: "Ist das dasselbe wie Entfärben in einem Bildeditor?",
        a: "Es nutzt den Standard-Graustufenfilter des Browsers — eine neutrale Luminanzkonvertierung. Für künstlerisches Schwarz-Weiß mit Kontraskurven nehmen Sie einen Editor; für saubere, gleichmäßige Entfärbung ist das hier genau richtig.",
      },
      {
        q: "Warum ist mein PNG nach der Konvertierung größer?",
        a: "Graustufen ändern die Komprimierung nicht: Ein verrauschtes Foto kann etwas anders komprimieren. Wählen Sie JPG für Fotos und PNG nur für flache Grafiken.",
      },
    ],
  },
  "heic-to-jpg": {
    name: "HEIC zu JPG",
    tagline:
      "iPhone-HEIC-Fotos zu JPG oder PNG konvertieren, damit sie überall aufgehen — Stapelkonvertierung mit Qualitätskontrolle, alles auf Ihrem Gerät.",
    intro: [
      "iPhones speichern Fotos als HEIC, ein platzsparendes Format, das Windows, viele Websites und ältere Apps weiterhin verweigern. Werfen Sie Ihre .heic-Dateien hier ab und erhalten in Sekunden überall lesbare JPG-Kopien (oder verlustfreies PNG) — der Dekoder läuft lokal, Ihre Fotos berühren also nie einen Server.",
      "Der Stapelmodus schafft einen ganzen Kameraroll auf einmal, und der Qualitätsregler bringt JPG-Größe und Treue ins Gleichgewicht. Große Fotos brauchen je ein paar Sekunden, weil die HEIC-Dekodierung direkt in Ihrem Browser passiert.",
    ],
    steps: [
      "Ziehen Sie Ihre .heic- oder .heif-Dateien hierher (zuerst per AirDrop oder Download vom iPhone holen).",
      "Wählen Sie JPG- oder PNG-Ausgabe und stellen Sie die JPEG-Qualität ein.",
      "Drücken Sie Konvertieren und laden Sie die Bilder herunter, die überall aufgehen.",
    ],
    faqs: [
      {
        q: "Was ist HEIC und warum nutzen meine Fotos es?",
        a: "HEIC (High Efficiency Image Container) ist das Standard-Fotoformat auf iPhones seit iOS 11. Es speichert Fotos bei etwa halber JPEG-Größe, aber die Unterstützung außerhalb des Apple-Ökosystems ist lückenhaft — deshalb bleibt die Konvertierung zu JPG die verlässliche Wahl zum Teilen.",
      },
      {
        q: "Verliert die HEIC-zu-JPG-Konvertierung Qualität?",
        a: "Ein wenig, aber bei der Standardqualität von 90 % ist der Unterschied in der Praxis unsichtbar. Wer null weiteren Verlust will, wählt stattdessen PNG-Ausgabe — zum Preis deutlich größerer Dateien.",
      },
      {
        q: "Werden meine iPhone-Fotos irgendwo hochgeladen?",
        a: "Nein. Die Konvertierung geschieht in Ihrem Browser mit einem lokalen HEIC-Dekoder. Ihre Fotos bleiben die ganze Zeit auf Ihrem Gerät — dieses Tool funktioniert sogar offline, sobald die Seite geladen ist.",
      },
    ],
  },
  "image-compressor": {
    name: "Bildkompressor",
    tagline:
      "JPG-, PNG- und WebP-Bilder mit Live-Qualitätsregler komprimieren — Stapelverarbeitung und sofortige Größen vorher/nachher, alles in Ihrem Browser.",
    intro: [
      "Werfen Sie ein Bild oder einen ganzen Stapel ab und sehen Sie den Dateigrößen live fallen. Ein Qualitätsregler von 10 % bis 100 % bringt Gewicht und Schärfe ins Gleichgewicht, und jede Zeile zeigt die Originalgröße neben dem komprimierten Ergebnis — Sie wissen also genau, was Sie gespart haben.",
      "Die Ausgabe kann JPG (am kleinsten für Fotos), WebP (meist 20–30 % kleiner als JPG bei gleicher Qualität) oder PNG (verlustfrei) sein. Alles läuft auf Ihrem Gerät mit dem Bild-Encoder des Browsers — keine Uploads, keine Warteschlange, kein Wasserzeichen.",
    ],
    steps: [
      "Ziehen Sie Ihre Bilder in das Feld (oder klicken Sie zum Durchsuchen) — so viele Sie mögen.",
      "Wählen Sie ein Ausgabeformat und ziehen Sie den Qualitätsregler, bis die Größenspalte passt.",
      "Laden Sie jedes komprimierte Bild herunter, oder nehmen Sie alle auf einmal.",
    ],
    faqs: [
      {
        q: "Warum sieht ein zweifach komprimiertes JPEG schlechter aus?",
        a: "JPEG ist verlustbehaftet: Jedes Speichern verwirft Detail, das nicht zurückkommt. Ein bereits komprimiertes JPEG erneut zu komprimieren setzt neue Artefakte auf die alten. Komprimieren Sie daher immer vom Original aus und speichern Sie JPEGs nicht wiederholt neu.",
      },
      {
        q: "Welches Format liefert die kleinsten Dateien?",
        a: "Bei Fotos ist WebP meist 20–30 % kleiner als JPEG bei gleicher visueller Qualität, und JPEG schlägt PNG. PNG gewinnt nur bei flachen Grafiken, Screenshots und Logos mit wenigen Farben. Probieren Sie WebP mit Qualität 75–85 als Startpunkt.",
      },
      {
        q: "Wird mein Bild auf einen Server hochgeladen?",
        a: "Nein. Die Komprimierung erledigt der eingebaute Canvas-Encoder Ihres Browsers. Die Dateien verlassen Ihr Gerät nie — Sie können sogar die Internetverbindung kappen, und es arbeitet weiter.",
      },
    ],
  },
  "image-metadata-viewer": {
    name: "Bild-Metadaten-Viewer",
    tagline:
      "Bildmaße, Dateityp, Größe und EXIF-Details inspizieren — Kamera, Objektiv, Belichtung, Datum und GPS — ohne etwas hochzuladen.",
    intro: [
      "Werfen Sie ein Foto ab und sehen Sie alles, was es trägt: Pixelmaße, Megapixel, Dateityp und Größe auf einen Blick. Bei JPEG-Fotos gräbt der eingebaute EXIF-Reader tiefer — Kamerahersteller und -modell, Objektiv, Belichtungszeit, Blende, ISO, Brennweite, Aufnahmedatum und Ausrichtung, gelesen von einem schlanken Reader, der vollständig auf Ihrem Gerät läuft.",
      "Enthält ein Foto GPS-Koordinaten, werden sie in Dezimalform mit einem Karten-Lookup per Klick gezeigt — praktisch, um zu prüfen, was Ihr Handy einbettet, bevor Sie teilen. Nicht-JPEG-Dateien zeigen stattdessen ihre PNG-Bittiefe und ihren Farbtyp, denn EXIF ist ein JPEG-Zeit-Standard, den sie nicht führen.",
    ],
    steps: [
      "Ziehen Sie ein oder mehrere Bilder in das Feld.",
      "Lesen Sie die Zusammenfassungskarte: Maße, Typ, Größe und gefundene EXIF-Felder.",
      "Öffnen Sie die GPS-Position in Karten, falls vorhanden — oder springen Sie zum EXIF-Entferner, um sie zu streifen.",
    ],
    faqs: [
      {
        q: "Was sind EXIF-Daten?",
        a: "EXIF (Exchangeable Image File Format) ist der Metadaten-Standard, den Kameras in JPEG-Fotos einbetten: Gerätemodell, Objektiv, Belichtungseinstellungen, Zeitstempel, Ausrichtung und manchmal GPS-Koordinaten. Im Bild selbst unsichtbar, kann er verraten, wo und womit ein Foto aufgenommen wurde.",
      },
      {
        q: "Warum zeigt meine PNG- oder WebP-Datei kein EXIF?",
        a: "EXIF führen hauptsächlich JPEGs. PNG, GIF und die meisten WebP-Dateien betten es nicht ein, es gibt also wirklich nichts zu zeigen — der Viewer meldet stattdessen ihre Maße und, für PNG, Bittiefe und Farbtyp aus dem Datei-Header.",
      },
      {
        q: "Verändert das Ansehen der Metadaten mein Bild?",
        a: "Nein. Dateien werden nur lesend geöffnet; das Tool dekodiert eine Kopie im Speicher und schreibt nie in das Original zurück. Ihr Bild wird vollständig auf Ihrem Gerät angezeigt und analysiert.",
      },
    ],
  },
  "image-resizer": {
    name: "Bildskalierer",
    tagline:
      "Bilder auf exakte Pixel oder einen Prozentsatz skalieren, mit Seitenverhältnis-Sperre — ganze Stapel auf einmal, nichts verlässt Ihr Gerät.",
    intro: [
      "Tippen Sie exakte Breite und Höhe in Pixeln ein, oder skalieren Sie prozentual (25 %, 50 %, 200 %…). Die Seitenverhältnis-Sperre hält die Proportionen korrekt, wenn Sie eine Seite ändern; entsperren erlaubt jede eigene Dimension — nützlich für Plattform-Avatar- oder Bannergrößen.",
      "Der Stapelmodus wendet Ihre Einstellungen auf jede abgeworfene Datei an, ein ganzer Fotoordner lässt sich also in einem Durchgang fürs Web verkleinern. Verkleinern geschieht mit hochwertiger Glättung, und die Ausgabe behält das Originalformat.",
    ],
    steps: [
      "Ziehen Sie ein oder mehrere Bilder in das Feld.",
      "Geben Sie Breite/Höhe in Pixeln oder einen Skalierungsprozentsatz ein; schalten Sie die Sperre um, um das Seitenverhältnis zu halten oder frei zu geben.",
      "Laden Sie die skalierten Bilder einzeln oder alle zusammen herunter.",
    ],
    faqs: [
      {
        q: "Verringert Vergrößern die Bildqualität?",
        a: "Ja. Vergrößern muss Pixel erfinden, was Weichheit oder Unschärfe erzeugt — kein Tool kann echtes Detail nachliefern, das nie aufgenommen wurde. Verkleinern ist unproblematisch: Es verwirft Pixel mit sauberer Interpolation. Bleiben Sie beim Vergrößern bescheiden (bis ~150 % sieht meist gut aus).",
      },
      {
        q: "Was macht die Seitenverhältnis-Sperre?",
        a: "Mit eingeschalteter Sperre berechnet das Tool die Höhe automatisch neu, wenn Sie die Breite ändern (und umgekehrt) — das Bild wird nie gestreckt oder gestaucht. Schalten Sie sie nur aus, wenn Sie bewusst eine andere Form wollen — das Bild wird verzerrt.",
      },
      {
        q: "Behalten skalierte PNG-Bilder ihre Transparenz?",
        a: "Ja. Die Skalierung behält das Originalformat, PNG-Transparenz und WebP-Alpha überleben also unangetastet. Nur die Konvertierung zu JPG würde Transparenz auf einen weißen Hintergrund legen.",
      },
    ],
  },
  "jpg-to-png": {
    name: "JPG zu PNG",
    tagline:
      "JPG-Fotos sofort zu PNG konvertieren — verlustfreie Ausgabe und Stapelbetrieb, kostenlos, privat und ohne Upload, direkt im Browser.",
    intro: [
      "Werfen Sie Ihre .jpg-Dateien ab und erhalten mit einem Klick pixelidentische .png-Kopien. PNG speichert das Bild ohne weiteren Verlust — das richtige Format zum Weiterbearbeiten, Archivieren oder für Plattformen und Tools, die JPEG-Dateien verweigern.",
      "Der Stapelmodus konvertiert einen ganzen Fotostapel in einem Durchgang und zeigt die Ergebnisgröße je Datei. Beachten Sie: PNG erzeugt meist größere Dateien als JPG — das ist der Preis für verlustfreies Speichern, kein Fehler der Konvertierung.",
    ],
    steps: [
      "Ziehen Sie Ihre JPG-Bilder hierher (oder klicken Sie zum Durchsuchen) — mehrere Dateien sind willkommen.",
      "Warten Sie einen Moment, während jede Datei lokal konvertiert wird.",
      "Laden Sie die PNG-Dateien einzeln oder alle auf einmal herunter.",
    ],
    faqs: [
      {
        q: "Sieht die PNG-Datei besser aus als das JPG?",
        a: "Nein — sie sieht genauso aus. Konvertieren kann bereits geschehene Komprimierung nicht rückgängig machen; das PNG bewahrt nur das aktuelle Aussehen, ohne neue Artefakte hinzuzufügen, falls Sie es später bearbeiten und neu speichern. Nutzen Sie es für Workflows, nicht für einen Qualitätsboost.",
      },
      {
        q: "Warum ist mein PNG größer als das ursprüngliche JPG?",
        a: "JPG nutzt aggressive, verlustbehaftete Komprimierung für Fotos, während PNG jedes Pixel exakt speichert. Dasselbe Bild braucht als PNG also mehr Platz. Wenn Dateigröße wichtiger ist als verlustfreies Bearbeiten, sind JPG oder WebP das bessere Ziel.",
      },
      {
        q: "Fügt die JPG-zu-PNG-Konvertierung Transparenz hinzu?",
        a: "Nein. JPEG speichert nie Transparenz, es gibt also nichts wiederherzustellen — Ihr konvertiertes PNG ist vollständig deckend. Um einen Hintergrund freizustellen, bräuchten Sie ein dediziertes Hintergrund-Entfernungs-Tool.",
      },
    ],
  },
  "merge-images": {
    name: "Bilder zusammenfügen",
    tagline:
      "2–9 Bilder zu einem vereinen — nebeneinander, gestapelt oder als Raster, mit Abstand- und Hintergrundkontrolle.",
    intro: [
      "Bauen Sie Vorher/Nachher-Aufnahmen, Vergleichsstreifen und Sprite-Sheets: 2 bis 9 Bilder abwerfen, ein Layout wählen, Abstand und Hintergrundfarbe einstellen — das zusammengefügte Bild entsteht auf Ihrem Gerät in voller Auflösung.",
      "Bilder werden auf eine gemeinsame Höhe (nebeneinander), Breite (gestapelt) oder Zelle (Raster) skaliert, nichts wird beschnitten oder gestreckt.",
    ],
    steps: [
      "Ziehen Sie 2–9 Bilder in der Reihenfolge hierher, in der sie zusammengefügt werden sollen.",
      "Wählen Sie ein Layout und justieren Sie Abstand und Hintergrundfarbe.",
      "Klicken Sie auf Bilder zusammenfügen und laden Sie das Ergebnis herunter.",
    ],
    faqs: [
      {
        q: "Welche Auflösung hat die Ausgabe?",
        a: "Volle Auflösung: Die Canvas bemisst sich aus den (skalierten) Eingabemaßen, das Zusammenfügen von 3 × 2000-px-Fotos ist also rund 6000 px breit.",
      },
      {
        q: "Spielt die Reihenfolge eine Rolle?",
        a: "Ja — Bilder landen in der Listenreihenfolge, von links nach rechts, von oben nach unten. Entfernen und neu hinzufügen, um sie zu ändern.",
      },
    ],
  },
  "ocr-image": {
    name: "Bild zu Text (OCR)",
    tagline:
      "Text aus Fotos, Scans und Screenshots in 7 Sprachen extrahieren — prüfen, korrigieren, kopieren oder als .txt speichern. Läuft vollständig im Browser.",
    intro: [
      "Richten Sie sich auf jedes Bild mit Text — ein Foto einer Seite, ein Scan, ein Screenshot — und erhalten die Zeichen als editierbaren Text zurück. Die Erkennung läuft mit Tesseract, auf Abruf in Ihrem Browser-Tab geladen; das Bild selbst wird nirgendwo hochgeladen.",
      "Die Ausgabe landet in einem editierbaren Feld, Sie korrigieren also das eine oder andere Fehlgelesene, bevor Sie es kopieren oder als .txt-Datei herunterladen. Saubere, gleichmäßig beleuchtete, frontale Aufnahmen liefern die besten Ergebnisse.",
    ],
    steps: [
      "Ziehen Sie ein Bild (PNG, JPG oder WebP) mit Text hierher.",
      "Wählen Sie die Sprache des Texts — das passende Modell lädt beim ersten Einsatz.",
      "Starten Sie die Erkennung und korrigieren Sie den extrahierten Text bei Bedarf.",
      "Kopieren Sie ihn oder laden Sie ihn als .txt-Datei herunter.",
    ],
    faqs: [
      {
        q: "Wird mein Bild auf einen Server hochgeladen?",
        a: "Nein. Das Bild wird in Ihrem eigenen Browser gelesen und erkannt. Beachten Sie: Die OCR-Engine und das Sprachmodell werden beim ersten Einsatz aus einem öffentlichen CDN geladen (rund 10–20 MB pro Sprache) — dieser Download geht vom CDN zu Ihnen, das Bild selbst verlässt Ihr Gerät nie.",
      },
      {
        q: "Welche Sprachen werden unterstützt?",
        a: "Englisch, vereinfachtes Chinesisch, Japanisch, Spanisch, Portugiesisch, Deutsch und Französisch. Jede Sprache lädt beim ersten Auswählen ihr eigenes trainiertes Modell; danach cacht es der Browser, und die Erkennung startet schneller.",
      },
      {
        q: "Warum ist ein Teil des Texts falsch?",
        a: "Die OCR-Genauigkeit hängt stark von der Quelle ab: unscharfe Fotos, gewölbte Seiten, kleine Schriften und unruhige Hintergründe verursachen Fehler. Nehmen Sie das schärfste Bild, beschneiden Sie auf den Textbereich, und planen Sie eine Gegenlese ein — besonders bei Zahlen und ähnlichen Zeichen.",
      },
    ],
  },
  "png-to-jpg": {
    name: "PNG zu JPG",
    tagline:
      "PNG-Bilder zu JPG konvertieren und die Dateigröße drastisch senken — transparente Bereiche bekommen sauberes Weiß, die Qualität bleibt einstellbar.",
    intro: [
      "Verwandeln Sie schwergewichtige .png-Dateien in kompakte .jpg-Kopien, die schneller hochladen und überall aufgehen. Ein Qualitätsregler (Standard 92 %) hält das Ergebnis visuell ununterscheidbar und senkt die Größe typischer Screenshots und Fotos um 60–90 %.",
      "PNG-Transparenz überlebt in JPG nicht, transparente Bereiche werden also auf reines Weiß gelegt — die Standardbehandlung für Formulare, Avatare und Marktplätze, die nur JPEG akzeptieren. Der Stapelmodus schafft einen ganzen Ordner in einem Zug.",
    ],
    steps: [
      "Ziehen Sie Ihre PNG-Bilder hierher — eines oder viele.",
      "Justieren Sie die JPG-Qualität, wenn Sie kleinere Dateien oder maximale Treue wollen.",
      "Laden Sie die JPG-Dateien einzeln oder alle auf einmal herunter.",
    ],
    faqs: [
      {
        q: "Was passiert beim PNG-zu-JPG-Konvertieren mit transparenten Bereichen?",
        a: "JPG hat keinen Alphakanal, transparente Pixel werden also vor dem Speichern mit deckendem Weiß gefüllt. Wenn Sie eine andere Hintergrundfarbe brauchen oder echte Transparenz erhalten müssen, bleiben Sie bei PNG (oder nutzen Sie WebP).",
      },
      {
        q: "Wie viel kleiner wird das JPG?",
        a: "Typisch 60–90 % kleiner bei Screenshots und Fotos. Flache Grafiken mit scharfen Kanten komprimieren weniger dramatisch und können bei niedriger Qualität leicht verschwimmen — halten Sie den Regler bei Text- und UI-Bildern über 85 %.",
      },
      {
        q: "Macht die Konvertierung das Bild schärfer oder repariert Artefakte?",
        a: "Nein. Konvertieren ändert nur die Kodierung, es kann kein Detail ergänzen. Sieht das PNG selbst schon weich aus, sieht das JPG genauso weich aus (bei sehr niedriger Qualitätsstufe womöglich mit leichtem Komprimierungsrauschen).",
      },
    ],
  },
  "rotate-image": {
    name: "Bild drehen",
    tagline:
      "Bilder um 90°, 180° oder 270° drehen und horizontal oder vertikal spiegeln — stapelfreundlich, sofort und vollständig in Ihrem Browser.",
    intro: [
      "Drehen Sie Fotos aufrecht, richten Sie seitlich gelandete Scans gerade oder spiegeln Sie ein Bild für ein gespiegeltes Layout. Jede Taste wirkt auf jede geladene Datei gleichzeitig, und eine kleine Anzeige zeigt stets Drehung und Spiegelzustand, damit Sie den Überblick nie verlieren.",
      "Drehungen und Spiegelungen werden in die echten Pixel eingebrannt — die gespeicherte Datei sieht also überall identisch aus, kein Player oder Viewer „korrigiert“ sie zurück. Die Ausgabe behält das jeweilige Originalformat.",
    ],
    steps: [
      "Ziehen Sie ein oder mehrere Bilder in das Feld.",
      "Klicken Sie die Dreh- und Spiegeltasten, bis der Vorschauzustand so liest, wie Sie ihn wollen.",
      "Laden Sie die korrigierten Bilder einzeln oder alle auf einmal herunter.",
    ],
    faqs: [
      {
        q: "Ist das Drehen eines JPEG verlustfrei?",
        a: "Das Drehen in diesem Tool erfolgt durch Neukodieren der Pixel, die Datei wird also neu erzeugt (bei JPG standardmäßig mit 92 % JPEG-Qualität). In der Praxis ist der Unterschied unsichtbar, aber es ist nicht bitidentisch — Tools, die „verlustfreie Rotation“ versprechen, funktionieren nur bei Größen, die Vielfache des JPEG-Blockrasters sind.",
      },
      {
        q: "Warum wirkt ein Foto in einer App gedreht, in einer anderen korrekt?",
        a: "Manche Bilder speichern nur ein Orientierungs-Flag in ihren EXIF-Daten statt wirklich gedrehter Pixel, und nicht jede App wendet das Flag an. Dieses Tool schreibt die Drehung direkt in die Pixel und entfernt das Flag, das Ergebnis zeigt sich also überall gleich.",
      },
      {
        q: "Kann ich ein Foto horizontal wie ein Spiegelbild kippen?",
        a: "Ja — nutzen Sie „Horizontal spiegeln“, um links–rechts zu spiegeln, oder „Vertikal spiegeln“ für oben–unten. Beides lässt sich mit jeder Drehung kombinieren.",
      },
    ],
  },
  "round-corners-image": {
    name: "Bildecken abrunden",
    tagline:
      "Einem Bild oder einem ganzen Stapel abgerundete Ecken geben — transparente PNG-Ecken oder Volltonfarbe, Live-Vorschau, Ausgabe als PNG oder JPG.",
    intro: [
      "Abgerundete Ecken weichen Screenshots, Avatare und Produktfotos auf, ohne einen Editor zu öffnen. Werfen Sie ein Bild oder einen ganzen Stapel ab, ziehen Sie den Radius-Regler und sehen Sie die Vorschau live — der Radius geht bis zum vollen Kreis, begrenzt auf die Hälfte der kürzeren Seite.",
      "Wählen Sie, ob die beschnittenen Ecken transparent bleiben (PNG) oder mit einer Volltonfarbe gefüllt werden — letzteres braucht auch die JPG-Ausgabe, da sie keinen Alphakanal hat. Jede Datei wird auf Ihrem Gerät verarbeitet und einzeln heruntergeladen.",
    ],
    steps: [
      "Ziehen Sie ein Bild oder einen ganzen Stapel hierher.",
      "Ziehen Sie den Radius-Regler — die Vorschau zeigt das erste Bild live.",
      "Wählen Sie transparente oder einfarbige Ecken und das Ausgabeformat.",
      "Runden Sie alle ab und laden Sie jedes Ergebnis herunter.",
    ],
    faqs: [
      {
        q: "Können die Ecken transparent statt weiß sein?",
        a: "Ja — wählen Sie PNG-Ausgabe und die Option Transparent, dann bleiben die Ecken durchscheinend. JPG hat keinen Alphakanal und füllt die Ecken daher immer mit der gewählten Volltonfarbe.",
      },
      {
        q: "Der gleiche Radius wirkt auf jedem Bild anders — warum?",
        a: "Der Regler setzt den Radius in Pixeln, und jede Datei wird exakt mit diesem Radius gerundet, begrenzt auf die Hälfte ihrer eigenen kürzeren Seite. Für einen einheitlichen Look über unterschiedlich große Bilder: gleichen Sie zuerst ihre Größen an (zum Beispiel mit dem Bildskalierer).",
      },
      {
        q: "Verringert das Abrunden die Bildqualität?",
        a: "Nur die Ecken werden angefasst — die Pixel innen bleiben unberührt. PNG-Ausgabe ist verlustfrei, JPG wird in hoher Qualität neu kodiert, was die Dateigröße in beide Richtungen leicht verschieben kann.",
      },
    ],
  },
  "screenshot-tool": {
    name: "Screenshot-Tool",
    tagline:
      "Ein Einzelbild Ihres Bildschirms aufnehmen, präzise zuschneiden und als PNG speichern — eine autorisierte Momentaufnahme, nichts aufgezeichnet oder hochgeladen.",
    intro: [
      "Klicken Sie auf Aufnehmen, wählen Sie im Freigabedialog Ihres Browsers einen Bildschirm, ein Fenster oder einen Tab, und das Tool greift exakt ein Standbild. Die Freigabe endet sofort — es gibt keine Aufzeichnung, keine Sitzung, und nichts verlässt Ihr Gerät. Sie erhalten ein normales PNG, bereit zum Speichern.",
      "Brauchen Sie nur einen Teil der Aufnahme? Schalten Sie den Zuschnittmodus ein und ziehen Sie eine präzise Auswahl, bevor Sie speichern — angetrieben von demselben pixelgenauen Zuschnitt-Widget wie unser Zuschnitt-Tool. Perfekt für Fehlerberichte, schnelle Dokumentation und Belege.",
    ],
    steps: [
      "Klicken Sie auf „Bildschirm wählen & aufnehmen“ und erteilen Sie im Browser-Dialog die Erlaubnis.",
      "Wählen Sie Bildschirm, Fenster oder Tab; ein Einzelbild wird sofort aufgenommen und die Freigabe stoppt.",
      "Schneiden Sie das Bild optional zu, dann speichern Sie das PNG in Ihre Downloads.",
    ],
    faqs: [
      {
        q: "Wird mein Bildschirm aufgezeichnet?",
        a: "Nein. Das Tool fordert eine Einzelframe-Aufnahme über die Standard-Bildschirmfreigabe-Berechtigung Ihres Browsers an. Der Stream stoppt, sobald das Bild im Speicher liegt — nichts läuft weiter, und nichts wird irgendwo hochgeladen.",
      },
      {
        q: "Warum fragt mein Browser nach einer Erlaubnis?",
        a: "Bildschirmaufnahme ist eine mächtige Fähigkeit, Browser verlangen deshalb immer eine ausdrückliche Nutzerentscheidung über ihren nativen Dialog. Sie wählen exakt, welcher Bildschirm, welches Fenster oder welcher Tab geteilt wird — das Tool sieht nie etwas, das Sie nicht ausgewählt haben.",
      },
      {
        q: "Funktioniert das auf Handys oder Tablets?",
        a: "Nein. Browser unter iOS und Android bieten Webseiten keine Bildschirmaufnahme an, das Tool erklärt stattdessen, dass es dort nicht verfügbar ist. Auf dem Desktop unterstützen Chrome, Edge, Firefox und Safari es alle.",
      },
    ],
  },
  "svg-converter": {
    name: "SVG zu PNG Konverter",
    tagline:
      "SVG-Icons und -Grafiken in gestochen scharfe PNG-Raster bei 1× bis 4× oder eigenem Faktor umwandeln — Transparenz bleibt, ideal für App-Assets.",
    intro: [
      "SVGs sind perfekt fürs Design, aber viele Orte — App-Stores, Editoren, Messenger, ältere CMSs — verlangen ein Raster-PNG. Dieses Tool rendert Ihre Vektordatei in exakt der Größe, die Sie brauchen: 1× für Vorschauen, 2× für Retina-Bildschirme, 3×–4× oder ein eigener Faktor für druckqualitative Exporte.",
      "Das PNG behält den transparenten Hintergrund Ihres SVGs, und der Vektor wird in der Zielauflösung neu gerendert statt gestreckt — Kanten bleiben also messerscharf. Werfen Sie einen ganzen Icon-Satz auf einmal ab; jede Datei wird in einem Durchgang konvertiert.",
    ],
    steps: [
      "Ziehen Sie eine oder mehrere .svg-Dateien hierher.",
      "Wählen Sie einen Faktor: 1×–4× oder tippen Sie einen eigenen ein.",
      "Laden Sie die PNG-Dateien einzeln oder alle auf einmal herunter.",
    ],
    faqs: [
      {
        q: "Mit welchem Faktor sollte ich exportieren?",
        a: "2× für Icons auf Retina-/High-DPI-Bildschirmen, 1× wenn die exakte Pixelgröße bekannt und final ist, und 3×–4× als Master-Asset, von dem Sie später herunterskalieren. Für ein Favicon: in 512-px-Entsprechung exportieren und verkleinern.",
      },
      {
        q: "Verliert die PNG-Konvertierung die Skalierbarkeit von SVG?",
        a: "Ja — ein PNG hat eine feste Auflösung. Deshalb rendert dieses Tool direkt in der Zielgröße, statt klein zu rasterisieren und zu strecken. Behalten Sie Ihre .svg-Quelle für künftige Bearbeitungen und exportieren Sie frische PNGs, wann immer Sie eine andere Größe brauchen.",
      },
      {
        q: "Überleben transparente Hintergründe die Konvertierung?",
        a: "Ja. Die Ausgabe ist ein PNG mit vollem Alpha, Ihr Icon behält also seine Transparenz exakt wie im SVG. Nur Schriften und externe Bilder, die das SVG referenziert, müssen eventuell in der Datei selbst eingebettet sein, um zu rendern.",
      },
    ],
  },
  "watermark-image": {
    name: "Bild-Wasserzeichen",
    tagline:
      "Ein Text-Wasserzeichen auf Bilder setzen — Position, Deckkraft, Größe oder Kachelung, verarbeitet vollständig in Ihrem Browser.",
    intro: [
      "Schützen Sie Entwürfe, Korrekturfahnen und Fotos mit einem Text-Wasserzeichen, das Sie voll kontrollieren: in jede Ecke oder mittig setzen, über das ganze Bild kacheln, Größe und Deckkraft justieren — die markierten Kopien entstehen auf Ihrem Gerät.",
      "Nichts wird hochgeladen, Sie dürfen also unveröffentlichte Arbeiten, Kundenfahnen und vertrauliche Scans markieren, ohne sie irgendwohin zu senden.",
    ],
    steps: [
      "Ziehen Sie ein Bild oder einen ganzen Stapel hierher.",
      "Tippen Sie den Wasserzeichen-Text ein und stellen Sie Deckkraft, Größe, Position ein — oder aktivieren Sie die Kachelung.",
      "Wenden Sie es an und laden Sie jede markierte Kopie herunter.",
    ],
    faqs: [
      {
        q: "Kann jemand mein Wasserzeichen entfernen?",
        a: "Ein sichtbares Wasserzeichen ist eine Abschreckung, keine Verschlüsselung — alles Sichtbare lässt sich mit Aufwand herausbearbeiten. Für echten Schutz teilen Sie stattdessen Korrekturfahnen in niedriger Auflösung.",
      },
      {
        q: "Funktioniert es mit transparenten PNGs?",
        a: "Die Ausgabe ist JPG, Transparenz wird also auf Weiß gelegt. Markieren Sie das Original-PNG mit einer Hintergrundfarbe Ihrer Wahl, wenn Sie Alpha brauchen.",
      },
    ],
  },
  "webp-converter": {
    name: "WebP-Konverter",
    tagline:
      "Bilder zu WebP konvertieren oder WebP-Dateien zurück in JPG und PNG — Zielformat wählen, Qualität justieren, stapelweise im Schwarm verarbeiten.",
    intro: [
      "Der Wechsel zu WebP senkt die Dateigrößen um 25–35 % gegenüber JPG bei gleicher visueller Qualität — ideal für Websites und Apps. Der Rückweg von WebP zu JPG oder PNG lässt Bilder in älterer Software aufgehen, die Googles Format nie gelernt hat.",
      "Werfen Sie jede Mischung aus WebP, JPG, PNG und mehr ab, wählen Sie das Ausgabeformat, und jede Datei konvertiert auf einen Schlag — mit Größe vorher und nachher pro Zeile. Alles kodiert Ihr Browser auf Ihrem eigenen Gerät — niemals Uploads.",
    ],
    steps: [
      "Ziehen Sie WebP-Dateien hierher, um von WebP weg zu konvertieren, oder beliebige Bilder, um zu WebP zu konvertieren.",
      "Wählen Sie das Ausgabeformat (WebP, JPG oder PNG) und stellen Sie die Qualität für verlustbehaftete Formate ein.",
      "Laden Sie die konvertierten Dateien einzeln oder alle auf einmal herunter.",
    ],
    faqs: [
      {
        q: "Warum sollte ich WebP statt JPG nutzen?",
        a: "WebP komprimiert 25–35 % kleiner als JPG bei gleicher Qualität und unterstützt sowohl Transparenz als auch Animation. Jeder aktuelle Browser rendert es, es ist also die Standardwahl für Web-Bilder. JPG nur wählen, wenn Sie sehr alte Software unterstützen müssen.",
      },
      {
        q: "Öffnet eine WebP-Datei in jeder App?",
        a: "Alle modernen Browser und aktuelle Versionen von Windows, macOS, Android und iOS beherrschen WebP. Manche älteren Foto-Editoren und einige Webformulare verweigern es weiterhin — genau dann konvertieren Sie es hier zurück zu JPG oder PNG.",
      },
      {
        q: "Ist die Konvertierung zu WebP verlustfrei?",
        a: "Sie entscheiden: WebP unterstützt verlustfreie und verlustbehaftete Kodierung. Bei der Standardqualität 90 ist das Ergebnis visuell ununterscheidbar, aber deutlich kleiner; senken Sie den Regler für maximale Ersparnis, oder wählen Sie PNG-Ausgabe für strikte Verlustfreiheit.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* Text                                                                */
  /* ------------------------------------------------------------------ */
  "case-converter": {
    name: "Schreibweisen-Konverter",
    tagline:
      "Text zwischen GROSSBUCHSTABEN, Kleinbuchstaben, Titel-, camelCase, snake_case und 6 weiteren Stilen umwandeln — live.",
    intro: [
      "Elf Schreibweisen auf einer Seite: Satzanfänge fürs Schreiben, Titelschreibweise für Überschriften, camelCase / PascalCase / snake_case / kebab-case / CONSTANT_CASE für Code, dazu Alternierend und Invertiert für zwischendurch.",
      "Alles rechnet bei jeder Eingabe neu — kein Knopfdrücken, und die Konvertierung verlässt nie Ihren Browser.",
    ],
    steps: [
      "Fügen Sie Ihren Text in das Eingabefeld ein oder tippen Sie ihn.",
      "Klicken Sie auf eine Stiltaste — die Ausgabe aktualisiert sich sofort.",
      "Kopieren Sie das Ergebnis oder wechseln Sie zum Vergleich zu einem anderen Stil.",
    ],
    faqs: [
      {
        q: "Worin unterscheiden sich camelCase und PascalCase?",
        a: "camelCase beginnt klein (myVariableName), PascalCase groß (MyVariableName). Beide entfernen Leerzeichen und Unterstriche aus den Wörtern.",
      },
      {
        q: "Lässt die Titelschreibweise kleine Wörter klein?",
        a: "Ja. Artikel und kurze Präpositionen (a, the, of, in…) bleiben klein, sofern sie nicht erstes oder letztes Wort sind — nach gängigem redaktionellen Stil.",
      },
      {
        q: "Wird mein Text irgendwo hochgeladen?",
        a: "Nein. Die Konvertierung geschieht lokal in Ihrem Browser mit JavaScript — nichts wird an einen Server gesendet.",
      },
    ],
  },
  "character-counter": {
    name: "Zeichenzähler",
    tagline:
      "Zeichen mit und ohne Leerzeichen zählen, dazu Wörter, Sätze, Absätze und Zeilen bei jeder Eingabe — ideal für Tweets, Titel und Meta-Beschreibungen.",
    intro: [
      "Ein Zeichenzähler für harte Grenzen: Social-Posts, Meta-Titel, Meta-Beschreibungen, Anzeigentexte, SMS und App-Felder, die jedes Zeichen zählen. Das Panel zeigt Zeichen mit und ohne Leerzeichen, Sie wissen also immer, welche Zahl die Plattform interessiert.",
      "Die Zählungen aktualisieren sich bei jeder Eingabe, und nichts verlässt Ihren Browser — fügen Sie unveröffentlichte Entwürfe, Kundentexte oder vertrauliche Inhalte ein, ohne sich Gedanken über Speichern oder Senden zu machen.",
    ],
    steps: [
      "Fügen Sie Ihren Text in das Feld ein oder tippen Sie ihn.",
      "Lesen Sie zuerst das hervorgehobene Zeichen-Panel, dann die übrigen Zählungen nach Bedarf.",
      "Kürzen Sie Ihren Text, bis Sie unter dem Limit sind — die Zahlen aktualisieren sich live.",
    ],
    faqs: [
      {
        q: "Zählen Leerzeichen und Zeilenumbrüche als Zeichen?",
        a: "Ja — die Hauptzahl zählt jedes Zeichen inklusive Leerzeichen und Umbrüche, genau wie die meisten Plattformen. Die Zahl „Ohne Leerzeichen“ streift Leerraum, damit Sie vergleichen können.",
      },
      {
        q: "Wie werden Emoji gezählt?",
        a: "Emoji werden als Unicode-Codepunkte gezählt, die meisten modernen Emoji zählen also als ein Zeichen. Komplexe Sequenzen aus mehreren Codepunkten (Hauttonvarianten, Familien-Emoji) können als mehr als eines zählen.",
      },
      {
        q: "Welche Plattformen begrenzen nach Zeichen?",
        a: "X/Twitter-Posts, Meta-Titel (rund 60) und Beschreibungen (rund 160), SMS-Segmente (160) und die meisten Werbeplattformen — prüfen Sie immer das konkrete Feld, für das Sie schreiben.",
      },
    ],
  },
  "emoji-picker": {
    name: "Emoji-Auswahl",
    tagline:
      "Über 670 gängige Emoji in 8 kuratierten Gruppen durchstöbern, nach englischem Namen suchen, per Klick kopieren und die 16 letzten Aufrufe wiederverwenden.",
    intro: [
      "Ein handkuratiertes Emoji-Brett mit 677 Einträgen, gruppiert wie Sie denken: Smileys, Menschen, Tiere, Essen, Aktivitäten, Reisen, Objekte und Symbole. Die Suche trifft den offiziellen englischen Namen — „star“ findet ⭐, 🌟 und ✨ auf einen Streich.",
      "Ein Klick kopiert das Zeichen in die Zwischenablage, mit sichtbarer Bestätigung, damit Sie nie rätseln, ob es geklappt hat. Ihre 16 letzten Aufrufe bleiben über localStorage auf diesem Gerät — der Favorit von morgen ist also einen Tipp entfernt. Keine Bilder werden geladen; das Raster rendert native Emoji-Glyphen sofort.",
    ],
    steps: [
      "Tippen Sie einen Namen in das Suchfeld oder wählen Sie eine Gruppen-Registerkarte.",
      "Klicken Sie auf ein beliebiges Emoji — es landet sofort in Ihrer Zwischenablage.",
      "Finden Sie Ihre letzten Aufrufe in der obersten Zeile, gespeichert auf diesem Gerät.",
    ],
    faqs: [
      {
        q: "Woher kommen die Emoji?",
        a: "Es sind native Glyphen, gerendert von der Emoji-Schrift Ihres Betriebssystems. Nichts wird heruntergeladen, die Seite bleibt also schnell und funktioniert nach dem Laden offline.",
      },
      {
        q: "Warum sehen manche Emoji anders aus als auf meinem Handy?",
        a: "Jede Plattform zeichnet Emoji in ihrem eigenen Stil. Das Raster zeigt, wie das aktuelle Gerät sie rendert; das kopierte Zeichen sieht in der empfangenden App genauso aus.",
      },
      {
        q: "Wie funktioniert „Zuletzt verwendet“?",
        a: "Jedes kopierte Emoji wird im localStorage Ihres Browsers gemerkt (bis zu 16). Das Löschen Ihrer Browserdaten setzt die Liste zurück.",
      },
    ],
  },
  "fancy-text-generator": {
    name: "Fancy-Text-Generator",
    tagline:
      "Einfachen Text in 12 Unicode-Stile verwandeln — fett, kursiv, Schreibschrift, doppelstrich, eingekreist, vollbreit — und jeden mit einem Klick kopieren.",
    intro: [
      "Einmal tippen und zwölf Unicode-Varianten auf einmal erhalten: mathematisch fett, kursiv, fett kursiv, Schreibschrift, fette Schreibschrift, doppelstrich, monospaced, eingekreist, eingerahmte und vollbreite Alphabete, plus Durch- und Unterstreichung mit kombinierenden Zeichen.",
      "Weil dies echte Unicode-Zeichen sind — keine Schriften — fügen sich die Ergebnisse unversehrt in Instagram-Bios, TikTok-Untertitel, Discord-Namen, Tweet-Entwürfe und Chat-Apps ein. Zeichen außerhalb des lateinischen Alphabets, etwa Chinesisch, Japanisch oder Emoji, werden unverändert durchgereicht, damit nichts zu fehlenden-Glyphen-Kästen wird.",
    ],
    steps: [
      "Tippen oder fügen Sie Ihren Text ein — ein Beispiel ist bereits geladen zum Ausprobieren.",
      "Blättern Sie durch die Live-Liste: Jeder Stil zeigt Ihren Text sofort.",
      "Klicken Sie beim gewünschten Stil auf Kopieren und fügen Sie ihn überall ein, wo Text akzeptiert wird.",
    ],
    faqs: [
      {
        q: "Warum sieht der Text auf manchen Websites gleich aus?",
        a: "Fancy-Text nutzt Unicode-Zeichen, und die Schrift einer Website kann für manche davon keine Glyphen haben (besonders Schreibschrift und Doppelstrich). Wenn ein Stil irgendwo seltsam rendert, probieren Sie fett, eingekreist oder vollbreit — die haben die breiteste Schriftabdeckung.",
      },
      {
        q: "Kann ich das für meine Instagram-Bio oder meinen TikTok-Namen nutzen?",
        a: "Ja. Die Ausgabe ist einfacher Unicode-Text und funktioniert in Social-Bios, Anzeigenamen, Kommentaren und überall sonst, wo reguläre Zeichen akzeptiert werden.",
      },
      {
        q: "Was passiert mit Zeichen wie Emoji oder 中文?",
        a: "Sie bleiben exakt wie eingegeben. Der Generator bildet nur lateinische Buchstaben und Ziffern ab, Emoji, CJK und akzentuierte Buchstaben laufen also unverändert durch, statt zu leeren Kästchen zu werden.",
      },
    ],
  },
  "find-and-replace": {
    name: "Suchen und Ersetzen",
    tagline:
      "Über Tausende von Wörtern suchen und ersetzen, mit Groß-/Kleinschreibung, Ganzwort- und Regex-Modus — die Trefferzahl sehen, bevor Sie sich festlegen.",
    intro: [
      "Ein Suchfeld, ein Ersetzen-Feld, drei Treffermodi. Einfacher Text für schnelle Tausche, Ganzwort-Modus, damit „Katze“ nie in „Kategorie“ landet, und reguläre Ausdrücke für Muster — Daten, Tags, wiederholte Leerzeichen oder alles andere, was Sie beschreiben können.",
      "Treffer werden bei jeder Eingabe gezählt und die Ersetzung erscheint in einer Live-Vorschau, Sie sehen also exakt, was sich ändert, bevor Sie irgendetwas kopieren.",
    ],
    steps: [
      "Fügen Sie den Text ein, dann tippen Sie, was gesucht und wodurch es ersetzt werden soll.",
      "Wählen Sie einen Modus: Groß-/Kleinschreibung beachten, nur ganze Wörter oder regulärer Ausdruck.",
      "Prüfen Sie die Trefferzahl und kopieren Sie dann das ersetzte Ergebnis.",
    ],
    faqs: [
      {
        q: "Kann ich im Regex-Modus Erfassungsgruppen nutzen?",
        a: "Ja. Klammern Sie Teile des Musters und referenzieren Sie sie in der Ersetzung als $1, $2 und so weiter — zum Beispiel „(\\d{4})-(\\d{2})“ suchen und mit „$2/$1“ ersetzen.",
      },
      {
        q: "Was verhindert „nur ganze Wörter“?",
        a: "Es trifft nur zu, wenn der Begriff allein steht: Die Suche nach „Katze“ matcht dann nicht mehr „Kategorie“ oder „Verkattung“.",
      },
      {
        q: "Werden $-Zeichen in meiner Ersetzung wörtlich behandelt?",
        a: "Im einfachen Modus ja — „$100“ bleibt „$100“. Im Regex-Modus sind $-Muster besonders ($1 bedeutet Gruppe 1); maskieren Sie mit \\$, wenn Sie ein wörtliches brauchen.",
      },
    ],
  },
  "lorem-ipsum-generator": {
    name: "Lorem-Ipsum-Generator",
    tagline:
      "1–50 Absätze klassischen Lorem-ipsum-Fülltextes für Mockups, Wireframes und CMS-Tests erzeugen — ein Klick zum Neuerzeugen und Kopieren.",
    intro: [
      "Lorem ipsum ist seit den 1500ern der Platzhalter der Druckindustrie: verdrehtes Latein aus Ciceros „De Finibus“, das wie echter Text aussieht, aber keine Bedeutung trägt — niemand hält also einen Entwurf für fertige Kopie. Wählen Sie eine Absatzzahl, drücken Sie den Knopf und fügen Sie es in Ihr Layout ein.",
      "Der Text entsteht lokal mit einem seeded pseudozufälligen Generator, jede Runde ist also anders — und nichts, was Sie auf dieser Seite tun, verlässt den Browser.",
    ],
    steps: [
      "Stellen Sie ein, wie viele Absätze Sie brauchen (1–50).",
      "Drücken Sie die Taste, um eine frische Runde zu erzeugen.",
      "Kopieren Sie den Text direkt in Ihr Design, Ihre Vorlage oder Ihr CMS.",
    ],
    faqs: [
      {
        q: "Was ist Lorem ipsum überhaupt?",
        a: "Verkürztes, verdrehtes Latein aus einer Passage von Ciceros De Finibus Bonorum et Malorum — bedeutungsloser Fülltext. Seine Buchstabenverteilung ahmt echte Sprache nach, ideal also, um Layouts zu beurteilen, ohne Inhalte zu lesen.",
      },
      {
        q: "Warum nicht einfach „Text Text Text“?",
        a: "Wiederholte Dummy-Wörter erzeugen unrealistische Formen und verdecken Probleme mit Zeilenumbrüchen und Rhythmus. Lorem ipsum ahmt Wortlänge und Verteilung echter Sprache nach.",
      },
      {
        q: "Bekomme ich mehr als 50 Absätze?",
        a: "Eine Runde ist auf 50 Absätze begrenzt, damit die Seite schnell bleibt; drücken Sie die Taste erneut, wann immer Sie eine frische Runde brauchen.",
      },
    ],
  },
  "remove-duplicate-lines": {
    name: "Doppelte Zeilen entfernen",
    tagline:
      "Wiederholte Zeilen aus Listen und Logs löschen, in der Originalreihenfolge — mit Groß-/Kleinschreib- und Trim-Optionen.",
    intro: [
      "Fügen Sie eine beliebige Liste ein — E-Mails, URLs, Keywords, Logzeilen — und erhalten dieselbe Liste ohne Duplikate in einem Durchgang. Die Optionen decken die üblichen Varianten ab: Groß-/Kleinschreibung ignorieren, Leerraum vor dem Vergleichen trimmen, leere Zeilen entfernen oder das Ergebnis sortieren.",
    ],
    steps: [
      "Fügen Sie Ihre Liste in das Eingabefeld ein — ein Eintrag pro Zeile.",
      "Schalten Sie Optionen um, wenn Sie Groß-/Kleinschreibung ignorieren oder aufräumen möchten.",
      "Kopieren Sie die deduplizierte Ausgabe; die Originalreihenfolge bleibt erhalten, solange Sie das Sortieren nicht einschalten.",
    ],
    faqs: [
      {
        q: "Bleibt die ursprüngliche Zeilenreihenfolge erhalten?",
        a: "Ja. Das erste Auftreten jeder Zeile bleibt an seinem Platz. Sortiert wird nur, wenn Sie die Sortieroption einschalten.",
      },
      {
        q: "Behandelt es „Apple“ und „apple“ als Duplikate?",
        a: "Aktivieren Sie „Groß-/Kleinschreibung ignorieren“, und sie gelten als dieselbe Zeile; die zuerst gesehene Variante bleibt erhalten.",
      },
    ],
  },
  "remove-extra-spaces": {
    name: "Überflüssige Leerzeichen entfernen",
    tagline:
      "Doppelte Leerzeichen auf eines stauchen, Tabulatoren umwandeln, Zeilenränder trimmen und Leerzeilen entfernen — eingefügten Text in einem Durchgang säubern.",
    intro: [
      "Aus PDFs, Tabellen, Terminals und Chat-Apps kopierter Text kommt oft voller doppelter Leerzeichen, verrutschter Tabs und leerer Zeilen an. Dieses Tool staucht wiederholte Leerzeichen auf eines und gibt Ihnen Schalter für den Rest: Tabs in Leerzeichen umwandeln, die Ränder jeder Zeile trimmen und Leerzeilen streichen.",
      "Alles läuft lokal bei jeder Eingabe, Sie fügen also Logs, Entwürfe oder alles andere Vertrauliche ohne Zögern ein.",
    ],
    steps: [
      "Fügen Sie den chaotischen Text in das Eingabefeld ein.",
      "Schalten Sie Tab-Umwandlung, Zeilen-Trimmen oder Leerzeilen-Entfernung nach Bedarf um.",
      "Kopieren Sie die bereinigte Ausgabe direkt zurück in Ihr Dokument oder Ihren Editor.",
    ],
    faqs: [
      {
        q: "Staucht es Leerzeichen innerhalb von Zeilen oder nur an den Rändern?",
        a: "Wiederholte Leerzeichen im ganzen Text werden auf ein einzelnes reduziert. Rand-Leerraum wird nur entfernt, wenn Sie „Zeilenränder trimmen“ einschalten.",
      },
      {
        q: "Zerbricht es meine Code-Einrückung?",
        a: "Kann es — Einrückung lebt von führenden Leerzeichen oder Tabs. Lassen Sie für Code „Zeilenränder trimmen“ aus oder nutzen Sie einen richtigen Formatter.",
      },
      {
        q: "Bleiben Zeilenumbrüche erhalten?",
        a: "Ja. Das Tool fasst nur horizontalen Leerraum und leere Zeilen an; die Zeilenstruktur Ihres Texts bleibt intakt.",
      },
    ],
  },
  "reverse-text": {
    name: "Text umkehren",
    tagline:
      "Beliebigen Text Zeichen für Zeichen rückwärts drehen oder die Reihenfolge ganzer Zeilen umkehren — Unicode-sicher, sofort und vollständig lokal.",
    intro: [
      "Zwei Umkehrungen in einem Tool: Spiegeln Sie die Zeichen Ihres Texts (der klassische „txet esrever“-Trick für Spiele, Bios und Rätselhinweise) oder kehren Sie die Reihenfolge der Zeilen um, sodass die letzte Zeile zuerst kommt — praktisch für Logs, Chat-Exporte und von unten eingefügte Listen.",
      "Die Umkehrung arbeitet auf Unicode-Codepunkten, nicht auf rohen Bytes, akzentuierte Buchstaben und die meisten Emoji überstehen sie also unversehrt, statt zu Mojibake zu werden.",
    ],
    steps: [
      "Fügen Sie den Text ein oder tippen Sie ihn, den Sie drehen möchten.",
      "Lassen Sie „Nur Zeilen umkehren“ aus, um Zeichen zu spiegeln, oder schalten Sie es ein, um die Zeilenreihenfolge umzukehren.",
      "Kopieren Sie das umgekehrte Ergebnis.",
    ],
    faqs: [
      {
        q: "Überstehen Emoji und akzentuierte Buchstaben die Umkehrung?",
        a: "In den gängigen Fällen ja: Das Tool kehrt auf Unicode-Codepunkte um, é, ñ und Standard-Emoji bleiben also intakt. Sehr komplexe Emoji aus mehreren Teilen können beim Spiegeln dennoch auseinanderfallen.",
      },
      {
        q: "Was genau macht „Nur Zeilen umkehren“?",
        a: "Es hält jede Zeile intakt und dreht nur die Reihenfolge der Zeilen selbst — die erste Zeile wird zur letzten. Nutzen Sie es, wenn eine Liste von unten nach oben eingefügt wurde.",
      },
      {
        q: "Kann ich das für Palindrom-Prüfungen nutzen?",
        a: "Indirekt — Text einfügen, umkehren und mit dem Auge vergleichen, oder es mit dem Text-Diff-Tool paaren.",
      },
    ],
  },
  "sentence-counter": {
    name: "Satz-Zähler",
    tagline:
      "Sätze sofort zählen und daneben Wörter, Absätze und Lesezeit sehen — eine schnelle Lesbarkeitsprüfung für Redakteure und Autoren.",
    intro: [
      "Die Satzzahl ist das schnellste Lesbarkeitssignal, das ein Autor hat. Dieses Tool zählt Sätze bei jeder Eingabe und stellt sie neben Wörter, Absätze, Zeilen und Lesezeit — Sie sehen also auf einen Blick, ob ein Absatz zu dicht wird.",
      "Es erkennt die Interpunktion, die Sätze in gemischtsprachigem Text wirklich beendet: lateinische Punkte, Frage- und Ausrufezeichen, dazu die vollbreiten 。!?… aus Chinesisch und Japanisch.",
    ],
    steps: [
      "Fügen Sie Ihren Entwurf, Ihre E-Mail oder Ihren Artikel in das Feld ein.",
      "Prüfen Sie die hervorgehobene Satz- und Wortzahl im Vergleich.",
      "Teilen oder verschmelzen Sie Sätze, bis Sie Ihre Ziel-Durchschnittslänge treffen.",
    ],
    faqs: [
      {
        q: "Was zählt als Satz?",
        a: "Jeder Textabschnitt, der mit Punkt, Fragezeichen, Ausrufezeichen oder den CJK-Entsprechungen 。!?… endet — sofern er etwas anderes als Leerraum enthält.",
      },
      {
        q: "Warum weicht meine Zahl von der meines Editors ab?",
        a: "Abkürzungen wie „Mr.“ oder „e.g.“ enden mit einem Punkt und werden als Satzende gezählt — dieses Tool nutzt Interpunktionsregeln, kein vollständiges Sprachparsing.",
      },
      {
        q: "Wie viele Sätze sollte ein Absatz haben?",
        a: "Stilführer empfehlen üblicherweise 2–5. Es gibt keine in Stein gemeißelte Regel: Nutzen Sie die Zahl, um Textwände zu entdecken, bevor Ihre Leser es tun.",
      },
    ],
  },
  "slug-generator": {
    name: "Slug-Generator",
    tagline:
      "Jede Überschrift in einen sauberen URL-Slug verwandeln — klein, akzentfrei und mit Bindestrichen — bereit für SEO-freundliche Links.",
    intro: [
      "Ein Slug ist der Teil einer URL, der die Seite benennt — etwa /tools/slug-generator. Gute Slugs sind kleinbuchstaben, nutzen Bindestriche statt Leerzeichen und behalten nur Buchstaben und Zahlen; so bleiben Links in Suchergebnissen lesbar, leicht zu kopieren und über Server und Frameworks hinweg sicher.",
      "Fügen Sie einen Titel in beliebiger Sprache ein: Akzente werden gestreift (café → cafe), Interpunktion und Leerzeichen schrumpfen zu einfachen Bindestrichen, und das Ergebnis wird gestutzt, sodass kein Slug mit einem Strich beginnt oder endet.",
    ],
    steps: [
      "Tippen oder fügen Sie den Seitentitel in das Eingabefeld ein.",
      "Sehen Sie zu, wie der Slug bei jeder Eingabe erscheint — justieren Sie den Titel, bis er gut liest.",
      "Kopieren Sie den Slug in Ihr CMS, Ihren Router oder Ihren statischen Site-Generator.",
    ],
    faqs: [
      {
        q: "Was macht einen guten URL-Slug aus?",
        a: "Kurz, kleinbuchstaben, bindestrichgetrennt und beschreibend. Suchmaschinen lesen Slugs als Ranking-Hinweis, Nutzer lesen sie in den Ergebnissen — „blaue-laufschuhe“ schlägt also „/p?id=8123“.",
      },
      {
        q: "Warum werden Akzente entfernt?",
        a: "Nicht-ASCII-Zeichen werden in URLs prozentkodiert (é wird zu %C3%A9) und erzeugen lange, hässliche, fehleranfällige Links. ASCII-Slugs bleiben kurz und funktionieren überall.",
      },
      {
        q: "Soll ich Stoppwörter wie „the“ und „of“ behalten?",
        a: "Viele SEO-Führer raten zum Streichen, um Slugs kurz zu halten — bearbeiten Sie den erzeugten Slug frei, bevor Sie kopieren; das Tool liefert die vollständige bindestrichgetrennte Basis.",
      },
    ],
  },
  "text-cleaner": {
    name: "Text-Bereiniger",
    tagline:
      "Unsichtbare Zeichen, typografische Anführungszeichen, überflüssige Leerzeichen und Leerzeilen aus Text entfernen, der aus PDFs, Word und Chat-Apps stammt.",
    intro: [
      "Kopieren-Einfügen ist der Ort, an dem sauberer Text stirbt: PDFs hinterlassen Nullbreitenzeichen, Word tauscht gerade gegen geschweifte Anführungszeichen und fügt geschützte Leerzeichen ein, Chat-Apps schieben Steuerzeichen hinein. Dieses Tool streift den unsichtbaren Schmutz und repariert die Interpunktion in einem Durchgang.",
      "Jede Option ist ein Schalter, Sie entscheiden also, wie gründlich die Bereinigung ist — vom bloßen Trimmen der Zeilen bis zur Komplettwäsche, die nicht druckbare Zeichen entfernt und Anführungszeichen, Striche und Auslassungspunkte normalisiert.",
    ],
    steps: [
      "Fügen Sie den chaotischen Text in das Eingabefeld ein.",
      "Schalten Sie die Bereinigungen um, die Sie wollen: Zeilen trimmen, Leerzeichen stauchen, Leerzeilen entfernen, unsichtbare Zeichen streifen, Interpunktion normalisieren.",
      "Kopieren Sie die saubere Ausgabe zurück in Ihr Dokument, CMS oder Ihren Editor.",
    ],
    faqs: [
      {
        q: "Was sind unsichtbare Zeichen und woher kommen sie?",
        a: "Nullbreiten-Leerzeichen, Byte-Order-Marks und Steuerzeichen — eingetragen von PDFs, manchen Websites und Bürosoftware. Sie sind unsichtbar, brechen aber Suchen, Regexe und Datenbankimporte; das Entfernen ist meistens sicher.",
      },
      {
        q: "Was ändert „Interpunktion normalisieren“?",
        a: "Geschweifte Anführungszeichen werden gerade, Halb- und Halbgeviertstriche werden Bindestriche, das Auslassungszeichen wird zu drei Punkten, und geschützte Leerzeichen werden reguläre. Nutzen Sie es, wenn schlichte, code-taugliche Interpunktion zählt.",
      },
      {
        q: "Ist die Bereinigung verlustfrei?",
        a: "Kein Tool kennt Ihre Absicht sicher. Das Ausgabefeld zeigt das Ergebnis immer zuerst — prüfen Sie es, bevor Sie Ihr Original ersetzen.",
      },
    ],
  },
  "text-diff": {
    name: "Text-Vergleich (Diff)",
    tagline:
      "Zwei Fassungen eines Texts Wort für Wort vergleichen, mit hervorgehobenen Ergänzungen und Streichungen — ohne Konto, ohne Upload, ohne Größenstress.",
    intro: [
      "Fügen Sie das Original links und die bearbeitete Fassung rechts ein: geänderte Wörter leuchten sofort auf, Streichungen in einer Farbe, Ergänzungen in einer anderen. Der schnellste Weg, eine Vertragsänderung, den Umbau einer Redakteurin oder die letzten-minute-Korrekturen einer Kollegin zu prüfen.",
      "Der Vergleich läuft vollständig in Ihrem Browser — lange Verträge, unveröffentlichte Manuskripte und vertrauliche Texte berühren nie einen Server.",
    ],
    steps: [
      "Fügen Sie den Originaltext in das linke Feld ein.",
      "Fügen Sie den geänderten Text in das rechte Feld ein.",
      "Lesen Sie die vereinigte Ansicht darunter: Durchgestrichenes markiert Entfernungen, Grün markiert Ergänzungen.",
    ],
    faqs: [
      {
        q: "Wie werden Unterschiede angezeigt?",
        a: "Unveränderter Text bleibt schlicht; entfernte Wörter sind orange durchgestrichen, hinzugefügte Wörter grün hervorgehoben — ein Absatz liest sich also wie eine nachverfolgte Änderung.",
      },
      {
        q: "Ist es ein Zeichen- oder Wortebenen-Diff?",
        a: "Wortebene. Kleine Änderungen innerhalb eines Worts erscheinen als ein entferntes plus ein hinzugefügtes Wort — leichter zu überfliegen als ein Diff auf Zeichenebene.",
      },
      {
        q: "Gibt es ein Größenlimit?",
        a: "Nur der Speicher Ihres Browsers — buchlange Vergleiche funktionieren, sehr große Texte brauchen nur einen Moment zum Rendern.",
      },
    ],
  },
  "text-sorter": {
    name: "Text-Sortierer",
    tagline:
      "Beliebige Zeilenlisten alphabetisch, rückwärts, nach Länge oder nach Zahl sortieren — sprachraumorientiert und sofort, direkt im Browser.",
    intro: [
      "Fügen Sie eine Liste von Namen, URLs, Preisen, Aufgaben oder Logzeilen ein und ordnen Sie sie mit einem Klick: A→Z für Verzeichnisse und Indizes, Z→A für Ranglisten, kürzeste zuerst für Aufräumrunden, numerisch, damit „Punkt 10“ nach „Punkt 2“ landet statt zwischen „Punkt 1“ und „Punkt 2“.",
      "Die Sortierung nutzt die sprachraumorientierte Vergleichslogik des Browsers, akzentuierte Zeichen landen also dort, wo ein Mensch sie erwartet — nicht hinter dem ganzen Alphabet.",
    ],
    steps: [
      "Fügen Sie Ihre Liste in das Eingabefeld ein — ein Eintrag pro Zeile.",
      "Wählen Sie eine Ordnung: A→Z, Z→A, kurz→lang oder numerisch.",
      "Kopieren Sie das sortierte Ergebnis oder sortieren Sie zum Vergleich mit einer anderen Ordnung neu.",
    ],
    faqs: [
      {
        q: "Worin unterscheidet sich numerisches Sortieren von A→Z?",
        a: "Alphabetisches Sortieren vergleicht Zeichen für Zeichen, „10“ kommt also vor „2“. Der numerische Modus liest jede Zeile zuerst als Zahl und ordnet sie nach Wert.",
      },
      {
        q: "Klappt es mit akzentuiertem und nicht-lateinischem Text?",
        a: "Ja. Die Sortierung nutzt Intl.Collator, den sprachraumorientierten Vergleich des Browsers — é, ñ, ü und CJK-Zeichen sortieren also nach sprachlichen Konventionen statt nach rohen Codepunkten.",
      },
      {
        q: "Wird die ursprüngliche Liste verändert?",
        a: "Nein — die Eingabe bleibt unangetastet, das sortierte Ergebnis erscheint im Ausgabefeld. Sie können also immer zurück.",
      },
    ],
  },
  "word-counter": {
    name: "Wortzähler",
    tagline:
      "Wörter, Zeichen, Sätze und Lesezeit live bei jeder Eingabe zählen — mit korrekter CJK-Behandlung, ganz ohne Upload.",
    intro: [
      "Ein Echtzeit-Wortzähler für Aufsätze, Posts, SEO-Texte und Übersetzungen. Er zeigt Wörter, Zeichen mit und ohne Leerzeichen, Sätze, Absätze, Zeilen und die geschätzte Lesezeit in einem Raster.",
      "Gemischtsprachiger Text wird richtig gezählt: Englischartige Wörter werden am Leerraum zerlegt, während chinesische, japanische und koreanische Zeichen einzeln gezählt werden — genau so, wie Wortlimits in diesen Sprachen tatsächlich funktionieren.",
    ],
    steps: [
      "Fügen Sie Ihren Text ein oder schreiben Sie ihn — die Statistiken aktualisieren sich sofort.",
      "Prüfen Sie das hervorgehobene Panel für die Zahl, die Sie interessiert.",
      "Schreiben Sie weiter; nichts wird gespeichert oder hochgeladen, sicher also für unveröffentlichte Entwürfe.",
    ],
    faqs: [
      {
        q: "Wie werden Wörter in chinesischem oder japanischem Text gezählt?",
        a: "CJK-Zeichen werden einzeln gezählt und zur Wortzahl addiert, da diese Sprachen Wörter nicht mit Leerzeichen trennen. Eine 500-Zeichen-Passage in Chinesisch meldet also rund 500 „Wörter“.",
      },
      {
        q: "Wie wird die Lesezeit geschätzt?",
        a: "Mit rund 220 Wörtern pro Minute für lateinischen Text (CJK nach Zeichenzahl gewichtet), aufgerundet auf die nächste Minute.",
      },
      {
        q: "Gibt es ein Längenlimit?",
        a: "Kein hartes — der Zähler ist nur durch den Speicher Ihres Browsers begrenzt, der buchlange Texte problemlos schafft.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* Entwickler                                                          */
  /* ------------------------------------------------------------------ */
  "base64-decoder": {
    name: "Base64-Decoder",
    tagline:
      "Base64 mit sauberer UTF-8-Behandlung in lesbaren Text dekodieren — Data-URIs und API-Payloads werden sofort klar. Privat, kostenlos, ohne Upload.",
    intro: [
      "Fügen Sie Base64 ein und sehen Sie den dekodierten Text live. Die Dekodierung läuft über den Standard-TextDecoder, mehrbyteiges UTF-8 — Akzente, Emoji, CJK — kommt also korrekt heraus, statt zu Mojibake zu werden.",
      "Es ist auf die nützlichen Arten nachsichtig: Leerraum und Zeilenumbrüche in der Eingabe werden ignoriert, und Data-URI-Präfixe wie data:image/png;base64, werden vor dem Dekodieren automatisch gestreift.",
    ],
    steps: [
      "Fügen Sie die Base64-Zeichenkette in das Eingabefeld ein.",
      "Der dekodierte Text erscheint sofort — mit einem Klick kopieren.",
      "Scheitert die Dekodierung, prüfen Sie die Eingabe auf abgeschnittene oder Nicht-Base64-Zeichen.",
    ],
    faqs: [
      {
        q: "Die Ausgabe sieht aus wie wirre Symbole — warum?",
        a: "Die Eingabe ist wahrscheinlich kein UTF-8-Text. Base64 kann beliebige Bytes kodieren: Bilder, PDFs, binäre Blobs. Dieses Tool dekodiert Bytes als UTF-8-Text, Binärdaten erscheinen also als Ersatzzeichen.",
      },
      {
        q: "Dekodiert es URL-sicheres Base64?",
        a: "Ja — es zielt auf JWT-artige Daten, in denen - und _ + und / ersetzen. Standard-Base64 mit oder ohne Padding funktioniert ebenfalls.",
      },
      {
        q: "Erfolgt die Dekodierung auf einem Server?",
        a: "Nein. Alles läuft in Ihrem Browser; die Zeichenkette verlässt Ihr Gerät nie.",
      },
    ],
  },
  "base64-encoder": {
    name: "Base64-Encoder",
    tagline:
      "Text sofort zu Base64 kodieren, mit vollem UTF-8-Support — Emoji, Akzente und CJK-Zeichen bleiben unversehrt. Kostenlos, privat, nichts verlässt den Browser.",
    intro: [
      "Tippen oder fügen Sie beliebigen Text ein und erhalten seine Base64-Darstellung live bei jeder Eingabe. Die Kodierung ist UTF-8-sicher über den Standard-TextEncoder — mehrsprachiger Text, Emoji und Symbole erzeugen also exakt dieselben Bytes, die die base64-Funktionen jeder Programmiersprache erzeugen.",
      "Nutzen Sie es für HTTP-Basic-Auth-Header, Data-URI-Präfixe, E-Mail-Anhänge unterwegs oder jede API, die Base64-Payloads erwartet — ohne Terminal oder Codeschnipsel.",
    ],
    steps: [
      "Fügen Sie den zu kodierenden Text ein oder tippen Sie ihn.",
      "Die Base64-Ausgabe aktualisiert sich live — kopieren Sie, wann Sie bereit sind.",
      "Fügen Sie das Base64 mit dem verlinkten Decoder zurück ein, um den Rundlauf zu prüfen.",
    ],
    faqs: [
      {
        q: "Warum macht Base64 meinen Text länger?",
        a: "Base64 stellt jedes 3-Byte-Paket als 4 Zeichen dar, die Ausgabe ist also rund 33 % größer als die Eingabe — der Preis für binärsicheren Text.",
      },
      {
        q: "Ist Base64 Verschlüsselung?",
        a: "Nein. Base64 ist eine Kodierung, keine Verschlüsselung — jeder kann sie sofort dekodieren. Nutzen Sie sie nie, um Geheimnisse zu verbergen; nehmen Sie echte Kryptografie.",
      },
      {
        q: "Werden Unicode und Emoji unterstützt?",
        a: "Ja. Die Eingabe wird vor der Kodierung in UTF-8-Bytes umgewandelt — das Ergebnis entspricht genau dem, was btoa-mit-TextEncoder, Python, Java und Node für dieselbe Zeichenkette liefern.",
      },
    ],
  },
  "css-minifier": {
    name: "CSS-Minifier",
    tagline:
      "CSS online minifizieren: Kommentare und überflüssige Leerzeichen entfernen, Stylesheets verkleinern für schnellere Ladezeiten — sicher für Ihre Regeln.",
    intro: [
      "Fügen Sie ein beliebiges Stylesheet ein und erhalten in Echtzeit eine kompakte Einzeilenversion: Kommentare fallen, redundanter Leerraum schrumpft, Trenner werden enger — während Zeichenketten, url()-Werte und die Semantik Ihrer Selektoren und Eigenschaften exakt so bleiben, wie geschrieben.",
      "Nutzen Sie es, um kritisches CSS vorzubereiten, ein Theme vor dem Commit zu verschlanken oder zu prüfen, wie viele Bytes eine Säuberung wirklich spart. Die Live-Größenanzeige zeigt Eingabegröße, Ausgabegröße und die gesparte Prozentzahl.",
    ],
    steps: [
      "Fügen Sie Ihr CSS in das Eingabefeld ein.",
      "Die minifizierte Ausgabe erscheint sofort, darunter die gesparte Größe.",
      "Kopieren Sie das kompakte Stylesheet oder leeren Sie die Eingabe, um eine weitere Datei zu minifizieren.",
    ],
    faqs: [
      {
        q: "Verändert die Minifizierung das Verhalten meines CSS?",
        a: "Nein. Nur Kommentare und Leerraum werden entfernt — und selbst die sorgfältig: Zeichenketten und url()-Inhalte bleiben bytegenau erhalten, content-Werte und Data-URIs bleiben also intakt.",
      },
      {
        q: "Optimiert es Farben, verschmilzt es Regeln oder ergänzt es Präfixe?",
        a: "Nein — das ist ein sicherer Minifier auf Syntaxebene. Strukturelle Optimierung (doppelte Regeln verschmelzen, Farben verkürzen) braucht einen vollwertigen Postprozessor; dieses Tool garantiert null semantische Änderung.",
      },
      {
        q: "Wohin geht mein CSS?",
        a: "Nirgendwohin. Die Minifizierung läuft lokal in Ihrem Browser; nichts wird hochgeladen oder gespeichert.",
      },
    ],
  },
  "csv-to-json": {
    name: "CSV zu JSON",
    tagline:
      "CSV zu JSON konvertieren, mit automatischer Typinferenz — Zahlen, Booleans und Nullen werden erkannt, quoted Felder sauber behandelt. Kein Upload.",
    intro: [
      "Fügen Sie beliebige CSV mit Kopfzeile ein und erhalten in Echtzeit ein JSON-Array aus Objekten. Quoted Felder, maskierte Anführungszeichen und CRLF-Zeilenenden werden korrekt geparst, und jede Zelle bekommt sinnvolle Typen: true/false werden Booleans, reine Zahlen werden Zahlen, null wird null — alles andere bleibt Zeichenkette.",
      "Nutzen Sie es, um API-Anfragen zu füttern, Datenbanken zu befüllen oder einen Tabellen-Export in etwas zu verwandeln, das Ihr Code verarbeitet. Die JSON-Ausgabe ist mit 2-Leerzeichen-Einrückung hübsch gedruckt und kopierbereit.",
    ],
    steps: [
      "Fügen Sie Ihre CSV in das Eingabefeld ein (die erste Zeile muss die Kopfzeile sein).",
      "Wählen Sie Komma oder Semikolon als Trennzeichen.",
      "Kopieren Sie das hübsch gedruckte JSON-Array aus Objekten.",
    ],
    faqs: [
      {
        q: "Wie entscheidet die Typinferenz zwischen Zeichenkette und Zahl?",
        a: "Eine Zelle wird nur dann Zahl, wenn sie ein sauberes numerisches Literal ist (keine führenden Nullen, keine verrutschten Leerzeichen); true/false werden Booleans, das Literal null wird null — alles andere, IDs mit führenden Nullen, Postleitzahlen, Daten, bleibt Zeichenkette, um den exakten Wert zu bewahren.",
      },
      {
        q: "Was, wenn meine Kopfzeile doppelte oder leere Namen hat?",
        a: "Leere Kopfzellen erhalten automatisch Namen wie column1, column2… Doppelte Namen schrumpfen auf das letzte Vorkommen, denn JSON-Objekte können keine doppelten Schlüssel halten.",
      },
      {
        q: "Wird meine CSV auf einen Server hochgeladen?",
        a: "Nein. Die Konvertierung läuft lokal in Ihrem Browser — Ihre Daten verlassen Ihr Gerät nie.",
      },
    ],
  },
  "hash-generator": {
    name: "Hash-Generator",
    tagline:
      "SHA-256-, SHA-512- oder MD5-Hashes von Text oder Dateien direkt im Browser berechnen — schnelle Prüfsummen für Integritätschecks, ohne Upload.",
    intro: [
      "Haschen Sie beliebigen Text bei jeder Eingabe, oder werfen Sie eine Datei ab, um sie zu fingerprinten, ohne sie Byte für Byte zu lesen. SHA-2-Digests laufen auf der nativen WebCrypto-Engine des Browsers; MD5 nutzt eine geprüfte JavaScript-Implementierung — alles lokal, alles kostenlos.",
      "Typische Einsätze: einen Download gegen eine veröffentlichte Prüfsumme verifizieren, Dateien deduplizieren, Cache-Schlüssel erzeugen oder zwei Fassungen eines Dokuments vergleichen. Algorithmen per Klick wechseln und den Hex-Digest sofort kopieren.",
    ],
    steps: [
      "Wählen Sie den Algorithmus: SHA-256 als Standard, oder SHA-1/384/512/MD5.",
      "Tippen oder fügen Sie Text ein — oder wechseln Sie in den Dateimodus und werfen Sie eine Datei ab.",
      "Kopieren Sie den Hexadezimal-Digest und vergleichen Sie ihn mit der erwarteten Prüfsumme.",
    ],
    faqs: [
      {
        q: "Welchen Algorithmus soll ich nutzen?",
        a: "SHA-256 ist der vernünftige Standard für Integritätschecks und Fingerabdrücke. SHA-384/512 für längere Digests; SHA-1 und MD5 sind Legacy — für nicht-sicherheitsrelevante Prüfsummen in Ordnung, aber verlassen Sie sich nicht auf sie gegen Angreifer.",
      },
      {
        q: "Kann ein Hash rückgerechnet werden, um die Eingabe zu erhalten?",
        a: "Nein. Hashes sind Einweg: Digests fester Länge verwerfen Information by design. Eine Eingabe zu finden, die einen gegebenen Digest erzeugt, bedeutet, den gesamten Raum durchzuprobieren.",
      },
      {
        q: "Werden mein Text und meine Dateien hochgeladen?",
        a: "Niemals. Das Hashen läuft lokal in Ihrem Browser — selbst mehr-Gigabyte-Dateien liest nur Ihr eigenes Gerät.",
      },
    ],
  },
  "html-escape": {
    name: "HTML-Escape / Unescape",
    tagline:
      "HTML-Entities live escapen oder zurückwandeln: & < > und Anführungszeichen werden zu sicheren Referenzen, optionaler Numerik-Modus für Nicht-ASCII.",
    intro: [
      "Kodieren Sie die fünf Zeichen, die HTML zerbrechen — kaufmännisches Und, spitze Klammern und beide Anführungszeichen — in ihre benannten Entities, oder fügen Sie Entities zurück in lesbaren Text ein. Ein zweiter Schalter wandelt akzentuierte und nicht-lateinische Zeichen in numerische Referenzen wie &#233; — nützlich für Legacy-Systeme und E-Mail-Vorlagen.",
      "Beide Richtungen laufen live in einem Panel, und die Anzeige zeigt exakt, wie sich die Zeichenzahl verändert hat — ein kaputter Doppel-Escape ist also auf einen Blick sichtbar.",
    ],
    steps: [
      "Fügen Sie HTML oder escapten Text in das Eingabefeld ein.",
      "Wählen Sie Escape oder Unescape; beide laufen live bei jeder Eingabe.",
      "Aktivieren Sie numerische Entities, wenn Sie Nicht-ASCII-Ausgabe wie &#233; brauchen.",
      "Kopieren Sie das Ergebnis — die Zeichenzahl-Anzeige zeigt, wie stark es gewachsen oder geschrumpft ist.",
    ],
    faqs: [
      {
        q: "Warum wird das einfache Anführungszeichen als &#39; statt &apos; escaped?",
        a: "&apos; ist in XML und HTML5 gültig, war aber nie Teil von HTML 4 — manche älteren Parser und E-Mail-Clients haben damit Probleme. Das numerische &#39; ist überall sicher.",
      },
      {
        q: "Muss ich Nicht-ASCII-Zeichen escapen?",
        a: "In UTF-8-Dokumenten meist nein — Browser verarbeiten é direkt. Numerische Entities zählen für Legacy-Kodierungen, E-Mail-Pipelines oder Systeme, die Nicht-ASCII-Bytes verstümmeln.",
      },
      {
        q: "Welche benannten Entities erkennt das Unescaping?",
        a: "Rund 70 gängige — Markup (&amp;, &lt;, &gt;, &quot;, &apos;), Interpunktion (&mdash;, &hellip;, &ldquo;), lateinische Akzente und Symbole (&copy;, &euro;) — dazu jede dezimale und hexadezimale numerische Referenz.",
      },
    ],
  },
  "html-formatter": {
    name: "HTML-Formatter",
    tagline:
      "Einzeiliges HTML in sauberes, eingerücktes Markup verwandeln — ein schlichter, verlässlicher Beautifier für E-Mails und Vorlagen. 100 % clientseitig.",
    intro: [
      "Fügen Sie zusammengedrängtes HTML ein und erhalten sofort lesbares, konsistent eingerücktes Markup zurück. Void-Elemente wie img und br zerbrechen die Einrückung nie, gängige selbstschließende Tags wie li und p werden vernünftig behandelt, und die Inhalte von pre-, textarea-, script- und style-Blöcken bleiben unangetastet.",
      "Ein bewusst schlichter Formatter: kein Umsortieren, kein Umschreiben von Attributen, keine Überraschungen — nur Leerraum und Zeilenumbrüche, sodass die Struktur auf einen Blick klar ist.",
    ],
    steps: [
      "Fügen Sie Ihr HTML in das Eingabefeld ein.",
      "Das eingerückte Ergebnis erscheint live bei jeder Eingabe.",
      "Kopieren Sie das formatierte Markup oder leeren Sie die Eingabe, um ein weiteres Snippet zu formatieren.",
    ],
    faqs: [
      {
        q: "Verändert die Formatierung das Rendering meines HTML?",
        a: "Nein — die Formatierung fügt nur Leerraum und Zeilenumbrüche zwischen Tags ein. Die Inhalte von pre, textarea, script und style bleiben exakt erhalten, da Leerraum dort bedeutungstragend ist.",
      },
      {
        q: "Wie geht es mit ungeschlossenen Tags wie li oder p um?",
        a: "Es kennt die gängigen selbstschließenden Elemente: Ein neues li schließt das vorherige, und ein schließender Tag eines Vorfahren wirft alle offenen Kinder — Listen und Absätze rücken also so, wie Sie es erwarten.",
      },
      {
        q: "Wird das HTML an einen Server gesendet?",
        a: "Niemals. Der Formatter ist ein lokaler JavaScript-Tokenizer — Ihr Markup bleibt in Ihrem Browser.",
      },
    ],
  },
  "html-minifier": {
    name: "HTML-Minifier",
    tagline:
      "HTML im Browser minifizieren: Kommentare streifen, Leerraum stauchen — ein konservativer Säuberer, der Markup und Rendering intakt lässt.",
    intro: [
      "Fügen Sie HTML ein und erhalten in Echtzeit eine leichtere Version. Kommentare werden entfernt (IE-Conditional-Comments überleben), Leerraumläufe schrumpfen auf ein einzelnes Leerzeichen, und Leerraum zwischen Block-Tags fällt ganz weg — während Inline-Textabstände erhalten bleiben, damit Wörter nie verschmelzen.",
      "Das ist bewusst ein konservativer Minifier: Er benennt keine Klassen um, entfernt keine Anführungszeichen und baut nichts um. Sicher also für E-Mail-Vorlagen und Legacy-Markup, und die Live-Größenanzeige zeigt exakt, wie viele Bytes Sie gespart haben.",
    ],
    steps: [
      "Fügen Sie Ihr HTML in das Eingabefeld ein.",
      "Die minifizierte Ausgabe erscheint sofort, mit Ein-/Ausgabegröße und gesparter Prozentzahl.",
      "Kopieren Sie das kompakte HTML oder leeren Sie die Eingabe, um eine weitere Seite zu minifizieren.",
    ],
    faqs: [
      {
        q: "Kann Minifizierung mein HTML zerbrechen?",
        a: "Dieses Tool nimmt den sicheren Weg: Leerraum innerhalb von pre, textarea, script und style bleibt unangetastet, nur aus Leerraum bestehende Lücken zwischen Inline-Elementen werden zu einem Leerzeichen, und nur Lücken zwischen Block-Tags fallen weg. Kommentare fallen — außer IE-Conditional-Comments.",
      },
      {
        q: "Warum ist die gesparte Prozentzahl niedriger als bei anderen Minifiern?",
        a: "Weil es bewusst konservativ ist — es verschmilzt nie Text mit Tags und entfernt nie Anführungszeichen. Was es entfernt (Kommentare, Einrückung, Block-Leerraum), ist immer render-sicher.",
      },
      {
        q: "Wird irgendetwas hochgeladen?",
        a: "Nein. Alles läuft lokal in Ihrem Browser; die Seite und ihr Markup verlassen Ihr Gerät nie.",
      },
    ],
  },
  "http-status-codes": {
    name: "HTTP-Statuscodes",
    tagline:
      "Ein durchsuchbares Nachschlagewerk von 56 HTTP-Statuscodes, jeder in einem klaren Satz erklärt — Zeile anklicken, um die Zahl zu kopieren.",
    intro: [
      "Jeder wichtige Statuscode von 100 Continue bis 511 Network Authentication Required, gruppiert nach Klasse und in einem klaren Satz erklärt: was auf der Leitung wirklich passierte und was als Nächstes zu tun ist. Die Klassiker (200, 301, 404, 500) stehen neben denen, die überraschen (207, 418, 451).",
      "Die Suche filtert live nach Zahl oder Name — tippen Sie 30 und landen Sie bei jeder Umleitung, oder „teapot“, um eine Diskussion zu beenden. Ein Klick auf eine Zeile kopiert nur die Zahl, bereit für Code, Doku oder einen Bug-Report.",
    ],
    steps: [
      "Tippen Sie eine Zahl oder einen Namen in das Suchfeld, oder stöbern Sie nach Klassen.",
      "Lesen Sie die Ein-Zeilen-Bedeutung — kein RFC-Prosa, nur der praktische Sinn.",
      "Klicken Sie eine Zeile an, um die Codenummer sofort zu kopieren.",
    ],
    faqs: [
      {
        q: "Worin unterscheiden sich 301, 302 und 307?",
        a: "Alle drei leiten um, aber 301 ist dauerhaft (Suchmaschinen übertragen Rankings), während 302/307 temporär sind. 307 garantiert zusätzlich, dass Methode und Body unverändert bleiben — nutzen Sie es, wenn ein POST die Umleitung überleben muss.",
      },
      {
        q: "Ist 418 I'm a teapot ein echter Statuscode?",
        a: "Er begann als Aprilscherz in RFC 2324 und wurde später als reserviert gelistet. Manche echte APIs geben ihn zum Spaß oder für Rate-Limiting zurück, und Browser behandeln ihn wie jeden 4xx-Fehler.",
      },
      {
        q: "Warum sagen 401 und 403 beide, dass ich nicht reindarf?",
        a: "401 bedeutet „Wer sind Sie?“ — Zugangsdaten fehlen oder sind falsch. 403 bedeutet „Ich weiß, wer Sie sind, und Sie dürfen trotzdem nicht“ — die Authentifizierung gelang, aber die Ressource bleibt gesperrt.",
      },
    ],
  },
  "javascript-minifier": {
    name: "JavaScript-Minifier",
    tagline:
      "Ein konservativer JavaScript-Minifier: Kommentare streifen, Leerzeilen stauchen, Umbrüche bleiben — die Semantik Ihres Codes bleibt unangetastet.",
    intro: [
      "Dieser Minifier tut genau zwei Dinge: Er entfernt //- und /* */-Kommentare (sogar in haarigen Dateien — Zeichenketten, Template-Literale inklusive verschachtelter ${…} und Regex-Literale werden respektiert), und er staucht Leerzeilen und Einrückung. Zeilenumbrüche zwischen Anweisungen bleiben erhalten, automatische Semikolon-Einfügung funktioniert also exakt wie zuvor.",
      "Er benennt nie Variablen um, inlined nie Code und verschmilzt nie Anweisungen — das ist die Aufgabe echter Build-Tools. Sie erhalten eine messbar kleinere, sicher minifizierte Datei plus eine Live-Byte-Ersparnis-Anzeige, vollständig in Ihrem Browser.",
    ],
    steps: [
      "Fügen Sie Ihr JavaScript in das Eingabefeld ein.",
      "Die minifizierte Ausgabe erscheint sofort, mit Ein-/Ausgabegröße und gesparter Prozentzahl.",
      "Kopieren Sie das kompakte Skript oder leeren Sie die Eingabe, um eine weitere Datei zu minifizieren.",
    ],
    faqs: [
      {
        q: "Warum behält es Zeilenumbrüche, statt alles in eine Zeile zu hängen?",
        a: "Bewusste Entscheidung. JavaScript verlässt sich auf automatische Semikolon-Einfügung, und das Entfernen von Newlines kann stillschweigend ändern, was ein Programm tut. Mit erhaltenen Zeilenumbrüchen bleibt dieser Minifier sicher für Code, der nie durch einen echten Bundler geht.",
      },
      {
        q: "Worin unterscheidet es sich von Terser oder UglifyJS?",
        a: "Diese parsen und bauen den AST um: Namen verschleifen, toten Code entfernen, inlinen. Deutlich kleinere Ausgabe, aber ein echter Build-Schritt. Dieses Tool entfernt nur Kommentare und Leerzeilen — null Risiko für Verhaltensänderungen, kein Build nötig.",
      },
      {
        q: "Wird mein Code irgendwo hochgeladen?",
        a: "Nein. Alles läuft lokal in Ihrem Browser — Ihre Quelle verlässt das Gerät nie.",
      },
    ],
  },
  "json-formatter": {
    name: "JSON-Formatter",
    tagline:
      "Unordentliches JSON online formatieren — 2 Leerzeichen, 4 Leerzeichen oder Tabs, mit sofortiger Validierung und präzisen Fehlerorten. 100 % im Browser.",
    intro: [
      "Fügen Sie minifiziertes oder schlecht eingerücktes JSON ein und erhalten sofort saubere, lesbare Ausgabe. Wählen Sie 2 Leerzeichen, 4 Leerzeichen oder Tab-Einrückung, und das Ergebnis aktualisiert sich live bei jeder Eingabe — ideal, um API-Antworten, Konfigurationsdateien und Log-Payloads zu inspizieren.",
      "Ungültiges JSON ist kein Sackgasse: Der Formatter ortet die exakte Zeile und Spalte des Syntaxfehlers, ein fehlendes Komma oder eine fehlende Klammer ist also in Sekunden gefunden statt in Minuten.",
    ],
    steps: [
      "Fügen Sie Ihr JSON in das Eingabefeld ein.",
      "Wählen Sie eine Einrückung: 2 Leerzeichen, 4 Leerzeichen oder ein Tab.",
      "Kopieren Sie das verschönerte Ergebnis — oder beheben Sie die gemeldete Zeile und Spalte, falls das JSON ungültig ist.",
    ],
    faqs: [
      {
        q: "Gibt es ein Größenlimit für das JSON, das ich formatieren kann?",
        a: "Kein hartes Limit — die Formatierung geschieht lokal in Ihrem Browser. Sehr große Dateien (Dutzende MB) können träge wirken, weil das Ergebnis bei jeder Eingabe neu rechnet; fügen Sie sie also auf einen Schlag ein und editieren Sie sorgfältig.",
      },
      {
        q: "Verändert die Formatierung meine Daten?",
        a: "Nein. Werte, Schlüsselreihenfolge und Struktur bleiben exakt gleich; nur Leerraum und Zeilenumbrüche kommen hinzu. Die Ausgabe ist byteäquivalentes JSON.",
      },
      {
        q: "Wird mein JSON auf einen Server hochgeladen?",
        a: "Nein. Alles läuft lokal in Ihrem Browser mit JavaScript — Ihre Daten verlassen Ihr Gerät nie.",
      },
    ],
  },
  "json-minifier": {
    name: "JSON-Minifier",
    tagline:
      "JSON online minifizieren: allen Leerraum streifen für schnellere API-Antworten und weniger Speicher — exakte Bytes gespart, privat im Browser.",
    intro: [
      "Fügen Sie hübsch gedrucktes JSON ein und erhalten in Echtzeit das kompakteste gültige Äquivalent: jedes Leerzeichen, jeder Umbruch und jede Einrückung fällt, ohne Ihre Daten anzutasten. Eine Live-Größenanzeige zeigt Originalgröße, minifizierte Größe und die gesparte Prozentzahl.",
      "Nutzen Sie es, um API-Antworten, Fixture-Dateien, Übersetzungen und JSON-Konfiguration vor dem Ausliefern oder Speichern zu verschlanken. Ist die Eingabe kein gültiges JSON, nennt das Tool die exakte Zeile und Spalte des Problems, statt still zu scheitern.",
    ],
    steps: [
      "Fügen Sie Ihr formatiertes JSON in das Eingabefeld ein.",
      "Die minifizierte Einzeilenausgabe erscheint sofort, darunter die gesparte Größe.",
      "Kopieren Sie das kompakte Ergebnis oder leeren Sie die Eingabe, um neu zu beginnen.",
    ],
    faqs: [
      {
        q: "Verändert das Minifizieren von JSON die Daten?",
        a: "Nein. Leerraum außerhalb von Zeichenketten ist in JSON bedeutungslos, sein Entfernen erzeugt also ein äquivalentes Dokument mit identischen Werten beim Parsen.",
      },
      {
        q: "Wie viel kleiner wird mein JSON?",
        a: "Es hängt von der entfernten Einrückung ab — stark eingerückte Dateien schrumpfen oft um 30–60 %. Das Tool zeigt die exakte Prozentzahl für Ihre Eingabe.",
      },
      {
        q: "Werden meine Daten irgendwohin gesendet?",
        a: "Nein. Die Minifizierung läuft vollständig in Ihrem Browser — nichts wird hochgeladen, protokolliert oder gespeichert.",
      },
    ],
  },
  "json-to-csv": {
    name: "JSON zu CSV",
    tagline:
      "JSON-Arrays aus Objekten zu CSV konvertieren, mit korrekter Quotierung — tabellenfertig für Excel, Sheets oder Datenbankimport. Vollständig im Browser.",
    intro: [
      "Fügen Sie ein JSON-Array aus Objekten ein und erhalten sofort CSV zurück. Die Spalten sind die Vereinigung aller Schlüssel über alle Zeilen, Werte werden vorschriftsgemäß maskiert — Anführungszeichen verdoppelt, Felder umschlossen, wenn sie Kommas, Anführungszeichen oder Umbrüche enthalten —, sodass das Ergebnis in Excel, Sheets oder jedem Importer sauber aufgeht.",
      "Verschachtelte Objekte und Arrays werden als JSON-Zeichenketten in ihrer Zelle serialisiert, Booleans und Zahlen laufen unverändert durch, Nullen werden zu leeren Zellen. Wählen Sie Komma oder Semikolon als Trennzeichen, wenn Ihre Sprachumgebung es erwartet.",
    ],
    steps: [
      "Fügen Sie ein JSON-Array aus Objekten in das Eingabefeld ein.",
      "Das CSV erscheint live — wählen Sie Komma oder Semikolon, falls Ihre Tabellenkalkulation es braucht.",
      "Kopieren Sie das Ergebnis direkt in eine .csv-Datei oder einen Import-Assistenten.",
    ],
    faqs: [
      {
        q: "Was, wenn meine Zeilen unterschiedliche Schlüssel haben?",
        a: "Das Tool baut die Spaltenliste aus jedem Schlüssel, den es über alle Zeilen sieht; Zeilen, denen eine Spalte fehlt, bekommen schlicht eine leere Zelle. Meist genau das, was man für chaotische echte Daten will.",
      },
      {
        q: "Wie werden verschachtelte Objekte und Arrays behandelt?",
        a: "Sie werden als JSON-Zeichenkette in der Zelle serialisiert (und wie jeder andere Wert quotiert und maskiert). Glätten Sie Ihre Daten vorher, wenn Sie eine Spalte pro verschachteltem Feld brauchen.",
      },
      {
        q: "Werden meine Daten irgendwo hochgeladen?",
        a: "Nein. Die Konvertierung geschieht lokal in Ihrem Browser — nichts verlässt Ihr Gerät.",
      },
    ],
  },
  "json-validator": {
    name: "JSON-Validator",
    tagline:
      "JSON sofort validieren, mit präziser Fehlerzeile und -spalte — fehlende Kommas, unquotierte Schlüssel und schlechte Masken abfangen, bevor sie brechen.",
    intro: [
      "Fügen Sie ein beliebiges JSON-Dokument ein und sehen Sie auf einen Blick, ob es gültig ist. Der Validator ist streng: Er folgt dem JSON-Standard, übliche Fehler wie einfache Anführungszeichen, schließende Kommas, unquotierte Schlüssel und Kommentare werden also alle gemeldet.",
      "Ist etwas falsch, erhalten Sie die exakte Zeile und Spalte plus einen menschenlesbaren Grund — keine kryptische Einzeiler-Meldung. Gültige Eingabe wird mit einer hübsch gedruckten Fassung belohnt, die Sie sofort kopieren können.",
    ],
    steps: [
      "Fügen Sie Ihr JSON in das Eingabefeld ein.",
      "Ein grüner Status erscheint, wenn das JSON gültig ist; sonst werden exakte Zeile, Spalte und Grund gezeigt.",
      "Beheben Sie die gemeldete Position, oder kopieren Sie die hübsch gedruckte Ausgabe, wenn die Validierung läuft.",
    ],
    faqs: [
      {
        q: "Welche Fehler findet der Validator?",
        a: "Alle Standard-JSON-Syntaxfehler: fehlende oder überzählige Kommas, unquotierte oder einfach quotierte Schlüssel, schließende Kommas, unmaskierte Steuerzeichen, ungültige Masken und Inhalt nach dem Wert — jeweils mit Zeile und Spalte gemeldet.",
      },
      {
        q: "Prüft es auch das Schema oder nur die Syntax?",
        a: "Nur die Syntax. Es prüft, ob das Dokument gültiges JSON ist, nicht ob Felder erwartete Typen oder Werte haben — dafür brauchen Sie einen Schema-Validator wie JSON Schema.",
      },
      {
        q: "Wird mein JSON irgendwo hochgeladen?",
        a: "Nein. Die Validierung geschieht lokal in Ihrem Browser; nichts verlässt Ihr Gerät.",
      },
    ],
  },
  "jwt-decoder": {
    name: "JWT-Decoder",
    tagline:
      "JWT-Tokens online dekodieren: Header und Payload inspizieren, mit menschenlesbaren exp- und iat-Zeitstempeln. Nur Dekodierung — nichts verifiziert.",
    intro: [
      "Fügen Sie ein JSON Web Token ein und sehen Sie sofort seine drei Teile getrennt: den Header (Algorithmus und Tokentyp), die Payload (die eigentlichen Claims) und die Signatur. Beide JSON-Abschnitte sind hübsch gedruckt, und Zeitstempel wie iat, nbf und exp werden in plain Daten Ihrer Sprachumgebung übersetzt — exp ist als abgelaufen oder aktiv markiert.",
      "Alles wird lokal mit Base64URL dekodiert — das Token wird nirgendwohin gesendet und nie verifiziert. Denken Sie daran: Dekodieren zeigt, was ein Token sagt, nicht, was es tun darf. Die Signaturprüfung verlangt immer das Secret oder den öffentlichen Schlüssel auf einem vertrauenswürdigen System.",
    ],
    steps: [
      "Fügen Sie das JWT (die drei punktgetrennten Teile) in das Eingabefeld ein.",
      "Lesen Sie den hübsch gedruckten Header und die Payload, mit exp/iat als echten Daten.",
      "Korrigieren Sie Ihr Token oder dessen serverseitige Prüfung entsprechend — kopieren Sie bei Bedarf die Payload.",
    ],
    faqs: [
      {
        q: "Verifiziert das Dekodieren eines JWT es?",
        a: "Nein. Dekodieren ist nur Base64URL plus JSON-Parsing, und jeder kann es — auch ein Angreifer. Ein plausibel aussehendes, dekodiertes Token beweist nichts. Verifikation verlangt die Prüfung der Signatur mit dem Secret (HMAC) oder dem öffentlichen Schlüssel (RSA/EC) — und damit das Schlüsselmaterial des Token-Ausstellers.",
      },
      {
        q: "Kann man die Claims eines Tokens wiederherstellen oder ändern?",
        a: "Lesen können Sie die Claims, aber ein neues Token mit geänderten Claims erzeugen Sie nicht, ohne die Signatur ungültig zu machen — jede Änderung an Header oder Payload bricht die Signaturprüfung auf dem Server.",
      },
      {
        q: "Ist es sicher, ein echtes Token hier einzufügen?",
        a: "Das Token wird vollständig in Ihrem Browser dekodiert und verlässt Ihr Gerät nie — es gibt keinen Upload. Dennoch: Behandeln Sie Tokens als Zugangsdaten und fügen Sie Produktions-Tokens nirgends ein, wo Sie sie nicht brauchen.",
      },
    ],
  },
  "markdown-previewer": {
    name: "Markdown-Vorschau",
    tagline:
      "Markdown beim Tippen als sauberes HTML vorschauen — Überschriften, Listen, Tabellen, Code und Links live gerendert. Ideal für READMEs und Dokus.",
    intro: [
      "Schreiben Sie Markdown links und sehen Sie die gerenderte Seite rechts in Echtzeit: Überschriften, Betonungen, Listen, Tabellen, Zitatblöcke, Aufgabenlisten und umzäunte Codeblöcke — alles gerendert von der weit verbreiteten marked-Engine.",
      "Das erzeugte HTML wird vor der Anzeige mit einer strengen Tag- und Attribut-Allowlist bereinigt — Skripte, Event-Handler und javascript:-URLs fallen —, und Sie können das saubere HTML kopieren, um es in einen Blog, ein CMS oder eine E-Mail-Vorlage einzufügen.",
    ],
    steps: [
      "Tippen oder fügen Sie Markdown in das linke Feld ein.",
      "Sehen Sie zu, wie die bereinigte Vorschau rechts beim Schreiben aktualisiert wird.",
      "Kopieren Sie das erzeugte HTML, wenn es passt, oder leeren Sie, um neu zu beginnen.",
    ],
    faqs: [
      {
        q: "Ist das HTML in der Vorschau sicher?",
        a: "Ja. Bevor irgendetwas rendert, läuft das HTML durch einen Whitelist-Sanitizer, der Skript-Tags, Inline-Event-Handler und javascript:-Links entfernt — nur Standard-Formatierungs-Tags und sichere Bild-/Link-URLs bleiben.",
      },
      {
        q: "Welche Markdown-Funktionen werden unterstützt?",
        a: "Alles, was marked standardmäßig beherrscht: GitHub-Tabellen, Durchstreichung, Aufgabenlisten, Autolinks, umzäunter Code mit Syntaxlabel und verschachtelte Listen.",
      },
      {
        q: "Wo wird mein Text verarbeitet?",
        a: "Vollständig in Ihrem Browser — das Markdown verlässt Ihr Gerät nie, selbst nicht beim Kopieren des erzeugten HTML.",
      },
    ],
  },
  "md5-generator": {
    name: "MD5-Generator",
    tagline:
      "MD5-Hashes von Text oder Dateien sofort im Browser erzeugen — für Prüfsummen, Dedup-Schlüssel und Legacy-Integrationen. Einweg, nie hochgeladen.",
    intro: [
      "Tippen Sie Text und sehen Sie seinen 128-Bit-MD5-Digest live, oder werfen Sie eine Datei ab, um sie zu fingerprinten, ohne ein einziges Byte hochzuladen. Das Hashen geschieht lokal mit einer ausgereiften JavaScript-Implementierung des MD5-Algorithmus.",
      "MD5 ist überall: Download-Prüfsummen, Datei-Dedup-Schlüssel, Cache-Buster, Legacy-System-Integrationen. Nur nicht vergessen, wofür es nicht taugt — MD5 ist kryptografisch gebrochen, also nie für Passwörter, Signaturen oder alles nutzen, was ein Angreifer manipulieren könnte.",
    ],
    steps: [
      "Tippen oder fügen Sie den Text ein — der MD5-Digest aktualisiert sich live.",
      "Oder wechseln Sie in den Dateimodus und werfen Sie eine Datei ab, um sie lokal zu hashen.",
      "Kopieren Sie den Hexadezimal-Digest und vergleichen Sie ihn mit der erwarteten Prüfsumme.",
    ],
    faqs: [
      {
        q: "Ist MD5 sicher zum Speichern von Passwörtern?",
        a: "Nein — nicht einmal annähernd. MD5 ist per Design schnell, Kollisionsangriffe sind praktikabel, das Knacken von MD5-Passwort-Hashes ist also trivial. Nutzen Sie stattdessen ein dediziertes Passwort-Hashing wie bcrypt, scrypt oder Argon2.",
      },
      {
        q: "Wofür ist MD5 noch gut?",
        a: "Für nicht-feindselige Integrität: prüfen, ob eine Datei einen Transfer überlebt hat, Inhalte deduplizieren, Cache-Schlüssel und Legacy-Systeme bedienen, die es erwarten. Für sicherheitsrelevante Prüfungen nutzen Sie SHA-256 oder besser.",
      },
      {
        q: "Werden mein Text und meine Dateien an einen Server gesendet?",
        a: "Nein. Alles läuft in Ihrem Browser; selbst Dateien werden vollständig auf Ihrem Gerät gelesen und gehasht.",
      },
    ],
  },
  "regex-tester": {
    name: "Regex-Tester",
    tagline:
      "Reguläre Ausdrücke live testen: Treffer beim Tippen hervorheben, Erfassungsgruppen inspizieren und Muster debuggen — gängige Flags per Klick.",
    intro: [
      "Tippen Sie ein Muster, schalten Sie die Flags, die Sie brauchen (global, Groß-/Kleinschreibung ignorieren, mehrzeilig, dotAll, Unicode), und fügen Sie Ihre Testzeichenkette ein — jeder Treffer wird an Ort und Stelle hervorgehoben, während eine Liste darunter jeden Treffer mit Index und Erfassungsgruppen zeigt, benannte Gruppen inklusive.",
      "Ungültige Muster werden sofort mit der eigenen Meldung des Parsers gemeldet, statt die Seite zu zerbrechen, und Treffer der Länge null werden sicher behandelt — Muster wie a* verhalten sich also so, wie es Ihre Runtime täte.",
    ],
    steps: [
      "Geben Sie Ihren regulären Ausdruck in das Musterfeld ein.",
      "Schalten Sie Flags (g, i, m, s, u) um und fügen Sie Ihre Testzeichenkette ein.",
      "Lesen Sie die hervorgehobenen Treffer und die Gruppenliste; justieren Sie das Muster, bis es exakt erfasst, was Sie brauchen.",
    ],
    faqs: [
      {
        q: "Welche Regex-Variante nutzt dieses Tool?",
        a: "JavaScript (ECMAScript) RegExp — dieselbe Engine, die in Ihrem Browser und Node läuft. Muster für PCRE, Python oder Java sind meist kompatibel, aber Lookahead/Lookbehind und Unicode-Behandlung können leicht abweichen.",
      },
      {
        q: "Warum matcht mein Muster seltsame leere Positionen?",
        a: "Muster, die auf die leere Zeichenkette passen können (wie a* oder (?:)?), erzeugen Treffer der Länge null. Der Tester rückt nach jedem ein Zeichen vor — genau wie JavaScripts eigene Iteration.",
      },
      {
        q: "Werden meine Testdaten irgendwohin gesendet?",
        a: "Nein. Der Abgleich läuft live in Ihrem Browser — nichts wird hochgeladen oder gespeichert.",
      },
    ],
  },
  "sha256-generator": {
    name: "SHA-256-Generator",
    tagline:
      "SHA-256-Hashes von Text oder Dateien online berechnen, mit nativem WebCrypto — die Standardwahl für Integritätschecks und Fingerabdrücke. 100 % clientseitig.",
    intro: [
      "Tippen Sie Text und sehen Sie, wie sein 256-Bit-SHA-256-Digest live erscheint, oder werfen Sie eine Datei ab, um Gigabytes zu fingerprinten, ohne etwas hochzuladen. Der Hash wird von der WebCrypto-Implementierung des Browsers berechnet — demselben Code, dem Ihr Betriebssystem und Ihre TLS-Stack vertrauen.",
      "SHA-256 ist heute der Standard für das Verifizieren von Downloads, das Signieren von Artefakten, das Deduplizieren von Inhalten, content-addressed Storage und Blockchain-Arbeit. Hex-Digest mit einem Klick kopieren und mit der Prüfsumme des Herausgebers vergleichen.",
    ],
    steps: [
      "Tippen oder fügen Sie den Text ein — der Digest aktualisiert sich bei jeder Eingabe.",
      "Oder wechseln Sie in den Dateimodus und werfen Sie eine Datei ab, um sie lokal zu hashen.",
      "Kopieren Sie den Hexadezimal-Digest und vergleichen Sie ihn mit dem erwarteten Wert.",
    ],
    faqs: [
      {
        q: "Ist SHA-256 sicher?",
        a: "Ja — SHA-256 gehört zur SHA-2-Familie und ist nach zwei Jahrzehnten Analyse ungebrochen. Es ist der Digest hinter TLS-Zertifikaten, Bitcoin und der meisten Software-Release-Verifikation.",
      },
      {
        q: "Warum liefert dieselbe Eingabe immer denselben Hash?",
        a: "Weil SHA-256 deterministisch ist: identische Bytes erzeugen immer einen identischen Digest. Genau diese Eigenschaft macht den Prüfsummenvergleich möglich — ein einziges geändertes Byte ändert den ganzen Digest.",
      },
      {
        q: "Werden mein Text und meine Dateien hochgeladen?",
        a: "Nein. Das Hashen läuft lokal in Ihrem Browser mit WebCrypto — Ihre Daten verlassen das Gerät nie.",
      },
    ],
  },
  "sql-formatter": {
    name: "SQL-Formatter",
    tagline:
      "SQL online formatieren, mit einheitlicher Schlüsselwort-Schreibweise und Einrückung — lange SELECTs und JOINs in lesbaren Code, direkt im Browser.",
    intro: [
      "Fügen Sie eine dichte Einzeiler-Abfrage ein und erhalten sofort sauber strukturiertes SQL zurück: Klauseln brechen auf eigene Zeilen, verschachtelte Ausdrücke rücken konsistent ein, Schlüsselwörter werden zur besseren Lesbarkeit großgeschrieben. Angetrieben von der sql-formatter-Engine — dieselben Regeln, auf die sich echte Teams verlassen.",
      "Perfekt, um generierte Abfragen zu reviewen, ORM-Ausgaben zu debuggen, Stored Procedures zu dokumentieren oder eine 40-zeilige WHERE-Klausel zu entwirren, die jemand in einem Kommentar hinterlassen hat.",
    ],
    steps: [
      "Fügen Sie Ihr SQL in das Eingabefeld ein.",
      "Die formatierte Abfrage erscheint bei jeder Eingabe, mit großgeschriebenen Schlüsselwörtern und ausgerichteten Klauseln.",
      "Kopieren Sie das lesbare SQL oder leeren Sie die Eingabe, um eine weitere Abfrage zu formatieren.",
    ],
    faqs: [
      {
        q: "Welche SQL-Dialekte werden unterstützt?",
        a: "Die Formatierung funktioniert über Standard-SQL hinweg, und die zugrunde liegende Engine versteht auch dialektspezifische Syntax von PostgreSQL, MySQL, T-SQL, PL/SQL, BigQuery, Snowflake und mehr — gängige Strukturen formatieren überall korrekt.",
      },
      {
        q: "Verändert die Formatierung, was meine Abfrage tut?",
        a: "Nein. Nur Leerraum und die Schreibweise der Schlüsselwörter ändern sich. Zeichenkettenliterale und quotierte Bezeichner bleiben exakt erhalten — die Abfrage ist also semantisch identisch.",
      },
      {
        q: "Wird meine Abfrage an einen Server gesendet?",
        a: "Nein. Die Formatierung läuft lokal in Ihrem Browser — Ihr SQL verlässt Ihr Gerät nie.",
      },
    ],
  },
  "url-decoder": {
    name: "URL-Decoder",
    tagline:
      "Prozentkodierte URLs in lesbaren Text dekodieren — %20, %2F und Query-Werte werden sofort klar. Behandelt + als Leerzeichen, im Browser.",
    intro: [
      "Fügen Sie eine kodierte URL, einen Parameter oder ein Pfadsegment ein und lesen Sie den Originaltext sofort. Zwei Modi treffen die zwei Encoder: Komponentendekodierung (decodeURIComponent) für einen einzelnen Wert, und vollständige URI-Dekodierung (decodeURI) für eine komplette URL.",
      "Ein praktischer zusätzlicher Schalter behandelt + als Leerzeichen — genau das meinen formenkodierte Query-Strings (application/x-www-form-urlencoded) —, sodass Suchparameter wie hello+world zu hello world dekodieren statt literal zu bleiben.",
    ],
    steps: [
      "Fügen Sie die prozentkodierte Zeichenkette oder URL ein.",
      "Wählen Sie Komponentendekodierung für Werte oder vollständige URI-Dekodierung für komplette URLs.",
      "Aktivieren Sie + als Leerzeichen für formenartige Query-Strings und kopieren Sie dann den dekodierten Text.",
    ],
    faqs: [
      {
        q: "Warum bekomme ich beim Dekodieren manchmal einen Fehler?",
        a: "Ein einzelnes % ohne zwei Hexziffern dahinter oder eine abgeschnittene Maskensequenz wie %E4%BD ist ungültige Prozentkodierung — der Decoder meldet das, statt zu raten.",
      },
      {
        q: "Soll ich die Option + als Leerzeichen einschalten?",
        a: "Für Werte aus einer HTML-Formularübermittlung oder den Query-Strings vieler Webframeworks: ja. Für standardmäßig prozentkodierte URLs mit echten +-Zeichen: aus lassen.",
      },
      {
        q: "Wird irgendetwas hochgeladen?",
        a: "Nein. Die Dekodierung läuft lokal in Ihrem Browser — nichts verlässt Ihr Gerät.",
      },
    ],
  },
  "url-encoder": {
    name: "URL-Encoder",
    tagline:
      "URLs und Query-Strings online prozentkodieren — Komponenten- oder vollständige URI-Kodierung wählen, mit Live-Ausgabe für Links, Parameter und Pfadsegmente.",
    intro: [
      "Fügen Sie beliebigen Text oder eine URL ein und sehen Sie das prozentkodierte Ergebnis live. Zwei Modi decken die zwei realen Fälle ab: Komponentenkodierung (encodeURIComponent) maskiert jedes reservierte Zeichen für einen einzelnen Parameterwert, während die vollständige URI-Kodierung (encodeURI) die URL-Struktur — :, /, ? und & — intakt lässt.",
      "Unverzichtbar, wenn Sie Query-Strings von Hand bauen, URLs in andere URLs einbetten, mailto-Links erzeugen oder Werte mit Leerzeichen, kaufmännischen Unds und nicht-lateinischen Zeichen durch GET-Parameter schicken.",
    ],
    steps: [
      "Fügen Sie den Text, den Parameterwert oder die URL zum Kodieren ein.",
      "Wählen Sie Komponentenkodierung für einen Wert oder vollständige URI, um die URL-Struktur zu halten.",
      "Kopieren Sie das kodierte Ergebnis direkt in Ihren Link oder Ihre Anfrage.",
    ],
    faqs: [
      {
        q: "Wann nutze ich encodeURIComponent statt encodeURI?",
        a: "encodeURIComponent für einzelne Werte, die Sie in eine URL einsetzen — es maskiert &, =, ?, / und mehr, sodass ein Wert den Query-String nie zerbrechen kann. encodeURI nur für eine komplette URL, die transportsicher werden soll, mit erhaltener Struktur.",
      },
      {
        q: "Warum werden Leerzeichen zu %20 und nicht zu +?",
        a: "%20 ist die Standard-Prozentkodierung eines Leerzeichens; die +-Abkürzung ist eine Formen-Kodierungskonvention, die application/x-www-form-urlencoded gesondert behandelt. Dieses Tool nutzt das standardmäßige %20.",
      },
      {
        q: "Beherrscht es nicht-lateinische Zeichen?",
        a: "Ja — Zeichen außerhalb von ASCII werden zuerst UTF-8-kodiert und dann prozentkodiert, exakt wie Browser es tun.",
      },
    ],
  },
  "url-parser": {
    name: "URL-Parser",
    tagline:
      "Beliebige URL einfügen und live zerlegt sehen: Protokoll, Host, Port, jedes Pfadsegment, dekodierte Query-Parameter und Hash — mit Kopieren als JSON.",
    intro: [
      "Eine URL versteckt ein Dutzend Datenstücke in einer Zeile. Dieses Tool zerlegt sie in beschriftete Zeilen — Schema, Host, Port, jedes Pfadsegment auf eigener Zeile, jeder Query-Parameter mit Schlüssel und dekodiertem Wert, dazu das Fragment —, sodass Sie Tracking-Links prüfen, Routing debuggen oder einen API-Aufruf nachbauen können.",
      "Das Parsen nutzt die native URL-API des Browsers: Werte werden exakt so dekodiert, wie der empfangende Server sie dekodieren wird. URLs ohne Schema bekommen https:// angenommen, und fehlerhafte Eingabe bekommt einen klaren Fehler statt eines Absturzes.",
    ],
    steps: [
      "Fügen Sie die URL in das Eingabefeld ein.",
      "Lesen Sie die zerlegte Tabelle: Teile, Segmente und Parameter aktualisieren sich live.",
      "Kopieren Sie als JSON, wenn Sie die Zerlegung in Code oder Dokumentation brauchen.",
    ],
    faqs: [
      {
        q: "Was passiert, wenn ich eine URL ohne https:// einfüge?",
        a: "Das Tool nimmt https:// an und versucht es erneut — so tun es Browser auch für nackte Domains. Ein explizit getipptes Schema bleibt immer unverändert.",
      },
      {
        q: "Werden Query-Werte dekodiert?",
        a: "Ja. Schlüssel und Werte werden über den URL-Standard dekodiert, %20 wird also zum Leerzeichen und %2F zum Schrägstrich — genau so, wie der Server sie lesen würde.",
      },
      {
        q: "Was ist mit doppelten Query-Schlüsseln wie ?tag=a&tag=b?",
        a: "Jedes Vorkommen bekommt seine eigene Zeile, und der JSON-Export listet sie als getrennte Schlüssel-Wert-Paare — nichts wird stillschweigend überschrieben.",
      },
    ],
  },
  "uuid-generator": {
    name: "UUID-Generator",
    tagline:
      "Zufällige UUID-v4-Kennungen in Mengen erzeugen — 1 bis 500 auf einmal, mit der kryptografischen Zufallsquelle Ihres Browsers. Kostenlos, sofort, offline-fähig.",
    intro: [
      "Erzeugen Sie RFC-4122-UUIDs der Version 4 in jeder Menge, die Sie brauchen: Test-Fixtures, Datenbank-Seedings, Dateinamen, Request-IDs oder API-Key-Entwürfe. Jede Kennung stammt von crypto.randomUUID, der kryptografisch sicheren Zufallsquelle des Browsers — 122 Zufallsbits, Kollisionswahrscheinlichkeiten, die Sie in der Praxis nie treffen.",
      "Anders als zeitbasierte Versionen (v1/v6/v7) trägt v4 keinen Zeitstempel und verrät nichts darüber, wann oder wo es entstand — die Seite sagt Ihnen genau das, plus wann Ihre Runde erzeugt wurde.",
    ],
    steps: [
      "Stellen Sie ein, wie viele UUIDs Sie brauchen (1–500).",
      "Klicken Sie auf Erzeugen — die Liste erscheint sofort.",
      "Kopieren Sie alle auf einmal, oder leeren Sie und erzeugen Sie eine frische Runde.",
    ],
    faqs: [
      {
        q: "Können zwei erzeugte UUIDs jemals kollidieren?",
        a: "Theoretisch ja, praktisch nein. Mit 122 Zufallsbits bräuchte es die Größenordnung von 10^36 UUIDs für eine Kollision — weit jenseits jeder realistischen Arbeitslast.",
      },
      {
        q: "Warum v4 statt UUID v1 oder v7?",
        a: "v4 leckt keine Zeit- oder Hardwareinformationen und braucht weder Uhr noch MAC-Adresse. Wenn Sie datenbankfreundliche, zeitsortierbare IDs brauchen, schauen Sie sich v7 an — für pure Eindeutigkeit ist v4 die Standardwahl.",
      },
      {
        q: "Werden die UUIDs auf einem Server erzeugt?",
        a: "Nein. Sie stammen aus dem kryptografischen Zufallsgenerator Ihres eigenen Browsers und verlassen Ihr Gerät nie.",
      },
    ],
  },
  "xml-formatter": {
    name: "XML-Formatter",
    tagline:
      "XML online verschönern, mit sauberer 2-Leerzeichen-Einrückung — Sitemaps, RSS-Feeds, SOAP-Umschläge und Configs werden wieder lesbar.",
    intro: [
      "Fügen Sie verheddertes oder einzeiliges XML ein und erhalten sofort ein ordentlich eingerücktes Dokument. Elemente verschachteln sich mit konsistenter 2-Leerzeichen-Einrückung, kurzer Textinhalt bleibt mit seinen Tags auf einer Zeile, und Kommentare, CDATA-Abschnitte, Verarbeitungsanweisungen und DOCTYPE-Deklarationen bleiben erhalten.",
      "Ideal, um sitemap.xml, RSS-/Atom-Feeds, Android-Layouts, Maven-POMs, SOAP-Antworten und endlose andere Konfigurationsformate zu lesen — ohne ein Editor-Plugin zu installieren.",
    ],
    steps: [
      "Fügen Sie Ihr XML in das Eingabefeld ein.",
      "Das formatierte Dokument erscheint sofort bei jeder Eingabe.",
      "Kopieren Sie das verschönerte XML oder leeren Sie die Eingabe, um eine weitere Datei zu versuchen.",
    ],
    faqs: [
      {
        q: "Verändert die Formatierung meine XML-Daten?",
        a: "Leerraum zwischen Elementen wird normalisiert, damit die Struktur lesbar ist — sicher für praktisch alles echte XML. Leerraum im Textinhalt bleibt erhalten (an den Rändern getrimmt), und CDATA-Abschnitte bleiben bytegenau.",
      },
      {
        q: "Klappt es mit großen XML-Dateien?",
        a: "Ja, im Rahmen des Vernünftigen — die Formatierung ist ein schneller Einzeldurchlauf und läuft lokal, aber mehr-Megabyte-Dokumente können auf langsameren Geräten einen Moment brauchen.",
      },
      {
        q: "Wird mein XML auf einen Server hochgeladen?",
        a: "Nein. Die Formatierung geschieht vollständig in Ihrem Browser; nichts wird irgendwohin gesendet.",
      },
    ],
  },
  "xml-validator": {
    name: "XML-Validator",
    tagline:
      "XML in Echtzeit auf Wohlgeformtheit prüfen: nicht passende Tags, kaputte Attribute und ungültige Entities werden sofort gemeldet. Kein Upload.",
    intro: [
      "Der Validator nutzt den eingebauten XML-Parser des Browsers und erzwingt also exakt die Regeln echter XML-Werkzeuge: Jeder Tag muss sich schließen, Attribute müssen quotiert sein, Entities müssen gültig sein, und es muss genau ein Wurzelelement geben.",
      "Wohlgeformtes XML bekommt einen grünen Status plus eine hübsch gedruckte Vorschau; Probleme zeigen sich mit der eigenen Fehlerbeschreibung des Parsers, die das kranke Konstrukt eingrenzt — nützlich, bevor Feeds, Sitemaps oder SOAP-Payloads an wählerische Verbraucher gehen.",
    ],
    steps: [
      "Fügen Sie Ihr XML in das Eingabefeld ein.",
      "Ein grüner Status erscheint, wenn das XML wohlgeformt ist; sonst wird der Parserfehler gezeigt.",
      "Beheben Sie das gemeldete Problem, oder kopieren Sie die formatierte Vorschau, wenn es läuft.",
    ],
    faqs: [
      {
        q: "Prüft das gegen ein DTD- oder XSD-Schema?",
        a: "Nein — es prüft nur die Wohlgeformtheit (Struktur, Quotierung, Entities, einzelne Wurzel). Schema-Validierung braucht ein dediziertes Tool mit Ihrem XSD oder Ihrer DTD.",
      },
      {
        q: "Was gilt hier als XML-Fehler?",
        a: "Ungeschlossene oder nicht passende Tags, unquotierte Attribute, doppelte Attribute, ungültige Entity-Referenzen, mehrere Wurzelelemente und unzulässige Zeichen werden alle abgelehnt.",
      },
      {
        q: "Wird mein XML irgendwohin gesendet?",
        a: "Nein. Die Prüfung läuft in Ihrem Browser mit dem nativen DOMParser — Ihre Daten verlassen das Gerät nie.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* SEO                                                                 */
  /* ------------------------------------------------------------------ */
  "canonical-tag-generator": {
    name: "Canonical-Tag-Generator",
    tagline:
      "Ein korrektes rel=canonical-Link-Tag erzeugen und lernen, wie Sie URLs normalisieren, damit Suchmaschinen die eine Fassung indexieren, die Sie wollen.",
    intro: [
      "Ein Canonical-Tag sagt Suchmaschinen, welche URL zu indexieren ist, wenn derselbe Inhalt unter mehreren Adressen erreichbar ist — mit und ohne Endschrägstrich, mit Query-Strings, UTM-Parametern, http/https- oder www-Varianten. Richtig eingesetzt bündelt es doppelte URLs zu einem Ranking-Signal, statt es zu zersplittern.",
      "Geben Sie die absolute URL der bevorzugten Fassung ein und kopieren Sie das Tag in den <head> dieser Seite. Die Checkliste deckt die Normalisierungs-Details ab, die die meisten Implementierungen verkehrt machen.",
    ],
    steps: [
      "Legen Sie ein Canonical-URL-Format für die ganze Site fest: https, Host mit oder ohne www, Endschrägstrich ja oder nein.",
      "Fügen Sie die absolute URL der bevorzugten Fassung der Seite ein.",
      "Kopieren Sie das Link-Tag in den <head> der Seite und prüfen Sie es mit dem URL-Prüfung-Tool.",
    ],
    faqs: [
      {
        q: "Was macht ein Canonical-Tag eigentlich?",
        a: "Es bündelt Duplikate: Signale aus alternativen URLs — UTM-Kopien, parametrisierte Sortierungen, Druckansichten — werden in die Canonical-URL zusammengeführt, die also rankt, statt dass die Wirkung auf Duplikate verteilt wird.",
      },
      {
        q: "Sollte jede Seite eine selbstreferenzierende Canonical haben?",
        a: "Ja, das ist der empfohlene Standard. Auch einzigartige Seiten sollten ihre eigene URL als canonical deklarieren — als Schutz gegen Parameter-, Schrägstrich- und Groß-/Kleinschreib-Varianten, die Ihnen noch nicht aufgefallen sind.",
      },
      {
        q: "Canonical vs. noindex vs. Redirect — was wofür?",
        a: "Einen 301-Redirect nutzen, wenn das Duplikat Nutzer woandershin schicken soll; noindex, wenn es erreichbar bleiben muss, aber aus den Ergebnissen heraus; canonical, wenn beide Versionen live und crawlbar bleiben müssen.",
      },
    ],
  },
  "hreflang-generator": {
    name: "hreflang-Generator",
    tagline:
      "Ein vollständiges hreflang-Link-Cluster bauen — ein Link pro Sprache plus x-default — aus Ihren übersetzten URLs, konsistent und bidirektional.",
    intro: [
      "hreflang sagt Suchmaschinen, welche URL sie Sprechern jeder Sprache ausliefern sollen, und verhindert, dass sich fast identische Übersetzungen gegenseitig Konkurrenz machen. Die Cluster sind bidirektional: Jede lokalisierte Seite muss den vollständigen Satz zurückliefern, inklusive eines Verweises auf sich selbst.",
      "Geben Sie die URL jeder Sprachversion ein, und der Generator erzeugt das vollständige <link rel=\"alternate\">-Cluster plus x-default, das auf Ihren Sprachwähler oder die Startseite der Standardsprache zeigen sollte.",
    ],
    steps: [
      "Fügen Sie die absolute URL jeder übersetzten Version ein; lassen Sie Sprachen leer, die Sie nicht haben.",
      "Setzen Sie die x-default-URL — Ihren Sprachwähler oder die Standard-Startseite.",
      "Kopieren Sie das Cluster in den <head> jeder Seite des Satzes.",
    ],
    faqs: [
      {
        q: "Braucht jede Seite den vollständigen hreflang-Satz?",
        a: "Ja. Cluster müssen wechselseitig sein: Seite A listet Seite B und sich selbst, und B listet A und sich selbst. Ein Cluster mit fehlenden Mitgliedern wird teilweise ignoriert — die Mühe wäre umsonst.",
      },
      {
        q: "Soll ich zh oder zh-Hans nutzen?",
        a: "Bevorzugen Sie zh-Hans für Kurzzeichen und zh-Hant für Langzeichen; ein bloßes zh lässt die Schrift offen. Regionale Subtags wie pt-BR sind optional — zielen Sie zuerst auf die Sprache und fügen Sie eine Region nur hinzu, wenn sich Inhalte wirklich unterscheiden, wie bei pt-BR gegenüber pt-PT.",
      },
      {
        q: "Ersetzt hreflang ein Canonical-Tag?",
        a: "Nein. Jede Sprachversion braucht weiterhin ihre eigene selbstreferenzierende Canonical. hreflang wählt zwischen gleichwertigen übersetzten Seiten; canonical löst Duplikate innerhalb einer Sprache.",
      },
    ],
  },
  "keyword-density-checker": {
    name: "Keyword-Dichte-Prüfer",
    tagline:
      "Keyword-Phrasen mit 1–3 Wörtern und ihre Dichte zählen, mit eingebauten Stoppwort-Listen für Englisch, Chinesisch, Japanisch, Spanisch und Portugiesisch.",
    intro: [
      "Die Keyword-Dichte ist der Anteil eines Ausdrucks an allen Wörtern der Seite. Dieser Prüfer zerlegt Ihren Text, streift Stoppwörter je Sprache und meldet Zählungen und Dichte für Ein-, Zwei- und Dreiwort-Phrasen — live, beim Einfügen oder Editieren.",
      "Nutzen Sie es, um zu bestätigen, dass die Seite tatsächlich sagt, wofür Sie ranken wollen — nicht, um einer magischen Prozentzahl hinterherzujagen. Text, der natürlich liest und das Thema abdeckt, schlägt jedes feste Verhältnis.",
    ],
    steps: [
      "Fügen Sie den Seitentext oder einen Entwurf in das Eingabefeld ein.",
      "Wählen Sie die Inhaltssprache und ob Stoppwörter ausgeschlossen werden sollen.",
      "Lesen Sie Zählungen und Dichte für 1–3-Wort-Phrasen, oder suchen Sie, um einen bestimmten Begriff zu prüfen.",
    ],
    faqs: [
      {
        q: "Auf welche Keyword-Dichte sollte ich zielen?",
        a: "Es gibt kein Ziel. Moderne Ranking-Systeme nutzen Embeddings und Themenmodelle, keine Dichteschwellen. Wenn die Spitzen-Phrasen das Thema der Seite in natürlicher Sprache widerspiegeln — grob 1–2 % für den Hauptbegriff —, sitzen Sie richtig.",
      },
      {
        q: "Werden Stoppwörter vor dem Zählen entfernt?",
        a: "Nur wenn Sie es einschalten. Das Entfernen macht aus „hotel in london“ das Bigramm „hotel london“ — oft so, wie Menschen tatsächlich suchen. Vergleichen Sie beide Ansichten, bevor Sie entscheiden.",
      },
      {
        q: "Wie werden Chinesisch und Japanisch gezählt?",
        a: "Ohne echten Segmentierer wird CJK-Text für Einzeltoken pro Zeichen und für Zweiwort-Phrasen pro Zeichenpaar gezählt — eine gute Näherung, um überstrapazierte Begriffe zu entdecken, keine linguistische Analyse.",
      },
    ],
  },
  "meta-tag-generator": {
    name: "Meta-Tag-Generator",
    tagline:
      "Titel-, Beschreibungs-, Keywords-, Robots- und Viewport-Meta-Tags erzeugen, mit Live-HTML-Ausgabe zum direkten Einfügen in Ihren <head>.",
    intro: [
      "Meta-Tags sind das Erste, was Crawler lesen: Das Title-Tag ist ein Ranking-Signal, und die Meta-Beschreibung wird Ihr Snippet, wann immer Google sie nicht umschreibt. Dieser Generator baut einen sauberen, gültigen Satz — title, description, keywords, robots, viewport, author plus ein optionales Canonical-Link — während Sie tippen.",
      "Jeder Attributwert wird HTML-escaped, Anführungszeichen und kaufmännische Unds können Ihr Markup also nicht zerbrechen. Kopieren Sie den Block in den Head-Bereich Ihrer Vorlage oder Ihres CMS und justieren Sie ihn pro Seite.",
    ],
    steps: [
      "Füllen Sie den Seitentitel (Ziel: 50–60 Zeichen) und die Meta-Beschreibung (bis ~160) aus.",
      "Setzen Sie robots, viewport und author nach Bedarf — leere Felder fehlen in der Ausgabe.",
      "Kopieren Sie den erzeugten <head>-Schnipsel und fügen Sie ihn in Ihre Seitenvorlage ein.",
    ],
    faqs: [
      {
        q: "Wie lang sollte ein Title-Tag sein?",
        a: "Zielen Sie auf etwa 50–60 Zeichen, grob 580 Pixel bei der Schriftgröße, die Google rendert. Längere Titel werden in den Ergebnissen mit Auslassungspunkten abgeschnitten — das SERP-Vorschau-Tool zeigt exakt, wo der Schnitt landet.",
      },
      {
        q: "Sind Meta-Keywords noch nützlich?",
        a: "Google ignoriert das Meta-Keywords-Tag seit 2009, und Bing kann es als Spamsignal werten. Füllen Sie es nur aus, wenn eine Nischen-Suchmaschine oder eine interne Suchplattform es ausdrücklich verlangt.",
      },
      {
        q: "Was steuert das Robots-Meta-Tag?",
        a: "index/noindex entscheidet, ob die Seite in den Ergebnissen erscheinen darf; follow/nofollow, ob ihre Links Wirkung weitergeben. Es muss auf der Seite selbst sitzen — robots.txt kann nichts noindexen.",
      },
    ],
  },
  "open-graph-generator": {
    name: "Open-Graph-Generator",
    tagline:
      "Den vollständigen Satz og:- und twitter:-Meta-Tags bauen und die Teaser-Kartenvorschau live aktualisieren sehen, bevor Sie irgendetwas einfügen.",
    intro: [
      "Wenn Ihr Link auf X, Facebook, LinkedIn, Slack oder iMessage geteilt wird, entsteht die Vorschaukarte fast vollständig aus Open-Graph-Tags, mit Twitter-Card-Tags für die Lücken. Dieser Generator gibt beide Namensräume aus: og:title, og:type, og:url, og:image, og:image:alt, og:site_name, og:description und og:locale, dazu twitter:card, twitter:site und twitter:creator.",
      "Die meisten Plattformen greifen auf die og:-Tags zurück, wenn ein twitter:-Tag fehlt — die Extras braucht es also nur, wo sie abweichen. Die Live-Vorschau nähert an, wie eine Großbild- oder Summary-Karte rendert.",
    ],
    steps: [
      "Geben Sie Seitentitel, Beschreibung und Canonical-URL ein.",
      "Fügen Sie die Teaser-Bild-URL hinzu (1200 × 630 px funktionieren überall) und stellen Sie den Kartentyp ein.",
      "Kopieren Sie die Tags in Ihren <head> und prüfen Sie die Vorschaukarte.",
    ],
    faqs: [
      {
        q: "Welche Bildgröße sollte ich für og:image nutzen?",
        a: "1200 × 630 Pixel (1.91:1) ist der sichere Standard über Facebook, X und LinkedIn hinweg. Halten Sie die Datei unter 8 MB, nutzen Sie eine absolute URL und fügen Sie immer og:image:alt für Barrierefreiheit hinzu.",
      },
      {
        q: "Brauche ich sowohl og:- als auch twitter:-Tags?",
        a: "twitter:title, twitter:description und twitter:image greifen auf ihre og:-Entsprechungen zurück. Über dem og:-Satz hinaus brauchen Sie nur twitter:card (summary oder summary_large_image), twitter:site und optional twitter:creator.",
      },
      {
        q: "Welches og:type soll ich wählen?",
        a: "website für Startseiten und generische Seiten, article für Nachrichten und Blogposts (mit article:published_time, wenn möglich), und product für Detailseiten im E-Commerce. Der Typ beeinflusst, wie manche Plattformen den Link einordnen.",
      },
    ],
  },
  "robots-txt-generator": {
    name: "robots.txt-Generator",
    tagline:
      "Eine robots.txt mit KI-Crawler-Sperr- oder -Erlaubnislisten bauen, Regeln pro Bot, Crawl-Delay und Sitemap-Anweisungen — dann kopieren oder herunterladen.",
    intro: [
      "robots.txt steuert den Crawler-Zugang, bevor eine Seite überhaupt abgerufen wird. Über die klassischen User-agent: *-Regeln hinaus entscheiden Sie jetzt pro KI-Bot: suchnahe Crawler wie OAI-SearchBot und PerplexityBot erlauben, Trainings-Crawler wie GPTBot, ClaudeBot, Google-Extended, CCBot und Bytespider sperren — oder Ihre eigene Mischung bauen.",
      "Der Generator gruppiert User-Agents mit derselben Regel, ergänzt crawl-delay, wo es beachtet wird, und hängt Ihre Sitemap-Anweisung an. Kopieren Sie die Datei in Ihren Domainwurzel unter /robots.txt und prüfen Sie sie im robots-Bericht der Search Console.",
    ],
    steps: [
      "Wählen Sie eine Voreinstellung: alle erlauben, KI-Trainings-Bots sperren oder alles sperren.",
      "Justieren Sie jeden KI-Crawler mit Erlauben, Sperren oder keiner Regel, und fügen Sie Disallow-Pfade für User-agent: * hinzu.",
      "Fügen Sie Ihre Sitemap-URL hinzu, dann kopieren oder laden Sie die Datei in Ihren Site-Wurzel herunter.",
    ],
    faqs: [
      {
        q: "Ist robots.txt eine Sicherheitskontrolle?",
        a: "Nein. Sie ist beratend: Regelkonforme Crawler befolgen sie, aber jeder kann sie lesen — und sie wirbt mit Ihren privaten Pfaden. Schützen Sie sensible Bereiche mit Authentifizierung; verlassen Sie sich nie auf Disallow für Sicherheit.",
      },
      {
        q: "Beachten KI-Crawler robots.txt wirklich?",
        a: "Die großen, dokumentierten — GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot — geben robots.txt-Unterstützung an, aber die Befolgung ist freiwillig und variiert je nach Betreiber. Für harte Garantien sperren Sie auf der CDN- oder Firewall-Ebene.",
      },
      {
        q: "Warum ist meine Seite trotz Disallow weiter indexiert?",
        a: "Das Blockieren des Crawlens ist nicht das Blockieren des Indexierens: Wenn andere Seiten auf die URL verweisen, kann Google sie ohne Inhalt indexieren. Um eine Seite aus den Ergebnissen zu nehmen, erlauben Sie das Crawlen und nutzen Sie stattdessen ein noindex-Meta-Tag.",
      },
    ],
  },
  "schema-markup-generator": {
    name: "Schema-Markup-Generator",
    tagline:
      "Gültige JSON-LD-strukturierte Daten für Organization, LocalBusiness, Product, Article, FAQPage und HowTo erzeugen — escaped und einfügebereit.",
    intro: [
      "Strukturierte Daten helfen Suchmaschinen, die Entitäten einer Seite zu verstehen: wer sie veröffentlicht, was das Produkt kostet, welche Fragen sie beantwortet. Dieser Generator baut JSON-LD für sechs der meistgenutzten schema.org-Typen, lässt leere Felder weg und escaped die Ausgabe, sodass sie sicher innerhalb eines <script>-Tags ist.",
      "Wählen Sie den Typ, der zur Seite passt, füllen Sie die Felder und fügen Sie den Block in Head oder Body ein. Schicken Sie ihn vor dem Ausliefern immer durch einen Rich-Results-Validator — Markup, das parst aber Richtlinien verletzt, kann eine manuelle Maßnahme einhandeln.",
    ],
    steps: [
      "Wählen Sie den Schema-Typ, der zur Seite passt.",
      "Füllen Sie die Felder aus — für FAQPage und HowTo können Sie Frage- oder Schrittzeilen ergänzen und entfernen.",
      "Kopieren Sie den JSON-LD-Block in die Seite und schicken Sie ihn dann durch Googles Rich Results Test.",
    ],
    faqs: [
      {
        q: "Gibt es FAQ-Rich-Results noch?",
        a: "Google zeigt FAQ-Rich-Results inzwischen fast ausschließlich für bekannte Regierungs- und Gesundheitsseiten. Das Markup lohnt sich weiterhin: Answer-Engines und KI-Übersichten lesen FAQPage-Daten bei der Quellensuche, und andere Engines honorieren es nach wie vor.",
      },
      {
        q: "JSON-LD oder Microdata — welches Format?",
        a: "JSON-LD ist Googles empfohlenes Format: ein Skriptblock, keine Änderungen an Ihren HTML-Elementen, leichter zu erzeugen und zu pflegen. Microdata erreicht dasselbe Ergebnis, ist aber in Ihr Markup eingeflochten.",
      },
      {
        q: "Garantiert gültige strukturierte Daten Rich-Results?",
        a: "Nein. Gültigkeit macht die Seite für eine Funktion antragsberechtigt; Google entscheidet pro Abfrage und pro Oberfläche, ob er sie anzeigt. Versprechen Sie in Berichten nie Sterne oder Brotkrumen allein wegen des Markups.",
      },
    ],
  },
  "serp-preview": {
    name: "SERP-Vorschau",
    tagline:
      "Ihren Google-Snippet auf Desktop und Mobilgerät vorschauen, mit Pixel-Level-Abschneidung und Längenmessern für Titel und Beschreibung.",
    intro: [
      "Google schneidet Titel und Beschreibungen nach gemessener Pixelbreite ab, nicht nach Zeichenzahl — ein Titel voller breiter Buchstaben wird eher abgeschnitten als dieselbe Zahl schmaler. Diese Vorschau misst Ihren Text so wie die Ergebnisseite und schneidet exakt dort, wo Google es täte.",
      "Wechseln Sie zwischen Desktop- und Mobil-Pixelbudgets, behalten Sie die Messer im Auge und justieren Sie den Text, bis die ganze Botschaft den Schnitt überlebt.",
    ],
    steps: [
      "Geben Sie das Title-Tag, die Meta-Beschreibung und die Seiten-URL ein.",
      "Wechseln Sie zwischen Desktop und Mobilgerät, um die Schnittpunkte zu vergleichen.",
      "Justieren Sie den Text, bis Titel und Beschreibung ins Pixelbudget passen.",
    ],
    faqs: [
      {
        q: "Wie lang darf ein Titel sein, bevor Google ihn abschneidet?",
        a: "Rund 580–600 Pixel auf dem Desktop, typisch 50–60 Zeichen; mobil ist etwas mehr Breite drin. Das Pixelmaß ist das echte Limit — Zeichenzahlen sind nur ein grober Richtwert, weil Buchstaben unterschiedliche Breiten haben.",
      },
      {
        q: "Zeigt Google immer meine Meta-Beschreibung?",
        a: "Nein. Google schreibt Beschreibungen für einen großen Teil der Abfragen um, meist passend zu den Suchbegriffen. Eine präzise, konkrete Beschreibung erhöht die Chance, dass Ihre wörtlich verwendet wird.",
      },
      {
        q: "Warum würde Google meinen Titel ersetzen?",
        a: "Wenn Google glaubt, dass eine andere Zeichenkette besser zur Abfrage passt, ersetzt es ihn durch die H1, den Ankertext interner Links oder den Seitennamen. Die Vorschau zeigt den besten Fall: Ihre eigenen Tags, unverändert.",
      },
    ],
  },
  "sitemap-generator": {
    name: "XML-Sitemap-Generator",
    tagline:
      "Eine URL-Liste einfügen und eine gültige sitemap.xml mit lastmod, changefreq und priority je Abschnitt erhalten — dedupliziert und einreichbereit.",
    intro: [
      "Eine Sitemap sagt Suchmaschinen, welche URLs existieren und wann sie sich zuletzt geändert haben. Fügen Sie Ihre Liste ein — aus einem Crawler-Export, CMS oder einer Tabellenkalkulation —, der Generator dedupliziert Einträge, gruppiert sie nach erstem Pfadsegment und lässt changefreq und priority pro Gruppe setzen, während die Datei protokollkonform bleibt.",
      "Das XML folgt dem sitemaps.org-0.9-Protokoll, das Google, Bing und Yandex akzeptieren. Laden Sie die Datei herunter, hosten Sie sie unter /sitemap.xml und verweisen Sie aus robots.txt darauf oder reichen Sie sie direkt in der Search Console ein.",
    ],
    steps: [
      "Fügen Sie eine absolute URL pro Zeile ein — bis zum Limit von 50.000 URLs / 50 MB pro Datei.",
      "Stellen Sie die lastmod-Behandlung ein und justieren Sie changefreq und priority pro Abschnitt, wo es sinnvoll ist.",
      "Laden Sie sitemap.xml herunter, legen Sie sie in Ihren Domainwurzel und reichen Sie sie in der Search Console ein.",
    ],
    faqs: [
      {
        q: "Zählen changefreq und priority noch?",
        a: "Google ignoriert beides und nutzt seinen eigenen Zeitplan; lastmod ist das einzige Tag mit dokumentierter Wirkung — und nur, wenn es stimmt. Setzen Sie die anderen, wenn Sie eine vollständige Datei wollen, aber investieren Sie die Mühe in wahrheitsgemäße lastmod-Werte.",
      },
      {
        q: "Welchen lastmod-Wert soll ich nutzen?",
        a: "Das Datum, an dem sich der Seiteninhalt zuletzt inhaltlich relevant änderte, im W3C-Datetime-Format (YYYY-MM-DD genügt). Das heutige Datum auf jede URL zu kopieren, lehrt Google, Ihrem lastmod zu misstrauen.",
      },
      {
        q: "Wie groß darf eine Sitemap sein?",
        a: "50.000 URLs oder 50 MB unkomprimiert pro Datei. Darüber hinaus: in mehrere Sitemaps teilen und in einer Sitemap-Indexdatei listen, dann den Index einreichen.",
      },
    ],
  },
  "utm-builder": {
    name: "UTM-Link-Builder",
    tagline:
      "utm_source, medium, campaign, term und content an beliebige URLs anhängen und einen korrekt kodierten Tracking-Link erhalten, den Sie kopieren oder teilen.",
    intro: [
      "UTM-Parameter sind die Query-Strings, die Analyseplattformen lesen, um Traffic zuzuordnen: source, medium, campaign, term und content. Dieser Builder hängt sie mit korrekter Prozentkodierung an Ihre URL — Leerzeichen und Sonderzeichen überstehen also die Reise durch Werbeplattformen, QR-Codes und Mail-Clients.",
      "Vereinbaren Sie Namenskonventionen, bevor Sie Links bauen — Kleinbuchstaben, Bindestriche, keine Daten in Kampagnennamen —, sonst zersplittern Ihre Berichte in fast identische Doppelkampagnen.",
    ],
    steps: [
      "Fügen Sie die Ziel-URL ein.",
      "Füllen Sie zuerst source und medium aus, dann campaign und die optionalen Felder term/content.",
      "Kopieren Sie die markierte URL in Ihre Anzeige, Ihren Newsletter oder Social-Post.",
    ],
    faqs: [
      {
        q: "Welche UTM-Parameter sind erforderlich?",
        a: "utm_source und utm_medium sind die, auf die sich Analyse-Tools verlassen: source nennt den Verweis, medium den Kanal (cpc, email, social). utm_campaign ist dringend empfohlen; utm_id, utm_term und utm_content sind optional.",
      },
      {
        q: "Schaden UTM-Parameter dem SEO?",
        a: "Nicht, wenn sie richtig behandelt werden. Crawler können markierte URLs als Duplikate werten — genau das löst eine selbstreferenzierende Canonical. Deshalb passt der Canonical-Generator gut zu diesem Tool.",
      },
      {
        q: "Ist Groß-/Kleinschreibung in UTM-Werten bedeutungsvoll?",
        a: "Ja — utm_campaign=Spring und utm_campaign=spring gelten in den meisten Analyse-Tools als zwei Kampagnen. Standardisieren Sie auf Kleinbuchstaben, dann bleiben Ihre Berichte sauber.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* Sicherheit                                                          */
  /* ------------------------------------------------------------------ */
  "dns-lookup": {
    name: "DNS-Lookup",
    tagline:
      "A-, AAAA-, MX-, TXT-, NS- und CNAME-Einträge beliebiger Domains über DNS-over-HTTPS abfragen, in einer sauberen Tabelle — ohne Terminal oder dig.",
    intro: [
      "DNS-Einträge sagen Ihnen, wohin eine Domain zeigt, wie sie E-Mail versendet und wie sie Eigentum nachweist. Dieses Tool löst jeden Eintragstyp über DNS-over-HTTPS (DoH) auf — denselben verschlüsselten Kanal, den moderne Browser nutzen — und legt die Antworten in einer lesbaren Tabelle ab.",
      "Es läuft auf Googles freiem öffentlichen Resolver, es gibt also nichts zu installieren und keinen API-Schlüssel. Praktisch, um die Ausbreitung nach einer Änderung zu prüfen, SPF-/DKIM-/DMARC-TXT-Einträge zu verifizieren oder zu debuggen, warum Mail an eine Domain abgewiesen wird.",
    ],
    steps: [
      "Tippen Sie die Domain ein (example.com, kein http:// nötig) und wählen Sie einen Eintragstyp.",
      "Drücken Sie Nachschlagen; die Anfrage geht verschlüsselt per DoH an den öffentlichen Resolver.",
      "Lesen Sie die Tabelle: Jede Zeile zeigt Typ, TTL und Wert — eine IP für A/AAAA, oder ein Mailserver mit Priorität für MX.",
      "Wechseln Sie die Eintragstypen für das ganze Bild: MX für Mail, TXT für SPF/DKIM, NS für den DNS-Betreiber.",
    ],
    faqs: [
      {
        q: "Wofür sind die wichtigsten Eintragstypen da?",
        a: "A bildet einen Namen auf eine IPv4-Adresse ab, AAAA auf IPv6. MX listet die Mailserver und ihre Prioritäten. TXT hält freien Text — meist SPF-, DKIM- und DMARC-Richtlinien. NS nennt die autoritativen Nameserver. CNAME ist ein Alias, der einen Namen auf einen anderen zeigt. Jeder beantwortet eine andere Frage über dieselbe Domain.",
      },
      {
        q: "Was geht über das Netzwerk?",
        a: "Der Domainname und der Eintragstyp in einer DNS-over-HTTPS-Anfrage an dns.google, verschlüsselt wie jede HTTPS-Anfrage. Nichts über Sie wird ergänzt, und kein API-Schlüssel oder Konto ist beteiligt.",
      },
      {
        q: "Warum sehe ich manchmal CNAME-Zeilen, obwohl ich A abgefragt habe?",
        a: "Resolver liefern die volle Kette: Ist www.example.com ein CNAME auf example.com, liefert eine A-Anfrage den Alias plus den finalen A-Eintrag. Die Zusatzzeilen zeigen genau, wie sich der Name auflöst.",
      },
    ],
  },
  "email-validator": {
    name: "E-Mail-Validator",
    tagline:
      "Das Format einer E-Mail lokal prüfen und per Live-MX-Lookup verifizieren, ob die Domain Mail empfangen kann — plus Tippfehler-Erkennung. Ohne Anmeldung.",
    intro: [
      "Eine syntaktisch gültige Adresse kann trotzdem abprallen, wenn ihre Domain keine Mailserver hat. Dieser Validator prüft zuerst das Format vollständig in Ihrem Browser — Länge, Zeichen, Punktplatzierung und Domain-Labels —, fragt dann live DNS über HTTPS ab, ob die Domain tatsächlich MX-Einträge (Mail-Exchange) veröffentlicht.",
      "Er vergleicht die Domain zudem mit einer Liste der gängigsten Anbieter und markiert wahrscheinliche Tippfehler wie gmial.com. Nur der Domainteil geht über das Netz; der Teil vor dem @ verlässt Ihren Browser nie.",
    ],
    steps: [
      "Tippen oder fügen Sie die Adresse in das Feld ein und drücken Sie Prüfen.",
      "Lesen Sie die Syntax-Zeile: Sie findet fehlerhafte Localparts, doppelte Punkte und ungültige Domains ganz ohne Netzaufruf.",
      "Prüfen Sie die Mailserver-Zeile als Beweis, dass die Domain E-Mail empfangen kann — ein paar Domains ohne MX akzeptieren Mail noch über einen A-Eintrag, das Tool weist darauf hin.",
      "Wird ein Tippfehler vorgeschlagen, korrigieren Sie die Domain und prüfen erneut.",
    ],
    faqs: [
      {
        q: "Prüft das, ob das Postfach selbst existiert?",
        a: "Nein. Mailserver verraten in der Regel nicht, ob ein bestimmtes Postfach real ist (und sie anzuzapfen wäre aufdringlich). Dieses Tool verifiziert das Format und, dass die Domain zum Mail-Empfang konfiguriert ist — was die meisten Verifikationsabläufe tatsächlich brauchen. Volle oder stillgelegte Postfächer können trotzdem abprallen.",
      },
      {
        q: "Was genau geht über das Netzwerk?",
        a: "Nur die Domain — der Teil nach dem @ — in einer DNS-Anfrage an Googles öffentlichen Resolver (dns.google) über HTTPS. Die volle Adresse und alles vor dem @ bleiben in Ihrem Browser.",
      },
      {
        q: "Warum hat eine gültige Adresse die MX-Prüfung nicht bestanden?",
        a: "Einige Domains veröffentlichen keine MX-Einträge und verlassen sich auf ihren A-Eintrag (implizites Routing); das Tool sagt Ihnen, wenn das so ist. Andere veröffentlichen einen Null-MX und sagen explizit „keine Mail hier“. Firmen- oder brandneue Domains fehlen öffentliche Resolver-Caches auch kurzzeitig — versuchen Sie es in einer Minute erneut.",
      },
    ],
  },
  "ip-lookup": {
    name: "IP-Lookup",
    tagline:
      "Land, Stadt, ISP und ASN beliebiger IP-Adressen in Sekunden finden — oder Ihre eigene IP prüfen — mit einer freien API ohne Schlüssel, direkt im Browser.",
    intro: [
      "Jedes Gerät im Internet trägt eine IP-Adresse, die Hinweise darauf gibt, wo es ist und wer es leitet. Geben Sie eine beliebige IPv4- oder IPv6-Adresse ein und sehen Sie Land und Region, Stadt, Netzbetreiber (ISP), Organisation und autonome Systemnummer (ASN), dazu Zeitzone und ungefähre Koordinaten.",
      "Die Daten kommen aus der freien, schlüssellosen ipwho.is-Datenbank über HTTPS; keine Anmeldung, kein Kontingent. Ein Tipp prüft Ihre eigene Verbindung — praktisch, um zu bestätigen, dass ein VPN Ihren sichtbaren Standort wirklich gewechselt hat.",
    ],
    steps: [
      "Fügen Sie eine IP in das Feld ein, oder drücken Sie Meine IP nutzen, um Ihre eigene Verbindung zu prüfen.",
      "Drücken Sie Nachschlagen; die Adresse geht per HTTPS an die ipwho.is-API.",
      "Lesen Sie die Ergebnisse: erst der Standort, dann Netzdetails wie ISP, Organisation und ASN.",
      "Vergleichen Sie die Ergebnisse Ihrer eigenen IP vor und nach dem VPN-Serverwechsel, um die Wirkung zu bestätigen.",
    ],
    faqs: [
      {
        q: "Wie genau ist der Standort?",
        a: "Land und Region stimmen meist; Stadt und Koordinaten sind Schätzungen darauf gestützt, wo der ISP den Adressblock registriert — Mobilfunk- und VPN-Adressen können also um viele Kilometer daneben liegen. Behandeln Sie die Ergebnisse als Netzinformation, nicht als Adresse einer Person.",
      },
      {
        q: "Was sagt mir die ASN?",
        a: "Eine autonome Systemnummer identifiziert den Netzbetreiber, dem der IP-Block gehört — der ISP, ein Hosting-Unternehmen oder ein Großkonzern. Zwei IPs mit derselben ASN gehören fast sicher zum selben Netz; nützlich, um Hosting-Bereiche und Missbrauchsmeldungen einzuordnen.",
      },
      {
        q: "Was geht über das Netzwerk?",
        a: "Nur die IP, die Sie nachschlagen wollen, in einer HTTPS-Anfrage an ipwho.is. Das Nachschlagen Ihrer eigenen IP offenbart Ihre Adresse zwangsläufig dieser API — dieselbe, die jeder Geolocation-Dienst sähe.",
      },
    ],
  },
  "password-generator": {
    name: "Passwort-Generator",
    tagline:
      "Starke Passwörter und Passphrasen im Browser erzeugen, mit Live-Entropie-Schätzung — Kryptografiequalität, nichts gesendet oder gespeichert.",
    intro: [
      "Schwache und wiederverwendete Passwörter verursachen die meisten Kontoübernahmen. Dieser Generator erzeugt Passwörter mit dem kryptografischen Zufallszahlengenerator Ihres Browsers (crypto.getRandomValues) — derselben Quelle für Verschlüsselungsschlüssel —, jedes Zeichen ist also gleichverteilt und unvorhersagbar.",
      "Wählen Sie ein klassisches Zufallspasswort oder eine einprägsame Passphrase aus einer 256-Wort-Liste, justieren Sie Länge und Zeichensätze und beobachten Sie die Entropieanzeige in Bits. Alles läuft lokal: Das Passwort wird nie übertragen, protokolliert oder gespeichert.",
    ],
    steps: [
      "Wählen Sie Passwort für zufällige Zeichen oder Passphrase für leicht tippbare Wörter.",
      "Justieren Sie den Längenregler und schalten Sie Zeichensätze um; schließen Sie verwechslungsträchtige Zeichen aus, wenn Sie das Passwort laut vorlesen oder auf dem Handy eintippen wollen.",
      "Prüfen Sie die Entropieanzeige — 80 Bits oder mehr sind exzellent für jedes Konto.",
      "Klicken Sie auf die Kopiertaste und fügen Sie das Ergebnis direkt in das Anmelde- oder Passwortänderungs-Formular ein.",
    ],
    faqs: [
      {
        q: "Was zählt mehr: Passwortlänge oder Komplexität?",
        a: "Länge. Die Entropie wächst mit jedem zusätzlichen Zeichen — grob log2 der Zeichenpool-Größe pro Zeichen. Ein 16-Zeichen-Zufallspasswort über einen 70-Zeichen-Pool hat etwa 98 Bits Entropie, weit mehr als ein kurzes Passwort voller Sondertypen. Eine Passphrase aus 5+ Zufallswörtern schlägt ebenfalls die meisten 8-Zeichen-Passwörter.",
      },
      {
        q: "Sind diese Passwörter wirklich zufällig?",
        a: "Ja. Sie stammen von crypto.getRandomValues, der kryptografisch sicheren Zufallsquelle Ihres Browsers — nicht von Math.random(). Die Option „Mehrdeutige ausschließen“ entfernt nur ähnliche Zeichen wie l, I, 1, O und 0; die Zufälligkeit des Rests schwächt sie nie.",
      },
      {
        q: "Können Sie ein hier erzeugtes Passwort wiederherstellen?",
        a: "Nein. Die Erzeugung geschieht vollständig im Speicher Ihres Browsers. Nichts wird hochgeladen, protokolliert oder gespeichert — laden Sie die Seite neu, und das Passwort ist für immer fort. Speichern Sie es also sofort in einem Passwort-Manager.",
      },
    ],
  },
  "password-strength": {
    name: "Passwort-Stärke-Prüfer",
    tagline:
      "Sehen, wie stark ein Passwort wirklich ist: zxcvbn-Bewertung, realistische Knackzeiten und konkrete Verbesserungen — alles lokal, nie hochgeladen.",
    intro: [
      "Die meisten Messer zählen nur Zeichenklassen. Dieser Prüfer fährt den zxcvbn-Algorithmus — gebaut aus echten Leak-Daten und Musteranalyse —, der Tastatur-Wanderungen, wiederholte Blöcke, Daten, l33t-Ersetzungen und Passwörter aus bekannten Lecks erkennt.",
      "Sie erhalten eine 0–4-Bewertung, geschätzte Knackzeiten unter drei Angriffsszenarien und konkrete Vorschläge. Alles wird in Ihrem Browser berechnet: Das getippte Passwort verlässt Ihr Gerät nie.",
    ],
    steps: [
      "Tippen oder fügen Sie das Passwort in das Feld ein — nutzen Sie Anzeigen, wenn Sie es lesen wollen.",
      "Sehen Sie zu, wie die Bewertung von „Sehr schwach“ nach „Sehr stark“ wandert, während Sie editieren.",
      "Lesen Sie die Knackzeit-Tabelle, um zu verstehen, was es aushält: gedrosseltes Online-Raten, Offline-Angriffe gegen langsame Hashes und Offline-Angriffe gegen schnelle Hashes.",
      "Wenden Sie die Vorschläge an — meist sind ein paar Zufallswörter der schnellste Gewinn.",
    ],
    faqs: [
      {
        q: "Was bedeuten die drei Knackzeit-Szenarien?",
        a: "Sie modellieren verschiedene Angreifer. Online, gedrosselt (100 Versuche/Stunde) ist ein Anmeldeformular, das Versuche begrenzt. Offline, langsamer Hash nimmt eine Datenbank mit bcrypt an, geknackt mit 10.000 Versuchen pro Sekunde. Offline, schneller Hash nimmt schwache oder ungesalzene MD5-/SHA-1-Hashes an, geknackt auf GPUs mit Milliarden Versuchen pro Sekunde — der schlimmste Fall für jedes wiederverwendete Passwort.",
      },
      {
        q: "Warum schneidet „Tr0ub4dor&3“ schlecht ab, obwohl es komplex aussieht?",
        a: "Weil Ersetzungen wie 0 für o und 3 für e das Erste sind, was Knackwörterbücher probieren. zxcvbn modelliert diese l33t-Regeln und bewertet das zugrunde liegende Muster — „troubador“ plus Dekoration — statt sich von den Symbolen täuschen zu lassen.",
      },
      {
        q: "Wird mein Passwort irgendwohin gesendet?",
        a: "Nein. Die zxcvbn-Bibliotheken und -Wörterbücher laden in Ihren Browser, jede Berechnung läuft lokal. Keine Netzanfrage trägt Ihre Eingabe.",
      },
    ],
  },
  "random-number": {
    name: "Zufallszahl-Generator",
    tagline:
      "Wirklich zufällige Zahlen aus jedem Bereich erzeugen — Einzeln, in Mengen, einmalige Losziehungen — mit dem kryptografischen RNG Ihres Browsers.",
    intro: [
      "Math.random() taugt für Spiele, ist aber verzerrt und vorhersagbar. Dieser Generator schöpft aus crypto.getRandomValues, der kryptografischen Zufallsquelle Ihres Browsers, mit Ablehnungsstichprobe gegen Modulo-Verzerrung — jede Zahl im Bereich ist gleich wahrscheinlich.",
      "Ziehen Sie eine Zahl zwischen den Grenzen, eine ganze Menge oder einmalige Züge für Verlosungen und Gewinnspiele; sortieren Sie die Ergebnisse aufsteigend oder behalten Sie die Ziehungsreihenfolge. Das Tool zeigt auch die Gesamtentropie des Zugs in Bits, Sie können also belegen, dass eine Verlosung fair war.",
    ],
    steps: [
      "Stellen Sie Minimum und Maximum ein (beide inklusive, Negative willkommen).",
      "Wählen Sie, wie viele Zahlen Sie brauchen, und schalten Sie einmalige Züge um, wenn Wiederholungen die Verlosung ruinieren würden.",
      "Aktivieren Sie aufsteigend sortieren für geordnete Ergebnisse, oder lassen Sie es aus, um die Ziehungsreihenfolge zu behalten.",
      "Kopieren Sie die Liste direkt in Ihre Tabellenkalkulation oder Ihre Verlosungsankündigung.",
    ],
    faqs: [
      {
        q: "Ist das für Verlosungen und Lotterien geeignet?",
        a: "Ja. Die Zahlen stammen aus dem kryptografischen RNG des Browsers mit einem unverzerrten Ablehnungsstichproben-Schritt, jeder Wert im Bereich hat also dieselbe Wahrscheinlichkeit. Die Entropieanzeige zeigt exakt, wie viel Zufall im Zug steckte.",
      },
      {
        q: "Was macht „keine Duplikate“ bei kleinem Bereich?",
        a: "Es wechselt zum Ziehen ohne Zurücklegen — wie nummerierte Kugeln aus einer Schale. Fordern Sie mehr einmalige Zahlen an, als der Bereich enthält, erklärt das Tool den Konflikt, statt ein verzerrtes Ergebnis zu liefern.",
      },
      {
        q: "Werden die Zahlen irgendwo gespeichert?",
        a: "Nein. Alles wird im Speicher Ihres Browsers aus crypto.getRandomValues berechnet; ein Neuladen der Seite wischt die Ergebnisse fort, und nie wird etwas hochgeladen.",
      },
    ],
  },
  "totp-generator": {
    name: "TOTP-Generator",
    tagline:
      "2FA-Codes offline aus jedem TOTP-Secret erzeugen — RFC 6238, 6 oder 8 Ziffern, Live-Countdown über 30 Sekunden. Ihr Secret verlässt nie den Browser.",
    intro: [
      "Authenticator-Codes brauchen keine App auf dem Handy. Fügen Sie ein Base32-Secret ein (oder einen ganzen otpauth://-Einrichtungslink aus Ihrem alten Authenticator), und dieses Tool berechnet dieselben rotierenden 6- oder 8-stelligen Codes wie jeder RFC-6238-Authenticator, mit Live-Countdown zum nächsten Code.",
      "Alles wird lokal mit WebCryptos HMAC berechnet — gar keine Netzaufrufe. Das Secret bleibt allein im Browser-Speicher, ein verlorenes Handy bedeutet also nie einen verlorenen zweiten Faktor.",
    ],
    steps: [
      "Kopieren Sie das Base32-Secret von der 2FA-Einrichtungsseite des Dienstes (oder fügen Sie seinen otpauth://-Link ein).",
      "Gleichen Sie die Einstellungen des Dienstes ab: 6 oder 8 Ziffern, 30- oder 60-Sekunden-Periode, SHA-1, sofern nichts anderes angegeben.",
      "Tippen Sie den aktuellen Code in den Dienst ein, bevor der Countdown endet — oder kopieren Sie ihn mit einem Klick.",
      "Lassen Sie den Tab für wiederholte Anmeldungen offen; die Codes aktualisieren sich automatisch je Periode.",
    ],
    faqs: [
      {
        q: "Ist ein Offline-Authenticator sicherer als SMS-Codes?",
        a: "Ja, gleich doppelt. TOTP-Codes werden auf Ihrem Gerät berechnet und reisen nie über das Mobilfunknetz — SIM-Swap-Angreifern gibt es nichts abzufangen. Sie verfallen außerdem alle 30 Sekunden und verlangen den Besitz des Secrets selbst, das in keiner Nachricht erscheint.",
      },
      {
        q: "Wo wird mein Secret gespeichert?",
        a: "Nirgendwo. Es liegt in einer Variable im Speicher dieses Tabs und wird von WebCrypto zum Signieren der Zeitzähler genutzt. Nichts landet in localStorage, Cookies oder auf einem Server — schließen Sie den Tab, und es ist fort.",
      },
      {
        q: "Warum stimmt mein Code nicht?",
        a: "Die häufigsten Ursachen: ein falscher Algorithmus (die meisten Dienste nutzen SHA-1), die falsche Periode oder eine Geräteuhr, die mehr als ein paar Sekunden driftet. Gleichen Sie die drei Auswahlfelder mit der Einrichtungsseite des Dienstes ab und synchronisieren Sie Ihre Systemuhr.",
      },
    ],
  },
  "whois-lookup": {
    name: "WHOIS-Lookup",
    tagline:
      "Domainregistrierungsdaten über RDAP prüfen — Registrar, Erstellungs- und Ablaufdaten, Statuscodes und Nameserver — mit klaren Hinweisen zur TLD-Abdeckung.",
    intro: [
      "Registrierungseinträge beantworten die Fragen, die das Schaufenster einer Domain verbirgt: wer sie betreibt, wann sie entstand und wann sie abläuft. Dieses Tool fragt das moderne RDAP-Protokoll ab — den offiziellen Nachfolger des Port-43-WHOIS — über HTTPS und ordnet die Antwort in Daten, Registrar, Statuscodes und Nameserver.",
      "rdap.org leitet Ihre Anfrage an den offiziellen RDAP-Server der Registry weiter. Die Abdeckung ist breit, aber nicht universell: Die meisten Länder-Registrys (.cn, .de, .br…) haben noch keine öffentlichen RDAP-Server, und das Tool sagt Ihnen klipp und klar, wenn eine TLD nicht abgedeckt ist, statt leere Felder zu zeigen.",
    ],
    steps: [
      "Geben Sie die Domain ein, die Sie recherchieren (example.com), und drücken Sie Nachschlagen.",
      "Lesen Sie zuerst die Daten: Erstellung und Ablauf verraten Domainalter und Verlängerungsgewohnheiten.",
      "Prüfen Sie Registrar und Statuscodes — clientTransferProhibited bedeutet Transfersperre, redemptionPeriod deutet an, dass die Domain bald freikäuft.",
      "Überfliegen Sie die Nameserver, um zu sehen, wer den DNS der Domain tatsächlich betreibt.",
    ],
    faqs: [
      {
        q: "Warum RDAP statt klassischem WHOIS?",
        a: "RDAP liefert strukturiertes JSON über HTTPS statt unstrukturierten Text über einen archaischen Port. Es unterstützt Authentifizierung, Rate-Limiting und internationalisierte Domains, und ICANN verlangt es für alle gTLD-Registrys. Dieses Tool folgt rdap.orgs Weiterleitungen zu der Registry, die die TLD betreibt.",
      },
      {
        q: "Warum scheitern manche TLDs mit „nicht abgedeckt“?",
        a: "Jede Registry entscheidet selbst, ob sie einen öffentlichen RDAP-Dienst betreibt. Fast alle generischen TLDs (.com, .net, .app…) tun es, aber viele Ländercodes — .cn, .de, .br, um einige zu nennen — noch nicht. Findet rdap.org keinen Server für eine TLD, zeigt das Tool eine klare Erklärung statt eines leeren Ergebnisses.",
      },
      {
        q: "Was geht über das Netzwerk?",
        a: "Nur der Domainname, in einer HTTPS-Anfrage an rdap.org, die zur offiziellen RDAP-Endstelle der Registry weiterleiten kann. Registrierungsdaten sind von Design öffentlich; nichts Persönliches über Sie wird übertragen.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* Einheiten                                                           */
  /* ------------------------------------------------------------------ */
  "area-converter": {
    name: "Flächen-Umrechner",
    tagline:
      "Quadratmeter, Quadratfuß, Acre und Hektar sofort umrechnen — 9 Flächeneinheiten für Immobilien, Grundstücke und Bodenbeläge.",
    intro: [
      "Rechnen Sie Grundstücks- und Flächeneinheiten zwischen Systemen um: Quadratmeter, Quadratfuß, Acre, Hektar und Quadratmeilen, alle auf einen Schlag für jede Eingabe angezeigt.",
      "Typische Einsätze: Immobilienanzeigen aus verschiedenen Ländern vergleichen, Gärten und Höfe planen, Bodenbeläge oder Anstrichmenge abschätzen.",
      "Er beherrscht 9 Einheiten — Quadratkilometer, Hektar, Quadratmeter, Quadratzentimeter, Quadratmeile, Acre, Quadratyard, Quadratfuß, Quadratzoll. Alles wird in Ihrem Browser berechnet, funktioniert offline, und Ihre Daten berühren nie einen Server.",
    ],
    steps: [
      "Geben Sie den umzurechnenden Wert ein.",
      "Wählen Sie die Ausgangs- und die Zieleinheit.",
      "Das Ergebnis aktualisiert sich bei der Eingabe — die Tabelle darunter zeigt alle Einheiten auf einen Schlag, oder kopieren Sie das Ergebnis.",
    ],
    faqs: [
      {
        q: "Wie groß ist ein Acre in Quadratmetern?",
        a: "Ein Acre = 4.046,86 m², also rund 43.560 Quadratfuß. Ein Hektar entspricht 2,471 Acres.",
      },
      {
        q: "Ist dieser Konverter kostenlos?",
        a: "Ja — er läuft vollständig in Ihrem Browser. Keine Grenzen, keine Werbung in den Ergebnissen, keine Anmeldung.",
      },
      {
        q: "Sind die Umrechnungen präzise?",
        a: "Die Umrechnungsfaktoren folgen den internationalen Standarddefinitionen (SI und NIST). Ergebnisse werden mit bis zu 8 signifikanten Stellen angezeigt.",
      },
    ],
  },
  "data-converter": {
    name: "Datengrößen-Umrechner",
    tagline:
      "Bytes, KB, MB, GB und TB umrechnen — dezimale (1000) und binäre (1024) Konventionen nebeneinander, klar getrennt.",
    intro: [
      "Rechnen Sie digitale Speichereinheiten um, mit explizit gemachter Dezimal/Binär-Unterscheidung: KB heißt 1000 Bytes, KiB heißt 1024 Bytes. Die meisten Verwirrungen der Art „warum ist meine Platte kleiner als angepriesen“ stammen aus dem Vermischen der beiden.",
      "Nutzen Sie es, um Downloadgrößen, Festplattenbelegung, Speicherspezifikationen und Hosting-Bandbreitenlimits zu prüfen.",
      "Er beherrscht 10 Einheiten — Bit, Byte, Kilobyte (1000 B), Kibibyte (1024 B), Megabyte (1000 KB), Mebibyte (1024 KiB) und mehr. Alles wird in Ihrem Browser berechnet, funktioniert offline, und Ihre Daten berühren nie einen Server.",
    ],
    steps: [
      "Geben Sie den umzurechnenden Wert ein.",
      "Wählen Sie die Ausgangs- und die Zieleinheit.",
      "Das Ergebnis aktualisiert sich bei der Eingabe — die Tabelle darunter zeigt alle Einheiten auf einen Schlag, oder kopieren Sie das Ergebnis.",
    ],
    faqs: [
      {
        q: "Warum zeigt eine 1-TB-Platte nur ~931 GB?",
        a: "Hersteller rechnen dezimal (1 TB = 1.000.000.000.000 Bytes), Betriebssysteme zeigen oft binär (1 TiB = 1.099.511.627.776 Bytes). 1 TB = 0,909 TiB ≈ 931 GiB — es fehlt nichts.",
      },
      {
        q: "Ist dieser Konverter kostenlos?",
        a: "Ja — er läuft vollständig in Ihrem Browser. Keine Grenzen, keine Werbung in den Ergebnissen, keine Anmeldung.",
      },
      {
        q: "Sind die Umrechnungen präzise?",
        a: "Die Umrechnungsfaktoren folgen den internationalen Standarddefinitionen (SI und NIST). Ergebnisse werden mit bis zu 8 signifikanten Stellen angezeigt.",
      },
    ],
  },
  "energy-converter": {
    name: "Energie-Umrechner",
    tagline:
      "Kalorien, Kilojoule, Joule, kWh, Wh und BTU umrechnen — Lebensmitteletiketten, Stromrechnungen und Physik an einem Ort.",
    intro: [
      "Rechnen Sie Energieeinheiten über Kontexte hinweg um: Lebensmittel-Kalorien (kcal) gegen Chemie-Kalorien (cal), Strom in kWh, Heizen in BTU, Physik in Joule.",
      "Klare Unterscheidung zwischen cal und kcal — der Verwechslung hinter vielen Missverständnissen zu Nährwertangaben —, mit exakten Standardfaktoren.",
      "Er beherrscht 7 Einheiten — Joule, Kilojoule, Kalorie, Kilokalorie, Wattstunde, Kilowattstunde, BTU. Alles wird in Ihrem Browser berechnet, funktioniert offline, und Ihre Daten berühren nie einen Server.",
    ],
    steps: [
      "Geben Sie den umzurechnenden Wert ein.",
      "Wählen Sie die Ausgangs- und die Zieleinheit.",
      "Das Ergebnis aktualisiert sich bei der Eingabe — die Tabelle darunter zeigt alle Einheiten auf einen Schlag, oder kopieren Sie das Ergebnis.",
    ],
    faqs: [
      {
        q: "Ist eine Kalorie dasselbe wie eine Kilokalorie?",
        a: "Nein. 1 kcal = 1000 cal. Etiketten, die „Kalorie“ (großes C) sagen, meinen eigentlich Kilokalorien. Geben Sie 1 kcal → cal ein, um es zu prüfen.",
      },
      {
        q: "Wie viele kWh sind 1 BTU?",
        a: "1 BTU = 0,000293071 kWh. Eine 10.000-BTU-Klimaanlage verbraucht in einer Stunde rund 2,93 kWh.",
      },
      {
        q: "Sind die Umrechnungen präzise?",
        a: "Die Umrechnungsfaktoren folgen den internationalen Standarddefinitionen (SI und NIST). Ergebnisse werden mit bis zu 8 signifikanten Stellen angezeigt.",
      },
    ],
  },
  "length-converter": {
    name: "Längen-Umrechner",
    tagline:
      "Längen und Entfernungen sofort umrechnen: Meter, Fuß, Zoll, Meilen, Zentimeter und mehr — direkt in Ihrem Browser.",
    intro: [
      "Rechnen Sie zwischen metrischen und imperialen Längeneinheiten um, ohne etwas in ein Suchfeld zu tippen. Geben Sie einen beliebigen Betrag ein und sehen Sie Meter, Fuß, Zoll, Meilen und jede andere Einheit auf einmal.",
      "Nützlich für DIY-Projekte, Reiseplanung, Konstruktionszeichnungen und Hausaufgaben — überall dort, wo eine schnelle, exakte Umrechnung das Schätzen schlägt.",
      "Er beherrscht 10 Einheiten — Kilometer, Meter, Zentimeter, Millimeter, Mikrometer, Meile, Yard, Fuß, Zoll, Seemeile. Alles wird in Ihrem Browser berechnet, funktioniert offline, und Ihre Daten berühren nie einen Server.",
    ],
    steps: [
      "Geben Sie den umzurechnenden Wert ein.",
      "Wählen Sie die Ausgangs- und die Zieleinheit.",
      "Das Ergebnis aktualisiert sich bei der Eingabe — die Tabelle darunter zeigt alle Einheiten auf einen Schlag, oder kopieren Sie das Ergebnis.",
    ],
    faqs: [
      {
        q: "Wie viele cm sind ein Zoll?",
        a: "Ein Zoll ist exakt 2,54 Zentimeter, international vereinbart seit 1959. Geben Sie oben 1 in → cm ein, um es zu prüfen.",
      },
      {
        q: "Ist dieser Konverter kostenlos?",
        a: "Ja — er läuft vollständig in Ihrem Browser. Keine Grenzen, keine Werbung in den Ergebnissen, keine Anmeldung.",
      },
      {
        q: "Sind die Umrechnungen präzise?",
        a: "Die Umrechnungsfaktoren folgen den internationalen Standarddefinitionen (SI und NIST). Ergebnisse werden mit bis zu 8 signifikanten Stellen angezeigt.",
      },
    ],
  },
  "pressure-converter": {
    name: "Druck-Umrechner",
    tagline:
      "bar, psi, Pascal, Atmosphäre und mmHg umrechnen — 7 Druckeinheiten für Reifen, Tauchen, Wetter und Klimatechnik.",
    intro: [
      "Rechnen Sie Druckeinheiten verschiedener Branchen um: psi für Reifendruckmesser, bar für europäische Spezifikationen, Pascal und kPa in der Technik, mmHg in Medizin und Meteorologie.",
      "Alle Faktoren sind exakt per Definition, wo der Standard sie exakt definiert (etwa 1 atm = 101.325 Pa).",
      "Er beherrscht 7 Einheiten — Pascal, Kilopascal, Megapascal, Bar, Atmosphäre, mmHg, psi. Alles wird in Ihrem Browser berechnet, funktioniert offline, und Ihre Daten berühren nie einen Server.",
    ],
    steps: [
      "Geben Sie den umzurechnenden Wert ein.",
      "Wählen Sie die Ausgangs- und die Zieleinheit.",
      "Das Ergebnis aktualisiert sich bei der Eingabe — die Tabelle darunter zeigt alle Einheiten auf einen Schlag, oder kopieren Sie das Ergebnis.",
    ],
    faqs: [
      {
        q: "Wie rechnet man psi in bar um?",
        a: "1 bar = 14,5038 psi, teilen Sie psi also durch 14,5038. Ein typischer Autoreifen mit 32 psi entspricht rund 2,21 bar.",
      },
      {
        q: "Ist dieser Konverter kostenlos?",
        a: "Ja — er läuft vollständig in Ihrem Browser. Keine Grenzen, keine Werbung in den Ergebnissen, keine Anmeldung.",
      },
      {
        q: "Sind die Umrechnungen präzise?",
        a: "Die Umrechnungsfaktoren folgen den internationalen Standarddefinitionen (SI und NIST). Ergebnisse werden mit bis zu 8 signifikanten Stellen angezeigt.",
      },
    ],
  },
  "speed-converter": {
    name: "Geschwindigkeits-Umrechner",
    tagline:
      "km/h, mph, Knoten, m/s und Mach sofort umrechnen — 6 Geschwindigkeitseinheiten für Laufsport, Wind und Fahrzeuge.",
    intro: [
      "Rechnen Sie Geschwindigkeitseinheiten verschiedener Länder und Sportarten um: Kilometer pro Stunde, Meilen pro Stunde, Knoten für Segeln und Luftfahrt, Meter pro Sekunde für die Physik.",
      "Nützlich, wenn Sie im Ausland ein Auto mieten, einen Seewetterbericht lesen oder Laufband- und Außentempo vergleichen.",
      "Er beherrscht 6 Einheiten — Meter pro Sekunde, Kilometer pro Stunde, Meile pro Stunde, Fuß pro Sekunde, Knoten, Mach (auf Meereshöhe). Alles wird in Ihrem Browser berechnet, funktioniert offline, und Ihre Daten berühren nie einen Server.",
    ],
    steps: [
      "Geben Sie den umzurechnenden Wert ein.",
      "Wählen Sie die Ausgangs- und die Zieleinheit.",
      "Das Ergebnis aktualisiert sich bei der Eingabe — die Tabelle darunter zeigt alle Einheiten auf einen Schlag, oder kopieren Sie das Ergebnis.",
    ],
    faqs: [
      {
        q: "Wie schnell sind 100 km/h in mph?",
        a: "100 km/h = 62,14 mph. Der exakte Faktor ist 1 mph = 1,609344 km/h.",
      },
      {
        q: "Ist dieser Konverter kostenlos?",
        a: "Ja — er läuft vollständig in Ihrem Browser. Keine Grenzen, keine Werbung in den Ergebnissen, keine Anmeldung.",
      },
      {
        q: "Sind die Umrechnungen präzise?",
        a: "Die Umrechnungsfaktoren folgen den internationalen Standarddefinitionen (SI und NIST). Ergebnisse werden mit bis zu 8 signifikanten Stellen angezeigt.",
      },
    ],
  },
  "temperature-converter": {
    name: "Temperatur-Umrechner",
    tagline:
      "Celsius, Fahrenheit und Kelvin in einem Schritt umrechnen — Live-Ergebnisse plus Gefrier- und Siedepunkte als Referenz.",
    intro: [
      "Rechnen Sie Celsius, Fahrenheit und Kelvin in einem Schritt um. Anders als lineare Einheiten brauchen Temperaturskalen Formeln mit Versatz — dieses Tool wendet sie korrekt an, auch bei Werten unter Null.",
      "Gut für Rezepte mit fremden Ofeneinstellungen, Wetterberichte, Laborarbeit und Klimatechnik-Spezifikationen.",
      "Er beherrscht 3 Einheiten — Celsius, Fahrenheit, Kelvin. Alles wird in Ihrem Browser berechnet, funktioniert offline, und Ihre Daten berühren nie einen Server.",
    ],
    steps: [
      "Geben Sie den umzurechnenden Wert ein.",
      "Wählen Sie die Ausgangs- und die Zieleinheit.",
      "Das Ergebnis aktualisiert sich bei der Eingabe — die Tabelle darunter zeigt alle Einheiten auf einen Schlag, oder kopieren Sie das Ergebnis.",
    ],
    faqs: [
      {
        q: "Wie rechnet man Celsius in Fahrenheit um?",
        a: "Mit 9 multiplizieren, durch 5 teilen, dann 32 addieren: °F = °C × 9⁄5 + 32. Zum Beispiel 20 °C = 68 °F. Das Tool rechnet das für Sie und zeigt auch Kelvin.",
      },
      {
        q: "Bei welcher Temperatur sind Fahrenheit und Celsius gleich?",
        a: "Bei −40 Grad: −40 °C = −40 °F. Geben Sie −40 ein und wechseln Sie die Einheiten, um es zu sehen.",
      },
      {
        q: "Sind die Umrechnungen präzise?",
        a: "Die Umrechnungsfaktoren folgen den internationalen Standarddefinitionen (SI und NIST). Ergebnisse werden mit bis zu 8 signifikanten Stellen angezeigt.",
      },
    ],
  },
  "time-converter": {
    name: "Zeiteinheiten-Umrechner",
    tagline:
      "Sekunden, Minuten, Stunden, Tage, Wochen, Monate und Jahre umrechnen — den Monat/Jahr-Vorbehalt klar erläutert.",
    intro: [
      "Rechnen Sie Zeitspannen zwischen Zeiteinheiten um. Weil Kalendermonate und -jahre unterschiedlich lang sind, nutzt dieses Tool die herkömmlichen Durchschnitte (30,44 Tage pro Monat, 365,2425 Tage pro Jahr) und sagt das auch — kein stilles Runden.",
      "Nützlich für Projektschätzungen, Abo-Preisvergleiche, wissenschaftliche Zeitmessung und Countdowns.",
      "Er beherrscht 8 Einheiten — Millisekunde, Sekunde, Minute, Stunde, Tag, Woche, Monat, Jahr. Alles wird in Ihrem Browser berechnet, funktioniert offline, und Ihre Daten berühren nie einen Server.",
    ],
    steps: [
      "Geben Sie den umzurechnenden Wert ein.",
      "Wählen Sie die Ausgangs- und die Zieleinheit.",
      "Das Ergebnis aktualisiert sich bei der Eingabe — die Tabelle darunter zeigt alle Einheiten auf einen Schlag, oder kopieren Sie das Ergebnis.",
    ],
    faqs: [
      {
        q: "Warum hat ein Monat hier 30,44 Tage?",
        a: "Ein Kalendermonat reicht von 28 bis 31 Tagen, die Zeitspannenrechnung nutzt also den Durchschnitt über den gregorianischen Zyklus: 30,4369 Tage. Für exakte Kalenderdatums-Arithmetik nehmen Sie stattdessen den Datumsrechner.",
      },
      {
        q: "Ist dieser Konverter kostenlos?",
        a: "Ja — er läuft vollständig in Ihrem Browser. Keine Grenzen, keine Werbung in den Ergebnissen, keine Anmeldung.",
      },
      {
        q: "Sind die Umrechnungen präzise?",
        a: "Die Umrechnungsfaktoren folgen den internationalen Standarddefinitionen (SI und NIST). Ergebnisse werden mit bis zu 8 signifikanten Stellen angezeigt.",
      },
    ],
  },
  "volume-converter": {
    name: "Volumen-Umrechner",
    tagline:
      "Liter, Gallonen, Cups, Milliliter und Kubikmeter umrechnen — US- und UK-Einheiten klar beschriftet, in Echtzeit.",
    intro: [
      "Rechnen Sie Küchen- und Technik-Volumeneinheiten um, mit ausbuchstabierter US/UK-Unterscheidung: Eine US-Gallone ist 3,785 L, eine UK-Gallone (imperial) ist 4,546 L — 20 % auseinander, das Vermischen ruiniert also Rezepte.",
      "Gebaut fürs Kochen, Brauen, Aquarium-Dosierung, Kraftstoffangaben und Beton-Schätzungen.",
      "Er beherrscht 10 Einheiten — Kubikmeter, Liter, Milliliter, US-Gallone, UK-Gallone, US-Quart, US-Pint, US-Cup, US-Fluid-Ounce, Kubikfuß. Alles wird in Ihrem Browser berechnet, funktioniert offline, und Ihre Daten berühren nie einen Server.",
    ],
    steps: [
      "Geben Sie den umzurechnenden Wert ein.",
      "Wählen Sie die Ausgangs- und die Zieleinheit.",
      "Das Ergebnis aktualisiert sich bei der Eingabe — die Tabelle darunter zeigt alle Einheiten auf einen Schlag, oder kopieren Sie das Ergebnis.",
    ],
    faqs: [
      {
        q: "Ist eine US-Gallone dasselbe wie eine UK-Gallone?",
        a: "Nein. 1 US-Gallone = 3,785 L, 1 UK-Gallone = 4,546 L. Der Konverter listet beide getrennt, Sie wählen also immer die richtige.",
      },
      {
        q: "Ist dieser Konverter kostenlos?",
        a: "Ja — er läuft vollständig in Ihrem Browser. Keine Grenzen, keine Werbung in den Ergebnissen, keine Anmeldung.",
      },
      {
        q: "Sind die Umrechnungen präzise?",
        a: "Die Umrechnungsfaktoren folgen den internationalen Standarddefinitionen (SI und NIST). Ergebnisse werden mit bis zu 8 signifikanten Stellen angezeigt.",
      },
    ],
  },
  "weight-converter": {
    name: "Gewichts-Umrechner",
    tagline:
      "Kilogramm, Pfund, Unzen, Stone und Gramm sofort umrechnen — 8 Gewichtseinheiten, kostenlos, privat, offline-fähig.",
    intro: [
      "Wechseln Sie an einem Ort zwischen metrischen und imperialen Gewichtseinheiten: Kilogramm, Pfund, Unzen, Stone, Karat und mehr, alle bei jeder Eingabe neu berechnet.",
      "Praktisch beim Kochen fremder Rezepte, beim Prüfen von Gepäcklimits, im Trainingsjournal und bei Versandberechnungen.",
      "Er beherrscht 8 Einheiten — Tonne, Kilogramm, Gramm, Milligramm, Pfund (lb), Unze (oz), Stone, Karat. Alles wird in Ihrem Browser berechnet, funktioniert offline, und Ihre Daten berühren nie einen Server.",
    ],
    steps: [
      "Geben Sie den umzurechnenden Wert ein.",
      "Wählen Sie die Ausgangs- und die Zieleinheit.",
      "Das Ergebnis aktualisiert sich bei der Eingabe — die Tabelle darunter zeigt alle Einheiten auf einen Schlag, oder kopieren Sie das Ergebnis.",
    ],
    faqs: [
      {
        q: "Wie viele Pfund sind 1 kg?",
        a: "Ein Kilogramm sind 2,20462 Pfund (exakt: 1 lb = 0,45359237 kg). Geben Sie oben 1 kg → lb ein, um es zu sehen.",
      },
      {
        q: "Wie viel ist ein Stone in kg?",
        a: "Ein Stone (in Großbritannien für Körpergewicht üblich) sind 6,35029318 Kilogramm — exakt 14 Pfund.",
      },
      {
        q: "Sind die Umrechnungen präzise?",
        a: "Die Umrechnungsfaktoren folgen den internationalen Standarddefinitionen (SI und NIST). Ergebnisse werden mit bis zu 8 signifikanten Stellen angezeigt.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* Taschenrechner                                                      */
  /* ------------------------------------------------------------------ */
  "age-calculator": {
    name: "Altersrechner",
    tagline:
      "Ein exaktes Alter in Jahren, Monaten und Tagen ausrechnen, gelebte Gesamtage und einen Live-Countdown zum nächsten Geburtstag — kalendergenau.",
    intro: [
      "Geben Sie ein Geburtsdatum ein, und dieser Rechner meldet das exakte Alter — Jahre, Monate und Tage, keine Näherung — plus Gesamtmonate und gelebte Gesamtage. Er zählt zudem zum nächsten Geburtstag herunter, samt Wochentag.",
      "Das Feld „Alter am Datum“ ist auf heute voreingestellt und auf jedes vergangene oder zukünftige Datum änderbar — so beantworten Sie leicht Fragen wie „wie alt war sie am Tag der Graduierung?“.",
    ],
    steps: [
      "Wählen Sie das Geburtsdatum.",
      "Lassen Sie das Alter-am-Datum auf heute, oder ändern Sie es auf ein anderes Datum.",
      "Lesen Sie das exakte Alter, Gesamtmonate und -tage sowie den Countdown zum nächsten Geburtstag.",
    ],
    faqs: [
      {
        q: "Wie wird das Alter in Jahren, Monaten und Tagen berechnet?",
        a: "Mit Kalenderarithmetik, nicht mit einer durchschnittlichen Monatslänge: Jahre und Monate werden ganz gezählt, übrige Tage gegen die tatsächliche Monatslänge gemessen — Schaltjahre inklusive. Wer am 29. Februar geboren ist, zählt in Nicht-Schaltjahren am 1. März ein Jahr älter.",
      },
      {
        q: "Kann ich ein Alter an einem Datum in Vergangenheit oder Zukunft berechnen?",
        a: "Ja. Das Feld „Alter am Datum“ ist editierbar — Sie berechnen also ein historisches Alter oder sehen, wie alt jemand bei einem künftigen Ereignis sein wird. Das Geburtsdatum darf nicht nach dem Vergleichsdatum liegen.",
      },
      {
        q: "Warum zählt die Gesamt-Tage-Zahl?",
        a: "Gelebte Gesamtage sind die Kennzahl für Meilensteine der Art „Tage auf der Erde“ und für Systeme, die Alter in Tagen speichern. Berechnet wird aus Kalenderdaten in UTC, sodass Sommerzeit-Verschiebungen die Zahl nicht um eins verhunzen können.",
      },
    ],
  },
  "aspect-ratio-calculator": {
    name: "Seitenverhältnis-Rechner",
    tagline:
      "Bei einem Verhältnis wie 16:9 und einer Dimension sofort fehlende Breite oder Höhe erhalten — plus Voreinstellungen von 1:1 bis 21:9 für Video und Design.",
    intro: [
      "Geben Sie ein Verhältnis ein — tippen Sie eine Voreinstellung an (1:1, 4:3, 3:2, 16:9, 16:10, 21:9) oder tragen Sie eigene Zahlen ein —, dann nennen Sie eine bekannte Breite oder Höhe. Die fehlende Dimension erscheint sofort, zusammen mit dem Paar als B×H formatiert und dem dezimalen Verhältnis.",
      "Das klassische Skalieren ohne Verzerrung: Videoschnitte, responsive Bildcontainer, Sensor- und Filmformate, Druckskalierung und CSS-object-fit-Entscheidungen wohnen alle hier, lokal berechnet bei jeder Eingabe.",
    ],
    steps: [
      "Wählen Sie eine Verhältnis-Voreinstellung oder tippen Sie eigene Breite:Höhe-Werte ein.",
      "Wählen Sie, welche Dimension Sie kennen — Breite oder Höhe.",
      "Geben Sie den bekannten Wert ein und lesen Sie die fehlende Dimension ab.",
    ],
    faqs: [
      {
        q: "Wie wird die fehlende Dimension berechnet?",
        a: "Per direkter Proportion: bekannte Dimension × (Zielseite ÷ zugehörige Verhältnisseite). Bei 16:9 und Breite 1920 ist die Höhe = 1920 × 9 ÷ 16 = 1080. Das Ergebnis wird gerundet gezeigt, darunter der exakte Dezimalwert.",
      },
      {
        q: "Warum ist 16:9 gegen 16:10 so wichtig für Bildschirme?",
        a: "16:9 passt zu Video (1920×1080, 3840×2160) und den meisten Monitoren; 16:10 bietet vertikalen Raum für Dokumente und Code (1920×1200). Die falsche Wahl bedeutet Letterboxing oder gestreckte Pixel — dieses Tool zeigt exakt, was jedes Verhältnis liefert.",
      },
      {
        q: "Kann ich dezimale oder ungewöhnliche Verhältnisse nutzen?",
        a: "Ja. Beide Verhältnisfelder akzeptieren jede positive Zahl — 2.39:1-Kinoscope, 1.85:1, 4:5-Hochformat-Crops fürs Social Web oder Sensoren wie 1.5:1 funktionieren alle, die Proportionsmathematik ist identisch.",
      },
    ],
  },
  "barcode-generator": {
    name: "Barcode-Generator",
    tagline:
      "Scannbare CODE128-, EAN-13- und UPC-A-Barcodes erzeugen, mit einstellbarer Strichbreite und -höhe — Vektor-SVG-Ausgabe, gerendert in Ihrem Browser.",
    intro: [
      "Tippen Sie einen Wert ein, wählen Sie eine Symbologie und erhalten einen verkaufsfertigen Barcode mit optionaler menschenlesbarer Zeile darunter. CODE128 verarbeitet beliebige Buchstaben, Ziffern und Symbole für Bestandsetiketten; EAN-13 und UPC-A prüfen und vervollständigen die Prüfziffer automatisch für Produktpackungen.",
      "Das Rendern nutzt die JsBarcode-Bibliothek in Ihrem Browser und gibt eine skalierbare SVG aus — dieselbe Datei druckt also scharf auf ein 12-mm-Etikett oder ein A4-Blatt. Nichts wird hochgeladen, keine Codes gespeichert.",
    ],
    steps: [
      "Geben Sie den Barcode-Wert ein — Buchstaben/Ziffern für CODE128, 12 Ziffern für EAN-13, 11 für UPC-A.",
      "Wählen Sie das Format und justieren Sie Strichbreite und -höhe.",
      "Laden Sie die SVG zum Drucken herunter oder importieren Sie sie in Ihr Designtool.",
    ],
    faqs: [
      {
        q: "Warum wird meine EAN-13-Eingabe abgelehnt?",
        a: "EAN-13 braucht exakt 12 Ziffern (die 13. Prüfziffer wird automatisch berechnet) oder alle 13 Ziffern mit gültiger finaler Prüfziffer. UPC-A will entsprechend 11 Ziffern. Buchstaben, Leerzeichen oder die falsche Ziffernzahl werden mit der Fehlermeldung der Bibliothek abgelehnt.",
      },
      {
        q: "Welches Format nehme ich für Handelsprodukte?",
        a: "EAN-13 in der meisten Welt, UPC-A in den USA und Kanada — beides GS1-Handelsstandards, die Kassenscanner erwarten. CODE128 nutzen Sie für interne Bestands-, Asset- und Versandetiketten, wo keine GS1-Nummer existiert.",
      },
      {
        q: "Welche Auflösung hat die Ausgabe?",
        a: "Der Download ist eine Vektor-SVG und skaliert also auf jede DPI ohne Unschärfe. Halten Sie die Ruhezonen (die leeren Ränder an beiden Seiten) intakt — das Abschneiden ist der häufigste Grund für unlesbare Scans.",
      },
    ],
  },
  "binary-converter": {
    name: "Binär-Konverter",
    tagline:
      "Zwischen Dezimal, Hexadezimal, Oktal und Binär in einem Live-Raster umrechnen — beliebig große Ganzzahlen, mit Gruppierung für die Lesbarkeit.",
    intro: [
      "Tippen Sie eine Zahl in eines der vier Felder — Dezimal, Hex, Oktal oder Binär —, und die anderen drei aktualisieren sich sofort. Hexwerte gruppieren je zwei Ziffern, Binär je vier, lange Bitmuster bleiben also lesbar.",
      "Die Konvertierung nutzt BigInt-Arithmetik — es gibt also keine 32- oder 64-Bit-Grenze: Fügen Sie eine 40-stellige Dezimalzahl oder einen vollen 256-Bit-Hexstring ein, und jede Darstellung bleibt exakt.",
    ],
    steps: [
      "Tippen oder fügen Sie einen Wert in ein beliebiges Feld ein — Dezimal, Hex, Oktal oder Binär.",
      "Die anderen drei Basen aktualisieren sich live bei der Eingabe.",
      "Präfixe wie 0x sind optional; Gruppierungsleerzeichen beim Parsen werden ignoriert.",
    ],
    faqs: [
      {
        q: "Wie große Zahlen verträgt dieser Konverter?",
        a: "Beliebig große nichtnegative Ganzzahlen. Die Berechnung nutzt BigInt, ein 256-Bit-Hexwert konvertiert also exakt — weit über der 2^53-Grenze normaler JavaScript-Zahlen hinaus.",
      },
      {
        q: "Warum zeigt mein Hex-Buchstabeneingabe als ungültig?",
        a: "Jede Basis akzeptiert nur ihre eigenen Ziffern: Binär nimmt 0–1, Oktal 0–7, Dezimal 0–9 und Hexadezimal 0–9 plus a–f. Ein verirrtes Leerzeichen oder Symbol innerhalb der Zahl wird ebenfalls abgelehnt.",
      },
      {
        q: "Werden negative Zahlen oder Brüche unterstützt?",
        a: "Nein — dieses Raster konvertiert ganze nichtnegative Werte, genau das sind Bitmuster, Hashes und Speicheradressen. Vorzeichenbehaftete und gebrochene Formate hängen von Kodierungsentscheidungen (Zweierkomplement, IEEE 754) ab, die die Zuordnung mehrdeutig machen würden.",
      },
    ],
  },
  "bmi-calculator": {
    name: "BMI-Rechner",
    tagline:
      "Body-Mass-Index aus metrischen oder imperialen Eingaben berechnen und genau sehen, wo der Wert in den offiziellen WHO-Gewichtskategorien landet.",
    intro: [
      "Geben Sie Größe und Gewicht in Zentimetern und Kilogramm ein, oder Fuß, Zoll und Pfund, und der Rechner zeigt Ihren Body-Mass-Index auf eine Dezimalstelle zusammen mit der WHO-Kategorie — Untergewicht, Normalgewicht, Übergewicht oder Fettleibigkeit —, mit hervorgehobener Zeile in der Referenztabelle.",
      "Das Ergebnis aktualisiert sich bei jeder Eingabe, Sie sehen also leicht, wie ein paar Kilogramm Sie zwischen Bändern bewegen. BMI ist ein Screening-Maß, keine Diagnose: Er unterscheidet nicht Muskeln von Fett.",
    ],
    steps: [
      "Wählen Sie metrische Einheiten (cm + kg) oder imperiale (ft + in + lb).",
      "Tippen Sie Ihre Größe und Ihr Gewicht ein.",
      "Lesen Sie Ihren BMI, seine WHO-Kategorie und die vollständige Referenztabelle.",
    ],
    faqs: [
      {
        q: "Welche WHO-BMI-Bereiche gibt es?",
        a: "Die Weltgesundheitsorganisation definiert: unter 18,5 Untergewicht, 18,5–24,9 Normalgewicht, 25,0–29,9 Übergewicht und ab 30,0 Fettleibigkeit. Dieselben Grenzen gelten für erwachsene Männer und Frauen.",
      },
      {
        q: "Wie wird der BMI berechnet?",
        a: "BMI ist das Gewicht in Kilogramm geteilt durch die Größe in Metern zum Quadrat (kg/m²). Bei imperialen Einheiten rechnet das Tool Fuß, Zoll und Pfund intern um — das Ergebnis ist also auf beiden Wegen identisch.",
      },
      {
        q: "Warum passt BMI nicht für Athleten?",
        a: "Muskeln sind dichter als Fett, sehr muskulöse Menschen können also „übergewichtig“ abschneiden, obwohl sie kaum Überschussfett tragen. Behandeln Sie BMI als schnelles, bevölkerungsbezogenes Screening und kombinieren Sie ihn mit Taillenumfang oder Körperzusammensetzung.",
      },
    ],
  },
  "color-converter": {
    name: "Farbkonverter",
    tagline:
      "Eine Farbe in hex, rgb() oder hsl() einfügen und alle drei Formate plus eine fertige Reihe Tints und Shades für Ihr Designsystem erhalten.",
    intro: [
      "Füttern Sie ihn mit #0071e3, rgb(0, 113, 227) oder hsl(211, 100%, 45%) — der Parser erkennt das Format automatisch und gibt Hex, RGB und HSL auf einmal aus, jeweils mit Ein-Klick-Kopieren.",
      "Unter den Werten mischt eine Tint-und-Shade-Reihe Ihre Farbe bei 20/40/60/80 %-Stufen mit Weiß und Schwarz: sofortige Hover-Zustände, Ränder und Dark-Mode-Varianten, ohne ein Designtool zu öffnen.",
    ],
    steps: [
      "Fügen Sie eine Farbe in einem der drei Formate ein — hex, rgb() oder hsl().",
      "Lesen Sie die konvertierten Werte und kopieren Sie den, den Sie brauchen.",
      "Nehmen Sie Tints und Shades aus der Farbfeldreihe darunter.",
    ],
    faqs: [
      {
        q: "Wie wird HSL zu RGB konvertiert?",
        a: "Über die standardmäßige zylindrische RGB-Zuordnung: Chromatizität c = (1 − |2L − 1|) × S, ein Zwischenwert x aus dem Farbtonsektor, dann wird jeder Kanal um m = L − c/2 verschoben. Die Mathematik sind die Lehrbuchformeln, die Ergebnisse treffen also Designtools.",
      },
      {
        q: "Warum wird mein Farbcode als ungültig angezeigt?",
        a: "Akzeptierte Formen sind #RGB / #RRGGBB, rgb(r, g, b) und hsl(h, s%, l%). Kanäle müssen im Bereich liegen (0–255 für RGB, 0–360 für den Farbton, 0–100 % für den Rest), getrennt durch Komma oder Leerzeichen.",
      },
      {
        q: "Wofür sind Tints und Shades gut?",
        a: "Tints (mit Weiß gemischt) ergeben Hover-Hintergründe, Badges und Karten; Shades (mit Schwarz gemischt) ergeben gedrückte Zustände, Ränder und Dark-Mode-Oberflächen. Beide aus einer Markenfarbe abzuleiten hält jeden UI-Zustand visuell konsistent.",
      },
    ],
  },
  "color-picker": {
    name: "Farbwähler",
    tagline:
      "Eine Farbe aus dem Farbfeld wählen oder direkt vom Bildschirm greifen, mit der EyeDropper-API — hex, RGB und HSL in einem Klick kopiert.",
    intro: [
      "Klicken Sie auf das Farbfeld, um eine Farbe visuell zusammenzustellen, oder — in Chromium-Browsern — nutzen Sie Vom Bildschirm wählen, um jedes bereits sichtbare Pixel zu sampeln. Der gewählte Wert erscheint gleichzeitig als hex, rgb() und hsl(), jeweils mit eigener Kopiertaste.",
      "Das Sampling nutzt die eingebaute EyeDropper-API des Browsers und liest das Pixel lokal; nichts wird aufgezeichnet, hochgeladen oder gespeichert. Auf Browsern ohne die API hält das Farbfeld alles am Laufen.",
    ],
    steps: [
      "Klicken Sie auf das Farbfeld und wählen Sie eine Farbe, oder nutzen Sie Vom Bildschirm wählen, wo verfügbar.",
      "Lesen Sie die hex-, RGB- und HSL-Werte unter der Vorschau.",
      "Klicken Sie neben dem benötigten Format auf Kopieren.",
    ],
    faqs: [
      {
        q: "Warum erscheint „Vom Bildschirm wählen“ nicht?",
        a: "Die EyeDropper-API gibt es derzeit in Chromium-Browsern (Chrome, Edge, Brave, Opera). Firefox und Safari exponieren sie noch nicht — diese Browser zeigen daher nur das Farbfeld, alles andere funktioniert identisch.",
      },
      {
        q: "Worin unterscheiden sich hex, RGB und HSL?",
        a: "Sie beschreiben dieselbe Farbe auf drei Arten: hex packt Rot-Grün-Blau in #RRGGBB für CSS und Designtools; rgb() nennt die drei Kanäle numerisch; hsl() drückt Farbton, Sättigung und Helligkeit aus — leichter, um Paletten und Hover-Zustände von Hand zu bauen.",
      },
      {
        q: "Ist das Bildschirm-Sampling privat?",
        a: "Ja. Die EyeDropper-API zeigt einen Systemwähler und liefert nur das eine Pixel zurück, auf das Sie klicken; das Lesen geschieht in Ihrem Browser, und kein Screenshot, keine Historie, kein Wert wird übertragen oder gespeichert.",
      },
    ],
  },
  "compound-interest-calculator": {
    name: "Zinseszinsrechner",
    tagline:
      "Sehen, wie Ersparnisse mit Zinseszins wachsen — Einlage, monatliche Beiträge und Zinssatz eingeben und Endsaldo plus Tabelle Jahr für Jahr erhalten.",
    intro: [
      "Zinseszins ist Zins auf Zins: Jede Periode erwirtschaftet das Guthaben einen Anteil des Jahreszinses, und jede Einlage, die Sie ergänzen, beginnt ebenfalls, eigenen Zins zu verdienen. Dieser Rechner führt diese Rekursion Perioden für Perioden durch — für eine Anfangseinlage plus regelmäßige monatliche Beiträge, bei monatlicher, quartalsweiser oder jährlicher Verzinsung.",
      "Das Ergebnis ist das Endsaldo, die Summe Ihrer Einzahlungen und der Zins, den der Zinseszinseffekt erzeugte — plus eine Tabelle Jahr für Jahr, damit Sie genau sehen, wann die Kurve zu biegen beginnt. Alles rechnet live, und die benutzte Formel steht direkt unter den Zahlen, damit Sie sie mit der Projektion Ihrer Bank abgleichen können.",
    ],
    steps: [
      "Geben Sie die Anfangseinlage und den monatlich ergänzten Betrag ein (0 für eine Einmalanlage).",
      "Setzen Sie den Jahreszinssatz, die Laufzeit in Jahren und wie oft verzinst wird.",
      "Wählen Sie eine Anzeige-Währung — Beträge werden für Ihre Sprachumgebung formatiert.",
      "Lesen Sie Endsaldo, Gesamteinzahlungen und Zinsertrag und prüfen Sie die Tabelle Jahr für Jahr.",
    ],
    faqs: [
      {
        q: "Welche Formel nutzt der Rechner?",
        a: "Dieselbe Guthaben-Rekursion, mit der Banken Ersparnisse projizieren: pro Periode Guthaben ← (Guthaben + Beitrag) × (1 + r), wobei r = Jahreszins ÷ Perioden pro Jahr (12 monatlich, 4 quartalsweise, 1 jährlich). Beiträge werden zu Beginn jeder Periode eingezahlt und verzinsen sich ab dieser Periode. Beispiel: 10.000 Anfang, 100/Monat bei 5 % über 10 Jahre mit monatlicher Verzinsung ergibt ein Endsaldo von 32.063,02 — 22.000,00 eingezahlt und 10.063,02 Zins.",
      },
      {
        q: "Warum erhalte ich auf anderen Rechnern leicht andere Ergebnisse?",
        a: "Die Zeitpunkte der Konventionen unterscheiden sich. Manche Tools behandeln Beiträge als Periodenende-Einzahlungen (sie verzinsen sich in ihrer Ankunftsperiode nicht), manche nehmen tägliche Verzinsung an, manche runden jede Periode. Dieses Tool zahlt zu Periodenbeginn ein und rundet nie zwischendurch; eine 0,1-%-Differenz zu einer anderen Site ist meist diese Konvention, kein Fehler.",
      },
      {
        q: "Enthält das Ergebnis Steuern, Gebühren oder Inflation?",
        a: "Nein — das Ergebnis ist nominales Wachstum zum eingegebenen Satz. Zinssteuern, Kontogebühren und Inflation senken alle den realen Ertrag, behandeln Sie das Endsaldo also als Obergrenze dessen, was Sie tatsächlich behalten.",
      },
    ],
  },
  "currency-converter": {
    name: "Währungsrechner",
    tagline:
      "Über 160 Weltwährungen mit aktuellen Mittelkursen umrechnen — einmal online geladen, privat in Ihrem Browser berechnet und zwischengespeichert.",
    intro: [
      "Wechselkurse werden einmal vom freien, schlüssellosen Dienst open.er-api.com geladen und eine Stunde auf Ihrem Gerät zwischengespeichert — Wiederholungsumrechnungen sind also sofort und funktionieren offline. Die Arithmetik, die Ihren Betrag in eine andere Währung verwandelt, passiert lokal in Ihrem Browser.",
      "Tippen Sie einen Betrag ein, wählen Sie zwei Währungen aus der durchsuchbaren Liste von 160+ und lesen Sie das Ergebnis plus die Live-Kurszeile. Eingebene Beträge werden nie übertragen — nur die anonyme Kurstabelle wird heruntergeladen.",
    ],
    steps: [
      "Geben Sie den umzurechnenden Betrag ein.",
      "Wählen Sie Quell- und Zielwährung — gängige stehen oben.",
      "Lesen Sie das umgerechnete Ergebnis und den exakten Kurs; nutzen Sie Kurse aktualisieren für die neuesten Daten.",
    ],
    faqs: [
      {
        q: "Wie oft aktualisieren sich die Wechselkurse?",
        a: "Die open.er-api.com-Tabelle frischt sich etwa einmal pro Tag auf, und dieses Tool cacht sie eine Stunde in Ihrem Browser, bevor sie neu geladen wird. Drücken Sie jederzeit „Kurse aktualisieren“, um sofort die neueste Tabelle zu ziehen.",
      },
      {
        q: "Sendet die Nutzung dieses Tools meine Daten online?",
        a: "Keine Beträge werden jemals irgendwohin gesendet. Die einzige Netzanfrage lädt einmal pro Stunde eine anonyme, öffentliche Kurstabelle (USD-Basis); die Umrechnungsmathematik läuft lokal in Ihrem Browser und funktioniert aus dem Cache sogar offline.",
      },
      {
        q: "Sind das die Kurse, die meine Bank gibt?",
        a: "Das sind Mittelkurs-Referenzwerte — die Mitte zwischen An- und Verkaufspreisen, mit denen Banken handeln. Kartenorganisationen und Banken legen typisch 1–3 % Spanne oder Gebühr oben drauf.",
      },
    ],
  },
  "date-calculator": {
    name: "Datumsrechner",
    tagline:
      "Tage zwischen zwei Daten in Jahren, Monaten und Tagen — oder Tage zu einem Datum addieren und subtrahieren —, mit exakt behandelten Schaltjahren.",
    intro: [
      "Zwei Alltagsdatumsprobleme an einem Ort: die Lücke zwischen zwei Daten messen (kalendergenau J/M/T, Gesamtage, Wochen und Resttage), oder von einem Basisdatum N Tage vor- oder zurückgehen und das Ergebnisdatum samt Wochentag erhalten.",
      "Weil die Arithmetik echte Kalendermathematik ist — kein Durchschnittsmonat —, kommen ein Schalttags-Geburtstag, ein 31-Tage-Monat oder eine Februar-Spanne exakt richtig heraus, ganz ohne Server.",
    ],
    steps: [
      "Wählen Sie Differenz zwischen Daten oder Tage addieren / subtrahieren.",
      "Geben Sie die zwei Daten ein — oder ein Basisdatum und eine Tageszahl.",
      "Lesen Sie die exakte Aufschlüsselung und das Ergebnisdatum samt Wochentag.",
    ],
    faqs: [
      {
        q: "Wie wird die Jahre/Monate/Tage-Differenz berechnet?",
        a: "So, wie Menschen Jahrestage zählen: volle Jahre, dann volle Monate, dann übrige Tage gegen die echten Längen der beteiligten Monate gemessen. Der 29. Februar gilt als letzter Februar-Tag, Spannen über Schaltjahre bleiben also ehrlich.",
      },
      {
        q: "Bedeutet „90 Tage addieren“ Arbeitstage?",
        a: "Nein — die Tageszahl sind Kalendertage inklusive Wochenenden. Für Vertragsfristen, die Arbeitstage zählen, addieren Sie grob 5 Tage pro Wochen-Spanne als erste Näherung oder nutzen ein dediziertes Arbeitstags-Tool.",
      },
      {
        q: "Werden die eingegebenen Daten irgendwohin gesendet?",
        a: "Nein. Beide Modi laufen vollständig in Ihrem Browser mit JavaScripts Datumsarithmetik; nichts wird hochgeladen und nichts gespeichert.",
      },
    ],
  },
  "discount-calculator": {
    name: "Rabattrechner",
    tagline:
      "Preis plus einen oder zwei gestapelte Rabatte eingeben: Endpreis, gespartes Geld und die echte kombinierte Prozentzahl — ausgerechnet bei jeder Eingabe.",
    intro: [
      "Geben Sie den Originalpreis und einen Rabattprozentsatz ein und sehen sofort, was Sie tatsächlich zahlen und wie viel Sie sparen. Ein zweiter, optionaler Rabatt behandelt den Fall „extra 10 % auf die Sales-Preise“, der Käufer regelmäßig stolpern lässt.",
      "Gestapelte Rabatte werden nacheinander angewendet, und das Tool zeigt die wirksame Gesamtrate — denn 20 % + 10 % sind 28 % Rabatt, nicht 30 %, ein Unterschied, der sich bei großen Anschaffungen summiert.",
    ],
    steps: [
      "Tippen Sie den Originalpreis ein.",
      "Geben Sie den Rabattprozentsatz ein — und optional einen zweiten, gestapelten.",
      "Lesen Sie den Endpreis, den gesparten Betrag und den wirksamen Rabatt ab.",
    ],
    faqs: [
      {
        q: "Warum ist 20 % + 10 % nicht dasselbe wie 30 % Rabatt?",
        a: "Der zweite Rabatt greift auf den bereits reduzierten Preis, nicht auf den Originalpreis: 100 → 80 (−20 %) → 72 (−10 %), insgesamt also 28 %. Der Rechner zeigt diese wirksame Rate, damit Sie Angebote fair vergleichen.",
      },
      {
        q: "Wie finde ich den Originalpreis aus einem Sale-Preis?",
        a: "Teilen Sie den Sale-Preis durch (1 − Rabatt ÷ 100). Ein Preis von 72 nach 28 % Rabatt stammt aus 72 ÷ 0,72 = 100. Oder nutzen Sie den Prozentrechner im Modus „X ist wie viel % von Y“, um es Schritt für Schritt auszurechnen.",
      },
      {
        q: "Rechnet das mit MwSt oder Umsatzsteuer?",
        a: "Nein — es arbeitet mit den Preisen, die Sie eintippen. Zeigt der Schilderpreis eine Steuer-enthaltene Summe, ist das Rabattergebnis ebenfalls steuer-enthalten. Um mit Steuer zu kombinieren, schicken Sie den rabattierten Preis durch den MwSt- oder GST-Rechner.",
      },
    ],
  },
  "emi-calculator": {
    name: "EMI-Rechner",
    tagline:
      "Die feste monatliche EMI für jeden Kredit berechnen — Darlehenssumme, Zinssatz und Laufzeit hinein, Gesamtzins und Gesamtrückzahlung heraus, sofort.",
    intro: [
      "Geben Sie Darlehenssumme, Jahreszinssatz und Laufzeit in Jahren oder Monaten ein und erhalten die monatliche Rate plus den Gesamtzins über die Kreditlaufzeit. Die Mathematik ist die Standardformel des abnehmenden Guthabens, wie Banken und Finanzierer sie nutzen.",
      "Justieren Sie eine beliebige Eingabe, und alles rechnet live — vergleichen Sie so einen 15-Jahres-Kredit mit einem 20-Jahres-Kredit oder sehen Sie exakt, was ein Zinssatz von plus 0,5 % Sie pro Monat kostet.",
    ],
    steps: [
      "Tippen Sie die Darlehenssumme ein.",
      "Geben Sie den Jahreszinssatz und die Laufzeit in Jahren oder Monaten ein.",
      "Lesen Sie die monatliche EMI, den Gesamtzins und die Gesamtrückzahlung ab.",
    ],
    faqs: [
      {
        q: "Welche Formel nutzt der EMI-Rechner?",
        a: "Die Standardformel des abnehmenden Guthabens: EMI = P × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1), wobei P die Darlehenssumme ist, r der monatliche Zinssatz (Jahreszins ÷ 12 ÷ 100) und n die Monatszahl. Dieselbe Gleichung nutzen Banken für Immobilien-, Auto- und Privatkredite.",
      },
      {
        q: "Warum ist der Gesamtzins zu Beginn des Kredits so hoch?",
        a: "Der Zins wird jeden Monat auf das Restguthaben erhoben, das am Anfang am größten ist. Frühe Raten sind also fast nur Zins mit wenig Tilgung; das Gemisch kippt, je kleiner das Guthaben wird. Vorabzahlungen am Anfang sparen deshalb deutlich mehr Zins als späte.",
      },
      {
        q: "Sind Gebühren und Versicherungen in der EMI enthalten?",
        a: "Nein. Bearbeitungsgebühren, Versicherungen und Zinsänderungen bei variablen Produkten sind ausgeschlossen — das Ergebnis ist die reine Tilgungs-EMI für den eingegebenen Satz. Ihr Kreditgeber zeigt den endgültig zahlbaren Betrag in der Zusage.",
      },
    ],
  },
  "fuel-cost-calculator": {
    name: "Kraftstoffkosten-Rechner",
    tagline:
      "Entfernung, Verbrauch und Zapfsäulenpreis eingeben: Kraftstoffbedarf, Fahrtkosten und Kosten pro Kilometer — metrisch oder imperial, mit Rückfahrt.",
    intro: [
      "Planen Sie jede Fahrt, bevor Sie losfahren: Entfernung, Verbrauch Ihres Autos (L/100 km oder MPG) und den aktuellen Kraftstoffpreis eingeben, dann sehen Sie die nötigen Liter oder Gallonen, die Gesamtkosten und die Kosten pro Entfernungseinheit — plus einen Hin-und-Rück-Schalter, der die Entfernung für Sie verdoppelt.",
      "Gleich gut für Pendlerbudgets, das Aufteilen der Kosten eines Roadtrips auf Freunde oder den Preisvergleich eines Umwegs. Die Mathematik bleibt in Ihrem Browser, es funktioniert also auch ohne Empfang an der Zapfsäule.",
    ],
    steps: [
      "Geben Sie die Einweg-Entfernung in Kilometern oder Meilen ein.",
      "Ergänzen Sie den Verbrauch Ihres Fahrzeugs und den aktuellen Kraftstoffpreis.",
      "Schalten Sie bei Bedarf die Rückfahrt um und lesen Sie Kraftstoff- und Kostensummen ab.",
    ],
    faqs: [
      {
        q: "Wie rechne ich zwischen L/100 km und MPG um?",
        a: "Die beiden Skalen sind Kehrwerte: 235,2 geteilt durch den MPG-Wert ergibt L/100 km (US-Gallonen) — 30 MPG ≈ 7,8 L/100 km und 6 L/100 km ≈ 39,2 MPG. Der Rechner nimmt beide Angaben, je nachdem, was Ihr Armaturenbrett zeigt.",
      },
      {
        q: "Warum weicht mein realer Kraftstoffverbrauch vom Ergebnis ab?",
        a: "Offizielle Verbrauchsangaben gehen von konstanten Geschwindigkeiten aus. Stadtverkehr, Kaltstarts, Dachgepäckträger, aggressive Beschleunigung und Klimaanlage können den realen Verbrauch um 10–30 % nach oben treiben — die Schätzung ist also eine Untergrenze für stadtlastige Fahrten.",
      },
      {
        q: "Enthält der Rechner Maut oder Wartung?",
        a: "Nein — er kalkuliert nur den Kraftstoff. Für echte Kosten pro Kilometer addieren Sie Maut separat und verteilen Verschleiß (Reifen, Wartung, Wertverlust) gesondert; viele Fahrer budgetieren neben dem Kraftstoff 5–10 Cent extra pro km.",
      },
    ],
  },
  "gst-calculator": {
    name: "GST-Rechner",
    tagline:
      "GST zu den Stufensätzen 5 %, 12 %, 18 % und 28 % hinzufügen oder herausrechnen — Nettobetrag, Steuer und Bruttobetrag live im Browser berechnet.",
    intro: [
      "Geben Sie einen beliebigen Betrag ein und wählen Sie eine der vier indischen GST-Stufen, um eine Steuer auf einen Nettopreis zu schlagen, oder die bereits enthaltene GST aus einem Bruttopreis (MRP) herauszurechnen. Alle drei Zahlen — netto, Steuer, brutto — aktualisieren sich bei jeder Eingabe.",
      "Nützlich für Rechnungen, Reverse-Charge-Prüfungen, Einkaufsvergleiche zwischen Staaten mit unterschiedlichen Stufen und das Verständnis, wie viel von einem Preisschild Steuer ist.",
    ],
    steps: [
      "Tippen Sie den Betrag ein — netto, wenn Sie GST hinzufügen, brutto, wenn Sie ihn herausrechnen.",
      "Wählen Sie die anwendbare Stufe: 5 %, 12 %, 18 % oder 28 %.",
      "Wählen Sie Steuer hinzufügen oder Steuer entfernen und lesen Sie netto, Steuer und brutto ab.",
    ],
    faqs: [
      {
        q: "Welche GST-Stufen gibt es in Indien?",
        a: "Die Hauptsätze sind 5 %, 12 %, 18 % und 28 %: Grundbedarf liegt bei 0–5 %, die meisten Güter und Dienstleistungen bei 12–18 %, Luxus- und „Sin Goods“ bei 28 % (manchmal mit zusätzlicher Cess). Das Tool deckt die vier Standardstufen ab.",
      },
      {
        q: "Wie entferne ich GST aus einem Steuer-enthaltenen Preis?",
        a: "Wählen Sie „Steuer entfernen“ und geben Sie den Bruttobetrag ein. Die Basis ergibt sich als brutto ÷ (1 + Satz/100) — ein Bruttopreis von ₹118 bei 18 % GST hat also ₹100 netto und ₹18 Steuer.",
      },
      {
        q: "Ist GST dasselbe wie VAT?",
        a: "Beide sind mehrwertsteuerartige Abgaben, die an jeder Stufe anfallen, aber die indische GST ist eine einzige vereinheitlichte Steuer, die zentrale Verbrauchsteuer, Servicesteuer und Landes-VAT zusammenfasst — aufgeteilt in CGST + SGST (innerhalb eines Staates) oder IGST (zwischen Staaten). Andere Länder nennen ihr Äquivalent schlicht VAT.",
      },
    ],
  },
  "loan-calculator": {
    name: "Kreditrechner",
    tagline:
      "Das ganze Bild eines Kredits sehen: monatliche Rate, Gesamtzins und eine jährliche Tilgungstabelle mit Aufteilung von Zins und Tilgung.",
    intro: [
      "Alles, was die EMI-Ansicht liefert — monatliche Rate, Gesamtzins, Gesamtrückzahlung —, plus ein jährlicher Tilgungsplan, der exakt zeigt, wie viel der Zahlungen eines Jahres Zins und wie viel Tilgung ist, und welches Guthaben am Ende jedes Jahres bleibt.",
      "Der schnellste Weg zu verstehen, warum Sondertilgungen in den frühen Jahren so wertvoll sind: Die Tabelle macht die zinslastigen Jahre unmöglich zu übersehen.",
    ],
    steps: [
      "Geben Sie Darlehenssumme, Jahreszinssatz und Laufzeit in Jahren oder Monaten ein.",
      "Lesen Sie die monatliche Rate, den Gesamtzins und die Gesamtrückzahlung ab.",
      "Blättern Sie durch die jährliche Tabelle, um Tilgung, Zins und Restguthaben pro Jahr zu sehen.",
    ],
    faqs: [
      {
        q: "Was ist ein Tilgungsplan?",
        a: "Eine Aufschlüsselung eines Festratenkredits Periode für Periode. Jede Rate wird in den Zins auf das aktuelle Guthaben und die Tilgung geteilt, die sie abstreitet, und das Guthaben schrumpft jeden Monat. Die Tabelle hier fasst diese Monate zu Jahren zusammen.",
      },
      {
        q: "Wie zahle ich weniger Gesamtzins?",
        a: "Drei Hebel: kürzere Laufzeit, niedrigerer Zinssatz oder Sondertilgungen auf die Darlehenssumme — besonders im ersten Drittel des Kredits, wenn die Guthaben am höchsten sind. Die jährliche Tabelle zeigt exakt, wo sich der Zins konzentriert.",
      },
      {
        q: "Geht der Plan davon aus, dass der Satz sich nie ändert?",
        a: "Ja. Er modelliert einen Festzinskredit für den eingegebenen Satz. Bei variablen Produkten rechnen Sie bei jeder Zinsanpassung neu — jede Anpassung ändert sowohl die Rate als auch den Plan.",
      },
    ],
  },
  "percentage-calculator": {
    name: "Prozentrechner",
    tagline:
      "Drei Prozentprobleme in einem Live-Tool: X % von Y, X sind wie viel Prozent von Y und die Prozentänderung zwischen zwei Werten.",
    intro: [
      "Die drei Fragen, die Menschen tatsächlich stellen: „Was sind 15 % von 200?“, „30 sind wie viel Prozent von 150?“ und „Die Verkäufe stiegen von 480 auf 610 — um wie viel Prozent?“. Ein Klick wechselt den Modus, und die Formel passt sich jedem Fall an.",
      "Die Prozentänderung ist vorzeichenbehaftet und als Anstieg oder Rückgang beschriftet — ein Fall von 500 auf 400 liest sich also klar als −20 %, nicht als verwirrende positive Zahl.",
    ],
    steps: [
      "Wählen Sie den Modus: X % von Y, X sind wie viel % von Y oder %-Änderung.",
      "Tippen Sie die zwei Werte in die zwei Felder ein.",
      "Lesen Sie das Live-Ergebnis — bei Änderungen mit beschrifteter Richtung.",
    ],
    faqs: [
      {
        q: "Wie wird die Prozentänderung berechnet?",
        a: "(Endwert − Anfangswert) ÷ |Anfangswert| × 100. Der Betrag im Nenner bedeutet: Eine Änderung von −50 auf −40 meldet korrekt +20 % statt −20 %. Die Umkehrung (400 → 500) ergibt +25 %, weil sich die Basis ändert.",
      },
      {
        q: "Warum ergibt ein Anstieg um 20 % plus ein Fall um 20 % nicht null?",
        a: "Prozente greifen auf unterschiedlichen Basen: 100 + 20 % = 120, dann 120 − 20 % = 96. Die Nettoänderung: −4 %. Diese Asymmetrie bringt Preisvergleiche und Nachrichtenschlagzeilen gleichermaßen durcheinander.",
      },
      {
        q: "Kann ich negative oder Dezimalzahlen nutzen?",
        a: "Ja. Beide Eingaben akzeptieren Negative und Dezimalen — „−5 % von 80“ oder Prozentpunkte einer Temperaturänderung funktionieren also problemlos.",
      },
    ],
  },
  "profit-calculator": {
    name: "Gewinnrechner",
    tagline:
      "Kosten- und Verkaufspreis eingeben: Gewinn oder Verlust, Marge und Aufschlag in Prozent — die Preiszahlen, die Verkäufer verwechseln, live berechnet.",
    intro: [
      "Geben Sie ein, was ein Artikel Sie kostete und wofür Sie ihn verkaufen, und erhalten den absoluten Gewinn (oder Verlust) plus die zwei Verhältnisse, die jeder Verkäufer braucht: die Marge — Gewinn als Anteil des Verkaufspreises — und den Aufschlag — Gewinn als Anteil der Kosten.",
      "Weil die zwei Verhältnisse unterschiedliche Nenner nutzen, entspricht eine 25-%-Marge einem 33,3-%-Aufschlag; das Tool zeigt beide zusammen, Rechnungen, Angebote und Preisblätter bleiben also konsistent.",
    ],
    steps: [
      "Tippen Sie den Einkaufspreis ein — was Sie bezahlt haben.",
      "Tippen Sie den Verkaufspreis ein — was der Kunde zahlt.",
      "Lesen Sie Gewinn/Verlust, Marge und Aufschlag in Prozent ab.",
    ],
    faqs: [
      {
        q: "Worin unterscheiden sich Marge und Aufschlag?",
        a: "Die Marge ist Gewinn ÷ Verkaufspreis (Anteil am Umsatz); der Aufschlag ist Gewinn ÷ Kosten (Zuschlag auf die Kosten). Ein Produkt, gekauft für 80 und verkauft für 100, hat eine 20-%-Marge und einen 25-%-Aufschlag. Die Verwechslung schrumpft stillschweigend Ihren geplanten Gewinn.",
      },
      {
        q: "Wie setze ich einen Preis aus einer Zielmarge?",
        a: "Teilen Sie die Kosten durch (1 − Zielmarge): Für eine 25-%-Marge bei Kosten von 80 gilt 80 ÷ 0,75 ≈ 106,67. Stattdessen mit dem Aufschlag gesetzt (80 × 1,25 = 100), bleiben Ihnen nur 20 % Marge.",
      },
      {
        q: "Enthält der Rechner Gebühren und Steuern?",
        a: "Er arbeitet mit den zwei Zahlen, die Sie eingeben — Zahlungsabwicklungsgebühren, Versand und Umsatzsteuer erscheinen also nur, wenn Sie sie vorher in Kosten oder Preis einrechnen. Für Steuer-enthaltene Preise: den Betrag durch den MwSt- oder GST-Rechner schicken.",
      },
    ],
  },
  "qr-generator": {
    name: "QR-Code-Generator",
    tagline:
      "Beliebigen Text oder eine URL in einen scharfen QR-Code verwandeln, mit einstellbarer Größe, Farben und Fehlerkorrekturstufe — Download als PNG oder SVG.",
    intro: [
      "Fügen Sie einen Link, ein WLAN-Passwort, eine Telefonnummer oder beliebigen Text ein und sehen Sie zu, wie der QR-Code live bis zu 768 px rendert. Wählen Sie eine Fehlerkorrekturstufe von L (7 %) bis H (30 %), damit der Code auch klein gedruckt oder teilweise verdeckt noch scannt, und wählen Sie Code- und Hintergrundfarbe passend zu Ihrer Marke.",
      "Die Kodierung läuft vollständig in Ihrem Browser mit der qrcode-Bibliothek — das Bild entsteht auf Ihrem Gerät und wird nie hochgeladen. PNG für Bildschirme herunterladen oder eine auflösungsunabhängige SVG für den Druck.",
    ],
    steps: [
      "Tippen oder fügen Sie den zu kodierenden Text oder die URL ein.",
      "Justieren Sie Größe, Fehlerkorrekturstufe und die zwei Farben.",
      "Laden Sie das Ergebnis als PNG (Bildschirme) oder SVG (Druck, jede Größe) herunter.",
    ],
    faqs: [
      {
        q: "Welche Fehlerkorrekturstufe soll ich wählen?",
        a: "M (15 %) ist der Alltagsstandard. Wählen Sie H (30 %) für Codes auf Stoff, Stickern oder unruhigen Hintergründen oder wenn Sie ein Logo in die Mitte setzen wollen — je höher die Stufe, desto mehr Beschädigung übersteht ein Code.",
      },
      {
        q: "Laufen die QR-Codes ab oder enthalten sie Tracking?",
        a: "Nein. Das sind statische Codes: Der kodierte Text steckt im Muster selbst und funktioniert für immer, ohne Dienst dahinter. Keine Weiterleitungen, keine Scan-Zähler, keine Analytik — die Daten sind nur das, was Sie getippt haben.",
      },
      {
        q: "Wird mein Text oder meine URL irgendwo hochgeladen?",
        a: "Nein. Die qrcode-Bibliothek läuft in Ihrem Browser und rendert auf eine lokale Canvas; weder Text noch erzeugtes Bild verlässt Ihr Gerät.",
      },
    ],
  },
  "qr-scanner": {
    name: "QR-Code-Scanner",
    tagline:
      "Einen QR-Code aus jedem Bild oder direkt von der Kamera dekodieren — lokal im Browser gelesen, mit Kopieren und Als-Link-öffnen, nichts hochgeladen.",
    intro: [
      "Werfen Sie einen Screenshot oder ein Foto eines QR-Codes ab, und der Dekoder liest ihn direkt auf der Seite, mit hervorgehobenen erkannten Ecken über dem Bild. Bei einer URL erhalten Sie eine Kopiertaste plus Ein-Klick-Link öffnen; jeder andere Inhalt — WLAN-Zugangsdaten, vCards, einfacher Text — kommt exakt so heraus, wie er kodiert wurde, kopierbereit.",
      "Lieber die Kamera auf den Code richten? Der Live-Modus streamt in ein lokales Videoelement und analysiert Frames im Speicher, bis einer dekodiert, dann stoppt er die Kamera sofort. Weil beide Wege vollständig in Ihrem Browser laufen, werden Bild oder Kamerafeed nie auf einen Server hochgeladen, und nichts wird aufgezeichnet.",
    ],
    steps: [
      "Wählen Sie die Registerkarte „Aus einem Bild“ und werfen Sie ein QR-Code-Foto ab, oder wechseln Sie zu „Live-Kamera“.",
      "Für die Kamera: Kamera starten drücken, die Erlaubnis bestätigen und auf den Code richten.",
      "Lesen Sie den dekodierten Text in der Ergebniskarte.",
      "Kopieren Sie ihn oder öffnen Sie ihn direkt, falls er wie ein Link aussieht.",
    ],
    faqs: [
      {
        q: "Verlassen meine Bilder oder Kameraframes mein Gerät?",
        a: "Nein. Die Dekodierung läuft auf dieser Seite mit der jsqr-Bibliothek, in JavaScript: Hochgeladene Bilder werden aus ihren lokalen Pixeln gelesen, Kameraframes auf eine Canvas im Speicher gezeichnet und dort analysiert. Nichts wird hochgeladen, protokolliert oder gespeichert, und der Kamerastream stoppt, sobald ein Code gefunden ist oder Sie Stopp drücken.",
      },
      {
        q: "Die Kamera startet nicht — was ist los?",
        a: "Meist hat der Browser die Kameraberechtigung für diese Site blockiert; erlauben Sie sie in der Adressleiste und drücken Sie erneut Start. Live-Scanning verlangt zudem eine sichere https-Seite, und falls das Gerät gar keine Kamera hat, sagt das Tool das, statt still zu scheitern.",
      },
      {
        q: "Welche QR-Inhalte kann es lesen?",
        a: "Jeden Standard-QR-Code: URLs, einfachen Text, Telefonnummern, WLAN-Beitrittsstrings, vCard-Kontakte, UPI- oder PIX-Zahlungsstrings und mehr. Das Tool zeigt den rohen dekodierten Inhalt — bei WLAN- oder Zahlungscodes kopieren Sie den Text in die App, die dieses Format verarbeitet.",
      },
    ],
  },
  "random-name-picker": {
    name: "Namensrad",
    tagline:
      "Liste einfügen, das Rad drehen und eine kryptografisch zufällige Ziehung den Gewinner wählen lassen — fair für Klassenräume, Verlosungen und Team-Meetings.",
    intro: [
      "Tippen oder fügen Sie eine Liste von Namen ein, einer pro Zeile, und das Rad füllt sich mit einem farbigen Segment je Name. Drücken Sie SPIN, und es bremst über einige Sekunden ab, bevor es auf dem Gewinner landet — angesagt in großer Schrift, mit Kopiertaste. Zwei Optionen decken die üblichen Fälle ab: doppelte Namen vor der Ziehung entfernen und den Gewinner nach jeder Ziehung entfernen, damit niemand zweimal gewinnt.",
      "Die Ziehung selbst ist nicht die Animation — der Gewinner wird bereits vor dem Start des Rads aus dem kryptografischen Zufallszahlengenerator Ihres Browsers gezogen, jeder Name hat also exakt dieselbe Chance. Eine Ziehungshistorie der Sitzung verfolgt, wer bisher gewählt wurde — praktisch, wenn Sie eine Klasse oder eine Warteschlange von Preisen durcharbeiten.",
    ],
    steps: [
      "Fügen Sie Ihre Namen in das Feld ein, einen pro Zeile (2 bis 100 Namen).",
      "Schalten Sie bei Bedarf das Entfernen von Duplikaten oder von früheren Gewinnern um.",
      "Drücken Sie SPIN und warten Sie, bis das Rad stoppt.",
      "Lesen Sie den Gewinner, kopieren Sie den Namen bei Bedarf und prüfen Sie die Ziehungshistorie darunter.",
    ],
    faqs: [
      {
        q: "Wie zufällig ist die Ziehung wirklich?",
        a: "Der Gewinner wird mit crypto.getRandomValues gewählt, dem kryptografischen Zufallszahlengenerator Ihres Browsers, mit Ablehnungsstichprobe gegen Modulo-Verzerrung. Das ist dieselbe Quelle, die Browser für Sicherheitsschlüssel nutzen — kein pseudozufälliger Kurzschluss —, jeder Eintrag hat also identische Chance. Die Radanimation landet auf dem bereits gezogenen Gewinner; sie kann das Ergebnis nicht ändern.",
      },
      {
        q: "Wie viele Namen fasst das Rad?",
        a: "Von 2 bis 100. Namen werden auf dem Rad mit Auslassungspunkten gekürzt, damit die Segmente lesbar bleiben, aber die Gewinnerkarte zeigt immer den vollen Namen. Ab etwa 60 Namen fallen die Beschriftungen vom Rad ganz weg — die Ziehung selbst bleibt exakt.",
      },
      {
        q: "Kann ich mehrere Gewinner hintereinander ziehen?",
        a: "Ja. Aktivieren Sie „Gewinner nach jeder Ziehung entfernen“, und jede Wahl fällt automatisch aus der Liste — niemand wird zweimal gezogen. Das Historienpanel darunter hält jede Ziehung dieser Sitzung fest, der Reihe nach, mit Zeitstempel.",
      },
    ],
  },
  "roman-numeral": {
    name: "Römische Zahlen",
    tagline:
      "Zahlen zu römischen Ziffern und zurück, in beide Richtungen gleichzeitig — mit strenger klassischer Prüfung der subtraktiven Schreibweise.",
    intro: [
      "Tippen Sie eine arabische Zahl (1–3999) ein und sehen Sie ihre römische Form, oder tippen Sie eine Ziffernfolge ein und erhalten die Zahl — beide Felder sind live, Sie können also auf jeder Seite korrigieren. Der Parser erzwingt die klassischen Regeln: I vor V/X, X vor L/C, C vor D/M.",
      "Praktisch für Zifferblätter, Buchkapitel, Filmjahre, Monumentinschriften und Super-Bowl-Nummern — überall, wo römische Ziffern noch auftauchen.",
    ],
    steps: [
      "Geben Sie eine Zahl zwischen 1 und 3999 ein, um ihre römische Ziffer zu erhalten.",
      "Oder tippen Sie eine römische Ziffer — die Zahl erscheint sofort.",
      "Ungültige Formen wie VIIII oder IM werden markiert, mit einer Erklärung der Regeln.",
    ],
    faqs: [
      {
        q: "Warum ist 4000 die Obergrenze (MMMCMXCIX)?",
        a: "Die klassische römische Notation kennt keine Ziffer größer als M (1000), und M viermal zu wiederholen (MMMM) war nicht üblich. Die größte Zahl in streng klassischer Form ist 3999, geschrieben MMMCMXCIX.",
      },
      {
        q: "Warum wird VIIII abgelehnt, obwohl Uhren sie manchmal zeigen?",
        a: "Manche Zifferblätter nutzen additive IIII für vier, aber das standardklassische System verlangt subtraktives IV. Dieses Tool prüft gegen den strengen kanonischen Regex — VIIII, IC oder IM werden also markiert, nicht stillschweigend konvertiert.",
      },
      {
        q: "Akzeptiert der Konverter Kleinbuchstaben?",
        a: "Ja — Eingaben wie mcmxciv werden automatisch großgeschrieben und zu 1994 konvertiert. Die Ausgabe erscheint immer in Großbuchstaben, wie Inschriften traditionell sind.",
      },
    ],
  },
  "scientific-calculator": {
    name: "Wissenschaftlicher Taschenrechner",
    tagline:
      "Ein vollwertiger wissenschaftlicher Taschenrechner im Browser: Trigonometrie, log, ln, Potenzen und Wurzeln — kein eval, kein Server, kein Tracking.",
    intro: [
      "Ein Tastenfeld plus eine tippbare Ausdruckszeile: sin, cos, tan (DEG/RAD), log₁₀, ln, Quadratwurzel, Quadrate, beliebige Potenzen, Klammern, π und e. Die Ergebnisvorschau aktualisiert sich beim Tippen, und = faltet sie zurück in den Ausdruck für Kettenrechnungen.",
      "Ausdrücke werden von einem handgeschriebenen Recursive-Descent-Auswerter ausgewertet, gebaut für diese Site — JavaScripts eval und der Function-Konstruktor werden nie benutzt, und nichts wird irgendwohin gesendet. Implizite Multiplikation (2π, 3(4+1)) funktioniert von Haus aus.",
    ],
    steps: [
      "Tippen Sie das Tastenfeld an oder tippen Sie einen Ausdruck mit der Tastatur.",
      "Schalten Sie DEG/RAD für trigonometrische Funktionen nach Bedarf um.",
      "Drücken Sie =, um das angezeigte Ergebnis zu übernehmen, und rechnen Sie damit weiter.",
    ],
    faqs: [
      {
        q: "Wie werden die Ausdrücke ausgewertet?",
        a: "Von einem kleinen Tokenizer und Recursive-Descent-Parser, direkt in die Seite geschrieben: Zahlen, Konstanten, Funktionen, Klammern, unäres Minus, postfixes % und x², rechtsassoziative Potenzen und implizite Multiplikation zwischen nebeneinanderliegenden Werten. Ungültige Eingabe zeigt schlicht einen Fehler, statt irgendetwas auszuführen.",
      },
      {
        q: "Wie erhalte ich den Tangens von 45 Grad?",
        a: "Lassen Sie den DEG-Schalter aktiv (er ist der Standard), drücken Sie tan, dann 45 und =. Für Radiant — etwa tan(π/4) — wechseln Sie zu RAD und tippen tan(π/4) direkt ein.",
      },
      {
        q: "Warum wird mein Ergebnis mit begrenzten Stellen gezeigt?",
        a: "Ergebnisse werden auf 12 signifikante Stellen gerundet, um Gleitkomma-Rauschen wie 0.30000000000000004 zu verbergen. Präzision jenseits von 12 Stellen ist auf binärer Gleitkomma-Hardware ohnehin selten bedeutungsvoll.",
      },
    ],
  },
  "timestamp-converter": {
    name: "Unix-Zeitstempel-Konverter",
    tagline:
      "Unix-Sekunden oder -Millisekunden zu Menschen-Daten und zurück konvertieren, mit Live-Uhr, Ausgabe in Lokalzeit und UTC — alles in Ihrem Browser.",
    intro: [
      "Ein Live-Zähler zeigt den aktuellen Unix-Zeitstempel in Sekunden und Millisekunden, mit Ein-Klick-Kopieren. Fügen Sie einen Zeitstempel ein, und er wird in Ihre Lokalzeit und nach UTC dekodiert — 10-stellige Werte gelten als Sekunden, 13-stellige als Millisekunden, automatisch.",
      "Umgekehrt: Wählen Sie ein Datum und eine Uhrzeit und erhalten ihren exakten Zeitstempel. Alles wird lokal aus Ihrer Geräteuhr berechnet; Zeitstempel sind per Definition zeitzonenunabhängig, die Zahlen sind also überall auf der Erde dieselben.",
    ],
    steps: [
      "Kopieren Sie den Live-Zeitstempel oder fügen Sie einen in das Dekodierfeld ein.",
      "Lesen Sie die Menschen-Daten in Lokalzeit und UTC; Sekunden gegen Millisekunden wird automatisch erkannt.",
      "Oder wählen Sie ein Datum mit Uhrzeit, um seinen Unix-Zeitstempel in Sekunden und Millisekunden zu erhalten.",
    ],
    faqs: [
      {
        q: "Was genau ist ein Unix-Zeitstempel?",
        a: "Die Zahl der Sekunden seit 1970-01-01 00:00:00 UTC, ohne Schaltsekunden. Computer speichern Zeitpunkte so, weil Sortieren und Subtrahieren trivial werden. Millisekunden-Zeitstempel (13 Stellen) sind in JavaScript und Java üblich.",
      },
      {
        q: "Woher weiß das Tool, ob meine Zahl in Sekunden oder Millisekunden ist?",
        a: "An der Größenordnung: Werte unter einer Billion können kein modernes Datum in Millisekunden beschreiben und gelten als Sekunden; 13-stellige Werte gelten als Millisekunden. Das Ergebnis nennt, welche Deutung angewendet wurde.",
      },
      {
        q: "Dekodiert derselbe Zeitstempel in anderen Zeitzonen anders?",
        a: "Die rohe Zahl ändert sich nie — sie kodiert einen absoluten Zeitpunkt. Nur die menschenlesbare Darstellung weicht ab; deshalb zeigt das Tool Lokalzeit und UTC nebeneinander.",
      },
    ],
  },
  "timezone-converter": {
    name: "Zeitzonen-Umrechner",
    tagline:
      "Uhrzeiten über 21 Großstädte vergleichen, mit Live-Uhren und einer Tabelle Stunde für Stunde — Sommerzeit exakt behandelt, alles läuft im Browser.",
    intro: [
      "Wählen Sie zwei beliebige Städte von Los Angeles bis Tokio und sehen Sie beide Live-Uhren nebeneinander, die exakte Versatzdifferenz für heute und eine 24-zeilige Vergleichstabelle, die zeigt, was jede Stunde des Tages in der anderen Stadt wird — der schnellste Weg zu einem Terminslot über Zeitzonen hinweg.",
      "Die Konvertierung nutzt die eingebaute IANA-Zeitzonendatenbank Ihres Browsers, Sommerzeitumstellungen landen also auf der korrekten Minute — ganz ohne Netzaufruf.",
    ],
    steps: [
      "Wählen Sie die Ausgangsstadt — ihre Live-Uhr erscheint darunter.",
      "Wählen Sie die Zielstadt; Uhr und UTC-Versatz aktualisieren sich sofort.",
      "Überfliegen Sie die Tabelle Stunde für Stunde, um Zeiten zu finden, die beiden Seiten passen.",
      "Nutzen Sie die Tauschtaste, um die zwei Städte zu drehen.",
    ],
    faqs: [
      {
        q: "Behandelt der Umrechner die Sommerzeit?",
        a: "Ja. Die Versätze werden mit den IANA-Zeitzonenregeln Ihres Browsers für das heutige Datum berechnet — eine Stadt, die gerade Sommerzeit hat, zeigt also ihren korrekten verschobenen Versatz, und die Stundentabelle spiegelt die echten Uhren beider Seiten.",
      },
      {
        q: "Warum zeigt die Stundentabelle in manchen Zeilen ein anderes Datum?",
        a: "Bei weit auseinanderliegenden Städten wechselt das Kalenderdatum einer Seite im Tagesverlauf. Jede Zeile zeigt das Datum der Zielstadt neben der Uhrzeit, Sie sehen also, wann etwa 9:00 in Schanghai noch 21:00 des Vorabends in New York sind.",
      },
      {
        q: "Braucht dieses Tool Internetzugang?",
        a: "Nein. Die Stadtzeiten kommen aus der Zeitzonendatenbank Ihres Browsers und Ihrer Geräteuhr — nichts wird heruntergeladen, kein Standort geteilt.",
      },
    ],
  },
  "tip-calculator": {
    name: "Trinkgeldrechner",
    tagline:
      "Rechnung plus Trinkgeld plus Aufteilung unter Freunden: Trinkgeld, Gesamtsumme und exakt, was jede Person schuldet — live, keine Kopfrechnung am Tisch.",
    intro: [
      "Geben Sie die Rechnung ein, tippen Sie ein Trinkgeld-Vorgabe an (10/15/18/20/25 %) oder tippen Sie Ihren eigenen Satz, und sagen Sie, wie viele Personen sich teilen. Sofort erhalten Sie den Trinkgeldbetrag, die Gesamtsumme und den Anteil pro Person — niemand rechnet also im Kopf, während der Kellner wartet.",
      "Alles rechnet live neu, wenn sich Zahlen ändern, funktioniert in jeder Währung und läuft vollständig auf Ihrem Gerät — praktisch im Ausland, wo Ihre eigene Datenverbindung oft die einzig verlässliche ist.",
    ],
    steps: [
      "Tippen Sie den Rechnungsbetrag ein.",
      "Wählen Sie eine Trinkgeld-Vorgabe oder geben Sie einen eigenen Prozentsatz ein.",
      "Stellen Sie die Personenzahl ein und lesen Sie den Anteil pro Person ab.",
    ],
    faqs: [
      {
        q: "Wie viel Trinkgeld gehört sich?",
        a: "Das hängt vom Ort ab: 15–20 % der Rechnung vor Steuer sind in den USA üblich, 10–15 % in weiten Teilen Europas und Lateinamerikas, und in Japan und China rundet man auf, wo Trinkgeld nicht erwartet wird. Im Zweifel hält eine 10-%-Vorgabe Sie fast überall auf der sicheren Seite.",
      },
      {
        q: "Soll das Trinkgeld vor oder nach der Steuer berechnet werden?",
        a: "Die traditionelle Etikette sagt: Trinkgeld auf den Betrag vor Steuer. In der Praxis rechnen die meisten auf die Summe, die der Kartenbeleg zeigt. Wer es exakt will, gibt den Vorsteuerbetrag als Rechnung ein und teilt die Steuer separat dazu.",
      },
      {
        q: "Geht der Pro-Person-Betrag von gleicher Aufteilung aus?",
        a: "Ja — Rechnung plus Trinkgeld wird gleichmäßig durch die Personenzahl geteilt. Bei ungleichen Anteilen (jemand hatte nur einen Salat) rechnen Sie die geteilten Posten zuerst als Zwischensumme und legen die Einzelpositionen obendrauf.",
      },
    ],
  },
  "vat-calculator": {
    name: "MwSt-Rechner",
    tagline:
      "MwSt auf einen Nettopreis schlagen oder aus einem Bruttopreis herausrechnen, zu jedem eigenen Satz — netto, MwSt und brutto live, privat und sofort.",
    intro: [
      "Funktioniert in beide Richtungen für den Satz jedes Landes: 20 für Großbritannien tippen, 21 für die Niederlande, 19 für Deutschland — oder jeden Satz überhaupt. Steuer auf einen Nettobetrag schlagen, oder die MwSt aus einem Brutto- (steuer-enthaltenen) Preis herausrechnen.",
      "Alles wird lokal in Ihrem Browser berechnet — keine Uploads, keine Konten —, sicher also für Preisentwürfe und unveröffentlichte Rechnungen.",
    ],
    steps: [
      "Tippen Sie den Betrag ein — netto, wenn Sie MwSt hinzufügen, brutto, wenn Sie sie entfernen.",
      "Geben Sie Ihren MwSt-Satz als Prozentwert ein (z. B. 20).",
      "Wählen Sie Steuer hinzufügen oder Steuer entfernen; netto, MwSt und brutto erscheinen sofort.",
    ],
    faqs: [
      {
        q: "Wie berechne ich die MwSt rückwärts aus einem Bruttopreis?",
        a: "Netto = brutto ÷ (1 + Satz ÷ 100). Bei einem Bruttopreis von 120 € mit 20 % MwSt gilt: 120 ÷ 1,2 = 100 € netto, 20 € MwSt. Der Modus „Steuer entfernen“ rechnet das für Sie und zeigt alle drei Zahlen.",
      },
      {
        q: "Worin unterscheiden sich MwSt und GST?",
        a: "Es ist dieselbe Art Steuer — Mehrwert an jeder Stufe der Lieferkette, endgültig vom Verbraucher getragen. „MwSt“ ist der übliche Name in Europa, Großbritannien und weiten Teilen Afrikas und Asiens; Indien und einige andere nennen ihre vereinheitlichte Fassung GST.",
      },
      {
        q: "Welchen MwSt-Satz soll ich nutzen?",
        a: "Den, der für Ihre Güter oder Dienstleistungen und Rechtsraum gilt: Die Standardsätze reichen weltweit von 0 % bis 27 %, und die meisten Länder haben auch ermäßigte Sätze für Lebensmittel, Bücher oder Medizin. Im Zweifel prüfen Sie die aktuelle Tabelle Ihrer Steuerbehörde.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* Entwickler / Dienstprogramme — CSV ⇄ Excel, Kontrast, Noten         */
  /* ------------------------------------------------------------------ */
  "csv-to-excel": {
    name: "CSV zu Excel",
    tagline:
      "Wandeln Sie CSV direkt im Browser in eine echte .xlsx-Datei um — Komma, Semikolon oder Tabulator werden automatisch erkannt, Anführungszeichen und Zeilenumbrüche bleiben erhalten.",
    intro: [
      "CSV einfügen oder eine .csv-Datei ablegen und eine richtige Excel-Arbeitsmappe herunterladen — keine Textdatei mit umbenannter Endung. Die Engine parst gemäß RFC 4180: Felder in Anführungszeichen, doppelte Anführungszeichen und Zeilenumbrüche innerhalb von Zellen werden korrekt gelesen, und saubere Zahlen (9.5, -3, 0) werden zu echten numerischen Zellen.",
      "Die erste Zeile gilt als Kopfzeile (abschaltbar, dann wird Column 1…N erzeugt), der Blattname ist frei wählbar, und IDs wie 007 bleiben Text, damit führende Nullen erhalten bleiben. Nichts verlässt Ihr Gerät.",
    ],
    steps: [
      "CSV in das Eingabefeld einfügen oder eine .csv-Datei ablegen.",
      "Erkanntes Trennzeichen und die Kopfzeilen-Option prüfen.",
      "Blattnamen ändern, falls Sheet1 nicht passen sollte.",
      ".xlsx herunterladen und in Excel, Numbers oder Google Sheets öffnen.",
    ],
    faqs: [
      {
        q: "Werden meine Zahlen in Excel zu echten Zahlen?",
        a: "Ja — Zellen mit sauberem numerischem Literal (9.5, -3, 0) werden als numerische Zellen geschrieben, sodass SUMME und Diagramme sofort funktionieren. Werte wie 007 oder 1e3 bleiben absichtlich Text, weil eine Umwandlung ihre Bedeutung ändern würde.",
      },
      {
        q: "Meine CSV verwendet Semikolons — muss ich etwas einstellen?",
        a: "Nein. Das Trennzeichen wird automatisch erkannt, indem die Kandidaten außerhalb von Anführungszeichen gezählt werden; manuell auswählen geht auch. Kommas in Zellen, doppelte Anführungszeichen und Zeilenumbrüche bleiben bei der Umwandlung erhalten.",
      },
    ],
  },
  "excel-to-csv": {
    name: "Excel zu CSV",
    tagline:
      "Machen Sie aus jeder .xlsx- oder .xls-Arbeitsmappe sauberes CSV: Blatt und Trennzeichen wählen, herunterladen. Anführungszeichen, Kommas und Zeilenumbrüche werden korrekt escaped.",
    intro: [
      "Eine .xlsx-, .xlsm- oder .xls-Datei ablegen und standardkonformes CSV nach RFC 4180 erhalten. Enthält die Mappe mehrere Blätter, wählen Sie eines aus — eine CSV-Datei kann nur eines speichern, also ist ein Blatt pro Datei die ehrliche Abbildung. Zahlen erscheinen so, wie die Tabelle sie anzeigt.",
      "Die Ausgabe setzt Anführungszeichen nur wo nötig, verdoppelt innere Anführungszeichen und erhält Zeilenumbrüche in Zellen — das Ergebnis lässt sich ohne Überraschungen wieder in Excel, Datenbanken oder Skripte importieren. Direkt kopieren oder als UTF-8-Datei mit BOM herunterladen, damit Excel die Kodierung erkennt.",
    ],
    steps: [
      "Die .xlsx-, .xlsm- oder .xls-Datei in die Ablagezone ziehen.",
      "Bei mehreren Blättern das zu exportierende auswählen.",
      "Komma, Semikolon oder Tabulator als Ausgabetrennzeichen wählen.",
      "CSV kopieren oder als UTF-8-.csv herunterladen.",
    ],
    faqs: [
      {
        q: "Welches Blatt wird konvertiert?",
        a: "Standardmäßig das erste. Enthält die Mappe mehrere, erscheint über der Vorschau eine Auswahl; jeder Export umfasst genau ein Blatt, weil das CSV-Format keine mehreren speichern kann.",
      },
      {
        q: "Was passiert mit Formeln und Formatierung?",
        a: "Sie erhalten die letzten berechneten Werte so, wie die Zelle sie anzeigt — nicht die Formeln. Eine Zelle, die 1.234,50 zeigt, wird mit diesem Anzeigewert exportiert; Formate wie Währungssymbole bleiben wie dargestellt.",
      },
    ],
  },
  "contrast-checker": {
    name: "Kontrastprüfer",
    tagline:
      "Prüfen Sie das WCAG-Kontrastverhältnis zweier Farben mit AA- und AAA-Bewertung für normalen und großen Text plus Live-Vorschau. Alles läuft lokal in Ihrem Browser.",
    intro: [
      "Geben Sie Vordergrund- und Hintergrundfarbe ein — Hex wie #333 oder #1F2937, oder rgb()/rgba() — und lesen Sie das WCAG-Kontrastverhältnis mit zwei Dezimalstellen ab, inklusive sofortiger Bewertung aller vier Schwellen: AA und AAA für normalen und großen Text. Eine Live-Vorschau zeigt Fließtext und große Schrift in den echten Farben.",
      "Gerechnet wird mit der offiziellen Formel für relative Leuchtdichte aus WCAG 2.x — dieselbe wie im W3C-Prüfer: Ein 4.5 hier ist überall 4.5. Zu den Voreinstellungen gehört ein graues Paar mit 4.54:1, das zeigt, wie knapp die AA-Grenze liegt.",
    ],
    steps: [
      "Hex- oder rgb()-Wert eingeben oder die Farbauswahl für den Vordergrund nutzen.",
      "Dasselbe für die Hintergrundfarbe tun.",
      "Verhältnis und AA-/AAA-Bewertung lesen oder eine Voreinstellung antippen.",
      "Den Vorschaublock ansehen und das Paar mit eigenen Augen beurteilen.",
    ],
    faqs: [
      {
        q: "Welches Kontrastverhältnis brauche ich zum Bestehen?",
        a: "Nach WCAG 2.x: normaler Text braucht 4.5:1 für AA und 7:1 für AAA. Großer Text — mindestens 24 px oder 18.7 px fett — braucht 3:1 für AA und 4.5:1 für AAA. UI-Komponenten und Grafiken brauchen 3:1.",
      },
      {
        q: "Wie wird das Verhältnis berechnet?",
        a: "Jede Farbe wird aus sRGB linearisiert und zur relativen Leuchtdichte L = 0.2126·R + 0.7152·G + 0.0722·B kombiniert; das Verhältnis ist (helles L + 0.05) / (dunkles L + 0.05) — exakt die Formel der WCAG-2.x-Spezifikation. Ein rgba()-Alpha unter 1 wird vor der Rechnung auf Weiß gelegt.",
      },
    ],
  },
  "grade-calculator": {
    name: "Notenrechner",
    tagline:
      "Notenrechner mit Gewichtung oder Punkten: Aufgaben eintragen, Durchschnitt und Note live sehen und genau herausfinden, was Sie in der Abschlussprüfung brauchen.",
    intro: [
      "Tragen Sie jede Aufgabe mit Punkten, Maximum und (im gewichteten Modus) ihrer Prozentgewichtung ein — Durchschnitt und Buchstabenote aktualisieren sich live. Der Punkte-Modus rechnet nur mit erreichten Punkten über möglichen Punkten, wie viele MINT-Kurse bewerten.",
      "Der eingebaute Abschlussrechner beantwortet die eigentliche Frage: Wenn die Prüfung X % oder X Punkte zählt, was müssen Sie dafür erreichen? Er sagt klar, wenn das Ziel schon sicher oder rechnerisch unerreichbar ist, und die Skala ist umschaltbar: A–F im 10-Punkte-Schema, mit Plus/Minus, Bestanden/Durchgefallen oder eigene Grenzen.",
    ],
    steps: [
      "Pro Aufgabe eine Zeile anlegen: Name (optional), Punkte, Maximum, im gewichteten Modus auch Gewicht.",
      "Zwischen Gewichtet und Punkte umschalten, passend zur Bewertung Ihres Kurses.",
      "Gewicht oder Punkte der Abschlussprüfung und den Zielprozentsatz eingeben.",
      "Die erforderliche Prüfungsnote ablesen oder die Notenskala wählen.",
    ],
    faqs: [
      {
        q: "Was ist der Unterschied zwischen gewichtetem und Punkte-Modus?",
        a: "Im gewichteten Modus erhält jede Aufgabe eine Prozentgewichtung, gerechnet wird Σ(Gewicht × Punkte ÷ Maximum) ÷ ΣGewichte. Im Punkte-Modus zählen nur erreichte Punkte durch mögliche Punkte: Eine Aufgabe mit 90/100 ist dort ein Quiz mit 45/50 wert, gewichtet nur so viel, wie ihr Gewicht sagt.",
      },
      {
        q: "Was, wenn meine Gewichte keine 100 % ergeben?",
        a: "Kein Problem. Der aktuelle Durchschnitt wird über die tatsächlich eingetragenen Gewichte normiert, also bleibt auch ein halb bewerteter Kurs fair. Die Abschlussrechnung legt das Prüfungsgewicht oben drauf, genau wie der Lehrplan es vorsieht. Über 100 % bedeutet: Ziel unerreichbar; negativ bedeutet: bereits sicher.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* Bilder                                                              */
  /* ------------------------------------------------------------------ */
  "image-border": {
    name: "Bildrahmen",
    tagline:
      "Geben Sie einem Bild oder einem ganzen Stapel einen einfarbigen oder transparenten Rahmen — Live-Vorschau, Ausgabe als PNG oder JPG, komplett in Ihrem Browser.",
    intro: [
      "Ein Rahmen fasst Screenshots, Produktfotos und Avatare ein, ohne dass Sie einen Editor öffnen. Ziehen Sie ein Bild oder einen ganzen Stapel hinein, verschieben Sie den Breitenregler und wählen Sie den Füllstil: Die Leinwand wächst nach außen, kein Pixel des Originals wird beschnitten oder skaliert.",
      "Transparente Füllung hält den Rahmen in der PNG-Ausgabe durchscheinend — praktisch für Sticker und Freisteller auf jedem Hintergrund. Eine Volltonfarbe funktioniert überall, JPG eingeschlossen, und jede Datei wird auf Ihrem Gerät verarbeitet.",
    ],
    steps: [
      "Ziehen Sie ein Bild oder einen ganzen Stapel hierher.",
      "Verschieben Sie den Breitenregler und beobachten Sie die Live-Vorschau.",
      "Wählen Sie transparente Füllung oder eine Volltonfarbe sowie PNG- oder JPG-Ausgabe.",
      "Geben Sie allen Bildern einen Rahmen und laden Sie jedes Ergebnis herunter — oder alles zusammen in einem ZIP.",
    ],
    faqs: [
      {
        q: "Schrumpft oder beschneidet der Rahmen mein Bild?",
        a: "Nein. Die Leinwand wächst um das Doppelte der Rahmenbreite — ein Rahmen auf jeder Seite — und Ihr Bild wird in voller Größe darin platziert. Nichts wird beschnitten, skaliert oder verschoben.",
      },
      {
        q: "Wann wähle ich einen transparenten Rahmen?",
        a: "Transparente Füllung ergibt nur in der PNG-Ausgabe Sinn: Der Rahmen bleibt durchscheinend, das Bild funktioniert auf jedem Hintergrund. JPG hat keinen Alphakanal — dort wird der Rahmen mit der gewählten Volltonfarbe gefüllt.",
      },
      {
        q: "Warum gibt es JPG nicht mit transparenter Füllung?",
        a: "JPG kann keine Transparenz speichern — beim Speichern würde der Rahmen weiß werden. Das Tool wechselt automatisch zu PNG, sobald transparente Füllung gewählt ist; möchten Sie ein JPG, wählen Sie die Option Farbe.",
      },
    ],
  },
  "image-splitter": {
    name: "Bild in Kacheln teilen",
    tagline:
      "Schneiden Sie ein Bild in ein gleichmäßiges Raster aus Zeilen × Spalten von PNG-Kacheln — Live-Rastervorschau, ZIP-Download, alles lokal in Ihrem Browser.",
    intro: [
      "Schneiden Sie ein großes Bild in Rasterkacheln für Instagram-Grids, Drucklayouts, Sprite-Sheets oder Diaserien-Schritte. Wählen Sie 2–6 Zeilen und 2–6 Spalten, sehen Sie, wie das Raster auf Ihr Bild einrastet, und exportieren Sie jede Kachel als verlustfreies PNG.",
      "Kacheln aus demselben Bild behalten ihre Pixelpositionen und setzen sich perfekt wieder zusammen. Teilt die Größe nicht gleichmäßig, bekommen reguläre Kacheln ganze Pixelmaße, und die letzte Zeile und Spalte schlucken die Restpixel — nichts wird gestreckt.",
    ],
    steps: [
      "Ziehen Sie ein Bild hierher.",
      "Stellen Sie Zeilen- und Spaltenzahl ein (je 2–6) — die Vorschau zeigt das Raster.",
      "Schneiden Sie in Kacheln und prüfen Sie jedes Teil.",
      "Laden Sie Kacheln einzeln herunter oder alle zusammen in einem ZIP.",
    ],
    faqs: [
      {
        q: "Was passiert, wenn die Größe nicht durchs Raster teilbar ist?",
        a: "Reguläre Kacheln erhalten floor(Breite ÷ Spalten) × floor(Höhe ÷ Zeilen) Pixel, und die letzte Zeile und Spalte nehmen den Rest auf. Ein 305 × 205 Bild in 3 Spalten × 2 Zeilen ergibt 101 × 102 px Kacheln, die letzte Spalte 103 px breit. Jede Kachel hat ganze Pixel — kein Strecken, keine Lücken.",
      },
      {
        q: "In welcher Reihenfolge werden die Kacheln benannt?",
        a: "Zeile für Zeile, von links nach rechts: foto-r1c1.png, foto-r1c2.png … foto-r3c4.png. Das rNcM-Suffix verrät genau, wo jede Kachel sitzt — der Wiederaufbau ist kinderleicht.",
      },
      {
        q: "Warum PNG-Ausgabe?",
        a: "PNG ist verlustfrei, die Kacheln behalten also die exakten Pixel der Quelle. Das zählt, wenn die Teile wieder zusammengefügt oder als Sprites genutzt werden.",
      },
    ],
  },
  "crop-circle-image": {
    name: "Bild rund zuschneiden",
    tagline:
      "Schneiden Sie ein Bild oder einen Stapel in einen zentrierten Kreis mit transparenten Ecken aus — Verkleinerungsregler, Live-Vorschau, verlustfreies PNG.",
    intro: [
      "Runde Avatare, Profilbilder, Abzeichen und Sticker beginnen alle mit einem Kreisschnitt. Das Tool zentriert einen Kreis auf jedem Bild, behält das Innere und verwirft die Ecken als Transparenz — der Durchmesser startet bei der kürzeren Seite, ein Regler verkleinert ihn prozentual, wenn Sie mehr Rand möchten.",
      "Die Ausgabe ist immer PNG, damit die Ecken wirklich transparent bleiben und nicht weiß werden. Ziehen Sie einen ganzen Stapel hinein, um viele Bilder auf einmal zu konvertieren, sehen Sie sich die erste live an und laden Sie jeden Kreis einzeln herunter.",
    ],
    steps: [
      "Ziehen Sie ein Bild oder einen ganzen Stapel hierher.",
      "Ziehen Sie den Verkleinerungsregler, wenn der Kreis kleiner als die volle kürzere Seite sein soll.",
      "Prüfen Sie die Live-Vorschau des ersten Bildes.",
      "Schneiden Sie alle Bilder in Kreise aus und laden Sie jedes PNG herunter.",
    ],
    faqs: [
      {
        q: "Was bestimmt die Größe des Kreises?",
        a: "Standardmäßig entspricht der Durchmesser der kürzeren Seite des Bildes: Ein quadratisches Bild wird ein voller Kreis, ein Rechteck wird auf den größten zentrierten Kreis zugeschnitten, der hineinpasst. Der Verkleinerungsregler reduziert diesen Durchmesser prozentual.",
      },
      {
        q: "Sind die Ecken weiß?",
        a: "Nein — die Ausgabe ist PNG mit echtem Alphakanal: Der Bereich außerhalb des Kreises ist vollständig transparent, und das Ergebnis liegt sauber auf jedem Hintergrund.",
      },
      {
        q: "Wird mein Bild neu kodiert und verschlechtert?",
        a: "Die Pixel innerhalb des Kreises werden unverändert in ein verlustfreies PNG kopiert. Nur der Bereich außerhalb verschwindet; innen wird nichts skaliert oder neu komprimiert.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* Entwickler                                                          */
  /* ------------------------------------------------------------------ */
  "base64-image": {
    name: "Base64-Bildkonverter",
    tagline:
      "Bilder in Base64-Data-URLs umwandeln und zurück — Vorschau, Validierung, Download, mit exaktem Größenvergleich. Alles läuft in Ihrem Browser.",
    intro: [
      "Ziehen Sie ein PNG, JPEG, GIF, WebP oder SVG hinein und erhalten Sie eine fertige data:image/…;base64,…-URL zum direkten Einfügen in CSS, HTML oder JSON. Das Tool zeigt die Größe der Originaldatei neben der Textgröße des Ergebnisses an, sodass Sie die ~33 % Base64-Überhang sehen, bevor Sie sich fürs Inlining entscheiden.",
      "Fügen Sie eine Data-URL ein, und die umgekehrte Ansicht dekodiert sie: Das Bild wird in der Vorschau gezeigt, der deklarierte MIME-Typ mit den tatsächlichen Bytes abgeglichen, und ein Download-Button speichert es zurück als Datei. Ungültiges Base64 oder ein Nicht-Bild-Typ scheitert mit einer klaren Meldung statt einer kaputten Vorschau.",
    ],
    steps: [
      "Ziehen Sie ein Bild in das Panel (oder fügen Sie eines aus der Zwischenablage ein), um es zu kodieren.",
      "Kopieren Sie die Data-URL — oder nur die Base64-Nutzdaten — und prüfen Sie den Größenvergleich, bevor Sie inline einbetten.",
      "Wechseln Sie zum Dekodieren-Tab, fügen Sie eine beliebige Bild-Data-URL ein und sehen Sie sie sich an oder laden Sie sie herunter.",
    ],
    faqs: [
      {
        q: "Wann lohnt es sich, ein Bild als Data-URL einzubetten?",
        a: "Bei kleinen Icons, Avataren und Ladeplatzhaltern. Base64 macht Text ~33 % größer als die Binärdatei; unter wenigen Kilobyte sparen Sie insgesamt meist einen HTTP-Request, bei Fotos überwiegt der Overhead fast immer.",
      },
      {
        q: "Warum ist die Base64-Version größer als meine Datei?",
        a: "Base64 kodiert je 3 Bytes als 4 Textzeichen — eine feste Aufblähung von 33 %, plus den Präfix data:image/…;base64,. Nichts wird komprimiert oder verloren; es ist einfach eine textsichere Darstellung derselben Bytes.",
      },
      {
        q: "Welche Formate kann der Dekoder verarbeiten?",
        a: "Alles, was Ihr Browser als Bild darstellen kann: PNG, JPEG, GIF, WebP, SVG, BMP, AVIF und mehr. Das Tool prüft, ob die Nutzdaten gültiges Base64 sind und der deklarierte MIME-Typ ein Bild ist, und warnt, wenn die Magic Bytes der Datei nicht zum deklarierten Typ passen.",
      },
    ],
  },
  "html-to-markdown": {
    name: "HTML zu Markdown",
    tagline:
      "Verwandeln Sie HTML beim Tippen in sauberes Markdown — Überschriften, Listen, Links, Bilder und Code; ATX- oder Setext-Überschriften, Ihr Aufzählungszeichen.",
    intro: [
      "Fügen Sie Markup aus einer Webseite, einem CMS-Export oder einer E-Mail ein und erhalten sofort lesbares Markdown zurück. Die Konvertierung übernimmt turndown, die Standardbibliothek für HTML zu Markdown: Überschriften, Hervorhebungen, Links, Bilder, geordnete und ungeordnete Listen, Zitatblöcke und Codeblöcke landen alle an ihrem Markdown-Pendant.",
      "Zwei kleine Optionen decken die meisten Stilguides ab: Überschriften im ATX-Stil (# Überschrift) oder Setext-Stil (unterstrichen) sowie die Wahl von -, * oder + als Aufzählungszeichen für ungeordnete Listen. Das Ergebnis aktualisiert sich live, während Sie tippen oder eine Option ändern.",
    ],
    steps: [
      "Fügen Sie Ihr HTML in das Eingabefeld ein.",
      "Das Markdown entsteht live — passen Sie Überschriftenstil oder Aufzählungszeichen an, wenn Ihr Stilguide etwas anderes verlangt.",
      "Kopieren Sie das Markdown oder laden Sie es als .md-Datei herunter.",
    ],
    faqs: [
      {
        q: "Welches HTML wird konvertiert, und was passiert mit dem Rest?",
        a: "Standard-Dokumentmarkup — Überschriften, Absätze, Listen, Links, Bilder, Hervorhebungen, Code, Zitate und horizontale Linien — wird vollständig konvertiert. Elemente ohne Markdown-Äquivalent, etwa Tabellen und Formulare, werden auf ihren Textinhalt reduziert.",
      },
      {
        q: "Was ist der Unterschied zwischen ATX- und Setext-Überschriften?",
        a: "ATX schreibt Überschriften mit führenden Hashes (## Überschrift); Setext unterstreicht sie mit === für H1 bzw. --- für H2. Setext unterstützt nur zwei Ebenen, tiefere Überschriften fallen daher immer auf ATX-Hashes zurück.",
      },
      {
        q: "Verlässt mein HTML den Browser?",
        a: "Nein. Die Konvertierung läuft lokal mit turndown in Ihrem Browser — nichts wird hochgeladen, auch nicht beim Herunterladen der .md-Datei.",
      },
    ],
  },
  "xml-to-json": {
    name: "XML zu JSON",
    tagline:
      "XML in Ihrem Browser zu JSON konvertieren — Attribute werden @-Schlüssel, wiederholte Elemente zu Arrays, fehlerhafte Eingabe erhält einen klaren Zeilenfehler.",
    intro: [
      "Fügen Sie Sitemap-Einträge, RSS-Items, SOAP-Antworten oder Konfigurationsdateien ein und erhalten sofort hübsch formatiertes JSON zurück. Die Konvertierung nutzt fast-xml-parser und bewahrt Attribute: Jedes Attribut bleibt als Schlüssel mit @-Präfix erhalten, wiederholte Geschwister werden zu Arrays zusammengefasst, und Textinhalt liegt unter #text, wenn ein Element auch Attribute hat.",
      "Fehlerhafte Eingabe erzeugt nie halbgare Rateergebnisse: Das Dokument wird zuerst validiert, und Fehler zeigen auf die betroffene Zeile — ein fehlendes schließendes Tag ist eine Ein-Zeile-Korrektur.",
    ],
    steps: [
      "Fügen Sie Ihr XML in das linke Panel ein.",
      "Das formatierte JSON erscheint rechts, während Sie tippen.",
      "Kopieren Sie das JSON, wenn es passt.",
    ],
    faqs: [
      {
        q: "Wie werden Attribute im JSON dargestellt?",
        a: 'Jedes Attribut wird zu einem Schlüssel mit @-Präfix — <book id="7"> kommt als { "@id": "7" } zurück. Attributwerte bleiben Zeichenketten, während Textinhalt, der wie eine Zahl oder ein Boolean aussieht, in den jeweiligen JSON-Typ umgewandelt wird.',
      },
      {
        q: "Was passiert mit wiederholten Elementen?",
        a: "Geschwisterelemente mit demselben Namen werden ein JSON-Array. Beachten Sie: Ein einzelnes Element bleibt ein schlichter Wert — prüfen Sie auf Array-Eigenschaft, wenn Ihr Consumer Listen erwartet.",
      },
      {
        q: "Wird mein XML irgendwohin hochgeladen?",
        a: "Nein. Das Parsen passiert lokal in Ihrem Browser mit fast-xml-parser — nichts verlässt Ihr Gerät.",
      },
    ],
  },
  "json-to-xml": {
    name: "JSON zu XML",
    tagline:
      "JSON zu wohlgeformtem XML konvertieren, mit Attributen, wiederholten Elementen und korrektem Escaping — hin und her mit unserem XML-zu-JSON-Tool. Alles lokal.",
    intro: [
      'Fügen Sie JSON ein und erhalten ein hübsch formatiertes XML-Dokument mit ordentlicher Deklaration und 2-Leerzeichen-Einrückung. Objekte werden zu Elementen, Arrays wiederholen ihren Schlüssel pro Eintrag, und "@key"-Mitglieder werden zu XML-Attributen — das exakte Gegenstück zu unserem XML-zu-JSON-Konverter, Daten können hin und her wandern.',
      "Alles wird regelkonform escapet (& < > \" ') und beliebige Schlüssel werden zu legalen Elementnamen geformt, die Ausgabe ist also immer wohlgeformtes XML. Werte, die XML nicht ausdrücken kann — null, leere Arrays — werden zu leeren Elementen, und die Grenzen stehen unten ausgeschrieben.",
    ],
    steps: [
      "Fügen Sie Ihr JSON in das Eingabefeld ein.",
      "Das XML entsteht live — legen Sie bei Bedarf einen eigenen Root-Elementnamen fest.",
      "Kopieren Sie das Ergebnis oder laden Sie es als .xml-Datei herunter.",
    ],
    faqs: [
      {
        q: "Wie mappen Attribute und Arrays zu XML?",
        a: 'Ein Schlüssel, der mit @ (oder @_) beginnt, wird zu einem Attribut seines Eltern-Elements, und "#text" wird zum Textinhalt des Elements — passend zu dem, was unser XML-zu-JSON-Tool ausgibt. Arrays wiederholen dasselbe Element pro Eintrag; ein JSON-Array ganz oben wird als <root><item>…</item></root> verpackt, weil ein Dokument eine einzige Wurzel braucht.',
      },
      {
        q: "Welche Grenzen hat das JSON ⇄ XML Mapping?",
        a: "XML kennt keine Notation für null oder leere Arrays — beides kollabiert zu leeren Elementen. Gemischte Inhalte (Text, durchsetzt mit Kindelementen) können nicht hin- und herwandern: Text bleibt als ein Block. Und beim Zurücklesen wird ein einzelnes wiederholtes Element zu einem schlichten Wert statt einem Ein-Element-Array.",
      },
      {
        q: "Was passiert mit Schlüsseln, die keine gültigen XML-Namen sind?",
        a: 'Sie werden umgeformt: Illegale Zeichen werden zu Unterstrichen, und ein Schlüssel, der mit einer Ziffer beginnt, bekommt einen führenden Unterstrich ("2fa" → <_2fa>). CJK- und akzentuierte Buchstaben sind bereits legale XML-Namen und bleiben, wie sie sind.',
      },
    ],
  },
  "cron-explainer": {
    name: "Cron-Erklärer",
    tagline:
      "Verwandeln Sie beliebige Cron-Ausdrücke in klare Sprache: Feld-für-Feld-Erklärung, die nächsten fünf Ausführungszeiten in Ihrer Zeitzone und Ein-Klick-Vorlagen.",
    intro: [
      "Cron-Ausdrücke bestehen aus fünf oder sechs kryptischen Feldern, die entscheiden, wann Jobs laufen — und ein einziges falsches Zeichen sorgt dafür, dass nie etwas passiert oder jeden Sonntag um 3 Uhr nachts etwas feuert. Fügen Sie einen Ausdruck ein: Das Tool erklärt jedes Feld (Minute, Stunde, Tag des Monats, Monat, Wochentag, plus Sekunden, falls vorhanden) und zeigt die nächsten fünf Ausführungszeiten, damit Sie prüfen können, ob der Zeitplan so funktioniert, wie Sie denken.",
      "Die Validierung ist ehrlich und Inline: Werte außerhalb des Bereichs, rückwärts laufende Bereiche und nicht unterstützte Quartz-Erweiterungen wie L, W und # erhalten eine konkrete, verständliche Fehlermeldung. Fünf gängige Vorlagen — jede Minute, stündlich, täglich um Mitternacht, werktags um 9 Uhr und vierteljährlich — füllen per Klick.",
    ],
    steps: [
      "Geben Sie einen Cron-Ausdruck ein oder klicken Sie auf eine Vorlage als sicheren Start.",
      "Lesen Sie die Feld-für-Feld-Erklärung in klarer Sprache.",
      "Prüfen Sie die nächsten fünf Ausführungszeiten, umschaltbar zwischen lokaler Zeit und UTC.",
      "Korrigieren Sie Überraschendes in Ihrer Crontab, Ihrem Scheduler oder Ihrer CI-Konfiguration.",
    ],
    faqs: [
      {
        q: "Was unterscheidet Standard-Cron von der Quartz-Syntax?",
        a: "Standard-Unix-Cron (und dieses Tool) nutzt 5 Felder: Minute, Stunde, Tag des Monats, Monat, Wochentag — 6, wenn das erste die Sekunden angibt. Quartz fügt standardmäßig Sekunden hinzu, dazu ein 7. Jahresfeld und Erweiterungen wie L (letzter Tag), W (nächster Werktag) und # (n-ter Wochentag, z. B. MON#2). Diese Quartz-Erweiterungen deckt das Tool nicht ab; alles Standardmäßige — Zahlen, Namen wie JAN und MON, Bereiche, Listen und Schritte — schon.",
      },
      {
        q: "Mein Ausdruck hat Tag des Monats und Wochentag — warum läuft er öfter als erwartet?",
        a: "Klassisches Cron verknüpft beide mit ODER: Sind beide Felder eingeschränkt (keins ist *), feuert ein Tag, der auf eines von beiden passt. „0 0 1 * MON“ läuft am 1. des Monats und an jedem Montag. Für beide Bedingungen gleichzeitig braucht die Struktur einen anderen Aufbau — der Blick auf die nächsten Ausführungszeiten zeigt das Verhalten sofort.",
      },
    ],
  },
  "gradient-generator": {
    name: "CSS-Verlauf-Generator",
    tagline:
      "Mischen Sie zwei bis fünf Farben zu linearen, radialen oder konischen CSS-Verläufen — mit Live-Vorschau, fertigem Code zum Einfügen und harmonisierten Paletten per Klick.",
    intro: [
      "Wählen Sie zwei bis fünf Farben, entscheiden Sie sich für linear, radial oder konisch und ziehen Sie den Winkel — die Vorschau aktualisiert sich beim Tippen, und der CSS-Code ist immer eine Kopie entfernt. Lassen Sie die Position eines Stops leer, wird sie automatisch so gesetzt, wie es CSS täte; exakte Prozentwerte erzeugen harte Kanten und versetzte Verläufe.",
      "Die Ausgabe ist ein echter Produktionsblock: eine Einfarbig-Reserve für sehr alte Browser, eine Zeile mit -webkit- Präfix für alte WebKit-Versionen und zuletzt die Standardsyntax. Der Zufalls-Harmonisieren-Knopf dreht die Farbtöne Ihrer Palette im HSL-Raum, damit jede Neuwürflung ausgewogen bleibt statt zu kneifen.",
    ],
    steps: [
      "Stellen Sie zwei bis fünf Farben ein oder starten Sie mit einer Vorlagen-Palette.",
      "Wählen Sie den Verlaufstyp und dann Winkel oder Form; Positionen bei Bedarf fixieren.",
      "Kopieren Sie den CSS-Block und fügen Sie ihn in Ihr Stylesheet ein.",
    ],
    faqs: [
      {
        q: "Warum enthält das CSS eine Zeile mit -webkit- Präfix?",
        a: "Das ist eine Kompatibilitätszeile für alte WebKit-Browser (etwa Safari-5- bis 6-Ära), die nur -webkit-linear-gradient verstanden. Jeder Browser des letzten Jahrzehnts liest die Standardzeile; Sie können die Präfixzeile also löschen, wenn Sie diese Versionen nicht unterstützen wollen — behalten kostet eine Zeile, wegwerfen kostet nichts.",
      },
      {
        q: "Was bedeutet der Winkel bei einem linearen Verlauf?",
        a: "Er ist die Laufrichtung des Verlaufs, im Uhrzeigersinn von oben gemessen: 0deg läuft von unten nach oben, 90deg von links nach rechts, 180deg von oben nach unten. Das Tool normalisiert jeden Winkel (−45 wird 315) und die umgekehrte Richtungsregel der alten Syntax ist in der -webkit--Zeile bereits berücksichtigt.",
      },
    ],
  },
  "compress-image-to-size": {
    name: "Bild auf Zielgröße komprimieren",
    tagline:
      "Verkleinern Sie Bilder auf ein exaktes KB-Budget: eine binäre Suche über die JPEG- oder WebP-Qualität erreicht das Maximum des Formats — im Batch, offline, ohne Upload.",
    intro: [
      "Upload-Formulare, E-Mail-Limits und CMS-Felder verlangen eine Größe, keinen Qualitätsregler. Geben Sie die Obergrenze in KB ein, legen Sie Ihre Bilder ab, und das Tool durchsucht die Encoder-Qualität binär, bis die Datei unter die Grenze rutscht — pro Bild mit exakter Qualität und angewandter Skalierung, im Batch.",
      "Das Tool ist ehrlich zur Physik: Übersteigt auch der Qualitätsboden Ihr Ziel, wird das Bild schrittweise herunterskaliert; und wenn ein großes, detailreiches Foto in ein winziges Budget nicht passt, erhalten Sie das nächstbeste Ergebnis, klar als „über dem Ziel“ markiert — niemals stillschweigend ruinierte Bilder.",
    ],
    steps: [
      "Legen Sie ein Bild oder einen ganzen Stapel ab.",
      "Geben Sie die Zielgröße in KB ein und wählen Sie JPEG oder WebP.",
      "Starten Sie die Komprimierung — jede Zeile zeigt erreichte Größe, Qualität und Skalierung.",
      "Laden Sie passende Ergebnisse oder die ehrliche Best-Selection-Kopie herunter.",
    ],
    faqs: [
      {
        q: "Warum kann nicht jedes Bild ein winziges Ziel erreichen?",
        a: "Ein Foto behält auch bei niedrigster Qualität Information, deshalb passt ein 2-MB-Bild mit 4000 px wohl nie in 10 KB. Erreicht die Qualität ihren Boden, verkleinert das Tool zusätzlich die Pixel — die Auflösung ist der zweite Hebel gegen Bytes. Bleibt das Ziel unerreichbar, gibt es das nächste Ergebnis mit ausdrücklichem „über dem Ziel“-Hinweis, nie eine still beschädigte Datei.",
      },
      {
        q: "JPEG oder WebP?",
        a: "WebP fällt bei gleicher visueller Qualität typischerweise 20–30 % kleiner aus als JPEG und passt daher bei strengem Budget oft mit weniger Verlust. JPEG ist die sichere Wahl, wenn die Datei überall öffnen soll — auch in alter Software ohne WebP-Unterstützung.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* Taschenrechner — Finanzen, Gesundheit und Alltag (neues Paket)       */
  /* ------------------------------------------------------------------ */
  "mortgage-calculator": {
    name: "Hypothekenrechner",
    tagline:
      "Berechnen Sie die Monatsrate Ihres Immobilienkredits — Tilgung und Zinsen plus Steuer, Versicherung und Hausgeld — mit Darlehensbetrag, Zinsgesamtkosten und Jahrestilgungsplan.",
    intro: [
      "Geben Sie Kaufpreis, Anzahlung, Zinssatz und Laufzeit ein und erhalten Sie die Monatsrate aus Zins und Tilgung nach der Standard-Amortisationsformel, die auch Banken nutzen. Fügen Sie jährliche Grundsteuer, jährliche Versicherung und monatliches Hausgeld hinzu, um den vollständigen PITI-Betrag zu sehen, den die meisten Kreditgeber nennen.",
      "Darlehensbetrag, Gesamtzinsen über die Laufzeit und ein Jahrestilgungsplan aktualisieren sich live beim Tippen, sodass Sie 20 % Anzahlung gegen 10 % oder 15 Jahre gegen 30 in Sekunden vergleichen.",
    ],
    steps: [
      "Geben Sie Kaufpreis und Anzahlung ein, als Prozent oder Betrag.",
      "Setzen Sie den Jahreszinssatz und die Laufzeit in Jahren.",
      "Fügen Sie optional jährliche Grundsteuer, jährliche Versicherung und monatliches Hausgeld hinzu.",
      "Lesen Sie die Monatsrate aus Zins und Tilgung, den PITI-Gesamtbetrag und den Jahrestilgungsplan.",
    ],
    faqs: [
      {
        q: "Welche Formel verwendet der Hypothekenrechner?",
        a: "Die Standard-Amortisationsformel bei festem Zins: M = L × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1), wobei L der Darlehensbetrag ist (Kaufpreis minus Anzahlung), r der Monatszins (Jahreszins ÷ 12 ÷ 100) und n die Anzahl der Monate. Beispiel: ein Haus für 300.000 mit 20 % Anzahlung bei 6 % über 30 Jahre ergibt eine Monatsrate aus Zins und Tilgung von etwa 1.438,92 — der eingegebene Zins ist ein Beispielwert, kein Angebot.",
      },
      {
        q: "Was bedeutet PITI?",
        a: "Principal, Interest, Taxes und Insurance — die vier Teile einer typischen monatlichen Wohnrate. Das Tool addiert ein Zwölftel der eingegebenen Jahresgrundsteuer und Jahresversicherung plus Hausgeld zur Zins-und-Tilgungsrate. Ob Steuern und Versicherung in Treuhandverwahrung (Escrow) laufen, hängt vom Kreditgeber ab.",
      },
      {
        q: "Warum zahle ich in den ersten Jahren so viel Zinsen?",
        a: "Die Zinsen jedes Monats werden auf den Restsaldo berechnet, der am Anfang am größten ist. Der Tilgungsplan zeigt den Übergang: Frühe Raten bestehen fast nur aus Zinsen, in den letzten Jahren fast nur aus Tilgung. Zusätzliche Tilgung früh im Darlehen spart daher am meisten Zinsen.",
      },
    ],
  },
  "salary-to-hourly": {
    name: "Gehalt-zu-Stundenlohn-Rechner",
    tagline:
      "Rechnen Sie ein Jahresgehalt in Stunden-, Tages-, Wochen-, Zweiwochen- und Monatslohn um — und sehen Sie den angepassten Stundenlohn nach Abzug unbezahlter freier Tage.",
    intro: [
      "Geben Sie ein Jahresgehalt mit Ihrem üblichen Rhythmus ein — Stunden pro Woche und Wochen pro Jahr — und der Rechner zerlegt es in die Größen, die Stellenanzeigen und Gehaltsabrechnungen nutzen: stundenweise, täglich, wöchentlich, zweiwöchentlich und monatlich. Die Standardwoche von 40 Stunden über 52 Wochen ist voreingestellt.",
      "Nehmen Sie unbezahlte Tage, zeigt der angepasste Stundenlohn, was dasselbe Gehalt pro tatsächlich gearbeiteter Stunde bedeutet, denn jeder unbezahlte Tag entfernt ein Fünftel einer Arbeitswoche aus dem Jahr.",
    ],
    steps: [
      "Tippen Sie das Jahresgehalt ein.",
      "Setzen Sie Stunden pro Woche und Wochen pro Jahr (standardmäßig 40 und 52).",
      "Ergänzen Sie unbezahlte freie Tage pro Jahr, falls vorhanden.",
      "Lesen Sie den Stundenlohn und die Tages-, Wochen-, Zweiwochen- und Monatswerte.",
    ],
    faqs: [
      {
        q: "Wie wird der Stundenlohn berechnet?",
        a: "Stundenlohn = Jahresgehalt ÷ (Stunden pro Woche × Wochen pro Jahr). Bei den voreingestellten 40 Stunden über 52 Wochen ergibt ein Gehalt von 52.000 exakt 25,00 pro Stunde. Der Tageslohn rechnet mit einer 5-Tage-Woche, der Wochenlohn ist das Jahresgehalt geteilt durch die Wochen, der Zweiwochenlohn dessen Doppeltes und der Monatslohn das Jahresgehalt geteilt durch 12.",
      },
      {
        q: "Wie verändern unbezahlte Freizeiten das Ergebnis?",
        a: "Jeder unbezahlte Tag entfernt ein Fünftel einer Arbeitswoche, 10 unbezahlte Tage kürzen das Jahr also auf etwa 50 Arbeitswochen. Der angepasste Stundenlohn teilt dasselbe Gehalt durch die tatsächlich gearbeiteten Stunden: 52.000 bei 40-Stunden-Wochen mit 10 unbezahlten Tagen ergeben 26,00 pro Stunde. Wochen- und Monatssummen zeigen weiterhin das genannte Gehalt.",
      },
      {
        q: "Sind Steuern und Abzüge enthalten?",
        a: "Nein — alle Zahlen sind brutto, vor Einkommensteuer, Sozialabgaben und anderen Abzügen. Das Netto hängt von Ihrer Steuerklasse und Ihrem Wohnort ab, behandeln Sie diese Ergebnisse also als Brutto-Vergleichswerte.",
      },
    ],
  },
  "hourly-to-salary": {
    name: "Stundenlohn-zu-Gehalt-Rechner",
    tagline:
      "Machen Sie aus einem Stundenlohn Tages-, Wochen-, Zweiwochen-, Monats- und Jahresgehalt nach Ihrem echten Rhythmus — standardmäßig 40 Stunden pro Woche über 52 Wochen.",
    intro: [
      "Geben Sie einen Stundenlohn mit dem Rhythmus ein, für den er gilt, und der Rechner multipliziert ihn auf die Jahreszahl, nach der Arbeitgeber und Kreditgeber fragen, plus die Wochen-, Zweiwochen- und Monatsbeträge einer Gehaltsabrechnung. Der 40-Stunden-, 52-Wochen-Standard ist voreingestellt; Teilzeit oder Saisons brauchen nur diese zwei Zahlen geändert.",
      "Der Tageslohn geht von einer 5-Tage-Arbeitswoche aus. Da jede Zahl eine direkte Multiplikation ist, entsprechen die Ergebnisse dem, was ein Gehaltsangebot für dieselben Stunden zahlen sollte.",
    ],
    steps: [
      "Tippen Sie den Stundenlohn ein.",
      "Setzen Sie Stunden pro Woche und Wochen pro Jahr (standardmäßig 40 und 52).",
      "Lesen Sie den Jahresbetrag und die Monats-, Zweiwochen-, Wochen- und Tageswerte.",
    ],
    faqs: [
      {
        q: "Wie wird das Jahresgehalt aus dem Stundenlohn berechnet?",
        a: "Jahr = Stundenlohn × Stunden pro Woche × Wochen pro Jahr. Bei 25,00 pro Stunde über eine 40-Stunden-Woche mal 52 Wochen sind das exakt 52.000 im Jahr; der Monatsbetrag ist das Jahresgehalt geteilt durch 12, der Zweiwochenbetrag eine Wochenpay mal zwei.",
      },
      {
        q: "Was ist mit Überstunden, Trinkgeld oder unbezahltem Urlaub?",
        a: "Sie sind nicht enthalten — das Ergebnis ist die direkte Multiplikation für den eingegebenen Rhythmus. Für Überstunden addieren Sie grob die typischen Zusatzstunden beim gleichen Satz zum Feld Stunden pro Woche; für Saisonarbeit oder unbezahlten Urlaub senken Sie die Wochen pro Jahr.",
      },
      {
        q: "Warum weicht meine echte Gehaltsabrechnung ab?",
        a: "Die Zahlen sind brutto. Einkommensteuer, Sozialversicherung und Leistungsabzüge verringern das Netto, und viele Gehaltsjobs verteilen die Pay über 12 Monate, auch wenn Sie weniger Wochen arbeiten. Nutzen Sie das Jahresergebnis zum Vergleichen von Angeboten, nicht als Netto-Schätzung.",
      },
    ],
  },
  "break-even-calculator": {
    name: "Break-Even-Rechner",
    tagline:
      "Finden Sie die Stückzahl und den Umsatz, ab denen ein Produkt kein Geld mehr verliert — Fixkosten, Preis und variable Kosten rein, Deckungsbeitrag und Gewinntabelle raus.",
    intro: [
      "Geben Sie Ihre Fixkosten ein — Miete, Gehälter, Geräte, die Rechnungen, die Sie unabhängig vom Volumen zahlen — plus den Stückpreis und die variablen Kosten pro Stück. Der Rechner teilt die Fixkosten durch den Deckungsbeitrag, Preis minus variable Kosten, und liefert die Stückzahl, bei der der Gewinn null kreuzt.",
      "Eine MiniTabelle zeigt Gewinn oder Verlust bei der Hälfte, dem Anderthalbfachen und dem Doppelten der Break-Even-Menge, damit Sie sehen, wie schnell sich die Marge nach dem Punkt summiert. Deckt der Preis nicht einmal die variablen Kosten, sagt das Tool es, statt eine bedeutungslose Null zu zeigen.",
    ],
    steps: [
      "Geben Sie die Fixkosten der Periode ein.",
      "Setzen Sie Stückpreis und variable Kosten pro Stück.",
      "Lesen Sie Break-Even-Stückzahl und -Umsatz plus Marge pro Stück.",
      "Prüfen Sie die Gewinntabelle bei 0,5×, 1,5× und 2× der Break-Even-Menge.",
    ],
    faqs: [
      {
        q: "Welche Formel nutzt die Break-Even-Analyse?",
        a: "Break-Even-Stückzahl = Fixkosten ÷ (Stückpreis − variable Kosten pro Stück). Die Differenz ist der Deckungsbeitrag: Bei 10.000 Fixkosten, einem Preis von 50 und variablen Kosten von 30 trägt jeder Verkauf 20 bei, also erreichen 500 Stück — 25.000 Umsatz — den Break-Even.",
      },
      {
        q: "Was, wenn die Marge null oder negativ ist?",
        a: "Dann kann kein Volumen den Break-Even erreichen, und der Rechner sagt das, statt eine Zahl zurückzugeben: Jedes verkaufte Stück vergrößert den Verlust, statt Fixkosten zu decken. Die Hebel sind ein höherer Preis, niedrigere variable Kosten oder beides.",
      },
      {
        q: "Beherrscht er mehrere Produkte oder veränderliche Kosten?",
        a: "Er modelliert ein Produkt mit konstanter Stückökonomie — den klassischen Lehrbuchfall. Für einen Produktmix nutzen Sie Ihren gemischten Durchschnitt von Preis minus variablen Kosten; für Mengenrabatte oder stufige Fixkosten rechnen Sie jedes Szenario neu.",
      },
    ],
  },
  "bmr-calculator": {
    name: "Grundumsatz-Rechner",
    tagline:
      "Berechnen Sie Ihren Grundumsatz mit der Mifflin-St-Jeor-Gleichung (1990) — die Kalorien, die Ihr Körper bei voller Ruhe täglich verbrennt.",
    intro: [
      "Ihr Grundumsatz (BMR) ist die Energie, die Ihr Körper allein zum Leben braucht — Atmung, Blutkreislauf, Wärme —, noch vor jeder Bewegung oder Verdauung. Dieser Rechner nutzt die Mifflin-St-Jeor-Gleichung, veröffentlicht 1990 und bis heute die genaueste breit genutzte Vorhersageformel für moderne Bevölkerungen: Männer 10 × Gewicht (kg) + 6,25 × Größe (cm) − 5 × Alter + 5; Frauen derselbe Ausdruck minus 161.",
      "Geben Sie Ihre Daten in metrischen oder imperialen Einheiten ein, das Ergebnis aktualisiert sich beim Tippen. Behandeln Sie die Zahl als Schätzung auf Populationsebene — typischerweise innerhalb von etwa ±10 % einer Labormessung —, nicht als medizinische Diagnose.",
    ],
    steps: [
      "Wählen Sie Ihr Geschlecht sowie metrische (cm + kg) oder imperiale (ft + in + lb) Einheiten.",
      "Geben Sie Größe, Gewicht und Alter ein.",
      "Lesen Sie Ihren BMR in Kilokalorien pro Tag.",
      "Speisen Sie ihn in den Kalorienrechner ein, für Erhaltungs- und Zielwerte.",
    ],
    faqs: [
      {
        q: "Welche Formel wird genutzt, und wie genau ist sie?",
        a: "Die Mifflin-St-Jeor-Gleichung, 1990 veröffentlicht und von der American Dietetic Association nach Validierung gegen indirekte Kalorimetrie empfohlen. Sie sagt die gemessene Ruheenergie für die meisten Erwachsenen auf etwa ±10 % voraus — genauer als die ältere Harris-Benedict-Gleichung (1919).",
      },
      {
        q: "Was ist der Unterschied zwischen BMR und täglichem Kalorienbedarf?",
        a: "Der BMR deckt nur volle Ruhe. Ihr echter Tagesverbrauch ist der BMR mal einem Aktivitätsfaktor — etwa 1,2 für einen sitzenden Tag bis 1,9 für sehr aktive Menschen. Der Kalorienrechner wendet diesen Multiplikator und Ihr Ziel für Sie an.",
      },
      {
        q: "Ist das medizinischer Rat?",
        a: "Nein — das ist eine Schätzung, kein medizinischer Rat. Krankheit, Medikamente, Schwangerschaft und ungewöhnliche Körperzusammensetzungen verschieben den realen Energieverbrauch; besprechen Sie jede Ernährungsänderung mit einer Fachkraft.",
      },
    ],
  },
  "calorie-calculator": {
    name: "Kalorienrechner",
    tagline:
      "Machen Sie aus Ihrem BMR tägliche Kalorienziele: fünf Aktivitätslevel (×1,2–1,9) plus Ziele zum Abnehmen, Halten oder Zunehmen von etwa ±500 kcal pro Tag.",
    intro: [
      "Der tägliche Energiebedarf ist Ihr BMR mal einem Aktivitätsfaktor: 1,2 sitzend, 1,375 leicht aktiv, 1,55 mäßig aktiv, 1,725 sehr aktiv und 1,9 extra aktiv. Dieses Produkt — der Gesamtumsatz (TDEE) — ist es, was Ihr aktuelles Gewicht hält. Der BMR selbst stammt aus der Mifflin-St-Jeor-Gleichung (1990).",
      "Wählen Sie ein Ziel, und das Tool passt den Erhaltungswert an: etwa −500 kcal/Tag, um rund 0,5 kg pro Woche abzunehmen, +500 kcal/Tag zum Zunehmen, oder keine Änderung zum Halten. Die ±500-kcal-Heuristik folgt daraus, dass 1 kg Körperfett ≈ 7.700 kcal speichert. Alles hier ist eine Schätzung — der echte Stoffwechsel passt sich an, wenn sich Gewicht und Gewohnheiten ändern.",
    ],
    steps: [
      "Wählen Sie Geschlecht und Einheiten und geben Sie Größe, Gewicht und Alter ein.",
      "Wählen Sie das Aktivitätslevel, das einer typischen Woche entspricht.",
      "Wählen Sie Abnehmen, Halten oder Zunehmen.",
      "Lesen Sie den Erhaltungswert (TDEE) und Ihre Zielkalorien pro Tag.",
    ],
    faqs: [
      {
        q: "Welche Formel und Faktoren werden genutzt?",
        a: "BMR aus der Mifflin-St-Jeor-Gleichung (1990), multipliziert mit den Standard-TDEE-Aktivitätsfaktoren: 1,2 sitzend, 1,375 leicht aktiv, 1,55 mäßig aktiv, 1,725 sehr aktiv, 1,9 extra aktiv. Ziele addieren oder subtrahieren etwa 500 kcal/Tag, die klassische Heuristik für eine wöchentliche Änderung von 0,5 kg (1 kg Fett ≈ 7.700 kcal).",
      },
      {
        q: "Ist ein Defizit von 500 kcal sicher, und wann zeigen sich Ergebnisse?",
        a: "Etwa −500 kcal/Tag für eine Änderung von ≈0,5 kg/Woche gelten in den meisten Public-Health-Leitlinien als moderat und tragfähig. Früher Verlust ist zum Teil Wasser, und der Verbrauch sinkt, je leichter Sie werden — wöchentliche Ergebnisse verlaufen also nicht linear; rechnen Sie alle paar Kilo neu.",
      },
      {
        q: "Ist das medizinischer Rat?",
        a: "Nein — das ist eine Schätzung, kein medizinischer Rat. Wenn Sie schwanger sind, eine chronische Erkrankung managen, Medikamente nehmen oder eine Vorgeschichte mit Essstörungen haben, legen Sie Ziele mit einer Fachkraft fest.",
      },
    ],
  },
  "body-fat-calculator": {
    name: "Körperfett-Rechner",
    tagline:
      "Schätzen Sie Ihren Körperfettanteil mit der Messband-Methode der US Navy (Hodgdon & Beckett, 1984) aus Größe, Hals und Taille — für Frauen plus Hüfte.",
    intro: [
      "Die Umfangsmethode der US Navy schätzt Körperfett allein mit einem Messband. Für Männer: %BF = 495 / (1,0324 − 0,19077·log10(Taille − Hals) + 0,15456·log10(Größe)) − 450, alles in Zentimetern. Frauen ergänzen die Hüfte im Umfangsterm — log10(Taille + Hüfte − Hals) — und nutzen die weiblichen Koeffizienten derselben Arbeit von 1984 von Hodgdon und Beckett.",
      "Messen Sie den Hals unter dem Kehlkopf mit leicht nach vorn abfallendem Band, die Taille am Bauchnabel (Männer) bzw. an der schmalsten Stelle (Frauen) und die Hüfte an ihrer stärksten Stelle. Ziehen Sie das Band an, ohne die Haut zu komprimieren. Das Ergebnis ist eine Schätzung mit typischem Fehler von ±3–4 % gegen Labormethoden, keine Diagnose.",
    ],
    steps: [
      "Wählen Sie Ihr Geschlecht und metrische oder imperiale Einheiten.",
      "Messen und geben Sie Größe, Hals und Taille ein — plus Hüfte für Frauen.",
      "Lesen Sie Ihren geschätzten Körperfettanteil.",
      "Messen Sie monatlich unter denselben Bedingungen nach, um den Trend zu verfolgen.",
    ],
    faqs: [
      {
        q: "Wie genau ist die Navy-Methode?",
        a: "Gegenüber Unterwasserwiegung und DEXA liegen die Navy-Gleichungen von 1984 im Schnitt etwa 3–4 Prozentpunkte daneben, mit größeren individuellen Fehlern, wo Fett ungewöhnlich verteilt ist. Änderungen verfolgt sie gut, wenn Sie konsequent gleich messen — das zählt für den Fortschritt mehr als die absolute Zahl.",
      },
      {
        q: "Welcher Körperfettbereich gilt als gesund?",
        a: "Der American Council on Exercise nennt für Männer: 2–5 % essenzielles Fett, 6–13 % Athleten, 14–17 % Fitness, 18–24 % Durchschnitt, 25 %+ Fettleibigkeit. Für Frauen: 10–13 % essenziell, 14–20 % Athletinnen, 21–24 % Fitness, 25–31 % Durchschnitt, 32 %+ Fettleibigkeit. Frauen brauchen mehr essenzielles Fett für die Hormonfunktion.",
      },
      {
        q: "Warum ist das Ergebnis negativ oder unmöglich?",
        a: "Die Formel wird ohne Klemmung ausgegeben: unmögliche Eingaben — etwa eine Taille, die nicht größer als der Hals ist — erzeugen also unmögliche Ausgaben. Behandeln Sie jeden Wert unterhalb des essenziellen Fettniveaus oder oberhalb von etwa 60 % als Messfehler und messen Sie neu. Und wie immer: Diese Schätzung ist kein medizinischer Rat.",
      },
    ],
  },
  "ideal-weight-calculator": {
    name: "Idealgewicht-Rechner",
    tagline:
      "Sehen Sie Ihr Idealgewicht nach der Devine-Formel (1975) und dem gesunden BMI-Band (18,5–24,9) für Ihre Größe, angezeigt in kg oder Pfund.",
    intro: [
      "Dieser Rechner zeigt zwei ergänzende Antworten. Die Devine-Formel (1975) — 50 kg + 2,3 kg pro Zoll über 5 ft für Männer, 45,5 kg + 2,3 kg pro Zoll für Frauen — wurde ursprünglich zur Dosierung von Medikamenten wie Digoxin abgeleitet und ist die meistzitierte Idealgewichtsgleichung der Medizin. Das gesunde BMI-Band multipliziert Ihre Größe in Metern zum Quadrat mit 18,5 und 24,9, den Grenzen des WHO-Normalbereichs.",
      "Geben Sie Ihre Größe in Zentimetern oder Fuß und Zoll ein. Die beiden Methoden liegen üblicherweise ein paar Kilogramm auseinander, und genau das ist der Punkt: ein einziges Idealgewicht existiert nicht. Behandeln Sie beide Zahlen als Bezugsrahmen um eine gesunde Spanne, nicht als Ziel, in das Sie sich zwingen — die Schätzung ist kein medizinischer Rat.",
    ],
    steps: [
      "Wählen Sie metrische (cm) oder imperiale (ft + in) Einheiten.",
      "Geben Sie Ihre Größe ein.",
      "Vergleichen Sie die Devine-Schätzungen für Männer und Frauen mit dem gesunden BMI-Band.",
      "Nutzen Sie die Spanne, nicht eine Zahl, wenn Sie ein Gewichtziel setzen.",
    ],
    faqs: [
      {
        q: "Woher kommt die Devine-Formel?",
        a: "Dr. B. J. Devine veröffentlichte sie 1975 als schnellen Weg, Medikamentendosengewichte aus der Größe zu schätzen: 50 kg für die ersten 5 Fuß plus 2,3 kg pro zusätzlichem Zoll für Männer, 45,5 kg für Frauen. Als Schönheits- oder Fitnessziel war sie nie gedacht — deshalb steht das WHO-basierte BMI-Band daneben.",
      },
      {
        q: "Warum ist die Antwort eine Spanne statt einer Zahl?",
        a: "Weil gesundes Gewicht von Statur, Muskelmasse, Alter und Ethnie abhängt, passt keine einzelne Zahl. Das Band 18,5–24,9 × Größe² stammt aus der WHO-BMI-Klassifikation und deckt die Gewichte ab, die die Forschung mit dem niedrigsten Gesamtrisiko für die meisten Erwachsenen verbindet.",
      },
      {
        q: "Ist das medizinischer Rat?",
        a: "Nein — das ist eine Schätzung, kein medizinischer Rat. Athleten und sehr muskulöse Menschen liegen bei bester Gesundheit über dem Band, und manche Bedingungen verschieben die gesunde Spanne. Besprechen Sie ein Zielgewicht mit einer Fachkraft.",
      },
    ],
  },
  "water-intake-calculator": {
    name: "Wasserbedarf-Rechner",
    tagline:
      "Erhalten Sie ein tägliches Wasserziel: 35 ml pro Kilogramm Körpergewicht plus etwa 350 ml je 30 Minuten Bewegung, mit Hinweisen für heißes Wetter.",
    intro: [
      "Dieser Rechner startet von der Standard-Heuristik für Erhaltungsflüssigkeit aus der klinischen Praxis: 35 ml Wasser pro Kilogramm Körpergewicht täglich, vor jeder Aktivität. Dann addiert er etwa 350 ml je 30 Minuten Bewegung gegen Schweißverluste und zeigt Grundwert und Bewegungszuschlag getrennt, damit Sie sehen, woher die Summe kommt.",
      "Geben Sie Ihr Gewicht in Kilogramm oder Pfund und Ihre Bewegungsminuten pro Tag ein. Bei heißem Wetter oder starkem Schwitzen trinken Sie mehr als die berechnete Summe; Essen und andere Getränke liefern ebenfalls Wasser. Das Ergebnis ist eine allgemeine Hydratationsschätzung, kein medizinischer Rat.",
    ],
    steps: [
      "Wählen Sie metrische (kg) oder imperiale (lb) Einheiten.",
      "Geben Sie Ihr Körpergewicht ein.",
      "Geben Sie ein, wie viele Minuten Sie pro Tag trainieren.",
      "Lesen Sie den Grundwert, den Bewegungszuschlag und das kombinierte Tagesziel.",
    ],
    faqs: [
      {
        q: "Woher kommt die 35-ml/kg-Regel?",
        a: "Es ist die klassische Heuristik für Erhaltungsflüssigkeit von der Pädiatrie bis zum Erwachsenen, in der gesamten klinischen Praxis gebräuchlich (für Erwachsene oft als 30–35 ml/kg/Tag zitiert). Zum Vergleich: Die Europäische Behörde für Lebensmittelsicherheit setzt die angemessene Gesamtwasseraufnahme auf 2,0 L/Tag für Frauen und 2,5 L/Tag für Männer — Wasser aus Lebensmitteln mitgerechnet.",
      },
      {
        q: "Zählen Kaffee, Tee und Essen mit zum Total?",
        a: "Ja. Etwa 20–30 % der täglichen Wasseraufnahme stammen normalerweise aus Lebensmitteln, und moderate koffeinhaltige Getränke tragen zur Hydratation bei, statt sie zu entziehen. Die berechnete Zahl ist eine Richtlinie für klare Flüssigkeit zusätzlich zu normaler Ernährung — Sie müssen nicht die ganze Menge als Wasser trinken.",
      },
      {
        q: "Ist das medizinischer Rat?",
        a: "Nein — das ist eine allgemeine Schätzung. Menschen mit Herz-, Nieren- oder Lebererkrankungen und jene, denen Flüssigkeitsrestriktion verordnet wurde, brauchen oft weniger als die berechnete Menge: Folgen Sie den Anweisungen Ihrer Ärztin oder Ihres Arztes.",
      },
    ],
  },
  "pace-calculator": {
    name: "Pace-Rechner",
    tagline:
      "Berechnen Sie Laufpace pro km und pro Meile aus beliebiger Distanz und Zeit und prognostizieren Sie Wettkampfzeiten mit Peter Riegels Exponentenformel 1,06.",
    intro: [
      "Geben Sie eine Distanz ein — 5K, 10K, Halbmarathon, Marathon oder eine eigene in Kilometern oder Meilen — plus Ihre Zielzeit, und sehen Sie auf einmal Pace pro Kilometer, Pace pro Meile und Geschwindigkeit in km/h und mph. Ein Halbmarathon in 2:00 zeigt sich als 5:41/km, 9:10/Meile und 10,6 km/h ohne Kopfrechnen.",
      "Der Wettkampfprognose wendet Peter Riegels Ausdauerformel T₂ = T₁ × (D₂/D₁)^1,06 an: Geben Sie ein ehrliches Rennergebnis, und sie projiziert Ihre erwartete Zielzeit auf jede Standarddistanz vom 5K bis zum Marathon.",
    ],
    steps: [
      "Wählen Sie eine Wettkampfdistanz oder Benutzerdefiniert und geben Sie eine Distanz in km oder Meilen ein.",
      "Tippen Sie Ihre Zielzeit in Stunden, Minuten und Sekunden ein.",
      "Lesen Sie Pace pro km, Pace pro Meile und beide Geschwindigkeiten — oder wechseln Sie zur Wettkampfprognose für Projektionen auf jeder Distanz.",
    ],
    faqs: [
      {
        q: "Woher kommt die Prognoseformel?",
        a: "Von Peter Riegel, einem Forschungsingenieur, der T₂ = T₁ × (D₂/D₁)^1,06 1977 im Runner's World veröffentlichte. Der Exponent 1,06 erfasst, wie die Pace mit der Distanz nachlässt: Die doppelte Renndistanz braucht etwa 9 % mehr Zeit als die doppelte Zeit. Er setzt spezifisches Training für die Zieldistanz voraus — aus einem schnellen 5K sagt er keinen Marathon voraus, wenn Sie nie lang gelaufen sind.",
      },
      {
        q: "Warum ist die prognostizierte Pace pro km bei längeren Rennen langsamer?",
        a: "Das ist die Formel bei der Arbeit. Der Exponent 1,06 bedeutet, dass jede Distanzverdopplung über den proportionalen Anteil hinaus etwa 6 % Zusatzzeit kostet — Glykogenverbrauch, Verpflegung und Ermüdung. Kürzere Prognosen (10K aus einem Halbmarathon) fallen aus demselben Grund pro km schneller aus.",
      },
      {
        q: "Rechnet der Rechner auch mit Meilen statt Kilometern?",
        a: "Ja. Benutzerdefinierte Distanzen akzeptieren beide Einheiten, und die Ergebnisse werden immer doppelt gezeigt: Pace pro km und pro Meile, Geschwindigkeit in km/h und mph. Die Umrechnung nutzt die exakte internationale Meile von 1,609344 km.",
      },
    ],
  },
  "one-rep-max-calculator": {
    name: "1RM-Rechner",
    tagline:
      "Schätzen Sie Ihr Einwiederholungsmaximum (1RM) aus jeder Gewicht-mal-Wiederholungen-Serie mit Epley- und Brzycki-Formeln, plus eine 1–12-Trainingstabelle in Prozent des 1RM.",
    intro: [
      "Geben Sie ein Gewicht ein, das Sie gehoben haben, und die Zahl sauberer Wiederholungen, und erhalten Sie Ihr geschätztes 1RM aus zwei etablierten Formeln: Epleys w × (1 + reps/30) und Brzyckis w × 36/(37 − reps). Bei 225 lb × 10 landen beide exakt bei 300 lb — deshalb ist diese Serie ein Studio-Klassiker.",
      "Unter der Schätzung wandelt eine Trainingstabelle Ihr 1RM in Arbeitsgewichte: die schwerste Last, die Sie für jede Wiederholungszahl von 1 bis 12 erwarten dürfen, mit ihrem Prozentsatz des 1RM — die Prozentwerte, mit denen Trainer Kraft-, Hypertrophie- und Ausdauerblöcke planen.",
    ],
    steps: [
      "Geben Sie das gehobene Gewicht ein und wählen Sie kg oder lb.",
      "Geben Sie die Zahl der Wiederholungen mit sauberer Technik ein.",
      "Lesen Sie die Epley- und Brzycki-Schätzungen und die 1–12-Trainingstabelle darunter.",
    ],
    faqs: [
      {
        q: "Welcher Formel soll ich vertrauen?",
        a: "Beide sind Schätzungen aus submaximalen Serien und zwischen etwa 4 und 10 Wiederholungen am genauesten. Epley (1976) tendiert bei niedrigen Wiederholungszahlen leicht optimistisch, Brzycki (1993) leicht konservativ. Üblich ist es, die beiden Zahlen als Klammer zu lesen: Liegen sie wenige Kilogramm auseinander, ist Ihre 1RM-Schätzung verlässlich.",
      },
      {
        q: "Warum zeigt die Tabelle 75 % des 1RM für 10 Wiederholungen?",
        a: "Die Prozentwerte stammen aus der Umkehrung der Epley-Gleichung: Das Maximum für n Wiederholungen beträgt etwa 1RM × 30/(30 + n). Zehn Wiederholungen ergeben 75 %, fünf etwa 86 %. Echte Prozentwerte driften mit der Übung (Kniebeugen vertragen mehr Wiederholungen als Drücke) und mit Ihrer Faserverteilung — nehmen Sie die Tabelle als Startpunkt für Ihr Programm.",
      },
      {
        q: "Warum kann ich nicht mehr als 20 Wiederholungen eingeben?",
        a: "Weil die Formeln dort aufhören, etwas zu bedeuten. Jenseits von etwa 12 Wiederholungen dominiert die lokale Ausdauer statt der Kraft, und Brzyckis Nenner (37 − reps) kollabiert gegen null. Hohe Wiederholungszahlen messen Kondition; für eine Max-Schätzung daraus nutzen Sie eine für Ausdauerarbeit entworfene Formel.",
      },
    ],
  },
  "sleep-calculator": {
    name: "Schlafrechner",
    tagline:
      "Finden Sie die beste Zubettgehzeit für eine festgelegte Aufstehzeit — oder wann Sie aufwachen, wenn Sie jetzt schlafen — mit 90-Minuten-Schlafzyklen plus 15 Minuten Einschlafen.",
    intro: [
      "Mitten im Zyklus aufzuwachen ist es, was Morgen furchtbar macht, nicht die Gesamtzahl der Schlafstunden. Dieses Tool plant Schlaf in ganzen 90-Minuten-Zyklen: Sagen Sie ihm, wann Sie aufstehen müssen, und es listet die Zubettgehzeiten, bei denen der Wecker exakt an einer Zyklenkante klingelt — sechs Zyklen (9 Stunden) bis drei (4,5 Stunden), jeweils inklusive rund 15 Minuten zum Einschlafen.",
      "Gehen Sie gleich jetzt ins Bett? Der umgekehrte Modus addiert Zyklen nach vorn: Wer um 23:30 einschläft, hat natürliche Aufwachpunkte um 01:15, 02:45, 04:15, 05:45, 07:15 und 08:45 — nehmen Sie den frühesten, der noch genug Ruhe lässt.",
    ],
    steps: [
      "Wählen Sie Aufstehzeit → Zubettgehzeit oder Jetzt schlafen → Aufwachzeiten.",
      "Geben Sie die Zeit ein, zu der Sie aufstehen müssen, oder die Zeit, zu der Sie ins Bett gehen.",
      "Wählen Sie eine Zeile: Jede ist eine ganze Zahl von 90-Minuten-Zyklen, mit angezeigter Schlafdauer.",
    ],
    faqs: [
      {
        q: "Dauern Schlafzyklen wirklich 90 Minuten?",
        a: "90 Minuten ist der häufig zitierte Durchschnitt, doch einzelne Zyklen variieren von etwa 80 bis 120 Minuten, und die Zyklen derselben Person unterscheiden sich über die Nacht. Deshalb sind die Zeiten hier Ziele, keine Garantien: Bleiben Sie nach zwei Wochen zyklengetakteter Wecker benommen, verschieben Sie die Bettzeit um 15–20 Minuten und sehen Sie, ob die Morgene besser werden.",
      },
      {
        q: "Warum rechnet der Rechner 15 Minuten dazu?",
        a: "Weil der erste Zyklus erst beginnt, wenn Sie tatsächlich einschlafen, und die meisten Leute etwa 10 bis 20 Minuten brauchen. Das Tool budgetiert 15 Minuten zwischen dem Hinlegen und dem Beginn des ersten Zyklus; fallen Sie schneller oder langsamer in den Schlaf, rechnen Sie die Differenz gedanklich dazu oder ab.",
      },
      {
        q: "Wie viele Zyklen brauche ich?",
        a: "Den meisten Erwachsenen geht es mit 5 Zyklen (7,5 Stunden) gut, viele brauchen 6 (9 Stunden); 4 Zyklen (6 Stunden) reichen manchen kurzfristig, selten langfristig. Regelmäßigkeit des Rhythmus zählt so viel wie die Gesamtmenge — dieselben 6 Zyklen bei stark schwankenden Bettzeiten lassen Sie schlechter dastehen.",
      },
    ],
  },
  "workdays-calculator": {
    name: "Arbeitstage-Rechner",
    tagline:
      "Zählen Sie Arbeitstage zwischen zwei Daten oder addieren und subtrahieren Sie Werktage auf ein Datum — mit eigener Wochenenddefinition und eigener Feiertagsliste.",
    intro: [
      "Vertragsfristen, Vorlaufzeiten und SLA-Uhren laufen auf Arbeitstagen, nicht auf Kalendertagen. Zählen Sie die Arbeitstage zwischen zwei Daten (beide Endpunkte inklusive: Montag bis Freitag sind 5), oder gehen Sie N Werktage vor oder zurück von einem Basisdatum und sehen Sie das genaue Landungsdatum mit Wochentag.",
      "Fügen Sie Ihre eigene Feiertagsliste ein — ein JJJJ-MM-TT pro Zeile —, um Betriebsferien und Feiertage auszuschließen, und ändern Sie die Wochenenddefinition, wenn Ihre Woche auf Freitag und Samstag ruht. Die gesamte Datenrechnung läuft auf UTC-Tageszahlen, darum verschieben Sommerzeitwechsel nie ein Ergebnis um einen Tag.",
    ],
    steps: [
      "Wählen Sie Arbeitstage zwischen oder Arbeitstage addieren / subtrahieren.",
      "Geben Sie die zwei Daten ein, oder ein Basisdatum und die Zahl der zu bewegenden Werktage.",
      "Setzen Sie optional die Wochenendtage und fügen Sie Feiertagsdaten ein, ein JJJJ-MM-TT pro Zeile.",
      "Lesen Sie die Zählung mit Aufschlüsselung oder das Ergebnisdatum mit Wochentag.",
    ],
    faqs: [
      {
        q: "Werden die Enddaten mitgezählt?",
        a: "Ja — die Zählung zwischen zwei Daten schließt beide Enden ein: Montag 2026-11-02 bis Freitag 2026-11-06 sind 5 Arbeitstage, ein Freitag-bis-Montag-Spann sind 2. Im Addieren/Subtrahieren-Modus wird das Startdatum nicht verbraucht: Freitag + 1 Werktag landet Montag, und Samstag + 1 landet ebenfalls Montag.",
      },
      {
        q: "Wie gebe ich Feiertage ein?",
        a: "Ein Datum pro Zeile im Format JJJJ-MM-TT, etwa 2026-11-26 für Thanksgiving in den USA. Ungültige Zeilen werden ignoriert, statt die Zählung zu brechen, Duplikate sind harmlos, und ein Feiertag auf Ihren Wochenendtag ändert schlicht nichts — er war schon ausgeschlossen.",
      },
      {
        q: "Warum erwähnt das Tool UTC und Sommerzeit?",
        a: "Datenrechnung in lokaler Zeit kann um Sommerzeitwechsel um einen Tag driften — ein Bereich, der den November- oder Märzwechsel kreuzt, kann in manchen Browsern einen Tag zu kurz oder zu lang ausfallen. Ganze UTC-Tage zu zählen umgeht das Problem völlig: Freitag bis Montag sind 2 Werktage überall auf der Welt.",
      },
    ],
  },
  "cooking-conversion": {
    name: "Küchen-Umrechner",
    tagline:
      "Rechnen Sie Cups, Esslöffel und Teelöffel in Gramm und Unzen für 24 gängige Zutaten um, mit Backofen-°F↔°C-Tabelle — alles Durchschnittswerte, ohne Serverrunden.",
    intro: [
      "Eine Tasse Mehl ist nicht eine Tasse Honig: Volumen in Gewicht umzurechnen braucht die Dichte der Zutat, keinen einzelnen Zauberfaktor. Wählen Sie eine von 24 gängigen Zutaten — Mehl 120 g/Cup, Zucker 200, Butter 227, Honig 340, Kakao 100, Haferflocken 90 — und rechnen Sie in beide Richtungen zwischen Cups, Esslöffeln, Teelöffeln, Flüssigunzen, Millilitern und Litern auf der einen und Gramm, Kilogramm, Unzen und Pfund auf der anderen Seite.",
      "Volumen-zu-Volumen- (2 Cups = 480 ml) und Gewicht-zu-Gewicht-Umrechnungen (1 lb = 453,6 g) funktionieren ohne Zutatenwahl, und eine zweiseitige Ofentabelle übersetzt die Standard-°F-Einstellungen in °C — 350 °F sind 175 °C —, sodass fremde Rezepte aufhören, Rätselraten zu sein.",
    ],
    steps: [
      "Wählen Sie die Zutat aus der Liste (überspringen Sie das für Volumen-zu-Volumen oder Gewicht-zu-Gewicht).",
      "Geben Sie die Menge ein, die das Rezept verlangt.",
      "Wählen Sie die Ausgangseinheit und die Zieleinheit.",
      "Lesen Sie das Ergebnis oder schlagen Sie die Ofentemperatur in der °F↔°C-Tabelle nach.",
    ],
    faqs: [
      {
        q: "Wie genau sind die Gramm-pro-Cup-Werte?",
        a: "Es sind veröffentlichte Durchschnittswerte (King Arthur, USDA und ähnliche Quellen), und echte Löffel variieren: Eine Tasse Mehl kann um ±15 % abweichen, je nachdem, ob Sie löffelnd und glatt streichen oder direkt aus der Tasse schöpfen. Für den Alltagskoch funktioniert das gut; beim Backen, wo Präzision zählt, wiegen Sie die Zutaten und behandeln Sie die Tabelle als Schätzung.",
      },
      {
        q: "Welchen Cup nutzt das Tool?",
        a: "Den US-Koch-Cup von 240 ml, den die meisten amerikanischen Rezepte und Umrechnungstabellen annehmen. Das sind 16 Esslöffel à 15 ml oder 48 Teelöffel à 5 ml. Wurde ein Rezept mit metrischen Messcups (250 ml) oder britischen Imperialcups (284 ml) geschrieben, verschieben sich die Ergebnisse um einige Prozent — skalieren Sie entsprechend.",
      },
      {
        q: "Warum ergeben 350 °F 175 °C und nicht 176,7 °C?",
        a: "Die exakte Umrechnung ist (350 − 32) × 5/9 = 176,7 °C, aber Öfen sind in 5–10-Grad-Schritten markiert, und Rezeptautoren runden auf die nächste vertraute Einstellung — 175 °C ist daher die Standardpaarung. Die Tabelle zeigt diese konventionellen Paare; die echte Temperatur am Ofenknopf ist ohnehin annähernd.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* Entwickler — Platzhalterbild-Generator                               */
  /* ------------------------------------------------------------------ */
  "placeholder-image-generator": {
    name: "Platzhalterbild-Generator",
    tagline:
      "Erzeugen Sie Platzhalterbilder jeder Größe in SVG, PNG oder JPG — Farben und Label wählen, sofort Vorschau, dann Datei herunterladen oder das SVG-Markup kopieren.",
    intro: [
      "Mockups und Wireframes brauchen Bildboxen, bevor die echten Assets existieren. Tippen Sie Breite und Höhe — ein Hero mit 1200×630, ein Avatar mit 256×256 oder alles von 1×1 bis 5000×5000 —, wählen Sie Hintergrund- und Textfarbe, fügen Sie optional ein Label hinzu, und der Platzhalter rendert live beim Tippen.",
      "Laden Sie das Ergebnis als SVG, PNG oder JPG herunter oder kopieren Sie das SVG-Markup direkt in die Zwischenablage: Es sind eine Handvoll lesbarer Elemente, keine Base64-Suppe, also können Sie es in HTML, JSX oder Figma einfügen und Text und Farben von Hand bearbeiten. Alles wird in Ihrem Browser erzeugt; nichts wird hochgeladen.",
    ],
    steps: [
      "Geben Sie Breite und Höhe in Pixeln ein.",
      "Setzen Sie Hintergrund- und Textfarbe und ein optionales Label (Standard: die Maße).",
      "Laden Sie als SVG, PNG oder JPG herunter — oder kopieren Sie das SVG-Markup und fügen es überall ein.",
    ],
    faqs: [
      {
        q: "Wann nehme ich SVG statt PNG oder JPG?",
        a: "SVG ist Text: winzig, unendlich skalierbar und von Hand editierbar — ideal für Mockups, Docs und E-Mail-taugliche Layouts. PNG ist die sicherere Wahl für Plattformen, die Inline-SVG verhunzen (manche CMS und Chat-Apps), und JPG passt für fotoähnliche Platzhalter bei kleinen Dateigrößen. Die Vorschau ist in allen drei identisch.",
      },
      {
        q: "Welche Größen- und Farbgrenzen gibt es?",
        a: "Breite und Höhe müssen ganze Zahlen zwischen 1 und 5000 Pixeln sein; Farben müssen Hex sein — #RRGGBB oder die kurze #RGB-Form. Alles andere wird mit einem Hinweis abgewiesen, statt still ein kaputtes Bild zu erzeugen.",
      },
      {
        q: "Wird etwas an einen Server gesendet?",
        a: "Nein. Das SVG wird aus einer Zeichenkettenvorlage in Ihrem Browser gebaut, und die Rasterversionen werden auf einem lokalen Canvas gezeichnet. Nichts verlässt die Seite — es funktioniert offline und ist sicher für unveröffentlichte Designs.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* Taschenrechner und Timer — Lohn, Miete, Zinsen, Gesundheit, Zeit     */
  /* ------------------------------------------------------------------ */
  "overtime-pay-calculator": {
    name: "Überstundenrechner",
    tagline:
      "Berechnen Sie Überstunden zum 1,5×- oder 2×-Faktor Ihres Stundenlohns — Regelvergütung, Zuschlag, Wochensumme und aus dem Gehalt hochgerechneter Jahreswert.",
    intro: [
      "Geben Sie einen Stundenlohn ein — oder ein Jahresgehalt, das der Rechner über Ihre regulären Wochenstunden umrechnet — und ergänzen Sie die Überstunden, die Sie voraussichtlich leisten. Die Ergebnisse trennen Regelvergütung und Überstundenzuschlag: standardmäßig Zeit und ein Halb, doppelte Vergütung, wenn Vertrag oder lokale Regeln sie vorsehen.",
      "Alles aktualisiert sich live: der erhöhte Überstundensatz, Regel- und Überstundenvergütung der Woche, die kombinierte Wochensumme und der hochgerechnete Jahreswert, multipliziert mit den Wochen, die Sie im Jahr tatsächlich arbeiten. Es spiegelt, wie der US-amerikanische Fair Labor Standards Act (FLSA) Überstunden für nicht befreite Arbeitnehmer berechnet.",
    ],
    steps: [
      "Geben Sie Ihren Stundenlohn ein oder wechseln Sie in den Gehaltsmodus und tragen Sie Ihr Jahresgehalt ein.",
      "Setzen Sie Ihre regulären Wochenstunden (Standard 40) und Wochen pro Jahr.",
      "Fügen Sie die Überstunden hinzu und wählen Sie den Faktor — 1,5× oder 2×.",
      "Lesen Sie den Überstundensatz, die Wochenaufteilung und den hochgerechneten Gesamtwert.",
    ],
    faqs: [
      {
        q: "Wann müssen in den USA Überstunden bezahlt werden?",
        a: "Nach dem FLSA müssen nicht befreite Arbeitnehmer mindestens das 1,5-Fache ihres Regelsatzes für jede Stunde über 40 hinaus in der Arbeitswoche erhalten. Die Befreiung hängt von Aufgaben und Gehaltsstufe ab; manche Bundesstaaten gehen weiter — Kalifornien löst zum Beispiel bereits ab 8 Stunden täglich Überstunden aus. Ein Stundenlohn von 25,00 bringt 37,50 pro Überstunde.",
      },
      {
        q: "Wie rechnet der Gehaltsmodus mein Gehalt in einen Stundenlohn um?",
        a: "Er teilt das Jahresgehalt durch reguläre Wochenstunden × Wochen pro Jahr — dieselbe Basis wie die Umrechnung Gehalt in Stundenlohn. Ein Gehalt von 52.000 bei 40-Stunden-Wochen und 52 Wochen ergibt exakt 25,00 pro Stunde, sodass fünf Überstunden mit 1,5× 187,50 auf die reguläre Woche von 1.000,00 obendrauf legen.",
      },
      {
        q: "Fließt mein gesamtes Gehalt in den Überstundensatz ein?",
        a: "Der FLSA berechnet Überstunden auf den „Regelsatz“, der mehr als den Grundlohn enthalten kann — etwa Schichtzuschläge und nicht freiwillige Boni. Dieser Rechner nutzt den reinen Basissatz; mit solchen Zusatzleistungen kann Ihr gesetzlicher Überstundensatz höher ausfallen als hier angezeigt.",
      },
    ],
  },
  "rent-affordability-calculator": {
    name: "Mietbelastungsrechner",
    tagline:
      "Ermitteln Sie die maximale Miete nach der 30-, 33- oder 40-%-Regel — und sehen Sie, was nach Schulden und Mieterversicherung monatlich übrig bleibt.",
    intro: [
      "Geben Sie Ihr Monatseinkommen ein (brutto oder netto), wählen Sie eine Mietbelastungsquote — die klassischen 30 % des Brutto, ein großzügigeres 33 % oder 40 % des Netto für teure Städte — und der Rechner zieht Ihre Mietobergrenze. Andere monatliche Schulden und die Mieterversicherung werden abgezogen, damit die Zahl wirklich lebensnah bleibt.",
      "Außerdem erhalten Sie den Verschuldungsgrad (DTI), den Sie bei dieser maximalen Miete trügen — genau die Kennzahl, die Kreditgeber vor der Zusage für Mietvertrag oder Hypothek prüfen. Die Budgetzeile wird ehrlich negativ, wenn Miete plus Schulden Ihr Einkommen übersteigen — ein Signal, lieber günstiger zu suchen als zu strecken.",
    ],
    steps: [
      "Geben Sie Ihr Monatseinkommen ein und kennzeichnen Sie es als brutto oder netto.",
      "Wählen Sie die Mietbelastungsquote: 30 %, 33 % oder 40 %.",
      "Fügen Sie weitere monatliche Schulden und ggf. die Mieterversicherung hinzu.",
      "Lesen Sie die Mietobergrenze, das verbleibende Budget und Ihren Verschuldungsgrad.",
    ],
    faqs: [
      {
        q: "Woher kommt die 30-%-Regel für Mieten?",
        a: "Sie geht auf den US-amerikanischen Brooke Amendment von 1969 zurück, der die Miete im sozialen Wohnungsbau auf 25 % des Einkommens deckelte und 1981 auf 30 % angehoben wurde. Das HUD nennt Haushalte, die mehr als 30 % ihres Einkommens für Wohnen ausgeben, bis heute „cost-burdened“ — deshalb haben sich 30 % des Bruttoeinkommens als Kürzel für bezahlbare Miete gehalten.",
      },
      {
        q: "Sollte ich die Miete vom Brutto- oder Nettoeinkommen budgetieren?",
        a: "Die klassische 30-%-Regel gilt für das Bruttoeinkommen, ignoriert also Steuern und wirkt großzügiger als Ihr Gehaltszettel. Wenn Sie lieber mit dem Netto planen, landen Sie mit einer höheren Quote wie 40 % des Netto ungefähr am selben Punkt. Entscheidend ist, eine Basis zu wählen und dabei zu bleiben.",
      },
      {
        q: "Was bedeutet der Verschuldungsgrad hier?",
        a: "Er ist der Anteil Ihres Einkommens, den die maximale Miete plus die angegebenen Schulden und die Versicherung auffressen. Kreditgeber mögen einen Gesamt-DTI unter etwa 36 %; oberhalb von rund 43 % wird eine Hypothek schwer zu bekommen. Ein hoher Wert bedeutet, dass die Mietobergrenze im Verhältnis zu Ihren anderen Verpflichtungen zu ambitioniert ist.",
      },
    ],
  },
  "apy-calculator": {
    name: "APY-Rechner",
    tagline:
      "Rechnen Sie einen nominalen APR in den effektiven APY um — und zurück — täglich, monatlich, vierteljährlich oder jährlich verzinst, optional mit Einlage.",
    intro: [
      "Ein Nominalzins und ein Effektivzins sind nicht dieselbe Zahl, und Werbungen wählen stillschweigend den günstigeren. Geben Sie einen Zinssatz und eine Verzinsungshäufigkeit ein — täglich (365), monatlich, vierteljährlich oder jährlich — und der Rechner wandelt APR in APY um oder den APY zurück in den nominalen APR, der ihn erzeugen würde.",
      "Fügen Sie optional eine Einlage und einen Horizont in Jahren hinzu, um zu sehen, woraus das Geld wirklich wird: das Guthaben nach Verzinsung und die darauf verdienten Zinsen. Die Umrechnung ist in beide Richtungen exakt — drehen Sie die Richtung um und prüfen Sie den Roundtrip gegen jedes Bankangebot.",
    ],
    steps: [
      "Tippen Sie den genannten Zinssatz ein — einen nominalen APR oder einen effektiven APY.",
      "Wählen Sie die Verzinsungshäufigkeit: täglich, monatlich, vierteljährlich oder jährlich.",
      "Fügen Sie optional eine Einlage und die Anzahl der Jahre für die Projektion hinzu.",
      "Lesen Sie den umgerechneten Zinssatz, das Endguthaben und die verdienten Zinsen.",
    ],
    faqs: [
      {
        q: "Warum ist der APY bei gleichem Nominalzins höher als der APR?",
        a: "Weil Verzinsung Zinsen auf Zinsen zahlt. APY = (1 + r ÷ n)^n − 1: ein nominaler Satz von 12 % bei monatlicher Verzinsung wird zu (1,01)^12 − 1 = 12,6825 % effektiv — die zusätzlichen 0,6825 Punkte sind die Zinsen, die Ihre Zinsen verdienen. Je öfter verzinst wird, desto größer die Lücke: täglich schlägt monatlich, monatlich schlägt jährlich.",
      },
      {
        q: "Welchen Zinssatz sollte ich zwischen Banken vergleichen?",
        a: "Vergleichen Sie APY mit APY bei Sparprodukten und Festgeldern — er faltet die Verzinsungshäufigkeit schon ein, daher ist ein APY von 5,10 % bei monatlicher Verzinsung wirklich besser als ein APY von 5,05 % bei jährlicher. Bei Krediten vergleichen Sie APR mit APR. APR und APY in einem Vergleich zu mischen ist genau die Art, wie Angebote in die Irre führen.",
      },
      {
        q: "Nutzt die tägliche Option 365 oder 360 Tage?",
        a: "Dieser Rechner nutzt 365 Perioden pro Jahr, die Konvention, der die meisten Sparanlagen für Verbraucher folgen. Manche Finanzprodukte annualisieren stattdessen auf 360-Tage-Basis, was den Effektivzins leicht verschiebt — steht im Kleingedruckten 360, betrachten Sie das Ergebnis als nahe Approximation statt als exaktes Angebot.",
      },
    ],
  },
  "gpa-calculator": {
    name: "GPA-Rechner",
    tagline:
      "Rechnen Sie Semesterkurse mit Standard-Qualitätspunkten in einen 4,0-Skala-GPA um und verschmelzen Sie bisherige Credits zu einem ehrlichen kumulierten GPA.",
    intro: [
      "Fügen Sie jeden Kurs mit Credit Hours und Buchstabenote hinzu, und der Rechner wendet die Standard-Qualitätspunkttabelle auf der 4,0-Skala an — A = 4,0, A− = 3,7, B+ = 3,3 und so weiter — und gewichtet jede Note mit ihren Credits. Ein A über 4 Credits zählt mehr als ein A über 3 Credits, genau wie auf Ihrem Transcript.",
      "Sie haben schon Noten gesammelt? Geben Sie Ihren bisherigen GPA und die bisher erworbenen Credits ein, dann verschmilzt das Semesterergebnis zu einem kumulierten GPA — mit derselben gewichteten Durchschnittsberechnung, die auch Ihr Prüfungsamt fährt. Unvollständige Zeilen werden übersprungen statt geschätzt, die Zahl spiegelt also nur tatsächlich eingetragene Kurse.",
    ],
    steps: [
      "Fügen Sie pro Kurs eine Zeile hinzu: Name (optional), Credit Hours und Buchstabenote.",
      "Lassen Sie die bisherigen Felder im ersten Semester leer oder tragen Sie Ihren bisherigen GPA ein.",
      "Geben Sie die bisher erworbenen Credits ein, damit die Verschmelzung korrekt gewichtet wird.",
      "Lesen Sie den Semester-GPA und den kombinierten kumulierten GPA.",
    ],
    faqs: [
      {
        q: "Welche Qualitätspunkte trägt jede Buchstabenote?",
        a: "Auf der Standard-4,0-Skala: A+ und A = 4,0, A− = 3,7, B+ = 3,3, B = 3,0, B− = 2,7, C+ = 2,3, C = 2,0, C− = 1,7, D+ = 1,3, D = 1,0, D− = 0,7 und F = 0. GPA = Σ(Punkte × Credits) ÷ ΣCredits: ein A über 4 Credits bringt 12 Qualitätspunkte gegen 9,9 für ein B+ über 3 Credits.",
      },
      {
        q: "Wie wird der kumulierte GPA aus zwei Nachweisen verschmolzen?",
        a: "Kumulierter GPA = (Semester-GPA × Semester-Credits + bisheriger GPA × bisherige Credits) ÷ Gesamtcredits. Beispiel: ein Semester mit 3,60 über 7 Credits auf einem Transcript mit 3,00 über 60 Credits ergibt (3,60 × 7 + 3,00 × 60) ÷ 67 ≈ 3,06. Die Gewichtung nach Credits verhindert, dass ein leichtes Semester Ihren Schnitt verzieht.",
      },
      {
        q: "Warum ändert eine Zeile ohne Note oder Credits meinen GPA nicht?",
        a: "Ein Kurs zählt nur, wenn Credit Hours und Buchstabenote beide vorliegen — alles Halb ausgefüllte wird verworfen statt als Null gewertet, damit der GPA die tatsächlich abgeschlossenen Kurse widerspiegelt. Vervollständigen Sie die Zeile, und die Summen aktualisieren sich sofort.",
      },
    ],
  },
  "heart-rate-zones-calculator": {
    name: "Herzfrequenz-Zonenrechner",
    tagline:
      "Verwandeln Sie Maximale und Ruhepuls in fünf Trainingszonen nach der Karvonen-Methode — Aufwärmen, Fettverbrennung, aerob, anaerob und VO₂ max, in bpm.",
    intro: [
      "Geben Sie Ihr Alter und Ihren Ruhepuls ein, und der Rechner schätzt Ihre maximale Herzfrequenz (206,9 − 0,67 × Alter, eine Regression aus laborgezogenen Maximalwerten) und schneidet die Spanne zwischen Ruhe und Maximum in die fünf klassischen Trainingszonen. Ein 30-Jähriger mit Ruhepuls 60 bpm erhält ein Maximum nahe 187 bpm und ein aerobes Z3-Band von etwa 149–161 bpm — echte Zahlen, an denen Sie Brustgurt oder Uhr abgleichen können.",
      "Die Zonen folgen der Karvonen-Methode über die Herzfrequenzreserve: bpm = Ruhe + % × (Max − Ruhe). Weil die Reserve — nicht das Maximum — skaliert wird, bleiben die Zonen ehrlich für Menschen mit ungewöhnlich niedrigem oder hohem Ruhepuls. Kennen Sie Ihr gemessenes Maximum aus einem Labortest oder einem harten Rennen? Wechseln Sie auf Manuell und geben Sie es direkt ein.",
    ],
    steps: [
      "Geben Sie Ihr Alter ein, um die maximale Herzfrequenz zu schätzen, oder wechseln Sie auf Manuell und tragen Sie einen Messwert ein.",
      "Geben Sie Ihren Ruhepuls ein — am besten die Messung am Morgen, bevor Sie aufstehen.",
      "Lesen Sie die fünf Zonen mit ihrem Reserveprozentsatz und bpm-Bereich.",
      "Gleichen Sie Uhr oder Brustgurt beim Training auf die Zielzone ab.",
    ],
    faqs: [
      {
        q: "Ist 206,9 − 0,67 × Alter genauer als 220 − Alter?",
        a: "Ja, auf Populationsebene. Die alte 220−Alter-Regel geht auf eine nie begutachtete Tabelle der 1970er zurück und überschätzt die maximale Herzfrequenz älterer Menschen. Moderne Regressionen an laborgezogenen Maximalwerten — Tanakas 208 − 0,7 × Alter, Gellishs 207 − 0,7 × Alter und ähnliche Gleichungen wie die hier genutzten 206,9 − 0,67 × Alter — treffen reale Maxima über alle Altersgruppen deutlich besser. Jede Gleichung trägt aber eine individuelle Streuung von rund ±10 bpm: die Schätzung ist ein Startpunkt, und ein im Labor gemessenes Maximum oder eine wirklich voll ausgereizte Anstrengung gewinnt immer.",
      },
      {
        q: "Warum nutzt der Rechner die Herzfrequenzreserve (HRR) statt eines Prozentsatzes der maximalen Herzfrequenz?",
        a: "Die Karvonen-Methode misst die Intensität aus der Spanne zwischen Ruhe- und Maximalfrequenz — dem Teil, der tatsächlich arbeitet. Direkt als % des Maximums läge die 60–70%-Zone im obigen 30-Jahre-Beispiel bei 112–131 bpm; als % der Reserve bei 136–149 bpm. Physiologisch skaliert die Anstrengung damit, wie viel Reserve Sie nutzen: reservebasierte Zonen passen besser zu ventilatorischen Schwellen und empfängter Anstrengung — besonders bei Menschen mit niedrigem Ruhepuls.",
      },
      {
        q: "Wie messe ich meinen Ruhepuls?",
        a: "Messen Sie morgens, direkt nach dem Aufwachen und vor dem Aufstehen: zählen Sie den Puls 60 Sekunden lang (oder 30 Sekunden × 2) und wiederholen Sie das ein paar Tage, um Störungen zu mitteln. Der 7-Tage-Ruhewert eines Wearables taugt auch. Typische Erwachsene liegen zwischen 60 und 80 bpm; gut trainierte Ausdauersportler oft im Bereich von 40ern oder 50ern. Liegt Ihr Ruhepuls über Ihrem geschätzten Maximum — oder beeinflusst Medikation wie Betablocker Ihre Herzfrequenz —, geben Sie beide Werte manuell ein.",
      },
    ],
  },
  "shoe-size-converter": {
    name: "Schuhgrößen-Umrechner",
    tagline:
      "Rechnen Sie Schuhgrößen zwischen US-, UK-, EU- und japanischen Systemen für Damen und Herren um — verankert an der Fußlänge in Zentimetern.",
    intro: [
      "Wählen Sie ein beliebiges System und eine Größe, und alle Entsprechungen erscheinen auf einmal — verankert an der Fußlänge in Zentimetern, damit der Vergleich physikalisch ist und nicht geraten.",
      "Größen sind markenübergreifend nicht genormt — behandeln Sie die Ergebnisse als Startpunkt und messen Sie Ihre Füße am Abend, wenn sie am größten sind.",
    ],
    steps: [
      "Wählen Sie Herren- oder Damengrößen.",
      "Wählen Sie das System, das Sie kennen, und geben Sie die Größe ein.",
      "Lesen Sie die entsprechenden Größen in allen anderen Systemen.",
    ],
    faqs: [
      {
        q: "Warum weichen Marken um eine halbe Größe ab?",
        a: "Leisten und Fertigung variieren. Die Tabelle liefert die Standardumrechnung; einzelne Marken fallen kleiner oder größer aus — prüfen Sie deshalb vor der Onlinebestellung immer die Größentabelle der Marke.",
      },
      {
        q: "Wie messe ich meine Füße?",
        a: "Stellen Sie sich am Abend auf ein Blatt Papier, umfahren Sie beide Füße und messen Sie von der Ferse bis zum längsten Zeh, in Zentimetern. Nehmen Sie den größeren Fuß.",
      },
    ],
  },
  "stopwatch": {
    name: "Stoppuhr",
    tagline:
      "Eine präzise Online-Stoppuhr mit Zwischenzeiten — Start, Pause, Runde und Zurücksetzen, mit driftfreier Messung an der Systemuhr verankert.",
    intro: [
      "Sie misst die verstrichene Zeit auf die Hundertstelsekunde über die Systemuhr statt über aufsummierte Intervalle — so bleibt sie genau, selbst wenn der Browser einen Hintergrund-Tab drosselt.",
      "Während des Laufs können Sie Runden aufzeichnen; jede Runde zeigt ihre eigene Zwischenzeit und die laufende Gesamtzeit, auf großen Ziffern mit Tabellarischen Stellen, die man auf einen Blick erfasst.",
    ],
    steps: [
      "Klicken Sie auf Start, um die Messung zu beginnen.",
      "Klicken Sie auf Runde, um eine Zwischenzeit zu erfassen, ohne die Uhr anzuhalten.",
      "Pausieren Sie, setzen Sie fort oder setzen Sie jederzeit zurück.",
    ],
    faqs: [
      {
        q: "Ist sie genau?",
        a: "Ja — die verstrichene Zeit wird über Date.now() gegen einen festen Startzeitstempel abgeleitet, nicht über aufsummierte Timer-Rückrufe: Das Drosseln eines Hintergrund-Tabs kann keine Drift verursachen.",
      },
      {
        q: "Überleben Runden ein Neuladen der Seite?",
        a: "Nein — wie eine physische Stoppuhr löscht Zurücksetzen oder Neuladen die Sitzung. Halten Sie den Tab offen, um Runden zu behalten.",
      },
    ],
  },
  "countdown-timer": {
    name: "Countdown-Timer",
    tagline:
      "Stellen Sie einen Countdown mit Fortschrittsring und Signalton bei null ein — 1- bis 25-Minuten-Voreinstellungen oder jede beliebige eigene Dauer.",
    intro: [
      "Ein aufgeräumter Countdown für Kochen, Workouts, Meetings und Lernblöcke. Der Ring zeigt den Fortschritt auf einen Blick, und bei Ablauf ertönt ein kurzer synthetischer Signalton.",
      "Die Frist ist an der Systemuhr verankert, sodass der Countdown korrekt weiterläuft, selbst wenn Sie in einen anderen Tab wechseln.",
    ],
    steps: [
      "Stellen Sie Stunden, Minuten und Sekunden ein — oder tippen Sie auf eine Schnellvoreinstellung.",
      "Klicken Sie auf Start; der Ring leert sich mit vergehender Zeit.",
      "Bei null ertönt ein Signalton und der Ring wird grün.",
    ],
    faqs: [
      {
        q: "Läuft er in einem Hintergrund-Tab weiter?",
        a: "Ja — die Frist ist an der Systemuhr verankert, daher beeinträchtigen Tab-Wechsel oder Drosselung die Restzeit nicht.",
      },
      {
        q: "Höre ich den Signalton?",
        a: "Es ist ein kurzer synthetisierter Ton über WebAudio. Lassen Sie den Tab nicht stummschaltet und stellen Sie die Geräte-Lautstärke hoch; es gibt keine Audio-Datei zum Herunterladen.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* Entwicklung — TypeScript, JSON-Diff, JSON-Pfade, YAML                */
  /* ------------------------------------------------------------------ */
  "json-to-typescript": {
    name: "JSON zu TypeScript",
    tagline:
      "TypeScript-Interfaces aus beliebigem JSON erzeugen — verschachtelte Objekte, Arrays und Unions, fertig zum Einfügen in Ihr Projekt.",
    intro: [
      "Fügen Sie eine JSON-Antwort ein und erhalten sofort typisierte Interfaces: verschachtelte Objekte werden zu benannten Interfaces, Objekt-Arrays verschmelzen zu einer Form, gemischte Arrays werden zu Unions. Der Root-Name ist konfigurierbar.",
      "Gebaut für API-Arbeit — Antwort einfügen, Typen kopieren, und der Compiler überwacht Formänderungen für Sie.",
    ],
    steps: [
      "Fügen Sie Ihr JSON ein (eine API-Antwort funktioniert am besten).",
      "Ändern Sie den Root-Interface-Namen, falls Root nicht passen soll.",
      "Kopieren Sie die erzeugten Interfaces in Ihr Projekt.",
    ],
    faqs: [
      {
        q: "Wie werden Arrays behandelt?",
        a: "Arrays aus Objekten verschmelzen die Schlüssel aller Elemente zu einem Interface (fehlende Schlüssel wären zur Laufzeit ohnehin ein Fehler). Arrays mit gemischten Typen werden zu einer Union wie string | number. Leere Arrays degradieren zu unknown[].",
      },
      {
        q: "Sind alle Felder erforderlich?",
        a: "Ja — eine einzelne Probe kann Optionalität nicht beweisen, also ist alles erforderlich. Markieren Sie optionale Felder selbst, wo Ihre API null oder fehlende Schlüssel erlaubt.",
      },
    ],
  },
  "json-diff": {
    name: "JSON-Diff",
    tagline:
      "Zwei JSON-Dokumente Pfad für Pfad vergleichen — hinzugefügte, entfernte und geänderte Schlüssel mit Vorher/Nachher-Werten, komplett lokal.",
    intro: [
      "Fügen Sie zwei JSON-Dokumente ein und sehen Sie jeden strukturellen Unterschied: hinzugefügte Schlüssel, entfernte Schlüssel, geänderte Werte — jeder mit seinem vollständigen Pfad wie $.user.name gemeldet.",
      "Verschachtelte Objekte und Arrays werden rekursiv durchwandert: eine Änderung drei Ebenen tief taucht trotzdem mit exaktem Pfad und beiden Werten auf.",
    ],
    steps: [
      "Fügen Sie das erste JSON ein (das Original).",
      "Fügen Sie das zweite JSON ein (die neue Version).",
      "Lesen Sie die Diff-Liste — jede Zeile ist eine Änderung auf Pfad-Ebene.",
    ],
    faqs: [
      {
        q: "Wie werden Arrays verglichen?",
        a: "Nach Index: Element 0 gegen Element 0 und so weiter. Zusätzliche Elemente auf einer Seite erscheinen als hinzugefügt oder entfernt an ihrem Index.",
      },
      {
        q: "Spielt die Schlüsselreihenfolge eine Rolle?",
        a: "Nein — Objekte werden nach Schlüsseln verglichen, nicht nach Einfügereihenfolge. Zwei Dokumente mit denselben Schlüsseln in anderer Reihenfolge sind identisch.",
      },
    ],
  },
  "json-path-query": {
    name: "JSON-Path-Abfrage",
    tagline:
      "Jeden Wert aus JSON mit einem Pfad wie $.user.name oder $.items[0].id holen — sofort, nachsichtig, ohne jq-Syntax zu lernen.",
    intro: [
      "Zeigen Sie exakt auf den Wert, den Sie brauchen: Punktnotation, Array-Indizes und quotierte Schlüssel funktionieren alle ($.items[0].id, $['weird key']). Ideal, um ein einzelnes Feld aus einer riesigen API-Antwort zu ziehen.",
      "Wirft nie — ein falscher Pfad liefert einen verständlichen Grund (Schlüssel nicht gefunden, Index außerhalb des Bereichs), damit Sie korrigieren und es erneut versuchen.",
    ],
    steps: [
      "Fügen Sie Ihr JSON ein.",
      "Tippen Sie den Pfad zum gewünschten Wert — $ ist die Wurzel.",
      "Kopieren Sie den extrahierten Wert.",
    ],
    faqs: [
      {
        q: "Welche Pfad-Syntax wird unterstützt?",
        a: "Der Alltagsteilmenge: Punktnotation ($.a.b), Array-Indizes ($.items[0]), quotierte Schlüssel ($['odd key']). Vollständige JSONPath-Filter und Wildcards sind außerhalb des Scopes — dieses Tool ist für direkte Extraktion.",
      },
      {
        q: "Was passiert bei einem falschen Pfad?",
        a: "Sie bekommen den exakten Grund: welcher Schlüssel fehlte oder welcher Index außerhalb lag. Nichts stürzt ab.",
      },
    ],
  },
  "json-yaml-converter": {
    name: "JSON ⇄ YAML Konverter",
    tagline:
      "JSON in YAML und zurück konvertieren — bereit für Config-Dateien, mit Wechseln-und-weiter-Workflow und präzisen Fehlermeldungen.",
    intro: [
      "Zweiwege-Konvertierung zwischen JSON und YAML: JSON einfügen für sauberes 2-Leerzeichen-YAML für Ihre Config-Dateien; YAML einfügen für JSON. Der Swap-Button dreht die Richtung um, sodass Sie in einem Panel hin- und zurückkonvertieren.",
      "Angetrieben von js-yaml mit präziser Fehlerberichterstattung — ein falscher Einzug oder ein doppelter Schlüssel zeigt Ihnen genau, was schiefging, statt einer kryptischen Fehlermeldung.",
    ],
    steps: [
      "Fügen Sie je nach Richtung JSON oder YAML ein.",
      "Klicken Sie auf Konvertieren — die Ausgabe erscheint darunter.",
      "Nutzen Sie den Swap-Button, um in die andere Richtung weiterzukonvertieren.",
    ],
    faqs: [
      {
        q: "Welche YAML-Funktionen werden unterstützt?",
        a: "Das Standard-Core-Schema von js-yaml: verschachtelte Maps, Sequenzen, Skalare, quotierte Zeichenketten. YAML-Anker und benutzerdefinierte Tags sind für zuverlässige Rundreisen außerhalb des Scopes.",
      },
      {
        q: "Warum ist meine Konvertierung fehlgeschlagen?",
        a: "Meistens ein Tabulator in der YAML-Einrückung (dort verboten) oder doppelte Schlüssel im JSON. Die Fehlermeldung zeigt auf das Problem.",
      },
    ],
  },
  "sha1-generator": {
    name: 'SHA-1-Generator',
    tagline: 'SHA-1-Hashes von Text oder Dateien direkt im Browser mit nativem WebCrypto berechnen — noch in Git-Commits und Legacy-Prüfsummen im Einsatz. Vollständig clientseitig.',
    intro: ['Text einfügen und den 160-Bit-SHA-1-Digest live sehen, oder eine Datei ablegen und sie lokal fingerprinten. Die WebCrypto-Engine des Browsers erledigt die Arbeit — nicht ein Byte verlässt Ihr Gerät.', 'SHA-1 ist Legacy, aber lebendig: Git identifiziert Objekte damit, und viele ältere Systeme prüfen Downloads gegen SHA-1-Prüfsummen. Für Kompatibilität und Verifikation in Ordnung — für Sicherheitskritisches nehmen Sie SHA-256 oder stärker.'],
    steps: ['Text tippen oder einfügen — der Digest aktualisiert sich live.', 'Oder in den Dateimodus wechseln und eine Datei zum lokalen Hashen ablegen.', 'Hexadezimal-Digest kopieren und mit dem erwarteten Wert vergleichen.'],
    faqs: [
        { q: 'q', a: 'a' },
        { q: 'q', a: 'a' },
        { q: 'q', a: 'a' },
    ],
  },
  "sha384-generator": {
    name: 'SHA-384-Generator',
    tagline: 'SHA-384-Hashes von Text oder Dateien direkt im Browser mit nativem WebCrypto berechnen — der stärkste SHA-2-Digest für Prüfsummen, HMAC und Archiv-Integrität. Vollständig clientseitig.',
    intro: ['Text einfügen und den 384-Bit-Digest live sehen, oder eine Datei ablegen und sie lokal fingerprinten. Auf 64-Bit-Hardware ist SHA-384 oft schneller als SHA-256 — ideal für große Archive.', 'SHA-384 begegnet Ihnen in HMAC-API-Signaturen, Diskimage-Prüfungen und langfristigen Archiv-Prüfsummen. Hexadezimal-Digest kopieren und mit dem veröffentlichten Wert vergleichen.'],
    steps: ['Text tippen oder einfügen — der Digest aktualisiert sich live.', 'Oder in den Dateimodus wechseln und eine Datei zum lokalen Hashen ablegen.', 'Hexadezimal-Digest kopieren und vergleichen.'],
    faqs: [
        { q: 'q', a: 'a' },
        { q: 'q', a: 'a' },
    ],
  },
  "sha512-generator": {
    name: 'SHA-512-Generator',
    tagline: 'SHA-512-Hashes von Text oder Dateien direkt im Browser mit nativem WebCrypto berechnen — der stärkste SHA-2-Digest für Prüfsummen, HMAC und Archiv-Integrität. Vollständig clientseitig.',
    intro: ['Text einfügen und den 512-Bit-Digest live sehen, oder eine Datei ablegen und sie lokal fingerprinten. Auf 64-Bit-Hardware ist SHA-512 oft schneller als SHA-256 — ideal für große Archive.', 'SHA-512 begegnet Ihnen in HMAC-API-Signaturen, Diskimage-Prüfungen und langfristigen Archiv-Prüfsummen. Hexadezimal-Digest kopieren und mit dem veröffentlichten Wert vergleichen.'],
    steps: ['Text tippen oder einfügen — der Digest aktualisiert sich live.', 'Oder in den Dateimodus wechseln und eine Datei zum lokalen Hashen ablegen.', 'Hexadezimal-Digest kopieren und vergleichen.'],
    faqs: [
        { q: 'q', a: 'a' },
        { q: 'q', a: 'a' },
    ],
  },
  "text-to-binary": {
    name: 'Text → Binär',
    tagline: 'Beliebigen Text in 8-Bit-Binärbytes umwandeln und zurück — UTF-8-sicher, sofort und vollständig im Browser. Perfekt für Unterricht, Rätsel und Informatik-Hausaufgaben.',
    intro: ['Jedes getippte Zeichen wird zu seiner UTF-8-Bytefolge in Gruppen aus acht 0en und 1en. „Hi!“ wird zu 01001000 01101001 00100001 — exakt die Bits, die ein Computer speichert, in lesbarer Form.',
        'Decodieren einschalten für den Rückweg: durch Leerzeichen getrennte Binärgruppen einfügen und den Originaltext zurückerhalten. Mehrbytezeichen wie Emoji und CJK funktionieren, da die Dekodierung über den nativen UTF-8-TextDecoder des Browsers läuft.'],
    steps: ['Text zum Kodieren tippen oder einfügen — der Binärcode erscheint live.',
        '„Binär in Text dekodieren“ einschalten, um Binärgruppen zurück in Worte zu wandeln.',
        'Ergebnis mit einem Klick kopieren.'],
    faqs: [
        { q: 'q', a: 'a' },
        { q: 'q', a: 'a' },
        { q: 'q', a: 'a' },
    ],
  },
  "text-to-unicode": {
    name: 'Text → Unicode',
    tagline: 'Beliebigen Text in \\uXXXX, \\u{...}, U+XXXX oder dezimale Codepoints escapen — und alles zurück dekodieren. Emoji-sicher, sofort, vollständig lokal.',
    intro: ['Unicode-Escapes sind die Art, wie Quellcode, JSON-Nutzdaten und Konfigurationsdateien Zeichen darstellen, die schwer zu tippen oder unsicher einzubetten sind. Text einfügen und Notation wählen: \\uXXXX für die klassische JavaScript/Java-Form, \\u{...} für volle Unterstützung der zusätzlichen Ebene, U+XXXX wie in den Codecharts oder dezimale Codepoints.',
        'Der Dekodiermodus versteht alle vier Notationen gemischt: von \\u00e9 über U+1F600 bis &#128512; erhalten Sie lesbaren Text zurück. Zeichen außerhalb der BMP (Emoji, seltene CJK) wechseln im \\uXXXX-Modus automatisch zu \\u{...}, statt kaputte Surrogatpaare zu erzeugen.'],
    steps: ['Text zum Escapen einfügen — die Ausgabe aktualisiert sich live.',
        'Notation wählen: \\uXXXX, \\u{...}, U+XXXX oder dezimal.',
        'Oder Dekodiermodus einschalten und Escapes einfügen, um Text zurückzubekommen.'],
    faqs: [
        { q: 'q', a: 'a' },
        { q: 'q', a: 'a' },
        { q: 'q', a: 'a' },
    ],
  },
  "text-to-nato-alphabet": {
    name: 'NATO-Alphabet-Konverter',
    tagline: 'Buchstabieren Sie beliebigen Text mit dem NATO-Alphabet — Alfa, Bravo, Charlie — und dekodieren Sie buchstabierte Wörter zurück in Text. Der Standard für klaren Funk- und Telefonkontakt.',
    intro: ['Das NATO-Alphabet (Alfa, Bravo, Charlie…) ersetzt jeden Buchstaben durch ein eindeutiges Wort, damit Text per Funk oder Telefon auch bei Störungen fehlerfrei ankommt.',
        'Text einfügen: Jeder Buchstabe, jede Ziffer und jedes Symbol wird in das standardisierte ICAO/NATO-Kodewort umgewandelt.',
        'Der Decode-Modus macht das Gegenteil: Kodewörter einfügen und den Originaltext zurückerhalten.',
        'Häufige Schreibvarianten werden erkannt (Alfa/Alpha, Juliett/Juliet).',
        'Alles läuft im Browser – kein Text verlässt Ihr Gerät.'],
    steps: ['Text zum Buchstabieren in das Eingabefeld einfügen oder tippen.',
        'Die erzeugte Kodewort-Folge ablesen oder den Decode-Modus aktivieren und Kodewörter einfügen.',
        'Ergebnis kopieren und für Funkverkehr, Support oder Diktat verwenden.'],
    faqs: [
        { q: 'Was ist das NATO-Alphabet?', a: 'Das Buchstabieralphabet der NATO/ICAO: Jeder Buchstabe bekommt ein Wort (A = Alfa, B = Bravo…), um Verwechslungen bei der Übertragung zu vermeiden. Genutzt von Luftfahrt, Militär, Rettungsdiensten und Support.' },
        { q: 'Werden Ziffern umgewandelt?', a: 'Ja. 0–9 werden zu Zero, One (Wun), Two, Tree, Fower, Five, Six, Seven, Eight, Nine – die ICAO-Standardaussprache steht neben jedem Kodewort.' },
        { q: 'Umlaute und Emojis?', a: 'Akzentzeichen werden auf den Grundbuchstaben zurückgeführt (É → Echo); Emojis und Zeichen außerhalb des Alphabets werden markiert, da sie nicht buchstabierbar sind.' },
    ],
  },
  "hmac-generator": {
    name: 'HMAC-Generator',
    tagline: 'Berechne HMAC-SHA-256/384/512-Signaturen beliebiger Nachrichten mit einem geheimen Schlüssel — direkt im Browser via WebCrypto. Unverzichtbar für Webhook-Verifizierung, API-Auth und Request-Signierung.',
    intro: ['HMAC (Hash-based Message Authentication Code) beweist, dass eine Nachricht vom Inhaber des gemeinsamen Geheimnisses stammt — ohne das Geheimnis zu übertragen. Stripe, GitHub, Slack und die meisten Webhooks signieren ihre Payloads so; füge Signatur und deinen Schlüssel hier ein, um sie nachzubilden und zu prüfen.',
        'Standard ist SHA-256, SHA-512 für maximalen Spielraum, SHA-1 nur wenn eine Legacy-API es verlangt. Hex- und Base64-Ausgabe werden beide angezeigt — je nachdem, was der Service erwartet.'],
    steps: ['Gib den gemeinsamen geheimen Schlüssel ein — dieselbe Zeichenkette, die dir Server oder Webhook-Anbieter gegeben haben.',
        'Füge den rohen Nachrichten-Body ein (exakte Bytes: JSON, Query-String, Timestamp+Payload — was die API signiert).',
        'Vergleiche die erzeugte Hex- oder Base64-Signatur mit dem X-Signature-Header oder signiere deine eigene Anfrage damit.'],
    faqs: [
        { q: 'Was ist der Unterschied zwischen HMAC und normalem Hashing?', a: 'SHA-256(message) kann jeder berechnen. HMAC(secret, message) erfordert das Geheimnis: Nur sein Inhaber kann die Signatur reproduzieren. Das ist ein Ursprungs- und Integritätsnachweis, keine bloße Prüfsumme.' },
        { q: 'Warum nutzen Webhooks HMAC?', a: 'Wenn Stripe oder GitHub an deinen Endpoint posten, liegt eine HMAC-Signatur des Bodys bei. Rechne sie mit deinem Webhook-Geheimnis nach; bei Übereinstimmung kommt die Anfrage wirklich von ihnen — ohne den Schlüssel ist sie nicht fälschbar.' },
        { q: 'Ist mein Secret hier sicher?', a: 'Ja — die gesamte Berechnung läuft im WebCrypto deines Browsers. Secret und Nachricht verlassen das Gerät nie; nichts wird geloggt oder übertragen. Trotzdem: Rotiere Secrets, die du auf einer Website eingibst, regelmäßig.' },
        { q: 'HMAC-SHA-256 oder HMAC-SHA-512?', a: 'SHA-256 ist der universelle Standard. SHA-512 bietet mehr Reserve und ist auf 64-Bit-CPUs sogar schneller; nutze ihn, wenn die Spec es erlaubt. SHA-1 nur bei Legacy-Zwang.' },
    ],
  },
  "unlock-pdf": {
    name: 'PDF entsperren',
    tagline: 'Entfernen Sie Besitzerbeschränkungen aus einer lesbaren PDF und laden Sie eine saubere Kopie herunter — Entsperren im Browser, ohne Upload.',
    intro: ['Manche PDFs öffnen sich normal, verweigern aber Drucken, Kopieren oder Kommentieren wegen Berechtigungs-Flags des Besitzers. Dieses Werkzeug lädt das Dokument mit pdf-lib und speichert eine neue Kopie ohne diese Einschränkungen, sodass Drucken und Textauswahl in jedem Reader wieder funktionieren.',
        'Alles passiert auf Ihrem Gerät: Die Datei wird lokal gelesen und neu geschrieben, nie an einen Server gesendet. Beachten Sie die ehrliche Grenze — eine PDF, die jedes Mal ein Öffnungspasswort verlangt, kann hier nicht entschlüsselt werden; das Werkzeug fügt auch keine Verschlüsselung hinzu, sondern erzeugt nur eine unbeschränkte Kopie einer Datei, die Sie bereits lesen können.'],
    steps: ['Legen Sie die eingeschränkte PDF ab, die sich ohne Passwort öffnen lässt.',
        'Klicken Sie auf Schutz entfernen — die Datei wird lokal ohne Berechtigungs-Flags neu gespeichert.',
        'Laden Sie die saubere Kopie herunter und drucken, kopieren oder kommentieren Sie nach Bedarf.'],
    faqs: [
        { q: 'Kann damit ein Öffnungspasswort entfernt werden?', a: 'Nur wenn Ihr Reader es gespeichert hat und den Inhalt ohne Nachfrage zeigt. Eine Datei, die zum Öffnen wirklich ein Passwort braucht, ist damit verschlüsselt, und dieses Werkzeug versucht weder Knacken noch Entschlüsselung.' },
        { q: 'Kann ich hier auch eine PDF mit Passwort schützen?', a: 'Nein. Verlässliche AES-Verschlüsselung für PDFs ist in einer leichtgewichtigen, reinen Browser-Implementierung nicht machbar; die Seite bietet daher kein Hinzufügen von Passwörtern — nur das Entfernen von Beschränkungen lesbarer Dateien.' },
    ],
  },
  "flatten-pdf": {
    name: 'PDF abflachen',
    tagline: 'Backen Sie PDF-Formularfelder vor dem Absenden als statischen Inhalt in die Seite ein — Kontrollkästchen, Textfelder und Signaturen werden dauerhaft, lokal in Ihrem Browser.',
    intro: ['Ausgefüllte PDF-Formulare sind interaktiv: Die Werte leben in separaten Feldobjekten, die manche Reader beim Weiterleiten zurücksetzen, verlieren oder umordnen. Abflachen mit pdf-lib zeichnet jedes Feld direkt auf seine Seite, sodass genau das, was Sie ausgefüllt haben, von jedem Reader angezeigt wird — eine Anforderung vieler Bewerbungs-, Steuer- und Ablagesysteme.',
        'Das verarbeitete Dokument sieht identisch aus, enthält aber keine Formularfelder mehr: Nichts lässt sich leeren, ändern oder erneut absenden. Alles läuft mit pdf-lib auf Ihrem Gerät; die Datei verlässt Ihren Browser nie. Hat die PDF keine ausfüllbaren Felder, sagt das Werkzeug das, statt eine sinnlose Kopie zu erzeugen.'],
    steps: ['Legen Sie das ausgefüllte PDF-Formular ab, das Sie gleich absenden.',
        'Klicken Sie auf Formular abflachen — Felder werden als statischer Inhalt auf die Seiten gezeichnet.',
        'Laden Sie die abgeflachte PDF herunter und senden oder teilen Sie sie bedenkenlos.'],
    faqs: [
        { q: 'Sehen die Seiten nach dem Abflachen genauso aus?', a: 'Ja. Die Feldwerte werden an Ort und Stelle gezeichnet, das visuelle Ergebnis entspricht Ihrer Ansicht. Der Unterschied liegt darunter: Die Datei enthält keine interaktiven Feldobjekte mehr.' },
        { q: 'Lässt sich das Formular danach wieder bearbeiten?', a: 'Nein, und genau das ist der Sinn. Das Abflachen ist im Ergebnis unumkehrbar — die Werte sind normaler Seiteninhalt. Behalten Sie die interaktive Originaldatei, falls Sie später Änderungen brauchen.' },
    ],
  },
  "pdf-crop": {
    name: 'PDF zuschneiden',
    tagline: 'Schneiden Sie PDF-Seiten zu, indem Sie ein Rechteck auf der Live-Vorschau aufziehen — Ränder oder Scanränder für alle Seiten oder eine eigene Liste entfernen, komplett im Browser.',
    intro: ['Scanner fügen breite Ränder hinzu, Folien tragen schwarze Rahmen und Präsentationen haben mehr Weißraum, als der Bildschirm braucht. Ziehen Sie ein Rechteck über die gerenderte erste Seite oder justieren Sie die Prozentwerte für links, oben, Breite und Höhe über Zahlenfelder — und wenden Sie alles auf alle Seiten oder nur Ihre Liste wie „1-3, 7“ an.',
        'Der Zuschnitt wird mit pdf-lib als Crop-Box in die PDF geschrieben: Reader und Drucker zeigen nur den gewählten Bereich, während der Originalinhalt in der Datei bleibt — nichts wird zerstört, und der Zuschnitt lässt sich durch Zurücksetzen der Box rückgängig machen. Ohne Upload und Rasterung: Text bleibt auswählbar, die Qualität unberührt.'],
    steps: ['Legen Sie die PDF ab und prüfen Sie die Vorschau von Seite 1.',
        'Ziehen Sie ein Rechteck über den zu behaltenden Bereich oder geben Sie exakte Prozentwerte unter der Vorschau ein.',
        'Wählen Sie alle Seiten oder eine eigene Liste, klicken Sie auf PDF zuschneiden und laden Sie das Ergebnis herunter.'],
    faqs: [
        { q: 'Ist der Zuschnitt destruktiv?', a: 'Nein. Die Crop-Box ändert nur, welcher Bereich angezeigt und gedruckt wird; der eigentliche Inhalt bleibt in der Datei. Ein Reader, der die Crop-Box auf die Media-Box zurücksetzt, zeigt wieder die vollständige Originalseite.' },
        { q: 'Warum zeigt die Vorschau nur Seite 1?', a: 'Das Rechteck ist in Seitenprozenten definiert und skaliert daher auf jede Zielseite, selbst bei unterschiedlichen Größen. Seite 1 wird live per pdf.js gerendert, und die vier Zahlenfelder geben exakte Kontrolle, wenn Ziehen zu ungenau ist.' },
    ],
  },
  "eta-calculator": {
    name: 'ETA-Rechner',
    tagline: 'Schätzen Sie die Fertigstellungszeit einer Aufgabe aus Gesamtaufwand und Takt pro Stunde, Tag oder Woche — mit Kalendertage-Countdown und lesbarer Dauer wie „3 Tage 4 Stunden“.',
    intro: ['Geben Sie den Gesamtaufwand ein (jede Einheit: Tickets, Seiten, Kilometer, Zeilen), einen Bearbeitungstakt und optional Ihre täglichen Arbeitsstunden. Der Rechner liefert die geschätzte Fertigstellungszeit, den Countdown ab jetzt und die Dauer in lesbarer Form wie „3 Tage 4 Stunden“.',
        'Takte pro Tag und Woche respektieren Ihre Arbeitszeiten: Bei einem 8-Stunden-Tag verteilt sich ein 40-Stunden-Job auf fünf Kalendertage statt rund um die Uhr zu arbeiten.'],
    steps: ['Geben Sie den Gesamtaufwand und seine Einheit ein — jede positive Zahl passt.',
        'Wählen Sie einen Takt pro Stunde, pro Tag oder pro Woche.',
        'Legen Sie die täglichen Arbeitsstunden (optional) und bei Bedarf eine eigene Startzeit fest.',
        'Lesen Sie Fertigstellungszeit, verbleibende Tage und Dauer; die Fertigstellungszeit lässt sich per Klick kopieren.'],
    faqs: [
        { q: 'Wie wirken sich Arbeitsstunden auf die Schätzung aus?', a: 'Ein Takt „pro Tag“ setzt voraus, dass Sie ihn innerhalb der eingestellten Tagesstunden erreichen, und der Kalender-Countdown dehnt sich entsprechend. Ein Takt „pro Woche“ rechnet mit 5 Arbeitstagen: Eine Taktwoche umfasst sieben Kalendertage.' },
        { q: 'Welche Einheiten sollte der Aufwand verwenden?', a: 'Jede konsistente Einheit: Tickets, Artikel, Straßenkilometer, Datenbankzeilen. Der Rechner braucht nur das Verhältnis von Aufwand zu Takt, also müssen beide Seiten dieselbe Einheit nutzen.' },
        { q: 'Kann ich eine Startzeit in Zukunft oder Vergangenheit setzen?', a: 'Ja. Standardmäßig zählt der Countdown ab jetzt, aber Sie können eine eigene Startzeit aktivieren — nützlich, um Arbeit zu schätzen, die erst Montag beginnt, oder zu prüfen, wann eine letzte Woche gestartete Aufgabe endet.' },
    ],
  },
  "mime-types": {
    name: 'MIME-Typen-Tabelle',
    tagline: 'Durchsuchen Sie über 120 gängige MIME-Typen nach Endung oder MIME-Präfix, mit Kategorie und Beschreibung, und kopieren Sie jeden Typ mit einem Klick.',
    intro: ['Beim Konfigurieren eines Webservers, eines Upload-Handlers, eines CORS-Headers oder eines Anhang-Filters brauchen Sie den exakten MIME-Typ jeder Endung — und Raten zwischen image/jpg und image/jpeg lässt Probleme still entstehen. Diese Tabelle deckt die Endungen ab, die in der Praxis zählen: Web-Assets, Bilder, Audio und Video, Office-Dokumente, Archive, Schriften, Konfigurationsdateien und einige Programmquellen.',
        'Filtern Sie nach Endung (mit oder ohne Punkt) oder nach MIME-Präfix wie text/ oder application/json. Jede Zeile hat Ein-Klick-Kopieren, sodass exakt der String im Clipboard landet, der in Ihre Konfiguration gehört.'],
    steps: ['Geben Sie eine Endung (pdf, .png) oder ein MIME-Präfix (audio/, video/web) in den Filter ein.',
        'Sehen Sie sich die Treffer an: Endung, MIME-Typ, Kategorie und kurze Beschreibung.',
        'Klicken Sie auf Kopieren, um den exakten MIME-Typ in die Zwischenablage zu holen.'],
    faqs: [
        { q: 'Warum zeigen manche Einträge text/javascript statt application/javascript?', a: 'Die RFC 9239 hat application/javascript zugunsten von text/javascript obsolet gemacht, und WHATWG-Server nutzen es standardmäßig. Die Tabelle folgt den aktuellen Standards, wo sie sich geändert haben — was Sie kopieren, erwarten moderne Server und Validatoren.' },
        { q: 'Ist das das vollständige IANA-Medientypregister?', a: 'Nein — die IANA listet über tausend registrierte Typen, viele herstellerspezifisch oder historisch. Diese Tabelle konzentriert sich auf rund 120 Einträge aus Webentwicklung, Deploy-Konfigs und E-Mail, mit den korrekten aktuellen Werten.' },
        { q: 'Warum erscheint .ts zweimal mit unterschiedlichen Kategorien?', a: 'Die Endung ist tatsächlich mehrdeutig: TypeScript-Quellcode (text/x.typescript) und MPEG-Transportströme (video/mp2t) nutzen beide .ts. Server entscheiden nach Verzeichniskontext — prüfen Sie, welcher Fall auf Sie zutrifft.' },
    ],
  },
  "keycode-info": {
    name: 'Tastencodes',
    tagline: 'Drücken Sie eine beliebige Taste und sehen Sie live event.key, event.code und das alte keyCode, den Modifikatorstatus und die Historie Ihrer letzten 10 Tastenanschläge.',
    intro: ['Tastatur-Bugs entstehen meist durch Verwechslung der drei Werte eines KeyboardEvent: event.key ist das erzeugte Zeichen („a“ oder „A“ bei Shift), event.code ist die physische Taste (KeyA unabhängig vom Layout) und keyCode ist der alte numerische Code, von dem Legacy-Code noch abhängt. Ein Tastendruck hier zeigt alle drei sofort nebeneinander samt gedrückter Modifikatoren.',
        'Außerdem behält die Seite die letzten 10 Tasten in einer kleinen Historientabelle, damit Sie Werte vergleichen können, statt zu drücken und zu vergessen. Nützlich bei Spielsteuerung, Shortcuts oder beim Debuggen, warum ein keydown-Handler doppelt feuert (ignoriere-Wiederholung filtert Auto-Repeat).'],
    steps: ['Klicken Sie irgendwo auf die Seite, damit sie Tastaturfokus bekommt, und drücken Sie eine Taste.',
        'Lesen Sie event.key, event.code und keyCode auf den drei Karten; Ctrl/Alt/Shift/Meta leuchten, solange gehalten.',
        'Schalten Sie „Auto-Repeat ignorieren“ um, um gedrückte Tasten zu filtern, und vergleichen Sie Tasten in der Letzte-10-Tabelle.'],
    faqs: [
        { q: 'Warum unterscheiden sich event.key und event.code für dieselbe Taste?', a: 'event.key meldet das Zeichen im aktuellen Layout und Modifikatorzustand („A“, „á“, „1“), event.code die physische Position (KeyA, Digit1) unabhängig vom Layout. Shortcuts sollten meist auf code prüfen, Textverarbeitung sollte key lesen.' },
        { q: 'Ist keyCode veraltet?', a: 'Ja — es ist Legacy und existiert nur, damit alter Code, der auf Zahlen wie 13 (Enter) oder 27 (Escape) prüft, weiterläuft. Neuer Code sollte event.key oder event.code nutzen; dieses Tool zeigt keyCode, um alte Konstanten bei der Migration zuzuordnen.' },
        { q: 'Warum wiederholt sich derselbe Wert, wenn ich eine Taste halte?', a: 'Halten lässt das OS wiederholte keydown-Events mit repeat=true senden. Aktivieren Sie „Auto-Repeat ignorieren“, um nur den ersten Druck zu zeigen; deaktivieren Sie es, um zu prüfen, ob Ihr Handler Wiederholungen korrekt erhält.' },
    ],
  },
  "ipv4-subnet-calculator": {
    name: 'IPv4-Subnetz-Rechner',
    tagline: 'Geben Sie ein CIDR wie 192.168.1.0/24 ein und erhalten Sie Netz- und Broadcast-Adresse, Maske, Wildcard, Hostbereich, nutzbare Hosts, IP-Klasse und Privatbereich-Kennung.',
    intro: ['Netzplanung, Firewall-Regeln oder Routenaggregation beginnen mit denselben Werten: wo das Netz beginnt und endet, welche Maske es ausdrückt und wie viele Hosts wirklich hineinpassen. Tippen Sie ein CIDR (oder eine einzelne IP, als /32 behandelt) und alle Werte erscheinen auf einmal — Netz- und Broadcast-Adresse, gepunktete Subnetzmaske, Wildcard-Maske für ACL-Syntax, erster und letzter nutzbarer Host, Gesamt- und Nutzbarkeit, der Klassenbuchstabe und die Private-Range-Kennzeichnung (RFC 1918, Loopback, Link-Local oder CGNAT).',
        'Ein zweiter Modus beantwortet eine andere Frage: Welches ist der kleinste einzelne CIDR-Block, der zwei IP-Adressen enthält? Genau das brauchen Sie, um zwei Hosts in eine Firewall-Regel zu fassen oder eine Route zu aggregieren — und von Hand ist das erstaunlich fehleranfällig.'],
    steps: ['Geben Sie ein CIDR wie 10.0.0.0/8 oder 192.168.1.130/26 ein; eine IP ohne Präfix gilt als /32.',
        'Lesen Sie Netz, Broadcast, Maske, Wildcard, Bereich und Zahlen aus den Karten; Schlüsselwerte kopieren sich per Klick.',
        'Wechseln Sie zum Tab „kleinster CIDR“ und geben Sie zwei IPs ein, um den kleinsten Block zu erhalten, der beide enthält.'],
    faqs: [
        { q: 'Warum meldet /31 alle Adressen als nutzbar?', a: 'Die RFC 3021 definiert /31 für Point-to-Point-Verbindungen, wo weder Netz- noch Broadcast-Adresse reserviert werden — beide Adressen sind nutzbar. Ein /32 ist eine Einzelhost-Route mit per Definition einer Adresse. Die klassische „minus zwei“-Regel gilt erst ab /30.' },
        { q: 'Welche privaten Bereiche prüft das Tool?', a: 'Den privaten RFC-1918-Raum (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16), Loopback (127.0.0.0/8), IPv4-Link-Local (169.254.0.0/16) und den CGNAT-Shared-Space (100.64.0.0/10). Alles andere wird als öffentlich markiert.' },
        { q: 'Sind IP-Klassen noch bedeutsam?', a: 'Für das Routing nicht — das Internet ist seit Jahrzehnten klassenlos mit CIDR. Der A/B/C/D/E-Buchstabe dient nur der Referenz, weil alte Dokumentation, Prüfungsfragen und manche alte Geräte noch klassenbasiert sprechen.' },
        { q: 'Wie wird der kleinste CIDR für zwei IPs berechnet?', a: 'Beide Adressen werden per XOR verknüpft, um differing niederwertige Bits zu finden; das Präfix ist die erste übereinstimmende Bitposition, und der Block wird an dieser Grenze ausgerichtet. 10.1.2.3 und 10.1.9.200 fallen z. B. gemeinsam in 10.1.0.0/20.' },
    ],
  },
  "json-viewer": {
    name: 'JSON-Betrachter',
    tagline: 'JSON einfügen und als klappbarer Baum erkunden — typisierte, farbige Werte neben der formatierten Quelle — sofort, privat, im Browser.',
    intro: ['Verschachtelte API-Antworten und Konfigurationsdateien sind als Rohtext schwer lesbar. Dieser Betrachter analysiert Ihr JSON und zeichnet links einen klappbaren Baum — jedes Objekt und Array lässt sich auf- und zuklappen — während das rechte Panel das formatierte Dokument zeigt. Werte sind typisiert und farbcodiert: Strings grün, Zahlen blau, Booleans bernstein, null grau; lange Strings werden bei 60 Zeichen gekürzt.',
        'Ungültige Eingabe wird sofort mit Zeilen- und Spaltennummer erkannt — ein verirrtes Komma kostet keine Suchminuten mehr. Alles läuft lokal im Browser; nichts wird gesendet.'],
    steps: ['JSON in das Eingabefeld einfügen.',
        'Den Baum erkunden — ▾/▸-Pfeile klappen Objekte und Arrays auf und zu.',
        'Das formatierte JSON rechts lesen und per Klick kopieren.'],
    faqs: [
        { q: 'Wie finde ich die Stelle, an der mein JSON bricht?', a: 'Bei Analysefehlern zeigen Zeile und Spalte die exakte Position, z. B. „line 3, column 12: Unexpected token }“. Diese Stelle korrigieren — der Baum erscheint sofort; meist ist es ein Komma am Ende, ein Schlüssel ohne Anführungszeichen oder eine fehlende Klammer.' },
        { q: 'Werden große Dokumente verarbeitet?', a: 'Ja für typische API-Payloads und Konfigs — zigtausend Knoten rendern problemlos. Die 60-Zeichen-Kürzung betrifft nur die Anzeige; Rohpanel und Kopierknopf enthalten immer die vollen Daten.' },
        { q: 'Verlassen meine Daten das Gerät?', a: 'Nein. Analyse und Darstellung laufen vollständig im Browser-Speicher. Nichts geht an einen Server — sicher für interne API-Antworten und Konfigurationen.' },
    ],
  },
  "chmod-calculator": {
    name: 'chmod-Rechner',
    tagline: 'UNIX-Dateirechte per Checkbox zusammenklicken — Oktalmodus, symbolische Notation und fertiger chmod-Befehl, inklusive setuid/setgid/sticky.',
    intro: ['UNIX-Rechte wirken in Oktal (755? 644?) undurchsichtig, bis man sie als neun Checkboxen sieht: Lesen/Schreiben/Ausführen für Besitzer, Gruppe und Rest. Abhaken — der numerische Modus, die rwxr-xr-x-Form und der komplette chmod-Befehl aktualisieren sich live.',
        'Auch die Spezialbits sind dabei: setuid (4), setgid (2) und sticky (1) — jeweils mit Erklärung, was sie für Dateien und Verzeichnisse wirklich tun. Rückwärts funktioniert ebenfalls: 644 eintippen, die Häkchen setzen sich selbst.'],
    steps: ['Rechte für Besitzer, Gruppe und Rest abhaken.',
        'Bei Bedarf setuid, setgid oder sticky ergänzen.',
        'Den generierten chmod-Befehl oder den Oktalmodus kopieren.'],
    faqs: [
        { q: 'Was genau bedeutet 755?', a: 'Besitzer: Lesen+Schreiben+Ausführen (7=4+2+1); Gruppe: Lesen+Ausführen (5=4+1); Rest: Lesen+Ausführen (5). Die typische Einstellung für Verzeichnisse und ausführbare Skripte, die andere nutzen dürfen.' },
        { q: 'Wozu dient das Sticky-Bit?', a: 'Auf Verzeichnissen verhindert es das Löschen fremder Dateien — das „t“ in /tmp (drwxrwxrwt). Auf ausführbaren Dateien hielt es das Programm im Speicher — heute vor allem historisch.' },
        { q: 'Was tun setuid und setgid?', a: 'Auf ausführbaren Dateien führt setuid sie mit der Identität des Besitzers aus (setgid: der Gruppe) — daher ihre Gefährlichkeit. Auf Verzeichnissen erzwingt setgid die Gruppenzugehörigkeit neuer Dateien.' },
    ],
  },
  "ulid-generator": {
    name: 'ULID-Generator',
    tagline: 'ULIDs erzeugen — sortierbare 26-stellige eindeutige Bezeichner mit eingebettetem Millisekunden-Zeitstempel — und jeden ULID zurück zu seiner Erstellungszeit dekodieren.',
    intro: ['UUIDv4 ist zufällig, daher sortieren Datensätze damit ins Chaos: Indizes fragmentieren, Zeitanfragen brauchen eine eigene Spalte. ULID stellt vorab einen 48-Bit-Millisekunden-Zeitstempel, gefolgt von 80 Zufallsbits — 26 Zeichen in Crockford Base32, die als einfache Strings korrekt sortieren.',
        'Das Crockford-Alphabet (0-9 und A-Z ohne I, L, O, U) vermeidet die beim Abschreiben meistverwechselten Zeichen: kein I/1, kein O/0. Die Zufallshälfte nutzt crypto.getRandomValues, die Zeithälfte die Uhr — vollständig ULID-konform.',
        'Über die Erzeugung hinaus: Bestehenden ULID einfügen und dekodieren — der eingebaute Zeitstempel wird extrahiert und als ISO-Datum angezeigt; jeder ULID in Ihren Logs wird gratis zum Erstellzeitpunkt-Nachweis. Batch-Modus: bis zu 50 auf einmal, gleicher Zeitpunkt.'],
    steps: ['Auf „Generieren“ klicken für einen ULID-Stapel (oder einen zum Dekodieren einfügen).',
        'Jeder ULID zeigt seinen eingebetteten Zeitstempel — die Erstellzeit im ISO-Format.',
        'Einzelne ULIDs oder die ganze Liste kopieren — für Fixtures, DB-Seeds oder Log-Analysen.'],
    faqs: [
        { q: 'Warum ULID statt UUIDv4?', a: 'Wegen der Sortierung. Die ersten 10 Zeichen eines ULID codieren den Zeitstempel: lexikografische Ordnung = chronologische Ordnung — Primärschlüssel clustern in Indizes, Zeitbereichsscans funktionieren direkt, Logs sortieren sich selbst. UUIDv4 hat keine dieser Eigenschaften; ULID behält dennoch 128 Bit Kollisionsresistenz.' },
        { q: 'Was ist Crockford Base32?', a: 'Ein 32-Zeichen-Alphabet (Ziffern plus A-Z ohne I, L, O, U), gebaut, um menschliche Übertragung zu überleben: keine verwechselbaren Zeichenpaare, keine Groß-/Kleinschreibung. 25 % dichter als Hex und ohne +, / und = — sicher für URLs, Dateinamen und XML.' },
        { q: 'Kollidieren zwei ULIDs derselben Millisekunde?', a: 'Praktisch nein: 80 Zufallsbits bieten ~1,2 × 10²⁴ Möglichkeiten pro Millisekunde. Die Spezifikation definiert zudem monotone Erzeugung (Zufallsteil innerhalb derselben Millisekunde inkrementieren), die der Batch-Modus konstruktiv einhält.' },
    ],
  },
  "user-agent-parser": {
    name: 'User-Agent-Parser',
    tagline: 'Beliebige User-Agent-Zeichenketten in Browser, Engine, OS und Gerät zerlegen — Bots, WebViews und Mobile-Shells erkennen, alles lokal im Browser.',
    intro: ['Jede HTTP-Anfrage meldet sich mit einem User-Agent-String, und ihn korrekt zu lesen ist eine kleine Kunst: Chrome gibt sich als Safari aus, das sich als Mozilla ausgibt; Edge versteckt sich in Chromes Tokenliste; Bots, WebViews und Mobile-Shells hinterlassen jeweils ihre Signatur. UA einfügen — die Zerlegung liefert Browser-Familie und -Version, Render-Engine (Blink/Gecko/WebKit), OS mit Version und Gerätetyp — Desktop, Mobil, Tablet oder bekannter Crawler.',
        'Die Regeln sind eine Tabelle expliziter Muster: Chrome-Familien-Erkennung läuft vor dem generischen Fallback, Edg/OPR/Samsung Internet haben eigene Einträge, und Googlebot, bingbot & Co. werden beim Namen erkannt statt als Desktop-Browser geraten. Ein abgeschnittener oder missgestalteter UA wird ehrlich markiert statt mit einer Erfindung.',
        'Alles wird im Browser analysiert; der UA-String verlässt das Gerät nie — praktisch, um Header aus einer Logdatei zu prüfen, die man nicht teilen will. Der eigene UA ist als Beispiel per Klick verfügbar.'],
    steps: ['User-Agent-String ins Eingabefeld einfügen — oder auf das Beispiel klicken, um den eigenen zu analysieren.',
        'Die Felder lesen: Browsername und -version, Engine, OS, Gerätetyp, Bot-Flag.',
        'Grenzfälle prüfen — WebViews und ungewöhnliche Präfixe werden explizit etikettiert, nicht geraten.'],
    faqs: [
        { q: 'Warum gibt sich Chrome als Safari und Mozilla aus?', a: 'Historische Kompatibilität. Netscape-kompatible Seiten wurden an Browser ausgeliefert, die mit „Mozilla“ warben, und Chrome erbte diese Verkleidung, um denselben Inhalt zu bekommen — daher liest sich der moderne Chrome-UA als „Mozilla/5.0 … AppleWebKit/537.36 (KHTML, like Gecko) Chrome/…“. Parser lesen vom Ende der Kette (Chrome-Token), nicht vom Anfang.' },
        { q: 'Wie unterscheidet man Bots von echten Nutzern?', a: 'Bekannte Crawler veröffentlichen ihr Token offen — Googlebot, bingbot, DuckDuckBot, Applebot, facebookexternalhit stehen wörtlich im UA. Dieser Parser nennt sie anhand der Signatur statt zu raten; Unbekanntes bleibt normaler Browser und wird nicht als Bot markiert.' },
        { q: 'Reicht UA-Sniffing, um Features daran zu hängen?', a: 'Nicht für kritische Pfade — UA-Strings lügen per Design und sind leicht fälschbar. UA-Analyse gehört in Analytik, Logs und Nicht-Sicherheits-Entscheidungen (Mobile-Layout zeigen, Bot-Traffic zählen); für funktionales Verhalten: Feature-Detection im Browser. Dieses Werkzeug liest UAs — es vertraut ihnen nicht.' },
    ],
  },
  "token-generator": {
    name: 'Token-Generator',
    tagline: 'Kryptografisch zufällige API-Tokens, Session-IDs und Secrets im Browser erzeugen — crypto.getRandomValues, Stapelausgabe, Entropie pro Token angezeigt.',
    intro: ['API-Schlüssel, Bearer-Tokens, Webhook-Secrets, Session-IDs — die meisten sind einfach zufällige Zeichenketten, und der falsche Weg, sie zu erzeugen, ist Math.random(). Dieser Generator nutzt crypto.getRandomValues, die kryptografische Quelle des Browsers: Jedes Token wird ohne vorhersagbare Verzerrung gleichverteilt aus seinem Zeichensatz gezogen.',
        'Länge 8–128 Zeichen, Zeichensatz (alphanumerisch, Hex oder mit URL-sicheren Symbolen), optionaler Präfix für Log-Grep, bis zu 50 auf einmal — praktisch für Test-Fixtures und die Ausstattung mehrerer Dienste. Die geschätzte Entropie in Bits wird live angezeigt: 32 alphanumerische Zeichen tragen ~190 Bits.',
        'Tokens entstehen im Speicher und werden nie übertragen: Seite neu laden — weg. Das Tool taugt also auch für Produktionsgeheimnisse, nicht nur Testdaten; langlebige Schlüssel gehören trotzdem in Passwort-Manager oder Secret-Store.'],
    steps: ['Länge, Zeichensatz, optionalen Präfix und Anzahl festlegen.',
        'Auf „Generieren“ klicken — die Tokens erscheinen als Liste, jeweils mit Kopierknopf.',
        'Auf „Neu erzeugen“ klicken für einen frischen Stapel; vor Verlassen der Seite kopieren.'],
    faqs: [
        { q: 'Für Produktions-API-Keys sicher?', a: 'Ja. crypto.getRandomValues ist derselbe CSPRNG-Typ, auf den TLS und Passwort-Manager setzen, und die Erzeugung läuft vollständig im Browser-Speicher — nichts geht übers Netz und nichts bleibt gespeichert. Die theoretische Stärke des Tokens entspricht der angezeigten Entropie: Länge nach Bedrohungsmodell wählen.' },
        { q: 'Wie lang sollte mein Token sein?', a: 'Für interne Keys und Session-IDs liegen 32 alphanumerische Zeichen (~190 Bits) weit jenseits von Brute Force. Hex-Tokens sind beliebt, weil sie exakt Bytes abbilden: 32 Hex-Zeichen = 16 Zufallsbytes. Symbole erhöhen die Entropie pro Zeichen, brechen aber Systeme ohne URL-Encoding — nur verwenden, wenn der Verbraucher sie verarbeitet.' },
        { q: 'Token, UUID oder ULID?', a: 'Opake Zufalls-Tokens (dieses Tool), wenn der Bezeichner nicht erratbar sein darf: API-Keys, Sessions, Webhook-Secrets. UUID/ULID sind für parallel erzeugte oder zeitsortierbare Bezeichner — sie verraten Takt oder Anzahl und sollten keine Sicherheitslast tragen. Für einen sortierbaren ID: den ULID-Generator.' },
    ],
  },
};

export default de;
