const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('http://localhost:3005', { waitUntil: 'networkidle' });
  await page.waitForTimeout(4000);

  // Switch to light mode
  await page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'light');
    document.documentElement.classList.remove('dark');
  });
  await page.waitForTimeout(500);

  // Capture Hero in Light Mode
  await page.screenshot({ path: 'C:/Users/ACER/.gemini/antigravity-ide/brain/9ad59d76-14e4-497b-884b-bde0e1696f08/scratch/hero_light_mode.png' });

  await browser.close();
})();
