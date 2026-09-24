// @ts-check
import { defineConfig, envField } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

export default defineConfig({
  integrations: [sitemap({ filter: (page) => !page.includes('/admin') })],

  // Situs tetap statis. Adapter hanya dipakai untuk endpoint dashboard di
  // src/pages/api/admin/ (prerender = false) yang menyimpan token GitHub di server.
  adapter: vercel(),

  // Rahasia dashboard — dibaca saat server berjalan, tidak pernah masuk ke browser.
  // Isinya di .env.local (lokal) dan Environment Variables project Vercel (produksi).
  env: {
    schema: {
      ADMIN_USERNAME: envField.string({ context: 'server', access: 'secret', optional: true }),
      ADMIN_PASSWORD: envField.string({ context: 'server', access: 'secret', optional: true }),
      ADMIN_SESSION_SECRET: envField.string({ context: 'server', access: 'secret', optional: true }),
      TETRA_DASHBOARD_GITHUB_TOKEN: envField.string({ context: 'server', access: 'secret', optional: true }),
      // Kunci YouTube Data API (gratis, Google Cloud). Tanpa ini tanggal video proyek baru
      // tidak bisa diisi otomatis, karena YouTube memblokir server Vercel.
      YOUTUBE_API_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
    },
  },
  // Alamat produksi. Dipakai untuk sitemap, canonical, dan tag Open Graph
  // (gambar pratinjau saat link dishare ke WhatsApp/Instagram).
  // Kalau nanti beli domain sendiri, ganti baris ini + public/robots.txt.
  site: 'https://visual.tetraphoto.com',

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
