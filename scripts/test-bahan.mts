// Uji aturan nama & kunci file Bahan internal: `node scripts/test-bahan.mts`
import assert from 'node:assert/strict';
import { MAKS_BYTE, kunci, namaAman, ukuran, urai } from '../src/lib/bahan.ts';

assert.equal(namaAman('Pricelist Tetra Visual 2027.pdf'), 'Pricelist-Tetra-Visual-2027.pdf');
assert.equal(namaAman('Logó (putih) & hitam.PNG'), 'Logo-putih-hitam.PNG');
assert.equal(namaAman('../../rahasia.json'), 'rahasia.json');
assert.equal(namaAman('   '), null);
assert.equal(namaAman('...'), null);
assert.ok(namaAman('a'.repeat(300) + '.pdf')!.endsWith('.pdf'));

const k = kunci('tetra-visual/internal', 'logo', 'logo-putih.png');
assert.equal(k, 'tetra-visual/internal/logo/logo-putih.png');
assert.deepEqual(urai('tetra-visual/internal', k), { kat: 'logo', nama: 'logo-putih.png' });
// Kunci di luar folder bahan / kategori asing / subfolder / nama tidak aman → ditolak (hapus tidak bisa menyentuh bisnis.json).
assert.equal(urai('tetra-visual/internal', 'tetra-visual/bisnis.json'), null);
assert.equal(urai('tetra-visual/internal', 'tetra-visual/internal/rahasia/x.pdf'), null);
assert.equal(urai('tetra-visual/internal', 'tetra-visual/internal/logo/a/b.png'), null);
assert.equal(urai('tetra-visual/internal', 'tetra-visual/internal/logo/a b.png'), null);
assert.equal(urai('tetra-visual/internal', 'tetra-visual/internal-dev/logo/x.png'), null);

assert.equal(ukuran(900), '900 B');
assert.equal(ukuran(68_000), '66 KB');
assert.equal(ukuran(13_500_000), '12,9 MB');
assert.equal(MAKS_BYTE, 209_715_200);
assert.equal(ukuran(MAKS_BYTE), '200 MB');
console.log('test-bahan: semua lolos');
