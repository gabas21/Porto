const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const TARGETS = [
  {
    id: 'bapelitbangda-mahulu',
    title: 'Portal BAPPELITBANGDA Mahakam Ulu',
    url: 'https://bappelitbangdamahulu.akkreatif.my.id/',
    outputImg: 'bapelitbangda.jpg'
  },
  {
    id: 'pt-mgr-migas',
    title: 'Company Profile PT. MGRM (BUMD)',
    url: 'https://mgrmkukar.akkreatif.my.id/',
    outputImg: 'pt-mgr-migas.jpg'
  },
  {
    id: 'inspektorat-mahulu',
    title: 'Portal Inspektorat Mahakam Ulu',
    url: 'https://inspektoratmahulu.akkreatif.my.id/',
    outputImg: 'inspektorat-mahulu.jpg'
  }
];

(async () => {
  console.log('Starting Playwright browser session...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1.5,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();

  // 1. Visit Portfolio Page on Akkreatif
  console.log('Navigating to https://www.akkreatif.com/portfolio...');
  try {
    await page.goto('https://www.akkreatif.com/portfolio', { waitUntil: 'domcontentloaded', timeout: 15000 });
    await page.waitForTimeout(3000);
    console.log('Portfolio page loaded! Title:', await page.title());

    // Scrape all text / cards on the page
    const portfolioCards = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('div, a, article'))
        .filter(el => el.innerText && (el.innerText.includes('BAPPELITBANGDA') || el.innerText.includes('MGRM') || el.innerText.includes('Inspektorat')))
        .map(el => ({
          text: el.innerText.slice(0, 300),
          img: el.querySelector('img')?.src,
          link: el.getAttribute('href') || el.querySelector('a')?.getAttribute('href')
        }));
    });

    console.log('Found Cards on Akkreatif:', JSON.stringify(portfolioCards.slice(0, 5), null, 2));
  } catch (err) {
    console.error('Error loading portfolio page:', err.message);
  }

  // 2. Take screenshots & extract info for the 3 target websites
  const results = [];
  for (const target of TARGETS) {
    console.log(`\n--- Capturing target: ${target.title} (${target.url}) ---`);
    try {
      await page.goto(target.url, { waitUntil: 'domcontentloaded', timeout: 20000 });
      await page.waitForTimeout(4000);

      const pageTitle = await page.title();
      const metaDesc = await page.evaluate(() => {
        return document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
      });
      const headings = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('h1, h2')).map(h => h.innerText.trim()).filter(Boolean);
      });

      console.log(`[${target.id}] Title: ${pageTitle}`);
      console.log(`[${target.id}] Headings:`, headings.slice(0, 4));

      const screenshotPath = path.join(__dirname, '..', 'public', 'projects', target.outputImg);
      await page.screenshot({
        path: screenshotPath,
        clip: { x: 0, y: 0, width: 1440, height: 900 }
      });
      console.log(`[${target.id}] Saved screenshot to: ${screenshotPath}`);

      results.push({
        id: target.id,
        title: target.title,
        url: target.url,
        pageTitle,
        metaDesc,
        headings,
        screenshot: `/projects/${target.outputImg}`,
        status: 'SUCCESS'
      });
    } catch (err) {
      console.error(`Failed to capture ${target.url}:`, err.message);
      results.push({
        id: target.id,
        title: target.title,
        url: target.url,
        error: err.message,
        status: 'FAILED'
      });
    }
  }

  fs.writeFileSync('C:/Users/ACER/.gemini/antigravity-ide/brain/9ad59d76-14e4-497b-884b-bde0e1696f08/scratch/scraping_results.json', JSON.stringify(results, null, 2));
  console.log('\nAll done! Results saved to scratch/scraping_results.json');

  await browser.close();
})();
