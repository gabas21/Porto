const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

(async () => {
  console.log('Launching browser to scrape AK Kreatif homepage...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1.5,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();

  await page.goto('https://www.akkreatif.com/', { waitUntil: 'domcontentloaded', timeout: 25000 });
  await page.waitForTimeout(3000);

  const title = await page.title();
  console.log('AK Kreatif Homepage Title:', title);

  const data = await page.evaluate(() => {
    const metaDesc = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4'))
      .map(h => (h.innerText || '').trim())
      .filter(Boolean);
    const paragraphs = Array.from(document.querySelectorAll('p'))
      .map(p => (p.innerText || '').trim())
      .filter(p => p.length > 20);

    return {
      title: document.title,
      metaDesc,
      headings: headings.slice(0, 20),
      paragraphs: paragraphs.slice(0, 15),
      bodyTextSnippet: document.body.innerText.slice(0, 3000)
    };
  });

  console.log('Scraped Data:\n', JSON.stringify(data, null, 2));

  // Save screenshot of the AK Kreatif Hero/Home to public/projects/akkreatif.jpg
  const ssPath = path.join(__dirname, '..', 'public', 'projects', 'akkreatif.jpg');
  await page.screenshot({
    path: ssPath,
    clip: { x: 0, y: 0, width: 1440, height: 900 }
  });
  console.log('Saved screenshot to:', ssPath);

  fs.writeFileSync('C:/Users/ACER/.gemini/antigravity-ide/brain/9ad59d76-14e4-497b-884b-bde0e1696f08/scratch/akkreatif_home_data.json', JSON.stringify(data, null, 2));

  await browser.close();
})();
