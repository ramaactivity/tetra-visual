// Halaman layanan × kota/area, mis. /layanan/dokumentasi-event/jakarta.
// Menangkap pencarian "jasa ___ jakarta". Aturan: teksnya ditulis khusus untuk area itu —
// halaman salinan yang cuma ganti nama kota dianggap spam oleh Google. Bila belum ada proyek
// di area tsb, tampilkan `related` (karya sejenis di lokasi lain, diberi label jujur).

export const CITY_NAMES: Record<string, string> = {
  bogor: 'Bogor',
  jakarta: 'Jakarta',
  depok: 'Depok',
  tangerang: 'Tangerang',
  bekasi: 'Bekasi',
  cibubur: 'Cibubur',
  cibinong: 'Cibinong',
  puncak: 'Puncak',
  cisarua: 'Cisarua',
  ciapus: 'Ciapus',
  'luar-kota': 'Luar kota',
};

export interface CityPage {
  service: string;
  city: string;
  title: string;
  description: string;
  h1: string;
  lead: string;
  body: string[];
  /** Proyek di kota ini (harus ber-kota sama di data proyek). */
  projects: string[];
  /** Karya sejenis di lokasi lain — tampil bila belum ada proyek di area ini. */
  related?: string[];
  faq: [string, string][];
}

