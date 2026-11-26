// Dashboard bisnis Tetra Visual: dokumen (quotation/invoice/kuitansi), pembayaran, paket, jadwal.
// GET = semua data (crew hanya jadwal). POST { action, ... } = satu perubahan. Hanya pemilik
// berperan owner (RBAC, data-admin/users.json) yang boleh melihat & mengubah; data di R2 lewat bisnis-store.
import type { APIRoute } from 'astro';
import { randomUUID } from 'node:crypto';
import { isOwner, sessionUser } from '../../../lib/admin-auth';
import { Conflict, loadStore, storeConfigured, updateStore } from '../../../lib/bisnis-store';
import {
  DEFAULT_TERMS, InvalidInput, cleanDocInput, cleanEvent, cleanPackage, cleanPayment, eventFromInvoice,
  newDoc, quotationToInvoice, receiptFor, todayWIB, type Doc, type DocType, type Store,
} from '../../../lib/bisnis';

export const prerender = false;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });

const view = (s: Store, owner: boolean) =>
  owner ? { owner, ...s, defaultTerms: DEFAULT_TERMS, today: todayWIB() } : { owner, events: s.events, today: todayWIB() };

export const GET: APIRoute = async ({ cookies }) => {
  const me = await sessionUser(cookies);
  if (!me) return json({ error: 'Sesi berakhir — silakan masuk lagi.' }, 401);
  if (!storeConfigured()) return json({ error: 'Penyimpanan R2 belum dikonfigurasi di server.' }, 503);
  const { store } = await loadStore();
  return json(view(store, isOwner(me)));
};

const find = (s: Store, id: unknown, type?: DocType): Doc => {
  const d = s.documents.find((x) => x.id === id);
  if (!d || (type && d.doc_type !== type)) throw new InvalidInput('Dokumen tidak ditemukan.');
  return d;
};

