const fs = require('fs');

async function fetchAndFilterJobs() {
  const collectionId = '3ad900b1-07b2-80ab-aecd-000b0ad98d90';
  const collectionViewId = '3ad900b1-07b2-8047-ab00-000c8f430b48';
  const spaceId = '2c1900b1-07b2-816a-a241-0003b848a35b';

  console.log('Fetching up to 2000 jobs from Notion database...');
  const res = await fetch('https://rohansurana.notion.site/api/v3/queryCollection', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      collection: { id: collectionId, spaceId },
      collectionView: { id: collectionViewId, spaceId },
      loader: {
        type: 'reducer',
        reducers: {
          collection_group_results: { type: 'results', limit: 2000 }
        },
        searchQuery: '',
        userTimeZone: 'Asia/Kolkata'
      }
    })
  });

  const data = await res.json();
  const blockMap = data.recordMap?.block || {};
  const blockIds = data.result?.reducerResults?.collection_group_results?.blockIds || [];

  console.log(`Retrieved ${blockIds.length} job IDs. Total blocks in map: ${Object.keys(blockMap).length}`);

  // Helper to extract text from Notion property array [[text, ...]]
  function getPropText(prop) {
    if (!prop || !Array.isArray(prop)) return '';
    return prop.map(part => part[0]).join('').trim();
  }

  // Schema:
  // title: Startup Name
  // ;G@T: Role (text)
  // =<T}: Location (text)
  // CKu?: Apply Link (url)
  // Eodb: Pay Range (text)
  // sr`K: Date Posted (date)
  // vuYV: Experience (text)
  // ybYy: Job Link (url)

  const allJobs = [];

  for (const id of blockIds) {
    const block = blockMap[id]?.value?.value || blockMap[id]?.value;
    if (!block || !block.properties) continue;

    const props = block.properties;
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

    allJobs.push({
      id,
      startupName,
      role,
      location,
      applyLink: applyLink || jobLink,
      jobLink,
      payRange,
      experience: exp,
      datePosted
    });
  }

  fs.writeFileSync('d:/villa/luxora-villa/scripts/all_jobs.json', JSON.stringify(allJobs, null, 2));
  console.log(`Saved ${allJobs.length} parsed jobs to all_jobs.json.`);

  // Let's analyze roles!
  const keywords = ['front', 'react', 'next', 'web', 'ui', 'mobile', 'native', 'software', 'sde', 'full stack', 'fullstack', 'typescript', 'frontend'];
  
  const matchedJobs = allJobs.filter(j => {
    const roleLower = j.role.toLowerCase();
    return keywords.some(kw => roleLower.includes(kw));
  });

  console.log(`Found ${matchedJobs.length} tech/frontend/engineering jobs!`);

  // Let's see some top front-end specific matches
  const frontendKeywords = ['front', 'react', 'next', 'ui', 'web dev', 'frontend', 'mobile', 'native'];
  const strictFrontend = allJobs.filter(j => {
    const r = j.role.toLowerCase();
    return frontendKeywords.some(kw => r.includes(kw));
  });
  console.log(`Specifically Front-End / React / Mobile / UI matches: ${strictFrontend.length}`);

  // Sample
  console.log('Sample matched roles:');
  strictFrontend.slice(0, 15).forEach((j, i) => {
    console.log(`${i+1}. [${j.startupName}] ${j.role} | Exp: ${j.experience} | Loc: ${j.location} | Link: ${j.applyLink}`);
  });
}

fetchAndFilterJobs();

