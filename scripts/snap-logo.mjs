import puppeteer from 'puppeteer-core';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function snapLogo() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3005', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 1500));

  // 1. Screenshot navbar
  const header = await page.$('header');
  if (header) {
    await header.screenshot({ path: 'public/snap-header-logo.png' });
    console.log('Saved public/snap-header-logo.png');
  }

  // 2. Scroll to footer and screenshot footer logo
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await new Promise(r => setTimeout(r, 1000));
  const footer = await page.$('footer');
  if (footer) {
    await footer.screenshot({ path: 'public/snap-footer-logo.png' });
    console.log('Saved public/snap-footer-logo.png');
  }

  await browser.close();
  console.log('Done snapping logos!');
}

snapLogo().catch(err => {
  console.error(err);
  process.exit(1);
});

