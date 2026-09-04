import type { ImageMetadata } from 'astro';

type Mod = { default: ImageMetadata };

// Astro butuh path literal di import.meta.glob — tidak bisa pakai variabel.
const coverMods = import.meta.glob<Mod>('/src/assets/work/*/covers/*.jpg', { eager: true });
const photoMods = import.meta.glob<Mod>('/src/assets/work/*/photos/*.jpg', { eager: true });
const clientMods = import.meta.glob<Mod>('/src/assets/clients/*.png', { eager: true });

/** Kelompokkan gambar per slug kategori. Nama file di-pad 2 digit, jadi urutan abjad = urutan angka. */
function groupBySlug(mods: Record<string, Mod>): Map<string, ImageMetadata[]> {
  const map = new Map<string, ImageMetadata[]>();
  for (const path of Object.keys(mods).sort()) {
    const slug = path.split('/')[4]; // /src/assets/work/<slug>/<kind>/<file>
    if (!slug) continue;
    const list = map.get(slug) ?? [];
    list.push(mods[path]!.default);
    map.set(slug, list);
  }
  return map;
}

const coversBySlug = groupBySlug(coverMods);
const photosBySlug = groupBySlug(photoMods);

export const getCovers = (slug: string): ImageMetadata[] => coversBySlug.get(slug) ?? [];
export const getPhotos = (slug: string): ImageMetadata[] => photosBySlug.get(slug) ?? [];

/** Cover ke-n (1-indexed, sesuai field `cover` di work.ts). */
export function getCover(slug: string, n: number): ImageMetadata | undefined {
  return coversBySlug.get(slug)?.[n - 1];
}

export const clientLogos: ImageMetadata[] = Object.keys(clientMods)
  .sort()
  .map((p) => clientMods[p]!.default);
