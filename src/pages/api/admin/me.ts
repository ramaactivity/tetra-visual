// Profil akun yang sedang login: ubah nama, username, password, avatar.
import type { APIRoute } from 'astro';
import { hashPassword, loadAccounts, publicProfile, saveAccounts, sessionUser, startSession, verifyPassword } from '../../../lib/admin-auth';

export const prerender = false;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });

export const POST: APIRoute = async ({ request, cookies }) => {
  const me = await sessionUser(cookies);
  if (!me) return json({ error: 'Sesi berakhir — silakan masuk lagi.' }, 401);
  const body = await request.json().catch(() => ({}));
  const name = String(body.name ?? me.name).trim();
  const username = String(body.username ?? me.username).trim().toLowerCase();
  const avatar = body.avatar === undefined ? me.avatar ?? '' : String(body.avatar);
  const newPassword = String(body.newPassword ?? '');
  const current = String(body.currentPassword ?? '');

  if (!name || name.length > 40) return json({ error: 'Nama wajib diisi, maksimal 40 karakter.' }, 400);
  if (!/^[a-z0-9._-]{3,32}$/.test(username)) return json({ error: 'Username 3–32 karakter: huruf kecil, angka, titik, strip, atau garis bawah.' }, 400);
  if (avatar && (!/^data:image\/(jpeg|png|webp);base64,/.test(avatar) || avatar.length > 120_000)) return json({ error: 'Avatar tidak valid atau terlalu besar.' }, 400);
  if (newPassword && newPassword.length < 8) return json({ error: 'Password baru minimal 8 karakter.' }, 400);

  const sensitive = username !== me.username || Boolean(newPassword);
  if (sensitive && !verifyPassword(me, current)) return json({ error: 'Password saat ini salah.' }, 403);

  // Baca versi terbaru dari GitHub, ubah akun ini saja, lalu simpan (ulangi bila bentrok).
  for (let attempt = 0; attempt < 3; attempt++) {
    const { users, sha } = await loadAccounts(true);
    const idx = users.findIndex((u) => u.id === me.id);
    if (idx < 0) return json({ error: 'Akun tidak ditemukan.' }, 404);
    if (users.some((u) => u.id !== me.id && u.username === username)) return json({ error: `Username "${username}" sudah dipakai.` }, 409);
    const updated = {
      ...users[idx]!,
      name,
      username,
      avatar,
      ...(newPassword ? hashPassword(newPassword) : {}),
      ver: users[idx]!.ver + (sensitive ? 1 : 0),
    };
    const next = users.map((u, i) => (i === idx ? updated : u));
    try {
      await saveAccounts(next, sha, `Profil dashboard: ${updated.name} memperbarui profil`);
    } catch {
      continue;
    }
    // Username/password berubah → sesi lain keluar, sesi ini diperbarui.
    if (sensitive) startSession(cookies, updated);
    return json({ ok: true, profile: publicProfile(updated), relogged: sensitive });
  }
  return json({ error: 'Gagal menyimpan, coba lagi sebentar.' }, 503);
};
