# Menaikkan Website ke Internet

Semua yang di bawah ini butuh login akun Anda sendiri, jadi harus dikerjakan manual.
Sudah diurutkan — ikuti dari atas. Perkiraan waktu total: **20–30 menit**.

---

## 1. Naikkan kode ke GitHub

Repo git di folder ini **sudah siap** (4 commit, semua file sudah masuk).
Yang kurang hanya menyambungkannya ke GitHub.

### a. Buat repo kosong di GitHub

Buka <https://github.com/new> (login sebagai `rama.activity98@gmail.com`), lalu:

| Kolom | Isi |
|---|---|
| Repository name | `tetra-visual` |
| Visibility | **Private** (boleh Public kalau tidak masalah orang lihat kodenya) |
| Add a README | **Jangan dicentang** |
| Add .gitignore | **Jangan dipilih** |
| Add a license | **Jangan dipilih** |

> Tiga yang terakhir harus dikosongkan. Kalau dicentang, GitHub membuat commit sendiri
> dan push Anda akan ditolak karena bentrok.

Klik **Create repository**.

### b. Sambungkan dan kirim

Di Terminal:

```bash
cd ~/Desktop/tetra-visual
git remote add origin https://github.com/USERNAME/tetra-visual.git
git push -u origin main
```

Ganti `USERNAME` dengan username GitHub Anda.

**Soal password:** GitHub tidak menerima password akun lagi. Saat diminta:

- **Username:** username GitHub Anda
- **Password:** *Personal Access Token*, bukan password akun

Cara membuat token: <https://github.com/settings/tokens> → **Generate new token
(classic)** → beri nama bebas, centang **`repo`**, atur masa berlaku → **Generate**.
Salin tokennya (hanya muncul sekali) dan tempel sebagai password.

> Ukuran repo ~105 MB karena berisi 337 foto asli. Push pertama agak lama —
> ini normal, jangan dibatalkan.

---

## 2. Deploy ke Vercel

Akun Vercel yang lama **tidak perlu dicari** — buat baru saja.

1. Buka <https://vercel.com/signup>, pilih **Continue with GitHub**.
2. **Add New → Project**, lalu **Import** repo `tetra-visual`.
3. Vercel otomatis mengenali ini project Astro. Semua pengaturan biarkan apa adanya:

   | Pengaturan | Nilai (terisi otomatis) |
   |---|---|
   | Framework Preset | Astro |
   | Build Command | `npm run build` |
   | Output Directory | `dist` |
   | Install Command | `npm install` |

4. Klik **Deploy**, tunggu 3–5 menit (build pertama mengompres 337 gambar).

Selesai — website hidup di `tetra-visual-xxxx.vercel.app`.

Mulai sekarang, **setiap `git push` otomatis memperbarui website**. Tidak perlu
upload manual lagi.

---

## 3. Beli dan pasang domain

### Pilihan nama

Cek ketersediaan di <https://niagahoster.co.id> atau <https://domainesia.com>
(lokal, bayar pakai transfer/e-wallet), atau <https://cloudflare.com/products/registrar>
(termurah, harga modal, tapi bayar pakai kartu).

Saran nama, urut rekomendasi:

1. `tetravisual.com` — paling aman dan paling mudah diingat
2. `tetravisual.id` — kesan Indonesia, bagus untuk klien lokal
3. `tetra.visual` — pendek dan berkarakter, tapi ekstensi `.visual` lebih mahal

Perkiraan biaya `.com`: Rp 150–250 rb/tahun. `.id`: Rp 200–350 rb/tahun.

### Menyambungkan ke Vercel

1. Di Vercel: **Project → Settings → Domains → Add**, ketik domain Anda.
2. Vercel menampilkan data DNS yang harus dipasang. Biasanya:

   | Type | Name | Value |
   |---|---|---|
   | A | `@` | `76.76.21.21` |
   | CNAME | `www` | `cname.vercel-dns.com` |

   > **Pakai angka yang ditampilkan Vercel di layar Anda**, bukan yang saya tulis di
   > sini — Vercel bisa mengubahnya sewaktu-waktu.

3. Masukkan data itu di panel DNS tempat Anda beli domain.
4. Tunggu 10 menit sampai beberapa jam. Vercel memasang sertifikat HTTPS otomatis
   dan gratis.

---

## 4. Setelah domain aktif — WAJIB dikerjakan

Ganti alamat website di dua tempat, kalau tidak sitemap dan pratinjau link
(gambar yang muncul saat link dishare ke WhatsApp) akan menunjuk alamat yang salah.

**`astro.config.mjs`** baris `site:`

```js
site: 'https://tetravisual.com',   // ganti dengan domain Anda
```

**`public/robots.txt`** baris terakhir

```
Sitemap: https://tetravisual.com/sitemap-index.xml
```

Lalu:

```bash
git add -A
git commit -m "Ganti alamat website ke domain baru"
git push
```

Vercel akan otomatis deploy ulang.

---

## 5. Daftarkan ke Google

Supaya website muncul saat orang mencari "jasa dokumentasi event", dll.

1. Buka <https://search.google.com/search-console>
2. **Add property → URL prefix**, isi domain Anda
3. Verifikasi kepemilikan — pilih metode **DNS record**, tambahkan data TXT yang
   diberikan Google ke panel DNS domain Anda
4. Setelah terverifikasi: menu **Sitemaps**, isi `sitemap-index.xml`, klik Submit

Google biasanya butuh beberapa hari sampai beberapa minggu untuk mulai menampilkan
website Anda. Bersabar itu normal.

Sekalian daftarkan **Google Business Profile** di <https://business.google.com> —
untuk jasa lokal, ini sering lebih cepat mendatangkan klien daripada SEO biasa.

---

## Yang tidak perlu dikhawatirkan

- **Akun Vercel lama.** Tidak ada database, tidak ada data yang hilang. Semua isi
  website ada di folder ini.
- **URL `.vercel.app` lama.** Kalau pernah dishare ke klien, alamat itu masih hidup
  dengan versi lawas dan tidak bisa Anda hapus. Abaikan saja — setelah domain baru
  aktif, itu yang akan Anda bagikan.
- **Alamat lama `/event.html` dsb.** Sudah diatur otomatis dialihkan ke alamat baru,
  jadi link lama yang beredar tidak akan mati.
