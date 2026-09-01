const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const AK_PAGES = [
  { name: '1-home.jpg', url: 'https://www.akkreatif.com/' },
  { name: '2-about.jpg', url: 'https://www.akkreatif.com/about' },
  { name: '3-services.jpg', url: 'https://www.akkreatif.com/services' },
  { name: '4-webapp.jpg', url: 'https://www.akkreatif.com/services/web-application' },
  { name: '5-portfolio.jpg', url: 'https://www.akkreatif.com/portfolio' },
  { name: '6-contact.jpg', url: 'https://www.akkreatif.com/contact' }
];

(async () => {
  const dir = path.join(__dirname, '..', 'public', 'projects', 'akkreatif');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  console.log('Launching browser to capture 6 menu screenshots of AK Kreatif...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1.5,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();

  for (const item of AK_PAGES) {
    console.log(`Navigating to ${item.url}...`);
    try {
      await page.goto(item.url, { waitUntil: 'domcontentloaded', timeout: 25000 });
      await page.waitForTimeout(3000);
      const filePath = path.join(dir, item.name);
      await page.screenshot({
        path: filePath,
        clip: { x: 0, y: 0, width: 1440, height: 900 }
      });
      console.log(`Captured [${item.name}] -> ${filePath}`);
    } catch (err) {
      console.error(`Failed to capture ${item.url}:`, err.message);
    }
  }

  await browser.close();
  console.log('All 6 menu screenshots captured successfully!');
})();
