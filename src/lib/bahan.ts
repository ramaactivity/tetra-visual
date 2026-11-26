// Bahan internal Tetra Visual (/admin/internal): logo, pricelist, template, dokumen untuk tim.
// File disimpan di bucket R2 milik Tetra Ops (keputusan Rama 26 Nov 2026) dengan kunci
// `<base>/<kategori>/<nama-file>` (base: tetra-visual/internal, saat dev tetra-visual/internal-dev —
// terpisah dari data dashboard bisnis di tetra-visual/bisnis.json, dev/, cadangan/). Modul ini MURNI (tanpa I/O, tanpa astro:*) supaya
// dipakai bersama oleh API dan halaman, dan bisa diuji: `node scripts/test-bahan.mts`.

export const KATEGORI = [
  { id: 'logo', label: 'Logo', hint: 'Logo resmi untuk desain, watermark, dan materi klien.' },
  { id: 'pricelist', label: 'Pricelist', hint: 'Daftar harga terbaru yang boleh dikirim ke klien.' },
  { id: 'template', label: 'Template desain', hint: 'Template Canva/PSD, frame, lower third, preset.' },
  { id: 'dokumen', label: 'Dokumen', hint: 'Profil perusahaan, SOP, kontrak, dan berkas lain.' },
  { id: 'lainnya', label: 'Lainnya', hint: '' },
] as const;
export type Kategori = (typeof KATEGORI)[number]['id'];

/** Batas per file. ponytail: kuota R2 gratis 10 GB dipakai bersama Tetra Ops; naikkan kalau perlu video. */
export const MAKS_BYTE = 200 * 1024 * 1024;

export const isKategori = (v: unknown): v is Kategori => KATEGORI.some((k) => k.id === v);

/**
 * Nama file aman untuk kunci R2 & header unduhan: huruf/angka ASCII, titik, minus, garis bawah.
 * Spasi dan karakter lain jadi "-", ekstensi dipertahankan. Kosong → null.
 */
export function namaAman(nama: string): string | null {
  const bersih = nama
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^A-Za-z0-9._-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^[-.]+|[-.]+$/g, '')
    .slice(-120);
  return /[A-Za-z0-9]/.test(bersih) ? bersih : null;
}

/** Kunci R2 untuk satu file. */
export const kunci = (base: string, kat: Kategori, nama: string) => `${base}/${kat}/${nama}`;

/** Kebalikan `kunci`: kategori + nama dari kunci R2, atau null bila bukan file bahan yang sah. */
export function urai(base: string, key: string): { kat: Kategori; nama: string } | null {
  const pre = `${base}/`;
  if (!key.startsWith(pre)) return null;
  const [kat, nama, ...sisa] = key.slice(pre.length).split('/');
  return isKategori(kat) && nama && !sisa.length && namaAman(nama) === nama ? { kat, nama } : null;
}

export const ukuran = (b: number) =>
  b < 1024 ? `${b} B` : b < 1024 ** 2 ? `${Math.round(b / 1024)} KB` : `${(b / 1024 ** 2).toFixed(1).replace(/\.0$/, '').replace('.', ',')} MB`;
