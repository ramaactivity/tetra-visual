// Perantara ke GitHub API untuk dashboard: token GitHub tinggal di server, browser
// hanya membawa cookie sesi. Dibatasi ke repo situs ini dan ke endpoint yang memang
// dipakai dashboard (baca file, tulis commit, status deploy).
import type { APIRoute } from 'astro';
import { githubToken, isLoggedIn } from '../../../../lib/admin-auth';

export const prerender = false;

const REPO = 'ramaactivity/tetra-visual';
const ALLOWED = /^(|contents(\/.*)?|git\/(blobs|trees|commits|ref|refs)(\/.*)?|actions\/runs)$/;

export const ALL: APIRoute = async ({ params, request, cookies }) => {
  if (!isLoggedIn(cookies)) return new Response('Belum masuk', { status: 401 });
  const path = params.path ?? '';
  const method = request.method;
  if (!ALLOWED.test(path) || !['GET', 'POST', 'PATCH'].includes(method)) return new Response('Tidak diizinkan', { status: 403 });

  const res = await fetch(`https://api.github.com/repos/${REPO}${path ? `/${path}` : ''}${new URL(request.url).search}`, {
    method,
    headers: {
      Authorization: `Bearer ${githubToken()}`,
      Accept: request.headers.get('accept') ?? 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'tetra-visual-dashboard',
      ...(method === 'GET' ? {} : { 'Content-Type': 'application/json' }),
    },
    body: method === 'GET' ? undefined : await request.text(),
  });

  // Token server ditolak GitHub ≠ pengguna belum masuk; jangan sampai dashboard minta login ulang.
  if (res.status === 401) return new Response('Token GitHub di server tidak valid atau kedaluwarsa', { status: 502 });

  return new Response(res.body, {
    status: res.status,
    headers: { 'content-type': res.headers.get('content-type') ?? 'application/octet-stream', 'cache-control': 'no-store' },
  });
};
