// Tanggal unggah & durasi video YouTube untuk data terstruktur Google.
// Lewat server karena browser tidak boleh membaca halaman YouTube langsung (CORS).
import type { APIRoute } from 'astro';
import { isLoggedIn } from '../../../lib/admin-auth';
import { youtubeMeta } from '../../../lib/seo';

export const prerender = false;

export const GET: APIRoute = async ({ url, cookies }) => {
  if (!isLoggedIn(cookies)) return new Response('Belum masuk', { status: 401 });
  const id = url.searchParams.get('id') ?? '';
  if (!/^[\w-]{11}$/.test(id)) return new Response('ID tidak valid', { status: 400 });
  const meta = await youtubeMeta(id);
  return new Response(JSON.stringify(meta), {
    status: meta.uploadDate ? 200 : 502,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  });
};
