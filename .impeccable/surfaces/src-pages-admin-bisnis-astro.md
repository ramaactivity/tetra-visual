---
version: 1
slug: "src-pages-admin-bisnis-astro"
primary_target: "src/pages/admin/bisnis.astro"
related_targets: []
---

## Scope

Dashboard bisnis Tetra Visual (`/admin/bisnis`): Dokumen (quotation → invoice → pembayaran → kuitansi), Jadwal, Paket & harga. Mode: **Operate**. Pengguna: Rama (owner) di HP dan laptop ~1230 px; crew hanya melihat Jadwal.

Task: kirim quotation dalam 1–2 menit, tahu uang mana yang belum masuk, catat pembayaran, terbitkan kuitansi, lihat acara mendatang.

Constraints: kontrol standar web (bukan kontrol bawaan browser: select/date/number/checkbox/confirm), Bahasa Indonesia, rupiah tanpa desimal, angka tabular, sans-serif saja, tombol pill, logo resmi utuh.

## Direction contract

FORM: seed:32609c1237802d78 — grounded candidate 5 of 7: the event **rundown / call sheet** (lembar rundown acara yang dipegang crew WO & dokumentasi di lokasi). Challenger verdicts: exposure-record declined (kept: a fixed neutral step ramp), Emigre bitmap declined (kept: one family repeated across a strict size ladder), orienteering map declined (kept: one colour reserved for one meaning), boarding pass/gate board competitive (kept: rows rank by time and keep identity; a changed row stays marked until seen), zoo map declined (kept: flat unmodulated colour, no gradients/grain), centre rail declined (kept: one-pixel rule precision).

THESIS: Money owed is the loudest thing on the page, marked the way a crew lead marks a printed rundown — with a highlighter. Refuses the category default of a grey SaaS table with KPI cards and coloured status pills.

OWN-WORLD: Cool white desk ground with white sheets (rounded, soft shadow), near-black ink, hairline rules. Inter (same face as the public website, per Rama 26 Nov) — heavy 800 with tight tracking and tabular figures for date slabs, cue numbers, and money; regular weights for UI. Highlighter inks as the only state colours, flat, multiply: kuning = uang belum masuk, hijau = lunas, biru = menunggu klien, pink = batal/terlambat. Tetra red only for "live": the NOW cue line and the primary action.

STORY: Open → instantly read "Belum masuk Rp X" swiped in yellow, then the rundown of invoices to chase ranked by due date, then everything else. Detail = the document as a sheet with header boxes like a rundown header; payments as cue rows.

FIRST VIEWPORT: Shell (logo, tabs Karya/Dokumen/Jadwal/Paket, user) → owed-money headline with highlighter swipe + count → "Perlu ditagih" rundown rows (cue · date slab · client/event · sisa) → actions + Quotation / Invoice.

SIGNATURE: The highlighter swipe — an irregular-edged flat ink band drawn left→right once (0.45 s) behind owed amounts and status words; turns green when settled. Jadwal: a red NOW cue line across today's position in the rundown.

RISK: Highlighter could read as decoration if spread; it must mark state only, never headings or chrome.
