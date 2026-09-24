// Data untuk dashboard /admin: isi mentah tiap file proyek + thumbnail kecil yang
// sudah dioptimasi, supaya daftar proyek tampil cepat tanpa mengunduh foto asli.
// Isinya bisa tertinggal ±2 menit dari GitHub (menunggu deploy); editor selalu
// membaca file proyek terbaru langsung dari GitHub sebelum menyunting.
import type { APIRoute } from 'astro';
import { getImage } from 'astro:assets';
import { asset, categories, type ProjectFile } from '../../data/work';

const files = import.meta.glob<ProjectFile>('/src/content/projects/*.json', { eager: true, import: 'default' });

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
      return { slug, data, thumbs };
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
