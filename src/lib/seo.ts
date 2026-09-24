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
// Hanya hasil yang berhasil disimpan di cache: kegagalan sesaat tidak boleh menempel.
type YtMeta = { uploadDate?: string; duration?: string };
const ytCache = new Map<string, YtMeta>();
export async function youtubeMeta(id: string): Promise<YtMeta> {
  const hit = ytCache.get(id);
  if (hit) return hit;
  try {
    const html = await (
      await fetch(`https://www.youtube.com/watch?v=${id}`, {
        headers: {
          'Accept-Language': 'en',
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36',
        },
        signal: AbortSignal.timeout(8000),
      })
    ).text();
    const uploadDate = html.match(/itemprop="uploadDate" content="([^"]+)"/)?.[1] ?? html.match(/"uploadDate":"([^"]+)"/)?.[1];
    const secs = Number(html.match(/"lengthSeconds":"(\d+)"/)?.[1]);
    const duration = html.match(/itemprop="duration" content="([^"]+)"/)?.[1] ?? (secs ? `PT${Math.floor(secs / 60)}M${secs % 60}S` : undefined);
    if (!uploadDate) return {};
    const meta = { uploadDate: uploadDate.slice(0, 10), duration };
    ytCache.set(id, meta);
    return meta;
  } catch {
    return {};
  }
}
