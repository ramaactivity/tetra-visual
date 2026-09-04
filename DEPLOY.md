# Deploy — Tetra Visual

Target: **https://visual.tetraphoto.com** — menumpang domain yang sudah Anda miliki,
jadi tidak perlu beli domain baru.

Situs photobooth di `tetraphoto.com` **tidak tersentuh sama sekali**. Ini project
Vercel terpisah, repo terpisah, framework terpisah (Astro vs Next.js). Sudah
diperiksa: redirect di `next.config.ts` photobooth hanya menangkap host
`www.tetraphoto.com`, jadi tidak akan membajak subdomain ini.

---

## Yang sudah siap di repo ini

- `.github/workflows/deploy.yml` — deploy otomatis tiap `git push`
- `astro.config.mjs` → `site: 'https://visual.tetraphoto.com'`
- `public/robots.txt` → sitemap menunjuk ke alamat yang sama
- `.gitignore` → `.vercel/` dan `.env*` diabaikan, token tidak akan ikut ter-push

Yang kurang cuma satu: **`VERCEL_PROJECT_ID`** di workflow, karena project-nya
belum ada. Diisi di Langkah 3.

---

## Akun yang dipakai

| | |
|---|---|
| Vercel | `visualtetra@gmail.com` — team `visualtetra-9970` (sama dengan photobooth) |
| GitHub | `ramaactivity`, push sebagai `rama.activity98@gmail.com` |
| Domain | `tetraphoto.com` di **Hostinger** (nameserver `dns-parking.com`) |

---

## Langkah 1 — Naikkan kode ke GitHub

Repo git di folder ini sudah siap (7 commit). Yang kurang hanya sambungan ke GitHub.

Buka <https://github.com/new>, lalu:

| Kolom | Isi |
|---|---|
| Repository name | `tetra-visual` |
| Visibility | **Private** |
| Add a README / .gitignore / license | **Jangan dicentang semua** |

> Kalau salah satu dicentang, GitHub membuat commit sendiri dan push Anda ditolak
> karena bentrok.

Klik **Create repository**, lalu di Terminal:

```bash
cd ~/Desktop/tetra-visual
git remote add origin https://github.com/ramaactivity/tetra-visual.git
git push -u origin main
```

**Soal password:** GitHub tidak menerima password akun. Saat diminta:

- **Username:** `ramaactivity`
- **Password:** *Personal Access Token* — buat di
  <https://github.com/settings/tokens> → **Generate new token (classic)** →
  centang **`repo`** → Generate → salin (hanya muncul sekali)

> Repo ~105 MB karena berisi 337 foto asli. Push pertama agak lama, ini normal.

---

## Langkah 2 — Buat project di Vercel

1. Login <https://vercel.com> sebagai **`visualtetra@gmail.com`**, pastikan berada
   di team **`visualtetra-9970`** (sama dengan photobooth).
2. **Add New → Project**.
3. Repo `tetra-visual` **kemungkinan tidak muncul** di daftar — itu wajar dan
   memang disengaja: akun GitHub Anda tidak disambungkan ke Vercel (lihat
   penjelasan di bawah). Kalau begitu, buat project kosong lewat Terminal:

```bash
cd ~/Desktop/tetra-visual
npx vercel link
```

Ikuti pertanyaannya: pilih scope **visualtetra-9970**, jawab **no** saat ditanya
"link to existing project?", beri nama **`tetra-visual`**. Astro akan terdeteksi
otomatis.

Lalu deploy pertama:

```bash
npx vercel --prod
```

---

## Langkah 3 — Isi Project ID ke workflow

Setelah `vercel link`, file `.vercel/project.json` muncul di folder ini
(tidak ikut ter-push, sudah di-gitignore). Lihat isinya:

```bash
cat .vercel/project.json
```

Salin nilai `projectId`, lalu buka `.github/workflows/deploy.yml` dan ganti:

```yaml
VERCEL_PROJECT_ID: GANTI_DENGAN_PROJECT_ID_BARU
```

menjadi ID yang barusan Anda salin.

---

## Langkah 4 — Simpan token di GitHub

Token Vercel yang sudah ada untuk photobooth **bisa dipakai ulang**, asalkan
scope-nya team `visualtetra-9970` (memang begitu). Tokennya ada di
`.env.local` milik repo photobooth.

Kalau ingin buat baru: <https://vercel.com/account/settings/tokens> →
**Create Token** → scope ke team `visualtetra-9970` → **No Expiration**.

Simpan di repo `tetra-visual`: **Settings → Secrets and variables → Actions →
New repository secret** → nama **`VERCEL_TOKEN`** (huruf besar semua) → paste.

