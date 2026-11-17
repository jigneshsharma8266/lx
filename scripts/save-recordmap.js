const fs = require('fs');

async function inspectRecordMap() {
  const pageId = '3ad900b1-07b2-8025-b057-c5b90f7bfe63';
  const res = await fetch('https://rohansurana.notion.site/api/v3/loadPageChunk', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    },
    body: JSON.stringify({
      pageId: pageId,
      limit: 100,
      cursor: { stack: [] },
      chunkNumber: 0,
      verticalColumns: false
    })
  });
  const data = await res.json();
  fs.writeFileSync('d:/villa/luxora-villa/scripts/recordMap.json', JSON.stringify(data, null, 2));
  console.log('Saved recordMap.json. Size:', fs.statSync('d:/villa/luxora-villa/scripts/recordMap.json').size);
}

inspectRecordMap();

