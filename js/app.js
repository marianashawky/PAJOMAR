/* PAJOMAR — Main Application */
(function () {
  'use strict';

  const ICONS = {
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3-3"/></svg>',
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1v-9.5z"/></svg>',
    grid: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    chevron: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 9l6 6 6-6"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>',
    filter: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 6h16M7 12h10M10 18h4"/></svg>',
    globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>'
  };

  function langSwitchHTML(extraClass) {
    return `<button type="button" class="lang-switch-btn${extraClass ? ' ' + extraClass : ''}" aria-label="${I18n.switchAriaLabel()}">
      <span class="lang-switch-icon" aria-hidden="true">${ICONS.globe}</span>
      <span class="lang-switch-text">${I18n.switchLabel()}</span>
    </button>`;
  }

  const PAGE_MAP = {
    'index.html': 'home',
    '': 'home',
    'curtains.html': 'categories',
    'collections.html': 'menu',
    'custom-curtains.html': 'menu',
    'about.html': 'menu',
    'contact.html': 'menu',
    'product.html': 'categories'
  };

  function t(key) { return I18n.t(key); }

  function logoHTML(variant) {
    const isFooter = variant === 'footer';
    return `
      <a href="index.html" class="logo logo-lockup${isFooter ? ' logo-lockup--footer' : ''}" aria-label="PAJOMAR Home">
        <span class="logo-mark"><img src="assets/logo.jpg" alt=""></span>
        <span class="logo-wordmark">
          <span class="logo-name">PAJOMAR</span>
          <span class="logo-tagline">Shutters &amp; Curtains</span>
        </span>
      </a>`;
  }

  /* ── Search ── */
  function searchProducts(query) {
    if (!query || query.length < 1) return [];
    const q = query.toLowerCase();
    return (PAJOMAR.folders || []).filter(f =>
      f.folder.toLowerCase().includes(q) ||
      f.name.toLowerCase().includes(q) ||
      folderDisplayName(f.folder).toLowerCase().includes(q)
    ).slice(0, 8).map(f => ({
      id: f.folder,
      name: folderDisplayName(f.folder),
      image: f.image,
      type: f.folder,
      collection: f.folder
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
      <a href="curtains.html?folder=${encodeURIComponent(p.id)}" class="search-result-item">
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
      sheer: 'type.sheer', blackout: 'type.blackout', decorative: 'type.decorative',
      classic: 'type.classic', modern: 'type.modern', custom: 'type.custom',
      living: 'room.livingRoom', bedroom: 'room.bedroom', dining: 'room.diningRoom',
      office: 'room.office', white: 'color.white'
    };
    if (known[folder]) return t(known[folder]);
    const item = PAJOMAR.folders.find(f => f.folder === folder || f.slug === folder);
    return item ? item.name : folder;
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
          <div class="nav-item has-mega">
            <a href="curtains.html" class="nav-link" data-page="curtains">${t('nav.curtains')}</a>
            <div class="mega-menu" role="menu">
              <div class="mega-grid mega-grid-folders">
                <div class="mega-col" style="grid-column:1/-1">
                  <h4>${t('filter.folder')}</h4>
                  <div class="mega-folder-list">
                  ${PAJOMAR.folders.map(f => `
                    <a href="curtains.html?folder=${encodeURIComponent(f.folder)}" class="mega-link">
                      <img src="${f.image}" alt="" loading="lazy">
                      ${esc(folderDisplayName(f.folder))}
                    </a>
                  `).join('')}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <a href="collections.html" class="nav-link" data-page="collections">${t('nav.collections')}</a>
          <a href="custom-curtains.html" class="nav-link" data-page="custom">${t('nav.custom')}</a>
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
      if (href.includes(page) || (page === 'index' && href === 'home') || (page === 'product' && href === 'curtains')) {
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
    const item = header.querySelector('.has-mega');
    if (!item) return;
    let timeout;
    item.addEventListener('mouseenter', () => { clearTimeout(timeout); item.classList.add('open'); });
    item.addEventListener('mouseleave', () => { timeout = setTimeout(() => item.classList.remove('open'), 200); });
    item.querySelector('.nav-link').addEventListener('click', (e) => {
      if (window.innerWidth <= 1024) {
        e.preventDefault();
        item.classList.toggle('open');
      }
    });
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
          ${ICONS.home}<span>${t('nav.home')}</span>
        </a>
        <button class="mobile-nav-item${current === 'categories' ? ' active' : ''}" data-nav="categories" aria-label="${t('nav.categories')}">
          ${ICONS.grid}<span>${t('nav.categories')}</span>
        </button>
        <button class="mobile-nav-item${current === 'search' ? ' active' : ''}" data-nav="search" aria-label="${t('nav.search')}">
          ${ICONS.search}<span>${t('nav.search')}</span>
        </button>
        <button class="mobile-nav-item${current === 'menu' ? ' active' : ''}" data-nav="menu" aria-label="${t('nav.menu')}">
          ${ICONS.menu}<span>${t('nav.menu')}</span>
        </button>
      </div>
    `;
    document.body.appendChild(nav);

    nav.querySelector('[data-nav="categories"]').addEventListener('click', () => toggleMobileCategories(true));
    nav.querySelector('[data-nav="search"]').addEventListener('click', () => toggleMobileSearch(true));
    nav.querySelector('[data-nav="menu"]').addEventListener('click', () => toggleMobileMenu(true));
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
        <button class="mobile-menu-accordion-btn" data-accordion="curtains">
          ${t('nav.curtains')} ${ICONS.chevron}
        </button>
        <div class="mobile-menu-sub" data-sub="curtains">
          <h5>${t('filter.folder')}</h5>
          <div class="mobile-menu-folders">
            ${PAJOMAR.folders.map(f => `
              <a href="curtains.html?folder=${encodeURIComponent(f.folder)}" class="mobile-menu-folder">
                <img src="${f.image}" alt="" loading="lazy">
                <span>${esc(folderDisplayName(f.folder))}</span>
              </a>
            `).join('')}
          </div>
        </div>
        <a href="collections.html" class="mobile-menu-link">${t('nav.collections')}</a>
        <a href="custom-curtains.html" class="mobile-menu-link">${t('nav.custom')}</a>
        <a href="about.html" class="mobile-menu-link">${t('nav.about')}</a>
        <a href="contact.html" class="mobile-menu-link">${t('nav.contact')}</a>
        <a href="contact.html#quote" class="btn btn-primary mobile-menu-cta">${t('nav.quote')}</a>
      </nav>
    `;
    document.body.append(overlay, drawer);

    drawer.querySelector('.lang-switch-btn').addEventListener('click', () => I18n.toggleLang());
    drawer.querySelector('.mobile-menu-close').addEventListener('click', () => toggleMobileMenu(false));
    drawer.querySelector('[data-accordion="curtains"]').addEventListener('click', function () {
      this.classList.toggle('open');
      drawer.querySelector('[data-sub="curtains"]').classList.toggle('open');
    });
  }

  function toggleMobileMenu(open) {
    const overlay = document.querySelector('.mobile-menu-overlay');
    const drawer = document.querySelector('.mobile-menu-drawer');
    const btn = document.querySelector('[data-nav="menu"]');
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
        ${PAJOMAR.folders.map(f => `
          <a href="curtains.html?folder=${encodeURIComponent(f.folder)}" class="mobile-cat-card">
            <img src="${f.image}" alt="${esc(folderDisplayName(f.folder))}" loading="lazy">
            <span>${esc(folderDisplayName(f.folder))}</span>
          </a>
        `).join('')}
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
    btn.setAttribute('aria-label', 'Chat with us on WhatsApp');
    btn.innerHTML = ICONS.whatsapp;
    document.body.appendChild(btn);
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
          </div>
          <div class="footer-col">
            <h4>${t('footer.shop')}</h4>
            <a href="curtains.html">${t('nav.curtains')}</a>
            <a href="collections.html">${t('nav.collections')}</a>
            <a href="custom-curtains.html">${t('nav.custom')}</a>
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
            <a href="contact.html">${t('footer.consultation')}</a>
            <a href="contact.html">${t('footer.installation')}</a>
          </div>
        </div>
        <div class="footer-bottom">
          <span>&copy; ${new Date().getFullYear()} PAJOMAR Shutters & Curtains. ${t('footer.rights')}</span>
          <span>${t('footer.crafted')}</span>
        </div>
      </div>
    `;
    document.body.appendChild(footer);
  }

  /* ── Product Card Renderer ── */
  window.renderProductCard = function (product) {
    const pt = I18n.translateProduct(product);
    const folderId = product.folderId || product.imageFolder || product.id;
    const gallery = product.gallery?.length ? product.gallery : [product.image, product.imageSecondary].filter(Boolean);
    const galleryJson = JSON.stringify(gallery).replace(/"/g, '&quot;');
    const href = `product.html?id=${encodeURIComponent(folderId)}${product.galleryIndex != null ? `&img=${product.galleryIndex}` : ''}`;

    return `
      <article class="product-card fade-in">
        <div class="product-card-image" data-gallery="${galleryJson}">
          <a href="${href}">
            <img class="img-primary" src="${product.image}" alt="${esc(pt.name)}" loading="lazy">
            ${gallery.length > 1 ? `<img class="img-secondary" src="${product.imageSecondary || gallery[1]}" alt="" loading="lazy">` : ''}
          </a>
          <div class="product-card-actions">
            <button class="btn quick-view-btn" data-id="${esc(folderId)}" data-img="${product.galleryIndex ?? 0}">${t('product.quickView')}</button>
            <a href="${href}" class="btn">${t('product.viewProduct')}</a>
          </div>
        </div>
        <div class="product-card-info">
          <a href="${href}"><h3>${esc(folderDisplayName(folderId))}</h3></a>
          <p class="product-card-meta">${gallery.length} ${gallery.length === 1 ? t('listing.product') : t('listing.products')}</p>
          <a href="contact.html#quote" class="product-card-request">${t('product.requestProduct')}</a>
        </div>
      </article>
    `;
  };

  /* ── Filters & Listing — driven only by image folders ── */
  window.initCurtainsPage = function () {
    const grid = document.getElementById('product-grid');
    if (!grid) return;

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
      let items = [...(PAJOMAR.listingItems || [])];

      if (state.folders.length) {
        items = items.filter(p => state.folders.includes(p.folderId || p.imageFolder));
      }

      if (state.search) {
        const q = state.search.toLowerCase();
        items = items.filter(p =>
          (p.folderId || p.imageFolder || '').toLowerCase().includes(q) ||
          (p.name || '').toLowerCase().includes(q)
        );
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

    function clearAllFilters() {
      state.folders = [];
      state.search = '';
      syncFilterUI();
      render();
    }

    initFilterDrawer();
    bindFilterInputs();
    syncFilterUI();
    render();

    window._curtainsRender = () => {
      const filterHTML = getFilterHTML();
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
      || PAJOMAR.products.find(p => p.imageFolder === id);
    const container = document.getElementById('product-detail');
    if (!product || !container) {
      if (container) container.innerHTML = '<p class="empty-state">' + t('product.notFound') + '</p>';
      return;
    }

    const label = folderDisplayName(product.imageFolder || product.id);
    document.title = label + ' — PAJOMAR';

    const gallery = product.gallery || [product.image, product.imageSecondary].filter(Boolean);
    const uniqueGallery = [...new Set(gallery)];
    const activeIndex = Math.min(Math.max(startImg, 0), uniqueGallery.length - 1);

    container.innerHTML = `
      <div class="product-gallery">
        <div class="product-gallery-main">
          <img id="main-image" src="${uniqueGallery[activeIndex]}" alt="${esc(label)}">
        </div>
        ${uniqueGallery.length > 1 ? `
        <div class="product-gallery-thumbs">
          ${uniqueGallery.map((src, i) => `
            <button class="${i === activeIndex ? 'active' : ''}" data-src="${src}"><img src="${src}" alt=""></button>
          `).join('')}
        </div>` : ''}
      </div>
      <div class="product-info">
        <p class="eyebrow">${esc(t('filter.folder'))}</p>
        <h1>${esc(label)}</h1>
        <div class="product-meta-row">
          <div class="product-meta-item"><label>${t('filter.folder')}</label><span>${esc(label)}</span></div>
          <div class="product-meta-item"><label>${t('listing.products')}</label><span>${uniqueGallery.length}</span></div>
        </div>
        <div class="product-actions">
          <a href="contact.html#quote" class="btn btn-primary">${t('product.requestProduct')}</a>
          <a href="curtains.html?folder=${encodeURIComponent(product.imageFolder || product.id)}" class="btn btn-outline">${t('nav.curtains')}</a>
        </div>
      </div>
    `;

    container.querySelectorAll('.product-gallery-thumbs button').forEach(btn => {
      btn.addEventListener('click', () => {
        container.querySelectorAll('.product-gallery-thumbs button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById('main-image').src = btn.dataset.src;
      });
    });

    const related = PAJOMAR.products.filter(p => p.id !== product.id).slice(0, 4);
    const relatedGrid = document.getElementById('related-grid');
    if (relatedGrid) {
      relatedGrid.innerHTML = related.map(renderProductCard).join('');
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
    const label = folderDisplayName(product.imageFolder || product.id);
    const gallery = product.gallery || [product.image];
    const src = gallery[imgIndex] || gallery[0] || product.image;
    let modal = document.getElementById('quick-view-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'quick-view-modal';
      modal.className = 'modal-overlay';
      document.body.appendChild(modal);
    }
    modal.innerHTML = `
      <div class="modal-content" style="display:grid;grid-template-columns:1fr 1fr;gap:32px;padding:32px">
        <img src="${src}" alt="${esc(label)}" style="width:100%;border-radius:8px;object-fit:cover">
        <div>
          <button class="search-close" style="float:right" aria-label="Close">${ICONS.close}</button>
          <p class="eyebrow">${esc(t('filter.folder'))}</p>
          <h2 style="margin:8px 0">${esc(label)}</h2>
          <a href="product.html?id=${encodeURIComponent(product.id)}&img=${imgIndex}" class="btn btn-primary">${t('product.viewProduct')}</a>
          <a href="contact.html#quote" class="btn btn-outline" style="margin-inline-start:8px">${t('product.requestProduct')}</a>
        </div>
      </div>
    `;
    modal.classList.add('open');
    modal.querySelector('.search-close').addEventListener('click', () => modal.classList.remove('open'));
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('open'); });
  }

  /* ── Filter Sidebar Template ── */
  window.initCollectionsPage = function () {
    const list = document.getElementById('collections-list');
    if (!list) return;

    function render() {
      list.innerHTML = (PAJOMAR.folders || []).map(f => `
        <article class="collection-editorial-item fade-in" id="${esc(f.folder)}">
          <div class="collection-editorial-image">
            <img src="${f.image}" alt="${esc(folderDisplayName(f.folder))}" loading="lazy">
          </div>
          <div class="collection-editorial-text">
            <p class="eyebrow">${esc(f.folder)}</p>
            <h2 class="display-md">${esc(folderDisplayName(f.folder))}</h2>
            <a href="curtains.html?folder=${encodeURIComponent(f.folder)}" class="btn btn-primary btn-sm">${t('collections.exploreBtn')}</a>
          </div>
        </article>
      `).join('');
      observeFadeIn();
    }

    render();
    window._collectionsRender = render;
  };

  window.getFilterHTML = function () {
    const folders = PAJOMAR.folders || [];

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
    injectMobileNav();
    injectMobileMenu();
    injectMobileCategories();
    injectMobileSearch();
    injectDesktopSearch();
    if (typeof window._curtainsRender === 'function') window._curtainsRender();
    if (typeof window._productRender === 'function') window._productRender();
    if (typeof window._collectionsRender === 'function') window._collectionsRender();
    applyCurtainImages();
    initProductCardGalleryCycle();
    initHomePage();
    const relatedTitle = document.querySelector('.related-section h2');
    if (relatedTitle) relatedTitle.textContent = t('product.related');
  }

  function initHomePage() {
    if (!document.body.classList.contains('page-home') && !document.getElementById('home-cat-grid')) return;

    const folders = PAJOMAR.folders || [];
    const grid = document.getElementById('home-cat-grid');
    const stories = document.getElementById('home-stories');
    const projectMedia = document.getElementById('home-project-media');
    const newsForm = document.getElementById('home-newsletter-form');

    if (grid) {
      let marketing = (PAJOMAR.homeMarketing || []).slice(0, 4);
      if (!marketing.length && typeof ImageLib !== 'undefined') {
        const folder = PAJOMAR.homeMarketingFolder || 'صور تسويق';
        marketing = ImageLib.getAll(folder).slice(0, 4);
      }
      grid.innerHTML = marketing.length
        ? marketing.map((src, i) => `
            <a href="curtains.html" class="home-cat-card fade-in visible">
              <img src="${src}" alt="" loading="${i === 0 ? 'eager' : 'lazy'}">
            </a>
          `).join('')
        : '';
    }

    if (stories) {
      stories.innerHTML = folders.slice(0, 3).map((f, i) => `
        <article class="home-story fade-in${i === 0 ? ' home-story--feature' : ''}">
          <a href="curtains.html?folder=${encodeURIComponent(f.folder)}" class="home-story-media">
            <img src="${f.image}" alt="${esc(folderDisplayName(f.folder))}" loading="lazy">
          </a>
          <div class="home-story-body">
            <h3>${esc(folderDisplayName(f.folder))}</h3>
            <p>${esc(t('home.stories.cardText').replace('{name}', folderDisplayName(f.folder)))}</p>
            <a href="curtains.html?folder=${encodeURIComponent(f.folder)}" class="link-arrow">${esc(t('home.stories.view'))}</a>
          </div>
        </article>
      `).join('');
    }

    if (projectMedia && folders[0]) {
      const imgs = (folders[0].gallery || [folders[0].image]).slice(0, 3);
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

    observeFadeIn();
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
    document.querySelectorAll('.product-card-image[data-gallery]').forEach(container => {
      let gallery;
      try {
        gallery = JSON.parse(container.dataset.gallery || '[]');
      } catch {
        return;
      }
      if (gallery.length < 2) return;

      const card = container.closest('.product-card');
      const primary = container.querySelector('.img-primary');
      const secondary = container.querySelector('.img-secondary');
      let idx = 0;
      let timer = null;

      card?.addEventListener('mouseenter', () => {
        if (timer) return;
        timer = setInterval(() => {
          idx = (idx + 1) % gallery.length;
          if (primary) primary.src = gallery[idx];
          if (secondary) secondary.src = gallery[(idx + 1) % gallery.length];
        }, 900);
      });

      card?.addEventListener('mouseleave', () => {
        if (timer) clearInterval(timer);
        timer = null;
        idx = 0;
        if (primary) primary.src = gallery[0];
        if (secondary) secondary.src = gallery[1] || gallery[0];
      });
    });
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
          <span class="page-loader__ring"></span>
          <span class="page-loader__ring page-loader__ring--delay"></span>
          <div class="page-loader__mark"><span class="page-loader__letter">P</span></div>
          <div class="page-loader__folds"><span></span><span></span><span></span><span></span><span></span></div>
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
    const minShow = 400;

    const priority = [
      ...document.querySelectorAll('#hero-slideshow img'),
      ...document.querySelectorAll('#home-cat-grid img'),
      ...document.querySelectorAll('#product-grid img'),
      ...document.querySelectorAll('#collections-list img'),
      ...document.querySelectorAll('.product-gallery img, .about-image img, [data-curtain-img]')
    ].slice(0, 10);

    await waitForImages(priority.length ? priority : document.querySelectorAll('img'), 3500);

    const elapsed = performance.now() - started;
    if (elapsed < minShow) {
      await new Promise(r => setTimeout(r, minShow - elapsed));
    }
    dismissPageLoader(loader);
  }

  /* ── Init ── */
  document.addEventListener('DOMContentLoaded', () => {
    ensurePageLoader();
    I18n.init();
    injectHeader();
    injectFooter();
    injectMobileNav();
    injectMobileMenu();
    injectMobileCategories();
    injectMobileSearch();
    injectDesktopSearch();
    injectWhatsApp();
    observeFadeIn();
    initHeroSlideshow();
    applyCurtainImages();
    initHomePage();
    initProductCardGalleryCycle();
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
