// Login dashboard: beberapa akun dari environment variable ADMIN_USERS
// ("tetra:passwordA;rama:passwordB;…"), lalu sesi berupa cookie bertanda tangan HMAC
// yang memuat username (tanpa database). Mengganti ADMIN_SESSION_SECRET otomatis
// mengeluarkan semua sesi yang sedang login.
import { createHmac, timingSafeEqual } from 'node:crypto';
import type { AstroCookies } from 'astro';
import { ADMIN_USERS, ADMIN_SESSION_SECRET, TETRA_DASHBOARD_GITHUB_TOKEN } from 'astro:env/server';

export const COOKIE = 'tv_admin';
const DAYS = 30;

const users = new Map(
  (ADMIN_USERS ?? '')
    .split(';')
    .map((pair) => pair.trim())
    .filter(Boolean)
    .map((pair) => {
      const i = pair.indexOf(':');
      return [pair.slice(0, i).trim().toLowerCase(), pair.slice(i + 1)] as const;
    }),
);

export const configured = () => Boolean(users.size && ADMIN_SESSION_SECRET && TETRA_DASHBOARD_GITHUB_TOKEN);
export const githubToken = () => TETRA_DASHBOARD_GITHUB_TOKEN!;
/** "wahab" → "Wahab", untuk ditampilkan & dicatat di proyek. */
export const displayName = (user: string) => user.charAt(0).toUpperCase() + user.slice(1);

const sign = (v: string) => createHmac('sha256', ADMIN_SESSION_SECRET!).update(v).digest('base64url');

function same(a: string, b: string) {
  const A = Buffer.from(a);
  const B = Buffer.from(b);
  return A.length === B.length && timingSafeEqual(A, B);
}

/** Username yang cocok, atau null. */
export function checkLogin(username: string, password: string): string | null {
  if (!configured()) return null;
  const user = username.trim().toLowerCase();
  // Password selalu dibandingkan (juga untuk username tak dikenal), supaya waktu respons
  // tidak membocorkan username mana yang ada.
  const expected = users.get(user) ?? '\u0000'.repeat(24);
  return same(password, expected) && users.has(user) ? user : null;
}

export function startSession(cookies: AstroCookies, user: string) {
  const payload = `${user}.${Date.now() + DAYS * 864e5}`;
  cookies.set(COOKIE, `${payload}.${sign(payload)}`, {
    httpOnly: true,
    secure: import.meta.env.PROD,
    sameSite: 'strict',
    path: '/',
    maxAge: DAYS * 86400,
  });
}

/** Username yang sedang login (akun masih terdaftar & sesi belum kedaluwarsa), atau null. */
export function sessionUser(cookies: AstroCookies): string | null {
  const value = cookies.get(COOKIE)?.value;
  if (!value || !configured()) return null;
  const [user, exp, sig] = value.split('.');
  if (!user || !exp || !sig || !same(sig, sign(`${user}.${exp}`)) || Number(exp) <= Date.now()) return null;
  return users.has(user) ? user : null; // akun dihapus dari ADMIN_USERS = langsung keluar
}

export const isLoggedIn = (cookies: AstroCookies) => sessionUser(cookies) !== null;
