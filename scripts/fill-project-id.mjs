// Menyalin projectId dari .vercel/project.json ke .github/workflows/deploy.yml.
// Jalankan setelah `npx vercel link`. Tujuannya supaya tidak perlu menyalin
// ID panjang secara manual dan salah ketik.
import fs from 'node:fs';

const CONF = '.vercel/project.json';
const WF = '.github/workflows/deploy.yml';

if (!fs.existsSync(CONF)) {
  console.error(`Belum ada ${CONF}.\nJalankan dulu:  npx vercel link`);
  process.exit(1);
}

const { projectId, orgId, projectName } = JSON.parse(fs.readFileSync(CONF, 'utf8'));
let wf = fs.readFileSync(WF, 'utf8');

const before = wf;
wf = wf.replace(/VERCEL_PROJECT_ID:.*/, `VERCEL_PROJECT_ID: ${projectId}`);
wf = wf.replace(/VERCEL_ORG_ID:.*/, `VERCEL_ORG_ID: ${orgId} # team visualtetra-9970`);

if (wf === before) {
  console.log('Tidak ada yang berubah — sepertinya ID sudah terisi.');
} else {
  fs.writeFileSync(WF, wf);
  console.log(`Project  : ${projectName}`);
  console.log(`Project ID terisi ke ${WF}`);
  console.log(`Org ID   : ${orgId}`);
  console.log('\nLangkah berikutnya:');
  console.log('  git add -A && git commit -m "Isi Vercel project ID" && git push');
}
