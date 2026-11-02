import type { ToolCopy } from "../_lib/types";

/**
 * Couverture française (fr) des outils du registre : un bloc ToolCopy complet par slug.
 * Contrat : chaque slug du registre est couvert (tests/overlays.test.ts + tests/registry.test.ts).
 * Vouvoiement constant ; « Zoyku » et les tokens techniques (PDF, JPG, JSON…) restent en l'état.
 */
export const fr: Record<string, ToolCopy> = {
  /* ------------------------------------------------------------------ */
  /* PDF                                                                 */
  /* ------------------------------------------------------------------ */
  "compress-pdf": {
    name: "Compresser PDF",
    tagline:
      "Réduisez le poids des PDF volumineux en rasterisant les pages au DPI et à la qualité JPEG choisis — traitement par lots et tailles avant/après exactes, 100 % hors ligne.",
    intro: [
      "Les scans et les rapports riches en images sont souvent 10 fois plus lourds que nécessaire. Cet outil redessine chaque page à la résolution de votre choix (72 à 150 DPI couvrent la lecture à l'écran et la plupart des impressions) et la réencode en JPEG optimisé, ce qui réduit généralement la taille de 50 à 90 %.",
      "Traitez plusieurs fichiers à la fois et visualisez les économies exactes par fichier avant de télécharger. Le mode niveaux de gris allège encore davantage les scans en noir et blanc. Tout s'exécute sur votre appareil : compressés ou non, vos documents restent chez vous.",
    ],
    steps: [
      "Déposez un ou plusieurs fichiers PDF (le traitement par lots est bienvenu).",
      "Choisissez le DPI et la qualité JPEG, ou activez les niveaux de gris.",
      "Cliquez sur Compresser, comparez les tailles avant/après, puis téléchargez.",
    ],
    faqs: [
      {
        q: "Mon PDF aura-t-il encore du texte sélectionnable après la compression ?",
        a: "Non — cette méthode rasterise les pages en images, le texte devient donc des pixels. C'est le prix à payer pour une forte réduction de taille. Si vous avez besoin d'un texte recherchable, conservez l'original et ne partagez la copie compressée que là où le poids compte.",
      },
      {
        q: "Quels réglages choisir ?",
        a: "96 DPI à environ 60 % de qualité constituent un bon réglage par défaut pour l'e-mail et le web. Comptez 150 DPI si le PDF doit être imprimé ; 72 DPI en niveaux de gris est agressif mais convient aux archives de texte pur.",
      },
      {
        q: "Et si le fichier rétrécit à peine ?",
        a: "Les PDF très pauvres, uniquement textuels, sont déjà efficaces et peuvent ne pas se compresser — le tableau vous le dira honnêtement. Baissez le DPI ou la qualité et réessayez, ou acceptez que l'original était déjà léger.",
      },
    ],
  },
  "delete-pdf-pages": {
    name: "Supprimer des pages PDF",
    tagline:
      "Retirez les pages inutiles d'un PDF en quelques secondes — indiquez les pages à supprimer, téléchargez le fichier allégé, tout se traite dans votre navigateur.",
    intro: [
      "Pages blanches, ancienne couverture, page contenant les données de quelqu'un d'autre — saisissez-les sous la forme « 1, 3-5 » et obtenez un PDF propre avec tout le reste intact. L'outil affiche le nombre de pages du document pour que vous vérifiiez les numéros avant de couper.",
      "Les pages restantes sont copiées à l'octet près : le texte reste sélectionnable et les images gardent leur qualité. Tout se passe localement avec pdf-lib ; le fichier n'est jamais envoyé.",
    ],
    steps: [
      "Déposez le PDF à alléger.",
      "Saisissez les pages à supprimer, par exemple « 2, 6-8 ».",
      "Cliquez sur Supprimer les pages et téléchargez le document restant.",
    ],
    faqs: [
      {
        q: "Puis-je supprimer toutes les pages d'un document ?",
        a: "Non — un PDF doit contenir au moins une page. Si vous saisissez toutes les pages, l'outil refusera ; supprimez plutôt tout sauf une si c'est ce dont vous avez besoin.",
      },
      {
        q: "Comment ne garder que quelques pages ?",
        a: "Plus simple de raisonner à l'envers : supprimez tout ce dont vous ne voulez pas. « 2-10, 12 » sur un document de 12 pages laisse les pages 1 et 11.",
      },
      {
        q: "Que devient la numérotation des pages ?",
        a: "Les pages se referment automatiquement : après suppression des pages 2 à 4, l'ancienne page 5 devient la page 2. Les liens internes pointant vers des pages supprimées peuvent cesser de fonctionner.",
      },
    ],
  },
  "image-to-pdf": {
    name: "Image vers PDF",
    tagline:
      "Regroupez des images de tout format — JPG, PNG, WebP, GIF et plus — en un seul PDF, avec conversion automatique et zéro envoi.",
    intro: [
      "Un seul outil pour toutes vos images : déposez un lot mixte de fichiers JPG, PNG, WebP, GIF ou BMP et tous atterrissent dans un même PDF. Ce qui n'est pas déjà prêt pour le PDF est converti localement via un canvas : les lots mixtes fonctionnent sans réglage.",
      "Triez les pages, choisissez l'ajustement à l'image ou A4/Letter avec marges, puis exportez. C'est la version couteau suisse de nos convertisseurs JPG et PNG, avec la même promesse : vos fichiers ne quittent jamais votre appareil.",
    ],
    steps: [
      "Déposez des images dans n'importe quel mélange de formats pris en charge.",
      "Réorganisez la liste et choisissez le format de page.",
      "Cliquez sur Créer le PDF et téléchargez votre document.",
    ],
    faqs: [
      {
        q: "Quels formats sont pris en charge ?",
        a: "Tout ce que votre navigateur sait afficher : JPG, PNG, WebP, GIF, BMP et AVIF sur la plupart des systèmes. Les fichiers déjà en JPG ou PNG sont intégrés sans réencodage ; les autres sont d'abord convertis en PNG sans perte.",
      },
      {
        q: "Que deviennent les photos HEIC d'un iPhone ?",
        a: "Les navigateurs récents ne savent souvent pas décoder le HEIC directement. Convertissez-les d'abord avec notre outil HEIC vers JPG, puis assemblez les JPG ici.",
      },
      {
        q: "Les GIF animés restent-ils animés dans le PDF ?",
        a: "Non — une page de PDF est statique, vous obtenez donc la première image. Convertissez les animations en vidéo ou partagez le GIF lui-même.",
      },
    ],
  },
  "jpg-to-pdf": {
    name: "JPG vers PDF",
    tagline:
      "Transformez vos photos JPG en un PDF propre dans votre navigateur — import par lots, réorganisation sans glisser-déposer et pages A4, Letter ou ajustées à l'image.",
    intro: [
      "Convertissez autant de photos JPG que vous voulez en un seul PDF bien rangé : photos d'identité, reçus, devoirs scannés ou pellicule à envoyer en pièce jointe unique. Ajoutez toutes les images d'un coup, triez-les avec les boutons fléchés, puis choisissez si chaque page épouse la photo ou utilise un format A4/Letter avec marge.",
      "Les photos sont intégrées à leur qualité d'origine — pas de redimensionnement, pas de recompression, pas de filigrane. La conversion se fait sur votre appareil : même des images privées ne touchent jamais un serveur.",
    ],
    steps: [
      "Déposez toutes les images JPG à inclure.",
      "Rangez l'ordre et choisissez un format de page (ajusté, A4 ou Letter).",
      "Cliquez sur Créer le PDF et téléchargez le résultat.",
    ],
    faqs: [
      {
        q: "Les photos perdent-elles en qualité dans le PDF ?",
        a: "Non. Vos fichiers JPG sont intégrés à l'octet près : les données d'image du PDF sont identiques aux originales. La qualité ne baisse que si vous compressez le PDF ensuite.",
      },
      {
        q: "Combien d'images puis-je convertir d'un coup ?",
        a: "Autant que la mémoire de votre navigateur le permet — des dizaines sont courantes ; des centaines de photos de plusieurs mégaoctets peuvent être lentes mais fonctionnent toujours localement.",
      },
      {
        q: "Puis-je mélanger des JPG avec des PNG ou d'autres formats ?",
        a: "Oui — utilisez l'outil général Image vers PDF pour les lots mixtes ; il convertit les autres formats automatiquement avant l'intégration.",
      },
    ],
  },
  "merge-pdf": {
    name: "Fusionner PDF",
    tagline:
      "Assemblez plusieurs PDF en un seul document directement dans votre navigateur — réorganisez les fichiers librement, sans envoi, sans filigrane, sans inscription.",
    intro: [
      "Déposez autant de PDF que nécessaire, rangez-les dans l'ordre exact voulu et fusionnez-les en un fichier unique. Réservations, factures, chapitres scannés, dossiers de candidature — tout ce qui arrive en dix pièces jointes séparées devient un document bien propre.",
      "Contrairement aux services en ligne qui envoient vos fichiers sur un serveur, cet outil lit et écrit les PDF entièrement sur votre appareil avec pdf-lib. Contrats, papiers d'identité et documents financiers ne quittent jamais votre navigateur.",
    ],
    steps: [
      "Déposez au moins deux fichiers PDF dans la zone (ou cliquez pour les choisir).",
      "Réorganisez la liste avec les boutons ↑ / ↓ jusqu'à obtenir le bon ordre.",
      "Cliquez sur Fusionner les PDF et téléchargez le fichier assemblé.",
    ],
    faqs: [
      {
        q: "Combien de PDF puis-je fusionner, et quelle taille maximale ?",
        a: "Aucune limite artificielle — le plafond pratique est la mémoire de votre appareil. Un ordinateur portable récent fusionne confortablement plus de 20 fichiers ou environ 100 à 200 Mo au total ; les scans très volumineux peuvent être plus lents mais fonctionnent.",
      },
      {
        q: "Les signets, champs de formulaire et annotations survivent-ils à la fusion ?",
        a: "Le contenu des pages, les images et la plupart des annotations sont conservés. Les éléments de niveau document comme les signets et les valeurs de champs de formulaire ne sont pas reportés — le fichier fusionné contient les pages visuelles de chaque source.",
      },
      {
        q: "Mes fichiers sont-ils envoyés quelque part ?",
        a: "Non. La fusion s'effectue localement dans votre navigateur en JavaScript. Rien n'est envoyé à aucun serveur, et le PDF fusionné est généré sur votre propre appareil.",
      },
    ],
  },
  "ocr-pdf": {
    name: "OCR PDF",
    tagline:
      "Appliquez l'OCR à des PDF scannés entièrement dans votre navigateur — reconnaissez l'anglais, le chinois, le japonais et plus, puis copiez ou enregistrez le texte.",
    intro: [
      "Contrats scannés, reçus et livres n'ont pas de texte sélectionnable — l'OCR le leur donne. Chaque page est rendue dans votre navigateur puis lue par le moteur Tesseract, avec des langues : anglais, chinois simplifié, japonais, espagnol, portugais, français et allemand.",
      "Au premier usage, votre navigateur télécharge le moteur OCR et le modèle de langue (10 à 20 Mo) depuis un CDN public — c'est le seul trafic réseau, et il ne contient jamais votre document. La reconnaissance elle-même se déroule sur votre appareil.",
    ],
    steps: [
      "Déposez un PDF scanné et choisissez la langue du document.",
      "Limitez éventuellement l'OCR à certaines pages, puis cliquez sur Lancer l'OCR.",
      "Copiez le texte reconnu ou téléchargez-le en fichier .txt.",
    ],
    faqs: [
      {
        q: "Pourquoi le premier lancement demande-t-il une connexion Internet ?",
        a: "Le moteur OCR Tesseract et son modèle de langue sont récupérés depuis un CDN au premier usage (10 à 20 Mo, mis en cache ensuite). Le PDF lui-même n'est jamais envoyé — la reconnaissance s'exécute localement une fois le modèle chargé.",
      },
      {
        q: "Comment améliorer la précision de la reconnaissance ?",
        a: "Scannez à 300 DPI, gardez la page droite et choisissez la bonne langue. Des pages propres en noir et blanc dépassent largement 90 % de précision ; des photos de travers avec des ombres font bien pire.",
      },
      {
        q: "Peut-il lire l'écriture manuscrite ?",
        a: "Pas de façon fiable. Tesseract est entraîné sur du texte imprimé — une typographie soignée fonctionne, l'écriture cursive produit le plus souvent n'importe quoi.",
      },
    ],
  },
  "page-numbers-pdf": {
    name: "Numérotation PDF",
    tagline:
      "Apposez des numéros de page sur un PDF — choisissez le format, le coin et le numéro de départ, le tout localement dans votre navigateur.",
    intro: [
      "Donnez à un PDF de vrais numéros de page avant impression ou partage : choisissez un format (1, 1/N ou Page 1 sur N), l'un des six coins, le numéro de départ — le fichier est reconstruit sur votre appareil et prêt à télécharger.",
      "Utile pour les rapports, les contrats, les ensembles scannés et tout document que l'on référence par page en réunion.",
    ],
    steps: [
      "Déposez le PDF à numéroter.",
      "Choisissez le format, le coin et le numéro de départ.",
      "Cliquez sur Ajouter les numéros de page et téléchargez le fichier tamponné.",
    ],
    faqs: [
      {
        q: "Puis-je sauter la page de couverture ?",
        a: "Réglez « Commencer la numérotation à » sur 0 : la couverture reçoit le numéro 0 — ou séparez d'abord la couverture, numérotez le reste, puis refusionnez le tout.",
      },
      {
        q: "Les numéros restent-ils cohérents entre formats de pages ?",
        a: "Chaque page est tamponnée par rapport à sa propre largeur et hauteur : orientations et formats mixtes reçoivent tous leur numéro dans le même coin visuel.",
      },
    ],
  },
  "pdf-to-excel": {
    name: "PDF vers Excel",
    tagline:
      "Extrayez les lignes et colonnes d'un PDF vers une feuille Excel (.xlsx) modifiable — conversion ligne par ligne dans votre navigateur, gratuitement.",
    intro: [
      "Relevés bancaires, listes de prix et rapports enfermés dans un PDF redeviennent des données exploitables : chaque ligne visuelle devient une ligne de tableur, et le texte séparé par de grands espaces est découpé en colonnes automatiquement. Les numéros de page sont conservés en première colonne pour tout retracer.",
      "Il s'agit d'une extraction pratique et textuelle — pas d'une reconstruction de tableaux par IA. Elle excelle sur les relevés à police fixe et les listes alignées ; les tableaux multi-lignes anarchiques peuvent demander un petit nettoyage dans Excel. En échange : vos données ne quittent jamais l'appareil.",
    ],
    steps: [
      "Déposez un PDF textuel (texte sélectionnable, pas un scan photo).",
      "Cliquez sur Convertir en Excel.",
      "Téléchargez le .xlsx et remettez d'aplomb les lignes fusionnées dans Excel.",
    ],
    faqs: [
      {
        q: "Comment les colonnes sont-elles détectées ?",
        a: "Les lignes sont découpées en cellules dès que deux espaces consécutifs ou plus apparaissent — l'indice d'alignement habituel du texte PDF. Les tableaux bien alignés se convertissent proprement ; la prose devient une cellule par ligne.",
      },
      {
        q: "Mon relevé scanné donne une feuille vide.",
        a: "Les scans n'ont pas de couche texte. Passez d'abord le fichier dans notre outil OCR, puis collez le texte reconnu dans Excel, ou convertissez ici la sortie OCR.",
      },
      {
        q: "Les nombres gardent-ils leur mise en forme ?",
        a: "Les valeurs arrivent en texte exactement comme imprimées, zéros initiaux et virgules décimales régionales compris — Excel les traite comme du texte jusqu'à la conversion de la colonne.",
      },
    ],
  },
  "pdf-to-jpg": {
    name: "PDF vers JPG",
    tagline:
      "Exportez chaque page d'un PDF en image JPG jusqu'à 300 DPI — pages seules ou ZIP pour les longs documents, convertis directement sur votre appareil.",
    intro: [
      "Transformez un PDF en images partageables : chaque page devient un JPG à la résolution choisie, rendue exactement comme la page s'affiche — polices, couleurs et images incluses. Dix pages donnent dix fichiers numérotés ; au-delà d'une page, un ZIP est aussi généré.",
      "JPG est le format que les messageries, diaporamas et plateformes sociales acceptent partout. Le rendu se fait localement avec pdf.js — le PDF n'est jamais envoyé, ce qui compte pour les contrats et les documents personnels.",
    ],
    steps: [
      "Déposez le PDF à convertir.",
      "Choisissez la résolution de sortie (150 DPI convient à la plupart des écrans).",
      "Cliquez sur Convertir et téléchargez chaque page ou le ZIP.",
    ],
    faqs: [
      {
        q: "Quelle résolution choisir ?",
        a: "96 DPI suffisent pour l'écran, 150 DPI est le réglage équilibré par défaut et 200 à 300 DPI conviennent à l'impression. Un DPI plus élevé signifie des fichiers plus gros et un rendu plus lent sur les longs documents.",
      },
      {
        q: "Pourquoi le texte paraît-il plus mou que dans le PDF ?",
        a: "JPG est un format photo avec perte — à basse qualité, les bords nets des lettres prennent de légers artefacts. Augmentez le DPI ou utilisez l'outil PDF vers PNG pour un texte au pixel près.",
      },
      {
        q: "Puis-je ne convertir que certaines pages ?",
        a: "Cet outil convertit tout le document et nomme les fichiers par numéro de page : gardez seulement ceux qu'il vous faut. Utilisez d'abord Diviser PDF si vous voulez une plage précise à l'avance.",
      },
    ],
  },
  "pdf-to-png": {
    name: "PDF vers PNG",
    tagline:
      "Convertissez les pages d'un PDF en PNG sans perte à la résolution choisie — diapositives et scans nets, avec un ZIP dès que les pages sont nombreuses.",
    intro: [
      "Quand les artefacts du JPG ne sont pas les bienvenus — captures de diapositives, diagrammes, formulaires en petits caractères — exportez les pages en PNG. Le format sans perte garde les bords des lettres et les traits fins d'une netteté parfaite, de 96 à 300 DPI.",
      "Chaque page est rendue localement avec pdf.js à l'apparence exacte définie par le PDF. Les fichiers sont nommés par numéro de page et les résultats multi-pages arrivent avec un ZIP en un clic.",
    ],
    steps: [
      "Déposez votre PDF dans la zone.",
      "Choisissez la résolution — 150 DPI est une valeur par défaut solide.",
      "Cliquez sur Convertir en PNG, puis téléchargez les pages ou le ZIP.",
    ],
    faqs: [
      {
        q: "Quand préférer PNG plutôt que JPG ?",
        a: "Dès que les pages contiennent du texte, des aplats ou du trait : PNG les garde parfaitement nets. JPG convient aux pages photographiques où le petit poids prime.",
      },
      {
        q: "Pourquoi les fichiers PNG sont-ils gros ?",
        a: "La compression sans perte conserve chaque pixel : la taille croît avec le DPI. Un scan à 300 DPI d'une page dense peut atteindre plusieurs mégaoctets ; redescendez à 96–150 DPI pour l'écran.",
      },
      {
        q: "La transparence est-elle préservée ?",
        a: "Les pages sont rendues sur fond blanc : la sortie est un PNG opaque. Cela correspond à l'impression des PDF et évite les mauvaises surprises de fond noir dans certains visualiseurs.",
      },
    ],
  },
  "pdf-to-ppt": {
    name: "PDF vers PowerPoint",
    tagline:
      "Convertissez chaque page d'un PDF en diapositive PowerPoint sous forme d'image haute résolution — des diapositives fidèles à la mise en page, générées sur votre propre appareil.",
    intro: [
      "Votre PDF doit entrer dans une présentation ? Chaque page est rendue en haute résolution et placée sur sa propre diapositive 16:9 : le rendu visuel correspond exactement à l'original — polices, couleurs et graphiques restent en place, même si le destinataire n'a pas les polices installées.",
      "Les diapositives sont des images plutôt que du texte modifiable : c'est voulu, car une diapositive image ne casse jamais d'une machine à l'autre. Combinez avec notre outil PDF vers Word si vous avez aussi besoin du texte.",
    ],
    steps: [
      "Déposez le PDF à intégrer dans votre présentation.",
      "Cliquez sur Convertir en PowerPoint et laissez chaque page se rendre.",
      "Téléchargez le .pptx et ouvrez-le dans PowerPoint, Keynote ou Google Slides.",
    ],
    faqs: [
      {
        q: "Puis-je modifier le texte des diapositives ?",
        a: "Non — chaque diapositive contient une image fidèle de la page, pas des zones de texte. Cela garantit une apparence identique partout. Extrayez le texte à part avec PDF vers Word si vous avez besoin de le modifier.",
      },
      {
        q: "Quelle taille de diapositive est utilisée ?",
        a: "Le format large 16:9 (13,33 × 7,5 pouces), le réglage par défaut de PowerPoint. Les pages d'autres proportions sont centrées et ajustées sans déformation.",
      },
      {
        q: "Quelle est la taille du fichier .pptx ?",
        a: "À peu près la somme des images de pages — un PDF de 20 pages en haute résolution peut atteindre plusieurs dizaines de mégaoctets. Compressez d'abord le PDF source si vous voulez une présentation plus légère.",
      },
    ],
  },
  "pdf-to-text": {
    name: "PDF vers texte",
    tagline:
      "Extrayez le texte brut de n'importe quel PDF instantanément — prévisualisez-le, copiez-le ou enregistrez-le en .txt, page par page dans votre navigateur.",
    intro: [
      "Sortez les mots d'un PDF sans copier-coller page par page. L'extracteur parcourt le document, reconstruit l'ordre de lecture et vous rend un texte brut propre à prévisualiser, à copier d'un coup ou à télécharger en fichier .txt.",
      "Servez-vous en pour verser des citations dans vos notes, faire passer un texte dans un autre outil ou constituer une archive textuelle d'un document. Le nombre de mots s'affiche au fil de l'eau, et l'extraction est immédiate car tout se passe localement.",
    ],
    steps: [
      "Déposez un PDF avec du texte sélectionnable.",
      "Cliquez sur Extraire le texte et lisez l'aperçu.",
      "Copiez le résultat ou téléchargez-le en fichier .txt.",
    ],
    faqs: [
      {
        q: "Le résultat est vide — pourquoi ?",
        a: "Le PDF est probablement un scan : ses pages sont des photos de texte sans couche texte. Utilisez plutôt l'outil OCR ; il lit les lettres dans les images.",
      },
      {
        q: "Comment l'ordre de lecture est-il déterminé ?",
        a: "Les fragments de texte sont regroupés en lignes selon leurs coordonnées et les lignes sont ordonnées de haut en bas, de gauche à droite. Les mises en page multi-colonnes peuvent entremêler les colonnes ; découper d'abord le PDF par plages de colonnes peut aider.",
      },
      {
        q: "Y a-t-il une limite de pages ou de taille ?",
        a: "Aucune limite artificielle. Des centaines de pages fonctionnent ; la limite pratique est la mémoire du navigateur, généralement bien au-delà de documents de 100 Mo.",
      },
    ],
  },
  "pdf-to-word": {
    name: "PDF vers Word",
    tagline:
      "Transformez le texte d'un PDF en document Word (.docx) modifiable dans votre navigateur — une conversion centrée sur le texte, gratuite et sans aucun envoi.",
    intro: [
      "Extrayez les mots d'un PDF vers un .docx que vous pouvez modifier dans Word, Google Docs ou LibreOffice. Les titres sont détectés par taille de police, les paragraphes reconstruits d'après la position des lignes, et le résultat est un document propre et léger à retravailler.",
      "C'est une conversion honnête centrée sur le texte : elle ne reconstruit pas les mises en page complexes, les colonnes ni le placement des images. En contrepartie, confidentialité totale — l'analyse et la génération du .docx se font entièrement sur votre appareil.",
    ],
    steps: [
      "Déposez un PDF textuel (celui dont on peut sélectionner le texte).",
      "Cliquez sur Convertir en Word et patientez un instant.",
      "Téléchargez le .docx et modifiez-le où vous voulez.",
    ],
    faqs: [
      {
        q: "Pourquoi la mise en page diffère-t-elle du PDF d'origine ?",
        a: "C'est une conversion centrée sur le texte : elle reconstruit les paragraphes et les niveaux de titres plutôt que de reproduire la page au pixel près. Attendez-vous aux mêmes mots dans un flux plus propre et modifiable — pas à un clone visuel.",
      },
      {
        q: "Mon PDF est un scan et produit un document vide.",
        a: "Les PDF scannés contiennent des images de texte, pas du texte. Passez-le d'abord dans notre outil OCR, puis collez ou convertissez le texte reconnu vers Word.",
      },
      {
        q: "Que deviennent les tableaux et les images ?",
        a: "Les images ne sont pas reportées dans le .docx. Les tableaux arrivent en simples lignes de texte — utilisables, mais vous voudrez reconstruire de vrais tableaux dans Word pour tout ce qui est complexe.",
      },
    ],
  },
  "png-to-pdf": {
    name: "PNG vers PDF",
    tagline:
      "Convertissez captures d'écran et images PNG en un PDF sans les recompresser — import par lots, ordre personnalisé, traitement sur votre appareil.",
    intro: [
      "Captures d'écran, graphiques, diagrammes et exports de design sont généralement en PNG — et on les veut généralement en PDF. Déposez tout un lot, ordonnez-le avec les boutons fléchés et obtenez un PDF sans perte : les données PNG sont intégrées telles quelles, le texte des captures reste d'une netteté chirurgicale.",
      "Choisissez des pages ajustées à l'image pour un dimensionnement au pixel près, ou A4/Letter avec marge pour l'impression. Tout est construit avec pdf-lib sur votre appareil ; pas d'envoi, pas de loterie qualité.",
    ],
    steps: [
      "Déposez les fichiers PNG à assembler.",
      "Triez-les et choisissez des pages ajustées à l'image ou A4/Letter.",
      "Cliquez sur Créer le PDF et téléchargez-le.",
    ],
    faqs: [
      {
        q: "La qualité PNG est-elle préservée à l'identique ?",
        a: "Oui. Le flux PNG est intégré sans modification : bords nets, petits textes et zones à fond transparent rendent exactement comme les fichiers sources.",
      },
      {
        q: "Quel format de page choisir pour des captures d'écran ?",
        a: "« Ajuster à l'image » garde chaque capture à sa taille native en pixels — idéal pour la lecture à l'écran. Choisissez A4 ou Letter avec marge si le PDF doit être imprimé.",
      },
      {
        q: "Pourquoi mon PDF à base de PNG reste-t-il lourd ?",
        a: "Les données PNG sans perte sont naturellement volumineuses. Si vous voulez un fichier plus petit, passez le résultat par Compresser PDF, qui échange un peu de fidélité contre du poids.",
      },
    ],
  },
  "rearrange-pdf-pages": {
    name: "Réorganiser les pages PDF",
    tagline:
      "Réordonnez les pages d'un PDF visuellement avec des vignettes en direct — montez, descendez, inversez tout, et exportez un PDF neuf localement.",
    intro: [
      "Scanné un document dans le désordre ? Chaque page apparaît comme une vraie vignette : vous voyez exactement ce que vous déplacez. Brasssez avec les boutons fléchés, retournez tout le document avec Inverser et revenez à l'ordre d'origine à tout moment.",
      "La nouvelle séquence est écrite dans un PDF tout neuf sur votre appareil — les pages sont copiées à l'octet près : qualité, polices et texte sélectionnable survivent au remaniement.",
    ],
    steps: [
      "Déposez le PDF et attendez l'apparition des vignettes.",
      "Déplacez les pages avec ↑ / ↓, ou utilisez Inverser pour l'ordre opposé.",
      "Cliquez sur Appliquer l'ordre et télécharger pour obtenir le PDF réorganisé.",
    ],
    faqs: [
      {
        q: "Pourquoi les longs PDF montrent-ils des numéros au lieu de vignettes pour les dernières pages ?",
        a: "Les vignettes sont pré-rendues pour les 60 premières pages afin de garder le navigateur réactif. Au-delà, vous voyez les numéros de page et pouvez les réordonner exactement de la même façon.",
      },
      {
        q: "Puis-je déplacer une page de la position 40 à la position 2 ?",
        a: "Oui, mais cela prend des clics répétés avec les boutons fléchés. Pour les grands déplacements, inverser d'abord le document ou le diviser puis refusionner les morceaux est souvent plus rapide.",
      },
      {
        q: "La réorganisation affecte-t-elle la qualité ?",
        a: "Pas du tout. Les pages sont copiées sans changement dans le nouveau document — seule leur séquence diffère.",
      },
    ],
  },
  "rotate-pdf": {
    name: "Rotation PDF",
    tagline:
      "Faites pivoter les pages d'un PDF de 90, 180 ou 270 degrés et enregistrez le changement de façon permanente — redressez les scans de travers dans votre navigateur, sans envoi.",
    intro: [
      "Scanné de côté ou à l'envers ? Faites pivoter toutes les pages d'un coup, ou ciblez uniquement celles à corriger avec une liste comme « 1, 3-5 ». La rotation est écrite dans le PDF lui-même : il s'ouvre à l'endroit dans tous les lecteurs.",
      "Beaucoup de visualiseurs ne tournent les pages que temporairement — cet outil modifie l'attribut /Rotate des pages avec pdf-lib sur votre appareil, c'est pourquoi la correction survit à l'impression, au partage et au réenvoi.",
    ],
    steps: [
      "Déposez le PDF dont les pages doivent pivoter.",
      "Choisissez 90°, 180° ou 270° et limitez éventuellement la rotation à certaines pages.",
      "Cliquez sur Faire pivoter les pages et téléchargez le PDF corrigé.",
    ],
    faqs: [
      {
        q: "La rotation est-elle permanente ?",
        a: "Oui. L'attribut de rotation est mis à jour dans le fichier : tout lecteur, toute imprimante et tout aperçu affichent l'orientation corrigée — pas seulement cet onglet.",
      },
      {
        q: "Comment ne pivoter que certaines pages ?",
        a: "Remplissez le champ pages avec une liste du type « 2, 5-7 ». Laissez-le vide pour pivoter tout le document. Les plages suivent la même syntaxe que les autres outils de pages.",
      },
      {
        q: "La rotation réencode-t-elle ou compresse-t-elle mes pages ?",
        a: "Non. Seul l'indicateur de rotation change ; le contenu des pages est intact — qualité identique et texte toujours sélectionnable.",
      },
    ],
  },
  "sign-pdf": {
    name: "Signer un PDF",
    tagline:
      "Dessinez votre signature à la souris ou au doigt et posez-la sur n'importe quelle page d'un PDF — un tampon d'encre naturel créé et enregistré à 100 % hors ligne.",
    intro: [
      "Signez contrats, autorisations et formulaires sans les imprimer. Dessinez votre signature sur le pavé, positionnez-la sur une grille 3×3 (en bas à droite, c'est l'endroit habituel), réglez sa largeur et ajoutez si vous voulez la date du jour dessous. Le PNG transparent est intégré directement dans le PDF.",
      "C'est une signature visible, sous forme d'image — parfaite pour les documents du quotidien. Ce n'est pas une signature cryptographique par certificat, et sa valeur juridique dépend de votre juridiction et du processus exigé.",
    ],
    steps: [
      "Déposez le PDF, puis dessinez votre signature sur le pavé.",
      "Choisissez la position, la largeur et la page cible (1 par défaut).",
      "Cliquez sur Signer et télécharger pour enregistrer le PDF signé.",
    ],
    faqs: [
      {
        q: "Cette signature a-t-elle une valeur juridique ?",
        a: "Une image de signature dessinée est largement acceptée pour les accords du quotidien, mais sa portée légale varie selon le pays et le type de document. Pour les opérations qui en exigent une, utilisez un certificat numérique qualifié.",
      },
      {
        q: "La signature est-elle sécurisée ici ?",
        a: "Oui. Vous dessinez dans le navigateur, l'image est intégrée au PDF sur votre propre appareil et rien n'est transmis — pas même la signature.",
      },
      {
        q: "Puis-je signer toutes les pages du document ?",
        a: "Oui. Remplissez le champ pages avec une liste du type « 1-5 » ou laissez une seule page ; la signature est apposée au même endroit sur chaque page choisie.",
      },
    ],
  },
  "split-pdf": {
    name: "Diviser PDF",
    tagline:
      "Scindez un PDF en fichiers séparés par nombre de pages fixe ou plages personnalisées — chaque sortie est générée localement et rien n'est envoyé.",
    intro: [
      "Coupez un long PDF en fichiers plus petits de deux façons : tous les N pages (pratique pour un fichier par page ou des morceaux de la taille d'un chapitre), ou des plages personnalisées comme « 1-3, 4-6, 8 » avec un fichier par plage. Les sorties multiples sont regroupées dans un ZIP automatiquement.",
      "La découpe s'exécute sur votre appareil avec pdf-lib — les originaux restent intacts et les morceaux ne passent jamais par un serveur. Idéal pour les documents confidentiels que vous préférez ne pas envoyer nulle part.",
    ],
    steps: [
      "Déposez le PDF à découper.",
      "Choisissez « tous les N pages » ou des plages personnalisées et saisissez les valeurs.",
      "Cliquez sur Diviser le PDF, puis téléchargez chaque partie ou le ZIP complet.",
    ],
    faqs: [
      {
        q: "Comment découper un PDF en pages seules ?",
        a: "Choisissez « Tous les N pages », réglez sur 1 : chaque page devient son propre PDF. Avec plusieurs fichiers en sortie, vous recevez aussi un ZIP qui les contient tous.",
      },
      {
        q: "Quelle syntaxe de plages est prise en charge ?",
        a: "Valeurs séparées par des virgules et étendues au tiret, par exemple « 1-3, 5, 8-10 ». Les plages peuvent se chevaucher et sont traitées dans l'ordre de saisie.",
      },
      {
        q: "La découpe change-t-elle la qualité de mes pages ?",
        a: "Non. Les pages sont copiées à l'octet près dans de nouveaux documents : le texte reste sélectionnable et les images gardent leur qualité d'origine.",
      },
    ],
  },
  "watermark-pdf": {
    name: "Filigrane PDF",
    tagline:
      "Apposez un filigrane textuel sur chaque page d'un PDF — centré ou en mosaïque, avec contrôle total de la taille, de l'opacité, de la rotation et de la couleur, hors ligne.",
    intro: [
      "Marquez vos brouillons CONFIDENTIEL, BROUILLON ou À VALIDER avant qu'ils ne quittent vos mains. Choisissez un tampon central unique ou un motif en mosaïque sur toute la page, réglez l'opacité pour que le texte reste lisible dessous, et prenez une couleur adaptée au document.",
      "Le filigrane devient un vrai texte PDF dessiné sur chaque page — pas d'images, pas d'aller-retour serveur. Traitement avec pdf-lib sur votre appareil : même les contrats sensibles peuvent être marqués sans les envoyer.",
    ],
    steps: [
      "Déposez le PDF à marquer.",
      "Saisissez le texte du filigrane et ajustez disposition, taille, opacité et couleur.",
      "Cliquez sur Ajouter le filigrane et téléchargez le PDF tamponné.",
    ],
    faqs: [
      {
        q: "Quelle opacité fonctionne le mieux ?",
        a: "Entre 10 et 25 % pour la plupart des documents : visible d'un coup d'œil mais assez léger pour garder le texte courant lisible. Des brouillons destinés à être difficiles à lire peuvent monter à 40–50 %.",
      },
      {
        q: "Puis-je retirer un filigrane existant avec cet outil ?",
        a: "Non. Cet outil ne fait qu'ajouter des filigranes. En retirer un exige de modifier les flux de contenu des pages — une autre opération, souvent juridiquement discutable.",
      },
      {
        q: "Quels caractères le filigrane peut-il utiliser ?",
        a: "Les polices PDF standard couvrent le texte latin, la ponctuation et les symboles courants comme ©. Les autres écritures (chinois, japonais, arabe…) sont remplacées par des ? — gardez le filigrane en lettres latines.",
      },
    ],
  },
  "word-to-pdf": {
    name: "Word vers PDF",
    tagline:
      "Convertissez des documents Word .docx en PDF dans votre navigateur — une mise en page centrée sur le texte avec titres et gras, sans rien envoyer.",
    intro: [
      "Transformez un .docx en PDF propre et partageable : paragraphes, titres et passages en gras sont recomposés sur des pages A4 avec de vraies marges, pour un rendu soigné même sans Word installé. Lire, imprimer et envoyer devient sans friction.",
      "C'est une conversion honnête centrée sur le texte, pas un clone au pixel de la mise en page de Word : images, tableaux et ornements de page de l'original ne sont pas reportés. Vous obtenez le texte de votre document dans un PDF fiable et lisible partout — généré entièrement sur votre appareil.",
    ],
    steps: [
      "Déposez un fichier .docx (Word 2007 et plus récent).",
      "Cliquez sur Convertir en PDF.",
      "Téléchargez le PDF composé.",
    ],
    faqs: [
      {
        q: "Pourquoi mon PDF est-il différent de Word ?",
        a: "L'outil recompile le texte avec sa propre mise en page propre au lieu d'imiter le moteur de Word. Polices, espacements et images de l'original ne sont pas reproduits — les mots, les titres et l'emphase le sont.",
      },
      {
        q: "Les images et les tableaux sont-ils inclus ?",
        a: "Non, texte seulement — titres et gras compris. Pour les documents où le visuel compte, exportez le PDF depuis Word lui-même et réservez cet outil aux brouillons et notes centrés texte.",
      },
      {
        q: "Gère-t-il les vieux .doc et le texte non latin ?",
        a: "Seul le .docx est pris en charge. Le texte utilise les polices PDF standard : les langues latines se rendent correctement, les autres écritures (chinois, arabe…) sont remplacées par des ? pour l'instant.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* Image                                                               */
  /* ------------------------------------------------------------------ */
  "convert-image": {
    name: "Convertisseur d'images",
    tagline:
      "Convertissez des images entre PNG, JPG et WebP avec une qualité réglable — déposez tout un dossier et téléchargez chaque résultat en un clic.",
    intro: [
      "Un convertisseur pour les trois formats qui comptent : PNG pour les graphismes sans perte et la transparence, JPG pour la compatibilité photo universelle, WebP pour les fichiers les plus légers à qualité égale. Choisissez le format cible, ajustez le curseur de qualité quand le format le permet, et chaque fichier déposé est converti sur place.",
      "La conversion tourne sur votre appareil avec l'encodeur canvas du navigateur — il n'y a aucune étape d'envoi. Chaque ligne de résultat montre la taille avant et après : vous voyez immédiatement si le changement de format a vraiment aidé.",
    ],
    steps: [
      "Déposez n'importe quelles images — les formats mixtes sont acceptés.",
      "Choisissez PNG, JPG ou WebP en sortie ; réglez la qualité pour JPG ou WebP.",
      "Téléchargez les fichiers convertis un par un ou tous ensemble.",
    ],
    faqs: [
      {
        q: "Quel format de sortie choisir ?",
        a: "JPG pour des photos qui doivent s'ouvrir partout ; WebP pour le web quand le poids compte ; PNG pour les captures, logos et tout ce qui exige la transparence ou une sauvegarde au pixel près. Dans le doute pour des photos, WebP à environ 85 de qualité est un excellent choix par défaut.",
      },
      {
        q: "Convertir un JPG en PNG améliore-t-il sa qualité ?",
        a: "Non. Les artefacts de compression JPEG sont déjà cuits dans les pixels et la conversion ne peut pas les retirer — le PNG stockera simplement le même rendu sans perte, généralement plus lourd. Convertir change le conteneur et l'encodage, pas le détail capturé.",
      },
      {
        q: "Tous les navigateurs gèrent-ils la conversion WebP ?",
        a: "Chrome, Edge, Firefox et Safari 17+ savent enregistrer en WebP. Si votre navigateur ne sait pas encoder le WebP, l'outil vous le signale et bascule en JPG pour que vous obteniez toujours un fichier exploitable.",
      },
    ],
  },
  "crop-image": {
    name: "Recadrer une image",
    tagline:
      "Recadrez vos photos en 1:1, 4:3, 16:9 ou à main levée avec poignées déplaçables et décalages au pixel près — rapide, privé et prêt pour les lots.",
    intro: [
      "Faites glisser les poignées d'angle pour encadrer exactement ce que vous voulez garder, ou saisissez X, Y, largeur et hauteur directement pour un recadrage au pixel près. Les préréglages de ratio — 1:1 pour les avatars, 4:3 et 3:2 pour l'impression, 16:9 et 9:16 pour la vidéo et les stories — donnent la bonne forme instantanément.",
      "Une série de photos ? La même sélection est mise à l'échelle proportionnellement pour chaque fichier du lot : tout un dossier est recadré de façon cohérente. Recadrer ne fait que couper des pixels — jamais de remise à l'échelle — la zone gardée reste à sa qualité d'origine intégrale.",
    ],
    steps: [
      "Déposez une ou plusieurs images ; cliquez sur un nom de fichier pour prévisualiser et recadrer chacune.",
      "Choisissez un préréglage de ratio ou faites glisser les poignées ; affinez avec les champs X / Y / L / H.",
      "Appliquez le recadrage et téléchargez les résultats.",
    ],
    faqs: [
      {
        q: "Le recadrage réduit-il la qualité de l'image ?",
        a: "Non. Recadrer coupe simplement les pixels extérieurs — la zone gardée est copiée à sa résolution d'origine intégrale. La qualité ne change que si vous redimensionnez ou compressez ensuite le résultat.",
      },
      {
        q: "Comment fonctionne le recadrage par lots avec des tailles différentes ?",
        a: "La sélection est enregistrée par rapport à l'image prévisualisée. Appliquée aux autres fichiers, elle est mise à l'échelle proportionnellement aux dimensions de chacun : la composition du cadrage reste cohérente sur tout le lot.",
      },
      {
        q: "Quel ratio choisir pour une photo de profil ?",
        a: "1:1 (carré). La plupart des plateformes sociales recadrent l'avatar en cercle inscrit dans un carré : centrer le sujet dans une sélection 1:1 est le choix le plus sûr.",
      },
    ],
  },
  "exif-remover": {
    name: "Supprimeur d'EXIF",
    tagline:
      "Éliminez EXIF, GPS et autres métadonnées cachées de vos photos en les réencodant localement — partagez des images sans fuir la localisation ni l'appareil.",
    intro: [
      "Chaque photo de téléphone peut transporter des bagages cachés : coordonnées GPS du lieu de prise de vue, modèle d'appareil, horodatages, parfois même des numéros de série. Cet outil les supprime tous en réencodant l'image depuis ses pixels bruts — les métadonnées n'ont nulle part où se cacher sur un canvas fraîchement dessiné : EXIF, GPS, vignettes et commentaires disparaissent.",
      "Le résultat garde le format d'origine et une image visuellement identique (qualité 92 % pour JPG et WebP), et chaque ligne montre la taille avant et après. Le mode lot nettoie tout un dossier de photos en une passe, entièrement hors ligne sur votre appareil.",
    ],
    steps: [
      "Déposez les photos à partager — une seule ou tout un lot.",
      "Patientez un instant pendant que chaque image est réencodée localement sans ses métadonnées.",
      "Téléchargez les images nettoyées une par une ou toutes à la fois.",
    ],
    faqs: [
      {
        q: "Comment le réencodage supprime-t-il les métadonnées ?",
        a: "L'image est décodée en pixels bruts et redessinée sur un canvas vierge, puis réencodée. Les métadonnées vivent dans des sections spéciales du fichier, hors des pixels, et un encodage neuf ne les inclut tout simplement pas : EXIF, GPS, vignettes et historique d'édition sont éliminés complètement.",
      },
      {
        q: "Retirer l'EXIF change-t-il le rendu de la photo ?",
        a: "Aucun changement visible. Les pixels sont conservés à 92 % de qualité JPEG/WebP (PNG sans perte) : à l'œil, l'image est identique. Un effet de bord : la rotation stockée uniquement comme drapeau EXIF d'orientation est cuite dans les pixels, ce qui rend d'ailleurs le fichier plus cohérent d'une appli à l'autre.",
      },
      {
        q: "Puis-je retirer les métadonnées sans recompresser l'image ?",
        a: "Pas de façon sûre depuis un navigateur. Le nettoyage sans perte des métadonnées exige de réécrire le conteneur du fichier — les PNG peuvent être nettoyés sans perte avec des outils spécialisés, mais pour le JPEG l'approche fiable et simple est justement ce réencodage. Les entrées PNG restent ici identiques au bit près.",
      },
    ],
  },
  "favicon-generator": {
    name: "Générateur de favicon",
    tagline:
      "Transformez n'importe quel logo ou image en jeu de favicons complet — PNG de 16 à 512 px avec coins arrondis en option, plus le HTML à coller. Tout dans votre navigateur.",
    intro: [
      "Déposez une image à peu près carrée et obtenez les six tailles PNG dont les vrais projets ont besoin : favicons 16, 32 et 48 px, apple-touch-icon 180 px et icônes 192 / 512 px pour Android et les manifests PWA. Les images non carrées sont centrées sur un canvas carré rempli avec la couleur de fond choisie, et les coins peuvent rester carrés, s'arrondir ou devenir un cercle complet.",
      "Chaque taille est rendue à ses vraies dimensions en pixels et se télécharge individuellement ou en un seul .zip, avec un extrait <head> à copier-coller qui référence les mêmes noms de fichiers — les fichiers glissent donc directement dans le dossier public de votre projet.",
    ],
    steps: [
      "Déposez une image — un logo carré fonctionne le mieux.",
      "Choisissez une couleur de fond de marge et un style de coins (carrés, arrondis ou cercle).",
      "Générez le jeu, puis téléchargez les tailles voulues ou le .zip entier.",
      "Collez l'extrait HTML dans le <head> de votre page et déposez les PNG.",
    ],
    faqs: [
      {
        q: "Quelles tailles de favicon sont vraiment nécessaires ?",
        a: "16 et 32 px couvrent les onglets du navigateur, 48 px aide les raccourcis et favoris, 180 px est ce que demandent les écrans d'accueil iOS, et 192 / 512 px sont les tailles que cherchent les manifests Android et d'applications web. Générer les six une fois et vous n'y penserez plus jamais.",
      },
      {
        q: "Pourquoi mon logo paraît-il flou à 16 px ?",
        a: "Une icône d'onglet de 16 px ne compte que 256 pixels : les détails fins et les traits fins disparaissent tout simplement. Un jeu de favicons rend mieux quand il part d'un signe épais et contrasté — si votre logo est détaillé, dessinez plutôt une variante réduite simplifiée comme image source.",
      },
      {
        q: "Faut-il encore un fichier .ico ?",
        a: "Les navigateurs modernes utilisent volontiers des favicons PNG via des balises <link>, et l'extrait généré par cet outil leur suffit. Un .ico d'époque ne compte que pour les très vieux navigateurs, trop rares pour s'en soucier sur la plupart des sites.",
      },
    ],
  },
  "grayscale-image": {
    name: "Image en niveaux de gris",
    tagline:
      "Passez des images en noir et blanc par lots — bannissez la couleur des scans, impressions et séries photo, le tout en local.",
    intro: [
      "Transformez n'importe quelle série de photos en versions noir et blanc propres en une passe : déposez un lot, choisissez une sortie JPG ou PNG, et chaque image est désaturée sur votre appareil par le moteur couleur du navigateur.",
      "Pratique pour préparer des scans prêts à imprimer, unifier une série photo ou retirer la couleur de documents avant OCR.",
    ],
    steps: [
      "Déposez une image ou tout un lot.",
      "Choisissez une sortie JPG (plus léger) ou PNG (sans perte).",
      "Lancez la conversion et téléchargez chaque copie en niveaux de gris.",
    ],
    faqs: [
      {
        q: "Est-ce identique à une désaturation dans un éditeur photo ?",
        a: "C'est le filtre de niveaux de gris standard du navigateur — une conversion de luminance neutre. Pour du noir et blanc artistique avec courbes de contraste, passez par un éditeur ; pour une désaturation propre et uniforme, c'est ici.",
      },
      {
        q: "Pourquoi mon PNG est-il plus gros après conversion ?",
        a: "Les niveaux de gris ne changent pas la compression : une photo bruitée peut se compresser un peu différemment. Prenez JPG pour les photos et réservez PNG aux graphismes à aplats.",
      },
    ],
  },
  "heic-to-jpg": {
    name: "HEIC vers JPG",
    tagline:
      "Convertissez les photos HEIC de l'iPhone en JPG ou PNG pour qu'elles s'ouvrent partout — conversion par lots avec qualité réglable, tout sur votre appareil.",
    intro: [
      "Les iPhones enregistrent les photos en HEIC, un format économe que Windows, beaucoup de sites web et d'anciennes applis refusent encore d'ouvrir. Déposez vos fichiers .heic ici et obtenez des copies JPG lisibles partout (ou PNG sans perte) en quelques secondes — le décodeur tourne en local : vos photos ne touchent jamais un serveur.",
      "Le mode lot gère une pellicule entière d'un coup, et le curseur de qualité vous laisse arbitrer entre poids JPG et fidélité. Les grandes photos peuvent prendre quelques secondes chacune, car le décodage HEIC se fait directement dans votre navigateur.",
    ],
    steps: [
      "Déposez vos fichiers .heic ou .heif (passez-les d'abord par AirDrop ou téléchargez-les de votre iPhone).",
      "Choisissez une sortie JPG ou PNG et réglez la qualité JPEG.",
      "Lancez la conversion et téléchargez des images qui s'ouvrent partout.",
    ],
    faqs: [
      {
        q: "Qu'est-ce que le HEIC et pourquoi mes photos l'utilisent-elles ?",
        a: "HEIC (High Efficiency Image Container) est le format photo par défaut des iPhones depuis iOS 11. Il stocke les photos à environ la moitié du poids du JPEG, mais sa prise en charge hors de l'écosystème Apple reste inégale — d'où la conversion en JPG, toujours le choix fiable pour partager.",
      },
      {
        q: "Convertir du HEIC en JPG fait-il perdre de la qualité ?",
        a: "Un peu, mais à la qualité par défaut de 90 % la différence est invisible en pratique. Pour zéro perte supplémentaire, choisissez une sortie PNG — au prix de fichiers bien plus lourds.",
      },
      {
        q: "Mes photos iPhone sont-elles envoyées quelque part ?",
        a: "Non. La conversion se fait dans votre navigateur avec un décodeur HEIC local. Vos photos restent sur votre appareil du début à la fin — l'outil fonctionne même hors ligne une fois la page chargée.",
      },
    ],
  },
  "image-compressor": {
    name: "Compresseur d'images",
    tagline:
      "Compressez vos JPG, PNG et WebP avec un curseur de qualité en direct, le traitement par lots et les tailles avant/après instantanées — tout dans votre navigateur.",
    intro: [
      "Déposez une image ou tout un lot et regardez les poids fondre en direct. Un curseur de qualité de 10 à 100 % vous laisse arbitrer entre légèreté et netteté, et chaque ligne affiche la taille d'origine à côté du résultat compressé : vous savez exactement ce que vous avez gagné.",
      "La sortie peut être JPG (le plus léger pour les photos), WebP (souvent 20 à 30 % plus léger que JPG à qualité égale) ou PNG (sans perte). Tout tourne sur votre appareil avec l'encodeur d'images du navigateur — pas d'envoi, pas de file d'attente, pas de filigrane.",
    ],
    steps: [
      "Déposez vos images dans la zone (ou cliquez pour parcourir) — autant que vous voulez.",
      "Choisissez un format de sortie et faites glisser le curseur de qualité jusqu'à ce que la colonne des tailles vous convienne.",
      "Téléchargez chaque image compressée, ou récupérez-les toutes d'un coup.",
    ],
    faqs: [
      {
        q: "Pourquoi compresser deux fois un JPEG le dégrade-t-il ?",
        a: "Le JPEG est un format avec perte : chaque enregistrement abandonne du détail irrécupérable. Recompresser un JPEG déjà compressé empile de nouveaux artefacts sur les anciens. Pour un bon résultat, partez toujours du fichier original et évitez de réenregistrer les JPEG en boucle.",
      },
      {
        q: "Quel format donne les fichiers les plus petits ?",
        a: "Pour les photos, WebP est généralement 20 à 30 % plus léger que JPEG à qualité visuelle égale, et JPEG bat PNG. PNG ne gagne que sur les graphismes à aplats, les captures et les logos peu colorés. Essayez WebP à qualité 75–85 pour commencer.",
      },
      {
        q: "Mon image est-elle envoyée à un serveur ?",
        a: "Non. La compression est faite par l'encodeur canvas intégré de votre navigateur. Les fichiers ne quittent jamais votre appareil — vous pouvez même vous déconnecter d'Internet, ça continue de fonctionner.",
      },
    ],
  },
  "image-metadata-viewer": {
    name: "Visionneuse de métadonnées d'image",
    tagline:
      "Inspectez dimensions, type de fichier, poids et détails EXIF — appareil, objectif, exposition, date et GPS — sans rien envoyer.",
    intro: [
      "Déposez une photo et voyez tout ce qu'elle transporte : dimensions en pixels, mégapixels, type et poids du fichier d'un coup d'œil. Pour les photos JPEG, le lecteur EXIF intégré creuse plus loin — marque et modèle de l'appareil, objectif, temps d'exposition, ouverture, ISO, focale, date de prise de vue et orientation, analysés par un lecteur minimaliste qui tourne entièrement sur votre appareil.",
      "Si la photo contient des coordonnées GPS, elles s'affichent en notation décimale avec une recherche sur les cartes en un clic — pratique pour vérifier ce que votre téléphone embarque avant de partager. Les fichiers non JPEG affichent à la place la profondeur de bits et le type de couleur PNG, l'EXIF étant un standard de l'ère JPEG qu'ils ne transportent pas.",
    ],
    steps: [
      "Déposez une ou plusieurs images dans la zone.",
      "Lisez la fiche récapitulative : dimensions, type, poids et champs EXIF éventuels.",
      "Ouvrez la position GPS dans les cartes si elle existe — ou sautez au supprimeur d'EXIF pour la retirer.",
    ],
    faqs: [
      {
        q: "Qu'est-ce que les données EXIF ?",
        a: "EXIF (Exchangeable Image File Format) est le standard de métadonnées que les appareils photo insèrent dans les JPEG : modèle d'appareil, objectif, réglages d'exposition, horodatages, orientation et parfois coordonnées GPS. Invisible dans l'image, il peut révéler où et avec quoi une photo a été prise.",
      },
      {
        q: "Pourquoi mon fichier PNG ou WebP n'affiche-t-il pas d'EXIF ?",
        a: "L'EXIF est transporté principalement par le JPEG. Les PNG, GIF et la plupart des WebP ne l'embarquent pas : il n'y a réellement rien à montrer — la visionneuse indique alors leurs dimensions et, pour le PNG, la profondeur de bits et le type de couleur lus dans l'en-tête.",
      },
      {
        q: "Consulter les métadonnées modifie-t-il mon image ?",
        a: "Non. Les fichiers sont ouverts en lecture seule ; l'outil décode une copie en mémoire et ne réécrit jamais l'original. Votre image est affichée et analysée entièrement sur votre appareil.",
      },
    ],
  },
  "image-resizer": {
    name: "Redimensionneur d'images",
    tagline:
      "Redimensionnez vos images en pixels exacts ou en pourcentage avec verrou de proportions, et traitez des lots entiers d'un coup — rien ne quitte votre appareil.",
    intro: [
      "Saisissez la largeur et la hauteur exactes en pixels, ou mettez à l'échelle en pourcentage (25 %, 50 %, 200 %…). Le verrou de proportions garde les ratios corrects quand vous changez un côté, et le déverrouillage force n'importe quelle dimension personnalisée — utile pour les tailles d'avatar ou de bannière des plateformes.",
      "Le mode lot applique vos réglages à chaque fichier déposé : tout un dossier de photos peut être allégé pour le web en une passe. La réduction utilise un lissage de haute qualité et la sortie garde le format d'origine.",
    ],
    steps: [
      "Déposez une ou plusieurs images dans la zone.",
      "Saisissez une largeur/hauteur en pixels ou un pourcentage d'échelle ; basculez le verrou pour garder ou libérer les proportions.",
      "Téléchargez les images redimensionnées une par une ou toutes ensemble.",
    ],
    faqs: [
      {
        q: "Agrandir une image dégrade-t-elle sa qualité ?",
        a: "Oui. L'agrandissement doit inventer des pixels, ce qui produit de la mollesse ou du flou — aucun outil ne peut ajouter un détail jamais capturé. La réduction est sûre : elle abandonne des pixels avec une interpolation propre. Pour agrandir, restez modeste (jusqu'à ~150 %, ça passe généralement bien).",
      },
      {
        q: "À quoi sert le verrou de proportions ?",
        a: "Verrouillé, changer la largeur recalcule automatiquement la hauteur (et inversement) pour que l'image ne soit jamais étirée ni écrasée. Ne le désactivez que si vous voulez vraiment une autre forme — l'image sera déformée.",
      },
      {
        q: "Les PNG redimensionnés gardent-ils leur transparence ?",
        a: "Oui. Le redimensionnement conserve le format d'origine : transparence PNG et canal alpha WebP survivent intacts. Seule une conversion en JPG aplatirait la transparence sur fond blanc.",
      },
    ],
  },
  "jpg-to-png": {
    name: "JPG vers PNG",
    tagline:
      "Convertissez vos photos JPG en PNG instantanément avec une sortie sans perte et le mode lot — gratuit, privé, sans envoi, directement dans votre navigateur.",
    intro: [
      "Déposez vos fichiers .jpg et obtenez en un clic des copies .png identiques au pixel près. Le PNG stocke l'image sans perte supplémentaire : c'est le format de choix pour rééditer, archiver, ou pour les plateformes et outils qui refusent les fichiers JPEG.",
      "Le mode lot convertit toute une pile de photos en une passe et affiche la taille obtenue pour chaque fichier. Notez que le PNG produit généralement des fichiers plus lourds que le JPG — c'est le prix du stockage sans perte, pas un défaut de la conversion.",
    ],
    steps: [
      "Déposez vos images JPG (ou cliquez pour parcourir) — les fichiers multiples sont bienvenus.",
      "Patientez un instant pendant que chaque fichier est converti localement.",
      "Téléchargez les fichiers PNG un par un ou tous à la fois.",
    ],
    faqs: [
      {
        q: "Le fichier PNG sera-t-il plus beau que le JPG ?",
        a: "Non — il sera identique. La conversion ne peut pas annuler une compression déjà subie ; le PNG préserve simplement l'apparence actuelle sans y ajouter d'artefacts si vous l'éditez et le réenregistrez plus tard. Utilisez-le pour vos flux de travail, pas pour un gain de qualité.",
      },
      {
        q: "Pourquoi mon PNG est-il plus lourd que le JPG d'origine ?",
        a: "Le JPG applique une compression avec perte agressive pensée pour les photos, quand le PNG stocke chaque pixel exactement. La même image occupe donc plus de place en PNG. Si le poids compte plus que l'édition sans perte, JPG ou WebP est la meilleure cible.",
      },
      {
        q: "Convertir un JPG en PNG ajoute-t-il de la transparence ?",
        a: "Non. Le JPEG ne stocke jamais de transparence : rien ne peut être récupéré — votre PNG converti est totalement opaque. Pour détouer un fond, il faut un outil dédié à la suppression d'arrière-plan.",
      },
    ],
  },
  "merge-images": {
    name: "Assembler des images",
    tagline:
      "Assemblez 2 à 9 images en une seule — côte à côte, empilées ou en grille, avec espacement et couleur de fond réglables.",
    intro: [
      "Composez des avant/après, des bandes comparatives et des planches de sprites : déposez 2 à 9 images, choisissez une disposition, réglez l'espacement et la couleur de fond, et l'image assemblée est composée sur votre appareil à pleine résolution.",
      "Les images sont mises à l'échelle vers une hauteur commune (côte à côte), une largeur commune (empilées) ou une cellule (grille) : rien n'est recadré ni étiré.",
    ],
    steps: [
      "Déposez 2 à 9 images dans l'ordre où vous voulez les assembler.",
      "Choisissez une disposition et réglez l'espacement et la couleur de fond.",
      "Cliquez sur Assembler les images et téléchargez le résultat.",
    ],
    faqs: [
      {
        q: "Quelle est la résolution de sortie ?",
        a: "Pleine résolution : le canvas est dimensionné à partir des dimensions (mises à l'échelle) des entrées — assembler 3 photos de 2000 px donne environ 6000 px de large.",
      },
      {
        q: "L'ordre a-t-il de l'importance ?",
        a: "Oui — les images sont placées dans l'ordre de la liste, de gauche à droite et de haut en bas. Retirez et rajoutez pour changer l'ordre.",
      },
    ],
  },
  "ocr-image": {
    name: "Image vers texte (OCR)",
    tagline:
      "Extrayez le texte de photos, scans et captures d'écran en 7 langues — relisez, corrigez, copiez ou téléchargez en .txt. Reconnaissance 100 % dans votre navigateur.",
    intro: [
      "Visez n'importe quelle image contenant du texte — photo d'une page, scan, capture d'écran — et récupérez les caractères en texte modifiable. La reconnaissance s'appuie sur Tesseract, chargé à la demande dans votre onglet ; l'image elle-même n'est envoyée nulle part.",
      "Le résultat atterrit dans une zone éditable : corrigez la lecture fautive d'occasion avant de copier ou de télécharger en fichier .txt. Les prises de vue nettes, bien éclairées et de face donnent les meilleurs résultats.",
    ],
    steps: [
      "Déposez une image (PNG, JPG ou WebP) contenant du texte.",
      "Choisissez la langue du texte — le modèle correspondant se charge au premier usage.",
      "Lancez la reconnaissance et corrigez le texte extrait si besoin.",
      "Copiez-le ou téléchargez-le en fichier .txt.",
    ],
    faqs: [
      {
        q: "Mon image est-elle envoyée à un serveur ?",
        a: "Non. L'image est lue et reconnue dans votre propre navigateur. Sachez que le moteur OCR et le modèle de langue sont téléchargés depuis un CDN public au premier usage (environ 10 à 20 Mo par langue) — ce téléchargement va du CDN vers vous, mais l'image ne quitte jamais votre appareil.",
      },
      {
        q: "Quelles langues sont prises en charge ?",
        a: "Anglais, chinois simplifié, japonais, espagnol, portugais, allemand et français. Chaque langue charge son propre modèle entraîné la première fois que vous la sélectionnez ; ensuite le navigateur la met en cache et la reconnaissance démarre plus vite.",
      },
      {
        q: "Pourquoi une partie du texte est-elle erronée ?",
        a: "La précision de l'OCR dépend beaucoup de la source : photos floues, pages courbes, petites polices et fonds chargés provoquent des erreurs. Prenez l'image la plus nette possible, recadrez sur la seule zone de texte et prévoyez une relecture — surtout pour les chiffres et les caractères qui se ressemblent.",
      },
    ],
  },
  "png-to-jpg": {
    name: "PNG vers JPG",
    tagline:
      "Convertissez vos PNG en JPG et allégez radicalement les fichiers — les zones transparentes reçoivent un fond blanc propre et la qualité reste réglable.",
    intro: [
      "Transformez vos .png lourds en copies .jpg compactes qui se téléchargent plus vite et s'ouvrent partout. Un curseur de qualité (92 % par défaut) garde le résultat visuellement indiscernable tout en réduisant le poids de 60 à 90 % pour des captures et photos typiques.",
      "La transparence PNG ne peut pas survivre en JPG : les zones transparentes sont aplaties sur du blanc pur — le traitement standard pour formulaires, avatars et places de marché qui n'acceptent que le JPEG. Le mode lot gère tout un dossier en une fois.",
    ],
    steps: [
      "Déposez vos images PNG — une ou plusieurs.",
      "Ajustez la qualité JPG si vous voulez des fichiers plus légers ou une fidélité maximale.",
      "Téléchargez les fichiers JPG un par un ou tous à la fois.",
    ],
    faqs: [
      {
        q: "Que deviennent les zones transparentes lors d'une conversion PNG vers JPG ?",
        a: "Le JPG n'a pas de canal alpha : les pixels transparents sont remplis de blanc uni avant l'enregistrement. Si vous voulez une autre couleur de fond, ou une vraie transparence, restez en PNG (ou passez au WebP).",
      },
      {
        q: "De combien le JPG sera-t-il plus léger ?",
        a: "Typiquement 60 à 90 % plus léger pour des captures et photos. Les graphismes à aplats aux bords nets se compressent moins spectaculairement et peuvent montrer un léger flou à basse qualité — gardez le curseur au-dessus de 85 % pour le texte et les images d'interface.",
      },
      {
        q: "La conversion peut-elle rendre l'image plus nette ou corriger des artefacts ?",
        a: "Non. Convertir ne change que l'encodage ; cela ne peut pas ajouter de détail. Si le PNG paraît déjà mou, le JPG paraîtra tout aussi mou (avec peut-être un léger bruit de compression à très basse qualité).",
      },
    ],
  },
  "rotate-image": {
    name: "Faire pivoter une image",
    tagline:
      "Faites pivoter vos images de 90°, 180° ou 270° et retournez-les horizontalement ou verticalement — par lots, instantané et entièrement dans votre navigateur.",
    intro: [
      "Remettez des photos à l'endroit, redressez des scans arrivés de côté ou renversez une image pour une mise en page en miroir. Chaque bouton s'applique d'un coup à tous les fichiers chargés, et un petit afficheur montre en permanence la rotation et le miroir en cours : impossible de se perdre.",
      "Rotations et retournements sont cuits dans les pixels eux-mêmes : le fichier enregistré s'affiche identiquement partout — aucun lecteur ne « corrigera » le résultat en arrière. La sortie garde le format d'origine de chaque image.",
    ],
    steps: [
      "Déposez une ou plusieurs images dans la zone.",
      "Cliquez sur les boutons de rotation et de retournement jusqu'à ce que l'aperçu affiche l'état voulu.",
      "Téléchargez les images corrigées une par une ou toutes à la fois.",
    ],
    faqs: [
      {
        q: "La rotation d'un JPEG est-elle sans perte ?",
        a: "Dans cet outil, la rotation est appliquée en réencodant les pixels : le fichier est régénéré (à 92 % de qualité JPEG par défaut pour le JPG). En pratique la différence est invisible, mais ce n'est pas identique au bit près — les outils qui annoncent une « rotation sans perte » ne fonctionnent que sur des dimensions multiples de la grille de blocs JPEG.",
      },
      {
        q: "Pourquoi une photo paraît-elle tournée dans une appli mais droite dans une autre ?",
        a: "Certaines images ne stockent qu'un drapeau d'orientation dans leurs données EXIF au lieu de pixels réellement tournés, et toutes les applis n'appliquent pas ce drapeau. Cet outil écrit la rotation directement dans les pixels et abandonne le drapeau : le résultat s'affiche pareil partout.",
      },
      {
        q: "Puis-je retourner une photo horizontalement comme un miroir ?",
        a: "Oui — utilisez le bouton « Retourner horizontalement » pour un miroir gauche-droite, ou « Retourner verticalement » pour haut-bas. Les deux se combinent avec n'importe quelle rotation.",
      },
    ],
  },
  "round-corners-image": {
    name: "Arrondir les coins d'une image",
    tagline:
      "Arrondissez les coins d'une image ou de tout un lot — coins PNG transparents ou couleur unie, aperçu en direct, sortie PNG ou JPG. Dans votre navigateur.",
    intro: [
      "Les coins arrondis adoucissent captures d'écran, avatars et photos produits sans ouvrir un éditeur. Déposez une image ou tout un lot, faites glisser le curseur de rayon et regardez l'aperçu se mettre à jour en direct — le rayon va jusqu'au cercle complet, plafonné à la moitié du petit côté.",
      "Choisissez si les coins coupés restent transparents (PNG) ou reçoivent une couleur unie — ce que la sortie JPG impose, puisqu'elle n'a pas de canal alpha. Chaque fichier est traité sur votre appareil et se télécharge individuellement.",
    ],
    steps: [
      "Déposez une image ou tout un lot.",
      "Faites glisser le curseur de rayon — l'aperçu montre la première image en direct.",
      "Choisissez des coins transparents ou colorés et le format de sortie.",
      "Arrondissez tout et téléchargez chaque résultat.",
    ],
    faqs: [
      {
        q: "Les coins peuvent-ils être transparents plutôt que blancs ?",
        a: "Oui — prenez une sortie PNG avec l'option Transparent : les coins restent transparents. Le JPG n'a pas de canal alpha et remplit toujours les coins avec la couleur unie choisie.",
      },
      {
        q: "Le même rayon paraît différent d'une image à l'autre — pourquoi ?",
        a: "Le curseur fixe le rayon en pixels et chaque fichier est arrondi avec exactement ce rayon, plafonné à la moitié de son propre petit côté. Pour un rendu uniforme entre images de tailles différentes, harmonisez d'abord leurs dimensions (par exemple avec le redimensionneur d'images).",
      },
      {
        q: "L'arrondi réduit-il la qualité de l'image ?",
        a: "Seuls les coins sont touchés — les pixels intérieurs restent intacts. La sortie PNG est sans perte, tandis que le JPG est réencodé en haute qualité, ce qui peut faire bouger un peu le poids dans un sens ou l'autre.",
      },
    ],
  },
  "screenshot-tool": {
    name: "Capture d'écran",
    tagline:
      "Capturez une seule frame de votre écran, recadrez-la précisément et enregistrez-la en PNG — un instantané autorisé, rien d'enregistré ni d'envoyé.",
    intro: [
      "Cliquez sur capturer, choisissez un écran, une fenêtre ou un onglet dans la boîte de dialogue de partage de votre navigateur, et l'outil saisit exactement une image fixe. Le partage s'arrête aussitôt — pas d'enregistrement, pas de session, rien ne quitte votre appareil. Vous obtenez un PNG normal, prêt à enregistrer.",
      "Besoin d'une partie seulement ? Activez le mode recadrage et tracez une sélection précise avant d'enregistrer, avec le même widget de recadrage au pixel près que notre outil dédié. Parfait pour les rapports de bug, la documentation rapide et les justificatifs.",
    ],
    steps: [
      "Cliquez sur « Choisir l'écran et capturer » et accordez la permission dans la boîte de dialogue du navigateur.",
      "Choisissez l'écran, la fenêtre ou l'onglet voulu ; une frame est capturée sur-le-champ et le partage s'arrête.",
      "Recadrez éventuellement l'image, puis enregistrez le PNG dans vos téléchargements.",
    ],
    faqs: [
      {
        q: "Mon écran est-il en train d'être enregistré ?",
        a: "Non. L'outil demande une capture d'une seule frame via la permission standard de partage d'écran de votre navigateur. Le flux est coupé dès que la frame est sauvegardée en mémoire : rien ne continue de tourner et rien n'est envoyé nulle part.",
      },
      {
        q: "Pourquoi mon navigateur demande-t-il une permission ?",
        a: "La capture d'écran est une capacité puissante : les navigateurs exigent toujours un choix explicite via leur boîte de dialogue native. Vous choisissez exactement quel écran, fenêtre ou onglet partager — l'outil ne voit jamais rien d'autre que votre sélection.",
      },
      {
        q: "Fonctionne-t-il sur téléphone ou tablette ?",
        a: "Non. Les navigateurs iOS et Android n'offrent pas la capture d'écran aux pages web : l'outil vous explique qu'il est indisponible là. Sur ordinateur, Chrome, Edge, Firefox et Safari le prennent tous en charge.",
      },
    ],
  },
  "svg-converter": {
    name: "Convertisseur SVG vers PNG",
    tagline:
      "Transformez icônes et graphiques SVG en PNG nets à l'échelle 1× à 4× ou personnalisée — transparence conservée, parfait pour les ressources d'applications.",
    intro: [
      "Le SVG est parfait en design, mais bien des endroits — app stores, éditeurs, messageries, CMS anciens — exigent un PNG raster. Cet outil rend votre fichier vectoriel exactement à la taille voulue : 1× pour les aperçus, 2× pour les écrans retina, 3×–4× ou un facteur personnalisé pour des exports qualité impression.",
      "Le PNG garde le fond transparent de votre SVG, et le vecteur est rendu à nouveau à la résolution cible plutôt qu'étiré : les bords restent d'une netteté chirurgicale. Déposez toute une série d'icônes d'un coup — chaque fichier est converti en une passe.",
    ],
    steps: [
      "Déposez un ou plusieurs fichiers .svg.",
      "Choisissez une échelle : 1×–4× ou saisissez un facteur personnalisé.",
      "Téléchargez les fichiers PNG un par un ou tous à la fois.",
    ],
    faqs: [
      {
        q: "À quelle échelle exporter ?",
        a: "2× pour les icônes affichées sur écrans retina/haut DPI, 1× quand la taille en pixels est connue et définitive, et 3×–4× comme ressource maîtresse à réduire ensuite. Pour un favicon, exportez l'équivalent 512 px puis réduisez.",
      },
      {
        q: "Convertir en PNG fait-il perdre l'extensibilité du SVG ?",
        a: "Oui — un PNG est à résolution fixe. C'est pourquoi cet outil rend directement à la taille cible au lieu de rasteriser petit puis d'étirer. Gardez votre .svg source pour les modifications futures et exportez de nouveaux PNG à chaque taille nécessaire.",
      },
      {
        q: "Les fonds transparents survivent-ils à la conversion ?",
        a: "Oui. La sortie est un PNG avec alpha complet : votre icône garde sa transparence exactement comme dans le SVG. Seules les polices et images externes référencées par le SVG peuvent devoir être embarquées dans le fichier pour se rendre.",
      },
    ],
  },
  "watermark-image": {
    name: "Filigrane d'image",
    tagline:
      "Ajoutez un filigrane textuel à vos images — position, opacité, taille ou mosaïque, traité entièrement dans votre navigateur.",
    intro: [
      "Protégez brouillons, épreuves et photos avec un filigrane textuel que vous contrôlez totalement : placez-le dans n'importe quel coin ou au centre, tapissez toute l'image en mosaïque, réglez taille et opacité — les copies filigranées sont générées sur votre appareil.",
      "Rien n'est envoyé : vous pouvez filigraner un travail inédit, des épreuves clients et des scans confidentiels sans les expédier nulle part.",
    ],
    steps: [
      "Déposez une image ou tout un lot.",
      "Saisissez le texte du filigrane et réglez opacité, taille, position — ou activez la mosaïque.",
      "Appliquez et téléchargez chaque copie filigranée.",
    ],
    faqs: [
      {
        q: "Quelqu'un peut-il retirer mon filigrane ?",
        a: "Un filigrane visible est un dissuasif, pas du chiffrement — tout ce qui est visible peut être effacé avec de l'effort. Pour une vraie protection, partagez plutôt des épreuves basse résolution.",
      },
      {
        q: "Fonctionne-t-il avec les PNG transparents ?",
        a: "La sortie est en JPG : la transparence est aplatie sur du blanc. Filigranez le PNG d'origine avec une couleur de fond de votre choix si vous avez besoin de l'alpha.",
      },
    ],
  },
  "webp-converter": {
    name: "Convertisseur WebP",
    tagline:
      "Convertissez des images vers WebP ou ramenez des fichiers WebP en JPG et PNG — choisissez le format cible, réglez la qualité, traitez en vrac.",
    intro: [
      "Passer au WebP allège les fichiers de 25 à 35 % par rapport au JPG à qualité visuelle égale — idéal pour les sites et applications. Repasser du WebP au JPG ou PNG rend les images ouvrables dans les logiciels anciens qui n'ont jamais appris le format de Google.",
      "Déposez n'importe quel mélange de WebP, JPG, PNG et plus, choisissez le format de sortie, et chaque fichier se convertit d'un coup avec la taille avant/après affichée par ligne. Tout est encodé par votre navigateur, sur votre propre appareil — aucun envoi, jamais.",
    ],
    steps: [
      "Déposez des fichiers WebP pour quitter le WebP, ou n'importe quelles images pour passer au WebP.",
      "Choisissez le format de sortie (WebP, JPG ou PNG) et réglez la qualité des formats avec perte.",
      "Téléchargez les fichiers convertis un par un ou tous à la fois.",
    ],
    faqs: [
      {
        q: "Pourquoi préférer WebP à JPG ?",
        a: "WebP compresse 25 à 35 % plus léger que JPG à qualité équivalente et gère transparence comme animation. Tous les navigateurs actuels le rendent : c'est le choix standard pour les images du web. Ne gardez JPG que si vous devez servir de très vieux logiciels.",
      },
      {
        q: "Un fichier WebP s'ouvre-t-il dans n'importe quelle appli ?",
        a: "Tous les navigateurs modernes et les versions récentes de Windows, macOS, Android et iOS gèrent le WebP. Certains éditeurs photo anciens et certains formulaires web le refusent encore — c'est exactement quand on le reconvertit ici en JPG ou PNG.",
      },
      {
        q: "La conversion en WebP est-elle sans perte ?",
        a: "C'est vous qui choisissez : WebP gère l'encodage sans perte comme avec perte. À la qualité par défaut de 90, le résultat est visuellement indiscernable mais bien plus léger ; baissez le curseur pour un gain maximal, ou prenez une sortie PNG pour une absence de perte stricte.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* Texte                                                               */
  /* ------------------------------------------------------------------ */
  "case-converter": {
    name: "Convertisseur de casse",
    tagline:
      "Convertissez votre texte en MAJUSCULES, minuscules, casse Titre, camelCase, snake_case et 6 autres styles — en direct.",
    intro: [
      "Onze styles de casse sur une seule page : casse de phrase pour la rédaction, casse Titre pour les titres, camelCase / PascalCase / snake_case / kebab-case / CONSTANT_CASE pour le code, plus alterné et inversé pour le plaisir.",
      "Tout se recalcule pendant la saisie — pas besoin de marteler des boutons, et la conversion ne quitte jamais votre navigateur.",
    ],
    steps: [
      "Collez ou saisissez votre texte dans la zone d'entrée.",
      "Cliquez sur un bouton de style — la sortie se met à jour instantanément.",
      "Copiez le résultat ou passez à un autre style pour comparer.",
    ],
    faqs: [
      {
        q: "Quelle est la différence entre camelCase et PascalCase ?",
        a: "camelCase commence par une minuscule (monNomDeVariable), PascalCase par une majuscule (MonNomDeVariable). Les deux suppriment espaces et underscores avant de coller les mots.",
      },
      {
        q: "La casse Titre garde-t-elle les petits mots en minuscules ?",
        a: "Oui. Articles et prépositions courtes (a, la, de, en…) restent en minuscules sauf en premier ou dernier mot, selon le style éditorial habituel.",
      },
      {
        q: "Mon texte est-il envoyé quelque part ?",
        a: "Non. La conversion se fait localement dans votre navigateur avec JavaScript — rien n'est envoyé à aucun serveur.",
      },
    ],
  },
  "character-counter": {
    name: "Compteur de caractères",
    tagline:
      "Comptez les caractères avec et sans espaces, plus mots, phrases, paragraphes et lignes pendant la saisie — idéal pour les tweets, titres et méta descriptions.",
    intro: [
      "Un compteur de caractères taillé pour les limites strictes : posts sociaux, titres méta, méta descriptions, textes publicitaires, SMS et champs d'application qui comptent chaque caractère. Le panneau affiche les caractères avec et sans espaces : vous savez toujours quel chiffre la plateforme regarde.",
      "Les comptages se mettent à jour pendant la saisie et rien ne quitte votre navigateur — collez des brouillons inédits, des textes clients ou du contenu confidentiel sans craindre un enregistrement ou un envoi.",
    ],
    steps: [
      "Collez ou saisissez votre texte dans la zone.",
      "Lisez d'abord le panneau des caractères mis en évidence, puis les autres comptages selon vos besoins.",
      "Raccourcissez votre texte jusqu'à passer sous la limite — les chiffres se mettent à jour en direct.",
    ],
    faqs: [
      {
        q: "Les espaces et retours à la ligne comptent-ils comme caractères ?",
        a: "Oui — le chiffre principal compte chaque caractère, espaces et retours compris, exactement comme la plupart des plateformes. Le chiffre « Sans espaces » retire les blancs pour comparer.",
      },
      {
        q: "Comment les emoji sont-ils comptés ?",
        a: "Les emoji sont comptés comme points de code Unicode : la plupart des emoji modernes valent un caractère. Les séquences complexes formées de plusieurs points de code (teintes de peau, emoji de famille) peuvent compter plus d'un.",
      },
      {
        q: "Quelles plateformes limitent en caractères ?",
        a: "Les posts X/Twitter, les titres méta (environ 60) et descriptions (environ 160), les segments SMS (160) et la plupart des régies publicitaires — vérifiez toujours le champ précis pour lequel vous écrivez.",
      },
    ],
  },
  "emoji-picker": {
    name: "Sélecteur d'emoji",
    tagline:
      "Parcourez plus de 670 emoji courants en 8 groupes organisés, cherchez par nom anglais, copiez d'un clic et retrouvez vos 16 derniers choix — tout dans votre navigateur.",
    intro: [
      "Un tableau d'emoji organisé à la main avec 677 entrées groupées comme vous pensez : Smileys, Personnes, Animaux, Nourriture, Activités, Voyage, Objets et Symboles. La recherche s'appuie sur le nom officiel anglais — tapez « star » et trouvez ⭐, 🌟 et ✨ d'un coup.",
      "Un clic copie le caractère dans le presse-papiers, avec une confirmation visible pour ne jamais douter que ça a marché. Vos 16 derniers choix sont conservés sur cet appareil via localStorage : le favori de demain reste à un geste. Aucune image n'est chargée — la grille rend les glyphes emoji natifs instantanément.",
    ],
    steps: [
      "Tapez un nom dans la zone de recherche ou choisissez un onglet de groupe.",
      "Cliquez sur un emoji — il est copié dans le presse-papiers immédiatement.",
      "Retrouvez vos derniers choix en première ligne, conservés sur cet appareil.",
    ],
    faqs: [
      {
        q: "D'où viennent les emoji ?",
        a: "Ce sont des glyphes natifs rendus par la police emoji de votre système d'exploitation. Rien n'est téléchargé : la page reste rapide et fonctionne hors ligne une fois chargée.",
      },
      {
        q: "Pourquoi certains emoji diffèrent-ils de ce que je vois sur mon téléphone ?",
        a: "Chaque plateforme dessine les emoji à sa façon. La grille montre comment l'appareil actuel les rend ; le caractère copié s'affichera de la même manière dans l'application qui le reçoit.",
      },
      {
        q: "Comment fonctionne « Récemment utilisés » ?",
        a: "Chaque emoji copié est mémorisé dans le localStorage de votre navigateur (jusqu'à 16). Effacer les données du navigateur remet la liste à zéro.",
      },
    ],
  },
  "fancy-text-generator": {
    name: "Générateur de texte stylé",
    tagline:
      "Transformez un texte simple en 12 styles Unicode — gras, italique, script, double barre, cerclé, pleine chasse et plus — et copiez n'importe lequel en un clic.",
    intro: [
      "Tapez une fois et obtenez douze variantes Unicode d'un coup : gras mathématique, italique, gras italique, script, gras script, double barre, monospace, cerclé, encadré et alphabets pleine chasse, plus barré et souligné par caractères combinants.",
      "Comme ce sont de vrais caractères Unicode — pas des polices — les résultats se collent intacts dans les bios Instagram, légendes TikTok, pseudos Discord, brouillons de tweets et applications de chat. Les caractères hors alphabet latin — chinois, japonais, emoji — passent intacts pour que rien ne se transforme en carrés manquants.",
    ],
    steps: [
      "Tapez ou collez votre texte — un exemple est déjà chargé pour jouer.",
      "Faites défiler la liste en direct : chaque style prévisualise votre texte instantanément.",
      "Cliquez sur Copier sur le style qui vous plaît et collez-le partout où du texte est accepté.",
    ],
    faqs: [
      {
        q: "Pourquoi le texte paraît-il identique sur certains sites ?",
        a: "Le texte stylé utilise des caractères Unicode, et la police d'un site peut manquer de glyphes pour certains (surtout script et double barre). Si un style s'affiche bizarrement quelque part, essayez gras, cerclé ou pleine chasse — ils ont la couverture la plus large.",
      },
      {
        q: "Puis-je l'utiliser pour ma bio Instagram ou mon pseudo TikTok ?",
        a: "Oui. La sortie est du texte Unicode simple : ça fonctionne dans les bios sociales, noms affichés, commentaires et partout où des caractères ordinaires sont acceptés.",
      },
      {
        q: "Que deviennent les caractères comme les emoji ou le chinois ?",
        a: "Ils restent exactement tels quels. Le générateur ne mappe que les lettres et chiffres latins : emoji, CJK et lettres accentuées passent inchangés au lieu de devenir des cases vides.",
      },
    ],
  },
  "find-and-replace": {
    name: "Rechercher et remplacer",
    tagline:
      "Cherchez et remplacez sur des milliers de mots avec les modes casse, mot entier et regex — voyez le nombre de correspondances avant de valider.",
    intro: [
      "Une zone de recherche, une zone de remplacement, trois modes de correspondance. Texte simple pour les échanges rapides, mode mot entier pour que « chat » n'atterrisse jamais dans « chaton », et expressions régulières pour les motifs — dates, balises, blancs répétés ou tout ce que vous savez décrire.",
      "Les correspondances sont comptées pendant la saisie et le remplacement se prévisualise en direct : vous voyez exactement ce qui va changer avant de copier quoi que ce soit.",
    ],
    steps: [
      "Collez le texte, puis indiquez quoi chercher et par quoi remplacer.",
      "Choisissez un mode : sensible à la casse, mots entiers seulement, ou expression régulière.",
      "Vérifiez le nombre de correspondances, puis copiez le résultat remplacé.",
    ],
    faqs: [
      {
        q: "Puis-je utiliser des groupes de capture en mode regex ?",
        a: "Oui. Entourez des parties du motif de parenthèses et référencez-les dans le remplacement par $1, $2, etc. — par exemple cherchez '(\\d{4})-(\\d{2})' et remplacez par '$2/$1'.",
      },
      {
        q: "À quoi sert l'option « mots entiers seulement » ?",
        a: "Le terme n'est retenu que s'il existe comme mot autonome : chercher « roi » ne correspondra plus à « miroir » ni à « roitelet ».",
      },
      {
        q: "Les $ de mon remplacement sont-ils traités littéralement ?",
        a: "En mode simple oui — « $100 » reste « $100 ». En mode regex, les motifs en $ sont spéciaux ($1 désigne le groupe 1) ; échappez en \\$ si vous en voulez un littéral.",
      },
    ],
  },
  "lorem-ipsum-generator": {
    name: "Générateur de Lorem Ipsum",
    tagline:
      "Générez 1 à 50 paragraphes de remplissage lorem ipsum classique pour maquettes, wireframes et tests de CMS — un clic pour régénérer et copier.",
    intro: [
      "Le lorem ipsum est le texte d'attente de l'imprimerie depuis les années 1500 : un latin brouillé tiré du « De Finibus » de Cicéron qui ressemble à du vrai texte sans en porter le sens — personne ne confond donc un brouillon avec un texte fini. Choisissez un nombre de paragraphes, appuyez sur le bouton et collez-le dans votre maquette.",
      "Le texte est généré localement avec un générateur pseudo-aléatoire à graine : chaque lot est différent — et rien de ce que vous faites sur ce site ne quitte le navigateur.",
    ],
    steps: [
      "Réglez le nombre de paragraphes voulu (1 à 50).",
      "Appuyez sur le bouton pour générer un lot neuf.",
      "Copiez le texte directement dans votre design, gabarit ou CMS.",
    ],
    faqs: [
      {
        q: "Le lorem ipsum, c'est quoi exactement ?",
        a: "Du latin corrompu tiré d'un passage du De Finibus Bonorum et Malorum de Cicéron, tronqué et brouillé en remplissage sans signification. Sa distribution de lettres imite une vraie langue, ce qui en fait l'outil idéal pour juger une mise en page sans lire le contenu.",
      },
      {
        q: "Pourquoi pas simplement « texte texte texte » ?",
        a: "Des mots factices répétés créent des formes irréalistes et masquent les problèmes de coupures de lignes et de rythme. Le lorem ipsum imite la longueur des mots et la distribution d'une vraie langue.",
      },
      {
        q: "Puis-je avoir plus de 50 paragraphes ?",
        a: "Un lot est plafonné à 50 paragraphes pour garder la page rapide ; appuyez à nouveau sur le bouton dès que vous voulez un autre lot neuf.",
      },
    ],
  },
  "remove-duplicate-lines": {
    name: "Supprimer les lignes en doublon",
    tagline:
      "Retirez les lignes répétées de vos listes et logs en conservant l'ordre d'origine — avec options de casse et de nettoyage des blancs.",
    intro: [
      "Collez n'importe quelle liste — e-mails, URLs, mots-clés, lignes de log — et récupérez la même liste débarrassée de ses doublons en une passe. Les options couvrent les variantes habituelles : ignorer la casse, rogner les blancs avant comparaison, supprimer les lignes vides ou trier le résultat.",
    ],
    steps: [
      "Collez votre liste dans la zone d'entrée — une entrée par ligne.",
      "Activez les options si vous avez besoin d'une comparaison insensible à la casse ou d'un nettoyage.",
      "Copiez la sortie dédupliquée ; l'ordre d'origine est préservé sauf si vous activez le tri.",
    ],
    faqs: [
      {
        q: "L'ordre des lignes d'origine est-il conservé ?",
        a: "Oui. La première occurrence de chaque ligne reste en place. Le tri n'intervient que si vous activez l'option de tri.",
      },
      {
        q: "Peut-il traiter « Apple » et « apple » comme doublons ?",
        a: "Activez « Ignorer la casse » et ils seront traités comme la même ligne ; la première variante vue est conservée.",
      },
    ],
  },
  "remove-extra-spaces": {
    name: "Supprimer les espaces superflus",
    tagline:
      "Réduisez les doubles espaces à un seul, convertissez les tabulations, rognez les bords de lignes et supprimez les lignes vides — un texte collé nettoyé en une passe.",
    intro: [
      "Le texte copié depuis des PDF, tableurs, terminaux et applications de chat arrive souvent criblé de doubles espaces, de tabulations égarées et de lignes vides. Cet outil écrase les espaces répétés en un seul et vous laisse des interrupteurs pour le reste : transformer les tabulations en espaces, rogner les bords de chaque ligne et supprimer les lignes vides.",
      "Tout tourne localement pendant la saisie : collez des logs, des brouillons ou n'importe quel contenu sensible sans y penser deux fois.",
    ],
    steps: [
      "Collez le texte en désordre dans la zone d'entrée.",
      "Activez la conversion des tabulations, le rognage des lignes ou la suppression des lignes vides selon vos besoins.",
      "Copiez la sortie nettoyée directement dans votre document ou éditeur.",
    ],
    faqs: [
      {
        q: "Réduit-il les espaces à l'intérieur des lignes ou seulement aux bords ?",
        a: "Les espaces répétés partout dans le texte sont réduits à un espace unique. Les blancs de bord ne sont retirés que si vous activez « Rogner les bords de ligne ».",
      },
      {
        q: "Va-t-il casser l'indentation de mon code ?",
        a: "Il le peut — l'indentation repose sur les espaces ou tabulations de début de ligne. Pour du code, laissez « Rogner les bords de ligne » désactivé ou utilisez un vrai formateur.",
      },
      {
        q: "Les retours à la ligne sont-ils préservés ?",
        a: "Oui. L'outil ne touche que les blancs horizontaux et les lignes vides ; la structure en lignes de votre texte reste intacte.",
      },
    ],
  },
  "reverse-text": {
    name: "Inverser du texte",
    tagline:
      "Retournez n'importe quel texte caractère par caractère, ou inversez l'ordre des lignes entières — sécurisé Unicode, instantané et 100 % local.",
    intro: [
      "Deux inversions dans un seul outil : reflétez les caractères de votre texte (le classique « txet esrever » pour les jeux, bios et énigmes) ou retournez l'ordre des lignes pour que la dernière vienne en premier — pratique pour les logs, exports de chat et listes collées à l'envers.",
      "L'inversion agit sur les points de code Unicode, pas sur les octets bruts : les lettres accentuées et la plupart des emoji survivent intacts au lieu de se transformer en charabia.",
    ],
    steps: [
      "Collez ou saisissez le texte à retourner.",
      "Laissez « Inverser les lignes seulement » désactivé pour refléter les caractères, ou activez-le pour inverser l'ordre des lignes.",
      "Copiez le résultat inversé.",
    ],
    faqs: [
      {
        q: "Les emoji et lettres accentuées survivront-ils ?",
        a: "Oui dans les cas courants : l'outil inverse par points de code Unicode, donc é, ñ et les emoji standards restent intacts. Les emoji très complexes, formés de plusieurs parties, peuvent encore se séparer une fois reflétés.",
      },
      {
        q: "Que fait exactement « Inverser les lignes seulement » ?",
        a: "Il garde chaque ligne intacte et retourne l'ordre des lignes elles-mêmes — la première devient la dernière. Utilisez-le quand une liste a été collée à l'envers.",
      },
      {
        q: "Puis-je l'utiliser pour vérifier des palindromes ?",
        a: "Indirectement — collez le texte, inversez-le et comparez à l'œil, ou combinez avec l'outil de comparaison de textes.",
      },
    ],
  },
  "sentence-counter": {
    name: "Compteur de phrases",
    tagline:
      "Comptez les phrases instantanément et voyez mots, paragraphes et temps de lecture à côté — un contrôle de lisibilité rapide pour rédacteurs et éditeurs.",
    intro: [
      "Le nombre de phrases est le signal de lisibilité le plus rapide dont dispose un rédacteur. Cet outil compte les phrases pendant la saisie et les place à côté des mots, paragraphes, lignes et temps de lecture : vous voyez d'un coup d'œil si un paragraphe devient trop dense.",
      "Il reconnaît la ponctuation qui termine vraiment les phrases en texte mixte : points latins, points d'interrogation et d'exclamation, plus les signes pleine largeur 。!?… du chinois et du japonais.",
    ],
    steps: [
      "Collez votre brouillon, e-mail ou article dans la zone.",
      "Vérifiez le nombre de phrases mis en évidence et comparez-le à votre nombre de mots.",
      "Scindez ou fusionnez des phrases pour atteindre votre longueur moyenne cible.",
    ],
    faqs: [
      {
        q: "Qu'est-ce qui compte comme une phrase ?",
        a: "Tout segment se terminant par un point, un point d'interrogation, un point d'exclamation ou leurs équivalents CJK 。!?… — tant qu'il contient autre chose que des blancs.",
      },
      {
        q: "Pourquoi mon comptage diffère-t-il de celui de mon éditeur ?",
        a: "Les abréviations comme « M. » ou « p. ex. » se terminent par un point et sont comptées comme fins de phrase — cet outil applique des règles de ponctuation, pas une vraie analyse de langue naturelle.",
      },
      {
        q: "Combien de phrases par paragraphe ?",
        a: "Les guides de style suggèrent habituellement 2 à 5. Aucune règle n'est gravée dans le marbre : servez-vous du comptage pour repérer les murs de texte avant vos lecteurs.",
      },
    ],
  },
  "slug-generator": {
    name: "Générateur de slug",
    tagline:
      "Transformez n'importe quel titre en slug d'URL propre — minuscules, sans accents et à tirets — prêt pour des liens favorables au SEO.",
    intro: [
      "Un slug est la partie de l'URL qui nomme la page — /tools/slug-generator, par exemple. Un bon slug est en minuscules, utilise des tirets au lieu d'espaces et ne garde que lettres et chiffres : les liens restent lisibles dans les résultats de recherche, faciles à copier et sûrs sur tous les serveurs et frameworks.",
      "Collez un titre dans n'importe quelle langue : les accents sont retirés (café → cafe), ponctuation et espaces se réduisent en tirets uniques, et le résultat est rogné pour qu'aucun slug ne commence ni ne finisse par un tiret.",
    ],
    steps: [
      "Tapez ou collez le titre de la page dans la zone d'entrée.",
      "Regardez le slug apparaître pendant la saisie — ajustez le titre jusqu'à ce qu'il se lise bien.",
      "Copiez le slug dans votre CMS, routeur ou générateur de site statique.",
    ],
    faqs: [
      {
        q: "Qu'est-ce qu'un bon slug d'URL ?",
        a: "Court, en minuscules, séparé par des tirets et descriptif. Les moteurs lisent les slugs comme un indice de classement et les utilisateurs les lisent dans les résultats : « chaussures-running-bleues » bat « /p?id=8123 ».",
      },
      {
        q: "Pourquoi les accents sont-ils retirés ?",
        a: "Les caractères non ASCII sont encodés en pourcentage dans les URLs (é devient %C3%A9), ce qui produit des liens longs, moches et fragiles. Les slugs ASCII restent courts et fonctionnent partout.",
      },
      {
        q: "Faut-il garder les mots vides comme « le » et « de » ?",
        a: "Beaucoup de guides SEO conseillent de les retirer pour garder des slugs courts — modifiez librement le slug généré avant de le copier ; l'outil vous donne la base complète à tirets.",
      },
    ],
  },
  "text-cleaner": {
    name: "Nettoyeur de texte",
    tagline:
      "Retirez caractères invisibles, guillemets typographiques, espaces superflus et lignes vides du texte collé depuis des PDF, traitements de texte et applications de chat.",
    intro: [
      "Le copier-coller est là où le texte propre meurt : les PDF laissent des caractères de largeur nulle, Word échange les guillemets droits contre des courbes et ajoute des espaces insécables, les applications de chat insèrent des caractères de contrôle. Cet outil retire les déchets invisibles et répare la ponctuation en une passe.",
      "Chaque option est un interrupteur : vous décidez de l'agressivité du nettoyage — du simple rognage des lignes au nettoyage complet qui supprime les caractères non imprimables et normalise guillemets, tirets et points de suspension.",
    ],
    steps: [
      "Collez le texte en désordre dans la zone d'entrée.",
      "Activez les nettoyages voulus : rogner les lignes, réduire les espaces, supprimer les lignes vides, retirer les caractères invisibles, normaliser la ponctuation.",
      "Copiez la sortie propre dans votre document, CMS ou éditeur.",
    ],
    faqs: [
      {
        q: "Que sont les caractères invisibles et d'où viennent-ils ?",
        a: "Espaces de largeur nulle, marques d'ordre des octets et caractères de contrôle — ajoutés par des PDF, certains sites et logiciels de bureautique. Invisibles mais nuisibles pour les recherches, regex et imports de bases de données : les retirer est généralement sans risque.",
      },
      {
        q: "Que change « normaliser la ponctuation » ?",
        a: "Les guillemets courbes deviennent droits, les tirets demi-cadratin et cadratin deviennent des tirets simples, le caractère de suspension devient trois points et les espaces insécables deviennent des espaces ordinaires. À activer quand la ponctuation brute et compatible code compte.",
      },
      {
        q: "Le nettoyage est-il sans perte ?",
        a: "Aucun outil ne connaît vos intentions avec certitude. La sortie s'affiche toujours d'abord : relisez-la avant de remplacer votre original.",
      },
    ],
  },
  "text-diff": {
    name: "Comparateur de textes",
    tagline:
      "Comparez deux versions d'un texte mot à mot, avec ajouts et suppressions surlignés — sans compte, sans envoi, sans prise de tête de taille.",
    intro: [
      "Collez l'original à gauche et la version modifiée à droite : les mots changés s'allument immédiatement, suppressions d'une couleur, ajouts d'une autre. C'est le moyen le plus rapide de relire une révision de contrat, la réécriture d'un rédacteur ou les modifications de dernière minute d'un collègue.",
      "La comparaison tourne entièrement dans votre navigateur — longs contrats, manuscrits inédits et textes confidentiels ne touchent jamais un serveur.",
    ],
    steps: [
      "Collez le texte original dans la zone de gauche.",
      "Collez le texte modifié dans la zone de droite.",
      "Lisez la vue fusionnée ci-dessous : le texte barré marque les suppressions, le vert marque les ajouts.",
    ],
    faqs: [
      {
        q: "Comment les différences sont-elles affichées ?",
        a: "Le texte inchangé reste neutre ; les mots supprimés sont barrés en orange et les mots ajoutés surlignés en vert : un paragraphe se lit comme une révision suivie.",
      },
      {
        q: "S'agit-il d'une comparaison par caractère ou par mot ?",
        a: "Par mot. Les petites retouches à l'intérieur d'un mot s'affichent comme un mot supprimé plus un mot ajouté — plus lisible à balayer qu'une comparaison au caractère.",
      },
      {
        q: "Y a-t-il une limite de taille ?",
        a: "Seulement la mémoire de votre navigateur — des comparaisons de la taille d'un livre fonctionnent, même si les très grands textes demandent un instant pour se rendre.",
      },
    ],
  },
  "text-sorter": {
    name: "Trieur de texte",
    tagline:
      "Triez n'importe quelle liste de lignes par ordre alphabétique, inverse, par longueur ou par nombre — respectueux de la langue et instantané, dans votre navigateur.",
    intro: [
      "Collez une liste de noms, URLs, prix, tâches ou lignes de log et réordonnez-la d'un clic : A→Z pour les annuaires et index, Z→A pour les classements, du plus court au plus long pour les passes de nettoyage, ordre numérique pour que « item 10 » tombe après « item 2 » au lieu de coincer entre « item 1 » et « item 2 ».",
      "Le tri utilise le classement du navigateur, conscient de la langue : les caractères accentués se rangent où un humain les attend, pas après tout l'alphabet.",
    ],
    steps: [
      "Collez votre liste dans la zone d'entrée — une entrée par ligne.",
      "Choisissez un ordre : A→Z, Z→A, court→long ou numérique.",
      "Copiez le résultat trié ou refaites un tri avec un autre ordre pour comparer.",
    ],
    faqs: [
      {
        q: "En quoi le tri numérique diffère-t-il du A→Z ?",
        a: "Le tri alphabétique compare caractère par caractère : « 10 » vient donc avant « 2 ». Le mode numérique lit d'abord chaque ligne comme un nombre et la classe par valeur.",
      },
      {
        q: "Gère-t-il les caractères accentués et non latins ?",
        a: "Oui. Le tri utilise Intl.Collator, la comparaison du navigateur consciente de la langue : é, ñ, ü et les caractères CJK se rangent selon les conventions linguistiques plutôt que par points de code bruts.",
      },
      {
        q: "La liste d'origine est-elle modifiée ?",
        a: "Non — l'entrée reste intacte et le résultat trié apparaît dans la zone de sortie : vous pouvez toujours revenir en arrière.",
      },
    ],
  },
  "word-counter": {
    name: "Compteur de mots",
    tagline:
      "Comptez mots, caractères, phrases et temps de lecture en direct pendant la saisie — les textes CJK sont gérés correctement.",
    intro: [
      "Un compteur de mots en temps réel pour dissertations, posts, textes SEO et traductions. Il affiche mots, caractères avec et sans espaces, phrases, paragraphes, lignes et temps de lecture estimé dans une seule grille.",
      "Les textes en langues mixtes sont comptés correctement : les mots à l'occidentale sont séparés par les blancs, tandis que les caractères chinois, japonais et coréens sont comptés un à un — ce qui correspond au fonctionnement réel des limites de mots dans ces langues.",
    ],
    steps: [
      "Collez ou écrivez votre texte dans la zone — les statistiques se mettent à jour instantanément.",
      "Consultez le panneau mis en évidence pour le comptage qui vous intéresse.",
      "Continuez d'éditer ; rien n'est enregistré ni envoyé, donc les brouillons inédits sont en sécurité.",
    ],
    faqs: [
      {
        q: "Comment les mots sont-ils comptés en chinois ou en japonais ?",
        a: "Les caractères CJK sont comptés individuellement et ajoutés au nombre de mots, ces langues ne séparant pas les mots par des espaces. Un passage chinois de 500 caractères affiche donc environ 500 « mots ».",
      },
      {
        q: "Comment le temps de lecture est-il estimé ?",
        a: "À environ 220 mots par minute pour l'écriture latine (le CJK est pondéré par nombre de caractères), arrondi à la minute supérieure.",
      },
      {
        q: "Y a-t-il une limite de longueur ?",
        a: "Aucune limite stricte — le compteur n'est borné que par la mémoire de votre navigateur, qui absorbe sans peine un texte de la taille d'un livre.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* Développement                                                       */
  /* ------------------------------------------------------------------ */
  "base64-decoder": {
    name: "Décodeur Base64",
    tagline:
      "Décodez le Base64 en texte lisible avec une gestion UTF-8 correcte — data URI, charges utiles d'API et valeurs de config encodées deviennent claires instantanément. Privé et gratuit.",
    intro: [
      "Collez du Base64 et voyez le texte décodé en direct. Le décodage passe par le TextDecoder standard : le contenu UTF-8 multioctet — accents, emoji, CJK — sort correctement au lieu de se transformer en charabia.",
      "Il est tolérant là où ça compte : les blancs et retours à la ligne de l'entrée sont ignorés, et les préfixes de data URI comme data:image/png;base64, sont retirés automatiquement avant le décodage.",
    ],
    steps: [
      "Collez la chaîne Base64 dans la zone d'entrée.",
      "Le texte décodé apparaît instantanément — copiez-le d'un clic.",
      "Si le décodage échoue, cherchez des caractères tronqués ou non Base64 dans l'entrée.",
    ],
    faqs: [
      {
        q: "La sortie ressemble à des symboles bizarres — pourquoi ?",
        a: "L'entrée n'est probablement pas du texte UTF-8. Le Base64 peut encoder des octets quelconques : images, PDF, blobs binaires. Cet outil décode les octets comme du texte UTF-8 : les données binaires s'affichent donc en caractères de remplacement.",
      },
      {
        q: "Peut-il décoder du Base64 adapté aux URLs ?",
        a: "Oui — il vise les données de type JWT, où - et _ remplacent + et /. Le Base64 standard, avec ou sans padding, fonctionne aussi.",
      },
      {
        q: "Le décodage se fait-il sur un serveur ?",
        a: "Non. Tout tourne dans votre navigateur ; la chaîne ne quitte jamais votre appareil.",
      },
    ],
  },
  "base64-encoder": {
    name: "Encodeur Base64",
    tagline:
      "Encodez du texte en Base64 instantanément avec le support UTF-8 complet — emoji, accents et caractères CJK survivent intacts. Gratuit, privé, rien ne quitte jamais votre navigateur.",
    intro: [
      "Tapez ou collez n'importe quel texte et obtenez sa représentation Base64 en direct pendant la frappe. L'encodage est sûr pour l'UTF-8 via le TextEncoder standard : le texte multilingue, les emoji et les symboles produisent exactement les mêmes octets que les fonctions base64 de n'importe quel langage.",
      "Utilisez-le pour les en-têtes HTTP Basic Auth, les préfixes de data URI, les pièces jointes d'e-mails en déplacement ou toute API qui attend des charges Base64 — sans terminal ni extrait de code.",
    ],
    steps: [
      "Collez ou tapez le texte à encoder.",
      "La sortie Base64 se met à jour en direct — copiez-la quand vous êtes prêt.",
      "Recollez du Base64 dans le décodeur associé pour faire un aller-retour et vérifier.",
    ],
    faqs: [
      {
        q: "Pourquoi le Base64 allonge-t-il mon texte ?",
        a: "Le Base64 représente chaque groupe de 3 octets par 4 caractères : la sortie est donc environ 33 % plus lourde que l'entrée — c'est le coût d'un texte compatible binaire.",
      },
      {
        q: "Le Base64 est-il du chiffrement ?",
        a: "Non. Le Base64 est un encodage, pas un chiffrement — n'importe qui peut le décoder instantanément. Ne l'utilisez jamais pour cacher des secrets ; servez-vous d'une vraie cryptographie.",
      },
      {
        q: "Unicode et emoji sont-ils pris en charge ?",
        a: "Oui. L'entrée est convertie en octets UTF-8 avant l'encodage, ce qui correspond à ce que produisent btoa-avec-TextEncoder, Python, Java et Node pour la même chaîne.",
      },
    ],
  },
  "css-minifier": {
    name: "Minificateur CSS",
    tagline:
      "Minifiez du CSS en ligne : retirez commentaires et blancs inutiles pour alléger vos feuilles de style et charger plus vite. Instantané, privé, sans risque pour vos règles.",
    intro: [
      "Collez n'importe quelle feuille de style et obtenez en temps réel une version compacte d'une ligne : commentaires retirés, blancs redondants réduits, séparateurs resserrés — tandis que le contenu des chaînes, des valeurs url() et la sémantique de vos sélecteurs et propriétés restent exactement tels qu'écrits.",
      "Servez-vous en pour préparer le CSS critique, alléger un thème avant un commit ou vérifier combien d'octets un nettoyage économiserait réellement. L'indicateur de taille en direct affiche taille d'entrée, taille de sortie et pourcentage gagné.",
    ],
    steps: [
      "Collez votre CSS dans la zone d'entrée.",
      "La sortie minifiée apparaît instantanément, avec la taille économisée affichée dessous.",
      "Copiez la feuille de style compacte ou videz l'entrée pour minifier un autre fichier.",
    ],
    faqs: [
      {
        q: "La minification change-t-elle le comportement de mon CSS ?",
        a: "Non. Seuls commentaires et blancs sont retirés — et même eux avec soin : chaînes et contenus url() sont préservés à l'octet près, les valeurs de contenu et data URI restent intactes.",
      },
      {
        q: "Optimise-t-il les couleurs, fusionne-t-il les règles ou ajoute-t-il des préfixes ?",
        a: "Non — c'est un minificateur sûr, au niveau syntaxique. L'optimisation structurelle (fusion de règles en doublon, raccourcissement de couleurs) exige un vrai postprocesseur ; cet outil garantit zéro changement sémantique.",
      },
      {
        q: "Où va mon CSS ?",
        a: "Nulle part. La minification tourne localement dans votre navigateur ; rien n'est envoyé ni stocké.",
      },
    ],
  },
  "csv-to-json": {
    name: "CSV vers JSON",
    tagline:
      "Convertissez du CSV en JSON avec une inférence de types automatique — nombres, booléens et null détectés, champs entre guillemets gérés. Collez, convertissez, copiez. Rien n'est envoyé.",
    intro: [
      "Collez n'importe quel CSV avec une ligne d'en-tête et obtenez en temps réel un tableau JSON d'objets. Champs entre guillemets, guillemets échappés et fins de ligne CRLF sont analysés correctement, et chaque cellule reçoit un type sensé : true/false deviennent des booléens, les nombres purs deviennent des nombres, null devient null — tout le reste reste une chaîne.",
      "Utilisez-le pour alimenter des requêtes API, amorcer des bases de données ou transformer un export de tableur en quelque chose que votre code peut consommer. La sortie JSON est imprimée avec une indentation de 2 espaces, prête à copier.",
    ],
    steps: [
      "Collez votre CSV (la première ligne doit être l'en-tête) dans la zone d'entrée.",
      "Choisissez la virgule ou le point-virgule comme délimiteur.",
      "Copiez le tableau JSON d'objets joliment imprimé.",
    ],
    faqs: [
      {
        q: "Comment l'inférence de types tranche-t-elle entre chaîne et nombre ?",
        a: "Une cellule ne devient un nombre que si c'est un littéral numérique propre (pas de zéro initial, pas d'espaces parasites), true/false deviennent des booléens, le littéral null devient null, et tout le reste — identifiants à zéro initial, codes postaux, dates — reste une chaîne pour préserver sa valeur exacte.",
      },
      {
        q: "Et si ma ligne d'en-tête a des noms en doublon ou vides ?",
        a: "Les cellules d'en-tête vides reçoivent automatiquement des noms column1, column2… Les noms en doublon sont écrasés par la dernière occurrence, un objet JSON ne pouvant pas porter de clés dupliquées.",
      },
      {
        q: "Mon CSV est-il envoyé à un serveur ?",
        a: "Non. La conversion tourne localement dans votre navigateur — vos données ne quittent jamais votre appareil.",
      },
    ],
  },
  "hash-generator": {
    name: "Générateur de hachage",
    tagline:
      "Calculez des hachages SHA-1, SHA-256, SHA-384, SHA-512 ou MD5 de textes ou fichiers, directement dans votre navigateur. Empreintes rapides pour les contrôles d'intégrité — rien n'est envoyé.",
    intro: [
      "Hachez n'importe quel texte pendant la saisie, ou déposez un fichier pour l'empreinter sans le lire octet par octet. Les condensats de la famille SHA-2 tournent sur le moteur WebCrypto natif du navigateur ; le MD5 utilise une implémentation JavaScript éprouvée — tout en local, tout gratuit.",
      "Usages typiques : vérifier un téléchargement contre une somme de contrôle publiée, dédupliquer des fichiers, générer des clés de cache ou comparer deux versions d'un document. Changez d'algorithme en un clic et copiez le condensat hexadécimal instantanément.",
    ],
    steps: [
      "Choisissez l'algorithme : SHA-256 par défaut, ou SHA-1/384/512/MD5.",
      "Tapez ou collez du texte — ou passez en mode Fichier et déposez un fichier.",
      "Copiez le condensat hexadécimal ; comparez-le à la somme attendue.",
    ],
    faqs: [
      {
        q: "Quel algorithme choisir ?",
        a: "SHA-256 est le choix sensé par défaut pour les contrôles d'intégrité et les empreintes. SHA-384/512 pour des condensats plus longs ; SHA-1 et MD5 sont hérités — acceptables pour des sommes de contrôle non sécuritaires, mais ne comptez pas sur eux face à des attaquants.",
      },
      {
        q: "Peut-on inverser un hachage pour retrouver l'entrée ?",
        a: "Non. Les hachages sont à sens unique : les condensats à longueur fixe jettent de l'information par conception. Trouver une entrée qui produit un condensat donné revient à brute-forcer tout l'espace.",
      },
      {
        q: "Mes textes et fichiers sont-ils envoyés ?",
        a: "Jamais. Le hachage tourne localement dans votre navigateur — même les fichiers de plusieurs gigaoctets ne sont lus que par votre propre appareil.",
      },
    ],
  },
  "html-escape": {
    name: "Échappement HTML",
    tagline:
      "Échappez ou déséchappez des entités HTML en direct pendant la saisie : & < > et guillemets deviennent des références sûres, avec un mode numérique en option pour les caractères non ASCII.",
    intro: [
      "Encodez les cinq caractères qui cassent le HTML — esperluette, crochets angulaires et les deux styles de guillemets — en leurs entités nommées, ou recollez des entités pour retrouver du texte lisible. Un second interrupteur convertit les caractères accentués et non latins en références numériques comme &#233;, utile pour les systèmes anciens et les gabarits d'e-mails.",
      "Les deux sens tournent en direct dans un seul panneau, et l'indicateur montre précisément comment le nombre de caractères a bougé : un double échappement raté se voit d'un coup d'œil.",
    ],
    steps: [
      "Collez du HTML ou du texte échappé dans la zone d'entrée.",
      "Choisissez Échapper ou Déséchapper ; les deux tournent en direct pendant la saisie.",
      "Activez les entités numériques si vous avez besoin d'une sortie non ASCII comme &#233;.",
      "Copiez le résultat — l'indicateur de comptage montre de combien il a grandi ou rétréci.",
    ],
    faqs: [
      {
        q: "Pourquoi l'apostrophe est-elle échappée en &#39; plutôt qu'en &apos; ?",
        a: "&apos; est valide en XML et HTML5 mais n'a jamais fait partie d'HTML 4 : certains anciens analyseurs et clients de messagerie le gèrent mal. Le &#39; numérique est sûr partout.",
      },
      {
        q: "Faut-il échapper les caractères non ASCII ?",
        a: "Dans des documents UTF-8, généralement non — les navigateurs gèrent é directement. Les entités numériques comptent pour les encodages anciens, les chaînes de messagerie ou les systèmes qui abîment les octets non ASCII.",
      },
      {
        q: "Quelles entités nommées le déséchappement reconnaît-il ?",
        a: "Environ 70 courantes — balisage (&amp;, &lt;, &gt;, &quot;, &apos;), ponctuation (&mdash;, &hellip;, &ldquo;), accents latins et symboles (&copy;, &euro;) — plus toutes les références numériques décimales et hexadécimales.",
      },
    ],
  },
  "html-formatter": {
    name: "Formateur HTML",
    tagline:
      "Transformez du HTML minifié ou monoligne en balisage propre et indenté — un embellisseur simple et fiable pour e-mails, gabarits et pages sauvegardées. 100 % côté client.",
    intro: [
      "Collez du HTML tassé et récupérez instantanément un balisage lisible et uniformément indenté. Les éléments vides comme img et br ne cassent jamais l'indentation, les balises auto-fermantes courantes comme li et p sont gérées intelligemment, et le contenu des blocs pre, textarea, script et style est préservé intact.",
      "Un formateur volontairement simple : pas de réordonnancement, pas de réécriture d'attributs, pas de surprise — juste des blancs et des retours à la ligne ajoutés pour que la structure saute aux yeux.",
    ],
    steps: [
      "Collez votre HTML dans la zone d'entrée.",
      "Le résultat indenté apparaît en direct pendant la saisie.",
      "Copiez le balisage formaté ou videz l'entrée pour formater un autre extrait.",
    ],
    faqs: [
      {
        q: "Le formatage change-t-il le rendu de mon HTML ?",
        a: "Non — le formatage n'insère que des blancs et des retours à la ligne entre balises. Le contenu de pre, textarea, script et style est préservé exactement, l'espace y étant significatif.",
      },
      {
        q: "Comment gère-t-il les balises non fermées comme li ou p ?",
        a: "Il connaît les éléments auto-fermants courants : un nouveau li ferme le précédent, et une balise fermante d'ancêtre referme tous les enfants ouverts — listes et paragraphes s'indentent comme on l'attend.",
      },
      {
        q: "Le HTML est-il envoyé à un serveur ?",
        a: "Jamais. Le formateur est un analyseur JavaScript local — votre balisage reste dans votre navigateur.",
      },
    ],
  },
  "html-minifier": {
    name: "Minificateur HTML",
    tagline:
      "Minifiez du HTML dans votre navigateur : retirez les commentaires et réduisez les blancs pour alléger la page — un nettoyeur prudent qui préserve balisage et rendu.",
    intro: [
      "Collez du HTML et obtenez une version plus légère en temps réel. Les commentaires sont retirés (les commentaires conditionnels IE survivent), les séries de blancs se réduisent à un espace, et les blancs entre balises de bloc disparaissent entièrement — tandis que l'espacement du texte en ligne est préservé pour que les mots ne fusionnent jamais.",
      "C'est un minificateur délibérément prudent : il ne renomme pas les classes, ne retire pas les guillemets et ne restructure rien. Sûr pour les gabarits d'e-mails et le balisage hérité, avec un indicateur en direct qui montre exactement combien d'octets vous avez gagnés.",
    ],
    steps: [
      "Collez votre HTML dans la zone d'entrée.",
      "La sortie minifiée apparaît instantanément, avec tailles entrée/sortie et pourcentage économisé.",
      "Copiez le HTML compact ou videz l'entrée pour minifier une autre page.",
    ],
    faqs: [
      {
        q: "La minification peut-elle casser mon HTML ?",
        a: "Cet outil prend le chemin sûr : les blancs dans pre, textarea, script et style sont intacts, les trous à blancs seuls entre éléments en ligne deviennent un espace unique, et seuls les trous entre balises de bloc sont retirés. Les commentaires disparaissent, sauf les commentaires conditionnels IE.",
      },
      {
        q: "Pourquoi le pourcentage économisé est-il plus bas que chez d'autres minificateurs ?",
        a: "Parce qu'il est prudent par conception — il ne fusionne jamais du texte avec des balises ni ne retire les guillemets. Ce qu'il retire (commentaires, indentation, blancs inter-blocs) est toujours sans risque pour le rendu.",
      },
      {
        q: "Quelque chose est-il envoyé ?",
        a: "Non. Tout tourne localement dans votre navigateur ; la page et son balisage ne quittent jamais votre appareil.",
      },
    ],
  },
  "http-status-codes": {
    name: "Codes d'état HTTP",
    tagline:
      "Une référence consultable de 56 codes d'état HTTP groupés par classe, chacun expliqué en une phrase claire — cliquez une ligne pour copier le numéro.",
    intro: [
      "Tous les codes importants, de 100 Continue à 511 Network Authentication Required, groupés par classe et expliqués en une phrase claire : ce qui s'est réellement passé sur le réseau et quoi faire ensuite. Les classiques (200, 301, 404, 500) côtoient ceux qui surprennent (207, 418, 451).",
      "La recherche filtre en direct par numéro ou nom — tapez 30 pour tomber sur toutes les redirections, ou « teapot » pour trancher un débat. Cliquer une ligne copie juste le numéro, prêt pour le code, la doc ou un rapport de bug.",
    ],
    steps: [
      "Tapez un numéro ou un nom dans la zone de recherche, ou parcourez par classe.",
      "Lisez le sens en une ligne — pas de prose RFC, juste le sens pratique.",
      "Cliquez une ligne pour copier le numéro du code instantanément.",
    ],
    faqs: [
      {
        q: "Quelle différence entre 301, 302 et 307 ?",
        a: "Les trois redirigent, mais 301 est permanent (les moteurs transfèrent le classement) tandis que 302/307 sont temporaires. 307 garantit en plus que la méthode et le corps restent inchangés — utilisez-le quand un POST doit survivre à la redirection.",
      },
      {
        q: "Le 418 I'm a teapot est-il un vrai code d'état ?",
        a: "Né d'un poisson d'avril dans la RFC 2324, il fut plus tard listé comme réservé. Certaines API réelles le renvoient pour le plaisir ou la limitation de débit, et les navigateurs le traitent comme n'importe quelle erreur 4xx.",
      },
      {
        q: "Pourquoi 401 et 403 signifient-ils tous deux que je n'entre pas ?",
        a: "401 signifie « qui êtes-vous ? » — identifiants manquants ou faux. 403 signifie « je sais qui vous êtes et c'est toujours non » — l'authentification a réussi mais la ressource est interdite.",
      },
    ],
  },
  "javascript-minifier": {
    name: "Minificateur JavaScript",
    tagline:
      "Un minificateur JavaScript prudent : supprime les commentaires et réduit les lignes vides en gardant les retours à la ligne — pas de réécriture risquée, votre code garde sa sémantique.",
    intro: [
      "Ce minificateur fait exactement deux choses : il retire les commentaires // et /* */ (même dans des fichiers coriaces — chaînes, gabarits avec ${…} imbriqués et littéraux regex sont respectés), et il réduit lignes vides et indentation. Les retours à la ligne entre instructions sont conservés : l'insertion automatique de points-virgules continue de fonctionner exactement comme avant.",
      "Il ne renommera jamais de variables, n'inlinera jamais de code ni ne fusionnera d'instructions — c'est le travail d'un vrai outil de build. Vous obtenez un fichier sensiblement plus léger, minifié sans danger, plus un indicateur d'octets gagnés en direct, entièrement dans votre navigateur.",
    ],
    steps: [
      "Collez votre JavaScript dans la zone d'entrée.",
      "La sortie minifiée apparaît instantanément, avec tailles entrée/sortie et pourcentage économisé.",
      "Copiez le script compact ou videz l'entrée pour minifier un autre fichier.",
    ],
    faqs: [
      {
        q: "Pourquoi garder les retours à la ligne au lieu de tout joindre en une ligne ?",
        a: "Choix délibéré. JavaScript repose sur l'insertion automatique de points-virgules, et retirer les retours peut changer silencieusement ce que fait un programme. Garder les retours rend ce minificateur sûr pour du code qui ne passe jamais par un vrai bundler.",
      },
      {
        q: "En quoi diffère-t-il de Terser ou UglifyJS ?",
        a: "Ceux-ci analysent et réécrivent l'AST : renommage des noms, code mort, inlining. Sortie bien plus petite, mais une vraie étape de build. Cet outil ne retire que commentaires et lignes vides — zéro risque de changement de comportement, aucun build requis.",
      },
      {
        q: "Mon code est-il envoyé quelque part ?",
        a: "Non. Tout tourne localement dans votre navigateur — votre source ne quitte jamais l'appareil.",
      },
    ],
  },
  "json-formatter": {
    name: "Formateur JSON",
    tagline:
      "Formatez et embellissez du JSON brouillon en ligne — 2 espaces, 4 espaces ou tabulations, avec validation instantanée et positions d'erreur précises. 100 % dans votre navigateur.",
    intro: [
      "Collez du JSON minifié ou mal indenté et obtenez immédiatement une sortie propre et lisible. Choisissez l'indentation 2 espaces, 4 espaces ou tabulation, et le résultat se met à jour en direct pendant la saisie ou l'édition — parfait pour inspecter réponses d'API, fichiers de config et charges de logs.",
      "Un JSON invalide n'est pas un cul-de-sac : le formateur pointe la ligne et la colonne exactes de l'erreur de syntaxe — une virgule ou un crochet manquant se trouve en quelques secondes au lieu de minutes.",
    ],
    steps: [
      "Collez votre JSON dans la zone d'entrée.",
      "Choisissez une indentation : 2 espaces, 4 espaces ou tabulation.",
      "Copiez le résultat embelli — ou corrigez la ligne et la colonne signalées si le JSON est invalide.",
    ],
    faqs: [
      {
        q: "Y a-t-il une limite de taille pour le JSON à formater ?",
        a: "Aucune limite stricte — le formatage se fait localement dans votre navigateur. Les très gros fichiers (dizaines de Mo) peuvent sembler lents parce que le résultat se recalcule pendant la saisie : collez-les d'un coup et éditez avec précaution.",
      },
      {
        q: "Le formatage change-t-il mes données ?",
        a: "Non. Valeurs, ordre des clés et structure restent exactement les mêmes ; seuls des blancs et retours à la ligne sont ajoutés. La sortie est un JSON équivalent à l'octet près.",
      },
      {
        q: "Mon JSON est-il envoyé à un serveur ?",
        a: "Non. Tout tourne localement dans votre navigateur en JavaScript — vos données ne quittent jamais votre appareil.",
      },
    ],
  },
  "json-minifier": {
    name: "Minificateur JSON",
    tagline:
      "Minifiez du JSON en ligne : supprimez tout blanc pour alléger les charges et accélérer les réponses d'API — voyez les octets exactement gagnés, en privé dans votre navigateur.",
    intro: [
      "Collez du JSON joliment imprimé et récupérez en temps réel l'équivalent valide le plus compact : chaque espace, retour à la ligne et indentation disparaissent sans toucher vos données. Un indicateur de taille en direct affiche taille d'origine, taille minifiée et pourcentage gagné.",
      "Servez-vous en pour alléger réponses d'API, fichiers de fixtures, traductions et configs JSON avant expédition ou stockage. Si l'entrée n'est pas un JSON valide, l'outil donne la ligne et la colonne exactes du problème au lieu d'échouer en silence.",
    ],
    steps: [
      "Collez votre JSON formaté dans la zone d'entrée.",
      "La sortie minifiée d'une ligne apparaît instantanément, avec la taille économisée affichée dessous.",
      "Copiez le résultat compact ou videz l'entrée pour recommencer.",
    ],
    faqs: [
      {
        q: "Minifier du JSON change-t-il les données ?",
        a: "Non. Les blancs hors chaînes n'ont aucun sens en JSON : les retirer produit un document équivalent, aux valeurs identiques une fois analysé.",
      },
      {
        q: "De combien mon JSON va-t-il rétrécir ?",
        a: "Cela dépend de l'indentation retirée — les fichiers fortement indentés perdent souvent 30 à 60 %. L'outil affiche le pourcentage exact pour votre entrée.",
      },
      {
        q: "Mes données sont-elles envoyées quelque part ?",
        a: "Non. La minification tourne entièrement dans votre navigateur — rien n'est envoyé, journalisé ni stocké.",
      },
    ],
  },
  "json-to-csv": {
    name: "JSON vers CSV",
    tagline:
      "Convertissez des tableaux JSON d'objets en CSV avec guillemets et échappements corrects — prêt pour Excel, Sheets ou un import en base. Entièrement dans le navigateur.",
    intro: [
      "Collez un tableau JSON d'objets et récupérez du CSV instantanément. Les colonnes sont l'union de chaque clé rencontrée dans les lignes, les valeurs sont échappées dans les règles — guillemets doublés, champs entourés s'ils contiennent virgules, guillemets ou retours à la ligne — pour un résultat qui s'ouvre proprement dans Excel, Sheets ou n'importe quel importeur.",
      "Les objets et tableaux imbriqués sont sérialisés en chaînes JSON dans leur cellule, booléens et nombres passent tels quels, et les null deviennent des cellules vides. Choisissez la virgule ou le point-virgule comme délimiteur selon ce qu'attend votre environnement.",
    ],
    steps: [
      "Collez un tableau JSON d'objets dans la zone d'entrée.",
      "Le CSV apparaît en direct — prenez virgule ou point-virgule si votre tableur l'exige.",
      "Copiez le résultat directement dans un fichier .csv ou un assistant d'import.",
    ],
    faqs: [
      {
        q: "Et si mes lignes ont des clés différentes ?",
        a: "L'outil construit la liste des colonnes à partir de chaque clé vue dans toutes les lignes ; les lignes auxquelles il manque une colonne reçoivent une cellule vide. C'est généralement ce qu'on veut pour des données réelles anarchiques.",
      },
      {
        q: "Comment les objets et tableaux imbriqués sont-ils gérés ?",
        a: "Ils sont sérialisés en chaîne JSON dans la cellule (et cités/échappés comme toute valeur). Aplatissez d'abord vos données si vous voulez une colonne par champ imbriqué.",
      },
      {
        q: "Mes données sont-elles envoyées quelque part ?",
        a: "Non. La conversion se fait localement dans votre navigateur — rien ne quitte votre appareil.",
      },
    ],
  },
  "json-validator": {
    name: "Validateur JSON",
    tagline:
      "Validez du JSON instantanément avec la ligne et la colonne précises de l'erreur. Attrapez virgules manquantes, clés non citées, virgules traînantes et échappements fautifs avant qu'ils cassent votre application.",
    intro: [
      "Collez n'importe quel document JSON et voyez d'un coup d'œil s'il est valide. Le validateur est strict : il suit le standard JSON — guillemets simples, virgules traînantes, clés non citées et commentaires sont tous signalés.",
      "Quand quelque chose cloche, vous obtenez la ligne et la colonne exactes plus une raison lisible — pas un message cryptique d'une ligne. Une entrée valide est récompensée par une version joliment imprimée, prête à copier.",
    ],
    steps: [
      "Collez votre JSON dans la zone d'entrée.",
      "Un statut vert apparaît si le JSON est valide ; sinon la ligne, la colonne et la raison exactes sont affichées.",
      "Corrigez la position signalée, ou copiez la sortie imprimée quand la validation passe.",
    ],
    faqs: [
      {
        q: "Quelles erreurs le validateur détecte-t-il ?",
        a: "Toutes les erreurs de syntaxe JSON standard : virgules manquantes ou superflues, clés non citées ou entre guillemets simples, virgules traînantes, caractères de contrôle non échappés, échappements invalides et contenu parasite après la valeur — chacun signalé avec ligne et colonne.",
      },
      {
        q: "Vérifie-t-il aussi le schéma ou seulement la syntaxe ?",
        a: "Syntaxe seulement. Il vérifie que le document est un JSON valide, pas que les champs ont les types ou valeurs attendus — pour cela, il faut un validateur de schéma comme JSON Schema.",
      },
      {
        q: "Mon JSON est-il envoyé quelque part ?",
        a: "Non. La validation se fait localement dans votre navigateur ; rien ne quitte votre appareil.",
      },
    ],
  },
  "jwt-decoder": {
    name: "Décodeur JWT",
    tagline:
      "Décodez des tokens JWT en ligne : inspectez les claims d'en-tête et de charge avec des horodatages exp et iat lisibles. Décodage seul — rien n'est vérifié ni envoyé.",
    intro: [
      "Collez un JSON Web Token et voyez aussitôt ses trois parties séparément : l'en-tête (algorithme et type de token), la charge utile (les claims réels) et la signature. Les deux sections JSON sont joliment imprimées, et les horodatages comme iat, nbf et exp sont traduits en dates lisibles dans votre langue, avec exp marqué expiré ou encore actif.",
      "Tout est décodé localement en Base64URL — le token n'est envoyé nulle part et jamais vérifié. Retenez : décoder montre ce qu'un token dit, pas ce qu'il a le droit de faire. La vérification de signature exige toujours le secret ou la clé publique sur un système de confiance.",
    ],
    steps: [
      "Collez le JWT (les trois parties séparées par des points) dans la zone d'entrée.",
      "Lisez l'en-tête et la charge joliment imprimés, avec exp/iat en vraies dates.",
      "Corrigez votre token ou sa vérification côté serveur en conséquence — copiez la charge si besoin.",
    ],
    faqs: [
      {
        q: "Décoder un JWT le vérifie-t-il ?",
        a: "Non. Décoder n'est que Base64URL + analyse JSON, et n'importe qui peut le faire — y compris un attaquant. Un token décodé d'apparence valide ne prouve rien. La vérification exige de contrôler la signature avec le secret (HMAC) ou la clé publique (RSA/EC), donc le matériel de clé de l'émetteur du token.",
      },
      {
        q: "Peut-on récupérer ou modifier les claims d'un token ?",
        a: "Vous pouvez lire les claims, mais forger un nouveau token avec des claims modifiés invaliderait la signature — tout changement d'en-tête ou de charge casse le contrôle de signature côté serveur.",
      },
      {
        q: "Est-il sûr de coller un vrai token ici ?",
        a: "Le token est décodé entièrement dans votre navigateur et ne quitte jamais votre appareil — aucun envoi. Cela reste un identifiant : évitez de coller des tokens de production là où vous n'en avez pas besoin.",
      },
    ],
  },
  "markdown-previewer": {
    name: "Aperçu Markdown",
    tagline:
      "Prévisualisez le Markdown en HTML propre et assaini pendant la saisie — titres, listes, tableaux, code et liens rendus en direct. Parfait pour README, docs et commentaires.",
    intro: [
      "Écrivez du Markdown à gauche et voyez la page rendue apparaître à droite en temps réel : titres, emphase, listes, tableaux, citations, listes de tâches et blocs de code délimités, tout rendu par le moteur marked, largement utilisé.",
      "Le HTML généré est assaini avec une liste blanche stricte de balises et attributs avant affichage — scripts, gestionnaires d'événements et URLs javascript: sont retirés — et vous pouvez copier le HTML propre pour le coller dans un blog, CMS ou gabarit d'e-mail.",
    ],
    steps: [
      "Tapez ou collez du Markdown dans le panneau de gauche.",
      "Regardez l'aperçu assaini se mettre à jour à droite pendant que vous écrivez.",
      "Copiez le HTML généré quand il convient, ou effacez pour recommencer.",
    ],
    faqs: [
      {
        q: "Le HTML prévisualisé est-il sûr ?",
        a: "Oui. Avant tout rendu, le HTML passe par un assainisseur à liste blanche qui retire les balises script, les gestionnaires d'événements en ligne et les liens javascript:, en ne gardant que les balises de formatage standard et des URLs d'images/liens sûres.",
      },
      {
        q: "Quelles fonctionnalités Markdown sont prises en charge ?",
        a: "Tout ce que marked gère par défaut : tableaux à la GitHub, texte barré, listes de tâches, liens automatiques, code délimité avec étiquette de syntaxe et listes imbriquées.",
      },
      {
        q: "Où mon texte est-il traité ?",
        a: "Entièrement dans votre navigateur — le Markdown ne quitte jamais votre appareil, même quand vous copiez le HTML généré.",
      },
    ],
  },
  "md5-generator": {
    name: "Générateur MD5",
    tagline:
      "Générez des hachages MD5 de n'importe quel texte ou fichier instantanément dans votre navigateur — parfait pour sommes de contrôle, clés de dédoublonnage et intégrations héritées. À sens unique, jamais envoyé.",
    intro: [
      "Tapez du texte pour voir son condensat MD5 128 bits en direct, ou déposez un fichier pour l'empreinter sans envoyer un seul octet. Le hachage se fait localement avec une implémentation JavaScript mature de l'algorithme MD5.",
      "Le MD5 est encore partout : sommes de contrôle de téléchargements, clés de dédoublonnage, busteurs de cache, intégrations de systèmes hérités. Retenez juste pour quoi il ne sert plus : malgré son âge, le MD5 est cryptographiquement cassé — ne l'utilisez jamais pour des mots de passe, signatures ou tout ce qu'un attaquant pourrait trafiquer.",
    ],
    steps: [
      "Tapez ou collez le texte — le condensat MD5 se met à jour en direct.",
      "Ou passez en mode Fichier et déposez un fichier à hacher localement.",
      "Copiez le condensat hexadécimal et comparez-le à la somme attendue.",
    ],
    faqs: [
      {
        q: "Le MD5 est-il sûr pour stocker des mots de passe ?",
        a: "Non — pas du tout. Le MD5 est rapide par conception et les attaques par collision sont pratiques : casser des hachages MD5 de mots de passe est trivial. Utilisez plutôt un schéma dédié au hachage de mots de passe comme bcrypt, scrypt ou Argon2.",
      },
      {
        q: "À quoi le MD5 sert-il encore ?",
        a: "À l'intégrité sans adversaire : vérifier qu'un fichier a survécu à un transfert, dédupliquer du contenu, clés de cache et dialogue avec des systèmes hérités qui l'attendent. Pour tout ce qui touche à la sécurité, prenez SHA-256 ou mieux.",
      },
      {
        q: "Mes textes et fichiers sont-ils envoyés à un serveur ?",
        a: "Non. Tout tourne dans votre navigateur ; même les fichiers sont lus et hachés entièrement sur votre appareil.",
      },
    ],
  },
  "regex-tester": {
    name: "Testeur d'expressions régulières",
    tagline:
      "Testez vos regex en direct : surlignez chaque correspondance pendant la saisie, inspectez les groupes de capture et déboguez pour JavaScript, drapeaux courants à un clic.",
    intro: [
      "Tapez un motif, activez les drapeaux voulus (global, insensible à la casse, multiligne, dotAll, unicode) et collez votre chaîne de test — chaque correspondance est surlignée en place, tandis qu'une liste dessous montre chaque match avec son index et ses groupes de capture, groupes nommés inclus.",
      "Les motifs invalides sont signalés aussitôt avec le message de l'analyseur lui-même au lieu d'une page cassée, et les correspondances de longueur nulle sont gérées proprement : des motifs comme a* se comportent comme votre moteur d'exécution.",
    ],
    steps: [
      "Saisissez votre expression régulière dans le champ de motif.",
      "Activez les drapeaux (g, i, m, s, u) et collez votre chaîne de test.",
      "Lisez les correspondances surlignées et la liste des groupes ; ajustez le motif jusqu'à capturer exactement ce qu'il vous faut.",
    ],
    faqs: [
      {
        q: "Quelle saveur de regex est utilisée ?",
        a: "Le RegExp JavaScript (ECMAScript) — le même moteur que votre navigateur et Node. Les motifs PCRE, Python ou Java sont généralement compatibles, mais lookahead/lookbehind et gestion Unicode peuvent différer légèrement.",
      },
      {
        q: "Pourquoi mon motif attrape-t-il d'étranges positions vides ?",
        a: "Les motifs capables de correspondre à une chaîne vide (comme a*) produisent des correspondances de longueur nulle. Le testeur avance d'un caractère après chacune, exactement comme l'itération native de JavaScript.",
      },
      {
        q: "Mes données de test sont-elles envoyées ?",
        a: "Non. La correspondance tourne en direct dans votre navigateur — rien n'est envoyé ni stocké.",
      },
    ],
  },
  "sha256-generator": {
    name: "Générateur SHA-256",
    tagline:
      "Calculez des hachages SHA-256 de textes ou fichiers en ligne via le WebCrypto natif — le choix standard pour les contrôles d'intégrité et les empreintes. 100 % côté client.",
    intro: [
      "Tapez du texte pour voir son condensat SHA-256 256 bits apparaître en direct, ou déposez un fichier pour empreinter des gigaoctets sans rien envoyer. Le hachage est calculé par l'implémentation WebCrypto du navigateur — le même code que votre OS et votre pile TLS font confiance.",
      "SHA-256 est aujourd'hui le choix par défaut pour vérifier des téléchargements, signer des artefacts, dédupliquer du contenu, bâtir du stockage adressé par contenu et le travail blockchain. Copiez le condensat hex en un clic et comparez-le à la somme qu'un éditeur vous a donnée.",
    ],
    steps: [
      "Tapez ou collez le texte — le condensat se met à jour pendant la saisie.",
      "Ou passez en mode Fichier et déposez un fichier à hacher localement.",
      "Copiez le condensat hexadécimal et comparez-le à la valeur attendue.",
    ],
    faqs: [
      {
        q: "SHA-256 est-il sûr ?",
        a: "Oui — SHA-256 fait partie de la famille SHA-2 et reste inviolé après deux décennies d'analyse. C'est le condensat derrière les certificats TLS, Bitcoin et la vérification de la plupart des publications logicielles.",
      },
      {
        q: "Pourquoi la même entrée donne-t-elle toujours le même hachage ?",
        a: "Parce que SHA-256 est déterministe : des octets identiques produisent toujours un condensat identique. Cette propriété fait marcher la comparaison de sommes de contrôle — un seul octet changé modifie tout le condensat.",
      },
      {
        q: "Mes textes et fichiers sont-ils envoyés ?",
        a: "Non. Le hachage tourne localement dans votre navigateur avec WebCrypto — vos données ne quittent jamais l'appareil.",
      },
    ],
  },
  "sql-formatter": {
    name: "Formateur SQL",
    tagline:
      "Formatez du SQL en ligne avec une casse de mots-clés et une indentation cohérentes — rendez vos longs SELECT, JOIN et procédures stockées lisibles, dans votre navigateur.",
    intro: [
      "Collez une requête dense d'une ligne et récupérez instantanément du SQL bien structuré : les clauses passent à la ligne, les expressions imbriquées s'indentent uniformément et les mots-clés passent en majuscules pour se repérer d'un coup d'œil. Propulsé par le moteur sql-formatter : les règles sont celles que de vraies équipes utilisent.",
      "Parfait pour relire des requêtes générées, déboguer la sortie d'un ORM, documenter des procédures stockées ou démêler une clause WHERE de 40 lignes abandonnée dans un commentaire.",
    ],
    steps: [
      "Collez votre SQL dans la zone d'entrée.",
      "La requête formatée apparaît pendant la saisie, mots-clés en majuscules et clauses alignées.",
      "Copiez le SQL lisible ou videz l'entrée pour formater une autre requête.",
    ],
    faqs: [
      {
        q: "Quels dialectes SQL sont pris en charge ?",
        a: "Le formatage fonctionne sur le SQL standard, et le moteur sous-jacent comprend aussi la syntaxe spécifique de PostgreSQL, MySQL, T-SQL, PL/SQL, BigQuery, Snowflake et d'autres — les structures courantes se formatent correctement partout.",
      },
      {
        q: "Le formatage change-t-il ce que fait ma requête ?",
        a: "Non. Seuls les blancs et la casse des mots-clés changent. Les littéraux de chaîne et identifiants cités sont préservés exactement : la requête est sémantiquement identique.",
      },
      {
        q: "Ma requête est-elle envoyée à un serveur ?",
        a: "Non. Le formatage tourne localement dans votre navigateur — votre SQL ne quitte jamais votre appareil.",
      },
    ],
  },
  "url-decoder": {
    name: "Décodeur d'URL",
    tagline:
      "Décodez les URLs encodées en pourcentage en texte lisible — %20, %2F et valeurs de chaîne de requête deviennent claires instantanément. Gère + comme espace, entièrement dans votre navigateur.",
    intro: [
      "Collez une URL, un paramètre ou un segment de chemin encodé et lisez le texte d'origine immédiatement. Deux modes correspondent aux deux encodeurs : décodage composant (decodeURIComponent) pour une valeur seule, et décodage d'URI complet (decodeURI) pour une URL entière.",
      "Un interrupteur pratique traite + comme un espace — ce que les chaînes de requête encodées formulaire (application/x-www-form-urlencoded) signifient réellement : des paramètres comme hello+world décodent donc en hello world au lieu de rester littéraux.",
    ],
    steps: [
      "Collez la chaîne ou l'URL encodée en pourcentage.",
      "Choisissez le décodage composant pour des valeurs, ou le décodage d'URI complet pour des URLs entières.",
      "Activez + comme espace pour les chaînes de requête de type formulaire, puis copiez le texte décodé.",
    ],
    faqs: [
      {
        q: "Pourquoi ai-je parfois une erreur en décodant ?",
        a: "Un % isolé non suivi de deux chiffres hexadécimaux, ou une séquence d'échappement tronquée comme %E4%BD, est un encodage en pourcentage invalide — le décodeur le signale au lieu de deviner.",
      },
      {
        q: "Dois-je activer l'option + comme espace ?",
        a: "Pour des valeurs issues d'une soumission de formulaire HTML ou des chaînes de requête de nombreux frameworks web, oui. Pour des URLs standard encodées en pourcentage contenant de vrais caractères +, laissez désactivé.",
      },
      {
        q: "Quelque chose est-il envoyé ?",
        a: "Non. Le décodage tourne localement dans votre navigateur — rien ne quitte votre appareil.",
      },
    ],
  },
  "url-encoder": {
    name: "Encodeur d'URL",
    tagline:
      "Encodez en pourcentage URLs et chaînes de requête en ligne — choisissez l'encodage composant ou l'URI complet, avec sortie en direct pour liens, paramètres et segments de chemin.",
    intro: [
      "Collez n'importe quel texte ou URL et voyez le résultat encodé en pourcentage en direct. Deux modes couvrent les deux cas réels : l'encodage composant (encodeURIComponent) échappe chaque caractère réservé pour une valeur de paramètre unique, tandis que l'encodage d'URI complet (encodeURI) garde la structure de l'URL — :, /, ? et & — intacte.",
      "Indispensable pour construire des chaînes de requête à la main, emboîter une URL dans une autre, générer des liens mailto ou passer des valeurs avec espaces, esperluettes et caractères non latins dans des paramètres GET.",
    ],
    steps: [
      "Collez le texte, la valeur de paramètre ou l'URL à encoder.",
      "Choisissez l'encodage composant pour une valeur, ou l'URI complet pour garder la structure.",
      "Copiez le résultat encodé directement dans votre lien ou requête.",
    ],
    faqs: [
      {
        q: "Quand utiliser encodeURIComponent plutôt que encodeURI ?",
        a: "encodeURIComponent pour les valeurs individuelles insérées dans une URL — il échappe &, =, ?, / et plus, donc une valeur ne peut jamais casser la chaîne de requête. encodeURI seulement pour une URL entière à rendre transportable en gardant sa structure.",
      },
      {
        q: "Pourquoi les espaces deviennent-ils %20 et pas + ?",
        a: "%20 est l'encodage en pourcentage standard de l'espace ; le raccourci + est une convention d'encodage formulaire gérée à part par application/x-www-form-urlencoded. Cet outil utilise le %20 standard.",
      },
      {
        q: "Gère-t-il les caractères non latins ?",
        a: "Oui — les caractères hors ASCII sont d'abord encodés en UTF-8 puis en pourcentage, exactement comme le font les navigateurs.",
      },
    ],
  },
  "url-parser": {
    name: "Analyseur d'URL",
    tagline:
      "Collez n'importe quelle URL et voyez-la décomposée en direct : protocole, hôte, port, chaque segment de chemin, paramètres de requête décodés et ancre — avec copie en JSON.",
    intro: [
      "Une URL cache une douzaine de données dans une seule ligne. Cet outil la découpe en lignes étiquetées — schéma, hôte, port, chaque segment de chemin sur sa propre ligne, chaque paramètre de requête avec sa clé et sa valeur décodée, plus le fragment — pour auditer des liens de suivi, déboguer du routage ou rétro-analyser un appel d'API.",
      "L'analyse utilise l'API URL native du navigateur : les valeurs sont décodées exactement comme le serveur destinataire les décoderait. Les URLs sans schéma reçoivent https:// par hypothèse, et une entrée malformée obtient une erreur en langage clair au lieu d'un plantage.",
    ],
    steps: [
      "Collez l'URL dans la zone d'entrée.",
      "Lisez le tableau décomposé : parties, segments et paramètres se mettent à jour en direct.",
      "Copiez en JSON quand vous avez besoin du découpage dans du code ou de la documentation.",
    ],
    faqs: [
      {
        q: "Que se passe-t-il si je colle une URL sans https:// ?",
        a: "L'outil suppose https:// et réessaie, comme le font les navigateurs pour les domaines nus. Un schéma saisi explicitement est toujours gardé tel quel.",
      },
      {
        q: "Les valeurs de requête sont-elles décodées ?",
        a: "Oui. Clés et valeurs sont décodées selon le standard URL : %20 devient un espace et %2F une barre oblique, exactement comme le serveur les lirait.",
      },
      {
        q: "Et les clés de requête en doublon comme ?tag=a&tag=b ?",
        a: "Chaque occurrence reçoit sa propre ligne, et l'export JSON les liste comme paires clé/valeur séparées : rien n'est écrasé en silence.",
      },
    ],
  },
  "uuid-generator": {
    name: "Générateur d'UUID",
    tagline:
      "Générez des identifiants UUID v4 aléatoires en vrac d'un clic — 1 à 500 à la fois, avec l'aléa cryptographique de votre navigateur. Gratuit, instantané, hors ligne possible.",
    intro: [
      "Créez des UUID version 4 RFC 4122 en quantité : fixtures de test, amorçage de bases, noms de fichiers, identifiants de requête ou brouillons de clés API. Chaque identifiant est produit par crypto.randomUUID, la source aléatoire cryptographiquement sûre du navigateur — 122 bits aléatoires, des probabilités de collision que vous n'atteindrez jamais en pratique.",
      "Contrairement aux versions temporelles (v1/v6/v7), la v4 ne porte aucun horodatage et ne divulgue rien sur le moment ou le lieu de sa création — la page vous le dit exactement, plus l'heure de génération de votre lot.",
    ],
    steps: [
      "Réglez le nombre d'UUID voulus (1 à 500).",
      "Cliquez sur Générer — la liste apparaît instantanément.",
      "Copiez-les tous d'un coup, ou effacez et générez un lot neuf.",
    ],
    faqs: [
      {
        q: "Deux UUID générés peuvent-ils entrer en collision ?",
        a: "Théoriquement oui, pratiquement non. Avec 122 bits aléatoires, produire une collision exige de l'ordre de 10^36 UUIDs — bien au-delà de toute charge réaliste.",
      },
      {
        q: "Pourquoi choisir v4 plutôt que UUID v1 ou v7 ?",
        a: "La v4 ne divulgue aucune information d'heure ni de matériel et n'a besoin ni d'horloge ni d'adresse MAC. Si vous voulez des IDs triables par temps, bons pour les index de base de données, regardez la v7 — pour l'unicité simple, la v4 est le choix standard.",
      },
      {
        q: "Les UUID sont-ils générés sur un serveur ?",
        a: "Non. Ils viennent du générateur aléatoire cryptographique de votre propre navigateur et ne quittent jamais votre appareil.",
      },
    ],
  },
  "xml-formatter": {
    name: "Formateur XML",
    tagline:
      "Embellissez du XML en ligne avec une indentation propre de 2 espaces — sitemaps, flux RSS, enveloppes SOAP et fichiers de config redeviennent lisibles, dans votre navigateur.",
    intro: [
      "Collez du XML emmêlé ou d'une ligne et obtenez instantanément un document correctement indenté. Les éléments s'imbriquent avec une indentation uniforme de 2 espaces, le contenu textuel court reste sur une ligne avec ses balises, et commentaires, sections CDATA, instructions de traitement et déclarations DOCTYPE sont préservés.",
      "Idéal pour lire sitemap.xml, flux RSS/Atom, layouts Android, poms Maven, réponses SOAP et quantité d'autres formats de config — sans installer d'extension d'éditeur.",
    ],
    steps: [
      "Collez votre XML dans la zone d'entrée.",
      "Le document formaté apparaît immédiatement pendant la saisie.",
      "Copiez le XML embelli ou videz l'entrée pour essayer un autre fichier.",
    ],
    faqs: [
      {
        q: "Le formatage change-t-il mes données XML ?",
        a: "Les blancs entre éléments sont normalisés pour rendre la structure lisible, ce qui est sûr pour pratiquement tout le XML réel. Les blancs du contenu textuel sont préservés (rognés aux bords) et les sections CDATA gardées à l'octet près.",
      },
      {
        q: "Gère-t-il les gros fichiers XML ?",
        a: "Oui, raisonnablement — le formatage est une passe unique rapide qui tourne en local, mais les documents de plusieurs mégaoctets peuvent demander un instant sur les appareils lents.",
      },
      {
        q: "Mon XML est-il envoyé à un serveur ?",
        a: "Non. Le formatage se fait entièrement dans votre navigateur ; rien n'est envoyé nulle part.",
      },
    ],
  },
  "xml-validator": {
    name: "Validateur XML",
    tagline:
      "Contrôlez la bonne formation du XML en temps réel : balises mal appariées, attributs cassés et entités invalides signalés dès le collage. Rien n'est envoyé.",
    intro: [
      "Le validateur utilise l'analyseur XML intégré du navigateur : il impose exactement les règles de la vraie outillage XML — chaque balise doit se fermer, les attributs doivent être cités, les entités doivent être valides et il doit y avoir exactement un élément racine.",
      "Un XML bien formé obtient un statut vert plus un aperçu joliment imprimé ; les problèmes arrivent avec la description d'erreur de l'analyseur lui-même, qui pointe la construction fautive — utile avant de nourrir de consommateurs exigeants avec des flux, sitemaps ou charges SOAP.",
    ],
    steps: [
      "Collez votre XML dans la zone d'entrée.",
      "Un statut vert apparaît si le XML est bien formé ; sinon l'erreur de l'analyseur est affichée.",
      "Corrigez le problème signalé, ou copiez l'aperçu formaté quand ça passe.",
    ],
    faqs: [
      {
        q: "Valide-t-il contre un schéma DTD ou XSD ?",
        a: "Non — il ne contrôle que la bonne formation (structure, citation, entités, racine unique). La validation de schéma exige un outil dédié avec votre XSD ou DTD.",
      },
      {
        q: "Qu'est-ce qui compte comme erreur XML ici ?",
        a: "Balises non fermées ou mal appariées, attributs non cités, attributs en doublon, références d'entités invalides, racines multiples et caractères illégaux sont tous rejetés.",
      },
      {
        q: "Mon XML est-il envoyé quelque part ?",
        a: "Non. Le contrôle tourne dans votre navigateur avec le DOMParser natif — vos données ne quittent jamais l'appareil.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* SEO                                                                 */
  /* ------------------------------------------------------------------ */
  "canonical-tag-generator": {
    name: "Générateur de balise canonique",
    tagline:
      "Générez une balise link rel=canonical correcte et apprenez à normaliser vos URLs pour que les moteurs n'indexent que la version que vous voulez.",
    intro: [
      "Une balise canonique dit aux moteurs quelle URL indexer quand le même contenu est joignable à plusieurs adresses — avec et sans barre oblique finale, avec chaînes de requête, paramètres UTM, variantes http/https ou www. Bien faite, elle consolide les URLs dupliquées en un seul signal de classement au lieu de le diviser.",
      "Saisissez l'URL absolue de la version préférée et copiez la balise dans le <head> de cette page. La liste de contrôle couvre les détails de normalisation que la plupart des implémentations ratent.",
    ],
    steps: [
      "Choisissez un format d'URL canonique pour tout votre site : https, hôte avec ou sans www, barre oblique finale ou non.",
      "Collez l'URL absolue de la version préférée de la page.",
      "Copiez la balise link dans le <head> de la page et vérifiez-la avec l'outil d'inspection d'URL.",
    ],
    faqs: [
      {
        q: "À quoi sert réellement une balise canonique ?",
        a: "Elle consolide les doublons : les signaux des URLs alternatives — copies UTM, tris paramétrés, versions d'impression — sont fusionnés vers l'URL canonique, qui se classe au lieu que l'équité soit divisée entre doublons.",
      },
      {
        q: "Chaque page doit-elle avoir une canonique auto-référente ?",
        a: "Oui, c'est le réglage recommandé par défaut. Même les pages uniques devraient déclarer leur propre URL comme canonique, pour se prémunir contre les variantes de paramètres, de barre finale et de casse que vous n'avez pas encore remarquées.",
      },
      {
        q: "Canonique, noindex ou redirection — lequel choisir ?",
        a: "Une redirection 301 quand le doublon doit renvoyer les utilisateurs ailleurs, noindex quand il doit rester accessible mais hors résultats, canonique quand les deux versions doivent rester en ligne et explorables.",
      },
    ],
  },
  "hreflang-generator": {
    name: "Générateur hreflang",
    tagline:
      "Construisez un cluster de liens hreflang complet — un lien par langue plus x-default — depuis vos URLs traduites, cohérent et bidirectionnel.",
    intro: [
      "hreflang dit aux moteurs quelle URL servir aux locuteurs de chaque langue, ce qui empêche des traductions quasi identiques de se concurrencer. Les clusters sont bidirectionnels : chaque page localisée doit renvoyer le jeu complet, y compris une référence à elle-même.",
      "Saisissez l'URL de chaque version linguistique et le générateur produit le cluster complet de <link rel=\"alternate\"> plus x-default, qui doit pointer vers votre sélecteur de langue ou la page d'accueil par défaut.",
    ],
    steps: [
      "Collez l'URL absolue de chaque version traduite ; laissez vides les langues que vous n'avez pas.",
      "Réglez l'URL x-default — votre sélecteur de langue ou la page d'accueil par défaut.",
      "Copiez le cluster dans le <head> de chaque page du jeu.",
    ],
    faqs: [
      {
        q: "Chaque page a-t-elle besoin du jeu hreflang complet ?",
        a: "Oui. Les clusters doivent être réciproques : la page A liste la page B et elle-même, et B liste A et elle-même. Un cluster auquel il manque des membres est partiellement ignoré, et l'effort est perdu.",
      },
      {
        q: "Faut-il utiliser zh ou zh-Hans ?",
        a: "Préférez zh-Hans pour le simplifié et zh-Hant pour le traditionnel ; un zh nu laisse le système d'écriture indéfini. Les sous-étiquettes de région comme pt-BR sont facultatives — visez d'abord la langue et n'ajoutez une région que si le contenu diffère vraiment, comme pt-BR face à pt-PT.",
      },
      {
        q: "hreflang remplace-t-il une balise canonique ?",
        a: "Non. Chaque version linguistique a toujours besoin de sa canonique auto-référente. hreflang choisit entre pages traduites équivalentes ; la canonique tranche les doublons à l'intérieur d'une langue.",
      },
    ],
  },
  "keyword-density-checker": {
    name: "Analyseur de densité de mots-clés",
    tagline:
      "Comptez les expressions de 1 à 3 mots et leur densité, avec listes de mots vides intégrées pour l'anglais, le chinois, le japonais, l'espagnol et le portugais.",
    intro: [
      "La densité de mots-clés est la part d'apparitions d'une expression parmi tous les mots de la page. Cet analyseur segmente votre texte, retire les mots vides selon la langue et rapporte comptages et densité pour les expressions d'un, deux et trois mots — en direct, pendant que vous collez ou éditez.",
      "Servez-vous en pour vérifier que la page dit vraiment ce pour quoi vous voulez vous classer, pas pour courir après un pourcentage magique. Un texte qui se lit naturellement tout en couvrant le sujet bat n'importe quel ratio fixe.",
    ],
    steps: [
      "Collez le texte de la page ou un brouillon dans la zone d'entrée.",
      "Choisissez la langue du contenu et l'exclusion éventuelle des mots vides.",
      "Lisez comptages et densité pour les expressions de 1 à 3 mots, ou cherchez pour contrôler un terme précis.",
    ],
    faqs: [
      {
        q: "Quelle densité de mots-clés viser ?",
        a: "Aucune cible. Les systèmes de classement modernes utilisent des embeddings et des modèles de sujet, pas des seuils de densité. Si les expressions dominantes reflètent le sujet de la page en langage naturel — environ 1 à 2 % pour le terme principal — vous êtes bon.",
      },
      {
        q: "Les mots vides sont-ils retirés avant comptage ?",
        a: "Seulement si vous l'activez. Les retirer transforme « hôtel à londres » en « hôtel londres » comme bigramme — souvent la façon dont on cherche réellement. Comparez les deux vues avant de trancher.",
      },
      {
        q: "Comment le chinois et le japonais sont-ils comptés ?",
        a: "Sans vrai segmenteur, le texte CJK est compté caractère par caractère pour les tokens simples et par paire de caractères pour les expressions de deux mots — une bonne approximation pour repérer les termes surexploités, pas une analyse linguistique.",
      },
    ],
  },
  "meta-tag-generator": {
    name: "Générateur de balises meta",
    tagline:
      "Générez les balises meta title, description, keywords, robots et viewport avec une sortie HTML en direct à coller directement dans votre <head>.",
    intro: [
      "Les balises meta sont la première chose que les crawlers lisent : la balise title est un signal de classement, et la méta description devient votre extrait chaque fois que Google ne la réécrit pas. Ce générateur construit un jeu propre et valide — title, description, keywords, robots, viewport, author plus un lien canonique facultatif — pendant que vous tapez.",
      "Chaque valeur d'attribut est échappée HTML : guillemets et esperluettes ne peuvent pas casser votre balisage. Copiez le bloc dans la section head de votre gabarit ou CMS et ajustez-le page par page.",
    ],
    steps: [
      "Remplissez le titre de la page (visez 50 à 60 caractères) et la méta description (jusqu'à ~160).",
      "Réglez robots, viewport et author au besoin — les champs laissés vides sont omis de la sortie.",
      "Copiez l'extrait <head> généré et collez-le dans votre gabarit de page.",
    ],
    faqs: [
      {
        q: "Quelle longueur pour une balise title ?",
        a: "Visez environ 50 à 60 caractères, à peu près 580 pixels à la taille de police que Google rend. Les titres plus longs sont coupés avec une ellipse dans les résultats — l'outil d'aperçu SERP montre exactement où tombe la coupe.",
      },
      {
        q: "Les méta keywords servent-ils encore ?",
        a: "Google ignore la balise meta keywords depuis 2009, et Bing peut la traiter comme un signal de spam. Ne la remplissez que si un moteur de niche ou une plateforme de recherche interne l'exige explicitement.",
      },
      {
        q: "Que contrôle la balise meta robots ?",
        a: "index/noindex décide si la page peut apparaître dans les résultats ; follow/nofollow si ses liens transmettent de l'équité. Elle doit se trouver sur la page elle-même — robots.txt ne peut noindexer quoi que ce soit.",
      },
    ],
  },
  "open-graph-generator": {
    name: "Générateur Open Graph",
    tagline:
      "Construisez le jeu complet de balises meta og: et twitter: et regardez l'aperçu de la carte de partage se mettre à jour en direct avant de coller quoi que ce soit.",
    intro: [
      "Quand votre lien est partagé sur X, Facebook, LinkedIn, Slack ou iMessage, la carte d'aperçu est construite presque entièrement à partir des balises Open Graph, les balises Twitter card comblant les manques. Ce générateur produit les deux espaces de noms : og:title, og:type, og:url, og:image, og:image:alt, og:site_name, og:description et og:locale, plus twitter:card, twitter:site et twitter:creator.",
      "La plupart des plateformes retombent sur les balises og: quand une balise twitter: manque : les extras ne sont nécessaires que là où ils diffèrent. L'aperçu en direct approche le rendu d'une carte grande image ou résumé.",
    ],
    steps: [
      "Saisissez le titre, la description et l'URL canonique de la page.",
      "Ajoutez l'URL de l'image de partage (1200 × 630 px fonctionne partout) et réglez le type de carte.",
      "Copiez les balises dans votre <head> et contrôlez la carte d'aperçu.",
    ],
    faqs: [
      {
        q: "Quelle taille d'image pour og:image ?",
        a: "1200 × 630 pixels (1,91:1) est le réglage sûr sur Facebook, X et LinkedIn. Gardez le fichier sous 8 Mo, utilisez une URL absolue et ajoutez toujours og:image:alt pour l'accessibilité.",
      },
      {
        q: "Faut-il à la fois les balises og: et twitter: ?",
        a: "twitter:title, twitter:description et twitter:image retombent sur leurs équivalents og:. Au-dessus du jeu og:, il ne vous faut que twitter:card (summary ou summary_large_image), twitter:site et éventuellement twitter:creator.",
      },
      {
        q: "Quel og:type choisir ?",
        a: "website pour les pages d'accueil et pages génériques, article pour les actualités et billets de blog (ajoutez article:published_time si possible), et product pour les fiches e-commerce. Le type change la façon dont certaines plateformes catégorisent le lien.",
      },
    ],
  },
  "robots-txt-generator": {
    name: "Générateur de robots.txt",
    tagline:
      "Construisez un robots.txt avec listes de blocage ou d'autorisation des robots d'IA, règles par bot, crawl-delay et directive sitemap — puis copiez ou téléchargez.",
    intro: [
      "robots.txt contrôle l'accès des crawlers avant même que la page soit récupérée. Au-delà des règles classiques User-agent: *, vous décidez maintenant bot par bot : autoriser les crawlers proches de la recherche comme OAI-SearchBot et PerplexityBot, bloquer les crawlers d'entraînement comme GPTBot, ClaudeBot, Google-Extended, CCBot et Bytespider, ou mélanger votre propre politique.",
      "Le générateur regroupe les user-agents partageant une règle, ajoute crawl-delay là où il est respecté, et ajoute votre directive sitemap. Copiez le fichier à la racine de votre domaine en /robots.txt et vérifiez-le dans le rapport robots de Search Console.",
    ],
    steps: [
      "Choisissez un préréglage : tout autoriser, bloquer les bots d'entraînement IA ou tout bloquer.",
      "Ajustez chaque crawler d'IA avec Autoriser, Bloquer ou aucune règle, et ajoutez des chemins Disallow pour User-agent: *.",
      "Ajoutez l'URL de votre sitemap, puis copiez ou téléchargez le fichier à la racine du site.",
    ],
    faqs: [
      {
        q: "robots.txt est-il un contrôle de sécurité ?",
        a: "Non. Il est indicatif : les crawlers respectueux lui obéissent, mais n'importe qui peut le lire — et il publicise vos chemins privés. Protégez les zones sensibles par authentification ; ne comptez jamais sur Disallow pour la sécurité.",
      },
      {
        q: "Les crawlers d'IA respectent-ils vraiment robots.txt ?",
        a: "Les principaux documentés — GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot — déclarent le prendre en charge, mais le respect est volontaire et varie selon les opérateurs. Pour des garanties fermes, bloquez au niveau du CDN ou du pare-feu.",
      },
      {
        q: "Pourquoi ma page reste-t-elle indexée après un Disallow ?",
        a: "Bloquer l'exploration n'est pas bloquer l'indexation : si d'autres pages font un lien vers l'URL, Google peut l'indexer quand même, sans son contenu. Pour retirer une page des résultats, permettez l'exploration et utilisez plutôt une balise meta noindex.",
      },
    ],
  },
  "schema-markup-generator": {
    name: "Générateur de balisage schema",
    tagline:
      "Générez des données structurées JSON-LD valides pour Organization, LocalBusiness, Product, Article, FAQPage et HowTo — échappées et prêtes à coller.",
    intro: [
      "Les données structurées aident les moteurs à comprendre les entités d'une page : qui la publie, ce que coûte le produit, à quelles questions elle répond. Ce générateur construit du JSON-LD pour six des types schema.org les plus utilisés, omet les champs vides et échappe la sortie pour qu'elle soit sûre dans une balise <script>.",
      "Choisissez le type correspondant à la page, remplissez les champs et collez le bloc dans le head ou le body. Passez-le toujours dans un validateur de résultats enrichis avant déploiement — un balisage qui s'analyse mais viole les consignes peut valoir une action manuelle.",
    ],
    steps: [
      "Choisissez le type de schéma correspondant à la page.",
      "Remplissez les champs — pour FAQPage et HowTo, vous pouvez ajouter et retirer des lignes de question ou d'étape.",
      "Copiez le bloc JSON-LD dans la page, puis passez-le dans le Rich Results Test de Google.",
    ],
    faqs: [
      {
        q: "Les résultats enrichis FAQ existent-ils encore ?",
        a: "Google n'affiche presque plus de résultats enrichis FAQ que pour les sites gouvernementaux et de santé connus. Le balisage vaut toujours d'être publié : les moteurs de réponse et les AI Overviews lisent les données FAQPage pour sourcer leurs réponses, et d'autres moteurs le respectent toujours.",
      },
      {
        q: "JSON-LD ou Microdata — quel format ?",
        a: "JSON-LD est le format recommandé par Google : un seul bloc script, aucun changement de vos éléments HTML, plus facile à générer et entretenir. La Microdata atteint le même résultat mais s'entremêle avec votre balisage.",
      },
      {
        q: "Des données structurées valides garantissent-elles des résultats enrichis ?",
        a: "Non. La validité rend la page éligible à une fonctionnalité ; Google décide requête par requête et surface par surface de l'afficher. Ne promettez jamais d'étoiles ou de fils d'Ariane dans vos rapports sur la foi du balisage seul.",
      },
    ],
  },
  "serp-preview": {
    name: "Aperçu SERP",
    tagline:
      "Prévisualisez votre extrait Google sur ordinateur et mobile avec une troncature au pixel près et des jauges de longueur pour le titre et la description.",
    intro: [
      "Google tronque titres et descriptions selon la largeur mesurée en pixels, pas le nombre de caractères — un titre plein de lettres larges est coupé plus tôt qu'un autre de même longueur en lettres étroites. Cet aperçu mesure votre texte comme la page de résultats et le coupe exactement là où Google le couperait.",
      "Basculez entre budgets en pixels ordinateur et mobile, surveillez les jauges et ajustez le texte jusqu'à ce que tout le message survive à la coupe.",
    ],
    steps: [
      "Saisissez la balise title, la méta description et l'URL de la page.",
      "Basculez entre ordinateur et mobile pour comparer les points de troncature.",
      "Ajustez le texte jusqu'à ce que titre et description tiennent dans le budget en pixels.",
    ],
    faqs: [
      {
        q: "Jusqu'où un titre peut-il aller avant que Google le coupe ?",
        a: "Environ 580 à 600 pixels sur ordinateur, typiquement 50 à 60 caractères ; le mobile accepte un peu plus de largeur. La mesure en pixels est la vraie limite — le nombre de caractères n'est qu'un guide approximatif, les lettres n'ayant pas la même largeur.",
      },
      {
        q: "Google affichera-t-il toujours ma méta description ?",
        a: "Non. Google réécrit les descriptions pour une bonne part des requêtes, le plus souvent pour coller aux termes cherchés. Une description précise et spécifique augmente vos chances d'être repris mot pour mot.",
      },
      {
        q: "Pourquoi Google remplacerait-il mon titre ?",
        a: "Quand il juge qu'une autre chaîne colle mieux à la requête, Google peut substituer le H1, le texte d'ancrage de liens internes ou le nom du site. L'aperçu montre le meilleur cas : vos propres balises, non modifiées.",
      },
    ],
  },
  "sitemap-generator": {
    name: "Générateur de sitemap XML",
    tagline:
      "Collez une liste d'URLs et obtenez un sitemap.xml valide avec lastmod, changefreq et priorité par section — dédupliqué et prêt à soumettre.",
    intro: [
      "Un sitemap dit aux moteurs quelles URLs existent et quand elles ont changé pour la dernière fois. Collez votre liste — export d'un crawler, CMS ou tableur — et le générateur déduplique les entrées, les groupe par premier segment de chemin et vous laisse régler changefreq et priorité par groupe tout en gardant le fichier conforme au protocole.",
      "Le XML suit le protocole 0.9 de sitemaps.org qu'acceptent Google, Bing et Yandex. Téléchargez le fichier, hébergez-le en /sitemap.xml et référencez-le depuis robots.txt ou soumettez-le directement dans Search Console.",
    ],
    steps: [
      "Collez une URL absolue par ligne — dans la limite de 50 000 URLs / 50 Mo par fichier.",
      "Réglez la gestion de lastmod et ajustez changefreq et priorité par section là où c'est pertinent.",
      "Téléchargez sitemap.xml, déposez-le à la racine du domaine et soumettez-le dans Search Console.",
    ],
    faqs: [
      {
        q: "changefreq et priority comptent-ils encore ?",
        a: "Google ignore les deux et suit sa propre planification ; lastmod est la seule balise à effet documenté, et encore seulement quand elle est exacte. Réglez les autres si vous voulez un fichier complet, mais dépensez l'effort sur des lastmod véridiques.",
      },
      {
        q: "Quelle valeur lastmod utiliser ?",
        a: "La date du dernier changement significatif du contenu de la page, au format W3C Datetime (YYYY-MM-DD convient). Recopier la date du jour sur chaque URL apprend à Google à se méfier de vos lastmod.",
      },
      {
        q: "Quelle taille peut atteindre un sitemap ?",
        a: "50 000 URLs ou 50 Mo non compressés par fichier. Au-delà, scindez en plusieurs sitemaps et listez-les dans un fichier d'index de sitemaps, puis soumettez l'index.",
      },
    ],
  },
  "utm-builder": {
    name: "Constructeur de liens UTM",
    tagline:
      "Ajoutez utm_source, medium, campaign, term et content à n'importe quelle URL et obtenez un lien de suivi correctement encodé, prêt à copier ou partager.",
    intro: [
      "Les paramètres UTM sont les chaînes de requête que les plateformes d'analytique lisent pour attribuer le trafic : source, medium, campaign, term et content. Ce constructeur les ajoute à votre URL avec un encodage en pourcentage correct : espaces et caractères spéciaux survivent au voyage à travers régies publicitaires, codes QR et clients de messagerie.",
      "Convenez de conventions de nommage avant de construire vos liens — minuscules, tirets, pas de dates dans les noms de campagne — sinon vos rapports se fragmenteront en campagnes quasi identiques.",
    ],
    steps: [
      "Collez l'URL de destination.",
      "Remplissez d'abord source et medium, puis campaign et les champs facultatifs term/content.",
      "Copiez l'URL balisée dans votre publicité, newsletter ou post social.",
    ],
    faqs: [
      {
        q: "Quels paramètres UTM sont obligatoires ?",
        a: "utm_source et utm_medium sont ceux dont les outils d'analytique dépendent : la source nomme le référent, le medium le canal (cpc, email, social). utm_campaign est fortement recommandé ; utm_id, utm_term et utm_content sont facultatifs.",
      },
      {
        q: "Les paramètres UTM nuisent-ils au SEO ?",
        a: "Pas s'ils sont bien gérés. Les crawlers peuvent traiter les URLs balisées comme des doublons — exactement ce que règle une canonique auto-référente : c'est pourquoi le générateur de canonique se marie bien avec cet outil.",
      },
      {
        q: "La casse des valeurs UTM est-elle significative ?",
        a: "Oui — utm_campaign=Spring et utm_campaign=spring comptent comme deux campagnes dans la plupart des outils d'analytique. Standardisez en minuscules et vos rapports restent propres.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* Sécurité                                                            */
  /* ------------------------------------------------------------------ */
  "dns-lookup": {
    name: "Recherche DNS",
    tagline:
      "Consultez les enregistrements A, AAAA, MX, TXT, NS et CNAME de n'importe quel domaine via DNS-over-HTTPS dans un tableau clair — sans terminal ni commandes dig.",
    intro: [
      "Les enregistrements DNS disent où un domaine pointe, comment il envoie ses e-mails et comment il prouve sa propriété. Cet outil résout n'importe quel type d'enregistrement via DNS-over-HTTPS (DoH) — le canal chiffré qu'utilisent les navigateurs modernes — et présente les réponses dans un tableau lisible.",
      "Il s'appuie sur le résolveur public gratuit de Google : rien à installer, aucune clé d'API. Pratique pour vérifier la propagation après un changement, contrôler les enregistrements TXT SPF/DKIM/DMARC ou comprendre pourquoi le courrier vers un domaine rebondit.",
    ],
    steps: [
      "Tapez le domaine (example.com, sans http://) et choisissez un type d'enregistrement.",
      "Appuyez sur Rechercher ; la requête part en DoH chiffré vers le résolveur public.",
      "Lisez le tableau : chaque ligne montre le type, le TTL et la valeur — une IP pour A/AAAA, ou un serveur de messagerie avec priorité pour MX.",
      "Changez de type d'enregistrement pour tout voir : MX pour le courrier, TXT pour SPF/DKIM, NS pour qui tient le DNS.",
    ],
    faqs: [
      {
        q: "À quoi servent les principaux types d'enregistrements ?",
        a: "A relie un nom à une adresse IPv4, AAAA à IPv6. MX liste les serveurs de messagerie et leurs priorités. TXT porte du texte libre — généralement les politiques SPF, DKIM et DMARC. NS nomme les serveurs de noms faisant autorité. CNAME est un alias qui pointe un nom vers un autre. Chacun répond à une question différente sur le même domaine.",
      },
      {
        q: "Qu'est-ce qui est envoyé sur le réseau ?",
        a: "Le nom de domaine et le type d'enregistrement, dans une requête DNS-over-HTTPS vers dns.google, chiffrée comme n'importe quelle requête HTTPS. Rien sur vous n'est ajouté, et aucune clé d'API ni compte n'intervient.",
      },
      {
        q: "Pourquoi vois-je parfois des lignes CNAME alors que j'ai demandé A ?",
        a: "Les résolveurs incluent la chaîne complète : si www.example.com est un CNAME vers example.com, une requête A renvoie l'alias plus l'enregistrement A final. Les lignes supplémentaires vous montrent exactement comment le nom se résout.",
      },
    ],
  },
  "email-validator": {
    name: "Validateur d'e-mail",
    tagline:
      "Contrôlez le format d'un e-mail localement et vérifiez que son domaine peut recevoir du courrier avec une recherche MX en direct, plus la détection de coquilles — gratuit, instantané, sans inscription.",
    intro: [
      "Une adresse syntaxiquement valide peut quand même rebondir si son domaine n'a pas de serveurs de messagerie. Ce validateur contrôle d'abord le format entièrement dans votre navigateur — longueur, caractères, position des points et étiquettes de domaine — puis interroge le DNS en direct par HTTPS pour voir si le domaine publie vraiment des enregistrements MX (mail exchange).",
      "Il compare aussi le domaine à une liste des fournisseurs les plus courants et signale les coquilles probables comme gmial.com. Seule la partie domaine traverse le réseau ; ce qui précède le @ ne quitte jamais votre navigateur.",
    ],
    steps: [
      "Tapez ou collez l'adresse dans le champ et appuyez sur Valider.",
      "Lisez la ligne Syntaxe : elle attrape les parties locales malformées, les points doublés et les domaines invalides sans aucun appel réseau.",
      "Contrôlez la ligne Serveurs de messagerie pour la preuve que le domaine peut recevoir des e-mails — quelques domaines sans MX acceptent quand même le courrier via un enregistrement A, et l'outil le signale.",
      "Si une coquille est suggérée, corrigez le domaine et validez à nouveau.",
    ],
    faqs: [
      {
        q: "Cela vérifie-t-il que la boîte existe réellement ?",
        a: "Non. Les serveurs de messagerie ne révèlent généralement pas si une boîte précise est réelle (et les sonder serait intrusif). Cet outil vérifie le format et que le domaine est configuré pour recevoir du courrier — ce dont la plupart des flux de vérification ont besoin. Une boîte pleine ou abandonnée peut toujours rebondir.",
      },
      {
        q: "Qu'est-ce qui est envoyé exactement sur le réseau ?",
        a: "Seul le domaine — la partie après le @ — dans une requête DNS vers le résolveur public de Google (dns.google) par HTTPS. L'adresse complète et tout ce qui précède le @ restent dans votre navigateur.",
      },
      {
        q: "Pourquoi une adresse valide a-t-elle échoué au contrôle MX ?",
        a: "Quelques domaines ne publient aucun enregistrement MX et s'appuient sur leur enregistrement A (routage implicite) ; l'outil vous le signale. D'autres publient un MX nul qui dit explicitement « pas de courrier ici ». Les domaines d'entreprise ou tout neufs peuvent aussi manquer un moment des caches du résolveur public — réessayez dans une minute.",
      },
    ],
  },
  "ip-lookup": {
    name: "Recherche d'IP",
    tagline:
      "Trouvez le pays, la ville, le FAI et l'ASN de n'importe quelle adresse IP en quelques secondes — ou contrôlez la vôtre — avec une API gratuite sans clé, dans votre navigateur.",
    intro: [
      "Chaque appareil d'Internet porte une adresse IP qui trahit où il se trouve et qui le route. Saisissez n'importe quelle adresse IPv4 ou IPv6 pour voir son pays et sa région, sa ville, son opérateur (FAI), son organisation et son numéro de système autonome (ASN), plus le fuseau horaire et des coordonnées approximatives.",
      "Les données viennent de la base ipwho.is, gratuite et sans clé, par HTTPS ; pas d'inscription, pas de quota à surveiller. Un geste contrôle votre propre connexion — pratique pour confirmer qu'un VPN a vraiment changé votre localisation visible.",
    ],
    steps: [
      "Collez une IP dans le champ, ou appuyez sur Utiliser mon IP pour inspecter votre propre connexion.",
      "Appuyez sur Rechercher ; l'adresse est envoyée à l'API ipwho.is par HTTPS.",
      "Lisez les résultats : la localisation d'abord, puis les détails réseau comme FAI, organisation et ASN.",
      "Comparez les résultats de votre propre IP avant et après avoir changé de serveur VPN pour confirmer que le changement a pris effet.",
    ],
    faqs: [
      {
        q: "Quelle est la précision de la localisation ?",
        a: "Pays et région sont généralement justes ; ville et coordonnées sont des estimations fondées sur l'endroit où le FAI enregistre le bloc d'adresses — les adresses mobiles et VPN peuvent être décalées de nombreux kilomètres. Traitez les résultats comme une information réseau, pas l'adresse d'une personne.",
      },
      {
        q: "Que m'apprend l'ASN ?",
        a: "Un numéro de système autonome identifie l'opérateur réseau qui possède le bloc d'IP — le FAI, un hébergeur ou une grande entreprise. Deux IP du même ASN appartiennent presque sûrement au même réseau, ce qui sert à repérer des plages d'hébergement et des rapports d'abus.",
      },
      {
        q: "Qu'est-ce qui est envoyé sur le réseau ?",
        a: "Seule l'IP que vous voulez consulter, dans une requête HTTPS vers ipwho.is. Consulter votre propre IP révèle forcément votre adresse à cette API — la même que verrait n'importe quel service de géolocalisation.",
      },
    ],
  },
  "password-generator": {
    name: "Générateur de mots de passe",
    tagline:
      "Générez mots de passe et phrases secrètes solides dans votre navigateur avec une estimation d'entropie en direct — aléa de qualité cryptographique, rien n'est envoyé ni stocké.",
    intro: [
      "Les mots de passe faibles et réutilisés causent la plupart des prises de contrôle de comptes. Ce générateur crée des mots de passe avec le générateur aléatoire cryptographique de votre navigateur (crypto.getRandomValues) — la même source que pour les clés de chiffrement : chaque caractère est donc uniformément aléatoire et impossible à prévoir.",
      "Choisissez un mot de passe aléatoire classique ou une phrase secrète mémorable bâtie sur une liste de 256 mots, réglez la longueur et les jeux de caractères, et surveillez l'entropie en bits. Tout tourne en local : le mot de passe n'est jamais transmis, journalisé ni stocké.",
    ],
    steps: [
      "Choisissez Password pour des caractères aléatoires ou Passphrase pour des mots faciles à taper.",
      "Ajustez le curseur de longueur et activez les jeux de caractères ; excluez les caractères ressemblants si vous lisez le mot de passe à voix haute ou le tapez sur téléphone.",
      "Vérifiez l'indicateur d'entropie — 80 bits ou plus, c'est excellent pour n'importe quel compte.",
      "Cliquez sur le bouton copier et collez le résultat directement dans le formulaire d'inscription ou de changement de mot de passe.",
    ],
    faqs: [
      {
        q: "Qu'importe le plus : longueur ou complexité du mot de passe ?",
        a: "La longueur. L'entropie croît à chaque caractère supplémentaire — environ log2 de la taille du pool par caractère. Un mot de passe aléatoire de 16 caractères sur un pool de 70 compte environ 98 bits d'entropie, bien plus qu'un mot de passe court bourré de tous les types de symboles. Une phrase secrète de 5 mots aléatoires ou plus bat aussi la plupart des mots de passe de 8 caractères.",
      },
      {
        q: "Ces mots de passe sont-ils vraiment aléatoires ?",
        a: "Oui. Ils viennent de crypto.getRandomValues, la source aléatoire cryptographiquement sûre de votre navigateur — pas de Math.random(). L'option d'exclusion des ressemblants ne retire que les caractères qui se ressemblent comme l, I, 1, O et 0 ; elle n'affaiblit jamais l'aléa du reste.",
      },
      {
        q: "Pouvez-vous récupérer un mot de passe généré ici ?",
        a: "Non. La génération se fait entièrement dans la mémoire de votre navigateur. Rien n'est envoyé, journalisé ni stocké — rechargez la page et le mot de passe est perdu pour toujours : enregistrez-le immédiatement dans un gestionnaire de mots de passe.",
      },
    ],
  },
  "password-strength": {
    name: "Testeur de solidité de mot de passe",
    tagline:
      "Voyez la vraie solidité d'un mot de passe : score zxcvbn, estimations de temps de craquage réalistes et correctifs concrets — tout calculé localement, jamais envoyé.",
    intro: [
      "La plupart des jauges se contentent de compter des classes de caractères. Ce testeur exécute l'algorithme zxcvbn — bâti sur de vraies données de fuites et l'analyse de motifs — qui attrape les promenades de clavier, fragments répétés, dates, substitutions l33t et mots de passe présents dans les fuites connues.",
      "Vous obtenez un score de 0 à 4, des temps de craquage estimés sous trois scénarios d'attaque et des suggestions précises. Tout est calculé dans votre navigateur : le mot de passe tapé ne quitte jamais votre appareil.",
    ],
    steps: [
      "Tapez ou collez le mot de passe dans la zone — utilisez Afficher si vous voulez le lire.",
      "Regardez la jauge de score aller de Très faible à Très solide pendant vos modifications.",
      "Lisez le tableau des temps de craquage pour comprendre ce qu'il encaisse : essais en ligne limités, attaques hors ligne contre hachages lents et hors ligne contre hachages rapides.",
      "Appliquez les suggestions — ajouter deux mots aléatoires est souvent le gain le plus rapide.",
    ],
    faqs: [
      {
        q: "Que signifient les trois scénarios de temps de craquage ?",
        a: "Ils modélisent des attaquants différents. En ligne, limité (100 essais/heure) : un formulaire de connexion qui borne les tentatives. Hors ligne, hachage lent : une base hachée avec bcrypt, craquée à 10 000 essais par seconde. Hors ligne, hachage rapide : des hachages MD5/SHA-1 faibles ou non salés, craqués sur GPU à des milliards d'essais par seconde — le pire cas pour tout mot de passe réutilisé.",
      },
      {
        q: "Pourquoi « Tr0ub4dor&3 » obtient-il un mauvais score alors qu'il paraît complexe ?",
        a: "Parce que les substitutions comme 0 pour o et 3 pour e sont la première chose que les dictionnaires de craquage essaient. zxcvbn modélise ces règles l33t et note le motif sous-jacent — « troubador » plus décorations — sans se laisser berner par les symboles.",
      },
      {
        q: "Mon mot de passe est-il envoyé quelque part ?",
        a: "Non. Les bibliothèques et dictionnaires zxcvbn se chargent dans votre navigateur et chaque calcul tourne localement. Aucune requête réseau ne porte votre saisie.",
      },
    ],
  },
  "random-number": {
    name: "Générateur de nombres aléatoires",
    tagline:
      "Générez des nombres vraiment aléatoires dans n'importe quelle plage — à l'unité, par lots, tirages uniques façon loto — avec le RNG cryptographique de votre navigateur.",
    intro: [
      "Math.random() convient aux jeux mais est biaisé et prévisible. Ce générateur puise dans crypto.getRandomValues, la source aléatoire cryptographique du navigateur, avec un échantillonnage par rejet qui élimine le biais de modulo — chaque nombre de la plage a la même probabilité.",
      "Tirez un nombre entre deux bornes, tout un lot, ou des tirages uniques pour tombolas et concours ; triez les résultats par ordre croissant ou conservez l'ordre du tirage. L'outil affiche aussi l'entropie totale du tirage en bits, de quoi prouver qu'un concours était équitable.",
    ],
    steps: [
      "Réglez le minimum et le maximum (tous deux inclus, négatifs bienvenus).",
      "Choisissez combien de nombres il vous faut et activez les tirages uniques si les répétitions ruinent la tombola.",
      "Activez le tri croissant pour des résultats ordonnés, ou laissez désactivé pour garder l'ordre du tirage.",
      "Copiez la liste directement dans votre tableur ou votre annonce de tombola.",
    ],
    faqs: [
      {
        q: "Est-ce adapté aux concours et loteries ?",
        a: "Oui. Les nombres viennent du RNG cryptographique du navigateur avec une étape d'échantillonnage par rejet sans biais : chaque valeur de la plage a la même probabilité. L'indicateur d'entropie montre exactement l'aléa engagé dans le tirage.",
      },
      {
        q: "Que fait « sans doublons » quand la plage est petite ?",
        a: "Il passe au tirage sans remise — comme des boules numérotées sorties d'une urne. Si vous demandez plus de nombres uniques que la plage n'en contient, l'outil explique le conflit au lieu de renvoyer un résultat biaisé.",
      },
      {
        q: "Les nombres sont-ils enregistrés quelque part ?",
        a: "Non. Tout est calculé dans la mémoire de votre navigateur à partir de crypto.getRandomValues ; recharger la page efface les résultats, et rien n'est jamais envoyé.",
      },
    ],
  },
  "totp-generator": {
    name: "Générateur TOTP",
    tagline:
      "Générez des codes 2FA hors ligne depuis n'importe quel secret TOTP — RFC 6238, 6 ou 8 chiffres, compte à rebours de 30 secondes en direct. Votre secret ne quitte jamais le navigateur.",
    intro: [
      "Les codes d'authentification n'exigent pas une application sur votre téléphone. Collez un secret base32 (ou un lien otpauth:// entier de votre ancien authentificateur) et cet outil calcule les mêmes codes tournants à 6 ou 8 chiffres que n'importe quel authentificateur RFC 6238, avec un compte à rebours vers le prochain code.",
      "Tout est calculé localement avec le HMAC de WebCrypto — aucun appel réseau. Le secret ne reste qu'en mémoire du navigateur : un téléphone perdu ne signifie plus un second facteur perdu.",
    ],
    steps: [
      "Copiez le secret base32 depuis la page de configuration 2FA du service (ou collez son lien otpauth://).",
      "Alignez les réglages que le service montre : 6 ou 8 chiffres, période de 30 ou 60 secondes, SHA-1 sauf indication contraire.",
      "Tapez le code courant dans le service avant la fin du compte à rebours — ou copiez-le d'un clic.",
      "Gardez l'onglet ouvert pour des connexions répétées ; les codes se rafraîchissent automatiquement à chaque période.",
    ],
    faqs: [
      {
        q: "Un authentificateur hors ligne est-il plus sûr que les codes SMS ?",
        a: "Oui, à deux titres. Les codes TOTP sont calculés sur votre appareil et ne circulent jamais sur le réseau mobile : rien à intercepter pour un attaquant par échange de SIM. Ils expirent aussi toutes les 30 secondes et exigent la possession du secret lui-même, qui n'apparaît dans aucun message.",
      },
      {
        q: "Où mon secret est-il stocké ?",
        a: "Nulle part. Il est gardé dans une variable de la mémoire de cet onglet et utilisé par WebCrypto pour signer des compteurs de temps. Rien n'est écrit dans localStorage, les cookies ou un serveur — fermez l'onglet et il disparaît.",
      },
      {
        q: "Pourquoi mon code ne correspond-il pas ?",
        a: "Les causes les plus courantes : mauvais algorithme (la plupart des services utilisent SHA-1), mauvaise période, ou horloge de l'appareil décalée de plus de quelques secondes. Contrôlez les trois sélecteurs face à la page de configuration du service, et resynchronisez l'horloge du système.",
      },
    ],
  },
  "whois-lookup": {
    name: "Recherche WHOIS",
    tagline:
      "Consultez les données d'enregistrement d'un domaine via RDAP — registrar, dates de création et d'expiration, codes de statut et serveurs de noms — avec des notes claires sur la couverture des TLD.",
    intro: [
      "Les enregistrements répondent aux questions que la vitrine d'un domaine cache : qui le gère, quand il a été créé et quand il expire. Cet outil interroge le protocole RDAP moderne — successeur officiel du WHOIS sur port 43 — par HTTPS et range la réponse en dates, registrar, codes de statut et serveurs de noms.",
      "rdap.org route votre requête vers le serveur RDAP officiel du registre. La couverture est large mais pas universelle : la plupart des registres de codes pays (.cn, .de, .br…) manquent encore de serveurs RDAP publics, et l'outil vous le dit franchement quand un TLD n'est pas couvert au lieu d'afficher des champs vides.",
    ],
    steps: [
      "Saisissez le domaine que vous étudiez (example.com) et appuyez sur Rechercher.",
      "Lisez d'abord les dates : création et expiration révèlent l'âge du domaine et ses habitudes de renouvellement.",
      "Contrôlez le registrar et les codes de statut — clientTransferProhibited signifie verrouillé contre le transfert, redemptionPeriod laisse penser que le domaine pourrait bientôt tomber.",
      "Parcourez les serveurs de noms pour voir qui exploite réellement le DNS du domaine.",
    ],
    faqs: [
      {
        q: "Pourquoi RDAP plutôt que le WHOIS classique ?",
        a: "RDAP renvoie du JSON structuré par HTTPS au lieu de texte non structuré sur un port archaïque. Il gère l'authentification, la limitation de débit et les domaines internationalisés, et l'ICANN l'exige pour tous les registres gTLD. Cet outil suit les redirections de rdap.org vers le registre qui tient le TLD.",
      },
      {
        q: "Pourquoi certains TLD échouent-ils avec « non couvert » ?",
        a: "Chaque registre choisit d'exploiter ou non un service RDAP public. Presque tous les TLD génériques (.com, .net, .app…) le font, mais beaucoup de codes pays — .cn, .de, .br, entre autres — pas encore. Quand rdap.org ne trouve pas de serveur pour un TLD, l'outil affiche une explication claire plutôt qu'un résultat vide.",
      },
      {
        q: "Qu'est-ce qui est envoyé sur le réseau ?",
        a: "Le nom de domaine seulement, dans une requête HTTPS vers rdap.org, qui peut rediriger vers le point de terminaison RDAP officiel du registre. Les données d'enregistrement sont publiques par conception ; rien de personnel sur vous n'est transmis.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* Unités                                                              */
  /* ------------------------------------------------------------------ */
  "area-converter": {
    name: "Convertisseur de surface",
    tagline:
      "Mètres carrés, pieds carrés, acres, hectares et plus — pour l'immobilier, le foncier et les revêtements de sol.",
    intro: [
      "Convertissez les unités de terrain et de surface entre systèmes : mètres carrés, pieds carrés, acres, hectares et miles carrés, tous affichés d'un coup pour n'importe quelle valeur saisie.",
      "Usages typiques : comparer des annonces immobilières de pays différents, planter jardins et fermes, estimer un revêtement de sol ou une couche de peinture.",
      "Il gère 9 unités — kilomètre carré, hectare, mètre carré, centimètre carré, mile carré, acre et plus. Tout est calculé dans votre navigateur, fonctionne hors ligne, et vos données ne touchent jamais un serveur.",
    ],
    steps: [
      "Saisissez la valeur à convertir.",
      "Choisissez l'unité de départ et l'unité d'arrivée.",
      "Le résultat se met à jour pendant la saisie — le tableau en dessous affiche toutes les unités d'un coup, ou copiez le résultat.",
    ],
    faqs: [
      {
        q: "Quelle est la taille d'un acre en mètres carrés ?",
        a: "Un acre = 4 046,86 m², soit environ 43 560 pieds carrés. Un hectare vaut 2,471 acres.",
      },
      {
        q: "Ce convertisseur est-il gratuit ?",
        a: "Oui — il tourne entièrement dans votre navigateur. Aucune limite, aucune publicité sur les résultats, aucune inscription.",
      },
      {
        q: "Les conversions sont-elles précises ?",
        a: "Les facteurs de conversion suivent les définitions standard internationales (SI et NIST). Les résultats sont affichés avec jusqu'à 8 chiffres significatifs.",
      },
    ],
  },
  "data-converter": {
    name: "Convertisseur de taille de données",
    tagline:
      "Convertissez octets, Ko, Mo, Go et To — conventions décimale (1000) et binaire (1024) côte à côte, clairement distinguées.",
    intro: [
      "Convertissez les unités de stockage numérique avec la distinction décimal/binaire explicite : Ko signifie 1000 octets, Kio signifie 1024 octets. La plupart des confusions du type « pourquoi mon disque est plus petit qu'annoncé » viennent du mélange des deux.",
      "Utilisez-le pour vérifier des tailles de téléchargement, l'occupation disque, les specs mémoire et les plafonds de bande passante d'hébergement.",
      "Il gère 10 unités — bit, octet, kilooctet (1000 o), kibioctet (1024 o), mégaoctet (1000 Ko), mébioctet (1024 Kio) et plus. Tout est calculé dans votre navigateur, fonctionne hors ligne, et vos données ne touchent jamais un serveur.",
    ],
    steps: [
      "Saisissez la valeur à convertir.",
      "Choisissez l'unité de départ et l'unité d'arrivée.",
      "Le résultat se met à jour pendant la saisie — le tableau en dessous affiche toutes les unités d'un coup, ou copiez le résultat.",
    ],
    faqs: [
      {
        q: "Pourquoi un disque de 1 To n'affiche-t-il que ~931 Go ?",
        a: "Les fabricants utilisent les unités décimales (1 To = 1 000 000 000 000 octets) alors que les systèmes d'exploitation affichent souvent des unités binaires (1 Tio = 1 099 511 627 776 octets). 1 To = 0,909 Tio ≈ 931 Gio — rien ne manque.",
      },
      {
        q: "Ce convertisseur est-il gratuit ?",
        a: "Oui — il tourne entièrement dans votre navigateur. Aucune limite, aucune publicité sur les résultats, aucune inscription.",
      },
      {
        q: "Les conversions sont-elles précises ?",
        a: "Les facteurs de conversion suivent les définitions standard internationales (SI et NIST). Les résultats sont affichés avec jusqu'à 8 chiffres significatifs.",
      },
    ],
  },
  "energy-converter": {
    name: "Convertisseur d'énergie",
    tagline:
      "Calories, kilojoules, joules, kWh, Wh et BTU — étiquettes alimentaires, factures d'électricité et physique en un seul endroit.",
    intro: [
      "Convertissez les unités d'énergie entre contextes : calories alimentaires (kcal) face aux calories de la chimie (cal), électricité en kWh, chauffage en BTU, physique en joules.",
      "Distinction claire entre cal et kcal — la confusion derrière bien des malentendus sur les étiquettes — avec des facteurs standard exacts.",
      "Il gère 7 unités — joule, kilojoule, calorie, kilocalorie, watt-heure, kilowatt-heure, BTU et plus. Tout est calculé dans votre navigateur, fonctionne hors ligne, et vos données ne touchent jamais un serveur.",
    ],
    steps: [
      "Saisissez la valeur à convertir.",
      "Choisissez l'unité de départ et l'unité d'arrivée.",
      "Le résultat se met à jour pendant la saisie — le tableau en dessous affiche toutes les unités d'un coup, ou copiez le résultat.",
    ],
    faqs: [
      {
        q: "Une calorie, est-ce la même chose qu'une kilocalorie ?",
        a: "Non. 1 kcal = 1000 cal. Les étiquettes alimentaires qui écrivent « Calorie » (C majuscule) parlent en réalité de kilocalories. Saisissez 1 kcal → cal pour vérifier.",
      },
      {
        q: "Combien de kWh vaut 1 BTU ?",
        a: "1 BTU = 0,000293071 kWh. Un climatiseur de 10 000 BTU fonctionnant une heure consomme environ 2,93 kWh.",
      },
      {
        q: "Les conversions sont-elles précises ?",
        a: "Les facteurs de conversion suivent les définitions standard internationales (SI et NIST). Les résultats sont affichés avec jusqu'à 8 chiffres significatifs.",
      },
    ],
  },
  "length-converter": {
    name: "Convertisseur de longueur",
    tagline:
      "Convertissez longueurs et distances instantanément : mètres, pieds, pouces, miles, centimètres et plus — directement dans votre navigateur.",
    intro: [
      "Convertissez entre unités de longueur métriques et impériales sans taper dans une boîte de recherche. Saisissez n'importe quelle valeur et voyez mètres, pieds, pouces, miles et toutes les autres unités d'un coup.",
      "Utile pour le bricolage, la préparation de voyages, les dessins techniques et les devoirs d'école — partout où une conversion rapide et exacte vaut mieux qu'une estimation.",
      "Il gère 10 unités — kilomètre, mètre, centimètre, millimètre, micromètre, mile et plus. Tout est calculé dans votre navigateur, fonctionne hors ligne, et vos données ne touchent jamais un serveur.",
    ],
    steps: [
      "Saisissez la valeur à convertir.",
      "Choisissez l'unité de départ et l'unité d'arrivée.",
      "Le résultat se met à jour pendant la saisie — le tableau en dessous affiche toutes les unités d'un coup, ou copiez le résultat.",
    ],
    faqs: [
      {
        q: "Combien de centimètres dans un pouce ?",
        a: "Un pouce vaut exactement 2,54 centimètres, par accord international depuis 1959. Saisissez 1 in → cm ci-dessus pour vérifier.",
      },
      {
        q: "Ce convertisseur est-il gratuit ?",
        a: "Oui — il tourne entièrement dans votre navigateur. Aucune limite, aucune publicité sur les résultats, aucune inscription.",
      },
      {
        q: "Les conversions sont-elles précises ?",
        a: "Les facteurs de conversion suivent les définitions standard internationales (SI et NIST). Les résultats sont affichés avec jusqu'à 8 chiffres significatifs.",
      },
    ],
  },
  "pressure-converter": {
    name: "Convertisseur de pression",
    tagline:
      "bar, psi, pascal, atmosphère, mmHg et plus — pour les pneus, la plongée, la météo et le CVC.",
    intro: [
      "Convertissez les unités de pression utilisées par différents secteurs : psi pour les manomètres de pneus, bar pour les specs européennes, pascal et kPa en ingénierie, mmHg en médecine et en météorologie.",
      "Tous les facteurs sont exacts par définition là où la norme les définit exactement (par exemple 1 atm = 101 325 Pa).",
      "Il gère 7 unités — pascal, kilopascal, mégapascal, bar, atmosphère, millimètre de mercure, psi et plus. Tout est calculé dans votre navigateur, fonctionne hors ligne, et vos données ne touchent jamais un serveur.",
    ],
    steps: [
      "Saisissez la valeur à convertir.",
      "Choisissez l'unité de départ et l'unité d'arrivée.",
      "Le résultat se met à jour pendant la saisie — le tableau en dessous affiche toutes les unités d'un coup, ou copiez le résultat.",
    ],
    faqs: [
      {
        q: "Comment convertir des psi en bar ?",
        a: "1 bar = 14,5038 psi, donc divisez les psi par 14,5038. Un pneu de voiture typique à 32 psi fait environ 2,21 bar.",
      },
      {
        q: "Ce convertisseur est-il gratuit ?",
        a: "Oui — il tourne entièrement dans votre navigateur. Aucune limite, aucune publicité sur les résultats, aucune inscription.",
      },
      {
        q: "Les conversions sont-elles précises ?",
        a: "Les facteurs de conversion suivent les définitions standard internationales (SI et NIST). Les résultats sont affichés avec jusqu'à 8 chiffres significatifs.",
      },
    ],
  },
  "speed-converter": {
    name: "Convertisseur de vitesse",
    tagline:
      "km/h, mph, nœuds, m/s et plus — convertissez allure de course, vitesse du vent et vitesse des véhicules instantanément.",
    intro: [
      "Convertissez les unités de vitesse utilisées par différents pays et sports : kilomètres par heure, miles par heure, nœuds pour la voile et l'aviation, mètres par seconde pour la physique.",
      "Utile quand vous louez une voiture à l'étranger, lisez une bulletin marin ou comparez l'allure sur tapis et en extérieur.",
      "Il gère 6 unités — mètre par seconde, kilomètre par heure, mile par heure, pied par seconde, nœud, Mach (niveau de la mer). Tout est calculé dans votre navigateur, fonctionne hors ligne, et vos données ne touchent jamais un serveur.",
    ],
    steps: [
      "Saisissez la valeur à convertir.",
      "Choisissez l'unité de départ et l'unité d'arrivée.",
      "Le résultat se met à jour pendant la saisie — le tableau en dessous affiche toutes les unités d'un coup, ou copiez le résultat.",
    ],
    faqs: [
      {
        q: "100 km/h, ça fait combien en mph ?",
        a: "100 km/h = 62,14 mph. Le facteur exact est 1 mph = 1,609344 km/h.",
      },
      {
        q: "Ce convertisseur est-il gratuit ?",
        a: "Oui — il tourne entièrement dans votre navigateur. Aucune limite, aucune publicité sur les résultats, aucune inscription.",
      },
      {
        q: "Les conversions sont-elles précises ?",
        a: "Les facteurs de conversion suivent les définitions standard internationales (SI et NIST). Les résultats sont affichés avec jusqu'à 8 chiffres significatifs.",
      },
    ],
  },
  "temperature-converter": {
    name: "Convertisseur de température",
    tagline:
      "Celsius vers Fahrenheit et Kelvin, instantanément. Résultats en direct plus points de référence de congélation et d'ébullition.",
    intro: [
      "Convertissez Celsius, Fahrenheit et Kelvin en une étape. Contrairement aux unités linéaires, les échelles de température exigent des formules avec décalage — cet outil les applique correctement, valeurs sous zéro comprises.",
      "Bon pour les recettes avec fours étrangers, les bulletins météo, le travail de laboratoire et les specs CVC.",
      "Il gère 3 unités — Celsius, Fahrenheit, Kelvin. Tout est calculé dans votre navigateur, fonctionne hors ligne, et vos données ne touchent jamais un serveur.",
    ],
    steps: [
      "Saisissez la valeur à convertir.",
      "Choisissez l'unité de départ et l'unité d'arrivée.",
      "Le résultat se met à jour pendant la saisie — le tableau en dessous affiche toutes les unités d'un coup, ou copiez le résultat.",
    ],
    faqs: [
      {
        q: "Comment convertir des Celsius en Fahrenheit ?",
        a: "Multipliez par 9, divisez par 5, puis ajoutez 32 : °F = °C × 9⁄5 + 32. Par exemple, 20 °C = 68 °F. L'outil le fait pour vous et montre aussi le Kelvin.",
      },
      {
        q: "À quelle température Fahrenheit et Celsius sont-ils égaux ?",
        a: "À −40 degrés : −40 °C = −40 °F. Saisissez −40 et changez d'unités pour le constater.",
      },
      {
        q: "Les conversions sont-elles précises ?",
        a: "Les facteurs de conversion suivent les définitions standard internationales (SI et NIST). Les résultats sont affichés avec jusqu'à 8 chiffres significatifs.",
      },
    ],
  },
  "time-converter": {
    name: "Convertisseur d'unités de temps",
    tagline:
      "Secondes, minutes, heures, jours, semaines, mois et années — avec la mise en garde mois/année expliquée.",
    intro: [
      "Convertissez des durées entre unités de temps. Comme les mois et années de calendrier varient en longueur, cet outil utilise les moyennes conventionnelles (30,44 jours par mois, 365,2425 jours par an) et le dit — pas d'arrondi silencieux.",
      "Utile pour les estimations de projets, la comparaison d'abonnements, le chronométrage scientifique et les comptes à rebours.",
      "Il gère 8 unités — milliseconde, seconde, minute, heure, jour, semaine et plus. Tout est calculé dans votre navigateur, fonctionne hors ligne, et vos données ne touchent jamais un serveur.",
    ],
    steps: [
      "Saisissez la valeur à convertir.",
      "Choisissez l'unité de départ et l'unité d'arrivée.",
      "Le résultat se met à jour pendant la saisie — le tableau en dessous affiche toutes les unités d'un coup, ou copiez le résultat.",
    ],
    faqs: [
      {
        q: "Pourquoi un mois fait-il 30,44 jours ici ?",
        a: "Un mois de calendrier va de 28 à 31 jours, le calcul de durées utilise donc la moyenne sur le cycle grégorien : 30,4369 jours. Pour une arithmétique de dates exacte, utilisez plutôt la Calculatrice de dates.",
      },
      {
        q: "Ce convertisseur est-il gratuit ?",
        a: "Oui — il tourne entièrement dans votre navigateur. Aucune limite, aucune publicité sur les résultats, aucune inscription.",
      },
      {
        q: "Les conversions sont-elles précises ?",
        a: "Les facteurs de conversion suivent les définitions standard internationales (SI et NIST). Les résultats sont affichés avec jusqu'à 8 chiffres significatifs.",
      },
    ],
  },
  "volume-converter": {
    name: "Convertisseur de volume",
    tagline:
      "Litres, gallons, cups, millilitres et mètres cubes — unités US et UK clairement étiquetées.",
    intro: [
      "Convertissez les unités de volume de cuisine et d'ingénierie avec la distinction US/UK explicitée : un gallon US fait 3,785 L, un gallon UK (impérial) fait 4,546 L — 20 % d'écart, les mélanger ruine les recettes.",
      "Conçu pour la cuisine, le brassage, le dosage d'aquarium, les chiffres de carburant et les estimations de béton.",
      "Il gère 10 unités — mètre cube, litre, millilitre, gallon US, gallon UK, quart US et plus. Tout est calculé dans votre navigateur, fonctionne hors ligne, et vos données ne touchent jamais un serveur.",
    ],
    steps: [
      "Saisissez la valeur à convertir.",
      "Choisissez l'unité de départ et l'unité d'arrivée.",
      "Le résultat se met à jour pendant la saisie — le tableau en dessous affiche toutes les unités d'un coup, ou copiez le résultat.",
    ],
    faqs: [
      {
        q: "Un gallon US, est-ce la même chose qu'un gallon UK ?",
        a: "Non. 1 gallon US = 3,785 L, 1 gallon UK = 4,546 L. Le convertisseur les liste séparément pour que vous preniez toujours le bon.",
      },
      {
        q: "Ce convertisseur est-il gratuit ?",
        a: "Oui — il tourne entièrement dans votre navigateur. Aucune limite, aucune publicité sur les résultats, aucune inscription.",
      },
      {
        q: "Les conversions sont-elles précises ?",
        a: "Les facteurs de conversion suivent les définitions standard internationales (SI et NIST). Les résultats sont affichés avec jusqu'à 8 chiffres significatifs.",
      },
    ],
  },
  "weight-converter": {
    name: "Convertisseur de poids",
    tagline:
      "Convertissez kilogrammes, livres, onces, stones et grammes instantanément — gratuit, privé et fonctionne hors ligne.",
    intro: [
      "Basculez entre unités de poids métriques et impériales au même endroit : kilogrammes, livres, onces, stones, carats et plus, tout recalculé pendant la saisie.",
      "Pratique pour cuisiner des recettes étrangères, vérifier les limites de bagages, tenir un journal de musculation et calculer des envois.",
      "Il gère 8 unités — tonne métrique, kilogramme, gramme, milligramme, livre, once et plus. Tout est calculé dans votre navigateur, fonctionne hors ligne, et vos données ne touchent jamais un serveur.",
    ],
    steps: [
      "Saisissez la valeur à convertir.",
      "Choisissez l'unité de départ et l'unité d'arrivée.",
      "Le résultat se met à jour pendant la saisie — le tableau en dessous affiche toutes les unités d'un coup, ou copiez le résultat.",
    ],
    faqs: [
      {
        q: "Combien de livres pèse 1 kg ?",
        a: "Un kilogramme vaut 2,20462 livres (1 lb = 0,45359237 kg exactement). Saisissez 1 kg → lb ci-dessus pour le voir.",
      },
      {
        q: "Qu'est-ce qu'un stone en kg ?",
        a: "Un stone (utilisé au Royaume-Uni pour le poids corporel) fait 6,35029318 kilogrammes — exactement 14 livres.",
      },
      {
        q: "Les conversions sont-elles précises ?",
        a: "Les facteurs de conversion suivent les définitions standard internationales (SI et NIST). Les résultats sont affichés avec jusqu'à 8 chiffres significatifs.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* Calculatrices                                                       */
  /* ------------------------------------------------------------------ */
  "age-calculator": {
    name: "Calculatrice d'âge",
    tagline:
      "Calculez un âge exact en années, mois et jours, le total de jours vécus, et un compte à rebours en direct vers le prochain anniversaire — fidèle au calendrier.",
    intro: [
      "Saisissez une date de naissance et cette calculatrice rapporte l'âge exact — années, mois et jours, pas une approximation — plus les mois totaux et le total de jours vécus. Elle compte aussi à rebours jusqu'au prochain anniversaire avec le jour de la semaine où il tombe.",
      "Le champ « âge à la date » prend par défaut aujourd'hui et peut être changé pour n'importe quelle date passée ou future, ce qui rend faciles les questions du type « quel âge avait-elle le jour de la remise des diplômes ? ».",
    ],
    steps: [
      "Choisissez la date de naissance.",
      "Laissez la date de référence sur aujourd'hui, ou changez-la pour une autre date.",
      "Lisez l'âge exact, les mois et jours totaux, et le compte à rebours du prochain anniversaire.",
    ],
    faqs: [
      {
        q: "Comment l'âge en années, mois et jours est-il calculé ?",
        a: "Par arithmétique de calendrier, pas avec une longueur moyenne de mois : années et mois sont comptés entiers, et les jours restants sont mesurés contre la longueur réelle du mois — années bissextiles comprises. Quelqu'un né le 29 février prend une année de plus le 1er mars les années non bissextiles.",
      },
      {
        q: "Puis-je calculer un âge à une date passée ou future ?",
        a: "Oui. La case « âge à la date » est modifiable : vous pouvez calculer un âge historique ou vérifier l'âge qu'aura quelqu'un lors d'un événement futur. La date de naissance ne doit pas être postérieure à la date de référence.",
      },
      {
        q: "Pourquoi le nombre de jours totaux a-t-il de l'importance ?",
        a: "Le total de jours vécus est le chiffre utilisé pour les jalons du style « jours sur terre » et pour les systèmes qui stockent les âges en jours. Il est calculé à partir des dates de calendrier en UTC, de sorte que les décalages d'heure d'été ne peuvent pas le fausser d'un jour.",
      },
    ],
  },
  "aspect-ratio-calculator": {
    name: "Calculatrice de ratio d'aspect",
    tagline:
      "À partir d'un ratio comme 16:9 et d'une dimension, obtenez instantanément la largeur ou la hauteur manquante — plus des préréglages du 1:1 au 21:9 pour la vidéo et le design.",
    intro: [
      "Saisissez un ratio — choisissez un préréglage (1:1, 4:3, 3:2, 16:9, 16:10, 21:9) ou tapez des nombres personnalisés — puis donnez une largeur ou une hauteur connue. La dimension manquante apparaît aussitôt, avec la paire formatée en L×H et le ratio décimal.",
      "Le classique redimensionnement sans déformation : recadrages vidéo, conteneurs d'images responsives, formats de capteurs et de pellicule, mises à l'échelle pour impression et décisions CSS object-fit vivent ici, calculés localement pendant la saisie.",
    ],
    steps: [
      "Choisissez un préréglage de ratio ou tapez vos propres valeurs largeur:hauteur.",
      "Choisissez la dimension que vous connaissez déjà — largeur ou hauteur.",
      "Saisissez la valeur connue et lisez la dimension manquante.",
    ],
    faqs: [
      {
        q: "Comment la dimension manquante est-elle calculée ?",
        a: "Par proportion directe : dimension connue × (côté cible ÷ côté de ratio correspondant). Pour du 16:9 avec une largeur de 1920, la hauteur = 1920 × 9 ÷ 16 = 1080. Le résultat est affiché arrondi, avec le décimal exact dessous.",
      },
      {
        q: "Pourquoi le 16:9 et le 16:10 comptent-ils tant pour les écrans ?",
        a: "Le 16:9 correspond à la vidéo (1920×1080, 3840×2160) et à la plupart des écrans ; le 16:10 ajoute de l'espace vertical pour les documents et le code (1920×1200). Choisir le mauvais donne des bandes noires ou des pixels étirés — cet outil montre exactement ce que produit chaque ratio.",
      },
      {
        q: "Puis-je utiliser des ratios décimaux ou inhabituels ?",
        a: "Oui. Les deux champs de ratio acceptent n'importe quels nombres positifs : du 2,39:1 de cinéma scope, du 1,85:1, des recadrages portrait 4:5 pour les réseaux ou des tailles de capteur comme 1,5:1 fonctionnent — le calcul de proportion est identique.",
      },
    ],
  },
  "barcode-generator": {
    name: "Générateur de codes-barres",
    tagline:
      "Créez des codes-barres CODE128, EAN-13 et UPC-A scannables avec largeur et hauteur de barres réglables — sortie SVG vectorielle, rendue dans votre navigateur.",
    intro: [
      "Tapez une valeur, choisissez une symbologie et obtenez un code-barres prêt pour la vente avec une ligne lisible par l'humain en option. Le CODE128 accepte lettres, chiffres et symboles pour les étiquettes d'inventaire ; EAN-13 et UPC-A valident et complètent automatiquement le chiffre de contrôle pour les emballages produits.",
      "Le rendu utilise la bibliothèque JsBarcode dans votre navigateur et produit un SVG redimensionnable : le même fichier imprime net sur une étiquette de 12 mm ou une feuille A4. Rien n'est envoyé et aucun code n'est stocké.",
    ],
    steps: [
      "Saisissez la valeur du code-barres — lettres/chiffres pour CODE128, 12 chiffres pour EAN-13, 11 pour UPC-A.",
      "Choisissez le format et ajustez largeur et hauteur des barres.",
      "Téléchargez le SVG pour imprimer ou importez-le dans votre outil de design.",
    ],
    faqs: [
      {
        q: "Pourquoi ma saisie EAN-13 est-elle rejetée ?",
        a: "EAN-13 exige exactement 12 chiffres (le 13e chiffre de contrôle est calculé automatiquement) ou les 13 chiffres avec un chiffre de contrôle final valide. UPC-A veut de même 11 chiffres. Lettres, espaces ou mauvais nombre de chiffres sont rejetés avec le message d'erreur de la bibliothèque.",
      },
      {
        q: "Quel format choisir pour des produits en vente ?",
        a: "EAN-13 dans la majeure partie du monde, UPC-A aux États-Unis et au Canada — tous deux sont des standards de vente GS1 attendus par les scanners de caisse. Utilisez CODE128 pour le stock interne, les étiquettes d'actifs et d'expédition sans numéro GS1.",
      },
      {
        q: "Quelle est la résolution de la sortie ?",
        a: "Le téléchargement est un SVG vectoriel : il passe à n'importe quel DPI sans flou. Gardez les zones silencieuses (les marges blanches de chaque côté) intactes au placement — les rogner est la première cause de scans illisibles.",
      },
    ],
  },
  "binary-converter": {
    name: "Convertisseur binaire",
    tagline:
      "Convertissez entre décimal, hexadécimal, octal et binaire dans une grille en direct — entiers arbitrairement grands pris en charge, groupés pour la lisibilité.",
    intro: [
      "Tapez un nombre dans n'importe lequel des quatre champs — décimal, hexa, octal ou binaire — et les trois autres se mettent à jour instantanément. Les valeurs hexa se groupent tous les deux chiffres et le binaire tous les quatre, pour que les longs motifs de bits restent lisibles.",
      "La conversion utilise l'arithmétique BigInt : aucun plafond 32 ou 64 bits. Collez un décimal à 40 chiffres ou une chaîne hexa de 256 bits complète, chaque représentation reste exacte.",
    ],
    steps: [
      "Tapez ou collez une valeur dans n'importe quel champ — décimal, hexa, octal ou binaire.",
      "Les trois autres bases se mettent à jour en direct pendant la saisie.",
      "Les préfixes comme 0x sont facultatifs ; les espaces de groupement sont ignorés à l'analyse.",
    ],
    faqs: [
      {
        q: "Jusqu'à quel nombre ce convertisseur peut-il aller ?",
        a: "Des entiers non négatifs arbitrairement grands. Les calculs utilisent BigInt, donc une valeur hexadécimale de 256 bits se convertit exactement — bien au-delà de la limite 2^53 des nombres JavaScript ordinaires.",
      },
      {
        q: "Pourquoi ma lettre hexadécimale s'affiche-t-elle invalide ?",
        a: "Chaque base n'accepte que ses propres chiffres : binaire 0–1, octal 0–7, décimal 0–9 et hexadécimal 0–9 plus a–f. Un espace ou un symbole parasite à l'intérieur du nombre est aussi rejeté.",
      },
      {
        q: "Les nombres négatifs ou les fractions sont-ils pris en charge ?",
        a: "Non — cette grille convertit des valeurs entières non négatives, ce que sont les motifs de bits, hachages et adresses mémoire. Les formats signés et fractionnaires dépendent de choix d'encodage (complément à deux, IEEE 754) qui rendraient la correspondance ambiguë.",
      },
    ],
  },
  "bmi-calculator": {
    name: "Calculatrice d'IMC",
    tagline:
      "Calculez l'indice de masse corporelle depuis des entrées métriques ou impériales et voyez exactement où la valeur tombe dans les catégories de poids officielles de l'OMS.",
    intro: [
      "Saisissez taille et poids en centimètres et kilogrammes, ou pieds, pouces et livres, et la calculatrice montre votre indice de masse corporelle à un décimal avec la catégorie OMS dans laquelle il tombe — insuffisance pondérale, corpulence normale, surpoids ou obésité — la ligne correspondante étant surlignée dans le tableau de référence.",
      "Le résultat se met à jour pendant la saisie : facile de voir comment quelques kilos vous déplacent d'une bande à l'autre. L'IMC est un outil de dépistage, pas un diagnostic : il ne distingue pas le muscle de la graisse.",
    ],
    steps: [
      "Choisissez les unités métriques (cm + kg) ou impériales (ft + in + lb).",
      "Tapez votre taille et votre poids.",
      "Lisez votre IMC, sa catégorie OMS et le tableau de référence complet.",
    ],
    faqs: [
      {
        q: "Quelles sont les fourchettes d'IMC de l'OMS ?",
        a: "L'Organisation mondiale de la santé définit : en dessous de 18,5 insuffisance pondérale, 18,5–24,9 corpulence normale, 25,0–29,9 surpoids, et 30,0 et plus obésité. Les mêmes seuils s'appliquent aux hommes comme aux femmes adultes.",
      },
      {
        q: "Comment l'IMC est-il calculé ?",
        a: "L'IMC est le poids en kilogrammes divisé par la taille en mètres au carré (kg/m²). Pour les unités impériales, l'outil convertit pieds, pouces et livres en interne : le résultat est identique dans les deux cas.",
      },
      {
        q: "Pourquoi l'IMC ne convient-il pas aux athlètes ?",
        a: "Le muscle est plus dense que la graisse : des personnes très musclées peuvent afficher « surpoids » tout en portant peu d'excès de graisse. Traitez l'IMC comme un dépistage rapide à l'échelle d'une population et combinez-le avec le tour de taille ou la composition corporelle pour un tableau plus complet.",
      },
    ],
  },
  "color-converter": {
    name: "Convertisseur de couleurs",
    tagline:
      "Collez une couleur en hex, rgb() ou hsl() et obtenez les trois formats plus une rangée prête à l'emploi de teintes et nuances pour votre design system.",
    intro: [
      "Donnez-lui #0071e3, rgb(0, 113, 227) ou hsl(211, 100%, 45%) — l'analyseur détecte le format automatiquement et sort hex, RGB et HSL d'un coup, chacun avec une copie en un clic.",
      "Sous les valeurs, une rangée de teintes et nuances mélange votre couleur avec le blanc et le noir par pas de 20/40/60/80 % : états hover, bordures et variantes mode sombre instantanés, sans ouvrir un outil de design.",
    ],
    steps: [
      "Collez une couleur dans l'un des trois formats — hex, rgb() ou hsl().",
      "Lisez les valeurs converties et copiez celle qu'il vous faut.",
      "Récupérez teintes et nuances dans la rangée d'échantillons en dessous.",
    ],
    faqs: [
      {
        q: "Comment le HSL est-il converti en RGB ?",
        a: "Par la correspondance cylindrique–RGB standard : chromaticité c = (1 − |2L − 1|) × S, une valeur intermédiaire x déterminée par le secteur de teinte, puis chaque canal décalé de m = L − c/2. Ce sont les formules manuelles du cours : les résultats correspondent aux outils de design.",
      },
      {
        q: "Pourquoi mon code couleur s'affiche-t-il invalide ?",
        a: "Les formes acceptées sont #RGB / #RRGGBB, rgb(r, g, b) et hsl(h, s%, l%). Les canaux doivent être dans les plages (0–255 pour RGB, 0–360 pour la teinte, 0–100 % pour le reste) et chaque partie séparée par une virgule ou un espace.",
      },
      {
        q: "À quoi servent les teintes et les nuances ?",
        a: "Les teintes (mélangées au blanc) font les fonds hover, badges et cartes ; les nuances (mélangées au noir) font les états appuyés, bordures et surfaces du mode sombre. Dériver les deux d'une seule couleur de marque garde chaque état de l'interface visuellement cohérent.",
      },
    ],
  },
  "color-picker": {
    name: "Sélecteur de couleurs",
    tagline:
      "Choisissez une couleur dans l'échantillon ou capturez-en une directement à l'écran avec l'API EyeDropper — hex, RGB et HSL copiés en un clic.",
    intro: [
      "Cliquez sur l'échantillon pour composer une couleur visuellement, ou — dans les navigateurs Chromium — utilisez Choisir à l'écran pour échantillonner n'importe quel pixel déjà affiché. La valeur choisie apparaît simultanément en hex, rgb() et hsl(), chacun avec son bouton copier.",
      "L'échantillonnage utilise l'API EyeDropper intégrée du navigateur et lit le pixel localement ; rien n'est enregistré, envoyé ni stocké. Sur les navigateurs sans l'API, la saisie par échantillon garde tout fonctionnel.",
    ],
    steps: [
      "Cliquez sur l'échantillon de couleur et choisissez une couleur, ou utilisez Choisir à l'écran là où c'est disponible.",
      "Lisez les valeurs hex, RGB et HSL sous l'aperçu.",
      "Cliquez sur Copier à côté du format qu'il vous faut.",
    ],
    faqs: [
      {
        q: "Pourquoi « Choisir à l'écran » n'apparaît-il pas ?",
        a: "L'API EyeDropper n'est pour l'instant disponible que dans les navigateurs à base de Chromium (Chrome, Edge, Brave, Opera). Firefox et Safari ne l'exposent pas encore : ces navigateurs ne montrent que la saisie par échantillon — tout le reste fonctionne à l'identique.",
      },
      {
        q: "Quelle différence entre hex, RGB et HSL ?",
        a: "Ils décrivent la même couleur de trois façons : le hex emballe rouge-vert-bleu en #RRGGBB pour le CSS et les outils de design ; rgb() énonce les trois canaux numériquement ; hsl() exprime teinte, saturation et luminosité — plus facile pour bâtir des palettes et états hover à la main.",
      },
      {
        q: "L'échantillonnage à l'écran est-il privé ?",
        a: "Oui. L'API EyeDropper affiche un sélecteur système et ne renvoie que le pixel unique cliqué ; la lecture se fait dans votre navigateur et aucune capture, historique ou valeur n'est transmis ni sauvegardé.",
      },
    ],
  },
  "compound-interest-calculator": {
    name: "Calculatrice d'intérêts composés",
    tagline:
      "Voyez comment l'épargne pousse avec les intérêts composés — saisissez un dépôt, des versements mensuels et un taux pour obtenir le solde final et un tableau année par année.",
    intro: [
      "L'intérêt composé, c'est l'intérêt sur l'intérêt : à chaque période le solde gagne une part du taux annuel, et chaque versement que vous ajoutez se met à gagner ses propres intérêts. Cette calculatrice déroule cette récursion période par période pour un dépôt initial plus des versements mensuels réguliers, avec capitalisation mensuelle, trimestrielle ou annuelle.",
      "Le résultat donne le solde final, le total versé et les intérêts générés par la capitalisation — plus un tableau année par année pour voir exactement quand la courbe commence à se courber. Tout se recalcule en direct, et la formule utilisée est imprimée juste sous les chiffres pour la vérifier face à la projection de votre banque.",
    ],
    steps: [
      "Saisissez le dépôt initial et le montant que vous ajouterez chaque mois (0 pour un dépôt unique).",
      "Réglez le taux d'intérêt annuel, le nombre d'années et la fréquence de capitalisation.",
      "Choisissez une devise d'affichage — les montants sont formatés selon votre langue.",
      "Lisez le solde final, les versements totaux et les intérêts gagnés, puis consultez le tableau année par année.",
    ],
    faqs: [
      {
        q: "Quelle formule la calculatrice utilise-t-elle ?",
        a: "La même récursion de solde que les banques pour projeter l'épargne : à chaque période, solde ← (solde + versement) × (1 + r), où r = taux annuel ÷ périodes par an (12 pour mensuel, 4 pour trimestriel, 1 pour annuel). Les versements sont déposés au début de chaque période et gagnent donc des intérêts dès cette période. Exemple : 10 000 initial, 100/mois à 5 % pendant 10 ans avec capitalisation mensuelle donnent un solde final de 32 063,02 — 22 000,00 versés et 10 063,02 d'intérêts.",
      },
      {
        q: "Pourquoi obtiens-je des résultats légèrement différents sur d'autres calculatrices ?",
        a: "Les conventions de temporalité diffèrent. Certains outils traitent les versements comme des dépôts de fin de période (ils ne gagnent pas d'intérêts pendant la période d'arrivée), d'autres supposent une capitalisation quotidienne, d'autres arrondissent chaque période. Cet outil dépose au début de chaque période et n'arrondit jamais les étapes intermédiaires ; un écart de 0,1 % avec un autre site vient généralement de cette convention, pas d'une erreur.",
      },
      {
        q: "Inclut-il impôts, frais ou inflation ?",
        a: "Non — le résultat est une croissance nominale au taux saisi. Impôts sur les intérêts, frais de compte et inflation réduisent tous le rendement réel : traitez le solde final comme une borne supérieure de ce que vous garderiez vraiment.",
      },
    ],
  },
  "currency-converter": {
    name: "Convertisseur de devises",
    tagline:
      "Convertissez plus de 160 devises mondiales avec des taux médians frais — chargés une fois en ligne, calculés et mis en cache en privé dans votre navigateur.",
    intro: [
      "Les taux de change sont récupérés une fois depuis le service gratuit et sans clé open.er-api.com puis mis en cache sur votre appareil pendant une heure : les conversions répétées sont instantanées et fonctionnent hors ligne. L'arithmétique qui transforme votre montant en une autre devise se fait localement dans votre navigateur.",
      "Tapez un montant, choisissez deux devises dans la liste cherchable de plus de 160, et lisez le résultat plus la ligne du taux en direct. Les montants saisis ne sont jamais transmis nulle part — seule la table de taux anonyme est téléchargée.",
    ],
    steps: [
      "Saisissez le montant à convertir.",
      "Choisissez la devise source et la devise cible — les courantes sont listées en premier.",
      "Lisez le résultat converti et le taux exact ; utilisez Rafraîchir les taux pour les données les plus récentes.",
    ],
    faqs: [
      {
        q: "À quelle fréquence les taux de change sont-ils mis à jour ?",
        a: "La table open.er-api.com se rafraîchit environ une fois par jour, et cet outil la met en cache dans votre navigateur pendant une heure avant de la récupérer à nouveau. Appuyez sur « Rafraîchir les taux » à tout moment pour tirer la table la plus récente immédiatement.",
      },
      {
        q: "Utiliser cet outil envoie-t-il mes données en ligne ?",
        a: "Aucun montant n'est jamais envoyé nulle part. La seule requête réseau télécharge une table de taux publique et anonyme (base USD) une fois par heure ; le calcul de conversion tourne localement dans votre navigateur et marche même hors ligne depuis le cache.",
      },
      {
        q: "Ce sont les taux que ma banque me donnera ?",
        a: "Ce sont des taux médians de référence — le point médian entre prix d'achat et de vente auxquels les banques échangent. Les réseaux de cartes et les banques ajoutent typiquement un spread ou des frais de 1 à 3 % au-dessus de ce chiffre.",
      },
    ],
  },
  "date-calculator": {
    name: "Calculatrice de dates",
    tagline:
      "Le nombre de jours entre deux dates en années, mois et jours — ou ajoutez et soustrayez des jours à n'importe quelle date — avec les années bissextiles gérées exactement.",
    intro: [
      "Deux problèmes de dates du quotidien au même endroit : mesurer l'écart entre deux dates (années/mois/jours fidèles au calendrier, jours totaux, semaines et jours restants), ou avancer ou reculer de N jours depuis une date de base et obtenir la date résultante avec son jour de la semaine.",
      "Comme l'arithmétique est du vrai calcul de calendrier — pas un mois moyen — un anniversaire un 29 février, un mois de 31 jours ou un passage sur février tombent tous juste, sans serveur impliqué.",
    ],
    steps: [
      "Choisissez Différence entre dates, ou Ajouter / soustraire des jours.",
      "Saisissez les deux dates — ou une date de base et un nombre de jours.",
      "Lisez la répartition exacte et la date résultante avec son jour de la semaine.",
    ],
    faqs: [
      {
        q: "Comment la différence en années/mois/jours est-elle calculée ?",
        a: "Comme on compte les anniversaires : années pleines, puis mois pleins, puis jours restants mesurés contre les longueurs réelles des mois traversés. Le 29 février est traité comme le dernier jour de février, de sorte que les traversées d'années bissextiles restent honnêtes.",
      },
      {
        q: "« Ajouter 90 jours » veut-il dire jours ouvrés ?",
        a: "Non — le comptage est en jours calendaires, week-ends compris. Pour des échéances contractuelles en jours ouvrés, ajoutez environ 5 jours par semaine traversée en première approximation, ou utilisez un outil dédié aux jours ouvrés.",
      },
      {
        q: "Les dates que je saisis sont-elles envoyées quelque part ?",
        a: "Non. Les deux modes tournent entièrement dans votre navigateur avec l'arithmétique de dates de JavaScript ; rien n'est envoyé et rien n'est stocké.",
      },
    ],
  },
  "discount-calculator": {
    name: "Calculatrice de remise",
    tagline:
      "Prix plus une ou deux remises cumulées : prix final, argent économisé et pourcentage combiné réel — calculé pendant la saisie.",
    intro: [
      "Saisissez le prix d'origine et un pourcentage de remise, et voyez instantanément ce que vous payez réellement et combien vous économisez. Une seconde remise facultative gère le cas « 10 % en plus sur les prix soldés » qui piège toujours les acheteurs.",
      "Les remises cumulées s'appliquent l'une après l'autre, et l'outil montre le taux combiné effectif — parce que 20 % + 10 % font 28 %, pas 30 %, une différence qui s'accumule sur les gros achats.",
    ],
    steps: [
      "Tapez le prix d'origine.",
      "Saisissez le pourcentage de remise — et une seconde remise cumulée facultative.",
      "Lisez le prix final, le montant économisé et la remise effective.",
    ],
    faqs: [
      {
        q: "Pourquoi 20 % + 10 % ne font-ils pas 30 % de remise ?",
        a: "La seconde remise s'applique au prix déjà réduit, pas à l'original : 100 → 80 (−20 %) → 72 (−10 %), soit 28 % au total. La calculatrice montre ce taux effectif pour comparer les offres équitablement.",
      },
      {
        q: "Comment retrouver le prix d'origine à partir d'un prix soldé ?",
        a: "Divisez le prix soldé par (1 − remise ÷ 100). Un prix de 72 € après 28 % de remise vient de 72 ÷ 0,72 = 100 €. Ou utilisez le mode « X est quel % de Y » de la Calculatrice de pourcentages pour le détailler pas à pas.",
      },
      {
        q: "Prend-il en compte la TVA ou une taxe sur les ventes ?",
        a: "Non — il travaille sur les prix que vous tapez. Si l'étiquette affiche un prix taxes comprises, le résultat de remise est aussi TTC. Pour combiner avec la taxe, passez le prix remisé par la calculatrice de TVA ou de GST.",
      },
    ],
  },
  "emi-calculator": {
    name: "Calculatrice d'EMI",
    tagline:
      "Calculez l'EMI mensuelle fixe de n'importe quel prêt — capital, taux et durée en entrée, intérêts totaux et remboursement total en sortie, instantanément.",
    intro: [
      "Saisissez le montant du prêt, le taux d'intérêt annuel et la durée en années ou mois pour obtenir l'échéancier mensuel (EMI) plus le total d'intérêts que vous paierez sur la vie du prêt. Le calcul suit la formule standard de l'amortissement à taux effectif qu'utilisent banques et sociétés de financement.",
      "Modifiez n'importe quelle entrée et tout se recalcule en direct : comparez un prêt de 15 ans à un prêt de 20 ans, ou voyez exactement ce que coûte chaque mois un taux supérieur de 0,5 %.",
    ],
    steps: [
      "Tapez le montant du prêt (capital).",
      "Saisissez le taux d'intérêt annuel et la durée en années ou en mois.",
      "Lisez l'EMI mensuelle, les intérêts totaux et le remboursement total.",
    ],
    faqs: [
      {
        q: "Quelle formule la calculatrice d'EMI utilise-t-elle ?",
        a: "La formule standard de l'amortissement à taux effectif : EMI = P × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1), où P est le capital, r le taux d'intérêt mensuel (annuel ÷ 12 ÷ 100) et n le nombre de mois. C'est la même équation que les banques utilisent pour les prêts immobiliers, automobiles et personnels.",
      },
      {
        q: "Pourquoi les intérêts totaux sont-ils si élevés au début du prêt ?",
        a: "Les intérêts de chaque mois sont calculés sur le solde restant dû, qui est maximal au départ. Les premières EMI sont surtout des intérêts et très peu de capital ; la répartition s'inverse à mesure que le solde fond. Rembourser par anticipation tôt économise donc bien plus d'intérêts que tard.",
      },
      {
        q: "Les frais et l'assurance sont-ils inclus dans l'EMI ?",
        a: "Non. Frais de dossier, assurance et toute variation de taux flottant sont exclus — le résultat est l'EMI d'amortissement pure au taux saisi. La lettre d'offre de votre prêteur montre le montant final à payer.",
      },
    ],
  },
  "fuel-cost-calculator": {
    name: "Calculatrice de coût de carburant",
    tagline:
      "Distance, consommation et prix à la pompe en entrée : carburant nécessaire, coût du trajet et coût au kilomètre ou au mile en sortie — métrique ou impérial, avec aller-retour.",
    intro: [
      "Planifiez n'importe quel trajet avant de partir : saisissez la distance, la consommation de votre voiture (L/100 km ou MPG) et le prix actuel du carburant, et voyez les litres ou gallons requis, le coût total et le coût par unité de distance — plus un bouton aller-retour qui double la distance pour vous.",
      "Il marche aussi bien pour budgéter les trajets domicile-travail, partager un road trip entre amis ou comparer le prix d'un détour. Le calcul reste local dans votre navigateur : il fonctionne même sans réseau à la station-service.",
    ],
    steps: [
      "Saisissez la distance aller en kilomètres ou en miles.",
      "Ajoutez la consommation de votre véhicule et le prix actuel du carburant.",
      "Activez l'aller-retour si besoin et lisez les totaux de carburant et de coût.",
    ],
    faqs: [
      {
        q: "Comment convertir entre L/100 km et MPG ?",
        a: "Les deux échelles sont inverses : 235,2 divisé par la valeur en MPG donne des L/100 km (gallons US), donc 30 MPG ≈ 7,8 L/100 km et 6 L/100 km ≈ 39,2 MPG. La calculatrice prend l'une ou l'autre selon ce que montre votre tableau de bord.",
      },
      {
        q: "Pourquoi ma consommation réelle diffère-t-elle du résultat ?",
        a: "Les chiffres officiels supposent des vitesses stables. Trafic urbain, démarrages à froid, barres de toit, accélérations nerveuses et climatisation peuvent pousser la consommation réelle 10 à 30 % plus haut : traitez l'estimation comme un plancher pour les trajets urbains.",
      },
      {
        q: "La calculatrice inclut-elle péages ou entretien ?",
        a: "Non — elle ne chiffre que le carburant. Pour un vrai coût au kilomètre, ajoutez les péages et répartissez séparément l'usure (pneus, entretien, dépréciation) ; beaucoup d'automobilistes budgètent 5 à 10 centimes de plus au km au-delà du carburant.",
      },
    ],
  },
  "gst-calculator": {
    name: "Calculatrice de GST",
    tagline:
      "Ajoutez ou extrayez la GST aux taux des tranches 5 %, 12 %, 18 % et 28 % — montants net, taxe et brut calculés en direct dans votre navigateur.",
    intro: [
      "Saisissez n'importe quel montant et choisissez l'une des quatre tranches de GST indiennes pour ajouter la taxe à un prix net, ou retirer la GST déjà incluse dans un prix brut (MRP). Les trois chiffres — net, taxe et brut — se mettent à jour pendant la saisie.",
      "Utile pour les factures, les contrôles de charge inversée, les comparaisons d'achats entre États aux tranches différentes, et pour comprendre exactement quelle part d'un prix affiché est de la taxe.",
    ],
    steps: [
      "Tapez le montant — net si vous ajoutez la GST, brut si vous l'extrayez.",
      "Choisissez la tranche applicable : 5 %, 12 %, 18 % ou 28 %.",
      "Choisissez Ajouter la taxe ou Retirer la taxe et lisez les montants net, taxe et brut.",
    ],
    faqs: [
      {
        q: "Quelles sont les tranches de GST en Inde ?",
        a: "Les taux principaux sont 5 %, 12 %, 18 % et 28 % : les produits essentiels à 0–5 %, la plupart des biens et services à 12–18 %, et les produits de luxe ou « péchés » à 28 % (parfois avec une cess supplémentaire). L'outil couvre les quatre tranches standard.",
      },
      {
        q: "Comment retirer la GST d'un prix taxes comprises ?",
        a: "Choisissez « Retirer la taxe » et saisissez le montant brut. La base se retrouve par brut ÷ (1 + taux/100), donc un prix brut de 118 ₹ à 18 % de GST donne un net de 100 ₹ et 18 ₹ de taxe.",
      },
      {
        q: "La GST, est-ce la même chose que la TVA ?",
        a: "Les deux sont des taxes sur la valeur ajoutée perçues à chaque étape, mais la GST indienne est une taxe unifiée unique qui absorbe l'accise centrale, la taxe sur les services et la TVA d'État, répartie en CGST + SGST (intra-État) ou IGST (inter-États). D'autres pays appellent leur équivalent simplement TVA.",
      },
    ],
  },
  "loan-calculator": {
    name: "Calculatrice de prêt",
    tagline:
      "Voyez le tableau complet d'un prêt : mensualité, intérêts totaux et un tableau d'amortissement année par année montrant la répartition capital/intérêts.",
    intro: [
      "Tout ce que donne la vue EMI — mensualité, intérêts totaux, remboursement total — plus un échéancier d'amortissement annuel qui montre exactement quelle part des paiements de chaque année est des intérêts et quelle part du capital, et quel solde reste à la fin de chaque année.",
      "C'est le moyen le plus rapide de comprendre pourquoi les remboursements anticipés des premières années ont tant de valeur : le tableau rend les années chargées en intérêts impossibles à rater.",
    ],
    steps: [
      "Saisissez le montant du prêt, le taux annuel et la durée en années ou en mois.",
      "Lisez la mensualité, les intérêts totaux et le remboursement total.",
      "Parcourez le tableau annuel pour voir capital, intérêts et solde restant par année.",
    ],
    faqs: [
      {
        q: "Qu'est-ce qu'un échéancier d'amortissement ?",
        a: "Une décomposition période par période d'un prêt à mensualité fixe. Chaque paiement est scindé entre les intérêts dus sur le solde courant et le capital qu'il rembourse, et le solde fond chaque mois. Le tableau ici regroupe ces mois par années.",
      },
      {
        q: "Comment payer moins d'intérêts au total ?",
        a: "Trois leviers : une durée plus courte, un taux plus bas, ou des remboursements de capital supplémentaires — surtout dans le premier tiers du prêt, quand les soldes sont les plus élevés. Le tableau annuel montre précisément où les intérêts se concentrent.",
      },
      {
        q: "L'échéancier suppose-t-il que le taux ne change jamais ?",
        a: "Oui. Il modélise un prêt à taux fixe au taux saisi. Pour les produits à taux variable, recalculez à chaque révision de l'indice — chaque révision change à la fois la mensualité et l'échéancier.",
      },
    ],
  },
  "percentage-calculator": {
    name: "Calculatrice de pourcentages",
    tagline:
      "Trois problèmes de pourcentage dans un seul outil en direct : X % de Y, X est quel pourcentage de Y, et la variation en pourcentage entre deux valeurs.",
    intro: [
      "Les trois questions que l'on se pose vraiment : « combien font 15 % de 200 ? », « 30 est quel pourcentage de 150 ? » et « les ventes sont passées de 480 à 610 — de quel pourcentage ? ». Changez de mode en un clic et la formule s'adapte à chaque cas.",
      "La variation en pourcentage est signée et étiquetée hausse ou baisse : une chute de 500 à 400 se lit clairement −20 %, pas un nombre positif déroutant.",
    ],
    steps: [
      "Choisissez le mode : X % de Y, X est quel % de Y, ou variation en %.",
      "Tapez les deux valeurs dans les deux cases.",
      "Lisez le résultat en direct — avec la direction étiquetée pour les variations.",
    ],
    faqs: [
      {
        q: "Comment la variation en pourcentage est-elle calculée ?",
        a: "(final − initial) ÷ |initial| × 100. La valeur absolue au dénominateur fait qu'un passage de −50 à −40 rapporte correctement +20 % et non −20 %. Le sens inverse (400 → 500) donne +25 % parce que la base change.",
      },
      {
        q: "Pourquoi une hausse de 20 % suivie d'une baisse de 20 % ne fait-elle pas zéro ?",
        a: "Les pourcentages s'appliquent à des bases différentes : 100 + 20 % = 120, puis 120 − 20 % = 96. La variation nette est −4 %. Cette asymétrie piège les comparaisons de prix comme les titres de presse.",
      },
      {
        q: "Puis-je utiliser des nombres négatifs ou décimaux ?",
        a: "Oui. Les deux entrées acceptent négatifs et décimaux : « −5 % de 80 » ou des points de pourcentage sur une variation de température fonctionnent parfaitement.",
      },
    ],
  },
  "profit-calculator": {
    name: "Calculatrice de marge",
    tagline:
      "Coût et prix de vente en entrée : profit ou perte, marge bénéficiaire et taux de marque en sortie — les chiffres de tarification que les vendeurs confondent, triés en direct.",
    intro: [
      "Saisissez ce que vous a coûté un article et ce pour quoi vous le vendez, et obtenez le profit (ou la perte) absolu plus les deux ratios dont tout vendeur a besoin : la marge — le profit en part du prix de vente — et le taux de marque — le profit en part du coût.",
      "Comme les deux ratios utilisent des dénominateurs différents, une marge de 25 % correspond à un taux de marque de 33,3 % ; l'outil montre les deux ensemble pour que factures, devis et grilles tarifaires restent cohérents.",
    ],
    steps: [
      "Tapez le prix de revient — ce que vous avez payé.",
      "Tapez le prix de vente — ce que paie le client.",
      "Lisez le profit/perte et les pourcentages de marge et de marque.",
    ],
    faqs: [
      {
        q: "Quelle différence entre marge et taux de marque ?",
        a: "La marge est le profit ÷ prix de vente (part du chiffre d'affaires) ; le taux de marque est le profit ÷ coût (montant ajouté au-dessus du coût). Un produit acheté 80 et vendu 100 a une marge de 20 % et un taux de marque de 25 %. Confondre les deux réduit silencieusement le profit espéré.",
      },
      {
        q: "Comment fixer un prix à partir d'une marge cible ?",
        a: "Divisez le coût par (1 − marge cible) : pour une marge de 25 % sur un coût de 80, 80 ÷ 0,75 ≈ 106,67. Le fixer par taux de marque (80 × 1,25 = 100) ne vous laisse qu'une marge de 20 %.",
      },
      {
        q: "La calculatrice inclut-elle les frais et taxes ?",
        a: "Elle travaille sur les deux nombres que vous saisissez : les frais de traitement de paiement, la livraison et la taxe sur les ventes n'apparaissent que si vous les intégrez d'abord au coût ou au prix. Pour une tarification TTC, passez le chiffre par la calculatrice de TVA ou de GST.",
      },
    ],
  },
  "qr-generator": {
    name: "Générateur de codes QR",
    tagline:
      "Transformez n'importe quel texte ou URL en code QR net avec taille, couleurs et niveau de correction d'erreur réglables — téléchargez en PNG ou SVG.",
    intro: [
      "Collez un lien, un mot de passe Wi-Fi, un numéro de téléphone ou n'importe quel texte et regardez le code QR se rendre en direct jusqu'à 768 px. Choisissez un niveau de correction d'erreur de L (7 %) à H (30 %) pour que le code se scanne même imprimé petit ou partiellement couvert, et prenez des couleurs de code et de fond assorties à votre marque.",
      "L'encodage tourne entièrement dans votre navigateur avec la bibliothèque qrcode — l'image est générée sur votre appareil et jamais envoyée. Téléchargez un PNG pour les écrans ou un SVG indépendant de la résolution pour l'impression.",
    ],
    steps: [
      "Tapez ou collez le texte ou l'URL à encoder.",
      "Ajustez la taille, le niveau de correction d'erreur et les deux couleurs.",
      "Téléchargez le résultat en PNG (écrans) ou SVG (impression, toute taille).",
    ],
    faqs: [
      {
        q: "Quel niveau de correction d'erreur choisir ?",
        a: "M (15 %) est le réglage quotidien par défaut. Prenez H (30 %) pour des codes imprimés sur tissu, stickers ou fonds chargés, ou quand vous prévoyez de placer un logo au milieu — plus le niveau est haut, plus le code survit aux dégâts.",
      },
      {
        q: "Les codes QR expirent-ils ou contiennent-ils du suivi ?",
        a: "Non. Ce sont des codes statiques : le texte encodé vit dans le motif lui-même et fonctionne pour toujours sans service derrière. Pas de redirection, pas de compteur de scans, pas d'analytique — les données sont uniquement ce que vous avez tapé.",
      },
      {
        q: "Mon texte ou URL est-il envoyé quelque part ?",
        a: "Non. La bibliothèque qrcode tourne dans votre navigateur et rend sur un canvas local : ni le texte ni l'image générée ne quittent votre appareil.",
      },
    ],
  },
  "qr-scanner": {
    name: "Lecteur de codes QR",
    tagline:
      "Décodez un code QR depuis n'importe quelle image ou directement depuis votre caméra — lecture locale dans votre navigateur, avec copie et ouverture en lien, et rien d'envoyé.",
    intro: [
      "Déposez une capture ou une photo d'un code QR et le décodeur la lit sur la page, en surlignant les coins détectés sur l'image. S'il s'agit d'une URL, vous obtenez un bouton copier plus un lien à ouvrir en un clic ; tout autre contenu — identifiants Wi-Fi, vCards, texte simple — sort exactement comme encodé, prêt à copier.",
      "Vous préférez pointer la caméra vers le code ? Le mode en direct diffuse vers un élément vidéo local et analyse les frames en mémoire jusqu'à ce qu'une se décode, puis arrête immédiatement la caméra. Comme les deux chemins tournent entièrement dans votre navigateur, l'image ou le flux caméra n'est jamais envoyé à un serveur, et rien n'est enregistré.",
    ],
    steps: [
      "Choisissez l'onglet « Depuis une image » et déposez une photo du code QR, ou basculez sur « Caméra en direct ».",
      "Pour la caméra, appuyez sur Démarrer la caméra, accordez la permission et visez le code.",
      "Lisez le texte décodé dans la carte de résultat.",
      "Copiez-le, ou ouvrez-le directement s'il ressemble à un lien.",
    ],
    faqs: [
      {
        q: "Mes images ou frames caméra quittent-elles mon appareil ?",
        a: "Non. Le décodage tourne sur cette page avec la bibliothèque jsqr, en JavaScript : les images déposées sont lues depuis leurs pixels locaux et les frames caméra sont dessinées sur un canvas en mémoire et analysées là. Rien n'est envoyé, journalisé ni stocké, et le flux caméra s'arrête dès qu'un code est trouvé ou que vous appuyez sur arrêter.",
      },
      {
        q: "La caméra ne démarre pas — que se passe-t-il ?",
        a: "Le plus souvent, le navigateur a bloqué la permission caméra pour ce site : autorisez-la dans la barre d'adresse et appuyez à nouveau sur démarrer. Le balayage en direct exige aussi une page https sécurisée, et si l'appareil n'a pas de caméra du tout, l'outil vous le dit au lieu d'échouer en silence.",
      },
      {
        q: "Quels contenus QR peut-il lire ?",
        a: "N'importe quel code QR standard : URLs, texte simple, numéros de téléphone, chaînes de connexion Wi-Fi, contacts vCard, chaînes de paiement UPI ou PIX et plus. L'outil montre le contenu brut décodé — pour les codes Wi-Fi ou de paiement, copiez le texte dans l'application qui consomme ce format.",
      },
    ],
  },
  "random-name-picker": {
    name: "Tirage de noms aléatoire",
    tagline:
      "Collez votre liste, lancez la roue et laissez un tirage cryptographiquement aléatoire désigner le gagnant — équitable pour les classes, tombolas et stand-ups d'équipe.",
    intro: [
      "Tapez ou collez une liste de noms, un par ligne, et la roue se remplit d'un segment coloré pour chacun. Appuyez sur SPIN : elle décélère pendant quelques secondes avant d'atterrir sur le gagnant, annoncé en gros caractères avec un bouton copier. Deux options couvrent les besoins habituels : retirer les noms en doublon avant le tirage, et retirer le gagnant après chaque tirage pour que personne ne gagne deux fois.",
      "Le tirage n'est pas l'animation — le gagnant est choisi par le générateur aléatoire cryptographique de votre navigateur avant même que la roue ne démarre, si bien que chaque nom a exactement la même chance. Un historique de tirage de session garde la trace de tous les déjà choisis, pratique quand vous déroulez une classe ou une file de lots.",
    ],
    steps: [
      "Collez vos noms dans la case, un par ligne (2 à 100 noms).",
      "Activez si besoin la suppression des doublons ou des anciens gagnants.",
      "Appuyez sur SPIN et attendez l'arrêt de la roue.",
      "Lisez le gagnant, copiez le nom si besoin, et consultez l'historique des tirages en dessous.",
    ],
    faqs: [
      {
        q: "Le tirage est-il vraiment aléatoire ?",
        a: "Le gagnant est choisi avec crypto.getRandomValues, le générateur aléatoire cryptographique de votre navigateur, avec un échantillonnage par rejet pour éviter le biais de modulo. C'est la même source que les navigateurs utilisent pour les clés de sécurité — pas un pseudo-aléatoire de complaisance — donc chaque entrée a une chance identique. L'animation de la roue atterrit sur le gagnant déjà tiré : elle ne peut pas changer le résultat.",
      },
      {
        q: "Combien de noms la roue peut-elle contenir ?",
        a: "De 2 à 100. Les noms sont tronqués avec une ellipse sur la roue pour que les segments restent lisibles, mais la carte du gagnant montre toujours le nom complet. Passés environ 60 noms, les étiquettes disparaissent entièrement de la roue — le tirage reste exact.",
      },
      {
        q: "Puis-je tirer plusieurs gagnants à la suite ?",
        a: "Oui. Activez « Retirer le gagnant après chaque tirage » et chaque nom tiré sort automatiquement de la liste : personne n'est choisi deux fois. Le panneau d'historique enregistre chaque tirage de la session, dans l'ordre, avec horodatage.",
      },
    ],
  },
  "roman-numeral": {
    name: "Convertisseur de chiffres romains",
    tagline:
      "Convertissez des nombres en chiffres romains et inversement, dans les deux sens à la fois — avec une validation classique stricte de la notation soustractive.",
    intro: [
      "Tapez un nombre arabe (1–3999) et voyez sa forme romaine, ou tapez un chiffre romain et obtenez le nombre — les deux champs sont en direct, pour corriger l'un ou l'autre côté. L'analyseur impose les règles classiques : I devant V/X, X devant L/C, C devant D/M.",
      "Pratique pour les cadrans d'horloge, chapitres de livres, années de films, inscriptions de monuments et numéros de Super Bowl — partout où les chiffres romains subsistent.",
    ],
    steps: [
      "Saisissez un nombre entre 1 et 3999 pour obtenir son chiffre romain.",
      "Ou tapez un chiffre romain — le nombre apparaît instantanément.",
      "Les formes invalides comme VIIII ou IM sont signalées avec une explication des règles.",
    ],
    faqs: [
      {
        q: "Pourquoi la limite haute est-elle 4000 (MMMCMXCIX) ?",
        a: "La notation romaine classique n'a pas de chiffre plus grand que M (1000), et répéter M quatre fois (MMMM) n'était pas d'usage. Le plus grand nombre exprimable en forme classique stricte est 3999, écrit MMMCMXCIX.",
      },
      {
        q: "Pourquoi VIIII est-il rejeté alors que des horloges l'affichent ?",
        a: "Certains cadrans utilisent le IIII additif pour quatre, mais le système classique standard exige le soustractif IV. Cet outil valide contre l'expression régulière canonique stricte : VIIII, IC ou IM sont signalés au lieu d'être convertis en silence.",
      },
      {
        q: "Le convertisseur accepte-t-il les lettres minuscules ?",
        a: "Oui — une saisie comme mcmxciv est mise en majuscules automatiquement et convertie en 1994. La sortie s'affiche toujours en majuscules, comme le veulent les inscriptions traditionnelles.",
      },
    ],
  },
  "scientific-calculator": {
    name: "Calculatrice scientifique",
    tagline:
      "Une calculatrice scientifique complète dans votre navigateur : trigonométrie, log, ln, puissances et racines avec un résultat en direct — sans eval, sans serveur, sans suivi.",
    intro: [
      "Un pavé numérique plus une ligne d'expression saisissable : sin, cos, tan (DEG/RAD), log₁₀, ln, racine carrée, carrés, puissances arbitraires, parenthèses, π et e. L'aperçu du résultat se met à jour pendant la saisie, et = le réintègre dans l'expression pour enchaîner les calculs.",
      "Les expressions sont analysées par un évaluateur à descente récursive écrit à la main pour ce site — l'eval et le constructeur Function de JavaScript ne sont jamais utilisés, et rien n'est envoyé nulle part. La multiplication implicite (2π, 3(4+1)) fonctionne d'emblée.",
    ],
    steps: [
      "Touchez le pavé numérique ou tapez une expression au clavier.",
      "Basculez DEG/RAD pour les fonctions trigonométriques selon les besoins.",
      "Appuyez sur = pour valider le résultat prévisualisé, puis continuez à calculer dessus.",
    ],
    faqs: [
      {
        q: "Comment les expressions sont-elles évaluées ?",
        a: "Par un petit analyseur lexical et un parseur à descente récursive écrits dans la page : nombres, constantes, fonctions, parenthèses, moins unaire, % postfixé et x², puissances associatives à droite, et multiplication implicite entre valeurs adjacentes. Une entrée invalide affiche simplement une erreur au lieu d'exécuter quoi que ce soit.",
      },
      {
        q: "Comment obtenir la tangente de 45 degrés ?",
        a: "Laissez le commutateur DEG actif (c'est le réglage par défaut), appuyez sur tan, puis 45 et =. Pour les radians — par exemple tan(π/4) — passez en RAD et tapez tan(π/4) directement.",
      },
      {
        q: "Pourquoi mon résultat s'affiche-t-il avec un nombre limité de chiffres ?",
        a: "Les résultats sont arrondis à 12 chiffres significatifs pour masquer le bruit en virgule flottante du genre 0,30000000000000004. Au-delà de 12 chiffres, la précision a rarement du sens sur du matériel binaire en virgule flottante de toute façon.",
      },
    ],
  },
  "timestamp-converter": {
    name: "Convertisseur d'horodatage Unix",
    tagline:
      "Convertissez des secondes ou millisecondes Unix en dates lisibles et inversement, avec une horloge en direct, une sortie en heure locale et en UTC — tout dans votre navigateur.",
    intro: [
      "Un compteur en direct montre l'horodatage Unix courant en secondes et millisecondes, copiable d'un clic. Collez un horodatage et il est décodé vers votre heure locale et vers l'UTC — les valeurs à 10 chiffres sont lues comme des secondes, celles à 13 chiffres comme des millisecondes, automatiquement.",
      "Dans l'autre sens, choisissez une date et une heure pour obtenir son horodatage exact. Tout est calculé localement à partir de l'horloge de votre appareil ; les horodatages sont indépendants du fuseau par définition, les nombres sont donc les mêmes partout sur terre.",
    ],
    steps: [
      "Copiez l'horodatage courant en direct, ou collez-en un dans le champ de décodage.",
      "Lisez les dates lisibles locale et UTC ; secondes contre millisecondes est détecté automatiquement.",
      "Ou choisissez une date-heure pour obtenir son horodatage Unix en secondes et millisecondes.",
    ],
    faqs: [
      {
        q: "Qu'est-ce qu'un horodatage Unix, exactement ?",
        a: "Le nombre de secondes écoulées depuis le 1970-01-01 00:00:00 UTC, secondes intercalaires non comptées. C'est la manière standard dont les ordinateurs stockent des instants, parce que trier et soustraire devient trivial. Les horodatages en millisecondes (13 chiffres) sont courants en JavaScript et Java.",
      },
      {
        q: "Comment l'outil sait-il si mon nombre est en secondes ou en millisecondes ?",
        a: "Par l'ampleur : des valeurs sous 1 000 milliards ne peuvent pas décrire une date moderne en millisecondes, donc elles sont lues comme des secondes ; les valeurs à 13 chiffres sont lues comme des millisecondes. Le résultat indique quelle interprétation a été appliquée.",
      },
      {
        q: "Le même horodatage se décodera-t-il différemment dans d'autres fuseaux ?",
        a: "Le nombre brut ne change jamais — il encode un instant absolu. Seul le rendu lisible diffère, c'est pourquoi l'outil montre votre heure locale et l'UTC côte à côte.",
      },
    ],
  },
  "timezone-converter": {
    name: "Convertisseur de fuseaux horaires",
    tagline:
      "Comparez les heures entre 21 grandes villes avec horloges en direct et un tableau heure par heure — changement d'heure géré exactement, tout tourne dans votre navigateur.",
    intro: [
      "Choisissez deux villes quelconques, de Los Angeles à Tokyo, et voyez les deux horloges en direct côte à côte, la différence de décalage exacte pour aujourd'hui, et un tableau de comparaison de 24 lignes montrant ce que devient chaque heure de la journée dans l'autre ville — le moyen le plus rapide de trouver un créneau de réunion entre fuseaux.",
      "La conversion utilise la base de données de fuseaux IANA intégrée à votre navigateur : les passages à l'heure d'été tombent sur la bonne minute sans aucun appel réseau.",
    ],
    steps: [
      "Choisissez la ville de départ — son horloge locale en direct apparaît dessous.",
      "Choisissez la ville de destination ; l'horloge et le décalage UTC se mettent à jour instantanément.",
      "Parcourez le tableau heure par heure pour trouver des horaires qui conviennent aux deux côtés.",
      "Utilisez le bouton d'inversion pour échanger les deux villes.",
    ],
    faqs: [
      {
        q: "Le convertisseur gère-t-il l'heure d'été ?",
        a: "Oui. Les décalages sont calculés avec les règles IANA de fuseau du navigateur pour la date du jour : une ville actuellement à l'heure d'été montre son décalage décalé correct, et le tableau horaire reflète les vraies horloges des deux côtés.",
      },
      {
        q: "Pourquoi le tableau horaire montre-t-il une autre date dans certaines lignes ?",
        a: "Quand les villes sont éloignées, la date de calendrier d'un côté change au cours de la journée. Chaque ligne montre la date de la destination à côté de l'heure pour repérer quand, par exemple, 9:00 à Shanghai correspond encore à 21:00 la veille à New York.",
      },
      {
        q: "Cet outil a-t-il besoin d'un accès Internet ?",
        a: "Non. Les heures des villes viennent de la base de fuseaux horaires intégrée à votre navigateur et de l'horloge de votre appareil — rien n'est téléchargé et aucune localisation n'est partagée.",
      },
    ],
  },
  "tip-calculator": {
    name: "Calculatrice de pourboire",
    tagline:
      "Addition, pourcentage de pourboire et partage entre amis : voyez le pourboire, le total et exactement ce que doit chacun — en direct, plus de calcul mental à table.",
    intro: [
      "Saisissez l'addition, tapez un pourboire préréglé (10/15/18/20/25 %) ou le vôtre, et dites combien de personnes partagent. Vous obtenez aussitôt le montant du pourboire, le total général et la part par personne, pour que personne ne fasse de calcul mental pendant que le serveur attend.",
      "Tout se recalcule en live dès qu'un chiffre change, marche avec n'importe quelle devise, et tourne entièrement sur votre appareil — pratique à l'étranger, où votre propre connexion est parfois la seule fiable.",
    ],
    steps: [
      "Tapez le montant de l'addition.",
      "Choisissez un pourboire préréglé ou saisissez un pourcentage personnalisé.",
      "Réglez le nombre de personnes et lisez la part par personne.",
    ],
    faqs: [
      {
        q: "Combien devrais-je laisser ?",
        a: "Cela dépend d'où vous êtes : 15 à 20 % de l'addition hors taxes est d'usage aux États-Unis, 10 à 15 % dans une bonne part de l'Europe et de l'Amérique latine, et arrondir est normal au Japon et en Chine où le pourboire n'est pas attendu. Dans le doute, un préréglage à 10 % vous garde à l'abri presque partout.",
      },
      {
        q: "Faut-il calculer le pourboire avant ou après taxe ?",
        a: "L'étiquette traditionnelle dit de laisser un pourboire sur le montant hors taxes, mais en pratique la plupart des gens laissent sur le total montré par le ticket de carte. Si vous voulez être exact, saisissez le montant hors taxes comme addition et ajoutez la taxe à part pour le partage.",
      },
      {
        q: "La part par personne suppose-t-elle un partage égal ?",
        a: "Oui — l'addition plus le pourboire sont divisés également par le nombre de personnes. Pour des parts inégales (quelqu'un n'a pris qu'une salade), calculez d'abord les articles partagés comme sous-total et ajoutez les articles individuels au-dessus.",
      },
    ],
  },
  "vat-calculator": {
    name: "Calculatrice de TVA",
    tagline:
      "Ajoutez la TVA à un prix net ou extrayez-la d'un prix brut à n'importe quel taux personnalisé — montants net, TVA et brut en direct, en privé et instantanément.",
    intro: [
      "Fonctionne dans les deux sens pour le taux de n'importe quel pays : tapez 20 pour le Royaume-Uni, 21 pour les Pays-Bas, 19 pour l'Allemagne — ou n'importe quel taux. Ajoutez la taxe à un montant net, ou extrayez la TVA cachée dans un prix brut (taxes comprises).",
      "Tout est calculé localement dans votre navigateur — aucun envoi, aucun compte — ce qui le rend sûr pour les projets de tarifs et factures non publiées.",
    ],
    steps: [
      "Tapez le montant — net si vous ajoutez la TVA, brut si vous la retirez.",
      "Saisissez votre taux de TVA en pourcentage (par ex. 20).",
      "Choisissez Ajouter la taxe ou Retirer la taxe ; net, TVA et brut apparaissent instantanément.",
    ],
    faqs: [
      {
        q: "Comment calculer la TVA en partant d'un prix brut ?",
        a: "Net = brut ÷ (1 + taux ÷ 100). Pour un prix brut de 120 € à 20 % de TVA : 120 ÷ 1,2 = 100 € net, 20 € de TVA. Le mode « Retirer la taxe » le fait pour vous et montre les trois montants.",
      },
      {
        q: "Quelle différence entre TVA et GST ?",
        a: "C'est le même type de taxe — de la valeur ajoutée à chaque étape de la chaîne, supportée en dernier ressort par le consommateur. « TVA » est le nom courant en Europe, au Royaume-Uni et dans une grande partie de l'Afrique et de l'Asie ; l'Inde et quelques autres appellent GST leur version unifiée.",
      },
      {
        q: "Quel taux de TVA utiliser ?",
        a: "Celui qui s'applique à vos biens ou services et à votre juridiction : les taux standard vont de 0 % à 27 % dans le monde, et la plupart des pays ont aussi des taux réduits pour l'alimentation, les livres ou les médicaments. Dans le doute, consultez la table en vigueur de votre administration fiscale.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* Développeur / Utilitaires — CSV ⇄ Excel, contraste, notes           */
  /* ------------------------------------------------------------------ */
  "csv-to-excel": {
    name: "CSV vers Excel",
    tagline:
      "Convertissez un CSV en véritable classeur .xlsx directement dans votre navigateur : délimiteur (virgule, point-virgule ou tabulation) détecté automatiquement, guillemets et sauts de ligne préservés.",
    intro: [
      "Collez un CSV ou déposez un fichier .csv et téléchargez un vrai classeur Excel, pas un fichier texte renommé. Le moteur respecte la RFC 4180 : champs entre guillemets, guillemets doublés et retours à la ligne à l'intérieur d'une cellule sont analysés correctement, et les cellules numériques propres (9,5 ; -3 ; 0) deviennent de vraies cellules numériques.",
      "La première ligne est traitée comme un en-tête (désactivable : Column 1…N est alors généré), le nom de la feuille est libre, et les identifiants comme 007 restent du texte pour ne pas perdre leurs zéros. Rien ne quitte votre appareil.",
    ],
    steps: [
      "Collez votre CSV dans la zone de saisie ou déposez un fichier .csv.",
      "Vérifiez le délimiteur détecté et l'option de ligne d'en-tête.",
      "Nommez la feuille si le nom Sheet1 par défaut ne vous convient pas.",
      "Téléchargez le .xlsx et ouvrez-le dans Excel, Numbers ou Google Sheets.",
    ],
    faqs: [
      {
        q: "Mes nombres deviendront-ils de vrais nombres dans Excel ?",
        a: "Oui : les cellules dont la valeur est un littéral numérique propre (9,5 ; -3 ; 0) sont écrites comme cellules numériques, donc SOMME et graphiques fonctionnent immédiatement. Les valeurs comme 007 ou 1e3 restent volontairement du texte, car les convertir changerait leur signification.",
      },
      {
        q: "Mon CSV utilise un point-virgule, faut-il le configurer ?",
        a: "Non. Le délimiteur est détecté en comptant les candidats hors des champs entre guillemets, et vous pouvez aussi le choisir à la main. Virgules internes, guillemets doublés et sauts de ligne dans une cellule sont conservés tels quels.",
      },
    ],
  },
  "excel-to-csv": {
    name: "Excel vers CSV",
    tagline:
      "Transformez n'importe quel classeur .xlsx ou .xls en CSV propre : choisissez la feuille et le délimiteur, puis téléchargez. Guillemets, virgules et sauts de ligne correctement échappés.",
    intro: [
      "Déposez un fichier .xlsx, .xlsm ou .xls et obtenez un CSV conforme à la RFC 4180. Si le classeur contient plusieurs feuilles, vous choisissez celle à exporter — un CSV ne pouvant pas en stocker plusieurs, une feuille par fichier est la correspondance honnête. Les nombres sortent avec la valeur affichée par la feuille.",
      "La sortie ne place des guillemets que sur les cellules qui en ont besoin, double les guillemets internes et conserve les sauts de ligne dans les cellules : le résultat se réimporte dans Excel, une base de données ou un script sans surprise. Copiez-le directement ou téléchargez un fichier UTF-8 avec BOM qui s'ouvre bien dans Excel.",
    ],
    steps: [
      "Déposez votre fichier .xlsx, .xlsm ou .xls dans la zone de dépôt.",
      "S'il y a plusieurs feuilles, choisissez celle à exporter.",
      "Choisissez la virgule, le point-virgule ou la tabulation comme délimiteur.",
      "Copiez le CSV ou téléchargez-le en .csv UTF-8.",
    ],
    faqs: [
      {
        q: "Quelle feuille est convertie ?",
        a: "La première par défaut. Quand le classeur en contient plusieurs, un sélecteur apparaît au-dessus de l'aperçu pour changer ; chaque export ne couvre qu'une seule feuille, car le format CSV ne peut pas en stocker plusieurs.",
      },
      {
        q: "Que deviennent les formules et la mise en forme ?",
        a: "Vous obtenez les dernières valeurs calculées, telles que la cellule les affiche — pas les formules. Une cellule affichant 1 234,50 est exportée avec cette valeur, et les formats comme le symbole monétaire restent tels qu'affichés.",
      },
    ],
  },
  "contrast-checker": {
    name: "Vérificateur de contraste",
    tagline:
      "Calculez le ratio de contraste WCAG entre deux couleurs avec les verdicts AA et AAA pour texte normal et texte grand, ainsi qu'un aperçu en direct. Tout se passe dans votre navigateur.",
    intro: [
      "Saisissez une couleur de premier plan et une couleur de fond — hex comme #333 ou #1F2937, ou rgb()/rgba() — et lisez le ratio de contraste WCAG à deux décimales, avec immédiatement les verdicts des quatre seuils qui comptent : AA et AAA, pour texte normal et texte grand. Un aperçu montre un paragraphe et un titre dans les couleurs réelles.",
      "Le calcul suit la formule officielle de luminance relative de WCAG 2.x, la même que celle du vérificateur du W3C : un 4,5 ici est un 4,5 partout. Parmi les préréglages, une paire grise à 4,54:1 vous fait mesurer à quel point le seuil AA est serré.",
    ],
    steps: [
      "Saisissez une valeur hex ou rgb(), ou utilisez la pipette, pour le premier plan.",
      "Faites de même pour la couleur de fond.",
      "Lisez le ratio et les verdicts AA / AAA, ou touchez un préréglage.",
      "Jugez l'ensemble à l'œil grâce au bloc d'aperçu.",
    ],
    faqs: [
      {
        q: "Quel ratio de contraste faut-il pour passer ?",
        a: "Selon WCAG 2.x : le texte courant exige 4,5:1 pour le niveau AA et 7:1 pour l'AAA. Le texte grand — au moins 24 px, ou 18,7 px en gras — exige 3:1 en AA et 4,5:1 en AAA. Les composants d'interface et les graphiques exigent 3:1.",
      },
      {
        q: "Comment le ratio est-il calculé ?",
        a: "Chaque couleur est linéarisée depuis sRGB puis combinée en une luminance relative L = 0,2126·R + 0,7152·G + 0,0722·B ; le ratio vaut (L clair + 0,05) / (L sombre + 0,05). C'est la formule exacte de la spécification WCAG 2.x. Un alpha rgba() inférieur à 1 est aplati sur blanc avant le calcul.",
      },
    ],
  },
  "grade-calculator": {
    name: "Calculateur de notes",
    tagline:
      "Calculateur de notes pondérées ou par points : ajoutez vos devoirs, suivez votre moyenne et votre lettre en direct, et découvrez exactement la note à viser à l'examen final.",
    intro: [
      "Ajoutez chaque devoir avec sa note, son maximum et (en mode pondéré) son poids en pourcentage : la moyenne et la lettre correspondante se mettent à jour en direct. Le mode par points ne regarde que les points gagnés sur les points possibles, comme beaucoup de cours scientifiques.",
      "La calculatrice d'examen final répond à la vraie question : si le final vaut X % ou X points, quelle note faut-il pour atteindre l'objectif ? Elle dit franchement quand l'objectif est déjà assuré ou mathématiquement hors d'atteinte, et l'échelle est modulable : A–F sur 10 niveaux, avec ±, admis / refusé ou vos propres seuils.",
    ],
    steps: [
      "Ajoutez une ligne par devoir : nom (facultatif), note, maximum et poids en mode pondéré.",
      "Basculez entre Pondéré et Points selon le barème de votre cours.",
      "Saisissez le poids ou les points de l'examen final et votre pourcentage cible.",
      "Lisez la note finale requise, ou choisissez l'échelle de lettres voulue.",
    ],
    faqs: [
      {
        q: "Quelle différence entre le mode pondéré et le mode points ?",
        a: "Le mode pondéré attribue un poids en pourcentage à chaque devoir et calcule Σ(poids × note ÷ maximum) ÷ Σpoids. Le mode points ignore les poids et divise les points gagnés par les points possibles : un devoir à 90/100 vaut là un quiz à 45/50, alors qu'en pondéré il ne vaut que ce que dit son poids.",
      },
      {
        q: "Et si mes poids ne totalisent pas 100 % ?",
        a: "Aucun problème. La moyenne actuelle est normalisée par les poids réellement saisis, donc un cours à moitié évalué reste juste. Le calcul du final empile ensuite le poids de l'examen sur le poids déjà évalué, exactement comme le prévoit le plan de cours. Un résultat supérieur à 100 % signale un objectif hors d'atteinte, un résultat négatif un objectif déjà verrouillé.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* Image                                                               */
  /* ------------------------------------------------------------------ */
  "image-border": {
    name: "Bordure d'image",
    tagline:
      "Ajoutez une bordure unie ou transparente autour d'une image ou de tout un lot — aperçu en direct, sortie PNG ou JPG, tout se passe dans votre navigateur.",
    intro: [
      "Une bordure encadre captures d'écran, photos produits et avatares sans ouvrir un éditeur. Déposez une image ou tout un lot, faites glisser le curseur de largeur et choisissez le style de marge : le canevas s'étend vers l'extérieur, sans qu'un seul pixel de l'original soit recadré ou redimensionné.",
      "Le remplissage transparent garde le cadre voir-à-travers en sortie PNG — pratique pour les stickers et les détourages sur n'importe quel fond. Une couleur unie fonctionne partout, JPG compris, et chaque fichier est traité sur votre appareil.",
    ],
    steps: [
      "Déposez une image ou tout un lot.",
      "Faites glisser le curseur de largeur de bordure et regardez l'aperçu en direct.",
      "Choisissez un remplissage transparent ou une couleur unie, et une sortie PNG ou JPG.",
      "Ajoutez la bordure à toutes les images et téléchargez chaque résultat, ou récupérez tout dans un seul ZIP.",
    ],
    faqs: [
      {
        q: "La bordure réduit-elle ou recadre-t-elle mon image ?",
        a: "Non. Le canevas grandit de deux fois la largeur de la bordure — une bordure par côté — et votre image est placée dedans à taille pleine. Rien n'est recadré, redimensionné ni déplacé.",
      },
      {
        q: "Quand choisir une bordure transparente ?",
        a: "Le remplissage transparent n'a de sens qu'en sortie PNG : le cadre reste voir-à-travers et l'image fonctionne sur n'importe quel fond. Le JPG n'a pas de canal alpha : la bordure y est remplie avec la couleur unie choisie.",
      },
      {
        q: "Pourquoi le JPG n'est-il pas disponible avec un remplissage transparent ?",
        a: "Le JPG ne peut pas stocker de transparence — enregistrer rendrait le cadre blanc. L'outil passe automatiquement au PNG dès qu'un remplissage transparent est sélectionné ; choisissez l'option Couleur si vous voulez un JPG.",
      },
    ],
  },
  "image-splitter": {
    name: "Découper une image",
    tagline:
      "Découpez une image en une grille régulière de lignes × colonnes de tuiles PNG — aperçu de la grille en direct, téléchargement ZIP, tout en local.",
    intro: [
      "Coupez une grande image en tuiles pour les grilles Instagram, les mises en page imprimées, les sprites ou les étapes d'un diaporama. Choisissez de 2 à 6 lignes et de 2 à 6 colonnes, regardez la grille se caler sur votre image, puis exportez chaque tuile en PNG sans perte.",
      "Les tuiles issues d'une même image gardent leurs positions en pixels et se réassemblent parfaitement. Quand la taille ne se divise pas exactement, les tuiles ordinaires prennent des dimensions en pixels entiers et la dernière ligne et colonne absorbent le reste — rien n'est étiré.",
    ],
    steps: [
      "Déposez une image.",
      "Réglez le nombre de lignes et de colonnes (2 à 6 chacune) — l'aperçu affiche la grille.",
      "Découpez en tuiles et vérifiez chaque morceau.",
      "Téléchargez les tuiles une à une ou toutes ensemble dans un ZIP.",
    ],
    faqs: [
      {
        q: "Que se passe-t-il si la taille n'est pas divisible par la grille ?",
        a: "Les tuiles ordinaires mesurent floor(largeur ÷ colonnes) × floor(hauteur ÷ lignes) pixels, et la dernière ligne et colonne absorbent le reste. Une image de 305 × 205 en 3 colonnes × 2 lignes donne des tuiles de 101 × 102 px, la dernière colonne faisant 103 px de large. Chaque tuile compte un nombre entier de pixels — ni étirement, ni interstices.",
      },
      {
        q: "Dans quel ordre les tuiles sont-elles nommées ?",
        a: "Ligne par ligne, de gauche à droite : photo-r1c1.png, photo-r1c2.png … photo-r3c4.png. Le suffixe rNcM indique exactement où se situe chaque tuile, le réassemblage devient trivial.",
      },
      {
        q: "Pourquoi une sortie PNG ?",
        a: "Le PNG est sans perte : les tuiles gardent les pixels exacts de la source. Cela compte quand les morceaux seront recollés ou utilisés comme sprites.",
      },
    ],
  },
  "crop-circle-image": {
    name: "Recadrage circulaire",
    tagline:
      "Recadrez une image ou tout un lot en cercle centré aux coins transparents — curseur de réduction, aperçu en direct, sortie PNG sans perte, 100 % local.",
    intro: [
      "Avatars circulaires, photos de profil, badges et stickers commencent tous par un recadrage circulaire. L'outil centre un cercle sur chaque image, garde ce qu'il contient et jette les coins en transparence — le diamètre part du petit côté, et un curseur le réduit en pourcentage si vous voulez de la marge.",
      "La sortie est toujours PNG pour que les coins restent réellement transparents, pas blancs. Déposez tout un lot pour convertir plusieurs images d'un coup, prévisualisez la première en direct et téléchargez chaque cercle séparément.",
    ],
    steps: [
      "Déposez une image ou tout un lot.",
      "Faites glisser le curseur de réduction si vous voulez le cercle plus petit que tout le petit côté.",
      "Vérifiez l'aperçu en direct de la première image.",
      "Recadrez toutes les images en cercles et téléchargez chaque PNG.",
    ],
    faqs: [
      {
        q: "Qu'est-ce qui détermine la taille du cercle ?",
        a: "Par défaut, le diamètre égale le petit côté de l'image : une image carrée devient un cercle complet et un rectangle est recadré au plus grand cercle centré possible. Le curseur de réduction diminue ce diamètre en pourcentage.",
      },
      {
        q: "Les coins sont-ils blancs ?",
        a: "Non — la sortie est un PNG avec un vrai canal alpha : la zone hors du cercle est totalement transparente et le résultat se pose proprement sur n'importe quel fond.",
      },
      {
        q: "Mon image est-elle réencodée et dégradée ?",
        a: "Les pixels à l'intérieur du cercle sont copiés tels quels dans un PNG sans perte. Seule la zone extérieure disparaît ; rien à l'intérieur n'est redimensionné ni recompressé.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* Développement                                                       */
  /* ------------------------------------------------------------------ */
  "base64-image": {
    name: "Image Base64",
    tagline:
      "Convertissez des images en data URL base64 et inversement — aperçu, validation, téléchargement, comparaison exacte des tailles. Tout dans votre navigateur.",
    intro: [
      "Déposez un PNG, JPEG, GIF, WebP ou SVG et obtenez une URL data:image/…;base64,… prête à coller dans du CSS, HTML ou JSON en ligne. L'outil affiche la taille du fichier d'origine à côté de celle du texte obtenu : vous voyez les ~33 % de surcoût du base64 avant de vous lancer dans l'inlining.",
      "Collez une data URL et la vue inverse la décode : l'image est prévisualisée, le MIME déclaré est confronté aux octets réels, et un bouton de téléchargement la sauvegarde en fichier. Un base64 invalide ou un type qui n'est pas une image échoue avec un message clair plutôt qu'un aperçu cassé.",
    ],
    steps: [
      "Déposez une image dans le panneau (ou collez-en une depuis le presse-papiers) pour l'encoder.",
      "Copiez la data URL — ou seulement le base64 — et consultez la comparaison de tailles avant d'inliner.",
      "Passez à l'onglet de décodage, collez n'importe quelle data URL d'image, puis prévisualisez-la ou téléchargez-la.",
    ],
    faqs: [
      {
        q: "Quand est-ce que ça vaut le coup d'inliner une image en data URL ?",
        a: "Pour les petites icônes, avatares et espaces réservés de chargement. Le base64 grossit le texte de ~33 % par rapport au binaire : en dessous de quelques kilo-octets, on économise généralement une requête HTTP au total ; pour les photos, le surcoût l'emporte presque toujours.",
      },
      {
        q: "Pourquoi la version base64 est-elle plus grosse que mon fichier ?",
        a: "Le base64 encode chaque groupe de 3 octets en 4 caractères de texte — un gonflement fixe de 33 %, plus le préfixe data:image/…;base64,. Rien n'est compressé ni perdu : c'est simplement une représentation textuelle sûre des mêmes octets.",
      },
      {
        q: "Quels formats le décodeur gère-t-il ?",
        a: "Tout ce que votre navigateur sait afficher comme image : PNG, JPEG, GIF, WebP, SVG, BMP, AVIF et plus. L'outil vérifie que la charge est du base64 valide, que le MIME déclaré est bien un type image, et vous avertit quand les octets magiques du fichier ne correspondent pas au type déclaré.",
      },
    ],
  },
  "html-to-markdown": {
    name: "HTML vers Markdown",
    tagline:
      "Transformez le HTML en Markdown propre pendant que vous tapez — titres, listes, liens, images et code, avec titres ATX ou Setext et puce de votre choix.",
    intro: [
      "Collez le balisage d'une page web, d'un export CMS ou d'un e-mail et récupérez instantanément du Markdown lisible. La conversion est confiée à turndown, la bibliothèque de référence HTML vers Markdown : titres, emphase, liens, images, listes ordonnées et non ordonnées, citations et blocs de code trouvent tous leur équivalent Markdown.",
      "Deux petites options couvrent la plupart des guides de style : des titres à la ATX (# Titre) ou à la Setext (soulignés), et le choix de -, * ou + comme puce des listes non ordonnées. Le résultat se met à jour en direct pendant que vous tapez ou changez une option.",
    ],
    steps: [
      "Collez votre HTML dans le panneau d'entrée.",
      "Le Markdown apparaît en direct — ajustez le style de titres ou la puce si votre guide de style préfère autre chose.",
      "Copiez le Markdown ou téléchargez-le en fichier .md.",
    ],
    faqs: [
      {
        q: "Quel HTML est converti, et que devient le reste ?",
        a: "Le balisage de document standard — titres, paragraphes, listes, liens, images, emphase, code, citations et lignes horizontales — est converti en entier. Les éléments sans équivalent Markdown, comme les tableaux et les formulaires, sont aplatis en leur contenu textuel.",
      },
      {
        q: "Quelle différence entre titres ATX et Setext ?",
        a: "ATX écrit les titres avec des dièses en tête (## Titre) ; Setext les souligne avec === pour H1 ou --- pour H2. Setext ne gère que deux niveaux : les titres plus profonds retombent toujours sur des dièses ATX.",
      },
      {
        q: "Mon HTML quitte-t-il le navigateur ?",
        a: "Non. La conversion tourne localement avec turndown dans votre navigateur — rien n'est envoyé, même pas quand vous téléchargez le fichier .md.",
      },
    ],
  },
  "xml-to-json": {
    name: "XML vers JSON",
    tagline:
      "Convertissez du XML en JSON dans votre navigateur — attributs en clés @, éléments répétés en tableaux, et le XML cassé signalé ligne par ligne.",
    intro: [
      "Collez des entrées de sitemap, des items RSS, des réponses SOAP ou des fichiers de config et récupérez immédiatement du JSON joliment imprimé. La conversion utilise fast-xml-parser en conservant les attributs : chaque attribut devient une clé préfixée par @, les éléments frères répétés se regroupent en tableaux, et le contenu texte se loge sous #text quand un élément porte aussi des attributs.",
      "Une entrée malformée ne produit jamais de conversion à moitié devinée : le document est d'abord validé et les erreurs pointent la ligne fautive — une balise fermante oubliée se corrige en une ligne.",
    ],
    steps: [
      "Collez votre XML dans le panneau de gauche.",
      "Le JSON imprimé apparaît à droite pendant que vous tapez.",
      "Copiez le JSON quand c'est bon.",
    ],
    faqs: [
      {
        q: "Comment les attributs sont-ils représentés dans le JSON ?",
        a: 'Chaque attribut devient une clé préfixée par @ — <book id="7"> revient sous la forme { "@id": "7" }. Les valeurs d\'attributs restent des chaînes, tandis que le texte ressemblant à un nombre ou à un booléen est converti vers son type JSON.',
      },
      {
        q: "Que deviennent les éléments répétés ?",
        a: "Les éléments frères de même nom deviennent un tableau JSON. Attention, un élément unique reste une valeur simple : vérifiez la nature tableau si votre consommateur attend des listes.",
      },
      {
        q: "Mon XML est-il envoyé quelque part ?",
        a: "Non. L'analyse se fait localement dans votre navigateur avec fast-xml-parser — rien ne quitte votre appareil.",
      },
    ],
  },
  "json-to-xml": {
    name: "JSON vers XML",
    tagline:
      "Convertissez du JSON en XML bien formé — attributs, éléments répétés, échappement correct, aller-retour avec notre outil XML vers JSON. Tout local.",
    intro: [
      'Collez du JSON et obtenez un document XML imprimé proprement, avec déclaration en bonne et due forme et indentation de 2 espaces. Les objets deviennent des éléments, les tableaux répètent leur clé une fois par élément, et les membres "@key" deviennent des attributs XML — l\'inverse exact de notre convertisseur XML vers JSON, les données peuvent aller et venir.',
      "Tout est échappé dans les règles de l'art (& < > \" ') et les clés arbitraires sont transformées en noms d'éléments légaux : la sortie est toujours un XML bien formé. Les valeurs que XML ne peut pas exprimer — null, tableaux vides — deviennent des éléments vides, et les limites sont détaillées ci-dessous.",
    ],
    steps: [
      "Collez votre JSON dans la zone d'entrée.",
      "Le XML apparaît en direct — définissez un nom d'élément racine personnalisé si besoin.",
      "Copiez le résultat ou téléchargez-le en fichier .xml.",
    ],
    faqs: [
      {
        q: "Comment les attributs et les tableaux se mappent-ils en XML ?",
        a: 'Une clé commençant par @ (ou @_) devient un attribut de son élément parent, et "#text" devient le contenu texte de l\'élément — à l\'identique de ce que produit notre outil XML vers JSON. Les tableaux répètent le même élément une fois par entrée ; un tableau JSON tout en haut est enveloppé en <root><item>…</item></root>, car un document exige une racine unique.',
      },
      {
        q: "Quelles sont les limites du mapping JSON ⇄ XML ?",
        a: "XML n'a pas de notation pour null ni pour les tableaux vides — les deux se réduisent à des éléments vides. Le contenu mixte (du texte parsemé d'éléments enfants) ne peut pas faire d'aller-retour : le texte est gardé d'un bloc. Et à la relecture, un élément répété isolé redevient une valeur simple plutôt qu'un tableau d'un élément.",
      },
      {
        q: "Que deviennent les clés qui ne sont pas des noms XML valides ?",
        a: 'Elles sont transformées : les caractères illégaux deviennent des underscores et une clé commençant par un chiffre reçoit un underscore initial ("2fa" → <_2fa>). Les lettres CJK et accentuées sont déjà des noms XML légaux et restent telles quelles.',
      },
    ],
  },
  "cron-explainer": {
    name: "Explicateur cron",
    tagline:
      "Transformez n'importe quelle expression cron en langage clair : décomposition champ par champ, les cinq prochaines exécutions dans votre fuseau horaire et des préréglages à un clic.",
    intro: [
      "Les expressions cron alignent cinq ou six champs cryptiques qui décident du moment où vos tâches s'exécutent — et un seul caractère erroné peut les faire taire pour toujours, ou les déclencher à 3 h du matin chaque dimanche. Collez une expression : l'outil explique chaque champ (minute, heure, jour du mois, mois, jour de la semaine, et les secondes le cas échéant) puis affiche les cinq prochaines exécutions pour vérifier que la planification fait bien ce que vous croyez.",
      "La validation est honnête et en ligne : valeurs hors limites, plages inversées et extensions Quartz non prises en charge comme L, W et # donnent une erreur précise et compréhensible. Cinq préréglages courants — chaque minute, chaque heure, tous les jours à minuit, en semaine à 9 h et trimestriel — se remplissent en un clic.",
    ],
    steps: [
      "Saisissez une expression cron ou cliquez sur un préréglage pour partir d'une base fiable.",
      "Lisez la décomposition champ par champ en langage clair.",
      "Vérifiez les cinq prochaines exécutions en basculant entre l'heure locale et UTC.",
      "Corrigez dans votre crontab, votre planificateur ou votre CI ce qui vous surprend.",
    ],
    faqs: [
      {
        q: "Quelle différence entre le cron standard et la syntaxe Quartz ?",
        a: "Le cron Unix standard (et cet outil) utilise 5 champs : minute, heure, jour du mois, mois, jour de la semaine — 6 si le premier exprime les secondes. Quartz ajoute les secondes par défaut, un 7ᵉ champ d'année et des extensions comme L (dernier jour), W (jour ouvrable le plus proche) et # (n-ième jour de la semaine, ex. MON#2). Ces extensions propres à Quartz ne sont pas couvertes ici ; tout le standard — nombres, noms comme JAN et MON, plages, listes et pas — l'est.",
      },
      {
        q: "J'ai mis un jour du mois et un jour de semaine : pourquoi cela s'exécute-t-il plus souvent que prévu ?",
        a: "Le cron classique combine les deux avec un OU : quand les deux champs sont restreints (aucun n'est *), un jour qui correspond à l'un ou à l'autre déclenche la tâche. « 0 0 1 * MON » s'exécute le 1ᵉʳ du mois et chaque lundi. Pour exiger les deux conditions à la fois, l'expression doit être construite autrement — consulter ici les prochaines exécutions rend le comportement immédiatement visible.",
      },
    ],
  },
  "gradient-generator": {
    name: "Générateur de dégradés CSS",
    tagline:
      "Mélangez de deux à cinq couleurs en dégradés CSS linéaires, radiaux ou coniques, avec aperçu en direct, code prêt à coller et palettes harmonisées à un clic.",
    intro: [
      "Choisissez de deux à cinq couleurs, optez pour linéaire, radial ou conique, et faites glisser l'angle — l'aperçu se met à jour à la frappe et le CSS reste toujours à une copie de distance. Laissez la position d'une couleur vide et elle est placée automatiquement comme le ferait CSS ; fixez des pourcentages exacts pour des coupes nettes et des mélanges décentrés.",
      "La sortie est un vrai bloc de production : une ligne de couleur pleine de secours pour les navigateurs anciens, une ligne préfixée -webkit- pour les anciens moteurs WebKit et la syntaxe standard en dernier. Le bouton d'harmonisation aléatoire fait tourner les teintes de votre palette dans l'espace TSL, pour que chaque mélange reste équilibré.",
    ],
    steps: [
      "Réglez de deux à cinq couleurs, ou partez d'une palette prédéfinie.",
      "Choisissez le type de dégradé, puis l'angle ou la forme ; épinglez les positions si besoin.",
      "Copiez le bloc CSS et collez-le dans votre feuille de styles.",
    ],
    faqs: [
      {
        q: "Pourquoi le CSS contient-il une ligne préfixée -webkit- ?",
        a: "C'est une ligne de compatibilité pour les anciens moteurs WebKit (époque Safari 5-6 environ) qui ne comprenaient que -webkit-linear-gradient. Tous les navigateurs de la dernière décennie lisent la ligne standard ; vous pouvez donc supprimer la ligne préfixée si vous ne visez pas ces versions — la garder coûte une ligne, la supprimer ne coûte rien.",
      },
      {
        q: "Que signifie l'angle d'un dégradé linéaire ?",
        a: "C'est la direction de propagation du dégradé, mesurée dans le sens horaire depuis le haut : 0deg va de bas en haut, 90deg de gauche à droite, 180deg de haut en bas. L'outil normalise tout angle saisi (−45 devient 315) et la convention inverse de l'ancienne syntaxe est déjà gérée dans la ligne -webkit-.",
      },
    ],
  },
  "compress-image-to-size": {
    name: "Compresser une image à une taille",
    tagline:
      "Réduisez vos images à un budget exact en kilooctets : une recherche binaire sur la qualité JPEG ou WebP va jusqu'où le format le permet — par lots, hors ligne, sans aucun envoi.",
    intro: [
      "Les formulaires d'envoi, les limites des messageries et les champs de CMS imposent une taille, pas un curseur de qualité. Saisissez le plafond en Ko, déposez vos images, et l'outil cherche par dichotomie la qualité d'encodage jusqu'à ce que le fichier passe sous la ligne — en indiquant image par image la qualité exacte et l'échelle éventuellement utilisée.",
      "L'outil est honnête sur la physique : si le plancher de qualité dépasse encore votre cible, l'image est progressivement réduite ; et si une photo grande et détaillée ne peut vraiment pas tenir dans un budget minuscule, vous obtenez le résultat le plus proche, clairement marqué « au-dessus de la cible », jamais une image discrètement dégradée.",
    ],
    steps: [
      "Déposez une image ou tout un lot.",
      "Saisissez la taille cible en Ko et choisissez JPEG ou WebP.",
      "Lancez la compression — chaque ligne affiche la taille obtenue, la qualité et l'échelle utilisées.",
      "Téléchargez les résultats conformes, ou la meilleure copie honnête.",
    ],
    faqs: [
      {
        q: "Pourquoi toutes les images ne peuvent-elles pas atteindre une cible minuscule ?",
        a: "Une photo conserve de l'information même à la qualité la plus basse : une image de 2 Mo à 4000 px ne rentrera sans doute jamais dans 10 Ko. Quand la qualité atteint son plancher, l'outil réduit aussi les pixels — la résolution est l'autre levier qui diminue les octets. Si la cible reste hors d'atteinte, vous recevez le résultat le plus proche avec une mention explicite, jamais un fichier corrompu en silence.",
      },
      {
        q: "Plutôt JPEG ou WebP ?",
        a: "À qualité visuelle égale, WebP est généralement 20 à 30 % plus léger que JPEG : avec un budget strict, il passe donc souvent avec moins de perte. JPEG reste le choix sûr quand le fichier doit s'ouvrir partout, y compris dans des logiciels anciens sans prise en charge de WebP.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* Calculatrices — finance, santé et quotidien (nouveau lot)            */
  /* ------------------------------------------------------------------ */
  "mortgage-calculator": {
    name: "Calculatrice de prêt immobilier",
    tagline:
      "Calculez la mensualité de votre prêt immobilier — capital-intérêts plus taxe, assurance et copropriété — avec le total des intérêts et un tableau d’amortissement annuel.",
    intro: [
      "Saisissez le prix du bien, l’apport, le taux d’intérêt et la durée pour obtenir la mensualité capital-intérêts donnée par la formule d’amortissement standard qu’utilisent les banques. Ajoutez la taxe foncière annuelle, l’assurance annuelle et les charges mensuelles de copropriété pour voir le PITI complet que citent la plupart des prêteurs.",
      "Le montant emprunté, le total des intérêts sur la vie du prêt et un tableau d’amortissement année par année se mettent à jour en direct pendant la saisie : comparez un apport de 20 % à un apport de 10 %, ou une durée de 15 ans à 30 ans, en quelques secondes.",
    ],
    steps: [
      "Saisissez le prix du bien et l’apport, en pourcentage ou en montant.",
      "Réglez le taux d’intérêt annuel et la durée en années.",
      "Ajoutez au besoin la taxe foncière annuelle, l’assurance annuelle et les charges mensuelles de copropriété.",
      "Lisez la mensualité capital-intérêts, le total PITI et le tableau d’amortissement annuel.",
    ],
    faqs: [
      {
        q: "Quelle formule la calculatrice de prêt immobilier utilise-t-elle ?",
        a: "La formule d’amortissement standard à taux fixe : M = L × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1), où L est le montant emprunté (prix moins l’apport), r le taux mensuel (annuel ÷ 12 ÷ 100) et n le nombre de mois. Exemple : une maison de 300 000 avec 20 % d’apport à 6 % sur 30 ans donne une mensualité capital-intérêts d’environ 1 438,92 — le taux saisi est un exemple, pas une offre.",
      },
      {
        q: "Que signifie PITI ?",
        a: "Principal, Intérêts, Taxes et Insurance (assurance) — les quatre parties d’une mensualité de logement typique. L’outil ajoute un douzième de la taxe foncière et de l’assurance annuelles saisies, plus les charges de copropriété, à la mensualité capital-intérêts. Le séquestre des taxes et de l’assurance dépend du prêteur.",
      },
      {
        q: "Pourquoi paie-je tant d’intérêts les premières années ?",
        a: "Chaque mois, les intérêts sont calculés sur le solde restant, qui est maximal au départ. Le tableau d’amortissement montre le basculement : les premières mensualités sont presque tout intérêts, les dernières presque tout capital. Rembourser du capital tôt dans le prêt économise donc le plus d’intérêts.",
      },
    ],
  },
  "salary-to-hourly": {
    name: "Calculatrice salaire en horaire",
    tagline:
      "Convertissez un salaire annuel en taux horaire, journalier, hebdomadaire, bimensuel et mensuel — avec le taux horaire ajusté une fois les jours non payés déduits.",
    intro: [
      "Saisissez un salaire annuel avec votre rythme habituel — heures par semaine et semaines par an — et la calculatrice le décompose dans les unités qu’utilisent les offres d’emploi et les fiches de paye : horaire, journalière, hebdomadaire, bimensuelle et mensuelle. La semaine standard de 40 heures sur 52 semaines est préremplie.",
      "Si vous prenez des jours non payés, le taux horaire ajusté montre ce que le même salaire donne par heure réellement travaillée : chaque jour non payé retire un cinquième de semaine de travail à l’année.",
    ],
    steps: [
      "Tapez le salaire annuel.",
      "Réglez les heures par semaine et les semaines par an (40 et 52 par défaut).",
      "Ajoutez le nombre de jours non payés par an, le cas échéant.",
      "Lisez le taux horaire et les équivalents journalier, hebdomadaire, bimensuel et mensuel.",
    ],
    faqs: [
      {
        q: "Comment le taux horaire est-il calculé ?",
        a: "Taux horaire = salaire annuel ÷ (heures par semaine × semaines par an). Avec les 40 heures et 52 semaines par défaut, un salaire de 52 000 donne exactement 25,00 de l’heure. La paye journalière se base sur une semaine de 5 jours, la paye hebdomadaire est l’annuel divisé par les semaines, la bimensuelle en double la valeur et la mensuelle est l’annuel divisé par 12.",
      },
      {
        q: "Comment les jours non payés changent-ils le résultat ?",
        a: "Chaque jour non payé retire un cinquième de semaine de travail : 10 jours non payés ramènent l’année à environ 50 semaines travaillées. Le taux horaire ajusté divise le même salaire par les heures réellement travaillées : 52 000 à raison de semaines de 40 heures avec 10 jours non payés équivalent à 26,00 de l’heure. Les totaux hebdomadaire et mensuel affichent toujours le salaire indiqué.",
      },
      {
        q: "Les impôts et les retenues sont-ils inclus ?",
        a: "Non — tous les chiffres sont bruts, avant impôt sur le revenu, cotisations sociales et autres retenues. Le net dépend de votre tranche d’imposition et de votre lieu de résidence : considérez ces résultats comme des valeurs brutes de comparaison.",
      },
    ],
  },
  "hourly-to-salary": {
    name: "Calculatrice horaire en salaire",
    tagline:
      "Transformez un taux horaire en paye journalière, hebdomadaire, bimensuelle, mensuelle et annuelle selon votre rythme réel — 40 heures par semaine sur 52 semaines par défaut.",
    intro: [
      "Saisissez un taux horaire avec le rythme auquel il s’applique et la calculatrice le multiplie jusqu’au chiffre annuel que demandent employeurs et prêteurs, plus les montants hebdomadaire, bimensuel et mensuel d’une fiche de paye. Le standard 40 heures, 52 semaines est prérempli ; un temps partiel ne demande que de changer ces deux nombres.",
      "La paye journalière suppose une semaine de 5 jours. Comme chaque chiffre est une multiplication directe, les résultats correspondent à ce qu’une offre salariée devrait payer pour les mêmes heures.",
    ],
    steps: [
      "Tapez le taux horaire.",
      "Réglez les heures par semaine et les semaines par an (40 et 52 par défaut).",
      "Lisez le chiffre annuel et les équivalents mensuel, bimensuel, hebdomadaire et journalier.",
    ],
    faqs: [
      {
        q: "Comment la paye annuelle est-elle calculée à partir du taux horaire ?",
        a: "Annuel = taux horaire × heures par semaine × semaines par an. À 25,00 de l’heure sur une semaine de 40 heures pendant 52 semaines, cela donne exactement 52 000 par an ; le mensuel est l’annuel divisé par 12 et le bimensuel la paye d’une semaine doublée.",
      },
      {
        q: "Et les heures supplémentaires, les pourboires ou le congé non payé ?",
        a: "Ils ne sont pas inclus — le résultat est la multiplication directe pour le rythme saisi. Pour tenir compte des heures supplémentaires, ajoutez grossièrement les heures typiques au champ heures par semaine au même taux ; pour un travail saisonnier ou un congé non payé, réduisez les semaines par an.",
      },
      {
        q: "Pourquoi ma paye réelle diffère-t-elle ?",
        a: "Les chiffres sont bruts. Impôt sur le revenu, sécurité sociale et retenues d’avantages réduisent le net, et beaucoup d’emplois salariés étalent la paye sur 12 mois même quand vous travaillez moins de semaines. Servez-vous du résultat annuel pour comparer des offres, pas comme estimation du net.",
      },
    ],
  },
  "break-even-calculator": {
    name: "Calculatrice de seuil de rentabilité",
    tagline:
      "Trouvez les unités et le chiffre d’affaires où un produit cesse de perdre de l’argent — coûts fixes, prix et coût variable en entrée, marge sur coûts variables et tableau de profit en sortie.",
    intro: [
      "Saisissez vos coûts fixes — loyer, salaires, matériel, les factures payées quel que soit le volume — plus le prix unitaire et le coût variable unitaire. La calculatrice divise les coûts fixes par la marge sur coûts variables, prix moins coût variable, pour donner le nombre d’unités où le profit franchit zéro.",
      "Un mini-tableau montre le profit ou la perte à la moitié, à une fois et demie et au double du volume d’équilibre, pour voir à quelle vitesse la marge s’accumule une fois le seuil franchi. Si le prix ne couvre même pas le coût variable, l’outil le dit au lieu d’afficher un zéro sans signification.",
    ],
    steps: [
      "Saisissez le total des coûts fixes de la période.",
      "Réglez le prix unitaire et le coût variable unitaire.",
      "Lisez les unités et le chiffre d’affaires d’équilibre, plus la marge par unité.",
      "Consultez le tableau de profit à 0,5×, 1,5× et 2× du volume d’équilibre.",
    ],
    faqs: [
      {
        q: "Quelle formule utilise l’analyse du seuil de rentabilité ?",
        a: "Unités d’équilibre = coûts fixes ÷ (prix unitaire − coût variable unitaire). La différence est la marge sur coûts variables : avec 10 000 de coûts fixes, un prix de 50 et un coût variable de 30, chaque vente apporte 20, donc 500 unités — 25 000 de chiffre d’affaires — pour atteindre l’équilibre.",
      },
      {
        q: "Que se passe-t-il si la marge est nulle ou négative ?",
        a: "Alors aucun volume ne peut atteindre l’équilibre, et la calculatrice le dit au lieu de renvoyer un chiffre : chaque unité vendue ajoute de la perte au lieu de couvrir les coûts fixes. Les remèdes sont un prix plus élevé, un coût variable plus bas, ou les deux.",
      },
      {
        q: "Gère-t-il plusieurs produits ou des coûts changeants ?",
        a: "Il modélise un produit à économie unitaire constante — le cas classique du manuel. Pour une gamme de produits, utilisez votre moyenne pondérée prix moins coût variable ; pour les remises de volume ou les coûts fixes par paliers, relancez les calculs par scénario.",
      },
    ],
  },
  "bmr-calculator": {
    name: "Calculatrice du métabolisme de base",
    tagline:
      "Calculez votre métabolisme de base avec l’équation de Mifflin-St Jeor (1990) — les calories que votre corps brûle au repos complet chaque jour.",
    intro: [
      "Votre métabolisme de base (BMR) est l’énergie que votre corps dépense juste pour rester en vie — respirer, faire circuler le sang, se maintenir chaud — avant tout mouvement ou digestion. Cette calculatrice utilise l’équation de Mifflin-St Jeor, publiée en 1990 et toujours le prédicteur largement utilisé le plus précis pour les populations modernes : hommes 10 × poids (kg) + 6,25 × taille (cm) − 5 × âge + 5 ; femmes la même expression moins 161.",
      "Saisissez vos données en unités métriques ou impériales et le résultat se met à jour pendant la frappe. Traitez ce nombre comme une estimation à l’échelle d’une population — généralement à ±10 % environ d’une mesure en laboratoire — pas comme un diagnostic médical.",
    ],
    steps: [
      "Choisissez votre sexe et les unités métriques (cm + kg) ou impériales (ft + in + lb).",
      "Saisissez votre stature, votre poids et votre âge.",
      "Lisez votre BMR en kilocalories par jour.",
      "Alimentez-en la calculatrice de calories pour obtenir maintenance et objectifs.",
    ],
    faqs: [
      {
        q: "Quelle formule est utilisée, et quelle est sa précision ?",
        a: "L’équation de Mifflin-St Jeor, publiée en 1990 et recommandée par l’American Dietetic Association après validation contre la calorimétrie indirecte. Elle prédit la dépense énergétique de repos mesurée à ±10 % environ pour la plupart des adultes, plus précisément que l’ancienne équation de Harris-Benedict (1919).",
      },
      {
        q: "Quelle différence entre BMR et besoins caloriques quotidiens ?",
        a: "Le BMR couvre le repos complet uniquement. Votre dépense réelle est le BMR multiplié par un facteur d’activité — environ 1,2 pour une journée sédentaire jusqu’à 1,9 pour les personnes très actives. La calculatrice de calories applique ce multiplicateur et votre objectif pour vous.",
      },
      {
        q: "Est-ce un conseil médical ?",
        a: "Non — c’est une estimation, pas un conseil médical. Maladie, médicaments, grossesse et compositions corporelles inhabituelles déplacent toutes la dépense énergétique réelle : discutez de tout changement d’alimentation avec un professionnel de santé.",
      },
    ],
  },
  "calorie-calculator": {
    name: "Calculatrice de calories",
    tagline:
      "Transformez votre BMR en objectifs caloriques quotidiens : cinq niveaux d’activité (×1,2–1,9) plus des objectifs perdre, maintenir ou prendre d’environ ±500 kcal par jour.",
    intro: [
      "Les besoins énergétiques quotidiens sont votre BMR multiplié par un facteur d’activité : 1,2 sédentaire, 1,375 légèrement actif, 1,55 modérément actif, 1,725 très actif et 1,9 extra actif. Ce produit — la dépense énergétique totale quotidienne (TDEE) — est ce que demande le maintien de votre poids actuel. Le BMR provient lui-même de l’équation de Mifflin-St Jeor (1990).",
      "Choisissez un objectif et l’outil ajuste le chiffre de maintenance : environ −500 kcal/jour pour perdre à peu près 0,5 kg par semaine, +500 kcal/jour pour prendre, ou aucun changement pour maintenir. L’heuristique des ±500 kcal découle du fait qu’1 kg de graisse corporelle stocke ≈ 7 700 kcal. Tout ici est une estimation — le métabolisme réel s’adapte à mesure que poids et habitudes changent.",
    ],
    steps: [
      "Choisissez votre sexe, vos unités et saisissez taille, poids et âge.",
      "Choisissez le niveau d’activité qui correspond à une semaine type.",
      "Choisissez perdre, maintenir ou prendre.",
      "Lisez la maintenance (TDEE) et vos calories cibles par jour.",
    ],
    faqs: [
      {
        q: "Quels formules et facteurs sont utilisés ?",
        a: "Le BMR selon Mifflin-St Jeor (1990), multiplié par les facteurs d’activité TDEE standard : 1,2 sédentaire, 1,375 légèrement actif, 1,55 modérément actif, 1,725 très actif, 1,9 extra actif. Les objectifs ajoutent ou retranchent environ 500 kcal/jour, l’heuristique classique d’un changement hebdomadaire de 0,5 kg (1 kg de graisse ≈ 7 700 kcal).",
      },
      {
        q: "Un déficit de 500 kcal est-il sûr, et quand verrai-je des résultats ?",
        a: "Environ −500 kcal/jour pour un changement de ≈0,5 kg/semaine est le rythme que la plupart des recommandations de santé publique qualifient de modéré et durable. La perte initiale comprend de l’eau, et la dépense baisse à mesure que vous vous allégez : les résultats hebdomadaires ne sont pas linéaires — recalculez tous les quelques kilos.",
      },
      {
        q: "Est-ce un conseil médical ?",
        a: "Non — c’est une estimation, pas un conseil médical. Si vous êtes enceinte, gérez une maladie chronique, prenez des médicaments ou avez des antécédents de troubles alimentaires, fixez vos objectifs avec un professionnel de santé.",
      },
    ],
  },
  "body-fat-calculator": {
    name: "Calculatrice de masse grasse",
    tagline:
      "Estimez votre pourcentage de graisse avec la méthode du mètre ruban de l’US Navy (Hodgdon & Beckett, 1984) depuis stature, tour de cou et tour de taille — hanche pour les femmes.",
    intro: [
      "La méthode des circonférences de l’US Navy estime le pourcentage de graisse avec un simple mètre ruban. Pour les hommes : %BF = 495 / (1,0324 − 0,19077·log10(tour de taille − tour de cou) + 0,15456·log10(stature)) − 450, tout en centimètres. Les femmes ajoutent la hanche au terme de périmètre — log10(tour de taille + hanche − tour de cou) — et utilisent les coefficients féminins du même article de 1984 de Hodgdon et Beckett.",
      "Mesurez le tour de cou sous le larynx avec le ruban légèrement incliné vers le bas à l’avant, le tour de taille au nombril pour les hommes ou au point le plus étroit pour les femmes, et la hanche à son point le plus fort. Tendez le ruban sans compresser la peau. Le résultat est une estimation avec une erreur typique de ±3 à 4 % face aux méthodes de laboratoire, pas un diagnostic.",
    ],
    steps: [
      "Choisissez votre sexe et les unités métriques ou impériales.",
      "Mesurez et saisissez stature, tour de cou et tour de taille — plus le tour de hanche pour les femmes.",
      "Lisez votre pourcentage de masse grasse estimé.",
      "Remesurez-vous chaque mois dans les mêmes conditions pour suivre la tendance.",
    ],
    faqs: [
      {
        q: "Quelle est la précision de la méthode Navy ?",
        a: "Face à la pesée hydrostatique et au DEXA, les équations Navy de 1984 restent en moyenne à environ 3 à 4 points de pourcentage, avec des erreurs individuelles plus grandes quand la graisse est stockée de façon atypique. La méthode suit bien les changements quand vous mesurez de façon constante — ce qui compte plus pour les progrès que le chiffre absolu.",
      },
      {
        q: "Quelle plage de masse grasse est considérée comme saine ?",
        a: "L’American Council on Exercise cite pour les hommes : 2–5 % de graisse essentielle, 6–13 % athlètes, 14–17 % forme, 18–24 % moyenne, 25 %+ obésité. Pour les femmes : 10–13 % essentielle, 14–20 % athlètes, 21–24 % forme, 25–31 % moyenne, 32 %+ obésité. Les femmes ont besoin de davantage de graisse essentielle pour la fonction hormonale.",
      },
      {
        q: "Pourquoi le résultat sort-il négatif ou impossible ?",
        a: "La formule est imprimée sans bornage, donc des entrées impossibles — par exemple un tour de taille pas plus grand que le tour de cou — produisent des sorties impossibles. Traitez toute valeur sous le niveau de graisse essentielle ou au-dessus d’environ 60 % comme une erreur de mesure et remesurez. Et comme toujours, cette estimation n’est pas un conseil médical.",
      },
    ],
  },
  "ideal-weight-calculator": {
    name: "Calculatrice de poids idéal",
    tagline:
      "Voyez votre poids idéal selon la formule de Devine (1975) et la bande d’IMC saine (18,5–24,9) pour votre taille, affichés en kg ou en livres.",
    intro: [
      "Cette calculatrice montre deux réponses complémentaires. La formule de Devine (1975) — 50 kg + 2,3 kg par pouce au-delà de 5 pieds pour les hommes, 45,5 kg + 2,3 kg par pouce pour les femmes — a été dérivée à l’origine pour doser des médicaments comme la digoxine et reste l’équation de poids idéal la plus citée en médecine. La bande d’IMC saine multiplie votre taille en mètres au carré par 18,5 et 24,9, les limites de la fourchette normale de l’OMS.",
      "Saisissez votre taille en centimètres ou en pieds et pouces. Les deux méthodes divergent d’ordinaire de quelques kilos, et c’est exactement le propos : un poids idéal unique n’existe pas. Traitez les deux nombres comme un cadre de référence autour d’une fourchette saine, pas comme une cible à vous forcer à atteindre — l’estimation n’est pas un conseil médical.",
    ],
    steps: [
      "Choisissez les unités métriques (cm) ou impériales (ft + in).",
      "Saisissez votre taille.",
      "Comparez les estimations de Devine pour hommes et femmes à la bande d’IMC saine.",
      "Utilisez la fourchette, pas un seul nombre, quand vous fixez un objectif de poids.",
    ],
    faqs: [
      {
        q: "D’où vient la formule de Devine ?",
        a: "Le Dr B. J. Devine l’a publiée en 1975 comme moyen rapide d’estimer les poids de dosage de médicaments depuis la taille : 50 kg pour les 5 premiers pieds plus 2,3 kg par pouce supplémentaire pour les hommes, 45,5 kg pour les femmes. Elle n’a jamais été conçue comme un objectif de beauté ou de forme, d’où la bande d’IMC fondée sur l’OMS affichée à côté.",
      },
      {
        q: "Pourquoi une fourchette plutôt qu’un seul nombre ?",
        a: "Parce que le poids sain dépend de la carrure, de la masse musculaire, de l’âge et de l’origine ethnique, aucun chiffre unique ne convient. La bande 18,5–24,9 × taille² provient de la classification BMI de l’OMS et couvre les poids que la recherche associe au risque global le plus bas pour la plupart des adultes.",
      },
      {
        q: "Est-ce un conseil médical ?",
        a: "Non — c’est une estimation, pas un conseil médical. Les athlètes et les personnes très musclées se situent au-dessus de la bande en parfaite santé, et certaines conditions déplacent la fourchette saine. Discutez d’un poids cible avec un professionnel de santé.",
      },
    ],
  },
  "water-intake-calculator": {
    name: "Calculatrice d’apport en eau",
    tagline:
      "Obtenez un objectif d’eau quotidien : 35 ml par kilo de poids corporel plus environ 350 ml par 30 minutes d’exercice, avec des repères par temps chaud.",
    intro: [
      "Cette calculatrice part de l’heuristique standard des fluides d’entretien utilisée en pratique clinique : 35 ml d’eau par kilo de poids corporel chaque jour, avant toute activité. Elle ajoute ensuite environ 350 ml par tranche de 30 minutes d’exercice pour couvrir les pertes par la sueur, et affiche la base et le bonus d’exercice séparément pour que vous voyiez d’où vient le total.",
      "Saisissez votre poids en kilos ou en livres et vos minutes d’exercice par jour. Par temps chaud, ou quand vous transpirez beaucoup, buvez plus que le total calculé ; la nourriture et les autres boissons fournissent aussi de l’eau. Le résultat est une estimation générale d’hydratation, pas un conseil médical.",
    ],
    steps: [
      "Choisissez les unités métriques (kg) ou impériales (lb).",
      "Saisissez votre poids corporel.",
      "Saisissez le nombre de minutes d’exercice par jour.",
      "Lisez la base, le bonus d’exercice et l’objectif quotidien combiné.",
    ],
    faqs: [
      {
        q: "D’où vient la règle des 35 ml/kg ?",
        a: "C’est l’heuristique classique des fluides d’entretien, de la pédiatrie à l’adulte, utilisée dans toute la pratique clinique (souvent citée 30–35 ml/kg/jour pour les adultes). Pour comparaison, l’Autorité européenne de sécurité des aliments situe l’apport total adéquat en eau à 2,0 L/jour pour les femmes et 2,5 L/jour pour les hommes — eau des aliments incluse.",
      },
      {
        q: "Café, thé et nourriture comptent-ils dans le total ?",
        a: "Oui. Environ 20 à 30 % de l’apport quotidien en eau provient normalement des aliments, et les boissons caféinées modérées contribuent à l’hydratation au lieu de la drainer. Le chiffre calculé est un repère de boissons simples en plus d’une alimentation normale : vous n’avez pas à boire la totalité en eau plate.",
      },
      {
        q: "Est-ce un conseil médical ?",
        a: "Non — c’est une estimation générale. Les personnes atteintes de maladies du cœur, des reins ou du foie, et celles à qui l’on a demandé de restreindre les liquides, ont souvent besoin de moins que le montant calculé : suivez les instructions de votre clinicien.",
      },
    ],
  },
  "pace-calculator": {
    name: "Calculatrice d’allure de course",
    tagline:
      "Calculez l’allure au km et au mile depuis n’importe quelle distance et un temps, puis prédisez vos chronos avec la formule exponentielle 1,06 de Peter Riegel.",
    intro: [
      "Saisissez une distance — 5K, 10K, semi-marathon, marathon ou personnalisée en kilomètres ou en miles — plus votre temps d’arrivée, et voyez d’un coup l’allure au kilomètre, l’allure au mile et les vitesses en km/h et mph. Un semi-marathon en 2:00 s’affiche 5:41/km, 9:10/mile et 10,6 km/h sans aucun calcul mental.",
      "Le prédicteur de courses applique la formule d’endurance de Peter Riegel T₂ = T₁ × (D₂/D₁)^1,06 : donnez-lui un résultat de course honnête et il projette votre arrivée attendue sur chaque distance standard, du 5K au marathon.",
    ],
    steps: [
      "Choisissez une distance de course prédéfinie, ou choisissez Personnalisée et saisissez une distance en km ou en miles.",
      "Tapez votre temps d’arrivée en heures, minutes et secondes.",
      "Lisez l’allure au km, l’allure au mile et les deux vitesses — ou basculez vers Prédicteur de course pour les temps projetés à chaque distance.",
    ],
    faqs: [
      {
        q: "D’où vient la formule de prédiction de course ?",
        a: "De Peter Riegel, ingénieur de recherche qui a publié T₂ = T₁ × (D₂/D₁)^1,06 dans Runner’s World en 1977. L’exposant 1,06 capture la façon dont l’allure s’effrite avec la distance : doubler la distance de course prend environ 9 % de temps en plus que le double du temps. Il suppose un entraînement spécifique à la distance visée — il ne prédira pas un marathon à partir d’un 5K rapide si vous n’avez jamais couru long.",
      },
      {
        q: "Pourquoi l’allure au km prédite est-elle plus lente sur les longues courses ?",
        a: "C’est la formule qui fait son travail. L’exposant 1,06 signifie que chaque doublement de distance coûte environ 6 % de temps supplémentaire au-delà du proportionnel, reflétant la déplétion de glycogène, le ravitaillement et la fatigue. Les prédictions plus courtes (10K depuis un semi) sortent plus rapides au km pour la même raison.",
      },
      {
        q: "La calculatrice gère-t-elle les miles aussi bien que les kilomètres ?",
        a: "Oui. Les distances personnalisées acceptent l’une ou l’autre unité, et les résultats sont toujours montrés des deux façons : allure au km et au mile, vitesse en km/h et mph. La conversion utilise le mile international exact de 1,609344 km.",
      },
    ],
  },
  "one-rep-max-calculator": {
    name: "Calculatrice de 1RM",
    tagline:
      "Estimez votre max sur une répétition (1RM) depuis n’importe quelle série poids × reps avec les formules d’Epley et de Brzycki, plus un tableau d’entraînement 1–12 reps en pourcentages du 1RM.",
    intro: [
      "Saisissez un poids soulevé et le nombre de reps propres réalisées, et obtenez votre 1RM estimé par deux formules établies : celle d’Epley w × (1 + reps/30) et celle de Brzycki w × 36/(37 − reps). À 225 lb × 10, les deux tombent exactement sur 300 lb — c’est pourquoi cette série est un classique de salle.",
      "Sous l’estimation, un tableau d’entraînement convertit votre 1RM en charges de travail : la charge maximale attendue pour chaque nombre de reps de 1 à 12, avec son pourcentage du 1RM — les pourcentages que les coachs utilisent pour programmer les blocs de force, d’hypertrophie et d’endurance.",
    ],
    steps: [
      "Saisissez le poids soulevé et choisissez kg ou lb.",
      "Saisissez le nombre de reps réalisées avec une bonne exécution.",
      "Lisez les estimations d’Epley et de Brzycki et le tableau d’entraînement 1–12 reps en dessous.",
    ],
    faqs: [
      {
        q: "Quelle formule faut-il croire ?",
        a: "Ce sont deux estimations issues de séries sous-maximales, les plus précises entre environ 4 et 10 reps. Epley (1976) est légèrement optimiste aux faibles nombres de reps ; Brzycki (1993) légèrement conservateur. L’usage courant est de traiter les deux chiffres comme un intervalle : s’ils concordent à quelques kilos près, votre estimation de 1RM est fiable.",
      },
      {
        q: "Pourquoi le tableau donne-t-il 75 % du 1RM pour 10 reps ?",
        a: "Les pourcentages viennent de l’inversion de l’équation d’Epley : le maximum soulevable pour n reps vaut à peu près 1RM × 30/(30 + n). Dix reps donnent 75 %, cinq reps environ 86 %. Les pourcentages réels varient avec l’exercice (le squat tolère plus de reps que le développé) et avec votre fibre musculaire : prenez le tableau comme point de départ de programmation.",
      },
      {
        q: "Pourquoi ne puis-je pas saisir plus de 20 reps ?",
        a: "Parce que les formules cessent d’avoir du sens là. Au-delà d’environ 12 reps, le résultat est dominé par l’endurance locale plutôt que par la force, et le dénominateur de Brzycki (37 − reps) s’effondre vers zéro. Les séries longues mesurent le conditionnement ; pour en tirer un max, utilisez une formule conçue pour le travail d’endurance.",
      },
    ],
  },
  "sleep-calculator": {
    name: "Calculatrice de sommeil",
    tagline:
      "Trouvez l’heure de coucher idéale pour une heure de lever fixée — ou quand vous réveiller si vous dormez maintenant — avec des cycles de 90 minutes plus 15 minutes d’endormissement.",
    intro: [
      "Se réveiller en plein cycle est ce qui rend les matins terribles, pas le total d’heures dormies. Cet outil planifie le sommeil en cycles complets de 90 minutes : dites-lui quand vous devez vous lever et il liste les heures de coucher qui font sonner le réveil exactement à une frontière de cycle — six cycles (9 heures) jusqu’à trois (4,5 heures), chacun incluant environ 15 minutes pour s’endormir.",
      "Vous allez au lit à l’heure qu’il est ? Le mode inverse ajoute des cycles vers l’avant : endormi à 23:30, vos points de réveil naturels sont 01:15, 02:45, 04:15, 05:45, 07:15 et 08:45 — prenez le plus tôt qui vous laisse assez de repos.",
    ],
    steps: [
      "Choisissez Heure de lever → coucher, ou Dormir maintenant → heures de réveil.",
      "Saisissez l’heure à laquelle vous devez vous lever, ou celle où vous allez au lit.",
      "Choisissez une ligne : chacune est un nombre entier de cycles de 90 minutes, avec la durée de sommeil affichée.",
    ],
    faqs: [
      {
        q: "Les cycles de sommeil font-ils vraiment 90 minutes ?",
        a: "90 minutes est la moyenne communément citée, mais les cycles individuels varient d’environ 80 à 120 minutes, et ceux d’une même personne diffèrent au fil de la nuit. C’est pourquoi ces heures sont des cibles, pas des garanties : si vous restez groggy après deux semaines d’alarmes calées sur les cycles, décalez votre coucher de 15 à 20 minutes et voyez si les matins s’améliorent.",
      },
      {
        q: "Pourquoi le calcul ajoute-t-il 15 minutes ?",
        a: "Parce que le premier cycle ne démarre qu’au moment où vous vous endormez réellement, et que la plupart des gens mettent autour de 10 à 20 minutes. L’outil budget 15 minutes entre le moment d’aller au lit et le début du premier cycle ; si vous vous endormez plus vite ou plus lentement, corrigez mentalement de la différence.",
      },
      {
        q: "De combien de cycles ai-je besoin ?",
        a: "La plupart des adultes se portent bien avec 5 cycles (7,5 heures) et beaucoup ont besoin de 6 (9 heures) ; 4 cycles (6 heures) dépannent certaines personnes à court terme mais rarement à long terme. La régularité du rythme compte autant que le total — les mêmes 6 cycles à des heures de coucher très variables vous laissent en pire état.",
      },
    ],
  },
  "workdays-calculator": {
    name: "Calculatrice de jours ouvrés",
    tagline:
      "Comptez les jours ouvrés entre deux dates ou ajoutez et retirez des jours de travail à une date — avec votre propre définition du week-end et une liste de jours fériés personnalisée.",
    intro: [
      "Les échéances de contrats, les délais de livraison et les compteurs SLA courent en jours ouvrés, pas en jours calendaires. Comptez les jours de travail entre deux dates (les deux bornes incluses : du lundi au vendredi cela fait 5), ou avancez ou reculez de N jours ouvrés depuis une date de base et voyez la date d’atterrissage exacte avec son jour de semaine.",
      "Collez votre propre liste de jours fériés — un AAAA-MM-JJ par ligne — pour exclure les fermetures d’entreprise et les jours fériés, et changez la définition du week-end si votre semaine repose sur vendredi et samedi. Tout le calcul de dates tourne sur des numéros de jour UTC, donc les passages à l’heure d’été ne décalent jamais un résultat d’un jour.",
    ],
    steps: [
      "Choisissez Jours ouvrés entre, ou Ajouter / retirer des jours ouvrés.",
      "Saisissez les deux dates, ou une date de base et le nombre de jours à décaler.",
      "Réglez au besoin les jours de week-end et collez les dates de jours fériés, un AAAA-MM-JJ par ligne.",
      "Lisez le compte avec sa décomposition, ou la date résultante avec son jour de semaine.",
    ],
    faqs: [
      {
        q: "Les dates de bornes sont-elles comptées ?",
        a: "Oui — le comptage entre deux dates inclut les deux extrémités : du lundi 2026-11-02 au vendredi 2026-11-06 cela fait 5 jours ouvrés, et du vendredi au lundi cela en fait 2. En mode ajout/retrait, la date de départ n’est pas consommée : vendredi + 1 jour ouvré tombe lundi, et samedi + 1 tombe aussi lundi.",
      },
      {
        q: "Comment saisir les jours fériés ?",
        a: "Une date par ligne au format AAAA-MM-JJ, par exemple 2026-11-26 pour Thanksgiving américain. Les lignes invalides sont ignorées au lieu de casser le comptage, les doublons sont sans danger, et un jour férié tombant sur votre week-end ne change simplement rien — il était déjà exclu.",
      },
      {
        q: "Pourquoi l’outil mentionne-t-il UTC et l’heure d’été ?",
        a: "L’arithmétique de dates en heure locale peut dériver d’un jour autour des changements d’heure — une plage qui traverse le changement de novembre ou de mars peut sortir d’un jour trop courte ou trop longue selon les navigateurs. Compter en journées UTC entières contourne le problème : du vendredi au lundi fait 2 jours ouvrés partout sur Terre.",
      },
    ],
  },
  "cooking-conversion": {
    name: "Convertisseur de cuisine",
    tagline:
      "Convertissez tasses, cuillères à soupe et cuillères à café en grammes et onces pour 24 ingrédients courants, avec un tableau de four °F↔°C — des moyennes, sans aller-retour serveur.",
    intro: [
      "Une tasse de farine n’est pas une tasse de miel : convertir un volume en poids demande la densité de l’ingrédient, pas un facteur magique unique. Choisissez l’un des 24 ingrédients courants — farine 120 g/tasse, sucre 200, beurre 227, miel 340, cacao 100, flocons d’avoine 90 — et convertissez dans les deux sens entre tasses, cuillères à soupe, cuillères à café, onces liquides, millilitres et litres d’un côté, et grammes, kilogrammes, onces et livres de l’autre.",
      "Les conversions volume-volume (2 tasses = 480 ml) et poids-poids (1 lb = 453,6 g) fonctionnent sans choisir d’ingrédient, et un tableau de four à double sens traduit les réglages °F standards en °C — 350 °F font 175 °C — pour que les recettes étrangères cessent d’être un jeu de devinettes.",
    ],
    steps: [
      "Choisissez l’ingrédient dans la liste (ignorez cela pour volume-volume ou poids-poids).",
      "Saisissez la quantité demandée par la recette.",
      "Choisissez l’unité de départ et l’unité voulue.",
      "Lisez le résultat, ou cherchez la température de four dans le tableau °F↔°C.",
    ],
    faqs: [
      {
        q: "Quelle est la précision des grammes par tasse ?",
        a: "Ce sont des moyennes publiées (King Arthur, USDA et sources proches), et les prélèvements réels varient : une tasse de farine peut différer de ±15 % selon que vous versez à la cuillère en égalisant ou que vous plongez la tasse dans le sac. Les valeurs conviennent à la cuisine de tous les jours ; pour la pâtisserie où la précision compte, pesez vos ingrédients et traitez le tableau comme une estimation.",
      },
      {
        q: "Quelle tasse l’outil utilise-t-il ?",
        a: "La tasse US de cuisine de 240 ml, celle que supposent la plupart des recettes américaines et des tableaux de conversion. Cela fait 16 cuillères à soupe de 15 ml ou 48 cuillères à café de 5 ml. Si une recette a été écrite avec des tasses métriques (250 ml) ou les tasses impériales britanniques (284 ml), les résultats glissent de quelques pourcents — ajustez en conséquence.",
      },
      {
        q: "Pourquoi 350 °F donnent 175 °C et pas 176,7 °C ?",
        a: "La conversion exacte est (350 − 32) × 5/9 = 176,7 °C, mais les fours sont gradués par pas de 5 à 10 degrés et les auteurs de recettes arrondissent au réglage familier le plus proche : 175 °C est donc l’appariement standard. Le tableau montre ces paires conventionnelles ; la vraie température du four est de toute façon approximative.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* Développement — générateur d’images placeholder                      */
  /* ------------------------------------------------------------------ */
  "placeholder-image-generator": {
    name: "Générateur d’images placeholder",
    tagline:
      "Générez des images placeholder de toute taille en SVG, PNG ou JPG — choisissez couleurs et libellé, prévisualisez à l’instant, puis téléchargez le fichier ou copiez le balisage SVG.",
    intro: [
      "Les maquettes et wireframes ont besoin de boîtes d’image avant que les vrais visuels existent. Tapez une largeur et une hauteur — un hero en 1200×630, un avatar en 256×256, ou n’importe quoi de 1×1 jusqu’à 5000×5000 — choisissez les couleurs de fond et de texte, ajoutez au besoin un libellé, et le placeholder se dessine en direct pendant la frappe.",
      "Téléchargez le résultat en SVG, PNG ou JPG, ou copiez le balisage SVG directement dans le presse-papiers : ce sont quelques éléments lisibles, pas une soupe de base64, donc vous pouvez le coller dans HTML, JSX ou Figma et modifier texte et couleurs à la main. Tout est généré dans votre navigateur ; rien n’est envoyé.",
    ],
    steps: [
      "Saisissez la largeur et la hauteur en pixels.",
      "Réglez les couleurs de fond et de texte, et un libellé facultatif (par défaut : les dimensions).",
      "Téléchargez en SVG, PNG ou JPG — ou copiez le balisage SVG et collez-le n’importe où.",
    ],
    faqs: [
      {
        q: "Quand utiliser SVG plutôt que PNG ou JPG ?",
        a: "SVG est du texte : minuscule, infiniment redimensionnable et modifiable à la main, ce qui en fait l’idéal pour maquettes, docs et mises en page compatibles e-mail. PNG est le choix plus sûr pour les plateformes qui mutilent le SVG en ligne (certains CMS et messageries), et JPG convient aux placeholders photoréalistes à petite taille de fichier. L’aperçu est identique pour les trois.",
      },
      {
        q: "Quelles limites de taille et de couleur ?",
        a: "Largeur et hauteur doivent être des nombres entiers entre 1 et 5000 pixels ; les couleurs doivent être hex — #RRGGBB ou la forme courte #RGB. Tout le reste est rejeté avec une indication au lieu de produire en silence une image cassée.",
      },
      {
        q: "Quelque chose est-il envoyé à un serveur ?",
        a: "Non. Le SVG est construit à partir d’un gabarit de chaîne dans votre navigateur et les versions raster sont dessinées sur un canvas local. Rien ne quitte la page : cela fonctionne hors ligne et reste sûr pour des designs non publiés.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* Calculatrices et minuteurs — paie, loyer, épargne, santé, temps      */
  /* ------------------------------------------------------------------ */
  "overtime-pay-calculator": {
    name: "Calculatrice d’heures supplémentaires",
    tagline:
      "Calculez vos heures supplémentaires à 1,5× ou 2× du taux horaire — paye régulière, majoration, total hebdomadaire et équivalent annualisé depuis un salaire.",
    intro: [
      "Saisissez un taux horaire — ou un salaire annuel que la calculatrice convertit à partir de vos heures hebdomadaires habituelles — puis ajoutez les heures supplémentaires que vous prévoyez de travailler. Les résultats séparent la paye régulière de la majoration : heure et demie par défaut, double si votre contrat ou les règles locales la payent.",
      "Tout se met à jour en direct : le taux majoré, la paye régulière et supplémentaire de la semaine, le total hebdomadaire combiné, puis l’équivalent annualisé une fois multiplié par les semaines réellement travaillées dans l’année. Le calcul reflète la façon dont le Fair Labor Standards Act (FLSA) des États-Unis rémunère les heures supplémentaires des employés non exemptés.",
    ],
    steps: [
      "Saisissez votre taux horaire, ou passez en mode salaire et tapez votre paye annuelle.",
      "Réglez vos heures hebdomadaires régulières (40 par défaut) et vos semaines par an.",
      "Ajoutez les heures supplémentaires et choisissez le multiplicateur — 1,5× ou 2×.",
      "Lisez le taux majoré, la répartition hebdomadaire et le total annualisé.",
    ],
    faqs: [
      {
        q: "Quand les heures supplémentaires sont-elles obligatoires aux États-Unis ?",
        a: "Selon le FLSA, les employés non exemptés doivent percevoir au moins 1,5 fois leur taux habituel pour chaque heure travaillée au-delà de 40 dans la semaine de travail. L’exemption dépend des fonctions et du niveau de salaire ; certains États vont plus loin — la Californie déclenche par exemple des heures supplémentaires quotidiennes au-delà de 8 heures. Un taux horaire de 25,00 rapporte 37,50 pour chaque heure supplémentaire.",
      },
      {
        q: "Comment le mode salaire convertit-il mon salaire en taux horaire ?",
        a: "Il divise le salaire annuel par les heures hebdomadaires régulières × les semaines par an — la même base que la conversion salaire en taux horaire. Un salaire de 52 000 sur des semaines de 40 heures et 52 semaines donne exactement 25,00 de l’heure, donc cinq heures supplémentaires à 1,5× ajoutent 187,50 au-dessus de la semaine régulière de 1 000,00.",
      },
      {
        q: "Tout mon salaire entre-t-il dans le taux des heures supplémentaires ?",
        a: "Le FLSA calcule la majoration sur le « taux habituel », qui peut dépasser le salaire de base — les primes de poste et les bonus non discrétionnaires en sont des exemples. Cette calculatrice utilise un taux de base simple : si vous percevez ces compléments, votre taux légal d’heures supplémentaires peut être supérieur à celui affiché ici.",
      },
    ],
  },
  "rent-affordability-calculator": {
    name: "Calculatrice de loyer abordable",
    tagline:
      "Trouvez le loyer maximal que votre revenu mensuel supporte selon la règle des 30 %, 33 % ou 40 % — puis voyez ce qui reste après dettes et assurance locataire.",
    intro: [
      "Saisissez votre revenu mensuel (brut ou net), choisissez un taux d’effort — le classique 30 % du brut, un 33 % plus souple, ou 40 % du net pour les villes chères — et la calculatrice trace votre plafond de loyer. Vos autres mensualités de dettes et l’assurance locataire sont ensuite déduites, pour que le chiffre affiché soit réellement vivable.",
      "Vous obtenez aussi le taux d’endettement que représenterait ce loyer maximal, celui que les prêteurs examinent avant d’approuver un bail ou un crédit. La ligne budget passe honnêtement en négatif quand loyer et dettes dépassent le revenu — le signal qu’il vaut mieux chercher un loyer moins cher que forcer.",
    ],
    steps: [
      "Saisissez votre revenu mensuel et précisez s’il est brut ou net.",
      "Choisissez le taux d’effort : 30 %, 33 % ou 40 %.",
      "Ajoutez vos autres mensualités de dettes et l’assurance locataire, le cas échéant.",
      "Lisez le plafond de loyer, le budget restant et votre taux d’endettement.",
    ],
    faqs: [
      {
        q: "D’où vient la règle des 30 % pour le loyer ?",
        a: "Elle remonte au Brooke Amendment américain de 1969, qui plafonnait le loyer des logements publics à 25 % du revenu avant qu’il ne soit relevé à 30 % en 1981. Le HUD qualifie toujours de « cost-burdened » les ménages qui consacrent plus de 30 % de leurs revenus au logement — c’est pourquoi les 30 % du brut sont restés le repère du loyer abordable.",
      },
      {
        q: "Faut-il budgétiser le loyer sur le brut ou le net ?",
        a: "La règle classique des 30 % s’applique au revenu brut : elle ignore les impôts et paraît donc plus généreuse que votre fiche de paye. Si vous préférez planifier sur le net, un taux plus élevé comme 40 % du net arrive à peu près au même endroit. L’essentiel est de choisir une base et de s’y tenir.",
      },
      {
        q: "Que signifie le taux d’endettement affiché ici ?",
        a: "C’est la part de votre revenu absorbée par le loyer maximal plus vos dettes et assurances déclarées. Les prêteurs apprécient généralement un taux d’endettement total inférieur à 36 % ; au-delà d’environ 43 %, il devient difficile d’obtenir un crédit immobilier. Un chiffre élevé signifie que le plafond de loyer est trop agressif face à vos autres engagements.",
      },
    ],
  },
  "apy-calculator": {
    name: "Calculatrice APY",
    tagline:
      "Convertissez un APR nominal en APY effectif — et inversement — pour capitalisation quotidienne, mensuelle, trimestrielle ou annuelle, avec dépôt en option.",
    intro: [
      "Un taux nominal et un taux effectif ne sont pas le même nombre, et les publicités choisissent discrètement celui qui arrange. Saisissez un taux et une fréquence de capitalisation — quotidienne (365), mensuelle, trimestrielle ou annuelle — et la calculatrice convertit l’APR en APY, ou l’APY en APR nominal qui le produirait.",
      "Ajoutez un dépôt facultatif et un horizon en années pour voir ce que l’argent devient réellement : le solde après capitalisation et les intérêts gagnés par-dessus. La conversion est exacte dans les deux sens — changez de direction et vérifiez l’aller-retour contre n’importe quel taux annoncé par une banque.",
    ],
    steps: [
      "Tapez le taux qui vous a été annoncé — APR nominal ou APY effectif.",
      "Choisissez la fréquence de capitalisation : quotidienne, mensuelle, trimestrielle ou annuelle.",
      "Ajoutez au besoin un dépôt et un nombre d’années pour projeter la croissance.",
      "Lisez le taux converti, le solde final et les intérêts gagnés.",
    ],
    faqs: [
      {
        q: "Pourquoi l’APY dépasse-t-il l’APR à taux nominal égal ?",
        a: "Parce que la capitalisation paie des intérêts sur les intérêts. APY = (1 + r ÷ n)^n − 1 : un taux nominal de 12 % capitalisé mensuellement devient (1,01)^12 − 1 = 12,6825 % effectif — les 0,6825 points d’écart sont les intérêts que vos intérêts gagnent. Plus la capitalisation est fréquente, plus l’écart se creuse : le quotidien bat le mensuel, qui bat l’annuel.",
      },
      {
        q: "Quel taux comparer entre banques ?",
        a: "Comparez APY contre APY pour l’épargne et les dépôts à terme — il intègre déjà la fréquence de capitalisation, donc un APY de 5,10 % capitalisé mensuellement est réellement meilleur qu’un APY de 5,05 % capitalisé annuellement. Pour les prêts, comparez APR contre APR. Mélanger un APR et un APY dans une même comparaison est exactement ainsi que les devis induisent en erreur.",
      },
      {
        q: "L’option quotidienne utilise-t-elle 365 ou 360 jours ?",
        a: "Cette calculatrice utilise 365 périodes par an, la convention que suivent la plupart des comptes d’épargne grand public. Certains produits financiers annualisent plutôt sur une base de 360 jours, ce qui décale légèrement le taux effectif — si les petites lignes disent 360, considérez le résultat comme une bonne approximation plutôt que comme un taux exact.",
      },
    ],
  },
  "gpa-calculator": {
    name: "Calculatrice de moyenne GPA",
    tagline:
      "Transformez les cours du semestre en GPA sur l’échelle 4,0 — points de qualité standards — puis intégrez vos crédits antérieurs dans un GPA cumulatif honnête.",
    intro: [
      "Ajoutez chaque cours avec ses crédits et sa note en lettres, et la calculatrice applique la table standard des points de qualité sur 4,0 — A = 4,0, A− = 3,7, B+ = 3,3, etc. — en pondérant chaque note par ses crédits. Un A sur 4 crédits pèse plus qu’un A sur 3 crédits, exactement comme sur votre relevé de notes.",
      "Vous avez déjà des notes derrière vous ? Saisissez votre GPA antérieur et les crédits obtenus à ce jour : le résultat du semestre se fond dans un GPA cumulatif selon la même moyenne pondérée que celle de votre administration. Les lignes incomplètes sont ignorées plutôt que devinées, le chiffre ne reflète donc que les cours réellement renseignés.",
    ],
    steps: [
      "Ajoutez une ligne par cours : intitulé (facultatif), crédits et note en lettres.",
      "Laissez les champs antérieurs vides au premier semestre, ou saisissez votre GPA à ce jour.",
      "Saisissez les crédits déjà obtenus pour que la fusion soit pondérée correctement.",
      "Lisez le GPA du semestre et le GPA cumulatif combiné.",
    ],
    faqs: [
      {
        q: "Combien de points de qualité vaut chaque note ?",
        a: "Sur l’échelle 4,0 standard : A+ et A = 4,0, A− = 3,7, B+ = 3,3, B = 3,0, B− = 2,7, C+ = 2,3, C = 2,0, C− = 1,7, D+ = 1,3, D = 1,0, D− = 0,7 et F = 0. GPA = Σ(points × crédits) ÷ Σcrédits : un A sur 4 crédits apporte 12 points de qualité, contre 9,9 pour un B+ sur 3 crédits.",
      },
      {
        q: "Comment le GPA cumulatif fusionne-t-il deux relevés ?",
        a: "GPA cumulatif = (GPA du semestre × crédits du semestre + GPA antérieur × crédits antérieurs) ÷ crédits totaux. Exemple : un semestre à 3,60 sur 7 crédits par-dessus un dossier à 3,00 sur 60 crédits donne (3,60 × 7 + 3,00 × 60) ÷ 67 ≈ 3,06. La pondération par crédits empêche un semestre léger de fausser votre dossier.",
      },
      {
        q: "Pourquoi une ligne sans note ni crédits ne change-t-elle pas mon GPA ?",
        a: "Un cours ne compte que si ses crédits et sa note en lettres sont tous deux présents — toute ligne à moitié remplie est écartée plutôt que comptée pour zéro, afin que le GPA reflète les cours réellement terminés. Complétez la ligne et les totaux se mettent à jour immédiatement.",
      },
    ],
  },
  "heart-rate-zones-calculator": {
    name: "Calculatrice de zones de fréquence cardiaque",
    tagline:
      "Convertissez fréquences max et de repos en cinq zones d’entraînement Karvonen — échauffement, graisses, aérobie, anaérobie et VO₂ max, en bpm.",
    intro: [
      "Saisissez votre âge et votre fréquence cardiaque de repos : la calculatrice estime votre fréquence maximale (206,9 − 0,67 × âge, une régression établie sur des maxima mesurés en laboratoire), puis découpe l’écart entre repos et maximum en cinq zones d’entraînement classiques. Une personne de 30 ans au repos à 60 bpm obtient un maximum proche de 187 bpm et une zone aérobie Z3 d’environ 149–161 bpm — des chiffres réels à confronter à une ceinture cardio ou à une montre.",
      "Les zones suivent la méthode Karvonen de réserve de fréquence cardiaque : bpm = repos + % × (max − repos). Comme c’est la réserve — et non le maximum — qui est proportionnée, les zones restent justes pour les personnes dont le rythme de repos est inhabituellement bas ou élevé. Vous connaissez votre maximum mesuré, en test d’effort ou lors d’une course très intense ? Passez en mode manuel et entrez-le directement.",
    ],
    steps: [
      "Saisissez votre âge pour estimer la fréquence maximale, ou passez en mode Manuel et entrez une valeur mesurée.",
      "Saisissez votre fréquence de repos — la mesure du matin, avant de vous lever, est la meilleure.",
      "Lisez les cinq zones avec leur % de réserve et leur plage en bpm.",
      "Pendant l’effort, calibrez votre montre ou votre ceinture sur la zone visée.",
    ],
    faqs: [
      {
        q: "206,9 − 0,67 × âge est-il plus précis que 220 − âge ?",
        a: "Oui, à l’échelle d’une population. L’ancienne règle 220 − âge remonte à un tableau des années 1970 jamais relu par les pairs et surestime la fréquence maximale des personnes âgées. Les régressions modernes ajustées sur des maxima mesurés en laboratoire — le 208 − 0,7 × âge de Tanaka, le 207 − 0,7 × âge de Gellish et des équations proches comme le 206,9 − 0,67 × âge utilisé ici — suivent bien mieux les maxima réels à tout âge. Mais chaque équation garde une dispersion individuelle d’environ ±10 bpm : l’estimation est un point de départ, et un maximum mesuré en laboratoire ou lors d’un effort vraiment maximal reste la référence.",
      },
      {
        q: "Pourquoi la réserve de fréquence cardiaque (HRR) plutôt qu’un pourcentage du maximum ?",
        a: "La méthode Karvonen mesure l’intensité dans l’écart entre fréquence de repos et fréquence maximale, la part qui travaille réellement. En % du maximum direct, la zone 60–70 % donne 112–131 bpm pour l’exemple de 30 ans ci-dessus ; en % de réserve, 136–149 bpm. Physiologiquement, l’effort suit la réserve utilisée : les zones basées sur la réserve collent mieux aux seuils ventilatoires et à la sensation d’effort — surtout chez les personnes au rythme de repos bas.",
      },
      {
        q: "Comment mesurer ma fréquence de repos ?",
        a: "Prenez-la le matin, au réveil et avant de sortir du lit : comptez votre pouls pendant 60 secondes (ou 30 secondes × 2) et répétez quelques jours pour lisser les variations. La moyenne de repos sur 7 jours d’un bracelet connecté convient aussi. Un adulte typique se situe entre 60 et 80 bpm ; les athlètes d’endurance bien entraînés descendent souvent dans la quarantaine ou la cinquantaine. Si votre rythme de repos dépasse votre maximum estimé — ou si un médicament comme un bêta-bloquant agit sur votre rythme — saisissez les deux valeurs manuellement.",
      },
    ],
  },
  "shoe-size-converter": {
    name: "Convertisseur de pointures",
    tagline:
      "Convertissez les pointures entre les systèmes US, UK, EU et japonais pour hommes et femmes — ancrées à la longueur du pied en centimètres.",
    intro: [
      "Choisissez n’importe quel système et taille, et tous les équivalents s’affichent d’un coup, ancrés à la longueur du pied en centimètres pour une comparaison physique plutôt qu’un pari.",
      "Le chaussant n’est pas normalisé d’une marque à l’autre — prenez les résultats comme un point de départ et mesurez vos pieds en fin de journée, au moment où ils sont les plus larges.",
    ],
    steps: [
      "Choisissez le barème homme ou femme.",
      "Sélectionnez le système que vous connaissez et saisissez la taille.",
      "Lisez les tailles équivalentes dans tous les autres systèmes.",
    ],
    faqs: [
      {
        q: "Pourquoi les marques varient-elles d’une demi-pointure ?",
        a: "Les formes des modèles et la fabrication varient. Le tableau donne la conversion standard ; certaines marques taillent petit ou grand, alors consultez toujours le guide des tailles de la marque avant de commander en ligne.",
      },
      {
        q: "Comment mesurer mes pieds ?",
        a: "Debout sur une feuille de papier en fin de journée, tracez vos deux pieds et mesurez du talon au doigt de pied le plus long, en centimètres. Retenez le pied le plus grand.",
      },
    ],
  },
  "stopwatch": {
    name: "Chronomètre",
    tagline:
      "Un chronomètre en ligne précis avec temps au tour — démarrage, pause, tour et remise à zéro, avec une mesure sans dérive ancrée sur l’horloge système.",
    intro: [
      "Il mesure le temps écoulé au centième de seconde à partir de l’horloge système plutôt qu’en cumulant des intervalles : la mesure reste exacte même quand le navigateur ralentit un onglet en arrière-plan.",
      "Enregistrez des tours pendant la mesure ; chaque tour affiche son intermédiaire et le total courant, sur de grands chiffres tabulaires lisibles d’un coup d’œil.",
    ],
    steps: [
      "Cliquez sur Démarrer pour lancer la mesure.",
      "Cliquez sur Tour pour enregistrer un intermédiaire sans arrêter le chronomètre.",
      "Mettez en pause, reprenez ou remettez à zéro à tout moment.",
    ],
    faqs: [
      {
        q: "La mesure est-elle précise ?",
        a: "Oui — le temps écoulé est calculé à partir de Date.now() par rapport à un horodatage de départ fixe, et non en cumulant des rappels de minuteur : le ralentissement d’un onglet en arrière-plan ne peut pas créer de dérive.",
      },
      {
        q: "Les tours survivent-ils au rechargement de la page ?",
        a: "Non — comme un chronomètre physique, la remise à zéro ou le rechargement efface la session. Gardez l’onglet ouvert pour conserver vos tours.",
      },
    ],
  },
  "countdown-timer": {
    name: "Minuteur",
    tagline:
      "Programmez un compte à rebours avec un anneau de progression et une sonnerie à zéro — préréglages de 1 à 25 minutes ou n’importe quelle durée personnalisée.",
    intro: [
      "Un compte à rebours épuré pour la cuisine, le sport, les réunions et les révisions. L’anneau montre la progression d’un coup d’œil, et une courte sonnerie synthétisée retentit quand le temps est écoulé.",
      "L’échéance est ancrée sur l’horloge système : le compte à rebours continue de courir correctement même si vous passez à un autre onglet.",
    ],
    steps: [
      "Réglez heures, minutes et secondes — ou touchez un préréglage rapide.",
      "Cliquez sur Démarrer ; l’anneau se vide à mesure que le temps passe.",
      "Une sonnerie retentit et l’anneau passe au vert à zéro.",
    ],
    faqs: [
      {
        q: "Continue-t-il dans un onglet en arrière-plan ?",
        a: "Oui — l’échéance est ancrée sur l’horloge système : changer d’onglet ou un ralentissement ne modifie pas le temps restant.",
      },
      {
        q: "Entendrai-je la sonnerie ?",
        a: "C’est une courte tonalité synthétisée via WebAudio. Gardez l’onglet non muet et le volume de l’appareil monté ; aucun fichier audio à télécharger.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* Développement — TypeScript, diff JSON, chemins JSON, YAML            */
  /* ------------------------------------------------------------------ */
  "json-to-typescript": {
    name: "JSON vers TypeScript",
    tagline:
      "Générez des interfaces TypeScript à partir de n'importe quel JSON — objets imbriqués, tableaux et unions, prêts à coller dans votre projet.",
    intro: [
      "Collez une réponse JSON et obtenez instantanément des interfaces typées : les objets imbriqués deviennent des interfaces nommées, les tableaux d'objets fusionnent en une seule forme, les tableaux mixtes deviennent des unions. Le nom de la racine est configurable.",
      "Pensé pour le travail avec les API — collez la réponse d'un endpoint, copiez les types, et laissez le compilateur repérer les changements de forme à votre place.",
    ],
    steps: [
      "Collez votre JSON (une réponse d'API fonctionne le mieux).",
      "Changez le nom de l'interface racine si vous voulez autre chose que Root.",
      "Copiez les interfaces générées dans votre projet.",
    ],
    faqs: [
      {
        q: "Comment les tableaux sont-ils gérés ?",
        a: "Les tableaux d'objets fusionnent les clés de tous les éléments en une seule interface (une clé manquante serait de toute façon une erreur à l'exécution). Les tableaux de types mélangés deviennent une union comme string | number. Les tableaux vides dégradent en unknown[].",
      },
      {
        q: "Tous les champs sont-ils requis ?",
        a: "Oui — un seul échantillon ne prouve pas l'optionalité, donc tout est requis. Marquez vous-même les champs optionnels là où votre API autorise null ou des clés absentes.",
      },
    ],
  },
  "json-diff": {
    name: "Comparateur JSON",
    tagline:
      "Comparez deux JSON chemin par chemin — clés ajoutées, supprimées et modifiées avec valeurs avant/après, le tout en local dans votre navigateur.",
    intro: [
      "Collez deux documents JSON et voyez chaque différence structurelle : clés ajoutées, clés supprimées, valeurs modifiées — chacune signalée par son chemin complet, comme $.user.name.",
      "Les objets et tableaux imbriqués sont parcourus récursivement : un changement enfoui à trois niveaux de profondeur apparaît quand même avec son chemin exact et les deux valeurs.",
    ],
    steps: [
      "Collez le premier JSON (la version d'origine).",
      "Collez le second JSON (la nouvelle version).",
      "Lisez la liste des différences — chaque ligne est un changement au niveau d'un chemin.",
    ],
    faqs: [
      {
        q: "Comment les tableaux sont-ils comparés ?",
        a: "Par index : l'élément 0 contre l'élément 0, et ainsi de suite. Les éléments en trop d'un côté apparaissent comme ajoutés ou supprimés à leur index.",
      },
      {
        q: "L'ordre des clés compte-t-il ?",
        a: "Non — les objets sont comparés par clés, pas par ordre d'insertion. Deux documents avec les mêmes clés dans un ordre différent sont identiques.",
      },
    ],
  },
  "json-path-query": {
    name: "Requête JSON Path",
    tagline:
      "Extrayez n'importe quelle valeur d'un JSON avec un chemin comme $.user.name ou $.items[0].id — instantané, tolérant, sans syntaxe jq à apprendre.",
    intro: [
      "Visez exactement la valeur qu'il vous faut : notation par points, index de tableaux et clés entre guillemets fonctionnent ($.items[0].id, $['weird key']). Idéal pour sortir un champ d'une réponse d'API volumineuse.",
      "Ne plante jamais — un chemin erroné renvoie une raison en clair (clé introuvable, index hors limites) pour corriger et réessayer.",
    ],
    steps: [
      "Collez votre JSON.",
      "Tapez le chemin vers la valeur voulue — $ désigne la racine.",
      "Copiez la valeur extraite.",
    ],
    faqs: [
      {
        q: "Quelle syntaxe de chemin est prise en charge ?",
        a: "Le sous-ensemble du quotidien : notation par points ($.a.b), index de tableaux ($.items[0]), clés entre guillemets ($['odd key']). Les filtres et wildcards du JSONPath complet sont hors périmètre — cet outil fait de l'extraction directe.",
      },
      {
        q: "Que se passe-t-il avec un chemin erroné ?",
        a: "Vous obtenez la raison exacte : quelle clé manquait ou quel index dépassait les limites. Rien ne plante.",
      },
    ],
  },
  "json-yaml-converter": {
    name: "Convertisseur JSON ⇄ YAML",
    tagline:
      "Convertissez du JSON en YAML et inversement — prêt pour vos fichiers de config, avec bouton d'inversion pour enchaîner et messages d'erreur précis.",
    intro: [
      "Conversion bidirectionnelle entre JSON et YAML : collez du JSON, obtenez un YAML propre indenté à 2 espaces pour vos fichiers de config ; collez du YAML, obtenez du JSON. Le bouton d'inversion change le sens pour enchaîner l'aller-retour dans un seul panneau.",
      "Propulsé par js-yaml avec des erreurs précises — une mauvaise indentation ou une clé dupliquée vous montre exactement ce qui cloche au lieu d'un échec cryptique.",
    ],
    steps: [
      "Collez du JSON ou du YAML selon le sens souhaité.",
      "Cliquez sur convertir — le résultat apparaît en dessous.",
      "Utilisez le bouton d'inversion pour continuer la conversion dans l'autre sens.",
    ],
    faqs: [
      {
        q: "Quelles fonctionnalités YAML sont prises en charge ?",
        a: "Le schéma core standard de js-yaml : mappings imbriqués, séquences, scalaires, chaînes entre guillemets. Les ancres YAML et les tags personnalisés sont hors périmètre pour garantir des aller-retours fiables.",
      },
      {
        q: "Pourquoi ma conversion a-t-elle échoué ?",
        a: "Le plus souvent, une tabulation dans l'indentation YAML (les tabs y sont interdits) ou des clés dupliquées dans le JSON. Le message d'erreur pointe le problème.",
      },
    ],
  },
};
