// Klien Cloudflare R2 minimal (S3 path-style + tanda tangan SigV4), tanpa SDK.
// Data dashboard bisnis Tetra Visual dititipkan di bucket R2 milik Tetra Ops (keputusan Rama
// 26 Nov 2026), di bawah awalan `tetra-visual/`. Hanya dipakai dari server.
// Pola tanda tangan mengikuti tetra-ops/src/lib/storage/r2.ts.
import { createHash, createHmac } from 'node:crypto';

export interface R2Config {
  account: string;
  key: string;
  secret: string;
  bucket: string;
}

const sha256 = (s: string | Uint8Array) => createHash('sha256').update(s).digest('hex');
const hmac = (k: string | Buffer, s: string) => createHmac('sha256', k).update(s).digest();
// RFC 3986 — encodeURIComponent menyisakan !'()* yang wajib di-encode SigV4.
const enc = (s: string) => encodeURIComponent(s).replace(/[!'()*]/g, (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`);

function sign(cfg: R2Config, method: string, path: string, body: Uint8Array | null, extra: Record<string, string> = {}) {
  const host = `${cfg.account}.r2.cloudflarestorage.com`;
  const now = new Date().toISOString().replace(/[-:]|\.\d{3}/g, '');
  const day = now.slice(0, 8);
  const scope = `${day}/auto/s3/aws4_request`;
  const canonPath = `/${cfg.bucket}/${path.split('/').map(enc).join('/')}`;
  const payload = sha256(body ?? '');
  const headers: Record<string, string> = { host, 'x-amz-date': now, 'x-amz-content-sha256': payload };
  for (const [k, v] of Object.entries(extra)) headers[k.toLowerCase()] = v.trim();
  const names = Object.keys(headers).sort();
  const signed = names.join(';');
  const canonical = [method, canonPath, '', names.map((h) => `${h}:${headers[h]}\n`).join(''), signed, payload].join('\n');
  const toSign = `AWS4-HMAC-SHA256\n${now}\n${scope}\n${sha256(canonical)}`;
  let k = hmac(`AWS4${cfg.secret}`, day);
  for (const p of ['auto', 's3', 'aws4_request']) k = hmac(k, p);
  const sig = createHmac('sha256', k).update(toSign).digest('hex');
  const { host: _h, ...send } = headers;
  return {
    url: `https://${host}${canonPath}`,
    headers: { ...send, authorization: `AWS4-HMAC-SHA256 Credential=${cfg.key}/${scope}, SignedHeaders=${signed}, Signature=${sig}` },
  };
}

/** Isi objek + ETag-nya, atau null bila belum ada. Error lain dilempar (jangan dianggap kosong). */
export async function r2GetText(cfg: R2Config, path: string): Promise<{ text: string; etag: string } | null> {
  const s = sign(cfg, 'GET', path, null);
  const r = await fetch(s.url, { headers: s.headers, cache: 'no-store' });
  if (r.status === 404) return null;
  if (!r.ok) throw new Error(`R2 GET ${r.status}`);
  // Respons yang dikompres (gzip) membawa ETag lemah `W/"…"`; If-Match butuh versi kuatnya,
  // kalau tidak setiap simpanan dianggap bentrok.
  return { text: await r.text(), etag: (r.headers.get('etag') ?? '').replace(/^W\//, '') };
}

/**
 * Simpan objek. `ifMatch` = ETag versi yang dibaca (tolak bila sudah diubah orang lain);
 * `ifMatch: null` = hanya bila objek belum ada. Mengembalikan false saat bentrok (412).
 */
export async function r2PutText(cfg: R2Config, path: string, text: string, ifMatch?: string | null, contentType = 'application/json'): Promise<boolean> {
  const body = new TextEncoder().encode(text);
  const cond: Record<string, string> = ifMatch === null ? { 'if-none-match': '*' } : ifMatch ? { 'if-match': ifMatch } : {};
  const s = sign(cfg, 'PUT', path, body, { 'content-type': contentType, ...cond });
  const r = await fetch(s.url, { method: 'PUT', headers: s.headers, body });
  if (r.status === 412) return false;
  if (!r.ok) throw new Error(`R2 PUT ${r.status}: ${(await r.text()).slice(0, 160)}`);
  return true;
}
