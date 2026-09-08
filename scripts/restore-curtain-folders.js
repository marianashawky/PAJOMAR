#!/usr/bin/env node
/**
 * Curtains shop: 10 folders (5 types + 5 rooms) × 4 unique photos with visible curtains.
 * Usage: node scripts/restore-curtain-folders.js
 */
'use strict';

const fs = require('fs');
const path = require('path');
const https = require('https');

const ROOT = path.join(__dirname, '..');
const IMAGES_DIR = path.join(ROOT, 'assets', 'images');
const ASSETS = path.join(ROOT, 'assets');
const PER_FOLDER = 4;
const UA = 'PAJOMAR-CurtainRestore/1.0';

function pexels(id) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=2400`;
}

/**
 * 10 lookbooks — every Pexels ID unique across all folders.
 * Chosen to match folder meaning + visible fabric curtains.
 */
const FOLDERS = {
  sheer: [4915532, 35494095, 5712827, 29623050],
  blackout: [8238770, 4389917, 17918540, 17092242],
  classic: [31588111, 5716703, 1648771, 27110671],
  modern: [36693207, 19899070, 6782480, 7340487],
  decorative: [31167225, 8959008, 37331166, 36547498],
  bedroom: [31267713, 29623051, 7587750, 6585759],
  living: [20360852, 29012628, 1571463, 7214337],
  dining: [18536232, 1643384, 1571460, 1457842],
  office: [37609127, 1957477, 11163177, 271624],
  reception: [1571453, 1648776, 1457847, 1571459]
};

/** Local seeds that already show fabric curtains in the right room */
const LOCAL_SEEDS = {
  bedroom: path.join(ASSETS, 'room-bedroom.jpg'),
  living: path.join(ASSETS, 'room-living.jpg'),
  dining: path.join(ASSETS, 'room-dining.jpg'),
  office: path.join(ASSETS, 'room-office.jpg')
};

/** Non-catalog leftovers to clear */
const RETIRE = ['curtains', 'white', 'kids', 'guest', 'kitchen'];

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
          await sleep(2500 * attempt);
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

function clearImages(dir) {
  if (!fs.existsSync(dir)) return;
  for (const file of fs.readdirSync(dir)) {
    if (/\.(jpe?g|png|webp|gif|avif)$/i.test(file)) {
      fs.unlinkSync(path.join(dir, file));
    }
  }
}

async function fillFolder(folder, ids) {
  const dir = path.join(IMAGES_DIR, folder);
  fs.mkdirSync(dir, { recursive: true });
  clearImages(dir);

  console.log(`[${folder}]`);
  let n = 0;

  const seed = LOCAL_SEEDS[folder];
  if (seed && fs.existsSync(seed)) {
    n++;
    const filename = `${String(n).padStart(2, '0')}.jpg`;
    fs.copyFileSync(seed, path.join(dir, filename));
    console.log(`  ${filename} (local seed)`);
  }

  for (const id of ids) {
    if (n >= PER_FOLDER) break;
    n++;
    const filename = `${String(n).padStart(2, '0')}.jpg`;
    const dest = path.join(dir, filename);
    try {
      process.stdout.write(`  ${filename} (${id}) ... `);
      const buf = await get(pexels(id));
      if (buf.length < 20000) throw new Error('too small');
      fs.writeFileSync(dest, buf);
      console.log(`${Math.round(buf.length / 1024)} KB`);
    } catch (err) {
      console.log(`FAIL ${err.message}`);
      n--;
    }
    await sleep(350);
  }
  const total = fs.readdirSync(dir).filter((f) => /\.(jpe?g|png|webp)$/i.test(f)).length;
  console.log(`  → ${total}/${PER_FOLDER}\n`);
}

async function main() {
  const allIds = Object.values(FOLDERS).flat();
  const dup = allIds.filter((id, i) => allIds.indexOf(id) !== i);
  if (dup.length) {
    console.error('Duplicate IDs across folders:', dup);
    process.exit(1);
  }

  console.log('Clearing non-catalog leftovers…');
  for (const folder of RETIRE) {
    const dir = path.join(IMAGES_DIR, folder);
    if (fs.existsSync(dir)) {
      clearImages(dir);
      console.log(`  cleared ${folder}`);
    }
  }

  console.log(`\nDownloading 10 curtain lookbooks × ${PER_FOLDER} unique photos\n`);
  for (const [folder, ids] of Object.entries(FOLDERS)) {
    await fillFolder(folder, ids);
  }

  console.log('Syncing manifest…');
  require('./sync-images.js');
  console.log('Done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
