const fs = require('fs');
const path = require('path');

const dir = 'd:/villa/luxora-villa/public/images';
const files = fs.readdirSync(dir).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));

let html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Luxora Villa Image Catalog</title>
  <style>
    body { background: #111; color: #eee; font-family: sans-serif; padding: 20px; }
    h1 { color: #C5A880; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px; }
    .card { background: #1a1e24; border: 1px solid #333; border-radius: 8px; overflow: hidden; display: flex; flex-direction: column; }
    .card img { width: 100%; height: 200px; object-fit: cover; background: #000; }
    .info { padding: 10px; font-size: 11px; }
    .name { word-break: break-all; font-weight: bold; color: #C5A880; margin-bottom: 4px; }
  </style>
</head>
<body>
  <h1>Luxora Villa Image Asset Catalog (${files.length} Photos)</h1>
  <div class="grid">
`;

files.forEach((file, idx) => {
  html += `
    <div class="card">
      <img src="/images/${encodeURIComponent(file)}" alt="${file}" loading="lazy" />
      <div class="info">
        <div class="name">#${idx + 1}: ${file}</div>
      </div>
    </div>
  `;
});

html += `
  </div>
</body>
</html>
`;

fs.writeFileSync('d:/villa/luxora-villa/public/contact-sheet.html', html);
console.log('Saved d:/villa/luxora-villa/public/contact-sheet.html');

