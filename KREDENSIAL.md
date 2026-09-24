# Kredensial & Informasi Penting — Tetra Visual

Satu tempat untuk semua yang perlu diingat soal website ini.

**File ini sengaja ikut ter-commit** dan **tidak berisi rahasia apa pun** — hanya
pengenal, alamat, dan petunjuk di mana tiap rahasia disimpan. Kalau MacBook Anda
hilang atau rusak, semua yang di bawah ini masih bisa dibaca dari GitHub.

> Aturannya: **nilai rahasia tidak pernah ditulis di file yang masuk git.**
> Kalau suatu saat perlu menambah sesuatu di sini, tulis *di mana* rahasianya
> berada, bukan isinya.

---

## Akun

| Layanan | Akun | Catatan |
|---|---|---|
| **Vercel** | `visualtetra@gmail.com` | team `visualtetra-9970`, tier **Hobby** |
| **GitHub** | `ramaactivity` | push sebagai `rama.activity98@gmail.com` |
| **Domain** | Hostinger | nameserver `dns-parking.com` |

Akun Vercel ini juga menaungi project `tetra-photobooth` (tetraphoto.com).

---

## Website ini

| | |
|---|---|
| Alamat produksi | <https://visual.tetraphoto.com> |
| Alamat cadangan | <https://tetra-visual-ten.vercel.app> |
| Repo | <https://github.com/ramaactivity/tetra-visual> (private) |
| Project Vercel | `tetra-visual` |
| Project ID | `prj_xzq56lAH7qOVhetV66HexfxNodBB` |
| Org / Team ID | `team_dTn9InAoDuNiGiK1ca7VOSBB` |

> Project ID dan Org ID **bukan rahasia** — keduanya memang ditulis terbuka di
> `.github/workflows/deploy.yml`. Tanpa token, keduanya tidak bisa dipakai
> siapa pun.

---

## Kontak yang tampil di website

Sumbernya satu file: **`src/data/site.ts`**. Ubah di sana, berubah di semua halaman.

| | |
|---|---|
| WhatsApp | `6289611384767` |
| Email | `visualtetra@gmail.com` |
| Instagram | [@tetravisual.jpeg](https://www.instagram.com/tetravisual.jpeg/) |
| TikTok | [@tetra.visual](https://www.tiktok.com/@tetra.visual) |

---

## DNS — record milik website ini

Dikelola di **Hostinger**, domain `tetraphoto.com`:

| Type | Name | Points to | Milik |
|---|---|---|---|
| CNAME | `visual` | `cname.vercel-dns.com` | **Tetra Visual** ← ini punya kita |
| A | `@` | `76.76.21.21` | Tetra Photobooth — **jangan disentuh** |
| CNAME | `www` | `cname.vercel-dns.com` | Tetra Photobooth — **jangan disentuh** |

Vercel sebenarnya menyarankan `A visual → 76.76.21.21`, tapi CNAME juga
diterima dan itu yang sekarang terpasang serta terverifikasi.

Cek kapan saja:

```bash
dig +short CNAME visual.tetraphoto.com
```

---

## Di mana tiap rahasia disimpan

| Rahasia | Tersimpan di | Untuk apa |
|---|---|---|
| **Vercel token** | GitHub → repo `tetra-visual` → Settings → Secrets and variables → Actions → `VERCEL_TOKEN` | Dipakai GitHub Actions untuk deploy otomatis |
| **Vercel token** (salinan) | `.env.local` repo **TETRA PHOTOBOOTH WEBSITE** | Tempat asalnya. Boleh dipakai ulang, scope-nya sama. |
| **Sesi login Vercel CLI** | `~/Library/Application Support/com.vercel.cli/auth.json` | Otomatis dari `vercel login` |
| **`VERCEL_OIDC_TOKEN`** | `.env.local` repo ini (gitignored) | Dibuat otomatis oleh `vercel link` |
| **Kredensial GitHub** | `~/.git-credentials` | Dari `credential.helper = store` |
| **Token dashboard** (GitHub fine-grained, nama "Dashboard Tetra Visual") | Browser yang dipakai membuka `/admin` (localStorage) + salinan di `.env.local` repo ini (`TETRA_DASHBOARD_GITHUB_TOKEN`, gitignored) | Login dashboard karya. Hilang/ganti perangkat → buat token baru lewat tautan di halaman masuk. Bocor → hapus di <https://github.com/settings/personal-access-tokens>. |

### Kalau token Vercel bocor atau hilang

1. <https://vercel.com/account/settings/tokens> → hapus token lama
2. **Create Token** → scope team `visualtetra-9970` → **No Expiration**
3. Perbarui secret `VERCEL_TOKEN` di **kedua** repo (`tetra-visual` dan
   `Tetra-website`)

### Catatan keamanan yang belum dibereskan

`git config credential.helper` diset ke **`store`**, artinya token GitHub Anda
tersimpan sebagai **teks biasa** di `~/.git-credentials` — siapa pun yang bisa
membuka Mac ini bisa membacanya. Lebih aman dipindah ke Keychain macOS:

```bash
git config --global credential.helper osxkeychain
rm ~/.git-credentials
```

Setelah itu, `git push` berikutnya akan meminta username + token sekali lagi,
lalu tersimpan terenkripsi di Keychain.

---

## Cara deploy

| Cara | Perintah / aksi |
|---|---|
| Otomatis | `git push` ke branch `main` → GitHub Actions jalan sendiri |
| Manual dari Mac | `vercel deploy --prod` |
| Manual dari GitHub | tab **Actions** → workflow **Deploy to Vercel** → **Run workflow** |

Langkah lengkap dan penyelesaian masalah ada di **[DEPLOY.md](DEPLOY.md)**.

---

## Yang harus diubah kalau nanti pindah domain

Misalnya beli `tetravisual.com`:

1. `astro.config.mjs` → baris `site:`
2. `public/robots.txt` → baris `Sitemap:`
3. Tambah domain baru di Vercel → Settings → Domains
4. Arahkan DNS domain baru ke Vercel
5. Set `visual.tetraphoto.com` jadi **Redirect** ke domain baru, supaya link
   lama tidak mati
6. Perbarui file ini
