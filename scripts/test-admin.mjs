// Uji dashboard /admin tanpa menyentuh GitHub sungguhan: login & perantara GitHub
// di /api/admin/* ditiru di sisi browser, lalu isi commit yang akan dikirim diperiksa.
// Jalankan `npm run dev` di terminal lain, lalu `npm run test:admin`.
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';

const BASE = process.env.BASE ?? 'http://localhost:4321';
const fails = [];
const ok = (n, c) => { console.log(`  ${c ? '✓' : '✗'} ${n}`); if (!c) fails.push(n); };

const commits = []; // tree yang dikirim tiap commit
let blobs = 0;
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
let loggedIn = false;
await ctx.route('**/api/admin/login', async (route) => {
  const m = route.request().method();
  if (m === 'POST') {
    const { username, password } = JSON.parse(route.request().postData());
    loggedIn = username === 'tetravisual' && password === 'benar';
    return route.fulfill({ status: loggedIn ? 200 : 401, contentType: 'application/json', body: JSON.stringify(loggedIn ? { ok: true } : { error: 'Username atau password salah.' }) });
  }
  return route.fulfill({ contentType: 'application/json', body: JSON.stringify({ configured: true, loggedIn }) });
});
await ctx.route('**/api/admin/github**', async (route) => {
  const req = route.request();
  const url = new URL(req.url());
  const path = url.pathname.replace('/api/admin/github', '');
  const json = (body, status = 200) => route.fulfill({ status, contentType: 'application/json', body: JSON.stringify(body) });
  const m = req.method();
  if (!loggedIn) return json({}, 401);

  if (path === '' && m === 'GET') return json({ full_name: 'ramaactivity/tetra-visual' });
  if (path.startsWith('/contents/')) {
    const file = decodeURIComponent(path.slice('/contents/'.length));
    try { return route.fulfill({ status: 200, body: readFileSync(file) }); } catch { return json({ message: 'Not Found' }, 404); }
  }
  if (path === '/git/blobs') { blobs++; return json({ sha: `blob${blobs}` }, 201); }
  if (path === '/git/ref/heads/main') return json({ object: { sha: 'head1' } });
  if (path === '/git/commits/head1') return json({ tree: { sha: 'tree1' } });
  if (path === '/git/trees') { commits.push(JSON.parse(req.postData()).tree); return json({ sha: 'tree2' }, 201); }
  if (path === '/git/commits' && m === 'POST') return json({ sha: `commit${commits.length}` }, 201);
  if (path === '/git/refs/heads/main') return json({ object: { sha: 'x' } });
  if (path === '/actions/runs') return json({ workflow_runs: [{ status: 'completed', conclusion: 'success' }] });
  return json({ message: `tidak ditiru: ${m} ${path}` }, 500);
});

const p = await ctx.newPage();
await p.goto(`${BASE}/admin`, { waitUntil: 'networkidle' });
await p.waitForSelector('[data-view="login"]:not([hidden])');
ok('belum masuk: tampil halaman masuk', true);
await p.fill('input[name="username"]', 'tetravisual');
await p.fill('input[name="password"]', 'salah');
await p.click('[data-login-btn]');
await p.waitForSelector('[data-login-error]:not([hidden])');
ok('password salah ditolak', (await p.textContent('[data-login-error]')).includes('salah'));
await p.fill('input[name="password"]', 'benar');
await p.click('[data-login-btn]');
await p.waitForSelector('.pcard');
const n = await p.locator('.pcard').count();
ok(`daftar proyek tampil (${n})`, n > 50);

await p.click('.chip:has-text("Wedding")');
ok('filter kategori', (await p.locator('.pcard').count()) < 10);
await p.click('.chip:has-text("Semua")');

// --- Proyek baru ---
await p.click('[data-new]');
await p.fill('input[name="title"]', 'Uji Coba Event Baru');
await p.selectOption('[data-cat-select]', 'sport');
await p.fill('input[name="youtube"]', 'https://www.youtube.com/watch?v=RiGwTOe41iw&t=3s');
ok('link YouTube dikenali', (await p.textContent('[data-yt-hint]')).includes('RiGwTOe41iw'));
await p.click('[data-save]');
ok('tanpa cover ditolak', (await p.textContent('[data-ed-error]')).includes('Cover'));
await p.click('[data-cover-yt]');
await p.waitForSelector('[data-cover-img]:not([hidden])', { timeout: 15000 });
ok('cover diambil dari YouTube', true);
const photos = ['01', '02'].map((x) => `src/assets/projects/pt-syslab/${x}.jpg`).concat('src/assets/projects/vitacimin/01.jpg');
await p.setInputFiles('[data-photo-input]', photos);
await p.waitForFunction(() => document.querySelectorAll('.ph').length === 3, null, { timeout: 30000 });
ok('3 foto ditambahkan sekaligus', true);
const ratio = (sel) => p.$eval(sel, (i) => i.naturalWidth / i.naturalHeight);
ok('cover otomatis dipotong 16:9', Math.abs((await ratio('[data-cover-img]')) - 16 / 9) < 0.02);
ok('ukuran file tampil di tiap foto baru', (await p.locator('.ph-size').count()) === 3);

