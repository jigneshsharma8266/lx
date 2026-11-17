const fs = require('fs');

const jobs = JSON.parse(fs.readFileSync('d:/villa/luxora-villa/scripts/queried_tech_jobs.json', 'utf8'));

console.log('Total jobs to evaluate:', jobs.length);

// Let's filter out purely marketing/sales/HR/legal/ops unless they involve engineering/tech building
const relevantRoles = [];

for (const j of jobs) {
  const role = (j.role || '').toLowerCase();
  
  // Check if it's an engineering / developer / tech builder / technical product role
  const isEng = 
    role.includes('engineer') ||
    role.includes('developer') ||
    role.includes('sde') ||
    role.includes('software') ||
    role.includes('frontend') ||
    role.includes('front-end') ||
    role.includes('full stack') ||
    role.includes('full-stack') ||
    role.includes('fullstack') ||
    role.includes('mobile') ||
    role.includes('react') ||
    role.includes('ui/ux') ||
    role.includes('ui &') ||
    role.includes('ui designer') ||
    role.includes('builder') ||
    role.includes('technical staff') ||
    role.includes('tech lead') ||
    role.includes('cto') ||
    role.includes('architect') ||
    (role.includes('product') && (role.includes('tech') || role.includes('ai') || role.includes('engineer') || role.includes('growth')));

  // Exclude purely non-tech roles like "HR", "Sales", "Talent Acquisition", "Account Executive", "Recruiter", "Customer Success" unless engineering
  const isExcluded = 
    (role.includes('sales') && !role.includes('engineer') && !role.includes('builder')) ||
    role.includes('talent acquisition') ||
    role.includes('recruiter') ||
    role.includes('hr lead') ||
    role.includes('financial controller') ||
    role.includes('legal') ||
    role.includes('agronomist') ||
    role.includes('supply operations');

  if (isEng && !isExcluded) {
    relevantRoles.push(j);
  }
}

console.log(`Found ${relevantRoles.length} relevant engineering, developer, builder and technical product roles.`);

fs.writeFileSync('d:/villa/luxora-villa/scripts/filtered_relevant_jobs.json', JSON.stringify(relevantRoles, null, 2));

relevantRoles.forEach((j, i) => {
  console.log(`[${i+1}] Startup: ${j.startupName} | Role: ${j.role} | Exp: ${j.experience || 'Not specified'} | Loc: ${j.location || 'Not specified'} | Link: ${j.applyLink || 'N/A'}`);
});

