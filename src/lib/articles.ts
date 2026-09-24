import type { MarkdownInstance } from 'astro';

// Artikel = file Markdown di src/content/artikel/<slug>.md (frontmatter: title,
// description, date, service). Cukup tambah file baru — halaman & daftar ikut dibuat.
export interface ArticleMeta {
  title: string;
  description: string;
  date: string;
  /** Slug layanan terkait, untuk kotak ajakan di akhir artikel. */
  service?: string;
}

const mods = import.meta.glob<MarkdownInstance<ArticleMeta>>('/src/content/artikel/*.md', { eager: true });

export const articles = Object.entries(mods)
  .map(([path, mod]) => ({ slug: path.split('/').pop()!.replace(/\.md$/, ''), ...mod }))
  .sort((a, b) => String(b.frontmatter.date).localeCompare(String(a.frontmatter.date)));

export const articlesFor = (service: string) => articles.filter((a) => a.frontmatter.service === service);

export const fmtDate = (d: string | Date) =>
  new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
