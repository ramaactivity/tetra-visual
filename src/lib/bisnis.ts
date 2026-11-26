// Dashboard bisnis Tetra Visual (DR-067 tetra-ops, keputusan Rama 26 Nov 2026): dokumen
// quotation → invoice → pembayaran → kuitansi, daftar paket & harga, dan jadwal event.
// Modul ini MURNI (tanpa I/O, tanpa astro:*) supaya bisa diuji langsung dengan Node:
// `node scripts/test-bisnis.mts`. Penyimpanan ada di bisnis-store.ts.
// Bentuk dokumen sengaja sama dengan body API cetak PDF Tetra Ops
// (POST team.tetraphoto.com/api/render/document) supaya tidak ada penerjemahan dua arah.

export type DocType = 'quotation' | 'invoice' | 'receipt';
export type PayType = 'dp' | 'partial' | 'pelunasan';

export interface Client { name: string; attn: string | null; phone: string | null; email: string | null; address: string | null }
export interface EventInfo { title: string | null; date: string | null; time: string | null; venue: string | null; city: string | null }
export interface Item { name: string; includes: string[]; qty: number; unit_price: number }
export interface Payment { id: string; date: string; amount: number; type: PayType; bank: string | null; ref: string | null; receipt_id?: string }
export interface Receipt { date: string; amount: number; type: PayType; bank: string | null; sender: string | null; paid_through: number }

export interface Doc {
  id: string;
  doc_type: DocType;
  doc_number: string;
  issued_at: string;
  due_date: string | null;
  valid_until: string | null;
  client: Client;
  event: EventInfo;
  items: Item[];
  discount: number;
  notes: string | null;
  terms: string[];
  /** Invoice: pembayaran yang sudah masuk. */
  payments: Payment[];
  /** Kuitansi: pembayaran yang dikuitansikan. */
  receipt: Receipt | null;
  /** Invoice ← quotation, kuitansi ← invoice. */
  source_id: string | null;
  /** Quotation yang sudah dijadikan invoice. */
  invoice_id: string | null;
  cancelled: boolean;
  created_by: string;
  created_at: string;
  updated_by: string;
  updated_at: string;
}

export interface Pkg { id: string; name: string; includes: string[]; price: number; active: boolean }

export interface Ev {
  id: string;
  date: string;
  time: string | null;
  title: string;
  client: string | null;
  venue: string | null;
  city: string | null;
  crew: string | null;
  notes: string | null;
  /** Invoice asal (jadwal dibuat otomatis saat invoice terbit). */
  doc_id: string | null;
}

export interface Store { packages: Pkg[]; documents: Doc[]; events: Ev[] }
export const emptyStore = (): Store => ({ packages: [], documents: [], events: [] });

export const PREFIX: Record<DocType, string> = { quotation: 'QUO', invoice: 'INV', receipt: 'KWT' };
export const DOC_LABEL: Record<DocType, string> = { quotation: 'Quotation', invoice: 'Invoice', receipt: 'Kuitansi' };

const PPN = 'Harga belum termasuk pajak (PPN/PPh) karena Tetra Visual merupakan usaha perorangan non-PKP.';
/** Ketentuan bawaan dokumen baru (bisa diubah per dokumen). Diambil dari dokumen pertama yang dikirim Rama. */
export const DEFAULT_TERMS: Record<DocType, string[]> = {
  quotation: [
    'Harga berlaku 14 hari sejak tanggal penawaran.',
    'Pembayaran penuh sebelum acara dimulai.',
    'Tambahan durasi di lokasi dihitung terpisah sesuai kesepakatan.',
    PPN,
  ],
  invoice: ['Pelunasan dilakukan paling lambat pada tanggal jatuh tempo, sebelum acara dimulai.', PPN],
  receipt: [],
};

/** Tanggal hari ini menurut WIB (YYYY-MM-DD), bukan UTC. */
export const todayWIB = (now = new Date()) => new Date(now.getTime() + 7 * 3600e3).toISOString().slice(0, 10);

export const addDays = (iso: string, days: number) => {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
};

export const subtotal = (d: Pick<Doc, 'items'>) => d.items.reduce((s, i) => s + Math.round(i.qty * i.unit_price), 0);
export const total = (d: Pick<Doc, 'items' | 'discount'>) => Math.max(0, subtotal(d) - (d.discount || 0));
export const paid = (d: Pick<Doc, 'payments'>) => d.payments.reduce((s, p) => s + p.amount, 0);
export const remaining = (d: Pick<Doc, 'items' | 'discount' | 'payments'>) => Math.max(0, total(d) - paid(d));

