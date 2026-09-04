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

### Menambah video baru

1. Simpan gambar cover-nya di `src/assets/work/<kategori>/covers/` dengan nama urut
   berikutnya, misal `cover-23.jpg`.
2. Tambahkan satu baris di **`src/data/work.ts`** pada kategori yang sesuai:

```ts
{ cover: 23, youtubeId: 'KODE_YOUTUBE', title: 'Judul Video', desc: 'Keterangan singkat' },
```

`youtubeId` adalah bagian setelah `v=` di URL YouTube.
Contoh: `youtube.com/watch?v=FbiLaV9gLls` → `FbiLaV9gLls`

### Menambah foto

Cukup simpan file di `src/assets/work/<kategori>/photos/` dengan nama urut berikutnya
(`photo-42.jpg`). **Tidak perlu edit kode apa pun** — foto otomatis muncul di galeri
kategori dan ikut terhitung di statistik halaman About.

> Penomoran memakai 2 digit (`photo-07.jpg`, bukan `photo-7.jpg`) supaya urutannya benar.

### Mengganti foto latar hero sebuah kategori

Ubah angka `heroPhoto` pada kategori itu di `src/data/work.ts`. Angkanya merujuk ke
`photos/photo-NN.jpg`. Pilih foto yang **sisi kirinya lapang**, karena judul dan tombol
diletakkan di sana.

### Mengganti foto hero beranda

Ubah baris `import heroBg from ...` di bagian atas `src/pages/index.astro`.

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
│   └── work/<kategori>/{covers,photos}/
├── components/        bagian yang dipakai berulang (header, kartu, baris, lightbox)
├── data/
│   ├── site.ts        kontak & identitas
│   └── work.ts        daftar kategori + 76 video
├── layouts/Base.astro kerangka halaman + semua tag SEO
├── lib/images.ts      pemuat gambar otomatis dari folder
├── pages/             tiap file = satu alamat di website
│   ├── index.astro          /
│   ├── about.astro          /about
│   ├── 404.astro            halaman tidak ditemukan
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
