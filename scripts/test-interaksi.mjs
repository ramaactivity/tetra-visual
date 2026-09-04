// Uji fungsi website di browser sungguhan.
// Jalankan `npm run dev` di terminal lain, lalu `npm test`.
import { chromium } from 'playwright';

const BASE = process.env.BASE ?? 'http://localhost:4321';
const fails = [];
const ok = (n, c) => { console.log(`  ${c ? '✓' : '✗'} ${n}`); if (!c) fails.push(n); };

const b = await chromium.launch();
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();

await p.goto(`${BASE}/`, { waitUntil: 'networkidle' });
await p.click('.card');
await p.waitForTimeout(500);
ok('klik kartu membuka pemutar video', await p.isVisible('dialog[data-video-modal]'));
const src = await p.getAttribute('[data-video-frame]', 'src');
ok('iframe pakai youtube-nocookie', !!src?.includes('youtube-nocookie.com/embed/'));
await p.click('[data-video-close]');
await p.waitForTimeout(300);
ok('menutup menghentikan video', (await p.getAttribute('[data-video-frame]', 'src')) === '');

const before = await p.evaluate(() => document.querySelector('.rail').scrollLeft);
await p.hover('.rail-shell');
await p.click('[data-rail-next]');
await p.waitForTimeout(700);
ok('panah menggeser baris', (await p.evaluate(() => document.querySelector('.rail').scrollLeft)) > before + 100);

await p.goto(`${BASE}/work/wedding`, { waitUntil: 'networkidle' });
await p.click('[data-lightbox-item]');
await p.waitForTimeout(400);
ok('klik foto membuka lightbox', await p.isVisible('dialog[data-lightbox]'));
const c1 = await p.textContent('[data-lb-count]');
await p.click('[data-lb-next]');
await p.waitForTimeout(400);
ok('navigasi foto berikutnya', (await p.textContent('[data-lb-count]')) !== c1);
await p.keyboard.press('ArrowLeft');
await p.waitForTimeout(400);
ok('navigasi keyboard', (await p.textContent('[data-lb-count]')) === c1);
await p.keyboard.press('Escape');
await p.waitForTimeout(300);
ok('Esc menutup lightbox', !(await p.isVisible('dialog[data-lightbox]')));

ok('tombol WhatsApp benar', !!(await p.getAttribute('.nav-cta', 'href'))?.includes('wa.me/'));

await b.close();
console.log(fails.length ? `\n${fails.length} GAGAL: ${fails.join(', ')}` : '\nSemua uji lolos.');
process.exit(fails.length ? 1 : 0);
