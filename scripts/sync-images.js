#!/usr/bin/env node
/**
 * PAJOMAR — Image folder scanner
 *
 * Scans assets/images/ and writes js/images-manifest.js automatically.
 * Copy this script to any project — same folder layout works everywhere.
 *
 * Usage: node scripts/sync-images.js
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const IMAGES_DIR = path.join(ROOT, 'assets', 'images');
const OUT_JS = path.join(ROOT, 'js', 'images-manifest.js');
const IMAGE_EXT = /\.(jpe?g|png|webp|gif|avif)$/i;

const DEFAULT_FOLDERS = [
  'hero',
  'صور تسويق',
  'sheer',
  'blackout',
  'decorative',
  'classic',
  'modern',
  'custom',
  'white',
  'bedroom',
  'living',
  'dining',
  'office'
];

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function listImages(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter((f) => IMAGE_EXT.test(f))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

function migrateFlatImages() {
  for (const file of fs.readdirSync(IMAGES_DIR)) {
    if (!IMAGE_EXT.test(file)) continue;
    const stem = path.parse(file).name;
    const targetDir = path.join(IMAGES_DIR, stem);
    ensureDir(targetDir);
    const src = path.join(IMAGES_DIR, file);
    const dest = path.join(targetDir, file);
    if (!fs.existsSync(dest)) fs.renameSync(src, dest);
  }
}

function scanImages() {
  ensureDir(IMAGES_DIR);
  DEFAULT_FOLDERS.forEach((name) => ensureDir(path.join(IMAGES_DIR, name)));

  const productsDir = path.join(IMAGES_DIR, 'products');
  ensureDir(productsDir);

  migrateFlatImages();

  const manifest = {};

  for (const entry of fs.readdirSync(IMAGES_DIR, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name === 'products') continue;
    const files = listImages(path.join(IMAGES_DIR, entry.name));
    if (files.length) manifest[entry.name] = files;
  }

  for (const entry of fs.readdirSync(productsDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const key = `products/${entry.name}`;
    const files = listImages(path.join(productsDir, entry.name));
    if (files.length) manifest[key] = files;
  }

  return manifest;
}

const manifest = scanImages();
const js = `/* AUTO-GENERATED — do not edit manually.
   Add images to assets/images/<folder-name>/ then run:
   node scripts/sync-images.js */
const IMAGE_MANIFEST = ${JSON.stringify(manifest, null, 2)};
`;

fs.writeFileSync(OUT_JS, js, 'utf8');

const total = Object.values(manifest).reduce((n, files) => n + files.length, 0);
console.log(`✓ ${Object.keys(manifest).length} folders, ${total} images → js/images-manifest.js`);