export type DocStatus = 'penawaran' | 'diterima' | 'belum_bayar' | 'sebagian' | 'lunas' | 'kuitansi' | 'batal';
export function status(d: Doc): DocStatus {
  if (d.cancelled) return 'batal';
  if (d.doc_type === 'receipt') return 'kuitansi';
  if (d.doc_type === 'quotation') return d.invoice_id ? 'diterima' : 'penawaran';
  const p = paid(d);
  return p <= 0 ? 'belum_bayar' : p >= total(d) ? 'lunas' : 'sebagian';
}

/**
 * Nomor berikutnya: PREFIX-TV-<urut 2 digit>-<DDMMYYYY tanggal terbit>. Urutan diulang tiap
 * bulan, per jenis dokumen; dokumen yang dibatalkan tetap dihitung (nomor tidak dipakai ulang).
 * Contoh: QUO-TV-01-26112026 → QUO-TV-02-28112026.
 */
export function nextNumber(docs: Doc[], type: DocType, issuedAt: string): string {
  const month = issuedAt.slice(0, 7);
  const re = new RegExp(`^${PREFIX[type]}-TV-(\\d+)-`);
  const max = docs
    .filter((d) => d.doc_type === type && d.issued_at.slice(0, 7) === month)
    .reduce((m, d) => Math.max(m, Number(re.exec(d.doc_number)?.[1] ?? 0)), 0);
  const [y, mo, day] = issuedAt.split('-');
  return `${PREFIX[type]}-TV-${String(max + 1).padStart(2, '0')}-${day}${mo}${y}`;
}

const t = (v: unknown, max: number) => {
  const s = typeof v === 'string' ? v.trim().slice(0, max) : '';
  return s || null;
};
const isDate = (v: unknown): v is string => typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v) && !Number.isNaN(Date.parse(v));
const rupiah = (v: unknown) => {
  const n = Math.round(Number(v));
  return Number.isFinite(n) && n >= 0 && n <= 10_000_000_000 ? n : NaN;
};
const lines = (v: unknown, max = 30) =>
  (Array.isArray(v) ? v : []).map((x) => t(x, 400)).filter((x): x is string => Boolean(x)).slice(0, max);

export class InvalidInput extends Error {}

/** Isian dokumen dari browser → bagian dokumen yang boleh diubah pengguna. Melempar InvalidInput. */
export function cleanDocInput(b: any): Pick<Doc, 'issued_at' | 'due_date' | 'valid_until' | 'client' | 'event' | 'items' | 'discount' | 'notes' | 'terms'> {
  if (!isDate(b?.issued_at)) throw new InvalidInput('Tanggal terbit wajib diisi.');
  const name = t(b?.client?.name, 160);
  if (!name) throw new InvalidInput('Nama klien wajib diisi.');
  const items = (Array.isArray(b?.items) ? b.items : []).map((i: any) => ({
    name: t(i?.name, 200) ?? '',
    includes: lines(i?.includes).map((x) => x.slice(0, 200)),
    qty: Number(i?.qty),
    unit_price: rupiah(i?.unit_price),
  }));
  if (!items.length) throw new InvalidInput('Isi minimal satu baris layanan.');
  if (items.length > 50) throw new InvalidInput('Maksimal 50 baris layanan.');
  for (const [n, i] of items.entries()) {
    if (!i.name) throw new InvalidInput(`Baris ${n + 1}: nama layanan wajib diisi.`);
    if (!(i.qty > 0 && i.qty <= 10_000)) throw new InvalidInput(`Baris ${n + 1}: jumlah (qty) harus lebih dari 0.`);
    if (Number.isNaN(i.unit_price)) throw new InvalidInput(`Baris ${n + 1}: harga tidak valid.`);
  }
  const discount = b?.discount ? rupiah(b.discount) : 0;
  if (Number.isNaN(discount)) throw new InvalidInput('Diskon tidak valid.');
  const doc = {
    issued_at: b.issued_at,
    due_date: isDate(b?.due_date) ? b.due_date : null,
    valid_until: isDate(b?.valid_until) ? b.valid_until : null,
    client: { name, attn: t(b?.client?.attn, 160), phone: t(b?.client?.phone, 40), email: t(b?.client?.email, 160), address: t(b?.client?.address, 400) },
    event: { title: t(b?.event?.title, 160), date: isDate(b?.event?.date) ? b.event.date : null, time: t(b?.event?.time, 80), venue: t(b?.event?.venue, 160), city: t(b?.event?.city, 80) },
    items,
    discount,
    notes: t(b?.notes, 2000),
    terms: lines(b?.terms, 20),
  };
  if (doc.discount > subtotal(doc)) throw new InvalidInput('Diskon lebih besar dari subtotal.');
  return doc;
}

