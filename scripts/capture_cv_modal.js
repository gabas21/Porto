const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('http://localhost:3005', { waitUntil: 'networkidle' });
  await page.waitForTimeout(4000);

  // Click the Hero Resume button to open the CV modal
  const heroResumeBtn = page.getByTestId('hero-resume-btn');
  await heroResumeBtn.click();
  await page.waitForTimeout(1000);

  // Capture CV Preview Modal
  await page.screenshot({ path: 'C:/Users/ACER/.gemini/antigravity-ide/brain/9ad59d76-14e4-497b-884b-bde0e1696f08/scratch/cv_modal_updated.png' });

  await browser.close();
})();
