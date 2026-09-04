import { chromium } from 'playwright';

const OUT = '.shots';
const base = 'http://localhost:4321';
const pages = process.argv[2] ? [process.argv[2]] : ['/', '/work', '/work/corporate', '/about'];
const viewports = [
  { name: 'mac', width: 1440, height: 900, dsf: 2 },
  { name: 'hp', width: 390, height: 844, dsf: 3 },
];

const browser = await chromium.launch();
for (const vp of viewports) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: vp.dsf,
  });
  const page = await ctx.newPage();
  for (const p of pages) {
    await page.goto(base + p, { waitUntil: 'networkidle' });
    await page.waitForTimeout(600);
    const slug = p === '/' ? 'home' : p.slice(1).replace(/\//g, '-');
    // layar pertama (yang paling menentukan kesan)
    await page.screenshot({ path: `${OUT}/${slug}-${vp.name}.png` });
    // seluruh halaman
    await page.screenshot({ path: `${OUT}/${slug}-${vp.name}-full.png`, fullPage: true });
    console.log(`  ${slug}-${vp.name}`);
  }
  await ctx.close();
}
await browser.close();
console.log('selesai');
