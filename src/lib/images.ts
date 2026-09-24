import type { ImageMetadata } from 'astro';

// Foto & cover karya kini dimuat di src/data/work.ts. Di sini tinggal logo klien.
const clientMods = import.meta.glob<{ default: ImageMetadata }>('/src/assets/clients/*.png', { eager: true });

export const clientLogos: ImageMetadata[] = Object.keys(clientMods)
  .sort()
  .map((p) => clientMods[p]!.default);
