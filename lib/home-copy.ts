import type { Locale } from "@/lib/site";

type HomeCopy = {
  title: [string, string, string];
  description: string;
  count: string;
  try: string;
  noSignup: string;
  localFiles: string;
  free: string;
  categories: string;
  browseCategories: string;
  privacyEyebrow: string;
  privacyTitle: string;
  privacyBody: string;
  favoritesEmpty: string;
  footer: string;
};

/** Homepage copy keeps the original design's concise hierarchy without blanket network claims. */
export const HOME_COPY: Record<Locale, HomeCopy> = {
  en: {
    title: ["Your tools.", "Your files.", "Your privacy."],
    description:
      "Free browser tools for PDFs, images, text, code and everyday tasks.",
    count: "{n} free online tools",
    try: "Try:",
    noSignup: "No signup",
    localFiles: "No uploads for local tools",
    free: "Free to use",
    categories: "Explore by category",
    browseCategories: "Browse all categories",
    privacyEyebrow: "Privacy by design",
    privacyTitle: "Local tools. Your files stay yours.",
    privacyBody:
      "File tools process in your browser. Tools using external services say so.",
    favoritesEmpty:
      "Find a tool and select its star to keep it here. Favorites are saved only in this browser.",
    footer: "Useful tools. A simpler internet.",
  },
  zh: {
    title: ["你的工具。", "你的文件。", "你的隐私。"],
    description: "免费的浏览器工具，轻松处理 PDF、图片、文字、代码与日常任务。",
    count: "{n} 款免费在线工具",
    try: "试试：",
    noSignup: "无需注册",
    localFiles: "本地工具无需上传",
    free: "免费使用",
    categories: "按分类探索",
    browseCategories: "浏览全部分类",
    privacyEyebrow: "隐私融入设计",
    privacyTitle: "本地处理，文件由你掌控。",
    privacyBody: "文件工具在浏览器中处理；使用外部服务的工具会明确说明。",
    favoritesEmpty:
      "搜索工具并点击星标，即可保存在这里。收藏仅保存在此浏览器中。",
    footer: "实用工具，让互联网更简单。",
  },
  ja: {
    title: ["あなたのツール。", "あなたのファイル。", "あなたのプライバシー。"],
    description:
      "PDF、画像、テキスト、コード、日々の作業に使える無料ブラウザツール。",
    count: "{n} 個の無料オンラインツール",
    try: "おすすめ：",
    noSignup: "登録不要",
    localFiles: "ローカルツールはアップロード不要",
    free: "無料で利用",
    categories: "カテゴリから探す",
    browseCategories: "すべてのカテゴリ",
    privacyEyebrow: "プライバシーを大切に",
    privacyTitle: "ローカル処理。ファイルはあなたの手元に。",
    privacyBody:
      "ファイルツールはブラウザ内で処理します。外部サービスの利用は明示します。",
    favoritesEmpty:
      "ツールを検索して星を選ぶと、ここに保存できます。お気に入りはこのブラウザだけに保存されます。",
    footer: "便利なツールで、もっとシンプルに。",
  },
  es: {
    title: ["Tus herramientas.", "Tus archivos.", "Tu privacidad."],
    description:
      "Herramientas gratuitas para PDF, imágenes, texto, código y tareas diarias.",
    count: "{n} herramientas gratuitas",
    try: "Prueba:",
    noSignup: "Sin registro",
    localFiles: "Sin subir archivos en herramientas locales",
    free: "Uso gratuito",
    categories: "Explora por categoría",
    browseCategories: "Todas las categorías",
    privacyEyebrow: "Privacidad desde el diseño",
    privacyTitle: "Procesamiento local. Tus archivos siguen siendo tuyos.",
    privacyBody:
      "Los archivos se procesan en tu navegador. Las herramientas con servicios externos lo indican.",
    favoritesEmpty:
      "Busca una herramienta y pulsa su estrella para guardarla aquí, solo en este navegador.",
    footer: "Herramientas útiles. Un internet más sencillo.",
  },
  pt: {
    title: ["Suas ferramentas.", "Seus arquivos.", "Sua privacidade."],
    description:
      "Ferramentas gratuitas para PDF, imagens, texto, código e tarefas do dia a dia.",
    count: "{n} ferramentas gratuitas",
    try: "Experimente:",
    noSignup: "Sem cadastro",
    localFiles: "Sem uploads nas ferramentas locais",
    free: "Uso gratuito",
    categories: "Explore por categoria",
    browseCategories: "Todas as categorias",
    privacyEyebrow: "Privacidade desde o início",
    privacyTitle: "Processamento local. Seus arquivos continuam seus.",
    privacyBody:
      "Os arquivos são processados no navegador. O uso de serviços externos é informado em cada ferramenta.",
    favoritesEmpty:
      "Busque uma ferramenta e selecione a estrela para guardá-la aqui, apenas neste navegador.",
    footer: "Ferramentas úteis. Uma internet mais simples.",
  },
  fr: {
    title: ["Vos outils.", "Vos fichiers.", "Votre vie privée."],
    description:
      "Des outils gratuits pour les PDF, images, textes, le code et les tâches du quotidien.",
    count: "{n} outils gratuits en ligne",
    try: "Essayez :",
    noSignup: "Sans inscription",
    localFiles: "Aucun envoi pour les outils locaux",
    free: "Utilisation gratuite",
    categories: "Explorer par catégorie",
    browseCategories: "Toutes les catégories",
    privacyEyebrow: "La confidentialité par conception",
    privacyTitle: "Traitement local. Vos fichiers restent les vôtres.",
    privacyBody:
      "Les fichiers sont traités dans votre navigateur. Tout service externe utilisé est signalé.",
    favoritesEmpty:
      "Cherchez un outil et cliquez sur son étoile pour le garder ici, dans ce navigateur uniquement.",
    footer: "Des outils utiles. Un internet plus simple.",
  },
  de: {
    title: ["Deine Werkzeuge.", "Deine Dateien.", "Deine Privatsphäre."],
    description:
      "Kostenlose Browsertools für PDFs, Bilder, Text, Code und alltägliche Aufgaben.",
    count: "{n} kostenlose Onlinetools",
    try: "Ausprobieren:",
    noSignup: "Ohne Anmeldung",
    localFiles: "Keine Uploads bei lokalen Tools",
    free: "Kostenlos nutzbar",
    categories: "Nach Kategorie entdecken",
    browseCategories: "Alle Kategorien",
    privacyEyebrow: "Datenschutz von Anfang an",
    privacyTitle: "Lokal verarbeitet. Deine Dateien bleiben deine.",
    privacyBody:
      "Dateitools verarbeiten im Browser. Externe Dienste werden beim jeweiligen Tool ausgewiesen.",
    favoritesEmpty:
      "Suche ein Tool und wähle seinen Stern. Favoriten werden nur in diesem Browser gespeichert.",
    footer: "Nützliche Tools. Ein einfacheres Internet.",
  },
  ru: {
    title: ["Ваши инструменты.", "Ваши файлы.", "Ваша приватность."],
    description:
      "Бесплатные инструменты для PDF, изображений, текста, кода и повседневных задач.",
    count: "{n} бесплатных инструментов",
    try: "Попробуйте:",
    noSignup: "Без регистрации",
    localFiles: "Локальные инструменты без загрузки файлов",
    free: "Бесплатно",
    categories: "Обзор по категориям",
    browseCategories: "Все категории",
    privacyEyebrow: "Приватность в основе",
    privacyTitle: "Локальная обработка. Файлы остаются вашими.",
    privacyBody:
      "Файлы обрабатываются в браузере. Об использовании внешних сервисов сообщается отдельно.",
    favoritesEmpty:
      "Найдите инструмент и нажмите звезду. Избранное сохраняется только в этом браузере.",
    footer: "Полезные инструменты. Интернет проще.",
  },
  it: {
    title: ["I tuoi strumenti.", "I tuoi file.", "La tua privacy."],
    description:
      "Strumenti gratuiti per PDF, immagini, testo, codice e attività quotidiane.",
    count: "{n} strumenti gratuiti online",
    try: "Prova:",
    noSignup: "Senza registrazione",
    localFiles: "Nessun caricamento per gli strumenti locali",
    free: "Uso gratuito",
    categories: "Esplora per categoria",
    browseCategories: "Tutte le categorie",
    privacyEyebrow: "Privacy fin dalla progettazione",
    privacyTitle: "Elaborazione locale. I tuoi file restano tuoi.",
    privacyBody:
      "I file vengono elaborati nel browser. Gli strumenti che usano servizi esterni lo indicano.",
    favoritesEmpty:
      "Cerca uno strumento e seleziona la stella per salvarlo qui, solo in questo browser.",
    footer: "Strumenti utili. Un internet più semplice.",
  },
  tr: {
    title: ["Araçların.", "Dosyaların.", "Gizliliğin."],
    description:
      "PDF, görsel, metin, kod ve günlük işler için ücretsiz tarayıcı araçları.",
    count: "{n} ücretsiz çevrimiçi araç",
    try: "Dene:",
    noSignup: "Kayıt gerekmez",
    localFiles: "Yerel araçlarda dosya yüklenmez",
    free: "Ücretsiz kullanım",
    categories: "Kategoriye göre keşfet",
    browseCategories: "Tüm kategoriler",
    privacyEyebrow: "Tasarımda gizlilik",
    privacyTitle: "Yerel işlem. Dosyaların sana ait kalır.",
    privacyBody:
      "Dosyalar tarayıcında işlenir. Harici hizmet kullanan araçlar bunu açıkça belirtir.",
    favoritesEmpty:
      "Bir araç bul ve yıldızını seç. Favoriler yalnızca bu tarayıcıda saklanır.",
    footer: "Kullanışlı araçlar. Daha sade bir internet.",
  },
  ko: {
    title: ["나의 도구.", "나의 파일.", "나의 개인정보."],
    description:
      "PDF, 이미지, 텍스트, 코드와 일상 작업을 위한 무료 브라우저 도구.",
    count: "무료 온라인 도구 {n}개",
    try: "추천:",
    noSignup: "가입 불필요",
    localFiles: "로컬 도구는 업로드 불필요",
    free: "무료 사용",
    categories: "카테고리별 탐색",
    browseCategories: "모든 카테고리",
    privacyEyebrow: "설계부터 개인정보 보호",
    privacyTitle: "로컬 처리로 파일을 직접 관리하세요.",
    privacyBody:
      "파일 도구는 브라우저에서 처리합니다. 외부 서비스를 사용하는 도구는 이를 알립니다.",
    favoritesEmpty:
      "도구를 검색하고 별표를 선택하세요. 즐겨찾기는 이 브라우저에만 저장됩니다.",
    footer: "유용한 도구. 더 단순한 인터넷.",
  },
  ar: {
    title: ["أدواتك.", "ملفاتك.", "خصوصيتك."],
    description:
      "أدوات مجانية للمتصفح لملفات PDF والصور والنصوص والبرمجة والمهام اليومية.",
    count: "{n} أداة مجانية عبر الإنترنت",
    try: "جرّب:",
    noSignup: "بلا تسجيل",
    localFiles: "لا رفع للملفات في الأدوات المحلية",
    free: "مجانية الاستخدام",
    categories: "استكشف حسب الفئة",
    browseCategories: "كل الفئات",
    privacyEyebrow: "الخصوصية أساس التصميم",
    privacyTitle: "معالجة محلية. ملفاتك تبقى ملكك.",
    privacyBody:
      "تُعالج الملفات في متصفحك. الأدوات التي تستخدم خدمات خارجية توضح ذلك.",
    favoritesEmpty:
      "ابحث عن أداة واضغط نجمتها لحفظها هنا. تُحفظ المفضلة في هذا المتصفح فقط.",
    footer: "أدوات مفيدة. إنترنت أبسط.",
  },
  hi: {
    title: ["आपके टूल।", "आपकी फ़ाइलें।", "आपकी निजता।"],
    description:
      "PDF, इमेज, टेक्स्ट, कोड और रोज़मर्रा के कामों के लिए मुफ़्त ब्राउज़र टूल।",
    count: "{n} मुफ़्त ऑनलाइन टूल",
    try: "आज़माएँ:",
    noSignup: "साइनअप नहीं",
    localFiles: "लोकल टूल में अपलोड नहीं",
    free: "इस्तेमाल मुफ़्त",
    categories: "श्रेणी के अनुसार खोजें",
    browseCategories: "सभी श्रेणियाँ",
    privacyEyebrow: "डिज़ाइन में निजता",
    privacyTitle: "लोकल प्रोसेसिंग। फ़ाइलों पर आपका नियंत्रण।",
    privacyBody:
      "फ़ाइल टूल आपके ब्राउज़र में काम करते हैं। बाहरी सेवा वाले टूल इसकी जानकारी देते हैं।",
    favoritesEmpty:
      "टूल खोजें और उसका सितारा चुनें। पसंदीदा टूल केवल इस ब्राउज़र में सहेजे जाते हैं।",
    footer: "उपयोगी टूल। सरल इंटरनेट।",
  },
  id: {
    title: ["Alat Anda.", "File Anda.", "Privasi Anda."],
    description:
      "Alat browser gratis untuk PDF, gambar, teks, kode, dan tugas sehari-hari.",
    count: "{n} alat online gratis",
    try: "Coba:",
    noSignup: "Tanpa daftar",
    localFiles: "Tanpa unggah pada alat lokal",
    free: "Gratis digunakan",
    categories: "Jelajahi berdasarkan kategori",
    browseCategories: "Semua kategori",
    privacyEyebrow: "Privasi sejak awal",
    privacyTitle: "Diproses lokal. File tetap milik Anda.",
    privacyBody:
      "Alat file memproses di browser. Penggunaan layanan eksternal dijelaskan pada alat terkait.",
    favoritesEmpty:
      "Cari alat dan pilih bintangnya. Favorit hanya disimpan di browser ini.",
    footer: "Alat berguna. Internet lebih sederhana.",
  },
  vi: {
    title: ["Công cụ của bạn.", "Tệp của bạn.", "Quyền riêng tư của bạn."],
    description:
      "Công cụ trình duyệt miễn phí cho PDF, ảnh, văn bản, mã và tác vụ hằng ngày.",
    count: "{n} công cụ trực tuyến miễn phí",
    try: "Thử:",
    noSignup: "Không cần đăng ký",
    localFiles: "Công cụ cục bộ không tải tệp lên",
    free: "Sử dụng miễn phí",
    categories: "Khám phá theo danh mục",
    browseCategories: "Tất cả danh mục",
    privacyEyebrow: "Quyền riêng tư từ thiết kế",
    privacyTitle: "Xử lý cục bộ. Tệp vẫn thuộc về bạn.",
    privacyBody:
      "Công cụ tệp xử lý trong trình duyệt. Công cụ dùng dịch vụ bên ngoài sẽ nêu rõ.",
    favoritesEmpty:
      "Tìm công cụ và chọn ngôi sao. Mục yêu thích chỉ được lưu trong trình duyệt này.",
    footer: "Công cụ hữu ích. Internet đơn giản hơn.",
  },
};

