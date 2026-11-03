import type { ToolCopy } from "../_lib/types";

/**
 * Cover Bahasa Indonesia (id) untuk seluruh registry: satu blok ToolCopy per slug.
 * Kontrak: setiap slug registry wajib tercakup (tests/overlays.test.ts + tests/registry.test.ts).
 * "Zoyku" dan token teknis (PDF, JPG, JSON, QR…) dibiarkan apa adanya.
 */
export const id: Record<string, ToolCopy> = {
  /* ------------------------------------------------------------------ */
  /* PDF                                                                 */
  /* ------------------------------------------------------------------ */
  "merge-pdf": {
    name: "Gabungkan PDF",
    tagline:
      "Gabungkan beberapa PDF menjadi satu dokumen langsung di browser — susun urutan bebas, tanpa unggahan, tanpa watermark, tanpa daftar akun.",
    intro: [
      "Masukkan sebanyak apa pun PDF yang Anda butuhkan, atur urutannya persis seperti yang diinginkan, lalu gabungkan menjadi satu file. Bukti pemesanan, faktur, bab hasil scan, berkas lamaran — apa pun yang datang sebagai sepuluh lampiran terpisah berubah menjadi satu dokumen yang rapi.",
      "Berbeda dari layanan penggabung online yang mengunggah file Anda ke server, alat ini membaca dan menulis PDF sepenuhnya di perangkat Anda dengan pdf-lib. Kontrak, KTP, dan dokumen keuangan Anda tidak pernah keluar dari browser.",
    ],
    steps: [
      "Letakkan dua file PDF atau lebih ke dalam kotak (atau klik untuk memilihnya).",
      "Susun ulang daftarnya dengan tombol ↑ / ↓ sampai urutannya pas.",
      "Klik Gabungkan PDF dan unduh file gabungannya.",
    ],
    faqs: [
      {
        q: "Berapa banyak PDF yang bisa digabungkan, dan seberapa besar ukurannya?",
        a: "Tidak ada batas buatan — batas praktisnya adalah memori perangkat Anda. Laptop modern dengan nyaman menggabungkan 20+ file atau total sekitar 100–200 MB; scan yang sangat besar mungkin lebih lambat tetapi tetap berhasil.",
      },
      {
        q: "Apakah bookmark, kolom formulir, atau anotasi tetap ada setelah digabungkan?",
        a: "Isi halaman, gambar, dan sebagian besar anotasi tetap dipertahankan. Fitur tingkat dokumen seperti bookmark dan nilai kolom formulir tidak ikut terbawa — file gabungan memuat halaman visual dari setiap sumber.",
      },
      {
        q: "Apakah file saya diunggah ke mana pun?",
        a: "Tidak. Penggabungan terjadi secara lokal di browser Anda dengan JavaScript. Tidak ada yang dikirim ke server mana pun, dan PDF gabungan dibuat di perangkat Anda sendiri.",
      },
    ],
  },
  "split-pdf": {
    name: "Pisahkan PDF",
    tagline:
      "Pisahkan PDF menjadi beberapa file berdasarkan jumlah halaman tetap atau rentang khusus — semua hasil dibuat secara lokal dan tidak ada yang diunggah.",
    intro: [
      "Pecah PDF panjang menjadi file-file kecil dengan dua cara: potong setiap N halaman (praktis untuk 1 halaman per file atau seukuran bab), atau tentukan rentang khusus seperti “1-3, 4-6, 8” dan dapatkan satu file per rentang. Beberapa hasil otomatis dikemas menjadi ZIP.",
      "Pemisahan berjalan di perangkat Anda dengan pdf-lib — file asli tetap utuh, dan potongan-potongannya tidak pernah melewati server. Ideal untuk dokumen rahasia yang Anda enggan unggah ke mana pun.",
    ],
    steps: [
      "Letakkan PDF yang ingin dipisahkan.",
      "Pilih “setiap N halaman” atau rentang khusus, lalu isi nilainya.",
      "Klik Pisahkan PDF, lalu unduh tiap bagian atau seluruh ZIP-nya.",
    ],
    faqs: [
      {
        q: "Bagaimana memisahkan PDF menjadi halaman tunggal?",
        a: "Pilih “Setiap N halaman”, atur nilainya menjadi 1, dan setiap halaman menjadi PDF tersendiri. Untuk lebih dari satu file hasil, Anda juga mendapat ZIP yang memuat semuanya.",
      },
      {
        q: "Format rentang apa yang didukung?",
        a: "Nilai dipisah koma dan rentang dengan tanda hubung, misalnya “1-3, 5, 8-10”. Rentang boleh tumpang-tindih dan diproses sesuai urutan Anda mengetiknya.",
      },
      {
        q: "Apakah pemisahan mengubah kualitas halaman saya?",
        a: "Tidak. Halaman disalin byte demi byte ke dokumen baru, jadi teks tetap bisa dipilih dan gambar mempertahankan kualitas aslinya.",
      },
    ],
  },
  "rotate-pdf": {
    name: "Putar PDF",
    tagline:
      "Putar halaman PDF 90, 180, atau 270 derajat dan simpan perubahannya secara permanen — betulkan scan miring di browser, tanpa unggahan.",
    intro: [
      "Hasil scan ternyata menyamping atau terbalik? Putar semua halaman sekaligus, atau sasarkan hanya halaman yang perlu diperbaiki dengan daftar seperti “1, 3-5”. Rotasi ditulis langsung ke dalam PDF, jadi file terbuka dengan orientasi benar di semua pembaca.",
      "Banyak penampil hanya memutar halaman sementara — alat ini mengubah atribut /Rotate halaman dengan pdf-lib di perangkat Anda, itulah mengapa perbaikannya bertahan saat dicetak, dibagikan, dan diunggah ulang.",
    ],
    steps: [
      "Letakkan PDF yang halamannya perlu diputar.",
      "Pilih 90°, 180°, atau 270° dan jika perlu batasi rotasi ke halaman tertentu.",
      "Klik Putar halaman dan unduh PDF yang sudah diperbaiki.",
    ],
    faqs: [
      {
        q: "Apakah rotasinya permanen?",
        a: "Ya. Atribut rotasi halaman diperbarui di dalam file, sehingga semua pembaca PDF, printer, dan pratinjau menampilkan orientasi yang benar — bukan hanya tab browser ini.",
      },
      {
        q: "Bagaimana memutar hanya sebagian halaman?",
        a: "Isi kolom halaman dengan daftar seperti “2, 5-7”. Biarkan kosong untuk memutar seluruh dokumen. Rentangnya memakai sintaks yang sama dengan alat halaman lainnya.",
      },
      {
        q: "Apakah memutar me-render ulang atau mengompres halaman saya?",
        a: "Tidak. Hanya penanda rotasi yang berubah; isi halaman tidak disentuh, jadi kualitasnya identik dan teks tetap bisa dipilih.",
      },
    ],
  },
  "delete-pdf-pages": {
    name: "Hapus Halaman PDF",
    tagline:
      "Buang halaman yang tidak perlu dari PDF dalam hitungan detik — ketik halaman yang ingin dihapus, unduh file yang ramping, semuanya diproses di dalam browser Anda.",
    intro: [
      "Halaman kosong, sampul lama, halaman berisi data orang lain — masukkan sebagai “1, 3-5” dan dapatkan PDF bersih dengan sisanya tetap utuh. Alat ini menampilkan jumlah halaman dokumen Anda agar bisa memeriksa nomornya sebelum memotong.",
      "Halaman yang tersisa disalin byte demi byte, jadi teks tetap bisa dipilih dan gambar tetap berkualitas. Semuanya terjadi secara lokal dengan pdf-lib; file tidak pernah diunggah.",
    ],
    steps: [
      "Letakkan PDF yang ingin dirampingkan.",
      "Ketik halaman yang ingin dihapus, misalnya “2, 6-8”.",
      "Klik Hapus halaman dan unduh dokumen yang tersisa.",
    ],
    faqs: [
      {
        q: "Bisakah saya menghapus semua halaman dokumen?",
        a: "Tidak — sebuah PDF minimal harus punya satu halaman. Kalau Anda memasukkan semua halaman, alat ini akan menolak; hapus semua kecuali satu jika memang itu yang Anda butuhkan.",
      },
      {
        q: "Bagaimana caranya menyimpan hanya beberapa halaman?",
        a: "Lebih mudah dipikir terbalik: hapus semua yang tidak Anda perlukan. “2-10, 12” pada dokumen 12 halaman menyisakan halaman 1 dan 11.",
      },
      {
        q: "Apa yang terjadi pada penomoran halaman?",
        a: "Halaman menutup secara otomatis: setelah menghapus halaman 2-4, halaman 5 yang lama menjadi halaman 2. Tautan internal yang menunjuk ke halaman terhapus bisa berhenti berfungsi.",
      },
    ],
  },
  "rearrange-pdf-pages": {
    name: "Susun Ulang Halaman PDF",
    tagline:
      "Atur ulang halaman PDF secara visual dengan thumbnail langsung — geser halaman naik-turun, balikkan semuanya, dan ekspor PDF baru secara lokal.",
    intro: [
      "Hasil scan urutannya acak? Setiap halaman muncul sebagai thumbnail sungguhan, jadi Anda tahu persis apa yang sedang dipindahkan. Geser dengan tombol panah, balik seluruh dokumen dengan tombol Balik, dan kembalikan ke urutan asli kapan saja.",
      "Urutan baru ditulis ke dalam PDF yang benar-benar baru di perangkat Anda — halaman disalin byte demi byte, sehingga kualitas, font, dan teks yang bisa dipilih semuanya selamat dari penataan ulang.",
    ],
    steps: [
      "Letakkan PDF dan tunggu thumbnail halamannya muncul.",
      "Pindahkan halaman dengan ↑ / ↓, atau pakai Balik untuk urutan sebaliknya.",
      "Klik Terapkan urutan & unduh untuk mendapatkan PDF yang sudah disusun ulang.",
    ],
    faqs: [
      {
        q: "Kenapa PDF yang sangat panjang menampilkan angka, bukan thumbnail, untuk halaman-halaman berikutnya?",
        a: "Thumbnail hanya dirender lebih dulu untuk 60 halaman pertama agar browser tetap responsif. Setelah itu Anda tetap melihat nomor halaman dan bisa menata ulangnya dengan cara yang sama persis.",
      },
      {
        q: "Bisakah saya memindahkan halaman dari posisi 40 ke posisi 2?",
        a: "Bisa, tetapi butuh klik berulang dengan tombol panah. Untuk lompatan jauh, sering lebih cepat membalik dokumen lebih dulu, atau memisahkannya lalu menggabungkan potongan-potongannya dalam urutan baru.",
      },
      {
        q: "Apakah penataan ulang memengaruhi kualitas?",
        a: "Sama sekali tidak. Halaman disalin tanpa perubahan ke dokumen baru — hanya urutannya yang berbeda.",
      },
    ],
  },
  "watermark-pdf": {
    name: "Watermark PDF",
    tagline:
      "Stempel teks watermark di setiap halaman PDF — di tengah atau berpola, dengan kendali penuh atas ukuran, opasitas, rotasi, dan warna, sepenuhnya offline.",
    intro: [
      "Tandai draf sebagai CONFIDENTIAL, DRAFT, atau FOR REVIEW sebelum keluar dari tangan Anda. Pilih satu stempel di tengah atau pola berulang di seluruh halaman, atur opasitas agar teks di bawahnya tetap terbaca, dan pilih warna yang cocok dengan dokumen.",
      "Watermark menjadi teks PDF sungguhan yang digambar di setiap halaman — bukan gambar, tanpa bolak-balik ke server. Karena diproses dengan pdf-lib di perangkat Anda, kontrak yang sensitif pun bisa ditandai tanpa diunggah.",
    ],
    steps: [
      "Letakkan PDF yang ingin ditandai.",
      "Ketik teks watermark-nya lalu sesuaikan tata letak, ukuran, opasitas, dan warna.",
      "Klik Tambahkan watermark dan unduh PDF yang sudah distempel.",
    ],
    faqs: [
      {
        q: "Opasitas berapa yang paling bagus?",
        a: "Antara 10% dan 25% untuk kebanyakan dokumen: terlihat sekilas tetapi cukup tipis agar teks utama tetap terbaca. Draf yang memang harus sulit dibaca boleh sampai 40–50%.",
      },
      {
        q: "Bisakah alat ini menghapus watermark yang sudah ada?",
        a: "Tidak. Alat ini hanya menambahkan watermark. Menghapusnya berarti menyunting content stream halaman — operasi yang berbeda (dan sering bermasalah secara hukum).",
      },
      {
        q: "Karakter apa saja yang bisa dipakai watermark?",
        a: "Font standar PDF mencakup teks Latin, tanda baca, dan simbol umum seperti ©. Aksara lain (Cina, Jepang, Arab…) diganti dengan ? — gunakan huruf Latin untuk watermark.",
      },
    ],
  },
  "sign-pdf": {
    name: "Tanda Tangan PDF",
    tagline:
      "Gambar tanda tangan dengan mouse atau jari lalu letakkan di halaman PDF mana pun — stempel bergaya tinta alami yang dibuat dan disimpan sepenuhnya offline.",
    intro: [
      "Tanda tangani kontrak, surat izin, dan formulir tanpa mencetaknya. Gambar tanda tangan di pad, posisikan pada grid 3×3 (kanan bawah adalah tempat yang biasa), atur lebarnya, dan jika perlu tambahkan tanggal hari ini di bawahnya. PNG transparannya langsung disematkan ke PDF.",
      "Ini tanda tangan berbasis gambar yang terlihat — sempurna untuk dokumen sehari-hari. Bukan tanda tangan sertifikat kriptografi, dan apakah memenuhi proses hukum tertentu bergantung pada yurisdiksi Anda.",
    ],
    steps: [
      "Letakkan PDF, lalu gambar tanda tangan Anda di pad.",
      "Pilih posisi, lebar, dan halaman target (bawaan halaman 1).",
      "Klik Tanda tangani & unduh lalu simpan PDF yang sudah ditandatangani.",
    ],
    faqs: [
      {
        q: "Apakah tanda tangan ini mengikat secara hukum?",
        a: "Tanda tangan gambar diterima secara luas untuk kesepakatan sehari-hari, tetapi bobot hukumnya berbeda-beda antarnegara dan jenis dokumen. Untuk transaksi yang mewajibkannya, gunakan sertifikat digital yang memenuhi syarat.",
      },
      {
        q: "Apakah tanda tangan saya aman di sini?",
        a: "Ya. Anda menggambar di browser, gambarnya disematkan ke PDF di perangkat Anda sendiri, dan tidak ada yang dikirim — bahkan tanda tangannya sendiri pun tidak.",
      },
      {
        q: "Bisakah saya menandatangani setiap halaman dokumen?",
        a: "Bisa. Isi kolom halaman dengan daftar seperti “1-5” atau biarkan satu halaman saja; tanda tangan distempel di posisi yang sama pada setiap halaman yang dipilih.",
      },
    ],
  },
  "compress-pdf": {
    name: "Kompres PDF",
    tagline:
      "Perkecil PDF yang berat dengan merender ulang halaman pada DPI dan kualitas JPEG pilihan Anda — dukungan batch dan ukuran sebelum/sesudah yang akurat, semuanya offline.",
    intro: [
      "Scan dan laporan kaya gambar sering kali 10× lebih besar dari yang seharusnya. Alat ini merender ulang setiap halaman pada resolusi pilihan Anda (72–150 DPI mencakup bacaan layar dan sebagian besar cetakan) lalu mengodekannya ulang sebagai JPEG yang dioptimalkan, biasanya memangkas ukuran file 50–90%.",
      "Proses beberapa file sekaligus dan lihat penghematan persis per file sebelum mengunduh. Mode grayscale opsional memangkas scan hitam-putih lebih jauh lagi. Semuanya berjalan di perangkat Anda — terkompresi atau tidak, dokumen Anda tetap di tempatnya.",
    ],
    steps: [
      "Letakkan satu file PDF atau lebih (batch sangat dianjurkan).",
      "Pilih DPI dan kualitas JPEG, atau aktifkan grayscale.",
      "Klik Kompres, bandingkan ukuran sebelum/sesudah, lalu unduh.",
    ],
    faqs: [
      {
        q: "Apakah PDF saya masih punya teks yang bisa dipilih setelah kompresi?",
        a: "Tidak — metode ini merasterisasi halaman menjadi gambar, jadi teks berubah menjadi piksel. Itulah harga dari pengurangan ukuran yang besar. Kalau butuh teks yang bisa dicari, simpan aslinya dan bagikan salinan terkompresi hanya di tempat ukuran memang penting.",
      },
      {
        q: "Pengaturan mana yang sebaiknya dipilih?",
        a: "96 DPI pada kualitas ~60% adalah pilihan bawaan yang bagus untuk email dan web. Pakai 150 DPI jika PDF akan dicetak; 72 DPI dengan grayscale agresif tetapi cukup untuk arsip teks murni.",
      },
      {
        q: "Bagaimana kalau file hampir tidak mengecil?",
        a: "PDF yang sangat murni teks memang sudah efisien dan mungkin tidak bisa dikompres — tabelnya akan memberi tahu Anda dengan jujur. Turunkan DPI atau kualitas lalu coba lagi, atau terima bahwa aslinya memang sudah ramping.",
      },
    ],
  },
  "jpg-to-pdf": {
    name: "JPG ke PDF",
    tagline:
      "Ubah foto JPG menjadi PDF yang rapi di browser Anda — impor batch, penataan ulang tanpa drag-and-drop, dan ukuran halaman A4, Letter, atau pas foto.",
    intro: [
      "Konversikan foto JPG sebanyak apa pun menjadi satu PDF yang tertata: pas foto, struk, tugas hasil scan, atau galeri kamera yang perlu dikirim email sebagai satu lampiran. Tambahkan semua gambar sekaligus, urutkan dengan tombol panah, lalu pilih apakah tiap halaman menempel pada foto atau memakai A4/Letter dengan margin.",
      "Foto disematkan dengan kualitas asli penuh — tanpa pengubahan ukuran, tanpa kompresi ulang, tanpa watermark. Konversi terjadi di perangkat Anda, jadi gambar pribadi pun tidak pernah menyentuh server.",
    ],
    steps: [
      "Letakkan semua gambar JPG yang ingin dimasukkan.",
      "Atur urutannya dan pilih ukuran halaman (pas, A4, atau Letter).",
      "Klik Buat PDF dan unduh hasilnya.",
    ],
    faqs: [
      {
        q: "Apakah foto kehilangan kualitas di PDF?",
        a: "Tidak. File JPG Anda disematkan byte demi byte, jadi data gambar di dalam PDF identik dengan aslinya. Kualitas hanya turun kalau Anda mengompres PDF-nya setelahnya.",
      },
      {
        q: "Berapa banyak gambar yang bisa dikonversi sekaligus?",
        a: "Sebanyak yang diizinkan memori browser Anda — puluhan itu biasa; ratusan foto bermegabita mungkin lambat tetapi tetap berjalan secara lokal.",
      },
      {
        q: "Bisakah JPG dicampur dengan PNG atau format lain?",
        a: "Bisa — pakai alat umum Gambar ke PDF untuk batch campuran; format lain dikonversi otomatis sebelum disematkan.",
      },
    ],
  },
  "png-to-pdf": {
    name: "PNG ke PDF",
    tagline:
      "Konversikan tangkapan layar dan gambar PNG menjadi satu PDF tanpa dikompresi ulang — impor batch, urutan bebas, diproses di perangkat Anda.",
    intro: [
      "Tangkapan layar, grafik, diagram, dan ekspor desain biasanya berformat PNG — dan orang biasanya menginginkannya sebagai PDF. Letakkan satu batch penuh, urutkan dengan tombol panah, dan dapatkan PDF lossless: data PNG disematkan apa adanya, jadi teks di tangkapan layar tetap setajam aslinya.",
      "Pilih halaman pas-gambar untuk ukuran piksel sempurna, atau A4/Letter dengan margin untuk dicetak. Semuanya dibangun dengan pdf-lib di perangkat Anda; tanpa unggahan, tanpa judi kualitas.",
    ],
    steps: [
      "Letakkan file PNG yang ingin digabungkan.",
      "Urutkan dan pilih halaman pas-gambar atau A4/Letter.",
      "Klik Buat PDF dan unduh hasilnya.",
    ],
    faqs: [
      {
        q: "Apakah kualitas PNG dipertahankan persis?",
        a: "Ya. Stream PNG disematkan tanpa perubahan, jadi tepi tajam, teks kecil, dan area berlatar transparan tampak persis seperti file sumbernya.",
      },
      {
        q: "Ukuran halaman mana yang sebaiknya dipilih untuk tangkapan layar?",
        a: "“Pas gambar” menjaga setiap tangkapan layar pada ukuran piksel aslinya — paling cocok untuk bacaan layar. Pilih A4 atau Letter dengan margin saat PDF akan dicetak.",
      },
      {
        q: "Kenapa PDF berbasis PNG saya masih besar?",
        a: "Data PNG lossless memang besar secara alami. Kalau butuh file lebih kecil, lewati hasilnya ke Kompres PDF yang menukar sedikit ketepatan dengan ukuran.",
      },
    ],
  },
  "image-to-pdf": {
    name: "Gambar ke PDF",
    tagline:
      "Gabungkan gambar format apa pun — JPG, PNG, WebP, GIF, dan lainnya — menjadi satu PDF, dengan konversi otomatis dan nol unggahan.",
    intro: [
      "Satu alat untuk semua gambar: letakkan batch campuran file JPG, PNG, WebP, GIF, atau BMP dan semuanya mendarat di satu PDF. Apa pun yang belum siap PDF dikonversi secara lokal melalui canvas, jadi batch campuran langsung jalan.",
      "Urutkan halaman, pilih pas-gambar atau A4/Letter dengan margin, lalu ekspor. Ini versi serbaguna dari konverter JPG dan PNG kami, dengan janji yang sama: file tidak pernah meninggalkan perangkat Anda.",
    ],
    steps: [
      "Letakkan gambar dengan campuran format apa pun yang didukung.",
      "Susun ulang daftarnya dan pilih ukuran halaman.",
      "Klik Buat PDF dan unduh dokumen Anda.",
    ],
    faqs: [
      {
        q: "Format apa saja yang didukung?",
        a: "Semua yang bisa ditampilkan browser Anda: JPG, PNG, WebP, GIF, BMP, dan AVIF di kebanyakan sistem. File yang sudah JPG atau PNG disematkan tanpa pengodean ulang; lainnya dikonversi ke PNG lossless lebih dulu.",
      },
      {
        q: "Apa yang terjadi pada foto HEIC dari iPhone?",
        a: "Browser modern sering tidak bisa mendekode HEIC langsung. Konversikan dulu dengan alat HEIC ke JPG kami, lalu gabungkan JPG-nya di sini.",
      },
      {
        q: "Apakah GIF beranimasi tetap beranimasi di PDF?",
        a: "Tidak — halaman PDF itu statis, jadi Anda mendapatkan frame pertamanya. Konversikan animasi menjadi video atau bagikan file GIF-nya langsung.",
      },
    ],
  },
  "pdf-to-jpg": {
    name: "PDF ke JPG",
    tagline:
      "Ekspor setiap halaman PDF sebagai gambar JPG hingga 300 DPI — halaman tunggal atau ZIP untuk banyak halaman, dikonversi langsung di perangkat Anda.",
    intro: [
      "Ubah PDF menjadi gambar yang mudah dibagikan: setiap halaman menjadi JPG pada resolusi pilihan Anda, dirender persis seperti tampilan halamannya — font, warna, dan gambar ikut serta. Sepuluh halaman memberi Anda sepuluh file bernomor; lebih dari satu dan Anda juga mendapat ZIP.",
      "JPG adalah format yang diterima di mana pun oleh chat, slide, dan platform sosial. Rendering terjadi secara lokal dengan pdf.js — PDF tidak pernah diunggah, dan itu penting untuk kontrak serta dokumen pribadi.",
    ],
    steps: [
      "Letakkan PDF yang ingin dikonversi.",
      "Pilih resolusi keluaran (150 DPI cocok untuk kebanyakan layar).",
      "Klik Konversi dan unduh tiap halaman atau ZIP-nya.",
    ],
    faqs: [
      {
        q: "Resolusi mana yang sebaiknya dipilih?",
        a: "96 DPI cukup untuk dilihat di layar, 150 DPI adalah pilihan seimbang, dan 200–300 DPI cocok untuk cetakan. DPI lebih tinggi berarti file lebih besar dan rendering lebih lambat pada dokumen panjang.",
      },
      {
        q: "Kenapa teksnya terlihat lebih lembut daripada di PDF?",
        a: "JPG adalah format foto lossy — pada kualitas rendah, tepi huruf yang tajam mendapat sedikit artefak. Naikkan DPI atau pakai alat PDF ke PNG untuk teks yang presisi piksel.",
      },
      {
        q: "Bisakah saya mengonversi hanya sebagian halaman?",
        a: "Alat ini mengonversi seluruh dokumen dan menamai file berdasarkan nomor halaman, jadi Anda bisa menyimpan hanya yang diperlukan. Pakai Pisahkan PDF lebih dulu kalau ingin rentang tertentu sejak awal.",
      },
    ],
  },
  "pdf-to-png": {
    name: "PDF ke PNG",
    tagline:
      "Konversikan halaman PDF menjadi gambar PNG lossless pada resolusi pilihan Anda — slide dan scan yang tajam, lengkap dengan ZIP saat halamannya banyak.",
    intro: [
      "Saat artefak JPG tidak diinginkan — tangkapan layar slide, diagram, formulir dengan cetakan kecil — ekspor halaman sebagai PNG. Format lossless ini menjaga tepi huruf dan garis tipis tetap presisi piksel, dari 96 hingga 300 DPI.",
      "Setiap halaman dirender secara lokal dengan pdf.js persis sesuai tampilan yang didefinisikan PDF. File dinamai berdasarkan nomor halaman, dan hasil multi-halaman datang dengan ZIP sekali klik.",
    ],
    steps: [
      "Letakkan PDF Anda ke dalam kotak.",
      "Pilih resolusinya — 150 DPI adalah pilihan yang solid.",
      "Klik Konversi ke PNG, lalu unduh halaman-halaman atau ZIP-nya.",
    ],
    faqs: [
      {
        q: "Kapan sebaiknya memakai PNG alih-alih JPG?",
        a: "Kapan pun halamannya berisi teks, warna rata, atau line art: PNG menjaganya tetap setajam aslinya. JPG cocok untuk halaman foto yang ukuran file kecilnya lebih penting.",
      },
      {
        q: "Kenapa file PNG-nya besar?",
        a: "Kompresi lossless mempertahankan setiap piksel, jadi ukurannya tumbuh mengikuti DPI. Scan 300 DPI halaman yang padat bisa mencapai beberapa megabita; turunkan ke 96–150 DPI untuk penggunaan di layar.",
      },
      {
        q: "Apakah transparansi dipertahankan?",
        a: "Halaman dirender di atas latar putih, jadi hasilnya PNG opak. Itu sesuai dengan cara PDF dicetak dan menghindari kejutan latar hitam di penampil.",
      },
    ],
  },
  "pdf-to-word": {
    name: "PDF ke Word",
    tagline:
      "Ubah teks PDF menjadi dokumen Word (.docx) yang bisa diedit di browser Anda — konversi berfokus teks, gratis, tanpa apa pun yang diunggah.",
    intro: [
      "Ekstrak kata-kata dari PDF menjadi .docx yang bisa Anda edit di Word, Google Docs, atau LibreOffice. Judul dideteksi dari ukuran font, paragraf dibangun ulang dari posisi baris, dan hasilnya dokumen bersih serta ringan yang siap Anda olah.",
      "Ini konversi berfokus teks yang jujur: ia tidak merekonstruksi tata letak halaman yang kompleks, kolom, atau penempatan gambar. Kelebihannya privasi total — analisis dan pembuatan .docx terjadi sepenuhnya di perangkat Anda.",
    ],
    steps: [
      "Letakkan PDF berbasis teks (yang teksnya bisa dipilih).",
      "Klik Konversi ke Word dan tunggu sesaat.",
      "Unduh .docx-nya dan edit di mana saja.",
    ],
    faqs: [
      {
        q: "Kenapa tata letaknya berbeda dari PDF asli?",
        a: "Ini konversi berfokus teks: ia membangun ulang paragraf dan tingkat judul, bukan mereproduksi halaman piksel demi piksel. Harapkan kata-kata yang sama dalam alur yang lebih bersih dan bisa diedit — bukan klon visual.",
      },
      {
        q: "PDF saya hasil scan dan menghasilkan dokumen kosong.",
        a: "PDF scan berisi gambar teks, bukan teks. Lewatikan dulu ke alat OCR kami, lalu tempel atau konversikan teks yang dikenali ke Word.",
      },
      {
        q: "Apakah tabel dan gambar ikut terbawa?",
        a: "Gambar tidak dibawa ke .docx. Tabel muncul sebagai baris teks biasa — masih terpakai, tetapi Anda akan ingin membangun ulang tabel yang sebenarnya di Word untuk kasus yang kompleks.",
      },
    ],
  },
  "pdf-to-excel": {
    name: "PDF ke Excel",
    tagline:
      "Ekstrak baris dan kolom PDF menjadi spreadsheet Excel (.xlsx) yang bisa diedit — konversi baris demi baris di browser Anda, gratis.",
    intro: [
      "Rekening koran, daftar harga, dan laporan yang terkunci di PDF kembali menjadi data yang bisa diolah: setiap baris visual menjadi baris spreadsheet, dan teks yang terpisah oleh spasi lebar dipecah menjadi kolom secara otomatis. Nomor halaman disimpan di kolom pertama agar semuanya bisa dilacak kembali.",
      "Ini ekstraksi berbasis teks yang praktis — bukan rekonstruksi tabel dengan AI. Ia unggul pada rekening koran berfont monospaced dan daftar yang rata; tabel multi-baris yang berantakan mungkin perlu dirapikan sebentar di Excel. Imbangannya: data Anda tidak pernah meninggalkan perangkat.",
    ],
    steps: [
      "Letakkan PDF berbasis teks (teks bisa dipilih, bukan scan foto).",
      "Klik Konversi ke Excel.",
      "Unduh .xlsx-nya dan rapikan baris yang tergabung di Excel.",
    ],
    faqs: [
      {
        q: "Bagaimana kolom dideteksi?",
        a: "Baris dipecah menjadi sel di mana pun muncul dua spasi atau lebih — penanda perataan yang biasa pada teks PDF. Tabel yang rata konversinya bersih; prosa berubah menjadi satu sel per baris.",
      },
      {
        q: "Rekening koran hasil scan saya menghasilkan lembar kosong.",
        a: "Scan tidak punya lapisan teks. Lewatikan dulu filenya ke alat OCR kami, lalu tempel teks yang dikenali ke Excel, atau konversikan hasil OCR di sini.",
      },
      {
        q: "Bisakah angka mempertahankan formatnya?",
        a: "Nilai masuk sebagai teks persis seperti tercetak, mempertahankan nol di depan dan koma desimal regional — Excel menganggapnya string sampai Anda mengonversi kolomnya.",
      },
    ],
  },
  "pdf-to-ppt": {
    name: "PDF ke PowerPoint",
    tagline:
      "Ubah setiap halaman PDF menjadi slide PowerPoint berupa gambar resolusi tinggi — slide yang setia pada tata letak, dibuat di perangkat Anda sendiri.",
    intro: [
      "Butuh PDF Anda di dalam deck slide? Setiap halaman dirender resolusi tinggi dan diletakkan di slide 16:9 masing-masing, jadi hasil visualnya persis sama dengan aslinya — font, warna, dan grafik tetap di tempatnya, bahkan saat penampil tidak punya font tersebut.",
      "Slide-nya berupa gambar, bukan kotak teks yang bisa diedit: itu disengaja, karena slide gambar tidak pernah rusak di mesin mana pun. Kombinasikan dengan alat PDF ke Word kami saat Anda juga butuh teksnya.",
    ],
    steps: [
      "Letakkan PDF yang ingin masuk ke deck Anda.",
      "Klik Konversi ke PowerPoint dan biarkan tiap halaman dirender.",
      "Unduh .pptx-nya dan buka di PowerPoint, Keynote, atau Google Slides.",
    ],
    faqs: [
      {
        q: "Bisakah saya mengedit teks di slide-nya?",
        a: "Tidak — setiap slide berisi gambar halaman yang setia, bukan kotak teks. Itu menjamin tampilan identik di mana saja. Ekstrak teksnya secara terpisah dengan PDF ke Word jika perlu versi yang bisa diedit.",
      },
      {
        q: "Ukuran slide berapa yang dipakai?",
        a: "Layar lebar 16:9 (13,33 × 7,5 inci), bawaan PowerPoint. Halaman dengan rasio aspek lain dipusatkan dan disesuaikan tanpa distorsi.",
      },
      {
        q: "Seberapa besar file .pptx-nya?",
        a: "Kira-kira seukuran gabungan semua gambar halaman — PDF 20 halaman pada resolusi tinggi bisa mencapai puluhan megabita. Kompres PDF sumbernya lebih dulu jika butuh deck yang lebih ringan.",
      },
    ],
  },
  "word-to-pdf": {
    name: "Word ke PDF",
    tagline:
      "Konversikan dokumen Word .docx menjadi PDF di browser Anda — tata letak berfokus teks dengan judul dan cetak tebal, tanpa apa pun yang diunggah.",
    intro: [
      "Ubah .docx menjadi PDF yang bersih dan mudah dibagikan: paragraf, judul, dan bagian tebal ditata ulang ke halaman A4 dengan margin yang benar, jadi hasilnya rapi meski Word tidak terpasang. Membaca, mencetak, dan mengirim menjadi tanpa hambatan.",
      "Ini konversi berfokus teks yang jujur, bukan klon piksel dari tata letak Word: gambar, tabel, dan dekorasi halaman dari aslinya tidak ikut terbawa. Yang Anda dapatkan adalah teks dokumen Anda dalam PDF yang andal dan bisa dibaca di mana pun — dibuat sepenuhnya di perangkat Anda.",
    ],
    steps: [
      "Letakkan file .docx (Word 2007 dan yang lebih baru).",
      "Klik Konversi ke PDF.",
      "Unduh PDF yang sudah ditata.",
    ],
    faqs: [
      {
        q: "Kenapa PDF saya terlihat berbeda dari Word?",
        a: "Alat ini menata ulang teks dengan tata letak bersihnya sendiri, bukan meniru mesin Word. Font, spasi, dan gambar pada aslinya tidak direproduksi — kata-kata, judul, dan penekanannya iya.",
      },
      {
        q: "Apakah gambar dan tabel ikut disertakan?",
        a: "Tidak, hanya teks — termasuk judul dan cetak tebal. Untuk dokumen yang visualnya penting, ekspor PDF dari Word itu sendiri dan pakai alat ini untuk draf serta catatan yang mengutamakan teks.",
      },
      {
        q: "Apakah mendukung file .doc lama atau teks non-Latin?",
        a: "Hanya .docx yang didukung. Teks memakai font standar PDF, jadi bahasa berbasis Latin tampil benar sementara aksara lain (Cina, Arab…) untuk saat ini diganti dengan ?.",
      },
    ],
  },
  "pdf-to-text": {
    name: "PDF ke Teks",
    tagline:
      "Tarik teks polos dari PDF apa pun secara instan — pratinjau, salin ke clipboard, atau simpan sebagai .txt, diekstrak halaman demi halaman di browser Anda.",
    intro: [
      "Dapatkan kata-kata mentah dari PDF tanpa menyalin-tempel halaman demi halaman. Ekstraktornya menelusuri dokumen, membangun ulang urutan baca, dan memberi Anda teks polos bersih yang bisa dipratinjau, disalin sekaligus, atau diunduh sebagai file .txt.",
      "Gunakan untuk memasukkan kutipan ke catatan, menjalankan teks melalui alat lain, atau membuat arsip teks murni dari sebuah dokumen. Jumlah kata ditampilkan sambil jalan, dan ekstraksinya instan karena semuanya terjadi secara lokal.",
    ],
    steps: [
      "Letakkan PDF dengan teks yang bisa dipilih.",
      "Klik Ekstrak teks dan baca pratinjaunya.",
      "Salin hasilnya atau unduh sebagai file .txt.",
    ],
    faqs: [
      {
        q: "Hasilnya kosong — kenapa?",
        a: "Kemungkinan PDF-nya hasil scan: halamannya foto teks tanpa lapisan teks. Gunakan alat OCR sebagai gantinya; ia membaca huruf-huruf dari gambar.",
      },
      {
        q: "Bagaimana urutan baca ditentukan?",
        a: "Item teks dikelompokkan menjadi baris berdasarkan koordinatnya, dan baris diurutkan dari atas ke bawah, kiri ke kanan. Tata letak multi-kolom bisa saling menyilang; memisahkan PDF per rentang kolom lebih dulu bisa membantu.",
      },
      {
        q: "Apakah ada batas halaman atau ukuran?",
        a: "Tidak ada batas buatan. Ratusan halaman berjalan baik; batas praktisnya adalah memori browser, biasanya jauh di atas dokumen 100 MB.",
      },
    ],
  },
  "ocr-pdf": {
    name: "OCR PDF",
    tagline:
      "Jalankan OCR pada PDF hasil scan sepenuhnya di browser Anda — kenali Inggris, Cina, Jepang, dan lainnya, lalu salin atau simpan teksnya.",
    intro: [
      "Kontrak, struk, dan buku hasil scan tidak punya teks yang bisa dipilih — OCR memberinya itu. Setiap halaman dirender di browser Anda dan dibaca oleh mesin Tesseract, dengan dukungan bahasa untuk Inggris, Cina Sederhana, Jepang, Spanyol, Portugis, Prancis, dan Jerman.",
      "Pada penggunaan pertama, browser Anda mengunduh mesin OCR beserta model bahasanya (10–20 MB) dari CDN publik — itulah satu-satunya trafik jaringan, dan tidak pernah menyertakan dokumen Anda. Pengenalan itu sendiri terjadi di perangkat Anda.",
    ],
    steps: [
      "Letakkan PDF hasil scan dan pilih bahasa dokumennya.",
      "Jika perlu batasi OCR ke halaman tertentu, lalu klik Jalankan OCR.",
      "Salin teks yang dikenali atau unduh sebagai file .txt.",
    ],
    faqs: [
      {
        q: "Kenapa pemakaian pertama butuh koneksi internet?",
        a: "Mesin OCR Tesseract beserta model bahasanya diambil dari CDN saat pertama dipakai (10–20 MB, di-cache setelahnya). PDF-nya sendiri tidak pernah diunggah — pengenalan berjalan secara lokal begitu modelnya termuat.",
      },
      {
        q: "Bagaimana meningkatkan akurasi pengenalan?",
        a: "Scan pada 300 DPI, jaga halaman tetap lurus, dan pilih bahasa yang benar. Halaman hitam-putih yang bersih mencapai akurasi jauh di atas 90%; foto miring dengan bayangan jauh lebih buruk.",
      },
      {
        q: "Bisakah membaca tulisan tangan?",
        a: "Tidak andal. Tesseract dilatih pada teks cetak — tipografi yang rapi berjalan baik, tulisan tangan miring biasanya menghasilkan kekacauan.",
      },
    ],
  },
  "page-numbers-pdf": {
    name: "Tambah Nomor Halaman PDF",
    tagline:
      "Stempel nomor halaman pada PDF — pilih format, sudut, dan angka awal, semuanya secara lokal di browser Anda.",
    intro: [
      "Beri PDF nomor halaman yang layak sebelum dicetak atau dibagikan: pilih format (1, 1/N, atau Halaman 1 dari N), pilih salah satu dari enam sudut, atur angka awal — file dibangun ulang di perangkat Anda dan siap diunduh.",
      "Berguna untuk laporan, kontrak, tumpukan hasil scan, dan apa pun yang dirujuk per halaman dalam rapat.",
    ],
    steps: [
      "Masukkan PDF yang ingin diberi nomor.",
      "Pilih format, sudut, dan angka awalnya.",
      "Klik Tambahkan nomor halaman dan unduh file yang sudah distempel.",
    ],
    faqs: [
      {
        q: "Bisakah halaman sampul dilewati?",
        a: "Atur 'Mulai penomoran dari' menjadi 0 dan sampul mendapat nomor 0 — atau pisahkan dulu sampulnya, nomori sisanya, lalu gabungkan kembali.",
      },
      {
        q: "Apakah nomornya tampak konsisten di berbagai ukuran halaman?",
        a: "Setiap halaman distempel relatif terhadap lebar dan tingginya sendiri, jadi orientasi dan ukuran halaman yang campur semuanya mendapat nomor di sudut visual yang sama.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* IMAGE                                                               */
  /* ------------------------------------------------------------------ */
  "image-compressor": {
    name: "Kompresor Gambar",
    tagline:
      "Kompres gambar JPG, PNG, dan WebP dengan slider kualitas langsung, pemrosesan batch, dan ukuran sebelum/sesudah yang instan — semuanya di browser Anda.",
    intro: [
      "Letakkan satu gambar atau satu batch penuh dan saksikan ukuran filenya turun secara real time. Slider kualitas dari 10% hingga 100% memungkinkan Anda menyeimbangkan bobot dengan ketajaman, dan setiap baris menampilkan ukuran asli di samping hasil terkompresi sehingga Anda tahu persis apa yang dihemat.",
      "Keluarannya bisa JPG (paling kecil untuk foto), WebP (biasanya 20–30% lebih kecil dari JPG pada kualitas yang sama), atau PNG (lossless). Semuanya berjalan di perangkat Anda dengan encoder gambar bawaan browser — tanpa unggahan, tanpa antrean, tanpa watermark.",
    ],
    steps: [
      "Letakkan gambar-gambar Anda ke dalam kotak (atau klik untuk menjelajah) — sebanyak apa pun.",
      "Pilih format keluaran dan geser slider kualitas sampai kolom ukurannya terlihat pas.",
      "Unduh setiap gambar terkompresi, atau ambil semuanya sekaligus.",
    ],
    faqs: [
      {
        q: "Kenapa mengompres JPEG dua kali membuatnya terlihat lebih buruk?",
        a: "JPEG itu lossy: setiap penyimpanan membuang detail yang tidak bisa dikembalikan. Mengompres JPEG yang sudah terkompresi menambahkan artefak baru di atas yang lama. Untuk hasil terbaik, selalu kompres dari file asli dan hindari menyimpan ulang JPEG berulang kali.",
      },
      {
        q: "Format mana yang memberi file paling kecil?",
        a: "Untuk foto, WebP biasanya 20–30% lebih kecil dari JPEG pada kualitas visual yang sama, dan JPEG mengalahkan PNG. PNG hanya menang untuk grafik rata, tangkapan layar, dan logo berwarna sedikit. Coba WebP pada kualitas 75–85 sebagai titik awal.",
      },
      {
        q: "Apakah gambar saya diunggah ke server?",
        a: "Tidak. Kompresi dilakukan oleh encoder canvas bawaan browser Anda. File tidak pernah meninggalkan perangkat — Anda bahkan bisa memutus internet dan alat ini tetap bekerja.",
      },
    ],
  },
  "image-resizer": {
    name: "Pengubah Ukuran Gambar",
    tagline:
      "Ubah ukuran gambar ke piksel persis atau persentase dengan kunci rasio aspek, dan proses seluruh batch sekaligus — tidak ada yang meninggalkan perangkat Anda.",
    intro: [
      "Ketik lebar dan tinggi persis dalam piksel, atau skalakan dengan persentase (25%, 50%, 200%…). Kunci rasio aspek menjaga proporsi tetap benar saat Anda mengubah satu sisi, dan membukanya memungkinkan Anda memaksa dimensi kustom apa pun — berguna untuk ukuran avatar atau banner platform.",
      "Mode batch menerapkan pengaturan Anda ke setiap file yang dimasukkan, jadi satu folder foto bisa dikecilkan untuk web dalam satu putaran. Penyusutan dilakukan dengan smoothing berkualitas tinggi, dan keluarannya mempertahankan format asli.",
    ],
    steps: [
      "Letakkan satu gambar atau lebih ke dalam kotak.",
      "Masukkan lebar/tinggi dalam piksel atau persentase skala; gunakan kuncinya untuk mempertahankan atau membebaskan rasio aspek.",
      "Unduh gambar yang sudah diubah ukurannya satu per satu atau semuanya sekaligus.",
    ],
    faqs: [
      {
        q: "Apakah memperbesar gambar mengurangi kualitasnya?",
        a: "Ya. Pembesaran harus mengarang piksel, yang menghasilkan kelembutan atau blur — tidak ada alat yang bisa menambahkan detail sungguhan yang tidak pernah terekam. Penyusutan aman: piksel dibuang dengan interpolasi yang bersih. Untuk memperbesar, jaga ekspektasi tetap wajar (hingga ~150% biasanya masih bagus).",
      },
      {
        q: "Apa fungsi kunci rasio aspek?",
        a: "Dengan kunci aktif, mengubah lebar otomatis menghitung ulang tinggi (dan sebaliknya) sehingga gambar tidak pernah meregang atau gepeng. Matikan hanya jika Anda memang ingin bentuk berbeda — gambarnya akan terdistorsi.",
      },
      {
        q: "Apakah PNG yang diubah ukurannya tetap punya transparansi?",
        a: "Ya. Pengubahan ukuran mempertahankan format asli, jadi transparansi PNG dan alpha WebP selamat tanpa disentuh. Hanya konversi ke JPG yang akan meratakan transparansi ke latar putih.",
      },
    ],
  },
  "crop-image": {
    name: "Potong Gambar",
    tagline:
      "Potong foto ke 1:1, 4:3, 16:9, atau area bebas dengan handle yang bisa digeser dan offset presisi piksel — cepat, privat, dan siap batch.",
    intro: [
      "Geser handle di sudut untuk membingkai persis apa yang ingin disimpan, atau ketik X, Y, lebar, dan tinggi langsung untuk potongan presisi piksel. Preset rasio — 1:1 untuk avatar, 4:3 dan 3:2 untuk cetakan, 16:9 dan 9:16 untuk video dan stories — membuat seleksi langsung berbentuk benar.",
      "Mengolah satu set foto? Seleksi yang sama diskalakan secara proporsional ke setiap file dalam batch, jadi satu folder penuh terpotong secara konsisten. Memotong hanya membuang piksel — tidak pernah menskalakan ulang — jadi area yang disimpan tetap pada kualitas asli penuh.",
    ],
    steps: [
      "Letakkan satu gambar atau lebih; klik nama file untuk pratinjau dan memotong satu per satu.",
      "Pilih preset rasio atau geser handle seleksi; haluskan dengan kolom X / Y / W / H.",
      "Terapkan potongan dan unduh hasilnya.",
    ],
    faqs: [
      {
        q: "Apakah memotong mengurangi kualitas gambar?",
        a: "Tidak. Memotong hanya membuang piksel di luarnya — area yang Anda simpan disalin pada resolusi asli penuhnya. Kualitas hanya berubah jika nanti Anda mengubah ukuran atau mengompres hasilnya.",
      },
      {
        q: "Bagaimana pemotongan batch bekerja dengan ukuran gambar yang berbeda?",
        a: "Seleksi disimpan relatif terhadap gambar yang Anda pratinjau. Saat diterapkan ke file lain, ia diskalakan proporsional ke dimensi masing-masing gambar, jadi komposisi potongan tetap konsisten di seluruh batch.",
      },
      {
        q: "Rasio mana yang sebaiknya dipakai untuk foto profil?",
        a: "1:1 (persegi). Kebanyakan platform sosial memotong avatar menjadi lingkaran di dalam persegi, jadi menempatkan objek di tengah seleksi 1:1 adalah pilihan teraman.",
      },
    ],
  },
  "rotate-image": {
    name: "Putar Gambar",
    tagline:
      "Putar gambar 90°, 180°, atau 270° dan balik secara horizontal atau vertikal — ramah batch, instan, dan sepenuhnya di browser Anda.",
    intro: [
      "Buat foto berdiri tegak, luruskan scan yang datang menyamping, atau cermin gambar untuk tata letak terbalik. Setiap tombol diterapkan ke semua file yang dimuat sekaligus, dan pembacaan kecil selalu menampilkan status rotasi serta cermin saat ini agar Anda tidak kehilangan arah.",
      "Rotasi dan pembalikan dibakar ke dalam piksel aslinya, artinya file yang disimpan tampil identik di mana pun — tidak ada pemutar atau penampil yang akan mengoreksinya kembali. Keluarannya mempertahankan format asli tiap gambar.",
    ],
    steps: [
      "Letakkan satu gambar atau lebih ke dalam kotak.",
      "Klik tombol rotasi dan pembalikan sampai status pratinjau terbaca sesuai keinginan.",
      "Unduh gambar yang sudah diperbaiki satu per satu atau semuanya sekaligus.",
    ],
    faqs: [
      {
        q: "Apakah memutar JPEG itu lossless?",
        a: "Rotasi di alat ini diterapkan dengan mengodekan ulang piksel, jadi file diregenerasi (pada kualitas JPEG 92% secara bawaan untuk JPG). Dalam praktik perbedaannya tak terlihat, tetapi tidak identik bit demi bit — alat yang mengklaim “rotasi lossless” hanya bekerja pada ukuran yang merupakan kelipatan grid blok JPEG.",
      },
      {
        q: "Kenapa foto terlihat miring di satu aplikasi tetapi benar di aplikasi lain?",
        a: "Sebagian gambar hanya menyimpan penanda orientasi di data EXIF-nya alih-alih piksel yang benar-benar diputar, dan tidak semua aplikasi menerapkan penanda itu. Alat ini menulis rotasi langsung ke piksel dan membuang penandanya, jadi hasilnya tampil sama di mana saja.",
      },
      {
        q: "Bisakah saya membalik foto secara horizontal seperti cermin?",
        a: "Bisa — pakai tombol “Balik horizontal” untuk mencerminkan kiri–kanan, atau “Balik vertikal” untuk atas–bawah. Keduanya bisa digabung dengan rotasi apa pun.",
      },
    ],
  },
  "convert-image": {
    name: "Konverter Gambar",
    tagline:
      "Konversikan gambar antara PNG, JPG, dan WebP dengan kualitas yang bisa diatur — letakkan satu folder penuh dan unduh semua hasilnya sekali klik.",
    intro: [
      "Satu konverter untuk tiga format yang penting: PNG untuk grafik lossless dan transparansi, JPG untuk kompatibilitas foto universal, WebP untuk file terkecil pada kualitas tinggi. Pilih format tujuan, atur slider kualitas saat formatnya mengizinkan, dan setiap file yang dimasukkan dikonversi di tempat.",
      "Konversi berjalan di perangkat Anda dengan encoder canvas bawaan browser — tidak ada langkah unggah sama sekali. Setiap baris hasil menampilkan ukuran sebelum dan sesudah, jadi Anda langsung tahu apakah perubahan format benar-benar membantu.",
    ],
    steps: [
      "Letakkan gambar apa saja — format campuran tidak masalah.",
      "Pilih PNG, JPG, atau WebP sebagai keluaran; atur kualitas untuk JPG atau WebP.",
      "Unduh file hasil konversi satu per satu atau semuanya sekaligus.",
    ],
    faqs: [
      {
        q: "Format keluaran mana yang sebaiknya dipilih?",
        a: "JPG untuk foto yang harus terbuka di mana saja; WebP untuk web saat ukuran file yang lebih kecil penting; PNG untuk tangkapan layar, logo, dan apa pun yang butuh transparansi atau penyimpanan presisi piksel. Kalau ragu untuk foto, WebP pada kualitas ~85 adalah pilihan bawaan yang bagus.",
      },
      {
        q: "Apakah mengonversi JPG ke PNG meningkatkan kualitasnya?",
        a: "Tidak. Artefak kompresi JPEG sudah tertanam di piksel dan konversi tidak bisa menghapusnya — PNG hanya akan menyimpan tampilan yang sama secara lossless, biasanya dengan ukuran lebih besar. Konversi hanya mengubah kontainer dan pengodeannya, bukan detail yang terekam.",
      },
      {
        q: "Apakah semua browser mendukung konversi WebP?",
        a: "Chrome, Edge, Firefox, dan Safari 17+ bisa menyimpan WebP. Jika browser Anda tidak bisa mengodekan WebP, alat ini memberi tahu dan beralih ke JPG sehingga Anda selalu mendapat file yang bisa dipakai.",
      },
    ],
  },
  "jpg-to-png": {
    name: "JPG ke PNG",
    tagline:
      "Konversikan foto JPG ke PNG secara instan dengan keluaran lossless dan dukungan batch — gratis, privat, tanpa unggahan, langsung di browser Anda.",
    intro: [
      "Letakkan file .jpg Anda dan dapatkan salinan .png yang identik piksel dalam sekali klik. PNG menyimpan gambar tanpa kehilangan lebih lanjut, menjadikannya format pilihan untuk mengedit ulang, mengarsipkan, atau untuk platform dan alat yang menolak file JPEG.",
      "Mode batch mengonversi satu tumpukan foto penuh dalam satu putaran dan menampilkan ukuran hasil untuk setiap file. Perlu diingat PNG biasanya menghasilkan file lebih besar daripada JPG — itu harga penyimpanan lossless, bukan cacat konversi.",
    ],
    steps: [
      "Letakkan gambar JPG Anda (atau klik untuk menjelajah) — beberapa file sekaligus sangat dianjurkan.",
      "Tunggu sesaat sementara setiap file dikonversi secara lokal.",
      "Unduh file PNG satu per satu atau semuanya sekaligus.",
    ],
    faqs: [
      {
        q: "Apakah file PNG-nya akan terlihat lebih bagus daripada JPG?",
        a: "Tidak — akan terlihat sama. Konversi tidak bisa membatalkan kompresi yang sudah terjadi; PNG hanya mempertahankan tampilan saat ini tanpa menambah artefak baru saat Anda mengedit dan menyimpan ulang nanti. Gunakan untuk alur kerja, bukan untuk menaikkan kualitas.",
      },
      {
        q: "Kenapa PNG saya lebih besar daripada JPG aslinya?",
        a: "JPG memakai kompresi lossy agresif yang dirancang untuk foto, sementara PNG menyimpan setiap piksel secara persis. Gambar yang sama karenanya memakan ruang lebih besar sebagai PNG. Jika ukuran file lebih penting daripada pengeditan lossless, JPG atau WebP adalah tujuan yang lebih tepat.",
      },
      {
        q: "Apakah konversi JPG ke PNG menambahkan transparansi?",
        a: "Tidak. JPEG tidak pernah menyimpan transparansi, jadi tidak ada yang bisa dipulihkan — PNG hasil konversi Anda sepenuhnya opak. Untuk memotong latar, Anda butuh alat penghapus latar khusus.",
      },
    ],
  },
  "png-to-jpg": {
    name: "PNG ke JPG",
    tagline:
      "Konversikan gambar PNG ke JPG dan pangkas ukuran filenya secara drastis — area transparan mendapat latar putih bersih dan kualitas tetap bisa diatur.",
    intro: [
      "Ubah file .png yang berat menjadi salinan .jpg ringkas yang terunggah lebih cepat dan terbuka di mana saja. Slider kualitas (bawaan 92%) menjaga hasilnya tak terbedakan secara visual sambil memangkas ukuran 60–90% untuk tangkapan layar dan foto pada umumnya.",
      "Transparansi PNG tidak bisa bertahan di JPG, jadi area transparan diratakan ke putih murni — perlakuan standar untuk formulir, avatar, dan marketplace yang hanya menerima JPEG. Mode batch menangani satu folder penuh sekaligus.",
    ],
    steps: [
      "Letakkan gambar PNG Anda — satu atau banyak.",
      "Atur kualitas JPG jika ingin file lebih kecil atau kesetiaan maksimal.",
      "Unduh file JPG satu per satu atau semuanya sekaligus.",
    ],
    faqs: [
      {
        q: "Apa yang terjadi pada area transparan saat mengonversi PNG ke JPG?",
        a: "JPG tidak punya kanal alpha, jadi piksel transparan diisi putih solid sebelum disimpan. Jika butuh warna latar berbeda, atau harus mempertahankan transparansi sungguhan, tetaplah di PNG (atau pakai WebP).",
      },
      {
        q: "Seberapa kecil JPG-nya akan menjadi?",
        a: "Biasanya 60–90% lebih kecil untuk tangkapan layar dan foto. Grafik rata dengan tepi tajam terkompresi tidak sehebat itu dan bisa sedikit buram pada kualitas rendah — jaga slider di atas 85% untuk gambar teks dan UI.",
      },
      {
        q: "Bisakah konversi membuat gambar lebih tajam atau memperbaiki artefak?",
        a: "Tidak. Konversi hanya mengubah pengodeannya; ia tidak bisa menambah detail. Jika PNG-nya sendiri sudah terlihat lembut, JPG-nya akan sama lembutnya (mungkin dengan derau kompresi tipis pada pengaturan kualitas sangat rendah).",
      },
    ],
  },
  "webp-converter": {
    name: "Konverter WebP",
    tagline:
      "Konversikan gambar ke WebP atau kembalikan file WebP menjadi JPG dan PNG — pilih format tujuan, atur kualitasnya, proses dalam jumlah besar.",
    intro: [
      "Beralih ke WebP memangkas ukuran file 25–35% dibanding JPG pada kualitas visual yang sama — ideal untuk situs web dan aplikasi. Kembali dari WebP ke JPG atau PNG membuat gambar terbuka di perangkat lunak lama yang tidak pernah mengenal format Google ini.",
      "Letakkan campuran WebP, JPG, PNG, dan lainnya, pilih format keluaran, dan setiap file terkonversi sekaligus dengan ukuran sebelum/sesudah yang ditampilkan per baris. Semuanya dikodekan oleh browser Anda di perangkat sendiri — tanpa unggahan, selamanya.",
    ],
    steps: [
      "Letakkan file WebP untuk meninggalkan WebP, atau gambar apa pun untuk dikonversi ke WebP.",
      "Pilih format keluaran (WebP, JPG, atau PNG) dan atur kualitas untuk format lossy.",
      "Unduh file hasil konversi satu per satu atau semuanya sekaligus.",
    ],
    faqs: [
      {
        q: "Kenapa sebaiknya pakai WebP alih-alih JPG?",
        a: "WebP terkompresi 25–35% lebih kecil dari JPG pada kualitas setara dan mendukung transparansi maupun animasi. Semua browser saat ini merendernya, jadi ini pilihan standar untuk gambar web. Pilih JPG hanya jika Anda harus mendukung perangkat lunak yang sangat tua.",
      },
      {
        q: "Apakah file WebP terbuka di aplikasi mana pun?",
        a: "Semua browser modern dan versi terbaru Windows, macOS, Android, serta iOS menangani WebP. Sebagian editor foto lama dan beberapa formulir web masih menolaknya — persis di situ Anda mengonversinya kembali ke JPG atau PNG di sini.",
      },
      {
        q: "Apakah konversi ke WebP itu lossless?",
        a: "Anda yang memilih: WebP mendukung pengodean lossless maupun lossy. Pada kualitas bawaan 90 hasilnya tak terbedakan secara visual tetapi jauh lebih kecil; turunkan slider untuk penghematan maksimal, atau pilih keluaran PNG untuk lossless murni.",
      },
    ],
  },
  "heic-to-jpg": {
    name: "HEIC ke JPG",
    tagline:
      "Konversikan foto HEIC iPhone ke JPG atau PNG agar terbuka di mana saja — konversi batch dengan kendali kualitas, semuanya di perangkat Anda.",
    intro: [
      "iPhone menyimpan foto dalam HEIC, format yang hemat ruang tetapi masih ditolak oleh Windows, banyak situs web, dan aplikasi lama. Letakkan file .heic Anda di sini dan dapatkan salinan JPG yang terbaca universal (atau PNG lossless) dalam hitungan detik — dekoder berjalan lokal, jadi foto Anda tidak pernah menyentuh server.",
      "Mode batch menangani seluruh galeri kamera sekaligus, dan slider kualitas menyeimbangkan ukuran JPG dengan kesetiaannya. Foto besar bisa butuh beberapa detik per file karena dekode HEIC terjadi langsung di browser Anda.",
    ],
    steps: [
      "Letakkan file .heic atau .heif Anda (AirDrop atau unduh dulu dari iPhone).",
      "Pilih keluaran JPG atau PNG dan atur kualitas JPEG-nya.",
      "Tekan konversi dan unduh gambar yang terbuka di mana saja.",
    ],
    faqs: [
      {
        q: "Apa itu HEIC dan kenapa foto saya memakainya?",
        a: "HEIC (High Efficiency Image Container) adalah format foto bawaan iPhone sejak iOS 11. Ia menyimpan foto sekitar setengah ukuran JPEG, tetapi dukungannya di luar ekosistem Apple masih berserakan — itulah mengapa mengonversi ke JPG tetap pilihan paling andal untuk berbagi.",
      },
      {
        q: "Apakah konversi HEIC ke JPG mengurangi kualitas?",
        a: "Sedikit, tetapi pada kualitas bawaan 90% perbedaannya tidak terlihat dalam praktik. Jika ingin nol kehilangan tambahan, pilih keluaran PNG sebagai gantinya — dengan harga file yang jauh lebih besar.",
      },
      {
        q: "Apakah foto iPhone saya diunggah ke mana pun?",
        a: "Tidak. Konversi terjadi di browser Anda memakai dekoder HEIC lokal. Foto Anda tetap di perangkat sepanjang waktu — alat ini bahkan bekerja offline setelah halamannya termuat.",
      },
    ],
  },
  "svg-converter": {
    name: "Konverter SVG ke PNG",
    tagline:
      "Ubah ikon dan grafik SVG menjadi raster PNG tajam pada 1× hingga 4× atau skala kustom apa pun — transparansi dipertahankan, sempurna untuk aset aplikasi.",
    intro: [
      "SVG sempurna untuk desain, tetapi banyak tempat — app store, editor, messenger, CMS lama — menuntut raster PNG. Alat ini merender file vektor Anda pada ukuran persis yang dibutuhkan: 1× untuk pratinjau, 2× untuk layar retina, 3×–4× atau faktor kustom untuk ekspor kualitas cetak.",
      "PNG-nya mempertahankan latar transparan SVG Anda, dan vektor dirender ulang pada resolusi tujuan alih-alih direntang, jadi tepinya tetap setajam silet. Letakkan satu set ikon penuh sekaligus — setiap file terkonversi dalam satu putaran.",
    ],
    steps: [
      "Letakkan satu file .svg atau lebih.",
      "Pilih skala: 1×–4× atau ketik faktor kustom apa pun.",
      "Unduh file PNG satu per satu atau semuanya sekaligus.",
    ],
    faqs: [
      {
        q: "Skala berapa sebaiknya saya ekspor?",
        a: "Pakai 2× untuk ikon di layar retina/high-DPI, 1× saat ukuran pikselnya sudah pasti dan final, dan 3×–4× sebagai aset induk yang bisa Anda kecilkan nanti. Untuk favicon, ekspor pada setara 512 px lalu kecilkan.",
      },
      {
        q: "Apakah konversi ke PNG menghilangkan sifat skalabel SVG?",
        a: "Ya — PNG beresolusi tetap. Itulah mengapa alat ini merender langsung pada ukuran tujuan alih-alih merasterisasi kecil lalu direntangkan. Simpan sumber .svg Anda untuk pengeditan masa depan dan ekspor PNG baru setiap butuh ukuran lain.",
      },
      {
        q: "Apakah latar transparan bertahan setelah konversi?",
        a: "Ya. Keluarannya PNG dengan alpha penuh, jadi ikon Anda mempertahankan transparansinya persis seperti di SVG. Hanya font dan gambar eksternal yang dirujuk SVG yang mungkin perlu disematkan di dalam filenya sendiri agar bisa dirender.",
      },
    ],
  },
  "screenshot-tool": {
    name: "Alat Screenshot",
    tagline:
      "Tangkap satu frame layar Anda, potong secara presisi, dan simpan sebagai PNG — satu snapshot terotorisasi, tidak ada yang direkam atau diunggah.",
    intro: [
      "Klik tangkap, pilih layar, jendela, atau tab di dialog berbagi milik browser Anda sendiri, dan alat ini mengambil tepat satu frame diam. Berbaginya langsung berakhir — tidak ada perekaman, tidak ada sesi, dan tidak ada yang meninggalkan perangkat Anda. Yang Anda dapatkan adalah PNG biasa yang siap disimpan.",
      "Hanya butuh sebagian tangkapan? Nyalakan mode potong dan tarik seleksi presisi sebelum menyimpan, didukung widget potong presisi piksel yang sama dengan alat potong kami. Sempurna untuk laporan bug, dokumentasi kilat, dan bukti transaksi.",
    ],
    steps: [
      "Klik “Pilih layar & tangkap” dan beri izin di dialog browser.",
      "Pilih layar, jendela, atau tab yang Anda mau; satu frame langsung tertangkap dan berbagi berhenti.",
      "Jika perlu, potong frame-nya, lalu simpan PNG-nya ke unduhan Anda.",
    ],
    faqs: [
      {
        q: "Apakah layar saya sedang direkam?",
        a: "Tidak. Alat ini meminta tangkapan satu frame melalui izin berbagi layar standar browser. Stream-nya dihentikan begitu frame tersimpan di memori, jadi tidak ada yang terus berjalan dan tidak ada yang diunggah ke mana pun.",
      },
      {
        q: "Kenapa browser saya meminta izin?",
        a: "Tangkapan layar adalah kemampuan yang kuat, jadi browser selalu mewajibkan pilihan pengguna yang eksplisit lewat dialog aslinya. Anda memilih persis layar, jendela, atau tab mana yang dibagikan — alat ini tidak pernah melihat apa pun yang tidak Anda pilih.",
      },
      {
        q: "Apakah bekerja di ponsel atau tablet?",
        a: "Tidak. Browser di iOS dan Android tidak menawarkan tangkapan layar ke halaman web, jadi alat ini menjelaskan bahwa fitur itu tak tersedia di sana. Di desktop, Chrome, Edge, Firefox, dan Safari semuanya mendukung.",
      },
    ],
  },
  "image-metadata-viewer": {
    name: "Penampil Metadata Gambar",
    tagline:
      "Periksa dimensi gambar, tipe file, ukuran, dan detail EXIF — kamera, lensa, eksposur, tanggal, dan GPS — tanpa mengunggah apa pun.",
    intro: [
      "Letakkan foto dan lihat semua yang dibawanya: dimensi piksel, megapiksel, tipe file, dan ukuran dalam sekali pandang. Untuk foto JPEG, pembaca EXIF bawaan menggali lebih dalam — merek dan model kamera, lensa, waktu eksposur, bukaan diafragma, ISO, panjang fokus, tanggal pengambilan, dan orientasi, diurai oleh pembaca minimal yang berjalan sepenuhnya di perangkat Anda.",
      "Jika foto memuat koordinat GPS, koordinat ditampilkan dalam bentuk desimal dengan pencarian peta sekali klik — praktis untuk memeriksa apa yang tertanam ponsel Anda sebelum berbagi. File non-JPEG menampilkan kedalaman bit dan tipe warna PNG mereka sebagai gantinya, karena EXIF adalah standar era JPEG yang tidak mereka bawa.",
    ],
    steps: [
      "Letakkan satu gambar atau lebih ke dalam kotak.",
      "Baca kartu ringkasannya: dimensi, tipe, ukuran, dan kolom EXIF apa pun yang ditemukan.",
      "Buka posisi GPS di peta jika ada — atau lompat ke penghapus EXIF untuk menghapusnya.",
    ],
    faqs: [
      {
        q: "Apa itu data EXIF?",
        a: "EXIF (Exchangeable Image File Format) adalah standar metadata yang tertanam kamera di foto JPEG: model perangkat, lensa, pengaturan eksposur, penanda waktu, orientasi, dan kadang koordinat GPS. Ia tak terlihat pada gambar itu sendiri tetapi bisa membocorkan di mana dan dengan apa foto diambil.",
      },
      {
        q: "Kenapa file PNG atau WebP saya tidak menampilkan EXIF?",
        a: "EXIF terutama dibawa oleh JPEG. PNG, GIF, dan kebanyakan file WebP tidak menanamkannya, jadi memang tidak ada yang bisa ditampilkan — penampil melaporkan dimensi mereka dan, untuk PNG, kedalaman bit serta tipe warna dari header file sebagai gantinya.",
      },
      {
        q: "Apakah melihat metadata mengubah gambar saya?",
        a: "Tidak. File dibuka hanya-baca; alat ini mendekode salinan di memori dan tidak pernah menulis kembali ke aslinya. Gambar Anda ditampilkan dan dianalisis sepenuhnya di perangkat Anda.",
      },
    ],
  },
  "exif-remover": {
    name: "Penghapus EXIF",
    tagline:
      "Buang EXIF, GPS, dan metadata tersembunyi lain dari foto dengan mengodekannya ulang secara lokal — bagikan gambar tanpa membocorkan lokasi atau perangkat.",
    intro: [
      "Setiap foto ponsel bisa membawa bagasi tersembunyi: koordinat GPS lokasi pengambilan, model kamera Anda, penanda waktu, kadang bahkan nomor seri. Alat ini menghapus semuanya dengan mengodekan ulang gambar dari piksel mentahnya — metadata tidak punya tempat bersembunyi di canvas yang baru digambar, jadi EXIF, GPS, thumbnail, dan komentar semuanya lenyap.",
      "Hasilnya mempertahankan format asli dan gambar yang identik secara visual (kualitas 92% untuk JPG dan WebP), dan setiap baris menampilkan ukuran sebelum/sesudah. Mode batch membersihkan satu folder foto penuh dalam satu putaran, semuanya offline di perangkat Anda.",
    ],
    steps: [
      "Letakkan foto yang akan Anda bagikan — satu atau satu batch penuh.",
      "Tunggu sesaat sementara setiap gambar dikodekan ulang secara lokal tanpa metadatanya.",
      "Unduh gambar yang sudah bersih satu per satu atau semuanya sekaligus.",
    ],
    faqs: [
      {
        q: "Bagaimana pengodean ulang menghapus metadata?",
        a: "Gambar didekode menjadi piksel mentah dan digambar ulang di atas canvas kosong, lalu dikodekan lagi. Metadata tinggal di bagian khusus file di luar piksel, dan pengodean yang baru saja tidak menyertakannya — jadi EXIF, GPS, thumbnail, dan riwayat penyuntingan dibuang sepenuhnya.",
      },
      {
        q: "Apakah menghapus EXIF mengubah tampilan foto?",
        a: "Tidak ada perubahan yang terlihat. Piksel dipertahankan pada kualitas JPEG/WebP 92% (PNG lossless), jadi gambarnya identik di mata. Satu efek samping: rotasi yang hanya tersimpan sebagai penanda orientasi EXIF dibakar ke piksel, yang justru membuat file tampil lebih konsisten antar aplikasi.",
      },
      {
        q: "Bisakah metadata dihapus tanpa mengompres ulang gambarnya?",
        a: "Tidak dengan cara berbasis browser yang tetap aman. Pelepasan metadata lossless menuntut penulisan ulang kontainer file — PNG bisa dibersihkan lossless dengan alat khusus, tetapi untuk JPEG pendekatan andal dan sederhana memang pengodean ulang ini. Masukan PNG di sini tetap sempurna bit demi bit pada pikselnya.",
      },
    ],
  },
  "watermark-image": {
    name: "Watermark Gambar",
    tagline:
      "Tambahkan watermark teks ke gambar — posisi, opasitas, ukuran, atau pola berulang, diproses sepenuhnya di browser Anda.",
    intro: [
      "Lindungi draf, proof, dan foto dengan watermark teks yang sepenuhnya Anda kendalikan: tempatkan di sudut mana pun atau di tengah, polakan di seluruh gambar, atur ukuran dan opasitas — salinan berwatermark dibuat di perangkat Anda.",
      "Tidak ada yang diunggah, jadi Anda bisa memberi watermark pada karya yang belum rilis, proof klien, dan scan rahasia tanpa mengirimnya ke mana pun.",
    ],
    steps: [
      "Masukkan satu gambar atau satu batch penuh.",
      "Ketik teks watermark dan atur opasitas, ukuran, posisi — atau aktifkan pola berulang.",
      "Terapkan dan unduh setiap salinan berwatermark.",
    ],
    faqs: [
      {
        q: "Bisakah orang lain menghapus watermark saya?",
        a: "Watermark yang terlihat adalah peredam, bukan enkripsi — apa pun yang terlihat bisa diedit keluar dengan usaha. Untuk perlindungan sungguhan, bagikan proof beresolusi rendah sebagai gantinya.",
      },
      {
        q: "Apakah bekerja dengan PNG transparan?",
        a: "Keluarannya JPG, jadi transparansi diratakan ke putih. Beri watermark pada PNG asli dengan warna latar pilihan Anda jika butuh alpha.",
      },
    ],
  },
  "merge-images": {
    name: "Gabungkan Gambar",
    tagline:
      "Padukan 2–9 gambar menjadi satu — berdampingan, bertumpuk, atau sebagai grid, dengan kendali jarak dan warna latar.",
    intro: [
      "Bangun foto sebelum/sesudah, strip perbandingan, dan sprite sheet: letakkan 2 hingga 9 gambar, pilih tata letak, atur jarak dan warna latar, dan gambar gabungan disusun di perangkat Anda pada resolusi penuh.",
      "Gambar diskalakan ke tinggi yang sama (berdampingan), lebar yang sama (bertumpuk), atau sel yang sama (grid), jadi tidak ada yang terpotong atau meregang.",
    ],
    steps: [
      "Letakkan 2–9 gambar dalam urutan penggabungan yang Anda mau.",
      "Pilih tata letak dan atur jarak serta warna latarnya.",
      "Klik Gabungkan gambar dan unduh hasilnya.",
    ],
    faqs: [
      {
        q: "Berapa resolusi keluarannya?",
        a: "Resolusi penuh: canvas diukur dari dimensi masukan (yang diskalakan), jadi gabungan 3 foto 2000px kira-kira selebar 6000px.",
      },
      {
        q: "Apakah urutannya penting?",
        a: "Ya — gambar ditempatkan sesuai urutan daftar, kiri ke kanan, atas ke bawah. Hapus dan tambahkan ulang untuk mengubahnya.",
      },
    ],
  },
  "grayscale-image": {
    name: "Gambar Grayscale",
    tagline:
      "Konversikan gambar menjadi hitam & putih dalam batch — singkirkan warna dari scan, cetakan, dan set foto, semuanya secara lokal.",
    intro: [
      "Ubah set foto apa pun menjadi versi hitam & putih bersih dalam satu putaran: letakkan satu batch, pilih keluaran JPG atau PNG, dan setiap gambar didesaturasi di perangkat Anda dengan mesin warna bawaan browser.",
      "Praktis untuk menyiapkan scan siap cetak, menyatukan set foto, atau mencabut warna dari dokumen sebelum OCR.",
    ],
    steps: [
      "Letakkan satu gambar atau satu batch penuh.",
      "Pilih keluaran JPG (lebih kecil) atau PNG (lossless).",
      "Jalankan konversinya dan unduh setiap salinan grayscale.",
    ],
    faqs: [
      {
        q: "Apakah hasilnya sama dengan desaturasi di editor foto?",
        a: "Ia memakai filter grayscale standar browser — konversi luminansi netral. Untuk hitam & putih artistik dengan kurva kontras, pakai editor; untuk desaturasi bersih dan seragam, ini dia.",
      },
      {
        q: "Kenapa PNG saya jadi lebih besar setelah konversi?",
        a: "Grayscale tidak mengubah kompresi: foto yang berderau bisa terkompresi sedikit berbeda. Pilih JPG untuk foto dan PNG hanya untuk grafik rata.",
      },
    ],
  },
  "favicon-generator": {
    name: "Generator Favicon",
    tagline:
      "Ubah logo atau gambar apa pun menjadi set favicon lengkap — PNG 16 hingga 512 px dengan sudut membulat opsional, plus HTML siap tempel. Berjalan di browser Anda.",
    intro: [
      "Masukkan satu gambar mendekati persegi dan dapatkan enam ukuran PNG yang benar-benar dibutuhkan proyek: favicon 16, 32, dan 48 px, apple-touch-icon 180 px, serta ikon 192 / 512 px untuk manifest Android dan PWA. Gambar non-persegi dipusatkan di canvas persegi yang dilapisi warna latar pilihan Anda, dan sudutnya bisa tetap kotak, membulat, atau menjadi lingkaran penuh.",
      "Setiap ukuran dirender pada dimensi piksel aslinya dan bisa diunduh sendiri-sendiri atau sebagai satu .zip, bersama potongan <head> siap tempel yang merujuk nama file yang sama — jadi file-filenya langsung jatuh ke folder publik proyek Anda.",
    ],
    steps: [
      "Masukkan satu gambar — logo persegi paling ideal.",
      "Pilih warna latar padding dan gaya sudut (kotak, membulat, atau lingkaran).",
      "Buat setnya, lalu unduh ukuran individual atau seluruh .zip-nya.",
      "Tempel potongan HTML ke <head> halaman Anda dan unggah PNG-nya.",
    ],
    faqs: [
      {
        q: "Ukuran favicon mana yang benar-benar saya butuhkan?",
        a: "16 dan 32 px menutup tab browser, 48 px membantu pintasan dan bookmark, 180 px adalah yang diminta layar utama iOS, dan 192 / 512 px adalah ukuran yang dicari manifest Android dan aplikasi web. Membuat keenamnya sekali berarti Anda tidak perlu memikirkannya lagi.",
      },
      {
        q: "Kenapa logo saya terlihat buram pada 16 px?",
        a: "Ikon tab 16 px hanya punya 256 piksel total, jadi detail halus dan goresan tipis sungguhan hilang. Set favicon paling bagus dibuat dari lambang yang tebal dan kontras tinggi — jika logo Anda detail, pertimbangkan menggambar varian kecil yang disederhanakan sebagai gambar sumber.",
      },
      {
        q: "Apakah saya masih butuh file .ico?",
        a: "Browser modern dengan senang hati memakai favicon PNG lewat tag <link>, dan potongan yang alat ini hasilkan adalah semua yang mereka butuhkan. .ico warisan hanya penting untuk browser yang sangat tua, yang cukup langka untuk diabaikan di kebanyakan situs.",
      },
    ],
  },
  "ocr-image": {
    name: "Gambar ke Teks (OCR)",
    tagline:
      "Ekstrak teks dari foto, scan, dan tangkapan layar dalam 7 bahasa — tinjau, edit, salin, atau unduh sebagai .txt. Pengenalan berjalan sepenuhnya di browser Anda.",
    intro: [
      "Arahkan ke gambar apa pun yang berisi teks — foto halaman, scan, tangkapan layar — dan dapatkan karakternya kembali sebagai teks yang bisa diedit. Pengenalannya digerakkan oleh Tesseract, dimuat sesuai permintaan di dalam tab browser Anda; gambarnya sendiri tidak pernah diunggah ke mana pun.",
      "Hasilnya mendarat di kotak yang bisa diedit, jadi Anda bisa memperbaiki salah baca sesekali sebelum menyalinnya atau mengunduhnya sebagai file .txt. Foto yang bersih, terangnya merata, dan tegak lurus memberi hasil terbaik.",
    ],
    steps: [
      "Masukkan satu gambar (PNG, JPG, atau WebP) yang berisi teks.",
      "Pilih bahasa teksnya — model yang sesuai dimuat pada pemakaian pertama.",
      "Jalankan pengenalan dan edit teks hasil ekstraksi jika perlu.",
      "Salin atau unduh sebagai file .txt.",
    ],
    faqs: [
      {
        q: "Apakah gambar saya diunggah ke server?",
        a: "Tidak. Gambar dibaca dan dikenali di browser Anda sendiri. Perlu diketahui bahwa mesin OCR dan model bahasanya diunduh dari CDN publik pada pemakaian pertama (sekitar 10–20 MB per bahasa) — unduhan itu berjalan dari CDN ke Anda, tetapi gambarnya sendiri tidak pernah meninggalkan perangkat.",
      },
      {
        q: "Bahasa apa saja yang didukung?",
        a: "Inggris, Cina Sederhana, Jepang, Spanyol, Portugis, Jerman, dan Prancis. Setiap bahasa memuat model terlatihnya sendiri saat pertama dipilih; setelah itu di-cache browser dan pengenalan dimulai lebih cepat.",
      },
      {
        q: "Kenapa sebagian teksnya salah?",
        a: "Akurasi OCR sangat bergantung pada sumbernya: foto buram, halaman melengkung, font kecil, dan latar ramai menyebabkan salah baca. Pakai gambar paling tajam yang Anda punya, potong ke area teks saja, dan bersiap mengoreksi — terutama angka dan karakter yang tampak mirip.",
      },
    ],
  },
  "round-corners-image": {
    name: "Membulatkan Sudut Gambar",
    tagline:
      "Beri satu gambar atau satu batch penuh sudut membulat — sudut PNG transparan atau warna solid, pratinjau langsung, keluaran PNG atau JPG. Berjalan di browser Anda.",
    intro: [
      "Sudut membulat melembutkan tangkapan layar, avatar, dan foto produk tanpa membuka editor. Letakkan satu gambar atau satu batch penuh, geser slider radius dan saksikan pratinjaunya diperbarui langsung — radiusnya bisa sampai lingkaran penuh, dibatasi setengah sisi terpendek.",
      "Pilih apakah sudut yang terpotong tetap transparan (PNG) atau diisi warna solid, yang juga dibutuhkan keluaran JPG karena tidak punya kanal alpha. Setiap file diproses di perangkat Anda dan diunduh satu per satu.",
    ],
    steps: [
      "Masukkan satu gambar atau satu batch penuh.",
      "Geser slider radius — pratinjau menampilkan gambar pertama secara langsung.",
      "Pilih sudut transparan atau warna solid dan format keluarannya.",
      "Bulatkan semuanya dan unduh tiap hasil.",
    ],
    faqs: [
      {
        q: "Bisakah sudutnya transparan alih-alih putih?",
        a: "Bisa — pilih keluaran PNG dan opsi Transparan, dan sudutnya tetap tembus pandang. JPG tidak punya kanal alpha, jadi selalu mengisi sudut dengan warna solid pilihan Anda.",
      },
      {
        q: "Radius yang sama terlihat berbeda di tiap gambar — kenapa?",
        a: "Slider mengatur radius dalam piksel, dan setiap file dibulatkan dengan radius persis itu, dibatasi setengah sisi terpendeknya sendiri. Untuk tampilan seragam pada gambar berukuran berbeda, samakan dulu ukuran mereka (misalnya dengan pengubah ukuran gambar).",
      },
      {
        q: "Apakah pembulatan mengurangi kualitas gambar?",
        a: "Hanya sudutnya yang disentuh — piksel di dalamnya tetap utuh. Keluaran PNG lossless, sementara JPG dikodekan ulang pada kualitas tinggi, yang bisa sedikit menggeser ukuran file ke arah mana pun.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* TEXT                                                                */
  /* ------------------------------------------------------------------ */
  "case-converter": {
    name: "Konverter Case",
    tagline:
      "Ubah teks antara HURUF KAPITAL, huruf kecil, Title Case, camelCase, snake_case, dan 6 gaya lainnya — secara langsung.",
    intro: [
      "Sebelas gaya case dalam satu halaman: sentence case untuk tulisan, Title Case untuk judul, camelCase / PascalCase / snake_case / kebab-case / CONSTANT_CASE untuk kode, plus alternating dan inverse untuk bersenang-senang.",
      "Semuanya dihitung ulang saat Anda mengetik — tanpa menekan tombol berulang-ulang, dan konversinya tidak pernah keluar dari browser Anda.",
    ],
    steps: [
      "Tempel atau ketik teks Anda ke kotak input.",
      "Klik tombol gaya — output langsung diperbarui.",
      "Salin hasilnya atau ganti ke gaya lain untuk membandingkan.",
    ],
    faqs: [
      {
        q: "Apa bedanya camelCase dan PascalCase?",
        a: "camelCase diawali huruf kecil (myVariableName), PascalCase diawali huruf besar (MyVariableName). Keduanya menghapus spasi dan garis bawah dari kata-katanya.",
      },
      {
        q: "Apakah Title Case membiarkan kata pendek tetap huruf kecil?",
        a: "Ya. Kata depan dan preposisi pendek (a, the, of, in…) tetap huruf kecil kecuali sebagai kata pertama atau terakhir, mengikuti gaya editorial yang umum.",
      },
      {
        q: "Apakah teks saya diunggah ke mana pun?",
        a: "Tidak. Konversi terjadi secara lokal di browser Anda dengan JavaScript — tidak ada yang dikirim ke server mana pun.",
      },
    ],
  },
  "word-counter": {
    name: "Penghitung Kata",
    tagline:
      "Hitung kata, karakter, kalimat, dan waktu baca secara langsung saat Anda mengetik — teks CJK ditangani dengan benar.",
    intro: [
      "Penghitung kata real-time untuk esai, unggahan, salinan SEO, dan terjemahan. Ia menampilkan kata, karakter dengan dan tanpa spasi, kalimat, paragraf, baris, serta perkiraan waktu baca dalam satu kisi.",
      "Teks campuran bahasa dihitung dengan benar: kata bergaya Inggris dipilah berdasarkan spasi, sementara karakter Cina, Jepang, dan Korea dihitung satu per satu, sesuai cara batas kata benar-benar bekerja di bahasa-bahasa itu.",
    ],
    steps: [
      "Tempel atau tulis teks Anda di kotak — statistik langsung diperbarui.",
      "Lihat panel yang disorot untuk hitungan yang Anda perlukan.",
      "Lanjutkan menyunting; tidak ada yang disimpan atau diunggah, jadi aman untuk draf yang belum terbit.",
    ],
    faqs: [
      {
        q: "Bagaimana kata dihitung dalam teks Cina atau Jepang?",
        a: "Karakter CJK dihitung sebagai karakter individual dan ditambahkan ke jumlah kata, karena bahasa-bahasa itu tidak memisahkan kata dengan spasi. Satu paragraf Cina 500 karakter dilaporkan sekitar 500 'kata'.",
      },
      {
        q: "Bagaimana waktu baca diperkirakan?",
        a: "Sekitar 220 kata per menit untuk teks aksara Latin (CJK ditimbang berdasarkan jumlah karakter), dibulatkan ke menit terdekat di atasnya.",
      },
      {
        q: "Apakah ada batas panjang?",
        a: "Tidak ada batas keras — penghitung hanya dibatasi memori browser Anda, yang dengan nyaman menangani teks sepanjang buku.",
      },
    ],
  },
  "remove-duplicate-lines": {
    name: "Hapus Baris Duplikat",
    tagline:
      "Buang baris berulang dari daftar dan log sambil menjaga urutan aslinya — dengan opsi case dan trim.",
    intro: [
      "Tempel daftar apa pun — email, URL, kata kunci, baris log — dan dapatkan kembali daftar yang sama tanpa duplikat dalam satu putaran. Opsinya mencakup varian yang lazim: abaikan besar-kecil huruf, trim spasi sebelum membandingkan, buang baris kosong, atau urutkan hasilnya.",
    ],
    steps: [
      "Tempel daftar Anda ke kotak input — satu entri per baris.",
      "Nyalakan opsi jika perlu pencocokan tanpa memandang besar-kecil huruf atau pembersihan.",
      "Salin output yang sudah bebas duplikat; urutan asli dipertahankan kecuali Anda mengaktifkan pengurutan.",
    ],
    faqs: [
      {
        q: "Apakah urutan baris aslinya dipertahankan?",
        a: "Ya. Kemunculan pertama setiap baris dipertahankan di tempatnya. Pengurutan hanya terjadi jika Anda mengaktifkan opsi sort.",
      },
      {
        q: "Bisakah 'Apple' dan 'apple' diperlakukan sebagai duplikat?",
        a: "Aktifkan 'Abaikan case' dan keduanya diperlakukan sebagai baris yang sama; varian pertama yang terlihat yang disimpan.",
      },
    ],
  },
  "character-counter": {
    name: "Penghitung Karakter",
    tagline:
      "Hitung karakter dengan dan tanpa spasi, plus kata, kalimat, paragraf, dan baris saat Anda mengetik — sempurna untuk tweet, judul, dan meta description.",
    intro: [
      "Penghitung karakter yang dirancang untuk batas keras: unggahan sosial, meta title, meta description, salinan iklan, SMS, dan kolom aplikasi yang menghitung setiap karakter. Panelnya menampilkan karakter dengan spasi dan tanpa, jadi Anda selalu tahu angka mana yang diperhatikan platform.",
      "Hitungan diperbarui saat Anda mengetik, dan tidak ada yang keluar dari browser Anda — tempel draf yang belum terbit, salinan klien, atau teks rahasia tanpa khawatir disimpan atau dikirim ke mana pun.",
    ],
    steps: [
      "Tempel atau ketik teks Anda ke kotak.",
      "Baca panel karakter yang disorot lebih dulu, lalu hitungan lainnya sesuai kebutuhan.",
      "Pangkas teks Anda sampai berada di bawah batas — angkanya diperbarui langsung.",
    ],
    faqs: [
      {
        q: "Apakah spasi dan baris baru dihitung sebagai karakter?",
        a: "Ya — angka utamanya menghitung setiap karakter termasuk spasi dan baris baru, persis seperti kebanyakan platform. Angka 'Tanpa spasi' membuang whitespace agar bisa dibandingkan.",
      },
      {
        q: "Bagaimana emoji dihitung?",
        a: "Emoji dihitung sebagai code point Unicode, jadi kebanyakan emoji modern terhitung satu karakter. Rangkaian kompleks yang dibangun dari beberapa code point (warna kulit, emoji keluarga) bisa terhitung lebih dari satu.",
      },
      {
        q: "Platform mana yang membatasi per karakter?",
        a: "Unggahan X/Twitter, meta title (sekitar 60) dan description (sekitar 160), segmen SMS (160), dan kebanyakan platform iklan — selalu periksa kolom spesifik tempat Anda menulis.",
      },
    ],
  },
  "sentence-counter": {
    name: "Penghitung Kalimat",
    tagline:
      "Hitung kalimat secara instan dan lihat kata, paragraf, serta waktu baca di sebelahnya — pemeriksaan keterbacaan kilat untuk editor dan penulis.",
    intro: [
      "Jumlah kalimat adalah sinyal keterbacaan tercepat yang dimiliki penulis. Alat ini menghitung kalimat saat Anda mengetik dan menempatkannya di samping kata, paragraf, baris, dan waktu baca, jadi Anda langsung tahu apakah sebuah paragraf mulai terlalu padat.",
      "Ia mengenali tanda baca yang benar-benar mengakhiri kalimat dalam teks campuran: titik Latin, tanda tanya dan seru, plus 。!?… lebar penuh yang dipakai Cina dan Jepang.",
    ],
    steps: [
      "Tempel draf, email, atau artikel Anda ke kotak.",
      "Periksa jumlah kalimat yang disorot dan bandingkan dengan jumlah katanya.",
      "Pecah atau gabung kalimat untuk mencapai panjang rata-rata target Anda.",
    ],
    faqs: [
      {
        q: "Apa yang dihitung sebagai kalimat?",
        a: "Setiap rangkaian teks yang diakhiri titik, tanda tanya, tanda seru, atau padanannya di CJK 。!?… — asalkan berisi sesuatu selain whitespace.",
      },
      {
        q: "Kenapa hitungan saya berbeda dari editor saya?",
        a: "Singkatan seperti 'Mr.' atau 'e.g.' diakhiri titik dan dihitung sebagai akhir kalimat — alat ini memakai aturan tanda baca, bukan penguraian bahasa alami penuh.",
      },
      {
        q: "Berapa kalimat yang seharusnya dimiliki satu paragraf?",
        a: "Panduan gaya umumnya menyarankan 2–5. Tidak ada aturan yang baku: gunakan hitungannya untuk menemukan dinding teks sebelum pembaca Anda melihatnya.",
      },
    ],
  },
  "remove-extra-spaces": {
    name: "Penghapus Spasi Berlebih",
    tagline:
      "Padatkan spasi ganda menjadi satu, konversikan tab, potong tepi baris, dan hapus baris kosong — rapikan teks tempelan dalam satu putaran.",
    intro: [
      "Teks yang disalin dari PDF, spreadsheet, terminal, dan aplikasi chat sering datang penuh spasi ganda, tab liar, dan baris kosong. Alat ini meratakan spasi berulang menjadi satu dan memberi Anda saklar untuk sisanya: ubah tab menjadi spasi, potong tepi setiap baris, dan buang baris kosong.",
      "Semuanya berjalan lokal saat Anda mengetik, jadi Anda bisa menempel log, draf, atau apa pun yang sensitif tanpa mikir dua kali.",
    ],
    steps: [
      "Tempel teks yang berantakan ke kotak input.",
      "Nyalakan konversi tab, pemotongan baris, atau penghapusan baris kosong sesuai kebutuhan.",
      "Salin output yang bersih langsung kembali ke dokumen atau editor Anda.",
    ],
    faqs: [
      {
        q: "Apakah spasi di dalam baris juga dipadatkan atau hanya di tepi?",
        a: "Spasi berulang di mana pun dalam teks dipadatkan menjadi satu spasi. Whitespace di tepi hanya dibuang saat Anda mengaktifkan 'Potong tepi baris'.",
      },
      {
        q: "Apakah ini merusak indentasi kode saya?",
        a: "Bisa — indentasi bergantung pada spasi atau tab di awal baris. Untuk kode, biarkan 'Potong tepi baris' mati atau gunakan formatter yang benar.",
      },
      {
        q: "Apakah baris baru dipertahankan?",
        a: "Ya. Alat ini hanya menyentuh whitespace horizontal dan baris kosong; struktur baris teks Anda tetap utuh.",
      },
    ],
  },
  "text-sorter": {
    name: "Pengurut Teks",
    tagline:
      "Urutkan daftar baris apa pun secara alfabetis, terbalik, per panjang, atau per angka — sadar-lokasi dan instan, langsung di browser Anda.",
    intro: [
      "Tempel daftar nama, URL, harga, tugas, atau baris log dan susun ulang dengan sekali klik: A→Z untuk direktori dan indeks, Z→A untuk daftar berperingkat, terpendek dulu untuk putaran pembersihan, urutan angka agar 'item 10' mendarat setelah 'item 2' alih-alih di antara 'item 1' dan 'item 2'.",
      "Pengurutan memakai collation sadar-lokasi milik browser, jadi karakter beraksen terurut di tempat yang diharapkan manusia, bukan setelah seluruh alfabet.",
    ],
    steps: [
      "Tempel daftar Anda ke kotak input — satu entri per baris.",
      "Pilih urutannya: A→Z, Z→A, pendek→panjang, atau angka.",
      "Salin hasil terurutnya atau urutkan ulang dengan urutan lain untuk membandingkan.",
    ],
    faqs: [
      {
        q: "Apa bedanya pengurutan angka dengan A→Z?",
        a: "Pengurutan alfabetis membandingkan karakter demi karakter, jadi '10' datang sebelum '2'. Mode angka membaca setiap baris sebagai bilangan lebih dulu dan mengurutkannya berdasarkan nilainya.",
      },
      {
        q: "Apakah menangani teks beraksen dan non-Latin?",
        a: "Ya. Pengurutan memakai Intl.Collator, perbandingan sadar-lokasi milik browser, jadi é, ñ, ü, dan karakter CJK terurut menurut konvensi bahasa, bukan code point mentah.",
      },
      {
        q: "Apakah daftar aslinya diubah?",
        a: "Tidak — input tetap tak tersentuh dan hasil terurut muncul di kotak output, jadi Anda selalu bisa kembali.",
      },
    ],
  },
  "text-cleaner": {
    name: "Pembersih Teks",
    tagline:
      "Buang karakter tak terlihat, smart quotes, spasi berlebih, dan baris kosong dari teks yang ditempel keluar dari PDF, Word, dan aplikasi chat.",
    intro: [
      "Salin-tempel adalah tempat teks bersih pergi untuk mati: PDF meninggalkan karakter lebar-nol, Word menukar kutip lurus dengan yang melengkung dan menambah spasi non-breaking, aplikasi chat menyisipkan karakter kontrol. Alat ini mencabut kotoran tak terlihat dan memperbaiki tanda bacanya dalam satu putaran.",
      "Setiap opsi adalah saklar, jadi Anda yang menentukan seberapa agresif pembersihannya — dari sekadar memotong baris sampai pembersihan penuh yang menghapus karakter non-printable dan menormalkan kutipan, tanda pisah, serta elipsis.",
    ],
    steps: [
      "Tempel teks yang berantakan ke kotak input.",
      "Nyalakan pembersihan yang Anda mau: potong baris, padatkan spasi, hapus baris kosong, buang karakter tak terlihat, normalkan tanda baca.",
      "Salin output yang bersih kembali ke dokumen, CMS, atau editor Anda.",
    ],
    faqs: [
      {
        q: "Apa itu karakter tak terlihat dan dari mana asalnya?",
        a: "Spasi lebar-nol, byte-order mark, dan karakter kontrol — ditambahkan oleh PDF, sebagian situs web, dan perangkat lunak kantor. Mereka tak terlihat tetapi merusak pencarian, regex, dan impor database, jadi menghapusnya biasanya aman.",
      },
      {
        q: "Apa yang diubah oleh 'normalkan tanda baca'?",
        a: "Kutip melengkung menjadi lurus, en dan em dash menjadi tanda hubung, karakter elipsis menjadi tiga titik, dan spasi non-breaking menjadi spasi biasa. Pakai saat tanda baca polos yang aman untuk kode itu yang penting.",
      },
      {
        q: "Apakah pembersihannya lossless?",
        a: "Tidak ada alat yang bisa tahu maksud Anda dengan pasti. Kotak output selalu menampilkan hasilnya lebih dulu, jadi tinjau sebelum mengganti aslinya.",
      },
    ],
  },
  "reverse-text": {
    name: "Balik Teks",
    tagline:
      "Putar balik teks apa pun karakter demi karakter, atau balik urutan baris utuh — aman-Unicode, instan, dan sepenuhnya lokal.",
    intro: [
      "Dua pembalikan dalam satu alat: cerminkan karakter teks Anda (trik klasik 'txet esrever' untuk game, bio, dan petunjuk teka-teki) atau balik urutan baris sehingga baris terakhir datang lebih dulu — praktis untuk log, ekspor chat, dan daftar yang ditempel dari bawah.",
      "Pembalikan bekerja pada code point Unicode, bukan byte mentah, jadi huruf beraksen dan kebanyakan emoji tetap utuh alih-alih berubah menjadi mojibake.",
    ],
    steps: [
      "Tempel atau ketik teks yang ingin Anda balik.",
      "Biarkan 'Balik baris saja' mati untuk mencerminkan karakter, atau nyalakan untuk membalik urutan baris.",
      "Salin hasil yang sudah terbalik.",
    ],
    faqs: [
      {
        q: "Apakah emoji dan huruf beraksen selamat?",
        a: "Ya untuk kasus umum: alat ini membalik berdasarkan code point Unicode, jadi é, ñ, dan emoji standar tetap utuh. Emoji yang sangat kompleks, dibangun dari beberapa bagian, tetap bisa terurai saat dicerminkan.",
      },
      {
        q: "Tepatnya apa yang dilakukan 'Balik baris saja'?",
        a: "Ia menjaga setiap baris tetap utuh dan membalik urutan barisnya sendiri — baris pertama menjadi terakhir. Gunakan saat sebuah daftar ditempel dari bawah ke atas.",
      },
      {
        q: "Bisakah ini dipakai untuk memeriksa palindrom?",
        a: "Secara tidak langsung — tempel teksnya, balik, lalu bandingkan dengan mata, atau pasangkan dengan alat text diff.",
      },
    ],
  },
  "lorem-ipsum-generator": {
    name: "Generator Lorem Ipsum",
    tagline:
      "Hasilkan 1–50 paragraf lorem ipsum klasik untuk mockup, wireframe, dan pengujian CMS — sekali klik untuk membuat ulang dan menyalin.",
    intro: [
      "Lorem ipsum telah menjadi teks pengisi industri percetakan sejak 1500-an: Latin acak dari 'De Finibus'-nya Cicero yang terlihat seperti teks sungguhan tetapi tanpa makna, sehingga tak ada yang mengira draf sebagai salinan jadi. Pilih jumlah paragraf, tekan tombolnya, dan tempel ke tata letak Anda.",
      "Teksnya dihasilkan secara lokal dengan generator pseudo-random ber-seed, jadi setiap batch berbeda — dan tidak ada yang Anda lakukan di situs ini yang meninggalkan browser.",
    ],
    steps: [
      "Atur berapa paragraf yang Anda butuhkan (1–50).",
      "Tekan tombolnya untuk menghasilkan batch baru.",
      "Salin teksnya langsung ke desain, template, atau CMS Anda.",
    ],
    faqs: [
      {
        q: "Sebenarnya apa itu lorem ipsum?",
        a: "Latin yang rusak dari sebuah cuplikan De Finibus Bonorum et Malorum karya Cicero, dipotong dan diacak menjadi pengisi tanpa makna. Distribusi hurufnya meniru bahasa sungguhan, yang membuatnya ideal untuk menilai tata letak tanpa membaca konten.",
      },
      {
        q: "Kenapa tidak pakai 'teks teks teks' saja?",
        a: "Kata dummy yang berulang menciptakan bentuk yang tidak realistis dan menyembunyikan masalah pemenggalan baris serta ritme. Lorem ipsum meniru panjang kata dan distribusi bahasa sungguhan.",
      },
      {
        q: "Bisakah mendapat lebih dari 50 paragraf?",
        a: "Satu batch dibatasi 50 paragraf agar halamannya tetap cepat; tekan tombolnya lagi kapan pun Anda butuh batch baru.",
      },
    ],
  },
  "text-diff": {
    name: "Text Diff",
    tagline:
      "Bandingkan dua versi teks kata demi kata, dengan penambahan dan penghapusan yang disorot — tanpa akun, tanpa unggahan, tanpa ribet soal ukuran.",
    intro: [
      "Tempel aslinya di kiri dan versi suntingannya di kanan: kata yang berubah langsung menyala, penghapusan satu warna dan penambahan warna lain. Ini cara tercepat meninjau revisi kontrak, tulisan ulang editor, atau suntingan menit terakhir seorang rekan pada sebuah paragraf.",
      "Perbandingan berjalan sepenuhnya di browser Anda — kontrak panjang, manuskrip yang belum terbit, dan teks rahasia tidak pernah menyentuh server.",
    ],
    steps: [
      "Tempel teks asli ke kotak kiri.",
      "Tempel teks yang dimodifikasi ke kotak kanan.",
      "Baca tampilan gabungannya di bawah: coretan menandai penghapusan, hijau menandai penambahan.",
    ],
    faqs: [
      {
        q: "Bagaimana perbedaannya ditampilkan?",
        a: "Teks yang tidak berubah tampil polos; kata yang dihapus dicoret dengan oranye dan kata yang ditambah disorot hijau, sehingga paragraf terbaca seperti perubahan terlacak.",
      },
      {
        q: "Apakah ini diff level karakter atau level kata?",
        a: "Level kata. Suntingan kecil di dalam satu kata ditampilkan sebagai satu kata dihapus plus satu kata ditambah, lebih mudah dipindai daripada diff level karakter.",
      },
      {
        q: "Apakah ada batas ukuran?",
        a: "Hanya memori browser Anda — perbandingan sepanjang buku berjalan baik, meski teks yang sangat besar butuh sesaat untuk dirender.",
      },
    ],
  },
  "slug-generator": {
    name: "Generator Slug",
    tagline:
      "Ubah judul apa pun menjadi slug URL yang bersih — huruf kecil, tanpa aksen, dan berhyphen — siap untuk tautan yang ramah SEO.",
    intro: [
      "Slug adalah bagian URL yang menamai halaman — /tools/slug-generator misalnya. Slug yang baik berhuruf kecil, memakai tanda hubung alih-alih spasi, dan hanya berisi huruf serta angka, yang membuat tautan terbaca di hasil pencarian, mudah disalin, dan aman di berbagai server serta framework.",
      "Tempel judul dalam bahasa apa pun: aksen dicabut (café → cafe), tanda baca dan spasi menyatu menjadi tanda hubung tunggal, dan hasilnya dipangkas agar tidak ada slug yang diawali atau diakhiri garis.",
    ],
    steps: [
      "Ketik atau tempel judul halaman ke kotak input.",
      "Saksikan slug muncul saat Anda mengetik — sesuaikan judulnya sampai terbaca enak.",
      "Salin slug ke CMS, router, atau static site generator Anda.",
    ],
    faqs: [
      {
        q: "Apa yang membuat slug URL yang baik?",
        a: "Pendek, huruf kecil, dipisah tanda hubung, dan deskriptif. Mesin pencari membaca slug sebagai petunjuk peringkat dan pengguna membacanya di hasil, jadi 'sepatu-lari-biru' mengalahkan '/p?id=8123'.",
      },
      {
        q: "Kenapa aksen dihapus?",
        a: "Karakter non-ASCII terenkode persen di URL (é menjadi %C3%A9), menghasilkan tautan yang panjang, jelek, dan rawan salah. Slug ASCII tetap pendek dan bekerja di mana saja.",
      },
      {
        q: "Apakah saya harus mempertahankan kata penghubung seperti 'the' dan 'of'?",
        a: "Banyak panduan SEO menyarankan membuangnya agar slug tetap pendek — sunting slug hasilannya sebebasnya sebelum menyalin; alat ini memberi Anda basis berhyphen penuh.",
      },
    ],
  },
  "find-and-replace": {
    name: "Cari dan Ganti",
    tagline:
      "Cari dan ganti di ribuan kata dengan mode case, kata utuh, dan regex — lihat jumlah kecocokannya sebelum Anda menerapkan.",
    intro: [
      "Satu kotak cari, satu kotak ganti, tiga mode pencocokan. Teks polos untuk penukaran kilat, mode kata utuh agar 'cat' tidak pernah mendarat di dalam 'category', dan regular expression untuk pola — tanggal, tag, whitespace berulang, atau apa pun yang bisa Anda deskripsikan.",
      "Kecocokan dihitung saat Anda mengetik dan penggantinya dipratinjau langsung, jadi Anda melihat persis apa yang akan berubah sebelum menyalin apa pun.",
    ],
    steps: [
      "Tempel teksnya, lalu ketik apa yang dicari dan dengan apa menggantinya.",
      "Pilih mode: peka besar-kecil, kata utuh saja, atau regular expression.",
      "Periksa jumlah kecocokannya, lalu salin hasil penggantinya.",
    ],
    faqs: [
      {
        q: "Bisakah memakai capture group di mode regex?",
        a: "Bisa. Bungkus bagian pola dengan tanda kurung dan rujuk di penggantinya sebagai $1, $2, dan seterusnya — misalnya cari '(\\d{4})-(\\d{2})' dan ganti dengan '$2/$1'.",
      },
      {
        q: "Apa yang dicegah oleh 'kata utuh saja'?",
        a: "Ia hanya mencocokkan saat istilahnya berdiri sendiri: mencari 'cat' tidak lagi mencocokkan 'category' atau 'concatenate'.",
      },
      {
        q: "Apakah tanda $ di pengganti saya diperlakukan literal?",
        a: "Di mode polos ya — '$100' tetap '$100'. Di mode regex, pola $ itu spesial ($1 berarti grup 1); escape sebagai \\$ jika butuh tanda $ literal.",
      },
    ],
  },
  "fancy-text-generator": {
    name: "Generator Teks Keren",
    tagline:
      "Ubah teks polos menjadi 12 gaya Unicode — bold, italic, script, double-struck, circled, fullwidth, dan lainnya — dan salin salah satunya sekali klik.",
    intro: [
      "Ketik sekali dan dapatkan dua belas varian Unicode sekaligus: alfabet mathematical bold, italic, bold italic, script, bold script, double-struck, monospace, circled, squared, dan fullwidth, plus strikethrough dan underline dari karakter combining.",
      "Karena ini karakter Unicode sungguhan — bukan font — hasilnya ditempel utuh ke bio Instagram, caption TikTok, nickname Discord, draf tweet, dan aplikasi chat. Karakter di luar alfabet Latin, seperti Cina, Jepang, atau emoji, diteruskan tanpa disentuh sehingga tidak ada yang berubah menjadi kotak glyph hilang.",
    ],
    steps: [
      "Ketik atau tempel teks Anda — satu contoh sudah dimuat untuk dimainkan.",
      "Gulir daftar langsungnya: setiap gaya mempratinjau teks Anda seketika.",
      "Tekan Salin pada gaya yang Anda suka dan tempel di mana saja yang menerima teks.",
    ],
    faqs: [
      {
        q: "Kenapa teksnya terlihat sama di beberapa situs web?",
        a: "Teks keren memakai karakter Unicode, dan font situs mungkin tidak punya glyph untuk sebagiannya (terutama script dan double-struck). Jika sebuah gaya tampak aneh di suatu tempat, coba bold, circled, atau fullwidth — cakupan fontnya paling luas.",
      },
      {
        q: "Bisakah dipakai untuk bio Instagram atau nickname TikTok saya?",
        a: "Bisa. Hasilnya teks Unicode polos, jadi bekerja di bio sosial, nama tampilan, komentar, dan di mana pun yang menerima karakter biasa.",
      },
      {
        q: "Apa yang terjadi pada karakter seperti emoji atau 中文?",
        a: "Dibiarkan persis seperti diketik. Generator hanya memetakan huruf dan angka Latin, jadi emoji, CJK, dan huruf beraksen diteruskan tanpa perubahan alih-alih berubah menjadi kotak kosong.",
      },
    ],
  },
  "emoji-picker": {
    name: "Pemilih Emoji",
    tagline:
      "Jelajahi 670+ emoji umum dalam 8 kelompok pilihan, cari berdasarkan nama Inggris, klik untuk langsung menyalin, dan pakai ulang 16 pilihan terakhir Anda — semuanya di browser Anda.",
    intro: [
      "Papan emoji kurasi manual dengan 677 entri yang dikelompokkan sesuai cara Anda berpikir: Smileys, People, Animals, Food, Activities, Travel, Objects, dan Symbols. Pencarian mencocokkan nama resmi bahasa Inggrisnya — mengetik “star” menemukan ⭐, 🌟, dan ✨ sekaligus.",
      "Satu klik menyalin karakter ke clipboard Anda, dengan konfirmasi yang terlihat sehingga Anda tidak pernah meragukan apakah berhasil. 16 pilihan terakhir Anda disimpan di perangkat ini lewat localStorage, jadi favorit besok hanya sejauh satu ketukan. Tidak ada gambar yang dimuat — gridnya merender glyph emoji bawaan seketika.",
    ],
    steps: [
      "Ketik nama di kotak pencarian atau pilih tab kelompok.",
      "Klik emoji mana pun — langsung tersalin ke clipboard Anda.",
      "Temukan pilihan terakhir Anda di baris atas, tersimpan di perangkat ini.",
    ],
    faqs: [
      {
        q: "Dari mana asal emoji-nya?",
        a: "Mereka glyph bawaan yang dirender oleh font emoji sistem operasi Anda. Tidak ada yang diunduh, jadi halamannya tetap cepat dan bekerja offline setelah dimuat.",
      },
      {
        q: "Kenapa beberapa emoji terlihat berbeda dari yang saya lihat di ponsel?",
        a: "Setiap platform menggambar emoji dengan gayanya sendiri. Grid menampilkan bagaimana perangkat saat ini merendernya; karakter yang tersalin akan terlihat sama di aplikasi penerimanya.",
      },
      {
        q: "Bagaimana “Baru dipakai” bekerja?",
        a: "Setiap emoji yang Anda salin diingat di localStorage browser Anda (hingga 16). Menghapus data browser akan mengatur ulang daftarnya.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* DEVELOPER                                                           */
  /* ------------------------------------------------------------------ */
  "json-formatter": {
    name: "JSON Formatter",
    tagline:
      "Format dan rapikan JSON yang berantakan secara online — 2 spasi, 4 spasi, atau tab, dengan validasi instan dan lokasi error yang presisi. 100% di browser Anda.",
    intro: [
      "Tempel JSON yang diminified atau indentasinya buruk dan dapatkan output yang bersih dan mudah dibaca seketika. Pilih indentasi 2 spasi, 4 spasi, atau tab, dan hasilnya diperbarui langsung saat Anda mengetik atau menyunting — sempurna untuk memeriksa respons API, file config, dan payload log.",
      "JSON yang tidak valid bukan jalan buntu: formatter menunjuk baris dan kolom persis dari syntax error-nya, jadi koma atau kurung yang hilang ketemu dalam hitungan detik, bukan menit.",
    ],
    steps: [
      "Tempel JSON Anda ke kotak input.",
      "Pilih indentasinya: 2 spasi, 4 spasi, atau tab.",
      "Salin hasil yang sudah dirapikan — atau perbaiki baris dan kolom yang dilaporkan jika JSON-nya tidak valid.",
    ],
    faqs: [
      {
        q: "Apakah ada batas ukuran untuk JSON yang bisa diformat?",
        a: "Tidak ada batas keras — pemformatan terjadi secara lokal di browser Anda. File yang sangat besar (puluhan MB) bisa terasa lambat karena hasilnya dihitung ulang saat Anda mengetik, jadi tempel sekaligus dan sunting dengan hati-hati.",
      },
      {
        q: "Apakah pemformatan mengubah data saya?",
        a: "Tidak. Nilai, urutan key, dan strukturnya tetap persis sama; hanya whitespace dan baris baru yang ditambahkan. Output-nya JSON yang setara byte demi byte.",
      },
      {
        q: "Apakah JSON saya diunggah ke server?",
        a: "Tidak. Semuanya berjalan lokal di browser Anda dengan JavaScript — data Anda tidak pernah meninggalkan perangkat.",
      },
    ],
  },
  "json-minifier": {
    name: "JSON Minifier",
    tagline:
      "Minify JSON secara online: buang semua whitespace untuk memperkecil payload agar respons API lebih cepat dan penyimpanan lebih hemat — lihat byte persis yang dihemat, privat di browser Anda.",
    intro: [
      "Tempel JSON yang sudah diformat rapi dan dapatkan padanan valid paling ringkas secara real time: setiap spasi, baris baru, dan indentasi dibuang tanpa menyentuh data Anda. Pembacaan ukuran langsung menampilkan ukuran asli, ukuran hasil minify, dan persentase yang dihemat.",
      "Gunakan untuk mengecilkan respons API, file fixture, terjemahan, dan config JSON sebelum dikirim atau disimpan. Jika input bukan JSON yang valid, alat ini memberi tahu baris dan kolom persis lokasi masalahnya alih-alih gagal diam-diam.",
    ],
    steps: [
      "Tempel JSON yang sudah diformat ke kotak input.",
      "Output satu baris hasil minify muncul seketika, dengan ukuran yang dihemat ditampilkan di bawahnya.",
      "Salin hasil ringkasnya atau bersihkan input untuk memulai ulang.",
    ],
    faqs: [
      {
        q: "Apakah minify JSON mengubah datanya?",
        a: "Tidak. Whitespace di luar string tidak bermakna dalam JSON, jadi menghapusnya menghasilkan dokumen setara dengan nilai yang identik saat di-parse.",
      },
      {
        q: "Seberapa kecil JSON saya akan menjadi?",
        a: "Tergantung indentasi yang Anda buang — file yang sangat terindentasi sering menyusut 30–60%. Alat ini menampilkan persentase persis untuk input Anda.",
      },
      {
        q: "Apakah data saya dikirim ke mana pun?",
        a: "Tidak. Minification berjalan sepenuhnya di browser Anda — tidak ada yang diunggah, dicatat, atau disimpan.",
      },
    ],
  },
  "json-validator": {
    name: "JSON Validator",
    tagline:
      "Validasi JSON secara instan dengan baris dan kolom error yang presisi. Tangkap koma yang hilang, key tanpa kutip, trailing comma, dan escape yang salah sebelum merusak aplikasi Anda.",
    intro: [
      "Tempel dokumen JSON apa pun dan lihat sekilas apakah valid. Validator-nya ketat: mengikuti standar JSON, jadi kesalahan umum seperti kutip tunggal, trailing comma, key tanpa kutip, dan komentar semuanya dilaporkan.",
      "Saat ada yang salah Anda mendapat baris dan kolom persis plus alasannya dalam bahasa manusia — bukan pesan satu baris yang misterius. Input yang valid dibalas dengan versi pretty-printed yang bisa langsung Anda salin.",
    ],
    steps: [
      "Tempel JSON Anda ke kotak input.",
      "Status hijau muncul jika JSON valid; jika tidak, baris, kolom, dan alasannya ditampilkan.",
      "Perbaiki posisi yang dilaporkan, atau salin output pretty-printed saat validasi lolos.",
    ],
    faqs: [
      {
        q: "Error apa saja yang bisa ditemukan validator ini?",
        a: "Semua syntax error JSON standar: koma yang hilang atau berlebih, key tanpa kutip atau berkutip tunggal, trailing comma, karakter kontrol tanpa escape, escape tidak valid, dan isi liar setelah nilai — masing-masing dilaporkan dengan baris dan kolom.",
      },
      {
        q: "Apakah juga memeriksa schema atau hanya syntax?",
        a: "Hanya syntax. Ia memverifikasi dokumen adalah JSON yang valid, bukan bahwa field punya tipe atau nilai yang diharapkan — untuk itu Anda butuh schema validator seperti JSON Schema.",
      },
      {
        q: "Apakah JSON saya diunggah ke mana pun?",
        a: "Tidak. Validasi terjadi secara lokal di browser Anda; tidak ada yang meninggalkan perangkat.",
      },
    ],
  },
  "xml-formatter": {
    name: "XML Formatter",
    tagline:
      "Rapikan XML secara online dengan indentasi 2 spasi yang bersih — sitemap, feed RSS, envelope SOAP, dan file config kembali terbaca, langsung di browser Anda.",
    intro: [
      "Tempel XML yang kusut atau satu baris dan dapatkan dokumen terindentasi dengan benar seketika. Elemen bersarang dengan indentasi 2 spasi yang konsisten, konten teks pendek tetap satu baris dengan tag-nya, dan komentar, seksi CDATA, processing instruction, serta deklarasi DOCTYPE dipertahankan.",
      "Ideal untuk membaca sitemap.xml, feed RSS/Atom, layout Android, pom Maven, respons SOAP, dan format config tak terhingga lainnya — tanpa memasang plugin editor.",
    ],
    steps: [
      "Tempel XML Anda ke kotak input.",
      "Dokumen yang diformat muncul seketika saat Anda mengetik.",
      "Salin XML yang sudah rapi atau bersihkan input untuk mencoba file lain.",
    ],
    faqs: [
      {
        q: "Apakah pemformatan mengubah data XML saya?",
        a: "Whitespace antar elemen dinormalkan agar strukturnya terbaca, yang aman untuk hampir semua XML dunia nyata. Whitespace di dalam konten teks dipertahankan (dipotong di tepinya), dan seksi CDATA disimpan byte demi byte.",
      },
      {
        q: "Apakah menangani file XML besar?",
        a: "Ya, dalam batas wajar — pemformatannya satu lintasan cepat dan berjalan lokal, tetapi dokumen bermegabita bisa butuh sesaat di perangkat yang lebih lambat.",
      },
      {
        q: "Apakah XML saya diunggah ke server?",
        a: "Tidak. Pemformatan terjadi sepenuhnya di browser Anda; tidak ada yang dikirim ke mana pun.",
      },
    ],
  },
  "xml-validator": {
    name: "XML Validator",
    tagline:
      "Periksa XML untuk well-formedness secara real time: tag tak cocok, atribut rusak, dan entitas tidak valid dilaporkan begitu Anda menempel. Tidak ada yang diunggah.",
    intro: [
      "Validator memakai parser XML bawaan browser, jadi ia menegakkan persis aturan yang ditegakkan tooling XML sungguhan: setiap tag harus ditutup, atribut harus berkutip, entitas harus valid, dan harus ada tepat satu elemen root.",
      "XML yang well-formed mendapat status hijau plus pratinjau pretty-printed; masalah muncul dengan deskripsi error milik parser sendiri, yang menunjuk konstruksi yang bermasalah — berguna sebelum memberi feed, sitemap, atau payload SOAP kepada konsumen yang pemilih.",
    ],
    steps: [
      "Tempel XML Anda ke kotak input.",
      "Status hijau muncul jika XML-nya well-formed; jika tidak, error parser ditampilkan.",
      "Perbaiki masalah yang dilaporkan, atau salin pratinjau terformat saat lolos.",
    ],
    faqs: [
      {
        q: "Apakah ini memvalidasi terhadap schema DTD atau XSD?",
        a: "Tidak — hanya memeriksa well-formedness (struktur, kutipan, entitas, root tunggal). Validasi schema butuh alat khusus dengan XSD atau DTD Anda.",
      },
      {
        q: "Apa yang dihitung sebagai error XML di sini?",
        a: "Tag yang tak ditutup atau tak cocok, atribut tanpa kutip, atribut duplikat, referensi entitas tidak valid, lebih dari satu elemen root, dan karakter ilegal semuanya ditolak.",
      },
      {
        q: "Apakah XML saya dikirim ke mana pun?",
        a: "Tidak. Pemeriksaan berjalan di browser Anda dengan DOMParser bawaan — data Anda tidak pernah meninggalkan perangkat.",
      },
    ],
  },
  "html-formatter": {
    name: "HTML Formatter",
    tagline:
      "Ubah HTML yang diminified atau satu baris menjadi markup bersih dan terindentasi — beautifier sederhana dan andal untuk email, template, dan halaman tersimpan. 100% client-side.",
    intro: [
      "Tempel HTML yang menumpuk dan dapatkan markup yang terbaca dengan indentasi konsisten seketika. Elemen void seperti img dan br tidak pernah merusak indentasi, tag auto-close umum seperti li dan p ditangani dengan masuk akal, dan isi blok pre, textarea, script, serta style dipertahankan apa adanya.",
      "Formatter sederhana yang disengaja: tanpa penataan ulang, tanpa penulisan ulang atribut, tanpa kejutan — hanya whitespace dan baris baru yang ditambahkan agar strukturnya jelas sekilas.",
    ],
    steps: [
      "Tempel HTML Anda ke kotak input.",
      "Hasil terindentasi muncul langsung saat Anda mengetik.",
      "Salin markup terformatnya atau bersihkan input untuk memformat cuplikan lain.",
    ],
    faqs: [
      {
        q: "Apakah pemformatan mengubah cara HTML saya dirender?",
        a: "Tidak — pemformatan hanya menyisipkan whitespace dan baris baru di antara tag. Isi pre, textarea, script, dan style dipertahankan persis, karena whitespace di sana bermakna.",
      },
      {
        q: "Bagaimana menangani tag yang tak ditutup seperti li atau p?",
        a: "Ia mengenal elemen auto-close yang umum: li baru menutup yang sebelumnya, dan tag penutup untuk leluhur menutup semua anak yang terbuka, jadi daftar dan paragraf terindentasi seperti yang Anda harapkan.",
      },
      {
        q: "Apakah HTML-nya dikirim ke server?",
        a: "Tidak pernah. Formatter ini tokenizer JavaScript lokal — markup Anda tetap di browser Anda.",
      },
    ],
  },
  "html-minifier": {
    name: "HTML Minifier",
    tagline:
      "Minify HTML di browser Anda: buang komentar dan padatkan whitespace untuk memangkas bobot halaman — pembersih konservatif yang menjaga markup dan rendering Anda tetap utuh.",
    intro: [
      "Tempel HTML dan dapatkan versi yang lebih ringan secara real time. Komentar dihapus (komentar kondisional IE selamat), deretan whitespace dipadatkan menjadi satu spasi, dan whitespace antar tag block-level dibuang sepenuhnya — sementara spasi teks inline dipertahankan agar kata-kata tidak menyatu.",
      "Ini minifier konservatif yang disengaja: tidak mengganti nama class, tidak menghapus kutip, tidak menstrukturkan ulang apa pun. Itu membuatnya aman untuk template email dan markup warisan, dan pembacaan ukuran langsung menunjukkan persis berapa byte yang Anda hemat.",
    ],
    steps: [
      "Tempel HTML Anda ke kotak input.",
      "Output hasil minify muncul seketika, dengan ukuran input/output dan persentase yang dihemat.",
      "Salin HTML ringkasnya atau bersihkan input untuk minify halaman lain.",
    ],
    faqs: [
      {
        q: "Bisakah minification merusak HTML saya?",
        a: "Alat ini mengambil jalan yang aman: whitespace di dalam pre, textarea, script, dan style tidak disentuh, celah whitespace antar elemen inline menjadi satu spasi, dan hanya celah antar tag block-level yang dibuang. Komentar dibuang kecuali komentar kondisional IE.",
      },
      {
        q: "Kenapa persentase hematnya lebih rendah daripada minifier lain?",
        a: "Karena konservatif secara desain — ia tidak pernah menyatukan teks dengan tag atau menghapus kutip. Yang dihapusnya (komentar, indentasi, whitespace antar blok) selalu aman untuk rendering.",
      },
      {
        q: "Apakah ada yang diunggah?",
        a: "Tidak. Semuanya berjalan lokal di browser Anda; halaman dan markupnya tidak pernah meninggalkan perangkat.",
      },
    ],
  },
  "css-minifier": {
    name: "CSS Minifier",
    tagline:
      "Minify CSS secara online: hapus komentar dan spasi tak perlu untuk memangkas ukuran stylesheet agar pemuatan lebih cepat. Instan, privat, dan aman untuk aturan Anda.",
    intro: [
      "Tempel stylesheet apa pun dan dapatkan versi satu baris yang ringkas secara real time: komentar dicabut, whitespace berlebih dipadatkan, dan pemisah diperketat — sementara isi string, nilai url(), dan semantik selector/property Anda tetap persis seperti ditulis.",
      "Gunakan untuk menyiapkan critical CSS, mengecilkan tema sebelum commit, atau memeriksa berapa byte yang benar-benar dihemat sebuah pembersihan. Pembacaan ukuran langsung menampilkan ukuran input, ukuran output, dan persentase yang dihemat.",
    ],
    steps: [
      "Tempel CSS Anda ke kotak input.",
      "Output hasil minify muncul seketika, dengan ukuran yang dihemat ditampilkan di bawahnya.",
      "Salin stylesheet ringkasnya atau bersihkan input untuk minify file lain.",
    ],
    faqs: [
      {
        q: "Apakah minification mengubah perilaku CSS saya?",
        a: "Tidak. Hanya komentar dan whitespace yang dihapus — dan itu pun dengan hati-hati: isi string dan url() dipertahankan byte demi byte, jadi nilai content dan data URI tetap utuh.",
      },
      {
        q: "Apakah mengoptimalkan warna, menggabungkan aturan, atau autoprefix?",
        a: "Tidak — ini minifier aman di level sintaks. Optimasi struktural (menggabungkan aturan duplikat, memendekkan warna) butuh postprocessor penuh; alat ini menjamin nol perubahan semantik.",
      },
      {
        q: "CSS saya pergi ke mana?",
        a: "Tidak ke mana pun. Minification berjalan lokal di browser Anda; tidak ada yang diunggah atau disimpan.",
      },
    ],
  },
  "javascript-minifier": {
    name: "JavaScript Minifier",
    tagline:
      "Minifier JavaScript yang konservatif: mencabut komentar dan memadatkan baris kosong, mempertahankan baris baru — tanpa penulisan ulang berisiko, semantik kode Anda tak tersentuh.",
    intro: [
      "Minifier ini melakukan tepat dua hal: menghapus komentar // dan /* */ (bahkan di dalam file yang rumit — string, template literal termasuk ${…} bersarang, dan regex literal dihormati), serta memadatkan baris kosong dan indentasi. Baris baru antar statement dipertahankan, jadi automatic semicolon insertion terus bekerja persis seperti sebelumnya.",
      "Ia tidak akan pernah mengganti nama variabel, meng-inline kode, atau menggabungkan statement — itu tugas build tool penuh. Yang Anda dapatkan adalah file yang lebih kecil secara berarti, minify dengan aman, plus pembacaan penghematan byte langsung, sepenuhnya di browser Anda.",
    ],
    steps: [
      "Tempel JavaScript Anda ke kotak input.",
      "Output hasil minify muncul seketika, dengan ukuran input/output dan persentase yang dihemat.",
      "Salin script ringkasnya atau bersihkan input untuk minify file lain.",
    ],
    faqs: [
      {
        q: "Kenapa mempertahankan baris baru alih-alih menyatukan semuanya jadi satu baris?",
        a: "Pilihan yang disengaja. JavaScript bergantung pada automatic semicolon insertion, dan menghapus baris baru bisa diam-diam mengubah apa yang dilakukan program. Mempertahankan baris baru membuat minifier ini aman untuk kode yang tidak pernah melewati bundler sungguhan.",
      },
      {
        q: "Apa bedanya dengan Terser atau UglifyJS?",
        a: "Keduanya mem-parse dan menulis ulang AST: mangling nama, menghapus kode mati, meng-inline. Output jauh lebih kecil, tetapi butuh build step sungguhan. Alat ini hanya menghapus komentar dan baris kosong — nol risiko perubahan perilaku, tanpa build.",
      },
      {
        q: "Apakah kode saya diunggah ke mana pun?",
        a: "Tidak. Semuanya berjalan lokal di browser Anda — sumber Anda tidak pernah meninggalkan perangkat.",
      },
    ],
  },
  "sql-formatter": {
    name: "SQL Formatter",
    tagline:
      "Format SQL secara online dengan kapitalisasi keyword dan indentasi yang konsisten — ubah SELECT, JOIN, dan stored procedure yang panjang menjadi kode terbaca, langsung di browser Anda.",
    intro: [
      "Tempel query satu baris yang padat dan dapatkan SQL terstruktur dengan benar seketika: klausa pindah ke barisnya sendiri, ekspresi bersarang terindentasi konsisten, dan keyword dikapitalkan untuk pemindaian mudah. Digerakkan oleh mesin sql-formatter, jadi aturannya sama dengan yang diandalkan tim-tim sungguhan.",
      "Sempurna untuk meninjau query hasil generate, men-debug output ORM, mendokumentasikan stored procedure, atau mengurai klausa WHERE 40 baris yang ditinggalkan seseorang di komentar.",
    ],
    steps: [
      "Tempel SQL Anda ke kotak input.",
      "Query terformat muncul saat Anda mengetik, dengan keyword dikapitalisasi dan klausa tersusun rapi.",
      "Salin SQL yang terbaca atau bersihkan input untuk memformat query lain.",
    ],
    faqs: [
      {
        q: "Dialek SQL apa saja yang didukung?",
        a: "Pemformatan bekerja di seluruh SQL standar, dan mesin di baliknya juga memahami sintaks khusus dialek dari PostgreSQL, MySQL, T-SQL, PL/SQL, BigQuery, Snowflake, dan lainnya — struktur umum terformat benar di mana saja.",
      },
      {
        q: "Apakah pemformatan mengubah apa yang dilakukan query saya?",
        a: "Tidak. Hanya whitespace dan kapitalisasi keyword yang berubah. String literal dan identifier berkutip dipertahankan persis, jadi query-nya identik secara semantik.",
      },
      {
        q: "Apakah query saya dikirim ke server?",
        a: "Tidak. Pemformatan berjalan lokal di browser Anda — SQL Anda tidak pernah meninggalkan perangkat.",
      },
    ],
  },
  "base64-encoder": {
    name: "Base64 Encoder",
    tagline:
      "Enkode teks ke Base64 secara instan dengan dukungan UTF-8 penuh — emoji, aksen, dan karakter CJK selamat utuh. Gratis, privat, tidak ada yang pernah keluar dari browser Anda.",
    intro: [
      "Ketik atau tempel teks apa pun dan dapatkan representasi Base64-nya secara langsung saat Anda mengetik. Pengodeannya aman UTF-8 lewat TextEncoder standar, jadi teks multibahasa, emoji, dan simbol menghasilkan byte persis yang dihasilkan fungsi base64 di setiap bahasa pemrograman.",
      "Gunakan untuk header HTTP Basic Auth, prefiks data URI, lampiran email di perjalanan, atau API apa pun yang mengharapkan payload Base64 — tanpa terminal atau potongan kode.",
    ],
    steps: [
      "Tempel atau ketik teks yang ingin dienkode.",
      "Output Base64 diperbarui langsung — salin kapan pun Anda siap.",
      "Tempel Base64 kembali dengan decoder yang tertaut untuk round-trip dan memverifikasi.",
    ],
    faqs: [
      {
        q: "Kenapa Base64 membuat teks saya lebih panjang?",
        a: "Base64 merepresentasikan setiap 3 byte sebagai 4 karakter, jadi output sekitar 33% lebih besar dari input — itulah biaya membuat teks yang aman-binari.",
      },
      {
        q: "Apakah Base64 itu enkripsi?",
        a: "Bukan. Base64 adalah encoding, bukan enkripsi — siapa pun bisa mendekodenya seketika. Jangan pernah memakainya untuk menyembunyikan rahasia; gunakan kriptografi sungguhan.",
      },
      {
        q: "Apakah Unicode dan emoji didukung?",
        a: "Ya. Input dikonversi ke byte UTF-8 sebelum dienkode, yang cocok dengan yang dihasilkan btoa-dengan-TextEncoder, Python, Java, dan Node untuk string yang sama.",
      },
    ],
  },
  "base64-decoder": {
    name: "Base64 Decoder",
    tagline:
      "Dekode Base64 kembali menjadi teks terbaca dengan penanganan UTF-8 yang benar — data URI, payload API, dan nilai config terenkode jelas seketika. Privat dan gratis.",
    intro: [
      "Tempel Base64 dan lihat teks hasil dekodenya secara langsung. Dekode melewati TextDecoder standar, jadi konten UTF-8 multibyte — aksen, emoji, CJK — keluar dengan benar alih-alih berubah menjadi mojibake.",
      "Ia pemaaf dengan cara yang berguna: whitespace dan baris baru di input diabaikan, dan prefiks data URI seperti data:image/png;base64, dicabut otomatis sebelum dekode.",
    ],
    steps: [
      "Tempel string Base64 ke kotak input.",
      "Teks hasil dekode muncul seketika — salin dengan satu klik.",
      "Jika dekode gagal, periksa karakter yang terpotong atau non-Base64 di input.",
    ],
    faqs: [
      {
        q: "Outputnya terlihat seperti simbol acak — kenapa?",
        a: "Input-nya kemungkinan bukan teks UTF-8. Base64 bisa mengenkode byte arbitrer: gambar, PDF, blob binari. Alat ini mendekode byte sebagai teks UTF-8, jadi data binari tampil sebagai karakter pengganti.",
      },
      {
        q: "Bisakah mendekode Base64 URL-safe?",
        a: "Ya — ia ditujukan untuk data bergaya JWT, di mana - dan _ menggantikan + dan /. Base64 standar dengan atau tanpa padding juga bekerja.",
      },
      {
        q: "Apakah dekode dilakukan di server?",
        a: "Tidak. Semuanya berjalan di browser Anda; stringnya tidak pernah meninggalkan perangkat.",
      },
    ],
  },
  "url-encoder": {
    name: "URL Encoder",
    tagline:
      "Percent-enkode URL dan query string secara online — pilih encoding component atau encoding URI penuh, dengan output langsung untuk tautan, parameter, dan segmen path.",
    intro: [
      "Tempel teks atau URL apa pun dan lihat hasil percent-encoded-nya secara langsung. Dua mode menutup dua kasus nyata: component encoding (encodeURIComponent) meng-escape setiap karakter cadangan untuk satu nilai parameter, sementara encoding URI penuh (encodeURI) menjaga struktur URL — :, /, ?, dan & — tetap utuh.",
      "Penting saat membangun query string dengan tangan, menyematkan URL di dalam URL lain, membuat tautan mailto, atau melewatkan nilai dengan spasi, ampersand, dan karakter non-Latin lewat parameter GET.",
    ],
    steps: [
      "Tempel teks, nilai parameter, atau URL yang ingin dienkode.",
      "Pilih component encoding untuk sebuah nilai, atau URI penuh untuk menjaga struktur URL.",
      "Salin hasil terenkodenya langsung ke tautan atau request Anda.",
    ],
    faqs: [
      {
        q: "Kapan sebaiknya memakai encodeURIComponent alih-alih encodeURI?",
        a: "Pakai encodeURIComponent untuk nilai individual yang Anda sisipkan ke URL — ia meng-escape &, =, ?, /, dan lainnya, jadi sebuah nilai tidak pernah bisa merusak query string. Pakai encodeURI hanya untuk URL lengkap yang ingin dibuat aman-transport sambil menjaga strukturnya.",
      },
      {
        q: "Kenapa spasi menjadi %20 dan bukan +?",
        a: "%20 adalah percent-encoding standar untuk spasi; jalan pintas + adalah konvensi form-encoding yang ditangani terpisah oleh application/x-www-form-urlencoded. Alat ini memakai %20 standar.",
      },
      {
        q: "Apakah menangani karakter non-Latin?",
        a: "Ya — karakter di luar ASCII dienkode UTF-8 lebih dulu, lalu percent-encoded, persis seperti yang dilakukan browser.",
      },
    ],
  },
  "url-decoder": {
    name: "URL Decoder",
    tagline:
      "Dekode URL percent-encoded kembali menjadi teks terbaca — %20, %2F, dan nilai query string jelas seketika. Menangani + sebagai spasi, sepenuhnya di browser Anda.",
    intro: [
      "Tempel URL, parameter, atau segmen path yang terenkode dan baca teks aslinya seketika. Dua mode menemani dua encoder: component decoding (decodeURIComponent) untuk satu nilai, dan decoding URI penuh (decodeURI) untuk URL lengkap.",
      "Saklar ekstra yang praktis memperlakukan + sebagai spasi, yang sebenarnya dimaksudkan oleh query string terenkode-form (application/x-www-form-urlencoded) — jadi parameter pencarian seperti hello+world terdekode menjadi hello world alih-alih tetap literal.",
    ],
    steps: [
      "Tempel string atau URL percent-encoded.",
      "Pilih component decoding untuk nilai, atau decoding URI penuh untuk URL lengkap.",
      "Aktifkan + sebagai spasi untuk query string bergaya form, lalu salin teks hasil dekode.",
    ],
    faqs: [
      {
        q: "Kenapa kadang saya mendapat error saat mendekode?",
        a: "Tunggal % yang tidak diikuti dua digit heksa, atau escape terpotong seperti %E4%BD, adalah percent-encoding yang tidak valid — decoder melaporkannya alih-alih menebak.",
      },
      {
        q: "Sebaiknya saya menyalakan opsi + sebagai spasi?",
        a: "Untuk nilai yang diekstrak dari pengiriman form HTML atau query string banyak framework web, ya. Untuk URL percent-encoded standar yang memuat karakter + sungguhan, biarkan mati.",
      },
      {
        q: "Apakah ada yang diunggah?",
        a: "Tidak. Dekode berjalan lokal di browser Anda — tidak ada yang meninggalkan perangkat.",
      },
    ],
  },
  "jwt-decoder": {
    name: "JWT Decoder",
    tagline:
      "Dekode token JWT secara online: periksa klaim header dan payload dengan timestamp exp dan iat yang terbaca manusia. Dekode saja — tidak ada yang diverifikasi atau diunggah.",
    intro: [
      "Tempel JSON Web Token dan lihat seketika ketiga bagiannya terpisah: header (algoritma dan tipe token), payload (klaim sebenarnya), dan signature. Kedua seksi JSON ditampilkan pretty-printed, dan timestamp seperti iat, nbf, dan exp diterjemahkan menjadi tanggal polos dalam locale Anda, dengan exp ditandai kedaluwarsa atau masih aktif.",
      "Semuanya didekode lokal dengan Base64URL — token tidak pernah dikirim ke mana pun dan tidak pernah diverifikasi. Ingat: dekode menunjukkan apa yang dikatakan token, bukan apa yang diizinkan dilakukannya. Verifikasi signature selalu membutuhkan secret atau public key di sistem terpercaya.",
    ],
    steps: [
      "Tempel JWT (tiga bagian yang dipisah titik) ke kotak input.",
      "Baca header dan payload yang sudah pretty-printed, dengan exp/iat ditampilkan sebagai tanggal nyata.",
      "Perbaiki token atau verifikasinya di sisi server sesuai kebutuhan — salin payload jika diperlukan.",
    ],
    faqs: [
      {
        q: "Apakah mendekode JWT berarti memverifikasinya?",
        a: "Tidak. Dekode hanya Base64URL + parsing JSON dan siapa pun bisa melakukannya — termasuk penyerang. Token terdekode yang tampak valid tidak membuktikan apa pun. Verifikasi menuntut pemeriksaan signature dengan secret (HMAC) atau public key (RSA/EC), yang butuh material kunci penerbit token.",
      },
      {
        q: "Bisakah Anda memulihkan atau mengubah klaim token?",
        a: "Anda bisa membaca klaimnya, tetapi tidak bisa memalsukan token baru dengan klaim yang diubah tanpa membatalkan signature — setiap perubahan pada header atau payload merusak pemeriksaan signature di server.",
      },
      {
        q: "Apakah aman menempel token sungguhan di sini?",
        a: "Token didekode sepenuhnya di browser Anda dan tidak pernah meninggalkan perangkat — tidak ada unggahan. Meski begitu, perlakukan token sebagai kredensial dan hindari menempel token produksi di tempat yang tidak Anda perlukan.",
      },
    ],
  },
  "uuid-generator": {
    name: "UUID Generator",
    tagline:
      "Hasilkan identifier UUID v4 acak dalam jumlah besar sekali klik — 1 hingga 500 sekaligus, memakai keacakan kriptografis browser Anda. Gratis, instan, mampu offline.",
    intro: [
      "Buat UUID RFC 4122 versi 4 sebanyak yang Anda butuhkan: fixture pengujian, seed database, nama file, request ID, atau draf API key. Setiap identifier dihasilkan oleh crypto.randomUUID, sumber acak kriptografis aman milik browser — 122 bit acak, peluang tabrakan yang tidak akan pernah Anda capai dalam praktik.",
      "Berbeda dari versi berbasis waktu (v1/v6/v7), v4 tidak membawa timestamp dan tidak membocorkan apa pun tentang kapan atau di mana ia dibuat — halamannya memberi tahu Anda persis itu, plus kapan batch Anda dihasilkan.",
    ],
    steps: [
      "Atur berapa UUID yang Anda butuhkan (1–500).",
      "Klik Hasilkan — daftarnya muncul seketika.",
      "Salin semuanya sekaligus, atau bersihkan dan hasilkan batch baru.",
    ],
    faqs: [
      {
        q: "Bisakah dua UUID yang dihasilkan pernah bertabrakan?",
        a: "Secara teori bisa, dalam praktik tidak. Dengan 122 bit acak, menghasilkan tabrakan menuntut UUID dalam orde 10^36 — jauh melampaui beban kerja realistis mana pun.",
      },
      {
        q: "Kenapa memilih v4 alih-alih UUID v1 atau v7?",
        a: "v4 tidak membocorkan informasi waktu atau perangkat keras dan tidak butuh jam atau alamat MAC. Jika Anda butuh ID yang ramah indeks database dan bisa diurutkan waktu, lihat v7 — tetapi untuk keunikan polos, v4 adalah pilihan standar.",
      },
      {
        q: "Apakah UUID-nya dihasilkan di server?",
        a: "Tidak. Mereka datang dari generator acak kriptografis browser Anda sendiri dan tidak pernah meninggalkan perangkat.",
      },
    ],
  },
  "hash-generator": {
    name: "Hash Generator",
    tagline:
      "Hitung hash SHA-1, SHA-256, SHA-384, SHA-512, atau MD5 dari teks atau file, langsung di browser Anda. Checksum cepat untuk pemeriksaan integritas — tanpa unggahan.",
    intro: [
      "Hash teks apa pun saat Anda mengetik, atau letakkan file untuk mem-fingerprint-nya tanpa membacanya byte demi byte. Digest keluarga SHA-2 berjalan di mesin WebCrypto bawaan browser; MD5 memakai implementasi JavaScript yang telah teruji — semuanya lokal, semuanya gratis.",
      "Pemakaian khas: memverifikasi unduhan terhadap checksum yang dipublikasikan, mendeduplikasi file, membuat cache key, atau membandingkan dua versi dokumen. Ganti algoritma dengan satu klik dan salin digest heksanya seketika.",
    ],
    steps: [
      "Pilih algoritmanya: SHA-256 secara bawaan, atau SHA-1/384/512/MD5.",
      "Ketik atau tempel teks — atau ganti ke mode File dan letakkan file.",
      "Salin digest heksanya; bandingkan dengan checksum yang diharapkan.",
    ],
    faqs: [
      {
        q: "Algoritma mana yang sebaiknya saya pakai?",
        a: "SHA-256 adalah pilihan bawaan yang masuk akal untuk pemeriksaan integritas dan fingerprint. SHA-384/512 untuk digest lebih panjang; SHA-1 dan MD5 itu warisan — cukup untuk checksum non-keamanan, tetapi jangan andalkan melawan penyerang.",
      },
      {
        q: "Bisakah hash dibalik untuk memulihkan inputnya?",
        a: "Tidak. Hash itu satu arah: digest berpanjang tetap membuang informasi secara desain. Menemukan input yang menghasilkan digest tertentu berarti brute-force seluruh ruangnya.",
      },
      {
        q: "Apakah teks dan file saya diunggah?",
        a: "Tidak pernah. Hashing berjalan lokal di browser Anda — bahkan file bermulti-gigabita dibaca oleh perangkat Anda sendiri saja.",
      },
    ],
  },
  "md5-generator": {
    name: "MD5 Generator",
    tagline:
      "Hasilkan hash MD5 dari teks atau file apa pun secara instan di browser Anda — sempurna untuk checksum, dedup key, dan integrasi warisan. Satu arah, tidak pernah diunggah.",
    intro: [
      "Ketik teks untuk melihat digest MD5 128-bit-nya secara langsung, atau letakkan file untuk mem-fingerprint-nya tanpa mengunggah satu byte pun. Hashing terjadi lokal dengan implementasi JavaScript algoritma MD5 yang matang.",
      "MD5 masih ada di mana-mana: checksum unduhan, dedup key file, cache buster, integrasi sistem warisan. Hanya ingat apa yang bukan untuknya — meski sudah tua, MD5 rusak secara kriptografis, jadi jangan pernah memakainya untuk kata sandi, signature, atau apa pun yang bisa diubah penyerang.",
    ],
    steps: [
      "Ketik atau tempel teksnya — digest MD5 diperbarui langsung.",
      "Atau ganti ke mode File dan letakkan file untuk di-hash secara lokal.",
      "Salin digest heksanya dan bandingkan dengan checksum yang diharapkan.",
    ],
    faqs: [
      {
        q: "Apakah MD5 aman untuk menyimpan kata sandi?",
        a: "Tidak — bahkan tidak mendekati. MD5 cepat secara desain dan serangan tabrakan itu praktis, yang membuat memecahkan hash kata sandi MD5 itu sepele. Gunakan skema hashing kata sandi khusus seperti bcrypt, scrypt, atau Argon2 sebagai gantinya.",
      },
      {
        q: "Untuk apa MD5 masih bagus?",
        a: "Integritas non-adversarial: memverifikasi file selamat dari transfer, deduplikasi konten, cache key, dan berbicara dengan sistem warisan yang mengharapkannya. Untuk pemeriksaan yang relevan dengan keamanan, pakai SHA-256 atau lebih baik.",
      },
      {
        q: "Apakah teks dan file saya dikirim ke server?",
        a: "Tidak. Semuanya berjalan di browser Anda; bahkan file dibaca dan di-hash sepenuhnya di perangkat Anda.",
      },
    ],
  },
  "sha256-generator": {
    name: "SHA-256 Generator",
    tagline:
      "Hitung hash SHA-256 dari teks atau file secara online memakai WebCrypto bawaan — pilihan standar untuk pemeriksaan integritas dan fingerprint. 100% client-side.",
    intro: [
      "Ketik teks untuk melihat digest SHA-256 256-bit muncul secara langsung, atau letakkan file untuk mem-fingerprint gigabita tanpa mengunggah apa pun. Hash dihitung oleh implementasi WebCrypto milik browser sendiri — kode yang sama yang dipercaya OS dan stack TLS Anda.",
      "SHA-256 adalah default hari ini untuk memverifikasi unduhan, menandai artefak, mendeduplikasi konten, membangun penyimpanan ber-address-konten, dan pekerjaan blockchain. Salin digest heksanya sekali klik dan bandingkan dengan checksum yang diberikan penerbitnya.",
    ],
    steps: [
      "Ketik atau tempel teksnya — digest diperbarui saat Anda mengetik.",
      "Atau ganti ke mode File dan letakkan file untuk di-hash secara lokal.",
      "Salin digest heksanya dan bandingkan dengan nilai yang diharapkan.",
    ],
    faqs: [
      {
        q: "Apakah SHA-256 aman?",
        a: "Ya — SHA-256 bagian dari keluarga SHA-2 dan tetap tak terpecahkan setelah dua dekade analisis. Ia digest di balik sertifikat TLS, Bitcoin, dan kebanyakan verifikasi rilis perangkat lunak.",
      },
      {
        q: "Kenapa input yang sama selalu menghasilkan hash yang sama?",
        a: "Karena SHA-256 deterministik: byte identik selalu menghasilkan digest identik. Properti itulah yang membuat perbandingan checksum bekerja — satu byte berubah di mana pun mengubah seluruh digest.",
      },
      {
        q: "Apakah teks dan file saya diunggah?",
        a: "Tidak. Hashing berjalan lokal di browser Anda dengan WebCrypto — data Anda tidak pernah meninggalkan perangkat.",
      },
    ],
  },
  "regex-tester": {
    name: "Regex Tester",
    tagline:
      "Uji regular expression secara langsung: sorot setiap kecocokan saat Anda mengetik, periksa capture group, dan debug pola untuk JavaScript, dengan flag umum sekali klik.",
    intro: [
      "Ketik pola, nyalakan flag yang Anda butuhkan (global, case-insensitive, multiline, dotAll, unicode) dan tempel string uji Anda — setiap kecocokan disorot di tempatnya sementara daftar di bawah menampilkan tiap kecocokan dengan indeks dan capture group-nya, termasuk named group.",
      "Pola yang tidak valid dilaporkan seketika dengan pesan milik parser sendiri alih-alih halaman yang rusak, dan kecocokan nol-panjang ditangani dengan aman, jadi pola seperti a* berperilaku seperti runtime Anda.",
    ],
    steps: [
      "Masukkan regular expression Anda di kolom pola.",
      "Nyalakan flag (g, i, m, s, u) dan tempel string uji Anda.",
      "Baca kecocokan yang disorot dan daftar grupnya; sesuaikan pola sampai menangkap persis yang Anda butuhkan.",
    ],
    faqs: [
      {
        q: "Rasa regex mana yang dipakai ini?",
        a: "JavaScript (ECMAScript) RegExp — mesin yang sama yang berjalan di browser dan Node Anda. Pola untuk PCRE, Python, atau Java biasanya kompatibel, tetapi lookahead/lookbehind dan penanganan unicode bisa sedikit berbeda.",
      },
      {
        q: "Kenapa pola saya mencocokkan posisi kosong yang aneh?",
        a: "Pola yang bisa mencocokkan string kosong (seperti a* atau (?:)?) menghasilkan kecocokan nol-panjang. Tester maju satu karakter setelahnya, persis seperti iterasi milik JavaScript sendiri.",
      },
      {
        q: "Apakah data uji saya dikirim ke mana pun?",
        a: "Tidak. Pencocokan berjalan langsung di browser Anda — tidak ada yang diunggah atau disimpan.",
      },
    ],
  },
  "json-to-csv": {
    name: "JSON ke CSV",
    tagline:
      "Konversikan array objek JSON ke CSV dengan quoting dan escaping yang benar — siap spreadsheet untuk Excel, Sheets, atau impor database. Sepenuhnya di browser.",
    intro: [
      "Tempel array objek JSON dan dapatkan CSV-nya seketika. Kolom adalah gabungan setiap key yang ditemukan di seluruh baris, nilai di-escape sesuai buku — kutip digandakan, field dibungkus saat memuat koma, kutip, atau baris baru — jadi hasilnya terbuka bersih di Excel, Sheets, atau importer mana pun.",
      "Objek dan array bersarang diserialisasi sebagai string JSON di dalam selnya, boolean dan angka diteruskan apa adanya, dan null menjadi sel kosong. Pilih koma atau titik koma sebagai delimiter untuk locale yang mengharapkannya.",
    ],
    steps: [
      "Tempel array objek JSON ke kotak input.",
      "CSV-nya muncul langsung — pilih koma atau titik koma jika spreadsheet Anda membutuhkannya.",
      "Salin hasilnya langsung ke file .csv atau wizard impor.",
    ],
    faqs: [
      {
        q: "Bagaimana jika baris saya punya key yang berbeda?",
        a: "Alat ini membangun daftar kolom dari setiap key yang terlihat di seluruh baris; baris yang kehilangan sebuah kolom mendapat sel kosong. Ini biasanya yang Anda inginkan untuk data dunia nyata yang berantakan.",
      },
      {
        q: "Bagaimana objek dan array bersarang ditangani?",
        a: "Mereka diserialisasi menjadi string JSON di dalam sel (dan dikutip/di-escape seperti nilai lain). Ratakan data Anda lebih dulu jika butuh satu kolom per field bersarang.",
      },
      {
        q: "Apakah data saya diunggah ke mana pun?",
        a: "Tidak. Konversi terjadi secara lokal di browser Anda — tidak ada yang meninggalkan perangkat.",
      },
    ],
  },
  "csv-to-json": {
    name: "CSV ke JSON",
    tagline:
      "Konversikan CSV ke JSON dengan inferensi tipe otomatis — angka, boolean, dan null dideteksi, field berkutip ditangani. Tempel, konversi, salin. Tanpa unggahan.",
    intro: [
      "Tempel CSV apa pun dengan baris header dan dapatkan array objek JSON secara real time. Field berkutip, kutip yang di-escape, dan akhiran baris CRLF di-parse dengan benar, dan setiap sel mendapat tipe yang masuk akal: true/false menjadi boolean, angka polos menjadi angka, null menjadi null — sisanya tetap string.",
      "Gunakan untuk memberi makan request API, menyemai database, atau mengubah ekspor spreadsheet menjadi sesuatu yang bisa dikonsumsi kode Anda. Output JSON-nya pretty-printed dengan indentasi 2 spasi dan siap disalin.",
    ],
    steps: [
      "Tempel CSV Anda (baris pertama harus header) ke kotak input.",
      "Pilih koma atau titik koma sebagai delimiter.",
      "Salin array objek JSON yang sudah pretty-printed.",
    ],
    faqs: [
      {
        q: "Bagaimana inferensi tipe memutuskan antara string dan angka?",
        a: "Sel menjadi angka hanya jika itu literal numerik bersih (tanpa nol di depan, tanpa spasi liar), true/false menjadi boolean, literal null menjadi null, dan sisanya — ID dengan nol di depan, kode pos, tanggal — tetap string demi mempertahankan nilai persisnya.",
      },
      {
        q: "Bagaimana jika baris header saya punya nama duplikat atau kosong?",
        a: "Sel header kosong diganti otomatis dengan nama column1, column2…. Nama duplikat menyatu ke kemunculan terakhir, karena objek JSON tidak bisa menampung key duplikat.",
      },
      {
        q: "Apakah CSV saya diunggah ke server?",
        a: "Tidak. Konversi berjalan lokal di browser Anda — data Anda tidak pernah meninggalkan perangkat.",
      },
    ],
  },
  "markdown-previewer": {
    name: "Pratinjau Markdown",
    tagline:
      "Pratinjau Markdown sebagai HTML bersih dan tersanitasi saat Anda mengetik — heading, daftar, tabel, kode, dan tautan dirender langsung. Sempurna untuk README, docs, dan komentar.",
    intro: [
      "Tulis Markdown di kiri dan saksikan halaman yang dirender muncul di kanan secara real time: heading, penekanan, daftar, tabel, blockquote, task list, dan blok kode berpagar, semuanya dirender oleh mesin marked yang banyak dipakai.",
      "HTML yang dihasilkan disanitasi dengan allowlist tag dan atribut yang ketat sebelum ditampilkan — script, event handler, dan URL javascript: dicabut — dan Anda bisa menyalin HTML bersihnya untuk ditempel ke blog, CMS, atau template email.",
    ],
    steps: [
      "Ketik atau tempel Markdown ke panel kiri.",
      "Saksikan pratinjau tersanitasi diperbarui di kanan saat Anda menulis.",
      "Salin HTML yang dihasilkan saat tampak benar, atau bersihkan untuk memulai ulang.",
    ],
    faqs: [
      {
        q: "Apakah HTML yang dipratinjau aman?",
        a: "Ya. Sebelum apa pun dirender, HTML melewati sanitizer whitelist yang menghapus tag script, event handler inline, dan tautan javascript:, hanya menyisakan tag format standar serta URL gambar/tautan yang aman.",
      },
      {
        q: "Fitur Markdown apa saja yang didukung?",
        a: "Semua yang ditangani marked secara bawaan: tabel bergaya GitHub, strikethrough, task list, autolink, kode berpagar dengan label sintaks, dan daftar bersarang.",
      },
      {
        q: "Di mana teks saya diproses?",
        a: "Sepenuhnya di browser Anda — Markdown tidak pernah meninggalkan perangkat, bahkan saat Anda menyalin HTML yang dihasilkan.",
      },
    ],
  },
  "html-escape": {
    name: "HTML Escape / Unescape",
    tagline:
      "Escape atau unescape entitas HTML secara langsung saat Anda mengetik: & < > dan kutipan menjadi referensi aman, dengan mode numerik opsional untuk karakter non-ASCII.",
    intro: [
      "Enkode lima karakter yang merusak HTML — ampersand, kurung sudut, dan kedua gaya kutip — menjadi entitas bernamanya, atau tempel entitas kembali menjadi teks terbaca. Saklar kedua mengubah karakter beraksen dan non-Latin menjadi referensi numerik seperti &#233;, berguna untuk sistem warisan dan template email.",
      "Kedua arah berjalan langsung di satu panel, dan pembacaannya menunjukkan persis bagaimana jumlah karakter berubah, sehingga escape ganda yang rusak terlihat sekilas.",
    ],
    steps: [
      "Tempel HTML atau teks ter-escape ke kotak input.",
      "Pilih Escape atau Unescape; keduanya berjalan langsung saat Anda mengetik.",
      "Aktifkan entitas numerik jika butuh output non-ASCII seperti &#233;.",
      "Salin hasilnya — pembacaan jumlah karakter menunjukkan seberapa besar ia tumbuh atau menyusut.",
    ],
    faqs: [
      {
        q: "Kenapa kutip tunggal di-escape sebagai &#39; alih-alih &apos;?",
        a: "&apos; valid di XML dan HTML5 tetapi tidak pernah bagian dari HTML 4, jadi sebagian parser lama dan klien email salah menanganinya. &#39; numerik aman di mana saja.",
      },
      {
        q: "Apakah saya perlu meng-escape karakter non-ASCII?",
        a: "Di dokumen UTF-8, biasanya tidak — browser menangani é langsung. Entitas numerik penting untuk encoding warisan, pipeline email, atau sistem yang merusak byte non-ASCII.",
      },
      {
        q: "Entitas bernama apa saja yang dikenali saat unescaping?",
        a: "Sekitar 70 yang umum — markup (&amp;, &lt;, &gt;, &quot;, &apos;), tanda baca (&mdash;, &hellip;, &ldquo;), aksen Latin dan simbol (&copy;, &euro;) — plus setiap referensi numerik desimal dan heksadesimal.",
      },
    ],
  },
  "url-parser": {
    name: "URL Parser",
    tagline:
      "Tempel URL apa pun dan lihat terurai secara langsung: protokol, host, port, tiap segmen path, parameter query terdekode, dan hash — dengan salin sebagai JSON.",
    intro: [
      "Sebuah URL menyembunyikan selusin potongan data dalam satu baris. Alat ini memecahnya menjadi baris berlabel — scheme, host, port, setiap segmen path di barisnya sendiri, tiap parameter query dengan key dan nilai terdekodenya, plus fragment — jadi Anda bisa mengaudit tautan pelacakan, men-debug routing, atau merekayasa balik panggilan API.",
      "Parsing memakai URL API bawaan browser: nilai didekode persis seperti server penerima akan mendekodenya. URL tanpa scheme mengasumsikan https://, dan input yang cacat mendapat error berbahasa sederhana alih-alih crash.",
    ],
    steps: [
      "Tempel URL ke kotak input.",
      "Baca tabel terurainya: bagian, segmen, dan parameter diperbarui langsung.",
      "Salin sebagai JSON saat butuh rinciannya di kode atau dokumentasi.",
    ],
    faqs: [
      {
        q: "Apa yang terjadi jika saya menempel URL tanpa https://?",
        a: "Alat ini mengasumsikan https:// dan mencoba lagi, karena itulah yang dilakukan browser untuk domain telanjang. Scheme yang Anda ketik secara eksplisit selalu dipertahankan apa adanya.",
      },
      {
        q: "Apakah nilai query didekode?",
        a: "Ya. Key dan nilai didekode lewat standar URL, jadi %20 menjadi spasi dan %2F menjadi garis miring, persis seperti yang akan dibaca server.",
      },
      {
        q: "Bagaimana dengan key query duplikat seperti ?tag=a&tag=b?",
        a: "Setiap kemunculan mendapat barisnya sendiri, dan ekspor JSON mencantumkannya sebagai pasangan key/nilai terpisah sehingga tidak ada yang tertimpa diam-diam.",
      },
    ],
  },
  "http-status-codes": {
    name: "Kode Status HTTP",
    tagline:
      "Referensi 56 kode status HTTP yang bisa dicari, dikelompokkan per kelas, masing-masing dijelaskan dalam satu kalimat polos — klik baris mana pun untuk menyalin angkanya.",
    intro: [
      "Setiap kode status penting dari 100 Continue sampai 511 Network Authentication Required, dikelompokkan per kelas dan dijelaskan dalam satu kalimat polos: apa yang benar-benar terjadi di jalur dan apa langkah berikutnya. Klasiknya (200, 301, 404, 500) berdampingan dengan yang mengejutkan orang (207, 418, 451).",
      "Pencarian memfilter langsung berdasarkan nomor atau nama — ketik 30 untuk mendarat di setiap redirect, atau “teapot” untuk menyelesaikan perdebatan. Mengklik sebuah baris menyalin angkanya saja, siap untuk kode, docs, atau laporan bug.",
    ],
    steps: [
      "Ketik nomor atau nama di kotak pencarian, atau jelajahi per kelas.",
      "Baca makna satu barisnya — tanpa prosa RFC, hanya makna praktisnya.",
      "Klik baris untuk menyalin nomor kodenya seketika.",
    ],
    faqs: [
      {
        q: "Apa bedanya 301, 302, dan 307?",
        a: "Ketiganya me-redirect, tetapi 301 permanen (mesin pencari memindahkan peringkatnya) sementara 302/307 sementara. 307 tambahan menjamin method dan body tetap tak berubah — pakai saat POST harus selamat melewati redirect.",
      },
      {
        q: "Apakah 418 I'm a teapot kode status sungguhan?",
        a: "Berawal sebagai lelucon April Mop di RFC 2324 dan kemudian dicantumkan sebagai reserved. Beberapa API sungguhan mengembalikannya untuk kesenangan atau rate limiting, dan browser menanganinya seperti error 4xx lainnya.",
      },
      {
        q: "Kenapa 401 dan 403 sama-sama bilang saya tidak bisa masuk?",
        a: "401 berarti “kamu siapa?” — kredensial hilang atau salah. 403 berarti “aku tahu kamu siapa dan kamu tetap tidak bisa” — autentikasi berhasil tetapi resourcenya terlarang.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* SEO                                                                 */
  /* ------------------------------------------------------------------ */
  "meta-tag-generator": {
    name: "Generator Meta Tag",
    tagline:
      "Hasilkan meta tag title, description, keywords, robots, dan viewport dengan output HTML langsung yang bisa langsung Anda tempel ke <head>.",
    intro: [
      "Meta tag adalah hal pertama yang dibaca crawler: tag title adalah sinyal peringkat, dan meta description menjadi snippet Anda setiap kali Google tidak menulis ulangnya. Generator ini membangun satu set bersih dan valid — title, description, keywords, robots, viewport, author plus tautan canonical opsional — sambil Anda mengetik.",
      "Setiap nilai atribut di-escape HTML, jadi kutip dan ampersand tidak bisa merusak markup Anda. Salin bloknya ke bagian head template atau CMS Anda dan sesuaikan per halaman.",
    ],
    steps: [
      "Isi judul halaman (usahakan 50–60 karakter) dan meta description-nya (hingga ~160).",
      "Atur robots, viewport, dan author sesuai kebutuhan — kolom yang dibiarkan kosong dihilangkan dari output.",
      "Salin potongan <head> yang dihasilkan dan tempel ke template halaman Anda.",
    ],
    faqs: [
      {
        q: "Berapa panjang yang sebaiknya dimiliki tag title?",
        a: "Usahakan sekitar 50–60 karakter, kira-kira 580 piksel pada ukuran font yang dirender Google. Judul lebih panjang dipotong dengan elipsis di hasil — alat pratinjau SERP menunjukkan persis di mana pemotongannya jatuh.",
      },
      {
        q: "Apakah meta keywords masih berguna?",
        a: "Google mengabaikan tag meta keywords sejak 2009, dan Bing bisa menganggapnya sinyal spam. Isi hanya jika mesin niche atau platform pencarian internal secara eksplisit memintanya.",
      },
      {
        q: "Apa yang dikendalikan meta tag robots?",
        a: "index/noindex memutuskan apakah halaman boleh muncul di hasil; follow/nofollow apakah tautannya menebar equity. Ia harus berada di halaman itu sendiri — robots.txt tidak bisa men-noindex apa pun.",
      },
    ],
  },
  "open-graph-generator": {
    name: "Generator Open Graph",
    tagline:
      "Bangun set lengkap meta tag og: dan twitter: serta saksikan pratinjau kartu berbagi diperbarui langsung sebelum Anda menempel apa pun.",
    intro: [
      "Saat tautan Anda dibagikan di X, Facebook, LinkedIn, Slack, atau iMessage, kartu pratinjaunya dibangun hampir seluruhnya dari tag Open Graph, dengan tag Twitter card mengisi celahnya. Generator ini mengeluarkan kedua namespace: og:title, og:type, og:url, og:image, og:image:alt, og:site_name, og:description, dan og:locale, plus twitter:card, twitter:site, dan twitter:creator.",
      "Kebanyakan platform mundur ke tag og: saat tag twitter: tidak ada, jadi tambahannya hanya diperlukan di tempat mereka berbeda. Pratinjau langsungnya mendekati cara kartu gambar-besar atau summary dirender.",
    ],
    steps: [
      "Masukkan judul halaman, description, dan URL canonical.",
      "Tambahkan URL gambar berbagi (1200 × 630 px bekerja di mana saja) dan atur tipe kartunya.",
      "Salin tag-nya ke <head> Anda dan periksa kartu pratinjaunya.",
    ],
    faqs: [
      {
        q: "Ukuran gambar apa yang sebaiknya dipakai untuk og:image?",
        a: "1200 × 630 piksel (1.91:1) adalah bawaan yang aman di Facebook, X, dan LinkedIn. Jaga file di bawah 8 MB, pakai URL absolut, dan selalu tambahkan og:image:alt untuk aksesibilitas.",
      },
      {
        q: "Apakah saya butuh tag og: dan twitter: sekaligus?",
        a: "twitter:title, twitter:description, dan twitter:image mundur ke padanan og:-nya. Di atas set og: Anda hanya butuh twitter:card (summary atau summary_large_image), twitter:site, dan opsional twitter:creator.",
      },
      {
        q: "og:type mana yang sebaiknya dipilih?",
        a: "Gunakan website untuk halaman utama dan halaman generik, article untuk berita dan tulisan blog (tambahkan article:published_time jika bisa), dan product untuk halaman detail e-commerce. Tipenya mengubah cara beberapa platform mengategorikan tautannya.",
      },
    ],
  },
  "canonical-tag-generator": {
    name: "Generator Tag Canonical",
    tagline:
      "Hasilkan tag tautan rel=canonical yang benar dan pelajari cara menormalkan URL agar mesin pencari mengindeks satu versi yang Anda mau.",
    intro: [
      "Tag canonical memberi tahu mesin pencari URL mana yang harus diindeks saat konten yang sama terjangkau di beberapa alamat — dengan dan tanpa garis miring di akhir, dengan query string, parameter UTM, varian http/https, atau www. Dilakukan dengan benar, ia menyatukan URL duplikat menjadi satu sinyal peringkat alih-alih memecahnya.",
      "Masukkan URL absolut dari versi pilihan dan salin tag-nya ke <head> halaman itu. Checklist-nya mencakup detail normalisasi yang paling sering salah oleh kebanyakan implementasi.",
    ],
    steps: [
      "Pilih satu format URL canonical untuk seluruh situs Anda: https, host dengan atau tanpa www, dengan atau tanpa garis miring akhir.",
      "Tempel URL absolut dari versi pilihan halamannya.",
      "Salin tag tautannya ke <head> halaman dan verifikasi dengan alat URL Inspection.",
    ],
    faqs: [
      {
        q: "Sebenarnya apa yang dilakukan tag canonical?",
        a: "Ia menyatukan duplikat: sinyal dari URL alternatif — salinan UTM, urutan berparameter, tampilan cetak — digabung ke URL canonical, jadi yang merangking adalah ia alih-alih equity terpecah ke duplikatnya.",
      },
      {
        q: "Apakah setiap halaman harus punya canonical yang merujuk dirinya sendiri?",
        a: "Ya, itu bawaan yang direkomendasikan. Bahkan halaman unik sebaiknya mendeklarasikan URL-nya sendiri sebagai canonical untuk menjaga dari varian parameter, garis miring akhir, dan besar-kecil huruf yang belum Anda sadari.",
      },
      {
        q: "Canonical vs. noindex vs. redirect — pilih yang mana?",
        a: "Gunakan 301 redirect saat duplikatnya harus mengarahkan pengguna ke tempat lain, noindex saat ia harus tetap terjangkau tetapi keluar dari hasil, dan canonical saat kedua versi harus tetap hidup dan bisa di-crawl.",
      },
    ],
  },
  "schema-markup-generator": {
    name: "Generator Schema Markup",
    tagline:
      "Hasilkan structured data JSON-LD yang valid untuk Organization, LocalBusiness, Product, Article, FAQPage, dan HowTo — ter-escape dan siap tempel.",
    intro: [
      "Structured data membantu mesin pencari memahami entitas di sebuah halaman: siapa penerbitnya, berapa harga produknya, pertanyaan apa yang dijawabnya. Generator ini membangun JSON-LD untuk enam tipe schema.org yang paling banyak dipakai, menghilangkan field kosong, dan meng-escape output-nya agar aman di dalam tag <script>.",
      "Pilih tipe yang cocok dengan halaman, isi fieldnya, dan tempel bloknya ke head atau body. Selalu lewatkan ke validator rich results sebelum deploy — markup yang ter-parse tetapi melanggar pedoman bisa menuaikan manual action.",
    ],
    steps: [
      "Pilih tipe schema yang cocok dengan halaman.",
      "Isi field-nya — untuk FAQPage dan HowTo Anda bisa menambah dan menghapus baris pertanyaan atau langkah.",
      "Salin blok JSON-LD ke halaman, lalu lewatkan ke Rich Results Test milik Google.",
    ],
    faqs: [
      {
        q: "Apakah rich results FAQ masih ada?",
        a: "Google kini menampilkan rich result FAQ hampir eksklusif untuk situs pemerintah dan kesehatan yang terkenal. Markupnya masih layak dipublikasikan: answer engine dan AI Overviews membaca data FAQPage saat mencari sumber jawaban, dan mesin lain masih menghormatinya.",
      },
      {
        q: "JSON-LD vs. Microdata — format mana?",
        a: "JSON-LD adalah format yang direkomendasikan Google: satu blok script, tanpa mengubah elemen HTML Anda, lebih mudah dibuat dan dirawat. Microdata mencapai hasil yang sama tetapi terjalin dengan markup Anda.",
      },
      {
        q: "Apakah structured data yang valid menjamin rich results?",
        a: "Tidak. Validitas membuat halaman memenuhi syarat untuk sebuah fitur; Google memutuskan per query dan per permukaan apakah menampilkannya. Jangan pernah menjanjikan bintang atau breadcrumb di laporan hanya berdasarkan markup.",
      },
    ],
  },
  "robots-txt-generator": {
    name: "Generator robots.txt",
    tagline:
      "Bangun robots.txt dengan blocklist atau allowlist crawler AI, aturan per-bot, crawl-delay, dan direktif sitemap — lalu salin atau unduh.",
    intro: [
      "robots.txt mengendalikan akses crawler sebelum sebuah halaman bahkan diambil. Melampaui aturan User-agent: * klasik, kini Anda bisa memutuskan per bot AI: izinkan crawler sekeluarga pencarian seperti OAI-SearchBot dan PerplexityBot, blokir crawler pelatihan seperti GPTBot, ClaudeBot, Google-Extended, CCBot, dan Bytespider, atau campur kebijakan Anda sendiri.",
      "Generator mengelompokkan user-agent yang berbagi aturan, menambah crawl-delay di tempat ia dihormati, dan menyertakan direktif sitemap Anda. Salin filenya ke root domain di /robots.txt dan verifikasi di laporan robots milik Search Console.",
    ],
    steps: [
      "Pilih preset: izinkan semua, blokir bot pelatihan AI, atau blokir semuanya.",
      "Haluskan tiap crawler AI dengan Allow, Block, atau tanpa aturan, dan tambahkan path Disallow untuk User-agent: *.",
      "Tambahkan URL sitemap Anda, lalu salin atau unduh filenya ke root situs Anda.",
    ],
    faqs: [
      {
        q: "Apakah robots.txt adalah kontrol keamanan?",
        a: "Bukan. Ia bersifat advisori: crawler yang patuh menaatinya, tetapi siapa pun bisa membacanya — dan ia mengiklankan path privat Anda. Lindungi area sensitif dengan autentikasi; jangan pernah mengandalkan Disallow untuk keamanan.",
      },
      {
        q: "Apakah crawler AI benar-benar menghormati robots.txt?",
        a: "Yang besar dan terdokumentasi — GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot — menyatakan mendukung robots.txt, tetapi kepatuhannya sukarela dan berbeda tiap operator. Untuk jaminan keras, blokir di lapisan CDN atau firewall.",
      },
      {
        q: "Kenapa halaman saya masih terindeks setelah Disallow?",
        a: "Memblokir crawling bukan memblokir indexing: jika halaman lain menautkan ke URL itu, Google masih bisa mengindeksnya tanpa kontennya. Untuk mengeluarkan halaman dari hasil, izinkan crawling dan gunakan meta tag noindex sebagai gantinya.",
      },
    ],
  },
  "sitemap-generator": {
    name: "Generator XML Sitemap",
    tagline:
      "Tempel daftar URL dan dapatkan sitemap.xml yang valid dengan lastmod, changefreq dan priority per seksi — terdeduplikasi dan siap dikirim.",
    intro: [
      "Sitemap memberi tahu mesin pencari URL mana yang ada dan kapan terakhir berubah. Tempel daftar Anda — dari ekspor crawler, CMS, atau spreadsheet — dan generatornya mendeduplikasi entri, mengelompokkannya per segmen path pertama, serta membiarkan Anda mengatur changefreq dan priority per kelompok sambil menjaga file tetap valid-protokol.",
      "XML-nya mengikuti protokol sitemaps.org 0.9 yang diterima Google, Bing, dan Yandex. Unduh filenya, host di /sitemap.xml dan rujuk dari robots.txt atau kirim langsung di Search Console.",
    ],
    steps: [
      "Tempel satu URL absolut per baris — hingga batas 50.000 URL / 50 MB per file.",
      "Atur penanganan lastmod dan sesuaikan changefreq serta priority per seksi di tempat yang masuk akal.",
      "Unduh sitemap.xml, unggah ke root domain Anda dan kirimkan di Search Console.",
    ],
    faqs: [
      {
        q: "Apakah changefreq dan priority masih penting?",
        a: "Google mengabaikan keduanya dan memakai penjadwalannya sendiri; lastmod adalah satu-satunya tag dengan efek terdokumentasi, dan itu pun hanya saat akurat. Atur sisanya jika Anda mau file yang lengkap, tetapi habiskan tenaganya untuk nilai lastmod yang jujur.",
      },
      {
        q: "Nilai lastmod apa yang sebaiknya dipakai?",
        a: "Tanggal terakhir konten halaman berubah secara bermakna, dalam format W3C Datetime (YYYY-MM-DD sudah cukup). Menyalin tanggal hari ini ke setiap URL mengajari Google untuk tidak mempercayai lastmod Anda.",
      },
      {
        q: "Seberapa besar sitemap boleh jadi?",
        a: "50.000 URL atau 50 MB tak terkompresi per file. Lebih dari itu, pecah menjadi beberapa sitemap dan daftarkan dalam file indeks sitemap, lalu kirimkan indeksnya.",
      },
    ],
  },
  "serp-preview": {
    name: "Pratinjau SERP",
    tagline:
      "Pratinjau snippet Google Anda di desktop dan mobile dengan pemotongan level piksel dan meter panjang untuk title dan description.",
    intro: [
      "Google memotong title dan description berdasarkan lebar piksel terukur, bukan jumlah karakter — judul penuh huruf lebar terpotong lebih cepat daripada jumlah huruf sempit yang sama. Pratinjau ini mengukur teks Anda seperti yang dilakukan halaman hasil dan memotongnya persis di tempat Google memotong.",
      "Ganti antara anggaran piksel desktop dan mobile, awasi meternya, dan poles salinannya sampai seluruh pesan selamat dari pemotongan.",
    ],
    steps: [
      "Masukkan tag title, meta description, dan URL halaman.",
      "Berpindah antara desktop dan mobile untuk membandingkan titik pemotongannya.",
      "Sesuaikan salinannya sampai title dan description muat di dalam anggaran piksel.",
    ],
    faqs: [
      {
        q: "Seberapa panjang title boleh sebelum Google memotongnya?",
        a: "Sekitar 580–600 piksel di desktop, biasanya 50–60 karakter; mobile memberi sedikit lebar lebih. Ukuran piksel adalah batas sebenarnya — jumlah karakter hanya panduan kasar karena lebar huruf berbeda-beda.",
      },
      {
        q: "Apakah Google selalu menampilkan meta description saya?",
        a: "Tidak. Google menulis ulang description untuk porsi besar query, biasanya untuk mencocokkan istilah yang dicari. Description yang akurat dan spesifik menaikkan peluang milik Anda dipakai apa adanya.",
      },
      {
        q: "Kenapa Google bisa mengganti title saya?",
        a: "Saat Google menganggap string lain lebih cocok dengan query, ia bisa menggantinya dengan H1, anchor text tautan internal, atau nama situs. Pratinjau ini menampilkan kasus terbaik: tag Anda sendiri, tanpa modifikasi.",
      },
    ],
  },
  "keyword-density-checker": {
    name: "Pemeriksa Kepadatan Keyword",
    tagline:
      "Hitung frasa keyword 1–3 kata dan kepadatannya, dengan daftar stopword bawaan untuk Inggris, Cina, Jepang, Spanyol, dan Portugis.",
    intro: [
      "Kepadatan keyword adalah porsi kemunculan sebuah frasa di antara semua kata di halaman. Pemeriksa ini men-tokenisasi teks Anda, mencabut stopword per bahasa, dan melaporkan hitungan serta kepadatan untuk frasa satu, dua, dan tiga kata — langsung, saat Anda menempel atau menyunting.",
      "Gunakan untuk memastikan halaman benar-benar mengatakan apa yang ingin Anda rangking, bukan untuk mengejar persentase ajaib. Salinan yang terbaca alami sambil mencakup topik mengalahkan rasio tetap mana pun.",
    ],
    steps: [
      "Tempel salinan halaman atau drafnya ke kotak input.",
      "Pilih bahasa konten dan apakah mengecualikan stopword.",
      "Baca hitungan dan kepadatan frasa 1–3 kata, atau cari untuk memeriksa istilah tertentu.",
    ],
    faqs: [
      {
        q: "Kepadatan keyword berapa yang sebaiknya dituju?",
        a: "Tidak ada targetnya. Sistem peringkat modern memakai embedding dan model topik, bukan ambang kepadatan. Jika frasa teratas mencerminkan topik halaman dalam bahasa yang alami — kira-kira 1–2% untuk istilah utama — Anda sudah aman.",
      },
      {
        q: "Apakah stopword dibuang sebelum dihitung?",
        a: "Hanya jika Anda mengaktifkannya. Membuangnya mengubah 'hotel in london' menjadi 'hotel london' sebagai bigram, yang sering kali memang cara orang mencari. Bandingkan kedua tampilan sebelum memutuskan.",
      },
      {
        q: "Bagaimana Cina dan Jepang dihitung?",
        a: "Tanpa segmenter sungguhan, teks CJK dihitung per karakter untuk token tunggal dan per pasangan karakter untuk frasa dua kata — aproksimasi bagus untuk menemukan istilah yang dipakai berlebihan, bukan analisis linguistik.",
      },
    ],
  },
  "hreflang-generator": {
    name: "Generator hreflang",
    tagline:
      "Bangun klaster tautan hreflang lengkap — satu tautan per bahasa plus x-default — dari URL terjemahan Anda, konsisten dan dua arah.",
    intro: [
      "hreflang memberi tahu mesin pencari URL mana yang disajikan kepada penutur tiap bahasa, yang mencegah terjemahan nyaris-duplikat saling bersaing. Klasternya dua arah: setiap halaman terlokalisasi harus mengembalikan set lengkapnya, termasuk rujukan kembali ke dirinya sendiri.",
      "Masukkan URL tiap versi bahasa dan generatornya mengeluarkan klaster <link rel=\"alternate\"> penuh plus x-default, yang sebaiknya menunjuk pemilih bahasa atau halaman utama bahasa bawaan Anda.",
    ],
    steps: [
      "Tempel URL absolut tiap versi terjemahan; biarkan kosong untuk bahasa yang tidak Anda punya.",
      "Atur URL x-default — pemilih bahasa atau halaman utama bawaan Anda.",
      "Salin klaster-nya ke <head> setiap halaman dalam set.",
    ],
    faqs: [
      {
        q: "Apakah setiap halaman butuh set hreflang penuh?",
        a: "Ya. Klaster harus resiprokal: halaman A mendaftar halaman B dan dirinya, dan B mendaftar A dan dirinya. Klaster dengan anggota yang hilang diabaikan sebagian, dan usahanya terbuang.",
      },
      {
        q: "Sebaiknya memakai zh atau zh-Hans?",
        a: "Utamakan zh-Hans untuk Sederhana dan zh-Hant untuk Tradisional; zh telanjang membiarkan aksaranya tak terdefinisi. Subtag wilayah seperti pt-BR itu opsional — targetkan bahasanya lebih dulu dan tambahkan wilayah hanya saat kontennya benar-benar berbeda, seperti pt-BR vs pt-PT.",
      },
      {
        q: "Apakah hreflang menggantikan tag canonical?",
        a: "Tidak. Setiap versi bahasa tetap butuh canonical miliknya yang merujuk dirinya sendiri. hreflang memilih di antara halaman terjemahan yang setara; canonical menyelesaikan duplikat dalam satu bahasa.",
      },
    ],
  },
  "utm-builder": {
    name: "Pembuat Tautan UTM",
    tagline:
      "Tambahkan utm_source, medium, campaign, term, dan content ke URL apa pun dan dapatkan tautan pelacakan terenkode dengan benar yang bisa Anda salin atau bagikan.",
    intro: [
      "Parameter UTM adalah query string yang dibaca platform analitik untuk mengatribusikan trafik: source, medium, campaign, term, dan content. Builder ini menyematkannya ke URL Anda dengan percent-encoding yang benar, jadi spasi dan karakter spesial selamat dari perjalanan lewat platform iklan, kode QR, dan klien email.",
      "Sepakati konvensi penamaan sebelum membangun tautan — huruf kecil, tanda pisah, tanpa tanggal di dalam nama campaign — atau laporan Anda akan terpecah menjadi campaign nyaris-duplikat.",
    ],
    steps: [
      "Tempel URL tujuannya.",
      "Isi source dan medium lebih dulu, lalu campaign dan kolom term/content opsional.",
      "Salin URL bertag-nya ke iklan, newsletter, atau unggahan sosial Anda.",
    ],
    faqs: [
      {
        q: "Parameter UTM mana yang wajib?",
        a: "utm_source dan utm_medium adalah yang diandalkan alat analitik: source menamai perujuknya, medium kanalnya (cpc, email, social). utm_campaign sangat disarankan; utm_id, utm_term, dan utm_content opsional.",
      },
      {
        q: "Apakah parameter UTM merugikan SEO?",
        a: "Tidak jika ditangani dengan benar. Crawler bisa memperlakukan URL bertag sebagai duplikat, yang persis diselesaikan oleh canonical yang merujuk dirinya sendiri — itulah mengapa generator canonical berpasangan baik dengan alat ini.",
      },
      {
        q: "Apakah kapitalisasi di nilai UTM berpengaruh?",
        a: "Ya — utm_campaign=Spring dan utm_campaign=spring terhitung dua campaign di kebanyakan alat analitik. Standarkan ke huruf kecil dan laporan Anda tetap bersih.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* SECURITY                                                            */
  /* ------------------------------------------------------------------ */
  "password-generator": {
    name: "Generator Kata Sandi",
    tagline:
      "Hasilkan kata sandi dan passphrase kuat di browser Anda dengan estimasi entropi langsung — keacakan setara-kriptografi, tidak ada yang dikirim atau disimpan.",
    intro: [
      "Kata sandi yang lemah dan dipakai ulang menyebabkan kebanyakan pengambilalihan akun. Generator ini membuat kata sandi dengan generator angka acak kriptografis browser Anda (crypto.getRandomValues) — sumber yang sama yang dipakai untuk kunci enkripsi — jadi setiap karakter acak seragam dan mustahil ditebak.",
      "Pilih kata sandi acak klasik atau passphrase mudah diingat yang dibangun dari daftar 256 kata, atur panjang dan set karakternya, dan pantau pembacaan entropi dalam bit. Semuanya berjalan lokal: kata sandinya tidak pernah dikirim, dicatat, atau disimpan.",
    ],
    steps: [
      "Pilih Password untuk karakter acak atau Passphrase untuk kata yang mudah diketik.",
      "Atur slider panjang dan nyalakan set karakter; kecualikan karakter yang mirip jika Anda akan membaca kata sandinya dengan suara atau mengetiknya di ponsel.",
      "Periksa pembacaan entropinya — 80 bit atau lebih itu sangat bagus untuk akun mana pun.",
      "Klik tombol salin dan tempel hasilnya langsung ke formulir pendaftaran atau ganti kata sandi.",
    ],
    faqs: [
      {
        q: "Mana yang lebih penting: panjang kata sandi atau kerumitannya?",
        a: "Panjang. Entropi tumbuh dengan setiap karakter tambahan — kira-kira log2 dari ukuran pool karakter per karakter. Kata sandi acak 16 karakter dari pool 70 karakter punya sekitar 98 bit entropi, jauh lebih dari kata sandi pendek yang dipenuhi semua jenis simbol. Passphrase 5+ kata acak juga mengalahkan kebanyakan kata sandi 8 karakter.",
      },
      {
        q: "Apakah kata sandi ini benar-benar acak?",
        a: "Ya. Mereka datang dari crypto.getRandomValues, sumber acak kriptografis aman browser Anda — bukan Math.random(). Opsi kecualikan-karakter-mirip hanya membuang karakter yang mirip seperti l, I, 1, O, dan 0; ia tidak pernah melemahkan keacakan sisanya.",
      },
      {
        q: "Bisakah Anda memulihkan kata sandi yang saya buat di sini?",
        a: "Tidak. Pembuatan terjadi sepenuhnya di memori browser Anda. Tidak ada yang diunggah, dicatat, atau disimpan — muat ulang halaman dan kata sandinya lenyap selamanya, jadi simpan segera di password manager.",
      },
    ],
  },
  "password-strength": {
    name: "Pemeriksa Kekuatan Kata Sandi",
    tagline:
      "Lihat seberapa kuat kata sandi benar-benar: penilaian zxcvbn, estimasi waktu retak yang realistis, dan perbaikan konkret — semuanya dihitung lokal, tidak pernah diunggah.",
    intro: [
      "Kebanyakan meter hanya menghitung kelas karakter. Pemeriksa ini menjalankan algoritma zxcvbn — dibangun dari data kebocoran nyata dan analisis pola — yang menangkap jalan keyboard, potongan berulang, tanggal, substitusi l33t, dan kata sandi yang muncul di kebocoran yang dikenal.",
      "Anda mendapat skor 0–4, estimasi waktu retak di bawah tiga skenario serangan, dan saran spesifik. Semuanya dihitung di browser Anda: kata sandi yang Anda ketik tidak pernah meninggalkan perangkat.",
    ],
    steps: [
      "Ketik atau tempel kata sandinya ke kotak — pakai Show jika ingin membacanya.",
      "Pantau meter skor bergerak dari Sangat lemah ke Sangat kuat saat Anda menyunting.",
      "Baca tabel waktu retak untuk memahami apa yang ditahannya: tebakan online yang dibatasi, serangan offline terhadap hash lambat, dan serangan offline terhadap hash cepat.",
      "Terapkan saran-sarannya — biasanya menambah sepasang kata acak adalah kemenangan tercepat.",
    ],
    faqs: [
      {
        q: "Apa arti tiga skenario waktu retak itu?",
        a: "Mereka memodelkan penyerang berbeda. Online yang dibatasi (100 tebakan/jam) adalah formulir login yang membatasi percobaan. Offline hash lambat mengasumsikan database yang di-hash dengan bcrypt dan diretak pada 10.000 tebakan per detik. Offline hash cepat mengasumsikan hash MD5/SHA-1 lemah atau tanpa salt yang diretak di GPU pada miliaran tebakan per detik — kasus terburuk untuk kata sandi yang dipakai ulang.",
      },
      {
        q: "Kenapa “Tr0ub4dor&3” dinilai buruk padahal terlihat kompleks?",
        a: "Karena substitusi seperti 0 untuk o dan 3 untuk e adalah hal pertama yang dicoba kamus retak. zxcvbn memodelkan aturan l33t ini, jadi ia menilai pola dasarnya — “troubador” plus dekorasi — alih-alih tertipu simbolnya.",
      },
      {
        q: "Apakah kata sandi saya dikirim ke mana pun?",
        a: "Tidak. Pustaka dan kamus zxcvbn dimuat ke browser Anda dan setiap perhitungan berjalan lokal. Tidak ada permintaan jaringan yang membawa masukan Anda.",
      },
    ],
  },
  "email-validator": {
    name: "Validator Email",
    tagline:
      "Periksa format email secara lokal dan verifikasi domainnya bisa menerima surat dengan pencarian MX langsung, plus deteksi typo — gratis, instan, tanpa daftar.",
    intro: [
      "Alamat yang valid secara sintaks tetap bisa bounce jika domainnya tidak punya server surat. Validator ini memeriksa formatnya lebih dulu sepenuhnya di browser Anda — panjang, karakter, posisi titik, dan label domain — lalu mengquery DNS langsung lewat HTTPS untuk melihat apakah domain benar-benar mempublikasikan record MX (mail exchange).",
      "Ia juga membandingkan domain dengan daftar penyedia paling umum dan menandai typo yang mungkin seperti gmial.com. Hanya bagian domain yang dikirim lewat jaringan; bagian sebelum @ tidak pernah keluar dari browser Anda.",
    ],
    steps: [
      "Ketik atau tempel alamatnya ke kolom dan tekan Validasi.",
      "Baca baris Sintaks: ia menangkap local part yang cacat, titik ganda, dan domain tidak valid tanpa panggilan jaringan apa pun.",
      "Periksa baris Server surat sebagai bukti bahwa domain bisa menerima email — beberapa domain tanpa MX tetap menerima surat lewat record A, dan alat ini mencatatnya juga.",
      "Jika typo disarankan, perbaiki domainnya dan validasi lagi.",
    ],
    faqs: [
      {
        q: "Apakah ini memeriksa apakah mailbox-nya sendiri ada?",
        a: "Tidak. Server surat umumnya tidak membocorkan apakah mailbox tertentu nyata (dan memeriksa mereka itu mengganggu). Alat ini memverifikasi formatnya dan bahwa domain dikonfigurasi untuk menerima surat, yang memang dibutuhkan kebanyakan alur verifikasi. Mailbox penuh atau ditinggalkan tetap bisa bounce.",
      },
      {
        q: "Tepatnya apa yang dikirim lewat jaringan?",
        a: "Hanya domainnya — bagian setelah @ — dalam satu query DNS ke resolver publik Google (dns.google) lewat HTTPS. Alamat lengkap dan segala sesuatu sebelum @ tetap di browser Anda.",
      },
      {
        q: "Kenapa alamat yang valid gagal pemeriksaan MX?",
        a: "Beberapa domain tidak mempublikasikan record MX dan mengandalkan record A mereka (routing implisit); alat ini memberi tahu saat itu kasusnya. Yang lain mempublikasikan null MX, secara eksplisit berkata “tidak ada surat di sini”. Domain korporasi atau yang baru dibuat juga bisa belum ada di cache resolver publik untuk sementara — coba lagi semenit kemudian.",
      },
    ],
  },
  "dns-lookup": {
    name: "DNS Lookup",
    tagline:
      "Cari record A, AAAA, MX, TXT, NS, dan CNAME untuk domain mana pun lewat DNS-over-HTTPS dalam tabel bersih — tanpa terminal atau perintah dig.",
    intro: [
      "Record DNS memberi tahu ke mana sebuah domain menunjuk, bagaimana ia mengirim email, dan bagaimana ia membuktikan kepemilikannya. Alat ini me-resolve tipe record apa pun lewat DNS-over-HTTPS (DoH) — kanal terenkripsi yang sama yang dipakai browser modern — dan menyusun jawabannya dalam tabel yang terbaca.",
      "Ia berjalan di resolver publik gratis Google, jadi tidak ada yang perlu dipasang dan tanpa API key. Praktis untuk memeriksa propagasi setelah perubahan, memverifikasi record TXT SPF/DKIM/DMARC, atau men-debug kenapa surat ke sebuah domain bounce.",
    ],
    steps: [
      "Ketik domainnya (example.com, tanpa http://) dan pilih tipe record.",
      "Tekan Cari; query-nya lewat DoH terenkripsi ke resolver publik.",
      "Baca tabelnya: setiap baris menampilkan tipe record, TTL, dan nilainya — IP untuk A/AAAA, atau server surat dengan prioritas untuk MX.",
      "Ganti tipe record untuk melihat gambaran penuh: MX untuk surat, TXT untuk SPF/DKIM, NS untuk siapa yang menjalankan DNS.",
    ],
    faqs: [
      {
        q: "Untuk apa tipe record utama itu?",
        a: "A memetakan nama ke alamat IPv4, AAAA ke IPv6. MX mencantumkan server surat dan prioritasnya. TXT menampung teks bebas — biasanya kebijakan SPF, DKIM, dan DMARC. NS menamai nameserver otoritatif. CNAME adalah alias yang menunjuk satu nama ke nama lain. Masing-masing menjawab pertanyaan berbeda tentang domain yang sama.",
      },
      {
        q: "Apa yang dikirim lewat jaringan?",
        a: "Nama domain dan tipe record dalam satu query DNS-over-HTTPS ke dns.google, terenkripsi seperti request HTTPS mana pun. Tidak ada apa pun tentang Anda yang ditambahkan, dan tidak ada API key atau akun yang terlibat.",
      },
      {
        q: "Kenapa kadang saya melihat baris CNAME saat saya meminta A?",
        a: "Resolver menyertakan rantai penuhnya: jika www.example.com adalah CNAME ke example.com, query A mengembalikan aliasnya plus record A finalnya. Baris ekstra menunjukkan persis bagaimana namanya ter-resolve.",
      },
    ],
  },
  "ip-lookup": {
    name: "IP Lookup",
    tagline:
      "Temukan negara, kota, ISP, dan ASN alamat IP mana pun dalam hitungan detik — atau periksa IP Anda sendiri — dengan API gratis tanpa kunci, langsung di browser Anda.",
    intro: [
      "Setiap perangkat di internet membawa alamat IP yang menunjukkan di mana ia berada dan siapa yang merutekannya. Masukkan alamat IPv4 atau IPv6 apa pun untuk melihat negara dan wilayahnya, kota, operator jaringan (ISP), organisasi, dan autonomous system number (ASN), plus zona waktu dan koordinat perkiraan.",
      "Datanya datang dari database ipwho.is yang gratis dan tanpa kunci lewat HTTPS; tidak ada pendaftaran dan tanpa kuota untuk diawasi. Satu ketukan memeriksa koneksi Anda sendiri, yang berguna untuk memastikan VPN benar-benar mengubah lokasi terlihat Anda.",
    ],
    steps: [
      "Tempel IP ke kolom, atau tekan Pakai IP saya untuk memeriksa koneksi Anda sendiri.",
      "Tekan Cari; alamatnya dikirim ke API ipwho.is lewat HTTPS.",
      "Baca hasilnya: lokasi lebih dulu, lalu detail jaringan seperti ISP, organisasi, dan ASN.",
      "Bandingkan hasil IP Anda sebelum dan sesudah berganti server VPN untuk memastikan perubahannya berlaku.",
    ],
    faqs: [
      {
        q: "Seberapa akurat lokasinya?",
        a: "Negara dan wilayah biasanya benar; kota dan koordinat adalah estimasi berdasarkan tempat ISP mendaftarkan blok alamatnya, jadi alamat mobile dan VPN bisa meleset banyak kilometer. Perlakukan hasilnya sebagai informasi level jaringan, bukan alamat seseorang.",
      },
      {
        q: "Apa yang diceritakan ASN kepada saya?",
        a: "Autonomous system number mengidentifikasi operator jaringan yang memiliki blok IP — ISP, perusahaan hosting, atau korporasi besar. Dua IP dengan ASN sama hampir pasti milik jaringan yang sama, yang berguna untuk menemukan rentang hosting dan laporan penyalahgunaan.",
      },
      {
        q: "Apa yang dikirim lewat jaringan?",
        a: "Hanya IP yang ingin Anda cari, dalam satu request HTTPS ke ipwho.is. Mencari IP Anda sendiri tentu membocorkan alamat Anda ke API itu — sama seperti yang dilihat layanan geolokasi mana pun.",
      },
    ],
  },
  "whois-lookup": {
    name: "WHOIS Lookup",
    tagline:
      "Periksa data pendaftaran domain lewat RDAP — registrar, tanggal pembuatan dan kedaluwarsa, kode status, dan nameserver — dengan catatan jelas tentang cakupan TLD.",
    intro: [
      "Record pendaftaran menjawab pertanyaan yang disembunyikan etalase sebuah domain: siapa yang menjalankannya, kapan dibuat, dan kapan kedaluwarsa. Alat ini mengquery protokol RDAP modern — penerus resmi WHOIS port-43 — lewat HTTPS dan menata responsnya menjadi tanggal, registrar, kode status, dan nameserver.",
      "rdap.org merutekan query Anda ke server RDAP resmi registry-nya. Cakupannya luas tetapi tidak universal: kebanyakan registry kode negara (.cn, .de, .br…) masih belum punya server RDAP publik, dan alat ini memberi tahu dengan jelas saat sebuah TLD tidak tercakup alih-alih menampilkan field kosong.",
    ],
    steps: [
      "Masukkan domain yang Anda teliti (example.com) dan tekan Cari.",
      "Baca tanggalnya lebih dulu: pembuatan dan kedaluwarsa membocorkan usia domain dan kebiasaan perpanjangnya.",
      "Periksa registrar dan kode statusnya — clientTransferProhibited berarti transfer terkunci, redemptionPeriod menandakan domain mungkin segera lepas.",
      "Pindai nameserver-nya untuk melihat siapa yang benar-benar mengoperasikan DNS domain itu.",
    ],
    faqs: [
      {
        q: "Kenapa RDAP alih-alih WHOIS klasik?",
        a: "RDAP mengembalikan JSON terstruktur lewat HTTPS alih-alih teks tak terstruktur lewat port kuno. Ia mendukung autentikasi, rate limiting, dan domain terinternasionalisasi, dan ICANN mewajibkannya untuk semua registry gTLD. Alat ini mengikuti redirect rdap.org ke registry mana pun yang menjalankan TLD-nya.",
      },
      {
        q: "Kenapa beberapa TLD gagal dengan “tidak tercakup”?",
        a: "Setiap registry memilih sendiri apakah menjalankan layanan RDAP publik. Hampir semua TLD generik (.com, .net, .app…) menjalankannya, tetapi banyak kode negara — .cn, .de, .br, di antara lainnya — masih belum. Saat rdap.org tidak menemukan server untuk sebuah TLD, alat ini menampilkan penjelasan yang jelas alih-alih hasil kosong.",
      },
      {
        q: "Apa yang dikirim lewat jaringan?",
        a: "Hanya nama domainnya, dalam satu request HTTPS ke rdap.org, yang bisa me-redirect ke endpoint RDAP resmi registry-nya. Data pendaftaran itu publik secara desain; tidak ada apa pun yang pribadi tentang Anda yang dikirim.",
      },
    ],
  },
  "random-number": {
    name: "Generator Angka Acak",
    tagline:
      "Hasilkan angka acak sungguhan dari rentang mana pun — tunggal, batch, atau undian unik bergaya lotere — memakai RNG kriptografis browser Anda.",
    intro: [
      "Math.random() cukup untuk game tetapi bias dan bisa diprediksi. Generator ini mengambil dari crypto.getRandomValues, sumber acak kriptografis browser Anda, dengan rejection sampling yang menghapus bias modulo — setiap angka dalam rentang sama mungkinnya.",
      "Ambil satu angka di antara dua batas, satu batch penuh, atau undian unik untuk undian berhadiah dan giveaway; urutkan hasil menaik atau pertahankan urutan undian. Alat ini juga menampilkan total entropi undian dalam bit, jadi Anda bisa menunjukkan bahwa giveaway itu adil.",
    ],
    steps: [
      "Atur minimum dan maksimumnya (keduanya inklusif, angka negatif boleh).",
      "Pilih berapa angka yang Anda butuhkan dan nyalakan undian unik jika pengulangan akan merusak undian.",
      "Aktifkan urutkan menaik untuk hasil terurut, atau biarkan mati untuk mempertahankan urutan undian.",
      "Salin daftarnya langsung ke spreadsheet atau pengumuman undian Anda.",
    ],
    faqs: [
      {
        q: "Apakah ini cocok untuk giveaway dan lotere?",
        a: "Ya. Angkanya datang dari RNG kriptografis browser dengan langkah rejection-sampling yang tidak bias, jadi setiap nilai dalam rentang punya probabilitas sama. Pembacaan entropinya menunjukkan persis berapa banyak keacakan yang masuk ke undian.",
      },
      {
        q: "Apa yang dilakukan “tanpa duplikat” saat rentangnya kecil?",
        a: "Ia beralih ke pengambilan tanpa pengembalian — seperti mengambil bola bernomor dari mangkuk. Jika Anda meminta lebih banyak angka unik daripada isi rentangnya, alat ini menjelaskan konfliknya alih-alih mengembalikan hasil yang bias.",
      },
      {
        q: "Apakah angkanya disimpan di mana pun?",
        a: "Tidak. Semuanya dihitung di memori browser Anda dari crypto.getRandomValues; memuat ulang halaman menghapus hasilnya, dan tidak ada yang pernah diunggah.",
      },
    ],
  },
  "totp-generator": {
    name: "Generator TOTP",
    tagline:
      "Hasilkan kode 2FA secara offline dari secret TOTP mana pun — RFC 6238, 6 atau 8 digit, hitung mundur 30 detik langsung. Secret Anda tidak pernah keluar dari browser.",
    intro: [
      "Kode authenticator tidak butuh aplikasi di ponsel Anda. Tempel secret base32 (atau satu tautan setup otpauth:// utuh dari authenticator lama Anda) dan alat ini menghitung kode bergilir 6 atau 8 digit yang sama seperti authenticator RFC 6238 mana pun, dengan hitung mundur langsung menuju kode berikutnya.",
      "Semuanya dihitung lokal dengan HMAC milik WebCrypto — tanpa panggilan jaringan sama sekali. Secretnya hanya tinggal di memori browser, jadi ponsel yang hilang tidak pernah berarti kehilangan faktor kedua.",
    ],
    steps: [
      "Salin secret base32 dari halaman setup 2FA layanannya (atau tempel tautan otpauth://-nya).",
      "Cocokkan pengaturan yang ditampilkan layanannya: 6 atau 8 digit, periode 30 atau 60 detik, SHA-1 kecuali diberi tahu lain.",
      "Ketik kode saat ini ke layanannya sebelum hitung mundur berakhir — atau salin dengan satu klik.",
      "Biarkan tab terbuka untuk login berulang; kodenya menyegarkan sendiri setiap periode.",
    ],
    faqs: [
      {
        q: "Apakah authenticator offline lebih aman daripada kode SMS?",
        a: "Ya, dengan dua cara. Kode TOTP dihitung di perangkat Anda dan tidak pernah lewat jaringan telepon, jadi tidak ada yang bisa dicegat penyerang SIM-swap. Mereka juga kedaluwarsa setiap 30 detik dan menuntut kepemilikan secret itu sendiri, yang tidak pernah muncul di pesan mana pun.",
      },
      {
        q: "Di mana secret saya disimpan?",
        a: "Tidak di mana pun. Ia ditahan dalam variabel di memori tab ini dan dipakai WebCrypto untuk menandatangani penghitung waktu. Tidak ada yang ditulis ke localStorage, cookie, atau server mana pun — tutup tab dan lenyap.",
      },
      {
        q: "Kenapa kode saya tidak cocok?",
        a: "Penyebab paling umum: algoritma salah (kebanyakan layanan memakai SHA-1), periode salah, atau jam perangkat bergeser lebih dari beberapa detik. Periksa ketiga pilihan itu terhadap halaman setup layanannya, dan sinkronkan jam sistem Anda.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* UNIT CONVERTERS (10)                                                */
  /* ------------------------------------------------------------------ */
  "length-converter": {
    name: "Konverter Panjang",
    tagline:
      "Konversikan panjang dan jarak secara instan: meter, kaki, inci, mil, sentimeter, dan lainnya — langsung di browser Anda.",
    intro: [
      "Konversikan antara satuan panjang metrik dan imperial tanpa mengetik di kotak pencarian. Masukkan angka apa pun dan lihat meter, kaki, inci, mil, dan semua satuan lainnya sekaligus.",
      "Berguna untuk proyek DIY, perencanaan perjalanan, gambar teknik, dan PR sekolah — di mana pun konversi cepat yang tepat mengalahkan menebak.",
      "Mendukung 10 satuan — kilometer, meter, sentimeter, milimeter, mikrometer, mil, dan lainnya. Semuanya dihitung di browser Anda, bekerja offline, dan data Anda tidak pernah menyentuh server.",
    ],
    steps: [
      "Ketik angka yang ingin dikonversi.",
      "Pilih satuan asal dan satuan tujuannya.",
      "Hasilnya diperbarui saat Anda mengetik — lihat tabel di bawah untuk semua satuan sekaligus, atau salin hasilnya.",
    ],
    faqs: [
      {
        q: "Berapa cm dalam satu inci?",
        a: "Satu inci tepat 2,54 sentimeter, berdasarkan kesepakatan internasional sejak 1959. Masukkan 1 in → cm di atas untuk memverifikasi.",
      },
      {
        q: "Apakah konverter ini gratis?",
        a: "Ya — berjalan sepenuhnya di browser Anda. Tidak ada batas, tidak ada iklan di hasil, dan tanpa pendaftaran.",
      },
      {
        q: "Seberapa akurat konversinya?",
        a: "Faktor konversi mengikuti definisi standar internasional (SI dan NIST). Hasil ditampilkan hingga 8 digit signifikan.",
      },
    ],
  },
  "weight-converter": {
    name: "Konverter Berat",
    tagline:
      "Konversikan kilogram, pound, ounce, stone, dan gram secara instan — gratis, privat, dan bekerja offline.",
    intro: [
      "Berpindah antara satuan berat metrik dan imperial di satu tempat: kilogram, pound, ounce, stone, karat, dan lainnya, semuanya dihitung ulang saat Anda mengetik.",
      "Praktis untuk memasak dengan resep asing, memeriksa batas bagasi, catatan latihan gym, dan perhitungan pengiriman.",
      "Mendukung 8 satuan — ton metrik, kilogram, gram, miligram, pound, ounce, dan lainnya. Semuanya dihitung di browser Anda, bekerja offline, dan data Anda tidak pernah menyentuh server.",
    ],
    steps: [
      "Ketik angka yang ingin dikonversi.",
      "Pilih satuan asal dan satuan tujuannya.",
      "Hasilnya diperbarui saat Anda mengetik — lihat tabel di bawah untuk semua satuan sekaligus, atau salin hasilnya.",
    ],
    faqs: [
      {
        q: "Berapa pound dalam 1 kg?",
        a: "Satu kilogram adalah 2,20462 pound (1 lb = 0,45359237 kg secara persis). Masukkan 1 kg → lb di atas untuk melihatnya.",
      },
      {
        q: "Berapa satu stone dalam kg?",
        a: "Satu stone (dipakai di Inggris untuk berat badan) adalah 6,35029318 kilogram — tepat 14 pound.",
      },
      {
        q: "Apakah konverter ini gratis?",
        a: "Ya — berjalan sepenuhnya di browser Anda. Tidak ada batas, tidak ada iklan di hasil, dan tanpa pendaftaran.",
      },
      {
        q: "Seberapa akurat konversinya?",
        a: "Faktor konversi mengikuti definisi standar internasional (SI dan NIST). Hasil ditampilkan hingga 8 digit signifikan.",
      },
    ],
  },
  "temperature-converter": {
    name: "Konverter Suhu",
    tagline:
      "Celsius ke Fahrenheit dan Kelvin, seketika. Hasil langsung plus titik acuan pembekuan dan pendidihan.",
    intro: [
      "Konversikan Celsius, Fahrenheit, dan Kelvin dalam satu langkah. Berbeda dari satuan linear, skala suhu butuh rumus dengan offset — alat ini menerapkannya dengan benar, termasuk nilai di bawah nol.",
      "Cocok untuk resep dengan pengaturan oven asing, laporan cuaca, pekerjaan lab, dan spesifikasi HVAC.",
      "Mendukung 3 satuan — Celsius, Fahrenheit, Kelvin. Semuanya dihitung di browser Anda, bekerja offline, dan data Anda tidak pernah menyentuh server.",
    ],
    steps: [
      "Ketik angka yang ingin dikonversi.",
      "Pilih satuan asal dan satuan tujuannya.",
      "Hasilnya diperbarui saat Anda mengetik — lihat tabel di bawah untuk semua satuan sekaligus, atau salin hasilnya.",
    ],
    faqs: [
      {
        q: "Bagaimana mengonversi Celsius ke Fahrenheit?",
        a: "Kalikan 9, bagi 5, lalu tambah 32: °F = °C × 9⁄5 + 32. Contohnya, 20 °C = 68 °F. Alat ini melakukannya untuk Anda dan menampilkan Kelvin juga.",
      },
      {
        q: "Pada suhu berapa Fahrenheit dan Celsius bernilai sama?",
        a: "Pada −40 derajat: −40 °C = −40 °F. Masukkan −40 dan tukarkan satuannya untuk melihatnya.",
      },
      {
        q: "Apakah konverter ini gratis?",
        a: "Ya — berjalan sepenuhnya di browser Anda. Tidak ada batas, tidak ada iklan di hasil, dan tanpa pendaftaran.",
      },
      {
        q: "Seberapa akurat konversinya?",
        a: "Faktor konversi mengikuti definisi standar internasional (SI dan NIST). Hasil ditampilkan hingga 8 digit signifikan.",
      },
    ],
  },
  "data-converter": {
    name: "Konverter Ukuran Data",
    tagline:
      "Konversikan byte, KB, MB, GB, dan TB — konvensi desimal (1000) dan biner (1024) berdampingan.",
    intro: [
      "Konversikan satuan penyimpanan digital dengan pembeda desimal/biner yang dibuat eksplisit: KB berarti 1000 byte, KiB berarti 1024 byte. Kebanyakan kebingungan “kenapa disk saya lebih kecil dari yang diiklankan” berasal dari mencampur keduanya.",
      "Gunakan untuk memeriksa ukuran unduhan, pemakaian disk, spesifikasi memori, dan batas bandwidth hosting.",
      "Mendukung 10 satuan — bit, byte, kilobyte (1000 B), kibibyte (1024 B), megabyte (1000 KB), mebibyte (1024 KiB), dan lainnya. Semuanya dihitung di browser Anda, bekerja offline, dan data Anda tidak pernah menyentuh server.",
    ],
    steps: [
      "Ketik angka yang ingin dikonversi.",
      "Pilih satuan asal dan satuan tujuannya.",
      "Hasilnya diperbarui saat Anda mengetik — lihat tabel di bawah untuk semua satuan sekaligus, atau salin hasilnya.",
    ],
    faqs: [
      {
        q: "Kenapa drive 1 TB hanya menampilkan ~931 GB?",
        a: "Pembuat drive memakai satuan desimal (1 TB = 1.000.000.000.000 byte) sementara sistem operasi sering menampilkan satuan biner (1 TiB = 1.099.511.627.776 byte). 1 TB = 0,909 TiB ≈ 931 GiB — tidak ada yang hilang.",
      },
      {
        q: "Apakah konverter ini gratis?",
        a: "Ya — berjalan sepenuhnya di browser Anda. Tidak ada batas, tidak ada iklan di hasil, dan tanpa pendaftaran.",
      },
      {
        q: "Seberapa akurat konversinya?",
        a: "Faktor konversi mengikuti definisi standar internasional (SI dan NIST). Hasil ditampilkan hingga 8 digit signifikan.",
      },
    ],
  },
  "speed-converter": {
    name: "Konverter Kecepatan",
    tagline:
      "km/jam, mph, knot, m/s, dan lainnya — konversikan pace lari, kecepatan angin, dan kecepatan kendaraan seketika.",
    intro: [
      "Konversikan satuan kecepatan yang dipakai berbagai negara dan olahraga: kilometer per jam, mil per jam, knot untuk pelayaran dan penerbangan, meter per detik untuk fisika.",
      "Berguna saat menyewa mobil di luar negeri, membaca prakiraan maritim, atau membandingkan pace treadmill dan outdoor.",
      "Mendukung 6 satuan — meter per detik, kilometer per jam, mil per jam, kaki per detik, knot, Mach (permukaan laut), dan lainnya. Semuanya dihitung di browser Anda, bekerja offline, dan data Anda tidak pernah menyentuh server.",
    ],
    steps: [
      "Ketik angka yang ingin dikonversi.",
      "Pilih satuan asal dan satuan tujuannya.",
      "Hasilnya diperbarui saat Anda mengetik — lihat tabel di bawah untuk semua satuan sekaligus, atau salin hasilnya.",
    ],
    faqs: [
      {
        q: "Berapa mph dari 100 km/jam?",
        a: "100 km/jam = 62,14 mph. Faktor persisnya 1 mph = 1,609344 km/jam.",
      },
      {
        q: "Apakah konverter ini gratis?",
        a: "Ya — berjalan sepenuhnya di browser Anda. Tidak ada batas, tidak ada iklan di hasil, dan tanpa pendaftaran.",
      },
      {
        q: "Seberapa akurat konversinya?",
        a: "Faktor konversi mengikuti definisi standar internasional (SI dan NIST). Hasil ditampilkan hingga 8 digit signifikan.",
      },
    ],
  },
  "volume-converter": {
    name: "Konverter Volume",
    tagline:
      "Liter, galon, cangkir, mililiter, dan meter kubik — satuan AS dan Inggris dilabeli dengan jelas.",
    intro: [
      "Konversikan satuan volume dapur dan teknik dengan pembeda AS/Inggris yang dijelaskan: satu galon AS adalah 3,785 L, satu galon Inggris (imperial) 4,546 L — terpisah 20%, jadi mencampurnya merusak resep.",
      "Dirancang untuk memasak, brewing, takaran akuarium, angka bahan bakar, dan estimasi beton.",
      "Mendukung 10 satuan — meter kubik, liter, mililiter, galon (AS), galon (Inggris), quart (AS), dan lainnya. Semuanya dihitung di browser Anda, bekerja offline, dan data Anda tidak pernah menyentuh server.",
    ],
    steps: [
      "Ketik angka yang ingin dikonversi.",
      "Pilih satuan asal dan satuan tujuannya.",
      "Hasilnya diperbarui saat Anda mengetik — lihat tabel di bawah untuk semua satuan sekaligus, atau salin hasilnya.",
    ],
    faqs: [
      {
        q: "Apakah galon AS sama dengan galon Inggris?",
        a: "Tidak. 1 galon AS = 3,785 L, 1 galon Inggris = 4,546 L. Konverter mencantumkannya terpisah agar Anda selalu memilih yang benar.",
      },
      {
        q: "Apakah konverter ini gratis?",
        a: "Ya — berjalan sepenuhnya di browser Anda. Tidak ada batas, tidak ada iklan di hasil, dan tanpa pendaftaran.",
      },
      {
        q: "Seberapa akurat konversinya?",
        a: "Faktor konversi mengikuti definisi standar internasional (SI dan NIST). Hasil ditampilkan hingga 8 digit signifikan.",
      },
    ],
  },
  "area-converter": {
    name: "Konverter Luas",
    tagline:
      "Meter persegi, kaki persegi, acre, hektare, dan lainnya — untuk properti, lahan, dan lantai.",
    intro: [
      "Konversikan satuan lahan dan permukaan antar sistem: meter persegi, kaki persegi, acre, hektare, dan mil persegi, semuanya ditampilkan sekaligus untuk masukan apa pun.",
      "Pemakaian khas: membandingkan listing properti dari negara berbeda, merencanakan kebun dan lahan tani, mengestimasi lantai atau cakupan cat.",
      "Mendukung 9 satuan — kilometer persegi, hektare, meter persegi, sentimeter persegi, mil persegi, acre, dan lainnya. Semuanya dihitung di browser Anda, bekerja offline, dan data Anda tidak pernah menyentuh server.",
    ],
    steps: [
      "Ketik angka yang ingin dikonversi.",
      "Pilih satuan asal dan satuan tujuannya.",
      "Hasilnya diperbarui saat Anda mengetik — lihat tabel di bawah untuk semua satuan sekaligus, atau salin hasilnya.",
    ],
    faqs: [
      {
        q: "Seberapa besar satu acre dalam meter persegi?",
        a: "Satu acre = 4.046,86 m², atau sekitar 43.560 kaki persegi. Satu hektare adalah 2,471 acre.",
      },
      {
        q: "Apakah konverter ini gratis?",
        a: "Ya — berjalan sepenuhnya di browser Anda. Tidak ada batas, tidak ada iklan di hasil, dan tanpa pendaftaran.",
      },
      {
        q: "Seberapa akurat konversinya?",
        a: "Faktor konversi mengikuti definisi standar internasional (SI dan NIST). Hasil ditampilkan hingga 8 digit signifikan.",
      },
    ],
  },
  "time-converter": {
    name: "Konverter Satuan Waktu",
    tagline:
      "Detik, menit, jam, hari, pekan, bulan, dan tahun — dengan catatan bulan/tahun yang dijelaskan.",
    intro: [
      "Konversikan durasi antara satuan waktu. Karena bulan dan tahun kalender panjangnya bervariasi, alat ini memakai rata-rata konvensional (30,44 hari per bulan, 365,2425 hari per tahun) dan mengatakannya — tanpa pembulatan senyap.",
      "Berguna untuk estimasi proyek, perbandingan harga langganan, pewaktuan ilmiah, dan hitung mundur.",
      "Mendukung 8 satuan — milidetik, detik, menit, jam, hari, pekan, dan lainnya. Semuanya dihitung di browser Anda, bekerja offline, dan data Anda tidak pernah menyentuh server.",
    ],
    steps: [
      "Ketik angka yang ingin dikonversi.",
      "Pilih satuan asal dan satuan tujuannya.",
      "Hasilnya diperbarui saat Anda mengetik — lihat tabel di bawah untuk semua satuan sekaligus, atau salin hasilnya.",
    ],
    faqs: [
      {
        q: "Kenapa satu bulan di sini 30,44 hari?",
        a: "Bulan kalender berkisar 28 hingga 31 hari, jadi aritmetika durasi memakai rata-rata sepanjang siklus Gregorian: 30,4369 hari. Untuk aritmetika tanggal kalender yang persis, gunakan Kalkulator Tanggal sebagai gantinya.",
      },
      {
        q: "Apakah konverter ini gratis?",
        a: "Ya — berjalan sepenuhnya di browser Anda. Tidak ada batas, tidak ada iklan di hasil, dan tanpa pendaftaran.",
      },
      {
        q: "Seberapa akurat konversinya?",
        a: "Faktor konversi mengikuti definisi standar internasional (SI dan NIST). Hasil ditampilkan hingga 8 digit signifikan.",
      },
    ],
  },
  "pressure-converter": {
    name: "Konverter Tekanan",
    tagline:
      "bar, psi, pascal, atmosfer, mmHg, dan lainnya — untuk ban, selam, cuaca, dan HVAC.",
    intro: [
      "Konversikan satuan tekanan yang dipakai berbagai industri: psi untuk manometer ban, bar untuk spesifikasi Eropa, pascal dan kPa di teknik, mmHg di kedokteran dan meteorologi.",
      "Semua faktor persis menurut definisi di tempat standar mendefinisikannya secara persis (misalnya 1 atm = 101.325 Pa).",
      "Mendukung 7 satuan — pascal, kilopascal, megapascal, bar, atmosfer, milimeter merkuri, dan lainnya. Semuanya dihitung di browser Anda, bekerja offline, dan data Anda tidak pernah menyentuh server.",
    ],
    steps: [
      "Ketik angka yang ingin dikonversi.",
      "Pilih satuan asal dan satuan tujuannya.",
      "Hasilnya diperbarui saat Anda mengetik — lihat tabel di bawah untuk semua satuan sekaligus, atau salin hasilnya.",
    ],
    faqs: [
      {
        q: "Bagaimana mengonversi psi ke bar?",
        a: "1 bar = 14,5038 psi, jadi bagi psi dengan 14,5038. Ban mobil tipikal pada 32 psi kira-kira 2,21 bar.",
      },
      {
        q: "Apakah konverter ini gratis?",
        a: "Ya — berjalan sepenuhnya di browser Anda. Tidak ada batas, tidak ada iklan di hasil, dan tanpa pendaftaran.",
      },
      {
        q: "Seberapa akurat konversinya?",
        a: "Faktor konversi mengikuti definisi standar internasional (SI dan NIST). Hasil ditampilkan hingga 8 digit signifikan.",
      },
    ],
  },
  "energy-converter": {
    name: "Konverter Energi",
    tagline:
      "Kalori, kilojoule, joule, kWh, Wh, dan BTU — label makanan, tagihan listrik, dan fisika dalam satu tempat.",
    intro: [
      "Konversikan satuan energi lintas konteks: kalori makanan (kcal) vs kalori kimia (cal), listrik dalam kWh, pemanasan dalam BTU, fisika dalam joule.",
      "Pembedaan jelas antara cal dan kcal — kekeliruan di balik banyak salah paham label diet — dengan faktor standar yang persis.",
      "Mendukung 7 satuan — joule, kilojoule, kalori, kilokalori, watt-jam, kilowatt-jam, dan lainnya. Semuanya dihitung di browser Anda, bekerja offline, dan data Anda tidak pernah menyentuh server.",
    ],
    steps: [
      "Ketik angka yang ingin dikonversi.",
      "Pilih satuan asal dan satuan tujuannya.",
      "Hasilnya diperbarui saat Anda mengetik — lihat tabel di bawah untuk semua satuan sekaligus, atau salin hasilnya.",
    ],
    faqs: [
      {
        q: "Apakah kalori sama dengan kilokalori?",
        a: "Tidak. 1 kcal = 1000 cal. Label makanan yang menulis 'Calorie' (C besar) sebenarnya berarti kilokalori. Masukkan 1 kcal → cal untuk memverifikasi.",
      },
      {
        q: "Berapa kWh dari 1 BTU?",
        a: "1 BTU = 0,000293071 kWh. AC 10.000 BTU yang menyala satu jam memakai sekitar 2,93 kWh.",
      },
      {
        q: "Apakah konverter ini gratis?",
        a: "Ya — berjalan sepenuhnya di browser Anda. Tidak ada batas, tidak ada iklan di hasil, dan tanpa pendaftaran.",
      },
      {
        q: "Seberapa akurat konversinya?",
        a: "Faktor konversi mengikuti definisi standar internasional (SI dan NIST). Hasil ditampilkan hingga 8 digit signifikan.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* CALCULATORS & EVERYDAY UTILITIES (26)                               */
  /* ------------------------------------------------------------------ */
  "currency-converter": {
    name: "Konverter Mata Uang",
    tagline:
      "Konversikan 160+ mata uang dunia dengan kurs mid-market terbaru — dimuat sekali online, dihitung dan di-cache secara privat di browser Anda.",
    intro: [
      "Kurs diambil sekali dari layanan open.er-api.com yang gratis dan tanpa kunci, lalu di-cache di perangkat Anda selama satu jam, jadi konversi berulang instan dan bekerja offline. Aritmetika yang mengubah nominal Anda menjadi mata uang lain terjadi lokal di browser Anda.",
      "Ketik nominal, pilih dua mata uang dari daftar 160+ yang bisa dicari, dan baca hasilnya plus baris kurs terkini. Nominal yang Anda masukkan tidak pernah dikirim ke mana pun — hanya tabel kurs anonim yang diunduh.",
    ],
    steps: [
      "Masukkan nominal yang ingin dikonversi.",
      "Pilih mata uang sumber dan tujuan — yang umum dicantumkan lebih dulu.",
      "Baca hasil konversinya dan kurs persisnya; pakai Segarkan kurs untuk data terbaru.",
    ],
    faqs: [
      {
        q: "Seberapa sering kurs diperbarui?",
        a: "Tabel open.er-api.com menyegarkan sekitar sekali per hari, dan alat ini meng-cache-nya di browser Anda selama satu jam sebelum mengambil ulang. Tekan “Segarkan kurs” kapan saja untuk langsung menarik tabel terbaru.",
      },
      {
        q: "Apakah memakai alat ini mengirim data saya ke internet?",
        a: "Tidak ada nominal yang pernah dikirim ke mana pun. Satu-satunya permintaan jaringan mengunduh tabel kurs publik anonim (berbasis USD) sekali per jam; aritmetika konversinya berjalan lokal di browser Anda dan bahkan bekerja offline dari cache.",
      },
      {
        q: "Apakah ini kurs yang akan diberikan bank saya?",
        a: "Ini kurs acuan mid-market — titik tengah antara harga beli dan jual yang diperdagangkan bank. Jaringan kartu dan bank biasanya menambah spread atau biaya 1–3% di atas angka ini.",
      },
    ],
  },
  "timezone-converter": {
    name: "Konverter Zona Waktu",
    tagline:
      "Bandingkan waktu di 21 kota besar dengan jam langsung dan tabel per jam — DST ditangani persis, semuanya berjalan di browser Anda.",
    intro: [
      "Pilih dua kota apa pun dari Los Angeles sampai Tokyo dan lihat kedua jam langsungnya berdampingan, selisih offset persis untuk hari ini, dan tabel perbandingan 24 baris yang menunjukkan tiap jam hari menjadi apa di kota lainnya — cara tercepat menemukan slot rapat lintas zona waktu.",
      "Konversinya memakai database zona waktu IANA bawaan browser Anda, jadi transisi daylight-saving jatuh pada menit yang benar tanpa panggilan jaringan.",
    ],
    steps: [
      "Pilih kota awalnya — jam lokal langsungnya muncul di bawahnya.",
      "Pilih kota tujuan; jam dan offset UTC diperbarui seketika.",
      "Pindai tabel per jam untuk menemukan waktu yang cocok untuk kedua pihak.",
      "Pakai tombol tukar untuk membalik kedua kota.",
    ],
    faqs: [
      {
        q: "Apakah konverter menangani daylight saving time?",
        a: "Ya. Offset dihitung dengan aturan zona waktu IANA milik browser untuk tanggal hari ini, jadi kota yang sedang DST menampilkan offset gesernya yang benar dan tabel jam mencerminkan jam nyata di kedua sisi.",
      },
      {
        q: "Kenapa tabel jam menampilkan tanggal berbeda di beberapa baris?",
        a: "Saat kota-kotanya jauh terpisah, tanggal kalender satu sisi berubah selama hari berjalan. Setiap baris menampilkan tanggal tujuan di sebelah waktunya agar Anda bisa menandai kapan, misalnya, 9:00 di Shanghai masih 21:00 malam sebelumnya di New York.",
      },
      {
        q: "Apakah alat ini butuh akses internet?",
        a: "Tidak. Waktu kota datang dari database zona waktu bawaan browser dan jam perangkat Anda — tidak ada yang diunduh dan tidak ada lokasi yang dibagikan.",
      },
    ],
  },
  "binary-converter": {
    name: "Konverter Biner",
    tagline:
      "Konversikan antara desimal, heksadesimal, oktal, dan biner dalam satu grid langsung — mendukung bilangan bulat seluas apa pun, dengan pengelompokan agar tetap terbaca.",
    intro: [
      "Ketik angka ke salah satu dari empat kolom — desimal, hex, oktal, atau biner — dan tiga lainnya diperbarui seketika. Nilai hex dikelompokkan tiap dua digit dan biner tiap empat, jadi pola bit panjang tetap terbaca.",
      "Konversi memakai aritmetika BigInt, artinya tidak ada plafon 32-bit atau 64-bit: tempel desimal 40 digit atau string hex 256-bit penuh dan setiap representasi tetap persis.",
    ],
    steps: [
      "Ketik atau tempel nilai ke kolom mana pun — desimal, hex, oktal, atau biner.",
      "Tiga basis lainnya diperbarui langsung saat Anda mengetik.",
      "Prefiks seperti 0x itu opsional; spasi pengelompokan diabaikan saat parsing.",
    ],
    faqs: [
      {
        q: "Seberapa besar angka yang bisa ditangani konverter ini?",
        a: "Bilangan bulat non-negatif seluas apa pun. Perhitungan memakai BigInt, jadi nilai heksadesimal 256-bit terkonversi persis — jauh melampaui batas 2^53 angka JavaScript normal.",
      },
      {
        q: "Kenapa masukan huruf hex saya ditandai tidak valid?",
        a: "Setiap basis hanya menerima digitnya sendiri: biner menerima 0–1, oktal 0–7, desimal 0–9, dan heksadesimal 0–9 plus a–f. Spasi atau simbol liar di dalam angka juga ditolak.",
      },
      {
        q: "Apakah angka negatif atau pecahan didukung?",
        a: "Tidak — grid ini mengonversi nilai bulat non-negatif, yang memang wujud pola bit, hash, dan alamat memori. Format bertanda dan pecahan bergantung pada pilihan encoding (two's complement, IEEE 754) yang membuat pemetaannya ambigu.",
      },
    ],
  },
  "roman-numeral": {
    name: "Konverter Angka Romawi",
    tagline:
      "Konversikan angka ke angka Romawi dan sebaliknya, dua arah sekaligus — dengan validasi klasik yang ketat atas notasi subtraktif.",
    intro: [
      "Ketik angka Arab (1–3999) dan lihat bentuk Romawinya, atau ketik angka Romawi dan dapatkan angkanya — kedua kolom itu langsung, jadi Anda bisa memperbaiki sisi mana pun. Parser menegakkan aturan klasik: I sebelum V/X, X sebelum L/C, C sebelum D/M.",
      "Praktis untuk muka jam, bab buku, tahun film, prasasti tugu, dan nomor Super Bowl — di mana pun angka Romawi masih muncul.",
    ],
    steps: [
      "Masukkan angka antara 1 dan 3999 untuk mendapat angka Romawinya.",
      "Atau ketik angka Romawi — angkanya muncul seketika.",
      "Bentuk tidak valid seperti VIIII atau IM ditandai dengan penjelasan aturannya.",
    ],
    faqs: [
      {
        q: "Kenapa 4000 menjadi batas atas (MMMCMXCIX)?",
        a: "Notasi Romawi klasik tidak punya digit yang lebih besar dari M (1000), dan mengulang M empat kali (MMMM) tidak dipakai. Angka terbesar yang bisa dinyatakan dalam bentuk klasik ketat adalah 3999, ditulis MMMCMXCIX.",
      },
      {
        q: "Kenapa VIIII ditolak padahal jam kadang menampilkannya?",
        a: "Beberapa muka jam memakai IIII aditif untuk empat, tetapi sistem klasik standar menuntut IV subtraktif. Alat ini memvalidasi terhadap regex kanonik yang ketat, jadi VIIII, IC, atau IM ditandai alih-alih dikonversi diam-diam.",
      },
      {
        q: "Apakah konverter menerima huruf kecil?",
        a: "Ya — masukan seperti mcmxciv otomatis dikapitalkan dan dikonversi menjadi 1994. Output selalu ditampilkan dalam huruf besar, seperti tradisi prasastinya.",
      },
    ],
  },
  "age-calculator": {
    name: "Kalkulator Usia",
    tagline:
      "Hitung usia persis dalam tahun, bulan, dan hari, total hari hidup, dan hitung mundur langsung menuju ulang tahun berikutnya — akurat kalender.",
    intro: [
      "Masukkan tanggal lahir dan kalkulator ini melaporkan usia persisnya — tahun, bulan, dan hari, bukan perkiraan — plus total bulan dan total hari hidup. Ia juga menghitung mundur ke ulang tahun berikutnya beserta hari apa ia jatuh.",
      "Kolom “usia pada tanggal” bawaannya hari ini dan bisa diubah ke tanggal masa lalu atau masa depan mana pun, yang memudahkan menjawab pertanyaan seperti “berapa usianya di hari wisuda?”.",
    ],
    steps: [
      "Pilih tanggal lahirnya.",
      "Biarkan tanggal usia pada hari ini, atau ubah ke tanggal lain.",
      "Baca usia persisnya, total bulan dan hari, serta hitung mundur ulang tahun berikutnya.",
    ],
    faqs: [
      {
        q: "Bagaimana usia dalam tahun/bulan/hari dihitung?",
        a: "Dengan aritmetika kalender, bukan panjang bulan rata-rata: tahun dan bulan dihitung utuh, dan sisa hari diukur terhadap panjang nyata bulannya — termasuk tahun kabisat. Seseorang yang lahir 29 Februari dihitung bertambah setahun pada 1 Maret di tahun non-kabisat.",
      },
      {
        q: "Bisakah menghitung usia pada tanggal di masa lalu atau masa depan?",
        a: "Bisa. Kotak “usia pada tanggal” bisa diedit, jadi Anda bisa menghitung usia historis atau memeriksa berapa usia seseorang pada acara mendatang. Tanggal lahir tidak boleh setelah tanggal usianya.",
      },
      {
        q: "Kenapa angka total hari itu penting?",
        a: "Total hari hidup adalah angka yang dipakai untuk tonggak bergaya “hari di bumi” dan untuk sistem yang menyimpan usia dalam hari. Ia dihitung dari tanggal kalender dalam UTC sehingga pergeseran daylight-saving tidak bisa membuatnya meleset satu.",
      },
    ],
  },
  "bmi-calculator": {
    name: "Kalkulator BMI",
    tagline:
      "Hitung Body Mass Index dari masukan metrik atau imperial dan lihat persis di kategori berat resmi WHO mana nilainya mendarat.",
    intro: [
      "Masukkan tinggi dan berat dalam sentimeter dan kilogram, atau kaki, inci, dan pound, dan kalkulator menampilkan Body Mass Index Anda satu desimal bersama kategori WHO-nya — kurus, normal, kelebihan berat, atau obesitas — dengan baris yang cocok disorot di tabel acuan.",
      "Hasilnya diperbarui saat Anda mengetik, jadi mudah melihat bagaimana beberapa kilogram memindahkan Anda antar rentang. BMI adalah ukuran skrining, bukan diagnosis: ia tidak membedakan otot dari lemak.",
    ],
    steps: [
      "Pilih satuan metrik (cm + kg) atau imperial (ft + in + lb).",
      "Ketik tinggi dan berat Anda.",
      "Baca BMI Anda, kategori WHO-nya, dan tabel acuan lengkapnya.",
    ],
    faqs: [
      {
        q: "Berapa rentang BMI menurut WHO?",
        a: "World Health Organization mendefinisikan: di bawah 18,5 kurus, 18,5–24,9 berat normal, 25,0–29,9 kelebihan berat, dan 30,0 ke atas obesitas. Ambang yang sama berlaku untuk pria dan wanita dewasa.",
      },
      {
        q: "Bagaimana BMI dihitung?",
        a: "BMI adalah berat dalam kilogram dibagi tinggi dalam meter kuadrat (kg/m²). Untuk satuan imperial, alat mengonversi kaki, inci, dan pound secara internal, jadi hasilnya identik di kedua arah.",
      },
      {
        q: "Kenapa BMI tidak cocok untuk atlet?",
        a: "Otot lebih padat daripada lemak, jadi orang yang sangat berotot bisa tercatat “kelebihan berat” sambil membawa sedikit lemak berlebih. Perlakukan BMI sebagai skrining populasi yang cepat dan gabungkan dengan pengukuran pinggang atau komposisi tubuh untuk gambaran yang lebih penuh.",
      },
    ],
  },
  "percentage-calculator": {
    name: "Kalkulator Persen",
    tagline:
      "Tiga soal persen dalam satu alat langsung: X% dari Y, X berapa persen dari Y, dan perubahan persen antara dua nilai.",
    intro: [
      "Tiga pertanyaan yang benar-benar ditanyakan orang: “berapa 15% dari 200?”, “30 berapa persen dari 150?”, dan “penjualan naik dari 480 ke 610 — berapa persen?”. Ganti mode sekali klik dan rumusnya menyesuaikan tiap kasus.",
      "Perubahan persen itu bertanda dan diberi label naik atau turun, jadi penurunan dari 500 ke 400 terbaca jelas −20%, bukan angka positif yang membingungkan.",
    ],
    steps: [
      "Pilih mode: X% dari Y, X berapa % dari Y, atau % perubahan.",
      "Ketik dua nilai ke dua kotaknya.",
      "Baca hasil langsungnya — dengan arah diberi label untuk perubahan.",
    ],
    faqs: [
      {
        q: "Bagaimana perubahan persen dihitung?",
        a: "(akhir − awal) ÷ |awal| × 100. Nilai absolut di penyebut berarti perubahan dari −50 ke −40 melaporkan +20% dengan benar alih-alih −20%. Arah terbalik (400 → 500) memberi +25% karena basisnya berubah.",
      },
      {
        q: "Kenapa naik 20% lalu turun 20% bukan nol?",
        a: "Persen diterapkan pada basis yang berbeda: 100 + 20% = 120, lalu 120 − 20% = 96. Perubahan bersih −4%. Asimetri ini menjebak perbandingan harga dan judul berita sama-sama.",
      },
      {
        q: "Bolehkah memakai angka negatif atau desimal?",
        a: "Boleh. Kedua masukan menerima negatif dan desimal, jadi “−5% dari 80” atau poin persen pada perubahan suhu berjalan lancar.",
      },
    ],
  },
  "emi-calculator": {
    name: "Kalkulator EMI",
    tagline:
      "Hitung EMI bulanan tetap untuk pinjaman mana pun — pokok, bunga, dan tenor masuk, total bunga dan total pelunasan keluar, seketika.",
    intro: [
      "Masukkan jumlah pinjaman, suku bunga tahunan, dan tenor dalam tahun atau bulan untuk mendapat cicilan bulanan tetap plus total bunga yang akan Anda bayar sepanjang umur pinjaman. Perhitungannya rumus reducing-balance standar yang dipakai bank dan lembaga pembiayaan.",
      "Ubah masukan mana pun dan semuanya dihitung ulang langsung, jadi Anda bisa membandingkan pinjaman 15 tahun dengan 20 tahun, atau melihat persis berapa biaya tambahan 0,5% suku bunga tiap bulan.",
    ],
    steps: [
      "Ketik jumlah pinjamannya (pokok).",
      "Masukkan suku bunga tahunan dan tenornya dalam tahun atau bulan.",
      "Baca EMI bulanan, total bunga, dan total pelunasannya.",
    ],
    faqs: [
      {
        q: "Rumus apa yang dipakai kalkulator EMI ini?",
        a: "Rumus reducing-balance standar: EMI = P × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1), di mana P pokok, r suku bunga bulanan (tahunan ÷ 12 ÷ 100) dan n jumlah bulan. Ini persamaan yang sama yang dipakai bank untuk KPR, kredit mobil, dan pinjaman pribadi.",
      },
      {
        q: "Kenapa total bunga begitu tinggi di awal pinjaman?",
        a: "Bunga tiap bulan dikenakan pada saldo berjalan, yang terbesar di awal. EMI awal sebagian besar bunga dan sedikit pokok; campurannya berbalik saat saldo menyusut. Melunasi lebih awal karenanya menghemat jauh lebih banyak bunga daripada melunasi terlambat.",
      },
      {
        q: "Apakah biaya dan asuransi termasuk dalam EMI?",
        a: "Tidak. Biaya administrasi, asuransi, dan perubahan suku bunga mengapung dikecualikan — hasilnya EMI amortisasi murni untuk suku bunga yang Anda masukkan. Surat persetujuan pemberi pinjaman Anda menampilkan jumlah akhir yang terutang.",
      },
    ],
  },
  "loan-calculator": {
    name: "Kalkulator Pinjaman",
    tagline:
      "Lihat gambaran penuh sebuah pinjaman: cicilan bulanan, total bunga, dan tabel amortisasi tahunan yang menunjukkan pecahan pokok dan bunga.",
    intro: [
      "Semua yang diberikan tampilan EMI — cicilan bulanan, total bunga, total pelunasan — plus jadwal amortisasi tahunan yang menunjukkan persis berapa porsi tiap pembayaran setahun yang bunga dan yang pokok, serta saldo yang tersisa di akhir tiap tahun.",
      "Ini cara tercepat memahami kenapa pembayaran ekstra di tahun-tahun awal begitu bernilai: tabelnya membuat tahun-tahun yang padat bunga mustahil terlewat.",
    ],
    steps: [
      "Masukkan jumlah pinjaman, suku bunga tahunan, dan tenor dalam tahun atau bulan.",
      "Baca cicilan bulanan, total bunga, dan total pelunasannya.",
      "Gulir tabel tahunannya untuk melihat pokok, bunga, dan saldo tersisa per tahun.",
    ],
    faqs: [
      {
        q: "Apa itu jadwal amortisasi?",
        a: "Rincian periode demi periode dari pinjaman berpembayaran tetap. Setiap pembayaran dipecah menjadi bunga yang terutang pada saldo saat ini dan pokok yang dilunasinya, dan saldonya menyusut tiap bulan. Tabel di sini mengelompokkan bulan-bulan itu menjadi tahun.",
      },
      {
        q: "Bagaimana membayar total bunga lebih sedikit?",
        a: "Tiga tuas: tenor lebih pendek, suku bunga lebih rendah, atau pembayaran pokok ekstra — terutama di sepertiga pertama pinjaman saat saldo paling tinggi. Tabel tahunannya menunjukkan persis di mana bunga terkonsentrasi.",
      },
      {
        q: "Apakah jadwalnya mengasumsikan suku bunga tak pernah berubah?",
        a: "Ya. Ia memodelkan pinjaman bunga tetap untuk suku bunga yang Anda masukkan. Untuk produk bunga mengapung, hitung ulang kapan pun acuannya me-reset — tiap reset mengubah cicilan dan jadwalnya.",
      },
    ],
  },
  "gst-calculator": {
    name: "Kalkulator GST",
    tagline:
      "Tambahkan atau ekstrak GST pada tarif slab 5%, 12%, 18%, dan 28% — jumlah neto, pajak, dan bruto dihitung langsung di browser Anda.",
    intro: [
      "Masukkan angka apa pun dan pilih salah satu dari empat slab GST India untuk menambah pajak ke harga neto, atau melepas GST yang sudah termasuk di harga bruto (MRP). Ketiga angkanya — neto, pajak, bruto — diperbarui saat Anda mengetik.",
      "Berguna untuk faktur, pemeriksaan reverse charge, perbandingan belanja antar negara bagian dengan slab berbeda, dan memahami persis berapa bagian harga etiket yang pajak.",
    ],
    steps: [
      "Ketik angkanya — neto jika menambah GST, bruto jika mengekstraknya.",
      "Pilih slab yang berlaku: 5%, 12%, 18%, atau 28%.",
      "Pilih Tambah pajak atau Lepas pajak dan baca angka neto, pajak, dan brutonya.",
    ],
    faqs: [
      {
        q: "Berapa slab GST di India?",
        a: "Tarif utamanya 5%, 12%, 18%, dan 28%: kebutuhan pokok berada di 0–5%, kebanyakan barang dan jasa di 12–18%, dan barang mewah atau sin di 28% (kadang dengan cess tambahan). Alat ini mencakup empat slab standar.",
      },
      {
        q: "Bagaimana melepas GST dari harga yang sudah termasuk pajak?",
        a: "Pilih “Lepas pajak” dan masukkan jumlah brutonya. Basisnya dipulihkan sebagai bruto ÷ (1 + tarif/100), jadi harga bruto ₹118 pada GST 18% punya neto ₹100 dan pajak ₹18.",
      },
      {
        q: "Apakah GST sama dengan VAT?",
        a: "Keduanya pajak nilai-tambah yang dikenakan di tiap tahap, tetapi GST di India adalah satu pajak terpadu yang menyerap excise pusat, service tax, dan VAT negara bagian, dibagi menjadi CGST + SGST (dalam negara bagian) atau IGST (antar negara bagian). Negara lain menyebut padanannya VAT saja.",
      },
    ],
  },
  "vat-calculator": {
    name: "Kalkulator VAT",
    tagline:
      "Tambahkan VAT ke harga neto atau ekstrak dari harga bruto pada tarif kustom mana pun — jumlah neto, VAT, dan bruto langsung, privat, dan instan.",
    intro: [
      "Bekerja dua arah untuk tarif negara mana pun: ketik 20 untuk Inggris, 21 untuk Belanda, 19 untuk Jerman — atau tarif apa pun. Tambahkan pajak ke angka neto, atau mundurkan VAT yang bersembunyi di dalam harga bruto (termasuk pajak).",
      "Semuanya dihitung lokal di browser Anda — tanpa unggahan, tanpa akun — yang membuatnya aman untuk draf harga dan faktur yang belum terbit.",
    ],
    steps: [
      "Ketik angkanya — neto jika menambah VAT, bruto jika melepasnya.",
      "Masukkan tarif VAT Anda dalam persen (misalnya 20).",
      "Pilih Tambah pajak atau Lepas pajak; neto, VAT, dan bruto muncul seketika.",
    ],
    faqs: [
      {
        q: "Bagaimana menghitung VAT mundur dari harga bruto?",
        a: "Neto = bruto ÷ (1 + tarif ÷ 100). Untuk harga bruto £120 pada VAT 20%: 120 ÷ 1,2 = £100 neto, £20 VAT. Mode “Lepas pajak” melakukannya untuk Anda dan menampilkan ketiga angkanya.",
      },
      {
        q: "Apa bedanya VAT dan GST?",
        a: "Mereka jenis pajak yang sama — nilai ditambahkan di tiap tahap rantai pasok dan akhirnya ditanggung konsumen. “VAT” adalah nama umum di Eropa, Inggris, dan sebagian besar Afrika serta Asia; India dan beberapa lainnya menyebut versi terpadunya GST.",
      },
      {
        q: "Tarif VAT mana yang sebaiknya dipakai?",
        a: "Apa pun yang berlaku untuk barang atau jasa serta yurisdiksi Anda: tarif standar berkisar 0% hingga 27% di seluruh dunia, dan kebanyakan negara juga punya tarif lebih rendah untuk makanan, buku, atau obat. Saat ragu, periksa tabel terkini otoritas pajak Anda.",
      },
    ],
  },
  "discount-calculator": {
    name: "Kalkulator Diskon",
    tagline:
      "Harga plus satu atau dua diskon bertumpuk masuk: harga akhir, uang yang dihemat, dan persentase gabungan sebenarnya — dihitung saat Anda mengetik.",
    intro: [
      "Masukkan harga asli dan persentase diskonnya, dan seketika lihat berapa yang benar-benar Anda bayar dan berapa yang Anda hemat. Diskon kedua yang opsional menangani kasus “ekstra 10% off harga obral” yang selalu menjebak pembeli.",
      "Diskon bertumpuk diterapkan satu demi satu, dan alat menampilkan tarif gabungan efektifnya — karena 20% + 10% off adalah 28% off, bukan 30%, selisih yang menumpuk di barang bernilai besar.",
    ],
    steps: [
      "Ketik harga aslinya.",
      "Masukkan persentase diskonnya — dan satu diskon bertumpuk opsional.",
      "Baca harga akhirnya, jumlah yang dihemat, dan diskon efektifnya.",
    ],
    faqs: [
      {
        q: "Kenapa 20% + 10% tidak sama dengan 30% off?",
        a: "Diskon kedua berlaku pada harga yang sudah dikurangi, bukan yang asli: 100 → 80 (−20%) → 72 (−10%), yang totalnya 28% off. Kalkulator menampilkan tarif efektif ini agar Anda bisa membandingkan penawaran secara adil.",
      },
      {
        q: "Bagaimana menemukan harga asli dari harga obral?",
        a: "Bagi harga obral dengan (1 − diskon ÷ 100). Harga $72 setelah 28% off berasal dari 72 ÷ 0,72 = $100. Atau pakai mode “X berapa % dari Y” di Kalkulator Persen untuk menghitungnya langkah demi langkah.",
      },
      {
        q: "Apakah ini memperhitungkan VAT atau pajak penjualan?",
        a: "Tidak — ia bekerja pada harga yang Anda ketik. Jika etiket menampilkan harga termasuk pajak, hasil diskonnya juga termasuk pajak. Untuk menggabungkan dengan pajak, lewatkan harga terdiskon ke kalkulator VAT atau GST.",
      },
    ],
  },
  "profit-calculator": {
    name: "Kalkulator Keuntungan",
    tagline:
      "Biaya dan harga jual masuk: laba atau rugi, margin laba, dan persentase markup keluar — angka penetapan harga yang sering tertukar penjual, terurai langsung.",
    intro: [
      "Masukkan berapa biaya sebuah barang dan berapa Anda menjualnya, dan dapatkan laba (atau rugi) absolutnya plus dua rasio yang dibutuhkan setiap penjual: margin — laba sebagai porsi harga jual — dan markup — laba sebagai porsi biaya.",
      "Karena kedua rasio memakai penyebut berbeda, margin 25% adalah markup 33,3%; alat ini menampilkan keduanya bersamaan agar faktur, penawaran, dan daftar harga tetap konsisten.",
    ],
    steps: [
      "Ketik harga biayanya — berapa yang Anda bayar.",
      "Ketik harga jualnya — berapa yang dibayar pelanggan.",
      "Baca laba/rugi dan persentase margin serta markup-nya.",
    ],
    faqs: [
      {
        q: "Apa bedanya margin dan markup?",
        a: "Margin adalah laba ÷ harga jual (porsi pendapatan); markup adalah laba ÷ biaya (jumlah yang ditambahkan di atas biaya). Produk yang dibeli 80 dan dijual 100 punya margin 20% dan markup 25%. Mencampur keduanya diam-diam mengecilkan laba yang Anda rencanakan.",
      },
      {
        q: "Bagaimana menetapkan harga dari margin target?",
        a: "Bagi biaya dengan (1 − margin target): untuk margin 25% pada biaya 80, 80 ÷ 0,75 ≈ 106,67. Menetapkannya lewat markup justru (80 × 1,25 = 100) menyisakan Anda margin hanya 20%.",
      },
      {
        q: "Apakah kalkulator memasukkan biaya dan pajak?",
        a: "Ia bekerja pada dua angka yang Anda masukkan, jadi biaya pemrosesan pembayaran, pengiriman, dan pajak penjualan hanya muncul jika Anda melipatkannya ke biaya atau harga lebih dulu. Untuk penetapan harga termasuk pajak, lewatkan angkanya ke kalkulator VAT atau GST.",
      },
    ],
  },
  "scientific-calculator": {
    name: "Kalkulator Ilmiah",
    tagline:
      "Kalkulator ilmiah lengkap di browser Anda: trigonometri, log, ln, pangkat, dan akar dengan hasil langsung — tanpa eval, tanpa server, tanpa pelacakan.",
    intro: [
      "Keypad plus baris ekspresi yang bisa diketik: sin, cos, tan (DEG/RAD), log₁₀, ln, akar kuadrat, kuadrat, pangkat arbitrer, kurung, π, dan e. Pratinjau hasil diperbarui saat Anda mengetik, dan = melipatnya kembali ke ekspresi untuk perhitungan berantai.",
      "Ekspresi di-parse oleh evaluator recursive-descent yang ditulis tangan khusus untuk situs ini — eval dan konstruktor Function milik JavaScript tidak pernah dipakai, dan tidak ada yang dikirim ke mana pun. Perkalian implisit (2π, 3(4+1)) bekerja begitu saja.",
    ],
    steps: [
      "Ketuk keypad atau ketik ekspresi dengan keyboard Anda.",
      "Nyalakan DEG/RAD untuk fungsi trigonometri sesuai kebutuhan.",
      "Tekan = untuk menetapkan hasil yang dipratinjau, lalu terus berhitung di atasnya.",
    ],
    faqs: [
      {
        q: "Bagaimana ekspresi dievaluasi?",
        a: "Oleh tokenizer kecil dan parser recursive-descent yang ditulis ke halaman: angka, konstanta, fungsi, kurung, minus unary, % dan x² postfix, pangkat yang berasosiasi kanan, dan perkalian implisit antar nilai bersebelahan. Input tidak valid hanya menampilkan error alih-alih mengeksekusi apa pun.",
      },
      {
        q: "Bagaimana mendapat tangen 45 derajat?",
        a: "Biarkan saklar DEG aktif (itu bawaannya), tekan tan, lalu 45 dan =. Untuk radian — misalnya tan(π/4) — ganti ke RAD dan ketik tan(π/4) langsung.",
      },
      {
        q: "Kenapa hasil saya ditampilkan dengan digit terbatas?",
        a: "Hasil dibulatkan ke 12 digit signifikan untuk menyembunyikan derau floating-point seperti 0,30000000000000004. Presisi melampaui 12 digit jarang bermakna di perangkat keras floating-point biner.",
      },
    ],
  },
  "date-calculator": {
    name: "Kalkulator Tanggal",
    tagline:
      "Hari antara dua tanggal dalam tahun, bulan, dan hari — atau tambah dan kurangi hari dari tanggal mana pun — dengan tahun kabisat ditangani persis.",
    intro: [
      "Dua soal tanggal sehari-hari dalam satu tempat: ukur jarak antara dua tanggal (y/m/d akurat kalender, total hari, pekan, dan sisa hari), atau jalan N hari maju atau mundur dari tanggal dasar dan dapatkan tanggal hasilnya beserta harinya.",
      "Karena aritmetikanya matematika kalender sejati — bukan bulan rata-rata — ulang tahun hari kabisat, bulan 31 hari, atau rentang Februari semuanya keluar persis benar, tanpa server yang terlibat.",
    ],
    steps: [
      "Pilih Selisih antar tanggal, atau Tambah / kurangi hari.",
      "Masukkan kedua tanggal — atau tanggal dasar dan jumlah hari.",
      "Baca rinciannya yang persis dan tanggal hasilnya beserta harinya.",
    ],
    faqs: [
      {
        q: "Bagaimana selisih tahun/bulan/hari dihitung?",
        a: "Dengan cara orang menghitung ulang tahun: tahun penuh, lalu bulan penuh, lalu sisa hari diukur terhadap panjang nyata bulan yang terlibat. Tanggal 29 Februari diperlakukan sebagai hari terakhir Februari, jadi rentang lintas tahun kabisat tetap jujur.",
      },
      {
        q: "Apakah “tambah 90 hari” berarti hari kerja?",
        a: "Tidak — hitungan harinya hari kalender, termasuk akhir pekan. Untuk tenggat kontrak yang menghitung hari kerja, tambahkan kira-kira 5 hari per pekan rentang sebagai aproksimasi awal, atau gunakan alat hari kerja khusus.",
      },
      {
        q: "Apakah tanggal yang saya masukkan dikirim ke mana pun?",
        a: "Tidak. Kedua mode berjalan sepenuhnya di browser Anda memakai aritmetika tanggal JavaScript; tidak ada yang diunggah dan tidak ada yang disimpan.",
      },
    ],
  },
  "qr-generator": {
    name: "Generator Kode QR",
    tagline:
      "Ubah teks atau URL apa pun menjadi kode QR tajam dengan ukuran, warna, dan level koreksi error yang bisa diatur — unduh sebagai PNG atau SVG.",
    intro: [
      "Tempel tautan, kata sandi Wi-Fi, nomor telepon, atau teks apa pun dan saksikan kode QR dirender langsung hingga 768 px. Pilih level koreksi error dari L (7%) ke H (30%) agar kode tetap ter-scan saat dicetak kecil atau tertutup sebagian, dan pilih warna kode serta latarnya untuk cocok dengan merek Anda.",
      "Encoding berjalan sepenuhnya di browser Anda dengan pustaka qrcode — gambarnya dihasilkan di perangkat Anda dan tidak pernah diunggah. Unduh PNG untuk layar atau SVG bebas-resolusi untuk cetak.",
    ],
    steps: [
      "Ketik atau tempel teks atau URL yang ingin dienkode.",
      "Atur ukuran, level koreksi error, dan kedua warnanya.",
      "Unduh hasilnya sebagai PNG (layar) atau SVG (cetak, ukuran apa pun).",
    ],
    faqs: [
      {
        q: "Level koreksi error mana yang sebaiknya dipilih?",
        a: "M (15%) adalah bawaan sehari-hari. Pilih H (30%) untuk kode yang akan dicetak di kain, stiker, atau latar yang ramai, atau saat Anda berencana menaruh logo di tengah — makin tinggi levelnya, makin banyak kerusakan yang ditahannya.",
      },
      {
        q: "Apakah kode QR kedaluwarsa atau berisi pelacakan?",
        a: "Tidak. Ini kode statis: teks terenkodenya hidup di dalam pola itu sendiri dan bekerja selamanya tanpa layanan di belakangnya. Tanpa redirect, tanpa penghitung scan, tanpa analitik — datanya hanya yang Anda ketik.",
      },
      {
        q: "Apakah teks atau URL saya diunggah ke mana pun?",
        a: "Tidak. Pustaka qrcode berjalan di dalam browser Anda dan merender ke canvas lokal; teksnya maupun gambar yang dihasilkan tidak pernah meninggalkan perangkat.",
      },
    ],
  },
  "barcode-generator": {
    name: "Generator Barcode",
    tagline:
      "Buat barcode CODE128, EAN-13, dan UPC-A yang bisa di-scan dengan lebar dan tinggi batang yang bisa diatur — output SVG vektor, dirender di browser Anda.",
    intro: [
      "Ketik nilai, pilih simbologi, dan dapatkan barcode siap ritel dengan baris terbaca manusia opsional di bawahnya. CODE128 menangani huruf, angka, dan simbol apa pun untuk label inventaris; EAN-13 dan UPC-A memvalidasi serta mengisi otomatis digit cek untuk kemasan produk.",
      "Rendering memakai pustaka JsBarcode di dalam browser Anda dan mengeluarkan SVG yang bisa diskalakan, jadi file yang sama tercetak tajam pada label 12 mm atau lembar A4. Tidak ada yang diunggah dan tidak ada kode yang disimpan.",
    ],
    steps: [
      "Masukkan nilai barcode — huruf/angka untuk CODE128, 12 digit untuk EAN-13, 11 untuk UPC-A.",
      "Pilih formatnya dan atur lebar serta tinggi batang.",
      "Unduh SVG-nya untuk dicetak atau impor ke alat desain Anda.",
    ],
    faqs: [
      {
        q: "Kenapa masukan EAN-13 saya ditolak?",
        a: "EAN-13 butuh tepat 12 digit (digit cek ke-13 dihitung otomatis) atau seluruh 13 digit dengan digit cek akhir yang valid. UPC-A serupa menuntut 11 digit. Huruf, spasi, atau jumlah digit yang salah ditolak dengan pesan error milik pustakanya.",
      },
      {
        q: "Format mana yang sebaiknya dipakai untuk produk ritel?",
        a: "EAN-13 di sebagian besar dunia, UPC-A di AS dan Kanada — keduanya standar ritel GS1 yang diharapkan scanner di kasir. Gunakan CODE128 untuk stok internal, aset, dan label pengiriman di tempat tanpa nomor GS1.",
      },
      {
        q: "Berapa resolusi output-nya?",
        a: "Unduhannya SVG vektor, jadi menskalakan ke DPI mana pun tanpa blur. Jaga quiet zone-nya (margin kosong di tiap sisi) tetap utuh saat menempatkannya — memotongnya adalah penyebab paling umum scan tak terbaca.",
      },
    ],
  },
  "color-picker": {
    name: "Pemilih Warna",
    tagline:
      "Pilih warna dari swatch atau ambil langsung dari layar Anda dengan API EyeDropper — hex, RGB, dan HSL tersalin sekali klik.",
    intro: [
      "Klik swatch untuk menyusun warna secara visual, atau — di browser Chromium — pakai Ambil dari layar untuk mengambil piksel mana pun yang sudah ada di layar Anda. Nilai terpilih muncul serentak sebagai hex, rgb(), dan hsl(), masing-masing dengan tombol salinnya sendiri.",
      "Pengambilan sampel memakai API EyeDropper bawaan browser dan membaca pikselnya secara lokal; tidak ada yang direkam, diunggah, atau disimpan. Di browser tanpa API itu, masukan swatch menjaga semuanya tetap bekerja.",
    ],
    steps: [
      "Klik swatch warna dan pilih warna, atau pakai Ambil dari layar di tempat tersedia.",
      "Baca nilai hex, RGB, dan HSL di bawah pratinjau.",
      "Klik Salin di sebelah format yang Anda butuhkan.",
    ],
    faqs: [
      {
        q: "Kenapa “Ambil dari layar” tidak muncul?",
        a: "API EyeDropper saat ini tersedia di browser berbasis Chromium (Chrome, Edge, Brave, Opera). Firefox dan Safari belum mengeksposnya, jadi browser tersebut hanya menampilkan masukan swatch — sisanya bekerja identik.",
      },
      {
        q: "Apa bedanya hex, RGB, dan HSL?",
        a: "Ketiganya menggambarkan warna yang sama dengan tiga cara: hex mengemas merah-hijau-biru menjadi #RRGGBB untuk CSS dan alat desain; rgb() menyatakan ketiga kanalnya secara numerik; hsl() menyatakan hue, saturasi, dan lightness, yang lebih mudah untuk membangun palet dan hover state dengan tangan.",
      },
      {
        q: "Apakah pengambilan sampel layar itu privat?",
        a: "Ya. API EyeDropper menampilkan picker sistem dan hanya mengembalikan satu piksel yang Anda klik; pembacaannya terjadi di browser Anda dan tidak ada screenshot, riwayat, atau nilai yang dikirim atau disimpan.",
      },
    ],
  },
  "color-converter": {
    name: "Konverter Warna",
    tagline:
      "Tempel warna dalam hex, rgb(), atau hsl() dan dapatkan ketiga formatnya plus baris tint dan shade siap pakai untuk design system Anda.",
    intro: [
      "Berikan #0071e3, rgb(0, 113, 227), atau hsl(211, 100%, 45%) — parser mendeteksi formatnya otomatis dan mengeluarkan hex, RGB, dan HSL sekaligus, masing-masing dengan salinan sekali klik.",
      "Di bawah nilai-nilainya, baris tint-and-shade mencampur warna Anda dengan putih dan hitam pada langkah 20/40/60/80%: hover state, border, dan varian dark-mode instan tanpa membuka alat desain.",
    ],
    steps: [
      "Tempel warna dalam salah satu dari tiga format — hex, rgb(), atau hsl().",
      "Baca nilai konversinya dan salin yang Anda butuhkan.",
      "Ambil tint dan shade dari baris swatch di bawahnya.",
    ],
    faqs: [
      {
        q: "Bagaimana HSL dikonversi ke RGB?",
        a: "Lewat pemetaan Cylindrical–RGB standar: kromatisitas c = (1 − |2L − 1|) × S, nilai perantara x ditentukan oleh sektor hue, lalu tiap kanal digeser dengan m = L − c/2. Matematisnya rumus buku teks, jadi hasilnya cocok dengan alat desain.",
      },
      {
        q: "Kenapa kode warna saya ditandai tidak valid?",
        a: "Bentuk yang diterima adalah #RGB / #RRGGBB, rgb(r, g, b), dan hsl(h, s%, l%). Kanal harus dalam rentang (0–255 untuk RGB, 0–360 untuk hue, 0–100% untuk sisanya) dan tiap bagian dipisah koma atau spasi.",
      },
      {
        q: "Untuk apa tint dan shade itu bagus?",
        a: "Tint (dicampur putih) membuat latar hover, badge, dan kartu; shade (dicampur hitam) membuat pressed state, border, dan permukaan dark-mode. Menurunkan keduanya dari satu warna merek menjaga setiap state UI konsisten secara visual.",
      },
    ],
  },
  "timestamp-converter": {
    name: "Konverter Unix Timestamp",
    tagline:
      "Konversikan detik atau milidetik Unix ke tanggal manusiawi dan sebaliknya, dengan jam langsung, output zona waktu lokal dan UTC — semuanya di browser Anda.",
    intro: [
      "Penghitung langsung menampilkan timestamp Unix saat ini dalam detik dan milidetik dengan salinan sekali klik. Tempel timestamp dan ia didekode ke waktu lokal dan UTC Anda — nilai 10 digit diperlakukan sebagai detik, 13 digit sebagai milidetik, otomatis.",
      "Ke arah sebaliknya, pilih tanggal dan waktu untuk mendapat timestamp persisnya. Semuanya dihitung lokal dari jam perangkat Anda; timestamp bebas-zona-waktu secara definisi, jadi angkanya sama di mana pun di bumi.",
    ],
    steps: [
      "Salin timestamp saat ini yang berjalan, atau tempel satu ke kolom dekode.",
      "Baca tanggal manusiawi lokal dan UTC-nya; detik vs milidetik terdeteksi otomatis.",
      "Atau pilih tanggal-waktu untuk mendapat timestamp Unix-nya dalam detik dan milidetik.",
    ],
    faqs: [
      {
        q: "Sebenarnya apa itu Unix timestamp?",
        a: "Jumlah detik yang berlalu sejak 1970-01-01 00:00:00 UTC, tidak menghitung leap second. Ini cara standar komputer menyimpan titik waktu karena pengurutan dan pengurangan menjadi sepele. Timestamp milidetik (13 digit) umum di JavaScript dan Java.",
      },
      {
        q: "Bagaimana alat tahu angka saya detik atau milidetik?",
        a: "Dari magnitudonya: nilai di bawah 1 triliun tidak mungkin menggambarkan tanggal modern dalam milidetik, jadi dibaca sebagai detik; nilai 13 digit dibaca sebagai milidetik. Hasilnya menyatakan interpretasi mana yang diterapkan.",
      },
      {
        q: "Apakah timestamp yang sama terdekode berbeda di zona waktu lain?",
        a: "Angka mentahnya tidak pernah berubah — ia mengenkode satu momen absolut. Hanya render yang terbaca manusianya yang berbeda, itulah mengapa alat menampilkan waktu lokal dan UTC Anda berdampingan.",
      },
    ],
  },
  "tip-calculator": {
    name: "Kalkulator Tip",
    tagline:
      "Tagihan plus persentase tip plus pembagian antar teman: lihat tipnya, totalnya, dan persis berapa utang tiap orang — langsung, tanpa berhitung di meja.",
    intro: [
      "Masukkan tagihannya, ketuk preset tip (10/15/18/20/25%) atau ketik milik Anda, dan sebutkan berapa orang yang membagi. Anda seketika mendapat jumlah tip, total akhir, dan bagian per orang, jadi tak ada yang berhitung dalam hati sementara pelayan menunggu.",
      "Semuanya dihitung ulang langsung saat angka berubah, bekerja untuk mata uang apa pun, dan berjalan sepenuhnya di perangkat Anda — praktis di luar negeri, tempat koneksi data Anda mungkin satu-satunya yang andal.",
    ],
    steps: [
      "Ketik jumlah tagihannya.",
      "Pilih preset tip atau masukkan persentase kustom.",
      "Atur jumlah orang dan baca bagian per orangnya.",
    ],
    faqs: [
      {
        q: "Berapa sebaiknya saya memberi tip?",
        a: "Tergantung di mana Anda berada: 15–20% dari tagihan pra-pajak lazim di AS, 10–15% di sebagian besar Eropa dan Amerika Latin, dan pembulatan ke atas normal di Jepang dan Cina di mana tip tidak diharapkan. Saat ragu, preset 10% menjaga Anda aman hampir di mana pun.",
      },
      {
        q: "Sebaiknya tip dihitung sebelum atau sesudah pajak?",
        a: "Etika tradisional berkata beri tip pada jumlah pra-pajak, tetapi dalam praktik kebanyakan orang memberi tip pada total yang tercetak di struk kartu. Jika ingin persis, masukkan angka pra-pajak sebagai tagihan dan tambahkan pajaknya terpisah untuk pembagian.",
      },
      {
        q: "Apakah jumlah per orang mengasumsikan pembagian sama rata?",
        a: "Ya — tagihan plus tip dibagi rata dengan jumlah orang. Untuk bagian yang tidak rata (seseorang hanya makan salad), hitung item bersama sebagai subtotal lebih dulu dan tambahkan item individual di atasnya.",
      },
    ],
  },
  "fuel-cost-calculator": {
    name: "Kalkulator Biaya Bahan Bakar",
    tagline:
      "Jarak, efisiensi, dan harga pompa masuk: bahan bakar yang dibutuhkan, biaya perjalanan, dan biaya per kilometer atau mil keluar — metrik atau imperial, dengan pulang-pergi.",
    intro: [
      "Rencanakan perjalanan mana pun sebelum berangkat: masukkan jarak, konsumsi mobil Anda (L/100 km atau MPG), dan harga bahan bakar saat ini, dan lihat liter atau galon yang dibutuhkan, total biaya, dan biaya per satuan jarak — plus saklar pulang-pergi yang menggandakan jarak untuk Anda.",
      "Sama berguna untuk anggaran komuter, membagi road trip antar teman, atau membandingkan harga sebuah pemutar jalur. Perhitungannya lokal di browser Anda, jadi tetap bekerja tanpa sinyal di pom bensin.",
    ],
    steps: [
      "Masukkan jarak satu arah dalam kilometer atau mil.",
      "Tambahkan konsumsi kendaraan Anda dan harga bahan bakar saat ini.",
      "Nyalakan pulang-pergi jika perlu dan baca total bahan bakar serta biayanya.",
    ],
    faqs: [
      {
        q: "Bagaimana mengonversi antara L/100 km dan MPG?",
        a: "Kedua skalanya saling berkebalikan: 235,2 dibagi angka MPG memberi L/100 km (galon AS), jadi 30 MPG ≈ 7,8 L/100 km dan 6 L/100 km ≈ 39,2 MPG. Kalkulator menerima angka mana pun yang ditampilkan dashboard Anda.",
      },
      {
        q: "Kenapa pemakaian bahan bakar nyata saya berbeda dari hasilnya?",
        a: "Angka konsumsi resmi mengasumsikan kecepatan stabil. Lalu lintas kota, start dingin, rak atap, akselerasi agresif, dan pendingin udara bisa mendorong pemakaian nyata 10–30% lebih tinggi, jadi perlakukan estimasinya sebagai lantai untuk perjalanan yang padat kota.",
      },
      {
        q: "Apakah kalkulator memasukkan tol atau perawatan?",
        a: "Tidak — ia menghitung bahan bakarnya saja. Untuk biaya per kilometer yang sejati, tambahkan tol dan bagikan item keausan (ban, servis, depresiasi) secara terpisah; banyak pengemudi menganggarkan tambahan 5–10 sen per km di luar bahan bakar.",
      },
    ],
  },
  "aspect-ratio-calculator": {
    name: "Kalkulator Aspect Ratio",
    tagline:
      "Diberi rasio seperti 16:9 dan satu dimensi, dapatkan lebar atau tinggi yang hilang seketika — plus preset dari 1:1 sampai 21:9 untuk video dan desain.",
    intro: [
      "Masukkan rasio — ketuk preset (1:1, 4:3, 3:2, 16:9, 16:10, 21:9) atau ketik angka kustom — lalu berikan lebar atau tinggi yang sudah diketahui. Dimensi yang hilang muncul seketika, bersama pasangannya yang diformat sebagai P×T dan rasio desimalnya.",
      "Pengubahan ukuran klasik tanpa distorsi: crop video, kontainer gambar responsif, format sensor dan film, penskalaan cetak, dan keputusan CSS object-fit semuanya tinggal di sini, dihitung lokal saat Anda mengetik.",
    ],
    steps: [
      "Pilih preset rasio atau ketik nilai lebar:tinggi Anda sendiri.",
      "Pilih dimensi mana yang sudah Anda ketahui — lebar atau tinggi.",
      "Masukkan nilai yang diketahui dan baca dimensi yang hilang.",
    ],
    faqs: [
      {
        q: "Bagaimana dimensi yang hilang dihitung?",
        a: "Dengan proporsi langsung: dimensi yang diketahui × (sisi target ÷ sisi rasio yang cocok). Untuk 16:9 dengan lebar 1920, tinggi = 1920 × 9 ÷ 16 = 1080. Hasil ditampilkan terbulatkan, dengan desimal persisnya di bawahnya.",
      },
      {
        q: "Kenapa 16:9 dan 16:10 begitu penting untuk layar?",
        a: "16:9 cocok dengan video (1920×1080, 3840×2160) dan kebanyakan monitor; 16:10 menambah ruang vertikal untuk dokumen dan kode (1920×1200). Memilih yang salah berarti letterboxing atau piksel meregang — alat ini menunjukkan persis apa yang dihasilkan tiap rasio.",
      },
      {
        q: "Bisakah memakai rasio desimal atau tak lazim?",
        a: "Bisa. Kedua kolom rasio menerima angka positif apa pun, jadi cinema scope 2,39:1, 1,85:1, crop sosial potret 4:5, atau ukuran sensor seperti 1,5:1 semuanya bekerja — matematis proporsinya identik.",
      },
    ],
  },
  "compound-interest-calculator": {
    name: "Kalkulator Bunga Majemuk",
    tagline:
      "Lihat bagaimana tabungan tumbuh dengan bunga majemuk — masukkan setoran, kontribusi bulanan, dan suku bunga untuk mendapat saldo akhir dan tabel tahunan.",
    intro: [
      "Bunga majemuk adalah bunga atas bunga: tiap periode saldo menghasilkan porsi suku bunga tahunan, dan setiap setoran yang Anda tambahkan mulai menghasilkan bunganya sendiri. Kalkulator ini menjalankan rekursi itu periode demi periode untuk setoran awal plus kontribusi bulanan rutin, dengan compounding bulanan, kuartalan, atau tahunan.",
      "Hasilnya saldo akhir, total yang Anda masukkan, dan bunga yang dihasilkan compounding — plus tabel tahunan agar Anda melihat persis kapan kurvanya mulai melengkung. Semuanya dihitung ulang langsung, dan rumus yang dipakai tercetak tepat di bawah angkanya, jadi Anda bisa memeriksanya terhadap proyeksi bank Anda sendiri.",
    ],
    steps: [
      "Masukkan setoran awal dan jumlah yang akan Anda tambahkan tiap bulan (0 untuk setoran sekali).",
      "Atur suku bunga tahunan, jumlah tahun, dan seberapa sering bunga di-compound.",
      "Pilih mata uang tampilan — nominal diformat untuk locale Anda.",
      "Baca saldo akhir, total kontribusi, dan bunga yang dihasilkan, lalu periksa tabel tahunannya.",
    ],
    faqs: [
      {
        q: "Rumus apa yang dipakai kalkulator ini?",
        a: "Rekursi saldo yang sama dengan yang dipakai bank untuk memproyeksikan tabungan: tiap periode, saldo ← (saldo + kontribusi) × (1 + r), di mana r = suku bunga tahunan ÷ periode per tahun (12 bulanan, 4 kuartalan, 1 tahunan). Kontribusi disetor di awal tiap periode, jadi menghasilkan bunga sejak periode itu. Contoh: 10.000 awal, 100/bulan pada 5% selama 10 tahun dengan compounding bulanan memberi saldo akhir 32.063,02 — 22.000,00 kontribusi dan 10.063,02 bunga.",
      },
      {
        q: "Kenapa saya mendapat hasil sedikit berbeda di kalkulator lain?",
        a: "Konvensi pewaktuannya berbeda. Sebagian alat memperlakukan kontribusi sebagai setoran akhir-periode (tidak menghasilkan bunga pada periode kedatangannya), sebagian mengasumsikan compounding harian, dan sebagian membulatkan tiap periode. Alat ini menyetor di awal tiap periode dan tidak pernah membulatkan langkah perantara; selisih 0,1% terhadap situs lain biasanya konvensi itu, bukan kesalahan.",
      },
      {
        q: "Apakah mencakup pajak, biaya, atau inflasi?",
        a: "Tidak — hasilnya pertumbuhan nominal pada suku bunga yang Anda masukkan. Pajak atas bunga, biaya akun, dan inflasi semuanya mengurangi imbal hasil nyata, jadi perlakukan saldo akhir sebagai batas atas dari yang benar-benar akan Anda pegang.",
      },
    ],
  },
  "random-name-picker": {
    name: "Pemilih Nama Acak",
    tagline:
      "Tempel daftar Anda, putar rodanya, dan biarkan undian acak kriptografis memilih pemenangnya — adil untuk kelas, undian, dan stand-up tim.",
    intro: [
      "Ketik atau tempel daftar nama, satu per baris, dan roda terisi segmen berwarna untuk masing-masing. Tekan SPIN dan ia melambat selama beberapa detik sebelum mendarat di pemenang, yang diumumkan dengan huruf besar dan tombol salin. Dua opsi menutup kebutuhan yang lazim: hapus nama duplikat sebelum undian, dan hapus pemenang setelah tiap undian agar tak ada yang menang dua kali.",
      "Pemilihannya bukan animasinya — pemenang diundi dari generator angka acak kriptografis browser Anda sebelum roda bahkan mulai berputar, jadi setiap nama punya peluang persis sama. Riwayat undian sesi mencatat semua yang terpilih sejauh ini, berguna saat Anda menelusuri satu kelas atau antrean hadiah.",
    ],
    steps: [
      "Tempel nama-nama Anda ke kotak, satu per baris (2 sampai 100 nama).",
      "Nyalakan penghapusan duplikat, atau penghapusan pemenang lampau, jika Anda membutuhkannya.",
      "Tekan SPIN dan tunggu rodanya berhenti.",
      "Baca pemenangnya, salin namanya jika perlu, dan periksa riwayat undian di bawahnya.",
    ],
    faqs: [
      {
        q: "Seberapa acak undiannya, sungguhan?",
        a: "Pemenang dipilih dengan crypto.getRandomValues, generator angka acak kriptografis browser Anda, memakai rejection sampling untuk menghindari bias modulo. Itu sumber yang sama yang dipakai browser untuk kunci keamanan — bukan jalan pintas pseudo-random — jadi setiap entri punya peluang identik. Animasi roda mendarat di pemenang yang sudah diundi; ia tidak bisa mengubah hasilnya.",
      },
      {
        q: "Berapa nama yang bisa ditampung roda?",
        a: "Dari 2 sampai 100. Nama dipotong dengan elipsis di roda agar segmennya tetap terbaca, tetapi kartu pemenang selalu menampilkan nama penuhnya. Sekitar melewati 60 nama, label dibuang sepenuhnya dari roda — undiannya sendiri tetap persis.",
      },
      {
        q: "Bisakah mengundi beberapa pemenang berturut-turut?",
        a: "Bisa. Aktifkan 'Hapus pemenang setelah tiap undian' dan tiap pilihan otomatis keluar dari daftar, jadi tak ada yang dipilih dua kali. Panel riwayat di bawah mencatat setiap undian sesi ini, berurutan, dengan penanda waktunya.",
      },
    ],
  },
  "qr-scanner": {
    name: "Pemindai Kode QR",
    tagline:
      "Dekode kode QR dari gambar apa pun atau langsung dari kamera Anda — dibaca lokal di browser, dengan output salin dan buka-sebagai-tautan tanpa unggahan.",
    intro: [
      "Letakkan screenshot atau foto kode QR dan dekoder membacanya langsung di halaman, menyorot sudut terdeteksi di atas gambarnya. Jika itu URL, Anda mendapat tombol salin plus buka tautan sekali klik; konten lainnya — kredensial WiFi, vCard, teks polos — keluar persis seperti terenkode, siap disalin.",
      "Lebih suka mengarahkan kamera ke kode? Mode langsung mengalirkan ke elemen video lokal dan menganalisis frame di memori sampai satu terdekode, lalu langsung menghentikan kamera. Karena kedua jalur berjalan sepenuhnya di browser Anda, gambar atau feed kamera tidak pernah diunggah ke server mana pun, dan tidak ada yang direkam.",
    ],
    steps: [
      "Pilih tab 'Dari gambar' dan letakkan gambar kode QR, atau ganti ke 'Kamera langsung'.",
      "Untuk kamera, tekan Mulai kamera, izinkan permintaan izinnya, dan bidik kodenya.",
      "Baca teks terdekode di kartu hasilnya.",
      "Salin, atau buka langsung jika tampak seperti tautan.",
    ],
    faqs: [
      {
        q: "Apakah gambar atau frame kamera saya meninggalkan perangkat?",
        a: "Tidak. Dekode berjalan di halaman ini dengan pustaka jsqr, dalam JavaScript: gambar yang diunggah dibaca dari piksel lokalnya dan frame kamera digambar ke canvas di memori lalu dianalisis di sana. Tidak ada yang diunggah, dicatat, atau disimpan, dan stream kamera dihentikan begitu kode ditemukan atau Anda menekan stop.",
      },
      {
        q: "Kameranya tidak mau menyala — apa yang salah?",
        a: "Paling sering browser memblokir izin kamera untuk situs ini; izinkan di bilah alamat dan tekan mulai lagi. Pemindaian langsung juga menuntut halaman https yang aman, dan jika perangkat sama sekali tidak punya kamera, alat ini memberi tahu alih-alih gagal diam-diam.",
      },
      {
        q: "Jenis konten QR apa yang bisa dibacanya?",
        a: "Kode QR standar mana pun: URL, teks polos, nomor telepon, string gabung WiFi, kontak vCard, string pembayaran UPI atau PIX, dan lainnya. Alat menampilkan konten mentah terdekodenya — untuk kode WiFi atau pembayaran, salin teksnya ke aplikasi yang mengonsumsi format itu.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* Pengembang / Utilitas — CSV ⇄ Excel, kontras, nilai                 */
  /* ------------------------------------------------------------------ */
  "csv-to-excel": {
    name: "CSV ke Excel",
    tagline:
      "Ubah CSV menjadi berkas .xlsx sungguhan langsung di peramban Anda — pemisah koma, titik koma, atau tab terdeteksi otomatis, tanda kutip dan baris baru tetap utuh.",
    intro: [
      "Tempel CSV atau jatuhkan berkas .csv dan unduh workbook Excel yang benar — bukan berkas teks yang ekstensinya diganti saja. Mesin mengikuti RFC 4180: field berkutip, kutip ganda, dan baris baru di dalam sel dibaca dengan benar, serta angka bersih (9.5, -3, 0) menjadi sel numerik sungguhan.",
      "Baris pertama dianggap header (bisa dimatikan; Column 1…N akan dibuat otomatis), nama sheet bebas Anda tentukan, dan ID seperti 007 tetap teks agar nol di depannya tidak hilang. Tidak ada data yang meninggalkan perangkat Anda.",
    ],
    steps: [
      "Tempel CSV ke kotak masukan atau jatuhkan berkas .csv.",
      "Periksa pemisah yang terdeteksi dan opsi baris header.",
      "Ganti nama sheet bila Sheet1 kurang pas.",
      "Unduh .xlsx dan buka di Excel, Numbers, atau Google Sheets.",
    ],
    faqs: [
      {
        q: "Apakah angka saya menjadi angka sungguhan di Excel?",
        a: "Ya — sel dengan literal numerik bersih (9.5, -3, 0) ditulis sebagai sel numerik sehingga SUM dan grafik langsung jalan. Nilai seperti 007 atau 1e3 sengaja tetap teks karena mengonversinya akan mengubah maknanya.",
      },
      {
        q: "CSV saya dipisah titik koma, perlu diatur?",
        a: "Tidak. Pemisah dideteksi otomatis dengan menghitung kandidat di luar tanda kutip; Anda juga bisa memilihnya manual. Koma di dalam sel, kutip ganda, dan baris baru semuanya dipertahankan saat konversi.",
      },
    ],
  },
  "excel-to-csv": {
    name: "Excel ke CSV",
    tagline:
      "Ubah workbook .xlsx atau .xls apa pun menjadi CSV yang rapi — pilih sheet dan pemisahnya lalu unduh. Kutip, koma, dan baris baru di-escape dengan benar.",
    intro: [
      "Jatuhkan berkas .xlsx, .xlsm, atau .xls dan dapatkan CSV standar sesuai RFC 4180. Bila workbook punya beberapa sheet, Anda memilih yang diekspor — CSV tak bisa menyimpan beberapa sheet, jadi satu sheet per berkas adalah pemetaan yang jujur. Angka keluar dengan nilai yang ditampilkan lembar kerja.",
      "Hasilnya hanya mengutip sel yang memang perlu, menggandakan kutip di dalam, dan mempertahankan baris baru dalam sel — sehingga mudah diimpor kembali ke Excel, basis data, atau skrip tanpa kejutan. Salin langsung atau unduh sebagai UTF-8 ber-BOM agar Excel membukanya dengan benar.",
    ],
    steps: [
      "Jatuhkan berkas .xlsx, .xlsm, atau .xls ke area jatuhkan.",
      "Bila ada beberapa sheet, pilih yang ingin diekspor.",
      "Pilih koma, titik koma, atau tab sebagai pemisah keluaran.",
      "Salin CSV-nya atau unduh sebagai .csv UTF-8.",
    ],
    faqs: [
      {
        q: "Sheet mana yang dikonversi?",
        a: "Sheet pertama secara bawaan. Bila workbook berisi beberapa sheet, pemilih muncul di atas pratinjau; setiap ekspor mencakup tepat satu sheet karena format CSV tidak bisa menyimpan lebih.",
      },
      {
        q: "Apa yang terjadi pada rumus dan pemformatan?",
        a: "Anda mendapat nilai terakhir yang dihitung sebagaimana sel menampilkannya — bukan rumusnya. Sel yang menampilkan 1.234,50 diekspor dengan nilai itu, dan format seperti simbol mata uang tetap sebagaimana tampil.",
      },
    ],
  },
  "contrast-checker": {
    name: "Pemeriksa Kontras",
    tagline:
      "Hitung rasio kontras WCAG antara dua warna beserta hasil AA dan AAA untuk teks normal dan besar, lengkap dengan pratinjau langsung. Semuanya berjalan di peramban Anda.",
    intro: [
      "Masukkan warna teks dan warna latar — hex seperti #333 atau #1F2937, atau rgb()/rgba() — dan baca rasio kontras WCAG dengan dua desimal, plus vonis langsung untuk empat ambang penting: AA dan AAA, teks normal dan besar. Pratinjau langsung menampilkan paragraf dan judul besar dengan warna aslinya.",
      "Perhitungan memakai rumus luminans relatif resmi WCAG 2.x — sama dengan pemeriksa milik W3C — jadi 4.5 di sini adalah 4.5 di mana pun. Presetnya mencakup pasangan abu-abu 4.54:1 yang menunjukkan betapa tipisnya garis AA.",
    ],
    steps: [
      "Ketik nilai hex atau rgb(), atau pakai pemilih warna, untuk warna teks.",
      "Lakukan hal yang sama untuk warna latar.",
      "Baca rasio dan vonis AA / AAA, atau sentuh salah satu preset.",
      "Nilai pasangannya dengan mata Anda sendiri di blok pratinjau.",
    ],
    faqs: [
      {
        q: "Rasio kontras berapa yang dibutuhkan untuk lulus?",
        a: "Menurut WCAG 2.x: teks normal butuh 4.5:1 untuk AA dan 7:1 untuk AAA. Teks besar — minimal 24 px, atau 18.7 px tebal — butuh 3:1 untuk AA dan 4.5:1 untuk AAA. Komponen antarmuka dan grafis butuh 3:1.",
      },
      {
        q: "Bagaimana rasio itu dihitung?",
        a: "Setiap warna dilinearkan dari sRGB lalu digabung menjadi luminans relatif L = 0.2126·R + 0.7152·G + 0.0722·B; rasionya (L terang + 0.05) / (L gelap + 0.05) — persis rumus spesifikasi WCAG 2.x. Alfa rgba() di bawah 1 diratakan ke putih sebelum dihitung.",
      },
    ],
  },
  "grade-calculator": {
    name: "Kalkulator Nilai",
    tagline:
      "Kalkulator nilai berbobot atau berbasis poin: tambahkan tugas, lihat nilai dan huruf Anda secara langsung, dan cari tahu persis skor yang dibutuhkan di ujian akhir.",
    intro: [
      "Tambahkan tiap tugas dengan nilainya, nilai maksimum, dan (pada mode berbobot) bobot persentasenya — nilai dan huruf Anda diperbarui langsung. Mode poin hanya melihat poin perolehan terhadap poin maksimum, seperti kebanyakan kuliah sains menilai.",
      "Kalkulator ujian akhir bawaan menjawab pertanyaan yang sebenarnya penting: bila ujian akhir bernilai X% atau X poin, skor berapa yang perlu dicapai? Ia berkata jujur bila target sudah tercapai atau mustahil secara matematis, dan skalanya bisa diganti: A–F 10 tingkat, plus/minus, lulus / tidak, atau ambang sendiri.",
    ],
    steps: [
      "Tambahkan satu baris per tugas: nama (opsional), nilai, maksimum, dan bobot pada mode berbobot.",
      "Beralihlah antara Berbobot dan Poin sesuai cara kursus Anda menilai.",
      "Masukkan bobot atau poin ujian akhir dan persentase target Anda.",
      "Baca skor ujian akhir yang dibutuhkan, atau pilih skala huruf yang diinginkan.",
    ],
    faqs: [
      {
        q: "Apa bedanya mode berbobot dan mode poin?",
        a: "Mode berbobot memberi tiap tugas bobot persen dan menghitung Σ(bobot × nilai ÷ maksimum) ÷ Σbobot. Mode poin mengabaikan bobot: poin perolehan dibagi poin maksimum. Tugas 90/100 bernilai setara kuis 45/50 pada mode poin, tetapi hanya sebesar bobotnya pada mode berbobot.",
      },
      {
        q: "Bagaimana kalau bobot saya tidak berjumlah 100%?",
        a: "Tidak masalah. Nilai saat ini dinormalisasi terhadap bobot yang benar-benar Anda masukkan, sehingga kursus yang baru setengah dinilai tetap adil. Perhitungan ujian akhir menumpuk bobot ujian di atas bobot yang sudah dinilai, persis seperti rencana perkuliahan. Hasil di atas 100% berarti target tak terjangkau; negatif berarti sudah aman.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* IMAGE                                                               */
  /* ------------------------------------------------------------------ */
  "image-border": {
    name: "Bingkai Gambar",
    tagline:
      "Tambahkan bingkai warna solid atau transparan di sekeliling satu gambar atau satu batch penuh — pratinjau langsung, keluaran PNG atau JPG, di browser Anda.",
    intro: [
      "Bingkai membingkai tangkapan layar, foto produk, dan avatar tanpa membuka editor. Letakkan satu gambar atau satu batch penuh, geser slider lebar, dan pilih gaya isian: kanvas mengembang ke luar, jadi tak satu piksel pun dari aslinya terpotong atau diskalakan ulang.",
      "Isian transparan menjaga bingkainya tembus pandang pada keluaran PNG — berguna untuk stiker dan potongan di latar apa pun. Warna solid bekerja di mana saja, termasuk JPG, dan setiap berkas diproses di perangkat Anda.",
    ],
    steps: [
      "Letakkan satu gambar atau satu batch penuh.",
      "Geser slider lebar bingkai dan saksikan pratinjau langsungnya.",
      "Pilih isian transparan atau warna solid, serta keluaran PNG atau JPG.",
      "Beri bingkai pada semua gambar dan unduh tiap hasil, atau ambil semuanya dalam satu ZIP.",
    ],
    faqs: [
      {
        q: "Apakah bingkai mengecilkan atau memotong gambar Anda?",
        a: "Tidak. Kanvas tumbuh sebesar dua kali lebar bingkai — satu bingkai di tiap sisi — dan gambar Anda ditempatkan di dalamnya dalam ukuran penuh. Tidak ada yang terpotong, diskalakan, atau digeser.",
      },
      {
        q: "Kapan sebaiknya memilih bingkai transparan?",
        a: "Isian transparan hanya bermakna pada keluaran PNG: bingkai tetap tembus pandang sehingga gambar cocok di latar apa pun. JPG tak punya kanal alpha, jadi di sana bingkai diisi warna solid pilihan Anda.",
      },
      {
        q: "Mengapa JPG tidak tersedia dengan isian transparan?",
        a: "JPG tak bisa menyimpan transparansi — saat menyimpan, bingkainya akan putih. Alat beralih ke PNG secara otomatis setiap kali isian transparan dipilih; pilih opsi Warna jika Anda ingin JPG.",
      },
    ],
  },
  "image-splitter": {
    name: "Pecah Gambar",
    tagline:
      "Iris satu gambar menjadi kisi rapi baris × kolom berisi petak PNG — pratinjau kisi langsung, unduhan ZIP, semuanya diproses lokal di browser Anda.",
    intro: [
      "Potong gambar besar menjadi petak kisi untuk kisi Instagram, tata letak cetak, sprite sheet, atau langkah presentasi. Pilih 2–6 baris dan 2–6 kolom, saksikan kisi menempel di gambar Anda, lalu ekspor tiap petak sebagai PNG lossless.",
      "Petak dari gambar yang sama mempertahankan posisi pikselnya, sehingga potongannya menyusun ulang dengan sempurna. Saat ukuran tak habis dibagi, petak reguler memakai ukuran piksel bulat dan baris serta kolom terakhir menyerap sisanya — tak ada yang diregangkan.",
    ],
    steps: [
      "Letakkan satu gambar.",
      "Atur jumlah baris dan kolom (2–6 masing-masing) — pratinjau menampilkan kisi.",
      "Iris menjadi petak dan periksa tiap potongan.",
      "Unduh petak satu per satu atau semuanya dalam satu ZIP.",
    ],
    faqs: [
      {
        q: "Apa yang terjadi bila ukuran tak habis dibagi kisi?",
        a: "Petak reguler mendapat floor(lebar ÷ kolom) × floor(tinggi ÷ baris) piksel, dan baris serta kolom terakhir menyerap sisanya. Gambar 305 × 205 pada 3 kolom × 2 baris menghasilkan petak 101 × 102 px dengan kolom terakhir selebar 103 px. Tiap petak berjumlah piksel bulat — tanpa peregangan, tanpa celah.",
      },
      {
        q: "Dalam urutan apa petak dinamai?",
        a: "Baris demi baris, kiri ke kanan: foto-r1c1.png, foto-r1c2.png … foto-r3c4.png. Akhiran rNcM memberi tahu tepat di mana tiap petak berada, sehingga penyusunan ulang jadi sepele.",
      },
      {
        q: "Mengapa keluaran PNG?",
        a: "PNG lossless, jadi petak mempertahankan piksel sumber yang presisi. Itu penting ketika potongan akan disatukan kembali atau dipakai sebagai sprite.",
      },
    ],
  },
  "crop-circle-image": {
    name: "Potong Melingkar",
    tagline:
      "Potong satu gambar atau satu batch penuh menjadi lingkaran terpusat bersudut transparan — slider pengecil, pratinjau langsung, keluaran PNG lossless.",
    intro: [
      "Avatar melingkar, foto profil, lencana, dan stiker semuanya berawal dari potongan melingkar. Alat memusatkan lingkaran pada tiap gambar, mempertahankan bagian dalamnya, dan membuang sudutnya sebagai transparansi — diameter berawal dari sisi terpendek, dan slider mengecilkannya dalam persen bila Anda ingin margin.",
      "Keluaran selalu PNG agar sudutnya benar-benar transparan, bukan putih. Letakkan satu batch penuh untuk mengonversi banyak gambar sekaligus, pratinjau yang pertama secara langsung, dan unduh tiap lingkaran satu per satu.",
    ],
    steps: [
      "Letakkan satu gambar atau satu batch penuh.",
      "Geser slider pengecil bila Anda ingin lingkaran lebih kecil dari sisi terpendek penuh.",
      "Periksa pratinjau langsung gambar pertama.",
      "Potong semua gambar menjadi lingkaran dan unduh tiap PNG.",
    ],
    faqs: [
      {
        q: "Apa yang menentukan ukuran lingkaran?",
        a: "Secara bawaan diameter sama dengan sisi terpendek gambar: gambar persegi menjadi lingkaran penuh, dan persegi panjang dipotong pada lingkaran terpusat terbesar yang muat. Slider pengecil mengurangi diameter itu dalam persen.",
      },
      {
        q: "Apakah sudutnya putih?",
        a: "Tidak — keluarannya PNG dengan kanal alpha sungguhan, sehingga area di luar lingkaran transparan penuh dan hasilnya duduk bersih di latar mana pun.",
      },
      {
        q: "Apakah gambar saya dikodekan ulang dan mutunya menurun?",
        a: "Piksel di dalam lingkaran disalin apa adanya ke PNG lossless. Hanya area di luar yang hilang; tidak ada di dalamnya yang diskalakan ulang atau dikompresi ulang.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* DEVELOPER                                                           */
  /* ------------------------------------------------------------------ */
  "base64-image": {
    name: "Gambar Base64",
    tagline:
      "Ubah gambar menjadi data URL base64 dan sebaliknya — pratinjau, validasi, unduh, lengkap dengan perbandingan ukuran yang tepat. Semuanya di browser Anda.",
    intro: [
      "Letakkan PNG, JPEG, GIF, WebP, atau SVG dan dapatkan seketika data:image/…;base64,… siap tempel ke CSS, HTML, atau JSON inline. Alat menampilkan ukuran berkas asli di samping ukuran teks hasilnya, jadi Anda melihat overhead ~33% dari base64 sebelum memutuskan menyisipkan.",
      "Tempel sebuah data URL dan tampilan sebaliknya mendekodenya: gambar dipratinjau, MIME yang dinyatakan diperiksa terhadap byte aslinya, dan tombol unduh menyimpannya kembali sebagai berkas. base64 tidak valid atau tipe non-gambar gagal dengan pesan yang jelas, bukan pratinjau rusak.",
    ],
    steps: [
      "Letakkan gambar di panel (atau tempel dari papan klip) untuk mengodekannya.",
      "Salin data URL — atau hanya muatan base64-nya — dan periksa perbandingan ukuran sebelum menyisipkan.",
      "Beralihlah ke tab dekode, tempel data URL gambar apa pun, lalu pratinjau atau unduh.",
    ],
    faqs: [
      {
        q: "Kapan mengemas gambar sebagai data URL menguntungkan?",
        a: "Untuk ikon kecil, avatar, dan placeholder pemuatan. Base64 membuat teks ~33% lebih besar daripada berkas biner, jadi di bawah beberapa kilobita Anda biasanya menghemat satu permintaan HTTP; untuk foto, overhead hampir selalu lebih berat.",
      },
      {
        q: "Mengapa versi base64 lebih besar dari berkas saya?",
        a: "Base64 mengodekan setiap 3 byte sebagai 4 karakter teks — penggelembungan tetap 33%, ditambah prefiks data:image/…;base64,. Tidak ada yang dikompresi atau hilang; itu sekadar representasi teks yang aman dari byte yang sama.",
      },
      {
        q: "Format apa saja yang bisa ditangani pendekoder?",
        a: "Apa pun yang browser Anda mampu gambar: PNG, JPEG, GIF, WebP, SVG, BMP, AVIF, dan lainnya. Alat memverifikasi bahwa muatan adalah base64 valid, bahwa MIME yang dinyatakan bertipe gambar, dan memperingatkan Anda saat magic byte berkas tidak cocok dengan tipe yang dinyatakan.",
      },
    ],
  },
  "html-to-markdown": {
    name: "HTML ke Markdown",
    tagline:
      "Ubah HTML menjadi Markdown bersih sambil mengetik — heading, daftar, tautan, gambar, dan kode, dengan heading ATX atau Setext serta penanda butir pilihan Anda.",
    intro: [
      "Tempel markup dari halaman web, ekspor CMS, atau email dan terima Markdown yang mudah dibaca seketika. Konversinya ditangani turndown, pustaka standar HTML-ke-Markdown: heading, penekanan, tautan, gambar, daftar berurutan dan tak berurutan, kutipan blok, serta blok kode semuanya dipetakan ke padanannya di Markdown.",
      "Dua opsi kecil mencakup sebagian besar panduan gaya: heading bergaya ATX (# Heading) atau Setext (digarisbawahi), dan memilih -, *, atau + sebagai penanda daftar tak berurutan. Hasilnya diperbarui langsung saat Anda mengetik atau mengubah opsi.",
    ],
    steps: [
      "Tempel HTML Anda ke panel masukan.",
      "Markdown muncul langsung — sesuaikan gaya heading atau penanda jika panduan gaya Anda menghendaki lain.",
      "Salin Markdown atau unduh sebagai berkas .md.",
    ],
    faqs: [
      {
        q: "HTML mana yang dikonversi, dan apa yang terjadi pada sisanya?",
        a: "Markup dokumen standar — heading, paragraf, daftar, tautan, gambar, penekanan, kode, kutipan blok, dan garis horizontal — terkonversi penuh. Elemen tanpa padanan Markdown, seperti tabel dan formulir, diratakan menjadi konten teksnya.",
      },
      {
        q: "Apa bedanya heading ATX dan Setext?",
        a: "ATX menulis heading dengan tanda pagar di depan (## Heading); Setext menggarisbawahinya dengan === untuk H1 atau --- untuk H2. Setext hanya mendukung dua tingkat, jadi heading yang lebih dalam selalu kembali ke pagar ATX.",
      },
      {
        q: "Apakah HTML saya keluar dari browser?",
        a: "Tidak. Konversi berjalan lokal dengan turndown di browser Anda — tidak ada yang diunggah, bahkan saat mengunduh berkas .md.",
      },
    ],
  },
  "xml-to-json": {
    name: "XML ke JSON",
    tagline:
      "Konversi XML menjadi JSON di browser Anda — atribut menjadi kunci @, elemen berulang menjadi array, dan masukan cacat mendapat galat jelas per baris.",
    intro: [
      "Tempel entri sitemap, item RSS, respons SOAP, atau berkas konfigurasi dan terima JSON terformat seketika. Konversi memakai fast-xml-parser dengan atribut dipertahankan: setiap atribut tetap menjadi kunci berawalan @, elemen sebaya yang berulang mengerucut menjadi array, dan konten teks berada di bawah #text ketika elemen juga punya atribut.",
      "Masukan cacat tidak pernah menghasilkan setengah konversi hasil menebak: dokumen divalidasi lebih dulu, dan galat menunjuk ke baris yang bersalah — tag penutup yang hilang beres dalam satu baris.",
    ],
    steps: [
      "Tempel XML Anda ke panel kiri.",
      "JSON terformat muncul di kanan saat Anda mengetik.",
      "Salin JSON-nya saat sudah pas.",
    ],
    faqs: [
      {
        q: "Bagaimana atribut direpresentasikan di JSON?",
        a: 'Setiap atribut menjadi kunci berawalan @ — <book id="7"> kembali sebagai { "@id": "7" }. Nilai atribut tetap string, sementara teks yang tampak seperti angka atau boolean dikonversi ke tipe JSON-nya.',
      },
      {
        q: "Apa yang terjadi pada elemen berulang?",
        a: "Elemen sebaya dengan nama sama menjadi array JSON. Ingat: elemen tunggal tetap nilai biasa, jadi periksa apakah itu array bila konsumen Anda mengharapkan daftar.",
      },
      {
        q: "Apakah XML saya diunggah ke mana pun?",
        a: "Tidak. Penguraian terjadi lokal di browser Anda dengan fast-xml-parser — tidak ada yang meninggalkan perangkat Anda.",
      },
    ],
  },
  "json-to-xml": {
    name: "JSON ke XML",
    tagline:
      "Konversi JSON menjadi XML terbentuk baik dengan atribut, elemen berulang, dan escaping yang benar — bolak-balik dengan alat XML ke JSON kami. Semua lokal.",
    intro: [
      'Tempel JSON dan terima dokumen XML terformat dengan deklarasi yang benar dan indentasi 2 spasi. Objek menjadi elemen, array mengulang kuncinya sekali per butir, dan anggota "@key" menjadi atribut XML — kebalikan persis dari konverter XML ke JSON kami, data bisa pergi dan kembali.',
      "Semuanya dilepaskan karakternya sesuai aturan (& < > \" ') dan kunci sembarangan dipaksa menjadi nama elemen yang sah, sehingga keluarannya selalu XML yang terbentuk baik. Nilai yang tak bisa XML ungkapkan — null, array kosong — menjadi elemen kosong, dan batasannya dijabarkan di bawah.",
    ],
    steps: [
      "Tempel JSON Anda ke kotak masukan.",
      "XML muncul langsung — tentukan nama elemen akar kustom bila perlu.",
      "Salin hasilnya atau unduh sebagai berkas .xml.",
    ],
    faqs: [
      {
        q: "Bagaimana atribut dan array dipetakan ke XML?",
        a: 'Kunci yang diawali @ (atau @_) menjadi atribut elemen induknya, dan "#text" menjadi konten teks elemen — sama dengan yang dikeluarkan alat XML ke JSON kami. Array mengulang elemen yang sama per butir; array JSON di puncak dibungkus <root><item>…</item></root> karena dokumen butuh satu akar.',
      },
      {
        q: "Apa saja batas pemetaan JSON ⇄ XML?",
        a: "XML tidak punya notasi untuk null maupun array kosong — keduanya runtuh menjadi elemen kosong. Konten campuran (teks berseling dengan elemen anak) tidak bisa bolak-balik: teks disimpan sebagai satu blok. Dan saat mengurai kembali, elemen berulang yang sendirian menjadi nilai biasa, bukan array satu butir.",
      },
      {
        q: "Apa yang terjadi pada kunci yang bukan nama XML sah?",
        a: 'Kunci itu dipaksa: karakter ilegal menjadi garis bawah dan kunci yang diawali angka mendapat garis bawah di depan ("2fa" → <_2fa>). Huruf CJK dan beraksen sudah merupakan nama XML sah dan tetap apa adanya.',
      },
    ],
  },
  "cron-explainer": {
    name: "Penjelajah cron",
    tagline:
      "Ubah ekspresi cron apa pun menjadi bahasa sederhana: rincian per bidang, lima waktu eksekusi berikutnya di zona waktu Anda, dan preset sekali klik.",
    intro: [
      "Ekspresi cron terdiri dari lima atau enam bidang samar yang menentukan kapan pekerjaan berjalan — satu karakter yang salah bisa membuatnya tak pernah berjalan, atau justru berjalan tepat pukul 3 pagi setiap hari Minggu. Tempelkan sebuah ekspresi: alat ini menjelaskan setiap bidang dengan bahasa lugas (menit, jam, hari dalam bulan, bulan, hari dalam minggu, ditambah detik bila ada), lalu menampilkan lima waktu eksekusi berikutnya agar Anda yakin jadwalnya benar-benar seperti yang Anda bayangkan.",
      "Validasinya jujur dan langsung: nilai di luar jangkauan, rentang terbalik, dan ekstensi Quartz yang tak didukung seperti L, W dan # menghasilkan pesan galat yang spesifik dan mudah dipahami. Lima preset umum — setiap menit, setiap jam, tengah malam setiap hari, pukul 9 pada hari kerja, dan tiap kuartal — terisi sekali klik.",
    ],
    steps: [
      "Ketik ekspresi cron atau klik sebuah preset untuk memulai dari nilai yang teruji.",
      "Baca rincian per bidang dalam bahasa sederhana.",
      "Periksa lima waktu eksekusi berikutnya sambil beralih antara waktu lokal dan UTC.",
      "Perbaiki hal yang mengejutkan di crontab, penjadwal, atau konfigurasi CI Anda.",
    ],
    faqs: [
      {
        q: "Apa bedanya cron standar dengan sintaks Quartz?",
        a: "Cron Unix standar (dan alat ini) memakai 5 bidang: menit, jam, hari dalam bulan, bulan, hari dalam minggu — menjadi 6 bila bidang pertama adalah detik. Quartz menambahkan detik secara bawaan, bidang ketujuh untuk tahun, serta ekstensi seperti L (hari terakhir), W (hari kerja terdekat) dan # (hari ke-n dalam sebulan, mis. MON#2). Ekstensi khusus Quartz ini tidak dicakup di sini; semua yang standar — angka, nama seperti JAN dan MON, rentang, daftar, dan langkah — dicakup.",
      },
      {
        q: "Saya mengisi hari dalam bulan dan hari dalam minggu sekaligus — mengapa eksekusinya lebih sering dari perkiraan?",
        a: "cron klasik menggabungkan keduanya dengan ATAU: bila kedua bidang dibatasi (tak satu pun *), hari yang cocok dengan salah satunya sudah memicu pekerjaan. «0 0 1 * MON» berjalan pada tanggal 1 dan setiap hari Senin. Untuk menuntut kedua syarat sekaligus, ekspresinya harus disusun lain — melihat lima eksekusi berikutnya di sini membuat perilakunya langsung terlihat.",
      },
    ],
  },
  "gradient-generator": {
    name: "Pembuat gradien CSS",
    tagline:
      "Campur dua hingga lima warna menjadi gradien CSS linear, radial, atau konik dengan pratinjau langsung, kode siap tempel, dan palet harmonis sekali klik.",
    intro: [
      "Pilih dua hingga lima warna, tentukan linear, radial atau konik, lalu geser sudutnya — pratinjau diperbarui saat Anda mengetik dan CSS selalu sejauh satu salinan. Biarkan posisi sebuah pemberhenti kosong dan ia ditempatkan otomatis seperti yang CSS lakukan; tetapkan persentase persis untuk batas tegas dan perpaduan yang bergeser dari pusat.",
      "Keluarannya adalah blok produksi sesungguhnya: baris warna solid cadangan untuk peramban lama, baris berawalan -webkit- untuk mesin WebKorban tua, dan sintaks standar di baris terakhir. Tombol harmonisasi acak memutar rona palet Anda di ruang HSL sehingga setiap pengocokan tetap seimbang, bukan saling bertabrakan.",
    ],
    steps: [
      "Atur dua hingga lima warna, atau mulai dari palet preset.",
      "Pilih jenis gradien, lalu sudut atau bentuknya; kunci posisi bila perlu.",
      "Salin blok CSS dan tempelkan ke lembar gaya Anda.",
    ],
    faqs: [
      {
        q: "Mengapa CSS menyertakan baris berawalan -webkit-?",
        a: "Itu baris kompatibilitas untuk peramban WebKit lama (sekitar era Safari 5-6) yang hanya memahami -webkit-linear-gradient. Semua peramban dalam dekade terakhir membaca baris standar, jadi Anda boleh menghapus baris berawalan itu bila tidak perlu mendukung versi tersebut — menyimpannya hanya satu baris, menghapusnya tanpa biaya.",
      },
      {
        q: "Apa arti sudut pada gradien linear?",
        a: "Itu arah bergeraknya gradien, diukur searah jarum jam dari atas: 0deg dari bawah ke atas, 90deg dari kiri ke kanan, 180deg dari atas ke bawah. Alat ini menormalkan sudut apa pun (−45 menjadi 315) dan aturan arah terbalik pada sintaks lama sudah ditangani di baris -webkit-.",
      },
    ],
  },
  "compress-image-to-size": {
    name: "Kompres gambar ke ukuran tertentu",
    tagline:
      "Perkecil gambar ke anggaran KB yang presisi: pencarian biner atas kualitas JPEG atau WebP mencapai batas format — massal, luring, tanpa unggahan.",
    intro: [
      "Formulir unggah, batas surel, dan kolom CMS menuntut ukuran, bukan geseran kualitas. Ketik pagarnya dalam KB, jatuhkan gambar Anda, dan alat ini melakukan pencarian biner atas kualitas penyandi hingga berkas berada di bawah garis — melaporkan kualitas persis dan skala yang dipakai untuk tiap gambar, sekaligus dalam batch.",
      "Alat ini jujur pada fisika: bila batas bawah kualitas masih melewati target Anda, gambarnya diperkecil bertahap; dan bila foto besar yang penuh detail memang tak mungkin masuk anggaran sekecil itu, Anda menerima hasil terdekat yang ditandai jelas 'melebihi target' — bukan gambar yang diam-diam rusak.",
    ],
    steps: [
      "Jatuhkan satu gambar atau seluruh batch.",
      "Ketik ukuran target dalam KB dan pilih JPEG atau WebP.",
      "Tekan kompres — setiap baris menampilkan ukuran yang dicapai, kualitas, dan skala yang dipakai.",
      "Unduh hasil yang lolos, atau salinan terdekat yang jujur.",
    ],
    faqs: [
      {
        q: "Mengapa tidak semua gambar bisa mencapai target sekecil itu?",
        a: "Foto tetap menyimpan informasi bahkan pada kualitas terendah, sehingga gambar 2 MB beresolusi 4000 piksel hampir pasti tak akan pernah muat dalam 10 KB. Ketika kualitas menyentuh dasarnya, alat memperkecil piksel juga — resolusi adalah tuas kedua penekan byte. Bila target tetap tak terjangkau, Anda menerima hasil terdekat dengan penanda eksplisit, bukan berkas yang rusak diam-diam.",
      },
      {
        q: "Sebaiknya pilih JPEG atau WebP?",
        a: "Pada kualitas visual yang sama WebP biasanya 20–30% lebih kecil daripada JPEG, jadi dengan anggaran ketat ia sering lolos dengan kehilangan lebih sedikit. JPEG adalah pilihan aman ketika berkas harus bisa dibuka di mana saja, termasuk perangkat lunak lama tanpa dukungan WebP.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* CALCULATORS — FINANCE, HEALTH, DAILY LIFE                            */
  /* ------------------------------------------------------------------ */
  "mortgage-calculator": {
    name: "Kalkulator KPR",
    tagline:
      "Hitung cicilan bulanan KPR — pokok dan bunga plus pajak, asuransi, dan iuran komunitas — dengan jumlah pinjaman, total bunga, dan tabel amortisasi tahunan.",
    intro: [
      "Masukkan harga rumah, uang muka, suku bunga, dan tenor untuk mendapat cicilan bulanan pokok-bunga dari rumus amortisasi standar yang dipakai bank. Tambahkan pajak properti tahunan, asuransi tahunan, dan iuran komunitas bulanan untuk melihat jumlah PITI penuh yang biasanya dikutip pemberi pinjaman.",
      "Jumlah pinjaman, total bunga sepanjang masa pinjaman, dan tabel amortisasi tahun demi tahun diperbarui langsung saat Anda mengetik, jadi Anda membandingkan uang muka 20% dengan 10%, atau tenor 15 tahun dengan 30, dalam hitungan detik.",
    ],
    steps: [
      "Masukkan harga rumah dan uang muka, sebagai persen atau nominal.",
      "Atur suku bunga tahunan dan tenor dalam tahun.",
      "Opsional tambahkan pajak properti tahunan, asuransi tahunan, dan iuran komunitas bulanan.",
      "Baca cicilan pokok-bunga bulanan, total PITI, dan tabel amortisasi tahunan.",
    ],
    faqs: [
      {
        q: "Rumus apa yang dipakai kalkulator KPR ini?",
        a: "Rumus amortisasi suku bunga tetap standar: M = L × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1), dengan L jumlah pinjaman (harga dikurangi uang muka), r suku bunga bulanan (tahunan ÷ 12 ÷ 100) dan n jumlah bulan. Contoh: rumah 300.000 dengan uang muka 20% pada bunga 6% selama 30 tahun menghasilkan cicilan pokok-bunga sekitar 1.438,92 — suku bunga yang Anda masukkan hanya contoh, bukan penawaran.",
      },
      {
        q: "Apa arti PITI?",
        a: "Principal, Interest, Taxes, dan Insurance — empat bagian tipikal pembayaran tempat tinggal bulanan. Alat ini menambahkan seperdua belas pajak dan asuransi tahunan yang Anda masukkan, plus iuran komunitas, ke cicilan pokok-bunga. Apakah pajak dan asuransi dititipkan di escrow tergantung pemberi pinjaman.",
      },
      {
        q: "Kenapa saya membayar begitu banyak bunga di tahun-tahun awal?",
        a: "Bunga tiap bulan dikenakan pada saldo berjalan, yang paling besar di awal. Tabel amortisasi memperlihatkan titik baliknya: cicilan awal hampir seluruhnya bunga, dan di tahun-tahun akhir hampir seluruhnya pokok. Karena itu pelunasan pokok di awal pinjaman menghemat bunga paling banyak.",
      },
    ],
  },
  "salary-to-hourly": {
    name: "Kalkulator Gaji ke Upah Per Jam",
    tagline:
      "Ubah gaji tahunan menjadi upah per jam, per hari, per minggu, per dua minggu, dan bulanan — dan lihat upah per jam yang disesuaikan setelah hari tak berbayar dihitung.",
    intro: [
      "Masukkan gaji tahunan dengan jadwal biasa Anda — jam per minggu dan minggu per tahun — dan kalkulator memecahnya ke satuan yang dipakai lowongan dan slip gaji: per jam, per hari, per minggu, per dua minggu, dan bulanan. Standar 40 jam seminggu selama 52 minggu sudah terisi.",
      "Jika Anda mengambil hari tak berbayar, upah per jam yang disesuaikan menunjukkan berapa gaji sama itu per jam yang benar-benar dikerjakan, karena setiap hari tak berbayar menghapus seperlima minggu kerja dari setahun.",
    ],
    steps: [
      "Ketik gaji tahunannya.",
      "Atur jam per minggu dan minggu per tahun (bawaan 40 dan 52).",
      "Tambahkan hari tak berbayar per tahun, jika ada.",
      "Baca upah per jam dan padanan harian, mingguan, dua mingguan, dan bulanan.",
    ],
    faqs: [
      {
        q: "Bagaimana upah per jam dihitung?",
        a: "Per jam = gaji tahunan ÷ (jam per minggu × minggu per tahun). Dengan bawaan 40 jam selama 52 minggu, gaji 52.000 menjadi tepat 25,00 per jam. Upah harian memakai minggu 5 hari, upah mingguan adalah gaji tahunan dibagi minggu, dua mingguan adalah dua kalinya, dan bulanan adalah gaji tahunan dibagi 12.",
      },
      {
        q: "Bagaimana hari tak berbayar mengubah hasil?",
        a: "Setiap hari tak berbayar menghapus seperlima minggu kerja, jadi 10 hari memendekkan tahun menjadi sekitar 50 minggu kerja. Upah yang disesuaikan membagi gaji yang sama dengan jam yang benar-benar dikerjakan: 52.000 pada minggu 40 jam dengan 10 hari tak berbayar setara 26,00 per jam. Total mingguan dan bulanan tetap menampilkan gaji yang disebutkan.",
      },
      {
        q: "Apakah pajak dan potongan termasuk?",
        a: "Tidak — semua angka adalah bruto sebelum pajak penghasilan, iuran sosial, dan potongan lain. Gaji bersih tergantung lapisan pajak dan lokasi Anda, jadi perlakukan hasil ini sebagai angka bruto untuk perbandingan.",
      },
    ],
  },
  "hourly-to-salary": {
    name: "Kalkulator Upah Per Jam ke Gaji",
    tagline:
      "Ubah upah per jam menjadi upah harian, mingguan, dua mingguan, bulanan, dan tahunan pada jadwal asli Anda — bawaan 40 jam seminggu selama 52 minggu.",
    intro: [
      "Masukkan upah per jam beserta jadwal yang berlaku untuknya dan kalkulator mengalikannya sampai angka tahunan yang ditanyakan pemberi kerja dan pemberi pinjaman, plus jumlah mingguan, dua mingguan, dan bulanan yang akan tampak di slip gaji. Standar 40 jam, 52 minggu sudah terisi; jadwal paruh waktu atau musiman hanya perlu dua angka itu diubah.",
      "Upah harian mengasumsikan minggu kerja 5 hari. Karena setiap angka perkalian langsung, hasilnya cocok dengan yang seharusnya dibayar tawaran bergaji untuk jam yang sama.",
    ],
    steps: [
      "Ketik upah per jamnya.",
      "Atur jam per minggu dan minggu per tahun (bawaan 40 dan 52).",
      "Baca angka tahunan dan padanan bulanan, dua mingguan, mingguan, dan harian.",
    ],
    faqs: [
      {
        q: "Bagaimana upah tahunan dihitung dari upah per jam?",
        a: "Tahunan = upah per jam × jam per minggu × minggu per tahun. Pada 25,00 per jam dengan minggu 40 jam selama 52 minggu itu tepat 52.000 setahun; bulanan adalah tahunan dibagi 12, dan dua mingguan adalah upah seminggu dikali dua.",
      },
      {
        q: "Bagaimana dengan lembur, tip, atau cuti tak berbayar?",
        a: "Tidak termasuk — hasilnya perkalian langsung untuk jadwal yang Anda masukkan. Untuk memperhitungkan lembur secara kasar, tambahkan jam ekstra tipikal ke kolom jam per minggu pada tarif yang sama; untuk kerja musiman atau cuti tak berbayar, kurangi minggu per tahun.",
      },
      {
        q: "Kenapa slip gaji asli saya berbeda?",
        a: "Angkanya bruto. Pajak penghasilan, jaminan sosial, dan potongan tunjangan mengurangi bersih, dan banyak pekerjaan bergaji menyebarkan pembayaran ke 12 bulan meski Anda bekerja lebih sedikit minggu. Gunakan hasil tahunan untuk membandingkan tawaran, bukan sebagai perkiraan pendapatan bersih.",
      },
    ],
  },
  "break-even-calculator": {
    name: "Kalkulator Impas",
    tagline:
      "Temukan jumlah unit dan pendapatan saat produk berhenti kehilangan uang — biaya tetap, harga, dan biaya variabel masuk, margin kontribusi dan tabel laba keluar.",
    intro: [
      "Masukkan biaya tetap Anda — sewa, gaji, peralatan, tagihan yang tetap Anda bayar berapa pun volumenya — plus harga per unit dan biaya variabel per unit. Kalkulator membagi biaya tetap dengan margin kontribusi, harga dikurangi biaya variabel, dan memberi jumlah unit tempat laba melintasi nol.",
      "Tabel mini menampilkan laba atau rugi pada setengah, satu setengah, dan dua kali volume impas, sehingga Anda melihat seberapa cepat margin menumpuk setelah titik itu lewat. Jika harga bahkan tak menutup biaya variabel, alat mengatakannya alih-alih menampilkan nol tanpa arti.",
    ],
    steps: [
      "Masukkan total biaya tetap untuk periodenya.",
      "Atur harga per unit dan biaya variabel per unit.",
      "Baca unit dan pendapatan impas, plus margin per unit.",
      "Periksa tabel laba pada 0,5×, 1,5×, dan 2× volume impas.",
    ],
    faqs: [
      {
        q: "Rumus apa yang dipakai analisis impas?",
        a: "Unit impas = biaya tetap ÷ (harga per unit − biaya variabel per unit). Selisihnya adalah margin kontribusi: dengan 10.000 biaya tetap, harga 50, dan biaya variabel 30, tiap penjualan menyumbang 20, jadi 500 unit — 25.000 pendapatan — mencapai impas.",
      },
      {
        q: "Bagaimana jika margin nol atau negatif?",
        a: "Maka tak ada volume yang bisa impas, dan kalkulator mengatakannya alih-alih mengembalikan angka: setiap unit terjual menambah rugi alih-alih menutup biaya tetap. Solusinya harga lebih tinggi, biaya variabel lebih rendah, atau keduanya.",
      },
      {
        q: "Apakah menangani banyak produk atau biaya yang berubah?",
        a: "Ia memodelkan satu produk dengan ekonomi per unit tetap — kasus buku teks klasik. Untuk campuran produk, gunakan rata-rata campuran harga dikurangi biaya variabel Anda; untuk diskon volume atau biaya tetap bertingkat, hitung ulang tiap skenario.",
      },
    ],
  },
  "bmr-calculator": {
    name: "Kalkulator BMR",
    tagline:
      "Hitung laju metabolisme dasar Anda dengan persamaan Mifflin-St Jeor (1990) — kalori yang dibakar tubuh Anda setiap hari dalam istirahat total.",
    intro: [
      "Laju metabolisme dasar (BMR) Anda adalah energi yang dibelanjakan tubuh hanya untuk tetap hidup — bernapas, mengalirkan darah, menjaga kehangatan — sebelum gerakan atau pencernaan apa pun. Kalkulator ini memakai persamaan Mifflin-St Jeor, diterbitkan tahun 1990 dan masih prediktor paling akurat yang lazim dipakai untuk populasi modern: pria 10 × berat (kg) + 6,25 × tinggi (cm) − 5 × usia + 5; wanita ekspresi yang sama dikurangi 161.",
      "Masukkan data Anda dalam satuan metrik atau imperial dan hasilnya diperbarui saat mengetik. Perlakukan angka ini sebagai perkiraan tingkat populasi — biasanya dalam sekitar ±10% dari pengukuran laboratorium — bukan diagnosis medis.",
    ],
    steps: [
      "Pilih jenis kelamin dan satuan metrik (cm + kg) atau imperial (ft + in + lb).",
      "Masukkan tinggi, berat, dan usia.",
      "Baca BMR Anda dalam kilokalori per hari.",
      "Masukkan ke kalkulator kalori untuk angka pemeliharaan dan target.",
    ],
    faqs: [
      {
        q: "Rumus apa yang dipakai, dan seberapa akurat?",
        a: "Persamaan Mifflin-St Jeor, diterbitkan 1990 dan direkomendasikan American Dietetic Association setelah divalidasi terhadap kalorimetri tak langsung. Ia memprediksi pengeluaran energi istirahat terukur dalam sekitar ±10% untuk kebanyakan orang dewasa, lebih akurat daripada persamaan Harris-Benedict yang lama (1919).",
      },
      {
        q: "Apa bedanya BMR dengan kebutuhan kalori harian?",
        a: "BMR hanya menutup istirahat total. Pembakaran harian asli Anda adalah BMR dikali faktor aktivitas — sekitar 1,2 untuk hari sedenter hingga 1,9 untuk orang sangat aktif. Kalkulator kalori menerapkan pengali itu dan tujuan Anda untuk Anda.",
      },
      {
        q: "Apakah ini nasihat medis?",
        a: "Tidak — ini perkiraan, bukan nasihat medis. Penyakit, obat, kehamilan, dan komposisi tubuh yang tak biasa semuanya menggeser pengeluaran energi nyata; diskusikan perubahan diet apa pun dengan tenaga kesehatan.",
      },
    ],
  },
  "calorie-calculator": {
    name: "Kalkulator Kalori",
    tagline:
      "Ubah BMR Anda menjadi target kalori harian: lima tingkat aktivitas (×1,2–1,9) plus tujuan menurunkan, mempertahankan, atau menambah sekitar ±500 kcal per hari.",
    intro: [
      "Kebutuhan energi harian adalah BMR Anda dikali faktor aktivitas: 1,2 sedenter, 1,375 aktif ringan, 1,55 aktif sedang, 1,725 sangat aktif, dan 1,9 ekstra aktif. Hasil kali itu — pengeluaran energi harian total (TDEE) — adalah yang dibutuhkan mempertahankan berat Anda sekarang. BMR-nya sendiri berasal dari persamaan Mifflin-St Jeor (1990).",
      "Pilih tujuan dan alat menyesuaikan angka pemeliharaan: sekitar −500 kcal/hari untuk menurun sekitar 0,5 kg per minggu, +500 kcal/hari untuk menambah, atau tanpa perubahan untuk mempertahankan. Heuristik ±500 kcal mengikuti dari fakta bahwa 1 kg lemak tubuh menyimpan ≈ 7.700 kcal. Semua di sini perkiraan — metabolisme nyata menyesuaikan saat berat dan kebiasaan Anda berubah.",
    ],
    steps: [
      "Pilih jenis kelamin, satuan, dan masukkan tinggi, berat, dan usia.",
      "Pilih tingkat aktivitas yang cocok dengan minggu tipikal Anda.",
      "Pilih turun, pertahankan, atau naik.",
      "Baca pemeliharaan (TDEE) dan kalori target harian Anda.",
    ],
    faqs: [
      {
        q: "Rumus dan faktor apa yang dipakai?",
        a: "BMR dari persamaan Mifflin-St Jeor (1990), dikali faktor aktivitas TDEE standar: 1,2 sedenter, 1,375 aktif ringan, 1,55 aktif sedang, 1,725 sangat aktif, 1,9 ekstra aktif. Tujuan menambah atau mengurangi sekitar 500 kcal/hari, heuristik klasik untuk perubahan 0,5 kg per minggu (1 kg lemak ≈ 7.700 kcal).",
      },
      {
        q: "Apakah defisit 500 kcal aman, dan kapan hasil terlihat?",
        a: "Sekitar −500 kcal/hari untuk perubahan ≈0,5 kg/minggu adalah laju yang oleh kebanyakan panduan kesehatan masyarakat disebut moderat dan berkelanjutan. Penurunan awal sebagian air, dan pengeluaran turun saat Anda meringkas, jadi hasil mingguan tidak linier — hitung ulang tiap beberapa kilogram.",
      },
      {
        q: "Apakah ini nasihat medis?",
        a: "Tidak — ini perkiraan, bukan nasihat medis. Jika Anda hamil, mengelola kondisi kronis, minum obat, atau punya riwayat gangguan makan, tetapkan target bersama tenaga kesehatan.",
      },
    ],
  },
  "body-fat-calculator": {
    name: "Kalkulator Lemak Tubuh",
    tagline:
      "Perkirakan persentase lemak tubuh dengan metode pita pengukur US Navy (Hodgdon & Beckett, 1984) dari tinggi, leher, dan pinggang — pinggul untuk wanita.",
    intro: [
      "Metode lingkar US Navy memperkirakan lemak tubuh dari satu pita pengukur saja. Untuk pria: %BF = 495 / (1,0324 − 0,19077·log10(pinggang − leher) + 0,15456·log10(tinggi)) − 450, semuanya dalam sentimeter. Wanita menambahkan pinggul ke suku lingkar — log10(pinggang + pinggul − leher) — dan memakai koefisien wanita dari makalah 1984 yang sama oleh Hodgdon dan Beckett.",
      "Ukur leher di bawah larinks dengan pita sedikit miring turun ke depan, pinggang di pusar untuk pria atau titik tersempit untuk wanita, dan pinggul di bagian terpadat. Kencangkan pita tanpa menekan kulit. Hasilnya perkiraan dengan galat tipikal ±3–4% terhadap metode laboratorium, bukan diagnosis.",
    ],
    steps: [
      "Pilih jenis kelamin dan satuan metrik atau imperial.",
      "Ukur dan masukkan tinggi, leher, dan pinggang — plus pinggul untuk wanita.",
      "Baca persentase lemak tubuh perkiraan Anda.",
      "Ukur ulang setiap bulan dalam kondisi sama untuk melacak tren.",
    ],
    faqs: [
      {
        q: "Seberapa akurat metode Navy?",
        a: "Terhadap penimbangan bawah air dan DEXA, persamaan Navy 1984 rata-rata berada dalam sekitar 3–4 poin persentase, dengan galat perorangan lebih besar saat lemak tersimpan tidak biasa. Ia menelusuri perubahan dengan baik bila Anda mengukur konsisten, yang lebih penting untuk kemajuan daripada angka absolutnya.",
      },
      {
        q: "Rentang lemak tubuh mana yang dianggap sehat?",
        a: "American Council on Exercise menyebut untuk pria: 2–5% lemak esensial, 6–13% atlet, 14–17% kebugaran, 18–24% rata-rata, 25%+ obesitas. Untuk wanita: 10–13% esensial, 14–20% atlet, 21–24% kebugaran, 25–31% rata-rata, 32%+ obesitas. Wanita membutuhkan lebih banyak lemak esensial untuk fungsi hormon.",
      },
      {
        q: "Kenapa hasilnya negatif atau mustahil?",
        a: "Rumusnya dicetak tanpa pembatasan, jadi masukan mustahil — misalnya pinggang yang tidak lebih besar dari leher — menghasilkan keluaran mustahil. Perlakukan nilai apa pun di bawah tingkat lemak esensial atau di atas sekitar 60% sebagai galat ukur dan ukur ulang. Dan seperti biasa, perkiraan ini bukan nasihat medis.",
      },
    ],
  },
  "ideal-weight-calculator": {
    name: "Kalkulator Berat Ideal",
    tagline:
      "Lihat berat ideal Anda dari rumus Devine (1975) dan rentang BMI sehat (18,5–24,9) untuk tinggi Anda, ditampilkan dalam kg atau pon.",
    intro: [
      "Kalkulator ini menampilkan dua jawaban yang saling melengkapi. Rumus Devine (1975) — 50 kg + 2,3 kg per inci di atas 5 ft untuk pria, 45,5 kg + 2,3 kg per inci untuk wanita — awalnya diturunkan untuk mendosis obat seperti digoksin dan masih persamaan berat ideal yang paling banyak dikutip dalam kedokteran. Rentang BMI sehat mengalikan tinggi Anda dalam meter kuadrat dengan 18,5 dan 24,9, batas rentang normal WHO.",
      "Masukkan tinggi dalam sentimeter atau kaki dan inci. Kedua metode biasanya berbeda beberapa kilogram, dan justru itulah intinya: berat ideal tunggal tidak ada. Perlakukan kedua angka sebagai bingkai acuan di sekitar rentang sehat, bukan target yang dipaksakan — perkiraan ini bukan nasihat medis.",
    ],
    steps: [
      "Pilih satuan metrik (cm) atau imperial (ft + in).",
      "Masukkan tinggi Anda.",
      "Bandingkan perkiraan Devine pria dan wanita dengan rentang BMI sehat.",
      "Gunakan rentangnya, bukan satu angka, saat menetapkan target berat.",
    ],
    faqs: [
      {
        q: "Dari mana rumus Devine berasal?",
        a: "Dr. B. J. Devine menerbitkannya tahun 1975 sebagai cara cepat memperkirakan berat untuk dosis obat dari tinggi: 50 kg untuk 5 kaki pertama plus 2,3 kg per inci tambahan untuk pria, 45,5 kg untuk wanita. Rumus ini tak pernah dirancang sebagai target kecantikan atau kebugaran — itulah sebabnya rentang BMI berbasis WHO ditampilkan di sebelahnya.",
      },
      {
        q: "Kenapa jawabannya rentang, bukan satu angka?",
        a: "Karena berat sehat bergantung pada rangka, massa otot, usia, dan etnis, tidak ada satu angka yang cocok untuk semua. Rentang 18,5–24,9 × tinggi² berasal dari klasifikasi BMI WHO dan mencakup berat-berat yang oleh riset dikaitkan dengan risiko keseluruhan terendah bagi kebanyakan orang dewasa.",
      },
      {
        q: "Apakah ini nasihat medis?",
        a: "Tidak — ini perkiraan, bukan nasihat medis. Atlet dan orang sangat berotot berada di atas rentang sambil sangat sehat, dan beberapa kondisi menggeser rentang sehat. Diskusikan berat target dengan tenaga kesehatan.",
      },
    ],
  },
  "water-intake-calculator": {
    name: "Kalkulator Asupan Air",
    tagline:
      "Dapatkan target air harian: 35 ml per kilogram berat tubuh plus sekitar 350 ml untuk setiap 30 menit olahraga, dengan panduan cuaca panas.",
    intro: [
      "Kalkulator ini berangkat dari heuristik cairan pemeliharaan standar yang dipakai dalam praktik klinis: 35 ml air per kilogram berat tubuh setiap hari, sebelum aktivitas apa pun. Ia lalu menambahkan sekitar 350 ml untuk setiap 30 menit olahraga guna menutup kehilangan keringat, dan menampilkan garis dasar serta bonus olahraga terpisah sehingga Anda melihat dari mana total itu datang.",
      "Masukkan berat dalam kilogram atau pon dan menit olahraga harian Anda. Saat cuaca panas, atau saat berkeringat deras, minumlah lebih dari total yang dihitung; makanan dan minuman lain juga menyuplai air. Hasilnya perkiraan hidrasi umum, bukan nasihat medis.",
    ],
    steps: [
      "Pilih satuan metrik (kg) atau imperial (lb).",
      "Masukkan berat tubuh Anda.",
      "Masukkan berapa menit Anda berolahraga per hari.",
      "Baca garis dasar, bonus olahraga, dan target harian gabungan.",
    ],
    faqs: [
      {
        q: "Dari mana aturan 35 ml/kg berasal?",
        a: "Itu heuristik cairan pemeliharaan klasik dari pediatri sampai orang dewasa yang lazim di seluruh praktik klinis (untuk dewasa sering dikutip 30–35 ml/kg/hari). Sebagai perbandingan, European Food Safety Authority menetapkan asupan air total memadai pada 2,0 L/hari untuk wanita dan 2,5 L/hari untuk pria — termasuk air dari makanan.",
      },
      {
        q: "Apakah kopi, teh, dan makanan ikut dihitung ke total?",
        a: "Ya. Sekitar 20–30% asupan air harian biasanya datang dari makanan, dan minuman berkafein secukupnya menyumbang hidrasi alih-alih mengurasnya. Angka yang dihitung adalah panduan cairan polos di atas diet normal, jadi Anda tak perlu meminum seluruhnya sebagai air putih.",
      },
      {
        q: "Apakah ini nasihat medis?",
        a: "Tidak — ini perkiraan umum. Penderita penyakit jantung, ginjal, atau hati, dan yang dianjurkan membatasi cairan, sering membutuhkan kurang dari jumlah yang dihitung: ikuti instruksi klinisi Anda.",
      },
    ],
  },
  "pace-calculator": {
    name: "Kalkulator Pace",
    tagline:
      "Hitung pace lari per km dan per mil dari jarak dan waktu apa pun, lalu prediksi waktu balapan dengan rumus eksponen 1,06 Peter Riegel.",
    intro: [
      "Masukkan jarak apa pun — 5K, 10K, half marathon, marathon, atau jarak khusus dalam kilometer atau mil — plus waktu finis Anda, dan lihat sekaligus pace per kilometer, pace per mil, dan kecepatan dalam km/jam dan mph. Half marathon dalam 2:00 tampil sebagai 5:41/km, 9:10/mil, dan 10,6 km/jam tanpa hitung-hitungan pikiran.",
      "Prediktor balapan menerapkan rumus daya tahan Peter Riegel T₂ = T₁ × (D₂/D₁)^1,06: beri satu hasil balapan yang jujur, dan ia memproyeksikan finis Anda yang diharapkan untuk setiap jarak standar, dari 5K sampai marathon.",
    ],
    steps: [
      "Pilih preset jarak balapan, atau pilih Kustom dan masukkan jarak apa pun dalam km atau mil.",
      "Ketik waktu finis Anda dalam jam, menit, dan detik.",
      "Baca pace per km, pace per mil, dan kedua kecepatan — atau beralih ke Prediktor balapan untuk waktu terproyeksi di setiap jarak.",
    ],
    faqs: [
      {
        q: "Dari mana rumus prediksi balapan berasal?",
        a: "Dari Peter Riegel, insinyur riset yang menerbitkan T₂ = T₁ × (D₂/D₁)^1,06 di Runner's World tahun 1977. Eksponen 1,06 menangkap bagaimana pace memudar dengan jarak: menggandakan jarak balapan memakan waktu sekitar 9% lebih lama daripada dua kali waktunya. Ia mengasumsikan latihan khusus untuk jarak target — ia takkan memprediksi marathon dari satu 5K cepat bila Anda tak pernah lari jauh.",
      },
      {
        q: "Kenapa pace per km yang diprediksi lebih lambat untuk balapan lebih panjang?",
        a: "Itulah rumus yang bekerja. Eksponen 1,06 berarti setiap penggandaan jarak memakan sekitar 6% waktu ekstra di luar bagian proporsional, mencerminkan deplesi glikogen, pengisian bahan bakar, dan kelelahan. Prediksi lebih pendek (10K dari half marathon) keluar lebih cepat per km karena alasan yang sama.",
      },
      {
        q: "Apakah kalkulator menangani mil juga selain kilometer?",
        a: "Ya. Jarak khusus menerima kedua satuan, dan hasil selalu ditampilkan dua-duanya: pace per km dan per mil, kecepatan dalam km/jam dan mph. Konversi memakai mil internasional yang tepat sebesar 1,609344 km.",
      },
    ],
  },
  "one-rep-max-calculator": {
    name: "Kalkulator 1RM",
    tagline:
      "Perkirakan satu-repetisi-maks (1RM) Anda dari set beban × repetisi apa pun dengan rumus Epley dan Brzycki, plus tabel latihan 1–12 repetisi dalam persentase 1RM.",
    intro: [
      "Masukkan beban yang Anda angkat dan berapa repetisi bersih yang Anda selesaikan, dan dapatkan 1RM perkiraan dari dua rumus mapan: Epley w × (1 + reps/30) dan Brzycki w × 36/(37 − reps). Pada 225 lb × 10 keduanya mendarat tepat di 300 lb — itulah sebabnya set ini klasik di gym.",
      "Di bawah perkiraan, tabel latihan mengonversi 1RM Anda menjadi beban kerja: beban terberat yang bisa Anda harapkan angkat untuk tiap jumlah repetisi dari 1 sampai 12, dengan persentasenya dari 1RM — persentase yang dipakai pelatih memprogram blok kekuatan, hipertrofi, dan daya tahan.",
    ],
    steps: [
      "Masukkan beban yang diangkat dan pilih kg atau lb.",
      "Masukkan jumlah repetisi yang Anda selesaikan dengan teknik baik.",
      "Baca perkiraan Epley dan Brzycki serta tabel latihan 1–12 repetisi di bawahnya.",
    ],
    faqs: [
      {
        q: "Rumus mana yang harus dipercaya?",
        a: "Keduanya perkiraan dari set submaksimal, dan paling akurat antara sekitar 4 dan 10 repetisi. Epley (1976) cenderung sedikit optimistis pada jumlah repetisi rendah; Brzycki (1993) sedikit konservatif. Praktik lazim adalah membaca dua angka itu sebagai rentang: bila keduanya cocok dalam beberapa kilogram, perkiraan 1RM Anda andal.",
      },
      {
        q: "Kenapa tabel menampilkan 75% dari 1RM untuk 10 repetisi?",
        a: "Persentasenya berasal dari pembalikan persamaan Epley: maksimum yang bisa diangkat untuk n repetisi kira-kira 1RM × 30/(30 + n). Sepuluh repetisi menghasilkan 75%, lima repetisi sekitar 86%. Persentase nyata bergeser dengan angkatannya (squat menoleransi lebih banyak repetisi daripada press) dan dengan komposisi serat Anda, jadi perlakukan tabel sebagai titik awal pemrograman.",
      },
      {
        q: "Kenapa saya tak bisa memasukkan lebih dari 20 repetisi?",
        a: "Karena di situ rumus-rumusnya berhenti bermakna. Di atas sekitar 12 repetisi hasilnya didominasi daya tahan lokal alih-alih kekuatan, dan penyebut Brzycki (37 − reps) runtuh menuju nol. Set repetisi tinggi mengukur kondisi fisik; jika ingin perkiraan maksimal darinya, pakai rumus yang dirancang untuk kerja daya tahan.",
      },
    ],
  },
  "sleep-calculator": {
    name: "Kalkulator Tidur",
    tagline:
      "Temukan jam tidur terbaik untuk jam bangun yang ditetapkan — atau kapan Anda bangun bila tidur sekarang — dengan siklus tidur 90 menit plus 15 menit untuk terlelap.",
    intro: [
      "Bangun di tengah siklus itulah yang membuat pagi terasa mengerikan, bukan total jam tidur. Alat ini merencanakan tidur dalam siklus penuh 90 menit: katakan kapan Anda harus bangun dan ia mendaftar jam tidur yang membuat alarm berbunyi tepat di batas siklus — enam siklus (9 jam) sampai tiga (4,5 jam), masing-masing termasuk sekitar 15 menit untuk terlelap.",
      "Tidur sekarang juga? Mode terbalik menambahkan siklus ke depan: terlelap pukul 23:30 dan titik bangun alami Anda 01:15, 02:45, 04:15, 05:45, 07:15, dan 08:45 — ambil yang paling awal yang tetap memberi cukup istirahat.",
    ],
    steps: [
      "Pilih Jam bangun → jam tidur, atau Tidur sekarang → jam bangun.",
      "Masukkan waktu Anda harus bangun, atau waktu Anda pergi tidur.",
      "Pilih satu baris: masing-masing kelipatan bulat siklus 90 menit, dengan durasi tidurnya ditampilkan.",
    ],
    faqs: [
      {
        q: "Apakah siklus tidur benar-benar 90 menit?",
        a: "90 menit adalah rata-rata yang lazim dikutip, tetapi siklus perorangan bervariasi dari sekitar 80 sampai 120 menit, dan siklus orang yang sama berbeda sepanjang malam. Itulah sebabnya jam-jam di sini target, bukan jaminan: bila Anda masih merasa melayang setelah dua minggu alarm berjadwal siklus, geser jam tidur 15–20 menit dan lihat apakah pagi membaik.",
      },
      {
        q: "Kenapa perhitungan menambahkan 15 menit?",
        a: "Karena siklus pertama baru dimulai saat Anda benar-benar terlelap, dan kebanyakan orang membutuhkan sekitar 10–20 menit. Alat menganggarkan 15 menit antara masuk tempat tidur dan awal siklus pertama; bila Anda biasanya terlelap lebih cepat atau lambat, tambah atau kurangi selisihnya secara mental.",
      },
      {
        q: "Berapa siklus yang saya butuhkan?",
        a: "Kebanyakan orang dewasa baik-baik saja dengan 5 siklus (7,5 jam) dan banyak yang butuh 6 (9 jam); 4 siklus (6 jam) menolong sebagian orang jangka pendek tetapi jarang jangka panjang. Konsistensi jadwal sama pentingnya dengan total — 6 siklus yang sama pada jam tidur yang liar membuat Anda lebih buruk keadaannya.",
      },
    ],
  },
  "workdays-calculator": {
    name: "Kalkulator Hari Kerja",
    tagline:
      "Hitung hari kerja antara dua tanggal atau tambah dan kurangi hari kerja dari tanggal mana pun — dengan definisi akhir pekan Anda sendiri dan daftar hari libur khusus.",
    intro: [
      "Tenggat kontrak, lead time, dan jam SLA berjalan dengan hari kerja, bukan hari kalender. Hitung hari kerja antara dua tanggal (kedua ujung termasuk: Senin sampai Jumat berjumlah 5), atau maju/mundur N hari kerja dari tanggal dasar dan lihat tanggal pendaratan tepat beserta hari pekanjanya.",
      "Tempel daftar hari libur Anda sendiri — satu YYYY-MM-DD per baris — untuk mengecualikan penutupan perusahaan dan hari libur nasional, dan ubah definisi akhir pekan bila pekan Anda beristirahat Jumat dan Sabtu. Seluruh matematika tanggal berjalan pada nomor hari UTC, sehingga transisi daylight saving tak pernah menggeser hasil satu hari.",
    ],
    steps: [
      "Pilih Hari kerja antara, atau Tambah / kurangi hari kerja.",
      "Masukkan kedua tanggal, atau tanggal dasar dan berapa hari kerja untuk bergerak.",
      "Opsional atur hari akhir pekan dan tempel tanggal liburan, satu YYYY-MM-DD per baris.",
      "Baca hitungannya dengan rinciannya, atau tanggal hasilnya dengan hari pekanjanya.",
    ],
    faqs: [
      {
        q: "Apakah tanggal di ujung ikut dihitung?",
        a: "Ya — hitungan antara mencakup kedua ujung: dari Senin 2026-11-02 sampai Jumat 2026-11-06 ada 5 hari kerja, dan rentang Jumat ke Senin berjumlah 2. Pada mode tambah/kurang tanggal mulai tidak terpakai: Jumat + 1 hari kerja mendarat Senin, dan Sabtu + 1 juga mendarat Senin.",
      },
      {
        q: "Bagaimana memasukkan hari libur?",
        a: "Satu tanggal per baris dalam format YYYY-MM-DD, misalnya 2026-11-26 untuk Thanksgiving Amerika. Baris tak valid diabaikan alih-alih merusak hitungan, duplikat tak berbahaya, dan hari libur yang jatuh pada hari akhir pekan Anda sekadar tidak mengubah apa pun — ia sudah dikecualikan.",
      },
      {
        q: "Kenapa alat menyebut UTC dan daylight saving?",
        a: "Aritmetika tanggal pada waktu lokal bisa mengembar satu hari di sekitar transisi DST — rentang yang melintasi pergantian November atau Maret bisa keluar satu hari lebih pendek atau panjang di beberapa peramban. Menghitung dalam hari UTC utuh menepis masalah itu sepenuhnya: rentang Jumat ke Senin adalah 2 hari kerja di mana pun di bumi.",
      },
    ],
  },
  "cooking-conversion": {
    name: "Kalkulator Konversi Memasak",
    tagline:
      "Konversikan cup, sendok makan, dan sendok teh ke gram dan ounce untuk 24 bahan umum, dengan tabel oven °F↔°C — semuanya rata-rata terbit, tanpa perjalanan ke server.",
    intro: [
      "Cup tepung bukanlah cup madu: mengonversi volume ke berat butuh kepadatan bahan, bukan satu faktor ajaib. Pilih salah satu dari 24 bahan umum — tepung 120 g/cup, gula 200, mentega 227, madu 340, kakao 100, oat gulungan 90 — dan konversikan dua arah antara cup, sendok makan, sendok teh, ounce cair, mililiter, dan liter di satu sisi, serta gram, kilogram, ounce, dan pon di sisi lain.",
      "Konversi volume-ke-volume (2 cup = 480 ml) dan berat-ke-berat (1 lb = 453,6 g) berjalan tanpa memilih bahan, dan tabel oven dua arah menerjemahkan pengaturan °F standar ke °C — 350 °F adalah 175 °C — sehingga resep asing berhenti jadi tebak-tebakan.",
    ],
    steps: [
      "Pilih bahan dari daftar (lewati langkah ini untuk volume-ke-volume atau berat-ke-berat).",
      "Masukkan jumlah yang diminta resep.",
      "Pilih satuan asal dan satuan yang diinginkan.",
      "Baca hasilnya, atau cari suhu oven di tabel °F↔°C.",
    ],
    faqs: [
      {
        q: "Seberapa akurat nilai gram per cup?",
        a: "Itu rata-rata yang diterbitkan (King Arthur, USDA, dan sumber serupa), dan skor nyata bervariasi: satu cup tepung bisa berbeda ±15% tergantung Anda menuang dengan sendok lalu meratakannya atau menakar langsung dari kemasan. Nilainya cukup untuk memasak sehari-hari; untuk roti yang butuh presisi, timbang bahan dan perlakukan tabel sebagai perkiraan.",
      },
      {
        q: "Cup mana yang dipakai alat ini?",
        a: "Cup memasak AS sebesar 240 ml, yang diasumsikan kebanyakan resep Amerika dan bagan konversi. Itu 16 sendok makan berisi 15 ml atau 48 sendok teh berisi 5 ml. Bila resep ditulis dengan cup ukur metrik (250 ml) atau cup imperial Inggris (284 ml), hasil bergeser beberapa persen — sesuaikan skalanya.",
      },
      {
        q: "Kenapa 350 °F dikonversi jadi 175 °C, bukan 176,7 °C?",
        a: "Konversi tepatnya (350 − 32) × 5/9 = 176,7 °C, tetapi oven ditandai dalam langkah 5–10 derajat dan penulis resep membulatkan ke pengaturan familiar terdekat, jadi 175 °C adalah pasangan standarnya. Tabel menampilkan pasangan konvensional itu; suhu nyata kenop oven memang hampiran.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* DEVELOPER — PLACEHOLDER IMAGE                                        */
  /* ------------------------------------------------------------------ */
  "placeholder-image-generator": {
    name: "Generator Gambar Placeholder",
    tagline:
      "Buat gambar placeholder ukuran apa pun dalam SVG, PNG, atau JPG — pilih warna dan label, pratinjau instan, lalu unduh berkasnya atau salin markup SVG.",
    intro: [
      "Mockup dan wireframe butuh kotak gambar sebelum aset asli ada. Ketik lebar dan tinggi — hero 1200×630, avatar 256×256, atau apa saja dari 1×1 hingga 5000×5000 — pilih warna latar dan teks, tambahkan label opsional, dan placeholder menggambar dirinya secara langsung saat Anda mengetik.",
      "Unduh hasilnya sebagai SVG, PNG, atau JPG, atau salin markup SVG langsung ke papan klip: itu segelintir elemen yang terbaca, bukan sup base64, jadi Anda bisa menempelkannya ke HTML, JSX, atau Figma dan menyunting teks dan warna dengan tangan. Semua dibuat di peramban Anda; tidak ada yang diunggah.",
    ],
    steps: [
      "Masukkan lebar dan tinggi dalam piksel.",
      "Atur warna latar dan teks, dan label opsional (bawaan: dimensinya).",
      "Unduh sebagai SVG, PNG, atau JPG — atau salin markup SVG dan tempel di mana saja.",
    ],
    faqs: [
      {
        q: "Kapan sebaiknya memakai SVG alih-alih PNG atau JPG?",
        a: "SVG itu teks: mungil, diskalakan tanpa batas, dan bisa disunting dengan tangan — ideal untuk mockup, dokumen, dan tata letak ramah surel. PNG pilihan lebih aman untuk platform yang merusak SVG inline (beberapa CMS dan aplikasi obrolan), dan JPG cocok untuk placeholder mirip foto pada ukuran berkas kecil. Pratinjaunya identik di ketiganya.",
      },
      {
        q: "Apa batas ukuran dan warnanya?",
        a: "Lebar dan tinggi harus bilangan bulat antara 1 dan 5000 piksel; warna harus hex — #RRGGBB atau bentuk pendek #RGB. Sisanya ditolak dengan petunjuk alih-alih diam-diam menghasilkan gambar rusak.",
      },
      {
        q: "Apakah ada yang dikirim ke server?",
        a: "Tidak. SVG dibangun dari templat string di peramban Anda dan versi raster digambar pada canvas lokal. Tak ada yang meninggalkan halaman: ia bekerja luring dan aman untuk desain yang belum dirilis.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* CALCULATORS & TIMERS — PAY, RENT, SAVINGS, HEALTH, TIME              */
  /* ------------------------------------------------------------------ */
  "overtime-pay-calculator": {
    name: "Kalkulator Lembur",
    tagline:
      "Hitung upah lembur pada 1,5× atau 2× tarif per jam Anda — gaji reguler, premi lembur, total mingguan, dan angka tahunan yang dihitung dari gaji.",
    intro: [
      "Masukkan tarif per jam — atau gaji tahunan yang dikonversi kalkulator menggunakan jam kerja mingguan reguler Anda — lalu tambahkan jam lembur yang Anda perkirakan. Hasilnya memisahkan gaji reguler dari premi lembur: waktu setengah lagi secara bawaan, atau ganda bila kontrak atau aturan setempat membayarnya.",
      "Semuanya diperbarui langsung: tarif lembur yang naik, gaji reguler dan lembur pada minggu itu, total mingguan gabungan, serta angka tahunan setelah dikalikan jumlah minggu yang benar-benar Anda kerjakan dalam setahun. Ini mencerminkan cara Fair Labor Standards Act (FLSA) Amerika Serikat menghitung lembur bagi karyawan yang tidak dikecualikan.",
    ],
    steps: [
      "Masukkan tarif per jam Anda, atau beralih ke mode gaji dan ketik gaji tahunan Anda.",
      "Atur jam reguler per minggu (40 secara bawaan) dan minggu per tahun.",
      "Tambahkan jam lembur dan pilih pengali — 1,5× atau 2×.",
      "Baca tarif lembur, rincian mingguan, dan total tahunan.",
    ],
    faqs: [
      {
        q: "Kapan upah lembur wajib dibayarkan di AS?",
        a: "Berdasarkan FLSA, karyawan yang tidak dikecualikan harus menerima setidaknya 1,5 kali tarif reguler mereka untuk setiap jam di atas 40 dalam minggu kerja. Pengecualian bergantung pada tugas dan tingkat gaji; beberapa negara bagian melangkah lebih jauh — California misalnya juga mengaktifkan lembur harian setelah 8 jam. Tarif 25,00 per jam menghasilkan 37,50 untuk setiap jam lembur.",
      },
      {
        q: "Bagaimana mode gaji mengubah gaji saya menjadi tarif per jam?",
        a: "Ia membagi gaji tahunan dengan jam reguler per minggu × minggu per tahun — basis yang sama dengan konversi gaji ke tarif per jam. Gaji 52.000 pada minggu 40 jam dan 52 minggu tepat 25,00 per jam, sehingga lima jam lembur pada 1,5× menambah 187,50 di atas minggu reguler sebesar 1.000,00.",
      },
      {
        q: "Apakah seluruh gaji dipakai untuk tarif lembur?",
        a: "FLSA menghitung lembur atas «tarif reguler», yang bisa mencakup lebih dari upah pokok — differential shift dan bonus non-diskresioner adalah contohnya. Kalkulator ini memakai tarif pokok murni, jadi jika Anda menerima tambahan-tambahan itu, tarif lembur legal Anda bisa lebih tinggi dari yang ditampilkan di sini.",
      },
    ],
  },
  "rent-affordability-calculator": {
    name: "Kalkulator Kemampuan Sewa",
    tagline:
      "Temukan sewa maksimum yang sanggup ditanggung pendapatan bulanan Anda dengan aturan 30%, 33%, atau 40% — lalu lihat sisanya setelah utang dan asuransi penyewa.",
    intro: [
      "Masukkan pendapatan bulanan Anda (bruto atau neto), pilih rasio sewa-terhadap-pendapatan — 30% dari bruto yang klasik, 33% yang lebih longgar, atau 40% dari neto untuk kota mahal — dan kalkulator menggambar batas sewa Anda. Cicilan utang bulanan lain dan asuransi penyewa kemudian dikurangkan agar angka yang terlihat benar-benar layak huni.",
      "Anda juga mendapat persentase utang-terhadap-pendapatan pada sewa maksimum itu, yang dilihat pemberi pinjaman sebelum menyetujui kontrak sewa atau hipotek. Baris anggaran dengan jujur berubah negatif ketika sewa plus utang melampaui pendapatan — sinyal untuk mencari sewa lebih murah daripada memaksakan diri.",
    ],
    steps: [
      "Masukkan pendapatan bulanan Anda dan nyatakan bruto atau neto.",
      "Pilih rasio sewa-terhadap-pendapatan: 30%, 33%, atau 40%.",
      "Tambahkan cicilan utang bulanan lain dan asuransi penyewa, jika ada.",
      "Baca batas sewa, anggaran tersisa, dan rasio utang-terhadap-pendapatan Anda.",
    ],
    faqs: [
      {
        q: "Dari mana aturan 30% untuk sewa berasal?",
        a: "Ia menelusuri ke Brooke Amendment Amerika Serikat tahun 1969, yang membatasi sewa perumahan publik pada 25% pendapatan lalu dinaikkan ke 30% pada 1981. HUD masih menyebut rumah tangga yang menghabiskan lebih dari 30% pendapatannya untuk tempat tinggal sebagai «cost-burdened» — itulah mengapa 30% dari pendapatan bruto melekat sebagai singkatan sewa yang terjangkau.",
      },
      {
        q: "Sebaiknya anggaran sewa dari pendapatan bruto atau neto?",
        a: "Aturan klasik 30% berlaku untuk pendapatan bruto, jadi mengabaikan pajak dan tampak lebih murah hati daripada slip gaji Anda. Jika Anda lebih suka merencanakan dari upah bawa-pulang, rasio lebih tinggi seperti 40% dari neto mendarat di titik yang kurang lebih sama. Yang penting memilih satu basis dan konsisten menggunakannya.",
      },
      {
        q: "Apa arti persentase utang-terhadap-pendapatan di sini?",
        a: "Itu porsi pendapatan Anda yang dikonsumsi sewa maksimum ditambah utang dan asuransi yang Anda daftarkan. Pemberi pinjaman umumnya menyukai DTI total di bawah sekitar 36%; di atas sekitar 43% sulit memenuhi syarat hipotek. Angka tinggi berarti batas sewa terlalu agresif bagi kewajiban Anda yang lain.",
      },
    ],
  },
  "apy-calculator": {
    name: "Kalkulator APY",
    tagline:
      "Konversikan APR nominal menjadi APY efektif — dan sebaliknya — untuk penggabungan harian, bulanan, kuartalan, atau tahunan, dengan pertumbuhan deposit opsional.",
    intro: [
      "Tarif nominal dan tarif efektif bukan angka yang sama, dan iklan diam-diam memilih yang terlihat lebih baik. Masukkan sebuah tarif dan frekuensi penggabungan — harian (365), bulanan, kuartalan, atau tahunan — dan kalkulator ini mengonversi APR menjadi APY, atau APY kembali ke APR nominal yang menghasilkannya.",
      "Tambahkan deposit opsional dan horizon dalam tahun untuk melihat ke mana uang benar-benar tumbuh: saldo setelah penggabungan dan bunga yang dihasilkan di atasnya. Konversinya eksak dua arah — balikkan arah dan verifikasi putaran penuhnya terhadap kutipan bank mana pun.",
    ],
    steps: [
      "Ketik tarif yang dikutipkan kepada Anda — APR nominal atau APY efektif.",
      "Pilih frekuensi penggabungan: harian, bulanan, kuartalan, atau tahunan.",
      "Opsional tambahkan deposit dan jumlah tahun untuk memproyeksikan pertumbuhan.",
      "Baca tarif yang dikonversi, saldo akhir, dan bunga yang dihasilkan.",
    ],
    faqs: [
      {
        q: "Mengapa APY lebih tinggi dari APR pada tarif nominal yang sama?",
        a: "Karena penggabungan membayar bunga atas bunga. APY = (1 + r ÷ n)^n − 1, sehingga tarif nominal 12% dengan penggabungan bulanan menjadi (1,01)^12 − 1 = 12,6825% efektif: tambahan 0,6825 poin adalah bunga yang dihasilkan bunga Anda. Semakin sering uang digabungkan, semakin lebar celahnya — harian mengalahkan bulanan, bulanan mengalahkan tahunan.",
      },
      {
        q: "Tarif mana yang sebaiknya dibandingkan antar bank?",
        a: "Bandingkan APY dengan APY untuk tabungan dan deposito — ia sudah melipat frekuensi penggabungan, sehingga APY 5,10% dengan penggabungan bulanan memang lebih baik daripada APY 5,05% dengan penggabungan tahunan. Untuk pinjaman, bandingkan APR dengan APR. Mencampur APR dengan APY dalam satu perbandingan justru cara kutipan menyesatkan.",
      },
      {
        q: "Apakah opsi harian memakai 365 atau 360 hari?",
        a: "Kalkulator ini memakai 365 periode per tahun, konvensi yang diikuti sebagian besar rekening tabungan konsumen. Beberapa produk keuangan justru menahunkan pada basis 360 hari, yang menggeser tarif efektif sedikit — jika catatan kecil menulis 360, perlakukan hasilnya sebagai perkiraan dekat, bukan kutipan eksak.",
      },
    ],
  },
  "gpa-calculator": {
    name: "Kalkulator GPA",
    tagline:
      "Ubah mata kuliah semester ini menjadi GPA pada skala 4,0 dengan poin kualitas standar, lalu campur kredit Anda sebelumnya menjadi satu GPA kumulatif yang jujur.",
    intro: [
      "Tambahkan setiap mata kuliah dengan jam kredit dan nilai hurufnya, dan kalkulator menerapkan tabel poin kualitas standar skala 4,0 — A = 4,0, A− = 3,7, B+ = 3,3, dan seterusnya — menimbang setiap nilai dengan kreditnya. A pada 4 kredit berbobot lebih dari A pada 3 kredit, persis seperti kata transkrip Anda.",
      "Sudah punya nilai sebelumnya? Masukkan GPA Anda sebelumnya dan kredit yang diperoleh sejauh ini, dan hasil semester menyatu menjadi GPA kumulatif dengan rata-rata tertimbang yang sama seperti yang dijalankan registrar Anda. Baris yang tidak lengkap dilewati, bukan ditebak, sehingga angka hanya mencerminkan mata kuliah yang benar-benar Anda isi.",
    ],
    steps: [
      "Tambahkan satu baris per mata kuliah: nama (opsional), jam kredit, dan nilai huruf.",
      "Biarkan kolom sebelumnya kosong pada semester pertama, atau masukkan GPA Anda sejauh ini.",
      "Masukkan kredit yang diperoleh sejauh ini agar pencampuran tertimbang dengan benar.",
      "Baca GPA semester dan GPA kumulatif gabungan.",
    ],
    faqs: [
      {
        q: "Berapa poin kualitas yang dibawa setiap nilai huruf?",
        a: "Pada skala 4,0 standar: A+ dan A = 4,0, A− = 3,7, B+ = 3,3, B = 3,0, B− = 2,7, C+ = 2,3, C = 2,0, C− = 1,7, D+ = 1,3, D = 1,0, D− = 0,7, dan F = 0. GPA = Σ(poin × kredit) ÷ Σkredit, sehingga A pada 4 kredit menyumbang 12 poin kualitas dibanding 9,9 untuk B+ pada 3 kredit.",
      },
      {
        q: "Bagaimana GPA kumulatif mencampur dua catatan?",
        a: "GPA kumulatif = (GPA semester × kredit semester + GPA sebelumnya × kredit sebelumnya) ÷ total kredit. Misalnya, semester 3,60 pada 7 kredit di atas transkrip 3,00 pada 60 kredit menghasilkan (3,60 × 7 + 3,00 × 60) ÷ 67 ≈ 3,06. Penimbangan dengan kredit itulah yang mencegah semester ringan mendistorsi catatan Anda.",
      },
      {
        q: "Mengapa baris tanpa nilai atau kredit tidak mengubah GPA saya?",
        a: "Mata kuliah hanya dihitung bila jam kredit dan nilai hurufnya keduanya ada — apa pun yang terisi setengah dibuang alih-alih dianggap nol, agar GPA mencerminkan mata kuliah yang benar-benar Anda selesaikan. Lengkapi barisnya dan total langsung diperbarui.",
      },
    ],
  },
  "heart-rate-zones-calculator": {
    name: "Kalkulator Zona Denyut Jantung",
    tagline:
      "Ubah denyut maksimum dan istirahat menjadi lima zona latihan metode Karvonen — pemanasan, pembakaran lemak, aerobik, anaerobik, dan VO₂ max, dalam bpm.",
    intro: [
      "Masukkan usia dan denyut istirahat Anda, dan kalkulator memperkirakan denyut maksimum Anda (206,9 − 0,67 × usia, regresi dari maksimum terukur laboratorium), lalu membelah rentang antara istirahat dan maksimum menjadi lima zona latihan klasik. Orang 30 tahun dengan denyut istirahat 60 bpm mendapat maksimum mendekati 187 bpm dan pita Z3 aerobik sekitar 149–161 bpm — angka nyata yang bisa Anda adukan dengan strap dada atau jam.",
      "Zona dihitung dengan metode cadangan denyut jantung Karvonen: bpm = istirahat + % × (maksimum − istirahat). Karena yang diskalakan adalah cadangan — bukan maksimum — zona tetap jujur bagi orang yang denyut istirahatnya tidak lazim rendah atau tinggi. Tahu maksimum terukur Anda dari tes laboratorium atau lomba yang berat? Beralihlah ke manual dan masukkan langsung.",
    ],
    steps: [
      "Masukkan usia untuk memperkirakan denyut maksimum, atau beralih ke Manual dan ketik nilai terukur.",
      "Masukkan denyut istirahat Anda — pembacaan pagi sebelum bangun paling baik.",
      "Baca lima zona dengan persentase cadangan dan rentang bpm-nya.",
      "Cocokkan jam atau strap dada Anda dengan zona yang ditargetkan saat latihan.",
    ],
    faqs: [
      {
        q: "Apakah 206,9 − 0,67 × usia lebih akurat daripada 220 − usia?",
        a: "Ya, pada tingkat populasi. Aturan lama 220 − usia menelusuri kembali ke tabel tahun 1970-an yang tak pernah ditelaah sejawat dan menaksir berlebih denyut maksimum orang tua. Regresi modern yang dipadankan dengan maksimum terukur laboratorium — 208 − 0,7 × usia milik Tanaka, 207 − 0,7 × usia milik Gellish, dan persamaan serupa seperti 206,9 − 0,67 × usia yang dipakai di sini — mengikuti maksimum nyata jauh lebih baik di segala usia. Namun persamaan mana pun membawa sebaran individu sekitar ±10 bpm: estimasi adalah titik awal, dan maksimum yang terukur di laboratorium atau dari usaha yang benar-benar sampai batas selalu menang.",
      },
      {
        q: "Mengapa kalkulator memakai cadangan denyut jantung (HRR) alih-alih persentase denyut maksimum?",
        a: "Metode Karvonen mengukur intensitas dari rentang antara denyut istirahat dan maksimal Anda, bagian yang benar-benar bekerja. Memakai % maksimum langsung menempatkan zona 60–70% pada 112–131 bpm untuk contoh orang 30 tahun di atas; memakai % cadangan menempatkannya pada 136–149 bpm. Secara fisiologis, usaha menskalakan dengan seberapa banyak cadangan yang Anda pakai, sehingga zona berbasis cadangan sejalan lebih baik dengan ambang ventilasi dan persepsi usaha — terutama bagi orang dengan denyut istirahat rendah.",
      },
      {
        q: "Bagaimana cara mengukur denyut istirahat saya?",
        a: "Ukur pagi hari, tepat setelah terbangun dan sebelum keluar tempat tidur: hitung denyut nadi selama 60 detik (atau 30 detik × 2), dan ulangi beberapa hari untuk meratakan derau. Angka istirahat 7 hari dari perangkat wearable juga bisa. Orang dewasa biasa berada di antara 60 dan 80 bpm; atlet ketahanan yang terlatih baik sering berada di kisaran 40-an atau 50-an. Bila denyut istirahat Anda di atas estimasi maksimum — atau obat seperti beta-blocker memengaruhi denyut jantung Anda — masukkan kedua angka secara manual.",
      },
    ],
  },
  "shoe-size-converter": {
    name: "Konverter Ukuran Sepatu",
    tagline:
      "Konversikan ukuran sepatu antara sistem US, UK, EU, dan Jepang untuk pria dan wanita — dipatok pada panjang kaki dalam sentimeter.",
    intro: [
      "Pilih sistem dan ukuran apa pun, dan semua padanannya muncul sekaligus, dipatok pada panjang kaki dalam sentimeter agar perbandingannya fisik, bukan menebak-nebak.",
      "Ukuran tidak distandarkan antar merek — anggap hasilnya sebagai titik awal dan ukur kaki Anda di akhir hari, saat mereka paling besar.",
    ],
    steps: [
      "Pilih skala ukuran pria atau wanita.",
      "Pilih sistem yang Anda kenal dan masukkan ukurannya.",
      "Baca ukuran padanan di setiap sistem lain.",
    ],
    faqs: [
      {
        q: "Mengapa merek-merek berbeda hingga setengah ukuran?",
        a: "Bentuk last dan manufaktur bervariasi. Tabel memberikan konversi standar; merek individual bisa berukuran lebih kecil atau lebih besar, jadi selalu periksa grafik milik merek itu sendiri saat memesan daring.",
      },
      {
        q: "Bagaimana cara mengukur kaki saya?",
        a: "Berdirilah di atas selembar kertas di akhir hari, telusuri kedua kaki, dan ukur dari tumit ke jari terpanjang dalam sentimeter. Gunakan kaki yang lebih besar.",
      },
    ],
  },
  "stopwatch": {
    name: "Stopwatch",
    tagline:
      "Stopwatch daring presisi dengan catatan lap — mulai, jeda, lap, dan atur ulang — dengan pengukuran bebas selisih yang dipatok pada jam sistem.",
    intro: [
      "Mengukur waktu berlalu sampai seperseratus detik memakai jam sistem, bukan interval yang terakumulasi, sehingga tetap akurat bahkan ketika peramban memperlambat tab latar belakang.",
      "Catat lap saat berjalan; setiap lap menampilkan split-nya sendiri dan total berjalan, dan tampilan memakai angka tabular besar agar split tetap terbaca sekilas.",
    ],
    steps: [
      "Klik Mulai untuk memulai pengukuran.",
      "Klik Lap untuk mencatat split tanpa menghentikan pewaktu.",
      "Jeda, lanjutkan, atau atur ulang kapan saja.",
    ],
    faqs: [
      {
        q: "Apakah ia akurat?",
        a: "Ya — waktu berlalu diturunkan dari Date.now() terhadap stempel waktu mulai yang tetap, bukan callback pewaktu yang terakumulasi, sehingga pembatasan tab latar belakang tak bisa menyebabkan selisih waktu.",
      },
      {
        q: "Apakah lap bertahan melewati pemuatan ulang halaman?",
        a: "Tidak — seperti stopwatch fisik, mengatur ulang atau memuat ulang membersihkan sesi. Biarkan tab terbuka untuk menyimpan lap.",
      },
    ],
  },
  "countdown-timer": {
    name: "Timer Hitung Mundur",
    tagline:
      "Atur hitung mundur dengan cincin kemajuan dan dentang pada nol — prasetel 1 hingga 25 menit atau durasi kustom apa pun.",
    intro: [
      "Hitung mundur bersih untuk memasak, latihan, rapat, dan sesi belajar. Cincin menunjukkan kemajuan sekilas, dan dentang sintetis singkat berbunyi ketika waktu habis.",
      "Tenggat dipatok pada jam sistem, sehingga hitung mundur terus berjalan dengan benar bahkan bila Anda berpindah ke tab lain.",
    ],
    steps: [
      "Atur jam, menit, dan detik — atau ketuk prasetel cepat.",
      "Klik Mulai; cincin berkurang seiring waktu berjalan.",
      "Dentang berbunyi dan cincin berubah hijau pada nol.",
    ],
    faqs: [
      {
        q: "Apakah ia terus berjalan di tab latar belakang?",
        a: "Ya — tenggat dipatok pada jam sistem, sehingga berpindah tab atau pembatasan tidak memengaruhi sisa waktu.",
      },
      {
        q: "Apakah saya akan mendengar dentangnya?",
        a: "Itu nada sintetis singkat via WebAudio. Biarkan tab tidak dibisukan dan volume perangkat Anda dinaikkan; tak ada berkas audio untuk diunduh.",
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  /* DEVELOPMENT — TYPESCRIPT, JSON DIFF, JSON PATHS, YAML                */
  /* ------------------------------------------------------------------ */
  "json-to-typescript": {
    name: "JSON ke TypeScript",
    tagline:
      "Hasilkan interface TypeScript dari JSON apa pun — objek bersarang, array, dan union, siap ditempel langsung ke proyek Anda.",
    intro: [
      "Tempel respons JSON dan dapatkan interface bertipe seketika: objek bersarang menjadi interface bernama, array objek menggabungkan semua elemen menjadi satu bentuk, array campuran menjadi union. Nama root bisa dikonfigurasi.",
      "Dibuat untuk pekerjaan API — tempel respons endpoint, salin tipenya, dan biarkan compiler menangkap perubahan bentuk untuk Anda.",
    ],
    steps: [
      "Tempel JSON Anda (respons API paling cocok).",
      "Ubah nama interface root jika menginginkan yang lain selain Root.",
      "Salin interface yang dihasilkan ke proyek Anda.",
    ],
    faqs: [
      {
        q: "Bagaimana array ditangani?",
        a: "Array objek menggabungkan key dari semua elemen menjadi satu interface (key yang hilang memang akan jadi error saat runtime). Array bertipe campuran menjadi union seperti string | number. Array kosong turun menjadi unknown[].",
      },
      {
        q: "Apakah semua field wajib?",
        a: "Ya — satu sampel tidak bisa membuktikan opsionalitas, jadi semuanya required. Tandai sendiri field yang opsional di tempat API Anda mengizinkan null atau key yang hilang.",
      },
    ],
  },
  "json-diff": {
    name: "JSON Diff",
    tagline:
      "Bandingkan dua dokumen JSON path demi path — key yang ditambahkan, dihapus, dan diubah dengan nilai sebelum/sesudah, semuanya lokal.",
    intro: [
      "Tempel dua dokumen JSON dan lihat setiap perbedaan struktural: key ditambahkan, key dihapus, nilai berubah — masing-masing dilaporkan dengan path lengkapnya seperti $.user.name.",
      "Objek dan array bersarang ditelusuri secara rekursif, jadi perubahan yang terkubur tiga level dalam tetap muncul dengan path persisnya dan kedua nilai.",
    ],
    steps: [
      "Tempel JSON pertama (yang asli).",
      "Tempel JSON kedua (versi barunya).",
      "Baca daftar diff — setiap baris adalah satu perubahan level path.",
    ],
    faqs: [
      {
        q: "Bagaimana array dibandingkan?",
        a: "Per indeks: elemen 0 lawan elemen 0, dan seterusnya. Elemen ekstra di salah satu sisi muncul sebagai ditambahkan atau dihapus di indeksnya.",
      },
      {
        q: "Apakah urutan key berpengaruh?",
        a: "Tidak — objek dibandingkan berdasarkan key, bukan urutan penyisipan. Dua dokumen dengan key yang sama dalam urutan berbeda dianggap identik.",
      },
    ],
  },
  "json-path-query": {
    name: "Kueri JSON Path",
    tagline:
      "Ekstrak nilai apa pun dari JSON dengan path seperti $.user.name atau $.items[0].id — instan, pengampun, tanpa perlu belajar sintaks jq.",
    intro: [
      "Tunjuk persis nilai yang Anda butuhkan: notasi titik, indeks array, dan key berkutip semuanya jalan ($.items[0].id, $['weird key']). Pas untuk menarik satu field dari respons API yang besar.",
      "Tidak pernah melempar error — path yang salah mengembalikan alasannya dalam bahasa manusia (key tidak ditemukan, indeks di luar jangkauan) supaya bisa diperbaiki dan dicoba lagi.",
    ],
    steps: [
      "Tempel JSON Anda.",
      "Ketik path ke nilai yang diinginkan — $ adalah root.",
      "Salin nilai yang terekstrak.",
    ],
    faqs: [
      {
        q: "Sintaks path apa yang didukung?",
        a: "Subset sehari-hari: notasi titik ($.a.b), indeks array ($.items[0]), key berkutip ($['odd key']). Filter dan wildcard JSONPath lengkap di luar cakupan — alat ini untuk ekstraksi langsung.",
      },
      {
        q: "Apa yang terjadi jika path salah?",
        a: "Anda mendapat alasan persisnya: key mana yang hilang atau indeks mana yang di luar jangkauan. Tidak ada yang crash.",
      },
    ],
  },
  "json-yaml-converter": {
    name: "Konverter JSON ⇄ YAML",
    tagline:
      "Konversi JSON ke YAML dan sebaliknya — siap untuk file config, dengan alur tombol tukar untuk lanjut dan pesan error yang presisi.",
    intro: [
      "Konversi dua arah antara JSON dan YAML: tempel JSON, dapatkan YAML bersih indentasi 2 spasi untuk file config Anda; tempel YAML, dapatkan JSON. Tombol tukar membalik arahnya sehingga bolak-balik selesai di satu panel.",
      "Ditenagai js-yaml dengan pelaporan error presisi — indentasi salah atau key duplikat menunjukkan dengan persis apa yang salah, bukan kegagalan yang samar.",
    ],
    steps: [
      "Tempel JSON atau YAML sesuai arahnya.",
      "Klik konversi — output muncul di bawah.",
      "Gunakan tombol tukar untuk melanjutkan konversi ke arah sebaliknya.",
    ],
    faqs: [
      {
        q: "Fitur YAML apa yang didukung?",
        a: "Skema core standar js-yaml: map bersarang, sequence, skalar, string berkutip. Anchor YAML dan tag kustom dibiarkan di luar cakupan demi bolak-balik yang andal.",
      },
      {
        q: "Mengapa konversi saya gagal?",
        a: "Paling sering karena karakter tab di indentasi YAML (tab dilarang di sana) atau key duplikat di JSON. Pesan error menunjukkan masalahnya.",
      },
    ],
  },
  "sha1-generator": {
    name: 'Generator SHA-1',
    tagline: 'Hitung hash SHA-1 dari teks atau file di browser Anda dengan WebCrypto native — masih dipakai di commit Git dan checksum legacy. 100% lokal.',
    intro: ['Tempel teks untuk melihat digest SHA-1 160-bit secara langsung, atau jatuhkan file untuk mengambil sidik jarinya secara lokal. Mesin WebCrypto peramban yang bekerja — tidak satu byte pun keluar dari perangkat.', 'SHA-1 legacy tapi hidup: Git masih mengidentifikasi objek dengannya dan banyak sistem lama memverifikasi unduhan dengan checksum SHA-1. Gunakan untuk kompatibilitas — untuk keamanan pilih SHA-256 atau lebih kuat.'],
    steps: ['Ketik atau tempel teks — digest diperbarui saat mengetik.', 'Atau beralih ke mode file dan jatuhkan file untuk di-hash lokal.', 'Salin digest heksadesimal dan bandingkan dengan nilai yang diharapkan.'],
    faqs: [
        { q: 'q', a: 'a' },
        { q: 'q', a: 'a' },
        { q: 'q', a: 'a' },
    ],
  },
  "sha384-generator": {
    name: 'Generator SHA-384',
    tagline: 'Hitung hash SHA-384 dari teks atau file di browser Anda dengan WebCrypto native — digest SHA-2 terkuat untuk checksum, HMAC dan integritas arsip. 100% lokal.',
    intro: ['Tempel teks untuk melihat digest 384-bit secara langsung, atau jatuhkan file untuk sidik jari lokal. Di perangkat keras 64-bit SHA-384 sering lebih cepat dari SHA-256 — ideal untuk arsip besar.', 'SHA-384 muncul di tanda tangan HMAC API, verifikasi image disk, dan checksum arsip jangka panjang. Salin digest heksadesimal dan bandingkan dengan nilai yang dipublikasikan.'],
    steps: ['Ketik atau tempel teks — digest diperbarui langsung.', 'Atau beralih ke mode file dan jatuhkan file untuk di-hash lokal.', 'Salin digest heksadesimal dan bandingkan.'],
    faqs: [
        { q: 'q', a: 'a' },
        { q: 'q', a: 'a' },
    ],
  },
  "sha512-generator": {
    name: 'Generator SHA-512',
    tagline: 'Hitung hash SHA-512 dari teks atau file di browser Anda dengan WebCrypto native — digest SHA-2 terkuat untuk checksum, HMAC dan integritas arsip. 100% lokal.',
    intro: ['Tempel teks untuk melihat digest 512-bit secara langsung, atau jatuhkan file untuk sidik jari lokal. Di perangkat keras 64-bit SHA-512 sering lebih cepat dari SHA-256 — ideal untuk arsip besar.', 'SHA-512 muncul di tanda tangan HMAC API, verifikasi image disk, dan checksum arsip jangka panjang. Salin digest heksadesimal dan bandingkan dengan nilai yang dipublikasikan.'],
    steps: ['Ketik atau tempel teks — digest diperbarui langsung.', 'Atau beralih ke mode file dan jatuhkan file untuk di-hash lokal.', 'Salin digest heksadesimal dan bandingkan.'],
    faqs: [
        { q: 'q', a: 'a' },
        { q: 'q', a: 'a' },
    ],
  },
  "text-to-binary": {
    name: 'Teks → biner',
    tagline: 'Ubah teks apa pun menjadi byte biner 8-bit dan kembali — aman UTF-8, instan, sepenuhnya di peramban Anda. Sempurna untuk mengajar, teka-teki, dan tugas ilmu komputer.',
    intro: ["Setiap karakter yang diketik menjadi rangkaian byte UTF-8 yang ditampilkan sebagai kelompok delapan 0 dan 1. 'Hi!' menjadi 01001000 01101001 00100001 — persis bit yang disimpan komputer, dalam bentuk yang bisa dibaca dan disalin.",
        'Aktifkan Dekode untuk arah sebaliknya: tempel kelompok biner yang dipisah spasi dan dapatkan kembali teks aslinya. Karakter multibyte seperti emoji dan CJK ditangani dengan benar karena dekode melewati TextDecoder UTF-8 asli peramban.'],
    steps: ['Ketik atau tempel teks untuk dikodekan — biner muncul langsung.',
        "Nyalakan 'Dekode biner ke teks' untuk mengubah kelompok biner kembali menjadi kata.",
        'Salin hasilnya dengan satu klik.'],
    faqs: [
        { q: 'q', a: 'a' },
        { q: 'q', a: 'a' },
        { q: 'q', a: 'a' },
    ],
  },
  "text-to-unicode": {
    name: 'Teks → Unicode',
    tagline: 'Escape teks apa pun ke \\uXXXX, \\u{...}, U+XXXX atau titik kode desimal — dan dekode semuanya kembali. Aman emoji, instan, sepenuhnya lokal.',
    intro: ['Escape Unicode adalah cara kode sumber, payload JSON, dan berkas konfigurasi mewakili karakter yang sulit diketik atau tidak aman disematkan. Tempel string apa pun dan pilih notasi: \\uXXXX untuk bentuk klasik JavaScript/Java, \\u{...} untuk dukungan penuh bidang suplemen, U+XXXX seperti di tabel kode, atau titik desimal.',
        'Mode dekode memahami keempat notasi yang tercampur: dari \\u00e9 hingga U+1F600 atau &#128512; Anda mendapatkan teks yang terbaca. Karakter di luar BMP (emoji, CJK langka) beralih otomatis ke \\u{...} dalam mode \\uXXXX alih-alih menghasilkan pasangan pengganti yang rusak.'],
    steps: ['Tempel teks untuk di-escape — keluaran diperbarui langsung.',
        'Pilih notasi: \\uXXXX, \\u{...}, U+XXXX atau desimal.',
        'Atau nyalakan mode dekode dan tempel escape untuk mendapatkan teks kembali.'],
    faqs: [
        { q: 'q', a: 'a' },
        { q: 'q', a: 'a' },
        { q: 'q', a: 'a' },
    ],
  },
  "text-to-nato-alphabet": {
    name: 'Konverter alfabet NATO',
    tagline: 'Eja teks apa pun dengan alfabet fonetik NATO — Alfa, Bravo, Charlie — dan dekode kata yang dieja kembali menjadi teks. Standar komunikasi radio dan telepon yang jelas.',
    intro: ['Alfabet fonetik NATO (Alfa, Bravo, Charlie…) mengganti setiap huruf dengan kata yang unik, sehingga teks tersampaikan tanpa salah lewat radio atau telepon meski ada derau.',
        'Tempel teks Anda: setiap huruf, angka, dan simbol diubah menjadi kata kode standar ICAO/NATO.',
        'Mode dekode bekerja sebaliknya: tempel rangkaian kata kode dan dapatkan kembali teks aslinya.',
        'Variasi ejaan umum dikenali otomatis (Alfa/Alpha, Juliett/Juliet).',
        'Semuanya berjalan di browser Anda: tidak ada teks yang dikirim ke server.'],
    steps: ['Tempel atau ketik teks yang ingin dieja di kolom masukan.',
        'Baca rangkaian kata kode yang dihasilkan, atau aktifkan mode dekode lalu tempel kata-kata kodenya.',
        'Salin hasilnya dan gunakan untuk lalu lintas radio, dukungan teknis, atau pengejaan.'],
    faqs: [
        { q: 'Apa itu alfabet NATO?', a: 'Alfabet fonetik NATO/ICAO: setiap huruf diganti kata (A = Alfa, B = Bravo…) agar tidak ada kebingungan saat transmisi. Dipakai penerbangan, militer, layanan darurat, dan dukungan teknis.' },
        { q: 'Apakah angka juga dikonversi?', a: 'Ya. 0–9 menjadi Zero, One (Wun), Two, Tree, Fower, Five, Six, Seven, Eight, Nine — pelafalan standar ICAO ditampilkan di samping setiap kata kode.' },
        { q: 'Bagaimana aksen dan emoji?', a: 'Huruf beraksen dikembalikan ke huruf dasarnya (É → Echo); emoji dan karakter di luar alfabet ditampilkan apa adanya karena tidak bisa dieja.' },
    ],
  },
};