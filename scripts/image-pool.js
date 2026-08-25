/* Curated 4K interior/curtain photo URLs (Pexels + Unsplash, free license) */
(function (global) {
  'use strict';

  function pexels(id) {
    return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=3840`;
  }

  function unsplash(photoId, crop) {
    const base = `https://images.unsplash.com/${photoId}?w=3840&q=85&auto=format&fit=crop`;
    return crop ? `${base}&crop=${crop}` : base;
  }

  const PEXELS = [
    4915532, 8959008, 5712827, 31588111, 6782480, 17918540, 31167225, 29012628,
    31267713, 19899070, 20360852, 36693207, 7340487, 36547498, 35979770, 37252662,
    37331166, 35494095, 5716703, 4389917, 37609127, 17092242, 8238770, 29623050
  ];

  const UNSPLASH = [
    'photo-1754611380518-61a923cc47ca',
    'photo-1761824615063-52a426692aab',
    'photo-1754613411942-f2dee061753b',
    'photo-1661785883348-2b97b05a6819',
    'photo-1573507811472-909cd17e834d',
    'photo-1530914507926-36d0f98a9f1f',
    'photo-1706817969183-908d5b67d465',
    'photo-1473252812967-d565c3607e28',
    'photo-1570427224050-b080ad19e3c4',
    'photo-1574197635162-68e4b468e4e9',
    'photo-1528822855841-e8bf3134cdc9',
    'photo-1577926606472-fc6d3a33f7e1',
    'photo-1752407828538-17e055766592',
    'photo-1755005488096-b4dd56bd750e',
    'photo-1578337834535-357ad7dccdfd',
    'photo-1508778552286-12d4c6007799',
    'photo-1513111168953-34fc252c9279',
    'photo-1514306191717-452ec28c7814',
    'photo-1519035350952-38d18a3848cf',
    'photo-1616434602533-32fcefcc3621'
  ];

  const CROPS = ['entropy', 'edges', 'top', 'bottom'];

  const BASE_URLS = [
    ...PEXELS.map(pexels),
    ...UNSPLASH.map((id) => unsplash(id)),
    ...UNSPLASH.slice(0, 12).map((id) => unsplash(id, 'edges')),
    ...PEXELS.slice(0, 12).map((id) => pexels(id)).map((url) => url.replace('w=3840', 'w=3840&h=2160&fit=crop'))
  ];

  /** Category-tuned picks (best match first) */
  const FOLDER_PICKS = {
    hero: [6782480, 36693207, 19899070, 7340487, 20360852, 17918540, 29012628, 31267713, 37331166, 36547498,
      'photo-1754611380518-61a923cc47ca', 'photo-1754613411942-f2dee061753b', 'photo-1577926606472-fc6d3a33f7e1'],
    sheer: [4915532, 35494095, 5712827, 7340487, 4389917, 29623050, 35979770, 8959008, 29012628, 37252662,
      'photo-1528822855841-e8bf3134cdc9', 'photo-1752407828538-17e055766592', 'photo-1755005488096-b4dd56bd750e'],
    blackout: [8238770, 4389917, 17918540, 'photo-1761824615063-52a426692aab', 'photo-1661785883348-2b97b05a6819',
      'photo-1519035350952-38d18a3848cf', 'photo-1508778552286-12d4c6007799', 'photo-1513111168953-34fc252c9279',
      'photo-1514306191717-452ec28c7814', 17092242, 31588111, 'photo-1616434602533-32fcefcc3621'],
    decorative: [31167225, 8959008, 17092242, 31588111, 37331166, 36547498, 37252662, 35979770,
      'photo-1578337834535-357ad7dccdfd', 'photo-1519035350952-38d18a3848cf', 'photo-1661785883348-2b97b05a6819'],
    classic: [31588111, 5712827, 17092242, 8238770, 'photo-1661785883348-2b97b05a6819',
      'photo-1473252812967-d565c3607e28', 'photo-1514306191717-452ec28c7814', 5716703, 37331166, 35979770],
    modern: [36693207, 19899070, 6782480, 29012628, 31267713, 37609127, 7340487,
      'photo-1577926606472-fc6d3a33f7e1', 'photo-1573507811472-909cd17e834d', 'photo-1530914507926-36d0f98a9f1f'],
    custom: [6782480, 36693207, 7340487, 37331166, 36547498, 37252662, 35979770, 35494095,
      'photo-1754611380518-61a923cc47ca', 'photo-1754613411942-f2dee061753b'],
    white: [4915532, 5712827, 35494095, 36547498, 37331166, 4389917, 29623050,
      'photo-1573507811472-909cd17e834d', 'photo-1570427224050-b080ad19e3c4', 'photo-1574197635162-68e4b468e4e9'],
    bedroom: [4389917, 31267713, 35494095, 4915532, 29623050, 8238770,
      'photo-1752407828538-17e055766592', 'photo-1755005488096-b4dd56bd750e', 'photo-1754613411942-f2dee061753b'],
    living: [6782480, 7340487, 20360852, 36693207, 19899070, 17918540, 29012628,
      'photo-1577926606472-fc6d3a33f7e1', 'photo-1754611380518-61a923cc47ca', 'photo-1706817969183-908d5b67d465'],
    dining: [5716703, 17918540, 6782480, 37331166, 31167225, 7340487, 36693207,
      'photo-1473252812967-d565c3607e28', 'photo-1754611380518-61a923cc47ca'],
    office: [37609127, 36693207, 6782480, 19899070, 29012628, 7340487,
      'photo-1577926606472-fc6d3a33f7e1', 'photo-1530914507926-36d0f98a9f1f', 'photo-1573507811472-909cd17e834d']
  };

  function pickToUrl(pick, variant) {
    if (typeof pick === 'number') {
      const url = pexels(pick);
      if (!variant) return url;
      return `${url}&h=2160&fit=crop&crop=${CROPS[variant % CROPS.length]}`;
    }
    if (typeof pick === 'string' && pick.startsWith('photo-')) {
      return unsplash(pick, variant ? CROPS[variant % CROPS.length] : undefined);
    }
    return pick;
  }

  function urlsForFolder(folder, count = 10) {
    const picks = FOLDER_PICKS[folder] || [];
    const urls = [];
    const seen = new Set();
    let variant = 0;

    const add = (url) => {
      if (!url || seen.has(url)) return;
      seen.add(url);
      urls.push(url);
    };

    for (const pick of picks) {
      if (urls.length >= count) break;
      add(pickToUrl(pick, 0));
    }

    while (urls.length < count) {
      for (const pick of picks) {
        variant++;
        add(pickToUrl(pick, variant));
        if (urls.length >= count) break;
      }
      if (variant > 20) {
        for (const base of BASE_URLS) {
          add(base.replace('w=3840', `w=3840&crop=${CROPS[urls.length % CROPS.length]}`));
          if (urls.length >= count) break;
        }
      }
      if (variant > 40) break;
    }

    return urls.slice(0, count);
  }

  module.exports = { urlsForFolder, BASE_URLS, pexels, unsplash, FOLDER_PICKS };
})(typeof window !== 'undefined' ? window : global);
