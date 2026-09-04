// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  integrations: [sitemap()],
  // GANTI setelah domain dibeli — dipakai untuk sitemap & tag Open Graph.
  site: 'https://tetravisual.com',

  image: {
    // Astro mengubah JPG/PNG asli jadi WebP + srcset responsif saat build.
    responsiveStyles: true,
    layout: 'constrained',
  },


  // URL lama tetap hidup: pengunjung & Google diarahkan ke alamat baru.
  redirects: {
    '/about.html': '/about',
    '/halaman-kedua.html': '/work',
    '/event.html': '/work/event',
    '/corporate.html': '/work/corporate',
    '/sport.html': '/work/sport',
    '/competition.html': '/work/competition',
    '/birthday.html': '/work/birthday',
    '/wedding.html': '/work/wedding',
    '/graduation.html': '/work/graduation',
    '/other.html': '/work/other',
  },

  build: { inlineStylesheets: 'auto' },
});
