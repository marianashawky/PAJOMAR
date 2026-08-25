/* PAJOMAR — Folder-based image library
   Each folder under assets/images/ is a collection.
   Use curtainImg('folder') or curtainImg('folder', 1) for the 2nd photo. */
(function (global) {
  'use strict';

  const IMAGE_DIR = 'assets/images';
  const FALLBACK = `${IMAGE_DIR}/_fallback.svg`;

  const ImageLib = {
    dir: IMAGE_DIR,
    manifest: typeof IMAGE_MANIFEST !== 'undefined' ? IMAGE_MANIFEST : {},

    files(folder) {
      return this.manifest[folder] || [];
    },

    has(folder) {
      return this.files(folder).length > 0;
    },

    folders() {
      return Object.keys(this.manifest).sort();
    },

    url(folder, index = 0) {
      const files = this.files(folder);
      if (!files.length) return FALLBACK;
      const file = files[index] ?? files[files.length - 1];
      const folderPath = String(folder).split('/').map(encodeURIComponent).join('/');
      return `${IMAGE_DIR}/${folderPath}/${encodeURIComponent(file)}`;
    },

    getAll(folder) {
      if (!folder) return [];
      return this.files(folder).map((_, index) => this.url(folder, index));
    },

    /** Merge all images from multiple folders (deduped, in order) */
    mergeFolders(...folders) {
      const seen = new Set();
      const out = [];
      for (const folder of folders) {
        for (const url of this.getAll(folder)) {
          if (seen.has(url)) continue;
          seen.add(url);
          out.push(url);
        }
      }
      return out;
    },

    /** Top-level image folders (excludes products/* and empty folders) */
    categoryFolders() {
      return this.folders().filter((name) => !name.startsWith('products/') && this.has(name));
    },

    /** Product gallery: products/<id> first, else all photos from category folders */
    productGallery(productId, categoryFolder, secondaryFolder) {
      const productKey = `products/${productId}`;
      if (this.has(productKey)) return this.getAll(productKey);
      return this.mergeFolders(categoryFolder, secondaryFolder);
    }
  };

  function curtainImg(folder, index = 0) {
    return ImageLib.url(folder, index);
  }

  global.ImageLib = ImageLib;
  global.curtainImg = curtainImg;
  global.IMAGE_DIR = IMAGE_DIR;
})(typeof window !== 'undefined' ? window : global);
