// Perantara ke GitHub API untuk dashboard: token GitHub tinggal di server, browser
// hanya membawa cookie sesi. Dibatasi ke repo situs ini dan ke endpoint yang memang
// dipakai dashboard (baca file, tulis commit, status deploy).
import type { APIRoute } from 'astro';
import { displayName, githubToken, sessionUser } from '../../../../lib/admin-auth';

export const prerender = false;

const REPO = 'ramaactivity/tetra-visual';
const ALLOWED = /^(|contents(\/.*)?|git\/(blobs|trees|commits|ref|refs)(\/.*)?|actions\/runs)$/;

// Commit dari dashboard dicatat atas nama orang yang login — riwayat di GitHub jadi
// jejak audit yang tidak bisa diubah dari browser.
async function withAuthor(path: string, body: string, user: string) {
  if (path === 'git/trees') return stampProjects(body, user);
  if (path !== 'git/commits') return body;
  const data = JSON.parse(body);
  data.author = { name: `${displayName(user)} (Dashboard Tetra)`, email: `${user}@dashboard.tetraphoto.com`, date: new Date().toISOString() };
  data.message = `${data.message}\n\nOleh: ${displayName(user)}`;
  return JSON.stringify(data);
}

// Siapa yang mengunggah/mengedit proyek diisi di SERVER dari sesi login, bukan dari browser.
// Browser menandai proyek baru dengan addedBy: "" — server menggantinya dengan nama akun.
function stampProjects(body: string, user: string) {
  const data = JSON.parse(body);
  for (const entry of data.tree ?? []) {
    if (!/^src\/content\/projects\/[^/]+\.json$/.test(entry.path) || typeof entry.content !== 'string') continue;
    const project = JSON.parse(entry.content);
    if (project.addedBy === '') project.addedBy = displayName(user);
    project.editedBy = displayName(user);
    project.editedAt = new Date().toISOString();
    entry.content = JSON.stringify(project, null, 2) + '\n';
  }
  return JSON.stringify(data);
}

export const ALL: APIRoute = async ({ params, request, cookies }) => {
  const user = sessionUser(cookies);
  if (!user) return new Response('Belum masuk', { status: 401 });
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
    body: method === 'GET' ? undefined : await withAuthor(path, await request.text(), user),
  });

  // Token server ditolak GitHub ≠ pengguna belum masuk; jangan sampai dashboard minta login ulang.
  if (res.status === 401) return new Response('Token GitHub di server tidak valid atau kedaluwarsa', { status: 502 });

  return new Response(res.body, {
    status: res.status,
    headers: { 'content-type': res.headers.get('content-type') ?? 'application/octet-stream', 'cache-control': 'no-store' },
  });
};
