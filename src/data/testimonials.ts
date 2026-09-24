// Testimoni klien. Entri `placeholder: true` HANYA tampil saat pengembangan
// (npm run dev) — tidak pernah di situs asli, karena testimoni rekaan menyesatkan
// calon klien dan melanggar aturan Google soal ulasan.
// Cara mengisi: ganti isi entri dengan testimoni asli, lalu hapus `placeholder: true`.
// Bagian testimoni otomatis muncul di situs begitu ada satu entri asli.

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  /** Slug layanan tempat testimoni ini paling relevan (opsional). */
  service?: string;
  placeholder?: boolean;
}

export const testimonials: Testimonial[] = [
  {
    quote: 'CONTOH — Tim Tetra datang lebih awal, paham rundown, dan video highlight-nya sudah bisa kami unggah keesokan harinya.',
    name: 'Nama Klien',
    role: 'Jabatan',
    company: 'Nama Perusahaan',
    service: 'dokumentasi-event',
    placeholder: true,
  },
  {
    quote: 'CONTOH — Video company profile kami jadi jauh lebih hidup. Prosesnya jelas dari konsep sampai revisi.',
    name: 'Nama Klien',
    role: 'Jabatan',
    company: 'Nama Instansi',
    service: 'video-company-profile',
    placeholder: true,
  },
  {
    quote: 'CONTOH — Foto peserta di sepanjang rute lengkap dan tajam. Peserta kami senang sekali.',
    name: 'Nama Klien',
    role: 'Race Director',
    company: 'Nama Event',
    service: 'dokumentasi-olahraga',
    placeholder: true,
  },
];

/** Testimoni yang boleh tampil: yang asli selalu, placeholder hanya saat pengembangan. */
export const visibleTestimonials = (service?: string) =>
  testimonials
    .filter((t) => !t.placeholder || import.meta.env.DEV)
    .sort((a, b) => Number(b.service === service) - Number(a.service === service));
