import type { ToolCopy } from "../_lib/types";

/**
 * Copertura italiana (it) degli strumenti del registro: un blocco ToolCopy completo per slug.
 * Contratto: ogni slug del registro è coperto (tests/overlays.test.ts + tests/registry.test.ts).
 * Registro informale ("tu"); «Zoyku» e i token tecnici (PDF, JPG, JSON…) restano invariati.
 */
export const it: Record<string, ToolCopy> = {
  /* ------------------------------------------------------------------ */
  /* PDF                                                                 */
  /* ------------------------------------------------------------------ */
  "compress-pdf": {
    name: "Comprimi PDF",
    tagline:
      "Riduci il peso dei PDF pesanti rasterizzando le pagine al DPI e alla qualità JPEG scelti — elaborazione in blocco e dimensioni prima/dopo esatte, tutto offline.",
    intro: [
      "Scansioni e report ricchi di immagini sono spesso 10 volte più pesanti del necessario. Questo strumento ridisegna ogni pagina alla risoluzione che scegli (72–150 DPI coprono la lettura a schermo e la maggior parte delle stampe) e la ricodifica in JPEG ottimizzato, riducendo in genere la dimensione del 50–90%.",
      "Elabora più file alla volta e guarda il risparmio esatto per ogni file prima di scaricare. La scala di grigi opzionale alleggerisce ancora di più le scansioni in bianco e nero. Tutto gira sul tuo dispositivo: compressi o no, i tuoi documenti restano dove sono.",
    ],
    steps: [
      "Trascina uno o più file PDF (il trattamento in blocco è benvenuto).",
      "Scegli DPI e qualità JPEG, oppure attiva la scala di grigi.",
      "Clicca su Comprimi, confronta le dimensioni prima/dopo e scarica.",
    ],
    faqs: [
      {
        q: "Il mio PDF avrà ancora testo selezionabile dopo la compressione?",
        a: "No — questo metodo rasterizza le pagine in immagini, quindi il testo diventa pixel. È il prezzo da pagare per una forte riduzione di dimensione. Se ti serve testo ricercabile, conserva l'originale e condividi la copia compressa solo dove il peso conta.",
      },
      {
        q: "Quali impostazioni conviene scegliere?",
        a: "96 DPI a circa il 60% di qualità sono un buon valore predefinito per email e web. Usa 150 DPI se il PDF verrà stampato; 72 DPI in scala di grigi è aggressivo ma va bene per archivi di puro testo.",
      },
      {
        q: "E se il file si restringe appena?",
        a: "I PDF molto poveri, solo testo, sono già efficienti e potrebbero non comprimersi — la tabella te lo dirà onestamente. Abbassa DPI o qualità e riprova, oppure accetta che l'originale fosse già snello.",
      },
    ],
  },
  "delete-pdf-pages": {
    name: "Elimina pagine PDF",
    tagline:
      "Elimina le pagine che non ti servono da un PDF in pochi secondi — scrivi le pagine da togliere, scarica il file alleggerito, tutto elaborato nel tuo browser.",
    intro: [
      "Pagine bianche, una vecchia copertina, una pagina con i dati di qualcun altro: scrivile come «1, 3-5» e ottieni un PDF pulito con tutto il resto intatto. Lo strumento mostra il numero di pagine del documento, così controlli i numeri prima di tagliare.",
      "Le pagine rimanenti vengono copiate byte per byte: il testo resta selezionabile e le immagini mantengono la qualità. Tutto avviene in locale con pdf-lib; il file non viene mai caricato.",
    ],
    steps: [
      "Trascina il PDF da alleggerire.",
      "Scrivi le pagine da eliminare, per esempio «2, 6-8».",
      "Clicca su Elimina pagine e scarica il documento restante.",
    ],
    faqs: [
      {
        q: "Posso eliminare tutte le pagine di un documento?",
        a: "No — un PDF deve contenere almeno una pagina. Se inserisci tutte le pagine lo strumento si rifiuterà; elimina invece tutto tranne una se è questo che ti serve.",
      },
      {
        q: "Come faccio a tenere solo alcune pagine?",
        a: "Più facile ragionare al contrario: elimina tutto ciò che non vuoi. «2-10, 12» su un documento di 12 pagine lascia le pagine 1 e 11.",
      },
      {
        q: "Cosa succede alla numerazione delle pagine?",
        a: "Le pagine si richiudono da sole: dopo aver eliminato le pagine 2-4, la vecchia pagina 5 diventa la pagina 2. I link interni che puntavano alle pagine eliminate potrebbero smettere di funzionare.",
      },
    ],
  },
  "image-to-pdf": {
    name: "Immagine in PDF",
    tagline:
      "Riunisci immagini di qualsiasi formato — JPG, PNG, WebP, GIF e altri — in un unico PDF, con conversione automatica e zero upload.",
    intro: [
      "Uno strumento per tutte le immagini: trascina un lotto misto di file JPG, PNG, WebP, GIF o BMP e tutti finiscono in un unico PDF. Ciò che non è già pronto per il PDF viene convertito in locale tramite una canvas, quindi i lotti misti funzionano senza alcuna impostazione.",
      "Ordina le pagine, scegli l'adattamento all'immagine o A4/Letter con margini, poi esporta. È la versione coltellino svizzero dei nostri convertitori JPG e PNG, con la stessa promessa: i tuoi file non lasciano mai il dispositivo.",
    ],
    steps: [
      "Trascina immagini in qualsiasi mix di formati supportati.",
      "Riordina l'elenco e scegli il formato pagina.",
      "Clicca su Crea PDF e scarica il tuo documento.",
    ],
    faqs: [
      {
        q: "Quali formati sono supportati?",
        a: "Tutto ciò che il tuo browser sa mostrare: JPG, PNG, WebP, GIF, BMP e AVIF sulla maggior parte dei sistemi. I file già in JPG o PNG vengono incorporati senza ricodifica; gli altri vengono prima convertiti in PNG senza perdita.",
      },
      {
        q: "Cosa succede alle foto HEIC di un iPhone?",
        a: "I browser recenti spesso non sanno decodificare direttamente il HEIC. Convertile prima con il nostro strumento HEIC in JPG, poi assembla qui i JPG.",
      },
      {
        q: "I GIF animati restano animati nel PDF?",
        a: "No — una pagina PDF è statica, quindi ottieni il primo fotogramma. Converti le animazioni in video o condividi direttamente il GIF.",
      },
    ],
  },
  "jpg-to-pdf": {
    name: "JPG in PDF",
    tagline:
      "Trasforma le tue foto JPG in un PDF ordinato nel browser — importazione in blocco, riordino senza trascinamento e pagine A4, Letter o adattate all'immagine.",
    intro: [
      "Converti quante foto JPG vuoi in un unico PDF ben ordinato: fototessere, ricevute, compiti scansionati o una sessione di scatti da inviare come unico allegato. Aggiungi tutte le immagini in una volta, ordinale con i pulsanti freccia e scegli se ogni pagina segue la foto o usa un formato A4/Letter con margine.",
      "Le foto vengono incorporate alla qualità originale — nessun ridimensionamento, nessuna ricompressione, nessun watermark. La conversione avviene sul tuo dispositivo: anche le immagini più private non toccano mai un server.",
    ],
    steps: [
      "Trascina tutte le immagini JPG da includere.",
      "Metti in ordine e scegli un formato pagina (adattato, A4 o Letter).",
      "Clicca su Crea PDF e scarica il risultato.",
    ],
    faqs: [
      {
        q: "Le foto perdono qualità nel PDF?",
        a: "No. I tuoi file JPG vengono incorporati byte per byte: i dati immagine nel PDF sono identici agli originali. La qualità scende solo se comprimi il PDF in seguito.",
      },
      {
        q: "Quante immagini posso convertire in una volta?",
        a: "Quante ne consente la memoria del tuo browser — decine sono la norma; centinaia di foto da più megabyte possono essere lente ma funzionano comunque in locale.",
      },
      {
        q: "Posso mescolare JPG con PNG o altri formati?",
        a: "Sì — usa lo strumento generale Immagini in PDF per i lotti misti; converte gli altri formati automaticamente prima dell'incorporamento.",
      },
    ],
  },
  "merge-pdf": {
    name: "Unisci PDF",
    tagline:
      "Combina più PDF in un unico documento direttamente nel browser — riordina i file liberamente, senza upload, senza watermark, senza registrazione.",
    intro: [
      "Trascina tutti i PDF che ti servono, disponili nell'ordine esatto che vuoi e uniscili in un unico file. Prenotazioni, fatture, capitoli scansionati, candidature: tutto ciò che arriva come dieci allegati separati diventa un documento ordinato.",
      "A differenza dei servizi online che caricano i tuoi file su un server, questo strumento legge e scrive PDF interamente sul tuo dispositivo con pdf-lib. Contratti, documenti d'identità e documenti finanziari non lasciano mai il tuo browser.",
    ],
    steps: [
      "Trascina due o più file PDF nella casella (oppure clicca per sceglierli).",
      "Riordina l'elenco con i pulsanti ↑ / ↓ finché l'ordine non è giusto.",
      "Clicca su Unisci PDF e scarica il file combinato.",
    ],
    faqs: [
      {
        q: "Quanti PDF posso unire e quanto possono essere grandi?",
        a: "Non esiste un limite artificiale: il tetto pratico è la memoria del tuo dispositivo. Un laptop moderno unisce senza problemi 20+ file o circa 100–200 MB in totale; scansioni molto grandi possono essere più lente ma funzionano.",
      },
      {
        q: "Segnalibri, campi modulo e annotazioni sopravvivono all'unione?",
        a: "Il contenuto delle pagine, le immagini e la maggior parte delle annotazioni vengono conservati. Gli extra a livello di documento come segnalibri e valori dei campi modulo non vengono riportati: il file unito contiene le pagine visibili di ogni sorgente.",
      },
      {
        q: "I miei file vengono caricati da qualche parte?",
        a: "No. L'unione avviene in locale nel tuo browser con JavaScript. Nulla viene inviato a nessun server e il PDF unito viene generato sul tuo stesso dispositivo.",
      },
    ],
  },
  "ocr-pdf": {
    name: "OCR PDF",
    tagline:
      "Applica l'OCR ai PDF scansionati interamente nel browser — riconosce inglese, cinese, giapponese e altre lingue, poi copia o salva il testo.",
    intro: [
      "Contratti, ricevute e libri scansionati non hanno testo selezionabile: l'OCR glielo dà. Ogni pagina viene renderizzata nel tuo browser e letta dal motore Tesseract, con supporto per inglese, cinese semplificato, giapponese, spagnolo, portoghese, francese e tedesco.",
      "Al primo uso il browser scarica il motore OCR e il modello linguistico (10–20 MB) da una CDN pubblica: è l'unico traffico di rete e non include mai il tuo documento. Il riconoscimento vero e proprio avviene sul tuo dispositivo.",
    ],
    steps: [
      "Trascina un PDF scansionato e scegli la lingua del documento.",
      "Se vuoi, limita l'OCR a pagine specifiche, poi clicca su Esegui OCR.",
      "Copia il testo riconosciuto o scaricalo come file .txt.",
    ],
    faqs: [
      {
        q: "Perché la prima esecuzione richiede una connessione a internet?",
        a: "Il motore OCR Tesseract e il suo modello linguistico vengono scaricati da una CDN al primo uso (10–20 MB, poi restano in cache). Il PDF non viene mai caricato: il riconoscimento gira in locale una volta caricato il modello.",
      },
      {
        q: "Come posso migliorare la precisione del riconoscimento?",
        a: "Scansiona a 300 DPI, tieni la pagina dritta e scegli la lingua corretta. Pagine pulite in bianco e nero superano ampiamente il 90% di precisione; foto storte con ombre fanno molto peggio.",
      },
      {
        q: "Sa leggere la scrittura a mano?",
        a: "Non in modo affidabile. Tesseract è addestrato su testo stampato: la tipografia ordinata funziona, il corsivo a mano di solito produce un pasticcio illeggibile.",
      },
    ],
  },
  "page-numbers-pdf": {
    name: "Aggiungi numeri di pagina al PDF",
    tagline: "Timbra i numeri di pagina su un PDF — scegli formato, angolo e numero di partenza, tutto in locale nel tuo browser.",
    intro: [
      "Dai al PDF dei numeri di pagina decenti prima di stamparlo o condividerlo: scegli un formato (1, 1/N o Pagina 1 di N), scegli uno dei sei angoli, imposta il numero di partenza — il file viene ricostruito sul tuo dispositivo, pronto da scaricare.",
      "Utile per report, contratti, mazzi di scansioni e tutto ciò che in riunione viene citato per pagina.",
    ],
    steps: [
      "Trascina il PDF da numerare.",
      "Scegli il formato, l'angolo e il numero di partenza.",
      "Clicca su Aggiungi numeri di pagina e scarica il file timbrato.",
    ],
    faqs: [
      {
        q: "Posso saltare la copertina?",
        a: "Imposta «Inizia la numerazione da» a 0 e la copertina riceve il numero 0 — oppure separa prima la copertina, numera il resto e poi riuniscili.",
      },
      {
        q: "I numeri restano coerenti tra formati pagina diversi?",
        a: "Ogni pagina viene timbrata rispetto alla sua larghezza e alla sua altezza, quindi orienti e formati misti ricevono il numero nello stesso angolo visivo.",
      },
    ],
  },
  "pdf-to-excel": {
    name: "PDF in Excel",
    tagline:
      "Estrae le righe e le colonne di un PDF in un foglio Excel (.xlsx) modificabile — conversione riga per riga nel tuo browser, gratis.",
    intro: [
      "Estratti bancari, listini e report chiusi in un PDF tornano dati lavorabili: ogni riga visiva diventa una riga del foglio, e il testo separato da spazi larghi viene diviso in colonne automaticamente. I numeri di pagina restano nella prima colonna, così puoi far risalire tutto.",
      "È un'estrazione pratica, basata sul testo — non una ricostruzione AI delle tabelle. Rende al meglio su estratti a larghezza fissa ed elenchi allineati; tabelle disordinate su più righe possono richiedere una rapida sistemazione in Excel. Il vantaggio: i tuoi dati non lasciano mai il dispositivo.",
    ],
    steps: [
      "Trascina un PDF basato su testo (testo selezionabile, non la foto di una scansione).",
      "Clicca su Converti in Excel.",
      "Scarica il .xlsx e sistema eventuali righe unite in Excel.",
    ],
    faqs: [
      {
        q: "Come vengono individuate le colonne?",
        a: "Le righe vengono divise in celle ogni volta che compaiono due o più spazi — il consueto indizio di allineamento nel testo PDF. Le tabelle ben allineate si convertono pulite; la prosa diventa una cella per riga.",
      },
      {
        q: "Il mio estratto scansionato produce un foglio vuoto.",
        a: "Le scansioni non hanno livello di testo. Passa prima il file nel nostro strumento OCR, poi incolla il testo riconosciuto in Excel, oppure converti qui l'output dell'OCR.",
      },
      {
        q: "I numeri possono mantenere la formattazione?",
        a: "I valori arrivano come testo esattamente come stampati, preservando zeri iniziali e virgole decimali regionali — Excel li tratta come stringhe finché non converti la colonna.",
      },
    ],
  },
  "pdf-to-jpg": {
    name: "PDF in JPG",
    tagline:
      "Esporta ogni pagina del PDF come immagine JPG fino a 300 DPI — pagine singole o ZIP quando sono molte, convertite direttamente sul tuo dispositivo.",
    intro: [
      "Trasforma un PDF in immagini condivisibili: ogni pagina diventa un JPG alla risoluzione che scegli, renderizzata esattamente come appare — font, colori e immagini compresi. Dieci pagine danno dieci file numerati; da due in su ottieni anche uno ZIP.",
      "JPG è il formato che chat, slide e piattaforme social accettano ovunque. Il rendering avviene in locale con pdf.js — il PDF non viene mai caricato, cosa che conta per contratti e documenti personali.",
    ],
    steps: [
      "Trascina il PDF da convertire.",
      "Scegli la risoluzione di uscita (150 DPI vanno bene per la maggior parte degli schermi).",
      "Clicca su Converti e scarica ogni pagina o lo ZIP.",
    ],
    faqs: [
      {
        q: "Quale risoluzione conviene scegliere?",
        a: "96 DPI vanno bene per la visualizzazione a schermo, 150 DPI sono il valore predefinito bilanciato e 200–300 DPI si adattano alla stampa. DPI più alti significano file più grandi e rendering più lento sui documenti lunghi.",
      },
      {
        q: "Perché il testo sembra più morbido che nel PDF?",
        a: "JPG è un formato fotografico con perdita: a bassa qualità i bordi netti delle lettere prendono leggeri artefatti. Alza i DPI o usa lo strumento PDF in PNG per un testo nitido al pixel.",
      },
      {
        q: "Posso convertire solo alcune pagine?",
        a: "Questo strumento converte l'intero documento e nomina i file per numero di pagina, così puoi tenere solo quelli che ti servono. Usa prima Dividi PDF se vuoi in anticipo un intervallo preciso.",
      },
    ],
  },
  "pdf-to-png": {
    name: "PDF in PNG",
    tagline:
      "Converte le pagine PDF in immagini PNG senza perdita alla risoluzione scelta — slide e scansioni nitide, con ZIP quando le pagine sono tante.",
    intro: [
      "Quando gli artefatti JPG non sono benvenuti — screenshot di slide, diagrammi, moduli con caratteri piccoli — esporta le pagine come PNG. Il formato senza perdita mantiene bordi delle lettere e linee sottili nitidi al pixel, da 96 fino a 300 DPI.",
      "Ogni pagina viene renderizzata in locale con pdf.js all'aspetto esatto definito dal PDF. I file sono nominati per numero di pagina e i risultati multipagina arrivano con uno ZIP a un clic.",
    ],
    steps: [
      "Trascina il tuo PDF nella casella.",
      "Scegli la risoluzione — 150 DPI sono un valore predefinito solido.",
      "Clicca su Converti in PNG, poi scarica le pagine o lo ZIP.",
    ],
    faqs: [
      {
        q: "Quando conviene PNG invece di JPG?",
        a: "Ogni volta che le pagine contengono testo, colori piatti o grafica a linee: PNG li mantiene perfettamente nitidi. JPG si adatta alle pagine fotografiche, dove conta di più il file piccolo.",
      },
      {
        q: "Perché i file PNG sono grandi?",
        a: "La compressione senza perdita preserva ogni pixel, quindi la dimensione cresce con i DPI. Scansioni a 300 DPI di una pagina densa possono pesare diversi megabyte; scendi a 96–150 DPI per l'uso a schermo.",
      },
      {
        q: "La trasparenza viene preservata?",
        a: "Le pagine vengono renderizzate su sfondo bianco, quindi l'output è PNG opaco. È così che i PDF si stampano e si evitano sorprese a sfondo nero nei visualizzatori.",
      },
    ],
  },
  "pdf-to-ppt": {
    name: "PDF in PowerPoint",
    tagline:
      "Converte ogni pagina PDF in una slide PowerPoint come immagine ad alta risoluzione — slide fedeli al layout, generate sul tuo stesso dispositivo.",
    intro: [
      "Ti serve il PDF dentro una presentazione? Ogni pagina viene renderizzata ad alta risoluzione e messa su una propria slide 16:9, quindi il risultato visivo coincide con l'originale — font, colori e grafica restano al loro posto, anche se chi guarda non ha i font installati.",
      "Le slide sono immagini, non caselle di testo modificabili: è voluto, perché le slide immagine non si rompono mai da un computer all'altro. Abbinalo al nostro strumento PDF in Word quando ti serve anche il testo.",
    ],
    steps: [
      "Trascina il PDF che vuoi nella tua presentazione.",
      "Clicca su Converti in PowerPoint e lascia renderizzare ogni pagina.",
      "Scarica il .pptx e aprilo in PowerPoint, Keynote o Google Slides.",
    ],
    faqs: [
      {
        q: "Posso modificare il testo delle slide?",
        a: "No — ogni slide contiene un'immagine fedele della pagina, non caselle di testo. Garantisce un aspetto identico ovunque. Estrai il testo a parte con PDF in Word se ti serve modificabile.",
      },
      {
        q: "Che dimensione slide viene usata?",
        a: "Widescreen 16:9 (13,33 × 7,5 pollici), il valore predefinito di PowerPoint. Le pagine con proporzioni diverse vengono centrate e adattate senza distorsioni.",
      },
      {
        q: "Quanto pesa il file .pptx?",
        a: "Più o meno quanto tutte le immagini delle pagine insieme — un PDF di 20 pagine ad alta risoluzione può arrivare a decine di megabyte. Comprimi prima il PDF sorgente se ti serve una presentazione più leggera.",
      },
    ],
  },
  "pdf-to-text": {
    name: "PDF in Testo",
    tagline:
      "Estrae il testo semplice da qualsiasi PDF all'istante — anteprima, copia negli appunti o salva come .txt, pagina per pagina nel tuo browser.",
    intro: [
      "Ricava le parole da un PDF senza copiare e incollare pagina per pagina. L'estrattore scorre il documento, ricostruisce l'ordine di lettura e ti consegna testo pulito da visualizzare, copiare tutto in una volta o scaricare come file .txt.",
      "Usalo per portare citazioni nei tuoi appunti, far passare il testo in un altro strumento o creare un archivio solo testo di un documento. Il conteggio parole viene mostrato mentre vai, e l'estrazione è istantanea perché tutto avviene in locale.",
    ],
    steps: [
      "Trascina un PDF con testo selezionabile.",
      "Clicca su Estrai testo e leggi l'anteprima.",
      "Copia il risultato o scaricalo come file .txt.",
    ],
    faqs: [
      {
        q: "Il risultato è vuoto — perché?",
        a: "Probabilmente il PDF è una scansione: le sue pagine sono foto del testo, senza livello di testo. Usa invece lo strumento OCR: legge le lettere direttamente dalle immagini.",
      },
      {
        q: "Come viene determinato l'ordine di lettura?",
        a: "Gli elementi di testo vengono raggruppati in righe per coordinate e le righe ordinate dall'alto verso il basso, da sinistra a destra. I layout a più colonne possono intrecciarsi; dividere prima il PDF per intervalli di colonna può aiutare.",
      },
      {
        q: "C'è un limite di pagine o di dimensione?",
        a: "Nessuno artificiale. Centinaia di pagine funzionano; il limite pratico è la memoria del browser, in genere ben oltre documenti da 100 MB.",
      },
    ],
  },
  "pdf-to-word": {
    name: "PDF in Word",
    tagline:
      "Trasforma il testo di un PDF in un documento Word (.docx) modificabile nel browser — conversione centrata sul testo, gratis e senza alcun upload.",
    intro: [
      "Estrae le parole da un PDF in un .docx che puoi modificare in Word, Google Docs o LibreOffice. I titoli vengono individuati dalle dimensioni dei font, i paragrafi ricostruiti dalle posizioni delle righe, e il risultato è un documento pulito e leggero pronto da rifare a modo tuo.",
      "È una conversione onesta, centrata sul testo: non ricostruisce layout di pagina complessi, colonne o posizionamento delle immagini. Il lato positivo è la privacy totale — l'analisi e la generazione del .docx avvengono interamente sul tuo dispositivo.",
    ],
    steps: [
      "Trascina un PDF basato su testo (uno in cui puoi selezionare il testo).",
      "Clicca su Converti in Word e aspetta un attimo.",
      "Scarica il .docx e modificalo dove vuoi.",
    ],
    faqs: [
      {
        q: "Perché il layout è diverso dal PDF originale?",
        a: "È una conversione centrata sul testo: ricostruisce paragrafi e livelli di titolo invece di riprodurre la pagina pixel per pixel. Aspettati le stesse parole in un flusso più pulito e modificabile — non un clone visivo.",
      },
      {
        q: "Il mio PDF è una scansione e produce un documento vuoto.",
        a: "I PDF scansionati contengono immagini del testo, non testo. Passalo prima nel nostro strumento OCR, poi incolla o converti in Word il testo riconosciuto.",
      },
      {
        q: "Tabelle e immagini sopravvivono?",
        a: "Le immagini non vengono portate nel .docx. Le tabelle arrivano come semplici righe di testo — utilizzabili, ma per qualcosa di complesso vorrai ricostruire le vere tabelle in Word.",
      },
    ],
  },
  "png-to-pdf": {
    name: "PNG in PDF",
    tagline:
      "Converte screenshot e immagini PNG in un unico PDF senza ricomprimerli — importazione in blocco, ordine personalizzato, elaborato sul tuo dispositivo.",
    intro: [
      "Screenshot, grafici, diagrammi ed esportazioni di design sono quasi sempre PNG — e di solito li si vuole come PDF. Trascina un intero lotto, ordinalo con i pulsanti freccia e ottieni un PDF senza perdita: i dati PNG vengono incorporati così come sono, quindi il testo degli screenshot resta affilatissimo.",
      "Scegli pagine adattate all'immagine per dimensioni al pixel, oppure A4/Letter con margine per la stampa. Tutto viene costruito con pdf-lib sul tuo dispositivo: nessun upload, nessun azzardo sulla qualità.",
    ],
    steps: [
      "Trascina i file PNG da combinare.",
      "Ordinali e scegli pagine adattate all'immagine o A4/Letter.",
      "Clicca su Crea PDF e scaricalo.",
    ],
    faqs: [
      {
        q: "La qualità PNG viene preservata esattamente?",
        a: "Sì. Il flusso PNG viene incorporato invariato, quindi bordi netti, testo piccolo e zone con trasparenza appaiono esattamente come nei file sorgente.",
      },
      {
        q: "Quale formato pagina scegliere per gli screenshot?",
        a: "«Adatta all'immagine» mantiene ogni screenshot alla sua dimensione nativa in pixel — ideale per la lettura a schermo. Scegli A4 o Letter con margine quando il PDF verrà stampato.",
      },
      {
        q: "Perché il mio PDF da PNG resta grande?",
        a: "I dati PNG senza perdita sono grandi per natura. Se ti serve un file più piccolo, passa il risultato in Comprimi PDF, che scambia un po' di fedeltà con la dimensione.",
      },
    ],
  },
  "rearrange-pdf-pages": {
    name: "Riordina pagine PDF",
    tagline:
      "Riordina le pagine PDF a vista con miniature dal vivo — sposta le pagine su e giù, inverti tutto ed esporta un nuovo PDF in locale.",
    intro: [
      "Hai scansionato un documento fuori ordine? Ogni pagina compare come vera miniatura, quindi vedi esattamente cosa stai spostando. Mescola con i pulsanti freccia, ribalta l'intero documento con Inverti e torna all'ordine originale quando vuoi.",
      "La nuova sequenza viene scritta in un PDF completamente nuovo sul tuo dispositivo — le pagine sono copiate byte per byte, quindi qualità, font e testo selezionabile sopravvivono al riordino.",
    ],
    steps: [
      "Trascina il PDF e aspetta che compaiano le miniature delle pagine.",
      "Sposta le pagine con ↑ / ↓, oppure usa Inverti per l'ordine opposto.",
      "Clicca su Applica ordine e scarica per ottenere il PDF riordinato.",
    ],
    faqs: [
      {
        q: "Perché i PDF molto lunghi mostrano numeri invece delle miniature per le pagine successive?",
        a: "Le miniature sono prerenderizzate per le prime 60 pagine per tenere il browser reattivo. Oltre, vedi comunque i numeri di pagina e puoi riordinarli esattamente allo stesso modo.",
      },
      {
        q: "Posso spostare una pagina dalla posizione 40 alla 2?",
        a: "Sì, ma richiede clic ripetuti con i pulsanti freccia. Per salti grandi spesso è più veloce invertire prima il documento, oppure dividerlo e riunire i pezzi in un nuovo ordine.",
      },
      {
        q: "Il riordino tocca la qualità?",
        a: "Per niente. Le pagine vengono copiate invariate nel nuovo documento — cambia solo la loro sequenza.",
      },
    ],
  },
  "rotate-pdf": {
    name: "Ruota PDF",
    tagline:
      "Ruota le pagine PDF di 90, 180 o 270 gradi e salva la modifica in modo permanente — sistema le scansioni storte nel browser, senza upload.",
    intro: [
      "Scansione in orizzontale o capovolta? Ruota tutte le pagine in una volta, oppure punta solo alle pagine da sistemare con un elenco come «1, 3-5». La rotazione viene scritta nel PDF stesso, quindi si apre dritto in ogni lettore.",
      "Molti visualizzatori ruotano le pagine solo temporaneamente — questo strumento cambia l'attributo /Rotate della pagina con pdf-lib sul tuo dispositivo, ed è per questo che la correzione sopravvive a stampa, condivisione e ricaricamenti.",
    ],
    steps: [
      "Trascina il PDF le cui pagine vanno ruotate.",
      "Scegli 90°, 180° o 270° e, se vuoi, limita la rotazione a pagine specifiche.",
      "Clicca su Ruota pagine e scarica il PDF corretto.",
    ],
    faqs: [
      {
        q: "La rotazione è permanente?",
        a: "Sì. L'attributo di rotazione della pagina viene aggiornato dentro il file, quindi ogni lettore PDF, stampante e anteprima mostra l'orientamento corretto — non solo questa scheda del browser.",
      },
      {
        q: "Come ruoto solo alcune pagine?",
        a: "Compila il campo pagine con un elenco come «2, 5-7». Lascialo vuoto per ruotare l'intero documento. Gli intervalli seguono la stessa sintassi degli altri strumenti per pagine.",
      },
      {
        q: "Ruotare ricodifica o comprime le mie pagine?",
        a: "No. Cambia solo il flag di rotazione; il contenuto delle pagine resta intatto, quindi la qualità è identica e il testo rimane selezionabile.",
      },
    ],
  },
  "sign-pdf": {
    name: "Firma PDF",
    tagline:
      "Disegna la tua firma con mouse o dito e posizionala su qualsiasi pagina PDF — un timbro in stile inchiostro naturale creato e salvato completamente offline.",
    intro: [
      "Firma contratti, permessi e moduli senza stamparli. Disegna la firma sul pad, posizionala su una griglia 3×3 (in basso a destra è il punto usuale), imposta la larghezza e, se vuoi, aggiungi la data di oggi sotto. Il PNG trasparente viene incorporato direttamente nel PDF.",
      "È una firma visibile, basata su immagine — perfetta per i documenti di tutti i giorni. Non è una firma crittografica con certificato, e se soddisfa un determinato iter legale dipende dalla tua giurisdizione.",
    ],
    steps: [
      "Trascina il PDF, poi disegna la tua firma sul pad.",
      "Scegli posizione, larghezza e pagina bersaglio (1 per default).",
      "Clicca su Firma e scarica e salva il PDF firmato.",
    ],
    faqs: [
      {
        q: "Questa firma è legalmente vincolante?",
        a: "Un'immagine di firma disegnata è ampiamente accettata per gli accordi quotidiani, ma il valore legale varia per Paese e tipo di documento. Per le transazioni che la richiedono, usa un certificato digitale qualificato.",
      },
      {
        q: "La firma è al sicuro qui?",
        a: "Sì. Disegni nel browser, l'immagine viene incorporata nel PDF sul tuo stesso dispositivo e nulla viene trasmesso — nemmeno la firma.",
      },
      {
        q: "Posso firmare ogni pagina del documento?",
        a: "Sì. Compila il campo pagine con un elenco come «1-5» oppure lascia una singola pagina; la firma viene timbrata nella stessa posizione su ogni pagina selezionata.",
      },
    ],
  },
  "split-pdf": {
    name: "Dividi PDF",
    tagline:
      "Divide un PDF in file separati per numero di pagine fisso o intervalli personalizzati — ogni output generato in locale e nulla viene caricato online.",
    intro: [
      "Spezza un PDF lungo in file più piccoli in due modi: taglialo ogni N pagine (comodo per un file per pagina o pezzi grandi quanto un capitolo), oppure definisci intervalli personalizzati come «1-3, 4-6, 8» e ottieni un file per intervallo. Le uscite multiple vengono impacchettate in uno ZIP automaticamente.",
      "La divisione gira sul tuo dispositivo con pdf-lib — i file originali restano intatti e i pezzi non passano mai per un server. Ideale per documenti riservati che preferiresti non caricare da nessuna parte.",
    ],
    steps: [
      "Trascina il PDF da dividere.",
      "Scegli «ogni N pagine» o intervalli personalizzati e inserisci i valori.",
      "Clicca su Dividi PDF, poi scarica ogni parte o l'intero ZIP.",
    ],
    faqs: [
      {
        q: "Come divido un PDF in pagine singole?",
        a: "Scegli «Ogni N pagine», imposta 1, e ogni pagina diventa un PDF a sé. Con più di un file di output ottieni anche uno ZIP che li contiene tutti.",
      },
      {
        q: "Quale sintassi degli intervalli è supportata?",
        a: "Valori separati da virgola e intervalli con il trattino, per esempio «1-3, 5, 8-10». Gli intervalli possono sovrapporsi e vengono elaborati nell'ordine in cui li scrivi.",
      },
      {
        q: "La divisione cambia la qualità delle pagine?",
        a: "No. Le pagine vengono copiate byte per byte in nuovi documenti, quindi il testo resta selezionabile e le immagini mantengono la qualità originale.",
      },
    ],
  },
  "watermark-pdf": {
    name: "Filigrana PDF",
    tagline:
      "Timbra filigrane testuali su ogni pagina del PDF — centrata o a piastrelle, con pieno controllo di dimensione, opacità, rotazione e colore, completamente offline.",
    intro: [
      "Marca le bozze come CONFIDENZIALE, BOZZA o DA VERIFICARE prima che ti escano di mano. Scegli un timbro singolo centrato o un motivo a piastrelle su tutta la pagina, regola l'opacità così il testo resta leggibile sotto, e scegli un colore adatto al documento.",
      "La filigrana diventa vero testo PDF disegnato su ogni pagina — niente immagini, nessun giro di andata e ritorno col server. Poiché viene elaborata con pdf-lib sul tuo dispositivo, anche i contratti sensibili possono essere marcati senza caricarli.",
    ],
    steps: [
      "Trascina il PDF da marcare.",
      "Scrivi il testo della filigrana e regola layout, dimensione, opacità e colore.",
      "Clicca su Aggiungi filigrana e scarica il PDF timbrato.",
    ],
    faqs: [
      {
        q: "Quale opacità funziona meglio?",
        a: "Tra il 10% e il 25% per la maggior parte dei documenti: visibile a colpo d'occhio ma leggera abbastanza da lasciare leggibile il testo. Le bozze che devono risultare difficili da leggere possono salire al 40–50%.",
      },
      {
        q: "Posso rimuovere una filigrana esistente con questo strumento?",
        a: "No. Questo strumento aggiunge solo filigrane. Rimuoverne una richiede di modificare i flussi di contenuto della pagina: un'operazione diversa (e spesso di dubbia legalità).",
      },
      {
        q: "Quali caratteri può usare la filigrana?",
        a: "I font standard dei PDF coprono il testo latino, la punteggiatura e i simboli comuni come ©. Gli altri alfabeti (cinese, giapponese, arabo…) vengono sostituiti con ? — tieni la filigrana in lettere latine.",
      },
    ],
  },
  "word-to-pdf": {
    name: "Word in PDF",
    tagline:
      "Converte documenti Word .docx in PDF nel browser — impaginazione centrata sul testo con titoli e grassetti, mai nulla di caricato online.",
    intro: [
      "Trasforma un .docx in un PDF pulito e condivisibile: paragrafi, titoli e parti in grassetto vengono ri-impaginati su pagine A4 con margini adeguati, quindi il risultato è ordinato anche senza Word installato. Leggere, stampare e inviare diventa senza attriti.",
      "È una conversione onesta, centrata sul testo, non un clone al pixel del layout di Word: immagini, tabelle e decorazioni di pagina dell'originale non vengono riportate. Ciò che ottieni è il testo del tuo documento in un PDF affidabile e leggibile ovunque — generato interamente sul tuo dispositivo.",
    ],
    steps: [
      "Trascina un file .docx (Word 2007 e successivi).",
      "Clicca su Converti in PDF.",
      "Scarica il PDF impaginato.",
    ],
    faqs: [
      {
        q: "Perché il mio PDF è diverso da Word?",
        a: "Questo strumento ri-impagina il testo con un layout proprio e pulito invece di emulare il motore di Word. Font, spaziature e immagini dell'originale non vengono riprodotti — le parole, i titoli e gli enfatizzati sì.",
      },
      {
        q: "Immagini e tabelle sono incluse?",
        a: "No, solo testo — titoli e grassetti compresi. Per i documenti in cui le immagini contano, esporta il PDF da Word stesso e usa questo strumento per bozze e note essenzialmente testuali.",
      },
      {
        q: "Supporta i vecchi file .doc o il testo non latino?",
        a: "Solo .docx è supportato. Il testo usa i font standard dei PDF, quindi le lingue latine si renderizzano correttamente mentre gli altri alfabeti (cinese, arabo…) per ora vengono sostituiti con ?.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* Immagini                                                            */
  /* ------------------------------------------------------------------ */
  "convert-image": {
    name: "Converti immagini",
    tagline:
      "Converte le immagini tra PNG, JPG e WebP con qualità regolabile — trascina un'intera cartella e scarica ogni risultato con un clic.",
    intro: [
      "Un convertitore per i tre formati che contano: PNG per la grafica senza perdita e la trasparenza, JPG per la compatibilità fotografica universale, WebP per i file più piccoli ad alta qualità. Scegli il formato di arrivo, regola il cursore della qualità quando il formato lo consente, e ogni file trascinato viene convertito sul posto.",
      "La conversione gira sul tuo dispositivo con l'encoder canvas del browser — non esiste proprio un passaggio di upload. Ogni riga di risultato mostra la dimensione prima e dopo, così vedi subito se il cambio di formato ha davvero convinto.",
    ],
    steps: [
      "Trascina qualsiasi immagine — i formati misti vanno bene.",
      "Scegli PNG, JPG o WebP come uscita; imposta la qualità per JPG o WebP.",
      "Scarica i file convertiti uno per uno o tutti insieme.",
    ],
    faqs: [
      {
        q: "Quale formato di uscita conviene scegliere?",
        a: "JPG per le foto che devono aprirsi ovunque; WebP per il web quando contano i file più piccoli; PNG per screenshot, loghi e tutto ciò che richiede trasparenza o salvataggi al pixel. Nel dubbio per le foto, WebP a qualità ~85 è un'ottima scelta predefinita.",
      },
      {
        q: "Convertire un JPG in PNG migliora la qualità?",
        a: "No. Gli artefatti della compressione JPEG sono ormai cuciti nei pixel e la conversione non può rimuoverli — il PNG si limiterà a conservare lo stesso aspetto senza perdite, di solito con una dimensione maggiore. Convertire cambia solo contenitore e codifica, non il dettaglio catturato.",
      },
      {
        q: "Tutti i browser supportano la conversione in WebP?",
        a: "Chrome, Edge, Firefox e Safari 17+ possono salvare WebP. Se il tuo browser non sa codificare WebP, lo strumento te lo dice e passa a JPG, così ottieni sempre un file utilizzabile.",
      },
    ],
  },
  "crop-image": {
    name: "Ritaglia immagini",
    tagline:
      "Ritaglia le foto a 1:1, 4:3, 16:9 o su un'area libera con maniglie trascinabili e scostamenti al pixel — veloce, privo di rischi e pronto per i lotti.",
    intro: [
      "Trascina le maniglie d'angolo per inquadrare esattamente ciò che vuoi tenere, oppure scrivi direttamente X, Y, larghezza e altezza per ritagli al pixel. I preset di proporzione — 1:1 per gli avatar, 4:3 e 3:2 per le stampe, 16:9 e 9:16 per video e storie — agganciano la selezione alla forma giusta all'istante.",
      "Lavori su un set di foto? La stessa selezione viene scalata proporzionalmente a ogni file del lotto, così un'intera cartella viene ritagliata in modo coerente. Il ritaglio taglia solo pixel — non ridimensiona mai — quindi l'area conservata resta alla qualità originale piena.",
    ],
    steps: [
      "Trascina una o più immagini; clicca su un nome di file per vederlo in anteprima e ritagliarlo.",
      "Scegli un preset di proporzione o trascina le maniglie della selezione; affina con i campi X / Y / L / A.",
      "Applica il ritaglio e scarica i risultati.",
    ],
    faqs: [
      {
        q: "Il ritaglio riduce la qualità dell'immagine?",
        a: "No. Ritagliare taglia semplicemente via i pixel esterni — l'area che conservi viene copiata alla sua intera risoluzione originale. La qualità cambia solo se in seguito ridimensioni o comprimi il risultato.",
      },
      {
        q: "Come funziona il ritaglio in blocco con immagini di dimensioni diverse?",
        a: "La selezione viene memorizzata rispetto all'immagine in anteprima. Applicata agli altri file viene scalata proporzionalmente alle dimensioni di ciascuno, così la composizione del ritaglio resta coerente su tutto il lotto.",
      },
      {
        q: "Quale proporzione usare per una foto profilo?",
        a: "1:1 (quadrata). La maggior parte delle piattaforme social ritaglia gli avatar in un cerchio dentro un quadrato, quindi centrare il soggetto in una selezione 1:1 è la scelta più sicura.",
      },
    ],
  },
  "exif-remover": {
    name: "Rimuovi dati EXIF",
    tagline:
      "Elimina EXIF, GPS e altri metadati nascosti dalle foto ricodificandole in locale — condividi le immagini senza far trapelare luogo o dispositivo.",
    intro: [
      "Ogni foto da telefono può portare bagaglio nascosto: le coordinate GPS di dove è stata scattata, il modello della fotocamera, le date, a volte perfino i numeri di serie. Questo strumento rimuove tutto ricodificando l'immagine dai suoi pixel grezzi — i metadati non hanno dove nascondersi in una canvas appena disegnata, quindi EXIF, GPS, miniature e commenti spariscono del tutto.",
      "Il risultato mantiene il formato originale e un'immagine visivamente identica (92% di qualità per JPG e WebP), e ogni riga mostra la dimensione prima e dopo. La modalità in blocco ripulisce un'intera cartella di foto in un solo giro, tutto offline sul tuo dispositivo.",
    ],
    steps: [
      "Trascina le foto che pensi di condividere — una o un lotto intero.",
      "Aspetta un istante mentre ogni immagine viene ricodificata in locale senza i suoi metadati.",
      "Scarica le immagini ripulite una per una o tutte in una volta.",
    ],
    faqs: [
      {
        q: "Come fa la ricodifica a rimuovere i metadati?",
        a: "L'immagine viene decodificata in pixel grezzi e ridisegnata su una canvas vuota, poi codificata di nuovo. I metadati vivono in sezioni speciali del file, fuori dai pixel, e una codifica fresca semplicemente non li include — così EXIF, GPS, miniature e cronologia delle modifiche vengono del tutto scartati.",
      },
      {
        q: "Rimuovere l'EXIF cambia l'aspetto della foto?",
        a: "Nessuna differenza visibile. I pixel vengono preservati al 92% di qualità JPEG/WebP (il PNG è senza perdita), quindi l'immagine appare identica a occhio. Un effetto collaterale: la rotazione conservata solo come flag di orientamento EXIF viene cucita nei pixel, il che anzi rende il file più coerente tra le varie app.",
      },
      {
        q: "Posso togliere i metadati senza ricomprimere l'immagine?",
        a: "Non in un modo che giri nel browser e resti sicuro. La rimozione senza perdita richiede di riscrivere il contenitore del file — i PNG si possono ripulire senza perdite con strumenti appositi, ma per JPEG l'approccio affidabile e semplice è proprio questa ricodifica. Gli input PNG qui restano perfetti al bit nei pixel.",
      },
    ],
  },
  "favicon-generator": {
    name: "Generatore di favicon",
    tagline:
      "Trasforma qualsiasi logo o immagine in un set completo di favicon — PNG da 16 a 512 px con angoli arrotondati facoltativi, più l'HTML da incollare. Gira nel browser.",
    intro: [
      "Trascina un'immagine più o meno quadrata e ottieni le sei dimensioni PNG che i progetti veri richiedono: favicon da 16, 32 e 48 px, una apple-touch-icon da 180 px e icone da 192 / 512 px per Android e i manifest PWA. Le immagini non quadrate vengono centrate su una canvas quadrata riempita con il colore di sfondo che scegli, e gli angoli possono restare vivi, diventare arrotondati o un cerchio pieno.",
      "Ogni dimensione viene renderizzata ai suoi veri pixel e si può scaricare da sola o in un unico .zip, insieme a uno snippet <head> da copia-incolla che richiama gli stessi nomi di file — così i file cadono direttamente nella cartella public del tuo progetto.",
    ],
    steps: [
      "Trascina un'immagine — un logo quadrato funziona al meglio.",
      "Scegli un colore di sfondo per la cornice e uno stile d'angolo (vivo, arrotondato o cerchio).",
      "Genera il set, poi scarica le singole dimensioni o l'intero .zip.",
      "Incolla lo snippet HTML nel <head> della pagina e carica i PNG.",
    ],
    faqs: [
      {
        q: "Quali dimensioni di favicon servono davvero?",
        a: "16 e 32 px coprono le schede del browser, 48 px aiuta scorciatoie e segnalibri, 180 px è ciò che chiedono le schermate home di iOS, e 192 / 512 px sono le dimensioni che cercano Android e i manifest delle app web. Generare tutte e sei una volta sola significa non pensarci mai più.",
      },
      {
        q: "Perché il mio logo sembra sfocato a 16 px?",
        a: "Un'icona di scheda da 16 px ha 256 pixel in tutto, quindi i dettagli fini e i tratti sottili semplicemente spariscono. I set di favicon rendono al meglio quando nascono da un marchio deciso e ad alto contrasto — se il tuo logo è dettagliato, valuta di disegnare una variante piccola semplificata come immagine sorgente.",
      },
      {
        q: "Mi serve ancora un file .ico?",
        a: "I browser moderni usano tranquillamente favicon PNG tramite tag <link>, e lo snippet generato da questo strumento è tutto ciò che gli occorre. Un .ico d'altri tempi conta solo per browser molto vecchi, ormai così rari che la maggior parte dei siti può ignorarli.",
      },
    ],
  },
  "grayscale-image": {
    name: "Immagini in bianco e nero",
    tagline: "Converte le immagini in bianco e nero in blocco — via i colori da scansioni, stampe e set di foto, tutto in locale.",
    intro: [
      "Trasforma qualsiasi set di foto in versioni pulite in bianco e nero in un solo giro: trascina un lotto, scegli output JPG o PNG, e ogni immagine viene desaturata sul tuo dispositivo con il motore colore del browser.",
      "Comodo per preparare scansioni pronte per la stampa, unificare un set di foto o togliere il colore dai documenti prima dell'OCR.",
    ],
    steps: [
      "Trascina un'immagine o un intero lotto.",
      "Scegli l'output JPG (più piccolo) o PNG (senza perdita).",
      "Lancia la conversione e scarica ogni copia in bianco e nero.",
    ],
    faqs: [
      {
        q: "È lo stesso che desaturare con un editor fotografico?",
        a: "Usa il filtro standard di scala di grigi del browser — una conversione di luminanza neutra. Per il bianco e nero artistico con curve di contrasto serve un editor; per una desaturazione pulita e uniforme, è esattamente questo.",
      },
      {
        q: "Perché il mio PNG è più grande dopo la conversione?",
        a: "La scala di grigi non cambia la compressione: una foto con molto rumore può comprimersi in modo leggermente diverso. Scegli JPG per le foto e PNG solo per la grafica piatta.",
      },
    ],
  },
  "heic-to-jpg": {
    name: "HEIC in JPG",
    tagline:
      "Converte le foto HEIC dell'iPhone in JPG o PNG così si aprono ovunque — conversione in blocco con controllo della qualità, tutto sul tuo dispositivo.",
    intro: [
      "Gli iPhone salvano le foto in HEIC, un formato efficiente che Windows, molti siti e app datati ancora rifiutano di aprire. Trascina qui i tuoi file .heic e ottieni in pochi secondi copie JPG leggibili ovunque (o PNG senza perdita) — il decodificatore gira in locale, quindi le tue foto non toccano mai un server.",
      "La modalità in blocco gestisce un intero rullino alla volta, e il cursore della qualità ti permette di bilanciare peso e fedeltà del JPG. Le foto grandi possono richiedere qualche secondo l'una, perché la decodifica HEIC avviene proprio nel tuo browser.",
    ],
    steps: [
      "Trascina i tuoi file .heic o .heif (prima passali con AirDrop o scaricali dall'iPhone).",
      "Scegli output JPG o PNG e imposta la qualità JPEG.",
      "Premi converti e scarica le immagini che si aprono ovunque.",
    ],
    faqs: [
      {
        q: "Che cos'è il HEIC e perché le mie foto lo usano?",
        a: "HEIC (High Efficiency Image Container) è il formato fotografico predefinito sugli iPhone da iOS 11. Archivia le foto a circa metà del peso del JPEG, ma il supporto fuori dall'ecosistema Apple resta a chiazze — ed è per questo che convertire in JPG resta la scelta affidabile per condividere.",
      },
      {
        q: "Convertire HEIC in JPG perde qualità?",
        a: "Un po', ma alla qualità predefinita del 90% la differenza è invisibile in pratica. Se vuoi zero perdite ulteriori, scegli l'output PNG — al costo di file molto più grandi.",
      },
      {
        q: "Le mie foto iPhone vengono caricate da qualche parte?",
        a: "No. La conversione avviene nel tuo browser con un decodificatore HEIC locale. Le foto restano sul tuo dispositivo per tutto il tempo — questo strumento funziona perfino offline una volta caricata la pagina.",
      },
    ],
  },
  "image-compressor": {
    name: "Comprimi immagini",
    tagline:
      "Comprime immagini JPG, PNG e WebP con un cursore di qualità dal vivo, elaborazione in blocco e dimensioni prima/dopo immediate — tutto nel tuo browser.",
    intro: [
      "Trascina un'immagine o un intero lotto e guarda i pesi dei file calare in tempo reale. Un cursore di qualità dal 10% al 100% ti fa bilanciare peso e nitidezza, e ogni riga mostra la dimensione originale accanto al risultato compresso così sai esattamente quanto hai risparmiato.",
      "L'output può essere JPG (il più piccolo per le foto), WebP (di solito 20–30% più piccolo di JPG alla stessa qualità) o PNG (senza perdita). Tutto gira sul tuo dispositivo con l'encoder immagini del browser — niente upload, niente code, niente watermark.",
    ],
    steps: [
      "Trascina le immagini nella casella (o clicca per sfogliare) — quante ne vuoi.",
      "Scegli un formato di uscita e tira il cursore della qualità finché la colonna delle dimensioni non ti convince.",
      "Scarica ogni immagine compressa, o prendile tutte in una volta.",
    ],
    faqs: [
      {
        q: "Perché comprimere due volte un JPEG lo peggiora?",
        a: "Il JPEG è con perdita: ogni salvataggio scarta dettaglio che non si recupera. Comprimere un JPEG già compresso aggiunge nuovi artefatti sopra i vecchi. Per il risultato migliore, comprimi sempre dal file originale ed evita di risalvare i JPEG più e più volte.",
      },
      {
        q: "Quale formato dà i file più piccoli?",
        a: "Per le foto, WebP di solito è 20–30% più piccolo del JPEG alla stessa qualità visiva, e il JPEG batte il PNG. Il PNG vince solo con grafica piatta, screenshot e loghi con pochi colori. Parti da WebP a qualità 75–85 come punto di riferimento.",
      },
      {
        q: "La mia immagine viene caricata su un server?",
        a: "No. La compressione è fatta dall'encoder canvas integrato del tuo browser. I file non lasciano mai il dispositivo — puoi persino disconnetterti da internet e continua a funzionare.",
      },
    ],
  },
  "image-metadata-viewer": {
    name: "Visualizzatore metadati immagini",
    tagline:
      "Ispeziona dimensioni, tipo di file, peso e dettagli EXIF di un'immagine — fotocamera, obiettivo, esposizione, data e GPS — senza caricare nulla.",
    intro: [
      "Trascina una foto e vedi tutto ciò che porta: dimensioni in pixel, megapixel, tipo e peso del file a colpo d'occhio. Per le foto JPEG il lettore EXIF integrato scava più a fondo — marca e modello della fotocamera, obiettivo, tempo di esposizione, apertura, ISO, lunghezza focale, data di scatto e orientamento, analizzati da un lettore essenziale che gira interamente sul tuo dispositivo.",
      "Se la foto contiene coordinate GPS vengono mostrate in forma decimale con una ricerca sulle mappe a un clic — comodo per controllare cosa incorpora il tuo telefono prima di condividere. I file non JPEG mostrano invece la profondità di bit e il tipo colore PNG, dato che l'EXIF è uno standard nato con il JPEG che loro non portano.",
    ],
    steps: [
      "Trascina una o più immagini nella casella.",
      "Leggi la scheda riassuntiva: dimensioni, tipo, peso e i campi EXIF trovati.",
      "Apri la posizione GPS nelle mappe se c'è — oppure passa al rimuovi EXIF per eliminarla.",
    ],
    faqs: [
      {
        q: "Che cosa sono i dati EXIF?",
        a: "EXIF (Exchangeable Image File Format) è lo standard di metadati che le fotocamere incorporano nelle foto JPEG: modello del dispositivo, obiettivo, impostazioni di esposizione, date, orientamento e a volte coordinate GPS. È invisibile nell'immagine stessa ma può rivelare dove e con cosa è stata scattata una foto.",
      },
      {
        q: "Perché il mio PNG o WebP non mostra EXIF?",
        a: "L'EXIF viene portato principalmente dal JPEG. I file PNG, GIF e la maggior parte dei WebP non lo incorporano, quindi davvero non c'è nulla da mostrare — il visualizzatore riporta le loro dimensioni e, per i PNG, la profondità di bit e il tipo colore letti dall'intestazione del file.",
      },
      {
        q: "Guardare i metadati cambia la mia immagine?",
        a: "No. I file vengono aperti in sola lettura; lo strumento decodifica una copia in memoria e non scrive mai sull'originale. La tua immagine viene mostrata e analizzata interamente sul tuo dispositivo.",
      },
    ],
  },
  "image-resizer": {
    name: "Ridimensiona immagini",
    tagline:
      "Ridimensiona le immagini a pixel esatti o in percentuale con il blocco delle proporzioni, ed elabora interi lotti in una volta — nulla lascia il tuo dispositivo.",
    intro: [
      "Scrivi larghezza e altezza esatte in pixel, oppure scala in percentuale (25%, 50%, 200%…). Il blocco delle proporzioni tiene corretto il rapporto quando cambi un lato, e sbloccandolo puoi forzare qualsiasi dimensione personalizzata — utile per le misure di avatar o banner delle piattaforme.",
      "La modalità in blocco applica le impostazioni a ogni file trascinato, così una cartella di foto può essere ridotta per il web in un solo passaggio. La riduzione avviene con un filtro di alta qualità e l'output mantiene il formato originale.",
    ],
    steps: [
      "Trascina una o più immagini nella casella.",
      "Scrivi larghezza/altezza in pixel o una percentuale di scala; usa il blocco per mantenere o liberare le proporzioni.",
      "Scarica le immagini ridimensionate una per una o tutte insieme.",
    ],
    faqs: [
      {
        q: "Ingrandire un'immagine ne riduce la qualità?",
        a: "Sì. Ingrandire deve inventare pixel, e ne esce morbidezza o sfocatura — nessuno strumento può aggiungere dettaglio che non è mai stato catturato. Ridurre è sicuro: scarta pixel con un'interpolazione pulita. Per ingrandire, tieni le aspettative basse (fino al ~150% di solito rende bene).",
      },
      {
        q: "A cosa serve il blocco delle proporzioni?",
        a: "Con il blocco attivo, cambiando la larghezza l'altezza si ricalcola da sola (e viceversa), così l'immagine non viene mai stirata o schiacciata. Toglilo solo se vuoi deliberatamente una forma diversa — l'immagine risulterà distorta.",
      },
      {
        q: "Le immagini PNG ridimensionate mantengono la trasparenza?",
        a: "Sì. Il ridimensionamento mantiene il formato originale, quindi la trasparenza PNG e il canale alpha WebP sopravvivono intatti. Solo la conversione in JPG appiattirebbe la trasparenza su uno sfondo bianco.",
      },
    ],
  },
  "jpg-to-png": {
    name: "JPG in PNG",
    tagline:
      "Converte le foto JPG in PNG all'istante con output senza perdita e supporto ai lotti — gratis, privo di upload e senza registrazione, nel tuo browser.",
    intro: [
      "Trascina i tuoi file .jpg e ottieni con un clic copie .png identiche al pixel. Il PNG archivia l'immagine senza ulteriori perdite, il che lo rende il formato di scelta per rieditare, archiviare, o per piattaforme e strumenti che rifiutano i file JPEG.",
      "La modalità in blocco converte un'intera pila di foto in un passaggio e mostra la dimensione risultante per ogni file. Tieni presente che il PNG di solito produce file più grandi del JPG — è il prezzo dell'archiviazione senza perdita, non un difetto della conversione.",
    ],
    steps: [
      "Trascina le tue immagini JPG (o clicca per sfogliare) — più file sono benvenuti.",
      "Aspetta un istante mentre ogni file viene convertito in locale.",
      "Scarica i file PNG uno per uno o tutti in una volta.",
    ],
    faqs: [
      {
        q: "Il file PNG sembrerà migliore del JPG?",
        a: "No — sembrerà lo stesso. La conversione non può annullare una compressione già avvenuta; il PNG semplicemente conserva l'aspetto attuale senza aggiungere nuovi artefatti se in seguito lo modifichi e lo risalvi. Usalo per i flussi di lavoro, non per un premio di qualità.",
      },
      {
        q: "Perché il mio PNG è più grande del JPG originale?",
        a: "Il JPG usa una compressione con perdita aggressiva pensata per le foto, mentre il PNG archivia ogni pixel esattamente. La stessa immagine quindi occupa più spazio in PNG. Se conta di più il peso che la modifica senza perdita, JPG o WebP sono l'obiettivo migliore.",
      },
      {
        q: "Convertire JPG in PNG aggiunge trasparenza?",
        a: "No. Il JPEG non archivia mai la trasparenza, quindi nulla può essere recuperato — il tuo PNG convertito è completamente opaco. Per ritagliare uno sfondo serve uno strumento dedicato alla rimozione dello sfondo.",
      },
    ],
  },
  "merge-images": {
    name: "Unisci immagini",
    tagline: "Combina da 2 a 9 immagini in una sola — affiancate, in colonna o a griglia, con controllo di spaziatura e sfondo.",
    intro: [
      "Costruisci confronti prima/dopo, strisce a confronto e sprite sheet: trascina da 2 a 9 immagini, scegli un layout, imposta spaziatura e colore di sfondo, e l'immagine unita viene composta sul tuo dispositivo alla piena risoluzione.",
      "Le immagini vengono scalate a un'altezza comune (affiancate), a una larghezza comune (in colonna) o a una cella (griglia), così nulla viene ritagliato o stirato.",
    ],
    steps: [
      "Trascina da 2 a 9 immagini nell'ordine in cui vuoi unirle.",
      "Scegli un layout e regola spaziatura e colore di sfondo.",
      "Clicca su Unisci immagini e scarica il risultato.",
    ],
    faqs: [
      {
        q: "Che risoluzione ha l'output?",
        a: "Piena risoluzione: la canvas viene dimensionata dalle dimensioni (scalate) degli input, quindi un'unione di 3 foto da 2000px è larga circa 6000px.",
      },
      {
        q: "L'ordine è importante?",
        a: "Sì — le immagini vengono piazzate nell'ordine della lista, da sinistra a destra e dall'alto in basso. Togli e riaggiungi per cambiarlo.",
      },
    ],
  },
  "ocr-image": {
    name: "Immagine in testo (OCR)",
    tagline:
      "Estrae il testo da foto, scansioni e screenshot in 7 lingue — revisiona, modifica, copia o scarica come .txt. Il riconoscimento gira interamente nel tuo browser.",
    intro: [
      "Punta a qualsiasi immagine che contenga testo — la foto di una pagina, una scansione, uno screenshot — e riavrai i caratteri come testo modificabile. Il riconoscimento è alimentato da Tesseract, caricato su richiesta dentro la scheda del tuo browser; l'immagine stessa non viene mai caricata da nessuna parte.",
      "L'output finisce in una casella modificabile, così puoi correggere la lettura sbagliata di tanto in tanto prima di copiarla o scaricarla come file .txt. Gli scatti nitidi, illuminati in modo uniforme e frontali danno i risultati migliori.",
    ],
    steps: [
      "Trascina un'immagine (PNG, JPG o WebP) che contenga testo.",
      "Scegli la lingua del testo — il modello corrispondente viene caricato al primo uso.",
      "Lancia il riconoscimento e modifica il testo estratto se serve.",
      "Copialo o scaricalo come file .txt.",
    ],
    faqs: [
      {
        q: "La mia immagine viene caricata su un server?",
        a: "No. L'immagine viene letta e riconosciuta nel tuo stesso browser. Tieni presente che il motore OCR e il modello linguistico vengono scaricati da una CDN pubblica al primo uso (circa 10–20 MB per lingua): quel download va dalla CDN a te, ma l'immagine non lascia mai il tuo dispositivo.",
      },
      {
        q: "Quali lingue sono supportate?",
        a: "Inglese, cinese semplificato, giapponese, spagnolo, portoghese, tedesco e francese. Ogni lingua carica il proprio modello addestrato la prima volta che la selezioni; poi resta nella cache del browser e il riconoscimento parte più in fretta.",
      },
      {
        q: "Perché una parte del testo è sbagliata?",
        a: "La precisione dell'OCR dipende moltissimo dalla sorgente: foto sfocate, pagine curve, font piccoli e sfondi affollati causano letture sbagliate. Usa l'immagine più nitida che hai, ritaglia solo l'area del testo e aspettati di rileggere — soprattutto numeri e caratteri simili.",
      },
    ],
  },
  "png-to-jpg": {
    name: "PNG in JPG",
    tagline:
      "Converte le immagini PNG in JPG e ne riduce drasticamente il peso — le aree trasparenti prendono uno sfondo bianco pulito e la qualità resta regolabile.",
    intro: [
      "Trasforma i file .png pesanti in copie .jpg compatte che si caricano più in fretta e si aprono ovunque. Un cursore di qualità (92% per default) mantiene il risultato indistinguibile a occhio tagliando la dimensione del 60–90% per screenshot e foto tipici.",
      "La trasparenza PNG non può sopravvivere in JPG, quindi le aree trasparenti vengono appiattite sul bianco puro — la sistemazione standard per moduli, avatar e marketplace che accettano solo JPEG. La modalità in blocco gestisce un'intera cartella in un colpo solo.",
    ],
    steps: [
      "Trascina le tue immagini PNG — una o tante.",
      "Regola la qualità JPG se vuoi file più piccoli o la massima fedeltà.",
      "Scarica i file JPG uno per uno o tutti in una volta.",
    ],
    faqs: [
      {
        q: "Cosa succede alle aree trasparenti convertendo PNG in JPG?",
        a: "Il JPG non ha canale alpha, quindi i pixel trasparenti vengono riempiti di bianco pieno prima del salvataggio. Se ti serve un colore di sfondo diverso, o devi mantenere la vera trasparenza, resta sul PNG (o usa WebP).",
      },
      {
        q: "Quanto più piccolo sarà il JPG?",
        a: "Di solito 60–90% più piccolo per screenshot e foto. La grafica piatta con bordi netti si comprime con meno dramma e a qualità basse può mostrare una leggera sfocatura — tieni il cursore sopra l'85% per testo e immagini di interfaccia.",
      },
      {
        q: "La conversione può rendere l'immagine più nitida o sistemare gli artefatti?",
        a: "No. Convertire cambia solo la codifica; non può aggiungere dettaglio. Se il PNG stesso sembra già morbido, il JPG apparirà altrettanto morbido (con un possibile fruscio di compressione a qualità molto basse).",
      },
    ],
  },
  "rotate-image": {
    name: "Ruota immagini",
    tagline:
      "Ruota le immagini di 90°, 180° o 270° e specchiale in orizzontale o in verticale — adatto ai lotti, istantaneo e completamente nel tuo browser.",
    intro: [
      "Rimetti dritte le foto, raddrizza le scansioni arrivate di lato o specchia un'immagine per un layout capovolto. Ogni pulsante si applica a tutti i file caricati in una volta, e una piccola dicitura mostra sempre lo stato attuale di rotazione e specchio, così non perdi mai il filo.",
      "Rotazioni e specchi vengono cuciti nei pixel veri e propri, quindi il file salvato appare identico ovunque — nessun lettore lo «correggerà» mai più indietro. L'output mantiene il formato originale di ogni immagine.",
    ],
    steps: [
      "Trascina una o più immagini nella casella.",
      "Clicca sui pulsanti di rotazione e specchio finché l'anteprima non mostra ciò che vuoi.",
      "Scarica le immagini corrette una per una o tutte in una volta.",
    ],
    faqs: [
      {
        q: "Ruotare un JPEG è senza perdita?",
        a: "In questo strumento la rotazione avviene ricodificando i pixel, quindi il file viene rigenerato (al 92% di qualità JPEG per default per i JPG). In pratica la differenza è invisibile, ma non è identica al bit — gli strumenti che promettono «rotazione senza perdita» funzionano solo su dimensioni multiple della griglia dei blocchi JPEG.",
      },
      {
        q: "Perché una foto appare ruotata in un'app e dritta in un'altra?",
        a: "Alcune immagini conservano solo un flag di orientamento nei dati EXIF invece di pixel davvero ruotati, e non tutte le app applicano quel flag. Questo strumento scrive la rotazione direttamente nei pixel e toglie il flag, così il risultato si mostra uguale ovunque.",
      },
      {
        q: "Posso specchiare una foto in orizzontale come uno specchio?",
        a: "Sì — usa il pulsante «Capovolgi orizzontale» per specchiare destra-sinistra, o «Capovolgi verticale» per alto-basso. Si possono combinare con qualsiasi rotazione.",
      },
    ],
  },
  "round-corners-image": {
    name: "Arrotonda gli angoli",
    tagline:
      "Dà gli angoli arrotondati a un'immagine o a un intero lotto — angoli PNG trasparenti o colore pieno, anteprima dal vivo, output in PNG o JPG. Gira nel browser.",
    intro: [
      "Gli angoli arrotondati addolciscono screenshot, avatar e scatti di prodotto senza aprire un editor. Trascina un'immagine o un intero lotto, tira il cursore del raggio e guarda l'anteprima aggiornarsi dal vivo — il raggio arriva fino al cerchio pieno, limitato alla metà del lato più corto.",
      "Scegli se gli angoli tagliati restano trasparenti (PNG) o prendono un colore pieno, che è ciò che serve anche all'output JPG dato che non ha canale alpha. Ogni file viene elaborato sul tuo dispositivo e scaricato singolarmente.",
    ],
    steps: [
      "Trascina un'immagine o un intero lotto.",
      "Tira il cursore del raggio — l'anteprima mostra la prima immagine dal vivo.",
      "Scegli angoli trasparenti o a colore pieno e il formato di output.",
      "Arrotondali tutti e scarica ogni risultato.",
    ],
    faqs: [
      {
        q: "Gli angoli possono essere trasparenti invece che bianchi?",
        a: "Sì — scegli output PNG e l'opzione Trasparente, e gli angoli restano a spiovere. Il JPG non ha canale alpha, quindi riempie sempre gli angoli con il colore pieno che hai scelto.",
      },
      {
        q: "Lo stesso raggio appare diverso su ogni immagine — perché?",
        a: "Il cursore imposta il raggio in pixel, e ogni file viene arrotondato con esattamente quel raggio, limitato alla metà del suo lato più corto. Per un aspetto uniforme tra immagini di dimensioni diverse, prima uguagliale (per esempio con lo strumento ridimensiona immagini).",
      },
      {
        q: "Arrotondare riduce la qualità dell'immagine?",
        a: "Vengono toccati solo gli angoli — i pixel interni restano intatti. L'output PNG è senza perdita, mentre il JPG viene ricodificato ad alta qualità, il che può spostare leggermente il peso del file in una direzione o nell'altra.",
      },
    ],
  },
  "screenshot-tool": {
    name: "Strumento screenshot",
    tagline:
      "Cattura un singolo fotogramma dello schermo, ritaglialo con precisione e salvalo come PNG — uno scatto autorizzato, niente registrazioni o upload.",
    intro: [
      "Clicca su cattura, scegli schermo, finestra o scheda nella finestra di condivisione del tuo browser, e lo strumento afferra esattamente un solo fotogramma fermo. La condivisione termina subito — niente registrazione, niente sessione, e nulla lascia il tuo dispositivo. Ciò che ottieni è un normale PNG pronto da salvare.",
      "Ti serve solo una parte dello scatto? Attiva la modalità di ritaglio e trascina una selezione precisa prima di salvare, con lo stesso widget di ritaglio al pixel del nostro strumento di ritaglio. Perfetto per segnalazioni di bug, documentazione rapida e ricevute.",
    ],
    steps: [
      "Clicca su «Scegli schermo e cattura» e concedi il permesso nella finestra del browser.",
      "Scegli lo schermo, la finestra o la scheda che vuoi; un fotogramma viene catturato all'istante e la condivisione si ferma.",
      "Se vuoi ritaglia il fotogramma, poi salva il PNG nei tuoi download.",
    ],
    faqs: [
      {
        q: "Il mio schermo viene registrato?",
        a: "No. Lo strumento richiede una cattura di un solo fotogramma tramite il consueto permesso di condivisione schermo del browser. Il flusso viene fermato nell'istante in cui il fotogramma è salvato in memoria, quindi nulla continua a girare e nulla viene caricato da nessuna parte.",
      },
      {
        q: "Perché il browser chiede il permesso?",
        a: "La cattura dello schermo è una capacità potente, quindi i browser chiedono sempre una scelta esplicita tramite la loro finestra nativa. Scegli esattamente quale schermo, finestra o scheda condividere — lo strumento non vede mai nulla che non hai selezionato.",
      },
      {
        q: "Funziona su telefoni o tablet?",
        a: "No. I browser su iOS e Android non offrono la cattura dello schermo alle pagine web, quindi lo strumento spiega che lì non è disponibile. Su desktop lo supportano Chrome, Edge, Firefox e Safari.",
      },
    ],
  },
  "svg-converter": {
    name: "Converti SVG in PNG",
    tagline:
      "Trasforma icone e grafiche SVG in raster PNG nitidi a 1× fino a 4× o a qualsiasi scala personalizzata — trasparenza preservata, perfetto per le risorse delle app.",
    intro: [
      "Gli SVG sono perfetti per il design ma molti posti — store delle app, editor, messenger, CMS datati — esigono un PNG raster. Questo strumento renderizza il tuo file vettoriale esattamente alla dimensione che ti serve: 1× per le anteprime, 2× per gli schermi retina, 3×–4× o un fattore personalizzato per esportazioni da stampa.",
      "Il PNG conserva lo sfondo trasparente del tuo SVG, e il vettore viene ri-renderizzato alla risoluzione bersaglio anziché stirato, quindi i bordi restano affilatissimi. Trascina un intero set di icone in una volta — ogni file viene convertito in un passaggio.",
    ],
    steps: [
      "Trascina uno o più file .svg.",
      "Scegli una scala: 1×–4× o scrivi qualsiasi fattore personalizzato.",
      "Scarica i file PNG uno per uno o tutti in una volta.",
    ],
    faqs: [
      {
        q: "A quale scala conviene esportare?",
        a: "Usa 2× per le icone mostrate su schermi retina/alto DPI, 1× quando la dimensione in pixel è nota e definitiva, e 3×–4× come risorsa madre da cui ridurre in seguito. Per una favicon, esporta all'equivalente di 512 px e riduci dopo.",
      },
      {
        q: "Convertire in PNG fa perdere la scalabilità dell'SVG?",
        a: "Sì — un PNG è a risoluzione fissa. Per questo lo strumento renderizza direttamente alla dimensione bersaglio invece di rasterizzare piccolo e stirare. Conserva il sorgente .svg per le modifiche future ed esporta PNG freschi quando ti serve un'altra dimensione.",
      },
      {
        q: "Gli sfondi trasparenti sopravvivono alla conversione?",
        a: "Sì. L'output è un PNG con alpha pieno, quindi la tua icona conserva la trasparenza esattamente come nell'SVG. Solo i font e le immagini esterne richiamati dall'SVG potrebbero dover essere incorporati nel file stesso per renderizzare.",
      },
    ],
  },
  "watermark-image": {
    name: "Filigrana immagini",
    tagline: "Aggiunge una filigrana testuale alle immagini — posizione, opacità, dimensione o a piastrelle, elaborato interamente nel tuo browser.",
    intro: [
      "Proteggi bozze, provini e foto con una filigrana testuale che controlli del tutto: mettila in qualsiasi angolo o al centro, a piastrelle su tutta l'immagine, regola dimensione e opacità — le copie marcate vengono generate sul tuo dispositivo.",
      "Non viene caricato nulla, quindi puoi mettere la filigrana su lavori inediti, provini per clienti e scansioni riservate senza inviarli da nessuna parte.",
    ],
    steps: [
      "Trascina un'immagine o un intero lotto.",
      "Scrivi il testo della filigrana e imposta opacità, dimensione, posizione — oppure attiva le piastrelle.",
      "Applica e scarica ogni copia marcata.",
    ],
    faqs: [
      {
        q: "Qualcuno può rimuovere la mia filigrana?",
        a: "Una filigrana visibile è un deterrente, non una crittografia — tutto ciò che è visibile si può editare via con impegno. Per una protezione vera, condividi invece provini a bassa risoluzione.",
      },
      {
        q: "Funziona con i PNG trasparenti?",
        a: "L'output è JPG, quindi la trasparenza viene appiattita sul bianco. Se ti serve l'alpha, metti la filigrana al PNG originale con un colore di sfondo a tua scelta.",
      },
    ],
  },
  "webp-converter": {
    name: "Converti WebP",
    tagline:
      "Converte le immagini in WebP o riporta i file WebP in JPG e PNG — scegli il formato di arrivo, regola la qualità, elabora in blocco.",
    intro: [
      "Passare a WebP taglia le dimensioni dei file del 25–35% rispetto a JPG alla stessa qualità visiva — ideale per siti e app. Tornare da WebP a JPG o PNG fa sì che le immagini si aprano in software datati che non hanno mai imparato il formato di Google.",
      "Trascina qualsiasi mix di WebP, JPG, PNG e altri, scegli il formato di output, e ogni file si converte in una volta con la dimensione prima e dopo mostrata per riga. Tutto viene codificato dal tuo browser sul tuo stesso dispositivo — mai un upload.",
    ],
    steps: [
      "Trascina file WebP per convertire via da WebP, o qualsiasi immagine per convertirla in WebP.",
      "Scegli il formato di output (WebP, JPG o PNG) e imposta la qualità per i formati con perdita.",
      "Scarica i file convertiti uno per uno o tutti in una volta.",
    ],
    faqs: [
      {
        q: "Perché usare WebP invece di JPG?",
        a: "WebP comprime 25–35% più piccolo del JPG a qualità equivalente e supporta sia la trasparenza sia l'animazione. Tutti i browser attuali lo renderizzano, quindi è la scelta standard per le immagini web. Scegli JPG solo se devi supportare software molto vecchi.",
      },
      {
        q: "Un file WebP si apre in qualsiasi app?",
        a: "Tutti i browser moderni e le versioni recenti di Windows, macOS, Android e iOS gestiscono il WebP. Alcuni editor fotografici datati e alcune form web lo rifiutano ancora — è esattamente il momento di riconverterlo qui in JPG o PNG.",
      },
      {
        q: "La conversione in WebP è senza perdita?",
        a: "Decidi tu: WebP supporta sia la codifica senza perdita sia quella con perdita. Alla qualità predefinita 90 il risultato è indistinguibile a occhio ma molto più piccolo; abbassa il cursore per il massimo risparmio, oppure scegli output PNG per la rigorosa assenza di perdite.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* Testo                                                               */
  /* ------------------------------------------------------------------ */
  "case-converter": {
    name: "Converti maiuscole e minuscole",
    tagline: "Converte il testo tra MAIUSCOLO, minuscolo, Titolo, camelCase, snake_case e altri 6 stili — dal vivo.",
    intro: [
      "Undici stili di maiuscole su una pagina: tipo frase per la scrittura, Tipo Titolo per i titoli, camelCase / PascalCase / snake_case / kebab-case / CONSTANT_CASE per il codice, più alternato e inverso per gioco.",
      "Tutto si ricalcola mentre scrivi — niente martellate di pulsanti, e la conversione non lascia mai il tuo browser.",
    ],
    steps: [
      "Incolla o scrivi il tuo testo nella casella di input.",
      "Clicca su un pulsante di stile — l'output si aggiorna all'istante.",
      "Copia il risultato o passa a un altro stile per confrontare.",
    ],
    faqs: [
      {
        q: "Qual è la differenza tra camelCase e PascalCase?",
        a: "camelCase inizia in minuscolo (myVariableName), PascalCase in maiuscolo (MyVariableName). Entrambi tolgono spazi e trattini bassi dalle parole prima di unirle.",
      },
      {
        q: "Il Tipo Titolo mantiene le parole piccole in minuscolo?",
        a: "Sì. Articoli e preposizioni corte (a, di, in…) restano in minuscolo salvo che siano la prima o l'ultima parola, seguendo il consueto stile editoriale.",
      },
      {
        q: "Il mio testo viene caricato da qualche parte?",
        a: "No. La conversione avviene in locale nel tuo browser con JavaScript — nulla viene inviato a nessun server.",
      },
    ],
  },
  "character-counter": {
    name: "Contatore caratteri",
    tagline:
      "Conta i caratteri con e senza spazi, più parole, frasi, paragrafi e righe mentre scrivi — perfetto per post, titoli e meta descrizioni.",
    intro: [
      "Un contatore caratteri costruito per i limiti rigidi: post social, meta titoli, meta descrizioni, testi pubblicitari, SMS e campi delle app che contano ogni carattere. Il pannello mostra i caratteri con spazi e senza, così sai sempre quale numero considera la piattaforma.",
      "I conteggi si aggiornano mentre scrivi, e nulla lascia il tuo browser — incolla bozze inedite, testi per clienti o contenuti riservati senza il pensiero che vengano salvati o inviati da qualche parte.",
    ],
    steps: [
      "Incolla o scrivi il tuo testo nella casella.",
      "Leggi prima il pannello dei caratteri evidenziati, poi gli altri conteggi secondo necessità.",
      "Sfronda il testo finché non scendi sotto il limite — i numeri si aggiornano dal vivo.",
    ],
    faqs: [
      {
        q: "Spazi e interruzioni di riga contano come caratteri?",
        a: "Sì — la cifra principale conta ogni carattere compresi spazi e interruzioni di riga, esattamente come fanno la maggior parte delle piattaforme. La cifra «Senza spazi» toglie gli spazi bianchi così puoi confrontare.",
      },
      {
        q: "Come vengono contate le emoji?",
        a: "Le emoji vengono contate come punti codice Unicode, quindi la maggior parte delle emoji moderne conta come un carattere. Le sequenze complesse costruite da più punti codice (toni della pelle, emoji di famiglia) possono contare più di uno.",
      },
      {
        q: "Quali piattaforme hanno limiti in caratteri?",
        a: "I post su X/Twitter, i meta titoli (circa 60) e le descrizioni (circa 160), i segmenti SMS (160) e la maggior parte delle piattaforme pubblicitarie — controlla sempre il campo specifico per cui stai scrivendo.",
      },
    ],
  },
  "emoji-picker": {
    name: "Selettore emoji",
    tagline:
      "Sfoglia oltre 670 emoji comuni in 8 gruppi curati, cerca per nome, clicca per copiare all'istante e ritrova le 16 più recenti — tutto nel tuo browser.",
    intro: [
      "Una lavagna di emoji curata a mano con 677 voci raggruppate come le pensi: Faccine, Persone, Animali, Cibo, Attività, Viaggi, Oggetti e Simboli. La ricerca matcha il nome ufficiale — scrivendo «stella» trovi ⭐, 🌟 e ✨ in un colpo solo.",
      "Un clic copia il carattere negli appunti, con una conferma visibile così non resti mai nel dubbio. Le tue 16 scelte più recenti restano su questo dispositivo via localStorage, quindi il preferito di domani è a un tocco. Nessuna immagine viene caricata — la griglia renderizza al volo le emoji native del sistema.",
    ],
    steps: [
      "Scrivi un nome nella casella di ricerca o scegli una scheda di gruppo.",
      "Clicca su qualsiasi emoji — viene copiata negli appunti all'istante.",
      "Ritrova le scelte recenti nella riga in alto, conservate su questo dispositivo.",
    ],
    faqs: [
      {
        q: "Da dove vengono le emoji?",
        a: "Sono glifi nativi renderizzati dal font emoji del tuo sistema operativo. Non si scarica nulla, quindi la pagina resta veloce e funziona offline una volta caricata.",
      },
      {
        q: "Perché alcune emoji appaiono diverse da quelle che vedo sul telefono?",
        a: "Ogni piattaforma disegna le emoji a modo suo. La griglia mostra come le renderizza il dispositivo corrente; il carattere copiato apparirà allo stesso modo nell'app che lo riceve.",
      },
      {
        q: "Come funziona «Usate di recente»?",
        a: "Ogni emoji che copi viene ricordata nel localStorage del browser (fino a 16). Svuotare i dati del browser azzera l'elenco.",
      },
    ],
  },
  "fancy-text-generator": {
    name: "Generatore di testo fantasioso",
    tagline:
      "Trasforma il testo semplice in 12 stili Unicode — grassetto, corsivo, script, doppio tratto, cerchiato, fullwidth e altri — e copiane uno con un clic.",
    intro: [
      "Scrivi una volta e ottieni dodici varianti Unicode insieme: alfabeti matematico grassetto, corsivo, grassetto corsivo, script, script grassetto, doppio tratto, monospace, cerchiato, squadrato e fullwidth, più barrato e sottolineato con caratteri combinanti.",
      "Poiché sono veri caratteri Unicode — non font — i risultati si incollano intatti nelle bio di Instagram, nei sottotitoli di TikTok, nei soprannomi di Discord, nelle bozze di tweet e nelle app di chat. I caratteri fuori dall'alfabeto latino, come cinese, giapponese o emoji, passano intatti invece di trasformarsi in riquadri vuoti.",
    ],
    steps: [
      "Scrivi o incolla il tuo testo — un esempio è già caricato per giocarci.",
      "Scorri l'elenco dal vivo: ogni stile mostra il tuo testo all'istante.",
      "Premi Copia sullo stile che ti piace e incollalo ovunque accettino testo.",
    ],
    faqs: [
      {
        q: "Perché il testo appare uguale su alcuni siti?",
        a: "Il testo fantasioso usa caratteri Unicode, e il font di un sito può non avere i glifi per alcuni (soprattutto script e doppio tratto). Se uno stile si renderizza male da qualche parte, prova grassetto, cerchiato o fullwidth — sono quelli con la copertura font più larga.",
      },
      {
        q: "Posso usarlo per la bio di Instagram o il soprannome su TikTok?",
        a: "Sì. L'output è testo Unicode puro, quindi funziona nelle bio social, nei nomi mostrati, nei commenti e ovunque altro accettino i normali caratteri.",
      },
      {
        q: "Cosa succede ai caratteri come le emoji o il cinese?",
        a: "Restano esattamente come scritti. Il generatore mappa solo lettere e cifre latine, quindi emoji, CJK e lettere accentate passano invariate invece di trasformarsi in caselle vuote.",
      },
    ],
  },
  "find-and-replace": {
    name: "Trova e sostituisci",
    tagline:
      "Trova e sostituisci su migliaia di parole con le modalità maiuscole, parola intera e regex — guarda il numero di corrispondenze prima di confermare.",
    intro: [
      "Una casella per la ricerca, una per la sostituzione, tre modalità di match. Testo semplice per gli scambi rapidi, modalità parola intera perché «gatto» non finisca dentro «gattile», ed espressioni regolari per i pattern — date, tag, spazi bianchi ripetuti o qualsiasi altra cosa tu sappia descrivere.",
      "Le corrispondenze vengono contate mentre scrivi e la sostituzione si mostra dal vivo, così vedi esattamente cosa cambierà prima di copiare qualsiasi cosa.",
    ],
    steps: [
      "Incolla il testo, poi scrivi cosa trovare e con cosa sostituirlo.",
      "Scegli una modalità: maiuscole e minuscole, solo parole intere o espressione regolare.",
      "Controlla il numero di corrispondenze, poi copia il risultato sostituito.",
    ],
    faqs: [
      {
        q: "Posso usare i gruppi di cattura in modalità regex?",
        a: "Sì. Racchiudi parti del pattern tra parentesi e richiamale nella sostituzione come $1, $2 e così via — per esempio cerca '(\\d{4})-(\\d{2})' e sostituisci con '$2/$1'.",
      },
      {
        q: "A cosa serve «solo parole intere»?",
        a: "Fa match solo quando il termine sta da solo: cercare «gatto» non troverà più corrispondenze dentro «gattile» o «gattone».",
      },
      {
        q: "I segni $ nella mia sostituzione vengono presi alla lettera?",
        a: "In modalità semplice sì — «$100» resta «$100». In modalità regex i pattern con $ sono speciali ($1 significa gruppo 1); scrivi \\$ se ti serve uno letterale.",
      },
    ],
  },
  "lorem-ipsum-generator": {
    name: "Generatore lorem ipsum",
    tagline:
      "Genera da 1 a 50 paragrafi del classico riempitivo lorem ipsum per mockup, wireframe e test dei CMS — un clic per rigenerare e copiare.",
    intro: [
      "Il lorem ipsum è il segnaposto dell'editoria dagli anni 1500: latino mescolato dal «De Finibus» di Cicerone che assomiglia a testo vero ma non significa nulla, così nessuno scambia una bozza per il capolavoro finito. Scegli il numero di paragrafi, premi il pulsante e incollalo nel tuo layout.",
      "Il testo viene generato in locale con un generatore pseudo-casuale con seme, quindi ogni lotto è diverso — e nulla di ciò che fai su questo sito lascia mai il browser.",
    ],
    steps: [
      "Imposta quanti paragrafi ti servono (1–50).",
      "Premi il pulsante per generare un lotto fresco.",
      "Copia il testo direttamente nel tuo design, template o CMS.",
    ],
    faqs: [
      {
        q: "Che cos'è esattamente il lorem ipsum?",
        a: "Latin corrotto tratto da un passo del De Finibus Bonorum et Malorum di Cicerone, troncato e mescolato in un riempitivo senza senso. La sua distribuzione di lettere imita la lingua vera, il che lo rende ideale per giudicare il layout senza leggere il contenuto.",
      },
      {
        q: "Perché non usare semplicemente «testo testo testo»?",
        a: "Le parole finte ripetute creano forme irrealistiche e nascondono problemi di a capo e ritmo. Il lorem ipsum imita la lunghezza delle parole e la distribuzione della lingua vera.",
      },
      {
        q: "Posso avere più di 50 paragrafi?",
        a: "Un lotto è limitato a 50 paragrafi per tenere la pagina veloce; premi di nuovo il pulsante ogni volta che ti serve un altro lotto fresco.",
      },
    ],
  },
  "remove-duplicate-lines": {
    name: "Rimuovi righe duplicate",
    tagline: "Elimina le righe ripetute da elenchi e log mantenendo l'ordine originale — con opzioni di maiuscole e rifinitura.",
    intro: [
      "Incolla qualsiasi elenco — email, URL, parole chiave, righe di log — e riavrai lo stesso elenco con i duplicati tolti in un solo passaggio. Le opzioni coprono le varianti consuete: ignorare maiuscole e minuscole, rifinire gli spazi prima del confronto, scartare le righe vuote o ordinare il risultato.",
    ],
    steps: [
      "Incolla il tuo elenco nella casella di input — una voce per riga.",
      "Attiva le opzioni se ti serve un confronto senza distinzione di maiuscole o una pulizia.",
      "Copia l'output senza duplicati; l'ordine originale viene preservato salvo tu non attivi l'ordinamento.",
    ],
    faqs: [
      {
        q: "Mantiene l'ordine originale delle righe?",
        a: "Sì. La prima occorrenza di ogni riga resta al suo posto. L'ordinamento avviene solo se attivi l'opzione di ordinamento.",
      },
      {
        q: "Può trattare «Mela» e «mela» come duplicati?",
        a: "Attiva «Ignora maiuscole» e verranno trattate come la stessa riga; viene conservata la prima variante vista.",
      },
    ],
  },
  "remove-extra-spaces": {
    name: "Rimuovi spazi extra",
    tagline:
      "Riduce gli spazi doppi a uno, converte le tabulazioni, rifinisce i bordi delle righe e toglie le righe vuote — ripulisci il testo incollato in un passaggio.",
    intro: [
      "Il testo copiato da PDF, fogli di calcolo, terminali e app di chat arriva spesso costellato di spazi doppi, tabulazioni vaganti e righe vuote. Questo strumento schiaccia gli spazi ripetuti in uno e ti dà gli interruttori per il resto: trasformare le tabulazioni in spazi, rifinire i bordi di ogni riga e scartare le righe bianche.",
      "Tutto gira in locale mentre scrivi, quindi puoi incollare log, bozze o qualsiasi altra cosa delicata senza pensarci due volte.",
    ],
    steps: [
      "Incolla il testo disordinato nella casella di input.",
      "Attiva conversione tabulazioni, rifinitura delle righe o rimozione delle righe vuote secondo necessità.",
      "Copia l'output pulito direttamente nel tuo documento o editor.",
    ],
    faqs: [
      {
        q: "Riduce gli spazi dentro le righe o solo ai bordi?",
        a: "Gli spazi ripetuti ovunque nel testo vengono ridotti a uno solo. Lo spazio ai bordi viene tolto solo se attivi «Rifinisci i bordi delle righe».",
      },
      {
        q: "Mi rompe l'indentazione del codice?",
        a: "Può — l'indentazione si basa su spazi o tabulazioni iniziali. Per il codice, lascia spento «Rifinisci i bordi delle righe» oppure usa un formattatore dedicato.",
      },
      {
        q: "Le interruzioni di riga vengono preservate?",
        a: "Sì. Lo strumento tocca solo gli spazi bianchi orizzontali e le righe vuote; la struttura a righe del tuo testo resta intatta.",
      },
    ],
  },
  "reverse-text": {
    name: "Inverti testo",
    tagline:
      "Rovescia qualsiasi testo carattere per carattere, oppure inverti l'ordine delle righe intere — sicuro con Unicode, istantaneo e completamente locale.",
    intro: [
      "Due inversioni in uno strumento: specchia i caratteri del tuo testo (il classico trucco «txet esrever» per giochi, bio e indovinelli) o rovescia l'ordine delle righe così l'ultima arriva prima — comodo per log, esportazioni di chat ed elenchi incollati dal basso.",
      "L'inversione lavora sui punti codice Unicode, non sui byte grezzi, quindi le lettere accentate e la maggior parte delle emoji sopravvivono intatte invece di diventare pasticci illeggibili.",
    ],
    steps: [
      "Incolla o scrivi il testo che vuoi rovesciare.",
      "Lascia spento «Inverti solo le righe» per specchiare i caratteri, o accendilo per rovesciare l'ordine delle righe.",
      "Copia il risultato invertito.",
    ],
    faqs: [
      {
        q: "Emoji e lettere accentate sopravvivono?",
        a: "Sì nei casi comuni: lo strumento inverte per punti codice Unicode, quindi é, ñ e le emoji standard restano intatte. Le emoji molto complesse, costruite da più parti, possono comunque sfaldarsi quando vengono specchiate.",
      },
      {
        q: "Cosa fa esattamente «Inverti solo le righe»?",
        a: "Mantiene ogni riga intatta e rovescia l'ordine delle righe stesse — la prima riga diventa l'ultima. Usalo quando un elenco è stato incollato dal basso verso l'alto.",
      },
      {
        q: "Posso usarlo per controllare i palindromi?",
        a: "Indirettamente — incolla il testo, invertilo e confronta a occhio, oppure abbinalo allo strumento di confronto testo.",
      },
    ],
  },
  "sentence-counter": {
    name: "Contatore frasi",
    tagline:
      "Conta le frasi all'istante e mostra accanto parole, paragrafi e tempo di lettura — un rapido controllo di leggibilità per editori e scrittori.",
    intro: [
      "Il conteggio delle frasi è il segnale di leggibilità più rapido che uno scrittore abbia. Questo strumento conta le frasi mentre scrivi e le affianca a parole, paragrafi, righe e tempo di lettura, così capisci a colpo d'occhio se un paragrafo sta diventando troppo denso.",
      "Riconosce la punteggiatura che chiude davvero le frasi nei testi misti: i punti latini, i punti interrogativi ed esclamativi, più i segni a larghezza piena 。!?… usati in cinese e giapponese.",
    ],
    steps: [
      "Incolla la tua bozza, email o articolo nella casella.",
      "Controlla il conteggio delle frasi evidenziato e confrontalo con il conteggio delle parole.",
      "Spezza o unisci frasi per centrare la lunghezza media che ti sei posto come obiettivo.",
    ],
    faqs: [
      {
        q: "Cosa conta come frase?",
        a: "Qualsiasi tratto di testo che termina con punto, punto interrogativo, punto esclamativo o gli equivalenti CJK 。!?… — purché contenga qualcosa di diverso dal solo spazio.",
      },
      {
        q: "Perché il mio conteggio è diverso da quello dell'editor?",
        a: "Abbreviazioni come «sig.» o «es.» finiscono col punto e vengono contate come fine frase — questo strumento usa regole di punteggiatura, non un'analisi completa del linguaggio naturale.",
      },
      {
        q: "Quante frasi dovrebbe avere un paragrafo?",
        a: "Le guide di stile suggeriscono di solito 2–5. Nessuna regola è scolpita nella pietra: usa il conteggio per scovare i muri di testo prima che lo facciano i tuoi lettori.",
      },
    ],
  },
  "slug-generator": {
    name: "Generatore di slug",
    tagline:
      "Trasforma qualsiasi titolo in uno slug URL pulito — minuscolo, senza accenti e con i trattini — pronto per link amichevoli alla SEO.",
    intro: [
      "Uno slug è la parte dell'URL che dà il nome alla pagina — per esempio /tools/slug-generator. I buoni slug sono in minuscolo, usano i trattini al posto degli spazi e tengono solo lettere e numeri, il che rende i link leggibili nei risultati di ricerca, facili da copiare e sicuri tra server e framework.",
      "Incolla un titolo in qualsiasi lingua: gli accenti vengono tolti (café → cafe), punteggiatura e spazi collassano in trattini singoli, e il risultato viene rifinito così nessuno slug inizia o finisce con un trattino.",
    ],
    steps: [
      "Scrivi o incolla il titolo della pagina nella casella di input.",
      "Guarda lo slug comparire mentre scrivi — aggiusta il titolo finché non legge bene.",
      "Copia lo slug nel tuo CMS, router o generatore di siti statici.",
    ],
    faqs: [
      {
        q: "Cosa rende buono uno slug URL?",
        a: "Corto, in minuscolo, separato da trattini e descrittivo. I motori di ricerca leggono gli slug come indizio di posizionamento e gli utenti li leggono nei risultati, quindi «scarpe-running-blu» batte «/p?id=8123».",
      },
      {
        q: "Perché vengono tolti gli accenti?",
        a: "I caratteri non ASCII vengono codificati in percentuale negli URL (é diventa %C3%A9), producendo link lunghi, brutti e fragili. Gli slug ASCII restano corti e funzionano ovunque.",
      },
      {
        q: "Devo tenere le parole vuote come «il» e «di»?",
        a: "Molte guide SEO suggeriscono di scartarle per accorciare gli slug — modifica liberamente lo slug generato prima di copiarlo; lo strumento ti dà la base completa con i trattini.",
      },
    ],
  },
  "text-cleaner": {
    name: "Pulisci testo",
    tagline:
      "Toglie i caratteri invisibili, le virgolette curve, gli spazi extra e le righe vuote dal testo incollato da PDF, editor e app di chat.",
    intro: [
      "Il copia-incolla è dove il testo pulito va a morire: i PDF lasciano caratteri a larghezza zero, Word scambia le virgolette dritte con quelle curve e aggiunge spazi indivisibili, le app di chat infilano caratteri di controllo. Questo strumento rimuove lo sporco invisibile e ripara la punteggiatura in un passaggio.",
      "Ogni opzione è un interruttore, quindi decidi tu quanto aggressiva deve essere la pulizia — dalla semplice rifinitura delle righe a uno scrub completo che scarta i caratteri non stampabili e normalizza virgolette, trattini e puntini di sospensione.",
    ],
    steps: [
      "Incolla il testo disordinato nella casella di input.",
      "Attiva le pulizie che vuoi: rifinire le righe, ridurre gli spazi, togliere le righe vuote, scartare i caratteri invisibili, normalizzare la punteggiatura.",
      "Copia l'output pulito nel tuo documento, CMS o editor.",
    ],
    faqs: [
      {
        q: "Cosa sono i caratteri invisibili e da dove arrivano?",
        a: "Spazi a larghezza zero, contrassegni di ordine dei byte e caratteri di controllo — aggiunti da PDF, alcuni siti e software per ufficio. Sono invisibili ma rompono ricerche, espressioni regolari e importazioni in database, quindi toglierli di solito è sicuro.",
      },
      {
        q: "Cosa cambia «normalizza la punteggiatura»?",
        a: "Le virgolette curve diventano dritte, i trattini medi e lunghi diventano trattini semplici, il carattere di ellisse diventa tre punti e gli spazi indivisibili diventano spazi normali. Usalo quando conta la punteggiatura semplice e sicura per il codice.",
      },
      {
        q: "La pulizia è senza perdite?",
        a: "Nessuno strumento può conoscere con certezza le tue intenzioni. La casella di output mostra sempre prima il risultato, quindi rileggilo prima di sostituire l'originale.",
      },
    ],
  },
  "text-diff": {
    name: "Confronto testo",
    tagline:
      "Confronta due versioni di un testo parola per parola, con aggiunte e cancellazioni evidenziate — niente account, niente upload, niente limiti di dimensione.",
    intro: [
      "Incolla l'originale a sinistra e la versione modificata a destra: le parole cambiate si illuminano all'istante, le cancellazioni di un colore e le aggiunte di un altro. È il modo più rapido di rileggere la revisione di un contratto, la riscrittura di un redattore o gli interventi dell'ultimo minuto di un collega su un paragrafo.",
      "Il confronto gira interamente nel tuo browser — contratti lunghi, manoscritti inediti e testi riservati non toccano mai un server.",
    ],
    steps: [
      "Incolla il testo originale nella casella di sinistra.",
      "Incolla il testo modificato nella casella di destra.",
      "Leggi la vista unita qui sotto: la barratura marca le rimozioni, il verde marca le aggiunte.",
    ],
    faqs: [
      {
        q: "Come vengono mostrate le differenze?",
        a: "Il testo invariato è normale; le parole rimosse sono barrate in arancione e le parole aggiunte evidenziate in verde, così un paragrafo si legge come una revisione tracciata.",
      },
      {
        q: "È un confronto a livello di carattere o di parola?",
        a: "A livello di parola. Le piccole modifiche dentro una parola vengono mostrate come una parola tolta più una parola aggiunta, che è più facile da scorrere di un diff a livello di carattere.",
      },
      {
        q: "C'è un limite di dimensione?",
        a: "Solo la memoria del tuo browser — funzionano confronti lunghi quanto un libro, anche se testi molto grandi impiegano un istante a renderizzare.",
      },
    ],
  },
  "text-sorter": {
    name: "Ordina testo",
    tagline:
      "Ordina qualsiasi elenco di righe alfabeticamente, al contrario, per lunghezza o per numero — sensibile alla lingua e istantaneo, nel tuo browser.",
    intro: [
      "Incolla un elenco di nomi, URL, prezzi, compiti o righe di log e riordinalo con un clic: A→Z per elenchi e indici, Z→A per classifiche, dal più corto per i passaggi di pulizia, ordine numerico perché «voce 10» finisca dopo «voce 2» invece che tra «voce 1» e «voce 2».",
      "L'ordinamento usa la collazione sensibile alla lingua del browser, quindi i caratteri accentati si dispongono dove li aspetta un umano invece che dopo tutto l'alfabeto.",
    ],
    steps: [
      "Incolla il tuo elenco nella casella di input — una voce per riga.",
      "Scegli un ordine: A→Z, Z→A, corto→lungo o numerico.",
      "Copia il risultato ordinato o riordina con un altro criterio per confrontare.",
    ],
    faqs: [
      {
        q: "In cosa differisce l'ordinamento numerico dall'A→Z?",
        a: "L'ordinamento alfabetico confronta carattere per carattere, quindi «10» viene prima di «2». La modalità numerica legge ogni riga come numero e la ordina per valore.",
      },
      {
        q: "Gestisce il testo accentato e non latino?",
        a: "Sì. L'ordinamento usa Intl.Collator, il confronto sensibile alla lingua del browser, quindi é, ñ, ü e i caratteri CJK si ordinano secondo le convenzioni linguistiche invece dei punti codice grezzi.",
      },
      {
        q: "L'elenco originale viene modificato?",
        a: "No — l'input resta intatto e il risultato ordinato compare nella casella di output, così puoi sempre tornare indietro.",
      },
    ],
  },
  "word-counter": {
    name: "Contatore parole",
    tagline: "Conta parole, caratteri, frasi e tempo di lettura dal vivo mentre scrivi — il testo CJK gestito correttamente.",
    intro: [
      "Un contatore parole in tempo reale per saggi, post, testi SEO e traduzioni. Mostra parole, caratteri con e senza spazi, frasi, paragrafi, righe e tempo di lettura stimato in un'unica griglia.",
      "Il testo misto viene contato per bene: le parole in stile latino vengono separate dagli spazi mentre i caratteri cinesi, giapponesi e coreani vengono contati singolarmente, il che rispecchia come funzionano davvero i limiti di parole in quelle lingue.",
    ],
    steps: [
      "Incolla o scrivi il tuo testo nella casella — le statistiche si aggiornano all'istante.",
      "Controlla il pannello evidenziato per il conteggio che ti interessa.",
      "Continua a modificare; nulla viene salvato o caricato, quindi è al sicuro per le bozze inedite.",
    ],
    faqs: [
      {
        q: "Come vengono contate le parole nel testo cinese o giapponese?",
        a: "I caratteri CJK vengono contati come caratteri singoli e aggiunti al conteggio parole, dato che quelle lingue non separano le parole con spazi. Un passo cinese di 500 caratteri riporta circa 500 «parole».",
      },
      {
        q: "Come viene stimato il tempo di lettura?",
        a: "A circa 220 parole al minuto per il testo in alfabeto latino (pesato sul numero di caratteri per il CJK), arrotondato al minuto pieno più vicino.",
      },
      {
        q: "C'è un limite di lunghezza?",
        a: "Nessun limite rigido — il contatore è limitato solo dalla memoria del browser, che gestisce comodamente testi lunghi quanto un libro.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* Sviluppo                                                            */
  /* ------------------------------------------------------------------ */
  "base64-decoder": {
    name: "Decodificatore Base64",
    tagline:
      "Decodifica il Base64 in testo leggibile con una corretta gestione UTF-8 — data URI, payload di API e valori di configurazione codificati diventano chiari all'istante. Privato e gratis.",
    intro: [
      "Incolla Base64 e guarda il testo decodificato dal vivo. La decodifica passa per lo standard TextDecoder, quindi il contenuto UTF-8 multibyte — accenti, emoji, CJK — esce corretto invece di trasformarsi in pasticci.",
      "È tollerante nei punti utili: spazi e interruzioni di riga nell'input vengono ignorati, e i prefissi data URI come data:image/png;base64, vengono tolti automaticamente prima della decodifica.",
    ],
    steps: [
      "Incolla la stringa Base64 nella casella di input.",
      "Il testo decodificato compare all'istante — copialo con un clic.",
      "Se la decodifica fallisce, controlla input troncati o caratteri non Base64.",
    ],
    faqs: [
      {
        q: "L'output sembra fatto di simboli strani — perché?",
        a: "Probabilmente l'input non è testo UTF-8. Il Base64 può codificare byte arbitrari: immagini, PDF, blocchi binari. Questo strumento decodifica i byte come testo UTF-8, quindi i dati binari appaiono come caratteri sostitutivi.",
      },
      {
        q: "Sa decodificare il Base64 URL-safe?",
        a: "Sì — è pensato per i dati in stile JWT, dove - e _ sostituiscono + e /. Funziona anche il Base64 standard con o senza padding.",
      },
      {
        q: "La decodifica avviene su un server?",
        a: "No. Tutto gira nel tuo browser; la stringa non lascia mai il tuo dispositivo.",
      },
    ],
  },
  "base64-encoder": {
    name: "Codificatore Base64",
    tagline:
      "Codifica il testo in Base64 all'istante con pieno supporto UTF-8 — emoji, accenti e caratteri CJK sopravvivono intatti. Gratis, privo di upload, nulla lascia mai il tuo browser.",
    intro: [
      "Scrivi o incolla qualsiasi testo e ottieni la sua rappresentazione Base64 dal vivo mentre digiti. La codifica è sicura UTF-8 tramite lo standard TextEncoder, quindi testo multilingue, emoji e simboli producono esattamente gli stessi byte delle funzioni base64 di ogni linguaggio di programmazione.",
      "Usalo per le intestazioni HTTP Basic Auth, i prefissi data URI, gli allegati email in viaggio o qualsiasi API che si aspetta payload Base64 — senza terminale né snippet di codice.",
    ],
    steps: [
      "Incolla o scrivi il testo da codificare.",
      "L'output Base64 si aggiorna dal vivo — copialo quando vuoi.",
      "Reincolla il Base64 nel decodificatore collegato per fare l'andata e ritorno e verificare.",
    ],
    faqs: [
      {
        q: "Perché il Base64 allunga il mio testo?",
        a: "Il Base64 rappresenta ogni 3 byte come 4 caratteri, quindi l'output è circa il 33% più grande dell'input — è il costo di ottenere un testo sicuro per i sistemi binari.",
      },
      {
        q: "Il Base64 è una crittografia?",
        a: "No. Il Base64 è una codifica, non una crittografia — chiunque lo decodifica all'istante. Non usarlo mai per nascondere segreti; usa la vera crittografia.",
      },
      {
        q: "Unicode ed emoji sono supportati?",
        a: "Sì. L'input viene convertito in byte UTF-8 prima della codifica, il che corrisponde a ciò che btoa-con-TextEncoder, Python, Java e Node producono per la stessa stringa.",
      },
    ],
  },
  "css-minifier": {
    name: "Minificatore CSS",
    tagline:
      "Minifica CSS online: toglie i commenti e gli spazi inutili per ridurre il peso dei fogli di stile e caricare più in fretta. Istantaneo, privo di upload e sicuro per le tue regole.",
    intro: [
      "Incolla qualsiasi foglio di stile e ottieni in tempo reale una versione compatta su una riga: i commenti vengono scartati, gli spazi ridondanti collassano e i separatori si stringono — mentre il contenuto delle stringhe, dei valori url() e la semantica dei tuoi selettori restano esattamente come scritti.",
      "Usalo per preparare il CSS critico, snellire un tema prima del commit o controllare quanti byte risparierebbe davvero una pulizia. La lettura delle dimensioni dal vivo mostra input, output e la percentuale risparmiata.",
    ],
    steps: [
      "Incolla il tuo CSS nella casella di input.",
      "L'output minificato compare all'istante, con il peso risparmiato mostrato qui sotto.",
      "Copia il foglio di stile compatto o svuota l'input per minificarne un altro.",
    ],
    faqs: [
      {
        q: "La minificazione cambia il comportamento del mio CSS?",
        a: "No. Vengono tolti solo commenti e spazi bianchi — e nemmeno quelli con leggerezza: stringhe e contenuti url() sono preservati byte per byte, quindi i valori di contenuto e i data URI restano intatti.",
      },
      {
        q: "Ottimizza i colori, unisce le regole o aggiunge i prefissi?",
        a: "No — è un minificatore sicuro, a livello di sintassi. L'ottimizzazione strutturale (unire regole duplicate, abbreviare i colori) richiede un postprocessore completo; questo strumento garantisce zero cambi semantici.",
      },
      {
        q: "Dove finisce il mio CSS?",
        a: "Da nessuna parte. La minificazione gira in locale nel tuo browser; nulla viene caricato o salvato.",
      },
    ],
  },
  "csv-to-json": {
    name: "CSV in JSON",
    tagline:
      "Converte CSV in JSON con inferenza automatica dei tipi — numeri, booleani e null vengono individuati, i campi tra virgolette gestiti. Incolla, converti, copia. Nessun upload.",
    intro: [
      "Incolla qualsiasi CSV con la riga di intestazione e ottieni in tempo reale un array JSON di oggetti. I campi tra virgolette, le virgolette raddoppiate e i finali di riga CRLF vengono analizzati correttamente, e ogni cella riceve un tipo sensato: true/false diventano booleani, i numeri semplici diventano numeri, null diventa null — tutto il resto resta una stringa.",
      "Usalo per alimentare richieste API, popolare database o trasformare l'esportazione di un foglio di calcolo in qualcosa che il tuo codice sa digerire. L'output JSON è stampato con indentazione a 2 spazi e pronto da copiare.",
    ],
    steps: [
      "Incolla il tuo CSV (la prima riga deve essere l'intestazione) nella casella di input.",
      "Scegli virgola o punto e virgola come delimitatore.",
      "Copia l'array JSON di oggetti ben stampato.",
    ],
    faqs: [
      {
        q: "Come decide l'inferenza dei tipi tra stringa e numero?",
        a: "Una cella diventa un numero solo se è un letterale numerico pulito (niente zeri iniziali, niente spazi vaganti), true/false diventano booleani, il letterale null diventa null, e tutto il resto — ID con zeri iniziali, codici postali, date — resta una stringa per preservare il valore esatto.",
      },
      {
        q: "E se la riga di intestazione ha nomi duplicati o vuoti?",
        a: "Le celle di intestazione vuote vengono sostituite automaticamente con i nomi column1, column2… I nomi duplicati collassano sull'ultima occorrenza, dato che gli oggetti JSON non possono avere chiavi duplicate.",
      },
      {
        q: "Il mio CSV viene caricato su un server?",
        a: "No. La conversione gira in locale nel tuo browser — i tuoi dati non lasciano mai il dispositivo.",
      },
    ],
  },
  "hash-generator": {
    name: "Generatore di hash",
    tagline:
      "Calcola hash SHA-1, SHA-256, SHA-384, SHA-512 o MD5 di testo o file, direttamente nel tuo browser. Checksum rapidi per i controlli d'integrità — nessun upload.",
    intro: [
      "Hash di qualsiasi testo mentre scrivi, oppure trascina un file per rilevarne l'impronta senza leggerlo byte per byte. I digest della famiglia SHA-2 girano sul motore WebCrypto nativo del browser; l'MD5 usa un'implementazione JavaScript collaudata — tutto in locale, tutto gratis.",
      "Usi tipici: verificare un download contro un checksum pubblicato, deduplicare file, generare chiavi di cache o confrontare due versioni di un documento. Cambia algoritmo con un clic e copia il digest esadecimale all'istante.",
    ],
    steps: [
      "Scegli l'algoritmo: SHA-256 per default, oppure SHA-1/384/512/MD5.",
      "Scrivi o incolla il testo — oppure passa alla modalità File e trascina un file.",
      "Copia il digest esadecimale; confrontalo con il checksum atteso.",
    ],
    faqs: [
      {
        q: "Quale algoritmo conviene usare?",
        a: "SHA-256 è il default sensato per controlli d'integrità e impronte. SHA-384/512 per digest più lunghi; SHA-1 e MD5 sono eredità del passato — vanno bene per checksum non legati alla sicurezza, ma non fidarti di loro contro attaccanti.",
      },
      {
        q: "Un hash si può invertire per recuperare l'input?",
        a: "No. Gli hash sono a senso unico: digest a lunghezza fissa che scartano informazioni per costruzione. Trovare un input che produca un dato digest significa forzare a forza bruta l'intero spazio.",
      },
      {
        q: "Il mio testo e i miei file vengono caricati?",
        a: "Mai. L'hashing gira in locale nel tuo browser — perfino i file da più gigabyte vengono letti solo dal tuo stesso dispositivo.",
      },
    ],
  },
  "html-escape": {
    name: "Escape / Unescape HTML",
    tagline:
      "Escape o unescape delle entità HTML dal vivo mentre scrivi: & < > e le virgolette diventano riferimenti sicuri, con una modalità numerica opzionale per i caratteri non ASCII.",
    intro: [
      "Codifica i cinque caratteri che rompono l'HTML — la e commerciale, le parentesi angolari e entrambi gli stili di virgolette — nelle loro entità nominate, oppure incolla le entità per riportarle a testo leggibile. Un secondo interruttore trasforma i caratteri accentati e non latini in riferimenti numerici come &#233;, utile per i sistemi datati e i template email.",
      "Entrambe le direzioni girano dal vivo in un unico pannello, e la dicitura mostra esattamente come è cambiato il numero di caratteri, così un doppio escape rotto si vede a colpo d'occhio.",
    ],
    steps: [
      "Incolla HTML o testo con escape nella casella di input.",
      "Scegli Escape o Unescape; entrambi girano dal vivo mentre scrivi.",
      "Attiva le entità numeriche se ti serve output non ASCII come &#233;.",
      "Copia il risultato — la dicitura dei caratteri mostra quanto è cresciuto o ridotto.",
    ],
    faqs: [
      {
        q: "Perché l'apostrofo viene messo in escape come &#39; e non come &apos;?",
        a: "&apos; è valido in XML e HTML5 ma non è mai stato parte di HTML 4, quindi alcuni parser datati e client email lo gestiscono male. Il numerico &#39; è sicuro ovunque.",
      },
      {
        q: "Devo mettere in escape i caratteri non ASCII?",
        a: "Nei documenti UTF-8, di solito no — i browser gestiscono é direttamente. Le entità numeriche contano per le codifiche ereditate, le pipeline email o i sistemi che rovinano i byte non ASCII.",
      },
      {
        q: "Quali entità nominate riconosce l'unescaping?",
        a: "Circa 70 delle più comuni — markup (&amp;, &lt;, &gt;, &quot;, &apos;), punteggiatura (&mdash;, &hellip;, &ldquo;), accenti latini e simboli (&copy;, &euro;) — più ogni riferimento numerico decimale ed esadecimale.",
      },
    ],
  },
  "html-formatter": {
    name: "Formattatore HTML",
    tagline:
      "Trasforma HTML minificato o su una riga in markup pulito e indentato — un beautifier semplice e affidabile per email, template e pagine salvate. 100% sul client.",
    intro: [
      "Incolla HTML stipato insieme e riavrai all'istante markup leggibile e indentato con costanza. Gli elementi void come img e br non rompono mai l'indentazione, i tag autocaricanti comuni come li e p sono gestiti con senno, e i contenuti dei blocchi pre, textarea, script e style vengono preservati intatti.",
      "Un formattatore volutamente semplice: nessun riordino, nessuna riscrittura degli attributi, nessuna sorpresa — solo spazi e interruzioni di riga aggiunti perché la struttura salti all'occhio.",
    ],
    steps: [
      "Incolla il tuo HTML nella casella di input.",
      "Il risultato indentato compare dal vivo mentre scrivi.",
      "Copia il markup formattato o svuota l'input per formattarne un altro.",
    ],
    faqs: [
      {
        q: "La formattazione cambia il modo in cui il mio HTML si renderizza?",
        a: "No — la formattazione inserisce solo spazi e interruzioni di riga tra i tag. I contenuti di pre, textarea, script e style sono preservati esattamente, dato che lì gli spazi bianchi sono significativi.",
      },
      {
        q: "Come gestisce i tag non chiusi come li o p?",
        a: "Conosce i comuni elementi autocaricanti: un nuovo li chiude il precedente, e il tag di chiusura di un antenato chiude tutti i figli aperti, quindi elenchi e paragrafi si indentano come ti aspetti.",
      },
      {
        q: "L'HTML viene inviato a un server?",
        a: "Mai. Il formattatore è un tokenizer JavaScript locale — il tuo markup resta nel tuo browser.",
      },
    ],
  },
  "html-minifier": {
    name: "Minificatore HTML",
    tagline:
      "Minifica HTML nel browser: scarta i commenti e collassa gli spazi per tagliare il peso della pagina — un pulitore prudente che mantiene markup e rendering intatti.",
    intro: [
      "Incolla HTML e ottieni in tempo reale una versione più leggera. I commenti vengono tolti (i commenti condizionali IE sopravvivono), le sequenze di spazi collassano in uno spazio singolo, e gli spazi tra tag di blocco vengono del tutto scartati — mentre la spaziatura del testo inline viene preservata, così le parole non si saldano mai.",
      "È un minificatore volutamente prudente: non rinomina classi, non toglie virgolette e non ristruttura nulla. Questo lo rende sicuro per template email e markup datati, e la lettura delle dimensioni dal vivo mostra esattamente quanti byte hai risparmiato.",
    ],
    steps: [
      "Incolla il tuo HTML nella casella di input.",
      "L'output minificato compare all'istante, con dimensioni di input/output e percentuale risparmiata.",
      "Copia l'HTML compatto o svuota l'input per minificarne un'altra pagina.",
    ],
    faqs: [
      {
        q: "La minificazione può rompere il mio HTML?",
        a: "Questo strumento prende la strada sicura: gli spazi dentro pre, textarea, script e style restano intatti, i vuoti tra elementi inline diventano uno spazio singolo, e vengono tolti solo i vuoti tra tag di blocco. I commenti scartati tranne quelli condizionali IE.",
      },
      {
        q: "Perché la percentuale risparmiata è più bassa di altri minificatori?",
        a: "Perché è prudente per costruzione — non unisce mai testo ai tag né toglie le virgolette. Ciò che rimuove (commenti, indentazione, spazi tra blocchi) è sempre sicuro per il rendering.",
      },
      {
        q: "Viene caricato qualcosa?",
        a: "No. Tutto gira in locale nel tuo browser; la pagina e il suo markup non lasciano mai il dispositivo.",
      },
    ],
  },
  "http-status-codes": {
    name: "Codici di stato HTTP",
    tagline:
      "Un riferimento ricercabile di 56 codici di stato HTTP raggruppati per classe, ognuno spiegato in una frase semplice — clicca su una riga per copiare il numero.",
    intro: [
      "Tutti i codici di stato importanti dal 100 Continue al 511 Network Authentication Required, raggruppati per classe e spiegati in una frase semplice: cosa è successo davvero sul filo e cosa fare dopo. I classici (200, 301, 404, 500) stanno accanto a quelli che sorprendono (207, 418, 451).",
      "La ricerca filtra dal vivo per numero o nome — scrivi 30 per atterrare su tutti i redirect, o «teapot» per chiudere una discussione. Cliccando una riga si copia solo il numero, pronto per il codice, la documentazione o un bug report.",
    ],
    steps: [
      "Scrivi un numero o un nome nella casella di ricerca, oppure sfoglia per classe.",
      "Leggi il significato in una riga — niente prosa da RFC, solo il senso pratico.",
      "Clicca su una riga per copiare il numero del codice all'istante.",
    ],
    faqs: [
      {
        q: "Qual è la differenza tra 301, 302 e 307?",
        a: "Tutti e tre reindirizzano, ma 301 è permanente (i motori di ricerca trasferiscono le posizioni) mentre 302/307 sono temporanei. Il 307 inoltre garantisce che metodo e corpo restino invariati — usalo quando un POST deve sopravvivere al redirect.",
      },
      {
        q: "Il 418 I'm a teapot è un codice di stato vero?",
        a: "Nacque come scherzone per il pesce d'aprile nell'RFC 2324 e in seguito fu elencato come riservato. Alcune API reali lo restituiscono per gioco o per limitare le richieste, e i browser lo gestiscono come qualunque errore 4xx.",
      },
      {
        q: "Perché 401 e 403 dicono entrambi che non posso entrare?",
        a: "Il 401 significa «chi sei?» — le credenziali mancano o sono sbagliate. Il 403 significa «so chi sei e ancora non puoi» — l'autenticazione è riuscita ma la risorsa è preclusa.",
      },
    ],
  },
  "javascript-minifier": {
    name: "Minificatore JavaScript",
    tagline:
      "Un minificatore JavaScript prudente: scarta i commenti e collassa le righe vuote, mantenendo le interruzioni di riga — nessuna riscrittura rischiosa, la semantica del tuo codice resta intatta.",
    intro: [
      "Questo minificatore fa esattamente due cose: toglie i commenti // e /* */ (perfino dentro file contorti — stringhe, template literal comprese le annidate ${…} e le espressioni regolari sono rispettate), e collassa le righe vuote e l'indentazione. Le interruzioni di riga tra istruzioni vengono preservate, quindi l'inserimento automatico del punto e virgola continua a funzionare esattamente come prima.",
      "Non rinominerà mai variabili, non inlina codice e non unisce istruzioni — quello è compito di un build tool completo. Ciò che ottieni è un file sensibilmente più piccolo e minificato in sicurezza, più una lettura del risparmio in byte dal vivo, tutto nel tuo browser.",
    ],
    steps: [
      "Incolla il tuo JavaScript nella casella di input.",
      "L'output minificato compare all'istante, con dimensioni di input/output e percentuale risparmiata.",
      "Copia lo script compatto o svuota l'input per minificarne un altro file.",
    ],
    faqs: [
      {
        q: "Perché mantiene le interruzioni di riga invece di unire tutto su una riga?",
        a: "Scelta deliberata. JavaScript si affida all'inserimento automatico del punto e virgola, e togliere le nuove righe può cambiare in silenzio ciò che un programma fa. Mantenere le interruzioni di riga rende questo minificatore sicuro per codice che non passa mai per un vero bundler.",
      },
      {
        q: "In cosa differisce da Terser o UglifyJS?",
        a: "Quelli analizzano e riscrivono l'AST: comprimono i nomi, tolgono il codice morto, inlinano. Output molto più piccolo, ma un vero passaggio di build. Questo strumento toglie solo commenti e righe vuote — zero rischio di cambi di comportamento, nessuna build richiesta.",
      },
      {
        q: "Il mio codice viene caricato da qualche parte?",
        a: "No. Tutto gira in locale nel tuo browser — il tuo sorgente non lascia mai il dispositivo.",
      },
    ],
  },
  "json-formatter": {
    name: "Formattatore JSON",
    tagline:
      "Formatta e sistema JSON disordinato online — 2 spazi, 4 spazi o tabulazioni, con validazione immediata e posizioni d'errore precise. 100% nel tuo browser.",
    intro: [
      "Incolla JSON minificato o mal indentato e ottieni subito un output pulito e leggibile. Scegli indentazione a 2 spazi, 4 spazi o tabulazione, e il risultato si aggiorna dal vivo mentre scrivi o modifichi — perfetto per ispezionare risposte API, file di configurazione e payload di log.",
      "Il JSON non valido non è un vicolo cieco: il formattatore individua la riga e la colonna esatte dell'errore di sintassi, così una virgola o una parentesi mancante si trova in secondi invece che in minuti.",
    ],
    steps: [
      "Incolla il tuo JSON nella casella di input.",
      "Scegli un'indentazione: 2 spazi, 4 spazi o tabulazione.",
      "Copia il risultato sistemato — oppure correggi la riga e la colonna segnalate se il JSON non è valido.",
    ],
    faqs: [
      {
        q: "C'è un limite di dimensione per il JSON da formattare?",
        a: "Nessun limite rigido — la formattazione avviene in locale nel tuo browser. I file molto grandi (decine di MB) possono sembrare lenti perché il risultato si ricalcola mentre scrivi, quindi incollali in una volta e modifica con cura.",
      },
      {
        q: "La formattazione cambia i miei dati?",
        a: "No. Valori, ordine delle chiavi e struttura restano esattamente gli stessi; vengono aggiunti solo spazi e interruzioni di riga. L'output è JSON equivalente byte per byte.",
      },
      {
        q: "Il mio JSON viene caricato su un server?",
        a: "No. Tutto gira in locale nel tuo browser con JavaScript — i tuoi dati non lasciano mai il dispositivo.",
      },
    ],
  },
  "json-minifier": {
    name: "Minificatore JSON",
    tagline:
      "Minifica JSON online: scarta ogni spazio bianco per alleggerire i payload, con risposte API più rapide e storage più compatto — guarda i byte esatti risparmiati, privatamente nel browser.",
    intro: [
      "Incolla JSON ben stampato e riavrai in tempo reale l'equivalente valido più compatto: ogni spazio, nuova riga e indentazione viene tolto senza toccare i tuoi dati. Una lettura delle dimensioni dal vivo mostra la dimensione originale, quella minificata e la percentuale risparmiata.",
      "Usalo per snellire risposte API, file di fixture, traduzioni e configurazioni JSON prima di spedirli o archiviarli. Se l'input non è JSON valido, lo strumento ti dice la riga e la colonna esatte del problema invece di fallire in silenzio.",
    ],
    steps: [
      "Incolla il tuo JSON formattato nella casella di input.",
      "L'output minificato su una riga compare all'istante, con il peso risparmiato mostrato qui sotto.",
      "Copia il risultato compatto o svuota l'input per ricominciare.",
    ],
    faqs: [
      {
        q: "Minificare il JSON cambia i dati?",
        a: "No. Gli spazi fuori dalle stringhe non hanno significato in JSON, quindi toglierli produce un documento equivalente con valori identici una volta analizzato.",
      },
      {
        q: "Quanto più piccolo diventerà il mio JSON?",
        a: "Dipende dall'indentazione che stai togliendo — i file molto indentati spesso si riducono del 30–60%. Lo strumento mostra la percentuale esatta per il tuo input.",
      },
      {
        q: "I miei dati vengono inviati da qualche parte?",
        a: "No. La minificazione gira interamente nel tuo browser — nulla viene caricato, registrato o salvato.",
      },
    ],
  },
  "json-to-csv": {
    name: "JSON in CSV",
    tagline:
      "Converte array JSON di oggetti in CSV con virgolette ed escape corretti — pronto per i fogli di calcolo in Excel, Sheets o per l'import in database. Tutto nel browser.",
    intro: [
      "Incolla un array JSON di oggetti e riavrai CSV all'istante. Le colonne sono l'unione di ogni chiave trovata tra le righe, i valori vengono messi in escape a libro — virgolette raddoppiate, campi racchiusi quando contengono virgole, virgolette o interruzioni di riga — quindi il risultato si apre pulito in Excel, Sheets o in qualsiasi importatore.",
      "Gli oggetti e gli array annidati vengono serializzati come stringhe JSON dentro la loro cella, i booleani e i numeri passano così come sono, e i null diventano celle vuote. Scegli virgola o punto e virgola come delimitatore per le impostazioni locali che lo richiedono.",
    ],
    steps: [
      "Incolla un array JSON di oggetti nella casella di input.",
      "Il CSV compare dal vivo — scegli virgola o punto e virgola se il tuo foglio di calcolo lo richiede.",
      "Copia il risultato direttamente in un file .csv o in una procedura guidata di import.",
    ],
    faqs: [
      {
        q: "E se le mie righe hanno chiavi diverse?",
        a: "Lo strumento costruisce l'elenco delle colonne da ogni chiave vista su tutte le righe; le righe a cui manca una colonna ricevono semplicemente una cella vuota. Di solito è ciò che vuoi con i dati reali, disordinati.",
      },
      {
        q: "Come vengono gestiti oggetti e array annidati?",
        a: "Vengono serializzati in una stringa JSON dentro la cella (con virgolette ed escape come qualunque altro valore). Appiattisci prima i dati se ti serve una colonna per ogni campo annidato.",
      },
      {
        q: "I miei dati vengono caricati da qualche parte?",
        a: "No. La conversione avviene in locale nel tuo browser — nulla lascia il tuo dispositivo.",
      },
    ],
  },
  "json-validator": {
    name: "Validatore JSON",
    tagline:
      "Valida il JSON all'istante con riga e colonna precise dell'errore. Becca virgole mancanti, chiavi non quotate, virgole finali ed escape sbagliati prima che rompano la tua app.",
    intro: [
      "Incolla qualsiasi documento JSON e capisci a colpo d'occhio se è valido. Il validatore è severo: segue lo standard JSON, quindi gli errori comuni come virgolette singole, virgole finali, chiavi non quotate e commenti vengono tutti segnalati.",
      "Quando qualcosa non va ottieni la riga e la colonna esatte più un motivo in italiano leggibile — non un messaggio criptico di una riga. L'input valido viene premiato con una versione ben stampata che puoi copiare subito.",
    ],
    steps: [
      "Incolla il tuo JSON nella casella di input.",
      "Uno stato verde compare se il JSON è valido; altrimenti vengono mostrati riga, colonna e motivo esatti.",
      "Correggi la posizione segnalata, o copia l'output ben stampato quando la validazione passa.",
    ],
    faqs: [
      {
        q: "Quali errori riesce a trovare il validatore?",
        a: "Tutti gli errori di sintassi JSON standard: virgole mancanti o di troppo, chiavi non quotate o tra virgolette singole, virgole finali, caratteri di controllo senza escape, escape non validi e contenuto vagante dopo il valore — ognuno segnalato con riga e colonna.",
      },
      {
        q: "Controlla anche lo schema o solo la sintassi?",
        a: "Solo la sintassi. Verifica che il documento sia JSON valido, non che i campi abbiano i tipi o i valori attesi — per quello serve un validatore di schema come JSON Schema.",
      },
      {
        q: "Il mio JSON viene caricato da qualche parte?",
        a: "No. La validazione avviene in locale nel tuo browser; nulla lascia il tuo dispositivo.",
      },
    ],
  },
  "jwt-decoder": {
    name: "Decodificatore JWT",
    tagline:
      "Decodifica i token JWT online: ispeziona le intestazioni e le claim del payload con i timestamp exp e iat leggibili. Solo decodifica — niente verifica o upload.",
    intro: [
      "Incolla un JSON Web Token e vedi all'istante le sue tre parti separatamente: l'header (algoritmo e tipo di token), il payload (le claim vere e proprie) e la firma. Entrambe le sezioni JSON sono ben stampate, e i timestamp come iat, nbf ed exp vengono tradotti in date comuni nella tua lingua, con exp marcato come scaduto o ancora attivo.",
      "Tutto viene decodificato in locale con Base64URL — il token non viene mai inviato da nessuna parte e mai verificato. Ricorda: decodificare mostra cosa dice un token, non cosa gli è permesso fare. La verifica della firma richiede sempre il segreto o la chiave pubblica su un sistema fidato.",
    ],
    steps: [
      "Incolla il JWT (le tre parti separate da punti) nella casella di input.",
      "Leggi header e payload ben stampati, con exp/iat mostrati come date vere.",
      "Sistema il token o la verifica lato server di conseguenza — copia il payload se serve.",
    ],
    faqs: [
      {
        q: "Decodificare un JWT lo verifica?",
        a: "No. Decodificare è solo Base64URL + analisi JSON e chiunque lo sappia fare — attaccanti compresi. Un token decodificato dall'aspetto valido non prova nulla. La verifica richiede di controllare la firma con il segreto (HMAC) o la chiave pubblica (RSA/EC), che richiede il materiale chiave di chi ha emesso il token.",
      },
      {
        q: "Si possono recuperare o cambiare le claim di un token?",
        a: "Le claim si possono leggere, ma non puoi falsificare un nuovo token con claim modificate senza invalidare la firma — qualsiasi modifica a header o payload rompe il controllo della firma sul server.",
      },
      {
        q: "È sicuro incollare qui un token vero?",
        a: "Il token viene decodificato interamente nel tuo browser e non lascia mai il tuo dispositivo — non esiste upload. Restano comunque credenziali: evita di incollare token di produzione dove non ti serve davvero.",
      },
    ],
  },
  "markdown-previewer": {
    name: "Anteprima Markdown",
    tagline:
      "Vedi il Markdown come HTML pulito e sanificato mentre scrivi — titoli, elenchi, tabelle, codice e link renderizzati dal vivo. Perfetto per README, documenti e commenti.",
    intro: [
      "Scrivi Markdown a sinistra e guarda la pagina renderizzata comparire a destra in tempo reale: titoli, enfasi, elenchi, tabelle, citazioni, elenchi di attività e blocchi di codice recintati, tutti renderizzati dal diffuso motore marked.",
      "L'HTML generato viene sanificato con una lista bianca rigorosa di tag e attributi prima della visualizzazione — script, gestori di eventi e URL javascript: vengono scartati — e puoi copiare l'HTML pulito per incollarlo in un blog, CMS o template email.",
    ],
    steps: [
      "Scrivi o incolla Markdown nel riquadro di sinistra.",
      "Guarda l'anteprima sanificata aggiornarsi a destra mentre scrivi.",
      "Copia l'HTML generato quando ti convince, o svuota per ricominciare.",
    ],
    faqs: [
      {
        q: "L'HTML mostrato in anteprima è sicuro?",
        a: "Sì. Prima che qualcosa si renderizzi, l'HTML passa per un sanificatore a lista bianca che rimuove tag script, gestori di eventi inline e link javascript:, conservando solo i tag di formattazione standard e URL di immagini/link sicuri.",
      },
      {
        q: "Quali funzionalità Markdown sono supportate?",
        a: "Tutto ciò che marked gestisce per default: tabelle in stile GitHub, barrato, elenchi di attività, autolink, codice recintato con etichette di sintassi ed elenchi annidati.",
      },
      {
        q: "Dove viene elaborato il mio testo?",
        a: "Interamente nel tuo browser — il Markdown non lascia mai il tuo dispositivo, nemmeno quando copi l'HTML generato.",
      },
    ],
  },
  "md5-generator": {
    name: "Generatore MD5",
    tagline:
      "Genera hash MD5 di qualsiasi testo o file all'istante nel browser — perfetto per checksum, chiavi di deduplica e integrazioni datate. A senso unico, mai caricato online.",
    intro: [
      "Scrivi del testo per vedere il suo digest MD5 a 128 bit dal vivo, oppure trascina un file per ricavarne l'impronta senza caricare un solo byte. L'hashing avviene in locale con un'implementazione JavaScript matura dell'algoritmo MD5.",
      "L'MD5 è ancora ovunque: checksum dei download, chiavi di deduplica dei file, cache buster, integrazioni con sistemi datati. Ricorda solo a cosa non serve — nonostante l'età, l'MD5 è crittograficamente rotto, quindi non usarlo mai per password, firme o qualsiasi cosa un attaccante possa manomettere.",
    ],
    steps: [
      "Scrivi o incolla il testo — il digest MD5 si aggiorna dal vivo.",
      "Oppure passa alla modalità File e trascina un file da hashare in locale.",
      "Copia il digest esadecimale e confrontalo con il checksum atteso.",
    ],
    faqs: [
      {
        q: "MD5 è sicuro per conservare le password?",
        a: "No — manco lontanamente. L'MD5 è veloce per costruzione e gli attacchi da collisione sono pratici, il che rende banale violare gli hash di password MD5. Usa uno schema dedicato all'hashing delle password come bcrypt, scrypt o Argon2.",
      },
      {
        q: "Per cosa è ancora buono l'MD5?",
        a: "Integrità senza avversari: verificare che un file sia sopravvissuto a un trasferimento, deduplicare contenuti, chiavi di cache e parlare con sistemi datati che lo si aspettano. Per i controlli legati alla sicurezza usa SHA-256 o meglio.",
      },
      {
        q: "Il mio testo e i miei file vengono inviati a un server?",
        a: "No. Tutto gira nel tuo browser; perfino i file vengono letti e hashati interamente sul tuo dispositivo.",
      },
    ],
  },
  "regex-tester": {
    name: "Tester regex",
    tagline:
      "Prova le espressioni regolari dal vivo: evidenzia ogni corrispondenza mentre scrivi, ispeziona i gruppi di cattura e metti a punto i pattern per JavaScript, con i flag comuni a un clic.",
    intro: [
      "Scrivi un pattern, attiva i flag che ti servono (global, case-insensitive, multiline, dotAll, unicode) e incolla la stringa di prova — ogni corrispondenza viene evidenziata sul posto mentre un elenco qui sotto mostra ogni match con il suo indice e i gruppi di cattura, gruppi nominati compresi.",
      "I pattern non validi vengono segnalati subito con il messaggio del parser stesso invece di una pagina rotta, e le corrispondenze a lunghezza zero sono gestite in sicurezza, quindi pattern come a* si comportano come farebbero nel tuo runtime.",
    ],
    steps: [
      "Scrivi la tua espressione regolare nel campo pattern.",
      "Attiva i flag (g, i, m, s, u) e incolla la stringa di prova.",
      "Leggi le corrispondenze evidenziate e l'elenco dei gruppi; aggiusta il pattern finché non cattura esattamente ciò che ti serve.",
    ],
    faqs: [
      {
        q: "Quale dialetto regex usa?",
        a: "RegExp di JavaScript (ECMAScript) — lo stesso motore che gira nel tuo browser e in Node. I pattern per PCRE, Python o Java di solito sono compatibili, ma lookahead/lookbehind e gestione Unicode possono differire un po'.",
      },
      {
        q: "Perché il mio pattern matcha posizioni vuote strane?",
        a: "I pattern che possono matchare una stringa vuota (come a* o (?:)?) producono corrispondenze a lunghezza zero. Il tester avanza di un carattere dopo ciascuna, esattamente come fa l'iterazione nativa di JavaScript.",
      },
      {
        q: "I miei dati di prova vengono inviati da qualche parte?",
        a: "No. Il matching gira dal vivo nel tuo browser — nulla viene caricato o salvato.",
      },
    ],
  },
  "sha256-generator": {
    name: "Generatore SHA-256",
    tagline:
      "Calcola hash SHA-256 di testo o file online con il WebCrypto nativo — la scelta standard per controlli d'integrità e impronte. 100% sul client.",
    intro: [
      "Scrivi del testo per vedere il digest SHA-256 a 256 bit comparire dal vivo, oppure trascina un file per ricavarne l'impronta su gigabyte senza caricare nulla. L'hash viene calcolato dall'implementazione WebCrypto del browser stesso — lo stesso codice in cui il tuo sistema operativo e lo stack TLS si fidano.",
      "SHA-256 è oggi il default per verificare download, firmare artefatti, deduplicare contenuti, costruire storage indirizzato al contenuto e il lavoro blockchain. Copia il digest esadecimale con un clic e confrontalo con il checksum che ti ha dato chi pubblica.",
    ],
    steps: [
      "Scrivi o incolla il testo — il digest si aggiorna mentre scrivi.",
      "Oppure passa alla modalità File e trascina un file da hashare in locale.",
      "Copia il digest esadecimale e confrontalo con il valore atteso.",
    ],
    faqs: [
      {
        q: "SHA-256 è sicuro?",
        a: "Sì — SHA-256 fa parte della famiglia SHA-2 e resta indistrutto dopo due decenni di analisi. È il digest alla base dei certificati TLS, di Bitcoin e della verifica della maggior parte delle release software.",
      },
      {
        q: "Perché lo stesso input dà sempre lo stesso hash?",
        a: "Perché SHA-256 è deterministico: byte identici producono sempre un digest identico. Questa proprietà è esattamente ciò che rende funzionate il confronto dei checksum — un byte cambiato ovunque cambia l'intero digest.",
      },
      {
        q: "Il mio testo e i miei file vengono caricati?",
        a: "No. L'hashing gira in locale nel tuo browser con WebCrypto — i tuoi dati non lasciano mai il dispositivo.",
      },
    ],
  },
  "sql-formatter": {
    name: "Formattatore SQL",
    tagline:
      "Formatta SQL online con maiuscole delle parole chiave e indentazione coerenti — trasforma SELECT lunghe, JOIN e procedure memorizzate in codice leggibile, nel tuo browser.",
    intro: [
      "Incolla una query densa su una riga e riavrai all'istante SQL ben strutturato: le clausole vanno a capo su righe proprie, le espressioni annidate si indentano con costanza, e le parole chiave diventano maiuscole per scorrerle a occhio. Alimentato dal motore sql-formatter, quindi le regole sono le stesse su cui contano i team veri.",
      "Perfetto per rileggere le query generate, fare debug dell'output degli ORM, documentare procedure memorizzate o districare una clausola WHERE da 40 righe lasciata in un commento.",
    ],
    steps: [
      "Incolla il tuo SQL nella casella di input.",
      "La query formattata compare mentre scrivi, con parole chiave in maiuscolo e clausole allineate.",
      "Copia l'SQL leggibile o svuota l'input per formattarne un'altra query.",
    ],
    faqs: [
      {
        q: "Quali dialetti SQL sono supportati?",
        a: "La formattazione funziona sull'SQL standard, e il motore sottostante capisce anche la sintassi specifica di PostgreSQL, MySQL, T-SQL, PL/SQL, BigQuery, Snowflake e altri — le strutture comuni si formattano correttamente ovunque.",
      },
      {
        q: "La formattazione cambia ciò che la query fa?",
        a: "No. Cambiano solo spazi bianchi e maiuscole delle parole chiave. I letterali stringa e gli identificatori quotati sono preservati esattamente, quindi la query è semanticamente identica.",
      },
      {
        q: "La mia query viene inviata a un server?",
        a: "No. La formattazione gira in locale nel tuo browser — il tuo SQL non lascia mai il dispositivo.",
      },
    ],
  },
  "url-decoder": {
    name: "Decodificatore URL",
    tagline:
      "Decodifica gli URL codificati in percentuale in testo leggibile — %20, %2F e i valori delle query string diventano chiari all'istante. Gestisce + come spazio, tutto nel tuo browser.",
    intro: [
      "Incolla un URL, un parametro o un segmento di percorso codificato e leggi subito il testo originale. Due modalità per i due codificatori: decodifica componente (decodeURIComponent) per un singolo valore, e decodifica URI completa (decodeURI) per un URL intero.",
      "Un interruttore comodo in più tratta + come spazio, che è ciò che le query string codificate da form (application/x-www-form-urlencoded) intendono davvero — così i parametri di ricerca come ciao+mondo si decodificano in «ciao mondo» invece di restare letterali.",
    ],
    steps: [
      "Incolla la stringa o l'URL codificato in percentuale.",
      "Scegli la decodifica componente per i valori, o quella URI completa per gli URL interi.",
      "Attiva + come spazio per le query string in stile form, poi copia il testo decodificato.",
    ],
    faqs: [
      {
        q: "Perché a volte ottengo un errore decodificando?",
        a: "Un % singolo non seguito da due cifre esadecimali, o una sequenza di escape troncata come %E4%BD, è una codifica percentuale non valida — il decodificatore lo segnala invece di tirare a indovinare.",
      },
      {
        q: "Devo attivare l'opzione + come spazio?",
        a: "Per i valori estratti da un invio di form HTML o dalle query string di molti framework web, sì. Per gli URL standard codificati in percentuale che contengono caratteri + veri, lasciala spenta.",
      },
      {
        q: "Viene caricato qualcosa?",
        a: "No. La decodifica gira in locale nel tuo browser — nulla lascia il tuo dispositivo.",
      },
    ],
  },
  "url-encoder": {
    name: "Codificatore URL",
    tagline:
      "Codifica in percentuale URL e query string online — scegli la codifica componente o URI completa, con output dal vivo per link, parametri e segmenti di percorso.",
    intro: [
      "Incolla qualsiasi testo o URL e vedi il risultato codificato in percentuale dal vivo. Due modalità coprono i due casi reali: la codifica componente (encodeURIComponent) mette in escape ogni carattere riservato per un singolo valore di parametro, mentre la codifica URI completa (encodeURI) mantiene la struttura dell'URL — :, /, ? e & — intatta.",
      "Indispensabile quando costruisci query string a mano, incorpori URL dentro altri URL, generi link mailto o passi valori con spazi, e commerciali e caratteri non latini attraverso parametri GET.",
    ],
    steps: [
      "Incolla il testo, il valore del parametro o l'URL da codificare.",
      "Scegli la codifica componente per un valore, o URI completa per mantenere la struttura dell'URL.",
      "Copia il risultato codificato direttamente nel tuo link o nella tua richiesta.",
    ],
    faqs: [
      {
        q: "Quando conviene encodeURIComponent invece di encodeURI?",
        a: "Usa encodeURIComponent per i singoli valori che inserisci in un URL — mette in escape &, =, ?, / e altri, così un valore non può rompere mai la query string. Usa encodeURI solo per un URL completo che vuoi rendere trasportabile mantenendone la struttura.",
      },
      {
        q: "Perché gli spazi diventano %20 e non +?",
        a: "%20 è la codifica percentuale standard dello spazio; la scorciatoia + è una convenzione di codifica dei form gestita a parte da application/x-www-form-urlencoded. Questo strumento usa lo standard %20.",
      },
      {
        q: "Gestisce i caratteri non latini?",
        a: "Sì — i caratteri fuori da ASCII vengono prima codificati UTF-8, poi in percentuale, esattamente come fanno i browser.",
      },
    ],
  },
  "url-parser": {
    name: "Parser URL",
    tagline:
      "Incolla qualsiasi URL e vedi scomposto dal vivo: protocollo, host, porta, ogni segmento di percorso, parametri della query decodificati e hash — con copia come JSON.",
    intro: [
      "Un URL nasconde una dozzina di dati in una sola riga. Questo strumento lo spezza in righe etichettate — schema, host, porta, ogni segmento di percorso su una riga propria, ogni parametro della query con la sua chiave e il valore decodificato, più il frammento — così puoi auditare link di tracciamento, fare debug del routing o ricostruire a ritroso una chiamata API.",
      "L'analisi usa l'API URL nativa del browser: i valori vengono decodificati esattamente come li decodificherà il server che li riceve. Gli URL senza schema ricevono https:// per assunto, e l'input malformato riceve un errore in italiano semplice invece di un crash.",
    ],
    steps: [
      "Incolla l'URL nella casella di input.",
      "Leggi la tabella scomposta: parti, segmenti e parametri si aggiornano dal vivo.",
      "Copia come JSON quando ti serve lo smontaggio nel codice o nella documentazione.",
    ],
    faqs: [
      {
        q: "Cosa succede se incollo un URL senza https://?",
        a: "Lo strumento assume https:// e riprova, visto che è ciò che fanno i browser per i domini nudi. Uno schema scritto esplicitamente viene sempre mantenuto così com'è.",
      },
      {
        q: "I valori della query vengono decodificati?",
        a: "Sì. Chiavi e valori vengono decodificati secondo lo standard URL, così %20 diventa uno spazio e %2F una barra, esattamente come li leggerebbe il server.",
      },
      {
        q: "E le chiavi duplicate nella query come ?tag=a&tag=b?",
        a: "Ogni occorrenza ha la sua riga, e l'esportazione JSON le elenca come coppie chiave/valore separate così nulla viene sovrascritto in silenzio.",
      },
    ],
  },
  "uuid-generator": {
    name: "Generatore UUID",
    tagline:
      "Genera identificatori UUID v4 casuali in blocco con un clic — da 1 a 500 alla volta, con la casualità crittografica del tuo browser. Gratis, istantaneo, funziona offline.",
    intro: [
      "Crea UUID versione 4 RFC 4122 nella quantità che ti serve: fixture di test, semi per database, nomi di file, ID di richieste o bozze di chiavi API. Ogni identificatore nasce da crypto.randomUUID, la sorgente casuale crittograficamente sicura del browser — 122 bit casuali, probabilità di collisione che non incontrerai mai in pratica.",
      "A differenza delle versioni basate sul tempo (v1/v6/v7), la v4 non porta alcun timestamp e non trapela nulla su quando o dove è stata creata — la pagina te lo dice esplicitamente, insieme al momento in cui il tuo lotto è stato generato.",
    ],
    steps: [
      "Imposta quanti UUID ti servono (1–500).",
      "Clicca su Genera — l'elenco compare all'istante.",
      "Copiali tutti in una volta, o svuota e genera un lotto fresco.",
    ],
    faqs: [
      {
        q: "Due UUID generati possono collidere?",
        a: "Teoricamente sì, praticamente no. Con 122 bit casuali, produrre una collisione richiede circa 10^36 UUID — ben oltre qualsiasi carico di lavoro realistico.",
      },
      {
        q: "Perché scegliere la v4 invece della UUID v1 o v7?",
        a: "La v4 non trapela informazioni su tempi o hardware e non ha bisogno di orologio o indirizzo MAC. Se ti servono ID amichevoli per gli indici del database e ordinabili nel tempo, guarda alla v7 — ma per la semplice unicità, la v4 è la scelta standard.",
      },
      {
        q: "Gli UUID vengono generati su un server?",
        a: "No. Nascono dal generatore casuale crittografico del tuo stesso browser e non lasciano mai il tuo dispositivo.",
      },
    ],
  },
  "xml-formatter": {
    name: "Formattatore XML",
    tagline:
      "Sistema l'XML online con indentazione pulita a 2 spazi — sitemap, feed RSS, buste SOAP e file di configurazione tornano leggibili, direttamente nel tuo browser.",
    intro: [
      "Incolla XML ingarbugliato o su una riga e ottieni all'istante un documento indentato a dovere. Gli elementi si annidano con indentazione coerente a 2 spazi, i contenuti testuali brevi restano su una riga con i loro tag, e commenti, sezioni CDATA, istruzioni di elaborazione e dichiarazioni DOCTYPE vengono preservati.",
      "Ideale per leggere sitemap.xml, feed RSS/Atom, layout Android, pom Maven, risposte SOAP e infinite altre configurazioni — senza installare un plugin per l'editor.",
    ],
    steps: [
      "Incolla il tuo XML nella casella di input.",
      "Il documento formattato compare immediatamente mentre scrivi.",
      "Copia l'XML sistemato o svuota l'input per provare un altro file.",
    ],
    faqs: [
      {
        q: "La formattazione cambia i miei dati XML?",
        a: "Gli spazi tra gli elementi vengono normalizzati per rendere leggibile la struttura, cosa sicura per praticamente tutto l'XML reale. Gli spazi dentro i contenuti testuali vengono preservati (rifiniti ai bordi), e le sezioni CDATA restano byte per byte.",
      },
      {
        q: "Gestisce file XML grandi?",
        a: "Sì, nei limiti del ragionevole — la formattazione è un singolo passaggio rapido e gira in locale, ma documenti da diversi megabyte possono impiegare un attimo sui dispositivi lenti.",
      },
      {
        q: "Il mio XML viene caricato su un server?",
        a: "No. La formattazione avviene interamente nel tuo browser; nulla viene inviato da nessuna parte.",
      },
    ],
  },
  "xml-validator": {
    name: "Validatore XML",
    tagline:
      "Controlla la ben-formatezza dell'XML in tempo reale: tag non abbinati, attributi rotti ed entità non valide vengono segnalati nell'istante in cui incolli. Nessun upload.",
    intro: [
      "Il validatore usa il parser XML integrato del browser, quindi impone esattamente le regole che impone la vera strumentazione XML: ogni tag deve chiudersi, gli attributi devono essere quotati, le entità devono essere valide, e deve esserci esattamente un elemento radice.",
      "L'XML ben formato ottiene uno stato verde più un'anteprima ben stampata; i problemi compaiono con la descrizione d'errore del parser stesso, che individua il costrutto colpevole — utile prima di dare feed, sitemap o payload SOAP a consumatori schizzinosi.",
    ],
    steps: [
      "Incolla il tuo XML nella casella di input.",
      "Uno stato verde compare se l'XML è ben formato; altrimenti viene mostrato l'errore del parser.",
      "Correggi il problema segnalato, o copia l'anteprima formattata quando passa.",
    ],
    faqs: [
      {
        q: "Valida contro uno schema DTD o XSD?",
        a: "No — controlla solo la ben-formatezza (struttura, virgolette, entità, radice unica). La validazione dello schema richiede uno strumento dedicato con il tuo XSD o DTD.",
      },
      {
        q: "Cosa conta come errore XML qui?",
        a: "Tag non chiusi o non abbinati, attributi senza virgolette, attributi duplicati, riferimenti a entità non validi, radici multiple e caratteri illegali vengono tutti respinti.",
      },
      {
        q: "Il mio XML viene inviato da qualche parte?",
        a: "No. Il controllo gira nel tuo browser con il DOMParser nativo — i tuoi dati non lasciano mai il dispositivo.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* SEO                                                                 */
  /* ------------------------------------------------------------------ */
  "canonical-tag-generator": {
    name: "Generatore di tag canonical",
    tagline:
      "Genera un tag link rel=canonical corretto e scopri come normalizzare gli URL così i motori di ricerca indicizzano l'unica versione che vuoi.",
    intro: [
      "Un tag canonical dice ai motori di ricerca quale URL indicizzare quando lo stesso contenuto è raggiungibile a più indirizzi — con e senza barra finale, con query string, parametri UTM, varianti http/https o www. Fatto bene, consolida gli URL duplicati in un solo segnale di posizionamento invece di spalmarlo.",
      "Inserisci l'URL assoluto della versione preferita e copia il tag nel <head> di quella pagina. La checklist copre i dettagli di normalizzazione che la maggior parte delle implementazioni sbaglia.",
    ],
    steps: [
      "Scegli un solo formato di URL canonical per tutto il sito: https, host con o senza www, barra finale o no.",
      "Incolla l'URL assoluto della versione preferita della pagina.",
      "Copia il tag link nel <head> della pagina e verificalo con lo strumento di ispezione URL.",
    ],
    faqs: [
      {
        q: "Che cosa fa davvero un tag canonical?",
        a: "Consolida i duplicati: i segnali provenienti dagli URL alternativi — copie con UTM, ordinamenti con parametri, viste di stampa — vengono fusi nell'URL canonical, così è lui a posizionarsi invece che l'autorevolezza dividersi tra i duplicati.",
      },
      {
        q: "Ogni pagina deve avere un canonical autoreferenziale?",
        a: "Sì, è il default raccomandato. Perfino le pagine uniche dovrebbero dichiarare come canonical il proprio URL, a tutela contro varianti di parametri, barra finale e maiuscole che non hai ancora notato.",
      },
      {
        q: "Canonical, noindex o redirect — quale scegliere?",
        a: "Usa un redirect 301 quando il duplicato deve mandare gli utenti altrove, noindex quando deve restare accessibile ma fuori dai risultati, e canonical quando entrambe le versioni devono rimanere vive e scansionabili.",
      },
    ],
  },
  "hreflang-generator": {
    name: "Generatore hreflang",
    tagline:
      "Costruisce un cluster completo di link hreflang — un link per lingua più x-default — a partire dai tuoi URL tradotti, coerente e bidirezionale.",
    intro: [
      "hreflang dice ai motori di ricerca quale URL servire a chi parla ciascuna lingua, il che impedisce alle traduzioni quasi duplicate di farsi concorrenza. I cluster sono bidirezionali: ogni pagina localizzata deve restituire l'insieme completo, inclusa la citazione di se stessa.",
      "Inserisci l'URL di ogni versione linguistica e il generatore emette l'intero cluster <link rel=\"alternate\"> più x-default, che dovrebbe puntare al tuo selettore di lingua o alla homepage in lingua predefinita.",
    ],
    steps: [
      "Incolla l'URL assoluto di ogni versione tradotta; lascia in bianco le lingue che non hai.",
      "Imposta l'URL x-default — il tuo selettore di lingua o la homepage predefinita.",
      "Copia il cluster nel <head> di ogni pagina dell'insieme.",
    ],
    faqs: [
      {
        q: "Ogni pagina ha bisogno dell'intero set hreflang?",
        a: "Sì. I cluster devono essere reciproci: la pagina A elenca la pagina B e se stessa, e la B elenca la A e se stessa. Un cluster con membri mancanti viene ignorato in parte, e lo sforzo va sprecato.",
      },
      {
        q: "Devo usare zh o zh-Hans?",
        a: "Meglio zh-Hans per il semplificato e zh-Hant per il tradizionale; un zh nudo lascia la scrittura indefinita. I sottotag di regione come pt-BR sono facoltativi — mira prima alla lingua e aggiungi una regione solo quando i contenuti differiscono davvero, come pt-BR rispetto a pt-PT.",
      },
      {
        q: "hreflang sostituisce un tag canonical?",
        a: "No. Ogni versione linguistica continua a servirsene di un canonical autoreferenziale. hreflang sceglie tra pagine tradotte equivalenti; il canonical risolve i duplicati dentro una sola lingua.",
      },
    ],
  },
  "keyword-density-checker": {
    name: "Verifica densità parole chiave",
    tagline:
      "Conta le frasi chiave di 1–3 parole e la loro densità, con liste integrate di stopword per inglese, cinese, giapponese, spagnolo e portoghese.",
    intro: [
      "La densità delle parole chiave è la quota di volte in cui una frase compare tra tutte le parole della pagina. Questo strumento analizza il testo, toglie le stopword per lingua e riporta conteggi e densità per frasi di una, due e tre parole — dal vivo, mentre incolli o modifichi.",
      "Usalo per confermare che la pagina dica davvero ciò per cui vuoi posizionarti, non per inseguire una percentuale magica. Una copia che legge naturale coprendo il tema batte qualsiasi rapporto fisso.",
    ],
    steps: [
      "Incolla il testo della pagina o una bozza nella casella di input.",
      "Scegli la lingua dei contenuti e se escludere le stopword.",
      "Leggi conteggi e densità per le frasi di 1–3 parole, o cerca per controllare un termine specifico.",
    ],
    faqs: [
      {
        q: "Che densità di parole chiave conviene puntare?",
        a: "Non esiste un obiettivo. I sistemi di posizionamento moderni usano embedding e modelli di tema, non soglie di densità. Se le frasi principali rispecchiano il tema della pagina in linguaggio naturale — circa 1–2% per il termine principale — sei a posto.",
      },
      {
        q: "Le stopword vengono tolte prima del conteggio?",
        a: "Solo se lo attivi. Toglierle trasforma «hotel in london» nel bigramma «hotel london», che spesso è come la gente cerca davvero. Confronta entrambe le viste prima di decidere.",
      },
      {
        q: "Come vengono contati cinese e giapponese?",
        a: "Senza un vero segmentatore, il testo CJK viene contato per carattere per i token singoli e per coppia di caratteri per le frasi di due parole — una buona approssimazione per scovare i termini strausati, non un'analisi linguistica.",
      },
    ],
  },
  "meta-tag-generator": {
    name: "Generatore di meta tag",
    tagline:
      "Genera meta tag title, description, keywords, robots e viewport con output HTML dal vivo da incollare direttamente nel tuo <head>.",
    intro: [
      "I meta tag sono la prima cosa che leggono i crawler: il tag title è un segnale di posizionamento, e la meta description diventa il tuo snippet ogni volta che Google non la riscrive. Questo generatore costruisce un insieme pulito e valido — title, description, keywords, robots, viewport, author più un link canonical facoltativo — mentre scrivi.",
      "Ogni valore di attributo viene messo in escape HTML, così virgolette ed e commerciali non possono rompere il tuo markup. Copia il blocco nel template o nella sezione head del CMS e adattalo pagina per pagina.",
    ],
    steps: [
      "Compila il titolo della pagina (punta a 50–60 caratteri) e la meta descrizione (fino a ~160).",
      "Imposta robots, viewport e author al bisogno — i campi lasciati vuoti vengono omessi dall'output.",
      "Copia lo snippet <head> generato e incollalo nel template della tua pagina.",
    ],
    faqs: [
      {
        q: "Quanto deve essere lungo un tag title?",
        a: "Punta a circa 50–60 caratteri, all'incirca 580 pixel alla dimensione di font con cui Google renderizza. I titoli più lunghi vengono tagliati con i puntini di sospensione nei risultati — lo strumento di anteprima SERP mostra esattamente dove cade il taglio.",
      },
      {
        q: "I meta keywords servono ancora?",
        a: "Google ignora il tag meta keywords dal 2009, e Bing può considerarlo un segnale di spam. Compilalo solo quando un motore di nicchia o una piattaforma di ricerca interna lo richiede esplicitamente.",
      },
      {
        q: "Cosa controlla il meta tag robots?",
        a: "index/noindex decide se la pagina può comparire nei risultati; follow/nofollow se i suoi link passano autorevolezza. Deve stare nella pagina stessa — robots.txt non può noindexare nulla.",
      },
    ],
  },
  "open-graph-generator": {
    name: "Generatore Open Graph",
    tagline:
      "Costruisce l'intero set di meta tag og: e twitter: e guarda l'anteprima della scheda di condivisione aggiornarsi dal vivo prima di incollare qualsiasi cosa.",
    intro: [
      "Quando il tuo link viene condiviso su X, Facebook, LinkedIn, Slack o iMessage, la scheda di anteprima si costruisce quasi interamente dai tag Open Graph, con i tag Twitter card a colmare le lacune. Questo generatore emette entrambi i namespace: og:title, og:type, og:url, og:image, og:image:alt, og:site_name, og:description e og:locale, più twitter:card, twitter:site e twitter:creator.",
      "La maggior parte delle piattaforme ricade sui tag og: quando manca un tag twitter:, quindi gli extra servono solo dove differiscono. L'anteprima dal vivo approssima come si renderizza una scheda a immagine grande o a riepilogo.",
    ],
    steps: [
      "Inserisci titolo, descrizione e URL canonical della pagina.",
      "Aggiungi l'URL dell'immagine di condivisione (1200 × 630 px funziona ovunque) e imposta il tipo di scheda.",
      "Copia i tag nel tuo <head> e controlla la scheda di anteprima.",
    ],
    faqs: [
      {
        q: "Che dimensione immagine usare per og:image?",
        a: "1200 × 630 pixel (1,91:1) è il default sicuro su Facebook, X e LinkedIn. Tieni il file sotto gli 8 MB, usa un URL assoluto e aggiungi sempre og:image:alt per l'accessibilità.",
      },
      {
        q: "Mi servono sia i tag og: sia i twitter:?",
        a: "twitter:title, twitter:description e twitter:image ricadono sugli equivalenti og:. Oltre al set og: ti servono solo twitter:card (summary o summary_large_image), twitter:site e, facoltativamente, twitter:creator.",
      },
      {
        q: "Quale og:type scegliere?",
        a: "Usa website per homepage e pagine generiche, article per notizie e post di blog (aggiungi article:published_time se puoi), e product per le schede di e-commerce. Il tipo cambia come alcune piattaforme categorizzano il link.",
      },
    ],
  },
  "robots-txt-generator": {
    name: "Generatore robots.txt",
    tagline:
      "Costruisce un robots.txt con liste di blocco o permesso per i crawler AI, regole per singolo bot, crawl-delay e direttive sitemap — poi copia o scarica.",
    intro: [
      "robots.txt controlla l'accesso dei crawler prima ancora che una pagina venga richiesta. Oltre alle regole classiche User-agent: *, ora puoi decidere bot per bot: permetti ai crawler legati alla ricerca come OAI-SearchBot e PerplexityBot, blocca i crawler di addestramento come GPTBot, ClaudeBot, Google-Extended, CCBot e Bytespider, o mischia una politica tutta tua.",
      "Il generatore raggruppa gli user-agent che condividono una regola, aggiunge il crawl-delay dove viene onorato e accoda la direttiva sitemap. Copia il file nella radice del dominio, in /robots.txt, e verificalo nel report robots di Search Console.",
    ],
    steps: [
      "Scegli un preset: permetti tutto, blocca i bot di addestramento AI o blocca tutto.",
      "Regola ogni crawler AI con Permetti, Blocca o nessuna regola, e aggiungi percorsi Disallow per User-agent: *.",
      "Aggiungi l'URL della sitemap, poi copia o scarica il file nella radice del sito.",
    ],
    faqs: [
      {
        q: "robots.txt è un controllo di sicurezza?",
        a: "No. È consultivo: i crawler conformi lo obbediscono, ma chiunque può leggerlo — e pubblicizza i tuoi percorsi privati. Proteggi le aree sensibili con l'autenticazione; non fare mai affidamento su Disallow per la sicurezza.",
      },
      {
        q: "I crawler AI rispettano davvero robots.txt?",
        a: "I principali documentati — GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot — dichiarano il supporto a robots.txt, ma la conformità è volontaria e varia per gestore. Per garanzie forti, blocca al livello CDN o firewall.",
      },
      {
        q: "Perché la mia pagina resta indicizzata dopo il Disallow?",
        a: "Bloccare la scansione non è bloccare l'indicizzazione: se altre pagine linkano l'URL, Google può indicizzarlo comunque senza il contenuto. Per togliere una pagina dai risultati, permetti la scansione e usa un meta tag noindex.",
      },
    ],
  },
  "schema-markup-generator": {
    name: "Generatore di markup Schema",
    tagline:
      "Genera dati strutturati JSON-LD validi per Organization, LocalBusiness, Product, Article, FAQPage e HowTo — in escape e pronti da incollare.",
    intro: [
      "I dati strutturati aiutano i motori di ricerca a capire le entità di una pagina: chi la pubblica, quanto costa il prodotto, quali domande risponde. Questo generatore costruisce JSON-LD per sei dei tipi schema.org più usati, lascia fuori i campi vuoti e mette l'output in escape così è al sicuro dentro un tag <script>.",
      "Scegli il tipo che corrisponde alla pagina, compila i campi e incolla il blocco nel head o nel body. Passalo sempre in un validatore di rich results prima di spedirlo — un markup che si analizza ma viola le linee guida può valere un'azione manuale.",
    ],
    steps: [
      "Scegli il tipo di schema che corrisponde alla pagina.",
      "Compila i campi — per FAQPage e HowTo puoi aggiungere e togliere righe di domande o passi.",
      "Copia il blocco JSON-LD nella pagina, poi passalo nel Rich Results Test di Google.",
    ],
    faqs: [
      {
        q: "I rich results FAQ esistono ancora?",
        a: "Google ora mostra i rich results FAQ quasi solo per siti governativi e sanitari noti. Il markup vale comunque la pena pubblicare: i motori di risposta e le AI Overviews leggono i dati FAQPage quando cercano le risposte, e altri motori lo onorano ancora.",
      },
      {
        q: "JSON-LD o Microdata — quale formato?",
        a: "JSON-LD è il formato raccomandato da Google: un blocco script, nessuna modifica ai tuoi elementi HTML, più facile da generare e mantenere. Il Microdata arriva allo stesso risultato ma è intrecciato al tuo markup.",
      },
      {
        q: "Dati strutturati validi garantiscono i rich results?",
        a: "No. La validità rende la pagina idonea a una funzionalità; Google decide per query e per superficie se mostrarla. Non promettere mai stelle o breadcrumb nei report basandoti solo sul markup.",
      },
    ],
  },
  "serp-preview": {
    name: "Anteprima SERP",
    tagline:
      "Vedi in anteprima il tuo snippet Google su desktop e mobile con troncamento al pixel e indicatori di lunghezza per titolo e descrizione.",
    intro: [
      "Google tronca titoli e descrizioni in base alla larghezza misurata in pixel, non al numero di caratteri — un titolo pieno di lettere larghe si taglia prima dello stesso numero di lettere strette. Questa anteprima misura il tuo testo come fa la pagina dei risultati e lo taglia esattamente dove lo taglierebbe Google.",
      "Passa tra i budget in pixel di desktop e mobile, guarda gli indicatori e sistema la copia finché l'intero messaggio sopravvive al taglio.",
    ],
    steps: [
      "Inserisci il tag title, la meta descrizione e l'URL della pagina.",
      "Passa da desktop a mobile per confrontare i punti di troncamento.",
      "Sistema la copia finché titolo e descrizione rientrano nel budget in pixel.",
    ],
    faqs: [
      {
        q: "Quanto può essere lungo un titolo prima che Google lo tagli?",
        a: "Circa 580–600 pixel su desktop, tipicamente 50–60 caratteri; il mobile concede un po' più di larghezza. La misura in pixel è il limite vero — i conteggi di caratteri sono solo una guida approssimativa perché le lettere differiscono in larghezza.",
      },
      {
        q: "Google mostrerà sempre la mia meta descrizione?",
        a: "No. Google riscrive le descrizioni per una buona quota di query, di solito per rispecchiare i termini cercati. Una descrizione accurata e specifica alza le probabilità che la tua venga usata alla lettera.",
      },
      {
        q: "Perché Google sostituirebbe il mio titolo?",
        a: "Quando pensa che un'altra stringa si adatti meglio alla query, Google può sostituire con l'H1, il testo d'ancora dei link interni o il nome del sito. L'anteprima mostra il caso migliore: i tuoi tag, invariati.",
      },
    ],
  },
  "sitemap-generator": {
    name: "Generatore sitemap XML",
    tagline:
      "Incolla un elenco di URL e ottieni un sitemap.xml valido con lastmod, changefreq e priority per sezione — deduplicato e pronto da presentare.",
    intro: [
      "Una sitemap dice ai motori di ricerca quali URL esistono e quando sono cambiati l'ultima volta. Incolla il tuo elenco — da un'esportazione di crawler, CMS o foglio di calcolo — e il generatore deduplica le voci, le raggruppa per primo segmento di percorso e ti lascia impostare changefreq e priority per gruppo mantenendo il file valido per il protocollo.",
      "L'XML segue il protocollo 0.9 di sitemaps.org che Google, Bing e Yandex accettano. Scarica il file, mettilo in /sitemap.xml e richiamalo da robots.txt oppure presentalo direttamente in Search Console.",
    ],
    steps: [
      "Incolla un URL assoluto per riga — fino al limite di 50.000 URL / 50 MB per file.",
      "Imposta la gestione di lastmod e aggiusta changefreq e priority per sezione dove ha senso.",
      "Scarica sitemap.xml, caricane una copia nella radice del dominio e presentala in Search Console.",
    ],
    faqs: [
      {
        q: "changefreq e priority contano ancora?",
        a: "Google li ignora entrambi e usa la sua programmazione; lastmod è l'unico tag con un effetto documentato, e solo quando è accurato. Imposta gli altri se vuoi un file completo, ma spendi l'impegno su valori lastmod veritieri.",
      },
      {
        q: "Quale valore lastmod usare?",
        a: "La data dell'ultimo cambiamento sostanziale del contenuto della pagina, in formato W3C Datetime (YYYY-MM-DD va bene). Copiare la data di oggi su ogni URL insegna a Google a diffidare del tuo lastmod.",
      },
      {
        q: "Quanto può essere grande una sitemap?",
        a: "50.000 URL o 50 MB non compressi per file. Oltre, dividila in più sitemap ed elencale in un file indice di sitemap, poi presenta l'indice.",
      },
    ],
  },
  "utm-builder": {
    name: "Costruttore di link UTM",
    tagline:
      "Aggiunge utm_source, medium, campaign, term e content a qualsiasi URL e ottiene un link di tracciamento codificato correttamente, da copiare o condividere.",
    intro: [
      "I parametri UTM sono le query string che le piattaforme di analisi leggono per attribuire il traffico: source, medium, campaign, term e content. Questo costruttore li accoda al tuo URL con una codifica percentuale corretta, così spazi e caratteri speciali sopravvivono al viaggio tra piattaforme pubblicitarie, codici QR e client email.",
      "Metti d'accordo tutti sulle convenzioni di denominazione prima di costruire i link — minuscolo, trattini, niente date dentro i nomi delle campagne — o i tuoi report si frantumeranno in campagne quasi duplicate.",
    ],
    steps: [
      "Incolla l'URL di destinazione.",
      "Compila prima source e medium, poi campaign e i campi facoltativi term/content.",
      "Copia l'URL marcato nel tuo annuncio, nella newsletter o nel post social.",
    ],
    faqs: [
      {
        q: "Quali parametri UTM sono obbligatori?",
        a: "utm_source e utm_medium sono quelli su cui contano gli strumenti di analisi: source nomina il referrer, medium il canale (cpc, email, social). utm_campaign è fortemente raccomandato; utm_id, utm_term e utm_content sono facoltativi.",
      },
      {
        q: "I parametri UTM danneggiano la SEO?",
        a: "Non se gestiti bene. I crawler possono trattare gli URL marcati come duplicati, ed è esattamente ciò che risolve un canonical autoreferenziale — per questo il generatore di canonical si abbina bene a questo strumento.",
      },
      {
        q: "Le maiuscole nei valori UTM sono significative?",
        a: "Sì — utm_campaign=Spring e utm_campaign=spring contano come due campagne nella maggior parte degli strumenti di analisi. Standardizza sul minuscolo e i tuoi report restano puliti.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* Sicurezza                                                           */
  /* ------------------------------------------------------------------ */
  "dns-lookup": {
    name: "Ricerca DNS",
    tagline:
      "Cerca i record A, AAAA, MX, TXT, NS e CNAME di qualsiasi dominio via DNS-over-HTTPS in una tabella pulita — senza terminale né comandi dig.",
    intro: [
      "I record DNS dicono dove punta un dominio, come invia email e come prova di possederlo. Questo strumento risolve qualsiasi tipo di record tramite DNS-over-HTTPS (DoH) — lo stesso canale cifrato che usano i browser moderni — e dispone le risposte in una tabella leggibile.",
      "Gira sul resolver pubblico gratuito di Google, quindi non c'è nulla da installare e nessuna chiave API. Comodo per controllare la propagazione dopo una modifica, verificare i record TXT di SPF/DKIM/DMARC o capire perché la posta verso un dominio rimbalza.",
    ],
    steps: [
      "Scrivi il dominio (example.com, senza http://) e scegli un tipo di record.",
      "Premi Cerca; la query parte via DoH cifrata verso il resolver pubblico.",
      "Leggi la tabella: ogni riga mostra tipo di record, TTL e valore — un IP per A/AAAA, o un server di posta con priorità per MX.",
      "Cambia tipo di record per il quadro completo: MX per la posta, TXT per SPF/DKIM, NS per chi gestisce il DNS.",
    ],
    faqs: [
      {
        q: "A cosa servono i principali tipi di record?",
        a: "A mappa un nome a un indirizzo IPv4, AAAA a IPv6. MX elenca i server di posta e le loro priorità. TXT contiene testo libero — di solito le politiche SPF, DKIM e DMARC. NS nomina i nameserver autorevoli. CNAME è un alias che punta un nome a un altro. Ognuno risponde a una domanda diversa sullo stesso dominio.",
      },
      {
        q: "Cosa viene inviato sulla rete?",
        a: "Il nome di dominio e il tipo di record in una sola query DNS-over-HTTPS a dns.google, cifrata come qualsiasi richiesta HTTPS. Non viene aggiunto nulla su di te, e non sono coinvolti chiavi API o account.",
      },
      {
        q: "Perché a volte vedo righe CNAME quando ho chiesto un A?",
        a: "I resolver includono l'intera catena: se www.example.com è un CNAME verso example.com, una query A restituisce l'alias più il record A finale. Le righe extra mostrano esattamente come si risolve il nome.",
      },
    ],
  },
  "email-validator": {
    name: "Validatore email",
    tagline:
      "Controlla la forma di un'email in locale e verifica che il dominio possa ricevere posta con una ricerca MX dal vivo, più rilevamento dei refusi — gratis, istantaneo, senza registrazione.",
    intro: [
      "Un indirizzo sintatticamente valido può comunque rimbalzare se il suo dominio non ha server di posta. Questo validatore controlla prima la forma interamente nel tuo browser — lunghezza, caratteri, posizione dei punti ed etichette del dominio — poi interroga il DNS dal vivo via HTTPS per vedere se il dominio pubblica davvero record MX (mail exchange).",
      "Confronta anche il dominio con un elenco dei provider più comuni e segnala i refusi probabili come gmial.com. Sulla rete viene inviata solo la parte del dominio; la parte prima della @ non lascia mai il tuo browser.",
    ],
    steps: [
      "Scrivi o incolla l'indirizzo nel campo e premi Valida.",
      "Leggi la riga Sintassi: becca le parti locali malformate, i punti raddoppiati e i domini non validi senza alcuna chiamata di rete.",
      "Controlla la riga Server di posta come prova che il dominio possa ricevere email — qualche dominio senza MX accetta comunque posta via record A, e lo strumento lo segnala.",
      "Se viene suggerito un refuso, correggi il dominio e valida di nuovo.",
    ],
    faqs: [
      {
        q: "Controlla se la casella stessa esiste?",
        a: "No. I server di posta di solito non rivelano se una casella specifica è reale (e sondarli sarebbe invadente). Questo strumento verifica la forma e che il dominio sia configurato per ricevere posta, che è ciò che la maggior parte dei flussi di verifica richiede davvero. Caselle piene o abbandonate possono comunque rimbalzare.",
      },
      {
        q: "Cosa viene inviato esattamente sulla rete?",
        a: "Solo il dominio — la parte dopo la @ — in una query DNS al resolver pubblico di Google (dns.google) via HTTPS. L'indirizzo completo e tutto ciò che sta prima della @ restano nel tuo browser.",
      },
      {
        q: "Perché un indirizzo valido ha fallito il controllo MX?",
        a: "Qualche dominio non pubblica record MX e fa affidamento sul proprio record A (instradamento implicito); lo strumento te lo dice quando è così. Altri pubblicano un MX nullo, dicendo esplicitamente «qui niente posta». Domini aziendali o appena creati possono anche mancare dalle cache dei resolver pubblici per un po' — riprova tra un minuto.",
      },
    ],
  },
  "ip-lookup": {
    name: "Ricerca IP",
    tagline:
      "Trova Paese, città, ISP e ASN di qualsiasi indirizzo IP in secondi — o controlla il tuo IP — con un'API gratuita senza chiave, direttamente nel tuo browser.",
    intro: [
      "Ogni dispositivo su internet porta un indirizzo IP che accenna a dove si trova e chi lo instrada. Inserisci qualsiasi indirizzo IPv4 o IPv6 per vedere Paese e regione, città, operatore di rete (ISP), organizzazione e numero di sistema autonomo (ASN), più fuso orario e coordinate approssimative.",
      "I dati arrivano dal database gratuito e senza chiave di ipwho.is via HTTPS; niente registrazione e niente quota da controllare. Un tocco controlla la tua stessa connessione, comodo per confermare che una VPN abbia davvero cambiato la tua posizione visibile.",
    ],
    steps: [
      "Incolla un IP nel campo, oppure premi Usa il mio IP per ispezionare la tua connessione.",
      "Premi Cerca; l'indirizzo viene inviato all'API ipwho.is via HTTPS.",
      "Leggi i risultati: prima la posizione, poi i dettagli di rete come ISP, organizzazione e ASN.",
      "Confronta i risultati del tuo IP prima e dopo il cambio di server VPN per confermare che la modifica abbia fatto effetto.",
    ],
    faqs: [
      {
        q: "Quanto è precisa la posizione?",
        a: "Paese e regione di solito sono giusti; città e coordinate sono stime basate su dove l'ISP registra il blocco di indirizzi, quindi indirizzi mobile e VPN possono essere sbagliati di molti chilometri. Tratta i risultati come informazione a livello di rete, non come l'indirizzo di una persona.",
      },
      {
        q: "Cosa mi dice l'ASN?",
        a: "Un numero di sistema autonomo identifica l'operatore di rete che possiede il blocco IP — l'ISP, un hosting o una grande azienda. Due IP con lo stesso ASN appartengono quasi certemente alla stessa rete, utile per individuare range di hosting e report di abuso.",
      },
      {
        q: "Cosa viene inviato sulla rete?",
        a: "Solo l'IP che vuoi cercare, in una richiesta HTTPS a ipwho.is. Cercare il tuo stesso IP rivela necessariamente il tuo indirizzo a quell'API — la stessa che vedrebbe qualsiasi servizio di geolocalizzazione.",
      },
    ],
  },
  "password-generator": {
    name: "Generatore di password",
    tagline:
      "Genera password e passphrase forti nel browser con stime di entropia dal vivo — casualità di livello crittografico, nulla inviato o salvato.",
    intro: [
      "Le password deboli e riusate causano la maggior parte delle compromissioni di account. Questo generatore crea password con il generatore casuale crittografico del browser (crypto.getRandomValues) — la stessa sorgente usata per le chiavi di crittografia — così ogni carattere è uniformemente casuale e impossibile da predire.",
      "Scegli una password casuale classica o una passphrase memorabile costruita da un elenco di 256 parole, regola lunghezza e set di caratteri, e guarda la lettura dell'entropia in bit. Tutto gira in locale: la password non viene mai trasmessa, registrata o salvata.",
    ],
    steps: [
      "Scegli Password per caratteri casuali o Passphrase per parole facili da scrivere.",
      "Regola il cursore della lunghezza e attiva i set di caratteri; escludi i caratteri simili se leggerai la password ad alta voce o la scriverai su un telefono.",
      "Controlla la lettura dell'entropia — 80 bit o più sono ottimi per qualsiasi account.",
      "Clicca sul pulsante copia e incolla il risultato direttamente nel form di registrazione o di cambio password.",
    ],
    faqs: [
      {
        q: "Conta di più la lunghezza della password o la complessità?",
        a: "La lunghezza. L'entropia cresce a ogni carattere in più — all'incirca il log2 della dimensione del pool di caratteri per carattere. Una password casuale di 16 caratteri su un pool da 70 ha circa 98 bit di entropia, molto più di una password corta stipata di ogni tipo di simbolo. Anche una passphrase di 5+ parole casuali batte la maggior parte delle password a 8 caratteri.",
      },
      {
        q: "Queste password sono davvero casuali?",
        a: "Sì. Nascono da crypto.getRandomValues, la sorgente casuale crittograficamente sicura del browser — non da Math.random(). L'opzione escludi-simili toglie solo i caratteri somiglianti come l, I, 1, O e 0; non indebolisce mai la casualità del resto.",
      },
      {
        q: "Potete recuperare una password che ho generato qui?",
        a: "No. La generazione avviene interamente nella memoria del tuo browser. Nulla viene caricato, registrato o salvato — ricarica la pagina e la password è sparita per sempre, quindi salvala subito in un gestore di password.",
      },
    ],
  },
  "password-strength": {
    name: "Verifica robustezza password",
    tagline:
      "Vedi quanto è davvero robusta una password: punteggio zxcvbn, stime realistiche dei tempi di violazione e correzioni concrete — tutto calcolato in locale, mai caricato online.",
    intro: [
      "La maggior parte dei misuratori conta solo le classi di caratteri. Questo verificatore esegue l'algoritmo zxcvbn — costruito su dati reali di violazioni e analisi dei pattern — che becca le sequenze da tastiera, i blocchi ripetuti, le date, le sostituzioni l33t e le password comparse nelle fughe note.",
      "Ottieni un punteggio da 0 a 4, i tempi di violazione stimati sotto tre scenari d'attacco e suggerimenti specifici. Tutto viene calcolato nel tuo browser: la password che scrivi non lascia mai il tuo dispositivo.",
    ],
    steps: [
      "Scrivi o incolla la password nella casella — usa Mostra se vuoi leggerla.",
      "Guarda il misuratore del punteggio muoversi da Molto debole a Molto forte mentre modifichi.",
      "Leggi la tabella dei tempi di violazione per capire cosa resiste: tentativi online limitati, attacchi offline contro hash lenti e attacchi offline contro hash veloci.",
      "Applica i suggerimenti — di solito aggiungere un paio di parole casuali è la vittoria più rapida.",
    ],
    faqs: [
      {
        q: "Cosa significano i tre scenari di tempo di violazione?",
        a: "Modellano attaccanti diversi. Online con limiti (100 tentativi/ora) è un form di accesso che limita i tentativi. Offline con hash lento assume un database hashato con bcrypt e violato a 10.000 tentativi al secondo. Offline con hash veloce assume hash MD5/SHA-1 deboli o senza salt violati su GPU a miliardi di tentativi al secondo — il caso peggiore per qualsiasi password riusata.",
      },
      {
        q: "Perché «Tr0ub4dor&3» ottiene un punteggio basso se sembra complessa?",
        a: "Perché le sostituzioni come 0 al posto di o e 3 al posto di e sono la prima cosa che provano i dizionari di violazione. zxcvbn modella queste regole l33t, quindi valuta il pattern sottostante — «troubador» più decorazioni — invece di farsi ingannare dai simboli.",
      },
      {
        q: "La mia password viene inviata da qualche parte?",
        a: "No. Le librerie e i dizionari di zxcvbn si caricano nel tuo browser e ogni calcolo gira in locale. Nessuna richiesta di rete porta il tuo input.",
      },
    ],
  },
  "random-number": {
    name: "Generatore di numeri casuali",
    tagline:
      "Genera numeri davvero casuali da qualsiasi intervallo — singoli, in lotti, estrazioni senza ripetizioni stile lotteria — con l'RNG crittografico del tuo browser.",
    intro: [
      "Math.random() va bene per i giochi ma è distorto e prevedibile. Questo generatore estrae da crypto.getRandomValues, la sorgente casuale crittografica del browser, con campionamento per rifiuto che toglie la distorsione del modulo — ogni numero dell'intervallo è equamente probabile.",
      "Estrai un numero tra i limiti, un intero lotto, o estrazioni senza ripetizioni per lotterie e omaggi; ordina i risultati in crescente o conserva l'ordine di estrazione. Lo strumento mostra anche l'entropia totale dell'estrazione in bit, così puoi dimostrare che un omaggio è stato corretto.",
    ],
    steps: [
      "Imposta minimo e massimo (entrambi inclusi, i negativi sono benvenuti).",
      "Scegli quanti numeri ti servono e attiva le estrazioni senza ripetizioni se i doppioni rovinerebbero la lotteria.",
      "Attiva l'ordine crescente per risultati ordinati, o lascialo spento per conservare l'ordine di estrazione.",
      "Copia l'elenco direttamente nel tuo foglio di calcolo o nell'annuncio della lotteria.",
    ],
    faqs: [
      {
        q: "È adatto a omaggi e lotterie?",
        a: "Sì. I numeri nascono dall'RNG crittografico del browser con un passaggio di campionamento per rifiuto senza distorsioni, quindi ogni valore dell'intervallo ha la stessa probabilità. La lettura dell'entropia mostra esattamente quanta casualità è entrata nell'estrazione.",
      },
      {
        q: "Cosa fa «senza duplicati» quando l'intervallo è piccolo?",
        a: "Passa all'estrazione senza rimessa — come tirare palline numerate da una ciotola. Se chiedi più numeri unici di quanti ne contenga l'intervallo, lo strumento spiega il conflitto invece di restituire un risultato distorto.",
      },
      {
        q: "I numeri vengono salvati da qualche parte?",
        a: "No. Tutto viene calcolato nella memoria del tuo browser da crypto.getRandomValues; ricaricare la pagina cancella i risultati, e nulla viene mai caricato online.",
      },
    ],
  },
  "totp-generator": {
    name: "Generatore TOTP",
    tagline:
      "Genera codici 2FA offline da qualsiasi segreto TOTP — RFC 6238, 6 o 8 cifre, conto alla rovescia dal vivo di 30 secondi. Il tuo segreto non lascia mai il browser.",
    intro: [
      "I codici autenticatore non hanno bisogno di un'app sul telefono. Incolla un segreto base32 (o un intero link di configurazione otpauth:// del tuo vecchio autenticatore) e questo strumento calcola gli stessi codici rotanti a 6 o 8 cifre di qualsiasi autenticatore RFC 6238, con il conto alla rovescia dal vivo verso il codice successivo.",
      "Tutto viene calcolato in locale con l'HMAC di WebCrypto — nessuna chiamata di rete. Il segreto resta solo nella memoria del browser, quindi perdere il telefono non significa perdere il secondo fattore.",
    ],
    steps: [
      "Copia il segreto base32 dalla pagina di configurazione 2FA del servizio (o incolla il suo link otpauth://).",
      "Abbina le impostazioni che il servizio mostra: 6 o 8 cifre, periodo di 30 o 60 secondi, SHA-1 salvo indicazioni diverse.",
      "Scrivi il codice corrente nel servizio prima che il conto alla rovescia finisca — oppure copialo con un clic.",
      "Tieni aperta la scheda per gli accessi ripetuti; i codici si rinnovano automaticamente a ogni periodo.",
    ],
    faqs: [
      {
        q: "Un autenticatore offline è più sicuro dei codici SMS?",
        a: "Sì, in due modi. I codici TOTP vengono calcolati sul tuo dispositivo e non viaggiano mai sulla rete telefonica, quindi non c'è nulla da intercettare per gli attaccanti con scambio SIM. Inoltre scadono ogni 30 secondi e richiedono di possedere il segreto stesso, che non compare mai in alcun messaggio.",
      },
      {
        q: "Dove viene salvato il mio segreto?",
        a: "Da nessuna parte. Sta in una variabile nella memoria di questa scheda e viene usato da WebCrypto per firmare i contatori temporali. Nulla viene scritto in localStorage, cookie o server — chiudi la scheda e sparisce.",
      },
      {
        q: "Perché il mio codice non corrisponde?",
        a: "Le cause più comuni: un algoritmo sbagliato (la maggior parte dei servizi usa SHA-1), il periodo sbagliato, o un orologio del dispositivo fuori sincrono di più di qualche secondo. Controlla i tre selettori con la pagina di configurazione del servizio e sincronizza l'orologio di sistema.",
      },
    ],
  },
  "whois-lookup": {
    name: "Ricerca WHOIS",
    tagline:
      "Controlla i dati di registrazione del dominio via RDAP — registrar, date di creazione e scadenza, codici di stato e nameserver — con note chiare sulla copertura dei TLD.",
    intro: [
      "I record di registrazione rispondono alle domande che la vetrina di un dominio nasconde: chi lo gestisce, quando è stato creato e quando scade. Questo strumento interroga il moderno protocollo RDAP — il successore ufficiale del WHOIS sulla porta 43 — via HTTPS e organizza la risposta in date, registrar, codici di stato e nameserver.",
      "rdap.org instrada la tua query al server RDAP ufficiale del registry. La copertura è ampia ma non universale: la maggior parte dei registry nazionali (.cn, .de, .br…) non ha ancora server RDAP pubblici, e lo strumento te lo dice chiaramente quando un TLD non è coperto invece di mostrare campi vuoti.",
    ],
    steps: [
      "Inserisci il dominio che stai studiando (example.com) e premi Cerca.",
      "Leggi prima le date: creazione e scadenza rivelano l'età del dominio e le abitudini di rinnovo.",
      "Controlla registrar e codici di stato — clientTransferProhibited significa trasferimento bloccato, redemptionPeriod accenna che il dominio potrebbe cadere presto.",
      "Scorri i nameserver per vedere chi gestisce davvero il DNS del dominio.",
    ],
    faqs: [
      {
        q: "Perché RDAP invece del classico WHOIS?",
        a: "RDAP restituisce JSON strutturato via HTTPS invece di testo non strutturato su una porta arcaica. Supporta autenticazione, limiti di frequenza e domini internazionalizzati, e ICANN lo richiede per tutti i registry gTLD. Questo strumento segue i redirect di rdap.org verso il registry che gestisce il TLD.",
      },
      {
        q: "Perché alcuni TLD falliscono con «non coperto»?",
        a: "Ogni registry decide se gestire un servizio RDAP pubblico. Quasi tutti i TLD generici (.com, .net, .app…) lo fanno, ma molti codici nazionali — .cn, .de, .br, tra gli altri — ancora no. Quando rdap.org non trova un server per un TLD, lo strumento mostra una spiegazione chiara invece di un risultato vuoto.",
      },
      {
        q: "Cosa viene inviato sulla rete?",
        a: "Solo il nome di dominio, in una richiesta HTTPS a rdap.org, che può reindirizzare all'endpoint RDAP ufficiale del registry. I dati di registrazione sono pubblici per costruzione; nulla di personale su di te viene trasmesso.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* Unità                                                               */
  /* ------------------------------------------------------------------ */
  "area-converter": {
    name: "Convertitore di superficie",
    tagline:
      "Metri quadrati, piedi quadrati, acri, ettari e altro — per case, terreni e pavimenti, convertiti all'istante nel browser.",
    intro: [
      "Converte le unità di terreno e superficie tra i sistemi: metri quadrati, piedi quadrati, acri, ettari e miglia quadrati, tutti mostrati insieme per qualsiasi input.",
      "Usi tipici: confrontare annunci immobiliari di Paesi diversi, pianificare giardini e campi, stimare pavimenti o quantità di pittura.",
      "Gestisce 9 unità — chilometro quadrato, ettaro, metro quadrato, centimetro quadrato, miglio quadrato e altro. Tutto viene calcolato nel tuo browser, funziona offline e i tuoi dati non toccano mai un server.",
    ],
    steps: [
      "Scrivi il valore da convertire.",
      "Scegli l'unità di partenza e l'unità di arrivo.",
      "Il risultato si aggiorna mentre scrivi — la tabella qui sotto mostra tutte le unità in una volta, oppure copia il risultato.",
    ],
    faqs: [
      {
        q: "Quanto è grande un acro in metri quadrati?",
        a: "Un acro vale 4.046,86 m², cioè circa 43.560 piedi quadrati. Un ettaro corrisponde a 2,471 acri.",
      },
      {
        q: "Questo convertitore è gratuito?",
        a: "Sì — gira interamente nel tuo browser. Nessun limite, nessuna pubblicità sui risultati, nessuna registrazione.",
      },
      {
        q: "Le conversioni sono precise?",
        a: "I fattori di conversione seguono le definizioni standard internazionali (SI e NIST). I risultati vengono mostrati con fino a 8 cifre significative.",
      },
    ],
  },
  "data-converter": {
    name: "Convertitore di dati",
    tagline:
      "Converte byte, KB, MB, GB e TB — entrambe le convenzioni decimale (1000) e binaria (1024) affiancate, chiaramente distinte.",
    intro: [
      "Converte le unità di archiviazione digitale con la distinzione decimale/binaria resa esplicita: KB significa 1000 byte, KiB significa 1024 byte. La confusione «perché il mio disco è più piccolo di quanto pubblicizzato» nasce quasi sempre dall'avere mescolato le due.",
      "Usalo per controllare dimensioni di download, uso del disco, specifiche di memoria e limiti di banda dell'hosting.",
      "Gestisce 10 unità — bit, byte, kilobyte, kibibyte, megabyte, gigabyte, terabyte e altro. Tutto viene calcolato nel tuo browser, funziona offline e i tuoi dati non toccano mai un server.",
    ],
    steps: [
      "Scrivi il valore da convertire.",
      "Scegli l'unità di partenza e l'unità di arrivo.",
      "Il risultato si aggiorna mentre scrivi — la tabella qui sotto mostra tutte le unità in una volta, oppure copia il risultato.",
    ],
    faqs: [
      {
        q: "Perché un disco da 1 TB mostra solo circa 931 GB?",
        a: "I produttori usano le unità decimali (1 TB = 1.000.000.000.000 byte) mentre i sistemi operativi mostrano spesso unità binarie (1 TiB = 1.099.511.627.776 byte). 1 TB = 0,909 TiB ≈ 931 GiB — non manca nulla.",
      },
      {
        q: "Questo convertitore è gratuito?",
        a: "Sì — gira interamente nel tuo browser. Nessun limite, nessuna pubblicità sui risultati, nessuna registrazione.",
      },
      {
        q: "Le conversioni sono precise?",
        a: "I fattori di conversione seguono le definizioni standard internazionali (SI e NIST). I risultati vengono mostrati con fino a 8 cifre significative.",
      },
    ],
  },
  "energy-converter": {
    name: "Convertitore di energia",
    tagline:
      "Calorie, kilojoule, joule, kWh, Wh e BTU — etichette alimentari, bollette della luce e fisica in un unico posto, in tempo reale.",
    intro: [
      "Converte le unità di energia tra contesti diversi: calorie alimentari (kcal) contro calorie della chimica (cal), elettricità in kWh, riscaldamento in BTU, fisica in joule.",
      "Distinzione chiara tra cal e kcal — la confusione che sta dietro a molti fraintendimenti delle etichette dietetiche — con i fattori standard esatti.",
      "Gestisce 7 unità — joule, kilojoule, caloria, kilocaloria, wattora, kilowattora e BTU. Tutto viene calcolato nel tuo browser, funziona offline e i tuoi dati non toccano mai un server.",
    ],
    steps: [
      "Scrivi il valore da convertire.",
      "Scegli l'unità di partenza e l'unità di arrivo.",
      "Il risultato si aggiorna mentre scrivi — la tabella qui sotto mostra tutte le unità in una volta, oppure copia il risultato.",
    ],
    faqs: [
      {
        q: "Una caloria è la stessa cosa di una kilocaloria?",
        a: "No. 1 kcal = 1000 cal. Le etichette alimentari che dicono «Caloria» (con la C maiuscola) intendono in realtà kilocalorie. Inserisci 1 kcal → cal per verificarlo.",
      },
      {
        q: "Quanti kWh sono 1 BTU?",
        a: "1 BTU = 0,000293071 kWh. Un condizionatore da 10.000 BTU acceso per un'ora consuma circa 2,93 kWh.",
      },
      {
        q: "Le conversioni sono precise?",
        a: "I fattori di conversione seguono le definizioni standard internazionali (SI e NIST). I risultati vengono mostrati con fino a 8 cifre significative.",
      },
    ],
  },
  "length-converter": {
    name: "Convertitore di lunghezza",
    tagline:
      "Converte lunghezze e distanze all'istante: metri, piedi, pollici, miglia, centimetri e altro — direttamente nel tuo browser.",
    intro: [
      "Converte tra unità di lunghezza metriche e imperiali senza scrivere in un motore di ricerca. Inserisci qualsiasi valore e vedi metri, piedi, pollici, miglia e tutte le altre unità insieme.",
      "Utile per il fai da te, la preparazione dei viaggi, i disegni tecnici e i compiti di scuola — ovunque una conversione rapida ed esatta valga più di un colpo d'occhio.",
      "Gestisce 10 unità — chilometro, metro, centimetro, millimetro, micrometro, miglio e altro. Tutto viene calcolato nel tuo browser, funziona offline e i tuoi dati non toccano mai un server.",
    ],
    steps: [
      "Scrivi il valore da convertire.",
      "Scegli l'unità di partenza e l'unità di arrivo.",
      "Il risultato si aggiorna mentre scrivi — la tabella qui sotto mostra tutte le unità in una volta, oppure copia il risultato.",
    ],
    faqs: [
      {
        q: "Quanti centimetri sono un pollice?",
        a: "Un pollice vale esattamente 2,54 centimetri, per accordo internazionale dal 1959. Inserisci 1 in → cm qui sopra per verificarlo.",
      },
      {
        q: "Questo convertitore è gratuito?",
        a: "Sì — gira interamente nel tuo browser. Nessun limite, nessuna pubblicità sui risultati, nessuna registrazione.",
      },
      {
        q: "Le conversioni sono precise?",
        a: "I fattori di conversione seguono le definizioni standard internazionali (SI e NIST). I risultati vengono mostrati con fino a 8 cifre significative.",
      },
    ],
  },
  "pressure-converter": {
    name: "Convertitore di pressione",
    tagline:
      "bar, psi, pascal, atmosfera, mmHg e altro — per pneumatici, immersioni, meteo e climatizzazione, convertiti all'istante.",
    intro: [
      "Converte le unità di pressione usate da settori diversi: psi per i manometri degli pneumatici, bar per le specifiche europee, pascal e kPa in ingegneria, mmHg in medicina e meteorologia.",
      "Tutti i fattori sono esatti per definizione dove lo standard li definisce esatti (per esempio 1 atm = 101.325 Pa).",
      "Gestisce 7 unità — pascal, kilopascal, megapascal, bar, atmosfera, millimetro di mercurio, psi. Tutto viene calcolato nel tuo browser, funziona offline e i tuoi dati non toccano mai un server.",
    ],
    steps: [
      "Scrivi il valore da convertire.",
      "Scegli l'unità di partenza e l'unità di arrivo.",
      "Il risultato si aggiorna mentre scrivi — la tabella qui sotto mostra tutte le unità in una volta, oppure copia il risultato.",
    ],
    faqs: [
      {
        q: "Come si convertono gli psi in bar?",
        a: "1 bar = 14,5038 psi, quindi dividi gli psi per 14,5038. Uno pneumatico tipico da 32 psi fa circa 2,21 bar.",
      },
      {
        q: "Questo convertitore è gratuito?",
        a: "Sì — gira interamente nel tuo browser. Nessun limite, nessuna pubblicità sui risultati, nessuna registrazione.",
      },
      {
        q: "Le conversioni sono precise?",
        a: "I fattori di conversione seguono le definizioni standard internazionali (SI e NIST). I risultati vengono mostrati con fino a 8 cifre significative.",
      },
    ],
  },
  "speed-converter": {
    name: "Convertitore di velocità",
    tagline:
      "km/h, mph, nodi, m/s e altro — converte ritmo di corsa, velocità del vento e velocità dei mezzi all'istante, nel browser.",
    intro: [
      "Converte le unità di velocità usate da Paesi e sport diversi: chilometri orari, miglia orarie, nodi per la vela e l'aviazione, metri al secondo per la fisica.",
      "Utile quando noleggi un'auto all'estero, leggi un bollettino marittimo o confronti il ritmo sul tapis e all'aperto.",
      "Gestisce 6 unità — metro al secondo, chilometro orario, miglio orario, piede al secondo, nodo, Mach (al livello del mare). Tutto viene calcolato nel tuo browser, funziona offline e i tuoi dati non toccano mai un server.",
    ],
    steps: [
      "Scrivi il valore da convertire.",
      "Scegli l'unità di partenza e l'unità di arrivo.",
      "Il risultato si aggiorna mentre scrivi — la tabella qui sotto mostra tutte le unità in una volta, oppure copia il risultato.",
    ],
    faqs: [
      {
        q: "100 km/h, quanto fanno in mph?",
        a: "100 km/h = 62,14 mph. Il fattore esatto è 1 mph = 1,609344 km/h.",
      },
      {
        q: "Questo convertitore è gratuito?",
        a: "Sì — gira interamente nel tuo browser. Nessun limite, nessuna pubblicità sui risultati, nessuna registrazione.",
      },
      {
        q: "Le conversioni sono precise?",
        a: "I fattori di conversione seguono le definizioni standard internazionali (SI e NIST). I risultati vengono mostrati con fino a 8 cifre significative.",
      },
    ],
  },
  "temperature-converter": {
    name: "Convertitore di temperatura",
    tagline:
      "Celsius in Fahrenheit e Kelvin, all'istante. Risultati in tempo reale più i punti di riferimento di congelamento ed ebollizione.",
    intro: [
      "Converte Celsius, Fahrenheit e Kelvin in un passaggio. A differenza delle unità lineari, le scale di temperatura richiedono formule con scostamento — questo strumento le applica correttamente, valori sotto zero compresi.",
      "Buono per le ricette con forni straniere, i bollettini meteo, il lavoro di laboratorio e le specifiche degli impianti.",
      "Gestisce 3 unità — Celsius, Fahrenheit, Kelvin. Tutto viene calcolato nel tuo browser, funziona offline e i tuoi dati non toccano mai un server.",
    ],
    steps: [
      "Scrivi il valore da convertire.",
      "Scegli l'unità di partenza e l'unità di arrivo.",
      "Il risultato si aggiorna mentre scrivi — la tabella qui sotto mostra tutte le unità in una volta, oppure copia il risultato.",
    ],
    faqs: [
      {
        q: "Come si convertono i Celsius in Fahrenheit?",
        a: "Moltiplica per 9, dividi per 5 e aggiungi 32: °F = °C × 9⁄5 + 32. Per esempio, 20 °C = 68 °F. Lo strumento lo fa per te e mostra anche i Kelvin.",
      },
      {
        q: "A quale temperatura Fahrenheit e Celsius sono uguali?",
        a: "A −40 gradi: −40 °C = −40 °F. Inserisci −40 e cambia le unità per vederlo.",
      },
      {
        q: "Le conversioni sono precise?",
        a: "I fattori di conversione seguono le definizioni standard internazionali (SI e NIST). I risultati vengono mostrati con fino a 8 cifre significative.",
      },
    ],
  },
  "time-converter": {
    name: "Convertitore di unità di tempo",
    tagline:
      "Secondi, minuti, ore, giorni, settimane, mesi e anni — con l'avvertenza sul mese/anno spiegata chiaramente, tutto nel browser.",
    intro: [
      "Converte le durate tra unità di tempo. Poiché mesi e anni del calendario variano in lunghezza, questo strumento usa le medie convenzionali (30,44 giorni al mese, 365,2425 giorni all'anno) e lo dichiara — nessun arrotondamento in silenzio.",
      "Utile per le stime dei progetti, il confronto tra abbonamenti, la misurazione scientifica dei tempi e i countdown.",
      "Gestisce 8 unità — millisecondo, secondo, minuto, ora, giorno, settimana e altro. Tutto viene calcolato nel tuo browser, funziona offline e i tuoi dati non toccano mai un server.",
    ],
    steps: [
      "Scrivi il valore da convertire.",
      "Scegli l'unità di partenza e l'unità di arrivo.",
      "Il risultato si aggiorna mentre scrivi — la tabella qui sotto mostra tutte le unità in una volta, oppure copia il risultato.",
    ],
    faqs: [
      {
        q: "Perché qui un mese dura 30,44 giorni?",
        a: "Un mese del calendario va dai 28 ai 31 giorni, quindi il calcolo delle durate usa la media sul ciclo gregoriano: 30,4369 giorni. Per un'aritmetica delle date esatta, usa invece la Calcolatrice di date.",
      },
      {
        q: "Questo convertitore è gratuito?",
        a: "Sì — gira interamente nel tuo browser. Nessun limite, nessuna pubblicità sui risultati, nessuna registrazione.",
      },
      {
        q: "Le conversioni sono precise?",
        a: "I fattori di conversione seguono le definizioni standard internazionali (SI e NIST). I risultati vengono mostrati con fino a 8 cifre significative.",
      },
    ],
  },
  "volume-converter": {
    name: "Convertitore di volume",
    tagline:
      "Litri, galloni, tazze, millilitri e metri cubi — unità US e UK etichettate chiaramente, conversioni immediate nel browser.",
    intro: [
      "Converte le unità di volume da cucina e ingegneria con la distinzione US/UK resa esplicita: un gallone US vale 3,785 L, un gallone UK (imperiale) vale 4,546 L — il 20% in meno o in più, mescolarli rovina le ricette.",
      "Pensato per cucinare, fermentare, dosare gli acquari, i numeri del carburante e le stime del calcestruzzo.",
      "Gestisce 10 unità — metro cubo, litro, millilitro, gallone US, gallone UK, quarto US e altro. Tutto viene calcolato nel tuo browser, funziona offline e i tuoi dati non toccano mai un server.",
    ],
    steps: [
      "Scrivi il valore da convertire.",
      "Scegli l'unità di partenza e l'unità di arrivo.",
      "Il risultato si aggiorna mentre scrivi — la tabella qui sotto mostra tutte le unità in una volta, oppure copia il risultato.",
    ],
    faqs: [
      {
        q: "Un gallone US è la stessa cosa di un gallone UK?",
        a: "No. 1 gallone US = 3,785 L, 1 gallone UK = 4,546 L. Il convertitore li elenca separatamente così scegli sempre quello giusto.",
      },
      {
        q: "Questo convertitore è gratuito?",
        a: "Sì — gira interamente nel tuo browser. Nessun limite, nessuna pubblicità sui risultati, nessuna registrazione.",
      },
      {
        q: "Le conversioni sono precise?",
        a: "I fattori di conversione seguono le definizioni standard internazionali (SI e NIST). I risultati vengono mostrati con fino a 8 cifre significative.",
      },
    ],
  },
  "weight-converter": {
    name: "Convertitore di peso",
    tagline:
      "Converte chilogrammi, libbre, once, stone e grammi all'istante — gratuito, privo di upload e funziona anche offline.",
    intro: [
      "Passa tra unità di peso metriche e imperiali in un unico posto: chilogrammi, libbre, once, stone, carati e altro, tutto ricalcolato mentre scrivi.",
      "Comodo per cucinare ricette straniere, controllare i limiti dei bagagli, tenere il registro di palestra e calcolare le spedizioni.",
      "Gestisce 8 unità — tonnellata metrica, chilogrammo, grammo, milligrammo, libbra, oncia e altro. Tutto viene calcolato nel tuo browser, funziona offline e i tuoi dati non toccano mai un server.",
    ],
    steps: [
      "Scrivi il valore da convertire.",
      "Scegli l'unità di partenza e l'unità di arrivo.",
      "Il risultato si aggiorna mentre scrivi — la tabella qui sotto mostra tutte le unità in una volta, oppure copia il risultato.",
    ],
    faqs: [
      {
        q: "Quante libbre pesa 1 kg?",
        a: "Un chilogrammo vale 2,20462 libbre (1 lb = 0,45359237 kg esatti). Inserisci 1 kg → lb qui sopra per vederlo.",
      },
      {
        q: "Quanto vale una stone in kg?",
        a: "Una stone (usata nel Regno Unito per il peso corporeo) fa 6,35029318 chilogrammi — esattamente 14 libbre.",
      },
      {
        q: "Le conversioni sono precise?",
        a: "I fattori di conversione seguono le definizioni standard internazionali (SI e NIST). I risultati vengono mostrati con fino a 8 cifre significative.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* Calcolatori                                                         */
  /* ------------------------------------------------------------------ */
  "age-calculator": {
    name: "Calcolatrice dell'età",
    tagline:
      "Calcola un'età esatta in anni, mesi e giorni, i giorni totali vissuti e un conto alla rovescia dal vivo verso il prossimo compleanno — precisa sul calendario.",
    intro: [
      "Inserisci una data di nascita e questa calcolatrice riporta l'età esatta — anni, mesi e giorni, non un'approssimazione — più i mesi totali e i giorni totali vissuti. Fa anche il conto alla rovescia verso il prossimo compleanno, con il giorno della settimana su cui cade.",
      "Il campo «età alla data» è impostato su oggi e si può cambiare in qualsiasi data passata o futura, il che rende facile rispondere a domande come «quanti anni aveva il giorno della laurea?».",
    ],
    steps: [
      "Scegli la data di nascita.",
      "Lascia la data di riferimento su oggi, o cambiala con qualsiasi altra data.",
      "Leggi l'età esatta, i mesi e i giorni totali e il conto alla rovescia del prossimo compleanno.",
    ],
    faqs: [
      {
        q: "Come viene calcolata l'età in anni, mesi e giorni?",
        a: "Con aritmetica del calendario, non una lunghezza media del mese: anni e mesi si contano interi, e i giorni che restano si misurano contro la lunghezza reale del mese — anni bisestili compresi. Chi è nato il 29 febbraio compie un anno più vecchio il 1 marzo negli anni non bisestili.",
      },
      {
        q: "Posso calcolare un'età a una data nel passato o nel futuro?",
        a: "Sì. La casella «età alla data» è modificabile, così puoi calcolare un'età storica o controllare quanti anni avrà qualcuno a un evento futuro. La data di nascita non può essere successiva alla data di riferimento.",
      },
      {
        q: "Perché conta la cifra dei giorni totali?",
        a: "I giorni totali vissuti sono la cifra usata per le ricorrenze in stile «giorni sulla Terra» e per i sistemi che conservano le età in giorni. Si calcola dalle date del calendario in UTC, così le variazioni dell'ora legale non possono farla scartare di uno.",
      },
    ],
  },
  "aspect-ratio-calculator": {
    name: "Calcolatrice di proporzioni",
    tagline:
      "Data una proporzione come 16:9 e una dimensione, ottieni all'istante larghezza o altezza mancante — più preset dal 1:1 al 21:9 per video e design.",
    intro: [
      "Inserisci una proporzione — tocca un preset (1:1, 4:3, 3:2, 16:9, 16:10, 21:9) o scrivi numeri personalizzati — poi dagli una larghezza o un'altezza nota. La dimensione mancante compare subito, insieme alla coppia formattata come L×A e alla proporzione decimale.",
      "Il classico ridimensionamento senza distorsioni: ritagli video, contenitori di immagini responsive, formati di sensori e pellicole, scale di stampa e decisioni di CSS object-fit vivono tutti qui, calcolati in locale mentre scrivi.",
    ],
    steps: [
      "Scegli un preset di proporzione o scrivi i tuoi valori larghezza:altezza.",
      "Scegli quale dimensione conosci già — larghezza o altezza.",
      "Inserisci il valore noto e leggi la dimensione mancante.",
    ],
    faqs: [
      {
        q: "Come viene calcolata la dimensione mancante?",
        a: "Per proporzione diretta: dimensione nota × (lato bersaglio ÷ lato corrispondente della proporzione). Per il 16:9 con larghezza 1920, altezza = 1920 × 9 ÷ 16 = 1080. Il risultato viene mostrato arrotondato, con il decimale esatto sotto.",
      },
      {
        q: "Perché 16:9 e 16:10 contano così tanto per gli schermi?",
        a: "Il 16:9 corrisponde al video (1920×1080, 3840×2160) e alla maggior parte dei monitor; il 16:10 aggiunge spazio verticale per documenti e codice (1920×1200). Scegliere quello sbagliato significa bande nere o pixel stirati — questo strumento mostra esattamente cosa produce ciascuna proporzione.",
      },
      {
        q: "Posso usare proporzioni decimali o insolite?",
        a: "Sì. Entrambi i campi della proporzione accettano qualsiasi numero positivo, quindi il CinemaScope 2,39:1, l'1,85:1, i ritagli social 4:5 in verticale o sensori come 1,5:1 funzionano tutti — la matematica delle proporzioni è identica.",
      },
    ],
  },
  "barcode-generator": {
    name: "Generatore di codici a barre",
    tagline:
      "Crea codici a barre scansionabili CODE128, EAN-13 e UPC-A con larghezza e altezza delle barre regolabili — output vettoriale SVG, renderizzato nel tuo browser.",
    intro: [
      "Scrivi un valore, scegli una simbologia e ottieni un codice a barre pronto per la vendita con una riga leggibile opzionale sotto. CODE128 gestisce qualsiasi lettera, cifra e simbolo per le etichette di inventario; EAN-13 e UPC-A validano e completano automaticamente la cifra di controllo per le confezioni dei prodotti.",
      "Il rendering usa la libreria JsBarcode dentro il tuo browser e produce un SVG scalabile, così lo stesso file stampa nitido su un'etichetta da 12 mm o su un foglio A4. Non viene caricato nulla e nessun codice viene salvato.",
    ],
    steps: [
      "Inserisci il valore del codice a barre — lettere/cifre per CODE128, 12 cifre per EAN-13, 11 per UPC-A.",
      "Scegli il formato e regola larghezza e altezza delle barre.",
      "Scarica l'SVG per la stampa o importalo nel tuo strumento di design.",
    ],
    faqs: [
      {
        q: "Perché il mio input EAN-13 viene rifiutato?",
        a: "EAN-13 richiede esattamente 12 cifre (la 13ª cifra di controllo viene calcolata automaticamente) o tutte le 13 cifre con una cifra di controllo finale valida. UPC-A vuole allo stesso modo 11 cifre. Lettere, spazi o il numero sbagliato di cifre vengono rifiutati con il messaggio d'errore della libreria.",
      },
      {
        q: "Quale formato usare per i prodotti al dettaglio?",
        a: "EAN-13 nella maggior parte del mondo, UPC-A negli Stati Uniti e in Canada — entrambi standard GS1 che gli scanner delle casse si aspettano. Usa CODE128 per etichette interne di magazzino, cespiti e spedizioni dove non esiste un numero GS1.",
      },
      {
        q: "Che risoluzione ha l'output?",
        a: "Il download è un SVG vettoriale, quindi si scala a qualsiasi DPI senza sfocature. Mantieni intatte le zone quieti (i margini vuoti ai lati) quando lo sistemi — tagliarle è la causa più comune di scansioni illeggibili.",
      },
    ],
  },
  "binary-converter": {
    name: "Convertitore binario",
    tagline:
      "Converte tra decimale, esadecimale, ottale e binario in un'unica griglia dal vivo — supporta interi di qualsiasi dimensione e raggruppa per leggibilità.",
    intro: [
      "Scrivi un numero in uno dei quattro campi — decimale, hex, ottale o binario — e gli altri tre si aggiornano all'istante. I valori hex si raggruppano ogni due cifre e il binario ogni quattro, così i pattern di bit lunghi restano leggibili.",
      "La conversione usa l'aritmetica BigInt, il che significa nessun tetto a 32 o 64 bit: incolla un decimale di 40 cifre o un'esadecimale completa a 256 bit e ogni rappresentazione resta esatta.",
    ],
    steps: [
      "Scrivi o incolla un valore in qualsiasi campo — decimale, hex, ottale o binario.",
      "Le altre tre basi si aggiornano dal vivo mentre scrivi.",
      "I prefissi come 0x sono facoltativi; gli spazi di raggruppamento vengono ignorati durante l'analisi.",
    ],
    faqs: [
      {
        q: "Quanto grande può essere il numero per questo convertitore?",
        a: "Interi non negativi di qualsiasi dimensione. I calcoli usano BigInt, quindi un valore esadecimale a 256 bit si converte esattamente — ben oltre il limite di 2^53 dei normali numeri JavaScript.",
      },
      {
        q: "Perché la mia lettera hex appare come non valida?",
        a: "Ogni base accetta solo le proprie cifre: il binario prende 0–1, l'ottale 0–7, il decimale 0–9 e l'esadecimale 0–9 più a–f. Anche uno spazio o un simbolo smarrito dentro il numero viene rifiutato.",
      },
      {
        q: "Sono supportati numeri negativi o frazioni?",
        a: "No — questa griglia converte valori interi non negativi, che è ciò che sono pattern di bit, hash e indirizzi di memoria. I formati con segno e frazionari dipendono da scelte di codifica (complemento a due, IEEE 754) che renderebbero ambigua la corrispondenza.",
      },
    ],
  },
  "bmi-calculator": {
    name: "Calcolatrice BMI",
    tagline:
      "Calcola l'indice di massa corporea da input metrici o imperiali e vedi esattamente dove il valore cade nelle categorie ufficiali WHO del peso.",
    intro: [
      "Inserisci altezza e peso in centimetri e chilogrammi, oppure piedi, pollici e libbre, e la calcolatrice mostra il tuo indice di massa corporea con un decimale insieme alla categoria WHO in cui cade — sottopeso, normopeso, sovrappeso o obesità — con la riga corrispondente evidenziata nella tabella di riferimento.",
      "Il risultato si aggiorna mentre scrivi, così è facile vedere come pochi chilogrammi ti spostano tra le fasce. Il BMI è una misura di screening, non una diagnosi: non distingue muscolo da grasso.",
    ],
    steps: [
      "Scegli le unità metriche (cm + kg) o imperiali (ft + in + lb).",
      "Scrivi la tua altezza e il tuo peso.",
      "Leggi il tuo BMI, la sua categoria WHO e l'intera tabella di riferimento.",
    ],
    faqs: [
      {
        q: "Quali sono le fasce BMI della WHO?",
        a: "L'Organizzazione Mondiale della Sanità definisce: sotto 18,5 sottopeso, 18,5–24,9 normopeso, 25,0–29,9 sovrappeso, e 30,0 e oltre obesità. Le stesse soglie valgono per uomini e donne adulte.",
      },
      {
        q: "Come viene calcolato il BMI?",
        a: "Il BMI è il peso in chilogrammi diviso l'altezza in metri al quadrato (kg/m²). Per le unità imperiali lo strumento converte piedi, pollici e libbre internamente, quindi il risultato è identico in entrambi i casi.",
      },
      {
        q: "Perché il BMI non calza agli atleti?",
        a: "Il muscolo è più denso del grasso, quindi le persone molto muscolose possono risultare «sovrappeso» pur portando poco grasso in eccesso. Tratta il BMI come uno screening rapido a livello di popolazione e abbinalo alla circonferenza vita o alla composizione corporea per un quadro più completo.",
      },
    ],
  },
  "color-converter": {
    name: "Convertitore di colori",
    tagline:
      "Incolla un colore in hex, rgb() o hsl() e ottieni tutti e tre i formati più una riga già pronta di tinte e ombre per il tuo design system.",
    intro: [
      "Dagli #0071e3, rgb(0, 113, 227) o hsl(211, 100%, 45%) — il parser rileva il formato da solo ed emette hex, RGB e HSL insieme, ognuno con la copia a un clic.",
      "Sotto i valori, una riga di tinte e ombre mescola il tuo colore con bianco e nero a passi del 20/40/60/80%: stati hover, bordi e varianti dark-mode immediati senza aprire uno strumento di design.",
    ],
    steps: [
      "Incolla un colore in uno dei tre formati — hex, rgb() o hsl().",
      "Leggi i valori convertiti e copia quello che ti serve.",
      "Prendi tinte e ombre dalla riga di campioni qui sotto.",
    ],
    faqs: [
      {
        q: "Come si converte HSL in RGB?",
        a: "Tramite la mappatura standard cilindrica→RGB: cromaticità c = (1 − |2L − 1|) × S, un valore intermedio x determinato dal settore della tonalità, poi ogni canale viene scostato di m = L − c/2. La matematica è quella dei libri di testo, quindi i risultati corrispondono agli strumenti di design.",
      },
      {
        q: "Perché il mio codice colore appare come non valido?",
        a: "Le forme accettate sono #RGB / #RRGGBB, rgb(r, g, b) e hsl(h, s%, l%). I canali devono stare nel loro intervallo (0–255 per RGB, 0–360 per la tonalità, 0–100% per il resto) e ogni parte separata da virgola o spazio.",
      },
      {
        q: "A cosa servono tinte e ombre?",
        a: "Le tinte (mescolate con il bianco) fanno sfondi hover, badge e card; le ombre (mescolate con il nero) fanno stati premuti, bordi e superfici dark-mode. Derivare entrambe da un solo colore del marchio tiene ogni stato dell'interfaccia visivamente coerente.",
      },
    ],
  },
  "color-picker": {
    name: "Selettore colori",
    tagline:
      "Scegli un colore dal campione o prendine uno direttamente dallo schermo con l'API EyeDropper — hex, RGB e HSL copiati con un clic.",
    intro: [
      "Clicca sul campione per comporre un colore a vista, oppure — nei browser Chromium — usa Prendi dallo schermo per campionare qualsiasi pixel già presente sul tuo display. Il valore scelto appare insieme come hex, rgb() e hsl(), ognuno con il suo pulsante di copia.",
      "Il campionamento usa l'API EyeDropper integrata del browser e legge il pixel in locale; nulla viene registrato, caricato o salvato. Sui browser senza l'API, l'input del campione tiene tutto funzionante.",
    ],
    steps: [
      "Clicca sul campione di colore e scegli un colore, oppure usa Prendi dallo schermo dove disponibile.",
      "Leggi i valori hex, RGB e HSL sotto l'anteprima.",
      "Clicca su Copia accanto al formato che ti serve.",
    ],
    faqs: [
      {
        q: "Perché «Prendi dallo schermo» non compare?",
        a: "L'API EyeDropper è oggi disponibile nei browser basati su Chromium (Chrome, Edge, Brave, Opera). Firefox e Safari non la espongono ancora, quindi quei browser mostrano solo l'input del campione — tutto il resto funziona identico.",
      },
      {
        q: "Qual è la differenza tra hex, RGB e HSL?",
        a: "Descrivono lo stesso colore in tre modi: hex impacchetta rosso-verde-blu in #RRGGBB per CSS e strumenti di design; rgb() dichiara i tre canali numericamente; hsl() esprime tonalità, saturazione e luminosità, il che è più facile per costruire palette e stati hover a mano.",
      },
      {
        q: "Il campionamento dello schermo è privo di rischi per la privacy?",
        a: "Sì. L'API EyeDropper mostra un selettore di sistema e restituisce solo il singolo pixel su cui clicchi; la lettura avviene nel tuo browser e nessuno screenshot, cronologia o valore viene trasmesso o salvato.",
      },
    ],
  },
  "compound-interest-calculator": {
    name: "Calcolatrice di interessi composti",
    tagline:
      "Guarda come crescono i risparmi con l'interesse composto — inserisci un deposito, versamenti mensili e un tasso per avere il saldo finale e una tabella anno per anno.",
    intro: [
      "L'interesse composto è interesse sull'interesse: a ogni periodo il saldo guadagna una quota del tasso annuale, e ogni versamento che aggiungi comincia a guadagnare il suo interesse a sua volta. Questa calcolatrice esegue quella ricorsione periodo per periodo per un deposito iniziale più contributi mensili regolari, con capitalizzazione mensile, trimestrale o annuale.",
      "Il risultato è il saldo finale, il totale che hai versato e l'interesse generato dalla capitalizzazione — più una tabella anno per anno così vedi esattamente quando la curva comincia a piegarsi. Tutto si ricalcola dal vivo, e la formula usata è stampata proprio sotto i numeri, così puoi confrontarla con la proiezione della tua banca.",
    ],
    steps: [
      "Inserisci il deposito iniziale e l'importo che aggiungerai ogni mese (0 per un deposito una tantum).",
      "Imposta il tasso di interesse annuale, il numero di anni e la frequenza di capitalizzazione.",
      "Scegli una valuta di visualizzazione — gli importi vengono formattati per le tue impostazioni locali.",
      "Leggi saldo finale, contributi totali e interessi maturati, poi controlla la tabella anno per anno.",
    ],
    faqs: [
      {
        q: "Quale formula usa la calcolatrice?",
        a: "La stessa ricorsione del saldo che le banche usano per proiettare i risparmi: a ogni periodo, saldo ← (saldo + contributo) × (1 + r), dove r = tasso annuale ÷ periodi all'anno (12 per il mensile, 4 per il trimestrale, 1 per l'annuale). I contributi vengono versati all'inizio di ogni periodo, quindi guadagnano interesse da quel periodo in poi. Esempio: 10.000 iniziali, 100/mese al 5% per 10 anni con capitalizzazione mensile danno un saldo finale di 32.063,02 — 22.000,00 versati e 10.063,02 di interessi.",
      },
      {
        q: "Perché ottengo risultati leggermente diversi su altre calcolatrici?",
        a: "Le convenzioni sui tempi differiscono. Alcuni strumenti trattano i contributi come versamenti a fine periodo (non guadagnano interesse nel periodo in cui arrivano), alcuni assumono capitalizzazione giornaliera, altri arrotondano ogni periodo. Questo strumento versa all'inizio di ogni periodo e non arrotonda mai i passaggi intermedi; una differenza dello 0,1% rispetto a un altro sito di solito è quella convenzione, non un errore.",
      },
      {
        q: "Include tasse, commissioni o inflazione?",
        a: "No — il risultato è crescita nominale al tasso che inserisci. Le tasse sugli interessi, i costi del conto e l'inflazione riducono tutti il rendimento reale, quindi tratta il saldo finale come un tetto su ciò che manterresti davvero.",
      },
    ],
  },
  "currency-converter": {
    name: "Convertitore di valute",
    tagline:
      "Converte oltre 160 valute del mondo con tassi di mercato aggiornati — caricati una sola volta online, calcolati e messi in cache privatamente nel tuo browser.",
    intro: [
      "I tassi di cambio vengono scaricati una volta dal servizio gratuito e senza chiave open.er-api.com e messi in cache sul tuo dispositivo per un'ora, così le conversioni ripetute sono istantanee e funzionano offline. L'aritmetica che trasforma il tuo importo in un'altra valuta avviene in locale nel tuo browser.",
      "Scrivi un importo, scegli due valute dall'elenco ricercabile di oltre 160 e leggi il risultato più la riga del tasso dal vivo. Gli importi che inserisci non vengono mai trasmessi da nessuna parte — viene scaricata solo la tabella anonima dei tassi.",
    ],
    steps: [
      "Inserisci l'importo da convertire.",
      "Scegli la valuta di partenza e quella di arrivo — le più comuni stanno in cima.",
      "Leggi il risultato convertito e il tasso esatto; usa Aggiorna tassi per i dati più freschi.",
    ],
    faqs: [
      {
        q: "Ogni quanto si aggiornano i tassi di cambio?",
        a: "La tabella di open.er-api.com si aggiorna all'incirca una volta al giorno, e questo strumento la tiene in cache nel tuo browser per un'ora prima di riscaricarla. Premi «Aggiorna tassi» in qualsiasi momento per scaricare subito la tabella più recente.",
      },
      {
        q: "Usare questo strumento manda i miei dati online?",
        a: "Nessun importo viene mai inviato da nessuna parte. L'unica richiesta di rete scarica una tabella di tassi anonima e pubblica (in base USD) una volta per ora; la matematica della conversione gira in locale nel tuo browser e funziona perfino offline dalla cache.",
      },
      {
        q: "Questi sono i tassi che mi darà la banca?",
        a: "Questi sono tassi di riferimento a metà mercato — il punto medio tra prezzi di acquisto e vendita a cui le banche scambiano. Le carte di pagamento e le banche aggiungono di solito uno spread o una commissione dell'1–3% sopra questa cifra.",
      },
    ],
  },
  "date-calculator": {
    name: "Calcolatrice di date",
    tagline:
      "Giorni tra due date in anni, mesi e giorni — oppure aggiungi e togli giorni da qualsiasi data — con gli anni bisestili gestiti esattamente.",
    intro: [
      "Due problemi quotidiani con le date in un unico posto: misurare la distanza tra due date (anni/mesi/giorni precisi sul calendario, giorni totali, settimane e giorni restanti), oppure avanzare o arretrare di N giorni da una data base e ottenere la data risultante con il suo giorno della settimana.",
      "Poiché l'aritmetica è vera matematica del calendario — non un mese medio — un compleanno bisestile, un mese da 31 giorni o un intervallo a cavallo di febbraio escono esattamente giusti, senza alcun server di mezzo.",
    ],
    steps: [
      "Scegli Differenza tra date, oppure Aggiungi / togli giorni.",
      "Inserisci le due date — oppure una data base e un numero di giorni.",
      "Leggi lo scomposto esatto e la data risultante con il suo giorno della settimana.",
    ],
    faqs: [
      {
        q: "Come viene calcolata la differenza in anni/mesi/giorni?",
        a: "Come contano le persone gli anniversari: anni interi, poi mesi interi, poi i giorni restanti misurati contro le lunghezze reali dei mesi coinvolti. Il 29 febbraio viene trattato come l'ultimo giorno di febbraio, così gli intervalli a cavallo degli anni bisestili restano onesti.",
      },
      {
        q: "«Aggiungi 90 giorni» significa giorni lavorativi?",
        a: "No — il conteggio è di giorni di calendario, weekend compresi. Per scadenze contrattuali che contano giorni lavorativi, aggiungi circa 5 giorni per settimana di intervallo come prima approssimazione, oppure usa uno strumento dedicato ai giorni lavorativi.",
      },
      {
        q: "Le date che inserisco vengono inviate da qualche parte?",
        a: "No. Entrambe le modalità girano interamente nel tuo browser con l'aritmetica delle date di JavaScript; nulla viene caricato e nulla viene salvato.",
      },
    ],
  },
  "discount-calculator": {
    name: "Calcolatrice di sconti",
    tagline:
      "Prezzo più uno o due sconti cumulativi: prezzo finale, denaro risparmiato e la vera percentuale combinata — calcolata mentre scrivi.",
    intro: [
      "Inserisci il prezzo originale e una percentuale di sconto, e vedi subito cosa paghi davvero e quanto risparmi. Un secondo sconto, facoltativo, gestisce il caso del «10% extra sui prezzi in saldo» che fa sempre inciampare gli acquirenti.",
      "Gli sconti cumulativi vengono applicati uno dopo l'altro, e lo strumento mostra il tasto combinato effettivo — perché 20% + 10% sono il 28%, non il 30%, una differenza che si somma sugli articoli di grande valore.",
    ],
    steps: [
      "Scrivi il prezzo originale.",
      "Inserisci la percentuale di sconto — e un secondo sconto cumulativo, facoltativo.",
      "Leggi il prezzo finale, l'importo risparmiato e lo sconto effettivo.",
    ],
    faqs: [
      {
        q: "Perché 20% + 10% non equivale al 30% di sconto?",
        a: "Il secondo sconto si applica al prezzo già ridotto, non a quello originale: 100 → 80 (−20%) → 72 (−10%), cioè il 28% in totale. La calcolatrice mostra questo tasso effettivo così puoi confrontare le offerte correttamente.",
      },
      {
        q: "Come ricavo il prezzo originale da un prezzo in saldo?",
        a: "Dividi il prezzo in saldo per (1 − sconto ÷ 100). Un prezzo di 72 € dopo il 28% di sconto nasce da 72 ÷ 0,72 = 100 €. Oppure usa la modalità «X è che % di Y» della Calcolatrice percentuale per farlo passo per passo.",
      },
      {
        q: "Tiene conto di IVA o tasse di vendita?",
        a: "No — lavora sui prezzi che scrivi. Se il cartellino mostra un prezzo tasse incluse, anche il risultato dello sconto sarà tasse incluse. Per combinarlo con la tassazione, passa il prezzo scontato nella calcolatrice IVA o GST.",
      },
    ],
  },
  "emi-calculator": {
    name: "Calcolatrice rata (EMI)",
    tagline:
      "Calcola la rata mensile fissa per qualsiasi prestito — capitale, tasso e durata in ingresso, interessi totali e rimborso totale in uscita, all'istante.",
    intro: [
      "Inserisci l'importo del prestito, il tasso di interesse annuale e la durata in anni o mesi per ottenere la rata mensile costante più gli interessi totali che pagherai nel corso del prestito. La matematica è la formula standard a capitale decrescente che usano banche e finanziarie.",
      "Modifica qualsiasi input e tutto si ricalcola dal vivo, così puoi confrontare un prestito a 15 anni con uno a 20, o vedere esattamente quanto ti costa al mese mezzo punto di interesse in più.",
    ],
    steps: [
      "Scrivi l'importo del prestito (capitale).",
      "Inserisci il tasso di interesse annuale e la durata in anni o mesi.",
      "Leggi la rata mensile, gli interessi totali e il rimborso totale.",
    ],
    faqs: [
      {
        q: "Quale formula usa la calcolatrice della rata?",
        a: "La formula standard a capitale decrescente: rata = P × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1), dove P è il capitale, r il tasso di interesse mensile (annuale ÷ 12 ÷ 100) e n il numero di mesi. È la stessa equazione che le banche usano per prestiti casa, auto e personali.",
      },
      {
        q: "Perché gli interessi totali sono così alti all'inizio del prestito?",
        a: "Gli interessi di ogni mese si calcolano sul saldo residuo, che all'inizio è il massimo. Le rate iniziali sono quasi solo interessi e poco capitale; il mix si rovescia man mano che il saldo si restringe. Estinguere presto quindi risparmia molti più interessi che estinguere tardi.",
      },
      {
        q: "Commissioni e assicurazioni sono incluse nella rata?",
        a: "No. Spese di pratica, assicurazioni e eventuali variazioni di tasso variabile sono escluse — il risultato è la pura rata di ammortamento per il tasso che inserisci. La lettera di delibera del tuo istituto mostra l'importo finale da pagare.",
      },
    ],
  },
  "fuel-cost-calculator": {
    name: "Calcolatrice costi carburante",
    tagline:
      "Distanza, consumi e prezzo alla pompa: carburante necessario, costo del viaggio e costo al chilometro o al miglio — metrico o imperiale, con andata e ritorno.",
    intro: [
      "Pianifica qualsiasi viaggio prima di partire: inserisci la distanza, i consumi della tua auto (L/100 km o MPG) e il prezzo attuale del carburante, e vedi i litri o i galloni richiesti, il costo totale e il costo per unità di distanza — con un interruttore per l'andata e ritorno che ti raddoppia la distanza.",
      "Funziona altrettanto bene per i budget dei pendolari, per spartirsi un viaggio on the road tra amici o per confrontare il prezzo di una deviazione. La matematica gira in locale nel tuo browser, quindi funziona anche senza segnale al distributore.",
    ],
    steps: [
      "Inserisci la distanza di sola andata in chilometri o miglia.",
      "Aggiungi i consumi del tuo veicolo e il prezzo attuale del carburante.",
      "Attiva l'andata e ritorno se serve e leggi i totali di carburante e costo.",
    ],
    faqs: [
      {
        q: "Come converto tra L/100 km e MPG?",
        a: "Le due scale sono inverse: 235,2 diviso il valore in MPG dà i L/100 km (galloni US), quindi 30 MPG ≈ 7,8 L/100 km e 6 L/100 km ≈ 39,2 MPG. La calcolatrice accetta la cifra che mostra il tuo quadro strumenti.",
      },
      {
        q: "Perché il mio consumo reale differisce dal risultato?",
        a: "Le cifre ufficiali di consumo assumono velocità costanti. Traffico urbano, avviamenti a freddo, portabagagli sul tetto, accelerazioni brusche e aria condizionata possono spingere l'uso reale del 10–30% più in alto, quindi tratta la stima come un pavimento per i viaggi cittadini.",
      },
      {
        q: "La calcolatrice include pedaggi o manutenzione?",
        a: "No — prezza solo il carburante. Per un costo reale al chilometro, aggiungi i pedaggi e divide a parte le voci di usura (gomme, revisioni, svalutazione); molti automobilisti budgetano 5–10 centesimi al km in più oltre al carburante.",
      },
    ],
  },
  "gst-calculator": {
    name: "Calcolatrice GST",
    tagline:
      "Aggiunge o estrae la GST alle alíquote del 5%, 12%, 18% e 28% — importi netto, imposta e lordo calcolati dal vivo nel tuo browser.",
    intro: [
      "Inserisci qualsiasi importo e scegli una delle quattro fasce GST indiane per aggiungere l'imposta a un prezzo netto, oppure togli la GST già inclusa in un prezzo lordo (MRP). Tutte e tre le cifre — netto, imposta e lordo — si aggiornano mentre scrivi.",
      "Utile per fatture, controlli di addebito inverso, confronti di acquisti tra Stati con fasce diverse e per capire esattamente quanto di un prezzo esposto è imposta.",
    ],
    steps: [
      "Scrivi l'importo — netto se aggiungi la GST, lordo se la estrai.",
      "Scegli la fascia applicabile: 5%, 12%, 18% o 28%.",
      "Scegli Aggiungi imposta o Togli imposta e leggi le cifre netto, imposta e lordo.",
    ],
    faqs: [
      {
        q: "Quali sono le fasce GST in India?",
        a: "Le aliquote principali sono 5%, 12%, 18% e 28%: gli essenziali stanno tra lo 0 e il 5%, la maggior parte di beni e servizi tra il 12 e il 18%, e i beni di lusso o «peccaminosi» al 28% (a volte con una cess aggiuntiva). Lo strumento copre le quattro fasce standard.",
      },
      {
        q: "Come tolgo la GST da un prezzo tasse incluse?",
        a: "Scegli «Togli imposta» e inserisci l'importo lordo. La base si recupera come lordo ÷ (1 + aliquota/100), quindi un prezzo lordo di ₹118 al 18% di GST ha un netto di ₹100 e ₹18 di imposta.",
      },
      {
        q: "La GST è la stessa cosa dell'IVA?",
        a: "Entrambe sono imposte sul valore aggiunto applicate a ogni fase, ma la GST indiana è un'unica imposta unificata che assorbe accisa centrale, imposta sui servizi e IVA statale, divisa in CGST + SGST (intra-Stato) o IGST (inter-Stato). Altri Paesi chiamano il loro equivalente semplicemente IVA.",
      },
    ],
  },
  "loan-calculator": {
    name: "Calcolatrice prestito",
    tagline:
      "Vedi il quadro completo di un prestito: rata mensile, interessi totali e una tabella di ammortamento anno per anno con la divisione tra capitale e interessi.",
    intro: [
      "Tutto ciò che ti dà la vista della rata — pagamento mensile, interessi totali, rimborso totale — più un piano di ammortamento annuale che mostra esattamente quanto dei pagamenti di ogni anno è interesse e quanto è capitale, e quale saldo resta alla fine di ogni anno.",
      "È il modo più rapido di capire perché i versamenti extra nei primi anni valgono così tanto: la tabella rende impossibile non vedere gli anni più carichi di interessi.",
    ],
    steps: [
      "Inserisci l'importo del prestito, il tasso annuale e la durata in anni o mesi.",
      "Leggi la rata mensile, gli interessi totali e il rimborso totale.",
      "Scorri la tabella annuale per vedere capitale, interessi e saldo residuo per ogni anno.",
    ],
    faqs: [
      {
        q: "Che cos'è un piano di ammortamento?",
        a: "Uno scomposto periodo per periodo di un prestito a rata fissa. Ogni pagamento si divide negli interessi dovuti sul saldo corrente e nel capitale che estingue, e il saldo si restringe ogni mese. La tabella qui raggruppa quei mesi per anno.",
      },
      {
        q: "Come posso pagare meno interessi in totale?",
        a: "Tre leve: una durata più corta, un tasso più basso, o versamenti extra di capitale — soprattutto nel primo terzo del prestito, quando i saldi sono più alti. La tabella annuale mostra precisamente dove si concentrano gli interessi.",
      },
      {
        q: "Il piano assume che il tasso non cambi mai?",
        a: "Sì. Modella un prestito a tasso fisso per il tasso che inserisci. Per i prodotti a tasso variabile, ricalcola ogni volta che il parametro di riferimento si adegua — ogni aggiustamento cambia sia la rata sia il piano.",
      },
    ],
  },
  "percentage-calculator": {
    name: "Calcolatrice percentuale",
    tagline:
      "Tre problemi di percentuale in un unico strumento dal vivo: X% di Y, X è che percento di Y, e la variazione percentuale tra due valori.",
    intro: [
      "Le tre domande che la gente fa davvero: «quanto è il 15% di 200?», «30 è che percento di 150?» e «le vendite sono passate da 480 a 610 — di che percento?». Cambi modalità con un clic e la formula si adatta a ogni caso.",
      "La variazione percentuale porta il segno ed è etichettata come aumento o diminuzione, così un calo da 500 a 400 si legge chiaramente come −20%, non come un numero positivo che confonde.",
    ],
    steps: [
      "Scegli la modalità: X% di Y, X è che % di Y, o variazione %.",
      "Scrivi i due valori nelle due caselle.",
      "Leggi il risultato dal vivo — con la direzione etichettata per le variazioni.",
    ],
    faqs: [
      {
        q: "Come viene calcolata la variazione percentuale?",
        a: "(finale − iniziale) ÷ |iniziale| × 100. Il valore assoluto al denominatore fa sì che una variazione da −50 a −40 riporti correttamente +20% invece di −20%. La direzione inversa (400 → 500) dà +25% perché la base cambia.",
      },
      {
        q: "Perché un aumento del 20% seguito da un calo del 20% non fa zero?",
        a: "Le percentuali si applicano a basi diverse: 100 + 20% = 120, poi 120 − 20% = 96. La variazione netta è −4%. Questa asimmetria fa inciampare i confronti sui prezzi e i titoli dei giornali allo stesso modo.",
      },
      {
        q: "Posso usare numeri negativi o decimali?",
        a: "Sì. Entrambi gli input accettano negativi e decimali, quindi «−5% di 80» o i punti percentuali su una variazione di temperatura funzionano senza problemi.",
      },
    ],
  },
  "profit-calculator": {
    name: "Calcolatrice di profitto",
    tagline:
      "Costo e prezzo di vendita in ingresso: profitto o perdita, margine di profitto e ricarico in percentuale in uscita — i numeri dei prezzi che si confondono, in chiaro dal vivo.",
    intro: [
      "Inserisci quanto ti è costato un articolo e quanto lo vendi, e ottieni il profitto assoluto (o la perdita) più i due rapporti di cui ogni venditore ha bisogno: il margine — profitto in quota sul prezzo di vendita — e il ricarico — profitto in quota sul costo.",
      "Poiché i due rapporti usano denominatori diversi, un margine del 25% è un ricarico del 33,3%; lo strumento mostra entrambi insieme così fatture, preventivi e listini restano coerenti.",
    ],
    steps: [
      "Scrivi il prezzo di costo — quanto hai pagato.",
      "Scrivi il prezzo di vendita — quanto paga il cliente.",
      "Leggi profitto/perdita, margine e ricarico in percentuale.",
    ],
    faqs: [
      {
        q: "Qual è la differenza tra margine e ricarico?",
        a: "Il margine è profitto ÷ prezzo di vendita (quota del ricavo); il ricarico è profitto ÷ costo (importo aggiunto sopra il costo). Un prodotto comprato a 80 e venduto a 100 ha un margine del 20% e un ricarico del 25%. Confonderli riduce in silenzio il profitto che intendevi.",
      },
      {
        q: "Come fisso un prezzo a partire da un margine obiettivo?",
        a: "Dividi il costo per (1 − margine obiettivo): per un margine del 25% su un costo di 80, 80 ÷ 0,75 ≈ 106,67. Fissandolo con il ricarico invece (80 × 1,25 = 100) ti ritrovi solo un margine del 20%.",
      },
      {
        q: "La calcolatrice include commissioni e tasse?",
        a: "Lavora sui due numeri che inserisci, quindi commissioni di pagamento, spedizioni e tasse di vendita compaiono solo se li incorpori prima nel costo o nel prezzo. Per i prezzi tasse incluse, passa il numero nella calcolatrice IVA o GST.",
      },
    ],
  },
  "qr-generator": {
    name: "Generatore di codici QR",
    tagline:
      "Trasforma qualsiasi testo o URL in un codice QR nitido con dimensione, colori e livello di correzione errori regolabili — scarica come PNG o SVG.",
    intro: [
      "Incolla un link, una password Wi-Fi, un numero di telefono o qualsiasi testo e guarda il codice QR renderizzarsi dal vivo fino a 768 px. Scegli un livello di correzione errori da L (7%) a H (30%) perché il codice scansioni ancora quando stampato piccolo o parzialmente coperto, e scegli i colori del codice e dello sfondo per abbinarlo al tuo marchio.",
      "La codifica gira interamente nel tuo browser con la libreria qrcode — l'immagine viene generata sul tuo dispositivo e mai caricata. Scarica un PNG per gli schermi o un SVG indipendente dalla risoluzione per la stampa.",
    ],
    steps: [
      "Scrivi o incolla il testo o l'URL da codificare.",
      "Regola dimensione, livello di correzione errori e i due colori.",
      "Scarica il risultato come PNG (schermi) o SVG (stampa, qualsiasi dimensione).",
    ],
    faqs: [
      {
        q: "Quale livello di correzione errori scegliere?",
        a: "M (15%) è il default di tutti i giorni. Scegli H (30%) per codici che verranno stampati su tessuto, adesivi o sfondi affollati, o quando pensi di piazzare un logo al centro — più alto è il livello, più danni un codice sopravvive.",
      },
      {
        q: "I codici QR scadono o contengono tracciamento?",
        a: "No. Sono codici statici: il testo codificato vive nel pattern stesso e funziona per sempre senza alcun servizio dietro. Nessun redirect, nessun contatore di scansioni, nessuna analisi — i dati sono solo ciò che hai scritto.",
      },
      {
        q: "Il mio testo o URL viene caricato da qualche parte?",
        a: "No. La libreria qrcode gira dentro il tuo browser e renderizza su una canvas locale; né il testo né l'immagine generata lasciano mai il tuo dispositivo.",
      },
    ],
  },
  "qr-scanner": {
    name: "Lettore di codici QR",
    tagline:
      "Decodifica un codice QR da qualsiasi immagine o direttamente dalla fotocamera — letto in locale nel browser, con copia e apri come link e nessun upload.",
    intro: [
      "Trascina uno screenshot o la foto di un codice QR e il decodificatore lo legge direttamente sulla pagina, evidenziando gli angoli individuati sopra l'immagine. Se è un URL ottieni un pulsante copia più un link apribile con un clic; qualsiasi altro contenuto — credenziali WiFi, vCard, testo semplice — esce esattamente come codificato, pronto da copiare.",
      "Preferisci puntare la fotocamera verso il codice? La modalità dal vivo trasmette a un elemento video locale e analizza i fotogrammi in memoria finché uno non si decodifica, poi ferma subito la fotocamera. Poiché entrambe le vie girano interamente nel tuo browser, l'immagine o il flusso della fotocamera non vengono mai caricati su nessun server, e nulla viene registrato.",
    ],
    steps: [
      "Scegli la scheda «Da un'immagine» e trascina la foto del codice QR, oppure passa a «Fotocamera dal vivo».",
      "Per la fotocamera, premi Avvia fotocamera, concedi il permesso e punta verso il codice.",
      "Leggi il testo decodificato nella scheda del risultato.",
      "Copialo, oppure aprilo direttamente se sembra un link.",
    ],
    faqs: [
      {
        q: "Le mie immagini o i fotogrammi della fotocamera lasciano il dispositivo?",
        a: "No. La decodifica gira su questa pagina con la libreria jsqr, in JavaScript: le immagini caricate vengono lette dai loro pixel locali e i fotogrammi della fotocamera vengono disegnati su una canvas in memoria e analizzati lì. Nulla viene caricato, registrato o salvato, e il flusso della fotocamera si ferma appena un codice viene trovato o premi stop.",
      },
      {
        q: "La fotocamera non parte — cosa c'è che non va?",
        a: "Il più delle volte il browser ha bloccato il permesso della fotocamera per questo sito; permettilo dalla barra degli indirizzi e premi di nuovo avvia. La scansione dal vivo richiede anche una pagina https sicura, e se il dispositivo non ha proprio una fotocamera lo strumento te lo dice invece di fallire in silenzio.",
      },
      {
        q: "Che tipi di contenuto QR riesce a leggere?",
        a: "Qualsiasi codice QR standard: URL, testo semplice, numeri di telefono, stringhe di connessione WiFi, contatti vCard, stringhe di pagamento UPI o PIX e altro. Lo strumento mostra il contenuto decodificato grezzo — per i codici WiFi o di pagamento, copia il testo nell'app che consuma quel formato.",
      },
    ],
  },
  "random-name-picker": {
    name: "Estrattore di nomi casuale",
    tagline:
      "Incolla il tuo elenco, gira la ruota e lascia che un'estrazione casuale crittografica scelga il vincitore — equo per classi, lotterie e stand-up di squadra.",
    intro: [
      "Scrivi o incolla un elenco di nomi, uno per riga, e la ruota si riempie con un settore colorato per ciascuno. Premi SPIN e decelera per qualche secondo prima di fermarsi sul vincitore, annunciato in caratteri grandi con un pulsante copia. Due opzioni coprono i bisogni consueti: togliere i nomi duplicati prima dell'estrazione e togliere il vincitore dopo ogni estrazione così nessuno vince due volte.",
      "L'estrazione vera e propria non è l'animazione — il vincitore viene sorteggiato dal generatore casuale crittografico del browser prima ancora che la ruota parta, quindi ogni nome ha esattamente la stessa probabilità. Una cronologia delle estrazioni della sessione tiene il conto di chi è già stato scelto, comodo quando stai scorrendo una classe o una fila di premi.",
    ],
    steps: [
      "Incolla i tuoi nomi nella casella, uno per riga (da 2 a 100 nomi).",
      "Attiva la rimozione dei duplicati, o dei vincitori passati, se ti servono.",
      "Premi SPIN e aspetta che la ruota si fermi.",
      "Leggi il vincitore, copia il nome se ti serve e controlla la cronologia delle estrazioni qui sotto.",
    ],
    faqs: [
      {
        q: "Quanto è casuale l'estrazione, davvero?",
        a: "Il vincitore viene scelto con crypto.getRandomValues, il generatore casuale crittografico del browser, usando il campionamento per rifiuto per evitare la distorsione del modulo. È la stessa sorgente che i browser usano per le chiavi di sicurezza — non una scorciatoia pseudo-casuale — quindi ogni voce ha una probabilità identica. L'animazione della ruota si ferma sul vincitore già estratto; non può cambiare il risultato.",
      },
      {
        q: "Quanti nomi può contenere la ruota?",
        a: "Da 2 fino a 100. I nomi vengono troncati con i puntini di sospensione sulla ruota così i settori restano leggibili, ma la scheda del vincitore mostra sempre il nome completo. Oltre i 60 nomi circa le etichette spariscono del tutto dalla ruota — l'estrazione resta comunque esatta.",
      },
      {
        q: "Posso estrarre più vincitori di fila?",
        a: "Sì. Attiva «Togli il vincitore dopo ogni estrazione» e ogni scelta esce automaticamente dall'elenco, così nessuno viene pescato due volte. Il pannello della cronologia qui sotto registra ogni estrazione della sessione, in ordine, con la data e l'ora.",
      },
    ],
  },
  "roman-numeral": {
    name: "Convertitore di numeri romani",
    tagline:
      "Converte numeri in numeri romani e viceversa, in entrambe le direzioni insieme — con una valida classica rigorosa della notazione sottrattiva.",
    intro: [
      "Scrivi un numero arabo (1–3999) e vedi la sua forma romana, oppure scrivi un numero romano e ottieni il numero — entrambi i campi sono dal vivo, quindi puoi correggere da entrambi i lati. Il parser impone le regole classiche: I prima di V/X, X prima di L/C, C prima di D/M.",
      "Comodo per quadranti di orologio, capitoli di libri, anni dei film, iscrizioni su monumenti e numeri del Super Bowl — ovunque i numeri romani compaiono ancora.",
    ],
    steps: [
      "Inserisci un numero tra 1 e 3999 per ottenere il suo numero romano.",
      "Oppure scrivi un numero romano — il numero compare all'istante.",
      "Le forme non valide come VIIII o IM vengono segnalate con una spiegazione delle regole.",
    ],
    faqs: [
      {
        q: "Perché 4000 è il limite superiore (MMMCMXCIX)?",
        a: "La notazione romana classica non ha una cifra più grande di M (1000), e ripetere M quattro volte (MMMM) non si usava. Il numero più grande esprimibile in forma classica rigorosa è 3999, scritto MMMCMXCIX.",
      },
      {
        q: "Perché VIIII viene rifiutato se gli orologi a volte lo mostrano?",
        a: "Alcuni quadranti usano l'additivo IIII per il quattro, ma il sistema classico standard richiede il sottrattivo IV. Questo strumento valida contro la regex canonica rigorosa, quindi VIIII, IC o IM vengono segnalati invece di convertiti in silenzio.",
      },
      {
        q: "Il convertitore accetta lettere minuscole?",
        a: "Sì — input come mcmxciv viene messo in maiuscolo automaticamente e convertito in 1994. L'output viene sempre mostrato in maiuscolo, come tradizionalmente le iscrizioni.",
      },
    ],
  },
  "scientific-calculator": {
    name: "Calcolatrice scientifica",
    tagline:
      "Una calcolatrice scientifica completa nel tuo browser: trigonometria, log, ln, potenze e radici con risultato dal vivo — niente eval, niente server, niente tracciamento.",
    intro: [
      "Un tastierino più una riga di espressione scrivibile a mano: sin, cos, tan (DEG/RAD), log₁₀, ln, radice quadrata, quadrati, potenze arbitrarie, parentesi, π ed e. L'anteprima del risultato si aggiorna mentre scrivi, e = la riassorbe nell'espressione per i calcoli a catena.",
      "Le espressioni vengono analizzate da un valutatore ricorsivo discendente scritto a mano per questo sito — l'eval e il costruttore Function di JavaScript non vengono mai usati, e nulla viene inviato da nessuna parte. La moltiplicazione implicita (2π, 3(4+1)) funziona da subito.",
    ],
    steps: [
      "Tocca il tastierino o scrivi un'espressione con la tastiera.",
      "Attiva DEG/RAD per le funzioni trigonometriche secondo necessità.",
      "Premi = per confermare il risultato in anteprima, poi continua a calcolarci sopra.",
    ],
    faqs: [
      {
        q: "Come vengono valutate le espressioni?",
        a: "Con un piccolo tokenizer e un parser ricorsivo discendente scritto dentro la pagina: numeri, costanti, funzioni, parentesi, meno unario, % e x² in postfisso, potenze associative a destra e moltiplicazione implicita tra valori adiacenti. Un input non valido mostra semplicemente un errore invece di eseguire qualsiasi cosa.",
      },
      {
        q: "Come ottengo la tangente di 45 gradi?",
        a: "Lascia attivo l'interruttore DEG (è il default), premi tan, poi 45 e =. Per i radianti — per esempio tan(π/4) — passa a RAD e scrivi tan(π/4) direttamente.",
      },
      {
        q: "Perché il mio risultato appare con poche cifre?",
        a: "I risultati vengono arrotondati a 12 cifre significative per nascondere il rumore della virgola mobile come 0,30000000000000004. Una precisione oltre le 12 cifre è comunque raramente significativa sull'hardware binario a virgola mobile.",
      },
    ],
  },
  "timestamp-converter": {
    name: "Convertitore di timestamp Unix",
    tagline:
      "Converte secondi o millisecondi Unix in date umane e viceversa, con orologio dal vivo, output in fuso locale e UTC — tutto nel tuo browser.",
    intro: [
      "Un contatore dal vivo mostra il timestamp Unix corrente in secondi e millisecondi con copia a un clic. Incolla un timestamp e viene decodificato nel tuo ora locale e in UTC — i valori a 10 cifre vengono letti come secondi, quelli a 13 cifre come millisecondi, automaticamente.",
      "Nell'altra direzione, scegli una data e un'ora per ottenere il suo timestamp esatto. Tutto viene calcolato in locale dall'orologio del tuo dispositivo; i timestamp sono indipendenti dal fuso per definizione, quindi i numeri sono gli stessi ovunque sulla Terra.",
    ],
    steps: [
      "Copia il timestamp corrente dal vivo, oppure incollane uno nel campo di decodifica.",
      "Leggi le date umane locale e UTC; secondi contro millisecondi viene rilevato automaticamente.",
      "Oppure scegli una data-ora per ottenere il suo timestamp Unix in secondi e millisecondi.",
    ],
    faqs: [
      {
        q: "Che cos'è esattamente un timestamp Unix?",
        a: "Il numero di secondi trascorsi dal 1970-01-01 00:00:00 UTC, senza contare i secondi intercalari. È il modo standard in cui i computer conservano i momenti nel tempo perché ordinare e sottrarre diventano banali. I timestamp in millisecondi (13 cifre) sono comuni in JavaScript e Java.",
      },
      {
        q: "Come fa lo strumento a sapere se il mio numero è in secondi o millisecondi?",
        a: "Dalla grandezza: valori sotto 1.000 miliardi non possono descrivere una data moderna in millisecondi, quindi vengono letti come secondi; i valori a 13 cifre vengono letti come millisecondi. Il risultato dichiara quale interpretazione è stata applicata.",
      },
      {
        q: "Lo stesso timestamp si decodifica diversamente in altri fusi orari?",
        a: "Il numero grezzo non cambia mai — codifica un istante assoluto. Cambia solo la resa leggibile dall'umano, ed è per questo che lo strumento mostra il tuo ora locale e UTC affiancate.",
      },
    ],
  },
  "timezone-converter": {
    name: "Convertitore di fusi orari",
    tagline:
      "Confronta gli orari tra 21 grandi città con orologi dal vivo e una tabella ora per ora — ora legale gestita esattamente, tutto gira nel tuo browser.",
    intro: [
      "Scegli due città qualsiasi, da Los Angeles a Tokyo, e vedi entrambi gli orologi dal vivo affiancati, la differenza esatta di scostamento per oggi e una tabella di confronto a 24 righe che mostra cosa diventa ogni ora del giorno nell'altra città — il modo più rapido di trovare una fascia oraria per una riunione.",
      "La conversione usa il database dei fusi orari IANA integrato nel tuo browser, quindi i passaggi all'ora legale cadono sul minuto corretto senza alcuna chiamata di rete.",
    ],
    steps: [
      "Scegli la città di partenza — il suo orologio locale dal vivo compare qui sotto.",
      "Scegli la città di destinazione; l'orologio e lo scostamento UTC si aggiornano all'istante.",
      "Scorri la tabella ora per ora per trovare gli orari che funzionano per entrambi.",
      "Usa il pulsante di scambio per invertire le due città.",
    ],
    faqs: [
      {
        q: "Il convertitore gestisce l'ora legale?",
        a: "Sì. Gli scostamenti vengono calcolati con le regole IANA del browser stesso per la data di oggi, quindi una città attualmente in ora legale mostra il suo scostamento corretto e la tabella oraria rispecchia gli orologi reali da entrambi i lati.",
      },
      {
        q: "Perché la tabella oraria mostra una data diversa in alcune righe?",
        a: "Quando le città sono lontane, la data di calendario di un lato cambia durante la giornata. Ogni riga mostra la data della destinazione accanto all'orario così vedi quando, per esempio, le 9:00 di Shanghai sono ancora le 21:00 della sera precedente a New York.",
      },
      {
        q: "Questo strumento ha bisogno di internet?",
        a: "No. Gli orari delle città vengono dal database dei fusi orari integrato nel tuo browser e dall'orologio del tuo dispositivo — nulla viene scaricato e nessuna posizione viene condivisa.",
      },
    ],
  },
  "tip-calculator": {
    name: "Calcolatrice mancia",
    tagline:
      "Conto più percentuale di mancia più divisione tra amici: vedi la mancia, il totale e esattamente quanto deve ciascuno — dal vivo, senza matematica al tavolo.",
    intro: [
      "Inserisci il conto, tocca una mancia preimpostata (10/15/18/20/25%) o scrivi la tua, e dì in quante persone si divide. Ottieni subito l'importo della mancia, il totale generale e la quota a testa, così nessuno fa calcoli a mente mentre il cameriere aspetta.",
      "Tutto si ricalcola dal vivo mentre i numeri cambiano, funziona con qualsiasi valuta e gira interamente sul tuo dispositivo — comodo all'estero, dove la tua connessione può essere l'unica affidabile.",
    ],
    steps: [
      "Scrivi l'importo del conto.",
      "Scegli una mancia preimpostata o inserisci una percentuale personalizzata.",
      "Imposta il numero di persone e leggi la quota a testa.",
    ],
    faqs: [
      {
        q: "Quanta mancia si lascia?",
        a: "Dipende da dove ti trovi: il 15–20% del conto pre-tasse è consueto negli Stati Uniti, il 10–15% in gran parte d'Europa e America Latina, e arrotondare al rialzo è normale in Giappone e Cina dove la mancia non è attesa. Nel dubbio, un preset del 10% ti tiene al sicuro quasi ovunque.",
      },
      {
        q: "La mancia si calcola prima o dopo le tasse?",
        a: "Il galateo tradizionale dice sulla cifra pre-tasse, ma in pratica la maggior parte delle persone mancia sul totale che mostra la ricevuta della carta. Se vuoi essere preciso, inserisci la cifra pre-tasse come conto e aggiungi le tasse a parte per la divisione.",
      },
      {
        q: "La cifra a testa assume una divisione equa?",
        a: "Sì — il conto più la mancia viene diviso uniformemente per il numero di persone. Per quote disuguali (qualcuno ha preso solo l'insalata), calcola prima i piatti condivisi come subtotale e aggiungi i singoli sopra.",
      },
    ],
  },
  "vat-calculator": {
    name: "Calcolatrice IVA",
    tagline:
      "Aggiunge l'IVA a un prezzo netto o la estrae da un prezzo lordo a qualsiasi aliquota personalizzata — importi netto, IVA e lordo dal vivo, privi di upload e istantanei.",
    intro: [
      "Funziona in entrambe le direzioni per l'aliquota di qualsiasi Paese: scrivi 20 per il Regno Unito, 21 per i Paesi Bassi, 19 per la Germania — o qualsiasi aliquota. Aggiungi l'imposta a una cifra netta, oppure recupera l'IVA nascosta dentro un prezzo lordo (tasse incluse).",
      "Tutto viene calcolato in locale nel tuo browser — nessun upload, nessun account — il che lo rende adatto a bozze di prezzi e fatture non ancora pubblicate.",
    ],
    steps: [
      "Scrivi l'importo — netto se aggiungi l'IVA, lordo se la togli.",
      "Inserisci la tua aliquota IVA in percentuale (per esempio 20).",
      "Scegli Aggiungi imposta o Togli imposta; netto, IVA e lordo compaiono all'istante.",
    ],
    faqs: [
      {
        q: "Come calcolo l'IVA all'indietro da un prezzo lordo?",
        a: "Netto = lordo ÷ (1 + aliquota ÷ 100). Per un prezzo lordo di 120 € al 20% di IVA: 120 ÷ 1,2 = 100 € netto, 20 € di IVA. La modalità «Togli imposta» lo fa per te e mostra tutte e tre le cifre.",
      },
      {
        q: "Qual è la differenza tra IVA e GST?",
        a: "Sono lo stesso tipo di imposta — valore aggiunto a ogni fase della filiera, alla fine a carico del consumatore. «IVA» è il nome comune in Europa, nel Regno Unito e in gran parte di Africa e Asia; l'India e qualche altro Paese chiamano la loro versione unificata GST.",
      },
      {
        q: "Quale aliquota IVA usare?",
        a: "Quella che si applica ai tuoi beni o servizi e alla tua giurisdizione: le aliquote standard vanno dal 0% al 27% nel mondo, e la maggior parte dei Paesi ha anche aliquote ridotte per alimenti, libri o medicinali. Nel dubbio, controlla la tabella aggiornata della tua autorità fiscale.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* Sviluppo / Utilità — CSV ⇄ Excel, contrasto, voti                   */
  /* ------------------------------------------------------------------ */
  "csv-to-excel": {
    name: "Da CSV a Excel",
    tagline:
      "Converti un CSV in un vero file .xlsx direttamente nel browser: delimitatore (virgola, punto e virgola o tabulazione) rilevato automaticamente, virgolette e a-capo preservati.",
    intro: [
      "Incolla un CSV o trascina un file .csv e scarica una vera cartella di lavoro Excel, non un file di testo con estensione rinominata. Il motore segue la RFC 4180: campi tra virgolette, virgolette raddoppiate e a-capo dentro le celle vengono letti correttamente, e i numeri puliti (9.5, -3, 0) diventano vere celle numeriche.",
      "La prima riga è trattata come intestazione (disattivabile: verrà generata Column 1…N), il nome del foglio è libero e ID come 007 restano testo per non perdere gli zeri iniziali. Nulla lascia il tuo dispositivo.",
    ],
    steps: [
      "Incolla il CSV nella casella o trascina un file .csv.",
      "Controlla il delimitatore rilevato e l'opzione della riga di intestazione.",
      "Cambia il nome del foglio se Sheet1 non ti convince.",
      "Scarica il .xlsx e aprilo in Excel, Numbers o Google Sheets.",
    ],
    faqs: [
      {
        q: "I miei numeri diventeranno numeri veri in Excel?",
        a: "Sì: le celle con un letterale numerico pulito (9.5, -3, 0) vengono scritte come celle numeriche, così SOMMA e grafici funzionano subito. Valori come 007 o 1e3 restano volutamente testo, perché convertirli ne cambierebbe il significato.",
      },
      {
        q: "Il mio CSV usa il punto e virgola, devo configurare qualcosa?",
        a: "No. Il delimitatore viene rilevato contando i candidati fuori dai campi tra virgolette; puoi anche sceglierlo a mano. Virgole interne, virgolette raddoppiate e a-capo nelle celle sono conservati integralmente.",
      },
    ],
  },
  "excel-to-csv": {
    name: "Da Excel a CSV",
    tagline:
      "Trasforma qualsiasi cartella .xlsx o .xls in CSV pulito: scegli foglio e delimitatore e scarica. Virgolette, virgole e a-capo correttamente escaped, tutto in locale.",
    intro: [
      "Trascina un file .xlsx, .xlsm o .xls e ottieni un CSV conforme alla RFC 4180. Se la cartella contiene più fogli, scegli quale esportare — un CSV non può contenerne diversi, quindi un foglio per file è la corrispondenza onesta. I numeri escono con il valore mostrato dal foglio.",
      "L'output mette le virgolette solo dove servono, raddoppia quelle interne e conserva gli a-capo nelle celle: il risultato si reimporta in Excel, database e script senza sorprese. Copialo direttamente o scaricalo in UTF-8 con BOM perché Excel riconosca la codifica.",
    ],
    steps: [
      "Trascina il file .xlsx, .xlsm o .xls nella zona di rilascio.",
      "Se ci sono più fogli, scegli quello da esportare.",
      "Scegli virgola, punto e virgola o tabulazione come delimitatore.",
      "Copia il CSV o scaricalo come .csv UTF-8.",
    ],
    faqs: [
      {
        q: "Quale foglio viene convertito?",
        a: "Il primo per impostazione predefinita. Se la cartella ne contiene diversi, sopra l'anteprima compare un selettore; ogni esportazione copre esattamente un foglio, perché il formato CSV non può archiviarne altri.",
      },
      {
        q: "Cosa succede a formule e formattazione?",
        a: "Ottieni gli ultimi valori calcolati così come la cella li mostra — non le formule. Una cella che mostra 1.234,50 viene esportata con quel valore, e i formati come i simboli valutari restano come visualizzati.",
      },
    ],
  },
  "contrast-checker": {
    name: "Verificatore di contrasto",
    tagline:
      "Calcola il rapporto di contrasto WCAG tra due colori con esiti AA e AAA per testo normale e grande, più un'anteprima dal vivo. Tutto avviene nel tuo browser.",
    intro: [
      "Inserisci un colore di primo piano e uno di sfondo — hex come #333 o #1F2937, oppure rgb()/rgba() — e leggi il rapporto di contrasto WCAG con due decimali, con l'esito immediato dei quattro soglie che contano: AA e AAA, testo normale e grande. Un'anteprima dal vivo mostra un paragrafo e un titolo nei colori reali.",
      "Il calcolo usa la formula ufficiale della luminanza relativa di WCAG 2.x — la stessa del verificatore del W3C — quindi un 4.5 qui è un 4.5 ovunque. Tra i preset c'è una coppia grigia a 4.54:1 che mostra quanto è stretta la soglia AA.",
    ],
    steps: [
      "Digita un valore hex o rgb(), o usa il selettore, per il primo piano.",
      "Fai lo stesso per il colore di sfondo.",
      "Leggi il rapporto e gli esiti AA / AAA, o tocca un preset.",
      "Giudica l'abbinamento con i tuoi occhi nel blocco di anteprima.",
    ],
    faqs: [
      {
        q: "Quale rapporto di contrasto serve per passare?",
        a: "Secondo WCAG 2.x: il testo normale richiede 4.5:1 per AA e 7:1 per AAA. Il testo grande — almeno 24 px, o 18.7 px in grassetto — richiede 3:1 per AA e 4.5:1 per AAA. I componenti di interfaccia e la grafica richiedono 3:1.",
      },
      {
        q: "Come si calcola il rapporto?",
        a: "Ogni colore è linearizzato da sRGB e combinato nella luminanza relativa L = 0.2126·R + 0.7152·G + 0.0722·B; il rapporto è (L chiaro + 0.05) / (L scuro + 0.05), la formula esatta della specifica WCAG 2.x. Un alfa rgba() inferiore a 1 viene appiattito sul bianco prima del calcolo.",
      },
    ],
  },
  "grade-calculator": {
    name: "Calcolatore di voti",
    tagline:
      "Calcolatore di voti ponderato o a punti: aggiungi le verifiche, segui media e lettera in tempo reale e scopri esattamente cosa devi prendere all'esame finale.",
    intro: [
      "Aggiungi ogni verifica con voto, massimo e (in modalità ponderata) peso percentuale: media e lettera si aggiornano in diretta. La modalità a punti guarda solo punti guadagnati su punti possibili, come valutano molti corsi scientifici.",
      "Il calcolatore dell'esame finale risponde alla domanda che conta davvero: se il finale vale X% o X punti, quanto devi prendere per l'obiettivo? Ti dice senza giri di parole quando l'obiettivo è già assicurato o matematicamente fuori portata, e la scala è cambiabile: A–F a 10 livelli, con ±, idoneo / non idoneo o soglie personalizzate.",
    ],
    steps: [
      "Aggiungi una riga per verifica: nome (facoltativo), voto, massimo e peso in modalità ponderata.",
      "Passa tra Ponderata e Punti secondo come valuta il tuo corso.",
      "Inserisci peso o punti dell'esame finale e la percentuale obiettivo.",
      "Leggi il voto finale richiesto, o scegli la scala che ti serve.",
    ],
    faqs: [
      {
        q: "Qual è la differenza tra modalità ponderata e a punti?",
        a: "Quella ponderata assegna a ogni verifica un peso percentuale e calcola Σ(peso × voto ÷ massimo) ÷ Σpesi. Quella a punti ignora i pesi e divide i punti guadagnati per i punti possibili: un compito 90/100 vale lì come un quiz 45/50, in ponderata solo quanto dice il suo peso.",
      },
      {
        q: "E se i miei pesi non fanno 100%?",
        a: "Nessun problema. La media attuale è normalizzata sui pesi inseriti davvero, quindi anche un corso valutato a metà mostra un numero giusto. Il calcolo del finale impila il peso dell'esame sopra il peso già valutato, come prevede il programma. Sopra il 100% l'obiettivo è irraggiungibile, sotto zero è già assicurato.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* Immagini                                                            */
  /* ------------------------------------------------------------------ */
  "image-border": {
    name: "Bordo immagine",
    tagline:
      "Aggiungi un bordo a tinta unita o trasparente a un'immagine o a un intero lotto — anteprima dal vivo, output PNG o JPG, gira interamente nel tuo browser.",
    intro: [
      "Un bordo incornicia screenshot, scatti di prodotto e avatar senza aprire un editor. Trascina un'immagine o un intero lotto, tira il cursore della larghezza e scegli lo stile del margine: la tela si espande verso l'esterno, senza che un solo pixel dell'originale venga ritagliato o riscalato.",
      "Il riempimento trasparente tiene la cornice trasparente nell'output PNG — utile per sticker e ritagli su qualsiasi sfondo. Un colore pieno funziona ovunque, JPG compreso, e ogni file viene elaborato sul tuo dispositivo.",
    ],
    steps: [
      "Trascina un'immagine o un intero lotto.",
      "Tira il cursore della larghezza del bordo e guarda l'anteprima dal vivo.",
      "Scegli riempimento trasparente o un colore pieno, e output PNG o JPG.",
      "Aggiungi il bordo a tutte le immagini e scarica ogni risultato, o prendi tutto in uno ZIP.",
    ],
    faqs: [
      {
        q: "Il bordo riduce o ritaglia la mia immagine?",
        a: "No. La tela cresce del doppio della larghezza del bordo — un bordo per lato — e la tua immagine viene piazzata dentro a dimensione piena. Nulla viene ritagliato, riscalato o spostato.",
      },
      {
        q: "Quando conviene un bordo trasparente?",
        a: "Il riempimento trasparente ha senso solo nell'output PNG: la cornice resta trasparente e l'immagine funziona su qualsiasi sfondo. Il JPG non ha canale alpha, quindi lì il bordo viene riempito con il colore pieno scelto.",
      },
      {
        q: "Perché il JPG non è disponibile con riempimento trasparente?",
        a: "Il JPG non può memorizzare la trasparenza — salvando, la cornice diventerebbe bianca. Lo strumento passa automaticamente al PNG quando è selezionato il riempimento trasparente; scegli l'opzione Colore se vuoi un JPG.",
      },
    ],
  },
  "image-splitter": {
    name: "Dividi immagine",
    tagline:
      "Taglia un'immagine in una griglia regolare di righe × colonne di tessere PNG — anteprima della griglia dal vivo, download ZIP, tutto in locale nel browser.",
    intro: [
      "Ritaglia una grande immagine in tessere a griglia per griglie Instagram, impaginazioni a stampa, sprite sheet o passaggi di una presentazione. Scegli da 2 a 6 righe e da 2 a 6 colonne, guarda la griglia agganciarsi alla tua immagine, poi esporta ogni tessera come PNG senza perdita.",
      "Le tessere ricavate dalla stessa immagine conservano le loro posizioni in pixel, così si ricompongono alla perfezione. Quando la dimensione non divide esatto, le tessere regolari prendono misure a pixel interi e l'ultima riga e colonna assorbono i pixel residui — nulla viene allungato.",
    ],
    steps: [
      "Trascina un'immagine.",
      "Imposta il numero di righe e colonne (2–6 ciascuna) — l'anteprima mostra la griglia.",
      "Taglia in tessere e controlla ogni pezzo.",
      "Scarica le tessere una a una o tutte insieme in uno ZIP.",
    ],
    faqs: [
      {
        q: "Cosa succede se la dimensione non è divisibile per la griglia?",
        a: "Le tessere regolari misurano floor(larghezza ÷ colonne) × floor(altezza ÷ righe) pixel, e l'ultima riga e colonna assorbono il resto. Un'immagine di 305 × 205 in 3 colonne × 2 righe dà tessere di 101 × 102 px, con l'ultima colonna larga 103 px. Ogni tessera ha un numero intero di pixel — nessun allungamento, nessun vuoto.",
      },
      {
        q: "In che ordine sono nominate le tessere?",
        a: "Riga per riga, da sinistra a destra: foto-r1c1.png, foto-r1c2.png … foto-r3c4.png. Il suffisso rNcM dice esattamente dove si trova ogni tessera, così ricomporre è banale.",
      },
      {
        q: "Perché output PNG?",
        a: "Il PNG è senza perdita: le tessere conservano i pixel esatti della sorgente. Conta quando i pezzi verranno ricomposti o usati come sprite.",
      },
    ],
  },
  "crop-circle-image": {
    name: "Ritaglio circolare",
    tagline:
      "Ritaglia un'immagine o un intero lotto in un cerchio centrato con angoli trasparenti — cursore di riduzione, anteprima dal vivo, output PNG senza perdita.",
    intro: [
      "Avatar circolari, foto profilo, badge e sticker iniziano tutti con un ritaglio circolare. Lo strumento centra un cerchio su ogni immagine, mantiene l'interno e scarta gli angoli come trasparenza — il diametro parte dal lato più corto, e un cursore lo riduce in percentuale se vuoi margine.",
      "L'output è sempre PNG così gli angoli restano davvero trasparenti, non bianchi. Trascina un intero lotto per convertire molte immagini in una volta, guarda l'anteprima dal vivo della prima e scarica ogni cerchio separatamente.",
    ],
    steps: [
      "Trascina un'immagine o un intero lotto.",
      "Tira il cursore di riduzione se vuoi il cerchio più piccolo del lato corto intero.",
      "Controlla l'anteprima dal vivo della prima immagine.",
      "Ritaglia tutte le immagini in cerchi e scarica ogni PNG.",
    ],
    faqs: [
      {
        q: "Cosa determina la dimensione del cerchio?",
        a: "Per impostazione predefinita il diametro è uguale al lato più corto dell'immagine: un'immagine quadrata diventa un cerchio pieno e una rettangolare viene ritagliata sul più grande cerchio centrato che ci sta. Il cursore di riduzione riduce quel diametro in percentuale.",
      },
      {
        q: "Gli angoli sono bianchi?",
        a: "No — l'output è PNG con un vero canale alpha, quindi l'area fuori dal cerchio è totalmente trasparente e il risultato si posa pulito su qualsiasi sfondo.",
      },
      {
        q: "La mia immagine viene ricodificata e degrada?",
        a: "I pixel dentro il cerchio vengono copiati così come sono in un PNG senza perdita. Sparisce solo l'area esterna; nulla all'interno viene riscalato o ricompresso.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* Sviluppo                                                            */
  /* ------------------------------------------------------------------ */
  "base64-image": {
    name: "Immagine Base64",
    tagline:
      "Converti immagini in data URL base64 e viceversa — anteprima, validazione, download, con un confronto preciso delle dimensioni. Tutto nel tuo browser.",
    intro: [
      "Trascina un PNG, JPEG, GIF, WebP o SVG e ottieni all'istante un data:image/…;base64,… pronto da incollare in CSS, HTML o JSON inline. Lo strumento mostra la dimensione del file originale accanto a quella del testo risultante, così vedi l'overhead del ~33% del base64 prima di decidere di incorporare.",
      "Incolla un data URL e la vista inversa lo decodifica: l'immagine viene mostrata in anteprima, il MIME dichiarato viene confrontato con i byte reali e un pulsante lo salva di nuovo come file. Un base64 non valido o un tipo che non è un'immagine fallisce con un messaggio chiaro invece di un'anteprima rotta.",
    ],
    steps: [
      "Trascina un'immagine nel pannello (o incollane una dagli appunti) per codificarla.",
      "Copia il data URL — o solo il base64 — e controlla il confronto delle dimensioni prima di incorporarlo.",
      "Passa alla scheda di decodifica, incolla qualsiasi data URL di immagine, poi visualizzala in anteprima o scaricala.",
    ],
    faqs: [
      {
        q: "Quando conviene incorporare un'immagine come data URL?",
        a: "Per piccole icone, avatar e segnaposto di caricamento. Il base64 rende il testo ~33% più grande del file binario, quindi sotto un paio di kilobyte di solito risparmi una richiesta HTTP complessivamente; per le foto l'overhead quasi sempre pesa più del beneficio.",
      },
      {
        q: "Perché la versione base64 è più grande del mio file?",
        a: "Il base64 codifica ogni 3 byte come 4 caratteri di testo — un gonfiore fisso del 33%, più il prefisso data:image/…;base64,. Nulla viene compresso o perso: è semplicemente una rappresentazione testuale degli stessi byte.",
      },
      {
        q: "Quali formati accetta il decodificatore?",
        a: "Tutto ciò che il tuo browser sa mostrare come immagine: PNG, JPEG, GIF, WebP, SVG, BMP, AVIF e altri. Lo strumento verifica che il payload sia base64 valido, che il MIME dichiarato sia di tipo immagine e ti avvisa quando i magic byte del file non corrispondono al tipo dichiarato.",
      },
    ],
  },
  "html-to-markdown": {
    name: "HTML in Markdown",
    tagline:
      "Trasforma l'HTML in Markdown pulito mentre scrivi — titoli, elenchi, link, immagini e codice, con titoli ATX o Setext e il simbolo di elenco che preferisci.",
    intro: [
      "Incolla il markup di una pagina web, di un'esportazione da CMS o di un'email e ottieni subito Markdown leggibile. La conversione è affidata a turndown, la libreria di riferimento da HTML a Markdown: titoli, enfasi, link, immagini, elenchi ordinati e non, citazioni e blocchi di codice trovano tutti il loro equivalente Markdown.",
      "Due piccole opzioni coprono la maggior parte delle guide di stile: titoli in stile ATX (# Titolo) o Setext (sottolineati) e la scelta di -, * o + come simbolo per gli elenchi non ordinati. Il risultato si aggiorna dal vivo mentre scrivi o cambi un'opzione.",
    ],
    steps: [
      "Incolla il tuo HTML nel pannello di input.",
      "Il Markdown appare dal vivo — ritocca lo stile dei titoli o il simbolo se la tua guida di stile preferisce altro.",
      "Copia il Markdown o scaricalo come file .md.",
    ],
    faqs: [
      {
        q: "Quale HTML viene convertito e cosa succede al resto?",
        a: "Il markup standard dei documenti — titoli, paragrafi, elenchi, link, immagini, enfasi, codice, citazioni e linee orizzontali — viene convertito per intero. Gli elementi senza equivalente Markdown, come tabelle e moduli, vengono appiattiti nel loro contenuto testuale.",
      },
      {
        q: "Qual è la differenza tra titoli ATX e Setext?",
        a: "ATX scrive i titoli con cancelletti iniziali (## Titolo); Setext li sottolinea con === per H1 o --- per H2. Setext supporta solo due livelli, quindi i titoli più profondi ricadono sempre sui cancelletti ATX.",
      },
      {
        q: "Il mio HTML esce dal browser?",
        a: "No. La conversione gira in locale con turndown nel tuo browser — nulla viene caricato, nemmeno quando scarichi il file .md.",
      },
    ],
  },
  "xml-to-json": {
    name: "XML in JSON",
    tagline:
      "Converti XML in JSON nel tuo browser — gli attributi diventano chiavi @, gli elementi ripetuti array e l'input malformato riceve un errore chiaro per riga.",
    intro: [
      "Incolla voci di sitemap, elementi RSS, risposte SOAP o file di configurazione e ottieni all'istante JSON formattato. La conversione usa fast-xml-parser preservando gli attributi: ogni attributo resta una chiave con prefisso @, gli elementi fratelli ripetuti si raccolgono in array e il contenuto testuale va sotto #text quando l'elemento ha anche attributi.",
      "Un input malformato non produce mai metà conversioni tirate a indovinare: il documento viene prima validato e gli errori puntano alla linea colpevole — un tag di chiusura mancante si sistema in una riga.",
    ],
    steps: [
      "Incolla il tuo XML nel pannello di sinistra.",
      "Il JSON formattato compare a destra mentre scrivi.",
      "Copia il JSON quando ti sembra a posto.",
    ],
    faqs: [
      {
        q: "Come sono rappresentati gli attributi nel JSON?",
        a: 'Ogni attributo diventa una chiave con prefisso @ — <book id="7"> torna come { "@id": "7" }. I valori degli attributi restano stringhe, mentre il testo che sembra un numero o un booleano viene convertito nel suo tipo JSON.',
      },
      {
        q: "Cosa succede agli elementi ripetuti?",
        a: "Gli elementi fratelli con lo stesso nome diventano un array JSON. Attenzione: un elemento singolo resta un valore semplice — verifica che sia un array se chi consuma i dati si aspetta liste.",
      },
      {
        q: "Il mio XML viene caricato da qualche parte?",
        a: "No. Il parsing avviene in locale nel tuo browser con fast-xml-parser — nulla lascia il tuo dispositivo.",
      },
    ],
  },
  "json-to-xml": {
    name: "JSON in XML",
    tagline:
      "Converti JSON in XML ben formato con attributi, elementi ripetuti ed escaping corretto — andata e ritorno con il nostro strumento XML in JSON. Tutto locale.",
    intro: [
      'Incolla JSON e ottieni un documento XML formattato con dichiarazione corretta e indentazione di 2 spazi. Gli oggetti diventano elementi, gli array ripetono la loro chiave per ogni elemento e i membri "@key" diventano attributi XML — l\'esatto inverso del nostro convertitore XML in JSON, i dati possono andare e tornare.',
      "Tutto viene sottoposto a escaping a regola d'arte (& < > \" ') e le chiavi arbitrarie vengono trasformate in nomi di elemento legali, quindi l'output è sempre XML ben formato. I valori che XML non sa esprimere — null, array vuoti — diventano elementi vuoti, e i limiti sono spiegati qui sotto.",
    ],
    steps: [
      "Incolla il tuo JSON nella casella di input.",
      "L'XML appare dal vivo — imposta un nome di elemento radice personalizzato se ti serve.",
      "Copia il risultato o scaricalo come file .xml.",
    ],
    faqs: [
      {
        q: "Come si mappano attributi e array su XML?",
        a: 'Una chiave che inizia con @ (o @_) diventa un attributo dell\'elemento padre e "#text" diventa il contenuto testuale dell\'elemento — esattamente ciò che produce il nostro strumento XML in JSON. Gli array ripetono lo stesso elemento per ogni voce; un array JSON in cima viene avvolto in <root><item>…</item></root>, perché un documento ha bisogno di una sola radice.',
      },
      {
        q: "Quali sono i limiti della mappatura JSON ⇄ XML?",
        a: "XML non ha una notazione per null né per gli array vuoti — entrambi collassano in elementi vuoti. Il contenuto misto (testo intervallato a elementi figli) non può fare andata e ritorno: il testo resta in un unico blocco. E rileggendo, un elemento ripetuto solitario torna un valore semplice invece di un array di una voce.",
      },
      {
        q: "Cosa succede alle chiavi che non sono nomi XML validi?",
        a: 'Vengono convertite: i caratteri illegali diventano underscore e una chiave che inizia con una cifra prende un underscore iniziale ("2fa" → <_2fa>). Le lettere CJK e accentate sono già nomi XML legali e restano così come sono.',
      },
    ],
  },
  "cron-explainer": {
    name: "Spiegatore di espressioni cron",
    tagline:
      "Trasforma qualsiasi espressione cron in linguaggio chiaro: analisi campo per campo, le prossime cinque esecuzioni nel tuo fuso orario e preset pronti a un clic.",
    intro: [
      "Le espressioni cron sono cinque o sei campi criptici che decidono quando girano i job — e un solo carattere sbagliato può far sì che non partano mai, o che scattino alle 3 di notte di ogni domenica. Incolla un'espressione: lo strumento spiega ogni campo a parole semplici (minuto, ora, giorno del mese, mese, giorno della settimana, più i secondi se presenti) e mostra le prossime cinque esecuzioni per confermare che la pianificazione fa davvero ciò che credi.",
      "La validazione è onesta e in linea: valori fuori intervallo, intervalli al contrario ed estensioni Quartz non supportate come L, W e # producono un errore specifico e comprensibile. Cinque preset comuni — ogni minuto, ogni ora, tutti i giorni a mezzanotte, nei giorni feriali alle 9:00 e trimestrale — si compilano con un clic.",
    ],
    steps: [
      "Digita un'espressione cron oppure clicca su un preset per partire da qualcosa di affidabile.",
      "Leggi l'analisi campo per campo in linguaggio semplice.",
      "Controlla le prossime cinque esecuzioni, alternando ora locale e UTC.",
      "Correggi nel crontab, nel pianificatore o nella configurazione CI ciò che non torna.",
    ],
    faqs: [
      {
        q: "Qual è la differenza tra cron standard e sintassi Quartz?",
        a: "Il cron Unix standard (e questo strumento) usa 5 campi: minuto, ora, giorno del mese, mese, giorno della settimana — 6 se il primo sono i secondi. Quartz aggiunge di norma i secondi, un settimo campo per l'anno ed estensioni come L (ultimo giorno), W (giorno feriale più vicino) e # (n-esimo giorno della settimana, es. MON#2). Queste estensioni Quartz non sono coperte qui; tutto lo standard — numeri, nomi come JAN e MON, intervalli, elenchi e passi — sì.",
      },
      {
        q: "Ho indicato giorno del mese e giorno della settimana: perché gira più spesso del previsto?",
        a: "Il cron classico li combina con un OR: quando entrambi i campi sono vincolati (nessuno è *), un giorno che corrisponde a uno qualsiasi dei due fa scattare il job. «0 0 1 * MON» gira il giorno 1 e ogni lunedì. Per esigere entrambe le condizioni insieme l'espressione va costruita diversamente — guardare qui le prossime esecuzioni rende il comportamento subito evidente.",
      },
    ],
  },
  "gradient-generator": {
    name: "Generatore di gradienti CSS",
    tagline:
      "Unisci da due a cinque colori in gradienti CSS lineari, radiali o conici, con anteprima dal vivo, codice pronto da incollare e palette armonizzate a un clic.",
    intro: [
      "Scegli da due a cinque colori, seleziona lineare, radiale o conico e trascina l'angolo — l'anteprima si aggiorna mentre scrivi e il CSS è sempre a una copia di distanza. Lascia vuota la posizione di una tappa e verrà collocata automaticamente come farebbe CSS; percentuali esatte creano tagli netti e sfumature decentrate.",
      "L'output è un vero blocco di produzione: una riga di colore pieno di riserva per i browser antichi, una riga con prefisso -webkit- per i vecchi motori WebKit e la sintassi standard per ultima. Il pulsante di armonizzazione casuale ruota le tinte della palette nello spazio HSL, così ogni rimescolamento resta equilibrato.",
    ],
    steps: [
      "Imposta da due a cinque colori, oppure parti da una palette predefinita.",
      "Scegli il tipo di gradiente, poi angolo o forma; blocca le posizioni se serve.",
      "Copia il blocco CSS e incollalo nel tuo foglio di stile.",
    ],
    faqs: [
      {
        q: "Perché il CSS include una riga con prefisso -webkit-?",
        a: "È una riga di compatibilità per i vecchi motori WebKit (circa l'era di Safari 5-6) che capivano solo -webkit-linear-gradient. Tutti i browser dell'ultimo decennio leggono la riga standard, quindi puoi cancellare quella con prefisso se non devi supportare quelle versioni — conservarla costa una riga, eliminarla non costa nulla.",
      },
      {
        q: "Cosa significa l'angolo in un gradiente lineare?",
        a: "È la direzione in cui il gradiente avanza, misurata in senso orario dall'alto: 0deg va dal basso verso l'alto, 90deg da sinistra a destra, 180deg dall'alto in basso. Lo strumento normalizza qualunque angolo (−45 diventa 315) e la convenzione di direzione opposta della vecchia sintassi è già sistemata nella riga -webkit-.",
      },
    ],
  },
  "compress-image-to-size": {
    name: "Comprimere immagine a dimensione",
    tagline:
      "Riduci le immagini a un budget esatto in kilobyte: una ricerca binaria sulla qualità JPEG o WebP arriva fin dove il formato consente — in batch, offline, senza upload.",
    intro: [
      "I moduli di upload, i limiti delle email e i campi dei CMS chiedono una dimensione, non uno slider di qualità. Digita il tetto in KB, rilascia le immagini e lo strumento cerca per bisezione la qualità del codificatore finché il file non scende sotto la linea — indicando per ogni immagine la qualità esatta e l'eventuale riduzione usata.",
      "È onesta con la fisica: se il minimo della qualità supera ancora l'obiettivo, l'immagine viene ridimensionata progressivamente; e se una foto grande e dettagliata non può davvero entrare in un budget minuscolo, ottieni il risultato più vicino, chiaramente segnato «oltre obiettivo», mai un'immagine silenziosamente rovinata.",
    ],
    steps: [
      "Rilascia una immagine o un intero lotto.",
      "Digita la dimensione obiettivo in KB e scegli JPEG o WebP.",
      "Avvia la compressione — ogni riga mostra dimensione raggiunta, qualità e scala usate.",
      "Scarica i risultati a norma, o la copia onesta più vicina.",
    ],
    faqs: [
      {
        q: "Perché non tutte le immagini raggiungono un obiettivo minuscolo?",
        a: "Una foto conserva informazioni anche alla qualità più bassa: un'immagine da 2 MB a 4000 px non entrerà quasi certamente mai in 10 KB. Quando la qualità tocca il minimo, lo strumento riduce anche i pixel — la risoluzione è l'altra leva che taglia byte. Se l'obiettivo resta fuori portata ricevi il risultato più vicino con un'avvertenza esplicita, mai un file corrotto in silenzio.",
      },
      {
        q: "Meglio JPEG o WebP?",
        a: "A pari qualità visiva WebP risulta tipicamente dal 20 al 30% più leggero di JPEG, quindi con un budget stretto spesso entra con meno perdita. JPEG è la scelta sicura quando il file deve aprirsi ovunque, compresi software datati senza supporto WebP.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* Calcolatori — finanza, salute e quotidianità (nuovo lotto)           */
  /* ------------------------------------------------------------------ */
  "mortgage-calculator": {
    name: "Calcolatrice mutuo",
    tagline:
      "Calcola la rata mensile del mutuo — capitale e interessi più tasse, assicurazione e spese condominiali — con interessi totali e piano di ammortamento annuale.",
    intro: [
      "Inserisci prezzo dell'abitazione, acconto, tasso e durata per ottenere la rata mensile capitale-interessi con la formula di ammortamento standard che usano le banche. Aggiungi l'imposta annuale, l'assicurazione annuale e le spese condominiali mensili per vedere il PITI completo che citano i finanziatori.",
      "L'importo finanziato, gli interessi totali della vita del mutuo e un piano di ammortamento anno per anno si aggiornano mentre scrivi: confronta un acconto del 20% con uno del 10%, o 15 anni con 30, in pochi secondi.",
    ],
    steps: [
      "Inserisci il prezzo dell'abitazione e l'acconto, in percentuale o importo.",
      "Imposta il tasso annuo e la durata in anni.",
      "Aggiungi facoltativamente imposta annuale, assicurazione annuale e spese condominiali mensili.",
      "Leggi la rata capitale-interessi, il totale PITI e il piano di ammortamento annuale.",
    ],
    faqs: [
      {
        q: "Quale formula usa la calcolatrice del mutuo?",
        a: "La formula di ammortamento standard a tasso fisso: M = L × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1), dove L è l'importo finanziato (prezzo meno acconto), r il tasso mensile (annuale ÷ 12 ÷ 100) e n il numero di mesi. Esempio: una casa da 300.000 con il 20% di acconto al 6% su 30 anni dà una rata capitale-interessi di circa 1.438,92 — il tasso inserito è un esempio, non un'offerta.",
      },
      {
        q: "Cosa significa PITI?",
        a: "Principal, Interest, Taxes e Insurance — le quattro parti di una rata abitativa tipica. Lo strumento aggiunge un dodicesimo delle imposte e dell'assicurazione annuali inserite, più le spese condominiali, alla rata capitale-interessi. Se tasse e assicurazione finiscono in deposito a garanzia (escrow) dipende dal finanziatore.",
      },
      {
        q: "Perché pago tanti interessi nei primi anni?",
        a: "Ogni mese gli interessi si calcolano sul saldo residuo, massimo all'inizio. Il piano di ammortamento mostra il ribaltamento: le rate iniziali sono quasi tutto interesse, negli ultimi anni quasi tutto capitale. Ammortizzare capitale presto risparmia quindi molti più interessi.",
      },
    ],
  },
  "salary-to-hourly": {
    name: "Calcolatrice stipendio in paga oraria",
    tagline:
      "Converti uno stipendio annuale in paga oraria, giornaliera, settimanale, quindicinale e mensile — e vedi la tariffa oraria corretta una volta tolti i giorni non retribuiti.",
    intro: [
      "Inserisci uno stipendio annuale con il tuo ritmo abituale — ore a settimana e settimane all'anno — e la calcolatrice lo scompone nelle unità che usano annunci e buste paga: oraria, giornaliera, settimanale, quindicinale e mensile. La settimana standard di 40 ore su 52 settimane è precompilata.",
      "Se prendi giorni non retribuiti, la tariffa oraria corretta mostra quanto rende lo stesso stipendio per ora effettivamente lavorata: ogni giorno non retribuito toglie un quinto di settimana lavorativa all'anno.",
    ],
    steps: [
      "Digita lo stipendio annuale.",
      "Imposta ore a settimana e settimane all'anno (40 e 52 di default).",
      "Aggiungi i giorni non retribuiti all'anno, se ci sono.",
      "Leggi la paga oraria e gli equivalenti giornaliero, settimanale, quindicinale e mensile.",
    ],
    faqs: [
      {
        q: "Come si calcola la paga oraria?",
        a: "Oraria = stipendio annuale ÷ (ore a settimana × settimane all'anno). Con le 40 ore e 52 settimane predefinite, uno stipendio di 52.000 fa esattamente 25,00 all'ora. La paga giornaliera usa una settimana di 5 giorni, quella settimanale è l'annuale diviso le settimane, quella quindicinale è il doppio e quella mensile è l'annuale diviso 12.",
      },
      {
        q: "In che modo i giorni non retribuiti cambiano il risultato?",
        a: "Ogni giorno non retribuito toglie un quinto di settimana lavorativa, così 10 giorni accorciano l'anno a circa 50 settimane lavorate. La tariffa corretta divide lo stesso stipendio per le ore effettivamente lavorate: 52.000 con settimane di 40 ore e 10 giorni non retribuiti fanno 26,00 all'ora. I totali settimanale e mensile continuano a mostrare lo stipendio indicato.",
      },
      {
        q: "Sono incluse tasse e trattenute?",
        a: "No — tutte le cifre sono lorde, prima di imposta sul reddito, contributi sociali e altre trattenute. Il netto dipende dal tuo scaglione e dal luogo, quindi tratta questi risultati come valori lordi di confronto.",
      },
    ],
  },
  "hourly-to-salary": {
    name: "Calcolatrice paga oraria in stipendio",
    tagline:
      "Trasforma una paga oraria in valori giornaliero, settimanale, quindicinale, mensile e annuale col tuo ritmo reale — 40 ore a settimana su 52 settimane di default.",
    intro: [
      "Inserisci una paga oraria con il ritmo a cui si applica e la calcolatrice la moltiplica fino alla cifra annuale che chiedono datori di lavoro e finanziatori, più gli importi settimanale, quindicinale e mensile di una busta paga. Lo standard 40 ore, 52 settimane è precompilato; per part-time o stagioni basta cambiare quei due numeri.",
      "La paga giornaliera assume una settimana di 5 giorni. Poiché ogni cifra è una moltiplicazione diretta, i risultati corrispondono a ciò che un'offerta salariale dovrebbe pagare per le stesse ore.",
    ],
    steps: [
      "Digita la paga oraria.",
      "Imposta ore a settimana e settimane all'anno (40 e 52 di default).",
      "Leggi la cifra annuale e gli equivalenti mensile, quindicinale, settimanale e giornaliero.",
    ],
    faqs: [
      {
        q: "Come si calcola la paga annuale da una paga oraria?",
        a: "Annuale = paga oraria × ore a settimana × settimane all'anno. A 25,00 all'ora su una settimana di 40 ore per 52 settimane sono esattamente 52.000 l'anno; il mensile è l'annuale diviso 12 e il quindicinale è una paga settimanale raddoppiata.",
      },
      {
        q: "E gli straordinari, le mance o i permessi non retribuiti?",
        a: "Non sono inclusi — il risultato è la moltiplicazione diretta per il ritmo inserito. Per gli straordinari, aggiungi approssimativamente le ore tipiche al campo ore a settimana allo stesso tasso; per lavoro stagionale o permessi non retribuiti riduci le settimane all'anno.",
      },
      {
        q: "Perché la mia busta paga reale è diversa?",
        a: "Le cifre sono lorde. Imposta sul reddito, previdenza e trattenute riducono il netto, e molti lavori salariati spalmano la paga su 12 mesi anche se lavori meno settimane. Usa il risultato annuale per confrontare offerte, non come stima del netto.",
      },
    ],
  },
  "break-even-calculator": {
    name: "Calcolatrice punto di pareggio",
    tagline:
      "Trova le unità e i ricavi dove un prodotto smette di perdere soldi — costi fissi, prezzo e costo variabile in ingresso, margine di contribuzione e tabella dei profitti in uscita.",
    intro: [
      "Inserisci i costi fissi — affitto, stipendi, attrezzatura, le bollette che paghi a prescindere dal volume — più il prezzo unitario e il costo variabile unitario. La calcolatrice divide i costi fissi per il margine di contribuzione, prezzo meno costo variabile, e dà il numero di unità in cui il profitto attraversa lo zero.",
      "Una mini tabella mostra profitto o perdita a metà, una volta e mezza e al doppio del volume di pareggio, così vedi quanto rapidamente il margine si accumula una volta superato il punto. Se il prezzo non copre nemmeno il costo variabile, lo strumento lo dice invece di mostrare uno zero senza senso.",
    ],
    steps: [
      "Inserisci i costi fissi totali del periodo.",
      "Imposta il prezzo unitario e il costo variabile unitario.",
      "Leggi le unità e i ricavi di pareggio, più il margine per unità.",
      "Controlla la tabella dei profitti a 0,5×, 1,5× e 2× del volume di pareggio.",
    ],
    faqs: [
      {
        q: "Quale formula usa l'analisi del punto di pareggio?",
        a: "Unità di pareggio = costi fissi ÷ (prezzo unitario − costo variabile unitario). La differenza è il margine di contribuzione: con 10.000 di costi fissi, un prezzo di 50 e un costo variabile di 30, ogni vendita porta 20, quindi 500 unità — 25.000 di ricavi — arrivano al pareggio.",
      },
      {
        q: "E se il margine è zero o negativo?",
        a: "Allora nessun volume può arrivare al pareggio, e la calcolatrice lo dice invece di restituire un numero: ogni unità venduta aggiunge perdita invece di coprire i costi fissi. Le soluzioni sono un prezzo più alto, un costo variabile più basso, o entrambi.",
      },
      {
        q: "Gestisce più prodotti o costi che cambiano?",
        a: "Modella un solo prodotto con economia unitaria costante — il classico caso da manuale. Per un mix di prodotti usa la tua media ponderata di prezzo meno costo variabile; per sconti di volume o costi fissi a gradini, ricalcola ogni scenario.",
      },
    ],
  },
  "bmr-calculator": {
    name: "Calcolatrice metabolismo basale",
    tagline:
      "Calcola il tuo metabolismo basale con l'equazione di Mifflin-St Jeor (1990) — le calorie che il corpo brucia a riposo completo ogni giorno.",
    intro: [
      "Il tuo metabolismo basale (BMR) è l'energia che il corpo spende solo per restare in vita — respirare, far circolare il sangue, mantenere il calore — prima di ogni movimento o digestione. Questa calcolatrice usa l'equazione di Mifflin-St Jeor, pubblicata nel 1990 e tuttora il predittore ampiamente usato più accurato per le popolazioni moderne: uomini 10 × peso (kg) + 6,25 × altezza (cm) − 5 × età + 5; donne la stessa espressione meno 161.",
      "Inserisci i tuoi dati in unità metriche o imperiali e il risultato si aggiorna mentre digiti. Tratta il numero come una stima a livello di popolazione — tipicamente entro circa ±10% di una misura di laboratorio — non come una diagnosi medica.",
    ],
    steps: [
      "Scegli il sesso e le unità metriche (cm + kg) o imperiali (ft + in + lb).",
      "Inserisci altezza, peso ed età.",
      "Leggi il tuo BMR in kilocalorie al giorno.",
      "Passalo alla calcolatrice delle calorie per mantenimento e obiettivi.",
    ],
    faqs: [
      {
        q: "Quale formula usa e quanto è precisa?",
        a: "L'equazione di Mifflin-St Jeor, pubblicata nel 1990 e raccomandata dall'American Dietetic Association dopo la validazione contro la calorimetria indiretta. Prevede la spesa energetica a riposo misurata entro circa ±10% per la maggior parte degli adulti, con più precisione della più vecchia equazione di Harris-Benedict (1919).",
      },
      {
        q: "Qual è la differenza tra BMR e fabbisogno calorico giornaliero?",
        a: "Il BMR copre solo il riposo completo. La tua spesa reale è il BMR moltiplicato per un fattore di attività — circa 1,2 per una giornata sedentaria fino a 1,9 per persone molto attive. La calcolatrice delle calorie applica quel moltiplicatore e il tuo obiettivo per te.",
      },
      {
        q: "È un consiglio medico?",
        a: "No — è una stima, non un consiglio medico. Malattie, farmaci, gravidanza e composizioni corporee inusuali spostano tutte la spesa energetica reale: discuti ogni cambio alimentare con un professionista sanitario.",
      },
    ],
  },
  "calorie-calculator": {
    name: "Calcolatrice calorie",
    tagline:
      "Trasforma il tuo BMR in obiettivi calorici giornalieri: cinque livelli di attività (×1,2–1,9) più obiettivi perdere, mantenere o aumentare di circa ±500 kcal al giorno.",
    intro: [
      "Il fabbisogno energetico giornaliero è il tuo BMR moltiplicato per un fattore di attività: 1,2 sedentario, 1,375 leggermente attivo, 1,55 moderatamente attivo, 1,725 molto attivo e 1,9 extra attivo. Quel prodotto — la spesa energetica totale giornaliera (TDEE) — è ciò che serve a mantenere il peso attuale. Il BMR stesso viene dall'equazione di Mifflin-St Jeor (1990).",
      "Scegli un obiettivo e lo strumento aggiusta la cifra di mantenimento: circa −500 kcal/giorno per perdere circa 0,5 kg a settimana, +500 kcal/giorno per aumentare, o nessun cambio per mantenere. L'euristica dei ±500 kcal segue dal fatto che 1 kg di grasso corporeo immagazzina ≈ 7.700 kcal. Tutto qui è una stima — il metabolismo reale si adatta mentre peso e abitudini cambiano.",
    ],
    steps: [
      "Scegli sesso, unità e inserisci altezza, peso ed età.",
      "Scegli il livello di attività che corrisponde a una settimana tipica.",
      "Scegli perdere, mantenere o aumentare.",
      "Leggi il mantenimento (TDEE) e le calorie obiettivo al giorno.",
    ],
    faqs: [
      {
        q: "Quale formula e fattori vengono usati?",
        a: "BMR dall'equazione di Mifflin-St Jeor (1990), moltiplicato per i fattori di attività TDEE standard: 1,2 sedentario, 1,375 leggermente attivo, 1,55 moderatamente attivo, 1,725 molto attivo, 1,9 extra attivo. Gli obiettivi aggiungono o sottraggono circa 500 kcal/giorno, l'euristica classica per un cambio settimanale di 0,5 kg (1 kg di grasso ≈ 7.700 kcal).",
      },
      {
        q: "Un deficit di 500 kcal è sicuro, e quando vedrò risultati?",
        a: "Circa −500 kcal/giorno per un cambio di ≈0,5 kg/settimana è il ritmo che la maggior parte delle linee guida di sanità pubblica chiama moderato e sostenibile. La perdita iniziale è in parte acqua, e la spesa cala man mano che diventi più leggero, quindi i risultati settimanali non sono lineari — ricalcola ogni pochi chili.",
      },
      {
        q: "È un consiglio medico?",
        a: "No — è una stima, non un consiglio medico. Se sei incinta, gestisci una condizione cronica, prendi farmaci o hai una storia di disturbi alimentari, fissa gli obiettivi con un professionista sanitario.",
      },
    ],
  },
  "body-fat-calculator": {
    name: "Calcolatrice grasso corporeo",
    tagline:
      "Stima la percentuale di grasso corporeo col metodo del metro da sarto della US Navy (Hodgdon & Beckett, 1984) da altezza, collo e vita — fianchi per le donne.",
    intro: [
      "Il metodo delle circonferenze della US Navy stima il grasso con un solo metro da sarto. Per gli uomini: %BF = 495 / (1,0324 − 0,19077·log10(vita − collo) + 0,15456·log10(altezza)) − 450, tutto in centimetri. Le donne aggiungono i fianchi al termine di circonferenza — log10(vita + fianchi − collo) — e usano i coefficienti femminili dello stesso studio del 1984 di Hodgdon e Beckett.",
      "Misura il collo sotto la laringe con il metro leggermente inclinato in avanti, la vita all'ombelico per gli uomini o al punto più stretto per le donne, e i fianchi nel punto più ampio. Tendi il metro senza comprimere la pelle. Il risultato è una stima con errore tipico di ±3–4% contro i metodi di laboratorio, non una diagnosi.",
    ],
    steps: [
      "Scegli il sesso e le unità metriche o imperiali.",
      "Misura e inserisci altezza, collo e vita — più i fianchi per le donne.",
      "Leggi la percentuale di grasso corporeo stimata.",
      "Rimisurati ogni mese nelle stesse condizioni per seguire il trend.",
    ],
    faqs: [
      {
        q: "Quanto è preciso il metodo Navy?",
        a: "Contro la pesata idrostatica e il DEXA, le equazioni Navy del 1984 restano in media entro circa 3–4 punti percentuali, con errori individuali maggiori dove il grasso è distribuito in modo atipico. Segue bene i cambiamenti se misuri in modo costante, il che conta per i progressi più del numero assoluto.",
      },
      {
        q: "Quale fascia di grasso corporeo è considerata sana?",
        a: "L'American Council on Exercise cita per gli uomini: 2–5% grasso essenziale, 6–13% atleti, 14–17% fitness, 18–24% media, 25%+ obesità. Per le donne: 10–13% essenziale, 14–20% atlete, 21–24% fitness, 25–31% media, 32%+ obesità. Le donne hanno bisogno di più grasso essenziale per la funzione ormonale.",
      },
      {
        q: "Perché il risultato è uscito negativo o impossibile?",
        a: "La formula è stampata senza limiti, quindi input impossibili — per esempio una vita non più grande del collo — producono output impossibili. Tratta qualunque valore sotto il livello di grasso essenziale o sopra circa il 60% come errore di misura e rimisura. E come sempre, questa stima non è un consiglio medico.",
      },
    ],
  },
  "ideal-weight-calculator": {
    name: "Calcolatrice peso ideale",
    tagline:
      "Vedi il tuo peso ideale con la formula di Devine (1975) e la fascia BMI sana (18,5–24,9) per la tua altezza, mostrato in kg o libbre.",
    intro: [
      "Questa calcolatrice mostra due risposte complementari. La formula di Devine (1975) — 50 kg + 2,3 kg per pollice oltre i 5 ft per gli uomini, 45,5 kg + 2,3 kg per pollice per le donne — fu originariamente derivata per dosare farmaci come la digossina ed è ancora l'equazione di peso ideale più citata in medicina. La fascia BMI sana moltiplica la tua altezza in metri al quadrato per 18,5 e 24,9, i limiti dell'intervallo normale WHO.",
      "Inserisci l'altezza in centimetri o piedi e pollici. I due metodi di solito divergono di qualche chilogrammo, ed è esattamente il punto: non esiste un peso ideale unico. Tratta entrambi i numeri come una cornice di riferimento attorno a un intervallo sano, non come un obiettivo a cui forzarti — la stima non è un consiglio medico.",
    ],
    steps: [
      "Scegli le unità metriche (cm) o imperiali (ft + in).",
      "Inserisci la tua altezza.",
      "Confronta le stime di Devine per uomini e donne con la fascia BMI sana.",
      "Usa l'intervallo, non un numero solo, quando ti fissi un obiettivo di peso.",
    ],
    faqs: [
      {
        q: "Da dove viene la formula di Devine?",
        a: "Il dott. B. J. Devine la pubblicò nel 1975 come modo rapido di stimare i pesi di dosaggio dei farmaci dall'altezza: 50 kg per i primi 5 piedi più 2,3 kg per pollice aggiuntivo per gli uomini, 45,5 kg per le donne. Non fu mai pensata come obiettivo di bellezza o fitness, ed ecco perché accanto compare la fascia BMI basata sulla WHO.",
      },
      {
        q: "Perché la risposta è un intervallo e non un numero?",
        a: "Perché il peso sano dipende da struttura, massa muscolare, età ed etnia, e nessun numero singolo va bene per tutti. La fascia 18,5–24,9 × altezza² viene dalla classificazione BMI della WHO e copre i pesi che la ricerca collega al rischio complessivo più basso per la maggior parte degli adulti.",
      },
      {
        q: "È un consiglio medico?",
        a: "No — è una stima, non un consiglio medico. Atleti e persone molto muscolose stanno sopra la fascia in piena salute, e alcune condizioni spostano l'intervallo sano. Discuti un peso obiettivo con un professionista sanitario.",
      },
    ],
  },
  "water-intake-calculator": {
    name: "Calcolatrice acqua giornaliera",
    tagline:
      "Ottieni un obiettivo di acqua quotidiano: 35 ml per chilo di peso corporeo più circa 350 ml ogni 30 minuti di esercizio, con indicazioni per il caldo.",
    intro: [
      "Questa calcolatrice parte dall'euristica standard dei liquidi di mantenimento usata in pratica clinica: 35 ml di acqua per chilo di peso corporeo ogni giorno, prima di ogni attività. Aggiunge poi circa 350 ml ogni 30 minuti di esercizio per coprire le perdite col sudore, e mostra la base e il bonus da esercizio separatamente così vedi da dove viene il totale.",
      "Inserisci il peso in chili o libbre e i minuti di esercizio al giorno. Con il caldo, o quando sudi molto, bevi più del totale calcolato; cibo e altre bevande forniscono acqua anch'essi. Il risultato è una stima generale di idratazione, non un consiglio medico.",
    ],
    steps: [
      "Scegli le unità metriche (kg) o imperiali (lb).",
      "Inserisci il peso corporeo.",
      "Inserisci quanti minuti ti alleni al giorno.",
      "Leggi la base, il bonus da esercizio e l'obiettivo giornaliero combinato.",
    ],
    faqs: [
      {
        q: "Da dove viene la regola dei 35 ml/kg?",
        a: "È la classica euristica dei liquidi di mantenimento dalla pediatria all'adulto, usata in tutta la pratica clinica (per gli adulti spesso citata come 30–35 ml/kg/die). Per confronto, l'Autorità europea per la sicurezza alimentare colloca l'assunzione totale adeguata di acqua a 2,0 L/die per le donne e 2,5 L/die per gli uomini — acqua dal cibo inclusa.",
      },
      {
        q: "Caffè, tè e cibo contano nel totale?",
        a: "Sì. Circa il 20–30% dell'assunzione giornaliera di acqua arriva normalmente dal cibo, e le bevande con caffeina con moderazione contribuiscono all'idratazione invece di drenarla. La cifra calcolata è un'indicazione di liquidi chiari sopra una dieta normale: non serve bere tutto come acqua liscia.",
      },
      {
        q: "È un consiglio medico?",
        a: "No — è una stima generale. Le persone con condizioni di cuore, reni o fegato, e chi è stato messo a restrizione di liquidi, spesso necessitano di meno della quantità calcolata: segui le indicazioni del tuo medico.",
      },
    ],
  },
  "pace-calculator": {
    name: "Calcolatrice passo di corsa",
    tagline:
      "Calcola il passo al km e al miglio da qualsiasi distanza e tempo, poi predici i tempi di gara con la formula a esponente 1,06 di Peter Riegel.",
    intro: [
      "Inserisci una distanza — 5K, 10K, mezza maratona, maratona o personalizzata in chilometri o miglia — più il tuo tempo d'arrivo, e vedi insieme il passo al chilometro, il passo al miglio e le velocità in km/h e mph. Una mezza maratona in 2:00 appare come 5:41/km, 9:10/miglio e 10,6 km/h senza calcoli a mente.",
      "Il predittore di gare applica la formula di resistenza di Peter Riegel T₂ = T₁ × (D₂/D₁)^1,06: datti un risultato di gara onesto e proietta il tuo arrivo atteso su ogni distanza standard, dal 5K alla maratona.",
    ],
    steps: [
      "Scegli una distanza di gara preimpostata, o scegli Personalizzata e inserisci una distanza in km o miglia.",
      "Digita il tuo tempo d'arrivo in ore, minuti e secondi.",
      "Leggi il passo al km, il passo al miglio e entrambe le velocità — oppure passa al Predittore di gara per i tempi proiettati a ogni distanza.",
    ],
    faqs: [
      {
        q: "Da dove viene la formula di previsione delle gare?",
        a: "Da Peter Riegel, ingegnere di ricerca che pubblicò T₂ = T₁ × (D₂/D₁)^1,06 su Runner's World nel 1977. L'esponente 1,06 cattura come il passo sfuma con la distanza: raddoppiare la distanza di gara richiede circa il 9% di tempo in più del doppio del tempo. Assume un allenamento specifico per la distanza obiettivo — non predirà una maratona da un 5K veloce se non hai mai corso lungo.",
      },
      {
        q: "Perché il passo previsto al km è più lento nelle gare lunghe?",
        a: "È la formula che fa il suo lavoro. L'esponente 1,06 significa che ogni raddoppio di distanza costa circa il 6% di tempo in più oltre il proporzionale, riflettente esaurimento del glicogeno, rifornimento e fatica. Le previsioni più corte (10K da una mezza) escono più veloci al km per la stessa ragione.",
      },
      {
        q: "La calcolatrice gestisce anche le miglia oltre ai chilometri?",
        a: "Sì. Le distanze personalizzate accettano entrambe le unità, e i risultati sono sempre mostrati in entrambi i modi: passo al km e al miglio, velocità in km/h e mph. La conversione usa il miglio internazionale esatto di 1,609344 km.",
      },
    ],
  },
  "one-rep-max-calculator": {
    name: "Calcolatrice 1RM",
    tagline:
      "Stima il tuo massimo su una ripetizione (1RM) da qualsiasi serie peso × ripetizioni con le formule di Epley e Brzycki, più una tabella di allenamento 1–12 rip in percentuale del 1RM.",
    intro: [
      "Inserisci un peso sollevato e quante ripetizioni pulite hai completato, e ottieni il tuo 1RM stimato da due formule affermate: quella di Epley w × (1 + reps/30) e quella di Brzycki w × 36/(37 − reps). A 225 lb × 10 entrambe atterrano esattamente su 300 lb — per questo la serie è un classico da palestra.",
      "Sotto la stima, una tabella di allenamento converte il tuo 1RM in carichi di lavoro: il carico più pesante che puoi aspettarti di sollevare per ogni numero di ripetizioni da 1 a 12, con la sua percentuale del 1RM — le percentuali con cui i coach programmano blocchi di forza, ipertrofia e resistenza.",
    ],
    steps: [
      "Inserisci il peso sollevato e scegli kg o lb.",
      "Inserisci il numero di ripetizioni completate con buona tecnica.",
      "Leggi le stime di Epley e Brzycki e la tabella di allenamento 1–12 rip sotto.",
    ],
    faqs: [
      {
        q: "Quale formula devo fidare?",
        a: "Entrambe sono stime da serie submassimali, le più accurate tra circa 4 e 10 ripetizioni. Epley (1976) risulta leggermente ottimista a basse ripetizioni; Brzycki (1993) leggermente conservativo. La prassi è trattare i due numeri come una forchetta: se coincidono entro pochi chili, la tua stima di 1RM è affidabile.",
      },
      {
        q: "Perché la tabella mostra il 75% del 1RM per 10 ripetizioni?",
        a: "Le percentuali vengono dall'inversione dell'equazione di Epley: il massimo sollevabile per n ripetizioni è circa 1RM × 30/(30 + n). Dieci ripetizioni danno il 75%, cinque circa l'86%. Le percentuali reali derivano dall'esercizio (gli squat tollerano più ripetizioni delle pressioni) e dalla composizione delle tue fibre: tratta la tabella come punto di partenza per la programmazione.",
      },
      {
        q: "Perché non posso inserire più di 20 ripetizioni?",
        a: "Perché lì le formule smettono di avere senso. Oltre le ~12 ripetizioni il risultato è dominato dalla resistenza locale più che dalla forza, e il denominatore di Brzycki (37 − reps) collassa verso lo zero. Le serie ad alte ripetizioni misurano il condizionamento; per una stima di massimo da esse, usa una formula pensata per il lavoro di resistenza.",
      },
    ],
  },
  "sleep-calculator": {
    name: "Calcolatrice sonno",
    tagline:
      "Trova l'ora migliore per andare a letto per un orario di sveglia fisso — o quando svegliarti se dormi ora — con cicli di sonno di 90 minuti più 15 minuti per addormentarsi.",
    intro: [
      "Svegliarsi a metà ciclo è ciò che rende le mattine terribili, non il totale delle ore dormite. Questo strumento pianifica il sonno in cicli interi di 90 minuti: digli quando devi svegliarti e elenca le ore di coricata che fanno suonare la sveglia esattamente a un confine di ciclo — sei cicli (9 ore) fino a tre (4,5 ore), ciascuno comprensivo di circa 15 minuti per addormentarsi.",
      "Vai a letto proprio ora? La modalità inversa aggiunge cicli in avanti: addormentato alle 23:30, i tuoi punti di sveglia naturali sono 01:15, 02:45, 04:15, 05:45, 07:15 e 08:45 — prendi il più presto che ti lascia comunque abbastanza riposo.",
    ],
    steps: [
      "Scegli Ora di sveglia → coricata, o Dormi ora → orari di sveglia.",
      "Inserisci l'ora a cui devi svegliarti, o l'ora in cui vai a letto.",
      "Scegli una riga: ognuna è un numero intero di cicli da 90 minuti, con la durata del sonno mostrata.",
    ],
    faqs: [
      {
        q: "I cicli di sonno durano davvero 90 minuti?",
        a: "90 minuti è la media comunemente citata, ma i singoli cicli variano da circa 80 a 120 minuti, e i cicli della stessa persona differiscono durante la notte. Per questi orari sono obiettivi, non garanzie: se dopo due settimane di sveglie sincronizzate sui cicli ti senti ancora intontito, sposta la coricata di 15–20 minuti e vedi se le mattine migliorano.",
      },
      {
        q: "Perché il calcolo aggiunge 15 minuti?",
        a: "Perché il primo ciclo parte solo quando ti addormenti davvero, e la maggior parte delle persone mette dai 10 ai 20 minuti. Lo strumento budgeta 15 minuti tra l'andare a letto e l'inizio del primo ciclo; se di solito cadi nel sonno più veloce o più lentamente, correggi mentalmente della differenza.",
      },
      {
        q: "Di quanti cicli ho bisogno?",
        a: "La maggior parte degli adulti sta bene con 5 cicli (7,5 ore) e molti ne hanno bisogno di 6 (9 ore); 4 cicli (6 ore) tengono alcune persone a breve, raramente a lungo. La regolarità del ritmo conta quanto il totale — gli stessi 6 cicli con coricate fortemente variabili ti lasciano peggio.",
      },
    ],
  },
  "workdays-calculator": {
    name: "Calcolatrice giorni lavorativi",
    tagline:
      "Conta i giorni lavorativi tra due date o aggiungi e togli giorni lavorativi a una data — con la tua definizione di weekend e un elenco festività personalizzato.",
    intro: [
      "Scadenze contrattuali, tempi di consegna e orologi SLA girano in giorni lavorativi, non di calendario. Conta i giorni lavorativi tra due date (entrambi gli estremi inclusi: dal lunedì al venerdì sono 5), oppure avanza o retrocedi di N giorni lavorativi da una data base e vedi la data di atterraggio esatta col suo giorno della settimana.",
      "Incolla il tuo elenco di festività — un AAAA-MM-GG per riga — per escludere chiusure aziendali e festivi, e cambia la definizione di weekend se la tua settimana riposa venerdì e sabato. Tutta la matematica delle date gira su numeri di giorno UTC, quindi i passaggi all'ora legale non spostano mai un risultato di un giorno.",
    ],
    steps: [
      "Scegli Giorni lavorativi tra, o Aggiungi / togli giorni lavorativi.",
      "Inserisci le due date, oppure una data base e quanti giorni lavorativi muoverti.",
      "Imposta facoltativamente i giorni del weekend e incolla le date delle festività, un AAAA-MM-GG per riga.",
      "Leggi il conteggio con la sua scomposizione, o la data risultante col suo giorno della settimana.",
    ],
    faqs: [
      {
        q: "Le date degli estremi si contano?",
        a: "Sì — il conteggio tra due date include entrambe le estremità: da lunedì 2026-11-02 a venerdì 2026-11-06 sono 5 giorni lavorativi, e un intervallo da venerdì a lunedì sono 2. In modalità aggiungi/togli la data di partenza non viene consumata: venerdì + 1 giorno lavorativo atterra lunedì, e sabato + 1 atterra anch'esso lunedì.",
      },
      {
        q: "Come inserisco le festività?",
        a: "Una data per riga in formato AAAA-MM-GG, per esempio 2026-11-26 per il Thanksgiving statunitense. Le righe non valide vengono ignorate invece di rompere il conteggio, i duplicati sono innocui, e una festività che cade nel tuo weekend semplicemente non cambia nulla — era già esclusa.",
      },
      {
        q: "Perché lo strumento menziona UTC e l'ora legale?",
        a: "L'aritmetica delle date in ora locale può deviare di un giorno intorno ai passaggi dell'ora legale — un intervallo che attraversa il cambio di novembre o marzo può uscire di un giorno più corto o lungo in alcuni browser. Contare in giorni UTC interi aggira del tutto il problema: da venerdì a lunedì sono 2 giorni lavorativi ovunque sulla Terra.",
      },
    ],
  },
  "cooking-conversion": {
    name: "Convertitore di cucina",
    tagline:
      "Converti tazze, cucchiai e cucchiaini in grammi e once per 24 ingredienti comuni, con una tabella forno °F↔°C — medie di pubblicazione, senza viaggi sul server.",
    intro: [
      "Una tazza di farina non è una tazza di miele: convertire volume in peso richiede la densità dell'ingrediente, non un singolo fattore magico. Scegli uno dei 24 ingredienti comuni — farina 120 g/tazza, zucchero 200, burro 227, miele 340, cacao 100, fiocchi d'avena 90 — e converti in entrambe le direzioni tra tazze, cucchiai, cucchiaini, once fluide, millilitri e litri da un lato, e grammi, chili, once e libbre dall'altro.",
      "Le conversioni volume-volume (2 tazze = 480 ml) e peso-peso (1 lb = 453,6 g) funzionano senza scegliere un ingrediente, e una tabella forno a doppio senso traduce le impostazioni °F standard in °C — 350 °F sono 175 °C — così le ricette straniere smettono di essere un indovinello.",
    ],
    steps: [
      "Scegli l'ingrediente dall'elenco (salta questa parte per volume-volume o peso-peso).",
      "Inserisci la quantità richiesta dalla ricetta.",
      "Scegli l'unità di partenza e l'unità desiderata.",
      "Leggi il risultato, o cerca la temperatura del forno nella tabella °F↔°C.",
    ],
    faqs: [
      {
        q: "Quanto sono accurati i grammi per tazza?",
        a: "Sono medie pubblicate (King Arthur, USDA e fonti simili), e i prelievi reali variano: una tazza di farina può differire del ±15% a seconda che tu riempia a cucchiai livellando o immerga la tazza direttamente nel sacco. I valori vanno bene per la cucina quotidiana; per la pasticceria, dove la precisione conta, pesa gli ingredienti e tratta la tabella come una stima.",
      },
      {
        q: "Quale tazza usa lo strumento?",
        a: "La tazza da cucina US da 240 ml, quella che assumono la maggior parte delle ricette americane e delle tabelle di conversione. Sono 16 cucchiai da 15 ml o 48 cucchiaini da 5 ml. Se una ricetta è stata scritta con tazze metriche (250 ml) o tazze imperiali britanniche (284 ml), i risultati slittano di qualche percento — scala di conseguenza.",
      },
      {
        q: "Perché 350 °F fanno 175 °C e non 176,7 °C?",
        a: "La conversione esatta è (350 − 32) × 5/9 = 176,7 °C, ma i forni sono graduati a passi di 5–10 gradi e chi scrive le ricette arrotonda all'impostazione famigliare più vicina, quindi 175 °C è l'abbinamento standard. La tabella mostra quelle coppie convenzionali; la vera temperatura della manopola del forno è comunque approssimativa.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* Sviluppo — generatore di immagini segnaposto                          */
  /* ------------------------------------------------------------------ */
  "placeholder-image-generator": {
    name: "Generatore di immagini segnaposto",
    tagline:
      "Genera immagini segnaposto di qualsiasi dimensione in SVG, PNG o JPG — scegli colori ed etichetta, anteprima immediata, poi scarica il file o copia il markup SVG.",
    intro: [
      "Mockup e wireframe hanno bisogno di riquadri immagine prima che esistano gli asset veri. Digita larghezza e altezza — un hero a 1200×630, un avatar a 256×256, o qualsiasi cosa da 1×1 fino a 5000×5000 — scegli i colori di sfondo e del testo, aggiungi facoltativamente un'etichetta, e il segnaposto si disegna in tempo reale mentre digiti.",
      "Scarica il risultato come SVG, PNG o JPG, o copia il markup SVG direttamente negli appunti: sono una manciata di elementi leggibili, non una zuppa di base64, quindi puoi incollarlo in HTML, JSX o Figma e modificare testo e colori a mano. Tutto è generato nel tuo browser; non parte nulla.",
    ],
    steps: [
      "Inserisci larghezza e altezza in pixel.",
      "Imposta i colori di sfondo e del testo, e un'etichetta facoltativa (predefinita: le dimensioni).",
      "Scarica in SVG, PNG o JPG — o copia il markup SVG e incollalo ovunque.",
    ],
    faqs: [
      {
        q: "Quando conviene SVG invece di PNG o JPG?",
        a: "SVG è testo: minuscolo, scalabile all'infinito e modificabile a mano, ideale per mockup, documenti e layout adatti alle e-mail. PNG è la scelta più sicura per le piattaforme che strapazzano l'SVG in linea (alcuni CMS e app di chat), e JPG si adatta ai segnaposto fotorealistici a peso contenuto. L'anteprima è identica in tutti e tre.",
      },
      {
        q: "Quali sono i limiti di dimensione e colore?",
        a: "Larghezza e altezza devono essere numeri interi tra 1 e 5000 pixel; i colori devono essere hex — #RRGGBB o la forma breve #RGB. Qualsiasi altra cosa viene respinta con un suggerimento invece di produrre in silenzio un'immagine rotta.",
      },
      {
        q: "Viene inviato qualcosa a un server?",
        a: "No. L'SVG è costruito da un template di stringa nel tuo browser e le versioni raster sono disegnate su una canvas locale. Nulla lascia la pagina: funziona offline ed è sicuro per design non ancora pubblicati.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* Calcolatori e timer — paga, affitto, risparmio, salute, tempo        */
  /* ------------------------------------------------------------------ */
  "overtime-pay-calculator": {
    name: "Calcolatore straordinari",
    tagline:
      "Calcola gli straordinari al 1,5× o 2× della tua tariffa oraria — paga normale, maggiorazione, totale settimanale e cifra annualizzata a partire dallo stipendio.",
    intro: [
      "Inserisci una tariffa oraria — oppure uno stipendio annuale che la calcolatrice converte usando le tue ore settimanali normali — e aggiungi le ore di straordinario che prevedi di fare. I risultati separano la paga normale dalla maggiorazione: tempo e mezzo per impostazione predefinita, tempo doppio se il contratto o le regole locali la prevedono.",
      "Tutto si aggiorna in tempo reale: la tariffa maggiorata, la paga normale e quella di straordinario della settimana, il totale settimanale combinato e la cifra annualizzata una volta moltiplicata per le settimane che lavori davvero all'anno. Rispecchia il modo in cui il Fair Labor Standards Act (FLSA) statunitense calcola gli straordinari dei dipendenti non esenti.",
    ],
    steps: [
      "Inserisci la tariffa oraria, oppure passa alla modalità stipendio e digita la paga annuale.",
      "Imposta le ore settimanali normali (40 per impostazione predefinita) e le settimane all'anno.",
      "Aggiungi le ore di straordinario e scegli il moltiplicatore — 1,5× o 2×.",
      "Leggi la tariffa maggiorata, la ripartizione settimanale e il totale annualizzato.",
    ],
    faqs: [
      {
        q: "Quando gli straordinari sono obbligatori negli Stati Uniti?",
        a: "Secondo il FLSA, i dipendenti non esenti devono guadagnare almeno 1,5 volte la loro tariffa normale per ogni ora oltre le 40 nella settimana lavorativa. L'esenzione dipende dai compiti e dal livello salariale; alcuni stati vanno oltre: la California, per esempio, attiva gli straordinari giornalieri oltre le 8 ore. Con una tariffa di 25,00, ogni ora di straordinario rende 37,50.",
      },
      {
        q: "Come la modalità stipendio trasforma lo stipendio in tariffa oraria?",
        a: "Divide lo stipendio annuale per le ore settimanali normali × le settimane all'anno — la stessa base della conversione da stipendio a tariffa oraria. Uno stipendio di 52.000 con settimane di 40 ore e 52 settimane fa esattamente 25,00 l'ora, quindi cinque ore di straordinario al 1,5× aggiungono 187,50 sopra la settimana normale di 1.000,00.",
      },
      {
        q: "Tutto lo stipendio entra nella tariffa di straordinario?",
        a: "Il FLSA calcola gli straordinari sulla «tariffa normale», che può includere più della retribuzione base — ad esempio i differenziali di turno e i bonus non discrezionali. Questa calcolatrice usa solo la tariffa base: se ricevi quegli extra, la tua tariffa legale di straordinario può essere più alta di quella mostrata qui.",
      },
    ],
  },
  "rent-affordability-calculator": {
    name: "Calcolatrice affitto sostenibile",
    tagline:
      "Trova l'affitto massimo che il tuo reddito mensile può sostenere con la regola del 30%, 33% o 40% — e vedi cosa resta dopo debiti e assicurazione.",
    intro: [
      "Inserisci il reddito mensile (lordo o netto), scegli il rapporto affitto/reddito — il classico 30% del lordo, un 33% più flessibile, o il 40% del netto per le città care — e la calcolatrice traccia il tuo tetto di affitto. Le altre rate dei debiti mensili e l'assicurazione dell'inquilino vengono poi sottratte, così il numero che vedi è realmente vivibile.",
      "Ottieni anche la percentuale debiti/reddito che porteresti con quell'affitto massimo, quella che i finanziatori guardano prima di approvare un contratto o un mutuo. La riga del budget scende onestamente sotto zero quando affitto più debiti superano il reddito — il segnale di cercare un affitto più economico invece di forzare.",
    ],
    steps: [
      "Inserisci il reddito mensile e indica se è lordo o netto.",
      "Scegli il rapporto affitto/reddito: 30%, 33% o 40%.",
      "Aggiungi le altre rate mensili dei debiti e l'assicurazione dell'inquilino, se ce le hai.",
      "Leggi il tetto di affitto, il budget residuo e il tuo rapporto debiti/reddito.",
    ],
    faqs: [
      {
        q: "Da dove viene la regola del 30% per l'affitto?",
        a: "Risale al Brooke Amendment statunitense del 1969, che limitava l'affitto degli alloggi pubblici al 25% del reddito, portato al 30% nel 1981. L'HUD chiama ancora «cost-burdened» le famiglie che spendono più del 30% del reddito per la casa — ecco perché il 30% del lordo è rimasto la scorciatoia per un affitto accessibile.",
      },
      {
        q: "Conviene calcolare l'affitto sul lordo o sul netto?",
        a: "La classica regola del 30% si applica al reddito lordo, quindi ignora le tasse e appare più generosa della busta paga. Se preferisci pianificare sul netto, un rapporto più alto come il 40% del netto arriva più o meno allo stesso punto. Ciò che conta è scegliere una base e restarci coerenti.",
      },
      {
        q: "Cosa significa qui la percentuale debiti/reddito?",
        a: "È la quota del tuo reddito assorbita dall'affitto massimo più i debiti e le assicurazioni elencate. I finanziatori in generale apprezzano un DTI totale sotto il 36%; sopra il 43% circa diventa difficile ottenere un mutuo. Una cifra alta significa che il tetto di affitto è troppo aggressivo rispetto ai tuoi altri impegni.",
      },
    ],
  },
  "apy-calculator": {
    name: "Calcolatore APY",
    tagline:
      "Converti un APR nominale nell'APY effettivo — e viceversa — per capitalizzazione giornaliera, mensile, trimestrale o annuale, con deposito opzionale.",
    intro: [
      "Un tasso nominale e uno effettivo non sono lo stesso numero, e la pubblicità sceglie in silenzio quello che rende meglio. Inserisci un tasso e una frequenza di capitalizzazione — giornaliera (365), mensile, trimestrale o annuale — e la calcolatrice converte l'APR in APY, o l'APY nell'APR nominale che lo produrrebbe.",
      "Aggiungi un deposito facoltativo e un orizzonte in anni per vedere in cosa diventano davvero i soldi: il saldo dopo la capitalizzazione e gli interessi guadagnati sopra. La conversione è esatta in entrambe le direzioni — cambia verso e verifica il round trip contro qualsiasi quotazione della banca.",
    ],
    steps: [
      "Digita il tasso che ti hanno quotato — un APR nominale o un APY effettivo.",
      "Scegli la frequenza di capitalizzazione: giornaliera, mensile, trimestrale o annuale.",
      "Facoltativamente aggiungi un deposito e il numero di anni per proiettare la crescita.",
      "Leggi il tasso convertito, il saldo finale e gli interessi guadagnati.",
    ],
    faqs: [
      {
        q: "Perché l'APY è più alto dell'APR a parità di tasso nominale?",
        a: "Perché la capitalizzazione paga interessi sugli interessi. APY = (1 + r ÷ n)^n − 1: un tasso nominale del 12% capitalizzato mensilmente diventa (1,01)^12 − 1 = 12,6825% effettivo — i 0,6825 punti extra sono gli interessi che i tuoi interessi guadagnano. Più spesso si capitalizza, più si allarga il divario: il giornaliero batte il mensile, il mensile batte l'annuale.",
      },
      {
        q: "Quale tasso confronto tra banche?",
        a: "Confronta APY con APY per risparmio e depositi vincolati — già incorpora la frequenza di capitalizzazione, quindi un APY del 5,10% capitalizzato mensilmente è davvero meglio di un APY del 5,05% capitalizzato annualmente. Per i prestiti, confronta APR con APR. Mescolare un APR con un APY nello stesso confronto è esattamente il modo in cui le quotazioni ingannano.",
      },
      {
        q: "L'opzione giornaliera usa 365 o 360 giorni?",
        a: "Questa calcolatrice usa 365 periodi all'anno, la convenzione che seguono la maggior parte dei conti di risparmio per consumatori. Alcuni prodotti finanziari annualizzano su base a 360 giorni, il che sposta leggermente il tasso effettivo — se le clausole dicono 360, considera il risultato come una buona approssimazione e non come una quotazione esatta.",
      },
    ],
  },
  "gpa-calculator": {
    name: "Calcolatore GPA",
    tagline:
      "Trasforma i corsi del semestre in un GPA sulla scala 4,0 con i punti qualità standard, poi fondili con i crediti precedenti in un GPA cumulativo onesto.",
    intro: [
      "Aggiungi ogni corso con i suoi crediti e il voto in lettere, e la calcolatrice applica la tabella standard dei punti qualità sulla scala 4,0 — A = 4,0, A− = 3,7, B+ = 3,3 e così via — ponderando ogni voto per i suoi crediti. Un A su 4 crediti vale più di un A su 3 crediti, esattamente come dice il tuo transcript.",
      "Hai già voti alle spalle? Inserisci il GPA precedente e i crediti conseguiti finora, e il risultato del semestre si fonde in un GPA cumulativo con la stessa media ponderata che fa il tuo segreteria. Le righe incomplete vengono saltate, non indovinate, quindi il numero riflette solo i corsi che hai davvero compilato.",
    ],
    steps: [
      "Aggiungi una riga per corso: nome (facoltativo), crediti e voto in lettere.",
      "Lascia vuoti i campi precedenti al primo semestre, oppure inserisci il tuo GPA attuale.",
      "Inserisci i crediti già conseguiti perché la fusione sia ponderata correttamente.",
      "Leggi il GPA del semestre e il GPA cumulativo combinato.",
    ],
    faqs: [
      {
        q: "Quanti punti qualità vale ogni voto in lettere?",
        a: "Sulla scala 4,0 standard: A+ e A = 4,0, A− = 3,7, B+ = 3,3, B = 3,0, B− = 2,7, C+ = 2,3, C = 2,0, C− = 1,7, D+ = 1,3, D = 1,0, D− = 0,7 e F = 0. GPA = Σ(punti × crediti) ÷ Σcrediti: un A su 4 crediti aporta 12 punti qualità contro i 9,9 di un B+ su 3 crediti.",
      },
      {
        q: "Come si fonde il GPA cumulativo tra due documenti?",
        a: "GPA cumulativo = (GPA del semestre × crediti del semestre + GPA precedente × crediti precedenti) ÷ crediti totali. Esempio: un semestre di 3,60 su 7 crediti sopra un transcript di 3,00 su 60 crediti dà (3,60 × 7 + 3,00 × 60) ÷ 67 ≈ 3,06. La ponderazione per crediti impedisce a un semestre leggero di deformare il tuo profilo.",
      },
      {
        q: "Perché una riga senza voto né crediti non cambia il mio GPA?",
        a: "Un corso conta solo quando crediti e voto in lettere sono entrambi presenti — tutto ciò che è compilato a metà viene scartato invece di valere zero, così il GPA riflette i corsi che hai davvero completato. Completa la riga e i totali si aggiornano subito.",
      },
    ],
  },
  "heart-rate-zones-calculator": {
    name: "Calcolatore zone cardiache",
    tagline:
      "Trasforma frequenza massimale e a riposo in cinque zone di allenamento Karvonen — riscaldamento, grassi, aerobico, anaerobico e VO₂ max, in bpm.",
    intro: [
      "Inserisci età e frequenza cardiaca a riposo e la calcolatrice stima la tua frequenza massimale (206,9 − 0,67 × età, una regressione da massimi misurati in laboratorio), poi taglia l'intervallo tra riposo e massimo nelle cinque zone di allenamento classiche. Un trentenne con riposo a 60 bpm ottiene un massimo vicino a 187 bpm e una fascia aerobica Z3 di circa 149–161 bpm — numeri reali da confrontare con fascia cardio o orologio.",
      "Le zone usano il metodo Karvonen della riserva di frequenza cardiaca: bpm = riposo + % × (max − riposo). Poiché a essere scalata è la riserva — non il massimo — le zone restano oneste per chi ha una frequenza a riposo insolitamente bassa o alta. Conosci il tuo massimo misurato con un test in laboratorio o una gara durissima? Passa alla modalità manuale e inseriscilo direttamente.",
    ],
    steps: [
      "Inserisci l'età per stimare la frequenza massimale, oppure passa a Manuale e digita un valore misurato.",
      "Inserisci la frequenza a riposo — la lettura del mattino, prima di alzarti, è la migliore.",
      "Leggi le cinque zone con la loro % di riserva e l'intervallo in bpm.",
      "Durante gli allenamenti abbina orologio o fascia cardio alla zona che stai cercando.",
    ],
    faqs: [
      {
        q: "206,9 − 0,67 × età è più preciso di 220 − età?",
        a: "Sì, a livello di popolazione. La vecchia regola 220 − età risale a una tabella degli anni '70 mai sottoposta a revisione tra pari e sovrastima la frequenza massimale degli adulti più anziani. Le regressioni moderne calibrate su massimi misurati in laboratorio — il 208 − 0,7 × età di Tanaka, il 207 − 0,7 × età di Gellish ed equazioni simili come il 206,9 − 0,67 × età usato qui — seguono i massimi reali molto meglio a tutte le età. Ma ogni equazione porta con sé un margine individuale di circa ±10 bpm: la stima è un punto di partenza, e un massimo misurato in laboratorio o in uno sforzo davvero al massimo vince sempre.",
      },
      {
        q: "Perché la calcolatrice usa la riserva di frequenza cardiaca (HRR) e non una percentuale della frequenza massimale?",
        a: "Il metodo Karvonen misura l'intensità dall'intervallo tra frequenza a riposo e massimale, la parte che lavora davvero. Usando la % del massimo direttamente, la zona 60–70% nell'esempio del trentenne sta a 112–131 bpm; usando la % della riserva sta a 136–149 bpm. Fisiologicamente lo sforzo scala con quanta riserva stai usando, quindi le zone basate sulla riserva si allineano meglio alle soglie ventilatorie e alla fatica percepita — specialmente per chi ha una frequenza a riposo bassa.",
      },
      {
        q: "Come misuro la mia frequenza a riposo?",
        a: "Prendila al mattino, appena sveglio e prima di alzarti dal letto: conta il polso per 60 secondi (o 30 secondi × 2) e ripeti per qualche giorno per mediare il rumore. Va bene anche la media a riposo su 7 giorni di un wearable. Un adulto tipico sta tra 60 e 80 bpm; gli atleti endurance ben allenati spesso si aggirano sui 40 o 50. Se la tua frequenza a riposo supera il massimo stimato — o un farmaco come i beta-bloccanti influenza la tua frequenza — inserisci entrambi i numeri manualmente.",
      },
    ],
  },
  "shoe-size-converter": {
    name: "Convertitore taglie scarpe",
    tagline:
      "Converti le taglie scarpe tra i sistemi US, UK, EU e giapponese per uomo e donna — ancorate alla lunghezza del piede in centimetri.",
    intro: [
      "Scegli qualsiasi sistema e taglia, e tutti gli equivalenti compaiono insieme, ancorati alla lunghezza del piede in centimetri perché il confronto sia fisico, non un'ipotesi.",
      "Le taglie non sono standardizzate tra i marchi — considera i risultati come punto di partenza e misura i piedi a fine giornata, quando sono più grandi.",
    ],
    steps: [
      "Scegli la tagliatura uomo o donna.",
      "Scegli il sistema che conosci e inserisci la taglia.",
      "Leggi le taglie equivalenti in tutti gli altri sistemi.",
    ],
    faqs: [
      {
        q: "Perché i marchi variano di mezza taglia?",
        a: "Le forme e la produzione cambiano. La tabella dà la conversione standard; i singoli marchi possono vestire piccolo o grande, quindi controlla sempre la tabella del marchio quando ordini online.",
      },
      {
        q: "Come misuro i miei piedi?",
        a: "Stai su un foglio di carta a fine giornata, traccia entrambi i piedi e misura dal tallone al dito più lungo in centimetri. Usa il piede più grande.",
      },
    ],
  },
  "stopwatch": {
    name: "Cronometro",
    tagline:
      "Un cronometro online preciso con tempi giro — avvia, pausa, giro e reset, con misurazione senza deriva ancorata all'orologio di sistema.",
    intro: [
      "Misura il tempo trascorso al centesimo di secondo usando l'orologio di sistema invece di accumulare intervalli, così resta accurato anche quando il browser rallenta una scheda in background.",
      "Registra i giri mentre gira; ogni giro mostra il suo parziale e il totale in corsa, con cifre tabulari grandi che restano leggibili a colpo d'occhio.",
    ],
    steps: [
      "Clicca Avvia per iniziare la misurazione.",
      "Clicca Giro per registrare un parziale senza fermare il cronometro.",
      "Metti in pausa, riprendi o azzera in qualsiasi momento.",
    ],
    faqs: [
      {
        q: "È accurato?",
        a: "Sì — il tempo trascorso deriva da Date.now() rispetto a un timestamp di partenza fisso, non da callback dei timer accumulati, quindi il throttling della scheda in background non può causare deriva.",
      },
      {
        q: "I giri sopravvivono a un ricaricamento della pagina?",
        a: "No — come un cronometro fisico, il reset o il ricaricamento cancella la sessione. Tieni aperta la scheda per conservare i giri.",
      },
    ],
  },
  "countdown-timer": {
    name: "Timer",
    tagline:
      "Imposta un conto alla rovescia con anello di avanzamento e suoneria a zero — preset da 1 a 25 minuti o qualsiasi durata personalizzata.",
    intro: [
      "Un conto alla rovescia pulito per cucina, allenamenti, riunioni e studio. L'anello mostra l'avanzamento a colpo d'occhio, e a fine tempo suona una breve campanella sintetizzata.",
      "La scadenza è ancorata all'orologio di sistema, quindi il conto alla rovescia continua a girare correttamente anche se passi a un'altra scheda.",
    ],
    steps: [
      "Imposta ore, minuti e secondi — o tocca un preset rapido.",
      "Clicca Avvia; l'anello si svuota mentre il tempo passa.",
      "A zero suona la campanella e l'anello diventa verde.",
    ],
    faqs: [
      {
        q: "Continua in una scheda in background?",
        a: "Sì — la scadenza è ancorata all'orologio di sistema, quindi cambiare scheda o il throttling non toccano il tempo rimanente.",
      },
      {
        q: "Sentirò la campanella?",
        a: "È un breve tono sintetizzato via WebAudio. Tieni la scheda non silenziata e il volume del dispositivo alzato; non c'è nessun file audio da scaricare.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* Sviluppo — TypeScript, diff JSON, percorsi JSON, YAML                */
  /* ------------------------------------------------------------------ */
  "json-to-typescript": {
    name: "JSON in TypeScript",
    tagline:
      "Genera interfacce TypeScript da qualsiasi JSON — oggetti annidati, array e unioni, pronti da incollare nel tuo progetto.",
    intro: [
      "Incolla una risposta JSON e ottieni all'istante interfacce tipate: gli oggetti annidati diventano interfacce nominate, gli array di oggetti si fondono in una sola forma, gli array misti diventano unioni. Il nome della radice è configurabile.",
      "Pensato per il lavoro con le API — incolla la risposta di un endpoint, copia i tipi e lascia che sia il compilatore a beccare i cambi di forma.",
    ],
    steps: [
      "Incolla il tuo JSON (una risposta di API funziona alla grande).",
      "Cambia il nome dell'interfaccia radice se vuoi qualcosa di diverso da Root.",
      "Copia le interfacce generate nel tuo progetto.",
    ],
    faqs: [
      {
        q: "Come vengono gestiti gli array?",
        a: "Gli array di oggetti fondono le chiavi di tutti gli elementi in una sola interfaccia (una chiave mancante sarebbe comunque un errore a runtime). Gli array con tipi misti diventano un'unione come string | number. Gli array vuoti degradano a unknown[].",
      },
      {
        q: "Tutti i campi sono obbligatori?",
        a: "Sì — un solo campione non può dimostrare l'opzionalità, quindi tutto è richiesto. Segna tu i campi opzionali dove la tua API consente null o chiavi assenti.",
      },
    ],
  },
  "json-diff": {
    name: "Confronto JSON",
    tagline:
      "Confronta due documenti JSON percorso per percorso — chiavi aggiunte, rimosse e modificate con valori prima/dopo, tutto in locale nel browser.",
    intro: [
      "Incolla due documenti JSON e guarda ogni differenza strutturale: chiavi aggiunte, chiavi rimosse, valori cambiati — ognuno riportato con il suo percorso completo come $.user.name.",
      "Gli oggetti e gli array annidati vengono percorsi ricorsivamente: un cambiamento sepolto a tre livelli di profondità compare comunque con il percorso esatto e entrambi i valori.",
    ],
    steps: [
      "Incolla il primo JSON (l'originale).",
      "Incolla il secondo JSON (la versione nuova).",
      "Leggi l'elenco delle differenze — ogni riga è un cambiamento a livello di percorso.",
    ],
    faqs: [
      {
        q: "Come vengono confrontati gli array?",
        a: "Per indice: elemento 0 contro elemento 0 e così via. Gli elementi in più da una parte compaiono come aggiunti o rimossi al loro indice.",
      },
      {
        q: "L'ordine delle chiavi conta?",
        a: "No — gli oggetti vengono confrontati per chiavi, non per ordine di inserimento. Due documenti con le stesse chiavi in ordine diverso sono identici.",
      },
    ],
  },
  "json-path-query": {
    name: "Query JSON Path",
    tagline:
      "Estrai qualsiasi valore dal JSON con un percorso come $.user.name o $.items[0].id — immediato, indulgente, senza sintassi jq da imparare.",
    intro: [
      "Punta esattamente al valore che ti serve: notazione a punti, indici di array e chiavi tra virgolette funzionano ($.items[0].id, $['weird key']). Ottimo per tirare fuori un campo da una risposta API enorme.",
      "Non lancia mai eccezioni — un percorso sbagliato restituisce un motivo in parole piane (chiave non trovata, indice fuori intervallo) così puoi correggere e riprovare.",
    ],
    steps: [
      "Incolla il tuo JSON.",
      "Scrivi il percorso del valore che vuoi — $ è la radice.",
      "Copia il valore estratto.",
    ],
    faqs: [
      {
        q: "Quale sintassi di percorso è supportata?",
        a: "Il sottoinsieme quotidiano: notazione a punti ($.a.b), indici di array ($.items[0]), chiavi tra virgolette ($['odd key']). I filtri e i wildcard del JSONPath completo sono fuori scopo — questo strumento fa estrazione diretta.",
      },
      {
        q: "Cosa succede con un percorso sbagliato?",
        a: "Ottieni il motivo esatto: quale chiave mancava o quale indice era fuori intervallo. Niente si rompe.",
      },
    ],
  },
  "json-yaml-converter": {
    name: "Convertitore JSON ⇄ YAML",
    tagline:
      "Converti JSON in YAML e viceversa — pronto per i file di configurazione, con scambio di direzione per continuare e messaggi d'errore precisi.",
    intro: [
      "Conversione bidirezionale tra JSON e YAML: incolla JSON e ottieni YAML pulito a 2 spazi per i tuoi file di configurazione; incolla YAML e ottieni JSON. Il pulsante di scambio inverte la direzione così completi l'andata e ritorno in un solo pannello.",
      "Basato su js-yaml con segnalazione errori precisa — un'indentazione sbagliata o una chiave duplicata ti mostra esattamente cosa non va invece di un fallimento criptico.",
    ],
    steps: [
      "Incolla JSON o YAML a seconda della direzione.",
      "Clicca converti — l'output appare qui sotto.",
      "Usa il pulsante di scambio per continuare a convertire nell'altra direzione.",
    ],
    faqs: [
      {
        q: "Quali funzionalità YAML sono supportate?",
        a: "Lo schema core standard di js-yaml: mappe annidate, sequenze, scalari, stringhe tra virgolette. Ancore YAML e tag personalizzati restano fuori scopo per garantire andate e ritorni affidabili.",
      },
      {
        q: "Perché la mia conversione è fallita?",
        a: "Nella maggior parte dei casi è una tabulazione nell'indentazione YAML (lì vietata) o chiavi duplicate nel JSON. Il messaggio d'errore indica il problema.",
      },
    ],
  },
};
