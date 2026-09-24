// Halaman layanan × kota, mis. /layanan/dokumentasi-event/jakarta.
// Menangkap pencarian "jasa ___ jakarta". Aturan: hanya dibuat bila ada proyek nyata di
// kota itu, dan teksnya ditulis khusus — halaman salinan yang cuma ganti nama kota
// dianggap spam oleh Google.

export const CITY_NAMES: Record<string, string> = {
  bogor: 'Bogor',
  jakarta: 'Jakarta',
  depok: 'Depok',
  tangerang: 'Tangerang',
  bekasi: 'Bekasi',
  'luar-kota': 'Luar kota',
};

export interface CityPage {
  service: string;
  city: 'bogor' | 'jakarta';
  title: string;
  description: string;
  h1: string;
  lead: string;
  body: string[];
  /** Proyek di kota ini (harus ber-kota sama di data proyek). */
  projects: string[];
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
];

export const cityPagesFor = (service: string) => cityPages.filter((c) => c.service === service);
export const cityPage = (service: string, city: string) => cityPages.find((c) => c.service === service && c.city === city);
