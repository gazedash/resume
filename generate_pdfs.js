const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const filePath = path.resolve(__dirname, 'index.html');
  const baseFileUrl = 'file://' + filePath.replace(/\\/g, '/');

  // Helper to save PDF for a given type/lang
  async function savePdf(type, lang, output) {
    const url = `${baseFileUrl}?lang=${lang}&type=${type}`;
    await page.goto(url);
    // Show print-emulate elements (Alt+J effect)
    await page.evaluate(() => {
      document.querySelectorAll('.print-emulate').forEach(el => el.classList.add('show'));
    });
    await page.waitForTimeout(200); // let elements show
    await page.pdf({ path: output, format: 'A4' });
    console.log('Saved', output);
  }

  // Save all 4 combinations
  await savePdf('cv', 'en', 'cv_en.pdf');
  await savePdf('resume', 'ru', 'resume_ru.pdf');
  await savePdf('cv', 'ru', 'cv_ru.pdf');
  await savePdf('resume', 'en', 'resume_en.pdf');

  await browser.close();
})(); 