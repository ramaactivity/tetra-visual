// Data untuk dashboard /admin: isi mentah tiap file proyek + thumbnail kecil yang
// sudah dioptimasi, supaya daftar proyek tampil cepat tanpa mengunduh foto asli.
// Isinya bisa tertinggal ±2 menit dari GitHub (menunggu deploy); editor selalu
// membaca file proyek terbaru langsung dari GitHub sebelum menyunting.
import type { APIRoute } from 'astro';
import { createHash } from 'node:crypto';
import { getImage } from 'astro:assets';
import { asset, categories, type ProjectFile } from '../../data/work';

const files = import.meta.glob<ProjectFile>('/src/content/projects/*.json', { eager: true, import: 'default' });
const raws = import.meta.glob<string>('/src/content/projects/*.json', { eager: true, query: '?raw', import: 'default' });

// Sidik file versi Git (blob SHA). Dashboard membandingkannya dengan isi repo saat ini
// untuk tahu proyek mana yang sudah berubah tapi belum tayang.
const gitSha = (text: string) => {
  const buf = Buffer.from(text);
  return createHash('sha1').update(`blob ${buf.length}\0`).update(buf).digest('hex');
};

export const GET: APIRoute = async () => {
  const thumb = async (path: string) => {
    const img = asset(path);
    return img ? (await getImage({ src: img, width: 360 })).src : null;
  };

  const projects = await Promise.all(
    Object.entries(files).map(async ([path, data]) => {
      const slug = path.split('/').pop()!.replace(/\.json$/, '');
      const thumbs: Record<string, string | null> = {};
      for (const file of [data.cover, ...(data.photos ?? [])]) thumbs[file] = await thumb(`projects/${slug}/${file}`);
      return { slug, data, thumbs, sha: gitSha(raws[path] ?? '') };
    }),
  );

  return new Response(
    JSON.stringify({
      builtAt: new Date().toISOString(),
      categories: categories.map(({ slug, name }) => ({ slug, name })),
      projects,
    }),
    { headers: { 'content-type': 'application/json' } },
  );
};
