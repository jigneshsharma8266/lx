const https = require('https');

async function testNotion() {
  const pageId = '3ad900b1-07b2-8025-b057-c5b90f7bfe63';
  const viewId = '3ad900b1-07b2-8047-ab00-000c8f430b48';

  // Try loadPageChunk
  console.log('Testing loadPageChunk...');
  try {
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
    console.log('loadPageChunk status:', res.status);
    if (res.ok) {
      const data = await res.json();
      console.log('recordMap keys:', Object.keys(data.recordMap || {}));
      if (data.recordMap && data.recordMap.block) {
        console.log('Block count:', Object.keys(data.recordMap.block).length);
        const root = data.recordMap.block[pageId];
        if (root && root.value) {
          console.log('Root block type:', root.value.type);
          console.log('Root collection_id:', root.value.collection_id);
          console.log('Root view_ids:', root.value.view_ids);
        }
      }
      if (data.recordMap && data.recordMap.collection) {
        console.log('Collection keys:', Object.keys(data.recordMap.collection));
        for (const cid of Object.keys(data.recordMap.collection)) {
          const col = data.recordMap.collection[cid].value;
          console.log('Collection name:', JSON.stringify(col.name));
          console.log('Schema fields:', Object.keys(col.schema || {}).map(k => col.schema[k].name));
        }
      }
      return data;
    } else {
      const errText = await res.text();
      console.log('Error text:', errText.substring(0, 300));
    }
  } catch (err) {
    console.error('Fetch err:', err.message);
  }
}

testNotion();

