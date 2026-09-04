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

  social: [
    { label: 'Instagram', href: 'https://www.instagram.com/tetravisual.jpeg/' },
    { label: 'TikTok', href: 'https://www.tiktok.com/@tetra.visual' },
  ],
} as const;

export const waLink = (pesan: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(pesan)}`;