Lalu:

```bash
git add -A
git commit -m "Isi Vercel project ID"
git push
```

Push ini sekaligus menguji workflow-nya. Cek hasilnya di tab **Actions** repo.

---

## Langkah 5 — Pasang subdomain

### a. Di Vercel

Project `tetra-visual` → **Settings → Domains → Add** → ketik:

```
visual.tetraphoto.com
```

Vercel akan menampilkan record DNS yang diminta.

### b. Di Hostinger

Login Hostinger → domain `tetraphoto.com` → **DNS / Nameservers** → tambah record:

| Type | Name | Points to | TTL |
|---|---|---|---|
| CNAME | `visual` | `cname.vercel-dns.com` | biarkan default |

> Isi kolom Name **`visual`** saja, bukan `visual.tetraphoto.com` — Hostinger
> menambahkan nama domainnya sendiri.
>
> Kalau layar Vercel menampilkan nilai yang berbeda dari `cname.vercel-dns.com`,
> **ikuti yang di layar Vercel** — mereka bisa mengubahnya sewaktu-waktu.

**Jangan sentuh record lain.** Record `@` dan `www` milik situs photobooth —
kalau diubah, tetraphoto.com bisa mati.

### c. Tunggu

10 menit sampai beberapa jam. Vercel memasang sertifikat HTTPS otomatis dan gratis.
Cek dari Terminal:

```bash
dig +short CNAME visual.tetraphoto.com
```

Kalau sudah menjawab `cname.vercel-dns.com`, DNS-nya sudah menyebar.

---

## Langkah 6 — Daftarkan ke Google

<https://search.google.com/search-console> → **Add property → URL prefix** →
isi `https://visual.tetraphoto.com`.

> Kalau `tetraphoto.com` sudah terdaftar di Search Console, subdomain ini tetap
> harus didaftarkan **terpisah** — Google memperlakukannya sebagai situs sendiri.

Setelah terverifikasi: menu **Sitemaps** → isi `sitemap-index.xml` → Submit.

---

## Kenapa pakai GitHub Actions, bukan tombol Import di Vercel?

Satu akun GitHub hanya bisa "login-connect" ke satu akun Vercel dalam satu waktu.
Karena project Anda tersebar di beberapa akun Vercel, native Git integration
saling merebut koneksi itu sampai deploy ter-block. Pola CI-token tidak
bergantung pada koneksi GitHub↔Vercel, jadi permanen dan tidak saling ganggu.

Ini pola yang sama persis dengan project `tetra-photobooth`, termasuk step
`rm -rf .git` yang **wajib** — tanpa itu Vercel Hobby menolak dengan pesan
"commit email could not be matched".

---

## Kalau nanti beli domain sendiri

Misalnya `tetravisual.com`. Pindahnya cepat, sekitar 10 menit:

1. Ganti `site:` di `astro.config.mjs` dan baris `Sitemap:` di `public/robots.txt`
2. Tambahkan domain baru di Vercel → **Settings → Domains**
3. Arahkan DNS domain baru ke Vercel
4. Set `visual.tetraphoto.com` sebagai **Redirect** ke domain baru di Vercel,
   supaya link lama tidak mati
5. `git push`

Tidak ada yang terbuang dari pekerjaan sekarang.

---

## Troubleshooting

| Gejala | Penyebab & solusi |
|---|---|
| Actions merah, "commit email could not be matched" | Step `rm -rf .git` hilang dari workflow. Kembalikan. |
| Actions merah, gagal auth | Token kedaluwarsa atau salah scope. Buat baru, update secret `VERCEL_TOKEN`. |
| Deploy jalan dua kali | Native Git integration ikut nyambung. Vercel → Settings → Git → **Disconnect**. |
| Subdomain 404 setelah DNS aktif | Domain belum ditambahkan di project yang benar. Pastikan di project `tetra-visual`, bukan `tetra-photobooth`. |
| `tetraphoto.com` ikut bermasalah | Berarti record `@` atau `www` ikut terubah. Kembalikan: `@` → A `76.76.21.21`, `www` → CNAME `cname.vercel-dns.com`. |

---

## Yang tidak perlu dikhawatirkan

- **Akun Vercel lama Tetra Visual.** Tidak ada database, tidak ada data hilang.
  Semua isi website ada di folder ini. Abaikan saja.
- **Alamat lama `/event.html` dsb.** Sudah diatur otomatis dialihkan ke alamat
  baru, jadi link lama yang beredar tidak mati.
