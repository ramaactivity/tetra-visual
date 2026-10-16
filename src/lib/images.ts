import type { ImageMetadata } from 'astro';

// Foto & cover karya kini dimuat di src/data/work.ts. Di sini tinggal logo klien.
const clientMods = import.meta.glob<{ default: ImageMetadata }>('/src/assets/clients/*.png', { eager: true });

// Nama merek per file logo — dipakai sebagai alt text (dibaca Google & pembaca layar).
// Menambah logo: simpan client-NN.png lalu tambahkan namanya di sini.
const CLIENT_NAMES: Record<string, string> = {
  'client-01.png': 'Sejiwa',
  'client-02.png': 'TikTok',
  'client-03.png': 'United Tractors',
  'client-04.png': 'Asuransi Astra',
  'client-05.png': 'SeaBank',
  'client-06.png': 'Bank Raya',
  'client-07.png': 'Danantara Indonesia',
  'client-08.png': 'Patria Maritime Lines',
  'client-09.png': 'BAZNAS Jakarta Timur',
  'client-10.png': 'Pelindo',
  'client-11.png': 'Kanwil Kementerian Agama Provinsi DKI Jakarta',
  'client-12.png': 'Bank Indonesia',
  'client-13.png': 'Blibli.com',
  'client-14.png': 'Samsung',
  'client-15.png': 'Poly',
  'client-16.png': 'Bogor Runners',
  'client-17.png': 'Dinas Pariwisata dan Kebudayaan Kota Bogor',
  'client-18.png': 'Eiger',
  'client-19.png': 'Es Teh Indonesia',
  'client-20.png': 'Gojek',
  'client-21.png': 'Grab',
  'client-22.png': 'Kahf',
  'client-23.png': 'Kementerian Kesehatan Republik Indonesia',
  'client-24.png': 'Kementerian Perindustrian Republik Indonesia',
  'client-25.png': 'The World Bank',
  'client-26.png': 'Under Armour',
  'client-27.png': 'Pertamina Hulu Energi',
  'client-28.png': 'PLN Peduli',
  'client-29.png': 'Universitas Indonesia',
};

export interface ClientLogo {
  img: ImageMetadata;
  name: string;
}

export const clientLogos: ClientLogo[] = Object.keys(clientMods)
  .sort()
  .map((p) => ({ img: clientMods[p]!.default, name: CLIENT_NAMES[p.split('/').pop()!] ?? 'Klien Tetra Visual' }));
