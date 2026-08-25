/* PAJOMAR — Catalog & filters driven only by assets/images folders
   Add photos to a folder, then run: node scripts/sync-images.js
   See assets/images/README.txt */

const FOLDER_LABELS = {
  sheer: 'Sheer',
  blackout: 'Blackout',
  decorative: 'Decorative',
  classic: 'Classic',
  modern: 'Modern',
  custom: 'Custom',
  white: 'White',
  bedroom: 'Bedroom',
  living: 'Living Room',
  dining: 'Dining Room',
  office: 'Office',
  hero: 'Hero',
  'صور تسويق': 'Marketing'
};

/** Folders used only for homepage / slideshow — not in catalog filters */
const SKIP_FOLDERS = new Set(['hero', 'صور تسويق']);

/** Homepage first section: exactly 3 images from this folder */
const HOME_MARKETING_FOLDER = 'صور تسويق';
const HOME_MARKETING_LIMIT = 4;

function folderLabel(folder) {
  if (FOLDER_LABELS[folder]) return FOLDER_LABELS[folder];
  return folder
    .split(/[-_/]/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

/** All image folders that actually have photos (except slideshow-only hero) */
function catalogFolders() {
  return ImageLib.categoryFolders().filter((name) => !SKIP_FOLDERS.has(name));
}

function buildFolderProduct(folder) {
  const gallery = ImageLib.getAll(folder);
  const name = folderLabel(folder);
  return {
    id: folder,
    name,
    collection: name,
    fabric: name,
    color: '',
    colors: [],
    type: name,
    style: '',
    room: '',
    lightControl: '',
    texture: '',
    price: null,
    imageFolder: folder,
    description: '',
    specs: {},
    featured: true,
    popular: true,
    newest: true,
    image: gallery[0] || curtainImg(folder),
    imageSecondary: gallery[1] || gallery[0] || curtainImg(folder),
    gallery
  };
}

const PAJOMAR = {
  whatsapp: 'WHATSAPP_NUMBER',
  img: curtainImg,
  imageDir: IMAGE_DIR,
  heroSlides: [],
  folders: [],
  curtainTypes: [],
  rooms: [],
  styles: [],
  fabrics: [],
  collections: [],
  products: []
};

PAJOMAR.folders = catalogFolders().map((folder) => ({
  id: folder,
  slug: folder,
  name: folderLabel(folder),
  folder,
  image: ImageLib.url(folder),
  gallery: ImageLib.getAll(folder),
  count: ImageLib.files(folder).length
}));

PAJOMAR.curtainTypes = PAJOMAR.folders.map((f) => ({
  name: f.name,
  slug: f.slug,
  folder: f.folder,
  filter: f.folder,
  image: f.image
}));

PAJOMAR.rooms = [];
PAJOMAR.styles = [];

PAJOMAR.fabrics = PAJOMAR.folders.map((f) => ({
  id: f.folder,
  name: f.name,
  texture: '',
  description: '',
  imageFolder: f.folder,
  image: f.image,
  colors: []
}));

PAJOMAR.collections = PAJOMAR.folders.map((f) => ({
  id: f.folder,
  name: f.name,
  tagline: '',
  imageFolder: f.folder,
  image: f.image,
  description: ''
}));

/* One product per image folder — gallery = every photo in that folder */
PAJOMAR.products = PAJOMAR.folders.map((f) => buildFolderProduct(f.folder));

PAJOMAR.heroSlides = ImageLib.getAll('hero');
if (!PAJOMAR.heroSlides.length) {
  PAJOMAR.heroSlides = catalogFolders().flatMap((folder) => ImageLib.getAll(folder));
}

/** Resolve marketing folder even if the name varies slightly */
function resolveMarketingFolder() {
  if (ImageLib.has(HOME_MARKETING_FOLDER)) return HOME_MARKETING_FOLDER;
  const match = ImageLib.folders().find((name) =>
    name === HOME_MARKETING_FOLDER ||
    name.replace(/\s+/g, '') === 'صورتسويق' ||
    /تسويق|marketing/i.test(name)
  );
  return match || HOME_MARKETING_FOLDER;
}

PAJOMAR.homeMarketingFolder = resolveMarketingFolder();
PAJOMAR.homeMarketing = (function pickHomeMarketing() {
  const folder = PAJOMAR.homeMarketingFolder;
  const files = ImageLib.files(folder);
  if (!files.length) return [];
  /* Prefer uploaded marketing assets over generic 01.jpg placeholders */
  const preferred = files.filter((f) => !/^\d{2}\.(jpe?g|png)$/i.test(f));
  const numbered = files.filter((f) => /^\d{2}\.(jpe?g|png)$/i.test(f));
  const chosen = [...preferred, ...numbered].slice(0, HOME_MARKETING_LIMIT);
  return chosen.map((file) => ImageLib.url(folder, files.indexOf(file)));
})();

/** Flat list of every image across folders (for listing grid) */
PAJOMAR.listingItems = PAJOMAR.products.flatMap((product) =>
  (product.gallery.length ? product.gallery : [product.image]).map((url, index) => ({
    ...product,
    id: `${product.id}-${String(index + 1).padStart(2, '0')}`,
    folderId: product.id,
    name: `${product.name} ${index + 1}`,
    image: url,
    imageSecondary: product.gallery[(index + 1) % product.gallery.length] || url,
    galleryIndex: index
  }))
);
