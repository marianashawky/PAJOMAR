#!/usr/bin/env node
/**
 * Watch assets/images/ and re-run sync-images.js on add/remove/change.
 * Usage: npm run sync:watch
 */
'use strict';

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const ROOT = path.join(__dirname, '..');
const IMAGES_DIR = path.join(ROOT, 'assets', 'images');
const SYNC = path.join(__dirname, 'sync-images.js');

let timer = null;
let running = false;
let queued = false;

function runSync() {
  if (running) {
    queued = true;
    return;
  }
  running = true;
  const child = spawn(process.execPath, [SYNC], {
    cwd: ROOT,
    stdio: 'inherit'
  });
  child.on('exit', () => {
    running = false;
    if (queued) {
      queued = false;
      runSync();
    }
  });
}

function schedule() {
  clearTimeout(timer);
  timer = setTimeout(runSync, 400);
}

if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

console.log('Watching assets/images/ — add or delete photos anytime.');
console.log('Press Ctrl+C to stop.\n');
runSync();

try {
  fs.watch(IMAGES_DIR, { recursive: true }, (eventType, filename) => {
    if (!filename) {
      schedule();
      return;
    }
    const base = path.basename(filename);
    if (base.startsWith('.') || base === 'README.txt') return;
    schedule();
  });
} catch (err) {
  console.error('Could not start recursive watch:', err.message);
  console.error('Falling back to one-shot sync only. Use: npm run sync');
  process.exit(1);
}
