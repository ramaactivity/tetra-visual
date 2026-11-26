// Unduh PDF dokumen: dicetak oleh "mesin cetak" Tetra Ops (DR-067). Token hanya di server;
// browser cukup memanggil /api/admin/bisnis/pdf?id=…
import type { APIRoute } from 'astro';
import { DOC_RENDER_API_TOKEN } from 'astro:env/server';
import { isOwner, sessionUser } from '../../../../lib/admin-auth';
import { loadStore, storeConfigured } from '../../../../lib/bisnis-store';
import { renderBody } from '../../../../lib/bisnis';

export const prerender = false;

const RENDER_URL = 'https://team.tetraphoto.com/api/render/document';
const text = (msg: string, status: number) => new Response(msg, { status, headers: { 'content-type': 'text/plain; charset=utf-8' } });

export const GET: APIRoute = async ({ cookies, url }) => {
  const me = await sessionUser(cookies);
  if (!me) return text('Sesi berakhir — silakan masuk lagi.', 401);
  if (!isOwner(me)) return text('Hanya pemilik yang bisa mengunduh dokumen.', 403);
  if (!storeConfigured() || !DOC_RENDER_API_TOKEN) return text('Server belum dikonfigurasi untuk mencetak PDF.', 503);

  const { store } = await loadStore();
  const doc = store.documents.find((d) => d.id === url.searchParams.get('id'));
  if (!doc) return text('Dokumen tidak ditemukan.', 404);

  const res = await fetch(RENDER_URL, {
    method: 'POST',
    headers: { authorization: `Bearer ${DOC_RENDER_API_TOKEN}`, 'content-type': 'application/json' },
    body: JSON.stringify(renderBody(doc)),
  });
  if (!res.ok) {
    console.error('[bisnis/pdf]', res.status, (await res.text()).slice(0, 500));
    return text(`Mesin cetak Tetra Ops menolak (${res.status}). Coba lagi; kalau berulang, kabari Claude.`, 502);
  }
  // Nama file pakai nomor dokumen supaya mudah dicari di folder Unduhan.
  const name = `${doc.doc_number} - ${doc.client.name}.pdf`.replace(/[\\/:*?"<>|]/g, '-');
  const inline = url.searchParams.has('lihat');
  return new Response(res.body, {
    headers: {
      'content-type': 'application/pdf',
      'content-disposition': `${inline ? 'inline' : 'attachment'}; filename*=UTF-8''${encodeURIComponent(name)}`,
      'cache-control': 'no-store',
    },
  });
};
