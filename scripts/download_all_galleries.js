const { chromium } = require('@playwright/test');
const https = require('https');
const fs = require('fs');
const path = require('path');

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const dir = path.dirname(dest);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://www.akkreatif.com/portfolio', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);

  // 1. MGRM Kukar
  const mgrmImgs = [
    'https://www.akkreatif.com/images/portfolio/screenshots/mgrm-kukar/home.webp',
    'https://www.akkreatif.com/images/portfolio/screenshots/mgrm-kukar/tentang-visi-misi.webp',
    'https://www.akkreatif.com/images/portfolio/screenshots/mgrm-kukar/tentang-sejarah.webp',
    'https://www.akkreatif.com/images/portfolio/screenshots/mgrm-kukar/tentang-struktur-organisasi.webp',
    'https://www.akkreatif.com/images/portfolio/screenshots/mgrm-kukar/layanan.webp',
    'https://www.akkreatif.com/images/portfolio/screenshots/mgrm-kukar/okegas.webp'
  ];

  for (let i = 0; i < mgrmImgs.length; i++) {
    const dest = path.join(__dirname, '..', 'public', 'projects', 'mgrm', `${i + 1}.webp`);
    await download(mgrmImgs[i], dest);
    console.log(`Downloaded MGRM [${i + 1}] -> ${dest}`);
  }

  // 2. Inspektorat Mahulu
  const inspImgs = [
    'https://www.akkreatif.com/images/portfolio/screenshots/inspektorat-mahulu/home.webp',
    'https://www.akkreatif.com/images/portfolio/screenshots/inspektorat-mahulu/profil-visi-misi.webp',
    'https://www.akkreatif.com/images/portfolio/screenshots/inspektorat-mahulu/berita.webp',
    'https://www.akkreatif.com/images/portfolio/screenshots/inspektorat-mahulu/layanan-pengaduan.webp',
    'https://www.akkreatif.com/images/portfolio/screenshots/inspektorat-mahulu/dokumen-sakip.webp',
    'https://www.akkreatif.com/images/portfolio/screenshots/inspektorat-mahulu/ppid-tentang.webp'
  ];

  for (let i = 0; i < inspImgs.length; i++) {
    const dest = path.join(__dirname, '..', 'public', 'projects', 'inspektorat', `${i + 1}.webp`);
    await download(inspImgs[i], dest);
    console.log(`Downloaded Inspektorat [${i + 1}] -> ${dest}`);
  }

  // 3. Bappelitbangda Mahulu - Extract all screenshots from modal
  const bappCard = await page.locator('text=Portal BAPPELITBANGDA Mahakam Ulu').first();
  if (await bappCard.isVisible()) {
    await bappCard.click();
    await page.waitForTimeout(1500);
    const bappImgs = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('img'))
        .map(i => i.src)
        .filter(s => s.includes('bappelitbangda-mahulu'));
    });
    const uniqueBapp = Array.from(new Set(bappImgs));
    console.log('Bappelitbangda Images found:', uniqueBapp);
    for (let i = 0; i < uniqueBapp.length; i++) {
      const dest = path.join(__dirname, '..', 'public', 'projects', 'bappelitbangda', `${i + 1}.webp`);
      await download(uniqueBapp[i], dest);
      console.log(`Downloaded Bappelitbangda [${i + 1}] -> ${dest}`);
    }
  }

  await browser.close();
  console.log('All project gallery screenshots downloaded successfully!');
})();
