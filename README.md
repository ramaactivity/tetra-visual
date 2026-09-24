# Tetra Visual

Website portofolio fotografi & videografi Tetra Visual.
Dibangun dengan [Astro](https://astro.build) — situs statis, tanpa database, tanpa server.

---

## Menjalankan di komputer

Butuh **Node 24** (sudah diatur lewat nvm; file `.nvmrc` menentukan versinya).

```bash
nvm use          # pakai versi Node yang benar
npm install      # sekali saja, saat pertama kali
npm run dev      # buka http://localhost:4321
```

Setiap file yang disimpan langsung terlihat di browser tanpa perlu refresh.

| Perintah | Fungsi |
|---|---|
| `npm run dev` | Jalankan di komputer untuk mengedit |
| `npm run build` | Bikin versi siap-upload di folder `dist/` |
| `npm run preview` | Lihat hasil build sebelum di-deploy |
| `npm run check` | Periksa error TypeScript |
| `npm run shot` | Screenshot semua halaman ke `.shots/` (server dev harus jalan) |
| `npm run check:layout` | Cek tata letak meluber di 7 lebar layar (server dev harus jalan) |

---

## Cara mengubah isi website

### Ganti nomor WhatsApp, email, atau media sosial

Satu file saja: **`src/data/site.ts`**. Diubah di sana, berubah di seluruh halaman.

### Menambah, mengedit, atau menghapus karya — lewat dashboard

Buka **<https://visual.tetraphoto.com/admin>**. Di sana bisa:

- menambah proyek baru: judul, kategori, link YouTube, deskripsi, sinopsis, cover
  (unggah sendiri atau **ambil dari thumbnail YouTube**), urutan, dan centang *karya unggulan*
- mengunggah **banyak foto sekaligus** (seret ke kotak) — otomatis dikecilkan sebelum diunggah
- mengatur urutan foto (seret), menghapus foto, atau menghapus proyek

Klik **Simpan** → perubahan masuk ke GitHub sebagai satu commit → GitHub Actions
menayangkan ulang situs (±3 menit). Status "Sedang menayangkan… / Sudah tayang"
tampil di pojok kanan atas dashboard.

Masuk dengan **username + password** (lihat `.env.local`, kunci `ADMIN_USERNAME` /
`ADMIN_PASSWORD`). Sesi bertahan 30 hari per browser. Token GitHub hanya disimpan
di server (Environment Variables Vercel), tidak pernah dikirim ke browser —
browser berbicara ke `/api/admin/*`, satu-satunya bagian situs yang berjalan di server.

**Mengganti password:** ubah `ADMIN_PASSWORD` di `.env.local` dan di Vercel
(Project → Settings → Environment Variables), lalu deploy ulang.

Di balik layar, tiap proyek = satu file `src/content/projects/<slug>.json` + folder
`src/assets/projects/<slug>/` (`cover.jpg`, `01.jpg`, `02.jpg`, …). Boleh juga diedit
manual kalau perlu; skema isinya ada di `ProjectFile` pada `src/data/work.ts`.

### Foto lama yang belum diketahui proyeknya

Tersimpan di `src/assets/work/<kategori>/photos/`. Tetap tampil di galeri kategori
dan jadi cadangan galeri untuk proyek yang belum punya foto sendiri.

### Mengganti foto latar hero sebuah kategori

Ubah `hero` pada kategori itu di `src/data/work.ts` (path relatif ke `src/assets/`).
Pilih foto yang **sisi kirinya lapang**, karena judul dan tombol diletakkan di sana.

### Mengganti foto hero beranda

Ubah daftar `HERO_PHOTOS` di bagian atas `src/pages/index.astro`. Karya unggulan
(tombol "Putar Karya Unggulan") dipilih dari dashboard.

### Mengubah warna, ukuran huruf, atau jarak

Semua ada di bagian `:root` pada **`src/styles/global.css`**. Contoh: ganti `--brand`
untuk mengubah warna merah di seluruh website sekaligus.

---

## Struktur folder

```
src/
├── assets/            gambar asli (Astro yang mengompresnya saat build)
│   ├── brand/         logo, potret
│   ├── clients/       logo klien
│   ├── projects/<slug>/  cover + foto tiap proyek (dikelola dashboard)
│   └── work/<kategori>/photos/  foto lama yang belum berproyek
├── content/projects/  satu file .json per proyek (dikelola dashboard)
├── components/        bagian yang dipakai berulang (header, kartu, baris, lightbox)
├── data/
│   ├── site.ts        kontak & identitas
│   └── work.ts        kategori + pemuat data proyek
├── layouts/Base.astro kerangka halaman + semua tag SEO
├── lib/images.ts      logo klien
├── pages/             tiap file = satu alamat di website
│   ├── index.astro          /
│   ├── about.astro          /about
│   ├── 404.astro            halaman tidak ditemukan
│   ├── admin/               /admin — dashboard karya (+ data.json untuk dashboard)
│   └── work/
│       ├── index.astro      /work
│       └── [slug].astro     /work/event, /work/corporate, dst — 8 halaman dari 1 file
└── styles/global.css  warna, huruf, jarak, komponen dasar
```

---

## Catatan teknis

**Gambar.** Semua gambar di `src/assets/` otomatis dikompres jadi WebP dengan beberapa
ukuran saat `npm run build`. Simpan **file resolusi penuh** — jangan dikompres manual
dulu, karena Astro butuh versi besar sebagai sumber. Hasilnya: beranda turun dari
19 MB (versi lama) jadi sekitar 0,4 MB.

**Video YouTube.** Iframe baru dimuat saat tombol putar ditekan, jadi 76 video tidak
membebani halaman. Memakai domain `youtube-nocookie.com` agar YouTube tidak menanam
cookie pelacak sebelum video diputar.

**URL lama.** Alamat lama seperti `/event.html` otomatis dialihkan ke `/work/event`,
diatur di `astro.config.mjs` bagian `redirects`.

**Versi lama.** Situs HTML yang lama tersimpan utuh di commit pertama repo ini
(`git show 45e78fc`), dan folder aslinya masih ada di `~/Desktop/Tetra Visual`.

---

## Deploy

Website hidup di **<https://visual.tetraphoto.com>**.
Setiap `git push` ke `main` otomatis men-deploy ulang.

- **[DEPLOY.md](DEPLOY.md)** — langkah setup lengkap & penyelesaian masalah
- **[KREDENSIAL.md](KREDENSIAL.md)** — akun, project ID, DNS, dan di mana tiap
  rahasia disimpan (file ini tidak berisi rahasia apa pun)
