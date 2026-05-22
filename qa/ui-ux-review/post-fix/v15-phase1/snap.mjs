import { chromium } from 'playwright';

const BASE = 'http://localhost:3001';
const OUT = 'D:/projects/tourism-landing/qa/ui-ux-review/post-fix/v15-phase1';

async function main() {
  const browser = await chromium.launch();

  // Desktop 1440 home with anchor card
  const ctxD = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const pageD = await ctxD.newPage();
  await pageD.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await pageD.waitForTimeout(800);
  await pageD.screenshot({ path: `${OUT}/01-home-hero-desktop-1440.png`, fullPage: false });

  // TrustStrip scrolled into view
  await pageD.evaluate(() => {
    const el = document.querySelector('[data-feedback-id="HOME-TRUST-STRIP-01"]');
    if (el) el.scrollIntoView({ block: 'center', behavior: 'instant' });
  });
  await pageD.waitForTimeout(1500);
  await pageD.screenshot({ path: `${OUT}/03-trust-strip-desktop-1440.png`, fullPage: false });
  await ctxD.close();

  // Mobile 375 home
  const ctxM = await browser.newContext({ viewport: { width: 375, height: 800 } });
  const pageM = await ctxM.newPage();
  await pageM.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await pageM.waitForTimeout(800);
  await pageM.screenshot({ path: `${OUT}/02-home-hero-mobile-375.png`, fullPage: false });
  await ctxM.close();

  // Itinerary detail desktop with day 1 expanded
  const ctxI = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const pageI = await ctxI.newPage();
  await pageI.goto(`${BASE}/itineraries/sample-10d`, { waitUntil: 'networkidle' });
  await pageI.waitForTimeout(800);
  // scroll to day-by-day section
  await pageI.evaluate(() => {
    const headings = Array.from(document.querySelectorAll('h2, h3'));
    const target = headings.find(h => /Day-by-Day|每一天|early/i.test(h.textContent || ''));
    if (target) target.scrollIntoView({ block: 'start', behavior: 'instant' });
  });
  await pageI.waitForTimeout(800);
  await pageI.screenshot({ path: `${OUT}/04-itinerary-daybyday-desktop-1440.png`, fullPage: false });
  await ctxI.close();

  // Destination beijing desktop (wow points)
  const ctxB = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const pageB = await ctxB.newPage();
  await pageB.goto(`${BASE}/destinations/beijing`, { waitUntil: 'networkidle' });
  await pageB.waitForTimeout(800);
  await pageB.evaluate(() => {
    const headings = Array.from(document.querySelectorAll('h2'));
    const target = headings.find(h => /Wow|亮点/i.test(h.textContent || ''));
    if (target) target.scrollIntoView({ block: 'start', behavior: 'instant' });
  });
  await pageB.waitForTimeout(800);
  await pageB.screenshot({ path: `${OUT}/05-beijing-wowpoints-desktop-1440.png`, fullPage: false });
  await ctxB.close();

  await browser.close();
  console.log('SCREENSHOTS_DONE');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
