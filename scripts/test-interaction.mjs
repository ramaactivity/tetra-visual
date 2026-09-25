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
await p.waitForTimeout(700);
ok('klik kartu membuka popup detail, bukan langsung video', await p.isVisible('dialog[data-pm]') && !(await p.isVisible('dialog[data-video-modal]')));
ok('popup berisi judul & sinopsis', !!(await p.textContent('[data-pm-title]'))?.trim() && !!(await p.textContent('[data-pm-synopsis]'))?.trim());
ok('popup berisi galeri foto', (await p.locator('.pm-gallery .pm-shot').count()) > 0);
await p.click('.pm-more [data-pm-open="pt-syslab"]'); // PT. SYSLAB: 2 foto milik proyek sendiri
await p.waitForTimeout(900);
ok('galeri memakai foto proyek itu sendiri', (await p.locator('.pm-gallery .pm-shot').count()) === 2 && !(await p.textContent('[data-pm-gallery-note]')));
await p.click('.pm-gallery .pm-shot');
await p.waitForTimeout(400);
ok('foto galeri popup membuka lightbox', await p.isVisible('dialog[data-lightbox]'));
await p.keyboard.press('Escape');
await p.waitForTimeout(600);
ok('Esc menutup lightbox, popup tetap terbuka', !(await p.isVisible('dialog[data-lightbox]')) && await p.isVisible('dialog[data-pm]'));
const t1 = await p.textContent('[data-pm-title]');
await p.click('.pm-more [data-pm-open="pameran-kendaraan-listrik"]'); // proyek yang punya video
await p.waitForTimeout(700);
ok('karya lain mengganti isi popup', (await p.textContent('[data-pm-title]')) !== t1);
await p.click('[data-pm-play]');
await p.waitForTimeout(600);
ok('tombol Putar membuka pemutar video', await p.isVisible('dialog[data-video-modal]'));
const src = await p.getAttribute('[data-video-frame]', 'src');
ok('iframe pakai youtube-nocookie', !!src?.includes('youtube-nocookie.com/embed/'));
await p.click('[data-video-close]');
await p.waitForTimeout(300);
ok('menutup menghentikan video', (await p.getAttribute('[data-video-frame]', 'src')) === '');
await p.keyboard.press('Escape');
await p.waitForTimeout(700);
ok('Esc menutup popup detail', !(await p.isVisible('dialog[data-pm]')));

await p.mouse.move(0, 0);
await p.hover('.rows .card >> nth=1');
await p.waitForTimeout(900);
ok('hover kartu memunculkan pratinjau', await p.isVisible('[data-pv]'));
await p.mouse.move(5, 5);
await p.waitForTimeout(500);
ok('pratinjau hilang saat kursor pergi', !(await p.isVisible('[data-pv]')));

const before = await p.evaluate(() => document.querySelector('.rail').scrollLeft);
await p.hover('.rail-shell');
await p.click('[data-rail-next]');
await p.waitForTimeout(700);
ok('panah menggeser baris', (await p.evaluate(() => document.querySelector('.rail').scrollLeft)) > before + 100);

await p.goto(`${BASE}/work/sport`, { waitUntil: 'networkidle' });
const dates = async () => p.$$eval('.stack [data-rail] .card', (els) => els.map((e) => Date.parse(e.dataset.date)));
await p.selectOption('[data-sort]', 'new');
let d = await dates();
ok('urut Terbaru di halaman kategori', d.length > 3 && d.every((x, i) => i === 0 || d[i - 1] >= x));
await p.selectOption('[data-sort]', 'old');
d = await dates();
ok('urut Terlama di halaman kategori', d.every((x, i) => i === 0 || d[i - 1] <= x));

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
await p.waitForTimeout(600);
ok('Esc menutup lightbox', !(await p.isVisible('dialog[data-lightbox]')));

ok('tombol WhatsApp benar', !!(await p.getAttribute('.nav-cta', 'href'))?.includes('wa.me/'));

await b.close();
console.log(fails.length ? `\n${fails.length} GAGAL: ${fails.join(', ')}` : '\nSemua uji lolos.');
process.exit(fails.length ? 1 : 0);
