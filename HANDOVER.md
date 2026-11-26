# Handover — Tetra Visual

Catatan serah-terima antar sesi. Perbarui setiap satu pekerjaan selesai.

## Dashboard bisnis `/admin/bisnis` (26 Nov 2026)

**Status:** kode **tayang** (deploy Actions run 45761486402, commit 4d2babe, 26 Nov 2026). Halaman bisnis & Bahan internal
masih menampilkan "belum dikonfigurasi" sampai env produksi diisi — lihat "Yang tertahan".

- Dokumen quotation → invoice → pembayaran → kuitansi, Jadwal, Paket & harga. Keputusan: DR-067 di repo tetra-ops.
- Logika murni `src/lib/bisnis.ts` (uji: `node scripts/test-bisnis.mts`), penyimpanan `src/lib/bisnis-store.ts`
  (satu JSON di R2 Tetra Ops `tetra-visual/bisnis.json`, kunci versi ETag, cadangan harian `tetra-visual/cadangan/`;
  `npm run dev` memakai `tetra-visual/dev/` supaya uji coba tidak memakan nomor asli).
- PDF: `src/pages/api/admin/bisnis/pdf.ts` → `POST https://team.tetraphoto.com/api/render/document` (Bearer `DOC_RENDER_API_TOKEN`).
  Kontrak body dimiliki tetra-ops (`docs/06_API_SPEC.md` §24); ubah kontrak hanya setelah sepakat dengan sesi tetra-ops.
- RBAC: `"role": "owner"` di `data-admin/users.json` (sekarang hanya `rama`). Akun lain hanya melihat Jadwal tanpa angka uang.
- Data produksi awal: QUO-TV-01-26112026 (sudah jadi invoice), INV-TV-01-26112026 Panorama JTB Rp2.000.000 (belum dibayar),
  paket "Dokumentasi Foto & Video 2 Jam" Rp2.000.000, jadwal Panorama JTB 26 Nov. Nomor berikutnya: QUO/INV-TV-02.
- Desain: dunia "lembar rundown + stabilo", font Inter (sama dengan website). Kontrak arah: `.impeccable/surfaces/`.
  Produk: `PRODUCT.md`. DESIGN.md untuk dunia ini belum ditulis.

### Yang tertahan (butuh Rama)

1. ~~GitHub Actions diblok billing~~ — selesai: Rama menjadikan repo **publik** 26 Nov 2026 (Actions gratis).
   Akibatnya hash password lama di riwayat `data-admin/users.json` ikut terbuka → **pindahkan akun ke R2 lalu keenam
   akun ganti password** (setelah env R2 ada di produksi).
2. **Env produksi belum diisi** di Vercel project `tetra-visual`: `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`,
   `R2_BUCKET`, `DOC_RENDER_API_TOKEN` (nilai = `.env.local` repo ini). Vercel CLI di Mac belum login ke team
   `visualtetra-9970`; setelah Rama `vercel login` (visualtetra@gmail.com), Claude bisa `vercel env add` + deploy CLI
   dari worktree bersih `origin/main`. Menyimpan kunci ke GitHub Secrets lewat `gh secret set` diblok pengaman otomatis.
3. Tanpa env, `/admin/bisnis` produksi menampilkan "Penyimpanan R2 belum dikonfigurasi" — dashboard Karya tidak terpengaruh.

### Sesi paralel

- Sesi lain membuat `/admin/internal` (Bahan internal: `src/lib/r2-files.ts`, `src/lib/bahan.ts`, awalan R2 `tetra-visual/internal/`).
