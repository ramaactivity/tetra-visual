// Satu-satunya sumber data kontak & identitas.
// Ubah di sini, berubah di seluruh website.

export const site = {
  name: 'Tetra Visual',
  shortName: 'TETRA',
  tagline: 'Film · Photo · Documentary',
  description:
    'Tetra Visual adalah tim fotografi dan videografi profesional untuk kebutuhan corporate, event, sport, wedding, dan dokumentasi lainnya.',

  whatsapp: '6289611384767',
  email: 'visualtetra@gmail.com',

  // Dipakai di halaman Kontak, footer, dan data terstruktur Google (LocalBusiness).
  // Harus sama persis dengan Google Business Profile — konsistensi ini sinyal SEO lokal.
  founded: '2021-06-24',
  /** Tidak ada jam buka tetap (menyesuaikan jadwal acara); admin WhatsApp aktif jam ini. */
  adminHours: { opens: '09:00', closes: '21:00', label: 'Admin WhatsApp aktif setiap hari, 09.00–21.00 WIB' },
  address: {
    street: 'Jl. Ciwaluya, RT.02/RW.08, Tegallega',
    district: 'Bogor Tengah',
    city: 'Kota Bogor',
    region: 'Jawa Barat',
    postalCode: '16127',
  },
  areaServed: ['Bogor', 'Jakarta', 'Depok', 'Tangerang', 'Bekasi', 'Cibubur', 'Cibinong', 'Puncak', 'Cisarua', 'Ciapus'],
  /** Satu perusahaan dengan Tetra Photobooth. */
  sister: { name: 'Tetra Photobooth', url: 'https://tetraphoto.com' },

  social: [
    { label: 'Instagram', href: 'https://www.instagram.com/tetra.visual/' },
    { label: 'TikTok', href: 'https://www.tiktok.com/@tetra.visual' },
  ],
} as const;

export const waLink = (pesan: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(pesan)}`;

export const fullAddress = () => {
  const a = site.address;
  return `${a.street}, Kec. ${a.district}, ${a.city}, ${a.region} ${a.postalCode}`;
};

export const mapsUrl = () => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress())}`;
