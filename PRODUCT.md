# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Publik:** calon klien yang mencari jasa dokumentasi foto & video (wedding, event, corporate, sport, wisuda, ulang tahun) di Bogor–Jabodetabek. Melihat portofolio lalu menghubungi lewat WhatsApp.
- **Tim (dashboard /admin):** enam akun (Rama, akun Tetra Visual, Wahab, Arief, Iqbal, Bowo) mengunggah dan menyusun karya. Crew melihat jadwal acara.
- **Owner (dashboard bisnis /admin/bisnis):** hanya Rama (peran `owner`). Membuat quotation, mengubahnya jadi invoice saat klien setuju, mencatat pembayaran, menerbitkan kuitansi, menyimpan daftar paket & harga, dan mengatur jadwal. Sering bekerja dari HP sambil mengurus bisnis lain (Tetra Photobooth, Mahakan Coffee, Tiska Catering), juga dari laptop (~1230 px).

## Product Purpose

Website portofolio Tetra Visual (fotografi & videografi) plus dashboard internal. Dashboard bisnis menggantikan pembuatan dokumen manual: sekali isi, nomor dokumen urut otomatis (QUO-TV / INV-TV / KWT-TV), PDF dicetak oleh mesin cetak Tetra Ops, dan sisa tagihan selalu kelihatan. Sukses = Rama bisa mengirim quotation ke klien dalam satu-dua menit dari HP dan tidak pernah lupa menagih.

## Positioning

Lini bisnis terpisah dari Tetra Photobooth (keputusan DR-067 tetra-ops, 26 Nov 2026): buku, nomor, dan jadwal Tetra Visual tidak bercampur dengan photobooth. Tetra Ops hanya dipinjam "mesin cetak" PDF-nya.

## Operating Context

- Dokumen dikirim ke klien lewat WhatsApp sebagai PDF.
- Alur: quotation → (klien setuju) invoice → pembayaran DP/cicilan/pelunasan → kuitansi per pembayaran.
- Data disimpan sebagai satu file JSON di Cloudflare R2 milik Tetra Ops; tanpa database.
- Rupiah tanpa desimal, tanggal pakai nama hari, hari dihitung WIB.

## Capabilities and Constraints

- Astro 7 statis + endpoint server di Vercel (Hobby), gratis dulu.
- RBAC: dokumen, uang, dan harga paket hanya untuk owner; server tidak mengirim datanya ke akun lain. Crew hanya melihat jadwal tanpa angka uang.
- Tidak boleh memakai kontrol bawaan browser (select, input date/number/checkbox, confirm/alert).
- Label dan teks antarmuka berbahasa Indonesia natural, tanpa jargon akuntansi.

## Brand Commitments

- Nama "Tetra Visual", logo resmi `src/assets/brand/logo-tetra-visual.png` (wordmark "tetra." dengan "VISUALS"), ditampilkan utuh.
- Kontak tunggal di `src/data/site.ts`.
- Situs publik memakai dunia gelap sinematik dengan aksen merah; dashboard bisnis boleh punya dunianya sendiri selama tetap Tetra Visual.
- Selera owner: bersih, modern, lembut; sans-serif, tidak pernah serif; tombol pill; benci tampilan kaku, "jadul", dan AI slop.

## Evidence on Hand

- Dokumen nyata pertama: QUO-TV-01-26112026 dan INV-TV-01-26112026 (Panorama JTB, Rp2.000.000).
- Paket pertama: Dokumentasi Foto & Video 2 Jam, Rp2.000.000.
- Tidak ada testimoni atau angka bisnis lain yang boleh dikarang.

## Product Principles

1. Yang belum lunas selalu paling terlihat — uang yang belum masuk adalah alasan halaman ini ada.
2. Satu sumber kebenaran: nomor, total, dan status dihitung sistem, bukan diketik ulang.
3. Rahasia bisnis dipotong di server, bukan disembunyikan di layar.
4. Cepat dari HP: aksi utama terjangkau jempol, isian minimal.
