/* PAJOMAR — Catalog & filters driven only by assets/images folders
   Add photos to a folder, then run: node scripts/sync-images.js
   See assets/images/README.txt */

const FOLDER_LABELS = {
  sheer: 'Sheer',
  blackout: 'Blackout',
  classic: 'Classic',
  modern: 'Modern',
  decorative: 'Decorative',
  living: 'Living',
  bedroom: 'Bedroom',
  dining: 'Dining',
  office: 'Office',
  reception: 'Reception',
  'shutter-roller': 'Roller',
  'shutter-zebra': 'Zebra',
  'shutter-wood': 'Wood',
  'shutter-blackout': 'Blackout',
  'shutter-vertical': 'Vertical',
  'custom-pinch': 'Pinch pleat',
  'custom-wave': 'Wavy',
  'custom-eyelet': 'Eyelet',
  'custom-roman': 'Roman',
  'custom-plain': 'Plain',
  'acc-rods': 'Rods',
  'acc-tracks': 'Tracks',
  'acc-tiebacks': 'Tiebacks',
  'acc-rings': 'Rings',
  'acc-finials': 'Finials'
};

/** Folders used only for homepage / slideshow — not in catalog filters */
const SKIP_FOLDERS = new Set([
  'hero',
  'صور تسويق',
  'window-view',
  'curtains',
  'white',
  'custom',
  'custom-living',
  'custom-bedroom',
  'custom-dining',
  'custom-office',
  'dept-curtains',
  'dept-shutters',
  'dept-custom',
  'dept-accessories'
]);

const DEPT_PAGES = {
  curtains: 'curtains.html',
  shutters: 'shutters.html',
  custom: 'custom.html',
  accessories: 'accessories.html'
};

/** Curtain shop: 5 type lookbooks + 5 room lookbooks */
const CURTAIN_TYPE_FOLDERS = new Set([
  'sheer',
  'blackout',
  'classic',
  'modern',
  'decorative',
  'bedroom',
  'living',
  'dining',
  'office',
  'reception'
]);

const CURTAIN_FOLDER_ORDER = [
  'sheer',
  'blackout',
  'classic',
  'modern',
  'decorative',
  'bedroom',
  'living',
  'dining',
  'office',
  'reception'
];

function folderDepartment(folder) {
  if (SKIP_FOLDERS.has(folder)) return '';
  if (CURTAIN_TYPE_FOLDERS.has(folder)) return 'curtains';
  if (String(folder).startsWith('shutter-')) return 'shutters';
  if (String(folder).startsWith('acc-')) return 'accessories';
  if (folder === 'custom') return '';
  if (String(folder).startsWith('custom-')) return 'custom';
  if (String(folder).startsWith('dept-')) return '';
  return '';
}

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

function catalogFolders(dept) {
  const folders = ImageLib.categoryFolders().filter((name) => {
    const department = folderDepartment(name);
    if (!department) return false;
    if (dept) return department === dept;
    return true;
  });
  if (dept === 'curtains') {
    return CURTAIN_FOLDER_ORDER.filter((name) => folders.includes(name)).concat(
      folders.filter((name) => !CURTAIN_FOLDER_ORDER.includes(name))
    );
  }
  return folders;
}

