// Layanan Tetra Visual — tiap entri menjadi satu halaman /layanan/<slug>.
// Judul & H1 sengaja memuat kata yang diketik calon klien di Google
// ("jasa dokumentasi event bogor"), dan tiap halaman menampilkan karya nyata
// yang relevan sebagai bukti. Tulis hanya klaim yang benar.

/** Paket berharga tetap (sejauh ini hanya rangkaian pernikahan — layanan lain harganya menyesuaikan acara). */
export interface Package {
  name: string;
  /** mis. "Foto & Video · 5 jam" */
  kind: string;
  price: number;
  items: string[];
}

export interface Service {
  slug: string;
  /** Nama pendek untuk menu & kartu. */
  name: string;
  /** Satu kalimat untuk kartu layanan. */
  short: string;
  /** <title> — kata kunci utama di depan. */
  title: string;
  /** Meta description (±150 karakter) — teks yang tampil di hasil Google. */
  description: string;
  h1: string;
  lead: string;
  body: string[];
  includes: string[];
  forWho: string[];
  /** Slug proyek yang jadi bukti di halaman ini (urutan = urutan tampil). */
  projects: string[];
  faq: [string, string][];
  /** Tautan keluar bila layanan ditangani situs lain (mis. photobooth). */
  external?: { label: string; href: string };
  packages?: Package[];
  /** Foto karya khusus layanan ini (path relatif ke src/assets/), foto pertama = latar hero. */
  gallery?: string[];
}

const AREA = 'Bogor, Jakarta, Depok, Tangerang, dan Bekasi';

// FAQ yang berlaku untuk semua layanan, ditambahkan di bawah FAQ khusus.
export const costFaq: [string, string] = ['Berapa biayanya?', 'Biaya disesuaikan dengan durasi acara, jumlah kru, dan hasil yang dibutuhkan. Ceritakan kebutuhan Anda lewat WhatsApp, admin kami akan mengirimkan penawaran yang pas.'];

export const commonFaq: [string, string][] = [
  ['Area mana saja yang dilayani?', `Kantor kami di Bogor Tengah, Kota Bogor. Kami rutin bekerja di ${AREA}, dan juga melayani acara di luar kota — kami pernah bertugas hingga Bali dan Gunung Rinjani.`],
  ['Bagaimana cara memesan?', 'Hubungi kami lewat WhatsApp dengan menyebutkan jenis acara, tanggal, dan lokasi. Setelah jadwal dan penawaran disepakati, tim kami siap bertugas di hari H.'],
];

// Langkah kerja yang sama untuk semua layanan.
export const process: [string, string][] = [
  ['Konsultasi', 'Ceritakan acara, tanggal, lokasi, dan kebutuhan Anda lewat WhatsApp.'],
  ['Penawaran & jadwal', 'Admin mengirim penawaran sesuai kebutuhan dan mengunci tanggal Anda.'],
  ['Produksi', 'Tim kami datang tepat waktu dan merekam setiap momen penting.'],
  ['Hasil diserahkan', 'Foto dan video diedit rapi lalu dikirim dalam format digital.'],
];

// FAQ bersama untuk paket rangkaian pernikahan (jawaban dari admin Tetra, 25 Sep 2026).
const weddingFaq: [string, string][] = [
  ['Berapa lama hasil foto dan video jadi?', 'Paling lambat 1 bulan setelah acara.'],
  ['Apakah ada biaya transport?', 'Untuk acara di luar Bogor ada biaya transport yang menyesuaikan jarak lokasi. Admin kami akan menginformasikannya bersama penawaran.'],
  ['Bagaimana sistem DP untuk mengunci tanggal?', 'DP minimal Rp500.000 dan dapat disesuaikan dengan acaranya — untuk acara tertentu DP bisa 50%. Tanggal Anda terkunci setelah DP diterima.'],
  ['Apakah bisa sekaligus menyediakan photobooth untuk tamu?', 'Bisa, melalui Tetra Photobooth yang satu perusahaan dengan kami.'],
];

const FRAME = '1 photo frame 16R (40×60 cm)';

