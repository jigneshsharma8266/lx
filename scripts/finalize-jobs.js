const fs = require('fs');

const jobs = JSON.parse(fs.readFileSync('d:/villa/luxora-villa/scripts/filtered_relevant_jobs.json', 'utf8'));

// Categorize into:
// 1. Core Software, Full Stack, SDE & Mobile Developer Roles
// 2. Founding Engineer, AI Engineer & Tech Lead Roles
// 3. Forward Deployed & GTM Engineer Roles
// 4. Product, Growth & Technical Strategy Roles (3+ to 5+ yrs)

const categories = {
  coreSoftware: [],
  foundingAndAi: [],
  fdeAndGtm: [],
  productAndGrowth: []
};

for (const j of jobs) {
  const r = (j.role || '').toLowerCase();

  if (r.includes('sde') || r.includes('full stack') || r.includes('full-stack') || r.includes('developer') || r.includes('mobile engineer') || r.includes('staff engineer') || r.includes('engineering manager')) {
    categories.coreSoftware.push(j);
  } else if (r.includes('founding engineer') || r.includes('ai engineer') || r.includes('tech lead') || r.includes('cto') || r.includes('founding team builder') || r.includes('ai builder') || r.includes('design engineer') || r.includes('ai harness')) {
    categories.foundingAndAi.push(j);
  } else if (r.includes('forward deployed engineer') || r.includes('gtm engineer') || r.includes('solutions engineer')) {
    categories.fdeAndGtm.push(j);
  } else {
    categories.productAndGrowth.push(j);
  }
}

console.log('Core Software/Dev:', categories.coreSoftware.length);
console.log('Founding / AI / Tech Lead:', categories.foundingAndAi.length);
console.log('Forward Deployed / GTM Engineer:', categories.fdeAndGtm.length);
console.log('Product & Growth (3-5+ yrs):', categories.productAndGrowth.length);

fs.writeFileSync('d:/villa/luxora-villa/scripts/categorized_final.json', JSON.stringify(categories, null, 2));

