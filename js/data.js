/* PAJOMAR — Catalog & filters driven only by assets/images folders
   Add or remove photos in a folder, then run: npm run sync
   Watch while editing: npm run sync:watch
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
  white: 'White',
  bespoke: 'Bespoke',
  reception: 'Reception',
  'shutter-roller': 'Roller',
  'shutter-zebra': 'Zebra',
  'shutter-wood': 'Wood',
  'shutter-blackout': 'Blackout',
  'shutter-vertical': 'Vertical',
  'شاتر': 'Shutters',
  'شتر': 'Shutters',
  'اكسسوارات': 'Accessories',
  'إكسسوارات': 'Accessories',
  'تكسسورات': 'Accessories',
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
  'custom',
  'custom-living',
  'custom-bedroom',
  'custom-dining',
  'custom-office',
  'dept-curtains',
  'dept-shutters',
  'dept-custom',
  'dept-accessories',
  'مشاريع صغيره',
  'ريفيوهات',
  'ويب سايت 2',
  'reception'
]);

const SMALL_PROJECTS_PREFIX = 'مشاريع صغيره/';
const WEBSITE2_PREFIX = 'ويب سايت 2/';
const SHUTTER_GALLERY_FOLDER = ImageLib.has('شاتر') ? 'شاتر' : (ImageLib.has('شتر') ? 'شتر' : '');
const ACCESSORY_GALLERY_CANDIDATES = ['اكسسوارات', 'إكسسوارات', 'تكسسورات'];
const ACCESSORY_GALLERY_FOLDER = ACCESSORY_GALLERY_CANDIDATES.find((name) => ImageLib.has(name)) || '';

/* Best-looking accessory shots first (studio / clear product photos) */
const ACCESSORY_PRIORITY = [
  'WhatsApp Image 2026-09-01 at 10.40.15 AM (7).jpeg',
  'WhatsApp Image 2026-09-01 at 10.40.14 AM.jpeg',
  'WhatsApp Image 2026-09-01 at 10.40.16 AM (5).jpeg',
  'WhatsApp Image 2026-09-01 at 10.40.14 AM (7).jpeg',
  'WhatsApp Image 2026-09-01 at 10.40.15 AM (1).jpeg',
  'WhatsApp Image 2026-09-01 at 10.40.11 AM (4).jpeg',
  'WhatsApp Image 2026-09-01 at 10.40.16 AM.jpeg',
  'WhatsApp Image 2026-09-01 at 10.40.17 AM.jpeg',
  'WhatsApp Image 2026-09-01 at 10.40.14 AM (4).jpeg',
  'WhatsApp Image 2026-09-01 at 10.40.14 AM (1).jpeg',
  'WhatsApp Image 2026-09-01 at 10.40.15 AM (3).jpeg',
  'WhatsApp Image 2026-09-01 at 10.40.12 AM (6).jpeg',
  'WhatsApp Image 2026-09-01 at 10.40.16 AM (4).jpeg',
  'WhatsApp Image 2026-09-01 at 10.40.12 AM (5).jpeg',
  'WhatsApp Image 2026-09-01 at 10.40.15 AM (5).jpeg',
  'WhatsApp Image 2026-09-01 at 10.40.12 AM.jpeg',
  'WhatsApp Image 2026-09-01 at 10.40.16 AM (6).jpeg',
  'WhatsApp Image 2026-09-01 at 10.40.11 AM (2).jpeg',
  'WhatsApp Image 2026-09-01 at 10.40.13 AM (2).jpeg',
  'WhatsApp Image 2026-09-01 at 10.40.14 AM (2).jpeg',
  'WhatsApp Image 2026-09-01 at 10.40.15 AM (4).jpeg',
  'WhatsApp Image 2026-09-01 at 10.40.15 AM (2).jpeg',
  'WhatsApp Image 2026-09-01 at 10.40.15 AM.jpeg',
  'WhatsApp Image 2026-09-01 at 10.40.11 AM.jpeg',
  'WhatsApp Image 2026-09-01 at 10.40.11 AM (1).jpeg'
];

