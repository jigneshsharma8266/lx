const fs = require('fs');

async function checkNotionViews() {
  const pageId = '3ad900b1-07b2-8025-b057-c5b90f7bfe63';
  const res = await fetch('https://rohansurana.notion.site/api/v3/loadPageChunk', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      pageId: pageId,
      limit: 100,
      cursor: { stack: [] },
      chunkNumber: 0,
      verticalColumns: false
    })
  });
  const data = await res.json();
  const rm = data.recordMap;
  
  console.log('Collection Views:');
  for (const [k, v] of Object.entries(rm.collection_view || {})) {
    console.log(k, v?.value?.value?.name, v?.value?.value?.type, v?.value?.value?.format);
  }

  // Check root block view_ids
  const root = rm.block[pageId]?.value?.value || rm.block[pageId]?.value;
  console.log('Root block view_ids:', root?.view_ids);
}

checkNotionViews();

