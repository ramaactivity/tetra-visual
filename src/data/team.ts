// Tim Tetra Visual. Urutan = urutan tampil di halaman Tentang.
// `role` = peran utama (satu baris), `skills` = keahlian. Semua anggota bisa memegang
// kamera & editing dan bertugas sebagai kru di hari acara.

export interface Member {
  name: string;
  role: string;
  skills: string[];
  founder?: boolean;
}

export const team: Member[] = [
  { name: 'Ramadan Saputra', role: 'Founder & Director', skills: ['Videografi', 'Bisnis', 'Marketing'], founder: true },
  { name: 'Muhamad Iqbal', role: 'Founder & Head of Post-Production', skills: ['Editing Video', 'Desain Grafis', 'Media Sosial'], founder: true },
  { name: 'Arief Rohman', role: 'Photographer & Drone Pilot', skills: ['Fotografi', 'Videografi', 'Pilot Drone'] },
  { name: 'Maulana Wahab Walfajri', role: 'Photographer & Videographer', skills: ['Fotografi', 'Videografi'] },
  { name: 'Priambada Bowo', role: 'Videographer & Motion Designer', skills: ['Videografi', 'Animasi', 'Desain Grafis'] },
  { name: 'Farhan Mauludi', role: 'Photographer & Lighting', skills: ['Fotografi', 'Gaffer (Tata Cahaya)', 'Live Streaming'] },
  { name: 'Muhamad Lutpi Nurpadilah', role: 'Video Editor & Videographer', skills: ['Editing Video', 'Videografi'] },
];

export const founders = team.filter((m) => m.founder);
