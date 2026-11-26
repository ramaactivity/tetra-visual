// Penyimpanan dashboard bisnis: satu file JSON di R2 (bucket Tetra Ops, awalan tetra-visual/).
// Satu file = satu kunci versi (ETag), jadi perubahan yang menyentuh beberapa bagian sekaligus
// (mis. invoice baru + jadwalnya) selalu tersimpan utuh. Dua orang menyimpan bersamaan →
// yang belakangan dibaca ulang lalu diulang, tidak menimpa.
// ponytail: satu file cukup untuk ratusan dokumen/tahun; pecah per tahun bila file > ±5 MB.
import { R2_ACCESS_KEY_ID, R2_ACCOUNT_ID, R2_BUCKET, R2_SECRET_ACCESS_KEY } from 'astro:env/server';
import { r2GetText, r2PutText, type R2Config } from './r2';
import { emptyStore, todayWIB, type Store } from './bisnis';

// `npm run dev` memakai salinan terpisah supaya uji coba tidak memakan nomor dokumen asli.
const ROOT = import.meta.env.DEV ? 'tetra-visual/dev' : 'tetra-visual';
const PATH = `${ROOT}/bisnis.json`;
// Salinan harian (ditimpa sepanjang hari itu) — jaring pengaman kalau ada simpanan yang salah.
const backupPath = () => `${ROOT}/cadangan/bisnis-${todayWIB()}.json`;

export const storeConfigured = () => Boolean(R2_ACCOUNT_ID && R2_ACCESS_KEY_ID && R2_SECRET_ACCESS_KEY && R2_BUCKET);
const cfg = (): R2Config => ({ account: R2_ACCOUNT_ID!, key: R2_ACCESS_KEY_ID!, secret: R2_SECRET_ACCESS_KEY!, bucket: R2_BUCKET! });

export async function loadStore(): Promise<{ store: Store; etag: string | null }> {
  const got = await r2GetText(cfg(), PATH);
  if (!got) return { store: emptyStore(), etag: null };
  return { store: { ...emptyStore(), ...JSON.parse(got.text) }, etag: got.etag };
}

export class Conflict extends Error {}

/**
 * Baca → ubah → simpan dengan kunci versi; diulang sampai 3× bila bentrok.
 * `mutate` boleh melempar (mis. InvalidInput) untuk membatalkan tanpa menyimpan.
 */
export async function updateStore<T>(mutate: (s: Store) => T): Promise<{ store: Store; result: T }> {
  for (let attempt = 0; attempt < 3; attempt++) {
    const { store, etag } = await loadStore();
    const result = mutate(store);
    const text = JSON.stringify(store);
    if (await r2PutText(cfg(), PATH, text, etag)) {
      // Cadangan gagal tidak membatalkan simpanan utama, tapi tetap tercatat di log.
      await r2PutText(cfg(), backupPath(), text).catch((e) => console.error('[bisnis] cadangan gagal', e));
      return { store, result };
    }
  }
  throw new Conflict('Data sedang diubah orang lain — coba lagi.');
}
