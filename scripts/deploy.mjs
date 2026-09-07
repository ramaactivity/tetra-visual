#!/usr/bin/env node
// Auto deploy script for Tetra Visual
// Usage: npm run deploy (or: node scripts/deploy.mjs)

import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = resolve(__dirname, '..');

function run(cmd, opts = {}) {
  console.log(`\n▶ ${cmd}`);
  try {
    execSync(cmd, {
      cwd: rootDir,
      stdio: 'inherit',
      ...opts
    });
    return true;
  } catch (e) {
    console.error(`\n✖ Command failed: ${cmd}`);
    return false;
  }
}

async function main() {
  console.log('═══════════════════════════════════════');
  console.log('  Tetra Visual — Auto Deploy');
  console.log('═══════════════════════════════════════\n');

  // Check if .vercel/project.json exists (project linked)
  const vercelConfig = resolve(rootDir, '.vercel/project.json');
  if (!existsSync(vercelConfig)) {
    console.error('✖ Project not linked to Vercel.');
    console.log('  Run: npx vercel link');
    console.log('  Then follow prompts to link to team "visualtetra-9970" and project "tetra-visual"');
    process.exit(1);
  }

  // Check if VERCEL_TOKEN is available
  if (!process.env.VERCEL_TOKEN) {
    console.error('✖ VERCEL_TOKEN environment variable not set.');
    console.log('  Option 1: Export it in terminal:');
    console.log('    export VERCEL_TOKEN="your-token-here"');
    console.log('  Option 2: Add to .env.local (not committed)');
    console.log('  Option 3: Use GitHub Actions (push to main)');
    process.exit(1);
  }

  console.log('📦 Building project...');
  if (!run('npm run build')) {
    process.exit(1);
  }

  console.log('\n🚀 Deploying to Vercel (Production)...');
  if (!run('npx vercel deploy --prod --token=$VERCEL_TOKEN')) {
    process.exit(1);
  }

  console.log('\n✅ Deploy completed!');
  console.log('   Check: https://visual.tetraphoto.com');
}

main();