function mapFolderRecords(folders) {
  return folders.map((folder) => ({
    id: folder,
    slug: folder,
    name: folderLabel(folder),
    folder,
    department: folderDepartment(folder),
    image: ImageLib.url(folder),
    gallery: ImageLib.getAll(folder),
    count: ImageLib.files(folder).length
  }));
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
  whatsapp: '201044669188',
  company: {
    name: 'Pajomar Curtains and Shutters',
    cr: '288830',
    tax: '337-045-774',
    phones: ['01211925591', '01044669188'],
    email: 'Patgo.curtains@gmail.com',
    owner: 'أبانوب عادل صبحي رزق',
    social: {
      instagram: 'https://www.instagram.com/pajomar.curtains',
      snapchat: 'https://snapchat.com/t/sXEpo5Mn',
      facebook: 'https://www.facebook.com/share/14oaKi6oQ65/?mibextid=wwXIfr',
      tiktok: 'https://www.tiktok.com/@patgocurtains'
    }
  },
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

function customHeadingRecords() {
  const looks = [
    ['custom-pinch', 'assets/custom-pinch.jpg'],
    ['custom-wave', 'assets/custom-wave.jpg'],
    ['custom-eyelet', 'assets/custom-eyelet.jpg'],
    ['custom-roman', 'assets/custom-roman.jpg'],
    ['custom-plain', 'assets/custom-plain.jpg']
  ];
  return looks.map(([folder, fallback]) => {
    const gallery = ImageLib.has(folder) ? ImageLib.getAll(folder) : (fallback ? [fallback] : []);
    return {
      id: folder,
      slug: folder,
      name: folderLabel(folder),
      folder,
      department: 'custom',
      image: gallery[0] || fallback,
      gallery,
      count: gallery.length
    };
  });
}

PAJOMAR.departments = {
  curtains: mapFolderRecords(catalogFolders('curtains')),
  shutters: mapFolderRecords(catalogFolders('shutters')),
  custom: customHeadingRecords(),
  accessories: mapFolderRecords(catalogFolders('accessories'))
};

PAJOMAR.deptCovers = {
  curtains: ImageLib.url('modern', 3) || ImageLib.url('sheer', 1) || ImageLib.url('sheer'),
  shutters: ImageLib.url('shutter-vertical'),
  custom: ImageLib.url('custom-pinch'),
  accessories: ImageLib.url('acc-rods')
};

PAJOMAR.folders = PAJOMAR.departments.curtains;
PAJOMAR.allFolders = [
  ...PAJOMAR.departments.curtains,
  ...PAJOMAR.departments.shutters,
  ...PAJOMAR.departments.custom,
  ...PAJOMAR.departments.accessories
];

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
PAJOMAR.products = PAJOMAR.allFolders.map((f) => buildFolderProduct(f.folder));

PAJOMAR.heroSlides = [
  ImageLib.url('living', 0),
  ImageLib.url('bedroom', 0),
  ImageLib.url('sheer', 0),
  ImageLib.url('modern', 0),
  ImageLib.url('dining', 0),
  ImageLib.url('blackout', 0),
  ImageLib.url('classic', 0),
  ImageLib.url('reception', 0)
].filter((src, i, arr) => src && !src.includes('_fallback') && arr.indexOf(src) === i);
if (!PAJOMAR.heroSlides.length) {
  PAJOMAR.heroSlides = catalogFolders('curtains').flatMap((folder) => ImageLib.getAll(folder));
}

PAJOMAR.homeMarketingFolder = HOME_MARKETING_FOLDER;
/* مختارات — from assets/images/صور تسويق */
PAJOMAR.homeMarketing = (() => {
  const hero = new Set(PAJOMAR.heroSlides || []);
  const fromFolder = ImageLib.has(HOME_MARKETING_FOLDER)
    ? ImageLib.getAll(HOME_MARKETING_FOLDER)
    : [];
  const out = [];
  fromFolder.forEach((src) => {
    if (!src || src.includes('_fallback') || hero.has(src) || out.includes(src)) return;
    out.push(src);
  });
  return out.slice(0, HOME_MARKETING_LIMIT);
})();

function listingFromProducts(products) {
  return products.flatMap((product) =>
    (product.gallery.length ? product.gallery : [product.image]).map((url, index) => ({
      ...product,
      id: `${product.id}-${String(index + 1).padStart(2, '0')}`,
      folderId: product.id,
      department: folderDepartment(product.id),
      name: `${product.name} ${index + 1}`,
      image: url,
      imageSecondary: product.gallery[(index + 1) % product.gallery.length] || url,
      galleryIndex: index
    }))
  );
}

/** Flat list of every image across folders (for listing grid) */
PAJOMAR.listingItems = listingFromProducts(PAJOMAR.products);
PAJOMAR.listingByDept = {
  curtains: PAJOMAR.listingItems.filter((item) => item.department === 'curtains'),
  shutters: PAJOMAR.listingItems.filter((item) => item.department === 'shutters'),
  custom: PAJOMAR.listingItems.filter((item) => item.department === 'custom'),
  accessories: PAJOMAR.listingItems.filter((item) => item.department === 'accessories')
};
