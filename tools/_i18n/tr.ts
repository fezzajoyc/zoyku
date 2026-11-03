import type { ToolCopy } from "../_lib/types";

/**
 * Türkçe (tr) araç metinleri: kayıttaki her slug için eksiksiz bir ToolCopy bloğu.
 * Sözleşme: kayıttaki tüm slug'lar kapsanır (tests/overlays.test.ts + tests/registry.test.ts).
 * Ton: günlük, samimi "sen" dili; "Zoyku" ve teknik token'lar (PDF, JPG, JSON…) aynen kalır.
 */
export const tr: Record<string, ToolCopy> = {
  /* ------------------------------------------------------------------ */
  /* PDF                                                                 */
  /* ------------------------------------------------------------------ */
  "merge-pdf": {
    name: "PDF Birleştirme",
    tagline:
      "Birden fazla PDF'yi tarayıcında tek belgede birleştir — dosyaları dilediğin gibi sırala; yükleme yok, filigran yok, kayıt yok.",
    intro: [
      "İhtiyacın kadar PDF'yi bırak, tam istediğin sıraya diz ve tek dosyada birleştir. Rezervasyonlar, faturalar, taranmış bölümler, başvuru dosyaları — on ayrı ek olarak gelen her şey derli toplu tek belgeye dönüşür.",
      "Dosyalarını sunucuya yükleyen online birleştiricilerin aksine bu araç, PDF'leri pdf-lib ile tamamen cihazında okur ve yazar. Sözleşmelerin, kimlik belgelerin ve finansal dokümanların tarayıcından asla çıkmaz.",
    ],
    steps: [
      "Kutuya iki ya da daha fazla PDF dosyası bırak (veya tıklayarak seç).",
      "Sıra doğru olana kadar listeyi ↑ / ↓ düğmeleriyle yeniden düzenle.",
      "PDF'leri Birleştir'e tıkla ve oluşan dosyayı indir.",
    ],
    faqs: [
      {
        q: "Kaç PDF'yi birleştirebilirim, en fazla ne kadar büyük olabilir?",
        a: "Yapay bir sınır yok — pratik tavan cihazının belleğidir. Modern bir dizüstü 20+ dosyayı ya da toplam 100–200 MB civarını rahatça birleştirir; çok büyük taramalar yavaşlayabilir ama yine de çalışır.",
      },
      {
        q: "Yer imleri, form alanları veya notlar birleştirmeden sonra kalır mı?",
        a: "Sayfa içeriği, görseller ve notların çoğu korunur. Yer imleri ve form alanı değerleri gibi belge düzeyi ekstralar aktarılmaz — birleştirilmiş dosya her kaynağın görsel sayfalarını içerir.",
      },
      {
        q: "Dosyalarım bir yere yükleniyor mu?",
        a: "Hayır. Birleştirme JavaScript ile tarayıcında yerel olarak yapılır. Hiçbir şey sunucuya gönderilmez ve birleştirilmiş PDF kendi cihazında üretilir.",
      },
    ],
  },
  "split-pdf": {
    name: "PDF Bölme",
    tagline:
      "Bir PDF'yi sabit sayfa sayısına veya özel aralıklara göre ayrı dosyalara böl — her çıktı yerel olarak üretilir, hiçbir şey yüklenmez.",
    intro: [
      "Uzun bir PDF'yi iki yolla küçük dosyalara böl: her N sayfada bir kes (dosya başına 1 sayfa veya bölüm büyüklüğünde parçalar için pratik) ya da “1-3, 4-6, 8” gibi özel aralıklar tanımla ve aralık başına bir dosya al. Birden fazla çıktı otomatik olarak bir ZIP'e paketlenir.",
      "Bölme işlemi pdf-lib ile cihazında çalışır — orijinal dosyalara dokunulmaz ve parçalar hiçbir sunucudan geçmez. Bir yere yüklemek istemediğin gizli belgeler için ideal.",
    ],
    steps: [
      "Bölmek istediğin PDF'yi bırak.",
      "“Her N sayfada bir” ya da özel aralıklar seçip değerleri gir.",
      "PDF'yi Böl'e tıkla, sonra her parçayı ya da ZIP'in tamamını indir.",
    ],
    faqs: [
      {
        q: "Bir PDF'yi tek tek sayfalara nasıl bölerim?",
        a: "“Her N sayfada bir” seçeneğini 1'e ayarla; her sayfa kendi PDF'si olur. Birden fazla çıktı dosyası olduğunda hepsini içeren bir ZIP de alırsın.",
      },
      {
        q: "Hangi aralık yazımı destekleniyor?",
        a: "“1-3, 5, 8-10” gibi virgülle ayrılmış değerler ve tireli aralıklar. Aralıklar çakışabilir ve yazdığın sırayla işlenir.",
      },
      {
        q: "Bölmek sayfalarımın kalitesini değiştirir mi?",
        a: "Hayır. Sayfalar yeni belgelere bayt bayt kopyalanır; metin seçilebilir kalır, görseller özgün kalitesini korur.",
      },
    ],
  },
  "rotate-pdf": {
    name: "PDF Döndürme",
    tagline:
      "PDF sayfalarını 90, 180 veya 270 derece döndür ve değişikliği kalıcı olarak kaydet — yatay taramaları tarayıcında düzelt, yükleme yok.",
    intro: [
      "Yan veya ters taranmış mı? Tüm sayfaları bir kerede döndür ya da “1, 3-5” gibi bir listeyle yalnızca düzeltilmesi gereken sayfaları hedefle. Döndürme PDF'nin içine yazılır; böylece dosya her okuyucuda doğru yönde açılır.",
      "Çok sayıda görüntüleyici sayfaları yalnızca geçici olarak döndürür — bu araç, cihazında pdf-lib ile sayfanın /Rotate özniteliğini değiştirir; düzeltme böylece yazdırma, paylaşma ve yeniden yükleme sonrasında da kalır.",
    ],
    steps: [
      "Sayfaları döndürülmesi gereken PDF'yi bırak.",
      "90°, 180° veya 270° seç; istersen döndürmeyi belirli sayfalarla sınırla.",
      "Sayfaları Döndür'e tıkla ve düzeltilmiş PDF'yi indir.",
    ],
    faqs: [
      {
        q: "Döndürme kalıcı mı?",
        a: "Evet. Sayfa döndürme özniteliği dosyanın içinde güncellenir; her PDF okuyucusu, yazıcı ve önizleme düzeltilmiş yönlendirmeyi gösterir — yalnızca bu sekme değil.",
      },
      {
        q: "Yalnızca bazı sayfaları nasıl döndürürüm?",
        a: "Sayfa alanına “2, 5-7” gibi bir liste yaz. Boş bırakırsan tüm belge döndürülür. Aralıklar diğer sayfa araçlarıyla aynı yazımı izler.",
      },
      {
        q: "Döndürmek sayfalarımı yeniden kodlar veya sıkıştırır mı?",
        a: "Hayır. Yalnızca döndürme bayrağı değişir; sayfa içeriğine dokunulmaz, kalite aynı kalır ve metin seçilebilir kalır.",
      },
    ],
  },
  "delete-pdf-pages": {
    name: "PDF Sayfa Silme",
    tagline:
      "İstenmeyen sayfaları bir PDF'den saniyeler içinde kaldır — silinecek sayfaları yaz, küçültülen dosyayı indir; her şey tarayıcında işlenir.",
    intro: [
      "Boş sayfalar, eski bir kapak, başkasının verilerini içeren bir sayfa — bunları “1, 3-5” biçiminde gir ve geri kalanı sapasağlam temiz bir PDF al. Araç, belgenin sayfa sayısını gösterir; böylece kesmeden önce numaraları kontrol edebilirsin.",
      "Kalan sayfalar bayt bayt kopyalanır; metin seçilebilir kalır, görseller kalitesini korur. Her şey pdf-lib ile yerel olarak olur; dosya asla yüklenmez.",
    ],
    steps: [
      "Küçültmek istediğin PDF'yi bırak.",
      "Silinecek sayfaları yaz, örneğin “2, 6-8”.",
      "Sayfaları Sil'e tıkla ve kalan belgeyi indir.",
    ],
    faqs: [
      {
        q: "Bir belgenin tüm sayfalarını silebilir miyim?",
        a: "Hayır — bir PDF'de en az bir sayfa olmalı. Tüm sayfaları girersen araç kabul etmez; gerçekten böyle bir şeye ihtiyacın varsa bir sayfa hariç tümünü sil.",
      },
      {
        q: "Yalnızca birkaç sayfayı nasıl tutarım?",
        a: "Tersinden düşünmek daha kolay: istemediğin her şeyi sil. 12 sayfalık bir belgede “2-10, 12” girmek 1 ve 11. sayfaları bırakır.",
      },
      {
        q: "Sayfa numaralandırmasına ne olur?",
        a: "Sayfalar otomatik olarak kayar: 2–4. sayfalar silindikten sonra eski 5. sayfa 2. sayfa olur. Silinen sayfalara işaret eden iç bağlantılar çalışmayı bırakabilir.",
      },
    ],
  },
  "rearrange-pdf-pages": {
    name: "PDF Sayfa Sıralama",
    tagline:
      "PDF sayfalarını canlı küçük resimlerle görsel olarak yeniden sırala — sayfaları yukarı-aşağı taşı, tümünü ters çevir ve yerel olarak yeni bir PDF al.",
    intro: [
      "Belgeyi karışık sırayla mı taradın? Her sayfa gerçek bir küçük resim olarak görünür, neyi taşıdığını tam olarak görürsün. Ok düğmeleriyle karıştır, Ters Çevir ile tüm belgeyi tersine çevir ve istediğin an özgün sıraya dön.",
      "Yeni sıra cihazında tertemiz bir PDF'ye yazılır — sayfalar bayt bayt kopyalanır; kalite, yazı tipleri ve seçilebilir metin bu karıştırmadan sapasağlam çıkar.",
    ],
    steps: [
      "PDF'yi bırak ve sayfa küçük resimlerinin görünmesini bekle.",
      "Sayfaları ↑ / ↓ ile taşı ya da ters sıra için Ters Çevir'i kullan.",
      "Sırayı uygula ve indir'e tıklayarak yeni düzenlenmiş PDF'yi al.",
    ],
    faqs: [
      {
        q: "Neden çok uzun PDF'lerde sonraki sayfalar küçük resim yerine numara gösteriyor?",
        a: "Tarayıcının tepki vermeye devam etmesi için ilk 60 sayfanın küçük resimleri önceden oluşturulur. Daha fazlasında sayfa numaralarını görürsün ve tamamen aynı şekilde yeniden sıralayabilirsin.",
      },
      {
        q: "Bir sayfayı 40. konumdan 2. konuma taşıyabilir miyim?",
        a: "Evet, ama ok düğmeleriyle art arda tıklamak gerekir. Büyük atlamalar için önce belgeyi ters çevirmek ya da bölüp parçaları yeni sırayla birleştirmek çoğu zaman daha hızlıdır.",
      },
      {
        q: "Yeniden sıralama kaliteyi etkiler mi?",
        a: "Hiç etkilemez. Sayfalar yeni belgeye değişmeden kopyalanır — yalnızca sıraları farklıdır.",
      },
    ],
  },
  "watermark-pdf": {
    name: "PDF Filigran Ekleme",
    tagline:
      "Her PDF sayfasına metin filigranı bas — ortalanmış veya döşenmiş; boyut, saydamlık, döndürme ve renk üzerinde tam kontrol, tamamen çevrimdışı.",
    intro: [
      "Taslaklar elinden çıkmadan GİZLİ, TASLAK veya İNCELEMEDE olarak işaretle. Sayfanın ortasında tek bir damga ya da tüm sayfaya yayılan döşenmiş bir desen seç; alttaki metnin okunur kalması için saydamlığı ayarla ve belgeye uyan bir renk belirle.",
      "Filigran, her sayfaya çizilen gerçek PDF metnidir — görsel yok, sunucu turu yok. pdf-lib ile cihazında işlendiği için hassas sözleşmeler bile yüklenmeden işaretlenebilir.",
    ],
    steps: [
      "İşaretlemek istediğin PDF'yi bırak.",
      "Filigran metnini yaz ve düzeni, boyutu, saydamlığı ve rengi ayarla.",
      "Filigran Ekle'ye tıkla ve damgalı PDF'yi indir.",
    ],
    faqs: [
      {
        q: "Hangi saydamlık en iyisi?",
        a: "Çoğu belge için %10–25 arası: bir bakışta görünür ama gövde metnini okunur tutacak kadar hafif. Zor okunması istenen taslaklar %40–50'ye çıkabilir.",
      },
      {
        q: "Bu araçla mevcut bir filigranı kaldırabilir miyim?",
        a: "Hayır. Bu araç yalnızca filigran ekler. Kaldırmak, sayfa içerik akışlarını düzenlemeyi gerektirir; bu başka (ve çoğu zaman hukuken tartışmalı) bir işlemdir.",
      },
      {
        q: "Filigran hangi karakterleri kullanabilir?",
        a: "Standart PDF yazı tipleri Latin metnini, noktalama işaretlerini ve © gibi yaygın simgeleri kapsar. Diğer alfabeler (Çince, Japonca, Arapça…) ? ile değiştirilir — filigranı Latin harfleriyle tut.",
      },
    ],
  },
  "sign-pdf": {
    name: "PDF İmzalama",
    tagline:
      "Fareyle veya parmağınla imzanı çiz ve herhangi bir PDF sayfasına yerleştir — doğal mürekkep tarzı bir damga, tamamen çevrimdışı oluşturulur.",
    intro: [
      "Sözleşmeleri, izin belgelerini ve formları yazdırmadan imzala. İmzanı panelde çiz, 3×3 ızgarada konumlandır (sağ alt köşe her zamanki yeridir), genişliğini ayarla ve istersen altına bugünün tarihini ekle. Saydam PNG doğrudan PDF'nin içine gömülür.",
      "Bu, günlük belgeler için ideal, görüntü tabanlı görünür bir imzadır. Kriptografik sertifika imzası değildir; belirli bir hukuki süreci karşılayıp karşılamadığı bulunduğun ülkeye göre değişir.",
    ],
    steps: [
      "PDF'yi bırak, sonra imzanı panelde çiz.",
      "Konumu, genişliği ve hedef sayfayı seç (varsayılan 1).",
      "İmzala ve indir'e tıklayarak imzalı PDF'yi kaydet.",
    ],
    faqs: [
      {
        q: "Bu imza hukuken bağlayıcı mı?",
        a: "Çizilmiş bir imza görüntüsü günlük anlaşmalarda yaygın olarak kabul edilir; ancak yasal ağırlık ülkeye ve belge türüne göre değişir. Zorunlu olan işlemler için bunun yerine nitelikli bir dijital sertifika kullan.",
      },
      {
        q: "İmza burada güvende mi?",
        a: "Evet. Tarayıcıda çizersin, görüntü kendi cihazında PDF'ye gömülür ve hiçbir şey iletilmez — imzanın kendisi bile.",
      },
      {
        q: "Belgenin her sayfasını imzalayabilir miyim?",
        a: "Evet. Sayfa alanına “1-5” gibi bir liste yaz ya da tek bir sayfa bırak; imza seçilen her sayfaya aynı konumda damgalanır.",
      },
    ],
  },
  "compress-pdf": {
    name: "PDF Sıkıştırma",
    tagline:
      "Ağır PDF'leri seçtiğin DPI ve JPEG kalitesinde sayfaları rasterleştirerek küçült — toplu işlem ve kesin önce/sonra boyutları, tamamen çevrimdışı.",
    intro: [
      "Taramalar ve görsel ağırlıklı raporlar çoğu zaman gerektiğinden 10 kat büyük olur. Bu araç her sayfayı seçtiğin çözünürlükte yeniden çizer (72–150 DPI ekran okumasını ve çoğu baskıyı karşılar) ve optimize edilmiş JPEG olarak yeniden kodlar; dosya boyutu genelde %50–90 azalır.",
      "Birden fazla dosyayı aynı anda işle ve indirmeden önce dosya başına kesin tasarrufu gör. İsteğe bağlı gri tonlama siyah-beyaz taramaları daha da küçültür. Her şey cihazında çalışır — sıkışsın ya da sıkışmasın, belgelerin yerinde kalır.",
    ],
    steps: [
      "Bir veya daha fazla PDF dosyası bırak (toplu işleme memnuniyetle).",
      "DPI ve JPEG kalitesini seç ya da gri tonlamayı etkinleştir.",
      "Sıkıştır'a tıkla, önce/sonra boyutları karşılaştır, sonra indir.",
    ],
    faqs: [
      {
        q: "Sıkıştırmadan sonra PDF'mde metin yine seçilebilir olacak mı?",
        a: "Hayır — bu yöntem sayfaları görüntülere rasterleştirir; metin piksele dönüşür. Büyük boyut kazancının bedeli budur. Aranabilir metne ihtiyacın varsa özgünü sakla ve sıkıştırılmış kopyayı yalnızca boyutun önemli olduğu yerlerde paylaş.",
      },
      {
        q: "Hangi ayarları seçmeliyim?",
        a: "E-posta ve web için 96 DPI + %60 civarı kalite iyi bir varsaylandır. PDF yazdırılacaksa 150 DPI kullan; 72 DPI + gri tonlama agresif ama salt metin arşivleri için uygundur.",
      },
      {
        q: "Dosya pek küçülmezse?",
        a: "Çok seyrek, salt metin PDF'leri zaten verimlidir ve sıkışmayabilir — tablo bunu dürüstçe söyler. DPI'ı veya kaliteyi düşürüp tekrar dene, ya da özgünün zaten hafif olduğunu kabul et.",
      },
    ],
  },
  "jpg-to-pdf": {
    name: "JPG'den PDF'ye",
    tagline:
      "JPG fotoğraflarını tarayıcında derli toplu bir PDF'ye çevir — toplu içe aktarma, sürüklemesiz sıralama ve A4, Letter veya görsele sığdırma sayfa boyutları.",
    intro: [
      "İstediğin sayıda JPG fotoğrafını tek bir düzgün PDF'ye dönüştür: vesikalık fotoğraflar, makbuzlar, ödev taramaları ya da tek ek olarak göndermen gereken bir kamera arşivi. Tüm görselleri bir kerede ekle, ok düğmeleriyle sırala ve her sayfanın fotoğrafa mı sığacağını yoksa kenar boşluklu A4/Letter mı olacağını seç.",
      "Fotoğraflar tam özgün kalitede gömülür — yeniden boyutlandırma yok, yeniden sıkıştırma yok, filigran yok. Dönüşüm cihazında olur; özel fotoğraflar bile hiçbir sunucuya dokunmaz.",
    ],
    steps: [
      "Dahil etmek istediğin tüm JPG görsellerini bırak.",
      "Sırayı düzenle ve bir sayfa boyutu seç (sığdır, A4 veya Letter).",
      "PDF Oluştur'a tıkla ve sonucu indir.",
    ],
    faqs: [
      {
        q: "Fotoğraflar PDF'de kalite kaybeder mi?",
        a: "Hayır. JPG dosyaların bayt bayt gömülür; PDF'nin içindeki görüntü verisi özgünüyle birebir aynıdır. Kalite yalnızca sonrasında PDF'yi sıkıştırırsan düşer.",
      },
      {
        q: "Bir kerede kaç görseli dönüştürebilirim?",
        a: "Tarayıcının belleğinin izin verdiği kadar — düzinelerce rutindir; yüzlerce çok megabaytlık fotoğraf yavaşlayabilir ama yine de yerel olarak çalışır.",
      },
      {
        q: "JPG'yi PNG veya başka biçimlerle karıştırabilir miyim?",
        a: "Evet — karışık yığınlar için genel Görselden PDF'ye aracını kullan; diğer biçimleri gömmeden önce otomatik olarak dönüştürür.",
      },
    ],
  },
  "png-to-pdf": {
    name: "PNG'den PDF'ye",
    tagline:
      "PNG ekran görüntülerini ve görselleri yeniden sıkıştırmadan tek PDF'ye çevir — toplu içe aktarma, özel sıralama, cihazında işlenir.",
    intro: [
      "Ekran görüntüleri, grafikler, şemalar ve tasarım çıktıları genelde PNG'dir — ve insanlar genelde bunları PDF olarak ister. Tüm yığını bırak, ok düğmeleriyle sırala ve kayıpsız bir PDF al: PNG verisi olduğu gibi gömülür, ekran görüntüsündeki metin jilet gibi keskin kalır.",
      "Piksel hassasiyetinde boyut için görsele sığdır sayfaları, baskı için kenar boşluklu A4/Letter seç. Her şey pdf-lib ile cihazında üretilir; yükleme yok, kalite kumarı yok.",
    ],
    steps: [
      "Birleştirmek istediğin PNG dosyalarını bırak.",
      "Sırala ve görsele sığdır ya da A4/Letter sayfaları seç.",
      "PDF Oluştur'a tıkla ve indir.",
    ],
    faqs: [
      {
        q: "PNG kalitesi tam olarak korunuyor mu?",
        a: "Evet. PNG akışı değişmeden gömülür; keskin kenarlar, küçük metin ve saydam tabanlı alanlar kaynak dosyalarla birebir görünür.",
      },
      {
        q: "Ekran görüntüleri için hangi sayfa boyutunu seçmeliyim?",
        a: "“Görsele sığdır” her ekran görüntüsünü özgün piksel boyutunda tutar — ekran okuması için en iyisi. PDF yazdırılacaksa kenar boşluklu A4 veya Letter seç.",
      },
      {
        q: "PNG tabanlı PDF'm neden hâlâ büyük?",
        a: "Kayıpsız PNG verisi doğası gereği büyüktür. Daha küçük bir dosyaya ihtiyacın varsa sonucu PDF Sıkıştırma'dan geçir; biraz sadakat karşılığında boyut kazandırır.",
      },
    ],
  },
  "image-to-pdf": {
    name: "Görselden PDF'ye",
    tagline:
      "Herhangi bir biçimdeki görselleri — JPG, PNG, WebP, GIF ve dahası — tek bir PDF'de birleştir; otomatik dönüşüm ve sıfır yükleme.",
    intro: [
      "Her resim için tek araç: JPG, PNG, WebP, GIF veya BMP dosyalarından oluşan karışık bir yığın bırak, hepsi tek bir PDF'ye yerleşsin. PDF'ye hazır olmayan her şey canvas üzerinden yerel olarak dönüştürülür; karışık yığınlar ayar gerektirmeden çalışır.",
      "Sayfaları sırala, görsele sığdır ya da kenar boşluklu A4/Letter seç ve dışa aktar. JPG ve PNG dönüştürücülerimizin çakı sürümüdür; aynı sözle: dosyalar asla cihazından çıkmaz.",
    ],
    steps: [
      "Desteklenen biçimlerin herhangi bir karışımında görselleri bırak.",
      "Listeyi yeniden sırala ve sayfa boyutunu seç.",
      "PDF Oluştur'a tıkla ve belgeni indir.",
    ],
    faqs: [
      {
        q: "Hangi biçimler destekleniyor?",
        a: "Tarayıcının gösterebildiği her şey: çoğu sistemde JPG, PNG, WebP, GIF, BMP ve AVIF. JPG veya PNG olan dosyalar yeniden kodlanmadan gömülür; diğerleri önce kayıpsız PNG'ye dönüştürülür.",
      },
      {
        q: "iPhone'dan gelen HEIC fotoğraflara ne olur?",
        a: "Modern tarayıcılar HEIC'yi çoğu zaman doğrudan çözemez. Önce HEIC'den JPG'ye aracımızla dönüştür, sonra JPG'leri burada birleştir.",
      },
      {
        q: "Hareketli GIF'ler PDF'de hareketli kalır mı?",
        a: "Hayır — PDF sayfası statiktir, ilk kareyi alırsın. Animasyonları videoya çevir ya da paylaşım için GIF'in kendisini kullan.",
      },
    ],
  },
  "pdf-to-jpg": {
    name: "PDF'den JPG'ye",
    tagline:
      "Her PDF sayfasını 300 DPI'a kadar JPG olarak dışa aktar — tek sayfa ya da çok sayfa için ZIP, tamamen cihazında dönüştürülür.",
    intro: [
      "PDF'yi paylaşılabilir görsellere çevir: her sayfa, seçtiğin çözünürlükte, sayfanın göründüğü gibi çizilen bir JPG olur — yazı tipleri, renkler ve görseller dahil. On sayfa, numaralı on dosya verir; daha fazlasında bir ZIP de alırsın.",
      "JPG, sohbetlerin, sunumların ve sosyal platformların her yerde kabul ettiği biçimdir. Çizim pdf.js ile yerel olarak yapılır — PDF asla yüklenmez; bu, sözleşmeler ve kişisel belgeler için önemlidir.",
    ],
    steps: [
      "Dönüştürmek istediğin PDF'yi bırak.",
      "Çıktı çözünürlüğünü seç (150 DPI çoğu ekran için uygundur).",
      "Dönüştür'e tıkla ve her sayfayı ya da ZIP'i indir.",
    ],
    faqs: [
      {
        q: "Hangi çözünürlüğü seçmeliyim?",
        a: "Ekran görüntülemesi için 96 DPI yeterlidir, 150 DPI dengeli varsaylandır, 200–300 DPI baskıya uygundur. Yüksek DPI, büyük dosyalar ve uzun belgelerde yavaş çizim demektir.",
      },
      {
        q: "Metin neden PDF'dekinden daha yumuşak görünüyor?",
        a: "JPG kayıplı bir fotoğraf biçimidir — düşük kalitede keskin harf kenarlarında hafif bozulmalar olur. DPI'ı yükselt ya da piksel hassasiyetli metin için PDF'den PNG'ye aracını kullan.",
      },
      {
        q: "Yalnızca bazı sayfaları dönüştürebilir miyim?",
        a: "Bu araç tüm belgeyi dönüştürür ve dosyaları sayfa numarasıyla adlandırır; yalnızca ihtiyacın olanları tutabilirsin. Önceden belirli bir aralık istiyorsan önce PDF Bölme'yi kullan.",
      },
    ],
  },
  "pdf-to-png": {
    name: "PDF'den PNG'ye",
    tagline:
      "PDF sayfalarını seçtiğin çözünürlükte kayıpsız PNG görsellerine çevir — jilet gibi slaytlar ve taramalar, çok sayfada ZIP ile birlikte.",
    intro: [
      "JPG bozulmalarının hoş karşılanmadığı yerlerde — slayt ekran görüntüleri, şemalar, küçük puntolu formlar — sayfaları PNG olarak dışa aktar. Kayıpsız biçim, 96'dan 300 DPI'a kadar harf kenarlarını ve ince çizgileri piksel kadar keskin tutar.",
      "Her sayfa pdf.js ile yerel olarak, PDF'nin tanımladığı tam görünümle çizilir. Dosyalar sayfa numarasıyla adlandırılır ve çok sayfalı sonuçlar tek tıklık bir ZIP ile gelir.",
    ],
    steps: [
      "PDF'ni kutuya bırak.",
      "Çözünürlüğü seç — 150 DPI sağlam bir varsaylandır.",
      "PNG'ye Dönüştür'e tıkla, sonra sayfaları ya da ZIP'i indir.",
    ],
    faqs: [
      {
        q: "JPG yerine ne zaman PNG kullanmalıyım?",
        a: "Sayfalar metin, düz renkler veya çizgi sanatı içerdiğinde: PNG bunları tamamen keskin tutar. JPG, küçük dosya boyutunun daha önemli olduğu fotoğraf sayfalarına uygundur.",
      },
      {
        q: "PNG dosyaları neden büyük?",
        a: "Kayıpsız sıkıştırma her pikseli korur; boyut DPI ile büyür. Yoğun bir sayfanın 300 DPI taraması birkaç megabayt olabilir; ekran kullanımı için 96–150 DPI'a in.",
      },
      {
        q: "Saydamlık korunur mu?",
        a: "Sayfalar beyaz bir zemine çizilir; çıktı opak PNG'dir. Bu, PDF'lerin yazdırıldığı gibi davranır ve görüntüleyicilerde siyah zemin sürprizlerini önler.",
      },
    ],
  },
  "pdf-to-word": {
    name: "PDF'den Word'e",
    tagline:
      "PDF metnini tarayıcında düzenlenebilir bir Word belgesine (.docx) çevir — metin odaklı dönüşüm, ücretsiz, hiçbir şey yüklenmeden.",
    intro: [
      "PDF'deki kelimeleri Word, Google Docs veya LibreOffice'te düzenleyebileceğin bir .docx'e çıkar. Başlıklar yazı tipi boyutlarından, paragraflar satır konumlarından yeniden kurulur ve sonuç, üzerinde çalışabileceğin temiz, hafif bir belgedir.",
      "Bu dürüst, metin odaklı bir dönüşümdür: karmaşık sayfa düzenlerini, sütunları veya görsel yerleşimi yeniden kurmaz. Kazancı tam gizliliktir — analiz ve .docx üretimi tamamen cihazında olur.",
    ],
    steps: [
      "Metin tabanlı bir PDF bırak (metnini seçebildiğin biri).",
      "Word'e Dönüştür'e tıkla ve biraz bekle.",
      ".docx'i indir ve istediğin yerde düzenle.",
    ],
    faqs: [
      {
        q: "Düzen neden özgün PDF'den farklı?",
        a: "Bu metin odaklı bir dönüşümdür: sayfayı piksel piksel kopyalamak yerine paragrafları ve başlık düzeylerini yeniden kurar. Aynı kelimeleri daha temiz, düzenlenebilir bir akışta bekle — görsel bir klon değil.",
      },
      {
        q: "PDF'im bir tarama ve boş bir belge üretiyor.",
        a: "Taranan PDF'ler metnin kendisini değil, metnin resmini içerir. Önce OCR aracımızdan geçir, sonra tanınan metni Word'e yapıştır veya Word'e dönüştür.",
      },
      {
        q: "Tablolar ve görseller kalır mı?",
        a: "Görseller .docx'e taşınmaz. Tablolar düz metin satırları olarak gelir — kullanılabilir, ama karmaşık olanları Word'de yeniden kurmak isteyeceksin.",
      },
    ],
  },
  "pdf-to-excel": {
    name: "PDF'den Excel'e",
    tagline:
      "PDF'nin satırlarını ve sütunlarını düzenlenebilir bir Excel tablosuna (.xlsx) çıkar — tarayıcında satır satır dönüşüm, ücretsiz.",
    intro: [
      "PDF'ye kilitlenmiş banka ekstreleri, fiyat listeleri ve raporlar yeniden işlenebilir veriye döner: her görsel satır bir tablo satırına dönüşür, geniş boşluklarla ayrılan metin otomatik olarak sütunlara bölünür. Her şeyi geri izleyebilmen için sayfa numaraları ilk sütunda tutulur.",
      "Bu pratik, metin tabanlı bir çıkarmadır — yapay zekâ ile tablo yeniden kurulumu değil. Eşit aralıklı ekstrelerde ve hizalı listelerde parlar; dağınık çok satırlı tablolar Excel'de hızlı bir düzeltme isteyebilir. Pazarlık şu: verilerin cihazdan asla çıkmaz.",
    ],
    steps: [
      "Metin tabanlı bir PDF bırak (seçilebilir metin, fotoğraf taraması değil).",
      "Excel'e Dönüştür'e tıkla.",
      ".xlsx'i indir ve Excel'de birleşik satırları düzelt.",
    ],
    faqs: [
      {
        q: "Sütunlar nasıl algılanıyor?",
        a: "Satırlar, iki veya daha fazla boşluğun göründüğü yerden hücrelere bölünür — PDF metnindeki her zamanki hizalama ipucu. İyi hizalanmış tablolar temiz dönüşür; düz yazı, satır başına bir hücreye dönüşür.",
      },
      {
        q: "Taramam boş bir sayfa veriyor.",
        a: "Taramalarda metin katmanı yoktur. Dosyayı önce OCR aracımızdan geçir, sonra tanınan metni Excel'e yapıştır veya OCR çıktısını burada dönüştür.",
      },
      {
        q: "Sayılar biçimlendirmesini koruyabilir mi?",
        a: "Değerler basıldığı gibi metin olarak gelir; baştaki sıfırlar ve bölgesel ondalık virgüller korunur — sütunu dönüştürene kadar Excel bunları metin sayar.",
      },
    ],
  },
  "pdf-to-ppt": {
    name: "PDF'den PowerPoint'e",
    tagline:
      "Her PDF sayfasını yüksek çözünürlüklü bir görüntü olarak PowerPoint slaydına çevir — kendi cihazında üretilen, düzeni kusursuz slaytlar.",
    intro: [
      "PDF'ni bir sunum destesine mi koymak istiyorsun? Her sayfa yüksek çözünürlükte çizilir ve kendi 16:9 slaydına yerleştirilir; görsel sonuç özgünüyle birebir aynıdır — yazı tipleri, renkler ve grafikler, izleyicide font kurulu olmasa bile yerinde kalır.",
      "Slaytlar düzenlenebilir metin kutuları değil, görüntülerdir: bu bilinçli bir tercihtir, çünkü görüntü slaytlar makineler arasında asla bozulmaz. Metne de ihtiyacın varsa PDF'den Word'e aracımızla birleştir.",
    ],
    steps: [
      "Destene koymak istediğin PDF'yi bırak.",
      "PowerPoint'e Dönüştür'e tıkla ve her sayfanın çizilmesini bekle.",
      ".pptx'i indir ve PowerPoint, Keynote veya Google Slides'ta aç.",
    ],
    faqs: [
      {
        q: "Slaytlardaki metni düzenleyebilir miyim?",
        a: "Hayır — her slayt sayfanın sadık bir resmini içerir, metin kutusu değil. Bu, her yerde aynı görünümü garantiler. Düzenlenebilir metne ihtiyacın varsa metni ayrıca PDF'den Word'e ile çıkar.",
      },
      {
        q: "Hangi slayt boyutu kullanılıyor?",
        a: "Geniş ekran 16:9 (13,33 × 7,5 inç), PowerPoint varsayılanı. Farklı en-boy oranlı sayfalar bozulmadan ortalanır ve sığdırılır.",
      },
      {
        q: ".pptx dosyası ne kadar büyük olur?",
        a: "Yaklaşık tüm sayfa görüntülerinin toplamı kadar — yüksek çözünürlükte 20 sayfalık bir PDF onlarca megabayta ulaşabilir. Daha hafif bir deste istiyorsan önce kaynak PDF'yi sıkıştır.",
      },
    ],
  },
  "word-to-pdf": {
    name: "Word'den PDF'ye",
    tagline:
      "Word .docx belgelerini tarayıcında PDF'ye çevir — başlıklar ve kalın metinle metin odaklı dizgi, hiçbir şey asla yüklenmez.",
    intro: [
      ".docx'i temiz, paylaşılabilir bir PDF'ye çevir: paragraflar, başlıklar ve kalın bölümler düzgün kenar boşluklarıyla A4 sayfalarına dizilir; çıktı, Word kurulu olmasa bile derli toplu görünür. Okumak, yazdırmak ve göndermek sürtünmesiz hale gelir.",
      "Bu dürüst, metin odaklı bir dönüşümdür, Word düzeninin piksel klonu değil: özgündeki görseller, tablolar ve sayfa süsleri taşınmaz. Elde ettiğin şey, belgenin metninin güvenilir, her yerde okunabilir bir PDF'sidir — tamamen cihazında üretilir.",
    ],
    steps: [
      "Bir .docx dosyası bırak (Word 2007 ve sonrası).",
      "PDF'ye Dönüştür'e tıkla.",
      "Dizilmiş PDF'yi indir.",
    ],
    faqs: [
      {
        q: "PDF'im neden Word'dekinden farklı görünüyor?",
        a: "Bu araç metni, Word'un motorunu taklit etmek yerine kendi temiz düzeniyle yeniden dizler. Özgündeki yazı tipleri, boşluklar ve görseller yeniden üretilmez — kelimeler, başlıklar ve vurgular üretilir.",
      },
      {
        q: "Görseller ve tablolar dahil mi?",
        a: "Hayır, yalnızca metin — başlıklar ve kalın metin dahil. Görsellerin önemli olduğu belgeler için PDF'yi Word'den çıkar; bu aracı metin öncelikli taslaklar ve notlar için kullan.",
      },
      {
        q: "Eski .doc dosyalarını veya Latin olmayan metni destekliyor mu?",
        a: "Yalnızca .docx desteklenir. Metin PDF standart yazı tiplerini kullanır; Latin tabanlı diller doğru görünürken diğer alfabeler (Çince, Arapça…) şimdilik ? ile değiştirilir.",
      },
    ],
  },
  "pdf-to-text": {
    name: "PDF'den Metne",
    tagline:
      "Herhangi bir PDF'den düz metni anında çıkar — önizle, panoya kopyala veya .txt olarak kaydet; tarayıcında sayfa sayfa ayıklanır.",
    intro: [
      "PDF'deki ham kelimeleri, sayfa sayfa kopyala-yapıştır yapmadan al. Ayıklayıcı belgeyi baştan sona yürütür, okuma sırasını yeniden kurar ve önizleyip bir kerede kopyalayabileceğin ya da .txt olarak indirebileceğin temiz düz metni verir.",
      "Alıntıları notlara taşımak, metni başka bir araçtan geçirmek ya da bir belgenin salt metin arşivini oluşturmak için kullan. Kelime sayıları ilerledikçe görünür ve her şey yerel olduğu için ayıklama anlıktır.",
    ],
    steps: [
      "Seçilebilir metinli bir PDF bırak.",
      "Metni Çıkar'a tıkla ve önizlemeyi oku.",
      "Sonucu kopyala ya da .txt dosyası olarak indir.",
    ],
    faqs: [
      {
        q: "Sonuç boş — neden?",
        a: "PDF muhtemelen bir taramadır: sayfaları metnin fotoğraflarıdır, metin katmanı yoktur. Bunun yerine OCR aracını kullan; harfleri görüntülerin içinden okur.",
      },
      {
        q: "Okuma sırası nasıl belirleniyor?",
        a: "Metin öğeleri koordinatlarına göre satırlara gruplanır ve satırlar yukarıdan aşağıya, soldan sağa sıralanır. Çok sütunlu düzenlerde sütunlar iç içe geçebilir; önce PDF'yi sütun aralıklarına bölmek yardımcı olabilir.",
      },
      {
        q: "Sayfa veya boyut sınırı var mı?",
        a: "Yapay bir sınır yok. Yüzlerce sayfa çalışır; pratik sınır tarayıcı belleğidir ve genellikle 100 MB'lık belgelerin de ötesindedir.",
      },
    ],
  },
  "ocr-pdf": {
    name: "PDF OCR",
    tagline:
      "Taranmış PDF'lere OCR'ı tamamen tarayıcında uygula — İngilizce, Çince, Japonca ve dahasını tanı, sonra metni kopyala veya kaydet.",
    intro: [
      "Taranmış sözleşmelerin, makbuzların ve kitapların seçilebilir metni yoktur — OCR bu metni onlara kazandırır. Her sayfa tarayıcında çizilir ve Tesseract motoruyla okunur; İngilizce, Basitleştirilmiş Çince, Japonca, İspanyolca, Portekizce, Fransızca ve Almanca desteği vardır.",
      "İlk kullanımda tarayıcın OCR motorunu ve dil modelini (10–20 MB) herkese açık bir CDN'den indirir — tek ağ trafiği budur ve belgenini asla içermez. Tanımanın kendisi cihazında olur.",
    ],
    steps: [
      "Taranmış bir PDF bırak ve belgenin dilini seç.",
      "İstersen OCR'ı belirli sayfalarla sınırla, sonra OCR'ı Çalıştır'a tıkla.",
      "Tanınan metni kopyala ya da .txt dosyası olarak indir.",
    ],
    faqs: [
      {
        q: "İlk çalıştırma neden internet bağlantısı istiyor?",
        a: "Tesseract OCR motoru ve dil modeli ilk kullanımda bir CDN'den alınır (10–20 MB, sonrasında önbelleğe alınır). PDF'nin kendisi asla yüklenmez — model yüklendikten sonra tanıma yerel olarak çalışır.",
      },
      {
        q: "Tanıma doğruluğunu nasıl artırabilirim?",
        a: "300 DPI ile tara, sayfayı düz tut ve doğru dili seç. Temiz siyah-beyaz sayfalar %90'ın oldukça üzerinde doğruluğa ulaşır; gölgeli, eğri fotoğraflar çok daha kötü sonuç verir.",
      },
      {
        q: "El yazısını okuyabilir mi?",
        a: "Güvenilir biçimde hayır. Tesseract basılı metinle eğitilmiştir — düzgün tipografi çalışır, el yazısı genellikle anlamsız sonuç üretir.",
      },
    ],
  },
  "page-numbers-pdf": {
    name: "PDF'ye Sayfa Numarası Ekleme",
    tagline:
      "Bir PDF'ye sayfa numaraları bas — biçimi, köşeyi ve başlangıç numarasını seç; her şey tarayıcında yerel olarak yapılır.",
    intro: [
      "Yazdırmadan veya paylaşmadan önce bir PDF'ye düzgün sayfa numaraları ver: bir biçim seç (1, 1/N veya Sayfa 1/N), altı köşeden birini seç, başlangıç numarasını ayarla — dosya cihazında yeniden kurulur ve indirilmeye hazır olur.",
      "Raporlar, sözleşmeler, taranmış yığınlar ve toplantıda sayfa numarasıyla atıf yapılan her şey için kullanışlıdır.",
    ],
    steps: [
      "Numaralandırmak istediğin PDF'yi bırak.",
      "Biçimi, köşeyi ve başlangıç numarasını seç.",
      "Sayfa Numaraları Ekle'ye tıkla ve damgalı dosyayı indir.",
    ],
    faqs: [
      {
        q: "Kapak sayfasını atlayabilir miyim?",
        a: "“Numaralandırmayı başlat” değerini 0 yap; kapak 0 numarasını alır — ya da önce kapağı böl, gerisini numaralandır, sonra yeniden birleştir.",
      },
      {
        q: "Numaralar farklı sayfa boyutlarında tutarlı görünür mü?",
        a: "Her sayfa kendi genişliğine ve yüksekliğine göre damgalanır; karışık yönlendirmeler ve sayfa boyutları da numarayı aynı görsel köşede alır.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* Görsel                                                              */
  /* ------------------------------------------------------------------ */
  "image-compressor": {
    name: "Görsel Sıkıştırma",
    tagline:
      "JPG, PNG ve WebP görsellerini canlı kalite kaydırıcısı, toplu işlem ve anlık önce/sonra boyutlarla sıkıştır — her şey tarayıcında.",
    intro: [
      "Tek bir görsel ya da bütün bir yığın bırak ve dosya boyutlarının gerçek zamanla düşüşünü izle. %10'dan %100'e uzanan kalite kaydırıcısı, ağırlıkla keskinlik arasındaki dengeyi sana bırakır; her satır, sıkıştırılmış sonucun yanında özgün boyutu da gösterir, ne kadar kazandığını tam olarak bilirsin.",
      "Çıktı JPG (fotoğraflar için en küçük), WebP (aynı kalitede genellikle JPG'den %20–30 küçük) veya PNG (kayıpsız) olabilir. Her şey, tarayıcının kendi görsel kodlayıcısıyla cihazında çalışır — yükleme yok, kuyruk yok, filigran yok.",
    ],
    steps: [
      "Görsellerini kutuya bırak (veya tıklayarak seç) — istediğin kadar.",
      "Bir çıktı biçimi seç ve boyut sütunu doğru görünene dek kalite kaydırıcısını sürükle.",
      "Her sıkıştırılmış görseli indir ya da hepsini bir kerede al.",
    ],
    faqs: [
      {
        q: "Bir JPEG'i iki kez sıkıştırmak neden daha kötü görünmesine yol açar?",
        a: "JPEG kayıplıdır: her kayıt, geri getirilemeyen bir detayı çöpe atar. Zaten sıkıştırılmış bir JPEG'i yeniden sıkıştırmak, eskilerin üzerine yeni bozulmalar ekler. En iyi sonuç için daima özgün dosyadan sıkıştır ve JPEG'leri tekrar tekrar kaydetmekten kaçın.",
      },
      {
        q: "Hangi biçim en küçük dosyayı verir?",
        a: "Fotoğraflarda WebP, aynı görsel kalitede genellikle JPEG'den %20–30 küçüktür ve JPEG de PNG'yi yener. PNG yalnızca az renkli düz grafikler, ekran görüntüleri ve logolarda kazanır. Başlangıç olarak kalite 75–85'te WebP'yi dene.",
      },
      {
        q: "Görselim bir sunucuya yükleniyor mu?",
        a: "Hayır. Sıkıştırma, tarayıcının yerleşik canvas kodlayıcısıyla yapılır. Dosyalar cihazından asla çıkmaz — interneti kessen bile çalışmaya devam eder.",
      },
    ],
  },
  "image-resizer": {
    name: "Görsel Boyutlandırma",
    tagline:
      "Görselleri en-boy kilidiyle tam piksele veya yüzdeye göre yeniden boyutlandır, bütün yığınları tek seferde işle — hiçbir şey cihazından çıkmaz.",
    intro: [
      "Tam genişlik ve yüksekliği piksel olarak yaz ya da yüzdeyle ölçekle (%25, %50, %200…). En-boy kilidi açıkken bir kenarı değiştirdiğinde oranlar doğru kalır; kilidi açarsan herhangi bir özel ölçüyü zorlayabilirsin — platform avatar veya banner boyutları için kullanışlı.",
      "Toplu mod, ayarlarını bıraktığın her dosyaya uygular; bir klasör dolusu fotoğraf tek geçişte web için küçültülebilir. Küçültme yüksek kaliteli yumuşatmayla yapılır ve çıktı özgün biçimi korur.",
    ],
    steps: [
      "Bir veya daha fazla görseli kutuya bırak.",
      "Piksel cinsinden genişlik/yükseklik ya da ölçek yüzdesi gir; en-boy oranını korumak veya serbest bırakmak için kilidi aç/kapat.",
      "Yeniden boyutlandırılan görselleri tek tek ya da hep birlikte indir.",
    ],
    faqs: [
      {
        q: "Bir görseli büyütmek kalitesini düşürür mü?",
        a: "Evet. Büyütme, var olmayan pikselleri icat etmek zorundadır; bu da yumuşaklık veya bulanıklık üretir — hiçbir araç hiç yakalanmamış gerçek detayı ekleyemez. Küçültme güvenlidir: pikseller temiz interpolasyonla atılır. Büyütmede beklentileri mütevazı tut (%150'ye kadar genelde iyi görünür).",
      },
      {
        q: "En-boy kilidi ne işe yarar?",
        a: "Kilit açıkken genişliği değiştirmek yüksekliği otomatik yeniden hesaplar (ve tersi); görsel asla esnemez veya ezilmez. Yalnızca bilerek farklı bir şekil istiyorsan kapat — resim bozulur.",
      },
      {
        q: "Boyutlandırılan PNG görselleri saydamlığını korur mu?",
        a: "Evet. Boyutlandırma özgün biçimi korur; PNG saydamlığı ve WebP alfa kanalı dokunulmadan kalır. Yalnızca JPG'ye dönüştürmek saydamlığı beyaz bir zemine yapıştırır.",
      },
    ],
  },
  "crop-image": {
    name: "Görsel Kırpma",
    tagline:
      "Fotoğrafları sürüklenebilir tutamaçlarla ve piksel hassasiyetinde ofsetlerle 1:1, 4:3, 16:9 veya serbest bir alana kırp — hızlı, gizli, toplu işe hazır.",
    intro: [
      "Köşe tutamaçlarını sürükleyerek tam saklamak istediğini çerçevele ya da piksel hassasiyetli kırpma için X, Y, genişlik ve yüksekliği doğrudan yaz. Oran ön ayarları — avatar için 1:1, baskı için 4:3 ve 3:2, video ve story'ler için 16:9 ve 9:16 — seçimi anında doğru şekle oturtur.",
      "Bir fotoğraf grubuyla mı çalışıyorsun? Aynı seçim, yığındaki her dosyaya orantılı olarak ölçeklenir; bütün bir klasör tutarlı biçimde kırpılır. Kırpma yalnızca pikselleri keser — yeniden ölçeklemez — saklanan alan tam özgün kalitede kalır.",
    ],
    steps: [
      "Bir veya daha fazla görsel bırak; her birini önizlemek ve kırpmak için dosya adına tıkla.",
      "Bir oran ön ayarı seç ya da seçim tutamaçlarını sürükle; X / Y / G / Y alanlarıyla ince ayar yap.",
      "Kırpmayı uygula ve sonuçları indir.",
    ],
    faqs: [
      {
        q: "Kırpmak görselin kalitesini düşürür mü?",
        a: "Hayır. Kırpma, dıştaki pikselleri keser — sakladığın alan tam özgün çözünürlüğüyle kopyalanır. Kalite yalnızca sonucu sonra yeniden boyutlandırır veya sıkıştırırsan değişir.",
      },
      {
        q: "Farklı boyutlardaki görsellerde toplu kırpma nasıl çalışır?",
        a: "Seçim, önizlediğin görsele göre saklanır. Diğer dosyalara uygulanırken her görselin kendi ölçülerine orantılı biçimde ölçeklenir; kırpmanın kompozisyonu tüm yığın boyunca tutarlı kalır.",
      },
      {
        q: "Profil fotoğrafı için hangi oranı kullanmalıyım?",
        a: "1:1 (kare). Çoğu sosyal platform avatarları karenin içindeki bir daireye kırpar; bu yüzden konuyu 1:1 seçimin ortasına almak en güvenli tercihtir.",
      },
    ],
  },
  "rotate-image": {
    name: "Görsel Döndürme",
    tagline:
      "Görselleri 90°, 180° veya 270° döndür, yatay veya dikey aynala — toplu işlem dostu, anında ve tamamen tarayıcında.",
    intro: [
      "Fotoğrafları doğru yöne çevir, yandan gelen taramaları düzelt ya da ters yerleşimli bir düzen için bir görseli aynala. Her düğme, yüklediğin tüm dosyalara aynı anda uygulanır ve küçük bir gösterge mevcut döndürme ve aynalama durumunu her zaman görünür tutar.",
      "Döndürmeler ve aynalamalar gerçek piksellere işlenir; kaydedilen dosya her yerde aynı görünür — hiçbir oynatıcı veya görüntüleyici onu geri “düzeltemez”. Çıktı her görselin özgün biçimini korur.",
    ],
    steps: [
      "Bir veya daha fazla görseli kutuya bırak.",
      "Önizleme durumu istediğin gibi görünene dek döndürme ve aynalama düğmelerine tıkla.",
      "Düzeltilen görselleri tek tek ya da hep bir kerede indir.",
    ],
    faqs: [
      {
        q: "JPEG döndürmek kayıpsız mı?",
        a: "Bu araçta döndürme, piksellerin yeniden kodlanmasıyla uygulanır; dosya yeniden üretilir (JPG için varsayılan %92 JPEG kalitesi). Pratikte fark görünmez ama bayt bayt aynı değildir — “kayıpsız döndürme” iddia eden araçlar yalnızca JPEG blok ızgarasının katları olan boyutlarda çalışır.",
      },
      {
        q: "Bir fotoğraf neden bir uygulamada döndürülmüş, diğerinde doğru görünüyor?",
        a: "Bazı görseller gerçekten döndürülmüş pikseller yerine EXIF verisinde yalnızca bir yönlendirme bayrağı saklar ve her uygulama bu bayrağı uygulamaz. Bu araç döndürmeyi doğrudan piksellere yazar ve bayrağı atar; sonuç her yerde aynı görünür.",
      },
      {
        q: "Bir fotoğrafı ayna gibi yatay çevirebilir miyim?",
        a: "Evet — soldan-sağa aynalamak için “Yatay çevir”, yukarıdan-aşağı için “Dikey çevir” düğmesini kullan. Herhangi bir döndürmeyle birleştirilebilir.",
      },
    ],
  },
  "convert-image": {
    name: "Görsel Dönüştürme",
    tagline:
      "PNG, JPG ve WebP arasında ayarlanabilir kaliteyle görsel dönüştür — bütün bir klasör bırak ve her sonucu tek tıkla indir.",
    intro: [
      "Önemli üç biçim için tek dönüştürücü: kayıpsız grafikler ve saydamlık için PNG, evrensel fotoğraf uyumu için JPG, yüksek kalitede en küçük dosyalar için WebP. Hedef biçimi seç, biçim izin veriyorsa kalite kaydırıcısını ayarla ve bırakılan her dosya yerinde dönüştürülür.",
      "Dönüşüm, tarayıcının kendi canvas kodlayıcısıyla cihazında çalışır — yükleme adımı hiç yoktur. Her sonuç satırı önceki ve sonraki boyutu gösterir; biçim değişikliğinin gerçekten işe yarayıp yaramadığını hemen görürsün.",
    ],
    steps: [
      "İstediğin görselleri bırak — karışık biçimler sorun değil.",
      "Çıktı olarak PNG, JPG veya WebP seç; JPG veya WebP için kaliteyi ayarla.",
      "Dönüştürülen dosyaları tek tek ya da hep birlikte indir.",
    ],
    faqs: [
      {
        q: "Hangi çıktı biçimini seçmeliyim?",
        a: "Her yerde açılması gereken fotoğraflar için JPG; küçük dosyaların önemli olduğu web için WebP; ekran görüntüleri, logolar ve saydamlık ya da piksel hassasiyeti gereken her şey için PNG. Fotoğraflarda şüphedeysen, kalite ~85'teki WebP harika bir varsaylandır.",
      },
      {
        q: "JPG'yi PNG'ye dönüştürmek kalitesini artırır mı?",
        a: "Hayır. JPEG sıkıştırma bozulmaları piksellere işlenmiştir; dönüştürme onları kaldıramaz — PNG aynı görünümü kayıpsızca saklar, genellikle daha büyük bir boyutta. Dönüştürme yalnızca kabı ve kodlamayı değiştirir, yakalanan detayı değil.",
      },
      {
        q: "Tüm tarayıcılar WebP dönüşümünü destekliyor mu?",
        a: "Chrome, Edge, Firefox ve Safari 17+ WebP kaydedebilir. Tarayıcın WebP kodlayamıyorsa araç bunu söyler ve JPG'ye döner; her zaman kullanılabilir bir dosya alırsın.",
      },
    ],
  },
  "jpg-to-png": {
    name: "JPG'den PNG'ye",
    tagline:
      "JPG fotoğraflarını kayıpsız çıktı ve toplu destekle anında PNG'ye çevir — ücretsiz, gizli, yükleme yok, tamamen tarayıcında.",
    intro: [
      ".jpg dosyalarını bırak ve tek tıkla piksel dengi .png kopyalar al. PNG görüntüyü ek kayıp olmadan saklar; bu da onu yeniden düzenleme, arşivleme veya JPEG dosyalarını kabul etmeyen platform ve araçlar için ilk tercih yapar.",
      "Toplu mod, bütün bir fotoğraf yığınını tek geçişte dönüştürür ve her dosyanın oluşan boyutunu gösterir. PNG'nin JPG'den genellikle daha büyük dosyalar ürettiğini unutma — bu, kayıpsız saklamanın bedelidir, dönüşümün kusuru değildir.",
    ],
    steps: [
      "JPG görsellerini bırak (veya tıklayarak seç) — birden fazla dosya memnuniyetle.",
      "Her dosya yerel olarak dönüştürülürken bir an bekle.",
      "PNG dosyalarını tek tek ya da hep bir kerede indir.",
    ],
    faqs: [
      {
        q: "PNG dosyası JPG'den daha mı iyi görünür?",
        a: "Hayır — aynı görünür. Dönüştürme, çoktan yapılmış sıkıştırmayı geri alamaz; PNG yalnızca mevcut görünümü, sonra düzenleyip yeniden kaydettiğinde yeni bozulma eklemeden korur. Kalite artışı için değil, iş akışları için kullan.",
      },
      {
        q: "PNG'm neden özgün JPG'den büyük?",
        a: "JPG, fotoğraflar için tasarlanmış agresif kayıplı sıkıştırma kullanır; PNG ise her pikseli tam olarak saklar. Aynı resim bu yüzden PNG olarak daha fazla yer kaplar. Dosya boyutu kayıpsız düzenlemeden önemliyse JPG veya WebP daha iyi bir hedeftir.",
      },
      {
        q: "JPG'den PNG'ye dönüştürmek saydamlık ekler mi?",
        a: "Hayır. JPEG asla saydamlık saklamaz, geri getirilecek bir şey yoktur — dönüştürülen PNG'n tamamen opaktır. Bir zemini kesip çıkarmak için ayrı bir arka plan kaldırma aracı gerekir.",
      },
    ],
  },
  "png-to-jpg": {
    name: "PNG'den JPG'ye",
    tagline:
      "PNG görsellerini JPG'ye çevirip dosya boyutunu gözle görülür biçimde küçült — saydam alanlar tertemiz beyaz bir zemin alır, kalite ayarlanabilir kalır.",
    intro: [
      "Ağır .png dosyalarını, daha hızlı yüklenen ve her yerde açılan kompakt .jpg kopyalarına çevir. Kalite kaydırıcısı (varsayılan %92), tipik ekran görüntüleri ve fotoğraflarda boyutu %60–90 kısarken sonucu gözle ayırt edilemez tutar.",
      "PNG saydamlığı JPG'de yaşayamaz; saydam alanlar saf beyaza yapıştırılır — yalnızca JPEG kabul eden formlar, avatarlar ve pazaryerleri için standart muamele. Toplu mod bütün bir klasörü tek seferde halleder.",
    ],
    steps: [
      "PNG görsellerini bırak — bir tane de olur, bir yığın da.",
      "Daha küçük dosyalar ya da en yüksek sadakat için JPG kalitesini ayarla.",
      "JPG dosyalarını tek tek ya da hep birlikte indir.",
    ],
    faqs: [
      {
        q: "PNG'den JPG'ye dönüşümde saydam alanlara ne olur?",
        a: "JPG'nin alfa kanalı yoktur; saydam pikseller kaydedilmeden önce düz beyazla doldurulur. Farklı bir zemin rengi gerekiyorsa ya da gerçek saydamlığı korumanız gerekiyorsa PNG'de (veya WebP'de) kal.",
      },
      {
        q: "JPG ne kadar küçük olur?",
        a: "Ekran görüntüleri ve fotoğraflar için tipik olarak %60–90 küçük. Keskin kenarlı düz grafikler o kadar dramatik küçülmez ve düşük kalitede hafif bulanıklaşabilir — metin ve arayüz görsellerinde kaydırıcıyı %85'in üzerinde tut.",
      },
      {
        q: "Dönüştürme görseli daha keskin yapabilir veya bozulmaları giderebilir mi?",
        a: "Hayır. Dönüştürme yalnızca kodlamayı değiştirir; detay ekleyemez. PNG zaten yumuşak görünüyorsa JPG de aynı şekilde yumuşak görünür (çok düşük kalite ayarlarında hafif sıkıştırma gürültüsü olabilir).",
      },
    ],
  },
  "webp-converter": {
    name: "WebP Dönüştürücü",
    tagline:
      "Görselleri WebP'ye çevir ya da WebP dosyalarını geri JPG ve PNG'ye dön — hedef biçimi seç, kaliteyi ayarla, toplu olarak işle.",
    intro: [
      "WebP'ye geçmek, aynı görsel kalitede JPG'ye göre dosya boyutlarını %25–35 kısar — web siteleri ve uygulamalar için ideal. WebP'den JPG'ye veya PNG'ye dönmek ise görselleri, Google'ın bu biçimini hiç öğrenmemiş eski yazılımlarda açılabilir kılar.",
      "WebP, JPG, PNG ve daha fazlasının herhangi bir karışımını bırak, çıktı biçimini seç; her dosya anında dönüştürülür ve her satırda önce/sonra boyut gösterilir. Her şey, kendi cihazında tarayıcın tarafından kodlanır — asla yükleme yok.",
    ],
    steps: [
      "WebP'den çıkmak için WebP dosyaları, WebP'ye çevirmek için herhangi bir görsel bırak.",
      "Çıktı biçimini (WebP, JPG veya PNG) seç ve kayıplı biçimler için kaliteyi ayarla.",
      "Dönüştürülen dosyaları tek tek ya da hep birlikte indir.",
    ],
    faqs: [
      {
        q: "JPG yerine neden WebP kullanmalıyım?",
        a: "WebP, eşdeğer kalitede JPG'den %25–35 daha küçük sıkıştırır ve hem saydamlığı hem animasyonu destekler. Günümüzün her tarayıcısı onu gösterir; web görselleri için standart seçimdir. Yalnızca çok eski yazılımları desteklemen gerekiyorsa JPG'yi seç.",
      },
      {
        q: "WebP dosyası her uygulamada açılır mı?",
        a: "Tüm modern tarayıcılar ile Windows, macOS, Android ve iOS'un güncel sürümleri WebP'yi halleder. Bazı eski fotoğraf editörleri ve bazı web formları hâlâ reddeder — tam da o zaman burada JPG'ye veya PNG'ye geri çevir.",
      },
      {
        q: "WebP'ye dönüşüm kayıpsız mı?",
        a: "Sen seçersin: WebP hem kayıpsız hem kayıplı kodlamayı destekler. Varsayılan 90 kalitesinde sonuç gözle ayırt edilemez ama çok daha küçüktür; en fazla tasarruf için kaydırıcıyı düşür ya da kesin kayıpsızlık için PNG çıktısını seç.",
      },
    ],
  },
  "heic-to-jpg": {
    name: "HEIC'den JPG'ye",
    tagline:
      "iPhone HEIC fotoğraflarını her yerde açılan JPG veya PNG'ye çevir — kalite kontrolüyle toplu dönüşüm, her şey cihazında.",
    intro: [
      "iPhone'lar fotoğrafları HEIC olarak kaydeder; Windows, çok sayıda web sitesi ve eski uygulamalar bu verimli biçimi hâlâ açmayı reddeder. .heic dosyalarını buraya bırak ve saniyeler içinde herkesin okuyabildiği JPG kopyalarını (veya kayıpsız PNG) al — çözücü yerel çalışır, fotoğrafların hiçbir sunucuya dokunmaz.",
      "Toplu mod bütün bir kamera arşivini bir kerede halleder; kalite kaydırıcısı JPG boyutuyla sadakat arasındaki dengeyi kurar. HEIC çözme tamamen tarayıcında olduğundan büyük fotoğraflar her biri birkaç saniye sürebilir.",
    ],
    steps: [
      ".heic veya .heif dosyalarını bırak (önce iPhone'undan AirDrop ile ya da indirerek aktar).",
      "JPG veya PNG çıktısını seç ve JPEG kalitesini ayarla.",
      "Dönüştür'e bas ve her yerde açılan görselleri indir.",
    ],
    faqs: [
      {
        q: "HEIC nedir, fotoğraflarım neden onu kullanıyor?",
        a: "HEIC (High Efficiency Image Container), iOS 11'den beri iPhone'larda varsayılan fotoğraf biçimidir. Fotoğrafları kabaca JPEG'in yarısı boyutta saklar ama Apple ekosistemi dışındaki destek hâlâ yamalıdır — paylaşım için JPG'ye dönüştürmek bu yüzden güvenilir tercih olmaya devam ediyor.",
      },
      {
        q: "HEIC'den JPG'ye dönüşüm kalite kaybettirir mi?",
        a: "Biraz, ama varsayılan %90 kalitede fark pratikte görünmez. Sıfır ek kayıp istiyorsan PNG çıktısını seç — çok daha büyük dosyalar pahasına.",
      },
      {
        q: "iPhone fotoğraflarım bir yere yükleniyor mu?",
        a: "Hayır. Dönüşüm, tarayıcında yerel bir HEIC çözücüyle olur. Fotoğrafların baştan sona cihazında kalır — bu araç, sayfa bir kez yüklendikten sonra çevrimdışı bile çalışır.",
      },
    ],
  },
  "svg-converter": {
    name: "SVG'den PNG'ye Dönüştürücü",
    tagline:
      "SVG ikonları ve grafikleri 1× ile 4× veya herhangi bir özel ölçekte jilet gibi PNG'lere çevir — saydamlık korunur, uygulama varlıkları için ideal.",
    intro: [
      "SVG'ler tasarım için mükemmeldir ama pek çok yer — uygulama mağazaları, editörler, mesajlaşma uygulamaları, eski CMS'ler — raster bir PNG ister. Bu araç vektör dosyanı tam ihtiyacın olan boyutta çizer: önizleme için 1×, retina ekranlar için 2×, baskı kalitesinde çıktılar için 3×–4× veya özel bir çarpan.",
      "PNG, SVG'nin saydam zeminini korur ve vektör hedef çözünürlükte yeniden çizilir (gerdirilmez); kenarlar jilet gibi keskin kalır. Bütün bir ikon setini bir kerede bırak — her dosya tek geçişte dönüştürülür.",
    ],
    steps: [
      "Bir veya daha fazla .svg dosyası bırak.",
      "Bir ölçek seç: 1×–4× veya istediğin özel bir çarpan yaz.",
      "PNG dosyalarını tek tek ya da hep birlikte indir.",
    ],
    faqs: [
      {
        q: "Hangi ölçekte dışa aktarmalıyım?",
        a: "Retina/yüksek DPI ekranlarda gösterilen ikonlar için 2×, tam piksel boyutu biliniyorsa ve nihaiyse 1×, sonra küçültebileceğin bir ana varlık için 3×–4× kullan. Favicon için 512 px eşdeğerinde dışa aktar ve küçült.",
      },
      {
        q: "PNG'ye dönüşüm SVG'nin ölçeklenebilirliğini kaybettirir mi?",
        a: "Evet — PNG sabit çözünürlüklüdür. Bu yüzden araç küçük rasterize edip gerdirmek yerine doğrudan hedef boyutta çizer. Gelecekteki düzenlemeler için .svg kaynağını sakla; başka bir boyut gerektiğinde taze PNG'ler dışa aktar.",
      },
      {
        q: "Saydam zeminler dönüşümde kalır mı?",
        a: "Evet. Çıktı tam alfa kanallı bir PNG'dir; ikonun saydamlığı SVG'deki gibi aynen kalır. Yalnızca SVG'nin referans verdiği fontlar ve dış görseller görüntülenebilmesi için dosyanın içine gömülü olmak zorundadır.",
      },
    ],
  },
  "screenshot-tool": {
    name: "Ekran Görüntüsü Aracı",
    tagline:
      "Ekranının tek bir karesini yakala, hassas biçimde kırp ve PNG olarak kaydet — tek yetkili anlık görüntü; kayıt yok, yükleme yok.",
    intro: [
      "Yakala'ya tıkla, tarayıcının kendi paylaşım penceresinden bir ekran, pencere veya sekme seç; araç tam olarak tek bir durağan kare alır. Paylaşım hemen sona erer — kayıt yok, oturum yok, cihazından çıkan hiçbir şey yok. Elde ettiğin şey, kaydedilmeye hazır sıradan bir PNG'dir.",
      "Yalnızca görüntünün bir bölümü mü gerekli? Kırpma modunu aç, kaydetmeden önce hassas bir seçim sürükle — kırpma aracımızdaki aynı piksel hassasiyetli bileşenle çalışır. Hata raporları, hızlı dokümantasyon ve makbuzlar için mükemmel.",
    ],
    steps: [
      "“Ekranı seç ve yakala”ya tıkla ve tarayıcı penceresinde izin ver.",
      "İstediğin ekranı, pencereyi veya sekmeyi seç; tek kare anında yakalanır ve paylaşım durur.",
      "İstersen kareyi kırp, sonra PNG'yi indirmelerine kaydet.",
    ],
    faqs: [
      {
        q: "Ekranım kaydediliyor mu?",
        a: "Hayır. Araç, tarayıcının standart ekran paylaşımı izni üzerinden tek karelik bir yakalama ister. Akış, kare belleğe kaydedilir kaydedilmez durdurulur; hiçbir şey çalışmaya devam etmez ve hiçbir yere yüklenmez.",
      },
      {
        q: "Tarayıcım neden izin istiyor?",
        a: "Ekran yakalama güçlü bir yetenektir; tarayıcılar her zaman kendi penceresiyle açık bir kullanıcı seçimi ister. Hangi ekranı, pencereyi veya sekmeyi paylaşacağına tam olarak sen karar verirsin — araç, seçmediğin hiçbir şeyi görmez.",
      },
      {
        q: "Telefonlarda veya tabletlerde çalışır mı?",
        a: "Hayır. iOS ve Android'deki tarayıcılar web sayfalarına ekran yakalama sunmaz; araç bunun orada kullanılamadığını açıklar. Masaüstünde Chrome, Edge, Firefox ve Safari'nin hepsi destekler.",
      },
    ],
  },
  "image-metadata-viewer": {
    name: "Görsel Meta Verisi Görüntüleyici",
    tagline:
      "Görselin boyutlarını, dosya türünü, boyutunu ve EXIF detaylarını — kamera, lens, pozlama, tarih ve GPS — hiçbir şey yüklemeden incele.",
    intro: [
      "Bir fotoğraf bırak ve taşıdığı her şeyi gör: piksel boyutları, megapiksel, dosya türü ve boyutu bir bakışta. JPEG fotoğraflar için yerleşik EXIF okuyucu daha derine iner — kamera markası ve modeli, lens, pozlama süresi, diyafram, ISO, odak uzaklığı, çekim tarihi ve yönlendirme; tamamen cihazında çalışan sade bir okuyucuyla ayrıştırılır.",
      "Fotoğraf GPS koordinatları içeriyorsa ondalık biçimde gösterilir ve tek tıkla harita araması yapılır — paylaşmadan önce telefonunun ne gömdüğünü kontrol etmek için pratik. JPEG olmayan dosyalar PNG bit derinliğini ve renk türünü gösterir; EXIF, JPEG dönemi bir standarttır ve onlar taşımaz.",
    ],
    steps: [
      "Bir veya daha fazla görseli kutuya bırak.",
      "Özet kartı oku: boyutlar, tür, boyut ve bulunan EXIF alanları.",
      "Varsa GPS konumunu haritalarda aç — ya da onu silmek için EXIF Kaldırıcı'ya atla.",
    ],
    faqs: [
      {
        q: "EXIF verisi nedir?",
        a: "EXIF (Exchangeable Image File Format), kameraların JPEG fotoğraflara gömdüğü meta veri standardıdır: cihaz modeli, lens, pozlama ayarları, zaman damgaları, yönlendirme ve bazen GPS koordinatları. Resmin kendisinde görünmez ama bir fotoğrafın nerede ve neyle çekildiğini ele verebilir.",
      },
      {
        q: "PNG veya WebP dosyam neden EXIF göstermiyor?",
        a: "EXIF başlıca JPEG tarafından taşınır. PNG, GIF ve çoğu WebP dosyası onu gömmez, gösterilecek gerçekten bir şey yoktur — görüntüleyici onların boyutlarını ve PNG için dosya başlığındaki bit derinliğini ve renk türünü gösterir.",
      },
      {
        q: "Meta veriyi görüntülemek görselimi değiştirir mi?",
        a: "Hayır. Dosyalar salt okunur açılır; araç bellekte bir kopyayı çözer ve özgüne asla geri yazmaz. Görselin tamamen cihazında gösterilir ve analiz edilir.",
      },
    ],
  },
  "exif-remover": {
    name: "EXIF Kaldırıcı",
    tagline:
      "Fotoğraflardan EXIF, GPS ve diğer gizli meta verileri yerel olarak yeniden kodlayarak temizle — konum veya cihaz sızdırmadan paylaş.",
    intro: [
      "Her telefon fotoğrafı gizli bagaj taşıyabilir: çekildiği yerin GPS koordinatları, kamera modelin, zaman damgaları, bazen seri numaraları bile. Bu araç hepsini, görüntüyü ham piksellerinden yeniden kodlayarak kaldırır — taze çizilmiş bir canvas'ta meta verinin saklanacak yeri yoktur; EXIF, GPS, küçük resimler ve yorumların tamamı gider.",
      "Sonuç özgün biçimi ve gözle aynı bir görüntüyü korur (JPG ve WebP için %92 kalite); her satır önce/sonra boyutu gösterir. Toplu mod bütün bir fotoğraf klasörünü tek geçişte temizler — hepsi çevrimdışı, hepsi cihazında.",
    ],
    steps: [
      "Paylamayı planladığın fotoğrafları bırak — bir tane ya da bütün bir yığın.",
      "Her görsel meta verisi olmadan yerel olarak yeniden kodlanırken bir an bekle.",
      "Temizlenen görselleri tek tek ya da hep birlikte indir.",
    ],
    faqs: [
      {
        q: "Yeniden kodlama meta veriyi nasıl kaldırır?",
        a: "Görüntü ham piksellere çözülür, boş bir canvas üzerine yeniden çizilir ve sonra tekrar kodlanır. Meta veri, piksellerin dışındaki özel dosya bölümlerinde yaşar ve taze bir kodlama onları basitçe içermez — böylece EXIF, GPS, küçük resimler ve düzenleme geçmişi tamamen düşer.",
      },
      {
        q: "EXIF'i kaldırmak fotoğrafın görünüşünü değiştirir mi?",
        a: "Görünür bir değişiklik yok. Pikseller %92 JPEG/WebP kalitesinde korunur (PNG kayıpsızdır); resim gözle aynı görünür. Bir yan etki: yalnızca EXIF yönlendirme bayrağı olarak saklanan döndürme piksellere işlenir — bu da dosyanın uygulamalar arasında daha tutarlı görünmesini sağlar.",
      },
      {
        q: "Meta veriyi görseli yeniden sıkıştırmadan kaldırabilir miyim?",
        a: "Güvende kalan tarayıcı tabanlı bir yolla hayır. Kayıpsız meta veri temizliği dosya kabını yeniden yazmayı gerektirir — PNG'ler özel araçlarla kayıpsız temizlenebilir ama JPEG için güvenilir ve basit yol tam olarak bu yeniden kodlamadır. Buradaki PNG girdileri pikselde bayt dengi kalır.",
      },
    ],
  },
  "watermark-image": {
    name: "Görsel Filigran Ekleme",
    tagline:
      "Görsellere metin filigranı ekle — konum, saydamlık, boyut veya döşeme; tamamen tarayıcında işlenir.",
    intro: [
      "Taslakları, prova baskıları ve fotoğrafları tam kontrol sende olan bir metin filigranıyla koru: herhangi bir köşeye veya ortaya yerleştir, tüm görsele döşe, boyutu ve saydamlığı ayarla — filigranlı kopyalar cihazında üretilir.",
      "Hiçbir şey yüklenmez; bu yüzden yayımlanmamış işleri, müşteri provalarını ve gizli taramaları hiçbir yere göndermeden filigranlayabilirsin.",
    ],
    steps: [
      "Tek bir görsel ya da bütün bir yığın bırak.",
      "Filigran metnini yaz ve saydamlığı, boyutu, konumu ayarla — ya da döşemeyi etkinleştir.",
      "Uygula ve her filigranlı kopyayı indir.",
    ],
    faqs: [
      {
        q: "Biri filigranımı kaldırabilir mi?",
        a: "Görünür bir filigran caydırıcıdır, şifreleme değil — görünen her şey emekle silinebilir. Gerçek koruma için bunun yerine düşük çözünürlüklü provalar paylaş.",
      },
      {
        q: "Saydam PNG'lerle çalışır mı?",
        a: "Çıktı JPG'dir; saydamlık beyaza yapıştırılır. Alfa kanalı gerekiyorsa özgün PNG'yi, seçtiğin bir zemin rengiyle filigranla.",
      },
    ],
  },
  "merge-images": {
    name: "Görsel Birleştirme",
    tagline:
      "2–9 görseli tek resimde birleştir — yan yana, üst üste veya ızgara olarak; boşluk ve zemin rengi kontrolüyle.",
    intro: [
      "Önce/sonra kareleri, karşılaştırma şeritleri ve sprite sayfaları oluştur: 2 ila 9 görsel bırak, bir düzen seç, boşluğu ve zemin rengini ayarla; birleştirilmiş görsel cihazında tam çözünürlükte derlenir.",
      "Görseller ortak bir yüksekliğe (yan yana), genişliğe (üst üste) veya hücreye (ızgara) ölçeklenir; hiçbir şey kırpılmaz veya gerdirilmez.",
    ],
    steps: [
      "Birleştirilmesini istediğin sırayla 2–9 görsel bırak.",
      "Bir düzen seç ve boşluk ile zemin rengini ayarla.",
      "Görselleri Birleştir'e tıkla ve sonucu indir.",
    ],
    faqs: [
      {
        q: "Çıktının çözünürlüğü nedir?",
        a: "Tam çözünürlük: canvas, (ölçeklenmiş) girdi boyutlarından hesaplanır; 3 × 2000 px fotoğrafın birleşimi kabaca 6000 px genişliğindedir.",
      },
      {
        q: "Sıralama önemli mi?",
        a: "Evet — görseller liste sırasına göre, soldan sağa ve yukarıdan aşağıya yerleştirilir. Değiştirmek için çıkarıp yeniden ekle.",
      },
    ],
  },
  "grayscale-image": {
    name: "Görsel Gri Tonlama",
    tagline:
      "Görselleri toplu olarak siyah-beyaza çevir — taramalardan, baskılardan ve fotoğraf setlerinden renkleri çıkar; her şey yerel.",
    intro: [
      "Herhangi bir fotoğraf setini tek geçişte temiz siyah-beyaz sürümlere çevir: bir yığın bırak, JPG veya PNG çıktısını seç; her görsel, tarayıcının kendi renk motoruyla cihazında renksizleştirilir.",
      "Baskıya hazır taramalar hazırlamak, bir fotoğraf setini tek tona oturtmak veya OCR'dan önce belgelerden rengi ayıklamak için pratik.",
    ],
    steps: [
      "Tek bir görsel ya da bütün bir yığın bırak.",
      "JPG (daha küçük) veya PNG (kayıpsız) çıktısını seç.",
      "Dönüşümü çalıştır ve her gri tonlamalı kopyayı indir.",
    ],
    faqs: [
      {
        q: "Bir fotoğraf editöründe renksizleştirmekle aynı şey mi?",
        a: "Tarayıcının standart gri tonlama filtresini kullanır — nötr bir parlaklık dönüşümü. Kontrast eğrileriyle sanatsal siyah-beyaz için bir editör kullan; temiz ve eşit renksizleştirme için bu yeter.",
      },
      {
        q: "PNG'm dönüşümden sonra neden daha büyük?",
        a: "Gri tonlama sıkıştırmayı değiştirmez: gürültülü bir fotoğraf hafif farklı sıkışabilir. Fotoğraflar için JPG'i, düz grafikler için PNG'yi seç.",
      },
    ],
  },
  "favicon-generator": {
    name: "Favicon Üretici",
    tagline:
      "Herhangi bir logo veya görseli eksiksiz bir favicon setine çevir — 16'dan 512 px'e PNG'ler, isteğe bağlı yuvarlak köşeler ve yapıştırılacak HTML ile. Tarayıcında çalışır.",
    intro: [
      "Tek bir kareye yakın görsel bırak; gerçek projelerin ihtiyaç duyduğu altı PNG boyutunu al: 16, 32 ve 48 px favicon'lar, 180 px apple-touch-icon ve Android ile PWA manifestoları için 192 / 512 px ikonlar. Karesi olmayan görseller, seçtiğin zemin rengiyle dolgulanmış kare bir canvas'ta ortalanır; köşeler kare, yuvarlak veya tam daire olabilir.",
      "Her boyut gerçek piksel ölçülerinde çizilir; tek tek ya da tek bir .zip olarak indirilebilir — aynı dosya adlarını referans veren kopyala-yapıştır bir <head> parçasıyla birlikte. Dosyalar, projenin public klasörüne doğrudan oturur.",
    ],
    steps: [
      "Tek bir görsel bırak — kare bir logo en iyi sonucu verir.",
      "Bir dolgu zemin rengi ve bir köşe stili seç (kare, yuvarlak veya daire).",
      "Seti üret, sonra tek tek boyutları ya da .zip'in tamamını indir.",
      "HTML parçasını sayfanın <head> bölümüne yapıştır ve PNG'leri yükle.",
    ],
    faqs: [
      {
        q: "Gerçekte hangi favicon boyutlarına ihtiyacım var?",
        a: "16 ve 32 px tarayıcı sekmelerini, 48 px kısayolları ve yer imlerini, 180 px iOS ana ekranlarının istediğini, 192 / 512 px ise Android ve web uygulaması manifestolarının aradığını kapsar. Altıyı bir kez üretmek, bir daha düşünmene gerek bırakmaz.",
      },
      {
        q: "Logom 16 px'te neden bulanık görünüyor?",
        a: "16 px'lik sekme ikonunda toplam 256 piksel vardır; ince detaylar ve ince çizgiler basitçe kaybolur. Favicon setleri, cesur ve yüksek kontrastlı bir işaretten üretildiğinde en iyi görünür — logon detaylıysa sadeleştirilmiş küçük bir varyantı kaynak görsel olarak çizmeyi düşün.",
      },
      {
        q: "Hâlâ bir .ico dosyasına ihtiyacım var mı?",
        a: "Modern tarayıcılar <link> etiketleriyle PNG favicon'ları memnuniyetle kullanır; aracın ürettiği parça onlara yeter. Eski bir .ico yalnızca çok eski tarayıcılar için önemlidir; çoğu site için ihmal edilebilir kadar nadirdir.",
      },
    ],
  },
  "ocr-image": {
    name: "Görselden Metne (OCR)",
    tagline:
      "Fotoğraflardan, taramalardan ve ekran görüntülerinden 7 dilde metin çıkar — gözden geçir, düzenle, kopyala veya .txt olarak indir. Tanıma tamamen tarayıcında.",
    intro: [
      "Metin içeren herhangi bir görsele işaret et — bir sayfanın fotoğrafı, bir tarama, bir ekran görüntüsü — karakterleri düzenlenebilir metin olarak geri al. Tanıma, tarayıcı sekmesinin içinde isteğe yüklenen Tesseract ile çalışır; görüntünün kendisi asla bir yere yüklenmez.",
      "Çıktı düzenlenebilir bir kutuya düşer; ara sıra yanlış okunanı düzeltip kopyalayabilir ya da .txt olarak indirebilirsin. Temiz, eşit aydınlatılmış ve karşıdan çekilmiş kareler en iyi sonucu verir.",
    ],
    steps: [
      "Metin içeren tek bir görsel bırak (PNG, JPG veya WebP).",
      "Metnin dilini seç — eşleşen model ilk kullanımda yüklenir.",
      "Tanımayı çalıştır ve gerekirse çıkarılan metni düzenle.",
      "Kopyala ya da .txt dosyası olarak indir.",
    ],
    faqs: [
      {
        q: "Görselim bir sunucuya yükleniyor mu?",
        a: "Hayır. Görsel kendi tarayıcında okunur ve tanınır. OCR motorunun ve dil modelinin ilk kullanımda herkese açık bir CDN'den indirildiğini bil (dil başına kabaca 10–20 MB) — bu indirme CDN'den sana gider; görüntünün kendisi asla cihazından çıkmaz.",
      },
      {
        q: "Hangi diller destekleniyor?",
        a: "İngilizce, Basitleştirilmiş Çince, Japonca, İspanyolca, Portekizce, Almanca ve Fransızca. Her dil kendi eğitilmiş modelini ilk seçişinde yükler; sonrasında tarayıcı önbelleğine alır ve tanıma daha hızlı başlar.",
      },
      {
        q: "Metnin bir kısmı neden yanlış?",
        a: "OCR doğruluğu kaynağa ağır bağlıdır: bulanık fotoğraflar, kıvrık sayfalar, küçük fontlar ve kalabalık zeminler yanlış okumalara yol açar. Elindeki en keskin görseli kullan, yalnızca metin alanına kırparak daralt ve bir kez gözden geçirmeyi bekle — özellikle sayılar ve birbirine benzeyen karakterlerde.",
      },
    ],
  },
  "round-corners-image": {
    name: "Görsel Köşe Yuvarlama",
    tagline:
      "Tek bir görseli ya da bütün bir yığının köşelerini yuvarla — saydam PNG köşeler ya da düz renk, canlı önizleme, PNG veya JPG çıktı. Tarayıcında çalışır.",
    intro: [
      "Yuvarlak köşeler, ekran görüntülerini, avatarları ve ürün karelerini editör açmadan yumuşatır. Tek bir görsel ya da bütün bir yığın bırak, yarıçap kaydırıcısını sürükle ve önizlemenin canlı güncellenmesini izle — yarıçap, kısa kenarın yarısına kadar sınırlandırılmış tam daireye kadar gider.",
      "Kırpılan köşelerin saydam (PNG) kalacağını ya da düz bir renkle doldurulacağını seç; JPG çıktısının alfa kanalı olmadığı için onun istediği de budur. Her dosya cihazında işlenir ve tek tek indirilir.",
    ],
    steps: [
      "Tek bir görsel ya da bütün bir yığın bırak.",
      "Yarıçap kaydırıcısını sürükle — önizleme ilk görseli canlı gösterir.",
      "Saydam ya da düz renkli köşeler ve çıktı biçimini seç.",
      "Tümünü yuvarla ve her sonucu indir.",
    ],
    faqs: [
      {
        q: "Köşeler beyaz yerine saydam olabilir mi?",
        a: "Evet — PNG çıktısını ve Saydam seçeneğini seç; köşeler arkanın görünmesine devam eder. JPG'nin alfa kanalı yoktur, köşeleri daima seçtiğin düz renkle doldurur.",
      },
      {
        q: "Aynı yarıçap her görselde farklı görünüyor — neden?",
        a: "Kaydırıcı yarıçapı piksel olarak ayarlar ve her dosya tam o yarıçapla, kendi kısa kenarının yarısına sınırlandırılarak yuvarlanır. Farklı boyutlu görsellerde eşit görünüm için önce boyutlarını eşitle (örneğin görsel boyutlandırma aracıyla).",
      },
      {
        q: "Yuvarlamak görselin kalitesini düşürür mü?",
        a: "Yalnızca köşelere dokunulur — içerideki pikseller yerinde kalır. PNG çıktısı kayıpsızdır; JPG ise yüksek kalitede yeniden kodlanır, dosya boyutu her iki yönde biraz değişebilir.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* Metin                                                               */
  /* ------------------------------------------------------------------ */
  "case-converter": {
    name: "Yazım Biçimi Dönüştürücü",
    tagline:
      "Metni BÜYÜKHARF, küçükharf, Baş Harf Büyük, camelCase, snake_case ve 6 biçim daha arasında dönüştür — canlı olarak.",
    intro: [
      "Tek sayfada on bir yazım biçimi: yazmak için cümle düzeni, başlıklar için Baş Harf Büyük, kod için camelCase / PascalCase / snake_case / kebab-case / CONSTANT_CASE; artı eğlence için almaşık ve ters biçim.",
      "Her şey yazdıkça yeniden hesaplanır — düğmeye bastırma yok ve dönüşüm tarayıcından asla çıkmaz.",
    ],
    steps: [
      "Metnini girdi kutusuna yapıştır veya yaz.",
      "Bir biçim düğmesine tıkla — çıktı anında güncellenir.",
      "Sonucu kopyala ya da karşılaştırmak için başka bir biçime geç.",
    ],
    faqs: [
      {
        q: "camelCase ile PascalCase arasındaki fark nedir?",
        a: "camelCase küçük harfle başlar (myVariableName), PascalCase büyük harfle (MyVariableName). İkisi de kelimelerden boşlukları ve alt çizgileri atar.",
      },
      {
        q: "Baş Harf Büyük biçimi kısa kelimeleri küçük bırakır mı?",
        a: "Evet. Artikeller ve kısa edatlar (a, the, of, in…), yaygın editoryal üsluba uygun olarak ilk veya son kelime olmadıkça küçük harf kalır.",
      },
      {
        q: "Metnim bir yere yükleniyor mu?",
        a: "Hayır. Dönüşüm JavaScript ile tarayıcında yerel olarak yapılır — hiçbir şey sunucuya gönderilmez.",
      },
    ],
  },
  "word-counter": {
    name: "Kelime Sayacı",
    tagline:
      "Kelime, karakter, cümle ve okuma süresini yazarken canlı say — CJK metni doğru biçimde ele alınır.",
    intro: [
      "Denemeler, gönderiler, SEO metinleri ve çeviriler için gerçek zamanlı bir kelime sayacı. Kelimeleri, boşluklu ve boşluksuz karakterleri, cümleleri, paragrafları, satırları ve tahmini okuma süresini tek bir tabloda gösterir.",
      "Karışık dilli metin doğru sayılır: Latin tarzı kelimeler boşluklara göre bölünürken Çince, Japonca ve Korece karakterler tek tek sayılır — kelime sınırları o dillerde gerçekte böyle çalışır.",
    ],
    steps: [
      "Metnini kutuya yapıştır veya yaz — istatistikler anında güncellenir.",
      "Umursadığın sayım için vurgulu paneli kontrol et.",
      "Düzenlemeye devam et; hiçbir şey kaydedilmez veya yüklenmez, yayımlanmamış taslaklar için güvenlidir.",
    ],
    faqs: [
      {
        q: "Çince veya Japonca metinde kelimeler nasıl sayılır?",
        a: "CJK karakterleri tek tek sayılır ve kelime sayısına eklenir, çünkü o diller kelimeleri boşlukla ayırmaz. 500 karakterlik bir Çince metin kabaca 500 'kelime' raporlar.",
      },
      {
        q: "Okuma süresi nasıl tahmin edilir?",
        a: "Latin alfabesi için dakikada yaklaşık 220 kelime üzerinden (CJK karakter sayısıyla ağırlıklandırılır), en yakın dakikaya yuvarlanır.",
      },
      {
        q: "Uzunluk sınırı var mı?",
        a: "Katı bir sınır yok — sayaç yalnızca tarayıcının belleğiyle sınırlıdır; kitap boyutunda metinleri rahatça halleder.",
      },
    ],
  },
  "remove-duplicate-lines": {
    name: "Yinelenen Satır Silici",
    tagline:
      "Listelerden ve günlüklerden yinelenen satırları özgün sırayı koruyarak sil — büyük/küçük harf ve kırpma seçenekleriyle.",
    intro: [
      "Herhangi bir liste yapıştır — e-postalar, URL'ler, anahtar kelimeler, günlük satırları — ve yinelenenleri tek geçişte ayıklanmış olarak geri al. Seçenekler her zamanki varyantları kapsar: büyük/küçük harfi yok say, karşılaştırmadan önce boşlukları kırp, boş satırları at ya da sonucu sırala.",
    ],
    steps: [
      "Listeni girdi kutusuna yapıştır — satır başına bir kayıt.",
      "Büyük/küçük harf duyarsız eşleşme veya temizlik gerekiyorsa seçenekleri aç/kapat.",
      "Ayıklanmış çıktıyı kopyala; sıralamayı etkinleştirmediğin sürece özgün sıra korunur.",
    ],
    faqs: [
      {
        q: "Özgün satır sırasını korur mu?",
        a: "Evet. Her satırın ilk görüldüğü yerde kalır. Sıralama yalnızca sıralama seçeneğini etkinleştirirsen olur.",
      },
      {
        q: "'Apple' ile 'apple'yi yinelenen sayabilir mi?",
        a: "'Büyük/küçük harfi yok say' seçeneğini etkinleştir; ikisi aynı satır sayılır ve ilk görülen varyant tutulur.",
      },
    ],
  },
  "character-counter": {
    name: "Karakter Sayacı",
    tagline:
      "Boşluklu ve boşluksuz karakterleri, ayrıca kelime, cümle, paragraf ve satırları yazarken say — tweetler, başlıklar ve meta açıklamaları için ideal.",
    intro: [
      "Katı sınırlar için yapılmış bir karakter sayacı: sosyal gönderiler, meta başlıkları, meta açıklamalar, reklam metinleri, SMS ve her karakteri sayan uygulama alanları. Panel boşluklu ve boşluksuz karakterleri ayrı gösterir; platformun hangi sayıyla umurlandığını daima bilirsin.",
      "Sayımlar yazdıkça güncellenir ve hiçbir şey tarayıcından çıkmaz — yayımlanmamış taslakları, müşteri metinlerini veya gizli içerikleri saklanma ya da gönderilme endişesi olmadan yapıştır.",
    ],
    steps: [
      "Metnini kutuya yapıştır veya yaz.",
      "Önce vurgulu karakter panelini oku, sonra gerektikçe diğer sayımlara bak.",
      "Sınırın altına inene dek metnini kısalt — sayılar canlı güncellenir.",
    ],
    faqs: [
      {
        q: "Boşluklar ve satır sonları karakter sayılır mı?",
        a: "Evet — ana sayı, çoğu platformun yaptığı gibi boşluklar ve satır sonları dahil her karakteri sayar. 'Boşluksuz' sayısı boşlukları ayıklar; karşılaştırabilirsin.",
      },
      {
        q: "Emoji nasıl sayılır?",
        a: "Emoji Unicode kod noktaları olarak sayılır; çoğu modern emoji tek karakter sayılır. Birkaç kod noktasından kurulan karmaşık diziler (ten tonları, aile emojileri) birden fazla sayılabilir.",
      },
      {
        q: "Hangi platformlar karakterle sınırlar?",
        a: "X/Twitter gönderileri, meta başlıkları (60 civarı) ve açıklamaları (160 civarı), SMS bölümleri (160) ve çoğu reklam platformu — daima yazdığın spesifik alanı kontrol et.",
      },
    ],
  },
  "sentence-counter": {
    name: "Cümle Sayacı",
    tagline:
      "Cümleleri anında say, yanında kelime, paragraf ve okuma süresini gör — editörler ve yazarlar için hızlı bir okunabilirlik kontrolü.",
    intro: [
      "Cümle sayısı, bir yazarın elindeki en hızlı okunabilirlik sinyalidir. Bu araç cümleleri yazdıkça sayar ve kelime, paragraf, satır ile okuma süresinin yanına koyar; bir paragrafın fazla yoğunlaşıp yoğunlaşmadığını bir bakışta anlarsın.",
      "Karışık dilli metinde cümleleri gerçekten bitiren noktalama işaretlerini tanır: Latin nokta, soru ve ünlem işaretleri, artı Çince ve Japoncada kullanılan tam genişlik 。!?… işaretleri.",
    ],
    steps: [
      "Taslağını, e-postanı veya makaleni kutuya yapıştır.",
      "Vurgulu cümle sayısını kontrol et ve kelime sayınla karşılaştır.",
      "Hedeflediğin ortalama uzunluğa inmek için cümleleri böl veya birleştir.",
    ],
    faqs: [
      {
        q: "Neyi cümle sayar?",
        a: "Nokta, soru işareti, ünlem işareti veya CJK karşılıkları 。!?… ile biten, boşluk dışında bir şey içeren her metin parçası.",
      },
      {
        q: "Sayımım editörümden neden farklı?",
        a: "'Mr.' veya 'e.g.' gibi kısaltmalar noktayla biter ve cümle sonu sayılır — bu araç noktalama kurallarını kullanır, tam doğal dil ayrıştırması değil.",
      },
      {
        q: "Bir paragraf kaç cümle olmalı?",
        a: "Üslup kılavuzları genellikle 2–5 önerir. Taşa yazılmış bir kural yok: metin duvarlarını okuyucundan önce fark etmek için sayımı kullan.",
      },
    ],
  },
  "remove-extra-spaces": {
    name: "Fazla Boşluk Silici",
    tagline:
      "Çift boşlukları teke indir, sekmeleri dönüştür, satır uçlarını kırp ve boş satırları sil — yapıştırılan metni tek geçişte temizle.",
    intro: [
      "PDF'lerden, tablolardan, terminallerden ve sohbet uygulamalarından kopyalanan metin çoğu zaman çift boşluklar, başıboş sekmeler ve boş satırlarla dolar. Bu araç yinelenen boşlukları teke indirir ve gerisini seçeneklere bırakır: sekmeleri boşluğa çevir, her satırın uçlarını kırp, boş satırları at.",
      "Her şey yazdıkça yerel çalışır; günlükleri, taslakları veya başka herhangi bir hassas içeriği hiç düşünmeden yapıştırabilirsin.",
    ],
    steps: [
      "Dağınık metni girdi kutusuna yapıştır.",
      "Gerektiğinde sekme dönüşümünü, satır kırpma veya boş satır silmeyi aç/kapat.",
      "Temizlenen çıktıyı doğrudan belgene veya editörüne geri kopyala.",
    ],
    faqs: [
      {
        q: "Satır içindeki boşlukları mı yoksa yalnızca uçlardakileri mi toplar?",
        a: "Metinde her yerde yinelenen boşluklar tek boşluğa indirilir. Uç boşluklar yalnızca 'Satır uçlarını kırp' seçeneğini etkinleştirirsen kaldırılır.",
      },
      {
        q: "Kodumun girintisini bozar mı?",
        a: "Bozabilir — girinti satır başındaki boşluklara veya sekmelere dayanır. Kod için 'Satır uçlarını kırp' seçeneğini kapalı bırak ya da bunun yerine düzgün bir biçimlendirici kullan.",
      },
      {
        q: "Satır sonları korunur mu?",
        a: "Evet. Araç yalnızca yatay boşluklara ve boş satırlara dokunur; metninin satır yapısı sağlam kalır.",
      },
    ],
  },
  "text-sorter": {
    name: "Metin Sıralayıcı",
    tagline:
      "Herhangi bir satır listesini alfabetik, tersten, uzunluğa veya sayıya göre sırala — yerel duyarlı ve anında, tamamen tarayıcında.",
    intro: [
      "İsim, URL, fiyat, görev veya günlük satırlarından oluşan bir liste yapıştır ve tek tıkla yeniden sırala: dizinler için A→Z, sıralı listeler için Z→A, temizlik turları için kısa→uzun, sayısal düzen için sayıya göre — 'öğe 10', 'öğe 1' ile 'öğe 2' arasında değil, 'öğe 2'den sonra düşer.",
      "Sıralama, tarayıcının yerel duyarlı karşılaştırmasını kullanır; aksanlı karakterler insanın beklediği yere düşer, alfabenin tamamının arkasına değil.",
    ],
    steps: [
      "Listeni girdi kutusuna yapıştır — satır başına bir kayıt.",
      "Bir düzen seç: A→Z, Z→A, kısa→uzun veya sayısal.",
      "Sıralanmış sonucu kopyala ya da karşılaştırmak için başka bir düzenle yeniden sırala.",
    ],
    faqs: [
      {
        q: "Sayısal sıralama A→Z'den nasıl farklı?",
        a: "Alfabetik sıralama karakter karakter karşılaştırır; '10', '2'den önce gelir. Sayısal mod her satırı önce bir sayı olarak okur ve değere göre dizer.",
      },
      {
        q: "Aksanlı ve Latin olmayan metni halleder mi?",
        a: "Evet. Sıralama Intl.Collator'ı, yani tarayıcının yerel duyarlı karşılaştırmasını kullanır; é, ñ, ü ve CJK karakterler ham kod noktalarına göre değil, dilsel kurallara göre dizilir.",
      },
      {
        q: "Özgün liste değişir mi?",
        a: "Hayır — girdi olduğu gibi kalır ve sıralanmış sonuç çıktı kutusunda görünür; her zaman geri dönebilirsin.",
      },
    ],
  },
  "text-cleaner": {
    name: "Metin Temizleyici",
    tagline:
      "PDF'lerden, Word'den ve sohbet uygulamalarından yapıştırılan metinden görünmez karakterleri, akıllı tırnakları, fazla boşlukları ve boş satırları sil.",
    intro: [
      "Kopyala-yapıştır, temiz metnin son bulduğu yerdir: PDF'ler sıfır genişlikli karakterler bırakır, Word düz tırnakları kıvrımlılarla değiştirip bölünemez boşluklar ekler, sohbet uygulamaları denetim karakterleri sokar. Bu araç görünmez çöpleri temizler ve noktalamayı tek geçişte onarır.",
      "Her seçenek bir anahtardır; temizliğin ne kadar saldırgan olacağına sen karar verirsin — satır uçlarını kırpaktan, yazdırılamayan karakterleri silip tırnakları, tireleri ve üç noktaları eşitleyen tam temizliğe kadar.",
    ],
    steps: [
      "Dağınık metni girdi kutusuna yapıştır.",
      "İstediğin temizlikleri aç/kapat: satırları kırp, boşlukları topla, boş satırları sil, görünmez karakterleri ayıkla, noktalamayı eşitle.",
      "Temiz çıktıyı belgene, CMS'ne veya editörüne geri kopyala.",
    ],
    faqs: [
      {
        q: "Görünmez karakterler nedir, nereden gelir?",
        a: "Sıfır genişlikli boşluklar, bayt sırası işaretleri ve denetim karakterleri — PDF'ler, bazı web siteleri ve ofis yazılımları ekler. Görünmezdir ama aramaları, regex'leri ve veritabanı aktarımlarını bozar; silmek genellikle güvenlidir.",
      },
      {
        q: "'Noktalamayı eşitle' neyi değiştirir?",
        a: "Kıvrımlı tırnaklar düzleşir, en ve em tireler normal tire olur, üç nokta karakteri üç nokta olur ve bölünemez boşluklar normal boşluğa döner. Sade, kodla uyumlu noktalama önemli olduğunda kullan.",
      },
      {
        q: "Temizlik kayıpsız mı?",
        a: "Hiçbir araç niyetini kesin olarak bilemez. Çıktı kutusu sonucu her zaman önce gösterir; özgününü değiştirmeden önce gözden geçir.",
      },
    ],
  },
  "reverse-text": {
    name: "Metin Tersine Çevirici",
    tagline:
      "Herhangi bir metni karakter karakter ters çevir ya da tüm satırların sırasını değiştir — Unicode güvenli, anında ve tamamen yerel.",
    intro: [
      "Tek araçta iki ters çevirme: metninin karakterlerini aynala (oyunlar, biyografiler ve bilmeceler için klasik 'txet esrever' hilesi) ya da satırların sırasını ters çevir, son satır başa gelsin — günlükler, sohbet dışa aktarımları ve tersten yapıştırılmış listeler için pratik.",
      "Ters çevirme ham baytlar üzerinde değil, Unicode kod noktaları üzerinde çalışır; aksanlı harfler ve çoğu emoji bozuk metne dönüşmeden sağlam kalır.",
    ],
    steps: [
      "Çevirmek istediğin metni yapıştır veya yaz.",
      "Karakterleri aynalamak için 'Yalnızca satırları çevir' seçeneğini kapalı bırak, satır sırasını değiştirmek için aç.",
      "Ters çevrilmiş sonucu kopyala.",
    ],
    faqs: [
      {
        q: "Emoji ve aksanlı harfler sağlam kalır mı?",
        a: "Yaygın durumlar için evet: araç Unicode kod noktalarına göre çevirir; é, ñ ve standart emojiler bozulmadan kalır. Çok parçalı karmaşık emojiler aynalanırken yine de dağılabilir.",
      },
      {
        q: "'Yalnızca satırları çevir' tam olarak ne yapar?",
        a: "Her satırı sağlam tutar ve satırların kendisinin sırasını tersine çevirir — ilk satır sona gider. Bir liste tersten yapıştırıldığında kullan.",
      },
      {
        q: "Palindrom kontrolü için kullanabilir miyim?",
        a: "Dolaylı olarak — metni yapıştır, ters çevir ve gözle karşılaştır ya da metin karşılaştırma aracıyla eşleştir.",
      },
    ],
  },
  "lorem-ipsum-generator": {
    name: "Lorem Ipsum Üretici",
    tagline:
      "Maketler, wireframe'ler ve CMS testleri için 1–50 paragraf klasik lorem ipsum dolgu üret — tek tıkla yeniden oluştur ve kopyala.",
    intro: [
      "Lorem ipsum, 1500'lerden beri baskı sektörünün yer tutucusudur: Cicero'nun 'De Finibus'undan bozulmuş Latin metni; gerçek metin gibi görünür ama anlam taşımaz, böylece kimse bir taslağı bitmiş yazıyla karıştırmaz. Paragraf sayısını seç, düğmeye bas ve yerleşimine yapıştır.",
      "Metin, tohumlanmış sözde rastgele bir üreteçle yerel olarak üretilir; her yığın farklıdır — ve bu sitede yaptığın hiçbir şey tarayıcıdan çıkmaz.",
    ],
    steps: [
      "Kaç paragrafa ihtiyacın olduğunu ayarla (1–50).",
      "Taze bir yığın üretmek için düğmeye bas.",
      "Metni doğrudan tasarımına, şablonuna veya CMS'ne kopyala.",
    ],
    faqs: [
      {
        q: "Lorem ipsum tam olarak nedir?",
        a: "Cicero'nun De Finibus Bonorum et Malorum eserinden bir pasajın bozulmuş hali; kırpılıp anlamsız bir dolguya dönüştürülmüş. Harf dağılımı gerçek dili taklit eder; içerik okumadan yerleşimi değerlendirmek için idealdir.",
      },
      {
        q: "Neden sadece 'metin metin metin' kullanmıyorum?",
        a: "Tekrarlanan boş kelimeler gerçekçi olmayan şekiller yaratır ve satır sonu ile ritim sorunlarını gizler. Lorem ipsum gerçek dilin kelime uzunluğunu ve dağılımını taklit eder.",
      },
      {
        q: "50 paragraftan fazla alabilir miyim?",
        a: "Sayfanın hızlı kalması için bir yığın 50 paragrafla sınırlıdır; taze bir yığın gerektiğinde düğmeye yeniden bas.",
      },
    ],
  },
  "text-diff": {
    name: "Metin Karşılaştırma",
    tagline:
      "Metnin iki sürümünü kelime kelime karşılaştır, eklemeler ve silmeler vurgulanmış olarak — hesap yok, yükleme yok, boyut dertleri yok.",
    intro: [
      "Özgünü sola, düzenlenmiş sürümü sağa yapıştır: değişen kelimeler hemen aydınlanır, silmeler bir renkte eklemeler başka bir renkte. Bir sözleşme revizyonunu, bir editörün yeniden yazımını veya bir meslektaşın son dakika düzenlemelerini incelemenin en hızlı yoludur.",
      "Karşılaştırma tamamen tarayıcında çalışır — uzun sözleşmeler, yayımlanmamış el yazmaları ve gizli metinler hiçbir sunucuya dokunmaz.",
    ],
    steps: [
      "Özgün metni sol kutuya yapıştır.",
      "Değiştirilmiş metni sağ kutuya yapıştır.",
      "Aşağıdaki birleşik görünümü oku: üstü çizili işaretler silmeyi, yeşil işaretler eklemeyi gösterir.",
    ],
    faqs: [
      {
        q: "Farklar nasıl gösterilir?",
        a: "Değişmeyen metin düzdür; silinen kelimeler turuncu üstü çizili, eklenen kelimeler yeşil vurguludur — paragraf, izlenen bir değişiklik gibi okunur.",
      },
      {
        q: "Karakter düzeyinde mi, kelime düzeyinde mi karşılaştırıyor?",
        a: "Kelime düzeyinde. Bir kelime içindeki küçük düzenlemeler, bir silinmiş kelime artı bir eklenmiş kelime olarak gösterilir; karakter düzeyindeki karşılaştırmadan taraması kolaydır.",
      },
      {
        q: "Boyut sınırı var mı?",
        a: "Yalnızca tarayıcının belleği — kitap boyutunda karşılaştırmalar çalışır; çok büyük metinlerin çizilmesi bir an sürer.",
      },
    ],
  },
  "slug-generator": {
    name: "Slug Üretici",
    tagline:
      "Herhangi bir başlığı temiz bir URL slug'ına çevir — küçük harfli, aksansız ve tireli — SEO dostu bağlantılara hazır.",
    intro: [
      "Slug, URL'nin sayfayı adlandıran bölümüdür — örneğin /tools/slug-generator. İyi slug'lar küçük harflidir, boşluk yerine tire kullanır ve yalnızca harf ile sayı tutar; bağlantılar arama sonuçlarında okunur, kopyalaması kolaydır ve sunucularla framework'lerde sorunsuzdur.",
      "Herhangi bir dilde bir başlık yapıştır: aksanlar ayıklanır (café → cafe), noktalama ve boşluklar tek tireye çöker ve sonuç kırpılır; hiçbir slug tireyle başlamaz veya bitmez.",
    ],
    steps: [
      "Sayfa başlığını girdi kutusuna yaz veya yapıştır.",
      "Slug'ın yazdıkça belirmesini izle — güzel okunana dek başlığı ayarla.",
      "Slug'ı CMS'ne, router'ına veya statik site üreticine kopyala.",
    ],
    faqs: [
      {
        q: "İyi bir URL slug'ını ne yapar?",
        a: "Kısa, küçük harfli, tireyle ayrılmış ve betimleyici olmak. Arama motorları slug'ları sıralama ipucu olarak okur, kullanıcılar sonuçlarda görür; 'mavi-kosu-ayakkabisi' , '/p?id=8123'yi yener.",
      },
      {
        q: "Aksanlar neden kaldırılıyor?",
        a: "ASCII olmayan karakterler URL'lerde yüzde kodlanır (é, %C3%A9 olur); uzun, çirkin ve hataya açık bağlantılar üretir. ASCII slug'lar kısa kalır ve her yerde çalışır.",
      },
      {
        q: "'the' ve 'of' gibi dolgu kelimeleri tutmalı mıyım?",
        a: "Birçok SEO kılavuzu slug'ları kısa tutmak için atmalarını önerir — kopyalamadan önce üretilen slug'ı serbestçe düzenle; araç tam tireli tabanı verir.",
      },
    ],
  },
  "find-and-replace": {
    name: "Bul ve Değiştir",
    tagline:
      "Binlerce kelimede büyük/küçük harf, tam kelime ve regex modlarıyla bul ve değiştir — işlemeden önce eşleşme sayısını gör.",
    intro: [
      "Bir bulma kutusu, bir değiştirme kutusu, üç eşleşme modu. Hızlı değişimler için düz metin, 'cat'in asla 'category'nin içine düşmemesi için tam kelime modu ve desenler — tarihler, etiketler, yinelenen boşluklar veya betimleyebileceğin her şey — için düzenli ifadeler.",
      "Eşleşmeler yazdıkça sayılır ve değişim canlı önizlenir; bir şeyi kopyalamadan önce tam olarak neyin değişeceğini görürsün.",
    ],
    steps: [
      "Metni yapıştır, sonra neyi bulacağını ve neyle değiştireceğini yaz.",
      "Bir mod seç: büyük/küçük harf duyarlı, yalnızca tam kelimeler veya düzenli ifade.",
      "Eşleşme sayısını kontrol et, sonra değiştirilmiş sonucu kopyala.",
    ],
    faqs: [
      {
        q: "Regex modunda yakalama grupları kullanabilir miyim?",
        a: "Evet. Desenin parçalarını paranteze al ve değiştirmede $1, $2 gibi referans ver — örneğin '(\\d{4})-(\\d{2})' bul ve '$2/$1' ile değiştir.",
      },
      {
        q: "'Yalnızca tam kelimeler' neyi önler?",
        a: "Yalnızca terimin tek başına durduğu durumları eşleştirir: 'cat' araması artık 'category' veya 'concatenate' ile eşleşmez.",
      },
      {
        q: "Değiştirmemdeki $ işaretleri düz metin gibi ele alınır mı?",
        a: "Düz modda evet — '$100', '$100' olarak kalır. Regex modunda $ desenleri özeldir ($1, 1. grup demektir); düz bir $ gerekiyorsa \$ olarak kaçış ver.",
      },
    ],
  },
  "fancy-text-generator": {
    name: "Şık Metin Üretici",
    tagline:
      "Düz metni 12 Unicode stiline dönüştür — kalın, italik, el yazısı, çift çizgili, çemberli, tam genişlik ve dahası — ve dilediğini tek tıkla kopyala.",
    intro: [
      "Bir kez yaz, on iki Unicode varyantını aynı anda al: matematiksel kalın, italik, kalın italik, el yazısı, kalın el yazısı, çift çizgili, monospace, çemberli, kareli ve tam genişlik alfabeler; artı birleştirici karakterli üstü çizili ve altı çizili.",
      "Bunlar gerçek Unicode karakterlerdir — font değil; sonuçlar Instagram biyografilerine, TikTok açıklamalarına, Discord takma adlarına, tweet taslaklarına ve sohbet uygulamalarına bozulmadan yapışır. Çince, Japonca veya emoji gibi Latin alfabesi dışındaki karakterler olduğu gibi geçer; hiçbir şey boş kutucuğa dönüşmez.",
    ],
    steps: [
      "Metnini yaz veya yapıştır — oynaman için bir örnek zaten yüklüdür.",
      "Canlı listede kaydır: her stil metnini anında önizler.",
      "Beğendiğin stilde Kopyala'ya bas ve metin kabul eden her yere yapıştır.",
    ],
    faqs: [
      {
        q: "Metin bazı web sitelerinde neden aynı görünüyor?",
        a: "Şık metin Unicode karakterler kullanır ve bir sitenin fontunda bazıları için glif olmayabilir (özellikle el yazısı ve çift çizgili). Bir stil bir yerde tuhaf görünüyorsa kalın, çemberli veya tam genişliği dene — en geniş font kapsamı onlarda.",
      },
      {
        q: "Instagram biyografim veya TikTok takma adım için kullanabilir miyim?",
        a: "Evet. Çıktı düz Unicode metnidir; sosyal biyografilerde, görünen adlarda, yorumlarda ve sıradan karakter kabul eden her yerde çalışır.",
      },
      {
        q: "Emoji veya 中文 gibi karakterlere ne olur?",
        a: "Yazıldığı gibi bırakılır. Üreteç yalnızca Latin harflerini ve rakamları eşler; emoji, CJK ve aksanlı harfler boş kutulara dönüşmeden değişmeden geçer.",
      },
    ],
  },
  "emoji-picker": {
    name: "Emoji Seçici",
    tagline:
      "8 özenli grupta 670+ yaygın emojide gez, İngilizce adıyla ara, tıklayıp anında kopyala ve son 16 seçimini yeniden kullan — her şey tarayıcında.",
    intro: [
      "Senin nasıl düşündüğüne göre gruplanmış, elle özenilmiş 677 girdilik bir emoji panosu: Gülücükler, İnsanlar, Hayvanlar, Yiyecek, Etkinlikler, Seyahat, Nesneler ve Simgeler. Arama resmî İngilizce adıyla eşleşir — “star” yazmak ⭐, 🌟 ve ✨'yi tek seferde bulur.",
      "Tek tık karakteri panona kopyalar; çalışıp çalışmadığını merak etmemen için görünür bir onayla. Son 16 seçimin localStorage ile bu cihazda tutulur; yarının favorisi tek dokunuş uzağında. Hiçbir görsel yüklenmez — ızgara yerel emoji gliflerini anında çizer.",
    ],
    steps: [
      "Arama kutusuna bir ad yaz ya da bir grup sekmesi seç.",
      "Herhangi bir emojine tıkla — anında panona kopyalanır.",
      "Son seçimlerini üst satırda bul; bu cihazda saklanır.",
    ],
    faqs: [
      {
        q: "Emojiler nereden geliyor?",
        a: "İşletim sisteminin emoji fontuyla çizilen yerel gliflerdir. Hiçbir şey indirilmez; sayfa hızlı kalır ve bir kez yüklendikten sonra çevrimdışı çalışır.",
      },
      {
        q: "Bazı emojiler telefonumda gördüklerimden neden farklı görünüyor?",
        a: "Her platform emojileri kendi tarzında çizer. Izgara, mevcut cihazın onları nasıl çizdiğini gösterir; kopyalanan karakter, alıcı uygulamada da aynı şekilde görünür.",
      },
      {
        q: "“Son kullanılanlar” nasıl çalışır?",
        a: "Kopyaladığın her emoji, tarayıcının localStorage'ında hatırlanır (en fazla 16). Tarayıcı verilerini temizlemek listeyi sıfırlar.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* Geliştirici                                                         */
  /* ------------------------------------------------------------------ */
  "json-formatter": {
    name: "JSON Biçimlendirici",
    tagline:
      "Dağınık JSON'u online güzelleştir — 2 boşluk, 4 boşluk veya sekmeler, anında doğrulama ve hassas hata konumlarıyla. %100 tarayıcında.",
    intro: [
      "Sıkıştırılmış veya kötü girintili JSON'u yapıştır ve okunabilir, temiz çıktıyı anında al. 2 boşluk, 4 boşluk veya sekme girintisi seç; sonuç yazarken ve düzenlerken canlı güncellenir — API yanıtlarını, yapılandırma dosyalarını ve günlük yüklerini incelemek için ideal.",
      "Geçersiz JSON bir çıkmaz değil: biçimlendirici sözdizimi hatasının tam satırını ve sütununu işaret eder; eksik bir virgül veya parantez dakikalar değil saniyeler içinde bulunur.",
    ],
    steps: [
      "JSON'unu girdi kutusuna yapıştır.",
      "Bir girinti seç: 2 boşluk, 4 boşluk veya sekme.",
      "Güzelleştirilmiş sonucu kopyala — ya da JSON geçersizse rapor edilen satır ve sütunu düzelt.",
    ],
    faqs: [
      {
        q: "Biçimlendirebileceğim JSON için boyut sınırı var mı?",
        a: "Katı bir sınır yok — biçimlendirme tarayıcında yerel olarak yapılır. Çok büyük dosyalar (onlarca MB), sonuç yazdıkça yeniden hesaplandığı için yavaş hissettirebilir; tek seferde yapıştır ve dikkatli düzenle.",
      },
      {
        q: "Biçimlendirmek verilerimi değiştirir mi?",
        a: "Hayır. Değerler, anahtar sırası ve yapı aynen kalır; yalnızca boşluk ve satır sonları eklenir. Çıktı, bayt bayt eşdeğer JSON'dur.",
      },
      {
        q: "JSON'um bir sunucuya yükleniyor mu?",
        a: "Hayır. Her şey JavaScript ile tarayıcında yerel çalışır — verin asla cihazından çıkmaz.",
      },
    ],
  },
  "json-minifier": {
    name: "JSON Küçültücü",
    tagline:
      "JSON'u online küçült: tüm boşlukları soyarak yükleri hafiflet, API yanıtlarını hızlandır, depolamayı küçült — kazandığın baytları gör, gizlice tarayıcında.",
    intro: [
      "Güzel yazılmış JSON'u yapıştır ve en sıkı geçerli eşdeğerini gerçek zamanla al: verine dokunmadan her boşluk, satır sonu ve girinti kaldırılır. Canlı boyut göstergesi, özgün boyutu, küçültülmüş boyutu ve kazanılan yüzdeyi gösterir.",
      "API yanıtlarını, fixture dosyalarını, çevirileri ve JSON yapılandırmalarını göndermeden veya saklamadan önce zayıflatmak için kullan. Girdi geçerli JSON değilse araç sessizce çökmez; sorunun tam satırını ve sütununu söyler.",
    ],
    steps: [
      "Biçimli JSON'unu girdi kutusuna yapıştır.",
      "Küçültülmüş tek satırlık çıktı anında belirir; kazanılan boyut aşağıda gösterilir.",
      "Sıkı sonucu kopyala ya da baştan başlamak için girdiyi temizle.",
    ],
    faqs: [
      {
        q: "JSON'u küçültmek veriyi değiştirir mi?",
        a: "Hayır. Dizgeler dışındaki boşluk JSON'da anlam taşımaz; kaldırmak, ayrıştırıldığında birebir aynı değerleri üreten eşdeğer bir belge verir.",
      },
      {
        q: "JSON'um ne kadar küçülür?",
        a: "Kaldırdığın girintiye bağlıdır — ağır girintili dosyalar çoğu zaman %30–60 küçülür. Araç, girdin için kesin yüzdeyi gösterir.",
      },
      {
        q: "Verim bir yere gönderiliyor mu?",
        a: "Hayır. Küçültme tamamen tarayıcında çalışır — hiçbir şey yüklenmez, günlüğe yazılmaz, saklanmaz.",
      },
    ],
  },
  "json-validator": {
    name: "JSON Doğrulayıcı",
    tagline:
      "JSON'u kesin hata satırı ve sütunuyla anında doğrula. Uygulamanı bozmadan önce eksik virgülleri, tırnaksız anahtarları, art arda virgülleri ve hatalı kaçışları yakala.",
    intro: [
      "Herhangi bir JSON belgesi yapıştır ve geçerli olup olmadığını bir bakışta gör. Doğrulayıcı katıdır: JSON standardını izler; tek tırnak, art arda virgül, tırnaksız anahtar ve yorum gibi yaygın hataların hepsi raporlanır.",
      "Bir şey yanlışsa kesin satır ve sütun, artı insan okur bir gerekçe alırsın — şifreli tek satırlık bir mesaj değil. Geçerli girdi, hemen kopyalayabileceğin güzel yazılmış bir sürümle ödüllendirilir.",
    ],
    steps: [
      "JSON'unu girdi kutusuna yapıştır.",
      "JSON geçerliyse yeşil bir durum belirir; değilse tam satır, sütun ve gerekçe gösterilir.",
      "Rapor edilen konumu düzelt ya da doğrulama geçince güzel yazılmış çıktıyı kopyala.",
    ],
    faqs: [
      {
        q: "Doğrulayıcı hangi hataları bulabilir?",
        a: "Tüm standart JSON sözdizimi hataları: eksik veya fazla virgüller, tırnaksız veya tek tırnaklı anahtarlar, art arda virgüller, kaçışlanmamış denetim karakterleri, geçersiz kaçışlar ve değerden sonraki başıboş içerik — her biri satır ve sütunla raporlanır.",
      },
      {
        q: "Şemayı da mı kontrol ediyor, yoksa yalnızca söz dizimini mi?",
        a: "Yalnızca söz dizimi. Belgenin geçerli JSON olduğunu doğrular; alanların beklenen türde veya değerde olduğunu değil — bunun için JSON Schema gibi bir şema doğrulayıcı gerekir.",
      },
      {
        q: "JSON'um bir yere yükleniyor mu?",
        a: "Hayır. Doğrulama tarayıcında yerel olarak yapılır; hiçbir şey cihazından çıkmaz.",
      },
    ],
  },
  "xml-formatter": {
    name: "XML Biçimlendirici",
    tagline:
      "XML'i temiz 2 boşluklu girintiyle online güzelleştir — sitemap'lar, RSS akışları, SOAP zarfları ve yapılandırma dosyaları yeniden okunur olsun, tamamen tarayıcında.",
    intro: [
      "Dolaşık veya tek satırlık XML yapıştır ve düzgün girintili belgeyi anında al. Öğeler tutarlı 2 boşluklu girintiyle iç içe geçer, kısa metin içerikleri etiketleriyle aynı satırda kalır; yorumlar, CDATA bölümleri, işleme talimatları ve DOCTYPE bildirimleri korunur.",
      "sitemap.xml, RSS/Atom akışları, Android düzenleri, Maven pom'ları, SOAP yanıtları ve bitmeyen başka yapılandırma biçimlerini okumak için ideal — editör eklentisi kurmadan.",
    ],
    steps: [
      "XML'ini girdi kutusuna yapıştır.",
      "Biçimlenmiş belge yazdıkça anında görünür.",
      "Güzelleştirilmiş XML'i kopyala ya da başka bir dosya denemek için girdiyi temizle.",
    ],
    faqs: [
      {
        q: "Biçimlendirmek XML verimi değiştirir mi?",
        a: "Öğeler arasındaki boşluk, yapıyı okunur kılmak için eşitlenir; bu, gerçek dünyadaki neredeyse tüm XML için güvenlidir. Metin içeriğinin içindeki boşluklar korunur (uçlarda kırpılır) ve CDATA bölümleri bayt bayt saklanır.",
      },
      {
        q: "Büyük XML dosyalarını halleder mi?",
        a: "Evet, makul ölçüde — biçimlendirme hızlı tek geçişlidir ve yerel çalışır; ama çok megabaytlık belgeler yavaş cihazlarda bir an sürebilir.",
      },
      {
        q: "XML'im bir sunucuya yükleniyor mu?",
        a: "Hayır. Biçimlendirme tamamen tarayıcında yapılır; hiçbir şey hiçbir yere gönderilmez.",
      },
    ],
  },
  "xml-validator": {
    name: "XML Doğrulayıcı",
    tagline:
      "XML'i iyi biçimlilik açısından gerçek zamanla kontrol et: eşleşmeyen etiketler, bozuk öznitelikler ve geçersiz varlıklar yapıştırır yapışmaz raporlanır. Yükleme yok.",
    intro: [
      "Doğrulayıcı, tarayıcının yerleşik XML ayrıştırıcısını kullanır; gerçek XML araçlarının dayattığı kuralları aynen dayatır: her etiket kapanmalı, öznitelikler tırnaklanmalı, varlıklar geçerli olmalı ve tam olarak bir kök öğe bulunmalıdır.",
      "İyi biçimli XML yeşil durum artı güzel yazılmış bir önizleme alır; sorunlar, hatalı yapıyı tam işaret eden ayrıştırıcının kendi hata açıklamasıyla görünür — akışları, sitemap'ları veya SOAP yüklerini seçici tüketicilere vermeden önce için idealdir.",
    ],
    steps: [
      "XML'ini girdi kutusuna yapıştır.",
      "XML iyi biçimliyse yeşil bir durum belirir; değilse ayrıştırıcı hatası gösterilir.",
      "Rapor edilen sorunu düzelt ya da geçtiğinde biçimli önizlemeyi kopyala.",
    ],
    faqs: [
      {
        q: "DTD veya XSD şemasına karşı doğrulama yapar mı?",
        a: "Hayır — yalnızca iyi biçimliliği kontrol eder (yapı, tırnaklama, varlıklar, tek kök). Şema doğrulaması, senin XSD veya DTD'nle çalışan özel bir araç ister.",
      },
      {
        q: "Burada ne bir XML hatası sayılır?",
        a: "Kapanmamış veya eşleşmeyen etiketler, tırnaksız öznitelikler, yinelenen öznitelikler, geçersiz varlık referansları, birden çok kök öğe ve yasadışı karakterlerin hepsi reddedilir.",
      },
      {
        q: "XML'im bir yere gönderiliyor mu?",
        a: "Hayır. Kontrol, yerel DOMParser ile tarayıcında çalışır — verin asla cihazdan çıkmaz.",
      },
    ],
  },
  "html-formatter": {
    name: "HTML Biçimlendirici",
    tagline:
      "Sıkıştırılmış veya tek satırlık HTML'i temiz, girintili işaretlemeye çevir — e-postalar, şablonlar ve kaydedilmiş sayfalar için basit, güvenilir bir güzelleştirici. %100 istemci tarafında.",
    intro: [
      "Üst üste yığılmış HTML'i yapıştır ve okunabilir, tutarlı girintili işaretlemeyi anında geri al. img ve br gibi void öğeler girintiyi asla bozmaz; li ve p gibi yaygın otomatik kapanan etiketler akıllıca ele alınır; pre, textarea, script ve style bloklarının içeriği olduğu gibi korunur.",
      "Bilinçli olarak sade bir biçimlendirici: yeniden sıralama yok, öznitelik yeniden yazımı yok, sürpriz yok — yapıyı bir bakışta belirgin kılan boşluk ve satır sonları eklenir.",
    ],
    steps: [
      "HTML'ini girdi kutusuna yapıştır.",
      "Girintili sonuç yazdıkça canlı görünür.",
      "Biçimli işaretlemeyi kopyala ya da başka bir parçacığı biçimlendirmek için girdiyi temizle.",
    ],
    faqs: [
      {
        q: "Biçimlendirmek HTML'imin görüntüsünü değiştirir mi?",
        a: "Hayır — biçimlendirme yalnızca etiketler arasına boşluk ve satır sonu ekler. pre, textarea, script ve style içerikleri, boşluk orada anlamlı olduğundan aynen korunur.",
      },
      {
        q: "li veya p gibi kapanmamış etiketleri nasıl ele alır?",
        a: "Yaygın otomatik kapanan öğeleri bilir: yeni bir li öncekini kapatır ve bir ataya ait kapanış etiketi tüm açık çocukları kapatır; listeler ve paragraflar beklediğin gibi girintilenir.",
      },
      {
        q: "HTML bir sunucuya gönderilir mi?",
        a: "Asla. Biçimlendirici yerel bir JavaScript token'layıcısıdır — işaretlemen tarayıcında kalır.",
      },
    ],
  },
  "html-minifier": {
    name: "HTML Küçültücü",
    tagline:
      "HTML'i tarayıcında küçült: yorumları soyup boşlukları toplayarak sayfa ağırlığını kıs — işaretlemen ve görüntünü sağlam tutan tutucu bir temizleyici.",
    intro: [
      "HTML'i yapıştır ve gerçek zamanla daha hafif bir sürüm al. Yorumlar kaldırılır (IE koşullu yorumları hayatta kalır), boşluk serileri tek boşluğa iner ve blok düzeyi etiketler arasındaki boşluklar tamamen atılır — satır içi metin boşlukları korunur, kelimeler asla birbirine yapışmaz.",
      "Bu bilinçli olarak tutucu bir küçültücüdür: sınıf adlarını değiştirmez, tırnakları kaldırmaz, hiçbir şeyi yeniden yapılandırmaz. Bu da onu e-posta şablonları ve eski işaretlemeler için güvenli kılar; canlı boyut göstergesi kaç bayt kazandığını tam olarak söyler.",
    ],
    steps: [
      "HTML'ini girdi kutusuna yapıştır.",
      "Küçültülmüş çıktı anında belirir; girdi/çıktı boyutları ve kazanılan yüzdeyle birlikte.",
      "Sıkı HTML'i kopyala ya da başka bir sayfayı küçültmek için girdiyi temizle.",
    ],
    faqs: [
      {
        q: "Küçültme HTML'imi bozabilir mi?",
        a: "Bu araç güvenli yolu seçer: pre, textarea, script ve style içindeki boşluklara dokunulmaz; satır içi öğeler arasındaki boşluk tek boşluk olur ve yalnızca blok düzeyi etiketler arasındaki boşluklar kaldırılır. Yorumlar, IE koşullu yorumları hariç, düşer.",
      },
      {
        q: "Kazanılan yüzde neden diğer küçültücülerden düşük?",
        a: "Tasarımı gereği tutucu olduğu için — metni etiketlerle birleştirmez, tırnak kaldırmaz. Kaldırdığı şeyler (yorumlar, girintiler, bloklar arası boşluklar) daima görüntü açısından güvenlidir.",
      },
      {
        q: "Hiçbir şey yükleniyor mu?",
        a: "Hayır. Her şey tarayıcında yerel çalışır; sayfa ve işaretlemesi asla cihazından çıkmaz.",
      },
    ],
  },
  "css-minifier": {
    name: "CSS Küçültücü",
    tagline:
      "CSS'i online küçült: yorumları ve gereksiz boşlukları kaldırıp stil sayfasını küçült, yüklemeleri hızlandır. Anında, gizli ve kuralların için güvenli.",
    intro: [
      "Herhangi bir stil sayfası yapıştır ve sıkı tek satırlık sürümü gerçek zamanla al: yorumlar soyulur, gereksiz boşluklar çöker, ayraçlar sıkılaştırılır — dizgelerin, url() değerlerinin ve seçici/özellik semantiğin yazıldığı gibi kalır.",
      "Kritik CSS hazırlamak, commit'ten önce bir temayı zayıflatmak veya bir temizliğin gerçekte kaç bayt kazandıracağını görmek için kullan. Canlı boyut göstergesi girdi boyutunu, çıktı boyutunu ve kazanılan yüzdeyi verir.",
    ],
    steps: [
      "CSS'ini girdi kutusuna yapıştır.",
      "Küçültülmüş çıktı anında belirir; kazanılan boyut aşağıda gösterilir.",
      "Sıkı stil sayfasını kopyala ya da başka bir dosyayı küçültmek için girdiyi temizle.",
    ],
    faqs: [
      {
        q: "Küçültme CSS'imin davranışını değiştirir mi?",
        a: "Hayır. Yalnızca yorumlar ve boşluklar kaldırılır — onlar bile dikkatle: dizgeler ve url() içerikleri bayt bayt korunur; content değerleri ve data URI'ları sağlam kalır.",
      },
      {
        q: "Renkleri optimize eder, kuralları birleştirir veya autoprefix yapar mı?",
        a: "Hayır — bu güvenli, söz dizimi düzeyinde bir küçültücüdür. Yapısal optimizasyon (yinelenen kuralları birleştirmek, renkleri kısaltmak) tam bir postprocessor ister; bu araç sıfır semantik değişiklik garantisi verir.",
      },
      {
        q: "CSS'im nereye gidiyor?",
        a: "Hiçbir yere. Küçültme tarayıcında yerel çalışır; hiçbir şey yüklenmez veya saklanmaz.",
      },
    ],
  },
  "javascript-minifier": {
    name: "JavaScript Küçültücü",
    tagline:
      "Tutucu bir JavaScript küçültücü: yorumları soyar, boş satırları toplar, satır sonlarını korur — riskli yeniden yazım yok, kodunun semantiği dokunulmaz.",
    intro: [
      "Bu küçültücü tam olarak iki şey yapar: // ve /* */ yorumlarını kaldırır (dizgeler, iç içe ${…} içeren şablon dizgeleri ve regex dizeleri saygıyla korunarak, çetin dosyalarda bile) ve boş satırlarla girintileri toplar. Deyimler arasındaki satır sonları korunur; otomatik noktalı virgül ekleme eskisi gibi tam olarak çalışmaya devam eder.",
      "Değişken adlarını değiştirmez, kodu satır içine almaz, deyimleri birleştirmez — o iş tam bir derleme aracının işidir. Elde ettiğin şey, anlamlı biçimde küçülmüş, güvenle küçültülmüş bir dosya artı canlı bir bayt tasarrufu göstergesidir; tamamen tarayıcında.",
    ],
    steps: [
      "JavaScript'ini girdi kutusuna yapıştır.",
      "Küçültülmüş çıktı anında belirir; girdi/çıktı boyutları ve kazanılan yüzdeyle.",
      "Sıkı betiği kopyala ya da başka bir dosyayı küçültmek için girdiyi temizle.",
    ],
    faqs: [
      {
        q: "Her şeyi tek satıra birleştirmek yerine neden satır sonlarını koruyor?",
        a: "Bilinçli bir tercih. JavaScript otomatik noktalı virgül eklemesine dayanır ve satır sonlarını kaldırmak bir programın davranışını sessizce değiştirebilir. Satır sonlarını korumak, bu küçültücüyü gerçek bir bundler'dan hiç geçmeyecek kod için güvenli kılar.",
      },
      {
        q: "Terser veya UglifyJS'den farkı nedir?",
        a: "Onlar AST'yi ayrıştırıp yeniden yazar: adları bozar, ölü kodu siler, satır içine alır. Çok daha küçük çıktı, ama gerçek bir derleme adımı. Bu araç yalnızca yorum ve boş satır kaldırır — davranış değişikliği riski sıfır, derleme gerekmez.",
      },
      {
        q: "Kodum bir yere yükleniyor mu?",
        a: "Hayır. Her şey tarayıcında yerel çalışır — kaynağın asla cihazdan çıkmaz.",
      },
    ],
  },
  "sql-formatter": {
    name: "SQL Biçimlendirici",
    tagline:
      "SQL'i tutarlı anahtar kelime yazımı ve girintiyle online biçimlendir — uzun SELECT'leri, JOIN'leri ve saklı yordamları okunabilir koda çevir, tamamen tarayıcında.",
    intro: [
      "Yoğun tek satırlık bir sorgu yapıştır ve düzgün yapılandırılmış SQL'i anında geri al: cümlecikler kendi satırlarına iner, iç içe ifadeler tutarlı girintilenir ve anahtar kelimeler kolay tarama için büyük harfe alınır. sql-formatter motoruyla çalışır; kurallar, gerçek ekiplerin güvendiği kurallardır.",
      "Üretilmiş sorguları incelemek, ORM çıktısında hata ayıklamak, saklı yordamları belgelemek veya birinin yorumda bıraktığı 40 satırlık WHERE cümleciğini çözmek için mükemmel.",
    ],
    steps: [
      "SQL'ini girdi kutusuna yapıştır.",
      "Biçimli sorgu yazdıkça görünür; anahtar kelimeler büyük harfle, cümlecikler hizalı.",
      "Okunabilir SQL'i kopyala ya da başka bir sorgu biçimlendirmek için girdiyi temizle.",
    ],
    faqs: [
      {
        q: "Hangi SQL diyalektleri destekleniyor?",
        a: "Biçimlendirme standart SQL genelinde çalışır; altta yatan motor ayrıca PostgreSQL, MySQL, T-SQL, PL/SQL, BigQuery, Snowflake ve daha fazlasının diyalekte özgü söz dizimini anlar — yaygın yapılar her yerde doğru biçimlenir.",
      },
      {
        q: "Biçimlendirmek sorgumun yaptığını değiştirir mi?",
        a: "Hayır. Yalnızca boşluklar ve anahtar kelime yazımı değişir. Dizge değerleri ve tırnaklı tanımlayıcılar aynen korunur; sorgu semantik olarak birebir aynıdır.",
      },
      {
        q: "Sorgum bir sunucuya gönderiliyor mu?",
        a: "Hayır. Biçimlendirme tarayıcında yerel çalışır — SQL'in asla cihazdan çıkmaz.",
      },
    ],
  },
  "base64-encoder": {
    name: "Base64 Kodlayıcı",
    tagline:
      "Metni tam UTF-8 desteğiyle anında Base64'e kodla — emojiler, aksanlar ve CJK karakterler sağlam kalır. Ücretsiz, gizli, hiçbir şey tarayıcıdan çıkmaz.",
    intro: [
      "Herhangi bir metin yaz veya yapıştır; Base64 karşılığını yazdıkça canlı gör. Kodlama, standart TextEncoder üzerinden UTF-8 güvenlidir; çok dilli metin, emoji ve semboller, her programlama dilinin base64 işlevlerinin ürettiğiyle birebir aynı baytları verir.",
      "HTTP Basic Auth başlıkları, data URI önekleri, yolda e-posta ekleri veya Base64 yükü bekleyen herhangi bir API için kullan — terminal veya kod parçacığı gerekmez.",
    ],
    steps: [
      "Kodlamak istediğin metni yapıştır veya yaz.",
      "Base64 çıktısı canlı güncellenir — hazır olduğunda kopyala.",
      "Gidiş-dönüşü doğrulamak için Base64'ü bağlı çözücüye geri yapıştır.",
    ],
    faqs: [
      {
        q: "Base64 metnimi neden uzatıyor?",
        a: "Base64 her 3 baytı 4 karakterle temsil eder; çıktı girdiden kabaca %33 büyüktür — ikili güvenli metin üretmenin bedeli budur.",
      },
      {
        q: "Base64 şifreleme mi?",
        a: "Hayır. Base64 bir kodlamadır, şifreleme değil — herkes onu anında çözebilir. Sırları saklamak için asla kullanma; gerçek kriptografi kullan.",
      },
      {
        q: "Unicode ve emoji destekleniyor mu?",
        a: "Evet. Girdi, kodlamadan önce UTF-8 baytlarına dönüştürülür; bu, TextEncoder'lı btoa'nın, Python'un, Java'nın ve Node'un aynı dizgi için ürettiğiyle eşleşir.",
      },
    ],
  },
  "base64-decoder": {
    name: "Base64 Çözücü",
    tagline:
      "Base64'ü doğru UTF-8 işlemesiyle okunabilir metne geri çöz — data URI'lar, API yükleri ve kodlanmış yapılandırma değerleri anında netleşir. Gizli ve ücretsiz.",
    intro: [
      "Base64 yapıştır ve çözülen metni canlı gör. Çözme, standart TextDecoder'dan geçer; çok baytlı UTF-8 içerik — aksanlar, emojiler, CJK — bozuk metne dönüşmeden doğru çıkar.",
      "İşe yarar yönlerinden bağışlayıcıdır: girdideki boşluklar ve satır sonları yok sayılır ve data:image/png;base64, gibi data URI önekleri çözmeden önce otomatik olarak soyulur.",
    ],
    steps: [
      "Base64 dizgisini girdi kutusuna yapıştır.",
      "Çözülen metin anında belirir — tek tıkla kopyala.",
      "Çözme başarısızsa girdide kesilmiş veya Base64 olmayan karakterleri kontrol et.",
    ],
    faqs: [
      {
        q: "Çıktı anlamsız simgeler gibi görünüyor — neden?",
        a: "Girdi muhtemelen UTF-8 metin değildir. Base64 rastgele baytları kodlayabilir: görseller, PDF'ler, ikili veriler. Bu araç baytları UTF-8 metin olarak çözer; ikili veri, değiştirme karakterleri olarak görünür.",
      },
      {
        q: "URL güvenli Base64'ü çözebilir mi?",
        a: "Evet — + ve / yerine - ve _ kullanan JWT tarzı verileri hedefler. Dolgulu veya dolgusuz standart Base64 de çalışır.",
      },
      {
        q: "Çözme bir sunucuda mı yapılıyor?",
        a: "Hayır. Her şey tarayıcında çalışır; dizgi asla cihazından çıkmaz.",
      },
    ],
  },
  "url-encoder": {
    name: "URL Kodlayıcı",
    tagline:
      "URL'leri ve sorgu dizgelerini online yüzde kodla — bileşen kodlaması veya tam URI kodlaması seç, bağlantılar, parametreler ve yol segmentleri için canlı çıktı.",
    intro: [
      "Herhangi bir metni veya URL'yi yapıştır ve yüzde kodlanmış sonucu canlı gör. İki mod, gerçek dünyadaki iki durumu kapsar: bileşen kodlaması (encodeURIComponent) tek bir parametre değeri için tüm ayrılmış karakterleri kaçışlar; tam URI kodlaması (encodeURI) URL yapısını — :, /, ? ve & — sağlam tutar.",
      "Sorgu dizgelerini elle kurarken, URL'leri başka URL'lerin içine gömerken, mailto bağlantıları üretirken veya boşluklu, & işaretli ve Latin olmayan karakterli değerleri GET parametreleriyle taşırken vazgeçilmezdir.",
    ],
    steps: [
      "Kodlanacak metni, parametre değerini veya URL'yi yapıştır.",
      "Bir değer için bileşen kodlamasını, URL yapısını korumak için tam URI'yı seç.",
      "Kodlanmış sonucu doğrudan bağlantına veya isteğine kopyala.",
    ],
    faqs: [
      {
        q: "encodeURI yerine ne zaman encodeURIComponent kullanmalıyım?",
        a: "URL'ye yerleştirdiğin tek tek değerler için encodeURIComponent kullan — &, =, ?, / ve dahasını kaçışlar; bir değer sorgu dizgisini asla bozamaz. encodeURI'yi yalnızca yapısını koruyarak taşımaya uygun kılmak istediğin tam bir URL için kullan.",
      },
      {
        q: "Boşluklar neden + değil %20 oluyor?",
        a: "%20, boşluğun standart yüzde kodlamasıdır; + kısayolu, application/x-www-form-urlencoded'in ayrıca ele aldığı bir form kodlama geleneğidir. Bu araç standart %20'yi kullanır.",
      },
      {
        q: "Latin olmayan karakterleri halleder mi?",
        a: "Evet — ASCII dışındaki karakterler önce UTF-8 kodlanır, sonra yüzde kodlanır; tarayıcıların yaptığı tam olarak budur.",
      },
    ],
  },
  "url-decoder": {
    name: "URL Çözücü",
    tagline:
      "Yüzde kodlanmış URL'leri okunabilir metne geri çöz — %20, %2F ve sorgu dizgisi değerleri anında netleşir. +'yı boşluk sayar, tamamen tarayıcında.",
    intro: [
      "Kodlanmış bir URL'yi, parametreyi veya yol segmentini yapıştır ve özgün metni hemen oku. İki mod, iki kodlayıcıyla eşleşir: tek bir değer için bileşen çözme (decodeURIComponent), tam bir URL için tam URI çözme (decodeURI).",
      "Pratik bir ek anahtar, +'yı boşluk sayar; form kodlu sorgu dizgilerinin (application/x-www-form-urlencoded) asıl kastı budur — hello+world gibi arama parametreleri hello world'e çözülür, aynen kalmaz.",
    ],
    steps: [
      "Yüzde kodlanmış dizgiyi veya URL'yi yapıştır.",
      "Değerler için bileşen çözmeyi, tam URL'ler için tam URI çözmeyi seç.",
      "Form tarzı sorgu dizgileri için “+ yerine boşluk” seçeneğini aç, sonra çözülen metni kopyala.",
    ],
    faqs: [
      {
        q: "Bazen çözerken neden hata alıyorum?",
        a: "Ardından iki onaltılık basamak gelmeyen tek başına bir %, ya da %E4%BD gibi kesilmiş bir kaçış dizisi geçersiz yüzde kodlamasıdır — çözücü tahmin etmek yerine bunu raporlar.",
      },
      {
        q: "“+ yerine boşluk” seçeneğini açmalı mıyım?",
        a: "Bir HTML form gönderiminden veya birçok web framework'ünün sorgu dizgisinden çıkan değerler için evet. Gerçek + karakterleri içeren standart yüzde kodlu URL'lerde kapalı tut.",
      },
      {
        q: "Hiçbir şey yükleniyor mu?",
        a: "Hayır. Çözme tarayıcında yerel çalışır — hiçbir şey cihazından çıkmaz.",
      },
    ],
  },
  "jwt-decoder": {
    name: "JWT Çözücü",
    tagline:
      "JWT token'larını online çöz: başlığı ve yük taleplerini, insan okur exp ve iat zaman damgalarıyla incele. Yalnızca çözme — hiçbir şey doğrulanmaz veya yüklenmez.",
    intro: [
      "Bir JSON Web Token yapıştır ve üç parçasını ayrı ayrı anında gör: başlık (algoritma ve token türü), yük (gerçek talepler) ve imza. Her iki JSON bölümü de güzel yazılır; iat, nbf ve exp gibi zaman damgaları senin yerel biçiminle düz tarihlere çevrilir ve exp, süresi dolmuş ya da hâlâ aktif olarak işaretlenir.",
      "Her şey Base64URL ile yerel olarak çözülür — token hiçbir yere gönderilmez ve asla doğrulanmaz. Unutma: çözme, bir token'ın ne söylediğini gösterir, neye izni olduğunu değil. İmza doğrulaması daima, güvenilen bir sistemdeki gizli anahtarı veya açık anahtarı gerektirir.",
    ],
    steps: [
      "JWT'yi (noktayla ayrılmış üç parça) girdi kutusuna yapıştır.",
      "Güzel yazılmış başlığı ve yükü oku; exp/iat gerçek tarihler olarak gösterilir.",
      "Token'ını veya sunucu tarafı doğrulamasını buna göre düzelt — gerekirse yükü kopyala.",
    ],
    faqs: [
      {
        q: "Bir JWT'yi çözmek onu doğrular mı?",
        a: "Hayır. Çözme yalnızca Base64URL + JSON ayrıştırmadır ve herkes yapabilir — bir saldırgan dahil. Geçerli görünen çözülmüş bir token hiçbir şey kanıtlamaz. Doğrulama, imzayı gizli anahtarla (HMAC) veya açık anahtarla (RSA/EC) kontrol etmeyi gerektirir; bu da token'ı veren tarafın anahtar malzemesini ister.",
      },
      {
        q: "Bir token'ın taleplerini geri kazanabilir veya değiştirebilir miyim?",
        a: "Talepleri okuyabilirsin ama imzayı geçersiz kılmadan değiştirilmiş taleplerle yeni bir token uyduramazsın — başlıkta veya yükte yapılan herhangi bir değişiklik, sunucudaki imza kontrolünü kırar.",
      },
      {
        q: "Gerçek bir token'ı buraya yapıştırmak güvenli mi?",
        a: "Token tamamen tarayıcında çözülür ve asla cihazından çıkmaz — yükleme yok. Yine de token'ları birer kimlik bilgisi gibi davran ve üretim token'larını ihtiyacın olmayan hiçbir yere yapıştırmaktan kaçın.",
      },
    ],
  },
  "uuid-generator": {
    name: "UUID Üretici",
    tagline:
      "Rastgele UUID v4 tanımlayıcılarını tek tıkla topluca üret — bir seferde 1 ile 500 arası, tarayıcının kriptografik rastgeleliğiyle. Ücretsiz, anında, çevrimdışı da çalışır.",
    intro: [
      "İhtiyacın kadar RFC 4122 sürüm 4 UUID üret: test fixture'ları, veritabanı tohumları, dosya adları, istek kimlikleri veya API anahtarı taslakları. Her tanımlayıcı, tarayıcının kriptografik olarak güvenli rastgele kaynağı crypto.randomUUID ile üretilir — 122 rastgele bit, pratikte asla vuramayacağın çarpışma olasılığı.",
      "Zaman tabanlı sürümlerin (v1/v6/v7) aksine v4 zaman damgası taşımaz; ne zaman ve nerede üretildiğine dair hiçbir şey sızmaz — sayfa tam olarak bunu, artı yığının ne zaman üretildiğini söyler.",
    ],
    steps: [
      "Kaç UUID'ye ihtiyacın olduğunu ayarla (1–500).",
      "Üret'e tıkla — liste anında belirir.",
      "Tümünü bir kerede kopyala ya da temizleyip taze bir yığın üret.",
    ],
    faqs: [
      {
        q: "Üretilen iki UUID hiç çarpışabilir mi?",
        a: "Kuramsal olarak evet, pratikte hayır. 122 rastgele bit ile bir çarpışma üretmek 10^36 mertebesinde UUID gerektirir — gerçekçi hiçbir iş yükünün çok ötesinde.",
      },
      {
        q: "Neden UUID v1 veya v7 yerine v4?",
        a: "v4 zamanlama veya donanım bilgisi sızmaz; saat veya MAC adresi gerektirmez. Veritabanı indekslerine dost, zamana göre sıralanabilir kimliklere ihtiyacın varsa v7'ye bak — ama saf benzersizlik için v4 standart seçimdir.",
      },
      {
        q: "UUID'ler bir sunucuda mı üretiliyor?",
        a: "Hayır. Kendi tarayıcının kriptografik rastgele üreteçlerinden gelir ve asla cihazından çıkmaz.",
      },
    ],
  },
  "hash-generator": {
    name: "Hash Üretici",
    tagline:
      "Metnin veya dosyaların SHA-1, SHA-256, SHA-384, SHA-512 veya MD5 hash'lerini tarayıcında hesapla. Bütünlük kontrolleri için hızlı sağlama toplamları — yükleme yok.",
    intro: [
      "Herhangi bir metni yazdıkça hash'le ya da bir dosya bırak; bayt bayt okumadan parmak izini al. SHA-2 ailesi özetleri tarayıcının yerel WebCrypto motorunda çalışır; MD5, denetimden geçmiş bir JavaScript uygulaması kullanır — hepsi yerel, hepsi ücretsiz.",
      "Tipik kullanımlar: bir indirmeyi yayımlanmış sağlama toplamıyla doğrulamak, dosyaları tekilleştirmek, önbellek anahtarları üretmek veya bir belgenin iki sürümünü karşılaştırmak. Tek tıkla algoritma değiştir ve hex özeti anında kopyala.",
    ],
    steps: [
      "Algoritmayı seç: varsayılan SHA-256 ya da SHA-1/384/512/MD5.",
      "Metni yaz veya yapıştır — ya da Dosya moduna geçip bir dosya bırak.",
      "Onaltılık özeti kopyala; beklenen sağlama toplamıyla karşılaştır.",
    ],
    faqs: [
      {
        q: "Hangi algoritmayı kullanmalıyım?",
        a: "Bütünlük kontrolleri ve parmak izleri için SHA-256 akla yakın varsaylandır. Daha uzun özetler için SHA-384/512; SHA-1 ve MD5 eskimiştir — güvenlik dışı sağlama toplamları için iyidir ama saldırganlara karşı güvenme.",
      },
      {
        q: "Girdiyi geri kazanmak için bir hash tersine çevrilebilir mi?",
        a: "Hayır. Hash'ler tek yönlüdür: sabit uzunluklu özetler, tasarım gereği bilgi atar. Belirli bir özeti üreten bir girdi bulmak, tüm uzayı kaba kuvvetle denemek demektir.",
      },
      {
        q: "Metnim ve dosyalarım yükleniyor mu?",
        a: "Asla. Hash'leme tarayıcında yerel çalışır — çok gigabaytlık dosyalar bile yalnızca kendi cihazın tarafından okunur.",
      },
    ],
  },
  "md5-generator": {
    name: "MD5 Üretici",
    tagline:
      "Herhangi bir metnin veya dosyanın MD5 hash'ini tarayıcında anında üret — sağlama toplamları, tekilleştirme anahtarları ve eski sistem entegrasyonları için. Tek yönlü, asla yüklenmez.",
    intro: [
      "Metin yaz ve 128 bitlik MD5 özetini canlı gör ya da tek bir bayt yüklemeden bir dosyanın parmak izini al. Hash'leme, MD5 algoritmasının olgun bir JavaScript uygulamasıyla yerel olarak olur.",
      "MD5 hâlâ her yerdedir: indirme sağlama toplamları, dosya tekilleştirme anahtarları, önbellek kırıcılar, eski sistem entegrasyonları. Yalnızca ne için olmadığını unutma — yaşına rağmen MD5 kriptografik olarak kırılmıştır; şifreler, imzalar veya saldırganın kurcalayabileceği hiçbir şey için asla kullanma.",
    ],
    steps: [
      "Metni yaz veya yapıştır — MD5 özeti canlı güncellenir.",
      "Ya da Dosya moduna geç ve yerel olarak hash'lemek için bir dosya bırak.",
      "Onaltılık özeti kopyala ve beklenen sağlama toplamıyla karşılaştır.",
    ],
    faqs: [
      {
        q: "MD5 şifre saklamak için güvenli mi?",
        a: "Hayır — çok da değil. MD5 tasarımı gereği hızlıdır ve çarpışma saldırıları pratiktir; MD5 şifre hash'lerini kırmayı basitleştirir. Bunun yerine bcrypt, scrypt veya Argon2 gibi özel bir şifre hash'leme şeması kullan.",
      },
      {
        q: "MD5 hâlâ ne için iyi?",
        a: "Rakipsiz bütünlük için: bir dosyanın transferden sağlam çıktığını doğrulamak, içeriği tekilleştirmek, önbellek anahtarları ve onu bekleyen eski sistemlerle konuşmak. Güvenliğe dokunan kontroller için SHA-256 veya daha iyisini kullan.",
      },
      {
        q: "Metnim ve dosyalarım bir sunucuya gönderiliyor mu?",
        a: "Hayır. Her şey tarayıcında çalışır; dosyalar bile tamamen cihazında okunur ve hash'lenir.",
      },
    ],
  },
  "sha256-generator": {
    name: "SHA-256 Üretici",
    tagline:
      "Metnin veya dosyaların SHA-256 hash'lerini yerel WebCrypto ile online hesapla — bütünlük kontrolleri ve parmak izleri için standart tercih. %100 istemci tarafında.",
    intro: [
      "Metin yaz ve 256 bitlik SHA-256 özetinin canlı belirişini izle ya da hiçbir şey yüklemeden gigabaytlarca dosyanın parmak izini al. Hash, tarayıcının kendi WebCrypto uygulamasıyla hesaplanır — işletim sisteminin ve TLS yığınının güvendiği kodun aynısı.",
      "SHA-256, bugün indirmeleri doğrulamanın, artefaktları imzalamanın, içeriği tekilleştirmenin, içerik adresli depolama ve blockchain işlerinin varsayılanıdır. Hex özetini tek tıkla kopyala ve yayıncının verdiği sağlama toplamıyla karşılaştır.",
    ],
    steps: [
      "Metni yaz veya yapıştır — özet yazdıkça güncellenir.",
      "Ya da Dosya moduna geç ve yerel olarak hash'lemek için bir dosya bırak.",
      "Onaltılık özeti kopyala ve beklenen değerle karşılaştır.",
    ],
    faqs: [
      {
        q: "SHA-256 güvenli mi?",
        a: "Evet — SHA-256, SHA-2 ailesinin parçasıdır ve yirmi yıllık analize rağmen kırılmamıştır. TLS sertifikalarının, Bitcoin'in ve çoğu yazılım sürüm doğrulamasının arkasındaki özettir.",
      },
      {
        q: "Aynı girdi neden daima aynı hash'i veriyor?",
        a: "Çünkü SHA-256 deterministiktir: özdeş baytlar daima özdeş özet üretir. Bu özellik, sağlama toplamı karşılaştırmasını işler kılan şeydir — herhangi bir yerde değişen tek bayt, özetin tamamını değiştirir.",
      },
      {
        q: "Metnim ve dosyalarım yükleniyor mu?",
        a: "Hayır. Hash'leme WebCrypto ile tarayıcında yerel çalışır — verin asla cihazdan çıkmaz.",
      },
    ],
  },
  "regex-tester": {
    name: "Regex Test Aracı",
    tagline:
      "Düzenli ifadeleri canlı test et: yazdıkça her eşleşmeyi vurgula, yakalama gruplarını incele, JavaScript desenlerini hata ayıkla; yaygın bayraklar tek tık uzağında.",
    intro: [
      "Bir desen yaz, ihtiyacın bayrakları aç (global, büyük/küçük harf duyarsız, çok satırlı, dotAll, unicode) ve test dizgini yapıştır — her eşleşme yerinde vurgulanırken aşağıdaki liste, adlandırılmış gruplar dahil, her eşleşmeyi indeksi ve yakalama gruplarıyla gösterir.",
      "Geçersiz desenler, bozuk bir sayfa yerine ayrıştırıcının kendi mesajıyla hemen raporlanır; sıfır uzunluklu eşleşmeler güvenle ele alınır, a* gibi desenler çalışma zamanının göstereceği gibi davranır.",
    ],
    steps: [
      "Düzenli ifadeni desen alanına gir.",
      "Bayrakları (g, i, m, s, u) aç/kapat ve test dizgini yapıştır.",
      "Vurgulanmış eşleşmeleri ve grup listesini oku; tam ihtiyacın olanı yakalayana dek deseni ayarla.",
    ],
    faqs: [
      {
        q: "Hangi regex tadını kullanıyor?",
        a: "JavaScript (ECMAScript) RegExp — tarayıcında ve Node'da çalışan motorun aynısı. PCRE, Python veya Java desenleri genellikle uyumludur ama lookahead/lookbehind ve unicode işlemesi hafifçe farklılaşabilir.",
      },
      {
        q: "Desenim neden tuhaf boş konumlarla eşleşiyor?",
        a: "Boş bir dizgiyle eşleşebilen desenler (a* gibi) sıfır uzunluklu eşleşmeler üretir. Test aracı her birinden sonra tek karakter ilerler; JavaScript'in kendi yinelemesinin yaptığı tam olarak budur.",
      },
      {
        q: "Test verim bir yere gönderiliyor mu?",
        a: "Hayır. Eşleştirme tarayıcında canlı çalışır — hiçbir şey yüklenmez veya saklanmaz.",
      },
    ],
  },
  "json-to-csv": {
    name: "JSON'den CSV'ye",
    tagline:
      "Nesne dizilerini doğru tırnaklama ve kaçışla CSV'ye çevir — Excel, Sheets veya veritabanı aktarımına hazır. Tamamen tarayıcıda.",
    intro: [
      "Nesnelerden oluşan bir JSON dizisi yapıştır ve CSV'yi anında al. Sütunlar, satırlar arasında bulunan tüm anahtarların birleşimidir; değerler kitabına uygun kaçışlanır — tırnaklar ikilenir, virgül, tırnak veya satır sonu içeren alanlar sarılır — sonuç Excel'de, Sheets'te veya herhangi bir içe aktarıcıda temiz açılır.",
      "İç içe nesneler ve diziler, hücre içinde JSON dizgisi olarak serileştirilir; boole'ler ve sayılar olduğu gibi geçer, null'lar boş hücreye dönüşür. Bekleyen yerel ayarlar için ayraç olarak virgül veya noktalı virgül seç.",
    ],
    steps: [
      "Nesnelerden oluşan bir JSON dizisini girdi kutusuna yapıştır.",
      "CSV canlı görünür — tablonun gerektirmesi hâlinde virgül veya noktalı virgül seç.",
      "Sonucu doğrudan bir .csv dosyasına veya içe aktarma sihirbazına kopyala.",
    ],
    faqs: [
      {
        q: "Satırlarımın anahtarları farklıysa ne olur?",
        a: "Araç, sütun listesini tüm satırlarda gördüğü her anahtardan kurar; bir sütunu eksik olan satır boş bir hücre alır. Dağınık gerçek dünya verisi için genellikle istediğin de budur.",
      },
      {
        q: "İç içe nesneler ve diziler nasıl ele alınır?",
        a: "Hücre içinde bir JSON dizgisine serileştirilir (ve diğer her değer gibi tırnaklanır/kaçışlanır). İç içe her alan için ayrı sütun istiyorsan verini önce düzleştir.",
      },
      {
        q: "Verim bir yere yükleniyor mu?",
        a: "Hayır. Dönüşüm tarayıcında yerel olur — hiçbir şey cihazından çıkmaz.",
      },
    ],
  },
  "csv-to-json": {
    name: "CSV'den JSON'a",
    tagline:
      "CSV'yi otomatik tür çıkarımıyla JSON'a çevir — sayılar, boole'ler ve null'lar algılanır, tırnaklı alanlar doğru ele alınır. Yapıştır, dönüştür, kopyala. Yükleme yok.",
    intro: [
      "Başlık satırlı herhangi bir CSV yapıştır ve gerçek zamanla nesne dizisi al. Tırnaklı alanlar, kaçışlı tırnaklar ve CRLF satır sonları doğru ayrıştırılır; her hücre mantıklı bir tür alır: true/false boole olur, düz sayılar sayı olur, null null olur — geri kalan her şey dizgi kalır.",
      "API isteklerini beslemek, veritabanlarını tohumlamak veya bir tablo dışa aktarımını kodunun yutabileceği bir şeye çevirmek için kullan. JSON çıktısı 2 boşluklu girintiyle güzel yazılır ve kopyalamaya hazırdır.",
    ],
    steps: [
      "CSV'ni (ilk satır başlık olmalı) girdi kutusuna yapıştır.",
      "Ayraç olarak virgül veya noktalı virgül seç.",
      "Güzel yazılmış nesne dizisini kopyala.",
    ],
    faqs: [
      {
        q: "Tür çıkarımı dizgi ile sayı arasında nasıl karar verir?",
        a: "Bir hücre, yalnızca temiz bir sayısal değer ise sayıya dönüşür (başında sıfır yok, başıboş boşluk yok); true/false boole olur, null değeri null olur ve geri kalan her şey — başında sıfır olan kimlikler, posta kodları, tarihler — tam değerini korumak için dizgi kalır.",
      },
      {
        q: "Başlık satırımda yinelenen veya boş adlar varsa?",
        a: "Boş başlık hücreleri otomatik olarak column1, column2… adlarıyla değiştirilir. Yinelenen adlar son görülene çöker; JSON nesneleri yinelenen anahtar taşıyamaz.",
      },
      {
        q: "CSV'm bir sunucuya yükleniyor mu?",
        a: "Hayır. Dönüşüm tarayıcında yerel çalışır — verin asla cihazından çıkmaz.",
      },
    ],
  },
  "markdown-previewer": {
    name: "Markdown Önizleyici",
    tagline:
      "Markdown'u yazarken temiz, arındırılmış HTML olarak önizle — başlıklar, listeler, tablolar, kod ve bağlantılar canlı çizilir. README'ler, dokümanlar ve yorumlar için ideal.",
    intro: [
      "Solda Markdown yaz ve sağda çizilen sayfanın gerçek zamanla belirişini izle: başlıklar, vurgular, listeler, tablolar, alıntılar, görev listeleri ve çevrili kod blokları — hepsi yaygın kullanılan marked motoruyla çizilir.",
      "Üretilen HTML, gösterilmeden önce sıkı bir etiket ve öznitelik beyaz listesiyle arındırılır — betikler, olay işleyicileri ve javascript: URL'leri soyulur — ve temiz HTML'i kopyalayıp bir bloga, CMS'ye veya e-posta şablonuna yapıştırabilirsin.",
    ],
    steps: [
      "Markdown'u sol panele yaz veya yapıştır.",
      "Sağda arındırılmış önizlemenin yazdıkça güncellenmesini izle.",
      "Doğru göründüğünde üretilen HTML'i kopyala ya da baştan başlamak için temizle.",
    ],
    faqs: [
      {
        q: "Önizlenen HTML güvenli mi?",
        a: "Evet. Her şey çizilmeden önce, HTML bir beyaz liste temizleyiciden geçer; script etiketlerini, satır içi olay işleyicilerini ve javascript: bağlantılarını kaldırır, yalnızca standart biçimlendirme etiketleri ve güvenli görsel/bağlantı URL'leri bırakır.",
      },
      {
        q: "Hangi Markdown özellikleri destekleniyor?",
        a: "marked'ın varsayılan olarak hallettiği her şey: GitHub tarzı tablolar, üstü çizili, görev listeleri, otomatik bağlantılar, söz dizimi etiketli çevrili kod ve iç içe listeler.",
      },
      {
        q: "Metnim nerede işleniyor?",
        a: "Tamamen tarayıcında — üretilen HTML'i kopyalasan bile Markdown asla cihazından çıkmaz.",
      },
    ],
  },
  "html-escape": {
    name: "HTML Kaçış Dönüştürücü",
    tagline:
      "HTML varlıklarını yazdıkça canlı kaçışla veya geri çöz: & < > ve tırnaklar güvenli referanslara dönüşür; ASCII dışı karakterler için isteğe bağlı sayısal mod.",
    intro: [
      "HTML'i bozan beş karakteri — & işareti, açı parantezleri ve her iki tırnak stili — adlandırılmış varlıklarına kodla ya da varlıkları okunabilir metne geri çöz. İkinci bir anahtar, aksanlı ve Latin olmayan karakterleri &#233; gibi sayısal referanslara çevirir; eski sistemler ve e-posta şablonları için kullanışlıdır.",
      "Her iki yön de tek panelde canlı çalışır ve gösterge, karakter sayısının tam olarak nasıl değiştiğini söyler; bozuk bir çift kaçış bir bakışta görünür.",
    ],
    steps: [
      "HTML'i veya kaçışlanmış metni girdi kutusuna yapıştır.",
      "Kaçış veya Çözme seç; ikisi de yazdıkça canlı çalışır.",
      "&#233; gibi ASCII dışı çıktı gerekiyorsa sayısal varlıkları etkinleştir.",
      "Sonucu kopyala — karakter sayısı göstergesi ne kadar büyüdüğünü veya küçüldüğünü söyler.",
    ],
    faqs: [
      {
        q: "Tek tırnak neden &apos; yerine &#39; olarak kaçışlanıyor?",
        a: "&apos;, XML ve HTML5'te geçerlidir ama hiçbir zaman HTML 4'ün parçası olmadı; bazı eski ayrıştırıcılar ve e-posta istemcileri onu yanlış işler. Sayısal &#39; her yerde güvenlidir.",
      },
      {
        q: "ASCII olmayan karakterleri kaçışlamam gerekiyor mu?",
        a: "UTF-8 belgelerde genellikle hayır — tarayıcılar é'yi doğrudan halleder. Sayısal varlıklar, eski kodlamalar, e-posta hatları veya ASCII dışı baytları bozan sistemler için önemlidir.",
      },
      {
        q: "Çözme hangi adlandırılmış varlıkları tanır?",
        a: "Yaklaşık 70 yaygın olanı — işaretleme (&amp;, &lt;, &gt;, &quot;, &apos;), noktalama (&mdash;, &hellip;, &ldquo;), Latin aksanları ve simgeler (&copy;, &euro;) — artı her ondalık ve onaltılık sayısal referans.",
      },
    ],
  },
  "url-parser": {
    name: "URL Ayrıştırıcı",
    tagline:
      "Herhangi bir URL yapıştır ve canlı çözülüşünü gör: protokol, sunucu, port, her yol segmenti, çözülmüş sorgu parametreleri ve hash — JSON olarak kopyalanabilir.",
    intro: [
      "Bir URL, tek satırda düzinelerce veri parçası saklar. Bu araç onu etiketli satırlara böler — şema, sunucu, port, her yol segmenti kendi satırında, her sorgu parametresi anahtarı ve çözülmüş değeriyle, artı çapa — takip bağlantılarını denetlemek, yönlendirmede hata ayıklamak veya bir API çağrısını tersine mühendislik yapmak için.",
      "Ayrıştırma, tarayıcının yerel URL API'sini kullanır: değerler, alıcı sunucunun çözeceği tam şekilde çözülür. Şemasız URL'lerde https:// varsayılır ve bozuk girdi, çökme yerine anlaşılır bir hata verir.",
    ],
    steps: [
      "URL'yi girdi kutusuna yapıştır.",
      "Çözülen tabloyu oku: parçalar, segmentler ve parametreler canlı güncellenir.",
      "Kodda veya dokümantasyonda dağılım gerekiyorsa JSON olarak kopyala.",
    ],
    faqs: [
      {
        q: "https:// olmadan bir URL yapıştırırsam ne olur?",
        a: "Araç https:// varsayar ve yeniden dener; tarayıcıların çıplak alan adlarına yaptığı budur. Açıkça yazdığın bir şema daima olduğu gibi korunur.",
      },
      {
        q: "Sorgu değerleri çözülüyor mu?",
        a: "Evet. Anahtarlar ve değerler URL standardıyla çözülür; %20 boşluğa, %2F bölüye döner — sunucunun okuyacağı tam olarak böyle.",
      },
      {
        q: "?tag=a&tag=b gibi yinelenen sorgu anahtarları ne olur?",
        a: "Her geçiş kendi satırını alır ve JSON dışa aktarımı onları ayrı anahtar/değer çiftleri olarak listeler; hiçbir şey sessizce üzerine yazılmaz.",
      },
    ],
  },
  "http-status-codes": {
    name: "HTTP Durum Kodları",
    tagline:
      "Sınıflarına göre gruplanmış, aranabilir 56 HTTP durum kodu başvurusu — her biri tek düz cümleyle açıklanır; numarayı kopyalamak için satıra tıkla.",
    intro: [
      "100 Continue'dan 511 Network Authentication Required'a kadar her önemli durum kodu, sınıfına göre gruplanmış ve tek düz cümleyle açıklanmış: hatta gerçekte ne oldu ve sırada ne yapılmalı. Klasikler (200, 301, 404, 500), insanları şaşırtanların (207, 418, 451) yanında durur.",
      "Arama numarayla veya adla canlı süzer — her yönlendirmeye inmek için 30 yaz ya da bir tartışmayı bitirmek için “teapot”. Bir satıra tıklamak yalnızca numarayı kopyalar; kod, doküman veya hata raporu için hazır.",
    ],
    steps: [
      "Arama kutusuna bir numara veya ad yaz ya da sınıfa göre gez.",
      "Tek satırlık anlamı oku — RFC küstahlığı yok, yalnızca pratik anlam.",
      "Kod numarasını anında kopyalamak için bir satıra tıkla.",
    ],
    faqs: [
      {
        q: "301, 302 ve 307 arasındaki fark nedir?",
        a: "Üçü de yönlendirir ama 301 kalıcıdır (arama motorları sıralamayı taşır), 302/307 geçicidir. 307 ayrıca yöntemin ve gövdenin değişmeden kaldığını garantiler — bir POST'un yönlendirmeden sağ çıkması gerekiyorsa onu kullan.",
      },
      {
        q: "418 I'm a teapot gerçek bir durum kodu mu?",
        a: "RFC 2324'te bir Nisan Şakası olarak doğdu ve sonradan ayrılmış olarak listelendi. Bazı gerçek API'ler eğlence için veya hız sınırlamada döndürür ve tarayıcılar onu herhangi bir 4xx hatası gibi ele alır.",
      },
      {
        q: "401 ve 403 ikisi de giremezsin demiyor — fark ne?",
        a: "401 “sen kimsin?” demektir — kimlik bilgileri eksik veya yanlış. 403 “kim olduğunu biliyorum ve yine de giremezsin” demektir — kimlik doğrulandı ama kaynak yasaklı.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* SEO                                                                 */
  /* ------------------------------------------------------------------ */
  "meta-tag-generator": {
    name: "Meta Etiket Üretici",
    tagline:
      "Başlık, açıklama, anahtar kelimeler, robots ve viewport meta etiketlerini canlı HTML çıktısıyla üret; doğrudan <head> bölümüne yapıştır.",
    intro: [
      "Meta etiketler, tarayıcıların ilk okuduğu şeydir: title etiketi bir sıralama sinyalidir ve meta açıklama, Google onu yeniden yazmadığında snippet'in olur. Bu üretici, yazarken temiz ve geçerli bir set kurar — title, description, keywords, robots, viewport, author artı isteğe bağlı bir canonical bağlantısı.",
      "Her öznitelik değeri HTML kaçışlıdır; tırnaklar ve & işaretleri işaretlemeni bozamaz. Bloğu şablonuna veya CMS'nin head bölümüne kopyala ve sayfa sayfa ayarla.",
    ],
    steps: [
      "Sayfa başlığını (50–60 karakteri hedefle) ve meta açıklamayı (~160'a kadar) doldur.",
      "Robots, viewport ve author'u gerektiği gibi ayarla — boş bırakılan alanlar çıktıda yer almaz.",
      "Üretilen <head> parçacığını kopyala ve sayfa şablonuna yapıştır.",
    ],
    faqs: [
      {
        q: "Title etiketi ne kadar uzun olmalı?",
        a: "Yaklaşık 50–60 karakteri hedefle; Google'ın çizdiği puntoyla kabaca 580 piksel. Daha uzun başlıklar sonuçlarda üç nokta ile kesilir — nerede kesildiğini SERP önizleme aracı tam gösterir.",
      },
      {
        q: "Meta keywords hâlâ işe yarıyor mu?",
        a: "Google meta keywords etiketini 2009'dan beri yok sayar ve Bing onu spam sinyali sayabilir. Yalnızca niş bir arama motoru veya dahili arama platformu açıkça gerektiriyorsa doldur.",
      },
      {
        q: "Robots meta etiketi neyi kontrol eder?",
        a: "index/noindex, sayfanın sonuçlarda görünüp görünemeyeceğini; follow/nofollow, bağlantılarının değer aktarıp aktarmayacağını belirler. Sayfanın kendisinde bulunmalıdır — robots.txt hiçbir şeyi noindex edemez.",
      },
    ],
  },
  "open-graph-generator": {
    name: "Open Graph Üretici",
    tagline:
      "Tam og: ve twitter: meta etiket setini kur ve paylaşım kartı önizlemesinin canlı güncellenişini, bir şey yapıştırmadan izle.",
    intro: [
      "Bağlantın X, Facebook, LinkedIn, Slack veya iMessage'da paylaşıldığında önizleme kartı neredeyse tamamen Open Graph etiketlerinden kurulur; boşlukları Twitter card etiketleri doldurur. Bu üretici her iki ad alanını da verir: og:title, og:type, og:url, og:image, og:image:alt, og:site_name, og:description ve og:locale; artı twitter:card, twitter:site ve twitter:creator.",
      "Çoğu platform, twitter: etiketi yoksa og: etiketlerine döner; ekstralar yalnızca farklılaştıkları yerlerde gerekir. Canlı önizleme, büyük görselli veya özet kartının kabaca nasıl çizildiğini gösterir.",
    ],
    steps: [
      "Sayfa başlığını, açıklamayı ve canonical URL'yi gir.",
      "Paylaşım görselinin URL'sini ekle (1200 × 630 px her yerde çalışır) ve kart türünü ayarla.",
      "Etiketleri <head> bölümüne kopyala ve önizleme kartını kontrol et.",
    ],
    faqs: [
      {
        q: "og:image için hangi görsel boyutunu kullanmalıyım?",
        a: "1200 × 630 piksel (1.91:1), Facebook, X ve LinkedIn'de güvenli varsaylandır. Dosyayı 8 MB'ın altında tut, mutlak bir URL kullan ve erişilebilirlik için daima og:image:alt ekle.",
      },
      {
        q: "Hem og: hem twitter: etiketlerine ihtiyacım var mı?",
        a: "twitter:title, twitter:description ve twitter:image, og: karşılıklarına düşer. og: setinin üstüne yalnızca twitter:card (summary veya summary_large_image), twitter:site ve isteğe bağlı twitter:creator gerekir.",
      },
      {
        q: "Hangi og:type'ı seçmeliyim?",
        a: "Ana sayfalar ve genel sayfalar için website, haberler ve blog yazıları için article (yapabiliyorsan article:published_time ekle), e-ticaret detay sayfaları için product kullan. Tür, bazı platformların bağlantıyı nasıl sınıflandırdığını değiştirir.",
      },
    ],
  },
  "canonical-tag-generator": {
    name: "Canonical Etiket Üretici",
    tagline:
      "Doğru bir rel=canonical bağlantı etiketi üret ve URL'leri nasıl eşitleyeceğini öğren; arama motorları istediğin tek sürümü indekslesin.",
    intro: [
      "Canonical etiket, aynı içeriğe birkaç adresten — sondaki eğik çizgili ve çizgisiz, sorgu dizgili, UTM parametreli, http/https veya www varyantlı — ulaşılabiliyorsa hangi URL'nin indeksleneceğini arama motorlarına söyler. Doğru yapıldığında, yinelenen URL'leri değeri bölmek yerine tek bir sıralama sinyalinde birleştirir.",
      "Tercih edilen sürümün mutlak URL'sini gir ve etiketi o sayfanın <head> bölümüne kopyala. Kontrol listesi, çoğu uygulamanın yanlış yaptığı eşitleme detaylarını kapsar.",
    ],
    steps: [
      "Tüm siten için tek bir canonical URL biçimi seç: https, www'li veya www'siz sunucu, sondaki eğik çizgi olsun ya da olmasın.",
      "Sayfanın tercih edilen sürümünün mutlak URL'sini yapıştır.",
      "Bağlantı etiketini sayfanın <head> bölümüne kopyala ve URL Denetleme aracıyla doğrula.",
    ],
    faqs: [
      {
        q: "Canonical etiketi gerçekte ne yapar?",
        a: "Yinelenenleri birleştirir: alternatif URL'lerden gelen sinyaller — UTM kopyaları, parametreli sıralamalar, yazdırma görünümleri — canonical URL'de birleşir; değer kopyalara dağılmak yerine onunla sıralanır.",
      },
      {
        q: "Her sayfa kendine bakan bir canonical taşımalı mı?",
        a: "Evet, önerilen varsayılan budur. Benzersiz sayfalar bile kendi URL'lerini canonical olarak bildirmelidir; henüz fark etmediğin parametre, eğik çizgi ve büyük/küçük harf varyantlarına karşı korur.",
      },
      {
        q: "Canonical mi, noindex mi, yönlendirme mi?",
        a: "Yinelenen kullanıcıları başka yere gönderecekse 301 yönlendirme; erişilebilir kalması ama sonuçlarda çıkmaması gerekiyorsa noindex; her iki sürümün de canlı ve taranabilir kalması gerekiyorsa canonical kullan.",
      },
    ],
  },
  "schema-markup-generator": {
    name: "Schema İşaretleme Üretici",
    tagline:
      "Organization, LocalBusiness, Product, Article, FAQPage ve HowTo için geçerli JSON-LD yapılandırılmış verisi üret — kaçışlı ve yapıştırmaya hazır.",
    intro: [
      "Yapılandırılmış veri, arama motorlarının sayfadaki varlıkları anlamasına yardım eder: kim yayımlıyor, ürün ne kadar, hangi soruları cevaplıyor. Bu üretici, en çok kullanılan altı schema.org türü için JSON-LD kurar; boş alanları dışarıda bırakır ve çıktıyı, <script> etiketi içinde güvenli olacak şekilde kaçışlar.",
      "Sayfayla eşleşen türü seç, alanları doldur ve bloğu head veya body'ye yapıştır. Yayınlamadan önce daima bir zengin sonuç doğrulayıcısından geçir — ayrışan ama yönergeleri ihlal eden işaretleme, manuel bir yaptırım kazanabilir.",
    ],
    steps: [
      "Sayfayla eşleşen schema türünü seç.",
      "Alanları doldur — FAQPage ve HowTo için soru veya adım satırları ekleyip çıkarabilirsin.",
      "JSON-LD bloğunu sayfaya kopyala, sonra Google'ın Zengin Sonuç Testi'nden geçir.",
    ],
    faqs: [
      {
        q: "FAQ zengin sonuçları hâlâ var mı?",
        a: "Google artık FAQ zengin sonuçlarını neredeyse yalnızca tanınmış devlet ve sağlık sitelerinde gösteriyor. İşaretleme yine de yayımlanmaya değer: cevap motorları ve AI Overviews, cevap kaynaklarken FAQPage verisini okur ve diğer motorlar hâlâ saygı duyar.",
      },
      {
        q: "JSON-LD mi, Microdata mı?",
        a: "JSON-LD, Google'ın önerdiği biçimdir: tek bir script bloğu, HTML öğelerinde değişiklik yok, üretmesi ve sürdürmesi kolay. Microdata aynı sonuca ulaşır ama işaretlemenin içine serpiştirilir.",
      },
      {
        q: "Geçerli yapılandırılmış veri zengin sonuçları garanti eder mi?",
        a: "Hayır. Geçerlilik, sayfayı bir özelliğe aday yapar; Google görüntüleyip görüntülemeyeceğine sorgu başına ve yüzey başına karar verir. Raporlarda yıldız veya kırıntıyı yalnızca işaretlemeye dayanarak asla vaat etme.",
      },
    ],
  },
  "robots-txt-generator": {
    name: "robots.txt Üretici",
    tagline:
      "YZ tarayıcı engel listeleri veya izin listeleri, bot başına kurallar, crawl-delay ve sitemap yönergeleriyle bir robots.txt kur — sonra kopyala veya indir.",
    intro: [
      "robots.txt, bir sayfa daha getirilmeden tarayıcı erişimini kontrol eder. Klasik User-agent: * kurallarının ötesinde artık bot başına karar veriyorsun: OAI-SearchBot ve PerplexityBot gibi arama yanlı tarayıcılara izin ver, GPTBot, ClaudeBot, Google-Extended, CCBot ve Bytespider gibi eğitim tarayıcılarını engelle ya da kendi politikanı harmanla.",
      "Üretici, aynı kuralı paylaşan user-agent'ları gruplar, desteklendiği yerde crawl-delay ekler ve sitemap yönergeni iliştirir. Dosyayı alan adının köküne /robots.txt olarak kopyala ve Search Console'un robots raporunda doğrula.",
    ],
    steps: [
      "Bir ön ayar seç: hepsine izin ver, YZ eğitim botlarını engelle veya her şeyi engelle.",
      "Her YZ tarayıcısını Allow, Block veya kural yokla ince ayarla; User-agent: * için Disallow yolları ekle.",
      "Sitemap URL'ni ekle, sonra dosyayı site köküne kopyala veya indir.",
    ],
    faqs: [
      {
        q: "robots.txt bir güvenlik kontrolü müdür?",
        a: "Hayır. Danışmansaldır: kurallara uyan tarayıcılar dinler ama herkes okuyabilir — ve özel yollarını reklamını yapar. Hassas alanları kimlik doğrulamayla koru; güvenlik için asla Disallow'a güvenme.",
      },
      {
        q: "YZ tarayıcıları gerçekten robots.txt'ye saygı duyar mı?",
        a: "Belgelenmiş başlıcaları — GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot — robots.txt desteği beyan eder ama uyum gönüllüdür ve işletmeciye göre değişir. Kesin garanti için CDN veya güvenlik duvarı katmanında engelle.",
      },
      {
        q: "Sayfam Disallow'dan sonra neden hâlâ indeksli?",
        a: "Taramayı engellemek, indekslemeyi engellemek değildir: başka sayfalar URL'ye bağlanıyorsa Google içeriği olmadan indekslemeye devam edebilir. Bir sayfayı sonuçlardan çıkarmak için taramaya izin ver ve bunun yerine noindex meta etiketi kullan.",
      },
    ],
  },
  "sitemap-generator": {
    name: "XML Sitemap Üretici",
    tagline:
      "Bir URL listesi yapıştır ve lastmod'lu, bölüm başına changefreq ve priority'li geçerli bir sitemap.xml al — tekilleştirilmiş ve gönderilmeye hazır.",
    intro: [
      "Sitemap, arama motorlarına hangi URL'lerin var olduğunu ve en son ne zaman değiştiğini söyler. Listeni — bir tarayıcı dışa aktarımından, CMS'den veya tablodan — yapıştır; üretici girdileri tekilleştirir, ilk yol segmentine göre gruplar ve dosyayı protokole uygun tutarken gruba göre changefreq ve priority ayarlamanı sağlar.",
      "XML, Google'ın, Bing'in ve Yandex'in kabul ettiği sitemaps.org 0.9 protokolünü izler. Dosyayı indir, /sitemap.xml adresinde barındır ve robots.txt'den referans ver veya doğrudan Search Console'a gönder.",
    ],
    steps: [
      "Her satıra bir mutlak URL yapıştır — dosya başına 50.000 URL / 50 MB sınırına kadar.",
      "lastmod işlemesini ayarla ve mantıklı olduğu yerde bölüm başına changefreq ile priority'yi düzelt.",
      "sitemap.xml'i indir, alan adının köküne yükle ve Search Console'da gönder.",
    ],
    faqs: [
      {
        q: "Changefreq ve priority hâlâ önemli mi?",
        a: "Google ikisini de yok sayar ve kendi planlamasını kullanır; lastmod, belgelenmiş etkisi olan tek etikettir — o da yalnızca doğru olduğunda. Tam bir dosya istiyorsan diğerlerini ayarla ama emeği dürüst lastmod değerlerine harca.",
      },
      {
        q: "Hangi lastmod değerini kullanmalıyım?",
        a: "Sayfa içeriğinin anlamlı biçimde en son değiştiği tarih, W3C Datetime biçiminde (YYYY-MM-DD yeterli). Her URL'ye bugünün tarihini kopyalamak, Google'a lastmod'una güvenmemeyi öğretir.",
      },
      {
        q: "Bir sitemap ne kadar büyük olabilir?",
        a: "Dosya başına 50.000 URL veya sıkıştırılmamış 50 MB. Ötesinde birden çok sitemap'a böl ve bir sitemap indeks dosyasında listele, sonra indeksi gönder.",
      },
    ],
  },
  "serp-preview": {
    name: "SERP Önizleme",
    tagline:
      "Google snippet'ini masaüstü ve mobilde piksel düzeyinde kesme ve başlık-açıklama uzunluk ölçerleriyle önizle.",
    intro: [
      "Google başlıkları ve açıklamaları karakter sayısına değil, ölçülen piksel genişliğine göre keser — geniş harflerle dolu bir başlık, aynı sayıda dar harften daha erken kesilir. Bu önizleme, metnini sonuç sayfasının ölçtüğü gibi ölçer ve tam olarak Google'ın keseceği yerde keser.",
      "Masaüstü ve mobil piksel bütçeleri arasında geçiş yap, ölçerleri izle ve mesajın tamamının kesmeden sağ çıkması için metni ayarla.",
    ],
    steps: [
      "Title etiketini, meta açıklamayı ve sayfa URL'sini gir.",
      "Kesilme noktalarını karşılaştırmak için masaüstü ve mobil arasında geçiş yap.",
      "Başlık ve açıklama piksel bütçesine sığana dek metni ayarla.",
    ],
    faqs: [
      {
        q: "Google kesmeden önce başlık ne kadar uzun olabilir?",
        a: "Masaüstünde kabaca 580–600 piksel, tipik olarak 50–60 karakter; mobil biraz daha fazla genişlik verir. Gerçek sınır piksel ölçüsüdür — harflerin genişliği farklı olduğu için karakter sayıları yalnızca kaba bir yol göstericidir.",
      },
      {
        q: "Google meta açıklamamı her zaman gösterir mi?",
        a: "Hayır. Google, sorguların büyük bir kısmı için açıklamaları yeniden yazar; genellikle aranan terimlere uydurmak için. Doğru ve spesifik bir açıklama, senin metninin aynen kullanılma ihtimalini artırır.",
      },
      {
        q: "Google başlığımı neden değiştirsin?",
        a: "Başka bir dizginin sorguya daha iyi uyduğunu düşünürse Google, H1'i, iç bağlantıların bağlantı metnini veya site adını koyabilir. Önizleme en iyi durumu gösterir: kendi etiketlerin, değişmeden.",
      },
    ],
  },
  "keyword-density-checker": {
    name: "Anahtar Kelime Yoğunluğu Kontrolü",
    tagline:
      "1–3 kelimelik anahtar öbeklerini ve yoğunluklarını say — İngilizce, Çince, Japonca, İspanyolca ve Portekizce için yerleşik dolgu kelime listeleriyle.",
    intro: [
      "Anahtar kelime yoğunluğu, bir öbekin sayfadaki tüm kelimeler içindeki payıdır. Bu kontrol aracı metnini parçalara ayırır, dile göre dolgu kelimeleri ayıklar ve bir, iki ve üç kelimelik öbekler için sayım ve yoğunluk raporlar — canlı, yapıştırırken veya düzenlerken.",
      "Sayfanın sıralanmasını istediğin şeyi gerçekten söylediğini doğrulamak için kullan; sihirli bir yüzdenin peşine düşmek için değil. Konuyu kapsarken doğal okunan metin, herhangi bir sabit oranı yener.",
    ],
    steps: [
      "Sayfa metnini veya bir taslağı girdi kutusuna yapıştır.",
      "İçerik dilini ve dolgu kelimelerin hariç tutulup tutulmayacağını seç.",
      "1–3 kelimelik öbeklerin sayımını ve yoğunluğunu oku ya da belirli bir terimi kontrol etmek için ara.",
    ],
    faqs: [
      {
        q: "Hangi anahtar kelime yoğunluğunu hedeflemeliyim?",
        a: "Belirli bir hedef yok. Modern sıralama sistemleri yoğunluk eşikleri değil, gömmeler ve konu modelleri kullanır. Üst öbekler, sayfanın konusunu doğal dilde yansıtıyorsa — ana terim için kabaca %1–2 — iyisin.",
      },
      {
        q: "Dolgu kelimeleri sayımdan önce çıkarılıyor mu?",
        a: "Yalnızca etkinleştirirsen. Çıkarmak 'hotel in london'ü bir bigram olarak 'hotel london'e çevirir; insanlar çoğu zaman gerçekte böyle arar. Karar vermeden önce iki görünümü karşılaştır.",
      },
      {
        q: "Çince ve Japonca nasıl sayılır?",
        a: "Gerçek bir segmenter olmadan CJK metni, tek tokenler için karakter başına, iki kelimelik öbekler için karakter çifti başına sayılır — aşırı kullanılan terimleri yakalamak için iyi bir yaklaşımdır, dilsel bir analiz değildir.",
      },
    ],
  },
  "hreflang-generator": {
    name: "hreflang Üretici",
    tagline:
      "Çevrilmiş URL'lerinden eksiksiz bir hreflang bağlantı kümesi kur — dil başına bir bağlantı artı x-default; tutarlı ve çift yönlü.",
    intro: [
      "hreflang, arama motorlarına her dilin konuşanlarına hangi URL'nin sunulacağını söyler; birbirine çok benzeyen çevirilerin rekabet etmesini önler. Kümeler çift yönlüdür: her yerelleştirilmiş sayfa, kendine geri referans dahil, tam seti geri döndürmek zorundadır.",
      "Her dil sürümünün URL'sini gir; üretici, dil seçicini veya varsayılan dil ana sayfanı işaret etmesi gereken x-default ile birlikte tam <link rel=\"alternate\"> kümesini verir.",
    ],
    steps: [
      "Her çevrilmiş sürümün mutlak URL'sini yapıştır; olmadığın dilleri boş bırak.",
      "x-default URL'sini ayarla — dil seçicin veya varsayılan ana sayfan.",
      "Kümeyi, setteki her sayfanın <head> bölümüne kopyala.",
    ],
    faqs: [
      {
        q: "Her sayfa tam hreflang setini taşımak zorunda mı?",
        a: "Evet. Kümeler karşılıklı olmalıdır: A sayfası B'yi ve kendini listeler, B de A'yı ve kendini. Eksik üyeli bir küme kısmen yok sayılır ve emek boşa gider.",
      },
      {
        q: "zh mi, zh-Hans mı kullanmalıyım?",
        a: "Basitleştirilmiş için zh-Hans'ı, geleneksel için zh-Hant'ı tercih et; çıplak zh yazı sistemini tanımsız bırakır. pt-BR gibi bölge alt etiketleri isteğe bağlıdır — önce dili hedefle ve bölgeyi yalnızca içerik gerçekten farklıysa ekle; pt-BR ile pt-PT gibi.",
      },
      {
        q: "hreflang, canonical etiketinin yerini alır mı?",
        a: "Hayır. Her dil sürümü kendi kendine bakan canonical'ını yine taşımak zorundadır. hreflang, eşdeğer çevrilmiş sayfalar arasında seçer; canonical tek dil içindeki yinelenenleri çözer.",
      },
    ],
  },
  "utm-builder": {
    name: "UTM Bağlantı Oluşturucu",
    tagline:
      "Herhangi bir URL'ye utm_source, medium, campaign, term ve content ekle; doğru kodlanmış bir takip bağlantısı al, kopyala veya paylaş.",
    intro: [
      "UTM parametreleri, analiz platformlarının trafiği atfedken okuduğu sorgu dizgeleridir: source, medium, campaign, term ve content. Bu oluşturucu bunları URL'ne doğru yüzde kodlamasıyla ekler; boşluklar ve özel karakterler reklam platformlarından, QR kodlarından ve e-posta istemcilerinden sağ çıkarır.",
      "Bağlantı kurmadan önce adlandırma kurallarında anlaş — küçük harf, tire, kampanya adlarında tarih yok — yoksa raporların neredeyse aynı kopya kampanyalara bölünür.",
    ],
    steps: [
      "Hedef URL'yi yapıştır.",
      "Önce source ve medium'u, sonra campaign'i ve isteğe bağlı term/content alanlarını doldur.",
      "Etiketli URL'yi reklamına, bültenine veya sosyal gönderine kopyala.",
    ],
    faqs: [
      {
        q: "Hangi UTM parametreleri zorunlu?",
        a: "utm_source ve utm_medium, analiz araçlarının dayandığı parametrelerdir: source yönlendireni, medium kanalı adlandırır (cpc, email, social). utm_campaign güçle önerilir; utm_id, utm_term ve utm_content isteğe bağlıdır.",
      },
      {
        q: "UTM parametreleri SEO'ya zarar verir mi?",
        a: "Doğru ele alınırsa hayır. Tarayıcılar etiketli URL'leri yinelenen sayabilir; kendine bakan canonical tam olarak bunu çözer — canonical üreticisinin bu araçla iyi eşleşmesinin nedeni budur.",
      },
      {
        q: "UTM değerlerinde büyük/küçük harf önemli mi?",
        a: "Evet — utm_campaign=Spring ile utm_campaign=spring, çoğu analiz aracında iki ayrı kampanya sayılır. Küçük harfe standartlaş; raporların temiz kalır.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* Güvenlik                                                            */
  /* ------------------------------------------------------------------ */
  "password-generator": {
    name: "Şifre Üretici",
    tagline:
      "Canlı entropi tahminleriyle güçlü şifreler ve parola cümleleri tarayıcında üret — kripto sınıfı rastgelelik, hiçbir şey gönderilmez veya saklanmaz.",
    intro: [
      "Zayıf ve tekrar kullanılan şifreler, hesap ele geçirmelerin çoğuna yol açar. Bu üretici şifreleri tarayıcının kriptografik rastgele sayı üreteciyle (crypto.getRandomValues) oluşturur — şifreleme anahtarlarında kullanılan kaynağın aynısı — her karakter eşit dağılmış rastgele ve öngörülemezdir.",
      "Klasik rastgele bir şifre ya da 256 kelimelik bir listeden kurulan akılda kalıcı bir parola cümlesi seç; uzunluğu ve karakter setlerini ayarla ve entropi göstergesini bit olarak izle. Her şey yerel çalışır: şifre asla iletilmez, günlüğe yazılmaz, saklanmaz.",
    ],
    steps: [
      "Rastgele karakterler için Password, yazması kolay kelimeler için Passphrase seç.",
      "Uzunluk kaydırıcısını ayarla ve karakter setlerini aç/kapat; şifreyi sesli okuyacaksan veya telefonda yazacaksan benzeyen karakterleri hariç tut.",
      "Entropi göstergesini kontrol et — 80 bit veya üzeri her hesap için mükemmeldir.",
      "Kopyala düğmesine tıkla ve sonucu doğrudan kayıt veya şifre değiştirme formuna yapıştır.",
    ],
    faqs: [
      {
        q: "Şifrede daha önemli olan nedir: uzunluk mu karmaşıklık mı?",
        a: "Uzunluk. Entropi her ek karakterle büyür — karakter başına kabaca karakter havuzu boyutunun log2'si. 70 karakterlik bir havuz üzerinde 16 karakterli rastgele bir şifre yaklaşık 98 bit entropi taşır; her simge türüyle dolu kısa bir şifreden çok daha fazla. 5+ rastgele kelimelik bir parola cümlesi de çoğu 8 karakterli şifreyi yener.",
      },
      {
        q: "Bu şifreler gerçekten rastgele mi?",
        a: "Evet. crypto.getRandomValues'dan, yani tarayıcının kriptografik olarak güvenli rastgele kaynağından gelirler — Math.random() değil. Benzeyenleri hariç tut seçeneği yalnızca l, I, 1, O ve 0 gibi benzer karakterleri çıkarır; geri kalanın rastgeleliğini asla zayıflatmaz.",
      },
      {
        q: "Burada ürettiğim bir şifreyi geri kazanabilir miyim?",
        a: "Hayır. Üretim tamamen tarayıcının belleğinde olur. Hiçbir şey yüklenmez, günlüğe yazılmaz, saklanmaz — sayfayı yenilediğinde şifre sonsuza dek gider; hemen bir şifre yöneticisine kaydet.",
      },
    ],
  },
  "password-strength": {
    name: "Şifre Gücü Kontrolü",
    tagline:
      "Bir şifrenin gerçekte ne kadar güçlü olduğunu gör: zxcvbn puanlaması, gerçekçi kırılma süresi tahminleri ve somut düzeltmeler — hepsi yerel hesaplanır, asla yüklenmez.",
    intro: [
      "Çoğu ölçer yalnızca karakter sınıflarını sayar. Bu kontrol aracı, gerçek sızıntı verisi ve desen analizinden kurulan zxcvbn algoritmasını çalıştırır; klavye geçişlerini, yinelenen parçaları, tarihleri, l33t değişimlerini ve bilinen sızıntılarda geçen şifreleri yakalar.",
      "0–4 arası bir puan, üç saldırı senaryosu altında tahmini kırılma süreleri ve spesifik öneriler alırsın. Her şey tarayıcında hesaplanır: yazdığın şifre asla cihazından çıkmaz.",
    ],
    steps: [
      "Şifreyi kutuya yaz veya yapıştır — okumak istersen Göster'i kullan.",
      "Düzenlerken puan ölçerinin Çok zayıf'tan Çok güçlü'ye hareketini izle.",
      "Neye dayandığını anlamak için kırılma süresi tablosunu oku: kısıtlı online tahmin, yavaş hash'lere karşı offline saldırı ve hızlı hash'lere karşı offline saldırı.",
      "Önerileri uygula — genellikle birkaç rastgele kelime eklemek en hızlı kazançtır.",
    ],
    faqs: [
      {
        q: "Üç kırılma süresi senaryosu ne demek?",
        a: "Farklı saldırganları modeller. Online, kısıtlı (saatte 100 tahmin) denemeleri sınırlayan bir giriş formudur. Offline, yavaş hash, bcrypt ile hash'lenmiş ve saniyede 10.000 tahminle kırılan bir veritabanı varsayar. Offline, hızlı hash, GPU'larda saniyede milyarlarca tahminle kırılan zayıf veya tuzsuz MD5/SHA-1 hash'leri varsayar — tekrar kullanılan her şifre için en kötü durum.",
      },
      {
        q: "“Tr0ub4dor&3” karmaşık görünürken neden kötü puan alıyor?",
        a: "Çünkü o için 0, e için 3 gibi değişimler, kırma sözlüklerinin ilk denediği şeydir. zxcvbn bu l33t kurallarını modeller; sembollere kanmak yerine altta yatan deseni — süsle eklenmiş “troubador” — puanlar.",
      },
      {
        q: "Şifrem bir yere gönderiliyor mu?",
        a: "Hayır. zxcvbn kütüphaneleri ve sözlükleri tarayıcına yüklenir ve her hesaplama yerel çalışır. Girdini taşıyan hiçbir ağ isteği yoktur.",
      },
    ],
  },
  "email-validator": {
    name: "E-posta Doğrulayıcı",
    tagline:
      "E-postanın biçimini yerel olarak kontrol et ve alan adının canlı MX sorgusuyla posta alabildiğini doğrula; yazım hatası algılama dahil — ücretsiz, anında, kayıt yok.",
    intro: [
      "Sözdizimsel olarak geçerli bir adres, alan adının posta sunucusu yoksa yine de geri dönebilir. Bu doğrulayıcı önce biçimi tamamen tarayıcında kontrol eder — uzunluk, karakterler, nokta yerleşimi ve alan adı etiketleri — sonra alan adının gerçekten MX (posta değişimi) kaydı yayımlayıp yayımlamadığını görmek için HTTPS üzerinden canlı DNS sorgusu yapar.",
      "Alan adını en yaygın sağlayıcıların listesiyle karşılaştırır ve gmial.com gibi muhtemel yazım hatalarını işaretler. Ağ üzerinden yalnızca alan adı kısmı gönderilir; @ işaretinden önceki kısım asla tarayıcıdan çıkmaz.",
    ],
    steps: [
      "Adresi alana yaz veya yapıştır ve Doğrula'ya bas.",
      "Sözdizimi satırını oku: bozuk yerel kısımları, ikilenmiş noktaları ve geçersiz alan adlarını hiç ağ çağrısı olmadan yakalar.",
      "Alan adının e-posta alabildiğine dair kanıt için Posta sunucuları satırını kontrol et — MX kaydı olmayan birkaç alan adı A kaydıyla yine de posta kabul eder; araç bunu da belirtir.",
      "Bir yazım hatası önerildiyse alan adını düzelt ve yeniden doğrula.",
    ],
    faqs: [
      {
        q: "Bu, posta kutusunun kendisinin var olup olmadığını kontrol eder mi?",
        a: "Hayır. Posta sunucuları genellikle belirli bir kutunun gerçek olup olmadığını açıklamaz (ve sorgulamak müdahaleci olurdu). Bu araç, çoğu doğrulama akışının gerçekte ihtiyaç duyduğu şeyi doğrular: biçimi ve alan adının posta alacak şekilde yapılandırıldığını. Dolu veya terk edilmiş kutular yine de geri dönebilir.",
      },
      {
        q: "Ağ üzerinden tam olarak ne gönderilir?",
        a: "Yalnızca alan adı — @'den sonraki kısım — Google'ın herkese açık çözücüsüne (dns.google) HTTPS üzerinden yapılan bir DNS sorgusunda. Tam adres ve @'den önceki her şey tarayıcında kalır.",
      },
      {
        q: "Geçerli bir adres neden MX kontrolünden kaldı?",
        a: "Birkaç alan adı MX kaydı yayımlamaz ve A kaydına güvenir (örtük yönlendirme); araç durum böyleyken bunu söyler. Diğerleri “burada posta yok” diyen boş bir MX yayımlar. Kurumsal veya çok yeni alan adları da bir süre herkese açık çözücü önbelleklerinde olmayabilir — bir dakika sonra tekrar dene.",
      },
    ],
  },
  "dns-lookup": {
    name: "DNS Sorgulama",
    tagline:
      "Herhangi bir alan adının A, AAAA, MX, TXT, NS ve CNAME kayıtlarını DNS-over-HTTPS ile temiz bir tabloda sorgula — terminal veya dig komutu gerekmez.",
    intro: [
      "DNS kayıtları, bir alan adının nereye işaret ettiğini, e-postayı nasıl gönderdiğini ve sahipliği nasıl kanıtladığını söyler. Bu araç herhangi bir kayıt türünü DNS-over-HTTPS (DoH) üzerinden — modern tarayıcıların kullandığı şifreli kanalın aynısı — çözer ve cevapları okunabilir bir tabloya dizer.",
      "Google'ın ücretsiz herkese açık çözücüsü üzerinde çalışır; kurulacak bir şey ve API anahtarı yoktur. Bir değişiklikten sonra yayılımı kontrol etmek, SPF/DKIM/DMARC TXT kayıtlarını doğrulamak veya bir alan adına giden postanın neden geri döndüğünü ayıklamak için pratik.",
    ],
    steps: [
      "Alan adını yaz (example.com, http:// gerekmez) ve bir kayıt türü seç.",
      "Sorgula'ya bas; sorgu, şifreli DoH ile herkese açık çözücüye gider.",
      "Tabloyu oku: her satır kayıt türünü, TTL'yi ve değeri gösterir — A/AAAA için bir IP, MX için öncelikli bir posta sunucusu.",
      "Tam resmi görmek için kayıt türleri arasında geçiş yap: posta için MX, SPF/DKIM için TXT, DNS'i kimin yönettiğini görmek için NS.",
    ],
    faqs: [
      {
        q: "Başlıca kayıt türleri ne işe yarar?",
        a: "A bir adı IPv4 adresine, AAAA IPv6'ya eşler. MX posta sunucularını ve önceliklerini listeler. TXT serbest metin tutar — genellikle SPF, DKIM ve DMARC politikaları. NS yetkili ad sunucularını adlandırır. CNAME bir adı başka bir adın takma adı yapar. Her biri aynı alan adı hakkında farklı bir soruya cevap verir.",
      },
      {
        q: "Ağ üzerinden ne gönderilir?",
        a: "Alan adı ve kayıt türü, dns.google'a tek bir DNS-over-HTTPS sorgusunda; her HTTPS isteği gibi şifreli. Hakkında hiçbir şey eklenmez ve API anahtarı ya da hesap devreye girmez.",
      },
      {
        q: "A sorduğumda bazen neden CNAME satırları görüyorum?",
        a: "Çözücüler zincirin tamamını içerir: www.example.com, example.com'a bir CNAME ise A sorgusu takma adı ve son A kaydını birlikte döndürür. Ek satırlar, adın tam olarak nasıl çözüldüğünü gösterir.",
      },
    ],
  },
  "ip-lookup": {
    name: "IP Sorgulama",
    tagline:
      "Herhangi bir IP adresinin ülkesini, şehrini, ISS'sini ve ASN'sini saniyeler içinde bul — ya da kendi IP'ni kontrol et; anahtarsız ücretsiz API, tamamen tarayıcında.",
    intro: [
      "İnternetteki her cihaz, nerede olduğunu ve kimin yönlendirdiğini ima eden bir IP adresi taşır. Herhangi bir IPv4 veya IPv6 adresi gir; ülkesini ve bölgesini, şehrini, ağ işleticisini (ISS), kuruluşu ve otonom sistem numarasını (ASN), artı saat dilimini ve yaklaşık koordinatları gör.",
      "Veri, HTTPS üzerinden anahtarsız ve ücretsiz ipwho.is veritabanından gelir; kayıt yok, izlenecek kota yok. Tek dokunuş kendi bağlantını kontrol eder; VPN'in görünür konumunu gerçekten değiştirdiğini onaylamak için pratik.",
    ],
    steps: [
      "Alana bir IP yapıştır ya da kendi bağlantını incelemek için IP'mi kullan'a bas.",
      "Sorgula'ya bas; adres, HTTPS üzerinden ipwho.is API'sine gönderilir.",
      "Sonuçları oku: önce konum, sonra ISS, kuruluş ve ASN gibi ağ detayları.",
      "VPN sunucusu değişikliğinin işlediğini onaylamak için kendi IP'nin sonuçlarını değişiklikten önce ve sonra karşılaştır.",
    ],
    faqs: [
      {
        q: "Konum ne kadar doğru?",
        a: "Ülke ve bölge genellikle doğrudur; şehir ve koordinatlar, ISS'nin adres bloğunu nereye kaydettiğine dayalı tahminlerdir; mobil ve VPN adresleri kilometrelerce sapabilir. Sonuçları bir kişinin adresi değil, ağ düzeyi bilgi olarak gör.",
      },
      {
        q: "ASN bana ne söyler?",
        a: "Otonom sistem numarası, IP bloğuna sahip ağ işleticisini tanımlar — ISS, bir barındırma şirketi veya büyük bir kuruluş. Aynı ASN'ye sahip iki IP neredeyse kesin aynı ağa aittir; barındırma aralıklarını ve kötüye kullanım raporlarını ayırt etmek için kullanışlıdır.",
      },
      {
        q: "Ağ üzerinden ne gönderilir?",
        a: "Yalnızca sorgulamak istediğin IP, ipwho.is'e HTTPS isteğinde. Kendi IP'ni sorgulamak, adresini o API'ye açmayı gerektirir — herhangi bir coğrafi konum servisinin göreceğiyle aynı.",
      },
    ],
  },
  "whois-lookup": {
    name: "WHOIS Sorgulama",
    tagline:
      "Alan adı kayıt verilerini RDAP ile kontrol et — kayıt kuruluşu, oluşturma ve bitiş tarihleri, durum kodları ve ad sunucuları — TLD kapsamı üzerine net notlarla.",
    intro: [
      "Kayıt kayıtları, bir alan adının vitrininin sakladığı soruları cevaplar: kim yönetiyor, ne zaman kuruldu ve ne zaman bitiyor. Bu araç, modern RDAP protokolünü — port-43 WHOIS'in resmî halefini — HTTPS üzerinden sorgular ve cevabı tarihler, kayıt kuruluşu, durum kodları ve ad sunucularına düzenler.",
      "rdap.org, sorgunu kayıt otoritesinin resmî RDAP sunucusuna yönlendirir. Kapsam geniş ama evrensel değil: çoğu ülke kodu kayıt otoritesi (.cn, .de, .br…) hâlâ herkese açık RDAP sunucusu yoktur ve araç, bir TLD kapsanmadığında boş alanlar göstermek yerine bunu açıkça söyler.",
    ],
    steps: [
      "Araştırdığın alan adını gir (example.com) ve Sorgula'ya bas.",
      "Önce tarihleri oku: oluşturma ve bitiş, alan adının yaşını ve yenileme alışkanlıklarını ele verir.",
      "Kayıt kuruluşunu ve durum kodlarını kontrol et — clientTransferProhibited transfer kilidi demektir, redemptionPeriod alan adının yakında düşebileceğini ima eder.",
      "Alan adının DNS'ini gerçekte kimin işlettiğini görmek için ad sunucularına göz at.",
    ],
    faqs: [
      {
        q: "Klasik WHOIS yerine neden RDAP?",
        a: "RDAP, eski bir port üzerinden yapılandırılmamış metin yerine HTTPS üzerinden yapılandırılmış JSON döndürür. Kimlik doğrulamayı, hız sınırını ve uluslararasılaşmış alan adlarını destekler ve ICANN tüm gTLD kayıt otoriteleri için bunu zorunlu kılar. Bu araç, TLD'yi işleten kayıt otoritesine rdap.org'un yönlendirmelerini izler.",
      },
      {
        q: "Bazı TLD'ler neden “kapsanmıyor” hatası veriyor?",
        a: "Her kayıt otoritesi, herkese açık bir RDAP servisi işletip işletmeyeceğini kendisi seçer. Neredeyse tüm genel TLD'ler (.com, .net, .app…) işletir ama birçok ülke kodu — .cn, .de, .br ve diğerleri — hâlâ işletmez. rdap.org bir TLD için sunucu bulamadığında araç boş bir sonuç yerine net bir açıklama gösterir.",
      },
      {
        q: "Ağ üzerinden ne gönderilir?",
        a: "Yalnızca alan adı, rdap.org'a HTTPS isteğinde; o da kayıt otoritesinin resmî RDAP uç noktasına yönlendirebilir. Kayıt verisi tasarım gereği herkese açıktır; hakkında kişisel hiçbir şey iletilmez.",
      },
    ],
  },
  "random-number": {
    name: "Rastgele Sayı Üretici",
    tagline:
      "Herhangi bir aralıktan gerçekten rastgele sayılar üret — tekli, toplu veya tekilleştirilmiş çekilişler; tarayıcının kriptografik rastgele sayı üreteciyle.",
    intro: [
      "Math.random() oyunlar için iyidir ama yanlı ve öngörülebilirdir. Bu üretici, tarayıcının kriptografik rastgele kaynağı crypto.getRandomValues'dan çeker; modül yanlılığını kaldıran reddetme örneklemesiyle — aralıktaki her sayının ihtimali eşittir.",
      "Sınırlar arasında tek bir sayı, bütün bir yığın veya tekrarsız çekilişler çiz; sonuçları artan sırala ya da çekiliş sırasını koru. Araç ayrıca çekilişin toplam entropisini bit olarak gösterir; bir hediyenin adil olduğunu kanıtlarsın.",
    ],
    steps: [
      "Minimumu ve maksimumu ayarla (ikisi de dâhil, negatifler memnuniyetle).",
      "Kaç sayıya ihtiyacın olduğunu seç ve tekrarlar çekilişi bozacaksa tekilleştirilmiş çekilişi aç/kapat.",
      "Sıralı sonuçlar için artan sıralamayı etkinleştir ya da çekiliş sırasını korumak için kapalı bırak.",
      "Listeyi doğrudan tablona veya çekiliş duyuruna kopyala.",
    ],
    faqs: [
      {
        q: "Hediyeler ve piyangolar için uygun mu?",
        a: "Evet. Sayılar, yansız bir reddetme örneklemesi adımıyla tarayıcının kriptografik rastgele sayı üreticinden gelir; aralıktaki her değerin olasılığı aynıdır. Entropi göstergesi, çekilişe tam olarak ne kadar rastgelelik girdiğini gösterir.",
      },
      {
        q: "Aralık küçükken “tekrar yok” ne yapar?",
        a: "Yerine koymadan çizmeye geçer — bir kâseden numaralı toplar çekmek gibi. Aralığın içerdiğinden fazla tekil sayı istersen araç, yanlı bir sonuç döndürmek yerine çelişkiyi açıklar.",
      },
      {
        q: "Sayılar bir yere kaydediliyor mu?",
        a: "Hayır. Her şey tarayıcının belleğinde crypto.getRandomValues'dan hesaplanır; sayfayı yenilemek sonuçları siler ve hiçbir şey asla yüklenmez.",
      },
    ],
  },
  "totp-generator": {
    name: "TOTP Üretici",
    tagline:
      "Herhangi bir TOTP sırrından çevrimdışı 2FA kodları üret — RFC 6238, 6 veya 8 haneli, canlı 30 saniyelik geri sayım. Sırrın asla tarayıcıdan çıkmaz.",
    intro: [
      "Doğrulayıcı kodları telefonundaki bir uygulamaya muhtaç değildir. Bir base32 sırrı yapıştır (veya eski doğrulayıcından tüm otpauth:// kurulum bağlantısını) ve bu araç, herhangi bir RFC 6238 doğrulayıcısıyla aynı dönen 6 veya 8 haneli kodları, sonraki koda canlı geri sayımla hesaplar.",
      "Her şey WebCrypto'nun HMAC'iyle yerel hesaplanır — hiçbir ağ çağrısı yoktur. Sır yalnızca tarayıcı belleğinde kalır; kayıp bir telefon asla kayıp bir ikinci adım demek değildir.",
    ],
    steps: [
      "Base32 sırrını servisin 2FA kurulum sayfasından kopyala (veya otpauth:// bağlantısını yapıştır).",
      "Servisin gösterdiği ayarları eşle: 6 veya 8 hane, 30 veya 60 saniyelik periyot, aksi söylenmedikçe SHA-1.",
      "Geri sayım bitmeden geçerli kodu servise yaz — ya da tek tıkla kopyala.",
      "Tekrarlayan girişler için sekmeyi açık tut; kodlar her periyotta otomatik yenilenir.",
    ],
    faqs: [
      {
        q: "Çevrimdışı bir doğrulayıcı SMS kodlarından daha güvenli mi?",
        a: "Evet, iki yönden. TOTP kodları cihazında hesaplanır ve telefon ağından asla geçmez; SIM-takma saldırganlarının önleyeceği bir şey yoktur. Ayrıca 30 saniyede bir biter ve sırrın kendisinin elinde olmasını gerektirir; sır hiçbir mesajda görünmez.",
      },
      {
        q: "Sırrım nerede saklanıyor?",
        a: "Hiçbir yerde. Bu sekmenin belleğindeki bir değişkende tutulur ve WebCrypto tarafından zaman sayaçlarını imzalamak için kullanılır. localStorage'a, çerezlere veya herhangi bir sunucuya hiçbir şey yazılmaz — sekmeyi kapat, gitti.",
      },
      {
        q: "Kodum neden eşleşmiyor?",
        a: "En yaygın nedenler: yanlış algoritma (çoğu servis SHA-1 kullanır), yanlış periyot veya birkaç saniyeden fazla kaymış bir cihaz saati. Üç seçiciyi servisin kurulum sayfasıyla karşılaştır ve sistem saatini eşitle.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* Birim dönüştürücüler (fabrika ile üretilen araçlar)                 */
  /* ------------------------------------------------------------------ */
  "length-converter": {
    name: "Uzunluk Dönüştürücü",
    tagline:
      "Uzunluğu ve mesafeyi anında dönüştür: metre, feet, inç, mil, santimetre ve dahası — doğrudan tarayıcında.",
    intro: [
      "Metrik ve imparatorluk uzunluk birimleri arasında, arama kutusuna bir şey yazmadan geçiş yap. Herhangi bir miktar gir; metre, feet, inç, mil ve diğer tüm birimleri aynı anda gör.",
      "Kendi elinle yaptığın projelerde, seyahat planlamasında, mühendislik çizimlerinde ve okul ödevlerinde kullanışlıdır — hızlı ve kesin bir dönüşümün tahminden iyi olduğu her yerde.",
      "10 birim destekler — kilometre, metre, santimetre, milimetre, mikrometre, mil ve daha fazlası. Her şey tarayıcında hesaplanır, çevrimdışı çalışır ve verilerin hiçbir sunucuya dokunmaz.",
    ],
    steps: [
      "Dönüştürmek istediğin miktarı yaz.",
      "Kaynak birimi ve hedef birimi seç.",
      "Sonuç yazdıkça güncellenir — tüm birimleri aynı anda görmek için aşağıdaki tabloya bak ya da sonucu kopyala.",
    ],
    faqs: [
      {
        q: "Bir inç kaç santimetredir?",
        a: "Bir inç, 1959'dan beri yürürlükte olan uluslararası anlaşmayla tam olarak 2,54 santimetredir. Doğrulamak için yukarıya 1 inç → cm yaz.",
      },
      {
        q: "Bu dönüştürücü ücretsiz mi?",
        a: "Evet — tamamen tarayıcında çalışır. Sınır yok, sonuçlarda reklam yok, kayıt yok.",
      },
      {
        q: "Dönüşümler ne kadar doğru?",
        a: "Dönüşüm çarpanları uluslararası standart tanımları (SI ve NIST) izler. Sonuçlar 8 anlamlı basamağa kadar gösterilir.",
      },
    ],
  },
  "weight-converter": {
    name: "Ağırlık Dönüştürücü",
    tagline:
      "Kilogram, pound, ons, stone ve gramı anında dönüştür — ücretsiz, gizli ve çevrimdışı çalışır.",
    intro: [
      "Metrik ve imparatorluk ağırlık birimleri arasında tek yerden geçiş yap: kilogram, pound, ons, stone, karat ve dahası, yazdıkça yeniden hesaplanır.",
      "Yabancı tariflerle yemek yaparken, bagaj sınırlarını kontrol ederken, salon antrenman kayıtlarında ve kargo hesaplarında işine yarar.",
      "8 birim destekler — metrik ton, kilogram, gram, miligram, pound, ons ve daha fazlası. Her şey tarayıcında hesaplanır, çevrimdışı çalışır ve verilerin hiçbir sunucuya dokunmaz.",
    ],
    steps: [
      "Dönüştürmek istediğin miktarı yaz.",
      "Kaynak birimi ve hedef birimi seç.",
      "Sonuç yazdıkça güncellenir — tüm birimleri aynı anda görmek için aşağıdaki tabloya bak ya da sonucu kopyala.",
    ],
    faqs: [
      {
        q: "1 kg kaç pounddur?",
        a: "Bir kilogram 2,20462 pounddur (1 lb tam olarak 0,45359237 kg). Görmek için yukarıya 1 kg → lb yaz.",
      },
      {
        q: "Bir stone kaç kilogramdır?",
        a: "Bir stone (İngiltere'de vücut ağırlığı için kullanılır) 6,35029318 kilogramdır — tam olarak 14 pound.",
      },
      {
        q: "Bu dönüştürücü ücretsiz mi?",
        a: "Evet — tamamen tarayıcında çalışır. Sınır yok, sonuçlarda reklam yok, kayıt yok.",
      },
      {
        q: "Dönüşümler ne kadar doğru?",
        a: "Dönüşüm çarpanları uluslararası standart tanımları (SI ve NIST) izler. Sonuçlar 8 anlamlı basamağa kadar gösterilir.",
      },
    ],
  },
  "temperature-converter": {
    name: "Sıcaklık Dönüştürücü",
    tagline:
      "Celsius'tan Fahrenheit'e ve Kelvin'e, anında. Canlı sonuçlar artı donma ve kaynama referans noktaları.",
    intro: [
      "Celsius, Fahrenheit ve Kelvin'i tek adımda dönüştür. Doğrusal birimlerin aksine sıcaklık ölçekleri ofsetli formüller gerektirir — bu araç onları, eksi değerler dahil, doğru uygular.",
      "Yabancı fırın ayarlı tarifler, hava durumu raporları, laboratuvar işleri ve HVAC spesifikasyonları için iyidir.",
      "3 birim destekler — Celsius, Fahrenheit, Kelvin. Her şey tarayıcında hesaplanır, çevrimdışı çalışır ve verilerin hiçbir sunucuya dokunmaz.",
    ],
    steps: [
      "Dönüştürmek istediğin miktarı yaz.",
      "Kaynak birimi ve hedef birimi seç.",
      "Sonuç yazdıkça güncellenir — tüm birimleri aynı anda görmek için aşağıdaki tabloya bak ya da sonucu kopyala.",
    ],
    faqs: [
      {
        q: "Celsius'u Fahrenheit'e nasıl çeviririm?",
        a: "9 ile çarp, 5'e böl, sonra 32 ekle: °F = °C × 9⁄5 + 32. Örneğin 20 °C = 68 °F. Araç bunu senin için yapar ve Kelvin'i de gösterir.",
      },
      {
        q: "Fahrenheit ve Celsius hangi sıcaklıkta eşittir?",
        a: "−40 derecede: −40 °C = −40 °F. Görmek için −40 gir ve birimleri değiştir.",
      },
      {
        q: "Bu dönüştürücü ücretsiz mi?",
        a: "Evet — tamamen tarayıcında çalışır. Sınır yok, sonuçlarda reklam yok, kayıt yok.",
      },
      {
        q: "Dönüşümler ne kadar doğru?",
        a: "Dönüşüm çarpanları uluslararası standart tanımları (SI ve NIST) izler. Sonuçlar 8 anlamlı basamağa kadar gösterilir.",
      },
    ],
  },
  "data-converter": {
    name: "Veri Boyutu Dönüştürücü",
    tagline:
      "Byte, KB, MB, GB ve TB'yi dönüştür — ondalık (1000) ve ikili (1024) gelenekleri yan yana, net biçimde ayrıştırılmış.",
    intro: [
      "Dijital depolama birimlerini ondalık/ikili ayrımı açıkça yapılarak dönüştür: KB 1000 byte, KiB 1024 byte demektir. “Diskim neden vaat edildiğinden küçük” kafası karışıklığının çoğu, bu ikisinin karıştırılmasından gelir.",
      "İndirme boyutlarını, disk kullanımını, bellek özelliklerini ve barındırma bant genişliği sınırlarını kontrol etmek için kullan.",
      "10 birim destekler — bit, byte, kilobyte (1000 B), kibibyte (1024 B), megabyte (1000 KB), mebibyte (1024 KiB) ve daha fazlası. Her şey tarayıcında hesaplanır, çevrimdışı çalışır ve verilerin hiçbir sunucuya dokunmaz.",
    ],
    steps: [
      "Dönüştürmek istediğin miktarı yaz.",
      "Kaynak birimi ve hedef birimi seç.",
      "Sonuç yazdıkça güncellenir — tüm birimleri aynı anda görmek için aşağıdaki tabloya bak ya da sonucu kopyala.",
    ],
    faqs: [
      {
        q: "1 TB'lık disk neden yalnızca ~931 GB gösteriyor?",
        a: "Disk üreticileri ondalık birimleri kullanır (1 TB = 1.000.000.000.000 byte); işletim sistemleri ise çoğu zaman ikili birimleri gösterir (1 TiB = 1.099.511.627.776 byte). 1 TB = 0,909 TiB ≈ 931 GiB — hiçbir şey eksik değil.",
      },
      {
        q: "Bu dönüştürücü ücretsiz mi?",
        a: "Evet — tamamen tarayıcında çalışır. Sınır yok, sonuçlarda reklam yok, kayıt yok.",
      },
      {
        q: "Dönüşümler ne kadar doğru?",
        a: "Dönüşüm çarpanları uluslararası standart tanımları (SI ve NIST) izler. Sonuçlar 8 anlamlı basamağa kadar gösterilir.",
      },
    ],
  },
  "speed-converter": {
    name: "Hız Dönüştürücü",
    tagline:
      "km/h, mph, knot, m/s ve dahası — koşu temposunu, rüzgâr hızını ve araç hızını anında dönüştür.",
    intro: [
      "Farklı ülkelerin ve sporların kullandığı hız birimlerini dönüştür: kilometre/saat, mil/saat, yelkencilik ve havacılık için knot, fizik için metre/saniye.",
      "Yurt dışında araç kiralamada, deniz tahmin raporlarını okurken veya koşu bandı ile dışarı koşu temposunu karşılaştırırken işine yarar.",
      "6 birim destekler — metre/saniye, kilometre/saat, mil/saat, feet/saniye, knot, Mach (deniz seviyesi) ve daha fazlası. Her şey tarayıcında hesaplanır, çevrimdışı çalışır ve verilerin hiçbir sunucuya dokunmaz.",
    ],
    steps: [
      "Dönüştürmek istediğin miktarı yaz.",
      "Kaynak birimi ve hedef birimi seç.",
      "Sonuç yazdıkça güncellenir — tüm birimleri aynı anda görmek için aşağıdaki tabloya bak ya da sonucu kopyala.",
    ],
    faqs: [
      {
        q: "100 km/s kaç mph'tir?",
        a: "100 km/h = 62,14 mph. Kesin çarpan 1 mph = 1,609344 km/h'dir.",
      },
      {
        q: "Bu dönüştürücü ücretsiz mi?",
        a: "Evet — tamamen tarayıcında çalışır. Sınır yok, sonuçlarda reklam yok, kayıt yok.",
      },
      {
        q: "Dönüşümler ne kadar doğru?",
        a: "Dönüşüm çarpanları uluslararası standart tanımları (SI ve NIST) izler. Sonuçlar 8 anlamlı basamağa kadar gösterilir.",
      },
    ],
  },
  "volume-converter": {
    name: "Hacim Dönüştürücü",
    tagline:
      "Litre, galon, fincan, mililitre ve metreküp — ABD ve İngiltere birimleri açıkça etiketlenmiş.",
    intro: [
      "Mutfak ve mühendislik hacim birimlerini, ABD/İngiltere ayrışı açıkça yazılarak dönüştür: bir ABD galonu 3,785 L, bir İngiliz (imparatorluk) galonu 4,546 L'dir — %20 fark vardır; karıştırmak tarifleri bozar.",
      "Yemek pişirme, demleme, akvaryum dozajı, yakıt hesapları ve beton tahminleri için kurulmuştur.",
      "10 birim destekler — metreküp, litre, mililitre, galon (ABD), galon (İngiltere), quart (ABD) ve daha fazlası. Her şey tarayıcında hesaplanır, çevrimdışı çalışır ve verilerin hiçbir sunucuya dokunmaz.",
    ],
    steps: [
      "Dönüştürmek istediğin miktarı yaz.",
      "Kaynak birimi ve hedef birimi seç.",
      "Sonuç yazdıkça güncellenir — tüm birimleri aynı anda görmek için aşağıdaki tabloya bak ya da sonucu kopyala.",
    ],
    faqs: [
      {
        q: "ABD galonu, İngiltere galonuyla aynı mı?",
        a: "Hayır. 1 ABD galonu = 3,785 L, 1 İngiliz galonu = 4,546 L. Dönüştürücü onları ayrı listeler; her zaman doğrusunu seçersin.",
      },
      {
        q: "Bu dönüştürücü ücretsiz mi?",
        a: "Evet — tamamen tarayıcında çalışır. Sınır yok, sonuçlarda reklam yok, kayıt yok.",
      },
      {
        q: "Dönüşümler ne kadar doğru?",
        a: "Dönüşüm çarpanları uluslararası standart tanımları (SI ve NIST) izler. Sonuçlar 8 anlamlı basamağa kadar gösterilir.",
      },
    ],
  },
  "area-converter": {
    name: "Alan Dönüştürücü",
    tagline:
      "Metrekare, fit kare, acre, hektar ve dahası — gayrimenkul, arazi ve zemin kaplaması için.",
    intro: [
      "Arazi ve yüzey birimlerini sistemler arasında dönüştür: metrekare, fit kare, acre, hektar ve mil kare; herhangi bir girdi için hepsi bir kerede gösterilir.",
      "Tipik kullanımlar: farklı ülkelerden gelen emlak ilanlarını karşılaştırmak, bahçe ve çiftlik planlamak, zemin kaplaması veya boya kapsamı tahmin etmek.",
      "9 birim destekler — kilometrekare, hektar, metrekare, santimetrekare, mil kare, acre ve daha fazlası. Her şey tarayıcında hesaplanır, çevrimdışı çalışır ve verilerin hiçbir sunucuya dokunmaz.",
    ],
    steps: [
      "Dönüştürmek istediğin miktarı yaz.",
      "Kaynak birimi ve hedef birimi seç.",
      "Sonuç yazdıkça güncellenir — tüm birimleri aynı anda görmek için aşağıdaki tabloya bak ya da sonucu kopyala.",
    ],
    faqs: [
      {
        q: "Bir acre metrekare cinsinden ne kadar büyüktür?",
        a: "Bir acre = 4.046,86 m², kabaca 43.560 fit kare. Bir hektar 2,471 acre'dir.",
      },
      {
        q: "Bu dönüştürücü ücretsiz mi?",
        a: "Evet — tamamen tarayıcında çalışır. Sınır yok, sonuçlarda reklam yok, kayıt yok.",
      },
      {
        q: "Dönüşümler ne kadar doğru?",
        a: "Dönüşüm çarpanları uluslararası standart tanımları (SI ve NIST) izler. Sonuçlar 8 anlamlı basamağa kadar gösterilir.",
      },
    ],
  },
  "time-converter": {
    name: "Zaman Birimi Dönüştürücü",
    tagline:
      "Saniye, dakika, saat, gün, hafta, ay ve yıl arasında anında geçiş — ay/yıl uyarısı açıklanmış olarak.",
    intro: [
      "Süreleri zaman birimleri arasında dönüştür. Takvim ayları ve yılları uzunluk değiştirdiği için bu araç, klasik ortalamaları kullanır (ayda 30,44 gün, yılda 365,2425 gün) ve bunu söyler — sessiz yuvarlama yok.",
      "Proje tahminlerinde, abonelik fiyat karşılaştırmalarında, bilimsel zamanlamada ve geri sayımlarda kullanışlıdır.",
      "8 birim destekler — milisaniye, saniye, dakika, saat, gün, hafta ve daha fazlası. Her şey tarayıcında hesaplanır, çevrimdışı çalışır ve verilerin hiçbir sunucuya dokunmaz.",
    ],
    steps: [
      "Dönüştürmek istediğin miktarı yaz.",
      "Kaynak birimi ve hedef birimi seç.",
      "Sonuç yazdıkça güncellenir — tüm birimleri aynı anda görmek için aşağıdaki tabloya bak ya da sonucu kopyala.",
    ],
    faqs: [
      {
        q: "Bir ay burada neden 30,44 gün?",
        a: "Takvim ayı 28 ile 31 gün arasında değişir; süre hesabı bu yüzden Gregoryen döngüsü üzerinden ortalamayı kullanır: 30,4369 gün. Kesin takvim tarihi hesapları için bunun yerine Tarih Hesaplayıcı'yı kullan.",
      },
      {
        q: "Bu dönüştürücü ücretsiz mi?",
        a: "Evet — tamamen tarayıcında çalışır. Sınır yok, sonuçlarda reklam yok, kayıt yok.",
      },
      {
        q: "Dönüşümler ne kadar doğru?",
        a: "Dönüşüm çarpanları uluslararası standart tanımları (SI ve NIST) izler. Sonuçlar 8 anlamlı basamağa kadar gösterilir.",
      },
    ],
  },
  "pressure-converter": {
    name: "Basınç Dönüştürücü",
    tagline:
      "bar, psi, pascal, atmosfer, mmHg ve dahası — lastikler, dalış, hava durumu ve HVAC için.",
    intro: [
      "Farklı endüstrilerin kullandığı basınç birimlerini dönüştür: lastik göstergeleri için psi, Avrupa spesifikasyonları için bar, mühendislikte pascal ve kPa, tıpta ve meteorolojide mmHg.",
      "Standart, tanımı kesin yapan yerlerde tüm çarpanlar tanım gereği kesindir (örneğin 1 atm = 101.325 Pa).",
      "7 birim destekler — pascal, kilopascal, megapascal, bar, atmosfer, milimetre cıva ve daha fazlası. Her şey tarayıcında hesaplanır, çevrimdışı çalışır ve verilerin hiçbir sunucuya dokunmaz.",
    ],
    steps: [
      "Dönüştürmek istediğin miktarı yaz.",
      "Kaynak birimi ve hedef birimi seç.",
      "Sonuç yazdıkça güncellenir — tüm birimleri aynı anda görmek için aşağıdaki tabloya bak ya da sonucu kopyala.",
    ],
    faqs: [
      {
        q: "psi'yi bar'a nasıl çeviririm?",
        a: "1 bar = 14,5038 psi; psi değerini 14,5038'e böl. 32 psi'lik tipik bir araba lastiği yaklaşık 2,21 bardır.",
      },
      {
        q: "Bu dönüştürücü ücretsiz mi?",
        a: "Evet — tamamen tarayıcında çalışır. Sınır yok, sonuçlarda reklam yok, kayıt yok.",
      },
      {
        q: "Dönüşümler ne kadar doğru?",
        a: "Dönüşüm çarpanları uluslararası standart tanımları (SI ve NIST) izler. Sonuçlar 8 anlamlı basamağa kadar gösterilir.",
      },
    ],
  },
  "energy-converter": {
    name: "Enerji Dönüştürücü",
    tagline:
      "Kalori, kilojoule, joule, kWh, Wh ve BTU — gıda etiketleri, elektrik faturaları ve fizik tek yerde.",
    intro: [
      "Enerji birimlerini bağlamlar arasında dönüştür: gıda kalorileri (kcal) karşısında kimya kalorileri (cal), elektriğe kWh, ısıtmaya BTU, fiziğe joule.",
      "cal ile kcal arasındaki net ayrım — birçok diyet etiketi yanlış anlamanın arkasındaki karışıklık — kesin standart çarpanlarla birlikte.",
      "7 birim destekler — joule, kilojoule, kalori, kilokalori, watt-saat, kilowatt-saat ve daha fazlası. Her şey tarayıcında hesaplanır, çevrimdışı çalışır ve verilerin hiçbir sunucuya dokunmaz.",
    ],
    steps: [
      "Dönüştürmek istediğin miktarı yaz.",
      "Kaynak birimi ve hedef birimi seç.",
      "Sonuç yazdıkça güncellenir — tüm birimleri aynı anda görmek için aşağıdaki tabloya bak ya da sonucu kopyala.",
    ],
    faqs: [
      {
        q: "Kalori ile kilokalori aynı şey mi?",
        a: "Hayır. 1 kcal = 1000 cal. 'Calorie' (büyük C) yazan gıda etiketleri aslında kilokalori demektir. Doğrulamak için 1 kcal → cal gir.",
      },
      {
        q: "1 BTU kaç kWh'tir?",
        a: "1 BTU = 0,000293071 kWh. Bir saat çalışan 10.000 BTU'luk klima yaklaşık 2,93 kWh tüketir.",
      },
      {
        q: "Bu dönüştürücü ücretsiz mi?",
        a: "Evet — tamamen tarayıcında çalışır. Sınır yok, sonuçlarda reklam yok, kayıt yok.",
      },
      {
        q: "Dönüşümler ne kadar doğru?",
        a: "Dönüşüm çarpanları uluslararası standart tanımları (SI ve NIST) izler. Sonuçlar 8 anlamlı basamağa kadar gösterilir.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* Hesap makineleri ve günlük yardımcılar                              */
  /* ------------------------------------------------------------------ */
  "currency-converter": {
    name: "Döviz Çevirici",
    tagline:
      "160+ dünya para birimini güncel orta piyasa kurlarıyla çevir — bir kez online yüklenir, tarayıcında gizlice hesaplanır ve önbelleğe alınır.",
    intro: [
      "Döviz kurları, ücretsiz ve anahtarsız open.er-api.com servisinden bir kez alınır ve cihazında bir saatliğine önbelleğe alınır; böylece yinelenen çeviriler anında ve çevrimdışı çalışır. Miktarını başka bir para birimine çeviren aritmetik, tarayıcında yerel olarak yapılır.",
      "Bir miktar yaz, 160+ para biriminin aranabilir listesinden ikisini seç ve sonucu canlı kur satırıyla birlikte oku. Girdiğin miktarlar asla hiçbir yere gönderilmez; yalnızca anonim kur tablosu indirilir.",
    ],
    steps: [
      "Çevirmek istediğin miktarı gir.",
      "Kaynak ve hedef para birimini seç — yaygın olanlar önce listelenir.",
      "Çevrilmiş sonucu ve kesin kuru oku; en güncel veri için Kurları Yenile düğmesini kullan.",
    ],
    faqs: [
      {
        q: "Döviz kurları ne sıklıkla güncellenir?",
        a: "open.er-api.com tablosu günde yaklaşık bir kez yenilenir ve bu araç onu, tekrar almadan önce tarayıcında bir saat önbellekler. En yeni tabloyu hemen çekmek için istediğin an “Kurları yenile”ye bas.",
      },
      {
        q: "Bu aracı kullanmak verilerimi internete gönderir mi?",
        a: "Hiçbir miktar hiçbir yere gönderilmez. Tek ağ isteği, anonim ve herkese açık bir kur tablosunu (USD tabanlı) saatte bir indirir; çeviri matematiği tarayıcında yerel çalışır ve önbellekten çevrimdışı bile çalışır.",
      },
      {
        q: "Bunlar bankamın vereceği kurlar mı?",
        a: "Bunlar orta piyasa referans kurlarıdır — bankaların işlem yaptığı alım ve satım fiyatlarının ortasıdır. Kart ağları ve bankalar genellikle bu rakamın üzerine %1–3 marj veya ücret ekler.",
      },
    ],
  },
  "timezone-converter": {
    name: "Saat Dilimi Çevirici",
    tagline:
      "21 büyük şehir arasında canlı saatlerle ve saat saat tabloyla zaman karşılaştır — yaz saati tam uygulanır, her şey tarayıcında çalışır.",
    intro: [
      "Los Angeles'tan Tokyo'ya herhangi iki şehri seç ve iki canlı saati yan yana, bugünkü kesin farkı ve günün her saatinin diğer şehirde neye dönüştüğünü gösteren 24 satırlık karşılaştırma tablosunu gör — saat dilimleri arasında toplantı saati bulmanın en hızlı yolu.",
      "Çeviri, tarayıcının yerleşik IANA saat dilimi veritabanını kullanır; yaz saati geçişleri hiçbir ağ çağrısı olmadan doğru dakikaya düşer.",
    ],
    steps: [
      "Başlangıç şehrini seç — canlı yerel saati altında görünür.",
      "Hedef şehri seç; saat ve UTC farkı anında güncellenir.",
      "İki taraf için de işleyen saatleri bulmak üzere saat saat tabloyu tara.",
      "İki şehri ters çevirmek için değiştir düğmesini kullan.",
    ],
    faqs: [
      {
        q: "Çevirici yaz saatini hallediyor mu?",
        a: "Evet. Farklar, bugünün tarihi için tarayıcının kendi IANA saat dilimi kurallarıyla hesaplanır; halihazırda yaz saatinde olan bir şehir doğru kaydırılmış farkını gösterir ve saat tablosu iki taraftaki gerçek saatleri yansıtır.",
      },
      {
        q: "Saat tablosu bazı satırlarda neden farklı bir tarih gösteriyor?",
        a: "Şehirler birbirinden uzak olduğunda bir tarafın takvim günü, gün içinde değişir. Her satır saatin yanında hedefin tarihini gösterir; örneğin Şanghay'da 9:00'un New York'ta hâlâ önceki akşam 21:00 olduğunu görürsün.",
      },
      {
        q: "Bu araç internet erişimi gerektiriyor mu?",
        a: "Hayır. Şehir saatleri, tarayıcınıza gömülü saat dilimi veritabanından ve cihaz saatinden gelir — hiçbir şey indirilmez ve hiçbir konum paylaşılmaz.",
      },
    ],
  },
  "binary-converter": {
    name: "İkili Dönüştürücü",
    tagline:
      "Ondalık, onaltılık, sekizlik ve ikili arasında tek canlı ızgarada dönüştür — sınırsız büyüklükte tam sayılar, okunabilirlik için gruplama.",
    intro: [
      "Dört alandan herhangi birine — ondalık, hex, sekizlik veya ikili — bir sayı yaz; diğer üçü anında güncellenir. Hex değerleri iki, ikili değerler dört basamakta bir gruplanır; uzun bit desenleri okunur kalır.",
      "Dönüşüm BigInt aritmetiği kullanır; 32 bit veya 64 bit tavan yoktur: 40 haneli bir ondalık ya da tam bir 256 bitlik hex dizgisi yapıştır, her temsil kesin kalır.",
    ],
    steps: [
      "Herhangi bir alana bir değer yaz veya yapıştır — ondalık, hex, sekizlik veya ikili.",
      "Diğer üç taban yazdıkça canlı güncellenir.",
      "0x gibi önekler isteğe bağlıdır; ayrıştırırken gruplama boşlukları yok sayılır.",
    ],
    faqs: [
      {
        q: "Bu dönüştürücü en büyük kaç sayıyı halleder?",
        a: "Sınırsız büyüklükte negatif olmayan tam sayılar. Hesap BigInt kullanır; 256 bitlik bir onaltılık değer kesin olarak dönüştürülür — normal JavaScript sayılarının 2^53 sınırının çok ötesinde.",
      },
      {
        q: "Hex harf girdim neden geçersiz gösteriliyor?",
        a: "Her taban yalnızca kendi basamaklarını kabul eder: ikili 0–1, sekizlik 0–7, ondalık 0–9 ve onaltılık 0–9 artı a–f. Sayının içindeki başıboş bir boşluk veya simge de reddedilir.",
      },
      {
        q: "Negatif sayılar veya kesirler destekleniyor mu?",
        a: "Hayır — bu ızgara, bit desenlerinin, hash'lerin ve bellek adreslerinin konusu olan tam ve negatif olmayan değerleri çevirir. İşaretli ve kesirli biçimler, eşlemeyi muğlak yapacak kodlama tercihlerine (ikinin tümleyeni, IEEE 754) bağlıdır.",
      },
    ],
  },
  "roman-numeral": {
    name: "Roma Rakamı Dönüştürücü",
    tagline:
      "Sayıları Roma rakamlarına ve geriye, iki yönde aynı anda çevir — çıkarımlı yazımın katı klasik doğrulamasıyla.",
    intro: [
      "Bir Arap sayısı (1–3999) yaz ve Roma biçimini gör, ya da bir rakam yaz ve sayıyı al — her iki alan da canlıdır; istediğin tarafı düzeltebilirsin. Ayrıştırıcı klasik kuralları dayatır: I, V/X'ten önce; X, L/C'den önce; C, D/M'den önce.",
      "Saat yüzleri, kitap bölümleri, film yılları, anıt kitabeleri ve Super Bowl numaraları — Roma rakamlarının hâlâ göründüğü her yerde pratik.",
    ],
    steps: [
      "Roma rakamını almak için 1 ile 3999 arası bir sayı gir.",
      "Ya da bir Roma rakamı yaz — sayı anında görünür.",
      "VIIII veya IM gibi geçersiz biçimler, kuralların açıklamasıyla işaretlenir.",
    ],
    faqs: [
      {
        q: "Üst sınır neden 4000 (MMMCMXCIX)?",
        a: "Klasik Roma yazımında M'den (1000) büyük bir basamak yoktur ve M'nin dört kez yinelenmesi (MMMM) kullanılmazdı. Katı klasik biçimde yazılabilecek en büyük sayı 3999'dur; MMMCMXCIX olarak yazılır.",
      },
      {
        q: "Saatler bazen gösterirken VIIII neden reddediliyor?",
        a: "Bazı saat yüzleri dört için toplamalı IIII kullanır ama standart klasik sistem çıkarımlı IV ister. Bu araç katı kanonik desene göre doğrular; VIIII, IC veya IM sessizce çevrilmek yerine işaretlenir.",
      },
      {
        q: "Dönüştürücü küçük harfleri kabul ediyor mu?",
        a: "Evet — mcmxciv gibi girdiler otomatik olarak büyük harfe çevrilir ve 1994'e dönüştürülür. Çıktı, kitabelerdeki geleneğe uygun olarak daima büyük harfle gösterilir.",
      },
    ],
  },
  "age-calculator": {
    name: "Yaş Hesaplayıcı",
    tagline:
      "Yıl, ay ve gün cinsinden kesin yaşı, yaşanan toplam günü ve sonraki doğum gününe canlı geri sayımı hesapla — takvim hassasiyetiyle.",
    intro: [
      "Bir doğum tarihi gir; bu hesaplayıcı kesin yaşı raporlar — yaklaşım değil, yıl, ay ve gün — artı toplam ay ve yaşanan toplam gün. Doğum gününün düşeceği hafta günüyle birlikte sonraki doğum gününe geri sayar.",
      "“Şu tarihteki yaş” alanı bugüne ayarlıdır ve geçmiş ya da gelecekteki herhangi bir tarihe değiştirilebilir; “mezuniyet gününde kaç yaşındaydı?” gibi soruları yanıtlamak kolaylaşır.",
    ],
    steps: [
      "Doğum tarihini seç.",
      "Yaş hesap tarihini bugün bırak veya başka bir tarihe değiştir.",
      "Kesin yaşı, toplam ay ve günü ve sonraki doğum günü geri sayımını oku.",
    ],
    faqs: [
      {
        q: "Yıl/ay/gün yaşı nasıl hesaplanıyor?",
        a: "Ortalama ay uzunluğuyla değil, takvim aritmetiğiyle: yıllar ve aylar tam sayılır, artan günler ilgili ayın gerçek uzunluğuna göre ölçülür — artık yıllar dahil. 29 Şubat'ta doğan biri, artık olmayan yıllarda 1 Mart'ta bir yaş büyük sayılır.",
      },
      {
        q: "Geçmiş veya gelecek bir tarihteki yaşı hesaplayabilir miyim?",
        a: "Evet. “Şu tarihteki yaş” kutusu düzenlenebilirdir; tarihsel bir yaş hesaplayabilir ya da birinin gelecekteki bir etkinlikte kaç yaşında olacağını görebilirsin. Doğum tarihi, hesap tarihinden sonra olmamalıdır.",
      },
      {
        q: "Toplam gün sayısı neden önemli?",
        a: "Yaşanan toplam gün, “dünyadaki günler” tarzı kilometre taşlarında ve yaşları gün olarak saklayan sistemlerde kullanılan rakamdır. UTC'deki takvim tarihlerinden hesaplanır; yaz saati kaymaları onu bir gün yanıltamaz.",
      },
    ],
  },
  "bmi-calculator": {
    name: "VKİ Hesaplayıcı",
    tagline:
      "Vücut Kitle İndeksini metrik veya imparatorluk girdilerle hesapla ve değerin resmî WHO ağırlık kategorilerinin neresine düştüğünü tam olarak gör.",
    intro: [
      "Boy ve kiloyu santimetre-kilogram ya da feet-inç-pound olarak gir; hesaplayıcı Vücut Kitle İndeksi'ni tek ondalıkla, hangi WHO kategorisine düştüğüyle — zayıf, normal, kilolu veya obez — gösterir ve referans tablosunda ilgili satır vurgulanır.",
      "Sonuç yazdıkça güncellenir; birkaç kilogramın seni bantlar arasında nasıl taşıdığını görmek kolaydır. VKİ bir tarama ölçüsüdür, teşhis değil: kası yağdan ayırt etmez.",
    ],
    steps: [
      "Metrik (cm + kg) veya imparatorluk (ft + in + lb) birimlerini seç.",
      "Boyunu ve kilonu yaz.",
      "VKİ'ni, WHO kategorisini ve tam referans tabloyu oku.",
    ],
    faqs: [
      {
        q: "WHO VKİ aralıkları nedir?",
        a: "Dünya Sağlık Örgütü şunu tanımlar: 18,5 altı zayıf, 18,5–24,9 normal, 25,0–29,9 kilolu, 30,0 ve üzeri obez. Aynı eşikler yetişkin erkek ve kadınlara uygulanır.",
      },
      {
        q: "VKİ nasıl hesaplanır?",
        a: "VKİ, kilogram cinsinden ağırlığın metre cinsinden boyun karesine bölümüdür (kg/m²). İmparatorluk birimleri için araç feet, inç ve pound'u içeride dönüştürür; sonuç her iki yolda da aynıdır.",
      },
      {
        q: "VKİ sporculara neden uymuyor?",
        a: "Kas, yağdan yoğundur; çok kaslı insanlar az fazla yağ taşırken “kilolu” çıkabilir. VKİ'yi hızlı bir topluluk düzeyi tarama olarak gör ve daha dolu bir tablo için bel ölçümü veya vücut kompozisyonuyla birleştir.",
      },
    ],
  },
  "percentage-calculator": {
    name: "Yüzde Hesaplayıcı",
    tagline:
      "Tek canlı araçta üç yüzde problemi: Y'nin X%'i, X, Y'nin yüzde kaçı ve iki değer arasındaki yüzde değişim.",
    intro: [
      "İnsanların gerçekten sorduğu üç soru: “200'ün %15'i kaç?”, “30, 150'nin yüzde kaçı?” ve “satış 480'den 610'ya çıktı — yüzde kaç?”. Tek tıkla mod değiştir, formül her duruma uyum sağlar.",
      "Yüzde değişim işaretli olup artış veya azalış olarak etiketlenir; 500'den 400'e düşüş, kafa karıştıran bir pozitif sayı değil, net biçimde −%20 okunur.",
    ],
    steps: [
      "Modu seç: Y'nin X%'i, X, Y'nin yüzde kaçı veya % değişim.",
      "İki değeri iki kutuya yaz.",
      "Canlı sonucu oku — değişimlerde yön etiketlenir.",
    ],
    faqs: [
      {
        q: "Yüzde değişim nasıl hesaplanır?",
        a: "(son − başlangıç) ÷ |başlangıç| × 100. Paydadaki mutlak değer, −50'den −40'a değişimin doğru biçimde +%20 raporlanmasını sağlar, −%20 değil. Ters yön (400 → 500), taban değiştiği için +%25 verir.",
      },
      {
        q: "%20 artışın ardından %20 düşüş neden sıfır değil?",
        a: "Yüzdeler farklı tabanlara uygulanır: 100 + %20 = 120, sonra 120 − %20 = 96. Net değişim −%4'tür. Bu asimetri, fiyat karşılaştırmalarını ve haber başlıklarını yanılta gelir.",
      },
      {
        q: "Negatif veya ondalık sayı kullanabilir miyim?",
        a: "Evet. Her iki girdi de negatif ve ondalık kabul eder; “80'in −%5'i” veya sıcaklık değişimindeki yüzde puanları sorunsuz çalışır.",
      },
    ],
  },
  "emi-calculator": {
    name: "EMI Hesaplayıcı",
    tagline:
      "Herhangi bir kredi için sabit aylık EMI'yi hesapla — anapara, faiz ve vade gir; toplam faiz ve toplam geri ödeme anında çıkar.",
    intro: [
      "Kredi tutarını, yıllık faiz oranını ve yıl veya ay cinsinden vadeyi gir; eşit aylık taksiti ve kredinin ömrü boyunca ödeyeceğin toplam faizi al. Matematik, bankaların ve finans kuruluşlarının kullandığı standart azalan bakiye formülüdür.",
      "Herhangi bir girdiyi değiştir, her şey canlı yeniden hesaplanır; 15 yıllık krediyi 20 yıllıkla karşılaştır ya da fazladan %0,5 faizin sana aylık neye mal olduğunu tam olarak gör.",
    ],
    steps: [
      "Kredi tutarını (anapara) yaz.",
      "Yıllık faiz oranını ve yıl veya ay cinsinden vadeyi gir.",
      "Aylık EMI'yi, toplam faizi ve toplam geri ödemeyi oku.",
    ],
    faqs: [
      {
        q: "EMI hesaplayıcı hangi formülü kullanır?",
        a: "Standart azalan bakiye formülü: EMI = P × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1); P anapara, r aylık faiz oranı (yıllık ÷ 12 ÷ 100) ve n ay sayısıdır. Bankaların konut, taşıt ve ihtiyaç kredilerinde kullandığı denklem budur.",
      },
      {
        q: "Kredinin başında toplam faiz neden bu kadar yüksek?",
        a: "Aylık faiz, kalan bakiyeden tahsil edilir ve bakiye başlangıçta en büyüktür. Erken taksitler çoğunlukla faizden, az oranda anaparadan oluşur; bakiye küçüldükçe karışım tersine döner. Bu yüzden erken ön ödeme, geç ön ödemeden çok daha fazla faiz tasarruf ettirir.",
      },
      {
        q: "Masraflar ve sigorta EMI'ye dâhil mi?",
        a: "Hayır. İşlem masrafları, sigorta ve değişken oran değişiklikleri dışarıda bırakılır — sonuç, girdiğin oran için saf amortisman EMI'sidir. Ödenecek nihai tutar, kredi kuruluşunun onay yazısında görünür.",
      },
    ],
  },
  "loan-calculator": {
    name: "Kredi Hesaplayıcı",
    tagline:
      "Kredinin tüm resmini gör: aylık ödeme, toplam faiz ve her yılın anapara-faiz dağılımını gösteren yıllık amortisman tablosu.",
    intro: [
      "EMI görünümünün verdiği her şey — aylık ödeme, toplam faiz, toplam geri ödeme — artı yıllık bir amortisman planı: her yılın ödemelerinin ne kadarının faiz, ne kadarının anapara olduğunu ve her yıl sonunda kalan bakiyeyi tam olarak gösterir.",
      "Erken yıllardaki ek ödemelerin neden bu kadar değerli olduğunu anlamanın en hızlı yolu budur: tablo, faizin ağırlıkta olduğu yılları gözden kaçırmanı imkânsız kılar.",
    ],
    steps: [
      "Kredi tutarını, yıllık oranı ve yıl veya ay cinsinden vadeyi gir.",
      "Aylık ödemeyi, toplam faizi ve toplam geri ödemeyi oku.",
      "Yıl başına anapara, faiz ve kalan bakiyeyi görmek için yıllık tabloyu kaydır.",
    ],
    faqs: [
      {
        q: "Amortisman planı nedir?",
        a: "Sabit ödemeli bir kredinin dönem dönem dağılımıdır. Her ödeme, güncel bakiyenin borçlu olduğu faiz ile emekli ettiği anapara arasında bölünür ve bakiye her ay küçülür. Buradaki tablo bu ayları yıllara gruplar.",
      },
      {
        q: "Toplam faizi nasıl azaltabilirim?",
        a: "Üç kaldıraç: daha kısa vade, daha düşük oran veya ek anapara ödemeleri — özellikle bakiyelerin en yüksek olduğu kredinin ilk üçte birinde. Yıllık tablo, faizin tam olarak nerede toplandığını gösterir.",
      },
      {
        q: "Plan, oranın hiç değişmediğini varsayıyor mu?",
        a: "Evet. Girdiğin oran için sabit oranlı bir krediyi modeller. Değişken oranlı ürünlerde, referans oran her sıfırlandığında yeniden hesapla — her sıfırlama hem ödemeyi hem planı değiştirir.",
      },
    ],
  },
  "gst-calculator": {
    name: "GST Hesaplayıcı",
    tagline:
      "%5, %12, %18 ve %28 oran dilimlerinde GST ekle veya çıkar — net, vergi ve brüt tutarlar tarayıcında canlı hesaplanır.",
    intro: [
      "Herhangi bir tutar gir ve Hindistan'ın dört GST diliminden birini seç: net bir fiyata vergi ekle veya brüt (MRP) fiyatın içine gömülü GST'yi çıkar. Üç rakamın tamamı — net, vergi, brüt — yazdıkça güncellenir.",
      "Faturalar için, ters yükümlülük kontrolleri için, farklı dilimli eyaletler arasındaki alışveriş karşılaştırmaları için ve bir etiket fiyatının ne kadarının vergi olduğunu tam anlamak için kullanışlıdır.",
    ],
    steps: [
      "Tutarı yaz — GST ekliyorsan net, çıkarıyorsan brüt.",
      "Uygulanabilir dilimi seç: %5, %12, %18 veya %28.",
      "Vergi ekle veya Vergi çıkar seç ve net, vergi, brüt rakamlarını oku.",
    ],
    faqs: [
      {
        q: "Hindistan'daki GST dilimleri nelerdir?",
        a: "Ana oranlar %5, %12, %18 ve %28'dir: zorunlu mallar %0–5'te, çoğu mal ve hizmet %12–18'de, lüks veya sin malları %28'de (bazen ek bir cess ile) yer alır. Araç, dört standart dilimi kapsar.",
      },
      {
        q: "Vergi dâhil bir fiyattan GST'yi nasıl çıkarırım?",
        a: "“Vergi çıkar”ı seç ve brüt tutarı gir. Taban, brüt ÷ (1 + oran/100) ile geri kazanılır; %18 GST ile 118 ₹'lik brüt fiyatın neti 100 ₹, vergisi 18 ₹'dir.",
      },
      {
        q: "GST, VAT ile aynı şey mi?",
        a: "İkisi de her aşamada tahsil edilen katma değer vergisidir ama Hindistan'daki GST, merkezi özel tüketim vergisini, hizmet vergisini ve eyalet VAT'ını tek çatı altında toplayan birleşik bir vergidir; CGST + SGST (eyalet içi) veya IGST (eyaletler arası) olarak bölünür. Diğer ülkeler eşdeğerine kısaca VAT der.",
      },
    ],
  },
  "vat-calculator": {
    name: "KDV Hesaplayıcı",
    tagline:
      "Net bir fiyata KDV ekle veya brüt fiyattan herhangi bir özel oranda çıkar — net, KDV ve brüt canlı, gizli ve anında.",
    intro: [
      "Her ülkenin oranıyla iki yönde çalışır: İngiltere için 20, Hollanda için 21, Almanya için 19 yaz — ya da tamamen farklı bir oran. Net bir rakama vergi ekle veya brüt (vergi dâhil) fiyatın içinde saklanan KDV'yi geri çıkar.",
      "Her şey tarayıcında yerel hesaplanır — yükleme yok, hesap yok — bu da onu fiyat taslakları ve yayımlanmamış faturalar için güvenli kılar.",
    ],
    steps: [
      "Tutarı yaz — KDV ekliyorsan net, çıkarıyorsan brüt.",
      "KDV oranını yüzde olarak gir (örneğin 20).",
      "Vergi ekle veya Vergi çıkar seç; net, KDV ve brüt anında görünür.",
    ],
    faqs: [
      {
        q: "Brüt fiyattan geriye doğru KDV'yi nasıl hesaplarım?",
        a: "Net = brüt ÷ (1 + oran ÷ 100). %20 KDV ile 120 £'lik brüt fiyat: 120 ÷ 1,2 = 100 £ net, 20 £ KDV. “Vergi çıkar” modu bunu senin için yapar ve üç rakamı da gösterir.",
      },
      {
        q: "KDV ile GST arasındaki fark nedir?",
        a: "Aynı tür vergidir — tedarik zincirinin her aşamasında eklenen ve sonunda tüketiciye yansıyan değer. “KDV (VAT)”, Avrupa'da, İngiltere'de ve Afrika ile Asya'nın büyük kısmında yaygın addır; Hindistan ve birkaç ülke birleşik sürümüne GST der.",
      },
      {
        q: "Hangi KDV oranını kullanmalıyım?",
        a: "Mal veya hizmetine ve yargı alanına uygulanan oranı: standart oranlar dünyada %0 ile %27 arasında değişir ve çoğu ülkenin gıda, kitap veya ilaç için indirimli oranları vardır. Emin değilsen vergi dairesinin güncel tablosuna bak.",
      },
    ],
  },
  "discount-calculator": {
    name: "İndirim Hesaplayıcı",
    tagline:
      "Fiyat artı bir veya iki üst üste indirim gir: nihai fiyat, kazanılan para ve gerçek birleşik yüzde — yazdıkça hesaplanır.",
    intro: [
      "Özgün fiyatı ve bir indirim yüzdesini gir; gerçekten ne ödediğini ve ne kadar tasarruf ettiğini anında gör. İkinci, isteğe bağlı indirim, alışveriş yapanları her zaman yıkan “indirimli fiyatlara ek %10” durumunu halleder.",
      "Üst üste indirimler sırayla uygulanır ve araç, etkin birleşik oranı gösterir — çünkü %20 + %10 indirim %28'dir, %30 değil; büyük harcamalarda bu fark birikir.",
    ],
    steps: [
      "Özgün fiyatı yaz.",
      "İndirim yüzdesini gir — ve varsa ikinci, üst üste binen indirimi.",
      "Nihai fiyatı, kazanılan tutarı ve etkin indirimi oku.",
    ],
    faqs: [
      {
        q: "%20 + %10 neden %30 indirimle aynı değil?",
        a: "İkinci indirim, özgün fiyata değil zaten düşürülmüş fiyata uygulanır: 100 → 80 (−%20) → 72 (−%10); toplamda %28 indirim. Hesaplayıcı bu etkin oranı gösterir; kampanyaları adil karşılaştırırsın.",
      },
      {
        q: "İndirimli fiyattan özgün fiyatı nasıl bulurum?",
        a: "İndirimli fiyatı (1 − indirim ÷ 100)'e böl. %28 indirimden sonraki 72 $'lık fiyat, 72 ÷ 0,72 = 100 $'dan gelir. Ya da adım adım çıkarmak için Yüzde Hesaplayıcı'nın “X, Y'nin yüzde kaçı” modunu kullan.",
      },
      {
        q: "Bu, KDV veya satış vergisini hesaba katar mı?",
        a: "Hayır — yazdığın fiyatlar üzerinden çalışır. Etiket vergi dâhil bir fiyat gösteriyorsa indirim sonucu da vergi dâhildir. Vergiyle birleştirmek için indirimli fiyatı KDV veya GST hesaplayıcısından geçir.",
      },
    ],
  },
  "profit-calculator": {
    name: "Kâr Hesaplayıcı",
    tagline:
      "Maliyet ve satış fiyatı gir: kâr veya zarar, kâr marjı ve kâr payı yüzdesi çıkar — satıcıların karıştırdığı fiyat rakamları, canlı ayrıştırılır.",
    intro: [
      "Bir ürünün sana neye mal olduğunu ve ne sattığını gir; mutlak kârı (veya zararı) artı her satıcının ihtiyaç duyduğu iki oranı al: marj — kârın satış fiyatı içindeki payı — ve kâr payı (markup) — kârın maliyet içindeki payı.",
      "İki oran farklı paydalar kullandığı için %25'lik bir marj, %33,3'lük bir kâr payına karşılık gelir; araç ikisini birlikte gösterir; faturalar, teklifler ve fiyat listeleri tutarlı kalır.",
    ],
    steps: [
      "Maliyeti yaz — ödediğin tutar.",
      "Satış fiyatını yaz — müşterinin ödediği tutar.",
      "Kâr/zarar, marj ve kâr payı yüzdelerini oku.",
    ],
    faqs: [
      {
        q: "Marj ile kâr payı arasındaki fark nedir?",
        a: "Marj, kâr ÷ satış fiyatıdır (gelirin payı); kâr payı, kâr ÷ maliyettir (maliyetin üstüne eklenen tutar). 80'e alınıp 100'e satılan bir ürünün %20 marjı ve %25 kâr payı vardır. İkisini karıştırmak, hedeflediğin kârı sessizce eritir.",
      },
      {
        q: "Hedef marja göre fiyatı nasıl belirlerim?",
        a: "Maliyeti (1 − hedef marj)'a böl: 80 maliyet üzerinde %25 marj için 80 ÷ 0,75 ≈ 106,67. Onun yerine kâr payıyla belirlersen (80 × 1,25 = 100) elinde yalnızca %20 marj kalır.",
      },
      {
        q: "Hesaplayıcı masrafları ve vergileri dâhil ediyor mu?",
        a: "Girdiğin iki sayı üzerinden çalışır; ödeme işleme ücretleri, kargo ve satış vergisi yalnızca önce maliyete veya fiyata katarsan görünür. Vergi dâhil fiyatlandırma için rakamı KDV veya GST hesaplayıcısından geçir.",
      },
    ],
  },
  "scientific-calculator": {
    name: "Bilimsel Hesap Makinesi",
    tagline:
      "Tarayıcında tam donanımlı bir bilimsel hesap makinesi: trig, log, ln, kuvvetler ve kökler canlı sonuçla — eval yok, sunucu yok, takip yok.",
    intro: [
      "Bir tuş takımı artı yazılabilir bir ifade satırı: sin, cos, tan (DEG/RAD), log₁₀, ln, karekök, kareler, serbest kuvvetler, parantezler, π ve e. Sonuç önizlemesi yazdıkça güncellenir ve =, zincirleme hesap için ifadeye geri katlanır.",
      "İfadeler, bu site için elle yazılmış özyinelemeli düşüşlü bir değerlendiriciyle ayrıştırılır — JavaScript'in eval'i ve Function kurucusu hiç kullanılmaz ve hiçbir şey hiçbir yere gönderilmez. Örtük çarpım (2π, 3(4+1)) kutudan çıktığı gibi çalışır.",
    ],
    steps: [
      "Tuş takımına dokun veya klavyenle bir ifade yaz.",
      "Trigonometrik işlevler için gerektiğinde DEG/RAD arasında geçiş yap.",
      "Önizlenen sonucu işlemek için ='ye bas, sonra hesaplamaya devam et.",
    ],
    faqs: [
      {
        q: "İfadeler nasıl değerlendiriliyor?",
        a: "Sayfaya yazılmış küçük bir token'layıcı ve özyinelemeli düşüşlü ayrıştırıcıyla: sayılar, sabitler, işlevler, parantezler, tekli eksi, sondaki % ve x², sağa bağlanan kuvvetler ve komşu değerler arası örtük çarpım. Geçersiz girdi, hiçbir şey çalıştırmak yerine yalnızca bir hata gösterir.",
      },
      {
        q: "45 derecenin tanjantını nasıl alırım?",
        a: "DEG anahtarını aktif bırak (varsayılan budur), tan'a bas, sonra 45 ve =. Radyan için — örneğin tan(π/4) — RAD'a geç ve tan(π/4)'ü doğrudan yaz.",
      },
      {
        q: "Sonucum neden sınırlı basamakla gösteriliyor?",
        a: "Sonuçlar, 0.30000000000000004 gibi kayan nokta gürültüsünü gizlemek için 12 anlamlı basamağa yuvarlanır. İkili kayan nokta donanımında 12 basamak ötesi hassasiyet zaten nadiren anlamlıdır.",
      },
    ],
  },
  "date-calculator": {
    name: "Tarih Hesaplayıcı",
    tagline:
      "İki tarih arasını yıl, ay ve gün olarak ölç — ya da herhangi bir tarihe gün ekle ve çıkar — artık yıllar tam olarak ele alınır.",
    intro: [
      "İki günlük tarih problemi tek yerde: iki tarih arasındaki boşluğu ölç (takvim hassasiyetli yıl/ay/gün, toplam gün, hafta ve artan gün) ya da bir temel tarihten N gün ileri veya geri yürü ve elde edilen tarihi hafta günüyle al.",
      "Aritmetik, gerçek takvim matematiğidir — ortalama bir ay değil; artık günü bir doğum günü, 31 günlük bir ay veya Şubat span'i tam olarak doğru çıkar, sunucu devrede değildir.",
    ],
    steps: [
      "Tarihler arası farkı ya da Gün ekle / çıkar modunu seç.",
      "İki tarihi gir — ya da bir temel tarih ve bir gün sayısı.",
      "Kesin dökümü ve sonuç tarihiyle birlikte hafta gününü oku.",
    ],
    faqs: [
      {
        q: "Yıl/ay/gün farkı nasıl hesaplanıyor?",
        a: "İnsanların yıldönümlerini saydığı gibi: tam yıllar, sonra tam aylar, sonra artan günler ilgili ayların gerçek uzunluklarına göre ölçülür. 29 Şubat, Şubat'ın son günü sayılır; artık yılları kapsayan süreler dürüst kalır.",
      },
      {
        q: "“90 gün ekle” iş günü mü demek?",
        a: "Hayır — gün sayısı, hafta sonları dahil takvim günüdür. İş günü sayan sözleşme tarihleri için kabaca her hafta için 5 gün ekle (ilk yaklaşım) ya da özel bir iş günü aracı kullan.",
      },
      {
        q: "Girdiğim tarihler bir yere gönderiliyor mu?",
        a: "Hayır. Her iki mod da tamamen tarayıcında JavaScript tarih aritmetiğiyle çalışır; hiçbir şey yüklenmez ve hiçbir şey saklanmaz.",
      },
    ],
  },
  "qr-generator": {
    name: "QR Kod Üretici",
    tagline:
      "Herhangi bir metni veya URL'yi jilet gibi bir QR koda çevir — ayarlanabilir boyut, renkler ve hata düzeltme seviyesiyle — PNG veya SVG olarak indir.",
    intro: [
      "Bir bağlantı, bir Wi-Fi şifresi, telefon numarası veya herhangi bir metni yapıştır ve QR kodun 768 px'e kadar canlı çizilişini izle. L (%7)'den H (%30)'a hata düzeltme seviyesi seç; kod, küçük basıldığında veya kısmen örtüldüğünde bile okunur; markana uyan kod ve zemin renklerini seç.",
      "Kodlama tamamen tarayıcında qrcode kütüphanesiyle çalışır — görsel cihazında üretilir ve asla yüklenmez. Ekranlar için PNG ya da baskı için çözünürlükten bağımsız SVG indir.",
    ],
    steps: [
      "Kodlanacak metni veya URL'yi yaz veya yapıştır.",
      "Boyutu, hata düzeltme seviyesini ve iki rengi ayarla.",
      "Sonucu PNG (ekranlar) veya SVG (baskı, her boyut) olarak indir.",
    ],
    faqs: [
      {
        q: "Hangi hata düzeltme seviyesini seçmeliyim?",
        a: "M (%15) günlük kullanımın varsaylanıdır. Kumaşa, çıkartmaya veya kalabalık zeminlere basılacak kodlar için ya da ortaya bir logo koyacaksan H (%30) seç — seviye yükseldikçe kod, daha fazla hasara dayanır.",
      },
      {
        q: "QR kodların süresi doluyor mu, takip içeriyor mu?",
        a: "Hayır. Bunlar statik kodlardır: kodlanan metin desenin içinde yaşar ve arkasında hiçbir servis olmadan sonsuza dek çalışır. Yönlendirme yok, tarama sayacı yok, analitik yok — veri, senin yazdığınla sınırlıdır.",
      },
      {
        q: "Metnim veya URL'im bir yere yükleniyor mu?",
        a: "Hayır. qrcode kütüphanesi tarayıcının içinde çalışır ve yerel bir canvas'a çizer; ne metin ne de üretilen görsel asla cihazından çıkmaz.",
      },
    ],
  },
  "barcode-generator": {
    name: "Barkod Üretici",
    tagline:
      "Taranabilir CODE128, EAN-13 ve UPC-A barkodları ayarlanabilir çubuk genişliği ve yüksekliğiyle oluştur — vektörel SVG çıktı, tarayıcında çizilir.",
    intro: [
      "Bir değer yaz, bir semboloji seç ve altında isteğe bağlı insan okur satırıyla perakendeye hazır bir barkod al. CODE128, stok etiketleri için her harfi, rakamı ve simgeyi halleder; EAN-13 ve UPC-A, ürün ambalajı için kontrol hanesini doğrular ve otomatik tamamlar.",
      "Çizim, tarayıcının içinde JsBarcode kütüphanesini kullanır ve ölçeklenebilir bir SVG verir; aynı dosya 12 mm'lik bir etikete de A4 bir sayfaya da net basılır. Hiçbir şey yüklenmez ve hiçbir kod saklanmaz.",
    ],
    steps: [
      "Barkod değerini gir — CODE128 için harfler/rakamlar, EAN-13 için 12 hane, UPC-A için 11.",
      "Biçimi seç ve çubuk genişliği ile yüksekliğini ayarla.",
      "Baskı için SVG'yi indir veya tasarım aracına aktar.",
    ],
    faqs: [
      {
        q: "EAN-13 girdim neden reddediliyor?",
        a: "EAN-13 tam olarak 12 hane ister (13. kontrol hanesi otomatik hesaplanır) ya da geçerli son kontrol hanesiyle 13 hanenin tamamını. UPC-A benzer şekilde 11 hane ister. Harfler, boşluklar veya yanlış hane sayısı, kütüphanenin hata mesajıyla reddedilir.",
      },
      {
        q: "Perakende ürünleri için hangi biçimi kullanmalıyım?",
        a: "Dünyanın çoğunda EAN-13, ABD ve Kanada'da UPC-A — ikisi de kasa tarayıcılarının beklediği GS1 perakende standartlarıdır. GS1 numarası olmayan iç stok, varlık ve kargo etiketleri için CODE128 kullan.",
      },
      {
        q: "Çıktının çözünürlüğü nedir?",
        a: "İndirme vektörel bir SVG'dir; bulanmadan herhangi bir DPI'a ölçeklenir. Yerleştirirken sessiz bölgeleri (her iki yandaki boş kenar boşlukları) bozulmamış tut — kırpılmaları, okunamayan taramaların en yaygın nedenidir.",
      },
    ],
  },
  "color-picker": {
    name: "Renk Seçici",
    tagline:
      "Renk paletinden seç ya da EyeDropper API ile doğrudan ekranından al — hex, RGB ve HSL tek tıkla kopyalanır.",
    intro: [
      "Görsel olarak bir renk kurmak için palete tıkla ya da — Chromium tabanlı tarayıcılarda — ekranda duran herhangi bir pikseli örneklemek için Ekrandan seç'i kullan. Seçilen değer aynı anda hex, rgb() ve hsl() olarak görünür; her birinin kendi kopyala düğmesi vardır.",
      "Örnekleme, tarayıcının yerleşik EyeDropper API'sini kullanır ve pikseli yerel okur; hiçbir şey kaydedilmez, yüklenmez, saklanmaz. API'nin olmadığı tarayıcılarda palet girişi her şeyi çalışır tutar.",
    ],
    steps: [
      "Renk paletine tıklayıp bir renk seç ya da varsa Ekrandan seç'i kullan.",
      "Önizlemenin altındaki hex, RGB ve HSL değerlerini oku.",
      "İhtiyacın olan biçimin yanındaki Kopyala'ya tıkla.",
    ],
    faqs: [
      {
        q: "“Ekrandan seç” neden görünmüyor?",
        a: "EyeDropper API şu anda Chromium tabanlı tarayıcılarda (Chrome, Edge, Brave, Opera) mevcuttur. Firefox ve Safari henüz sunmuyor; o tarayıcılarda yalnızca palet girişi görünür — geri kalan her şey aynı şekilde çalışır.",
      },
      {
        q: "Hex, RGB ve HSL arasındaki fark nedir?",
        a: "Aynı rengi üç yolla anlatırlar: hex, kırmızı-yeşil-maviyi CSS ve tasarım araçları için #RRGGBB'ye paketler; rgb() üç kanalı sayısal belirtir; hsl() ton, doygunluk ve parlaklık verir; paletler ve hover durumlarını elle kurmak için daha kolaydır.",
      },
      {
        q: "Ekran örneklemesi gizli mi?",
        a: "Evet. EyeDropper API bir sistem seçici gösterir ve yalnızca tıkladığın tek pikseli döndürür; okuma tarayıcında olur ve hiçbir ekran görüntüsü, geçmiş veya değer iletilmez ya da saklanmaz.",
      },
    ],
  },
  "color-converter": {
    name: "Renk Dönüştürücü",
    tagline:
      "Bir rengi hex, rgb() veya hsl() olarak yapıştır; üç biçimi de artı tasarım sistemine hazır bir tente-gölge satırı al.",
    intro: [
      "Ona #0071e3, rgb(0, 113, 227) veya hsl(211, 100%, 45%) ver — ayrıştırıcı biçimi otomatik algılar ve hex, RGB ve HSL'i bir kerede verir; her biri tek tıkla kopyalanır.",
      "Değerlerin altında bir tente-gölge satırı, rengini beyaz ve siyahla %20/40/60/80 adımlarında harmanlar: anında hover durumları, kenarlıklar ve karanlık mod varyantları — tasarım aracı açmadan.",
    ],
    steps: [
      "Bir rengi üç biçimden herhangi biriyle yapıştır — hex, rgb() veya hsl().",
      "Dönüştürülmüş değerleri oku ve ihtiyacın olanı kopyala.",
      "Tente ve gölgeleri aşağıdaki palet satırından al.",
    ],
    faqs: [
      {
        q: "HSL, RGB'ye nasıl dönüştürülür?",
        a: "Standart Silindirik–RGB eşlemesiyle: kromatiklik c = (1 − |2L − 1|) × S, ton sektörüne göre belirlenen ara bir x, sonra her kanal m = L − c/2 kadar kaydırılır. Matematik ders kitabı formülleridir; sonuçlar tasarım araçlarıyla eşleşir.",
      },
      {
        q: "Renk kodum neden geçersiz görünüyor?",
        a: "Kabul edilen biçimler #RGB / #RRGGBB, rgb(r, g, b) ve hsl(h, s%, l%). Kanallar aralıkta olmalıdır (RGB için 0–255, ton için 0–360, geri kalanı için %0–100) ve her parça virgül veya boşlukla ayrılmalıdır.",
      },
      {
        q: "Tenteler ve gölgeler ne işe yarar?",
        a: "Tenteler (beyazla harmanlanan) hover zeminleri, rozetler ve kartlar yapar; gölgeler (siyahla harmanlanan) basılı durumları, kenarlıkları ve karanlık mod yüzeylerini. Her ikisini tek bir marka renginden türetmek, her arayüz durumunu görsel olarak tutarlı tutar.",
      },
    ],
  },
  "timestamp-converter": {
    name: "Unix Zaman Damgası Çevirici",
    tagline:
      "Unix saniye veya milisaniyeleri insan tarihine ve geriye çevir — canlı saat, yerel saat dilimi ve UTC çıktısıyla — tamamen tarayıcında.",
    intro: [
      "Canlı bir sayaç, güncel Unix zaman damgasını saniye ve milisaniye olarak tek tıkla kopyalanabilir gösterir. Bir zaman damgası yapıştır; yerel saatine ve UTC'ye çözülür — 10 haneli değerler saniye, 13 haneli değerler milisaniye sayılır, otomatik olarak.",
      "Ters yönde, bir tarih ve saat seçip tam zaman damgasını al. Her şey cihaz saatinden yerel hesaplanır; zaman damgaları tanım gereği saat diliminden bağımsızdır, sayılar dünyanın her yerinde aynıdır.",
    ],
    steps: [
      "Canlı güncel zaman damgasını kopyala ya da çözme alanına bir tane yapıştır.",
      "Yerel ve UTC insan tarihlerini oku; saniye mi milisaniye mi olduğu otomatik algılanır.",
      "Ya da Unix zaman damgasını saniye ve milisaniye olarak almak için bir tarih-saat seç.",
    ],
    faqs: [
      {
        q: "Unix zaman damgası tam olarak nedir?",
        a: "1970-01-01 00:00:00 UTC'den beri geçen saniye sayısı; artık saniyeler sayılmaz. Bilgisayarların zaman noktalarını saklamasının standart yoludur; sıralama ve çıkarma basit hale gelir. Milisaniye zaman damgaları (13 hane), JavaScript ve Java'da yaygındır.",
      },
      {
        q: "Araç, sayımın saniye mi milisaniye mi olduğunu nasıl bilir?",
        a: "Büyüklüğe göre: 1 trilyonun altındaki değerler milisaniye olarak modern bir tarihi anlatamaz, bu yüzden saniye okunur; 13 haneli değerler milisaniye okunur. Sonuç, hangi yorumun uygulandığını belirtir.",
      },
      {
        q: "Aynı zaman damgası başka saat dilimlerinde farklı mı çözülür?",
        a: "Ham sayı asla değişmez — mutlak bir anı kodlar. Yalnızca insan okur gösterim farklıdır; bu yüzden araç yerel saatini ve UTC'yi yan yana gösterir.",
      },
    ],
  },
  "tip-calculator": {
    name: "Bahşiş Hesaplayıcı",
    tagline:
      "Hesap artı bahşiş yüzdesi artı arkadaşlar arasında bölüşme: bahşişi, toplamı ve herkesin borcunu tam olarak gör — canlı, masada matematik yok.",
    intro: [
      "Hesabı gir, hazır bir bahşişe dokun (%10/15/18/20/25) veya kendin yaz ve kaç kişi bölüşüyor söyle. Bahşiş tutarını, genel toplamı ve kişi başı payı anında alır; garson beklerken kimse kafadan hesap yapmaz.",
      "Sayılar değiştikçe her şey canlı yeniden hesaplanır, her para birimi için çalışır ve tamamen cihazında çalışır — yurt dışında, kendi veri bağlantının tek güvenilir olduğu yerde pratiktir.",
    ],
    steps: [
      "Hesap tutarını yaz.",
      "Bir bahşiş ön ayarı seç veya özel bir yüzde gir.",
      "Kişi sayısını ayarla ve kişi başı payı oku.",
    ],
    faqs: [
      {
        q: "Ne kadar bahşiş vermeliyim?",
        a: "Bulunduğun yere bağlıdır: ABD'de vergi öncesi hesabın %15–20'si adettir; Avrupa ve Latin Amerika'nın çoğunda %10–15; bahşişin beklenmediği Japonya ve Çin'de yukarı yuvarlamak normaldir. Şüphedeysen %10'luk bir ön ayar neredeyse her yerde seni güvende tutar.",
      },
      {
        q: "Bahşiş vergiden önce mi sonra mı hesaplanmalı?",
        a: "Klasik görgü kuralları vergi öncesi tutar üzerinden bahşiş der ama pratikte çoğu insan, fişin gösterdiği toplam üzerinden bahşiş verir. Kesin olmak istersen hesap olarak vergi öncesi rakamı gir ve vergiyi bölüşmeye ayrıca ekle.",
      },
      {
        q: "Kişi başı tutar eşit bölüşmeyi varsayıyor mu?",
        a: "Evet — hesap artı bahşiş, kişi sayısına eşit bölünür. Eşit olmayan paylar için (biri yalnızca salata yedi), paylaşılan kalemleri önce ara toplam olarak hesapla ve bireysel kalemleri üstüne ekle.",
      },
    ],
  },
  "fuel-cost-calculator": {
    name: "Yakıt Maliyeti Hesaplayıcı",
    tagline:
      "Mesafe, tüketim ve pompa fiyatı gir: gereken yakıt, yolculuk maliyeti ve kilometre ya da mil başına maliyet çıkar — metrik veya imparatorluk, gidiş-dönüş dahil.",
    intro: [
      "Yola çıkmadan önce her sürüşü planla: mesafeyi, arabanın tüketimini (L/100 km veya MPG) ve güncel yakıt fiyatını gir; gereken litre veya galonu, toplam maliyeti ve mesafe birimi başına maliyeti gör — artı mesafeyi senin için ikiye katlayan gidiş-dönüş anahtarı.",
      "Günlük işe gidiş bütçeleri için, bir yolculuğu arkadaşlar arasında bölmek için veya bir dolanmanın bedelini karşılaştırmak için eşit derecede iyi çalışır. Matematik, tarayıcının içinde çalışır; benzinlikte sinyal yokken bile çalışır.",
    ],
    steps: [
      "Tek yön mesafesini kilometre veya mil olarak gir.",
      "Aracının tüketimini ve güncel yakıt fiyatını ekle.",
      "Gerekiyorsa gidiş-dönüş anahtarını aç ve yakıt ile maliyet toplamlarını oku.",
    ],
    faqs: [
      {
        q: "L/100 km ile MPG arasında nasıl dönüşüm yaparım?",
        a: "İki ölçek birbirinin tersidir: MPG rakamına bölünen 235,2 L/100 km verir (ABD galonu); 30 MPG ≈ 7,8 L/100 km ve 6 L/100 km ≈ 39,2 MPG. Hesaplayıcı, göstergenin hangi rakamı gösterdiğini alır.",
      },
      {
        q: "Gerçek dünyadaki yakıt tüketimim sonuçtan neden farklı?",
        a: "Resmî tüketim rakamları sabit hızlar varsayar. Şehir trafiği, soğuk çalıştırma, tavan rafı, agresif hızlanma ve klima, gerçek kullanımı %10–30 yukarı çekebilir; şehir ağırlıklı yolculuklarda tahmini bir taban olarak gör.",
      },
      {
        q: "Hesaplayıcı köprü geçişlerini veya bakımı dâhil ediyor mu?",
        a: "Hayır — yalnızca yakıtı fiyatlara. Gerçek kilometre başına maliyet için köprü geçişlerini ekle ve aşınma kalemlerini (lastikler, bakım, değer kaybı) ayrıca böl; birçok sürücü, yakıtın ötesinde kilometre başına 5–10 sent daha bütçeler.",
      },
    ],
  },
  "aspect-ratio-calculator": {
    name: "En-Boy Oranı Hesaplayıcı",
    tagline:
      "16:9 gibi bir oran ve bir boyut verildiğinde eksik genişlik veya yüksekliği anında al — video ve tasarım için 1:1'den 21:9'a ön ayarlar.",
    intro: [
      "Bir oran gir — bir ön ayara dokun (1:1, 4:3, 3:2, 16:9, 16:10, 21:9) veya özel sayılar yaz — sonra bilinen bir genişlik veya yükseklik ver. Eksik boyut anında belirir; G×Y olarak biçimlenmiş çiftle birlikte ve ondalık oranla.",
      "Bozulmadan yeniden boyutlandırmanın klasiği: video kırpmaları, duyarlı görsel kapları, sensör ve film biçimleri, baskı ölçekleme ve CSS object-fit kararları burada yaşar; yazdıkça yerel hesaplanır.",
    ],
    steps: [
      "Bir oran ön ayarı seç ya da kendi genişlik:yükseklik değerlerini yaz.",
      "Hangi boyutu bildiğini seç — genişlik veya yükseklik.",
      "Bilinen değeri gir ve eksik boyutu oku.",
    ],
    faqs: [
      {
        q: "Eksik boyut nasıl hesaplanır?",
        a: "Doğrudan orantıyla: bilinen boyut × (hedef kenar ÷ eşleşen oran kenarı). 16:9 için genişlik 1920 iken yükseklik = 1920 × 9 ÷ 16 = 1080. Sonuç yuvarlanmış olarak, kesin ondalık altında gösterilir.",
      },
      {
        q: "16:9 ve 16:10 ekranlarda neden bu kadar önemli?",
        a: "16:9 videoya (1920×1080, 3840×2160) ve çoğu monitöre uyar; 16:10, dokümanlar ve kod için dikey alan ekler (1920×1200). Yanlışını seçmek, siyah bantlar veya gerdirilmiş pikseller demektir — bu araç her oranın ne ürettiğini tam gösterir.",
      },
      {
        q: "Ondalık veya alışılmadık oranlar kullanabilir miyim?",
        a: "Evet. Her iki oran alanı da herhangi bir pozitif sayıyı kabul eder; 2,39:1 sinema scope, 1,85:1, dikey sosyal kırpmaları için 4:5 veya 1,5:1 gibi sensör boyutları çalışır — orantı matematiği aynıdır.",
      },
    ],
  },
  "compound-interest-calculator": {
    name: "Bileşik Faiz Hesaplayıcı",
    tagline:
      "Tasarrufların bileşik faizle nasıl büyüdüğünü gör — bir anapara, aylık katkı ve oran gir; nihai bakiyeyi ve yıl yıl tabloyu al.",
    intro: [
      "Bileşik faiz, faizin faizidir: her dönem bakiye yıllık oranın bir payını kazanır ve eklediğin her anapara kendi faizini kazanmaya başlar. Bu hesaplayıcı, o özyinelemeyi dönem dönem yürütür — bir başlangıç anaparası ve düzenli aylık katkılarla, aylık, üç aylık veya yıllık bileşikle.",
      "Sonuç, nihai bakiye, yatırdığın toplam ve bileşiklemenin ürettiği faizdir — artı eğrinin ne zaman kırılmaya başladığını tam görebileceğin yıl yıl bir tablo. Her şey canlı yeniden hesaplanır ve kullanılan formül, rakamların hemen altında basılır; bankanın kendi projeksiyonuyla karşılaştırırsın.",
    ],
    steps: [
      "Başlangıç anaparasını ve her ay ekleyeceğin tutarı gir (tek seferlik anapara için 0).",
      "Yıllık faiz oranını, yıl sayısını ve faizin ne sıklıkla bileşik uygulandığını ayarla.",
      "Bir gösterim para birimi seç — tutarlar yerel ayarına göre biçimlenir.",
      "Nihai bakiyeyi, toplam katkıyı ve kazanılan faizi oku, sonra yıl yıl tabloyu kontrol et.",
    ],
    faqs: [
      {
        q: "Hesaplayıcı hangi formülü kullanır?",
        a: "Bankaların tasarruf projeksiyonunda kullandığı bakiye özyinelemesi: her dönem, bakiye ← (bakiye + katkı) × (1 + r); r = yıllık oran ÷ yıl başına dönem (aylık için 12, üç aylık için 4, yıllık için 1). Katkılar her dönemin başında yatırılır; o dönemden itibaren faiz kazanır. Örnek: 10.000 başlangıç, %5 ile ayda 100, 10 yıl, aylık bileşik; 32.063,02 nihai bakiye — 22.000,00 katkı ve 10.063,02 faiz.",
      },
      {
        q: "Diğer hesaplayıcılarda neden hafif farklı sonuç alıyorum?",
        a: "Zamanlama gelenekleri farklıdır. Bazı araçlar katkıları dönem sonunda yatırım sayar (geldikleri dönemde faiz kazanmazlar), bazıları günlük bileşik varsayar, bazıları her dönemi yuvarlar. Bu araç, her dönemin başında yatırır ve ara adımları asla yuvarlamaz; başka bir siteye karşı %0,1'lik fark genellikle o gelenektir, hata değildir.",
      },
      {
        q: "Vergi, masraf veya enflasyonu dâhil ediyor mu?",
        a: "Hayır — sonuç, girdiğin oranda nominal büyümedir. Faiz vergileri, hesap masrafları ve enflasyon, gerçek getirinin tamamını düşürür; nihai bakiyeyi, gerçekte elinde kalacak miktarın üst sınırı olarak gör.",
      },
    ],
  },
  "random-name-picker": {
    name: "Rastgele İsim Seçici",
    tagline:
      "Listeni yapıştır, çarkı çevir ve kazananı kriptografik olarak rastgele bir çekilişin belirlemesine izin ver — sınıflar, çekilişler ve ekip toplantıları için adil.",
    intro: [
      "Bir isim listesi yaz veya yapıştır, satır başına bir isim; çark, her biri için renkli bir dilimle dolar. ÇEVİR'e bas ve birkaç saniye içinde yavaşlayıp kazanan üzerine düşer; büyük puntoyla duyurulur, yanında kopyala düğmesi. İki seçenek her zamanki ihtiyaçları kapsar: çekilişten önce yinelenen isimleri kaldır ve her çekilişten sonra kazananı çıkar, kimse iki kez kazanmasın.",
      "Seçimin kendisi animasyon değildir — kazanan, çark daha başlamadan tarayıcının kriptografik rastgele sayı üreticinden çekilir; her ismin şansı tam olarak eşittir. Oturum çekiliş geçmişi, şimdiye kadar seçilen herkesi tutar; bir sınıfı veya ödül kuyruğunu ilerletirken pratiktir.",
    ],
    steps: [
      "İsimlerini kutuya yapıştır, satır başına bir isim (2 ile 100 isim).",
      "Gerekiyorsa yinelenen silmeyi veya geçmiş kazananları çıkarmayı aç/kapat.",
      "ÇEVİR'e bas ve çarkın durmasını bekle.",
      "Kazananı oku, gerekirse ismi kopyala ve aşağıdaki çekiliş geçmişine bak.",
    ],
    faqs: [
      {
        q: "Çekiliş gerçekte ne kadar rastgele?",
        a: "Kazanan, crypto.getRandomValues ile — tarayıcının kriptografik rastgele sayı üreteciyle — modül yanlılığını önleyen reddetme örneklemesi kullanılarak seçilir. Tarayıcıların güvenlik anahtarlarında kullandığı kaynağın aynısıdır, sözde rastgele bir kısayol değil; her girişin şansı özdeştir. Çark animasyonu, çoktan çekilmiş kazananın üzerine düşer; sonucu değiştiremez.",
      },
      {
        q: "Çark kaç isim tutabilir?",
        a: "2'den 100'e kadar. İsimler, dilimlerin okunur kalması için çarkta üç noktayla kırpılır ama kazanan kartı daima tam adı gösterir. Kabaca 60 isimden sonra etiketler çarktan tamamen kalkar — çekilişin kendisi yine kesindir.",
      },
      {
        q: "Art arda birden fazla kazanan çekebilir miyim?",
        a: "Evet. “Her kuraldan sonra kazananı çıkar” seçeneğini etkinleştir; her seçim listeden otomatik düşer, kimse iki kez seçilmez. Aşağıdaki geçmiş paneli, bu oturumdaki her çekilişi sırayla ve zaman damgasıyla kaydeder.",
      },
    ],
  },
  "qr-scanner": {
    name: "QR Kod Tarayıcı",
    tagline:
      "QR kodu herhangi bir görselden veya doğrudan kamerandan çöz — tarayıcında yerel okunur, kopyala ve bağlantı olarak aç çıktısıyla, hiçbir şey yüklenmez.",
    intro: [
      "Bir QR kodun ekran görüntüsünü veya fotoğrafını bırak; çözücü onu sayfanın üzerinde okur ve algılanan köşeleri görselin üstünde vurgular. Bir URL ise kopyala düğmesi artı tek tıkla bağlantıyı aç alırsın; diğer her içerik — Wi-Fi kimlik bilgileri, vCard'lar, düz metin — kodlandığı gibi çıkar, kopyalamaya hazır.",
      "Kameranı koda mi doğrultmak istiyorsun? Canlı mod, yerel bir video öğesine akar ve bir kare çözülünceye dek kareleri bellekte analiz eder, sonra kamerayı hemen durdurur. Her iki yol da tamamen tarayıcında çalışır; görsel veya kamera akışı asla bir sunucuya yüklenmez ve hiçbir şey kaydedilmez.",
    ],
    steps: [
      "“Görselden” sekmesini seç ve QR kodun resmini bırak ya da “Canlı kamera”ya geç.",
      "Kamera için Kamera'yı başlat'a bas, izin penceresine izin ver ve koda doğrult.",
      "Sonuç kartında çözülen metni oku.",
      "Kopyala ya da bir bağlantıya benziyorsa doğrudan aç.",
    ],
    faqs: [
      {
        q: "Görsellerim veya kamera karelerim cihazımdan çıkar mı?",
        a: "Hayır. Çözme, jsqr kütüphanesiyle bu sayfada JavaScript olarak çalışır: yüklenen görseller yerel piksellerinden okunur, kamera kareleri bellek içi bir canvas'a çizilip orada analiz edilir. Hiçbir şey yüklenmez, günlüğe yazılmaz, saklanmaz; kamera akışı, bir kod bulunur bulunmaz veya durdur'a bastığında durur.",
      },
      {
        q: "Kamera başlamıyor — sorun ne?",
        a: "Çoğu zaman tarayıcı bu site için kamera iznini engellemiştir; adres çubuğundan izin ver ve yeniden başlat. Canlı tarama ayrıca güvenli bir https sayfası gerektirir ve cihazda hiç kamera yoksa araç sessizce başarısız olmak yerine bunu söyler.",
      },
      {
        q: "Hangi QR içeriklerini okuyabilir?",
        a: "Her standart QR kodu: URL'ler, düz metin, telefon numaraları, Wi-Fi katılım dizgileri, vCard kişileri, ödeme dizgileri ve dahası. Araç ham çözülmüş içeriği gösterir — Wi-Fi veya ödeme kodları için metni, o biçimi tüketen uygulamaya kopyala.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* Geliştirici / Araçlar — CSV ⇄ Excel, kontrast, not                  */
  /* ------------------------------------------------------------------ */
  "csv-to-excel": {
    name: "CSV'den Excel'e",
    tagline:
      "CSV'yi doğrudan tarayıcınızda gerçek bir .xlsx dosyasına dönüştürün — virgül, noktalı virgül veya sekme otomatik algılanır, tırnaklar ve satır sonları korunur.",
    intro: [
      "CSV'yi yapıştırın veya bir .csv dosyası bırakın ve gerçek bir Excel çalışma kitabı indirin — uzantısı değiştirilmiş metin dosyası değil. Motor RFC 4180'e uyar: tırnaklı alanlar, çiftlenmiş tırnaklar ve hücre içi satır sonları doğru okunur; temiz sayılar (9.5, -3, 0) gerçek sayı hücrelerine dönüşür.",
      "İlk satır başlık sayılır (kapatılabilir; o zaman Column 1…N üretilir), sayfa adı serbesttir ve 007 gibi kimlikler baştaki sıfırları korumak için metin kalır. Hiçbir veri cihazınızdan çıkmaz.",
    ],
    steps: [
      "CSV'yi giriş kutusuna yapıştırın veya bir .csv dosyası bırakın.",
      "Algılanan ayırıcıyı ve başlık satırı seçeneğini kontrol edin.",
      "Sheet1 size göre değilse sayfa adını değiştirin.",
      ".xlsx'i indirin ve Excel, Numbers veya Google Sheets'te açın.",
    ],
    faqs: [
      {
        q: "Sayılarım Excel'de gerçek sayıya dönüşecek mi?",
        a: "Evet — temiz sayısal değerler (9.5, -3, 0) sayı hücresi olarak yazılır; böylece TOPLA ve grafikler hemen çalışır. 007 veya 1e3 gibi değerler bilinçli olarak metin kalır, çünkü dönüştürmek anlamlarını değiştirirdi.",
      },
      {
        q: "CSV'im noktalı virgülle ayrılmış, bir şey ayarlamam gerekir mi?",
        a: "Hayır. Ayırıcı, tırnak dışındaki adaylar sayılarak otomatik bulunur; elle seçmek de mümkündür. Hücre içi virgüller, çift tırnaklar ve satır sonları dönüşümde aynen korunur.",
      },
    ],
  },
  "excel-to-csv": {
    name: "Excel'den CSV'ye",
    tagline:
      "Herhangi bir .xlsx veya .xls çalışma kitabını temiz CSV'ye çevirin: sayfayı ve ayırıcıyı seçin, indirin. Tırnak, virgül ve satır sonları doğru şekilde kaçışlanır.",
    intro: [
      "Bir .xlsx, .xlsm veya .xls dosyası bırakın ve RFC 4180 uyumlu standart CSV alın. Kitapta birden çok sayfa varsa dışa aktarılacak sayfayı seçersiniz — CSV birden çok sayfayı depolayamadığı için sayfa başına bir dosya en dürüst eşlemedir. Sayılar, tablonun gösterdiği değerle çıkar.",
      "Çıktı yalnızca gerektiren hücrelere tırnak koyar, iç tırnakları çiftler ve hücre içi satır sonlarını korur; sonuç Excel'e, veritabanlarına ve betiklere sürprizsiz geri aktarılır. Doğrudan kopyalayın ya da Excel'in açabileceği UTF-8 (BOM'lu) dosya olarak indirin.",
    ],
    steps: [
      ".xlsx, .xlsm veya .xls dosyanızı bırakma alanına sürükleyin.",
      "Birden çok sayfa varsa dışa aktarılacak olanı seçin.",
      "Çıkış ayırıcısı olarak virgül, noktalı virgül veya sekme seçin.",
      "CSV'yi kopyalayın veya UTF-8 .csv olarak indirin.",
    ],
    faqs: [
      {
        q: "Hangi sayfa dönüştürülüyor?",
        a: "Varsayılan olarak ilki. Kitapta birden çok sayfa varsa önizlemenin üstünde bir seçici görünür; her dışa aktarma tam olarak bir sayfayı kapsar, çünkü CSV biçimi birden çok sayfayı saklayamaz.",
      },
      {
        q: "Formüllere ve biçimlendirmeye ne olur?",
        a: "Formülleri değil, hücrenin gösterdiği son hesaplanmış değerleri alırsınız. 1.234,50 gösteren bir hücre bu değerle dışa aktarılır; para birimi simgesi gibi biçimler göründüğü gibi kalır.",
      },
    ],
  },
  "contrast-checker": {
    name: "Kontrast Denetleyici",
    tagline:
      "İki renk arasındaki WCAG kontrast oranını normal ve büyük metin için AA ve AAA sonuçlarıyla hesaplayın, canlı önizlemeyle gözünüzle doğrulayın. Tamamen tarayıcınızda çalışır.",
    intro: [
      "Ön plan ve arka plan rengi girin — #333 veya #1F2937 gibi hex, ya da rgb()/rgba() — ve dört önemli eşiğin sonucunu anında görün: normal ve büyük metin için AA ile AAA. Canlı önizlemede bir paragraf ve büyük başlık gerçek renklerle gösterilir.",
      "Hesap, WCAG 2.x'in resmi bağıl parlaklık formülüdür — W3C denetleyicisindekiyle aynı: buradaki 4.5 her yerde 4.5'tir. Ön ayarlar arasında 4.54:1'lik gri bir çift vardır; AA eşiğinin ne kadar dar olduğunu gösterir.",
    ],
    steps: [
      "Ön plan için hex veya rgb() değeri yazın ya da renk seçiciyi kullanın.",
      "Aynısını arka plan rengi için yapın.",
      "Oranı ve AA / AAA sonuçlarını okuyun ya da bir ön ayara dokunun.",
      "Önizleme bloğuna bakıp uyumu kendi gözünüzle değerlendirin.",
    ],
    faqs: [
      {
        q: "Geçmek için hangi kontrast oranı gerekir?",
        a: "WCAG 2.x'e göre normal metin AA için 4.5:1, AAA için 7:1 ister. Büyük metin — en az 24 px ya da 18.7 px kalın — AA için 3:1, AAA için 4.5:1 ister. Arayüz bileşenleri ve grafikler 3:1 ister.",
      },
      {
        q: "Oran nasıl hesaplanır?",
        a: "Her renk sRGB'den doğrusallaştırılır ve L = 0.2126·R + 0.7152·G + 0.0722·B bağıl parlaklığına indirgenir; oran (açık L + 0.05) / (koyu L + 0.05) olur. Bu, WCAG 2.x şartnamesindeki formülün ta kendisidir. 1'in altındaki rgba() alfası hesap öncesi beyaza düzleştirilir.",
      },
    ],
  },
  "grade-calculator": {
    name: "Not Hesaplayıcı",
    tagline:
      "Ağırlıklı veya puanlı not hesaplayıcı: ödevleri ekleyin, mevcut not ve harfinizi canlı izleyin ve final sınavında tam kaç almanız gerektiğini öğrenin.",
    intro: [
      "Her ödevi puanı, yüksekliği ve (ağırlıklı modda) yüzde ağırlığıyla ekleyin; mevcut ortalama ve harf canlı güncellenir. Puanlı mod yalnızca alınan puanın toplam puana oranına bakar — birçok fen dersi böyle notlar.",
      "Yerleşik final hesaplayıcı asıl soruyu yanıtlar: final X% veya X puan değiyorsa hedefe ulaşmak için kaç almalısınız? Hedefin çoktan garantide mi yoksa matematiksel olarak ulaşılamaz mı olduğunu açıkça söyler; ölçek değiştirilebilir: 10'luk A–F, artı/eksi, geçti/kaldı ya da kendi eşikleriniz.",
    ],
    steps: [
      "Her ödev için satır ekleyin: ad (isteğe bağlı), puan, yükseklik ve ağırlıklı modda ağırlık.",
      "Kursunuz nasıl notluyorsa Ağırlıklı ile Puanlı arasında geçiş yapın.",
      "Finalin ağırlığını veya puanını ve hedef genel yüzdenizi girin.",
      "Gereken final notunu okuyun ya da istediğiniz harf ölçeğini seçin.",
    ],
    faqs: [
      {
        q: "Ağırlıklı ve puanlı mod arasındaki fark nedir?",
        a: "Ağırlıklı mod her ödeve yüzde ağırlık verir ve Σ(ağırlık × puan ÷ yükseklik) ÷ Σağırlık hesaplar. Puanlı mod ağırlıkları yok sayar: alınan puan bölü toplam puan. 90/100 bir ödev puanlı modda 45/50 bir quize eşittir; ağırlıklıda yalnızca ağırlığı kadar değerlidir.",
      },
      {
        q: "Ağırlıklarım 100% etmiyorsa ne olur?",
        a: "Sorun değil. Mevcut ortalama gerçekten girdiğiniz ağırlıklara göre normalize edilir; yarı notlanmış bir ders bile adil bir sayı gösterir. Final hesabı sınavın ağırlığını ölçülmüş ağırlığın üstüne koyar — müfredatın öngördüğü gibi. %100 üstü hedefin ulaşılmaz, negatif sonucun hedefin çoktan garanti olduğunu gösterir.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* Görsel                                                              */
  /* ------------------------------------------------------------------ */
  "image-border": {
    name: "Görsel Çerçeve",
    tagline:
      "Tek bir görsele ya da bütün bir yığına düz renkli veya saydam kenarlık ekleyin — canlı önizleme, PNG veya JPG çıktı, tamamen tarayıcınızda çalışır.",
    intro: [
      "Kenarlık, ekran görüntülerini, ürün karelerini ve avatarları editör açmadan çerçeveler. Tek görsel ya da bütün bir yığın bırakın, genişlik kaydırıcısını sürükleyin ve dolgu stilini seçin: tuval dışa doğru büyür, orijinalin tek bir pikseli bile kırpılmaz ya da yeniden ölçeklenmez.",
      "Saydam dolgu, PNG çıktısında çerçeveyi transparan tutar — her arka planda kullanılan çıkartmalar ve kesikler için pratik. Düz renk her yerde iş görür, JPG dahil; her dosya cihazınızda işlenir.",
    ],
    steps: [
      "Tek bir görsel ya da bütün bir yığın bırakın.",
      "Kenarlık genişliği kaydırıcısını sürükleyin ve canlı önizlemeyi izleyin.",
      "Saydam dolgu ya da düz renk, ve PNG ya da JPG çıktı seçin.",
      "Tüm görsellere kenarlık ekleyin ve her sonucu indirin — ya da hepsini tek ZIP alın.",
    ],
    faqs: [
      {
        q: "Kenarlık görselimi küçültür ya da kırpar mı?",
        a: "Hayır. Tuval, kenarlık genişliğinin iki katı büyür — her yana bir kenarlık — ve görseliniz tam boy içinde yer alır. Hiçbir şey kırpılmaz, ölçeklenmez ya da kaydırılmaz.",
      },
      {
        q: "Saydam kenarlığı ne zaman seçmeliyim?",
        a: "Saydam dolgu yalnızca PNG çıktısında anlam taşır: çerçeve transparan kalır, görsel her arka planda çalışır. JPG'nin alfa kanalı yoktur; orada kenarlık seçtiğiniz düz renkle doldurulur.",
      },
      {
        q: "Saydam dolguda JPG neden yok?",
        a: "JPG saydamlığı saklayamaz — kaydettiğinizde çerçeve beyaza dönerdi. Araç, saydam dolgu seçildiğinde kendiliğinden PNG'ye geçer; JPG istiyorsanız Renk seçeneğini seçin.",
      },
    ],
  },
  "image-splitter": {
    name: "Görsel Bölme",
    tagline:
      "Tek bir görseli satır × sütunluk düzgün bir PNG parça ızgarasına dilimleyin — canlı ızgara önizlemesi, ZIP indirme, her şey tarayıcınızda yerel işlenir.",
    intro: [
      "Büyük bir görseli Instagram ızgaraları, baskı yerleşimleri, sprite sayfaları ya da sunum adımları için karelere bölün. 2–6 satır ve 2–6 sütun seçin, ızgaranın görselinize oturuşunu izleyin, sonra her parçayı kayıpsız PNG olarak dışa aktarın.",
      "Aynı görselden kesilen parçalar piksel konumlarını korur, böylece mükemmel şekilde yeniden birleşir. Boyut tam bölünmediğinde normal parçalar tam piksel ölçüler kullanır, artan pikselleri son satır ve sütun emer — hiçbir şey gerilmez.",
    ],
    steps: [
      "Tek bir görsel bırakın.",
      "Satır ve sütun sayısını ayarlayın (her biri 2–6) — önizleme ızgarayı gösterir.",
      "Parçalara bölün ve her birini kontrol edin.",
      "Parçaları tek tek ya da hepsini bir ZIP'te indirin.",
    ],
    faqs: [
      {
        q: "Boyut ızgaraya tam bölünmüyorsa ne olur?",
        a: "Normal parçalar floor(genişlik ÷ sütun) × floor(yükseklik ÷ satır) piksel alır, artan pikselleri son satır ve sütun devralır. 305 × 205 bir görseli 3 sütun × 2 satıra bölmek 101 × 102 px parçalar verir; son sütun 103 px genişliğindedir. Her parça tam pikseldir — ne gerilme ne boşluk.",
      },
      {
        q: "Parçalar hangi sırayla adlandırılır?",
        a: "Satır satır, soldan sağa: foto-r1c1.png, foto-r1c2.png … foto-r3c4.png. rNcM eki her parçanın yerini tam söyler; yeniden birleştirmek çocuk oyuncağı.",
      },
      {
        q: "Neden PNG çıktı?",
        a: "PNG kayıpsızdır; parçalar kaynağın pikselini aynen korur. Parçaların yeniden birleştirileceği ya da sprite olarak kullanılacağı durumlarda bu önemlidir.",
      },
    ],
  },
  "crop-circle-image": {
    name: "Dairesel Kırpma",
    tagline:
      "Tek bir görseli ya da bütün bir yığını köşeleri saydam ortalanmış bir daireye kırpın — küçültme kaydırıcısı, canlı önizleme, kayıpsız PNG çıktı, tarayıcınızda.",
    intro: [
      "Yuvarlak avatarlar, profil fotoğrafları, rozetler ve çıkartmalar dairesel kırpma ile başlar. Araç her görselin ortasına bir daire koyar, içindekini korur ve köşeleri saydamlığa atar — çap, kısa kenardan başlar; kenar boşluğu isterseniz kaydırıcı yüzde olarak küçültür.",
      "Çıktı her zaman PNG'dir; böylece köşeler gerçekten saydam olur, beyaz değil. Birçok görseli bir kerede çevirmek için bütün bir yığın bırakın, ilkinin canlı önizlemesine bakın ve her daireyi ayrı ayrı indirin.",
    ],
    steps: [
      "Tek bir görsel ya da bütün bir yığın bırakın.",
      "Daireyi kısa kenarın tamamından küçük isterseniz küçültme kaydırıcısını sürükleyin.",
      "İlk görselin canlı önizlemesini kontrol edin.",
      "Tüm görselleri daireye kırpın ve her PNG'yi indirin.",
    ],
    faqs: [
      {
        q: "Dairenin boyutunu ne belirler?",
        a: "Varsayılan olarak çap, görselin kısa kenarına eşittir: kare görsel tam daireye, dikdörtgen sığan en büyük ortalanmış daireye kırpılır. Küçültme kaydırıcısı bu çapı yüzde olarak düşürür.",
      },
      {
        q: "Köşeler beyaz mı olur?",
        a: "Hayır — çıktı, gerçek alfa kanallı PNG'dir; dairenin dışı tamamen saydamdır ve sonuç her arka planda tertemiz durur.",
      },
      {
        q: "Görselim yeniden kodlanıp kalite kaybeder mi?",
        a: "Dairenin içindeki pikseller olduğu gibi kayıpsız bir PNG'ye kopyalanır. Yalnızca dışarıdaki alan yok olur; içeride hiçbir şey yeniden ölçeklenmez ya da sıkıştırılmaz.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* Geliştirici                                                         */
  /* ------------------------------------------------------------------ */
  "base64-image": {
    name: "Base64 Görsel",
    tagline:
      "Görselleri base64 data URL'lere ve geriye dönüştürün — önizleme, doğrulama, indirme ve tam boy karşılaştırma dahil. Her şey tarayıcınızda çalışır.",
    intro: [
      "Bir PNG, JPEG, GIF, WebP veya SVG bırakın; CSS, HTML veya JSON içine gömülmeye hazır data:image/…;base64,… adresini anında alın. Araç, orijinal dosya boyutunu oluşan metnin boyutunun yanında gösterir; böylece ~%33 base64 şişkinliğini gömmeden önce görürsünüz.",
      "Bir data URL yapıştırın; ters yöndeki görünüm onu çözer: görsel önizlenir, bildirilen MIME gerçek baytlarla karşılaştırılır ve bir indirme düğmesi dosyaya geri kaydeder. Geçersiz base64 ya da görsel olmayan bir tür, bozuk önizleme yerine net bir mesajla başarısız olur.",
    ],
    steps: [
      "Kodlamak için bir görseli panele bırakın (ya da panodan yapıştırın).",
      "Data URL'yi — ya da yalnızca base64 kısmını — kopyalayın ve gömmeden önce boyut karşılaştırmasına bakın.",
      "Çözme sekmesine geçin, herhangi bir görsel data URL'si yapıştırın, sonra önizleyin veya indirin.",
    ],
    faqs: [
      {
        q: "Bir görseli data URL olarak gömmek ne zaman mantıklı?",
        a: "Küçük simgeler, avatarlar ve yükleme yer tutucuları için. Base64 metni ikili dosyadan ~%33 büyük yapar; birkaç kilobaytın altında genelde bir HTTP isteği kazanırsınız, fotoğraflarda ise şişkinlik neredeyse her zaman ağır basar.",
      },
      {
        q: "Base64 sürümü dosyamdan neden büyük?",
        a: "Base64 her 3 baytı 4 metin karakterine kodlar — sabit %33 büyüme, üstüne data:image/…;base64, öneki. Hiçbir şey sıkıştırılmaz ya da kaybolmaz; aynı baytların metin-güvenli gösterimidir yalnızca.",
      },
      {
        q: "Çözücü hangi biçimleri işler?",
        a: "Tarayıcınızın görsel olarak çizebildiği her şey: PNG, JPEG, GIF, WebP, SVG, BMP, AVIF ve fazlası. Araç yükün geçerli base64 olduğunu, bildirilen MIME'nin görsel türü olduğunu doğrular ve dosyanın magic byte'ları bildirilen türle uyuşmadığında uyarır.",
      },
    ],
  },
  "html-to-markdown": {
    name: "HTML'den Markdown'a",
    tagline:
      "Yazarken HTML'yi temiz Markdown'a dönüştürün — başlıklar, listeler, bağlantılar, görseller ve kod; ATX ya da Setext başlıklar, seçtiğiniz madde işareti.",
    intro: [
      "Bir web sayfasından, CMS çıktısından ya da e-postadan gelen işaretlemeyi yapıştırın ve okunabilir Markdown'u anında alın. Dönüşümü, HTML-Markdown standardı turndown kitaplığı üstlenir: başlıklar, vurgular, bağlantılar, görseller, sıralı ve sırasız listeler, alıntılar ve kod bloklarının hepsi Markdown karşılığına eşlenir.",
      "İki küçük seçenek çoğu stil kılavuzunu karşılar: başlıkları ATX (# Başlık) ya da Setext (altı çizili) biçiminde yazdırın ve sırasız listeler için -, * ya da + işaretini seçin. Sonuç, yazdıkça ya da seçenek değiştirdikçe canlı güncellenir.",
    ],
    steps: [
      "HTML'nizi giriş bölmesine yapıştırın.",
      "Markdown canlı oluşur — stil kılavuzunuz başka istiyorsa başlık biçimini ya da madde işaretini değiştirin.",
      "Markdown'u kopyalayın ya da .md dosyası olarak indirin.",
    ],
    faqs: [
      {
        q: "Hangi HTML dönüştürülür, gerisi ne olur?",
        a: "Standart belge işaretlemesi — başlıklar, paragraflar, listeler, bağlantılar, görseller, vurgular, kod, alıntılar ve yatay çizgiler — eksiksiz dönüştürülür. Markdown karşılığı olmayan öğeler, tablolar ve formlar gibi, metin içeriklerine indirgenir.",
      },
      {
        q: "ATX ve Setext başlıkların farkı ne?",
        a: "ATX başlıkları satır başı kare işaretleriyle yazar (## Başlık); Setext altlarını çizer: H1 için ===, H2 için ---. Setext yalnızca iki düzey destekler; daha derin başlıklar her zaman ATX karelerine döner.",
      },
      {
        q: "HTML'm tarayıcıdan çıkıyor mu?",
        a: "Hayır. Dönüşüm turndown ile tarayıcınızda yerel çalışır — .md dosyasını indirirken bile hiçbir şey yüklenmez.",
      },
    ],
  },
  "xml-to-json": {
    name: "XML'den JSON'a",
    tagline:
      "XML'yi tarayıcınızda JSON'a çevirin — öznitelikler @ önekli anahtarlara, tekrarlanan öğeler dizilere dönüşür; bozuk girdi satır düzeyinde anlaşılır hata verir.",
    intro: [
      "Sitemap kayıtlarını, RSS öğelerini, SOAP yanıtlarını ya da yapılandırma dosyalarını yapıştırın ve anında biçimlendirilmiş JSON alın. Dönüşüm, öznitelikleri koruyan fast-xml-parser kullanır: her öznitelik @ önekli bir anahtar olarak kalır, aynı adlı kardeş öğeler dizilere toplanır; öğenin öznitelikleri de varsa metin içeriği #text altına yerleşir.",
      "Bozuk girdi asla yarı yamalız tahminler üretmez: belge önce doğrulanır ve hatalar suçlu satırı gösterir — eksik kapanış etiketi tek satırlık bir düzeltme.",
    ],
    steps: [
      "XML'nizi sol bölmeye yapıştırın.",
      "Biçimlendirilmiş JSON sağda yazdıkça belirir.",
      "İyi göründüğünde JSON'u kopyalayın.",
    ],
    faqs: [
      {
        q: "Öznitelikler JSON'da nasıl temsil edilir?",
        a: 'Her öznitelik @ önekli bir anahtara dönüşür — <book id="7">, { "@id": "7" } olarak geri gelir. Öznitelik değerleri dize kalır; sayı ya da mantıksal değere benzeyen metin içeriği ise ilgili JSON türüne çevrilir.',
      },
      {
        q: "Tekrarlanan öğelere ne olur?",
        a: "Aynı adlı kardeş öğeler JSON dizisi olur. Dikkat: tek bir öğe düz değer kalır — tüketiciniz listeler bekliyorsa dizi olup olmadığını kontrol edin.",
      },
      {
        q: "XML'm bir yere yükleniyor mu?",
        a: "Hayır. Ayrıştırma fast-xml-parser ile tarayıcınızda yerel yapılır — hiçbir şey cihazınızdan çıkmaz.",
      },
    ],
  },
  "json-to-xml": {
    name: "JSON'dan XML'ye",
    tagline:
      "JSON'yu öznitelikli, tekrarlanan öğeli ve doğru kaçış karakterli kurala uygun XML'ye çevirin — XML'den JSON'a aracımızla gidiş-dönüş yapar. Hepsi yerel.",
    intro: [
      'JSON yapıştırın; düzgün bildirimli, 2 boşluk girintili, biçimlendirilmiş bir XML belgesi alın. Nesneler öğelere dönüşür, diziler her öğe için anahtarı yineler, "@key" üyeleri XML özniteliklerine dönüşür — XML\'den JSON\'a dönüştürücümüzün birebir tersi, veriler oraya gidip geri gelebilir.',
      "Her şey kuralına göre kaçışlanır (& < > \" ') ve rastgele anahtarlar yasal öğe adlarına dönüştürülür; çıktı her zaman kurala uygun XML olur. XML'nin anlatamadığı değerler — null, boş diziler — boş öğelere dönüşür; sınırlar aşağıda açıkça yazılıdır.",
    ],
    steps: [
      "JSON'unuzu giriş kutusuna yapıştırın.",
      "XML canlı oluşur — gerekirse özel bir kök öğe adı belirleyin.",
      "Sonucu kopyalayın ya da .xml dosyası olarak indirin.",
    ],
    faqs: [
      {
        q: "Öznitelikler ve diziler XML'ye nasıl eşlenir?",
        a: '@ ya da @_ ile başlayan bir anahtar, ebeveyn öğenin özniteliğine dönüşür; "#text" ise öğenin metin içeriği olur — XML\'den JSON\'a aracımızın verdiğiyle aynı kurallar. Diziler her öğe için aynı öğeyi yineler; en tepedeki bir JSON dizisi, belgenin tek köke ihtiyacı olduğundan <root><item>…</item></root> diye sarılır.',
      },
      {
        q: "JSON ⇄ XML eşlemesinin sınırları neler?",
        a: "XML'nin null ya da boş dizi gösterimi yoktur — ikisi de boş öğeye dönüşür. Karışık içerik (metnin arasına serpiştirilmiş alt öğeler) gidiş-dönüş yapamaz: metin tek blok tutulur. Ayrıca geri çözümlenirken tek başına kalmış bir tekrarlanan öğe, tek öğeli dizi yerine düz değer olur.",
      },
      {
        q: "Geçerli XML adı olmayan anahtarlara ne olur?",
        a: 'Dönüştürülürler: yasadışı karakterler alt çizgi olur, rakamla başlayan anahtar başa alt çizgi alır ("2fa" → <_2fa>). CJK ve aksanlı harfler zaten yasal XML adlarıdır, aynen kalır.',
      },
    ],
  },
  "cron-explainer": {
    name: "cron Açıklayıcı",
    tagline:
      "Herhangi bir cron ifadesini sade dile çevirin: alan alan açıklama, saat diliminizdeki önümüzdeki beş çalışma zamanı ve tek tıkla doldurulan hazır kalıplar.",
    intro: [
      "cron ifadeleri, işlerin ne zaman koşacağını belirleyen beş ya da altı gizemli alandan oluşur — tek bir yanlış karakter işin hiç çalışmamasına ya da her pazar sabahı 3'te çalışmasına yol açabilir. Bir ifade yapıştırın: araç her alanı sade bir dille açıklar (dakika, saat, ayın günü, ay, haftanın günü, varsa saniye) ve zamanlamanın gerçekten düşündüğünüz gibi çalıştığını doğrulamanız için önümüzdeki beş çalışma zamanını gösterir.",
      "Doğrulama dürüst ve anlıktır: aralık dışı değerler, ters yönlü aralıklar ve L, W, # gibi desteklenmeyen Quartz uzantıları belirsiz değil, somut ve anlaşılır bir hata verir. Her dakika, saat başı, her gece yarısı, hafta içi 9:00 ve üç aylık olmak üzere beş yaygın kalıp tek tıkla doldurulur.",
    ],
    steps: [
      "Bir cron ifadesi yazın ya da güvenilir bir başlangıç için hazır kalıptan birine tıklayın.",
      "Alan alan açıklamayı sade dille okuyun.",
      "Yerel saat ile UTC arasında geçiş yaparak önümüzdeki beş çalışma zamanını denetleyin.",
      "Sizi şaşırtan yeri crontab'da, zamanlayıcı arayüzünde veya CI yapılandırmasında düzeltin.",
    ],
    faqs: [
      {
        q: "Standart cron ile Quartz sözdizimi arasındaki fark nedir?",
        a: "Standart Unix cron (ve bu araç) 5 alan kullanır: dakika, saat, ayın günü, ay, haftanın günü — ilki saniyeyse 6. Quartz varsayılan olarak saniye alanını, yedinci bir yıl alanını ve L (son gün), W (en yakın iş günü), # (ayın n'inci günü, örn. MON#2) gibi uzantıları ekler. Bu Quartz'a özgü uzantılar burada kapsanmaz; sayılar, JAN ve MON gibi adlar, aralıklar, listeler ve adımlar içeren her standart özellik kapsanır.",
      },
      {
        q: "Ayın günü ile haftanın gününü birden yazdım — neden beklediğimden sık çalışıyor?",
        a: "Klasik cron ikisini VEYA ile birleştirir: her iki alan da kısıtlıysa (hiçbiri * değilse), ikisinden birine uyan gün işi tetikler. «0 0 1 * MON» ifadesi her ayın 1'inde ve her pazartesi çalışır. İki koşulun aynı anda aranması gerekiyorsa ifadenin kuruluşu değişmelidir — buradaki önümüzdeki çalışma zamanlarına bakmak davranışı anında görünür kılar.",
      },
    ],
  },
  "gradient-generator": {
    name: "CSS Degrade Oluşturucu",
    tagline:
      "İki ile beş rengi doğrusal, radyal veya konik CSS degradelerine dönüştürün: canlı önizleme, yapıştırmaya hazır kod ve tek tıkla uyumlu paletler.",
    intro: [
      "İki ile beş renk seçin, doğrusal, radyal ya da konik türünü belirleyin ve açıyı sürükleyin — önizleme yazarken güncellenir, CSS her zaman bir kopya uzağınızdadır. Bir durağın konumunu boş bırakırsanız CSS'in yapacağı gibi otomatik yerleşir; kesin yüzdeler vererek sert geçişler ve merkezden kaymış karışımlar elde edersiniz.",
      "Çıktı gerçek bir üretim bloğudur: eski tarayıcılar için düz renk yedeği satırı, eski WebKit sürümleri için -webkit- önekli satır ve en son standart sözdizimi. Rastgele uyumlama düğmesi paletinizin renk tonlarını HSL uzayında döndürür; böylece her karıştırma dengeli kalır, birbirine girmeye çalışmaz.",
    ],
    steps: [
      "İki ile beş renk belirleyin ya da hazır bir paletle başlayın.",
      "Degrade türünü seçin, ardından açı veya şekli ayarlayın; gerekirse konumları sabitleyin.",
      "CSS bloğunu kopyalayıp stil dosyanıza yapıştırın.",
    ],
    faqs: [
      {
        q: "CSS'te neden -webkit- önekli bir satır var?",
        a: "Bu, yalnızca -webkit-linear-gradient anlayan eski WebKit tarayıcıları (kabaca Safari 5-6 dönemi) için bir uyumluluk satırıdır. Son on yılın tüm tarayıcıları standart satırı okur; bu sürümleri desteklemeniz gerekmiyorsa önekli satırı silebilirsiniz — tutmak bir satır, silmek sıfır maliyettir.",
      },
      {
        q: "Doğrusal degrade dediğimizdeki açı ne anlama geliyor?",
        a: "Degenenin ilerleme yönüdür ve yukarıyı sıfır alarak saat yönünde ölçülür: 0deg aşağıdan yukarıya, 90deg soldan sağa, 180deg yukarıdan aşağıya gider. Araç girdiğiniz her açıyı normalleştirir (−45, 315 olur) ve eski sözdiziminin ters yön kuralı -webkit- satırında sizin için çözülmüştür.",
      },
    ],
  },
  "compress-image-to-size": {
    name: "Görseli hedef boyuta sıkıştır",
    tagline:
      "Görselleri tam KB bütçesine indirin: JPEG veya WebP kalitesi üzerinde ikili arama, biçimin izin verdiği en yakın değere ulaşır — toplu, çevrimdışı, yükleme yok.",
    intro: [
      "Yükleme formları, e-posta sınırları ve CMS alanları kalite kaydıracı değil, boyut ister. KB cinsinden üst sınırı yazın, görsellerinizi bırakın; araç kodlayıcı kalitesi üzerinde ikili arama yaparak dosyanın çizginin altına indiği noktayı bulur — her görsel için kullanılan kaliteyi ve varsa küçültmeyi raporlayarak, toplu biçimde.",
      "Fiziğe karşı da dürüsttür: kalite tabanı bile hedefinizi aşıyorsa görsel aşamalı olarak küçültülür; büyük ve detaylı bir fotoğraf minicik bir bütçeye gerçekten sığmıyorsa, size en yakın sonuç açık bir 'hedefin üzerinde' etiketiyle verilir — sessizce bozulmuş bir görsel asla.",
    ],
    steps: [
      "Bir görsel ya da bütün bir yığın bırakın.",
      "Hedef boyutu KB olarak yazın ve JPEG ya da WebP seçin.",
      "Sıkıştırmayı başlatın — her satır ulaşılan boyutu, kaliteyi ve ölçeği gösterir.",
      "Uyan sonuçları ya da dürüst en iyi kopyayı indirin.",
    ],
    faqs: [
      {
        q: "Her görsel minicik bir hedefe neden sığamıyor?",
        a: "Bir fotoğraf en düşük kalitede bile bilgi taşır; 2 MB'lık, 4000 piksellik bir görsel muhtemelen 10 KB'ye asla giremez. Kalite tabana vurduğunda araç pikselleri de küçültür — çözünürlük, bayt azaltmanın diğer kolu burasıdır. Hâlâ ulaşılamıyorsa en yakın sonuç açık bir uyarıyla verilir; sessizce bozulmuş dosya verilmez.",
      },
      {
        q: "JPEG mi WebP mi seçmeliyim?",
        a: "Aynı görsel kalitede WebP tipik olarak JPEG'ten %20-30 küçüktür; katı bir bütçede genellikle daha az kayıpla sığar. Dosyanın WebP desteklemeyen eski yazılımlar dahil her yerde açılması gerekiyorsa JPEG güvenli seçimdir.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* Hesap makineleri — finans, sağlık ve günlük hayat (yeni parti)       */
  /* ------------------------------------------------------------------ */
  "mortgage-calculator": {
    name: "Konut Kredisi Hesaplayıcı",
    tagline:
      "Konut kredinizin aylık taksitini hesaplayın — ana para ve faiz artı vergi, sigorta ve site aidatı — kredi tutarı, toplam faiz ve yıllık amortisman tablosuyla.",
    intro: [
      "Ev fiyatını, peşinatı, faiz oranını ve vadeyi gir; bankaların kullandığı standart amortisman formülünden aylık ana para-faiz taksitini al. Yıllık emlak vergisi, yıllık sigorta ve aylık site aidatını ekleyerek kredi kuruluşlarının genellikle gösterdiği tam PITI tutarını gör.",
      "Kredi tutarı, kredinin ömrü boyunca toplam faiz ve yıllık amortisman tablosu yazdıkça canlı güncellenir; %20 peşinatı %10 ile, 15 yıllık vadeyi 30 yılla saniyeler içinde karşılaştırabilirsin.",
    ],
    steps: [
      "Ev fiyatını ve peşinatı yüzde veya tutar olarak yaz.",
      "Yıllık faiz oranını ve yıllık vadeyi ayarla.",
      "İstersen yıllık emlak vergisi, yıllık sigorta ve aylık site aidatı ekle.",
      "Aylık ana para-faiz taksitini, PITI toplamını ve yıllık amortisman tablosunu oku.",
    ],
    faqs: [
      {
        q: "Konut kredisi hesaplayıcı hangi formülü kullanır?",
        a: "Standart sabit faizli amortisman formülü: M = L × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1); L kredi tutarı (fiyat eksi peşinat), r aylık faiz oranı (yıllık ÷ 12 ÷ 100) ve n ay sayısıdır. Örnek: %20 peşinatla 300.000'lik bir ev, 30 yıl vade ve %6 faizle ayda yaklaşık 1.438,92 ana para-faiz taksiti verir — girdiğin oran birer örnektir, teklif değildir.",
      },
      {
        q: "PITI ne demek?",
        a: "Ana para (Principal), faiz (Interest), vergi (Taxes) ve sigorta (Insurance) — tipik aylık konut ödemesinin dört parçası. Araç, girdiğin yıllık vergi ve sigortanın aylık on ikisini, üstüne site aidatını ana para-faiz taksitine ekler. Vergi ve sigortanın escrow'da tutulup tutulmadığı kredi kuruluşuna göre değişir.",
      },
      {
        q: "İlk yıllarda neden bu kadar çok faiz öderim?",
        a: "Aylık faiz kalan bakiyeden tahsil edilir ve bakiye başta en büyüktür. Amortisman tablosu bu dönüşü gösterir: erken taksitler neredeyse tamamen faiz, son yıllardakiler neredeyse tamamen ana paradır. Bu yüzden kredinin başında yapılan ek ödemeler en çok faiz tasarruf ettirir.",
      },
    ],
  },
  "salary-to-hourly": {
    name: "Maaştan Saatlik Ücrete Hesaplayıcı",
    tagline:
      "Yıllık maaşı saatlik, günlük, haftalık, iki haftalık ve aylık ücrete dönüştür — ücretsiz izin günleri düzeltildikten sonraki saatlik oranı da gör.",
    intro: [
      "Yıllık maaşı alışık olduğun düzenle — haftalık saat ve yıllık hafta — gir; hesaplayıcı onu iş ilanlarının ve bordroların kullandığı ölçülere böler: saatlik, günlük, haftalık, iki haftalık ve aylık. Varsayılan olarak haftada 40 saat, yılda 52 hafta önceden yüklüdür.",
      "Ücretsiz izin alıyorsan, düzeltilmiş saatlik ücret aynı maaşın fiilen çalışılan saat başına ne ettiğini gösterir; her ücretsiz gün yıldan bir çalışma haftasının beşte birini siler.",
    ],
    steps: [
      "Yıllık maaşı yaz.",
      "Haftalık saat ve yıllık haftayı ayarla (varsayılan 40 ve 52).",
      "Varsa yıllık ücretsiz izin gün sayısını ekle.",
      "Saatlik ücreti ve günlük, haftalık, iki haftalık, aylık karşılıkları oku.",
    ],
    faqs: [
      {
        q: "Saatlik ücret nasıl hesaplanır?",
        a: "Saatlik = yıllık maaş ÷ (haftalık saat × yıllık hafta). Varsayılan 40 saat ve 52 haftada 52.000 maaş tam 25,00 saatlik eder. Günlük ödeme 5 günlük hafta kabul eder, haftalık yıllığın haftalara bölümüdür, iki haftalık onun iki katı, aylık ise yıllığın 12'ye bölümüdür.",
      },
      {
        q: "Ücretsiz izin sonucu nasıl değiştirir?",
        a: "Her ücretsiz gün bir çalışma haftasının beşte birini götürür; 10 ücretsiz gün yılı yaklaşık 50 çalışma haftasına indirir. Düzeltilmiş saatlik aynı maaşı fiilen çalışılan saatlere böler: 40 saatlik haftalarla 52.000 maaş ve 10 ücretsiz gün saatte 26,00 eder. Haftalık ve aylık toplamlar yine bildirilen maaşı gösterir.",
      },
      {
        q: "Vergiler ve kesintiler dâhil mi?",
        a: "Hayır — tüm rakamlar gelir vergisi, sosyal sigorta ve diğer kesintilerden önceki brüttür. Net gelir vergi dilimine ve yere bağlıdır; bu sonuçları brüt karşılaştırma değerleri olarak gör.",
      },
    ],
  },
  "hourly-to-salary": {
    name: "Saatlik Ücretten Maaşa Hesaplayıcı",
    tagline:
      "Saatlik ücreti gerçek düzenine göre günlük, haftalık, iki haftalık, aylık ve yıllık kazanca çevir — varsayılan haftada 40 saat, yılda 52 hafta.",
    intro: [
      "Saatlik ücreti geçerli olduğu düzenle gir; hesaplayıcı onu işverenlerin ve kredi kuruluşlarının sorduğu yıllık rakama, bordroda görülecek haftalık, iki haftalık ve aylık tutarlara çarpar. 40 saat, 52 hafta standardı önceden yüklüdür; part-time veya sezonda yalnızca bu iki sayıyı değiştirmen yeter.",
      "Günlük ödeme 5 günlük bir çalışma haftası varsayar. Her rakam düz bir çarpma olduğu için sonuçlar, aynı saatler için maaşlı bir teklifin ödemesi gerekenle uyuşur.",
    ],
    steps: [
      "Saatlik ücreti yaz.",
      "Haftalık saat ve yıllık haftayı ayarla (varsayılan 40 ve 52).",
      "Yıllık rakamı ve aylık, iki haftalık, haftalık, günlük karşılıkları oku.",
    ],
    faqs: [
      {
        q: "Saatlik ücretten yıllık kazanç nasıl hesaplanır?",
        a: "Yıl = saatlik ücret × haftalık saat × yıllık hafta. Saatte 25,00 üzerinden 40 saatlik hafta ve 52 hafta tam yılda 52.000 eder; aylık yıllığın 12'ye bölümü, iki haftalık bir haftalık ücretin iki katıdır.",
      },
      {
        q: "Fazla mesai, bahşiş veya ücretsiz izin ne olacak?",
        a: "Dâhil değiller — sonuç girdiğin düzen için düz çarpımdır. Fazla mesaiyi kabaca hesaba katmak için tipik ek saatleri aynı ücretle haftalık saat alanına ekle; mevsimlik işte veya ücretsiz izinde yıllık haftayı düşür.",
      },
      {
        q: "Gerçek bordrom neden farklı?",
        a: "Rakamlar brüt. Gelir vergisi, sosyal güvenlik ve yan hak kesintileri neti düşürür; birçok maaşlı iş, daha az hafta çalışsan bile ödemeyi 12 aya yayar. Yıllık sonucu teklif karşılaştırması için kullan, net gelir tahmini olarak değil.",
      },
    ],
  },
  "break-even-calculator": {
    name: "Başabaş Noktası Hesaplayıcı",
    tagline:
      "Bir ürünün para kaybetmeyi bıraktığı adet ve ciroyu bul — sabit maliyet, fiyat ve değişken maliyet gir, katkı payı ve kâr tablosu çık.",
    intro: [
      "Sabit maliyetlerini gir — kira, maaşlar, ekipman, hacimden bağımsız ödediğin faturalar — artı birim fiyat ve birim değişken maliyet. Hesaplayıcı sabit maliyetleri katkı payına, yani fiyat eksi değişken maliyete böler ve kârın sıfırı kestiği adet sayısını verir.",
      "Mini tablo, başabaş hacminin yarısında, bir buçuk katında ve iki katında kâr veya zararı gösterir; nokta geçildikten sonra marjın ne kadar hızlı biriktiğini görürsün. Fiyat değişken maliyeti bile karşılamıyorsa araç anlamsız bir sıfır göstermek yerine bunu söyler.",
    ],
    steps: [
      "Dönemin toplam sabit maliyetini gir.",
      "Birim fiyatı ve birim değişken maliyeti ayarla.",
      "Başabaş adet ve ciroyu, birim başına marjla birlikte oku.",
      "Başabaş hacminin 0,5×, 1,5× ve 2×'inde kâr tablosuna bak.",
    ],
    faqs: [
      {
        q: "Başabaş analizi hangi formülü kullanır?",
        a: "Başabaş adedi = sabit maliyet ÷ (birim fiyat − birim değişken maliyet). Fark, katkı payıdır: 10.000 sabit maliyet, 50 fiyat ve 30 değişken maliyetle her satış 20 katkı sağlar; yani 500 adet — 25.000 ciro — başabaş tutar.",
      },
      {
        q: "Marj sıfır veya negatifse ne olur?",
        a: "O zaman hiçbir hacim başabaşa ulaşamaz ve hesaplayıcı sayı döndürmek yerine bunu söyler: satılan her birim, sabit maliyetleri karşılamak yerine zarar ekler. Çözüm daha yüksek fiyat, daha düşük değişken maliyet ya da ikisi birden.",
      },
      {
        q: "Birden çok ürünü veya değişen maliyetleri elinden tutar mı?",
        a: "Birim ekonomisi sabit tek ürünü modeller — klasik ders kitabı durumu. Ürün karışımı için fiyat eksi değişken maliyetin harmanlanmış ortalamanı kullan; hacim indirimleri veya kademeli sabit maliyetler için her senaryoyu yeniden hesapla.",
      },
    ],
  },
  "bmr-calculator": {
    name: "Bazal Metabolizma Hesaplayıcı",
    tagline:
      "Mifflin-St Jeor denklemiyle (1990) bazal metabolizma hızını hesapla — vücudunun her gün tam dinlenmede yaktığı kaloriler.",
    intro: [
      "Bazal metabolizma hızın (BMR), vücudunun yalnızca hayatta kalmak için harcadığı enerjidir: nefes, kan dolaşımı, ısınma — her türlü hareket ve sindirimden önce. Bu hesaplayıcı 1990'da yayımlanan ve modern popülasyonlar için en doğru yaygın tahminci olmayı sürdüren Mifflin-St Jeor denklemini kullanır: erkekler 10 × kilo (kg) + 6,25 × boy (cm) − 5 × yaş + 5; kadınlar aynı ifadenin 161 eksiği.",
      "Bilgilerini metrik ya da imparatorluk birimiyle gir, sonuç yazarken güncellenir. Sayıyı nüfus düzeyi bir tahmin olarak gör — laboratuvar ölçümünden genellikle yaklaşık ±10% uzaklıkta — tıbbi teşhis olarak değil.",
    ],
    steps: [
      "Cinsiyetini ve metrik (cm + kg) ya da imparatorluk (ft + in + lb) birimleri seç.",
      "Boy, kilo ve yaşını gir.",
      "Günlük kilokalori cinsinden BMR'ni oku.",
      "Koruma ve hedef değerler için kalori hesaplayıcıya aktar.",
    ],
    faqs: [
      {
        q: "Hangi formül kullanılıyor ve ne kadar doğru?",
        a: "1990'da yayımlanan ve American Dietetic Association'ın dolaylı kalorimetriyle doğrulamasından sonra önerdiği Mifflin-St Jeor denklemi. Çoğu yetişkin için ölçülen istirahat enerjisini kabaca ±10% içinde öngörür; eski Harris-Benedict denkleminin (1919) önündedir.",
      },
      {
        q: "BMR ile günlük kalori ihtiyacının farkı ne?",
        a: "BMR yalnızca tam dinlenmeyi kapsar. Gerçek günlük yakımın BMR'nin bir aktivite katsayısıyla çarpımıdır — hareketsiz bir gün için yaklaşık 1,2, çok aktif kişiler için 1,9'a kadar. Kalori hesaplayıcı bu çarpanı ve hedefini senin adına uygular.",
      },
      {
        q: "Bu tıbbi tavsiye mi?",
        a: "Hayır — bu bir tahmindir, tıbbi tavsiye değil. Hastalık, ilaç, gebelik ve alışılmadık vücut kompozisyonu gerçek enerji harcamasını kaydırır; beslenme değişikliğini bir sağlık uzmanıyla konuş.",
      },
    ],
  },
  "calorie-calculator": {
    name: "Kalori Hesaplayıcı",
    tagline:
      "BMR'ni günlük kalori hedeflerine çevir: beş aktivite düzeyi (×1,2–1,9) artı yaklaşık ±500 kcal/gün ile vermek, korumak veya almak hedefleri.",
    intro: [
      "Günlük enerji ihtiyacı, BMR'nin bir aktivite katsayısıyla çarpımıdır: 1,2 hareketsiz, 1,375 hafif aktif, 1,55 orta aktif, 1,725 çok aktif ve 1,9 ekstra aktif. Bu çarpım — toplam günlük enerji harcaması (TDEE) — şu anki kilonu korumak için gerekendir. BMR'nin kendisi Mifflin-St Jeor denkleminin (1990) ürünüdür.",
      "Bir hedef seç, araç koruma değerini ayarlar: haftada yaklaşık 0,5 kg vermek için yaklaşık −500 kcal/gün, almak için +500 kcal/gün, korumak için değişiklik yok. ±500 kcal buluşu 1 kg vücut yağının ≈ 7.700 kcal depolamasından gelir. Buradaki her şey tahmindir — gerçek metabolizma kilon ve alışkanlıkların değiştikçe uyum sağlar.",
    ],
    steps: [
      "Cinsiyetini ve birimlerini seç, boy, kilo ve yaş gir.",
      "Tipik bir haftaya uyan aktivite düzeyini seç.",
      "Verme, koruma veya alma hedefini seç.",
      "Koruma değerini (TDEE) ve günlük hedef kalorilerini oku.",
    ],
    faqs: [
      {
        q: "Hangi formül ve katsayılar kullanılır?",
        a: "Mifflin-St Jeor denkleminden (1990) BMR, standart TDEE aktivite katsayılarıyla çarpılır: 1,2 hareketsiz, 1,375 hafif aktif, 1,55 orta aktif, 1,725 çok aktif, 1,9 ekstra aktif. Hedefler yaklaşık 500 kcal/gün ekler veya çıkarır — haftada 0,5 kg değişimin klasik buluşu (1 kg yağ ≈ 7.700 kcal).",
      },
      {
        q: "500 kcal açık güvenli mi, sonuçlar ne zaman görünür?",
        a: "≈0,5 kg/hafta değişim için yaklaşık −500 kcal/gün, çoğu halk sağlığı kılavuzunun ılımlı ve sürdürülebilir dediği hızdır. Erken kaybın bir kısmı sudur ve hafifledikçe harcama düşer; haftalık sonuçlar doğrusal değildir — birkaç kiloda bir yeniden hesapla.",
      },
      {
        q: "Bu tıbbi tavsiye mi?",
        a: "Hayır — bu bir tahmindir, tıbbi tavsiye değil. Gebelik, kronik hastalık yönetimi, ilaç kullanımı veya yeme bozukluğu öykün varsa hedefleri bir sağlık uzmanıyla belirle.",
      },
    ],
  },
  "body-fat-calculator": {
    name: "Vücut Yağı Hesaplayıcı",
    tagline:
      "ABD Donanması metre yöntemiyle (Hodgdon & Beckett, 1984) boy, boyun ve belden vücut yağ yüzdesini tahmin et — kadınlarda kalça da.",
    intro: [
      "ABD Donanması çevre yöntemi vücut yağını yalnızca bir metreyle tahmin eder. Erkekler için: %BF = 495 / (1,0324 − 0,19077·log10(bel − boyun) + 0,15456·log10(boy)) − 450, tamamı santimetre. Kadınlar çevre terimine kalçayı ekler — log10(bel + kalça − boyun) — ve aynı 1984 Hodgdon-Beckett çalışmasının kadın katsayılarını kullanır.",
      "Boyunu gırtlak altında, metrenin ön tarafta hafifçe aşağı eğimli olduğu biçimde ölç; beli erkeklerde göbek deliğinden, kadınlarda en dar noktadan; kalçayı en geniş yerinden. Metre cildi sıkmadan temas etsin. Sonuç, laboratuvar yöntemlerine göre tipik hatası ±3–4% olan bir tahmindir, teşhis değildir.",
    ],
    steps: [
      "Cinsiyetini ve metrik ya da imparatorluk birimleri seç.",
      "Boy, boyun ve beli ölçüp gir — kadınlarda kalça da.",
      "Tahmini vücut yağ yüzdeni oku.",
      "Trendi izlemek için her ay aynı koşullarda yeniden ölç.",
    ],
    faqs: [
      {
        q: "Donanma yöntemi ne kadar doğru?",
        a: "Su altı tartısına ve DEXA'ya karşı 1984 Donanma denklemleri ortalama 3–4 yüzde puan içinde kalır; yağ atipik yerleşmişse bireysel hatalar büyür. Değişimleri, düzenli ve aynı biçimde ölçtüğünde iyi izler — ilerleme için bu, mutlak sayıdan daha önemlidir.",
      },
      {
        q: "Hangi vücut yağı aralığı sağlıklı sayılır?",
        a: "American Council on Exercise erkekler için şunu verir: %2–5 temel yağ, %6–13 sporcu, %14–17 fitness, %18–24 ortalama, %25+ obezite. Kadınlar için: %10–13 temel, %14–20 sporcu, %21–24 fitness, %25–31 ortalama, %32+ obezite. Kadınların hormonal işlev için daha fazla temel yağa ihtiyacı vardır.",
      },
      {
        q: "Sonuç neden negatif ya da imkânsız çıktı?",
        a: "Formül kırpma olmadan basılır; bu yüzden imkânsız girdiler — örneğin boyundan büyük olmayan bir bel — imkânsız çıktı üretir. Temel yağ düzeyinin altındaki veya yaklaşık %60 üzerindeki her değeri ölçüm hatası say ve yeniden ölç. Ve her zamanki gibi: bu tahmin tıbbi tavsiye değildir.",
      },
    ],
  },
  "ideal-weight-calculator": {
    name: "İdeal Kilo Hesaplayıcı",
    tagline:
      "Devine formülüyle (1975) ve boya göre sağlıklı VKİ bandıyla (18,5–24,9) ideal kilonu gör — kg ya da pound olarak.",
    intro: [
      "Bu hesaplayıcı iki tamamlayıcı yanıt gösterir. Devine formülü (1975) — erkekler için 50 kg + 5 ft üzerindeki her inç için 2,3 kg, kadınlar için 45,5 kg + inç başına 2,3 kg — aslında digoksin gibi ilaçları dozlamak için türetilmişti ve tıpta en çok atıf alan ideal kilo denklemi olmayı sürdürüyor. Sağlıklı VKİ bandı, boyun metre karesini WHO'nun normal aralık sınırları olan 18,5 ve 24,9 ile çarpar.",
      "Boyunu santimetre ya da fit-inç olarak gir. İki yöntem genellikle birkaç kilo ayrılır; tam da bu önemlidir: tek bir ideal kilo yoktur. İki sayıyı da sağlıklı bir aralık etrafında çerçeve olarak gör, kendini zorlayacağın hedef olarak değil — tahmin tıbbi tavsiye değildir.",
    ],
    steps: [
      "Metrik (cm) ya da imparatorluk (ft + in) birimleri seç.",
      "Boyunu gir.",
      "Devine erkek-kadın tahminlerini sağlıklı VKİ bandıyla karşılaştır.",
      "Kilo hedefi koyarken tek sayı yerine aralığı kullan.",
    ],
    faqs: [
      {
        q: "Devine formülü nereden geliyor?",
        a: "Dr. B. J. Devine, 1975'te onu boydan ilaç doz kilolarını hızla tahmin etmenin yolu olarak yayımladı: erkekler için ilk 5 fit 50 kg artı her ek inç için 2,3 kg, kadınlar için 45,5 kg. Formül hiçbir zaman güzellik ya da fitness hedefi olarak tasarlanmadı; bu yüzden yanında WHO tabanlı VKİ bandı gösterilir.",
      },
      {
        q: "Cevap neden tek sayı yerine aralık?",
        a: "Sağlıklı kilo yapılışa, kas kütlesine, yaşa ve etnik kökene bağlı olduğundan tek bir sayı kimseye uymaz. 18,5–24,9 × boy² bandı WHO'nun VKİ sınıflandırmasından gelir ve araştırmanın çoğu yetişkin için en düşük genel riskle ilişkilendirdiği kiloları kapsar.",
      },
      {
        q: "Bu tıbbi tavsiye mi?",
        a: "Hayır — bu bir tahmindir, tıbbi tavsiye değildir. Sporcular ve çok kaslı kişiler tam sağlıklıyken bandın üstündedir; bazı durumlar sağlıklı aralığı kaydırır. Hedef kilonu bir sağlık uzmanıyla konuş.",
      },
    ],
  },
  "water-intake-calculator": {
    name: "Su İçme Hesaplayıcı",
    tagline:
      "Günlük su hedefini al: vücut kilosunun her kilogramı için 35 ml artı her 30 dakika egzersiz için yaklaşık 350 ml, sıcak hava önerileriyle.",
    intro: [
      "Bu hesaplayıcı klinik pratikte kullanılan standart koruma sıvısı buluşundan yola çıkar: herhangi bir aktiviteden önce, gün boyu vücut kilosunun her kilogramı için 35 ml su. Ardından ter kayıplarını karşılamak için her 30 dakika egzersize yaklaşık 350 ml ekler ve temeli ile egzersiz bonusunu ayrı gösterir ki toplamın nereden geldiğini göresin.",
      "Kilonu kilogram ya da pound olarak ve günlük egzersiz dakikalarını gir. Sıcakta veya çok terlerken hesaplanan toplamdan fazla iç; yemek ve diğer içecekler de su verir. Sonuç genel bir hidrasyon tahminidir, tıbbi tavsiye değildir.",
    ],
    steps: [
      "Metrik (kg) ya da imparatorluk (lb) birimleri seç.",
      "Vücut kilonu gir.",
      "Günde kaç dakika egzersiz yaptığını gir.",
      "Temeli, egzersiz bonusunu ve birleşik günlük hedefi oku.",
    ],
    faqs: [
      {
        q: "35 ml/kg kuralı nereden geliyor?",
        a: "Pediatri'den yetişkine klinik pratikte yaygın kullanılan klasik koruma sıvısı buluşudur (yetişkinler için sıklıkla 30–35 ml/kg/gün diye anılır). Karşılaştırma için: Avrupa Gıda Güvenliği Kurumu yeterli toplam su alımını kadınlar için 2,0 L/gün, erkekler için 2,5 L/gün olarak koyar — yiyecekten gelen su dâhil.",
      },
      {
        q: "Kahve, çay ve yemek toplama sayılır mı?",
        a: "Evet. Günlük su alımının yaklaşık %20–30'u normalde yiyecekten gelir ve ılımlı kafeinli içecekler hidrasyonu boşaltmak yerine besler. Hesaplanan rakam, normal beslenmenin üstünde berrak sıvı rehberidir; tümünü su olarak içmek zorunda değilsin.",
      },
      {
        q: "Bu tıbbi tavsiye mi?",
        a: "Hayır — genel bir tahmindir. Kalp, böbrek veya karaciğer rahatsızlığı olanlar ve sıvı kısıtlaması verilenler hesaplanandan çoğu zaman daha azına ihtiyaç duyar: hekiminin talimatlarına uy.",
      },
    ],
  },
  "pace-calculator": {
    name: "Pace Hesaplayıcı",
    tagline:
      "Herhangi bir mesafe ve süreden km başına ve mil başına koşu temposunu hesapla, sonra Peter Riegel'in 1,06 üs formülüyle yarış sürelerini tahmin et.",
    intro: [
      "Herhangi bir mesafe gir — 5K, 10K, yarım maraton, maraton ya da km veya mil cinsinden özel bir mesafe — artı bitiriş süren; hem km başına tempo, hem mil başına tempo hem de km/h ve mph hızları aynı anda görünsün. 2:00'de bitirilen bir yarım maraton, hiç zihinsel işlem yapmadan 5:41/km, 9:10/mil ve 10,6 km/h gösterilir.",
      "Yarış tahmincisi Peter Riegel'in dayanıklılık formülü T₂ = T₁ × (D₂/D₁)^1,06'yı uygular: ona dürüst bir yarış sonucu ver, standart her mesafe için — 5K'dan maratona — beklenen bitirişini öngörsün.",
    ],
    steps: [
      "Hazır bir yarış mesafesi seç veya Özel'i seçip km ya da mil cinsinden bir mesafe gir.",
      "Bitiriş süreni saat, dakika ve saniye olarak yaz.",
      "Km temposunu, mil temposunu ve iki hızı oku — ya da her mesafe için öngörülen süreler için Yarış tahmincisi'ne geç.",
    ],
    faqs: [
      {
        q: "Yarış tahmin formülü nereden geliyor?",
        a: "Araştırma mühendisi Peter Riegel'den; T₂ = T₁ × (D₂/D₁)^1,06'yı 1977'de Runner's World'de yayımladı. 1,06 üssü temponun mesafeyle nasıl söndüğünü yakalar: yarış mesafesini ikiye katlamak, sürenin iki katından yaklaşık %9 daha uzun sürer. Formül hedef mesafeye özel antrenman varsayar — hiç uzun koşmadıysan hızlı bir 5K'dan maraton öngörmez.",
      },
      {
        q: "Öngörülen km temposu uzun yarışlarda neden yavaş?",
        a: "Formül işini yapıyor demektir. 1,06 üssü, mesafedeki her iki katlanmanın orantısal payın ötesinde kabaca %6 ek süre tuttuğu anlamına gelir — glikojen tükenmesi, beslenme ve yorgunluk. Kısa tahminler (yarım maratondan 10K) aynı nedenle km başına daha hızlı çıkar.",
      },
      {
        q: "Hesaplayıcı kilometrenin yanında mil'i de elinden tutar mı?",
        a: "Evet. Özel mesafeler iki birimi kabul eder ve sonuçlar her zaman iki türlü gösterilir: km ve mil temposu, km/h ve mph hızları. Dönüşüm 1,609344 km'lik tam uluslararası mili kullanır.",
      },
    ],
  },
  "one-rep-max-calculator": {
    name: "1RM Hesaplayıcı",
    tagline:
      "Ağırlık × tekrar serilerinden Epley ve Brzycki formülleriyle tek tekrar maksimumunu (1RM) tahmin et, 1–12 tekrar için 1RM yüzdeli antrenman tablosuyla.",
    intro: [
      "Kaldırdığın bir ağırlığı ve temiz tamamladığın tekrar sayısını gir; yerleşik iki formülden tahmini 1RM'ni al: Epley'in w × (1 + reps/30) ve Brzycki'nin w × 36/(37 − reps) formülleri. 225 lb × 10'da ikisi de tam 300 lb'ye konar — bu serinin salon klasiği olmasının nedeni budur.",
      "Tahminin altındaki antrenman tablosu 1RM'ni çalışma ağırlıklarına çevirir: 1'den 12'ye her tekrar sayısı için bekleyebileceğin en ağır yük, 1RM yüzdesiyle birlikte — koçların güç, hipertrofi ve dayanıklılık bloklarını planlarken kullandığı yüzdeler.",
    ],
    steps: [
      "Kaldırdığın ağırlığı gir ve kg ya da lb seç.",
      "İyi teknikle tamamladığın tekrar sayısını gir.",
      "Epley ve Brzycki tahminlerini ve altındaki 1–12 antrenman tablosunu oku.",
    ],
    faqs: [
      {
        q: "Hangi formüle güvenmeliyim?",
        a: "İkisi de alt-maksimum serilerden tahminlerdir ve yaklaşık 4 ile 10 tekrar arasında en doğrudur. Epley (1976) düşük tekrarlarda hafif iyimser, Brzycki (1993) hafif temkinlidir. Alışılagelen uygulama iki sayıyı bir çerçeve olarak okumaktır: birkaç kilogram içinde uyuşuyorsa 1RM tahminin güvenilirdir.",
      },
      {
        q: "Tablo 10 tekrar için neden 1RM'nin %75'ini gösteriyor?",
        a: "Yüzdeler Epley denkleminin tersinden gelir: n tekrar için kaldırılabilir en fazla yaklaşık 1RM × 30/(30 + n)'dir. On tekrar %75, beş tekrar yaklaşık %86 eder. Gerçek yüzdeler harekete göre (squat, presslerden daha çok tekrar tolere eder) ve lif yapına göre kayar; tabloyu programlamanın başlangıç noktası say.",
      },
      {
        q: "Neden 20'den çok tekrar giremiyorum?",
        a: "Çünkü formüller orada anlam taşımaktan çıkar. Yaklaşık 12 tekrarın ötesinde sonucu güç değil yerel dayanıklılık belirler ve Brzycki'nin paydası (37 − reps) sıfıra çöker. Çok tekrarlı seriler kondisyonu ölçer; onlardan maksimum tahmini istiyorsan dayanıklılık işi için tasarlanmış bir formül kullan.",
      },
    ],
  },
  "sleep-calculator": {
    name: "Uyku Hesaplayıcı",
    tagline:
      "Sabit kalkış saati için en iyi yatış saatini bul — ya da şimdi uyuyorsan ne zaman uyanacağını gör — 90 dakikalık uyku döngüleri artı 15 dakika uykuya dalma ile.",
    intro: [
      "Sabahları berbat eden şey toplam uyku saati değil, döngünün ortasında uyanmaktır. Bu araç uykuyu tam 90 dakikalık döngülerle planlar: ne zaman kalkman gerektiğini söyle, alarmın tam döngü sınırına denk gelen yatış saatlerini listeler — altı döngüden (9 saat) üç döngüye (4,5 saat), her biri uykuya dalmak için yaklaşık 15 dakika dâhil.",
      "Hemen şimdi mi yatıyorsun? Ters mod döngüleri ileriye doğru ekler: 23:30'da uykuya dalarsan doğal uyanma noktaların 01:15, 02:45, 04:15, 05:45, 07:15 ve 08:45 — sana yeterince dinlenme veren en erken olanı seç.",
    ],
    steps: [
      "Kalkış saati → yatış saati ya da Şimdi uyu → uyanma saatleri seç.",
      "Kalkman gereken saati ya da yatağa gittiğin saati gir.",
      "Bir satır seç: her biri tam sayıda 90 dakikalık döngü, uyku süresi gösterilir.",
    ],
    faqs: [
      {
        q: "Uyku döngüleri gerçekten 90 dakika mı?",
        a: "90 dakika sıkça anılan ortalamadır; bireysel döngüler kabaca 80 ile 120 dakika arasında değişir ve aynı kişinin döngüleri gece boyunca farklılaşır. Bu yüzden buradaki saatler hedeftir, güvence değil: döngüye ayarlı alarmlarla iki hafta sonra hâlâ sersemliyorsan yatışını 15–20 dakika kaydır ve sabahların düzelip düzelmediğine bak.",
      },
      {
        q: "Hesap neden 15 dakika ekliyor?",
        a: "Çünkü ilk döngü yalnızca gerçekten uykuya daldığında başlar ve çoğu insanın 10–20 dakikaya ihtiyacı olur. Araç, yatağa girmekle ilk döngünün başlangıcı arasına 15 dakika koyar; genellikle daha hızlı ya da yavaş dalıyorsan farkı zihninden ekle ya da çıkar.",
      },
      {
        q: "Kaç döngüye ihtiyacım var?",
        a: "Çoğu yetişkin 5 döngüyle (7,5 saat) iyi gider, birçok kişinin 6'ya (9 saat) ihtiyacı olur; 4 döngü (6 saat) bazılarına kısa vadede yeter, uzun vadede nadiren. Düzenlilik toplam kadar önemli — saatleri savruk 6 döngü seni daha kötü bırakır.",
      },
    ],
  },
  "workdays-calculator": {
    name: "İş Günü Hesaplayıcı",
    tagline:
      "İki tarih arasındaki iş günlerini say ya da bir tarihe iş günü ekle-çıkar — kendi hafta sonu tanımın ve özel tatil listenle.",
    intro: [
      "Sözleşme vadeleri, tedarik süreleri ve SLA saatleri takvim günü değil iş günü sayar. İki tarih arasındaki iş günlerini say (uçlar dâhil: pazartesiden cumaya 5), ya da bir temel tarihten N iş günü ileri-geri yürü ve haftanın hangi gününe düştüğüyle tam varış tarihini gör.",
      "Kendi tatil listeni yapıştır — satır başına bir YYYY-MM-GG — şirketin kapalı günlerini ve resmî tatilleri çıkarsın; haftanın dinlendiği günler cuma-cumartesiyse hafta sonu tanımını değiştir. Tüm tarih matematiği UTC gün numaralarıyla döner; yaz saati geçişleri sonucu asla bir gün kaydırmaz.",
    ],
    steps: [
      "Arasındaki iş günleri ya da İş günü ekle / çıkar modunu seç.",
      "İki tarihi ya da bir temel tarih ve kaç iş günü gidileceğini gir.",
      "İstersen hafta sonu günlerini ayarla ve tatilleri satır başına bir YYYY-MM-GG olacak biçimde yapıştır.",
      "Sayıyı dökümüyle ya da varış tarihini haftanın günüyle oku.",
    ],
    faqs: [
      {
        q: "Uç tarihler sayılıyor mu?",
        a: "Evet — aradaki sayım iki ucu da kapsar: 2026-11-02 pazartesi ile 2026-11-06 cuma arası 5 iş günü, cumadan pazartesiye 2 iş günüdür. Ekle/çıkar modunda başlangıç tarihi harcanmaz: cuma + 1 iş günü pazartesiye düşer, cumartesi + 1 de pazartesiye düşer.",
      },
      {
        q: "Tatilleri nasıl girerim?",
        a: "Satır başına bir tarih, YYYY-MM-GG biçiminde; örneğin ABD Şükran Günü için 2026-11-26. Geçersiz satırlar sayımı bozmak yerine yok sayılır, yinelemeler zararsızdır ve hafta sonuna denk gelen tatil hiçbir şeyi değiştirmez — zaten dışarıdaydı.",
      },
      {
        q: "Araç neden UTC ve yaz saatinden söz ediyor?",
        a: "Yerel saatle tarih aritmetiği yaz saati geçişlerinde bir gün kayabilir — kasım veya mart değişimini kesen bir aralık bazı tarayıcılarda bir gün kısa ya da uzun çıkabilir. Tam UTC günleriyle saymak sorunu bütünüyle aşar: cumadan pazartesiye dünyanın her yerinde 2 iş günüdür.",
      },
    ],
  },
  "cooking-conversion": {
    name: "Mutfak Dönüştürücü",
    tagline:
      "24 yaygın malzeme için cup, yemek kaşığı ve çay kaşığını gram ve ounce'a çevir; fırın °F↔°C tablosuyla — ortalama değerler, sunucu turu yok.",
    intro: [
      "Bir cup un, bir cup bal değildir: hacmi ağırlığa çevirmek tek sihirli katsayıyı değil, malzemenin yoğunluğunu gerektirir. 24 yaygın malzemeden birini seç — un 120 g/cup, şeker 200, tereyağı 227, bal 340, kakao 100, yulaf ezmesi 90 — ve iki yönde çevir: cup, yemek kaşığı, çay kaşığı, sıvı ounce, mililitre ve litre bir yanda; gram, kilogram, ounce ve pound öbür yanda.",
      "Hacimden hacme (2 cup = 480 ml) ve ağırlıktan ağırlığa (1 lb = 453,6 g) dönüşümler malzeme seçmeden çalışır; iki yönlü fırın tablosu standart °F ayarlarını °C'ye aktarır — 350 °F 175 °C'dir — ki yabancı tarifler muamma olmaktan çıksın.",
    ],
    steps: [
      "Malzemeyi listeden seç (hacim-hacim veya ağırlık-ağırlık için bu adımı atla).",
      "Tarifin istediği miktarı gir.",
      "Çevireceğin birimi ve hedef birimi seç.",
      "Sonucu oku ya da fırın sıcaklığını °F↔°C tablosundan bul.",
    ],
    faqs: [
      {
        q: "Cup başına gram değerleri ne kadar doğru?",
        a: "Yayınlanmış ortalamalardır (King Arthur, USDA ve benzeri kaynaklar) ve gerçek kepçeler değişir: bir cup un, kaşıkla doldurup düzeltmeye göre doğrudan paketten kepçelemeye ±15% farklı olabilir. Değerler günlük yemek için yeterlidir; hassasiyetin önemli olduğu pastacılıkta malzemeleri tart ve tabloyu tahmin olarak gör.",
      },
      {
        q: "Araç hangi cup'ı kullanıyor?",
        a: "Çoğu Amerikan tarifinin ve dönüşüm tablosunun varsaydığı 240 ml'lik ABD mutfak cup'ı. Bu, 15 ml'lik 16 yemek kaşığı ya da 5 ml'lik 48 çay kaşığıdır. Tarif metrik ölçü kupalarıyla (250 ml) veya İngiliz imparatorluk kupalarıyla (284 ml) yazıldıysa sonuçlar birkaç yüzde kayar — ona göre ölçekle.",
      },
      {
        q: "350 °F neden 176,7 °C değil de 175 °C ediyor?",
        a: "Tam dönüşüm (350 − 32) × 5/9 = 176,7 °C'dir; ama fırınlar 5–10 derecelik adımlarla işaretlenir ve tarif yazarları en bilinen ayara yuvarlar, bu yüzden standart eş 175 °C'dir. Tablo bu geleneksel çiftleri gösterir; fırın düğmesinin gerçek sıcaklığı zaten yaklaşıktır.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* Geliştirici — yer tutucu görsel oluşturucu                            */
  /* ------------------------------------------------------------------ */
  "placeholder-image-generator": {
    name: "Yer Tutucu Görsel Oluşturucu",
    tagline:
      "SVG, PNG veya JPG olarak her boyutta yer tutucu görsel üret — renkleri ve etiketi seç, anında önizle, sonra dosyayı indir ya da SVG işaretlemesini kopyala.",
    intro: [
      "Maketler ve tel kafes tasarımlar, gerçek görseller var olmadan önce resim kutularına ihtiyaç duyar. Genişlik ve yükseklik yaz — 1200×630 bir hero, 256×256 bir avatar, ya da 1×1'den 5000×5000'e her şey — arka plan ve metin renklerini seç, istersen bir etiket ekle; yer tutucu yazdıkça canlı çizilir.",
      "Sonucu SVG, PNG veya JPG olarak indir ya da SVG işaretlemesini doğrudan panoya kopyala: birkaç okunabilir elementtir, base64 çorbası değil; HTML'e, JSX'e veya Figma'ya yapıştırıp metni ve renkleri elle düzenleyebilirsin. Her şey tarayıcında üretilir; hiçbir şey yüklenmez.",
    ],
    steps: [
      "Genişlik ve yüksekliği piksel olarak gir.",
      "Arka plan ve metin renklerini ve isteğe bağlı etiketi ayarla (varsayılan: ölçüler).",
      "SVG, PNG veya JPG olarak indir — ya da SVG işaretlemesini kopyalayıp her yere yapıştır.",
    ],
    faqs: [
      {
        q: "PNG veya JPG yerine SVG'yi ne zaman kullanmalıyım?",
        a: "SVG metindir: minicik, sınırsız ölçeklenir ve elle düzenlenir; maketler, belgeler ve e-postaya uygun düzenler için idealdir. PNG, gömülü SVG'yi bozan platformlar için (bazı CMS'ler ve sohbet uygulamaları) daha güvenli seçimdir; JPG fotoğraf benzeri yer tutuculara küçük dosya boyutunda uyar. Önizleme üçünde de aynıdır.",
      },
      {
        q: "Boyut ve renk sınırları neler?",
        a: "Genişlik ve yükseklik 1 ile 5000 piksel arasında tam sayı olmalı; renkler hex olmalı — #RRGGBB ya da kısa #RGB biçimi. Gerisi, sessizce bozuk bir görsel üretmek yerine ipucuyla reddedilir.",
      },
      {
        q: "Sunucuya bir şey gönderiliyor mu?",
        a: "Hayır. SVG tarayıcında bir dizi şablonundan kurulur, raster sürümler yerel bir canvas'ta çizilir. Sayfadan hiçbir şey çıkmaz: çevrimdışı çalışır ve yayınlanmamış tasarımlar için güvendedir.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* Hesap makineleri ve zamanlayıcılar — maaş, kira, birikim, sağlık     */
  /* ------------------------------------------------------------------ */
  "overtime-pay-calculator": {
    name: "Fazla Mesai Hesaplayıcı",
    tagline:
      "Saatlik ücretinin 1,5× veya 2× katıyla fazla mesaiyi hesapla — normal ücret, fazla mesai primi, haftalık toplam ve maaştan yıllık karşılık.",
    intro: [
      "Saatlik ücreti gir — ya da hesaplayıcının normal haftalık çalışma saatine göre çevireceği yıllık maaşı — ve yapmayı beklediğin fazla mesai saatlerini ekle. Sonuçlar normal ücreti mesai priminden ayırır: varsayılan olarak bir buçuk kat, sözleşmen veya yerel kurallar çifte ücret ödüyorsa iki kat.",
      "Her şey canlı güncellenir: yükselen mesai saati ücreti, haftanın normal ve mesai ücreti, birleşik haftalık toplam ve yılda gerçekten çalıştığın hafta sayısıyla çarpınca yıllık karşılık. ABD Fair Labor Standards Act'inin (FLSA) muaf olmayan çalışanlar için fazla mesaiyi hesaplama biçimini yansıtır.",
    ],
    steps: [
      "Saatlik ücretini yaz ya da maaş moduna geçip yıllık ücretini gir.",
      "Normal haftalık saatini (varsayılan 40) ve yıllık hafta sayısını ayarla.",
      "Fazla mesai saatlerini ekle ve çarpanı seç — 1,5× veya 2×.",
      "Mesai saat ücretini, haftalık dökümü ve yıllık toplamı oku.",
    ],
    faqs: [
      {
        q: "ABD'de fazla mesai ödemesi ne zaman zorunludur?",
        a: "FLSA'ya göre muaf olmayan çalışanlar, iş haftasında 40 saati aşan her saat için normal ücretlerinin en az 1,5 katını almalıdır. Muafiyet görev tanımına ve maaş düzeyine bağlıdır; bazı eyaletler daha ileri gider — örneğin Kaliforniya günde 8 saati aşınca da mesai sayar. 25,00 saatlik ücretle her mesai saati 37,50 kazandırır.",
      },
      {
        q: "Maaş modu maaşımı saatlik ücrete nasıl çevirir?",
        a: "Yıllık maaşı normal haftalık saat × yıllık hafta sayısına böler — maaştan saatliğe çeviriyle aynı temel. 40 saatlik haftalarla 52 hafta üzerinden 52.000'lik maaş tam olarak 25,00 saat başına eder; dolayısıyla 1,5× ile beş mesai saati, 1.000,00'lik normal haftanın üzerine 187,50 ekler.",
      },
      {
        q: "Mesai ücretinde maaşımın tamamı dikkate alınır mı?",
        a: "FLSA mesaiyi “normal ücret” üzerinden hesaplar; bu, baz maaşın ötesine geçebilir — vardiya fark ücretleri ve zorunlu olmayan primler buna örnektir. Bu hesaplayıcı düz baz ücreti kullanır: bu tür eklemeler alıyorsan yasal mesai ücretin burada gösterilenden yüksek olabilir.",
      },
    ],
  },
  "rent-affordability-calculator": {
    name: "Kira Bütçesi Hesaplayıcı",
    tagline:
      "Aylık gelirinin %30, %33 veya %40 kuralına göre taşıyabileceği en yüksek kirayı bul — ardından borçlar ve kira sigortası sonrası ne kaldığını gör.",
    intro: [
      "Aylık gelirini gir (brüt veya net), kira-gelir oranını seç — klasik brütün %30'u, daha esnek %33 ya da pahalı şehirler için netin %40'ı — ve hesaplayıcı kira tavanını çizer. Diğer aylık borç taksitleri ve kira sigortası sonra düşülür, böylece gördüğün sayı gerçekten yaşanabilir olur.",
      "Ayrıca bu en yüksek kirada taşıyacağın borç-gelir oranını alırsın; kira sözleşmesi ya da konut kredisi onayından önce kredi kuruluşlarının baktığı sayı budur. Kira artı borçlar gelirini aştığında bütçe satırı dürüstçe negatife döner — zorlamaktan çok daha ucuz kira aramanın işareti.",
    ],
    steps: [
      "Aylık gelirini gir ve brüt mü net mi olduğunu belirt.",
      "Kira-gelir oranını seç: %30, %33 veya %40.",
      "Varsa diğer aylık borç taksitlerini ve kira sigortasını ekle.",
      "Kira tavanını, kalan bütçeyi ve borç-gelir oranını oku.",
    ],
    faqs: [
      {
        q: "Kirada %30 kuralı nereden gelir?",
        a: "ABD'nin 1969 tarihli Brooke değişikliğine dayanır; toplu konut kirasını gelirin %25'ine sabitlemiş, 1981'de %30'a çıkarılmıştı. HUD, gelirinin %30'undan fazlasını barınmaya harcayan haneleri hâlâ “cost-burdened” (yük altında) sayar — bu yüzden brüt gelirin %30'u uygun kiranın kısa yolu olarak yerleşti.",
      },
      {
        q: "Kira bütçesini brütten mi netten mi kurmalıyım?",
        a: "Klasik %30 kuralı brüt gelire uygulanır; vergileri yok sayar ve maaş bordronuzdan daha cömert görünür. Netten planlamayı tercih edersen, netin %40'ı gibi daha yüksek bir oran kabaca aynı noktaya varır. Önemli olan tek bir temeli seçip ona bağlı kalmaktır.",
      },
      {
        q: "Buradaki borç-gelir oranı ne anlama gelir?",
        a: "En yüksek kira artı belirttiğin borçlar ve sigortanın gelirinden yediği paydır. Kredi kuruluşları genellikle toplam DTI'nin %36'nın altını sever; kabaca %43'ün üzerinde mortgage almak zorlaşır. Yüksek bir sayı, kira tavanının diğer yükümlülüklerine göre fazla iddialı olduğu anlamına gelir.",
      },
    ],
  },
  "apy-calculator": {
    name: "APY Hesaplayıcı",
    tagline:
      "Nominal bir APR'yi efektif APY'ye çevir — ve geri — günlük, aylık, üç aylık veya yıllık bileşikleme için; istersen mevduatın zamanla büyümesiyle birlikte.",
    intro: [
      "Nominal oran ile efektif oran aynı sayı değildir ve reklamlar sessizce iyi görüneni seçer. Bir oran ve bileşikleme sıklığı gir — günlük (365), aylık, üç aylık veya yıllık — bu hesaplayıcı APR'yi APY'ye ya da APY'yi onu üretecek nominal APR'ye çevirir.",
      "İstersen bir mevduat tutarı ve yıl cinsinden bir ufuk ekle, paranın gerçekte neye dönüştüğünü gör: bileşikleme sonrası bakiye ve üzerine kazanılan faiz. Dönüşüm iki yönde de kesindir — yönü ters çevir ve turu herhangi bir banka teklifiyle doğrula.",
    ],
    steps: [
      "Sana söylenen oranı yaz — nominal bir APR ya da efektif bir APY.",
      "Bileşikleme sıklığını seç: günlük, aylık, üç aylık veya yıllık.",
      "İstersen bir mevduat tutarı ve büyümeyi yansıtacak yıl sayısı ekle.",
      "Çevrilen oranı, son bakiyeyi ve kazanılan faizi oku.",
    ],
    faqs: [
      {
        q: "Aynı nominal oranda APY neden APR'den yüksektir?",
        a: "Çünkü bileşikleme faizin faizini öder. APY = (1 + r ÷ n)^n − 1: aylık bileşiklenen %12'lik nominal oran (1,01)^12 − 1 = %12,6825 efektif olur — fazladan 0,6825 puan, faizinin kazandığı faizdir. Bileşikleme sıklaştıkça fark açılır: günlük aylığı, aylık yıllığı yener.",
      },
      {
        q: "Bankalar arasında hangi oranı karşılaştırmalıyım?",
        a: "Tasarruf ve vadeli ürünlerde APY'yi APY ile karşılaştır — bileşikleme sıklığını zaten içine katmıştır; bu yüzden aylık bileşiklenen %5,10 APY, yıllık bileşiklenen %5,05 APY'den gerçekten iyidir. Kredilerde APR'yi APR ile karşılaştır. Tek bir karşılaştırmada APR ile APY'yi karıştırmak, tekliflerin yanıltma yoludur.",
      },
      {
        q: "Günlük seçeneği 365 mi 360 gün mü kullanır?",
        a: "Bu hesaplayıcı yılda 365 dönem kullanır; tüketici tasarruf hesaplarının çoğunun izlediği kural budur. Bazı finansal ürünler yılı 360 gün üzerinden annualize eder, bu da efektif oranı hafif kaydırır — küçük yazıda 360 yazıyorsa sonucu kesin teklif değil yakın bir yaklaşım say.",
      },
    ],
  },
  "gpa-calculator": {
    name: "GPA Hesaplayıcı",
    tagline:
      "Dönemin derslerini standart kalite puanlarıyla 4,0 ölçeğinde bir GPA'ya çevir; önceki kredilerini de harmanlayıp dürüst bir kümülatif GPA çıkar.",
    intro: [
      "Her dersi kredi saati ve harf notuyla ekle; hesaplayıcı 4,0 ölçeğinin standart kalite puanı tablosunu uygular — A = 4,0, A− = 3,7, B+ = 3,3 ve devamı — her notu kredileriyle tartar. 4 kredilik bir A, 3 kredilik bir A'dan ağır basar; tam transkriptinin dediği gibi.",
      "Arkanda notlar mı var? Önceki GPA'nı ve şu ana kadarki kredilerini gir; dönem sonucu kayıt ofisinin çalıştırdığı aynı ağırlıklı ortalama ile kümülatif GPA'ya harmanlanır. Eksik satırlar tahmin edilmez, atlanır; sayı yalnızca gerçekten doldurduğun dersleri yansıtır.",
    ],
    steps: [
      "Ders başına bir satır ekle: ad (isteğe bağlı), kredi saati ve harf notu.",
      "İlk dönemde önceki alanları boş bırak ya da o ana kadarki GPA'nı gir.",
      "Harmanlamanın doğru tartılması için o ana kadarki kredileri gir.",
      "Dönem GPA'sını ve birleşik kümülatif GPA'yı oku.",
    ],
    faqs: [
      {
        q: "Her harf notu kaç kalite puanı taşır?",
        a: "Standart 4,0 ölçeğinde: A+ ve A = 4,0, A− = 3,7, B+ = 3,3, B = 3,0, B− = 2,7, C+ = 2,3, C = 2,0, C− = 1,7, D+ = 1,3, D = 1,0, D− = 0,7 ve F = 0. GPA = Σ(puan × kredi) ÷ Σkredi: 4 kredilik bir A 12 kalite puanı getirir; 3 kredilik bir B+ ise 9,9.",
      },
      {
        q: "Kümülatif GPA iki kaydı nasıl harmanlar?",
        a: "Kümülatif GPA = (dönem GPA'sı × dönem kredisi + önceki GPA × önceki kredi) ÷ toplam kredi. Örnek: 7 kredi üzerinden 3,60'lık bir dönem, 60 kredi üzerinden 3,00'lik transkriptin üstüne gelince (3,60 × 7 + 3,00 × 60) ÷ 67 ≈ 3,06 eder. Krediyle tartmak, hafif bir dönemin kaydını çarpıtmasını önler.",
      },
      {
        q: "Harf ya da kredisi olmayan bir satır GPA'mı neden değiştirmiyor?",
        a: "Bir ders, kredi saati ve harf notunun ikisi de varken sayılır — yarım bırakılan her şey sıfır sayılmak yerine atılır; böylece GPA gerçekten tamamladığın dersleri yansıtır. Satırı tamamla, toplamlar hemen güncellenir.",
      },
    ],
  },
  "heart-rate-zones-calculator": {
    name: "Nabız Bölgeleri Hesaplayıcı",
    tagline:
      "Maksimum ve istirahat nabzını Karvonen yöntemiyle beş antrenman bölgesine çevir — ısınma, yağ yakımı, aerobik, anaerobik ve VO₂ max, bpm cinsinden.",
    intro: [
      "Yaşını ve istirahat nabzını gir; hesaplayıcı maksimum nabzını tahmin eder (206,9 − 0,67 × yaş; laboratuvar ölçümlerinden türetilmiş bir regresyon) ve istirahat-maksimum aralığını beş klasik antrenman bölgesine böler. İstirahat nabzı 60 bpm olan 30 yaşındaki biri yaklaşık 187 bpm maksimum ve kabaca 149–161 bpm'lik bir Z3 aerobik bant alır — göğüs bandıyla ya da saatle karşılaştırabileceğin gerçek sayılar.",
      "Bölgeler Karvonen'in kalp rezervi yöntemiyle hesaplanır: bpm = istirahat + % × (maks − istirahat). Ölçeklenen maksimum değil rezerv olduğu için bölgeler, istirahat nabzı alışılmadık biçimde düşük ya da yüksek olanlarda da dürüst kalır. Laboratuvar testinden ya da zorlu bir yarıştan ölçülmüş maksimumunu biliyor musun? Manuel moda geç ve doğrudan gir.",
    ],
    steps: [
      "Maksimum nabzı tahmin etmek için yaşını gir ya da Manuel moda geçip ölçülmüş bir değer yaz.",
      "İstirahat nabzını gir — yataktan kalkmadan önceki sabah ölçümü en iyisidir.",
      "Beş bölgeyi rezerv yüzdesi ve bpm aralıklarıyla oku.",
      "Antrenmanlarda saatini ya da göğüs bandını hedeflediğin bölgeye göre karşılaştır.",
    ],
    faqs: [
      {
        q: "206,9 − 0,67 × yaş, 220 − yaştan daha doğru mu?",
        a: "Popülasyon düzeyinde evet. Eski 220 − yaş kuralı 1970'lerden hakemden geçmemiş bir tabloya dayanır ve yaşlılarda maksimum nabzı abartır. Laboratuvar ölçümlerine oturtulmuş modern regresyonlar — Tanaka'nın 208 − 0,7 × yaş'ı, Gellish'in 207 − 0,7 × yaş'ı ve burada kullanılan 206,9 − 0,67 × yaş gibi benzer denklemler — gerçek maksimumları her yaşta çok daha iyi izler. Ama her denklem yaklaşık ±10 bpm'lik bireysel bir yayma taşır: tahmin bir başlangıç noktasıdır; laboratuvarda ölçülen ya da gerçekten sonuna kadar zorlandığın bir maksimum her zaman kazanır.",
      },
      {
        q: "Hesaplayıcı neden maksimumun yüzdesi yerine kalp rezervini (HRR) kullanıyor?",
        a: "Karvonen yöntemi yoğunluğu, istirahat ve maksimum nabız arasındaki aralıktan — asıl çalışan kısımdan — ölçer. Doğrudan maksimumun yüzdesiyle %60–70'lik bölge, yukarıdaki 30 yaşındaki örnekte 112–131 bpm'ye düşer; rezerv yüzdesiyle 136–149 bpm'ye. Fizyolojik olarak efor, kullandığın rezervle ölçeklenir; bu yüzden rezerv tabanlı bölgeler ventilatuar eşiklere ve algılanan yorulmaya daha iyi oturur — özellikle istirahat nabzı düşük olanlarda.",
      },
      {
        q: "İstirahat nabzımı nasıl ölçmeliyim?",
        a: "Sabah, uyanır uyanmaz ve yataktan kalkmadan önce ölç: nabzını 60 saniye (ya da 30 saniye × 2) say ve gürültüyü ortalamak için birkaç gün yinele. Giyilebilir cihazın 7 günlük istirahat ortalaması da olur. Tipik yetişkinler 60–80 bpm arasındadır; iyi antrenmanlı dayanıklılık sporcuları çoğu kez 40'larda ya da 50'lerde gezer. İstirahat nabzın tahmini maksimumunun üstündeyse — ya da beta bloker gibi bir ilaç nabzını etkiliyorsa — iki sayıyı da elle gir.",
      },
    ],
  },
  "shoe-size-converter": {
    name: "Ayakkabı Numarası Çevirici",
    tagline:
      "Ayakkabı numaralarını erkek ve kadın için US, UK, EU ve Japon sistemleri arasında çevir — santimetre cinsinden ayak uzunluğuna sabitlenmiş.",
    intro: [
      "Herhangi bir sistem ve numara seç; tüm karşılıklar bir anda görünür, karşılaştırma tahmin değil fiziksel olsun diye santimetre cinsinden ayak uzunluğuna sabitlenir.",
      "Numaralar markalar arasında standart değildir — sonucu bir başlangıç noktası say ve ayaklarının en büyük olduğu gün sonunda ölç.",
    ],
    steps: [
      "Erkek ya da kadın numara düzenini seç.",
      "Bildiğin sistemi seç ve numarayı gir.",
      "Diğer tüm sistemlerdeki karşılık gelen numaraları oku.",
    ],
    faqs: [
      {
        q: "Markalar neden yarım numara farklı düşer?",
        a: "Kalıp biçimleri ve üretim farklıdır. Tablo standart çeviriyi verir; tek tek markalar küçük ya da büyük düşebilir, bu yüzden online siparişte daima markanın kendi tablosuna bak.",
      },
      {
        q: "Ayaklarımı nasıl ölçmeliyim?",
        a: "Gün sonunda bir kağıt üzerine bas, iki ayağını da çiz ve topuktan en uzun parmağa kadar santimetre cinsinden ölç. Daha büyük ayağı kullan.",
      },
    ],
  },
  "stopwatch": {
    name: "Kronometre",
    tagline:
      "Tur süreleriyle hassas bir çevrimiçi kronometre — başlat, duraklat, tur al ve sıfırla; sistem saatine sabitlenmiş kaymasız ölçümle.",
    intro: [
      "Geçen süreyi birikmiş zaman aralıkları yerine sistem saatinden yüzde bir saniye hassasiyetle ölçer; böylece tarayıcı arka plan sekmesini yavaşlatsa bile doğru kalır.",
      "Çalışırken tur al; her tur kendi ara süresini ve artan toplamı gösterir ve ekran, gözle bir bakışta okunabilen büyük tablo hizalı rakamlar kullanır.",
    ],
    steps: [
      "Ölçümü başlatmak için Başlat'a tıkla.",
      "Kronometreyi durdurmadan ara süre kaydetmek için Tur'a tıkla.",
      "Dilediğin an duraklat, sürdür veya sıfırla.",
    ],
    faqs: [
      {
        q: "Hassas mı?",
        a: "Evet — geçen süre, birikmiş zamanlayıcı geri çağrılarından değil, sabit bir başlangıç zaman damgasına karşı Date.now()'dan türetilir; arka plan sekmesinin kısılması kaymaya yol açamaz.",
      },
      {
        q: "Turlar sayfa yenilemeden kalır mı?",
        a: "Hayır — fiziksel bir kronometre gibi, sıfırlama ya da yenileme oturumu temizler. Turları korumak için sekmeyi açık tut.",
      },
    ],
  },
  "countdown-timer": {
    name: "Geri Sayım Sayacı",
    tagline:
      "İlerleme halkası ve sıfırda çan sesiyle bir geri sayım kur — 1 ila 25 dakikalık hazır ayarlar ya da dilediğin özel süre.",
    intro: [
      "Mutfak, antrenman, toplantı ve ders için sade bir geri sayım. Halka ilerlemeyi bir bakışta gösterir; süre dolduğunda kısa bir sentezlenmiş çan sesi çalar.",
      "Bitiş, sistem saatine sabitlenmiştir; başka bir sekmeye geçsen bile geri sayım doğru biçimde akmaya devam eder.",
    ],
    steps: [
      "Saat, dakika ve saniyeyi ayarla — ya da hızlı hazır ayarlardan birine dokun.",
      "Başlat'a tıkla; zaman geçtikçe halka boşalır.",
      "Sıfırda çan sesi çalar ve halka yeşile döner.",
    ],
    faqs: [
      {
        q: "Arka plan sekmesinde çalışmaya devam eder mi?",
        a: "Evet — bitiş sistem saatine sabitlenmiştir; sekme değiştirmek ya da kısılma kalan süreyi etkilemez.",
      },
      {
        q: "Çan sesini duyar mıyım?",
        a: "WebAudio üzerinden kısa bir sentezlenmiş tondur. Sekmenin sessizde olmadığını ve cihaz sesinin açık olduğunu sağla; indirilecek bir ses dosyası yok.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* Geliştirme — TypeScript, JSON diff, JSON yolları, YAML               */
  /* ------------------------------------------------------------------ */
  "json-to-typescript": {
    name: "JSON'dan TypeScript'e",
    tagline:
      "Herhangi bir JSON'dan TypeScript arayüzleri üret — iç içe nesneler, diziler ve birleşimler, projene yapıştırmaya hazır.",
    intro: [
      "Bir JSON yanıtı yapıştır ve anında tipli arayüzler al: iç içe nesneler isimli arayüzlere dönüşür, nesne dizileri tek bir şekilde birleşir, karışık diziler birleşim (union) olur. Kök adı yapılandırılabilir.",
      "API işleri için tasarlandı — endpoint yanıtını yapıştır, tipleri kopyala ve şekil değişikliklerini derleyici yakalasın.",
    ],
    steps: [
      "JSON'unu yapıştır (en iyi sonuç bir API yanıtıyla çıkar).",
      "Root yerine başka bir şey istiyorsan kök arayüz adını değiştir.",
      "Üretilen arayüzleri projene kopyala.",
    ],
    faqs: [
      {
        q: "Diziler nasıl ele alınır?",
        a: "Nesne dizileri tüm elemanların anahtarlarını tek bir arayüzde birleştirir (eksik anahtar zaten çalışma zamanında hata olurdu). Karışık tip diziler string | number gibi bir birleşime dönüşür. Boş diziler unknown[] olur.",
      },
      {
        q: "Tüm alanlar zorunlu mu?",
        a: "Evet — tek bir örnek isteğe bağlılığı kanıtlayamaz, bu yüzden her şey zorunludur. API'nin null'a veya eksik anahtara izin verdiği alanları isteğe bağlı olarak kendin işaretle.",
      },
    ],
  },
  "json-diff": {
    name: "JSON Karşılaştırıcı",
    tagline:
      "İki JSON belgesini yol yol karşılaştır — eklenen, silinen ve değişen anahtarlar önce/sonra değerleriyle, tamamen yerelde.",
    intro: [
      "İki JSON belgesi yapıştır ve her yapısal farkı gör: eklenen anahtarlar, silinen anahtarlar, değişen değerler — her biri $.user.name gibi tam yoluyla raporlanır.",
      "İç içe nesneler ve diziler özyinelemeli gezilir: üç seviye derinde gömülü bir değişiklik bile tam yolu ve iki değeriyle birlikte belirir.",
    ],
    steps: [
      "İlk JSON'u yapıştır (orijinal).",
      "İkinci JSON'u yapıştır (yeni sürüm).",
      "Fark listesini oku — her satır yol seviyesinde bir değişikliktir.",
    ],
    faqs: [
      {
        q: "Diziler nasıl karşılaştırılır?",
        a: "İndeks ile: 0. eleman 0. elemana karşı ve böyle devam eder. Bir taraftaki fazladan elemanlar kendi indekslerinde eklenmiş veya silinmiş olarak görünür.",
      },
      {
        q: "Anahtar sırası önemli mi?",
        a: "Hayır — nesneler anahtarlara göre karşılaştırılır, eklenme sırasına göre değil. Aynı anahtarları farklı sırayla taşıyan iki belge özdeş sayılır.",
      },
    ],
  },
  "json-path-query": {
    name: "JSON Path Sorgusu",
    tagline:
      "JSON'dan herhangi bir değeri $.user.name veya $.items[0].id gibi bir yolla çek — anında, affedici, jq sözdizimi öğrenmeden.",
    intro: [
      "Tam ihtiyacın olan değeri işaret et: nokta gösterimi, dizi indeksleri ve tırnaklı anahtarlar çalışır ($.items[0].id, $['weird key']). Kocaman bir API yanıtından tek alan çıkarmak için birebir.",
      "Asla çökmez — yanlış yol düz dille bir gerekçe döndürür (anahtar bulunamadı, indeks aralık dışı); düzeltip yeniden denersin.",
    ],
    steps: [
      "JSON'unu yapıştır.",
      "İstediğin değerin yolunu yaz — $ köktür.",
      "Çıkarılan değeri kopyala.",
    ],
    faqs: [
      {
        q: "Hangi yol sözdizimi destekleniyor?",
        a: "Günlük alt küme: nokta gösterimi ($.a.b), dizi indeksleri ($.items[0]), tırnaklı anahtarlar ($['odd key']). Tam JSONPath filtreleri ve joker karakterler kapsam dışıdır — bu araç doğrudan çıkarma içindir.",
      },
      {
        q: "Yol yanlışsa ne olur?",
        a: "Tam gerekçeyi alırsın: hangi anahtar eksikti ya da hangi indeks aralık dışıydı. Hiçbir şey çökmez.",
      },
    ],
  },
  "json-yaml-converter": {
    name: "JSON ⇄ YAML Dönüştürücü",
    tagline:
      "JSON'u YAML'a ve geriye dönüştür — yapılandırma dosyalarına hazır, yön değiştirip devam etme akışıyla ve hassas hata mesajlarıyla.",
    intro: [
      "JSON ve YAML arasında çift yönlü dönüşüm: JSON yapıştır, config dosyaların için 2 boşluklu temiz YAML al; YAML yapıştır, JSON al. Değiştir düğmesi yönü çevirir, tek panelde gidiş-dönüşü tamamlarsın.",
      "js-yaml üzerinde çalışır ve hataları net bildirir — kötü girinti veya yinelenen anahtar, şifreli bir başarısızlık yerine tam olarak neyin ters gittiğini gösterir.",
    ],
    steps: [
      "Yöne göre JSON veya YAML yapıştır.",
      "Dönüştür'e tıkla — çıktı aşağıda görünür.",
      "Diğer yönde devam etmek için değiştir düğmesini kullan.",
    ],
    faqs: [
      {
        q: "Hangi YAML özellikleri destekleniyor?",
        a: "Standart js-yaml core şeması: iç içe haritalar, diziler (sequence), skalerler, tırnaklı dizgeler. YAML çapaları ve özel etiketler güvenilir gidiş-dönüş için kapsam dışıdır.",
      },
      {
        q: "Dönüşümüm neden başarısız oldu?",
        a: "En sık neden, YAML girintisinde sekme karakteri (orada yasaktır) veya JSON'da yinelenen anahtarlardır. Hata mesajı sorunu işaret eder.",
      },
    ],
  },
  "sha1-generator": {
    name: 'SHA-1 Üretici',
    tagline: 'Metin veya dosyaların SHA-1 özetini tarayıcınızda native WebCrypto ile hesaplayın — Git commitlerinde ve eski sağlama toplamlarında hâlâ kullanılıyor. Tamamen yerel.',
    intro: ['Metni yapıştırın ve 160 bitlik SHA-1 özetini anında görün, ya da bir dosya bırakıp yerelde parmak izi alın. Tarayıcının WebCrypto motoru işi yapar — tek bir bayt bile cihazdan çıkmaz.', 'SHA-1 eski ama yaşıyor: Git hâlâ nesneleri onunla tanımlıyor ve birçok eski sistem indirmeleri SHA-1 sağlama toplamlarıyla doğruluyor. Uyumluluk için kullanın — güvenlik için SHA-256 veya üstünü seçin.'],
    steps: ['Metni yazın veya yapıştırın — özet yazdıkça güncellenir.', "Ya da dosya moduna geçip bir dosyayı bırakarak yerelde hash'leyin.", 'Onaltılık özeti kopyalayın ve beklenen değerle karşılaştırın.'],
    faqs: [
        { q: 'q', a: 'a' },
        { q: 'q', a: 'a' },
        { q: 'q', a: 'a' },
    ],
  },
  "sha384-generator": {
    name: 'SHA-384 Üretici',
    tagline: 'Metin veya dosyaların SHA-384 özetini tarayıcınızda native WebCrypto ile hesaplayın — checksum, HMAC ve arşiv bütünlüğü için en güçlü SHA-2 özeti. Tamamen yerel.',
    intro: ["Metni yapıştırın ve 384 bitlik özeti anında görün, ya da bir dosya bırakıp yerelde parmak izi alın. 64-bit donanımda SHA-384 genelde SHA-256'dan hızlıdır — büyük arşivler için ideal.", 'SHA-384; HMAC API imzalarında, disk imgesi doğrulamada ve uzun vadeli arşiv sağlama toplamlarında karşınıza çıkar. Onaltılık özeti kopyalayıp yayınlanan değerle karşılaştırın.'],
    steps: ['Metni yazın veya yapıştırın — özet yazdıkça güncellenir.', "Ya da dosya moduna geçip bir dosyayı bırakarak yerelde hash'leyin.", 'Onaltılık özeti kopyalayıp karşılaştırın.'],
    faqs: [
        { q: 'q', a: 'a' },
        { q: 'q', a: 'a' },
    ],
  },
  "sha512-generator": {
    name: 'SHA-512 Üretici',
    tagline: 'Metin veya dosyaların SHA-512 özetini tarayıcınızda native WebCrypto ile hesaplayın — checksum, HMAC ve arşiv bütünlüğü için en güçlü SHA-2 özeti. Tamamen yerel.',
    intro: ["Metni yapıştırın ve 512 bitlik özeti anında görün, ya da bir dosya bırakıp yerelde parmak izi alın. 64-bit donanımda SHA-512 genelde SHA-256'dan hızlıdır — büyük arşivler için ideal.", 'SHA-512; HMAC API imzalarında, disk imgesi doğrulamada ve uzun vadeli arşiv sağlama toplamlarında karşınıza çıkar. Onaltılık özeti kopyalayıp yayınlanan değerle karşılaştırın.'],
    steps: ['Metni yazın veya yapıştırın — özet yazdıkça güncellenir.', "Ya da dosya moduna geçip bir dosyayı bırakarak yerelde hash'leyin.", 'Onaltılık özeti kopyalayıp karşılaştırın.'],
    faqs: [
        { q: 'q', a: 'a' },
        { q: 'q', a: 'a' },
    ],
  },
};
