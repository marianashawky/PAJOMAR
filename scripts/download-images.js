#!/usr/bin/env node
/**
 * Download 10 high-res photos per folder from curated free stock URLs.
 * Usage: node scripts/download-images.js
 */
'use strict';

const fs = require('fs');
const path = require('path');
const https = require('https');
const { urlsForFolder } = require('./image-pool.js');

const ROOT = path.join(__dirname, '..');
const IMAGES_DIR = path.join(ROOT, 'assets', 'images');
const PER_FOLDER = 10;
const UA = 'PAJOMAR-ImageDownloader/1.0';

const FOLDERS = [
  'hero', 'sheer', 'blackout', 'decorative', 'classic', 'modern',
  'custom', 'white', 'bedroom', 'living', 'dining', 'office'
];

function get(url, attempt = 1) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': UA } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const next = res.headers.location.startsWith('http')
          ? res.headers.location
          : new URL(res.headers.location, url).href;
        return get(next, attempt).then(resolve, reject);
      }
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', async () => {
        if (res.statusCode === 429 && attempt <= 4) {
          await sleep(3000 * attempt);
          return get(url, attempt + 1).then(resolve, reject);
        }
        if (res.statusCode >= 400) reject(new Error(`HTTP ${res.statusCode}`));
        else resolve(Buffer.concat(chunks));
      });
    }).on('error', reject);
  });
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fillFolder(folder) {
  const dir = path.join(IMAGES_DIR, folder);
  fs.mkdirSync(dir, { recursive: true });

  const existing = fs.readdirSync(dir).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));
  if (existing.length >= PER_FOLDER) {
    console.log(`  skip ${folder} (${existing.length} already)`);
    return;
  }

  const urls = urlsForFolder(folder, PER_FOLDER);
  let n = existing.length;

  for (const url of urls) {
    if (n >= PER_FOLDER) break;
    n++;
    const ext = '.jpg';
    const filename = `${String(n).padStart(2, '0')}${ext}`;
    const dest = path.join(dir, filename);
    if (fs.existsSync(dest)) continue;

    try {
      process.stdout.write(`  ${folder}/${filename} ... `);
      const buf = await get(url);
      if (buf.length < 30000) throw new Error('too small');
      fs.writeFileSync(dest, buf);
      console.log(`${Math.round(buf.length / 1024)} KB`);
    } catch (err) {
      console.log(`fail (${err.message})`);
      n--;
    }
    await sleep(600);
  }

  const total = fs.readdirSync(dir).filter((f) => /\.(jpe?g|png|webp)$/i.test(f)).length;
  if (total < PER_FOLDER) console.warn(`  ! ${folder}: ${total}/${PER_FOLDER}`);
}

async function main() {
  console.log(`Downloading ${PER_FOLDER} curated 4K photos × ${FOLDERS.length} folders\n`);

  for (const folder of FOLDERS) {
    console.log(`[${folder}]`);
    await fillFolder(folder);
  }

  console.log('\nSyncing manifest...');
  require('./sync-images.js');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
