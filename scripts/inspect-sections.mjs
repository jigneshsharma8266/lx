import puppeteer from 'puppeteer-core';
import fs from 'fs';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function capture() {
  console.log('Launching Chrome...');
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });

  console.log('Navigating to http://localhost:3005 ...');
  await page.goto('http://localhost:3005', { waitUntil: 'networkidle2', timeout: 30000 });

  // Wait a moment for fonts and Three.js canvas to initialize
  await new Promise(r => setTimeout(r, 2000));

  const sections = [
    { id: 'hero', selector: 'section:nth-of-type(1)' },
    { id: 'intro', selector: '#intro' },
    { id: 'experiences', selector: '#experiences' },
    { id: 'pool', selector: '#pool' },
    { id: 'dining', selector: '#dining' },
    { id: '3d-view', selector: '#3d-view' },
    { id: 'gallery', selector: '#gallery' },
    { id: 'location', selector: '#location' },
    { id: 'booking', selector: '#booking' },
    { id: 'footer', selector: 'footer' }
  ];

  for (const s of sections) {
    try {
      const el = await page.$(s.selector);
      if (el) {
        await el.scrollIntoView();
        await new Promise(r => setTimeout(r, 800));
        await el.screenshot({ path: `public/sec-${s.id}.png` });
        console.log(`Captured sec-${s.id}.png`);
      } else {
        console.log(`Could not find ${s.selector}`);
      }
    } catch (err) {
      console.error(`Error capturing ${s.id}:`, err.message);
    }
  }

  // Mobile full viewport
  console.log('Capturing mobile view...');
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:3005', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: 'public/sec-mobile-hero.png' });
  console.log('Captured sec-mobile-hero.png');

  // Open mobile menu
  try {
    const menuBtn = await page.$('button[aria-label="Toggle Navigation Menu"]');
    if (menuBtn) {
      await menuBtn.click();
      await new Promise(r => setTimeout(r, 600));
      await page.screenshot({ path: 'public/sec-mobile-menu.png' });
      console.log('Captured sec-mobile-menu.png');
    }
  } catch (err) {
    console.error('Mobile menu error:', err);
  }

  await browser.close();
  console.log('All screenshots completed successfully!');
}

capture().catch(err => {
  console.error('Capture failed:', err);
  process.exit(1);
});