export const HOME_EDITORIAL: Record<
  Locale,
  { title: string; summaries: [string, string, string, string] }
> = {
  en: {
    title: "Featured tools",
    summaries: [
      "Combine multiple PDFs",
      "Reduce image size",
      "Count words & characters",
      "Format JSON instantly",
    ],
  },
  zh: {
    title: "精选工具",
    summaries: [
      "将多个 PDF 合为一份",
      "压缩图片体积",
      "统计字数与字符",
      "快速格式化 JSON",
    ],
  },
  ja: {
    title: "おすすめツール",
    summaries: [
      "複数の PDF をまとめる",
      "画像サイズを軽くする",
      "単語数・文字数を数える",
      "JSON をすばやく整形",
    ],
  },
  es: {
    title: "Herramientas destacadas",
    summaries: [
      "Combina varios PDF",
      "Reduce el tamaño de imágenes",
      "Cuenta palabras y caracteres",
      "Da formato a JSON al instante",
    ],
  },
  pt: {
    title: "Ferramentas em destaque",
    summaries: [
      "Combine vários PDFs",
      "Reduza o tamanho de imagens",
      "Conte palavras e caracteres",
      "Formate JSON na hora",
    ],
  },
  fr: {
    title: "Outils à découvrir",
    summaries: [
      "Assembler plusieurs PDF",
      "Réduire le poids des images",
      "Compter mots et caractères",
      "Mettre en forme du JSON",
    ],
  },
  de: {
    title: "Ausgewählte Tools",
    summaries: [
      "Mehrere PDFs verbinden",
      "Bilddateien verkleinern",
      "Wörter und Zeichen zählen",
      "JSON sofort formatieren",
    ],
  },
  ru: {
    title: "Избранные инструменты",
    summaries: [
      "Объединить несколько PDF",
      "Уменьшить размер изображения",
      "Посчитать слова и символы",
      "Быстро форматировать JSON",
    ],
  },
  it: {
    title: "Strumenti in evidenza",
    summaries: [
      "Unisci più PDF",
      "Riduci le dimensioni delle immagini",
      "Conta parole e caratteri",
      "Formatta JSON in un istante",
    ],
  },
  tr: {
    title: "Öne çıkan araçlar",
    summaries: [
      "Birden çok PDF’yi birleştir",
      "Görsel boyutunu küçült",
      "Kelime ve karakter say",
      "JSON’ı anında biçimlendir",
    ],
  },
  ko: {
    title: "추천 도구",
    summaries: [
      "여러 PDF를 하나로 병합",
      "이미지 용량 줄이기",
      "단어와 글자 수 세기",
      "JSON 즉시 정리",
    ],
  },
  ar: {
    title: "أدوات مختارة",
    summaries: [
      "دمج عدة ملفات PDF",
      "تقليل حجم الصور",
      "عدّ الكلمات والأحرف",
      "تنسيق JSON فورًا",
    ],
  },
  hi: {
    title: "चुनिंदा टूल",
    summaries: [
      "कई PDF एक साथ जोड़ें",
      "इमेज का आकार घटाएँ",
      "शब्द और अक्षर गिनें",
      "JSON तुरंत फ़ॉर्मैट करें",
    ],
  },
  id: {
    title: "Alat pilihan",
    summaries: [
      "Gabungkan beberapa PDF",
      "Perkecil ukuran gambar",
      "Hitung kata dan karakter",
      "Rapikan JSON seketika",
    ],
  },
  vi: {
    title: "Công cụ nổi bật",
    summaries: [
      "Gộp nhiều tệp PDF",
      "Giảm dung lượng ảnh",
      "Đếm từ và ký tự",
      "Định dạng JSON tức thì",
    ],
  },
};
