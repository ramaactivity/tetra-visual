// Bahan internal (/admin/internal): logo, pricelist, template, dokumen di R2 bucket Tetra Ops.
// GET = daftar file + link unduh bertanda tangan (semua akun yang masuk).
// POST { action: 'upload', kat, nama, type, size } → link PUT 15 menit (browser upload langsung ke R2).
// POST { action: 'delete', key } → hapus. Upload & hapus hanya akun berperan owner.
import type { APIRoute } from 'astro';
import { R2_ACCESS_KEY_ID, R2_ACCOUNT_ID, R2_BUCKET, R2_SECRET_ACCESS_KEY } from 'astro:env/server';
import { isOwner, sessionUser } from '../../../lib/admin-auth';
import { MAKS_BYTE, isKategori, kunci, namaAman, ukuran, urai } from '../../../lib/bahan';
import type { R2Config } from '../../../lib/r2';
import { r2Delete, r2List, r2Presign } from '../../../lib/r2-files';

export const prerender = false;

const BASE = import.meta.env.DEV ? 'tetra-visual/internal-dev' : 'tetra-visual/internal';
const configured = () => Boolean(R2_ACCOUNT_ID && R2_ACCESS_KEY_ID && R2_SECRET_ACCESS_KEY && R2_BUCKET);
const cfg = (): R2Config => ({ account: R2_ACCOUNT_ID!, key: R2_ACCESS_KEY_ID!, secret: R2_SECRET_ACCESS_KEY!, bucket: R2_BUCKET! });

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });

const JAM = 3600;

export const GET: APIRoute = async ({ cookies }) => {
  const me = await sessionUser(cookies);
  if (!me) return json({ error: 'Sesi berakhir — silakan masuk lagi.' }, 401);
  if (!configured()) return json({ error: 'Penyimpanan R2 belum dikonfigurasi di server.' }, 503);
  try {
    const files = (await r2List(cfg(), `${BASE}/`)).flatMap((o) => {
      const u = urai(BASE, o.key);
      if (!u) return [];
      return [{
        key: o.key,
        kat: u.kat,
        nama: u.nama,
        size: o.size,
        modified: o.modified,
        // Pratinjau (gambar) dan unduh: link langsung ke R2, berlaku 1 jam — halaman memuat ulang daftar bila lewat.
        view: r2Presign(cfg(), 'GET', o.key, JAM),
        dl: r2Presign(cfg(), 'GET', o.key, JAM, { 'response-content-disposition': `attachment; filename="${u.nama}"` }),
      }];
    });
    return json({ owner: isOwner(me), files });
  } catch (e) {
    console.error('[internal] daftar gagal', e);
    return json({ error: 'Gagal membaca daftar file dari R2 — coba muat ulang.' }, 502);
  }
};

export const POST: APIRoute = async ({ request, cookies }) => {
  const me = await sessionUser(cookies);
  if (!me) return json({ error: 'Sesi berakhir — silakan masuk lagi.' }, 401);
  if (!isOwner(me)) return json({ error: 'Hanya pemilik yang bisa menambah atau menghapus file.' }, 403);
  if (!configured()) return json({ error: 'Penyimpanan R2 belum dikonfigurasi di server.' }, 503);
  const b = await request.json().catch(() => ({}));

  if (b.action === 'upload') {
    const nama = namaAman(String(b.nama ?? ''));
    const size = Number(b.size);
    const type = String(b.type || 'application/octet-stream').slice(0, 120);
    if (!isKategori(b.kat)) return json({ error: 'Kategori tidak dikenal.' }, 400);
    if (!nama) return json({ error: 'Nama file tidak valid.' }, 400);
    if (!Number.isInteger(size) || size <= 0) return json({ error: 'File kosong.' }, 400);
    if (size > MAKS_BYTE) return json({ error: `File terlalu besar (maks. ${ukuran(MAKS_BYTE)}).` }, 400);
    const key = kunci(BASE, b.kat, nama);
    const url = r2Presign(cfg(), 'PUT', key, 900, {}, { 'content-type': type, 'content-length': String(size) });
    return json({ url, key, nama, type });
  }

  if (b.action === 'delete') {
    const key = String(b.key ?? '');
    if (!urai(BASE, key)) return json({ error: 'File tidak ditemukan.' }, 400);
    try {
      await r2Delete(cfg(), key);
      return json({ ok: true });
    } catch (e) {
      console.error('[internal] hapus gagal', e);
      return json({ error: 'Gagal menghapus file — coba lagi.' }, 502);
    }
  }

  return json({ error: 'Aksi tidak dikenal.' }, 400);
};
