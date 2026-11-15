import puppeteer from 'puppeteer-core';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function testNavbar() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  
  const widths = [1024, 1150, 1280, 1366, 1440];
  for (const w of widths) {
    await page.setViewport({ width: w, height: 800, deviceScaleFactor: 1 });
    await page.goto('http://localhost:3005', { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 1000));
    
    // Screenshot just the navbar header
    const header = await page.$('header');
    if (header) {
      await header.screenshot({ path: `public/navbar-${w}.png` });
      console.log(`Saved public/navbar-${w}.png`);
    }
  }

  await browser.close();
  console.log('Done testing navbar!');
}

testNavbar();

