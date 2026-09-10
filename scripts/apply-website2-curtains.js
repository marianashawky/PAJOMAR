#!/usr/bin/env node
/**
 * Apply curtain photos from assets/images/ويب سايت 2/<Arabic folder>
 * into the English catalog folders the site uses.
 *
 * Usage: node scripts/apply-website2-curtains.js && npm run sync
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', 'assets', 'images');
const SRC = path.join(ROOT, 'ويب سايت 2');
const MEDIA = /\.(jpe?g|png|webp|gif|avif|mp4|webm|mov|m4v)$/i;

const MAP = {
  'شفاف': 'sheer',
  'تعتيم': 'blackout',
  'كلاسيك': 'classic',
  'عصري': 'modern',
  'زخرفي': 'decorative',
  'غرف نوم': 'bedroom',
  'غرف معيشة': 'living',
  'غرف طعام': 'dining',
  'المكتب': 'office',
  'ابيض': 'white',
  'مخصص': 'bespoke'
};

function listMedia(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter((f) => MEDIA.test(f))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

function clearMedia(dir) {
  if (!fs.existsSync(dir)) return 0;
  let n = 0;
  for (const f of fs.readdirSync(dir)) {
    if (!MEDIA.test(f)) continue;
    fs.unlinkSync(path.join(dir, f));
    n += 1;
  }
  return n;
}

function copyFolder(srcName, destName) {
  const src = path.join(SRC, srcName);
  const dest = path.join(ROOT, destName);
  if (!fs.existsSync(src)) {
    console.log('SKIP missing source:', srcName);
    return;
  }
  fs.mkdirSync(dest, { recursive: true });
  const removed = clearMedia(dest);
  const files = listMedia(src);
  files.forEach((file, i) => {
    const ext = path.extname(file).toLowerCase() || '.jpg';
    const destFile = String(i + 1).padStart(2, '0') + ext;
    fs.copyFileSync(path.join(src, file), path.join(dest, destFile));
  });
  console.log(`${srcName} → ${destName}: ${files.length} copied, ${removed} old removed`);
}

if (!fs.existsSync(SRC)) {
  console.error('Missing folder:', SRC);
  process.exit(1);
}

const reception = path.join(ROOT, 'reception');
if (fs.existsSync(reception)) {
  console.log('reception: cleared', clearMedia(reception), 'old files');
}

Object.entries(MAP).forEach(([ar, en]) => copyFolder(ar, en));
console.log('Done. Run: npm run sync');
