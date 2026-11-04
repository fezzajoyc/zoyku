// tr — Türkçe sözlük. Anahtar şekli en ile birebir aynıdır (tests/seo.test.ts derin karşılaştırır).
const tr = {
  brand: "Zoyku",
  tagline: "Her araç tarayıcında çalışır.",
  metaDesc:
    "{n} ücretsiz online araç: PDF, görsel, metin, geliştirici ve günlük hesaplamalar. Her şey tarayıcınızda çalışır — dosyalarınız asla cihazınızdan çıkmaz.",

  nav: {
    tools: "Tüm araçlar",
    categories: "Kategoriler",
    about: "Hakkında",
    search: "Ara",
    menu: "Menü",
    language: "Dil",
  },

  home: {
    heroTitle: "Dosyalarını yüklemeden kullandığın ücretsiz araçlar",
    heroSub:
      "PDF, görsel, metin, kod ve günlük hesaplamalar için {n} araç. Her şey tarayıcında yerel olarak çalışır — hızlı, ücretsiz, kayıt yok, yükleme yok.",
    browseAll: "Tüm araçlara göz at",
    pinned: "Sabitlenen",
    pin: "Üste sabitle",
    unpin: "Sabitlemeyi kaldır",
    popular: "Şu anda popüler",
    categoriesTitle: "Kategoriler",
    featuredTitle: "Popüler araçlar",
    trustLocal: "Dosyalar cihazında kalır",
    trustFree: "Ücretsiz, hesap yok",
    trustFast: "Anında, çevrimdışı bile çalışır",
    rotating: [
      "20 PDF'yi tek dosyada birleştir — tek bir yükleme olmadan",
      "Fotoğrafların boyutunu dörtte bire indir — çevrimdışıyken bile",
      "Sözleşmeler, taramalar, ekran görüntüleri — hepsi sekmende işlenir",
      "Hesap yok, filigran yok, dosya boyutu uyarı ekranı yok",
    ],
    statsLabels: { tools: "araç", languages: "dil", uploads: "yükleme", accounts: "hesap" },
    eyebrow: "Sonsuza kadar ücretsiz",
    heroCtaSecondary: "Nasıl çalışır",
    statsTools: "{n} araç",
    statsLanguages: "{n} dil",
    statsUploads: "0 yükleme",
    statsAccounts: "0 hesap",
    categoriesSub: "Yedi araç ailesi, hepsi cihazında çalışır.",
    popularSub: "En çok açılan araçlar.",
    privacyTitle: "Dosyaların asla cihazından çıkmaz.",
    privacySub:
      "Yükleme adımı yok. Araçlar tarayıcında çalışan JavaScript kodlarıdır — bu bir politika vaadi değil, nasıl inşa edildiklerinin sonucudur.",
    privacyPoint1T: "Yerel işleme",
    privacyPoint1D:
      "Dosyalar tarayıcının kendi File API'siyle okunur ve bellekte işlenir. Hiçbir şey hiçbir yere gönderilmez.",
    privacyPoint2T: "Hesap yok",
    privacyPoint2D: "Kayıt yok, e-posta yok, saklanan geçmiş yok. Aracı aç ve kullan.",
    privacyPoint3T: "Tasarımdan dürüst",
    privacyPoint3D:
      "Bir şey gerçekten tarayıcıda yapılamıyorsa, yapılabiliyormuş gibi göstermek yerine bunu söyleriz.",
    privacyLink: "Tüm gizlilik notunu oku",
    endTitle: "Bir araç seç. Gerisi kendiliğinden.",
    endSub: "On beş dil, sıfır yükleme, kurulum gerektirmez.",
    allToolsTitle: "Tüm araçlar, tek sayfada",
    allToolsSub: "Eksiksiz dizin — 7 kategoride {count} araç, tümü yerelde çalışır.",
    faqs: [
      { q: "Zoyku gerçekten ücretsiz mi?", a: "Evet — tüm araçlar ücretsiz: hesap yok, filigran yok, kullanım limiti yok. İhtiyacınız olan özellikleri gizleyen bir premium sürüm yok." },
      { q: "Dosyalarım sunucuya yükleniyor mu?", a: "Hayır. Her araç, sekmenizde çalışan JavaScript'tir: dosyalar tarayıcının kendi File API'siyle okunur ve bellekte işlenir. Hiçbir şey hiçbir yere gönderilmez." },
      { q: "Kaç araç var?", a: "7 kategoride {n} araç — PDF, görsel, metin, geliştirici, SEO, güvenlik ve yardımcı araçlar — ve sayı her sürümde artıyor." },
      { q: "Çevrimdışı çalışır mı?", a: "Bir araç sayfası bir kez yüklendikten sonra bağlantı olmadan da çalışmaya devam eder, çünkü tüm işlem yerelde yapılır. Yalnızca ilk açılış bağlantı ister." },
      { q: "Hesap oluşturmam gerekiyor mu?", a: "Asla. Kayıt yok, e-posta yok, saklanan geçmiş yok — aracı açın ve kullanın." },
      { q: "Hangi dosya biçimleri destekleniyor?", a: "PDF ailesi birleştirme, bölme, sıkıştırma ve Word, JPG ve daha fazlasına dönüştürmeyi kapsar; görsel ailesi HEIC, WebP, PNG, SVG ve diğerlerini kapsar. Her araç sayfası kabul ettiği biçimleri tam olarak listeler." },
    ],

  },

  tools: {
    noResults: "Eşleşen araç yok.",
    title: "Tüm araçlar",
    subtitle: "{count} ücretsiz tarayıcı aracı. Yükleme yok, kayıt yok.",
    filterPlaceholder: "Araçlarda ara…",
    count: "{count} araç",
    empty: "“{query}” ile eşleşen araç yok.",
  },

  categories: {
    pdf: { name: "PDF", desc: "PDF dosyalarını hiçbir yere yüklemeden birleştir, böl, dönüştür ve düzenle." },
    image: { name: "Görsel", desc: "Görselleri doğrudan tarayıcında sıkıştır, yeniden boyutlandır, kırp ve dönüştür." },
    text: { name: "Metin", desc: "Metni yazarken anında say, temizle, sırala ve dönüştür." },
    developer: { name: "Geliştirici", desc: "Günlük geliştirici işleri için biçimlendiriciler, kodlayıcılar, çözücüler ve üreteçler." },
    seo: { name: "SEO", desc: "Meta etiketleri, schema işaretlemesi, SERP önizlemesi ve diğer sayfa içi SEO yardımcıları." },
    security: { name: "Güvenlik", desc: "Şifreler, karma (hash) değerleri ve sorgular — cihazında üretilir, cihazında denetlenir." },
    utility: { name: "Yardımcı Araçlar", desc: "Birim dönüştürücüler, hesap makineleri ve günlük yardımcılar." },
  },

  tool: {
    howTo: "Nasıl kullanılır",
    faq: "Sık sorulan sorular",
    related: "İlgili araçlar",
    nextStep: "Sonraki adımlar",
    copyLink: "Bağlantıyı kopyala",
    privacyNote:
      "Bu araç tamamen tarayıcında çalışır. Verilerin asla cihazından çıkmaz — hiçbir sunucuya yüklenmez.",
    inCategory: "{category} kategorisinde daha fazlası",
    backToCategory: "Tüm {category} araçları",
  },

  common: {
    openTool: "Aracı aç",
    copy: "Kopyala",
    close: "Kapat",
    copied: "Kopyalandı",
    download: "İndir",
    reset: "Sıfırla",
    swap: "Değiştir",
    clear: "Temizle",
    error: "Bir şeyler ters gitti. Girdini kontrol edip tekrar dene.",
    input: "Girdi",
    output: "Sonuç",
    settings: "Seçenekler",
    dropFiles: "Dosyaları buraya bırak veya tıklayarak seç",
    dropFile: "Dosyayı buraya bırak veya tıklayarak seç",
    processing: "İşleniyor…",
    fileSize: "Boyut",
    sample: "Örneği dene",
    uppercase: "BÜYÜKHARF",
  },

  unit: {
    from: "Kaynak",
    to: "Hedef",
    amount: "Miktar",
    result: "Sonuç",
    common: "Sık kullanılan dönüşümler",
    formula: "Formül",
    allUnits: "Tüm birimler",
  },

  text: {
    stats: {
      words: "Kelime",
      characters: "Karakter",
      charsNoSpaces: "Boşluksuz",
      sentences: "Cümle",
      paragraphs: "Paragraf",
      lines: "Satır",
      readingTime: "Okuma süresi",
      readingMinutes: "{n} dk okuma",
      emptyHint: "Yazmaya başlayın veya metninizi yapıştırın — tüm istatistikler anında güncellenir.",
      uniqueWords: "Benzersiz kelime",
      avgWordLen: "Ort. kelime uzunluğu",
      pages: "Sayfa",
      speakingTime: "Konuşma süresi",
      keywordsTitle: "En sık geçen kelimeler",
      keywordCount: "{count}× ({pct}%)",
      avgSentence: "Ort. cümle (kelime)",
      longestSentence: "En uzun cümle (kelime)",
      readingLevel: "Okuma seviyesi",
      limitsTitle: "Platform sınırları",
      charsLeft: "{n} kaldı",
      charsOver: "{n} fazla",
    },
  },

  footer: {
    line: "Ücretsiz tarayıcı araçları. Burada yaptığın hiçbir şey cihazından çıkmaz.",
    privacy: "Gizlilik",
    terms: "Kullanım Koşulları",
    about: "Hakkında",
    badges: "Rozetler",
    language: "Dil",
  },

  badge: {
    title: "Zoyku rozetleri",
    desc: "Zoyku rozetini sitene, README'ne veya dokümanlarına ekle. Rozet buraya bağlanır ve arkasındaki araçların tamamen tarayıcıda çalıştığını söyler.",
    voluntary: "Yerleştirme tamamen isteğe bağlıdır — projeyi seviyorsan bir rozet seç. İzin almaya gerek yok.",
    md: "Markdown (README)",
    html: "HTML (web sitesi)",
    thanks: "Duyulmamıza yardım ettiğin için teşekkürler — her yerleştirme, dosyalarına saygı duyan araçları daha çok kişinin keşfetmesini sağlar.",
  },

  embed: {
    title: "Bu aracı gömün",
    desc: "Tek satırla bu aracı sitenize ekleyin — ziyaretçinin tarayıcısında çalışır.",
  },

    mcp: {
    title: "MCP sunucusu — AI erişimli araçlar",
    desc1: "Zoyku bir MCP (Model Context Protocol) sunucusu içerir: Claude veya Cursor gibi AI asistanları, bu sitedeki hesaplayıcıları ve dönüştürücüleri aynı şekilde çalıştırabilir — aynı test edilmiş mantık, yeniden yazım yok.",
    desc2: "Araçlar sitenin saf fonksiyonlarını çalıştırır (birim dönüştürme, finans, sağlık tahminleri, metin işleme). npx üzerinden AI istemcisinin makinesinde çalışır; sunucularımıza hiçbir şey gönderilmez.",
    toolsTitle: "Çalıştırılabilir araçlar ({n})",
    requiresNode: "Node.js 18+ gerekir. Sunucu stdio üzerinden yerel çalışır; yalnızca yaptığınız çağrılar makinenizde hesaplanır.",
    privacy: "Node.js 18+ gerekir. Sunucu stdio üzerinden yerel çalışır; yalnızca yaptığınız çağrılar makinenizde hesaplanır.",
  },

    notFound: {
    title: "Sayfa bulunamadı",
    body: "Aradığın araç mevcut değil. Onun yerine tüm araçlara göz at.",
    home: "Ana sayfaya git",
  },
};

export default tr;
