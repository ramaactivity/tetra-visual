# Handover — Tetra Visual

Catatan serah-terima antar sesi. Perbarui setiap satu pekerjaan selesai.

## Dashboard bisnis `/admin/bisnis` (26 Nov 2026)

**Status:** **tayang & berfungsi** di produksi (26 Nov 2026): data asli terbaca, PDF tercetak, crew hanya jadwal (PDF 403).

- Dokumen quotation → invoice → pembayaran → kuitansi, Jadwal, Paket & harga. Keputusan: DR-067 di repo tetra-ops.
- Logika murni `src/lib/bisnis.ts` (uji: `node scripts/test-bisnis.mts`), penyimpanan `src/lib/bisnis-store.ts`
  (satu JSON di R2 Tetra Ops `tetra-visual/bisnis.json`, kunci versi ETag, cadangan harian `tetra-visual/cadangan/`;
  `npm run dev` memakai `tetra-visual/dev/` supaya uji coba tidak memakan nomor asli).
- PDF: `src/pages/api/admin/bisnis/pdf.ts` → `POST https://team.tetraphoto.com/api/render/document` (Bearer `DOC_RENDER_API_TOKEN`).
  Kontrak body dimiliki tetra-ops (`docs/06_API_SPEC.md` §24); ubah kontrak hanya setelah sepakat dengan sesi tetra-ops.
- RBAC: `"role": "owner"` di akun R2 `tetra-visual/akun/users.json` (sekarang hanya `rama`). Akun lain hanya melihat Jadwal tanpa angka uang.
- Data produksi awal: QUO-TV-01-26112026 (sudah jadi invoice), INV-TV-01-26112026 Panorama JTB Rp2.000.000 (belum dibayar),
  paket "Dokumentasi Foto & Video 2 Jam" Rp2.000.000, jadwal Panorama JTB 26 Nov. Nomor berikutnya: QUO/INV-TV-02.
- Desain: dunia "lembar rundown + stabilo", font Inter (sama dengan website). Kontrak arah: `.impeccable/surfaces/`.
  Produk: `PRODUCT.md`. DESIGN.md untuk dunia ini belum ditulis.

### Catatan & sisa

1. ~~GitHub Actions diblok billing~~ — selesai: Rama menjadikan repo **publik** 26 Nov 2026 (Actions gratis).
   Hash password lama di riwayat `data-admin/users.json` ikut terbuka → akun **sudah dipindah ke R2**
   (`tetra-visual/akun/users.json`) dan keenam akun diberi password sementara baru (sesi lama keluar).
   Sisa: tiap orang mengganti password sementaranya lewat tombol nama → Profil saya.
2. ~~Env produksi~~ — selesai 26 Nov (Rama menempel lewat dashboard Vercel). Catatan lama: di Vercel project `tetra-visual`: `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`,
   `R2_BUCKET`, `DOC_RENDER_API_TOKEN` (nilai = `.env.local` repo ini). Vercel CLI di Mac belum login ke team
   `visualtetra-9970`; setelah Rama `vercel login` (visualtetra@gmail.com), Claude bisa `vercel env add` + deploy CLI
   dari worktree bersih `origin/main`. Menyimpan kunci ke GitHub Secrets lewat `gh secret set` diblok pengaman otomatis.
3. Email visualtetra@gmail.com penuh (Drive 357 GB / 15 GB): tidak bisa terima/kirim email, dan verifikasi email Vercel
   (login CLI, buat token, redeploy dari dashboard) ikut gagal. Deploy tetap jalan lewat GitHub Actions.

### Sesi paralel

- Sesi lain membuat `/admin/internal` (Bahan internal: `src/lib/r2-files.ts`, `src/lib/bahan.ts`, awalan R2 `tetra-visual/internal/`).
