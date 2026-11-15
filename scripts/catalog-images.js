const fs = require('fs');
const path = require('path');

const dir = 'd:/villa/luxora-villa/public/images';
const files = fs.readdirSync(dir);

console.log('Total files in public/images:', files.length);
files.forEach((f, i) => {
  const fullPath = path.join(dir, f);
  const stat = fs.statSync(fullPath);
  if (stat.isFile()) {
    console.log(`${i + 1}. [${f}] - ${Math.round(stat.size / 1024)} KB`);
  }
});