export function cleanPayment(b: any, id: string): Payment {
  if (!isDate(b?.date)) throw new InvalidInput('Tanggal pembayaran wajib diisi.');
  const amount = rupiah(b?.amount);
  if (!(amount > 0)) throw new InvalidInput('Nominal pembayaran harus lebih dari 0.');
  const type: PayType = ['dp', 'partial', 'pelunasan'].includes(b?.type) ? b.type : 'partial';
  return { id, date: b.date, amount, type, bank: t(b?.bank, 80), ref: t(b?.ref, 60) };
}

export function cleanPackage(b: any, id: string): Pkg {
  const name = t(b?.name, 200);
  if (!name) throw new InvalidInput('Nama paket wajib diisi.');
  const price = rupiah(b?.price);
  if (Number.isNaN(price)) throw new InvalidInput('Harga paket tidak valid.');
  return { id, name, includes: lines(b?.includes).map((x) => x.slice(0, 200)), price, active: b?.active !== false };
}

export function cleanEvent(b: any, id: string, docId: string | null = null): Ev {
  if (!isDate(b?.date)) throw new InvalidInput('Tanggal acara wajib diisi.');
  const title = t(b?.title, 160);
  if (!title) throw new InvalidInput('Nama acara wajib diisi.');
  return { id, date: b.date, time: t(b?.time, 80), title, client: t(b?.client, 160), venue: t(b?.venue, 160), city: t(b?.city, 80), crew: t(b?.crew, 300), notes: t(b?.notes, 2000), doc_id: docId };
}

type Meta = { id: string; user: string; now: string };

export function newDoc(type: DocType, input: ReturnType<typeof cleanDocInput>, docs: Doc[], m: Meta, extra: Partial<Doc> = {}): Doc {
  return {
    id: m.id,
    doc_type: type,
    doc_number: nextNumber(docs, type, input.issued_at),
    ...input,
    payments: [],
    receipt: null,
    source_id: null,
    invoice_id: null,
    cancelled: false,
    created_by: m.user,
    created_at: m.now,
    updated_by: m.user,
    updated_at: m.now,
    ...extra,
  };
}

/** Quotation yang disetujui klien → invoice baru (isi disalin, jatuh tempo = tanggal acara bila ada). */
export function quotationToInvoice(q: Doc, docs: Doc[], m: Meta, today: string): Doc {
  const due = q.event.date && q.event.date >= today ? q.event.date : addDays(today, 7);
  return newDoc(
    'invoice',
    { issued_at: today, due_date: due, valid_until: null, client: q.client, event: q.event, items: q.items, discount: q.discount, notes: q.notes, terms: DEFAULT_TERMS.invoice },
    docs,
    m,
    { source_id: q.id },
  );
}

/** Kuitansi untuk satu pembayaran invoice. paid_through = total terbayar s.d. pembayaran ini. */
export function receiptFor(inv: Doc, paymentId: string, docs: Doc[], m: Meta): Doc {
  const idx = inv.payments.findIndex((p) => p.id === paymentId);
  if (idx < 0) throw new InvalidInput('Pembayaran tidak ditemukan.');
  const p = inv.payments[idx]!;
  const paidThrough = inv.payments.slice(0, idx + 1).reduce((s, x) => s + x.amount, 0);
  return newDoc(
    'receipt',
    { issued_at: p.date, due_date: null, valid_until: null, client: inv.client, event: inv.event, items: inv.items, discount: inv.discount, notes: null, terms: DEFAULT_TERMS.receipt },
    docs,
    m,
    { source_id: inv.id, payments: inv.payments.slice(0, idx + 1).map(({ receipt_id: _r, ...x }) => x), receipt: { date: p.date, amount: p.amount, type: p.type, bank: p.bank, sender: null, paid_through: paidThrough } },
  );
}

/** Jadwal otomatis dari invoice (hanya bila tanggal acara diisi). */
export function eventFromInvoice(inv: Doc, id: string): Ev | null {
  if (!inv.event.date) return null;
  return { id, date: inv.event.date, time: inv.event.time, title: inv.event.title || inv.client.name, client: inv.client.name, venue: inv.event.venue, city: inv.event.city, crew: null, notes: null, doc_id: inv.id };
}

/** Body untuk API cetak PDF Tetra Ops (docs/06_API_SPEC.md §24 di tetra-ops). */
export function renderBody(d: Doc) {
  return {
    brand: 'tetra_visual',
    doc_type: d.doc_type,
    doc_number: d.doc_number,
    issued_at: d.issued_at,
    due_date: d.doc_type === 'invoice' ? d.due_date : null,
    valid_until: d.doc_type === 'quotation' ? d.valid_until : null,
    client: d.client,
    event: d.event,
    items: d.items,
    discount: d.discount,
    gross_up: { enabled: false, rate_pct: 0 },
    notes: d.notes,
    terms: d.terms,
    payments: d.payments.map(({ id: _i, receipt_id: _r, ...p }) => p),
    receipt: d.doc_type === 'receipt' ? d.receipt : null,
    signer: null,
    bank: null,
  };
}

