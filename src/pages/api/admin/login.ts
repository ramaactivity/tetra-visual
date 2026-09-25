import type { APIRoute } from 'astro';
import { COOKIE, checkLogin, configured, displayName, sessionUser, startSession } from '../../../lib/admin-auth';

export const prerender = false;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });

/** Status sesi — dipakai dashboard saat dibuka untuk memutuskan tampil halaman masuk atau tidak. */
export const GET: APIRoute = ({ cookies }) => {
  const user = sessionUser(cookies);
  return json({ configured: configured(), loggedIn: Boolean(user), name: user ? displayName(user) : null });
};

export const POST: APIRoute = async ({ request, cookies }) => {
  if (!configured()) return json({ error: 'Dashboard belum dikonfigurasi di server.' }, 503);
  const { username = '', password = '' } = await request.json().catch(() => ({}));
  const user = checkLogin(String(username), String(password));
  if (!user) {
    // Jeda memperlambat tebak-tebakan password.
    await new Promise((r) => setTimeout(r, 1000));
    return json({ error: 'Username atau password salah.' }, 401);
  }
  startSession(cookies, user);
  return json({ ok: true, name: displayName(user) });
};

export const DELETE: APIRoute = ({ cookies }) => {
  cookies.delete(COOKIE, { path: '/' });
  return json({ ok: true });
};
