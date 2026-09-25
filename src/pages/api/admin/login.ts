import type { APIRoute } from 'astro';
import { COOKIE, checkLogin, configured, publicProfile, sessionUser, startSession } from '../../../lib/admin-auth';

export const prerender = false;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });

/** Status sesi — dipakai dashboard saat dibuka untuk memutuskan tampil halaman masuk atau tidak. */
export const GET: APIRoute = async ({ cookies }) => {
  const user = await sessionUser(cookies);
  return json({ configured: configured(), loggedIn: Boolean(user), profile: user ? publicProfile(user) : null });
};

export const POST: APIRoute = async ({ request, cookies }) => {
  if (!configured()) return json({ error: 'Dashboard belum dikonfigurasi di server.' }, 503);
  const { username = '', password = '' } = await request.json().catch(() => ({}));
  const user = await checkLogin(String(username), String(password));
  if (!user) {
    // Jeda memperlambat tebak-tebakan password.
    await new Promise((r) => setTimeout(r, 1000));
    return json({ error: 'Username atau password salah.' }, 401);
  }
  startSession(cookies, user);
  return json({ ok: true, profile: publicProfile(user) });
};

export const DELETE: APIRoute = ({ cookies }) => {
  cookies.delete(COOKIE, { path: '/' });
  return json({ ok: true });
};