function sortAccessoryFiles(files) {
  const rank = new Map(ACCESSORY_PRIORITY.map((name, i) => [name, i]));
  return [...files].sort((a, b) => {
    const ra = rank.has(a) ? rank.get(a) : ACCESSORY_PRIORITY.length + 50;
    const rb = rank.has(b) ? rank.get(b) : ACCESSORY_PRIORITY.length + 50;
    if (ra !== rb) return ra - rb;
    return String(a).localeCompare(String(b), undefined, { numeric: true });
  });
}

function mediaUrl(folder, file) {
  const folderPath = String(folder).split('/').map(encodeURIComponent).join('/');
  return `assets/images/${folderPath}/${encodeURIComponent(file)}`;
}

function folderGallery(folder) {
  let files = ImageLib.files(folder).slice();
  if (ACCESSORY_GALLERY_FOLDER && folder === ACCESSORY_GALLERY_FOLDER) {
    files = sortAccessoryFiles(files);
  }
  return files
    .map((file) => mediaUrl(folder, file))
    .filter((url) => url && !url.includes('_fallback'));
}

function folderCover(folder) {
  const gallery = folderGallery(folder);
  return gallery[0] || ImageLib.url(folder);
}

const DEPT_PAGES = {
  curtains: 'curtains.html',
  shutters: 'shutters.html',
  custom: 'custom.html',
  accessories: 'accessories.html'
};

/** Curtain shop lookbooks — sourced from assets/images/ويب سايت 2 */
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
  'white',
  'bespoke'
]);

const CURTAIN_FOLDER_ORDER = [
  'sheer',
  'blackout',
  'classic',
  'modern',
  'decorative',
  'white',
  'bespoke',
  'bedroom',
  'living',
  'dining',
  'office'
];

function folderDepartment(folder) {
  if (SKIP_FOLDERS.has(folder)) return '';
  if (String(folder).startsWith(SMALL_PROJECTS_PREFIX)) return '';
  if (String(folder).startsWith(WEBSITE2_PREFIX) || folder === 'ويب سايت 2') return '';
  if (CURTAIN_TYPE_FOLDERS.has(folder)) return 'curtains';
  /* Old shutter-* lookbooks retired — use شاتر gallery only */
  if (String(folder).startsWith('shutter-')) return '';
  if (folder === 'شاتر' || folder === 'شتر') return 'shutters';
  /* Prefer اكسسوارات gallery; retire old acc-* lookbooks when present */
  if (ACCESSORY_GALLERY_FOLDER && String(folder).startsWith('acc-')) return '';
  if (ACCESSORY_GALLERY_CANDIDATES.includes(folder)) return 'accessories';
  if (String(folder).startsWith('acc-')) return 'accessories';
  if (folder === 'custom') return '';
  if (String(folder).startsWith('custom-')) return 'custom';
  if (String(folder).startsWith('dept-')) return '';
  return '';
}

function projectSiteName(folder) {
  const parts = String(folder).split('/');
  return parts[parts.length - 1] || folder;
}