export const POST: APIRoute = async ({ request, cookies }) => {
  const me = await sessionUser(cookies);
  if (!me) return json({ error: 'Sesi berakhir — silakan masuk lagi.' }, 401);
  if (!isOwner(me)) return json({ error: 'Hanya pemilik yang bisa mengubah data ini.' }, 403);
  if (!storeConfigured()) return json({ error: 'Penyimpanan R2 belum dikonfigurasi di server.' }, 503);
  const b = await request.json().catch(() => ({}));
  const now = new Date().toISOString();
  const meta = () => ({ id: randomUUID(), user: me.name, now });
  const touch = (d: Doc) => Object.assign(d, { updated_by: me.name, updated_at: now });

  try {
    const { store, result } = await updateStore((s): string | null => {
      switch (b.action) {
        case 'doc.create': {
          const type = b.doc_type as DocType;
          if (type !== 'quotation' && type !== 'invoice') throw new InvalidInput('Jenis dokumen tidak valid.');
          const d = newDoc(type, cleanDocInput(b.doc), s.documents, meta());
          s.documents.push(d);
          if (type === 'invoice') {
            const ev = eventFromInvoice(d, randomUUID());
            if (ev) s.events.push(ev);
          }
          return d.id;
        }
        case 'doc.update': {
          const d = find(s, b.id);
          if (d.doc_type === 'receipt') throw new InvalidInput('Kuitansi tidak bisa diubah — batalkan lalu buat ulang dari invoice.');
          if (d.cancelled) throw new InvalidInput('Dokumen yang dibatalkan tidak bisa diubah.');
          Object.assign(d, cleanDocInput(b.doc));
          touch(d);
          return d.id;
        }
        case 'doc.cancel': {
          const d = find(s, b.id);
          d.cancelled = !b.undo;
          // Kuitansi batal → pembayarannya bisa dikuitansikan ulang.
          if (d.doc_type === 'receipt' && d.source_id) {
            const inv = s.documents.find((x) => x.id === d.source_id);
            for (const p of inv?.payments ?? []) if (p.receipt_id === d.id) p.receipt_id = b.undo ? d.id : undefined;
          }
          // Quotation yang invoicenya dibatalkan kembali jadi "penawaran".
          if (d.doc_type === 'invoice' && d.source_id) {
            const q = s.documents.find((x) => x.id === d.source_id);
            if (q) q.invoice_id = b.undo ? d.id : null;
          }
          touch(d);
          return d.id;
        }
        case 'doc.toInvoice': {
          const q = find(s, b.id, 'quotation');
          if (q.cancelled) throw new InvalidInput('Quotation ini sudah dibatalkan.');
          if (q.invoice_id) return q.invoice_id;
          const inv = quotationToInvoice(q, s.documents, meta(), todayWIB());
          s.documents.push(inv);
          q.invoice_id = inv.id;
          touch(q);
          const ev = eventFromInvoice(inv, randomUUID());
          if (ev) s.events.push(ev);
          return inv.id;
        }
        case 'payment.add': {
          const inv = find(s, b.id, 'invoice');
          if (inv.cancelled) throw new InvalidInput('Invoice ini sudah dibatalkan.');
          inv.payments.push(cleanPayment(b.payment, randomUUID()));
          inv.payments.sort((x, y) => x.date.localeCompare(y.date));
          touch(inv);
          return inv.id;
        }
        case 'payment.delete': {
          const inv = find(s, b.id, 'invoice');
          const p = inv.payments.find((x) => x.id === b.paymentId);
          if (!p) throw new InvalidInput('Pembayaran tidak ditemukan.');
          if (p.receipt_id) throw new InvalidInput('Pembayaran ini sudah punya kuitansi — batalkan kuitansinya dulu.');
          inv.payments = inv.payments.filter((x) => x !== p);
          touch(inv);
          return inv.id;
        }
        case 'receipt.create': {
          const inv = find(s, b.id, 'invoice');
          const p = inv.payments.find((x) => x.id === b.paymentId);
          if (!p) throw new InvalidInput('Pembayaran tidak ditemukan.');
          if (p.receipt_id) return p.receipt_id;
          const r = receiptFor(inv, p.id, s.documents, meta());
          s.documents.push(r);
          p.receipt_id = r.id;
          touch(inv);
          return r.id;
        }
        case 'package.save': {
          const pkg = cleanPackage(b.package, b.package?.id || randomUUID());
          const i = s.packages.findIndex((x) => x.id === pkg.id);
          if (i >= 0) s.packages[i] = pkg;
          else s.packages.push(pkg);
          return pkg.id;
        }
        case 'package.delete':
          s.packages = s.packages.filter((x) => x.id !== b.id);
          return null;
        case 'package.move': {
          const i = s.packages.findIndex((x) => x.id === b.id);
          const j = i + (b.dir < 0 ? -1 : 1);
          if (i < 0 || j < 0 || j >= s.packages.length) return null;
          [s.packages[i], s.packages[j]] = [s.packages[j]!, s.packages[i]!];
          return null;
        }
        case 'event.save': {
          const old = s.events.find((x) => x.id === b.event?.id);
          const ev = cleanEvent(b.event, old?.id ?? randomUUID(), old?.doc_id ?? null);
          if (old) Object.assign(old, ev);
          else s.events.push(ev);
          return ev.id;
        }
        case 'event.delete':
          s.events = s.events.filter((x) => x.id !== b.id);
          return null;
        default:
          throw new InvalidInput('Aksi tidak dikenal.');
      }
    });
    return json({ ok: true, id: result, data: view(store, true) });
  } catch (e) {
    if (e instanceof InvalidInput) return json({ error: e.message }, 400);
    if (e instanceof Conflict) return json({ error: e.message }, 409);
    console.error('[api/admin/bisnis]', e);
    return json({ error: 'Gagal menyimpan ke penyimpanan. Coba lagi sebentar.' }, 502);
  }
};
