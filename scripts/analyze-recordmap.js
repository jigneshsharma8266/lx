const fs = require('fs');

const data = JSON.parse(fs.readFileSync('d:/villa/luxora-villa/scripts/recordMap.json', 'utf8'));
const rm = data.recordMap;

console.log('--- COLLECTION ---');
for (const [k, v] of Object.entries(rm.collection || {})) {
  console.log('Collection ID:', k);
  console.log('Value:', JSON.stringify(v.value?.name), 'Parent ID:', v.value?.parent_id);
  console.log('Schema:', JSON.stringify(v.value?.schema, null, 2));
}

console.log('--- COLLECTION VIEW ---');
for (const [k, v] of Object.entries(rm.collection_view || {})) {
  console.log('View ID:', k);
  console.log('View name:', v.value?.name, 'type:', v.value?.type);
}

console.log('--- BLOCKS ---');
for (const [k, v] of Object.entries(rm.block || {})) {
  console.log('Block ID:', k, 'Type:', v.value?.type, 'Title:', JSON.stringify(v.value?.properties?.title));
}

