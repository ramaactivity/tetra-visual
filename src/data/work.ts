// DIBUAT OTOMATIS dari situs HTML lama, lalu boleh diedit manual.
// Menambah video: cukup tambah entri di sini + taruh cover di
// src/assets/work/<slug>/covers/cover-NN.jpg (NN sesuai urutan).

export interface Video {
  /** Nomor cover: src/assets/work/<slug>/covers/cover-NN.jpg */
  cover: number;
  youtubeId: string;
  title: string;
  desc: string;
}

export interface Category {
  slug: string;
  name: string;
  blurb: string;
  /** Nomor foto untuk latar hero kategori: photos/photo-NN.jpg.
   *  Sengaja pakai FOTO, bukan cover video — cover selalu punya teks judul
   *  yang menembus di belakang tulisan hero. */
  heroPhoto: number;
  videos: Video[];
}

export const categories: Category[] = [
  {
    slug: 'event',
    name: 'Event',
    blurb: 'Dokumentasi acara, festival, dan kegiatan lapangan dari awal sampai akhir.',
    heroPhoto: 2,
    videos: [
      { cover: 1, youtubeId: 'FbiLaV9gLls', title: 'Mountain & Jungle Course 2022', desc: 'Event Eiger Adventure di Kawasan Taman Nasional Gn. Ciremai' },
      { cover: 2, youtubeId: 'diQdijdLxcM', title: 'Women Adventure Camp 2024', desc: 'Event Eiger Adventure khusus Wanita di Kawasan Gn. Kembang' },
      { cover: 3, youtubeId: '0Qri9AotpfY', title: 'Mountain & Jungle Course 2024', desc: 'Event Eiger Adventure di Kawasan Taman Nasional Gn. Rinjani' },
      { cover: 4, youtubeId: 'paEJnYeej_8', title: 'Women Jungle Survival Course 2025', desc: 'Event Eiger Adventure khusus Wanita di Kawasan Gn. Kembang' },
      { cover: 5, youtubeId: 'pJjVvQrmKsc', title: 'Sahabat Perjalanmu_Bogor', desc: 'Event Sahabat Perjalanmu by blibli tentang Jelajah Kopi Bogor' },
      { cover: 6, youtubeId: 'uJUlFiG528M', title: 'Sahabat Perjalanmu_Bali', desc: 'Event Sahabat Perjalanmu by blibli tentang Trip Bali' },
      { cover: 7, youtubeId: '3VuX97780gE', title: 'Sahabat Perjalanmu_Jakarta', desc: 'Event Sahabat Perjalanmu by blibli tentang Jelajah Rasa Betawi' },
      { cover: 8, youtubeId: '0yH5OJX_FKc', title: 'Reuni FE Universitas Indonesia', desc: 'Reuni Fakultas Ekonomi Universitas Indonesia' },
      { cover: 9, youtubeId: 'LxxivoDgkM0', title: 'Bromen Jelajah Indonesia', desc: 'Event Kaloborasi bersama Bromen ke Taman Nasional Gunung Rinjani' },
      { cover: 10, youtubeId: 'Q20uDjx0DIc', title: 'QRIS Jelajah Indonesia', desc: 'Event Bank Indonesia Jakarta bersama para kreator untuk mempromosikan penggunaan QRIS' },
    ],
  },
  {
    slug: 'corporate',
    name: 'Corporate',
    blurb: 'Profil perusahaan, campaign brand, dan liputan korporat yang rapi dan terarah.',
    heroPhoto: 37,
    videos: [
      { cover: 1, youtubeId: 'aParGEM6uxc', title: 'Jarambah Kampung Wisata', desc: 'Video Profile Promosi Wisata Kota Bogor bersama Dinas Pariwisata & Budaya Kota Bogor' },
      { cover: 2, youtubeId: 'ISI_ID_VIDEO_YOUTUBE_DISINI', title: 'Jajaki Rasa Kota Bogor', desc: 'Video Profile Promosi Kuliner Kota Bogor bersama Dinas Pariwisata & Budaya Kota Bogor' },
      { cover: 3, youtubeId: 'Y4U8YTRUSn0', title: 'Pameran Kendaraan Listrik', desc: 'Event Kementerian Perindustrian tentang Promosi kendaraan Listrik' },
      { cover: 4, youtubeId: '2emcXkBfT8E', title: 'Bulan K3 Nasional_ Pertamina Patra Niaga', desc: 'Event Bulan K3 Nasional di Pertamina Patra Niaga Halim Perdana Kusuma' },
      { cover: 5, youtubeId: 'RDUoQGuXrrI', title: 'Poly', desc: 'Grand Opening Poly Pondok Indah' },
      { cover: 6, youtubeId: 'RiGwTOe41iw', title: 'PT. SYSLAB', desc: 'Company Profile PT. SYSLAB' },
      { cover: 7, youtubeId: '5kkF1jLINd0', title: 'Patria', desc: 'Event Internal Patria' },
      { cover: 8, youtubeId: 'Iqoev27qKg8', title: 'Q-Dental Clinic', desc: 'Grand Opening Q-Dental Clinic di Kota Bogor' },
      { cover: 9, youtubeId: '59kg3vVwBHs', title: 'Temukan', desc: 'Grand Opening Temukan' },
      { cover: 10, youtubeId: 'HGwMKs71EuQ', title: 'Outing DPMPD Tanggerang', desc: '' },
      { cover: 11, youtubeId: 'RtmuZ9r-z7w', title: 'Vivere Hotel', desc: 'Outing Vivere Hotel goes to 5G Resort Cijeruk' },
      { cover: 12, youtubeId: 'b1AXu09HPfM', title: 'Universita Indonesia', desc: 'Rapat Kerja Bidang Riset & Inovasi' },
      { cover: 13, youtubeId: 'hXdy6gQqql8', title: 'Astra Izuzu', desc: 'Outing Astra Izuzu Admin Culture DKI Jakarta' },
      { cover: 14, youtubeId: 'FhLnoUYHFKc', title: 'Vitacimin', desc: 'Outing Vitacimi di Kebun Raya Bogor' },
      { cover: 15, youtubeId: '2cSXI3qOZMA', title: 'FLEX Living', desc: 'Grand Opening Flex Indonesia' },
      { cover: 16, youtubeId: 'zggGjmZjuFI', title: 'Tarzan Studio', desc: 'Video Profile Tarzan Studio' },
      { cover: 17, youtubeId: '53-89lnpbF0', title: 'Nutrifood', desc: 'Outing Nutrifood di Taman Mini Indonesia Indah' },
      { cover: 18, youtubeId: 'VeZeePX5SGM', title: 'Under Armor', desc: 'Grand Opening Store Under Armor di BSD' },
      { cover: 19, youtubeId: 'q-UEu8IUWOw', title: 'Samsung', desc: 'Grand Opening Store Samsung di Jakarta' },
      { cover: 20, youtubeId: 'N7DaqAbaXVg', title: 'Bank Artha Graha Internasional', desc: 'Decode & Connect BAGI Self Awareness Challenge' },
      { cover: 21, youtubeId: 'bt61CORGedU', title: 'Energi Prima Nusantara', desc: 'Employe Gathering Energi Prima Nusantara' },
      { cover: 22, youtubeId: 'l4qG8hjf3eM', title: 'PT. Pharma Metric Labs', desc: 'Employe Gathering goes to Cigwa' },
    ],
  },
  {
    slug: 'sport',
    name: 'Sport',
    blurb: 'Aksi cepat, momen menentukan, dan atmosfer pertandingan.',
    heroPhoto: 49,
    videos: [
      { cover: 1, youtubeId: 'YokwXwv7kQo', title: 'Fun Run Bank Indonesia 2025', desc: 'Event Fun Run yang diadakan oleh Bank Indonesia Jakarta' },
      { cover: 2, youtubeId: 'dy1BP-Defv8', title: 'Fun Bike Erafone', desc: 'Event Fun Bike yang diadakan oleh Erafone Bogor' },
      { cover: 3, youtubeId: '7tx7GMXzeOw', title: 'Anniversary Es Teh Indonesia', desc: 'Event Fun Run dalam rangka Anniversary Es Teh Indonesia' },
      { cover: 4, youtubeId: '95yaecB74xw', title: 'WCS x Bogor Runners', desc: 'Event Fun Run yang diadakan oleh WCS bersama Bogor Runners' },
      { cover: 5, youtubeId: 'hjYeM5sg-1k', title: 'Kahf x Bogor Runners', desc: 'Event Fun Run yang diadakan oleh Kahf bersama Bogor Runners' },
      { cover: 6, youtubeId: '0jyi6qM9BsU', title: 'Lari Santai Spotec', desc: 'Promosi Sepatu Lari Spotec bersama Bogor Runners' },
      { cover: 7, youtubeId: '4sq9MF-TXyo', title: 'Mantra 116 2024', desc: 'Event Trail Run Internasional' },
      { cover: 8, youtubeId: '0lp0HpLkeLY', title: 'IPB Half Marathon 2024', desc: 'Event Lari Nasional yang diadakan oleh IPB' },
      { cover: 9, youtubeId: '_EJ5NBOY1lo', title: 'Fun Zumba Bank Indonesia 2023', desc: 'Event Fun Zumba yang diadakan oleh Bank Indonesia Jakarta' },
      { cover: 10, youtubeId: 'yYc8We2l15A', title: 'Fun Zumba Bank Indonesia 2024', desc: 'Event Fun Zumba yang diadakan oleh Bank Indonesia Jakarta' },
      { cover: 11, youtubeId: 'Gc-6FyO7UFM', title: 'DECADE Bogor Runners', desc: 'Iklan Promosi Event 10th Anniversary Bogor Runners' },
      { cover: 12, youtubeId: 'z_4Adn7ZsLM', title: 'Walikota Bogor Cup', desc: '' },
      { cover: 13, youtubeId: 'VrjV0UVmZ_M', title: 'Reformasi Run', desc: 'Event Fun Run yang diadakan oleh kampus Trisakti' },
      { cover: 14, youtubeId: 'HTYx23xlbFk', title: 'DECADE', desc: 'Event Fun Run Anniversary 10th Bogor Runners' },
      { cover: 15, youtubeId: 'L4lvOF9xMLY', title: 'Fun Zumba Bank Indonesia 2025', desc: 'Event Fun Zumba yang diadakan oleh Bank Indonesia Jakarta' },
      { cover: 16, youtubeId: 'ViBRrC6XSRk', title: 'PYC Fest', desc: 'Event Fun Run yang diadakan oleh yayasan PYC' },
      { cover: 17, youtubeId: '56vTbRDL01U', title: 'Run Vesting', desc: 'Event Fun Run yang diadakan oleh Mirae x Bogor Runners' },
      { cover: 18, youtubeId: 'O7u76cdCI6w', title: 'Menang Bebas Nyeri', desc: 'Event Fun Run yang diadakan oleh Neurobion x Bogor Runners' },
      { cover: 19, youtubeId: 'FDHmfie-kWY', title: 'Tugu to Tugu', desc: 'Event Lari Nasional dari Tugu Monas ke Tugu Kujang' },
    ],
  },
  {
    slug: 'competition',
    name: 'Competition',
    blurb: 'Perlombaan dan kompetisi, dari persiapan sampai pengumuman juara.',
    heroPhoto: 3,
    videos: [
      { cover: 1, youtubeId: 'vZilOdiUutU', title: 'Juara 1 Promosi Kuliner Kota Bogor', desc: 'Juara 1 Video Promosi Kuliner yang diadakan Oleh Gojeg x Disparbud Kota Bogor' },
      { cover: 2, youtubeId: 'e0jkaK_KqOs', title: 'Juara 1 Promosi Wisata Kota Bogor', desc: 'Juara 1 Video Promosi Wisata yang diadakan oleh Disparbud Kota Bogor' },
      { cover: 3, youtubeId: '4IfPl-I2N0U', title: 'Juara 2 Promosi Wisata Kota Bogor', desc: 'Juara 2 Video Promosi Wisata yang diadakan oleh Disparbud Kota Bogor' },
      { cover: 4, youtubeId: 'hLaI5K8nq6o', title: 'Juara 1 Bogor Street Fest Capgomeh', desc: 'Juara 1 Video yang diadakan oleh Pemkot Bogor' },
    ],
  },
  {
    slug: 'birthday',
    name: 'Birthday',
    blurb: 'Perayaan ulang tahun yang hangat, jujur, dan menyenangkan.',
    heroPhoto: 20,
    videos: [
      { cover: 1, youtubeId: '0P_hxTu2P6U', title: 'Birthday Eunoia & Aqiqah Omeera', desc: '' },
      { cover: 2, youtubeId: 'grADQnRo4IM', title: 'Birthday Ali', desc: '' },
      { cover: 3, youtubeId: '_tdHv_HbmMY', title: 'Sweet 17th Vanessa', desc: '' },
      { cover: 4, youtubeId: 'TscvFZzFk4o', title: 'Sweet 17th Binda', desc: '' },
      { cover: 5, youtubeId: 'Aj9yZZi6Edg', title: 'Sweet 17th Rebecca', desc: '' },
      { cover: 6, youtubeId: 'UK-un2L3bMA', title: 'Sweet 17th Vios', desc: '' },
      { cover: 7, youtubeId: '9seGTGKNDII', title: 'Sweet 17th Retorika', desc: '' },
      { cover: 8, youtubeId: 'X2_fVzszb2s', title: 'Sweet 17th Jeanettes', desc: '' },
      { cover: 9, youtubeId: 'XozhZ8F-pnM', title: 'Sweet 17th Alaina', desc: '' },
    ],
  },
  {
    slug: 'wedding',
    name: 'Wedding',
    blurb: 'Hari pernikahan diceritakan apa adanya, tanpa dibuat-buat.',
    heroPhoto: 5,
    videos: [
      { cover: 1, youtubeId: 'gV6bi3FYxXw', title: 'Wedding of Firly & Bima', desc: 'Video dokumentasi utama dari momen sakral pernikahan ini.' },
      { cover: 2, youtubeId: 'ISI_ID_VIDEO_YOUTUBE_DISINI', title: 'Wedding of Rani & Wahab', desc: 'Momen haru saat prosesi akad nikah dan pemberkatan.' },
      { cover: 3, youtubeId: 'JYtyYSmp8tk', title: 'Wedding of Intan & Rizki', desc: 'Kemeriahan acara resepsi dan kebahagiaan bersama keluarga.' },
      { cover: 4, youtubeId: 'ISI_ID_VIDEO_YOUTUBE_DISINI', title: 'Wedding of Lisna & Aji', desc: 'Sesi foto romantis dan momen kebersamaan kedua mempelai.' },
    ],
  },
  {
    slug: 'graduation',
    name: 'Graduation',
    blurb: 'Kelulusan dan wisuda, momen yang cuma datang sekali.',
    heroPhoto: 3,
    videos: [
      { cover: 1, youtubeId: 'PwQ3eDwQe4M', title: 'Wisuda MAN 2 Koto Bogor tahun 2024', desc: '' },
      { cover: 2, youtubeId: 'Wk5VPgTjteE', title: 'Sidang S3 Mr. Jirui Dong', desc: '' },
      { cover: 3, youtubeId: 'ISI_ID_VIDEO_YOUTUBE_DISINI', title: 'Photoshoot Farika', desc: '' },
    ],
  },
  {
    slug: 'other',
    name: 'Other',
    blurb: 'Karya lain yang tidak masuk kategori mana pun.',
    heroPhoto: 12,
    videos: [
      { cover: 1, youtubeId: 'DyeLOCpA5d4', title: 'Gender Reveal Adiba & Egy', desc: '' },
      { cover: 2, youtubeId: 'yZQYRBtloaw', title: 'Gender Reveal Shabrina & Stenly', desc: '' },
      { cover: 3, youtubeId: 'BmHrRLh3DvE', title: 'Sangjit Lisda & Chis', desc: '' },
      { cover: 4, youtubeId: '7jfbJSKKXk0', title: 'Prawedding Felicia & Hendri', desc: '' },
      { cover: 5, youtubeId: 'ISI_ID_VIDEO_YOUTUBE_DISINI', title: 'Bridal Shower Puspa', desc: '' },
    ],
  },
];

export const categoryBySlug = new Map(categories.map((c) => [c.slug, c]));
