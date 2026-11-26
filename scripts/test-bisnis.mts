// Uji logika dashboard bisnis (penomoran, total, quotation → invoice → kuitansi).
// Jalankan: node scripts/test-bisnis.mts
import assert from 'node:assert/strict';
import { cleanDocInput, InvalidInput, nextNumber, quotationToInvoice, receiptFor, remaining, renderBody, status, todayWIB, total, newDoc, type Doc } from '../src/lib/bisnis.ts';

const m = (id: string) => ({ id, user: 'Rama', now: '2026-11-26T03:00:00Z' });
const input = cleanDocInput({
  issued_at: '2026-11-26',
  client: { name: ' Panorama JTB ' },
  event: { date: '2026-12-05', time: '17.00 – selesai' },
  items: [{ name: 'Dokumentasi Foto & Video 2 Jam', includes: ['1 Fotografer', ' ', '1 Videografer'], qty: 1, unit_price: 2000000 }, { name: 'Tambahan 1 jam', qty: 1.5, unit_price: 300000 }],
  discount: 50000,
});
assert.equal(input.client.name, 'Panorama JTB');
assert.deepEqual(input.items[0]!.includes, ['1 Fotografer', '1 Videografer']);
assert.equal(total(input as Doc), 2000000 + 450000 - 50000);
assert.throws(() => cleanDocInput({ ...input, discount: 99_000_000 }), InvalidInput);
assert.throws(() => cleanDocInput({ ...input, items: [] }), InvalidInput);
assert.throws(() => cleanDocInput({ ...input, client: { name: '' } }), InvalidInput);

// Penomoran: urut per bulan per jenis, tanggal = tanggal terbit, batal tetap dihitung.
const docs: Doc[] = [];
const q1 = newDoc('quotation', input, docs, m('q1'));
assert.equal(q1.doc_number, 'QUO-TV-01-26112026');
docs.push(q1);
const q2 = newDoc('quotation', { ...input, issued_at: '2026-11-28' }, docs, m('q2'));
assert.equal(q2.doc_number, 'QUO-TV-02-28112026');
docs.push({ ...q2, cancelled: true });
assert.equal(nextNumber(docs, 'quotation', '2026-11-30'), 'QUO-TV-03-30112026');
assert.equal(nextNumber(docs, 'quotation', '2026-12-01'), 'QUO-TV-01-01122026');
assert.equal(nextNumber(docs, 'invoice', '2026-11-26'), 'INV-TV-01-26112026');

// Quotation → invoice: jatuh tempo = tanggal acara.
const inv = quotationToInvoice(q1, docs, m('i1'), '2026-11-27');
assert.equal(inv.doc_number, 'INV-TV-01-27112026');
assert.equal(inv.due_date, '2026-12-05');
assert.equal(inv.source_id, 'q1');
assert.equal(status(inv), 'belum_bayar');
docs.push(inv);

// Pembayaran → sisa & status; kuitansi kedua mencatat total terbayar kumulatif.
inv.payments.push({ id: 'p1', date: '2026-11-27', amount: 1000000, type: 'dp', bank: 'BCA', ref: null });
assert.equal(status(inv), 'sebagian');
assert.equal(remaining(inv), 1400000);
inv.payments.push({ id: 'p2', date: '2026-12-05', amount: 1400000, type: 'pelunasan', bank: 'BCA', ref: null });
assert.equal(status(inv), 'lunas');
const r2 = receiptFor(inv, 'p2', docs, m('r2'));
assert.equal(r2.doc_number, 'KWT-TV-01-05122026');
assert.equal(r2.receipt!.paid_through, 2400000);
assert.equal(r2.receipt!.amount, 1400000);

// Body API cetak: tanpa id internal, jenis tanggal sesuai dokumen.
const body = renderBody(inv);
assert.equal(body.brand, 'tetra_visual');
assert.equal(body.valid_until, null);
assert.ok(!('id' in body.payments[0]!));
assert.equal(renderBody(r2).receipt!.paid_through, 2400000);

// Hari WIB: 23.30 UTC = besoknya di Jakarta.
assert.equal(todayWIB(new Date('2026-11-26T17:30:00Z')), '2026-11-27');
assert.equal(todayWIB(new Date('2026-11-26T16:59:00Z')), '2026-11-26');

console.log('test-bisnis: semua lolos');
