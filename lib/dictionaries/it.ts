// it: dizionario UI italiano — forma chiavi identica a en (tests/seo.test.ts fa un confronto ricorsivo).
// Registro informale ("tu"), coerente con il resto del sito. "Zoyku" e i segnaposto {n}/{count}/{query}/{category} restano intatti.
const it = {
  brand: "Zoyku",
  tagline: "Ogni strumento gira nel tuo browser.",
  metaDesc:
    "{n} strumenti online gratuiti per PDF, immagini, testo, sviluppatori e altro. Tutto gira nel tuo browser: i tuoi file non lasciano mai il dispositivo.",

  nav: {
    tools: "Tutti gli strumenti",
    categories: "Categorie",
    about: "Chi siamo",
    search: "Cerca",
    menu: "Menu",
    language: "Lingua",
  },

  home: {
    heroTitle: "Strumenti gratuiti che non caricano mai i tuoi file",
    heroSub:
      "{n} strumenti per PDF, immagini, testo, codice e calcoli di tutti i giorni. Tutto gira in locale nel tuo browser: veloce, gratis, senza registrazione e senza upload.",
    browseAll: "Sfoglia tutti gli strumenti",
    pinned: "Fissati",
    pin: "Fissa in alto",
    unpin: "Rimuovi dai fissati",
    popular: "Popolari adesso",
    categoriesTitle: "Categorie",
    featuredTitle: "Strumenti popolari",
    trustLocal: "I file restano sul tuo dispositivo",
    trustFree: "Gratis, senza account",
    trustFast: "Istantaneo, funziona offline",
    rotating: [
      "Unisci 20 PDF in uno — senza un solo upload",
      "Comprimi le foto a un quarto della dimensione, anche offline",
      "Contratti, scansioni e screenshot — elaborati direttamente nella scheda",
      "Niente account, niente watermark, niente avvisi sulla dimensione dei file",
    ],
    statsLabels: { tools: "strumenti", languages: "lingue", uploads: "upload", accounts: "account" },
    eyebrow: "Gratis per sempre",
    heroCtaSecondary: "Come funziona",
    statsTools: "{n} strumenti",
    statsLanguages: "{n} lingue",
    statsUploads: "0 upload",
    statsAccounts: "0 account",
    categoriesSub: "Sette famiglie di strumenti, tutti in esecuzione sul tuo dispositivo.",
    popularSub: "Gli strumenti che le persone aprono più spesso.",
    privacyTitle: "I tuoi file non lasciano mai il tuo dispositivo.",
    privacySub:
      "Non esiste un passaggio di upload. Gli strumenti sono JavaScript in esecuzione nel tuo browser: non è una promessa in una privacy policy, è come sono costruiti.",
    privacyPoint1T: "Elaborazione locale",
    privacyPoint1D:
      "I file vengono letti con la File API del browser ed elaborati in memoria. Nulla viene trasmesso, da nessuna parte.",
    privacyPoint2T: "Nessun account",
    privacyPoint2D: "Niente registrazione, niente email, niente cronologia salvata. Apri uno strumento e usalo.",
    privacyPoint3T: "Onesti per costruzione",
    privacyPoint3D:
      "Se qualcosa non si può davvero fare nel browser, lo diciamo invece di fingere il contrario.",
    privacyLink: "Leggi la nota privacy completa",
    endTitle: "Scegli uno strumento. Funziona, e basta.",
    endSub: "Quindici lingue, zero upload, niente da installare.",
    allToolsTitle: "Tutti gli strumenti, una sola pagina",
    allToolsSub: "L'elenco completo — {count} strumenti in 7 categorie, tutto in locale.",
    faqs: [
      { q: "Zoyku è davvero gratuito?", a: "Sì — tutti gli strumenti sono gratuiti, senza account, senza watermark e senza limiti d'uso. Non esiste una versione premium che nasconde le funzioni che ti servono." },
      { q: "I miei file vengono caricati su un server?", a: "No. Ogni strumento è JavaScript che gira nella tua scheda: i file vengono letti con la File API del browser ed elaborati in memoria. Nulla viene trasmesso." },
      { q: "Quanti strumenti ci sono?", a: "{n} strumenti in 7 categorie — PDF, immagini, testo, sviluppatori, SEO, sicurezza e utilità — e il numero cresce a ogni versione." },
      { q: "Funziona offline?", a: "Dopo il primo caricamento della pagina, lo strumento continua a funzionare senza connessione, perché l'elaborazione è tutta locale. Solo la prima apertura richiede la rete." },
      { q: "Devo creare un account?", a: "Mai. Niente registrazione, niente e-mail, niente cronologia — apri lo strumento e usalo." },
      { q: "Quali formati di file sono supportati?", a: "La famiglia PDF copre unione, divisione, compressione e conversioni con Word, JPG e altri; la famiglia immagini copre HEIC, WebP, PNG, SVG e altri. Ogni pagina elenca esattamente i formati accettati." },
    ],

  },

  tools: {
    noResults: "Nessuno strumento corrisponde.",
    title: "Tutti gli strumenti",
    subtitle: "Cerca tra {count} strumenti gratuiti nel browser. Nessun upload, nessuna registrazione.",
    filterPlaceholder: "Cerca strumenti…",
    count: "{count} strumenti",
    empty: "Nessuno strumento corrisponde a “{query}”.",
  },

  categories: {
    pdf: { name: "PDF", desc: "Unisci, dividi, converti e modifica file PDF senza caricarli da nessuna parte." },
    image: { name: "Immagini", desc: "Comprimi, ridimensiona, ritaglia e converti immagini direttamente nel tuo browser." },
    text: { name: "Testo", desc: "Conta, pulisci, ordina e trasforma il testo all'istante, mentre scrivi." },
    developer: { name: "Sviluppo", desc: "Formattatori, codificatori, decodificatori e generatori per il lavoro di ogni giorno." },
    seo: { name: "SEO", desc: "Meta tag, markup schema, anteprima SERP e altri aiuti per la SEO on-page." },
    security: { name: "Sicurezza", desc: "Password, hash e ricerche — generati e verificati sul tuo dispositivo." },
    utility: { name: "Utilità", desc: "Convertitori di unità, calcolatori e aiuti per la vita di tutti i giorni." },
  },

  tool: {
    howTo: "Come si usa",
    faq: "Domande frequenti",
    related: "Strumenti correlati",
    nextStep: "Passaggi successivi",
    copyLink: "Copia link",
    privacyNote:
      "Questo strumento gira interamente nel tuo browser. I tuoi dati non lasciano mai il dispositivo: non vengono caricati su nessun server.",
    inCategory: "Altri in {category}",
    backToCategory: "Tutti gli strumenti {category}",
  },

  common: {
    openTool: "Apri strumento",
    copy: "Copia",
    close: "Chiudi",
    copied: "Copiato",
    download: "Scarica",
    reset: "Reimposta",
    swap: "Inverti",
    clear: "Svuota",
    error: "Qualcosa è andato storto. Controlla i dati inseriti e riprova.",
    input: "Input",
    output: "Risultato",
    settings: "Opzioni",
    dropFiles: "Trascina qui i file o clicca per sceglierli",
    dropFile: "Trascina qui un file o clicca per sceglierlo",
    processing: "Elaborazione…",
    fileSize: "Dimensione",
    sample: "Prova un esempio",
    uppercase: "MAIUSCOLO",
  },

  unit: {
    from: "Da",
    to: "A",
    amount: "Quantità",
    result: "Risultato",
    common: "Conversioni comuni",
    formula: "Formula",
    allUnits: "Tutte le unità",
  },

  text: {
    stats: {
      words: "Parole",
      characters: "Caratteri",
      charsNoSpaces: "Senza spazi",
      sentences: "Frasi",
      paragraphs: "Paragrafi",
      lines: "Righe",
      readingTime: "Tempo di lettura",
      readingMinutes: "{n} min di lettura",
      emptyHint: "Inizia a digitare o incolla il testo: tutte le statistiche si aggiornano in tempo reale.",
      uniqueWords: "Parole uniche",
      avgWordLen: "Lung. media parola",
      pages: "Pagine",
      speakingTime: "Tempo di parlata",
      keywordsTitle: "Parole chiave principali",
      keywordCount: "{count}× ({pct}%)",
      avgSentence: "Frase media (parole)",
      longestSentence: "Frase più lunga (parole)",
      readingLevel: "Livello di lettura",
      limitsTitle: "Limiti per piattaforma",
      charsLeft: "{n} rimanenti",
      charsOver: "{n} in più",
    },
  },

  footer: {
    line: "Strumenti gratuiti nel browser. Nulla di ciò che fai qui lascia il tuo dispositivo.",
    privacy: "Privacy",
    terms: "Termini",
    about: "Chi siamo",
    badges: "Badge",
    language: "Lingua",
  },

  badge: {
    title: "Badge Zoyku",
    desc: "Metti un badge Zoyku sul tuo sito, nel README o nella documentazione. Rimanda qui e racconta che gli strumenti dietro a quel badge girano interamente nel browser.",
    voluntary: "L'incorporamento è del tutto volontario: scegli un badge se il progetto ti piace. Non serve alcun permesso.",
    md: "Markdown (README)",
    html: "HTML (sito web)",
    thanks: "Grazie per spargere la voce: ogni incorporamento aiuta più persone a scoprire strumenti che rispettano i loro file.",
  },

    embed: {
    title: "Incorpora questo strumento",
    desc: "Metti questo strumento sul tuo sito con una riga: gira nel browser del visitatore.",
  },

    mcp: {
    title: "Server MCP — strumenti accessibili all'IA",
    desc1: "Zoyku include un server MCP (Model Context Protocol): assistenti IA come Claude o Cursor possono eseguire le stesse calcolatrici e conversioni di questo sito — stessa logica testata, senza reimplementazione.",
    desc2: "Gli strumenti eseguono le funzioni pure del sito (conversione di unità, finanza, stime di salute, elaborazione del testo). Girano via npx sulla macchina del client IA; nulla viene inviato ai nostri server.",
    toolsTitle: "Strumenti eseguibili ({n})",
    requiresNode: "Richiede Node.js 18+. Il server gira localmente via stdio; solo le chiamate che fai vengono calcolate sulla tua macchina.",
    privacy: "Richiede Node.js 18+. Il server gira localmente via stdio; solo le chiamate che fai vengono calcolate sulla tua macchina.",
  },

    notFound: {
    title: "Pagina non trovata",
    body: "Lo strumento che cerchi non esiste. Sfoglia invece tutti gli strumenti.",
    home: "Vai alla homepage",
  },
};

export default it;
