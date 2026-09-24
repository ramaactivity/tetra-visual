import { chromium } from 'playwright';

const base = 'http://localhost:4321';
const pages = ['/', '/work', '/work/corporate', '/work/wedding', '/about', '/layanan', '/layanan/dokumentasi-event', '/karya/samsung', '/kontak', '/layanan/paket-wedding', '/layanan/gathering-outing-kantor/puncak', '/layanan/dokumentasi-event/jakarta', '/artikel', '/artikel/biaya-jasa-dokumentasi-event'];
const widths = [320, 360, 390, 768, 1024, 1440, 1920];

const browser = await chromium.launch();
let problems = 0;

for (const w of widths) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 900 } });
  // Lewati layar pembuka supaya yang diperiksa halaman aslinya (layar pembuka diperiksa terpisah).
  await ctx.addInitScript(() => sessionStorage.setItem('tv-intro', '1'));
  const page = await ctx.newPage();
  for (const p of pages) {
    await page.goto(base + p, { waitUntil: 'networkidle' });
    await page.waitForTimeout(250);

    const r = await page.evaluate(() => {
      const de = document.documentElement;
      const overflow = de.scrollWidth - de.clientWidth;

      // elemen apa saja yang menembus keluar layar
      const guilty = [];
      for (const el of document.querySelectorAll('body *')) {
        const b = el.getBoundingClientRect();
        if (b.width === 0) continue;
        if (b.right > de.clientWidth + 1 || b.left < -1) {
          // abaikan yang memang scroller horizontal (baris kartu)
          if (el.closest('.rail')) continue;
          guilty.push(`${el.tagName.toLowerCase()}.${(el.className || '').toString().split(' ')[0]} (kanan ${Math.round(b.right)})`);
        }
      }

      // teks terlalu kecil untuk dibaca di HP
      const tiny = [...document.querySelectorAll('p, a, span, li, h1, h2, h3')]
        .filter((el) => el.textContent.trim() && parseFloat(getComputedStyle(el).fontSize) < 11).length;

      // target sentuh terlalu kecil
      const smallTap = [...document.querySelectorAll('a, button')].filter((el) => {
        const b = el.getBoundingClientRect();
        return b.width > 0 && (b.height < 32 || b.width < 32);
      }).length;

      return { overflow, guilty: [...new Set(guilty)].slice(0, 4), tiny, smallTap };
    });

    const bad = r.overflow > 1 || r.guilty.length || r.tiny > 0;
    if (bad) {
      problems++;
      console.log(`  ✗ ${String(w).padStart(4)}px ${p}`);
      if (r.overflow > 1) console.log(`      meluber ${r.overflow}px`);
      if (r.guilty.length) console.log(`      penyebab: ${r.guilty.join(', ')}`);
      if (r.tiny) console.log(`      ${r.tiny} teks < 11px`);
    }
  }
  await ctx.close();
}
await browser.close();
console.log(problems === 0 ? '\nSEMUA BERSIH: tidak ada yang meluber di 7 lebar layar × 5 halaman.' : `\n${problems} kombinasi bermasalah.`);
