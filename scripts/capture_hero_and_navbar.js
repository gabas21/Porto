const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('http://localhost:3005', { waitUntil: 'networkidle' });
  // Wait for preloader to finish and reveal hero
  await page.waitForTimeout(4000);

  // Capture Hero Section with solid noticeable Resume/CV + WhatsApp buttons
  await page.screenshot({ path: 'C:/Users/ACER/.gemini/antigravity-ide/brain/9ad59d76-14e4-497b-884b-bde0e1696f08/scratch/hero_resume_cta.png' });

  // Scroll down to trigger 3D Glass Navbar Pill
  await page.evaluate(() => window.scrollTo(0, 500));
  await page.waitForTimeout(1200);

  // Capture 3D Glass Navbar
  await page.screenshot({ path: 'C:/Users/ACER/.gemini/antigravity-ide/brain/9ad59d76-14e4-497b-884b-bde0e1696f08/scratch/navbar_3d_glass_scrolled.png' });

  await browser.close();
})();
