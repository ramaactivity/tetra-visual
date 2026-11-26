// Akun dashboard. Sumber kebenaran: tetra-visual/akun/users.json di R2 (bucket Tetra Ops), dibaca &
// ditulis HANYA oleh server — password disimpan sebagai hash scrypt, bukan teks asli.
// Dulu di data-admin/users.json di repo; dipindah 26 Nov 2026 karena repo dijadikan publik
// (hash lama di riwayat git tidak berlaku lagi setelah semua password diganti).
// Cadangan: bila R2 tak terbaca, akun dari env ADMIN_USERS ("user:pass;user:pass").
// Sesi = cookie bertanda tangan HMAC berisi id akun + versi; ganti password/username menaikkan
// versi sehingga sesi lama di perangkat lain otomatis keluar.
import { createHmac, randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import type { AstroCookies } from 'astro';
import { ADMIN_USERS, ADMIN_SESSION_SECRET, TETRA_DASHBOARD_GITHUB_TOKEN } from 'astro:env/server';
import { r2GetText, r2PutText } from './r2';
import { r2Config, storeConfigured } from './bisnis-store';

export const COOKIE = 'tv_admin';
const DAYS = 30;
/** Folder lama di repo — perantara /api/admin/github tetap menolak akses ke sana. */
export const USERS_PATH = 'data-admin/users.json';
const R2_USERS = 'tetra-visual/akun/users.json';

export interface Account {
  id: string;
  username: string;
  name: string;
  /** data URL JPEG kecil (≤ 256px), atau kosong. */
  avatar?: string;
  hash: string;
  salt: string;
  ver: number;
  /**
   * Peran (RBAC). 'owner' = boleh membuka dokumen, keuangan, dan harga paket (dashboard bisnis).
   * Kosong = tim biasa: hanya karya + jadwal (tanpa angka uang). Diatur di tetra-visual/akun/users.json (R2).
   */
  role?: 'owner';
}

export const isOwner = (u: Account) => u.role === 'owner';

export const configured = () => Boolean(ADMIN_SESSION_SECRET && TETRA_DASHBOARD_GITHUB_TOKEN);
export const githubToken = () => TETRA_DASHBOARD_GITHUB_TOKEN!;

export const hashPassword = (password: string, salt = randomBytes(16).toString('hex')) => ({
  salt,
  hash: scryptSync(password, salt, 32).toString('hex'),
});

function same(a: string, b: string) {
  const A = Buffer.from(a);
  const B = Buffer.from(b);
  return A.length === B.length && timingSafeEqual(A, B);
}

const fromEnv = (): Account[] =>
  (ADMIN_USERS ?? '')
    .split(';')
    .map((p) => p.trim())
    .filter(Boolean)
    .map((pair) => {
      const i = pair.indexOf(':');
      const username = pair.slice(0, i).trim().toLowerCase();
      return { id: username, username, name: username, ...hashPassword(pair.slice(i + 1)), ver: 0 };
    });

// Cache singkat: setiap request dashboard memeriksa sesi, tapi R2 tak perlu ditanya tiap kali.
let cache: { at: number; users: Account[]; sha?: string } | null = null;

export async function loadAccounts(fresh = false): Promise<{ users: Account[]; sha?: string }> {
  if (!fresh && cache && Date.now() - cache.at < 30_000) return cache;
  try {
    const got = storeConfigured() ? await r2GetText(r2Config(), R2_USERS) : null;
    if (got) {
      cache = { at: Date.now(), users: JSON.parse(got.text) as Account[], sha: got.etag };
      return cache;
    }
    console.error('[admin-auth] akun R2 tidak ada / R2 belum dikonfigurasi — memakai ADMIN_USERS');
  } catch (e) {
    console.error('[admin-auth] gagal membaca akun dari R2 — memakai ADMIN_USERS', e);
  }
  cache = { at: Date.now(), users: fromEnv() };
  return cache;
}

/** Simpan dengan kunci versi (ETag); bentrok → melempar, pemanggil membaca ulang lalu mencoba lagi. */
export async function saveAccounts(users: Account[], sha: string | undefined, _message?: string) {
  if (!storeConfigured() || !sha) throw new Error('Akun cadangan (ADMIN_USERS) tidak bisa diubah dari dashboard.');
  if (!(await r2PutText(r2Config(), R2_USERS, JSON.stringify(users, null, 2), sha))) throw new Error('Bentrok — coba lagi');
  cache = null;
}

/** Akun yang cocok, atau null. */
export async function checkLogin(username: string, password: string): Promise<Account | null> {
  if (!configured()) return null;
  const { users } = await loadAccounts(true);
  const user = users.find((u) => u.username === username.trim().toLowerCase());
  // Hash tetap dihitung untuk username tak dikenal, supaya waktu respons tidak membocorkannya.
  const { hash } = hashPassword(password, user?.salt ?? '0'.repeat(32));
  return user && same(hash, user.hash) ? user : null;
}

export const verifyPassword = (user: Account, password: string) => same(hashPassword(password, user.salt).hash, user.hash);

const sign = (v: string) => createHmac('sha256', ADMIN_SESSION_SECRET!).update(v).digest('base64url');

export function startSession(cookies: AstroCookies, user: Account) {
  const payload = `${user.id}.${user.ver}.${Date.now() + DAYS * 864e5}`;
  cookies.set(COOKIE, `${payload}.${sign(payload)}`, {
    httpOnly: true,
    secure: import.meta.env.PROD,
    sameSite: 'strict',
    path: '/',
    maxAge: DAYS * 86400,
  });
}

/** Akun yang sedang login, atau null (sesi palsu/kedaluwarsa, akun dihapus, atau password sudah diganti). */
export async function sessionUser(cookies: AstroCookies): Promise<Account | null> {
  const value = cookies.get(COOKIE)?.value;
  if (!value || !configured()) return null;
  const [id, ver, exp, sig] = value.split('.');
  if (!id || !ver || !exp || !sig || !same(sig, sign(`${id}.${ver}.${exp}`)) || Number(exp) <= Date.now()) return null;
  const { users } = await loadAccounts();
  const user = users.find((u) => u.id === id);
  return user && String(user.ver) === ver ? user : null;
}

export const isLoggedIn = async (cookies: AstroCookies) => (await sessionUser(cookies)) !== null;

/** Data profil yang aman dikirim ke browser. */
export const publicProfile = (u: Account) => ({ username: u.username, name: u.name, avatar: u.avatar ?? '', owner: isOwner(u) });
