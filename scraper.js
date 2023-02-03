const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();

  context.addCookies([{ name:'birthtime', value: '99999', path : '/', 'domain' : 'store.steampowered.com'}]);

  const page = await context.newPage();

  await page.goto('https://store.steampowered.com/');

  await page.fill('input[name="term"]', 'Call of duty');
  await page.press('input[name="term"]', 'Enter');
  
  await page.waitForSelector('a.search_result_row');
  const searchResults = await page.$$('a.search_result_row');
  
  const urls = [];
  for (let i = 0; i < 5; i++) {
    urls.push(await searchResults[i].getAttribute('href'));
  }

  for (let i = 0; i < 5; i++) {
    await page.goto(urls[i]);

    await page.waitForSelector('.game_purchase_price');
    const price = await page.$eval('.game_purchase_price', tmp => tmp.innerText);

    await page.waitForSelector('.game_header_image_full');
    const img = await page.evaluate(()=>{
      return document.querySelector('.game_header_image_full').src;
    });

    const title = await page.evaluate(()=>{
      return document.querySelector('.apphub_AppName').textContent;
    });
  
    console.log(`Link to store page is ${page.url()}`);
    console.log(`Banner image URL: ${img}`);
    console.log(`${title} is ${price}.`);
  }

  await browser.close();
})();
