import puppeteer from "puppeteer";

const meetUrl = 'https://meet.google.com/cjb-caws-iir'

const main = async () => {
  const browser = await puppeteer.launch({ headless: false, args: ['--disable-blink-features=AutomationControlled', '--use-fake-ui-for-media-stream'] });
  const page = await browser.newPage();

  await page.setViewport({width: 1080, height: 1024});
  await page.goto(meetUrl);



  await page.waitForSelector('input');
  await page.waitForNetworkIdle();
  await page.click('input');

  await new Promise((re, res) => {
    setTimeout(res, 50000)
  })
}

main();