export const cityPages: CityPage[] = [
  {
    service: 'dokumentasi-event',
    city: 'bogor',
    title: 'Jasa Dokumentasi Event Bogor — Foto & Video Acara',
    description: 'Jasa foto & video dokumentasi event di Kota dan Kabupaten Bogor oleh tim lokal dari Bogor Tengah: grand opening, festival, lomba, hingga event lari.',
    h1: 'Jasa Dokumentasi Event di Bogor',
    lead: 'Tim kami berkantor di Bogor Tengah — acara Anda di Bogor adalah acara di halaman rumah kami sendiri.',
    body: [
      'Karena berbasis di Kota Bogor, kami hafal medan dan ritme acara di kota ini: dari grand opening klinik di pusat kota, festival Cap Go Meh di jalanan Suryakencana, sampai event lari bersama IPB. Tim bisa tiba lebih awal untuk survei lokasi dan menyesuaikan diri dengan cuaca Bogor yang cepat berubah.',
      'Di Bogor kami sudah mendokumentasikan grand opening Q-Dental Clinic, IPB Half Marathon, Fun Bike Erafone, Walikota Bogor Cup, dan rangkaian Sahabat Perjalanmu dari blibli yang menjelajahi kopi Bogor.',
    ],
    projects: ['q-dental-clinic', 'ipb-half-marathon-2024', 'juara-1-bogor-street-fest-capgomeh', 'sahabat-perjalanmu-bogor', 'fun-bike-erafone', 'walikota-bogor-cup'],
    faq: [
      ['Apakah melayani Kabupaten Bogor, seperti Cibinong, Sentul, dan Puncak?', 'Ya. Selain Kota Bogor, kami melayani seluruh Kabupaten Bogor — salah satunya outing di Cijeruk.'],
    ],
  },
  {
    service: 'dokumentasi-event',
    city: 'jakarta',
    title: 'Jasa Dokumentasi Event Jakarta — Foto & Video Acara Perusahaan',
    description: 'Jasa foto & video dokumentasi event di Jakarta: grand opening, launching, event instansi, dan kampanye brand. Klien: Samsung, Bank Indonesia, Pertamina Patra Niaga.',
    h1: 'Jasa Dokumentasi Event di Jakarta',
    lead: 'Dari grand opening di mal sampai kampanye di Kota Tua, kami rutin bertugas di Jakarta untuk brand dan instansi.',
    body: [
      'Event di Jakarta menuntut tim yang cepat, rapi, dan terbiasa dengan standar brand besar. Kami telah mendokumentasikan grand opening Store Samsung dan Poly Pondok Indah, Bulan K3 Nasional di Pertamina Patra Niaga Halim Perdana Kusuma, serta kampanye QRIS Jelajah Indonesia bersama Bank Indonesia di kawasan Kota Tua.',
      'Hasil kami dirancang untuk kebutuhan korporat: foto yang siap dipakai rilis pers, video highlight untuk media sosial perusahaan, dan dokumentasi lengkap untuk laporan kegiatan.',
    ],
    projects: ['samsung', 'bulan-k3-nasional-pertamina-patra-niaga', 'qris-jelajah-indonesia', 'poly', 'sahabat-perjalanmu-jakarta', 'fun-run-bank-indonesia-2025'],
    faq: [
      ['Tim Tetra Visual berbasis di Bogor — apakah bisa untuk acara pagi di Jakarta?', 'Bisa. Kami rutin bertugas di Jakarta dan menyesuaikan jadwal keberangkatan dengan rundown acara Anda.'],
    ],
  },
  {
    service: 'video-company-profile',
    city: 'bogor',
    title: 'Jasa Video Company Profile Bogor — Video Profil & Promosi',
    description: 'Jasa pembuatan video company profile dan video promosi di Bogor. Mitra Dinas Pariwisata & Kebudayaan Kota Bogor, juara 1 lomba video promosi wisata & kuliner.',
    h1: 'Jasa Video Company Profile di Bogor',
    lead: 'Kami menceritakan Bogor lewat video — dan kami bisa menceritakan bisnis Anda dengan cara yang sama.',
    body: [
      'Bersama Dinas Pariwisata dan Kebudayaan Kota Bogor kami membuat video profil Jarambah Kampung Wisata dan Jajaki Rasa Kota Bogor. Di ajang lomba, video promosi kami meraih Juara 1 video promosi wisata, Juara 1 video promosi kuliner, Juara 2 video promosi wisata, serta Juara 1 video Bogor Street Fest Cap Go Meh.',
      'Pengalaman itu kami bawa ke video company profile untuk perusahaan, klinik, sekolah, hotel, dan UMKM di Bogor: konsep yang jelas, gambar udara dengan drone, dan penyuntingan yang membuat penonton bertahan sampai akhir.',
    ],
    projects: ['jarambah-kampung-wisata', 'jajaki-rasa-kota-bogor', 'juara-1-promosi-wisata-kota-bogor', 'juara-1-promosi-kuliner-kota-bogor', 'juara-2-promosi-wisata-kota-bogor', 'juara-1-bogor-street-fest-capgomeh'],
    faq: [
      ['Apakah bisa syuting di beberapa lokasi di Bogor dalam satu hari?', 'Bisa, selama jaraknya memungkinkan. Kami akan menyusun jadwal syuting bersama Anda saat tahap konsep.'],
    ],
  },
  {
    service: 'dokumentasi-olahraga',
    city: 'bogor',
    title: 'Jasa Dokumentasi Fun Run & Event Olahraga Bogor',
    description: 'Jasa foto & video fun run, half marathon, fun bike, dan turnamen olahraga di Bogor. Pengalaman: IPB Half Marathon 2024, Fun Bike Erafone, Walikota Bogor Cup.',
    h1: 'Dokumentasi Fun Run & Olahraga di Bogor',
    lead: 'Rute Bogor penuh tanjakan dan pemandangan — dua hal yang membuat foto lari jadi istimewa.',
    body: [
      'Kami mendokumentasikan IPB Half Marathon 2024, Fun Bike Erafone Bogor, Walikota Bogor Cup, hingga Tugu to Tugu — lari dari Tugu Monas ke Tugu Kujang. Kami juga banyak bekerja bersama komunitas Bogor Runners untuk event-event lari mereka.',
      'Mengenal rute-rute di Bogor membantu kami menempatkan fotografer di titik terbaik: tanjakan yang dramatis, latar pepohonan, dan garis finis yang ramai.',
    ],
    projects: ['ipb-half-marathon-2024', 'tugu-to-tugu', 'fun-bike-erafone', 'walikota-bogor-cup'],
    faq: [],
  },
  {
    service: 'dokumentasi-olahraga',
    city: 'jakarta',
    title: 'Jasa Dokumentasi Fun Run & Zumba Jakarta',
    description: 'Jasa foto & video fun run, zumba massal, dan event olahraga perusahaan di Jakarta. Klien: Bank Indonesia (fun run & fun zumba 2023–2025), Universitas Trisakti.',
    h1: 'Dokumentasi Fun Run & Event Olahraga di Jakarta',
    lead: 'Event olahraga perusahaan di Jakarta — ramai peserta, banyak sponsor, dan semuanya ingin terekam.',
    body: [
      'Kami dipercaya Bank Indonesia mendokumentasikan Fun Run 2025 serta Fun Zumba tiga tahun berturut-turut (2023, 2024, dan 2025), dan Universitas Trisakti untuk Reformasi Run.',
      'Untuk event berskala besar, tim kami dapat dibagi antara panggung, rute, dan area sponsor, sehingga penyelenggara mendapat dokumentasi lengkap dan sponsor mendapat bukti eksposur mereka.',
    ],
    projects: ['fun-run-bank-indonesia-2025', 'fun-zumba-bank-indonesia-2025', 'fun-zumba-bank-indonesia-2024', 'fun-zumba-bank-indonesia-2023', 'reformasi-run'],
    faq: [],
  },
  {
    service: 'gathering-outing-kantor',
    city: 'bogor',
    title: 'Jasa Dokumentasi Outing & Gathering Kantor di Bogor',
    description: 'Jasa foto & video outing kantor dan employee gathering di Bogor — Kebun Raya, Cijeruk, Puncak, Sentul. Tim lokal dari Bogor Tengah.',
    h1: 'Dokumentasi Outing & Gathering Kantor di Bogor',
    lead: 'Bogor adalah tujuan outing favorit perusahaan Jabodetabek — dan kami tinggal di sini.',
    body: [
      'Kebun Raya, Cijeruk, Puncak, dan Sentul adalah lokasi outing yang dekat dari Jakarta namun terasa jauh dari kantor. Karena berbasis di Bogor, tim kami bisa hadir sejak sesi pembukaan pagi tanpa perlu berangkat dini hari dari luar kota.',
      'Kami telah mendokumentasikan outing Vitacimin di Kebun Raya Bogor dan outing Vivere Hotel di 5G Resort Cijeruk — lengkap dengan permainan tim, foto kelompok, dan video highlight untuk dibagikan ke seluruh karyawan.',
    ],
    projects: ['vitacimin', 'vivere-hotel'],
    faq: [
      ['Apakah bisa sekalian menyediakan photobooth di lokasi outing?', 'Bisa, melalui Tetra Photobooth yang satu perusahaan dengan kami dan juga berbasis di Bogor.'],
    ],
  },
  {
    service: 'gathering-outing-kantor',
    city: 'jakarta',
    title: 'Jasa Dokumentasi Gathering & Outing Kantor Jakarta',
    description: 'Jasa foto & video employee gathering dan outing kantor di Jakarta. Pengalaman: Astra Isuzu (Admin Culture DKI Jakarta), Nutrifood di TMII.',
    h1: 'Dokumentasi Gathering & Outing Kantor di Jakarta',
    lead: 'Tidak semua gathering perlu ke luar kota — dan yang di Jakarta pun layak direkam dengan baik.',
    body: [
      'Kami mendokumentasikan kegiatan Admin Culture Astra Isuzu DKI Jakarta dan outing Nutrifood di Taman Mini Indonesia Indah. Keduanya memadukan sesi formal, permainan kelompok, dan momen santai yang sering menjadi foto favorit karyawan.',
      'Tim kami menyesuaikan diri dengan format acara Anda — di gedung kantor, taman kota, hingga lokasi wisata di Jakarta.',
    ],
    projects: ['astra-izuzu', 'nutrifood'],
    faq: [],
  },
  {
    service: 'gathering-outing-kantor',
    city: 'puncak',
    title: 'Fotografer & Videografer Family Gathering Puncak Bogor',
    description: 'Jasa foto & video family gathering, outbound, dan acara corporate di villa dan hotel kawasan Puncak (Ciawi, Megamendung, Cisarua). Tim dari Bogor, siap sejak pagi.',
    h1: 'Fotografer & Videografer Family Gathering di Puncak',
    lead: 'Sudah punya EO atau paket gathering di Puncak? Dokumentasi foto & videonya bisa Anda serahkan pada kami — tim dari Bogor, tak jauh dari lokasi acara.',
    body: [
      'Dari Ciawi, Megamendung, sampai Cisarua, kawasan Puncak dipenuhi villa dan hotel berkapasitas besar yang ideal untuk family gathering, outbound, rapat kerja, hingga malam keakraban perusahaan. Kami mendokumentasikan seluruh rangkaiannya: sesi pembukaan di aula hotel, permainan outbound di lapangan, api unggun, sampai foto bersama seluruh keluarga karyawan.',
      'Liputan di Puncak punya tantangan sendiri. Jalur Puncak memberlakukan sistem satu arah di akhir pekan, kabut bisa turun cepat, dan hujan sore cukup sering. Karena berangkat dari Bogor Tengah, tim kami bisa menyesuaikan jam berangkat dengan jadwal buka-tutup jalur dan tiba sebelum acara dimulai — tidak perlu berangkat dini hari dari Jakarta.',
      'Banyak paket gathering dari EO atau venue di Puncak sudah mencakup acara, konsumsi, dan permainan outbound — tapi dokumentasinya sering seadanya. Tetra Visual bisa dipesan terpisah dan bekerja berdampingan dengan EO serta pengelola venue Anda: kami menyesuaikan diri dengan rundown mereka, sementara Anda mendapat foto dan video dengan standar yang sama seperti dokumentasi korporat kami untuk Nutrifood, Astra Isuzu, dan Vivere Hotel.',
      'Untuk acara di luar ruangan kami menyiapkan rencana cadangan bila hujan: titik foto dipindah ke area beratap, dan momen di dalam aula tetap terdokumentasi lengkap. Gambar udara dengan drone memperlihatkan hamparan kebun teh dan pegunungan di sekitar venue — latar yang membuat video highlight gathering Anda terasa istimewa.',
    ],
    projects: [],
    related: ['nutrifood', 'vivere-hotel', 'vitacimin', 'astra-izuzu', 'energi-prima-nusantara', 'pt-pharma-metric-labs', 'outing-dpmpd-tanggerang'],
    faq: [
      ['Kami sudah memakai EO untuk gathering di Puncak. Apakah dokumentasi bisa dipesan terpisah?', 'Bisa. Kami terbiasa bekerja bersama EO dan pengelola venue — cukup kirimkan rundown dari EO Anda, tim kami menyesuaikan jadwal liputan dengannya.'],
      ['Apakah bisa meliput acara gathering 2 hari 1 malam di Puncak?', 'Bisa. Untuk acara lebih dari satu hari, durasi liputan dan akomodasi tim kami bahas bersama di penawaran.'],
      ['Bagaimana jika hujan saat outbound?', 'Kami menyiapkan perlindungan peralatan dan memindahkan titik foto ke area beratap. Rangkaian di dalam ruangan tetap terdokumentasi lengkap.'],
    ],
  },
  {
    service: 'gathering-outing-kantor',
    city: 'cisarua',
    title: 'Jasa Dokumentasi Outbound & Camping Cisarua Bogor',
    description: 'Jasa foto & video outbound, camping, family gathering, dan acara corporate di villa, hotel, dan bumi perkemahan kawasan Cisarua, Bogor.',
    h1: 'Dokumentasi Outbound, Camping & Gathering di Cisarua',
    lead: 'Di Cisarua, gathering tidak berhenti di aula hotel — ada outbound, api unggun, dan tenda di bawah langit pegunungan.',
    body: [
      'Cisarua adalah jantung kawasan Puncak: dikelilingi kebun teh, dekat Taman Safari Indonesia dan Agrowisata Gunung Mas, dengan deretan villa besar, hotel, serta area perkemahan yang sering dipakai untuk outbound dan camping perusahaan maupun sekolah.',
      'Acara di area perkemahan butuh pendekatan berbeda dari acara hotel. Tim kami bergerak mengikuti peserta dari pos ke pos permainan, merekam lomba antarkelompok, pendirian tenda, hingga momen api unggun di malam hari yang menuntut peralatan untuk kondisi minim cahaya.',
      'Hasilnya berupa foto seluruh rangkaian dan video highlight yang menangkap semangat kelompok — cocok dibagikan ke karyawan, dipakai untuk laporan kegiatan, atau menjadi materi promosi acara tahun berikutnya.',
    ],
    projects: [],
    related: ['nutrifood', 'vivere-hotel', 'vitacimin', 'astra-izuzu', 'energi-prima-nusantara', 'pt-pharma-metric-labs', 'outing-dpmpd-tanggerang'],
    faq: [
      ['Apakah bisa mendokumentasikan acara api unggun di malam hari?', 'Bisa. Kami menyiapkan peralatan untuk kondisi minim cahaya sehingga momen api unggun dan malam keakraban tetap terekam dengan baik.'],
    ],
  },
  {
    service: 'gathering-outing-kantor',
    city: 'ciapus',
    title: 'Jasa Dokumentasi Gathering & Outbound Ciapus Bogor',
    description: 'Jasa foto & video gathering, outbound, camping, dan acara corporate di villa dan area perkemahan kawasan Ciapus, kaki Gunung Salak, Bogor.',
    h1: 'Dokumentasi Gathering & Outbound di Ciapus',
    lead: 'Kaki Gunung Salak, udara sejuk, curug, dan hutan pinus — latar yang membuat foto gathering tidak terasa seperti di kantor.',
    body: [
      'Kawasan Ciapus di Kecamatan Tamansari berada di kaki Gunung Salak, tidak jauh dari Kota Bogor. Villa, area glamping, dan lokasi perkemahan di sekitarnya menjadi pilihan untuk gathering dan outbound yang ingin suasana alam tanpa perjalanan sejauh Puncak.',
      'Karena dekat dari kantor kami, tim bisa survei lokasi lebih dulu untuk menentukan titik foto terbaik — dari area permainan outbound, jalur trekking menuju curug, sampai tempat foto bersama dengan latar pegunungan.',
      'Kami mendokumentasikan seluruh rangkaian: pembukaan, permainan kelompok, momen santai, dan foto bersama, lalu merangkumnya dalam video highlight yang siap dibagikan ke peserta.',
    ],
    projects: [],
    related: ['nutrifood', 'vivere-hotel', 'vitacimin', 'astra-izuzu', 'energi-prima-nusantara', 'pt-pharma-metric-labs', 'outing-dpmpd-tanggerang'],
    faq: [
      ['Apakah bisa survei lokasi sebelum acara?', 'Bisa, terutama untuk lokasi yang dekat dengan kantor kami di Bogor seperti kawasan Ciapus. Survei dibahas bersama dalam penawaran.'],
    ],
  },
  {
    service: 'gathering-outing-kantor',
    city: 'cibinong',
    title: 'Jasa Dokumentasi Gathering & Acara Corporate Cibinong',
    description: 'Jasa foto & video gathering, acara instansi, dan event corporate di Cibinong dan sekitarnya — hotel, aula, hingga venue outdoor di Kabupaten Bogor.',
    h1: 'Dokumentasi Gathering & Acara Corporate di Cibinong',
    lead: 'Sebagai pusat pemerintahan Kabupaten Bogor dan dikelilingi kawasan industri, Cibinong tak pernah sepi acara perusahaan dan instansi.',
    body: [
      'Cibinong adalah ibu kota Kabupaten Bogor, dekat dengan kawasan industri Citeureup dan Gunung Putri serta kawasan Sentul. Di sini banyak digelar acara instansi pemerintahan, gathering karyawan pabrik, hari ulang tahun perusahaan, hingga family day di hotel dan venue outdoor.',
      'Acara instansi dan perusahaan biasanya punya dua kebutuhan dokumentasi sekaligus: foto resmi untuk laporan kegiatan dan rilis, serta video yang hidup untuk dibagikan ke karyawan. Tim kami menyiapkan keduanya — sesi sambutan dan seremoni direkam rapi, sementara permainan dan momen santai ditangkap apa adanya.',
      'Berbasis di Bogor, tim kami menjangkau Cibinong dengan mudah lewat jalur Jagorawi, sehingga dapat hadir sejak persiapan acara.',
    ],
    projects: [],
    related: ['nutrifood', 'astra-izuzu', 'energi-prima-nusantara', 'patria', 'bank-artha-graha-internasional', 'vitacimin'],
    faq: [
      ['Apakah bisa menyediakan dokumentasi untuk laporan kegiatan instansi?', 'Bisa. Kami menyerahkan foto resmi seremoni dan sambutan yang siap dipakai untuk laporan kegiatan maupun publikasi.'],
    ],
  },
  {
    service: 'gathering-outing-kantor',
    city: 'cibubur',
    title: 'Jasa Dokumentasi Outbound & Family Gathering Cibubur',
    description: 'Jasa foto & video outbound, camping, family gathering, dan acara perusahaan di Cibubur — dari Bumi Perkemahan Cibubur sampai hotel dan venue outbound.',
    h1: 'Dokumentasi Outbound & Family Gathering di Cibubur',
    lead: 'Cibubur jadi pilihan gathering yang terasa jauh dari kantor, padahal tetap dekat dari Jakarta, Depok, dan Bogor.',
    body: [
      'Cibubur dikenal dengan Bumi Perkemahan dan Graha Wisata Pramuka Cibubur, serta banyak venue outbound, hotel, dan resort yang melayani acara perusahaan dan sekolah. Lokasinya di perbatasan Jakarta, Depok, dan Kabupaten Bogor membuatnya praktis dijangkau peserta dari berbagai arah.',
      'Kami mendokumentasikan outbound, camping, family gathering, hingga lomba antarkelompok — dari briefing pagi sampai penutupan. Untuk acara di lapangan terbuka yang luas, gambar udara dengan drone membantu memperlihatkan skala acara dan seluruh peserta sekaligus.',
      'Selain foto seluruh rangkaian, Anda mendapat video highlight yang siap dibagikan ke karyawan dan keluarganya — dokumentasi yang sering paling ditunggu setelah acara selesai.',
    ],
    projects: [],
    related: ['nutrifood', 'vivere-hotel', 'vitacimin', 'astra-izuzu', 'energi-prima-nusantara', 'pt-pharma-metric-labs', 'outing-dpmpd-tanggerang'],
    faq: [
      ['Apakah bisa menggunakan drone di lokasi outbound?', 'Bisa, selama diizinkan oleh pengelola lokasi dan kondisi cuaca memungkinkan. Kami akan mengonfirmasinya sebelum hari acara.'],
    ],
  },
  {
    service: 'gathering-outing-kantor',
    city: 'depok',
    title: 'Jasa Dokumentasi Gathering & Acara Corporate Depok',
    description: 'Jasa foto & video gathering karyawan, outbound, seminar, dan acara corporate di hotel dan venue Depok. Tim dari Bogor, melayani seluruh Depok.',
    h1: 'Dokumentasi Gathering & Acara Corporate di Depok',
    lead: 'Hotel di pusat kota, kampus, sampai venue outbound di pinggiran kota — Depok punya semua tempat untuk acara perusahaan.',
    body: [
      'Depok berada tepat di antara Jakarta dan Bogor, menjadikannya lokasi praktis untuk gathering karyawan, seminar, rapat kerja, dan acara kampus. Hotel dan ruang pertemuan di pusat kota cocok untuk acara formal, sementara area di pinggiran kota banyak dipakai untuk outbound dan family gathering.',
      'Kami menyesuaikan pendekatan dengan jenis acaranya: untuk seminar dan rapat kerja di hotel, fokus pada sesi utama, pembicara, dan foto bersama; untuk outbound dan family gathering, tim bergerak mengikuti permainan dan menangkap momen spontan peserta.',
      'Kami telah mendokumentasikan acara di lingkungan kampus seperti rapat kerja dan reuni Universitas Indonesia, serta berbagai gathering perusahaan di Jabodetabek.',
    ],
    projects: [],
    related: ['universita-indonesia', 'reuni-fe-universitas-indonesia', 'nutrifood', 'astra-izuzu', 'vivere-hotel', 'energi-prima-nusantara'],
    faq: [],
  },
];

export const cityPagesFor = (service: string) => cityPages.filter((c) => c.service === service);
export const cityPage = (service: string, city: string) => cityPages.find((c) => c.service === service && c.city === city);