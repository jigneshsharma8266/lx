const fs = require('fs');

async function queryNotionCollection() {
  const collectionId = '3ad900b1-07b2-80ab-aecd-000b0ad98d90';
  const collectionViewId = '3ad900b1-07b2-8047-ab00-000c8f430b48';
  const spaceId = '2c1900b1-07b2-816a-a241-0003b848a35b';

  console.log('Querying collection...');
  try {
    const res = await fetch('https://rohansurana.notion.site/api/v3/queryCollection', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      body: JSON.stringify({
        collection: {
          id: collectionId,
          spaceId: spaceId
        },
        collectionView: {
          id: collectionViewId,
          spaceId: spaceId
        },
        loader: {
          type: 'reducer',
          reducers: {
            collection_group_results: {
              type: 'results',
              limit: 500
            }
          },
          searchQuery: '',
          userTimeZone: 'Asia/Kolkata'
        }
      })
    });

    console.log('queryCollection status:', res.status);
    if (!res.ok) {
      console.log('Error:', await res.text());
      return;
    }

    const data = await res.json();
    fs.writeFileSync('d:/villa/luxora-villa/scripts/collection_results.json', JSON.stringify(data, null, 2));
    console.log('Saved collection_results.json! Size:', fs.statSync('d:/villa/luxora-villa/scripts/collection_results.json').size);

    // Also let's inspect the collection schema from recordMap
    const col = data.recordMap?.collection?.[collectionId]?.value?.value || data.recordMap?.collection?.[collectionId]?.value;
    console.log('Collection name:', JSON.stringify(col?.name));
    console.log('Schema:', col?.schema ? Object.keys(col.schema).map(k => `${k}: ${col.schema[k].name} (${col.schema[k].type})`) : 'no schema');

    // How many blocks returned?
    const blockKeys = Object.keys(data.recordMap?.block || {});
    console.log('Total blocks returned:', blockKeys.length);
  } catch (err) {
    console.error('Err:', err);
  }
}

queryNotionCollection();

