const fs = require('fs');

async function searchNotionJobs() {
  const collectionId = '3ad900b1-07b2-80ab-aecd-000b0ad98d90';
  const collectionViewId = '3ad900b1-07b2-8047-ab00-000c8f430b48';
  const spaceId = '2c1900b1-07b2-816a-a241-0003b848a35b';

  const queries = [
    'engineer', 'developer', 'sde', 'mobile', 'frontend', 'front-end',
    'react', 'next', 'web', 'ui', 'full stack', 'fullstack', 'software',
    'tech', 'technical', 'founding', 'builder', 'ai', 'app', 'product'
  ];

  const allFoundBlocks = new Map();

  function getPropText(prop) {
    if (!prop || !Array.isArray(prop)) return '';
    return prop.map(part => part[0]).join('').trim();
  }

  for (const q of queries) {
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
              collection_group_results: { type: 'results', limit: 200 }
            },
            searchQuery: q,
            userTimeZone: 'Asia/Kolkata'
          }
        })
      });

      if (!res.ok) continue;

      const data = await res.json();
      const ids = data.result?.reducerResults?.collection_group_results?.blockIds || [];
      const blockMap = data.recordMap?.block || {};

      console.log(`Query "${q}" returned ${ids.length} matches.`);

      for (const id of ids) {
        if (allFoundBlocks.has(id)) continue;
        const b = blockMap[id]?.value?.value || blockMap[id]?.value;
        if (!b || !b.properties) continue;

        const props = b.properties;
        const startupName = getPropText(props.title);
        const role = getPropText(props[';G@T']);
        const location = getPropText(props['=<T}']);
        const applyLink = getPropText(props['CKu?']);
        const payRange = getPropText(props['Eodb']);
        const exp = getPropText(props['vuYV']);
        const jobLink = getPropText(props['ybYy']);
        
        let datePosted = '';
        const dateProp = props['sr`K'];
        if (dateProp && dateProp[0] && dateProp[0][1] && dateProp[0][1][0] && dateProp[0][1][0][1]) {
          datePosted = dateProp[0][1][0][1].start_date || '';
        } else {
          datePosted = getPropText(dateProp);
        }

        allFoundBlocks.set(id, {
          id,
          startupName,
          role,
          location,
          applyLink: applyLink || jobLink,
          jobLink,
          payRange,
          experience: exp,
          datePosted,
          matchedQuery: q
        });
      }
    } catch (e) {
      console.error(`Error for "${q}":`, e.message);
    }
  }

  const jobsList = Array.from(allFoundBlocks.values());
  console.log(`\nTotal unique jobs retrieved: ${jobsList.length}`);
  fs.writeFileSync('d:/villa/luxora-villa/scripts/queried_tech_jobs.json', JSON.stringify(jobsList, null, 2));
}

searchNotionJobs();

