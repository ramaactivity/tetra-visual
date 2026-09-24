// Login dashboard: satu username + password dari environment variable, lalu sesi
// berupa cookie bertanda tangan HMAC (tanpa database). Mengganti ADMIN_SESSION_SECRET
// otomatis mengeluarkan semua sesi yang sedang login.
import { createHmac, timingSafeEqual } from 'node:crypto';
import type { AstroCookies } from 'astro';
import { ADMIN_USERNAME, ADMIN_PASSWORD, ADMIN_SESSION_SECRET, TETRA_DASHBOARD_GITHUB_TOKEN } from 'astro:env/server';

export const COOKIE = 'tv_admin';
const DAYS = 30;

export const configured = () => Boolean(ADMIN_USERNAME && ADMIN_PASSWORD && ADMIN_SESSION_SECRET && TETRA_DASHBOARD_GITHUB_TOKEN);
export const githubToken = () => TETRA_DASHBOARD_GITHUB_TOKEN!;

const sign = (v: string) => createHmac('sha256', ADMIN_SESSION_SECRET!).update(v).digest('base64url');

function same(a: string, b: string) {
  const A = Buffer.from(a);
  const B = Buffer.from(b);
  return A.length === B.length && timingSafeEqual(A, B);
}

export function checkLogin(username: string, password: string) {
  if (!configured()) return false;
  // Keduanya selalu dicek, supaya waktu respons tidak membocorkan username yang benar.
  const u = same(username.trim().toLowerCase(), ADMIN_USERNAME!.toLowerCase());
  const p = same(password, ADMIN_PASSWORD!);
  return u && p;
}

export function startSession(cookies: AstroCookies) {
  const exp = String(Date.now() + DAYS * 864e5);
  cookies.set(COOKIE, `${exp}.${sign(exp)}`, {
    httpOnly: true,
    secure: import.meta.env.PROD,
    sameSite: 'strict',
    path: '/',
    maxAge: DAYS * 86400,
  });
}

export function isLoggedIn(cookies: AstroCookies) {
  const value = cookies.get(COOKIE)?.value;
  if (!value || !configured()) return false;
  const [exp, sig] = value.split('.');
  return Boolean(exp && sig && same(sig, sign(exp)) && Number(exp) > Date.now());
}
