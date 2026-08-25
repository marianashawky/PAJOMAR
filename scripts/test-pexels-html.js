const https = require('https');
const queries = ['bedroom curtains', 'living room curtains', 'blackout curtains', 'sheer curtains', 'modern interior curtains', 'white curtains', 'office window', 'dining room interior'];
function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    }).on('error', reject);
  });
}
(async () => {
  for (const q of queries) {
    const html = await get('https://www.pexels.com/search/' + encodeURIComponent(q) + '/');
    const ids = [...new Set(html.match(/photos\/(\d+)\//g) || [])].map(s => s.match(/\d+/)[0]);
    console.log(q, ids.length, ids.slice(0, 5));
    await new Promise(r => setTimeout(r, 500));
  }
})();