// Editor foto: crop 1:1, putar, ubah ukuran & kompresi
await p.hover('.ph >> nth=0');
await p.click('.ph >> nth=0 >> [data-edit]');
await p.waitForSelector('[data-ie-wrap]:not([hidden])');
await p.click('[data-ie-ratios] .chip:has-text("1:1")');
await p.selectOption('[data-ie-max]', '1080');
await p.fill('[data-ie-q]', '60');
await p.dispatchEvent('[data-ie-q]', 'input');
ok('dimensi hasil tampil', (await p.textContent('[data-ie-dims]')).includes('1080 × 1080'));
await p.waitForFunction(() => /KB|MB/.test(document.querySelector('[data-ie-size]').textContent), null, { timeout: 10000 });
ok('perkiraan ukuran file tampil', true);
// geser kotak crop
const box = await p.locator('[data-ie-crop]').boundingBox();
await p.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
await p.mouse.down();
await p.mouse.move(box.x + box.width / 2 + 60, box.y + box.height / 2, { steps: 5 });
await p.mouse.up();
await p.click('[data-ie-apply]');
await p.waitForSelector('[data-ie]:not([open])', { state: 'attached' });
await p.waitForFunction(() => { const i = document.querySelector('.ph img'); return i && i.naturalWidth === 1080 && i.naturalHeight === 1080; }, null, { timeout: 10000 });
ok('crop 1:1 + ubah ukuran diterapkan (1080×1080)', true);
await p.click('[data-save]');
await p.waitForSelector('[data-view="list"]:not([hidden])', { timeout: 30000 });
const t1 = commits[0] ?? [];
const j1 = JSON.parse(t1.find((x) => x.path === 'src/content/projects/uji-coba-event-baru.json')?.content ?? '{}');
ok('commit berisi file proyek baru', j1.title === 'Uji Coba Event Baru' && j1.category === 'sport');
ok('cover + 3 foto diunggah sebagai blob', t1.filter((x) => x.sha?.startsWith('blob')).length === 4 && blobs === 4);
ok('nama foto berurutan', JSON.stringify(j1.photos) === '["01.jpg","02.jpg","03.jpg"]' && j1.cover === 'cover.jpg');
ok('proyek baru langsung muncul di daftar', await p.isVisible('.pcard:has-text("Uji Coba Event Baru")'));

// --- Edit proyek lama: hapus foto pertama, tambah satu, jadikan unggulan ---
await p.fill('[data-search]', 'syslab');
await p.click('.pcard:has-text("PT. SYSLAB")');
await p.waitForSelector('[data-view="editor"]:not([hidden])');
ok('editor terisi data lama', (await p.inputValue('input[name="title"]')) === 'PT. SYSLAB' && (await p.locator('.ph').count()) === 2);
await p.hover('.ph >> nth=0');
await p.click('.ph >> nth=0 >> [data-del]');
await p.setInputFiles('[data-photo-input]', ['src/assets/projects/vitacimin/02.jpg']);
await p.waitForFunction(() => document.querySelectorAll('.ph').length === 2, null, { timeout: 30000 });
// edit foto lama (02.jpg): dimuat dari file asli di repo, disimpan sebagai file baru
await p.hover('.ph >> nth=0');
await p.click('.ph >> nth=0 >> [data-edit]');
await p.waitForSelector('[data-ie-wrap]:not([hidden])');
await p.click('[data-ie-rot="90"]');
await p.click('[data-ie-apply]');
await p.waitForFunction(() => document.querySelector('.ph-num')?.textContent === 'Diedit', null, { timeout: 10000 });
ok('foto lama bisa diedit', true);
await p.check('input[name="featured"]');
await p.click('[data-save]');
await p.waitForSelector('[data-view="list"]:not([hidden])', { timeout: 30000 });
const t2 = commits[1] ?? [];
const j2 = JSON.parse(t2.find((x) => x.path === 'src/content/projects/pt-syslab.json')?.content ?? '{}');
ok('foto yang dihapus ikut dihapus dari repo', t2.some((x) => x.path === 'src/assets/projects/pt-syslab/01.jpg' && x.sha === null));
ok('foto lama yang diedit jadi file baru, file lamanya dihapus', JSON.stringify(j2.photos) === '["03.jpg","04.jpg"]'
  && t2.some((x) => x.path === 'src/assets/projects/pt-syslab/02.jpg' && x.sha === null));
ok('data video (tanggal unggah) tidak hilang saat proyek diedit', j2.video?.uploaded === '2026-04-03');
const prevFeatured = t2.find((x) => x.path === 'src/content/projects/mountain-jungle-course-2022.json');
ok('unggulan lama dilepas di commit yang sama', j2.featured === true && JSON.parse(prevFeatured?.content ?? '{}').featured === false);

// --- Hapus proyek ---
p.once('dialog', (d) => d.accept());
await p.fill('[data-search]', 'poly');
await p.click('.pcard:has-text("Poly")');
await p.waitForSelector('[data-delete]:not([hidden])');
await p.click('[data-delete]');
await p.waitForSelector('[data-view="list"]:not([hidden])', { timeout: 30000 });
const t3 = commits[2] ?? [];
ok('hapus proyek menghapus file data + semua gambarnya', t3.length >= 2 && t3.every((x) => x.sha === null));

await b.close();
console.log(fails.length ? `\n${fails.length} GAGAL: ${fails.join(', ')}` : '\nSemua uji dashboard lolos.');
process.exit(fails.length ? 1 : 0);