export const services: Service[] = [
  {
    slug: 'dokumentasi-event',
    name: 'Dokumentasi Event',
    short: 'Foto & video untuk seminar, peluncuran produk, grand opening, pameran, hingga festival.',
    title: 'Jasa Dokumentasi Event Bogor & Jakarta — Foto dan Video',
    description: 'Jasa dokumentasi event foto & video di Bogor, Jakarta, dan Jabodetabek. Dipercaya Samsung, Eiger, Pertamina Patra Niaga, dan Bank Indonesia.',
    h1: 'Jasa Dokumentasi Event di Bogor & Jakarta',
    lead: 'Setiap acara punya momen yang tidak bisa diulang. Kami memastikan semuanya terekam — dari sambutan pembuka sampai foto bersama di akhir acara.',
    body: [
      'Tetra Visual menangani dokumentasi foto dan video untuk berbagai skala acara: grand opening toko, peluncuran produk, pameran, seminar, rapat kerja, hingga event petualangan di alam terbuka. Hasilnya tidak berhenti sebagai arsip — video highlight kami dibuat untuk langsung dipakai di media sosial dan materi promosi Anda.',
      'Kami sudah mendokumentasikan grand opening Samsung dan Under Armour, Bulan K3 Nasional di Pertamina Patra Niaga, pameran kendaraan listrik Kementerian Perindustrian, rangkaian event Eiger Adventure di Gunung Ciremai dan Rinjani, serta kampanye QRIS Bank Indonesia.',
    ],
    includes: ['Foto dokumentasi acara', 'Video highlight siap unggah media sosial', 'Video dokumentasi lengkap', 'Liputan udara dengan drone (opsional)', 'Live streaming (opsional)'],
    forWho: ['Grand opening & peluncuran produk', 'Seminar, konferensi & rapat kerja', 'Pameran & expo', 'Event komunitas & festival', 'Event petualangan & outdoor'],
    projects: ['samsung', 'mountain-jungle-course-2022', 'bulan-k3-nasional-pertamina-patra-niaga', 'qris-jelajah-indonesia', 'under-armor', 'pameran-kendaraan-listrik', 'mountain-jungle-course-2024', 'poly', 'sahabat-perjalanmu-bali', 'universita-indonesia', 'flex-living', 'reuni-fe-universitas-indonesia'],
    faq: [
      ['Apakah bisa foto dan video sekaligus?', 'Bisa. Tim foto dan video kami bekerja bersama dalam satu acara, jadi gaya hasilnya seragam dan Anda cukup berkoordinasi dengan satu tim.'],
      ['Apakah bisa untuk event di luar ruangan atau di lokasi terpencil?', 'Bisa. Kami terbiasa bertugas di alam terbuka, termasuk mendampingi event Eiger Adventure di Taman Nasional Gunung Ciremai dan Gunung Rinjani.'],
    ],
  },
  {
    slug: 'video-company-profile',
    name: 'Video Company Profile',
    short: 'Video profil perusahaan, instansi, dan destinasi yang menjual cerita, bukan sekadar gambar.',
    title: 'Jasa Video Company Profile Bogor & Jakarta',
    description: 'Jasa pembuatan video company profile & video promosi di Bogor dan Jakarta. Karya kami juara 1 lomba video promosi wisata & kuliner Kota Bogor.',
    h1: 'Jasa Video Company Profile di Bogor & Jakarta',
    lead: 'Video profil yang baik membuat orang paham siapa Anda dalam dua menit — dan ingin tahu lebih banyak.',
    body: [
      'Kami membuat video company profile untuk perusahaan, instansi pemerintah, UMKM, hingga destinasi wisata. Prosesnya dimulai dari memahami apa yang ingin Anda sampaikan, lalu kami susun konsep, pengambilan gambar, sampai penyuntingan akhir.',
      'Bersama Dinas Pariwisata dan Kebudayaan Kota Bogor kami membuat video promosi Jarambah Kampung Wisata dan Jajaki Rasa Kota Bogor. Karya video promosi kami juga meraih Juara 1 lomba video promosi wisata dan video promosi kuliner Kota Bogor.',
    ],
    includes: ['Konsep & naskah', 'Pengambilan gambar di lokasi', 'Pengambilan gambar udara (drone)', 'Wawancara & voice over', 'Editing, color grading & musik', 'Versi pendek untuk media sosial'],
    forWho: ['Profil perusahaan & pabrik', 'Instansi pemerintah & dinas', 'Klinik, hotel & usaha jasa', 'Destinasi wisata & kuliner', 'Laboratorium & industri'],
    projects: ['jarambah-kampung-wisata', 'jajaki-rasa-kota-bogor', 'pt-syslab', 'tarzan-studio', 'juara-1-promosi-wisata-kota-bogor', 'juara-1-promosi-kuliner-kota-bogor', 'juara-2-promosi-wisata-kota-bogor', 'juara-1-bogor-street-fest-capgomeh'],
    faq: [
      ['Apakah Tetra Visual membantu membuat konsep dan naskah?', 'Ya. Kami bisa mulai dari nol — Anda cukup menceritakan perusahaan dan tujuan videonya, kami susunkan konsep dan naskahnya.'],
      ['Apakah video bisa dipotong untuk Instagram dan TikTok?', 'Bisa. Selain versi utama, kami dapat membuat versi pendek berformat vertikal untuk media sosial.'],
    ],
  },
  {
    slug: 'gathering-outing-kantor',
    name: 'Gathering & Outing Kantor',
    short: 'Dokumentasi employee gathering, outing, dan team building yang seru untuk dikenang tim.',
    title: 'Jasa Dokumentasi Gathering, Outbound & Outing Kantor Bogor',
    description: 'Jasa foto & video dokumentasi employee gathering, outing, dan team building di Bogor dan Jabodetabek. Dipercaya Nutrifood, Astra Isuzu, Vivere Hotel.',
    h1: 'Dokumentasi Gathering & Outing Kantor',
    lead: 'Outing yang seru layak punya video yang membuat seluruh tim ingin ikut lagi tahun depan.',
    body: [
      'Kami mendokumentasikan employee gathering, outing, dan team building — dari permainan tim, sesi sambutan, sampai momen spontan yang paling sering dicari peserta setelah acara selesai.',
      'Kami pernah bertugas di lokasi outing favorit seperti Kebun Raya Bogor, Cijeruk, dan Taman Mini Indonesia Indah. Klien gathering kami antara lain Nutrifood, Astra Isuzu, Vivere Hotel, Energi Prima Nusantara, dan Vitacimin.',
    ],
    includes: ['Foto seluruh rangkaian acara', 'Video highlight untuk dibagikan ke karyawan', 'Foto kelompok & per divisi', 'Liputan drone (opsional)', 'Photobooth untuk peserta (opsional)'],
    forWho: ['Employee & family gathering', 'Outbound & team building', 'Camping di bumi perkemahan', 'Acara corporate di hotel & villa', 'Rapat kerja di luar kantor', 'Perayaan ulang tahun perusahaan'],
    projects: ['nutrifood', 'astra-izuzu', 'vivere-hotel', 'vitacimin', 'energi-prima-nusantara', 'pt-pharma-metric-labs', 'outing-dpmpd-tanggerang', 'patria', 'bank-artha-graha-internasional'],
    faq: [
      ['Apakah bisa mengikuti acara sehari penuh?', 'Bisa. Durasi peliputan disesuaikan dengan rundown acara Anda.'],
      ['Apakah bisa sekaligus menyediakan photobooth?', `Bisa. Tetra Visual satu perusahaan dengan Tetra Photobooth, jadi dokumentasi dan photobooth bisa diatur dalam satu pemesanan.`],
    ],
  },
  {
    slug: 'dokumentasi-olahraga',
    name: 'Dokumentasi Olahraga & Fun Run',
    short: 'Foto dan video fun run, marathon, trail run, zumba, dan turnamen dengan momen yang tajam.',
    title: 'Jasa Dokumentasi Fun Run, Lari & Olahraga — Bogor & Jakarta',
    description: 'Jasa foto & video dokumentasi fun run, half marathon, trail run, fun bike, dan zumba. Klien: Bank Indonesia, IPB, Kahf, Neurobion, Bogor Runners.',
    h1: 'Jasa Dokumentasi Fun Run & Event Olahraga',
    lead: 'Olahraga bergerak cepat. Momen terbaik — garis start, ekspresi di tanjakan, pelukan di garis finis — hanya terjadi sekali.',
    body: [
      'Kami berpengalaman meliput event lari dari fun run 5K sampai trail run internasional Mantra 116 dan IPB Half Marathon. Tim kami ditempatkan di titik-titik penting rute, sehingga peserta, sponsor, dan penyelenggara sama-sama mendapat foto dan video yang mereka butuhkan.',
      'Klien olahraga kami antara lain Bank Indonesia (fun run dan fun zumba), IPB, Es Teh Indonesia, Kahf, Neurobion, Mirae Asset, Erafone, serta berbagai event bersama komunitas Bogor Runners.',
    ],
    includes: ['Foto peserta di sepanjang rute', 'Video highlight & aftermovie', 'Liputan udara dengan drone', 'Video promosi sebelum acara', 'Dokumentasi sponsor & booth'],
    forWho: ['Fun run & marathon', 'Trail run', 'Fun bike & gowes', 'Zumba & senam massal', 'Turnamen & kompetisi olahraga'],
    projects: ['ipb-half-marathon-2024', 'fun-run-bank-indonesia-2025', 'mantra-116-2024', 'tugu-to-tugu', 'anniversary-es-teh-indonesia', 'kahf-x-bogor-runners', 'menang-bebas-nyeri', 'fun-zumba-bank-indonesia-2025', 'fun-bike-erafone', 'run-vesting', 'reformasi-run', 'decade-bogor-runners'],
    faq: [
      ['Berapa titik foto di sepanjang rute?', 'Jumlah titik disesuaikan dengan panjang rute dan jumlah kru yang dipesan. Kami akan menyarankan titik-titik terbaik setelah melihat peta rute Anda.'],
      ['Apakah bisa membuat video promosi sebelum event?', 'Bisa. Kami pernah membuat video promosi untuk DECADE, perayaan 10 tahun Bogor Runners.'],
    ],
  },
  {
    slug: 'paket-wedding',
    name: 'Paket Wedding',
    short: 'Foto & video akad dan resepsi, album magazine, frame, dan flashdisk — mulai Rp4 juta.',
    title: 'Paket Foto & Video Wedding Bogor — Mulai Rp4 Juta',
    description: 'Paket foto & video pernikahan di Bogor mulai Rp4 juta: 1 fotografer, 1 videografer, 8 jam, 100+ foto edit, video cinematic, album magazine, frame 16R, flashdisk custom.',
    h1: 'Paket Foto & Video Wedding di Bogor',
    lead: 'Hari pernikahan berlalu cepat. Kami merekamnya dengan tenang, supaya Anda bisa hadir sepenuhnya di hari itu.',
    body: [
      'Kami mendokumentasikan akad nikah atau pemberkatan hingga resepsi dengan gaya natural — momen haru dan tawa keluarga direkam apa adanya, tanpa dibuat-buat. Setiap paket wedding sudah mencakup fotografer dan videografer selama 8 jam kerja, lebih dari 100 foto hasil edit, dan video cinematic.',
      'Hasilnya bukan hanya file digital: album magazine 10 sheet, photo frame 16R, dan flashdisk custom sudah termasuk, sehingga kenangan Anda siap dipajang dan diwariskan.',
    ],
    includes: ['1 fotografer + 1 videografer', '8 jam kerja liputan', '100+ foto hasil edit', 'Video cinematic', 'Album magazine 10 sheet', 'Photo frame 16R (40×60 cm)', 'Flashdisk custom'],
    forWho: ['Akad nikah & pemberkatan', 'Resepsi pernikahan', 'Pernikahan adat Sunda', 'Intimate wedding'],
    packages: [
      { name: 'Kanaka', kind: 'Foto & Video · 8 jam', price: 4_000_000, items: ['1 fotografer', '1 videografer', 'Foto hasil edit (100+)', 'Video cinematic', '1 album magazine 10 sheet', FRAME, 'Flashdisk custom'] },
      { name: 'Kiran', kind: 'Foto & Video · 8 jam', price: 5_000_000, items: ['1 fotografer', '1 videografer', 'Foto hasil edit (100+)', 'Video cinematic', '1 album magazine 10 sheet', '2 photo frame 16R (40×60 cm)', 'Flashdisk custom'] },
    ],
    gallery: ['wedding/pengantin-sunda.jpg', 'wedding/galeri-1.jpg', 'wedding/tangan-pengantin.jpg', 'wedding/galeri-2.jpg'],
    projects: ['wedding-of-firly-bima', 'wedding-of-intan-rizki', 'wedding-of-rani-wahab', 'wedding-of-lisna-aji', 'sangjit-lisda-chis', 'bridal-shower-puspa'],
    faq: [
      ['Berapa lama durasi liputan paket wedding?', '8 jam kerja, cukup untuk akad dan resepsi di hari yang sama.'],
      ['Berapa jumlah foto yang didapat?', 'Lebih dari 100 foto hasil edit, ditambah video cinematic.'],
      ...weddingFaq,
    ],
  },
  {
    slug: 'paket-prewedding',
    name: 'Paket Prewedding',
    short: 'Sesi foto atau foto & video prewedding 4–5 jam — mulai Rp1,8 juta.',
    title: 'Paket Prewedding Bogor — Foto & Video Mulai Rp1,8 Juta',
    description: 'Paket foto prewedding di Bogor mulai Rp1,8 juta (4 jam, fotografer + asisten, frame 16R). Paket foto & video prewedding 5 jam Rp3 juta dengan video cinematic.',
    h1: 'Paket Foto & Video Prewedding di Bogor',
    lead: 'Prewedding adalah kesempatan bercerita tentang kalian berdua — sebelum hari besar yang serba sibuk.',
    body: [
      'Sesi prewedding kami santai dan diarahkan, bukan kaku. Fotografer dan asisten membantu mengatur pose, cahaya, dan suasana, sehingga hasilnya terasa natural namun tetap rapi — di sawah, taman, dapur, sampai studio.',
      'Bogor punya banyak latar alami yang cantik untuk prewedding, dari hamparan sawah hingga kawasan hijau di kaki gunung. Hasil foto bisa dipakai untuk undangan, dekorasi resepsi, maupun media sosial.',
    ],
    includes: ['Fotografer + asisten', 'Durasi 4–5 jam', 'Foto hasil edit', 'Video cinematic (paket Raspati)', 'Photo frame 16R (40×60 cm)'],
    forWho: ['Foto undangan pernikahan', 'Video untuk resepsi', 'Konten media sosial pasangan'],
    packages: [
      { name: 'Ramya', kind: 'Foto saja · 4 jam', price: 1_800_000, items: ['1 fotografer', '1 asisten', 'Foto hasil edit', FRAME] },
      { name: 'Raspati', kind: 'Foto & Video · 5 jam', price: 3_000_000, items: ['1 fotografer', '1 videografer', '1 asisten', 'Foto hasil edit', 'Video cinematic', FRAME] },
    ],
    gallery: ['wedding/prewedding-siluet.jpg', 'wedding/galeri-6.jpg', 'wedding/galeri-4.jpg', 'wedding/galeri-5.jpg'],
    projects: ['prawedding-felicia-hendri'],
    faq: weddingFaq,
  },
  {
    slug: 'foto-lamaran-engagement',
    name: 'Foto Lamaran & Engagement',
    short: 'Dokumentasi lamaran dan tukar cincin, foto saja atau foto & video — mulai Rp1,8 juta.',
    title: 'Foto & Video Lamaran Bogor — Paket Engagement Mulai Rp1,8 Juta',
    description: 'Paket dokumentasi lamaran & engagement di Bogor: foto saja Rp1,8 juta atau foto & video cinematic Rp2,5 juta, lengkap dengan photo frame 16R.',
    h1: 'Dokumentasi Lamaran & Engagement di Bogor',
    lead: 'Momen tukar cincin hanya berlangsung beberapa detik. Pastikan ada yang siap merekamnya.',
    body: [
      'Lamaran adalah pertemuan dua keluarga — penuh sambutan, seserahan, dan senyum gugup. Kami merekam rangkaiannya dari kedatangan keluarga, prosesi, hingga momen tukar cincin dan foto bersama.',
    ],
    includes: ['Fotografer (+ videografer pada paket Sakala)', 'Foto hasil edit', 'Video cinematic (paket Sakala)', 'Photo frame 16R (40×60 cm)'],
    forWho: ['Lamaran / khitbah', 'Tukar cincin & engagement', 'Sangjit', 'Seserahan'],
    packages: [
      { name: 'Sayuga', kind: 'Foto saja', price: 1_800_000, items: ['1 fotografer', 'Foto hasil edit', FRAME] },
      { name: 'Sakala', kind: 'Foto & Video', price: 2_500_000, items: ['1 fotografer', '1 videografer', 'Foto hasil edit', 'Video cinematic', FRAME] },
    ],
    gallery: ['wedding/lamaran-cincin.jpg', 'wedding/galeri-3.jpg'],
    projects: ['sangjit-lisda-chis'],
    faq: weddingFaq,
  },
  {
    slug: 'dokumentasi-pengajian-siraman',
    name: 'Pengajian, Siraman & Ngunduh Mantu',
    short: 'Dokumentasi rangkaian adat sebelum dan sesudah pernikahan — mulai Rp1,8 juta.',
    title: 'Dokumentasi Pengajian, Siraman & Ngunduh Mantu Bogor',
    description: 'Paket foto & video pengajian, siraman, dan ngunduh mantu di Bogor: foto saja Rp1,8 juta, foto & video cinematic Rp2,5 juta. Termasuk photo frame 16R.',
    h1: 'Dokumentasi Pengajian, Siraman & Ngunduh Mantu',
    lead: 'Rangkaian sebelum dan sesudah akad sering paling haru — dan paling sering terlewat didokumentasikan.',
    body: [
      'Pengajian dan siraman menjelang pernikahan, hingga ngunduh mantu setelahnya, adalah momen keluarga yang intim: doa bersama, air siraman dari orang tua, dan sambutan keluarga besar. Kami merekamnya dengan tenang dan sopan, tanpa mengganggu jalannya acara.',
      'Paket ini bisa dipesan terpisah atau digabung dengan paket wedding, sehingga seluruh rangkaian pernikahan Anda didokumentasikan oleh tim yang sama dengan gaya yang seragam.',
    ],
    includes: ['Fotografer (+ videografer pada paket Rembe)', 'Foto hasil edit', 'Video cinematic (paket Rembe)', 'Photo frame 16R (40×60 cm)'],
    forWho: ['Pengajian calon pengantin', 'Siraman', 'Ngunduh mantu', 'Syukuran keluarga'],
    packages: [
      { name: 'Raum', kind: 'Foto saja', price: 1_800_000, items: ['1 fotografer', 'Foto hasil edit', FRAME] },
      { name: 'Rembe', kind: 'Foto & Video', price: 2_500_000, items: ['1 fotografer', '1 videografer', 'Foto hasil edit', 'Video cinematic', FRAME] },
    ],
    gallery: ['wedding/pengajian-keluarga.jpg', 'wedding/galeri-3.jpg'],
    projects: [],
    faq: weddingFaq,
  },
  {
    slug: 'ulang-tahun-sweet-17',
    name: 'Ulang Tahun & Sweet 17',
    short: 'Pesta ulang tahun anak, sweet seventeen, aqiqah, hingga gender reveal.',
    title: 'Jasa Foto & Video Ulang Tahun dan Sweet 17 Bogor',
    description: 'Jasa dokumentasi foto & video pesta ulang tahun anak, sweet seventeen, aqiqah, dan gender reveal di Bogor dan Jabodetabek.',
    h1: 'Dokumentasi Ulang Tahun & Sweet 17',
    lead: 'Ulang tahun ke-17 hanya terjadi sekali. Kami pastikan dekorasi, tamu, dan momen tiup lilinnya terekam dengan cantik.',
    body: [
      'Kami meliput pesta ulang tahun anak, sweet seventeen, aqiqah, hingga gender reveal. Dari persiapan di belakang panggung sampai momen bersama keluarga dan teman, semua terekam dalam foto dan video yang siap dibagikan.',
    ],
    includes: ['Foto seluruh rangkaian acara', 'Video highlight pesta', 'Foto keluarga & tamu', 'Photobooth tamu (opsional)'],
    forWho: ['Sweet seventeen', 'Ulang tahun anak', 'Aqiqah', 'Gender reveal & baby shower'],
    projects: ['sweet-17th-vanessa', 'sweet-17th-retorika', 'sweet-17th-vios', 'sweet-17th-binda', 'sweet-17th-jeanettes', 'sweet-17th-alaina', 'sweet-17th-rebecca', 'birthday-ali', 'birthday-eunoia-aqiqah-omeera', 'gender-reveal-adiba-egy', 'gender-reveal-shabrina-stenly'],
    faq: [],
  },
  {
    slug: 'foto-wisuda',
    name: 'Foto & Video Wisuda',
    short: 'Wisuda sekolah dan kampus, sidang, hingga sesi foto kelulusan pribadi.',
    title: 'Jasa Foto & Video Wisuda Bogor',
    description: 'Jasa foto dan video wisuda sekolah & kampus, dokumentasi sidang, serta sesi foto kelulusan pribadi di Bogor dan Jabodetabek.',
    h1: 'Jasa Foto & Video Wisuda di Bogor',
    lead: 'Kelulusan adalah hasil kerja bertahun-tahun. Rayakan dengan foto yang layak dipajang.',
    body: [
      'Kami melayani dokumentasi wisuda untuk sekolah dan kampus — termasuk Wisuda MAN 2 Kota Bogor — serta sesi foto kelulusan pribadi dan dokumentasi sidang akhir.',
    ],
    includes: ['Dokumentasi acara wisuda', 'Sesi foto kelulusan pribadi & keluarga', 'Video highlight wisuda', 'Dokumentasi sidang'],
    forWho: ['Sekolah & madrasah', 'Kampus & fakultas', 'Wisudawan pribadi & keluarga'],
    projects: ['wisuda-man-2-koto-bogor-tahun-2024', 'sidang-s3-mr-jirui-dong', 'photoshoot-farika'],
    faq: [],
  },
  {
    slug: 'foto-produk-makanan-fashion',
    name: 'Foto Produk, Makanan & Fashion',
    short: 'Foto produk untuk marketplace, foto makanan untuk menu, dan foto model pakaian.',
    title: 'Jasa Foto Produk, Foto Makanan & Foto Model Fashion Bogor',
    description: 'Jasa foto produk untuk marketplace dan katalog, foto makanan untuk menu & media sosial, serta foto model pakaian di Bogor dan Jabodetabek.',
    h1: 'Jasa Foto Produk, Makanan & Fashion',
    lead: 'Di toko online, foto adalah satu-satunya cara pembeli "memegang" produk Anda.',
    body: [
      'Kami memotret produk untuk marketplace dan katalog, makanan dan minuman untuk menu serta media sosial, dan model untuk koleksi pakaian. Pengalaman kami membuat video promosi kuliner Kota Bogor — yang meraih juara 1 — membuat kami paham cara membuat makanan terlihat menggoda di kamera.',
    ],
    includes: ['Foto produk latar polos untuk marketplace', 'Foto produk bergaya (lifestyle)', 'Foto makanan & minuman', 'Foto model pakaian (lookbook)', 'Video pendek produk untuk media sosial'],
    forWho: ['UMKM & brand lokal', 'Restoran, kafe & katering', 'Brand fashion', 'Penjual marketplace'],
    projects: ['juara-1-promosi-kuliner-kota-bogor', 'jajaki-rasa-kota-bogor', 'sahabat-perjalanmu-jakarta', 'sahabat-perjalanmu-bogor'],
    faq: [],
  },
  {
    slug: 'drone-aerial',
    name: 'Drone & Aerial',
    short: 'Foto dan video udara untuk event, properti, destinasi wisata, dan company profile.',
    title: 'Jasa Foto & Video Drone Bogor — Aerial Photography',
    description: 'Jasa foto dan video udara dengan drone di Bogor dan Jabodetabek untuk event, company profile, properti, dan promosi destinasi wisata.',
    h1: 'Jasa Foto & Video Drone di Bogor',
    lead: 'Beberapa cerita baru terlihat utuh dari ketinggian.',
    body: [
      'Kami menyediakan pengambilan gambar udara dengan drone, baik sebagai layanan tersendiri maupun pelengkap dokumentasi event dan video company profile. Gambar udara membuat skala acara, lokasi, dan bangunan Anda terlihat jauh lebih megah.',
    ],
    includes: ['Video udara sinematik', 'Foto udara resolusi tinggi', 'Gabungan dengan dokumentasi darat'],
    forWho: ['Event besar & outdoor', 'Destinasi wisata', 'Properti & kawasan', 'Video company profile'],
    projects: ['jajaki-rasa-kota-bogor', 'jarambah-kampung-wisata'],
    faq: [],
  },
  {
    slug: 'live-streaming',
    name: 'Live Streaming',
    short: 'Siaran langsung acara ke YouTube, Zoom, atau Instagram untuk peserta yang tidak bisa hadir.',
    title: 'Jasa Live Streaming Event Bogor & Jakarta',
    description: 'Jasa live streaming acara, seminar, wisuda, dan pernikahan ke YouTube, Zoom, dan media sosial di Bogor dan Jakarta.',
    h1: 'Jasa Live Streaming Event',
    lead: 'Tidak semua orang bisa hadir. Live streaming membuat mereka tetap menjadi bagian dari acara Anda.',
    body: [
      'Kami menyiarkan acara Anda secara langsung ke YouTube, Zoom, Instagram, atau platform lain — cocok untuk seminar, rapat umum, wisuda, peluncuran produk, hingga pernikahan dengan keluarga yang tinggal jauh. Live streaming bisa dipesan sekaligus dengan dokumentasi foto dan video.',
    ],
    includes: ['Siaran langsung ke YouTube, Zoom, atau media sosial', 'Rekaman siaran untuk arsip', 'Dipadukan dengan dokumentasi foto & video'],
    forWho: ['Seminar & konferensi hybrid', 'Rapat umum & acara internal', 'Wisuda', 'Pernikahan'],
    projects: [],
    faq: [],
  },
  {
    slug: 'photobooth',
    name: 'Photobooth',
    short: 'Photobooth untuk event, pernikahan, dan gathering — lewat Tetra Photobooth.',
    title: 'Sewa Photobooth Bogor untuk Event & Pernikahan',
    description: 'Sewa photobooth untuk event, pernikahan, gathering, dan ulang tahun di Bogor dan Jabodetabek bersama Tetra Photobooth, satu keluarga dengan Tetra Visual.',
    h1: 'Photobooth untuk Event & Pernikahan',
    lead: 'Tamu senang, kenang-kenangan langsung dibawa pulang.',
    body: [
      'Tetra Visual satu perusahaan dengan Tetra Photobooth. Artinya dokumentasi foto, video, dan photobooth acara Anda bisa ditangani satu tim dengan satu koordinasi — lebih praktis dan gayanya seragam.',
      'Tetra Photobooth sudah melayani ratusan acara, dari pernikahan dan ulang tahun sampai acara perusahaan seperti Pertamina, Bank Mandiri, dan JW Marriott.',
    ],
    includes: ['Cetak langsung ±10 detik per foto', 'Bingkai foto didesain sesuai tema acara', 'Unduh foto digital lewat kode QR', '360° spin booth (opsional)', 'Bisa dipesan bersama dokumentasi foto & video'],
    forWho: ['Pernikahan', 'Gathering & event perusahaan', 'Ulang tahun & sweet 17', 'Wisuda'],
    projects: [],
    faq: [],
    external: { label: 'Kunjungi Tetra Photobooth', href: 'https://tetraphoto.com' },
  },
  {
    slug: 'editing-video-desain-grafis',
    name: 'Editing Video & Desain Grafis',
    short: 'Penyuntingan video dari rekaman Anda, serta desain grafis untuk kebutuhan promosi.',
    title: 'Jasa Editing Video & Desain Grafis',
    description: 'Jasa editing video (highlight, aftermovie, konten media sosial) dan desain grafis untuk promosi dan acara oleh Tetra Visual, Bogor.',
    h1: 'Jasa Editing Video & Desain Grafis',
    lead: 'Sudah punya rekaman, tapi belum sempat mengolahnya? Serahkan pada kami.',
    body: [
      'Kami menyunting rekaman Anda menjadi video highlight, aftermovie, video promosi, atau konten pendek untuk media sosial — lengkap dengan musik, teks, dan color grading. Kami juga mengerjakan desain grafis untuk poster, konten media sosial, dan materi acara.',
    ],
    includes: ['Editing video highlight & aftermovie', 'Konten pendek vertikal untuk Reels & TikTok', 'Color grading & motion graphic sederhana', 'Desain poster & konten media sosial', 'Desain materi acara'],
    forWho: ['Brand & UMKM', 'Penyelenggara acara', 'Komunitas', 'Kreator konten'],
    projects: ['decade-bogor-runners', 'juara-1-bogor-street-fest-capgomeh', 'lari-santai-spotec'],
    faq: [],
  },
  {
    slug: 'ai-image-video',
    name: 'AI Image & Video',
    short: 'Pembuatan gambar dan video dengan AI generatif untuk konsep, promosi, dan konten kreatif.',
    title: 'Jasa AI Image & Video Generation',
    description: 'Jasa pembuatan gambar dan video dengan AI generatif untuk visual promosi, konsep kreatif, dan konten media sosial oleh Tetra Visual, Bogor.',
    h1: 'Jasa AI Image & Video Generation',
    lead: 'Visual yang sulit — atau mahal — untuk difoto, kini bisa dibuat.',
    body: [
      'Kami memadukan pengalaman produksi foto dan video dengan AI generatif untuk membuat gambar dan video: visual konsep sebelum syuting, materi promosi, latar produk, hingga konten kreatif untuk media sosial. Hasil AI kami olah kembali oleh editor, sehingga tetap rapi dan sesuai identitas brand Anda.',
    ],
    includes: ['Gambar promosi & visual konsep', 'Video pendek hasil AI', 'Latar & komposit untuk foto produk', 'Penyuntingan hasil AI agar sesuai brand'],
    forWho: ['Brand & kampanye digital', 'Konsep kreatif sebelum produksi', 'Konten media sosial'],
    projects: [],
    faq: [],
  },
];

export const serviceBySlug = new Map(services.map((s) => [s.slug, s]));
