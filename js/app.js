/* PAJOMAR — Main Application */
(function () {
  'use strict';

  const THEME_KEY = 'pajomar-theme';
  try {
    if (localStorage.getItem(THEME_KEY) === 'dark') {
      document.documentElement.classList.add('theme-dark');
    }
  } catch (e) { /* ignore */ }

  const ICONS = {
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3-3"/></svg>',
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1v-9.5z"/></svg>',
    grid: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    chevron: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 9l6 6 6-6"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>',
    filter: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 6h16M7 12h10M10 18h4"/></svg>',
    globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>',
    contact: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v2.2a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3.07-8.68A2 2 0 014.11 1h2.2a2 2 0 012 1.72c.13.96.35 1.9.66 2.8a2 2 0 01-.45 2.11L7.09 9.91a16 16 0 006 6l2.28-1.43a2 2 0 012.11-.45c.9.31 1.84.53 2.8.66A2 2 0 0122 16.92z"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s7-5.4 7-11a7 7 0 10-14 0c0 5.6 7 11 7 11z"/><circle cx="12" cy="10" r="2.2"/></svg>',
    curtains: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16"/><path d="M5 4v16"/><path d="M19 4v16"/><path d="M12 4v4"/><path d="M8 8c1.5 2 1.5 5 0 8"/><path d="M16 8c-1.5 2-1.5 5 0 8"/><path d="M9 20h6"/></svg>',
    consult: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 18.5H7A4 4 0 013 14.5v-5A4 4 0 017 5.5h6A4 4 0 0117 9.5v.8"/><path d="M10 18.5l1.8 2.2 1.8-2.2H17a4 4 0 004-4v-3a4 4 0 00-4-4h-1"/><path d="M8 9.2h4.2M8 12.2h2.6"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    caret: '<svg viewBox="0 0 10 10" fill="currentColor"><path d="M5 7.2L1.2 2.8h7.6L5 7.2z"/></svg>',
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="12" cy="12" r="4.2" fill="currentColor"/><path d="M12 3.2v1.5M12 19.3v1.5M4.1 12H2.6M21.4 12h-1.5M5.2 5.2l1.1 1.1M17.7 17.7l1.1 1.1M5.2 18.8l1.1-1.1M17.7 6.3l1.1-1.1"/></svg>',
    moon: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21 14.32A9 9 0 1110.68 3 7.2 7.2 0 0021 14.32z"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v2.2a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3.07-8.68A2 2 0 014.11 1h2.2a2 2 0 012 1.72c.13.96.35 1.9.66 2.8a2 2 0 01-.45 2.11L7.09 9.91a16 16 0 006 6l2.28-1.43a2 2 0 012.11-.45c.9.31 1.84.53 2.8.66A2 2 0 0122 16.92z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h3l1-3h-4V10c0-.6.4-1 1-1z"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14.2 3h2.6c.2 1.5.9 2.8 2 3.8 1 .9 2.3 1.4 3.6 1.5v2.7c-1.6 0-3.1-.5-4.4-1.3v6.6c0 3.4-2.8 6.2-6.3 6.2S5.4 19.7 5.4 16.3 8.2 10 11.7 10c.4 0 .8 0 1.2.1v2.8c-.4-.2-.8-.3-1.2-.3-2 0-3.6 1.6-3.6 3.6s1.6 3.6 3.6 3.6 3.6-1.6 3.6-3.6V3z"/></svg>',
    snapchat: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3.2c2.9 0 5.2 2.4 5.2 6.1 0 1.4.2 2.3.8 2.8.3.3.6.3.9.3.3 0 .6 0 .8-.1.2 1-.4 1.7-1.2 2.2-.3.2-.4.4 0 .7 1 .7 2.3 1.3 3.3 1.6.4.1.5.4.4.7-.3 1.3-1.8 1.2-2.7 1.4-.3.1-.4.2-.3.5.3 1.2 1.3 2.1.3 3-.7.6-1.6.3-2.4 0-.6-.2-1.2-.5-2-.5-.7 0-1.3.3-2 .5-.8.3-1.7.6-2.4 0-1-.9 0-1.8.3-3 .1-.3 0-.4-.3-.5-.9-.2-2.4-.1-2.7-1.4-.1-.3 0-.6.4-.7 1-.3 2.3-.9 3.3-1.6.4-.3.3-.5 0-.7-.8-.5-1.4-1.2-1.2-2.2.2.1.5.1.8.1.3 0 .6 0 .9-.3.6-.5.8-1.4.8-2.8 0-3.7 2.3-6.1 5.2-6.1z"/></svg>'
  };

  function socialLinksHTML() {
    const s = PAJOMAR.company.social;
    const items = [
      { href: s.instagram, label: 'Instagram', icon: ICONS.instagram },
      { href: s.facebook, label: 'Facebook', icon: ICONS.facebook },
      { href: s.tiktok, label: 'TikTok', icon: ICONS.tiktok },
      { href: s.snapchat, label: 'Snapchat', icon: ICONS.snapchat }
    ];
    return items.map((item) =>
      `<a class="social-icon" href="${item.href}" target="_blank" rel="noopener noreferrer" aria-label="${item.label}">${item.icon}</a>`
    ).join('');
  }

  function legalBadgeItems() {
    return `
        <p class="legal-line"><span>${t('legal.cr')}</span> <strong>288830</strong></p>
        <p class="legal-line"><span>${t('legal.tax')}</span> <strong>337-045-774</strong></p>`;
  }

  function legalBadgesHTML() {
    return `<div class="legal-badges">${legalBadgeItems()}</div>`;
  }

  function phoneChipItems() {
    const phones = [
      { href: 'tel:01211925591', label: '012 1192 5591' },
      { href: 'tel:01044669188', label: '010 4466 9188' }
    ];
    return phones.map((p) =>
      `<a class="phone-chip" href="${p.href}">${ICONS.phone}<span>${p.label}</span></a>`
    ).join('');
  }

  function phoneChipsHTML(extraClass) {
    return `<div class="phone-chips${extraClass ? ' ' + extraClass : ''}">${phoneChipItems()}</div>`;
  }

  function fillContactExtras() {
    document.querySelectorAll('[data-social]').forEach((el) => {
      el.innerHTML = socialLinksHTML();
    });
    document.querySelectorAll('[data-legal-badges]').forEach((el) => {
      el.innerHTML = legalBadgeItems();
    });
    document.querySelectorAll('[data-phone-chips]').forEach((el) => {
      el.innerHTML = phoneChipItems();
    });
  }

  function interestLabel(value) {
    const map = {
      curtains: 'contact.optCurtains',
      custom: 'contact.optCustom',
      consultation: 'contact.optConsultation',
      installation: 'contact.optInstallation'
    };
    return map[value] ? t(map[value]) : value;
  }

  function initContactWhatsAppForm() {
    const form = document.querySelector('.contact-form');
    if (!form || form.dataset.waBound === '1') return;
    form.dataset.waBound = '1';
    initQuoteProductCode();

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = (form.querySelector('#name')?.value || '').trim();
      const email = (form.querySelector('#email')?.value || '').trim();
      const phone = (form.querySelector('#phone')?.value || '').trim();
      const interest = form.querySelector('#interest')?.value || '';
      const messageEl = form.querySelector('#message');
      const message = (messageEl?.value || '').trim();
      const code = (messageEl?.dataset.productCode || new URLSearchParams(window.location.search).get('code') || '').trim();
      const lang = (typeof I18n !== 'undefined' && I18n.getLang) ? I18n.getLang() : 'en';
      const lines = lang === 'ar'
        ? [
            'طلب عرض سعر — PAJOMAR',
            `الاسم: ${name}`,
            email ? `البريد: ${email}` : '',
            phone ? `الهاتف: ${phone}` : '',
            interest ? `الاهتمام: ${interestLabel(interest)}` : '',
            code ? `كود الصورة: ${code}` : '',
            message ? `التفاصيل: ${message}` : ''
          ]
        : [
            'Quote request — PAJOMAR',
            `Name: ${name}`,
            email ? `Email: ${email}` : '',
            phone ? `Phone: ${phone}` : '',
            interest ? `Interest: ${interestLabel(interest)}` : '',
            code ? `Image code: ${code}` : '',
            message ? `Details: ${message}` : ''
          ];
      const text = lines.filter(Boolean).join('\n');
      const url = `https://wa.me/${PAJOMAR.whatsapp}?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank', 'noopener');
    });
  }

  function langSwitchHTML(extraClass) {
    return `<button type="button" class="lang-switch-btn${extraClass ? ' ' + extraClass : ''}" aria-label="${I18n.switchAriaLabel()}">
      <span class="lang-switch-icon" aria-hidden="true">${ICONS.globe}</span>
      <span class="lang-switch-text">${I18n.switchLabel()}</span>
    </button>`;
  }

  function heroLangSwitchHTML() {
    const code = I18n.getLang() === 'en' ? 'AR' : 'EN';
    return `<button type="button" class="lang-switch-btn lang-switch-btn--hero" aria-label="${I18n.switchAriaLabel()}">
      <span class="lang-switch-text">${code}</span>
    </button>`;
  }

  const PAGE_MAP = {
    'index.html': 'home',
    '': 'home',
    'curtains.html': 'store',
    'shutters.html': 'store',
    'accessories.html': 'store',
    'custom.html': 'projects',
    'custom-curtains.html': 'projects',
    'projects.html': 'projects',
    'project.html': 'projects',
    'about.html': 'menu',
    'contact.html': 'store',
    'consult.html': 'consult',
    'product.html': 'projects'
  };

  function t(key) { return I18n.t(key); }

  function logoHTML(variant) {
    const isFooter = variant === 'footer';
    return `
      <a href="index.html" class="logo logo-lockup${isFooter ? ' logo-lockup--footer' : ''}" aria-label="PAJOMAR Home">
        <span class="logo-mark"><img src="assets/logo.jpg" alt=""></span>
        <span class="logo-wordmark">
          <span class="logo-name">PAJOMAR</span>
          <span class="logo-tagline">Curtains &amp; Shutters</span>
        </span>
      </a>`;
  }

  /* ── Search ── */
  function searchProducts(query) {
    if (!query || query.length < 1) return [];
    const q = query.toLowerCase();
    return (PAJOMAR.allFolders || PAJOMAR.folders || []).filter(f =>
      f.folder.toLowerCase().includes(q) ||
      f.name.toLowerCase().includes(q) ||
      folderDisplayName(f.folder).toLowerCase().includes(q)
    ).slice(0, 8).map(f => ({
      id: f.folder,
      name: folderDisplayName(f.folder),
      image: f.image,
      type: f.folder,
      collection: f.folder,
      department: f.department || (typeof folderDepartment === 'function' ? folderDepartment(f.folder) : 'curtains')
    }));
  }

  function renderSearchResults(container, query) {
    const results = searchProducts(query);
    if (!query) {
      container.innerHTML = '';
      return;
    }
    if (results.length === 0) {
      container.innerHTML = '<div class="search-empty">' + t('search.noResults') + ' "' + esc(query) + '"</div>';
      return;
    }
    container.innerHTML = results.map(p => `
      <a href="${deptHref(p.department)}?folder=${encodeURIComponent(p.id)}" class="search-result-item">
        <img src="${p.image}" alt="${esc(p.name)}" loading="lazy">
        <div class="search-result-info">
          <h5>${esc(p.name)}</h5>
          <p>${esc(t('filter.folder'))}</p>
        </div>
      </a>
    `).join('') + `<a href="curtains.html?q=${encodeURIComponent(query)}" class="search-view-all">${t('search.viewAll')}</a>`;
  }

  /* ── Utilities ── */
  function esc(str) {
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
  }

  function getCurrentPage() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    return PAGE_MAP[path] || 'home';
  }

  function isHomePage() {
    const p = window.location.pathname.split('/').pop();
    return !p || p === 'index.html';
  }

  function folderDisplayName(folder) {
    const known = {
      curtains: 'nav.curtains',
      living: 'room.livingRoom', bedroom: 'room.bedroom', dining: 'room.diningRoom',
      office: 'room.office', reception: 'room.reception',
      sheer: 'type.sheer', blackout: 'type.blackout', decorative: 'type.decorative',
      classic: 'type.classic', modern: 'type.modern', custom: 'type.custom',
      white: 'color.white',
      'shutter-roller': 'dept.shutterRoller',
      'shutter-zebra': 'dept.shutterZebra',
      'shutter-wood': 'dept.shutterWood',
      'shutter-blackout': 'dept.shutterBlackout',
      'shutter-vertical': 'dept.shutterVertical',
      'custom-pinch': 'dept.customPinch',
      'custom-wave': 'dept.customWave',
      'custom-eyelet': 'dept.customEyelet',
      'custom-roman': 'dept.customRoman',
      'custom-plain': 'dept.customPlain',
      'acc-rods': 'dept.accRods',
      'acc-tracks': 'dept.accTracks',
      'acc-tiebacks': 'dept.accTiebacks',
      'acc-rings': 'dept.accRings',
      'acc-finials': 'dept.accFinials',
      'اكسسوارات': 'nav.accessories',
      'إكسسوارات': 'nav.accessories',
      'تكسسورات': 'nav.accessories',
      'شاتر': 'nav.shutters',
      'شتر': 'nav.shutters'
    };
    if (known[folder]) return t(known[folder]);
    const item = (PAJOMAR.allFolders || PAJOMAR.folders || []).find(f => f.folder === folder || f.slug === folder);
    return item ? item.name : folder;
  }

  function imageFileStem(url) {
    try {
      const file = decodeURIComponent(String(url || '').split('/').pop() || '');
      return file.replace(/\.[^.]+$/, '');
    } catch (e) {
      return '';
    }
  }

  function isMediaVideo(url) {
    return /\.(mp4|webm|mov|m4v)(\?|$)/i.test(String(url || ''));
  }

  function folderCodePrefix(folder) {
    const key = String(folder || '');
    if (key === 'شاتر' || key === 'شتر') return 'SHUTTER';
    if (key === 'اكسسوارات' || key === 'إكسسوارات' || key === 'تكسسورات') return 'ACC';
    return key;
  }

  function productImageCode(product) {
    if (!product) return 'IMG-01';
    const folder = String(product.folderId || product.imageFolder || product.id || 'img')
      .replace(/-\d{2}$/, '');
    const stem = imageFileStem(product.image);
    const fromIndex = product.galleryIndex != null
      ? String(product.galleryIndex + 1).padStart(2, '0')
      : '';
    const num = fromIndex || (/^\d+$/.test(stem) ? stem.padStart(2, '0') : '01');
    return `${folderCodePrefix(folder)}-${num}`.replace(/\s+/g, '-').toUpperCase();
  }

  function productQuoteUrl(code) {
    const safeCode = String(code || '').trim();
    const q = safeCode ? `?code=${encodeURIComponent(safeCode)}` : '';
    return `contact.html${q}#quote`;
  }

  function initQuoteProductCode() {
    const params = new URLSearchParams(window.location.search);
    const code = (params.get('code') || '').trim();
    if (!code) return;
    const message = document.querySelector('#message');
    if (!message) return;
    const lang = (typeof I18n !== 'undefined' && I18n.getLang) ? I18n.getLang() : 'en';
    const pref = lang === 'ar'
      ? `أريد طلب المنتج\nكود الصورة: ${code}`
      : `I'd like to order this product\nImage code: ${code}`;
    if (!String(message.value || '').trim()) message.value = pref;
    message.dataset.productCode = code;
  }

  function deptHref(dept) {
    return (typeof DEPT_PAGES !== 'undefined' && DEPT_PAGES[dept]) || 'curtains.html';
  }

  function foldersFor(dept) {
    if (PAJOMAR.departments && PAJOMAR.departments[dept]) return PAJOMAR.departments[dept];
    return PAJOMAR.folders || [];
  }

  function megaDeptHTML(dept, labelKey) {
    const href = deptHref(dept);
    const folders = foldersFor(dept);
    if (folders.length <= 1) {
      return `<a href="${href}" class="nav-link" data-page="${dept}">${t(labelKey)}</a>`;
    }
    return `
          <div class="nav-item has-mega">
            <a href="${href}" class="nav-link" data-page="${dept}">${t(labelKey)}</a>
            <div class="mega-menu" role="menu">
              <div class="mega-grid mega-grid-folders">
                <div class="mega-col" style="grid-column:1/-1">
                  <h4>${t('filter.folder')}</h4>
                  <div class="mega-folder-list">
                  ${folders.map(f => `
                    <a href="${href}?folder=${encodeURIComponent(f.folder)}" class="mega-link">
                      <img src="${f.image}" alt="" loading="lazy">
                      ${esc(folderDisplayName(f.folder))}
                    </a>
                  `).join('')}
                  </div>
                </div>
              </div>
            </div>
          </div>`;
  }

  function mobileDeptAccordion(dept, labelKey) {
    const href = deptHref(dept);
    const folders = foldersFor(dept);
    return `
        <a href="${href}" class="mobile-menu-link">${t(labelKey)}</a>
        <button class="mobile-menu-accordion-btn" data-accordion="${dept}">
          ${t('filter.folder')} ${ICONS.chevron}
        </button>
        <div class="mobile-menu-sub" data-sub="${dept}">
          <div class="mobile-menu-folders">
            ${folders.map(f => `
              <a href="${href}?folder=${encodeURIComponent(f.folder)}" class="mobile-menu-folder">
                <img src="${f.image}" alt="" loading="lazy">
                <span>${esc(folderDisplayName(f.folder))}</span>
              </a>
            `).join('')}
          </div>
        </div>`;
  }

  /* ── Header Injection ── */
  function injectHeader() {
    const existing = document.querySelector('.site-header');
    if (existing) existing.remove();

    const header = document.createElement('header');
    header.className = 'site-header' + (isHomePage() ? ' transparent' : ' solid');
    header.innerHTML = `
      <nav class="navbar" aria-label="Main navigation">
        ${logoHTML()}
        <div class="nav-main">
          <a href="index.html" class="nav-link" data-page="home">${t('nav.home')}</a>
          ${megaDeptHTML('curtains', 'nav.curtains')}
          ${megaDeptHTML('shutters', 'nav.shutters')}
          ${megaDeptHTML('custom', 'nav.custom')}
          ${megaDeptHTML('accessories', 'nav.accessories')}
          <a href="projects.html" class="nav-link" data-page="projects">${t('nav.projects')}</a>
          <a href="consult.html" class="nav-link" data-page="consult">${t('nav.consult')}</a>
          <a href="about.html" class="nav-link" data-page="about">${t('nav.about')}</a>
          <a href="contact.html" class="nav-link" data-page="contact">${t('nav.contact')}</a>
        </div>
        <div class="nav-actions">
          ${langSwitchHTML('nav-action')}
          <button class="nav-action search-trigger" aria-label="${t('nav.search')}">${ICONS.search} ${t('nav.search')}</button>
          <a href="contact.html#quote" class="nav-action btn-quote">${t('nav.quote')}</a>
        </div>
      </nav>
    `;
    document.body.prepend(header);
    header.querySelector('.lang-switch-btn').addEventListener('click', () => I18n.toggleLang());
    highlightActiveNav();
    initNavbarScroll(header);
    initMegaMenu(header);
  }

  function highlightActiveNav() {
    const page = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href').replace('.html', '').replace('index', 'home');
      if (href.includes(page) || (page === 'index' && href === 'home') || (page === 'product' && href === 'curtains') || (page === 'project' && href === 'projects')) {
        link.classList.add('active');
      }
    });
  }

  function initNavbarScroll(header) {
    if (!isHomePage()) return;
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 60);
      header.classList.toggle('transparent', window.scrollY <= 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function initMegaMenu(header) {
    header.querySelectorAll('.has-mega').forEach(item => {
      let timeout;
      item.addEventListener('mouseenter', () => { clearTimeout(timeout); item.classList.add('open'); });
      item.addEventListener('mouseleave', () => { timeout = setTimeout(() => item.classList.remove('open'), 200); });
      item.querySelector('.nav-link').addEventListener('click', (e) => {
        if (window.innerWidth <= 1024) {
          e.preventDefault();
          item.classList.toggle('open');
        }
      });
    });
  }

  /* ── Mobile top bar (lang, phone, search + menu) ── */
  function injectMobileTopBar() {
    document.querySelector('.mobile-top-bar')?.remove();

    const code = I18n.getLang() === 'en' ? 'AR' : 'EN';
    const bar = document.createElement('header');
    bar.className = 'mobile-top-bar';
    bar.setAttribute('aria-label', 'Mobile toolbar');
    bar.innerHTML = `
      <div class="mobile-top-bar-inner">
        <div class="mobile-top-cluster">
          <button type="button" class="mobile-top-btn mobile-lang-btn" aria-label="${I18n.switchAriaLabel()}">
            <span class="mobile-lang-caret" aria-hidden="true">${ICONS.caret}</span>
            <span class="mobile-lang-code">${code}</span>
          </button>
          <a href="contact.html" class="mobile-top-btn" aria-label="${t('nav.contact')}">${ICONS.contact}</a>
          <button type="button" class="mobile-top-btn" data-top="search" aria-label="${t('nav.search')}">${ICONS.search}</button>
        </div>
        <div class="mobile-top-cluster">
          <button type="button" class="mobile-top-btn" data-top="menu" aria-label="${t('nav.menu')}">${ICONS.menu}</button>
          <a href="index.html" class="mobile-top-btn mobile-top-arrow" aria-label="${t('nav.home')}">${ICONS.arrow}</a>
        </div>
      </div>
    `;
    document.body.prepend(bar);

    bar.querySelector('.mobile-lang-btn').addEventListener('click', () => I18n.toggleLang());
    bar.querySelector('[data-top="search"]').addEventListener('click', () => toggleMobileSearch(true));
    bar.querySelector('[data-top="menu"]').addEventListener('click', () => toggleMobileMenu(true));
  }

  /* ── Mobile Bottom Nav ── */
  function injectMobileNav() {
    const existing = document.querySelector('.mobile-bottom-nav');
    if (existing) existing.remove();

    const current = getCurrentPage();
    const nav = document.createElement('nav');
    nav.className = 'mobile-bottom-nav';
    nav.setAttribute('aria-label', 'Mobile navigation');
    nav.innerHTML = `
      <div class="mobile-bottom-nav-inner">
        <a href="index.html" class="mobile-nav-item${current === 'home' ? ' active' : ''}" data-nav="home">
          ${ICONS.home}<span>${t('nav.mainMenu')}</span>
        </a>
        <a href="consult.html" class="mobile-nav-item${current === 'consult' ? ' active' : ''}" data-nav="consult">
          ${ICONS.consult}<span>${t('nav.consult')}</span>
        </a>
        <a href="contact.html" class="mobile-nav-item${current === 'store' ? ' active' : ''}" data-nav="store">
          ${ICONS.pin}<span>${t('nav.store')}</span>
        </a>
        <a href="projects.html" class="mobile-nav-item${current === 'projects' ? ' active' : ''}" data-nav="projects">
          ${ICONS.curtains}<span>${t('nav.projects')}</span>
        </a>
      </div>
    `;
    document.body.appendChild(nav);
  }

  /* ── Mobile Menu ── */
  function injectMobileMenu() {
    document.querySelector('.mobile-menu-overlay')?.remove();
    document.querySelector('.mobile-menu-drawer')?.remove();

    const overlay = document.createElement('div');
    overlay.className = 'mobile-menu-overlay';
    overlay.addEventListener('click', () => toggleMobileMenu(false));

    const drawer = document.createElement('aside');
    drawer.className = 'mobile-menu-drawer';
    drawer.setAttribute('aria-label', 'Mobile menu');
    drawer.innerHTML = `
      <div class="mobile-menu-header">
        ${logoHTML()}
        <div style="display:flex;align-items:center;gap:8px">
          ${langSwitchHTML('lang-switch-btn--menu')}
          <button class="mobile-menu-close" aria-label="Close menu">${ICONS.close}</button>
        </div>
      </div>
      <nav class="mobile-menu-nav">
        <a href="index.html" class="mobile-menu-link">${t('nav.home')}</a>
        ${['curtains', 'shutters', 'custom', 'accessories'].map(dept => {
          const labels = { curtains: 'nav.curtains', shutters: 'nav.shutters', custom: 'nav.custom', accessories: 'nav.accessories' };
          const href = deptHref(dept);
          const folders = foldersFor(dept);
          return `
        <button class="mobile-menu-accordion-btn" data-accordion="${dept}">
          ${t(labels[dept])} ${ICONS.chevron}
        </button>
        <div class="mobile-menu-sub" data-sub="${dept}">
          <a href="${href}" class="mobile-menu-link">${t('home.browseAll')}</a>
          <div class="mobile-menu-folders">
            ${folders.map(f => `
              <a href="${href}?folder=${encodeURIComponent(f.folder)}" class="mobile-menu-folder">
                <img src="${f.image}" alt="" loading="lazy">
                <span>${esc(folderDisplayName(f.folder))}</span>
              </a>
            `).join('')}
          </div>
        </div>`;
        }).join('')}
        <a href="projects.html" class="mobile-menu-link">${t('nav.projects')}</a>
        <a href="consult.html" class="mobile-menu-link">${t('nav.consult')}</a>
        <a href="about.html" class="mobile-menu-link">${t('nav.about')}</a>
        <a href="contact.html" class="mobile-menu-link">${t('nav.contact')}</a>
        <a href="contact.html#quote" class="btn btn-primary mobile-menu-cta">${t('nav.quote')}</a>
      </nav>
    `;
    document.body.append(overlay, drawer);

    drawer.querySelector('.lang-switch-btn').addEventListener('click', () => I18n.toggleLang());
    drawer.querySelector('.mobile-menu-close').addEventListener('click', () => toggleMobileMenu(false));
    drawer.querySelectorAll('.mobile-menu-accordion-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const key = this.getAttribute('data-accordion');
        this.classList.toggle('open');
        drawer.querySelector(`[data-sub="${key}"]`)?.classList.toggle('open');
      });
    });
  }

  function toggleMobileMenu(open) {
    const overlay = document.querySelector('.mobile-menu-overlay');
    const drawer = document.querySelector('.mobile-menu-drawer');
    const btn = document.querySelector('[data-top="menu"]');
    if (!overlay) return;
    overlay.classList.toggle('open', open);
    drawer.classList.toggle('open', open);
    document.body.classList.toggle('menu-open', open);
    if (btn) btn.classList.toggle('active', open);
    if (open) {
      document.querySelector('.mobile-categories-overlay')?.classList.remove('open');
      document.querySelector('.mobile-search-overlay')?.classList.remove('open');
    }
  }

  /* ── Mobile Categories ── */
  function injectMobileCategories() {
    document.querySelector('.mobile-categories-overlay')?.remove();
    const el = document.createElement('div');
    el.className = 'mobile-categories-overlay';
    el.innerHTML = `
      <div class="mobile-categories-header">
        <h2>${t('nav.categories')}</h2>
        <button aria-label="Close">${ICONS.close}</button>
      </div>
      <div class="mobile-cat-grid">
        ${['curtains', 'shutters', 'custom', 'accessories'].map(dept => {
          const labels = { curtains: 'nav.curtains', shutters: 'nav.shutters', custom: 'nav.custom', accessories: 'nav.accessories' };
          const f = foldersFor(dept)[0];
          if (!f) return '';
          return `
          <a href="${deptHref(dept)}" class="mobile-cat-card">
            <img src="${f.image}" alt="${esc(t(labels[dept]))}" loading="lazy">
            <span>${esc(t(labels[dept]))}</span>
          </a>`;
        }).join('')}
      </div>
    `;
    document.body.appendChild(el);
    el.querySelector('button').addEventListener('click', () => toggleMobileCategories(false));
  }

  function toggleMobileCategories(open) {
    const el = document.querySelector('.mobile-categories-overlay');
    const btn = document.querySelector('[data-nav="categories"]');
    if (!el) return;
    el.classList.toggle('open', open);
    if (btn) btn.classList.toggle('active', open);
    if (open) {
      toggleMobileMenu(false);
      toggleMobileSearch(false);
    }
  }

  /* ── Mobile Search ── */
  function injectMobileSearch() {
    document.querySelector('.mobile-search-overlay')?.remove();
    const el = document.createElement('div');
    el.className = 'mobile-search-overlay';
    el.innerHTML = `
      <div class="mobile-search-header">
        <div class="mobile-search-input-wrap">
          ${ICONS.search}
          <input type="search" class="search-input" placeholder="${t('search.placeholder')}" aria-label="${t('nav.search')}" autocomplete="off" enterkeyhint="search">
        </div>
        <button class="search-close mobile-search-close" aria-label="Close search">${ICONS.close}</button>
      </div>
      <div class="mobile-search-results search-results"></div>
    `;
    document.body.appendChild(el);
    const input = el.querySelector('.search-input');
    const results = el.querySelector('.mobile-search-results');
    input.addEventListener('input', () => renderSearchResults(results, input.value));
    el.querySelector('.search-close').addEventListener('click', () => toggleMobileSearch(false));
  }

  function toggleMobileSearch(open) {
    const el = document.querySelector('.mobile-search-overlay');
    const btn = document.querySelector('[data-nav="search"]');
    if (!el) return;
    el.classList.toggle('open', open);
    document.body.classList.toggle('search-open', open);
    if (btn) btn.classList.toggle('active', open);
    if (open) {
      toggleMobileMenu(false);
      toggleMobileCategories(false);
      el.querySelector('.search-input').focus();
    }
  }

  /* ── Desktop Search ── */
  function injectDesktopSearch() {
    document.querySelector('.search-overlay')?.remove();
    const overlay = document.createElement('div');
    overlay.className = 'search-overlay';
    overlay.innerHTML = `
      <div class="search-panel">
        <div class="search-panel-inner">
          <div class="search-input-wrap">
            ${ICONS.search}
            <input type="search" class="search-input" placeholder="${t('search.placeholder')}" aria-label="${t('nav.search')}">
            <button class="search-close" aria-label="Close search">${ICONS.close}</button>
          </div>
          <div class="search-results"></div>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
    const input = overlay.querySelector('.search-input');
    const results = overlay.querySelector('.search-results');

    document.querySelector('.search-trigger')?.addEventListener('click', () => {
      overlay.classList.add('open');
      document.body.classList.add('search-open');
      input.focus();
    });

    overlay.querySelector('.search-close').addEventListener('click', closeSearch);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closeSearch(); });
    input.addEventListener('input', () => renderSearchResults(results, input.value));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeSearch();
    });

    function closeSearch() {
      overlay.classList.remove('open');
      document.body.classList.remove('search-open');
      input.value = '';
      results.innerHTML = '';
    }
  }

  /* ── WhatsApp ── */
  function injectWhatsApp() {
    const btn = document.createElement('a');
    btn.className = 'whatsapp-btn';
    btn.href = `https://wa.me/${PAJOMAR.whatsapp}`;
    btn.target = '_blank';
    btn.rel = 'noopener noreferrer';
    btn.setAttribute('aria-label', t('whatsapp.tooltip'));
    btn.innerHTML = `<span class="whatsapp-icon">${ICONS.whatsapp}</span>`;
    document.body.appendChild(btn);
  }

  function isDarkTheme() {
    return document.documentElement.classList.contains('theme-dark');
  }

  function applyTheme(dark) {
    document.documentElement.classList.toggle('theme-dark', dark);
    try { localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light'); } catch (e) { /* ignore */ }
    const btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.classList.toggle('is-on', dark);
      btn.innerHTML = `<span class="theme-toggle-icon" aria-hidden="true">${dark ? ICONS.sun : ICONS.moon}</span>`;
      btn.setAttribute('aria-label', dark ? t('theme.light') : t('theme.dark'));
      btn.setAttribute('aria-pressed', dark ? 'true' : 'false');
      btn.title = dark ? t('theme.light') : t('theme.dark');
    }
  }

  function injectThemeToggle() {
    let btn = document.getElementById('theme-toggle');
    if (!btn) {
      btn = document.createElement('button');
      btn.id = 'theme-toggle';
      btn.type = 'button';
      btn.className = 'theme-toggle';
      document.body.appendChild(btn);
      btn.addEventListener('click', () => applyTheme(!isDarkTheme()));
    }
    applyTheme(isDarkTheme());
  }

  /* ── Footer ── */
  function injectFooter() {
    const existing = document.querySelector('.site-footer');
    if (existing) existing.remove();

    const footer = document.createElement('footer');
    footer.className = 'site-footer';
    footer.innerHTML = `
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            ${logoHTML('footer')}
            <p>${t('footer.tagline')}</p>
            ${legalBadgesHTML()}
            ${phoneChipsHTML('phone-chips--footer')}
            <a class="mail-chip" href="mailto:Patgo.curtains@gmail.com">${ICONS.mail}<span>Patgo.curtains@gmail.com</span></a>
            <div class="social-links" aria-label="${esc(t('footer.social'))}">${socialLinksHTML()}</div>
          </div>
          <div class="footer-col">
            <h4>${t('footer.shop')}</h4>
            <a href="curtains.html">${t('nav.curtains')}</a>
            <a href="shutters.html">${t('nav.shutters')}</a>
            <a href="custom.html">${t('nav.custom')}</a>
            <a href="accessories.html">${t('nav.accessories')}</a>
          </div>
          <div class="footer-col">
            <h4>${t('footer.discover')}</h4>
            <a href="about.html">${t('nav.about')}</a>
            <a href="contact.html">${t('nav.contact')}</a>
          </div>
          <div class="footer-col">
            <h4>${t('footer.services')}</h4>
            <a href="custom-curtains.html">${t('footer.customDesign')}</a>
            <a href="contact.html#quote">${t('nav.quote')}</a>
            <a href="consult.html">${t('footer.consultation')}</a>
            <a href="contact.html">${t('footer.installation')}</a>
          </div>
        </div>
        <div class="footer-bottom">
          <span>&copy; ${new Date().getFullYear()} ${esc(PAJOMAR.company.name)}. ${t('footer.rights')}</span>
          <span>${t('footer.crafted')}</span>
        </div>
      </div>
    `;
    document.body.appendChild(footer);
  }

  /* ── Product Card Renderer ── */
  window.renderProductCard = function (product) {
    const folderId = product.folderId || product.imageFolder || product.id;
    const code = productImageCode(product);
    const href = `product.html?id=${encodeURIComponent(folderId)}${product.galleryIndex != null ? `&img=${product.galleryIndex}` : ''}`;
    const media = isMediaVideo(product.image)
      ? `<video class="img-primary" src="${product.image}" muted playsinline preload="metadata" aria-label="${esc(code)}"></video>`
      : `<img class="img-primary" src="${product.image}" alt="${esc(code)}" loading="lazy">`;

    return `
      <article class="product-card fade-in${isMediaVideo(product.image) ? ' product-card--video' : ''}">
        <div class="product-card-image">
          <a href="${href}">
            ${media}
            ${isMediaVideo(product.image) ? '<span class="product-card-video-badge" aria-hidden="true">▶</span>' : ''}
          </a>
          <div class="product-card-actions">
            <button class="btn quick-view-btn" data-id="${esc(folderId)}" data-img="${product.galleryIndex ?? 0}">${t('product.quickView')}</button>
            <a href="${href}" class="btn">${t('product.viewProduct')}</a>
          </div>
        </div>
        <div class="product-card-info">
          <a href="${href}"><h3>${esc(code)}</h3></a>
          <a href="${productQuoteUrl(code)}" class="product-card-request">${t('product.requestProduct')}</a>
        </div>
      </article>
    `;
  };

  /* ── Filters & Listing — driven only by image folders ── */
  window.initCatalogPage = function (dept) {
    const grid = document.getElementById('product-grid');
    if (!grid) return;
    dept = dept || document.body.getAttribute('data-dept') || 'curtains';

    const params = new URLSearchParams(window.location.search);
    const folderParam = params.get('folder') || params.get('type') || params.get('room') || '';
    const folderFromParam = folderParam
      .replace(/-room$/, '')
      .replace(/^living$/, 'living')
      .replace(/^dining$/, 'dining');

    const state = {
      folders: folderFromParam && ImageLib.has(folderFromParam) ? [folderFromParam] : [],
      sort: 'featured',
      search: params.get('q') || ''
    };

    function getFiltered() {
      let items = [...(PAJOMAR.listingByDept?.[dept] || PAJOMAR.listingItems || [])];

      if (state.folders.length) {
        items = items.filter(p => state.folders.includes(p.folderId || p.imageFolder));
      }

      if (state.search) {
        const q = state.search.toLowerCase().trim();
        items = items.filter(p => {
          const code = productImageCode(p).toLowerCase();
          return code.includes(q) ||
            (p.folderId || p.imageFolder || '').toLowerCase().includes(q) ||
            (p.name || '').toLowerCase().includes(q);
        });
      }

      switch (state.sort) {
        case 'newest':
          items = [...items].reverse();
          break;
        case 'popular':
          items.sort((a, b) => (a.galleryIndex || 0) - (b.galleryIndex || 0));
          break;
        default:
          break;
      }
      return items;
    }

    function render() {
      const items = getFiltered();
      grid.innerHTML = items.length
        ? items.map(renderProductCard).join('')
        : '<p class="empty-state">' + t('filter.noMatch') + '</p>';

      const countLabel = items.length === 1 ? t('listing.product') : t('listing.products');
      document.getElementById('product-count').textContent = items.length + ' ' + countLabel;
      renderActiveFilters();
      bindQuickView();
      initProductCardGalleryCycle();
      observeFadeIn();
    }

    function renderActiveFilters() {
      const container = document.getElementById('active-filters');
      if (!container) return;

      container.innerHTML = state.folders.map(folder => `
        <span class="filter-chip">${esc(folderDisplayName(folder))}<button data-folder="${esc(folder)}" aria-label="Remove filter">${ICONS.close}</button></span>
      `).join('');

      container.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
          state.folders = state.folders.filter(v => v !== btn.dataset.folder);
          syncFilterUI();
          render();
        });
      });
    }

    function syncFilterUI() {
      document.querySelectorAll('input[data-group="folders"]').forEach(input => {
        input.checked = state.folders.includes(input.value);
      });
    }

    function onFolderToggle(input) {
      const val = input.value;
      if (input.checked) {
        if (!state.folders.includes(val)) state.folders.push(val);
      } else {
        state.folders = state.folders.filter(v => v !== val);
      }
      syncFilterUI();
      render();
    }

    function bindFilterInputs() {
      document.querySelectorAll('input[data-group="folders"]').forEach(input => {
        input.onchange = () => onFolderToggle(input);
      });

      document.querySelectorAll('.clear-filters-btn, .filter-clear').forEach(btn => {
        btn.onclick = clearAllFilters;
      });
    }

    document.getElementById('sort-select')?.addEventListener('change', (e) => {
      state.sort = e.target.value;
      render();
    });

    const searchInput = document.getElementById('listing-search');
    if (searchInput) {
      if (state.search) searchInput.value = state.search;
      let searchTimer = null;
      searchInput.addEventListener('input', () => {
        clearTimeout(searchTimer);
        searchTimer = setTimeout(() => {
          state.search = searchInput.value.trim();
          render();
        }, 160);
      });
    }

    function clearAllFilters() {
      state.folders = [];
      state.search = '';
      if (searchInput) searchInput.value = '';
      syncFilterUI();
      render();
    }

    initFilterDrawer();
    bindFilterInputs();
    syncFilterUI();
    render();

    window._curtainsRender = () => {
      const filterHTML = getFilterHTML(dept);
      const sidebar = document.getElementById('filter-sidebar');
      const drawerBody = document.getElementById('filter-drawer-body');
      if (sidebar) sidebar.innerHTML = filterHTML;
      if (drawerBody) drawerBody.innerHTML = filterHTML;
      const drawerTitle = document.querySelector('.filter-drawer-header h3');
      if (drawerTitle) drawerTitle.textContent = t('filter.filters');
      const applyBtn = document.getElementById('filter-apply');
      if (applyBtn) applyBtn.textContent = t('filter.apply');
      document.querySelectorAll('.clear-filters-btn, .filter-clear').forEach(btn => {
        btn.textContent = btn.classList.contains('filter-clear') ? t('filter.clearAll') : t('filter.clear');
      });
      if (searchInput) {
        searchInput.placeholder = t('filter.searchCode');
        const searchLabel = searchInput.closest('.listing-search')?.querySelector('[data-i18n="filter.searchCode"]');
        if (searchLabel) searchLabel.textContent = t('filter.searchCode');
      }
      bindFilterInputs();
      syncFilterUI();
      render();
    };
  };

  function initFilterDrawer() {
    const btn = document.getElementById('filter-mobile-btn');
    const overlay = document.getElementById('filter-drawer-overlay');
    const drawer = document.getElementById('filter-drawer');
    if (!btn) return;

    btn.addEventListener('click', () => openFilterDrawer(true));
    overlay?.addEventListener('click', () => openFilterDrawer(false));
    document.getElementById('filter-drawer-close')?.addEventListener('click', () => openFilterDrawer(false));
    document.getElementById('filter-apply')?.addEventListener('click', () => openFilterDrawer(false));

    function openFilterDrawer(open) {
      overlay?.classList.toggle('open', open);
      drawer?.classList.toggle('open', open);
      document.body.classList.toggle('filter-open', open);
    }
  }

  /* ── Product Detail ── */
  window.initProductPage = function () {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const startImg = parseInt(params.get('img') || '0', 10);
    const product = PAJOMAR.products.find(p => p.id === id)
      || PAJOMAR.products.find(p => p.imageFolder === id)
      || (() => {
        const listing = (PAJOMAR.listingItems || []).find(p => p.id === id);
        if (!listing) return null;
        return PAJOMAR.products.find(p => p.id === listing.folderId || p.imageFolder === listing.folderId) || listing;
      })();
    const container = document.getElementById('product-detail');
    if (!product || !container) {
      if (container) container.innerHTML = '<p class="empty-state">' + t('product.notFound') + '</p>';
      return;
    }

    const startFromListing = (PAJOMAR.listingItems || []).find(p => p.id === id);
    const galleryStart = startFromListing && Number.isFinite(startFromListing.galleryIndex)
      ? startFromListing.galleryIndex
      : startImg;

    const gallery = product.gallery || [product.image, product.imageSecondary].filter(Boolean);
    const uniqueGallery = [...new Set(gallery)];
    const activeIndex = Math.min(Math.max(galleryStart, 0), uniqueGallery.length - 1);
    const code = productImageCode({
      ...product,
      folderId: product.imageFolder || product.id,
      galleryIndex: activeIndex,
      image: uniqueGallery[activeIndex]
    });
    document.title = code + ' — PAJOMAR';

    const renderMainMedia = (src, alt) => isMediaVideo(src)
      ? `<video id="main-image" class="product-gallery-video" src="${src}" controls playsinline controlslist="nodownload noplaybackrate" aria-label="${esc(alt)}"></video>`
      : `<img id="main-image" src="${src}" alt="${esc(alt)}">`;

    const renderThumb = (src, i) => isMediaVideo(src)
      ? `<button class="${i === activeIndex ? 'active' : ''}" data-src="${src}" data-video="1"><video src="${src}" muted playsinline preload="metadata" aria-hidden="true"></video><span class="thumb-video-mark">▶</span></button>`
      : `<button class="${i === activeIndex ? 'active' : ''}" data-src="${src}"><img src="${src}" alt=""></button>`;

    const dept = folderDepartment(product.imageFolder || product.id) || 'curtains';
    const deptPage = deptHref(dept);

    container.innerHTML = `
      <div class="product-gallery">
        <div class="product-gallery-main">
          ${renderMainMedia(uniqueGallery[activeIndex], code)}
        </div>
        ${uniqueGallery.length > 1 ? `
        <div class="product-gallery-thumbs">
          ${uniqueGallery.map((src, i) => renderThumb(src, i)).join('')}
        </div>` : ''}
      </div>
      <div class="product-info">
        <p class="eyebrow">${esc(t('product.code'))}</p>
        <h1>${esc(code)}</h1>
        <div class="product-meta-row">
          <div class="product-meta-item"><label>${t('product.code')}</label><span>${esc(code)}</span></div>
        </div>
        <div class="product-actions">
          <a href="${productQuoteUrl(code)}" class="btn btn-primary" id="product-order-btn">${t('product.requestProduct')}</a>
          <a href="${deptPage}?folder=${encodeURIComponent(product.imageFolder || product.id)}" class="btn btn-outline">${t(dept === 'shutters' ? 'nav.shutters' : 'nav.curtains')}</a>
        </div>
      </div>
    `;

    const mainWrap = container.querySelector('.product-gallery-main');
    const orderBtn = container.querySelector('#product-order-btn');
    container.querySelectorAll('.product-gallery-thumbs button').forEach(btn => {
      btn.addEventListener('click', () => {
        container.querySelectorAll('.product-gallery-thumbs button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const src = btn.dataset.src;
        const nextCode = productImageCode({
          ...product,
          folderId: product.imageFolder || product.id,
          galleryIndex: uniqueGallery.indexOf(src),
          image: src
        });
        if (mainWrap) mainWrap.innerHTML = renderMainMedia(src, nextCode);
        const titleEl = container.querySelector('.product-info h1');
        const codeEl = container.querySelector('.product-meta-item span');
        if (titleEl) titleEl.textContent = nextCode;
        if (codeEl) codeEl.textContent = nextCode;
        if (orderBtn) orderBtn.href = productQuoteUrl(nextCode);
        document.title = nextCode + ' — PAJOMAR';
      });
    });

    const currentFolder = product.imageFolder || product.folderId || product.id;
    let related = (PAJOMAR.products || []).filter(p => (p.imageFolder || p.id) !== currentFolder);

    /* Fill from listing items if folders are few */
    if (related.length < 4) {
      const extra = (PAJOMAR.listingItems || []).filter(p => {
        const folder = p.folderId || p.imageFolder || p.id;
        return folder !== currentFolder;
      });
      related = [...related, ...extra];
    }

    const seen = new Set();
    related = related.filter(p => {
      const key = p.folderId || p.imageFolder || p.id;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    }).slice(0, 4);

    const relatedGrid = document.getElementById('related-grid');
    if (relatedGrid) {
      relatedGrid.innerHTML = related.length
        ? related.map(renderProductCard).join('')
        : '<p class="empty-state">' + t('filter.noMatch') + '</p>';
      relatedGrid.querySelectorAll('.product-card').forEach(el => {
        el.classList.add('visible');
        el.classList.remove('fade-in');
      });
      bindQuickView();
      initProductCardGalleryCycle();
    }
    window._productRender = initProductPage;
  };

  /* ── Quick View ── */
  function bindQuickView() {
    document.querySelectorAll('.quick-view-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const product = PAJOMAR.products.find(p => p.id === btn.dataset.id);
        if (!product) return;
        const imgIndex = parseInt(btn.dataset.img || '0', 10);
        showQuickView(product, imgIndex);
      });
    });
  }

  function showQuickView(product, imgIndex = 0) {
    const gallery = product.gallery || [product.image];
    const src = gallery[imgIndex] || gallery[0] || product.image;
    const code = productImageCode({
      ...product,
      folderId: product.imageFolder || product.id,
      galleryIndex: imgIndex,
      image: src
    });
    let modal = document.getElementById('quick-view-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'quick-view-modal';
      modal.className = 'modal-overlay';
      document.body.appendChild(modal);
    }
    modal.innerHTML = `
      <div class="modal-content" style="display:grid;grid-template-columns:1fr 1fr;gap:32px;padding:32px">
        ${isMediaVideo(src)
          ? `<video src="${src}" controls playsinline controlslist="nodownload noplaybackrate" style="width:100%;border-radius:8px;background:#000"></video>`
          : `<img src="${src}" alt="${esc(code)}" style="width:100%;border-radius:8px;object-fit:cover">`}
        <div>
          <button class="search-close" style="float:right" aria-label="Close">${ICONS.close}</button>
          <p class="eyebrow">${esc(t('product.code'))}</p>
          <h2 style="margin:8px 0">${esc(code)}</h2>
          <a href="product.html?id=${encodeURIComponent(product.id)}&img=${imgIndex}" class="btn btn-primary">${t('product.viewProduct')}</a>
          <a href="${productQuoteUrl(code)}" class="btn btn-outline" style="margin-inline-start:8px">${t('product.requestProduct')}</a>
        </div>
      </div>
    `;
    modal.classList.add('open');
    modal.querySelector('.search-close').addEventListener('click', () => modal.classList.remove('open'));
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('open'); });
  }

  window.initCurtainsPage = function () {
    window.initCatalogPage('curtains');
  };

  window.getFilterHTML = function (dept) {
    const folders = foldersFor(dept || document.body.getAttribute('data-dept') || 'curtains');

    if (!folders.length) {
      return `<p class="empty-state">${t('filter.noMatch')}</p>`;
    }

    return `
      <div class="filter-lookbooks">
        <div class="filter-lookbooks-head">
          <h4>${t('filter.folder')}</h4>
          <p>${t('filter.folderHint')}</p>
        </div>
        <div class="filter-lookbook-list">
          ${folders.map(f => `
            <label class="filter-lookbook">
              <input type="checkbox" data-group="folders" value="${esc(f.folder)}">
              <span class="filter-lookbook-thumb">
                <img src="${f.image}" alt="" loading="lazy">
              </span>
              <span class="filter-lookbook-meta">
                <span class="filter-lookbook-name">${esc(folderDisplayName(f.folder))}</span>
              </span>
            </label>
          `).join('')}
        </div>
        <button type="button" class="filter-clear clear-filters-btn">${t('filter.clearAll')}</button>
      </div>
    `;
  };

  function rebuildUI() {
    injectHeader();
    injectFooter();
    injectMobileTopBar();
    injectMobileNav();
    injectMobileMenu();
    injectMobileCategories();
    injectMobileSearch();
    injectDesktopSearch();
    injectThemeToggle();
    if (typeof window._curtainsRender === 'function') window._curtainsRender();
    if (typeof window._productRender === 'function') window._productRender();
    if (typeof window._projectsRender === 'function') window._projectsRender();
    if (typeof window._projectDetailRender === 'function') window._projectDetailRender();
    applyCurtainImages();
    initProductCardGalleryCycle();
    initHomePage();
    fillContactExtras();
    const relatedTitle = document.querySelector('.related-section h2');
    if (relatedTitle) {
      const key = relatedTitle.getAttribute('data-i18n') || 'product.related';
      relatedTitle.textContent = t(key);
    }
  }

  function initHomeRoomsScroller(track) {
    const scroller = track?.closest('.home-rooms-marquee');
    const section = track?.closest('.section-stories');
    if (!scroller || !track || track.dataset.scrollBound === '1') return;
    track.dataset.scrollBound = '1';

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let offset = 0;
    let paused = reduced;
    let resumeTimer = 0;
    const speed = 0.5;

    const loopWidth = () => track.scrollWidth / 2;

    const apply = () => {
      const half = loopWidth();
      if (half > 1) {
        offset = ((offset % half) + half) % half;
      } else {
        offset = 0;
      }
      track.style.transform = `translate3d(${-offset}px, 0, 0)`;
    };

    const pauseAuto = (ms = 3200) => {
      if (reduced) return;
      paused = true;
      window.clearTimeout(resumeTimer);
      resumeTimer = window.setTimeout(() => {
        paused = false;
      }, ms);
    };

    const step = (dir) => {
      const card = track.querySelector('.home-room-card');
      const styles = window.getComputedStyle(track);
      const gap = parseFloat(styles.columnGap || styles.gap) || 14;
      const amount = (card?.getBoundingClientRect().width || 200) + gap;
      offset += dir * amount;
      apply();
      pauseAuto(3600);
    };

    (section || document).querySelectorAll('[data-rooms-dir]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const dir = Number(btn.getAttribute('data-rooms-dir')) || 0;
        if (dir) step(dir);
      });
    });

    scroller.addEventListener('mouseenter', () => {
      if (reduced) return;
      paused = true;
      window.clearTimeout(resumeTimer);
    });
    scroller.addEventListener('mouseleave', () => {
      if (reduced) return;
      window.clearTimeout(resumeTimer);
      resumeTimer = window.setTimeout(() => {
        paused = false;
      }, 700);
    });
    scroller.addEventListener('touchstart', () => pauseAuto(2800), { passive: true });

    const tick = () => {
      if (!paused && scroller.isConnected) {
        offset += speed;
        apply();
      }
      window.requestAnimationFrame(tick);
    };
    apply();
    window.requestAnimationFrame(tick);
  }

  function initHomePage() {
    if (!document.body.classList.contains('page-home') && !document.getElementById('home-cat-grid')) return;

    const folders = PAJOMAR.folders || [];
    const grid = document.getElementById('home-cat-grid');
    const stories = document.getElementById('home-stories');
    const projectMedia = document.getElementById('home-project-media');
    const newsForm = document.getElementById('home-newsletter-form');
    const usedImages = new Set((PAJOMAR.heroSlides || []).filter(Boolean));
    const claimImage = (src) => {
      if (!src || src.includes('_fallback') || usedImages.has(src)) return false;
      usedImages.add(src);
      return true;
    };
    const pickFromFolder = (folder, preferIndex) => {
      const all = typeof ImageLib !== 'undefined' ? ImageLib.getAll(folder) : [];
      if (!all.length) return '';
      const ordered = [];
      if (preferIndex != null && all[preferIndex]) ordered.push(all[preferIndex]);
      all.forEach((src, i) => {
        if (i !== preferIndex) ordered.push(src);
      });
      for (const src of ordered) {
        if (claimImage(src)) return src;
      }
      return '';
    };

    const shopGrid = document.getElementById('shop-dept-grid');
    if (shopGrid) {
      const depts = [
        { id: 'curtains', label: 'nav.curtains', folder: 'modern', prefer: 3 },
        { id: 'shutters', label: 'nav.shutters', folder: (typeof SHUTTER_GALLERY_FOLDER !== 'undefined' && SHUTTER_GALLERY_FOLDER) || 'شاتر', prefer: 0 },
        { id: 'custom', label: 'nav.custom', folder: 'custom-pinch', prefer: 0 },
        { id: 'accessories', label: 'nav.accessories', folder: (typeof ACCESSORY_GALLERY_FOLDER !== 'undefined' && ACCESSORY_GALLERY_FOLDER) || 'اكسسوارات', prefer: 0 }
      ];
      shopGrid.innerHTML = depts.map(d => {
        let cover = (PAJOMAR.deptCovers && PAJOMAR.deptCovers[d.id]) || '';
        if (!claimImage(cover)) {
          cover = pickFromFolder(d.folder, d.prefer)
            || pickFromFolder(d.folder, 0)
            || (foldersFor(d.id)[0] && claimImage(foldersFor(d.id)[0].image) ? foldersFor(d.id)[0].image : '');
          if (!cover && foldersFor(d.id)[0]) {
            const fallback = foldersFor(d.id)[0].image;
            if (fallback && !fallback.includes('_fallback')) cover = fallback;
          }
        }
        if (!cover) return '';
        return `
          <a href="${deptHref(d.id)}" class="shop-dept-card fade-in visible">
            <img src="${cover}" alt="" loading="eager">
            <span>${esc(t(d.label))}</span>
          </a>`;
      }).join('');
    }

    if (grid) {
      let marketing = (PAJOMAR.homeMarketing || []).filter((src) => claimImage(src));
      if (!marketing.length && typeof ImageLib !== 'undefined') {
        const marketingFolder = PAJOMAR.homeMarketingFolder || 'صور تسويق';
        if (ImageLib.has(marketingFolder)) {
          for (const src of ImageLib.getAll(marketingFolder)) {
            if (claimImage(src)) {
              marketing.push(src);
              if (marketing.length >= 4) break;
            }
          }
        }
        if (!marketing.length) {
          const curtainFolders = (PAJOMAR.folders || []).map((f) => f.folder).filter(Boolean);
          for (const folder of curtainFolders) {
            for (const src of ImageLib.getAll(folder)) {
              if (claimImage(src)) {
                marketing.push(src);
                if (marketing.length >= 4) break;
              }
            }
            if (marketing.length >= 4) break;
          }
        }
      }
      grid.innerHTML = marketing.length
        ? marketing.slice(0, 4).map((src, i) => `
            <a href="curtains.html" class="home-cat-card home-cat-card--${i + 1} fade-in visible">
              <img src="${src}" alt="" loading="${i === 0 ? 'eager' : 'lazy'}">
              <span>${esc(t('home.lookLabel').replace('{n}', String(i + 1)))}</span>
            </a>
          `).join('')
        : '';
    }

    if (stories) {
      const rooms = [
        { folder: 'sheer', name: t('type.sheer') },
        { folder: 'blackout', name: t('type.blackout') },
        { folder: 'classic', name: t('type.classic') },
        { folder: 'modern', name: t('type.modern') },
        { folder: 'decorative', name: t('type.decorative') },
        { folder: 'bedroom', name: t('room.bedroom') },
        { folder: 'living', name: t('room.livingRoom') },
        { folder: 'dining', name: t('room.diningRoom') },
        { folder: 'office', name: t('room.office') },
        { folder: 'reception', name: t('room.reception') }
      ].filter((r) => ImageLib.has(r.folder));
      /* Always pick a real folder photo — do not depend on leftover unique pool */
      const roomCards = rooms.map((r) => {
        const all = ImageLib.getAll(r.folder);
        const src = all[1] || all[0] || '';
        if (!src || src.includes('_fallback')) return '';
        return `
        <a href="curtains.html?folder=${encodeURIComponent(r.folder)}" class="home-room-card">
          <img src="${src}" alt="${esc(r.name)}" loading="eager" decoding="async" draggable="false">
          <span>${esc(r.name)}</span>
        </a>`;
      }).filter(Boolean).join('');
      /* Two identical tracks for seamless loop + manual scroll */
      stories.innerHTML = roomCards + roomCards;
      stories.removeAttribute('data-marquee');
      initHomeRoomsScroller(stories);
    }

    if (projectMedia) {
      const fromSites = (PAJOMAR.smallProjects || [])
        .flatMap((p) => (p.gallery || []).slice(0, 1))
        .filter((src) => src && !src.includes('_fallback'));
      const softFolders = [
        ['sheer', 1],
        ['sheer', 2],
        ['modern', 3],
        ['living', 1],
        ['bedroom', 3]
      ];
      const imgs = fromSites.slice(0, 3);
      if (imgs.length < 3) {
        for (const [folder, idx] of softFolders) {
          const src = pickFromFolder(folder, idx) || pickFromFolder(folder, 1) || pickFromFolder(folder, 0);
          if (src && !imgs.includes(src)) imgs.push(src);
          if (imgs.length >= 3) break;
        }
      }
      projectMedia.innerHTML = imgs.map(src => `<img src="${src}" alt="" loading="lazy">`).join('');
    }

    if (newsForm && !newsForm.dataset.bound) {
      newsForm.dataset.bound = '1';
      newsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert(t('home.news.thanks'));
        newsForm.reset();
      });
    }

    initHomeReviewVideos();
    initDrape();
    observeFadeIn();
  }

  function initHomeReviewVideos() {
    const root = document.getElementById('home-review-videos');
    if (!root) return;

    const videos = PAJOMAR.homeReviewVideos || [];
    if (!videos.length) {
      root.innerHTML = '';
      return;
    }

    let index = 0;
    root.className = 'home-review-reel';
    root.innerHTML = `
      <div class="home-review-reel-stage">
        <button type="button" class="home-review-nav" data-review-dir="-1" aria-label="Previous">
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M15 6l-6 6 6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <div class="home-review-reel-track" aria-hidden="false">
          <button type="button" class="home-review-phone home-review-phone--side" data-review-slot="-1" aria-label="Previous clip">
            <span class="home-review-phone-bezel">
              <video muted playsinline preload="metadata"></video>
            </span>
          </button>
          <div class="home-review-phone home-review-phone--main" data-review-slot="0">
            <span class="home-review-phone-bezel">
              <span class="home-review-phone-notch" aria-hidden="true"></span>
              <video id="home-review-player" muted playsinline preload="metadata"></video>
              <button type="button" class="home-review-play" aria-label="${esc(t('home.reviews.play'))}">
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>
              </button>
            </span>
            <p class="home-review-sill" id="home-review-caption"></p>
          </div>
          <button type="button" class="home-review-phone home-review-phone--side" data-review-slot="1" aria-label="Next clip">
            <span class="home-review-phone-bezel">
              <video muted playsinline preload="metadata"></video>
            </span>
          </button>
        </div>
        <button type="button" class="home-review-nav" data-review-dir="1" aria-label="Next">
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
      </div>`;

    const caption = root.querySelector('#home-review-caption');
    const mainPhone = root.querySelector('.home-review-phone--main');
    const mainPlayer = root.querySelector('#home-review-player');
    const playBtn = root.querySelector('.home-review-play');
    const sidePhones = [...root.querySelectorAll('.home-review-phone--side')];

    const at = (offset) => videos[(index + offset + videos.length) % videos.length];

    const fillPhone = (el, item) => {
      const video = el?.querySelector('video');
      if (!video || !item) return;
      video.pause();
      if (video.src !== item.src) {
        video.src = item.src;
        video.load();
      }
    };

    const setActive = (next, animate = true) => {
      index = (next + videos.length) % videos.length;
      if (animate && mainPhone) {
        mainPhone.classList.remove('is-flip');
        void mainPhone.offsetWidth;
        mainPhone.classList.add('is-flip');
      }
      fillPhone(mainPhone, at(0));
      sidePhones.forEach((phone) => {
        const slot = Number(phone.dataset.reviewSlot || 0);
        fillPhone(phone, at(slot));
      });
      if (caption) {
        caption.textContent = `${String(index + 1).padStart(2, '0')} / ${String(videos.length).padStart(2, '0')} · ${t('home.reviews.clip').replace('{n}', String(index + 1))}`;
      }
      root.classList.remove('is-playing');
    };

    root.querySelectorAll('[data-review-dir]').forEach((btn) => {
      btn.addEventListener('click', () => setActive(index + Number(btn.dataset.reviewDir || 1)));
    });
    sidePhones.forEach((phone) => {
      phone.addEventListener('click', () => setActive(index + Number(phone.dataset.reviewSlot || 0)));
    });

    playBtn?.addEventListener('click', () => {
      const item = at(0);
      openReviewCinema(mainPlayer?.src || item.src, caption?.textContent || '');
    });

    mainPlayer?.addEventListener('pointerenter', () => {
      if (!window.matchMedia('(hover: hover)').matches) return;
      const p = mainPlayer.play();
      if (p && typeof p.catch === 'function') p.catch(() => {});
      root.classList.add('is-playing');
    });
    mainPlayer?.addEventListener('pointerleave', () => {
      mainPlayer.pause();
      try { mainPlayer.currentTime = 0; } catch (err) { /* ignore */ }
      root.classList.remove('is-playing');
    });

    let touchX = null;
    root.addEventListener('touchstart', (e) => {
      touchX = e.changedTouches?.[0]?.clientX ?? null;
    }, { passive: true });
    root.addEventListener('touchend', (e) => {
      if (touchX == null) return;
      const x = e.changedTouches?.[0]?.clientX;
      if (x == null) return;
      const dx = x - touchX;
      touchX = null;
      if (Math.abs(dx) < 40) return;
      const rtl = document.documentElement.getAttribute('dir') === 'rtl';
      setActive(index + ((dx < 0) === rtl ? -1 : 1));
    }, { passive: true });

    setActive(0, false);
  }

  function openReviewCinema(src, label) {
    let cinema = document.getElementById('home-review-cinema');
    if (!cinema) {
      cinema = document.createElement('div');
      cinema.id = 'home-review-cinema';
      cinema.className = 'home-review-cinema';
      cinema.hidden = true;
      cinema.innerHTML = `
        <div class="home-review-cinema-backdrop" data-cinema-close></div>
        <div class="home-review-cinema-panel" role="dialog" aria-modal="true">
          <button type="button" class="home-review-cinema-close" data-cinema-close aria-label="Close">&times;</button>
          <p class="home-review-cinema-label" id="home-review-cinema-label"></p>
          <video id="home-review-cinema-video" controls playsinline controlslist="nodownload noplaybackrate"></video>
        </div>`;
      document.body.appendChild(cinema);
      cinema.querySelectorAll('[data-cinema-close]').forEach((el) => {
        el.addEventListener('click', () => {
          cinema.hidden = true;
          document.body.classList.remove('cinema-open');
          const v = document.getElementById('home-review-cinema-video');
          if (v) {
            v.pause();
            v.removeAttribute('src');
            v.load();
          }
        });
      });
      if (!cinema.dataset.escapeBound) {
        cinema.dataset.escapeBound = '1';
        document.addEventListener('keydown', (e) => {
          if (e.key !== 'Escape' || cinema.hidden) return;
          cinema.querySelector('[data-cinema-close]')?.click();
        });
      }
    }
    const cinemaVideo = document.getElementById('home-review-cinema-video');
    const cinemaLabel = document.getElementById('home-review-cinema-label');
    if (cinemaLabel) cinemaLabel.textContent = label || '';
    if (cinemaVideo) {
      cinemaVideo.src = src;
      cinema.hidden = false;
      document.body.classList.add('cinema-open');
      const playPromise = cinemaVideo.play();
      if (playPromise && typeof playPromise.catch === 'function') playPromise.catch(() => {});
    }
  }

  function initDrape() {
    const root = document.getElementById('home-drape');
    const stage = document.getElementById('drape-stage');
    const typesEl = document.getElementById('drape-types');
    if (!stage || !root) return;

    const types = ['blackout', 'sheer'];
    const leftCloth = document.getElementById('drape-cloth-l');
    const rightCloth = document.getElementById('drape-cloth-r');
    const leftPanel = stage.querySelector('.drape-panel--l');
    const rightPanel = stage.querySelector('.drape-panel--r');

    function buildCloth(el) {
      if (!el || el.dataset.ready === '1') return;
      el.dataset.ready = '1';
      el.innerHTML = Array.from({ length: 18 }, (_, i) =>
        `<span class="drape-fold" style="--n:${i}"><i class="drape-ring"></i></span>`
      ).join('');
    }

    buildCloth(leftCloth);
    buildCloth(rightCloth);

    function applyType(type) {
      if (!types.includes(type)) type = 'sheer';
      root.dataset.type = type;
      stage.dataset.kind = type;
      if (typesEl) {
        typesEl.querySelectorAll('.drape-type').forEach((btn) => {
          const on = btn.dataset.type === type;
          btn.classList.toggle('is-on', on);
          btn.setAttribute('aria-pressed', on ? 'true' : 'false');
        });
      }
      stage.setAttribute('aria-label', `${t('drape.aria')} — ${t('drape.type.' + type)}`);
    }

    if (typesEl) {
      typesEl.innerHTML = types.map((type) => `
        <button type="button" class="drape-type drape-type--${esc(type)}" data-type="${esc(type)}" aria-pressed="false">
          <span class="drape-type-swatch" aria-hidden="true"></span>
          <span class="drape-type-copy">
            <strong>${esc(t('drape.type.' + type))}</strong>
            <em>${esc(t('drape.type.' + type + '.note'))}</em>
          </span>
        </button>
      `).join('');
    }

    applyType(types.includes(root.dataset.type) ? root.dataset.type : 'blackout');

    if (root.dataset.bound === '1') return;
    root.dataset.bound = '1';

    typesEl?.addEventListener('click', (e) => {
      const btn = e.target.closest('.drape-type');
      if (!btn) return;
      applyType(btn.dataset.type);
    });

    let left = Number(stage.style.getPropertyValue('--left')) || 0;
    let right = Number(stage.style.getPropertyValue('--right')) || 0;
    let holding = null;
    let grab = 0;
    let lastX = 0;
    let startY = 0;
    let vel = 0;
    let raf = 0;
    let pending = false;

    function clamp(n) {
      return Math.max(0, Math.min(1, n));
    }

    function paint() {
      stage.style.setProperty('--left', String(left));
      stage.style.setProperty('--right', String(right));
      stage.classList.toggle('is-holding', Boolean(holding));
      stage.setAttribute('aria-valuenow', String(Math.round(((left + right) / 2) * 100)));
    }

    function openFromPointer(side, clientX) {
      const box = stage.getBoundingClientRect();
      const x = clientX - box.left;
      const mid = box.width / 2;
      const minInner = box.width * 0.12;
      if (side === 'l') {
        const inner = x + grab;
        return clamp((mid - inner) / (mid - minInner));
      }
      const inner = x - grab;
      return clamp((inner - mid) / (mid - minInner));
    }

    function beginHold(e) {
      const box = stage.getBoundingClientRect();
      const mid = box.left + box.width / 2;
      holding = e.target.closest('.drape-panel--l')
        ? 'l'
        : (e.target.closest('.drape-panel--r') ? 'r' : (e.clientX < mid ? 'l' : 'r'));
      const panel = holding === 'l' ? leftPanel : rightPanel;
      const pr = panel.getBoundingClientRect();
      grab = holding === 'l' ? (pr.right - e.clientX) : (e.clientX - pr.left);
      lastX = e.clientX;
      vel = 0;
      try { stage.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
      paint();
    }

    stage.addEventListener('pointerdown', (e) => {
      cancelAnimationFrame(raf);
      pending = true;
      holding = null;
      lastX = e.clientX;
      startY = e.clientY;
    });

    stage.addEventListener('pointermove', (e) => {
      if (pending && !holding) {
        const dx = e.clientX - lastX;
        const dy = e.clientY - startY;
        if (Math.abs(dy) > 16 && Math.abs(dy) > Math.abs(dx)) {
          pending = false;
          return;
        }
        if (Math.abs(dx) < 7) return;
        pending = false;
        beginHold(e);
      }
      if (!holding) return;
      vel = e.clientX - lastX;
      lastX = e.clientX;
      const next = openFromPointer(holding, e.clientX);
      if (holding === 'l') left = next;
      else right = next;
      paint();
    });

    function release() {
      pending = false;
      if (!holding) return;
      const side = holding;
      holding = null;
      stage.classList.remove('is-holding');
      const tick = () => {
        vel *= 0.88;
        const add = (side === 'l' ? -vel : vel) / 900;
        if (side === 'l') left = clamp(left + add);
        else right = clamp(right + add);
        paint();
        if (Math.abs(vel) > 0.6) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      paint();
    }

    stage.addEventListener('pointerup', release);
    stage.addEventListener('pointercancel', release);

    stage.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        left = clamp(left + 0.08);
        paint();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        right = clamp(right + 0.08);
        paint();
      } else if (e.key === 'Home' || e.key === 'Escape') {
        e.preventDefault();
        left = 0;
        right = 0;
        paint();
      }
    });

    paint();
  }

  /* ── Fade-in Observer ── */
  function observeFadeIn() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in:not(.visible)').forEach(el => observer.observe(el));
  }

  function applyCurtainImages() {
    document.querySelectorAll('[data-curtain-img]').forEach(el => {
      const folder = el.dataset.curtainImg;
      const urls = ImageLib.getAll(folder);
      const index = parseInt(el.dataset.curtainIndex || '0', 10);

      if (!urls.length) {
        el.src = curtainImg(folder, index);
        return;
      }

      el.src = urls[index] || urls[0];

      if (urls.length < 2) return;

      const host = el.closest('a, .category-card, .collection-card, .fabric-card, .fabric-swatch, .collection-editorial-image, .fabric-page-card-image') || el;
      let idx = index;
      let timer = null;

      host.addEventListener('mouseenter', () => {
        if (timer) return;
        timer = setInterval(() => {
          idx = (idx + 1) % urls.length;
          el.src = urls[idx];
        }, 900);
      });

      host.addEventListener('mouseleave', () => {
        if (timer) clearInterval(timer);
        timer = null;
        idx = index;
        el.src = urls[index] || urls[0];
      });
    });

    document.querySelectorAll('[data-curtain-img]').forEach(el => {
      const folder = el.dataset.curtainImg;
      const card = el.closest('.category-card, .collection-card, .fabric-card, a.category-card, a.collection-card, a.fabric-card');
      if (card && !ImageLib.has(folder)) card.hidden = true;
    });
  }

  function initProductCardGalleryCycle() {
    /* Keep catalog card images fixed — no hover/click gallery swap */
  }

  window.initHeroSlideshow = function () {
    const bg = document.getElementById('hero-slideshow');
    const dotsContainer = document.getElementById('hero-dots');
    const slideUrls = PAJOMAR.heroSlides;

    if (bg && slideUrls?.length) {
      bg.innerHTML = slideUrls.map((url, i) => `
        <div class="hero-slide${i === 0 ? ' is-active' : ''}">
          <img src="${url}" alt="">
        </div>
      `).join('');

      if (dotsContainer) {
        dotsContainer.innerHTML = slideUrls.map((_, i) => `
          <button type="button" class="hero-dot${i === 0 ? ' is-active' : ''}" aria-label="Slide ${i + 1}" aria-selected="${i === 0 ? 'true' : 'false'}"></button>
        `).join('');
      }
    }

    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');
    if (!slides.length) return;

    let current = 0;
    let timer = null;
    const interval = 5500;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function restartKenBurns(slide) {
      if (reducedMotion) return;
      const img = slide.querySelector('img');
      if (!img) return;
      img.style.animation = 'none';
      void img.offsetHeight;
      img.style.animation = '';
    }

    function goTo(index) {
      slides[current].classList.remove('is-active');
      dots[current]?.classList.remove('is-active');
      dots[current]?.setAttribute('aria-selected', 'false');
      current = index;
      slides[current].classList.add('is-active');
      dots[current]?.classList.add('is-active');
      dots[current]?.setAttribute('aria-selected', 'true');
      restartKenBurns(slides[current]);
    }

    function next() {
      goTo((current + 1) % slides.length);
    }

    function startTimer() {
      if (timer) clearInterval(timer);
      if (!reducedMotion) timer = setInterval(next, interval);
    }

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        if (i === current) return;
        goTo(i);
        startTimer();
      });
    });

    startTimer();
  };

  function waitForImages(images, timeout = 3500) {
    const list = Array.from(images).filter(Boolean);
    if (!list.length) return Promise.resolve();

    return Promise.race([
      Promise.all(list.map(img => {
        if (img.complete && img.naturalWidth > 0) return Promise.resolve();
        return new Promise(resolve => {
          img.addEventListener('load', resolve, { once: true });
          img.addEventListener('error', resolve, { once: true });
        });
      })),
      new Promise(resolve => setTimeout(resolve, timeout))
    ]);
  }

  function ensurePageLoader() {
    let loader = document.getElementById('page-loader');
    if (!loader) {
      loader = document.createElement('div');
      loader.id = 'page-loader';
      loader.className = 'page-loader';
      loader.setAttribute('role', 'status');
      loader.setAttribute('aria-live', 'polite');
      loader.setAttribute('aria-busy', 'true');
      loader.innerHTML = `
        <div class="page-loader__inner" aria-hidden="true">
          <div class="page-loader__logo"><img src="assets/logo.jpg" alt=""></div>
        </div>
      `;
      loader.setAttribute('aria-label', 'PAJOMAR');
      document.body.prepend(loader);
    }
    document.documentElement.classList.add('is-loading');
    return loader;
  }

  function dismissPageLoader(loader) {
    if (!loader || loader.classList.contains('is-done')) return;
    loader.classList.add('is-done');
    loader.setAttribute('aria-busy', 'false');
    document.documentElement.classList.remove('is-loading');
    const finish = () => {
      loader.classList.add('is-gone');
      loader.remove();
    };
    loader.addEventListener('transitionend', finish, { once: true });
    setTimeout(finish, 400);
  }

  async function initPageLoader() {
    const loader = ensurePageLoader();
    const started = performance.now();
    const minShow = 500;

    const priority = [
      ...document.querySelectorAll('#hero-slideshow img'),
      ...document.querySelectorAll('#home-cat-grid img'),
      ...document.querySelectorAll('#product-grid img'),
      ...document.querySelectorAll('.product-gallery img, .about-image img, [data-curtain-img]')
    ].slice(0, 10);

    await waitForImages(priority.length ? priority : document.querySelectorAll('img'), 3500);

    const elapsed = performance.now() - started;
    if (elapsed < minShow) {
      await new Promise(r => setTimeout(r, minShow - elapsed));
    }
    dismissPageLoader(loader);
  }

  function initConsultFaq() {
    const list = document.getElementById('faq-list');
    if (!list) return;
    list.querySelectorAll('.faq-q').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        const open = item.classList.contains('open');
        list.querySelectorAll('.faq-item').forEach(el => {
          el.classList.remove('open');
          el.querySelector('.faq-q')?.setAttribute('aria-expanded', 'false');
        });
        if (!open) {
          item.classList.add('open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  /* ── Small projects portfolio (مشاريع صغيره) ── */
  function photosLabel(count) {
    const n = Number(count) || 0;
    return t('projects.photos').replace('{n}', String(n));
  }

  function renderProjectTile(project, index = 0) {
    const gallery = (project.gallery || []).filter(Boolean);
    const thumbs = gallery.slice(0, 3);
    const mediaClass = thumbs.length <= 1
      ? 'project-tile-media project-tile-media--single'
      : thumbs.length === 2
        ? 'project-tile-media project-tile-media--duo'
        : 'project-tile-media';
    const imgs = thumbs.map((src, i) =>
      `<img src="${src}" alt="" loading="${index < 4 && i === 0 ? 'eager' : 'lazy'}" decoding="async">`
    ).join('');
    return `
      <a href="project.html?id=${encodeURIComponent(project.id)}" class="project-tile fade-in">
        <div class="${mediaClass}">${imgs}</div>
        <div class="project-tile-shade" aria-hidden="true"></div>
        <div class="project-tile-meta">
          <h3>${esc(project.name)}</h3>
          <span>${esc(photosLabel(project.count || gallery.length))}</span>
        </div>
      </a>`;
  }

  window.initProjectsPage = function () {
    const grid = document.getElementById('projects-grid');
    const countEl = document.getElementById('projects-count');
    const heroMedia = document.getElementById('projects-hero-media');
    const projects = PAJOMAR.smallProjects || [];

    if (heroMedia) {
      const covers = projects
        .map((p) => p.image)
        .filter((src) => src && !src.includes('_fallback'))
        .slice(0, 3);
      heroMedia.innerHTML = covers.map((src) => `<img src="${src}" alt="">`).join('');
    }

    if (countEl) {
      countEl.textContent = t('projects.count').replace('{n}', String(projects.length));
    }

    if (grid) {
      grid.innerHTML = projects.length
        ? projects.map(renderProjectTile).join('')
        : `<p class="empty-state">${esc(t('projects.empty'))}</p>`;
    }

    observeFadeIn();
    window._projectsRender = initProjectsPage;
  };

  window.initProjectDetailPage = function () {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const projects = PAJOMAR.smallProjects || [];
    const project = projects.find((p) => p.id === id || p.folder === id);
    const head = document.getElementById('project-detail-head');
    const galleryEl = document.getElementById('project-gallery');
    const relatedEl = document.getElementById('related-projects');

    if (!project) {
      if (head) head.innerHTML = `<p class="empty-state">${esc(t('projects.notFound'))}</p>`;
      if (galleryEl) galleryEl.innerHTML = '';
      return;
    }

    document.title = `${project.name} — PAJOMAR`;

    if (head) {
      head.innerHTML = `
        <p class="eyebrow">${esc(t('projects.eyebrow'))}</p>
        <h1>${esc(project.name)}</h1>
        <p>${esc(photosLabel(project.count || project.gallery.length))}</p>`;
    }

    if (galleryEl) {
      const gallery = project.gallery || [];
      galleryEl.innerHTML = gallery.map((src, i) => `
        <figure class="fade-in">
          <img src="${src}" alt="${esc(project.name)} ${i + 1}" loading="${i < 2 ? 'eager' : 'lazy'}" decoding="async">
        </figure>`).join('');
    }

    if (relatedEl) {
      const related = projects.filter((p) => p.id !== project.id).slice(0, 4);
      relatedEl.innerHTML = related.map(renderProjectTile).join('');
    }

    observeFadeIn();
    window._projectDetailRender = initProjectDetailPage;
  };

  /* ── Init ── */
  document.addEventListener('DOMContentLoaded', () => {
    ensurePageLoader();
    I18n.init();
    injectHeader();
    injectFooter();
    injectMobileTopBar();
    injectMobileNav();
    injectMobileMenu();
    injectMobileCategories();
    injectMobileSearch();
    injectDesktopSearch();
    injectWhatsApp();
    injectThemeToggle();
    observeFadeIn();
    initHeroSlideshow();
    applyCurtainImages();
    initHomePage();
    initProductCardGalleryCycle();
    if (document.getElementById('product-detail')) initProductPage();
    initConsultFaq();
    document.querySelectorAll('[data-wa-link]').forEach(a => {
      a.href = `https://wa.me/${PAJOMAR.whatsapp}`;
    });
    fillContactExtras();
    initContactWhatsAppForm();
    I18n.apply();
    setTimeout(() => initPageLoader(), 0);

    document.addEventListener('error', (e) => {
      if (e.target.tagName === 'IMG' && !e.target.dataset.fallback) {
        e.target.dataset.fallback = '1';
        e.target.src = curtainImg('hero');
      }
    }, true);

    I18n.onChange(() => {
      rebuildUI();
      I18n.apply();
    });

    document.querySelectorAll('[data-init]').forEach(el => {
      const fn = window[el.dataset.init];
      if (typeof fn === 'function') fn();
    });
  });
})();
