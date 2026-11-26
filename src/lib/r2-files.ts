// Fungsi R2 untuk file utuh (Bahan internal /admin/internal): presign unduh/upload, daftar, hapus.
// File terpisah dari r2.ts (milik dashboard bisnis) supaya dua fitur tidak saling tabrak.
// Tanpa SDK, pola tetra-ops/src/lib/storage/r2.ts. Hanya dipakai dari server.
import { createHash, createHmac } from 'node:crypto';
import type { R2Config } from './r2';

const sha256 = (s: string) => createHash('sha256').update(s).digest('hex');
const hmac = (k: string | Buffer, s: string) => createHmac('sha256', k).update(s).digest();
// RFC 3986 — encodeURIComponent menyisakan !'()* yang wajib di-encode SigV4.
const enc = (s: string) => encodeURIComponent(s).replace(/[!'()*]/g, (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`);

/**
 * URL bertanda tangan di query string (presign), berlaku `seconds` detik. Dipakai browser untuk
 * unduh/upload langsung ke R2 (tanpa batas 4,5 MB fungsi Vercel) dan server untuk list/hapus.
 * `headers` ikut ditandatangani: pengirim wajib mengirim nilai persis (mis. content-type +
 * content-length upload, jadi tipe & ukuran yang divalidasi server ditegakkan R2).
 * Pola: tetra-ops/src/lib/storage/r2.ts (signR2 presign).
 */
export function r2Presign(cfg: R2Config, method: string, path: string, seconds: number, query: Record<string, string> = {}, headers: Record<string, string> = {}): string {
  const host = `${cfg.account}.r2.cloudflarestorage.com`;
  const now = new Date().toISOString().replace(/[-:]|\.\d{3}/g, '');
  const day = now.slice(0, 8);
  const scope = `${day}/auto/s3/aws4_request`;
  const canonPath = path ? `/${cfg.bucket}/${path.split('/').map(enc).join('/')}` : `/${cfg.bucket}`;
  const h: Record<string, string> = { host };
  for (const [k, v] of Object.entries(headers)) h[k.toLowerCase()] = v.trim();
  const names = Object.keys(h).sort();
  const signed = names.join(';');
  const q: Record<string, string> = {
    ...query,
    'X-Amz-Algorithm': 'AWS4-HMAC-SHA256',
    'X-Amz-Credential': `${cfg.key}/${scope}`,
    'X-Amz-Date': now,
    'X-Amz-Expires': String(seconds),
    'X-Amz-SignedHeaders': signed,
  };
  const canonQuery = Object.keys(q).sort().map((k) => `${enc(k)}=${enc(q[k])}`).join('&');
  const canonical = [method, canonPath, canonQuery, names.map((n) => `${n}:${h[n]}\n`).join(''), signed, 'UNSIGNED-PAYLOAD'].join('\n');
  const toSign = `AWS4-HMAC-SHA256\n${now}\n${scope}\n${sha256(canonical)}`;
  let k = hmac(`AWS4${cfg.secret}`, day);
  for (const p of ['auto', 's3', 'aws4_request']) k = hmac(k, p);
  return `https://${host}${canonPath}?${canonQuery}&X-Amz-Signature=${createHmac('sha256', k).update(toSign).digest('hex')}`;
}

export interface R2Object { key: string; size: number; modified: string }

const tag = (xml: string, name: string) => xml.match(new RegExp(`<${name}>([^<]*)</${name}>`))?.[1] ?? '';
const unxml = (s: string) => s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, '&');

/** Daftar objek di bawah satu awalan. Error dilempar (jangan dianggap kosong). */
export async function r2List(cfg: R2Config, prefix: string): Promise<R2Object[]> {
  // ponytail: tanpa paginasi — maks 1000 objek per awalan; tambah continuation-token bila lebih.
  const r = await fetch(r2Presign(cfg, 'GET', '', 60, { 'list-type': '2', prefix }), { cache: 'no-store' });
  if (!r.ok) throw new Error(`R2 LIST ${r.status}`);
  const xml = await r.text();
  return [...xml.matchAll(/<Contents>([\s\S]*?)<\/Contents>/g)].map(([, c]) => ({
    key: unxml(tag(c, 'Key')),
    size: Number(tag(c, 'Size')),
    modified: tag(c, 'LastModified'),
  }));
}

/** Hapus objek (yang sudah tidak ada dianggap sukses). */
export async function r2Delete(cfg: R2Config, path: string): Promise<void> {
  const r = await fetch(r2Presign(cfg, 'DELETE', path, 60), { method: 'DELETE' });
  if (!r.ok && r.status !== 404) throw new Error(`R2 DELETE ${r.status}`);
}
