const fs = require('fs');

const jobs = JSON.parse(fs.readFileSync('d:/villa/luxora-villa/scripts/all_jobs.json', 'utf8'));

console.log('Total jobs loaded:', jobs.length);

const techTerms = [
  'engineer', 'developer', 'frontend', 'front-end', 'front end',
  'react', 'next', 'typescript', 'javascript', 'web', 'ui', 'mobile',
  'sde', 'software', 'fullstack', 'full-stack', 'full stack',
  'technical', 'tech', 'builder', 'ai', 'product', 'cto', 'architect'
];

const matches = [];

for (const j of jobs) {
  const roleLower = (j.role || '').toLowerCase();
  const startupLower = (j.startupName || '').toLowerCase();
  
  // check if any term matches role
  const matchedTerm = techTerms.find(term => {
    // regex word boundary or exact match
    const regex = new RegExp(`\\b${term}\\b`, 'i');
    return regex.test(roleLower);
  });

  if (matchedTerm) {
    matches.push({
      ...j,
      matchedTerm
    });
  }
}

console.log(`\nFound ${matches.length} roles matching technical/developer/builder/product terms:`);

fs.writeFileSync('d:/villa/luxora-villa/scripts/tech_matches.json', JSON.stringify(matches, null, 2));

matches.forEach((m, i) => {
  console.log(`[${i+1}] Startup: ${m.startupName} | Role: ${m.role} | Exp: ${m.experience || 'Not specified'} | Loc: ${m.location || 'Not specified'} | Link: ${m.applyLink || 'N/A'}`);
});

