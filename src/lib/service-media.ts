import type { ImageMetadata } from 'astro';
import { allProjects, categoryBySlug } from '../data/work';
import type { Service } from '../data/services';
import brandPreview from '../assets/brand/gambar-preview.jpg';
import brandHero from '../assets/brand/hero-bg.jpg';

const bySlug = new Map(allProjects.map((p) => [p.slug, p]));

const galleryMods = import.meta.glob<{ default: ImageMetadata }>('/src/assets/wedding/*.jpg', { eager: true });
/** Foto galeri khusus layanan (field `gallery` di services.ts). */
export const serviceGallery = (s: Service): ImageMetadata[] =>
  (s.gallery ?? []).map((p) => galleryMods[`/src/assets/${p}`]?.default).filter((i) => i !== undefined);

/** Karya nyata untuk sebuah layanan (yang proyeknya sudah dihapus otomatis terlewati). */
export const serviceProjects = (s: Service) => s.projects.map((slug) => bySlug.get(slug)).filter((p) => p !== undefined);

// Layanan tanpa portofolio tetap perlu gambar: pakai foto brand.
const FALLBACK: Record<string, ImageMetadata> = {
  'live-streaming': brandHero,
  photobooth: brandPreview,
  'ai-image-video': brandPreview,
};

/** Gambar kartu layanan: cover karya pertamanya. */
export const serviceCover = (s: Service): ImageMetadata =>
  serviceGallery(s)[0] ?? serviceProjects(s)[0]?.cover ?? FALLBACK[s.slug] ?? categoryBySlug.get('corporate')?.hero ?? brandHero;

/** Latar hero halaman layanan: sebaiknya FOTO (tanpa teks judul seperti cover video). */
export const serviceHero = (s: Service): ImageMetadata => {
  const own = serviceGallery(s)[0];
  if (own) return own;
  const withPhoto = serviceProjects(s).find((p) => p.photos.length > 0);
  return withPhoto?.photos[0] ?? serviceCover(s);
};
