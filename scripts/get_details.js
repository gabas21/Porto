const { chromium } = require('@playwright/test');
const fs = require('fs');
const https = require('https');
const path = require('path');

function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      res.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://www.akkreatif.com/portfolio', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);

  // Extract all cards and images
  const cards = await page.evaluate(() => {
    const items = [];
    const elements = document.querySelectorAll('article, [class*="group"], [class*="card"]');
    elements.forEach(el => {
      const text = el.innerText;
      const img = el.querySelector('img')?.src;
      const link = el.querySelector('a')?.href;
      if (text && (text.includes('BAPPELITBANGDA') || text.includes('MGRM') || text.includes('Inspektorat'))) {
        items.push({ text, img, link });
      }
    });
    return items;
  });

  console.log('Target Cards Found:', JSON.stringify(cards, null, 2));

  // Also extract all images on the page
  const allImages = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('img')).map(img => img.src).filter(Boolean);
  });

  console.log('All Images on Page:', allImages);

  // If there's bappelitbangda image URL, download it directly:
  const bappelitbangdaImg = allImages.find(src => src.includes('bappelitbangda') || src.includes('bapelitbangda'));
  if (bappelitbangdaImg) {
    console.log('Found bappelitbangda image URL:', bappelitbangdaImg);
    await downloadImage(bappelitbangdaImg, path.join(__dirname, '..', 'public', 'projects', 'bapelitbangda.jpg'));
    console.log('Saved bapelitbangda.jpg from akkreatif asset!');
  }

  // Click on the first "Lihat Detail" or card to see modal details
  const bappCard = await page.locator('text=Portal BAPPELITBANGDA Mahakam Ulu').first();
  if (await bappCard.isVisible()) {
    console.log('Clicking BAPPELITBANGDA card to open modal...');
    await bappCard.click();
    await page.waitForTimeout(1500);

    const modalData = await page.evaluate(() => {
      const modal = document.querySelector('[role="dialog"], .modal, [class*="fixed"]');
      if (modal) {
        return {
          text: modal.innerText,
          images: Array.from(modal.querySelectorAll('img')).map(i => i.src)
        };
      }
      return null;
    });

    console.log('Modal Data:', JSON.stringify(modalData, null, 2));
  }

  await browser.close();
})();
