// Pembantu data terstruktur (schema.org) untuk Google.
const SITE = import.meta.env.SITE;
const abs = (path: string) => new URL(path, SITE).href;

/** Jejak navigasi, mis. Beranda › Layanan › Dokumentasi Event — tampil di hasil Google. */
export const breadcrumb = (items: [name: string, path: string][]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: abs(path) })),
});

export const business = { '@id': `${abs('/')}#bisnis` };

export const faqPage = (faq: [string, string][]) => ({
  '@type': 'FAQPage',
  mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
});

/** Potong teks untuk meta description (±155 karakter) di batas kata. */
export function clip(text: string, max = 155) {
  const t = text.replace(/\s+/g, ' ').trim();
  return t.length <= max ? t : `${t.slice(0, t.lastIndexOf(' ', max - 1))}…`;
}

// Tanggal unggah & durasi video YouTube — wajib untuk hasil pencarian video Google.
// Diambil saat build (sekali per video); gagal = video tetap tampil, hanya tanpa data ini.
const ytCache = new Map<string, Promise<{ uploadDate?: string; duration?: string }>>();
export function youtubeMeta(id: string) {
  if (!ytCache.has(id)) {
    ytCache.set(
      id,
      fetch(`https://www.youtube.com/watch?v=${id}`, { headers: { 'Accept-Language': 'en' }, signal: AbortSignal.timeout(8000) })
        .then((r) => r.text())
        .then((html) => ({
          uploadDate: html.match(/itemprop="uploadDate" content="([^"]+)"/)?.[1],
          duration: html.match(/itemprop="duration" content="([^"]+)"/)?.[1],
        }))
        .catch(() => ({})),
    );
  }
  return ytCache.get(id)!;
}
