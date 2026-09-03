import { chromium } from '@playwright/test';
import fs from 'fs';

async function runAudit() {
  const browser = await chromium.launch({ headless: true });
  const report = {
    timestamp: new Date().toISOString(),
    desktop: { buttons: [], smallTargets: [], contrastIssues: [], interactiveElementsCount: 0 },
    mobile: { buttons: [], smallTargets: [], interactiveElementsCount: 0 },
    modals: {},
    consoleWarnings: []
  };

  // 1. DESKTOP AUDIT (1440x900)
  const desktopContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const desktopPage = await desktopContext.newPage();
  
  desktopPage.on('console', msg => {
    if (msg.type() === 'warning' || msg.type() === 'error') {
      report.consoleWarnings.push(`[${msg.type()}] ${msg.text()}`);
    }
  });

  await desktopPage.goto('http://localhost:3005', { waitUntil: 'networkidle' });

  // Extract all interactive elements
  const desktopElements = await desktopPage.evaluate(() => {
    const interactives = Array.from(document.querySelectorAll('button, a, [role="button"], input, select'));
    return interactives.map(el => {
      const rect = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      const isVisible = rect.width > 0 && rect.height > 0 && style.visibility !== 'hidden' && style.display !== 'none';
      
      return {
        tag: el.tagName.toLowerCase(),
        text: (el.innerText || el.getAttribute('aria-label') || el.getAttribute('title') || '').trim().slice(0, 40),
        id: el.id || null,
        className: el.className.slice(0, 60),
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        x: Math.round(rect.x),
        y: Math.round(rect.y),
        color: style.color,
        backgroundColor: style.backgroundColor,
        fontSize: style.fontSize,
        cursor: style.cursor,
        borderRadius: style.borderRadius,
        hasAriaLabel: el.hasAttribute('aria-label') || el.hasAttribute('title') || (el.innerText && el.innerText.trim().length > 0),
        role: el.getAttribute('role') || null,
        isVisible
      };
    }).filter(e => e.isVisible);
  });

  report.desktop.buttons = desktopElements;
  report.desktop.interactiveElementsCount = desktopElements.length;
  report.desktop.smallTargets = desktopElements.filter(e => e.width < 44 || e.height < 44);

  // 2. TEST MODAL OPENING & INTERACTIONS
  // CV Modal Test
  const cvBtn = desktopPage.locator('[data-testid="hero-resume-btn"], button:has-text("Resume / CV")').first();
  if (await cvBtn.isVisible()) {
    await cvBtn.click();
    await desktopPage.waitForTimeout(500);
    const cvModalVisible = await desktopPage.locator('[data-testid="resume-preview-modal"]').isVisible();
    const downloadBtn = desktopPage.locator('button:has-text("Download CV")').first();
    const downloadBtnBox = await downloadBtn.boundingBox();
    report.modals.resumeModal = {
      openedSuccessfully: cvModalVisible,
      downloadButtonSize: downloadBtnBox ? { width: Math.round(downloadBtnBox.width), height: Math.round(downloadBtnBox.height) } : null
    };
    // Close modal
    await desktopPage.keyboard.press('Escape');
    await desktopPage.waitForTimeout(300);
  }

  // Contact Modal Test
  const contactBtn = desktopPage.locator('button:has-text("Kirim Pesan"), a:has-text("Contact")').first();
  if (await contactBtn.isVisible()) {
    await contactBtn.click();
    await desktopPage.waitForTimeout(500);
    const contactModal = desktopPage.locator('form, [role="dialog"]').first();
    report.modals.contactModal = {
      opened: await contactModal.isVisible()
    };
    await desktopPage.keyboard.press('Escape');
    await desktopPage.waitForTimeout(300);
  }

  // 3. MOBILE AUDIT (390x844 iPhone 14)
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1',
    isMobile: true,
    hasTouch: true
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto('http://localhost:3005', { waitUntil: 'networkidle' });

  const mobileElements = await mobilePage.evaluate(() => {
    const interactives = Array.from(document.querySelectorAll('button, a, [role="button"], input, select'));
    return interactives.map(el => {
      const rect = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      const isVisible = rect.width > 0 && rect.height > 0 && style.visibility !== 'hidden' && style.display !== 'none';
      return {
        tag: el.tagName.toLowerCase(),
        text: (el.innerText || el.getAttribute('aria-label') || el.getAttribute('title') || '').trim().slice(0, 40),
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        isTooSmallForTouch: rect.width < 44 || rect.height < 44,
        isVisible
      };
    }).filter(e => e.isVisible);
  });

  report.mobile.buttons = mobileElements;
  report.mobile.interactiveElementsCount = mobileElements.length;
  report.mobile.smallTargets = mobileElements.filter(e => e.isTooSmallForTouch);

  fs.writeFileSync('scripts/ui_audit_report.json', JSON.stringify(report, null, 2));
  console.log('AUDIT_COMPLETED: Wrote scripts/ui_audit_report.json');
  console.log(`Desktop interactive elements: ${report.desktop.interactiveElementsCount}, Sub-44px targets: ${report.desktop.smallTargets.length}`);
  console.log(`Mobile interactive elements: ${report.mobile.interactiveElementsCount}, Sub-44px targets: ${report.mobile.smallTargets.length}`);

  await browser.close();
}

runAudit().catch(console.error);
