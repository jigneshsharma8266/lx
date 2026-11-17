const fs = require('fs');

async function testNotionPagination() {
  const collectionId = '3ad900b1-07b2-80ab-aecd-000b0ad98d90';
  const collectionViewId = '3ad900b1-07b2-8047-ab00-000c8f430b48';
  const spaceId = '2c1900b1-07b2-816a-a241-0003b848a35b';

  // Let's test with limits: 2000, 3000, 4000
  for (const limit of [1000, 2000, 2500, 3000]) {
    try {
      const res = await fetch('https://rohansurana.notion.site/api/v3/queryCollection', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          collection: { id: collectionId, spaceId },
          collectionView: { id: collectionViewId, spaceId },
          loader: {
            type: 'reducer',
            reducers: {
              collection_group_results: { type: 'results', limit }
            },
            searchQuery: '',
            userTimeZone: 'Asia/Kolkata'
          }
        })
      });
      const data = await res.json();
      const ids = data.result?.reducerResults?.collection_group_results?.blockIds || [];
      const blocksInMap = Object.keys(data.recordMap?.block || {}).length;
      console.log(`Limit: ${limit} -> Block IDs: ${ids.length}, Blocks in recordMap: ${blocksInMap}`);
    } catch (e) {
      console.log(`Limit ${limit} failed:`, e.message);
    }
  }
}

testNotionPagination();