function buildSmallProjects() {
  return ImageLib.folders()
    .filter((name) => name.startsWith(SMALL_PROJECTS_PREFIX) && ImageLib.has(name))
    .map((folder) => {
      const gallery = ImageLib.getAll(folder);
      const name = projectSiteName(folder);
      return {
        id: folder,
        folder,
        name,
        image: gallery[0] || '',
        gallery,
        count: gallery.length
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name, 'ar'));
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
  return folders.map((folder) => {
    const gallery = folderGallery(folder);
    return {
      id: folder,
      slug: folder,
      name: folderLabel(folder),
      folder,
      department: folderDepartment(folder),
      image: gallery[0] || folderCover(folder),
      gallery,
      count: gallery.length
    };
  });
}

function buildFolderProduct(folder) {
  const gallery = folderGallery(folder);
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
  shutters: SHUTTER_GALLERY_FOLDER
    ? mapFolderRecords([SHUTTER_GALLERY_FOLDER])
    : mapFolderRecords(catalogFolders('shutters')),
  custom: customHeadingRecords(),
  accessories: ACCESSORY_GALLERY_FOLDER
    ? mapFolderRecords([ACCESSORY_GALLERY_FOLDER])
    : mapFolderRecords(catalogFolders('accessories'))
};

PAJOMAR.deptCovers = {
  curtains: ImageLib.url('modern', 3) || ImageLib.url('sheer', 1) || ImageLib.url('sheer'),
  shutters: SHUTTER_GALLERY_FOLDER
    ? ImageLib.url(SHUTTER_GALLERY_FOLDER)
    : ImageLib.url('blackout'),
  custom: ImageLib.url('custom-pinch'),
  accessories: ACCESSORY_GALLERY_FOLDER
    ? folderCover(ACCESSORY_GALLERY_FOLDER)
    : ImageLib.url('decorative')
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
  ImageLib.url('white', 0),
  ImageLib.url('bespoke', 0),
  ImageLib.url('decorative', 0),
  ImageLib.url('office', 0)
].filter((src, i, arr) => src && !src.includes('_fallback') && arr.indexOf(src) === i);
if (!PAJOMAR.heroSlides.length) {
  PAJOMAR.heroSlides = catalogFolders('curtains').flatMap((folder) => ImageLib.getAll(folder));
}

PAJOMAR.smallProjects = buildSmallProjects();

/** All client review videos from assets/images/ريفيوهات (+ nested folders) */
const REVIEW_VIDEOS_ROOT = 'ريفيوهات';
const VIDEO_FILE_RE = /\.(mp4|webm|mov|m4v)(\?|$)/i;

function buildHomeReviewVideos() {
  const folders = ImageLib.folders()
    .filter((name) => name === REVIEW_VIDEOS_ROOT || name.startsWith(`${REVIEW_VIDEOS_ROOT}/`))
    .sort((a, b) => a.localeCompare(b, 'ar'));

  const out = [];
  const seen = new Set();
  folders.forEach((folder) => {
    ImageLib.files(folder).forEach((file, fileIndex) => {
      if (!VIDEO_FILE_RE.test(file)) return;
      const src = ImageLib.url(folder, fileIndex);
      if (!src || seen.has(src)) return;
      seen.add(src);
      const rel = folder === REVIEW_VIDEOS_ROOT ? file : `${folder.slice(REVIEW_VIDEOS_ROOT.length + 1)}/${file}`;
      out.push({ file: rel, src });
    });
  });

  /* Former #13 becomes #1 (rotate from 0-based index 12) */
  const rotateAt = Math.min(12, out.length);
  const rotated = out.length ? out.slice(rotateAt).concat(out.slice(0, rotateAt)) : out;

  return rotated.map((item, i) => ({
    id: `review-v${i + 1}`,
    file: item.file,
    src: item.src,
    index: i + 1
  }));
}

PAJOMAR.homeReviewVideos = buildHomeReviewVideos();

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
  return products.flatMap((product) => {
    const gallery = (product.gallery || []).filter((url) => url && !String(url).includes('_fallback'));
    if (!gallery.length && product.image && !String(product.image).includes('_fallback')) {
      gallery.push(product.image);
    }
    return gallery.map((url, index) => ({
      ...product,
      id: `${product.id}-${String(index + 1).padStart(2, '0')}`,
      folderId: product.id,
      department: folderDepartment(product.id),
      name: `${product.name} ${index + 1}`,
      image: url,
      imageSecondary: gallery[(index + 1) % gallery.length] || url,
      galleryIndex: index
    }));
  });
}

/** Flat list of every image across folders (for listing grid) */
PAJOMAR.listingItems = listingFromProducts(PAJOMAR.products);
PAJOMAR.listingByDept = {
  curtains: PAJOMAR.listingItems.filter((item) => item.department === 'curtains'),
  shutters: PAJOMAR.listingItems.filter((item) => item.department === 'shutters'),
  custom: PAJOMAR.listingItems.filter((item) => item.department === 'custom'),
  accessories: PAJOMAR.listingItems.filter((item) => item.department === 'accessories')
};
