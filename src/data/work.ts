// Data karya. Proyek/event TIDAK ditulis di sini lagi — kelola lewat dashboard
// /admin, yang menyimpan satu file per proyek:
//   src/content/projects/<slug>.json   → judul, kategori, link YouTube, teks, urutan
//   src/assets/projects/<slug>/        → cover.jpg + foto dokumentasi (01.jpg, 02.jpg, …)
// Foto lama yang belum diketahui proyeknya tetap di src/assets/work/<kategori>/photos/.
import type { ImageMetadata } from 'astro';

/** Urutan di sini = urutan baris di beranda & halaman Work (kategori terkuat lebih dulu). */
const CATEGORY_META = [
  {
    slug: 'corporate',
    name: 'Corporate',
    blurb: 'Profil perusahaan, campaign brand, dan liputan korporat yang rapi dan terarah.',
    // Latar hero kategori: sengaja FOTO, bukan cover video — cover punya teks judul
    // yang menembus di belakang tulisan hero. Path relatif ke src/assets/.
    hero: 'work/corporate/photos/photo-37.jpg',
  },
  {
    slug: 'event',
    name: 'Event',
    blurb: 'Dokumentasi acara, festival, dan kegiatan lapangan dari awal sampai akhir.',
    hero: 'projects/mountain-jungle-course-2022/01.jpg',
  },
  {
    slug: 'sport',
    name: 'Sport',
    blurb: 'Aksi cepat, momen menentukan, dan atmosfer pertandingan.',
    hero: 'work/sport/photos/photo-49.jpg',
  },
  {
    slug: 'competition',
    name: 'Competition',
    blurb: 'Perlombaan dan kompetisi, dari persiapan sampai pengumuman juara.',
    hero: 'projects/juara-1-promosi-kuliner-kota-bogor/02.jpg',
  },
  {
    slug: 'wedding',
    name: 'Wedding',
    blurb: 'Hari pernikahan diceritakan apa adanya, tanpa dibuat-buat.',
    hero: 'work/wedding/photos/photo-05.jpg',
  },
  {
    slug: 'birthday',
    name: 'Birthday',
    blurb: 'Perayaan ulang tahun yang hangat, jujur, dan menyenangkan.',
    hero: 'projects/sweet-17th-binda/02.jpg',
  },
  {
    slug: 'graduation',
    name: 'Graduation',
    blurb: 'Kelulusan dan wisuda, momen yang cuma datang sekali.',
    hero: 'projects/photoshoot-farika/01.jpg',
  },
  {
    slug: 'other',
    name: 'Other',
    blurb: 'Karya lain yang tidak masuk kategori mana pun.',
    hero: 'projects/sangjit-lisda-chis/01.jpg',
  },
];

/** Isi file src/content/projects/<slug>.json — ditulis oleh dashboard. */
export interface ProjectFile {
  title: string;
  category: string;
  /** Link YouTube apa pun (youtu.be, watch?v=, shorts) atau ID-nya saja. Kosong = belum ada. */
  youtube: string;
  desc: string;
  synopsis: string;
  /** Nama file di src/assets/projects/<slug>/ */
  cover: string;
  photos: string[];
  /** Kecil tampil duluan di barisnya. */
  order: number;
  /** Karya unggulan: tampil di hero beranda. */
  featured: boolean;
  /** Data video YouTube untuk Google (tanggal unggah wajib, durasi ISO 8601). Diisi dashboard saat Simpan. */
  video?: { uploaded: string; duration?: string };
  /** Kota/area lokasi proyek (lihat CITY_NAMES di data/cities.ts). Kosong = tidak disebut. */
  city?: string;
  /** Tanggal proyek ditambahkan (ISO). Dipakai untuk urutan Terbaru/Terlama. */
  date?: string;
  /** Diisi server dashboard dari akun yang login. Kosong = proyek dari data awal. */
  addedBy?: string;
  editedBy?: string;
  editedAt?: string;
}

export interface Project {
  slug: string;
  category: string;
  title: string;
  desc: string;
  synopsis: string;
  youtubeId: string;
  cover: ImageMetadata;
  photos: ImageMetadata[];
  order: number;
  featured: boolean;
  video?: { uploaded: string; duration?: string };
  city?: string;
  date?: string;
}

export interface Category {
  slug: string;
  name: string;
  blurb: string;
  hero: ImageMetadata | undefined;
  projects: Project[];
  /** Semua foto kategori: foto tiap proyek (berurutan) lalu foto yang belum berproyek. */
  photos: ImageMetadata[];
}

type Mod = { default: ImageMetadata };
const files = import.meta.glob<ProjectFile>('/src/content/projects/*.json', { eager: true, import: 'default' });
const images = import.meta.glob<Mod>('/src/assets/{projects,work}/**/*.{jpg,jpeg,png,webp}', { eager: true });

/** Gambar berdasarkan path relatif ke src/assets/, mis. 'projects/vitacimin/01.jpg'. */
export const asset = (path: string): ImageMetadata | undefined => images[`/src/assets/${path}`]?.default;

export function youtubeIdOf(input: string): string {
  const s = input.trim();
  const m = s.match(/(?:youtu\.be\/|[?&]v=|\/shorts\/|\/embed\/|\/live\/)([\w-]{11})/) ?? s.match(/^([\w-]{11})$/);
  return m?.[1] ?? '';
}

const known = new Set(CATEGORY_META.map((c) => c.slug));

// Data dari dashboard tidak boleh menggagalkan build: entri yang rusak dilewati
// dengan peringatan, situs tetap tayang dengan proyek lainnya.
const projects: Project[] = Object.entries(files)
  .flatMap(([path, f]) => {
    const slug = path.split('/').pop()!.replace(/\.json$/, '');
    const img = (file: string) => asset(`projects/${slug}/${file}`);
    const cover = img(f.cover);
    if (!cover || !known.has(f.category)) {
      console.warn(`[work] Proyek "${slug}" dilewati: ${cover ? `kategori "${f.category}" tidak dikenal` : `cover "${f.cover}" tidak ditemukan`}`);
      return [];
    }
    return [{
      slug,
      category: f.category,
      title: f.title,
      desc: f.desc ?? '',
      synopsis: f.synopsis ?? '',
      youtubeId: youtubeIdOf(f.youtube ?? ''),
      cover,
      photos: (f.photos ?? []).map(img).filter((i): i is ImageMetadata => Boolean(i)),
      order: f.order ?? 0,
      featured: Boolean(f.featured),
      video: f.video,
      city: f.city || undefined,
      date: f.date,
    }];
  })
  .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));

const leftovers = (slug: string) =>
  Object.keys(images)
    .filter((p) => p.startsWith(`/src/assets/work/${slug}/photos/`))
    .sort()
    .map((p) => images[p]!.default);

export const categories: Category[] = CATEGORY_META.map((m) => {
  const own = projects.filter((p) => p.category === m.slug);
  const photos = [...own.flatMap((p) => p.photos), ...leftovers(m.slug)];
  return { ...m, projects: own, photos, hero: asset(m.hero) ?? photos[0] ?? own[0]?.cover };
});

export const categoryBySlug = new Map(categories.map((c) => [c.slug, c]));
export const allProjects = projects;
export const featuredProject: Project | undefined = projects.find((p) => p.featured) ?? projects[0];
export const totals = {
  videos: projects.length,
  photos: categories.reduce((n, c) => n + c.photos.length, 0),
};
